"use client";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { ChevronDown, Eye, EyeOff, LogOut, RefreshCw } from "lucide-react";
import { Button, Chip, SectionTitle } from "@/components/ui";
import { pick } from "@/lib/i18n";
import { useByok } from "@/lib/byok";
import { refreshModelAccess, useModelAccess } from "@/lib/model-access";
import { modelMessage } from "@/lib/model-copy";
import { EFFORTS, type AccountModelView, type Effort } from "@/lib/account/types";
import type { Lang } from "@/data/taxonomy";

/**
 * Sign-in and the per-person model configuration kept on the server.
 *
 * Shown only where the deployment has accounts (Cloudflare with D1). The API
 * key travels one way: it is typed here, sent once over HTTPS, encrypted at
 * rest, and never sent back — the form afterwards shows its last four
 * characters. Practice records are not part of the account; they stay in this
 * browser.
 */
type Account = { available: boolean; user: { login: string; name: string; avatarUrl: string } | null; model: AccountModelView | null };
type AccountState = { account: Account | null; load: () => Promise<void>; set: (patch: Partial<Account>) => void };
export const useAccount = create<AccountState>((set) => ({
  account: null,
  load: async () => {
    try {
      const response = await fetch("/api/account", { cache: "no-store" });
      set({ account: response.ok ? ((await response.json()) as Account) : { available: false, user: null, model: null } });
    } catch {
      set({ account: { available: false, user: null, model: null } });
    }
  },
  set: (patch) => set((s) => ({ account: s.account ? { ...s.account, ...patch } : s.account })),
}));

const copy = {
  title: { zh: "账号与模型", en: "Account & model" },
  signedOut: { zh: "登录后，你的模型地址、密钥和模型选择保存在账号里，换一台设备登录就能直接用。", en: "Sign in and your model endpoint, key and model choices are kept with your account, ready on any device you sign in from." },
  stored: { zh: "账号里只存这些：你的 GitHub 用户名和头像、模型地址、加密后的密钥、模型名。练习记录、草稿和笔记不上传，仍只在这台设备的浏览器里。", en: "The account holds only this: your GitHub username and avatar, the model endpoint, the encrypted key and model names. Practice records, drafts and notes are not uploaded; they stay in this browser." },
  signIn: { zh: "用 GitHub 登录", en: "Sign in with GitHub" },
  signOut: { zh: "退出登录", en: "Sign out" },
  provider: { zh: "接口格式", en: "API format" },
  openai: { zh: "OpenAI 兼容（多数中转站）", en: "OpenAI-compatible (most gateways)" },
  anthropic: { zh: "Anthropic 原生", en: "Anthropic native" },
  base: { zh: "API 地址（base URL）", en: "API base URL" },
  baseHint: { zh: "中转站给你的地址，通常以 /v1 结尾。必须是 https。", en: "The address your gateway gave you, usually ending in /v1. Must be https." },
  key: { zh: "API key", en: "API key" },
  keySaved: { zh: "已保存，结尾是 {hint}。留空表示不更换。", en: "Saved, ending in {hint}. Leave empty to keep it." },
  keyHint: { zh: "只在保存时发送一次，加密后存储，之后不会再显示。", en: "Sent once when you save, stored encrypted, and never shown again." },
  show: { zh: "显示密钥", en: "Show key" },
  hide: { zh: "隐藏密钥", en: "Hide key" },
  fetch: { zh: "从这个地址获取模型列表", en: "Fetch the model list from this address" },
  fetched: { zh: "找到 {n} 个模型，在下面两栏里选。", en: "Found {n} models. Pick from the two fields below." },
  fetchFailed: { zh: "这个地址没有返回模型列表（有些中转站不提供）。直接填写模型名即可。", en: "This address returned no model list (some gateways do not serve one). Type the model names instead." },
  fast: { zh: "对话模型", en: "Conversation model" },
  fastHint: { zh: "扮演对方、给提示、生成场景。选一个反应快的中档模型。", en: "Plays the other side, gives hints, generates scenes. Pick a quick mid-tier model." },
  smart: { zh: "复盘模型", en: "Debrief model" },
  smartHint: { zh: "写复盘和写作台点评。选列表里最强的；留空则与对话模型相同。", en: "Writes debriefs and writing-desk reviews. Pick the strongest listed; empty means the same as the conversation model." },
  effort: { zh: "推理强度（reasoning effort）", en: "Reasoning effort" },
  effortHint: { zh: "「默认」不发送这个参数。只有模型和中转站都支持时才改；不支持会报模型错误，改回默认即可。", en: "‘Default’ does not send the parameter. Change it only if both the model and the gateway support it; if they do not you will get a model error — set it back to default." },
  efforts: { default: { zh: "默认", en: "Default" }, low: { zh: "低", en: "Low" }, medium: { zh: "中", en: "Medium" }, high: { zh: "高", en: "High" } },
  advanced: { zh: "高级", en: "Advanced" },
  tokenParam: { zh: "输出长度参数名", en: "Output-length parameter" },
  noThinking: { zh: "短任务关闭思考（仅当中转站支持 thinking: disabled）", en: "Disable thinking on short tasks (only if the gateway supports thinking: disabled)" },
  save: { zh: "保存并检查连接", en: "Save and check the connection" },
  saved: { zh: "已保存。", en: "Saved." },
  unverified: { zh: "已保存。这个地址不提供可核对的模型信息，实际能否使用要练一次才知道。", en: "Saved. This address offers no model metadata to verify against; one real practice will tell whether it works." },
  remove: { zh: "删除保存的模型配置", en: "Delete the saved model configuration" },
  removeAccount: { zh: "删除账号", en: "Delete account" },
  confirmAccount: { zh: "再点一次确认：删除账号和保存的密钥", en: "Click again to confirm: delete the account and the saved key" },
  local: { zh: "这台设备的浏览器里还有一份本机模型配置，它会优先于账号配置。", en: "This browser also holds a local model configuration, which takes priority over the account's." },
  localOff: { zh: "停用本机配置，改用账号", en: "Turn the local one off and use the account" },
  errors: {
    invalid: { zh: "有必填项没填，或内容过长。", en: "A required field is empty or too long." },
    endpoint: { zh: "API 地址需要是公网的 https 地址。", en: "The API address must be a public https address." },
    "key-required": { zh: "请填写 API key。", en: "Enter the API key." },
    "probe-failed": { zh: "", en: "" },
    "signed-out": { zh: "登录已失效，请重新登录。", en: "Your sign-in has expired. Sign in again." },
    forbidden: { zh: "请求被拒绝，请刷新页面后重试。", en: "The request was refused. Reload the page and retry." },
    unavailable: { zh: "这个部署没有启用账号。", en: "Accounts are not enabled on this deployment." },
    network: { zh: "没连上服务器，请稍后重试。", en: "Could not reach the server. Try again shortly." },
  },
  outcome: {
    "signed-in": { zh: "已登录。", en: "Signed in." },
    "not-invited": { zh: "这个 GitHub 账号不在允许名单里。请让站点的主人把你的用户名加进去。", en: "This GitHub account is not on the allow-list. Ask the site's owner to add your username." },
    failed: { zh: "登录没有完成，请再试一次。", en: "Sign-in did not complete. Please try again." },
    cancelled: { zh: "你取消了登录。", en: "You cancelled the sign-in." },
    unavailable: { zh: "这个部署没有启用账号。", en: "Accounts are not enabled on this deployment." },
  },
} as const;

type Form = { provider: "openai" | "anthropic"; baseUrl: string; apiKey: string; fastModel: string; smartModel: string; tokenParam: "max_tokens" | "max_completion_tokens"; effort: Effort; disableThinking: boolean };
const fromModel = (m: AccountModelView | null): Form => ({ provider: m?.provider ?? "openai", baseUrl: m?.baseUrl ?? "", apiKey: "", fastModel: m?.fastModel ?? "", smartModel: m && m.smartModel !== m.fastModel ? m.smartModel : "", tokenParam: m?.tokenParam ?? "max_tokens", effort: m?.effort ?? "default", disableThinking: m?.disableThinking ?? false });
const input = "h-11 w-full min-w-0 px-3.5 rounded-xl bg-card border border-line text-[16px] sm:text-[14px] focus:border-ink transition-colors placeholder:text-ink-4";
type ErrorCode = keyof typeof copy.errors;

async function call(path: string, method: string, body?: unknown): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false; error: ErrorCode }> {
  try {
    const response = await fetch(path, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (response.ok) return { ok: true, data };
    return { ok: false, error: typeof data.error === "string" && data.error in copy.errors ? (data.error as ErrorCode) : "network" };
  } catch {
    return { ok: false, error: "network" };
  }
}

function ModelForm({ model, lang }: { model: AccountModelView | null; lang: Lang }) {
  const setAccount = useAccount((s) => s.set);
  const access = useModelAccess();
  const [form, setForm] = useState<Form>(() => fromModel(model));
  const [visible, setVisible] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [busy, setBusy] = useState<"save" | "fetch" | null>(null);
  const [note, setNote] = useState<{ tone: "ok" | "bad" | "plain"; text: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const update = (patch: Partial<Form>) => { setForm((f) => ({ ...f, ...patch })); setNote(null); };
  const ready = !!form.baseUrl.trim() && !!form.fastModel.trim() && (!!form.apiKey.trim() || !!model);
  // A stored key may only be reused against the endpoint it was stored for.
  const canFetch = !!form.baseUrl.trim() && (!!form.apiKey.trim() || (!!model && model.baseUrl === form.baseUrl.trim() && model.provider === form.provider));

  const fetchModels = async () => {
    setBusy("fetch");
    const result = await call("/api/account/models", "POST", { provider: form.provider, baseUrl: form.baseUrl, apiKey: form.apiKey });
    setBusy(null);
    if (result.ok && Array.isArray(result.data.models) && result.data.models.length) {
      const ids = result.data.models.filter((x): x is string => typeof x === "string");
      setModels(ids);
      setNote({ tone: "plain", text: pick(copy.fetched, lang).replace("{n}", String(ids.length)) });
    } else {
      setModels([]);
      setNote({ tone: result.ok || result.error === "probe-failed" ? "plain" : "bad", text: result.ok || result.error === "probe-failed" ? pick(copy.fetchFailed, lang) : pick(copy.errors[result.error], lang) });
    }
  };
  const save = async () => {
    setBusy("save");
    const result = await call("/api/account/model", "PUT", { ...form, smartModel: form.smartModel.trim() || form.fastModel.trim() });
    setBusy(null);
    if (!result.ok) { setNote({ tone: "bad", text: pick(copy.errors[result.error], lang) }); return; }
    const saved = result.data.model as AccountModelView;
    setAccount({ model: saved });
    setForm(fromModel(saved));
    setChecking(true);
    await refreshModelAccess(true);
    setChecking(false);
  };
  const remove = async () => {
    setBusy("save");
    const result = await call("/api/account/model", "DELETE");
    setBusy(null);
    if (!result.ok) { setNote({ tone: "bad", text: pick(copy.errors[result.error], lang) }); return; }
    setAccount({ model: null });
    setForm(fromModel(null));
    setModels([]);
    void refreshModelAccess(true);
  };
  // After a save, report what the connection check found for the saved configuration.
  const status = model && !note && !busy && !checking && access.source === "server"
    ? access.state === "available" ? { tone: "ok" as const, text: pick(copy.saved, lang) }
      : access.state === "unverified" ? { tone: "plain" as const, text: pick(copy.unverified, lang) }
        : access.state === "unavailable" ? { tone: "bad" as const, text: modelMessage(access.issue ?? "service", lang) } : null
    : null;
  const shown = note ?? status;
  const listId = models.length ? "account-models" : undefined;

  return (
    <div className="flex flex-col gap-5">
      <fieldset disabled={!!busy} className="flex flex-col gap-5 disabled:opacity-70">
        <div>
          <p className="eyebrow mb-2">{pick(copy.provider, lang)}</p>
          <div className="flex flex-wrap gap-2">
            {(["openai", "anthropic"] as const).map((p) => <Chip key={p} active={form.provider === p} onClick={() => { if (p !== form.provider) { update({ provider: p }); setModels([]); } }}>{pick(copy[p], lang)}</Chip>)}
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{pick(copy.base, lang)}</span>
          <input type="url" value={form.baseUrl} onChange={(e) => { update({ baseUrl: e.target.value }); setModels([]); }} autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} placeholder="https://api.example.com/v1" />
          <span className="text-[12px] text-ink-3">{pick(copy.baseHint, lang)}</span>
        </label>
        <div className="flex flex-col gap-2">
          <label htmlFor="account-key" className="eyebrow">{pick(copy.key, lang)}</label>
          <div className="relative">
            <input id="account-key" type={visible ? "text" : "password"} autoComplete="off" spellCheck={false} value={form.apiKey} onChange={(e) => update({ apiKey: e.target.value })} className={`${input} pr-12`} placeholder={model ? `····${model.keyHint}` : "sk-…"} />
            <button type="button" aria-label={pick(visible ? copy.hide : copy.show, lang)} onClick={() => setVisible((v) => !v)} className="press absolute right-0 top-0 h-11 w-11 inline-flex items-center justify-center text-ink-3">{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          <span className="text-[12px] text-ink-3">{model ? pick(copy.keySaved, lang).replace("{hint}", model.keyHint) : pick(copy.keyHint, lang)}</span>
        </div>
        <Button variant="secondary" className="self-start" loading={busy === "fetch"} disabled={!canFetch} onClick={fetchModels}><RefreshCw size={15} />{pick(copy.fetch, lang)}</Button>
        {listId && <datalist id={listId}>{models.map((id) => <option key={id} value={id} />)}</datalist>}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{pick(copy.fast, lang)}</span>
            <input list={listId} value={form.fastModel} onChange={(e) => update({ fastModel: e.target.value })} autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} />
            <span className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.fastHint, lang)}</span>
          </label>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{pick(copy.smart, lang)}</span>
            <input list={listId} value={form.smartModel} onChange={(e) => update({ smartModel: e.target.value })} autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} />
            <span className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.smartHint, lang)}</span>
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <p className="eyebrow">{pick(copy.effort, lang)}</p>
          <div className="flex flex-wrap gap-2">{EFFORTS.map((e) => <Chip key={e} small active={form.effort === e} onClick={() => update({ effort: e })}>{pick(copy.efforts[e], lang)}</Chip>)}</div>
          <p className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.effortHint, lang)}</p>
        </div>
        {form.provider === "openai" && (
          <details className="group">
            <summary className="press min-h-11 flex items-center justify-between cursor-pointer text-[13px] text-ink-3">{pick(copy.advanced, lang)}<ChevronDown size={15} aria-hidden className="group-open:rotate-180 transition-transform" /></summary>
            <div className="flex flex-col gap-4 pt-2">
              <label className="flex flex-col gap-2"><span className="eyebrow">{pick(copy.tokenParam, lang)}</span>
                <select className={input} value={form.tokenParam} onChange={(e) => update({ tokenParam: e.target.value as Form["tokenParam"] })}><option>max_tokens</option><option>max_completion_tokens</option></select>
              </label>
              <label className="press flex min-h-11 items-center gap-3 text-[13px]"><input type="checkbox" checked={form.disableThinking} onChange={(e) => update({ disableThinking: e.target.checked })} className="h-4 w-4" />{pick(copy.noThinking, lang)}</label>
            </div>
          </details>
        )}
      </fieldset>
      {shown && <p role="status" className={`text-[13px] leading-relaxed ${shown.tone === "bad" ? "text-danger" : shown.tone === "ok" ? "text-moss" : "text-ink-3"}`}>{shown.text}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <Button loading={busy === "save" || checking} disabled={!ready} onClick={save}>{pick(copy.save, lang)}</Button>
        {model && <button type="button" disabled={!!busy} onClick={remove} className="press min-h-11 text-[13px] text-ink-3 hover:text-danger">{pick(copy.remove, lang)}</button>}
      </div>
    </div>
  );
}

export function AccountPanel({ lang }: { lang: Lang }) {
  const { account, load } = useAccount();
  const localEnabled = useByok((s) => s.enabled);
  const [outcome, setOutcome] = useState<keyof typeof copy.outcome | null>(null);
  const [confirming, setConfirming] = useState(false);
  const read = useRef(false);
  useEffect(() => {
    void load();
    if (read.current) return;
    read.current = true;
    // The sign-in round trip ends at /settings?account=<word>; show it once and tidy the address bar.
    const url = new URL(window.location.href);
    const word = url.searchParams.get("account");
    if (word) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the return address
      if (word in copy.outcome) setOutcome(word as keyof typeof copy.outcome);
      url.searchParams.delete("account");
      window.history.replaceState(null, "", url.pathname + (url.search || "") + url.hash);
      if (word === "signed-in") void refreshModelAccess(true);
    }
  }, [load]);
  if (!account) return null;
  if (!account.available && !outcome) return null;
  const signOut = async () => { await call("/api/auth/logout", "POST"); await load(); void refreshModelAccess(true); };
  const removeAccount = async () => {
    if (!confirming) { setConfirming(true); return; }
    await call("/api/account", "DELETE");
    setConfirming(false);
    await load();
    void refreshModelAccess(true);
  };
  return (
    <section id="account" className="flex flex-col gap-4 scroll-mt-6 lg:col-span-2 border-b border-line pb-10">
      <SectionTitle>{pick(copy.title, lang)}</SectionTitle>
      {outcome && <p role="status" className={`text-[13px] leading-relaxed ${outcome === "signed-in" ? "text-moss" : "text-danger"}`}>{pick(copy.outcome[outcome], lang)}</p>}
      {account.available && !account.user && (
        <div className="card p-5 flex flex-col gap-4 max-w-[var(--form-max)]">
          <p className="text-[14px] text-ink-2 leading-relaxed">{pick(copy.signedOut, lang)}</p>
          <a href="/api/auth/login" className="press self-start inline-flex items-center justify-center min-h-11 px-5 rounded-[var(--radius-sm)] bg-action text-accent-ink text-[14px] font-semibold">{pick(copy.signIn, lang)}</a>
          <p className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.stored, lang)}</p>
        </div>
      )}
      {account.available && account.user && (
        <div className="flex flex-col gap-6 max-w-[var(--form-max)]">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- a remote avatar; nothing to optimise */}
            {account.user.avatarUrl && <img src={account.user.avatarUrl} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-line" referrerPolicy="no-referrer" />}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[15px] truncate">{account.user.name || account.user.login}</p>
              <p className="text-[12px] text-ink-3 truncate">@{account.user.login}</p>
            </div>
            <button type="button" onClick={signOut} className="press inline-flex items-center gap-1.5 min-h-11 px-2 text-[13px] text-ink-2"><LogOut size={15} aria-hidden />{pick(copy.signOut, lang)}</button>
          </div>
          {localEnabled && (
            <div className="rounded-[var(--radius-sm)] bg-paper-deep px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-ink-2 leading-relaxed">{pick(copy.local, lang)}</p>
              <button type="button" onClick={() => { useByok.getState().set({ enabled: false }); void refreshModelAccess(true); }} className="press min-h-11 text-[13px] font-medium text-accent-deep">{pick(copy.localOff, lang)}</button>
            </div>
          )}
          <ModelForm key={account.model?.updatedAt ?? "new"} model={account.model} lang={lang} />
          <p className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.stored, lang)}</p>
          <button type="button" onClick={removeAccount} onBlur={() => setConfirming(false)} className="press self-start min-h-11 text-[13px] text-ink-3 hover:text-danger">{pick(confirming ? copy.confirmAccount : copy.removeAccount, lang)}</button>
        </div>
      )}
    </section>
  );
}
