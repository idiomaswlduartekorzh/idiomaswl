# Producción fiable de audio IELTS

Esta tubería separa inventario, producción, auditoría y publicación. Ningún MP3 generado por ElevenLabs se escribe directamente en `public/audio/ielts`, y ningún agente puede aprobar su propio trabajo.

## Estado congelado

- Conservar provisionalmente y auditar completos: Sets 1 y 5–12.
- Reemplazar porque el MP3 pertenece a otro examen: Sets 2–4.
- Crear porque el MP3 no existe: Sets 13–20.
- Los once guiones que requieren audio tienen cuatro partes, Q1–Q40, respuestas de completación presentes en su parte y densidad mínima de 2.800 palabras.
- El manifiesto canónico es `config/ielts-audio/production-manifest.json`. Todo cambio de guion, política o registro cambia su hash e invalida casting, factura y evidencia posterior.

## Auditoría local actual

- Los doce MP3 existentes pasan decodificación integral con FFmpeg.
- Sets 5, 6, 7, 8, 10, 11 y 12 contienen 33/33 respuestas escritas en orden y quedan como candidatos de conservación sujetos a escucha humana.
- Set 1 contiene 32/33: Q17 (`free entry`) falta dentro de una ventana silenciosa verificada. Su transcript editorial también es abreviado y debe completarse antes del cierre editorial.
- Set 9 contiene 31/33: Q26 (`graphs`) y Q28 (`reliability`) faltan dentro de una ventana silenciosa; la reparación incluye también Q27 para mantener el diálogo y el orden natural.
- El lote completo obligatorio son once MP3, 210.420 caracteres facturables, 105.489 créditos estimados y USD 10,521 antes de impuestos con Flash v2.5.
- Las dos reparaciones suman 358 caracteres, 179 créditos estimados y USD 0,0179 antes de impuestos.

## Agentes y autoridad

`config/ielts-audio/agent-topology.json` define siete funciones: coordinación, auditoría de guion, auditoría de reutilización, casting y coste, producción TTS, QA independiente y publicación. Solo el productor llama a ElevenLabs. Solo el publicador puede tocar la ruta pública, y únicamente con QA técnico, ASR y revisión humana ligados al mismo hash de audio.

## Gates

1. `SCRIPT_VALIDATED`: estructura, densidad, preguntas, completaciones y segmentación pasan.
2. `COSTED`: saldo, multiplicadores 1×, factura y reserva pasan antes de la primera solicitud.
3. `PILOT_PASS`: Set 2 pasa timing, señal, ASR y escucha completa.
4. `TECH_PASS`: MP3 mono 44,1 kHz/64 kbps, duración 29–30 minutos, al menos 990 segundos audibles, silencio máximo 45 %, LUFS y true peak dentro de rango.
5. `ASR_PASS`: WER máximo 8 %, etiquetas de hablante excluidas y completaciones encontradas en orden, incluso si una frase cruza segmentos ASR.
6. `HUMAN_AUDIO_REVIEW`: una persona escucha el archivo completo y aporta evidencia Q1–Q40.
7. `PUBLISH_APPROVED`: copia atómica con respaldo del MP3 anterior y recibo hashado.

## Coste y modelo

La opción base es `eleven_flash_v2_5`. El manifiesto factura el texto exacto que se enviará tras convertir teléfonos, importes, porcentajes, años y letras deletreadas a formas pronunciables. Multilingual v2 queda reservado para segmentos que fallen dos intentos idénticos. El lote obligatorio se ejecuta en oleadas para respetar la reserva de créditos.

## Comandos

```bash
npm run plan:ielts-audio
npm run plan:ielts-audio-repairs
npm run test:ielts-audio-production
npm run audio:ielts
```

El tercer comando sin `--generate` es siempre un dry run. Las consultas `--account` y `--list-voices` requieren `ELEVENLABS_API_KEY` y son de solo lectura. La generación exige, además, selección de sets, hash aprobado, techo en USD, reserva y semilla reproducible.

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
npm run publish:ielts-audio -- <directorio-generado>
```

El publicador falla si faltan `asr-report-set-N.json` o `human-review-set-N.json`, si algún hash cambió o si la evidencia no cubre Q1–Q40.

La auditoría de conservación usa MLX Whisper de forma local y guarda transcripciones y reportes fuera de las rutas públicas. Requiere el entorno aislado `output/tools/asr-venv`; el modelo base es `mlx-community/whisper-small-mlx`. Para conservar exige el 100 % de las respuestas de completación en orden y limita la diferencia textual al 25 %, porque las locuciones existentes pueden variar editorialmente. Los audios nuevos conservan el gate estricto de WER máximo 8 %. Un resultado automático favorable todavía exige escucha humana completa antes de publicar.

Los silencios confirmados de Set 1 Q17 y Set 9 Q26–Q28 tienen un manifiesto de reparación independiente. La reparación conserva el hash del audio fuente, reemplaza solo la ventana silenciosa, mantiene la duración total y queda en staging para repetir ASR y escucha humana. Su dry run es `npm run audio:ielts-repairs`; la generación requiere el hash del manifiesto de reparación, sets, semilla, techo de coste y reserva de créditos. `npm run audit:ielts-audio-repairs -- --sets=1,9` vuelve a transcribir el resultado y exige que las respuestas reparadas aparezcan en orden.
