# Arquitectura pública de podcasts

Los podcasts son una herramienta editorial de preparación, no una categoría principal del sitio.

## Dónde se descubren

- La navegación global enlaza **Herramientas**, pero no **Podcasts**.
- `/herramientas` contiene una tarjeta **Podcasts de exámenes** que abre `/podcasts`.
- Cada hub de examen muestra únicamente sus episodios mediante `ExamPodcastShelf`.
- Las rutas de práctica pueden enlazar el episodio pertinente dentro de su contexto.

## Dónde viven

- `/podcasts` es la biblioteca pública e indexable. Su breadcrumb la sitúa bajo Herramientas.
- Cada episodio tiene una sola página canónica en `/examenes/[exam]/podcast/[slug]`.
- `src/data/practica/podcast-library.ts` es la fuente para identidad, URL, audio, duración y colección.
- `src/data/practica/exam-podcast-catalog.ts` añade resultados de aprendizaje, revisión editorial, guía escrita y rutas relacionadas.

## Contrato de interfaz y SEO

- La biblioteca no reproduce audio automáticamente y usa `preload="none"`.
- La página de episodio conserva `PodcastFeature`, revisión editorial, notas y siguientes pasos hacia práctica deliberada.
- La biblioteca declara canonical, Open Graph, `BreadcrumbList`, `CollectionPage` e `ItemList`.
- Cada episodio declara canonical, Open Graph y JSON-LD `PodcastEpisode`, `PodcastSeries` y `LearningResource`.
- La biblioteca y todas las páginas de episodio se derivan del catálogo y entran en el sitemap.

## Guardián

`npm run check:podcast-architecture` valida esta jerarquía, los contratos UI/SEO, la integridad de las URLs y la existencia de cada MP3. Forma parte de `prebuild`; un incumplimiento detiene el despliegue.
