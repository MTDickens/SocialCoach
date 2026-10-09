import { z } from "zod";

export const EFFORTS = ["default", "low", "medium", "high"] as const;
export type Effort = (typeof EFFORTS)[number];

export interface AccountUser {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
}

/** What the server needs to call a model for one person. Never sent to a browser. */
export interface AccountModel {
  provider: "openai" | "anthropic";
  baseUrl: string;
  apiKey: string;
  fastModel: string;
  smartModel: string;
  tokenParam: "max_tokens" | "max_completion_tokens";
  effort: Effort;
  disableThinking: boolean;
}

/** The same, as shown back to its owner: the key is reduced to its last four characters. */
export type AccountModelView = Omit<AccountModel, "apiKey"> & { keyHint: string; updatedAt: number };

const model = z.string().trim().min(1).max(200);
export const ModelFormSchema = z.object({
  provider: z.enum(["openai", "anthropic"]),
  baseUrl: z.string().trim().min(1).max(500),
  /** Empty on an update means "keep the key already stored". */
  apiKey: z.string().trim().max(500).default(""),
  fastModel: model,
  smartModel: model,
  tokenParam: z.enum(["max_tokens", "max_completion_tokens"]).default("max_tokens"),
  effort: z.enum(EFFORTS).default("default"),
  disableThinking: z.boolean().default(false),
});
export type ModelForm = z.infer<typeof ModelFormSchema>;

export const ModelProbeSchema = z.object({
  provider: z.enum(["openai", "anthropic"]),
  baseUrl: z.string().trim().min(1).max(500),
  apiKey: z.string().trim().max(500).default(""),
});

/** The minimal D1 surface this module uses, so tests can supply their own. */
export interface D1Like {
  prepare(sql: string): D1Statement;
}
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}
