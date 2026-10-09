# Notice of changes

Hallway Track is a modified version of SocialCoach
(https://github.com/GeminiLight/SocialCoach, Apache License 2.0, Copyright 2026
SocialCoach contributors), forked at upstream commit `e534b96` on 2026-10-09.
This file states the changes, as section 4(b) of the licence asks. Third-party
materials keep their own licences; citing a book, paper or web page does not
relicense it.

## Added

- `app/src/data/corpus/frontier/` — 33 scenarios, 16 strategies, 12 teaching
  illustrations and the list of 21 checked sources.
- `app/src/data/field-guide.ts`, `app/src/app/field/` — the field guide and
  field notes.
- `app/src/lib/writing.ts`, `app/src/lib/tasks/draft-review.ts`,
  `app/src/app/api/draft-review/`, `app/src/app/write/` — the writing desk.
- `app/src/lib/field-craft.ts`, `app/src/lib/field-notes.ts`.
- `app/tests/core/hallway-track.test.ts`.
- `wiki/13-stage-hallway-track.md`, this file, the two READMEs and
  `docs/screenshots/hallway-track/`.

## Modified

- `app/src/data/taxonomy.ts` — 11 skills, 4 contexts, 4 relationship types.
- `app/src/data/scenario-icons.tsx`, `app/src/data/context-illustrations.tsx` —
  icons, hues and drawings for the new contexts.
- `app/src/data/corpus/index.ts`, `app/scripts/check-corpus.ts` — the new corpus
  is loaded first and checked.
- `app/src/lib/prompts.ts` — room norms for frontier scenes in role-play, hints,
  debrief and rehearsal; the taxonomy block lists relationship types and glosses
  the new skills.
- `app/src/lib/runtime-contracts.ts`, `task-input.ts`, `task-runtime.ts`,
  `client-api.ts`, `analytics/schema.ts` — contracts for the above.
- `app/src/lib/archive.ts`, `backup.ts`, `app/src/store/useApp.ts`,
  `app/src/app/settings/page.tsx` — drafts and notes in the local archive,
  export and merge.
- `app/src/components/Shell.tsx`, `app/src/app/page.tsx`, `onboarding/page.tsx`,
  `arena/page.tsx`, `components/practice/Briefing.tsx` — navigation, defaults and
  provenance display.
- `app/src/lib/i18n.ts`, `app/src/app/layout.tsx`,
  `app/public/manifest.webmanifest`, `app/public/offline.html` and a handful of
  components — the product name and copy.
- `README.md`, `README.en.md` — rewritten; the upstream versions are kept as
  `docs/upstream-README.zh-CN.md` and `docs/upstream-README.en.md`.
- `AGENTS.md` — a section on this fork.

## Added for the Cloudflare deployment

- `app/src/lib/account/`, `app/src/app/api/auth/`, `app/src/app/api/account/`,
  `app/src/components/AccountPanel.tsx`, `app/migrations/`,
  `app/wrangler.jsonc`, `app/open-next.config.ts`, `app/.dev.vars.example`,
  `app/tests/core/accounts.test.ts`, `docs/deploy-cloudflare.md` — GitHub
  sign-in and a per-person model configuration stored in Cloudflare D1.
- Every model route under `app/src/app/api/` now resolves its model through
  `requestModel()`; `app/src/app/api/health/route.ts` reports a signed-in
  person's own endpoint. Upstream's rule against accounts and server-side
  storage is deliberately relaxed here, for the model configuration only.

## Not changed

The 58 upstream scenarios, the 3D scenes and their assets, the video lessons,
the scheduling, role-play, assessment and storage mechanisms, the marketing
site under `site/`, and the upstream wiki. Internal storage keys still begin
with `socialcoach.` so that an existing local archive keeps working.
