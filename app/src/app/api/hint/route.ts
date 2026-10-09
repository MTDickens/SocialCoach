import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { NextResponse } from "next/server";
import { requestModel } from "@/lib/account/request-model";
import { runHint } from "@/lib/tasks/hint";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["hint"]);
    return NextResponse.json(await runHint(body, taskLLM(model.llm,"hint",req.signal,event=>console.info("[model_task]",event),body.lang), model.fast));
  } catch (e) {
    return fail(e);
  }
}
