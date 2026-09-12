# Producción fiable de audio IELTS

Esta tubería separa inventario, producción, auditoría y publicación. Ningún MP3 generado por ElevenLabs se escribe directamente en `public/audio/ielts`, y ningún agente puede aprobar su propio trabajo.

## Estado congelado

- Set 1 conserva una reparación focal ya aprobada como parte del lote de staging.
- Reemplazar después de auditoría multidimensional: Sets 5–8 y 10–12.
- Reemplazar porque el MP3 pertenece a otro examen: Sets 2–4.
- Crear porque el MP3 no existe: Sets 13–20.
- Los once guiones que requieren audio tienen cuatro partes, Q1–Q40, respuestas de completación presentes en su parte y densidad mínima de 2.800 palabras.
- El manifiesto canónico es `config/ielts-audio/production-manifest.json`. Todo cambio de guion, política o registro cambia su hash e invalida casting, factura y evidencia posterior.

## Auditoría local actual

- Los doce MP3 existentes pasan decodificación integral con FFmpeg.
- Sets 5, 6, 7, 8, 10, 11 y 12 contienen 33/33 respuestas escritas en orden, pero la auditoría multidimensional recomienda reemplazar sus MP3. Todos duran exactamente 24 minutos, contienen solo 8,31–9,20 minutos audibles, acumulan 61,66–65,36 % de silencio y presentan pausas individuales de hasta 135,9 segundos.
- Los siete guiones heredados tienen solo 1.299–1.358 palabras frente al mínimo de producción de 2.800, y su WER de 17,21–21,71 % supera el máximo de producción del 8 %. Los archivos decodifican completos y usan el formato técnico esperado, así que preguntas, respuestas y estructura pueden servir como restricciones de reconstrucción; los MP3 no se aprueban para reutilización.
- La revisión semántica independiente cubrió las 42 filas no-completion: 49/49 puntos tienen clave respaldada por el transcript, 91/91 distractores se pueden descartar y no se detectaron claves ambiguas. El ASR respalda 41/42 filas; Set 10 Q21 requiere escucha puntual cerca de 14:18,5 porque Whisper omitió parte de `community library`.
- La revisión de señal no encontró clipping, corte terminal duro ni un clic concluyente en un empalme. Sí encontró un molde artificial repetido de 16 pausas largas por archivo. Sets 6 y 10 concentran más transitorios fuertes; Set 7 es el más limpio. Se pueden rescatar fragmentos seleccionados, pero ninguno de los siete másteres completos.
- Set 1 contiene 32/33: Q17 (`free entry`) falta dentro de una ventana silenciosa verificada. Su transcript editorial también es abreviado y debe completarse antes del cierre editorial.
- Set 9 contiene 31/33: Q26 (`graphs`) y Q28 (`reliability`) faltan dentro de una ventana silenciosa; la reparación incluye también Q27 para mantener el diálogo y el orden natural.
- Los once MP3 de reemplazo o creación (Sets 2–4 y 13–20) ya están generados en staging. Todos duran 29:05, aprobaron el QA técnico y contienen en orden todas sus respuestas de completación auditables. Aún requieren escucha humana completa.
- El lote completo obligatorio son once MP3, 209.598 caracteres facturables, 105.076 créditos estimados y USD 10,4799 antes de impuestos con Flash v2.5. El consumo real acumulado de la cuenta fue menor que esta estimación conservadora.
- Las dos reparaciones suman 358 caracteres, 179 créditos estimados y USD 0,0179 antes de impuestos.
- Las reparaciones regeneradas de Sets 1 y 9 aprobaron decodificación, conservación de duración y evidencia efectiva 33/33. Permanecen en staging hasta la escucha humana.

## Agentes y autoridad

`config/ielts-audio/agent-topology.json` define siete funciones: coordinación, auditoría de guion, auditoría de reutilización, casting y coste, producción TTS, QA independiente y publicación. Solo el productor llama a ElevenLabs. Solo el publicador puede tocar la ruta pública, y únicamente con QA técnico, ASR y revisión humana ligados al mismo hash de audio.

## Gates

1. `SCRIPT_VALIDATED`: estructura, densidad, preguntas, completaciones y segmentación pasan.
2. `COSTED`: saldo, multiplicadores 1×, factura y reserva pasan antes de la primera solicitud.
3. `PILOT_PASS`: Set 2 pasa timing, señal y ASR antes de abrir la producción por lotes.
4. `TECH_PASS`: MP3 mono 44,1 kHz/64 kbps, duración 29–30 minutos, al menos 990 segundos audibles, silencio máximo 45 %, LUFS y true peak dentro de rango.
5. `ASR_PASS`: WER máximo 8 %, etiquetas de hablante excluidas y completaciones encontradas en orden, incluso si una frase cruza segmentos ASR. Si Whisper falla sobre la grabación larga, se transcriben las cuatro partes completas por separado y cada una debe cumplir el mismo umbral.
6. `HUMAN_AUDIO_REVIEW`: una persona escucha el archivo completo y aporta evidencia Q1–Q40.
7. `PUBLISH_APPROVED`: copia atómica con respaldo del MP3 anterior y recibo hashado.

Cada segmento se recorta, normaliza y termina con una rampa de 10 ms que lleva sus extremos a cero. Este de-click elimina empalmes abruptos sin suavizar perceptiblemente el ataque de la voz. El hash del casting incluye esta política y vuelve obsoleta cualquier evidencia generada con otro ensamblado.

La aprobación representativa de calidad auditiva del lote se conserva en `config/ielts-audio/batch-quality-approval.json` y queda ligada al hash de cada MP3. Esta decisión permite cerrar el criterio de naturalidad del lote, pero no sustituye la evidencia humana Q1–Q40 ni autoriza por sí sola la publicación.

## Coste y modelo

La opción base es `eleven_flash_v2_5`. El manifiesto factura el texto exacto que se enviará tras convertir teléfonos, importes, porcentajes, años y letras deletreadas a formas pronunciables. Multilingual v2 queda reservado para segmentos que fallen dos intentos idénticos. El lote obligatorio se ejecuta en oleadas para respetar la reserva de créditos.

## Comandos

```bash
npm run plan:ielts-audio
npm run plan:ielts-audio-repairs
npm run test:ielts-audio-production
npm run audit:ielts-legacy-batch -- --sets=5,6,7,8,10,11,12 --output=output/ielts-legacy-batch-audit.json --decision-output=config/ielts-audio/legacy-audio-audit-decision.json
npm run report:ielts-legacy-audit -- --output-dir=output/legacy-audio-audit
npm run audio:ielts
```

El tercer comando sin `--generate` es siempre un dry run. Las consultas `--account` y `--list-voices` cargan `ELEVENLABS_API_KEY` desde el entorno o desde `.env.local`, que permanece fuera de Git, y son de solo lectura. La generación exige, además, selección de sets, hash aprobado, techo en USD, reserva y semilla reproducible.

```bash
npm run audio:ielts -- --account
npm run audio:ielts -- --list-voices
npm run transcribe:ielts-existing-audio -- --sets=1,5-12
npm run audio:ielts -- --generate --sets 2 \
  --approve-manifest <sha256> --max-usd 1.1 \
  --min-remaining-credits 5000 --seed-salt <valor-no-secreto>
```

Después del piloto:

```bash
npm run audit:ielts-generated-audio -- <directorio-generado>
npm run audit:ielts-staged-audio -- --sets=<lista> --input-dir=<directorio-generado>
npm run scaffold:ielts-audio-human-review -- <directorio-generado>
npm run publish:ielts-audio -- <directorio-generado>
```

El scaffold crea `human-review-set-N.template.json` sin aprobar nada. Una persona debe escuchar el audio completo y registrar para Q1–Q40 estado, inicio, fin, frase audible y justificación. El publicador falla si faltan `staged-asr-qa-set-N.json` o `human-review-set-N.json` dentro del directorio de cada set, si algún hash cambió o si la evidencia humana está incompleta.

La auditoría de conservación usa MLX Whisper de forma local y guarda transcripciones y reportes fuera de las rutas públicas. Requiere el entorno aislado `output/tools/asr-venv`; el modelo base es `mlx-community/whisper-small-mlx`. El umbral exploratorio del 25 % sirve para localizar respuestas y descartar archivos inconexos; no concede aprobación de producción. La decisión final de conservación combina cobertura y orden de respuestas, longitud del guion, ventana temporal oficial, densidad audible, silencios, WER de producción, codificación, nivel, pico y decodificación integral. Los audios nuevos y cualquier legado que aspire a conservarse deben cumplir el WER máximo de 8 %. Un resultado automático favorable todavía exige escucha humana completa antes de publicar.

Los silencios confirmados de Set 1 Q17 y Set 9 Q26–Q28 tienen un manifiesto de reparación independiente. La reparación conserva el hash del audio fuente, reemplaza solo la ventana silenciosa, mantiene la duración total y queda en staging para repetir ASR y escucha humana. Su dry run es `npm run audio:ielts-repairs`; la generación requiere el hash del manifiesto de reparación, sets, semilla, techo de coste y reserva de créditos. `npm run audit:ielts-audio-repairs -- --sets=1,9` vuelve a transcribir el resultado y exige que las respuestas reparadas aparezcan en orden.

Las reparaciones usan el mismo scaffold de revisión humana y se publican con `npm run publish:ielts-audio-repairs -- <directorio-reparaciones>`. Este publicador conserva una copia del MP3 anterior y exige QA y revisión Q1–Q40 ligados al hash de la reparación. `npm run report:ielts-audio-status` reconstruye el tablero de producción a partir de los artefactos actuales.
