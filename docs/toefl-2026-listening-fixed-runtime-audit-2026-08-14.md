# TOEFL 2026 — auditoría de composición y scoring fijo de Listening

Fecha: 14 de agosto de 2026

Estado: composición 34/34 integrada para preview; 19 audios nuevos por set siguen bloqueados

## Resultado

Los veinte simulacros construyen ahora la forma fija de práctica elegida para Listening:

| Módulo | Choose a Response | Conversation | Announcement | Academic Talk | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 8 | 4 | 2 | 4 | 18 |
| 2 | 8 | 2 | 2 | 4 | 16 |
| **Total por set** | **16** | **6** | **4** | **8** | **34** |

La referencia sigue siendo el Practice Test 1 publicado por ETS para el formato vigente
desde el 21 de enero de 2026. WeLearn declara una forma fija de práctica, no una réplica
adaptativa ni un banco oficial ETS.

## Reutilización y brecha real de audio

Por set entran en el runtime fijo quince preguntas con medios existentes:

- cinco Choose con sus cinco MP3;
- cuatro preguntas de la Conversation con el MP3 original;
- las primeras dos preguntas del Announcement con su MP3;
- las primeras cuatro preguntas del Academic Talk con su MP3.

La tercera pregunta heredada de Announcement y la quinta de Academic no se borran:
permanecen en el mock fuente como suplemento, fuera de la forma fija.

Las diecinueve preguntas nuevas por set ya aparecen en la composición, pero tienen
`script-ready-audio-blocked`. La interfaz no intenta abrir sus rutas planeadas, desactiva
las opciones y las rotula como revisión editorial. Tampoco las envía como presentadas al
scoring ni las convierte en errores. En total continúan pendientes 280 MP3 nuevos para
los veinte sets, sujetos al gate del owner.

La topología de Conversation Módulo 1 sigue abierta: el contenido conserva un estímulo
heredado de cuatro preguntas. Sólo después de escuchar los MP3 con autorización se podrá
confirmar qué sets admiten dos cortes naturales de dos preguntas. Si un corte no es
responsable, el owner elegirá entre conservar la divergencia declarada o aprobar otro
estímulo.

## Privacidad y scoring

- El payload fijo usa `toefl-listening-single`, opciones con IDs estables y ninguna
  propiedad `answer`.
- Las 34 claves de cada set se ensamblan en `src/server/toefl/listening-registry.ts`,
  protegido con `server-only`: 680 claves totales.
- El endpoint `/api/practica/toefl/listening/score` valida objeto, intento, cierre,
  respuestas e IDs presentados contra el registro privado.
- El scorer distingue `not_presented`, `unanswered`, `scored` e `invalidated`.
- Mientras existan audios bloqueados, el reporte muestra sólo el raw de los ítems
  presentados y no calcula banda de Listening.

## Evidencia ejecutada

- `check:toefl-fixed-listening`: PASS Sets 1–20;
- `test:toefl-fixed-listening`: 3/3 PASS;
- `npx tsc --noEmit`: PASS;
- ESLint dirigido: PASS;
- `git diff --check`: PASS;
- build completo: PASS, incluidos guardianes de catálogo, 480 lecciones de escucha y
  1.365 rutas; el endpoint Listening aparece en la salida de producción;
- ningún archivo bajo `public/audio/` ni archivo MP3/WAV/M4A/OGG fue modificado.

## Estado de producto

La brecha escrita y de composición de Listening está cerrada. El producto completo aún
no está listo para preview final: faltan dos Repeat por set, navegación Listening
forward-only, relojes y cierres por módulo/tarea, resultados finales honestos, la
superficie editorial de aprobación y VoiceOver T16/T17. Los audios continúan al final
del proceso, como ordenó el owner.
