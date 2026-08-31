# Podcasts dentro de los hubs de examen

## Decisión de producto

`/podcasts` es la biblioteca transversal y también aparece como herramienta abierta, pero no es el destino principal de ningún episodio. Cada podcast vive en una URL editorial dentro de su examen:

```text
/examenes/<examen>/podcast/<episodio>
```

La página del episodio contiene el reproductor, una descripción extensa, objetivos de aprendizaje, aclaraciones editoriales, notas escritas y enlaces hacia la práctica relacionada. Esto permite que el episodio contribuya al clúster SEO del examen sin convertir el hub en una página interminable.

## Fuente única

`src/data/practica/exam-podcast-catalog.ts` es la fuente de verdad editorial. Amplía el registro breve de `podcast-library.ts` y alimenta:

- la estantería compacta que aparece en los hubs de examen;
- las once páginas editoriales de episodio;
- metadatos, JSON-LD y parámetros estáticos;
- el sitemap;
- enlaces del índice `/podcasts`.

El audio y las notas no se duplican. El catálogo referencia los MP3 y módulos de notas ya publicados.

## Integración visual

- IELTS conserva su jerarquía limpia y muestra tres tarjetas de audio entre la elección de modalidad y las rutas de habilidad.
- TOEFL reemplaza el bloque editorial gigante y duplicado por una estantería compacta.
- Los hubs de TOEFL, ICFES, Cambridge B2, SAT, TOPIK e IELTS muestran únicamente el resumen pertinente y enlazan a la página completa.
- Las páginas específicas de IELTS Reading, Task 1 y Task 2 conservan su orientación en contexto y añaden un enlace a la URL editorial canónica.
- `/herramientas` enlaza a la biblioteca completa como utilidad abierta.

## Protección para despliegues

`config/production-baseline.json` protege el catálogo, el componente de hub, la ruta dinámica, sus estilos y los once audios editoriales. El sitemap deriva las URLs del mismo catálogo. Un despliegue que elimine cualquiera de estos elementos debe fallar antes de llegar a producción.

Antes de integrar una rama:

```bash
git fetch origin
git rebase origin/main
npm run check:production-baseline -- --compare-git-ref=origin/main
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Después del despliegue se deben probar los siete hubs de examen, `/podcasts`, `/herramientas`, las once páginas editoriales y los once activos de audio.
