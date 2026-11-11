# Piloto de Reading B2–C2

Estado: **24 borradores editoriales; ninguno publicado** (10 de noviembre de 2026).

Hay una lectura por combinación de ocho idiomas (`en`, `fr`, `it`, `de`, `ru`, `ja`, `ko`, `pt`) y tres niveles (`B2`, `C1`, `C2`). La fuente de autoría es `src/data/reading/advanced-pilot.mjs`, con ampliaciones y variantes de apoyo en `advanced-pilot-localization.mjs`; `node scripts/build-reading-advanced-pilot.mjs --write` genera las 24 fichas JSON. No se editan los JSON a mano.

Las lecturas reutilizan las cinco estaciones del motor existente: preparar, leer, comprobar, producir y cierre. Cada una tiene seis preguntas con evidencia textual y seis glosas. B2 trabaja propuesta, límites y consecuencias; C1 añade postura implícita; C2 exige interpretar matices y tensiones no resueltas. Los textos se ampliaron con un párrafo contextual por lectura. Siguen siendo borradores breves, **no una certificación de nivel CEFR**. La evaluación independiente figura pendiente en todas las fichas.

## Vista editorial

Con `READING_PREVIEW=1`, abrir `/en/practice/<language>/<level>/reading` y elegir la única lectura. Por ejemplo: `/en/practice/english/b2/reading/a-library-of-things`. Las rutas españolas del piloto redirigen a las equivalentes inglesas. Toda la interfaz del piloto usa inglés; el pasaje, las preguntas y la consigna de producción están en el idioma de práctica. Sin esa variable, el catálogo no expone estos borradores; tampoco entran al sitemap ni son indexables.

La interfaz del piloto usa una portada azul con el nivel integrado en la composición, páginas claras para leer y tarjetas de preguntas con evidencia visible tras responder. El estilo está limitado a B2–C2 mediante `premiumRoot`; las lecturas A1–B1 publicadas conservan su diseño. Cuando solo hay una lectura, el catálogo lateral se oculta por redundante y vuelve a aparecer al ampliar el nivel.

El estudiante con sesión puede enviar explícitamente su producción escrita a `/api/reading/submissions`. La ruta valida origen, tamaño, ejercicio y extensión, y guarda la entrega privada con RLS en `reading_writing_submissions`; el panel `/dashboard/admin/lecturas` muestra las últimas entregas a un administrador verificado. Para activar ese flujo en un entorno hay que aplicar la migración `20261111000509_reading_writing_submissions.sql`. La revisión automática se solicita aparte a `/api/writing/feedback`, que sigue apagada salvo que el servidor tenga `OPENAI_WRITING_FEEDBACK_ENABLED=1` y una clave válida; sus cuotas y reglas están en `docs/revision-escritura-openai.md`. Se solicita feedback en el idioma de práctica y no se envía audio ni se guarda el borrador al pulsar solo la revisión automática.

La migración no se aplicó al proyecto remoto durante la revisión visual. El stack local de Supabase tampoco está disponible en este portátil porque Docker no está iniciado; falta verificar una entrega autenticada y la lectura del panel administrativo en un entorno de pruebas antes de activar este flujo para estudiantes.

## Verificaciones

- `node scripts/build-reading-advanced-pilot.mjs` comprueba que la fuente y los JSON coincidan.
- `npm run check:reading-content` exige las 24 combinaciones, seis preguntas, cinco destrezas, seis glosas, evidencia literal y estado de borrador.
- El guardián exige que cada lectura distribuya las seis claves 2/2/2 entre las tres posiciones. También comprueba por nivel que la respuesta correcta sea corta, media y larga sin que una banda domine (20–45 % cada una); el componente vuelve a repartir las posiciones en cada sesión.
- `node --test tests/reading-content.test.mjs` protege el contrato general y la barrera de publicación.

## Antes de publicar

Un revisor competente en cada idioma debe comprobar naturalidad, corrección, glosas, claves y evidencia; otra persona debe revisar la progresión pedagógica B2/C1/C2. Conviene ampliar los textos si se decide que estas piezas serán las lecturas completas del curso: este piloto mide comprensión cercana de pasajes breves. Después se registra la evaluación de nivel independiente, revisores y fechas reales, y se cambia cada ficha a `published` e indexable siguiendo `docs/reading-content-guide.md`. Solo entonces se enlaza la tarjeta Reading en los hubs de nivel y se prepara su despliegue desde `main`.
