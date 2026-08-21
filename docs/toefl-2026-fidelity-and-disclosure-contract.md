# TOEFL iBT 2026 — contrato de fidelidad A/B/C/D y disclosures

> `policy_id`: `toefl-fidelity-disclosure`
>
> `policy_version`: `2026-08-09.v1`
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `approved_at`: 9 de agosto de 2026
>
> `decision_status`: aprobado internamente para implementación y QA
>
> `implemented_status`: no implementado; T02 no modifica runtime
>
> `review_by`: 9 de septiembre de 2026, o antes de cualquier release TOEFL

Este documento cierra la decisión de producto T02 de
`docs/toefl-2026-alignment-loop.md`. Define qué significa cada nivel, qué evidencia
lo habilita y qué debe leer el estudiante. No convierte los sets actuales en un nivel
superior, no aprueba su contenido y no autoriza publicación, scoring, generación de
audio ni consumo de APIs.

## 1. Decisión central

La fidelidad y la validación son dos ejes distintos:

```text
fidelity_level     = alcance que la experiencia intenta reproducir (A/B/C/D)
validation_status  = evidencia real de que ese alcance funciona
```

Un ejercicio nivel A puede ser excelente. Un set con las cuatro habilidades puede ser
nivel B y, al mismo tiempo, estar bloqueado por defectos. Ningún rótulo A/B/C/D
sustituye auditoría editorial, técnica, humana, accesible o E2E.

Reglas de decisión:

1. Se asigna el nivel más bajo que todas las dimensiones pueden demostrar.
2. Evidencia ausente o caducada cuenta como requisito no cumplido.
3. El campo interno `format: 'toefl-2026'` sólo identifica una generación de datos;
   no demuestra nivel, calidad, completitud ni adaptatividad.
4. Un disclosure limita una promesa; nunca vuelve correcto un scoring roto, un ítem
   invisible, una respuesta perdida o una tarea oral sin captura.
5. “Alineado” significa concordancia documentada. Nunca significa oficial, afiliado,
   certificado o psicométricamente equivalente a ETS.

## 2. Línea base de claims antes de T02

Medición reproducida el 9 de agosto de 2026:

| Superficie | Medición | Diagnóstico |
|---|---:|---|
| Fuentes `toefl-set-*.ts` | 20/20 comentan “formato oficial vigente” | Claim interno excesivo. |
| Títulos de fuente | 20/20 incluyen “(Formato 2026)” | Fecha/formato se interpreta como fidelidad. |
| Catálogo `src/data/exams.ts` | 20 títulos + 20 badges “Formato 2026” | Claim visible ambiguo. |
| Conteo de catálogo | 20/20 muestran 42 | Contradice 57 fuente y 56 visibles. |
| Metadata de intento | 1 plantilla compartida | Para TOEFL afirma “simulacro completo” y “preguntas reales”. |
| Intro del runner | 2 claims principales | “Formato 2026” y “Formato oficial vigente”. |
| Resultados | 1 aviso de no oficialidad | Contradicho por Band 1–6, ≈/120 y claims de admisión. |
| Guía `/examenes/toefl` | 2 claims de “formato real/reproduce” | Los enlaces conducen a sets abreviados. |
| Árbol `/practica/toefl` | 35 archivos | Son prácticas de habilidad, no sets completos. |
| Separación oficial/WeLearn | 16/35 archivos | Patrón preservable y ampliable. |
| No oficialidad explícita | 9/35 archivos | Cobertura parcial. |
| Hub TOEFL legacy | 4 claims de score/tiempo antiguo | Incompatibles con el formato 2026 vigente. |

Fuentes internas de evidencia:

- `docs/toefl-2026-baseline-2026-08-09.md`;
- `docs/toefl-ibt-2026-official-format.md`;
- `src/data/exams.ts`;
- `src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`;
- `src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx`;
- `src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx`;
- `src/components/ExamReport.tsx`;
- `src/data/examGuides.ts`;
- `src/app/(site)/practica/toefl/`.

## 3. Los dos ejes obligatorios

### 3.1 `fidelity_level`

| Valor | Etiqueta canónica corta | Alcance |
|---|---|---|
| A | `Nivel A · Práctica de habilidad` | Una habilidad, tarea o estrategia acotada. |
| B | `Nivel B · Práctica abreviada` | Las cuatro habilidades con volumen o condiciones reducidas. |
| C | `Nivel C · Simulacro alineado no adaptativo` | Blueprint completo mediante ruta fija. |
| D | `Nivel D · Simulacro adaptativo completo WeLearn` | Nivel C más multietapa y rutas validadas. |

Las letras son metadata y apoyo de auditoría. El texto descriptivo nunca puede
ocultarse y es la parte que debe comprender el estudiante.

### 3.2 `validation_status`

| Valor | Significado | ¿Publicable como nivel declarado? |
|---|---|---|
| `legacy_unverified` | Existía antes del contrato y no pasó las auditorías | No para claims nuevos. |
| `audited_with_blockers` | Fue medido y tiene fallos críticos/altos abiertos | No; sólo acceso legado con advertencia y sin score inválido. |
| `in_review` | Está en revisión editorial/técnica/UX | No como validado. |
| `pilot` | Pasó QA de laboratorio y se prueba con alcance controlado | Sólo con rótulo “Piloto”. |
| `validated` | Cumple todos los gates de su nivel y evidencia vigente | Sí, con disclosures obligatorios. |
| `expired` | Fuente, contenido o QA superó su fecha de revisión | No hasta revalidar. |
| `retired` | Se conserva por trazabilidad, pero no admite intentos nuevos | No. |

El estado no se infiere del nivel. Una experiencia nivel C o D sin `validated` no se
presenta públicamente como simulacro terminado.

## 4. Matriz de aceptación por nivel

| Dimensión | A — habilidad | B — abreviada | C — completa fija | D — completa adaptativa |
|---|---|---|---|---|
| Cobertura | Una tarea/objetivo | Cuatro habilidades, volumen reducido | Cuatro secciones y doce familias; blueprint versionado completo | Todo C |
| Conteo | Exacto y visible para la actividad | Exacto por sección y total; nunca “completo” | Coincide con la forma fija declarada y registro oficial vigente | Coincide por cada ruta posible |
| Orden | Libre si se declara práctica | Puede ser libre/fijo; debe decirlo | R→L→W→S | R→L→W→S |
| Tiempo | Flexible o por ejercicio | Configuración local exacta y visible | Relojes por sección/tarea/respuesta alineados | Todo C por ruta |
| Navegación | Ayudas y reintento permitidos | Restricciones locales explícitas | Restricciones de Reading/Listening y cierre de módulos | Todo C + transición adaptativa irreversible |
| Adaptatividad | No aplica | Prohibido afirmarla | Expresamente no adaptativo | Dos etapas y enrutamiento versionado/validado |
| Interacción | Fiel a lo que afirma entrenar | Todo lo visible responde y progresa | Paridad fuente=render=scoring/reporte | Todo C en cada ruta |
| Audio | Sólo si la tarea lo necesita; QA aplicable | QA de todo audio incluido | Manifiesto y tres capas de QA aprobadas | Todo C por ruta/variante |
| Writing/Speaking | Feedback formativo; alcance visible | Captura real o se declara no evaluado | Captura/persistencia real y rúbrica responsable | Todo C |
| Resultado | Aciertos/dominio del objetivo | Diagnóstico parcial WeLearn; sin score compuesto inválido | Estimación WeLearn con metodología/versiones | Estimación WeLearn + ruta, nunca score ETS |
| E2E | Flujo de la actividad | Inicio, tareas incluidas y resultado | Recorrido completo fijo | Todas las rutas importantes |
| Label | Práctica de habilidad | Práctica abreviada | Simulacro alineado no adaptativo | Simulacro adaptativo completo WeLearn |

## 5. Condiciones detalladas

### 5.1 Nivel A — Práctica de habilidad

Debe cumplir:

- objetivo y familia de tarea visibles;
- instrucciones, respuesta y feedback coherentes;
- conteo real de unidades;
- ayudas/reintentos diferenciados de un modo examen;
- resultado limitado al objetivo practicado;
- revisión editorial, derechos y accesibilidad aplicables;
- si usa el nombre de una tarea oficial, su interacción debe ser fiel; si no lo es,
  debe decir “ejercicio de [habilidad] inspirado en…”.

Puede:

- incluir explicación inmediata, pistas, modelos y repetición;
- usar navegación libre y tiempo flexible;
- mezclar estrategias propias de WeLearn con una tarea actual claramente separadas.

No puede:

- llamarse simulacro completo;
- mostrar banda o score TOEFL;
- extrapolar un resultado de una tarea a una sección o al examen;
- presentar contenido original de WeLearn como pregunta oficial.

### 5.2 Nivel B — Práctica abreviada

Debe cumplir:

- incluye las cuatro habilidades, aunque reduzca volumen;
- enumera total y conteo por sección desde el renderer, no metadata manual;
- muestra duración y navegación reales de la experiencia;
- declara ruta fija/no adaptativa;
- identifica tareas no capturadas, no evaluadas o autoevaluadas;
- separa aciertos objetivos de reflexión/rúbricas abiertas;
- no produce overall, banda ni equivalencia 0–120 cuando las medidas no sean
  comparables;
- todas las interacciones incluidas deben funcionar; un fallo crítico cambia
  `validation_status` a `audited_with_blockers`.

Puede:

- conservar el reloj global y navegación de práctica si se divulgan con precisión;
- ofrecer porcentajes por familias objetivamente calificables;
- reducir resistencia y número de tareas.

No puede:

- usar “simulacro completo”, “formato real”, “formato oficial vigente” o
  “adaptativo”;
- afirmar que reproduce duración, score o condiciones oficiales;
- combinar autoevaluación y aciertos en una banda única;
- interpretar admisión universitaria desde el resultado local.

### 5.3 Nivel C — Simulacro alineado no adaptativo

Debe cumplir todo lo siguiente:

- cuatro secciones y doce familias del registro oficial vigente;
- composición versionada que explica scored/pretest y cualquier variación permitida;
- volumen defendible frente a 50 R, 47 L, 12 W y 11 S publicados en la versión
  oficial de referencia;
- ruta fija con módulos declarados y segundo módulo predeterminado, sin fingir
  selección por desempeño;
- orden, relojes, navegación, reproducción y transiciones alineados;
- fuente, UI, progreso, scoring y reporte sin pérdida;
- captura real de Writing/Speaking y manejo de permisos/errores;
- manifiesto de medios y las tres capas de QA completas;
- auditoría editorial, derechos, accesibilidad y E2E del recorrido completo;
- ninguna divergencia crítica o alta abierta que afecte la experiencia;
- scoring local versionado, transparente y sin equivalencia ETS.

No puede:

- usar “adaptativo”;
- ocultar que la ruta es fija;
- presentar estimaciones WeLearn como banda o puntaje ETS.

T23 es el primer gate que puede validar un Set 1 nivel C.

### 5.4 Nivel D — Simulacro adaptativo completo WeLearn

Debe cumplir todo C y además:

- Reading y Listening divididos en dos etapas reales;
- desempeño del primer módulo enruta un segundo módulo versionado;
- reglas, umbrales y casos límite reproducibles;
- rutas con cobertura y dificultad comparables;
- evidencia de anclas/calibración adecuada al estado del producto;
- no retorno a módulos cerrados y recuperación idempotente;
- pruebas E2E de cada ruta importante;
- registro de ruta en intento y resultado;
- monitoreo de exposición, funcionamiento diferencial y deriva;
- declaración permanente de que la adaptatividad y el scoring son de WeLearn.

No puede:

- usar “oficial”, “certificado por ETS” o “misma puntuación que TOEFL”;
- llamar adaptativo a orden aleatorio o a dificultad cambiada sólo por porcentaje
  bruto sin calibración;
- inferir que completar T25 concede equivalencia psicométrica.

T25 es el primer gate que puede validar un Set 1 nivel D.

## 6. Algoritmo de clasificación, downgrade y caducidad

### 6.1 Cálculo conservador

Evaluar estas dimensiones: `scope`, `volume`, `interaction`, `timing`, `navigation`,
`media`, `constructed_response`, `adaptivity`, `scoring`, `qa`, `disclosure`.

```text
fidelity_level = mínimo nivel demostrado por todas las dimensiones necesarias
release_allowed = validation_status == validated && disclosure_complete == true
```

No se promedia. Diez dimensiones verdes no compensan una crítica roja.

### 6.2 Reglas de downgrade

- D sin enrutamiento válido → C sólo si cumple íntegramente C; de lo contrario B/A.
- C sin volumen/una familia → B si mantiene cuatro habilidades; de lo contrario A.
- B sin las cuatro habilidades → A.
- C/D con fuente oficial vencida → `expired` hasta revalidar; el nivel histórico se
  conserva en el intento, pero no se usa para nuevos claims.
- C/D sin QA humano de audio → como máximo B para release.
- C/D sin captura real de Writing o Speaking → como máximo B.
- C/D con navegación o reloj no alineados → como máximo B.
- C/D con una tarea invisible o no calificable → no publicable y como máximo B al
  resolver su disclosure; el defecto sigue siendo bloqueador.
- C/D sin disclosure de no oficialidad → no publicable aunque el resto pase.

### 6.3 Fallos que un disclosure no puede aceptar

Los siguientes son `release_blocker`:

- clave o scoring contradice la interacción;
- objeto fuente omitido silenciosamente por el renderer/progreso;
- pérdida/corrupción de texto o audio del estudiante;
- progreso oral marcado sin respuesta cuando se afirma evaluar Speaking;
- exposición de secretos o datos personales;
- interacción esencial no operable por teclado o tecnología asistiva;
- archivo de audio roto o referencia ausente;
- claim de score oficial/equivalente sin validación.

## 7. Biblioteca canónica de disclosures

Los textos entre corchetes son variables de producto, nunca copy literal sin resolver.

### DS-000 — No afiliación, todos los niveles

> Material original de práctica creado por WeLearn. No está afiliado, aprobado ni
> certificado por ETS y no contiene una puntuación oficial TOEFL.

Ubicación: pie o bloque de alcance accesible en A; intro y resultados en B/C/D.

### DS-A-001 — Alcance nivel A

> Esta actividad practica [tarea/habilidad] y contiene [N] ejercicios. Permite
> [ayudas/reintento/tiempo flexible]. No reproduce una sección ni un examen completo.

### DS-A-002 — Resultado nivel A

> Resultado de esta actividad: [X]/[N]. Mide únicamente [objetivo] en este banco de
> WeLearn; no es una banda ni un score TOEFL.

### DS-B-001 — Alcance nivel B

> Práctica abreviada WeLearn de las cuatro habilidades. Contiene [N] actividades
> calificables ([R] Reading, [L] Listening, [W] Writing y [S] Speaking), menos volumen
> que el TOEFL iBT completo.

### DS-B-002 — Ruta, tiempo y navegación nivel B

> Usa una ruta fija [y navegación de práctica] con [descripción exacta del reloj]. No
> reproduce la selección adaptativa, los módulos ni todas las restricciones del examen.

### DS-B-003 — Evaluación nivel B

> Diagnóstico parcial de WeLearn. [Tareas objetivas] se calculan por aciertos;
> [tareas abiertas] son [no evaluadas/autoevaluadas/evaluadas con rúbrica local]. No se
> combinan como banda TOEFL ni predicen admisión.

### DS-B-004 — Estado actual de Speaking

> En esta versión Speaking no graba ni evalúa tu voz. Repeat e Interview funcionan
> como práctica receptiva/reflexiva y no aportan una puntuación oral.

### DS-B-005 — Omisión conocida de Reading

> El resultado visible excluye [N] actividad(es) que esta versión todavía no puede
> presentar correctamente. No uses este resultado como estimación de Reading.

DS-B-005 sólo describe acceso legado. DIV-011 sigue siendo bloqueador y debe
corregirse en T09/T13; no se acepta como solución permanente.

### DS-C-001 — Ruta fija nivel C

> Simulacro alineado no adaptativo de WeLearn, basado en el registro [versión].
> Reproduce el blueprint declarado con una ruta fija: el segundo módulo no cambia según
> tus respuestas.

### DS-C-002 — Resultado nivel C

> Estimación diagnóstica WeLearn [scoring_version], basada en [método y cobertura]. No
> usa el modelo psicométrico de ETS, no es una puntuación oficial y no garantiza un
> resultado en el examen real.

### DS-D-001 — Adaptatividad nivel D

> Simulacro adaptativo completo WeLearn [routing_version]. Tu primer módulo determina
> una de nuestras rutas del segundo módulo. Las rutas y el scoring son propios de
> WeLearn, no los sistemas adaptativos de ETS.

### DS-D-002 — Resultado nivel D

> Estimación diagnóstica WeLearn [scoring_version] para la ruta [route_id]. No es una
> banda o puntuación ETS ni establece equivalencia psicométrica con el TOEFL iBT.

### DS-LOCAL-001 — Regla pedagógica propia

> [Regla, por ejemplo objetivo de palabras] es una recomendación pedagógica de WeLearn,
> no una exigencia numérica publicada por ETS para esta tarea.

### DS-MEDIA-001 — Diferencia audiovisual

> Esta práctica conserva el estímulo de audio, pero no reproduce [contexto visual/
> video/variedad de voces] del examen. Esa diferencia limita su nivel de fidelidad.

### DS-EXTENDED-001 — Estímulo extendido

> Este estímulo es una práctica extendida y supera la longitud de referencia del
> formato actual; no pretende replicar la carga exacta de esa tarea.

## 8. Contrato de colocación por superficie

| Superficie | Contenido mínimo | Reglas de proximidad |
|---|---|---|
| Tarjeta/catálogo | Badge canónico + alcance breve + conteo real | Visible sin abrir modal ni tooltip. |
| SEO/metadata/OG | Tipo exacto; nada de “completo”, “real” o “preguntas reales” salvo evidencia | Mismo contrato aunque `robots.index=false`. |
| Intro antes de empezar | Nivel, N, tiempo, ruta/adaptación, scoring y DS-000 | Antes del CTA; no colapsado. |
| Topbar del intento | Etiqueta corta + modo | Persistente; no sólo color/icono. |
| Inicio de tarea afectada | Disclosure específico de reloj, captura o ayuda | Antes de responder; no después del resultado. |
| Confirmación de envío | Qué queda sin responder/no evaluado | Texto accesible y específico. |
| Resultados | Nivel, N respondidas/calificables, método, ruta, scoring version, DS-000 | Al lado del resultado principal, no en letra legal distante. |
| Lead/modal | Sólo el label diagnóstico autorizado | No guardar ni enviar un score prohibido. |
| Historial/export/share | Nivel y versión originales + no oficialidad | El disclosure viaja con la cifra. |
| Review | Intento cerrado, ayudas posteriores y elementos no puntuados | No permite confundir cambios posteriores con el intento. |

### 8.1 Accesibilidad del disclosure

- Texto en lenguaje directo, no sólo jerga A/B/C/D.
- No depender de color, icono, hover o audio.
- Legible con zoom y tecnología asistiva.
- El foco y orden de lectura encuentran alcance antes del botón de inicio.
- Cambios de ruta, reloj o estado se anuncian sin usar mensajes alarmistas.
- La traducción conserva el sentido “no oficial/no equivalente”; no se acorta hasta
  eliminar la limitación.

## 9. Diccionario de claims

### 9.1 Permitidos

- “Práctica de [habilidad/tarea] creada por WeLearn”.
- “Basada en las familias del formato TOEFL iBT vigente”, con fuente/fecha.
- “Práctica abreviada de las cuatro habilidades”.
- “Ruta fija/no adaptativa”.
- “Simulacro alineado no adaptativo”, sólo C validado.
- “Simulacro adaptativo completo WeLearn”, sólo D validado.
- “Aciertos”, “porcentaje local”, “feedback” o “estimación WeLearn” con metodología.

### 9.2 Prohibidos para contenido original de WeLearn

- “Simulacro oficial”, “formato oficial WeLearn” o “certificado por ETS”.
- “Preguntas reales” cuando no sean material oficial licenciado y atribuido.
- “Formato real” para A/B.
- “Simulacro completo” para A/B.
- “Adaptativo” para A/B/C.
- “Banda TOEFL”, “score TOEFL” o conversión `≈/120` desde porcentaje local.
- Claims de admisión como “100+ listo para universidades top” desde un diagnóstico.
- “Mismo nivel/dificultad/puntuación que ETS”.

### 9.3 Mención legítima de la fuente oficial

Sí se puede escribir “ETS describe el TOEFL iBT como…” o “la familia oficial se
llama…”, siempre que la frase describa la fuente y no transforme una actividad de
WeLearn en material oficial. El patrón “Formato oficial vs estrategia WeLearn” de las
páginas nuevas es válido cuando ambas partes son precisas y el alcance queda visible.

## 10. Clasificación aprobada del estado actual

### 10.1 Veinte sets `/examenes/toefl/practica/set-N`

| Campo | Decisión T02 |
|---|---|
| `fidelity_level` | B |
| Etiqueta futura | `Nivel B · Práctica abreviada` |
| Título futuro | `TOEFL iBT — práctica abreviada WeLearn · Set [N]` |
| `validation_status` | `audited_with_blockers` |
| Adaptatividad | Ninguna; ruta fija con navegación libre |
| Resultado permitido hoy | Aciertos de unidades objetivas válidas, separados por tarea; sin banda/overall/≈120 |
| Release blocker | DIV-010, DIV-011, oral sin captura y score compuesto inválido |
| Disclosures | DS-000, DS-B-001–005, DS-LOCAL-001, DS-MEDIA-001 cuando aplique |

La clasificación B reconoce que hay cuatro habilidades y que el banco debe
preservarse. No aprueba los sets para un claim B limpio: siguen bloqueados hasta que
T09/T11/T12–T19 resuelvan los defectos o retiren las mediciones inválidas.

Valores actuales exactos para la futura migración, calculados desde T00:

- 56 actividades atendidas por el cliente: 22 R, 17 L, 8 W y 9 S;
- 57 unidades fuente; un `multiselect` por set queda omitido;
- 86 minutos de reloj global;
- ruta fija/no adaptativa y navegación entre habilidades;
- Email/Discussion autoevaluados; Speaking no capturado;
- 260 MP3 presentes, todavía sin aprobación T04–T08.

### 10.2 Árbol `/practica/toefl`

- Clasificación por defecto: A.
- Las 16 páginas con “Formato oficial vs estrategia WeLearn” conservan ese patrón.
- Las páginas de familias actuales pueden usar el nombre oficial de la tarea sólo si
  la interacción concreta pasa su contrato.
- Habilidades legacy permanecen A y deben decir que son entrenamiento compatible, no
  una familia oficial independiente.
- El hub legacy que muestra 0–120, 18 minutos por pasaje y 10 preguntas por pasaje
  queda `audited_with_blockers` de copy; no hereda nivel C/D por hablar del examen.

### 10.3 Guía y catálogo `/examenes/toefl`

- La guía informativa no recibe A/B/C/D; sus CTAs y cards sí heredan el nivel del
  producto enlazado.
- “Simulacros con formato real” y “reproducen el formato” deben migrar a “prácticas
  abreviadas de las cuatro habilidades”.
- Cada card de los 20 sets debe mostrar B, 56 actividades atendidas y ruta fija; 42 es
  metadata obsoleta.
- El overview oficial del examen debe tomar sus números de T01, no inferirlos del set.

### 10.4 Metadata, reportes y persistencia

- La plantilla “simulacro completo/preguntas reales” no es válida para TOEFL B.
- El resultado actual no se salva ni comparte como “Overall Band” o `≈/120` cuando
  proviene de la fórmula lineal local.
- La advertencia pequeña de `ExamReport` no neutraliza labels, gráficas o textos de
  admisión contradictorios.
- T11 debe guardar `fidelity_level`, `validation_status`, `policy_version`,
  `official_registry_version`, `scoring_version` y `route_id` cuando aplique.

## 11. Mapeo de divergencias T01 a acciones/disclosures T02

| Divergencia | Nivel/estado actual | Disclosure/acción obligatoria | Unidad que resuelve |
|---|---|---|---|
| DIV-001 | B + blockers | DS-000, DS-B-001; retirar oficialidad | T02/T23/T25 |
| DIV-002 | Guía/catalog copy | Fuente T01; no nivel para guía | T02/T32 |
| DIV-003 | B + metadata errónea | DS-B-001 con conteo renderer | T03/T09 |
| DIV-004 | B | DS-B-002 | T10/T17–T19 |
| DIV-005 | B | DS-B-002 | T10 |
| DIV-006 | B | DS-B-002; no “adaptativo” | T24/T25 |
| DIV-007 | blocker de resultados | DS-B-003; retirar Band/≈120/admisión | T11/T23 |
| DIV-008 | blocker de resultados | DS-B-003/004; no overall | T11/T17–T19 |
| DIV-009 | B | DS-B-001 | T20/T23 |
| DIV-010 | release blocker | Disclosure no basta; corregir contrato | T09/T12 |
| DIV-011 | release blocker | DS-B-005 sólo acceso legado; corregir | T09/T13 |
| DIV-012 | A/B extendida | DS-EXTENDED-001 o reparar/segmentar | T05/T13 |
| DIV-013 | A/B extendida | DS-EXTENDED-001; preservar original | T05/T07/T15 |
| DIV-014 | B | DS-MEDIA-001 | T15/T20 |
| DIV-015 | A inspirado/B blocker | Nombrar ejercicio inspirado hasta corregir | T09/T16 |
| DIV-016 | B | DS-B-002 + DS-LOCAL-001 | T10/T17 |
| DIV-017 | B + oral no evaluado | DS-B-004 | T18 |
| DIV-018 | B + oral no evaluado | DS-B-004; notas no son preparación oficial | T19 |
| DIV-019 | B | DS-B-004 + DS-MEDIA-001 | T18/T19 |
| DIV-020 | Gobernanza | Este contrato + registro versionado | T32/T33 |

## 12. Contrato conceptual de datos para T09–T11

T02 no implementa schema, pero aprueba estos campos mínimos:

| Campo | Regla |
|---|---|
| `fidelity_level` | `A|B|C|D`; no derivar de `format`. |
| `validation_status` | Enum de 3.2. |
| `policy_version` | Versión de este contrato usada al iniciar el intento. |
| `official_registry_version` | Versión T01 que gobierna blueprint/claims. |
| `mode` | `learn|practice|exam_fixed|exam_adaptive|review`. |
| `adaptivity` | `none|fixed_modules|multistage`; coherente con nivel. |
| `counts` | Fuente, visible, calificable y respondida por sección. |
| `timing_model` | Global/sección/tarea/pregunta/respuesta, con versión. |
| `scoring_version` | Obligatorio si se muestra cualquier cifra evaluativa. |
| `route_id` | Obligatorio en D; `fixed` explícito en C. |
| `disclosure_ids` | Textos resueltos y presentados en cada superficie. |
| `review_by` | Caducidad de evidencia oficial/QA. |

La implementación debe fallar cerrada: ausencia de nivel o disclosure impide un claim
de simulacro; no debe asumir C/D por compatibilidad retroactiva.

## 13. Auditorías de T02

1. **Full-stack/datos/repositorio — pasa para contrato.** Se mapearon datos, catálogo,
   metadata, intro, intento, reporte, persistencia conceptual y superficies de
   práctica. No se modificó runtime ni cambios concurrentes.
2. **TOEFL vigente — pasa.** Los criterios derivan de las 48 reglas del registro
   `2026-08-09.v2`; C/D exigen orden, volumen, tiempo, navegación y alcance correcto.
3. **Editorial/instruccional — pasa.** Los labels describen alcance, no calidad; el copy
   distingue práctica, diagnóstico y examen, y no confunde dificultad con volumen.
4. **Audio — no aplica a aprobar assets.** Ningún MP3 cambió. La ausencia de QA limita
   C/D y DS-MEDIA/DS-EXTENDED explican diferencias sin justificar regeneración.
5. **Multiperspectiva/derechos — pasa.** DS-000 evita afiliación; “preguntas reales” se
   prohíbe para contenido propio; el lenguaje no presupone universidad, nacionalidad,
   discapacidad ni acceso a micrófono.
6. **UI/UX/accesibilidad — pasa como contrato de copy.** Define proximidad, persistencia,
   lenguaje directo, lectura asistiva y no dependencia del color. No certifica la UI
   actual, que permanece abierta en implementación.
7. **Playwright — no aplica.** T02 no cambia superficies renderizadas. La futura
   implementación debe probar tarjeta→intro→intento→resultado y disclosure persistido.

## 14. Gate de salida T02

| Criterio | Resultado |
|---|---|
| Cuatro niveles con límites inequívocos | Pasa: secciones 3–5. |
| Condiciones y evidencia por nivel | Pasa: matriz y requisitos detallados. |
| Regla conservadora/downgrade | Pasa: sección 6. |
| Disclosures canónicos | Pasa: 15 IDs en sección 7. |
| Colocación UI/SEO/resultado | Pasa: sección 8. |
| Claims permitidos/prohibidos | Pasa: sección 9. |
| Estado actual clasificado | Pasa: sets B con blockers; prácticas A. |
| DIV-001–020 cubiertas | Pasa: mapeo completo en sección 11. |
| Código, contenido y audio preservados | Pasa: unidad exclusivamente documental. |

Estado T02: **cerrable**. Próxima primera unidad elegible: T03 — inventario editorial
de los 20 sets.

## 15. Historial

| Versión | Fecha | Cambio |
|---|---|---|
| `2026-08-09.v1` | 2026-08-09 | Contrato inicial aprobado: dos ejes, cuatro niveles, 15 disclosures, clasificación actual y mapeo de 20 divergencias. |
