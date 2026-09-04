# Set 1 — continuación de QA de orden y persistencia

Estado: EN_VALIDACION. Evidencia técnica de Codex, no aprobación humana. Fecha: 4 de septiembre de 2026.

Snapshot de implementación: `f8395a0af9f17833fadaccf13832fb38ecc1bd21`. Rama USB y origin coinciden; main sigue en `96e817fcee534d70ef3039d8d2e68aa5b9a735d9`. No se modificó código de producto durante esta verificación.

## Resultados nuevos

- TypeScript completo pasó: `node --max-old-space-size=2048 node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false`, salida 0, sin diagnósticos. Esta ejecución sustituye el estado inconcluso de TypeScript del registro anterior; no sustituye la build pendiente.
- Navegador real, simulacro completo en `http://localhost:3026/examenes/toefl/practica/set-1`: se restauró el intento de QA iniciado desde introducción en el ciclo anterior. Se avanzó por los controles normales desde Reading hasta Listening, reproduciendo completos los ocho audios cortos.
- Q4: correcta visible en **D**; selección D conservada al recargar, con el mismo texto y sin repetir audio.
- Q6: correcta visible en **D**.
- Q8: correcta visible en **B**; selección B conservada al recargar, con el mismo texto y sin repetir audio.
- Consola de esa pestaña después del recorrido y las recargas: sin entradas de nivel error/warn devueltas por la herramienta.
- Práctica seccional en `http://localhost:3026/practica/toefl/listening/simulacros/practica/set-1`: el intento de QA previo se restauró en paso 4. Conserva Q4=A, Q6=C y Q8=A. Seleccionar A en Q4 y recargar conserva A seleccionada. Esto verifica la conservación del orden previo; no se presenta como prueba de un intento seccional nuevo.

## Límites y siguiente acción

### Regresión adicional

- Reading fijo: 3/3 pruebas; Build a Sentence: 9/9; catálogo seccional: 12 tareas, distribución 3/4/3/2 y rutas/ancla reales.
- Auditoría HTTP local (`scripts/check-toefl-sectional-listening-runtime.mjs`), completada a las 17:46:13 UTC: biblioteca 200; 20/20 runners con 200 y noindex/follow; 20/20 correcciones vacías con 200, denominador 34 y paridad íntegra con el banco; set-0/01/21/99 devuelven 404 y payload inválido 400. Son cantidades del material WeLearn, no claims oficiales.
- Paridad Set 1 SHA-256: `1bb5e6071789de20339876a111b4927cd21fe3babac86e23d024adb26064720b`.
- Una comprobación HTTP sintética adicional esperaba erróneamente `status=correct`; el contrato real utiliza `status=scored` y `rawPoints`. La primera ejecución falló por esa expectativa del comprobador, no por una discrepancia de total (3/34 ya coincidía). No se cambió el runtime ni el contrato para silenciarla.
- Corregida esa expectativa contra el contrato, la comprobación pasó: HTTP 200, Q4/Q6/Q8 con sus IDs canónicos intactos y un punto bruto cada una. Quedó incorporada al script de auditoría local para poder reproducirla, y el script completo volvió a pasar.
- Evidencia cruda: `docs/toefl-listening-order-runtime-qa-20260904.json`, SHA-256 `d11976e2679682fb6708b142d916eb0967c4cd80b7ed32a43402cae5a5e427cf`. Script actualizado: SHA-256 `f8e548330efbc55ecf3ca09fc199f1d39a07c41bc2378a46bc9ee4a3724fc38d`.
- Al finalizar la modificación del harness se repitieron Listening seccional (13), sesión fija (3), Listening fijo (3) y guardián de Práctica: todo pasa. Con Reading (3) y Build a Sentence (9), este ciclo completa 31 pruebas unitarias sin fallos; no incluye el ensayo HTTP descartado descrito arriba.

### Inicio seccional nuevo y cierre del hallazgo de orden

El intento seccional de QA anterior terminó por el flujo normal en resultados (28/34 con selecciones sintéticas, incluidas respuestas deliberadamente arbitrarias en los pasos 12–19). Ese número no evalúa a una persona ni acredita exactitud académica. Se reprodujeron los audios pendientes completos, sin adelantar, alterar el reloj o modificar almacenamiento desde herramientas.

Desde resultados se pulsó `Repetir Set 1` y después `Iniciar práctica`. En ese intento realmente nuevo se verificaron Q4=D, Q6=D y Q8=B. Q4=D y Q8=B se seleccionaron, se recargó la página y se conservaron tanto la letra como el texto seleccionado y la condición de audio completado. La consola de la pestaña no devolvió entradas error/warn al cierre.

El hallazgo previo de Q4=A queda acotado: no se reproduce al iniciar una sesión nueva; el intento guardado conservaba el orden anterior. La hipótesis de inicio con cliente anterior durante Fast Refresh no puede probarse retrospectivamente y no se presenta como causa demostrada. No hizo falta otro cambio de runtime. No se vació localStorage manualmente ni se tocó el intento del usuario en `127.0.0.1:3026`. La sesión de QA nueva queda en paso 8 de localhost; el simulacro completo de QA queda en su ítem 8, en su propia clave de almacenamiento.

Siguiente paso: preparar la revisión humana HR-06 usando esta implementación y sus anexos actuales, sin repetir estas verificaciones si no cambian los hashes. La identidad visual y la muestra académica completa requieren sus propias decisiones; este resultado no las autoaprueba.

No es una revisión humana de calidad de audios ni una aceptación académica. Las aprobaciones acotadas de Set 1 no cierran HR-06 ni aprueban los otros 19 sets. C09 sigue bloqueado; D9 conserva sus controles. Build completa, muestra humana HR-06, integración y publicación siguen pendientes.

## Integridad y recursos

- SHA-256 de `docs/toefl-sectional-review-log.json`: `b20fb4bdf5f897c42612ec4ce1678fc295eba67e9ec642e8b5f19b59df4782bb` (sin nuevas firmas).
- SHA-256 del proyector `src/data/toefl/listening-option-order.ts`: `f93c348bc55d1790216216c81a8debeae35d97a4e5cbe9dc262609fd1421b44a`.
- Inicio: USB 73 GiB libres, worktree 2,3 GiB, disco interno 13 GiB libres. Tras TypeScript: interno 12 GiB, USB 73 GiB, caché existente `.next` 261 MiB. No se instalaron dependencias ni se emitieron archivos TypeScript o binarios nuevos.
- Cierre: USB 73 GiB libres y worktree 2,3 GiB; interno 9,9 GiB libres. Ningún archivo ajeno eliminado. Solo quedan cambios de harness y evidencia, no de runtime ni firmas.
