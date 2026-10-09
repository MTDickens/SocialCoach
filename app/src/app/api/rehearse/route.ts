import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { NextResponse } from "next/server";
import { requestModel } from "@/lib/account/request-model";
import { runRehearse } from "@/lib/tasks/rehearse";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["rehearse"]);
    return NextResponse.json(await runRehearse(body, taskLLM(model.llm,"rehearse",req.signal,event=>console.info("[model_task]",event),body.lang), model.fast));
  } catch (e) {
    return fail(e);
  }
}
