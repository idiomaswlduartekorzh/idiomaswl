# Ideas avanzadas — blueprint editorial y pedagógico

Estado: **propuesta para revisión**  
Versión: `0.3.0`
Ruta del producto: `/practica/ideas-avanzadas`  
Nivel de lengua: **B2–C1**  

## 1. Qué existe y qué faltaba

Ya existe un motor funcional de seis movimientos, un catálogo, progreso local por lección y dos
ciclos completos:

1. **The framing effect**.
2. **Calibration and competence** — Dunning–Kruger sin la curva viral.

El tipo `AdvancedLesson` ya permite definir orientación, escucha, lectura, vocabulario, práctica y
producción. Eso es un **contrato técnico inicial**, no un blueprint editorial completo. Además, el
orden actual —escucha antes de lectura— no representa todavía la coreografía de clase descrita en
este blueprint: conversación guiada, primera grabación, lectura activa, recuperación, práctica
IELTS, escucha dual y síntesis.

Antes de este documento faltaban:

- una taxonomía amplia y un orden de producción;
- reglas distintas para hechos empíricos, hipótesis sociales y marcos éticos;
- cantidades y criterios de calidad por movimiento;
- trazabilidad entre afirmaciones, fuentes y ejercicios;
- un protocolo para temas sensibles;
- una ficha editorial previa a la implementación;
- puertas automáticas que impidan publicar una lección incompleta.

## 2. Tesis pedagógica

Una lección no debe transmitir una opinión para memorizar. Debe hacer visible cómo cambia el juicio
del estudiante cuando incorpora lenguaje, evidencia, límites y contraargumentos.

La circularidad se comprueba así:

```text
conversación e intuición inicial
             ↓
       audio diagnóstico
             ↓
lectura activa con evidencia y objeciones
             ↓
 recuperación: voz, notas y vocabulario
             ↓
 práctica IELTS sin atajos de forma
             ↓
dos escuchas que cambian la perspectiva
             ↓
       síntesis y audio final
             └──────────────→ vuelve a la intuición inicial
```

La voz aparece tres veces con funciones distintas: diagnosticar lo que el estudiante piensa antes
de recibir contenido, recuperar lo comprendido después de leer y construir una respuesta final
con evidencia. El último movimiento no pregunta únicamente si cambió de opinión. Pregunta si ahora
puede justificarla con mayor precisión y declarar qué evidencia podría hacerle cambiar de nuevo.

### Razón pedagógica de la secuencia

| Momento | Función | Qué deja visible |
|---|---|---|
| conversación | activar experiencia y construir una pregunta común | hipótesis y lenguaje disponible en el grupo |
| audio inicial | producir antes de recibir la explicación formal | modelo mental y confianza de partida |
| lectura activa | seleccionar, organizar y relacionar evidencia | predicciones, marcas, paráfrasis y dudas |
| voz y notas | recuperar y autoexplicar sin copiar | comprensión retenida y vacíos reales |
| IELTS | discriminar significado bajo restricciones formales | errores de alcance, evidencia e inferencia |
| escucha dual | coordinar fuentes con funciones diferentes | acuerdos, tensiones y niveles de análisis |
| síntesis final | transferir y comparar con el punto de partida | explicación más precisa y condición de cambio |

La dificultad sube por **transformación** —predecir, explicar, distinguir, integrar y transferir—,
no por hacer el texto innecesariamente oscuro. La discusión inicial tampoco es un calentamiento
prescindible: produce el material intelectual al que la lección volverá al final.

## 3. Tres estatutos editoriales

Cada tema debe declarar uno —y solo uno— de estos estatutos. La interfaz futura debe mostrarlo.

### A. Constructo empírico

Patrón definido y estudiado mediante observación o experimento: efecto de encuadre, heurística del
afecto, anclaje. Se enseñan diseño, resultados, tamaño, replicaciones y límites.

No se permite convertir una tendencia promedio en diagnóstico individual.

### B. Hipótesis social discutida

Proposición que depende de definiciones, población, periodo histórico o método: hipergamia,
movilidad social, preferencias de pareja. Debe presentar definiciones competidoras, datos,
heterogeneidad, mecanismos alternativos y contraejemplos.

No se permite presentar una etiqueta de internet como una ley universal.

### C. Marco normativo o filosófico

Propuesta para evaluar acciones o carácter: firmeza–fuerza–generosidad, lealtad frente a integridad,
igualdad frente a equidad. Debe identificar autoría o tradición, premisas, tensiones internas,
objeciones y casos límite.

No se permite describir una conclusión moral como si fuera un hallazgo experimental.

## 4. Contrato de una lección guiada

El modo principal es **clase guiada de 95–120 minutos**. El profesor decide cuándo avanzar y
cuándo abrir una grabación. El modo autónomo, de **55–70 minutos**, conserva la secuencia pero
reemplaza la conversación oral por pausas y consignas individuales. La lección se puede abandonar
y retomar por `slug`, sin revelar respuestas de etapas futuras.

Los seis movimientos cognitivos originales se conservan —activar, leer, recuperar, comprobar,
escuchar y sintetizar—, pero la experiencia visible se divide en ocho fases.

### Fase 1 — Conversación guiada · 18–22 minutos

La interfaz ofrece al profesor entre cinco y siete preguntas en embudo, no un cuestionario que el
estudiante contesta en silencio:

1. **Experiencia:** una situación reconocible sin nombrar todavía la teoría.
2. **Patrón:** qué factores parecen repetirse.
3. **Mecanismo:** por qué podría ocurrir.
4. **Excepción:** cuándo no ocurriría.
5. **Concepto:** qué distinción o definición hace falta.
6. **Evidencia:** qué dato permitiría decidir entre explicaciones.

Ejemplo de progresión para emparejamiento: `Where do couples usually meet?` → `Which factors
influence coupling between men and women?` → `How could we separate preference from opportunity?`
→ `What evidence would weaken your explanation?`.

La pantalla del profesor muestra una pregunta a la vez, notas de intención y dos posibles
repreguntas. El profesor habla primero, escucha respuestas y avanza cuando el grupo ya tiene una
hipótesis. No se revela aún la etiqueta académica como una respuesta correcta.

### Fase 2 — Primera grabación · 3–5 minutos

- El profesor abre explícitamente la consigna mediante `TeacherPhaseGate`.
- El estudiante graba entre 60 y 90 segundos: postura inicial, dos factores y nivel de confianza.
- Puede escucharse y repetir antes de enviar; el primer intento no se califica por pronunciación.
- La finalidad es **diagnóstica**: volver visible la explicación previa y crear algo que pueda
  compararse con la síntesis final.
- La interfaz indica quién puede oír el audio, durante cuánto tiempo se conserva y si todavía está
  solo en el dispositivo. El profesor no recibe una grabación sin una acción explícita de entrega.

### Fase 3 — Lectura larga activa · 22–30 minutos

El texto original tiene 1.100–1.600 palabras y seis a ocho bloques. No aparece como una pared
continua. Cada bloque declara su función: `claim`, `definition`, `evidence`, `example`,
`counterargument`, `scope-limit` o `application`.

El lector incorpora herramientas de código con una función pedagógica concreta:

- **Revelación por bloques:** antes de abrir un bloque, el estudiante predice la respuesta a una
  pregunta breve; después contrasta su predicción.
- **Glosario en contexto:** definición, pronunciación, colocación y ejemplo al pulsar una palabra,
  sin abandonar el párrafo.
- **Marcado semántico:** resaltar una afirmación, su evidencia, una objeción o un límite con cuatro
  categorías fijas; no una paleta decorativa ilimitada.
- **Mapa del argumento:** genera una vista `claim → evidence → objection → qualified conclusion`
  a partir de relaciones editoriales, no de una inferencia automática no revisada.
- **Fuente lateral:** cada afirmación auditable abre la referencia, el estatuto de evidencia y la
  formulación exacta que la fuente permite sostener.
- **Comparador:** pone lado a lado una cifra en dos formatos, dos definiciones o el estudio y su
  crítica cuando esa comparación sea parte del tema.
- **Paráfrasis de una oración:** al cerrar cada sección, el estudiante escribe la idea central; el
  sistema conserva la respuesta, pero no finge evaluar semánticamente un texto libre.
- **Notas ancladas:** comentarios privados por párrafo y un cuaderno general con guardado local.
- **Puntos de pausa docente:** tres momentos sugeridos para preguntar, contrastar y aclarar antes de
  que el grupo continúe.
- **Modo concentración y accesibilidad:** ancho de línea legible, tamaño de fuente, teclado, lectura
  por secciones y progreso; no se premia leer más rápido.

Estructura editorial mínima del contenido: intuición popular, definición operativa, evidencia o
argumento central, explicación alternativa, límites de generalización y protocolo de aplicación.
Debe haber entre tres y seis fuentes; al menos dos primarias en un constructo empírico.

### Fase 4 — “What did you understand?” · 8–12 minutos

Sin volver al texto durante el primer minuto, el estudiante prepara y graba 75–120 segundos:

1. `The central claim is…`
2. `The strongest evidence or argument was…`
3. `One limitation is…`
4. `One question I still have is…`

Junto al grabador aparece un cajón de apuntes con cuatro pestañas: `main idea`, `evidence`,
`language` y `questions`. Después de grabar puede reabrir sus marcas y corregir sus notas. Esta
fase usa recuperación y autoexplicación; todavía no muestra el audio inicial para evitar que el
estudiante se limite a repetirlo.

### Fase 5 — Vocabulario de precisión · 7–10 minutos

- Entre ocho y doce entradas extraídas del texto y reutilizadas en las fases posteriores.
- Cada entrada incluye categoría gramatical, significado contextual, pronunciación, colocación y
  ejemplo original.
- Al menos cuatro términos son transferibles a otros temas.
- Hay dos o tres contrastes léxicos (`confidence` frente a `calibration`; `preference` frente a
  `choice`) y recuperación activa, no solo tarjetas para releer.

### Fase 6 — Desafío IELTS avanzado · 15–20 minutos

Cada lección contiene entre ocho y diez preguntas originales. Mezcla como máximo cuatro familias
para que la dificultad venga de leer con precisión y no de descifrar demasiadas interfaces:

- idea principal o `Matching Headings`;
- inferencia y alcance;
- postura del autor (`Yes / No / Not Given`);
- emparejar afirmación con evidencia o fuente;
- completar resumen con límite de palabras;
- propósito de párrafo o mejor conclusión disponible.

La primera entrega permanece cerrada hasta responder el bloque completo. Después, cada ítem muestra
el tramo exacto de evidencia y explica la confusión concreta de cada distractor. La puntuación se
presenta como dominio de esta práctica, nunca como banda IELTS.

### Fase 7 — Laboratorio de dos escuchas · 15–22 minutos

Son dos audios originales de 2–4 minutos; ninguno narra el texto ni repite al otro. La ficha debe
declarar la relación pedagógica del par:

| Relación | Audio A | Audio B | Operación del estudiante |
|---|---|---|---|
| `contrast` | defiende una interpretación | defiende otra | localizar desacuerdo y supuesto |
| `complement` | explica mecanismo o datos | aporta caso o consecuencia | integrar sin confundir niveles |
| `micro-macro` | experiencia individual | patrón poblacional | evitar generalizar el caso |
| `study-critique` | presenta un estudio | cuestiona método o alcance | calibrar la conclusión |
| `temporal` | decisión inicial | resultado posterior | separar proceso y desenlace |
| `scenario` | situación representada | análisis posterior | inferir antes de recibir teoría |
| `is-ought` | describe lo observado | discute lo deseable | separar hecho y norma |

Flujo: primera escucha global → dos preguntas → segunda escucha global → dos preguntas → matriz de
comparación → nueva escucha focalizada. Las transcripciones aparecen después del primer intento y
se distinguen por voz. La tarea final exige usar información de ambos audios, no identificar dos
ideas aisladas.

### Fase 8 — Síntesis y cierre de la órbita · 10–15 minutos

- Discusión final o respuesta escrita de 140–200 palabras con evidencia de la lectura y los audios.
- Audio final de 90–120 segundos: `I kept/changed my view because…`, una objeción, un límite y
  `I would update this conclusion if…`.
- Solo entonces se ponen en paralelo el audio inicial y el final, junto con confianza inicial y
  final. La interfaz invita a detectar mayor precisión, no premia cambiar de opinión.
- La rúbrica observa diferenciación conceptual, uso de evidencia, tratamiento del contraargumento
  y calibración. No afirma corregir automáticamente una postura libre.

### Ritmo y control docente

En `guided-class`, el profesor puede `presentar`, `abrir`, `pausar` y `cerrar` una fase; cerrar no
borra el trabajo. El estudiante ve la fase actual y una vista previa del recorrido, pero no las
respuestas. La clase puede dividirse en dos sesiones: fases 1–5 y fases 6–8. En `self-study`, los
gates se convierten en pausas explícitas y se mantienen los mismos productos de aprendizaje.

## 5. Arquitectura de evidencia

### Jerarquía de fuentes

1. Artículo original o fuente filosófica primaria.
2. Replicación, revisión sistemática o metaanálisis.
3. Crítica metodológica o interpretación competidora.
4. Fuente pedagógica secundaria para contexto, nunca como único sustento.

### Registro por afirmación

La ficha editorial debe asociar cada afirmación importante con:

- `claimId`;
- texto breve de la afirmación;
- estatuto: `supported`, `contested`, `normative` o `illustrative`;
- fuente;
- sección donde aparece;
- nivel de certeza que debe conservar el lenguaje.

### Lenguaje de calibración

- `shows` solo para un resultado directamente observado en el estudio citado;
- `suggests` para interpretaciones compatibles con la evidencia;
- `may` para mecanismos posibles;
- `is debated` cuando existe disputa relevante;
- evitar `proves`, `always`, `everyone`, `men are` y `women are` salvo que se analicen como
  afirmaciones problemáticas.

## 6. Protocolo de temas sensibles

Se activa para sexo, pareja, género, salud mental, raza, clase, violencia, religión, política y
moralidad aplicada.

La lección debe:

1. definir población, periodo, unidad de análisis y variable;
2. separar promedio grupal de predicción individual;
3. presentar al menos una explicación alternativa seria;
4. evitar ejemplos que humillen a una identidad real;
5. mostrar cuándo la etiqueta deja de ser medible;
6. distinguir descripción de prescripción;
7. pasar revisión de tono y posible daño;
8. incluir una pregunta de falsabilidad: “¿Qué dato debilitaría esta conclusión?”.

## 7. Biblioteca ampliada: 36 temas

Los dos primeros ya están construidos. El resto es inventario editorial; “estar en la lista” no
equivale a estar publicado.

### Colección I — Juicio y decisión

1. **Efecto de encuadre** — disponible.
2. **Dunning–Kruger: calibración, no montaña** — disponible.
3. **Heurística del afecto** — cómo el sentimiento altera riesgo y beneficio percibidos.
4. **Sesgo de confirmación** — buscar, interpretar y recordar a favor de una creencia.
5. **Heurística de disponibilidad** — confundir facilidad de recuerdo con frecuencia.
6. **Anclaje** — cuánto arrastra una cifra inicial incluso cuando es débil.
7. **Coste hundido** — persistir porque ya invertimos, no porque convenga continuar.
8. **Aversión a la pérdida y efecto dotación** — perder, poseer y valorar.

### Colección II — Evidencia e incertidumbre

9. **Tasas base y representatividad** — historias convincentes frente a probabilidades previas.
10. **Riesgo relativo y riesgo absoluto** — cuándo “duplicar” sigue siendo pequeño.
11. **Correlación, causalidad y variables ocultas**.
12. **Regresión hacia la media** — por qué un extremo suele moderarse.
13. **Sesgo de supervivencia** — aprender solo de quienes quedaron visibles.
14. **Sesgo retrospectivo y sesgo de resultado** — juzgar decisiones con información posterior.

### Colección III — Percepción social y grupos

15. **Error fundamental de atribución** — persona, contexto y explicación.
16. **Efecto halo y efecto cuerno** — una impresión que colorea el conjunto.
17. **Prueba social y conformidad** — cuándo seguir a otros informa y cuándo deforma.
18. **Ignorancia pluralista** — muchos dudan mientras cada uno cree estar solo.
19. **Polarización de grupo** — por qué la deliberación puede volver más extrema una postura.
20. **Pensamiento de suma cero** — reparto fijo frente a cooperación y creación de valor.
21. **Identidad de grupo y favoritismo endogrupal**.
22. **Indignación moral, reputación y grandstanding**.

### Colección IV — Pareja, vínculo y estatus

23. **Hipergamia: ¿dato, patrón o relato?**
24. **Emparejamiento selectivo** — educación, ingresos, edad, valores y semejanza.
25. **Preferencias frente a oportunidades reales** — lo deseado, lo disponible y lo elegido.
26. **Homofilia y proximidad** — por qué los vínculos no nacen en un mercado abstracto.
27. **Prestigio, dominancia y estatus** — tres rutas que suelen confundirse.
28. **Reciprocidad, deuda social y asimetría**.
29. **Simping, complacencia y pérdida de límites** — analizar conductas sin usar la etiqueta como
    insulto.
30. **Celos, exclusividad y normas culturales**.

### Colección V — Carácter y ética práctica

31. **Firmeza, fuerza y generosidad** — capacidad propia y ayuda efectiva.
32. **Asertividad, agresión y pasividad** — límites sin dominación.
33. **Compasión con límites** — ayudar sin borrar agencia ni capacidad.
34. **Igualdad, equidad y necesidad** — criterios distintos para distribuir.
35. **Lealtad frente a integridad** — qué hacer cuando pertenecer exige callar.
36. **Perdón, reconciliación y confianza** — tres actos que no son equivalentes.

## 8. Oleadas de producción

### Oleada 0 — motor probado

- Efecto de encuadre.
- Dunning–Kruger.

### Oleada 1 — validar variedad de estatutos

1. Heurística del afecto — constructo empírico.
2. Firmeza, fuerza y generosidad — marco normativo.
3. Hipergamia — hipótesis social sensible.
4. Sesgo de confirmación — constructo empírico.
5. Pensamiento de suma cero — constructo social.
6. Asertividad, agresión y pasividad — transferencia práctica.

La Oleada 1 prueba si el mismo motor puede enseñar honestamente los tres estatutos. No se escala a
los 36 hasta revisar esos seis ciclos.

### Oleada 2 — fundamentos de evidencia

Tasas base, riesgo relativo/absoluto, correlación/causalidad, regresión hacia la media, supervivencia
y sesgo de resultado.

### Oleadas 3 y 4

Percepción social, grupos, pareja, estatus y ética práctica. Los temas sensibles pasan por una ronda
editorial adicional.

## 9. Ficha editorial obligatoria

Antes de escribir código, cada tema debe completar:

```yaml
slug:
titleEs:
titleEn:
collection:
evidenceClass: empirical | contested-social | normative
editorialRisk: low | medium | high
centralQuestion:
popularClaim:
defensibleClaim:
learningObjectives:
  -
misconceptions:
  -
classMode: guided-class | self-study | both
discussion:
  minutes: 20
  funnelQuestions:
    - kind: experience | pattern | mechanism | exception | concept | evidence
      prompt:
      teacherFollowUps:
        -
  recordingPrompt:
  recordingSeconds: 60-90
claimLedger:
  - claimId:
    status: supported | contested | normative | illustrative
    source:
counterposition:
scopeLimits:
openingDilemma:
reading:
  sections:
    - id:
      role: claim | definition | evidence | example | counterargument | scope-limit | application
      pausePrompt:
      claimIds:
  activeTools:
    - inline-glossary | semantic-marking | argument-map | comparator | anchored-notes
postReading:
  audioPrompt:
  noteBuckets: [main-idea, evidence, language, questions]
vocabularyTargets:
ieltsPractice:
  questionFamilies:
  questionCount: 8-10
listeningPair:
  relationship: contrast | complement | micro-macro | study-critique | temporal | scenario | is-ought
  audioAFunction:
  audioBFunction:
  integrationTask:
practiceTargets:
productionPrompt:
finalAudioPrompt:
updateCondition:
sources:
  - type: primary | replication | review | critique | philosophical-source
    citation:
    url:
```

## 10. Contrato de datos v3 propuesto

El contrato actual se conserva mientras se validan los pilotos. La migración no debe forzar la
misma interfaz sobre las dos lecciones ya publicadas: primero se construye un adaptador y luego un
piloto v3. La siguiente versión debe añadir, como mínimo:

```ts
type EvidenceClass = 'empirical' | 'contested-social' | 'normative'
type EditorialRisk = 'low' | 'medium' | 'high'
type LessonMode = 'guided-class' | 'self-study' | 'both'
type ReadingBlockRole =
  | 'claim'
  | 'definition'
  | 'evidence'
  | 'example'
  | 'counterargument'
  | 'scope-limit'
  | 'application'
type ListeningRelationship =
  | 'contrast'
  | 'complement'
  | 'micro-macro'
  | 'study-critique'
  | 'temporal'
  | 'scenario'
  | 'is-ought'

interface AdvancedLessonV3 extends AdvancedLesson {
  evidenceClass: EvidenceClass
  editorialRisk: EditorialRisk
  mode: LessonMode
  centralQuestion: string
  claims: Array<{
    id: string
    status: 'supported' | 'contested' | 'normative' | 'illustrative'
    summary: string
    sourceIds: string[]
  }>
  sources: Array<{
    id: string
    type: 'primary' | 'replication' | 'review' | 'critique' | 'philosophical-source'
    citation: string
    href: string
  }>
  discussion: {
    targetMinutes: number
    questions: Array<{
      id: string
      kind: 'experience' | 'pattern' | 'mechanism' | 'exception' | 'concept' | 'evidence'
      prompt: string
      teacherIntent: string
      followUps: string[]
    }>
  }
  recordings: {
    baseline: RecordingPrompt
    postReading: RecordingPrompt
    final: RecordingPrompt
  }
  reading: {
    title: string
    blocks: Array<{
      id: string
      role: ReadingBlockRole
      heading: string
      body: string
      claimIds: string[]
      glossaryIds: string[]
      pausePrompt?: string
      comparator?: { left: string; right: string; question: string }
    }>
  }
  notes: {
    buckets: Array<'main-idea' | 'evidence' | 'language' | 'questions'>
    allowParagraphAnchors: boolean
  }
  ieltsPractice: {
    questionFamilies: string[]
    questions: AdvancedQuestion[]
  }
  listeningPair: {
    relationship: ListeningRelationship
    audioA: AdvancedAudio
    audioB: AdvancedAudio
    integrationTask: string
  }
  production: AdvancedLesson['production'] & {
    updateConditionPrompt: string
  }
}
```

`RecordingPrompt`, `AdvancedQuestion` y `AdvancedAudio` deben ser tipos discriminados, no bolsas de
campos opcionales. Así, por ejemplo, una pregunta `matching-headings` no puede publicarse sin sus
encabezados sobrantes ni un par `study-critique` sin dos posiciones realmente distintas.

### Componentes de producto previstos

- `TeacherDiscussionPanel`: pregunta, intención docente y repreguntas; sin respuesta modelo visible.
- `TeacherPhaseGate`: controla apertura y pausa sin perder progreso.
- `VoiceRecorder`: grabar, reproducir, repetir y entregar con consentimiento explícito.
- `ActiveReadingRenderer`: bloques, roles, progreso y puntos de pausa.
- `InlineGlossary`, `SemanticMarker`, `ClaimEvidenceMap` y `ReadingNotes`.
- `AdvancedIeltsQuestionEngine`: entrega cerrada, evidencia y feedback por distractor.
- `DualListeningLab`: dos pistas, matriz comparativa y transcripción diferida.
- `BeforeAfterAudioReview`: comparación privada de los tres productos de voz.

### Persistencia y privacidad

El MVP guarda notas, marcas y estado localmente. Un audio puede permanecer como `Blob` local durante
la sesión; subirlo exige autenticación, consentimiento visible y una política de retención. El
estado distingue `recorded`, `kept-on-device` y `submitted-to-teacher`. Nunca se presenta un audio
como entregado si solo existe en el navegador, ni se activa el micrófono al abrir la fase.

## 11. Puertas de calidad

Una lección no se marca `available` si falla cualquiera de estas puertas:

1. **Completitud:** ocho fases, tres consignas de voz, ocho preguntas IELTS y cierre circular.
2. **Fuentes:** URLs válidas y ledger de afirmaciones completo.
3. **Estatuto:** el lenguaje coincide con `evidenceClass`.
4. **Conversación:** cinco preguntas en embudo y repreguntas; no empieza con una definición que
   cierre el debate.
5. **Lectura activa:** roles de bloque, contraargumento, límite, notas, mapa y tres pausas; las
   herramientas no inventan evidencia ni emiten una falsa corrección de texto libre.
6. **Escucha real:** los audios tienen funciones declaradas y diferentes; las preguntas exigen
   escuchar y la integración exige usar ambos.
7. **Distractores:** todos plausibles y formalmente equivalentes.
8. **Antiatájos IELTS:** distribución, longitud, silueta, solapamiento, filtración y rachas pasan el
   guardián descrito abajo.
9. **Lectura editorial:** longitud, contraargumento, alcance y protocolo de aplicación presentes.
10. **Vocabulario:** ocho entradas como mínimo y ejemplos originales.
11. **Producción:** criterios observables, modelo y condición de actualización.
12. **Sensibilidad:** revisión adicional cuando `editorialRisk = high`.
13. **Accesibilidad:** teclado, foco, contraste, etiquetas y móvil sin desbordamiento.
14. **Persistencia y privacidad:** progreso por `slug`, consentimiento y estados de audio inequívocos.
15. **Compilación:** guardián del catálogo, TypeScript y build pasan sin reducir umbrales.

La numeración anterior se implementa como identificadores estables (`completeness`, `sources`,
`evidence-language`, etc.); el orden de presentación no debe ser parte de la API.

### Guardián de sesgo para el bloque IELTS

Las reglas nacen de los guardianes que ya protegen Historias, Listening, SAT e IELTS. Se miden sobre
lo que realmente ve el estudiante después de cualquier reordenamiento:

- **Posición global:** con cuatro opciones, ninguna posición puede concentrar más del 40 % ni quedar
  por debajo del 10 % del banco completo. En un bloque de ocho preguntas se usa idealmente cada
  posición dos veces; en bancos pequeños se audita también el agregado de la colección.
- **Rachas:** nunca aparecen tres claves iguales consecutivas.
- **Extremos de longitud:** la correcta no puede ser la única más larga ni la única más corta en más
  del 30 % del banco. En cada lección, ninguna correcta puede superar por tres o más palabras al
  distractor más largo.
- **Silueta completa:** también se rechaza una única opción con cifra, cita, paréntesis, registro,
  estructura gramatical o nivel de precisión que la delate.
- **Solapamiento léxico por ambas caras:** no debe funcionar ni “elige la que más palabras repite”
  ni “elige la que menos repite”. Los empates se reportan con honestidad.
- **Distractores:** cada uno corresponde a un error identificable —detalle por idea principal,
  causalidad inventada, alcance excesivo, evidencia ausente— y recibe feedback propio.
- **Sin letras en contenido:** ni enunciado ni explicación dicen “option A/C”; las opciones pueden
  cambiar de posición entre intentos mediante el helper compartido.
- **Sin filtración:** pista, ejemplo, glosario, mapa y texto visible antes de entregar no reproducen
  la respuesta. El ejemplo guiado y el bloque independiente usan pools separados.
- **Reglas del tipo:** `Not Given` identifica la relación ausente; `Matching Headings` incluye
  opciones sin usar; los límites de palabras se validan; las respuestas siguen el orden del texto
  cuando IELTS lo exige.

El umbral no reemplaza la revisión editorial: una lección de ocho preguntas puede parecer
balanceada por azar. El guardián evalúa simultáneamente el bloque, la colección y todo el banco.

## 12. Fuentes aportadas por el usuario

### `Bias: Affect Heuristic.pages`

Es un buen documento semilla porque ya contiene definición, caso, efectos individuales y
sistémicos, mecanismo, estrategias y ejemplos. El contenido se reescribe como síntesis original y
sus afirmaciones se conectan directamente con fuentes primarias.

### `Firmness and Generosity.pages`

El fragmento propone que la fuerza se manifiesta como firmeza en la preservación de la propia
capacidad y como generosidad en la ayuda efectiva a otros. También contiene afirmaciones
filosóficas y aplicaciones morales específicas.

Antes de convertirlo en lección se requiere:

- confirmar autor, obra y traducción del fragmento;
- separar la tesis central de sus aplicaciones particulares;
- elegir contraargumentos filosóficos;
- no incorporar automáticamente el pasaje sobre aborto: pertenece al documento fuente, no a la
  solicitud de producto, y exigiría una decisión editorial separada.

## 13. Decisiones que debe revisar el usuario

1. ¿Aprobamos una clase completa de 95–120 minutos que pueda dividirse en dos sesiones, o debemos
   diseñarla desde el inicio para una sola franja de 90 minutos?
2. ¿El control de avance será una sesión docente sincronizada en la plataforma o, en el primer MVP,
   un botón que el profesor indica verbalmente que cada estudiante pulse?
3. ¿Los audios permanecen privados en el dispositivo por defecto y solo se entregan uno a uno, o
   la clase requiere una bandeja docente con retención definida?
4. ¿Mostramos en pantalla las etiquetas `empírico`, `discutido` y `normativo`?
5. ¿La confianza inicial/final se expresa como porcentaje o escala de cinco puntos?
6. ¿Aprobamos 36 temas como horizonte y la Oleada 1 como conjunto piloto?
