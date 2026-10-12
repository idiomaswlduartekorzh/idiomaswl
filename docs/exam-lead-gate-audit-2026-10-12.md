# Auditoría de captura antes de resultados — 12 de octubre de 2026

## Alcance

Simulacros completos publicados en `/examenes/[exam]/practica/[mockId]` y los simulacros ICFES históricos en `/practica/icfes-saber-11/examenes/[examId]`. Se comprobó el despacho de los diez catálogos: IELTS, TOEFL, SAT, ICFES, Goethe, TOPIK, CILS/CELI, DELF/DALF, CELPE-Bras y Cambridge B2.

| Motor | Catálogos | Barrera antes del resultado |
| --- | --- | --- |
| `PracticeClient` | SAT, ICFES | Formulario obligatorio. ICFES se califica en servidor y exige lead persistido antes de devolver la nota. |
| `IELTSPracticeClient` | IELTS 1–20 | Entrega con nombre, correo, WhatsApp y consentimiento; `IELTSSubmission` confirma el lead antes de la entrega. Sets sin contrato se rechazan. |
| `Toefl2026PracticeClient` | TOEFL 1–20 | Entrega con datos y consentimiento; el cálculo de secciones se inicia después de confirmar la entrega. El motor antiguo sin barrera no se sirve. |
| `GoetheA1PracticeClient` | Goethe A1 | `GoetheSubmission` exige lead persistido antes de preparar y confirmar la entrega. |
| `TOPIKPracticeClient` | TOPIK set 1 | Modal obligatorio. Se eliminó el salto basado en `localStorage`, que era editable por el visitante. |
| `LanguagePracticeClient` | TOPIK restante, Goethe habilitado, CILS/CELI, DELF/DALF, CELPE-Bras, Cambridge B2 | Modal obligatorio: el cierre que abre la nota solo ocurre después del guardado exitoso. |

Los formularios obligatorios ahora exigen que `saveLead` devuelva un identificador real de Supabase. La respuesta simulada del campo trampa no lo devuelve y ya no abre resultados. Para fuentes obligatorias de examen, la acción también rechaza nombre o correo faltante. El panel administrativo consulta la nueva fuente `exam-results` y conserva las fuentes anteriores.

## Límites que deben mantenerse visibles

- Las prácticas independientes por destreza y los ejercicios de aprendizaje tienen retroalimentación inmediata; no están cubiertos por esta barrera de simulacros completos.
- Algunos motores de simulacro calculan o incluyen claves objetivas en código enviado al navegador. La barrera protege el recorrido oficial y la visualización normal del resultado, pero no impide que alguien inspeccione el código y reconstruya una nota por su cuenta. Para impedirlo haría falta retirar esas claves del cliente y calificar esos motores en servidor.
- Los endpoints públicos de puntuación por destreza de IELTS y TOEFL siguen disponibles para sus prácticas independientes. No equivalen al informe completo del simulacro.

## Verificación

Pasaron 23 pruebas dirigidas con `node --experimental-strip-types --no-warnings --test tests/exam-lead-capture.test.mts tests/icfes-product.test.mjs tests/ielts-product-assurance.test.mjs`, `npm run check:practica-catalog`, `npx tsc --noEmit` y `NODE_OPTIONS=--max-old-space-size=6144 npm run build -- --webpack` (2.599 páginas). El build Turbopack agotó el heap local durante TypeScript; Webpack completó la misma validación.

En el build local, Playwright completó las 30 preguntas de TOPIK con `wl_lead_captured=1` escrito manualmente en `localStorage`. El formulario obligatorio apareció y el componente de resultados permaneció ausente. Escape no cerró el formulario y un envío vacío mostró error sin revelar la nota.

La misma prueba de 30 preguntas se repitió sobre `www.idiomaswl.com` después de que Vercel marcara `READY`: con la marca local forzada, apareció el formulario y el resultado seguía fuera del DOM. No se enviaron datos de contacto de prueba.
