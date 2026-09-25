# Nivel Radar — puerta integral de salida

Estado actual: **HOLD**.

Último corte reproducible: **1/8 gates** y **19 bloqueos** sobre el commit técnico
`8272e872`; **267/267 pruebas**, TypeScript, el build de **2.564 páginas estáticas** y **4/4
historias E2E** pasaron. La huella de fuente es
`ec61e91a9f409bbdf2cbcc4979f23d1e6abd80a54285192bfbae42556919589e` y el recibo privado quedó
fijado por `7efe396a68bbcb1b3243e775bd32acffcd593051ca1c67856e09b4fd3a3c4b92`.
El único gate aprobado es calidad mecánica; gobierno volvió correctamente a `HOLD` porque la
política de entrega todavía no tiene las dos revisiones humanas requeridas.

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
7. piloto aprobado, con cobertura de rutas y niveles, psicometría adaptativa, estabilidad,
   equidad/DIF, standard setting, revisión humana y hash del banco exacto evaluado;
8. suite diagnóstica, TypeScript, build y E2E adaptativo sobre servidor de producción atados al
   commit limpio que se pretende liberar.

Ninguna bandera de entorno convierte un `HOLD` en release. Cuando todos los gates pasan, las
banderas solo distinguen `READY_TO_ENABLE` de `ACTIVE`.

El inicio exige además `DIAGNOSTIC_ACCESS_MODE`. En `pilot`, solo acepta usuarios incluidos en
la tabla privada de cohortes con la versión exacta de consentimiento piloto. En `production`,
exige un certificado `ready`, `DIAGNOSTIC_RELEASE_ID`, la huella
`DIAGNOSTIC_RELEASE_SOURCE_SHA256` y el hash del banco actual. El certificado comprometido nace
en `hold` y el prebuild rechaza certificados malformados o viejos.

La entrega queda además ligada a `config/diagnostic/delivery-policy.json`. La propuesta v1
permite retests programados en piloto, pero en producción fija un único intento activo, 90 días
entre intentos completados y 180 días de vigencia orientativa del resultado. Ambos canales
excluyen durante 365 días los ítems y consignas ya entregados al mismo usuario e idioma. La
ventana aplicada se copia al intento, la creación aplica concurrencia y cooldown dentro de una
transacción con bloqueo por usuario, y una historia demasiado grande o un banco sin reemplazos
falla cerrado. Estos números siguen siendo una propuesta: producción rechaza la política hasta
que liderazgo académico y producto aprueben el snapshot exacto.

“Programado” se aplica en la base, no sólo en el texto: después de un intento piloto completado,
otro intento exige una autorización administrativa para una inscripción consentida. La
autorización fija inicio, fin, entre uno y tres cupos, una referencia opaca al protocolo y una
razón auditable. Un trigger consume un cupo en la misma transacción que inserta el intento; una
ventana ausente, futura, vencida o agotada produce `PILOT_RETEST_NOT_AUTHORIZED`. Revocar o cerrar
la inscripción elimina cualquier cupo restante. Navegador y roles públicos no pueden leer ni
crear estas autorizaciones.

## Evidencia que nunca se infiere

El archivo `config/diagnostic/release-evidence.json` nace cerrado. No se debe completar a partir
de una conversación, un build antiguo o la mera existencia de una migración. Cada campo exige
una comprobación externa o humana real:

- la migración se registra solo después de consultar el proyecto Supabase objetivo;
- el flujo autenticado incluye inicio, avance, reanudación, audio privado, escritura y resultado;
- retención y borrado requieren política aprobada y una prueba de eliminación;
- el informe piloto se guarda como archivo, se fija por SHA-256 y debe contener el mismo hash de
  banco objetivo y de escritura que el código actual;
- pruebas, build y E2E deben corresponder a la misma huella SHA-256 del código diagnóstico; el
  commit auditado se conserva como metadato y el árbol de trabajo debe estar limpio.

Las credenciales no forman parte del reporte. Para escritura externa solo se muestran nombres
de bloqueos, proveedor y modelo fijado. La vía humana puede liberar el diagnóstico sin configurar
Gemini ni Groq.

### Reutilización segura para el control de audio

El control previo ya no reproduce un beep sintético. Usa
`/audio/reading/en-a1-my-morning-at-the-cafe.mp3`, un activo público heredado cuya huella
SHA-256 queda fijada en `config/diagnostic/audio-check.json`. La pantalla lo identifica como
muestra no puntuada, exige que la persona inicie la reproducción y confirme que la oyó con
claridad. El manifiesto declara `scored: false` y `assessmentBankEligible: false`; las pruebas
comprueban además que ni su ruta ni su hash aparecen en los bancos objetivo o de escritura. Así
se recicla audio existente para familiarización y diagnóstico del dispositivo sin presentarlo
como evidencia lingüística reservada.

### Piloto de audio A1 con gasto acotado

Antes de producir las 36 grabaciones existe un preset de escucha deliberadamente pequeño:

```bash
npm run generate:diagnostic-listening-audio -- --pilot-a1
```

Es un dry run sin red ni lectura de secretos. Selecciona exactamente
`en-a1-listening-original-01`, `02` y `04`: dos mensajes monológicos y una conversación que
ejercitan las cuatro voces propuestas. La factura inmutable actual es **3 archivos, 6 segmentos,
712 caracteres y débito máximo estimado de 1.424 créditos**, ligada al paquete
`98708152b86de8a5481afbb8e004a5a64d5f31711cc6cfbac41f4ce4e566f9d2`.

La ruta `--generate` exige simultáneamente el hash del paquete, la frase de autorización ligada a
ese hash, un máximo exacto de 712 caracteres, un techo exacto de 1.424 créditos, una reserva de
saldo, semilla y las cuatro voces marcadas `approved_by_owner`. Si el contenido o la factura
cambian, la autorización deja de ser válida. La salida queda bajo `.diagnostic-private/` y no
puede contar como evidencia de escucha hasta dos revisiones humanas independientes de
transcripción y alineación. Actualmente las cuatro voces siguen como propuestas y no se ha hecho
ninguna llamada a ElevenLabs.

Para no confundir una cata con el casting definitivo, la aprobación del piloto tiene su propio
recibo y nunca cambia `profiles.*.approval`:

```bash
npm run scaffold:diagnostic-a1-audio-pilot-approval
# el dueño revisa las cuatro voces y completa el recibo privado
npm run record:diagnostic-a1-audio-pilot-approval
```

El paquete nace sin decisión ni identidad. Aprobarlo exige confirmar las voces, los tres archivos,
el techo de 1.424 créditos, staging privado y ausencia de autorización para publicar. El
registrador es dry run, exige checkout limpio, vuelve a calcular la propuesta y solo escribe con
`--write`, identidad de operador y confirmación ligada al hash del recibo. Cambiar una voz, guion,
modelo, formato, política de ensamblaje o costo invalida la aprobación limitada.

### Inspección segura de Supabase

`npm run inspect:diagnostic-supabase` es deliberadamente un dry run. Con `-- --execute` y las
credenciales cargadas únicamente en el entorno, comprueba mediante solicitudes sin cuerpo:

- las columnas que prueban la migración diagnóstica más reciente;
- el acceso de servidor y la denegación directa para clave pública;
- los RPC de servidor con entradas inválidas que no escriben datos;
- el bucket `diagnostic-audio`, su límite, MIME y condición privada;
- opcionalmente, la denegación directa con un JWT de usuario de prueba en
  `DIAGNOSTIC_VERIFY_USER_ACCESS_TOKEN`.

Admite las claves nuevas `SUPABASE_SECRET_KEY` y
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, con fallback a las variables legacy. Las claves nuevas
solo viajan en `apikey`; nunca se presentan como JWT. Un recibo privado puede conservarse con:

```bash
npm run inspect:diagnostic-supabase -- --execute \
  --output=.diagnostic-private/evidence/supabase-inspection.json
```

El archivo contiene estados y códigos, pero no filas, UUID, correos ni credenciales. Incluso un
`PASS` mantiene `authenticatedApplicationFlowVerified: false`: esta inspección valida esquema,
grants, RPC y Storage, pero no sustituye la prueba de inicio, avance, reanudación, audio,
escritura y resultado a través de la aplicación.

Ese recorrido completo se ejecuta por separado con `npm run verify:diagnostic-auth-flow`. El
comando es dry run por defecto y requiere una cuenta fixture dedicada, cookies de usuario y
administrador cargadas en variables de entorno, además de una confirmación destructiva ligada al
UUID exacto:

Antes del recorrido, el runner consulta una ruta administrativa `no-store` y exige que el
despliegue declare la misma huella de fuente, hash del banco y commit que el checkout local limpio.
También comprueba que el modo `pilot`/`production` y el proyecto Supabase coincidan. Para un
despliegue piloto se deben fijar `DIAGNOSTIC_RELEASE_SOURCE_SHA256` y
`DIAGNOSTIC_RELEASE_COMMIT_SHA`; en Vercel, `VERCEL_GIT_COMMIT_SHA` puede sustituir la segunda.
La huella de fuente esperada aparece en `npm run report:diagnostic-release-readiness -- --json`.

```bash
export DIAGNOSTIC_AUTH_FLOW_CONFIRM="DELETE_ALL_DIAGNOSTIC_DATA_FOR_DEDICATED_FIXTURE:$DIAGNOSTIC_VERIFY_USER_ID"
npm run verify:diagnostic-auth-flow -- --execute \
  --output=.diagnostic-private/evidence/authenticated-flow.json
```

El runner no conoce claves de respuesta: entrega omisiones válidas, comprueba reanudación y audio
privado, completa la consigna fixture, usa la revisión exclusivamente humana, exige el perfil de
cinco habilidades y borra inscripción, intento y evidencia al final. También intenta el borrado
si el recorrido falla. Por eso jamás debe apuntarse a una cuenta real ni compartida.

Los dos recibos deben producirse sobre el mismo proyecto y dentro de una ventana máxima de 24
horas. Se validan y se registran primero en modo seco:

```bash
npm run record:diagnostic-live-evidence -- \
  --inspection=.diagnostic-private/evidence/supabase-inspection.json \
  --auth-flow=.diagnostic-private/evidence/authenticated-flow.json
```

El modo seco imprime una confirmación ligada a los dos SHA-256. Solo un operador identificado
puede repetir el comando con `--write`, `--attested-by=<identidad>` y esa confirmación exacta. El
registrador actualiza exclusivamente la evidencia de migración, recorrido autenticado y borrado;
no aprueba retención, escritura, contenido ni piloto. La puerta vuelve a comparar el hash de
fuente y de banco, y rechaza recibos de otro despliegue, proyecto o antigüedad.

### Evidencia técnica reproducible

La suite, TypeScript, el build y el E2E no se atestiguan a mano. Sobre un commit limpio se
ejecutan y se guardan en un recibo privado ligado a la huella de fuente:

```bash
npm run verify:diagnostic-release-quality -- --execute \
  --output=.diagnostic-private/evidence/release-quality.json
npm run record:diagnostic-quality-evidence -- \
  --receipt=.diagnostic-private/evidence/release-quality.json
```

El segundo comando es primero un dry run. Imprime la confirmación SHA-256 que debe repetirse con
`--write`, `--attested-by=<identidad-del-verificador>` y `--confirm=<valor-exacto>`. El recibo
solo es válido durante 24 horas, registra el número de pruebas unitarias, historias de navegador
y páginas estáticas, y se rechaza si el árbol se ensucia o cambia la huella durante la ejecución.
El build activa la interfaz adaptativa únicamente en el entorno efímero de verificación; después
arranca `next start` en un puerto local y Playwright cubre desktop, móvil, teclado, recarga,
audio, omisión, error/reintento, escritura, resultado con incertidumbre y cierre. Las APIs se
simulan en el navegador, por lo que esta evidencia prueba el contrato UI pero no sustituye el
recorrido autenticado contra Supabase real. Registrar esta evidencia no puede aprobar contenido,
audio, escritura, retención ni piloto.

Cada ejecución explícita elimina primero únicamente el directorio generado e ignorado `.next`.
Así el build de release no hereda un caché incremental local que pueda crecer sin límite y la
evidencia siempre corresponde a una compilación limpia.

Para que esta evidencia sea repetible en la máquina local después de la suite completa, el build
de verificación limita su concurrencia a dos CPU, desactiva compilaciones paralelas y activa las
optimizaciones de memoria de webpack. Esa configuración solo existe con
`DIAGNOSTIC_QUALITY_BUILD=true`, que fija el propio runner; no altera builds ordinarios ni el
runtime. `next.config.ts` forma parte de la huella diagnóstica, por lo que cambiar esta estrategia
invalida el recibo.

### Revisión humana de gobierno

Las decisiones que no son mecánicas se preparan como siete revisiones independientes y nacen
vacías, sin modo de escritura ni aprobación preseleccionados:

```bash
npm run scaffold:diagnostic-governance-review
# muestra únicamente conteos y estado por rol; INCOMPLETE termina con código 1:
npm run report:diagnostic-governance-review-progress
# después de completar los siete archivos de forma independiente:
npm run compile:diagnostic-governance-review
# después de obtener APPROVED, validar el cambio sin escribir:
npm run record:diagnostic-governance-approvals
```

El paquete privado liga cada revisión a una huella exacta: operación de escritura, política de
retención, umbrales del piloto o política de entrega. Escritura exige acuerdo independiente de
liderazgo académico y operaciones; retención exige privacidad; los criterios del piloto exigen
liderazgo académico y medición; entrega exige liderazgo académico y producto. Aprobar la ruta
humana requiere al menos dos referencias verificables de revisores y un SLA máximo de 72 horas.
La ruta externa exige referencias separadas para consentimiento y revisión de proveedor. Un
cambio de documento invalida automáticamente sus recibos.

La revisión de entrega no queda ligada únicamente a los números del JSON. Su snapshot incluye
la política sin metadatos de aprobación, la migración atómica, validación y selección de
servidor, cálculo de vigencia y comunicación en pantalla/PDF. Academic debe confirmar diseño de
retest, cooldown, capacidad bajo la ventana sin repetición, carácter no certificador y valores;
Product debe confirmar intento activo, elegibilidad, ausencia de override, soporte y comunicación
de caducidad. Un solo check distinto de `true` impide aprobar. El reporte de progreso nunca
imprime identidades, comentarios ni contenido de los documentos privados.

Los paquetes son preparación, no aprobación. El compilador vuelve a calcular las cuatro huellas,
exige exactamente los siete roles, impide identidades duplicadas dentro de cada tema y comprueba
que los dos revisores de escritura aprobaron el mismo modelo operativo. El manifiesto y los hashes
de cada recibo permanecen bajo `.diagnostic-private/`. Mientras ese proceso no termine con
`APPROVED`, ningún gate cambia de estado.

El registrador también es dry run por defecto. Solo acepta el manifiesto y los siete archivos
originales intactos, recalcula las huellas vigentes y exige una confirmación ligada al hash del
manifiesto, `--write` y `--applied-by=<operador>`. Al aplicarse, puede registrar únicamente el
modo de escritura aprobado, las políticas exactas de retención y entrega y el estado aprobado de
los criterios del piloto. No marca el borrado como probado, no aprueba el banco y no valida
resultados del piloto. Cambiar cualquier regla o umbral después de la aprobación invalida su
snapshot aunque los metadatos de aprobación cambien.

### Aprobación editorial del banco

Los paquetes de revisión se generan por nivel, habilidad, tipo o rol y permanecen privados:

```bash
npm run scaffold:diagnostic-bank-review -- --level=B1 --skill=reading
# cada persona completa su archivo y lo renombra a *.completed.json
npm run report:diagnostic-bank-review-progress
npm run record:diagnostic-bank-approvals -- \
  --review-root=.diagnostic-private/review-packets/english-bank-draft-1-batches \
  --manifest-version=english-diagnostic-approvals-v2
# alternativamente, para un lote aislado:
npm run record:diagnostic-bank-approvals -- \
  .diagnostic-private/review-packets/.../linguistic-reviewer.completed.json \
  .diagnostic-private/review-packets/.../assessment-reviewer.completed.json \
  --manifest-version=english-diagnostic-approvals-v2
```

El registrador ya no escribe por defecto. Exige recibos `*.completed.json` dentro de
`.diagnostic-private/`, checkout limpio, roles e identidades independientes, listas completas y
contenido con versión/hash vigente. Compila una propuesta estable que fija el hash de cada recibo
y la unión exacta con aprobaciones anteriores. Solo una segunda ejecución con `--write`, operador
identificado y la confirmación ligada al hash de la propuesta y del conjunto de recibos actualiza
el manifiesto de forma atómica. Plantillas, decisiones incompletas, cambios solicitados, rutas
externas o modificaciones posteriores fallan antes de escribir.

El reporte de progreso recorre únicamente el paquete privado por lotes y emite datos agregados:
estado por nivel, habilidad y rol, cobertura de plantillas y recibos, cambios solicitados y número
de firmas de entrada. Nunca imprime contenido, claves, comentarios ni identidades. Falla cerrado
ante directorios o roles inesperados, JSON inválido, duplicados, conjuntos parciales, versiones o
hashes obsoletos y una misma identidad usada para los dos roles. Una plantilla nunca cuenta como
recibo completado. El estado actual es `REVIEW_IN_PROGRESS`: **48/48 plantillas vigentes, 0/48
recibos completados, 0/24 lotes listos y 0 artefactos inválidos**. Escucha aparece por separado
como `NOT_BATCHABLE_RECORDED_CANDIDATES_MISSING`, porque aún no hay grabaciones materializadas
que puedan someterse a su revisión adicional de alineación.

Cuando los 24 lotes estén completos, `--review-root` ejecuta primero el auditor en modo estricto
y solo entonces incorpora los 48 recibos en una propuesta única. Las referencias conservan su
ruta privada relativa —para distinguir nombres repetidos entre lotes— y rechazan rutas absolutas,
traversal, separadores de otra plataforma y enlaces que escapen de `.diagnostic-private/`. El
registrador continúa siendo dry run: todavía exige checkout limpio, una versión nueva, la
confirmación ligada a propuesta y conjunto de recibos, `--write` y operador estable antes de
actualizar atómicamente el manifiesto.

### Captura y validación del piloto

Los criterios v2 son deliberadamente más estrictos que el primer informe. Además de volumen,
finalización, comportamiento de ítems, escritura y referencia independiente, exigen:

- participantes completados en cada una de las tres rutas MST y referencias en A1–C2;
- facilidad dentro del rango aprobado y cada distractor funcionando con muestra suficiente;
- fiabilidad adaptativa por lectura, escucha, gramática y vocabulario;
- consistencia de la decisión de nivel y estabilidad por las cinco habilidades;
- análisis DIF agregado con grupos suficientemente representados y base lícita documentada;
- standard setting humano de los cinco límites MCER.

La evidencia especializada vive en un contrato separado y agregado,
`config/diagnostic/pilot-measurement-evidence.json`. Nace `not-collected` y no incluye etiquetas
de grupo, participantes ni respuestas. Debe coincidir exactamente con la versión de criterios y
`bankSnapshot.sha256`; de lo contrario, fiabilidad, consistencia, estabilidad, equidad y cortes
permanecen en `false`. Los umbrales del archivo de criterios son provisionales hasta revisión
académica y de medición: las fuentes profesionales justifican las dimensiones de evidencia, no
un número universal para todos los usos.

Ese contrato tampoco se completa editándolo libremente. El workflow privado prepara primero una
plantilla, valida que solo contenga agregados y después separa tres responsabilidades:

```bash
npm run scaffold:diagnostic-pilot-measurement
# completar .diagnostic-private/pilot/measurement/candidate.json con el análisis real
npm run scaffold:diagnostic-pilot-measurement -- --prepare-reviews
# completar por separado academic-lead.json, measurement-lead.json y privacy-lead.json
npm run compile:diagnostic-pilot-measurement
npm run record:diagnostic-pilot-measurement
```

El candidato debe declarar SHA-256 del dataset agregado y del código de análisis, un identificador
de ejecución, la versión exacta de criterios y el hash del banco. El validador usa una lista
cerrada de campos: rechaza filas, identificadores o extensiones arbitrarias, muestras bajo el
umbral, habilidades ausentes, cortes MCER incompletos o DIF sin referencia de base lícita. La
revisión académica cubre constructo y standard setting; medición cubre fiabilidad, consistencia,
estabilidad, DIF y suficiencia muestral; privacidad cubre base lícita, agregación, celdas mínimas
y riesgo de reidentificación. Las tres identidades deben ser distintas.

El compilador fija los tres recibos privados por hash. El registrador vuelve a validarlos y es
dry run por defecto; solo escribe el agregado aprobado con checkout limpio, `--write`, operador
estable y una confirmación ligada simultáneamente al manifiesto y al candidato. El endpoint del
informe exige que esa aprobación y su procedencia sean válidas, pero expone únicamente que están
ligadas, nunca identidades, nombres de grupos ni materiales privados.

El informe del piloto no se descarga manualmente ni se enlaza solo por nombre. Sobre un checkout
limpio, el capturador consulta primero la identidad administrativa `no-store` del despliegue y
exige coincidencia exacta de huella de fuente, hash del banco, commit, modo `pilot` y proyecto
Supabase. Después solicita únicamente el informe agregado y guarda tanto el reporte como su
recibo bajo `.diagnostic-private/`:

```bash
npm run capture:diagnostic-pilot-report -- --execute \
  --since=2026-09-01T00:00:00.000Z
```

La cookie administrativa se carga en `DIAGNOSTIC_VERIFY_ADMIN_COOKIE` y nunca se escribe ni se
imprime; el origen HTTPS se toma de `DIAGNOSTIC_VERIFY_APP_URL`. La captura rechaza cualquier
campo de participante, respuesta enviada o texto de escritura. También rechaza un informe de
otro banco, código o commit. Un resultado `HOLD` puede conservarse para análisis, pero no puede
entrar al circuito de aprobación.

Solo cuando el informe dice `ELIGIBLE_FOR_VALIDATION_REVIEW` y todos sus gates pasan se crean dos
paquetes vacíos e independientes:

```bash
npm run scaffold:diagnostic-pilot-validation
# liderazgo académico y medición completan sus archivos por separado
npm run compile:diagnostic-pilot-validation
npm run record:diagnostic-pilot-validation
```

Ambos revisores deben usar identidades distintas y confirmar muestra/finalización, rutas y
niveles, calidad de ítems, acuerdo de escritura, referencia independiente, vínculo de la
evidencia de medición, fiabilidad, consistencia, estabilidad, equidad/DIF, standard setting y
limitaciones de uso. El compilador fija
los hashes de los dos recibos; el registrador vuelve a leerlos y es dry run por defecto. Para
aplicar exige `--write`, `--applied-by=<operador>` y la confirmación que liga simultáneamente el
manifiesto y el informe. La puerta de salida relee los tres archivos privados y recalcula el hash
del manifiesto: un cambio de reporte, banco, código, revisión o identidad devuelve el piloto a
`HOLD`.

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
7. ejecutar suite, build y E2E sobre el commit candidato limpio;
8. completar las atestaciones de `release-evidence.json` y ejecutar el check estricto;
9. emitir el certificado con `--issue-certificate`, fijar su release ID y huella en el entorno;
10. activar primero el motor y luego la interfaz con monitoreo de rollback.

Dentro de la superficie ejecutable auditada, la huella de calidad excluye
`release-evidence.json`, evitando el ciclo en el que firmar el recibo cambiaría la misma huella
que se intenta acreditar. Incluye implementación, migraciones, configuración, scripts, pruebas
y `package.json` relacionados con el diagnóstico.

El informe piloto contiene `bankSnapshot.sha256`, calculado sobre ítems, claves, racionales,
fuentes y consignas. Cualquier cambio posterior invalida automáticamente la evidencia del piloto.

El panel administrativo dispone además de una proyección operativa del mismo informe. Se carga
solo bajo demanda y resume finalización, duración, estados, rutas, gates, escritura, referencia,
evidencia psicométrica y conteos de alertas. Aunque el endpoint completo sigue reservado para la
captura hash-bound, la respuesta usada por el navegador omite métricas e identificadores por
ítem, selecciones de opciones y cualquier dato de participante.

### Retiro de ítems sin romper intentos históricos

Los retiros se registran en `config/diagnostic/item-controls.json`; nunca se borran registros del
banco ni se reutiliza un ID. Cada control debe identificar tipo, ID y `contentVersion`, usar uno
de los motivos permitidos, enlazar la decisión y contener revisiones independientes académica y
de medición. El compilador falla si el ítem no pertenece al banco aprobado, cambió de versión,
ya no era seleccionable o el paquete contiene campos inesperados, duplicados o firmas no
independientes.

El efecto es deliberadamente asimétrico: nuevas etapas excluyen el registro `retired`, mientras
que una etapa emitida conserva acceso servidor a la versión y clave exactas para reanudación y
puntuación. Las métricas del piloto conservan la huella del registro retirado, pero sus gates
operativos cuentan solo ítems y consignas activos. El panel muestra ambos conteos. Como estado,
parámetros, exposición y hash de revisión forman parte de `bankSnapshot.sha256`, cualquier retiro
o recalibración vuelve obsoletas las evidencias de piloto y calidad hasta una nueva validación.
