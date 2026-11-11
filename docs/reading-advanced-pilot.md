# Piloto de Reading B2–C2

Estado: **colección en ampliación hacia una meta mínima de 480; ninguno publicado** (11 de noviembre de 2026).

Punto de control del 11 de noviembre: **310/480 borradores** en la rama de trabajo; faltan **170**. Los ocho grupos B2 tienen 20/20. En C1, inglés, francés, italiano, alemán, portugués y ruso tienen 20/20; japonés tiene 4/20 y coreano 2/20. En C2, inglés tiene 16/20; los demás grupos conservan uno o dos borradores. Las variantes gratuitas de Gemini que respondieron agotaron su cuota diaria; el generador puede reanudarse sin repetir fichas guardadas. Los nuevos borradores siguen sin revisión humana. No integrar ni publicar hasta completar 20 por combinación, corregir los sesgos, revisar las fichas y terminar el build completo.

Pendiente de calidad: la longitud de las respuestas presenta sesgo en varios grupos B2 y C1, además de los grupos incompletos. `npm run report:reading-advanced-review` muestra la cantidad pendiente por combinación y las preguntas con las mayores pistas de longitud para una edición semántica; **no modifica opciones**. `npm run check:reading-advanced-scale` sigue fallando hasta que el catálogo cumpla los umbrales. Hay que repetir el recorte de fuentes PDF cuando se añadan más caracteres japoneses o coreanos.

Las 24 lecturas originales cubren las combinaciones de ocho idiomas (`en`, `fr`, `it`, `de`, `ru`, `ja`, `ko`, `pt`) y tres niveles (`B2`, `C1`, `C2`). Su fuente de autoría es `src/data/reading/advanced-pilot.mjs`, con continuaciones en `advanced-pilot-extensions.mjs` y variantes de apoyo en `advanced-pilot-localization.mjs`; `node scripts/build-reading-advanced-pilot.mjs --write` regenera sus 24 fichas JSON. No se editan esos JSON a mano.

El propietario fijó el nuevo mínimo en **20 textos por nivel y por idioma**: 8 × 3 × 20 = 480 lecturas. `src/data/reading/advanced-scale-briefs.mjs` contiene 19 situaciones y sus ángulos B2/C1/C2. `scripts/generate-reading-advanced-free.mjs` genera las fichas faltantes mediante la API gratuita configurada, de forma reanudable. Todas quedan en `draft`, con revisión lingüística, pedagógica y nivelación independientes pendientes. `npm run check:reading-advanced-scale` es el control de lanzamiento: exige 20 por combinación, títulos, textos y temas distintos, longitud mínima, distribución de longitudes de respuesta y ausencia de textos demasiado parecidos. Debe fallar hasta que la colección esté completa. La comprobación ordinaria de contenido admite la ampliación sin perder los 24 borradores existentes.

Las lecturas reutilizan las cinco estaciones del motor existente: preparar, leer, comprobar, producir y cierre. Cada una tiene seis preguntas con evidencia textual y seis glosas. B2 trabaja propuesta, límites y consecuencias; C1 añade postura implícita; C2 exige interpretar matices y tensiones no resueltas. Los textos originales se ampliaron hasta el piso por nivel. La longitud y los controles automáticos **no certifican el nivel CEFR**. La evaluación independiente figura pendiente en todas las fichas.

## Vista editorial

Con `READING_PREVIEW=1`, abrir `/en/practice/<language>/<level>/reading` y elegir una lectura. Por ejemplo: `/en/practice/english/b2/reading/a-library-of-things`. Las rutas españolas del piloto redirigen a las equivalentes inglesas. Toda la interfaz del piloto usa inglés; el pasaje, las preguntas y la consigna de producción están en el idioma de práctica. Sin esa variable, el catálogo no expone estos borradores; tampoco entran al sitemap ni son indexables.

El catálogo y cada lectura muestran un selector «Explore the reading collection» con enlaces a las 24 rutas de idioma y nivel, y el número real de lecturas disponible en cada una. Cada ruta muestra sus propias tarjetas; el selector no crecerá a 480 enlaces cuando se complete la colección.

La interfaz del piloto usa una portada azul con el nivel integrado en la composición, páginas claras para leer y tarjetas de preguntas con evidencia visible tras responder. El estilo está limitado a B2–C2 mediante `premiumRoot`; las lecturas A1–B1 publicadas conservan su diseño. Cuando solo hay una lectura, el catálogo lateral se oculta por redundante y vuelve a aparecer al ampliar el nivel.

El estudiante con sesión puede enviar explícitamente su producción escrita a `/api/reading/submissions`. La ruta valida origen, tamaño, ejercicio y extensión, y guarda la entrega privada con RLS en `reading_writing_submissions`; el panel `/dashboard/admin/lecturas` muestra las últimas entregas a un administrador verificado. Para activar ese flujo en un entorno hay que aplicar la migración `20261111000509_reading_writing_submissions.sql`. La revisión automática de la lectura se solicita aparte a `/api/reading/feedback`, que utiliza Gemini cuando el servidor dispone de `GEMINI_API_KEY` y aplica las cuotas del sistema de revisión de escritura. Se solicita feedback en el idioma de práctica y no se envía audio ni se guarda el borrador al pulsar solo la revisión automática.

La migración no se aplicó al proyecto remoto durante la revisión visual. El stack local de Supabase tampoco está disponible en este portátil porque Docker no está iniciado; falta verificar una entrega autenticada y la lectura del panel administrativo en un entorno de pruebas antes de activar este flujo para estudiantes.

## Verificaciones

- `node scripts/build-reading-advanced-pilot.mjs` comprueba que la fuente y los JSON coincidan.
- `npm run check:reading-content` exige las 24 combinaciones, seis preguntas, cinco destrezas, seis glosas, evidencia literal y estado de borrador.
- El guardián exige que cada lectura distribuya las seis claves 2/2/2 entre las tres posiciones. También comprueba por nivel que la respuesta correcta sea corta, media y larga sin que una banda domine (20–45 % cada una); el componente vuelve a repartir las posiciones en cada sesión.
- `node --test tests/reading-content.test.mjs` protege el contrato general y la barrera de publicación.

## Antes de publicar

Un revisor competente en cada idioma debe comprobar naturalidad, corrección, glosas, claves y evidencia; otra persona debe revisar la progresión pedagógica B2/C1/C2. Conviene ampliar los textos si se decide que estas piezas serán las lecturas completas del curso: este piloto mide comprensión cercana de pasajes breves. Después se registra la evaluación de nivel independiente, revisores y fechas reales, y se cambia cada ficha a `published` e indexable siguiendo `docs/reading-content-guide.md`. Solo entonces se enlaza la tarjeta Reading en los hubs de nivel y se prepara su despliegue desde `main`.
