# Habla acompañada — inglés A2 · Fase 3: calibración de nivel, escenarios 7 y 8

Audita `artifacts/habla-a2/fase2-fichas-7-8.md`.
Contrasta contra `docs/habla-acompanado-blueprint.md` §4 y §6 (puerta 8), el motor de
`artifacts/habla-a2/fase1-escenarios-7-8.md` y el registro real de
`src/data/grammar/registry.ts` → `src/data/grammar/ingles/a2` (21 temas) y `.../a1` (25 temas).

**Aquí no se arregla nada.** Cada hallazgo dice qué sale, qué entra y por qué. La reescritura
vuelve a `habla-fichas-de-rol`.

---

## Veredicto

| nº | slug | veredicto |
|---|---|---|
| 7 | `two-more-people-for-the-trip` | **cabe con cambios** |
| 8 | `cancel-the-gym-i-am-leaving` | **cabe con cambios** |

**20 hallazgos**: 5 transversales, 7 del nº 7, 8 del nº 8.
Ninguno de los dos escenarios se cae de nivel: la prueba que decide —la ruta mínima— se
escribe entera con lengua de A2 en los dos, y está abajo, jugada.
Lo que falla es el **anclaje** (tres slugs declarados no existen), **cuatro exponentes** que
piden estructura que el registro de A2 no tiene, y en el nº 8 un **dato duro escrito en B1+**
que B tiene que decir en voz alta.

---

## Comprobación 1 — El acto de habla existe en el nivel

§4, fila A2: *pedir un favor, dar una razón, disculparse, proponer alternativa, quejarse con
educación, conceder poniendo una condición simple.* Lo que todavía no: *ironía, concesión
larga, discurso indirecto extenso.*

| nº | actos declarados | ¿A2? |
|---|---|---|
| 7 | `quejarse` + `rechazar` | **sí**. `quejarse` es literal en la fila A2; `rechazar` de frente ya se exige en A1 y en A2 se le añade la razón. Fase 0 ya blindó que la **función** «poner un límite» no se etiqueta `poner-limite` (B1) y se ejecuta con queja + rechazo. Sostenido |
| 8 | `pedir-favor` + `rechazar` + `proponer-alternativa` | **sí**. Los tres son literales en la fila A2 |

**Dos cosas que sí rozan el techo y hay que mirar, no dar por buenas:**

- **Nº 7 — la condición de B es negociación encubierta si no se escribe como condición
  simple.** El motor dice que en B2 «sale su condición» (*si les consigues dónde dormir* / *si
  me esperas hasta el martes*). Eso es `conceder-con-condicion`, que es A2 y está bien — pero
  el andamiaje de B **no trae la forma condicional plena** (ver S7.5). Sin ella, la pareja
  floja resuelve el turno regateando, y regatear es `negociar`, que es B1. El acto está en
  nivel; el andamiaje no lo sostiene.
- **Nº 8 — el traslado de la carta de Yeimy no puede pedir discurso indirecto.** La carta va a
  B y está escrita como tabla de datos, no como frases: eso está bien resuelto y evita el
  «Yeimy said that she wouldn't…». Se deja anotado para que nadie lo «mejore» convirtiéndolo
  en un mensaje en prosa.

**Ninguno de los dos escenarios exige negociar, insistir ni poner límite.** El acto cabe.

---

## Comprobación 2 — Cada exponente, uno por uno

Escala: **en nivel** · **chunk** (fórmula invariable, sin morfología que fallar: pasa, pero no
cuenta como anclaje fuerte) · **fuera de nivel** (sale o se reescribe).

### 7 · Ficha A — Mateo

| exponente | veredicto | nota |
|---|---|---|
| `The thing is…` | chunk | Invariable. Sin morfología. Pasa |
| `There's only room for…` | **fuera de nivel** | → **S7.1** |
| `Sorry, but we can't…` | en nivel | `can-ability` (A1) + `but` de `connectors-a2` |
| `You still owe me…` | en nivel con reserva | La forma es A2; el problema es el dato que la acompaña → **S7.2** |
| `Why didn't you tell me…?` | en nivel | `past-simple-questions`. Ancla perfecta |
| `Sorry, what do you mean?` | en nivel | `present-simple-questions` (A1) |
| `Who exactly is…?` | en nivel | `wh-questions` + `verb-to-be` (A1) |
| `What if…?` | chunk | Elíptico: no ejercita el condicional → **S7.5** |
| `Can you send me…?` | en nivel | `can-ability` (A1), que enseña can como petición |
| `I need to know by…` | en nivel con reserva | `by` de plazo sin ancla → **S7.6** |

### 7 · Ficha B — Kevin

| exponente | veredicto | nota |
|---|---|---|
| `I already told them…` | en nivel | `past-simple-irregular` (told) |
| `Look, …` | chunk | `imperative` (A1) |
| `They paid me on…` | en nivel | `past-simple-irregular` + `prepositions-time` (on + día) |
| `Can I pay you on…?` | en nivel | `can-ability` (A1) |
| `Give me until…` | en nivel con reserva | `until` sin ancla → **S7.6** |
| `He doesn't need…` | en nivel | `present-simple-negative` (A1) |
| `My car has…` | en nivel | `present-simple-affirmative` / `have-got` (A1) |
| `What if…?` | chunk | Igual que en A |
| `Sorry, what do you mean?` | en nivel | A1 |
| `I'll call…` | en nivel | `will-future`. Ancla perfecta |

### 8 · Ficha A — Daniela

| exponente | veredicto | nota |
|---|---|---|
| `Could I…?` | **fuera de nivel** | → **T3** |
| `I need to… because…` | en nivel | `connectors-a2` |
| `The thing is…` | chunk | Pasa |
| `When I signed, …` | en nivel | `past-simple-regular` (signed). La subordinada temporal con `when` no tiene tema propio, pero `past-simple-regular` declara «narra eventos en el orden en que ocurrieron». Pasa |
| `I can show you…, but…` | en nivel | `can-ability` (A1) + `but` |
| `Sorry, what do you mean?` | en nivel | A1 |
| `So I have to…?` | en nivel | `have-to-must`. Es el exponente que sostiene el punto 1 del cierre. El mejor de la ficha |
| `Is there any other way?` | en nivel | `there-is-there-are` (A1) + `any` de `quantifiers` |
| `Who can…?` | en nivel | `wh-questions` (A1) + can |
| `What happens if…?` | en nivel con reserva | Presente + presente donde `first-conditional` enseña if+presente→will → **S8.7** |

### 8 · Ficha B — Édison

| exponente | veredicto | nota |
|---|---|---|
| `I'm sorry, but I can't…` | en nivel | `can-ability` + `connectors-a2` |
| `I can't do that, but I can…` | en nivel | Igual. Es el exponente de `proponer-alternativa` y está bien puesto |
| `I need something in writing…` | en nivel con reserva | → **S8.6** |
| `Do you know when…?` | **fuera de nivel** | → **S8.1** |
| `It's not the same as…` | **fuera de nivel** (leve) | → **S8.4** |
| `You can also…` | en nivel | `can-ability` (A1) |
| `The person who can help you is…` | en nivel | `relative-clauses-a2`. Ancla perfecta |
| `If you don't…, then…` | en nivel | `first-conditional`, que cubre explícitamente «unless = if… not» |
| `Let me check…` | chunk | `let me` aparece una sola vez en `imperative` (A1) y dentro de una opción de ejercicio. Ancla débil pero invariable. Pasa |
| `Could you sign here, please?` | **fuera de nivel** | → **T3** |

**Recuento: 40 exponentes, 4 fuera de nivel, 4 en nivel con reserva, 6 chunks, 26 limpios.**

---

## Comprobación 3 — Anclaje real al registro de gramática

Lo que declaran las fichas contra lo que hay en `src/data/grammar/ingles/a2`.

### Slugs declarados que **no existen**

| ficha declara | slug real en el registro |
|---|---|
| `connectors` | **`connectors-a2`** |
| `relative-clauses` | **`relative-clauses-a2`** |
| `present-continuous-future` | **`present-continuous-future-a2`** |

Cinco temas de A2 llevan sufijo `-a2` en el slug (`connectors-a2`, `relative-clauses-a2`,
`present-continuous-future-a2`, `past-continuous-a2`, `prepositions-movement-a2`, `used-to-a2`)
y el resto no. `getTopicBySlug('ingles','a2','connectors')` devuelve `null`. → **T1**

### Anclas declaradas que **ningún exponente ejercita**

| nº | ancla declarada | ¿qué exponente la usa? |
|---|---|---|
| 7 | `present-perfect-basic` | **ninguno**. Los diez exponentes de A y los diez de B son presente simple, pasado simple, can y will → **S7.3** |
| 7 | `quantifiers` | **ninguno**. No hay much/many/some/any/a few en ningún exponente → **S7.4** |
| 7 | `first-conditional` | solo `What if…?`, que es elipsis: no hay `if + presente → will` en ninguna ficha → **S7.5** |
| 8 | `should-advice` | **ninguno**. No aparece `should` → **S8.5** |
| 8 | `present-continuous-future-a2` | **ninguno**, y encima el exponente que la ejercitaría (`When are you coming back?`) está escrito como pregunta incrustada → **S8.1** |

### Problema de forma de los datos

`grammarReferences` es `{ slug, title, rationale }[]` (§7 del blueprint) y **no lleva nivel**.
La ruta de gramática cablea el nivel: en
`src/app/(site)/practica/ingles/a2/gramatica/[slug]/page.tsx` la constante `NIVEL` es fija, así
que un slug de A1 (`can-ability`, `there-is-there-are`, `wh-questions`, `prepositions-time`,
`imperative`, `present-simple-negative`) **no resuelve bajo `/a2/`**. Casi la mitad de las
anclas honestas de estas cuatro fichas son de A1, porque el andamiaje de A2 se apoya en A1 a
propósito. → **T2**, y va a `habla-integracion`, no a las fichas.

---

## Comprobación 4 — La ruta mínima · **la que decide**

La conversación más corta que llega al cierre cumpliendo las restricciones, con solo lengua de
A2. Puerta 11 exige que nadie lo resuelva en menos de 6 turnos.

### 7 · `two-more-people-for-the-trip` — **se escribe.** A 6 turnos · B 7 turnos

> **B1** — Hey, Mateo. My bag is in the car. Ah, and Sebas and Andrés are coming too. I already
> told them.
> **A1** — What? No. Sorry, but we can't. There are only six beds and there are only six names
> at the gate. And you haven't paid me since July 30 — a hundred thousand pesos.
> **B2** — Look, they paid me on Tuesday. A hundred thousand each. That money isn't mine. If
> they don't come, I have to give it back. Can I pay you on Tuesday the 25th? That's my payday.
> **A2** — Who exactly is Sebastián? Does he need a bed?
> **B3** — No, he doesn't need a bed. He has a hammock and a camping mat. Andrés can't get
> there — only in my car.
> *(entra la nota de doña Nubia, solo a A)*
> **A3** — OK, listen. Doña Nubia can take two more people. It's forty-five thousand pesos per
> person for the two nights. But she needs full names and ID numbers before nine tomorrow. Can
> you send me the numbers tonight?
> **B4** — I can't. Sebastián finishes work at ten p.m. and he doesn't answer before that. I'll
> call Andrés now, and I'll write to Sebas at ten.
> **A4** — Fine. Tomorrow at eight: Laura's car has four seats. Does your car go?
> **B5** — Yes, my car goes. Five seats, and I pay for the petrol.
> **A5** — Then tonight you write to Sebas and Andrés and I write to doña Nubia. We talk again
> tomorrow at seven. **If there are no new names at nine, only the six people on the list go.**
> **B6** — Agreed. And I'll pay you the hundred thousand on Tuesday the 25th. I'll write it in
> the group tonight.
> **A6** — Perfect. See you at eight.
> **B7** — See you.

**Inventario de lengua usada:** presente simple afirmativo/negativo (A1), `there is/are` (A1),
`can/can't` petición y capacidad (A1), `have got`/`has` (A1), preposiciones de tiempo (A1),
past simple irregular (A2: *told, paid*), present perfect + `since` (A2), `have to` (A2),
`will` (A2), primer condicional (A2), `but/and` (A2). **Cero estructura de B1.**

**Cierre alcanzado:** (1) qué pasa a las 8:00 → A4/B5. (2) quién escribe a quién esta noche →
A5/B4. (3) hora de volver a hablar + regla de las 9:00 → A5. ✔ Los tres.

**Consecuencia:** el escenario **es de A2**. Y nótese que la ruta mínima usa `since` + present
perfect y `if…, only six people go` — dos cosas que **el andamiaje de hoy no da** (S7.2, S7.5).
La ruta mínima se escribe *a pesar* de la ficha, no *gracias a* ella.

### 8 · `cancel-the-gym-i-am-leaving` — **se escribe con dos caminos.** A 8 · B 8

> **A1** — Good evening. I need to cancel my plan, please. My visa appointment is on September
> 3, in Bogotá, and I'm travelling on August 30. I have the email here.
> **B1** — I'm sorry, but I can't cancel it. You signed on July 13 and your plan has a
> three-month minimum. It finishes on October 13. I can't do that — the person who can help you
> is Yeimy.
> **A2** — The thing is, when I signed, Duván told me that you cancelled the plan if I left the
> country. And I can't come back in office hours: I work from seven to six.
> **B2** — I understand. I need a document that says you are not in the city. **When are you
> coming back?**
> **A3** — I can show you the email on my phone, but I can't leave it — it has my passport
> number. And I don't know when I come back. The passport takes ten to fifteen working days.
> *(entra el mensaje de Yeimy, solo a B)*
> **B3** — OK. Yeimy doesn't authorise cancellations for travel. She can stop the payment for
> sixty days, with a document. But **a freeze isn't a cancellation**: the three months move to
> the end, so you pay again in December.
> **A4** — So I have to pay in December? Is there any other way?
> **B4** — You can also give your plan to another person. It's thirty thousand pesos. You both
> come here with your ID and you both sign. **Has that person ever been a member here?**
> **A5** — Yurany? No, never. She asked me about the gym two weeks ago. But she's in
> Piedecuesta until Thursday.
> **B5** — Thursday is fine, but not after six: the cut-off for this month is Thursday the 27th
> at six p.m. And one more thing — if the payment on the 5th doesn't work, the system sends it
> to collections on the 12th.
> **A6** — My card expires on August 31. The new card takes eight working days and I won't be
> at home. So the payment on the 5th won't work.
> **B6** — Then **you should talk to Yeimy before Thursday**. She's on the second floor,
> Wednesday to Friday, from nine to five. She has lunch from one to two.
> **A7** — OK. So today we don't sign anything, because you can't do it — only Yeimy can. I'll
> come on Thursday at twelve with Yurany and my ID. If that doesn't work, I'll ask her for the
> sixty days.
> **B7** — That's right. Can you sign here, please? Your name and the reason.
> **A8** — And if I do nothing, they charge me on September 5, it doesn't work, and on the 12th
> it goes to collections.
> **B8** — Exactly. Thursday, before six, second floor.

**Cierre alcanzado:** (1) hoy no se firma nada y por qué, repetido por A con sus palabras →
A7. (2) qué camino primero y qué llevar → A7 (cesión: Yurany + cédula + jueves 12:00). (3) con
quién, dónde, a qué hora, y qué pasa el 5 de septiembre → B6 + A8. ✔ Los tres.

**Pero:** esta ruta entrega **dos** caminos, no tres. Con el tercero (no renovación + pago por
PSE) B necesita un turno más para decirlo y A otro para acusar recibo: **B llega a 9–10 turnos
y se sale del techo de §4** (6–9 por rol). Ver S8.3 y la sección siguiente.

**Lo que la ruta mínima tuvo que evitar para seguir siendo A2:** `Do you know when…?` (recast a
`When are you coming back?`), `can't have been a member in the last 6 months` (recast a
`Has that person ever been a member here?`), `Could you sign here?` (recast a `Can you…?`),
`It's not the same as…` (recast a `A freeze isn't a cancellation`), `doesn't go through`
(recast a `doesn't work`). **Cinco recasts.** Ninguno cambia el motor; los cinco cambian la
ficha.

### La prueba específica del nº 8 — ¿entiende y repite un A2 los tres caminos?

| camino | ¿entendible en A2? | ¿repetible en A2? |
|---|---|---|
| 1 · congelación 60 días | **sí**, si se dice como en B3: *stop the payment · sixty days · with a document · the three months move to the end · you pay again in December*. Cinco hechos, todos en presente simple y frases de 6-8 palabras | **sí**: `So I have to pay in December?` — el exponente `So I have to…?` está hecho exactamente para esto y es el mejor acierto de la ficha A |
| 2 · cesión | **sí, tras el recast de S8.2.** Tal como está hoy (`can't have been a member in the last 6 months`) **no**: modal + infinitivo perfecto es B1+ y no existe en el registro | **sí**, tras el recast: `Has she ever been a member here? — No, never.` (`present-perfect-ever-never`, A2) |
| 3 · no renovación + PSE | **no se puede comprobar: no está en ninguna ficha.** Solo hay una fila huérfana en los datos duros de B, con `cartera` en español dentro de un valor en inglés, y ninguna instrucción para ofrecerlo | — |

**Veredicto de esta prueba:** el escenario **no mide comprensión de B1** — y lo salva una
decisión que hay que blindar por escrito: **el cierre solo obliga a repetir UN camino** («cuál
de los caminos va a intentar Daniela primero»). Los otros dos se ofrecen y se escuchan, no se
recitan. Si alguien «mejora» el cierre pidiendo que A resuma los tres, el escenario pasa a
medir memoria de trabajo en L2 y deja de ser A2. **Queda anotado como invariante.**

---

## Comprobación 5 — Los datos duros son decibles

- **Horas** — `telling-time` (A1) cubre `8:00 a.m.`, `9:00 a.m.`, `6:40 p.m.` («six forty» o
  «twenty to seven»), `10:00 p.m.`, `12:00 to 1:00`. ✔
- **Preposiciones de tiempo** — `prepositions-time` (A1) cubre `at 8 a.m.`, `on Saturday`,
  `on July 30`, `in September`. ✔
- **Fechas** — mezcla de formatos y ordinales sin tema propio → **T5**.
- **Numerales grandes** — **no hay tema de números en A1 ni en A2.** `hundred` y `thousand`
  aparecen exclusivamente en `telling-time`, y ahí como lectura digital de la hora. Estas
  cuatro fichas piden decir en voz alta: 600,000 · 400,000 · 200,000 · 100,000 · 45,000 ·
  35,000 · 92,000 · 135,000 · 30,000. → **T4**.
- **`since`** — `present-perfect-vs-past-simple` (A2) enseña que `since` acompaña siempre al
  present perfect. La ficha lo pega a un exponente en presente simple → **S7.2**.
- **Léxico de trámite sin glosa** — `cartera`, `collections`, `PSE`, `working days`,
  `cut-off`. El más grave es `collections`: es el dato de la carta que le cambia el objetivo a
  A a mitad de partida. Si no se entiende, la complicación no funciona → **S8.8**.

**Doctrina aplicada:** no se sube el nivel del alumno. Se glosa el numeral o se cambia el
dato. No se recomienda bajar las cifras: la aritmética del nº 7 (600 = 6 × 100) es el motor.

---

# Los 20 hallazgos

## Transversales

**T1 · GRAVE · Tres slugs declarados no existen en el registro.**
Sale: `connectors`, `relative-clauses`, `present-continuous-future`.
Entra: `connectors-a2`, `relative-clauses-a2`, `present-continuous-future-a2`.
Por qué: `getTopicBySlug` devuelve `null` con los tres. Puerta 8 no se puede verificar contra
un slug que no resuelve.

**T2 · GRAVE · `grammarReferences` no lleva nivel y la ruta lo cablea.**
Sale: nada de las fichas.
Entra: campo `level: 'a1' | 'a2' | 'b1'` en el tipo de §7 del blueprint.
Por qué: `/practica/ingles/a2/gramatica/[slug]` fija `NIVEL` como constante; los anclajes de A1
(`can-ability`, `there-is-there-are`, `wh-questions`, `prepositions-time`, `imperative`,
`present-simple-negative`, `present-simple-questions`) no resuelven ahí. Son la mitad honesta
del anclaje de estas fichas. **Va a `habla-integracion`, no a `habla-fichas-de-rol`.**

**T3 · GRAVE · `could` de cortesía no existe en el registro de A1 ni de A2.**
Sale: `Could I…?` (ficha 8A), `Could you sign here, please?` (ficha 8B).
Entra: `Can I…?` y `Can you sign here, please?`
Por qué: `could` solo aparece en A1/A2 como `couldn't` incidental dentro de ejemplos de
`connectors-a2` y `superlatives`. En cambio `can-ability` (A1) enseña literalmente can como
permiso y petición: *«Can I open the window?»*, *«Can I come in?»*, *«Can you help me?»*.
Nota de registro: el nº 8 es de mostrador y de usted; `Can I…?` con `please` sostiene ese
registro sin salir de nivel. La cortesía del A2 se hace con `please`, `sorry` y `thank you`, no
con `could`.

**T4 · Numerales de seis cifras sin tema que los sostenga.**
Sale: nada.
Entra: glosa en palabras la primera vez que cada cifra aparece en una tabla de datos duros —
`600,000 pesos (six hundred thousand)`, `45,000 (forty-five thousand)`, `92,000 (ninety-two
thousand)`.
Por qué: no hay tema de números en el registro. Sin glosa, el A2 lee la cifra en español y el
escenario produce spanglish justo en el dato que lo sostiene. No se bajan las cifras: la
aritmética del nº 7 depende de ellas.

**T5 · Formato de fecha inconsistente y ordinal sin ancla.**
Sale: la mezcla `July 30` / `Tuesday the 25th` / `Thursday the 27th` / `the 5th of every month`.
Entra: un solo formato, el que el registro modela: `prepositions-time` (A1) da `on June 15` y
`on July 5th`.
Por qué: cuatro formatos en cuatro fichas del mismo set. El cierre del nº 8 exige que A repita
una fecha en voz alta; conviene que la haya visto escrita siempre igual.

## Escenario 7

**S7.1 · Sale `There's only room for…`.**
Entra: **`There are only six beds.`** y/o **`There are only six names on the list.`**
Por qué: `room` como incontable («espacio») no está ni en `countable-uncountable` (A1) —que
lista water, money, time, help— ni en `quantifiers` (A2). Y es falso amigo directo: para el A2
hispanohablante `room` es *habitación*, que además es otro dato de la ficha («3 bedrooms»). La
forma que entra se ancla en `there-is-there-are` (A1) + `quantifiers` (A2), coincide palabra
por palabra con los datos duros y es lo que el rol necesita decir.

**S7.2 · Sale la pareja `You still owe me…` + dato `since July 30`.**
Entra: **`You haven't paid me since…`** (y `You still owe me…` se puede conservar si el dato
cambia a `from July 30`).
Por qué: `present-perfect-vs-past-simple` (A2) enseña explícitamente que `since` va siempre con
present perfect. La ficha invita al error `You still owe me 100,000 since July 30`. La forma
que entra es correcta, es la queja del rol, y activa de golpe las dos anclas de present perfect
que hoy están decorativas.

**S7.3 · Sale el anclaje declarado `present-perfect-basic`.**
Entra: `present-perfect-vs-past-simple` + `present-perfect-ever-never`, con los exponentes
`You haven't paid me since…` (A) y `I've already told them.` (B, sustituyendo o acompañando a
`I already told them…`).
Por qué: ningún exponente de las dos fichas usa present perfect. El anclaje declarado no lo
sostiene nada. `already` es además tema explícito de `present-perfect-ever-never`.

**S7.4 · Sale el anclaje declarado `quantifiers` tal como está.**
Entra: exponente **`How many people are…?`** en la ficha A.
Por qué: `quantifiers` está declarado y no lo toca ningún exponente. `How many` es literal del
tema («How many students?») y es exactamente lo que A necesita preguntar. Con eso el anclaje
deja de ser adorno.

**S7.5 · Entra la forma condicional plena; `What if…?` se queda pero deja de ser la única.**
Entra: **`If you…, I'll…`** en la ficha B (es la condición de B: *si me esperas hasta el
martes*) y **`If there's no…, then…`** en la ficha A (la regla de las 9:00 a. m., que es el
punto 3 del cierre).
Por qué: `first-conditional` está declarado y solo lo roza `What if…?`, que es elipsis y no
tiene morfología. Sin la forma plena, el turno B2 —donde el motor dice que «empieza el juego»—
se resuelve regateando, y regatear es `negociar`: B1. El acto `conceder-con-condicion` es A2
**solo si la condición se dice con la estructura de A2**.

**S7.6 · `by` y `until` de plazo no tienen ancla.**
Sale o se glosa: `I need to know by…` (A), `Give me until…` (B).
Entra: `I need to know before 9 a.m.` / y en B basta con `Can I pay you on Tuesday the 25th?`,
que ya está en la ficha y hace el mismo trabajo con `prepositions-time` detrás.
Por qué: `prepositions-time` (A1) cubre at/on/in y nada más. Es un hallazgo menor porque son
chunks, pero `Give me until…` además duplica la función de `Can I pay you on…?`, y §6 puerta 4
pide diez exponentes que hagan diez cosas distintas.

**S7.7 · La ficha A no tiene con qué abrir el traslado de la carta.**
Entra: un exponente de traslado de dato, tipo **`She can take…`** o **`It's … per person.`**
Por qué: la carta llega a A en el turno 4 y el motor dice que «si A la resume mal es problema
de A y ahí está el trabajo de lengua». De acuerdo — pero el trabajo de lengua necesita una
herramienta. Los diez exponentes de A son para quejarse, rechazar y preguntar; ninguno es para
informar. Menor, y **no se resuelve con un exponente que cierre la conversación** (puerta 4).

## Escenario 8

**S8.1 · GRAVE · Sale `Do you know when…?`.**
Entra: **`When are you coming back?`**
Por qué: es una pregunta incrustada, y **el registro de inglés A1+A2 no tiene un solo tema de
preguntas indirectas**: `wh-questions` (A1) y `past-simple-questions` (A2) enseñan las dos la
inversión. La pregunta incrustada exige suprimirla, y es el error canónico de la frontera
A2/B1 («Do you know when *are you* coming back?»). La forma que entra activa
`present-continuous-future-a2`, que la ficha ya declara y hoy no ejercita, y encaja con su
propio modelo: *«Are you coming to the party tonight?»*.

**S8.2 · GRAVE · Sale el dato `the new member can't have been a member in the last 6 months`.**
Entra: dato reescrito **`only for people who have never been members here`** + exponente
**`Has she ever been a member here?`** en la ficha B.
Por qué: modal + infinitivo perfecto es B1+ y no existe en el registro; está escrito en inglés,
en la tabla de datos duros de B, y B tiene que decirlo en voz alta para que el camino 2 —el
camino que el motor llama «la salida que A no sabía que existía»— se entienda. La forma que
entra se ancla limpia en `present-perfect-ever-never` («Have you ever been to Japan?»), se
apoya de paso en `relative-clauses-a2` (`people who…`) y **encaja mejor con el motor**: el dato
oculto de A es precisamente que Yurany preguntó por el gimnasio y no se metió. `— Has she ever
been a member here? — No, never.` Es la respuesta corta que el propio tema enseña.

**S8.3 · GRAVE · El camino 3 no existe en ninguna ficha.**
Sale o entra, pero no las dos cosas a medias:
· **Opción A** — publicar el camino en «Lo que sabes tú y nadie más» de B, en una línea
decible: *no renovación para el 13 de octubre + pagar septiembre en línea, porque la
referencia sale el día 1*. Y darle un exponente (`You can also pay…`).
· **Opción B** — borrar la fila huérfana `Pago por PSE | cartera generates the reference on the
1st` de los datos duros de B y alinear fase 1 a **dos** caminos.
Por qué: hoy el camino 3 es una fila de tabla sin secreto, sin exponente y sin instrucción; el
propio criterio de éxito de B pide «al menos **dos** caminos», así que la ficha ya se
autodegradó a dos sin decirlo. Y la fila trae `cartera` en español dentro de un valor en inglés,
que la convención de la propia fase 2 prohíbe.
**Aviso de nivel para la opción A:** la ruta mínima con dos caminos ocupa ya los 8 turnos de B.
El tercero lo empuja a 9-10 y §4 pone el techo del A2 en 9. Si entra, tiene que entrar **en el
mismo turno que el corte del jueves**, en una frase, sin condiciones nuevas. Si no cabe así,
la opción honesta es la B.

**S8.4 · Sale `It's not the same as…`.**
Entra: **`A freeze isn't a cancellation.`** (o `It isn't a cancellation. It's different.`)
Por qué: `comparatives` (A2) enseña `-er than` y `as… as` / `not as… as`; `the same as` no está
en el tema. Y la forma que entra —`verb-to-be` negativo, A1— dice el punto de B con más
claridad que la que sale, que es justo lo que el motor necesita («A cree que congelar es
cancelar despacio, y no»).

**S8.5 · Entra `should` o sale el anclaje declarado.**
Entra: **`You should talk to…`** en la ficha B.
Por qué: `should-advice` está declarado como anclaje y ningún exponente usa `should`. Es el
modal de `recomendar` / `proponer-alternativa` —los actos etiquetados del escenario— y cuesta
un renglón. Sin él, B recomienda solo con `You can also…`, que es permiso, no consejo.

**S8.6 · Sale `I need something in writing…`.**
Entra: **`I need a document that says…`**
Por qué: `in writing` es chunk sin ancla y **contradice el dato de la propia ficha**, que dice
`needs a document`. La forma que entra usa la palabra del dato (repetición = comprensión) y se
ancla en `relative-clauses-a2`, que la ficha ya declara.

**S8.7 · `What happens if…?` — menor.**
Entra: **`What will happen if…?`**
Por qué: `first-conditional` enseña if + presente → **will**. La forma actual es presente +
presente. Es corriente y se entiende, pero desalinea el exponente de su propio anclaje justo en
el punto del cierre donde A tiene que preguntar qué pasa el 5 de septiembre.

**S8.8 · Léxico de trámite sin glosa.**
Entra: glosa breve para `collections` (cobranzas), `working days`, `cut-off`, y decisión sobre
`PSE`.
Por qué: `collections` es el dato de la carta de Yeimy que **le cambia el objetivo a A a mitad
de conversación** (motor, §complicación). Si A no lo descodifica, la complicación no reabre
nada. `doesn't go through` del mismo bloque conviene decirlo `doesn't work`: `go through` es
verbo frasal de B1.

---

# `grammarReferences` — listos para pegar

Van con `level`, que hoy el tipo no tiene (**T2**). Si `habla-integracion` decide no añadirlo,
hay que quedarse solo con las filas `a2` y perder la mitad del anclaje honesto; queda dicho.
Los `rationale` están escritos suponiendo que los cambios de arriba se aplican.

## 7 · `two-more-people-for-the-trip`

```ts
grammarReferences: [
  { level: 'a2', slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'Sostiene «Why didn\'t you tell me…?»: el reclamo de A por lo que se decidió sin él es una pregunta negativa en pasado con did, y el tema avisa del error exacto («Did she went?»).' },
  { level: 'a2', slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Sostiene «I already told them…» y «They paid me on Tuesday»: told y paid son los dos irregulares con los que B defiende su posición, y los dos están en la lista de 30 del tema.' },
  { level: 'a2', slug: 'present-perfect-vs-past-simple', title: 'Present Perfect vs. Past Simple en Inglés A2',
    rationale: 'Sostiene «You haven\'t paid me since July 30». El tema enseña que since siempre acompaña al present perfect: es lo que impide el error que el dato duro de la ficha invita.' },
  { level: 'a2', slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'Sostiene «I\'ve already told them» (B) y «You haven\'t paid me yet» (A). already y yet son tema explícito, y son las dos piezas con las que cada rol dice que su parte ya está hecha o todavía no.' },
  { level: 'a2', slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'Sostiene la condición de B («If they don\'t come, I have to give the money back») y la regla de las 9:00 a. m. del cierre («If there are no new names at nine, only six people go»). Sin la forma plena, conceder con condición se convierte en regatear, que es B1.' },
  { level: 'a2', slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'Sostiene «I\'ll call…» y todo el reparto de quién le escribe a quién esta noche, que es el punto 2 del criterio de cierre. El tema cubre el uso «promesa» y «decisión espontánea», que es exactamente el registro del turno.' },
  { level: 'a2', slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'Sostiene la restricción dura de los dos roles: «I have to give the money back», «They have to be on the list». El tema separa obligación externa (have to) de la interna, y aquí toda la obligación viene de fuera: la portería y los amigos.' },
  { level: 'a2', slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Sostiene «How many people are coming?» y «There aren\'t any free beds». El escenario entero se juega contando camas, nombres y puestos: es el tema que convierte los datos duros en pregunta.' },
  { level: 'a2', slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Sostiene «Sorry, but we can\'t…» y todo el «X because Y» de la queja. §4 exige que el rechazo de A2 lleve razón; because y so son el mecanismo, y but es lo que evita que el no cierre la conversación.' },
  { level: 'a1', slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'Sostiene «There are only six beds» y «There are only six names on the list», que sustituyen a «There\'s only room for…». Es la forma con la que A pone el número delante y rechaza sin discutir.' },
  { level: 'a1', slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene «Can you send me…?», «Can I pay you on…?» y «Sorry, but we can\'t…». El tema enseña can como petición y permiso además de habilidad: es toda la cortesía que este nivel tiene, y no hace falta más porque el registro es informal.' },
  { level: 'a1', slug: 'prepositions-time', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Sostiene «on Tuesday», «at 8 a.m.», «on July 30»: las tres preposiciones con las que se dicen la salida, el plazo y la deuda. Sin ellas los datos duros del escenario no se pueden pronunciar.' },
  { level: 'a1', slug: 'wh-questions', title: 'Preguntas con WH en inglés A1',
    rationale: 'Sostiene «Who exactly is…?» y «Sorry, what do you mean?». La puerta 3 del blueprint exige dos datos que solo salen preguntando abierto; estas son las preguntas abiertas con las que salen la hamaca y el turno de Sebastián.' },
]
```

## 8 · `cancel-the-gym-i-am-leaving`

```ts
grammarReferences: [
  { level: 'a2', slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'Sostiene «So I have to…?», el exponente con el que A comprueba en voz alta lo que le acaban de decir — que es literalmente el punto 1 del criterio de cierre. Y sostiene el «You have to bring a document» de B: obligación externa, que es la que el tema separa de la interna.' },
  { level: 'a2', slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'Sostiene «If you don\'t…, then…» (B) y «What will happen if…?» (A). Es la estructura del punto 3 del cierre: qué pasa el 5 de septiembre si A no hace nada. El tema cubre además unless = if… not, que es como B dice el no sin repetirlo.' },
  { level: 'a2', slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'Sostiene «I\'ll come on Thursday» y «the system will send it to collections»: la decisión que A toma en el momento y la consecuencia que B anuncia. Los usos «decisión espontánea» y «predicción» del tema son los dos que el cierre pide.' },
  { level: 'a2', slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Sostiene «When are you coming back?» (B) y «I\'m travelling on August 30» (A), que son los dos datos que mueven el escenario. Sustituye a la pregunta incrustada «Do you know when…?», que no tiene tema en A1 ni en A2.' },
  { level: 'a2', slug: 'relative-clauses-a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'Sostiene «The person who can help you is…» y «I need a document that says…». Es el tema que le permite a B pasar el asunto a quien decide sin discurso indirecto, que en A2 está prohibido.' },
  { level: 'a2', slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'Sostiene «Has she ever been a member here? — No, never.» Es el recast en nivel de la cláusula de la cesión, que hoy está escrita como modal + infinitivo perfecto (B1+). El tema trae la pregunta y la respuesta corta con never tal cual.' },
  { level: 'a2', slug: 'should-advice', title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Sostiene «You should talk to Yeimy before Thursday». Es el modal de recomendar y de proponer alternativa, los dos actos etiquetados del escenario; sin él B solo tiene «You can also…», que es permiso y no consejo.' },
  { level: 'a2', slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'Sostiene «When I signed, …»: la queja de A se apoya entera en lo que pasó el 13 de julio, y signed es regular. El tema declara narrar eventos en el orden en que ocurrieron, que es lo que A hace en su segundo turno.' },
  { level: 'a2', slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Sostiene «Duván told me…» y «he said…». told y said están en la lista de 30 del tema, con su aviso de pronunciación, y son los verbos con los que A trae la promesa que no tiene por escrito.' },
  { level: 'a2', slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Sostiene «Is there any other way?», el exponente con el que A abre la puerta a la cesión. El tema enseña any en preguntas, que es justo la pieza que hace que la pregunta suene a petición y no a reproche.' },
  { level: 'a2', slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Sostiene «I need to… because…» (A) y «I can\'t do that, but I can…» (B). El but de ese segundo exponente es el eje del escenario: es lo que convierte un no en una alternativa, y es lo único que separa a B de ser un mostrador que dice no ocho veces.' },
  { level: 'a1', slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene «Can I…?», «Can you sign here, please?», «I can show you…, but…» y «I\'m sorry, but I can\'t…». El tema enseña can como permiso y petición; could de cortesía no existe en A1 ni en A2, y en este mostrador la cortesía la ponen please, sorry y el usted del registro.' },
  { level: 'a1', slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'Sostiene «Is there any other way?». Con la interrogativa de there is, A abre la única puerta que B no había ofrecido, sin tener que nombrar algo que todavía no sabe que existe.' },
  { level: 'a1', slug: 'wh-questions', title: 'Preguntas con WH en inglés A1',
    rationale: 'Sostiene «Who can…?» y «What happens if…?». El aprendizaje del escenario es que reclamar bien a quien no decide sirve para averiguar quién decide, y Who can…? es la frase que lo ejecuta.' },
  { level: 'a1', slug: 'prepositions-time', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Sostiene «on July 13», «on September 3», «at six p.m.», «from nine to five». Este escenario es un calendario: nueve de sus datos duros son fechas u horas y ninguno se dice sin at/on/in.' },
]
```

---

## Lo que NO hay que cambiar

Se anota porque en una segunda pasada alguien lo «mejora» y rompe el nivel:

1. **La carta de doña Nubia y el mensaje de Yeimy son tablas de datos, no prosa.** Es lo que
   evita el discurso indirecto extenso que §4 prohíbe en A2. Si se convierten en un párrafo,
   el traslado pasa a exigir B1 y los dos escenarios se caen por la puerta 8.
2. **El cierre del nº 8 pide repetir UN camino, no los tres.** Es la decisión que sostiene el
   escenario en A2. Ver la prueba de la comprobación 4.
3. **`So I have to…?` (ficha 8A).** Es el mejor exponente de las cuatro fichas: hace el punto 1
   del cierre con un modal de A2 y sin atenuadores. No tocarlo.
4. **`I can't do that, but I can…` (ficha 8B).** Un solo exponente que hace rechazar y proponer
   alternativa en la misma frase, en nivel. Es lo que impide que B sea un villano.
5. **Las cifras del nº 7.** 600.000 = 6 × 100.000 es la aritmética del escenario. Se glosa el
   numeral (T4); no se baja la cifra.
6. **El desenlace del nº 8 sigue siendo `sin-acuerdo`.** Fase 0 lo dejó escrito y el reparto de
   §5 depende de él. Nada de este informe lo toca.
