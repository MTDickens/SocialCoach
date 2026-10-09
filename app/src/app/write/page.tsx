"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Copy, Mail, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { Shell } from "@/components/Shell";
import { Button, Chip, ChoiceGroup, Page, Stages } from "@/components/ui";
import { useApp, useLang } from "@/store/useApp";
import { pick } from "@/lib/i18n";
import { reviewDraft } from "@/lib/client-api";
import { theoryById } from "@/data/corpus";
import { relDate } from "@/lib/format";
import { MAX_DRAFT_CHARS, NOTE_LABELS, WRITING_INFO, WRITING_KINDS, WritingInputSchema, type WritingDraft, type WritingKind, type WritingReview } from "@/lib/writing";
import type { Lang } from "@/data/taxonomy";

const copy = {
  eyebrow: { zh: "写作台", en: "Writing desk" },
  heading: { zh: "发出去之前，\n先让收件人读一遍。", en: "Before you send it,\nlet the recipient read it once." },
  sub: {
    zh: "贴上草稿。一位模拟的收件人只读一遍，告诉你他读懂了什么、会不会回；然后逐条指出你原文里起作用和不起作用的地方。改写只会删和调，不会替你加成果。",
    en: "Paste a draft. A simulated recipient reads it once and tells you what they understood and whether they would act; then each note points at the exact words that helped or hurt. The rewrite cuts and reorders — it never adds an achievement for you.",
  },
  kind: { zh: "这是什么", en: "What is this" },
  draft: { zh: "草稿", en: "Draft" },
  recipient: { zh: "谁会读它", en: "Who reads it" },
  aim: { zh: "你想要什么", en: "What you want" },
  facts: { zh: "关于你的工作，哪些是确定的（可选）", en: "What is actually true about your work (optional)" },
  factsNote: { zh: "改写只会用草稿和这里写到的事实。", en: "The rewrite uses only facts found in the draft or written here." },
  factsPh: { zh: "例如：我是共同一作，负责评测部分；结果在两个数据集上成立，第三个上不成立。", en: "e.g. I am co-first author and did the evaluation; the result holds on two datasets and not on a third." },
  submit: { zh: "让收件人读一遍", en: "Let the recipient read it" },
  again: { zh: "改完再读一遍", en: "Read it again after edits" },
  short: { zh: "草稿至少 20 个字。", en: "The draft needs at least 20 characters." },
  working: { zh: "收件人正在读", en: "The recipient is reading" },
  steps: {
    zh: ["以收件人的身份只读一遍", "找出请求在哪里", "核对每一处引文都在你的原文里", "改写，并检查没有多出你没写过的事实"],
    en: ["Reading once, as the recipient", "Locating the ask", "Checking every quotation is in your text", "Rewriting, and checking nothing was added"],
  },
  reader: { zh: "收件人读完之后", en: "After one read, the recipient" },
  decision: {
    yes: { zh: "会照你希望的做", en: "Would do what you hope" },
    maybe: { zh: "可能会，也可能放着", en: "Might — or might leave it" },
    no: { zh: "多半不会回应", en: "Probably would not respond" },
  },
  understood: { zh: "他读到的是", en: "What they took away" },
  because: { zh: "主要原因", en: "The main reason" },
  ask: { zh: "你的请求", en: "Your ask" },
  askMissing: { zh: "原文里没有找到一个明确的请求。", en: "No clear request was found in the draft." },
  calibration: { zh: "分寸", en: "Calibration" },
  level: {
    under: { zh: "说小了", en: "Under-stated" },
    right: { zh: "分寸合适", en: "Well calibrated" },
    over: { zh: "说大了", en: "Over-stated" },
    mixed: { zh: "有的地方大，有的地方小", en: "Over in places, under in others" },
  },
  marked: { zh: "你的原文，带批注", en: "Your draft, annotated" },
  notes: { zh: "逐条批注", en: "Notes" },
  fix: { zh: "可以改成", en: "Try" },
  revision: { zh: "改写稿", en: "Rewrite" },
  revisionNote: { zh: "只做了删减、调序和改写；方括号里是只有你能补的内容。发之前请自己再读一遍。", en: "Cut, reordered and rephrased only; square brackets mark what only you can fill in. Read it yourself before sending." },
  missing: { zh: "需要你补充", en: "For you to supply" },
  copyText: { zh: "复制改写稿", en: "Copy rewrite" },
  copied: { zh: "已复制", en: "Copied" },
  use: { zh: "把改写稿放回编辑区", en: "Move rewrite into the editor" },
  sources: { zh: "依据", en: "Grounded in" },
  honest: { zh: "这位收件人是练习对象，不是对任何真人反应的预测。", en: "This recipient is a practice partner, not a prediction of how any real person will react." },
  saved: { zh: "读过的草稿", en: "Drafts already read" },
  savedNote: { zh: "保存在此设备，随数据导出。", en: "Kept on this device and included in your export." },
  remove: { zh: "删除这份草稿", en: "Delete this draft" },
  guide: { zh: "场合手册", en: "Field guide" },
  back: { zh: "今日", en: "Today" },
  chars: { zh: "字", en: "chars" },
} as const;

const DRAFT_KEY = "socialcoach.writing-draft";
type Form = { kind: WritingKind; draft: string; recipient: string; aim: string; facts: string };
const EMPTY: Form = { kind: "cold-email", draft: "", recipient: "", aim: "", facts: "" };

function readForm(): Form {
  try {
    const raw = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "null") as Partial<Form> | null;
    if (raw && typeof raw === "object" && WRITING_KINDS.includes(raw.kind as WritingKind)) {
      const text = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
      return { kind: raw.kind as WritingKind, draft: text(raw.draft, MAX_DRAFT_CHARS), recipient: text(raw.recipient, 1000), aim: text(raw.aim, 600), facts: text(raw.facts, 2000) };
    }
  } catch {}
  return EMPTY;
}

/** The draft with each quoted span underlined, in the order they occur. Overlaps keep the earlier note. */
function Annotated({ draft, review, lang }: { draft: string; review: WritingReview; lang: Lang }) {
  const parts = useMemo(() => {
    const spans = review.notes
      .map((n, i) => ({ i, start: draft.indexOf(n.quote), len: n.quote.length, strong: n.kind === "strong" }))
      .filter((s) => s.start >= 0)
      .sort((a, b) => a.start - b.start);
    const out: { text: string; note?: number; strong?: boolean }[] = [];
    let at = 0;
    for (const s of spans) {
      if (s.start < at) continue;
      if (s.start > at) out.push({ text: draft.slice(at, s.start) });
      out.push({ text: draft.slice(s.start, s.start + s.len), note: s.i, strong: s.strong });
      at = s.start + s.len;
    }
    if (at < draft.length) out.push({ text: draft.slice(at) });
    return out;
  }, [draft, review]);
  return (
    <p className="whitespace-pre-wrap text-[15px] leading-[1.9] text-ink-2">
      {parts.map((p, i) =>
        p.note === undefined ? (
          <span key={i}>{p.text}</span>
        ) : (
          <a key={i} href={`#note-${p.note}`} className={clsx("underline decoration-2 underline-offset-4 text-ink", p.strong ? "decoration-moss" : "decoration-accent")} aria-label={`${pick(NOTE_LABELS[review.notes[p.note].kind], lang)}: ${p.text}`}>
            {p.text}
            <sup className="num text-[10px] text-ink-3 ml-0.5">{p.note + 1}</sup>
          </a>
        ),
      )}
    </p>
  );
}

function Review({ entry, lang, onUse }: { entry: WritingDraft; lang: Lang; onUse: (text: string) => void }) {
  const r = entry.review!;
  const [copied, setCopied] = useState(false);
  const tone = r.read.decision === "yes" ? "bg-moss-soft text-moss" : r.read.decision === "maybe" ? "bg-accent-soft text-accent-deep" : "bg-danger-soft text-danger";
  const copyRevision = async () => {
    try {
      await navigator.clipboard.writeText(r.revision);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className="flex flex-col gap-7">
      <section className="card p-5 lg:p-7 flex flex-col gap-4" aria-labelledby="reader-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="reader-title" className="eyebrow">{pick(copy.reader, lang)}</h2>
          <span className={clsx("h-7 px-3 inline-flex items-center rounded-full text-[12px] font-semibold", tone)}>{pick(copy.decision[r.read.decision], lang)}</span>
        </div>
        <div>
          <p className="text-[12px] text-ink-3 mb-1.5">{pick(copy.understood, lang)}</p>
          <blockquote className="display text-[19px] lg:text-[21px] leading-snug">“{r.read.understood}”</blockquote>
        </div>
        <p className="text-[14px] text-ink-2 leading-relaxed"><span className="text-ink-3">{pick(copy.because, lang)} · </span>{r.read.because}</p>
        <p className="text-[12px] text-ink-3 dotted pt-3">{pick(copy.honest, lang)}</p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="flex flex-col gap-2">
          <h2 className="eyebrow">{pick(copy.ask, lang)}</h2>
          {r.ask.found ? <blockquote className="text-[14px] leading-relaxed border-l-2 border-accent pl-3">“{r.ask.quote}”</blockquote> : <p className="text-[14px] text-danger">{pick(copy.askMissing, lang)}</p>}
          {r.ask.note && <p className="text-[13px] text-ink-2 leading-relaxed">{r.ask.note}</p>}
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="eyebrow">{pick(copy.calibration, lang)} · <span className="text-ink-2">{pick(copy.level[r.calibration.level], lang)}</span></h2>
          {r.calibration.quote && <blockquote className="text-[14px] leading-relaxed border-l-2 border-line-strong pl-3">“{r.calibration.quote}”</blockquote>}
          <p className="text-[13px] text-ink-2 leading-relaxed">{r.calibration.why}</p>
        </section>
      </div>

      {r.notes.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="display text-[20px]">{pick(copy.marked, lang)}</h2>
          <div className="rounded-[var(--radius)] bg-paper-deep p-5"><Annotated draft={entry.draft} review={r} lang={lang} /></div>
          <ol className="flex flex-col" aria-label={pick(copy.notes, lang)}>
            {r.notes.map((n, i) => (
              <li key={i} id={`note-${i}`} className="notebook-row py-4 flex gap-3 scroll-mt-24">
                <span className="num text-[11px] h-6 w-6 shrink-0 inline-flex items-center justify-center rounded-full border border-line text-ink-3">{i + 1}</span>
                <div className="min-w-0 flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold" style={{ color: n.kind === "strong" ? "var(--moss)" : "var(--accent-deep)" }}>{pick(NOTE_LABELS[n.kind], lang)}</p>
                  <blockquote className="text-[14px] text-ink leading-relaxed">“{n.quote}”</blockquote>
                  <p className="text-[13px] text-ink-2 leading-relaxed">{n.why}</p>
                  {n.fix && <p className="text-[13px] text-ink-2 leading-relaxed"><span className="text-ink-3">{pick(copy.fix, lang)} · </span>{n.fix}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {r.revision && (
        <section className="flex flex-col gap-3">
          <h2 className="display text-[20px]">{pick(copy.revision, lang)}</h2>
          <div className="card p-5"><p className="whitespace-pre-wrap text-[15px] leading-[1.9]">{r.revision}</p></div>
          <p className="text-[12px] text-ink-3 leading-relaxed">{pick(copy.revisionNote, lang)}</p>
          {r.missing.length > 0 && (
            <div>
              <p className="eyebrow mb-2">{pick(copy.missing, lang)}</p>
              <ul className="flex flex-col gap-1.5">{r.missing.map((m, i) => <li key={i} className="text-[13px] text-ink-2 leading-relaxed flex gap-2"><span className="text-accent-deep">—</span>{m}</li>)}</ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={copyRevision}>{copied ? <Check size={16} /> : <Copy size={16} />}{pick(copied ? copy.copied : copy.copyText, lang)}</Button>
            <Button variant="ghost" onClick={() => onUse(r.revision)}>{pick(copy.use, lang)}</Button>
          </div>
        </section>
      )}

      {r.sources.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="eyebrow">{pick(copy.sources, lang)}</h2>
          <ul className="flex flex-col gap-1.5">
            {r.sources.map((id) => {
              const th = theoryById(id);
              if (!th) return null;
              return (
                <li key={id} className="text-[13px] text-ink-2 leading-relaxed">
                  {th.title[lang]} <span className="text-ink-3">— {th.source.book}, {th.source.author}</span>
                  {th.source.url && <a href={th.source.url} target="_blank" rel="noreferrer" className="press inline-flex items-center gap-0.5 ml-1.5 text-accent-deep"><ArrowUpRight size={13} aria-hidden /><span className="sr-only">{th.source.book}</span></a>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function Write() {
  const lang = useLang();
  const { profile, writingDrafts, saveWritingDraft, removeWritingDraft } = useApp();
  const [form, setForm] = useState<Form>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const result = useRef<HTMLDivElement>(null);
  const editor = useRef<HTMLTextAreaElement>(null);

  // Restored after mount: sessionStorage does not exist while the page is prerendered.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of tab storage
    setForm(readForm());
    setLoaded(true);
    return () => abort.current?.abort();
  }, []);
  const update = (patch: Partial<Form>) => {
    const next = { ...form, ...patch };
    setForm(next);
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next)); } catch {}
  };

  const info = WRITING_INFO[form.kind];
  const current = writingDrafts.find((d) => d.id === openId) ?? null;
  const valid = WritingInputSchema.safeParse({ ...form, lang }).success;

  const submit = async () => {
    if (busy || !valid) return;
    abort.current?.abort();
    const owned = new AbortController();
    abort.current = owned;
    setBusy(true);
    setErr(null);
    try {
      const input = WritingInputSchema.parse({ ...form, lang });
      const review = await reviewDraft(input, owned.signal);
      if (owned.signal.aborted) return;
      const entry: WritingDraft = { id: crypto.randomUUID(), at: Date.now(), kind: input.kind, draft: input.draft, recipient: input.recipient, aim: input.aim, facts: input.facts, lang, review };
      saveWritingDraft(entry);
      setOpenId(entry.id);
      requestAnimationFrame(() => result.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch (e) {
      if (!owned.signal.aborted) setErr(e instanceof Error ? e.message : String(e));
    } finally {
      if (abort.current === owned) { abort.current = null; setBusy(false); }
    }
  };

  if (!profile) return null;
  const field = "block w-full px-4 py-3 rounded-[var(--radius-sm)] bg-card border border-line text-[15px] leading-relaxed placeholder:text-ink-3";

  return (
    <Shell>
      <Page className="pt-4 lg:pt-8 flex flex-col gap-7 pb-8 max-w-[var(--focus-max)] mx-auto">
        <Link href="/" className="press self-start inline-flex items-center gap-2 text-[13px] text-ink-3 min-h-11 rounded-full hover:bg-inset px-2 -ml-2 lg:hidden">
          <ArrowLeft size={16} />{pick(copy.back, lang)}
        </Link>
        <header className="border-b border-line pb-6">
          <p className="eyebrow flex items-center gap-2"><Mail size={14} className="text-accent-deep" />{pick(copy.eyebrow, lang)}</p>
          <h1 className="display text-[30px] lg:text-[38px] leading-[1.3] whitespace-pre-line mt-3">{pick(copy.heading, lang)}</h1>
          <p className="text-[14px] text-ink-2 mt-4 leading-relaxed max-w-[var(--measure)]">{pick(copy.sub, lang)}</p>
        </header>

        <section className="flex flex-col gap-5 max-w-[var(--form-max)]" aria-busy={busy}>
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{pick(copy.kind, lang)}</span>
            <ChoiceGroup className="flex flex-wrap gap-2" label={pick(copy.kind, lang)}>
              {WRITING_KINDS.map((k) => <Chip key={k} active={form.kind === k} onClick={() => update({ kind: k })}>{pick(WRITING_INFO[k].name, lang)}</Chip>)}
            </ChoiceGroup>
            <p className="text-[13px] text-ink-3 leading-relaxed">{pick(info.hint, lang)}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="write-draft" className="font-semibold text-[15px]">{pick(copy.draft, lang)}</label>
            <div className="writing-field overflow-hidden">
              <textarea id="write-draft" ref={editor} value={form.draft} onChange={(e) => update({ draft: e.target.value })} rows={10} maxLength={MAX_DRAFT_CHARS} disabled={busy || !loaded} placeholder={pick(info.draftPh, lang)} className="block w-full px-5 pt-5 pb-3 bg-transparent text-base leading-[1.8] placeholder:text-ink-3 focus:outline-none" />
              <p className="px-5 pb-4 text-[12px] text-ink-3 num">{form.draft.length} / {MAX_DRAFT_CHARS} {pick(copy.chars, lang)}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow">{pick(copy.recipient, lang)}</span>
              <textarea value={form.recipient} onChange={(e) => update({ recipient: e.target.value })} rows={3} maxLength={1000} disabled={busy} placeholder={pick(info.recipientPh, lang)} className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow">{pick(copy.aim, lang)}</span>
              <textarea value={form.aim} onChange={(e) => update({ aim: e.target.value })} rows={3} maxLength={600} disabled={busy} placeholder={pick(info.aimPh, lang)} className={field} />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="eyebrow">{pick(copy.facts, lang)}</span>
            <textarea value={form.facts} onChange={(e) => update({ facts: e.target.value })} rows={2} maxLength={2000} disabled={busy} placeholder={pick(copy.factsPh, lang)} className={field} />
            <span className="text-[12px] text-ink-3">{pick(copy.factsNote, lang)}</span>
          </label>

          {err && <div role="alert" className="rounded-[var(--radius-sm)] p-4 bg-danger-soft text-[13px] text-danger leading-relaxed">{err}</div>}
          {busy ? (
            <div role="status" className="card p-5"><Stages title={pick(copy.working, lang)} steps={[...copy.steps[lang]]} /></div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Button requiresModel size="lg" disabled={!valid} onClick={submit}>{pick(current ? copy.again : copy.submit, lang)}</Button>
              {!valid && form.draft.trim().length > 0 && form.draft.trim().length < 20 && <p className="text-[13px] text-ink-3">{pick(copy.short, lang)}</p>}
            </div>
          )}
        </section>

        <div ref={result} className="scroll-mt-6 max-w-[var(--form-max)]">
          {current?.review && !busy && <Review entry={current} lang={lang} onUse={(text) => { update({ draft: text }); editor.current?.focus(); editor.current?.scrollIntoView({ block: "center", behavior: "smooth" }); }} />}
        </div>

        {writingDrafts.length > 0 && (
          <section className="flex flex-col gap-2 pt-6 border-t border-line max-w-[var(--form-max)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h2 className="display text-[20px]">{pick(copy.saved, lang)}</h2>
              <p className="text-[12px] text-ink-3">{pick(copy.savedNote, lang)}</p>
            </div>
            <ul className="flex flex-col">
              {writingDrafts.map((d) => (
                <li key={d.id} className="notebook-row flex items-center gap-2">
                  <button onClick={() => { setOpenId(d.id); update({ kind: d.kind, draft: d.draft, recipient: d.recipient, aim: d.aim, facts: d.facts }); requestAnimationFrame(() => result.current?.scrollIntoView({ block: "start", behavior: "smooth" })); }} className="press flex-1 min-w-0 text-left py-4" aria-current={openId === d.id ? "true" : undefined}>
                    <span className="block text-[12px] text-ink-3">{pick(WRITING_INFO[d.kind].name, lang)} · {relDate(d.at, lang)}{d.review ? ` · ${pick(copy.decision[d.review.read.decision], lang)}` : ""}</span>
                    <span className="block text-[14px] font-medium truncate mt-1">{d.draft.replace(/\s+/g, " ").slice(0, 90)}</span>
                  </button>
                  <button onClick={() => { if (openId === d.id) setOpenId(null); removeWritingDraft(d.id); }} aria-label={pick(copy.remove, lang)} className="press h-11 w-11 shrink-0 inline-flex items-center justify-center text-ink-3 hover:text-danger"><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link href="/field" className="press flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[14px] max-w-[var(--form-max)]">
          <span className="text-ink-2">{pick(copy.honest, lang)}</span>
          <span className="flex items-center gap-2 text-accent-deep font-medium">{pick(copy.guide, lang)}<ArrowUpRight size={16} aria-hidden /></span>
        </Link>
      </Page>
    </Shell>
  );
}
