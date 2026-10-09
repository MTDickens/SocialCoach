import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { requestModel } from "@/lib/account/request-model";
import { runReflect } from "@/lib/tasks/reflect";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail, taskStream } from "@/lib/api-utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["reflect"]);
    const input = body;
    if(body.responseFormat==='json')return Response.json({reply:await runReflect(input,taskLLM(model.llm,'reflect',req.signal,event=>console.info('[model_task]',event),body.lang),model.fast,undefined,req.signal)});
    return taskStream((onDelta,signal) => runReflect(input, taskLLM(model.llm,"reflect",signal,event=>console.info("[model_task]",event),body.lang), model.fast, onDelta),{signal:req.signal});
  } catch (e) {
    return fail(e);
  }
}
