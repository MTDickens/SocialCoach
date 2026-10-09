import { sign, verify } from "./crypto";
import { accountEnv, isAllowed, type AccountEnv } from "./env";

export const SESSION_COOKIE = "ht_session";
export const STATE_COOKIE = "ht_oauth";
const SESSION_DAYS = 30;

export interface Session { uid: number; login: string; exp: number }

export function readCookie(req: Request, name: string): string | undefined {
  for (const part of (req.headers.get("cookie") ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
}

const secure = (req: Request) => new URL(req.url).protocol === "https:" || req.headers.get("x-forwarded-proto") === "https";
export function cookie(req: Request, name: string, value: string, maxAgeSeconds: number): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure(req) ? "; Secure" : ""}`;
}
export const clearCookie = (req: Request, name: string) => cookie(req, name, "", 0);

export async function sessionCookie(req: Request, env: AccountEnv, user: { id: number; login: string }, now = Date.now()): Promise<string> {
  const session: Session = { uid: user.id, login: user.login, exp: now + SESSION_DAYS * 86_400_000 };
  return cookie(req, SESSION_COOKIE, await sign(env.secret, session), SESSION_DAYS * 86_400);
}

/**
 * The signed-in person for this request, or null. Checked against the
 * allow-list on every request, so removing a login from `AUTH_ALLOWED_LOGINS`
 * takes effect immediately rather than when a cookie happens to expire.
 */
export async function currentSession(req: Request, env?: AccountEnv | null, now = Date.now()): Promise<{ env: AccountEnv; session: Session } | null> {
  const active = env === undefined ? await accountEnv() : env;
  if (!active) return null;
  const session = await verify<Session>(active.secret, readCookie(req, SESSION_COOKIE));
  if (!session || typeof session.uid !== "number" || typeof session.login !== "string" || !(session.exp > now)) return null;
  if (!isAllowed(active, session.login)) return null;
  return { env: active, session };
}

/**
 * Cookies are SameSite=Lax, which already keeps them off cross-site POSTs.
 * State-changing account routes also require the request to come from this
 * origin, so that protection does not rest on one browser behaviour.
 */
export function sameOrigin(req: Request, env: Pick<AccountEnv, "origin">): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return req.headers.get("sec-fetch-site") === "same-origin";
  const expected = env.origin ?? new URL(req.url).origin;
  if (origin === expected) return true;
  // Behind a proxy the request URL may carry the internal host; trust the Host header's origin too.
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return !!host && (origin === `https://${host}` || origin === `http://${host}`);
}

export function publicOrigin(req: Request, env: Pick<AccountEnv, "origin">): string {
  if (env.origin) return env.origin;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? new URL(req.url).protocol.replace(":", "");
  return host ? `${proto}://${host}` : new URL(req.url).origin;
}
