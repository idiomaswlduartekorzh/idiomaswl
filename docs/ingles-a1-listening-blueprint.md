# Blueprint — Escucha Inglés A1

## Principio rector

La experiencia no evalúa si el estudiante puede adivinar: enseña a escuchar. Cada
audio debe pasar al estudiante por un ciclo de **anticipar → escuchar sin apoyo →
comprobar significado → escuchar con apoyo → reconocer la forma sonora → usar lo
entendido**. La puntuación y el progreso acompañan este proceso, pero no lo
sustituyen.

La meta A1 es concreta: entender información cotidiana, muy frecuente y dicha de
forma clara (quién, dónde, cuándo, qué hace, qué tiene, qué le gusta y cómo llegar).
No se exige captar todas las palabras en la primera escucha.

## Unidad pedagógica

Cada audio es una unidad independiente de 8–12 minutos. La colección de 20
audios se organiza en cuatro bloques de cinco; al terminar un bloque hay un repaso
acumulativo breve.

| Fase | Acción del estudiante | Propósito pedagógico | Evidencia de avance |
|---|---|---|---|
| 1. Preparar | Explora 5–8 palabras clave | Activar el vocabulario que hará audible el texto | Reconoce significado y audio de palabras clave |
| 2. Escucha global | Escucha sin transcripción | Construir idea general sin traducir cada palabra | Elige tema o situación central |
| 3. Escucha focal | Escucha otra vez y responde | Localizar información explícita | Identifica 3–5 datos importantes |
| 4. Descubrir | Revela transcripción y traducción | Conectar el sonido real con el texto escrito | Marca qué sí entendió y qué no |
| 5. Escucha guiada | Reproduce con texto sincronizado | Percibir palabras, bloques y reducciones dentro del flujo | Sigue el audio sin perderse |
| 6. Consolidar | Resuelve una actividad breve | Recuperar significado sin volver a leer todo | Reconoce una frase, orden o dato |
| 7. Cerrar | Ve resultado y recomendación | Consolidar, no castigar | Sabe qué repasar o qué desbloqueó |

## Arquitectura UX: una pantalla, un objetivo

La página principal muestra los 20 audios como un recorrido de cuatro bloques.
Cada tarjeta comunica solo: número, situación, duración, objetivo, estado y botón
para comenzar. Nunca muestra la transcripción ni las respuestas desde el listado.

Al entrar a un ejercicio, la pantalla mantiene una única tarea visible y un
indicador de siete pasos. Los pasos futuros se ven, pero no distraen. La
transcripción permanece bloqueada hasta que el estudiante haya completado al
menos una escucha global; podrá abrirse después sin penalización.

```text
Colección A1
  └─ Bloque 1: Yo y mi entorno (01–05)
       └─ Ejercicio 03: My Bedroom
            1 Preparar → 2 Idea general → 3 Detalles → 4 Descubrir
            → 5 Escucha guiada → 6 Consolidar → 7 Cierre
```

### Navegación y control

- **Una reproducción inicial obligatoria**, pero sin límite artificial en las
  escuchas posteriores. A1 necesita repetición deliberada.
- Botón principal grande: “Escuchar”. Debe mostrar estado, progreso temporal y
  repetición disponible.
- Botones secundarios: repetir desde el inicio, retroceder 5 segundos y cambiar
  a velocidad de estudio (0.85×). La versión original queda disponible tras la
  primera escucha para no ocultar el ritmo real del idioma.
- Preguntas de una en una. Al responder, no se revela de inmediato todo el
  ejercicio: el estudiante sigue con la siguiente pregunta y recibe revisión
  agrupada al final de la fase.
- El estado se guarda por ejercicio: paso alcanzado, respuestas, mejor resultado,
  repeticiones y vocabulario marcado como difícil.
- En móvil, el reproductor queda fijo en la parte inferior al desplazarse; el
  botón de reproducción nunca debe quedar fuera de vista.

## Blueprint de interfaz por fase

### 1. Preparar el oído

Encabezado con la situación en español y el objetivo: “Escucha una persona
describir su habitación. Busca lugares y objetos.” Debajo, tarjetas de vocabulario
con inglés, español y audio de palabra aislada.

- Máximo ocho tarjetas; se priorizan palabras semánticamente decisivas, no cada
  palabra nueva.
- El estudiante puede voltear tarjeta y escucharla tantas veces como necesite.
- Microejercicio: dos o tres parejas palabra → significado o audio → palabra.
- No se muestran oraciones completas del guion en esta fase.

### 2. Primera escucha: idea general

Se muestra una pregunta antes de reproducir el audio: “¿De qué habla la persona?”
con tres opciones visualmente equivalentes. La respuesta se puede dar después de
la primera escucha; no hay contador de fallos.

- Opciones: una correcta, una del mismo campo semántico y una ajena. Evitar
  distractores tramposos.
- Feedback: explica qué información global confirma la respuesta, sin revelar la
  transcripción completa.
- Si falla, invitar a una segunda escucha con una consigna de atención concreta.

### 3. Segunda escucha: detalles

Tres a cinco preguntas de respuesta objetiva. Ordenarlas según aparecen en el
audio para no convertir la actividad en una prueba de memoria aleatoria.

Tipos adecuados para A1:

- Selección múltiple: nombre, hora, lugar, objeto o actividad.
- Verdadero/falso con corrección simple.
- Elegir imagen o tarjeta de significado.
- Completar **una** palabra muy frecuente, solamente después de dos escuchas.

No usar dictados largos, inferencias abstractas, preguntas de opinión ni opciones
que dependan de vocabulario aún no presentado.

### 4. Descubrir el texto

Tras responder, el estudiante abre la transcripción inglesa. La traducción al
español está oculta por oración y se abre bajo demanda. Junto a cada oración hay
un control para repetir solo ese fragmento.

La interfaz invita a marcar cada oración como:

- “La entendí sin leer”.
- “Entendí parte”.
- “Necesito repasar”.

Estas marcas alimentan el cierre y el repaso; no cuentan como nota.

### 5. Escucha guiada y sincronizada

El texto se divide en fragmentos cortos de 3–8 palabras. Durante el audio, el
fragmento activo se resalta y la palabra actual recibe un énfasis suave. El
desplazamiento debe seguir el audio sin saltos bruscos.

Datos necesarios por ejercicio:

```ts
type TimedWord = {
  word: string
  start: number // segundos desde el comienzo del audio
  end: number
}
```

Los tiempos se generan a partir del audio final, nunca del guion original. Si el
alineamiento por palabra no es suficientemente exacto, se usa sincronización por
frase: la comprensión siempre vale más que una animación imprecisa.

### 6. Consolidar

Una actividad final corta, elegida según el objetivo del audio. Debe comprobar si
el estudiante puede recuperar lo escuchado sin tener la transcripción abierta.

| Tipo | Cuándo usarlo | Ejemplo |
|---|---|---|
| Reconocer una frase | Contracciones o bloques sonoros | “¿Cuál frase escuchaste?” |
| Ordenar 3 eventos | Rutinas y secuencias | despertar → desayunar → tomar el bus |
| Completar una palabra | Dato frecuente y audible | “She wakes up at ___.” |
| Seleccionar significado | Vocabulario clave | `next to` → “al lado de” |
| Reescuchar un fragmento | Un punto difícil concreto | “Escucha 00:12–00:16: ¿dónde está la lámpara?” |

La actividad termina con feedback específico: qué palabra o bloque debía oírse,
dónde aparece y cómo cambia el significado.

### 7. Cierre y repetición espaciada

El cierre muestra una tarjeta de dominio, no solo un porcentaje:

- **Listo para avanzar:** entendió idea general y al menos 70% de detalles.
- **Repasa una vez más:** falló la idea central o dos datos clave; ofrece volver
  directamente al fragmento relevante.
- **Guarda estas palabras:** máximo tres palabras o bloques marcados como
  difíciles, para volver a verlos en el repaso del bloque.

Al completar cinco audios, se desbloquea un repaso de 8–10 minutos con fragmentos
mezclados. Este repaso usa los audios ya estudiados, no material nuevo.

## Progresión curricular

| Bloque | Audios | Comprensión objetivo | Gramática y léxico que se reciclan |
|---|---:|---|---|
| 1. Yo y mi entorno | 01–05 | Identificar personas, objetos, habitaciones y lugares | `to be`, posesivos, `there is/are`, preposiciones |
| 2. Rutinas y tiempo | 06–10 | Entender horas, días, frecuencia y secuencias | presente simple, horarios, adverbios de frecuencia |
| 3. Vida cotidiana | 11–15 | Reconocer necesidades, comida, ropa, clima y mascotas | `have got`, gustos, colores, clima |
| 4. Acciones y planes | 16–20 | Distinguir acciones actuales, habilidades, planes y direcciones | presente continuo, `can`, preposiciones, repaso A1 |

Cada audio introduce como máximo dos elementos realmente nuevos. El resto debe
reciclar vocabulario o estructuras previamente trabajadas; la familiaridad permite
que el estudiante dirija su atención al oído.

## Diseño de ejercicios y feedback

### Regla de carga cognitiva

Antes de la transcripción, una tarea debe pedir **una** de estas tres cosas:
sentido general, dato puntual o forma sonora. Nunca las tres a la vez.

### Feedback pedagógico

- Correcto: identificar la evidencia audible, por ejemplo: “Oíste *at half past
  six*; por eso la respuesta es 6:30.”
- Incorrecto: explicar la confusión plausible, por ejemplo: “*Twenty past seven*
  es 7:20; no significa 7:00.”
- Evitar: “Incorrecto. Intenta de nuevo.” sin ayuda concreta.
- Ofrecer fragmento de audio pertinente, no obligar a reiniciar todo el texto.

### Criterios de calidad de pregunta

Una pregunta solo entra al banco si:

1. Su respuesta aparece literalmente o es una paráfrasis A1 muy evidente.
2. Se puede responder escuchando, no solo leyendo la transcripción.
3. El distractor representa una confusión natural y no una trampa ortográfica.
4. La explicación se relaciona con una palabra, número, bloque o frase audible.

## Accesibilidad y confianza

- Transcripción disponible siempre **después** del primer intento; nunca como
  premio ni como castigo.
- Controles con etiqueta textual, no solo iconos; navegación completa con teclado.
- Contraste alto y el resaltado sincronizado no depende únicamente del color.
- El reproductor no inicia audio automáticamente.
- El usuario puede ocultar la traducción y elegir velocidad, sin alterar su nota.
- No usar cronómetros para las fases de comprensión A1. La velocidad de escucha
  es una habilidad que se construye con seguridad.

## Datos mínimos de cada ejercicio

```ts
type ListeningExercise = {
  id: string
  order: number
  title: string
  objectiveEs: string
  audioSrc: string
  originalRateAvailable: boolean
  durationSeconds: number
  level: 'a1'
  grammarFocus: string[]
  keywords: Array<{ en: string; es: string; audioStart?: number; audioEnd?: number }>
  transcript: Array<{ en: string; es: string; start: number; end: number; words?: TimedWord[] }>
  gistQuestion: ListeningQuestion
  detailQuestions: ListeningQuestion[]
  consolidation: ListeningQuestion
  reviewTargets: string[]
}
```

`audioSrc` para los archivos actuales seguirá el patrón
`/audio/ingles/a1/listening-01.mp3` a `listening-20.mp3`.

## Criterio de salida para publicar

- Audio, guion y transcripción coinciden exactamente.
- Duración A1: preferiblemente 20–35 segundos para la primera versión.
- Cada ejercicio tiene 5–8 palabras previas, una pregunta global, 3–5 de detalle
  y una actividad de consolidación.
- Se verifica la sincronización con auriculares y móvil antes de publicar.
- Al menos una persona principiante completa el recorrido y entiende qué debe
  hacer en cada fase sin explicación externa.
