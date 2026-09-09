# Goethe A1 · Simulacro 1 para clase

Estado: listo para aplicación local. El contenido es original de WeLearn y replica la arquitectura pública de Start Deutsch 1; no es material oficial ni está afiliado al Goethe-Institut.

## Ruta

`/examenes/goethe/practica/a1-1`

## Arquitectura aplicada

| Módulo | Tiempo | Partes | Producción evaluada | Puntos |
| --- | ---: | ---: | --- | ---: |
| Hören | 20 min | 3 | 6 A/B/C + 4 R/F + 5 A/B/C | 25 |
| Lesen | 25 min | 3 | 5 R/F + 5 A/B + 5 R/F | 25 |
| Schreiben | 20 min | 2 | formulario de 5 datos + mensaje de ~30 palabras | 25 |
| Sprechen | 15 min | 3 | presentación + 2 rondas de preguntas + peticiones | 25 |

Total: 80 minutos, 100 puntos, aprobación desde 60 puntos.

## Audio aprobado

- Máster completo: 18:11.640.
- Teil 1: 06:56.280, cada texto se escucha dos veces.
- Teil 2: 02:54.320, cada texto se escucha una vez.
- Teil 3: 08:17.040, cada texto se escucha dos veces e incluye tres minutos de transferencia.
- Una señal acústica descendente de tres tonos precede cada reproducción puntuable y las dos reproducciones del ejemplo de Teil 1; en las partes repetidas también marca la segunda escucha.
- Reactivos: entre 13.60 y 18.00 segundos.
- Codificación final: MP3, mono, 44.1 kHz, 64 kbps, normalizado a -18 LUFS.
- Reparto: `WL de · Klara` (locución), `WL de · Emma` y `WL de · Frau Schneider` (voces femeninas), `WL de · Jonas` y `WL de · Herr Becker` (voces masculinas).
- Las 28 fuentes naturales están en `public/audio/goethe/a1-1/voice-sources/`; el ensamblaje añade lecturas, pausas y repeticiones de forma determinista.

## Láminas visuales originales

- Hören Teil 1 incluye seis trípticos A/B/C: precio, hora, comida, cantidades, plantas de biblioteca y duración de viaje.
- Lesen Teil 2 incluye cinco pares A/B con estética de anuncio: bicicleta, curso de alemán, alojamiento/desayuno, entradas/viaje y médico/farmacia.
- Sprechen Teil 3 incluye dos hojas con doce tarjetas pictográficas para peticiones y reacciones.
- Son ilustraciones originales de WeLearn generadas para este simulacro; no reutilizan las láminas oficiales.
- Los textos y números críticos permanecen también como opciones HTML accesibles, para que la evaluación no dependa del reconocimiento visual del texto dentro de una imagen.

## Modos de aplicación

- Modo clase: permite repetir pistas, ver la transcripción docente, usar la hoja imprimible y registrar audio oral opcional.
- Modo simulacro: cronómetro global de 80 minutos y una sola activación por pista; cada pista ya contiene las repeticiones reglamentarias.
- Hören muestra los dos ejemplos que forman parte del audio (antes de Teil 1 y Teil 2); cada parte de Lesen incluye un ejemplo resuelto y deshabilitado antes de las preguntas puntuables.

## Corrección

- Hören y Lesen se califican automáticamente y escalan a 25 puntos por módulo.
- Schreiben usa tres criterios de cumplimiento (3/1.5/0) y convenciones (1/0.5/0), luego escala a 25.
- Sprechen usa máximos crudos 3 + 6 + 6 y escala a 25.
- El resultado final se muestra cuando el docente completa las rúbricas manuales.

## Inventario mínimo

- 1 runner especializado, 1 módulo CSS y 1 set de datos TypeScript.
- 1 guion JSON versionado.
- 28 fuentes de voz natural.
- 15 clips individuales, 3 pistas por parte y 1 máster completo.
- 6 láminas A/B/C de Hören, 5 pares de anuncios A/B de Lesen y 2 hojas de tarjetas de Sprechen.
- 1 hoja de respuestas imprimible integrada.
- 1 rúbrica de Schreiben y 1 rúbrica de Sprechen integradas.
- 1 generador de montaje y 1 verificador estructural/de audio.

## Comandos

```bash
node scripts/generate-goethe-a1-set1-audio.mjs
node scripts/check-goethe-a1-set1.mjs
```

El generador no contiene ni necesita una clave de ElevenLabs: trabaja sobre las fuentes de voz ya aprobadas y versionadas.
