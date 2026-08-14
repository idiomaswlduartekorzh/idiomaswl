# TOEFL 2026 — auditoría de guiones Listening Sets 11–15

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
El inventario operativo sigue en 17/34 hasta conectar contenido y producir los medios
que apruebe el owner.

## Auditoría editorial

- 55 Choose distintos, entre 6 y 12 palabras;
- Conversations de 79/80/83/86/91 palabras;
- Announcements de 57/60/65/66/67 palabras;
- Academic Talks de 197/197/200/200/201 palabras;
- 95 IDs de ítem y 70 IDs/URLs de medio únicos en el lote;
- cuatro opciones A–D por pregunta y una clave privada que resuelve a una opción pública;
- los 210 guiones planeados acumulados de Sets 1–15 son distintos;
- el guardián no encontró respuestas correctas con una ventaja grande de longitud.

## Contraste factual de Academic Talk

| Set | Tema | Fuentes institucionales | Veredicto |
| --- | --- | --- | --- |
| 11 | Transpiración vegetal | [USGS — Evapotranspiration and the Water Cycle](https://www.usgs.gov/water-science-school/science/evapotranspiration-and-water-cycle?page=0), [USGS — The EarthWord: Evapotranspiration](https://www.usgs.gov/news/earthword-evapotranspiration) | Se distinguen absorción radicular, transporte y salida de vapor por estomas. La relación agua–CO₂ se presenta como tradeoff condicionado; no se afirma una tasa constante para todas las plantas. |
| 12 | Surgencia costera | [NOAA Ocean Service — What is upwelling?](https://oceanservice.noaa.gov/facts/upwelling.html), [NOAA Fisheries — Local Physical Indicators](https://www.fisheries.noaa.gov/west-coast/science-data/local-physical-indicators) | Viento, reemplazo por agua profunda fría y rica en nutrientes, zona fótica y productividad están conectados sin prometer capturas constantes. Se califican variabilidad y posibles condiciones de bajo oxígeno/acidez. |
| 13 | Ceniza volcánica y aviación | [USGS — Aviation impacts and mitigation](https://volcanoes.usgs.gov/volcanic_ash/aviation.html), [USGS — Airborne Volcanic Ash](https://pubs.usgs.gov/fs/2010/3116/) | Se corrige la analogía con ceniza de madera, se describen abrasión, visibilidad y motor, y la evitación usa observatorios, satélite, modelos y avisos coordinados. No se presenta el radar de a bordo como detector universal. |
| 14 | Estratificación y turnover de lagos | [NPS — Lake Superior](https://home.nps.gov/piro/learn/nature/lake-superior.htm), [NPS — Ponds and Freshwater Wetlands Monitoring](https://home.nps.gov/caco/learn/nature/ponds-and-freshwater-wetlands-monitoring.htm) | La densidad dependiente de temperatura, la separación estival y la redistribución de oxígeno/nutrientes se explican con variación local. Turnover se define como mezcla, no como giro físico ni fecha fija. |
| 15 | Tránsitos de exoplanetas | [NASA — What’s a transit?](https://science.nasa.gov/exoplanets/whats-a-transit/), [NASA — How We Find and Characterize](https://science.nasa.gov/exoplanets/how-we-find-and-characterize/) | Caída de brillo, curva de luz, período y radio se describen como inferencias. Se explicitan alineación, sesgo hacia períodos cortos/tamaños grandes, falsos positivos y necesidad de seguimiento. |

## Reutilización de Conversation existente

Se auditó exclusivamente el texto de `src/data/mocks/toefl-set-{11..15}.ts`; no se
abrió ni reprodujo ningún MP3:

| Set | Corte por guion | Decisión provisional |
| --- | --- | --- |
| 11 | Después de que el estudiante explica que sus notas son un desorden | Candidato natural: invitación/problema antes; método y ahorro de tiempo después. |
| 12 | Después de que el profesor elogia la recolección y análisis | Candidato natural: motivo/fortaleza antes; discusión deficiente y oferta de feedback después. |
| 13 | La segunda mitad pregunta por “the role” y depende de saber que se trata del consejo estudiantil | No cortar por ahora; conservar cuatro preguntas evita iniciar el segundo clip sin referente suficiente. |
| 14 | Después de presentar países/programas que combinan ingeniería y español | Candidato natural: intención/metas antes; costos y transferencia de créditos después. |
| 15 | Después de que el estudiante reconoce que intenta hacer todo a la vez | Candidato natural: carga/enfoque actual antes; pasos pequeños y coordinación del grupo después. |

Los cortes son únicamente editoriales. Si se aprueban, habrá que escuchar el MP3,
confirmar pausas naturales y exportar derivados sin sobrescribir el original. Un corte
que no funcione al oído se descarta y la Conversation original queda como estímulo
largo de cuatro preguntas bajo la divergencia de preservación ya documentada.

## Evidencia automática

- `npm run check:toefl-fixed-listening`: PASS para Sets 1–15;
- `npm run test:toefl-fixed-listening`: PASS 3/3 para Sets 1–15;
- `npx tsc --noEmit`: PASS;
- el checker prueba composición, límites, IDs, claves privadas, ausencia de pista grande
  por longitud, unicidad acumulada y cero archivos de audio cambiados o sin seguimiento.

## Pendientes antes de integrar el lote al simulacro

1. Completar guiones Sets 16–20 y la auditoría factual total.
2. Adaptar las preguntas heredadas conservadas a payload sin respuestas.
3. Cerrar API/registro server-only para los 34 ítems.
4. Construir preview editorial de guiones y plan de voces/costo.
5. Recibir aprobación del owner; sólo entonces producir medios y probar el runtime.

No se abrió, reprodujo, transcribió, generó, normalizó ni modificó ningún audio.
