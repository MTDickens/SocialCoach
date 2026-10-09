/**
 * Hallway Track corpus: frontier-AI conferences, dinners, investor calls and
 * workshop organizing. Original fiction built on the checked sources in
 * `./sources.ts`; see `wiki/13-stage-hallway-track.md`.
 */
import type { Case, Scenario, Theory } from "../types";
import { CONFERENCE_ROLES, CONFERENCE_SCENARIOS } from "./conference";
import { MIXER_ROLES, MIXER_SCENARIOS } from "./mixer";
import { OUTREACH_ROLES, OUTREACH_SCENARIOS } from "./outreach";
import { ORGANIZING_ROLES, ORGANIZING_SCENARIOS } from "./organizing";
import { FRONTIER_THEORIES } from "./theories";
import { FRONTIER_CASES } from "./cases";

export const FRONTIER_SCENARIOS: Scenario[] = [...MIXER_SCENARIOS, ...CONFERENCE_SCENARIOS, ...OUTREACH_SCENARIOS, ...ORGANIZING_SCENARIOS];
export const FRONTIER_ROLES: Record<string, { zh: string; en: string }> = { ...CONFERENCE_ROLES, ...MIXER_ROLES, ...OUTREACH_ROLES, ...ORGANIZING_ROLES };
export const FRONTIER_SCENARIO_IDS = new Set(FRONTIER_SCENARIOS.map((s) => s.id));
export { FRONTIER_THEORIES, FRONTIER_CASES };
export type { Case, Theory };
