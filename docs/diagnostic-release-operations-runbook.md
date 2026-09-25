# Nivel Radar — despliegue gradual y reversión

Este procedimiento controla únicamente el diagnóstico adaptativo en producción. No sustituye la
puerta integral, el certificado de release, las aprobaciones humanas ni el piloto. Una bandera o
un porcentaje nunca convierte un release en elegible.

## Controles y propiedad

Producción necesita, además de `DIAGNOSTIC_ADAPTIVE_ENABLED=true` y un certificado válido:

- `DIAGNOSTIC_ACCESS_MODE=production`;
- `DIAGNOSTIC_PRODUCTION_ROLLOUT_ID`, identificador estable del rollout, sin datos personales;
- `DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT`, entero canónico entre `0` y `100`;
- `DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET`, secreto aleatorio de al menos 32 bytes, conservado solo
  en el gestor de secretos del despliegue.

La asignación usa HMAC-SHA-256 sobre `rolloutId + usuario autenticado`. Es estable para el mismo
rollout y monótona: subir el porcentaje conserva a las personas ya incluidas. El navegador no
recibe identificador, bucket ni secreto. Un valor ausente o inválido falla cerrado. El modo
`pilot` conserva su lista privada de inscripciones y no usa porcentajes de producción.

Antes de cada cambio, Operaciones ejecuta en el entorno objetivo:

```bash
pnpm run check:diagnostic-production-rollout
pnpm run report:diagnostic-release-readiness -- --json
pnpm run check:diagnostic-release-certificate
```

El primer reporte puede conservarse en el registro de cambio: no contiene el secreto. El segundo
debe indicar `READY_TO_ENABLE` antes de la activación inicial, o `ACTIVE` después de activarla. El
certificado, la huella de fuente, el hash del banco y el commit desplegado deben coincidir.

Cada cambio de porcentaje exige una entrada de decisión con fecha UTC, operador, release ID,
commit, porcentaje anterior/nuevo, periodo observado, métricas revisadas y decisión. Nunca se
registran UUID, correos, respuestas, claves de ítem ni texto de escritura.

Las rutas de inicio, reanudación, envío, borrado y audio emiten JSON con
`schemaVersion=diagnostic-operational-log-v1`. El contrato solo permite ruta plantillada, método,
estado HTTP, resultado y duración; no acepta request, URL concreta, parámetros, errores crudos ni
payload. Antes de abrir el 1%, Operaciones debe comprobar en los Runtime Logs del despliegue que
los eventos `request.started` y `request.completed` llegan para las cinco superficies. Si existe
un Drain o proveedor de alertas, también se verifica su recepción; si no existe, se registra el
uso explícito del visor/CLI de Vercel como cobertura temporal.

Después de cada despliegue y antes de subir un peldaño se revisa al menos la última hora de logs
de error, filtrando `service=nivel-radar`. Un `request.failed`, cualquier estado 5xx o ausencia de
logs esperados detiene el avance hasta investigar. Esta comprobación real sigue siendo externa:
la presencia del código de instrumentación no prueba que el despliegue, Drain o alerta funcione.

## Secuencia de activación

1. Desplegar el commit y certificado verificados con motor encendido, interfaz adaptativa apagada
   y porcentaje `0`. Mantener el identificador y secreto sin cambios durante todo el rollout.
2. Ejecutar una prueba privada autorizada contra el despliegue exacto. Confirmar inicio,
   reanudación, audio privado, envío, revisión de escritura, resultado y borrado.
3. Encender la interfaz adaptativa y pasar por `1%`, `5%`, `25%`, `50%` y `100%`. No se omiten
   peldaños. Cada avance requiere una ventana de observación suficiente y aprobación registrada
   de Operaciones y Producto; cambios que afecten interpretación o medición también requieren al
   responsable de Medición.
4. En cada peldaño revisar, como mínimo: errores de inicio/persistencia, reanudaciones, abandono y
   finalización por ruta, cola y SLA de escritura, fallos de audio, distribución de rutas/niveles,
   evidencia faltante, incidencias de soporte y alertas de privacidad o exposición de contenido.
5. Mantener el porcentaje cuando falte evidencia para decidir. No completar cohortes manualmente
   ni cambiar el secreto para obtener otra muestra.

Se detiene el avance ante cualquier desajuste de certificado/fuente/banco, incidente de
autorización o privacidad, exposición de contenido reservado, error de scoring/routing, pérdida
o corrupción de evidencia, degradación operativa no explicada o incumplimiento del SLA de
escritura. Un umbral cuantitativo de promoción solo puede provenir del plan de monitoreo aprobado;
no se inventa durante el despliegue.

## Pausa segura y reversión

La primera acción es fijar `DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT=0`. Esto impide nuevos intentos
sin expulsar a quienes ya empezaron. Después:

1. apagar `DIAGNOSTIC_ADAPTIVE_UI_ENABLED` para retirar el punto de entrada público;
2. mantener temporalmente `DIAGNOSTIC_ADAPTIVE_ENABLED=true` para que los intentos existentes
   puedan reanudar y enviar etapas, salvo que hacerlo agrave un incidente de seguridad o
   integridad;
3. inventariar solo conteos agregados de intentos activos y decidir de forma registrada entre
   drenarlos o cerrarlos conforme a privacidad y soporte; nunca borrar evidencia como rollback;
4. redesplegar el último commit **verificado y recuperable** junto con su certificado, release ID,
   huella de fuente y hash de banco correspondientes; no mezclar un certificado con otro commit;
5. repetir los tres comandos de comprobación y una prueba privada autorizada;
6. reabrir desde `0%` siguiendo toda la secuencia de activación. No restaurar directamente el
   porcentaje anterior.

Si el incidente hace inseguro continuar intentos activos, Operaciones puede apagar el motor, pero
debe registrar el motivo, preservar los datos según la política aprobada y comunicar que los
intentos quedan interrumpidos. Desactivar el motor no reemplaza la corrección ni autoriza borrar
datos.

## Evidencia mínima de cierre

El registro final contiene: incidente o cambio que motivó la acción, línea temporal UTC,
responsables, porcentajes, release/commit/certificado antes y después, comprobaciones ejecutadas,
conteos agregados de intentos afectados, decisión sobre intentos activos y criterio explícito para
reanudar o permanecer en `0%`. Cualquier cambio a este procedimiento, al algoritmo o a su
enforcement invalida el snapshot de gobierno de entrega y exige nuevas revisiones.
