# TOEFL iBT — Formato oficial vigente (actualización 21 enero 2026)

> Fuente oficial: ETS — https://www.ets.org/toefl/test-takers/ibt/about/content.html
> Blueprint & Specifications 2026: https://www.eu.ets.org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf
> Verificado: 2026-07-20. **Toda expansión de contenido TOEFL debe cumplir 100% este blueprint** (regla del proyecto: nada de formato antiguo ni genérico).

El TOEFL iBT cambió de estructura el **21 de enero de 2026**. Es **adaptativo por etapas** en Reading y Listening (router + módulo lower/upper). Writing y Speaking son lineales. Total: **120 ítems** (108 machine-scored + 12 AI-scored). Duración test: **1 h 23 – 1 h 29 min**.

⚠️ Los sets TOEFL previos del repo (`toefl-set-1..4.ts`) usan el **formato antiguo descontinuado** (3 reading passages de 10, 205 min, Independent Speaking, Integrated Writing 150-225, score 0-120). Quedan como **legacy** y deben migrarse a este formato.

## Reading — 50 ítems, ~18-21 min (adaptativo)
| Task type | Ítems | CEFR | Formato |
|---|---|---|---|
| **Complete the Words** | 30 | B1-C1+ | Completar palabras con letras faltantes en huecos predecibles de oraciones (orden de palabras + ortografía + comprensión). Machine, 1 pt/ítem |
| **Read in Daily Life** | 5-15 | A1-C1 | Textos cortos no académicos (letrero, menú, email, post). Sets de 2 y 3 ítems. MCQ |
| **Read an Academic Passage** | 5-15 | B1-C2 | Texto académico: idea principal, detalles, inferencia, estructura retórica. MCQ |

Textos fáciles 15-50 palabras; complejos hasta ~200. Todo el texto queda visible mientras se responde.

## Listening — 47 ítems, ~18 min (adaptativo)
Audio se reproduce **una sola vez**. Cada estímulo lleva imagen del/los hablante(s).
| Task type | Ítems | CEFR | Formato |
|---|---|---|---|
| **Listen and Choose a Response** | 15-19 | A1-B2 | Intercambio único entre 2 personas → elegir la respuesta apropiada. MCQ. Audio breve (≤6 sílabas tónicas) |
| **Listen to a Conversation** | 10 | A2-C1 | Conversación corta → ítems. MCQ |
| **Listen to an Announcement** | 6-10 | A2-C1 | Anuncio de clase/campus. MCQ |
| **Listen to an Academic Talk** | 8-16 | A2-C2 | Lecture hasta 250 palabras. MCQ |

Audio intermedio 35-100 palabras. Acentos US/Canadá, Australia, Reino Unido; voces AI-generadas y a veces actores.

## Writing — 12 ítems, ~23 min (lineal)
| Task type | Ítems | CEFR | Score |
|---|---|---|---|
| **Build a Sentence** | 10 | A1-C2 | Reordenar palabras en una oración gramatical. Machine, 1 pt/ítem |
| **Write an Email** | 1 | B1-C2 | Email multi-oración, tono adecuado a audiencia/propósito. AI, máx 5 |
| **Write for an Academic Discussion** | 1 | B1-C2 | Párrafo académico con argumento apoyado. AI, máx 5 |

## Speaking — 11 ítems, ~8 min (lineal)
| Task type | Ítems | CEFR | Score |
|---|---|---|---|
| **Listen and Repeat** | 7 | A1-C2 | Repetir oraciones habladas con precisión (crecen en longitud/complejidad). AI, máx 5. Audio-prompt por ítem |
| **Take an Interview** | 4 | A1-C2 | Responder preguntas de entrevista con elaboración (descripción, opinión, explicación, predicción, narración). AI, máx 5 |

Cada tarea abre con escenario aural + impreso; incluye imagen/mapa/foto del hablante.

## Scoring
- **4 puntajes de sección + total en escala 1–6** (el total es el promedio de las 4 secciones redondeado al medio punto más cercano; p.ej. 5.125 → 5).
- Durante transición de 2 años (desde ene-2026) se reporta además un **total comparable 0–120**.
- Reading/Listening/Build a Sentence: 1 pt máx por ítem (machine). Email/Academic Discussion/Listen and Repeat/Take an Interview: 5 pts máx (AI).

## Implicaciones para el código (idiomaswl)
Tipos de pregunta NUEVOS necesarios en `src/data/mocks/types.ts` + renderers:
- `wordcomplete` (Complete the Words) — oración con huecos de palabra parcial.
- `sentencebuild` (Build a Sentence) — fichas de palabras a ordenar.
- `repeat` (Listen and Repeat) — audio-prompt por ítem + oración objetivo.
Reutilizan tipos existentes: Read in Daily Life / Academic Passage / todo Listening → `mcq` (+ passage/audioUrl); Write an Email / Academic Discussion → `write`; Take an Interview → `speak`.
Scoring nuevo 1–6 por sección para los mocks en formato 2026 (distinguir de los legacy 0–120).
