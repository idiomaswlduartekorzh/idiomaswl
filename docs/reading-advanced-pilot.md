# Piloto de Reading B2–C2

Estado: **24 borradores editoriales; ninguno publicado** (10 de noviembre de 2026).

Hay una lectura por combinación de ocho idiomas (`en`, `fr`, `it`, `de`, `ru`, `ja`, `ko`, `pt`) y tres niveles (`B2`, `C1`, `C2`). La fuente de autoría es `src/data/reading/advanced-pilot.mjs`; `node scripts/build-reading-advanced-pilot.mjs --write` genera las 24 fichas JSON. No se editan los JSON a mano.

Las lecturas reutilizan las cinco estaciones del motor existente: preparar, leer, comprobar, producir y cierre. Cada una tiene seis preguntas con evidencia textual y seis glosas. B2 trabaja propuesta, límites y consecuencias; C1 añade postura implícita; C2 exige interpretar matices y tensiones no resueltas. Son textos breves para probar la experiencia, **no una certificación de nivel CEFR**. La evaluación independiente figura pendiente en todas las fichas.

## Vista editorial

Con `READING_PREVIEW=1`, abrir `/practica/<idioma>/<nivel>/lectura` y elegir la única lectura. Por ejemplo: `/practica/ingles/b2/lectura/a-library-of-things`. Sin esa variable, el catálogo no expone estos borradores; tampoco entran al sitemap ni son indexables. La ruta inglesa `/en/practice/<language>/<level>/reading` usa el mismo catálogo cuando se habilita la vista editorial.

La interfaz del piloto usa una cubierta azul con folio del nivel, páginas claras para leer y tarjetas de preguntas con evidencia visible tras responder. El estilo está limitado a B2–C2 mediante `premiumRoot`; las lecturas A1–B1 publicadas conservan su diseño. Cuando solo hay una lectura, el catálogo lateral se oculta por redundante y vuelve a aparecer al ampliar el nivel.

## Verificaciones

- `node scripts/build-reading-advanced-pilot.mjs` comprueba que la fuente y los JSON coincidan.
- `npm run check:reading-content` exige las 24 combinaciones, seis preguntas, cinco destrezas, seis glosas, evidencia literal y estado de borrador.
- `node --test tests/reading-content.test.mjs` protege el contrato general y la barrera de publicación.

## Antes de publicar

Un revisor competente en cada idioma debe comprobar naturalidad, corrección, glosas, claves y evidencia; otra persona debe revisar la progresión pedagógica B2/C1/C2. Conviene ampliar los textos si se decide que estas piezas serán las lecturas completas del curso: este piloto mide comprensión cercana de pasajes breves. Después se registra la evaluación de nivel independiente, revisores y fechas reales, y se cambia cada ficha a `published` e indexable siguiendo `docs/reading-content-guide.md`. Solo entonces se enlaza la tarjeta Reading en los hubs de nivel y se prepara su despliegue desde `main`.
