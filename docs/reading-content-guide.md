# Guía para añadir lecturas al motor WeLearn

## Flujo seguro

1. Copia un ejercicio existente dentro de `src/data/reading/exercises/`.
2. Mantén `status: "draft"` y `seo.indexable: false` mientras se edita.
3. Añade el JSON al catálogo de `src/lib/reading/catalog.ts`.
4. Ejecuta `npm run check:reading-content` y `npm run test:reading`.
5. Abre la vista editorial con `READING_PREVIEW=1 npm run dev -- --port <puerto-libre>`.
6. Solicita revisión lingüística, pedagógica, cultural y de copyright.
7. Sustituye los campos pendientes por nombres reales y fechas reales.
8. Solo entonces cambia a `status: "published"` y `seo.indexable: true`.

El prebuild bloquea contenido publicado con revisores pendientes, nivelación fallida, vocabulario fuera del límite o escalas asiáticas sin aviso.

## Rutas

El motor deriva las dos URLs a partir de idioma, nivel y slug:

```text
/es/practica/ingles/a1/lectura/my-morning-at-the-cafe
/en/practice/english/a1/reading/my-morning-at-the-cafe
```

No añadas redirecciones automáticas por IP ni `Accept-Language`. El usuario cambia de locale con el selector visible.

## Qué pertenece a los datos

- texto, misión y vocabulario;
- preguntas, respuesta, evidencia y estrategia;
- producción no puntuada;
- métricas de nivelación;
- autores, revisores y fechas;
- metadata SEO y relaciones editoriales.

## Qué pertenece al renderer

- navegación de las cinco estaciones;
- glosas y ayudas de escritura;
- interacción de preguntas;
- puntaje y desempeño por habilidad;
- analítica sin texto personal;
- accesibilidad, layout y responsive.

No copies el renderer para un idioma nuevo. Añade o ajusta capacidades en `src/lib/reading/adapters.ts`.

## Audio

Usa `audio: null` hasta tener un archivo revisado que coincida exactamente con el texto. Cuando exista, declara la variante y confirma `transcriptMatchesText: true`.

