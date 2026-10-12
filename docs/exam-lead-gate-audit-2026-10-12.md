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

Los formularios obligatorios exigen que `saveLead` devuelva un identificador real de Supabase. La respuesta simulada del campo trampa no lo devuelve y no abre resultados. Para fuentes obligatorias de examen, la acción rechaza nombre, correo o consentimiento faltantes. El panel administrativo consulta `exam-results` y las fuentes anteriores.

Antes de registrar el lead, las páginas de simulacros entregan al navegador una versión sin claves objetivas, transcripciones de revisión ni pistas de corrección. Después de persistir el lead, el servidor devuelve el simulacro completo mediante un comprobante firmado para ese examen y set. Las seis API de puntuación independientes de IELTS y TOEFL requieren una cookie de acceso firmada que solo se concede tras guardar un lead. Las API de entrega completa también comprueban ese acceso; Goethe exige el comprobante firmado en su preparación. Las prácticas puntuadas independientes muestran el formulario antes de montar el ejercicio y se registran con fuente `exam-practice-start` para distinguirlas de exámenes terminados.

## Límites que deben mantenerse visibles

- Los ejercicios generales de aprendizaje que no son simulacros conservan su retroalimentación inmediata. Nivel Radar exige una cuenta para guardar y ver el diagnóstico; su captura de contacto opcional tiene una finalidad distinta.
- El servidor entrega las claves completas al navegador **después** de registrar el lead para permitir la revisión. Cualquier persona con un comprobante válido puede inspeccionar esas claves; no hay una autorización separada por resultado individual.
- La cookie de puntuación dura 12 horas y sirve para las prácticas puntuadas del mismo examen, de modo que una persona registrada no tiene que completar otro formulario para cada set. La métrica de intentos terminados debe seguir basándose en la entrega, no en `exam-practice-start`.

## Verificación

Consulta agregada de producción, sin leer datos de contacto: en los 30 días hasta el 12 de octubre hubo 16 entregas (`icfes` 8, `toefl` 6, `goethe` 2) y 12 leads con fuentes de examen (`toefl-practica` 7, `icfes-practica` 3, `goethe-practica` 2). La última entrega visible fue el 2 de octubre. Los recuentos no se pueden conciliar uno a uno por fuentes y fechas: hay entregas históricas sin fila propia en `leads`, motivo por el que el panel también consulta `exam_submissions`. No se creó ningún contacto ficticio para probar producción.

La prueba de seguridad recorre los simulacros publicados y verifica que la versión pública no incluya respuestas objetivas, transcripciones ni pistas. También comprueba que los visuales Goethe A1 solo llevan respuestas de ejemplo y que los comprobantes y cookies no sirven para otro examen o set. Pasan las pruebas de captura, producto ICFES/IELTS, `check:practica-catalog`, TypeScript y los guardianes de Goethe, TOEFL y SAT. En el servidor local las seis API de puntuación devolvieron 403 sin cookie y las API de entrega completa de IELTS, TOEFL y Goethe devolvieron 403 sin registro. En navegador, la práctica independiente mostró el formulario antes del ejercicio; Escape y el envío vacío no lo saltaron. La compilación final y las pruebas HTTP de producción se registrarán con el despliegue.

En el build local, Playwright completó las 30 preguntas de TOPIK con `wl_lead_captured=1` escrito manualmente en `localStorage`. El formulario obligatorio apareció y el componente de resultados permaneció ausente. Escape no cerró el formulario y un envío vacío mostró error sin revelar la nota.

La misma prueba de 30 preguntas se repitió sobre `www.idiomaswl.com` después de que Vercel marcara `READY`: con la marca local forzada, apareció el formulario y el resultado seguía fuera del DOM. No se enviaron datos de contacto de prueba.
