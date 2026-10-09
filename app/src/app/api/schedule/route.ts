import {readTaskBody,TaskInputSchemas} from "@/lib/task-input";
import {taskLLM} from "@/lib/task-runtime";
import { NextResponse } from "next/server";
import { requestModel } from "@/lib/account/request-model";
import { runSchedule } from "@/lib/tasks/schedule";
import { checkRateLimit } from "@/lib/rate-limit";
import { fail } from "@/lib/api-utils";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const model = await requestModel(req);
    const body = await readTaskBody(req,TaskInputSchemas["schedule"]);
    const out = await runSchedule(body, taskLLM(model.llm,"schedule",req.signal,event=>console.info("[model_task]",event),body.lang), model.fast);
    return NextResponse.json(out);
  } catch (e) {
    return fail(e);
  }
}
