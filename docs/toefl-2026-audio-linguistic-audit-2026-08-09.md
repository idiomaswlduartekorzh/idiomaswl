# TOEFL iBT 2026 — auditoría lingüística/ASR de audio T07

Fecha de corte: 2026-08-09
Unidad: T07 — Auditoría lingüística/ASR de audio
Estado: cerrada como capa diagnóstica; adjudicación humana obligatoria en T08
Matriz completa: `docs/toefl-2026-audio-linguistic-audit-2026-08-09.tsv`

## 1. Conclusión ejecutiva

La intuición de que parte del simulacro no está dimensionada como el TOEFL iBT 2026
queda confirmada en Listening. Los 20 Conversations y los 20 Announcements superan la
referencia de 100 palabras, y los 20 Academic Talks superan la referencia de 250
palabras. No se recomienda desecharlos: los 60 quedan como candidatos lingüísticos de
segmentación o reencuadre y pasan completos a T08/T15.

Se transcribieron localmente los 260 MP3. Para los 160 assets que sí tenían texto fuente
se midió la diferencia ASR↔fuente; para los 100 Listen and Choose sin fuente se recuperó
una transcripción candidata. ASR se usó sólo como detector: hay 0 transcripciones
canónicas aprobadas, las 260 decisiones siguen bloqueadas y ningún asset recibió todavía
una clase global A/B/C/D/E.

El gate de T07 sí queda satisfecho: todos los textos y todas las diferencias están
trazados y asignados a una cola humana T08. La cola exige revisión al 100 % de 194
assets y muestra estratificada de 66 conservados.

## 2. Autoridades y alcance

- Contrato oficial versionado: `toefl-ibt-2026@2026-08-09.v2`, derivado de la
  especificación oficial ETS registrada en T01. Para esta capa se aplicaron L-001–L-004
  y las referencias de longitud documentadas en L-005.
- Identidad de assets: manifiesto T04 SHA-256
  `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`.
- Estado técnico heredado: auditoría T06 SHA-256
  `21c15c0f8eaa63b17ab5d17f74e9aa8678da51ca00624bae6887ab922419653f`.
- Fingerprint de fuentes: `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`.
- Fingerprint de los 260 MP3 originales:
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`.
- Alcance: transcripción diagnóstica, diferencias normalizadas, nombres/cifras/
  negaciones, señales de confianza, longitud/densidad, repeticiones, duplicidad textual
  y concordancia preliminar prompt↔clave para Choose Response.
- Fuera de alcance de ASR: aprobar texto canónico, prosodia, naturalidad acústica,
  acento, identidad o continuidad de voz, artefactos sintéticos, derechos y dificultad
  percibida. T08 debe adjudicarlos escuchando el audio.

## 3. Método reproducible

Se usó `openai-whisper` release `20250625`, modelo local `small`, en CPU, sin red y sin
API. El modelo local tiene SHA-256
`9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794`.

Parámetros fijados antes de ver el resultado:

```text
language=en
task=transcribe
device=cpu
fp16=false
temperature=0
beam_size=5
condition_on_previous_text=false
word_timestamps=false
threads=4
```

La comparación elimina etiquetas de hablante del texto fuente y aplica
`Whisper EnglishTextNormalizer`. Se conserva el backtrace completo de sustituciones,
eliminaciones e inserciones por asset. Las reglas internas de triage, que no se
atribuyen a ETS, fueron:

- exacto respaldado: WER normalizado 0 y sin alerta de confianza;
- diferencia menor: WER ≤ 0,02, sin token crítico y sin alerta de confianza;
- diferencia material: el resto de las diferencias;
- señal ASR accionable: texto vacío, `min_segment_logprob < -0.5`,
  `max_no_speech_prob > 0.6` o `max_compression_ratio > 2.4`;
- duplicidad textual candidata: similitud de edición ≥ 0,88;
- token crítico: negación, número, orden/cuantificador o nombre propio detectado de
  forma conservadora.

Los umbrales ASR, de confianza y similitud son guardas editoriales WeLearn, no
criterios oficiales de scoring. Tampoco se inventó un umbral oficial de palabras por
minuto: el WPM de la matriz es descriptivo.

La corrida coherente produjo 260/260 JSON, todos `language=en`, modelo/release
esperados, texto y segmentos no vacíos, y ruta relativa correcta. Duró 3.002,1 s. Su
fingerprint es `11e9a1bbc787c8b434b15958969e81f71325a231c10df82957d44d4e1df79c0e`;
el fingerprint ordenado de transcripciones es
`ff7a24687edbbccd7b26da98bbc00ffc36bd5a33026bbae69628955af8fc6242`.

## 4. Cobertura y reconciliación

| Tipo | Assets | Con fuente | Exacto respaldado | Exacto/señal baja | Menor | Material | WER micro |
|---|---:|---:|---:|---:|---:|---:|---:|
| Listen and Choose a Response | 100 | 0 | 0 | 0 | 0 | 0 | N/A |
| Listen to a Conversation | 20 | 20 | 10 | 0 | 2 | 8 | 0,007675 |
| Listen to an Announcement | 20 | 20 | 10 | 0 | 4 | 6 | 0,012128 |
| Listen to an Academic Talk | 20 | 20 | 4 | 0 | 5 | 11 | 0,006923 |
| Listen and Repeat | 100 | 100 | 90 | 1 | 0 | 9 | 0,009794 |
| **Total** | **260** | **160** | **114** | **1** | **11** | **34** | **0,008386** |

El WER agregado compara 14.548 palabras fuente y registra 122 operaciones. No decide
si el texto escrito o el audio es correcto; sólo localiza dónde T08 debe adjudicar.
Los 100 Choose Response quedan como `asr_candidate_recovered_pending_human` porque no
existía texto fuente contra el cual medir WER.

Se detectaron 21 assets con cambios conservadoramente críticos y 3 alertas de señal:

- `set-2/academic-talk.mp3`: log-probabilidad mínima −0,616471;
- `set-11/conversation.mp3`: log-probabilidad mínima −0,866578 y probabilidad máxima
  de no-habla 0,702116;
- `set-14/repeat-1.mp3`: log-probabilidad mínima −0,506515 aunque el texto normalizado
  coincide exactamente con la fuente.

No apareció repetición novel de frase bajo el detector fijado. Sí aparecieron 5 pares
textuales cercanos que abarcan 9 assets: dos prompts idénticos
(`set-6/choose-1`↔`set-12/choose-1` y `set-7/choose-5`↔`set-9/choose-5`) y tres pares
casi idénticos (`set-1/choose-5`↔`set-2/choose-5`,
`set-2/choose-5`↔`set-3/choose-5` y
`set-12/choose-2`↔`set-19/choose-4`). Son alertas editoriales, no prueba de audio
duplicado; T06 ya comprobó 260 hashes MP3 y PCM únicos.

## 5. Longitud y densidad por familia

| Tipo | Rango de palabras ASR | Promedio | WPM descriptivo | Resultado |
|---|---:|---:|---:|---|
| Choose Response | 6–24 | 10,99 | 142,012–262,500 | Conteo de sílabas tónicas pendiente T08 |
| Conversation | 178–270 | 221,05 | 160,891–199,651 | 20/20 sobre referencia intermedia de 100 palabras |
| Announcement | 117–164 | 143,50 | 164,575–194,297 | 20/20 sobre referencia intermedia de 100 palabras |
| Academic Talk | 271–343 | 310,05 | 126,582–167,352 | 20/20 sobre referencia extendida de 250 palabras |
| Listen and Repeat | 4–18 | 10,22 | 93,023–217,742 | Comparación textual completa; escucha pendiente |

Los 60 audios largos se conservan intactos. Su estado es
`C_linguistic_segment_or_reframe_candidate`: T15 decidirá si se segmentan con contexto
suficiente, se reutilizan en otro modo o requieren variante nueva. No se ordena
regeneración desde esta auditoría.

## 6. Revisión preliminar de las 100 interacciones Choose Response

Se revisó manualmente el prompt recuperado por ASR contra la clave existente en los
20 sets. Esto no sustituye escuchar el audio ni crear la transcripción canónica:

- 93 no muestran contradicción semántica prompt↔clave y quedan pendientes de T08;
- 4 tienen clave semánticamente válida pero una respuesta poco natural por comenzar
  con “Yes” ante una pregunta abierta con “How”:
  `set-7/choose-5`, `set-9/choose-5`, `set-11/choose-5` y `set-15/choose-5`
  (`LING-EXCHANGE-001`);
- `set-15/choose-1` pregunta por “dictionaries” en plural y la clave responde
  “It's…” en singular (`LING-EXCHANGE-002`);
- `set-7/choose-2` contiene la hipótesis ASR “a hank” y `set-18/choose-2` la hipótesis
  “notes to want to study group”; ambas requieren escucha prioritaria y no se corrigió
  el texto por inferencia (`LING-ASR-UNCERTAIN-001`).

Los 100 también requieren adjudicar sílabas tónicas, transcripción del prompt y de las
respuestas, naturalidad de distractores y voz. T05 ya había separado el problema de
distractores débiles del posible valor reutilizable del audio.

## 7. Cola humana T08 y candidatos de reutilización

| Prioridad | Assets | Cobertura requerida | Motivo principal |
|---|---:|---|---|
| P1 | 170 | 100 % | 100 sin fuente, 60 largos y 10 Repeat con diferencia/señal |
| P2 | 24 | 100 % | Repeat textualmente exactos pero con fallo técnico T06 |
| P3 | 66 | Muestra estratificada | Repeat exactos sin condición severa |

Por alcance, 194 assets exigen revisión individual y 66 entran en muestreo
estratificado. Todos tienen owner `T08`, razones trazables y estado
`blocked_not_validated`.

La clasificación lingüística candidata —nunca la clase global A/B/C/D/E— queda:

- 90 `A_linguistic_conserve_candidate`;
- 100 `B_transcript_adjudication_candidate`;
- 10 `B_linguistic_adjudication_or_repair_candidate`;
- 60 `C_linguistic_segment_or_reframe_candidate`.

T08 debe cruzar estos candidatos con T06, escuchar los severos al 100 %, aprobar una
muestra de los conservados, fijar reglas de lote y recién entonces decidir la clase
global. Derechos, proveedor y procedencia siguen abiertos; no se infirieron desde la
señal ni desde Whisper.

## 8. Siete auditorías de cierre

1. **Full-stack/datos/repositorio:** pasa T07. La cobertura T04↔T06↔T07 es exacta
   260/260, sin faltantes, extras ni divergencias de `asset_id`, hash o estado técnico.
   No se modificó código de producto ni trabajo ajeno.
2. **TOEFL:** pasa como diagnóstico lingüístico. Los 260 conservan reglas L-001–L-004;
   el exceso de longitud de los 60 audios largos queda accionable. Esto no certifica
   todavía volumen total, adaptatividad, navegación ni fidelidad integral.
3. **Editorial/pedagógica:** pasa el gate de cola. Toda diferencia y toda ausencia de
   fuente tiene owner y prioridad; 7 intercambios Choose tienen hallazgo específico.
   La aprobación de naturalidad y dificultad permanece en T08.
4. **Audio:** pasa T07 como capa ASR. Hay transcripción diagnóstica 260/260, diferencias
   trazadas y 0 decisiones canónicas automáticas. Los 260 MP3 originales quedaron
   intactos.
5. **Anti-sesgo/derechos:** no certifica acentos, voces, identidad, licencia,
   consentimiento ni proveedor. Esos campos permanecen explícitamente pendientes.
6. **UI/UX/accesibilidad:** no aplicable a esta unidad documental; no cambió interfaz,
   runtime, reproducción, teclado ni lector de pantalla.
7. **Playwright/Chromium:** no aplicable a T07 porque no hubo cambio de UI/runtime. Se
   conserva la evidencia T06 de decode y playback 260/260, sin presentarla como prueba
   lingüística.

## 9. Integridad, seguridad y correcciones del proceso

- No se leyó `.env.local`, no se inspeccionaron variables o secretos, no se llamó
  ElevenLabs ni otra API y no se consumieron créditos.
- No se generó, normalizó, recortó, reemplazó ni sobrescribió audio. Los resultados ASR
  intermedios viven fuera del repositorio; el TSV conserva transcripción, métricas,
  hashes y decisiones reproducibles.
- Una prueba inicial con timestamps por palabra resultó innecesariamente lenta y se
  detuvo tras 2 assets; la corrida completa se reinició desde cero con el contrato
  uniforme sin timestamps. No se mezclaron resultados.
- Un primer validador comparó por error la ruta relativa registrada por Whisper contra
  una ruta absoluta y reportó 260 falsos mismatches; al validar el contrato correcto,
  hubo 0/260 divergencias.
- `py_compile` intentó crear caché fuera del sandbox; la sintaxis se comprobó después
  en memoria con `compile()`. Ninguno de estos ajustes tocó producto o MP3.

## 10. Gate y siguiente paso

El gate de T07 queda satisfecho: hay una hipótesis ASR no vacía para cada asset, las
160 fuentes están reconciliadas, las 100 fuentes faltantes tienen candidata recuperada,
y el 100 % de diferencias, alertas y decisiones está resuelto como evidencia o en una
cola humana trazable.

La siguiente unidad elegible es T08 — auditoría humana estratificada de audio. T08 no
debe generar ni sustituir audios: primero escucha, adjudica texto canónico, valida
prompt/pregunta/clave, naturalidad, prosodia, voces, acentos, artefactos y dificultad,
y fija las reglas de aceptación por lote.
