# Fase 13 · Nivel — escenario 1 `the-bike-in-the-parking-lot`

Recalibración de **A2** sobre el archivo tal como está en disco el 22 ago 2026, commit `ed220acf`.
Motivo: la pasada de calcabilidad de hoy fundió dos filas de exponentes por rol, renombró
`opening`→`greeting` en B, quitó `later:` de una forma y recortó prosa. Ninguna forma desapareció,
pero el reparto cambió.

**Prosa viva** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, techo 450):
**ROLE A 446 · ROLE B 442**. Aire: **A 4 · B 8**. Todos los arreglos de este informe caben dentro,
y la mayoría **devuelve** palabras.

**No se editó la ficha.** Aquí se nombra el cambio; lo aplica `habla-fichas-de-rol`.

---

## Veredicto

# A2 con cambios

El escenario **es** de A2 y lo es por diseño, no por suerte: los dos actos declarados están en la
fila A2 de §4, el «ninguno de los dos regatea» mantiene fuera `negociar` (B1), y el número de B se
dice como dato (`your number as a fact, not an offer`) para no convertirse en `poner-limite` (B1).
La ruta mínima se escribe entera con lengua de A2 —está abajo, turno a turno—, así que la prueba
que decide sale bien.

Lo que impide firmarlo hoy son **tres defectos de nivel duros**, y los tres son de una pasada de
calcabilidad, no del diseño: un `would` hipotético que el registro A2 no ancla en ningún sitio, un
pasado que perdió su marca temporal y quedó ambiguo, y una palabra de B1 (`pity`) que entró hoy
mismo al fundir dos notas. Los tres se arreglan con **cero o menos palabras**.

---

## 1. La ruta mínima, en A2 y entera

La prueba que de verdad decide. Arranca B, 8 turnos por rol, se cumplen las dos restricciones duras
(la condición pronunciada en los dos lados) y se llega al cierre de cuatro datos:

| # | quién | línea | de dónde sale |
|---|---|---|---|
| 1 | B | *Good morning — thanks for the message. Is the bike here?* | tronco `greeting` + `verb-to-be` A1 |
| 2 | A | *Hi — are you here for the bike? Yes, it's here.* | tronco `opening` + `verb-to-be` A1 |
| 3 | B | *The rear tire is worn out. A new tire and a new seat — that's about seventy thousand.* | tronco `the bike` |
| 4 | A | *I paid ninety-five thousand for it last month, and I have the receipt. With the new gears, I can't take less than three hundred ninety thousand.* | tronco `the price` (**ver hallazgo 5: el tronco de la ficha dice `go under`**) |
| 5 | B | *That's more than I can pay. I have three hundred fifty thousand in cash, right now.* | troncos `saying no` + `money` |
| 6 | A | *If you take the old gear set, I can do three hundred forty thousand.* | `first-conditional` A2 — **el puente del escenario** |
| 7 | B | *Does the lock come with it? Then I can pay today.* / tras la carta: *Can you keep it for me until six?* | troncos `moving the deal` · `if it can't leave now` |
| 8 | A | *Not in the ad — I can include the lock and the lights. The shop closes at one. I'll take it there before one, and you can pick it up at three.* | troncos `the parts` + `the clock` (**el `I'll` no lo da ninguna fila: hallazgo 4**) |

La ruta se escribe. Dos cosas que la ruta enseña y que no se ven leyendo la tabla:

- **Ningún turno necesita una estructura por encima de A2.** El condicional del turno 6 es el techo
  del escenario y es exactamente lo que §4 autoriza («conceder poniendo una condición simple»).
- **Dos piezas de la ruta no están ancladas en la ficha**: el `I'll` del turno 8 (hallazgo 4) y los
  numerales de seis cifras de los turnos 4-6 (hallazgo 12, que no es de esta ficha).

---

## 2. Forma → tema del registro

Leído de `src/data/grammar/registry.ts` → `src/data/grammar/ingles/{a1,a2}`.

> **Aviso sobre el criterio del encargo.** «Slugs con sufijo `-a2`» **no** identifica los temas de
> A2: solo 6 de los 21 lo llevan (`connectors-a2`, `prepositions-movement-a2`, `past-continuous-a2`,
> `present-continuous-future-a2`, `relative-clauses-a2`, `used-to-a2`). Los otros 15 van sin sufijo
> (`first-conditional`, `comparatives`, `quantifiers`, `have-to-must`, `will-future`,
> `past-simple-*`…) y hay homónimos entre niveles. El nivel se lee de la carpeta, nunca del slug —
> que es justo por lo que la ficha añadió el campo `level` (hallazgo 3 de fase 7). Un lector que
> filtre por sufijo se deja fuera el 71 % de A2.

### ROLE A — 8 filas, 13 formas

| forma | tema | nivel | por qué |
|---|---|---|---|
| `How are you going to …?` | `going-to` + `wh-questions` | a1 | el tema modela `What are you going to do?`; aquí solo cambia el WH |
| `Is that still …?` | `verb-to-be` | a1 | interrogativa de *to be* + `still` |
| `I have a reason.` | `present-simple-affirmative` | a1 | — |
| `That's not important right now.` | `verb-to-be` | a1 | negativa de *to be* contraída |
| `Cash, or part by …?` | **sin ancla** | — | fragmento sin verbo; no es de nivel superior, pero ningún tema lo sostiene (hallazgo 6) |
| `If you …, I can …` | `first-conditional` (+ `can-ability`) | a2 / a1 | el `if` + presente lo da el tema; **el `can` de la apódosis no** (hallazgo 1) |
| `Hi — are you here for …?` | `verb-to-be` | a1 | — |
| `The shop closes at …` | `present-simple-affirmative` + `telling-time` | a1 | `closes at one` |
| `If it doesn't go today, I …` | `first-conditional` (+ `have-to-must`) | a2 | la cola se cierra sola con `I'll have to…` |
| `I can put the old gears …` | `can-ability` | a1 | frasal con nombre en medio, no pronombre: permitido |
| `Not in the ad — I can include …` | `can-ability` | a1 | — |
| `I paid … for it, and I have the …` | `past-simple-irregular` + `connectors-a2` | a2 | **`paid` es irregular**, no regular (hallazgo 8) |
| `With the new gears, I can't go under …` | `can-ability` + **`under` sin ancla** | a1 / — | `under` figurado ante una cifra; `prepositions-place` A1 solo lo enseña físico (hallazgo 5) |

### ROLE B — 8 filas, 15 formas

| forma | tema | nivel | por qué |
|---|---|---|---|
| `Why are you …?` | `present-continuous` + `wh-questions` | a1 | `Why` está en la prosa del tema y se usa en `connectors-a2` (*Why are you late?*) aunque no en sus *outcomes* |
| `What did you change …?` | `past-simple-questions` | a2 | pregunta directa, no incrustada ✓ |
| `I have a reason.` · `That's not important right now.` | como en A | a1 | duplicadas de la caja, bloque 6 (deuda declarada) |
| `Good morning — thanks for …` | `possessive-adjectives` / caja bloque 2 | a1 | se cierra con nombre (`thanks for your time`), no con gerundio |
| `Can you keep it for me until …?` | `can-ability` (+ `telling-time` para `until 6:00`) | a1 | `until` no lo enseña `prepositions-time` (solo in/on/at); aparece en el texto de `telling-time` (*I study at home until 10:00*) |
| `I have … in cash, right …` | `present-simple-affirmative` | a1 | — |
| `The Nequi money is for …` | `verb-to-be` | a1 | — |
| `Does the lock come …?` | `present-simple-questions` | a1 | **única interrogativa con `do`-support del presente en las dos fichas** |
| `If you …, I can …` | `first-conditional` (+ `can-ability`) | a2 / a1 | igual que en A |
| `Maybe we can …` | `can-ability` | a1 | — |
| `That's more than I can …` | `comparatives` | a2 | **anclada de verdad**: el tema modela `than` + cláusula (*than I expected*, *than I was in school*). La nota de la ficha que dice lo contrario está caducada (hallazgo 9) |
| `I hear you, but that's not going to …` | `connectors-a2` + `going-to` | a2 / a1 | `I hear you` = idiom, transparente solo si se sabe (al filo, no contado) |
| `The rear tire is …` | `verb-to-be` + `adjectives-basic` | a1 | — |
| `A new tire and a new seat — that's about …` | `verb-to-be` | a1 | `about` + cifra no lo cubre `quantifiers` |

**Ninguna forma de las 28 está por encima de A2.** Dos no tienen tema que las sostenga (`Cash, or
part by …?` y el `under` de `go under`), y una tiene el ancla partida (`If you …, I can …`).

---

## 3. Los actos, contra §4

| acto | ¿existe en A2? | cómo se resuelve aquí |
|---|---|---|
| `conceder-con-condicion` | **Sí, literal.** §4 A2: «conceder poniendo una condición simple» | `If you …, I can …`, en los dos roles, obligado por restricción y por criterio de logro |
| `rechazar` | **Sí.** A1 ya trae «aceptar o rechazar de frente»; la caja A2 (bloque 7) trae el no indirecto | A lo hace con el bloque 7 de la caja; B, que **no tiene** el bloque 7, lo hace con sus dos formas propias. Coherente |
| `negociar` (B1) | **No, y el escenario lo evita a propósito** | «Ninguno de los dos regatea»: un número fijo cada uno y una segunda variable. El puente no es el precio, es qué entra en el trato |
| `poner-limite` (B1) | **No, y también se evita** | el tope de B se dice como dato (`your number as a fact, not an offer`), no como límite impuesto |
| `insistir` (B1) | **No se exige** | el desbloqueo llega en un turno, con la condición; no hay que repetir la postura |
| **resumir el acuerdo** (B1) | **Al filo, y hoy pasa** | la pantalla de cierre pide decir el trato entero. Eso es §4-B1… **salvo porque los cuatro huecos vienen nombrados**. Es recitar una lista, no sintetizar. Sigue siendo A2 **mientras los cuatro rótulos sigan ahí**: si alguien los comprime a «di el trato», el escenario se vuelve B1 sin tocar una sola forma |

Lo que §4 prohíbe en A2 —ironía, concesión larga («aunque… lo cierto es que…»), discurso indirecto
extenso— **no aparece** en ninguna de las dos pantallas.

---

## 4. Hallazgos, con arreglo y precio

Precio medido con el tokenizador del contador canónico (partir por espacios). Negativo = devuelve
aire. **Aire disponible: A 4 · B 8.**

### Graves

**1 · `would` hipotético, sin ancla en A2** — ROLE A, línea 54.
> `You would sell it for 330,000 with the old gears back on, and lose nothing.`

Es el único `would` de las dos fichas. El registro A2 de inglés **no tiene** segundo condicional ni
tema de `would`; la caja lo prohíbe expresamente (`would rather` / `would prefer`), y §11 declara que
el inglés de la ficha es «presente y pasado simple». Además cae en la línea más cara de todas: el
dato oculto, que es lo que el estudiante tiene que **entender bien para no soltarlo**.
Entró en la pasada quirúrgica de fase 9 (fila 436 del propio changelog) para hacerla decible.
**Arreglo:** `With the old gears back on, 330,000 is enough, and you lose nothing.` — presente de
*to be* + `enough`. **Coste: −2 en A.**

**2 · Un pasado que hoy perdió su única marca** — ROLE A, línea 44.
> `You put it on Marketplace, and you carried it down four floors four times.`

`put` es invariable: sin adverbio temporal, `You put it on Marketplace` se lee tan bien en presente
como en pasado, y la mitad siguiente (`you carried`) sí es pasado inequívoco. Las dos mitades de una
misma oración quedan en tiempos aparentes distintos. **Lo produjo la pasada de hoy** (cambio 7:
`You put it on Marketplace three weeks ago` → `You put it on Marketplace`, para pagar
`· use it or don't ·`). Y el propio *rationale* de `past-simple-regular` de esta ficha insiste en
que la marca de pasado es `ago`.
**Arreglo:** `You posted it on Marketplace,` — verbo regular, pasado inequívoco, y **es la palabra
que ya usa la propia ficha** en la fila `Ad price` (*posted three weeks ago*), así que no se
reintroduce el dato que la pasada quiso quitar. **Coste: 0.**

**3 · `pity` — vocabulario de B1, entrado hoy** — ROLE A, exponentes, nota de `the clock`.
> `a problem for both of you · say why today, don't ask for pity`

`pity` no está en A2. Es celda leída, no dicha, pero es la instrucción que dice cómo usar la mitad
más delicada del rol de A. **Lo produjo la pasada de hoy** (cambio 5, al fundir `the clock` y
`why today`): antes la nota decía `the clock is a problem for both of you. Say it`.
**Arreglo:** `· say why today, not why you need it`. **Coste: 0** (celda de tabla, no cuenta prosa).

**4 · El cierre exige un compromiso futuro y ningún tronco lo da** — las dos tablas.
La pantalla de cierre obliga a decir *quién la mueve, a qué hora* y *quién arregla la llanta*. Eso se
dice con `I'll …` o `I'm going to …`. Repaso de las 28 formas: **ninguna** lleva `will`, y el único
`going to` productivo es el de A (`How are you going to …?`, que pregunta, no compromete); el de B
está dentro de una negativa (`that's not going to …`). `will-future` figura en `grammarReferences` y
solo se sostiene en dos frases de **narración** (*You will not sell it*, *They will say*), que el
estudiante lee y no dice. Es la única pieza de la ruta mínima que el andamiaje no cubre.
**Arreglo:** un tronco en cada tabla, **dentro de filas que ya existen** (siguen 8 filas = 8 turnos):
`the clock` de A recibe `I'll take it there before …`; `if it can't leave now` de B recibe
`I'll pick it up at …`. Es lo que fase 9 ya pedía (su punto 2) y quedó sin aplicar por ser una
pasada quirúrgica. **Coste: 0** (celdas de tabla).

### Medios

**5 · `go under` figurado, sin ancla** — ROLE A, exponentes, `the price`.
> `With the new gears, I can't go under …`

`under` ante una cifra con el sentido de «menos de» es idiomático; `prepositions-place` (A1) lo
enseña físico y `comparatives` (A2) da la forma llana. Un A2 lo lee y no lo produce.
**Arreglo:** `With the new gears, I can't take less than …` → ancla directa en `comparatives` A2, que
ya está en la lista. **Coste: 0.**

**6 · `Cash, or part by …?` no tiene con qué completarse** — ROLE A, exponentes, `money`.
Fragmento sin verbo: no está por encima de nivel, pero ningún tema del registro lo sostiene y la
cola (`part by …`) obliga a un cuantificador que `quantifiers` no enseña (`part of`).
**Arreglo:** `Do you have it in cash, or …?` → `present-simple-questions` A1. **Coste: 0.**

**7 · Gerundio como sujeto, y la oración más larga de la ficha** — ROLE B, línea 128.
> `That money moves only when you get something more in the deal, and you say the condition out loud, in the same turn — moving the bike counts.`

Dos cosas. (a) `moving the bike counts` es gerundio en función de sujeto: A2 solo tiene `like + -ing`
(`like-ing`, A1); el sujeto gerundio es B1. (b) **28 palabras**, la oración más larga de las dos
fichas (media: A 12,2 · B 12,1), y §11 pide «frases cortas». La longitud la produjo **la pasada de
hoy** (cambio 6: el punto pasó a raya, fundiendo 23+4 en 28).
**Arreglo:** `That money moves only when you get something more in the deal — transport counts too.
Say the condition out loud, in the same turn.` — `transport` ya es palabra de esta ficha (nota de
`asking about theirs` en A). **Coste: −3 en B.**

**8 · El *rationale* de `past-simple-regular` prueba el tema con dos verbos irregulares** — línea 253.
> *«"I paid 95,000 last month", "I bought it sixteen months ago"»*

`pay→paid` y `buy→bought` son irregulares. El tema queda sin una sola prueba propia, y a la vez
`past-simple-irregular` —que sostiene `put`, `told`, `heard`, `wrote`, `came`, `left`, `said`,
`gave`, `paid`— **no está en la lista**. Fase 9 lo señaló y sigue en disco.
**Arreglo:** citar `carried`, `looked`, `asked`, `posted`, y **añadir `past-simple-irregular`**.
**Coste: 0** (`grammarReferences` no es prosa).

**9 · Dos *rationales* más describen algo que la ficha ya no tiene.**
- `quantifiers` cita `"I only have 350,000 in cash"`, `"a bit more"`, `"everything today"`: el tema
  enseña *much / many / a lot of / some / any / few / little*, y **ninguna de las tres** está en él;
  además `a bit more` y `everything today` ya no aparecen en la ficha. El ancla real y única es
  `how much in cash and how much by Nequi`, en la pantalla de cierre, que es el `How much…?` del
  propio tema. **El tema se queda; el *rationale* se reescribe.**
- `comparatives` dice que `that's more than I can pay` «va como bloque memorizado» porque el tema no
  cubre la comparativa de cláusula. **Es falso a día de hoy**: el tema modela `than` + cláusula
  (*than I expected*, *than I was two years ago*, *than I was in school*). El disclaimer sobra y, tal
  como está, desanima de usar el ancla que sí existe.
- `prepositions-movement-a2` cita `"take it to the shop"` y `"ride it to Floridablanca"`: el tema
  enseña *into, out of, through, along, past* — no `to`. El ancla viva es `get the bike out` /
  `Getting it out of here` / `it goes into the truck`.
**Coste: 0.**

**10 · Cinco condicionales de la prosa contradicen a su propio tema ancla.** `first-conditional`
enseña *if + presente → **will***, y marca con ❌ el resultado en presente. La prosa hace justo eso:
- A, l. 54: `If you say that early, you lose the deal.` → `…you'll lose the deal.` **0**
- A, l. 59 (encabezado `If you walk away with nothing`): `You carry it up four floors again. You lose
  another Saturday…` → `You'll carry… You'll lose…` **0**
- B, l. 136 (mismo encabezado): `The only bike … stays here` → `…will stay here` **+1**
Además de bajar el nivel, es lo único que le da al estudiante un `will` **leído en su propia ficha**,
que es donde hoy falta (hallazgo 4). **Coste: 0 en A · +1 en B.**

### Menores (nombrados, con precio; ninguno bloquea)

**11 · Tres compresiones que dejaron estructura por encima de A2 en la prosa de B.**
- `You already gave the Nequi money a job:` — ditransitivo + idiom («darle un trabajo al dinero»),
  y en pasado. → `The Nequi money already has a job:` — **−1**, y encaja con su propio exponente
  (`The Nequi money is for …`).
- `You start your three weeks of looking again.` — `weeks of looking`, gerundio nominalizado tras
  preposición, sin ancla en A2. → `You'll look for another three weeks.` — **−2** (y aplica el 10).
- `and you keep taking the bus every day.` — `keep + -ing` aspectual, B1. → `and you still take the
  bus every day.` — **0**.

**12 · `before you did` / `before they did`: elipsis con `did` proverbo** — A l. 112, B l. 191.
Sustitución auxiliar (*did* = *named the rear tire*). Es B1 de lectura, y entró en la pasada de
fase 9 como mejora de decibilidad.
**Arreglo:** `They named the rear tire first.` / `You named the rear tire first.` — mismo criterio de
logro, sin elipsis. **Coste: −2 en A · −2 en B.**

**13 · Sujeto abstracto en la restricción que sostiene el acto** — A, l. 49.
`A smaller number needs a condition` — los números no necesitan cosas; es metáfora, en la línea que
define la única salida del escenario. **Arreglo:** `If you say a smaller number, say the condition
out loud, in the same turn.` — encima queda anclada en `first-conditional` + imperativo. **−2 en A.**

**14 · `with the new gears on` ×2 (A, l. 46 y 49).** `with` + SN + partícula con valor condicional.
Es chunk frecuente y transparente; **no lo cuento como fallo**, pero si se quiere ancla explícita:
`if the new gears stay on` → `first-conditional`. **+1 cada una (+2 en A).** Opcional.

**15 · Al filo, señalados y NO contados** (ninguno exige cambio):
`carried it down` (frasal con pronombre en medio — la caja declara ese patrón fuera de A2, aunque
aquí `down` es direccional literal); `no buyer has asked` (present perfect: **sí** es tema A2
—`present-perfect-basic`— pero está fuera del «presente y pasado simple» que declara §11, y el tema
no está en la lista); `Without it, …` con valor condicional; `everything else you agree on` y
`used so much it doesn't work well` en las glosas (relativo con preposición colgada, y cláusula de
resultado sin `that`); `the same speech` por «la misma queja»; `I hear you`; `a condition said out
loud` en la nota fundida de B (participio pasivo reducido, y la caja prohíbe la pasiva);
`I have … in cash, right …` (el tronco corta antes de `now`, y `right` sin cola no orienta).

---

## 5. ¿Algún recorte de hoy subió el nivel? Sí: 3 de los 7 cambios

Es la pregunta del encargo y tiene respuesta concreta.

| cambio de hoy | efecto sobre el nivel |
|---|---|
| 1 · fusión `the clock` + `why today` en A | **neutro en forma, negativo en léxico**: la nota fundida introduce `pity` (hallazgo 3) |
| 2 · fusión `asking for more` + `moving the deal` en B | **neutro**. La nota resultante arrastra `a condition said out loud` (participio reducido), al filo |
| 3 · `opening` → `greeting` en B | **neutro de nivel.** Deja una asimetría: la misma función se llama `opening` en A y `greeting` en B. No es de nivel, es de coherencia entre las dos pantallas del mismo escenario |
| 4 · fuera `later:` de `asking about theirs` | **neutro.** `Is that still …?` se cierra con adjetivo o adverbio, todo A2 |
| 5 · nota nueva de `the clock` | **sube**: `pity` |
| 6 · punto → raya en `You can't` 2 de B | **sube**: crea la oración de 28 palabras, la más larga de la ficha, y §11 pide frases cortas |
| 7 · `You put it on Marketplace three weeks ago` → `…on Marketplace` | **sube**: deja un verbo invariable sin marca de pasado (hallazgo 2). Es el caso de libro de «comprimir encarece la lectura» |

Ninguno de los tres es caro de deshacer: **0, −3 y 0 palabras**.

---

## 6. Inglés americano

**La ficha está limpia.** Barrido de marcadores británicos sobre las dos pantallas, la carta y las
dos pantallas compartidas: cero coincidencias. Positivos de americano: `tire` (no *tyre*), `parking
lot`, `truck` (no *lorry*), `elevator` (no *lift*), fecha `Saturday, September 5` en orden
mes-día, horas con `a.m.` / `p.m.`, miles con coma.

Dos avisos que **no son de este archivo**:

1. **La caja común tiene un britanismo**: `caja-de-herramientas-a2.md`, bloque 1 —
   `you called them, not the other way round` → americano `the other way around`. Cuesta 0 (celda de
   tabla) y sirve a los ocho escenarios.
2. **Los numerales de seis cifras se dicen distinto en las dos variedades** (*three hundred fifty
   thousand* US / *three hundred **and** fifty thousand* UK) y **el registro de inglés no tiene
   ningún tema de números**, ni en A1 ni en A2. La versión británica aparece escrita en la prosa
   documental de este mismo archivo (l. 361, cita de una simulación vieja). No es defecto de la
   ficha; es un hueco del registro que el set entero pisa cada vez que alguien dice un precio.

---

## 7. `grammarReferences` — lista para pegar

Se conservan los 13 y se añaden **8**. Ninguno se cae. Los que se quedan con el *rationale*
reescrito llevan la marca 🔁; los nuevos, ➕.

```ts
grammarReferences: [
  { slug: 'first-conditional', level: 'a2', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion vive aquí y es lo más alto del escenario: "If you take the old gear set, I can do 340,000". El tema ancla la prótasis (if + presente simple, nunca will). Ojo: el can de la apódosis NO lo modela este tema —solo autoriza can/must/have to dentro de la cláusula if—, lo sostiene can-ability (a1). También cubre "If it doesn\'t go today, I\'ll…" y los tres condicionales de la prosa, que deben llevar will en el resultado como pide el propio tema.' }, // 🔁
  { slug: 'comparatives', level: 'a2', title: 'Comparativos en Inglés A2',
    rationale: 'El precio se rechaza comparando, no regateando: "That\'s more than I can pay today". El tema SÍ modela than + cláusula ("than I expected", "than I was in school"), así que el tronco está anclado entero y el estudiante puede cerrarlo él. Sostiene además "less than 390,000", "350,000 or less" y "I can\'t take less than…".' }, // 🔁
  { slug: 'quantifiers', level: 'a2', title: 'Cuantificadores en Inglés A2',
    rationale: 'La pantalla de cierre obliga a repartir el pago: "how much in cash and how much by Nequi", que es el How much…? del propio tema con incontable. Es el ancla viva del escenario; only, everything y all of the no los enseña este tema y no se citan como si lo hiciera.' }, // 🔁
  { slug: 'have-to-must', level: 'a2', title: 'Have to y Must en Inglés A2',
    rationale: 'La prisa de A es obligación externa, no capricho: "You have to get the bike out today", "you have to pay to move the bike". Y el toolkit de B usa la otra mitad del tema, la que distingue prohibición de innecesidad: "you don\'t have to know those words, you have to ask".' }, // 🔁
  { slug: 'will-future', level: 'a2', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El cierre exige comprometer la tarde: "I\'ll take it to the shop before one", "I\'ll pick it up at three". Hoy ningún exponente lo da: hay que añadir el tronco a la fila the clock (A) y a if it can\'t leave now (B), o el tema queda referenciado sin nada que lo sostenga en producción.' }, // 🔁
  { slug: 'past-simple-regular', level: 'a2', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La historia se cuenta en pasado simple con ago, nunca con since (since de duración es B1): "you carried it down four floors", "you looked for three weeks", "you posted it on Marketplace", "no buyer has asked". Nota: paid y bought son irregulares y no prueban este tema.' }, // 🔁
  { slug: 'past-simple-irregular', level: 'a2', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Es el tiempo con más presencia de las dos fichas y no estaba anclado: put, told, heard, wrote, came, left, said, gave, paid, bought. Y put es invariable: sin este tema el estudiante no tiene dónde comprobar que "You posted it on Marketplace" y "You put it on…" son la misma línea temporal.' }, // ➕
  { slug: 'past-simple-questions', level: 'a2', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La pregunta abierta obligatoria de B, la que hace salir lo que no está en el anuncio: "What did you change on it?". En directa, nunca incrustada.' },
  { slug: 'present-continuous-future-a2', level: 'a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'El dato de transporte que decide el desenlace de B es un presente continuo de futuro: "My brother-in-law is bringing his truck at six". Y la carta que lo tumba también: "I\'m going to Barrancabermeja". Sin este tema, la segunda variable del trato no está anclada en ninguna parte.' }, // ➕
  { slug: 'present-perfect-basic', level: 'a2', title: 'Present Perfect Básico en Inglés A2',
    rationale: 'Una línea del dato oculto de A lo usa y ninguna otra cosa lo ancla: "no buyer has asked". Es perfecto de resultado, no de duración (el de for/since queda fuera del nivel). Si se prefiere mantener la prosa en presente y pasado simple, como declara §11, la alternativa es reescribir esa línea y quitar esta referencia.' }, // ➕
  { slug: 'relative-clauses-a2', level: 'a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'El bloque de vocabulario entero está escrito en relativas —"the parts that press the wheel", "the person who works at the door of a building"— y la prosa usa la omisión del relativo objeto, que es el cuarto outcome del tema: "the size you need for the road bike you want next".' }, // ➕
  { slug: 'connectors-a2', level: 'a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'El dato que decide el trato se dice con but: "they work, but the two small gears are difficult to use". Y el segundo no de B se construye igual: "I hear you, but that\'s not going to work". La razón de A va con because: "you want 390,000 because the road bike costs 750,000".' }, // 🔁
  { slug: 'prepositions-movement-a2', level: 'a2', title: 'Preposiciones de movimiento en Inglés A2: into, out of, past, through, along',
    rationale: 'El transporte es la segunda variable del trato y fue donde las parejas flojas se pasaron al español: "get the bike out today", "getting it out of here", "it goes into the truck". Son into y out of, que son los dos primeros outcomes del tema.' }, // 🔁
  { slug: 'can-ability', level: 'a1', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene siete de las 28 formas del escenario: "I can put the old gears back on", "I can include…", "I can\'t take less than…", "Maybe we can…", "Can you keep it for me until…?", el "…I can…" de los dos condicionales y el "than I can" de la comparativa. Sustituye a los Could I…? de cortesía, que el registro no ancla y la caja prohíbe.' }, // 🔁
  { slug: 'present-simple-affirmative', level: 'a1', title: 'Present simple afirmativo en inglés A1',
    rationale: 'Los datos que no cambian se dicen en presente: "The shop closes at one", "I have 350,000 in cash", "I have a reason". Es la mitad de la prosa de las dos fichas y no estaba anclado.' }, // ➕
  { slug: 'present-simple-questions', level: 'a1', title: 'Present simple interrogativo en inglés A1',
    rationale: 'La única pregunta del escenario con do-support en presente, y es la que abre la vía de salida de B: "Does the lock come with it?". Sin ella, B solo sabe preguntar con to be y con can.' }, // ➕
  { slug: 'verb-to-be', level: 'a1', title: 'Verb to be en inglés A1',
    rationale: 'Cinco de las 28 formas son to be y son las que abren y las que describen: "Hi — are you here for…?", "Is that still…?", "The rear tire is…", "The Nequi money is for…", "That\'s not important right now".' }, // ➕
  { slug: 'wh-questions', level: 'a1', title: 'Preguntas con WH en inglés A1',
    rationale: 'Las dos preguntas abiertas obligatorias empiezan aquí (How…?, Why…?, What…?) y la pantalla de cierre pide además la distancia: "how far", que es uno de los outcomes del tema.' }, // ➕
  { slug: 'telling-time', level: 'a1', title: 'Decir la hora en inglés A1',
    rationale: 'El cierre exige a qué hora se mueve la bicicleta, y el taller cierra a la una: sin la hora no hay cierre. Cubre también el until del "Can you keep it for me until six?", que prepositions-time no enseña.' }, // 🔁
  { slug: 'going-to', level: 'a1', title: 'Going to en inglés A1',
    rationale: 'La pregunta abierta obligatoria de A es un going to: "How are you going to take it home?" — el tema modela "What are you going to do?" y aquí solo cambia el WH. Y el segundo no de B usa su negativa: "that\'s not going to work".' }, // 🔁
  { slug: 'present-continuous', level: 'a1', title: 'Present Continuous en Inglés A1',
    rationale: 'La pregunta abierta obligatoria de B es un presente continuo: "Why are you selling it?". Es la que hace salir lo que no está en el anuncio.' },
]
```

**Nota de forma, sin cambio:** el campo `level` sigue siendo imprescindible —ahora son **siete** las
referencias de A1— y `getGrammarReferences` (`src/data/practica/writing-integrated.ts:1046`) sigue
sin tenerlo. Es deuda de `habla-integracion`, no de esta ficha.

---

## 8. Cuenta de palabras

| | ROLE A | ROLE B |
|---|---|---|
| hoy | 446 | 442 |
| aire | 4 | 8 |
| arreglos obligatorios (1, 2, 5, 6, 7, 11, 12, 13) | **−6** | **−8** |
| condicionales del hallazgo 10 | 0 | +1 |
| opcional del hallazgo 14 | +2 | — |
| **queda** | **440-442** | **435** |

Los arreglos de tabla, de nota y de `grammarReferences` (hallazgos 3, 4, 5, 6, 8, 9) **cuestan 0**:
el contador canónico no cuenta filas de tabla ni bloques de código. Ninguna pieza se quita: las 8
filas de exponentes por rol, las 10 entradas de vocabulario y las 10 filas de datos se quedan como
están, dentro de las bandas de §11.

---

## 9. Fuera de mi carril — se nombra y se pasa

No son de nivel; los vi al medir y los dejo señalados para quien corresponda.

1. **`if it can't leave now` es una etiqueta que nombra un momento**, no una función — §11 lo prohíbe
   expresamente («`the two questions before you leave`… las etiquetas nombran función, no posición»),
   y la propia acta de hoy lo confirma al justificarla: *«es el salvavidas de después de la carta»*.
   Es carril de `fase13-calcable`.
2. **`opening` (A) vs `greeting` (B)** para la misma función, en el mismo escenario.
3. **B tiene 15 formas en 8 filas y A tiene 13**: por filas las dos cumplen el 6-9 de §11, pero B
   ofrece casi dos jugadas escritas por turno.
4. **El changelog de este archivo ya no coincide con el disco.** La fila de la pasada de fase 9 dice
   que la línea 51 quedó en `You need the shop for that, before one`, y en disco pone
   `Take the gears off here. Your shop does that, and it closes at one.` Quien audite por el
   changelog audita otra ficha.
5. **El motor sigue diciendo 6 turnos por rol** (`fase4-escenarios-1-3.md` §1) donde la ficha dice 8.
   Ya está abierto al final del archivo; lo repito porque cambia el cómputo de §11 (filas ≤ turnos)
   y, si el motor gana, la ruta mínima de la sección 1 —que usa los 8— hay que volver a escribirla.
