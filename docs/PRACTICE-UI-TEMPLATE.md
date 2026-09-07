# Plantilla visual de práctica

Esta plantilla define cómo se presentan las bibliotecas de ejercicios y las sesiones
individuales. Se creó a partir de la unificación de TOEFL y puede reutilizarse en otros
exámenes o idiomas sin copiar estilos de TOEFL.

El contrato completo para expandir sets, familias, idiomas y exámenes está en
[EXAM-PRACTICE-EXPANSION-BLUEPRINT.md](./EXAM-PRACTICE-EXPANSION-BLUEPRINT.md). Esta
página resume únicamente la capa visual.

## Piezas compartidas

- `src/components/exam-practice/PracticeRouteShell.tsx`: marco de página, ancho,
  breadcrumbs, enlace de regreso y contexto de práctica abierta.
- `src/components/exam-practice/PracticeSetCatalog.tsx`: encabezado de biblioteca,
  contador y tarjetas para escoger un ejercicio antes de abrirlo.
- `src/components/exam-practice/PracticeSessionHeader.tsx`: encabezado de una sesión
  abierta con título, instrucción y una métrica opcional de progreso o tiempo.
- `src/components/toefl/ToeflPracticeSetCatalog.tsx`: preset mínimo que configura el
  producto TOEFL sobre el catálogo genérico.

## Contrato de experiencia

1. Una familia con varios ejercicios muestra primero `PracticeSetCatalog`.
2. La sesión seleccionada usa `PracticeRouteShell` y ofrece una salida visible hacia la
   biblioteca correspondiente.
3. La sesión empieza con `PracticeSessionHeader`; la métrica de la derecha mantiene el
   mismo lugar para respuestas, grabaciones o tiempo.
4. Reading, Listening, Writing y Speaking conservan una estructura común. El color de
   sección ayuda a ubicarse y no cambia la geometría ni el comportamiento.
5. La vista móvil apila encabezado y métrica, mantiene botones de al menos 40 px y evita
   desplazamiento horizontal.
6. La práctica guarda progreso en el navegador cuando el motor lo permite. Los controles
   de audio y la navegación de práctica permanecen libres.

## Cómo extenderla

Para un idioma o examen nuevo, crea una ruta de datos y compón estas tres piezas. Pasa el
nombre del producto, la sección, los textos y los enlaces como propiedades. El contenido
académico y la lógica de puntuación permanecen en sus motores; la plantilla solo controla
presentación, navegación y estados visibles.

El guardián `scripts/check-toefl-practice-ui.mjs` protege la adopción transversal actual
de TOEFL y sirve como referencia para crear un guardián equivalente en el producto nuevo.
