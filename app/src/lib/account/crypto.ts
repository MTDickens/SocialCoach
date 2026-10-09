/**
 * Sessions and stored API keys, on WebCrypto so the same code runs in Workers
 * and in Node tests.
 *
 * One deployment secret (`ACCOUNT_SECRET`) is stretched with HKDF into two
 * unrelated keys: one signs session cookies, one encrypts model API keys at
 * rest. The database therefore never holds anything that calls a model on its
 * own — a copy of D1 without the Worker secret is ciphertext.
 */
const enc = new TextEncoder();
const dec = new TextDecoder();

export const b64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
export function unb64url(text: string): Uint8Array<ArrayBuffer> {
  const bin = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function derive(secret: string, info: string, usage: "sign" | "encrypt"): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey("raw", enc.encode(secret), "HKDF", false, ["deriveKey"]);
  const params = { name: "HKDF", hash: "SHA-256", salt: enc.encode("hallway-track"), info: enc.encode(info) };
  return usage === "sign"
    ? crypto.subtle.deriveKey(params, material, { name: "HMAC", hash: "SHA-256", length: 256 }, false, ["sign", "verify"])
    : crypto.subtle.deriveKey(params, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

/** A secret too short to resist guessing is treated as no secret at all. */
export const usableSecret = (secret: string | undefined): secret is string => typeof secret === "string" && secret.trim().length >= 32;

export async function sign(secret: string, payload: object): Promise<string> {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const mac = await crypto.subtle.sign("HMAC", await derive(secret, "session-v1", "sign"), enc.encode(body));
  return `${body}.${b64url(new Uint8Array(mac))}`;
}

/** Returns the payload only when the signature verifies; never throws on garbage. */
export async function verify<T>(secret: string, token: string | undefined): Promise<T | null> {
  if (!token) return null;
  const [body, mac, extra] = token.split(".");
  if (!body || !mac || extra !== undefined) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await derive(secret, "session-v1", "sign"), unb64url(mac), enc.encode(body));
    return ok ? (JSON.parse(dec.decode(unb64url(body))) as T) : null;
  } catch {
    return null;
  }
}

/** `aad` binds a ciphertext to its owner: one user's row cannot be decrypted as another's. */
export async function seal(secret: string, plaintext: string, aad: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(new ArrayBuffer(12)));
  const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: enc.encode(aad) }, await derive(secret, "model-key-v1", "encrypt"), enc.encode(plaintext));
  return `v1.${b64url(iv)}.${b64url(new Uint8Array(data))}`;
}

export async function open(secret: string, sealed: string, aad: string): Promise<string | null> {
  const [version, iv, data] = sealed.split(".");
  if (version !== "v1" || !iv || !data) return null;
  try {
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64url(iv), additionalData: enc.encode(aad) }, await derive(secret, "model-key-v1", "encrypt"), unb64url(data));
    return dec.decode(plain);
  } catch {
    return null;
  }
}

export const randomToken = (bytes = 24) => b64url(crypto.getRandomValues(new Uint8Array(new ArrayBuffer(bytes))));
