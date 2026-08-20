# Auditoría de NIVEL — Escenario 1 `the-bike-in-the-parking-lot` (versión en inglés)

Fichero auditado: `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md`
Molde: `artifacts/habla-a2/fase7-modelo-ficha-en.md` · Caja: `artifacts/habla-a2/caja-de-herramientas-a2.md`
Registro comprobado: `src/data/grammar/registry.ts` → `src/data/grammar/ingles/{a1,a2}`

**Veredicto: PASA CON CAMBIOS.**

Lo que se habla está limpio. Lo que se lee, no. Y el vocabulario —que es nuevo y no había sido
auditado nunca— tiene dos definiciones que usan una palabra más difícil que la que definen, y le
falta la palabra que sostiene el escenario entero.

---

## Resumen por las cuatro puertas

| puerta | resultado |
|---|---|
| 1 · Inglés **hablado** = A2 | **Pasa.** Cero estructuras prohibidas. Tres exponentes rozan el techo (detalle abajo). |
| 2 · Inglés **leído** = A2 leído | **No pasa.** Ocho bloques por encima de A2. Dos de ellos —`Your toolkit` y `You did it if`— son frases únicas de 59-78 palabras. |
| 3 · Vocabulario: definición más simple que la palabra | **No pasa.** 2 definiciones invertidas de 20, 1 palabra clave sin definir (`deal`, 15 apariciones). |
| 4 · `grammarReferences` slug a slug | **Pasa con reserva.** Los 11 slugs existen y los 11 títulos coinciden literalmente. Pero 2 son de A1 y la ruta de gramática está clavada por nivel: enlazados desde A2 dan 404. |

---

## 1 · El inglés que hay que DECIR — pasa

Barrido de la lista de prohibidas sobre las 18 formas de las dos tablas `Say it here`, sobre la
caja y sobre las frases del cierre:

| estructura prohibida | apariciones |
|---|---|
| present perfect de duración con `for`/`since` | **0** (`since` solo aparece en un comentario del `rationale`, para prohibirlo) |
| `could` de cortesía | **0** (idem: solo el `rationale` de `can-ability` lo nombra para descartarlo) |
| pasiva | **0** en lo que se dice (ver §2: sí en lo que se lee) |
| preguntas incrustadas | **0** en lo que se dice (ver §2: sí en lo que se lee) |
| modal + infinitivo perfecto | **0** |
| condicional hipotético / `if I were` | **0** — el único condicional es `If you …, I can …`, primer condicional |
| `would rather` / `would prefer` | **0** |
| `would` en cualquier forma | **1**, y no es habla: `why you'd take them off`, glosa de vocabulario (línea 63) |

Las 18 formas son producibles: el pasado es `paid`/`did you change`, el futuro es `going to` y
`will`, la obligación es `can't`, la condición es primer condicional. `Cash, or part by Nequi?` y
`Maybe we can …` son elípticas, que es exactamente como habla un A2 real.

**Tres que rozan el techo** (ninguna descalifica; las tres tienen versión más corta que hace lo
mismo):

| exponente | qué pesa | versión corta |
|---|---|---|
| `I can't go under … with these gears on.` (A) | `go under` idiomático + `with these gears on` (cláusula absoluta con partícula) | `With the new gears, I can't go under …` |
| `I can put the old gear set back on.` (A) | cadena de tres partículas `put … back on` con SN largo en medio | `I can put the old gears on again.` |
| `That's more than I can pay today.` (B) | comparativa **de cláusula**, no de sintagma; `comparatives` A2 compara sintagmas | `That's too much for me today.` |

Si se quiere conservar `That's more than I can pay today.` —y hay razón, porque el `rationale` de
`comparatives` la cita como el eje del rechazo sin regateo— hay que aceptar que se enseña como
bloque memorizado, no como estructura productiva. Decirlo en la ficha o no citarla como prueba de
que el tema de comparativos cubre el escenario.

---

## 2 · El inglés que hay que LEER — no pasa

El problema no es una palabra suelta: es el **estilo telegráfico**. La ficha está escrita en
fragmentos sin verbo, con metáfora encima, y eso lo lee bien un nativo y no lo lee un A2. El
molde pide notas, no frases —correcto—, pero una nota A2 es *«El portero le dijo dos veces»*, no
*«The doorman, twice already»*.

Y hay una causa mecánica detrás: **el tope de 350 palabras de prosa**. Medido, la ficha entrega
344 (ROLE A) y 349 (ROLE B) — clava el presupuesto. Ese tope es justo lo que produjo los
fragmentos. Se resuelve al final de esta sección.

### GRAVE — bloques que hay que reescribir

**a) `Your toolkit`, los dos roles** (65 palabras ROLE A / 59 ROLE B, **una sola frase** cada uno,
con incisos de raya, paréntesis con dos puntos dentro, y tres metáforas: *may not have them*,
*that's where the secret leaks*, *yours isn't a reason, it's a receipt*, *they'll throw … at you*,
*you don't grant*).

> Propuesta ROLE A (62 palabras, seis frases):
> Blocks **1** `[grants]` — they come to you — **2**, **4** `[jargon]`: *gear set*, *brake pads*
> and *cable* are your words, and they came by bus. **6**: offer the old gears back and they will
> ask why. **7** `[grants]` and **8**. Not 3, not 5: the hard words are yours, and your reason is
> a receipt.

> Propuesta ROLE B (57 palabras):
> Blocks **1** `[asks]`, **2**, **3** `[receives]`: they will say *gear set*, *brake pads*,
> *cable*. You don't have to know those words — ask. **5**: your reason has a number, the bus.
> **6**: you have something you can't say. **8**: use it before you accept a price. Not 4, not 7.

**b) `You did it if`, los dos roles** (72 y 78 palabras, **una sola frase** encadenada con
interpuntos). Acumula lo peor:

- `at what time and with whom` — pregunta incrustada **y** `whom`, que no es A2 ni de lejos.
- `they said out loud how the rear tire is` — pregunta incrustada (×2, uno por rol).
- `who moves it said out loud` / `Nequi money moved only for…` — participios sin cópula, que se
  leen como pasiva reducida.
- `nobody found out you can go lower by keeping the gears` — `find out` + completiva sin `that` +
  `by + -ing`.
- `and you said so` — el pro-forma `so` es B1.

> Propuesta ROLE A (66 palabras):
> The bike leaves the lobby today. You both said the time, and who takes it · You said the price
> and the way to pay, out loud · They said out loud that the rear tire is worn out · The price
> went down only when something else changed · You asked an open question and got a new fact ·
> They never found out about the old gear set.

> Propuesta ROLE B (80 palabras):
> You leave with the bike, or with a day and a time to pick it up, and you said who moves it ·
> You paid 350,000 or less in cash, for the bike only · The Nequi money moved only for something
> in the deal, and you said that · You said out loud that the rear tire is worn out · You asked
> an open question and got a new fact · They never found out this is the only bike for you.

**c) `If you walk away with nothing`, ROLE A** — 31 palabras, verbo al final de una cadena de tres
sintagmas: *«Four floors on your shoulder again, another Saturday blocked for a fifth buyer with
the same speech, and the road bike stays where it is»*. `another Saturday blocked for…` es
participio pasivo con dos sintagmas preposicionales apilados.

> Propuesta (26 palabras): You carry it up four floors again. You lose another Saturday with a
> fifth buyer and the same speech. And the road bike stays in the shop.

**d) `If you walk away with nothing`, ROLE B** — *«Three weeks of looking, to start over»*: un
infinitivo de resultado colgado de un fragmento sin verbo. No es solo difícil, es que ni siquiera
es inglés bien formado. Y cierra con *«and the bus every day»*, elipsis sin verbo.

> Propuesta (26 palabras): Three weeks of looking, and you start again. The only bike in your size
> with a receipt stays here. And you take the bus every day.

**e) La cita de cabecera, los dos roles** — *«English has one you: the distance lives in the
forms.»* Es prosa abstracta de B2 en la primera línea que ve el estudiante. Además es literalmente
idéntica en A y en B (comprobado: solo cambia `They start.` / `You start.`).

> Propuesta: In English there is one *you*: the distance is in the words you choose.

### MEDIO — frases que hay que partir o desmetaforizar

| dónde | qué pesa | versión corta |
|---|---|---|
| A · `Where you are` | `Three weeks on Marketplace, four trips down with it` — dos sintagmas sin verbo, y `four trips down` es opaco | You put the bike on Marketplace three weeks ago. You carried it down four times. |
| A · `You can't` 2 | `The doorman, twice already.` | The doorman told you twice. |
| A · `You can't` 3 | `Shop work, and the shop closes at 1:00.` | Only the shop can do that, and it closes at 1:00. |
| A · `You can't` 1 | `A number, not a preference.` — `preference` es nominalización abstracta | This is a number, not a wish. |
| A · `Only you know` 1 | `Old one back on = 330,000` — signo igual y elipsis; `Say it in turn one and you give it away` — `give away` = revelar | With the old gears on, 330,000 is fine, and you lose nothing. Don't say this in turn one. |
| A · `Only you know` 2 | `nobody has named them` — `name` = mencionar es una acepción rara | nobody has talked about them |
| B · `Where you are` | `Half a minute on the rear tire, then hello.` — nadie que lea A2 saca de ahí «mira la llanta 30 segundos antes de saludar» | Look at the rear tire for half a minute. Then say hello. |
| B · `You want` | `transport said out loud` (participio suelto) · `Cap:` (fuera de A2 y fuera de la lista de palabras) · `bike alone` (`alone` pospuesto) | And say out loud who takes it home. Your limit: 350,000 in cash, for the bike only. |
| B · `You can't` 2 | `unless it buys something inside the deal` — `unless` es B1 y el dinero «compra» algo metafóricamente | Only use it if you get something more in the deal. |
| B · `Only you know` 1 | `four bikes seen` — participio pasivo sin cópula | You saw four bikes. |
| B · `Only you know` 3 | `Nequi money already counted` — idem | The Nequi money is already counted. |
| Cierre común, punto 1 | `how it's paid` — pasiva **y** pregunta incrustada, las dos prohibidas, en una instrucción | The final price, and how they pay. |
| Cierre común, punto 2 | `What the bike leaves with` — relativa libre con preposición al final | What goes with the bike |
| Cierre común, cabecera | 27 palabras con dos subordinadas | Say the whole deal out loud, both of you. Use these four facts. Then check: are you both saying the same thing? |
| Cierre común, cierre | `One of the four missing and you're not done.` — construcción absoluta | If one of the four is missing, you are not done. |
| Carta, cabecera | `at the end of global turn 5` — `global turn` es jerga interna del blueprint | Open it after your third turn. |

### LEVE

- Tablas `Facts`: `up three weeks` (opaco), `rear tire fitted 38,000` (participio sin cópula),
  `road bike you want 750,000` (relativa de contacto), `To make it usable` (`usable` derivado, no
  glosado). En tabla el telegrama se tolera mejor que en prosa, pero estos cuatro se arreglan
  gratis: `posted three weeks ago`, `new rear tire: 38,000`, `the road bike: 750,000`, `To use it`.
- `harder on the two small gears` (tabla `Facts` de A **y** citado en el `rationale` de
  `comparatives` como cosa que se dice): `hard on` = «duro para» es idiomático. Alternativa:
  `the two small gears are difficult to use`.
- `haggle` / `haggling` (columna 3 de B, dos veces) es B2 y no está en la lista de palabras,
  mientras que `to drop the price` sí está glosado. Usar el que está glosado.
- `turn the figure down` — separable con SN largo en medio, y `a haggle` como contable no es
  natural ni en inglés nativo.
- La columna 3 de `Say it here` acumula metáfora: *back the number*, *plant the number*,
  *put the clock that squeezes you both on the table*, *without asking for pity*, *set out the
  ways to be paid* (infinitivo pasivo), *transport is half the deal*. **Buena noticia: esa columna
  es tabla y no cuenta en el presupuesto de prosa** — se puede arreglar entera sin pagar una sola
  palabra. Ejemplos: `back the number…` → *Show the paper. The number is real.*; `plant the
  number…` → *Say your number. Keep talking.*; `put the clock that squeezes you both on the
  table` → *The clock is a problem for both of you. Say it.*
- `walk away with nothing` es cabecera compartida con el molde. `walk away` = irse no es
  transparente en A2. Si se cambia, se cambia en los ocho escenarios: `If you get nothing`.

### El presupuesto es la causa, y tiene salida

Medido con el mismo criterio declarado (prosa, sin tablas): **ROLE A 344, ROLE B 349**. El tope de
350 está clavado, y por eso la ficha está en telegrama.

Sumadas todas las propuestas de arriba, ROLE A queda en ~353 y ROLE B en ~371. No caben.

**La salida no es recortar contenido: es sacar del presupuesto la cita de cabecera.** Son 39
palabras por rol, **idénticas en los dos roles** y presumiblemente en los ocho escenarios (registro,
`one you`, «tu pantalla, no la enseñes»). Es plantilla, no ficha — exactamente igual que la caja de
herramientas, que ya vive fuera y una sola vez. Sacándola: ROLE A ~314, ROLE B ~332. Ambos por
debajo de 350, con aire.

Si se prefiere no tocar la definición del presupuesto, la alternativa es subir el tope a 380 para
la versión en inglés y dejarlo escrito en §11. Lo que no es defendible es mantener 350 **y** pedir
A2 leído: son incompatibles y esta ficha lo demuestra.

---

## 3 · Vocabulario — una a una

20 entradas (10 + 10). El criterio aplicado: ¿la definición usa alguna palabra más difícil, más
rara o más ambigua que la que define?

### Las que fallan

| rol | palabra | definición actual | por qué falla | propuesta |
|---|---|---|---|---|
| A y B | `in cash` | *in bills, not by phone or card* | **`bill` es más difícil que `cash` para un hispanohablante, y es falso amigo justo en un escenario de pagos**: `bill` se lee «factura / cuenta». Definir «efectivo» con «billetes» solo funciona si sabes que `bill` = billete, y ese es el problema. | *in paper money, not by phone or card* |
| B | `to come with` | *to be included in the price* | `included` es más difícil que `come with`, y además es **pasiva**, prohibida en la ficha. Se define un verbo fácil con una estructura prohibida. | *to go with the bike, with no extra money* |

### La que falta

**`deal`.** Aparece **15 veces** en la ficha —`inside the deal`, `what moves in the deal`, `the
deal moves`, y los dos actos del escenario giran sobre ella— y **no está glosada en ninguno de los
dos roles**. Es la palabra más cargada del ejercicio y la única que no se explica.

> Propuesta, en las dos listas: `deal` | *everything the two of you agree: the price and all the
> other things* | *inside the deal — the price is only one part of it*

### Ajustes menores (funcionan, se pueden afinar)

| rol | palabra | nota | propuesta |
|---|---|---|---|
| A | `gear set` | *how hard you pedal* mete una cláusula de grado | *the parts that make the bike easy or hard to pedal* |
| A | `lock` | *the metal chain you close a bike with* — preposición colgada, y un candado no siempre es una cadena | *the metal thing you use to close a bike* |
| A | `to fit` | la columna «here» dice *why you'd take them off* — **el único `would` de toda la ficha** | *why you take them off* |
| B | `a scratch` | *where the paint came off* — phrasal en la definición | *a thin line with no paint* |

### Las que están bien (12 de 20, y algunas son muy buenas)

`brake pads` → *the parts that press the wheel to stop it* · `worn out` → *used so much it doesn't
work well* (los dos roles) · `to fit` → *to be the right size for something* · `receipt` → *the
paper the shop gives you with the price* · `to throw something in` → *to add it to the deal for
free* · `to drop the price` → *to make the price lower* · `the frame` → *the metal tubes, the body
of the bike* (los dos roles) · `second-hand` → *not new — someone used it before you* · `torn` →
*with a cut or a hole in it* · `to fix` → *to make something work again* · `round trip` → *going
and coming back* · `to pick something up` → *to go somewhere later and take it*.

Dos aciertos de diseño que conviene no perder al editar: **`worn out` está en las dos listas con
la misma definición y distinta función** (*ellos lo dirán antes que tú* / *es tu primer argumento,
y lo dices pronto*); y **`to throw something in` (A) y `to come with` (B) son las dos caras de la
misma jugada**, cada una desde su lado. Y que `gear set`, `brake pads` y `cable` **no** estén en la
lista de B es correcto, no es un hueco: es el bloque 3 `[receives]` haciendo su trabajo.

---

## 4 · `grammarReferences` — slug a slug contra el registro

Comprobado contra `src/data/grammar/ingles/a2` (21 temas) y `.../a1` (25 temas). **Los 11 slugs
existen y los 11 `title` coinciden literalmente con el `title` del registro.** No hay ni una errata.

| # | slug | ¿existe? | nivel real | `title` coincide |
|---|---|---|---|---|
| 1 | `first-conditional` | sí | A2 | sí |
| 2 | `comparatives` | sí | A2 | sí |
| 3 | `quantifiers` | sí | A2 | sí |
| 4 | `have-to-must` | sí | A2 | sí |
| 5 | `will-future` | sí | A2 | sí |
| 6 | `past-simple-regular` | sí | A2 | sí |
| 7 | `past-simple-questions` | sí | A2 | sí |
| 8 | `connectors-a2` | sí | A2 | sí |
| 9 | `prepositions-movement-a2` | sí | A2 | sí |
| 10 | `can-ability` | sí | **A1** | sí |
| 11 | `telling-time` | sí | **A1** | sí |

Los dos con sufijo están bien puestos: el archivo es `a2/connectors.ts` pero el `slug` interno es
`connectors-a2`, y `a2/prepositions-movement.ts` → `prepositions-movement-a2`. Sin sufijo darían
`null`. Correcto.

### GRAVE — los dos de A1 se rompen al enlazarlos

`getTopicBySlug(idioma, nivel, slug)` busca **dentro de un nivel**, y la ruta de gramática tiene el
nivel clavado en el archivo:

```
src/app/(site)/practica/ingles/a2/gramatica/[slug]/page.tsx
  const NIVEL = 'a2'
  const topic = getTopicBySlug(IDIOMA, NIVEL, slug)
  if (!topic) notFound()
```

Un escenario de habla A2 que enlace `can-ability` o `telling-time` bajo `/practica/ingles/a2/…`
**da 404**: viven en `/practica/ingles/a1/…`. Dos de once enlaces rotos, y son precisamente los que
sostienen `Can I…?` y la hora del taller.

**Arreglo:** añadir `level` al objeto de referencia y construir la URL con él.

```ts
{ slug: 'can-ability', level: 'a1', title: 'Can para habilidad en inglés A1', rationale: '…' },
```

Los comentarios `// a2` / `// a1` del final de cada línea ya llevan el dato: solo hay que moverlo
dentro del objeto para que el código lo pueda leer. Nota para quien implemente: el consumidor
existente (`getGrammarReferences` en `src/data/practica/writing-integrated.ts:1046`) **no** tiene
campo `level` — asume el nivel del ejercicio. Si habla reutiliza ese tipo, hay que ampliarlo.

### MEDIO — dos huecos de cobertura

- **`going to` no está referenciado.** El exponente `How are you going to take it home?` es una de
  las dos preguntas abiertas exigidas en el `You did it if` de ROLE A, y ningún tema de la lista lo
  cubre. Existe `going-to` en A1. Añadirlo.
- **El presente continuo tampoco.** `Why are you selling it?` es la pregunta abierta obligatoria de
  ROLE B. Existe `present-continuous` en A1. Añadirlo, o justificar por escrito por qué no.

Con esos dos, las tres preguntas abiertas del escenario tendrían anclaje (`past-simple-questions`
ya cubre `What did you change on it?`).

### LEVE

- El `rationale` de `comparatives` cita `the old gears are harder on the small ones` como prueba.
  Ese giro (`hard on`) es lo que se marcó arriba como idiomático; si se cambia la tabla `Facts`,
  hay que cambiar la cita.
- El `rationale` de `first-conditional` cita *«If you take the old gear set, I can do 340,000»*,
  que no aparece literalmente en ninguna tabla (la tabla trae el esqueleto `If you …, I can …`).
  No es un error, pero conviene que la cita sea una frase que el estudiante vaya a ver.

---

## 5 · Dos notas de coherencia (fuera de nivel, pero salen al leer)

1. **ROLE A dice `Not 5`** («tu razón no es una razón, es un recibo») **y a la vez** glosa el
   exponente `It can't stay here after today.` como *«say what pushes you, without asking for
   pity»* — que es exactamente la función del bloque 5. O se admite el 5 para A, o se reescribe esa
   glosa.
2. **ROLE A es `[grants]` en el bloque 1**, y la caja solo ofrece dos aperturas `[grants]`:
   *«Good morning. How can I help you?»* (mostrador) y *«Come in. What's going on?»* (tú los
   llamaste). Ninguna encaja del todo con un vendedor en el lobby de su edificio. O se acepta la
   primera con holgura, o la caja necesita una tercera forma `[grants]` neutra.

---

## Qué hay que tocar, en orden

1. Sacar la cita de cabecera del presupuesto de prosa (39 palabras × rol). Sin eso, lo demás no
   cabe.
2. Reescribir `Your toolkit` y `You did it if` de los dos roles. Son los dos bloques que más pesan
   y los que más estructura prohibida esconden.
3. `in cash` → *paper money*; `to come with` → sin pasiva; añadir `deal` a las dos listas.
4. Añadir `level` a los `grammarReferences` y meter `going-to` y `present-continuous`.
5. Los MEDIO de lectura, uno por uno. La columna 3 de `Say it here` sale gratis: es tabla.

**Aviso al que coordine:** los defectos b) y e) —cita de cabecera abstracta, `Your toolkit` como
frase única de 60 palabras con metáfora— **están también en el molde**
(`fase7-modelo-ficha-en.md`, escenario 3) y por tanto, con casi total seguridad, en los seis
escenarios restantes. Arreglar solo el 1 deja el conjunto desigual. Conviene decidir el criterio
una vez, escribirlo en §11 del blueprint, y aplicarlo a los ocho.
