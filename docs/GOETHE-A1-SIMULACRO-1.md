# Goethe A1 · Simulacro 1 para clase

## Circuito de entrega y evaluación

- El estudiante avanza en orden por Hören, Lesen, Schreiben y Sprechen; la ruta pública no muestra transcripciones ni una hoja imprimible.
- Antes del resultado se capturan nombre, correo y WhatsApp. Las respuestas se validan y califican de nuevo en servidor.
- Las tres grabaciones de Sprechen se suben mediante enlaces temporales a un bucket privado; no existen políticas públicas de lectura.
- El resultado inmediato confirma Hören, Lesen y el formulario de Schreiben. El score definitivo sobre 100 se publica cuando administración aplica la rúbrica de Schreiben Teil 2 y Sprechen.
- El panel administrativo conserva la hoja digital completa: respuesta por respuesta, formulario, mensaje, audios, evidencia del revisor, puntaje bruto sobre 60, conversión por factor 1,66 y estado bestanden/nicht bestanden.

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
- Una señal acústica descendente de tres tonos, ajustada a 990/831/698 Hz, precede cada reproducción puntuable y las dos reproducciones del ejemplo de Teil 1; en las partes repetidas también marca la segunda escucha.
- Reactivos: entre 13.60 y 18.00 segundos.
- Codificación final: MP3, mono, 44.1 kHz, 64 kbps, normalizado a -18 LUFS.
- Reparto: `WL de · Klara` (locución), `WL de · Emma` y `WL de · Frau Schneider` (voces femeninas), `WL de · Jonas` y `WL de · Herr Becker` (voces masculinas).
- Las 28 fuentes naturales están en `public/audio/goethe/a1-1/voice-sources/`; el ensamblaje añade lecturas, pausas y repeticiones de forma determinista.

## Láminas visuales originales

- Hören Teil 1 incluye un tríptico A/B/C para el ejemplo y seis trípticos puntuables: precio, hora, comida, cantidades, plantas de biblioteca y duración de viaje.
- Lesen Teil 2 incluye seis pares A/B con estética de anuncio: un ejemplo de clima y cinco reactivos sobre bicicleta, curso de alemán, alojamiento/desayuno, entradas/viaje y médico/farmacia. Cada par se presenta como dos anuncios compactos con fotografía, encabezado y texto HTML integrado, igual que en el Set 2.
- Los avisos de Lesen Teil 3 alternan deliberadamente textos breves y extensos dentro del rango A1, en lugar de repetir cinco carteles de longitud uniforme.
- Sprechen Teil 3 incluye dos hojas con doce tarjetas pictográficas para peticiones y reacciones.
- Son ilustraciones originales de WeLearn generadas para este simulacro; no reutilizan las láminas oficiales.
- Los textos y números críticos permanecen como HTML accesible, para que la evaluación no dependa del reconocimiento visual del texto dentro de una imagen.

## Modos de aplicación

- La ruta pública abre directamente en modo examen: cronómetro global de 80 minutos y una sola activación por pista; cada pista ya contiene las repeticiones reglamentarias.
- El examen avanza en orden cerrado por Hören, Lesen, Schreiben y Sprechen. El indicador superior comunica el progreso, pero no permite saltar entre bloques ni volver a uno ya cerrado.
- El modo guiado/clase permanece conservado en el runner para una futura ruta separada: allí se podrán habilitar repeticiones, transcripciones y apoyos docentes sin mezclarlos con la simulación.
- Hören muestra los dos ejemplos que forman parte del audio (antes de Teil 1 y Teil 2); cada parte de Lesen incluye un ejemplo resuelto y deshabilitado antes de las preguntas puntuables.
- Sprechen baraja cada mazo al comenzar, mantiene las tarjetas cubiertas y las revela de una en una; las láminas de Teil 3 se recortan dinámicamente desde las hojas originales aprobadas y el avance del mazo se conserva al cambiar de sección.
- Antes de entregar se muestra un resumen de respuestas omitidas en Hören, Lesen y Schreiben; la grabación oral sigue siendo opcional en modo clase.
- La simulación no muestra transcripciones ni hoja de respuestas imprimible en ningún punto del recorrido o del resultado.
- Todos los controles interactivos tienen foco visible para navegación con teclado.

## Corrección

- Hören y Lesen se califican automáticamente, respuesta por respuesta, con 1 o 0 puntos hasta un máximo de 15 por módulo.
- Schreiben usa cinco puntos automáticos del formulario, tres criterios de cumplimiento (3/1,5/0) y convenciones (1/0,5/0), hasta 15 puntos crudos.
- Sprechen usa máximos crudos 3 + 6 + 6; la evaluación abierta queda separada por cada parte.
- El informe muestra la respuesta del estudiante, la solución correcta y el punto obtenido en los 30 reactivos objetivos y los cinco campos del formulario.
- Los 60 puntos crudos se multiplican por 1,66 y el total se redondea a un número entero. La escala final es: 90–100 sehr gut, 80–89 gut, 70–79 befriedigend, 60–69 ausreichend y 0–59 nicht bestanden.
- El resultado definitivo y aprobado/no aprobado aparece cuando el docente completa Schreiben Teil 2 y Sprechen.

## Inventario mínimo

- 1 runner especializado, 1 módulo CSS y 1 set de datos TypeScript.
- 1 guion JSON versionado.
- 28 fuentes de voz natural.
- 15 clips individuales, 3 pistas por parte y 1 máster completo.
- 7 láminas A/B/C de Hören —incluido el ejemplo—, 6 pares de anuncios A/B de Lesen y 2 hojas de tarjetas de Sprechen.
- 1 rúbrica de Schreiben y 1 rúbrica de Sprechen integradas.
- 1 generador de montaje y 1 verificador estructural/de audio.

## Comandos

```bash
node scripts/generate-goethe-a1-set1-audio.mjs
node scripts/check-goethe-a1-set1.mjs
```

El generador no contiene ni necesita una clave de ElevenLabs: trabaja sobre las fuentes de voz ya aprobadas y versionadas.
