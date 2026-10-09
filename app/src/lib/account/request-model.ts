import { FAST_MODEL, SMART_MODEL, serverLLM } from "@/lib/llm";
import type { LLM } from "@/lib/llm-core";
import { accountLLM } from "./llm";
import { currentSession } from "./session";

export interface RequestModel { llm: LLM; fast: string; smart: string; source: "account" | "server" }

/**
 * Which model serves this request.
 *
 * A signed-in person with a saved configuration is served by their own
 * endpoint, key and model choices. Everyone else gets the deployment's own
 * model if it has one — on a deployment with no shared key that means a clear
 * "connect a model" error, not someone else's key. There is no fallback from a
 * failing personal configuration to the shared one: that would quietly spend
 * the deployer's money while the person believed they were on their own.
 */
export async function requestModel(req: Request): Promise<RequestModel> {
  const signedIn = await currentSession(req).catch(() => null);
  if (signedIn) {
    const model = await signedIn.env.store.model(signedIn.session.uid).catch(() => null);
    if (model) return { llm: accountLLM(model), fast: model.fastModel, smart: model.smartModel, source: "account" };
  }
  return { llm: serverLLM, fast: FAST_MODEL, smart: SMART_MODEL, source: "server" };
}
