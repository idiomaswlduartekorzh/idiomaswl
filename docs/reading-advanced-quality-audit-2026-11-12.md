# Auditoría de calidad: Reading B2–C2

Estado al 12 de noviembre de 2026: **480 borradores, 0 aprobados, 0 publicados**. Esta auditoría automatizada y de muestras no sustituye las revisiones humanas de las ocho lenguas ni la nivelación CEFR independiente exigida por `docs/reading-content-guide.md`.

## Inventario y estructura

- 8 idiomas × 3 niveles × 20 lecturas = 480 fichas; todas en `draft` y con `seo.indexable: false`.
- 2.880 preguntas: seis por lectura. En todas las fichas revisadas por los validadores, cada evidencia aparece literalmente en el pasaje y las tres opciones de una pregunta son distintas.
- Cada combinación tiene 20 títulos, textos y temas distintos, y todas las lecturas cumplen la longitud mínima definida para su lengua y nivel.
- El test de lectura (11 pruebas), el índice de gramática y las fuentes PDF pasan. Los controles de sesgo de respuestas siguen fallando.

## Bloqueos de calidad

1. **Sesgo de longitud.** Solo 8 de 24 combinaciones pasan el límite agregado de 20–45 % por banda. En el conjunto, la opción correcta se clasifica como la más larga 1.609 veces, la más corta 652 y la intermedia 619. Hay 434 respuestas empatadas en longitud con otra opción; por tanto, esas bandas son una señal de revisión y no una medida exacta de qué pista ve el estudiante. En **20 lecturas**, la respuesta correcta es la única opción más larga en las seis preguntas, una pista que sí afecta directamente cada sesión. El guardián de escala ahora detecta ese caso y el informe de revisión enumera los archivos.
2. **Distractores.** Una muestra concreta: `en-c1-the-water-meter.json`, pregunta `q-6`, propone dos distractores de 22 caracteres aproximadamente y una respuesta correcta de más de 70 caracteres. Se debe reescribir el conjunto de opciones con alternativas plausibles y de extensión comparable, comprobando que solo una se sostenga en el pasaje. Rellenar opciones para alterar el conteo no es una corrección pedagógica.
3. **Nivelación sin certificar.** Las 480 fichas declaran `independentAssessment.passed: false`; 480 revisiones de lengua y 480 de pedagogía siguen en `pending`. Las cifras de vocabulario fuera de nivel figuran como 0 en todo el conjunto, pero no se han validado con un inventario léxico independiente. Los rótulos B2, C1 y C2 son objetivos de autoría, no certificaciones.
4. **Revisión cultural y lingüística.** La comprobación automática detecta estructura, longitud, claves y evidencia literal; no puede certificar naturalidad, ambigüedad de claves, adecuación cultural ni copyright en ocho idiomas. La guía exige revisores identificados y una evaluación independiente antes de cambiar a `published`.

## Decisión de lanzamiento

**No integrar en `main` ni publicar todavía.** Corregir primero los distractores de los grupos que fallan, volver a pasar los guardianes y hacer revisión humana de cada ficha con nombres, fechas y decisiones reales. Después ejecutar `check:practica-catalog`, TypeScript, `check:reading-content`, `check:reading-advanced-scale`, `test:reading`, fuentes PDF y build completo. Solo un commit de `main` que pase esas puertas puede desplegarse en producción.

Para la cola editable: `npm run report:reading-advanced-review`. Para el estado binario por combinación: `npm run check:reading-advanced-scale`.
