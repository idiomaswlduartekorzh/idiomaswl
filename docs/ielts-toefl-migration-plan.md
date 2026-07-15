# IELTS/TOEFL Migration Plan

Date: 2026-07-11
Status: execution plan after Phase 0 audit

## Execution priority update: IELTS first

Date: 2026-07-14

Current execution order:

1. Finish IELTS before expanding TOEFL further.
2. Treat TOEFL work completed so far as paused but protected by existing validators and documentation.
3. Resume TOEFL after IELTS has passed content, SEO/EAO, canonical/sitemap, UI and interaction gates.

IELTS-first closure order:

1. Close IELTS Academic Reading governance, banks and audit gaps.
2. Deepen IELTS Academic Writing Task 1 and Task 2 with larger banks, model-answer annotations and route-level guardrails.
3. Build the planned IELTS General Training branch only when each route can ship complete, canonical and useful.
4. Run global IELTS sitemap/canonical/404/build/UI audit before returning to TOEFL.

Execution note:

- `/practica/ielts/general-training` has moved from planned to live as a complete hub: metadata, canonical, LearningResource/FAQ/Breadcrumb schema, official IELTS source links, Academic vs General Training comparison, internal links and original mini practice with explained answers. No General Training child routes are live yet; dedicated Reading and Writing GT children remain blocked until each route has its own complete bank and audit evidence.
- `/practica/ielts/academic/writing/rubrica` has moved from planned to live as a complete pedagogical self-review route: metadata, canonical, LearningResource/FAQ/Breadcrumb schema, official IELTS format/sample links, visible official-format vs WeLearn-strategy language, Task 1/Task 2 criterion table, checklist, diagnostic exercises with explained answers, sitemap entry and route-level validator guardrails. This closes the IELTS Academic Writing "rubric pages" inventory gap; remaining Writing gaps are larger banks and review/source normalization for older skill pages.
- The older IELTS Academic Writing Task 1 skill routes (`introduccion`, `overview`, `tendencias`, `comparaciones`, `procesos`, `mapas`, `vocabulario`, `tarea-completa`) now share a governed review/source block. Each route distinguishes official IELTS Academic Task 1 format from WeLearn micro-skill strategy, declares a route-specific reviewed focus, links to official IELTS Academic format/sample sources, links internally to the Writing rubric, Task 1 hub and General Training comparison, and preserves answer/explanation language. The validator now protects this first Task 1 review/source normalization pass.
- The older IELTS Academic Writing Task 2 skill routes (`tipo-ensayo`, `introduccion`, `parrafos-cuerpo`, `linking-language`, `conclusion`, `tarea-completa`) now share a governed review/source block. Each route distinguishes official IELTS Academic Task 2 format from WeLearn strategy, declares a route-specific reviewed focus, links to official IELTS Academic format/sample sources, links internally to the Writing rubric, Task 2 hub, model answers and General Training comparison, and avoids duplicated Idiomas WeLearn metadata titles. The validator now protects the Task 2 review/source normalization pass.
- IELTS Academic Writing Task 1 `overview` has now been upgraded to the approved WeLearn blueprint: a horizontal selector exposes five original visual examples for each supported input type (line graph, bar chart, pie chart, table, process and map), each with its own visual, prompt, insight and model overview. A three-level, 15-item practice engine trains story detection, aligned overview selection and examiner-style editing with explanations and varied answer positions. The route keeps the official-format vs WeLearn-strategy distinction and its canonical/structured-data metadata.
- IELTS Academic Writing Task 1 `tendencias` now adds a six-type visual lab with five guided examples for line graphs, bar charts, pie charts, tables, processes and maps, followed by the observation-selection exercise and a three-level practice engine. Its pie visuals distinguish single distributions, balanced distributions and genuine two-pie composition changes; static bar examples no longer use false time-series language.
- IELTS Academic Writing Task 1 `comparaciones` now adds a six-type visual lab with five comparison moves per input, explaining what to compare before the existing production exercise. The route remains the next candidate for the transversal motor audit.
- `/practica/ielts/general-training/writing/task1` is now the first live General Training child route. It ships as a complete letter-writing page with metadata, canonical, LearningResource/FAQ/Breadcrumb schema, official IELTS General Training source links, visible official-format vs WeLearn-strategy language, tone drills, four original letter prompts, plans, useful language, common traps, explained answer checks, internal links and sitemap inclusion. The validator now protects this route before more General Training children are opened.
- `/practica/ielts/general-training/reading` is now live as the first dedicated General Training Reading child route. It includes metadata, canonical, LearningResource/FAQ/Breadcrumb schema, official IELTS General Training source links, visible official-format vs WeLearn-strategy language, a functional/social/workplace/training text bank, twelve original questions across short answer, sentence completion, matching information and true/false/not given practice, answers, explanations, traps, internal links and sitemap inclusion. The validator now protects this route before larger GT Reading timed banks are added.
- `/practica/ielts/general-training/writing/task2` is now live as the dedicated General Training essay route. It includes metadata, canonical, LearningResource/FAQ/Breadcrumb schema, official IELTS General Training source links, visible official-format vs WeLearn-strategy language, Academic vs General Training Task 2 comparison, a five-prompt original essay bank across opinion, discussion, advantages/disadvantages, problem-solution and direct-question practice, plans, thesis moves, useful language, common traps, model openings, explained answer checks, internal links and sitemap inclusion. The validator now protects this route before larger timed GT Task 2 sets are added.
- IELTS core hub hardening is complete for the current route map: `/practica/ielts/academic`, `/practica/ielts/reading` and `/practica/ielts/academic/writing` now have LearningResource/FAQ/Breadcrumb JSON-LD, and the content validator protects those schema requirements plus key hub links. The IELTS global route auditor now passes for 57 route-map URLs with 0 warnings after visible response-explanation/model-commentary language was added to the Academic Writing hub, Task 1 visual routes and remaining Task 2 essay-type routes; the auditor now includes the exact `/practica/ielts` hub.
- The first rendered UI audit sample is complete for IELTS-first closure. Mobile 390x844 and desktop 1440x1000 checks covered the top IELTS hub, Academic hub, Reading hub, Reading skills, Reading question type, Academic Writing hub, Task 1 visual practice, Task 2 essay-type practice and General Training child routes. The sample verified canonical, H1, JSON-LD, overflow, console errors and basic interactive feedback for practice pages; all 26 route/viewport checks passed.
- Full IELTS rendered UI closure pass is complete. All 56 IELTS route-map URLs were checked in mobile 390x844 and desktop 1440x1000 for canonical, one H1, JSON-LD, visible instructional depth, official-format vs WeLearn-strategy language where required, explanation/model-answer language where required, horizontal overflow and console errors. Initial findings on the Academic and Academic Writing hubs were fixed with additional visible guidance; the final full pass covered 112 route/viewport combinations with 0 failures.
- IELTS documentation coverage is now closed for the current 57-route map. The keyword map now covers the top hubs, Writing rubric route, older Task 1 and Task 2 micro-skill routes, and all live General Training child routes. The content validator now compares every IELTS route in `docs/ielts-toefl-route-map.md` against the inventory, keyword map and local `page.tsx` files so future route additions cannot bypass documentation coverage.

## Progress update: 2026-07-12

- Phase 2 IELTS Reading skills pilot has live pages for the planned skill routes.
- The IELTS Academic Reading question-type cluster now has all 14 official routes live and represented in the inventory.
- Next scaling work should prioritize content validators, exercise-bank expansion and the next route-map cluster rather than adding more IELTS Reading question-type routes.
- The IELTS Academic Reading question-type pages now include review/source blocks that distinguish official IELTS Reading task types from original WeLearn practice, and the content validator requires this block on every published child route in `/practica/ielts/reading/tipos-de-preguntas`.
- The IELTS Reading question-type hub now includes a mixed question-type bank with three original passages and twelve tasks. The bank trains format recognition, route transfer, evidence, traps and links back to the dedicated official question-type pages.
- The IELTS Multiple Choice route now has a route-specific passage bank with three original passages and eighteen questions covering detail, purpose, inference, main idea and vocabulary-in-context decisions with explanations and distractor traps.
- The IELTS True/False/Not Given route now has a route-specific passage bank with three original passages and twenty-two statements, covering TRUE, FALSE and NOT GIVEN decisions with explanations and traps.
- The IELTS Yes/No/Not Given route now has a route-specific passage bank with three original passages and twenty-two writer-view statements, covering YES, NO and NOT GIVEN decisions with explanations and traps for opinion-vs-fact confusion.
- The IELTS Matching Headings route now has a route-specific passage bank with three original passages and seventeen paragraph-heading decisions, including unused heading distractors, explanations and traps for main-idea vs detail confusion.
- The IELTS Matching Information route now has a route-specific passage bank with three original passages and eighteen paragraph-location statements, including reused paragraph answers, explanations and traps for topic-vs-detail confusion.
- The IELTS Matching Features route now has a route-specific passage bank with three original passages and nineteen feature-matching statements, including reused feature answers, explanations and traps for proximity-vs-association confusion.
- The IELTS Matching Sentence Endings route now has a route-specific passage bank with three original passages and eighteen sentence-start decisions, including extra ending distractors, explanations and traps for grammar-fit vs textual-evidence confusion.
- The IELTS Sentence Completion route now has a route-specific passage bank with three original passages and eighteen blanks, using the reusable completion bank pattern for exact-copy answers, alternatives, word-limit checks, hints and explanations.
- The IELTS Summary Completion route now has a route-specific passage bank with three original passages and eighteen blanks, using the reusable completion bank pattern for paraphrased summaries, exact-copy answers, word-limit checks, cohesion fit, hints and explanations.
- The IELTS Note Completion route now has a route-specific passage bank with three original passages, nine note groups and eighteen blanks, training heading-led scanning, exact-copy answers, word-limit checks, hints and explanations.
- The IELTS Table Completion route now has a route-specific passage bank with three original passages, nine table rows and eighteen blanks, training row/column coordinate reading, exact-copy answers, word-limit checks, hints and explanations.
- The IELTS Flow-chart Completion route now has a route-specific passage bank with three original process passages and eighteen sequential blanks, training process order, connector awareness, exact-copy answers, word-limit checks, hints and explanations.
- The IELTS Diagram Labeling route now has a route-specific passage bank with three original diagram passages, eighteen diagram stages and eighteen labels, training visual-structure reading, stage-to-evidence matching, exact-copy answers, word-limit checks, hints and explanations.
- The IELTS Short Answer route now has a route-specific passage bank with three original passages and eighteen direct-answer questions, training question-word recognition, evidence scanning, minimal answers, word-limit checks, hints, explanations and traps.
- The IELTS Reading official question-type cluster has passed a cluster-level SEO/SSR audit across the hub and all 14 child routes: each route returns 200 locally, has a self-referential canonical, appears in the sitemap, exposes an H1, renders substantial SSR content and includes visible review/source language separating IELTS official task type coverage from original WeLearn practice.
- The IELTS Reading official question-type cluster now has a normalized top-of-page "Formato oficial vs estrategia WeLearn" card on all 14 child routes. The content validator now guards this requirement so future IELTS Reading question-type pages keep the official-format/WeLearn-strategy distinction visible before the exercise bank.
- The IELTS Academic Writing Task 1 visual-type mini-cluster is complete for the planned routes: `graficos-lineales`, `graficos-de-barras`, `pie-charts` and `tablas`. Next Writing expansion should move to Task 2 essay-type pages or deeper exercise banks for these visual routes.
- IELTS Academic Writing Task 2 essay-type expansion has begun with `opinion`, `discussion`, `advantages-disadvantages`, `problem-solution`, `direct-question` and `model-answers`. The Task 2 hub now includes a governed prompt bank with ten original prompts across five WeLearn essay-type practice categories, including target, four-step plan, thesis move, useful language, common trap and self-checks. The validator now requires this bank and its route-level render.
- The IELTS Task 2 `opinion` route now has a route-specific prompt-bank pilot with two original agree/disagree or to-what-extent prompts, target, four-step plan, thesis move, useful language, common trap and checklist. The validator now requires `IELTS_TASK2_OPINION_PROMPTS` on the opinion page so route-specific Writing banks can scale by essay type.
- The IELTS Task 2 `discussion` route now has a route-specific prompt-bank pilot with two original discuss-both-views prompts, target, four-step plan, thesis move, useful language, common trap and checklist. The validator now requires `IELTS_TASK2_DISCUSSION_PROMPTS` on the discussion page.
- The IELTS Task 2 `advantages-disadvantages` route now has a route-specific prompt-bank pilot with two original prompts covering both `outweigh` evaluation and plain advantages/disadvantages trade-off prompts, each with target, four-step plan, thesis move, useful language, common trap and checklist. The validator now requires `IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS` on the advantages-disadvantages page.
- The IELTS Task 2 `problem-solution` route now has a route-specific prompt-bank pilot with two original causes/problems/solutions prompts, target, four-step plan, thesis move, useful language, common trap and checklist. The validator now requires `IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS` on the problem-solution page.
- The IELTS Task 2 `direct-question` route now has a route-specific prompt-bank pilot with two original two-part-question prompts, target, four-step plan, thesis move, useful language, common trap and checklist. The validator now requires `IELTS_TASK2_DIRECT_QUESTION_PROMPTS` on the direct-question page, completing the first route-specific prompt-bank pass for all five WeLearn Task 2 essay-type practice categories.
- The five IELTS Task 2 essay-type routes (`opinion`, `discussion`, `advantages-disadvantages`, `problem-solution`, `direct-question`) have passed a cluster-level production-local audit: each route returns 200, has a self-referential canonical, appears in the sitemap, exposes one H1, renders the route-specific two-prompt bank in SSR, distinguishes official IELTS format from WeLearn strategy, and passes desktop/mobile interaction checks for the guided exercise and prompt-bank checklist.
- TOEFL Writing expansion has moved into the current-task cluster. The `academic-discussion` guide and `/academic-discussion/banco-de-prompts` now have validator guardrails: the guide must render `AcademicDiscussionWorkbench` with `TOEFL_ACADEMIC_DISCUSSION_PROMPTS`, the prompt bank must render `AcademicDiscussionPromptBankClient` with `ACADEMIC_DISCUSSION_PROMPTS`, the bank must keep Integrated Writing marked as legacy/synthesis, and every expanded Academic Discussion prompt is validated for class conversation, category, difficulty, strategy, trap, checklist, useful language, model answer and explanation.
- The `write-an-email` guide and `/write-an-email/banco-de-prompts` now have matching validator guardrails: the guide must render `EmailWritingWorkbench` with `TOEFL_EMAIL_PROMPTS`, the guide must link to the email prompt bank, the bank must render `EmailPromptBankClient` with `EMAIL_PROMPT_BANK`, Integrated Writing must remain legacy/synthesis, and every expanded email prompt is validated for situation, task, audience, purpose, tone, category, strategy, trap, checklist, useful language, model email and explanation.
- The `build-a-sentence` guide now has validator guardrails for the current TOEFL Writing microtask: the page must render `SentenceBuildWorkbench`, use `TOEFL_SENTENCE_BUILD_ITEMS`, render `TOEFL_BUILD_A_SENTENCE_PROMPT_BANK`, distinguish official format from WeLearn strategy, keep Integrated Writing as legacy/synthesis, and preserve prompt coverage for cause/result, contrast, condition, relative clause and concession.
- TOEFL Reading current-format routes now have validator guardrails: `/formato-2026` must keep Complete the Words, Read in Daily Life and Read an Academic Passage as the official current task-family index, keep legacy question-type pages framed as compatible support, render mixed drills, and each child route must cite the ETS content source, distinguish official format from WeLearn strategy, render its guided practice bank and include explained answers.
- TOEFL Reading `read-an-academic-passage` now has a three-passage original bank with nine explained questions across main idea, factual information, inference, rhetorical purpose and vocabulary-in-context style practice. The validator now requires at least three academic passages, three questions per passage, globally unique question ids and at least nine total questions.
- TOEFL Reading `complete-the-words` now has a 16-item original context-completion bank with explanations and traps. The validator now requires at least 16 items, globally unique ids, four-option choice sets, answers in range, explanations and traps.
- TOEFL Reading `read-in-daily-life` now has a four-text original functional-reading bank with twelve explained questions across campus notices, appointment emails, lab updates and housing maintenance messages. The validator now requires at least four daily-life texts, three questions per text, globally unique question ids and at least twelve total questions.
- IELTS Reading `skimming` and `scanning` now have route-level integration guardrails. The validator requires the skimming page to keep `SkimmingPracticeEngine`, the scanning page to keep `ScanningPracticeEngine`, both pages to render `SkimScanTransferEngine` with `IELTS_SKIM_SCAN_TRANSFER_SETS`, preserve official-format vs WeLearn-strategy language, cite the internal skimming/scanning source materials, and link to the correct companion skill plus official question-type transfer routes.
- IELTS Reading `inferencia`, `parafrasis`, `limite-de-palabras` and `gestion-del-tiempo` now have route-level integration guardrails. The validator requires each page to keep its dedicated practice engine and bank, preserve official-format vs WeLearn-strategy language, render `SkillReviewSourceBlock`, cite the IELTS Academic source and link to the intended companion skills plus official question-type transfer routes.
- TOEFL Writing `academic-discussion` and `/academic-discussion/banco-de-prompts` have passed the production-local build/content/SEO half of the audit: `npm run build`, `npm run check:exam-practice-content`, local HTTP 200, self-referential canonical, one H1 per route, robots index/follow, JSON-LD, substantial SSR content and sitemap inclusion. The cluster is not closed yet because rendered desktop/mobile interaction evidence is still pending.
- TOEFL Writing `academic-discussion` now has a visible guide-level "Formato oficial vs estrategia WeLearn" block with ETS Writing source language and explicit Integrated Writing legacy/synthesis labeling. The prompt-bank metadata title was normalized so the global Next metadata template does not duplicate the Idiomas WeLearn brand, and the validator now protects the guide-level official-format/WeLearn-strategy/source/legacy requirements.
- TOEFL Writing `write-an-email` now mirrors the Academic Discussion SEO/EAO hardening: the guide has a visible "Formato oficial vs estrategia WeLearn" block with ETS Writing source language and explicit Integrated Writing legacy/synthesis labeling, the prompt-bank metadata title was normalized to avoid duplicated brand output, and the validator protects the guide-level official-format/WeLearn-strategy/source/legacy requirements.
- TOEFL is now paused for IELTS-first execution. The next TOEFL gate remains rendered desktop/mobile interaction evidence for the `academic-discussion` guide and prompt bank, but it should wait until IELTS is closed. The remaining TOEFL evidence should cover navigation, filtering, search, model reveal, text entry, checklist toggles and horizontal overflow.

## 1. Goal

Move the IELTS and TOEFL practice areas from useful pilot pages to a governed, scalable exam-prep ecosystem with:

- official-format accuracy
- original practice
- canonical indexable pages
- reusable Learning Engines
- visible educational value
- SEO and EAO structure by default

## 2. Non-negotiable rules

1. No new page enters the sitemap unless it has complete instructional content, metadata, canonical, internal links and at least one useful practice element.
2. TOEFL 2026 official task claims must cite ETS or be worded as WeLearn strategy.
3. IELTS question-type pages must map to IELTS official task types when placed under `tipos-de-preguntas`.
4. Skills such as skimming, scanning, inference and paraphrasing must live under `habilidades`.
5. Legacy TOEFL pages can exist only with clear labels and no misleading current-format claims.
6. Exercise content must have answer, explanation, evidence or rationale, and distractor notes when applicable.

## 3. Phase 1: Governance cleanup

Deliverables:

- Confirm these docs are committed to the repo:
  - `docs/ielts-toefl-audit.md`
  - `docs/ielts-toefl-route-map.md`
  - `docs/ielts-toefl-content-inventory.json`
  - `docs/ielts-toefl-keyword-map.csv`
  - `docs/ielts-toefl-migration-plan.md`
- Add an implementation checklist to future PRs or task summaries.
- Decide final route for skill pages:
  - recommended: `/practica/{exam}/{section}/habilidades/{skill}`

Validation:

- Route map has no duplicate search intent.
- Every planned page has a parent hub.
- Every live page is represented in the inventory.

## 4. Phase 2: IELTS Reading skills pilot

Started with:

- `/practica/ielts/reading/habilidades`
- `/practica/ielts/reading/habilidades/skimming`
- `/practica/ielts/reading/habilidades/scanning`

Use:

- `idiomaswl_ielts_skimming_preview.html`
- `Skimming exercise .pages`
- `Skimming and scanning .pages`

Required page sections:

- direct answer near top
- what the skill is
- when to use it
- step-by-step method
- worked example
- guided practice
- independent practice
- answers and explanations
- common mistakes
- checklist
- FAQs
- next lessons
- official/source note where relevant

Current status: the IELTS Reading skills hub is live as the cluster index with official-format vs WeLearn-strategy guidance, recommended study order, FAQ schema and skill-to-question transfer links. Skimming, scanning, inferencia, paráfrasis, límite de palabras and gestión del tiempo are live as skills pages, not question-type pages. Skimming and scanning now share a reusable timed transfer-practice bank with four original passages and balanced skim/scan first-move decisions; each set asks students to decide whether the first move is skimming or scanning, then reveal paragraph, signal, evidence and trap. Paráfrasis now has a reusable multi-set equivalence bank covering scope, certainty, cause, time and contrast. Inferencia now has a reusable multi-set evidence bank that trains moderate conclusions, textual support and distractor elimination. Límite de palabras now has a reusable multi-set completion bank that trains exact copying, grammar fit, word counting and overlong-answer traps. Gestión del tiempo now has a reusable multi-set triage bank that trains solve/mark/skip decisions across official IELTS Reading task types. These pages now include a direct answer, official-format vs WeLearn-strategy note, guided practice, independent practice, answers/explanations, common mistakes/checklists, FAQs, next lessons, review/source blocks and internal links back to IELTS Reading and official task-type pages.

Internal links:

- skimming to Matching Headings and Summary Completion
- scanning to Matching Information, Sentence Completion, Diagram Labeling
- both skills back to IELTS Reading hub

Validation:

- `npm run build`
- sitemap inclusion only after complete
- local HTTP 200; for local UI/SEO audits use `npm run dev:audit -- -p <port>` because this Next 16 repo can serve newly added nested practice routes as 404 under Turbopack dev even when `next build` and webpack dev generate them correctly
- desktop and mobile visual audit
- one interaction audit per practice component

## 5. Phase 3: Content model and validators

Create a durable content model before scaling hundreds of exercises.

Recommended model layers:

- route metadata
- lesson content
- exercise data
- evaluation data
- progress state
- structured data

Recommended validator checks:

- duplicate IDs
- missing answer keys
- missing explanations
- missing evidence or rationale
- options with duplicated text
- answer distribution too predictable
- English exercise accidentally written in Spanish
- official-format claim without approved source
- legacy TOEFL route lacking legacy label
- sitemap route without route-map entry

Current status: `npm run check:exam-practice-content` is now available as the first content gate. It validates canonical catalog routes, route-map coverage, published page files, IELTS skill-vs-question separation, IELTS Reading skill review/source blocks, IELTS Reading official question-type review/source blocks, IELTS Reading mixed question-type banks, the IELTS Multiple Choice route-specific passage bank, the IELTS True/False/Not Given route-specific passage bank, the IELTS Yes/No/Not Given route-specific passage bank, the IELTS Matching Headings route-specific passage bank, the IELTS Matching Information route-specific passage bank, the IELTS Matching Features route-specific passage bank, the IELTS Matching Sentence Endings route-specific passage bank, the IELTS Sentence Completion route-specific passage bank, the IELTS Summary Completion route-specific passage bank, the IELTS Note Completion route-specific passage bank, the IELTS Table Completion route-specific passage bank, the IELTS Flow-chart Completion route-specific passage bank, the IELTS Diagram Labeling route-specific passage bank, the IELTS Short Answer route-specific passage bank, TOEFL Integrated Writing legacy/synthesis labeling, TOEFL Reading current-format route guardrails, IELTS Reading skill route integration guardrails, IELTS skimming/scanning timed transfer banks, IELTS paraphrase banks, IELTS inference banks, IELTS word-limit banks, IELTS time-management banks, TOEFL Academic Discussion guide/prompt-bank guardrails, TOEFL Write an Email guide/prompt-bank guardrails, TOEFL Build a Sentence route/prompt-bank guardrails, the expanded TOEFL Writing mixed-drill bank, TOEFL Writing scored variants, TOEFL Writing revision drills, TOEFL Writing timed review sets, and core IELTS/TOEFL exercise-bank answer/explanation/trap coverage.

Validation:

- Run `npm run check:exam-practice-content`.
- Run it before creating each new cluster.

## 6. Phase 4: TOEFL current-format correction

Status: first current-format Reading branch is live with hub and three task pages. The first reusable exercise-bank pass is also live: Complete the Words, Read in Daily Life and Read an Academic Passage now use shared catalog banks covered by `npm run check:exam-practice-content`. Visual overflow QA has passed for the six TOEFL Reading routes touched in this phase on mobile 390px and desktop 1440px. The TOEFL Reading habilidades cluster is now live as WeLearn strategy support, not an official ETS task family: logical relationships, text organisation and time management. Mixed-skill drills now connect current TOEFL Reading task families with WeLearn skills inside existing hubs, also covered by the validator. Next pass should continue expanding banks and more full-length transfer sets.

Create a dedicated current-format Reading branch:

- `/practica/toefl/reading/formato-2026`
- `/practica/toefl/reading/formato-2026/complete-the-words`
- `/practica/toefl/reading/formato-2026/read-in-daily-life`
- `/practica/toefl/reading/formato-2026/read-an-academic-passage`

Update TOEFL Reading hub to explain:

- official TOEFL Reading task families from ETS
- WeLearn compatible skills
- legacy question-type practice and why it still helps

Keep existing pages, but add compatibility labels:

- vocabulary: compatible skill
- inference: compatible skill
- factual information: compatible skill
- rhetorical purpose: compatible skill
- sentence simplification: legacy-compatible skill

Validation:

- No page says old task names are the only current TOEFL format.
- Current TOEFL pages cite ETS source.
- Legacy pages link to current-format hub.

## 7. Phase 5: Writing expansion

TOEFL Writing:

- Build prompt banks for Build a Sentence, Write an Email, Academic Discussion.
- Add model-answer pages and scoring/rubric explanations. The current model-answer, scored-variant, rubric, grammar-for-writing, Academic Discussion prompt-bank, Write an Email prompt-bank, Build a Sentence prompt bank, expanded TOEFL Writing mixed drills, task-specific revision drills and timed mixed-writing review sets are live for current TOEFL Writing practice; continue with larger revision banks and full-cycle timed writing sets.
- Keep Integrated Writing as synthesis/legacy.

IELTS Writing:

- Expand Task 1 by chart/process/map/table type.
- Expand Task 2 by essay type.
- Add model answers with annotation, weak/strong comparison and checklist.

Validation:

- Every model answer must include why it works.
- Avoid publishing unreviewed AI-style essays without pedagogical annotation.
- Distinguish official band criteria from WeLearn practice checklist.

## 8. Phase 6: UI, SEO and EAO audit loop

Every cluster must pass:

- build
- local route 200 with `npm run dev:audit -- -p <port>` for route-level audits
- canonical check
- H1/title/meta check
- JSON-LD only when visible content supports it
- sitemap check
- mobile screenshot check
- desktop screenshot check
- interaction check
- text overflow check
- internal link check

Recommended order:

1. IELTS Reading skills: skimming/scanning.
2. TOEFL Reading current-format hub and three task pages.
3. Content validators.
4. IELTS remaining Reading official question types.
5. TOEFL Writing prompt banks.
6. IELTS Writing model-answer clusters.

## 9. Done definition per page

A page is done only when:

- it has a unique search intent
- it has a canonical route
- it is represented in the route map
- it is represented in the content inventory
- it has metadata and H1
- it has visible instructional content
- it has practice or examples
- answers have explanations
- internal links point to parent, siblings and next step
- build passes
- UI has been checked on mobile and desktop
- official claims are sourced or softened as strategy
