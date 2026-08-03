# Registro de sesiones — Claude Code

Log automático (hook `SessionEnd` en `.claude/settings.json`). Cada entrada se agrega sola al terminar una sesión de Claude Code en este repo: fecha, ID de sesión y archivos modificados (`git diff HEAD --stat`) en ese momento.

No editar a mano — es un registro append-only generado por el hook. Para el historial real de qué cambió y por qué, usar `git log`.

## 2026-07-19 12:57:13 — sesión 32697aee-7cd9-4bef-9834-368168c4ba12

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   1 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   2 +
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   2 +
 scripts/check-exam-practice-content.mjs            |  94 +++++++++---
 .../ielts/academic/writing/task1/Content.tsx       |  82 ++++++++--
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 166 +++++++++++++++------
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 ++++++++--
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +++-
 .../academic/writing/task1/overview/Content.tsx    |  64 ++++----
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +--
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../writing/task1/tarea-completa/Content.tsx       |   2 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  10 +-
 .../academic/writing/task1/vocabulario/Content.tsx |   2 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 ++------------
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 22 files changed, 466 insertions(+), 249 deletions(-)
```

## 2026-07-19 18:17:05 — sesión 7d2d4430-2621-41a5-b16e-00eaeadbf9eb

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   1 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   2 +
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   2 +
 scripts/check-exam-practice-content.mjs            |  94 +++++++++---
 .../ielts/academic/writing/task1/Content.tsx       |  82 ++++++++--
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 166 +++++++++++++++------
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 ++++++++--
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +++-
 .../academic/writing/task1/overview/Content.tsx    |  64 ++++----
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +--
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../writing/task1/tarea-completa/Content.tsx       |   2 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  10 +-
 .../academic/writing/task1/vocabulario/Content.tsx |   2 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 ++------------
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 22 files changed, 466 insertions(+), 249 deletions(-)
```

## 2026-07-19 22:38:35 — sesión 4c4d0608-8264-49e7-8867-619c8077afb1

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   1 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   2 +
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   2 +
 scripts/check-exam-practice-content.mjs            |  94 +++++++++---
 .../ielts/academic/writing/task1/Content.tsx       |  82 ++++++++--
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 166 +++++++++++++++------
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 ++++++++--
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +++-
 .../academic/writing/task1/overview/Content.tsx    |  64 ++++----
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +--
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../writing/task1/tarea-completa/Content.tsx       |   2 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  10 +-
 .../academic/writing/task1/vocabulario/Content.tsx |   2 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 ++------------
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 23 files changed, 471 insertions(+), 252 deletions(-)
```

## 2026-07-20 12:00:05 — sesión d041f97e-8585-4332-980f-61ddf244c298

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   1 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   2 +
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   2 +
 scripts/check-exam-practice-content.mjs            |  94 +++++++++---
 .../ielts/academic/writing/task1/Content.tsx       |  82 ++++++++--
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 166 +++++++++++++++------
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 ++++++++--
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +++-
 .../academic/writing/task1/overview/Content.tsx    |  64 ++++----
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +--
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../writing/task1/tarea-completa/Content.tsx       |   2 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  10 +-
 .../academic/writing/task1/vocabulario/Content.tsx |   2 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 ++------------
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 23 files changed, 471 insertions(+), 252 deletions(-)
```

## 2026-07-23 17:56:19 — sesión a29fffd4-87c2-4ce0-99b8-2980ecd77e84

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 167 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  |  43 +-
 src/data/mocks/index.ts                            |  70 ++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/types.ts                            |  58 +-
 42 files changed, 1869 insertions(+), 2389 deletions(-)
```

## 2026-07-23 18:25:25 — sesión 3fb0cb34-d71b-4a22-9cf1-4b7210578dfd

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 167 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  |  59 +-
 src/data/mocks/index.ts                            |  98 +++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/types.ts                            |  58 +-
 42 files changed, 1912 insertions(+), 2390 deletions(-)
```

## 2026-07-23 21:59:25 — sesión 9f576d81-65d0-4904-ae2c-7f886c733ed2

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 167 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 122 ++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |   6 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  10 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  12 +-
 src/data/grammar/ingles/a1/going-to.ts             |   8 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  20 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |   4 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  26 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 .../ingles/a1/present-simple-affirmative.ts        |  10 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |   2 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |   4 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |   6 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/verb-to-be.ts           |   8 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  16 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  22 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  16 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |   6 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  25 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  39 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |   6 +-
 src/data/grammar/italiano/a1/negazione.ts          |  19 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  23 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  39 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  32 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  10 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 197 +++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |   2 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |   6 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |   6 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  12 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |   6 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  12 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |   2 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |   2 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  19 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  12 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  10 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  12 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |   2 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |   4 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |   6 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  10 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |   8 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  10 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |   2 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |   6 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |   2 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 208 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/types.ts                            |  58 +-
 387 files changed, 4261 insertions(+), 4253 deletions(-)
```

## 2026-07-24 07:54:15 — sesión deeecfb2-4bdc-4eab-8aaf-cdd6e9865006

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 173 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |   6 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  10 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  12 +-
 src/data/grammar/ingles/a1/going-to.ts             |   8 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  20 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |   4 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  26 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  16 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 394 files changed, 5617 insertions(+), 4485 deletions(-)
```

## 2026-07-24 07:54:55 — sesión 076891ab-e571-4a2f-a528-1488a3d91bd3

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 173 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |   6 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  10 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  12 +-
 src/data/grammar/ingles/a1/going-to.ts             |   8 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  20 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |   4 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  26 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  16 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 394 files changed, 5617 insertions(+), 4485 deletions(-)
```

## 2026-07-24 08:04:45 — sesión c4f5baa6-1d58-4e05-b9f8-506f8c540bbd

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 173 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |  33 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  10 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  30 +-
 src/data/grammar/ingles/a1/going-to.ts             |   8 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  20 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |  22 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  44 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 src/data/grammar/ingles/a1/present-continuous.ts   |  18 +
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  16 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 395 files changed, 5715 insertions(+), 4486 deletions(-)
```

## 2026-07-24 08:34:20 — sesión 535cf9ba-d123-48ab-a79e-2e2d923efbb8

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 177 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |  33 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  28 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  30 +-
 src/data/grammar/ingles/a1/going-to.ts             |  26 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  50 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |  22 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  44 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 src/data/grammar/ingles/a1/present-continuous.ts   |  18 +
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/there-is-there-are.ts   |  18 +
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  34 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 396 files changed, 5818 insertions(+), 4489 deletions(-)
```

## 2026-07-24 08:41:58 — sesión b239f7a4-35f2-4897-9f94-fcde7e59a902

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 package.json                                       |   3 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 177 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |  33 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  28 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  30 +-
 src/data/grammar/ingles/a1/going-to.ts             |  26 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  50 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |  22 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  44 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 src/data/grammar/ingles/a1/present-continuous.ts   |  18 +
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/there-is-there-are.ts   |  18 +
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  34 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 396 files changed, 5818 insertions(+), 4489 deletions(-)
```

## 2026-07-24 08:45:35 — sesión f0818806-9f42-45d7-aa03-9f5945fa7370

```
 docs/OPERACION-REPOSITORIO.md                      |   4 +
 docs/ielts-toefl-audit.md                          |   2 +
 docs/ielts-toefl-content-inventory.json            |   5 +-
 docs/ielts-toefl-keyword-map.csv                   |   6 +-
 docs/ielts-toefl-migration-plan.md                 |   2 +
 docs/ielts-toefl-route-map.md                      |   6 +-
 next.config.ts                                     |  11 +
 package.json                                       |  10 +-
 public/audio/cambridge-b2/set-1-listening.mp3      | Bin 8045973 -> 0 bytes
 scripts/check-exam-practice-content.mjs            | 197 ++++-
 .../practica/[mockId]/IELTSPracticeClient.tsx      | 129 +---
 .../practica/[mockId]/LanguagePracticeClient.tsx   | 177 +++--
 .../practica/[mockId]/TOEFLPracticeClient.tsx      |  56 +-
 .../examenes/[exam]/practica/[mockId]/page.tsx     |  17 +-
 src/app/(site)/home/HomeAnimations.tsx             |  61 +-
 src/app/(site)/home/page.tsx                       |   5 +-
 .../ielts/academic/writing/task1/Content.tsx       | 178 ++++-
 .../writing/task1/Task1OfficialReviewBlock.tsx     |   3 +-
 .../comparaciones/ComparisonPracticeEngine.tsx     | 204 +++--
 .../task1/comparaciones/ComparisonsEnglish.tsx     |  79 +-
 .../academic/writing/task1/comparaciones/page.tsx  |   2 +-
 .../writing/task1/introduccion/Content.tsx         |  10 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |  31 +-
 .../ielts/academic/writing/task1/mapas/page.tsx    |   2 +-
 .../academic/writing/task1/overview/Content.tsx    |  64 +-
 .../task1/overview/OverviewPracticeEngine.tsx      |  20 +-
 .../ielts/academic/writing/task1/overview/page.tsx |   6 +-
 .../practica/ielts/academic/writing/task1/page.tsx |  15 +-
 .../academic/writing/task1/procesos/Content.tsx    |  15 +-
 .../ielts/academic/writing/task1/procesos/page.tsx |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       | 552 +++++---------
 .../academic/writing/task1/tarea-completa/page.tsx |  14 +-
 .../academic/writing/task1/tendencias/Content.tsx  |  16 +-
 .../academic/writing/task1/vocabulario/Content.tsx |  47 +-
 .../academic/writing/task1/vocabulario/page.tsx    |   8 +-
 src/app/(site)/practica/ingles/b1/escucha/page.tsx | 110 +--
 src/app/(site)/practica/ingles/b1/page.tsx         |   4 +-
 src/app/sitemap.ts                                 |   2 +-
 src/components/grammar/GrammarTopicClient.tsx      |  60 +-
 src/components/practica/ListeningJourney.tsx       |   8 +-
 src/data/exams.ts                                  | 125 +++-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |  12 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |   8 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |  26 +-
 src/data/grammar/aleman/a1/imperativ.ts            |  48 +-
 src/data/grammar/aleman/a1/modalverben.ts          |  24 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |  48 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |   2 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |  34 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |  14 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |  16 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |  42 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |  16 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |   2 +-
 src/data/grammar/aleman/a1/verneinung.ts           |  12 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |  24 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |  28 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   2 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |   2 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   2 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |   2 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |   2 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |  35 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |   2 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |   4 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |  30 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |  32 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |  10 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |  12 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |  34 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |  28 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |  30 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |  14 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |  12 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |  16 +-
 src/data/grammar/coreano/a1/negacion.ts            |  28 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |  32 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |  34 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |  30 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |  34 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |  34 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   4 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |  32 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |   2 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |  38 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |  32 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   2 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   2 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |   2 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |  32 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   2 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |  32 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |  32 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |  34 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   2 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   4 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   2 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |  34 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |  36 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   4 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |  34 +-
 .../grammar/coreano/b1/alternativa-geona-b1.ts     |   2 +-
 .../grammar/coreano/b1/causal-gi-ttaemune-b1.ts    |   2 +-
 .../grammar/coreano/b1/causativa-shichang-b1.ts    |   2 +-
 .../coreano/b1/condicional-erado-eurely-b1.ts      |   6 +-
 src/data/grammar/coreano/b1/despues-gona-seo-b1.ts |   2 +-
 .../grammar/coreano/b1/estado-mantener-chae-b1.ts  |   4 +-
 .../coreano/b1/forzosidad-subakkeneopsda-b1.ts     |   2 +-
 src/data/grammar/coreano/b1/futuro-intencion-b1.ts |   2 +-
 src/data/grammar/coreano/b1/inmediato-jamaja-b1.ts |   2 +-
 .../grammar/coreano/b1/obligacion-eoyahada-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/observacion-neyo-b1.ts |   2 +-
 src/data/grammar/coreano/b1/oportunidad-gime-b1.ts |   2 +-
 src/data/grammar/coreano/b1/pasiva-jeosudo-b1.ts   |   2 +-
 .../grammar/coreano/b1/posibilidad-su-itda-b1.ts   |   2 +-
 .../grammar/coreano/b1/proporcion-euttorok-b1.ts   |   2 +-
 src/data/grammar/coreano/b1/proposito-dorok-b1.ts  |   2 +-
 .../grammar/coreano/b1/simultaneo-eumyeonseo-b1.ts |   2 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |  32 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |  28 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |   6 +-
 src/data/grammar/frances/a1/futur-proche.ts        |   8 +-
 src/data/grammar/frances/a1/imperatif.ts           |  10 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |  30 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |  26 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |  34 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |  26 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |  28 +-
 src/data/grammar/frances/a1/questions.ts           |  34 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |  38 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   4 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   4 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   2 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   2 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   4 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   4 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   4 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   2 +-
 src/data/grammar/frances/a2/gerondif.ts            |   6 +-
 src/data/grammar/frances/a2/imparfait.ts           |   2 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   4 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   4 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   2 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   2 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   4 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   4 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   4 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   4 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   4 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   4 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |   2 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |   2 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |   2 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |   2 +-
 src/data/grammar/ingles/a1/adjectives-basic.ts     |   2 +-
 src/data/grammar/ingles/a1/adverbs-frequency.ts    |   6 +-
 src/data/grammar/ingles/a1/articles.ts             |  33 +-
 src/data/grammar/ingles/a1/can-ability.ts          |  28 +-
 .../grammar/ingles/a1/countable-uncountable.ts     |  12 +-
 src/data/grammar/ingles/a1/demonstratives.ts       |  30 +-
 src/data/grammar/ingles/a1/going-to.ts             |  26 +-
 src/data/grammar/ingles/a1/have-got.ts             |  16 +-
 src/data/grammar/ingles/a1/imperative.ts           |   8 +-
 src/data/grammar/ingles/a1/like-ing.ts             |   4 +-
 src/data/grammar/ingles/a1/object-pronouns.ts      |  50 +-
 src/data/grammar/ingles/a1/plural-nouns.ts         |  22 +-
 .../grammar/ingles/a1/possessive-adjectives.ts     |  44 +-
 src/data/grammar/ingles/a1/possessive-s.ts         |  66 +-
 src/data/grammar/ingles/a1/prepositions-time.ts    |   8 +-
 src/data/grammar/ingles/a1/present-continuous.ts   |  18 +
 .../ingles/a1/present-simple-affirmative.ts        |  28 +-
 .../grammar/ingles/a1/present-simple-negative.ts   |  20 +-
 .../grammar/ingles/a1/present-simple-questions.ts  |  22 +-
 src/data/grammar/ingles/a1/subject-pronouns.ts     |  24 +-
 src/data/grammar/ingles/a1/telling-time.ts         |   6 +-
 src/data/grammar/ingles/a1/there-is-there-are.ts   |  18 +
 src/data/grammar/ingles/a1/verb-to-be.ts           |  26 +-
 src/data/grammar/ingles/a1/wh-questions.ts         |  34 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   2 +-
 src/data/grammar/ingles/a2/first-conditional.ts    |   6 +-
 src/data/grammar/ingles/a2/have-to-must.ts         |   4 +-
 .../grammar/ingles/a2/past-simple-questions.ts     |  24 +-
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   2 +-
 .../grammar/ingles/a2/present-perfect-basic.ts     |   6 +-
 .../ingles/a2/present-perfect-ever-never.ts        |  20 +-
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  16 +-
 src/data/grammar/ingles/a2/should-advice.ts        |  12 +-
 src/data/grammar/ingles/a2/superlatives.ts         |   2 +-
 src/data/grammar/ingles/a2/will-future.ts          |  24 +-
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  10 +-
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   2 +-
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   4 +-
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   8 +-
 .../ingles/b1/present-perfect-continuous-b1.ts     |   2 +-
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   2 +-
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   6 +-
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   2 +-
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   8 +-
 .../grammar/italiano/a1/aggettivi-possessivi.ts    |  52 +-
 .../grammar/italiano/a1/aggettivi-qualificativi.ts |  52 +-
 src/data/grammar/italiano/a1/articoli.ts           |  59 +-
 src/data/grammar/italiano/a1/avverbi-frequenza.ts  |  39 +-
 src/data/grammar/italiano/a1/ce-ci-sono.ts         |  53 +-
 .../grammar/italiano/a1/domande-interrogativi.ts   |  71 +-
 src/data/grammar/italiano/a1/genere-numero.ts      |  50 +-
 src/data/grammar/italiano/a1/imperativo.ts         |  37 +-
 src/data/grammar/italiano/a1/negazione.ts          |  49 +-
 .../grammar/italiano/a1/preposizioni-articolate.ts |  64 +-
 .../grammar/italiano/a1/preposizioni-semplici.ts   |  74 +-
 src/data/grammar/italiano/a1/presente-verbi-are.ts |  72 +-
 .../grammar/italiano/a1/presente-verbi-ere-ire.ts  |  66 +-
 src/data/grammar/italiano/a1/pronomi-soggetto.ts   |  60 +-
 src/data/grammar/italiano/a1/stare-gerundio.ts     |  43 +-
 src/data/grammar/italiano/a1/verbi-irregolari.ts   | 213 ++++--
 src/data/grammar/italiano/a1/verbo-avere.ts        |  56 +-
 src/data/grammar/italiano/a1/verbo-essere.ts       |  67 +-
 .../italiano/a2/avverbi-frequenza-modo-a2.ts       |  44 +-
 .../grammar/italiano/a2/ci-vuole-vogliono-a2.ts    |  33 +-
 src/data/grammar/italiano/a2/comparativi-a2.ts     |  57 +-
 .../italiano/a2/condizionale-presente-a2.ts        |  61 +-
 .../grammar/italiano/a2/congiunzioni-logiche-a2.ts |  38 +-
 src/data/grammar/italiano/a2/da-presente-a2.ts     |  42 +-
 src/data/grammar/italiano/a2/forma-cortesia-a2.ts  |  33 +-
 .../grammar/italiano/a2/futuro-probabilita-a2.ts   |  38 +-
 src/data/grammar/italiano/a2/futuro-semplice-a2.ts |  67 +-
 src/data/grammar/italiano/a2/imperfetto-a2.ts      |  57 +-
 .../italiano/a2/passato-prossimo-avere-a2.ts       |  60 +-
 .../italiano/a2/passato-prossimo-essere-a2.ts      |  61 +-
 .../italiano/a2/periodo-ipotetico-reale-a2.ts      |  31 +-
 .../grammar/italiano/a2/piacere-verbi-simili-a2.ts |  45 +-
 src/data/grammar/italiano/a2/pronomi-diretti-a2.ts |  48 +-
 .../grammar/italiano/a2/pronomi-indiretti-a2.ts    |  44 +-
 .../grammar/italiano/a2/pronomi-relativi-a2.ts     |  48 +-
 src/data/grammar/italiano/a2/stare-per-a2.ts       |  51 +-
 .../grammar/italiano/a2/trapassato-prossimo-a2.ts  |  28 +-
 .../grammar/italiano/a2/verbi-riflessivi-a2.ts     |  50 +-
 .../grammar/italiano/b1/condizionale-passato-b1.ts |  32 +-
 .../grammar/italiano/b1/congiuntivo-passato-b1.ts  |  18 +
 .../grammar/italiano/b1/congiuntivo-presente-b1.ts |  32 +-
 .../grammar/italiano/b1/futuro-anteriore-b1.ts     |  30 +-
 .../grammar/italiano/b1/periodo-ipotetico-b1.ts    |  39 +-
 .../grammar/italiano/b1/trapassato-prossimo-b1.ts  |  30 +-
 .../grammar/japones/a1/adverbios-frecuencia.ts     |  12 +-
 src/data/grammar/japones/a1/arimasu-imasu.ts       |  22 +-
 src/data/grammar/japones/a1/conjunciones.ts        |   6 +-
 src/data/grammar/japones/a1/desu-masu.ts           |  10 +-
 .../japones/a1/estructura-sov-particulas.ts        |   4 +-
 .../grammar/japones/a1/expresiones-cotidianas.ts   |   8 +-
 src/data/grammar/japones/a1/hiragana-basico.ts     |  24 +-
 src/data/grammar/japones/a1/i-keiyoshi.ts          |   6 +-
 src/data/grammar/japones/a1/interrogativos-ka.ts   |   8 +-
 src/data/grammar/japones/a1/jikan-tiempo.ts        |  16 +-
 src/data/grammar/japones/a1/katakana-basico.ts     |   8 +-
 .../grammar/japones/a1/masu-kei-conjugacion.ts     |   8 +-
 src/data/grammar/japones/a1/na-keiyoshi.ts         |   6 +-
 src/data/grammar/japones/a1/negacion-completa.ts   |   8 +-
 src/data/grammar/japones/a1/numeros-contadores.ts  |   6 +-
 src/data/grammar/japones/a1/particula-de-e.ts      |   8 +-
 src/data/grammar/japones/a1/particula-wa-ga.ts     |   8 +-
 src/data/grammar/japones/a1/particula-wo-ni.ts     |   4 +-
 src/data/grammar/japones/a1/tai-form.ts            |  16 +-
 src/data/grammar/japones/a1/te-form-permission.ts  |  26 +-
 .../grammar/japones/a2/ageru-morau-kureru-a2.ts    |   4 +-
 .../grammar/japones/a2/dake-shika-bakari-a2.ts     |   4 +-
 src/data/grammar/japones/a2/deshou-a2.ts           |   4 +-
 src/data/grammar/japones/a2/hikaku-a2.ts           |   4 +-
 src/data/grammar/japones/a2/kamoshirenai-a2.ts     |  12 +-
 src/data/grammar/japones/a2/kanoukei-a2.ts         |  10 +-
 src/data/grammar/japones/a2/mae-ni-ato-de-a2.ts    |   4 +-
 src/data/grammar/japones/a2/n-desu-a2.ts           |   6 +-
 src/data/grammar/japones/a2/nagara-a2.ts           |   4 +-
 src/data/grammar/japones/a2/nakereba-naranai-a2.ts |   8 +-
 .../grammar/japones/a2/noun-modification-a2.ts     |   2 +-
 src/data/grammar/japones/a2/ta-koto-ga-aru-a2.ts   |  10 +-
 src/data/grammar/japones/a2/tara-condicional-a2.ts |   2 +-
 src/data/grammar/japones/a2/tari-tari-a2.ts        |   8 +-
 src/data/grammar/japones/a2/te-form-sequence-a2.ts |   8 +-
 src/data/grammar/japones/a2/te-iru-a2.ts           |   8 +-
 src/data/grammar/japones/a2/te-mo-ii-a2.ts         |   6 +-
 src/data/grammar/japones/a2/to-condicional-a2.ts   |   4 +-
 src/data/grammar/japones/a2/to-omoimasu-a2.ts      |  12 +-
 src/data/grammar/japones/a2/ukemi-a2.ts            |  12 +-
 src/data/grammar/japones/b1/bakari-b1.ts           |   2 +-
 src/data/grammar/japones/b1/beki-b1.ts             |   2 +-
 src/data/grammar/japones/b1/hazu-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/hodo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/kamo-b1.ts             |   2 +-
 src/data/grammar/japones/b1/monokara-b1.ts         |   2 +-
 src/data/grammar/japones/b1/nakerebanaranai-b1.ts  |   2 +-
 src/data/grammar/japones/b1/ni-chigainai-b1.ts     |   2 +-
 src/data/grammar/japones/b1/noni-b1.ts             |   2 +-
 src/data/grammar/japones/b1/sou-b1.ts              |   2 +-
 src/data/grammar/japones/b1/tameni-b1.ts           |   2 +-
 src/data/grammar/japones/b1/te-shimau-b1.ts        |   2 +-
 src/data/grammar/japones/b1/tokoro-b1.ts           |   2 +-
 src/data/grammar/japones/b1/toutsutsuaru-b1.ts     |   2 +-
 src/data/grammar/japones/b1/wake-da-b1.ts          |   2 +-
 src/data/grammar/japones/b1/yooni-b1.ts            |   2 +-
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |  22 +-
 .../portugues/a1/adjetivos-qualificativos.ts       |  18 +-
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   4 +-
 src/data/grammar/portugues/a1/artigos.ts           |  14 +-
 src/data/grammar/portugues/a1/contracoes.ts        |   8 +-
 src/data/grammar/portugues/a1/estar-gerundio.ts    |  10 +-
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |  12 +-
 src/data/grammar/portugues/a1/ir-futuro.ts         |  12 +-
 src/data/grammar/portugues/a1/negacao.ts           |  24 +-
 .../portugues/a1/perguntas-interrogativas.ts       |  30 +-
 .../grammar/portugues/a1/plural-substantivos.ts    |   6 +-
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   6 +-
 .../grammar/portugues/a1/presente-verbos-ar.ts     |  18 +-
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |  18 +-
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |  32 +-
 src/data/grammar/portugues/a1/ser-e-estar.ts       |  22 +-
 src/data/grammar/portugues/a1/verbo-ter.ts         |  22 +-
 .../grammar/portugues/a1/verbos-irregulares.ts     |   8 +-
 .../portugues/a2/comparativos-superlativos-a2.ts   |  10 +-
 src/data/grammar/portugues/a2/condicional-a2.ts    |   4 +-
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   6 +-
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   2 +-
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   2 +-
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   2 +-
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |  10 +-
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   4 +-
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   4 +-
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   2 +-
 .../portugues/a2/preterito-imperfeito-a2.ts        |   8 +-
 .../a2/preterito-perfeito-irregular-a2.ts          |  12 +-
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   4 +-
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   4 +-
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   4 +-
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   2 +-
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   4 +-
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   2 +-
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   8 +-
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   2 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |   2 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |   2 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |   2 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |   2 +-
 src/data/grammar/ruso/a1/adjetivos-concordancia.ts |  12 +-
 src/data/grammar/ruso/a1/adjetivos-posesivos.ts    |  10 +-
 src/data/grammar/ruso/a1/alfabeto-cirilico.ts      |  24 +-
 src/data/grammar/ruso/a1/caso-acusativo.ts         |   2 +-
 src/data/grammar/ruso/a1/caso-dativo-basico.ts     |   8 +-
 src/data/grammar/ruso/a1/caso-genitivo.ts          |  10 +-
 src/data/grammar/ruso/a1/caso-nominativo.ts        |   6 +-
 src/data/grammar/ruso/a1/futuro-byt.ts             |   8 +-
 src/data/grammar/ruso/a1/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a1/numeros.ts                |   2 +-
 src/data/grammar/ruso/a1/preguntas-vopros.ts       |  18 +-
 .../grammar/ruso/a1/preposiciones-direccion.ts     |   8 +-
 .../grammar/ruso/a1/preposiciones-lugar-v-na.ts    |  16 +-
 src/data/grammar/ruso/a1/tiempo-expresiones.ts     |   6 +-
 .../grammar/ruso/a1/verbos-irregulares-basicos.ts  |   8 +-
 src/data/grammar/ruso/a1/verbos-movimiento.ts      |   6 +-
 src/data/grammar/ruso/a2/acusativo-movimiento.ts   |   4 +-
 src/data/grammar/ruso/a2/adverbios-tiempo.ts       |   2 +-
 src/data/grammar/ruso/a2/aspecto-verbal.ts         |   4 +-
 src/data/grammar/ruso/a2/comparativos.ts           |   8 +-
 src/data/grammar/ruso/a2/condicional.ts            |   2 +-
 src/data/grammar/ruso/a2/futuro-imperfectivo.ts    |   2 +-
 src/data/grammar/ruso/a2/futuro-perfectivo.ts      |   2 +-
 src/data/grammar/ruso/a2/genitivo-cantidad.ts      |   2 +-
 src/data/grammar/ruso/a2/imperativo.ts             |   2 +-
 src/data/grammar/ruso/a2/oraciones-subordinadas.ts |   2 +-
 src/data/grammar/ruso/a2/plurales-irregulares.ts   |   2 +-
 src/data/grammar/ruso/a2/prepositivo-avanzado.ts   |   4 +-
 src/data/grammar/ruso/a2/pronombres-reflexivos.ts  |   4 +-
 src/data/grammar/ruso/a2/pronombres-relativos.ts   |   2 +-
 src/data/grammar/ruso/a2/superlativos.ts           |   4 +-
 src/data/grammar/ruso/a2/verbos-movimiento.ts      |   4 +-
 src/data/grammar/ruso/a2/verbos-prefijados.ts      |   2 +-
 .../ruso/b1/adverbios-circunstanciales-b1.ts       |   2 +-
 .../ruso/b1/aspecto-perfectivo-imperfectivo-b1.ts  |   2 +-
 .../ruso/b1/comparativos-superlativos-b1.ts        |   2 +-
 .../grammar/ruso/b1/condicional-subjuntivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/dativo-b1.ts              |   2 +-
 .../grammar/ruso/b1/diminutivos-aumentativos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/discurso-indirecto-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/futuro-perfectivo-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/genitivo-negacion-b1.ts   |   2 +-
 .../grammar/ruso/b1/impersonales-modales-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/instrumental-b1.ts        |   2 +-
 .../grammar/ruso/b1/oraciones-subordinadas-b1.ts   |   2 +-
 src/data/grammar/ruso/b1/participios-activos-b1.ts |   2 +-
 .../grammar/ruso/b1/participios-adjetivales-b1.ts  |   2 +-
 src/data/grammar/ruso/b1/participios-pasivos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/prefijos-verbos-b1.ts     |   2 +-
 src/data/grammar/ruso/b1/preposiciones-casos-b1.ts |   2 +-
 src/data/grammar/ruso/b1/verbos-reflexivos-b1.ts   |   2 +-
 src/data/mocks/index.ts                            | 214 ++++++
 src/data/mocks/toefl-set-1.ts                      | 814 ++++----------------
 src/data/mocks/toefl-set-2.ts                      | 830 ++++-----------------
 src/data/mocks/toefl-set-3.ts                      | 230 ++++--
 src/data/mocks/toefl-set-4.ts                      | 230 ++++--
 src/data/mocks/topik-set-1.ts                      | 142 ++--
 src/data/mocks/types.ts                            |  58 +-
 src/styles/grammar.css                             |   2 +-
 399 files changed, 5872 insertions(+), 4519 deletions(-)
```

## 2026-07-24 10:03:05 — sesión b6254a85-809e-450f-9668-ad1253a07104

```
 docs/REGISTRO-DE-SESIONES.md                           |  4 ++++
 docs/gramatica-enriquecimiento-progreso.md             |  4 ++--
 src/data/grammar/ingles/a2/adverbs-manner.ts           | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/comparatives.ts             | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/connectors.ts               | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/first-conditional.ts        | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/have-to-must.ts             | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/past-simple-be.ts           | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/past-simple-irregular.ts    | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/past-simple-questions.ts    | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/past-simple-regular.ts      | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/prepositions-movement.ts    | 18 ++++++++++++++++++
 .../grammar/ingles/a2/present-continuous-future.ts     | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/present-perfect-basic.ts    | 18 ++++++++++++++++++
 .../grammar/ingles/a2/present-perfect-ever-never.ts    | 18 ++++++++++++++++++
 .../ingles/a2/present-perfect-vs-past-simple.ts        | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/quantifiers.ts              | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/relative-clauses.ts         | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/should-advice.ts            | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/superlatives.ts             | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/used-to.ts                  | 18 ++++++++++++++++++
 src/data/grammar/ingles/a2/will-future.ts              | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/gerunds-infinitives-b1.ts   | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/passive-voice-b1.ts         | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/past-continuous-b1.ts       | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/past-perfect-b1.ts          | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/phrasal-verbs-common-b1.ts  | 18 ++++++++++++++++++
 .../grammar/ingles/b1/present-perfect-continuous-b1.ts | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/reported-speech-b1.ts       | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/second-conditional-b1.ts    | 18 ++++++++++++++++++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts          | 18 ++++++++++++++++++
 31 files changed, 528 insertions(+), 2 deletions(-)
```

## 2026-07-24 16:41:35 — sesión 27364a5b-26e5-4a7f-a304-a3017e68afc2

```

## 2026-07-24 16:41:35 — sesión 3da24f56-7a8a-4555-af32-090cdf28908b

```
 docs/REGISTRO-DE-SESIONES.md                       | 45 ++++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |  6 +--
 src/data/grammar/ingles/a2/adverbs-manner.ts       | 18 +++++++++
 src/data/grammar/ingles/a2/comparatives.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/connectors.ts           | 18 +++++++++
 src/data/grammar/ingles/a2/first-conditional.ts    | 18 +++++++++
 src/data/grammar/ingles/a2/have-to-must.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/past-simple-be.ts       | 18 +++++++++
 .../grammar/ingles/a2/past-simple-irregular.ts     | 18 +++++++++
 .../grammar/ingles/a2/past-simple-questions.ts     | 18 +++++++++
 src/data/grammar/ingles/a2/past-simple-regular.ts  | 18 +++++++++
 .../grammar/ingles/a2/prepositions-movement.ts     | 18 +++++++++
 .../grammar/ingles/a2/present-continuous-future.ts | 18 +++++++++
 .../grammar/ingles/a2/present-perfect-basic.ts     | 18 +++++++++
 .../ingles/a2/present-perfect-ever-never.ts        | 18 +++++++++
 .../ingles/a2/present-perfect-vs-past-simple.ts    | 18 +++++++++
 src/data/grammar/ingles/a2/quantifiers.ts          | 18 +++++++++
 src/data/grammar/ingles/a2/relative-clauses.ts     | 18 +++++++++
 src/data/grammar/ingles/a2/should-advice.ts        | 18 +++++++++
 src/data/grammar/ingles/a2/superlatives.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/used-to.ts              | 18 +++++++++
 src/data/grammar/ingles/a2/will-future.ts          | 18 +++++++++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts | 18 +++++++++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  | 18 +++++++++
 src/data/grammar/ingles/b1/first-conditional-b1.ts | 18 +++++++++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   | 18 +++++++++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    | 18 +++++++++
 src/data/grammar/ingles/b1/linking-words-b1.ts     | 18 +++++++++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    | 18 +++++++++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   | 18 +++++++++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      | 18 +++++++++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   | 18 +++++++++
 .../ingles/b1/present-perfect-continuous-b1.ts     | 18 +++++++++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts | 18 +++++++++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       | 18 +++++++++
 src/data/grammar/ingles/b1/question-tags-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  | 18 +++++++++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   | 18 +++++++++
 .../grammar/ingles/b1/second-conditional-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      | 18 +++++++++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      | 18 +++++++++
 42 files changed, 768 insertions(+), 3 deletions(-)
 docs/REGISTRO-DE-SESIONES.md                       | 45 ++++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |  6 +--
 src/data/grammar/ingles/a2/adverbs-manner.ts       | 18 +++++++++
 src/data/grammar/ingles/a2/comparatives.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/connectors.ts           | 18 +++++++++
 src/data/grammar/ingles/a2/first-conditional.ts    | 18 +++++++++
 src/data/grammar/ingles/a2/have-to-must.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/past-simple-be.ts       | 18 +++++++++
 .../grammar/ingles/a2/past-simple-irregular.ts     | 18 +++++++++
 .../grammar/ingles/a2/past-simple-questions.ts     | 18 +++++++++
 src/data/grammar/ingles/a2/past-simple-regular.ts  | 18 +++++++++
 .../grammar/ingles/a2/prepositions-movement.ts     | 18 +++++++++
 .../grammar/ingles/a2/present-continuous-future.ts | 18 +++++++++
 .../grammar/ingles/a2/present-perfect-basic.ts     | 18 +++++++++
 .../ingles/a2/present-perfect-ever-never.ts        | 18 +++++++++
 .../ingles/a2/present-perfect-vs-past-simple.ts    | 18 +++++++++
 src/data/grammar/ingles/a2/quantifiers.ts          | 18 +++++++++
 src/data/grammar/ingles/a2/relative-clauses.ts     | 18 +++++++++
 src/data/grammar/ingles/a2/should-advice.ts        | 18 +++++++++
 src/data/grammar/ingles/a2/superlatives.ts         | 18 +++++++++
 src/data/grammar/ingles/a2/used-to.ts              | 18 +++++++++
 src/data/grammar/ingles/a2/will-future.ts          | 18 +++++++++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts | 18 +++++++++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  | 18 +++++++++
 src/data/grammar/ingles/b1/first-conditional-b1.ts | 18 +++++++++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   | 18 +++++++++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    | 18 +++++++++
 src/data/grammar/ingles/b1/linking-words-b1.ts     | 18 +++++++++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    | 18 +++++++++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   | 18 +++++++++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      | 18 +++++++++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   | 18 +++++++++
 .../ingles/b1/present-perfect-continuous-b1.ts     | 18 +++++++++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts | 18 +++++++++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       | 18 +++++++++
 src/data/grammar/ingles/b1/question-tags-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  | 18 +++++++++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   | 18 +++++++++
 .../grammar/ingles/b1/second-conditional-b1.ts     | 18 +++++++++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      | 18 +++++++++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      | 18 +++++++++
 42 files changed, 768 insertions(+), 3 deletions(-)
```
```


## 2026-07-24 16:41:35 — sesión 7c46b955-340d-425b-9a00-ca730d3c9779

```
## 2026-07-24 16:41:35 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 docs/REGISTRO-DE-SESIONES.md                       | 141 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +++
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +++
 src/data/grammar/ingles/a2/connectors.ts           |  18 +++
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +++
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +++
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +++
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +++
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +++
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +++
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +++
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +++
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +++
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +++
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +++
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +++
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +++
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +++
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +++
 src/data/grammar/ingles/a2/used-to.ts              |  18 +++
 src/data/grammar/ingles/a2/will-future.ts          |  18 +++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +++
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +++
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +++
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +++
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +++
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +++
 42 files changed, 864 insertions(+), 3 deletions(-)
```
 docs/REGISTRO-DE-SESIONES.md                       | 141 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +++
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +++
 src/data/grammar/ingles/a2/connectors.ts           |  18 +++
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +++
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +++
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +++
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +++
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +++
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +++
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +++
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +++
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +++
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +++
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +++
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +++
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +++
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +++
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +++
 src/data/grammar/ingles/a2/used-to.ts              |  18 +++
 src/data/grammar/ingles/a2/will-future.ts          |  18 +++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +++
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +++
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +++
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +++
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +++
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +++
 42 files changed, 864 insertions(+), 3 deletions(-)
```

## 2026-07-24 18:12:22 — sesión db24db18-608b-47e7-a3c7-687e06413e84

```
 docs/REGISTRO-DE-SESIONES.md                       | 233 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 ++
 src/data/grammar/ingles/a2/comparatives.ts         |  18 ++
 src/data/grammar/ingles/a2/connectors.ts           |  18 ++
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 ++
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 ++
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 ++
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 ++
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 ++
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 ++
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 ++
 .../grammar/ingles/a2/present-continuous-future.ts |  18 ++
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 ++
 .../ingles/a2/present-perfect-ever-never.ts        |  18 ++
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 ++
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 ++
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 ++
 src/data/grammar/ingles/a2/should-advice.ts        |  18 ++
 src/data/grammar/ingles/a2/superlatives.ts         |  18 ++
 src/data/grammar/ingles/a2/used-to.ts              |  18 ++
 src/data/grammar/ingles/a2/will-future.ts          |  18 ++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 ++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 ++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 ++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 ++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 ++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 ++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 ++
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 ++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 ++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 ++
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 ++
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 ++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 ++
 42 files changed, 956 insertions(+), 3 deletions(-)
```

## 2026-07-24 18:41:08 — sesión 27364a5b-26e5-4a7f-a304-a3017e68afc2

```
 docs/REGISTRO-DE-SESIONES.md                       | 281 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 ++
 src/data/grammar/ingles/a2/comparatives.ts         |  18 ++
 src/data/grammar/ingles/a2/connectors.ts           |  18 ++
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 ++
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 ++
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 ++
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 ++
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 ++
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 ++
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 ++
 .../grammar/ingles/a2/present-continuous-future.ts |  18 ++
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 ++
 .../ingles/a2/present-perfect-ever-never.ts        |  18 ++
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 ++
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 ++
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 ++
 src/data/grammar/ingles/a2/should-advice.ts        |  18 ++
 src/data/grammar/ingles/a2/superlatives.ts         |  18 ++
 src/data/grammar/ingles/a2/used-to.ts              |  18 ++
 src/data/grammar/ingles/a2/will-future.ts          |  18 ++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 ++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 ++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 ++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 ++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 ++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 ++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 ++
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 ++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 ++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 ++
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 ++
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 ++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 ++
 42 files changed, 1004 insertions(+), 3 deletions(-)
```

## 2026-07-24 19:26:56 — sesión 25216833-edb9-49c7-8a1e-b736300d90b0

```
 docs/REGISTRO-DE-SESIONES.md                       | 329 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 ++++++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 ++
 src/data/grammar/ingles/a2/comparatives.ts         |  18 ++
 src/data/grammar/ingles/a2/connectors.ts           |  18 ++
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 ++
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 ++
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 ++
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 ++
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 ++
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 ++
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 ++
 .../grammar/ingles/a2/present-continuous-future.ts |  18 ++
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 ++
 .../ingles/a2/present-perfect-ever-never.ts        |  18 ++
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 ++
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 ++
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 ++
 src/data/grammar/ingles/a2/should-advice.ts        |  18 ++
 src/data/grammar/ingles/a2/superlatives.ts         |  18 ++
 src/data/grammar/ingles/a2/used-to.ts              |  18 ++
 src/data/grammar/ingles/a2/will-future.ts          |  18 ++
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 ++
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 ++
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 ++
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 ++
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 ++
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 ++
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 ++
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 ++
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 ++
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 ++
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 ++
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 ++
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 ++
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 ++
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 ++
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 ++
 43 files changed, 1209 insertions(+), 3 deletions(-)
```

## 2026-07-24 19:42:02 — sesión 27364a5b-26e5-4a7f-a304-a3017e68afc2

```
 docs/REGISTRO-DE-SESIONES.md                       | 378 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 +++++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 43 files changed, 1258 insertions(+), 3 deletions(-)
```

## 2026-07-24 21:49:14 — sesión 964cb7ce-8d73-4b8e-95ef-88f1fbe31749

```
 docs/REGISTRO-DE-SESIONES.md                       | 427 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 ++++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 43 files changed, 1307 insertions(+), 3 deletions(-)
```

## 2026-07-24 22:06:55 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 docs/REGISTRO-DE-SESIONES.md                       | 476 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 +++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 43 files changed, 1356 insertions(+), 3 deletions(-)
```

## 2026-07-24 22:09:38 — sesión 545a2dee-bbe5-4df1-90d0-40c55317d817

```
 docs/REGISTRO-DE-SESIONES.md                       | 525 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 ++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 43 files changed, 1405 insertions(+), 3 deletions(-)
```

## 2026-07-24 22:24:35 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 docs/REGISTRO-DE-SESIONES.md                       | 574 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 src/app/globals.css                                | 157 ++++++
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 43 files changed, 1454 insertions(+), 3 deletions(-)
```

## 2026-07-25 22:21:32 — sesión ad91b314-2a5b-4514-85c4-8bb68e32a720

```
 .gitignore                                         |  14 +
 docs/REGISTRO-DE-SESIONES.md                       | 623 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 docs/ielts-toefl-audit.md                          |   9 +
 docs/ielts-toefl-content-inventory.json            |   2 +-
 docs/ielts-toefl-migration-plan.md                 |   1 +
 docs/ielts-toefl-route-map.md                      |  40 +-
 public/audio/cils/set-1.mp3                        | Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                | Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                | Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                | Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   | Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   | Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   | Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       | Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       | Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       | Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       | Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 | Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  | Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       | Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 | Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       | Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    | Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 | Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  | Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  | Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     | Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   | Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    | Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 | Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   | Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  | Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  | Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      | Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     | Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   | Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  | Bin 333741 -> 166893 bytes
 scripts/audit-ielts-routes.mjs                     |  14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   3 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx | 180 +-----
 .../ielts/academic/writing/task1/Content.tsx       |   1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |   5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |   4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |  18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |   4 +-
 .../writing/task1/introduccion/Content.tsx         | 430 +-------------
 .../Task1IntroductionPracticeEngine.tsx            |   2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |   6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |  10 +-
 .../academic/writing/task1/procesos/Content.tsx    |   4 -
 .../academic/writing/task1/tablas/Content.tsx      |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       |  22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |   4 +-
 src/app/globals.css                                | 157 ++++++
 src/components/exam-runner/primitives.tsx          |   3 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 src/data/mocks/ielts-set-10.ts                     | 345 +++++++++++-
 src/data/mocks/ielts-set-11.ts                     | 360 +++++++++++-
 src/data/mocks/ielts-set-12.ts                     | 372 +++++++++++-
 src/data/mocks/ielts-set-13.ts                     | 351 +++++++++++-
 src/data/mocks/ielts-set-14.ts                     | 347 +++++++++++-
 src/data/mocks/ielts-set-15.ts                     | 349 +++++++++++-
 src/data/mocks/ielts-set-16.ts                     | 363 +++++++++++-
 src/data/mocks/ielts-set-17.ts                     | 356 +++++++++++-
 src/data/mocks/ielts-set-18.ts                     | 359 +++++++++++-
 src/data/mocks/ielts-set-19.ts                     | 354 +++++++++++-
 src/data/mocks/ielts-set-20.ts                     | 358 +++++++++++-
 src/data/mocks/ielts-set-5.ts                      | 355 +++++++++++-
 src/data/mocks/ielts-set-6.ts                      | 363 +++++++++++-
 src/data/mocks/ielts-set-7.ts                      | 383 ++++++++++++-
 src/data/mocks/ielts-set-8.ts                      | 382 ++++++++++++-
 src/data/mocks/ielts-set-9.ts                      | 367 +++++++++++-
 112 files changed, 7324 insertions(+), 724 deletions(-)
```

## 2026-07-25 22:39:28 — sesión 27364a5b-26e5-4a7f-a304-a3017e68afc2

```
 .gitignore                                         |  14 +
 docs/REGISTRO-DE-SESIONES.md                       | 741 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 docs/ielts-toefl-audit.md                          |   9 +
 docs/ielts-toefl-content-inventory.json            |   2 +-
 docs/ielts-toefl-migration-plan.md                 |   1 +
 docs/ielts-toefl-route-map.md                      |  40 +-
 public/audio/cils/set-1.mp3                        | Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                | Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                | Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                | Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   | Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   | Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   | Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       | Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       | Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       | Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       | Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 | Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  | Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       | Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 | Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       | Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    | Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 | Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  | Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  | Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     | Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   | Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    | Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 | Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   | Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  | Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  | Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      | Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     | Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   | Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  | Bin 333741 -> 166893 bytes
 scripts/audit-ielts-routes.mjs                     |  14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   3 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx | 180 +----
 .../ielts/academic/writing/task1/Content.tsx       |   1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |   5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |   4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |  18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |   4 +-
 .../writing/task1/introduccion/Content.tsx         | 430 +-----------
 .../Task1IntroductionPracticeEngine.tsx            |   2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |   6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |  10 +-
 .../academic/writing/task1/procesos/Content.tsx    |   4 -
 .../academic/writing/task1/tablas/Content.tsx      |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       |  22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |   4 +-
 src/app/globals.css                                | 157 +++++
 src/components/exam-runner/primitives.tsx          |   3 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 src/data/mocks/ielts-set-10.ts                     | 345 +++++++++-
 src/data/mocks/ielts-set-11.ts                     | 360 +++++++++-
 src/data/mocks/ielts-set-12.ts                     | 372 ++++++++++-
 src/data/mocks/ielts-set-13.ts                     | 351 +++++++++-
 src/data/mocks/ielts-set-14.ts                     | 347 +++++++++-
 src/data/mocks/ielts-set-15.ts                     | 349 +++++++++-
 src/data/mocks/ielts-set-16.ts                     | 363 +++++++++-
 src/data/mocks/ielts-set-17.ts                     | 356 +++++++++-
 src/data/mocks/ielts-set-18.ts                     | 359 +++++++++-
 src/data/mocks/ielts-set-19.ts                     | 354 +++++++++-
 src/data/mocks/ielts-set-20.ts                     | 358 +++++++++-
 src/data/mocks/ielts-set-5.ts                      | 355 +++++++++-
 src/data/mocks/ielts-set-6.ts                      | 363 +++++++++-
 src/data/mocks/ielts-set-7.ts                      | 383 ++++++++++-
 src/data/mocks/ielts-set-8.ts                      | 382 ++++++++++-
 src/data/mocks/ielts-set-9.ts                      | 367 +++++++++-
 112 files changed, 7442 insertions(+), 724 deletions(-)
```

## 2026-07-26 14:40:52 — sesión 65fcb1cc-485c-463f-a921-3021c5c9991d

```

## 2026-07-26 14:41:07 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |  14 +
 docs/REGISTRO-DE-SESIONES.md                       | 863 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 docs/ielts-toefl-audit.md                          |   9 +
 docs/ielts-toefl-content-inventory.json            |   2 +-
 docs/ielts-toefl-migration-plan.md                 |   1 +
 docs/ielts-toefl-route-map.md                      |  40 +-
 public/audio/cils/set-1.mp3                        | Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                | Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                | Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                | Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   | Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   | Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   | Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       | Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       | Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       | Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       | Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 | Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  | Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       | Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 | Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       | Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    | Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 | Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  | Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  | Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     | Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   | Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    | Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 | Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   | Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  | Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  | Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      | Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     | Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   | Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  | Bin 333741 -> 166893 bytes
 scripts/audit-ielts-routes.mjs                     |  14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   3 +-
 src/app/(site)/home/page.tsx                       |  20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |   8 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx | 180 +----
 .../ielts/academic/writing/task1/Content.tsx       |   1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |   5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |   4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |  18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |   4 +-
 .../writing/task1/introduccion/Content.tsx         | 430 +---------
 .../Task1IntroductionPracticeEngine.tsx            |   2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |   6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |  10 +-
 .../academic/writing/task1/procesos/Content.tsx    |   4 -
 .../academic/writing/task1/tablas/Content.tsx      |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       |  22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |   4 +-
 src/app/globals.css                                | 184 ++++-
 src/components/exam-runner/primitives.tsx          |   3 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 src/data/mocks/ielts-set-10.ts                     | 345 +++++++-
 src/data/mocks/ielts-set-11.ts                     | 360 ++++++++-
 src/data/mocks/ielts-set-12.ts                     | 372 ++++++++-
 src/data/mocks/ielts-set-13.ts                     | 351 ++++++++-
 src/data/mocks/ielts-set-14.ts                     | 347 ++++++++-
 src/data/mocks/ielts-set-15.ts                     | 349 ++++++++-
 src/data/mocks/ielts-set-16.ts                     | 363 ++++++++-
 src/data/mocks/ielts-set-17.ts                     | 356 ++++++++-
 src/data/mocks/ielts-set-18.ts                     | 359 ++++++++-
 src/data/mocks/ielts-set-19.ts                     | 354 ++++++++-
 src/data/mocks/ielts-set-20.ts                     | 358 ++++++++-
 src/data/mocks/ielts-set-5.ts                      | 355 ++++++++-
 src/data/mocks/ielts-set-6.ts                      | 363 ++++++++-
 src/data/mocks/ielts-set-7.ts                      | 383 ++++++++-
 src/data/mocks/ielts-set-8.ts                      | 382 ++++++++-
 src/data/mocks/ielts-set-9.ts                      | 367 ++++++++-
 114 files changed, 7605 insertions(+), 738 deletions(-)
```
 .gitignore                                         |  14 +
 docs/REGISTRO-DE-SESIONES.md                       | 979 +++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   6 +-
 docs/ielts-toefl-audit.md                          |   9 +
 docs/ielts-toefl-content-inventory.json            |   2 +-
 docs/ielts-toefl-migration-plan.md                 |   1 +
 docs/ielts-toefl-route-map.md                      |  40 +-
 public/audio/cils/set-1.mp3                        | Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                | Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                | Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                | Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   | Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   | Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   | Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       | Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       | Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       | Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       | Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 | Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  | Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       | Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 | Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       | Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    | Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 | Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  | Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  | Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     | Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   | Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    | Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 | Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   | Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  | Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  | Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      | Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     | Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   | Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  | Bin 333741 -> 166893 bytes
 scripts/audit-ielts-routes.mjs                     |  14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   3 +-
 src/app/(site)/home/page.tsx                       |  20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |   8 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx | 180 +---
 .../ielts/academic/writing/task1/Content.tsx       |   1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |   5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |   4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |  18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |   4 +-
 .../writing/task1/introduccion/Content.tsx         | 430 +--------
 .../Task1IntroductionPracticeEngine.tsx            |   2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |   6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |  10 +-
 .../academic/writing/task1/procesos/Content.tsx    |   4 -
 .../academic/writing/task1/tablas/Content.tsx      |   2 +-
 .../writing/task1/tarea-completa/Content.tsx       |  22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |   4 +-
 src/app/globals.css                                | 184 +++-
 src/components/exam-runner/primitives.tsx          |   3 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |  18 +
 src/data/grammar/ingles/a2/comparatives.ts         |  18 +
 src/data/grammar/ingles/a2/connectors.ts           |  18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |  18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |  18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |  18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |  18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |  18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |  18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |  18 +
 .../grammar/ingles/a2/present-continuous-future.ts |  18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |  18 +
 .../ingles/a2/present-perfect-ever-never.ts        |  18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |  18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |  18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |  18 +
 src/data/grammar/ingles/a2/should-advice.ts        |  18 +
 src/data/grammar/ingles/a2/superlatives.ts         |  18 +
 src/data/grammar/ingles/a2/used-to.ts              |  18 +
 src/data/grammar/ingles/a2/will-future.ts          |  18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |  18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |  18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |  18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |  18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |  18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |  18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |  18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |  18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |  18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |  18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |  18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |  18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |  18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |  18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |  18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |  18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |  18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |  18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |  18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |  18 +
 src/data/mocks/ielts-set-10.ts                     | 345 +++++++-
 src/data/mocks/ielts-set-11.ts                     | 360 +++++++-
 src/data/mocks/ielts-set-12.ts                     | 372 +++++++-
 src/data/mocks/ielts-set-13.ts                     | 351 +++++++-
 src/data/mocks/ielts-set-14.ts                     | 347 +++++++-
 src/data/mocks/ielts-set-15.ts                     | 349 +++++++-
 src/data/mocks/ielts-set-16.ts                     | 363 +++++++-
 src/data/mocks/ielts-set-17.ts                     | 356 +++++++-
 src/data/mocks/ielts-set-18.ts                     | 359 +++++++-
 src/data/mocks/ielts-set-19.ts                     | 354 +++++++-
 src/data/mocks/ielts-set-20.ts                     | 358 +++++++-
 src/data/mocks/ielts-set-5.ts                      | 355 +++++++-
 src/data/mocks/ielts-set-6.ts                      | 363 +++++++-
 src/data/mocks/ielts-set-7.ts                      | 383 +++++++-
 src/data/mocks/ielts-set-8.ts                      | 382 +++++++-
 src/data/mocks/ielts-set-9.ts                      | 367 +++++++-
 114 files changed, 7721 insertions(+), 738 deletions(-)
```

## 2026-07-26 16:27:17 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |   14 +
 docs/REGISTRO-DE-SESIONES.md                       | 1099 ++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   14 +-
 docs/gramatica-goal-prompt.md                      |   21 +-
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +---
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +-------
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 src/app/globals.css                                |  184 +++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |    4 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |    4 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |    6 +-
 src/data/grammar/frances/a1/articles.ts            |    4 +-
 src/data/grammar/frances/a1/futur-proche.ts        |    6 +-
 src/data/grammar/frances/a1/genre-noms.ts          |    4 +-
 src/data/grammar/frances/a1/imperatif.ts           |    6 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |    4 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |    6 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |    6 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |    6 +-
 src/data/grammar/frances/a1/present-verbes-er.ts   |    4 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |    6 +-
 src/data/grammar/frances/a1/pronoms-sujet.ts       |    4 +-
 src/data/grammar/frances/a1/questions.ts           |    6 +-
 src/data/grammar/frances/a1/verbe-avoir.ts         |    4 +-
 src/data/grammar/frances/a1/verbe-etre.ts          |    4 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |   35 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   10 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   10 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   10 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   10 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   10 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   10 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   10 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   10 +-
 src/data/grammar/frances/a2/gerondif.ts            |   10 +-
 src/data/grammar/frances/a2/imparfait.ts           |   10 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   10 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   10 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   10 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   10 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   10 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   10 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   10 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   10 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   10 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   10 +-
 .../frances/b1/accord-participe-passe-b1.ts        |    6 +-
 .../grammar/frances/b1/comparatif-superlatif-b1.ts |    6 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |    4 +-
 .../grammar/frances/b1/connecteurs-logiques-b1.ts  |    6 +-
 .../grammar/frances/b1/discours-indirect-b1.ts     |    6 +-
 .../frances/b1/expressions-temporelles-b1.ts       |    6 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |    4 +-
 src/data/grammar/frances/b1/gerondif-b1.ts         |    6 +-
 src/data/grammar/frances/b1/hypothese-si-b1.ts     |    6 +-
 src/data/grammar/frances/b1/imperatif-b1.ts        |    6 +-
 src/data/grammar/frances/b1/negation-avancee-b1.ts |    6 +-
 src/data/grammar/frances/b1/nominalisation-b1.ts   |    6 +-
 .../grammar/frances/b1/participe-present-b1.ts     |    6 +-
 .../frances/b1/passe-compose-vs-imparfait-b1.ts    |    4 +-
 src/data/grammar/frances/b1/plus-que-parfait-b1.ts |    4 +-
 src/data/grammar/frances/b1/pronoms-relatifs-b1.ts |    6 +-
 src/data/grammar/frances/b1/pronoms-y-en-b1.ts     |    6 +-
 .../grammar/frances/b1/questions-indirectes-b1.ts  |    6 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |    4 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |    4 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   18 +
 src/data/grammar/ingles/a2/comparatives.ts         |   18 +
 src/data/grammar/ingles/a2/connectors.ts           |   18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |   18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |   18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |   18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |   18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |   18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |   18 +
 .../grammar/ingles/a2/present-continuous-future.ts |   18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |   18 +
 .../ingles/a2/present-perfect-ever-never.ts        |   18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |   18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |   18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |   18 +
 src/data/grammar/ingles/a2/should-advice.ts        |   18 +
 src/data/grammar/ingles/a2/superlatives.ts         |   18 +
 src/data/grammar/ingles/a2/used-to.ts              |   18 +
 src/data/grammar/ingles/a2/will-future.ts          |   18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |   18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |   18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |   18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |   18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |   18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |   18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |   18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |   18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |   18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |   18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |   18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |   18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |   18 +
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |   26 +
 .../portugues/a1/adjetivos-qualificativos.ts       |   26 +
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   12 +
 src/data/grammar/portugues/a1/artigos.ts           |   32 +
 src/data/grammar/portugues/a1/contracoes.ts        |   18 +
 src/data/grammar/portugues/a1/estar-gerundio.ts    |   12 +
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |   25 +
 src/data/grammar/portugues/a1/ir-futuro.ts         |   12 +
 src/data/grammar/portugues/a1/negacao.ts           |   26 +
 .../portugues/a1/perguntas-interrogativas.ts       |   29 +
 .../grammar/portugues/a1/plural-substantivos.ts    |   29 +
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   28 +
 .../grammar/portugues/a1/presente-verbos-ar.ts     |   26 +
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |   26 +
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |   28 +
 src/data/grammar/portugues/a1/ser-e-estar.ts       |   40 +
 src/data/grammar/portugues/a1/verbo-ter.ts         |   35 +
 .../grammar/portugues/a1/verbos-irregulares.ts     |   12 +
 .../portugues/a2/comparativos-superlativos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/condicional-a2.ts    |   26 +
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   25 +
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   27 +
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   27 +
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   27 +
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |   26 +
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   25 +
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   25 +
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   19 +
 .../portugues/a2/preterito-imperfeito-a2.ts        |   26 +
 .../a2/preterito-perfeito-irregular-a2.ts          |   26 +
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   27 +
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   25 +
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   27 +
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   36 +
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   26 +
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   27 +
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   21 +
 .../portugues/b1/comparativos-superlativos-b1.ts   |    4 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/conectivos-b1.ts     |    4 +-
 .../portugues/b1/conjuntivo-imperfeito-b1.ts       |    4 +-
 .../grammar/portugues/b1/discurso-indireto-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/gerundio-b1.ts       |    4 +-
 src/data/grammar/portugues/b1/imperativo-b1.ts     |    4 +-
 .../grammar/portugues/b1/participio-passado-b1.ts  |    4 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/preposicoes-b1.ts    |    4 +-
 .../b1/preterito-perfeito-vs-imperfeito-b1.ts      |    4 +-
 .../grammar/portugues/b1/pronomes-obliquos-b1.ts   |    4 +-
 .../grammar/portugues/b1/regencia-verbal-b1.ts     |   22 +-
 src/data/grammar/portugues/b1/ser-vs-estar-b1.ts   |    4 +-
 .../grammar/portugues/b1/subjuntivo-presente-b1.ts |    4 +-
 .../grammar/portugues/b1/tempos-compostos-b1.ts    |    4 +-
 .../grammar/portugues/b1/verbos-reflexos-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/voz-passiva-b1.ts    |    4 +-
 src/data/mocks/ielts-set-10.ts                     |  345 +++++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++++++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++++++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++++++-
 src/data/mocks/ielts-set-14.ts                     |  347 +++++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++++++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++++++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++++++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++++++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++++++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++++++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++++++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++++++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++++++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++++++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++++++-
 233 files changed, 9162 insertions(+), 933 deletions(-)
```

## 2026-07-26 22:30:26 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |   14 +
 docs/REGISTRO-DE-SESIONES.md                       | 1338 ++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   16 +-
 docs/gramatica-goal-prompt.md                      |   21 +-
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +--
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +------
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 src/app/globals.css                                |  184 ++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |    6 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |    6 +-
 src/data/grammar/aleman/a1/artikel.ts              |    6 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |    6 +-
 src/data/grammar/aleman/a1/imperativ.ts            |    6 +-
 src/data/grammar/aleman/a1/modalverben.ts          |    6 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |    6 +-
 src/data/grammar/aleman/a1/personalpronomen.ts     |    4 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |    6 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |    6 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |    6 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |    6 +-
 src/data/grammar/aleman/a1/prasens-regelmaessig.ts |    6 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |    6 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |    6 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |    6 +-
 src/data/grammar/aleman/a1/verb-sein.ts            |    4 +-
 src/data/grammar/aleman/a1/verneinung.ts           |    6 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |    6 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |    6 +-
 .../grammar/aleman/a2/adjektivdeklination-a2.ts    |    6 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   10 +-
 src/data/grammar/aleman/a2/dativ-a2.ts             |    6 +-
 src/data/grammar/aleman/a2/futur-i-a2.ts           |    6 +-
 src/data/grammar/aleman/a2/genitiv-a2.ts           |    6 +-
 src/data/grammar/aleman/a2/infinitiv-zu-a2.ts      |    6 +-
 .../grammar/aleman/a2/komparativ-superlativ-a2.ts  |    6 +-
 src/data/grammar/aleman/a2/konjunktionen-a2.ts     |    6 +-
 .../grammar/aleman/a2/konjunktiv-ii-wurden-a2.ts   |    6 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |    6 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   10 +-
 src/data/grammar/aleman/a2/passiv-praesens-a2.ts   |    8 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |    6 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |    6 +-
 src/data/grammar/aleman/a2/praeteritum-basic-a2.ts |    6 +-
 src/data/grammar/aleman/a2/reflexivverben-a2.ts    |    6 +-
 src/data/grammar/aleman/a2/relativsaetze-a2.ts     |    6 +-
 .../aleman/a2/trennbare-verben-praeteritum-a2.ts   |    8 +-
 .../grammar/aleman/a2/wechselpraepositionen-a2.ts  |    6 +-
 .../aleman/a2/zweiteilige-konnektoren-a2.ts        |    8 +-
 .../grammar/aleman/b1/adjektivdeklination-b1.ts    |    8 +-
 src/data/grammar/aleman/b1/genitiv-b1.ts           |    8 +-
 src/data/grammar/aleman/b1/imperativ-b1.ts         |    4 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |    4 +-
 src/data/grammar/aleman/b1/infinitiv-zu-b1.ts      |    4 +-
 .../aleman/b1/kausale-konzessive-satze-b1.ts       |   10 +-
 src/data/grammar/aleman/b1/konjunktiv-ii-b1.ts     |    4 +-
 .../grammar/aleman/b1/modalverben-prateritum-b1.ts |    6 +-
 src/data/grammar/aleman/b1/nebensatze-b1.ts        |    4 +-
 .../grammar/aleman/b1/partizip-als-adjektiv-b1.ts  |    4 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |    4 +-
 .../grammar/aleman/b1/perfekt-haben-sein-b1.ts     |    8 +-
 .../aleman/b1/prateritum-starke-verben-b1.ts       |    6 +-
 src/data/grammar/aleman/b1/reflexive-verben-b1.ts  |    4 +-
 src/data/grammar/aleman/b1/relativsatze-b1.ts      |    4 +-
 .../aleman/b1/temporale-prapositionen-b1.ts        |   10 +-
 .../aleman/b1/verben-mit-prapositionen-b1.ts       |    8 +-
 .../grammar/aleman/b1/wechselprapositionen-b1.ts   |    8 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |    4 +-
 .../aleman/b1/zweiteilige-konnektoren-b1.ts        |   10 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |    6 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |    6 +-
 src/data/grammar/coreano/a1/estructura-sov.ts      |    6 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |    8 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |    8 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |    4 +-
 src/data/grammar/coreano/a1/hangul-basico.ts       |    4 +-
 src/data/grammar/coreano/a1/ieoyo-yeyo.ts          |    4 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |    6 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |    4 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |    4 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |    4 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |    4 +-
 .../grammar/coreano/a1/marcadores-tema-sujeto.ts   |    4 +-
 src/data/grammar/coreano/a1/negacion.ts            |    6 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |    6 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |    4 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |    6 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |    6 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |    6 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   10 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |    4 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |    8 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |    4 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |    4 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   10 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   10 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |    8 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |    6 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   10 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |    4 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |    8 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |   10 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   10 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   10 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   10 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |    4 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |    8 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   10 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |    6 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |    4 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |    4 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |    6 +-
 src/data/grammar/frances/a1/articles.ts            |    4 +-
 src/data/grammar/frances/a1/futur-proche.ts        |    6 +-
 src/data/grammar/frances/a1/genre-noms.ts          |    4 +-
 src/data/grammar/frances/a1/imperatif.ts           |    6 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |    4 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |    6 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |    6 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |    6 +-
 src/data/grammar/frances/a1/present-verbes-er.ts   |    4 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |    6 +-
 src/data/grammar/frances/a1/pronoms-sujet.ts       |    4 +-
 src/data/grammar/frances/a1/questions.ts           |    6 +-
 src/data/grammar/frances/a1/verbe-avoir.ts         |    4 +-
 src/data/grammar/frances/a1/verbe-etre.ts          |    4 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |   35 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   10 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   10 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   10 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   10 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   10 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   10 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   10 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   10 +-
 src/data/grammar/frances/a2/gerondif.ts            |   10 +-
 src/data/grammar/frances/a2/imparfait.ts           |   10 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   10 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   10 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   10 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   10 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   10 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   10 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   10 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   10 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   10 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   10 +-
 .../frances/b1/accord-participe-passe-b1.ts        |    6 +-
 .../grammar/frances/b1/comparatif-superlatif-b1.ts |    6 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |    4 +-
 .../grammar/frances/b1/connecteurs-logiques-b1.ts  |    6 +-
 .../grammar/frances/b1/discours-indirect-b1.ts     |    6 +-
 .../frances/b1/expressions-temporelles-b1.ts       |    6 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |    4 +-
 src/data/grammar/frances/b1/gerondif-b1.ts         |    6 +-
 src/data/grammar/frances/b1/hypothese-si-b1.ts     |    6 +-
 src/data/grammar/frances/b1/imperatif-b1.ts        |    6 +-
 src/data/grammar/frances/b1/negation-avancee-b1.ts |    6 +-
 src/data/grammar/frances/b1/nominalisation-b1.ts   |    6 +-
 .../grammar/frances/b1/participe-present-b1.ts     |    6 +-
 .../frances/b1/passe-compose-vs-imparfait-b1.ts    |    4 +-
 src/data/grammar/frances/b1/plus-que-parfait-b1.ts |    4 +-
 src/data/grammar/frances/b1/pronoms-relatifs-b1.ts |    6 +-
 src/data/grammar/frances/b1/pronoms-y-en-b1.ts     |    6 +-
 .../grammar/frances/b1/questions-indirectes-b1.ts  |    6 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |    4 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |    4 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   18 +
 src/data/grammar/ingles/a2/comparatives.ts         |   18 +
 src/data/grammar/ingles/a2/connectors.ts           |   18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |   18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |   18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |   18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |   18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |   18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |   18 +
 .../grammar/ingles/a2/present-continuous-future.ts |   18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |   18 +
 .../ingles/a2/present-perfect-ever-never.ts        |   18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |   18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |   18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |   18 +
 src/data/grammar/ingles/a2/should-advice.ts        |   18 +
 src/data/grammar/ingles/a2/superlatives.ts         |   18 +
 src/data/grammar/ingles/a2/used-to.ts              |   18 +
 src/data/grammar/ingles/a2/will-future.ts          |   18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |   18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |   18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |   18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |   18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |   18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |   18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |   18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |   18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |   18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |   18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |   18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |   18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |   18 +
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |   26 +
 .../portugues/a1/adjetivos-qualificativos.ts       |   26 +
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   12 +
 src/data/grammar/portugues/a1/artigos.ts           |   32 +
 src/data/grammar/portugues/a1/contracoes.ts        |   18 +
 src/data/grammar/portugues/a1/estar-gerundio.ts    |   12 +
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |   25 +
 src/data/grammar/portugues/a1/ir-futuro.ts         |   12 +
 src/data/grammar/portugues/a1/negacao.ts           |   26 +
 .../portugues/a1/perguntas-interrogativas.ts       |   29 +
 .../grammar/portugues/a1/plural-substantivos.ts    |   29 +
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   28 +
 .../grammar/portugues/a1/presente-verbos-ar.ts     |   26 +
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |   26 +
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |   28 +
 src/data/grammar/portugues/a1/ser-e-estar.ts       |   40 +
 src/data/grammar/portugues/a1/verbo-ter.ts         |   35 +
 .../grammar/portugues/a1/verbos-irregulares.ts     |   12 +
 .../portugues/a2/comparativos-superlativos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/condicional-a2.ts    |   26 +
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   25 +
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   27 +
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   27 +
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   27 +
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |   26 +
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   25 +
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   25 +
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   19 +
 .../portugues/a2/preterito-imperfeito-a2.ts        |   26 +
 .../a2/preterito-perfeito-irregular-a2.ts          |   26 +
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   27 +
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   25 +
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   27 +
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   36 +
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   26 +
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   27 +
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   21 +
 .../portugues/b1/comparativos-superlativos-b1.ts   |    4 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/conectivos-b1.ts     |    4 +-
 .../portugues/b1/conjuntivo-imperfeito-b1.ts       |    4 +-
 .../grammar/portugues/b1/discurso-indireto-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/gerundio-b1.ts       |    4 +-
 src/data/grammar/portugues/b1/imperativo-b1.ts     |    4 +-
 .../grammar/portugues/b1/participio-passado-b1.ts  |    4 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/preposicoes-b1.ts    |    4 +-
 .../b1/preterito-perfeito-vs-imperfeito-b1.ts      |    4 +-
 .../grammar/portugues/b1/pronomes-obliquos-b1.ts   |    4 +-
 .../grammar/portugues/b1/regencia-verbal-b1.ts     |   22 +-
 src/data/grammar/portugues/b1/ser-vs-estar-b1.ts   |    4 +-
 .../grammar/portugues/b1/subjuntivo-presente-b1.ts |    4 +-
 .../grammar/portugues/b1/tempos-compostos-b1.ts    |    4 +-
 .../grammar/portugues/b1/verbos-reflexos-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/voz-passiva-b1.ts    |    4 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++++-
 src/data/mocks/ielts-set-11.ts                     |  360 +++++-
 src/data/mocks/ielts-set-12.ts                     |  372 +++++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++++-
 src/data/mocks/ielts-set-16.ts                     |  363 +++++-
 src/data/mocks/ielts-set-17.ts                     |  356 +++++-
 src/data/mocks/ielts-set-18.ts                     |  359 +++++-
 src/data/mocks/ielts-set-19.ts                     |  354 +++++-
 src/data/mocks/ielts-set-20.ts                     |  358 +++++-
 src/data/mocks/ielts-set-5.ts                      |  355 +++++-
 src/data/mocks/ielts-set-6.ts                      |  363 +++++-
 src/data/mocks/ielts-set-7.ts                      |  383 +++++-
 src/data/mocks/ielts-set-8.ts                      |  382 +++++-
 src/data/mocks/ielts-set-9.ts                      |  367 +++++-
 333 files changed, 9802 insertions(+), 1166 deletions(-)
```

## 2026-07-30 11:00:48 — sesión 2bb141e4-849d-4da0-922d-e7b2e7470b5d

```
 .gitignore                                         |   14 +
 docs/REGISTRO-DE-SESIONES.md                       | 1677 ++++++++++++++++++++
 docs/gramatica-enriquecimiento-progreso.md         |   16 +-
 docs/gramatica-goal-prompt.md                      |   21 +-
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +--
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +---
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +--
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +--
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +--
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +--
 .../practica/frances/a2/escritura/Content.tsx      |  201 +--
 .../practica/frances/b1/escritura/Content.tsx      |  216 +--
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +----
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +--
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +--
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +--
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +--
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +--
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +--
 .../practica/japones/a1/escritura/Content.tsx      |  236 +--
 .../practica/japones/a2/escritura/Content.tsx      |  219 +--
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +--
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +--
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +--
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +---
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +--
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/grammar/aleman/a1/adjektive-pradikativ.ts |    6 +-
 src/data/grammar/aleman/a1/akkusativ.ts            |    6 +-
 src/data/grammar/aleman/a1/artikel.ts              |    6 +-
 src/data/grammar/aleman/a1/dativ-praepositionen.ts |    6 +-
 src/data/grammar/aleman/a1/imperativ.ts            |    6 +-
 src/data/grammar/aleman/a1/modalverben.ts          |    6 +-
 .../aleman/a1/personalpronomen-akkusativ.ts        |    6 +-
 src/data/grammar/aleman/a1/personalpronomen.ts     |    4 +-
 src/data/grammar/aleman/a1/plural-nomen.ts         |    6 +-
 src/data/grammar/aleman/a1/possessivpronomen.ts    |    6 +-
 src/data/grammar/aleman/a1/praepositionen-ort.ts   |    6 +-
 src/data/grammar/aleman/a1/praepositionen-zeit.ts  |    6 +-
 src/data/grammar/aleman/a1/prasens-regelmaessig.ts |    6 +-
 .../grammar/aleman/a1/prasens-unregelmaessig.ts    |    6 +-
 src/data/grammar/aleman/a1/trennbare-verben.ts     |    6 +-
 src/data/grammar/aleman/a1/verb-haben.ts           |    6 +-
 src/data/grammar/aleman/a1/verb-sein.ts            |    4 +-
 src/data/grammar/aleman/a1/verneinung.ts           |    6 +-
 src/data/grammar/aleman/a1/w-fragen.ts             |    6 +-
 src/data/grammar/aleman/a1/zukunft-prasens.ts      |    6 +-
 .../grammar/aleman/a2/adjektivdeklination-a2.ts    |    6 +-
 src/data/grammar/aleman/a2/da-hin-her-a2.ts        |   10 +-
 src/data/grammar/aleman/a2/dativ-a2.ts             |    6 +-
 src/data/grammar/aleman/a2/futur-i-a2.ts           |    6 +-
 src/data/grammar/aleman/a2/genitiv-a2.ts           |    6 +-
 src/data/grammar/aleman/a2/infinitiv-zu-a2.ts      |    6 +-
 .../grammar/aleman/a2/komparativ-superlativ-a2.ts  |    6 +-
 src/data/grammar/aleman/a2/konjunktionen-a2.ts     |    6 +-
 .../grammar/aleman/a2/konjunktiv-ii-wurden-a2.ts   |    6 +-
 .../aleman/a2/modalverben-praeteritum-a2.ts        |    6 +-
 .../grammar/aleman/a2/partizip-als-adjektiv-a2.ts  |   10 +-
 src/data/grammar/aleman/a2/passiv-praesens-a2.ts   |    8 +-
 src/data/grammar/aleman/a2/perfekt-haben-a2.ts     |    6 +-
 src/data/grammar/aleman/a2/perfekt-sein-a2.ts      |    6 +-
 src/data/grammar/aleman/a2/praeteritum-basic-a2.ts |    6 +-
 src/data/grammar/aleman/a2/reflexivverben-a2.ts    |    6 +-
 src/data/grammar/aleman/a2/relativsaetze-a2.ts     |    6 +-
 .../aleman/a2/trennbare-verben-praeteritum-a2.ts   |    8 +-
 .../grammar/aleman/a2/wechselpraepositionen-a2.ts  |    6 +-
 .../aleman/a2/zweiteilige-konnektoren-a2.ts        |    8 +-
 .../grammar/aleman/b1/adjektivdeklination-b1.ts    |    8 +-
 src/data/grammar/aleman/b1/genitiv-b1.ts           |    8 +-
 src/data/grammar/aleman/b1/imperativ-b1.ts         |    4 +-
 src/data/grammar/aleman/b1/indirekte-rede-b1.ts    |    4 +-
 src/data/grammar/aleman/b1/infinitiv-zu-b1.ts      |    4 +-
 .../aleman/b1/kausale-konzessive-satze-b1.ts       |   10 +-
 src/data/grammar/aleman/b1/konjunktiv-ii-b1.ts     |    4 +-
 .../grammar/aleman/b1/modalverben-prateritum-b1.ts |    6 +-
 src/data/grammar/aleman/b1/nebensatze-b1.ts        |    4 +-
 .../grammar/aleman/b1/partizip-als-adjektiv-b1.ts  |    4 +-
 src/data/grammar/aleman/b1/passiv-b1.ts            |    4 +-
 .../grammar/aleman/b1/perfekt-haben-sein-b1.ts     |    8 +-
 .../aleman/b1/prateritum-starke-verben-b1.ts       |    6 +-
 src/data/grammar/aleman/b1/reflexive-verben-b1.ts  |    4 +-
 src/data/grammar/aleman/b1/relativsatze-b1.ts      |    4 +-
 .../aleman/b1/temporale-prapositionen-b1.ts        |   10 +-
 .../aleman/b1/verben-mit-prapositionen-b1.ts       |    8 +-
 .../grammar/aleman/b1/wechselprapositionen-b1.ts   |    8 +-
 src/data/grammar/aleman/b1/wortbildung-b1.ts       |    4 +-
 .../aleman/b1/zweiteilige-konnektoren-b1.ts        |   10 +-
 src/data/grammar/coreano/a1/adverbios-tiempo.ts    |    6 +-
 src/data/grammar/coreano/a1/conjuncion-hago.ts     |    6 +-
 src/data/grammar/coreano/a1/estructura-sov.ts      |    6 +-
 .../grammar/coreano/a1/expresiones-cotidianas.ts   |    8 +-
 .../grammar/coreano/a1/forma-formal-habnida.ts     |    8 +-
 src/data/grammar/coreano/a1/haeyo-presente.ts      |    4 +-
 src/data/grammar/coreano/a1/hangul-basico.ts       |    4 +-
 src/data/grammar/coreano/a1/ieoyo-yeyo.ts          |    4 +-
 src/data/grammar/coreano/a1/interrogativos.ts      |    6 +-
 src/data/grammar/coreano/a1/isseoyo-eopsoyo.ts     |    4 +-
 src/data/grammar/coreano/a1/marcador-lugar-e.ts    |    4 +-
 src/data/grammar/coreano/a1/marcador-lugar-eseo.ts |    4 +-
 src/data/grammar/coreano/a1/marcador-objeto.ts     |    4 +-
 .../grammar/coreano/a1/marcadores-tema-sujeto.ts   |    4 +-
 src/data/grammar/coreano/a1/negacion.ts            |    6 +-
 .../coreano/a1/numeros-nativos-contadores.ts       |    6 +-
 .../grammar/coreano/a1/numeros-sino-coreanos.ts    |    4 +-
 src/data/grammar/coreano/a1/pasado-asseoyo.ts      |    6 +-
 src/data/grammar/coreano/a1/querer-goshipda.ts     |    6 +-
 src/data/grammar/coreano/a1/tiempo-horas.ts        |    6 +-
 src/data/grammar/coreano/a2/antes-despues-a2.ts    |   10 +-
 .../grammar/coreano/a2/capacidad-rl-su-itda-a2.ts  |    4 +-
 .../grammar/coreano/a2/clausulas-relativas-a2.ts   |    8 +-
 .../grammar/coreano/a2/condicional-eumyeon-a2.ts   |    4 +-
 src/data/grammar/coreano/a2/conector-aseo-a2.ts    |    4 +-
 src/data/grammar/coreano/a2/cuanto-eolmana-a2.ts   |   10 +-
 .../grammar/coreano/a2/discurso-reportado-a2.ts    |   10 +-
 .../grammar/coreano/a2/durante-neun-dongane-a2.ts  |    8 +-
 .../grammar/coreano/a2/futuro-rl-geoyeyo-a2.ts     |    6 +-
 src/data/grammar/coreano/a2/honorificos-a2.ts      |   10 +-
 .../grammar/coreano/a2/intencion-ryogo-hada-a2.ts  |    4 +-
 src/data/grammar/coreano/a2/negacion-ji-anta-a2.ts |    8 +-
 .../grammar/coreano/a2/obligacion-aya-hada-a2.ts   |   10 +-
 .../coreano/a2/parecer-neun-geot-gatda-a2.ts       |   10 +-
 .../grammar/coreano/a2/particulas-recipiente-a2.ts |   10 +-
 .../grammar/coreano/a2/progresivo-go-itda-a2.ts    |   10 +-
 src/data/grammar/coreano/a2/razon-gittaemune-a2.ts |    4 +-
 src/data/grammar/coreano/a2/razon-niikka-a2.ts     |    8 +-
 .../grammar/coreano/a2/solo-tambien-man-do-a2.ts   |   10 +-
 .../coreano/a2/verbos-irregulares-pasado-a2.ts     |    6 +-
 .../grammar/frances/a1/adjectifs-possessifs.ts     |    4 +-
 .../grammar/frances/a1/adjectifs-qualificatifs.ts  |    4 +-
 src/data/grammar/frances/a1/adverbes-frequence.ts  |    6 +-
 src/data/grammar/frances/a1/articles.ts            |    4 +-
 src/data/grammar/frances/a1/futur-proche.ts        |    6 +-
 src/data/grammar/frances/a1/genre-noms.ts          |    4 +-
 src/data/grammar/frances/a1/imperatif.ts           |    6 +-
 src/data/grammar/frances/a1/negation-ne-pas.ts     |    4 +-
 src/data/grammar/frances/a1/pluriel-noms.ts        |    6 +-
 src/data/grammar/frances/a1/prepositions-lieu.ts   |    6 +-
 src/data/grammar/frances/a1/prepositions-temps.ts  |    6 +-
 src/data/grammar/frances/a1/present-verbes-er.ts   |    4 +-
 src/data/grammar/frances/a1/present-verbes-ir.ts   |    6 +-
 src/data/grammar/frances/a1/pronoms-sujet.ts       |    4 +-
 src/data/grammar/frances/a1/questions.ts           |    6 +-
 src/data/grammar/frances/a1/verbe-avoir.ts         |    4 +-
 src/data/grammar/frances/a1/verbe-etre.ts          |    4 +-
 src/data/grammar/frances/a1/verbes-irreguliers.ts  |   35 +-
 .../grammar/frances/a2/accord-participe-passe.ts   |   10 +-
 src/data/grammar/frances/a2/cause-consequence.ts   |   10 +-
 src/data/grammar/frances/a2/comparatifs.ts         |   10 +-
 .../grammar/frances/a2/conditionnel-present.ts     |   10 +-
 src/data/grammar/frances/a2/connecteurs.ts         |   10 +-
 src/data/grammar/frances/a2/discours-indirect.ts   |   10 +-
 src/data/grammar/frances/a2/dont-relatif.ts        |   10 +-
 src/data/grammar/frances/a2/futur-simple.ts        |   10 +-
 src/data/grammar/frances/a2/gerondif.ts            |   10 +-
 src/data/grammar/frances/a2/imparfait.ts           |   10 +-
 src/data/grammar/frances/a2/negation-avancee.ts    |   10 +-
 src/data/grammar/frances/a2/passe-compose-avoir.ts |   10 +-
 src/data/grammar/frances/a2/passe-compose-etre.ts  |   10 +-
 .../frances/a2/passe-compose-vs-imparfait.ts       |   10 +-
 src/data/grammar/frances/a2/pronoms-coi.ts         |   10 +-
 src/data/grammar/frances/a2/pronoms-y-en.ts        |   10 +-
 src/data/grammar/frances/a2/si-conditionnel.ts     |   10 +-
 src/data/grammar/frances/a2/subjonctif-present.ts  |   10 +-
 src/data/grammar/frances/a2/superlatifs.ts         |   10 +-
 src/data/grammar/frances/a2/verbes-pronominaux.ts  |   10 +-
 .../frances/b1/accord-participe-passe-b1.ts        |    6 +-
 .../grammar/frances/b1/comparatif-superlatif-b1.ts |    6 +-
 .../grammar/frances/b1/conditionnel-present-b1.ts  |    4 +-
 .../grammar/frances/b1/connecteurs-logiques-b1.ts  |    6 +-
 .../grammar/frances/b1/discours-indirect-b1.ts     |    6 +-
 .../frances/b1/expressions-temporelles-b1.ts       |    6 +-
 src/data/grammar/frances/b1/futur-simple-b1.ts     |    4 +-
 src/data/grammar/frances/b1/gerondif-b1.ts         |    6 +-
 src/data/grammar/frances/b1/hypothese-si-b1.ts     |    6 +-
 src/data/grammar/frances/b1/imperatif-b1.ts        |    6 +-
 src/data/grammar/frances/b1/negation-avancee-b1.ts |    6 +-
 src/data/grammar/frances/b1/nominalisation-b1.ts   |    6 +-
 .../grammar/frances/b1/participe-present-b1.ts     |    6 +-
 .../frances/b1/passe-compose-vs-imparfait-b1.ts    |    4 +-
 src/data/grammar/frances/b1/plus-que-parfait-b1.ts |    4 +-
 src/data/grammar/frances/b1/pronoms-relatifs-b1.ts |    6 +-
 src/data/grammar/frances/b1/pronoms-y-en-b1.ts     |    6 +-
 .../grammar/frances/b1/questions-indirectes-b1.ts  |    6 +-
 .../grammar/frances/b1/subjonctif-present-b1.ts    |    4 +-
 src/data/grammar/frances/b1/voix-passive-b1.ts     |    4 +-
 src/data/grammar/ingles/a2/adverbs-manner.ts       |   18 +
 src/data/grammar/ingles/a2/comparatives.ts         |   18 +
 src/data/grammar/ingles/a2/connectors.ts           |   18 +
 src/data/grammar/ingles/a2/first-conditional.ts    |   18 +
 src/data/grammar/ingles/a2/have-to-must.ts         |   18 +
 src/data/grammar/ingles/a2/past-simple-be.ts       |   18 +
 .../grammar/ingles/a2/past-simple-irregular.ts     |   18 +
 .../grammar/ingles/a2/past-simple-questions.ts     |   18 +
 src/data/grammar/ingles/a2/past-simple-regular.ts  |   18 +
 .../grammar/ingles/a2/prepositions-movement.ts     |   18 +
 .../grammar/ingles/a2/present-continuous-future.ts |   18 +
 .../grammar/ingles/a2/present-perfect-basic.ts     |   18 +
 .../ingles/a2/present-perfect-ever-never.ts        |   18 +
 .../ingles/a2/present-perfect-vs-past-simple.ts    |   18 +
 src/data/grammar/ingles/a2/quantifiers.ts          |   18 +
 src/data/grammar/ingles/a2/relative-clauses.ts     |   18 +
 src/data/grammar/ingles/a2/should-advice.ts        |   18 +
 src/data/grammar/ingles/a2/superlatives.ts         |   18 +
 src/data/grammar/ingles/a2/used-to.ts              |   18 +
 src/data/grammar/ingles/a2/will-future.ts          |   18 +
 src/data/grammar/ingles/b1/articles-advanced-b1.ts |   18 +
 .../ingles/b1/comparison-adjectives-adverbs-b1.ts  |   18 +
 src/data/grammar/ingles/b1/first-conditional-b1.ts |   18 +
 .../grammar/ingles/b1/future-will-going-to-b1.ts   |   18 +
 .../grammar/ingles/b1/gerunds-infinitives-b1.ts    |   18 +
 src/data/grammar/ingles/b1/linking-words-b1.ts     |   18 +
 .../grammar/ingles/b1/modals-must-have-to-b1.ts    |   18 +
 src/data/grammar/ingles/b1/passive-voice-b1.ts     |   18 +
 src/data/grammar/ingles/b1/past-continuous-b1.ts   |   18 +
 src/data/grammar/ingles/b1/past-perfect-b1.ts      |   18 +
 .../grammar/ingles/b1/phrasal-verbs-common-b1.ts   |   18 +
 .../ingles/b1/present-perfect-continuous-b1.ts     |   18 +
 .../grammar/ingles/b1/present-perfect-simple-b1.ts |   18 +
 src/data/grammar/ingles/b1/quantifiers-b1.ts       |   18 +
 src/data/grammar/ingles/b1/question-tags-b1.ts     |   18 +
 src/data/grammar/ingles/b1/relative-clauses-b1.ts  |   18 +
 src/data/grammar/ingles/b1/reported-speech-b1.ts   |   18 +
 .../grammar/ingles/b1/second-conditional-b1.ts     |   18 +
 src/data/grammar/ingles/b1/time-clauses-b1.ts      |   18 +
 src/data/grammar/ingles/b1/wish-clauses-b1.ts      |   18 +
 .../grammar/portugues/a1/adjetivos-possessivos.ts  |   26 +
 .../portugues/a1/adjetivos-qualificativos.ts       |   26 +
 .../grammar/portugues/a1/adverbios-frequencia.ts   |   12 +
 src/data/grammar/portugues/a1/artigos.ts           |   32 +
 src/data/grammar/portugues/a1/contracoes.ts        |   18 +
 src/data/grammar/portugues/a1/estar-gerundio.ts    |   12 +
 src/data/grammar/portugues/a1/ha-tem-existe.ts     |   25 +
 src/data/grammar/portugues/a1/ir-futuro.ts         |   12 +
 src/data/grammar/portugues/a1/negacao.ts           |   26 +
 .../portugues/a1/perguntas-interrogativas.ts       |   29 +
 .../grammar/portugues/a1/plural-substantivos.ts    |   29 +
 src/data/grammar/portugues/a1/preposicoes-lugar.ts |   28 +
 .../grammar/portugues/a1/presente-verbos-ar.ts     |   26 +
 .../grammar/portugues/a1/presente-verbos-er-ir.ts  |   26 +
 src/data/grammar/portugues/a1/pronomes-pessoais.ts |   28 +
 src/data/grammar/portugues/a1/ser-e-estar.ts       |   40 +
 src/data/grammar/portugues/a1/verbo-ter.ts         |   35 +
 .../grammar/portugues/a1/verbos-irregulares.ts     |   12 +
 .../portugues/a2/comparativos-superlativos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/condicional-a2.ts    |   26 +
 .../grammar/portugues/a2/conjuncoes-logicas-a2.ts  |   25 +
 .../portugues/a2/diminutivos-aumentativos-a2.ts    |   27 +
 .../portugues/a2/expressoes-com-fazer-a2.ts        |   27 +
 .../grammar/portugues/a2/expressoes-tempo-a2.ts    |   27 +
 .../grammar/portugues/a2/futuro-do-presente-a2.ts  |   26 +
 src/data/grammar/portugues/a2/gerundio-a2.ts       |   25 +
 src/data/grammar/portugues/a2/ha-faz-tempo-a2.ts   |   25 +
 src/data/grammar/portugues/a2/para-vs-por-a2.ts    |   19 +
 .../portugues/a2/preterito-imperfeito-a2.ts        |   26 +
 .../a2/preterito-perfeito-irregular-a2.ts          |   26 +
 .../grammar/portugues/a2/pronomes-obliquos-a2.ts   |   27 +
 .../grammar/portugues/a2/pronomes-relativos-a2.ts  |   25 +
 src/data/grammar/portugues/a2/ser-vs-estar-a2.ts   |   27 +
 .../grammar/portugues/a2/subjuntivo-presente-a2.ts |   36 +
 src/data/grammar/portugues/a2/verbo-ficar-a2.ts    |   26 +
 src/data/grammar/portugues/a2/verbos-modais-a2.ts  |   27 +
 .../grammar/portugues/a2/verbos-reflexivos-a2.ts   |   26 +
 src/data/grammar/portugues/a2/voz-passiva-a2.ts    |   21 +
 .../portugues/b1/comparativos-superlativos-b1.ts   |    4 +-
 src/data/grammar/portugues/b1/condicional-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/conectivos-b1.ts     |    4 +-
 .../portugues/b1/conjuntivo-imperfeito-b1.ts       |    4 +-
 .../grammar/portugues/b1/discurso-indireto-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-conjuntivo-b1.ts   |    4 +-
 .../grammar/portugues/b1/futuro-presente-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/gerundio-b1.ts       |    4 +-
 src/data/grammar/portugues/b1/imperativo-b1.ts     |    4 +-
 .../grammar/portugues/b1/participio-passado-b1.ts  |    4 +-
 .../grammar/portugues/b1/periodo-hipotico-b1.ts    |    4 +-
 src/data/grammar/portugues/b1/preposicoes-b1.ts    |    4 +-
 .../b1/preterito-perfeito-vs-imperfeito-b1.ts      |    4 +-
 .../grammar/portugues/b1/pronomes-obliquos-b1.ts   |    4 +-
 .../grammar/portugues/b1/regencia-verbal-b1.ts     |   22 +-
 src/data/grammar/portugues/b1/ser-vs-estar-b1.ts   |    4 +-
 .../grammar/portugues/b1/subjuntivo-presente-b1.ts |    4 +-
 .../grammar/portugues/b1/tempos-compostos-b1.ts    |    4 +-
 .../grammar/portugues/b1/verbos-reflexos-b1.ts     |    4 +-
 src/data/grammar/portugues/b1/voz-passiva-b1.ts    |    4 +-
 src/data/mocks/ielts-set-10.ts                     |  345 +++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++++-
 src/data/mocks/ielts-set-13.ts                     |  351 +++-
 src/data/mocks/ielts-set-14.ts                     |  347 +++-
 src/data/mocks/ielts-set-15.ts                     |  349 +++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++++-
 357 files changed, 10616 insertions(+), 6138 deletions(-)
```

## 2026-07-30 13:14:51 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2040 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +--
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +--
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +--
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +--
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +----
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +--
 .../practica/japones/a2/escritura/Content.tsx      |  219 +--
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +--
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 +++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 +++-
 src/data/mocks/ielts-set-11.ts                     |  360 +++-
 src/data/mocks/ielts-set-12.ts                     |  372 +++-
 src/data/mocks/ielts-set-13.ts                     |  351 +++-
 src/data/mocks/ielts-set-14.ts                     |  347 +++-
 src/data/mocks/ielts-set-15.ts                     |  349 +++-
 src/data/mocks/ielts-set-16.ts                     |  363 +++-
 src/data/mocks/ielts-set-17.ts                     |  356 +++-
 src/data/mocks/ielts-set-18.ts                     |  359 +++-
 src/data/mocks/ielts-set-19.ts                     |  354 +++-
 src/data/mocks/ielts-set-20.ts                     |  358 +++-
 src/data/mocks/ielts-set-5.ts                      |  355 +++-
 src/data/mocks/ielts-set-6.ts                      |  363 +++-
 src/data/mocks/ielts-set-7.ts                      |  383 +++-
 src/data/mocks/ielts-set-8.ts                      |  382 +++-
 src/data/mocks/ielts-set-9.ts                      |  367 +++-
 99 files changed, 8543 insertions(+), 5707 deletions(-)
```

## 2026-07-30 21:09:13 — sesión 3ed5152e-aae7-483d-bb57-b26678287d99

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2145 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +--
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +--
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +--
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 +++-
 src/data/mocks/ielts-set-11.ts                     |  360 +++-
 src/data/mocks/ielts-set-12.ts                     |  372 +++-
 src/data/mocks/ielts-set-13.ts                     |  351 +++-
 src/data/mocks/ielts-set-14.ts                     |  347 +++-
 src/data/mocks/ielts-set-15.ts                     |  349 +++-
 src/data/mocks/ielts-set-16.ts                     |  363 +++-
 src/data/mocks/ielts-set-17.ts                     |  356 +++-
 src/data/mocks/ielts-set-18.ts                     |  359 +++-
 src/data/mocks/ielts-set-19.ts                     |  354 +++-
 src/data/mocks/ielts-set-20.ts                     |  358 +++-
 src/data/mocks/ielts-set-5.ts                      |  355 +++-
 src/data/mocks/ielts-set-6.ts                      |  363 +++-
 src/data/mocks/ielts-set-7.ts                      |  383 +++-
 src/data/mocks/ielts-set-8.ts                      |  382 +++-
 src/data/mocks/ielts-set-9.ts                      |  367 +++-
 99 files changed, 8648 insertions(+), 5707 deletions(-)
```

## 2026-07-30 21:24:08 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2250 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +--
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +--
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 +++-
 src/data/mocks/ielts-set-12.ts                     |  372 +++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 +++-
 src/data/mocks/ielts-set-17.ts                     |  356 +++-
 src/data/mocks/ielts-set-18.ts                     |  359 +++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 +++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 +++-
 src/data/mocks/ielts-set-7.ts                      |  383 +++-
 src/data/mocks/ielts-set-8.ts                      |  382 +++-
 src/data/mocks/ielts-set-9.ts                      |  367 +++-
 99 files changed, 8753 insertions(+), 5707 deletions(-)
```

## 2026-07-31 14:58:35 — sesión 3ced674d-be13-4ded-b217-6d96c6401998

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2355 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +--
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 +++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 +++-
 src/data/mocks/ielts-set-8.ts                      |  382 +++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 99 files changed, 8858 insertions(+), 5707 deletions(-)
```

## 2026-07-31 14:59:23 — sesión e980eddc-7d16-4529-9494-212fe1128dab

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2460 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +--
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +--
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 99 files changed, 8963 insertions(+), 5707 deletions(-)
```

## 2026-07-31 15:14:20 — sesión 7c46b955-340d-425b-9a00-ca730d3c9779

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2565 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +--
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 99 files changed, 9068 insertions(+), 5707 deletions(-)
```

## 2026-07-31 15:15:06 — sesión 1f6c9f05-0c63-4a68-ba4b-a3e086b5d88b

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2670 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 .../practica/[mockId]/LanguagePracticeClient.tsx   |    3 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +---
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +-
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  563 ++++-
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 99 files changed, 9173 insertions(+), 5707 deletions(-)
```

## 2026-08-02 21:28:48 — sesión d98fb70f-4e04-4b26-8020-d87fc265bc06

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2775 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 next.config.ts                                     |    2 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 src/app/(site)/clases-de-frances/page.module.css   |   56 +
 src/app/(site)/clases-de-frances/page.tsx          |   75 +
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   23 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +--
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +-
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  597 ++++-
 src/components/SiteNav.tsx                         |   44 +
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/celpe-bras-set-10.ts                |   13 +-
 src/data/mocks/celpe-bras-set-11.ts                |   13 +-
 src/data/mocks/celpe-bras-set-12.ts                |   13 +-
 src/data/mocks/celpe-bras-set-13.ts                |   13 +-
 src/data/mocks/celpe-bras-set-14.ts                |   13 +-
 src/data/mocks/celpe-bras-set-15.ts                |   13 +-
 src/data/mocks/celpe-bras-set-16.ts                |   13 +-
 src/data/mocks/celpe-bras-set-17.ts                |   13 +-
 src/data/mocks/celpe-bras-set-18.ts                |   13 +-
 src/data/mocks/celpe-bras-set-19.ts                |   13 +-
 src/data/mocks/celpe-bras-set-2.ts                 |   14 +-
 src/data/mocks/celpe-bras-set-20.ts                |   13 +-
 src/data/mocks/celpe-bras-set-3.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-4.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-5.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-6.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-7.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-8.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-9.ts                 |   13 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 src/data/mocks/toefl-set-1.ts                      |    2 +-
 src/data/mocks/toefl-set-10.ts                     |    2 +-
 src/data/mocks/toefl-set-11.ts                     |    2 +-
 src/data/mocks/toefl-set-12.ts                     |    2 +-
 src/data/mocks/toefl-set-13.ts                     |    2 +-
 src/data/mocks/toefl-set-14.ts                     |    2 +-
 src/data/mocks/toefl-set-15.ts                     |    2 +-
 src/data/mocks/toefl-set-16.ts                     |    2 +-
 src/data/mocks/toefl-set-17.ts                     |    2 +-
 src/data/mocks/toefl-set-18.ts                     |    2 +-
 src/data/mocks/toefl-set-19.ts                     |    2 +-
 src/data/mocks/toefl-set-2.ts                      |    2 +-
 src/data/mocks/toefl-set-20.ts                     |    2 +-
 src/data/mocks/toefl-set-3.ts                      |    2 +-
 src/data/mocks/toefl-set-4.ts                      |    2 +-
 src/data/mocks/toefl-set-5.ts                      |    2 +-
 src/data/mocks/toefl-set-6.ts                      |    2 +-
 src/data/mocks/toefl-set-7.ts                      |    2 +-
 src/data/mocks/toefl-set-8.ts                      |    2 +-
 src/data/mocks/toefl-set-9.ts                      |    2 +-
 142 files changed, 9680 insertions(+), 5824 deletions(-)
```

## 2026-08-02 22:58:44 — sesión 4a774000-7c2c-4184-8026-25ef2adb3e3a

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 2923 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 next.config.ts                                     |    2 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 src/app/(site)/clases-de-frances/page.module.css   |   56 +
 src/app/(site)/clases-de-frances/page.tsx          |   75 +
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   23 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +--
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +-
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  597 +++-
 src/components/SiteNav.tsx                         |   44 +
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/celpe-bras-set-10.ts                |   13 +-
 src/data/mocks/celpe-bras-set-11.ts                |   13 +-
 src/data/mocks/celpe-bras-set-12.ts                |   13 +-
 src/data/mocks/celpe-bras-set-13.ts                |   13 +-
 src/data/mocks/celpe-bras-set-14.ts                |   13 +-
 src/data/mocks/celpe-bras-set-15.ts                |   13 +-
 src/data/mocks/celpe-bras-set-16.ts                |   13 +-
 src/data/mocks/celpe-bras-set-17.ts                |   13 +-
 src/data/mocks/celpe-bras-set-18.ts                |   13 +-
 src/data/mocks/celpe-bras-set-19.ts                |   13 +-
 src/data/mocks/celpe-bras-set-2.ts                 |   14 +-
 src/data/mocks/celpe-bras-set-20.ts                |   13 +-
 src/data/mocks/celpe-bras-set-3.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-4.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-5.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-6.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-7.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-8.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-9.ts                 |   13 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 src/data/mocks/toefl-set-1.ts                      |    2 +-
 src/data/mocks/toefl-set-10.ts                     |    2 +-
 src/data/mocks/toefl-set-11.ts                     |    2 +-
 src/data/mocks/toefl-set-12.ts                     |    2 +-
 src/data/mocks/toefl-set-13.ts                     |    2 +-
 src/data/mocks/toefl-set-14.ts                     |    2 +-
 src/data/mocks/toefl-set-15.ts                     |    2 +-
 src/data/mocks/toefl-set-16.ts                     |    2 +-
 src/data/mocks/toefl-set-17.ts                     |    2 +-
 src/data/mocks/toefl-set-18.ts                     |    2 +-
 src/data/mocks/toefl-set-19.ts                     |    2 +-
 src/data/mocks/toefl-set-2.ts                      |    2 +-
 src/data/mocks/toefl-set-20.ts                     |    2 +-
 src/data/mocks/toefl-set-3.ts                      |    2 +-
 src/data/mocks/toefl-set-4.ts                      |    2 +-
 src/data/mocks/toefl-set-5.ts                      |    2 +-
 src/data/mocks/toefl-set-6.ts                      |    2 +-
 src/data/mocks/toefl-set-7.ts                      |    2 +-
 src/data/mocks/toefl-set-8.ts                      |    2 +-
 src/data/mocks/toefl-set-9.ts                      |    2 +-
 142 files changed, 9828 insertions(+), 5824 deletions(-)
```

## 2026-08-02 22:59:33 — sesión 37c77f3b-cc14-4115-8585-38891ede7fed

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 3071 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 next.config.ts                                     |    2 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 src/app/(site)/clases-de-frances/page.module.css   |   56 +
 src/app/(site)/clases-de-frances/page.tsx          |   75 +
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   23 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +--
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +-
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  597 +++-
 src/components/SiteNav.tsx                         |   44 +
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/celpe-bras-set-10.ts                |   13 +-
 src/data/mocks/celpe-bras-set-11.ts                |   13 +-
 src/data/mocks/celpe-bras-set-12.ts                |   13 +-
 src/data/mocks/celpe-bras-set-13.ts                |   13 +-
 src/data/mocks/celpe-bras-set-14.ts                |   13 +-
 src/data/mocks/celpe-bras-set-15.ts                |   13 +-
 src/data/mocks/celpe-bras-set-16.ts                |   13 +-
 src/data/mocks/celpe-bras-set-17.ts                |   13 +-
 src/data/mocks/celpe-bras-set-18.ts                |   13 +-
 src/data/mocks/celpe-bras-set-19.ts                |   13 +-
 src/data/mocks/celpe-bras-set-2.ts                 |   14 +-
 src/data/mocks/celpe-bras-set-20.ts                |   13 +-
 src/data/mocks/celpe-bras-set-3.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-4.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-5.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-6.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-7.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-8.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-9.ts                 |   13 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 src/data/mocks/toefl-set-1.ts                      |    2 +-
 src/data/mocks/toefl-set-10.ts                     |    2 +-
 src/data/mocks/toefl-set-11.ts                     |    2 +-
 src/data/mocks/toefl-set-12.ts                     |    2 +-
 src/data/mocks/toefl-set-13.ts                     |    2 +-
 src/data/mocks/toefl-set-14.ts                     |    2 +-
 src/data/mocks/toefl-set-15.ts                     |    2 +-
 src/data/mocks/toefl-set-16.ts                     |    2 +-
 src/data/mocks/toefl-set-17.ts                     |    2 +-
 src/data/mocks/toefl-set-18.ts                     |    2 +-
 src/data/mocks/toefl-set-19.ts                     |    2 +-
 src/data/mocks/toefl-set-2.ts                      |    2 +-
 src/data/mocks/toefl-set-20.ts                     |    2 +-
 src/data/mocks/toefl-set-3.ts                      |    2 +-
 src/data/mocks/toefl-set-4.ts                      |    2 +-
 src/data/mocks/toefl-set-5.ts                      |    2 +-
 src/data/mocks/toefl-set-6.ts                      |    2 +-
 src/data/mocks/toefl-set-7.ts                      |    2 +-
 src/data/mocks/toefl-set-8.ts                      |    2 +-
 src/data/mocks/toefl-set-9.ts                      |    2 +-
 142 files changed, 9976 insertions(+), 5824 deletions(-)
```

## 2026-08-02 23:12:00 — sesión 6f3f0a6b-5322-412f-a3eb-b9c43be29d5d

```
 .gitignore                                         |   23 +
 docs/REGISTRO-DE-SESIONES.md                       | 3219 ++++++++++++++++++++
 docs/ielts-toefl-audit.md                          |    9 +
 docs/ielts-toefl-content-inventory.json            |    2 +-
 docs/ielts-toefl-migration-plan.md                 |    1 +
 docs/ielts-toefl-route-map.md                      |   40 +-
 next.config.ts                                     |    2 +-
 public/audio/cils/set-1.mp3                        |  Bin 80069529 -> 16014150 bytes
 public/audio/delf/b2-set-1-doc1.mp3                |  Bin 7374054 -> 3687488 bytes
 public/audio/delf/b2-set-1-doc2.mp3                |  Bin 7186390 -> 3593657 bytes
 public/audio/delf/b2-set-1-doc3.mp3                |  Bin 5440575 -> 2720749 bytes
 public/audio/delf/set-2-doc1.mp3                   |  Bin 4493897 -> 2247410 bytes
 public/audio/delf/set-2-doc2.mp3                   |  Bin 5374537 -> 2687730 bytes
 public/audio/delf/set-2-doc3.mp3                   |  Bin 5038916 -> 2519919 bytes
 public/audio/ielts/ielts-listening-set-1.mp3       |  Bin 22113514 -> 11094412 bytes
 public/audio/ielts/ielts-listening-set-2.mp3       |  Bin 22055835 -> 11065572 bytes
 public/audio/ielts/ielts-listening-set-3.mp3       |  Bin 25010807 -> 12543058 bytes
 public/audio/ielts/ielts-listening-set-4.mp3       |  Bin 23382438 -> 11728874 bytes
 .../italiano/a1/it-a1-al-bar-ordinare-un-caffe.mp3 |  Bin 344877 -> 172461 bytes
 .../audio/italiano/a1/it-a1-che-tempo-fa-oggi.mp3  |  Bin 342957 -> 171501 bytes
 .../a1/it-a1-come-arrivare-in-biblioteca.mp3       |  Bin 460077 -> 230061 bytes
 .../italiano/a1/it-a1-cosa-metto-per-la-scuola.mp3 |  Bin 361773 -> 180909 bytes
 .../a1/it-a1-cosa-non-faccio-la-domenica.mp3       |  Bin 352557 -> 176301 bytes
 .../italiano/a1/it-a1-cosa-succede-al-parco.mp3    |  Bin 401709 -> 200877 bytes
 public/audio/italiano/a1/it-a1-il-mio-cane-max.mp3 |  Bin 361773 -> 180909 bytes
 .../italiano/a1/it-a1-il-mio-orario-di-scuola.mp3  |  Bin 368685 -> 184365 bytes
 .../italiano/a1/it-a1-il-mio-pranzo-preferito.mp3  |  Bin 397869 -> 198957 bytes
 .../italiano/a1/it-a1-la-lista-della-spesa.mp3     |  Bin 309933 -> 154989 bytes
 public/audio/italiano/a1/it-a1-la-mia-camera.mp3   |  Bin 321837 -> 160941 bytes
 public/audio/italiano/a1/it-a1-la-mia-citta.mp3    |  Bin 374445 -> 187245 bytes
 public/audio/italiano/a1/it-a1-la-mia-famiglia.mp3 |  Bin 383661 -> 191853 bytes
 .../italiano/a1/it-a1-la-mia-giornata-ideale.mp3   |  Bin 419757 -> 209901 bytes
 public/audio/italiano/a1/it-a1-la-mia-mattina.mp3  |  Bin 349485 -> 174765 bytes
 public/audio/italiano/a1/it-a1-la-nostra-casa.mp3  |  Bin 429357 -> 214701 bytes
 .../italiano/a1/it-a1-le-cose-che-so-fare.mp3      |  Bin 322605 -> 161325 bytes
 .../italiano/a1/it-a1-presentarsi-a-scuola.mp3     |  Bin 307245 -> 153645 bytes
 .../italiano/a1/it-a1-una-giornata-di-lavoro.mp3   |  Bin 379053 -> 189549 bytes
 .../italiano/a1/it-a1-una-telefonata-dove-sei.mp3  |  Bin 333741 -> 166893 bytes
 public/images/david-hero.png                       |  Bin 1851438 -> 0 bytes
 public/images/video-preview.mov                    |  Bin 96524462 -> 0 bytes
 scripts/audit-ielts-routes.mjs                     |   14 +-
 src/app/(site)/clases-de-frances/page.module.css   |   56 +
 src/app/(site)/clases-de-frances/page.tsx          |   75 +
 .../practica/[mockId]/LanguagePracticeClient.tsx   |   23 +-
 src/app/(site)/home/page.tsx                       |   20 +-
 src/app/(site)/leccion/LeccionClient.tsx           |    8 +-
 .../practica/aleman/a1/escritura/Content.tsx       |  201 +-
 .../practica/aleman/a2/escritura/Content.tsx       |  269 +-
 src/app/(site)/practica/aleman/a2/escucha/page.tsx |  180 +-
 .../practica/aleman/b1/escritura/Content.tsx       |  260 +-
 .../practica/coreano/a1/escritura/Content.tsx      |  242 +-
 .../practica/coreano/a2/escritura/Content.tsx      |  218 +-
 .../practica/coreano/b1/escritura/Content.tsx      |  171 +-
 .../practica/frances/a1/escritura/Content.tsx      |  201 +-
 .../practica/frances/a2/escritura/Content.tsx      |  201 +-
 .../practica/frances/b1/escritura/Content.tsx      |  216 +-
 .../ielts/academic/writing/task1/Content.tsx       |    1 +
 .../writing/task1/Task1ApprovedMapVisual.tsx       |    5 +-
 .../writing/task1/Task1ApprovedProcessVisual.tsx   |    4 +-
 .../academic/writing/task1/Task1VisualLab.tsx      |   18 +-
 .../task1/comparaciones/ComparisonsEnglish.tsx     |    4 +-
 .../writing/task1/introduccion/Content.tsx         |  430 +--
 .../Task1IntroductionPracticeEngine.tsx            |    2 +-
 .../ielts/academic/writing/task1/mapas/Content.tsx |    6 +-
 .../academic/writing/task1/pie-charts/Content.tsx  |   10 +-
 .../academic/writing/task1/procesos/Content.tsx    |    4 -
 .../academic/writing/task1/tablas/Content.tsx      |    2 +-
 .../writing/task1/tarea-completa/Content.tsx       |   22 +-
 .../academic/writing/task1/tendencias/Content.tsx  |    4 +-
 .../practica/ingles/a1/escritura/Content.tsx       |  208 +-
 .../practica/ingles/a2/escritura/Content.tsx       |  203 +-
 .../practica/ingles/b1/escritura/Content.tsx       |  203 +-
 .../practica/italiano/a1/escritura/Content.tsx     |  178 +-
 .../practica/italiano/a2/escritura/Content.tsx     |  203 +-
 .../practica/italiano/b1/escritura/Content.tsx     |  208 +-
 .../practica/japones/a1/escritura/Content.tsx      |  236 +-
 .../practica/japones/a2/escritura/Content.tsx      |  219 +-
 .../practica/japones/b1/escritura/Content.tsx      |  171 +-
 .../practica/portugues/a1/escritura/Content.tsx    |  201 +-
 .../practica/portugues/a2/escritura/Content.tsx    |  201 +-
 .../practica/portugues/b1/escritura/Content.tsx    |  194 +-
 .../(site)/practica/ruso/a1/escritura/Content.tsx  |  275 +-
 .../(site)/practica/ruso/a2/escritura/Content.tsx  |  218 +-
 .../(site)/practica/ruso/b1/escritura/Content.tsx  |  171 +-
 src/app/globals.css                                |  597 +++-
 src/components/SiteNav.tsx                         |   44 +
 src/components/exam-runner/primitives.tsx          |    3 +-
 src/data/mocks/celpe-bras-set-10.ts                |   13 +-
 src/data/mocks/celpe-bras-set-11.ts                |   13 +-
 src/data/mocks/celpe-bras-set-12.ts                |   13 +-
 src/data/mocks/celpe-bras-set-13.ts                |   13 +-
 src/data/mocks/celpe-bras-set-14.ts                |   13 +-
 src/data/mocks/celpe-bras-set-15.ts                |   13 +-
 src/data/mocks/celpe-bras-set-16.ts                |   13 +-
 src/data/mocks/celpe-bras-set-17.ts                |   13 +-
 src/data/mocks/celpe-bras-set-18.ts                |   13 +-
 src/data/mocks/celpe-bras-set-19.ts                |   13 +-
 src/data/mocks/celpe-bras-set-2.ts                 |   14 +-
 src/data/mocks/celpe-bras-set-20.ts                |   13 +-
 src/data/mocks/celpe-bras-set-3.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-4.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-5.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-6.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-7.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-8.ts                 |   13 +-
 src/data/mocks/celpe-bras-set-9.ts                 |   13 +-
 src/data/mocks/ielts-set-10.ts                     |  345 ++-
 src/data/mocks/ielts-set-11.ts                     |  360 ++-
 src/data/mocks/ielts-set-12.ts                     |  372 ++-
 src/data/mocks/ielts-set-13.ts                     |  351 ++-
 src/data/mocks/ielts-set-14.ts                     |  347 ++-
 src/data/mocks/ielts-set-15.ts                     |  349 ++-
 src/data/mocks/ielts-set-16.ts                     |  363 ++-
 src/data/mocks/ielts-set-17.ts                     |  356 ++-
 src/data/mocks/ielts-set-18.ts                     |  359 ++-
 src/data/mocks/ielts-set-19.ts                     |  354 ++-
 src/data/mocks/ielts-set-20.ts                     |  358 ++-
 src/data/mocks/ielts-set-5.ts                      |  355 ++-
 src/data/mocks/ielts-set-6.ts                      |  363 ++-
 src/data/mocks/ielts-set-7.ts                      |  383 ++-
 src/data/mocks/ielts-set-8.ts                      |  382 ++-
 src/data/mocks/ielts-set-9.ts                      |  367 ++-
 src/data/mocks/toefl-set-1.ts                      |    2 +-
 src/data/mocks/toefl-set-10.ts                     |    2 +-
 src/data/mocks/toefl-set-11.ts                     |    2 +-
 src/data/mocks/toefl-set-12.ts                     |    2 +-
 src/data/mocks/toefl-set-13.ts                     |    2 +-
 src/data/mocks/toefl-set-14.ts                     |    2 +-
 src/data/mocks/toefl-set-15.ts                     |    2 +-
 src/data/mocks/toefl-set-16.ts                     |    2 +-
 src/data/mocks/toefl-set-17.ts                     |    2 +-
 src/data/mocks/toefl-set-18.ts                     |    2 +-
 src/data/mocks/toefl-set-19.ts                     |    2 +-
 src/data/mocks/toefl-set-2.ts                      |    2 +-
 src/data/mocks/toefl-set-20.ts                     |    2 +-
 src/data/mocks/toefl-set-3.ts                      |    2 +-
 src/data/mocks/toefl-set-4.ts                      |    2 +-
 src/data/mocks/toefl-set-5.ts                      |    2 +-
 src/data/mocks/toefl-set-6.ts                      |    2 +-
 src/data/mocks/toefl-set-7.ts                      |    2 +-
 src/data/mocks/toefl-set-8.ts                      |    2 +-
 src/data/mocks/toefl-set-9.ts                      |    2 +-
 142 files changed, 10124 insertions(+), 5824 deletions(-)
```
