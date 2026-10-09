import { EndpointError, publicEndpoint } from "@/lib/account/endpoint";
import { authorized, body, json, refuse } from "@/lib/account/http";
import { ModelFormSchema } from "@/lib/account/types";
import { forgetAccountHealth } from "@/lib/account/health";

/** Save the signed-in person's endpoint, key and model choices. */
export async function PUT(req: Request) {
  const auth = await authorized(req);
  if (!("session" in auth)) return auth;
  const form = ModelFormSchema.safeParse(await body(req));
  if (!form.success) return refuse("invalid", 400);
  let baseUrl: string;
  try { baseUrl = publicEndpoint(form.data.baseUrl, form.data.provider, auth.env.allowInsecureEndpoints); }
  catch (error) { if (error instanceof EndpointError) return refuse("endpoint", 400); throw error; }
  if (!(await auth.env.store.saveModel(auth.session.uid, form.data, baseUrl))) return refuse("key-required", 400);
  forgetAccountHealth(auth.session.uid);
  return json({ model: await auth.env.store.modelView(auth.session.uid) });
}

export async function DELETE(req: Request) {
  const auth = await authorized(req);
  if (!("session" in auth)) return auth;
  await auth.env.store.deleteModel(auth.session.uid);
  forgetAccountHealth(auth.session.uid);
  return json({ model: null });
}
