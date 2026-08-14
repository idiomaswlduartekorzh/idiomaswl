# TOEFL iBT 2026 — manifiesto maestro de 260 audios

> `manifest_id`: `toefl-2026-audio-manifest`
>
> `manifest_version`: `2026-08-09.v1`
>
> `snapshot_date`: 9 de agosto de 2026
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `editorial_inventory`: `toefl-2026-editorial-inventory@2026-08-09.v1`
>
> `source_fingerprint`:
> `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`
>
> `audio_fingerprint`:
> `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`
>
> `manifest_sha256`:
> `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`
>
> `status`: cerrado para T04; ninguna capa de QA de audio queda aprobada

Este documento cierra T04 de `docs/toefl-2026-alignment-loop.md`. El registro
individual está en `docs/toefl-2026-audio-manifest-2026-08-09.tsv`.

T04 responde **qué archivo existe, qué contenido lo referencia y qué evidencia falta**.
No responde todavía si el audio está técnicamente limpio, si dice exactamente el guion,
si las voces son naturales o si debe conservarse. Esas decisiones pertenecen,
respectivamente, a T06, T07 y T08.

## 1. Resultado central

| Medición | Resultado |
|---|---:|
| Referencias fuente | 260 |
| MP3 en disco | 260 |
| Assets en el manifiesto | 260 |
| IDs de asset únicos | 260 |
| URLs/rutas únicas | 260/260 |
| Hashes SHA-256 únicos | 260 |
| Referencias sin archivo | 0 |
| Archivos huérfanos | 0 |
| Enlaces a estímulos T03 | 260/260 |
| Asociaciones asset→ítem | 440 |
| Tamaño total | 45.440.352 bytes |
| Duración total medida | 5.661.271 ms = 94 min 21,271 s |

Cada uno de los 20 sets conserva exactamente 13 archivos:

```text
5 Listen and Choose + 1 Conversation + 1 Announcement
+ 1 Academic Talk + 5 Listen and Repeat = 13
```

No se creó, movió, renombró, abrió para edición ni sobrescribió ningún MP3.

## 2. Reconciliación de documentación histórica

`docs/COWORK-audio-batch-runbook.md`,
`docs/exam-media-production-checklist.md` y
`docs/exam-media-batch-manifest.md` son referencias históricas de producción. Dos de
ellas todavía describen los 260 audios TOEFL como “pendientes” o “por producir”, aunque
los archivos existen.

Este manifiesto reemplaza esa inferencia para la operación TOEFL:

- existencia física: verificada;
- calidad y concordancia: todavía no verificadas;
- proveedor, voces, parámetros y licencia: no registrados;
- una ruta histórica no autoriza regeneración ni gasto;
- la disponibilidad de una API key no forma parte de la evidencia de T04.

Los documentos históricos no se reescribieron porque también cubren otros exámenes y
procesos. Su contradicción permanece registrada como DIV-020 hasta la auditoría
transversal de gobernanza.

## 3. Identidad y trazabilidad

### 3.1 Gramática de `asset_id`

```text
asset:toefl:{set_id}:part-{part}:{basename_sin_mp3}
```

Ejemplos:

- `asset:toefl:set-1:part-5:listen-choose-1`;
- `asset:toefl:set-1:part-6:conversation`;
- `asset:toefl:set-1:part-12:repeat-1`.

`source_asset_id` queda vacío para los 260 archivos porque son raíces originales del
banco, no variantes conocidas. Una futura reparación o segmentación debe recibir un
`asset_id` nuevo y apuntar al original en `source_asset_id`.

### 3.2 Vínculos con T03

Cada fila guarda:

- `stimulus_id` exacto del inventario editorial;
- `section_id`;
- `item_id` cuando el audio pertenece a una única unidad;
- `linked_item_ids` para todos los ítems que dependen del asset;
- archivo TypeScript y campo que contienen la referencia;
- URL pública y ruta física.

Los audios largos enlazan una sección y varios ítems. Los audios Choose Response y
Repeat enlazan un estímulo y un ítem individual.

| Familia | Assets | Asociaciones a ítems |
|---|---:|---:|
| Listen and Choose a Response | 100 | 100 |
| Listen to a Conversation | 20 | 80 |
| Listen to an Announcement | 20 | 60 |
| Listen to an Academic Talk | 20 | 100 |
| Listen and Repeat | 100 | 100 |
| **Total** | **260** | **440** |

Todos los `stimulus_id`, `section_id`, `item_id` y `linked_item_ids` resuelven contra
`toefl-2026-editorial-inventory@2026-08-09.v1`.

## 4. Esquema del manifiesto

El TSV tiene 49 columnas agrupadas así:

| Grupo | Campos |
|---|---|
| Identidad | `asset_id`, `source_asset_id`, `asset_version` |
| Alineación | `set_id`, `part`, `task_rule`, `task_type` |
| Vínculo editorial | `stimulus_id`, `section_id`, `item_id`, `linked_item_ids` |
| Fuente | `source_file`, `source_field`, `public_url`, `path` |
| Integridad | `sha256`, `bytes`, `duration_ms` |
| Perfil | `codec`, `sample_rate_hz`, `channels`, `channel_layout`, `bitrate_bps` |
| Técnica pendiente | `loudness_lufs`, `true_peak_db` |
| Transcripción | `canonical_transcript`, `canonical_transcript_status`, candidato, hash y longitud |
| ASR | `asr_transcript`, `asr_status`, `wer_or_diff` |
| Voces/generación | `voice_ids`, `voice_roles`, `generator`, `model`, `settings` |
| Derechos | `license_and_provenance` |
| Ciclo de vida | estado editorial, validación, tres capas QA, reutilización y revisión |

Las columnas de evidencia no disponible se conservan vacías o con estado explícito; no
se eliminan del contrato para hacer parecer completo el manifiesto.

## 5. Perfil medido desde los archivos

FFprobe 8.1.1 midió cada MP3 individualmente:

| Codec | Sample rate | Canales | Layout | Bitrate | Assets |
|---|---:|---:|---|---:|---:|
| MP3 | 44.100 Hz | 1 | mono | 64.000 bps | 260 |

| Extremo | Asset | Valor |
|---|---|---:|
| Menor tamaño | `set-1/repeat-1.mp3` | 12.164 bytes |
| Mayor tamaño | `set-2/academic-talk.mp3` | 1.150.267 bytes |
| Menor duración | `set-1/repeat-1.mp3` | 1.440 ms |
| Mayor duración | `set-2/academic-talk.mp3` | 143.701 ms |

Que los 260 compartan perfil no demuestra sonoridad, ausencia de clipping, pausas
correctas o calidad de montaje. `loudness_lufs` y `true_peak_db` quedan vacíos y
`technical_status = inventoried_pending_T06`.

Los 260 hashes son distintos. Esto descarta duplicados binarios exactos, pero no
duplicados perceptuales, guiones repetidos ni variantes casi idénticas; T06 debe
comprobarlos.

## 6. Volumen por tarea

| Tarea | Assets | Duración total | Media | Rango |
|---|---:|---:|---:|---:|
| Listen and Choose a Response | 100 | 329.982 ms | 3.300 ms | 2.020–6.340 ms |
| Listen to a Conversation | 20 | 1.470.701 ms | 73.535 ms | 56.640–96.960 ms |
| Listen to an Announcement | 20 | 970.702 ms | 48.535 ms | 37.300–55.780 ms |
| Listen to an Academic Talk | 20 | 2.515.181 ms | 125.759 ms | 109.860–143.701 ms |
| Listen and Repeat | 100 | 374.705 ms | 3.747 ms | 1.440–6.580 ms |
| **Total** | **260** | **5.661.271 ms** | | |

La duración describe el archivo existente. No determina por sí sola si la densidad,
ritmo, número de oportunidades de respuesta o longitud oficial son correctos.

## 7. Duración y bytes por set

| Set | Assets | Duración ms | Bytes | Set | Assets | Duración ms | Bytes |
|---|---:|---:|---:|---|---:|---:|---:|
| 1 | 13 | 287.200 | 2.304.984 | 11 | 13 | 275.361 | 2.210.526 |
| 2 | 13 | 316.582 | 2.540.087 | 12 | 13 | 270.841 | 2.174.582 |
| 3 | 13 | 292.901 | 2.350.750 | 13 | 13 | 268.401 | 2.154.936 |
| 4 | 13 | 292.800 | 2.349.914 | 14 | 13 | 281.680 | 2.260.889 |
| 5 | 13 | 249.920 | 2.006.561 | 15 | 13 | 292.581 | 2.348.242 |
| 6 | 13 | 278.080 | 2.231.841 | 16 | 13 | 312.040 | 2.503.722 |
| 7 | 13 | 240.961 | 1.935.299 | 17 | 13 | 284.980 | 2.287.431 |
| 8 | 13 | 272.901 | 2.191.090 | 18 | 13 | 305.602 | 2.452.315 |
| 9 | 13 | 259.300 | 2.081.794 | 19 | 13 | 285.540 | 2.292.028 |
| 10 | 13 | 268.160 | 2.152.638 | 20 | 13 | 325.440 | 2.610.723 |

## 8. Estado de transcripciones

`canonical_transcript` permanece vacío en los 260 assets. T04 no convierte un texto
fuente o una hipótesis ASR en verdad lingüística.

| Estado | Assets | Evidencia disponible |
|---|---:|---|
| `missing_source_pending_T07` | 100 | Choose Response no conserva el prompt hablado en el objeto |
| `not_adjudicated_pending_T07` | 60 | `section.transcript` enlazado y hasheado como candidato |
| `not_adjudicated_pending_T07` | 100 | `targetSentence` enlazado y hasheado como candidato |
| **Total** | **260** | **0 transcripciones canónicas aprobadas** |

Los 160 candidatos son únicos y se fijaron mediante referencia y SHA-256:

| Candidato | Assets | Caracteres | Palabras |
|---|---:|---:|---:|
| Conversation | 20 | 25.145 | 4.358 |
| Announcement | 20 | 16.632 | 2.849 |
| Academic Talk | 20 | 37.206 | 6.172 |
| Repeat | 100 | 5.923 | 1.021 |
| **Total** | **160** | **84.906** | **14.400** |

No se duplicaron los guiones completos dentro del TSV. La referencia apunta a la fuente
TypeScript y el hash detectará cambios antes de T07.

Los 100 Choose Response necesitan recuperación candidata mediante ASR y adjudicación
humana posterior. Inferir el prompt desde la opción correcta, como sugerían algunos
checklists históricos, no es una transcripción válida.

## 9. Estado conservador de cada asset

| Dimensión | Estado en los 260 |
|---|---|
| Versión | `legacy_unversioned` |
| Editorial | `draft` |
| Validación | `legacy_unverified` |
| Técnica | `inventoried_pending_T06` |
| Lingüística | `pending_T07` |
| Humana | `not_reviewed_pending_T08` |
| ASR | `not_run_pending_T07` |
| Reutilización | `pending_T06_T07_T08`; `reuse_class` vacía |
| Revisor | `not_assigned`; `reviewed_at` vacío |
| Voces | `not_recorded` |
| Generador/modelo/settings | `not_recorded` |
| Licencia/procedencia | `not_recorded_pending_rights_review` |

No se asigna A/B/C/D/E. Esa decisión exige combinar integridad técnica, concordancia
lingüística y escucha humana. Ningún asset puede saltar de `draft` a `validated` por
estar presente, tener hash o decodificar metadatos.

## 10. Límite de las mediciones de T04

T04 sí prueba:

- existencia y correspondencia uno a uno entre fuente, disco y manifiesto;
- identidad estable, hash, bytes y duración real;
- perfil básico de stream;
- vínculo con tarea, estímulo, sección e ítems;
- presencia de un candidato de transcripción o estado explícito de ausencia;
- estado pendiente de cada evidencia todavía no levantada.

T04 no prueba:

- decodificación completa del stream;
- loudness, true peak, clipping, silencios, clics o cortes;
- similitud perceptual;
- correspondencia audio↔candidato;
- naturalidad, pronunciación, acento, velocidad, pausas o prosodia;
- voces, roles, proveedor, modelo, parámetros o derechos;
- reproducción en navegadores;
- clase de reutilización.

El primer grupo pendiente es T06; el segundo, T07; la escucha humana y la decisión de
reutilización requieren T08.

## 11. Seguridad y preservación

- No se leyó `.env.local` ni ninguna variable de entorno.
- No se llamó ElevenLabs ni otro proveedor.
- No se imprimieron headers, credenciales, historial ni IDs de cuenta.
- No se ejecutaron scripts de generación o reconstrucción.
- No se usaron flags `--generate`, `--write` o equivalentes.
- Los MP3 se abrieron sólo para lectura, hashing y FFprobe.
- No se normalizó, recortó, transcodificó ni sobrescribió ningún original.

El pipeline existente de series de escucha sirve como referencia, pero no es un
pipeline TOEFL ni evidencia de cómo se produjeron estos 260 archivos. Por eso los
campos de generación permanecen `not_recorded`.

## 12. Reproducción

### 12.1 Integridad

```bash
wc -l -c docs/toefl-2026-audio-manifest-2026-08-09.tsv
shasum -a 256 docs/toefl-2026-audio-manifest-2026-08-09.tsv
find public/audio/toefl -type f -name '*.mp3' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
find src/data/mocks -maxdepth 1 -type f -name 'toefl-set-*.ts' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
```

Resultados:

| Medición | Valor |
|---|---|
| TSV | 272 líneas; 195.114 bytes |
| SHA-256 TSV | `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913` |
| SHA-256 agregado MP3 | `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842` |
| SHA-256 agregado fuentes | `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d` |

### 12.2 Perfil individual

```bash
ffprobe -v error -select_streams a:0 \
  -show_entries stream=codec_name,sample_rate,channels,channel_layout,bit_rate:format=duration,bit_rate \
  -of json public/audio/toefl/set-1/conversation.mp3
```

La validación semántica reimporta los 20 sets, compara sus 260 `audioUrl` con las 260
filas y los 260 archivos, recalcula hash/bytes/duración/perfil, resuelve los vínculos
contra T03 y exige todos los campos aplicables.

Resultado:

```text
260 filas · 49 columnas · 260 IDs/rutas/hashes únicos
0 faltantes · 0 huérfanos · 0 campos aplicables vacíos
260 vínculos de estímulo · 440 asociaciones a ítems
```

El primer intento del validador usó `trimEnd()` y eliminó los tabs vacíos del último
registro, produciendo un falso error de 47/49 columnas. Se corrigió el lector para
retirar sólo el salto de línea final; el manifiesto no cambió y la validación completa
pasó.

Después, `git diff --no-index --check` detectó tabs finales reales porque
`reviewed_at` y `reviewer` estaban vacíos al final de cada fila. El TSV se regeneró
con `reviewer=not_assigned`, conservó `reviewed_at` vacío y volvió a pasar la
validación de 49 columnas. Esta corrección sólo cambió el artefacto, nunca los MP3.

## 13. Siete auditorías de T04

1. **Full-stack, datos y repositorio — pasa para manifiesto.** Fuente, inventario T03,
   filesystem y TSV tienen paridad 260/260. IDs, rutas y hashes son únicos; todos los
   vínculos resuelven; no se tocó runtime ni trabajo ajeno.
2. **TOEFL vigente — pasa para trazabilidad.** Cada asset enlaza L-001–L-004 o S-001 y
   mantiene el rótulo de práctica abreviada. La presencia de audio no se interpreta como
   volumen, navegación, visuales o fidelidad completa.
3. **Editorial/pedagógica — pasa para estado de guion.** Se separa transcripción canónica,
   candidato y ausencia. No se infiere texto oído desde distractores ni se aprueba
   naturalidad por disponer de un script.
4. **Audio técnico, lingüístico y humano — pasa sólo el gate T04.** Hash, bytes,
   duración, perfil, vínculo y estado están completos. Las tres capas permanecen
   expresamente pendientes en T06–T08; no se concede QA ni clase de reutilización.
5. **Multiperspectiva, anti-sesgo y derechos — pasa para trazabilidad.** Voces, acentos,
   proveedor, licencia y procedencia se registran como desconocidos, no se inventan.
   Representación, naturalidad y derechos requieren revisión posterior.
6. **UI/UX y accesibilidad — no certifica UI.** Las URLs de fuente están inventariadas,
   pero reproducción, controles, un solo play, lector de pantalla y fallos de red no se
   probaron ni cambiaron en T04.
7. **Playwright — no aplica.** No cambió ninguna superficie renderizada. Una carga E2E
   no demostraría hash, duración o transcripción/status del lote completo.

## 14. Gate de salida T04

| Criterio | Resultado |
|---|---|
| 260 assets con `asset_id` único | Pasa: 260/260 |
| 260 con ruta y referencia fuente | Pasa: 260/260 |
| 260 con vínculo editorial/tarea | Pasa: 260/260 |
| 260 con SHA-256 y bytes | Pasa: 260/260 |
| 260 con duración medida | Pasa: 260/260 |
| 260 con codec/sample rate/canales | Pasa: 260/260 |
| Transcripción o status explícito | Pasa: 160 candidatos + 100 ausencias |
| Estados T06/T07/T08 explícitos | Pasa: 260/260 |
| Faltantes/huérfanos | Pasa: 0/0 |
| Originales preservados | Pasa: fingerprint sin cambios |
| API, secretos y costo | Pasa: no usados |

Estado T04: **cerrado**.

Próxima primera unidad elegible: T05 — auditoría editorial global inicial.

## 15. Historial

| Versión | Fecha | Cambio |
|---|---|---|
| `2026-08-09.v1` | 2026-08-09 | Manifiesto inicial de 260 originales con 49 campos, trazabilidad T03, metadata FFprobe y estados conservadores T06–T08. |
