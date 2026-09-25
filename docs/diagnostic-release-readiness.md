# Nivel Radar — puerta integral de salida

Estado actual: **HOLD**.

`npm run report:diagnostic-release-readiness` produce el semáforo legible y `-- --json`
produce el contrato estructurado. `npm run check:diagnostic-release-readiness` es la variante
estricta: termina con código distinto de cero mientras el examen no sea `READY_TO_ENABLE` o
`ACTIVE`.

La puerta reúne ocho dimensiones que deben pasar simultáneamente:

1. evidencia de release versionada y fechada;
2. 288 decisiones objetivas y 24 consignas de escritura aprobadas, con capacidad completa en
   las 24 celdas objetivas A1–C2;
3. 36 grabaciones privadas con hashes, transcripción y alineación revisadas por identidades
   independientes;
4. una operación de escritura verificable: revisión humana con dos revisores y SLA, o
   procesamiento externo con consentimiento específico y proveedor listo;
5. migraciones aplicadas y flujo autenticado comprobado contra la base real;
6. política de retención aprobada y borrado probado;
7. piloto aprobado, con umbrales cumplidos, revisión humana y hash del banco exacto evaluado;
8. suite diagnóstica y build de producción atados al commit limpio que se pretende liberar.

Ninguna bandera de entorno convierte un `HOLD` en release. Cuando todos los gates pasan, las
banderas solo distinguen `READY_TO_ENABLE` de `ACTIVE`.

## Evidencia que nunca se infiere

El archivo `config/diagnostic/release-evidence.json` nace cerrado. No se debe completar a partir
de una conversación, un build antiguo o la mera existencia de una migración. Cada campo exige
una comprobación externa o humana real:

- la migración se registra solo después de consultar el proyecto Supabase objetivo;
- el flujo autenticado incluye inicio, avance, reanudación, audio privado, escritura y resultado;
- retención y borrado requieren política aprobada y una prueba de eliminación;
- el informe piloto se guarda como archivo, se fija por SHA-256 y debe contener el mismo hash de
  banco objetivo y de escritura que el código actual;
- pruebas y build deben corresponder a la misma huella SHA-256 del código diagnóstico; el commit
  auditado se conserva como metadato y el árbol de trabajo debe estar limpio.

Las credenciales no forman parte del reporte. Para escritura externa solo se muestran nombres
de bloqueos, proveedor y modelo fijado. La vía humana puede liberar el diagnóstico sin configurar
Gemini ni Groq.

La propuesta `config/diagnostic/data-retention-policy.json` no está activa ni aprobada. El
endpoint autenticado `DELETE /api/diagnostic/attempts` ya permite borrar todo el dominio
diagnóstico del usuario con confirmación explícita; la función transaccional cuenta y verifica
la cascada, y solo `service_role` puede ejecutarla. La puerta de privacidad seguirá en `HOLD`
hasta aplicar la migración, probarla contra la base real y aprobar una versión de política.

## Orden seguro para cerrar la puerta

1. producir y revisar audio reservado;
2. completar las revisiones editoriales y compilar el banco piloto;
3. aplicar migraciones y verificar el recorrido autenticado;
4. seleccionar y aprobar la operación de escritura;
5. aprobar privacidad, retención y borrado;
6. ejecutar el piloto, exportar su informe y revisarlo;
7. ejecutar suite y build sobre el commit candidato limpio;
8. completar las atestaciones de `release-evidence.json` y ejecutar el check estricto;
9. activar primero el motor y luego la interfaz con monitoreo de rollback.

Dentro de la superficie ejecutable auditada, la huella de calidad excluye
`release-evidence.json`, evitando el ciclo en el que firmar el recibo cambiaría la misma huella
que se intenta acreditar. Incluye implementación, migraciones, configuración, scripts, pruebas
y `package.json` relacionados con el diagnóstico.

El informe piloto contiene `bankSnapshot.sha256`, calculado sobre ítems, claves, racionales,
fuentes y consignas. Cualquier cambio posterior invalida automáticamente la evidencia del piloto.
