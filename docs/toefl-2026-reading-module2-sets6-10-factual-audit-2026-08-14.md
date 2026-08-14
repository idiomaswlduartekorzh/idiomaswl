# TOEFL 2026 — auditoría factual de Reading Módulo 2, Sets 6–10

Fecha: 14 de agosto de 2026

Estado: aprobado dentro del alcance editorial interno; no equivale a revisión independiente

## Resultado

Los cinco módulos nuevos cumplen el contrato de la forma fija elegida por set:

- Complete the Words: 70–100 palabras una vez reconstruido, primera oración intacta,
  diez palabras alternas enmascaradas y clave privada;
- Read in Daily Life: dos textos originales y cinco preguntas (2 + 3);
- Read an Academic Passage: 180–220 palabras y cinco preguntas de selección única;
- total añadido: 20 interacciones por set, sin contar ejercicios suplementarios;
- claves CTW y de selección dentro de módulos `server-only`, fuera del payload público.

Se reconstruyeron manualmente los 50 huecos para comprobar gramática y sentido. Esa
revisión detectó y corrigió una frase defectuosa del Set 10: ahora el texto completo
dice “sound energy, thus reducing echoes”. También se revisaron las 50 preguntas de
selección contra sus propios textos. Cada pregunta tiene una respuesta defendible y
tres distractores incompatibles con la evidencia visible.

## Contraste factual

| Set | Bloques | Fuentes primarias o institucionales contrastadas | Veredicto |
| --- | --- | --- | --- |
| 6 | Bioluminiscencia; fotosíntesis | [NOAA Ocean Exploration — bioluminescence](https://oceanexplorer.noaa.gov/ocean-fact/bioluminescence/), [NOAA Ocean Service — producción, color y funciones de la luz](https://oceanservice.noaa.gov/facts/biolum.html), [NCBI Bookshelf — chloroplasts and photosynthesis](https://www.ncbi.nlm.nih.gov/books/NBK26819/), [The Plant Cell/PMC — carbon-fixing reactions](https://pmc.ncbi.nlm.nih.gov/articles/PMC4981142/) | Producción química de luz, predominio del azul, cloroplastos, reacciones dependientes de luz y fijación de carbono respaldados. El texto no presenta más luz como garantía de más crecimiento. |
| 7 | Humedales; concreto romano | [US EPA — wetlands](https://www.epa.gov/report-environment/wetlands), [US EPA — funciones y valores de humedales](https://www.epa.gov/sites/default/files/2016-02/documents/functionsvaluesofwetlands.pdf), [PNAS — procesos cementantes en mortero romano](https://doi.org/10.1073/pnas.1417456111), [MIT — estudio sobre lime clasts y hot mixing](https://news.mit.edu/2023/roman-concrete-durability-lime-casts-0106) | Almacenamiento de agua, filtración, hábitat y carbono están respaldados y se califican según el sitio. El concreto se describe como familias de recetas; la autocuración se limita a ciertos materiales y condiciones. |
| 8 | Satélites; isla de calor urbana | [NASA Earth Observatory — catálogo de órbitas](https://science.nasa.gov/earth/earth-observatory/catalog-of-earth-satellite-orbits/), [NASA — GOES](https://science.nasa.gov/mission/goes/), [US EPA — heat island effects](https://www.epa.gov/heatislands/learn-about-heat-island-effects), [US EPA — guía de reducción](https://www.epa.gov/heatislands/guide-reducing-heat-islands) | Órbitas bajas/geostacionarias y usos de observación/comunicación correctos. Calor almacenado, pérdida de vegetación y medidas de mitigación se presentan como variables locales, no como solución universal. |
| 9 | Compostaje; fuentes hidrotermales | [US EPA — composting at home](https://www.epa.gov/recycle/composting-home), [US EPA — approaches to composting](https://www.epa.gov/sustainable-management-food/approaches-composting), [NOAA PMEL — chemosynthesis](https://www.pmel.noaa.gov/eoi/nemo/explorer/concepts/chemosynthesis.html), [NOAA Ocean Exploration — vent food web](https://origin.oceanexplorer.noaa.gov/edu/materials/vent-food-web.pdf), [estudio abierto — colonización después de una erupción](https://pmc.ncbi.nlm.nih.gov/articles/PMC2867905/) | Oxígeno, humedad, materiales ricos en carbono/nitrógeno y función de los microorganismos respaldados. Quimiosíntesis, chimeneas, simbiosis y dispersión larval correctas; la conectividad se formula como apoyo a recuperación, no como garantía. |
| 10 | Control acústico; sueño y memoria | [OSHA Technical Manual — noise control](https://www.osha.gov/otm/section-3-health-hazards/chapter-5), [NIH — Exploring Dreams and Memory](https://www.nih.gov/common-fund/news-media/science-highlights/exploring-dreams-memory), [PMC — memory reactivation and consolidation during sleep](https://pmc.ncbi.nlm.nih.gov/articles/PMC534694/), [PMC — cued reactivation and skill learning](https://pmc.ncbi.nlm.nih.gov/articles/PMC3498459/) | Se distingue absorción de reflexión/bloqueo y se reconoce que los huecos debilitan barreras. Sueño se presenta como una condición que puede apoyar ciertas memorias, sin afirmar que conserva todo ni reemplaza el estudio. |

Los avisos, correos y políticas de Daily Life son escenarios originales y
autocontenidos; no pretenden describir una institución real.

## Controles automáticos del lote

- `npm run check:toefl-fixed-reading`: PASS para Sets 1–10;
- `npm run test:toefl-fixed-reading`: PASS 3/3;
- regresión CTW: PASS 8/8;
- regresión Reading: checker PASS y unit PASS 8/8;
- TypeScript y ESLint dirigido: PASS;
- build completo: guardianes PASS y 1.364/1.364 rutas generadas;
- Chromium: suite de forma fija PASS 3/3 y mocks representativos PASS 8/8;
- el checker confirma que el diff no contiene archivos de audio.

## Límites abiertos

- Sets 11–20 todavía requieren Reading Módulo 2.
- Listening y dos Repeat siguen incompletos en los 20 sets.
- Clocks, navegación cerrada y resultados honestos siguen siendo trabajo posterior.
- VoiceOver T16/T17 continúa como gate humano separado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio.
