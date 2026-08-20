# Blueprint de entregas y revisión IELTS

Este blueprint conecta un simulacro IELTS con una sola ficha por estudiante. La ficha conserva identidad, resultados automáticos de Listening/Reading, ensayos, reportes de Writing, notas y audios privados de Speaking, bandas finales y trazabilidad de la revisión humana.

## Flujo compartido

1. El endpoint de entrega crea una fila `exam_submissions` con un UUID y devuelve un comprobante firmado de corta duración.
2. El navegador sube los audios directamente al bucket privado mediante URLs firmadas y confirma la entrega.
3. La pantalla de resultados envía el mismo comprobante al motor de Writing para Task 1 y Task 2.
4. El servidor valida firma, vencimiento, mock, estado y coincidencia exacta entre el ensayo recibido y el ensayo almacenado. Nunca acepta una banda o un reporte fabricado por el navegador.
5. Cada reporte se guarda en su propia columna JSON. Cuando están las dos tareas, el servidor calcula Writing con peso Task 1 × 1 y Task 2 × 2.
6. El panel admin muestra L/R/W/S, los textos, los dos reportes y los audios. La banda de Writing de IA es una sugerencia; el profesor confirma Writing, asigna Speaking y cierra la revisión.
7. Al cerrar, el Overall se recalcula con las cuatro habilidades disponibles y la ficha pasa al historial de revisadas sin desaparecer.

## Incorporar otro mock IELTS

1. Crear o reutilizar su endpoint de entrega con el mismo contrato `prepare → upload → complete`.
2. Añadir una entrada en `IELTS_REVIEW_BLUEPRINTS`, dentro de `src/lib/ielts/review-blueprint.ts`, indicando `mockId`, `mockTitle` y el mapeo de sus dos tareas.
3. Hacer que el componente de entrega devuelva `IeltsSubmissionReceipt` y pasarlo a `useWritingAssessment` en la pantalla de resultados.
4. Verificar que el mock está registrado en el adaptador oficial de Writing (`isFreeIeltsMock` y `getIeltsWritingAssignment`).
5. Ejecutar `npm run test:ielts-review`, TypeScript, el guardián de catálogo y el build.

No se necesita crear otro motor de evaluación, otra fórmula de bandas, nuevas acciones de revisión ni otro panel admin. Los mocks pueden incorporarse uno por uno sin migraciones adicionales mientras mantengan Task 1 y Task 2.

## Controles de seguridad y operación

- La clave service-role solo se usa en módulos `server-only`.
- El comprobante está firmado con HMAC, ligado al UUID y expira a las dos horas.
- Un comprobante no permite evaluar otro texto ni otra entrega.
- Los audios permanecen en un bucket privado; el admin recibe enlaces temporales de una hora.
- Las columnas de reportes son aditivas y aceptan `NULL`, por lo que las entregas antiguas siguen funcionando.
- La revisión humana no reemplaza Listening/Reading: recompone el resumen completo L/R/W/S.
