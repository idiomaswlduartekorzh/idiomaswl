# Piloto de Reading B2–C2

Estado actual: **480/480 fichas aprobadas para publicación** (14 de noviembre de 2026). La confirmación de David Duarte y la excepción de revisión están registradas en [`reading-advanced-release-2026-11-14.md`](reading-advanced-release-2026-11-14.md). El resto de este documento conserva el historial del piloto previo a esa aprobación.

Punto de control histórico del 13 de noviembre: **480/480 borradores** en la rama de trabajo, 20 en cada combinación de ocho idiomas y tres niveles. Todas las combinaciones tenían 20 títulos, textos y temas distintos, sin textos por debajo de la longitud mínima ni conteos incoherentes. La generación de los borradores restantes usó temporalmente la API gratuita configurada, sin añadir la clave al repositorio. El control de sesgo de longitud de respuestas pasó en **24 de 24 combinaciones**. La aprobación posterior consta en el acta de liberación.

El control automático de escala pasa en las 24 combinaciones. `npm run report:reading-advanced-review` sigue siendo una cola para la revisión semántica de cada pregunta y distractor; **no modifica opciones**. Hay que repetir el recorte de fuentes PDF cuando se añadan más caracteres japoneses o coreanos.

La revisión visual del 14 de noviembre detectó que el renderer ocultaba los saltos de párrafo y que 37 fichas no tenían ninguna respuesta correcta entre sus opciones más breves. El renderer ahora respeta los párrafos escritos y separa bloques largos entre oraciones, sin modificar el texto fuente; las 480 lecturas muestran al menos cinco párrafos visuales. Se acortó una respuesta correcta por ficha afectada y el control de escala ahora rechaza cualquier ficha sin respuesta corta correcta. La posición visible de las respuestas se distribuye de forma equilibrada y aleatoria por sesión, evitando un ciclo fijo entre las seis preguntas. Estas correcciones de borrador no sustituyen la revisión humana de sentido, lengua y nivel.

La auditoría del conjunto completo está en [`reading-advanced-quality-audit-2026-11-12.md`](reading-advanced-quality-audit-2026-11-12.md). Detectó inicialmente 20 lecturas donde la respuesta correcta era la única opción más larga en las seis preguntas; tras las correcciones editoriales quedan **cero**. El control de escala bloquea ese caso.

En el corte previo a la aprobación, las 480 fichas tenían fechas de revisión y evaluación `null`, y las comprobaciones cultural y de copyright en `false`. Una lectura asistida de una muestra por combinación detectó tres fallos confirmados y corregidos; sus resultados no constituyen aprobación humana.

Las 24 lecturas originales cubren las combinaciones de ocho idiomas (`en`, `fr`, `it`, `de`, `ru`, `ja`, `ko`, `pt`) y tres niveles (`B2`, `C1`, `C2`). Su fuente de autoría es `src/data/reading/advanced-pilot.mjs`, con continuaciones en `advanced-pilot-extensions.mjs` y variantes de apoyo en `advanced-pilot-localization.mjs`; `node scripts/build-reading-advanced-pilot.mjs --write` regenera sus 24 fichas JSON. No se editan esos JSON a mano.
El generador conserva de cada ficha guardada el estado, los datos de revisión y nivelación independiente, y los campos SEO de publicación. Así, una regeneración del contenido no borra aprobaciones reales; la validación sigue bloqueando cualquier ficha publicada con revisiones incompletas.

El propietario fijó el nuevo mínimo en **20 textos por nivel y por idioma**: 8 × 3 × 20 = 480 lecturas. `src/data/reading/advanced-scale-briefs.mjs` contiene 19 situaciones y sus ángulos B2/C1/C2. `scripts/generate-reading-advanced-free.mjs` genera borradores mediante la API gratuita configurada, de forma reanudable. También admite `--input-file` junto con `--language`, `--level` y `--slug` para incorporar un borrador redactado localmente con el mismo validador, sin sobrescribir fichas existentes. `npm run check:reading-advanced-scale` es el control de lanzamiento: exige 20 por combinación, títulos, textos y temas distintos, longitud mínima, distribución de longitudes de respuesta y ausencia de textos demasiado parecidos.

Las lecturas reutilizan las cinco estaciones del motor existente: preparar, leer, comprobar, producir y cierre. Cada una tiene seis preguntas con evidencia textual y seis glosas. B2 trabaja propuesta, límites y consecuencias; C1 añade postura implícita; C2 exige interpretar matices y tensiones no resueltas. Los textos originales se ampliaron hasta el piso por nivel. La longitud y los controles automáticos **no certifican el nivel CEFR**; el juicio de nivel aprobado fue registrado a nombre del propietario, como explica el acta.

## Vista editorial

Abrir `/en/practice/<language>/<level>/reading` y elegir una lectura. Por ejemplo: `/en/practice/english/b2/reading/a-library-of-things`. Las rutas españolas del piloto redirigen a las equivalentes inglesas. La interfaz usa inglés; el pasaje, las preguntas y la consigna de producción están en el idioma de práctica. `READING_PREVIEW=1` solo es necesario para ver fichas que sigan en borrador.

El catálogo y cada lectura muestran un selector «Explore the reading collection» con enlaces a las 24 rutas de idioma y nivel, y el número real de lecturas disponible en cada una. Cada ruta muestra sus propias tarjetas; el selector no crecerá a 480 enlaces cuando se complete la colección.

La interfaz del piloto usa una portada azul con el nivel integrado en la composición, páginas claras para leer y tarjetas de preguntas con evidencia visible tras responder. El estilo está limitado a B2–C2 mediante `premiumRoot`; las lecturas A1–B1 publicadas conservan su diseño. Cuando solo hay una lectura, el catálogo lateral se oculta por redundante y vuelve a aparecer al ampliar el nivel.

El estudiante con sesión puede enviar explícitamente su producción escrita a `/api/reading/submissions`. La ruta valida origen, tamaño, ejercicio y extensión, y guarda la entrega privada con RLS en `reading_writing_submissions`; el panel `/dashboard/admin/lecturas` muestra las últimas entregas a un administrador verificado. La migración `20261114145428_reading_writing_submissions.sql` ya fue aplicada al proyecto Supabase de WeLearn. La revisión automática de la lectura se solicita aparte a `/api/reading/feedback`, que utiliza Gemini cuando el servidor dispone de `GEMINI_API_KEY` y aplica las cuotas del sistema de revisión de escritura. Se solicita feedback en el idioma de práctica y no se envía audio ni se guarda el borrador al pulsar solo la revisión automática.

El stack local de Supabase no estaba disponible durante la revisión visual porque Docker no estaba iniciado. La migración remota quedó aplicada el 14 de noviembre y se verificó la tabla con RLS y su política. Falta comprobar la entrega autenticada y la lectura del panel administrativo en el deployment de producción.

## Verificaciones

- `node scripts/build-reading-advanced-pilot.mjs` comprueba que la fuente y los JSON coincidan.
- `npm run check:reading-content` exige las 24 combinaciones, seis preguntas, cinco destrezas, seis glosas, evidencia literal y metadatos completos para las fichas publicadas.
- El guardián exige que cada lectura distribuya las seis claves 2/2/2 entre las tres posiciones. También comprueba por nivel que la respuesta correcta sea corta, media y larga sin que una banda domine (20–45 % cada una); el componente vuelve a repartir las posiciones en cada sesión.
- `node --test tests/reading-content.test.mjs` protege el contrato general y la barrera de publicación.

## Antes de publicar

La aprobación editorial del propietario está registrada en el acta de liberación. Antes de desplegar, pasar los controles de contenido, catálogo, TypeScript y build completo; aplicar la migración del envío de textos y verificar los flujos privados. La publicación procede exclusivamente desde `main`.
