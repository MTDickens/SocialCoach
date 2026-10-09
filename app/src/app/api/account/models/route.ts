import { EndpointError, publicEndpoint } from "@/lib/account/endpoint";
import { authorized, body, json, refuse } from "@/lib/account/http";
import { accountMetadata, chatModels } from "@/lib/account/llm";
import { ModelProbeSchema } from "@/lib/account/types";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

/**
 * Ask an endpoint which models it offers, so the person can pick instead of
 * typing names. Signed-in only: this makes the server send a request to a URL
 * the caller chose. With no key in the body, the stored key is used — but only
 * against the stored endpoint, so a saved key can never be sent somewhere new.
 */
export async function POST(req: Request) {
  const auth = await authorized(req);
  if (!("session" in auth)) return auth;
  try { checkRateLimit(req); } catch (error) { return fail(error); }
  const probe = ModelProbeSchema.safeParse(await body(req));
  if (!probe.success) return refuse("invalid", 400);
  let baseUrl: string;
  try { baseUrl = publicEndpoint(probe.data.baseUrl, probe.data.provider, auth.env.allowInsecureEndpoints); }
  catch (error) { if (error instanceof EndpointError) return refuse("endpoint", 400); throw error; }
  let apiKey = probe.data.apiKey;
  if (!apiKey) {
    const saved = await auth.env.store.model(auth.session.uid);
    if (!saved || saved.baseUrl !== baseUrl || saved.provider !== probe.data.provider) return refuse("key-required", 400);
    apiKey = saved.apiKey;
  }
  try {
    const { ids } = await accountMetadata({ provider: probe.data.provider, baseUrl, apiKey }).list();
    return json({ models: chatModels(ids).slice(0, 500) });
  } catch {
    // Many gateways simply do not serve /models. The form falls back to typing the names.
    return refuse("probe-failed", 502);
  }
}
