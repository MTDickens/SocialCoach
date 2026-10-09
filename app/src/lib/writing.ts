import { z } from "zod";
import { L, type L as Localized, type SkillId } from "@/data/taxonomy";

/**
 * The writing desk: the half of networking that is not a live conversation.
 *
 * SocialCoach deliberately does not ship "templates" or advice articles, and
 * neither does this. It applies the same rule the debrief does — quote the
 * learner's own words before judging them — to a draft: a simulated recipient
 * reads it once, says what they understood, and every note points at an exact
 * span of the draft. The rewrite may reorder and cut; it may not add a claim.
 */
export const WRITING_KINDS = ["cold-email", "follow-up", "intro-request", "speaker-invite", "bio", "announcement"] as const;
export type WritingKind = (typeof WRITING_KINDS)[number];

export interface WritingKindInfo {
  name: Localized;
  hint: Localized;
  /** Who reads it, when the learner has not said. */
  reader: Localized;
  recipientPh: Localized;
  aimPh: Localized;
  draftPh: Localized;
  /** Skills whose strategies ground the review. */
  skills: SkillId[];
  /** Roughly how long a good one is, in characters of the draft's language. */
  budget: { zh: number; en: number };
}

export const WRITING_INFO: Record<WritingKind, WritingKindInfo> = {
  "cold-email": {
    name: L("约聊邮件", "Cold email asking for a call"),
    hint: L("给不认识的研究者或从业者，想约一次通话或见面。", "To a researcher or practitioner you do not know, asking for a call or meeting."),
    reader: L("一位收件箱很满、不认识你的研究者", "A researcher with a full inbox who does not know you"),
    recipientPh: L("对方是谁、你为什么找他：例如「做视频推理评测的教授，我的工作建立在她 2025 年那篇的设定上」。", "Who they are and why them: e.g. ‘a professor working on video-reasoning evaluation; my work builds on the setup in her 2025 paper’."),
    aimPh: L("你想要什么：例如「下周 20 分钟 Zoom，聊一个具体问题」。", "What you want: e.g. ‘20 minutes on Zoom next week about one specific question’."),
    draftPh: L("把你的邮件草稿贴在这里，连同标题。", "Paste your draft here, subject line included."),
    skills: ["making-the-ask", "research-pitch", "calibrated-claims"],
    budget: { zh: 300, en: 150 },
  },
  "follow-up": {
    name: L("见面后的跟进", "Follow-up after meeting"),
    hint: L("会上或晚宴上聊过，想把那次对话变成下一步。", "You talked at a conference or dinner and want to turn it into a next step."),
    reader: L("一位在活动上和你聊过几分钟、当晚见了几十个人的人", "Someone who talked with you for a few minutes and met dozens of people that night"),
    recipientPh: L("对方是谁、你们聊了什么、对方当时说过什么。", "Who they are, what you talked about, and what they said at the time."),
    aimPh: L("你想落实的那一件事。", "The one thing you want to pin down."),
    draftPh: L("把跟进消息的草稿贴在这里。", "Paste your follow-up draft here."),
    skills: ["following-up", "making-the-ask"],
    budget: { zh: 200, en: 100 },
  },
  "intro-request": {
    name: L("请人引荐", "Asking for an introduction"),
    hint: L("请一位认识的人把你介绍给第三方，并附一段可以直接转发的话。", "Asking someone you know to introduce you to a third person, with a blurb they can forward."),
    reader: L("一位愿意帮忙、但要为这次引荐搭上自己信用的熟人", "An acquaintance willing to help, who is spending their own credibility on this introduction"),
    recipientPh: L("你请谁帮忙、想认识谁、你和这两个人各是什么关系。", "Whom you are asking, whom you want to meet, and your relationship to each."),
    aimPh: L("你想从被引荐的人那里得到什么。", "What you want from the person you are being introduced to."),
    draftPh: L("把请求和可转发的那段话都贴在这里。", "Paste both the request and the forwardable blurb here."),
    skills: ["making-the-ask", "calibrated-claims", "trading-information"],
    budget: { zh: 300, en: 160 },
  },
  "speaker-invite": {
    name: L("邀请讲者", "Inviting a speaker"),
    hint: L("邀请某人来你的 workshop、panel 或活动。", "Inviting someone to your workshop, panel or event."),
    reader: L("一位每个月收到很多类似邀请的资深研究者", "A senior researcher who receives many such invitations a month"),
    recipientPh: L("对方是谁、为什么这个活动需要他。", "Who they are and why this event needs them."),
    aimPh: L("你具体要他做什么：形式、时长、日期，以及活动目前的状态（是否已被接收）。", "Exactly what you are asking: format, length, date, and the event's status (accepted or not yet)."),
    draftPh: L("把邀请草稿贴在这里。", "Paste your invitation draft here."),
    skills: ["convening", "making-the-ask", "calibrated-claims"],
    budget: { zh: 350, en: 180 },
  },
  bio: {
    name: L("学术主页 / 个人简介", "Academic homepage / bio"),
    hint: L("主页首段、会议简介、社交平台简介。要展示，也要有分寸。", "A homepage opening, a conference bio, a social profile. Show the work, and keep it calibrated."),
    reader: L("一位花十秒钟决定要不要往下看的同行或招聘方", "A peer or recruiter deciding in ten seconds whether to read on"),
    recipientPh: L("谁会读它：例如「可能的合作者、招博士后的 PI、工业界的研究负责人」。", "Who reads it: e.g. ‘possible collaborators, PIs hiring postdocs, industry research leads’."),
    aimPh: L("你希望读的人记住哪一件事、接下来做什么。", "The one thing you want a reader to remember, and what they should do next."),
    draftPh: L("把简介草稿贴在这里。", "Paste your bio draft here."),
    skills: ["calibrated-claims", "research-pitch"],
    budget: { zh: 250, en: 130 },
  },
  announcement: {
    name: L("发布工作的帖子", "Post announcing your work"),
    hint: L("在 X、小红书或邮件列表上介绍一篇新论文或一个新项目。", "Introducing a new paper or project on X, Xiaohongshu or a mailing list."),
    reader: L("一位刷到这条帖子的同领域研究者", "A researcher in your field scrolling past this post"),
    recipientPh: L("发在哪里、给谁看。", "Where it is posted and for whom."),
    aimPh: L("你希望读的人做什么：读论文、试代码、来 poster。", "What you want readers to do: read the paper, try the code, come to the poster."),
    draftPh: L("把帖子或 thread 的草稿贴在这里。", "Paste your post or thread draft here."),
    skills: ["research-pitch", "calibrated-claims"],
    budget: { zh: 280, en: 140 },
  },
};

export const MAX_DRAFT_CHARS = 6000;
export const NOTE_KINDS = ["strong", "overclaim", "underclaim", "vague", "buried-ask", "about-me", "too-long", "tone", "unclear"] as const;
export type NoteKind = (typeof NOTE_KINDS)[number];
export const NOTE_LABELS: Record<NoteKind, Localized> = {
  strong: L("有效", "Works"),
  overclaim: L("说大了", "Over-claims"),
  underclaim: L("说小了", "Under-claims"),
  vague: L("太泛", "Vague"),
  "buried-ask": L("请求被埋住", "Buried ask"),
  "about-me": L("只在讲自己", "All about you"),
  "too-long": L("可以删", "Can go"),
  tone: L("语气", "Tone"),
  unclear: L("读不懂", "Unclear"),
};

const short = (max: number) => z.string().trim().max(max);
export const WritingInputSchema = z.object({
  kind: z.enum(WRITING_KINDS),
  draft: z.string().trim().min(20).max(MAX_DRAFT_CHARS),
  recipient: short(1000).default(""),
  aim: short(600).default(""),
  /** What is actually true about the learner's work; the rewrite may draw on it. */
  facts: short(2000).default(""),
  lang: z.enum(["zh", "en"]),
});
export type WritingInput = z.infer<typeof WritingInputSchema>;

export const WritingReviewSchema = z.object({
  read: z.object({
    /** Would the simulated recipient act on it? */
    decision: z.enum(["yes", "maybe", "no"]),
    /** What they took away after one read, in their own voice. */
    understood: z.string().trim().min(1).max(600),
    because: z.string().trim().min(1).max(600),
  }),
  ask: z.object({ found: z.boolean(), quote: z.string().trim().max(400), note: z.string().trim().max(400) }),
  calibration: z.object({ level: z.enum(["under", "right", "over", "mixed"]), quote: z.string().trim().max(400), why: z.string().trim().max(500) }),
  notes: z.array(z.object({ quote: z.string().trim().min(1).max(400), kind: z.enum(NOTE_KINDS), why: z.string().trim().min(1).max(500), fix: z.string().trim().max(500).default("") })).max(6),
  revision: z.string().trim().max(MAX_DRAFT_CHARS),
  /** Things only the learner can supply; the rewrite leaves a bracketed gap for each. */
  missing: z.array(z.string().trim().min(1).max(300)).max(5).default([]),
  sources: z.array(z.string().max(100)).max(4).default([]),
});
export type WritingReview = z.infer<typeof WritingReviewSchema>;

export interface WritingDraft {
  id: string;
  kind: WritingKind;
  draft: string;
  recipient: string;
  aim: string;
  facts: string;
  lang: "zh" | "en";
  at: number;
  review?: WritingReview;
}
export const WritingDraftSchema = z.object({
  id: z.string().min(1).max(100), kind: z.enum(WRITING_KINDS), draft: z.string().max(MAX_DRAFT_CHARS), recipient: z.string().max(1000), aim: z.string().max(600), facts: z.string().max(2000),
  lang: z.enum(["zh", "en"]), at: z.number().finite(), review: WritingReviewSchema.optional(),
});

/** Whitespace differences are not a different quotation; wording differences are. */
const squash = (text: string) => text.replace(/\s+/g, " ").trim();
export function quotedFrom(quote: string, draft: string): boolean {
  const q = squash(quote);
  return q.length > 0 && squash(draft).includes(q);
}
/**
 * Numbers are the cheapest thing for a rewrite to invent and the costliest for
 * the learner to send. Every figure in the rewrite must already appear in what
 * the learner wrote.
 */
export function inventedNumbers(revision: string, ...sources: string[]): string[] {
  const known = sources.join("\n");
  const digits = (text: string) => text.match(/\d+(?:[.,:]\d+)*%?/g) ?? [];
  const seen = new Set(digits(known));
  return [...new Set(digits(revision).filter((n) => !seen.has(n) && !seen.has(n.replace(/%$/, ""))))];
}
