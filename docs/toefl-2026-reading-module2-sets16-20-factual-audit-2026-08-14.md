# TOEFL 2026 — auditoría factual de Reading Módulo 2, Sets 16–20

Fecha: 14 de agosto de 2026

Estado: aprobado dentro del alcance editorial interno; no equivale a revisión independiente

## Resultado

Los cinco módulos cierran Reading para los 20 simulacros bajo la forma fija elegida:

- Complete the Words: 74–79 palabras reconstruidas, primera oración intacta y diez
  palabras alternas con su primera mitad visible;
- Read in Daily Life: dos textos originales y cinco preguntas (2 + 3);
- Read an Academic Passage: 189–208 palabras y cinco preguntas de selección única;
- total añadido: 20 interacciones por set;
- respuestas CTW y de selección guardadas únicamente en módulos `server-only`.

Se reconstruyeron manual y automáticamente los 50 huecos. Prefijo + clave forma una
palabra natural, la clave tiene la longitud declarada y el prefijo revela exactamente la
primera mitad. También se confrontaron las 50 preguntas de selección con el texto
visible: cada una tiene una respuesta defendible y tres distractores incompatibles con
la evidencia del pasaje.

## Contraste factual

| Set | Bloques | Fuentes primarias o institucionales contrastadas | Veredicto |
| --- | --- | --- | --- |
| 16 | Monitoreo sísmico; aerosoles volcánicos y clima | [USGS — seismographs](https://www.usgs.gov/programs/earthquake-hazards/seismographs-keeping-track-earthquakes), [USGS — science of earthquakes](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes), [NASA — aerosols and climate](https://science.nasa.gov/science-research/earth-science/climate-science/aerosols-small-particles-with-big-climate-effects/), [NASA — efectos globales de Pinatubo](https://science.nasa.gov/earth/earth-observatory/global-effects-of-mount-pinatubo-1510/) | Se distinguen falla, ondas P/S, tiempos de llegada y ruido. Se separan ceniza y sulfatos; el enfriamiento se presenta como temporal y condicionado a la inyección estratosférica. |
| 17 | Formación de nubes; anillos de árboles | [NOAA JetStream — how clouds form](https://prod-01-alb-www-noaa.woc.noaa.gov/jetstream/clouds/how-clouds-form), [NOAA NCEI — tree-ring data](https://www.ncei.noaa.gov/products/paleoclimatology/tree-ring) | Enfriamiento, saturación y núcleos de condensación están diferenciados. Los anillos se calibran y cruzan; no se afirma que su anchura mida siempre temperatura. |
| 18 | Especies introducidas; ecología del fuego | [USGS — invasive species](https://www.usgs.gov/science/invasive-species), [NPS — fire ecology](https://www.nps.gov/brca/learn/nature/fire-ecology.htm), [NPS — fire ecology research](https://www.nps.gov/orgs/1965/fire-ecology-research.htm) | Se evita equiparar toda especie introducida con invasora. El efecto del fuego se califica por régimen y severidad; sucesión y fuego prescrito no se presentan como resultados garantizados. |
| 19 | Formación y mantenimiento de deltas | [USGS — efectos de presas e ingeniería en el Mississippi y su delta](https://www.usgs.gov/publications/a-brief-history-and-summary-effects-river-engineering-and-dams-mississippi-river) | Depósito, redistribución por olas/mareas, compactación, subsidencia, nivel del agua y reducción de sedimento por ingeniería aparecen como procesos interactivos. Las desviaciones se presentan con incertidumbres y tradeoffs. |
| 20 | Red eléctrica; almacenamiento | [DOE — electric grids](https://www.energy.gov/topics/electric-grids), [DOE — solar and storage basics](https://www.energy.gov/cmei/systems/solar-integration-solar-energy-and-storage-basics), [DOE — pumped-storage hydropower](https://www.energy.gov/cmei/water/pumped-storage-hydropower) | Se explica el balance continuo oferta-demanda. Almacenamiento absorbe y devuelve energía con pérdidas; baterías y bombeo se comparan por características sin afirmar que una tecnología resuelva todos los servicios. |

Los avisos de equipos, buses, intercambio, seguridad, reservas, paquetería, prácticas,
fitness, software y fotografías son escenarios originales y autocontenidos; no
describen políticas reales de una institución.

## Controles automáticos del lote

- `npm run check:toefl-fixed-reading`: PASS para Sets 1–20;
- `npm run test:toefl-fixed-reading`: PASS 3/3;
- regresiones CTW: checker PASS y unit PASS 8/8;
- regresiones Reading: checker PASS y unit PASS 8/8;
- TypeScript y ESLint dirigido: PASS;
- build completo: guardianes PASS y 1.364/1.364 rutas generadas;
- Chromium: forma fija PASS 5/5, incluidos Set 16–20 mediante el caso límite Set 20;
- el checker confirma 20 interacciones nuevas por set, claves privadas, longitudes,
  alternancia de huecos e inexistencia de cambios de audio.

## Límites abiertos

- Listening y dos Repeat siguen incompletos en los 20 sets.
- Clocks, navegación cerrada y resultados honestos siguen siendo trabajo posterior.
- VoiceOver T16/T17 continúa como gate humano separado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio.
