# TOEFL 2026 — auditoría de guiones Listening Sets 6–10

Fecha: 14 de agosto de 2026

Estado: guiones aprobados internamente; no integrados al examen ni autorizados para TTS

## Resultado del lote

Cada set incorpora en datos editoriales:

- tres Choose a Response destinados a completar Módulo 1;
- ocho Choose, una Conversation de dos preguntas, un Announcement de dos y un
  Academic Talk de cuatro para Módulo 2;
- 19 interacciones escritas nuevas y 14 medios TTS planificados;
- claves correctas únicamente en un módulo `server-only`;
- estado explícito `script-ready-audio-blocked` en los 70 medios.

La ganancia neta futura será 17 por set porque dos preguntas heredadas —la tercera de
Announcement y la quinta de Academic Talk— se conservarán fuera de la sesión fija.
Este lote todavía no cambia el inventario operativo 17/34: no se ha conectado a la
experiencia y no hay audio para los estímulos nuevos.

## Auditoría editorial

- 55 Choose distintos, entre 6 y 11 palabras;
- Conversations de 83/83/87/88/89 palabras;
- Announcements de 57/65/65/66/66 palabras;
- Academic Talks de 197/199/204/206/207 palabras;
- 95 IDs de ítem y 70 IDs/URLs de medio únicos en el lote;
- cuatro opciones A–D por pregunta y una clave privada que resuelve a una opción pública;
- los 140 guiones planeados acumulados de Sets 1–10 son distintos;
- el guardián no encontró respuestas correctas con una ventaja grande de longitud.

## Contraste factual de Academic Talk

| Set | Tema | Fuentes institucionales | Veredicto |
| --- | --- | --- | --- |
| 6 | Ríos atmosféricos | [NOAA/NESDIS — What Is an Atmospheric River?](https://www.nesdis.noaa.gov/about/k-12-education/atmosphere/what-atmospheric-river), [NOAA — What are atmospheric rivers?](https://prod-01-alb-www-noaa.woc.noaa.gov/stories/what-are-atmospheric-rivers) | Se definen como corredores de vapor, no agua líquida; se diferencian aportes de agua y riesgo condicionado por fuerza, duración, trayectoria y suelo. Observaciones y modelos se presentan como evidencia combinada, no pronóstico perfecto. |
| 7 | Fitoplancton observado desde satélite | [NASA — What are Phytoplankton?](https://science.nasa.gov/earth/earth-observatory/what-are-phytoplankton/), [NASA — PACE Data](https://www.nasa.gov/earth/nasas-pace-data-on-ocean-atmosphere-climate-now-available/) | Se distingue la medición remota del color y la estimación de clorofila/abundancia. Se mantienen los límites de superficie, atmósfera y otros materiales, y se conserva el muestreo directo para identificación y validación. |
| 8 | Adaptaciones y funciones de manglares | [NOAA Ocean Service — What is a mangrove forest?](https://oceanservice.noaa.gov/facts/mangroves.html), [NOAA Fisheries — Coastal Blue Carbon](https://www.fisheries.noaa.gov/national/habitat-conservation/protecting-coastal-blue-carbon-through-habitat-conservation) | Zona intermareal, suelo hipóxico, raíces, sedimento, hábitat y carbono están diferenciados. La reducción de energía/erosión se califica por estructura, tormenta y geografía; no se promete protección universal. |
| 9 | Datación por radiocarbono y contexto | [NPS — How do Archeologists know how old a site is?](https://www.nps.gov/articles/000/how-do-archeologists-know-how-old-a-site-is.htm) | El guion limita C-14 a material antes vivo, distingue el objeto de su asociación, exige estratigrafía intacta y presenta calibración/rangos e incertidumbre. La dendrocronología aparece como registro independiente, no como sustituto universal. |
| 10 | Interpretación de radar Doppler | [NWS — Using and Understanding Doppler Radar](https://www.weather.gov/mkx/using-radar), [NOAA/NCEI — NEXRAD](https://www.ncei.noaa.gov/products/radar/next-generation-weather-radar) | Reflectividad, retornos no meteorológicos y velocidad radial se separan correctamente. El relato limita un radar a movimiento hacia/desde el sensor y requiere varios barridos y fuentes; no convierte un color aislado en diagnóstico. |

## Reutilización de Conversation existente

Se auditó exclusivamente el texto de `src/data/mocks/toefl-set-{6..10}.ts`; no se
abrió ni reprodujo ningún MP3. El objetivo fue saber si el audio original de cuatro
preguntas admite dos clips coherentes de dos preguntas:

| Set | Corte por guion | Decisión provisional |
| --- | --- | --- |
| 6 | Después del ejemplo que convierte “renewable energy” en una pregunta concreta | Candidato natural: problema/criterio antes; exclusión de fuentes y oferta de feedback después. |
| 7 | Después de explicar los primeros treinta minutos gratis | Candidato natural: programa/costo antes; preocupación y respuesta en horas pico después. |
| 8 | La instrucción práctica y la duda sobre fuentes antiguas comparten el cierre de la misma consulta | No cortar por ahora; conservar un estímulo de cuatro preguntas evita repetir o perder el contexto del acceso. |
| 9 | Después de comparar conveniencia y costos básicos de las dos viviendas | Candidato natural: decisión/ventaja antes; riesgo y siguiente paso después. |
| 10 | Después de confirmar que los cursos previos contarían para el nuevo programa | Candidato natural: motivo/interés antes; tranquilidad y recomendación del electivo después. |

Los cortes son sólo decisiones editoriales. Antes de usarlos habrá que escuchar el
audio real, confirmar que no parten una respiración o música y exportar derivados sin
sobrescribir el original. Si un corte no funciona al oído, el contrato permite conservar
la Conversation larga de cuatro preguntas como divergencia explícita de preservación.

## Evidencia automática

- `npm run check:toefl-fixed-listening`: PASS para Sets 1–10;
- `npm run test:toefl-fixed-listening`: PASS 3/3 para Sets 1–10;
- `npx tsc --noEmit`: PASS;
- el checker prueba límites de longitud, composición, IDs, claves privadas, ausencia de
  pista grande por longitud, unicidad acumulada y cero cambios en `public/audio`.

## Pendientes antes de integrar el lote al simulacro

1. Completar guiones Sets 11–20 y la auditoría factual total.
2. Adaptar las 15 preguntas heredadas conservadas a payload sin respuestas.
3. Cerrar API/registro server-only para los 34 ítems.
4. Construir preview editorial de guiones y plan de voces/costo.
5. Recibir aprobación del owner; sólo entonces producir medios y probar el runtime.

No se abrió, reprodujo, transcribió, generó, normalizó ni modificó ningún audio.
