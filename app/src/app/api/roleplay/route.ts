import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { requestModel } from "@/lib/account/request-model";
import { runRoleplay } from "@/lib/tasks/roleplay";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail, taskStream } from "@/lib/api-utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["roleplay"]);
    const input = body;
    return taskStream((onDelta,signal) => runRoleplay(input, taskLLM(model.llm,"roleplay",signal,event=>console.info("[model_task]",event),body.lang), model.fast, onDelta),{signal:req.signal});
  } catch (e) {
    return fail(e);
  }
}
