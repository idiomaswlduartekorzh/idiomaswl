# TOEFL 2026 — auditoría factual de Reading Módulo 2, Sets 1–5

Fecha: 14 de agosto de 2026

Estado: aprobado dentro del alcance editorial interno; no equivale a una revisión independiente

## Resultado

Los cinco módulos nuevos cumplen la forma fija elegida por set:

- Complete the Words: 70–100 palabras, primera oración intacta, diez palabras
  enmascaradas alternas y diez claves privadas;
- Read in Daily Life: dos textos y cinco preguntas (2 + 3);
- Read an Academic Passage: 180–220 palabras y cinco preguntas de selección única;
- total añadido: 20 interacciones por set, sin incorporar ejercicios suplementarios;
- claves CTW y selección fuera del payload público mediante límite `server-only`.

Se revisaron las 50 preguntas de selección contra el pasaje. Cada una tiene una sola
respuesta defendible, tres distractores incompatibles con el texto y ninguna depende de
conocimiento externo. Los textos cotidianos son escenarios originales y autocontenidos.

## Contraste factual

| Set | Bloques | Fuentes primarias o institucionales contrastadas | Veredicto |
| --- | --- | --- | --- |
| 1 | Kelp; manglares | [NOAA — Kelp Forest](https://sanctuaries.noaa.gov/visit/ecosystems/kelpdesc.html), [NOAA — vida en bosques de kelp](https://oceanservice.noaa.gov/facts/kelplives.html), [NOAA — adaptaciones de manglar](https://oceanservice.noaa.gov/education/tutorial_estuaries/est07_adaptations.html), [NOAA — restauración de manglares](https://response.restoration.noaa.gov/sites/default/files/Oil_Spill_Mangrove.pdf) | Afirmaciones respaldadas. El texto califica la protección ante tormentas y evita prometer que plantar por sí solo restaura el sistema. |
| 2 | Copos de nieve; danza de abejas | [NOAA/NESDIS — formación de copos](https://www.nesdis.noaa.gov/about/k-12-education/ice-snow/how-do-snowflakes-form), [USDA ARS — calibración de la waggle dance](https://www.ars.usda.gov/ARSUserFiles/60500500/PDFFiles/501-600/594-2019%20ABRC%20Proceedings%20Insects.pdf), [estudio abierto — aprendizaje de olores florales](https://pmc.ncbi.nlm.nih.gov/articles/PMC1559887/) | Dirección, distancia, variación ambiental y apoyo olfativo están respaldados. No se presenta la danza como coordenada perfectamente precisa. |
| 3 | Cuevas; tectónica de placas | [NPS — cuevas de solución](https://www.nps.gov/subjects/caves/solution-caves.htm), [NPS — estalactitas y estalagmitas](https://www.nps.gov/ozar/learn/education/speleothems.htm), [USGS — desarrollo de la tectónica](https://pubs.usgs.gov/gip/dynamic/developing.html), [USGS — movimientos de placas](https://pubs.usgs.gov/gip/dynamic/understanding.html) | Química de disolución, depósitos, límites de placas y bandas magnéticas correctos. Se mantiene la velocidad como “centímetros por año”, no una cifra universal. |
| 4 | Dispersión de semillas; blanqueamiento coralino | [USDA ARS — dispersión y escape del parental](https://www.ars.usda.gov/research/publications/publication/?seqNo115=154790), [US Forest Service — agentes principales](https://www.fs.usda.gov/nsl/Wpsm/Chapter1.pdf), [NOAA — revisión de blanqueamiento](https://coralreef.noaa.gov/digital-corals/stories/documents/dec20/coral-bleaching-event), [NOAA — resiliencia de arrecifes](https://oceanservice.noaa.gov/facts/reef-resilience.html) | Mecanismos de dispersión y efectos del calor respaldados. “Bleached” no se equipara a muerto; se distingue manejo local de reducción del calentamiento. |
| 5 | Árboles urbanos; navegación de aves | [USDA Climate Hubs — árboles y calor](https://www.climatehubs.usda.gov/hubs/northwest/topic/reducing-urban-heat-through-tree-planting-boise), [US Forest Service — árboles y agua urbana](https://research.fs.usda.gov/treesearch/68495), [Smithsonian — claves migratorias](https://nationalzoo.si.edu/migratory-birds/neotropical-migratory-bird-faqs), [USGS — luz artificial y migración](https://www.usgs.gov/publications/artificial-light-night-confounds-broad-scale-habitat-use-migrating-birds), [estudio de desplazamiento de adultos y juveniles](https://pmc.ncbi.nlm.nih.gov/articles/PMC2084305/) | Servicios urbanos y límites de sitio respaldados. La navegación se describe como combinación dependiente de especie/experiencia; no se afirma un mecanismo único. |

## Controles automáticos

- `npm run check:toefl-fixed-reading`: PASS;
- `npm run test:toefl-fixed-reading`: PASS 3/3;
- regresiones CTW: checker PASS y unit PASS 8/8;
- regresiones Reading: checker PASS y unit PASS 8/8;
- TypeScript: PASS;
- ESLint dirigido: PASS;
- build completo: guardianes PASS y 1.364/1.364 rutas generadas;
- Chromium: nueva suite Módulo 2 PASS 2/2; regresión Reading Set 1 PASS 5/5;
  regresión de mocks representativos Sets 2, 5, 6, 10, 11, 15, 16 y 20 PASS 8/8;
- diff de audio: cero archivos de audio añadidos o modificados.

## Límites abiertos

- Sets 6–20 aún requieren su Reading Módulo 2.
- Listening y dos Repeat todavía faltan en Sets 1–20.
- La navegación y los clocks se activarán cuando la composición esté completa; no se
  declara que estos cinco sets sean todavía simulacros finales.
- La aprobación manual VoiceOver de T16/T17 sigue siendo un gate aparte.
