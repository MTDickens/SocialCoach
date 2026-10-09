import { open, seal } from "./crypto";
import type { AccountModel, AccountModelView, AccountUser, D1Like, Effort, ModelForm } from "./types";

type UserRow = { id: number; login: string; name: string; avatar_url: string };
type ModelRow = { provider: "openai" | "anthropic"; base_url: string; api_key_enc: string; key_hint: string; fast_model: string; smart_model: string; token_param: "max_tokens" | "max_completion_tokens"; effort: Effort; disable_thinking: number; updated_at: number };

const view = (r: ModelRow): AccountModelView => ({ provider: r.provider, baseUrl: r.base_url, keyHint: r.key_hint, fastModel: r.fast_model, smartModel: r.smart_model, tokenParam: r.token_param, effort: r.effort, disableThinking: !!r.disable_thinking, updatedAt: r.updated_at });

/** Everything the app reads or writes in D1. All statements are parameterised. */
export function accountStore(db: D1Like, secret: string) {
  const row = (userId: number) => db.prepare("SELECT provider, base_url, api_key_enc, key_hint, fast_model, smart_model, token_param, effort, disable_thinking, updated_at FROM model_configs WHERE user_id = ?").bind(userId).first<ModelRow>();
  return {
    async upsertUser(u: AccountUser, now = Date.now()): Promise<void> {
      await db.prepare("INSERT INTO users (id, login, name, avatar_url, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET login = excluded.login, name = excluded.name, avatar_url = excluded.avatar_url, last_seen_at = excluded.last_seen_at").bind(u.id, u.login, u.name, u.avatarUrl, now, now).run();
    },
    async user(id: number): Promise<AccountUser | null> {
      const r = await db.prepare("SELECT id, login, name, avatar_url FROM users WHERE id = ?").bind(id).first<UserRow>();
      return r ? { id: r.id, login: r.login, name: r.name, avatarUrl: r.avatar_url } : null;
    },
    async modelView(userId: number): Promise<AccountModelView | null> {
      const r = await row(userId);
      return r ? view(r) : null;
    },
    /** The decrypted configuration, for calling the model. Null when absent or undecryptable. */
    async model(userId: number): Promise<AccountModel | null> {
      const r = await row(userId);
      if (!r) return null;
      const apiKey = await open(secret, r.api_key_enc, String(userId));
      if (!apiKey) return null;
      const { keyHint: _hint, updatedAt: _at, ...rest } = view(r);
      void _hint; void _at;
      return { ...rest, apiKey };
    },
    /** Saves the form. An empty key keeps the stored one; returns false when there is none to keep. */
    async saveModel(userId: number, form: ModelForm, baseUrl: string, now = Date.now()): Promise<boolean> {
      let sealed: string, hint: string;
      if (form.apiKey) {
        sealed = await seal(secret, form.apiKey, String(userId));
        hint = form.apiKey.slice(-4);
      } else {
        const existing = await row(userId);
        if (!existing) return false;
        sealed = existing.api_key_enc;
        hint = existing.key_hint;
      }
      await db.prepare("INSERT INTO model_configs (user_id, provider, base_url, api_key_enc, key_hint, fast_model, smart_model, token_param, effort, disable_thinking, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET provider = excluded.provider, base_url = excluded.base_url, api_key_enc = excluded.api_key_enc, key_hint = excluded.key_hint, fast_model = excluded.fast_model, smart_model = excluded.smart_model, token_param = excluded.token_param, effort = excluded.effort, disable_thinking = excluded.disable_thinking, updated_at = excluded.updated_at")
        .bind(userId, form.provider, baseUrl, sealed, hint, form.fastModel, form.smartModel, form.tokenParam, form.effort, form.disableThinking ? 1 : 0, now).run();
      return true;
    },
    async deleteModel(userId: number): Promise<void> {
      await db.prepare("DELETE FROM model_configs WHERE user_id = ?").bind(userId).run();
    },
    /** Removes the person entirely. The model row is deleted explicitly: D1 enforces foreign keys, but this must not depend on it. */
    async deleteUser(userId: number): Promise<void> {
      await db.prepare("DELETE FROM model_configs WHERE user_id = ?").bind(userId).run();
      await db.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
    },
  };
}
export type AccountStore = ReturnType<typeof accountStore>;
