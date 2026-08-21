# TOEFL 2026 — paquete de decisión para los 400 audios faltantes

Fecha de corte: 20 de agosto de 2026

Estado: **manifiesto y presupuesto listos; generación no autorizada**

Este documento cubre sólo los medios nuevos de la expansión fija TOEFL 2026. Los 260
MP3 existentes se conservan sin sobrescritura. El detalle individual y reproducible
está en `docs/toefl-2026-missing-audio-manifest-2026-08-20.tsv`.

## 1. Alcance exacto

Cada uno de los 20 sets necesita 20 archivos nuevos:

- Listening: 14 — 11 Choose a Response, una Conversation, un Announcement y un
  Academic Talk;
- Speaking: 6 — dos Listen and Repeat y cuatro Take an Interview.

| Familia | Archivos | Caracteres facturables | Segmentos TTS |
|---|---:|---:|---:|
| Choose a Response | 220 | 10.032 | 220 |
| Conversation | 20 | 9.338 | 80 |
| Announcement | 20 | 7.861 | 20 |
| Academic Talk | 20 | 26.257 | 20 |
| Listen and Repeat | 40 | 4.605 | 40 |
| Take an Interview | 80 | 10.797 | 80 |
| **Total** | **400** | **68.890** | **460** |

Los 460 segmentos existen porque las 20 conversaciones se producen por turnos y se
concatenan después. Las etiquetas `STUDENT:`, `PROFESSOR:` y equivalentes se usan para
casting, pero no se envían como texto hablado. Los guiones fuente suman 70.308
caracteres y 11.190 palabras.

Identidad del manifiesto:

- versión: `2026-08-20.v1`;
- SHA-256: `a11ed6a310f316c622df9741fbb6616d3bce5ecff7bd252ecb46e985fa20fd94`;
- 400 `media_id` únicos;
- 400 rutas nuevas únicas;
- cero colisiones con archivos existentes;
- `generation_authorized=no` en el encabezado.

## 2. Presupuesto público de ElevenLabs

La [tarifa oficial de ElevenAPI](https://elevenlabs.io/pricing/api), consultada el 20
de agosto de 2026, publica USD 0,05 por 1.000 caracteres para Flash/Turbo y USD 0,10
para Multilingual v2/v3. La [documentación de créditos](https://help.elevenlabs.io/hc/en-us/articles/27562020846481-What-are-credits)
indica 0,5 créditos por carácter en Flash v2.5 y un crédito por carácter en
Multilingual v2 para planes self-service. Impuestos y multiplicadores de voces
compartidas no están incluidos.

| Alcance | Flash v2.5 | Multilingual v2 |
|---|---:|---:|
| Piloto de 10 archivos, 2.845 caracteres | USD 0,15 · 1.423 créditos | USD 0,29 · 2.845 créditos |
| Lote completo, una pasada | USD 3,45 · 34.445 créditos | USD 6,89 · 68.890 créditos |
| Techo de tres pasadas completas | USD 10,34 | USD 20,67 |

ElevenLabs documenta hasta dos regeneraciones gratuitas cuando contenido y parámetros
son idénticos, pero no se cuentan como garantía: cambiar texto, voz o parámetros puede
volver a cobrar. El script de producción deberá leer el multiplicador real de cada voz
antes de habilitar `--generate`.

Recomendación: comenzar el piloto con `eleven_multilingual_v2`. La
[documentación de modelos](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
lo presenta como la opción más estable para texto largo y con mayor matiz; Flash v2.5
queda como alternativa económica si la comparación auditiva no revela pérdida útil.
Límite financiero recomendado para piloto + lote + correcciones selectivas:
**USD 25 antes de impuestos**, con parada automática si el cálculo de cuenta lo supera.

## 3. Casting que debe aprobarse

Una consulta de sólo lectura encontró 80 voces disponibles. El casting propuesto usa
diez voces en inglés claro y natural:

1. `woman_a` y `woman_b` — Choose/Repeat, rotación por set;
2. `man_a` y `man_b` — Choose/Repeat, rotación por set;
3. `student_woman` y `student_man` — estudiantes de Conversation;
4. `staff` — librarian, adviser, coordinator, technician y roles equivalentes;
5. `announcer` — avisos de campus;
6. `professor` — Academic Talk e instructor académico;
7. `interviewer` — las cuatro preguntas de Take an Interview.

| Perfil | Voz propuesta | Multiplicador |
|---|---|---:|
| `woman_a` | Jessica — Playful, Bright, Warm | 1× |
| `woman_b` | Sarah — Mature, Reassuring, Confident | 1× |
| `man_a` | Will — Relaxed Optimist | 1× |
| `man_b` | Chris — Charming, Down-to-Earth | 1× |
| `student_woman` | WL en · Maya | 1× |
| `student_man` | WL en · Leo | 1× |
| `staff` | Eric — Smooth, Trustworthy | 1× |
| `announcer` | Daniel — Steady Broadcaster | 1× |
| `professor` | Matilda — Knowledgable, Professional | 1× |
| `interviewer` | River — Relaxed, Neutral, Informative | 1× |

Requisitos: dicción clara, velocidad natural de examen, acento inglés comprensible,
sin actuación caricaturesca, música, efectos ni reverberación. Los `voice_id` exactos
y multiplicadores 1× están versionados, pero su estado sigue
`proposed_pending_owner_pilot_approval`. La clave no se pegó en documentos ni commits.

El reparto versionado está en `scripts/toefl-2026-voice-casting.json`. El generador se
niega a gastar mientras cada perfil no cambie explícitamente a `approved_by_owner`.

### Capacidad real de la cuenta

La misma consulta de sólo lectura reportó plan Creator, 30.171 créditos restantes,
`can_extend_character_limit=false` y reinicio el 5 de septiembre de 2026 a las
6:13 p. m. COT.

- el piloto Multilingual v2 requiere 2.845 créditos y sí cabe;
- el lote completo Multilingual v2 requiere 68.890: faltan 38.719;
- incluso Flash v2.5 requiere 34.445: faltan 4.274 antes del piloto;
- por tanto, el piloto puede aprobarse y producirse ahora, pero el lote completo exige
  esperar al reinicio, cambiar de plan o añadir capacidad por otra vía autorizada.

## 4. Piloto de diez archivos

El TSV marca `sample_candidate=yes` para:

- `media:toefl:set-1:listening-m1-choose-6`;
- `media:toefl:set-1:listening-m2-choose-1`;
- `media:toefl:set-1:listening-m2-conversation`;
- `media:toefl:set-1:listening-m2-announcement`;
- `media:toefl:set-1:listening-m2-academic-talk`;
- `media:toefl:set-1:speaking-repeat-7`;
- `media:toefl:set-1:speaking-interview-1`;
- `media:toefl:set-2:listening-m1-choose-6`;
- `media:toefl:set-2:listening-m1-choose-7`;
- `media:toefl:set-2:listening-m2-conversation`.

Cubren las diez voces propuestas: dos mujeres, dos hombres, dos estudiantes, staff,
announcer, professor e interviewer; frase corta, diálogo multivoz, monólogo largo,
repetición y pregunta oral. El piloto se crea fuera de `public/`, no cambia el registro
de medios y no habilita preguntas.

## 5. Gate de producción

Orden obligatorio:

1. consultar voces/modelos/multiplicadores sin generar;
2. fijar diez `voice_id` y el costo recalculado;
3. recibir aprobación explícita del owner para el piloto y su techo de gasto;
4. generar sólo los diez archivos en un directorio temporal;
5. medir decodificación, duración, 44,1 kHz, mono, 64 kbps final, LUFS y true peak;
6. comparar cada audio contra el guion con Whisper local y revisar diferencias;
7. escuchar manualmente las diez muestras y aprobar/rechazar voz, ritmo y naturalidad;
8. recibir aprobación explícita para el lote completo;
9. generar los 390 restantes sin sobrescribir los 260 MP3 existentes;
10. repetir QA técnica, Whisper y escucha humana, actualizar el registro de medios,
    reconstruir, publicar un preview y sólo entonces pedir autorización de producción.

Hasta cerrar los pasos 1–3, ningún uso de la API que consuma créditos está autorizado.

## 6. Script de producción preparado, no ejecutado

`npm run audio:toefl-2026` es únicamente una factura local: no consulta la API, no lee
la clave y no escribe audio. El script sólo permite generar si recibe simultáneamente:

- `--sample` o `--all`, nunca ambos;
- `--generate`;
- el SHA exacto mediante `--approve-manifest`;
- un techo positivo mediante `--max-usd`;
- los diez `voice_id`/multiplicadores y `approval=approved_by_owner`;
- `ELEVENLABS_API_KEY` sólo en el entorno;
- para el lote completo, `--approve-full-batch 400`.

Incluso con esos gates, escribe primero en un directorio temporal y rechaza como destino
`public/audio/toefl`. `--list-voices` y `--account` son las únicas consultas de cuenta y
son de sólo lectura. La prueba negativa confirmó que `--sample --generate` sin el hash
aprobado se detiene antes de leer la clave o llamar la API.

Verificación: manifiesto 400/400 reproducible, factura seca PASS, ESLint dirigido PASS,
catálogo 465 PASS, TypeScript PASS y guardianes Listening/Speaking/sesión fija PASS. La
prueba negativa con hash y techo válidos también se detuvo en
`approval=approved_by_owner`, antes de leer la clave o llamar TTS.
