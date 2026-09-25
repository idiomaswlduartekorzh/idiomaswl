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

Actualizado el 24 de septiembre de 2026:

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
  reservadas —cuatro por nivel— en estado borrador, pendientes de aprobación lingüística.
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
- **Banco objetivo — primera tanda editorial:** 24 decisiones de escucha en inglés —12 A1 y
  12 B1, sobre seis audios distintos por nivel— reescritas a partir de audios recuperados. Las
  claves, racionales y huellas permanecen en servidor. Siguen en borrador y marcadas como audio
  previamente público; el selector bloquea cualquier contenido que no tenga exposición
  `reserved`, incluso si alguien cambia por error su estado a aprobado.
- **Escucha reservada — producción inferior preparada, no contabilizada:** hay 12 briefs
  originales A1–A2 —seis estímulos y doce decisiones por nivel— que usan el inventario
  recuperado únicamente como referencia agregada de duración y entrega. Permanecen en estado
  `production-brief`: no suman capacidad al banco. Un manifiesto vacío solo los materializa
  como borradores reservados cuando cada grabación nueva coincide con la versión de producción,
  duración, SHA-256 de audio, SHA-256 de transcripción y dos revisores de audio independientes;
  después todavía necesitan revisión lingüística, de evaluación y alineación para promoción.
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
- **Fase 6 — medición y reporte avanzados:** estimación IRT/EAP parametrizable, rango plausible,
  confianza, distinción de omisiones y retención del nivel global ante evidencia incompleta
  implementadas. El resultado persistido incluye ahora prioridades diferentes según el perfil,
  un objetivo MCER observable por habilidad y enlaces existentes de práctica/curso. La pantalla
  y el PDF se construyen desde las mismas estimaciones, rangos, recomendaciones y advertencias.
  La política provisional limita la confianza y nunca se presenta como calibrada.
- **Fase 7 — instrumentación de piloto iniciada:** criterios cuantitativos versionados y todavía
  pendientes de aprobación académica gobiernan un informe agregado de finalización, rutas,
  facilidad, omisión, tiempos, reproducción, selección de distractores, discriminación
  corregida, acuerdo de escritura y concordancia con nivel externo. El informe no contiene
  UUID de participante, texto escrito ni respuestas breves. La referencia independiente se
  registra mediante una mutación atómica exclusiva de administrador y el nivel diagnóstico se
  deriva del resultado terminado, no del formulario de referencia. Sin muestra real o sin
  criterios aprobados, la decisión es obligatoriamente `HOLD`. La migración y la ruta requieren
  todavía ejecución y verificación contra Supabase real.
- **Pruebas actuales:** la suite específica incorpora controles del inventario, seguridad de
  transición, idempotencia, bancos candidatos, recibos humanos y recuperación segura de
  borradores; el último corte local ejecutó **152 pruebas** y
  TypeScript compiló sin errores.

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
- historias E2E desktop, móvil, teclado, recarga, audio, abandono y reintento.

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
