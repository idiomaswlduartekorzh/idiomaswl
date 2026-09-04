# Listening Set 1 — opciones aprobadas aplicadas en USB

Estado: **APLICADO EN RAMA; NO DESPLEGADO**. Fecha: 4 de septiembre de 2026.

David Duarte aprobó la propuesta y confirmó explícitamente la aprobación académica de Zhanna Korzh. Ambas decisiones están vinculadas al candidato SHA-256 `6afedc554facae03c12103f7f238a0253292de9ea9d0b206fff44096e8f2ad5d` en `toefl-sectional-review-log.json`. No se modificaron el candidato ni el paquete revisado: sus etiquetas de borrador describen el snapshot previo a estas firmas, no sustituyen el registro vigente.

## Cambio y comprobación

- Aplicadas exactamente las opciones revisadas de 34 preguntas: 15 reutilizadas y 19 añadidas. Sin duplicar el banco en runtime ni importar el documento de revisión en la aplicación.
- Claves, IDs, orden, enunciados, versiones y referencias de audio conservados; 22 archivos de audio de Set 1 idénticos por hash. El simulacro completo y el recorrido seccional usan los mismos textos.
- Las otras 19 pruebas completas conservan sus hashes. Se registró una línea base antes del cambio, sustituyendo solo el texto de las opciones autorizadas al comparar.
- Pruebas: 11/11; catálogo de práctica, catálogo seccional, Listening fijo, audio release y TypeScript sin emisión: pasan. La suite `test:toefl-sectional-listening` ahora incluye la regresión de correspondencia exacta con lo aprobado.
- Navegador local: después de hidratar, recuperó el paso guardado 3/22 y mostró las cuatro nuevas opciones de esa pregunta. No se borró el progreso, no se enviaron respuestas ni se ejecutó una nueva puntuación completa.

La correcta estrictamente más larga por caracteres baja de 29/34 a 8/34. Se conserva el riesgo residual aprobado: elegir la más corta por caracteres acertaría 14/34 con desempate aleatorio. Esta implementación no certifica calidad psicométrica ni ausencia de sesgo. El criterio de cribado no se convierte en un estándar académico aprobado.

## Reconciliación y límites

Se incorporó `origin/main` `8c955322b406fcb3458b01ec5f76999740c38c98` en el merge `3fcf95b5cad993469e60c10f91f7a342a6869cd3`, sin conflictos y antes de editar las fuentes TOEFL. Respaldo previo: `archive/toefl-before-main-20260904`. Los cambios IELTS de main se conservaron; se añadió únicamente la prueba de regresión al comando compartido de `package.json`.

HR-06 sigue abierto, incluida la revisión de identidad gráfica y la muestra académica del conjunto. C09 permanece bloqueado y D9 conserva sus controles. Los otros 19 sets siguen pendientes de corrección editorial. No hubo integración a main, despliegue, build completa, instalación ni copia de dependencias. La build y las puertas restantes continúan siendo obligatorias antes del release.

El diagnóstico y comprobador de candidato originales están fijados a las fuentes previas y deben ejecutarse sobre su commit histórico `6474cd18`; no se actualizaron sus hashes para ocultar la aplicación. Para verificar el runtime actual usar `npm run test:toefl-sectional-listening` y `npm run test:toefl-fixed-listening`. Evidencia y hashes actuales: `toefl-listening-set1-options-applied-evidence.json`.

Siguiente paso: comprobar el Set 1 actualizado en el preview, sin extender su aprobación a otros sets; preparar la siguiente curaduría como artefacto independiente. No cerrar HR-06 ni liberar C09 con esta corrección.

Control final tras el commit `dec70613`: la rama de trabajo quedó limpia y respaldada (0/0 contra su remoto). Durante el trabajo, la referencia compartida `origin/main` avanzó a `96e817fc` con un ajuste IELTS de placeholders en CSS global y documentación. No se incorporó ese cambio posterior a las pruebas: la reconciliación realizada y validada sigue referida al SHA explícito anterior. Antes de la siguiente implementación o integración se debe reconciliar de nuevo; no se declara sincronía actual con main. Espacio final: USB 73 GiB libres, disco interno 18 GiB, worktree 2,2 GiB y caché existente 126 MiB.
