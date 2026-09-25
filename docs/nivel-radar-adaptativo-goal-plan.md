# Goal activo — Nivel Radar adaptativo y confiable

Estado: **activo**  
Alcance inicial de producción: **inglés A1–C2**  
Arquitectura objetivo: reutilizable por idioma  
Habilidades evaluadas: **lectura, escritura, gramática, vocabulario y escucha**

## Resultado que persigue el goal

Idiomas WeLearn tendrá un examen diagnóstico adaptativo que:

1. entrega un perfil separado de las cinco habilidades;
2. selecciona una ruta de dificultad a partir de evidencia, no de autopercepción;
3. usa un banco reservado, versionado y distinto de la práctica pública;
4. puntúa las respuestas objetivas exclusivamente en servidor;
5. evalúa escritura con una rúbrica MCER propia y control de calidad humano;
6. expresa incertidumbre y cantidad de evidencia junto al resultado;
7. guarda respuestas, tiempos, versiones y rutas para calibrar los ítems;
8. supera pruebas técnicas, revisión lingüística y un piloto psicométrico antes de presentarse como confiable;
9. produce una ruta de estudio concreta dentro de WeLearn;
10. puede incorporar otro idioma sin reescribir el motor adaptativo.

El goal **no termina** cuando exista una interfaz funcional. Termina cuando se cumpla la
definición de terminado al final de este documento.

## Registro de ejecución

Actualizado el 25 de septiembre de 2026:

- **Fase 0 — en progreso avanzado:** contrato, blueprint, descriptores de evidencia y snapshot
  verificable de la línea base implementados. Falta aprobación académica y feature flag.
- **Fase 1 — inventario y recuperación técnica completados; curaduría pendiente:** 80 audios
  heredados inventariados con commit, blob, SHA-256, duración y vínculo determinista al archivo
  de guion. Los 60 audios ingleses fueron recuperados en staging privado y verificados. Además,
  965 interacciones objetivas de ICFES, TOEFL y Cambridge quedaron clasificadas por habilidad,
  rango candidato, exposición de clave, huella y reparación requerida. El análisis demuestra
  que 820 están concentradas en B2, 840 exponen su clave en material público y los 40 MP3 de
  Cambridge necesitan segmentación. La auditoría de contenido recuperado confirmó que los 20
  audios A1 y los 20 B1 tienen transcripción suficiente para reescribir testlets en inglés; los
  20 A2 exigen transcripción verificada. Ningún candidato se considera aprobado
  lingüísticamente.
- **Fase 2 — núcleo en progreso:** contratos público/privado, scoring objetivo en servidor,
  validación antimanipulación y una migración durable con tablas de intentos, etapas,
  respuestas, escritura y auditoría implementados. Las tablas niegan acceso directo a roles de
  navegador. La creación del intento y el envío de una etapa tienen funciones SQL atómicas,
  `SECURITY INVOKER`, autorizadas solo para `service_role`; el endpoint de inicio comprueba
  feature flag, origen, consentimiento, audio, autenticación, cuota y capacidad del banco. La
  transición localizador→precisión ya tiene endpoint autenticado: vuelve a enlazar intento,
  etapa, owner, versión y banco desde la base de datos, puntúa en servidor y devuelve la forma
  de precisión. La transición precisión→escritura también combina las observaciones guardadas,
  calcula evidencia provisional por habilidad, restringe la consigna a la ruta asignada y
  persiste la etapa de escritura atómicamente; los reintentos idénticos recuperan la etapa ya
  persistida. Los perfiles con evidencia insuficiente o dispersión material reciben ahora un
  módulo de confirmación de ocho decisiones, sin repetir ítems ni estímulos, antes de escritura.
  La producción escrita ya se valida contra la consigna y los límites resueltos en servidor y
  se persiste mediante una función atómica e idempotente que deja el intento en `scoring`; la
  ausencia de evaluación posterior conserva el estado pendiente y nunca fabrica un nivel. La
  finalización administrada valida evaluación automática y humana contra texto, consigna y
  rúbrica; exige adjudicación ante desacuerdo material, recompone las cuatro habilidades
  objetivas y publica escritura y perfil integral en una sola transacción.
  La reanudación autenticada vuelve a resolver la última etapa desde los bancos versionados y
  distingue etapa objetiva, escritura, procesamiento, resultado y cierre sin exponer campos
  privados. Falta ejecutar las migraciones contra Postgres (el entorno actual no tiene Docker
  ni Podman), conectar un proveedor de evaluación automática y verificar autorización contra
  una base real.
- **Fase 3 — núcleo MST avanzado:** enrutamiento monotónico, confirmación ejecutable de perfiles
  contradictorios, selector balanceado y simulador A1–C2 implementados. La confirmación añade
  dos decisiones por habilidad dentro de la ruta y vuelve a estimar la evidencia antes de
  escritura. La simulación inicial
  detectó sobreenrutamiento y permitió ajustar los cortes provisionales a 5/12 y 10/12; el
  reporte queda versionado. La puerta de capacidad ahora exige realmente 12 decisiones por
  nivel/habilidad y seis estímulos de lectura/escucha. Los umbrales siguen marcados como piloto
  hasta calibración real.
- **Fase 5 — núcleo de escritura iniciado:** rúbrica de cuatro criterios A1–C2, validación de
  evidencia, comparación humano/modelo y adjudicación implementadas. Hay 24 consignas
  reservadas —cuatro por nivel— en estado borrador, pendientes de aprobación lingüística. El
  adaptador automatizado ya construye un contrato MCER propio con descriptores A1–C2, cuatro
  estimaciones independientes, citas literales y confianza provisional limitada; el servidor
  sella modelo, fecha, consigna, versión y hash de respuesta, y rechaza evidencia inventada.
  No reutiliza bandas IELTS/TOEFL ni produce un nivel global. La llamada a un proveedor externo
  permanece deliberadamente desconectada hasta aprobar privacidad, consentimiento y proveedor.
  El transporte Gemini/Groq ya está implementado detrás de puertas independientes de feature,
  aprobación de procesamiento, política y consentimiento. Usa los contratos estructurados
  vigentes de cada proveedor, fija el modelo, no registra texto, limita Groq a modelos con modo
  estricto y vuelve a validar toda la evidencia en servidor. El consentimiento piloto actual se
  rechaza expresamente como autorización externa; la página administrativa muestra los
  bloqueos de configuración sin exponer secretos. Cada intento nuevo persiste versión y fecha
  del consentimiento general; las columnas de autorización externa nacen cerradas y un
  cargador servidor-servidor exige owner, estado y evidencia completa. Falta aprobar e
  implementar la captura de esa autorización externa antes de conectar el caller. La ruta
  exclusivamente humana ya admite escrituras
  pendientes sin proveedor: una aceptación puede publicar evidencia provisional y una decisión
  de revisar exige adjudicación por otra identidad, sin fabricar acuerdo con un modelo ausente.
  La evaluación automática se persiste una sola vez mediante RPC exclusiva de servidor; un
  reintento distinto falla, y la finalización carga esa evidencia inmutable desde la base en vez
  de aceptar una copia manipulable reenviada por el navegador del administrador. La cola
  académica de administración mantiene ciega la primera revisión: solo muestra la evaluación
  automática cuando existe discrepancia y el caso entra en adjudicación. La primera revisión
  queda guardada e inmutable; la adjudicación exige una identidad administradora diferente.
  La rúbrica v2 exige además una clasificación humana estructurada de pertinencia y autoría.
  Un tamizaje determinista distingue vacío, longitud insuficiente/excesiva y coincidencias
  literales de seis o más palabras con la consigna, pero nunca convierte esa coincidencia en una
  acusación ni asigna nivel. Aceptar exige que la muestra esté en tema y sin preocupación de
  autoría; cualquier duda pasa a adjudicación independiente. Si ambas revisiones excluyen una
  muestra fuera de tema o no verificable, el intento sí termina: escritura y nivel global quedan
  explícitamente `no estimados`, con la causa visible, en vez de fabricar puntuación o dejar al
  estudiante atrapado en procesamiento. Gramática y vocabulario ya integran además sus criterios
  productivos de la escritura aceptada con una política provisional versionada: la evidencia
  objetiva conserva el nivel central y sus conteos; coincidencia solo corrobora, una diferencia
  amplía el rango y reduce confianza, y una diferencia de dos o más niveles genera advertencia.
  La escritura nunca rescata evidencia objetiva insuficiente ni se cuenta como otro bloque de
  respuestas. Falta validar empíricamente esta política y sus umbrales durante el piloto.
- **Fase 4 — entrega privada de escucha iniciada:** el endpoint de medios autentica al usuario,
  comprueba que el audio pertenece a su etapa activa y no expirada, descarga desde un bucket
  privado y soporta rangos HTTP sin URL pública ni firmada. El cargador verificó los 60 MP3
  recuperados (14.488.449 bytes) contra sus SHA-256 en modo seco; aplicar el bucket y subir los
  objetos sigue pendiente del entorno Supabase real.
- **Fase 4 — corredor adaptativo implementado tras bandera independiente:** la interfaz inicia o
  reanuda intentos, renderiza únicamente etapas emitidas por servidor, registra tiempo y
  reproducciones, permite omisiones explícitas, entrega escritura y muestra nivel, rango y
  confianza por habilidad. Los borradores objetivos y de escritura sobreviven una recarga en la
  misma sesión, pero solo se restauran si coinciden intento, versión, etapa, forma y consigna;
  opciones manipuladas o borradores obsoletos se descartan. La verificación real en navegador
  pasó en 1440 y 390 px, sin overlay ni errores de consola; el inicio autenticado y la historia
  real de recarga siguen pendientes porque este worktree no dispone de credenciales Supabase.
- **Fase 4 — audio reciclado usado sin contaminar la medición:** el control previo sustituyó el
  tono sintético por un MP3 inglés heredado y público, fijado mediante SHA-256. La muestra se
  rotula como no puntuada, requiere reproducción y confirmación explícita de escucha y permanece
  fuera de todos los bancos diagnósticos. Su manifiesto prohíbe usarla como evidencia o contenido
  elegible; de este modo se reutiliza un activo existente para comprobar el dispositivo sin
  degradar la reserva ni la confiabilidad de la habilidad de escucha.
- **Banco objetivo — primera tanda editorial:** 24 decisiones de escucha en inglés —12 A1 y
  12 B1, sobre seis audios distintos por nivel— reescritas a partir de audios recuperados. Las
  claves, racionales y huellas permanecen en servidor. Siguen en borrador y marcadas como audio
  previamente público; el selector bloquea cualquier contenido que no tenga exposición
  `reserved`, incluso si alguien cambia por error su estado a aprobado.
- **Escucha reservada — producción A1–C2 preparada, no contabilizada:** hay 36 briefs
  originales —seis estímulos y doce decisiones por cada nivel MCER— que usan el inventario
  recuperado únicamente como referencia agregada de duración y entrega. Permanecen en estado
  `production-brief`: no suman capacidad al banco. Un manifiesto vacío solo los materializa
  como borradores reservados cuando cada grabación nueva coincide con la versión de producción,
  duración, SHA-256 de audio, SHA-256 de transcripción y dos revisores de audio independientes;
  después todavía necesitan revisión lingüística, de evaluación y alineación para promoción.
  Cada tramo A1–A2, B1–B2 y C1–C2 lleva versión propia; el ingestor rechaza una grabación
  generada para otra versión aunque conserve el mismo identificador. El generador de paquetes
  privados de locución entrega transcript, reparto, ritmo y duración, pero excluye preguntas,
  claves y racionales. El hash del transcript canónico se verifica de nuevo al materializar una
  grabación, de modo que una locución alterada no puede entrar silenciosamente al banco. El
  generador ElevenLabs reutiliza los controles del motor internacional: el dry run A1–C2
  factura **36 archivos, 116 segmentos y 30.386 caracteres**; la generación exige hash exacto
  del paquete, tope de caracteres, techo independiente de débito, reserva de créditos, semilla,
  verificación de saldo antes/después, cuatro voces existentes y
  aprobación explícita del reparto. La salida nunca va a `public/` y queda pendiente de QA
  humano. Se propusieron cuatro voces que ya tenían aprobación separada en el casting TOEFL,
  pero esa aprobación no se hereda: el reparto diagnóstico sigue bloqueado hasta una escucha y
  aprobación explícitas para este uso.
- **Escucha — revisión antes del gasto:** la producción ya no puede comenzar solo con reparto y
  autorización financiera. Doce paquetes privados —lingüístico y de evaluación por cada nivel—
  fijan los 36 briefs y sus 72 decisiones mediante hashes. La vista lingüística oculta claves y
  racionales; la de evaluación permite comprobar evidencia, clave, distractores, constructo,
  dificultad y sesgo. El compilador exige cobertura total, checklists completos e identidades
  independientes, y conserva la huella de cada recibo. El manifiesto comprometido está vacío y
  el estado actual es **0/12 aprobaciones**; cualquier cambio de guion o ítem invalida su recibo.
  `--generate` falla antes de leer secretos o gastar créditos si la selección no está aprobada.
  Además, el materializador servidor vuelve a exigir aprobación exacta antes de convertir una
  grabación en candidato reservado y el gate de salida conserva un bloqueo independiente, por lo
  que editar manualmente el manifiesto de publicaciones tampoco evita esta revisión.
- **Piloto A1 de audio acotado:** el generador ofrece ahora `--pilot-a1`, un preset inmutable de
  tres archivos (dos monólogos y una conversación), seis segmentos y las cuatro voces propuestas.
  Su factura exacta es **712 caracteres / máximo 1.424 créditos** y queda ligada al hash
  `98708152…f9d2`. Incluso con `--generate`, el runner rechaza un alcance distinto, un techo
  superior, una frase de autorización no ligada al paquete o voces sin aprobación del dueño. El
  dry run pasó sin API, secreto, gasto ni escritura; la generación real sigue pendiente de
  autorización explícita.
- **Aprobación de casting limitada a la cata:** un paquete privado separado fija voces, IDs,
  guiones, modelo, formato, ensamblaje, tres archivos y techo de crédito. Nace vacío y exige que
  el dueño confirme voz, alcance, staging privado y no publicación con identidad estable. El
  registrador revalida el hash y requiere confirmación explícita; al aplicarse solo habilita el
  preset A1 y conserva las cuatro voces como propuestas para la producción completa. Por tanto,
  aprobar la cata nunca aprueba ni publica las 36 grabaciones.
- **Banco objetivo — contenido reservado original:** lectura, gramática y vocabulario A1–C2 ya
  tienen 12 decisiones por celda; lectura usa seis estímulos distintos por nivel. Son **216/288
  decisiones objetivas** y **18/24 celdas** con capacidad editorial de borrador, con claves
  privadas, racionales de clave y distractores, posiciones equilibradas y estado reservado. El
  reporte `docs/diagnostic-bank-readiness.json` separa estos avances del banco operativo, que
  continúa en cero hasta revisión y piloto.
- **Puerta editorial fail-closed implementada:** un manifiesto versionado solo promueve a piloto
  contenido reservado cuyo hash y versión coinciden, con identidades independientes para
  revisión lingüística y de evaluación; escucha exige además revisión de alineación de audio.
  El generador de paquetes privados prepara recibos separados por rol sin mostrar claves al
  revisor lingüístico; el compilador exige listas completas, atestación humana, identidades
  independientes y vuelve a ejecutar la puerta de publicación antes de escribir una revisión
  nueva del manifiesto. El manifiesto comprometido permanece vacío y el inicio comprueba
  capacidad completa tanto del banco objetivo como de las cuatro consignas paralelas de
  escritura por nivel.
- **Seguimiento editorial verificable:** los 216 candidatos objetivos reservados y las 24
  consignas ya están distribuidos en 24 lotes privados A1–C2, con una plantilla lingüística y
  otra de evaluación por lote. `report:diagnostic-bank-review-progress` valida los 48 artefactos
  contra los hashes actuales y publica solo conteos agregados. No confunde plantillas con firmas,
  rechaza cobertura parcial, archivos o roles inesperados, recibos obsoletos, duplicados y una
  identidad compartida entre roles. El corte actual registra **48 plantillas vigentes, 0 recibos
  completados y 0/24 lotes listos**. La escucha no se mezcla con ese atraso: permanece no
  loteable hasta materializar audio reservado y después exigirá un tercer rol independiente de
  alineación.
- **Compilación integral de revisión preparada:** el registrador acepta ahora el directorio
  privado completo mediante `--review-root`, ejecuta el auditor estricto y se niega a proponer
  una aplicación mientras falte cualquiera de los 48 recibos o exista un cambio solicitado,
  hash viejo, vista manipulada o identidad no independiente. Las referencias se preservan con
  subruta privada segura, por lo que los nombres repetidos de los 24 lotes ya no colisionan. La
  aplicación sigue separada en dry run y escritura confirmada por hashes; este mecanismo no
  crea ni presume firmas humanas.
- **Fase 6 — medición y reporte avanzados:** estimación IRT/EAP parametrizable, rango plausible,
  confianza, distinción de omisiones y retención del nivel global ante evidencia incompleta
  implementadas. El resultado persistido incluye ahora prioridades diferentes según el perfil,
  un objetivo MCER observable por habilidad y enlaces existentes de práctica/curso. La pantalla
  y el PDF se construyen desde las mismas estimaciones, rangos, recomendaciones y advertencias.
  La política provisional limita la confianza y nunca se presenta como calibrada.
- **Fase 7 — contrato psicométrico fail-closed ampliado:** los criterios provisionales v2 ya no
  permiten declarar elegible un piloto solo por volumen, finalización y correlaciones de ítem.
  Exigen cobertura mínima de las tres rutas MST y de los seis niveles MCER de referencia,
  facilidad dentro de rango y funcionamiento de todos los distractores. Además, requieren un
  artefacto agregado ligado por hash al banco y a los criterios que demuestre fiabilidad
  adaptativa por cada habilidad objetiva, consistencia de clasificación, estabilidad por las
  cinco habilidades, análisis DIF con base lícita y standard setting de los cinco cortes MCER.
  El artefacto comprometido nace como `not-collected`; solo un candidato agregado con hashes de
  dataset y código de análisis, aprobado por identidades independientes académica, de medición y
  privacidad, puede registrarse mediante dry run y confirmación hash-bound. Por tanto, esos cinco
  gates permanecen cerrados hasta evidencia real. El informe no contiene UUID, grupos identificables, texto
  escrito ni respuestas. Los valores numéricos son una propuesta que todavía debe aprobar
  liderazgo académico y de medición; no se presentan como umbrales universales prescritos por
  MCER ni por una asociación externa.
- **Fase 7 — reclutamiento reconciliado con la exposición real:** un plan ejecutable cruza los
  288 ítems, 200 respuestas por ítem, longitud MST, confirmación simulada, tres rutas y 75% de
  finalización. Demuestra que 300 iniciados es solo un gate de entrada. El piso global simulado
  es 2.590 iniciados, pero el piso route-balanced más útil es **4.348 iniciados** —1.087
  completados por ruta— aun suponiendo exposición perfectamente uniforme. El reporte distingue
  además escritura, referencia A1–C2, fiabilidad, consistencia, retest, equidad y panelistas. Se
  regenera desde criterios, blueprint, capacidad y simulación; si cualquiera cambia, el prebuild
  falla por reporte obsoleto. Los valores son cotas inferiores de planificación, nunca una
  garantía ni una decisión automática de publicación. La revisión humana de criterios queda
  ligada a los seis artefactos de esa derivación, de modo que cambiar una cifra, el banco, el
  blueprint, la simulación o el algoritmo invalida las firmas académica y de medición.
- **Fase 7 — cadena de custodia del piloto preparada:** un capturador read-only consulta el
  informe agregado desde un despliegue que debe coincidir exactamente con fuente, banco, commit,
  modo `pilot` y proyecto Supabase. Reporte y recibo permanecen privados y omiten filas,
  identidades, respuestas y textos. Solo un informe elegible puede generar paquetes separados
  para liderazgo académico y medición; ambos deben revisar muestra, rutas/niveles, ítems,
  escritura, referencia independiente, fiabilidad adaptativa, consistencia de clasificación,
  estabilidad, equidad/DIF, standard setting y limitaciones con identidades distintas. El compilador fija todos los hashes y
  el registrador dry-run solo puede trasladar una aprobación humana real del informe exacto al
  gate de release. No se ha capturado ni aprobado un informe porque aún no existe el piloto real.
- **Fase 8 — puerta integral de salida implementada, lanzamiento bloqueado:** un semáforo único
  exige simultáneamente gobierno de evidencia, banco completo y aprobado, 36 grabaciones
  verificadas, operación de escritura, Supabase real, privacidad y borrado, piloto vinculado al
  banco exacto y calidad ligada a una huella de código. Activar las dos feature flags no puede
  sobreescribir ningún gate. El informe piloto incluye ahora un SHA-256 canónico de ítems,
  claves, racionales, fuentes y consignas; cambiar cualquiera invalida el piloto anterior. La
  vía humana de escritura puede liberar el producto sin proveedor externo, pero exige al menos
  dos revisores verificados y SLA. El estado actual medido es `HOLD` en **1/8 gates** y **20
  bloqueos**: solo calidad pasa; gobierno quedó nuevamente cerrado hasta aprobar la política de
  entrega y las otras seis dimensiones conservan sus bloqueos externos, humanos o de contenido.
- **Fase 8 — panel de salud del piloto implementado:** el panel administrativo puede solicitar
  manualmente una ventana de 30 a 365 días y muestra finalización, intentos no completados,
  mediana y p90 de duración, estados, cobertura de rutas, los dieciséis gates, acuerdo de escritura,
  referencia independiente, cadena psicométrica y alertas agregadas. El servidor proyecta una
  respuesta mínima antes de enviarla al navegador: no incluye identidades, respuestas, textos,
  IDs de ítem u opción, claves ni etiquetas de grupos. La carga es `same-origin`, `no-store` y
  conserva el límite administrativo existente. Para operar el rollout añade ahora intentos
  activos y vencidos, abandono/expiración, latencia objetiva, reproducción de escucha, cola,
  antigüedad, fallos y turnaround de escritura. Los errores de aplicación y de entrega de audio
  emiten ahora logs estructurados por ruta plantillada, estado y duración, sin UUID, parámetros,
  contenido ni errores crudos. El panel mantiene explícito que recepción, forwarding y alertas
  requieren verificación en el despliegue: un cero ausente nunca se presenta como ausencia de
  fallos. Proyección, cálculo, rutas, instrumentación, runbook y UI forman parte del snapshot de
  entrega.
- **Fase 8 — señal de deriva de ítems implementada:** el informe administrativo compara la
  cohorte seleccionada con la ventana inmediatamente anterior y de igual duración. Solo une el
  mismo ítem y versión, exige al menos 50 respuestas intentadas en cada ventana y marca revisión
  cuando coinciden un cambio absoluto de facilidad de 0,15 o más y un z de dos proporciones de
  al menos 3. La línea base usa una consulta mínima sin opciones elegidas, texto ni identidad y
  se agrega en tiempo lineal. La vista de salud recibe únicamente conteos; el informe privado
  completo conserva los IDs necesarios para investigar. `INSUFFICIENT_DATA` no se muestra como
  estabilidad. Esta señal nunca recalibra ni retira contenido: congela el rollout y remite al
  control versionado con revisiones académica y de medición independientes. Los tres umbrales
  siguen siendo propuesta dentro de la política de entrega y requieren aprobación humana.
- **Fase 7 — dependencia local de testlets convertida en gate:** el contrato de evidencia
  psicométrica v2 exige analizar todos los estímulos de lectura o escucha que alimentan dos o
  más decisiones. Registra método residual, muestra mínima pareada, máximo residual absoluto,
  testlets señalados, casos materiales sin resolver y una referencia opaca de resolución cuando
  corresponda. Una señal por encima del umbral no puede desaparecer sin marcarse; cualquier caso
  material sin resolver mantiene el piloto en `HOLD`. El reporte agregado v3 y la revisión final
  del piloto incorporan esta puerta sin exponer respuestas ni participantes. Los valores de 50
  pares por testlet y residual absoluto 0,20 son propuesta pendiente de aprobación, no una norma
  universal ni evidencia ya obtenida. La muestra mínima por ítem cuenta solo respuestas
  intentadas: servir una pregunta u omitirla no aporta observación de dificultad. Además, la
  correlación ítem-total corregida excluye las preguntas hermanas del mismo texto o audio para
  que la dependencia del testlet no infle artificialmente la discriminación. Antes de agregar
  el piloto, el servidor vuelve a validar el contrato de cada respuesta y recalcula `correct`,
  `incorrect` u `omitted` desde la clave y versión privadas; una fila manipulada o inconsistente
  invalida el dataset en vez de contaminar el informe.
- **Fase 8 — interpretación responsable preparada:** pantalla y PDF traducen los estados y
  advertencias internas a lenguaje comprensible, distinguen estimación provisional, calibrada y
  no disponible, y aclaran que la confianza técnica no es porcentaje de dominio ni certeza del
  nivel. `docs/diagnostic-interpretation-guide.md` fija para tutores los usos permitidos, el orden
  de lectura de las cinco habilidades, mensajes para perfiles desiguales o incompletos y los
  criterios de escalamiento. Guía, vocabulario, UI y PDF quedan ligados a gobierno de entrega,
  de modo que no pueden cambiarse silenciosamente después de la aprobación.
- **Fase 8 — retiro preservando historia implementado:**
  `config/diagnostic/item-controls.json` separa la disponibilidad futura del contenido
  versionado. Un retiro exige versión exacta, motivo cerrado, referencia de decisión y revisiones
  independientes de liderazgo académico y medición. El registro continúa en el banco servidor
  con estado `retired`, por lo que una etapa ya emitida todavía puede reanudarse y puntuarse con
  su clave y versión originales; los selectores y auditorías de capacidad dejan de contarlo de
  inmediato. El hash del banco liga ahora estado, exposición, revisión y parámetros, de modo que
  retirar o recalibrar invalida automáticamente piloto y release anteriores. El manifiesto
  comprometido permanece vacío: esta infraestructura no inventa retiros ni firmas.
- **Fase 8 — política de entrega y repetición implementada, aprobación pendiente:** una política
  versionada separa piloto y producción. El inicio limita atómicamente los intentos activos y el
  cooldown por usuario; cada intento conserva la ventana de exposición y la vigencia exactas que
  se aplicaron. El servidor consulta material entregado al mismo usuario e idioma dentro de esa
  ventana y lo excluye del locator, precisión, confirmación y escritura; si la historia excede el
  límite auditable o el banco no tiene reemplazos, no degrada silenciosamente y falla cerrado.
  El resultado comunica una fecha `validUntil` como orientación, no como certificación oficial.
  Los valores provisionales son 365 días sin repetir contenido, vigencia de 30 días en piloto y
  180 en producción, con cooldown productivo de 90 días. Producción permanece bloqueada hasta
  revisión independiente de liderazgo académico y producto.
  Los retests del piloto ya no quedan abiertos por tener cooldown cero: una inscripción
  consentida necesita una ventana administrativa de máximo 90 días, entre uno y tres cupos,
  referencia opaca y razón. La base consume cada cupo dentro de la transacción de creación y
  registra autorización y consumo en el historial append-only; revocación o cierre borra el
  saldo. El panel administrativo prepara esta autorización sin almacenar datos en el navegador.
  Los dos paquetes de esa decisión enumeran evidencia y preguntas específicas por rol; la firma
  queda ligada por una huella compuesta a política, migración, enforcement, cálculo y UI. Un
  reporte agregado distingue pendientes, aprobaciones, cambios solicitados, faltantes e inválidos
  sin revelar identidades o comentarios y sólo habilita compilación con 7/7 recibos válidos.
- **Privacidad — borrado implementado, política pendiente:** el usuario autenticado puede pedir
  el borrado completo de sus intentos diagnósticos mediante una mutación same-origin con
  confirmación explícita y cuota estricta. Una función transaccional exclusiva de `service_role`
  bloquea carreras, cuenta intentos, etapas, respuestas, escritura, eventos y referencias,
  elimina por cascada y rechaza cualquier residuo. Las duraciones de retención están documentadas
  solo como propuesta; no existe purge programado y el gate no puede aprobarse hasta revisión de
  privacidad y prueba contra Supabase real.
- **Lanzamiento fail-closed por canal:** el inicio ya diferencia `pilot` y `production`. El
  piloto exige una fila privada de inscripción con consentimiento versionado; el navegador no
  puede crearla ni leerla. Producción exige un certificado que solo puede emitirse cuando los
  ocho gates pasan y que fija release ID, huella del código y hash del banco. El prebuild rechaza
  un certificado obsoleto y el servidor vuelve a exigir release ID, huella desplegada y banco
  coincidentes. El certificado comprometido permanece en `hold`.
- **Fase 8 — rollout gradual y reversión implementados:** producción asigna a cada usuario
  autenticado a una cohorte estable por HMAC, con porcentaje entero de 0 a 100, identificador de
  rollout y secreto separados. Configuración ausente o inválida falla cerrada; el navegador no
  recibe bucket, UUID ni secreto. El porcentaje solo gobierna inicios nuevos, por lo que llevarlo
  a cero detiene la entrada sin impedir reanudar o terminar intentos activos. Un verificador
  operativo no imprime secretos y el runbook fija la escalera 0–1–5–25–50–100, las señales de
  pausa y el orden de rollback: cortar nuevos inicios, retirar la UI, drenar, y redesplegar el
  último commit con su certificado, huella y banco coincidentes. Algoritmo, enforcement,
  certificado, verificador y procedimiento quedaron dentro del snapshot de gobierno de entrega;
  por ello las dos revisiones humanas pendientes deben aprobar también este control.
- **Cohortes piloto — operación administrativa preparada:** una mutación administrativa
  same-origin y rate-limited registra invitación, consentimiento, revocación o cierre mediante
  transiciones SQL atómicas. La evidencia usa la versión de consentimiento configurada y un
  timestamp canónico; el servidor fija esa versión sin confiar en el navegador y exige una
  referencia opaca al comprobante externo. Revocar o cerrar exige una razón. Cada transición
  deja un evento append-only exclusivo de servidor, y el borrado del participante elimina
  también inscripción y eventos. El panel de Nivel Radar ya ofrece el flujo, confirma las
  transiciones destructivas y limpia el UUID tras guardar sin usar almacenamiento del navegador.
  Falta aplicar las migraciones y conectar el proceso humano que recoge el consentimiento.
- **Evidencia live ligada al release:** el recorrido autenticado consulta ahora una ruta
  administrativa `no-store` que identifica modo, huella de fuente, hash del banco, commit y
  proyecto Supabase del despliegue. El runner exige coincidencia exacta con un checkout limpio y
  conserva esa identidad sin cookies, UUID ni contenido del participante. Un registrador
  fail-closed cruza el recibo del inspector Supabase con el del recorrido, exige que sean del
  mismo proyecto, tengan menos de 24 horas y estén ligados al mismo release; solo entonces puede
  registrar migración, flujo autenticado y borrado mediante atestación explícita del operador.
  No puede aprobar retención ni ninguna decisión académica. No se ha ejecutado contra un entorno
  real porque todavía no hay credenciales ni banco piloto aprobado.
- **Calidad reproducible ligada a fuente:** un runner separado ejecuta el guardián del catálogo
  protegido —465 temas gramaticales y sus módulos transversales—, la suite diagnóstica,
  TypeScript, el build de producción y el E2E adaptativo sobre un árbol limpio, verifica que la
  huella no cambie durante la corrida y emite un recibo privado con commit, conteo de pruebas,
  historias de navegador y páginas estáticas. El E2E levanta el build con la interfaz adaptativa
  en un puerto efímero y cubre desktop, móvil, teclado, recarga, audio, omisión, error/reintento,
  escritura, resultado con incertidumbre y cierre en **320, 390 y 1.440 px**. Usa contratos de
  API simulados, por lo que no
  reemplaza la comprobación autenticada posterior contra Supabase.
  Un registrador de confirmación hash-bound puede trasladar únicamente esa evidencia mecánica al
  manifiesto de release, sin tocar decisiones académicas, privacidad, escritura ni piloto. El
  corte `bb31007e` quedó verificado con el catálogo protegido de **465 temas**, **305/305
  pruebas**, TypeScript sin errores, un build de **2.564 páginas estáticas** y **4/4 historias
  E2E**. La huella de fuente
  `0bf69131cd371acd9ca2bc24863ecc47cda9d4b8404695b5237a390f6cf40360` y el recibo privado
  `4b6c31219109c61466a32dc4a4ec3a31be2b6f5921baecc5236461b8e5a0da4f` dejan el gate de
  calidad atado exactamente a ese código.
- **Gobierno humano preparado sin decisiones implícitas:** un generador privado produce siete
  paquetes hash-bound para escritura, retención, criterios de piloto y política de entrega.
  Escritura requiere
  revisiones independientes académica y operativa y, si se elige modo humano, dos referencias
  verificables de revisores con SLA máximo de 72 horas. Retención exige privacidad y los umbrales
  del piloto exigen revisiones académica y de medición; entrega exige revisiones académica y de
  producto. Los siete paquetes fueron regenerados contra las huellas actuales y siguen en
  **0/7 decisiones**, sin identidad ni aprobación inventadas. Los paquetes nacen sin decisión ni modo
  seleccionado; una huella distinta, identidades duplicadas o desacuerdo operativo invalida la
  compilación. El compilador ejecutable recalcula las huellas actuales y conserva manifiesto y
  hashes de recibos únicamente en staging privado. Falta completar esos recibos por personas
  autorizadas. Un registrador dry-run valida nuevamente manifiesto y archivos originales; solo
  con confirmación hash-bound y operador identificado puede trasladar las cuatro decisiones exactas
  a la configuración. Nunca aprueba contenido, borrado real ni resultados del piloto.
- **Pruebas actuales:** la suite específica incorpora controles del inventario, seguridad de
  transición, idempotencia, bancos candidatos, recibos humanos y recuperación segura de
  borradores. Un inspector Supabase fail-closed ya puede comprobar la última migración por sus
  columnas, grants directos, RPC y bucket privado sin leer filas ni ejecutar escrituras; soporta
  claves nuevas y legacy. Un segundo runner destructivo, limitado a una cuenta fixture y con
  confirmación ligada a su UUID, ya cubre inicio, reanudación, audio privado, etapas objetivas,
  escritura, revisión humana, perfil de cinco habilidades y borrado verificado; no se ejecutó
  porque este entorno carece de credenciales y banco piloto aprobado. El corte reproducible
  vigente se documenta arriba; la verificación de despliegue real sigue pendiente.

Este registro distingue deliberadamente software terminado de evidencia lingüística o
psicométrica todavía no obtenida.

## Decisión de alcance

La primera versión validada será inglés A1–C2. Intentar calibrar ocho idiomas a la vez
fragmentaría la muestra, multiplicaría la revisión académica y dejaría ocho bancos con poca
evidencia. El motor, los contratos de datos y el reporte sí serán multilingües desde el inicio.
Después de validar inglés, cada nuevo idioma tendrá su propio banco, revisión y calibración.

El producto se construirá primero como **test adaptativo multietapa (MST)**. Un CAT que elige
ítems uno por uno requiere parámetros empíricos de dificultad y discriminación que todavía no
existen. El paso a CAT será una evolución posterior basada en datos, no una etiqueta comercial.

## Línea base que este plan reemplaza

Nivel Radar hoy:

- recorre A1–C2 en orden fijo;
- elige el primer ítem disponible, no el ítem más informativo;
- puede cerrar con cuatro respuestas y dos errores;
- no evalúa escritura;
- entrega claves al navegador;
- no persiste respuestas ni tiempos para calibración;
- mezcla bancos ICFES, Cambridge, IELTS y TOEFL sin un contrato común de nivel;
- tiene cero ítems de escucha en A1 y A2;
- clasifica como gramática los 36 MCQ de Cambridge B2 que importa;
- no importa ningún ítem TOEFL C1 porque el adaptador antiguo solo reconoce `mcq`;
- usa masters IELTS de más de veinte minutos para una sola decisión B1/B2;
- no tiene una suite específica que pruebe su selección, scoring y reglas de parada.

La implementación nueva no extenderá ese array dentro del componente. Creará un dominio de
diagnóstico separado, con contratos auditables y scoring servidor.

## Blueprint de medición

### Dimensiones visibles

| Dimensión | Evidencia principal | Subdominios mínimos |
|---|---|---|
| Lectura | respuestas objetivas sobre textos | idea general, detalle, inferencia, propósito, estructura y significado contextual |
| Escucha | testlets de audio con varias decisiones | idea general, detalle, intención, inferencia y seguimiento discursivo |
| Escritura | una producción adaptada al nivel provisional | cumplimiento de tarea, organización, rango y precisión |
| Gramática | uso de la lengua + evidencia de escritura | precisión, rango, formación y control de estructuras |
| Vocabulario | uso contextual + evidencia de escritura | rango, control, colocación, paráfrasis y significado contextual |

Gramática y vocabulario son competencias lingüísticas transversales; lectura, escucha y
escritura son actividades comunicativas. El reporte mostrará las cinco dimensiones solicitadas,
pero no fingirá que un promedio crudo de porcentajes equivale automáticamente a un nivel MCER.

### Forma inicial del examen

1. **Control de audio y ejemplo no puntuado.** Comprueba reproducción antes de generar el intento.
2. **Localizador común:** 12 decisiones equilibradas, centradas entre A2 y B2.
3. **Enrutamiento:** rama baja A1–A2, media B1–B2 o alta C1–C2.
4. **Módulo de precisión:** 16–24 decisiones, con un mínimo de evidencia por dimensión objetiva.
5. **Escritura adaptada:** una tarea seleccionada a partir del nivel provisional.
6. **Control de consistencia:** ítems ancla o módulo corto adicional cuando dos fuentes de evidencia se contradigan.
7. **Resultado:** perfil, rango probable, confianza, evidencias y ruta de estudio.

Objetivo de duración: **35–45 minutos**. El examen podrá alargarse hasta un máximo explícito
cuando necesite resolver una clasificación incierta, pero nunca podrá terminar sin el mínimo de
evidencia definido por habilidad.

### Reglas iniciales de evidencia

- mínimo de 5 decisiones puntuadas para lectura, escucha, gramática y vocabulario;
- al menos 3 estímulos distintos en lectura y 3 audios distintos en escucha;
- cada audio puntuado forma un testlet de 2–3 preguntas y se reproduce desde un fragmento cerrado;
- una sola pregunta no puede certificar ni debilitar por sí misma una habilidad;
- ninguna habilidad sin evidencia se presenta como 0%; se presenta como **no estimada**;
- las respuestas omitidas y el tiempo agotado quedan registrados de forma distinta a una respuesta incorrecta;
- el nivel global se acompaña de un rango probable y de un perfil desigual cuando corresponda;
- una discrepancia material entre habilidades activa una ruta de confirmación, no un promedio silencioso.

## Banco diagnóstico reservado

### Contrato mínimo por ítem

Cada ítem o testlet deberá declarar:

- `id`, `contentVersion`, idioma y estado de publicación;
- habilidad, subdominio y rango MCER candidato;
- fuente y procedencia editorial;
- estímulo, opciones y clave guardada solo en servidor;
- racional de la clave y de cada distractor;
- dependencia de conocimiento externo y carga cultural;
- estado de revisión lingüística y revisor;
- estado de exposición: `reserved`, `pilot`, `operational` o `retired`;
- parámetros empíricos cuando existan: muestra, dificultad, discriminación y omisión;
- tiempo observado, tasa de reproducción y comportamiento por dispositivo;
- advertencias de sesgo, historial de cambios y huella del contenido revisado.

### Piso para el MST v1

- 12 decisiones reservadas por nivel y por dimensión objetiva;
- 6 testlets de escucha por nivel, con 2–3 decisiones cada uno;
- 4 consignas paralelas de escritura por nivel;
- formas equivalentes suficientes para que dos intentos consecutivos no repitan contenido;
- ningún ítem operativo tomado directamente de una página pública de práctica sin una decisión explícita de exposición;
- claves, parámetros y racionales ausentes del payload público.

Este piso sirve para un MST. El CAT posterior exigirá un banco más profundo en las zonas de
corte y no se habilitará solo porque la función de selección exista.

### Fuentes que se curarán

1. **80 audios heredados:** primera opción para el banco reservado. Los 60 de inglés se
   recuperarán de Git; los 20 de italiano se conservarán para la expansión de ese idioma.
2. **Series de escucha actuales:** fuente de estructura, guion y controles de calidad; su
   exposición pública deberá marcarse y compensarse.
3. **IELTS, TOEFL y Cambridge:** fuente de formatos y candidatos de nivel alto; los masters
   largos se segmentarán y los ítems se reetiquetarán, no se copiarán ciegamente.
4. **ICFES:** fuente de decisiones A1–B1 de gramática, vocabulario y lectura, después de una
   revisión independiente del constructo MCER.
5. **Motores de práctica por habilidad:** fuente de formatos y taxonomía de errores, no de
   contenido operativo automáticamente reservado.

## Arquitectura objetivo

```text
diagnostic-bank (contenido público sin claves + registro privado de scoring)
        │
        ├── attempt-service ── genera intento, forma y orden
        │         │
        │         ├── adaptive-engine ── localizador, rama y confirmación
        │         └── scoring-service ── objetivo + escritura + confianza
        │
        ├── response-store ── respuesta, tiempo, versión, ruta y dispositivo
        ├── validation-pipeline ── calidad editorial + análisis de ítems
        └── result-profile ── cinco dimensiones + ruta WeLearn
```

### Límites de seguridad

- El navegador recibe identificadores y contenido, nunca claves ni parámetros privados.
- El servidor firma el intento y decide qué ítem puede responderse a continuación.
- Una respuesta solo se registra para el ítem y la versión servidos en ese intento.
- La corrección de escritura resuelve la consigna desde el banco del servidor.
- Reintentos, idempotencia y expiración se prueban antes de persistir resultados.
- El reporte conserva la versión exacta del banco y del motor que produjo la estimación.

## Plan de ataque por fases

### Fase 0 — Congelar contrato y proteger la línea base

Entregables:

- blueprint MCER por habilidad, nivel y subdominio;
- glosario de qué significa `nivel`, `perfil`, `confianza` y `consolidado`;
- snapshot reproducible del diagnóstico actual;
- pruebas que documenten sus defectos conocidos antes de sustituirlo;
- feature flag para que la versión nueva pueda convivir con la actual durante el piloto.

Puerta de salida:

- el equipo académico aprueba el blueprint y los usos permitidos del resultado;
- ninguna promesa pública llama certificación al diagnóstico;
- el catálogo protegido continúa pasando sin bajar umbrales.

### Fase 1 — Inventario y recuperación del banco

Entregables:

- inventario máquina-legible de todos los candidatos;
- recuperación verificable de los 60 audios heredados de inglés;
- registro de los 20 audios heredados de italiano ya presentes;
- duración, hash, guion, preguntas, exposición y estado técnico por audio;
- clasificación de cada ítem como reutilizable, reparable o descartado;
- separación entre banco público de práctica y banco reservado.

Puerta de salida:

- ningún archivo se considera recuperado sin hash y correspondencia con su guion;
- todos los audios candidatos decodifican y pasan auditoría técnica;
- cada pregunta tiene una única clave defendible y distractores revisados;
- los ítems reservados no son accesibles mediante una ruta pública de catálogo.

### Fase 2 — Modelo de datos y scoring servidor

Entregables:

- tipos de `DiagnosticItem`, `DiagnosticTestlet`, `DiagnosticAttempt` y `DiagnosticResponse`;
- registro privado de claves y parámetros;
- endpoints de crear intento, entregar siguiente etapa, registrar respuesta y finalizar;
- tablas o migraciones para intentos, respuestas, evaluaciones de escritura y versiones;
- scoring objetivo reutilizando los contratos seguros de IELTS/TOEFL donde corresponda;
- recibo de resultado idempotente y auditable.

Puerta de salida:

- inspeccionar el bundle del navegador no revela respuestas;
- alteraciones de `itemId`, versión, etapa o intento son rechazadas;
- dos entregas iguales no duplican ni cambian el resultado;
- existen pruebas de autorización, expiración, omisión y reintento.

### Fase 3 — Motor adaptativo multietapa

Entregables:

- selector balanceado por habilidad, subdominio, dificultad, exposición y contenido usado;
- localizador y tres ramas;
- reglas de confirmación para perfiles contradictorios;
- límites mínimos/máximos de longitud y tiempo;
- simulador que recorre perfiles sintéticos de A1 a C2 y patrones de error adversos;
- explicación auditable de por qué cada intento recibió cada etapa.

Puerta de salida:

- todos los puntajes posibles del localizador producen una ruta válida;
- ningún perfil recibe simultáneamente dos ramas incompatibles;
- acertar más nunca envía a una ruta más fácil;
- cada intento cumple los pisos de evidencia por habilidad;
- estrategias como marcar siempre A, elegir la opción más larga o no reproducir audio no permiten aprobar;
- el simulador detecta bancos agotados, rutas vacías y ciclos.

### Fase 4 — Experiencia de lectura, gramática, vocabulario y escucha

Entregables:

- runner accesible con navegación por etapas y guardado de borrador;
- reproductor de fragmentos diagnósticos, sin scrub hacia una transcripción o respuesta;
- testlets de escucha con reproducción y eventos medibles;
- soporte para MCQ, cloze, matching y respuesta breve cuando el constructo lo requiera;
- control de foco, teclado, lector de pantalla, móvil y recuperación tras recarga;
- cronómetro que registra evidencia sin convertir velocidad de conexión en nivel lingüístico.

Puerta de salida:

- historias completas de navegador pasan a 320, 390 y 1440 px;
- el flujo funciona solo con teclado;
- una interrupción o recarga no cambia la forma ni pierde respuestas;
- los fragmentos de audio empiezan y terminan donde declara el manifiesto;
- no se puede responder correctamente a escucha sin haber iniciado reproducción, salvo accesibilidad documentada.

### Fase 5 — Escritura diagnóstica MCER

Entregables:

- rúbrica `welearn-cefr-writing-v1` independiente de las escalas IELTS/TOEFL;
- consignas paralelas por nivel y dominio de uso;
- reutilización del pipeline de proveedores y fallbacks existente;
- validación estructural de criterios, citas de evidencia y rango de puntuación;
- cola de moderación humana para baja confianza, discrepancia o muestra de control;
- cálculo de gramática y vocabulario que combine evidencia objetiva y producción escrita sin contarla dos veces.

Puerta de salida:

- el motor no puede inventar una consigna enviada por el cliente;
- la rúbrica cita fragmentos reales de la producción;
- respuestas vacías, copiadas, fuera de tema o demasiado cortas se distinguen;
- la ausencia del proveedor no fabrica una puntuación;
- una muestra ancla tiene doble calificación humana y conserva ambas decisiones.

### Fase 6 — Reporte integral y ruta WeLearn

Entregables:

- estimación y confianza por las cinco dimensiones;
- nivel global conservador acompañado de perfil, no un promedio opaco;
- evidencia respondida, fortalezas, brechas y advertencias;
- recomendación concreta de práctica y curso por habilidad;
- PDF y resultado persistido con versión del banco y motor;
- lenguaje distinto para resultado provisional, calibrado y no estimado.

Puerta de salida:

- no aparece 0% para una habilidad sin evidencia;
- dos perfiles diferentes no producen el mismo texto genérico;
- la recomendación enlaza rutas existentes y válidas;
- cada cifra del reporte se reproduce desde el intento guardado;
- el PDF y la pantalla muestran las mismas estimaciones y advertencias.

### Fase 7 — Pilotaje y calibración

El piloto se ejecutará en tres oleadas, gobernadas por datos y no por fechas:

1. **Piloto técnico:** 30–50 intentos observados para detectar fallos de UX, audio y captura.
2. **Piloto académico:** participantes con nivel de referencia independiente y revisión de errores de clasificación.
3. **Piloto de campo:** continúa hasta que cada ítem operativo tenga muestra suficiente para análisis estable y todas las bandas objetivo estén representadas.

Entregables:

- dificultad, discriminación, omisión, tiempo y exposición por ítem;
- análisis de distractores y dependencia local dentro de testlets;
- fiabilidad global y por habilidad;
- acuerdo con clasificación independiente de tutores o prueba externa;
- test–retest con forma paralela;
- análisis de funcionamiento diferencial por variables disponibles y lícitas;
- acuerdo entre escritura automática y calificadores humanos;
- propuesta de cortes MCER mediante standard setting documentado;
- lista de ítems retirados, reparados o recalibrados.

El contrato ejecutable v3 materializa estas obligaciones en dieciséis gates. Diez se derivan del
informe agregado del piloto (aprobación de criterios, volumen, finalización, rutas, muestras,
calidad y distractores, escritura, referencia independiente y cobertura MCER). Los seis
restantes solo pasan con evidencia de medición especializada y vigente: fiabilidad adaptativa,
consistencia de clasificación, dependencia local de testlets, estabilidad, equidad/DIF y
standard setting. El archivo
`config/diagnostic/pilot-measurement-evidence.json` nace vacío y ligado a versión; una ausencia,
un hash de banco distinto, una versión de criterios vieja, procedencia sin hashes o una aprobación
sin tres roles independientes fuerza todos esos gates a `false`. El workflow privado usa una
lista cerrada de campos, revisiones específicas para academia, medición y privacidad, manifiesto
con hashes y registrador dry-run antes de permitir que el agregado llegue a la configuración.

La arquitectura sigue los principios —no umbrales numéricos universales— de los
[Standards for Educational and Psychological Testing](https://www.testingstandards.net/), el
[Manual for Language Test Development and Examining del Consejo de Europa/ALTE](https://www.coe.int/en/web/common-european-framework-reference-languages/developing-tests-examining),
las [guías de buena práctica de EALTA](https://ealta.eu/ealta-guidelines-for-good-practice-in-language-testing-and-assessment/)
y la guía del Consejo de Europa para [relacionar exámenes con el MCER](https://www.coe.int/en/web/common-european-framework-reference-languages/tests-and-examinations).

Puerta de salida:

- los criterios cuantitativos de publicación están congelados antes de mirar el resultado final;
- ningún ítem ambiguo o con discriminación inaceptable permanece operativo;
- las discrepancias de más de un nivel se investigan caso por caso;
- escritura alcanza el acuerdo mínimo aprobado con humanos;
- el reporte de validación explica población, muestra, limitaciones y usos permitidos;
- si la evidencia no alcanza, el producto conserva la etiqueta **orientativo**.

### Fase 8 — Lanzamiento controlado

Entregables:

- despliegue por feature flag y porcentaje controlado;
- panel de salud: finalización, abandonos, errores, audio, latencia y distribución de rutas;
- alertas por ítems anómalos y drift de dificultad;
- procedimiento de retirar un ítem sin invalidar intentos históricos;
- política de repetición, exposición y caducidad del resultado;
- documentación para tutores y comunicación al estudiante.

El control de porcentaje y el procedimiento de recuperación ya están implementados en
`src/server/diagnostic/production-rollout.ts` y
`docs/diagnostic-release-operations-runbook.md`. Su activación sigue bloqueada por los gates
humanos, editoriales, de audio, base real y piloto descritos arriba.

Puerta de salida:

- catálogo, TypeScript, build y suite diagnóstica pasan;
- revisión real de producción en escritorio y móvil pasa;
- no hay regresión sobre Nivel Radar, IELTS, TOEFL, SAT ni las 480 series;
- existe rollback por commit y la versión anterior permanece recuperable;
- el registro de producción identifica commit, deployment y rutas verificadas.

### Fase 9 — Evolución a CAT y expansión por idioma

Solo después de la calibración MST:

- estimación IRT/Rasch con selección por información y restricciones de contenido;
- parada por error estándar, además de pisos de evidencia;
- banco más profundo alrededor de los cortes A2/B1, B1/B2 y B2/C1;
- estudios de comparabilidad MST frente a CAT;
- incorporación de italiano, alemán, francés, portugués, ruso, coreano y japonés, uno por uno;
- repetición completa de revisión y calibración para cada idioma.

## Orden de implementación

```text
F0 contrato
  └─ F1 banco y audio
       ├─ F2 datos y scoring
       │    └─ F3 motor adaptativo
       │         ├─ F4 runner objetivo
       │         └─ F5 escritura
       │              └─ F6 reporte
       │                   └─ F7 piloto/calibración
       │                        └─ F8 lanzamiento
       │                             └─ F9 CAT + idiomas
       └─ revisión académica continua
```

No se empezará el diseño visual definitivo antes de cerrar F0–F2. Sí se podrán construir
verticales técnicos mínimos para probar los contratos.

## Suites y guardianes obligatorios

El trabajo añadirá, como mínimo:

- `check:diagnostic-bank`: cardinalidad, IDs, versiones, balance y exposición;
- `check:diagnostic-content`: claves, distractores, racionales, MCER y revisión;
- `check:diagnostic-audio`: archivo, hash, duración, segmento y decodificación;
- `check:diagnostic-adaptive`: rutas exhaustivas, monotonía, pisos y terminación;
- `check:diagnostic-security`: ausencia de claves públicas y manipulación de intentos;
- `check:diagnostic-report`: reproducibilidad de resultados y estados sin evidencia;
- tests de scoring objetivo y escritura;
- simulaciones de perfiles A1–C2 y estrategias adversas;
- historias E2E desktop, móvil, teclado, recarga, audio, abandono y reintento, ejecutadas sobre
  un servidor local de producción y distinguidas del recorrido autenticado real.

Además continúan siendo obligatorios:

```bash
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

## Riesgos y respuesta

| Riesgo | Respuesta del plan |
|---|---|
| Confundir contenido abundante con banco válido | revisión y parámetros por ítem antes de estado `operational` |
| Memorizar contenido público | banco reservado, exposición registrada y formas paralelas |
| Sobrevalorar escritura automática | doble calificación humana, anclas y moderación por confianza |
| Etiquetas MCER heredadas de otro examen | blueprint propio y standard setting; no crosswalk automático |
| Banco insuficiente en C1–C2 | segmentar y curar audio internacional, producir candidatos solo donde falte evidencia |
| Abandono por duración | MST, guardado, ejemplos no puntuados y análisis de tiempos reales |
| Sesgo por opción, longitud o posición | auditorías adversas y rotación determinista sin filtrar la clave |
| Pérdida de audio heredado | recuperación por Git, hashes y manifiesto antes de editar publicación |
| Inflación comercial de la promesa | estados `provisional`, `calibrated` y disclaimer obligatorio |
| Expandir idiomas demasiado pronto | inglés como referencia; un idioma nuevo solo entra con su propia puerta de validación |

## Evidencia que requerirá participación humana

El goal puede implementar y verificar toda la infraestructura, pero no puede fabricar estas
evidencias:

- aprobación del blueprint por una persona responsable académica;
- revisión lingüística identificada del banco operativo;
- participantes reales del piloto y su consentimiento aplicable;
- niveles de referencia independientes;
- doble calificación humana de la muestra de escritura;
- decisión institucional sobre el uso permitido del resultado.

Estas dependencias se prepararán con paquetes de revisión concretos. No se marcará el goal como
completo mientras una dependencia necesaria para la promesa de confiabilidad siga pendiente.

El banco reservado ya puede dividirse por nivel, habilidad, tipo y rol con
`npm run scaffold:diagnostic-bank-review -- --level=B1 --skill=reading`. Los archivos se crean
exclusivamente dentro de `.diagnostic-private/`, que está ignorado por Git. Dos recibos humanos
completados e independientes se compilan con `record:diagnostic-bank-approvals`; una decisión
`CHANGES_REQUESTED`, un hash obsoleto, una lista incompleta o dos roles firmados por la misma
identidad impiden la aprobación. Escucha añade obligatoriamente un tercer recibo de alineación.
El registrador es ahora dry run por defecto: solo admite recibos `*.completed.json` privados y un
checkout limpio, fija hashes de archivos y propuesta, conserva la unión auditada con aprobaciones
anteriores y requiere `--write`, operador y confirmación exacta para una escritura atómica. Así,
preparar o inspeccionar revisiones nunca promueve contenido accidentalmente.

El avance de los 24 lotes se inspecciona con
`npm run report:diagnostic-bank-review-progress`. El comando no modifica archivos ni expone
material reservado: reporta cobertura agregada por nivel/habilidad/rol y solo declara
`READY_TO_COMPILE` cuando cada lote tiene sus dos recibos completos, actuales, sin cambios
solicitados y firmados por identidades distintas. `-- --strict` permite usar esa misma condición
como puerta operativa cuando llegue el momento de compilar todos los lotes.

Una vez alcanzado ese estado, el lote completo se prepara con:

```bash
npm run record:diagnostic-bank-approvals -- \
  --review-root=.diagnostic-private/review-packets/english-bank-draft-1-batches \
  --manifest-version=english-diagnostic-approvals-v2
```

La salida sigue siendo una propuesta sin escritura. Solo su segunda ejecución con la confirmación
exacta, `--write` y un operador identificado puede actualizar el manifiesto.

## Definición de terminado del goal

El goal se cierra únicamente cuando:

1. existe un examen inglés A1–C2 desplegado con las cinco dimensiones;
2. las claves y parámetros privados permanecen en servidor;
3. el MST cumple balance, monotonía, mínimos de evidencia y terminación;
4. el banco operativo cumple los pisos, está versionado y tiene revisión lingüística;
5. los 60 audios heredados de inglés quedaron recuperados e inventariados y los candidatos usados pasan QA;
6. escritura usa la rúbrica MCER WeLearn y tiene evidencia de acuerdo humano;
7. cada resultado es reproducible desde respuestas y versiones persistidas;
8. el reporte muestra nivel/rango, confianza y las cinco habilidades sin promedios engañosos;
9. el piloto y el informe de validación justifican los usos publicados;
10. las suites diagnósticas, catálogo, TypeScript, build y E2E pasan;
11. producción está ligada a un commit de `main` y fue verificada en sus rutas reales;
12. quedan documentadas las limitaciones, monitoreo, rollback y ruta de expansión.

Si funciona técnicamente pero no ha pasado el piloto, el estado correcto será **producto piloto**,
no goal completo. Si pasa el piloto pero una habilidad carece de evidencia suficiente, esa
habilidad deberá declararse no estimada o el lanzamiento deberá mantenerse limitado.
