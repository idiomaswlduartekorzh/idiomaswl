# IELTS/TOEFL Practice Audit

Date: 2026-07-11
Scope: `/practica/ielts` and `/practica/toefl`
Status: Phase 0 baseline for the SEO/EAO expansion plan

## Progress update: 2026-07-12

- IELTS Academic Reading question-type coverage is now complete in the implementation inventory: 14 official task-type routes are live under `/practica/ielts/reading/tipos-de-preguntas`.
- The question-type hub now acts as the canonical index for those 14 routes, with official-format wording, WeLearn strategy separation, skill-page links and complete internal linking.
- Remaining IELTS Reading work should shift from creating official question-type routes to hub QA, validators, deeper exercise banks and cross-linking into Writing/TOEFL phases.
- IELTS Academic Writing Task 1 visual-type expansion is now complete for the planned visual routes: `/practica/ielts/academic/writing/task1/graficos-lineales`, `/practica/ielts/academic/writing/task1/graficos-de-barras`, `/practica/ielts/academic/writing/task1/pie-charts` and `/practica/ielts/academic/writing/task1/tablas`, using the official visual-information format as the source category and WeLearn chart-specific workflows for practice.
- IELTS Academic Writing Task 2 essay-type expansion has started with `/practica/ielts/academic/writing/task2/opinion`, `/practica/ielts/academic/writing/task2/discussion`, `/practica/ielts/academic/writing/task2/advantages-disadvantages`, `/practica/ielts/academic/writing/task2/problem-solution`, `/practica/ielts/academic/writing/task2/direct-question` and `/practica/ielts/academic/writing/task2/model-answers`, using the official essay-response format as the source category and WeLearn essay-type workflows for common prompt families. The model-answer page is explicitly marked as original WeLearn practice, not official IELTS answers.
- IELTS Academic Writing Task 1 `overview` now follows the approved visual-learning blueprint: five original examples per visual type, a selectable example strip, responsive visual-plus-explanation panels, and a 15-item three-level engine with explained answers and varied correct-option positions. This is the reusable reference implementation for the next Task 1 sub-skills.
- IELTS Academic Writing Task 1 `tendencias` now includes a six-type visual teaching lab and five guided examples per type before practice. Bar and pie examples were audited against the actual rendered data, including two-pie composition changes and an intentionally balanced distribution.
- IELTS Academic Writing Task 1 `comparaciones` now includes a six-type visual teaching lab with five guided comparison moves per type before its writing exercise. A transversal audit of answer positions and feedback remains pending across all Task 1 engines.
- IELTS Academic Writing Task 1 distinguishes response architecture from transferable micro-skills. The live hub presents Introduction, Overview, Body 1 and Body 2 as a recommended WeLearn study sequence, not as fixed IELTS paragraph requirements; `body-1` and `body-2` provide visual-specific guidance, controlled models and progressive practice. `comparaciones` uses data-aligned five-example visual labs plus a three-level engine, while `procesos` and `mapas` mount their progressive engines. The maps route and map examples reuse the approved high-resolution original WeLearn visual bank. Vocabulary and cohesion now use a three-level, visual-specific engine, and Complete Task exposes only six fully paired original tasks so its visual, task wording, data reminder, model overview and model response remain verifiable.
- The content validator now protects the approved Task 1 guided-lab baseline: Comparisons must retain its four visual types, guided examples and progressive engine; Processes and Maps must retain five original guided examples, model language and their respective engines. This makes later content expansion auditable instead of relying on manual memory of the approved Overview pattern.

## Progress update: 2026-07-14

- IELTS execution is now the active priority; TOEFL expansion remains paused until IELTS is closed and audited.
- IELTS General Training now has complete live child routes for Reading, Writing Task 1 letter and Writing Task 2 essay, each with canonical metadata, official IELTS source links, visible official-format vs WeLearn-strategy language, original practice banks and explained answers.
- `npm run audit:ielts -- <base-url>` is now available as a global IELTS route audit. It reads the canonical route map, checks each IELTS route against a running site, and verifies HTTP 200, self-referential canonical, one H1, sitemap presence and basic EAO signals. This does not replace visual mobile QA, but it gives the project a repeatable canonical/indexability gate before returning to TOEFL.
- First production-local run passed the hard gate for 56 IELTS routes: no 404s, no canonical mismatches, no missing sitemap entries and no H1-count failures. After cleaning duplicated brand metadata on the Academic, Reading and Academic Writing hubs, the audit reports 48 remaining warnings. These are quality follow-ups, mostly missing JSON-LD on older hubs/legacy skill routes and missing visible official-format vs WeLearn-strategy language on the Academic Writing Task 1 and Task 2 hubs.
- IELTS Academic Writing Task 1 and Task 2 hubs now include LearningResource/FAQ/Breadcrumb JSON-LD plus visible "Formato oficial vs estrategia WeLearn" and "Respuesta explicada" sections. The IELTS global audit now reports 42 remaining warnings, down from 48, and both hubs passed rendered desktop checks for canonical, one H1, JSON-LD, no console logs and no horizontal overflow.
- IELTS core hubs `/practica/ielts/academic`, `/practica/ielts/reading` and `/practica/ielts/academic/writing` now include LearningResource/FAQ/Breadcrumb JSON-LD and are protected by the content validator. The global IELTS route auditor was also calibrated to detect Spanish/English answer-explanation language case-insensitively.
- IELTS Academic Writing hub plus the newer Task 1 visual routes (`graficos-lineales`, `graficos-de-barras`, `pie-charts`, `tablas`) and Task 2 essay-type routes (`advantages-disadvantages`, `direct-question`, `problem-solution`) now expose visible response-explanation/model-commentary language before interaction. Current production-local audit result: `npm run audit:ielts -- http://127.0.0.1:3187` passes for 57 IELTS routes with 0 warnings, including the exact `/practica/ielts` hub.
- Rendered IELTS UI audit sample passed across mobile 390x844 and desktop 1440x1000 for 13 representative routes: top IELTS hub, Academic hub, Reading hub, skimming, scanning, Multiple Choice, Academic Writing hub, Task 1 line graphs, Task 2 opinion, General Training hub, General Training Reading, GT Writing Task 1 and GT Writing Task 2. Evidence checked canonical, one H1, JSON-LD, no horizontal overflow, no console errors and basic interactions where routes expose practice buttons. Result: 26 route/viewport combinations checked, 0 failures.
- Full rendered IELTS UI audit is now complete for all 56 route-map IELTS URLs across mobile 390x844 and desktop 1440x1000. The first full pass found three quality issues: thin visible copy on `/practica/ielts/academic` mobile and missing visible official-format vs WeLearn-strategy language on `/practica/ielts/academic/writing`. After adding visible hub guidance and an Academic Writing official/WeLearn card, the second full pass checked 112 route/viewport combinations with 0 failures. Evidence covered canonical, one H1, JSON-LD, visible instructional depth, no horizontal overflow, no console errors and route-appropriate official/explanation language.
- IELTS documentation parity is now covered by the content validator. Every IELTS route listed in `docs/ielts-toefl-route-map.md` must also appear in `docs/ielts-toefl-content-inventory.json`, `docs/ielts-toefl-keyword-map.csv` and the local App Router tree as a `page.tsx`. The keyword map now includes the previously missing top hubs, Writing rubric, older Task 1/Task 2 micro-skill routes and General Training child routes.

## Content precision update: 2026-07-25

- IELTS Academic Writing Task 1 was re-audited as a response-architecture cluster: Introduction, Overview, Body 1 and Body 2 are live canonical routes, while trends, comparisons, vocabulary, processes and maps remain transferable WeLearn sub-skills rather than official paragraph requirements. The hub states the official minimum of 150 words and the WeLearn study ranges without presenting paragraph counts as IELTS rules.
- The Task 1 guided examples were reconciled with their underlying visuals. The Comparisons lab now describes the actual narrowing gap in the family-visits line graph and the correct four-city table scope. The Trends selection exercise now recognises the documented cycling/car crossover and avoids teaching a duplicate observation as a separate overview point.
- Visible Task 1 instructional copy was checked for the English-first requirement. Remaining Spanish prompts in Introduction and Pie Charts were translated, while routes, canonical URLs and internal identifiers were left unchanged.
- `npm run check:exam-practice-content` and `git diff --check` pass after the audit. The global technical gate is now also clear: `npx tsc --noEmit` and `npm run build` complete successfully, and the production build generates all documented Task 1 routes.
- A 2026-07-26 local route and interaction check confirmed HTTP 200, one H1 and production self-canonicals for all fourteen Task 1 child routes. Responsive checks covered the Body 1 lesson and the complete-task flow at 390px, including the timed writing surface; no Task 1 console errors were found. The only browser-console messages came from pre-existing global Google Tag Manager / Facebook CSP conflicts, outside the Task 1 scope.
- The IELTS route auditor now recognises the English-first `Official format versus WeLearn strategy` language as well as established Spanish-language routes. Its 2026-07-26 run checked all 59 documented IELTS routes against the local server with zero warnings. This is a validator-language alignment only; it does not change official-format claims or learning content.

## 1. Executive read

The current implementation is directionally aligned with the master plan: it already uses a hub-and-spoke architecture, lowercase practice URLs, sitemap inclusion, reusable practice components, original exercises, and a clear separation between exam hubs, section hubs, question-type pages and interactive workbenches.

The main gap is sequencing. Several production-style pages were implemented before the five Phase 0 control documents existed. Those pages should be treated as the first pilot cluster, not as a reason to keep expanding without governance.

## 2. Official format facts to protect

### TOEFL iBT

Official source: https://www.ets.org/toefl/test-takers/ibt/about/content.html

ETS currently lists the TOEFL iBT structure as:

- Reading: Complete the Words, Read in Daily Life, Read an Academic Passage.
- Listening: Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, Listen to an Academic Talk.
- Writing: Build a Sentence, Write an Email, Write for an Academic Discussion.
- Speaking: Listen and Repeat, Take an Interview.
- Scoring: four section scores and an overall score on a 1-6 scale; ETS also states a two-year transition period after January 2026 with a comparable 0-120 overall score.

Decision: pages for Build a Sentence, Write an Email and Academic Discussion can be treated as current TOEFL iBT preparation. Integrated Writing must remain legacy/general synthesis unless a future official ETS page reinstates it.

### IELTS Academic

Official sources:

- https://ielts.org/take-a-test/test-types/ielts-academic-test
- https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test

IELTS states that Academic includes Listening, Reading, Writing and Speaking; test time is 2 hours and 45 minutes; Academic Reading is 60 minutes; Academic Writing is 60 minutes; Speaking is 11-14 minutes.

IELTS sample materials list Academic Reading task types including:

- multiple-choice questions
- identifying information
- identifying writer's views/claims
- matching information
- matching headings
- matching features
- matching sentence endings
- sentence completion
- summary completion
- note completion
- table completion
- flow-chart completion
- diagram label completion
- short-answer questions

Decision: IELTS Reading pages under `tipos-de-preguntas` can be current-exam pages when they map to that list. Skimming/scanning are not official question types; they should live under a skills cluster.

## 3. Current route inventory summary

### IELTS implemented

- `/practica/ielts`
- `/practica/ielts/academic`
- `/practica/ielts/reading`
- `/practica/ielts/reading/tipos-de-preguntas`
- `/practica/ielts/reading/tipos-de-preguntas/true-false-not-given`
- `/practica/ielts/reading/tipos-de-preguntas/matching-headings`
- `/practica/ielts/reading/tipos-de-preguntas/multiple-choice`
- `/practica/ielts/reading/tipos-de-preguntas/summary-completion`
- `/practica/ielts/reading/tipos-de-preguntas/sentence-completion`
- `/practica/ielts/reading/tipos-de-preguntas/matching-information`
- `/practica/ielts/reading/tipos-de-preguntas/diagram-labeling`
- `/practica/ielts/academic/writing`
- `/practica/ielts/academic/writing/task1`
- `/practica/ielts/academic/writing/task1/introduccion`
- `/practica/ielts/academic/writing/task1/overview`
- `/practica/ielts/academic/writing/task1/tendencias`
- `/practica/ielts/academic/writing/task1/comparaciones`
- `/practica/ielts/academic/writing/task1/procesos`
- `/practica/ielts/academic/writing/task1/mapas`
- `/practica/ielts/academic/writing/task1/vocabulario`
- `/practica/ielts/academic/writing/task1/tarea-completa`
- `/practica/ielts/academic/writing/task2`
- `/practica/ielts/academic/writing/task2/tipo-ensayo`
- `/practica/ielts/academic/writing/task2/introduccion`
- `/practica/ielts/academic/writing/task2/parrafos-cuerpo`
- `/practica/ielts/academic/writing/task2/linking-language`
- `/practica/ielts/academic/writing/task2/conclusion`
- `/practica/ielts/academic/writing/task2/tarea-completa`

### TOEFL implemented

- `/practica/toefl`
- `/practica/toefl/reading`
- `/practica/toefl/reading/tipos-de-preguntas`
- `/practica/toefl/reading/tipos-de-preguntas/vocabulary`
- `/practica/toefl/reading/tipos-de-preguntas/inference`
- `/practica/toefl/reading/tipos-de-preguntas/factual-information`
- `/practica/toefl/reading/tipos-de-preguntas/rhetorical-purpose`
- `/practica/toefl/reading/tipos-de-preguntas/sentence-simplification`
- `/practica/toefl/writing`
- `/practica/toefl/writing/academic-discussion`
- `/practica/toefl/writing/write-an-email`
- `/practica/toefl/writing/build-a-sentence`
- `/practica/toefl/writing/academic-discussion/banco-de-prompts`
- `/practica/toefl/writing/write-an-email/banco-de-prompts`
- `/practica/toefl/writing/model-answers`
- `/practica/toefl/writing/rubrica`
- `/practica/toefl/writing/grammar-for-writing`
- `/practica/toefl/writing/integrated-writing`

## 4. Alignment with the master plan

Aligned:

- Hub-and-spoke practice structure exists.
- Current pages use canonical, metadata, H1 and sitemap inclusion patterns.
- TOEFL current Writing tasks are present.
- TOEFL Integrated Writing is explicitly marked as non-current/legacy in `seo-catalog.ts`.
- IELTS Reading question-type pages cover several official task types.
- Reusable engines/components exist in `src/components/exam-practice`.
- Central catalog exists in `src/data/practica-exams/seo-catalog.ts`.
- Content is original and instructional, not copied from competitor sites.

Partially aligned:

- Exercises are typed, but content, presentation, evaluation and progress are not fully separated yet.
- Many pages have useful SEO/EAO structure, but not every page follows the full 26-part pedagogical template.
- The sitemap includes the new practice routes, but we still need an explicit route governance file.
- Existing docs cover global SEO/AI SEO, but not the IELTS/TOEFL-specific control layer.

Not yet aligned:

- No dedicated `ielts-toefl-content-inventory.json` existed before this phase.
- No dedicated `ielts-toefl-keyword-map.csv` existed before this phase.
- No dedicated validators exist for exercise quality, answer keys, evidence and route status.
- No explicit compatibility matrix existed for old TOEFL Reading/Writing material vs the 2026 TOEFL iBT structure.
- External Pages/HTML materials for IELTS skimming/scanning are now mapped into canonical skills routes.

## 5. External material audit

### `idiomaswl_ielts_skimming_preview.html`

Recommended use: converted into the first IELTS Reading skill page.

Target route:

- `/practica/ielts/reading/habilidades/skimming`

Reason: skimming is a reading skill, not a formal IELTS Reading question type. It should support Matching Headings, main idea, summary, and time-management pages.

### `Skimming exercise .pages`

Recommended use: exercise set for skimming. Current implementation uses the skimming practice engine and original WeLearn exercises aligned to this cluster.

Target cluster:

- `/practica/ielts/reading/habilidades/skimming`

### `Skimming and scanning .pages`

Recommended use: split into two skill pages and/or a comparison page. Current implementation splits the skill flow into live skimming and scanning pages with cross-links plus a shared skimming-to-scanning transfer bank.

Target routes:

- `/practica/ielts/reading/habilidades/skimming`
- `/practica/ielts/reading/habilidades/scanning`
- `/practica/ielts/reading/habilidades/parafrasis`
- optional `/practica/ielts/reading/habilidades/skimming-vs-scanning`

### `Syllogism .pages`

Recommended use: reasoning/inference training.

Target clusters:

- `/practica/toefl/reading/tipos-de-preguntas/inference`
- future `/practica/toefl/reading/habilidades/logical-relationships`
- future `/practica/ielts/reading/habilidades/inferencia`

### `TOEFL : IELTS writing question types model answer .pages`

Recommended use: model-answer analysis and writing question-type taxonomy.

Target clusters:

- `/practica/toefl/writing/academic-discussion`
- `/practica/toefl/writing/academic-discussion/banco-de-prompts`
- `/practica/toefl/writing/write-an-email`
- `/practica/toefl/writing/write-an-email/banco-de-prompts`
- `/practica/toefl/writing/model-answers`
- `/practica/toefl/writing/rubrica`
- `/practica/toefl/writing/grammar-for-writing`
- `/practica/ielts/academic/writing/task2/tipo-ensayo`
- future IELTS General Training letter pages

### `TOEFL reading question types with examples.pages`

Recommended use: review against current TOEFL iBT structure.

Target treatment:

- compatible legacy reading skills can feed existing TOEFL Reading question-type pages.
- obsolete official-format claims must be rewritten as general academic reading practice.
- nothing from this file should be published as official 2026 TOEFL format without ETS verification.

### `WeLearn_Codex_Handoff_Summary.pdf`

Recommended use: architecture guardrail.

Key implications:

- Keep SSR-first educational pages.
- Use reusable Learning Engines.
- Preserve component contracts.
- Build toward Knowledge Graph, Experience Graph and Student Graph.

### `WeLearn_Documentation_Pack_v0.1.zip`

Recommended use: documentation source of truth for Learning Engine and design language direction. It should influence component contracts and visual QA before large-scale content generation.

## 6. Risk register

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Publishing old TOEFL tasks as current | High SEO trust risk | Label legacy tasks and cite ETS current structure |
| Mixing skills and question types | Cannibalization and confusing UX | Use `/habilidades/` for strategies and `/tipos-de-preguntas/` for official task forms |
| Mass content without validators | Quality decay | Add content validators before scaling |
| Pages with weak evidence explanations | Low learning value | Require answer, explanation, evidence, distractor note |
| Missing author/reviewer/source metadata | Weak EAO trust | Add visible review blocks and schema only when visible |
| Over-indexing thin pages | Crawl dilution | Only sitemap pages with complete content and practice value |

## 7. Immediate recommendation

Pause broad page creation for one short control sprint:

1. Finish the route map, inventory, keyword map and migration plan.
2. Build the IELTS Reading skills cluster starting with skimming and scanning.
3. Add exercise validators.
4. Re-audit sitemap, canonicals, UI overflow and interactions after every cluster.
