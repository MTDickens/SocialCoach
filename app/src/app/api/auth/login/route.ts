import { NextResponse } from "next/server";
import { accountEnv } from "@/lib/account/env";
import { randomToken } from "@/lib/account/crypto";
import { authorizeUrl } from "@/lib/account/github";
import { cookie, publicOrigin, STATE_COOKIE } from "@/lib/account/session";

export const dynamic = "force-dynamic";

/** Start GitHub sign-in. The random state is kept in a short-lived cookie and checked on return. */
export async function GET(req: Request) {
  const env = await accountEnv();
  const origin = publicOrigin(req, env ?? {});
  if (!env) return NextResponse.redirect(`${origin}/settings?account=unavailable`);
  const state = randomToken();
  const response = NextResponse.redirect(authorizeUrl(env.github.clientId, `${origin}/api/auth/callback`, state));
  response.headers.append("Set-Cookie", cookie(req, STATE_COOKIE, state, 600));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
