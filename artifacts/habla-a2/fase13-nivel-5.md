# Fase 13 · Calibrador de NIVEL — escenario 5, `late-again-on-monday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` **tal como está hoy en
disco** (22 ago 2026), después de la pasada de calcabilidad `acce0501`. No se dio por vigente
ninguna cifra escrita dentro de la ficha: la viva es la del contador canónico, corrida hoy.

```
node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs
fase7-fichas-5-late-again-on-monday.md        447   445      (techo 450)
```

**Contra:** §4, §7, §10 y §11 de `docs/habla-acompanado-blueprint.md`;
`src/data/grammar/ingles/{a1,a2}` tema a tema (el registro vive en `src/data/grammar/`, no en
`src/data/grammar/registry/`: esa ruta no existe); y `artifacts/habla-a2/caja-de-herramientas-a2.md`.

**Prueba aplicada a cada arreglo propuesto:** *si se dice tal cual y el turno avanza, está mal
escrita.* Ningún arreglo de este informe pasa de las palabras que quita.

---

## Veredicto: **CABE CON CAMBIOS**

La ruta mínima se escribe entera con lengua A2 y cierra en **cinco turnos por rol** (§1), los dos
actos declarados son de la fila A2 de §4, y la carga B1 que fase 9 midió —resumen del acuerdo,
pregunta extra, espejo doble— ya no está. **El nivel del escenario es A2 y no hay que moverlo.**

Lo que hay que cambiar son **nueve líneas**, y la mitad no las escribió el diseño: las
introdujeron pasadas de calcabilidad. Dos de ellas son estructuras que **no tienen tema en el
registro A1/A2** (H1, H2) y son bloqueantes; el resto son menores, de variedad o de anclaje.

**Y la cuenta pendiente se salda a favor de la reescritura de hoy: `— or why it costs you
nothing.` es A2** (§0). Pero el mismo cruce que la produjo ha pasado **tres veces más** en esta
ficha, y las tres veces al revés: un arreglo de forma o de calcabilidad metió estructura de B1.
Está en §2, y es el hallazgo de conjunto de este informe.

---

## 0 · La cuenta pendiente — criterio 6 de B

> l. 184 · `You gave a training day you can keep and said what it costs you — or why it costs you nothing.`

**Sí, es A2.** Confirmado pieza por pieza, y de hecho es **más A2** que la línea que sustituye:

| pieza | qué es | tema que la sostiene |
|---|---|---|
| `You gave…` / `…and said…` | pasado simple, dos verbos irregulares coordinados | `past-simple-irregular` (a2) |
| `a training day you can keep` | relativo de objeto **omitido** (`a day [that] you can keep`) | `relative-clauses-a2` — outcome 4 y decisión 4 lo enseñan literalmente: «Omite el pronombre relativo cuando es el objeto» |
| `can keep` | modal + base | `can-ability` (a1) |
| `what it costs you` | relativa libre nominal, orden SVO, sin inversión ni `do` | sin tema propio; es la misma forma que ya llevan los criterios 5 y 7 de A |
| `— or why it costs you nothing` | elipsis de coordinación (`said [what…] or [why…]`), presente simple, orden canónico | idem |

Lo que la versión anterior tenía y esta no: **un primer condicional con imperativo en el
resultado** (`If it costs you nothing, say why.`). Esa era la forma que se levantaba de la
pantalla y se decía en la mesa. Al pasar a `— or why…` desaparece el condicional, desaparece el
imperativo, y el predicado vuelve al pasado, que es la forma de los otros seis criterios de B.
**No hay que proponer nada distinto: la línea de hoy está bien.**

**Un matiz, y no es de gramática:** el `it` de `what it costs you` no tiene antecedente explícito
—remite a dar el día de capacitación—. Es carga de lectura, no de nivel, y arreglarlo cuesta
palabras que B no tiene de sobra. Se deja.

**Una consecuencia sí hay que sacarla.** `why it costs you nothing` es una **cláusula wh
incrustada**, y la cabecera de la ficha (l. 19) declara `Fuera preguntas incrustadas`. Con esa
declaración leída al pie de la letra, la línea que acaba de arreglarse es ilegal — y con ella
otras once. Ver H9: lo que sobra no es la línea, es la declaración.

---

## 1 · La ruta mínima — la prueba que decide

Escrita con lengua A2 solamente, arrancando B como manda la ficha, cumpliendo las tres
restricciones de cada rol y llegando a los tres puntos del cierre más la firma. **Cinco turnos
por rol**, dentro de la banda declarada `6-9 turns each · 8 min`.

| # | turno | lo que lo sostiene |
|---|---|---|
| B1 | `Have a seat, Camilo. What happened this morning?` | `imperative` (a1) · `past-simple-regular` (pregunta de sujeto, sin `did`) |
| A1 | `I'm sorry about today. My bus used to arrive at ten to seven. The road work started on August 1. Now the bus comes at a quarter past seven, and I have to leave Matías at the daycare at 6:40.` | `used-to-a2` · `past-simple-regular` · `have-to-must` · `telling-time` · `prepositions-time` |
| B2 | `I have to write something today. If you write this line today, I can give you the keys. But I need two mornings of training too.` | `have-to-must` · `first-conditional` + `can-ability` · `connectors-a2` |
| A2 | `What are the keys for, doña Amparo? I'd like that job. The neighbor in 3 can take Matías. Then I pick up her two boys on Wednesdays. I can start at five to seven.` | `wh-questions` · `can-ability` · presente simple |
| B3 | `The commitment sheet, then — nothing in your file. The training is on two Thursdays, 6:30 to 8:30. Nobody pays me for those hours.` | presente simple · `prepositions-time` |
| A3 | `I can't do Saturday mornings. It's personal. That costs me my Wednesdays. And what does this cost you?` | **caja, bloque 6** · `present-simple-questions` |
| B4 | `Two nights. We look at it again on Monday, September 14. You fill out this line, not me.` | presente simple · `prepositions-time` |
| A4 | `I'll start at five to seven, from next Monday. The neighbor takes Matías, I take the 6:00 bus, and I open the store with you.` | `will-future` |
| B5 | `Good. Sign here. This costs you your Wednesdays.` | `imperative` · fórmula del cierre |
| A5 | `Thanks for your time.` | **caja, bloque 2** |

**Se puede escribir, y sin una sola estructura de B1.** Eso cierra la pregunta de nivel: el
escenario es A2. Lo único que la ruta mínima no absorbe son los **catorce `You did it if`**
(7 + 7): cada criterio es un turno obligado, y con siete por rol la pareja media juega en el
**techo** de la banda, no en el suelo. La banda es legal desde la pasada quirúrgica; el recorte
pendiente de 7 → 5 criterios (anotado en la propia ficha, l. 527-528) es lo que la haría cómoda.
**No es un defecto de nivel; es carga, y ya está registrada.**

---

## 2 · El hallazgo de conjunto — cuatro cruces, y solo uno iba en la dirección conocida

La ficha lleva tres rondas con dos cepillos que no se hablan entre sí. El resultado, medido:

| # | qué pasó | dónde | commit |
|---|---|---|---|
| 1 | **Un arreglo de NIVEL creó una decible** — `fase9-nivel-5.md` §3.5 quitó el subjuntivo (`If it cost` → `If it costs`) y la línea se pudo decir | l. 184 | `d672a01c` → cazado y arreglado hoy |
| 2 | **Un arreglo de CALCABILIDAD metió B1** — la falla 6 de `fase9-calcable-5.md` cambió `: the other four would see it.` por `, not with the other four watching.`: fuera el condicional hipotético, dentro `with` + objeto + `-ing` | l. 118 | `d672a01c`, el **mismo commit** |
| 3 | **Otro arreglo de CALCABILIDAD metió B1** — `fase11-ultimas-lineas.md` §6 reescribió el objetivo de A y dejó `want` + objeto + adjetivo (`your August bonus safe from that paper`) | l. 30 | `ae708726` |
| 4 | **Un arreglo de FORMA metió una pregunta incrustada** — F4 de `fase9-calcable-5.md` cambió la pregunta directa `did it work?` por `see if it worked`, que es justo lo que la ficha declara fuera | l. 150 | `d672a01c` |

Los cuatro son la misma avería: **el que arregla mira una sola prueba**. El caso 2 es el más
claro de todos, porque la misma pasada que sacó el gerundio con sujeto de la línea 33 de A
(`the store deciding what those hours are worth`, §3.2 del informe de nivel) metió su gemelo en
la línea 118 de B. Ese día las dos listas se aplicaron seguidas y nadie volvió a pasar la
primera.

**Lo que esto pide del proceso, no de la ficha:** toda reescritura de calcabilidad que cambie
una forma verbal se vuelve a pasar por el nivel antes de commitear, y al revés. Es una nota para
`habla-fichas-de-rol` y para el guardián, no un cambio de texto.

---

## 3 · Tabla forma → tema del registro

Las 25 formas de las dos tablas `Say it here`. `✔` = el tema **está citado** en
`grammarReferences`; `falta` = el tema existe en el registro y **no está citado**; `sin tema` =
no hay tema en A1 ni en A2 que lo sostenga.

### ROLE A — Camilo

| función | forma | tema del registro | estado |
|---|---|---|---|
| an hour that cannot move | `I have to leave Matías at the daycare at…` | `have-to-must` (a2) + `prepositions-time` (a1, *at* + hora) | ✔ / **falta** |
| asking what the keys are for | `What are the keys for, doña Amparo?` | `wh-questions` (a1) — WH + `are` + sujeto, la fila 1 de su tabla | **falta** |
| naming the paper | `Which paper is that, and who…?` | `wh-questions` (a1) + `demonstratives` (a1) | **falta** |
| one apology | `I'm sorry about…` | **sin tema** · fórmula fija; `verb-to-be` (a1) cubre la forma | fórmula, no citar |
| putting a name on the table | `The neighbor in… can take…` | `can-ability` (a1) | ✔ |
| saying the job out loud | `I'd like…` | **sin tema** · `like-ing` (a1) mandaría a otra cosa | fórmula, no citar |
| the price, both ways | `Then I pick up her two boys on…` | `present-simple-affirmative` (a1) + `prepositions-time` (*on* + día) | **falta** |
| the price, both ways | `And what does this cost…?` | `present-simple-questions` (a1) — `Wh- + does + sujeto + base`, su fila literal | **falta** |
| what changed in August | `My bus used to arrive at… — now…` | `used-to-a2` (a2) | ✔ |
| what changed in August | `The road work started on…` | `past-simple-regular` (a2) + `prepositions-time` (*on* + fecha) | ✔ / **falta** |
| what you can start | `I can start at…` | `can-ability` (a1) | ✔ |
| what you can start | `I'll start at…, from…` | `will-future` (a2) · el `from` + fecha **no** lo cubre `prepositions-time` (enseña in/on/at) | ✔ parcial |

### ROLE B — doña Amparo

| función | forma | tema del registro | estado |
|---|---|---|---|
| asking, and then waiting | `What happened this morning?` | `past-simple-regular` (a2) — `happen` es regular. **Pregunta de sujeto: no la ancla `wh-questions`** (ver §6) | ✔ |
| asking, and then waiting | `And what can you…?` | `wh-questions` (a1) — decisión «Con can: WH + can + sujeto + verbo» | **falta** |
| granting it | `If you write this line today, I can…` | `first-conditional` (a2) **solo la cláusula `if`** + `can-ability` (a1) el resultado | ✔ con `rationale` falso (§6) |
| he thinks you're angry | `I'm not angry.` | `verb-to-be` (a1), negativo | **falta**, y es prescindible |
| naming your price | `That helps, but I need…` | `connectors-a2` (a2) + `demonstratives` (a1) | ✔ |
| naming your price | `I need… mornings on…, and I…` | `prepositions-time` (a1, *on* + día) | **falta** |
| one more door | `What if we…?` | **sin tema** · se conserva como chunk, ya declarado | no citar |
| one more door | `Maybe we can…` | `can-ability` (a1) | ✔ |
| the rule, not the fight | `I have to write…` | `have-to-must` (a2) | ✔ |
| the two things on the desk | `Have a seat, Camilo.` | `imperative` (a1) | ✔ |
| the two things on the desk | `You fill out this line, not me.` | `present-simple-affirmative` (a1) · phrasal sin separar ✔ | **falta** |
| what it costs each of you | `Nobody pays me for…` | **sin tema** · `quantifiers` (a2) no lleva `nobody/nothing/none`; `somebody` tampoco | hueco del registro (§7) |
| what it costs each of you | `That costs you…` | `demonstratives` (a1) + presente simple | **falta** |
| why him | `You know this warehouse better than…` | `comparatives` (a2) — enseña `better` como **adjetivo**; aquí va de adverbio | ✔ con la salvedad ya escrita |

**Lectura:** 25 formas, **cero fuera de nivel**. El problema no es que haya lengua de B1 en los
exponentes —no la hay— sino que **la mitad se apoya en cinco temas A1 que la lista no cita**.
`wh-questions` y `prepositions-time` sostienen las dos aperturas obligatorias y cuatro huecos
del cierre: sin ellos, el escenario que abre con dos preguntas por rol no tiene ningún tema que
ancle la pregunta abierta. Está en §6, listo para pegar.

---

## 4 · Hallazgos de estructura — la lengua que se LEE

Nueve. Los dos primeros son bloqueantes: no tienen tema en A1 ni en A2 y no se reconstruyen en L2.

### H1 · BLOQUEANTE — `with` + objeto + `-ing` · l. 118

> `2. You can't give the keys with nothing in writing, not with the other four watching.`

`with the other four watching` es una **cláusula absoluta con participio**. No hay tema que la
sostenga en A1 ni en A2, y es la misma familia que `fase9-nivel-5.md` §3.2 sacó de la línea 33
de A el mismo día (`the store deciding what those hours are worth`). Entró como arreglo de
calcabilidad (falla 6): quitó el `would see it`, que sí era el defecto, y dejó otro.

**Arreglo — 6 → 7 palabras (B: 445 → 446, techo 450):**
`…, not in front of the other four.`
Ancla: `prepositions-place` (a1), que lleva `in front of` en su tabla y en sus decisiones.
**Prueba:** sigue siendo un fragmento sin verbo conjugado —no se levanta como turno— y la
oración principal (`You can't give the keys…`) sigue siendo falsa en boca de Camilo, que no
tiene las llaves.

**Alternativa a coste cero, si B no quiere gastar la palabra:** `…, not with the other four
there.` (6 palabras). Quita el participio; conserva el `with` + sintagma, que es preposición
normal y no cláusula.

### H2 · BLOQUEANTE — `have` + objeto + `-ing` · l. 123

> `- You have Alba, from the counter, asking for the keys too.`

`have` + objeto + participio de presente es estructura causativa/de percepción: B1 largo, sin
tema en el registro, y la única forma de la ficha que un A2 no reconstruye ni con el contexto
delante. No la metió ninguna pasada: viene del original (`e99f9de4`) y ha sobrevivido a dos
auditorías de nivel.

**Arreglo — 11 → 10 palabras (B: −1):**
`- Alba, from the counter, asks you for the keys too.`
Ancla: `present-simple-affirmative` (a1), tercera persona con `-s`.
**Prueba:** dicho por Amparo a Camilo, `asks you` apunta a Camilo y es falso —Alba no le pide
las llaves a él—; para decirlo de verdad tendría que cambiar `you` por `me`. El predicado se
cae, que es la protección que ya tenía la línea.

### H3 · Pregunta incrustada con `if`, dos veces en la misma fila · l. 150

> `| review date | the day you look at it again and see if it worked | September 14 · the day somebody can see if it is true |`

`see if…` es interrogativa indirecta de sí/no. No hay tema en A1 ni en A2, y la cabecera de la
ficha la declara fuera. La primera entró con **F4 de `fase9-calcable-5.md`**, que sustituyó una
pregunta directa (`did it work?`) —que sí era A2— por esta.

**Arreglo — celda central 12 → 11 palabras; celda `here` 9 → 5:**
`| review date | the day you look at it again and see the result | September 14 · the day somebody checks it |`
Las dos son celdas de tabla: **el contador no las cuenta**, así que el presupuesto no se mueve.
**Prueba:** las dos siguen siendo sintagmas nominales sin verbo principal; no se levantan como
turno, y §11 pide notas en las tablas, que es lo que son.

### H4 · `want` + objeto + adjetivo · l. 30 — menor

> `**You want** · You want your August bonus safe from that paper, and the second set of keys.`

`want X safe from Y` es una oración reducida (*small clause*) y encima metafórica: una
bonificación no está «a salvo de un papel» más que por figura. Un A2 lo descifra, pero paga por
ello. Entró en `ae708726`, otra vez desde calcabilidad.

**Arreglo — 15 → 15 palabras (coste cero):**
`**You want** · You want your bonus, and the second set of keys. Both go with that paper.`
**Si se quiere conservar `August`:** misma línea con `your August bonus` → 16 palabras
(A: 447 → 448, dentro del techo). El dato sigue en `Facts` (`August bonus | 80,000 pesos`).
**Prueba:** `Both` no tiene antecedente en voz alta —la misma protección que ya deja pasar
`Your bonus goes with it` en la l. 41— y la primera oración, dicha por Camilo, habla de Amparo
y es falsa.

### H5 · Presente perfecto con sintagma nominal pelado · l. 112 — menor

> `…and you have opened alone three Mondays.`

`present-perfect-basic` (a2) enseña el recuento con `twice` y `many times`; `three Mondays` sin
preposición ni `times` no es el patrón del tema y además es idiomáticamente raro (el nativo dice
`three Mondays in a row`).

**Arreglo — 7 → 7 palabras (coste cero):** `…and you have opened alone three times.`
Los tres lunes siguen en la tabla de B (`Late Mondays | August 3 · August 10 · today`).
**Alternativa que conserva el sustantivo, +1 palabra:** `…and you have opened alone on three
Mondays.` (ancla `prepositions-time`).
**Prueba:** la oración sigue colgando de `The store you open` y `You are alone at the door`, las
dos falsas en boca de Camilo. Sin cambio.

### H6 · `to name` metalingüístico y presente suelto · l. 100 — menor

> `6. You can name the paper and say who reads it.`

`to name` en el sentido de «decir cuál es» es léxico B1, no está en el vocabulario de la ficha, y
el criterio es uno de los dos de A que quedaron en presente cuando los otros cinco están en
pasado.

**Arreglo — 10 → 10 palabras:** `6. You said which paper it is, and who reads it.`
Es **el mismo arreglo que pide `fase13-calcable-5.md` §3**: los dos cepillos coinciden. Desde el
nivel se gana además la forma canónica de la cláusula wh —orden sujeto-verbo, sin inversión—,
que es exactamente lo que hay que modelar si se conserva esa estructura en la ficha.
**Prueba:** segunda persona en pasado; dicho por Camilo sería `I said…`. El predicado se cae.

### H7 · `a quiet deal` · l. 201 — menor, y es de hoy

> `> - No room now for a quiet deal.`

**La forma es correcta y no hay que tocarla:** la carta es zona de notas según §11 («en las
tablas —datos duros, vocabulario, **la carta**— se escribe en notas»), así que el sintagma sin
verbo está bien puesto, y es lo que impide que se diga. El problema es **léxico**: `quiet` en el
sentido de *discreto/secreto* es una extensión figurada que un A2 hispanohablante no descodifica
—conoce `quiet` = *callado*—.

**Arreglo — 7 → 7 palabras:** `- No room now for a secret deal.`
`secret` es cognado transparente y era la palabra que la línea tenía antes de hoy; lo que la
volvía decible era el verbo (`does not work now`), no el adjetivo. Sin verbo no se levanta.

### H8 · `with two Mondays to explain` · l. 126 — al filo, señalado y no propuesto

`with` + sustantivo + infinitivo con hueco de objeto (`two Mondays [that you have] to explain`).
Está en el límite: el patrón `nombre + to + infinitivo` (`something to eat`, `work to do`) sí es
A2, y el `with` adjunto es lo que aprieta. **Toda reescritura que probé costaba palabras o
volvía a poner en la mesa una amenaza decible.** Se deja como está y se anota; si alguien toca
esa línea por otro motivo, que la mire.

### H9 · La declaración de nivel de la ficha es falsa contra su propio texto · l. 19

> `Fuera preguntas incrustadas, since de duración, condicional hipotético y could de cortesía.`

Tres de las cuatro se cumplen a rajatabla —cero `since` de duración, cero `would/could/might`
en toda la ficha, verificado por patrón—. La primera **no**: hay doce cláusulas wh incrustadas,
y entre ellas está el criterio 6 de B que se acaba de arreglar (l. 33, 35, 100, 101, 147, 150 ×2,
171, 174, 184, 203, 215). Ninguna es un problema —todas van en orden canónico, sin inversión y
sin `do`— pero la declaración las condena a todas y hace que el siguiente auditor las «arregle».

**Arreglo — metadato de producción, cero palabras en pantalla:**
`Fuera preguntas incrustadas con inversión o con do/did, since de duración, condicional
hipotético y could de cortesía.`
Es lo que la ficha hace de verdad, y es lo que hay que poder citar la próxima vez que alguien
pregunte si `why it costs you nothing` cabe.

---

## 5 · Variedad americana

**Correcto y deliberado:** `road work`, `to fill out`, `daycare`, `auto parts store`, `truck`,
`apartment 3`, `store`, `counter`, `Have a seat`. `a telling-off` y `rota` siguen fuera.
`a quarter past seven` / `five to seven` / `ten to seven` se quedan como están: son las formas
que enseña `telling-time` (a1) en su tabla, y en americano son correctas. **No cambiarlas por
`quarter after`.**

Dos que no son americanas:

| # | l. | qué | arreglo | coste |
|---|---|---|---|---|
| V1 | 38 | `a kids' football school` — para un lector americano `football` es fútbol americano; el deporte de la escuela de Camilo es `soccer` | `a kids' soccer school` | 1 × 1 palabra |
| V2 | 28, 112 | `The auto parts store is still shut` · `The store you open is still shut` — `shut` para un comercio es marcadamente británico, y choca con `store`, que es la palabra americana | `still closed` (las dos) | 1 × 1 palabra, dos veces |

Ninguno de los dos toca la calcabilidad: V1 va dentro de `You coach…` (segunda persona) y V2 no
cambia el sujeto de ninguna oración.

**Uno que se nombra y no se propone: `delivery note`.** Aparece **11 veces**, es entrada de
vocabulario en las dos fichas y está dentro de dos notas de exponente. En americano corriente
ese papel es un `packing slip`. Pero es transparente para un hispanohablante, el cambio toca once
sitios y dos glosas escritas a medida, y la misma palabra está en otras fichas del set:
**es decisión de conjunto, no de este escenario.** Queda registrada aquí para que la tome
`habla-conjunto` de una vez para los ocho.

---

## 6 · `grammarReferences` — lista para pegar

Los diez slugs actuales **existen todos** con su `level` correcto (verificado contra
`src/data/grammar/ingles/{a1,a2}`: `used-to-a2`, `first-conditional`, `have-to-must`,
`past-simple-regular`, `will-future`, `connectors-a2`, `comparatives` en a2; `imperative`,
`can-ability`, `telling-time` en a1). No hay que quitar ninguno.

**Tres cosas que hacer.**

### 6.1 · Quitar media frase falsa del `rationale` de `first-conditional` (l. 248)

Dice: «…presente simple en la cláusula if y **can de permiso en el resultado, que es la forma que
el tema enseña**». El tema enseña `will` en el resultado (`formula`, `table`), permite
`can/must/have to` **solo dentro de la cláusula `if`** (`decisions[4]`), y marca con ❌ el
resultado sin `will` (`mistakes[2]`: *"If you study, you pass" ❌*). La estudiante que pulse el
enlace desde `If you write this line today, I can…` verá su propio exponente en la lista de
errores del tema. Ya estaba señalado en `fase9-nivel-5.md` §5 y sigue vivo.

```ts
  { slug: 'first-conditional', level: 'a2', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion de la supervisora: "If you write this line today, I can…" — el tema ancla la cláusula if, que es donde está la regla dura (presente simple, nunca will). El modal del resultado va anclado aparte, en can-ability.' },
```

### 6.2 · Añadir los dos temas que sostienen las aperturas y el cierre

```ts
  { slug: 'wh-questions', level: 'a1', title: 'Preguntas con WH en inglés A1',
    rationale: 'Las preguntas abiertas que el escenario exige por criterio: "What are the keys for, doña Amparo?" y "Which paper is that, and who…?" de él, "And what can you…?" de ella. Las tres son la forma que el tema enseña: WH + is/are/can + sujeto.' },
  { slug: 'prepositions-time', level: 'a1', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Cuatro exponentes son huecos de at y on, y el renglón WHAT CHANGES se escribe con ellos: "I have to leave Matías at the daycare at…", "The road work started on…", "Then I pick up her two boys on…", "I need… mornings on…". El tema enseña at + hora y on + día o fecha.' },
```

**Aviso al que pegue:** la versión de este `rationale` que propuso `fase9-nivel-5.md` §5 abría
citando `What happened this morning?`. **No se puede citar ahí.** Es pregunta de sujeto y va sin
auxiliar, y el tema `wh-questions` dice tres veces lo contrario —`'NUNCA: "Where you live?" o
"What you do?" — siempre necesita auxiliar'`—. Sería el mismo defecto por el que se quitó
`past-simple-questions`, reintroducido en el slug de al lado. Esa forma ya está anclada donde le
toca: `happened` es pasado regular, y `past-simple-regular` ya está en la lista.

### 6.3 · Añadir el tercero, que fase 9 dejó como opcional y no lo es

```ts
  { slug: 'present-simple-questions', level: 'a1', title: 'Present simple interrogativo en inglés A1',
    rationale: 'La mitad que Camilo pregunta del punto 3 del cierre: "And what does this cost…?" — Wh- + does + sujeto + verbo base, la fila literal del tema. Sin él, el único exponente de la ficha con do-support se queda sin anclaje.' },
```

La lista queda en **13**. Las otras fichas del set van de 10 a 13, así que no se sale del rango.

### 6.4 · Lo que se usa, es A2, y **no** hay que anclar

No inventar slugs para esto. Son huecos del registro, no defectos de la ficha:

- **Pronombres indefinidos** (`nobody`, `nothing`, `somebody`, `none of`): `quantifiers` (a2) no
  los lleva —comprobado por búsqueda—, ni hay tema propio en A1. Sostienen `Nobody pays me for…`,
  `nobody guesses`, `None of that is in your hands`. Son A2 de manual; el registro es el que no
  los tiene. **Nota para el equipo de gramática, no para la ficha.**
- **Relativos con `where` y `when`** (`the big room where the store keeps the boxes`, `hours when
  somebody teaches you the job`): `relative-clauses-a2` cubre `who/which/that` y la omisión del
  relativo de objeto, no los adverbios relativos. Están en las glosas de vocabulario, donde
  cualquier alternativa es peor. **No tocar.**
- **`from` + fecha de comienzo** (`I'll start at…, from…`): `prepositions-time` enseña in/on/at.
  El exponente se queda; el enlace cubre la mitad anclada.
- **Relativo de objeto omitido**: sí está anclado (`relative-clauses-a2`, outcome 4) y sostiene
  cuatro líneas de prosa y el criterio 6 de B. **No está citado y no hace falta citarlo**: la
  lista ancla exponentes, y ningún exponente lleva relativa.

---

## 7 · Datos duros — todos decibles en A2, sin cambios

Reverificado contra `telling-time` (a1), que enseña `past` para :01-:30 y `to` para :31-:59, más
`quarter past` / `quarter to` / `half past`:

`6:40` = *twenty to seven* · `5:50` = *ten to six* · `6:45` = *a quarter to seven* · `6:50` =
*ten to seven* · `6:55` = *five to seven* · `7:10` = *ten past seven* · `7:15` = *a quarter past
seven* · `7:35` = *twenty-five to eight*. Las ocho caen dentro de lo que el tema enseña
explícitamente. `80,000 pesos`, `6:30 to 8:30`, `8:00 to 12:00`, `twenty-five minutes more`,
`forty children`: dentro de nivel. Fechas (`August 1`, `August 3`, `August 17`, `September 14`) con
`on`, que es el tema que §6.2 añade. **Ningún dato hay que cambiarlo, y ninguno obliga a subir de
nivel.**

---

## 8 · Los actos, y si se pueden hacer con la ficha más la caja

`disculparse` y `conceder-con-condicion` están los dos en la fila A2 de §4 ✔.

Lo que la ruta mínima **produce** además: pedir un favor ✔, dar una razón ✔, proponer alternativa
✔, pedir aclaración ✔, quejarse con educación ✔. **Los cinco son de la fila A2.** La cadena que
fase 9 midió como B1 —contraoferta → precio → tercera puerta → **resumen leído en voz alta**— ya
no está: el resumen, la pregunta extra (`And who else pays for this?`) y el espejo doble salieron
en la pasada quirúrgica. Lo que queda es concesión condicionada con una alternativa, que es A2.

**Cubierto por la caja, y hay que decir cuál porque es lo que evita el B1:**

- **Bloque 6** es el que sostiene el criterio 4 de A (decir que no al sábado sin dar la razón).
  Sin él, cerrar esa puerta exige rechazo indirecto, que §4 pone en B1. Con `I just can't do that
  day.` / `It's personal.` es A2 y se acabó. **Es la pieza más importante de la caja en este
  escenario.**
- **Bloque 7** `[grants]` cubre las tres cosas que Amparo no puede dar (`I'm afraid I can't.`,
  `I want to help, but…`).
- **Bloques 3 y 4** cubren el reparto de jerga: cinco palabras de ella no están en la pantalla de
  él, y la ficha ya lo dice en `Your toolkit`.
- **Bloque 8** es lo que evita que la pausa se llene en español, que es donde la simulación midió
  las fugas.

**Un punto al filo, y no es de lengua:** Amparo apila **dos** condiciones (el renglón *y* dos
mañanas de capacitación) y además le pone precio a la segunda. §4 autoriza «conceder poniendo una
condición **simple**». Cada movimiento por separado es A2 y cada uno tiene su exponente
(`granting it`, `naming your price`), así que **no es una infracción de nivel**; es lo que empuja
la pareja al techo de la banda. Se resuelve con el recorte pendiente de criterios, no bajando el
escenario.

**El hueco conocido de la caja** —no hay bloque «proponer una salida»— sigue tapado dentro de la
ficha con `What if we…?` / `Maybe we can…`. Ya está registrado como hallazgo no aplicado y no se
reabre aquí.

---

## 9 · Efecto en el presupuesto

| ficha | hoy | después de aplicar | techo |
|---|---|---|---|
| ROLE A | 447 | **447** (448 si se conserva `August` en H4) | 450 |
| ROLE B | 445 | **445** (H1 +1, H2 −1) | 450 |

H3 y H7 viven en tabla y en la carta: el contador no las ve. H6 y H5 son de coste cero. Las
variedades son palabra por palabra.

**Y la regla de la casa, que esta ficha ha roto tres rondas seguidas:** vuélvase a correr
`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs` **después** de aplicar y escríbase lo
que imprima, no lo estimado en esta tabla.

---

## 10 · Devolución

Todo va a `habla-fichas-de-rol`. **Aquí no se ha editado la ficha.**

**Bloqueantes (2):** H1 l. 118 · H2 l. 123 — las dos son estructuras sin tema en el registro.
**Menores (5):** H3 l. 150 · H4 l. 30 · H5 l. 112 · H6 l. 100 · H7 l. 201.
**Al filo, no propuesto (1):** H8 l. 126.
**Declaración (1):** H9 l. 19.
**Variedad (2):** V1 l. 38 · V2 l. 28 y 112. Más `delivery note`, que es de conjunto.
**Anclajes:** tres slugs entran, media frase de `first-conditional` sale, y el `rationale` de
`wh-questions` **no** puede citar `What happened this morning?`.

**La cuenta pendiente queda saldada: `— or why it costs you nothing.` es A2 y se queda.** Lo que
no se salda solo es el cruce que la produjo: en esta ficha ha ocurrido cuatro veces, y tres de
las cuatro fueron un arreglo de calcabilidad metiendo lengua de B1. Eso no se arregla en la
ficha; se arregla haciendo que las dos pasadas se lean la una a la otra antes de commitear.
