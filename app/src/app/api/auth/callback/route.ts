import { NextResponse } from "next/server";
import { accountEnv, isAllowed } from "@/lib/account/env";
import { exchangeCode } from "@/lib/account/github";
import { clearCookie, publicOrigin, readCookie, sessionCookie, STATE_COOKIE } from "@/lib/account/session";

export const dynamic = "force-dynamic";

/**
 * GitHub sends the person back here. The outcome is a redirect to Settings
 * carrying one fixed word; nothing about the failure beyond that word leaves
 * the server.
 */
export async function GET(req: Request) {
  const env = await accountEnv();
  const origin = publicOrigin(req, env ?? {});
  const done = (outcome: string, cookies: string[] = []) => {
    const response = NextResponse.redirect(`${origin}/settings?account=${outcome}`);
    for (const c of [clearCookie(req, STATE_COOKIE), ...cookies]) response.headers.append("Set-Cookie", c);
    response.headers.set("Cache-Control", "no-store");
    return response;
  };
  if (!env) return done("unavailable");
  const url = new URL(req.url);
  const code = url.searchParams.get("code"), state = url.searchParams.get("state"), expected = readCookie(req, STATE_COOKIE);
  if (url.searchParams.get("error")) return done("cancelled");
  if (!code || !state || !expected || state !== expected) return done("failed");
  try {
    const user = await exchangeCode(env.github, code, `${origin}/api/auth/callback`);
    if (!isAllowed(env, user.login)) return done("not-invited");
    await env.store.upsertUser(user);
    return done("signed-in", [await sessionCookie(req, env, user)]);
  } catch (error) {
    console.error("[auth] sign-in failed", error instanceof Error ? error.name : "error"); // Never the code, token or profile.
    return done("failed");
  }
}
