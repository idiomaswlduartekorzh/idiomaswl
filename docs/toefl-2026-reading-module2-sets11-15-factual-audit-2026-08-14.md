# TOEFL 2026 — auditoría factual de Reading Módulo 2, Sets 11–15

Fecha: 14 de agosto de 2026

Estado: aprobado dentro del alcance editorial interno; no equivale a revisión independiente

## Resultado

Los cinco módulos cumplen el contrato de la forma fija elegida:

- Complete the Words: 70–100 palabras reconstruidas, primera oración intacta y diez
  palabras alternas con su primera mitad visible;
- Read in Daily Life: dos textos originales y cinco preguntas (2 + 3);
- Read an Academic Passage: 180–220 palabras y cinco preguntas de selección única;
- total añadido: 20 interacciones por set;
- respuestas CTW y de selección guardadas únicamente en módulos `server-only`.

La revisión reconstruyó los 50 huecos y detectó tres cortes que no mostraban exactamente
la primera mitad de la palabra: `before`, `without` y `carry`. Se corrigieron antes de
integrar el lote. Las 50 preguntas de selección se comprobaron contra su texto: cada una
tiene una respuesta defendible y tres distractores incompatibles con la evidencia visible.

## Contraste factual

| Set | Bloques | Fuentes primarias o institucionales contrastadas | Veredicto |
| --- | --- | --- | --- |
| 11 | Mareas; formación del suelo | [NOAA/NESDIS — causas de las mareas](https://www.nesdis.noaa.gov/about/k-12-education/oceans-coasts/what-causes-tides), [NOAA — efectos locales en niveles de agua](https://oceanservice.noaa.gov/education/tutorial_tides/tides08_othereffects.html), [USDA NRCS — soil facts](https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-facts), [USDA NRCS — what is soil](https://www.nrcs.usda.gov/resources/education-and-teaching-materials/what-is-soil) | Luna, Sol, rotación y efectos meteorológicos se distinguen correctamente. Suelo se presenta como interacción de material parental, clima, organismos, topografía, tiempo y perturbación; no como roca rota solamente. |
| 12 | Agua subterránea; glaciares | [USGS — what is groundwater](https://www.usgs.gov/faqs/what-groundwater), [USGS — recharge](https://www.usgs.gov/publications/estimating-groundwater-recharge), [USGS — geology of Glacier National Park](https://www.usgs.gov/geology-and-ecology-of-national-parks/geology-glacier-national-park), [USGS — Rocky Mountain National Park](https://www.usgs.gov/geology-and-ecology-of-national-parks/geology-rocky-mountain-national-park) | Poros, fracturas, nivel freático, recarga y descarga respaldados; se evita el mito de grandes ríos subterráneos. Abrasión, valles U, valles colgantes y morrenas se describen sin tratar una sola forma como historia completa. |
| 13 | Conservación preventiva | [NPS — Museum Handbook Part I](https://www.nps.gov/subjects/museums/mh1.htm), [NPS — Museum Collections Environment](https://www.nps.gov/museum/publications/MHI/CHAPTER4.pdf), [Smithsonian MCI — preventive conservation](https://mci.si.edu/preventive-conservation), [Smithsonian Archives — environment](https://siarchives.si.edu/what-we-do/preservation/environment) | Luz acumulada, humedad relativa, materiales higroscópicos, cajas/cabinetes y documentación están respaldados. El pasaje evita imponer un único ambiente ideal a todos los materiales. |
| 14 | Corrientes oceánicas y clima | [NOAA Ocean Exploration — ocean, climate and weather](https://oceanexplorer.noaa.gov/ocean-fact/climate/), [NOAA GFDL — ocean and ice processes](https://www.gfdl.noaa.gov/ocean-and-ice-processes/), [NOAA AOML — overturning circulation](https://www.aoml.noaa.gov/moc-following-the-heat/) | Vientos, rotación, continentes, densidad, mezcla y transporte de calor están diferenciados. La circulación profunda se presenta como sistema complejo, no como una cinta única literal. |
| 15 | Polinización y producción agrícola | [USDA ARS — aportes de abejas manejadas y silvestres](https://www.ars.usda.gov/research/publications/publication/?seqNo115=360207), [USDA ARS — polinización y rendimiento de girasol](https://www.ars.usda.gov/research/publications/publication/?seqNo115=355167) | Se distingue visita de transferencia efectiva de polen y se califican los efectos por cultivo, sitio y manejo. Diversidad se describe como apoyo posible, no como garantía de rendimiento. |

Los avisos de bicicleta, salas, cursos, ensayos, transcripciones, tours, lavandería,
impresión, tutoría y jardín son escenarios originales y autocontenidos; no describen
políticas reales de una institución.

## Controles automáticos del lote

- `npm run check:toefl-fixed-reading`: PASS para Sets 1–15;
- `npm run test:toefl-fixed-reading`: PASS 3/3;
- regresiones CTW: PASS 8/8;
- regresiones Reading: checker PASS y unit PASS 8/8;
- TypeScript y ESLint dirigido: PASS;
- build completo: guardianes PASS y 1.364/1.364 rutas generadas;
- Chromium: suite de forma fija PASS 4/4 y mocks representativos PASS 8/8;
- el checker confirma 20 interacciones nuevas por set, claves privadas, longitudes,
  alternancia de huecos e inexistencia de cambios de audio.

## Límites abiertos

- Sets 16–20 todavía requieren Reading Módulo 2.
- Listening y dos Repeat siguen incompletos en los 20 sets.
- Clocks, navegación cerrada y resultados honestos siguen siendo trabajo posterior.
- VoiceOver T16/T17 continúa como gate humano separado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio.
