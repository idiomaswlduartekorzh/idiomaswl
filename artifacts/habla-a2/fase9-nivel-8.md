# Fase 9 · Calibrador de nivel — escenario 8 `cancel-the-gym-i-am-leaving`

**Auditado:** `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md`, el texto de hoy
(el que iría a producción: con los arreglos del 21 de agosto y la pasada de reparto de género ya
aplicados, `B = Mauricio`). Los informes previos (`fase7-nivel-8.md`, `fase7-nivel-8-ronda2.md`,
`fase5-calibrador-8.md`) se leyeron solo para saber qué se dijo antes; nada se da por bueno ni por
malo desde ellos.

**Veredicto: CABE CON CAMBIOS.** Los tres actos declarados existen en el A2 de §4, **ninguno de los
20 exponentes de las dos tablas usa estructura prohibida**, el vocabulario está entero en nivel, los
doce anclajes existen slug a slug en el registro y la ruta mínima se escribe entera con lengua A2.
Lo que falla es **prosa que no se lee en A2** (doce líneas: una construcción resultativa, dos
condicionales sin `if`, tres elipsis que un A2 no reconstruye y dos verbos figurados), **un exponente
sin tema que lo sostenga** (`What will happen if…?`) y **un `rationale` que reclama del registro algo
que el registro no tiene**.

---

## 0. Bandas, tablas y prosa — medido

| Comprobación | Declarado | Medido | §4 / §11 | ✓ |
|---|---|---|---|---|
| Minutos | 8 | 8 en cabecera, ROLE A y ROLE B | A2 = 5-8 | ✓ |
| Turnos por rol | 8 | 8 en las tres declaraciones (16 globales) | A2 = 6-9 | ✓ |
| Unidad | «8 turns each · 8 minutes» | la misma fórmula literal en las dos fichas | §4 | ✓ |
| Prosa ROLE A | 445 | **445** (`prosa-canonica.mjs`, hoy) | ≤ 450 | ✓ |
| Prosa ROLE B | 444 | **444** (`prosa-canonica.mjs`, hoy) | ≤ 450 | ✓ |
| Datos A / B | 10 / 10 | 10 / 10 | ≤ 10 | ✓ |
| Vocabulario A / B | 10 / 10 | 10 / 10 | 8-10 | ✓ |
| Exponentes A / B | 6 / 7 filas (9 / 11 formas) | 6 / 7 filas | 6-9 filas | ✓ |
| Carta | `afterTurn: 3` global, a B | A,B,A → B la juega en el turno 4 | ventana 3-6 de §6 | ✓ |

Ninguna cifra de la cabecera es de las viejas: no hay 12 ni 17 en ningún sitio del archivo. Las dos
cifras de prosa que el propio archivo publica coinciden con las que da hoy el contador canónico.

## 1. El acto existe en el A2

§4 da al A2: pedir un favor, dar una razón, disculparse, **proponer alternativa**, quejarse con
educación, conceder poniendo una condición simple. La banda declara `pedir-favor` + `rechazar` +
`proponer-alternativa`, y los tres se sostienen:

- **`pedir-favor`** es literal (`Is there another way?`, `I can show you, but I can't…`).
- **`rechazar`** no es aquí el rechazo indirecto que §4 aún no concede: los tres noes de Mauricio
  son **frontales con puerta** —`I can't do that, but I can…`, `That's not enough — it doesn't
  say…`, `I'm afraid I can't.` (caja 7)—. Es «rechazar de frente» (ya A1) más «proponer
  alternativa» (A2) pegados por un `but`. No hay ironía, ni concesión larga, ni discurso indirecto.
- **`proponer-alternativa`** vive por fin en una fila (`There is another way, but…` ·
  `If you bring…, I can…`) y no solo en la etiqueta.

**No hay negociación**, y eso está protegido por diseño, no por suerte: la restricción 3 de Tatiana
le prohíbe pedir el dinero de vuelta y discutir el precio, así que no queda contrapartida que
intercambiar. Y el desenlace `sin-acuerdo` evita el acto de B1 que este escenario habría atraído.

**El punto que más cerca estuvo de subirlo de nivel, y por qué no sube.** El cierre pide a Tatiana
decir tres cosas «in her own words», y eso se parece a «resumir el acuerdo», que es B1. No lo es:
no hay acuerdo que resumir —el debrief lo dice en su punto 1—, y los tres puntos son **hechos
sueltos de una frase cada uno** (lo que él escribe / una vía y lo que pide / quién, dónde, a qué
hora), sostenidos por un exponente de comprobación literal (`So it's …, on the …?`). Eso es A2.

**Carga conceptual, no lingüística.** El escenario mueve cuatro trámites distintos —congelar,
ceder, abrir caso, radicar cambio— más una hora de corte y cobranzas. Es lo más alto que este set
le pide a un A2 en *contenido*, y aguanta solo porque los cuatro están glosados en el vocabulario
de Mauricio y porque la caja le asigna el bloque 4 `[jargon]`. No pido cambio: lo dejo anotado.

## 2. La ruta mínima — la prueba que decide

Escrita solo con la caja, las dos tablas de exponentes y las dos de datos. Llega a los tres puntos
del cierre en **5 turnos de A y 4 de B**, tres por debajo del techo de 8:

1. **A** — `Excuse me, do you have a minute?` I'm leaving the country. `I'm leaving on` August 30. I want to cancel my plan today.
2. **B** — `Good evening.` `Let me check that. One moment…` You signed on July 13. `I can't do that, but I can` open a case. Your plan has a 3-month minimum, to October 13.
3. **A** — `So I have to` pay two more months? `I don't want to pay for` a gym I can't use. `Is there another way?`
4. **B** *(carta en el turno 4)* — `There is another way, but` I need a paper with two dates. `If you bring` a paper with your date out and your date back, `I can` freeze the plan for 60 days.
5. **A** — `I can show you, but I can't` leave it. It's from the embassy. It doesn't say my return date. `What will happen if` the charge doesn't work on September 5?
6. **B** — Then collections calls you on the 12th. A transfer before the 12th stops it. Today I can open a case: `Can you sign here, next to` your name? `Write this down, please:` A-250825, August 25.
7. **A** — `Let me copy…` `So it's` A-250825, `on the` 25th? And the last day is Thursday at six?
8. **B** — Yes. `I know, and I'm sorry about` the wait. Édison is on the second floor, Wednesday, nine to five.
9. **A** — A-250825, August 25. `I know it's not your fault, but` this is my last week. `Thanks for your time.`

Cero present perfect de duración con *for/since*, cero `could` de cortesía, cero pasiva, cero
pregunta incrustada, cero modal + infinitivo perfecto, cero condicional hipotético, cero
`would rather` / `would prefer`. **La ruta existe: el escenario es A2.**

Un detalle que vale la pena decir porque es el que podía romperla: la elipsis de
`That's not enough — it doesn't say…` se completa **con un sintagma nominal** (`the date back`),
no con una interrogativa incrustada (`when she comes back`), y se completa así porque la fila
`Proof that works` de los datos de Mauricio ya nombra el objeto: *date out and date back*. La ficha
da la salida A2 antes de que el alumno tropiece con la B1.

## 3. LO QUE HAY QUE DECIR — exponente a exponente

**ROLE A (6 filas, 9 formas).** `Is there another way?` (there is/are interrogativo) ·
`What will happen if…?` (wh + will) · `So I have to…?` (have to) · `So it's …, on the …?`
(to be + preposición de tiempo) · `Let me copy…` (imperativo) · `I don't want to pay for…`
(presente negativo) · `I know it's not your fault, but…` (but) · `I can show you, but I can't…`
(can + but) · `I'm leaving on…` (presente continuo de futuro). **Todas en nivel.**

**ROLE B (7 filas, 11 formas).** `Can you sign here, next to…?` · `Has this person ever been a
member…?` (present perfect con *ever*, **no** de duración: el registro A2 trae
`Has she ever lived abroad?` casi calcada) · `Let me check that. One moment…` ·
`Write this down, please: …` · `There is another way, but…` · `If you bring…, I can…` ·
`I can't do that, but I can…` · `I have to be careful, because…` · `I need a paper that says…`
(relativa con *that*) · `That's not enough — it doesn't say…` · `I know, and I'm sorry about…`.
**Todas en nivel.**

El present perfect **se queda**: es el de *ever/never*, que el registro A2 enseña como tema propio
y que aquí hace un trabajo que nada más hace —preguntar por el historial de un tercero sin
presuponer quién es—. La regla que borraba todo present perfect no tiene nada que hacer aquí.

Y la caja: los bloques que las dos fichas señalan (1, 2, 3, 5, 6, 8 en A; 1, 2, 3, 4, 5, 7 en B)
están todos verificados en su propio encabezado contra las mismas estructuras prohibidas. Ninguna
ficha copia una fila de la caja.

**Una sola observación, y no es cambio:** `Write this down, please: …` es un phrasal separable con
el pronombre en medio, que la caja se prohíbe a sí misma. Se queda porque con `this` no hay otro
orden posible en inglés (`write down this` no existe), así que no hay elección que enseñar mal, y
porque es la única forma que tiene Mauricio de dictar el número que cierra el juego.

## 4. CAMBIOS — LO QUE HAY QUE LEER

Doce líneas. Ninguna es de estilo: hoy no se leen en A2. Van con el recambio exacto.

**N1 · GRAVE — construcción resultativa (pasiva encubierta)** · ROLE A, «You want», línea 38.
Sale: `You want the plan closed today, with no charge on September 5.`
Entra: `You want to end the plan today, with no charge on September 5.`
`want + objeto + participio` es la pasiva de resultado, prohibida en las fichas y ausente del
registro A2. Cuesta cero palabras.

**N2 · GRAVE — condicional sin `if` detrás de dos puntos** · ROLE A, dato oculto, línea 51.
Sale: `promised you out loud: you leave the country, they cancel it.`
Entra: `promised you out loud: if you leave the country, they cancel the plan.`
Es la promesa de Wilmer, o sea el motor emocional de la ficha, y hoy está escrita con la
yuxtaposición condicional del inglés hablado rápido. Un A2 la lee como dos hechos sin relación.

**N3 · GRAVE — elipsis que el lector no reconstruye** · ROLE B, restricción 2, línea 117.
Sale: `Today you can open a case, and she will hear the two words as one.`
Entra: `Today you can open a case. She will think a case is a cancellation.`
«The two words» no tiene antecedente en la línea: el lector tiene que adivinar cuáles son las dos
palabras y además que se confunden en la cabeza de ella. En L2 eso no se adivina. −1 palabra.

**N4 · GRAVE — elipsis que invierte quién hizo qué** · ROLE B, dato oculto, línea 123.
Sale: `Last month you got a written warning: a freeze with no proof, for helping too much.`
Entra: `Last month you gave a freeze with no proof. You got a written warning for helping too much.`
Tal como está, «a freeze with no proof» cuelga sin verbo y el A2 lo lee como una segunda cosa que
él *recibió*, no como lo que él *hizo*. Es el único dato que explica por qué Mauricio dice que no
con miedo. +2 palabras.

**N5 · GRAVE — relativa libre con `what`** · ROLE B, dato oculto, línea 124.
Sale: `Wilmer is gone because he promised three or four members what he could not give.`
Entra: `Wilmer promised three or four members a cancellation. He could not give it, and he is gone.`
`what` como relativa libre es B1. De paso el nuevo texto nombra la cosa prometida, que hoy queda
implícita y es justo la que Tatiana viene a pedir. +2 palabras.

**N6 · MEDIO — sujeto gerundio + verbo figurado** · ROLE A, cabecera, línea 33.
Sale: `Shouting buys nothing: he signs nothing.`
Entra: `If you shout, he signs nothing.`
Cuesta cero palabras y dice lo mismo sin pedir que el lector interprete «comprar» en abstracto.

**N7 · MEDIO — dos absolutos sin verbo apilados** · ROLE A, «Where you are», línea 36.
Sale: `You are at the front desk of a gym in Cabecera, straight from work, four people behind you.`
Entra: `You are at the front desk of a gym in Cabecera. You come straight from work.`
§11 pide oraciones **completas** en la prosa; `four people behind you` no lo es y además repite
literal la fila `Now` de su propia tabla de datos. −3 palabras.

**N8 · MEDIO — elipsis con `but` sobre relativa de contacto** · ROLE A, «Not about money», línea 40.
Sale: `The problem is not the 92,000 pesos, but two months of a gym you cannot use.`
Entra: `The problem is not the 92,000 pesos. You pay for two months, and you cannot go.`
Hay que reponer «the problem is» y encima resolver `a gym you cannot use` sin pronombre relativo.
Cuesta cero palabras. (Ojo: la línea 423 del archivo cita esta frase como arreglo del H7; hay que
actualizar también esa cita.)

**N9 · MEDIO — `belong to` figurado + doble elipsis** · ROLE B, restricción 1, línea 116.
Sale: `That answer belongs to retention, in writing, and not to you.`
Entra: `That answer is not yours. It comes from retention, in writing.`
Cuesta cero palabras.

**N10 · MEDIO — `see` literal donde significa «saber»** · ROLE B, dato oculto, línea 122.
Sale: `Your second way is a transfer, and she cannot see it.`
Entra: `Your second way is a transfer, and she does not know about it.`
En una escena con una pantalla que se enseña y no se entrega, `she cannot see it` se lee como que
no puede *mirarlo*. +2 palabras.

**N11 · LEVE — `carry` figurado, dos veces** · ROLE A línea 43 y ROLE B línea 117.
Sale: `It carries your passport number…` · `when her paper does not carry both dates`.
Entra: `It has your passport number…` · `when her paper does not have both dates`.
El vocabulario de Mauricio ya define `proof` como «a paper that shows something is true»: el verbo
del papel en esta ficha es `have`/`show`, no `carry`. Cuesta cero palabras.

**N12 · LEVE — variedad británica en una glosa** · ROLE B, vocabulario, `proof`, línea 150.
Sale: `what her email has not got`. Entra: `what her email does not have`.
§11 fija variedad americana para las ocho fichas, y esta ronda ya americanizó
`working days`, `return ticket` y `gym reception`. `has not got` se quedó.

**Presupuesto de prosa después de los doce.** A: 445 −3 (N7) +2 (N2) = **444**. B: 444 −1 (N3)
+2 (N4) +2 (N5) +2 (N10) = **449**, que pasa por una sola palabra. Para no dejarlo al filo,
la financiación está en la misma línea que la ronda anterior ya usó para `four people are in line`:
en «Where you are» de Mauricio, `Tuesday, 6:40 p.m.,` repite exacto la fila `Now` de su tabla de
datos y se puede cortar (−4) → **445**. Se corta prosa, no piezas. Hay que volver a medirlo con
`prosa-canonica.mjs`, que es el único número válido.

**No son cambios, y se dejan como están:**
- `Say it too early and it sounds like a plan to stop paying.` (A, línea 50). El imperativo con
  valor condicional se queda **por consistencia con el set**: `fase9-nivel-6.md` (N4) pidió
  exactamente esta forma como *arreglo* A2 en el escenario 6. Cambiarla aquí dejaría las dos
  fichas del mismo nivel diciendo lo contrario.
- `the next complaint has your name on it` (B, línea 126) y `the price stopped her` (A, línea 52):
  figurados, pero el contexto inmediato los sostiene.
- `also for the no` / `You gave the no and the yes`: sustantivar *no* y *yes* es idioma de la casa
  en las ocho fichas; si se toca, se toca en las ocho, y no es asunto de nivel.
- Las líneas de «Your toolkit» y de «You did it if»: son lista de comprobación, no prosa de §11,
  igual que en el molde y que en el resto del set.

## 5. VOCABULARIO — 20 filas, ninguna fuera de nivel

Una entrada por fila en las veinte, definición de una línea en las veinte, y **las veinte
definiciones son más simples que la palabra que definen**. Comprobado una a una. Las que más
riesgo tenían salen bien: `to bounce` («when the bank says no, and the money does not leave your
card») no usa *decline*, y `business days` («days when offices are open — not Saturday, not
Sunday») no usa *working*. La columna `here` es nota de propósito en las veinte, sin nada
entrecomillado. No hay cambio que pedir aquí.

Dos observaciones que **no** son cambios de nivel y se devuelven solo para que consten:
- `to cancel a plan`, celda `here`: «in Spanish *cancelar* can mean *to pay*» es la única línea en
  español de una ficha de rol. Es un aviso de falso amigo y por eso funciona; si el porte exige
  ficha 100 % en inglés, muere ahí y hay que decidirlo fuera de este informe.
- `1.098.622.417` (datos de A) usa puntos y `92,000` usa coma, en tablas de la misma ficha. La
  cédula con puntos es realia colombiana y el ejercicio es dictar dígitos, así que se dice igual;
  pero la mezcla de separadores en la misma pantalla es la clase de cosa que hace dudar en voz
  alta. Decisión de `habla-fichas-de-rol`.

Los datos duros son decibles: los tres precios llevan su glosa entre paréntesis
(*ninety-two thousand*, *a hundred and thirty-five thousand*, *thirty thousand*), las fechas son
ordinales y meses, y las horas caben en el A1 de `telling-time`.

## 6. CAMBIOS — ANCLAJES

**Los doce slugs citados existen, en el nivel que declara la entrada, y con el título exacto.**
Comprobado uno a uno contra `src/data/grammar/registry.ts` → `src/data/grammar/ingles/{a1,a2}`:

| slug citado | archivo | nivel | título coincide |
|---|---|---|---|
| `have-to-must` | `ingles/a2/have-to-must.ts` | A2 | ✓ |
| `first-conditional` | `ingles/a2/first-conditional.ts` | A2 | ✓ |
| `relative-clauses-a2` | `ingles/a2/relative-clauses.ts` | A2 | ✓ |
| `present-perfect-ever-never` | `ingles/a2/present-perfect-ever-never.ts` | A2 | ✓ |
| `connectors-a2` | `ingles/a2/connectors.ts` | A2 | ✓ |
| `present-continuous-future-a2` | `ingles/a2/present-continuous-future.ts` | A2 | ✓ |
| `can-ability` | `ingles/a1/can-ability.ts` | A1 | ✓ |
| `present-simple-questions` | `ingles/a1/present-simple-questions.ts` | A1 | ✓ |
| `present-simple-negative` | `ingles/a1/present-simple-negative.ts` | A1 | ✓ |
| `imperative` | `ingles/a1/imperative.ts` | A1 | ✓ |
| `prepositions-time` | `ingles/a1/prepositions-time.ts` | A1 | ✓ |
| `there-is-there-are` | `ingles/a1/there-is-there-are.ts` | A1 | ✓ |

**Los sufijos están donde tienen que estar.** Los tres con `-a2` lo llevan **en el dato**:
`grep` de `slug: 'connectors'`, `slug: 'relative-clauses'` y `slug: 'present-continuous-future'`
devuelve **cero** en todo `ingles/`, así que las versiones sin sufijo darían `null` en
`getTopicBySlug`. Y al revés: `have-to-must`, `first-conditional` y `present-perfect-ever-never`
existen **sin** sufijo, y añadírselo los rompería. La ficha acierta en los dos sentidos.

**A1 · GRAVE — un exponente sin tema que lo sostenga: `What will happen if…?`**
La ficha lo ancla a `first-conditional`, y ese tema cubre la **subordinada** (`if` + presente) y el
`will` de la principal enunciativa, pero no la **interrogativa wh + will**, que es justo lo que el
alumno tiene que producir. Quien la enseña es `will-future`, y no está citado: su contenido trae
`Will + sujeto + verbo base?` y `What will you do?` literalmente. Es además el exponente del punto
3 del cierre —qué pasa el 5 y el 12—, o sea el que más se va a decir.
**Cambio: entra `will-future` (A2, `El Futuro con Will en Inglés A2`)** como referencia número 13.
El exponente **no se toca**: es A2 y ahora sí tiene tema.

**A2 · MEDIO — el `rationale` de `there-is-there-are` reclama algo que el tema no enseña.**
Dice: «con «another» y no con «any other», que es el patrón que el tema sí enseña». Falso:
`another` aparece **cero veces** en `ingles/a1/there-is-there-are.ts` —y en todo `ingles/a1`—; el
tema enseña `Is there a…?` y `Are there any…?`. El anclaje **se queda y es correcto** (lo que
sostiene es la interrogativa `Is there…?`, que el tema trae seis veces), pero el `rationale` no
puede seguir contando `another` como patrón del tema.
**Cambio:** reescribir esa media frase. Propuesta: «El tema trae la interrogativa `Is there…?` con
seis ejemplos; `another` es determinante suelto y no depende de él.» El exponente
`Is there another way?` **no se toca**.

**A3 · MEDIO — el `rationale` de `first-conditional` no dice de dónde sale el `can` de la principal.**
`If you bring…, I can…` pone un modal en la principal, y el tema está escrito como
`If + presente, will + base` (su nota sobre `can` es para la cláusula `if`: «If you can come,
please let me know»). El exponente **es A2 y se queda** —la mitad `if` la sostiene
`first-conditional` y la mitad `can` la sostiene `can-ability`, ya citado—, pero conviene decirlo
en el `rationale` para que el anclaje no prometa más de lo que el tema tiene.
**Cambio:** añadir esa frase al `rationale` de `first-conditional`.

**A4 · LEVE — dos temas que la ficha ejercita y no cita, y por qué solo uno se recomienda.**
- **`past-simple-regular` / `past-simple-irregular` (A2).** Ninguna fila de exponentes pide pasado,
  así que en sentido estricto no falta; pero el dato oculto de Tatiana (Wilmer *sold*, *promised*,
  *never wrote it down*) y el de Mauricio (*you gave a freeze*, *you got a warning*) no se cuentan
  en voz alta sin pasado simple, y la pregunta 3 del debrief pregunta por ellos. **Recomendado**
  citar uno de los dos si `habla-fichas-de-rol` quiere que ese material se hable y no solo se lea.
- **`telling-time` (A1).** Cinco horas de reloj se dicen en voz alta. **No se recomienda añadirlo:**
  `prepositions-time`, ya citado, trae `at 8 a.m.`, `at 3:30 p.m.` y `at noon` en sus propios
  ejemplos, así que el anclaje ya existe y no hay hueco.

## 7. `grammarReferences` — lista para pegar

Con A1, A2 y A3 aplicados: **trece entradas**, todas verificadas contra el registro (slug, nivel y
título). Solo se toca lo que dicen A1-A3; los otros nueve `rationale` van sin una letra de cambio.

```ts
grammarReferences: [
  { level: 'a2', slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'Sostiene «So I have to…?» —el exponente con el que Tatiana comprueba en voz alta lo que le acaban de decir, que es literalmente el punto 1 del cierre— y «I have to be careful, because…» de Mauricio. El tema separa obligación externa de interna, y aquí toda la obligación viene de fuera.' },
  { level: 'a2', slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'Sostiene la subordinada de «If you bring…, I can…» y la del punto 3 del cierre: qué pasa el 5 y el 12 de septiembre si no hace nada. El modal de la principal («I can…») no sale de este tema, que está escrito como If + presente, will + base: esa mitad la sostiene can-ability. También es la forma en que las dos fichas escriben sus condiciones en prosa («If you say it too early, it sounds like…», «If you never say it, she never knows.»).' },
  { level: 'a2', slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'Sostiene «What will happen if…?», que first-conditional no cubre: ese tema da la subordinada con if, no la interrogativa wh + will, y es esta la que el alumno tiene que producir. El tema trae «Will + sujeto + verbo base?» y «What will you do?» en sus propios ejemplos. Es el exponente del punto 3 del cierre —el 5 y el 12 de septiembre—, o sea el que más se dice en voz alta.' },
  { level: 'a2', slug: 'relative-clauses-a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'Sostiene «The person who can do that is…» (caja, bloque 7) y «I need a paper that says…». Es lo que le permite a Mauricio pasar el asunto a quien decide sin discurso indirecto, que en A2 está prohibido.' },
  { level: 'a2', slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'Sostiene «Has this person ever been a member…?» Es el recast en nivel de la cláusula de la cesión, que estaba escrita como modal + infinitivo perfecto (B1+) y Mauricio tenía que decirla en voz alta. El registro trae «Has she ever lived abroad?» casi calcada. Va con «this person» y no con «she» a propósito: sirva o no sirva el orden en que salga Yurany, la pregunta no presupone a nadie y se puede leer en cualquier turno.' },
  { level: 'a2', slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Sostiene «I need it because…», «I know it\'s not your fault, but…», «I can\'t do that, but I can…», «I can show you, but I can\'t leave it.» y «That\'s why I\'m here today.» Ese but es el eje del escenario: es lo que convierte un no en una alternativa, y es lo único que separa a Mauricio de ser un mostrador que dice no ocho veces.' },
  { level: 'a1', slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene «Can you sign here, next to…?» de Mauricio, «I can show you, but I can\'t…» de Tatiana —la única forma que tiene ella de enseñar el correo de la embajada sin dejarlo— y el modal de la principal de «If you bring…, I can…». El tema enseña can como permiso y petición; could de cortesía no existe en A1 ni en A2 y sale de las dos fichas. En este mostrador la cortesía la ponen please, sorry y thank you.' },
  { level: 'a1', slug: 'present-simple-questions', title: 'Present simple interrogativo en inglés A1',
    rationale: 'Sostiene «What does "…" mean?». Es la reparación que este escenario pide más que ningún otro del set, porque Mauricio habla en palabras de contrato: freeze, transfer, cut-off, collections, retention.' },
  { level: 'a1', slug: 'present-simple-negative', title: 'Present simple negativo en inglés A1',
    rationale: 'Sostiene «I don\'t want to pay for…», que es donde Tatiana dice por qué le importa en vez de repetir lo que dice el contrato, y «That\'s not enough — it doesn\'t say…» de Mauricio. Y es la estructura con la que él tiene que construir en voz alta la diferencia entre congelar y cancelar: la ficha se la da como nota de propósito en el vocabulario («way one · to her, it sounds like a cancellation»), nunca como frase hecha, para que la frase la ponga él.' },
  { level: 'a1', slug: 'imperative', title: 'El imperativo en inglés A1',
    rationale: 'Sostiene «Let me say that again.» (caja, bloque 4), «Let me check that. One moment…» y «Write this down, please: …» de Mauricio, y «Let me copy…» de Tatiana. Es la mitad de la reparación que faltaba entera: hasta ahora ella podía preguntar qué significa algo y Mauricio no tenía con qué contestarle, y ahí es donde la pareja se pasaba al español.' },
  { level: 'a1', slug: 'prepositions-time', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'No sostiene ningún exponente: sostiene la preposición que el alumno tiene que **poner él**. Este escenario es un calendario —nueve de sus datos duros son fechas u horas— y las tablas se las dan desnudas a propósito («signed July 13», «September 3, Bogotá», «9:00 a.m.–5:00 p.m.»), de modo que decirlas en voz alta obliga a elegir at/on/in. El tema trae at 8 a.m., at 3:30 p.m. y on Monday en sus ejemplos, así que las horas de reloj de este escenario también quedan cubiertas aquí. Es el único de los trece que se ancla a una omisión de la ficha, y está escrito así aposta.' },
  { level: 'a2', slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'VUELVE en fase 6, y ya no es decorativo. Sostiene «I\'m leaving on…», el exponente nuevo de Tatiana. Toda la escena depende de que ella diga cuándo se va, es lo primero que tiene que decir y en fase 4 no tenía ni una forma para decirlo. El tema es exactamente esto: plan cerrado con fecha, tiquete comprado a su nombre, que no se discute.' },
  { level: 'a1', slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'Sostiene «Is there another way?» de Tatiana y «There is another way, but…» de Mauricio. El tema trae la interrogativa con there is/are en seis de sus ejemplos; «another» es un determinante suelto y no depende de él. proponer-alternativa es el tercer acto de habla de este escenario y en fase 4 Tatiana se quedó sin ninguna forma de pedir una: dependía entera de que Mauricio soltara la cesión por su cuenta, y su ficha dice que la cesión no es lo primero que ofrece.' },
]
```

---

## 8. Qué devuelvo, y a quién

Todo lo de arriba va a **`habla-fichas-de-rol`**: yo no reescribo la ficha. Doce recambios de prosa
(N1-N12), una referencia nueva (`will-future`), dos `rationale` corregidos
(`there-is-there-are`, `first-conditional`), uno ampliado por arrastre
(`can-ability`, `imperative`, `present-simple-negative`: mencionan formas que hoy no citan) y una
recomendación abierta (pasado simple, si se quiere que el dato oculto se hable). El motor no se
toca: ni actos, ni poder, ni desenlace, ni el `afterTurn: 3` de la carta.

**No es de nivel y no lo toco, pero lo dejo dicho porque lo vi:** en la tabla de exponentes de
Mauricio, `talking about the paper` va antes que `taking her side`, y el orden declarado es
alfabético (*tak* < *tal*). Es de `habla-fichas-de-rol` o de calcabilidad, no del calibrador.
