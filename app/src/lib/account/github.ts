import type { AccountUser } from "./types";

/** GitHub's web OAuth flow. No scope is requested: the public profile is all this app reads. */
export function authorizeUrl(clientId: string, redirectUri: string, state: string): string {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("allow_signup", "false");
  return url.toString();
}

export class GitHubError extends Error {}

export async function exchangeCode(github: { clientId: string; clientSecret: string }, code: string, redirectUri: string, fetcher: typeof fetch = fetch): Promise<AccountUser> {
  const token = await fetcher("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", "User-Agent": "hallway-track" },
    body: JSON.stringify({ client_id: github.clientId, client_secret: github.clientSecret, code, redirect_uri: redirectUri }),
    signal: AbortSignal.timeout(10_000),
  });
  const granted = (await token.json().catch(() => null)) as { access_token?: unknown } | null;
  if (!token.ok || typeof granted?.access_token !== "string") throw new GitHubError("token");
  const profile = await fetcher("https://api.github.com/user", {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${granted.access_token}`, "User-Agent": "hallway-track" },
    signal: AbortSignal.timeout(10_000),
  });
  const user = (await profile.json().catch(() => null)) as { id?: unknown; login?: unknown; name?: unknown; avatar_url?: unknown } | null;
  if (!profile.ok || typeof user?.id !== "number" || typeof user.login !== "string") throw new GitHubError("profile");
  // The access token is used once, here, and dropped: nothing GitHub-side is stored.
  return { id: user.id, login: user.login, name: typeof user.name === "string" ? user.name.slice(0, 200) : "", avatarUrl: typeof user.avatar_url === "string" && user.avatar_url.startsWith("https://") ? user.avatar_url.slice(0, 500) : "" };
}
