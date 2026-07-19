# Prompts de audio — lote 01 de lecturas

Estado: prompts listos · audio narrado no generado · controles de narración invisibles en la interfaz. La grabadora privada del estudiante es una función separada.

Regla de activación: no añadir `audio.src` a ningún ejercicio ni mostrar controles hasta que todos los archivos del lote aprobado existan, coincidan exactamente con sus transcripciones y pasen control humano. El piloto conserva `"audio": null`.

## Especificación común para el lote

- Una sola voz adulta por lectura; natural, cálida y docente, no publicitaria.
- Velocidad clara para el nivel, sin entonación infantil ni pausas artificiales entre palabras.
- Leer el texto de forma literal: no añadir título, instrucciones, explicaciones ni despedidas.
- Mantener nombres, contracciones y cifras exactamente como aparecen en la transcripción.
- Dejar aproximadamente 300 ms de silencio al inicio y 500 ms al final.
- Entrega maestra: WAV mono, 48 kHz, 24 bit. Derivado web: MP3 mono, 128 kbps.
- Normalización objetivo: -16 LUFS integrados; pico verdadero máximo: -1 dBTP.
- Nombre provisional: `<exercise-id>.wav` y `<exercise-id>.mp3`.

## Prompt 01 — piloto inglés A1

**Archivo:** `en-a1-my-morning-at-the-cafe`

**Prompt de dirección de voz:**

> Read the transcript exactly as written in clear, natural global English. Use one warm adult voice. The learner is at CEFR A1, so speak at approximately 105–115 words per minute, with natural sentence rhythm and short pauses only at punctuation. Do not exaggerate pronunciation. Give slight emphasis to “eight o’clock”, “tea with milk”, and “sandwich for later”, without making the answers sound artificially obvious. Do not read the title. Do not add or remove any word.

**Transcripción bloqueada:**

> Emma usually arrives at the café at eight o’clock. She sits near the window and orders tea with milk. Today, the café is busy. A man is waiting at the counter, and two students are talking about school. Emma reads a short message from her sister. At the end, she orders a sandwich for later. Then she leaves.

**Control humano:** acento coherente; `usually`, `café`, `eight o’clock` y terminaciones de tercera persona claramente audibles; duración esperada aproximada de 30–36 segundos.

## Prompt de validación posterior a la generación

> Compare this audio against the locked transcript word by word. Report every omission, addition, substitution, repeated word, unnatural pause, clipped sound, background artifact, pronunciation issue, or mismatch in speaker/accent. Return PASS only if the spoken content matches exactly and the technical delivery meets the batch specification. Do not repair or reinterpret the transcript.

## Puerta para hacer visible el audio

El lote solo se activa cuando cada fila del manifiesto tenga: archivo maestro, archivo web, coincidencia literal, aprobación lingüística, aprobación técnica y duración registrada. Hasta entonces, la página no anuncia audio narrado pendiente ni reserva espacio para ese reproductor. La auto-grabación local no depende del lote y nunca se sube a WeLearn.
