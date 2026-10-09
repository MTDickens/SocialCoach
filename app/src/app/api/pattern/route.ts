import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { NextResponse } from "next/server";
import { requestModel } from "@/lib/account/request-model";
import { runPattern } from "@/lib/tasks/pattern";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["pattern"]);
    return NextResponse.json(await runPattern(body, taskLLM(model.llm,"pattern",req.signal,event=>console.info("[model_task]",event),body.lang), model.smart));
  } catch (e) {
    return fail(e);
  }
}
