import { modelBaseUrl, type Provider } from "@/lib/llm-core";

/**
 * A base URL typed by a user is a URL this server will send requests to.
 * Only public HTTPS hosts are accepted: no plain HTTP, no credentials in the
 * URL, no loopback, link-local or private-range literals, no single-label
 * hosts. (On Workers `global_fetch_strictly_public` enforces the same at the
 * network layer; this check also holds on Node.)
 */
export class EndpointError extends Error {}

const PRIVATE_V4 = [/^0\./, /^10\./, /^127\./, /^169\.254\./, /^172\.(1[6-9]|2\d|3[01])\./, /^192\.168\./, /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./, /^(22[4-9]|2[3-5]\d)\./];

export function publicEndpoint(raw: string, provider: Provider, allowInsecure = false): string {
  let url: URL;
  try { url = new URL(modelBaseUrl(raw, provider)); } catch { throw new EndpointError("invalid"); }
  if (url.username || url.password) throw new EndpointError("credentials");
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  const local = host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host === "::1" || /^f[cd]|^fe80:/i.test(host) || host.startsWith("::ffff:") || PRIVATE_V4.some((r) => r.test(host));
  if (allowInsecure) {
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new EndpointError("protocol");
  } else {
    if (url.protocol !== "https:") throw new EndpointError("protocol");
    if (local || !host.includes(".")) throw new EndpointError("private");
  }
  url.hash = "";
  url.search = "";
  return url.toString().replace(/\/$/, "");
}
