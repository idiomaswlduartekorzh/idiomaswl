# Auditoría de calidad: Reading B2–C2

Estado al 13 de noviembre de 2026: **480 borradores, 0 aprobados, 0 publicados**. Esta auditoría automatizada y de muestras no sustituye las revisiones humanas de las ocho lenguas ni la nivelación CEFR independiente exigida por `docs/reading-content-guide.md`. La progresión se contrastó con los [descriptores de comprensión lectora del Consejo de Europa](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions); una longitud mayor no certifica por sí sola un nivel.

## Inventario y estructura

- 8 idiomas × 3 niveles × 20 lecturas = 480 fichas; todas en `draft` y con `seo.indexable: false`.
- 2.880 preguntas: seis por lectura. En todas las fichas revisadas por los validadores, cada evidencia aparece literalmente en el pasaje y las tres opciones de una pregunta son distintas.
- Cada combinación tiene 20 títulos, textos y temas distintos, y todas las lecturas cumplen la longitud mínima definida para su lengua y nivel.
- El test de lectura (11 pruebas), el índice de gramática y las fuentes PDF pasan. Los controles de sesgo de respuestas siguen fallando.

## Bloqueos de calidad

1. **Sesgo de longitud.** Solo 8 de 24 combinaciones pasan el límite agregado de 20–45 % por banda. En el conjunto, la opción correcta se clasifica como la más larga 1.610 veces, la más corta 651 y la intermedia 619. Hay 434 respuestas empatadas en longitud con otra opción; por tanto, esas bandas son una señal de revisión y no una medida exacta de qué pista ve el estudiante. En **20 lecturas**, la respuesta correcta es la única opción más larga en las seis preguntas, una pista que sí afecta directamente cada sesión. El guardián de escala ahora detecta ese caso y el informe de revisión enumera los archivos.
2. **Distractores.** Una muestra concreta: `en-c1-the-water-meter.json`, pregunta `q-6`, propone dos distractores de 22 caracteres aproximadamente y una respuesta correcta de más de 70 caracteres. Se debe reescribir el conjunto de opciones con alternativas plausibles y de extensión comparable, comprobando que solo una se sostenga en el pasaje. Rellenar opciones para alterar el conteo no es una corrección pedagógica.
3. **Nivelación sin certificar.** Las 480 fichas declaran `independentAssessment.passed: false`; 480 revisiones de lengua y 480 de pedagogía siguen en `pending`. Las cifras de vocabulario fuera de nivel figuran como 0 en todo el conjunto, pero no se han validado con un inventario léxico independiente. Los rótulos B2, C1 y C2 son objetivos de autoría, no certificaciones. Se corrigieron los metadatos para que `reviewedAt` y `assessedAt` sean `null` y las comprobaciones cultural y de copyright figuren pendientes hasta que ocurran. El validador exige esos datos reales antes de aprobar o publicar.
4. **Revisión cultural y lingüística.** La comprobación automática detecta estructura, longitud, claves y evidencia literal; no puede certificar naturalidad, ambigüedad de claves, adecuación cultural ni copyright en ocho idiomas. La guía exige revisores identificados y una evaluación independiente antes de cambiar a `published`.

## Segunda lectura asistida

Se pasaron 44 fichas distintas por una revisión crítica de IA, entre ellas una lectura de cada una de las 24 combinaciones. Esta muestra se eligió por orden de archivo y **no es representativa** del conjunto. En la muestra por combinación, el modelo marcó 11 de 24 para edición. Sus sugerencias se contrastaron con el texto: algunas eran falsos positivos, como exigir que todas las preguntas C1 fueran inferenciales o que hubiera cuatro opciones en lugar de tres. Ningún resultado `pass_screen` equivale a aprobación humana.

Se confirmaron y corrigieron tres fallos concretos:

- `en-c2-voices-in-the-archive.json`, `q-2`: dos opciones expresaban el mismo motivo económico y ambas eran correctas. El distractor nuevo expresa una motivación diferente y contradicha por el pasaje.
- `ja-c2-yorikoseina-junban.json`, `q-6`: la clave para «根深い» decía «documentación ordenada», un significado incorrecto. La fuente editorial y la ficha regenerada ahora expresan un conflicto profundamente arraigado.
- `ko-b2-voices-in-the-archive.json`: se separó `들어왔책상` en dos oraciones y se sincronizó el conteo de eojeol.

La cuota y las respuestas 503 de la API gratuita impidieron una lectura asistida de las 480 fichas. Quedan pendientes la revisión semántica de las demás, la corrección sistemática de distractores y la evaluación humana independiente.

## Decisión de lanzamiento

**No integrar en `main` ni publicar todavía.** Corregir primero los distractores de los grupos que fallan, volver a pasar los guardianes y hacer revisión humana de cada ficha con nombres, fechas y decisiones reales. Después ejecutar `check:practica-catalog`, TypeScript, `check:reading-content`, `check:reading-advanced-scale`, `test:reading`, fuentes PDF y build completo. Solo un commit de `main` que pase esas puertas puede desplegarse en producción.

Para la cola editable: `npm run report:reading-advanced-review`. Para el estado binario por combinación: `npm run check:reading-advanced-scale`.
