/** Run from app/: npx tsx scripts/check-corpus.ts */
import assert from "node:assert/strict";
import { retrieveKnowledge, retrieveScenario } from "../src/lib/retrieval";
import { buildSession } from "../src/lib/session-utils";
import { SCENARIOS, THEORIES, CASES } from "../src/data/corpus";
import { SCENARIOS_C } from "../src/data/corpus/scenarios-c";
import { SCENARIOS_D } from "../src/data/corpus/scenarios-d";
import { THEORIES_C } from "../src/data/corpus/theories-c";
import { CASES_C } from "../src/data/corpus/cases-c";
import { SKILLS, COMPETENCIES, CONTEXTS, RELATIONSHIPS } from "../src/data/taxonomy";
import { SCENARIO_ICONS } from "../src/data/scenario-icons";
import { FRONTIER_CASES, FRONTIER_ROLES, FRONTIER_SCENARIOS, FRONTIER_THEORIES } from "../src/data/corpus/frontier";
import { FRONTIER_SOURCES } from "../src/data/corpus/frontier/sources";
import { CONTEXTS as ALL_CONTEXTS, FRONTIER_CONTEXTS, FRONTIER_SKILLS } from "../src/data/taxonomy";

const skills = new Map(SKILLS.map((s) => [s.id, s.competency]));
const competencies = new Set(COMPETENCIES.map((c) => c.id));
const contexts = new Set(CONTEXTS.map((c) => c.id));
const items = [...SCENARIOS, ...THEORIES, ...CASES];
const ids = new Set<string>();
function bilingual(value: unknown, path: string) {
  if (!value || typeof value !== "object") return;
  if ("zh" in value || "en" in value) {
    for (const lang of ["zh", "en"] as const) {
      const text = (value as Record<string, unknown>)[lang];
      assert(typeof text === "string" && text.trim(), `${path}.${lang} missing`);
    }
  }
  for (const [key, child] of Object.entries(value)) bilingual(child, `${path}.${key}`);
}
for (const item of items) {
  assert(!ids.has(item.id), `Duplicate id: ${item.id}`);
  ids.add(item.id);
  assert(item.skills.length, `${item.id}: no skill`);
  for (const skill of item.skills) assert(skills.has(skill), `${item.id}: invalid skill ${skill}`);
  for (const c of item.competencies) assert(competencies.has(c), `${item.id}: invalid competency ${c}`);
  if ("context" in item) assert(contexts.has(item.context), `${item.id}: invalid context`);
  assert(item.source, `${item.id}: no source`);
  bilingual(item.title, `${item.id}.title`);
}
for (const s of SCENARIOS) {
  const characterIds = s.characters.map((c) => c.id);
  assert.equal(new Set(characterIds).size, characterIds.length, `${s.id}: duplicate character`);
  assert.equal(characterIds.filter((id) => id === "you").length, 1, `${s.id}: missing learner`);
  assert(s.characters.find((c) => c.id === "you")?.playable, `${s.id}: learner not playable`);
  assert(characterIds.includes(s.opening.characterId) && s.opening.characterId !== "you", `${s.id}: invalid opening`);
  assert(s.objectives.length >= 2 && s.objectives.length <= 3, `${s.id}: objective count`);
  assert(s.maxTurns > 0 && [1, 2, 3].includes(s.difficulty), `${s.id}: invalid limits`);
  for (const relationship of s.relationship) assert(relationship in RELATIONSHIPS, `${s.id}: relationship`);
  for (const skill of s.relatedSkills ?? []) assert(skills.has(skill), `${s.id}: related skill`);
}
for (const item of [...SCENARIOS_C, ...SCENARIOS_D, ...THEORIES_C, ...CASES_C, ...FRONTIER_SCENARIOS, ...FRONTIER_THEORIES, ...FRONTIER_CASES]) {
  bilingual(item, item.id);
  for (const skill of item.skills) assert(item.competencies.includes(skills.get(skill)!), `${item.id}: missing competency for ${skill}`);
  assert(
    item.keywords.some((k) => /[\u4e00-\u9fff]/u.test(k)),
    `${item.id}: missing Chinese keywords`,
  );
  if (typeof item.source !== "string") assert.equal(new URL(item.source.url!).protocol, "https:");
}
for (const s of [...SCENARIOS_C, ...SCENARIOS_D, ...FRONTIER_SCENARIOS]) {
  assert(s.icon && s.icon in SCENARIO_ICONS, `${s.id}: unknown icon`);
  assert(
    s.characters.every((c) => c.hidden && c.stance.en && c.personality.en),
    `${s.id}: missing resistance`,
  );
  assert(s.source.includes("Original fictional practice"), `${s.id}: missing provenance label`);
}
for (const c of [...CASES_C, ...FRONTIER_CASES]) {
  assert(c.title.zh.startsWith("示例") && c.title.en.startsWith("Illustration"), `${c.id}: fictional case not labelled`);
}
assert.equal(SCENARIOS_C.length, 12);
assert.equal(SCENARIOS_D.length, 12);
assert.equal(new Set(SCENARIOS_D.map((s) => s.context)).size, 7, "new scenes must span every existing context");
for (const s of SCENARIOS_D) {
  assert(s.source.endsWith(`scenarios-d.ts#${s.id}`), `${s.id}: original source must point to its authored record`);
  for (const lang of ["zh", "en"] as const) {
    const session = buildSession(SCENARIOS.find((item) => item.id === s.id)!, "arena", lang);
    assert.equal(session.learnerCharacterId, "you");
    assert.notEqual(session.scenario.characters[0].role[lang], lang === "zh" ? "你自己" : "Yourself");
  }
}
// ── Hallway Track: the fork's own corpus ─────────────────────────────────────
const frontierSkills = new Set<string>(FRONTIER_SKILLS);
const allowedUrls = new Set<string>(Object.values(FRONTIER_SOURCES).map((v) => v.url));
for (const s of FRONTIER_SCENARIOS) {
  assert((FRONTIER_CONTEXTS as string[]).includes(s.context), `${s.id}: not a Hallway Track context`);
  assert(FRONTIER_ROLES[s.id]?.zh && FRONTIER_ROLES[s.id]?.en, `${s.id}: missing learner role`);
  assert(s.skills.some((k) => frontierSkills.has(k)), `${s.id}: no Hallway Track skill`);
  assert(s.simulationFacts?.zh && s.simulationFacts.en && s.simulationDirection?.zh && s.simulationDirection.en, `${s.id}: needs fixed facts and conditional play`);
  assert(!s.characters.some((c) => c.id !== "you" && c.playable), `${s.id}: only the learner is playable`);
  assert(s.source.includes(`frontier/`) && s.source.endsWith(`#${s.id}`), `${s.id}: source must point to its authored record`);
  for (const url of s.source.match(/https:\/\/[^\s)]+/g) ?? []) assert(allowedUrls.has(url), `${s.id}: cites an unchecked source ${url}`);
  assert((s.source.match(/https:\/\//g) ?? []).length >= 1, `${s.id}: no checked source`);
  for (const lang of ["zh", "en"] as const) {
    const session = buildSession(SCENARIOS.find((item) => item.id === s.id)!, "arena", lang);
    assert.equal(session.learnerCharacterId, "you");
    assert.notEqual(session.scenario.characters[0].role[lang], lang === "zh" ? "你自己" : "Yourself");
  }
}
for (const context of FRONTIER_CONTEXTS) assert(FRONTIER_SCENARIOS.filter((s) => s.context === context).length >= 6, `${context}: too few scenes`);
for (const skill of FRONTIER_SKILLS) {
  assert(FRONTIER_SCENARIOS.filter((s) => s.skills.includes(skill)).length >= 2, `${skill}: fewer than two scenes practise it`);
  assert([...FRONTIER_THEORIES, ...FRONTIER_CASES].some((k) => k.skills.includes(skill)), `${skill}: no knowledge item`);
}
for (const k of [...FRONTIER_THEORIES, ...FRONTIER_CASES]) assert(allowedUrls.has(k.source.url!), `${k.id}: unchecked source`);
assert.equal(ALL_CONTEXTS.filter((c) => c.track === "frontier").length, 4);
{
  const pickF = retrieveScenario({ query: "investor dinner what are you seeing", core_constraints: { target_skills: ["reading-incentives"], contexts: ["mixer"] }, rationale: "Corpus check" }, new Set());
  assert.equal(pickF.scenario?.context, "mixer", "dinner scenes not reachable through scheduling retrieval");
  const kF = retrieveKnowledge({ skills: ["discretion", "trading-information"], context: "mixer", query: "who said what at the dinner 晚宴 保密", acquisition: true, performance: true });
  assert(kF.theories.some((t) => t.id.startsWith("ft-")) && kF.cases.some((c) => c.id.startsWith("fc-")), "Hallway Track knowledge not retrievable");
}
assert.equal(THEORIES_C.length, 8);
assert.equal(CASES_C.length, 6);
console.log(
  JSON.stringify(
    {
      scenarios: SCENARIOS.length,
      theories: THEORIES.length,
      cases: CASES.length,
      contexts: Object.fromEntries(CONTEXTS.map((c) => [c.id, SCENARIOS.filter((s) => s.context === c.id).length])),
      addedDifficulty: Object.fromEntries([1, 2, 3].map((d) => [d, SCENARIOS_D.filter((s) => s.difficulty === d).length])),
    },
    null,
    2,
  ),
);

const pick = retrieveScenario({ query: "accessibility wheelchair event", core_constraints: { target_skills: ["standing-up"], contexts: ["party"] }, rationale: "Corpus check" }, new Set());
assert.equal(pick.scenario?.id, "event-access-request", "new scene not reachable through scheduling retrieval");
for (const lang of ["zh", "en"] as const) {
  const session = buildSession(pick.scenario!, "arena", lang);
  assert.equal(session.learnerCharacterId, "you", "wrong learner in new practice");
}
const knowledge = retrieveKnowledge({ skills: ["empathy", "building-relationships"], context: "friendship", query: "good news celebration capitalization", acquisition: true, performance: true });
assert(knowledge.theories.some((t) => t.id === "active-constructive-response"), "new theory not retrievable");
assert(knowledge.cases.some((c) => c.id === "case-news-follow-up"), "new teaching illustration not retrievable");
console.log("Scheduling, bilingual session creation, and debrief knowledge retrieval passed.");
