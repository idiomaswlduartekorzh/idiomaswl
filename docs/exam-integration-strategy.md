# Estrategia de Integración de Exámenes — idiomaswl.com

**Fuente de recursos:** `examenes_idiomas_recursos_completo.docx`  
**Stack:** Next.js 15 · TypeScript · `src/data/mocks/` · `LanguagePracticeClient`

---

## 1. Arquitectura existente (no tocar)

```
src/data/
  mocks/
    types.ts          ← tipos TypeScript (MockExam, MockSection, Question...)
    index.ts          ← MOCK_REGISTRY + getMock()
    [exam]-[set].ts   ← un archivo por mock
  exams.ts            ← catálogo de exámenes (available, mocks[])

src/app/(site)/examenes/[exam]/practica/[mockId]/
  page.tsx            ← router: LANGUAGE_EXAMS → LanguagePracticeClient
  LanguagePracticeClient.tsx ← maneja MCQ, Write, Speak, FormGroup, MultiSelect, Matching
```

**Regla:** Cada nuevo mock = un archivo `.ts` + registro en `index.ts` + entrada en `exams.ts`.  
No se modifica `types.ts`, `LanguagePracticeClient.tsx` ni la estructura de rutas.

---

## 2. Mapa de tipos por examen

| Sección del examen | Tipo TypeScript | Notas |
|---|---|---|
| Opción múltiple (A, B, C, D) | `MCQQuestion` | `answer` es índice 0-based |
| Completar formulario/notas | `FormGroupQuestion` | Template con `{{n}}` |
| Completar tabla | `TableGroupQuestion` | Headers + rows con celdas `{num, answers}` |
| Selección múltiple (ej. "elige 2 de 5") | `MultiSelectQuestion` | `selectCount` + `answers: string[]` |
| Combinar/relacionar (matching) | `MatchingGroupQuestion` | items + endings letrados |
| Producción escrita | `WriteQuestion` | `taskNumber: 1|2`, `minWords` |
| Expresión oral | `SpeakQuestion` | `cueCard?`, `followUp?: string[]` |
| Audio externo | `MockSection.audioUrl` | URL directa MP3/MP4 o embed YouTube |

---

## 3. Inventario de exámenes disponibles

### 3.1 CILS — Italiano (Università per Stranieri di Siena)
**Niveles con audio + PDF completo:** A1, A2, B1, B2, C1, C2  
**Variantes por nivel:** Standard (adultos), Bambini, Adolescenti, Integrazione  
**Prioridad de integración:** B1 Standard → B2 → A2 → A1 → C1 → C2

**Estructura de secciones por mock CILS:**
```
MockSection 1 — Ascolto (Comprensión auditiva)
  audioUrl: https://cils.unistrasi.it/public/articoli/[id]/[archivo].mp3
  questions: MCQQuestion[]  (extraídas del Quaderno PDF)
  transcript: texto del Trascrizioni PDF

MockSection 2 — Lettura (Comprensión lectora)
  passage: texto del Quaderno PDF
  questions: MCQQuestion[]

MockSection 3 — Analisi delle Strutture di Comunicazione (gramática)
  questions: MCQQuestion[]

MockSection 4 — Scrittura 1 (Produzione Scritta)
  questions: [WriteQuestion]  taskNumber: 1, minWords: 80

MockSection 5 — Scrittura 2
  questions: [WriteQuestion]  taskNumber: 2, minWords: 150

MockSection 6 — Produzione Orale
  questions: SpeakQuestion[]  (extraídas del PDF Produzione Orale)
```

**URLs de audio verificadas (CILS B1 Standard):**
- Audio: `https://cils.unistrasi.it/public/articoli/197/UNO-B1_6_17.mp3`
- Quaderno: `https://cils.unistrasi.it/public/articoli/197/Quaderno%20Uno%20B1_nuevo.pdf`
- Chiavi: `https://cils.unistrasi.it/public/articoli/197/Chiavi_B1_nueve.pdf`

---

### 3.2 Goethe-Zertifikat — Alemán
**Niveles:** A1, A2, B1, B2, C1, C2  
**Prioridad:** B1 set-2 → A2 → B2 → A1 → C1 → C2

**Estructura de secciones por mock Goethe:**
```
MockSection 1 — Lesen Teil 1 (MCQ)
MockSection 2 — Lesen Teil 2 (MCQ / matching)
MockSection 3 — Lesen Teil 3 (MCQ)
MockSection 4 — Hören Teil 1
  audioUrl: https://goethemp4s.akamaized.net/.../[archivo].mp4
  questions: MCQQuestion[]
MockSection 5 — Hören Teil 2 (MCQ)
MockSection 6 — Hören Teil 3 (MCQ)
MockSection 7 — Schreiben
  questions: [WriteQuestion]  taskNumber: 1, minWords: 80
MockSection 8 — Sprechen
  questions: SpeakQuestion[]  partNumber: 1|2|3
```

**URLs de audio verificadas (Goethe B1 Erwachsene):**
- PDF: `https://www.goethe.de/pro/relaunch/prf/materialien/b1/b1_goethe-zertifikat_modellsatz.pdf`
- Audio: `https://goethemp4s.akamaized.net/resources/files/mp477/pruefungstraining_1_hoererab1_komplett.mp4`

**Patrón de URLs Goethe:**
```
PDF:   https://www.goethe.de/pro/relaunch/prf/materialien/[nivel]/[archivo].pdf
Audio: https://goethemp4s.akamaized.net/resources/files/mp[id]/[archivo].mp4
```

---

### 3.3 IELTS Listening — Inglés (engexam.info)
**Disponibles:** 28 Practice Tests completos  
**Prioridad:** set-5 → set-6 → set-7 → ... → set-28 (sets 1-4 ya implementados)

**Estructura de secciones IELTS Listening:**
```
MockSection 1 — Section 1 (conversación cotidiana)
  audioUrl: https://engexam.info/wp-content/uploads/[año]/[mes]/IELTS-Listening-Test-[N]-Section-1.mp3
  questions: FormGroupQuestion | MCQQuestion

MockSection 2 — Section 2 (monólogo cotidiano)
  audioUrl: .../Section-2.mp3
  questions: MCQQuestion | MatchingGroupQuestion

MockSection 3 — Section 3 (discusión académica)
  audioUrl: .../Section-3.mp3
  questions: MultiSelectQuestion | MCQQuestion

MockSection 4 — Section 4 (conferencia)
  audioUrl: .../Section-4.mp3
  questions: FormGroupQuestion | MCQQuestion
```

**Patrón URL de audio IELTS:**
```
https://engexam.info/wp-content/uploads/{año}/{mes}/IELTS-Listening-Test-{N}-Section-{1-4}.mp3
```
⚠️ Las fechas (año/mes) varían por test. Verificar URL antes de codificar.

---

### 3.4 CELPE-BRAS — Portugués (INEP/MEC Brasil)
**Ediciones disponibles:** 2024/2, 2025/1, 2025/2 (+ archivo anterior)  
**Prioridad:** 2025/1 → 2025/2 → 2024/2  

**Estructura de secciones CELPE-BRAS:**
```
MockSection 1 — Tarefa 1
  audioUrl: https://youtu.be/[id]  ← YouTube embed, detectado automáticamente
  questions: [WriteQuestion]  taskNumber: 1, minWords: 120

MockSection 2 — Tarefa 2
  audioUrl: https://youtu.be/[id]
  questions: [WriteQuestion]  taskNumber: 1, minWords: 120

MockSection 3 — Tarefa 3
  passage: texto del Caderno de Questões
  questions: [WriteQuestion]  taskNumber: 2, minWords: 150

MockSection 4 — Tarefa 4
  passage: texto del Caderno de Questões
  questions: [WriteQuestion]  taskNumber: 2, minWords: 150

MockSection 5 — Parte Oral
  questions: SpeakQuestion[]  (3 Elementos Provocadores)
  cueCard: descripción del elemento (foto / texto / objeto)
```

**URLs CELPE-BRAS 2025/1:**
- Caderno: Google Drive `1-M5LFKrvub8RjyRpe74OhP9JTFcHiOHY`
- Tarefa 1 video: `https://youtu.be/QmLaICD6h-w`
- Tarefa 2 audio: `https://youtu.be/nmZRklYMfFU`
- Oral material: Google Drive `1YHasEO6sx-PPoASJ52YSEJTZO6NkrYsc`

---

### 3.5 TOEFL iBT — Inglés (ETS oficial)
**Disponibles:** Practice Test 1, Practice Test 2 (oficiales ETS)  
**Prioridad:** set-2 (Practice Test 1 nuevo) → set-3 (Practice Test 2)

**Estructura TOEFL (nueva 2026):**
```
Reading:  2 pasajes, ~10 preguntas c/u → MCQQuestion[]
Listening: 3-4 audios (conferencias + conversaciones) → MCQQuestion[]
Speaking:  4 tareas integradas → SpeakQuestion[]
Writing:   1 Academic Discussion + 1 Integrated → WriteQuestion[]
```

---

## 4. Checklist de verificación por mock (antes de codificar)

Para cada nuevo mock, verificar en orden:

### ✅ Paso 1 — Verificación de recursos
```bash
# Verificar que el audio responde
curl -I "[URL_AUDIO]" | grep -E "HTTP|Content-Type|Content-Length"

# Verificar que el PDF es accesible
curl -I "[URL_PDF]" | grep HTTP
```

### ✅ Paso 2 — Extracción de contenido del PDF
1. Abrir el Quaderno/PDF del candidato
2. Extraer:
   - Textos de lectura (sección `passage` en MockSection)
   - Enunciados de preguntas y opciones
   - Instrucciones de cada sección
3. Abrir el PDF de Chiavi/Soluzioni → anotar respuestas correctas
4. Abrir PDF de Trascrizioni → copiar transcripciones del audio

### ✅ Paso 3 — Mapeo de tipos
| Sección del PDF | Tipo a usar | Campos requeridos |
|---|---|---|
| Opción múltiple | `MCQQuestion` | `text`, `options[4]`, `answer` |
| Completar texto con blancos | `FormGroupQuestion` | `template`, `blanks[{num,answers}]` |
| Completar tabla | `TableGroupQuestion` | `headers`, `rows` con `{num,answers}` |
| Elegir 2 de 5 / 3 de 7 | `MultiSelectQuestion` | `selectCount`, `answers[]` |
| Emparejar inicio-final | `MatchingGroupQuestion` | `items[]`, `endings[]` |
| Producción escrita | `WriteQuestion` | `stimulus`, `minWords` |
| Oral/Speaking | `SpeakQuestion` | `text`, `cueCard?`, `followUp?` |

### ✅ Paso 4 — Archivos de audio
```
# Si el audio es descargable (MP3/MP4):
public/audio/[examSlug]/[mockId]-[part].mp3
Ejemplo: public/audio/cils-celi/b1-set2-ascolto.mp3

# Si es YouTube:
audioUrl: 'https://www.youtube.com/embed/[videoId]'
# LanguagePracticeClient lo detecta automáticamente con isYouTube()
```

### ✅ Paso 5 — Imágenes (solo si el examen tiene diagramas)
```
# IELTS Writing Task 1 charts:
public/images/ielts/[setId]-task1.jpg

# CILS/Goethe rara vez tienen imágenes en el examen escrito
# CELPE-BRAS oral: los "elementos provocadores" son fotos → 
public/images/celpe-bras/[edicion]-oral-[1|2|3].jpg
```

### ✅ Paso 6 — Estructura del archivo TypeScript
```typescript
// src/data/mocks/[examSlug]-[setId].ts
import type { MockExam } from './types';

const mock: MockExam = {
  id: '[setId]',
  examSlug: '[examSlug]',
  title: '[Nombre oficial del examen]',
  subtitle: '[Nivel + variante]',
  timeMinutes: [duración],
  sections: [
    {
      part: 1,
      title: '[Nombre sección]',
      skill: 'listening' | 'reading' | 'writing' | 'speaking',
      instructions: '[Instrucciones del candidato]',
      audioUrl: '[URL si aplica]',
      transcript: `[Texto transcripción si aplica]`,
      passage: `[Texto de lectura si aplica]`,
      questions: [ /* ... */ ],
    },
    // ...
  ],
};

export default mock;
```

### ✅ Paso 7 — Registro en index.ts y exams.ts
```typescript
// src/data/mocks/index.ts
import [slug]Set2 from './[slug]-set-2';
// ...
'[examSlug]:set-2': [slug]Set2,

// src/data/exams.ts — agregar a mocks[] del examen correspondiente:
{ id: 'set-2', title: '[Título]', parts: N, questions: N, free: false }
```

---

## 5. Plan de implementación por fases

### Fase 1 — Alta prioridad (ya en la plataforma, ampliar mocks)
| Mock | Examen | Nivel | Estado | Acción |
|---|---|---|---|---|
| `cils-celi:set-2` | CILS | B1 Standard | ⬜ pendiente | Audio + Quaderno B1 disponibles |
| `goethe:set-2` | Goethe | B1 (Übungsset 2) | ⬜ pendiente | PDF + MP4 disponibles |
| `celpe-bras:set-2` | CELPE-BRAS | 2025/1 | ⬜ pendiente | YouTube links disponibles |
| `ielts:set-5` | IELTS | Listening Test 5 | ⬜ pendiente | MP3 pattern conocido |

### Fase 2 — Expansión de niveles
| Mock | Examen | Nivel | Prioridad |
|---|---|---|---|
| `cils-celi:set-3` | CILS | B2 Standard | Alta |
| `goethe:set-3` | Goethe | A2 | Media |
| `celpe-bras:set-3` | CELPE-BRAS | 2025/2 | Alta |
| `ielts:set-6` a `set-10` | IELTS | Listening 6-10 | Media |
| `toefl:set-2` | TOEFL | Practice Test 1 (2025) | Alta |

### Fase 3 — Nuevos exámenes completos
| Examen | Niveles | Complejidad |
|---|---|---|
| `cils-celi` A1, A2 | Bambini + Standard | Media (estructura idéntica a B1) |
| `goethe` C1, C2 | GDS (Groot-Deutsches Sprachdiplom) | Alta (secciones más complejas) |
| DELF A2, B1, B2 | Adultes | Alta (audio no accesible aún) |

---

## 6. Estimación de esfuerzo por mock

| Tipo de examen | Tiempo estimado por mock | Bloqueadores comunes |
|---|---|---|
| CILS (todo disponible) | 2-3 horas | Extracción manual del PDF |
| Goethe (todo disponible) | 2-3 horas | Extracción manual del PDF |
| CELPE-BRAS | 1-2 horas | PDFs en Google Drive (abrir manualmente) |
| IELTS Listening | 3-4 horas | URLs de audio varían por fecha |
| TOEFL iBT completo | 4-6 horas | Reading + Speaking + Writing + Listening |
| DELF | Bloqueado | Audio no accesible públicamente |

---

## 7. Convención de IDs

```
examSlug:   cils-celi | goethe | delf-dalf | celpe-bras | ielts | toefl | icfes
mockId:     set-1, set-2, ... set-N  (lenguaje / idioma)
            mock-01, mock-02, ...    (ICFES)

Clave en registry: '[examSlug]:[mockId]'
Archivo:           src/data/mocks/[examSlug]-[mockId].ts
Audio:             public/audio/[examSlug]/[mockId]-part[N].mp3
Imágenes:          public/images/[examSlug]/[mockId]-[descripción].jpg
```

---

## 8. Comandos rápidos para agregar un nuevo mock

```bash
# 1. Verificar audio
curl -I "https://cils.unistrasi.it/public/articoli/197/UNO-B1_6_17.mp3"

# 2. Descargar audio (si < 100MB)
curl -L -o public/audio/cils-celi/b1-set2.mp3 "https://..."

# 3. Crear archivo del mock (copiar de existente como plantilla)
cp src/data/mocks/cils-celi-set-1.ts src/data/mocks/cils-celi-set-2.ts

# 4. Verificar tipos
npx tsc --noEmit

# 5. Verificar build
npx next build
```
