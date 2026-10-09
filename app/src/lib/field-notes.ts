import { z } from "zod";
import { ContextSchema } from "./runtime-contracts";
import type { ContextId, Lang } from "@/data/taxonomy";
import { ARCHETYPES } from "@/data/field-guide";
import { contextById } from "@/data/taxonomy";

/**
 * A field note: what actually happened in a real room.
 *
 * The field guide is a map somebody else drew. The simulated investor is a
 * model's idea of an investor. Neither is the room the learner was in last
 * night, and the only way this app gets closer to that room is if the learner
 * writes down what they saw. Notes stay on the device like everything else, and
 * reach a model only when the learner sends one to Rehearse themselves.
 */
export const FieldNoteSchema = z.object({
  id: z.string().min(1).max(100),
  at: z.number().finite(),
  /** The occasion, in the learner's words: "ICLR workshop dinner". */
  event: z.string().max(200),
  room: ContextSchema,
  /** Archetype ids from the field guide; who was there, without names. */
  who: z.array(z.string().max(60)).max(8),
  happened: z.string().max(3000),
  /** What did not match the map: the part worth keeping. */
  surprised: z.string().max(2000),
  /** What they would do differently, or want to rehearse. */
  next: z.string().max(2000),
});
export type FieldNote = z.infer<typeof FieldNoteSchema>;

const LABELS = {
  occasion: { zh: "场合", en: "Occasion" },
  who: { zh: "在场的人", en: "Who was there" },
  happened: { zh: "发生了什么", en: "What happened" },
  surprised: { zh: "和我预想不一样的地方", en: "What did not match my expectations" },
  next: { zh: "下次我想做到", en: "What I want to do next time" },
  lead: { zh: "我想排练一次类似的场合。下面是我上次在真实场合的记录：", en: "I want to rehearse an occasion like this one. Here is my record of the real one:" },
} as const;

/** Turn a note into a Rehearse description the learner can still edit before sending. */
export function noteToRehearsal(note: Pick<FieldNote, "event" | "room" | "who" | "happened" | "surprised" | "next">, lang: Lang): string {
  const who = note.who.map((id) => ARCHETYPES.find((a) => a.id === id)?.name[lang]).filter(Boolean).join(lang === "zh" ? "、" : ", ");
  const line = (key: keyof typeof LABELS, value: string) => (value.trim() ? `${LABELS[key][lang]}${lang === "zh" ? "：" : ": "}${value.trim()}` : "");
  return [
    LABELS.lead[lang],
    line("occasion", [note.event.trim(), contextById(note.room as ContextId).name[lang]].filter(Boolean).join(lang === "zh" ? "（" : " (") + (note.event.trim() ? (lang === "zh" ? "）" : ")") : "")),
    line("who", who),
    line("happened", note.happened),
    line("surprised", note.surprised),
    line("next", note.next),
  ].filter(Boolean).join("\n\n");
}
