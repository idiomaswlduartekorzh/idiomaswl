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

| Route | Status |
| --- | --- |
| `/practica/ielts/academic/writing/task2/tipo-ensayo` | live |
| `/practica/ielts/academic/writing/task2/introduccion` | live |
| `/practica/ielts/academic/writing/task2/parrafos-cuerpo` | live |
| `/practica/ielts/academic/writing/task2/linking-language` | live |
| `/practica/ielts/academic/writing/task2/conclusion` | live |
| `/practica/ielts/academic/writing/task2/tarea-completa` | live |
| `/practica/ielts/academic/writing/task2/opinion` | live |
| `/practica/ielts/academic/writing/task2/discussion` | live |
| `/practica/ielts/academic/writing/task2/advantages-disadvantages` | live |
| `/practica/ielts/academic/writing/task2/problem-solution` | live |
| `/practica/ielts/academic/writing/task2/direct-question` | live |
| `/practica/ielts/academic/writing/task2/model-answers` | live |

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
| `/practica/toefl/reading/habilidades/text-organisation` | live | WeLearn skill |
| `/practica/toefl/reading/habilidades/time-management` | live | WeLearn skill |

## 7. TOEFL Writing

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

## 8. Redirect/canonical notes

- Uppercase variants such as `/practica/IELTS` and `/practica/TOEFL` should redirect to lowercase if they can be reached externally.
- Do not canonicalize skill pages to question-type pages; link them as supporting resources.
- Do not canonicalize legacy TOEFL pages to current TOEFL pages; keep them explicit or noindex if they become thin.
