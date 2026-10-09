import { NextResponse } from "next/server";
import { accountEnv, type AccountEnv } from "./env";
import { currentSession, sameOrigin, type Session } from "./session";

export const noStore = { "Cache-Control": "no-store" };
export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => NextResponse.json(body, { status, headers: { ...noStore, ...headers } });

/** Error codes are fixed strings the client translates; nothing from a provider or a database is echoed. */
export type AccountErrorCode = "unavailable" | "signed-out" | "forbidden" | "invalid" | "endpoint" | "key-required" | "probe-failed";
export const refuse = (code: AccountErrorCode, status: number) => json({ error: code }, status);

/** For state-changing routes: accounts configured, same-origin, signed in. */
export async function authorized(req: Request): Promise<{ env: AccountEnv; session: Session } | NextResponse> {
  const env = await accountEnv();
  if (!env) return refuse("unavailable", 503);
  if (!sameOrigin(req, env)) return refuse("forbidden", 403);
  const signedIn = await currentSession(req, env);
  return signedIn ?? refuse("signed-out", 401);
}

/** A small JSON body, read with a hard cap. */
export async function body(req: Request, maxBytes = 8_000): Promise<unknown> {
  const text = await req.text();
  if (text.length > maxBytes) return undefined;
  try { return JSON.parse(text); } catch { return undefined; }
}
