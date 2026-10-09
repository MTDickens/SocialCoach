import { accountEnv } from "@/lib/account/env";
import { authorized, json } from "@/lib/account/http";
import { clearCookie, currentSession, SESSION_COOKIE } from "@/lib/account/session";

export const dynamic = "force-dynamic";

/** Who is signed in and what model they have saved. The API key itself is never returned — only its last four characters. */
export async function GET(req: Request) {
  const env = await accountEnv();
  if (!env) return json({ available: false, user: null, model: null });
  const signedIn = await currentSession(req, env);
  if (!signedIn) return json({ available: true, user: null, model: null });
  const [user, model] = await Promise.all([signedIn.env.store.user(signedIn.session.uid), signedIn.env.store.modelView(signedIn.session.uid)]);
  if (!user) return json({ available: true, user: null, model: null }, 200, { "Set-Cookie": clearCookie(req, SESSION_COOKIE) });
  return json({ available: true, user: { login: user.login, name: user.name, avatarUrl: user.avatarUrl }, model });
}

/** Delete the account: the saved model configuration and the user row, then sign out. */
export async function DELETE(req: Request) {
  const auth = await authorized(req);
  if (!("session" in auth)) return auth;
  await auth.env.store.deleteUser(auth.session.uid);
  return json({ ok: true }, 200, { "Set-Cookie": clearCookie(req, SESSION_COOKIE) });
}
