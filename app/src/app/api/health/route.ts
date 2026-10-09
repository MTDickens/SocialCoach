import { NextResponse } from "next/server";
import { hasServerCredential,serverRequiresByok } from "@/lib/llm";
import { serverModelHealth } from "@/lib/server-model-health";
import { accountHealth } from "@/lib/account/health";

export const dynamic = "force-dynamic";

/**
 * Safe connection flags and anonymous budget numbers, never credentials. Lets the client tell
 * the difference between "this deployment has a model" and "you need to bring
 * your own", so a keyless clone can guide instead of throwing 503s.
 */
export async function GET(request: Request) {
  // A signed-in person with a saved configuration is told about their own endpoint, not the deployment's.
  const own = await accountHealth(request, new URL(request.url).searchParams.get("retry") === "1");
  if (own) return NextResponse.json({ serverKey: true, requireByok: false, account: true, ...own }, { headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(
    { serverKey: hasServerCredential(), requireByok: serverRequiresByok(), ...await serverModelHealth(new URL(request.url).searchParams.get("retry") === "1") },
    { headers: { "Cache-Control": "no-store" } },
  );
}
