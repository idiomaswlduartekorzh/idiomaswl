# Fase 9 · Calibrador de NIVEL — escenario 1, `the-bike-in-the-parking-lot`

**Auditado:** `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md`, tal como está en
disco hoy (22 ago 2026), con la tercera pasada y el reparto de género ya aplicados. Los informes de
fase 7 y 8 se leyeron solo para saber qué se dijo antes; nada se dio por bueno ni por malo por venir
de ahí.

**Contrastado contra:** §4 y §11 de `docs/habla-acompanado-blueprint.md`,
`artifacts/habla-a2/caja-de-herramientas-a2.md`, y `src/data/grammar/registry.ts` →
`src/data/grammar/ingles/{a1,a2}` (slug a slug, con el fichero abierto).

---

## Veredicto

**CABE CON CAMBIOS.** El acto declarado es de A2, la ruta mínima se escribe entera con lengua A2 —y
esa es la prueba que decide—, y las 13 referencias de gramática existen todas con el título literal.
Lo que falla no es el nivel del escenario, es el nivel de **ocho líneas de lectura** y **tres
anclajes que faltan**, uno de ellos el de la jugada que sustituye al regateo.

| puerta | resultado |
|---|---|
| Acto de habla en el nivel (§4) | **Cabe.** `rechazar` + `conceder-con-condicion` están en la fila A2. `negociar` es B1 y el motor lo evita por diseño: dos números fijos, cero regateo. Techo tocado, ver §1. |
| 1 · Inglés **hablado** = A2 | **Cabe.** Cero prohibidas en los 18 troncos, en la caja y en el cierre. Barrido mecánico + lectura. |
| 2 · Inglés **leído** = A2 leído | **Cabe con cambios.** 8 líneas por encima de A2 leído, 3 de ellas graves. Todas con versión corta propuesta. |
| 3 · Vocabulario | **Cabe.** 10 + 10 entradas, una por fila, una línea, ninguna definición más difícil que su palabra. Una observación menor. |
| 4 · `grammarReferences` | **Cabe con cambios.** 13/13 slugs existen y 13/13 títulos coinciden literalmente. Faltan 3 temas que los exponentes sí ejercitan y hay 1 ejemplo puesto en el tema equivocado. |
| Bandas de cabecera (§4) | **Cabe.** 6 min (techo 8) · 8 turnos por rol (banda 6-9) · misma unidad en cabecera y en las dos pantallas. No hay ningún 12 ni 17. |
| Techo de prosa (§11) | **Cabe.** Contador canónico: A **442**, B **429**, tope 450. Coincide con lo declarado. |

---

## 1 · El acto de habla existe en el nivel

§4, fila A2: *pedir un favor, dar una razón, disculparse, proponer alternativa, quejarse con
educación, **conceder poniendo una condición simple***. Los dos actos declarados están dentro.
`negociar` es de la fila B1, y el motor lo evita de la única forma que sirve: cada rol tiene **un
número fijo**, no un rango, así que nadie puede subir o bajar buscando el punto medio. Lo que se
mueve es **qué entra en el trato**, y cada movimiento es una condición simple, dicha entera en un
turno: `If you take the old gears, I can do 340,000`.

**El techo, dicho para que quede escrito:** la ruta mínima necesita **tres** intercambios
condicionados seguidos (platos → precio, candado y luces → Nequi, taller → transporte). Cada uno,
por separado, es A2. La cadena de tres es lo más alto que aguanta el nivel. Una cuarta variable
—que hoy no existe— convertiría esto en `negociar` y el escenario pasaría a B1. **No se toca.**

Dos observaciones que no cambian el veredicto:

- **B es quien más rechaza y es el único sin el bloque 7 de la caja** (`Not 4, not 7`). Se sostiene
  porque su tabla trae dos formas propias (`That's more than I can …`, `I hear you, but that's not
  going to …`), pero conviene saber que el rol del acto declarado se apoya en dos filas y no en la
  caja común.
- El bloque 7 («saying no without saying no») **sí es A2**: §4 pone «rechazar de forma indirecta»
  en la columna *lo que todavía no* de **A1**, no de A2.

## 2 · La ruta mínima — se escribe entera en A2

Es la prueba que decide, y sale. Trece turnos, solo lengua del nivel, respetando los dos topes,
las tres restricciones de cada lado y la carta del turno 5.

| # | quién | turno | lo que lo sostiene |
|---|---|---|---|
| 1 | B | Good morning — thanks for waiting. Is this the bike from the ad? | `verb-to-be` a1 · *no citado* |
| 2 | A | Hi — are you here for the bike? Yes, this is it. | `verb-to-be` a1 · *no citado* |
| 3 | B | The rear tire is worn out. A new tire and a new seat — that's about seventy thousand. | `verb-to-be`, `quantifiers` |
| 4 | A | I paid ninety-five thousand last month, and I have the receipt. With the new gears, I can't go under three hundred ninety thousand. | `past-simple-regular`, `can-ability` |
| 5 | B | I have three hundred fifty thousand in cash. That's more than I can pay today. | `present-simple-affirmative` a1 *(no citado)*, `comparatives` |
| 6 | A | If you take the old gears, I can do three hundred forty thousand. | `first-conditional` — el puente del escenario |
| 7 | B | *(lee la carta)* Does the lock come with it? | `present-simple-questions` a1 · **no citado, y es la jugada que sustituye al regateo** |
| 8 | A | Not in the ad — I can include the lock and the lights. | `can-ability` |
| 9 | B | If the lock and the lights come with it, I can send fifteen thousand by Nequi. | `first-conditional` — mueve los 70.000 con condición dicha |
| 10 | A | I'll take it to the shop before one. The shop closes at one. | `will-future` *(sin exponente que lo dé)*, `telling-time` |
| 11 | B | My brother-in-law can't come. Can you keep it for me until six? | `can-ability` |
| 12 | A | You can pick it up at the shop at three. | `can-ability`, `telling-time` |
| 13 | B | That works for me. OK — deal. | cierre |

Seis y siete turnos por rol, dentro de 6-9. Ninguna de las trece necesita una estructura fuera de
A2. **El escenario es de este nivel.**

Lo que la ruta destapa: **tres de los trece turnos se apoyan en temas que la lista no cita**, y uno
de ellos —el 7— es el mecanismo entero del escenario (pedir más dentro del trato en lugar de pedir
menos precio). Va al §5.

## 3 · Lo que hay que LEER — ocho líneas fuera de A2 leído

Ninguna es un problema de diseño: son ocho reescrituras. Cada una con su versión corta.

### Graves

**L1 · ROLE B, restricción 3** (línea 130). Doble negación dentro de una negación, más `works for
you` en sentido idiomático. Un A2 no reconstruye qué le están prohibiendo.
> `Show that no other bike works for you. After that, nothing moves.`
> → **`Say that this is the only bike for you. After that, nothing moves.`**  (+1 palabra)

Arrastra el criterio de logro de B (línea 192), que repite la misma estructura:
> `They never found out that no other bike works for you.`
> → **`They never found out that this is the only bike for you.`**  (+1)

**L2 · ROLE B, `Only you know`, viñetas 2 y 3** (líneas 134-135). El mismo verbo, `count`, hace dos
trabajos idiomáticos distintos en tres líneas seguidas: `count on` = contar con alguien, y `count
money for something` = tenerlo apartado —que además no es inglés natural—.
> `You are counting on your brother-in-law's truck at six. Without it, moving the bike costs money you counted for the tire.`
> → **`Your brother-in-law is bringing his truck at six. Without it, you have to pay to move the bike, and you need that money for the tire.`**  (+4)
>
> `You already counted the Nequi money for the tire, the seat and the lock, and not for the price.`
> → **`You already gave the Nequi money a job: the tire, the seat and the lock. Not the price.`**  (−1)

**L3 · Los dos criterios de logro** (líneas 113 y 191). Estilo indirecto con backshift (`said … was`)
más elipsis de auxiliar (`before you did`) en la misma oración. §4 saca del A2 el «discurso indirecto
extenso»; corto o largo, es la línea más difícil de leer de la ficha, y está en la pieza que el
estudiante lee **con prisa**, al final.
> `They said the rear tire was worn out before you did.` → **`They named the rear tire before you did.`**  (−3)
> `You said the rear tire was worn out before they did.` → **`You named the rear tire before they did.`**  (−3)

(«Name the fault» ya es el lenguaje de la columna `here` de B, línea 186: no introduce nada nuevo.)

### Medias

**L4 · ROLE A, `Only you know`, viñeta 1** (línea 54). Imperativo + `and` con valor condicional, más
`give away` = revelar. Dos cosas idiomáticas en ocho palabras.
> `Say that early and you give the deal away.` → **`If you say that early, you lose the deal.`**  (+1)

**L5 · Los dos criterios de logro** (líneas 113 y 190). `take` = aceptar una condición.
> `…and they took it.` → **`…and they said yes.`**  (0)

**L6 · Pantalla compartida** (línea 222). `match` sin objeto, elíptico; el A2 lo lee como sustantivo.
> `Say all four and match, and it's closed.` → **`Say all four. If you both say the same, it's closed.`**  (+4, va en pantalla compartida, fuera del presupuesto de cada rol)

**L7 · ROLE A, `Your toolkit`** (línea 94). `the why` nominalizado no existe para un A2.
> `Block 6 is for the why they will ask.` → **`Block 6 is for when they ask why.`**  (−1)

**L8 · ROLE A, `If you walk away with nothing`** (línea 59). `lose something to somebody` es B1.
> `You lose another Saturday to a fifth buyer` → **`You lose another Saturday with a fifth buyer`**  (0)

### Efecto sobre el techo

Sumadas a las cinco reescrituras de `fase9-calcable-1` (A +1, B +5): **ROLE A ≈ 440**, **ROLE B
≈ 436**, tope 450. **No hay que quitar ninguna pieza.**

### Al filo, señaladas y no contadas

- `That needs the shop, before one.` (línea 51). `fase9-calcable-1` ya la devuelve a
  `You need the shop for that, before one.`; para lectura conviene además **`before 1:00 p.m.`**,
  que es como está escrito en la tabla de datos (línea 72).
- `here` de `worn out` en ROLE A (línea 89): `the rear tire · they say it before you do`. El
  segmento arranca por pronombre + verbo conjugado, que es la forma que §11 prohíbe en esa columna
  —la misma que se corrigió en `the doorman`—. Es de calcabilidad, no de nivel; se señala para que
  no se pierda: → `the rear tire · their first argument, not yours`.
- `here` de `asking about theirs` en ROLE A (línea 100): 17 palabras y un `it` sin referente claro.
  → `open question · transport is half the deal · their answer can change`.

## 4 · El vocabulario — pasa

20 entradas, 10 por rol (§11 pide 8-10). Una entrada por fila, definición de una línea, ninguna por
encima de 50 caracteres, ninguna traducción. Comprobadas una a una: **las 20 definiciones son más
simples que la palabra que definen**. Las cuatro que más lo demuestran: `receipt` → *the paper the
shop gives you with the price*; `the doorman` → *the person who works at the door of a building*;
`worn out` → *used so much it doesn't work well*; `a scratch` → *a thin line with no paint*.

Una sola observación, y no bloquea: **`to come with`** (ROLE B, línea 163) se define con otro verbo
frasal, `to go with the bike, with no extra money`. Se entiende por el contexto de la fila, pero si
alguna vez sobra sitio: *inside the price, with no extra money*.

`brother-in-law` y `the doorman` están correctamente neutralizadas y el sexo del portero vive en la
columna `here`, que es donde va.

## 5 · Los anclajes — 13/13 existen, faltan 3

Comprobados slug a slug contra `src/data/grammar/ingles/{a1,a2}`, con el fichero abierto. **Los 13
slugs existen en el nivel que declaran y los 13 títulos coinciden literalmente**, carácter a
carácter. Los dos con sufijo (`connectors-a2`, `prepositions-movement-a2`) existen **así**: los
mismos sin sufijo no están en el índice y `getTopicBySlug` devuelve `null`. El campo `level` está en
las 13 y las cuatro de A1 lo necesitan, porque la ruta A2 tiene el nivel clavado.

### Faltan tres temas que los exponentes sí ejercitan

| tema | quién lo ejercita | por qué no puede faltar |
|---|---|---|
| **`present-simple-questions`** (a1) | B, `asking for more`: `Does the lock come …?` | Es **el mecanismo del escenario**: pedir más dentro del trato en lugar de pedir menos precio. Es lo que sustituye al regateo, y hoy no lo sostiene ningún tema. `past-simple-questions` está citado, pero es pasado |
| **`verb-to-be`** (a1) | Cuatro troncos: `Hi — are you here for …?` (apertura de A), `Is that still …?`, `The rear tire is …` (primera jugada de B), `That's not important right now.` | Cuatro de dieciocho formas, incluidas las dos aperturas |
| **`present-simple-affirmative`** (a1) | `The shop closes at …`, `I have … in cash, right …`, `The Nequi money is for …` | El reloj y el número de B, que son los dos datos del cierre |

### Un ejemplo puesto en el tema equivocado

El `rationale` de **`past-simple-regular`** (línea 255) usa como prueba **`I bought it sixteen
months ago`**. `bought` es irregular. El tema que lo cubre es **`past-simple-irregular`** (a2, existe
en el registro, no está citado), y la ruta mínima lo necesita de verdad: `I paid` es regular, pero
`I bought it sixteen months ago` y `Three buyers came before` no lo son. O se cambia el ejemplo por
uno regular (`I posted it three weeks ago`), o entra el tema. **Recomendado: entra el tema** y el
ejemplo se reparte.

### Un anclaje citado que ningún exponente entrega

**`will-future`** está citado con razón —el cierre exige comprometerse con quién mueve la bicicleta y
a qué hora— pero **ninguna de las 18 filas de exponentes contiene un `I'll …`**, y la pantalla de
cierre tampoco. El compromiso es el último paso de la ruta mínima y es el único para el que el
estudiante no tiene forma en pantalla. Como las dos tablas están en 9 filas (tope de §11), no cabe
añadir: **se cambia el contenido de una fila**, la del reloj de ROLE A (línea 105):
> `The shop closes at …` → **`The shop closes at … · I'll take it there before …`**

Nada de esto pide subir el nivel: `will-future` es A2 y los tres que faltan son A1.

### `grammarReferences` — lista lista para pegar

Sale a 17 entradas (3 que faltaban + 1 por el ejemplo mal anclado). Las 13 actuales no cambian ni un carácter salvo el `rationale` de
`past-simple-regular`, que deja de usar un verbo irregular como prueba.

```ts
grammarReferences: [
  { slug: 'first-conditional', level: 'a2', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion vive aquí, y es lo más alto del escenario: "If you take the old gear set, I can do 340,000". El tema autoriza can y have to dentro de la cláusula if.' },
  { slug: 'comparatives', level: 'a2', title: 'Comparativos en Inglés A2',
    rationale: 'El precio se rechaza comparando, no regateando. Ojo: "that\'s more than I can pay today" es comparativa de cláusula y en la ficha va como tronco; lo que el tema cubre y aquí se usa es la comparación de sintagmas: "the bus is more expensive than the app", "the small gears are more difficult".' },
  { slug: 'quantifiers', level: 'a2', title: 'Cuantificadores en Inglés A2',
    rationale: 'Los dos topes y lo que entra o sale del trato se dicen con cuantificadores: "I only have 350,000 in cash", "a bit more", "everything today".' },
  { slug: 'have-to-must', level: 'a2', title: 'Have to y Must en Inglés A2',
    rationale: 'La razón por la que la bicicleta no se queda aquí es una obligación, no un capricho: "it has to leave today", "I have to carry it up four floors".' },
  { slug: 'will-future', level: 'a2', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El reparto de la tarde se compromete en will: "I\'ll take it to the shop before one", "I\'ll pick it up at three". Exige que la fila del reloj de ROLE A entregue el tronco "I\'ll take it there before …".' },
  { slug: 'past-simple-regular', level: 'a2', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La historia de la bicicleta se cuenta con past simple y ago: "I paid 95,000 last month", "I posted it three weeks ago". Con ago, nunca con since: since de duración es B1.' },
  { slug: 'past-simple-irregular', level: 'a2', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'La mitad de esa historia es irregular y sin el tema no está anclada: "I bought it sixteen months ago", "three buyers came before", "I saw four bikes".' },
  { slug: 'past-simple-questions', level: 'a2', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La pregunta abierta de B, que es la que hace salir lo que no está en el anuncio: "What did you change on it?". En directa, nunca incrustada.' },
  { slug: 'present-simple-questions', level: 'a1', title: 'Present simple interrogativo en inglés A1',
    rationale: 'La jugada que sustituye al regateo es una pregunta con does: "Does the lock come with it?". Pedir más dentro del trato, en vez de pedir menos precio, es el mecanismo del escenario y sin este tema no lo sostiene nada.' },
  { slug: 'present-simple-affirmative', level: 'a1', title: 'Present simple afirmativo en inglés A1',
    rationale: 'Los dos datos del cierre se dan en presente simple: "the shop closes at one", "I have 350,000 in cash".' },
  { slug: 'verb-to-be', level: 'a1', title: 'Verb to be en inglés A1',
    rationale: 'Las dos aperturas y la primera jugada de B son to be: "Are you here for the bike?", "The rear tire is worn out", "That\'s not important right now".' },
  { slug: 'connectors-a2', level: 'a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'El dato que decide el trato se dice con but y hay que decirlo en voz alta: "they work, but the two small gears are hard to use".' },
  { slug: 'prepositions-movement-a2', level: 'a2', title: 'Preposiciones de movimiento en Inglés A2: into, out of, past, through, along',
    rationale: 'El transporte es la segunda variable del trato y fue donde las parejas flojas se pasaron al español: "take it to the shop", "ride it to Floridablanca", "it goes into the truck".' },
  { slug: 'can-ability', level: 'a1', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene todas las peticiones de los dos lados ("Can I…?", "Maybe we can…", "Can you keep it for me until…?") y sustituye a los Could I…? que el registro no ancla.' },
  { slug: 'telling-time', level: 'a1', title: 'Decir la hora en inglés A1',
    rationale: 'El cierre exige a qué hora se mueve la bicicleta, y el taller cierra a la una: sin la hora no hay cierre.' },
  { slug: 'going-to', level: 'a1', title: 'Going to en inglés A1',
    rationale: 'La pregunta abierta obligatoria de A es un going to: "How are you going to take it home?". Sin el tema, la pregunta que abre el transporte no está anclada en ningún sitio.' },
  { slug: 'present-continuous', level: 'a1', title: 'Present Continuous en Inglés A1',
    rationale: 'La pregunta abierta obligatoria de B es un presente continuo: "Why are you selling it?". Es la que hace salir lo que no está en el anuncio.' },
]
```

**No entra `present-perfect-basic`.** El present perfect normal **sí es A2** —el registro tiene tres
temas y borrarlos de un plumazo ya hizo daño una vez—, pero aquí solo aparece en prosa leída
(`nobody has asked`) y ningún turno de la ruta mínima lo necesita. Si la reescritura de
`fase9-calcable-1` lo deja en la ficha y alguien quiere anclarlo, el tema existe y el título es
`Present Perfect Básico en Inglés A2`; hoy sería adorno.

## 6 · Los datos duros son decibles

Todos los precios son miles redondos —390.000, 350.000, 340.000, 95.000, 45.000, 35.000— y se dicen
sin más aritmética que centenas y miles. El cierre solo exige **precio, hora, día y nombre**: hora
de reloj (`telling-time`, citado), `at six` y `at three`. Los dos números finos —6.400 al día y el
Nequi 300 771 20 46— **no hay que decirlos** para cerrar: el primero es munición del argumento de B
y el segundo se dicta dígito a dígito.

**Hueco del registro, no del escenario:** el inglés A1/A2 del repo **no tiene ningún tema de
numerales** (A1 solo trae `telling-time`). No hay nada que citar y no se inventa un slug. Mitigación
ya presente en la ficha: los precios son redondos. Queda apuntado para `habla-integracion`, porque
afecta a los ocho escenarios, no a este.

## 7 · Nota de formato para `habla-integracion`

El tipo de §7 pide `exponents: { form; use; register }[]` y las dos tablas `Say it here` tienen
`function / form / here`: **no llevan `register`**. Aquí lo fija la cita de cabecera («Polite, two
strangers») para toda la ficha. O el tipo acepta un registro de ficha, o hay que añadir la columna en
las dieciséis. No es asunto de nivel; se deja escrito para que no se descubra al integrar.

---

## Devuelto a `habla-fichas-de-rol` — la lista, una por una

| # | qué sale | qué entra | dónde |
|---|---|---|---|
| 1 | `Show that no other bike works for you.` | `Say that this is the only bike for you.` | B, restricción 3 (L130) |
| 2 | `They never found out that no other bike works for you.` | `They never found out that this is the only bike for you.` | B, `You did it if` (L192) |
| 3 | `You are counting on your brother-in-law's truck at six. Without it, moving the bike costs money you counted for the tire.` | `Your brother-in-law is bringing his truck at six. Without it, you have to pay to move the bike, and you need that money for the tire.` | B, `Only you know` (L134) |
| 4 | `You already counted the Nequi money for…` | `You already gave the Nequi money a job: the tire, the seat and the lock. Not the price.` | B, `Only you know` (L135) |
| 5 | `They said the rear tire was worn out before you did.` | `They named the rear tire before you did.` | A, `You did it if` (L113) |
| 6 | `You said the rear tire was worn out before they did.` | `You named the rear tire before they did.` | B, `You did it if` (L191) |
| 7 | `Say that early and you give the deal away.` | `If you say that early, you lose the deal.` | A, `Only you know` (L54) |
| 8 | `…and they took it.` ×2 | `…and they said yes.` | A L113 · B L190 |
| 9 | `Say all four and match, and it's closed.` | `Say all four. If you both say the same, it's closed.` | pantalla compartida (L222) |
| 10 | `Block 6 is for the why they will ask.` | `Block 6 is for when they ask why.` | A, `Your toolkit` (L94) |
| 11 | `…another Saturday to a fifth buyer` | `…another Saturday with a fifth buyer` | A (L59) |
| 12 | `The shop closes at …` | `The shop closes at … · I'll take it there before …` | A, exponentes, fila `the clock` (L105) |
| 13 | `the rear tire · they say it before you do` | `the rear tire · their first argument, not yours` | A, vocab `worn out`, columna `here` (L89) |
| 14 | `open question · transport is half the deal, and their answer can change in the middle of it` | `open question · transport is half the deal · their answer can change` | A, exponentes (L100) |
| 15 | `I bought it sixteen months ago` como prueba de `past-simple-regular` | `I posted it three weeks ago`, y el verbo irregular pasa a su tema | `grammarReferences` (L255) |
| 16 | 13 `grammarReferences` | 17: entran `past-simple-irregular`, `present-simple-questions`, `verb-to-be`, `present-simple-affirmative` (no sale ninguna) | bloque `ts` completo, arriba |

**Nada de esto rediseña el escenario.** El motor, los dos números, la carta, el reparto de turnos y
el cierre compartido quedan exactamente como están. Ninguna pieza se quita; las 16 son de redacción.
