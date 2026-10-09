import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { requestModel } from "@/lib/account/request-model";
import { runAssess } from "@/lib/tasks/assess";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail, taskStream } from "@/lib/api-utils";

export const maxDuration = 180;

/**
 * Emits only the evidence-validated report, then appends "\n@@final\n<sanitized report json>" as the
 * authoritative result.
 */
export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["assess"]);
    const input = body;
    return taskStream((onDelta,signal) => runAssess(input, taskLLM(model.llm,"assess",signal,event=>console.info("[model_task]",event),body.lang), model.smart, onDelta,req.signal), { final: true,signal:req.signal });
  } catch (e) {
    return fail(e);
  }
}
