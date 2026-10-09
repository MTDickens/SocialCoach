import { NextResponse } from "next/server";
import { readTaskBody } from "@/lib/task-input";
import { taskLLM } from "@/lib/task-runtime";
import { SMART_MODEL, serverLLM } from "@/lib/llm";
import { runDraftReview } from "@/lib/tasks/draft-review";
import { WritingInputSchema } from "@/lib/writing";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const body = await readTaskBody(req, WritingInputSchema);
    return NextResponse.json(await runDraftReview(body, taskLLM(serverLLM, "draft-review", req.signal, (event) => console.info("[model_task]", event), body.lang), SMART_MODEL, req.signal));
  } catch (e) {
    return fail(e);
  }
}
