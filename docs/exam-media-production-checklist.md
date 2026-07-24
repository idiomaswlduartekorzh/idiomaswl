# Checklist de producción de medios (audios e imágenes) — exámenes

Inventario consolidado de audios e imágenes **pendientes de producir** para los mock exams.
Todo el contenido ya está montado en el código referenciando estas rutas; solo falta crear el
archivo y dejarlo caer en la ruta destino. Los audios cortos se generan con el pipeline TTS
propio (Chatterbox, `~/Developer/chatterbox-tts`); los diálogos largos o voces nativas
auténticas se sacan de fuentes oficiales. No commitear binarios pesados sin revisar `.vercelignore`.

Convención de voces TOEFL 2026 (blueprint oficial): acentos balanceados US/Canadá, Reino Unido,
Australia; voces AI-generadas y a veces actores; conversaciones con 2 hablantes distintos.
El audio se reproduce **una sola vez** en el examen real.

---

## TOEFL — Set 5 (`toefl-set-5.ts`, formato 2026)

Carpeta destino: `public/audio/toefl/set-5/`

### Listening — Listen and Choose a Response (5 audios, intercambio único ~1 frase, 2 voces)
Cada audio es un **prompt hablado**; el estudiante elige la mejor respuesta. La respuesta correcta
del mock depende de este guion — **grabar exactamente el prompt indicado**.

| Archivo | Guion a grabar (prompt) | Respuesta correcta (en el mock) |
|---|---|---|
| `listen-choose-1.mp3` | "Excuse me, do you know where the study group is meeting?" | "Sure, the meeting is in room 204." |
| `listen-choose-2.mp3` | "Would you like to come to the concert with us tonight?" | "Yes, I'd love to — what time does it start?" |
| `listen-choose-3.mp3` | "Where can I find the biology textbooks?" | "I think it's on the second shelf, next to the dictionaries." |
| `listen-choose-4.mp3` | "Maybe we could change our project topic to renewable energy." | "That's a great idea — let's ask the professor first." |
| `listen-choose-5.mp3` | "You look tired — was your trip difficult?" | "Yes, my flight was delayed by two hours." |

### Listening — pasajes largos (guion = `transcript` en el mock)
| Archivo | Tipo | Voces | Fuente del guion |
|---|---|---|---|
| `conversation.mp3` | Conversación estudiante–estudiante | 2 (M + F) | `transcript` de la sección "Listen to a Conversation" en `toefl-set-5.ts` |
| `announcement.mp3` | Anuncio de campus | 1 | `transcript` de la sección "Listen to an Announcement" |
| `academic-talk.mp3` | Lecture (keystone species) | 1 (profesor) | `transcript` de la sección "Listen to an Academic Talk" |

### Speaking — Listen and Repeat (5 audios, oración a repetir; suben en longitud)
Guion = `targetSentence` de cada ítem. Ritmo natural, articulación clara.
| Archivo | Oración a grabar |
|---|---|
| `repeat-1.mp3` | "The train leaves at nine." |
| `repeat-2.mp3` | "She bought a new umbrella because it was raining." |
| `repeat-3.mp3` | "Although the exam was difficult, most of the students passed it." |
| `repeat-4.mp3` | "The professor who taught the seminar last year has moved to another university." |
| `repeat-5.mp3` | "If the committee approves the proposal, construction of the new library will begin in the spring." |

### Imágenes — Set 5
El blueprint 2026 muestra imagen del/los hablante(s) en Listening y Speaking (foto/esquema).
Opcional para MVP (el examen funciona sin ellas). Si se producen:
| Ruta | Prompt / descripción |
|---|---|
| `public/images/toefl/set-5/speaker-conversation.png` | Dos estudiantes universitarios conversando en un campus, estilo foto neutra, sin texto |
| `public/images/toefl/set-5/speaker-announcement.png` | Persona haciendo un anuncio por altavoz / oficina de campus, neutra |
| `public/images/toefl/set-5/speaker-lecture.png` | Profesor/a frente a una clase, neutra |

**Total Set 5: 13 audios** (5 listen-choose + 3 pasajes + 5 repeat) + 3 imágenes opcionales.

---

## TOEFL — Set 6 (`toefl-set-6.ts`, formato 2026)

Carpeta destino: `public/audio/toefl/set-6/`

### Listen and Choose a Response (5 audios, prompt hablado ~1 frase, 2 voces)
| Archivo | Guion a grabar (prompt) | Respuesta correcta |
|---|---|---|
| `listen-choose-1.mp3` | "Excuse me, where is the writing center?" | "On the third floor, next to the elevator." |
| `listen-choose-2.mp3` | "Do you want to join us for the hike on Saturday?" | "Sorry, I can't — I have to work on Saturday." |
| `listen-choose-3.mp3` | "How do you usually get to campus?" | "I usually take the number 12 bus." |
| `listen-choose-4.mp3` | "I'm having trouble moving all this equipment." | "Sure, I can help you carry those boxes." |
| `listen-choose-5.mp3` | "Did you manage to finish the assignment?" | "Yes, I finally finished it last night." |

### Pasajes largos (guion = `transcript` en el mock)
| Archivo | Tipo | Voces | Fuente |
|---|---|---|---|
| `conversation.mp3` | Conversación estudiante–profesor (essay topic) | 2 (F estudiante + M profesor) | `transcript` "Listen to a Conversation" |
| `announcement.mp3` | Anuncio del Club Fair | 1 | `transcript` "Listen to an Announcement" |
| `academic-talk.mp3` | Lecture (por qué olvidamos) | 1 (profesor) | `transcript` "Listen to an Academic Talk" |

### Listen and Repeat (5 audios; guion = `targetSentence`)
| Archivo | Oración |
|---|---|
| `repeat-1.mp3` | "The store opens at eight." |
| `repeat-2.mp3` | "We missed the bus, so we walked to class." |
| `repeat-3.mp3` | "The scientists collected samples from three different rivers." |
| `repeat-4.mp3` | "The novel that we read for class was translated from Portuguese." |
| `repeat-5.mp3` | "Before the museum opened to the public, the paintings were carefully restored by experts." |

**Total Set 6: 13 audios.** Imágenes opcionales de hablante como en Set 5 (`public/images/toefl/set-6/`).

---

## TOEFL — Sets 7 y 8 (`toefl-set-7.ts`, `toefl-set-8.ts`, formato 2026)

Cada set = **13 audios** con la misma estructura que Sets 5–6:
- `public/audio/toefl/set-7/`: `listen-choose-1..5.mp3`, `conversation.mp3`, `announcement.mp3`, `academic-talk.mp3`, `repeat-1..5.mp3`.
- `public/audio/toefl/set-8/`: idem.

Guiones: los 5 `listen-choose` = el **prompt** que corresponde a la respuesta correcta de cada ítem
(ver opciones en el mock); los 3 pasajes = los `transcript` de cada sección; los 5 `repeat` = los
`targetSentence`. Todos los guiones ya están en los archivos de datos; basta grabarlos a esas rutas.

---

## TOEFL — Sets 9 y 10 (`toefl-set-9.ts`, `toefl-set-10.ts`, formato 2026)
Cada uno = **13 audios** en `public/audio/toefl/set-9/` y `.../set-10/` con la misma estructura
(`listen-choose-1..5`, `conversation`, `announcement`, `academic-talk`, `repeat-1..5`). Guiones ya en los datos.

---

## TOEFL — Sets 11–20 (`toefl-set-11..20.ts`, formato 2026)

Los diez sets siguen el mismo patrón que Sets 5–10: **13 audios cada uno** en
`public/audio/toefl/set-N/` → `listen-choose-1..5.mp3`, `conversation.mp3`,
`announcement.mp3`, `academic-talk.mp3`, `repeat-1..5.mp3`.

Guiones ya presentes en cada archivo de datos:
- `listen-choose-*` → el **prompt** que corresponde a la respuesta correcta de cada ítem (ver opciones del mock).
- `conversation` / `announcement` / `academic-talk` → el `transcript` de cada sección.
- `repeat-*` → el `targetSentence` de cada ítem.

**Total TOEFL formato 2026 (sets 5–20): 16 sets × 13 audios = 208 audios** por producir.
Voces: acentos balanceados US/CA, UK, AU; conversación con 2 hablantes; audio se reproduce una vez.

---

## TOEFL — Sets 1–4 (migrados al formato 2026)

`toefl-set-1..4.ts` reescritos del formato viejo (0–120) al formato 2026. Mantienen sus IDs/URLs
(`/examenes/toefl/practica/set-1..4`) para no romper SEO. Cada uno = **13 audios** en
`public/audio/toefl/set-1..4/` con la misma estructura (`listen-choose-1..5`, `conversation`,
`announcement`, `academic-talk`, `repeat-1..5`); guiones ya en los datos.

**✅ TOEFL COMPLETO: los 20 sets (1–20) en formato oficial 2026 = 20 × 13 = 260 audios por producir.**

---

## CELPE-Bras (`celpe-bras-set-N.ts`, formato oficial INEP)

Estructura por simulado: 4 Tarefas de produção escrita (Tarefa 1 = vídeo, Tarefa 2 = áudio,
Tarefas 3–4 = texto impresso) + Parte Oral (3 elementos provocadores). Conteúdo **original** WeLearn.

Medios por set (`public/audio/celpe-bras/set-N/`, `public/images/celpe-bras/set-N/`):
- **Tarefa 1** — vídeo-reportagem (~3 min). El estímulo está descrito en el campo `stimulus`;
  producir un vídeo/áudio original o mantener solo la descripción textual (funciona sin asset).
- **Tarefa 2** — `tarefa-2.mp3`: entrevista de rádio. Guion = `transcript` del set (produce vía TTS, voces PT-BR).
- **Parte Oral** — imágenes de los elementos provocadores (opcionales; descritas en `cueCard`).

**✅ CELPE-Bras COMPLETO: los 20 sets (1–20) montados y verificados.**
Medios por set: Tarefa 2 = `tarefa-2.mp3` (guion en `transcript`, voces PT-BR); Tarefa 1 = vídeo
(descrito en `stimulus`, opcional producir). Total: 20 áudios de entrevista + vídeos/imágenes opcionales.

---

## Goethe-Zertifikat (`goethe-<nivel>-set-N.ts`, formato Modellsatz)

Estructura por nivel: Hören · Lesen · Schreiben · Sprechen. Conteúdo **original** WeLearn.
Audios del módulo Hören en `public/audio/goethe/<nivel>-<n>/` (p. ej. `a1-1/hoeren-teil1.mp3`,
`.../hoeren-teil2.mp3`, `.../hoeren-teil3.mp3`). Guiones ya en el campo `transcript` de cada sección
Hören → grabar con voces DE nativas (varios hablantes en los diálogos). Sprechen/Schreiben no llevan audio.

**✅ Goethe COMPLETO — A1–C1, 25 Übungstests (5 por nivel).** Audios Hören por set:
- A1/A2: `hoeren-teil1..3.mp3` (3 c/u).
- B1: `hoeren-teil1..2.mp3` (2 c/u).
- B2/C1: `hoeren-teil1..2.mp3` (2 c/u, textos más largos: Diskussion + Vortrag).
Guiones en el campo `transcript` de cada sección Hören → grabar con voces DE nativas (varios hablantes en diálogos/discusiones).

---

## DELF (`delf-<nivel>-set-N.ts`, formato CIEP) — COMPLETO A1–B2

Estructura por nivel: Compréhension de l'oral · écrits · Production écrite · orale. Conteúdo **original** WeLearn.
Audios CO en `public/audio/delf/<nivel>-<n>/` (p. ej. `a1-1/co-ex1.mp3`, `b2-4/co-ex1.mp3`, `.../co-ex2.mp3`).
Guiones ya en el campo `transcript`/`audioUrl` de cada sección de escucha → grabar con voces FR nativas
(varios hablantes en interviews/débats). Production écrite/orale no llevan audio.

**✅ DELF COMPLETO — A1(5) · A2(5) · B1(5) · B2(5).** Niveles B1/B2 con CO en 2 documentos
(interview + reportage) por set.

---

## CILS / CELI (`cils-celi-<nivel>-set-N.ts`, formato Università per Stranieri di Siena) — COMPLETO A2–C1

Estructura por nivel: Ascolto · Lettura · Analisi (grammatica/lessico) · Scrittura ×2 · Parlato.
Conteúdo **original** WeLearn. Un solo audio Ascolto por set en `public/audio/cils/<nivel>-<n>/ascolto.mp3`
(p. ej. `a2-1/ascolto.mp3`, `cils-b2-3/…` → ruta `b2-3/ascolto.mp3`, `c1-1/ascolto.mp3`).
Guiones ya en el campo `transcript` (2–3 testi: dialoghi, annunci, interviste, conferenze) → grabar con
voces IT nativas (varios hablantes en los dialoghi). Scrittura/Parlato no llevan audio.

**✅ CILS COMPLETO — A2(5) · B1(5, set-1 legacy + b1-2..5) · B2(5, ids `cils-b2-1..5`) · C1(5, ids `cils-c1-1..5`).**
Dificultad de los testi Ascolto creciente por nivel (A2 = scambi quotidiani; C1 = conferenze e dibattiti astratti).

---

## TOPIK I (`topik-set-N.ts`, formato NIIED) — COMPLETO sets 2–10

TOPIK I oficial = solo 듣기 (Escucha) + 읽기 (Lectura); **no tiene 쓰기 ni oral** (esos son de TOPIK II).
Conteúdo **original** WeLearn en coreano. Un audio 듣기 por set en `public/audio/topik/set-N/du_gi.mp3`
(guion en el campo `transcript`: respuestas cortas, avisos/방송, diálogos → grabar con voces KO nativas,
2 hablantes en los diálogos). 읽기 no lleva audio. set-1 sigue siendo el **diagnóstico-imán de leads**
(TOPIKPracticeClient, sin timer, ruteo en `page.tsx`); sets 2–10 son simulacros completos en el runner unificado.

**✅ TOPIK COMPLETO — sets 2–10 (9 simulacros), verificados (0 errores, rutas 200).** Cada set:
듣기 (10 ítems: 대답 고르기 + 방송 + 대화/장소/화제) + 읽기 (15 ítems: 빈칸·화제·안내문·지문).

---

## Pendiente (se irá completando por lote)

- **DELF**: bug histórico — `delf-dalf-set-1.ts` referencia `public/audio/delf/set-1-doc1.mp3` y
  `set-1-doc2.mp3` que no existen. Guiones = los `transcript`/documentos de esa sección.
- **Cambridge B2**: 40 audios ya existen en `public/audio/cambridge-b2/mock1..10/` pero no están
  cableados en los datos (transcript-only). Tarea de wiring, no de producción.
