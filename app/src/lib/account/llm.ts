import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { anthropicArgs, LLMError, openaiArgs, type ChatOpts, type LLM, type TextRun } from "@/lib/llm-core";
import { modelIssue, type ModelMetadata } from "@/lib/model-status";
import type { AccountModel } from "./types";

/**
 * A model client built from one person's stored configuration.
 *
 * It has the same shape as the deployment's own client, so every task runs on
 * it unchanged. Two differences: there is no shared budget to reserve (the
 * person is spending their own key), and every provider error is rewrapped so
 * that neither the key nor the provider's raw payload can travel back in a
 * message.
 */
function clients(m: AccountModel) {
  const options = { apiKey: m.apiKey, baseURL: m.baseUrl || undefined, maxRetries: 1, timeout: 120_000 };
  let openai: OpenAI | undefined, anthropic: Anthropic | undefined;
  return { openai: () => (openai ??= new OpenAI(options)), anthropic: () => (anthropic ??= new Anthropic(options)) };
}

function safe(error: unknown, m: AccountModel): never {
  if (error instanceof LLMError) throw error;
  if ((error as Error)?.name === "AbortError" || error instanceof OpenAI.APIUserAbortError || error instanceof Anthropic.APIUserAbortError) throw error;
  const status = typeof (error as { status?: unknown })?.status === "number" ? (error as { status: number }).status : error instanceof OpenAI.APIConnectionError || error instanceof Anthropic.APIConnectionError ? 503 : 502;
  const issue = modelIssue(error) ?? (status === 400 ? "model" : status === 503 ? "network" : undefined);
  const provider = (error as { error?: { message?: unknown } })?.error?.message;
  const text = typeof provider === "string" && provider.trim() ? provider.trim() : error instanceof Error ? error.message : "Model request failed.";
  throw new LLMError(text.replaceAll(m.apiKey, "[redacted]").slice(0, 500), status, false, issue);
}

/** The person's reasoning-effort choice replaces a task's own only when they made one. */
const withEffort = (o: ChatOpts, m: AccountModel): ChatOpts => (m.effort === "default" ? o : { ...o, effort: m.effort });

export function accountLLM(m: AccountModel): LLM {
  const c = clients(m);
  return {
    async chatText(raw) {
      const o = withEffort(raw, m);
      try {
        if (m.provider === "openai") {
          const res = await c.openai().chat.completions.create(openaiArgs(o, m.smartModel, m.tokenParam, m.disableThinking) as unknown as OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming, { signal: o.signal });
          const choice = res.choices[0];
          if (choice?.message?.refusal) throw new LLMError("The model declined this request.", 422);
          return choice?.message?.content ?? "";
        }
        const res = await c.anthropic().messages.create(anthropicArgs(o, m.smartModel), { signal: o.signal });
        if (res.stop_reason === "refusal") throw new LLMError("The model declined this request.", 422);
        return res.content.filter((b): b is Anthropic.TextBlock => b.type === "text").map((b) => b.text).join("\n");
      } catch (error) { safe(error, m); }
    },
    chatStream(raw): TextRun {
      const o = withEffort(raw, m);
      let acc = "", refusal = false;
      async function* run() {
        try {
          if (m.provider === "openai") {
            const stream = await c.openai().chat.completions.create({ ...openaiArgs(o, m.smartModel, m.tokenParam, m.disableThinking), stream: true } as unknown as OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming, { signal: o.signal });
            for await (const chunk of stream) {
              const choice = chunk.choices[0];
              if (choice?.delta?.refusal || choice?.finish_reason === "content_filter") refusal = true;
              const d = choice?.delta?.content;
              if (d) { acc += d; yield d; }
            }
            return;
          }
          const stream = c.anthropic().messages.stream(anthropicArgs(o, m.smartModel), { signal: o.signal });
          for await (const ev of stream) {
            if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && ev.delta.text) { acc += ev.delta.text; yield ev.delta.text; }
          }
          if ((await stream.finalMessage()).stop_reason === "refusal") refusal = true;
        } catch (error) { safe(error, m); }
      }
      return { deltas: run(), text: () => acc, refused: () => refusal };
    },
  };
}

/** Free, authenticated GETs against the person's endpoint. Never generates anything. */
export function accountMetadata(m: Pick<AccountModel, "provider" | "baseUrl" | "apiKey">): ModelMetadata {
  const c = clients(m as AccountModel);
  const options = { timeout: 8_000, maxRetries: 0, signal: AbortSignal.timeout(8_000) };
  return m.provider === "openai"
    ? { list: async () => ({ ids: (await c.openai().models.list(options)).data.map((x) => x.id) }), retrieve: (id) => c.openai().models.retrieve(id, options) }
    : { list: async () => { const r = await c.anthropic().models.list({ limit: 1000 }, options); return { ids: r.data.map((x) => x.id), more: r.has_more }; }, retrieve: (id) => c.anthropic().models.retrieve(id, {}, options) };
}

/** A raw /models dump mixes in embedding, speech and image models; none can hold a conversation. */
const NOT_CHAT = /embed|whisper|tts|speech|audio|dall-?e|image|moderation|rerank|transcri|stable-diffusion|flux|sora|veo|video|clip|bge|voyage/i;
export function chatModels(ids: string[]): string[] {
  return [...new Set(ids.filter((id) => typeof id === "string" && id && !NOT_CHAT.test(id)))].sort((a, b) => a.localeCompare(b));
}
