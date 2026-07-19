# ADR 0001: Motor transversal de comprensión lectora

- Estado: aceptado para implementación piloto
- Fecha: 2026-07-18
- Rama: `codex/reading-engine-v1`

## Contexto

WeLearn ya tiene páginas de lectura por idioma y nivel, pero su contenido y la interacción están acoplados a componentes individuales. La expansión a ocho idiomas y dos locales de interfaz no debe multiplicar renderers ni servir variantes distintas desde una misma URL.

La guía de Google para sitios multilingües recomienda URLs distintas por idioma, enlaces explícitos entre variantes, `hreflang` y evitar redirecciones automáticas basadas en IP o `Accept-Language`.

## Decisiones

1. Un contrato JSON versionado alimenta un solo hub y un solo renderer.
2. Los adaptadores cambian tokenización y ayudas de escritura; no duplican la experiencia.
3. La interfaz española usa `/es/practica/.../lectura`; la inglesa usa `/en/practice/.../reading`.
4. Cada variante tiene canonical autorreferente y `hreflang` recíproco `es`, `en` y `x-default` hacia la versión española principal.
5. No se cambia contenido por IP, país ni idioma del navegador. El selector explícito persiste la elección localmente.
6. El contenido esencial se renderiza en HTML inicial; la interacción vive en una isla cliente.
7. El progreso y la producción se mantienen separados del contenido. El texto libre no se envía a analítica.
8. Un ejercicio no entra al sitemap ni se indexa hasta tener estado `published`, revisión humana identificada y `seo.indexable: true`.
9. JLPT, TOPIK y CEFR se conservan como escalas separadas con aviso explícito.

## Consecuencias

- Añadir una lectura nueva requiere principalmente un archivo JSON.
- Las rutas anteriores siguen funcionando y pueden migrarse gradualmente.
- El piloto es visible solo con `READING_PREVIEW=1` hasta completar revisión humana.
- La validación estructural y editorial corre antes del build y bloquea publicaciones incompletas.

## Fuera del primer milestone

- Audio definitivo y revisión humana real.
- Persistencia autenticada en Supabase.
- Catálogo de 48 lecturas.
- Migración o redirección de las lecturas históricas.

