# IELTS/TOEFL Route Map

Date: 2026-07-11
Status: canonical planning map

## 1. URL principles

- Use lowercase URLs.
- Use Spanish route labels for user-facing taxonomy when the page is in Spanish.
- Keep canonical URLs self-referential.
- Do not publish placeholder pages.
- Add sitemap entries only after content, metadata, internal links and practice value are complete.
- Separate official question/task types from WeLearn learning skills.

## 2. Top-level hubs

| Route | Status | Purpose |
| --- | --- | --- |
| `/practica/ielts` | live | IELTS practice hub |
| `/practica/ielts/academic` | live | IELTS Academic hub |
| `/practica/ielts/general-training` | live | IELTS General Training hub |
| `/examenes/toefl` | live | Primary Spanish landing for simulacro/examen TOEFL intent and the 20 four-section mocks |
| `/practica/toefl` | live | TOEFL practice hub |

## 3. IELTS Academic Reading

### Hubs

| Route | Status | Notes |
| --- | --- | --- |
| `/practica/ielts/reading` | live | Current reading hub |
| `/practica/ielts/reading/tipos-de-preguntas` | live | Official task-type hub |
| `/practica/ielts/reading/habilidades` | live | Skills hub for strategy pages |

### Official question-type routes

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/ielts/reading/tipos-de-preguntas/multiple-choice` | live | Multiple choice |
| `/practica/ielts/reading/tipos-de-preguntas/true-false-not-given` | live | Identifying information |
| `/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given` | live | Identifying writer's views/claims |
| `/practica/ielts/reading/tipos-de-preguntas/matching-information` | live | Matching information |
| `/practica/ielts/reading/tipos-de-preguntas/matching-headings` | live | Matching headings |
| `/practica/ielts/reading/tipos-de-preguntas/matching-features` | live | Matching features |
| `/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings` | live | Matching sentence endings |
| `/practica/ielts/reading/tipos-de-preguntas/sentence-completion` | live | Sentence completion |
| `/practica/ielts/reading/tipos-de-preguntas/summary-completion` | live | Summary completion |
| `/practica/ielts/reading/tipos-de-preguntas/note-completion` | live | Note completion |
| `/practica/ielts/reading/tipos-de-preguntas/table-completion` | live | Table completion |
| `/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion` | live | Flow-chart completion |
| `/practica/ielts/reading/tipos-de-preguntas/diagram-labeling` | live | Diagram label completion |
| `/practica/ielts/reading/tipos-de-preguntas/short-answer` | live | Short-answer questions |

### Skills routes

| Route | Status | Material source |
| --- | --- | --- |
| `/practica/ielts/reading/habilidades/skimming` | live | `idiomaswl_ielts_skimming_preview.html`, `Skimming exercise .pages`, `Skimming and scanning .pages` |
| `/practica/ielts/reading/habilidades/scanning` | live | `Skimming and scanning .pages` |
| `/practica/ielts/reading/habilidades/inferencia` | live | `Syllogism .pages`, current inference exercises |
| `/practica/ielts/reading/habilidades/parafrasis` | live | Needed for most task types |
| `/practica/ielts/reading/habilidades/limite-de-palabras` | live | Completion tasks; WeLearn skill, not official standalone IELTS task type |
| `/practica/ielts/reading/habilidades/gestion-del-tiempo` | live | Cross-cutting WeLearn skill, not official standalone IELTS task type |

## 4. IELTS Academic Writing

### Hubs

| Route | Status | Notes |
| --- | --- | --- |
| `/practica/ielts/academic/writing` | live | Academic Writing hub |
| `/practica/ielts/academic/writing/rubrica` | live | Pedagogical IELTS Writing rubric and self-review route |
| `/practica/ielts/academic/writing/task1` | live | Task 1 hub |
| `/practica/ielts/academic/writing/task2` | live | Task 2 hub |

### Task 1 routes

Task 1 is organized in three deliberately separate layers. The response architecture is
`Introduction → Overview → Body 1 → Body 2`; a third body paragraph is a conditional
choice for unusually dense visuals, not a default IELTS requirement. Transferable
subskills (trend selection, comparisons, vocabulary and cohesion) help a learner build
those paragraphs. Visual-type lessons (charts, tables, processes and maps) explain what
changes according to the input. This is a WeLearn study model; IELTS does not prescribe
paragraph names or an exact word count per paragraph.

| Route | Status | WeLearn role |
| --- | --- | --- |
| `/practica/ielts/academic/writing/task1/introduccion` | live | Response architecture: paraphrased opening |
| `/practica/ielts/academic/writing/task1/overview` | live | Response architecture: overview paragraph |
| `/practica/ielts/academic/writing/task1/body-1` | live | Response architecture: first grouped-detail paragraph |
| `/practica/ielts/academic/writing/task1/body-2` | live | Response architecture: second grouped-detail paragraph |
| `/practica/ielts/academic/writing/task1/tendencias` | live | Transferable subskill: selecting and describing change |
| `/practica/ielts/academic/writing/task1/comparaciones` | live | Transferable subskill: selecting and expressing contrasts |
| `/practica/ielts/academic/writing/task1/vocabulario` | live | Transferable subskill: visual-specific data vocabulary and cohesion engine |
| `/practica/ielts/academic/writing/task1/procesos` | live | Visual type: process diagrams |
| `/practica/ielts/academic/writing/task1/mapas` | live | Visual type: maps |
| `/practica/ielts/academic/writing/task1/graficos-lineales` | live | Visual type: line graphs |
| `/practica/ielts/academic/writing/task1/graficos-de-barras` | live | Visual type: bar charts |
| `/practica/ielts/academic/writing/task1/pie-charts` | live | Visual type: pie charts |
| `/practica/ielts/academic/writing/task1/tablas` | live | Visual type: tables |
| `/practica/ielts/academic/writing/task1/tarea-completa` | live | Canonical full-response library: six paired timed visual tasks and final review |

### Task 1 non-indexed functional route

| Route | Indexing | Purpose |
| --- | --- | --- |
| `/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=<id>` | `noindex, nofollow` | Individual timed writing session launched from the canonical Task 1 practice library. It deliberately stays out of the sitemap and search results to avoid duplicate practice pages. |

### Task 2 routes

Task 2 uses three layers. `Build the essay` is the response architecture; question-type routes adapt that architecture to the instruction; transferable-skill routes support several paragraphs. Paragraphs and subskills must not be presented as the same thing.

#### Build the essay

| Route | Status | Purpose |
| --- | --- | --- |
| `/practica/ielts/academic/writing/task2/analisis-pregunta` | live | Prompt analysis and essay-plan pilot with five question families and progressive practice |
| `/practica/ielts/academic/writing/task2/introduccion` | live | Paraphrase, thesis, position and optional roadmap |
| `/practica/ielts/academic/writing/task2/body-1` | live | First controlling idea adapted to five question families, with 25 guided cases and progressive practice |
| `/practica/ielts/academic/writing/task2/body-2` | live | Second controlling idea adapted to five question families, with 25 guided cases and progressive practice |
| `/practica/ielts/academic/writing/task2/conclusion` | live | Question-sensitive position restatement and synthesis without new ideas, with 25 guided cases and progressive Lego practice |
| `/practica/ielts/academic/writing/task2/revision-final` | live | Layered instruction, position, paragraph, cohesion and language review with 25 guided cases and no automated band scoring |
| `/practica/ielts/academic/writing/task2/tarea-completa` | live | Full timed essay practice |

`Body 3` is optional strategy, not a required cluster route. WeLearn teaches a four-paragraph default while stating clearly that IELTS does not prescribe a fixed paragraph count.

#### Transferable skills and legacy bridge routes

| Route | Status | Purpose |
| --- | --- | --- |
| `/practica/ielts/academic/writing/task2/tipo-ensayo` | live | Existing question-type recognition route; retained while Prompt Analysis becomes canonical for prompt analysis |
| `/practica/ielts/academic/writing/task2/parrafos-cuerpo` | live | Existing umbrella lesson retained as a transferable paragraph-development bridge now that Body 1 and Body 2 have independent architecture lessons |
| `/practica/ielts/academic/writing/task2/linking-language` | live | Cohesion and linking functions |
| `/practica/ielts/academic/writing/task2/opinion` | live |
| `/practica/ielts/academic/writing/task2/discussion` | live |
| `/practica/ielts/academic/writing/task2/advantages-disadvantages` | live |
| `/practica/ielts/academic/writing/task2/problem-solution` | live |
| `/practica/ielts/academic/writing/task2/direct-question` | live |
| `/practica/ielts/academic/writing/task2/model-answers` | live |

#### Published transferable-skill clusters

These routes passed the Task 2 blueprint guard (long explanation, worked examples, guided
writing and corrected practice). Their child URLs are indexable learning resources, not
private exercise-state pages.

| Route | Status | Purpose |
| --- | --- | --- |
| `/practica/ielts/academic/writing/task2/paraphrasing` | live | Five meaning-safe paraphrasing techniques |
| `/practica/ielts/academic/writing/task2/paraphrasing/synonyms` | live | Synonym choice without meaning drift |
| `/practica/ielts/academic/writing/task2/paraphrasing/word-order` | live | Paraphrasing through word order |
| `/practica/ielts/academic/writing/task2/paraphrasing/word-form` | live | Paraphrasing through word class |
| `/practica/ielts/academic/writing/task2/paraphrasing/voice` | live | Active/passive voice changes |
| `/practica/ielts/academic/writing/task2/paraphrasing/sentence-structure` | live | Sentence-structure changes |
| `/practica/ielts/academic/writing/task2/academic-vocabulary` | live | Academic vocabulary organised by function |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/hedging` | live | Hedging claims |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/asserting` | live | Asserting claims |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/attributing` | live | Attributing ideas and evidence |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/quantifying` | live | Quantifying without invented precision |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/causing` | live | Cause-and-effect language |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/evaluating` | live | Evaluative language |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/proposing` | live | Proposal language |
| `/practica/ielts/academic/writing/task2/academic-vocabulary/register` | live | Academic register |
| `/practica/ielts/academic/writing/task2/habilidades/thesis-and-position` | live | Thesis and position |
| `/practica/ielts/academic/writing/task2/habilidades/topic-sentences` | live | Topic sentences |
| `/practica/ielts/academic/writing/task2/habilidades/explanation-and-development` | live | Explanation and development |
| `/practica/ielts/academic/writing/task2/habilidades/examples-and-evidence` | live | Examples and evidence |
| `/practica/ielts/academic/writing/task2/habilidades/contrast-and-concession` | live | Contrast and concession |
| `/practica/ielts/academic/writing/task2/habilidades/sentence-types` | live | Sentence types |
| `/practica/ielts/academic/writing/task2/habilidades/critical-final-review` | live | Critical final review |
| `/practica/ielts/academic/writing/vocabulario` | live | Vocabulary superhub for both Academic Writing tasks |
| `/practica/ielts/academic/writing/vocabulario/task1-introduccion` | live | Task 1 introduction vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task1-overview` | live | Task 1 overview vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task1-tendencias` | live | Task 1 trend vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task1-comparaciones` | live | Task 1 comparison vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task1-procesos` | live | Task 1 process vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task1-mapas` | live | Task 1 map vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task2-introduccion` | live | Task 2 introduction vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task2-body` | live | Task 2 body-paragraph vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task2-conclusion` | live | Task 2 conclusion vocabulary |
| `/practica/ielts/academic/writing/vocabulario/task2-revision` | live | Task 2 revision vocabulary |

The legacy activity at /practica/ielts-writing-conectores remains outside this canonical map
and the sitemap until its estimated Band 5/6/7 result labels are removed or replaced by
skill-specific feedback that does not imply official IELTS scoring.

## 5. IELTS General Training

### Hubs

| Route | Status | Notes |
| --- | --- | --- |
| `/practica/ielts/general-training` | live | General Training hub and Academic comparison |

### Writing routes

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/ielts/general-training/writing/task1` | live | General Training Writing Task 1 letter |
| `/practica/ielts/general-training/writing/task2` | live | General Training Writing Task 2 essay |

### Reading routes

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/ielts/general-training/reading` | live | General Training Reading functional/social/workplace texts |

Note: General Training child routes only enter the sitemap after each page has complete metadata, canonical, SSR instruction, official/source language, original practice, explained answers and internal links.

## 6. TOEFL Reading

### Hubs

| Route | Status | Notes |
| --- | --- | --- |
| `/practica/toefl/reading` | live | Reading hub |
| `/practica/toefl/reading/tipos-de-preguntas` | live | Legacy/skill-oriented question type hub |
| `/practica/toefl/reading/formato-2026` | live | Current official task structure hub |
| `/practica/toefl/reading/habilidades` | live | Cross-task WeLearn reading skills, not official ETS task families |

### Current official TOEFL Reading task routes

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/toefl/reading/formato-2026/complete-the-words` | live | Complete the Words |
| `/practica/toefl/reading/formato-2026/read-in-daily-life` | live | Read in Daily Life |
| `/practica/toefl/reading/formato-2026/read-an-academic-passage` | live | Read an Academic Passage |

Note: `/practica/toefl/reading/tipos-de-preguntas/*` routes are compatible skill practice. They support the current TOEFL Reading branch but are not the primary official-format index.

### Existing skill/question routes

| Route | Status | Classification |
| --- | --- | --- |
| `/practica/toefl/reading/tipos-de-preguntas/vocabulary` | live | Compatible skill |
| `/practica/toefl/reading/tipos-de-preguntas/inference` | live | Compatible skill |
| `/practica/toefl/reading/tipos-de-preguntas/factual-information` | live | Compatible skill |
| `/practica/toefl/reading/tipos-de-preguntas/rhetorical-purpose` | live | Compatible skill |
| `/practica/toefl/reading/tipos-de-preguntas/sentence-simplification` | live | Legacy-compatible skill |
| `/practica/toefl/reading/habilidades/logical-relationships` | live | WeLearn skill, source: `Syllogism .pages` |
| `/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto` | live | Complementary WeLearn word-choice bank; not the official Complete the Words interaction |
| `/practica/toefl/reading/habilidades/text-organisation` | live | WeLearn skill |
| `/practica/toefl/reading/habilidades/time-management` | live | WeLearn skill |

## 7. TOEFL Listening

### Current-format hub

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/toefl/listening` | live | Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement and Listen to an Academic Talk |

Note: the hub links to the 20 fixed WeLearn mocks and states visibly that the official Reading and Listening sections are adaptive while WeLearn's mocks are not. Do not create thin child routes until each task has enough original audio practice to justify a separate searchable page.

## 8. TOEFL Writing

### Hubs and current tasks

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/toefl/writing` | live | Writing hub |
| `/practica/toefl/writing/build-a-sentence` | live | Build a Sentence |
| `/practica/toefl/writing/write-an-email` | live | Write an Email |
| `/practica/toefl/writing/academic-discussion` | live | Write for an Academic Discussion |

### Legacy/general synthesis

| Route | Status | Treatment |
| --- | --- | --- |
| `/practica/toefl/writing/integrated-writing` | live | Legacy/general synthesis, not current TOEFL iBT Writing priority |

### Future writing support routes

| Route | Status |
| --- | --- |
| `/practica/toefl/writing/model-answers` | live |
| `/practica/toefl/writing/rubrica` | live |
| `/practica/toefl/writing/grammar-for-writing` | live |
| `/practica/toefl/writing/academic-discussion/banco-de-prompts` | live |
| `/practica/toefl/writing/write-an-email/banco-de-prompts` | live |

## 9. TOEFL Speaking

### Current-format hub

| Route | Status | Official mapping |
| --- | --- | --- |
| `/practica/toefl/speaking` | live | Listen and Repeat and Take an Interview |

Note: speaking recordings stay private inside the submission workflow. The indexable hub explains the task families but never exposes a candidate recording or result.

## 10. Redirect/canonical notes

- Uppercase variants such as `/practica/IELTS` and `/practica/TOEFL` should redirect to lowercase if they can be reached externally.
- Do not canonicalize skill pages to question-type pages; link them as supporting resources.
- Do not canonicalize legacy TOEFL pages to current TOEFL pages; keep them explicit or noindex if they become thin.
