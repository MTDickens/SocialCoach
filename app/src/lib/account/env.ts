import { usableSecret } from "./crypto";
import { accountStore, type AccountStore } from "./store";
import type { D1Like } from "./types";

/**
 * Accounts exist only where all of these are present: a D1 binding named `DB`,
 * `ACCOUNT_SECRET` (32+ characters), a GitHub OAuth app, and an allow-list.
 * Anywhere else — a laptop, Vercel, the Docker image — this returns null and
 * the app behaves exactly as it did before accounts: keys in the browser only.
 */
export interface AccountEnv {
  store: AccountStore;
  secret: string;
  github: { clientId: string; clientSecret: string };
  /** Lower-cased GitHub logins, or "*" for anyone with a GitHub account. */
  allowed: Set<string> | "*";
  /** Public origin for OAuth redirects; falls back to the request's own origin. */
  origin?: string;
  /** Development only: accept http:// and private hosts as model endpoints. */
  allowInsecureEndpoints: boolean;
}

let override: AccountEnv | null | undefined;
/** Tests supply their own database and secrets. */
export function setAccountEnvForTests(env: AccountEnv | null | undefined) { override = env; }

async function binding(): Promise<D1Like | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    return (context.env as { DB?: D1Like }).DB;
  } catch {
    return undefined; // Not running on Cloudflare (or its dev shim).
  }
}

export function parseAllowed(raw: string | undefined): Set<string> | "*" | null {
  const names = (raw ?? "").split(/[\s,]+/).map((s) => s.trim().replace(/^@/, "").toLowerCase()).filter(Boolean);
  if (!names.length) return null;
  return names.includes("*") ? "*" : new Set(names);
}

export async function accountEnv(): Promise<AccountEnv | null> {
  if (override !== undefined) return override;
  const secret = process.env.ACCOUNT_SECRET;
  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
  const allowed = parseAllowed(process.env.AUTH_ALLOWED_LOGINS);
  if (!usableSecret(secret) || !clientId || !clientSecret || !allowed) return null;
  const db = await binding();
  if (!db) return null;
  return {
    store: accountStore(db, secret),
    secret,
    github: { clientId, clientSecret },
    allowed,
    origin: process.env.APP_ORIGIN?.trim().replace(/\/$/, "") || undefined,
    allowInsecureEndpoints: process.env.ACCOUNT_ALLOW_INSECURE_ENDPOINTS === "1" && process.env.NODE_ENV !== "production",
  };
}

export const isAllowed = (env: Pick<AccountEnv, "allowed">, login: string) => env.allowed === "*" || env.allowed.has(login.toLowerCase());
