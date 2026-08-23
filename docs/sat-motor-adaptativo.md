# Motor adaptativo por etapas — cómo funciona, qué decide y dónde duele

Estado a **23 de agosto de 2026**. Escrito para quien llegue sin contexto.

Este documento describe la **maquinaria**, no el contenido. El contenido de los módulos
—los ítems, sus claves, sus distractores— vive en `docs/sat-ingles-blueprint.md` y lo
vigila `scripts/check-sat-exam.mjs`. Aquí solo se habla de lo que decide **qué módulo se
le sirve a quién**.

---

## 0. Lo primero: qué está encendido hoy

| Pieza | Estado |
|---|---|
| Tipos del enrutado (`AdaptiveRouting`) | escritos |
| Función de decisión (`routing.ts`) | escrita y probada en los 28 resultados posibles |
| Constructor (`build-sat-mock.ts`) | escrito; rechaza media adaptación, ramas vacías, variantes cambiadas, repartos no comparables y dificultad invertida |
| Interfaz (`PracticeClient.tsx`) | escrita: corte irreversible, cronómetro y navegación por módulo, resultados con la rama |
| Guardián (`check-sat-adaptive.mjs`) | escrito, en `prebuild`; prueba decisión, navegación y configuración |
| Módulo 1 (`sat-set-1-m1`) | escrito y **auditado** (acta firmada) |
| Módulo 2 estándar (`sat-set-1-m2-facil`) | escrito, auditado y registrado |
| Módulo 2 exigente (`sat-set-1-m2-dificil`) | escrito, auditado y registrado |
| Simulacro de esta rama (`sat:set-1`) | **adaptativo, 54 ítems servidos de 81 escritos** |

Consecuencia que hay que tener delante todo el rato: **el camino adaptativo está encendido
en esta rama, pero todavía no en producción**. `sat-set-1.ts` registra las dos ramas y el
constructor prueba que la dificultad declarada cumpla estándar < M1 < exigente. Producción
seguirá sirviendo el módulo lineal hasta que este trabajo llegue a `main` y Vercel publique
ese commit.

---

## 1. El mecanismo, en cinco piezas

```
src/data/mocks/types.ts          → interface AdaptiveRouting  (el contrato)
src/data/mocks/sat/routing.ts    → elegirRamaModulo2 / partesServidas / partesNavegables
src/data/mocks/sat/build-sat-mock.ts → dónde se fija el corte y se arma el MockExam
src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx → quién lo ejecuta
scripts/check-sat-adaptive.mjs   → el guardián, en prebuild
```

**El contrato** (`AdaptiveRouting`) son cinco números:

- `routeAfterPart` — la parte que hace todo el mundo y que decide (SAT: 1).
- `correctToRouteHigh` — aciertos en esa parte a partir de los cuales se sirve la rama
  exigente (SAT: 16).
- `lowPart` / `highPart` — las partes que son cada rama (SAT: 2 y 3).
- `minutesPerModule` — el cronómetro se reinicia en cada módulo (SAT: 32).

**La decisión** son dos funciones de tres líneas, sin estado y sin React:

```ts
elegirRamaModulo2(aciertos, routing) → aciertos >= routing.correctToRouteHigh ? 'high' : 'low'
partesServidas(rama, routing)        → [routeAfterPart, rama === 'high' ? highPart : lowPart]
partesNavegables(rama, routing)      → antes: [M1] · después: [solo la rama elegida]
```

Están fuera del componente **a propósito**: dentro de React solo se comprueban abriendo un
navegador, y en esta máquina (8 GB) no se abre. Fuera, un script las ejerce con los 28
resultados posibles en medio segundo. Si algún día alguien las mueve dentro del
componente «para simplificar», habrá simplificado quitando la única forma de comprobarlas.

**El constructor** compone un `MockExam` con **tres secciones escritas** —M1, M2 estándar,
M2 exigente— y le cuelga el `adaptive`. Tres escritas, dos servidas.

**La interfaz** mantiene dos vistas distintas. `servedMock` contiene M1 y la rama elegida
para puntuar, guardar y revisar. `stageMock` contiene únicamente el módulo todavía editable
para preguntas, pestañas y navegación. Esa separación es la que permite conservar el
resultado de M1 sin volver a abrirlo después del corte.

---

## 2. El recorrido, paso a paso

1. **Intro.** Presenta dos módulos y 54 preguntas sin enumerar las dos ramas internas.
2. **Módulo 1.** 27 preguntas, 32 minutos, navegación libre dentro del módulo. El botón
   dice «Entregar módulo 1» en lugar de «Finalizar examen».
3. **Entrega.** `finishStage()` es el único sitio que decide qué significa «he terminado»:
   si queda módulo por servir, enruta; si no, entrega. Lo llaman el botón del panel, el
   botón de la última pregunta y el cronómetro al expirar. Que sea uno solo es lo que
   impide que los tres se desincronicen.
4. **Enrutado.** Se puntúa **solo** la parte `routeAfterPart`, se elige la rama y desde
   ese estado se derivan las partes servidas `[M1, rama]` y navegables `[rama]`.
5. **Corte entre módulos** (`phase: 'module-break'`). Pantalla que dice tres cosas: que ya
   no se puede volver, que el examen se adapta, y que **no se le dirá cuál le tocó ni
   cuántas acertó**. El cronómetro no corre aquí: el componente `Timer` está desmontado.
6. **Módulo 2.** `currentIdx` vuelve a cero sobre las preguntas de la nueva etapa. El `Timer`
   se remonta —lleva `key={servedParts.length}`— con 32 minutos nuevos.
7. **Resultados.** Aciertos brutos sobre el total servido, desglose por dominio con enlace
   a la guía de cada uno, y **ahí sí** se le dice qué rama hizo.

---

## 3. Las decisiones, y por qué

### 3.1 Tres partes escritas, dos servidas

Podía haberse hecho con dos exámenes distintos y un salto de ruta. No se hizo porque el
motor de simulacros sirve un `MockExam` por ruta y meter una segunda ruta obligaba a
tocarlo. La forma elegida —tres secciones en el mismo objeto, filtradas en el cliente— no
toca el motor y deja un examen lineal funcionando exactamente igual que antes cuando
`adaptive` está ausente.

**El precio de esa decisión**: el objeto que llega al navegador lleva **las dos ramas**,
con sus claves. Quien abra las herramientas de desarrollo ve el módulo que no le tocó y
sus respuestas. No es un fallo de esta implementación —el motor entero funciona así, con
las claves en el cliente, desde el primer simulacro de IELTS— pero sí es una diferencia
respecto al examen real y hay que saberla antes de venderlo como equivalente.

### 3.2 O las dos ramas o ninguna

`buildSatMock` lanza si se pasa una sola. Media adaptación no es adaptación: servirle a
todo el mundo el mismo módulo 2 y llamarlo adaptativo es exactamente la promesa incumplida
que este proyecto tiene prohibido hacer. La excepción se lanza en el constructor y no en
el guardián para que falle en el sitio donde se comete el error.

### 3.3 El tiempo son 64 minutos, no 96

`timeMinutes = 32 * (adaptativo ? 2 : 1)`. Contar las secciones daría 96 y sería falso:
el estudiante hace dos módulos, no tres. Es el tipo de error que ningún tipo detecta.

### 3.4 El corte: 16 de 27

**Es convención de WeLearn. College Board no publica el punto de corte real.** Vive en
`build-sat-mock.ts`:

```ts
const CORTE_MODULO_EXIGENTE = 16
```

16 de 27 es el **59,3 %**. El comentario del código lo justifica como «algo por encima de
la mitad». Si lo que se quería era el 60 %, el número correcto sería **17** (60 % de 27 =
16,2). Hoy no hay ningún documento que declare cuál de los dos es el contrato: el
blueprint no menciona el corte, ni con ese nombre ni con ningún otro. **La decisión está
escrita solo en el código y solo puede auditarse leyendo el código.** Eso es un defecto de
esta plantilla, no una característica.

Que sea convención tiene una consecuencia que sí está bien resuelta: la pantalla nunca
presenta el corte como oficial, y el aviso de marca (`SAT_MARCA`) aparece en la intro y en
los resultados.

### 3.5 No hay escala 200–800, y no debe haberla todavía

La escala oficial sale de una tabla de conversión que **cambia en cada examen** y que
College Board no publica. Inventarla sería inventarle un número al estudiante. Se muestra
el bruto y se dice explícitamente que no es un puntaje de 200 a 800.

Esta decisión es correcta y hay que defenderla. Pero está **incompleta**, y el hueco es el
punto 3.6.

### 3.6 El bruto de dos ramas distintas no es comparable, y eso hoy no se dice

Dos estudiantes con 40/54: uno hizo el módulo 2 estándar, el otro el exigente. El segundo
sabe bastante más inglés. La pantalla les enseña **el mismo número, con el mismo rótulo,
con la misma barra**. La única diferencia es una frase en prosa debajo que nombra la rama.

Y en el registro no queda ni eso: `saveExamResult` guarda `totalScore = aciertos`,
`totalMax = total`, y **la rama no se guarda en ningún campo**. En el historial del panel
del estudiante, dos intentos suyos en ramas distintas se pintan como comparables entre sí.
Lo mismo en el lead (`examScore: '40/54 correctas'`).

Lo honesto mientras no haya tabla de conversión no es callar la rama: es decir que **el
bruto solo se compara con el bruto de la misma rama**. Sin eso, haber quitado la escala
falsa arregla la mitad del problema y deja la otra mitad en pie con mejor cara.

### 3.7 En el corte no se dice la rama; al final sí

Argumentado en el propio código: el examen real tampoco lo dice, y saberlo cambiaría cómo
se afronta el segundo módulo —quien sabe que va al fácil se relaja, quien sabe que va al
difícil se bloquea—. Al final sí, porque sin eso el número no se puede interpretar.

**La decisión es correcta y la implementación la contradice.** Ver defecto D-2.

---

## 4. Estados límite

Comprobado leyendo el código y ejercitando las funciones. «Correcto» significa que hace lo
que dice el contrato, no que sea bonito.

| Estado | Qué pasa | Veredicto |
|---|---|---|
| Exactamente 16 aciertos (el empate) | `>=` → rama **exigente**. El corte es inclusivo | Correcto y documentado |
| 15 aciertos | rama estándar | Correcto |
| 0 aciertos | rama estándar | Correcto |
| 27 aciertos | rama exigente | Correcto |
| No responde **nada** y entrega | 0 aciertos → estándar. Antes sale un `confirm()` avisando de las 27 sin responder | Correcto |
| Se acaba el tiempo del módulo 1 | `Timer.onExpire = finishStage` → enruta, no entrega el examen | Correcto |
| Se acaba el tiempo del módulo 2 | `finishStage` → entrega | Correcto |
| Cierra la pestaña a mitad | Se pierde todo: no hay persistencia de `answers` ni de `servedParts` | Conocido; igual que el resto de simulacros |
| Pulsa «Volver a intentar» tras un examen adaptativo | **Roto.** Ver D-1 |
| El `MockExam` declara `highPart: 4` y no hay parte 4 | **Pantalla en blanco.** Ver D-4 |
| Las dos ramas tienen distinto número de ítems | Nadie lo impide. El denominador del bruto cambia según la rama | Ver D-6 |
| Los ítems de M1 y M2 comparten `id` | **Roto, y silencioso.** Ver D-3 — es el peor de la lista |

---

## 5. Lo que el guardián sí comprueba

`node scripts/check-sat-adaptive.mjs` (está en `prebuild`, así que un fallo para el build):

1. Que `buildSatMock` **se niegue** con una sola rama del módulo 2.
2. Que sin ramas el examen no declare `adaptive`, traiga 1 sección y 32 minutos.
3. Que con las dos ramas declare `adaptive`, traiga 3 secciones y **64** minutos.
4. Que la decisión, en **los 28 resultados posibles** (0 a 27, no dos casos de ejemplo):
   - devuelva siempre `'low'` o `'high'`;
   - coincida con `aciertos >= correctToRouteHigh` (esto caza `>` por `>=` y las ramas
     invertidas respecto a la fórmula);
   - sirva exactamente **dos** partes;
   - sirva primero la parte de enrutado;
   - **nunca sirva las dos ramas a la vez**.
5. Que la frontera sea **una sola** (monotonía): si cambiara dos veces, alguien que acierta
   más podría acabar en el módulo fácil.
6. Que el corte caiga dentro de 0–27.

Es un guardián serio: probar los 28 casos en vez de dos es exactamente lo que hay que
hacer, y la comprobación de monotonía es una idea buena que no se le ocurre a cualquiera.

---

## 6. Lo que el guardián NO comprueba

Probado, no supuesto: se replicaron sus comprobaciones contra configuraciones patológicas
y estas **pasan en verde**.

| Caso | Qué pasaría de verdad | Por qué se cuela |
|---|---|---|
| `correctToRouteHigh: 1` | Todo el mundo va al módulo exigente. «Adaptativo» de nombre | 1 está dentro de 0–27 y la frontera sigue siendo una |
| `correctToRouteHigh: 27` | Solo el examen perfecto va al exigente | Igual |
| `lowPart` y `highPart` intercambiados | Quien va bien recibe el módulo **estándar** y la pantalla de resultados le dice que hizo el **exigente**. Mentira directa al estudiante | El guardián no sabe qué `variant` tiene la sección de cada parte: `MockSection` no lleva la variante, solo un título en prosa |
| `highPart: 9`, que no existe | `servedMock` se queda con una sola sección, `currentIdx` apunta fuera del array, `QuestionView` recibe `undefined` y revienta en `question.options.map` → **pantalla en blanco** | Nunca comprueba que las partes enrutadas existan como sección y no estén vacías |
| `minutesPerModule: 0` o negativo | Cronómetro sin sentido | Nunca lo mira |
| Ramas de distinta longitud (27 vs 25) | Dos estudiantes con denominadores distintos | Nunca compara `items.length` entre ramas |
| **Ids repetidos entre módulos** | Ver D-3. Es el defecto grave | Solo se prueba con un examen sintético hecho de `m1` tres veces, y nunca mira los `id` |
| El **set publicado** (`sat:set-1`) | El guardián no lo toca. Construye uno de laboratorio con `buildSatMock` y `m1` como las tres partes | Da ✅ «enrutado correcto» sobre un examen que **no es el que se sirve** |

### El agujero del transpilador: sí, este lo tiene también

El guardián carga los `.ts` con `ts.transpileModule` dentro de un `vm`. Comprobado:

```
transpileModule no lanza. Con reportDiagnostics: true → 3 errores de sintaxis.
Sin reportDiagnostics (que es como está) → 0.
```

`transpileModule` **no comprueba tipos y no informa de errores de sintaxis salvo que se le
pidan explícitamente**. Es el mismo agujero por el que el guardián de contenido dio por
bueno un fichero que no compilaba. Aquí muerde menos porque el JS emitido de un fichero
roto suele reventar al ejecutarlo en el `vm` y hay un `try/catch` que sale con código 1;
pero los **errores de tipo** —un campo que no existe en `AdaptiveRouting`, un `number`
donde va un `'low' | 'high'`— se transpilan a JS válido y pasan. Además, `localRequire`
devuelve `{}` para cualquier import relativo que no resuelva: un fichero renombrado no da
error, da un objeto vacío.

**Arreglo, tres líneas**: pasar `reportDiagnostics: true` y fallar si
`diagnostics.length > 0`. No sustituye a `tsc --noEmit`, pero cierra la categoría entera
de «compila mal y el guardián dice que sí».

---

## 7. Cierre de los defectos encontrados el 22 de agosto

Los ocho defectos se conservaron aquí porque explican las regresiones que protege el
guardián. D-1 a D-7 están cerrados en código; D-8 queda mitigado sin migración: la rama
viaja en los campos que ya persisten y pintan ambos paneles.

### D-1 · «Volver a intentar» no reinicia el enrutado — **RESUELTO**

**Cierre (23 ago):** `handleRetry` limpia `routedTo`; las partes se derivan de ese estado
y ya no pueden quedarse con una combinación de la ejecución anterior.

`handleRetry` limpia `answers`, `flagged` y `currentIdx`, y **no toca `servedParts` ni
`routedTo`**. Tras terminar un examen adaptativo, quien pulse reintentar recibe:

- los **dos módulos seguidos como un examen lineal de 54 preguntas**, sin corte y sin
  enrutado (porque `servedParts.length === 2`, así que `finishStage` nunca enruta);
- con **32 minutos para las 54**, porque el cronómetro sigue usando `minutesPerModule`.

Arreglo: `setServedParts(routing ? [routing.routeAfterPart] : [])` y `setRoutedTo(null)`
dentro de `handleRetry`.

### D-2 · Las pestañas de sección delatan la rama — **RESUELTO**

**Cierre (23 ago):** pestañas, panel y botones reciben `stageMock`/`stageQuestions`, que
después del corte contienen solo M2 y lo rotulan como «Módulo 2», nunca «Parte 2/3».

`<SectionTabs sections={mock.sections} .../>` recibe el mock **completo**, no `servedMock`.
Efectos, todos en la misma línea:

- Durante el examen se ven **tres pestañas**: Parte 1, Parte 2, Parte 3.
- La pestaña activa es la del módulo servido. Si es la **Parte 3**, el estudiante deduce en
  dos segundos que le tocó el exigente — justo lo que la pantalla del corte acaba de
  prometerle que no sabría («No te decimos cuál te tocó… Lo verás al terminar»).
- La pestaña **Parte 1 sigue siendo pulsable** y `handleJumpToPart(1)` lo devuelve al
  módulo 1, que sigue en `servedMock`. La pantalla del corte dice «a partir de aquí **no
  puedes volver al módulo 1**». Se puede.
- La rama no servida aparece como «0/0».

Arreglo: pasar `servedMock.sections`, y bloquear el salto a partes ya entregadas.

### D-3 · Los ítems de los dos módulos comparten `id` — **RESUELTO**

**Cierre (22 ago):** el constructor prefija cada id con su parte (`p1-q01`, `p2-q01`, …)
y el guardián comprueba unicidad sobre el set compuesto.

`sat-set-1-m1` y `sat-set-1-m2-facil` numeran los ítems `q01`…`q27` **los dos**.
`build-sat-mock` copia el ítem tal cual y solo le pone el `part`: no hay espacio de
nombres. `PracticeClient` indexa las respuestas por `id`.

Medido construyendo el examen adaptativo de verdad:

```
preguntas servidas: 54 · ids únicos: 27
Responde perfecto el módulo 1, no contesta NADA del módulo 2 → la pantalla dirá 33/54
El panel lateral marcará 54/54 respondidas antes de que lea una sola pregunta del módulo 2
```

Es decir: las respuestas del módulo 1 se copian solas al módulo 2, el módulo 2 aparece
entero contestado antes de empezarlo, y cada respuesta que el estudiante dé en el módulo 2
**reescribe hacia atrás** el resultado del ítem homónimo del módulo 1. La numeración de la
revisión (`allQuestions.findIndex(a => a.id === q.id)`) también se rompe: los ítems del
módulo 2 se numeran P1–P27 otra vez.

Ni un tipo ni un guardián lo ven. `check-sat-exam.mjs` comprueba ids repetidos **dentro**
de un módulo (línea 161); nadie los compara **entre** módulos de un mismo set.

Arreglo (elegir uno, y escribirlo en el blueprint):

- prefijar el `id` en el constructor: `${mod.id}-${q.id}`, o
- exigir ids únicos por set en el guardián y renumerar el M2.

La primera es más robusta —no depende de que nadie se despiste— pero cambia los ids que ya
aparecen en las actas de auditoría; la segunda no toca nada escrito. Decisión pendiente.

### D-4 · Una parte enrutada que no existe deja pantalla en blanco — **RESUELTO**

**Cierre (23 ago):** constructor y guardián rechazan partes vacías o inexistentes; la UI
mantiene además una pantalla de recuperación si recibe una configuración rota.

Si `lowPart`/`highPart` apuntan a una sección inexistente o vacía, `servedMock` se queda
con una sección, `handleStartSecondModule` pone `currentIdx` fuera de rango y
`QuestionView` recibe `question: undefined` sin ninguna guarda. Arreglo: validarlo en el
guardián **y** poner una guarda en el componente.

### D-5 · `handleNextSection` entrega el examen en vez de enrutar — **RESUELTO**

**Cierre (23 ago):** el final de cualquier renderizador llama a `finishStage()`.

`handleNextSection` termina en `handleSubmit()`, no en `finishStage()`. Hoy no es
alcanzable en el SAT porque solo lo usan los renderizadores de sección en rejilla
(`notices-grid`, `cloze-text`…) y el SAT usa el renderizador por defecto. El día que una
sección SAT lleve `sectionStyle`, pulsar «siguiente sección» al final del módulo 1 salta el
enrutado y entrega el examen con 27 preguntas. Arreglo: llamar a `finishStage()`.

### D-6 · Nada obliga a que las dos ramas midan lo mismo — **RESUELTO**

**Cierre (23 ago):** constructor y guardián exigen igual número de ítems, igual reparto
por dominio y variantes `M2-facil`/`M2-dificil` en el lado correcto.

Ni el tipo, ni el constructor, ni el guardián comprueban que M2-fácil y M2-difícil tengan
el mismo número de ítems ni el mismo reparto por dominio. Si divergen, el bruto de dos
estudiantes tiene denominadores distintos y el desglose por dominio deja de ser comparable.

### D-7 · La pantalla de intro cuenta mal el examen adaptativo — **RESUELTO**

**Cierre (23 ago):** la intro presenta dos módulos, la suma de M1 más una rama y 64
minutos, sin listar ni nombrar las dos variantes internas.

Muestra `mock.sections.length` = **3 partes** (cuando se hacen 2), lista las tres con sus
títulos —«(estándar)» y «(exigente)», o sea que la existencia de las dos ramas se revela
antes de empezar— y enseña `27 preguntas` junto a `64 minutos`, dos cifras que no casan.
Además los consejos dicen «Puedes navegar entre preguntas libremente» sin mencionar que
entre módulos no se vuelve.

### D-8 · La rama no se guarda en ningún sitio — **MITIGADO**

No se añadió una columna nueva a Supabase. La rama se incorpora a `total_label`, al título
de la habilidad del M2 y a `examScore` del lead, tres campos ya persistidos y visibles. Así
los paneles dejan de comparar intentos como si fueran equivalentes. Si análisis de datos
necesita agrupar por rama sin parsear texto, tocará una migración separada y reversible.

---

## 8. Aplicarlo a otro examen: lo que ya está parametrizado y lo que no

### Ya está parametrizado (se pasa en `AdaptiveRouting`)

Cuál es la parte que enruta, el corte, qué parte es cada rama, y los minutos por módulo.
Un examen con 40 ítems en el módulo 1, corte en 24, ramas en las partes 2 y 3 y 45 minutos
por módulo funciona hoy sin tocar `routing.ts` ni `PracticeClient`.

### Está cableado al SAT y habría que sacarlo

| Qué | Dónde | Qué hacer |
|---|---|---|
| `MINUTOS_POR_MODULO = 32` y `CORTE_MODULO_EXIGENTE = 16` | constantes de módulo en `build-sat-mock.ts` | Subirlas a argumentos de `buildSatMock` con estos valores por defecto |
| «Dos ramas» como única forma de adaptación | el tipo `RamaModulo2` (solo `low` y `high`) y `partesServidas`, que devuelve 2 partes | Para un examen de tres ramas o dos etapas hay que rehacer las dos funciones. Hoy es un enrutado **de una etapa y dos salidas**, y conviene llamarlo así |
| Nombres en español y del SAT | `elegirRamaModulo2`, `RamaModulo2`, `CORTE_MODULO_EXIGENTE` | Si se generaliza: `elegirRama`, `Rama`, `corte` |
| El corte medido en **aciertos absolutos** | `elegirRamaModulo2` | Un examen con módulos de distinta longitud necesitaría porcentaje. Hoy no cabe |
| Los rótulos del corte y de resultados | texto literal en `PracticeClient` («módulo 1», «Módulo 2», «exigente/estándar») | Sacar a la ficha del examen o a un mapa por `examSlug` |
| Todo lo `isSat` de la pantalla de resultados | `exam.slug === 'sat'` repetido | Sustituir por una capacidad declarada en `EXAMS` (p. ej. `scoreDisplay: 'raw'`) |
| La variante de cada parte | no existe: `MockSection` no lleva `variant` | Añadirla. Sin ella, ningún guardián puede comprobar que `highPart` es de verdad el módulo exigente (ver §6) |
| El espacio de nombres de los `id` | no existe | Ver D-3. Cualquier examen multimódulo lo va a sufrir |

### Lo mínimo que hay que escribir para un examen adaptativo nuevo

1. Los módulos, con la forma que tenga ese examen.
2. Un constructor tipo `buildSatMock` que arme el `MockExam` y le cuelgue `adaptive`.
3. Registrar el set en `MOCK_REGISTRY`.
4. **Nada más en `PracticeClient`**: si el `MockExam` trae `adaptive`, se enruta solo.
5. Copiar el guardián y ampliarlo con los casos de la §6 antes de publicar.

---

## 9. Lo que debería estar en el blueprint y hoy solo está en el código

`docs/sat-ingles-blueprint.md` §2 documenta el examen real con siete fuentes verificadas.
Lo que **no** documenta, y son decisiones de producto nuestras:

1. **El corte, 16 de 27**, que es convención nuestra y no de College Board. Con el porqué,
   y resolviendo si el contrato es «16» o «el 60 %», que hoy no son el mismo número.
2. **Que el corte es inclusivo** (16 va al exigente).
3. **Que se sirven dos módulos y se escriben tres**, y que las dos ramas viajan al
   navegador con sus claves.
4. **Que el bruto de una rama no se compara con el de la otra**, y qué se le dice al
   estudiante al respecto.
5. **Que los ids tienen que ser únicos por set**, no por módulo (D-3).
6. **Que las dos ramas deben tener el mismo número de ítems y el mismo reparto por
   dominio** (D-6).

Además, §3 del blueprint sigue diciendo dos cosas que ya no son verdad: que la
adaptatividad «no la hace el motor actual» —ya está escrita— y que un set se compone «M1 +
**una** variante de M2», cuando el constructor exige las dos o ninguna. Un documento que
contradice al código es peor que no tenerlo: alguien lo va a creer.

---

## 10. Resumen para quien tenga treinta segundos

La decisión y sus límites están aislados y probados en los 28 resultados posibles. El
constructor rechaza configuraciones incomparables; la interfaz separa lo servido de lo
navegable; el guardián comprueba que M1 quede cerrado después del corte. Los tres módulos
tienen acta y huellas. Esta rama ya sirve la sección completa; producción permanece lineal
hasta que el cambio se integre en `main`.
