"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Compass, NotebookPen, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { Shell } from "@/components/Shell";
import { Button, Chip, ChoiceGroup, Empty, Page } from "@/components/ui";
import { useApp, useLang } from "@/store/useApp";
import { pick } from "@/lib/i18n";
import { ARCHETYPES, ROOMS, TERMS, TERM_GROUPS, type Archetype, type Room, type Term } from "@/data/field-guide";
import { FRONTIER_SOURCES, type FrontierSourceKey } from "@/data/corpus/frontier/sources";
import { scenarioById } from "@/data/corpus";
import { CONTEXTS, FRONTIER_CONTEXTS, contextById, type ContextId, type Lang } from "@/data/taxonomy";
import { ContextIllustration } from "@/data/context-illustrations";
import { CONTEXT_HUES } from "@/data/scenario-icons";
import { buildSession } from "@/lib/session-utils";
import { hueColor, relDate } from "@/lib/format";
import { noteToRehearsal, type FieldNote } from "@/lib/field-notes";
import { REHEARSAL_DRAFT_KEY } from "@/lib/rehearsal-input";

const copy = {
  eyebrow: { zh: "场合手册", en: "Field guide" },
  heading: { zh: "这些场合里都是谁，\n他们各自在意什么。", en: "Who is in these rooms,\nand what each of them cares about." },
  sub: {
    zh: "不懂一个场合的规矩，多数时候是不知道对方靠什么被评价。先看懂这一点，再决定聊什么、问什么。",
    en: "Not knowing a room's code is mostly not knowing what the other person is judged on. See that first, then decide what to say and ask.",
  },
  provenance: {
    zh: "这份手册是为练习写的一张起步地图：标了「依据」的条目来自已核对的公开来源，其余是编者归纳，不是研究结论，也不描述任何真人。它最大的用处是被你自己的实战笔记修正。",
    en: "This guide is a starting map written for practice. Entries with a ‘grounded in’ line draw on checked public sources; the rest is editorial synthesis — not research findings, and not a description of any real person. Its best use is to be corrected by your own field notes.",
  },
  tabs: { people: { zh: "人", en: "People" }, rooms: { zh: "场合", en: "Rooms" }, terms: { zh: "词", en: "Words" }, notes: { zh: "我的笔记", en: "My notes" } },
  judgedOn: { zh: "靠什么被评价", en: "What they are judged on" },
  wants: { zh: "想从你这里得到", en: "What they want from you" },
  cannot: { zh: "不能说的", en: "What they cannot say" },
  phrases: { zh: "他们说……通常意思是", en: "When they say… it usually means" },
  ask: { zh: "值得问的", en: "Worth asking" },
  avoid: { zh: "容易失分的", en: "What loses them" },
  basis: { zh: "依据", en: "Grounded in" },
  editorial: { zh: "编者归纳", en: "Editorial synthesis" },
  practice: { zh: "去练", en: "Practise" },
  termsNote: { zh: "这里是常见用法。某个人嘴里的某个词具体指什么，值得当场问一句。", en: "These are common usages. What a particular person means by a word is worth asking on the spot." },
  notesHeading: { zh: "真实场合里发生了什么", en: "What happened in the real room" },
  notesSub: {
    zh: "模拟的投资人只是模型想象中的投资人。活动结束后花两分钟记下真实发生的事，尤其是和你预想不一样的地方——下次排练就从这里开始。笔记只保存在此设备；只有你点「拿去排练」并确认发送时，内容才会交给模型。",
    en: "A simulated investor is a model's idea of an investor. After an event, take two minutes to record what really happened — above all what did not match your expectations. Your next rehearsal starts there. Notes stay on this device; their text reaches a model only when you choose ‘Rehearse this’ and confirm sending.",
  },
  event: { zh: "什么场合", en: "The occasion" },
  eventPh: { zh: "例如：ICLR workshop 之后的晚宴", en: "e.g. the dinner after an ICLR workshop" },
  room: { zh: "属于哪一类", en: "What kind of room" },
  who: { zh: "在场的是哪些人（不必写名字）", en: "Who was there (no names needed)" },
  happened: { zh: "发生了什么", en: "What happened" },
  happenedPh: { zh: "谁问了什么，你怎么答的，对方怎么反应。尽量写原话。", en: "Who asked what, what you said, how they reacted. Their words and yours, as close as you can." },
  surprised: { zh: "和你预想不一样的地方", en: "What did not match your expectations" },
  surprisedPh: { zh: "例如：他根本不关心方法，只追问谁会为这个付钱。", en: "e.g. he had no interest in the method and only asked who would pay for it." },
  next: { zh: "下次想做到什么", en: "What you want to do next time" },
  nextPh: { zh: "例如：被问「所以呢」时，先给一句结论。", en: "e.g. when asked ‘so what?’, give the conclusion first." },
  save: { zh: "记下来", en: "Save note" },
  need: { zh: "至少写下发生了什么。", en: "Write at least what happened." },
  rehearse: { zh: "拿去排练", en: "Rehearse this" },
  remove: { zh: "删除这条笔记", en: "Delete this note" },
  empty: { zh: "还没有笔记", en: "No notes yet" },
  emptyBody: { zh: "下一次活动结束后，回来记第一条。", en: "Come back after your next event and write the first one." },
  privacy: { zh: "写别人时请只写角色，不写姓名和可辨认的细节。", en: "When writing about others, record roles only — no names or identifying details." },
  library: { zh: "策略与案例库", en: "Strategies & cases" },
  write: { zh: "写作台", en: "Writing desk" },
} as const;

type Tab = "people" | "rooms" | "terms" | "notes";

function Basis({ keys, lang }: { keys: FrontierSourceKey[]; lang: Lang }) {
  if (!keys.length) return <p className="text-[12px] text-ink-3">{pick(copy.editorial, lang)}</p>;
  return (
    <p className="text-[12px] text-ink-3 leading-relaxed">
      {pick(copy.basis, lang)}{lang === "zh" ? "：" : ": "}
      {keys.map((k, i) => (
        <span key={k}>
          {i > 0 && "; "}
          <a href={FRONTIER_SOURCES[k].url} target="_blank" rel="noreferrer" className="underline decoration-line-strong underline-offset-2 hover:text-ink">{FRONTIER_SOURCES[k].book}</a>
        </span>
      ))}
    </p>
  );
}

function PracticeLinks({ ids, lang, onStart }: { ids: string[]; lang: Lang; onStart: (id: string) => void }) {
  const scenes = ids.map((id) => scenarioById(id)).filter((s) => !!s);
  if (!scenes.length) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{pick(copy.practice, lang)}</span>
      {scenes.map((s) => (
        <button key={s.id} onClick={() => onStart(s.id)} className="press flex items-center justify-between gap-3 text-left text-[13px] text-ink-2 py-2 border-b border-dashed border-line-strong last:border-0 hover:text-accent-deep">
          <span>{s.title[lang]}</span><ArrowRight size={14} className="shrink-0" aria-hidden />
        </button>
      ))}
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-1.5">{title}</p>
      <ul className="flex flex-col gap-1.5">{items.map((x, i) => <li key={i} className="text-[14px] text-ink-2 leading-relaxed flex gap-2"><span className="text-ink-4">—</span><span>{x}</span></li>)}</ul>
    </div>
  );
}

function Person({ a, lang, open, onToggle, onStart }: { a: Archetype; lang: Lang; open: boolean; onToggle: () => void; onStart: (id: string) => void }) {
  return (
    <article className="card overflow-hidden">
      <button onClick={onToggle} aria-expanded={open} aria-controls={`person-${a.id}`} className="press w-full text-left p-5 flex items-start gap-3">
        <span className="flex-1 min-w-0">
          <span className="block font-semibold text-[17px] leading-snug">{a.name[lang]}</span>
          <span className="block text-[14px] text-ink-2 leading-relaxed mt-1.5">{a.oneLine[lang]}</span>
        </span>
        <ChevronDown size={18} className={clsx("text-ink-3 shrink-0 mt-1 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div id={`person-${a.id}`} hidden={!open} className="px-5 pb-5">
        <div className="flex flex-col gap-5 border-t border-line pt-5">
          <dl className="grid gap-4 md:grid-cols-3">
            {([["judgedOn", a.judgedOn], ["wants", a.wants], ["cannot", a.cannot]] as const).map(([key, value]) => (
              <div key={key}><dt className="eyebrow mb-1.5">{pick(copy[key], lang)}</dt><dd className="text-[14px] text-ink-2 leading-relaxed">{value[lang]}</dd></div>
            ))}
          </dl>
          <div>
            <p className="eyebrow mb-2">{pick(copy.phrases, lang)}</p>
            <ul className="flex flex-col">
              {a.phrases.map((p) => (
                <li key={p.says} className="py-3 border-b border-line last:border-0">
                  <p className="display text-[16px] leading-snug" lang="en">“{p.says}”</p>
                  <p className="text-[14px] text-ink-2 leading-relaxed mt-1.5">{p.means[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <List title={pick(copy.ask, lang)} items={a.ask.map((x) => x[lang])} />
            <List title={pick(copy.avoid, lang)} items={a.avoid.map((x) => x[lang])} />
          </div>
          <PracticeLinks ids={a.practice} lang={lang} onStart={onStart} />
          <Basis keys={a.basis} lang={lang} />
        </div>
      </div>
    </article>
  );
}

function RoomCard({ r, lang, onStart }: { r: Room; lang: Lang; onStart: (id: string) => void }) {
  return (
    <article className="card p-5 flex flex-col gap-4">
      <header className="flex items-start gap-3">
        <span className="h-12 w-12 rounded-2xl inline-flex items-center justify-center shrink-0" style={{ background: hueColor(CONTEXT_HUES[r.context], 0.95, 0.045) }}><ContextIllustration context={r.context} size={34} /></span>
        <div className="min-w-0">
          <p className="text-[12px] text-ink-3">{contextById(r.context).name[lang]}</p>
          <h2 className="font-semibold text-[17px] leading-snug mt-0.5">{r.name[lang]}</h2>
        </div>
      </header>
      <p className="display text-[16px] leading-snug text-ink-2">{r.oneLine[lang]}</p>
      <ol className="flex flex-col">
        {r.rules.map((rule, i) => (
          <li key={i} className="flex gap-3 py-2.5 border-b border-line last:border-0 text-[14px] text-ink-2 leading-relaxed"><span className="num text-[11px] text-ink-3 mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{rule[lang]}</span></li>
        ))}
      </ol>
      <PracticeLinks ids={r.practice} lang={lang} onStart={onStart} />
      <Basis keys={r.basis} lang={lang} />
    </article>
  );
}

function Terms({ lang }: { lang: Lang }) {
  const groups = Object.keys(TERM_GROUPS) as Term["group"][];
  return (
    <div className="flex flex-col gap-8 max-w-[var(--form-max)]">
      <p className="text-[13px] text-ink-3 leading-relaxed">{pick(copy.termsNote, lang)}</p>
      {groups.map((g) => (
        <section key={g}>
          <h2 className="display text-[20px] mb-2">{TERM_GROUPS[g][lang]}</h2>
          <dl className="flex flex-col">
            {TERMS.filter((x) => x.group === g).map((x) => (
              <div key={x.term} className="notebook-row py-3.5 md:grid md:grid-cols-[220px_1fr] md:gap-5">
                <dt className="font-semibold text-[15px]" lang="en">{x.term}</dt>
                <dd className="text-[14px] text-ink-2 leading-relaxed mt-1 md:mt-0">{x.meaning[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

const BLANK = { event: "", room: "mixer" as ContextId, who: [] as string[], happened: "", surprised: "", next: "" };

function Notes({ lang }: { lang: Lang }) {
  const router = useRouter();
  const { fieldNotes, saveFieldNote, removeFieldNote } = useApp();
  const [draft, setDraft] = useState(BLANK);
  const [tried, setTried] = useState(false);
  const field = "block w-full px-4 py-3 rounded-[var(--radius-sm)] bg-card border border-line text-[15px] leading-relaxed placeholder:text-ink-3";
  const save = () => {
    if (!draft.happened.trim()) { setTried(true); return; }
    const note: FieldNote = { id: crypto.randomUUID(), at: Date.now(), event: draft.event.trim(), room: draft.room, who: draft.who, happened: draft.happened.trim(), surprised: draft.surprised.trim(), next: draft.next.trim() };
    saveFieldNote(note);
    setDraft(BLANK);
    setTried(false);
  };
  const rehearse = (note: FieldNote) => {
    try { sessionStorage.setItem(REHEARSAL_DRAFT_KEY, JSON.stringify({ text: noteToRehearsal(note, lang), fields: {} })); } catch {}
    router.push("/rehearse");
  };
  return (
    <div className="flex flex-col gap-8 max-w-[var(--form-max)]">
      <header>
        <h2 className="display text-[22px] leading-snug">{pick(copy.notesHeading, lang)}</h2>
        <p className="text-[14px] text-ink-2 leading-relaxed mt-3">{pick(copy.notesSub, lang)}</p>
      </header>
      <section className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5"><span className="eyebrow">{pick(copy.event, lang)}</span>
          <input value={draft.event} onChange={(e) => setDraft({ ...draft, event: e.target.value })} maxLength={200} placeholder={pick(copy.eventPh, lang)} className={clsx(field, "h-12 py-0")} />
        </label>
        <div className="flex flex-col gap-2"><span className="eyebrow">{pick(copy.room, lang)}</span>
          <ChoiceGroup className="flex flex-wrap gap-2" label={pick(copy.room, lang)}>
            {CONTEXTS.filter((c) => FRONTIER_CONTEXTS.includes(c.id)).map((c) => <Chip key={c.id} small active={draft.room === c.id} onClick={() => setDraft({ ...draft, room: c.id })}>{c.name[lang]}</Chip>)}
          </ChoiceGroup>
        </div>
        <div className="flex flex-col gap-2"><span className="eyebrow">{pick(copy.who, lang)}</span>
          <div className="flex flex-wrap gap-2">
            {ARCHETYPES.map((a) => { const on = draft.who.includes(a.id); return <Chip key={a.id} small sharedSelection={false} active={on} onClick={() => setDraft({ ...draft, who: on ? draft.who.filter((x) => x !== a.id) : [...draft.who, a.id] })}>{a.name[lang]}</Chip>; })}
          </div>
        </div>
        <label className="flex flex-col gap-1.5"><span className="eyebrow">{pick(copy.happened, lang)}</span>
          <textarea value={draft.happened} onChange={(e) => setDraft({ ...draft, happened: e.target.value })} rows={4} maxLength={3000} placeholder={pick(copy.happenedPh, lang)} className={field} aria-invalid={tried && !draft.happened.trim()} />
        </label>
        <label className="flex flex-col gap-1.5"><span className="eyebrow">{pick(copy.surprised, lang)}</span>
          <textarea value={draft.surprised} onChange={(e) => setDraft({ ...draft, surprised: e.target.value })} rows={2} maxLength={2000} placeholder={pick(copy.surprisedPh, lang)} className={field} />
        </label>
        <label className="flex flex-col gap-1.5"><span className="eyebrow">{pick(copy.next, lang)}</span>
          <textarea value={draft.next} onChange={(e) => setDraft({ ...draft, next: e.target.value })} rows={2} maxLength={2000} placeholder={pick(copy.nextPh, lang)} className={field} />
        </label>
        <p className="text-[12px] text-ink-3">{pick(copy.privacy, lang)}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={save}>{pick(copy.save, lang)}</Button>
          {tried && !draft.happened.trim() && <p role="alert" className="text-[13px] text-danger">{pick(copy.need, lang)}</p>}
        </div>
      </section>
      <section className="border-t border-line pt-6">
        {fieldNotes.length === 0 ? <Empty title={pick(copy.empty, lang)} body={pick(copy.emptyBody, lang)} /> : (
          <ul className="flex flex-col gap-4">
            {fieldNotes.map((n) => (
              <li key={n.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12px] text-ink-3">{relDate(n.at, lang)} · {contextById(n.room as ContextId).name[lang]}</p>
                    <h3 className="font-semibold text-[16px] leading-snug mt-1">{n.event || contextById(n.room as ContextId).name[lang]}</h3>
                  </div>
                  <button onClick={() => removeFieldNote(n.id)} aria-label={pick(copy.remove, lang)} className="press h-11 w-11 -mr-2 -mt-2 shrink-0 inline-flex items-center justify-center text-ink-3 hover:text-danger"><Trash2 size={16} /></button>
                </div>
                {n.who.length > 0 && <p className="text-[12px] text-ink-3">{n.who.map((id) => ARCHETYPES.find((a) => a.id === id)?.name[lang]).filter(Boolean).join(" · ")}</p>}
                <p className="text-[14px] text-ink-2 leading-relaxed whitespace-pre-wrap">{n.happened}</p>
                {n.surprised && <p className="text-[14px] leading-relaxed whitespace-pre-wrap"><span className="eyebrow block mb-1">{pick(copy.surprised, lang)}</span>{n.surprised}</p>}
                {n.next && <p className="text-[14px] leading-relaxed whitespace-pre-wrap"><span className="eyebrow block mb-1">{pick(copy.next, lang)}</span>{n.next}</p>}
                <Button variant="secondary" className="self-start" onClick={() => rehearse(n)}><NotebookPen size={16} />{pick(copy.rehearse, lang)}</Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function Field() {
  const lang = useLang();
  const router = useRouter();
  const { profile, addSession, fieldNotes } = useApp();
  const [tab, setTab] = useState<Tab>("people");
  const [open, setOpen] = useState<string | null>(ARCHETYPES[0].id);
  const starting = useRef(false);
  const start = (id: string) => {
    const scene = scenarioById(id);
    if (!scene || starting.current) return;
    starting.current = true;
    const session = buildSession(scene, "arena", lang);
    addSession(session);
    router.push(`/practice/${session.id}`);
  };
  if (!profile) return null;
  return (
    <Shell showModelNotice={false}>
      <Page className="pt-5 lg:pt-10 flex flex-col gap-7 pb-8">
        <header className="border-b border-line pb-6">
          <p className="eyebrow flex items-center gap-2"><Compass size={14} className="text-accent-deep" />{pick(copy.eyebrow, lang)}</p>
          <h1 className="display text-[30px] lg:text-[38px] leading-[1.3] whitespace-pre-line mt-3">{pick(copy.heading, lang)}</h1>
          <p className="text-[14px] text-ink-2 mt-4 leading-relaxed max-w-[var(--measure)]">{pick(copy.sub, lang)}</p>
        </header>
        <ChoiceGroup className="flex gap-1 overflow-x-auto no-scrollbar" label={pick(copy.eyebrow, lang)}>
          {(["people", "rooms", "terms", "notes"] as const).map((k) => (
            <Chip key={k} active={tab === k} onClick={() => setTab(k)}>{pick(copy.tabs[k], lang)}<span className="num">{k === "people" ? ARCHETYPES.length : k === "rooms" ? ROOMS.length : k === "terms" ? TERMS.length : fieldNotes.length}</span></Chip>
          ))}
        </ChoiceGroup>

        {tab !== "notes" && <p className="text-[13px] text-ink-3 leading-relaxed max-w-[var(--measure)] rounded-[var(--radius-sm)] bg-paper-deep px-4 py-3">{pick(copy.provenance, lang)}</p>}
        {tab === "people" && <div className="flex flex-col gap-3 max-w-[var(--focus-max)]">{ARCHETYPES.map((a) => <Person key={a.id} a={a} lang={lang} open={open === a.id} onToggle={() => setOpen(open === a.id ? null : a.id)} onStart={start} />)}</div>}
        {tab === "rooms" && <div className="grid gap-4 lg:grid-cols-2 items-start">{ROOMS.map((r) => <RoomCard key={r.id} r={r} lang={lang} onStart={start} />)}</div>}
        {tab === "terms" && <Terms lang={lang} />}
        {tab === "notes" && <Notes lang={lang} />}

        <nav className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[14px]">
          <Link href="/learn" className="press inline-flex items-center gap-1.5 min-h-11 text-accent-deep font-medium">{pick(copy.library, lang)}<ArrowUpRight size={15} aria-hidden /></Link>
          <Link href="/write" className="press inline-flex items-center gap-1.5 min-h-11 text-accent-deep font-medium">{pick(copy.write, lang)}<ArrowUpRight size={15} aria-hidden /></Link>
        </nav>
      </Page>
    </Shell>
  );
}
