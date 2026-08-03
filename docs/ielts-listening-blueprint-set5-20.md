# IELTS Listening — Blueprint de Producción (Sets 5–20)

> **Para:** Claude Cowork (agente que generará guiones + audios).
> **Objetivo:** producir el **Listening** que falta en los sets 5–20 replicando **exactamente** la forma, complejidad y duración de los sets 1–4 (los únicos con audio real).
> **Regla de oro:** todo lo que aquí se especifica está **medido** sobre los sets 1–4 ya publicados. No inventar formato nuevo. Si dudas, copia el patrón de los sets 1–4.

---

## 0. Estado actual y alcance del trabajo

| | Sets 1–4 (gratis) | Sets 5–20 (Pro) |
|---|---|---|
| Reading | ✅ 3 passages | ✅ 3 passages (ya existe) |
| Writing | ✅ Task 1 + 2 | ✅ Task 1 + 2 (ya existe, con gráfica SVG) |
| Speaking | ✅ | ✅ (ya existe) |
| **Listening** | ✅ **4 secciones + audio real** | ❌ **stub `comingSoon`, sin audio** |

En cada set 5–20 la sección de Listening es hoy un marcador de posición:

```ts
{ part: 1, skill: 'listening', comingSoon: true, title: 'Listening — En Construcción', questions: [] }
```

**Hay que producir, por cada set 5–20 (×16):**
1. **4 secciones de Listening** (transcript + 40 preguntas + answer keys) en `src/data/mocks/ielts-set-N.ts`.
2. **1 archivo de audio** `public/audio/ielts/ielts-listening-set-N.mp3` (examen completo, con narración y pausas).
3. Ajustar `timeMinutes` del set de `120` → `164`.

Los temas de Listening son **independientes** de los de Reading/Writing (así es el IELTS real). No reutilizar los textos de Reading.

---

## 1. Anatomía verificada de los sets 1–4 (la plantilla canónica)

El IELTS Listening = **40 preguntas**, **4 secciones de 10 preguntas** cada una, numeradas **1–10 / 11–20 / 21–30 / 31–40** de corrido. Este es el patrón exacto que usan los 4 sets existentes:

| Sección | Q# | Contexto / registro | Nº voces | Tipos de pregunta | Rúbrica (word limit) |
|---|---|---|---|---|---|
| **1** | 1–10 | Conversación cotidiana / transaccional (reserva, inscripción, consulta) | **2** (agente + cliente) | `formgroup` (notas) Q1–6/7 + `tablegroup` Q7/8–10 | **ONE WORD AND/OR A NUMBER** |
| **2** | 11–20 | Monólogo informativo (charla, anuncio, audioguía) | **1** | `multiselect` (elige DOS) Q11–12 + `formgroup` (notas) Q13–20 | **NO MORE THAN TWO WORDS (AND/OR A NUMBER)** |
| **3** | 21–30 | Discusión académica (tutor + alumnos) | **2–3** | 5× `mcq` (3 opciones) Q21–25 + `formgroup` (notas) Q26–30 | **ONE WORD ONLY** |
| **4** | 31–40 | Clase / conferencia académica | **1** | `formgroup` (note completion) Q31–40 | **ONE WORD ONLY** |

**Variación permitida** (observada en set-4): la Sección 3 puede ser hasta 7× `mcq`, y la Sección 4 puede mezclar `formgroup` + `mcq`. Lo **no negociable**: exactamente **10 preguntas por sección**, **40 en total**, numeración corrida, y los tipos de arriba (no introducir tipos ajenos al inventario del proyecto — ver §6).

### 1.1 Rasgos obligatorios de la Sección 1 (los que la hacen "IELTS")

En los 4 sets, la Sección 1 **siempre** incluye, dentro del diálogo:
- Un **nombre deletreado** letra por letra (ej. `P-O-P-P-Y-F-I-E-L-D`).
- Un **número largo** dictado (teléfono / código postal / precio): ej. `077 8664 3091`, `BH5 2OP`.
- Un **campo `example`** resuelto ya dado al estudiante (ej. `Name: Andrea Brown`).
- Al menos un **distractor auto-corregido**: el hablante dice una opción y la rectifica ("not the tent — a lodge", "not interested in shopping … the beach"). La respuesta correcta es siempre la **final**.

### 1.2 Presupuesto de palabras y tiempo (MEDIDO sobre sets 1–4)

| Métrica | Valor medido (sets 1–4) | **Objetivo para 5–20** |
|---|---|---|
| Palabras del transcript por sección | 224–397 | **320–380 palabras** |
| Palabras del transcript por set (4 secc.) | 1.221–1.443 | **1.300–1.450 palabras** |
| Ritmo de habla | ~130–140 wpm, natural y claro | igual |
| Habla pura (sin pausas) | ~9–10 min | ~9–10 min |
| **Duración del mp3 final** (con narración + pausas) | **22–26 min** | **23–26 min** |

> El salto de ~10 min de habla a ~24 min de audio es **narración + pausas de examen** (§2). Si el audio te queda en ~10–12 min, **falta la narración y las pausas** → error de forma y de tiempo.

### 1.3 Convención de answer keys (crítico para autocorrección)

- `answers` es un **array de variantes aceptadas**, case-insensitive. Incluir siempre:
  - singular **y** plural cuando aplique (`['meal','meals']`),
  - con y sin símbolo/coma (`['685','£685']`, `['1260','1,260']`),
  - sinónimos válidos que digan lo mismo (`['programme','program','schedule']`).
- Cada respuesta debe **aparecer literalmente** en el transcript, en el **mismo orden** que las preguntas. El estudiante escribe una palabra que **oyó tal cual**.
- `maxWords` coherente con la rúbrica de la sección (1 ó 2).
- Nunca poner en el hueco una palabra que exceda la rúbrica (si es "ONE WORD ONLY", la respuesta no puede ser de 2 palabras).

---

## 2. Construcción del AUDIO (lo más importante para "cumplir en tiempo")

El mp3 **no es** el diálogo leído. Es un **examen completo** con voz de narrador, pausas de previsualización y pausas de revisión. Esto se verificó midiendo los silencios del audio de set-1:

- Pausa de **~30 s** antes de cada bloque de preguntas ("first you have some time to look at questions…").
- Pausa de **~40 s** entre secciones ("…end of Section X. You now have half a minute to check your answers.").
- Micro-pausas de **3–4 s** entre grupos/oraciones dentro de la sección.

### 2.1 Plantilla del "audio master script" (narración exacta + marcas de pausa)

Genera el audio siguiendo esta estructura. `[PAUSA Ns]` = silencio de N segundos a insertar en el ensamblado.

```
[NARRADOR] "This is the IELTS Listening test. Section 1.
           You will hear a conversation between <A> and <B>.
           First, you have some time to look at questions 1 to 6."
[PAUSA 30s]
[NARRADOR] "Now listen carefully and answer questions 1 to 6."
<< AUDIO DIÁLOGO: primera mitad de la Sección 1 (cubre Q1–6) >>
[PAUSA 3s]
[NARRADOR] "Before you hear the rest of the conversation, you have some time
           to look at questions 7 to 10."
[PAUSA 20s]
<< AUDIO DIÁLOGO: segunda mitad de la Sección 1 (cubre Q7–10) >>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 1. You now have half a minute to check
           your answers."
[PAUSA 30s]
[NARRADOR] "Now turn to Section 2." → (repite el patrón con su narración propia)
...
[NARRADOR final] "That is the end of the Listening test."
```

- **Secciones 2 y 4** (monólogo): un solo bloque de preview de ~40–45 s (10 preguntas de una) y luego el audio completo, sin corte a la mitad.
- **Sección 3** (discusión): preview ~30 s para Q21–25 (mcq), micro-pausa, luego el resto para Q26–30.
- En el IELTS real cada grabación se reproduce **una sola vez** (no se repite).

### 2.2 Voces y acento

- **Narrador:** una voz neutra constante (British RP) para toda la narración de instrucciones de los 16 sets.
- **Diálogos:** una voz **distinta por personaje** y coherente con el rol (recepcionista, profesor, estudiante). En una discusión de 3 personas, 3 voces claramente diferenciables.
- **Acentos:** IELTS usa variedad (British, Australian, a veces North American/NZ). Alternar entre sets para realismo. Dentro de un mismo set, mantener las voces consistentes.
- Sin música, sin efectos de sonido, sin reverberación excesiva. Habla clara, ritmo natural.

### 2.3 Motor de audio y ensamblado (opciones disponibles en el entorno)

Cualquiera de estas sirve; elegir según disponibilidad:
- **ElevenLabs / Higgsfield `generate_audio`** (multi-voz, buena prosodia) — recomendado para las voces.
- **Chatterbox TTS local** (`~/Developer/chatterbox-tts`, gratis, permite clonación) — para volumen alto sin costo.
- **Ensamblado:** generar cada tramo (narración y diálogo) como clip, y concatenar con las pausas usando `ffmpeg`:
  ```bash
  # generar silencios
  ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 30 pause30.wav
  # concatenar clips + pausas (concat list) y exportar mp3
  ffmpeg -f concat -safe 0 -i lista.txt -c:a libmp3lame -q:a 4 ielts-listening-set-N.mp3
  ```
- Verificar al final: `ffprobe -show_entries format=duration` → debe caer en **23–26 min**.

---

## 3. Receta paso a paso para CADA set (5–20)

1. **Elegir 4 temas** de la tabla §4 (o equivalentes), uno por sección, distintos de los del Reading del mismo set.
2. **Escribir los 4 transcripts** respetando: registro/roles de la §1, presupuesto **320–380 palabras/sección**, rasgos obligatorios de la Sección 1 (§1.1), y sembrando en el texto las palabras exactas que serán respuesta.
3. **Derivar las 40 preguntas** con el mapping de tipos de la §1 (formgroup/tablegroup/multiselect/mcq), numeración 1→40, y answer keys con variantes (§1.3).
4. **QA de contenido** con la checklist §5 (respuestas literales, en orden, dentro de la rúbrica, con distractores).
5. **Escribir el audio master script** (§2.1) intercalando narración + pausas.
6. **Generar TTS + ensamblar** → `public/audio/ielts/ielts-listening-set-N.mp3`. Confirmar duración 23–26 min.
7. **Cablear los datos** (§6): reemplazar el stub `comingSoon` por las 4 secciones reales y poner `audioUrl` en las 4. Subir `timeMinutes` a `164`.

---

## 4. Temas sugeridos para sets 5–20 (16 × 4 secciones)

Everyday (S1) · Monólogo informativo (S2) · Discusión académica (S3) · Clase (S4). Son sugerencias coherentes con el IELTS; se pueden ajustar mientras respeten el registro de cada sección.

| Set | S1 — Conversación cotidiana | S2 — Monólogo | S3 — Discusión | S4 — Clase |
|---|---|---|---|---|
| 5 | Booking a guided city walk | Volunteer induction talk | Field-trip planning | Urban beekeeping |
| 6 | Renting a bicycle | New leisure-centre tour | Marketing coursework | History of tea |
| 7 | Enrolling in an evening course | Museum audio guide | Psychology experiment design | Sleep science |
| 8 | Reporting a lost item | Community festival briefing | Business plan tutorial | The history of clocks |
| 9 | Hotel reservation | Company induction | Nutrition study project | Volcanoes |
| 10 | Job-agency registration | Library services talk | Architecture presentation | Migration of whales |
| 11 | Booking a photography workshop | Theatre backstage tour | Environmental essay review | The Roman aqueducts |
| 12 | Car-park / travel-card query | Farm open-day talk | Robotics group project | Human colour vision |
| 13 | Signing up for a gym | Airport orientation | Tourism dissertation chat | Antarctic research |
| 14 | Booking a wedding venue | Charity fun-run briefing | Geology fieldwork plan | The history of paper money |
| 15 | Ordering from a catering firm | University clubs fair talk | Education survey design | Coral bleaching |
| 16 | Registering children for camp | Recycling scheme launch | Engineering prototype review | Bird navigation |
| 17 | Booking a home repair | Art gallery guided tour | Sports-science study | The printing press |
| 18 | Joining a book club | Nature reserve welcome talk | Linguistics presentation | Desert ecosystems |
| 19 | Booking a language exchange | Science-museum tour | Film-studies project | Renewable energy storage |
| 20 | Reserving a study room | Transport-museum guide | Public-health campaign plan | The history of chocolate |

---

## 5. Checklist de QA — "para no cometer errores" (forma · complejidad · tiempo)

Correr esta lista por cada set **antes** de dar por terminado:

**Forma**
- [ ] 4 secciones, 40 preguntas, numeración corrida 1–10 / 11–20 / 21–30 / 31–40.
- [ ] Tipos por sección según §1 (S1 formgroup+tablegroup; S2 multiselect+formgroup; S3 mcq×5+formgroup; S4 formgroup).
- [ ] Rúbricas correctas por sección (S1 "ONE WORD AND/OR A NUMBER"; S2 "NO MORE THAN TWO WORDS…"; S3/S4 "ONE WORD ONLY").
- [ ] S1 con `example`, nombre deletreado, número dictado y ≥1 distractor auto-corregido.
- [ ] `mcq` de S3 con **3 opciones** (no 4).
- [ ] `multiselect` de S2 con `selectCount: 2` y `answers` de 2 letras.

**Complejidad / contenido**
- [ ] Cada respuesta aparece **literal** en el transcript y **en orden**.
- [ ] Respuestas dentro del `maxWords` de su rúbrica.
- [ ] `answers` con variantes (singular/plural, número con/sin coma, sinónimos).
- [ ] Registro adecuado: S1/S2 cotidiano-informativo; S3/S4 académico.
- [ ] Distractores presentes (información plausible pero incorrecta antes de la correcta).

**Tiempo / audio**
- [ ] Transcript 320–380 palabras/sección (1.300–1.450 por set).
- [ ] Audio master script incluye narración + pausas (30 s preview, 40 s entre secciones).
- [ ] `ffprobe` de la duración final del mp3 = **23–26 min**.
- [ ] Voces distintas por personaje; narrador constante; sin música.
- [ ] Archivo nombrado `ielts-listening-set-N.mp3` en `public/audio/ielts/`.

**Datos**
- [ ] Stub `comingSoon` reemplazado por las 4 secciones reales.
- [ ] `audioUrl` puesto en las 4 secciones.
- [ ] `timeMinutes` del set = `164`.
- [ ] `npx tsc --noEmit` sin errores de tipos en el archivo del set.

---

## 6. Cableado de datos (shape exacto TypeScript)

Los tipos viven en `src/data/mocks/types.ts`. Reemplaza el bloque `comingSoon` por 4 objetos `MockSection` como estos. **No inventar campos** — usar solo estos tipos (`formgroup`, `tablegroup`, `multiselect`, `mcq`).

### Sección 1 — `formgroup` + `tablegroup`

```ts
{
  part: 1,
  skill: 'listening',
  audioUrl: '/audio/ielts/ielts-listening-set-N.mp3',
  title: 'Listening — Section 1: <Tema>',
  instructions: 'You will hear a conversation between <A> and <B>. Listen and answer Questions 1–10.',
  transcript: `A: ...\n\nB: ...`,   // 320–380 palabras, con nombre deletreado + número dictado
  questions: [
    {
      type: 'formgroup', id: 'l1-form', part: 1, qRange: [1, 6],
      groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
      title: '<Título de las notas>',
      example: 'Name:  <valor de ejemplo>',
      template: `Address: 24 {{1}} Road\n...\n• wants the {{6}} ...`,
      blanks: [
        { num: 1, answers: ['...'], maxWords: 1 },
        // ... hasta 6
      ],
    },
    {
      type: 'tablegroup', id: 'l1-table', part: 1, qRange: [7, 10],
      groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
      headers: ['...', '...', '...'],
      rows: [
        ['fila', 'valor', { num: 7, answers: ['...'], maxWords: 1 }],
        // celdas fijas = string; celdas-hueco = { num, answers, maxWords }
      ],
    },
  ],
},
```

### Sección 2 — `multiselect` + `formgroup`

```ts
{
  part: 2, skill: 'listening', audioUrl: '/audio/ielts/ielts-listening-set-N.mp3',
  title: 'Listening — Section 2: <Tema>',
  instructions: 'You will hear <...>. Listen and answer Questions 11–20.',
  transcript: `...`,   // monólogo, 1 voz
  questions: [
    {
      type: 'multiselect', id: 'l2-multi', part: 2, qRange: [11, 12],
      text: 'Which TWO ... ?',
      options: [
        { letter: 'A', text: '...' }, { letter: 'B', text: '...' },
        { letter: 'C', text: '...' }, { letter: 'D', text: '...' },
        { letter: 'E', text: '...' },
      ],
      selectCount: 2, answers: ['A', 'D'],
    },
    {
      type: 'formgroup', id: 'l2-form', part: 2, qRange: [13, 20],
      groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
      title: '<Título>',
      template: `• ... {{13}} ...\n...\n• ... {{20}} ...`,
      blanks: [ { num: 13, answers: ['...'], maxWords: 2 }, /* ... 20 */ ],
    },
  ],
},
```

### Sección 3 — `mcq` ×5 + `formgroup`

```ts
{
  part: 3, skill: 'listening', audioUrl: '/audio/ielts/ielts-listening-set-N.mp3',
  title: 'Listening — Section 3: <Tema>',
  instructions: 'You will hear two students discussing <...>. Listen and answer Questions 21–30.',
  transcript: `TUTOR: ...\n\nSTUDENT A: ...\n\nSTUDENT B: ...`,
  questions: [
    { type: 'mcq', id: 'l3q21', part: 3, text: '...', options: ['a', 'b', 'c'], answer: 0 },  // 3 opciones, answer 0-indexed
    // ... q22–q25
    {
      type: 'formgroup', id: 'l3-form', part: 3, qRange: [26, 30],
      groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
      template: `• ... {{26}} ...\n...\n• ... {{30}} ...`,
      blanks: [ { num: 26, answers: ['...'], maxWords: 1 }, /* ... 30 */ ],
    },
  ],
},
```

### Sección 4 — `formgroup` (note completion)

```ts
{
  part: 4, skill: 'listening', audioUrl: '/audio/ielts/ielts-listening-set-N.mp3',
  title: 'Listening — Section 4: <Tema>',
  instructions: 'You will hear a lecture about <...>. Listen and answer Questions 31–40.',
  transcript: `...`,   // monólogo académico, 1 voz
  questions: [
    {
      type: 'formgroup', id: 'l4-form', part: 4, qRange: [31, 40],
      groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
      title: '<TÍTULO EN MAYÚSCULAS>',
      template: `General facts\n\n• ... {{31}} ...\n...\n• ... {{40}} ...`,
      blanks: [ { num: 31, answers: ['...'], maxWords: 1 }, /* ... 40 */ ],
    },
  ],
},
```

> **Referencia viva:** `src/data/mocks/ielts-set-1.ts` (líneas 13–394) es el ejemplo completo y correcto de las 4 secciones. Cópialo como molde exacto de estructura.

---

## 7. Ejemplo real de referencia (Sección 1 de set-1, ya publicada)

Diálogo AGENT/CUSTOMER de **357 palabras**, con nombre deletreado (`P-O-P-P-Y-F-I-E-L-D`), teléfono dictado (`077 8664 3091`), `example` (`Name: Andrea Brown`), 6 huecos `formgroup` (Q1–6) + tabla de precios `tablegroup` (Q7–10), rúbrica "ONE WORD AND/OR A NUMBER", y distractores auto-corregidos ("not shopping … the beach"; "not a tent … a lodge"). **Ese es el estándar a igualar en las 4 secciones de cada set 5–20.**

---

### Resumen de una línea

Por cada set 5–20: **4 secciones (S1 conv./S2 monólogo/S3 discusión/S4 clase), 40 preguntas con los tipos y rúbricas de la tabla §1, transcripts de 320–380 palabras, y un mp3 de examen completo (con narración + pausas) de 23–26 min** — idéntico en forma, complejidad y tiempo a los sets 1–4.
