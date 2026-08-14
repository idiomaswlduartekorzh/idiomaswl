# TOEFL iBT 2026 — informe runtime T13 Reading Set 1

Fecha de corte: **2026-08-14**
Objeto: **`object:toefl-reading-set1-v2`**
Estado: **T13 completo; 51/51 controles cerrados; T16 habilitado**

## Resultado ejecutivo

La línea base confirmó dos problemas distintos. Read in Daily Life ya tenía el mínimo
útil de dos textos y cinco preguntas, pero sólo existía como contenido estático o MCQ
local. Academic Passage tenía un texto de 325 palabras, cinco preguntas visibles y una
sexta selección múltiple que el cliente compartido omitía completamente.

La rebanada T13 conserva los dos textos Daily Life (68 y 80 palabras), sus 3 + 2
preguntas y la fuente académica anterior. La práctica académica principal ahora usa un
pasaje original de 187 palabras y cinco preguntas de selección única. La selección
múltiple anterior sigue disponible, pero se identifica como **complementaria WeLearn**
y su resultado aparece separado: no se presenta como una sexta pregunta oficial.

ETS sigue publicando las familias `Read in Daily Life` y `Read an Academic Passage`.
El overview vigente describe textos funcionales de aproximadamente 15–150 palabras,
con 2 o 3 preguntas según longitud, y un pasaje académico de aproximadamente 200
palabras con 5 preguntas. T13 reproduce esa unidad local, pero no promete adaptación,
longitud total del examen ni equivalencia psicométrica.

## Lo implementado

- objeto público sin claves, IDs estables de ítem/opción y versiones de contenido;
- clave de 11 interacciones dentro de un módulo `server-only`;
- endpoint de cierre que califica single-select y conjunto exacto, sin crédito parcial;
- outcomes reconciliados para scored, unanswered, incomplete, invalidated y not
  presented, con denominador fail-closed;
- práctica interactiva en las rutas públicas Daily Life y Academic Passage;
- renderer compartido para los tipos nuevos y para `multiselect` heredado de los sets
  2–20, eliminando la omisión silenciosa;
- persistencia local de intento, respuestas, resultado y foco;
- fallo técnico conserva las respuestas y no se transforma en error académico;
- resultado de las familias oficiales separado de la práctica complementaria;
- fuente académica v1 preservada server-side con SHA-256
  `276ee66e2e4dca317c7bac0335993dc0b23fafa95bb03d4b3932764739a87340`;
- cero cambios de MP3, transcripciones, TTS, ElevenLabs, Whisper o pipeline de audio.

## Evidencia editorial, factual y de procedencia

El nuevo pasaje deriva hechos generales de fuentes primarias: la literatura científica
sostiene la relación entre precesión/insolación, monzón africano y períodos húmedos,
la presencia de lagos, ríos y fauna acuática, el final del último período húmedo hace
aproximadamente cinco milenios y movimientos de población hacia agua más estable. La
redacción evita afirmar que el clima fue la causa única de sociedades posteriores.

Fuentes fijadas:

- ETS Reading: `https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html`
- ETS Updated Test Overview:
  `https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-at-a-glance.pdf`
- Nature Communications 2023: `https://www.nature.com/articles/s41467-023-41219-4`
- Nature Communications 2024: `https://www.nature.com/articles/s41467-024-47921-1`
- Nature Communications 2018: `https://www.nature.com/articles/s41467-018-06321-y`

Cuatro búsquedas públicas de frases largas y exactas del pasaje no encontraron el
pasaje completo ni una coincidencia exacta de las frases consultadas. Los resultados
ajenos comparten vocabulario factual común sobre geología, desiertos o cambio de
paisaje. Esta búsqueda es una comprobación de similitud pública limitada, no una
opinión jurídica ni una adjudicación independiente. José David Duarte Silva declaró
que WeLearn creó el contenido, posee sus derechos y dispensó la segunda revisión
interna; no se afirma independencia.

## Evidencia automática

| Control | Resultado |
|---|---|
| `npm run check:toefl-reading` | PASS — 3+2, 187 palabras, IDs, clave privada, preservación y cero audio |
| `npm run test:toefl-reading` | PASS — 7/7 scoring, conjunto exacto, invalidación y determinismo |
| `npm run check:toefl-ctw` | PASS — regresión T12 |
| `npm run test:toefl-ctw` | PASS — 7/7 regresión T12 |
| ESLint dirigido | PASS — 0 errores, 0 warnings |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS sobre `main` `f9296ce2` — prebuild completo y 1.360/1.360 rutas |
| Chromium T13 | PASS — 5/5 escenarios |
| Chromium T12 conjunto | PASS — 5/6 en la primera pasada; el único timeout fue compilación fría del endpoint (22,7 s) |
| Chromium T12 repetición dirigida | PASS — 1/1 tras precalentar el endpoint |
| Chromium producción posterior a `main` | PASS — T12 + T13, 11/11 en 13,6 s |

Chromium verificó 3 + 2 preguntas Daily Life, 5 preguntas Academic más una
complementaria, ausencia de clave antes del cierre, resultado 5/5, conjunto exacto,
límite de dos selecciones, restauración de respuesta y foco, fallo técnico, 320 px,
zoom equivalente a 200 %, modo oscuro, movimiento reducido y la superficie Set 1.

## Siete auditorías

1. **Full-stack/datos/repositorio — PASS.** Tipos, datos públicos, renderer, endpoint,
   scoring, persistencia, preservación, checks y TypeScript pasan.
2. **TOEFL — PASS técnico con dispensa del owner.** Las unidades 3+2 y 5 se ajustan al
   overview vigente; la complementaria está separada. No se afirma revisión
   independiente ni adaptatividad.
3. **Editorial/factual — PASS aceptado por el owner.** Distractores plausibles, una
   respuesta defendible por ítem y hechos respaldados por fuentes primarias.
4. **Audio — DIFERIDA/no aplicable a T13.** Reading no abrió ni modificó audio.
5. **Derechos/sesgo/leakage — PASS aceptado por el owner.** Clave privada, redacción
   original, cautela causal, búsqueda pública limitada y declaración de derechos.
6. **UI/UX/accesibilidad — PASS.** Radio y checkbox nativos, fieldset/legend, foco,
   live regions, reflow y preferencias pasan; José David Duarte Silva aprobó el flujo
   T13 con VoiceOver el 14 de agosto de 2026.
7. **Playwright — PASS T13.** 5/5 escenarios; la pasada final conjunta contra el
   build de producción actualizado pasó T12 + T13 11/11 en 13,6 s.

## Checklist manual de VoiceOver T13

1. Abrir `/practica/toefl/reading/formato-2026/read-in-daily-life` y activar VoiceOver
   con `Command + F5` o `Fn + Command + F5`.
2. Llegar con `Tab` al primer grupo. Debe anunciar la pregunta, “Choose one answer” y
   cuatro radios A–D; las flechas deben cambiar de opción sin sacar el foco del grupo.
3. Responder las cinco preguntas y activar “Finalizar y corregir”. Debe anunciar
   “Resultado de práctica”, `5 de 5` si se usaron B, D, C, A, B, y la advertencia de
   que no es score oficial.
4. Abrir `/practica/toefl/reading/formato-2026/read-an-academic-passage`. Debe anunciar
   cinco grupos de radio y luego una práctica complementaria con cuatro checkboxes.
5. Elegir A y C en la complementaria. Debe anunciar “Selected 2 of 2”. Intentar una
   tercera opción debe anunciar que primero se quite una selección.
6. Finalizar. Debe oírse `5 de 5` con C, A, D, B, C y, por separado,
   “Complementaria WeLearn: correcta”.

Para cerrar T13 basta registrar **“VoiceOver T13 aprobado”**, navegador y fecha, o el
primer anuncio/control que no coincida.

## Cierre

La matriz runtime contiene **51/51 controles verificados/aceptados y cero
bloqueantes**. José David Duarte Silva declaró **“VoiceOver T13 aprobado”** el 14 de
agosto de 2026. T13 pasa a `[x]` y T16 queda habilitado. Audio continúa al final.
