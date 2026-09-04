# Nuevas ejecuciones ASR privadas — 4 de septiembre de 2026

Estado: evidencia nueva generada y revisada por agentes, pendiente de incorporación
auditada a las candidatas. No hay aprobación humana, promoción ni publicación.
Los manifests y ASR canónicos anteriores permanecen intactos. Sus decisiones técnicas
siguen bloqueadas por el vínculo de entrada ausente; este informe no cambia esos gates.

## Procedencia y verificación

Las dos ejecuciones reales usaron el runner de `d393bbc0`, no el backend simulado de
sus ocho pruebas. Cada ejecución terminó con exit 0, conservó un snapshot exacto del
MP3 y escribió `asr.json` y `provenance.json` en un directorio privado nuevo de la USB.
No hubo API, subida de audio, regeneración de MP3 ni descarga de modelo.

| Dato | Part 2 | Part 3 |
|---|---|---|
| Directorio bajo `tmp/ielts-asr-runs/` | `part-2-w991_efa` | `part-3-w1feknit` |
| Inicio UTC | 2026-09-04 14:45:08.476317 | 2026-09-04 15:03:07.546067 |
| Fin UTC | 2026-09-04 14:46:20.770917 | 2026-09-04 15:04:22.921462 |
| Bytes del MP3/snapshot | 2778867 | 3519917 |
| Bytes del ASR nuevo | 42541 | 46708 |
| Segmentos ASR | 69 | 73 |
| Idioma | en | en |

Runtime: `openai-whisper==20250625`, modelo local `small`, Python 3.9.6, Torch 2.8.0,
NumPy 2.0.2, CPU con dos threads, `fp16=false`, `temperature=0`, tarea `transcribe`.
Entorno, temporales y cachés nuevos: USB. El modelo previamente existente en el disco
interno se leyó sin modificarlo. Se utilizó `python -B` para evitar bytecode nuevo.

Huellas SHA-256 comprobadas contra los artefactos:

| Artefacto | SHA-256 |
|---|---|
| Runner (9034 bytes) | `4dcfa08bee81b5ac8a2684bda7d2822cc00a04ece8a85343c9609f95d2db2c9f` |
| Modelo small (483617219 bytes) | `9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794` |
| FFmpeg (441728 bytes) | `00d01197255300c02122c783dd0126a9e7f47d6c6a19faafae2e6610efd071d3` |
| Part 2 MP3/snapshot | `6ed0f9f1038a2ab6cf4f257b587e4d1ac6afc9213c2625fe9a4fb71b879f60a7` |
| Part 2 ASR nuevo | `a9009128d06a5271d81bebb4b64c6e75f111c80618d7ddf3d26c24c752db3ec0` |
| Part 2 provenance.json | `6d6c8bf653c4ee50271ac77876f44ddaff01b1a4ae1fcd7fc0f3e55ac8660e22` |
| Part 2 ASR canónico anterior, preservado | `a2d7cf677273e8761dfdfa9d37ec48c4cf6810608303748334ad780ad8ac6ebb` |
| Part 3 MP3/snapshot | `1e39cc939b1bf95ef08762a432f44c3e69682e78aea45d9dfbe4890afca5db27` |
| Part 3 ASR nuevo | `5a3032fc7fc5125648b8093ca97509a7290bb5f25e50e242872a38c5ea5679dd` |
| Part 3 provenance.json | `d3ad47941b3ce88c9496980aaf605a0be6016e45aceb266baadada7914895e2b` |
| Part 3 ASR canónico anterior, preservado | `a3956b985e975b47e6d24e67d197e68edff1a658fb6c09436eeec72d9beafb35` |

El orquestador verificó igualdad byte a byte entre cada entrada canónica y su snapshot,
bytes/hashes declarados de entrada, runner y salida, igualdad del hash de entrada con el
manifest, identidad, idioma, segmentos no vacíos, conservación del ASR anterior y gates
humanos nulos. El runner verificó el modelo local antes/después de transcribir y lo
contrastó con la huella del modelo `small` declarada por el paquete Whisper instalado.
Esto acredita la entrada de estas ejecuciones, no la calidad acústica ni una tasa de acierto.

## Revisión semántica independiente — Part 2

El agente `asr_runner_review` comparó el ASR nuevo con el source, preguntas,
explicaciones y coordenadas/descripcion del SVG. Diez claves tienen evidencia presente
y no contradictoria. Los tiempos son segundos del ASR, no cue points nuevos de producto.

| Pregunta | Clave | Intervalo | Evidencia breve del ASR nuevo |
|---|---|---|---|
| 11 | C | 24.24–31.00 | practical tables themselves open at half past nine |
| 12 | B | 48.20–52.68 | one small, portable household item |
| 13 | A | 75.12–81.00 | six bicycle stands need considerably more working room |
| 14 | C | 97.32–101.92 | accompanying adult must stay beside them |
| 15 | B | 101.92–110.56 | covers the small materials |
| 16 | H | 136.60–142.60 | turn immediately to your right; beside the entrance |
| 17 | F | 151.08–157.44 | large room in the far south-west corner |
| 18 | A | 177.16–180.80 | immediately to the right of the toilets |
| 19 | E | 188.72–197.20 | cross to its eastern side; opposite the western materials shop |
| 20 | C | 213.32–216.72 | immediately to the left of that exit |

Cautelas realmente observadas, sin copiar automáticamente las del ASR anterior:

- Amira y Children under 12 ahora se reconocen; inner tube sólo pierde el guion.
- Persisten upper-left → our left corner y glass-fronted → glass frontage.
- Aparecen Larkspur → Larkspot, six-pound → six-band, repairers → repairs,
  being kept → beating kept, don't queue → don't you, its price → it's priced y
  exit itself clear → exit as self-clear.
- No cambian las diez claves, pero precio y orientación requieren escucha focalizada.
- No se inspeccionó el mapa renderizado ni se validó su accesibilidad con navegador.

## Revisión semántica independiente — Part 3

Diez claves son compatibles y no hay contradicciones observadas. Q21–29 tienen evidencia
textual directa; Q30 es contextual con nombre truncado. No declarar diez nombres/evidencias
perfectamente reconocidos ni suplir la diferenciación de voces con esta transcripción.

| Pregunta | Clave | Intervalo | Evidencia breve del ASR nuevo |
|---|---|---|---|
| 21 | A | 35.80–41.20 | 18 of the 24 cards; play louder or more quietly |
| 22 | B | 74.24–84.28 | green as a complement and amber as a warning |
| 23 | A | 111.28–119.28 | After each four minute performance, allow 90 seconds |
| 24 | C | 151.28–162.28 | first and second versions of one passage; Exactly |
| 25 | B | 172.28–179.28 | problem identified; is reduced in the repeated performance |
| 26 | A, Lara | 204.28–211.28 | Lara should take the headings forward |
| 27 | B, Jonah | 226.28–229.28 | Jonah, bring me two timed extracts |
| 28 | C, Dr Harlow | 237.28–247.28 | checked by the course tutor; your task, Dr Harlow |
| 29 | B, Jonah | 262.28–267.28 | Jonah, you'll handle the rehearsal materials |
| 30 | A, Lara (contextual) | 274.28–286.28 | I can design the visual; La take responsibility |

En Q30, Jonah ya está ocupado con los pasajes y tarjetas; la oferta y la confirmación
truncada apoyan A por contexto. El ASR no tiene diarización ni reconoce el nombre completo
en el cierre: escuchar específicamente 274–287 s y evaluar las voces sigue siendo obligatorio.

Cautelas actualizadas:

- Persisten Mereford → Mayerford, apertura Lara and Jonah → Lauren Jonah,
  compliment → complement, cierre Lara → La y that comparison → their comparison.
- Select two and time them ahora está reconocido; las menciones intermedias dicen
  Lara, no Laura. No trasladar esas dos cautelas antiguas al nuevo manifest.
- El error Volume was simply → while you were simply corresponde a Jonah, no al
  resumen del tutor. La evidencia louder/quieter de Q21 se mantiene explícita.
- New variable → any variable; Have the ensemble perform se convierte en la pregunta
  Have the ensemble performed; one question → when question; Yes → Thus; minute → minutes.
  La aclaración posterior conserva la comparación de Q24.

## Siguiente incremento y fronteras

1. No volver a transcribir estos audios sin una causa nueva; no hay procesos pendientes.
2. Preservar los ASR anteriores en un archivo histórico privado antes de incorporar los
   nuevos ASR y sus provenance. No rellenar un hash de entrada en la evidencia vieja.
3. Incorporar los artefactos nuevos, bytes, hashes, fecha, cautelas y contrato de
   procedencia juntos. Mantener la limitación contextual de Q30 visible.
4. Actualizar las aserciones canónicas de Part 3 y del guardián privado sólo con esta
   evidencia; conservar mutaciones de hash ausente/incorrecto y todos los gates humanos.
5. Ejecutar las suites pertinentes y la revisión independiente del cambio exacto.
   No basta con editar manifests para obtener READY.
6. Ninguna landing, catálogo, sitemap, asset público, source de práctica ni archivo TOEFL
   cambia en este incremento. Escucha humana, revisión editorial y promoción siguen pendientes.

El respaldo remoto del runner `d393bbc0` continúa pendiente de autorización tras el rechazo
del control automático. No se reintentó ni se usó un canal alternativo. Este informe y los
artefactos nuevos siguen en la USB; los runs de `tmp/` no forman parte del respaldo Git.
