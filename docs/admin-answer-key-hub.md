# Hub de claves de exámenes

Ruta interna: `/dashboard/admin/claves`. Se entra desde el icono **Claves de exámenes** del menú lateral del centro operativo. El acceso usa `requireAdmin()` y solo muestra simulacros que `getMock()` sirve actualmente. Los borradores en pausa editorial no aparecen.

## Fuente de verdad

- El catálogo procede de `src/data/mocks/index.ts`. Las claves locales salen de cada `MockExam` ya normalizado.
- Las claves TOEFL con corrección en servidor salen de `src/server/toefl/*-registry.ts`. Nunca se infieren de las opciones visibles.
- El hub distingue respuestas autocorregidas, referencias de tareas que no corrige el runner general y tareas abiertas sin respuesta única.
- El Set 3 de Cambridge B2 contiene 82 respuestas objetivas y 6 tareas abiertas. Las letras de Listening se leen después de la distribución determinista de opciones.
- Los sets con audio de IELTS (20), Goethe A1 (7), Cambridge B2 First/FCE (10) y TOEFL (20) muestran una tarjeta **Transcripción del audio** con apertura y descarga directa del PDF correspondiente.
- La ruta de cada PDF se resuelve de forma centralizada en `src/lib/exams/transcript-resource.ts`. No se enlazan archivos manualmente desde el componente.

## Contrato editorial de las transcripciones

- IELTS, Cambridge B2 First/FCE y TOEFL usan interfaz editorial en español; el diálogo transcrito se conserva en inglés.
- Goethe A1 usa interfaz editorial y transcripción en alemán.
- Los 57 documentos incluyen la marca WeLearn, márgenes amplios, encabezado compacto y paginación. Se sirven desde `public/downloads/exam-transcriptions/`.
- `scripts/build_exam_transcription_pdfs.py` genera la biblioteca completa y falla si aparece un título IELTS, FCE o TOEFL sin traducción editorial definida.

## Alcance de la verificación

`npm run check:exam-answer-keys` recorre todos los sets publicados, confirma que las claves señalan opciones existentes, detecta IDs y opciones idénticas, comprueba espacios y respuestas vacías, revisa la unión con los registros de TOEFL y verifica las 57 rutas PDF (existencia, firma y tamaño mínimo). El check es parte de `prebuild`.

Un resultado de **0 alertas estructurales** no sustituye la revisión académica del enunciado, del audio o de respuestas alternativas semánticamente válidas. Las diferencias de puntuación intencionales, como la puntuación en opciones SAT o los pares IELTS aceptados en cualquier orden, deben conservarse al revisar contenido.

Para corregir una clave se modifica su fuente de verdad y se vuelve a ejecutar el check, `npx tsc --noEmit` y `npm run build`. No se mantiene una copia editable de respuestas en el admin.
