# Blueprint — WeLearn Labs

**Rama:** `labs/ia-gratis` · **Estado:** esqueleto para validar · **Fecha:** 16 jul 2026

Zona aislada para validar herramientas de IA gratuitas antes de inyectarlas a
idiomaswl.com. Si el modelo funciona aquí, se mueve al sitio. Si no, se borra la
rama y no pasó nada.

---

## 1. La tesis

Tres cosas que descubrimos investigando y que definen todo lo demás:

1. **El band scoring de IELTS no se compra.** No existe API de terceros. Los
   competidores (IELTS International, Mock IELTS, IELTSWriting.AI, LexiBot) son
   productos web corriendo un LLM por detrás. Nadie vende esa pieza porque esa
   pieza *es* su producto.
2. **La ventaja no es tecnológica.** Todos tienen acceso al mismo modelo. Lo que
   WeLearn tiene y ellos no es a Zhanna: criterio pedagógico real, escrito en una
   rúbrica, apuntando al método de 17 pasos. Por eso el archivo más importante de
   este blueprint no es código: es
   [`src/lib/labs/rubrics/ielts-writing.ts`](../src/lib/labs/rubrics/ielts-writing.ts).
3. **La capa gratis puede ser gratis de verdad.** Gemini Flash da 1.500
   peticiones diarias sin costo = 45.000 evaluaciones al mes. No vamos a tener
   1.500 estudiantes escribiendo ensayos diarios en el primer año. **El evaluador
   de Writing tiene costo operativo cero.**

## 2. Aislamiento — las reglas que no se rompen

Nada de esto puede tocar lo que ya funciona en producción.

| Regla | Cómo se garantiza |
|---|---|
| No aparece en Google | `robots: { index: false }` en el layout de Labs + `/labs/` en disallow de `robots.ts` |
| No está en el sitemap | `sitemap.ts` no se modificó |
| No está en el menú | `SiteNav.tsx` no se tocó (⚠️ nunca borrar Práctica de ahí) |
| Se apaga entero | `LABS_ENABLED=false` → todo `/labs` y `/api/labs` da 404 |
| No contamina el código del sitio | Todo vive en `src/lib/labs/` y `src/app/(labs)/`. Cero imports desde el sitio hacia Labs |
| No toca Exámenes | `/examenes`, `data/exams.ts` y `data/mocks/` intactos (diseño aprobado por David) |

**Único archivo compartido que se modificó:** `src/app/robots.ts`, una línea, para
que Google no indexe `/labs/`. Es protección, no cambio de flujo.

## 3. Las herramientas y lo que cuestan

| Herramienta | Free tier real | Costo pasado el tope | Rol |
|---|---|---|---|
| **Web Speech API** | Infinito — corre en el navegador del usuario | $0 siempre | Práctica libre de voz |
| **Gemini Flash** | 1.500 req/día · 10 req/min | Se degrada, no cobra | Band scoring (capa gratis) |
| **Datamuse** | 100.000 llamadas/día · **sin API key** | — | Sinónimos, colocaciones |
| **Free Dictionary** | Sin key, sin registro | — | Fonética IPA + audio |
| **Google Cloud TTS** | 4M caracteres/mes (estándar) | $16/1M | Voces nativas |
| **Azure Pronunciation** | 5 horas de audio/mes | ~$0,02/grabación de 60s | Puntaje por fonema |
| **Claude Opus** | — | ~$0,05/reporte | Reporte profundo post-lead |

Lo que **descartamos** y por qué:

- **Sapling / TextGears**: $0,035 por ensayo y solo detectan gramática. Más caro
  que el LLM que además da el band. Dinero tirado.
- **LanguageTool API**: eliminaron el free tier. La versión autoalojada es libre
  (LGPL) pero es Java — no corre en Vercel, necesita servidor aparte. Fase 3, solo
  si queremos subrayado en vivo mientras el estudiante escribe.
- **ElevenLabs**: 10.000 caracteres/mes. Inservible. Google TTS da 400× más.

## 4. El embudo

```
Estudiante llega  →  Escribe / graba          →  COSTO $0
                     (Web Speech / textarea)

Recibe al instante →  Band + 4 criterios      →  COSTO $0  (Gemini free tier)
                      + sus 3 peores errores
                      "hay N errores más…"        ← EL GANCHO

Quiere el resto    →  LeadCaptureModal        →  email + WhatsApp
                      (el que YA existe)

Reporte completo   →  Todos los errores       →  COSTO $0,05  (Claude Opus)
                      + ensayo reescrito
                      + plan semana a semana
                      + "Zhanna corrige esto
                         en 2 sesiones" → WA        ← EL CIERRE
```

**La lógica:** el costo solo aparece cuando ya hay un lead calificado. Cinco
centavos por alguien que acaba de demostrar que se está presentando al examen.

## 5. Qué está construido

```
docs/blueprint-labs-ia.md              ← este documento
src/lib/labs/
  config.ts                            ← interruptor + límites + free tiers
  types.ts                             ← contratos
  rate-limit.ts                        ← freno de cuota (in-memory, ver §7)
  rubrics/ielts-writing.ts             ← ⭐ LA PIEZA DE ZHANNA
  providers/gemini.ts                  ← ✅ band scoring, funcional
  providers/dictionary.ts              ← ✅ Datamuse + Free Dictionary, sin key
  providers/azure-speech.ts            ← 🔲 esqueleto, fase 2
src/app/api/labs/writing-assess/       ← ✅ endpoint, valida y limita
src/app/(labs)/labs/
  layout.tsx                           ← noindex + kill switch
  page.tsx                             ← índice, muestra qué keys faltan
  writing/                             ← ✅ UI funcional
  speaking/                            ← 🔲 placeholder, fase 2
```

## 6. Cómo probarlo

```bash
git checkout labs/ia-gratis

# 1. Key gratis (sin tarjeta): https://aistudio.google.com/apikey
# 2. Añadir a .env.local:
#      LABS_ENABLED=true
#      GEMINI_API_KEY=...
npm run dev          # ⚠️ este PC: 8GB. Usar dev, NO abrir preview browser.

# → http://localhost:3000/labs/writing
```

Con `LABS_ENABLED` ausente o en `false`, `/labs` da 404 — que es exactamente lo
que debe pasar en producción hasta que decidamos lo contrario.

## 7. Deuda conocida (leer antes de inyectar a producción)

1. **Rate limiter en memoria.** `rate-limit.ts` usa un `Map`, igual que
   `api/practica/submit-audio`. Vercel levanta varias instancias, así que solo
   frena ráfagas dentro de una instancia caliente. **Antes de exponerlo a tráfico
   real hay que mover a Upstash Redis** — si no, un pico agota la cuota diaria de
   Gemini y la herramienta se cae para todos.
2. **El band no está calibrado.** La rúbrica es mi primera versión. Hasta que
   Zhanna la valide contra ensayos con band real, el número que sale es una
   hipótesis, no una medición. Esto es lo que decide si el producto sirve.
3. **Sin persistencia.** Las evaluaciones no se guardan. Para medir conversión
   habrá que escribir a Supabase (tabla nueva, no tocar `exam_submissions`).
4. **Sin tests.** Es un esqueleto de validación.

## 8. Fases

**Fase 1 — validar el band (ahora).** Zhanna corre 10 ensayos con band conocido
por el evaluador. Criterio de éxito: **8 de 10 dentro de ±0,5 bandas.** Si falla,
se itera la rúbrica — no el código. Este es el único trabajo que importa ahora.

**Fase 2 — validar el embudo.** Conectar `LeadCaptureModal`, publicar en una URL
no indexada, mandar 50 personas por WhatsApp. Criterio: **≥30% deja el WhatsApp**
para ver el reporte completo. Solo si esto pasa, se construye pronunciación
(Azure) — porque si el embudo no convierte con la herramienta gratis, tampoco lo
hará con la que cuesta.

**Fase 3 — inyectar.** Mover a `/practica/evaluador-writing`, meter en sitemap,
JSON-LD, OG image, enlazar desde `/clases-de-ingles` y los artículos de IELTS del
blog. Migrar rate limiting a Redis. Recién aquí toca el flujo de idiomaswl.com.

**Fase 4 — el resto.** Diagnóstico de nivel sobre los simulacros que ya existen,
plan de estudio, subrayado en vivo con LanguageTool autoalojado.

## 9. Decisiones pendientes de David

- ¿La rúbrica de §2 refleja el criterio de WeLearn, o Zhanna la reescribe?
- ¿El muro va después del band (agresivo) o después de los 3 errores (suave)?
- ¿`labs.idiomaswl.com` o `/labs` con noindex? (hoy: lo segundo, cero infra nueva)

---

## Nota sobre MCP

Los MCPs **no** son la vía para las herramientas del sitio. MCP es el protocolo
para que un asistente de IA use herramientas externas; el sitio público consume
APIs directas desde el servidor. MCP sí sirve internamente — conectar Claude a
Supabase, Search Console o Analytics para que David y Zhanna trabajen más rápido
— pero eso es otro proyecto, no este.
