# Reading B2–C2: acta de liberación

## Aprobación editorial

El 14 de noviembre de 2026, David Duarte, CEO de WeLearn, confirmó expresamente que su aprobación abarca las **480 lecturas**: veinte por nivel B2, C1 y C2 en cada uno de los ocho idiomas. Confirmó que revisó lengua, preguntas, cultura, autoría, pedagogía y nivel CEFR. El contenido había sido redactado con asistencia de IA; la evaluación de nivel fue posterior a esa autoría.

Por decisión expresa del propietario, David Duarte consta como revisor lingüístico, pedagógico y evaluador de nivel en cada ficha. **No hubo un segundo revisor humano** para la progresión pedagógica; esta es una excepción documentada a la recomendación de `docs/reading-advanced-pilot.md`. Las fechas de las fichas registran la confirmación del 14 de noviembre, no una fecha inferida de revisión previa. Las métricas automáticas y la muestra de auditoría se describen en `docs/reading-advanced-quality-audit-2026-11-12.md`; no se presentan como sustitutos de la decisión del propietario.

## Alcance técnico

- 480 fichas con `status: published`, `seo.indexable: true`, decisiones de lengua y pedagogía aprobadas, comprobaciones de cultura y autoría positivas, y evaluación CEFR registrada a nombre de David Duarte.
- Veinte fichas por cada combinación de idioma y nivel; seis preguntas y seis glosas por ficha.
- El catálogo y las rutas inglesas muestran las lecturas publicadas. Las rutas españolas de este piloto redirigen a la interfaz inglesa; el pasaje y las preguntas permanecen en el idioma de práctica.
- El envío voluntario de producción escrita de estudiantes con sesión usa la migración `supabase/migrations/20261114145428_reading_writing_submissions.sql`, aplicada al proyecto Supabase de WeLearn el 14 de noviembre. La tabla quedó verificada con RLS activo y una política de lectura propia. La comprobación del envío autenticado y del panel privado queda para el deployment.

## Corrección de consignas tras la aprobación

La prueba de producción descubrió que algunas consignas pedían una extensión incompatible con el contador y los límites de la misma ficha. Se ajustaron **255 consignas** en ambas variantes de metadatos (`es` y `en`): solo las cifras de extensión y, en coreano, la unidad `자` (caracteres) por `어절` (segmentos separados por espacios). No se modificaron los pasajes, las preguntas, las respuestas ni el encargo temático de las consignas. Esta corrección mecánica fue posterior a la aprobación de David Duarte y queda identificada como tal; no se atribuye una segunda revisión humana. `check:reading-advanced-scale` ahora bloquea una consigna con una extensión fuera del intervalo que muestra la interfaz y forma parte del prebuild.

## Verificación y despliegue

Antes de integrar en `main` pasaron `npm run check:practica-catalog`, `npm run check:reading-content` (721 fichas válidas), `npm run check:reading-advanced-scale` (24/24 grupos, 20/20 por grupo), `npm run test:reading` (14/14), `npm run check:pdf-fonts`, `npx tsc --noEmit` y `npm run build` completo. El build local compiló y generó las páginas correctamente. El despliegue debe proceder del commit integrado en `main`. Después se comprueban una lectura de cada idioma y nivel, las rutas de catálogo, el sitemap, la revisión automática y el flujo privado de entregas.
