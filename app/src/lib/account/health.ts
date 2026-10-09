import { checkModelConnection, type ModelCheck } from "@/lib/model-status";
import { accountMetadata } from "./llm";
import { currentSession } from "./session";

const cache = new Map<number, { check: ModelCheck; at: number }>();
export const forgetAccountHealth = (uid: number) => { cache.delete(uid); };

/**
 * Connection state for a signed-in person's own configuration, or null when
 * this request has none (the caller then reports the deployment's own model).
 * A free metadata check, cached briefly per person in this isolate.
 */
export async function accountHealth(req: Request, fresh = false): Promise<ModelCheck | null> {
  const signedIn = await currentSession(req).catch(() => null);
  if (!signedIn) return null;
  const uid = signedIn.session.uid;
  const hit = cache.get(uid);
  if (!fresh && hit && Date.now() - hit.at < 120_000) return hit.check;
  const model = await signedIn.env.store.model(uid).catch(() => null);
  if (!model) return null;
  const check = await checkModelConnection(accountMetadata(model), [model.fastModel, model.smartModel]);
  if (cache.size > 500) cache.clear();
  cache.set(uid, { check, at: Date.now() });
  return check;
}
