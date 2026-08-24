# TOEFL iBT 2026 — plan maestro de expansión futura a 100 simulacros

> Estado: **planificación aprobable; ejecución no autorizada**
> Fecha de corte: **23 de agosto de 2026**
> Producto actual: **20 simulacros alineados no adaptativos de ruta fija**
> Destino recomendado: **100 simulacros adaptativos completos WeLearn, versionados y auditables**
> Owner de producto y derechos: **José David Duarte Silva**

Este documento deja preparado el camino para ampliar el producto TOEFL cuando el
owner lo autorice. No crea Sets 21–100, no modifica los veinte sets existentes, no
genera audio, no consume APIs, no cambia scoring, no toca pagos y no autoriza un
despliegue.

La ejecución futura debe empezar por el primer gate pendiente de este documento. No
se permite saltar directamente a escribir mocks o producir MP3.

## 1. Decisión ejecutiva

No se construirán ochenta archivos monolíticos copiando el patrón actual. Antes de
crear contenido se construirá una fábrica parametrizada y un banco versionado.

El estudiante podrá seguir viendo `Simulacro 1` a `Simulacro 100`, pero internamente
cada simulacro será un manifiesto inmutable que referencia:

- un router de Reading;
- un módulo inferior y uno superior de Reading;
- un router de Listening;
- un módulo inferior y uno superior de Listening;
- una forma lineal de Writing;
- una forma lineal de Speaking;
- versiones de routing, scoring, rúbricas y audio.

Los Sets 1–20 actuales permanecen publicados y recuperables como formas fijas. No se
transforman silenciosamente: una futura versión adaptativa tendrá un nuevo
`form_version` y preservará todos los intentos históricos.

## 2. Qué significa “100 simulacros”

El objetivo no es tener cien botones que repitan contenido. Para aprobar la expansión
deben existir cien formas visibles con identidad y evidencia propias.

Cada forma debe demostrar:

1. composición completa y versionada;
2. rutas adaptativas reproducibles en Reading y Listening;
3. Writing y Speaking lineales completos;
4. ausencia de reutilización no declarada;
5. claves privadas y scoring del lado servidor;
6. medios presentes, aprobados e inmutables;
7. revisión editorial, factual, de derechos y accesibilidad;
8. E2E de las rutas importantes;
9. trazabilidad del intento y del resultado;
10. disclosure permanente de que el contenido, routing y scoring son de WeLearn.

“100 simulacros” no significa cien equivalencias psicométricas ETS. El claim máximo
permitido seguirá siendo una simulación original de WeLearn basada en la estructura
vigente, nunca examen oficial, afiliación o certificación ETS.

## 3. Fuentes oficiales que deben revalidarse antes de ejecutar

El snapshot de planificación usa las siguientes fuentes:

- [ETS — Test Content and Structure](https://www.ets.org/content/ets-org/ca/en/toefl/test-takers/ibt/about/content.html);
- [ETS — Test Blueprint and Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf);
- [ETS — Test Overview and Scoring Guides](https://www.ets.org/pdfs/toefl/toefl-ibt-test-overview.pdf);
- [ETS — Understanding Scores](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html);
- las dos experiencias full-length y el sample interactivo vigentes que ETS publique
  cuando comience la ejecución.

Antes de iniciar contenido debe registrarse `source_checked_at`, URLs, hashes de los
PDF y diferencias frente a este snapshot. Si ETS cambia tareas, conteos, tiempos,
rúbricas o administración, primero se actualiza el contrato; no se adapta contenido a
memoria.

Snapshot al 23 de agosto de 2026:

| Sección | Familias | Referencia operacional publicada |
|---|---|---:|
| Reading | Complete the Words; Read in Daily Life; Read an Academic Passage | hasta 50; dos etapas |
| Listening | Choose a Response; Conversation; Announcement; Academic Talk | hasta 47; dos etapas |
| Writing | Build a Sentence ×10; Email ×1; Academic Discussion ×1 | 12; lineal; ~23 min |
| Speaking | Listen and Repeat ×7; Take an Interview ×4 | 11; lineal; ~8 min |

Reading y Listening pueden incluir ítems no puntuados. El número y tiempo pueden
variar por ruta. La división exacta por módulo no se inventará donde ETS no la publique:
se fijará una composición WeLearn defendible, se declarará y se validará.

## 4. Línea base que se preserva

Los veinte sets actuales ya aportan:

- 40 Reading, 34 Listening, 12 Writing y 11 Speaking por set;
- 97 interacciones y ocho etapas fijas por set;
- las doce familias vigentes;
- claves objetivas privadas;
- 400 audios de release, además de los medios heredados conservados;
- captura de dos textos y once grabaciones;
- corrección de Reading, Listening y Build en servidor;
- dos reportes de Writing y cierre humano de Speaking;
- navegación, relojes, persistencia, accesibilidad y disclosures;
- guardianes, pruebas, manifiesto de audio y auditoría de producción.

Fuentes internas canónicas:

- `docs/toefl-2026-sets1-20-release-audit-2026-08-14.md`;
- `docs/toefl-2026-fidelity-and-disclosure-contract.md`;
- `docs/toefl-2026-review-blueprint.md`;
- `docs/toefl-2026-audio-release.md`;
- `docs/toefl-2026-alignment-loop.md`.

Ninguna fase futura puede rebajar los guardianes que protegen esta línea base.

## 5. Bloqueos actuales para escalar

La implementación actual fue cerrada deliberadamente alrededor de veinte sets:

- el guardián de revisión exige exactamente 20 blueprints;
- el bridge servidor importa exactamente `set-1` a `set-20`;
- Reading y Listening se agrupan en lotes `1–5`, `6–10`, `11–15`, `16–20`;
- varios checkers recorren `for setNumber = 1; setNumber <= 20`;
- el release de audio acepta sólo carpetas `set-1` a `set-20`;
- el manifiesto espera 400 archivos y 20 archivos nuevos por set;
- el catálogo y el índice público tienen veinte entradas explícitas;
- no existe matriz editorial para Sets 21–100;
- no existe control global de similitud diseñado para cien formas;
- no existe todavía routing adaptativo validado ni calibración empírica.

Por diseño, añadir hoy `set-21` debe fallar. El primer trabajo futuro será quitar esos
límites mediante configuración central, no bajar o silenciar aserciones.

## 6. Arquitectura destino

### 6.1 Banco canónico

El banco debe separar cinco entidades:

```text
stimulus -> item -> module -> route -> form_manifest
```

- `stimulus`: texto, audio o escenario compartido por uno o más ítems.
- `item`: interacción calificable o pretest con clave/rúbrica privada.
- `module`: composición ordenada con skill, dificultad y tiempo.
- `route`: router + módulo inferior/superior y reglas de transición.
- `form_manifest`: forma visible e inmutable que une R, L, W y S.

No se ensamblará contenido distinto en cada recarga. La fábrica puede proponer una
forma, pero al publicarla congela el manifiesto para que el intento sea reproducible.

### 6.2 Identidad y versiones obligatorias

Cada intento debe guardar como mínimo:

```text
mock_id
form_version
blueprint_version
routing_version
scoring_version
rubric_version
content_release_id
audio_release_sha
reading_route_id
listening_route_id
started_at
submitted_at
```

Una corrección editorial posterior crea versión; nunca cambia el significado de un
resultado histórico.

### 6.3 Registro único

Debe existir un registro central `TOEFL_FORMS` o equivalente. Catálogo, imports,
scoring, review, sitemap, auditorías y audio derivan de ese registro.

Agregar una forma no puede requerir editar manualmente cinco listas independientes.
El guardián debe comprobar que todas las superficies contienen exactamente el mismo
conjunto de `mock_id` y versiones.

### 6.4 Adaptación

Reading y Listening usarán dos etapas reales:

1. todos reciben el router de la forma;
2. el resultado del router se calcula con claves privadas;
3. una regla versionada elige `lower` o `upper`;
4. el módulo cerrado no vuelve a abrirse;
5. recarga y reintento restauran exactamente la misma ruta;
6. la ruta queda almacenada y acompaña el resultado.

Orden aleatorio o porcentaje bruto sin calibración no cuenta como adaptatividad
validada. Puede existir inicialmente un `pilot_routing_version`, rotulado como piloto,
pero no se eleva a producto validado hasta completar la fase psicométrica.

### 6.5 Compatibilidad

- Sets 1–20 fijos conservan sus URLs e intentos.
- Una versión adaptativa se publica como versión nueva del producto, no como mutación.
- El panel puede distinguir `fixed-v1` y `adaptive-v1`.
- Los reportes históricos conservan el disclosure original.
- No se regeneran ni renombran los 400 audios ya liberados.

## 7. Matriz editorial maestra

Antes de redactar Set 21 debe existir un inventario para las formas pendientes. Cada
fila de estímulo o ítem incluirá:

| Campo | Propósito |
|---|---|
| `content_id` y versión | identidad estable |
| set, sección, etapa y ruta | colocación exacta |
| familia oficial | cobertura del blueprint |
| target CEFR | dificultad prevista |
| dificultad editorial | lower/router/upper |
| subskill/evidence statement | qué mide |
| contexto | académico, social o navegacional |
| tema y subtema | diversidad y exposición |
| fuente factual | verificación |
| autor y revisores | procedencia |
| estado de derechos | publicación permitida |
| fingerprint de similitud | control de duplicados |
| clave y distractor rationale | scoring privado |
| media ID, guion y casting | producción audiovisual |
| estado QA | gate actual |

La matriz debe balancear disciplinas, campus/daily life, género de voces, acentos,
roles, complejidad lingüística, posición de respuesta y dificultad. Ninguna sola
dimensión puede definir “upper”: la clasificación debe considerar lenguaje, inferencia,
distractores, densidad, velocidad y carga de memoria según la familia.

## 8. Política de originalidad y exposición

Con cien formas, la revisión manual de duplicados no basta. Antes de release se debe
comparar el candidato contra todo lo publicado y todo lo pendiente:

- coincidencia literal y normalizada;
- n-gramas y similitud semántica;
- tema + estructura + conclusión;
- preguntas, opciones y rationales;
- prompts de Email/Discussion;
- guiones Choose, Conversation, Announcement y Talk;
- Repeat e Interview;
- reutilización de nombres, cifras y escenarios.

Umbrales exactos serán versionados después de medir el banco actual. Un hallazgo alto
se adjudica manualmente. El checker no decide procedencia por sí solo.

Debe existir además control de exposición por usuario. El sistema evita ofrecer una
forma ya completada cuando hay alternativas y registra qué `content_id` vio cada
persona. Nunca cambia una forma cerrada para esconder exposición.

## 9. Audio: contrato de costo y calidad

No se compra audio mientras el lote escrito no haya pasado:

1. blueprint;
2. revisión editorial y factual;
3. originalidad;
4. casting;
5. contraste texto↔clave;
6. aprobación del owner del manifiesto y costo.

La factura seca debe derivarse del banco:

```text
créditos_estimados = caracteres_facturables × tarifa_del_modelo
costo_estimado = créditos_estimados × costo_por_crédito
techo_aprobado = costo_estimado + reserva_selectiva
```

No se presupone “20 audios por set” para Sets 21–100: ese número provino de reutilizar
medios de los sets existentes. Una forma nueva calculará todos sus medios desde el
manifiesto aprobado.

La generación futura conservará la tubería existente:

- dry-run por defecto;
- hashes de guion y configuración;
- destino temporal fuera de `public/`;
- normalización;
- auditoría automática y Whisper;
- reescucha/revisión humana selectiva;
- release inmutable con SHA;
- regeneración sólo de archivos rechazados.

La clave del proveedor nunca se pega en documentos o chats ni se versiona. Se usa un
secreto local/proveedor autorizado.

## 10. Scoring y psicometría

### 10.1 Estados permitidos

| Estado | Qué puede mostrar |
|---|---|
| laboratorio | aciertos y rúbricas internas; no público |
| piloto | estimación WeLearn experimental con disclosure |
| calibrado | estimación WeLearn versionada y rango de incertidumbre |
| validado | scoring WeLearn con evidencia vigente y monitoreo |

Ningún estado produce “score oficial ETS”.

### 10.2 Datos necesarios

El psicometrista aprobará antes del piloto:

- modelo y tamaño de muestra;
- anclas entre formas y rutas;
- tratamiento de pretest;
- reglas iniciales de routing;
- exclusiones de respuestas inválidas;
- análisis de dificultad y discriminación;
- equivalencia lower/upper;
- funcionamiento diferencial y fairness;
- método para vincular Writing/Speaking;
- criterio de estabilidad y recalibración.

Un piloto de ingeniería detecta bugs, pero no concede calibración. No se fija aquí un
número universal de candidatos: quedará en un protocolo firmado por el psicometrista
según modelo, rutas y cobertura. La expectativa operativa es recolectar cientos de
respuestas útiles por familia/ítem y miles de intentos acumulados para una evidencia
robusta.

### 10.3 Writing y Speaking

- conservar rúbricas separadas por tarea;
- doble calificación en una muestra y adjudicación de desacuerdos;
- medir acuerdo entre evaluadores;
- construir un corpus consentido y anonimizado;
- validar cualquier corrector automático contra evaluadores, no contra sí mismo;
- reportar incertidumbre y fallos de procesamiento;
- mantener revisión humana disponible para QA y apelación interna.

## 11. Equipo mínimo y decisiones humanas

| Rol | Responsabilidad no delegable |
|---|---|
| Owner — José David Duarte Silva | alcance, presupuesto, claims y release |
| Responsable editorial TOEFL | blueprint, dificultad, instrucciones y calidad |
| Segundo revisor | revisión independiente y adjudicación editorial |
| Psicometrista | routing, anclas, muestra, scoring, fairness y deriva |
| Evaluadores W/S | corpus, acuerdo y adjudicación |
| Audio QA | casting, inteligibilidad, edición y aprobación |
| Accesibilidad | teclado, lector de pantalla, zoom y acomodaciones |
| Ingeniería | banco, runtime, seguridad, persistencia, pruebas y operación |

La expansión industrial no puede dispensar revisión independiente y a la vez prometer
fidelidad máxima. Si un rol no está disponible, el lote permanece `in_review` o
`pilot`; no se maquilla con un disclosure.

## 12. Fases de ejecución futura

### Fase 0 — Revalidación y autorización

Entregables:

- fuentes ETS revalidadas;
- diff del blueprint;
- alcance fijo/adaptativo confirmado;
- responsables y presupuesto nombrados;
- permisos de tratamiento de datos piloto.

Gate: acta del owner. Sin acta no se modifica runtime ni contenido.

### Fase 1 — Fábrica parametrizada, cero contenido nuevo

Entregables:

- registro único de formas;
- schemas de banco/manifiesto/ruta;
- imports y APIs derivados;
- checkers `1..N` basados en registro, sin números mágicos;
- reporte de paridad entre superficies;
- los veinte sets actuales pasan sin cambios de contenido ni audio.

Gate: catálogo, TypeScript, pruebas TOEFL, guardianes globales y build completos.

### Fase 2 — Set 1 adaptativo oro

Entregables:

- router y ramas lower/upper de R/L;
- W/S lineales preservados;
- routing piloto reproducible;
- intento versionado y restaurable;
- scripts de audio pendientes, todavía sin TTS;
- pruebas de todas las rutas.

Gate editorial y técnico antes de cualquier audio.

### Fase 3 — Audio y piloto controlado del Set 1

Entregables:

- manifiesto y costo aprobados;
- sólo medios nuevos del Set 1;
- release QA;
- preview protegido;
- protocolo de datos y monitoreo;
- piloto rotulado, sin claim de validación.

Gate: UX, accesibilidad, seguridad y revisión humana.

### Fase 4 — Calibración

Entregables:

- análisis de ítems y rutas;
- umbrales revisados;
- equivalencia y anclas;
- análisis de fairness;
- `routing_version` y `scoring_version` candidatos;
- dictamen del psicometrista.

Gate: Set 1 puede pasar de piloto a validado o volver a contenido.

### Fase 5 — Migración versionada de Sets 2–20

Se ejecutará en lotes pequeños. Cada set reutiliza la fábrica aprobada, no copia el
runtime. Los fijos permanecen disponibles mientras se validan las nuevas versiones.

Gate por lote: contenido, rutas, audio, E2E, scoring y preview.

### Fase 6 — Producción de Sets 21–100

Orden recomendado:

```text
21–25 -> 26–30 -> ... -> 96–100
```

Cada lote de cinco pasa el ciclo completo antes de abrir el siguiente. Se puede pausar
sin dejar contenido parcialmente publicado. El tamaño de lote sólo cambia mediante
acta si la capacidad editorial y de audio demuestra que otro tamaño es más seguro.

### Fase 7 — Release y monitoreo

- integración desde `main` actualizado;
- guardianes completos sin rebajar umbrales;
- preview y recorrido humano;
- producción sólo desde `main`;
- smoke de cien rutas y rutas adaptativas representativas;
- monitoreo de errores, exposición, abandono, deriva y discrepancias de scoring.

## 13. Gates por lote

Un lote no puede avanzar si falla cualquiera de estas puertas:

1. **Fuente oficial:** snapshot vigente y diferencias resueltas.
2. **Composición:** familias, conteos, etapas, tiempos y rutas exactos.
3. **Editorial:** instrucciones, claves, distractores, dificultad y lenguaje.
4. **Factual:** fuentes primarias o autorizadas registradas.
5. **Originalidad/derechos:** autoría, similitud y procedencia adjudicadas.
6. **Scoring privado:** ninguna clave en cliente; paridad fuente→UI→servidor.
7. **Audio:** manifiesto exacto, archivos presentes, QA y SHA.
8. **Runtime:** navegación, timers, recarga, cierre e idempotencia.
9. **Construidas:** textos y grabaciones conservados sin pérdida.
10. **Accesibilidad:** teclado, foco, lector, zoom, contraste y estados.
11. **Seguridad:** permisos, rate limit, URLs privadas y datos piloto.
12. **E2E:** lower/upper, errores de medio, abandono, recarga y entrega.
13. **Psicometría:** requisito según estado piloto/calibrado/validado.
14. **Operación:** rama actualizada, catálogo, TypeScript y build.
15. **Humano:** owner y revisores requeridos firman el gate.

Un disclosure nunca convierte en aceptable una clave incorrecta, pérdida de respuesta,
audio roto, ruta no reproducible o scoring sin evidencia.

## 14. Controles de costo y capacidad

Antes de cada lote se genera una factura seca con:

- número de estímulos, ítems, rutas y formas;
- caracteres TTS por voz/modelo;
- costo del primer pase y reserva de correcciones;
- horas editoriales y de revisión;
- minutos esperados de QA humano;
- almacenamiento y transferencia de audio de examen y respuestas;
- carga estimada del panel de revisión;
- impacto en build y número de rutas.

Si la factura supera el techo aprobado, se pausa. No se cambia a un modelo de menor
calidad ni se recorta QA sin nueva decisión del owner.

## 15. Stop conditions

La expansión se detiene si ocurre cualquiera de estas condiciones:

- ETS cambia el formato y el contrato no fue actualizado;
- `main` no está incorporado o el catálogo protegido retrocede;
- un lote no tiene segundo revisor o responsable psicométrico cuando corresponde;
- similitud o procedencia queda sin adjudicar;
- las ramas lower/upper no son comparables;
- se pierden respuestas tras recarga o cambio de ruta;
- un medio no coincide con su guion;
- se exponen claves, tokens, audios privados o datos personales;
- el costo de TTS no tiene aprobación;
- una prueba se silencia o su umbral se reduce para publicar;
- Vercel no construye desde un commit verificable de `main`;
- el claim público supera la evidencia del lote.

## 16. Definición de terminado en 100

El programa llega a cien sólo cuando:

- el registro canónico contiene cien formas publicables;
- cada forma tiene manifiesto y versiones completas;
- los veinte sets históricos siguen recuperables;
- todas las rutas lower/upper requeridas pasan E2E;
- ningún set depende de una lista manual olvidada;
- claves públicas = 0;
- medios faltantes = 0;
- respuestas construidas perdidas = 0;
- duplicaciones altas sin adjudicar = 0;
- lotes sin revisión requerida = 0;
- catálogo, APIs, review, sitemap y reportes coinciden;
- scoring y routing muestran su versión y estado de validación;
- el manifiesto de audio coincide con disco/storage y SHA;
- auditoría productiva devuelve cien rutas válidas;
- el claim visible sigue siendo original WeLearn, no oficial ETS.

## 17. Claims autorizables al final

Claim objetivo:

> Simulacros adaptativos originales de WeLearn diseñados para representar fielmente
> la estructura, las tareas, los tiempos, la navegación y las condiciones generales
> del TOEFL iBT vigente. La adaptación y la estimación de resultados utilizan modelos
> propios de WeLearn. No son exámenes oficiales ni están afiliados o avalados por ETS.

Este texto sólo puede usarse para formas adaptativas validadas. Durante piloto debe
decir “piloto adaptativo”. Las formas fijas conservarán su disclosure actual.

## 18. Checklist de arranque futuro

- [ ] Owner autoriza iniciar expansión.
- [ ] Fuentes ETS revalidadas y archivadas por hash.
- [ ] Objetivo adaptativo confirmado.
- [ ] Segundo revisor y psicometrista asignados.
- [ ] Protocolo de datos piloto aprobado.
- [ ] Fábrica parametrizada aprobada sin contenido nuevo.
- [ ] Sets 1–20 pasan sin regresiones.
- [ ] Set 1 adaptativo escrito y auditado.
- [ ] Manifiesto de audio Set 1 aprobado.
- [ ] Piloto Set 1 completado.
- [ ] Routing/scoring calibrados o claramente rotulados como piloto.
- [ ] Migración 2–20 aprobada.
- [ ] Primer lote 21–25 autorizado.

Todas las casillas permanecen abiertas al crear este documento. El plan existe; la
ejecución no ha empezado.

## 19. Loop prompt para la ejecución futura

Copiar este prompt sólo cuando José David Duarte Silva autorice comenzar:

```text
Trabaja sobre el plan canónico:
docs/toefl-2026-expansion-to-100-plan.md

Objetivo de esta iteración:
1. Lee completamente el plan, OPERACION-REPOSITORIO.md, AGENTS.md, CLAUDE.md y los
   contratos TOEFL enlazados.
2. Actualiza origin/main y crea una rama/worktree aislados.
3. Identifica el primer gate abierto cuya entrada esté satisfecha.
4. Ejecuta únicamente esa unidad; no adelantes contenido, audio, pagos o producción.
5. Conserva Sets 1–20, sus IDs, intentos, audios y guardianes.
6. No bajes umbrales ni conviertas números hardcodeados en silencios: reemplázalos por
   invariantes derivados del registro canónico.
7. Antes de TTS presenta manifiesto, voces, modelo, caracteres, costo, techo y muestra.
8. Registra evidencia, decisiones, riesgos y siguiente gate en este documento o en el
   acta de lote enlazada.
9. Ejecuta guardianes TOEFL, catálogo, TypeScript y build proporcional al riesgo.
10. Incorpora el main más reciente y repite guardianes antes de integrar.

Al terminar informa en lenguaje sencillo:
- qué quedó realmente cerrado;
- qué no se tocó;
- evidencia y pruebas;
- costo consumido;
- primer gate siguiente;
- si el producto continúa fijo, piloto, calibrado o validado.

Nunca describas como oficial, equivalente a ETS o validado algo que el plan mantenga
en piloto o sin evidencia.
```

## 20. Registro de decisiones

### 2026-08-23 — Plan preparado, expansión diferida

- El owner indicó que no desea crear más mocks por ahora.
- Se documenta el camino a cien sin cambiar producto, contenido, audios o runtime.
- Se preservan los veinte sets como base estable.
- La recomendación queda fijada: fábrica parametrizada y Set 1 adaptativo oro antes
  de producir Sets 21–100.
- Estado de ejecución: **no iniciada**.
