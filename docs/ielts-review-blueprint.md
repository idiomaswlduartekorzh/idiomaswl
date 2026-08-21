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

## Llamados delegados para ChatGPT, Claude o un evaluador externo

El panel puede crear tres llamados independientes por entrega: `Writing Task 1`, `Writing Task 2` y `Speaking completo`. No se comparte una cuenta de administrador. Cada llamado crea una capacidad limitada con estas propiedades:

- código único del llamado y UUID exacto del intento;
- tarea inmutable y consigna exacta del mock;
- respuesta escrita o audios privados con URL firmada de una hora;
- referencia y enlace a los descriptores públicos oficiales de IELTS;
- token aleatorio de 256 bits almacenado únicamente como SHA-256;
- caducidad de 24 horas, un solo uso y revocación automática al regenerar;
- sin correo de la estudiante, sin listado de entregas y sin acceso a otras rutas admin.

### Flujo operativo de Speaking para agentes

1. El administrador crea `Llamado · Speaking` desde la ficha del intento y copia el mensaje en ChatGPT, Claude o el evaluador elegido.
2. Antes de crear el llamado, el servidor compara las grabaciones con todas las consignas de Speaking del mock. Si falta una, no permite emitir una banda completa y muestra los IDs faltantes.
3. El agente abre el enlace limitado o hace `GET` al endpoint incluido. Recibe el código del llamado, UUID, consignas exactas, cuatro URLs firmadas de audio, rúbrica, protocolo y contrato de respuesta; nunca recibe nombre ni correo.
4. El agente escucha todas las grabaciones y puntúa `Fluency and Coherence`, `Lexical Resource`, `Grammatical Range and Accuracy` y `Pronunciation`. Pronunciation debe sustentarse en evidencia audible, no en notas o transcripciones.
5. Si un audio no se reproduce o no contiene voz evaluable, el agente no debe inventar una banda: informa al administrador para regenerar el llamado o corregir la entrega.
6. El agente envía una sola evaluación con banda por criterio, razones, resumen, fortalezas y prioridades. El servidor valida el promedio, reclama atómicamente el llamado y añade Speaking al consolidado L/R/W/S.

La página `/evaluacion-ielts/[token]` sirve para revisión visual. El endpoint `/api/ielts/delegated-reviews/[token]` permite que un agente haga `GET` para leer el contrato y `POST` para entregar JSON estructurado. El servidor valida los cuatro criterios específicos de la tarea, bandas de 0 a 9 en pasos de 0.5, justificaciones, fortalezas y prioridades.

Los reportes delegados de Task 1 y Task 2 se guardan en columnas separadas de los reportes automáticos, para conservar ambos. Al calcular Writing se prefiere el reporte delegado de cada tarea cuando existe y se mantiene el peso Task 1 × 1, Task 2 × 2. Speaking guarda su reporte y banda. Cada entrega válida recompone el consolidado con Listening, Reading, Writing y Speaking sin marcar por sí sola la aprobación humana final.

La rúbrica enlazada es oficial; la banda producida por ChatGPT, Claude u otro agente se presenta siempre como estimación pedagógica, no como resultado oficial de IELTS.

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
- La evaluación final del administrador siempre gana: al cerrarla se revocan los llamados sin usar y cualquier escritura delegada concurrente queda bloqueada.
- La tabla `ielts_delegated_review_invites` tiene RLS sin políticas para `anon` o `authenticated`; solo el servicio del servidor accede a ella.
- Las páginas y respuestas delegadas llevan `no-store`, `noindex` y `Referrer-Policy: no-referrer` para reducir exposición del token.
- Los descriptores oficiales no se copian al repositorio: se versiona su referencia y se enlaza la fuente de IELTS.
