# Auditoría de calidad: Reading B2–C2

Estado de esta auditoría, **antes de la aprobación del propietario**: 480 borradores, 0 aprobados y 0 publicados. El 14 de noviembre David Duarte aprobó las 480 fichas; el alcance y la excepción de revisor único están documentados en [`reading-advanced-release-2026-11-14.md`](reading-advanced-release-2026-11-14.md). Las cifras y pendientes de abajo son el corte histórico de la auditoría automatizada, no el estado editorial actual. La progresión se contrastó con los [descriptores de comprensión lectora del Consejo de Europa](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions); una longitud mayor no certifica por sí sola un nivel.

## Inventario y estructura

- 8 idiomas × 3 niveles × 20 lecturas = 480 fichas; todas en `draft` y con `seo.indexable: false`.
- 2.880 preguntas: seis por lectura. En todas las fichas revisadas por los validadores, cada evidencia aparece literalmente en el pasaje y las tres opciones de una pregunta son distintas.
- Cada combinación tiene 20 títulos, textos y temas distintos, y todas las lecturas cumplen la longitud mínima definida para su lengua y nivel.
- El test de lectura (13 pruebas), el índice de gramática, las fuentes PDF y los controles automáticos de escala pasan. La validación editorial individual sigue pendiente.

## Riesgos y revisión pendiente

1. **Longitud de opciones.** Las 24 combinaciones pasan el límite agregado de 20–45 % por banda. En el conjunto, la opción correcta se clasifica como la más larga 1.238 veces, la más corta 909 y la intermedia 733. Hay 444 respuestas empatadas en longitud con otra opción; las bandas son una señal de revisión y no una medida exacta de qué pista ve el estudiante. Ninguna lectura tiene seis respuestas correctas que sean siempre la única opción más larga. La comprobación agregada no sustituye una revisión de naturalidad y plausibilidad de cada pregunta.
2. **Distractores.** Una muestra concreta: `en-c1-the-water-meter.json`, pregunta `q-6`, propone dos distractores de 22 caracteres aproximadamente y una respuesta correcta de más de 70 caracteres. Se debe reescribir el conjunto de opciones con alternativas plausibles y de extensión comparable, comprobando que solo una se sostenga en el pasaje. Rellenar opciones para alterar el conteo no es una corrección pedagógica.
3. **Nivelación sin certificar.** Las 480 fichas declaran `independentAssessment.passed: false`; 480 revisiones de lengua y 480 de pedagogía siguen en `pending`. Las cifras de vocabulario fuera de nivel figuran como 0 en todo el conjunto, pero no se han validado con un inventario léxico independiente. Los rótulos B2, C1 y C2 son objetivos de autoría, no certificaciones. Se corrigieron los metadatos para que `reviewedAt` y `assessedAt` sean `null` y las comprobaciones cultural y de copyright figuren pendientes hasta que ocurran. El validador exige esos datos reales antes de aprobar o publicar.
4. **Revisión cultural y lingüística.** La comprobación automática detecta estructura, longitud, claves y evidencia literal; no puede certificar naturalidad, ambigüedad de claves, adecuación cultural ni copyright en ocho idiomas. La guía exige revisores identificados y una evaluación independiente antes de cambiar a `published`.

## Segunda lectura asistida

Se pasaron 44 fichas distintas por una revisión crítica de IA, entre ellas una lectura de cada una de las 24 combinaciones. Esta muestra se eligió por orden de archivo y **no es representativa** del conjunto. En la muestra por combinación, el modelo marcó 11 de 24 para edición. Sus sugerencias se contrastaron con el texto: algunas eran falsos positivos, como exigir que todas las preguntas C1 fueran inferenciales o que hubiera cuatro opciones en lugar de tres. Ningún resultado `pass_screen` equivale a aprobación humana.

Se confirmaron y corrigieron tres fallos concretos:

- `en-c2-voices-in-the-archive.json`, `q-2`: dos opciones expresaban el mismo motivo económico y ambas eran correctas. El distractor nuevo expresa una motivación diferente y contradicha por el pasaje.
- `ja-c2-yorikoseina-junban.json`, `q-6`: la clave para «根深い» decía «documentación ordenada», un significado incorrecto. La fuente editorial y la ficha regenerada ahora expresan un conflicto profundamente arraigado.
- `ko-b2-voices-in-the-archive.json`: se separó `들어왔책상` en dos oraciones y se sincronizó el conteo de eojeol.

Después se revisaron y corrigieron manualmente las seis opciones de `fr-c1-shared-desks.json`. La ficha quedó con dos respuestas correctas cortas, dos intermedias y dos largas, y una segunda lectura asistida no encontró otra clave sustentada. Las propuestas automáticas para otras fichas se descartaron porque acortaban demasiado algunas respuestas y debilitaban los distractores; **no se aplicaron en lote**.

En la ronda del 13 de noviembre se editaron opciones de francés C1/C2, italiano C2, alemán C2 y ruso C2 con apoyo del pasaje y la evidencia de cada pregunta. Esas cinco combinaciones pasaron el control agregado. Se hallaron y corrigieron cinco distractores que consistían solo en una coma en `fr-c1-the-open-schedule.json`; el validador y una prueba de regresión ahora rechazan opciones sin letras ni números. Estos cambios no equivalen a revisión integral de las fichas.

En la siguiente ronda se corrigieron ruso B2 y C1. La lectura `ru-b2-shared-desks.json` dejó de tener seis respuestas correctas sistemáticamente más largas; también se reemplazaron distractores de una palabra y se corrigió una errata de una pregunta en ruso C1. El control de longitud pasa ahora en 15 combinaciones; nueve siguen bloqueadas.

También se editaron italiano C1 y coreano C1/C2. En italiano C1 se reescribieron las seis opciones correctas de cinco lecturas y se distribuyeron entre respuestas cortas e intermedias para evitar que una longitud fija sirviera de pista. En coreano se acortaron respuestas sustentadas por el pasaje y se mejoraron dos distractores del museo. Estas tres combinaciones pasaron el control agregado, sin que ello certifique su nivel ni sustituya la lectura editorial de cada ficha.

Alemán C1 también pasó tras editar las cuatro fichas con seis respuestas correctas sistemáticamente más largas y otras once preguntas. En la lectura del museo, dos distractores de una palabra se sustituyeron por grupos sociales concretos. En ese punto persistían cinco combinaciones bloqueadas por el control de longitud.

Portugués C1 y japonés B2 pasaron después de revisar preguntas contra sus pasajes y equilibrar la longitud de sus opciones. En portugués se corrigió además la gramática de un distractor de la lectura del huerto escolar. En ese punto quedaban japonés C1/C2 y coreano B2 con sesgo agregado.

Japonés C1/C2 y coreano B2 pasaron después de corregir las últimas opciones. En japonés C1 se sustituyó la errata `美辞麗学` por `美辞麗句` en texto, vocabulario, pregunta y evidencia. En coreano B2 se reescribió una pregunta léxica con distractores de dos y tres caracteres. Con ello el control de escala pasó en **24/24 combinaciones**, sin lecturas de seis respuestas correctas siempre más largas.

La revisión visual del 14 de noviembre halló 37 fichas sin ninguna respuesta correcta entre las opciones más cortas. Se acortó una respuesta correcta por ficha conservando el sentido pretendido, y se añadió una barrera por ficha al control de escala. Ahora ninguna de las 480 fichas presenta ese patrón; la distribución agregada es 909 opciones correctas más cortas, 733 intermedias y 1.238 más largas según la clasificación del validador. El renderer separa los saltos de párrafo escritos y divide bloques extensos solo entre oraciones; una comprobación de los 480 borradores confirmó que el texto visual conserva todos sus caracteres no blancos. La revisión humana de naturalidad y respuestas únicas sigue pendiente.

La cuota y las respuestas 503 de la API gratuita impidieron una lectura asistida de las 480 fichas. Quedan pendientes la revisión semántica de las demás, la corrección sistemática de distractores y la evaluación humana independiente.

## Decisión de lanzamiento

**No integrar en `main` ni publicar todavía.** El control automático de escala pasó, pero falta revisar semántica, lengua, pedagogía, cultura y copyright de cada ficha con nombres, fechas y decisiones reales, además de la nivelación CEFR independiente. Después ejecutar `check:practica-catalog`, TypeScript, `check:reading-content`, `check:reading-advanced-scale`, `test:reading`, fuentes PDF y build completo. Solo un commit de `main` que pase esas puertas puede desplegarse en producción.

Para la cola editable: `npm run report:reading-advanced-review`. Para el estado binario por combinación: `npm run check:reading-advanced-scale`.
