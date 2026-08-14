# TOEFL 2026 — auditoría de guiones Listening Sets 16–20

Fecha: 14 de agosto de 2026

Estado: guiones aprobados internamente; no integrados al examen ni autorizados para TTS

## Resultado del lote y cierre escrito

Cada set incorpora en datos editoriales:

- tres Choose a Response destinados a completar Módulo 1;
- ocho Choose, una Conversation de dos preguntas, un Announcement de dos y un
  Academic Talk de cuatro para Módulo 2;
- 19 interacciones escritas nuevas y 14 medios TTS planificados;
- claves correctas únicamente en un módulo `server-only`;
- estado explícito `script-ready-audio-blocked` en los 70 medios.

Con este lote, los 20 sets tienen escrita la brecha Listening completa: 380
interacciones nuevas y 280 medios TTS planificados. La ganancia neta futura continúa
siendo 17 por set porque la tercera pregunta heredada de Announcement y la quinta de
Academic Talk se preservarán como suplementos. El runtime sigue honestamente en
17/34: escribir guiones no equivale a tener audio ni una experiencia desplegable.

## Auditoría editorial

- 55 Choose distintos, entre 6 y 13 palabras;
- Conversations de 84/86/87/88/92 palabras;
- Announcements de 63/67/67/69/71 palabras;
- Academic Talks de 190/193/197/200/204 palabras;
- 95 IDs de ítem y 70 IDs/URLs de medio únicos en el lote;
- cuatro opciones A–D por pregunta y una clave privada que resuelve a una opción pública;
- los 280 guiones planeados acumulados de Sets 1–20 son distintos;
- el guardián no encontró respuestas correctas con una ventaja grande de longitud.

## Contraste factual de Academic Talk

| Set | Tema | Fuentes institucionales | Veredicto |
| --- | --- | --- | --- |
| 16 | Balance de masa glaciar | [NASA GRACE — Land Ice](https://grace.jpl.nasa.gov/), [NASA GSFC — Ice Sheets & Glaciers](https://science.gsfc.nasa.gov/earth/cryosphere/researchareas/123/) | Ganancias/pérdidas, medición puntual y remota, incertidumbre y tendencia se separan. Se distingue hielo flotante de hielo apoyado en tierra y longitud de masa; un frente que avanza no prueba balance positivo. |
| 17 | Ecolocación de murciélagos | [NPS — Echolocation](https://home.nps.gov/subjects/bats/echolocation.htm), [NPS — Myth Busters](https://www.nps.gov/subjects/bats/myth-busters.htm) | Eco, ultrasonido, distancia y feeding buzz se presentan como señales variables. Se corrige el mito de ceguera y se califican espectrogramas e identificación acústica por solapamiento y variación. |
| 18 | Fijación biológica de nitrógeno | [USDA ARS — Biological Nitrogen Fixation](https://www.ars.usda.gov/northeast-area/beltsville-md-barc/beltsville-agricultural-research-center/soybean-genomics-improvement-laboratory/docs/biological-nitrogen-fixation/) | Se distingue abundancia atmosférica de disponibilidad biológica, y se explican rizobios, leguminosas, nódulos y el intercambio mutualista. No se reduce todo el ciclo a fijación ni se garantiza disponibilidad completa al siguiente cultivo. |
| 19 | Anillos de árboles como proxy climático | [NOAA/NCEI — What Are Proxy Data?](https://www.ncei.noaa.gov/news/what-are-proxy-data), [NOAA/NCEI — How Can Tree Rings Teach Us About Climate?](https://www.ncei.noaa.gov/index.php/news/how-can-tree-rings-teach-us-about-climate) | Ancho, densidad/química, calibración instrumental, crossdating y múltiples muestras se presentan con límites. Un anillo ancho no se traduce universalmente a lluvia o temperatura. |
| 20 | Formación de auroras | [NASA — Auroras](https://science.nasa.gov/sun/auroras/), [NOAA/NESDIS — Nature’s Light Show](https://www.nesdis.noaa.gov/news/auroras-natures-light-show-captured-low-earth-orbit) | Viento solar, magnetosfera, partículas, colisiones y emisiones de oxígeno/nitrógeno están encadenados. Se distinguen polos magnéticos/geográficos y se mantiene la incertidumbre de pronóstico por acoplamiento y geometría. |

## Reutilización de Conversation existente

Se auditó exclusivamente el texto de `src/data/mocks/toefl-set-{16..20}.ts`; no se
abrió ni reprodujo ningún MP3:

| Set | Corte por guion | Decisión provisional |
| --- | --- | --- |
| 16 | Después de que el profesor exige investigación peer-reviewed | Candidato natural: solicitud/condición antes; búsqueda en bases y envío de fuentes después. |
| 17 | Después de explicar que habrá entrenamiento y no se exige ser experto | Candidato natural: invitación/duda antes; tiempo semanal y beneficio para el tutor después. |
| 18 | Después de recomendar entrevistas informativas en tres áreas | Candidato natural: incertidumbre/recomendación antes; temor y propósito de las entrevistas después. |
| 19 | Después de recomendar practicar en voz alta frente a alguien | Candidato natural: problema/técnica antes; hallazgo al grabarse, pausas y oferta de práctica después. |
| 20 | Después de explicar autoría, publicación, peer review y fecha | Candidato natural: dificultad/primer criterio antes; apariencia, evidencia y cross-check después. |

Estos cinco son candidatos por texto, no cortes aprobados. Si el owner aprueba la fase
de audio, habrá que escuchar cada MP3, confirmar pausas naturales y exportar derivados
sin sobrescribir originales. Un corte que falle al oído se descarta y la Conversation
queda completa bajo la divergencia de preservación.

## Evidencia automática

- `npm run check:toefl-fixed-listening`: PASS para Sets 1–20;
- `npm run test:toefl-fixed-listening`: PASS 3/3 para Sets 1–20;
- `npx tsc --noEmit`: PASS;
- el checker prueba composición, límites, IDs, claves privadas, ausencia de pista grande
  por longitud, unicidad de los 280 guiones y cero cambios o archivos nuevos de audio.

## Pendientes antes de integrar Listening al simulacro

1. Adaptar las preguntas heredadas reutilizadas a payload público sin respuestas.
2. Componer los 34 ítems finales y el registro de scoring completo server-only.
3. Construir preview editorial, inventario de medios y plan de voces/costo.
4. Recibir aprobación explícita del owner sobre brechas, muestras, voces y costo.
5. Sólo entonces producir medios, evaluar cortes reales y probar forward-only/runtime.

No se abrió, reprodujo, transcribió, generó, normalizó ni modificó ningún audio.
