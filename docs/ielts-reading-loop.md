# IELTS Academic Reading — plan maestro y loop autónomo de construcción

> Estado inicial: especificación de producto, pedagogía y auditoría. Este documento no afirma que la sección esté terminada.
>
> Última línea base revisada: 9 de agosto de 2026.

## Prompt para iniciar o reanudar el loop

```text
/loop Continúa la construcción y el cierre de IELTS Academic Reading siguiendo
docs/ielts-reading-loop.md. Lee primero docs/OPERACION-REPOSITORIO.md, este documento
completo y la evidencia ya registrada. Toma únicamente la primera unidad abierta del
tablero. Mide su estado inicial y resuelve una rebanada vertical pequeña. Después
audítala, en este orden, como: 1) full-stack y datos, 2) experto en IELTS Reading,
3) walkthrough cognitivo/pedagógico que simula a un estudiante promedio, 4) revisor multiperspectiva y
anti-sesgo, 5) auditor UI/UX y accesibilidad, y 6) auditor Playwright de extremo a
extremo. Corrige lo que falle y repite las seis auditorías. Registra comandos, métricas,
capturas y archivos antes/después. No marques una casilla por una comprobación parcial,
no bajes umbrales, no uses preguntas ya vistas para demostrar dominio, no concedas una
banda en prácticas cortas y no confundas reglas oficiales con estrategias WeLearn.
No commitees, publiques, despliegues, cambies remotos ni mezcles cambios ajenos sin
autorización explícita.
```

La regla rectora es:

> Acertar no basta. El estudiante debe poder localizar la evidencia, justificar la
> decisión, reconocer por qué el distractor era tentador y transferir el método a un
> texto no visto.

---

## 0. Panel responsable de esta especificación

El documento combina seis revisiones independientes, basadas en inspección del producto
actual y no solo en una lluvia de ideas:

1. **Arquitecto full-stack y de datos:** contratos, scoring, estado, persistencia,
   privacidad, guardianes y deuda técnica.
2. **Especialista en IELTS Academic Reading:** fidelidad al formato, evidencia, claves,
   distractores, límites y uso responsable de bandas.
3. **Estudiante promedio + diseñador instruccional:** claridad, retirada de ayudas,
   transferencia, metacognición y siguiente acción.
4. **Auditor multiperspectiva y anti-sesgo:** atajos, posición, longitud, solapamiento,
   diversidad, conocimiento previo y fugas.
5. **Auditor UI/UX y accesibilidad:** paridad de familia con Task 2 y ergonomía propia de
   lectura sostenida.
6. **Auditor Playwright:** verificación reproducible de rutas, estados, dispositivos,
   accesibilidad, persistencia y examen completo.

Derechos, procedencia y verificación factual son un gate transversal previo a las seis
auditorías. Ningún agente que escriba un ítem puede ser su único aprobador.

---

## 1. Misión y criterio de éxito

Construir un ecosistema completo de IELTS Academic Reading que enseñe a leer y decidir
bajo las restricciones del examen. Reading requiere menos producción extensa que
Writing, pero no es necesariamente más sencillo: comprime comprensión, localización,
paráfrasis, inferencia, control de alcance, forma de respuesta y tiempo en 60 minutos.

La sección debe ayudar al estudiante a:

1. interpretar exactamente la instrucción;
2. decidir si necesita una vista global o una búsqueda dirigida;
3. construir y usar un mapa del pasaje;
4. localizar una ventana de evidencia eficiente;
5. reconocer la paráfrasis entre pregunta y texto;
6. comparar sujeto, acción, tiempo, cantidad, causa, postura y alcance;
7. rechazar cada distractor por una razón concreta;
8. escribir o seleccionar una respuesta válida en forma, ortografía y límite;
9. transferir el método a un pasaje y tema nuevos bajo tiempo;
10. identificar su patrón de error y saber qué practicar después.

La promesa pedagógica es **menos errores repetidos en preguntas nuevas**, no simplemente
“más preguntas contestadas”.

### Fuera de alcance hasta que exista evidencia

- No prometer aumentos de banda por completar una ruta.
- No presentar porcentajes de un mini-set como una banda IELTS.
- No llamar “validado pedagógicamente” a algo que solo pasó pruebas de software.
- No publicar material oficial, Cambridge o de terceros sin licencia verificable.
- No mezclar Academic y General Training como si sus textos y progresión fueran iguales.
- No enseñar atajos absolutos como “haz skimming siempre primero” o “si dice *all*, es False”.

---

## 2. Contrato de verdad: IELTS oficial frente a estrategia WeLearn

Toda página educativa debe separar visual y verbalmente estos dos niveles.

### 2.1 Hechos y reglas oficiales verificables

Según IELTS, Academic Reading tiene:

- 60 minutos;
- 3 secciones;
- 40 preguntas;
- 2.150–2.750 palabras en total;
- un punto por respuesta correcta;
- ortografía y gramática que pueden afectar la validez de una respuesta escrita;
- textos tomados de libros, revistas, periódicos, journals y recursos en línea, dirigidos
  a una audiencia no especialista;
- al menos un texto con argumentación lógica detallada;
- límites de palabras que cambian según la instrucción y cuyo exceso pierde el punto;
- puntuación convertida a la escala de bandas, con umbrales que pueden variar ligeramente
  entre versiones.

Desde mediados de 2026 IELTS inició el retiro del examen completamente en papel: todas
las pruebas pasan a ordenador, con calendario exacto variable por mercado. La opción
`Writing on Paper` de algunos mercados no convierte Reading en papel. WeLearn prepara
prioritariamente la interacción de Reading en ordenador y conserva las adaptaciones de
accesibilidad oficiales. Este cambio de entrega no modifica el constructo ni la
interpretación del resultado.

IELTS enumera actualmente **11 tipos numerados**. WeLearn mantiene **14 rutas de
práctica** porque separa `Summary`, `Note`, `Table` y `Flow-chart completion`, que IELTS
agrupa dentro de su tipo oficial 9.

Texto permitido para el producto:

> 11 tipos oficiales numerados · 14 rutas WeLearn para practicar sus formatos y variantes.

Texto prohibido:

> 14 tipos oficiales de IELTS Reading.

Las restricciones de orden, reutilización de opciones, cantidad de respuestas y límite
de palabras deben guardarse por tarea; no se pueden convertir en una regla global.

Política lingüística:

- pasajes, instrucciones auténticas, prompts, opciones y respuestas permanecen en inglés;
- la interfaz y explicación pedagógica son españolas por defecto y pueden ofrecer una
  vista bilingüe configurable;
- ninguna traducción modifica el wording evaluado, añade una pista semántica ni sustituye
  el inglés que el alumno encontrará en IELTS;
- Exam no traduce prompts, pasajes, opciones ni instrucciones.

### 2.2 Estrategias propias de WeLearn

Son decisiones pedagógicas útiles, pero nunca deben atribuirse a IELTS:

- skimming y scanning;
- mapa del pasaje;
- presupuesto sugerido por pasaje;
- sistema de ocho pasos;
- Progressive Engine;
- códigos de error;
- política de dominio del 80 %;
- recomendaciones adaptativas;
- reglas para saltar, marcar y volver;
- colores, bloques y ayudas de interfaz.

### 2.3 Uso responsable de bandas

Solo un simulacro completo de 40 preguntas puede mostrar una **estimación orientativa**,
con un aviso visible de que los umbrales varían por versión. La referencia oficial
publica como promedios de Academic Reading: 15/40 ≈ banda 5, 23/40 ≈ 6, 30/40 ≈ 7 y
35/40 ≈ 8. Una práctica parcial informa exactitud y habilidades, no banda.

---

## 3. Línea base del repositorio: qué existe y qué no se debe asumir

Esta sección es una fotografía, no una verdad permanente. La primera iteración del loop
debe volver a medirla y registrar cualquier diferencia.

### 3.1 Activos reutilizables

- Hub de IELTS Reading y navegación existente.
- 14 rutas WeLearn por formato de pregunta.
- Seis rutas transversales: skimming, scanning, paráfrasis, inferencia, límite de palabras
  y gestión del tiempo.
- Bancos específicos por ruta, normalmente con tres pasajes y práctica suficiente para
  una primera migración.
- Banco mixto de tres pasajes y doce tareas.
- 20 archivos de simulacros con tres secciones de Reading cada uno: 60 pasajes en total.
- Componentes de práctica, feedback inmediato y navegación ya funcionales.
- Contratos previos de contenido y analytics en:
  - `docs/adr/0001-transversal-reading-engine.md`;
  - `docs/reading-content-guide.md`;
  - `docs/reading-analytics-spec.md`;
  - `docs/reading-pilot-human-review.md`.
- Lenguaje visual de Writing Task 2: hero, fact grid, tarjetas, ejemplo trabajado,
  navegación progresiva, paneles de feedback y CTA de transferencia.
- Un precedente de contrato editorial más fuerte en `src/lib/reading/types.ts` y
  `scripts/lib/reading-content-validator.mjs`: evidencia, notas de distractor, autoría,
  revisores, fuentes, copyright y bloqueo de publicación. Se deben reciclar sus
  principios, no forzar su esquema CEFR directamente sobre IELTS.

### 3.2 Fallos conocidos que son bloqueantes

1. El hub principal todavía gira alrededor de un ejercicio único de TFNG sobre el
   Amazonas y anuncia como “próximamente” rutas que ya están publicadas.
2. Ese contenido repite la afirmación controvertida de que el Amazonas produce cerca
   del 20 % del oxígeno mundial. Debe retirarse o sustituirse por contenido original,
   verificable y con fuentes.
3. Allí, Not Given se reduce a que el texto “no menciona el tema”. Esto es incorrecto:
   el tema puede aparecer y aun así faltar la relación o el dato exacto.
4. El banco mixto tiene 12/12 respuestas correctas en la posición A/índice 0.
5. El motor muestra `task.questionType` antes de preguntas que piden identificar el tipo.
6. También muestra `paragraph.function`, que puede revelar respuestas sobre función o
   idea principal.
7. Los motores actuales corrigen inmediatamente y bloquean el ítem tras un clic. Sirven
   para práctica guiada, pero no demuestran trabajo independiente ni modo examen.
8. Los guardianes existentes validan principalmente estructura; no prueban que la
   evidencia sostenga una única clave ni que los distractores sean plausibles.
9. `src/data/practica-exams/seo-catalog.ts` concentra más de diez mil líneas de rutas,
   habilidades y bancos. Migrar todo de una vez aumentaría el riesgo de fuentes de verdad
   paralelas; el loop debe extraer por rebanadas verificables.
10. Los tipos genéricos de mocks no guardan evidencia, explicación, procedencia ni
    revisión editorial. El reporte del runner muestra acierto y clave, pero no paráfrasis,
    error ni siguiente habilidad.

### 3.3 Mediciones adversariales iniciales

Estas cifras deben reproducirse con un script auditable antes de intervenir:

| Superficie | Medición inicial | Riesgo |
|---|---:|---|
| Ítems de opción revisados | 68 | base pequeña y heterogénea |
| Posición correcta A/B/C | 38 / 22 / 8 | fuerte sesgo hacia A |
| Banco mixto | 12/12 en A | 100 % con “siempre A” |
| Banco de inferencia | 7/10 en A | atajo sin lectura |
| Ítems con una única opción más larga | 51/68 | oportunidad para atajo de longitud |
| “Elegir la única más larga” | 37/51 = 72,5 % | heurística muy por encima del azar |
| Simulacros heredados | 60 pasajes / 800 puntos | volumen no equivale a calidad |
| Secciones con procedencia/licencia | 0 | riesgo editorial y de derechos |
| Grupos con evidencia y explicación | 0 | clave no auditable pedagógicamente |
| MCQ no-TFNG de mocks, A/B/C | 0 / 51 / 26 | A nunca correcta; patrón explotable |
| Respuestas de completar | 534 | requieren reglas exactas de normalización |
| Blanks sin `maxWords` | 464 | el límite no se puede validar |
| Sets 5–20 sin `maxWords` | 29/29 en cada set | fallo sistémico |
| Multiselect | 3 grupos / 6 puntos | hoy reciben 2 o 0; falta política por respuesta |

El runner heredado no valida el límite de palabras al puntuar. Ninguno de los 60 pasajes
heredados se considera publicable o “auténtico” hasta resolver procedencia, licencia,
fuentes factuales, evidencia y revisión humana. Se puede reciclar infraestructura; el
contenido queda en cuarentena.

### 3.4 Guardianes y árbol de trabajo

`npm run check:exam-practice-content` puede estar rojo por expectativas antiguas de
Writing Task 2 ajenas a Reading. El loop debe guardar un snapshot del baseline, crear un
gate dedicado a Reading y no ocultar, silenciar ni “arreglar” cambios ajenos para obtener
verde. Un fallo global preexistente se registra; un fallo nuevo o agravado por la unidad
sí bloquea el cierre.

El repositorio puede estar sucio. Nunca usar `git add -A`, nunca sobrescribir trabajo
ajeno y nunca asumir que una modificación sin autor visible pertenece al loop.

---

## 4. Arquitectura del ecosistema

```text
Hub de IELTS Academic Reading
├── Orientación y diagnóstico sin banda
├── Sistema de resolución WeLearn
│   ├── leer instrucción
│   ├── predecir forma y dato
│   ├── elegir vista global o señal específica
│   ├── localizar evidencia
│   ├── comparar significado y alcance
│   ├── responder
│   └── verificar y clasificar el error
├── Habilidades transversales
├── 11 tipos oficiales → 14 rutas WeLearn
├── Práctica mixta y transferencia
├── Pasajes completos
├── Simulacro 3 pasajes / 40 preguntas
└── Review, perfil de errores y siguiente práctica
```

Academic Reading y General Training deben compartir únicamente piezas realmente
transversales. Cada intento, ruta, pasaje y reporte debe declarar su módulo. La sección
GT existente permanece separada; ningún enlace o estado puede hacer que el usuario crea
que un mock Academic prepara el formato de GT por completo.

### 4.1 Tres caminos de entrada, inspirados en Writing Task 2

1. **Aprender el sistema:** para quien lee de principio a fin y aun así no encuentra la
   evidencia a tiempo.
2. **Dominar un formato:** para quien sabe que falla en TFNG, headings, completion, etc.
3. **Corregir una habilidad:** para quien falla por paráfrasis, alcance, tiempo,
   instrucciones o forma de respuesta en varios tipos.

El diagnóstico puede recomendar un camino, pero siempre debe explicar la razón y dejar
al estudiante elegir otro.

### 4.2 Modos de aprendizaje

| Modo | Ayudas | Corrección | Propósito |
|---|---|---|---|
| Learn | ejemplo, señales, pistas solicitables | inmediata y explicada | construir el método |
| Practice | ayudas reducidas | solo al entregar el mini-set | consolidar sin sobreasistencia |
| Exam | sin pistas, etiquetas ni evidencia | solo al enviar | simular decisiones reales |
| Review | evidencia, clave, respuesta propia, trampa | diagnóstica | convertir error en siguiente acción |

Cambiar de modo no puede alterar silenciosamente una respuesta ni conservar feedback
de otro set.

Los cuatro modos son contratos distintos, no un toggle cosmético:

- **Learn:** permite seleccionar, cambiar y después comprobar; las pistas son escalonadas
  y se registran. La evidencia aparece al pedirla o después de comprobar.
- **Practice:** mini-set de 6–10 ítems, timer opcional y respuestas editables hasta
  `Entregar bloque`; el feedback llega al final.
- **Exam:** navegación, autosave, preguntas marcadas/sin responder, confirmación y aviso
  al salir. No hay corrección visible hasta enviar.
- **Review:** filtra por pasaje, tipo, error, incorrectas o marcadas y lleva al span de
  evidencia sin modificar el score cerrado.

---

## 5. Mapa oficial de tipos y rutas WeLearn

| Tipo oficial | Ruta(s) WeLearn | Demanda principal | Riesgo pedagógico típico |
|---|---|---|---|
| 1. Multiple choice | Multiple Choice | detalle o comprensión global; una o varias respuestas | eco léxico y opción parcialmente cierta |
| 2. Identifying information | True/False/Not Given | apoyo, contradicción o ausencia de información | convertir Not Given en “no aparece el tema” |
| 3. Identifying writer’s views/claims | Yes/No/Not Given | atribución y postura | confundir hechos del texto con posición del autor |
| 4. Matching information | Matching Information | localizar detalle en párrafos | tratarlo como idea principal |
| 5. Matching headings | Matching Headings | idea principal frente a apoyo | escoger un detalle verdadero pero secundario |
| 6. Matching features | Matching Features | relaciones entre personas, teorías o categorías | perder reutilización o atribución |
| 7. Matching sentence endings | Matching Sentence Endings | significado y cohesión de la oración | decidir solo por gramática |
| 8. Sentence completion | Sentence Completion | detalle, forma y límite | copiar palabras de más |
| 9. Summary/note/table/flow-chart completion | Summary, Note, Table y Flow-chart Completion | detalle, estructura, paráfrasis y forma | asumir que siempre siguen el orden del texto |
| 10. Diagram label completion | Diagram Labeling | seguir descripción y relaciones espaciales | depender del dibujo sin validar el texto |
| 11. Short-answer questions | Short Answer | localizar y producir respuesta factual breve | responder bien el contenido pero violar el límite |

Cada ruta debe enlazar al tipo oficial correspondiente y explicar por qué WeLearn la
separa. No inventar nomenclatura que parezca oficial.

Agrupación pedagógica para el hub, sin cambiar la taxonomía oficial:

- **Evidencia y postura:** TFNG, YNNG.
- **Comprensión global y elección:** Multiple Choice, Matching Headings.
- **Matching y relaciones:** Information, Features, Sentence Endings.
- **Completion:** Sentence, Summary, Note, Table y Flow-chart.
- **Representación visual:** Diagram Labeling.
- **Respuesta factual breve:** Short Answer.

### Orden de los tres pilotos verticales

1. **TFNG:** valida evidencia, contradicción, ausencia y alcance.
2. **Matching Headings:** valida lectura global, función e idea principal.
3. **Summary Completion:** valida localización, paráfrasis, categoría gramatical y límite.

Si estos tres motores no consiguen retirar ayudas y transferir a un texto nuevo, no se
debe migrar masivamente las otras rutas.

---

## 6. Sistema de resolución WeLearn

La ruta transversal equivalente a “Build the essay” de Writing será:

1. **Read the instruction.** ¿Cuántas respuestas? ¿Letras o palabras? ¿Se reutilizan?
   ¿Cuál es el límite?
2. **Predict.** ¿Qué clase de dato y qué categoría gramatical encajan?
3. **Choose the first move.** ¿Hace falta mapa global o una señal para escanear? La meta
   del ítem determina la estrategia.
4. **Locate.** Identificar párrafo y ventana de evidencia; no releer todo por defecto.
5. **Compare.** Revisar sujeto, acción, tiempo, cantidad, comparación, causa, postura y
   alcance, no solo palabras repetidas.
6. **Answer.** Producir la forma mínima y válida o elegir todas las respuestas requeridas.
7. **Verify.** Evidencia, pregunta exacta, gramática, ortografía, límite y transferencia.
8. **Review.** Clasificar el error antes de continuar.

Skimming y scanning son herramientas situacionales. Una pregunta solo puede evaluar
“cuál conviene primero” si delimita la meta, la información disponible y por qué una
acción es más eficiente en ese caso.

---

## 7. Habilidades transversales

### 7.1 Rutas visibles que ya existen

- **Skimming:** tema, estructura, cambio de función e idea principal.
- **Scanning:** nombres, fechas, cifras, términos raros y señales para abrir una ventana.
- **Paráfrasis:** equivalencia semántica más allá de sinónimos uno a uno.
- **Inferencia:** conclusión autorizada frente a salto o conocimiento externo.
- **Límite de palabras:** lectura de instrucción, conteo, números, guiones y forma mínima.
- **Gestión del tiempo:** triage, marcar, volver y proteger preguntas de mayor retorno.

### 7.2 Capacidades que deben integrarse en el sistema

No todas necesitan una URL propia, pero sí ejemplos, práctica y diagnóstico:

- lectura de instrucciones;
- estructura argumentativa y función de párrafo;
- idea principal frente a detalle;
- alcance, cuantificadores y negación;
- comparación, causalidad y tiempo verbal;
- atribución de postura;
- referencia y cohesión: pronombres, `former/latter`, conectores y cadenas léxicas;
- vocabulario en contexto;
- predicción de categoría gramatical;
- ortografía y copia exacta;
- calibración de confianza.

---

## 8. Progressive Engine para Reading

No se copiará literalmente el motor de Writing. Reading necesita hacer visible la cadena
pregunta → señal → zona → paráfrasis → evidencia → decisión, y luego ocultarla.

### Ocho niveles

1. **Recognise the task:** identificar qué exige la instrucción.
2. **Predict the answer:** anticipar dato, forma y restricción.
3. **Find the zone:** localizar el párrafo o segmento probable.
4. **Match the paraphrase:** alinear pregunta y texto por significado.
5. **Test the evidence:** descomponer la afirmación en proposiciones, comprobar cada una
   contra el texto y aplicar después la regla del tipo de pregunta.
6. **Reject the distractor:** explicar por separado por qué cada alternativa falla.
7. **Solve independently:** texto nuevo, sin etiquetas ni evidencia visible; feedback al
   cerrar el bloque.
8. **Timed transfer:** mini-set mixto y revisión diagnóstica posterior.

### Retirada progresiva de ayudas

```text
Modelo completamente visible
→ pistas opcionales y registradas
→ evidencia oculta hasta responder
→ feedback al finalizar el ítem
→ feedback al finalizar el set
→ simulación sin ayudas
```

El ejemplo trabajado, la práctica guiada, el set independiente y el set de transferencia
no deben reutilizar la misma pregunta. El set de dominio debe usar un texto no visto.

La unidad mínima que construye el loop es: **un objetivo observable + un ejemplo
trabajado + cuatro decisiones guiadas + un mini-set independiente + feedback de review**.
Una ruta completa puede requerir varias unidades mínimas; no se sacrifica profundidad
para pintar la fila completa de una vez.

### Política de dominio WeLearn

El 80 % puede ser un umbral WeLearn, pero nunca evidencia suficiente por sí solo. El
dominio provisional requiere dos formas paralelas no vistas, sin pistas, con al menos
ocho decisiones puntuables por objetivo primario en cada forma, ≥80 % en cada una y cero
errores críticos de instrucción o límite. La segunda forma se aplica entre 72 horas y
siete días después; cada unidad declara el intervalo antes de medirlo. Una forma minutos
después mide transferencia inmediata, no retención. Repetir el mismo set hasta memorizarlo
no cuenta. Esta política no es un estándar IELTS ni prueba una subida de banda.

### Tres blueprints de demostración

Son ejemplos para diseñar la experiencia; no se publican como banco hasta pasar derechos,
revisión IELTS y solución independiente.

#### A. TFNG: separar contradicción de ausencia

```text
Texto: “The pilot enrolled 120 volunteers from three universities. The report did not
state the volunteers’ ages.”

1. The pilot included 120 volunteers.        → TRUE
   Evidencia directa: “enrolled 120 volunteers”.

2. The pilot included 150 volunteers.        → FALSE
   El mismo dato aparece y lo contradice: 120 ≠ 150.

3. All volunteers were aged 18–25.           → NOT GIVEN
   El tema de los participantes sí aparece; el rango de edad exacto no está informado.
```

El aprendizaje no es “buscar la palabra”. Es clasificar la relación semántica entre la
afirmación completa y la evidencia disponible.

#### B. Matching Headings: principal frente a detalle

```text
Pregunta → resumir la función de todo el párrafo
Detalle llamativo → puede ser verdadero y aun así no ser el heading
Prueba → ¿el heading cubre inicio, desarrollo y cierre sin ser demasiado amplio?
Respuesta → numeral romano, no el texto del heading, si así lo exige la instrucción
```

La demostración debe descartar un heading demasiado amplio, uno basado en un ejemplo y
uno que solo describe la oración final.

#### C. Summary Completion: significado, gramática y límite

```text
Instrucción: ONE WORD ONLY
Gap: The device stores energy in a ______ layer.
Predicción: adjective/noun modifier antes de “layer”
Texto: “Energy is retained within a ceramic layer.”
Respuesta válida: ceramic
Respuesta inválida: a ceramic layer  → excede el límite y no encaja en el gap
```

El feedback debe separar dos preguntas: “¿entendiste la evidencia?” y “¿entregaste una
respuesta formalmente válida?”.

---

## 9. Plantilla obligatoria de una unidad educativa

1. Hero y objetivo observable.
2. Bloque “Formato oficial” frente a “Estrategia WeLearn”.
3. Qué exige la respuesta y qué restricciones pueden cambiar.
4. Ejemplo trabajado completo.
5. Progressive Engine con retirada de ayudas.
6. Práctica independiente con texto nuevo.
7. Transferencia a un pasaje con tipos mezclados.
8. Revisión por código de error.
9. Checklist de dominio.
10. Fuentes, procedencia, `rightsBasis` y estado de revisión.
11. Siguiente acción: práctica recomendada o ruta siguiente.

El ejemplo trabajado debe mostrar:

```text
pregunta
→ señal útil
→ zona de búsqueda
→ paráfrasis
→ span de evidencia
→ comparación de alcance
→ respuesta
→ razón individual de descarte de cada distractor
```

---

## 10. Taxonomía diagnóstica de errores

| Código | Error | Señal observable | Remediación primaria |
|---|---|---|---|
| `INS` | Instrucción | excede límite, responde cantidad incorrecta o ignora reutilización | Sistema · instrucciones |
| `MAP` | Mapa global | confunde ejemplo con idea principal | Skimming / Headings |
| `LOC` | Localización | busca en el párrafo incorrecto o relee todo | Scanning |
| `PAR` | Paráfrasis | solo reconoce coincidencia literal | Paráfrasis |
| `EVD` | Relación de evidencia | confunde apoyo, contradicción y ausencia | TFNG |
| `SCP` | Alcance | pierde cuantificador, agente, tiempo, comparación o causalidad | Evidencia y alcance |
| `STA` | Postura | atribuye la opinión a la persona equivocada | YNNG / Features |
| `INF` | Sobreinferencia | usa conocimiento externo o da un salto no autorizado | Inferencia |
| `MAI` | Principal vs detalle | elige algo cierto que no responde la pregunta | Headings / MCQ |
| `DST` | Distractor | cae en eco léxico, verdad parcial, detalle vecino o relación invertida | Ruta correspondiente |
| `GRM` | Forma | la respuesta no encaja gramaticalmente | Completion |
| `LIM` | Límite | excede palabras o números permitidos | Límite de palabras |
| `SPL` | Ortografía | copia incorrectamente | Completion / Short Answer |
| `TME` | Tiempo | se estanca, abandona o revisa con bajo retorno | Gestión del tiempo |
| `MET` | Metacognición | alta confianza sin evidencia o no puede explicar la decisión | Review guiado |

Cada pregunta declara `targetSkills`, pero una respuesta incorrecta no demuestra su
causa. `observedError` se registra por separado y solo se atribuye cuando hay señal: el
distractor elegido, la zona que el alumno marcó, una microdecisión adicional, la pista
usada, un cambio, el tiempo o la confianza. Sin señal suficiente queda `unknown`; no se
inventa una explicación adaptativa. El reporte prioriza patrones recurrentes y acciones
de remediación; no se limita a “fallas Summary Completion”.

---

## 11. Contrato editorial y de datos

### 11.1 Pasaje

Campos mínimos conceptuales:

- ID estable, versión y estado `draft | review | published | quarantined`;
- módulo `academic | general-training`;
- título, texto y párrafos con IDs estables;
- género, tema, audiencia, sección prevista y fundamento de dificultad;
- conteo de palabras;
- spans direccionables para evidencia;
- glosario opcional que no revele respuestas;
- autor, revisor, fecha y changelog;
- procedencia y `rightsBasis`: `owned-original | licensed | public-domain |
  unknown-quarantined`; titular y documento de licencia cuando aplique;
- fuentes factuales y fecha de verificación;
- etiquetas de sensibilidad cultural.

### 11.2 Grupo de tareas

- tipo oficial y ruta WeLearn;
- instrucción exacta;
- modo de respuesta;
- orden esperado de la información, cuando aplique;
- reglas de reutilización;
- cantidad de respuestas requeridas;
- límite de palabras/números;
- política multiselect: cada número de pregunta vale un punto y el máximo bruto del mock
  permanece en 40;
- comportamiento de normalización permitido;
- IDs de preguntas, nunca relaciones implícitas por índice.

### 11.3 Pregunta

- ID estable y versión;
- prompt;
- respuesta correcta y alternativas aceptables;
- opciones con IDs estables;
- `supportingSpan` para evidencia local positiva o contradictoria;
- `relatedZone` y `absenceTarget` para Not Given, sin inventar un span positivo;
- `globalEvidenceScope` para Headings u otra decisión justificada por un párrafo/sección
  completa;
- relación semántica de la evidencia: `entails`, `contradicts`, `not-stated`,
  `main-idea` o `supports-inference`;
- mapa explícito de paráfrasis;
- forma gramatical esperada;
- razonamiento de la correcta;
- razonamiento individual por distractor;
- códigos de error y trampa;
- `targetSkills` editoriales y `observedError` diagnóstico, nunca unidos por defecto;
- dificultad prevista y fundamento, nunca una banda inventada;
- estado de revisión y resultado de solución independiente;
- historial de cambios de clave.

### 11.4 Estado de aprendizaje

- versión de contenido junto al progreso;
- modo, respuestas, marcas, pistas usadas y tiempo activo;
- reanudación segura sin mezclar intentos o versiones;
- en Learn/Practice, ninguna clave visible o inferible por la UI, DOM o ARIA antes del
  momento de feedback, aunque el cliente pueda recibirla para puntuar;
- en Exam seguro, ninguna clave enviada al cliente antes del submit y scoring en servidor;
- analytics sin texto libre, información personal ni contenido sensible.

### 11.5 Regla de adjudicación humana

Un revisor independiente, distinto del autor y con contexto limpio, recibe un artefacto
que no contiene clave, evidencia editorial ni razonamiento. Registra identidad/rol,
fecha, respuesta, span o alcance de evidencia y confianza antes de ver la adjudicación.
Un agente que conserva la clave en contexto no cuenta como revisor a ciegas. Si no hay
coincidencia, el ítem vuelve a adjudicación. No se “arregla” una ambigüedad cambiando
solo la explicación después de conocer la clave. La publicación conserva la firma
humana exigida por el ciclo editorial.

---

## 12. Ciclo editorial y derechos

```text
draft
→ revisión factual y de derechos
→ revisión IELTS
→ solución independiente a ciegas
→ revisión pedagógica y cultural
→ auditoría anti-sesgo
→ approved
→ published
→ monitorización y posible cuarentena
```

Reglas:

- El renderer puede reutilizarse; un pasaje con `unknown-quarantined` no puede renderizarse,
  indexarse ni entrar en práctica o mock.
- No copiar textos o preguntas de Cambridge ni de materiales oficiales salvo licencia
  expresa que cubra publicación en la plataforma.
- Los ejemplos oficiales pueden enlazarse, resumirse y usarse para verificar formato,
  pero no convertirse en un banco propio por reproducción.
- Toda afirmación factual susceptible de cambiar necesita fuente y fecha.
- Un cambio de clave obliga a versionar, invalidar la evidencia anterior y revisar los
  intentos afectados.
- Un ítem con dos respuestas razonables queda bloqueado, aunque la interfaz funcione.
- En Multiple Choice multiselect, cada número oficial equivale a un punto. Si se piden dos
  respuestas y el alumno acierta una, obtiene uno de los dos puntos, sin penalización
  adicional; el orden es indiferente cuando la tarea oficial lo permite. Learn/Review
  puede mostrar diagnóstico por selección, separado del raw score IELTS.

---

## 13. Panel de seis auditorías

Cada unidad se revisa secuencialmente desde seis perspectivas. Una casilla verde exige
toda la lista de su auditor; no una impresión general.

### 13.1 Auditoría full-stack, datos y seguridad pedagógica

Falla si existe cualquiera de estos casos:

- fuentes paralelas unidas por índice;
- shuffle que pierde identidad, evidencia o feedback;
- IDs duplicados o inestables;
- respuesta, span o función reveladora expuesta en HTML, DOM, ARIA o estado visible antes
  del feedback previsto en Learn/Practice;
- en Exam seguro, clave presente en bundle, estado, cache o red antes del submit;
- estado de feedback que sobrevive al cambiar de ruta, set o modo;
- respuestas aceptadas que exceden el límite;
- normalización inconsistente de espacios, guiones, números, mayúsculas o puntuación;
- multiselect calificado con una política distinta a la declarada;
- progreso sin versión o intento recuperado contra contenido distinto;
- analytics que envían texto del estudiante o datos personales;
- discrepancia entre SSR e hidratación;
- temporizador incorrecto al recargar, cambiar de pestaña o reanudar;
- mezcla accidental de Academic y General Training;
- error de red o almacenamiento que hace perder respuestas sin aviso recuperable.

Debe probar como mínimo:

- integridad referencial `passage → group → question → option/evidence`;
- validación del esquema en build;
- normalización con casos límite;
- seed reproducible solo en formatos donde alterar el orden conserva la convención IELTS;
  TFNG/YNNG, numerales, letras de matching y órdenes definidos se preservan, y su balance
  se logra entre ítems, no barajando etiquetas dentro del ítem;
- migración o invalidación segura del progreso versionado;
- cero secretos, claves o soluciones en el DOM accesible antes de la corrección.

Learn/Practice pueden puntuar en cliente, pero la UI, DOM y ARIA no revelan la clave antes
del feedback previsto. Cuando Exam pretenda resistir inspección, la sesión y la puntuación
se resuelven en servidor y la clave no se incluye en bundle, estado ni payload antes del
submit. Un modo puramente cliente puede ser práctica útil, pero no se describe como
seguro contra inspección.

Política temporal:

- Learn mide tiempo activo solo para analítica y no penaliza ni muestra cuenta regresiva;
- Practice ofrece timer opcional y declara si continúa o se pausa al salir;
- Exam persiste un `deadline` de tiempo de pared: cambiar de pestaña, Back/Forward o
  recargar no pausa los 60 minutos; servidor y cliente reconcilian el vencimiento;
- expiración es idempotente, guarda el intento y activa el mismo flujo de submit/review.

### 13.2 Auditoría de experto IELTS Reading

Falla por:

- regla oficial incorrecta, desactualizada o sin fuente;
- “14 tipos oficiales”;
- clave no demostrable con evidencia textual suficiente;
- más de una respuesta razonable;
- distractor falso por mala gramática en vez de comprensión;
- Not Given enseñado como “el tema no aparece”;
- texto demasiado corto o simple presentado como simulación auténtica;
- dificultad producida por conocimiento especializado, no por lectura;
- tarea que viola su orden, reutilización, cantidad o límite;
- feedback que convierte una estrategia en regla universal;
- banda derivada de un mini-set;
- fuente, derechos o afirmaciones factuales sin resolver.

La auditoría debe resolver a ciegas, citar span, explicar la paráfrasis y adjudicar cada
distractor.

### 13.3 Walkthrough cognitivo y auditoría pedagógica

Esta revisión automatizada adopta la perspectiva de un estudiante promedio, pero no es
una prueba con usuarios ni puede aprobar la fila humana de la fase 8.

Recorrido frío obligatorio:

1. entrar sin explicación externa;
2. reconocer si está en Academic o GT;
3. saber en diez segundos qué hacer;
4. ver un ejemplo antes de una decisión independiente;
5. fallar deliberadamente;
6. entender en lenguaje llano por qué falló;
7. volver al texto y encontrar la evidencia;
8. aplicar la corrección a un texto no visto;
9. reanudar un intento;
10. terminar sabiendo la siguiente acción.

Falla si el alumno:

- recibe solo “incorrecto” o una explicación genérica;
- necesita terminología experta para usar el feedback;
- ve un botón bloqueado sin razón;
- aprende la respuesta pero no el proceso;
- repite el mismo set para obtener “dominio”;
- no distingue una regla oficial de un consejo;
- recibe celebración genérica ante un error crítico de instrucción;
- no puede explicar con sus palabras qué cambió entre pregunta y evidencia.

### 13.4 Auditoría multiperspectiva y anti-sesgo

Ejecutar adversarios que contesten sin leer:

- siempre primera, siempre segunda y siempre tercera opción;
- opción más larga y opción más corta;
- mayor solapamiento léxico con el texto;
- opción con gramática o registro más pulidos;
- `all/always/every/never` ⇒ False;
- secuencia A-B-C repetida;
- opción nueva frente a distractores reciclados;
- etiqueta visible de tipo o función;
- elegir por longitud de la pregunta, signo o posición.

Medir por banco, ruta, dificultad y pasaje:

- distribución de posiciones y racha máxima;
- rendimiento de cada heurístico frente al azar;
- longitud media de correctas y distractores;
- solapamiento léxico;
- frecuencia de distractores repetidos;
- balance TFNG/YNNG sin imponer una secuencia artificial;
- representación de geografías, géneros, culturas, ocupaciones y perspectivas;
- dependencia de conocimiento previo;
- carga lingüística irrelevante a la habilidad objetivo;
- diferencias de rendimiento entre temas, formatos y dispositivos.

Gate calculable:

1. Agrupar únicamente ítems homogéneos por formato de respuesta y número `k` de opciones.
2. Para heurísticos que siempre eligen una opción, el azar es `p0 = 1/k`.
3. Para “más larga”, “más corta” o mayor solapamiento, los empates son abstenciones. El
   reporte guarda `eligible`, `ties`, `hits`, cobertura `eligible/n`, exactitud condicional
   `hits/eligible` y exactitud total `hits/n`; nunca rompe empates a favor del heurístico.
4. La certificación estadística exige al menos 100 decisiones elegibles por familia. Pasa
   si el límite superior unilateral de Wilson al 95 % para `hits/eligible` es
   `≤ p0 + 0,10`. Con menos muestra, el resultado es provisional y no prueba ausencia de
   atajo.
5. Para posición, con `n ≥ 100`, la proporción de cada índice debe quedar dentro de
   `p0 ± 0,10`, ninguna posición puede ser cero y no puede existir una secuencia cíclica
   determinista. Se reporta también la racha máxima; no se fabrica una rotación visible.
6. En una unidad pequeña se enumeran todos los ítems, se ejecuta permutación y se corrige
   cualquier delator estructural. Su gate estadístico se marca `➖ N/A justificado` y
   enlaza obligatoriamente al agregado de fase 9; no se declara validado por muestra.
7. La salida es JSON reproducible con `schemaVersion`, commit/árbol, `poolId`, `k`, `n`,
   counts por posición y, por heurístico, `eligible`, `ties`, `hits`, `p0`, exactitudes,
   Wilson 95 %, umbral y veredicto.

Con `m = eligible`, `p̂ = hits/m` y `z = 1,645`, el límite usado es:

```text
U95 = (p̂ + z²/(2m) + z·√(p̂(1-p̂)/m + z²/(4m²))) / (1 + z²/m)
```

No se “equilibra” con una rotación predecible; se corrige la construcción del ítem. Un
pool que no alcance muestra puede publicarse solo tras la revisión estructural por ítem,
pero el ecosistema no obtiene cierre anti-sesgo final hasta pasar el agregado.

Diversidad no significa cuotas mecánicas ni estereotipos. El auditor debe buscar también
sesgo de perspectiva: quién tiene autoridad, quién aparece como problema, qué regiones
solo se asocian con pobreza, y qué conocimiento cultural se da por universal.

### 13.5 Auditoría UI/UX, accesibilidad y paridad con Task 2

La nueva sección debe sentirse parte del mismo producto:

- mismos tokens de marca, shell, jerarquía, ancho general y densidad de tarjetas;
- hero, fact grid, distinción oficial/estrategia, ejemplo trabajado, rail progresivo,
  paneles semánticos, feedback y CTA de transferencia;
- colores semánticos consistentes con Task 2: navy principal, rojo de error, verde de
  evidencia correcta, naranja de cautela y morado de estructura;
- antes de Check/Submit, todas las opciones son neutrales: el color comunica un estado
  posterior, nunca una identidad fija de TRUE, FALSE, NOT GIVEN u otra respuesta;
- componentes compartidos cuando expresan el mismo patrón, sin duplicar CSS por copiar.

Reading necesita ergonomía propia:

- en escritorio desde 1024 px, split pane redimensionable cercano a 55/45, con scroll
  independiente y “Ir a evidencia” que enfoca el párrafo sin duplicar el texto;
- en tablet, paneles apilables o tabs `Texto | Preguntas` conservando pregunta y tiempo;
- en móvil, tabs o bottom sheet `Texto | Preguntas`, posición de lectura preservada y
  acceso al pasaje sin volver cientos de píxeles;
- ancho y altura de línea cómodos para textos extensos;
- evidencia resaltada solo en Learn/Review o después de contestar;
- Exam sin pistas, funciones de párrafo ni feedback;
- navegación por pregunta con estados respondida, marcada, sin responder y revisada;
- temporizador y estados no dependientes solo del color;
- targets táctiles de al menos 44 × 44 px;
- foco visible, orden de teclado, nombres accesibles, `aria-live` prudente, zoom 200 % y
  `prefers-reduced-motion`;
- preservar selección de texto y no secuestrar atajos del navegador sin necesidad.
- widgets flotantes, incluido WhatsApp, apartados u ocultos durante Practice/Exam para no
  cubrir texto o controles; respetar safe areas y teclado virtual.

Accesibilidad mínima verificable:

- `main`, skip link, breadcrumb como `nav`, headings ordenados y `scroll-margin-top`;
- opciones como `fieldset/legend` o radiogroup real, con comportamiento de flechas;
- progreso con `role="progressbar"` y valores; el timer no se anuncia cada segundo;
- inglés del pasaje marcado `lang="en"` y UI española `lang="es"`;
- tablas y diagramas con alternativa textual e inputs de completion con label asociado;
- no deshabilitar la opción elegida de forma que se pierda el foco tras comprobar;
- no usar `transition: all`, bloquear zoom, impedir paste ni activar autofocus móvil.

Si el split es redimensionable, el control usa `role="separator"`, nombre accesible,
`aria-valuenow/min/max`, flechas y Home/End, además de una distribución fija alternativa.
Si no se puede cumplir, el split permanece fijo. Los tabs usan `tablist/tab/tabpanel`,
roving tabindex y restauran foco y scroll al cambiar entre Texto y Preguntas.

Estados que cada motor debe definir con copy, foco, controles, persistencia y analytics:

```text
idle · selected-unchecked · hint-1 · hint-2 · checked-correct · checked-incorrect
partially-complete · ready-to-submit · submitting · submitted · time-warning
time-expired · offline/retry · restored-session · empty-bank · content-error
```

La URL debe reflejar modo, set/pasaje y pregunta activa. Back/Forward y reload no pueden
borrar respuestas. `Reiniciar pregunta`, `Reiniciar set` y `Nuevo intento` son acciones
distintas y piden confirmación cuando destruirían progreso.

Paridad visual no significa meter un pasaje en el layout de un ensayo. Se conserva el
lenguaje del sistema y se adapta la interacción a lectura sostenida.

### 13.6 Auditoría Playwright de extremo a extremo

Por cada unidad:

- recorrer todos los niveles, sets, botones, opciones, pistas, resets y enlaces;
- probar todos los distractores de cada ítem cubierto y, a escala de la unidad, al menos
  tres distractores distintos cuando existan; verificar feedback específico;
- inspeccionar antes de responder que no se revele clave, evidencia, función o tipo;
- cambiar de ruta, set y modo sin arrastrar estado anterior;
- probar texto libre con espacios, mayúsculas, guiones, números, límite exacto, exceso y
  ortografía incorrecta;
- probar multiselect y su política de crédito;
- simular el reloj para timer, pausa, recarga y caducidad;
- confirmar feedback inmediato solo en Learn y diferido en Practice/Exam;
- recargar y recuperar progreso versionado;
- completar el recorrido solo con teclado;
- revisar 320 × 568, 390 × 844, 768 × 1024, 1024 × 768 y 1440 × 900, además de zoom
  200 %, landscape, textos extremos y safe areas;
- comprobar foco, scroll, sticky panels, overlays y ausencia de overflow horizontal;
- exigir consola sin errores propios ni hydration mismatch;
- guardar capturas de: estado inicial, distractor, correcta, Review y Exam;
- validar un H1, canonical y metadatos coherentes cuando la ruta sea indexable.
- simular offline/retry, storage corrupto, cambio de versión, doble submit y peticiones
  fallidas; todos deben caer en un estado recuperable;
- comprobar que `scrollWidth === clientWidth`, que sticky panels no tapen evidencia y
  que un distractor de 250 caracteres siga siendo usable;
- ejecutar un test metamórfico en formatos donde alterar el orden conserva la convención
  IELTS: permutar opciones mantiene clave semántica, evidencia y feedback. TFNG/YNNG,
  numerales y matching con orden definido no se permutan.

Para el full mock:

- 3 pasajes y 40 preguntas;
- navegación 1–40;
- marcas, sin responder, persistencia y confirmación de envío;
- 60 minutos sin tiempo extra de transferencia;
- corrección posterior y evidencia por ítem;
- multiselect puntuado por número de pregunta: 0/1/2 cuando representa dos puntos, nunca
  un bloque arbitrario 2/0;
- resultado bruto y, solo allí, estimación de banda con aviso.

#### Matriz mínima de salida Playwright

Cada fila aplicable produce aserciones y un artefacto enlazado. Ejecutar “parte de la
lista” no permite marcar Playwright `✅`.

| Superficie | Caso obligatorio | Aserciones mínimas | Artefacto | Gate |
|---|---|---|---|---|
| Smoke | hub, sistema, 14 rutas, diagnóstico, práctica y mock | 200, links sin 404, title/H1/canonical y sin “próximamente” obsoleto | reporte de rutas | todas pasan |
| Learn | happy path y todos los distractores aplicables | cambio antes de Check, pista, feedback distinto, evidencia y foco | trace + capturas | 100 % |
| Practice | editar, marcar y entregar mini-set | cero feedback antes de entregar; score estable al reload | trace | 100 % |
| Exam | navegación, timer, vacías, flag, submit | 3/40/60; cero clave en DOM, ARIA o red antes del submit | trace + snapshot pre-submit | 100 % |
| Review | filtros e ir a evidencia | respuesta propia/clave/trampa/paráfrasis/tiempo; score inmutable | trace + captura | 100 % |
| Navegación | deep link, Back/Forward, reload y nueva pestaña | intento, pregunta, flags y tiempo se restauran por versión | trace | 100 % |
| Accesibilidad | teclado, foco, radiogroup, tabs y modal | flujo principal sin ratón; foco restaurado; nombres y estados correctos | reporte + trace | 100 % |
| Responsive | cinco viewports, zoom, contenido extremo | cero overflow o CTA oculto; sticky/widgets sin solape | screenshots | 100 % |
| Robustez | offline, storage corrupto, doble submit | estado recuperable, submit idempotente, sin pérdida silenciosa | trace | 100 % |
| Sesgo | heurísticos y permutación | posición/longitud bajo umbral; clave semántica estable | reporte JSON/MD | 100 % |

Gate numérico por ejecución:

- 0 `pageerror`;
- 0 `console.error` o `console.warn` no documentados en allowlist;
- 0 requests propios fallidos;
- 0 clave visible/inferible por UI, DOM o ARIA antes del feedback previsto en
  Learn/Practice; en Exam, 0 clave también en bundle, estado, cache o red antes de submit;
- `scrollWidth === clientWidth` en los cinco viewports;
- 0 contenido o CTA oculto en zoom 200 %;
- trace y capturas enlazados desde el registro de evidencia.

Gate de accesibilidad:

- 0 violaciones `serious` o `critical` del auditor automatizado acordado;
- 100 % del flujo principal operable solo con teclado;
- radiogroups operables con flechas;
- foco restaurado después de feedback, modal y cambio de tab;
- contraste WCAG AA;
- zoom 200 % sin pérdida de contenido o funcionalidad.

Si el auditor automatizado requiere instalar `@axe-core/playwright` u otra dependencia,
esa instalación necesita autorización. Hasta disponer de ella, la celda automatizada
queda pendiente; una inspección manual no puede fingir ese gate.

---

## 14. Métricas de aprendizaje y privacidad

Mantener el contrato de `docs/reading-analytics-spec.md` y extenderlo solo con eventos
necesarios, sin guardar texto libre. Como mínimo interesa medir:

- exactitud por `targetSkills`, ruta y nivel de ayuda;
- frecuencia y reincidencia por `observedError`, con `unknown` separado y sin imputación;
- tiempo activo por ítem y abandono;
- uso de pistas;
- cambios de respuesta antes de enviar;
- confianza opcional en escala cerrada;
- transferencia a texto/tema no visto;
- retención diferida;
- reanudación y finalización;
- rendimiento de ítems y distractores.

Los umbrales existentes —por ejemplo, investigar completion <55 %, error de ítem >40 %
o uso de glosario >60 % tras suficiente tráfico— son alarmas de revisión, no prueba de
eficacia ni permiso para cambiar una clave automáticamente.

### Validación de aprendizaje

Un Playwright verde no demuestra que el estudiante aprenda. Para afirmar eficacia:

1. pretest y postest con formas paralelas no vistas;
2. transferencia a tema y pasaje nuevos;
3. retención diferida, idealmente a siete días;
4. medición por código de error, no solo score;
5. piloto moderado inicial con al menos cinco estudiantes;
6. análisis de al menos 30 sesiones completas para detectar ítems sospechosos;
7. revisión humana antes de hacer una afirmación causal.

Antes de recoger datos reales se aprueba un protocolo con consentimiento informado,
retiro sin penalización, minimización, plazo de retención, anonimización o seudonimización,
acceso y eliminación. Cinco estudiantes sirven para usabilidad y 30 sesiones para buscar
ítems sospechosos; ninguna cifra valida eficacia. Diferencias funcionales entre
dispositivos en pruebas sintéticas no son evidencia de sesgo poblacional.

El estudio de eficacia predefine resultado primario, equivalencia y contrabalanceo de
formas, intervalo de retención, tamaño mínimo relevante, intervalos de confianza y
tratamiento de abandonos. Una afirmación causal necesita una comparación apropiada; una
mejora pre/post sin contrafactual solo autoriza lenguaje descriptivo.

Treinta sesiones ayudan a encontrar fallos; no bastan por sí solas para prometer una
subida de banda.

---

## 15. Fases cortas y tablero de control

### Convenciones

- `—`: no auditado.
- `🟡`: en curso; debe enlazar evidencia parcial.
- `⚠️`: fallo corregible identificado.
- `✅`: auditoría completa con evidencia.
- `⛔`: bloqueado; debe registrar causa y siguiente autoridad necesaria.
- `➖`: no aplica, con justificación reproducible; nunca se usa para evitar una prueba que
  sí corresponde.
- Una iteración toma **una sola fila**.
- Las celdas no heredan verde de otra fila.
- “Construido” y “auditado” son estados distintos.

| Fase | Unidad vertical | Derechos | Full-stack | IELTS | Walkthrough cognitivo | Anti-sesgo | UI/UX | Playwright |
|---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | Snapshot reproducible del estado actual | ➖ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 0 | Contrato oficial 11 tipos ↔ 14 rutas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 0 | Inventario de contenido, procedencia y cuarentena — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| 0 | ↳ F0.1 Censo canónico, grain e identidad por hashes | ✅ | ✅ | ✅ | ➖ | ✅ | ➖ | ➖ |
| 0 | ↳ F0.2 Adjudicación de procedencia, `rightsBasis` y fuentes factuales — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| 0 | 　 ↳ F0.2a Contrato deny-by-default y expediente de mock `set-1` | ✅ | ✅ | ✅ | ➖ | ✅ | ➖ | ➖ |
| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| 0 | 　　　 ↳ F0.2b.1 Multiple Choice: expediente de tres pasajes | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.2 True/False/Not Given | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.3 Yes/No/Not Given | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.4 Matching Information | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.5 Matching Headings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.6 Matching Features | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.7 Matching Sentence Endings | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.8 Sentence Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.10 Note Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.11 Table Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |
| 0 | 　　　 ↳ F0.2b.12 Flow-chart Completion | — | — | — | — | — | — | — |
| 0 | 　　　 ↳ F0.2b.13 Diagram Labeling | — | — | — | — | — | — | — |
| 0 | 　　　 ↳ F0.2b.14 Short Answer | — | — | — | — | — | — | — |
| 0 | 　　　 ↳ F0.2b.15 Regresión integrada de bancos formativos | — | — | — | — | — | — | — |
| 0 | 　 ↳ F0.2c Adjudicación de bancos de habilidades | — | — | — | — | — | — | — |
| 0 | 　 ↳ F0.2d Adjudicación de mocks restantes por lotes verificables | — | — | — | — | — | — | — |
| 0 | 　 ↳ F0.2e Adjudicación del hub legado y sus claims | — | — | — | — | — | — | — |
| 0 | 　 ↳ F0.2f Resolución humana/licencias y regresión integrada | — | — | — | — | — | — | — |
| 0 | ↳ F0.3 Enforcement de cuarentena en rutas formativas y habilidades | — | — | — | — | — | — | — |
| 0 | ↳ F0.4 Enforcement de cuarentena en mocks y hub legado | — | — | — | — | — | — | — |
| 0 | ↳ F0.5 Regresión integrada y cierre del inventario | — | — | — | — | — | — | — |
| 0 | Validador dedicado y reporte anti-atajos | — | — | — | — | — | — | — |
| 1 | Contrato versionado de pasaje, tarea, pregunta y review | — | — | — | — | — | — | — |
| 1 | Estado de intento, modos y analytics privados | — | — | — | — | — | — | — |
| 1 | Shell visual compartido con Task 2 | — | — | — | — | — | — | — |
| 2 | Hub honesto: Academic/GT, rutas reales y sin contenido obsoleto | — | — | — | — | — | — | — |
| 2 | Sistema de resolución de ocho pasos | — | — | — | — | — | — | — |
| 3 | Piloto vertical TFNG | — | — | — | — | — | — | — |
| 3 | Piloto vertical Matching Headings | — | — | — | — | — | — | — |
| 3 | Piloto vertical Summary Completion | — | — | — | — | — | — | — |
| 3 | Decisión documentada de escalar o rediseñar motores | — | — | — | — | — | — | — |
| 4 | Skimming | — | — | — | — | — | — | — |
| 4 | Scanning | — | — | — | — | — | — | — |
| 4 | Paráfrasis | — | — | — | — | — | — | — |
| 4 | Inferencia y postura | — | — | — | — | — | — | — |
| 4 | Alcance, cuantificadores, negación y causalidad | — | — | — | — | — | — | — |
| 4 | Referencia, cohesión y función de párrafo | — | — | — | — | — | — | — |
| 4 | Forma gramatical, ortografía y límite | — | — | — | — | — | — | — |
| 4 | Tiempo, triage, marcar y volver | — | — | — | — | — | — | — |
| 5 | Multiple Choice | — | — | — | — | — | — | — |
| 5 | Yes/No/Not Given | — | — | — | — | — | — | — |
| 5 | Matching Information | — | — | — | — | — | — | — |
| 5 | Matching Features | — | — | — | — | — | — | — |
| 5 | Matching Sentence Endings | — | — | — | — | — | — | — |
| 5 | Sentence Completion | — | — | — | — | — | — | — |
| 5 | Note Completion | — | — | — | — | — | — | — |
| 5 | Table Completion | — | — | — | — | — | — | — |
| 5 | Flow-chart Completion | — | — | — | — | — | — | — |
| 5 | Diagram Labeling | — | — | — | — | — | — | — |
| 5 | Short Answer | — | — | — | — | — | — | — |
| 6 | Screener 12–16 ítems, cuatro macrofamilias, sin banda | — | — | — | — | — | — | — |
| 6 | Recomendación explicable por patrón de error | — | — | — | — | — | — | — |
| 6 | Transferencia mixta con textos nuevos | — | — | — | — | — | — | — |
| 7 | Pasaje completo, dificultad 1 | — | — | — | — | — | — | — |
| 7 | Pasaje completo, dificultad 2 | — | — | — | — | — | — | — |
| 7 | Pasaje completo, dificultad 3 | — | — | — | — | — | — | — |
| 7 | Simulacro 3 pasajes / 40 preguntas | — | — | — | — | — | — | — |
| 7 | Review 1–40 y estimación responsable | — | — | — | — | — | — | — |
| 8 | Revisión humana y piloto de cinco estudiantes | — | — | — | — | — | — | — |
| 8 | Analytics de 30 sesiones completas | — | — | — | — | — | — | — |
| 8 | Pre/post, transferencia y retención | — | — | — | — | — | — | — |
| 9 | Gate estadístico anti-atajos agregado | — | — | — | — | — | — | — |
| 9 | Accesibilidad, rendimiento y responsive final | — | — | — | — | — | — | — |
| 9 | Auditoría de derechos y fuentes final | — | — | — | — | — | — | — |
| 9 | Regresión completa y cierre de construcción | — | — | — | — | — | — | — |

### Evidencia — 2026-08-09 — Snapshot reproducible del estado actual

- Alcance: baseline de Git, rutas, bancos formativos, mocks, scoring, sesgos, guardianes,
  recorrido cognitivo, paridad visual con Task 2, responsive, DOM accesible, consola y red.
- Estado de rama y cambios ajenos preservados: `codex/ielts-task2-introduction-pilot`,
  `HEAD cf037bf`; no se tocó implementación/datos de Reading ni cambios previos de Task 2.
- Resultado antes → después: observaciones dispersas → snapshot fechado y reproducible.
- Derechos `➖`: esta fila es read-only y no introduce, transforma ni publica contenido;
  el inventario y la autoridad de cada pasaje siguen abiertos en su fila dedicada.
- `✅` en esta fila significa **auditoría completa del baseline**, no producto conforme ni
  contenido aprobado. No se inventó resolución a ciegas, axe, firma humana o prueba real.
- Hallazgos bloqueantes reproducidos: 11 tipos oficiales frente a 14 rutas internas mal
  rotuladas; 0/42 pasajes formativos y 0/60 secciones mock con metadata estructurada;
  0/260 ítems con evidencia estructurada; Mixed 12/12 en A; mocks MCQ 0/51/26;
  464/534 blanks sin `maxWords`; multiselect 2/0; hub obsoleto y fugas pre-respuesta.
- Guardianes: catálogo, reading-content, TypeScript y build pasan; el gate general de
  práctica y dos tests del motor Reading general tienen fallos previos documentados.
- Reproducibilidad cuantitativa: extractor persistente + `baseline.json` determinista con
  hashes de fuentes; dos ejecuciones produjeron el mismo SHA-256. La auditoría ampliada
  conserva 58 cortes, 572 resultados heurísticos, seis pruebas de términos absolutos y
  870 permutaciones sin fallo entre corpus formativo y mocks; todos los resultados
  estadísticos siguen provisionales.
- Reproducibilidad de navegador: la sesión hidratada por `localhost` conserva click →
  feedback/bloqueo → reload/reset, fallo deliberado, cero `pageerror` y el error CSP real.
- Smoke exacto: 23/23 rutas y 23/23 destinos internos en 200; cinco viewports, zoom 200 %,
  teclado/semántica y superficies aún 404 quedaron persistidos en runner + JSON. El ✅
  demuestra cobertura del baseline, no que los fallos encontrados estén resueltos.
- Walkthrough: se recorrieron los diez pasos obligatorios; el ✅ certifica que cada paso
  quedó observado y clasificado, no que el producto actual los supere.
- Evidencia completa, metodología, comandos, capturas y limitaciones:
  [`output/playwright/ielts-reading-baseline-2026-08-09/report.md`](../output/playwright/ielts-reading-baseline-2026-08-09/report.md).
- Siguiente fila, sin adelantar trabajo: `Contrato oficial 11 tipos ↔ 14 rutas`.

### Evidencia — 2026-08-09 — Contrato oficial 11 tipos ↔ 14 rutas

- Alcance cerrado: fuente de verdad versionada para 11 tipos oficiales de IELTS Academic
  Reading y 14 rutas WeLearn; matriz exacta por número, ID, nombre y slugs.
- Resultado antes → después: claim ambiguo de 14 tipos y cuatro variantes del tipo 9
  tratadas como independientes → mapa 1–11, tipo 9 con cuatro rutas pedagógicas
  explícitas y claim aprobado `11 tipos oficiales numerados · 14 rutas WeLearn`.
- Derechos ✅: referencia factual acotada a nombres/numeración, dos fuentes oficiales
  conservadas, disclaimer independiente y 0 preguntas, pasajes o logotipos copiados.
- Full-stack ✅: contrato v1, IDs/slugs estables, lookup fail-fast y test de matriz total;
  el catálogo publicado coincide 1:1 con los 14 slugs.
- IELTS ✅: lista y agrupación contrastadas con la fuente oficial vigente y revisión
  independiente en contexto limpio. No se presentó una firma humana inexistente.
- Walkthrough/UI ✅: diferencia 11/14 visible desde el hero, cuatro hijas del tipo 9
  coherentes, breadcrumbs semánticos y paridad local con Task 2. La política de idioma
  del shell global queda registrada para su propia fila transversal.
- Anti-sesgo ✅: el orden deriva de IELTS, no de una secuencia arbitraria; 0 claves en
  atributos DOM y `questionType`/función de párrafo ocultos pre-respuesta. La estadística
  de posición no aplica al contrato y no se fingió. El banco histórico 12/12 en A y la
  clave disponible en props cliente siguen abiertos para sus filas posteriores; esta
  unidad no certifica balance estadístico ni secreto de modo Exam.
- Playwright ✅: 28/28 sobre build de producción local; 14/14 destinos en 200, matriz DOM
  exacta, interacción por teclado, reload, cinco viewports y reflow 200 % sin overflow;
  0 `pageerror`, 0 errores propios y 0 requests internas fallidas.
- Guardianes propios: contrato 8/8, ESLint, TypeScript, catálogo 465 y build 1263/1263
  pasan. El gate general conserva solo ocho fallos previos de Task 2 y 0 de Reading.
- Evidencia completa, hashes, runner, JSON y capturas:
  [`output/playwright/ielts-reading-contract-2026-08-09/report.md`](../output/playwright/ielts-reading-contract-2026-08-09/report.md).
- Siguiente fila, sin adelantar trabajo: `Inventario de contenido, procedencia y cuarentena`.

### Evidencia — 2026-08-09 — F0.1 Censo canónico, grain e identidad por hashes

- La fila padre se dividió antes de trabajarla. Solo F0.1 se cerró; adjudicación de
  derechos, enforcement por superficies y regresión integrada permanecen abiertas.
- Resultado antes → después: conteos agregados sin identidad por ocurrencia → 120 activos
  únicos, 310 grupos, 1.152 decisiones, 116 ocurrencias textuales y 115 pasajes canónicos
  identificados por hash. Un pasaje exacto se reutiliza y cuatro sets no contienen texto
  completo extraíble.
- Derechos ✅ significa **censo y clasificación conservadora**, no clearance: 0/120 con
  `rightsBasis`, autor, revisor o fuentes factuales; 120/120 `unknown-quarantined` y
  120 contradicciones runtime registradas para F0.3/F0.4.
- La búsqueda externa fue dirigida y no exhaustiva: tres secciones consecutivas de
  `set-1` coinciden con alta confianza con Cambridge IELTS 5 Academic Reading Test 2.
  Solo prioriza revisión; no concluye titularidad, infracción ni estado de los otros 117.
- Full-stack/datos ✅: 59 IDs declarados + 61 sintéticos deterministas; 20 imports, 20
  keys y mapeo `key → binding → file → mock.id` exacto; 47 fuentes hasheadas; JSON, TSV y
  paquete ciego alineados. Una mutación simulada de un statement legado cambia su hash.
- IELTS independiente ✅: revisión en contexto limpio y sin claves confirma grano,
  exhaustividad allowlisted, 119 módulos Academic solo inferidos y el hub legado
  `missing-or-ambiguous`. No certifica respuestas, dificultad, derechos ni calidad.
- Anti-sesgo/anti-fugas ✅: escaneo recursivo ejecutable sobre inventario y paquete ciego;
  0 campos de respuestas/opciones y 0 PII. La búsqueda externa no se generaliza y la
  reutilización textual no puede contarse como transferencia independiente.
- Walkthrough, UI/UX y Playwright `➖`: F0.1 no cambia ruta, componente, DOM, feedback ni
  decisión del estudiante. El HTML técnico fue validado aparte y no finge paridad Task 2
  ni prueba de producto.
- Guardianes: extractor determinista y ESLint pasan; catálogo 465, TypeScript y build
  1.263/1.263 pasan. El gate global conserva ocho fallos previos de Writing Task 2 y
  cero fallos Reading; no se silenciaron ni se arreglaron en esta unidad.
- Reporte portable: validación, package y verificación Chromium pasan en 1440/390, con
  un gráfico, cinco métricas, seis tablas y diálogo de fuentes.
- Evidencia completa, artefactos, hashes, comandos y límites:
  [`output/audits/ielts-reading-inventory-2026-08-09/report.md`](../output/audits/ielts-reading-inventory-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2 Adjudicación de procedencia, rightsBasis y
  fuentes factuales`. La fila padre sigue 🟡.

### Evidencia — 2026-08-09 — F0.2a Contrato deny-by-default y expediente de `set-1`

- Alcance mínimo cerrado: contrato versionado, registro y expediente para las tres
  secciones Reading de `set-1`; F0.2 padre y el enforcement runtime siguen 🟡.
- Resultado antes → después: un booleano genérico `copyrightChecked` sin evidencia
  ejecutable → tres identidades fijadas por hash, cinco gates independientes y decisión
  fail-closed. Registro ausente, contenido mutado o contrato inválido quedan en
  cuarentena.
- Derechos/procedencia ✅ significa **control conservador, no clearance**: 3/3 mantienen
  `unknown-quarantined`, coincidencia editorial solo probable, autorización no localizada
  en las fuentes revisadas, autor desconocido y revisión humana pendiente. La búsqueda
  fue dirigida/no exhaustiva y no concluye ausencia universal, titularidad o infracción.
- Full-stack/datos ✅: cobertura exacta 3/3, hashes de objeto y pasaje alineados con F0.1,
  schema/módulo/default/IDs/evidence kinds validados y 18/18 transiciones adversariales
  bloqueadas o permitidas según contrato. Fechas imposibles, bases desconocidas,
  duplicados, evidencia del tipo incorrecto y campos en blanco fallan cerrados.
- IELTS ciego ✅: el packet conserva identidad, hashes, evidencia y estados, pero no
  pasajes, preguntas, opciones ni claves. `Academic` sigue inferido desde el mock padre y
  por eso produce `module-not-declared`; no se presentó como declaración editorial.
- Anti-sesgo/independencia ✅: automatización nunca equivale a aprobación humana;
  auto-revisión normalizada, estado humano/factual desconocido, falsa aprobación del
  triage y falta de atestación quedan bloqueados. El escáner detecta variantes de claves,
  email, teléfono y PII de estudiante/contacto, distinguiéndolos de identidad editorial.
- Walkthrough, UI/UX y Playwright `➖`: la subunidad no cambia rutas, componentes, DOM,
  copy, feedback ni comportamiento del alumno. El mock continúa visible hasta F0.4; este
  `PASS` no certifica contenido, respuestas, dificultad, accesibilidad ni publicación.
- Panel final: derechos, full-stack, IELTS ciego y anti-sesgo `PASS` sin bloqueantes;
  los dos bypasses encontrados durante la auditoría se reprodujeron, corrigieron y
  reauditaron antes del cierre.
- Guardianes propios: 8/8 tests, 18/18 mutaciones, dos `--check` deterministas, ESLint y
  TypeScript pasan. Catálogo 465 y build 1.263/1.263 pasan; el gate global conserva ocho
  fallos previos de Writing Task 2 y cero fallos Reading.
- Reporte portable: validación, package y verificación Chromium pasan en 1440/390, con
  un gráfico, tres métricas, tres tablas, diálogo de fuentes y 3/3 decisiones visibles.
- Evidencia completa, hashes, packet ciego, dictámenes y límites:
  [`output/audits/ielts-reading-rights-set1-2026-08-09/report.md`](../output/audits/ielts-reading-rights-set1-2026-08-09/report.md).
- La subunidad siguiente de ese padre, `F0.2b.1 Multiple Choice`, queda cerrada en la
  evidencia inmediatamente inferior; F0.2 y F0.2b continúan 🟡.

### Evidencia — 2026-08-09 — F0.2b.1 Multiple Choice: expediente de tres pasajes

- Alcance mínimo cerrado: los tres pasajes y 18 preguntas del banco formativo Multiple
  Choice. F0.2b.2 se cierra en la evidencia inmediatamente inferior; no se inició
  F0.2b.3 y F0.2b padre continúa 🟡.
- Resultado antes → después: tres objetos visibles con claim de originalidad, sin
  procedencia estructurada ni revisión factual → identidades fijadas por hash, registro
  v2 fail-closed, investigación candidata por activo, revisión experta ciega en dos
  pases, walkthrough cognitivo y perfil anti-atajos reproducible.
- Derechos/procedencia ✅ significa **expediente completo y decisión conservadora, no
  clearance**: 3/3 siguen `unknown-quarantined`; autoría, titularidad, licencia,
  declaración de módulo y aprobación humana continúan sin resolver. La búsqueda externa
  fue dirigida/no exhaustiva y no prueba originalidad ni ausencia universal.
- Full-stack/datos ✅: catálogo, baseline y registry coinciden en los seis hashes; el
  contrato v2 bloquea estados, fechas, shapes, evidencias, políticas o bases de derechos
  inválidas. F0.2a aporta 8/8 tests y F0.2b.1 9/9; las mutaciones de contenido y las 54
  permutaciones de opciones fallan o preservan la clave semántica según corresponde.
- IELTS ✅ certifica la **auditoría, no la calidad del banco**: el experto independiente
  reprodujo 18/18 claves y encontró cero ambigüedades materiales, pero calificó los tres
  pasajes `mixed` por distractores fáciles, inferencia limitada y riesgos factuales. Los
  claims del estudio de sueño y tres claims de Millgate siguen sin trazabilidad.
- Walkthrough cognitivo ✅: simulación limpia de estudiante promedio sobre el packet
  ciego, con cobertura 3/3 de barreras, atajos, valor formativo y acción siguiente. No
  selecciona respuestas, no asigna banda y no representa a un alumno real.
- Anti-sesgo ✅ significa **detección completa y bloqueo**, no balance certificado:
  A/B/C/D = 6/8/4/0; en 10 de 13 preguntas la correcta es la opción únicamente más
  larga. Con n=18 no se emite certificación estadística y `contentCertification` queda
  `blocked-editorial-rebalancing-required`.
- UI/UX y Playwright `➖`: la subunidad solo cambia contrato, registro, validadores,
  pruebas y artefactos. Los hashes de catálogo, ruta y motor coinciden con el baseline;
  no cambió ruta, DOM, copy, interacción ni comportamiento learner-facing.
- Guardianes: dos `--check` deterministas, 17/17 tests, ESLint, TypeScript, catálogo 465
  y build 1.263/1.263 pasan. El gate global conserva ocho fallos preexistentes de Writing
  Task 2 y cero de Reading; no se silenciaron ni se corrigieron.
- Reporte portable: validation/package/Chromium verification pasan en 1440/390, con
  cuatro métricas, dos gráficos, dos tablas y diálogo de fuentes.
- Evidencia completa, packet ciego, contraste factual, dictámenes y límites:
  [`output/audits/ielts-reading-rights-multiple-choice-2026-08-09/report.md`](../output/audits/ielts-reading-rights-multiple-choice-2026-08-09/report.md).
- Siguiente subunidad ya cerrada en la evidencia inferior: `F0.2b.2 True/False/Not Given`.

### Evidencia — 2026-08-09 — F0.2b.2 True/False/Not Given: expediente de tres sets

- Alcance mínimo cerrado: los tres pasajes y 22 enunciados del banco formativo TFNG.
  El activo legado del hub queda reservado para F0.2e; en esta subunidad todavía no se
  había iniciado F0.2b.3 y el padre F0.2b continúa 🟡.
- Resultado antes → después: tres sets visibles con claim de originalidad, claves sin
  adjudicación independiente y fuentes sin vínculo estructurado → identidad fijada por
  hash, registro v2 fail-closed, búsqueda de procedencia registrada, ocho fuentes
  candidatas con respuesta hasheada, primer pase ciego persistido, revisión directa de
  fuentes, walkthrough cognitivo y perfil anti-atajos multidimensional.
- Derechos/procedencia ✅ significa **expediente completo y cuarentena, no clearance**:
  3/3 continúan `unknown-quarantined`; no hay autoría, titularidad, licencia, revisión
  factual humana ni aprobación independiente. La búsqueda fue dirigida/no exhaustiva;
  no encontrar coincidencia exacta no demuestra originalidad ni ausencia universal.
- Full-stack/datos ✅: baseline, catálogo y registry coinciden en seis hashes; el
  contrato rechaza registros incompletos o contenido mutado. Los packets usan allowlist,
  escaneo de claves/PII en nombres y valores, y un control adversarial detecta
  `Correct answer ... is FALSE`. El primer pase referencia el SHA del packet neutral y
  el segundo pase referencia el SHA del primer pase persistido.
- IELTS ✅ certifica la **auditoría, no el banco**: el experto limpio revisó 22/22 desde
  el packet sin títulos pedagógicos y luego abrió las ocho fuentes. Coincidió con 19/22
  claves; refutó `tfng-libraries-05` y `tfng-coastal-03`, cambió
  `tfng-urban-trees-05`, y marcó ambigüedad material en urban-03 y urban-05. Por eso la
  publicación y la certificación de contenido permanecen bloqueadas.
- Walkthrough cognitivo ✅ para contenido: simulación prospectiva ciega 3/3 y 22/22,
  con lectura probable, búsqueda de evidencia, regla de decisión y reparación. No
  asigna respuestas ni bandas y no sustituye prueba de usuario, retención o eficacia
  con estudiantes reales.
- Anti-sesgo ✅ significa **detección completa y bloqueo, no balance certificado**:
  claves almacenadas TRUE/FALSE/NG = 7/11/4; responder siempre FALSE obtiene 50%, y el
  atajo “cuantificador absoluto → FALSE” acierta 8/10 de los ítems donde aplica. También
  se miden racha, secuencia, longitud, solapamiento léxico, desglose por set,
  representación, conocimiento previo y carga irrelevante. Con n=22 no hay
  certificación estadística.
- UI/UX y Playwright `➖`: exclusión local al delta de F0.2b.2. Los hashes del catálogo,
  ruta TFNG, `ObjectivePracticeEngine` y `ObjectivePracticeSetBank` permanecen idénticos
  al baseline, y `src/app`/`src/components` no importan el expediente. No certifica la
  UI existente, accesibilidad, paridad Task 2, layouts compartidos ni el producto.
- Límites del proceso: el hash local del primer pase no es un testigo append-only
  externo; la revisión directa de fuentes es una declaración de proceso con IDs y
  locators, no firma humana; un locator EPA sigue una subpágina enlazada desde la URL
  candidata. Ninguno de esos límites se presenta como factualización o clearance.
- Guardianes: dos `--check` deterministas, 13/13 pruebas TFNG, 30/30 pruebas Reading
  acumuladas, ESLint, TypeScript, catálogo 465 y build 1.263/1.263 pasan. El gate global
  conserva ocho fallos preexistentes de Writing Task 2 y cero de Reading; no se
  silenciaron ni se corrigieron.
- Reporte portable: validation/package/Chromium verification pasan en 1440/390, con
  cuatro métricas, dos gráficos, dos tablas y diálogo de fuentes.
- Evidencia completa, packets, primer pase, contraste factual, dictámenes y límites:
  [`output/audits/ielts-reading-rights-tfng-2026-08-09/report.md`](../output/audits/ielts-reading-rights-tfng-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.3 Yes/No/Not Given`.

### Evidencia — 2026-08-09 — F0.2b.3 Yes/No/Not Given: expediente de tres sets

- Alcance mínimo cerrado: tres pasajes y 22 enunciados del banco formativo YNNG. El
  padre F0.2b continúa 🟡; no se modificó ni se inició ninguna unidad posterior.
- Resultado antes → después: tres sets visibles con afirmaciones de originalidad,
  claves sin adjudicación independiente y fuentes sin vínculo estructurado → identidad
  fijada por hashes, registro deny-by-default, búsqueda de procedencia trazable, ocho
  fuentes candidatas con respuesta hasheada, primer pase ciego persistido, contraste
  factual directo, walkthrough cognitivo y perfil anti-atajos multidimensional.
- Derechos/procedencia ✅ significa **expediente completo y cuarentena, no clearance**:
  3/3 activos siguen `unknown-quarantined`; faltan autoría, titularidad, licencia,
  revisión factual humana y aprobación humana independiente. La búsqueda fue dirigida
  y no exhaustiva; no encontrar coincidencias exactas no prueba originalidad.
- Full-stack/datos ✅: catálogo, baseline y registry coinciden por objeto y pasaje; el
  contrato falla cerrado ante mutación, referencias incompletas o estados inválidos.
  Los packets aplican allowlists y escaneo recursivo de claves, feedback, PII y texto
  que revele respuestas; un control adversarial detecta una clave incrustada en valores.
- IELTS ✅ certifica la **auditoría, no el banco**: el experto independiente revisó
  22/22 ítems desde el packet ciego, persistió sus decisiones y después abrió ocho
  fuentes. Coincidió con 22/22 claves, pero marcó ambigüedad material en
  `ynng-station-art-07` y `ynng-uniforms-04`; los tres pasajes obtuvieron fitness
  `mixed`. La publicación y `contentCertification` permanecen bloqueadas.
- Walkthrough cognitivo ✅ para contenido: simulación prospectiva limpia 3/3 y 22/22,
  con lectura probable, búsqueda de evidencia, control de atribución, regla de decisión
  y reparación. No asigna respuestas ni bandas y no sustituye un estudio con alumnos.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio certificado**: claves
  almacenadas YES/NO/NOT GIVEN = 9/8/5; la regla de lenguaje absoluto o de grado → NO
  acierta 6/11 casos elegibles. También se auditan racha, secuencia, longitud,
  solapamiento léxico, verbos de postura, desglose por set, título, representación,
  conocimiento previo y carga irrelevante. Con n=22 no hay certificación estadística.
- UI/UX y Playwright `➖`: exclusión local al delta F0.2b.3. Los hashes del catálogo,
  ruta YNNG, `ObjectivePracticeEngine` y `ObjectivePracticeSetBank` siguen iguales al
  baseline y el runtime learner-facing no importa el expediente. Esto no certifica la
  interfaz existente, accesibilidad, paridad Task 2 ni el producto global.
- Fuentes oficiales: la regla YNNG se fija desde el formato oficial de IELTS Academic
  Reading. Las fuentes institucionales candidatas contextualizan 13 claims, pero el
  segundo pase encontró 2 respaldados, 7 simplificados en exceso y 4 no trazables; no
  convierten los pasajes en contenido verificado ni licenciado.
- Guardianes: dos `--check` deterministas, 14/14 pruebas YNNG, 44/44 pruebas de derechos
  Reading acumuladas, ESLint, TypeScript, catálogo 465 y build 1.263/1.263 pasan. El
  gate global conserva ocho fallos preexistentes de Writing Task 2 y cero de Reading;
  no se silenciaron ni se corrigieron en esta unidad.
- Reporte portable: validation/package/Chromium verification pasan en 1440/390, con
  cuatro métricas, dos gráficos, dos tablas, diálogo de fuentes y hashes enlazados al
  `validation.json` actual.
- Evidencia completa, packets, primer pase, contraste factual, dictámenes y límites:
  [`output/audits/ielts-reading-rights-ynng-2026-08-09/report.md`](../output/audits/ielts-reading-rights-ynng-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.4 Matching Information`.

### Evidencia — 2026-08-09 — F0.2b.4 Matching Information: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 15 párrafos y 18 enunciados del banco formativo
  Matching Information. El padre F0.2b continúa 🟡; no se modificó ni se inició ninguna
  unidad posterior.
- Resultado antes → después: contenido visible con afirmaciones de originalidad, claves
  sin adjudicación independiente y fuentes sin vínculo estructurado → identidad fijada
  por hashes, registro deny-by-default, búsqueda de procedencia trazable, diez fuentes
  con disponibilidad hasheada, primer pase ciego persistido, contraste factual directo,
  walkthrough cognitivo y perfil anti-atajos multidimensional.
- Derechos/procedencia ✅ significa **expediente completo y cuarentena, no clearance**:
  3/3 activos siguen `unknown-quarantined`; faltan autoría, titularidad, licencia,
  revisión factual humana y aprobación humana independiente. La búsqueda fue dirigida
  y no exhaustiva; no encontrar coincidencias exactas no prueba originalidad.
- Full-stack/datos ✅: catálogo, baseline y registry coinciden por objeto y pasaje; el
  contrato falla cerrado ante mutación, referencias incompletas, estados inválidos o
  fuga de una asignación párrafo–enunciado en inglés o español.
- IELTS ✅ certifica la **auditoría, no el banco**: el experto independiente revisó
  18/18 ítems desde el packet ciego, persistió sus decisiones y después abrió las nueve
  fuentes factuales candidatas. Coincidió con 18/18 claves y no halló ambigüedad
  material, pero calificó los tres pasajes con fitness `mixed`; el contenido sigue
  bloqueado por autenticidad, factualidad, derechos y riesgo de atajos.
- Walkthrough cognitivo ✅ para contenido: simulación prospectiva limpia 3/3 y 18/18,
  con lectura probable, búsqueda de evidencia, control de paráfrasis, competidor y
  reparación. No asigna respuestas ni bandas y no sustituye un estudio con alumnos.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio certificado**: las claves
  almacenadas A/B/C/D/E = 3/5/3/4/3; el atajo posicional A→E acierta 11/15 casos
  elegibles. También se auditan racha, secuencia, longitud, solapamiento léxico,
  competidores, desglose por set, título, representación, conocimiento previo y carga
  irrelevante. Con n=18 no hay certificación estadística ni de contenido.
- Fuentes oficiales: la regla Matching Information se fija desde el formato oficial de
  IELTS Academic Reading y conserva la posible reutilización de párrafos cuando la
  instrucción lo permite. El segundo pase clasificó 15 claims: 3 respaldados, 5
  simplificados en exceso y 7 no trazables; esto no convierte los pasajes en material
  verificado ni licenciado.
- UI/UX y Playwright `➖`: exclusión local al delta F0.2b.4. Los hashes del catálogo,
  ruta Matching Information, `MatchingInformationEngine` y
  `MatchingInformationPassageBank` siguen iguales al baseline y el runtime
  learner-facing no importa el expediente. Esto no certifica la interfaz existente,
  accesibilidad, paridad Task 2 ni el producto global.
- Guardianes: dos `--check` deterministas, 14/14 pruebas Matching Information, 58/58
  pruebas de derechos Reading acumuladas, ESLint, TypeScript, catálogo 465 y build
  1.263/1.263 pasan. El gate global conserva ocho fallos preexistentes de Writing Task 2
  y cero de Reading; no se silenciaron ni se corrigieron en esta unidad.
- Reporte portable: validation/package/Chromium verification pasan en 1440/390, con
  cuatro métricas, dos gráficos, dos tablas, diálogo de fuentes y hashes enlazados al
  `validation.json` actual.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-matching-information-2026-08-09/report.md`](../output/audits/ielts-reading-rights-matching-information-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.5 Matching Headings`.

### Evidencia — 2026-08-09 — F0.2b.5 Matching Headings: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 17 párrafos/decisiones y 27 candidatos de
  heading del banco formativo Matching Headings. El padre F0.2b continúa 🟡 y
  F0.2b.6 no se modificó ni se inició.
- Resultado antes → después: contenido visible con claims de originalidad, claves sin
  adjudicación independiente y sin fuentes ligadas al activo → identidad por hashes,
  registro deny-by-default, búsqueda de procedencia trazable, diez fuentes disponibles
  y hasheadas, primer pase ciego persistido, contraste factual directo, walkthrough
  cognitivo y perfil anti-atajos multidimensional.
- Derechos/procedencia ✅ significa **expediente completo y cuarentena, no clearance**:
  3/3 activos siguen `unknown-quarantined`; faltan autoría, licencia, autorización del
  titular, revisión factual humana y aprobación humana independiente. La búsqueda fue
  dirigida y no exhaustiva; no encontrar coincidencias exactas no prueba originalidad.
- Full-stack/datos ✅: catálogo, baseline y registry coinciden por objeto y pasaje; el
  contrato cubre 3/17/27, falla cerrado ante mutación o fuga de heading en inglés o
  español y detecta que el runtime actual no impide reutilizar un heading, aunque la
  regla oficial y las claves almacenadas exigen no reutilización dentro del set.
- IELTS ✅ certifica la **auditoría, no el banco**: el experto independiente resolvió
  17/17 párrafos desde el packet ciego, persistió las decisiones y después abrió nueve
  fuentes candidatas. Coincidió con 17/17 claves y no halló ambigüedad material, pero
  calificó los tres pasajes con fitness `mixed`; las tareas son demasiado fáciles y
  predecibles para certificar calidad IELTS.
- Walkthrough cognitivo ✅ para contenido: simulación prospectiva limpia 3/3 y 17/17,
  con lectura global, compresión de idea principal, comparación de headings, rechazo
  del competidor y reparación. No asigna claves ni bandas y no sustituye un estudio con
  estudiantes reales.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio certificado**: conteos
  i/ii/iii/iv/v/vi/vii/viii/ix = 3/0/3/2/2/1/2/2/2; el heading `ii` nunca es correcto;
  el máximo solapamiento léxico acierta 6/14 casos con ganador único; el heurístico de
  lenguaje extremo marca nueve opciones, de las cuales ocho nunca son correctas y una
  es un uso contextual legítimo. También se auditan posición, longitud, secuencia,
  competidores, título, representación, conocimiento previo y carga irrelevante. Con
  n=17 no hay certificación estadística ni de contenido.
- Fuentes oficiales: la regla Matching Headings se fija desde el formato oficial de
  IELTS Academic Reading: idea principal, números romanos, más headings que secciones,
  opciones sin usar y no reutilización. El segundo pase clasificó 15 claims: 1
  respaldado, 9 simplificados en exceso y 5 no trazables; esto no convierte los pasajes
  en material verificado, licenciado ni publicable.
- UI/UX y Playwright `➖`: exclusión local al delta F0.2b.5. Los hashes del catálogo,
  ruta Matching Headings, motor, banco y tres dependencias compartidas visibles siguen
  iguales al baseline y el runtime learner-facing no importa el expediente.
  Esto no certifica la interfaz existente, accesibilidad, paridad Task 2 ni el flujo.
- Guardianes: dos `--check` deterministas, 14/14 pruebas Matching Headings, 72/72
  pruebas de derechos Reading acumuladas, ESLint, TypeScript, catálogo 465 y build
  1.263/1.263 pasan. El gate global conserva ocho fallos preexistentes de Writing Task 2
  y cero de Reading; no se silenciaron ni se corrigieron en esta unidad.
- Reporte portable: validation/package/Chromium verification pasan en 1440/390, con
  cuatro métricas, dos gráficos, dos tablas, diálogo de fuentes y hashes enlazados al
  `validation.json` actual. Esa verificación cubre el reporte, no la ruta del alumno.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-matching-headings-2026-08-09/report.md`](../output/audits/ielts-reading-rights-matching-headings-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.6 Matching Features`.

### Evidencia — 2026-08-09 — F0.2b.6 Matching Features: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 14 features visibles y 19 statements del banco
  formativo Matching Features. El padre F0.2b continúa 🟡 y F0.2b.7 permanece abierto,
  sin cambios en su ruta, motor, banco ni tres objetos de catálogo.
- Resultado antes → después: contenido visible con cinco claims de originalidad/revisión,
  entidades no declaradas reales, compuestas o ficticias, claves sin adjudicación
  independiente y sin fuentes ligadas al activo → identidad por hashes, registry v6
  deny-by-default, búsqueda dirigida de procedencia, ledger de 16 fuentes, primer pase
  ciego persistido, contraste factual directo, walkthrough y controles anti-fuga EN/ES.
- Derechos/procedencia ✅ significa **expediente completo y cuarentena, no clearance**:
  3/3 activos siguen `unknown-quarantined`; faltan autoría, naturaleza de las entidades,
  licencia, autorización del titular, revisión factual humana y aprobación humana
  independiente. La búsqueda fue dirigida y no exhaustiva; no encontrar una coincidencia
  exacta no prueba originalidad. Cuatro fetches 403/405 documentan límites anti-bot, no
  verificación.
- Full-stack/datos ✅: catálogo, baseline y registry coinciden por objeto y pasaje; el
  contrato cubre 3/19/14, fija siete fuentes directas, una clausura renderizable de 15
  archivos —layouts, imports transitivos y CSS incluidos— y la frontera F0.2b.7; falla
  cerrado ante mutación, cardinalidad extra, fecha imposible, import indirecto del
  expediente o fuga de feature en inglés/español y
  clasifica el runtime como `guided-training`: recibe claves en el cliente, bloquea y
  corrige con el primer clic y deja ver la trampa antes de responder.
- IELTS ✅ certifica la **auditoría, no el banco**: el experto resolvió 19/19 associations
  desde el packet ciego, fijó sus decisiones y después abrió 15 fuentes candidatas.
  Coincidió con 19/19 claves y halló 0 ambigüedades materiales, pero calificó los tres
  pasajes con fitness `mixed`: las descripciones, la estructura ordenada y competidores
  débiles reducen demasiado la demanda Matching Features.
- Walkthrough cognitivo ✅ para contenido: simulación limpia 3/3 y 19/19 que modela error
  probable, objetivo de asociación, búsqueda de evidencia, comparación de features,
  descarte del competidor, regla de decisión y reparación. No asigna letras, claves ni
  bandas y no sustituye estudiantes reales.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio certificado**: A/B/C/D/E =
  5/3/5/4/2; la posición módulo número de features acierta 11/19; el solapamiento exacto
  label+description acierta 1/4 casos elegibles con 15 empates; la description más larga
  por palabras acierta 2/7 con 12 empates. La revisión semántica independiente estima que
  las descripciones bastan para 16/19 y que, sumando la trampa pre-respuesta, 18/19 quedan
  identificadas o casi determinadas. Con n=19 no hay certificación estadística, de
  contenido, modo Exam ni seguridad de claves.
- Fuentes oficiales: IELTS confirma letras A/B/C, relación statement→feature, opciones
  potencialmente no usadas y reutilización solo cuando la instrucción lo permite. El
  segundo pase clasificó 15 claims: 0 respaldados, 8 simplificados en exceso, 3 no
  respaldados y 4 no trazables; disponibilidad y semejanza temática no convierten los
  escenarios nombrados en hechos verificados.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only. Los siete hashes directos y
  los 15 hashes de layouts/ruta/imports/CSS siguen iguales al baseline; ningún archivo de
  `src` fuera del contrato y registry referencia el expediente. Esto
  **no certifica la UI heredada**: 19/19 selects carecen de nombre accesible, la barra y
  feedback no tienen semántica ARIA/live, el foco cae a `BODY` al bloquear, falta `lang`
  en inglés, no hay persistencia y reset no confirma. La evidencia Chromium previa solo
  describe el baseline; el Chromium del reporte será evidencia de packaging, no de la
  ruta del alumno. Copy generado en runtime o remoto queda fuera de la clausura estática.
- Regresión integrada: `87/87` pruebas acumuladas de derechos Reading, TypeScript y ESLint
  pasan; `check:practica-catalog` conserva 465 temas protegidos y `npm run build` termina
  correctamente con 1.264 páginas estáticas. `check:exam-practice-content` conserva 11
  expectativas antiguas fallidas de Task 2 Writing y cero hallazgos de Reading; no se
  silenciaron ni se corrigieron como parte de esta unidad.
- Reporte portable: validation/package/Chromium pasan en 1440/390, con cuatro métricas,
  dos gráficos, dos tablas, diálogo de fuentes y hashes enlazados al `validation.json`
  vigente. Esa verificación cubre el expediente de auditoría, no la ruta learner-facing.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-matching-features-2026-08-09/report.md`](../output/audits/ielts-reading-rights-matching-features-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.7 Matching Sentence Endings`.

### Evidencia — 2026-08-09 — F0.2b.7 Matching Sentence Endings: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 18 inicios y 24 finales del banco formativo
  Matching Sentence Endings. El padre F0.2b continúa 🟡; F0.2b.8 conserva sus rutas,
  motor, banco y tres objetos pinneados, sin iniciarse.
- Derechos/procedencia ✅ significa **expediente y cuarentena, no clearance**: 3/3
  activos siguen `unknown-quarantined`; la búsqueda fue dirigida y no exhaustiva. Las
  16 URLs del ledger estaban disponibles, pero disponibilidad no prueba autoría,
  licencia, autorización, hechos ni revisión humana.
- Full-stack/datos ✅: catálogo, baseline y registry policy v7 coinciden por hashes de
  objeto/pasaje; el contrato cubre 3/18/24, siete fuentes learner-facing y una clausura
  renderizable de 15 archivos. Falla cerrado ante drift de contenido, fechas imposibles,
  IDs extra, import indirecto del expediente o fuga de ending en keys/values EN/ES.
- IELTS ✅ certifica **la adjudicación, no el banco**: el primer pase ciego fijó 18/18
  decisiones y citas antes de abrir fuentes; coincidió con 18/18 claves, con cero
  ambigüedades materiales y dos menores. Los tres pasajes tienen fitness `mixed`. Los
  offsets de evidencia detectaron dos incumplimientos de orden oficial:
  `mse-food-waste-06` y `mse-libraries-06` vuelven a evidencia anterior.
- El segundo pase directo clasificó 15 claims: 2 respaldados, 7 simplificados en exceso,
  2 no respaldados y 4 no trazables. Dos destinos no devolvieron contenido revisable y
  se trataron como limitación, nunca como evidencia. Faltan sign-off factual y humano.
- Walkthrough cognitivo ✅: simulación prospectiva 3/3 y 18/18 que modela error probable,
  relación lógica, filtros de gramática/conector, búsqueda de evidencia, comparación,
  descarte y reparación sin asignar letras. No sustituye estudiantes reales ni prueba
  retención, usabilidad o mejora de banda.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio**: A–H =
  3/2/2/2/3/1/2/3; 3/3 secuencias almacenadas son estrictamente ascendentes y el modal
  de la misma posición entre sets anticipa 15/18. El pase connective-only produce una
  predicción única correcta, grammar-only ninguna, y generic-coherence cuatro únicas,
  todas correctas. Con n=18, 18/18 trampas pre-respuesta y claves entregadas al cliente,
  no existe certificación estadística, de contenido, seguridad, Practice ni Exam.
- La regla de reutilización permanece **no declarada**: cada set usa seis finales
  distintos y deja dos sin usar, pero ni la instrucción local ni la fuente oficial
  consultada autorizan inventar una prohibición o permiso adicional.
- El runtime se clasifica `guided-training`: bloquea al primer cambio, revela corrección
  y explicación inmediatamente, permite consultar la trampa antes de responder, no
  persiste estado y reinicia sin confirmación.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only, no conformidad. Los siete
  hashes directos y los 15 de layouts/imports/CSS permanecen iguales. Siguen heredados
  18 selects sin nombre accesible, progreso/feedback sin semántica ARIA/live, riesgo de
  pérdida de foco, inglés sin `lang`, falta de persistencia y reset sin confirmación.
  El Chromium del reporte es evidencia de packaging, no una auditoría de la ruta.
- Regresión integrada: `95/95` pruebas acumuladas de contratos y rights Reading,
  TypeScript y ESLint pasan; `check:practica-catalog` conserva 465 temas protegidos y el
  build completa 1.264 páginas estáticas. `check:exam-practice-content` conserva 15
  expectativas heredadas fallidas de Task 2 Writing y cero hallazgos de Reading; no se
  silenciaron ni se corrigieron desde esta unidad.
- Reporte portable: validation/package/Chromium pasan en 1440/390, con cuatro métricas,
  tres gráficos, dos tablas, diálogo de fuentes y hashes ligados al `validation.json`
  vigente. Esa verificación cubre el expediente, no la ruta learner-facing.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-matching-sentence-endings-2026-08-09/report.md`](../output/audits/ielts-reading-rights-matching-sentence-endings-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.8 Sentence Completion`.

### Evidencia — 2026-08-09 — F0.2b.8 Sentence Completion: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 18 sentence frames, 18 respuestas canónicas y
  20 entradas aceptadas del banco formativo. El padre F0.2b continúa 🟡; F0.2b.9
  conserva su ruta, contrato, motor, banco y tres objetos pinneados, sin iniciarse.
- Derechos/procedencia ✅ significa **expediente y cuarentena, no clearance**: 3/3
  activos siguen `unknown-quarantined`. El ledger contiene dos fuentes oficiales y 15
  candidatas factuales; 14 devolvieron contenido y tres HTTP 403. Disponibilidad,
  coincidencia temática y ausencia de match exacto no prueban autoría, licencia ni hechos.
- Full-stack/datos ✅: catálogo, baseline y registry policy v8 coinciden por hashes de
  objeto y pasaje; el contrato cubre 3/18/18/20, siete fuentes learner-facing y una
  clausura renderizable de 15 archivos. Falla cerrado ante IDs duplicados, fuentes o
  caveats vacíos, fechas imposibles, evidencia inventada, accepted-answer drift, fuga
  question→answer, cambios en la frontera F0.2b.9 o reason codes inesperados.
- La secuencia declarada queda ligada por hashes: baseline → recuperación → búsqueda →
  manifest → triage → packets ciegos → prompt-only → first pass → packet factual →
  segundo pase. Es trazabilidad local reproducible, no un testigo externo append-only;
  las adiciones tardías al ledger se documentan como transcripción, no prueba forense.
- IELTS ✅ certifica **la adjudicación, no el banco**: sin pasaje, el experto produjo
  0 respuestas exactas únicas; con pasaje fijó 18/18 decisiones con spans literales de
  una o dos palabras y coincidió 18/18 con las claves. Los tres sets respetan el orden
  textual y el límite visible, pero `sentence-makerspaces-01` admite materialmente
  `sewing machines` además de la clave; `sentence-makerspaces-04` tiene riesgo menor.
- La alternativa `3d printers` es duplicado tras la normalización real. `shopping center`
  es una variante ortográfica oficial de `shopping centre` y queda ligada solo a la
  política IELTS que acepta spelling británico y estadounidense; no se generaliza a
  paráfrasis ni respuestas que no aparecen en el texto.
- El segundo pase directo clasificó 15 claims: 3 respaldados, 8 simplificados en exceso,
  0 no respaldados y 4 no trazables. Taylor & Francis, PMC, Bromley y MDPI presentaron
  límites de acceso; se registraron como `untraceable`, nunca como soporte. Faltan
  sign-off factual y humano.
- Walkthrough cognitivo ✅: simulación prospectiva 3/3 y 18/18 desde el packet ciego.
  Modela gramática, límite, búsqueda, span literal, spelling, competidor y reparación sin
  asignar respuestas. No sustituye estudiantes reales, retención, usabilidad ni mejora
  de banda.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio**: 13/18 claves tienen dos
  palabras; el modal de longitud por posición acierta 14/18; 18/18 pistas están
  disponibles antes de responder y 17 nombran localización o ancla. Con n=18, una
  ambigüedad material y claves entregadas al cliente, no existe certificación estadística,
  de contenido, seguridad, Practice ni Exam.
- El runtime se clasifica `guided-training`: el estudiante escribe antes de comprobar,
  pero después del check bloquea el input y revela clave y explicación. El límite de dos
  palabras está hard-coded y produce aviso visual, pero **no participa en scoring**;
  tampoco hay persistencia y el reset no confirma.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only, no conformidad. Los siete
  hashes directos y los 15 de layouts/imports/CSS permanecen iguales. Siguen heredados
  nombres accesibles repetidos entre sets, progreso/feedback sin semántica ARIA/live,
  inglés sin `lang`, breadcrumbs/toggles incompletos, jerarquía rota, foco sin gestión y
  reset destructivo. El Chromium del reporte será packaging QA, no auditoría de la ruta.
- La corrida natural acumulada vigente queda en **116/116 pass**, sin fallos ni `skip`.
  Incluye contrato oficial, deny-by-default y los expedientes F0.2b.1–F0.2b.8; no hay
  fallo de policy v8, contenido, catálogo ni TypeScript.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-sentence-completion-2026-08-09/report.md`](../output/audits/ielts-reading-rights-sentence-completion-2026-08-09/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.9 Summary Completion`.

### Evidencia — 2026-08-11 — F0.2b.9 Summary Completion: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, 18 preguntas, 18 respuestas canónicas y 19
  entradas aceptadas. El padre F0.2b continúa 🟡; F0.2b.10 conserva ruta, contrato,
  motor, banco y objetos pinneados, sin iniciarse.
- Derechos/procedencia ✅ significa **expediente y cuarentena, no clearance**: 3/3
  activos siguen `unknown-quarantined`. El ledger contiene dos fuentes oficiales y 14
  candidatas factuales; 14 devolvieron HTTP 200, una HTTP 403 y una HTTP 404.
  Disponibilidad, búsqueda dirigida sin match exacto y similitud temática no prueban
  autoría, licencia, permiso ni exactitud factual.
- Full-stack/datos ✅: catálogo, baseline y registry policy v8 coinciden por hashes de
  objeto y pasaje; el contrato cubre exactamente 3/18/18/19/19, siete fuentes directas,
  una clausura renderizable de 16 archivos y la frontera F0.2b.10. Falla cerrado ante
  IDs o fuentes duplicados, fechas imposibles, hash drift, evidencia inventada, fuga de
  respuesta y cambios de la siguiente unidad.
- El inventario persiste los 18 spans y offsets whole-token intencionados. `roof` aparece
  dos veces en el primer pasaje; la evidencia correcta de la pregunta 6 es la segunda
  ocurrencia, por lo que un `indexOf` ingenuo fabricaría un retroceso inexistente.
- IELTS ✅ certifica **la auditoría, no el banco**: el prompt-only no produjo una única
  respuesta exacta en 18/18; con el pasaje, el experto preservó 18/18 decisiones. Los
  tres sets quedaron `mixed`, con diez ambigüedades materiales, tres menores y solo
  cinco sin ambigüedad. Las seis tarjetas son oraciones independientes distribuidas por
  todo el pasaje, no un summary continuo genuino.
- La alternativa `the roof` de `summary-urban-farms-06` aparece literalmente y cabe en
  dos palabras, pero completa `check the the roof`; por eso queda registrada como
  gramaticalmente inválida y bloquea certificación hasta una corrección learner-facing
  posterior con sus pruebas correspondientes.
- El segundo pase directo clasificó 15 claims: 2 respaldados, 9 simplificados en exceso,
  4 no respaldados y 0 no trazables. La revisión liga las 14 fuentes factuales y la
  página oficial de samples, pero no equivale a firma humana, clearance ni autorización.
- Walkthrough cognitivo ✅: simulación prospectiva 3/3 y 18/18 desde el packet ciego.
  Modela lectura global, localización, gramática, límite, evidencia, competidor y
  reparación sin asignar claves. No demuestra usabilidad real, retención, transferencia
  ni mejora de banda.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio**: 13/18 respuestas se
  predicen por el modal de longitud según posición; el párrafo modal por posición acierta
  17/18; 18/18 respuestas son sustantivos o frases nominales y las 18 pistas se muestran
  antes de responder. Con n=18, no existe certificación estadística ni de fairness.
- El runtime se clasifica `guided-training`: serializa 18/18 claves, pistas y explicaciones
  al cliente; bloquea el input al comprobar; no persiste; el reset no confirma; y el
  límite de dos palabras está hard-coded y solo cambia color, sin participar en scoring.
  Por tanto Practice, Exam y seguridad siguen bloqueados.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only, no conformidad. Los siete
  hashes directos y la clausura de 16 archivos permanecen iguales. Siguen heredados los
  nombres accesibles repetidos, falta de `progressbar`/`aria-live`/`lang=en`, foco sin
  gestión, reset destructivo, ausencia de persistencia y falta de split Texto/Preguntas.
- La suite Reading acumulada completa queda en **126/126 pass**, sin fallos ni `skip`;
  sus 110 controles de expedientes `*rights` y el test propio de Summary Completion
  (**10/10 pass**) también quedan verdes. Los artefactos
  portables están ligados por hashes a la validación vigente y su Chromium cubre solo el
  reporte, no la ruta learner-facing.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-summary-completion-2026-08-11/report.md`](../output/audits/ielts-reading-rights-summary-completion-2026-08-11/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.10 Note Completion`.

### Evidencia — 2026-08-11 — F0.2b.10 Note Completion: expediente de tres pasajes

- Alcance mínimo cerrado: tres pasajes, nueve grupos, 18 preguntas, 18 respuestas
  canónicas y 18 entradas aceptadas normalizadas. El padre F0.2b continúa 🟡 y la
  siguiente frontera conserva ruta, contrato, motor, banco y tres objetos pinneados.
- Derechos/procedencia ✅ significa **expediente y cuarentena, no clearance**: 3/3
  activos siguen `unknown-quarantined`. El ledger contiene dos fuentes oficiales y 15
  candidatas factuales; 14 devolvieron HTTP 200, dos HTTP 403 y una falló por DNS. Un
  redirect quedó registrado. Disponibilidad, búsqueda dirigida sin match exacto y
  afinidad temática no prueban autoría, licencia, permiso ni exactitud factual.
- Full-stack/datos ✅: catálogo, baseline y registry policy v8 coinciden por hashes de
  objeto y pasaje; el contrato cubre exactamente 3/9/18/18/18, siete fuentes directas,
  una clausura renderizable de 15 archivos, `maxWords: 2` y la frontera siguiente. Falla
  cerrado ante IDs o fuentes duplicados, fechas imposibles, hash drift, decisiones fuera
  de schema, evidencia inventada, fugas EN/ES anidadas o cambios learner-facing.
- El inventario persiste los 18 spans y offsets whole-token intencionados. `harvest`,
  `building` y `areas` aparecen dos veces; la evidencia de
  `note-night-libraries-05` es la segunda ocurrencia de `areas`, en el párrafo 3. Un
  `indexOf` ingenuo elegiría el párrafo 1 y fabricaría un retroceso inexistente.
- IELTS ✅ certifica **la auditoría, no el banco**: el prompt-only encontró una única
  completación exacta visible en 1/18; con el pasaje, el experto preservó 18/18
  decisiones y confirmó respuestas literales, naturales y dentro del límite. Los tres
  sets quedaron `mixed`, con cuatro ambigüedades menores, ninguna material y orden
  intencionado ascendente.
- Los sets recorren el pasaje completo con el mismo patrón de párrafos
  `1,1,2,2,3,4`, mientras la guía oficial indica que este tipo suele concentrarse en una
  parte. Esa regularidad no crea una miskey, pero reduce demanda y bloquea certificación
  como práctica independiente equilibrada.
- El segundo pase directo clasificó 15 claims: 2 respaldados, 10 simplificados en
  exceso, 0 no respaldados y 3 no trazables. Una fuente Crop Trust no abrió y una URL
  FAO resolvió a contenido ajeno; ambas limitaciones se conservaron como falta de
  evidencia, no como soporte implícito.
- Walkthrough cognitivo ✅: simulación prospectiva 3/3 y 18/18 desde el packet ciego.
  Modela predicción gramatical, límite, búsqueda, span, ortografía, competidor, regla y
  reparación sin asignar claves. No demuestra usabilidad real, retención, transferencia
  ni mejora de banda.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio**: el modal de longitud
  por posición acierta 14/18; el párrafo modal por posición acierta 18/18; 15/18
  respuestas son sustantivos o frases nominales; 17/18 frames contienen un bigrama
  único del pasaje y las 18 pistas se muestran antes de responder. Con n=18 no existe
  certificación estadística ni de fairness.
- El runtime se clasifica `guided-training`: serializa 18/18 claves, pistas y
  explicaciones al cliente; bloquea el input al comprobar; no persiste; el reset no
  confirma; y `maxWords` solo cambia el color del contador, sin impedir Check ni
  participar en scoring. Practice, Exam, Review y seguridad siguen bloqueados.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only, no conformidad. Los siete
  hashes directos y la clausura de 15 archivos permanecen iguales. Siguen heredados los
  IDs internos como nombres accesibles, falta de `progressbar`/`aria-live`/`lang=en`,
  heading order roto, foco sin gestión, reset destructivo, ausencia de persistencia y
  falta de split Texto/Preguntas.
- Guardianes de la unidad: validador Note `--check`, suite adversarial propia, suite
  Reading acumulada, TypeScript, ESLint y catálogo. Los artefactos portables se ligan
  por hash a validation/audit; su Chromium cubre solo el reporte, no la ruta del alumno.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-note-completion-2026-08-11/report.md`](../output/audits/ielts-reading-rights-note-completion-2026-08-11/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.11 Table Completion`.

### Evidencia — 2026-08-11 — F0.2b.11 Table Completion: expediente de tres tablas

- Alcance mínimo cerrado: tres pasajes, nueve filas, 18 celdas, 18 respuestas
  canónicas, 18 entradas aceptadas y 17 valores normalizados; `drains` es la única
  colisión normalizada. El padre F0.2b continúa 🟡.
- Derechos/procedencia ✅ significa **expediente y cuarentena, no clearance**: 3/3
  activos siguen `unknown-quarantined`. El ledger conserva dos fuentes oficiales y 14
  candidatas factuales. La búsqueda dirigida y no exhaustiva no encontró coincidencias
  exactas útiles, pero no prueba autoría, licencia, permiso ni originalidad.
- Full-stack/datos ✅: catálogo, baseline y registry policy v8 coinciden por hashes de
  objeto y pasaje; el contrato cubre exactamente 3/18/18/18/17, siete fuentes directas,
  la clausura renderizable de 15 archivos y la frontera Flow-chart. Los 18 spans y
  offsets whole-token están fijados; seis respuestas aparecen varias veces, dos celdas
  invierten el orden intencionado y un `indexOf` ingenuo introduce cuatro errores.
- IELTS ✅ certifica **la auditoría, no el banco**: el prompt-only no produjo ninguna
  completación exacta única; el experto conservó 18/18 decisiones entre el primer y el
  segundo pase, pero marcó cuatro ambigüedades materiales:
  `table-cooling-01-2`, `table-cooling-03-1`,
  `table-museum-inventory-01-1` y `table-museum-inventory-01-2`. La primera admite
  `prevailing winds`, `the direction` y `direction` como spans literales, naturales y
  dentro del límite. El acuerdo con la clave almacenada no establece one-best answer.
- La revisión directa clasificó 15 claims: 5 respaldados, 8 simplificados en exceso,
  0 no respaldados y 2 no trazables. Penn State y el PDF fotográfico NPS devolvieron
  error interno; Collections Trust mostró un interstitial sin contenido sustantivo.
  Esas limitaciones se conservaron como falta de evidencia, nunca como soporte.
- Walkthrough cognitivo ✅: simulación prospectiva 3/3 y 18/18 desde el packet ciego.
  Modela navegación de tabla, ajuste gramatical, límite, búsqueda whole-token,
  comparación de competidores y reparación sin asignar respuestas ni bandas. No es un
  estudio con alumnos ni prueba usabilidad, retención o transferencia.
- Anti-sesgo ✅ significa **detección y bloqueo, no equilibrio**: el atajo de dos
  palabras acierta 1/18; la longitud modal por posición acierta 17/18; el párrafo modal
  por posición acierta 13/18; 14/18 prompts exponen un bigrama único del pasaje y las
  18 pistas están disponibles antes de responder. Con n=18 no existe certificación
  estadística ni de fairness.
- El runtime se clasifica `guided-training`: serializa claves, pistas y explicaciones al
  cliente; bloquea la respuesta al comprobar; no persiste; el reset borra seis celdas;
  y `maxWords` solo genera una advertencia visual, sin bloquear scoring. Practice, Exam,
  seguridad, banco y content certification siguen **BLOCKED**.
- UI/UX y Playwright `➖`: exclusión local al delta audit-only, no conformidad. Los siete
  archivos directos y la clausura de 15 permanecen pinneados en el baseline revisado.
  El cambio concurrente de analytics en `src/app/layout.tsx` quedó censado fuera de la
  unidad; Table data/engine/bank no cambiaron. Siguen abiertos progreso/live/hints,
  `lang=en`, headers de fila, foco, persistencia y la paridad split Texto/Preguntas.
- El gate propio, TypeScript, ESLint y catálogo deben quedar verdes. La suite Reading
  global conserva seis fallos heredados porque validadores históricos detectan el hash
  nuevo del layout concurrente; no se repinnearon ni se silenciaron dentro de Table.
  El Chromium portable verifica únicamente el reporte, no la ruta del alumno.
- Evidencia completa:
  [`output/audits/ielts-reading-rights-table-completion-2026-08-11/report.md`](../output/audits/ielts-reading-rights-table-completion-2026-08-11/report.md).
- Siguiente subunidad, sin iniciarla: `F0.2b.12 Flow-chart Completion`.

#### Remediación posterior del banco Table Completion — 2026-08-11

- Las cuatro ambigüedades materiales del expediente se corrigieron en una fuente
  versionada separada (`*-v2`): se estrecharon los frames de dirección y vidrio, se
  sustituyó la respuesta verbal ambigua del inventario y se eliminó el competidor
  fotográfico duplicado. Los tres activos históricos y sus hashes se conservan sin
  reescritura.
- La declaración del representante autorizado de WeLearn quedó preservada en
  `docs/ielts-table-completion-publication-attestation-2026-08-11.md`. Autoriza la
  publicación y explotación de los tres activos `v2` como **práctica guiada** y asigna
  a WeLearn la responsabilidad editorial. El registro los clasifica con base
  `licensed`, alcance limitado a esa modalidad y evidencia enlazada a la declaración.
- La autorización levanta el bloqueo de derechos para la práctica guiada, pero no
  convierte el banco en material oficial de IELTS ni autoriza los modos Practice o
  Exam. La autoría nominal, la revisión factual independiente y la aprobación humana
  general siguen pendientes y visibles en las decisiones del expediente.
- La ruta pública aplica un gate server-only y fail-closed: solo entrega los tres sets
  versionados cuando las tres decisiones tienen base `licensed` y las únicas reservas
  son autoría, revisión factual y revisión humana pendientes. Cualquier deriva de
  identidad, derechos o contrato vuelve a mostrar la cuarentena sin enviar el banco.
- El engine activo hace cumplir el límite de dos palabras en el scoring, permite
  corregir una respuesta fallida sin reiniciar toda la tabla, conserva respuestas en
  el navegador, confirma antes de borrar y expone progreso, pistas y feedback con
  semántica accesible. La actividad permanece clasificada como `guided-training`.
- La verificación específica cubre las cuatro correcciones, las tres decisiones de
  cuarentena y el enforcement público. TypeScript, ESLint dirigido y el guardián del
  catálogo quedan verdes. La ruta de cuarentena fue comprobada a 390 px y 320 px sin
  overflow ni payload de respuestas.
- La ruta activa requiere verificación UI/UX y Playwright del flujo guiado; no certifica
  Practice, Exam, seguridad anti-key ni afiliación con IELTS. El dossier F0.2b.11
  anterior permanece como snapshot histórico y no debe presentarse como identidad de
  la ruta remediada actual.

Antes de trabajar una fila, el loop decide para cada columna si aplica y registra el
criterio. Ejemplos legítimos: Playwright `➖` para un inventario sin UI; UI/UX `➖` para
un contrato de datos; derechos `➖` solo si la fila no introduce, transforma ni publica
contenido. “No tuve tiempo” o “el check no existe” nunca justifican `➖`.

Una fila que representa una ruta o habilidad es padre. Antes de implementarla se divide
en subfilas de unidades mínimas; el padre no obtiene `✅` hasta que todas las hijas y su
regresión integrada cierren. Una fila `⛔` por licencia, firma o tráfico real no paraliza
otra fila técnicamente independiente, pero ninguna fila dependiente puede saltarla y el
cierre final sigue bloqueado.

### Por qué el diagnóstico aparece después de los pilotos

El hub puede quedar honesto temprano, pero el diagnóstico adaptativo se construye cuando
la taxonomía, los datos y al menos tres demandas cognitivas ya funcionan. De otro modo,
“recomendar” solo disfraza una clasificación no validada.

El screener inicial de 12–16 ítems cubre cuatro macrofamilias con al menos tres
observaciones independientes por familia: instrucciones/forma, estructura global,
localización/paráfrasis y evidencia/inferencia. Tiempo es una señal transversal. No
diagnostica de forma fiable los 15 códigos. Una recomendación de código fino necesita al
menos tres observaciones concordantes en ítems no vistos; con una sola falla solo puede
decir “posible patrón” y pedir evidencia adicional.

### Orden de implementación frente a recorrido del alumno

El tablero es orden técnico, no syllabus obligatorio. Los tres pilotos se construyen
primero para probar demandas cognitivas distintas. El alumno recorre un mapa adaptativo:
prerrequisitos → habilidad deficitaria → práctica guiada → forma paralela → transferencia.
Puede trabajar scanning o alcance antes de TFNG si la evidencia lo recomienda. Ninguna
posición de una fila se presenta como orden oficial IELTS.

---

## 16. Algoritmo de una iteración autónoma

1. Leer `docs/OPERACION-REPOSITORIO.md`, este documento completo y la última evidencia.
2. Revisar `git status`; identificar y preservar cambios ajenos.
3. Tomar la primera fila abierta que no dependa de un bloqueo externo. Si es padre,
   crear primero sus subfilas mínimas. No avanzar dos unidades porque comparten componente.
4. Declarar el alcance exacto y el criterio de salida de esa fila.
5. Medir el baseline antes de editar.
6. Revisar fuente oficial aplicable y contrato editorial.
7. Implementar la rebanada vertical mínima: contenido, datos, renderer, estado y prueba.
8. Ejecutar auditoría full-stack; corregir y repetir.
9. Entregar el artefacto sin clave a un revisor independiente con contexto limpio;
   ejecutar resolución IELTS a ciegas, registrar su decisión y adjudicar.
10. Ejecutar walkthrough cognitivo/pedagógico; corregir y repetir. No llamarlo prueba de
    usuario real.
11. Ejecutar heurísticos y auditoría multiperspectiva; corregir y repetir.
12. Comparar con el sistema visual de Task 2 y auditar accesibilidad; corregir.
13. Ejecutar Playwright en móvil y escritorio; corregir y repetir.
14. Ejecutar guardianes de repositorio y regresión proporcional al riesgo.
15. Registrar métricas antes/después, comandos, capturas, archivos y limitaciones.
16. Marcar cada celda `✅` solo con evidencia completa.
17. Detenerse al cerrar esa fila. No commit, push, merge, deploy ni publicación sin orden.

Si una auditoría descubre un fallo sistémico, se abre una fila prerequisito inmediatamente
antes de la actual. No se convierte silenciosamente la iteración en una reescritura total.

---

## 17. Guardianes y comandos mínimos

La selección exacta depende de los archivos tocados. Registrar siempre comando, salida y
si el fallo era previo.

```bash
npm run check:practica-catalog
npm run check:exam-practice-content
npx tsc --noEmit
npm run build
```

Objetivo de la fase 0: crear un gate dedicado, por ejemplo:

```bash
npm run check:ielts-reading
```

Ese gate debe cubrir, como mínimo:

- contrato y referencias;
- IDs y versiones;
- 11 tipos oficiales ↔ 14 rutas;
- límites y políticas de respuesta;
- forma de evidencia válida: `supportingSpan`, `relatedZone + absenceTarget` o
  `globalEvidenceScope`, según la demanda; una sola mejor respuesta;
- explicación individual de distractores;
- procedencia, `rightsBasis`, documento cuando aplique y estado;
- ausencia de fugas conocidas;
- distribución y heurísticos adversariales;
- separación Academic/GT;
- ninguna banda en sets parciales.

Pruebas por unidad:

```bash
npx eslint <archivos-tocados>
npx playwright test tests/e2e/ielts-reading-<unidad>.spec.ts
```

Antes de integrar a `main`, obedecer sin excepciones la secuencia vigente en
`docs/OPERACION-REPOSITORIO.md` y `AGENTS.md`. Nunca bajar un umbral para obtener verde.
La adición de un script a `package.json` se hace únicamente en su fila declarada y se
anuncia; instalar dependencias requiere autoridad adicional.

---

## 18. Límites de autonomía y seguridad de repositorio

El loop puede, dentro de la fila activa:

- leer código, documentación y fuentes oficiales;
- editar implementación, datos originales, documentación y pruebas locales;
- ejecutar validadores, build y tests;
- crear evidencia y capturas locales;
- corregir regresiones que él mismo introdujo.

El loop no puede sin autorización explícita:

- commit, push, merge, rebase, deploy o publicación;
- cambiar remotos, ramas canónicas o configuración de producción;
- resolver o incorporar cambios ajenos al alcance;
- instalar paquetes o contratar APIs/servicios;
- ejecutar migraciones destructivas;
- eliminar bancos heredados: primero cuarentena y plan de reemplazo;
- publicar contenido con derechos o clave ambiguos;
- inventar fuentes, métricas, resultados de usuario o firmas humanas;
- marcar una auditoría humana como aprobada mediante simulación de agente.

Cuando se necesite una firma humana, tráfico real, licencia o decisión de producto, la
fila queda `⛔` con la solicitud exacta. No se sustituye esa autoridad con una suposición.

---

## 19. Registro de evidencia por iteración

Copiar este bloque bajo la fila trabajada o en un log enlazado:

```markdown
### Evidencia — <fecha> — <unidad>

- Alcance:
- Estado de rama y cambios ajenos preservados:
- Baseline medido:
- Archivos tocados:
- Fuente oficial/editorial revisada:
- Gate de derechos, `rightsBasis` o N/A justificado:
- Auditoría full-stack:
- Auditoría IELTS independiente a ciegas:
- Walkthrough cognitivo/pedagógico:
- Auditoría anti-sesgo y métricas:
- Auditoría UI/UX y accesibilidad:
- Playwright, viewports y capturas:
- Guardianes ejecutados:
- Resultado antes → después:
- Riesgos o deuda restante:
- Celdas que pueden marcarse ✅:
- Bloqueo o siguiente fila:
```

Una captura no sustituye una aserción, y una aserción no sustituye la revisión del
contenido. La evidencia debe permitir a otra persona reproducir el resultado.

---

## 20. Definiciones de cierre

### 20.1 Cierre de construcción

- todas las filas técnicas aplicables tienen derechos y sus seis auditorías en `✅`, o
  `➖` con justificación válida;
- 100 % de ítems publicados tienen procedencia, `rightsBasis`, fuentes y revisión;
- 100 % fueron resueltos independientemente con evidencia concordante;
- no hay fugas de respuesta ni heurísticos explotables por encima del gate;
- cada distractor tiene feedback específico;
- Learn, Practice, Exam y Review retiran ayudas de forma correcta;
- el mock de 3 pasajes/40 preguntas funciona en móvil, escritorio y teclado;
- ningún mini-set concede una banda;
- para cerrar una unidad, un fallo global previo puede documentarse sin regresión; para
  declarar el ecosistema listo para integrar o publicar, todos los guardianes globales,
  TypeScript, build, lint y E2E deben estar limpios;
- no hay errores propios de consola, hidratación u overflow;
- derechos, factualidad, Academic/GT y accesibilidad están cerrados.

### 20.2 Validación pedagógica

Además del cierre de construcción:

- estudiantes reales comprenden la interfaz y el feedback;
- el resultado primario predefinido alcanza el tamaño mínimo relevante con su intervalo
  de confianza, usando formas equivalentes y contrabalanceadas;
- la mejora se transfiere a tema y texto nuevos;
- existe retención diferida;
- disminuyen códigos de error objetivo, no solo sube el score por memoria;
- no hay señales de que un tema o patrón de opciones explique artificialmente la mejora;
- abandonos y datos faltantes se tratan según el protocolo; toda afirmación causal usa
  una comparación adecuada y no solo pre/post;
- un responsable humano aprueba la afirmación pública exacta que se hará.

El producto puede estar terminado técnicamente antes de estar validado pedagógicamente.
El lenguaje público debe respetar esa diferencia.

---

## 21. Fuentes de control

- [IELTS Academic Reading: formato y tipos de pregunta](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- [IELTS: actualización de entrega por ordenador desde mediados de 2026](https://ielts.org/news-and-insights/updates-to-ielts-test-delivery)
- [IELTS Academic: preguntas y materiales oficiales de muestra](https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)
- [IELTS: conversión de resultados y umbrales medios](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail)
- [IELTS research: proceso de escritura de ítems de Academic Reading](https://ielts.org/researchers/our-research/research-reports/an-empirical-investigation-of-the-process-of-writing-academic-reading-test-items-for-the-international-english-language-testing-system)

Fuentes internas obligatorias:

- `docs/OPERACION-REPOSITORIO.md`
- `AGENTS.md`
- `docs/adr/0001-transversal-reading-engine.md`
- `docs/reading-content-guide.md`
- `docs/reading-analytics-spec.md`
- `docs/reading-pilot-human-review.md`
- `docs/ielts-task2-loop.md`, mientras exista en el árbol de trabajo

Las fuentes oficiales controlan el formato. Los documentos internos controlan la
arquitectura, privacidad, operación y calidad de WeLearn. Si discrepan, no se elige la
versión conveniente: se registra la discrepancia y se corrige la especificación.
