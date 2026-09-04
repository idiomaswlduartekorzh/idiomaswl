# HR-06 — Pista involuntaria por longitud de respuesta

Estado: hallazgo confirmado; corrección y revisión humana pendientes. No es una aprobación.

Fecha de auditoría: 4 de septiembre de 2026. Implementación observada: `2ad1ce2fe31286b8b1c9d09212999c7de0f82cdc` en la rama USB. No se verificó producción.

## Resultado

El usuario señaló que la respuesta correcta se reconoce por ser la más larga. La auditoría confirma una pista fuerte en el banco normalizado que alimenta Listening:

- Set 1: la correcta es estrictamente la más larga en las primeras cinco preguntas, tanto por palabras como por caracteres.
- Set 1 completo: 29/34 (85,3 %) por caracteres, sin empates.
- Todos los sets: 552/680 (81,2 %) por caracteres, sin empates; otras 16 correctas empatan en el máximo.
- Por palabras: 513/680 (75,4 %) estrictamente más largas; otras 84 empatan.
- Elegir la opción con más caracteres y desempatar por la primera opción acertaría 560/680 (82,4 %), frente a un 25 % esperado al elegir uniformemente entre cuatro opciones. Es un cálculo sobre claves, no un resultado observado en alumnos ni un score oficial.
- Preguntas reutilizadas: 283/300 (94,3 %) estrictamente más largas por caracteres. Preguntas añadidas: 269/380 (70,8 %).

Gravedad: alta. Confianza: alta para el patrón textual; esta comprobación no certifica que cada clave sea académicamente correcta ni mide el ancho visual en pantalla.

## Por qué no lo detectó el control previo

`scripts/check-toefl-fixed-listening.mjs` pasó sin modificaciones durante esta auditoría. Solo cubre 19 preguntas nuevas por set; excluye las 15 reutilizadas. Su condición detecta una correcta con al menos el doble de palabras que la media de distractores y una diferencia de al menos tres palabras, pero no la frecuencia sistemática de «la más larga».

El diagnóstico usa apóstrofos rectos y curvos para contar palabras; el guardián solo reconoce rectos. El campo exploratorio `largeAdvantage` no debe presentarse como una ejecución idéntica del guardián. La conclusión principal por caracteres no depende de esa diferencia.

## Acción sobre el banco: propuesta, no ejecutada

Revisar la redacción en la fuente compartida, equilibrando detalle y plausibilidad de las cuatro opciones sin añadir relleno ni cambiar arbitrariamente las claves. Cambiar colores o barajar A–D no elimina esta pista. Extender la auditoría al recorrido completo y a cada familia de tareas; acordar los criterios de aceptación con revisión académica. Revalidar las aprobaciones afectadas tras cualquier cambio de contenido.

Este hallazgo impide recomendar el cierre de HR-06. La revisión de identidad visual WeLearn también sigue pendiente. C09 conserva su bloqueo. No se alteraron preguntas, claves, audios, controles, producción ni el registro histórico de aprobaciones.

## Evidencia reproducible

Ejecutar desde el worktree USB:

```bash
node --experimental-strip-types --no-warnings --experimental-loader ./tests/ts-paths-loader.mjs docs/toefl-listening-length-audit-draft.mjs
```

La salida guardada en `docs/toefl-listening-length-audit-draft.json` incluye denominadores, cortes por set/origen/familia, diez filas de inspección sin textos ni claves y hashes SHA-256 de las fuentes. Se comprobaron 680 IDs únicos, 34 preguntas por set y cuatro opciones con clave válida por pregunta.

No se ejecutó una build: no hubo cambios al producto. Quedan pendientes la corrección del banco, revisión académica y nuevas pruebas.

## Continuación — borrador de corrección, 2026-09-04

Tras «continua» se prepararon nuevas opciones para las 34 preguntas del Set 1, sin importarlas en la aplicación. Comparación original/propuesta, claves y enlaces a los audios en [paquete académico](toefl-listening-set1-options-review.md). Estado: **BORRADOR**, no aprobado por Zhanna ni por David. Las aprobaciones históricas no se reutilizan para estas redacciones.

La correcta estrictamente más larga pasa de 29 a 8 por caracteres (de 29 a 5 por palabras). Elegir más caracteres con desempate aleatorio pasa de 85,3% a 28,4%. Elegir menos caracteres aún acierta 41,2%; los patrones de grupos pequeños permanecen visibles. No se certifica ausencia de sesgos ni calidad psicométrica. Los otros 19 sets siguen pendientes.

El detector propuesto cubre largos/cortos, palabras/caracteres, empates aleatorios y por primera posición, los 680 ítems completos y cortes por set/familia. Incluye pruebas sintéticas de sesgo inverso, empates, balance y entradas inválidas. No se reemplazó el control vigente ni se bajaron umbrales. El 45%/n≥16 es una propuesta de cribado, no estándar ETS ni gate aprobado.

Validaciones: comparaciones de fuente contra los 32 hashes originales, IDs y orden de las 34 preguntas, cuatro opciones únicas por pregunta, conservación de claves/IDs/enunciados/audio en proyección, autopruebas del detector, `check:practica-catalog` y guardián Listening vigente: pasan. No se ejecutaron build ni QA de interfaz porque no cambió el runtime. ASR local de los primeros cinco audios: apoyo de curaduría, no escucha/revisión humana.

Reproducir: `node --experimental-strip-types --no-warnings --experimental-loader ./tests/ts-paths-loader.mjs docs/toefl-listening-set1-candidate-check.mjs`. Añadir `--review` para regenerar la comparación en Markdown. Evidencia: `toefl-listening-set1-candidate-evidence.json`; candidato: `toefl-listening-set1-options-candidate.json`.

Rama USB: `codex/toefl-sectional-seo-harness-20260831`, base inspeccionada `2ad1ce2fe31286b8b1c9d09212999c7de0f82cdc`; origin/main observado `8c955322b406fcb3458b01ec5f76999740c38c98`, dos commits IELTS por reconciliar antes de implementar (D10). No se tocaron archivos compartidos de runtime, remotos, producción ni aprobaciones; sin migraciones ni variables nuevas. HR-06 y revisión gráfica siguen pendientes, C09 bloqueado, D9 sin rebaja de controles.

Espacio al cierre de validaciones: USB 73 GiB libres, worktree 2,2 GiB; disco interno 18 GiB libres. `.next` existente 123 MiB (preview activo); no se eliminó ni reinició la sesión del usuario. Sin instalaciones, copias de node_modules, modelos descargados ni nuevos binarios. Los nuevos artefactos son texto.

Siguiente acción: Zhanna revisa las 34 parejas y audios, especialmente ambigüedad de distractores y sesgo residual hacia opciones cortas; registrar decisión por ID. Después, reconciliar main, revisar feedback y aplicar únicamente redacciones aprobadas, revalidando el contenido afectado. No cerrar HR-06 con este diagnóstico.

Limitación de entrega: se intentó preparar el informe HTML con el empaquetador canónico de `build-report`. Tanto su validador como el empaquetador rechazaron la fuente JavaScript al exigir SQL para la gráfica. No se inventó SQL, no se cambió el validador y no se entregó un informe visual como si hubiese pasado QA. Se conserva la evidencia diagnóstica original. La gráfica prevista comparaba los 20 sets en orden numérico, con el número de correctas estrictamente más largas por caracteres y denominador fijo 34.
