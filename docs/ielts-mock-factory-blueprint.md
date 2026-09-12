# Blueprint de fábrica IELTS Academic: Sets 21–40

Este blueprint extiende el contrato validado de Sets 1–20 sin iniciar consumo de ElevenLabs. La configuración ejecutable está en `config/ielts-harness/factory-blueprint.json` y el comando `npm run scaffold:ielts-expansion` crea la cola de trabajo para Sets 21–40.

Cada set nuevo debe conservar cuatro partes y 40 preguntas de Listening, tres pasajes y 40 preguntas de Reading, dos tareas de Writing, tres partes de Speaking, hoja de respuestas, persistencia por versión y captura del lead. Reading debe quedar entre 2.150 y 2.750 palabras. El guion de Listening debe tener al menos 680 palabras por parte y 2.800 por set.

La producción avanza por compuertas. Primero se congela el contenido y una revisión académica independiente prueba cada respuesta. Después se revisan los visuales de Writing y la continuidad de Speaking. Solo entonces se calcula el costo exacto de ElevenLabs. El primer set de cada expansión funciona como piloto; los siguientes se producen en lotes de dos mientras haya créditos suficientes, con 20 % de reserva.

Los audios históricos guardados en USB forman un banco de candidatos. Para reutilizar uno se debe demostrar nuevamente la correspondencia con las 40 preguntas, pasar QA técnico, ASR con tiempos Q1–Q40 y revisión humana. Ningún archivo del archivo histórico se copia directamente a producción.

La liberación usa la misma regla actual: el harness puede aprobar evidencias de dominio, pero solo una persona puede firmar la huella consolidada. Cualquier cambio posterior en contenido, clave, audio o visual invalida esa firma.
