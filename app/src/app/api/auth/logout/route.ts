import { accountEnv } from "@/lib/account/env";
import { json, refuse } from "@/lib/account/http";
import { clearCookie, sameOrigin, SESSION_COOKIE } from "@/lib/account/session";

export async function POST(req: Request) {
  const env = await accountEnv();
  if (env && !sameOrigin(req, env)) return refuse("forbidden", 403);
  return json({ ok: true }, 200, { "Set-Cookie": clearCookie(req, SESSION_COOKIE) });
}
