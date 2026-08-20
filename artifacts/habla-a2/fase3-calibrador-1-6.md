# Habla acompañada — inglés A2 · Fase 3: calibración de nivel de los escenarios 1 a 6

Auditoría de `artifacts/habla-a2/fase2-fichas-1-3.md` y `fase2-fichas-4-6.md` contra
`docs/habla-acompanado-blueprint.md` §4 y contra el registro real de gramática
(`src/data/grammar/registry.ts` → `src/data/grammar/ingles/a1/` y `/a2/`).

**Este documento no arregla nada.** Nombra el cambio y lo devuelve a `habla-fichas-de-rol`
(y lo que toca el motor, a quien escribió la fase 1; y lo que toca el tipo de datos, a
`habla-integracion`). Quien audita no arregla.

---

## 0. Veredicto

| nº | slug | veredicto | cambios que lo condicionan |
|---|---|---|---|
| 1 | `the-bike-in-the-parking-lot` | **cabe con cambios** | H6 (objetivo de B reintroduce `negociar`), H2 (`Could I…?`), H9 (`Would that work for you?`) |
| 2 | `no-appointment-until-thursday` | **cabe con cambios** | H5 (el dato oculto de B solo existe en español), H1 (`since Sunday`), H2 (dos `Could you…?`), H10 (`write it down`) |
| 3 | `swap-the-saturday-shift` | **cabe con cambios — al filo** | H7 (tres condiciones simultáneas = `negociar`), H4 (la carta es pasiva en present perfect), H11, H9 |
| 4 | `a-charge-i-did-not-make` | **cabe con cambios** | H1 (criterio de éxito impronunciable en A2), H14 (`pedir-aclaracion` sin financiar), H8 (preguntas incrustadas) |
| 5 | `late-again-on-monday` | **cabe con cambios** | H1 (`since 1 August`), H12 (`logged`, `personnel file`), H25 (`leave it like this`) |
| 6 | `the-cousin-on-the-sofa` | **cabe con cambios** | H19 (`by 8:00`), H12, H17 |

**Ninguno se cae del nivel.** Los seis pasan la prueba que decide —la ruta mínima de §4—:
escribí las seis conversaciones completas con lengua anclada en el registro A2 (o inferior) y
las seis llegan al cierre. Lo que hay son **28 hallazgos**, casi todos de exponente o de dato,
y **dos de acto** (nº 1 y nº 3) que si no se corrigen empujan esos dos escenarios a
`negociar`, que §4 sitúa en B1.

**El set no tiene ningún escenario que haya que subir de nivel. Tiene un redactor que aplicó
una regla falsa.** Ver §7.

---

## 1. Comprobación 1 — el acto de habla existe en el nivel

§4 autoriza en A2: *pedir un favor, dar una razón, disculparse, proponer alternativa,
quejarse con educación, conceder poniendo una condición simple*. Prohíbe: *ironía, concesión
larga, discurso indirecto extenso*. `negociar`, `insistir` y `poner-limite` son B1.

| nº | actos declarados (fase 0) | ¿existe en A2? | lo que de verdad exige la ficha |
|---|---|---|---|
| 1 | `rechazar`, `conceder-con-condicion` | sí | **pero** el objetivo de B es «por el menor precio posible» = regateo abierto = `negociar` → **H6** |
| 2 | `dar-mala-noticia`, `recomendar` | sí | consejo simple + señal de alarma. Limpio |
| 3 | `pedir-favor`, `conceder-con-condicion` | sí | **pero** B pone tres condiciones a la vez y hay que reabrir el trato tras la carta → **H7** |
| 4 | `quejarse`, `pedir-aclaracion` | sí | queja con dato duro, sin atenuadores largos. Limpio en el acto; sucio en el andamiaje (**H14**) |
| 5 | `disculparse`, `conceder-con-condicion` | sí | disculpa una vez + razón + contrapartida con fecha. **El mejor calibrado del set** |
| 6 | `dar-mala-noticia`, `proponer-alternativa` | sí | dar mala noticia sin poder y sin poder dar la razón. Duro, pero A2 lo sostiene con `I can't tell you why, sorry.` |

Sobre §3.1 (colapso en tres turnos): los seis tienen la condición bajo la cual B acepta. Sobre
§4 «condición **simple**»: es simple en 1, 2, 4, 5 y 6. En el 3 no lo es (H7).

---

## 2. Comprobación 2 — el cepillo sobre los 120 exponentes

120 exponentes exactos (60 en fichas 1-3, 60 en fichas 4-6). Pasados uno a uno por el filtro
que pidió el encargo —present perfect, condicional segundo, pasiva, discurso indirecto— y por
el filtro de verdad, que es **«¿hay un tema del registro que lo sostenga?»**.

### 2.1 Resultado del cepillo pedido

| estructura buscada | ocurrencias en los 120 exponentes | veredicto |
|---|---|---|
| **present perfect** | **0** | y no habría pasado nada si las hubiera: el registro A2 tiene `present-perfect-basic`, `present-perfect-ever-never` y `present-perfect-vs-past-simple`. Ver **H3** |
| **condicional segundo** | **0** | correcto: `second-conditional-b1` es B1 |
| **pasiva** | **0 en exponentes** · **1 en una carta de complicación** (`has been moved`, nº 3) | **H4** |
| **discurso indirecto** | 0 explícito. 2 obligados por los datos: `Wilson said…` (3B), `Don Álvaro says the shop opened at 7:20` (5B) | una cláusula no es «discurso indirecto **extenso**». Pasa, con nota (**H20**) |

### 2.2 Lo que el cepillo pedido NO habría visto, y sí está

Cuatro familias que se salen de A2 y que ninguna de las cuatro palabras del encargo captura:

| familia | exponentes afectados | hallazgo |
|---|---|---|
| **`could` de cortesía** | `Could I…?` (1B) · `Could you confirm…, please?` (2A) · `Could you write it down, please?` (2B) | **H2 — el más grave de los de exponente.** `could` no aparece como forma enseñable en **ningún** tema de inglés A1 ni A2. Solo hay `couldn't` de pasado en dos ejemplos de `connectors-a2` |
| **`would` hipotético** | `Would that work for you?` (1A) · `Would that help?` (3A) | **H9.** Lo único anclado es `would like` (A1 `like-ing`: «would like + to + verbo»; A2 `quantifiers`: «Would you like some…?»). `Would that work?` no es `would like` |
| **preguntas incrustadas** | `Can you tell me when it started?` (4B) · `Do you remember what day it was?` (4B) · `Let me explain what happened.` (5A) | **H8.** El orden sin inversión de la interrogativa indirecta no tiene tema en A1, A2 **ni B1** |
| **phrasal verb separable con pronombre** | `write it down` (2B) | **H10.** `phrasal-verbs-common-b1` |

### 2.3 Los 120, por veredicto

- **Anclados y limpios: 104.**
- **Sin anclaje estructural, admisibles como fórmula fija cerrada: 9** — `The thing is…`,
  `Let me think.`, `Let me check.`, `Only if…`, `What if…?`, `How about…?`, `What about…?`,
  `Wait a second.`, `Sorry, one more thing.` Ninguno se conjuga ni se transforma: el estudiante
  los dice tal cual. Se quedan, pero se documentan como chunks, no como gramática.
- **Fuera de A2: 7** — los cuatro `could`/`would` (H2, H9), las tres incrustadas (H8). De
  esos, `write it down` suma además el phrasal (H10).
- **Idiomáticos por encima del nivel, sustituibles: 3** — `I know it's a lot to ask.` (3A),
  `Can you put that in writing?` (3B), `If I do that, can we leave it like this?` (5A).
  Ver H11, H24, H25.

**La sustitución ya está dentro del propio set.** El nº 1 lleva `Would that work for you?` en
la ficha A y `Does that work for you?` en la ficha B: la versión A2 ya la escribió el mismo
redactor. Igual con `Can you tell me when it started?` (4B), que en el nº 2 aparece como
`When did it start?` (2A), anclado en `past-simple-questions`.

---

## 3. Comprobación 3 — anclaje real al registro

Leído `src/data/grammar/registry.ts` y los 21 archivos de `src/data/grammar/ingles/a2/` y los
25 de `/a1/`. Slugs verificados uno a uno (ojo: **cinco slugs de A2 no coinciden con el nombre
del archivo** — `connectors.ts` → `connectors-a2`, `past-continuous.ts` → `past-continuous-a2`,
`prepositions-movement.ts` → `prepositions-movement-a2`, `present-continuous-future.ts` →
`present-continuous-future-a2`, `relative-clauses.ts` → `relative-clauses-a2`, `used-to.ts` →
`used-to-a2`. Quien escriba los datos a mano se va a equivocar).

### 3.1 Lo que el registro A2 de inglés SÍ tiene (21 temas)

`adverbs-manner` · `comparatives` · `connectors-a2` · `first-conditional` · `have-to-must` ·
`past-continuous-a2` · `past-simple-be` · `past-simple-irregular` · `past-simple-questions` ·
`past-simple-regular` · `prepositions-movement-a2` · `present-continuous-future-a2` ·
`present-perfect-basic` · `present-perfect-ever-never` · `present-perfect-vs-past-simple` ·
`quantifiers` · `relative-clauses-a2` · `should-advice` · `superlatives` · `used-to-a2` ·
`will-future`.

### 3.2 Lo que NO tiene, y hace falta para este set

| hueco | a quién afecta | salida |
|---|---|---|
| **`could` de cortesía** | 3 exponentes | bajar a `can` (A1 `can-ability`) **o** abrir tema A2 nuevo. No es decisión del calibrador |
| **`would` hipotético** | 2 exponentes | bajar a `Does that work for you?` / `Does that help?` |
| **preguntas incrustadas** | 3 exponentes | bajar a directa: `When did it start?`, `What day was it?` |
| **números cardinales** | **los seis escenarios** | no existe ningún tema de números en inglés A1 ni A2. Todas las cifras del set quedan sin anclaje. Ver **H16** |
| **`by` de plazo** | `I promise he'll be out by…` (6A) | `prepositions-time` (A1) solo enseña in/on/at. Cambiar a `at eight` o `before eight` |
| **`instead`** | `Can I do Saturday afternoon instead?` (5A) | `connectors-a2` cubre because/so/although/however/but, no `instead`. Es léxico, no estructura: pasa con nota |

### 3.3 El anclaje que sí es fuerte, y conviene no romperlo

Tres aciertos que quiero dejar por escrito porque son lo que hace que el set sea A2 y no A1:

- **`used-to-a2` en el nº 5.** «My bus **used to arrive** at ten to seven, now it arrives at
  quarter past seven» es exactamente el tema, exactamente en su sitio. Es el mejor anclaje del
  set entero.
- **`first-conditional` como motor de `conceder-con-condicion`.** El tema autoriza
  explícitamente `can`/`must`/`have to` además de `will` («If you can come, please let me
  know», línea 31 de `first-conditional.ts`), que es justo lo que hacen `If you…, I can…`,
  `If you give me the date and the time, I can send the report today` y `If I do that, can
  we…?`. Anclaje literal, no de compromiso.
- **`relative-clauses-a2`** (who/which/that) es lo que salva el nº 4: permite glosar un término
  técnico sin salir de A2 — «It's money **which** goes on your next bill». Ver H14.

---

## 4. Comprobación 4 — la ruta mínima · **la que decide**

Para cada escenario, la conversación más corta que llega al cierre cumpliendo todas las
restricciones, con lengua del nivel. Marco entre corchetes el tema del registro que sostiene
cada movimiento difícil. Turnos contados por rol.

> Puerta 11 del blueprint exige que **nadie** lo resuelva en menos de 6 turnos. Las seis rutas
> mínimas están entre 6 y 8 turnos por rol: ninguna colapsa y ninguna se pasa de la horquilla
> A2 (6–9).

### 4.1 · nº 1 `the-bike-in-the-parking-lot` — A 6 · B 6 · **escribible**

```
B1  Good morning. Is this the bike from Marketplace? Can I see it?            [can-ability]
A1  Yes, this is it. I bought it sixteen months ago for six hundred and
    eighty thousand pesos. I have the receipt and the lock.           [past-simple-regular]
B2  It's very nice. Why are you selling it?                              [wh-questions A1]
A2  I don't use it now. It's four hundred and twenty thousand.
B3  That's a bit too much for me. I only have three hundred and sixty
    thousand today.                                                          [quantifiers]
A3  I can't do that. The thing is, it's cheaper than a new one and it has
    the receipt. If you take it today, I can do four hundred thousand
    and I can add a helmet and lights.               [first-conditional + comparatives]
B4  The problem is transport. I came by bus and I have no helmet. Can you
    take it to Cañaveral?
A4  I can't. I have to work until five on Monday. What if we meet at Puerta
    del Sol station on Monday at twelve? It's twenty minutes.  [have-to-must + telling-time]
B5  OK. Half now and half on Friday the eleventh?
A5  If you pay three sixty now and forty thousand on Friday, I'll bring it
    to Puerta del Sol on Monday at twelve. Does that work for you?
                                              [first-conditional + will-future]
B6  Yes. So, we said: four hundred thousand — three sixty now by Nequi and
    forty thousand on Friday the eleventh; you bring it to Puerta del Sol
    station on Monday the seventh at twelve; and it comes with the helmet,
    the lights and the lock. Right?
A6  Right. Same for me.
```

Cuatro datos del cierre: ✔ precio y forma de pago · ✔ quién mueve y hasta dónde · ✔ día y hora
· ✔ qué va incluido. Restricciones: A no dijo la mudanza ✔; A no salió de Puerta del Sol ✔; B
no pasó de 360.000 hoy ✔; B no dijo que es la única ✔.

**Estructura más alta usada: primer condicional.** Correcto para A2.

### 4.2 · nº 2 `no-appointment-until-thursday` — A 6 · B 6 · **escribible**

```
B1  Good afternoon. I have a very bad toothache. Can the doctor see me today?
A1  I'm sorry, but today and tomorrow are full. Let me check… The first free
    appointment with Dr Restrepo is Thursday the tenth at seven a.m.
    When did it start?                                        [past-simple-questions]
B2  On Sunday night. It wakes me up. I take two painkillers a day and each
    one lasts about three hours.                          [present-simple-affirmative A1]
A2  How is it today?                                                 [verb-to-be A1]
B3  Worse. The right side of my face is bigger than yesterday.        [comparatives]
A3  You can also go to the Centro clinic on Calle 36 — an emergency check,
    no appointment, until eight tonight. It's sixty thousand. The Thursday
    appointment is zero: the plan pays for it.
B4  That's a problem for me. I only have fifty thousand and they pay me on
    the fifteenth. Thursday at seven is good — I start work at nine.
A4  Then Thursday the tenth at seven, here in Cabecera. You have to arrive
    ten minutes early: forms and X-ray. Can you confirm your phone, please?
    I have three one five, six two zero, four four, zero nine.         [have-to-must]
B5  That's my sister's. Mine is three zero zero, four one two, eight eight,
    five seven.
A5  Tonight: put something cold on your face, never hot. Don't chew on that
    side. Painkillers every eight hours, not more. If your face gets bigger
    or you have a fever, go to the hospital tonight. Don't wait.
                                            [imperative A1 + first-conditional]
B6  So, Thursday the tenth at seven a.m. in Cabecera, zero pesos, I arrive at
    ten to seven, my phone is 300 412 88 57, and tonight cold, no chewing,
    painkillers every eight hours — and hospital if it gets worse. Right?
A6  Right.
```

Cinco datos del cierre: ✔✔✔✔✔. Dos preguntas abiertas de A antes de proponer: ✔ (`When did it
start?`, `How is it today?`). A no habló de la otra paciente ✔.

**Un agujero real y arreglable:** B tiene que decir «se me hinchó la cara» y **la palabra
inglesa no está en su ficha**. En la ruta de arriba lo resolví con `bigger than yesterday`
[comparatives], que es lo que hará el alumno bueno; el alumno normal dirá «hinchada». Ver
**H5**: la palabra `swollen` está en la ficha de A (`swelling growing`) y no en la de B.

### 4.3 · nº 3 `swap-the-saturday-shift` — A 7 · B 6 · **escribible, y es el techo del set**

```
A1  Can you do me a favour? Can you open on Saturday the twelfth?
B1  Wait a second. Why that Saturday?
A2  I have the IELTS exam at eight in Floridablanca. I finish at half past
    one and the doors close at a quarter to eight — no late entry.
    The thing is, I can't change it.
B2  I'd like to help, but I did two swaps this month, the twenty-eighth and
    the fourth. Wilson said: three swaps and no fixed weekends. And do you
    know about the breakfast? There's a reservation for forty people at nine.
                             [past-simple-irregular + there-is-there-are A1]
A3  I didn't know that. I know it's difficult. What if I do your shift on
    Friday the eighteenth, at night?                             [past-simple-questions]
B3  That's not the same, but OK — only if you write in the group today that
    you asked for the change. And I can't work after eight on Saturday: my
    bus to San Gil is on Sunday at five in the morning.
A4  [carta] Sorry, one more thing. There's a problem: my Speaking test is on
    Saturday at four now. I can be at the café at six, not at three.
                                                  [there-is-there-are A1]
B4  That doesn't work for me. I open at seven and I leave at eight. From
    three to six there's nobody.
A5  Wilson answers his phone at six. I'll call him today at six and I'll
    write in the group before that.                                  [will-future]
B5  OK. So, we said: I open on Saturday the twelfth at seven and I stay
    until eight. You come at six. You do my Friday the eighteenth shift at
    night. The message says you asked for the change. And you call Wilson
    today at six about three to six. Right?
A6  Right — I'll write it now.
B6  Good.
```

Cinco datos del mensaje: ✔✔✔✔✔ (el punto 5 sale con nombre y hora: Wilson, hoy a las seis).

**Escribible, pero es el único donde tuve que pelearme para no salir de A2.** Dos razones, las
dos nombradas abajo: la carta viene en pasiva de present perfect (**H4**) y B llega con tres
condiciones simultáneas (**H7**). Si las dos se dejan como están, la pareja floja no llega y la
pareja fuerte lo resuelve en B1.

### 4.4 · nº 4 `a-charge-i-did-not-make` — A 8 · B 7 · **escribible**

```
A1  Excuse me, I have a problem with this bill. I didn't use this data —
    forty-two thousand pesos for extra data.                 [past-simple-questions]
B1  Good morning. I'm sorry about that. Let me check it in the system.
    When did it start?
A2  In July. Why didn't I get a message? I never got an SMS.
                                          [past-simple-questions + adverbs]
B2  Was the phone with you all month?                              [past-simple-be]
A3  [carta] Yes… no. On Sunday the twenty-sixth of July I gave my phone to
    my nephew, from one to seven. He watched videos and football. There was
    no wifi.                         [past-simple-irregular + past-simple-regular]
B3  Thank you. With that date and that time I can send the report today.
    I can't take off forty-two thousand, but I can do twenty-five thousand.
    A credit note, or extra data — up to eight gigas. Which one do you prefer?
A4  Sorry, what does that mean, a credit note?
B4  It's money which goes on your next bill. You don't pay it in cash.
                                                          [relative-clauses-a2]
A5  I opened this line in 2017 and I've never paid extra data, not once.
    What about the other seventeen thousand?
                     [past-simple-regular + present-perfect-ever-never]
B5  I send the report today. My manager signs on Monday the twenty-fourth.
    I give you a case number here and the answer is on Monday the
    twenty-fourth. I can also block extra data from today — it's free.
A6  If you can do that today, I'll sign now.                     [first-conditional]
B6  Good.
A7  So, we agree: twenty-five thousand as a credit note on my next bill;
    seventeen thousand with a case number and an answer on Monday the
    twenty-fourth; a free block from today. I accept — I don't go anywhere
    else. Is that right?
B7  That's right.
A8  Thank you.
```

Tres datos del cierre: ✔✔✔.

**Sobre la pregunta expresa del encargo (¿el vocabulario de factura empuja esto a B1?): no,
pero por poco, y hoy la ficha no lo sostiene.** El razonamiento, en tres pasos:

1. **Los términos son datos, no conceptos.** `credit note`, `extra data`, `case number`,
   `out-of-plan data` están escritos en inglés en la tabla de datos del rol que los tiene que
   decir. Nombrar un dato escrito no es producción de nivel: es leerlo en voz alta. Eso es A2.
2. **La glosa sí es producción, y sí es A2 —si el tema está anclado.** «It's money **which**
   goes on your next bill» es `relative-clauses-a2` puro. El nivel aguanta.
3. **Pero hoy la ficha pide la pregunta y no financia la respuesta.** A tiene
   `Sorry, what does that mean?`; B **no tiene un solo exponente para contestarla** y su tabla
   de datos da los términos **sin glosa**. El acto `pedir-aclaracion` está declarado en el
   escenario y desfinanciado en la ficha del que tiene que aclarar. Ese es el fallo, y es de
   ficha, no de nivel (**H14**).

Con H14 corregido, el nº 4 **cabe**. Sin corregir, la asesora improvisa una definición y ahí sí
se va a B1 —o al español.

### 4.5 · nº 5 `late-again-on-monday` — A 6 · B 6 · **escribible, el más limpio del set**

```
B1  Come in and close the door. This is the third Monday. What happened?
A1  I'm really sorry about this morning. My bus at ten past six used to
    arrive at ten to seven. Now it arrives at a quarter past seven. There
    are roadworks on carrera 15 — they started on the first of August.
                              [used-to-a2 + past-simple-regular]
B2  I understand, but I have to write something. It's the third time and I
    can't leave it again.                                  [have-to-must + connectors-a2]
A2  Sorry, what do you mean? What goes in my file?
B3  A written warning goes in your file and you lose the August bonus,
    eighty thousand. Or a note in the shop folder only. And I need two
    people for the Saturdays in September. Can you open one Saturday?
A3  What if I start at half past seven? I can take the bus at ten to six,
    but then my son waits thirty minutes alone at the nursery — that's
    eight thousand pesos a day.                              [connectors-a2]
B4  Half past seven is not enough for me. Seven fifteen, and one Saturday.
A4  I can't do Saturday mornings. I can do Saturday the twenty-sixth of
    September — I'm free that day. And I can start at seven fifteen from
    tomorrow.                                                  [can-ability A1]
B5  [carta] If you sign this today, I won't write a warning in your file.
    Entry time, start date, review date.                    [first-conditional + will-future]
A5  If I do that, do I get a written warning? … No? Then I sign now.
B6  So, we agree: a note in the shop folder, no written warning. You start
    at seven fifteen from tomorrow, Tuesday the eighteenth, and we check on
    Monday the thirty-first. And you open on Saturday the twenty-sixth of
    September at seven. Is that right?
A6  That's right.
```

Tres datos del cierre: ✔✔✔. Julián no dijo por qué los sábados por la mañana son intocables ✔.
Don Wilson puso su propio problema en su tercer turno ✔.

**Este es el escenario mejor calibrado del set.** `used-to-a2` hace exactamente el trabajo que
tiene que hacer y no hay ni un solo exponente por encima del nivel salvo `leave it like this`
(H25) y `Let me explain what happened.` (H8).

### 4.6 · nº 6 `the-cousin-on-the-sofa` — A 7 · B 7 · **escribible**

```
A1  Have you got a minute? I need to tell you something. My cousin Andrés is
    coming on Thursday the twentieth. His bus from Cúcuta arrives at half
    past four. He's going to sleep on the sofa.       [have-got A1 + going-to A1]
B1  Wait, how many nights?                                        [quantifiers]
A2  Ten nights — Thursday the twentieth to Sunday the thirtieth.
B2  I'm not saying no, but on Monday the twenty-fourth at nine I have a
    video interview, one hour. I can't do it in my room: the wifi is bad and
    my window is over the bar. I need the living room.        [connectors-a2]
A3  Sorry, I didn't know about that. I promise he'll be out at eight on
    Monday. What if he sleeps in my room? There's a mattress on the floor.
                             [will-future + there-is-there-are A1]
B3  Why is he coming?
A4  I can't tell you why, sorry. It's important.
B4  [carta] There's something else. My mum is coming on Thursday the
    twentieth too, in the afternoon, and she's staying until Tuesday the
    twenty-fifth. She sleeps on the sofa.        [present-continuous-future-a2]
A5  OK. How about this: your mum on the sofa, and Andrés on the mattress in
    my room on Thursday. And Sebastián in 402 is in Barranquilla from the
    twenty-fourth to the thirtieth — he owes me a favour. Maybe Andrés can
    sleep there from Monday. I can't ask him tonight.
B5  If he leaves at eight, I'm OK with it. The living room is mine on Monday
    from eight to eleven.                                    [first-conditional]
A6  Yes. Is that OK for you?
B6  Yes. And there's something else: the landlady wants both signatures
    before the first of September, and two hundred thousand.
A7  I'll sign this week. Let's talk about Sebastián on Sunday, here, at
    seven.                                                        [will-future]
B7  Sunday at seven. So: Andrés on the mattress in your room on Thursday
    the twentieth, your mum — my mum — on the sofa; the living room is mine
    on Monday from eight to eleven; and Sebastián's flat we decide on Sunday
    at seven, here.
```

Tres datos del cierre: ✔✔✔, incluido el tercero (lo que queda sin decidir, con día, sitio y
hora), que es el que más se salta.

---

## 5. Comprobación 5 — los datos duros son decibles

| tipo de dato | ¿lo sostiene el nivel? | notas |
|---|---|---|
| **Horas** (10:15, 4:20, 7:35, 3:40, 8:20, 5:20, 6:40, 7:15) | **sí** | `telling-time` (A1) enseña past/to **y** la forma digital («It's three fifteen»). 7:35 → «seven thirty-five» o «twenty-five to eight»: las dos están en el tema |
| **Fechas** (Thursday 10, Saturday 12, 26 September) | **sí** | `prepositions-time` (A1) da «on Monday, on July 5th» con ordinal |
| **Duraciones** («sixteen months ago», «two hours», «forty minutes») | **sí con `ago`** | `past-simple-regular` cubre `ago`. **`since` + punto de inicio NO**: es B1 (`present-perfect-simple-b1`). Ver H1 |
| **Números de teléfono y cédula** (10 dígitos) | **sí** | se dicen dígito a dígito, y el nº 2 lo exige explícitamente. Es de lo mejor del set: convierte un dato duro en una tarea de habla |
| **Cifras en pesos** | **sin anclaje en el registro** | no existe ningún tema de números cardinales en inglés A1 ni A2. Ver H16. Las de seis dígitos redondas (420.000, 360.000, 80.000) se dicen sin problema; `COP 100,900` (nº 4) y `$1,150,000` (nº 3) son las dos más caras del set |
| **Gigas** («8 GB», «up to 8 GB») | sí | «eight gigas» / «eight gigabytes» |

Nota lateral que no es de este set pero toca este punto: la tabla de `telling-time.ts` da como
alternativa digital de las 3:00 **`three hundred`**, que no es inglés hablado sino formato
militar. No es mío arreglarlo; queda dicho para quien lleve gramática.

---

## 6. Hallazgos (28)

Severidad: **A** = se cae del nivel o rompe una puerta · **B** = hay que cambiarlo antes de
publicar · **C** = nota, no bloquea.

### Severidad A

**H1 · `since` de duración es B1, y el nº 4 lo exige en su propio criterio de éxito.**
El registro A2 tiene present perfect **de experiencia** (`present-perfect-basic`,
`present-perfect-ever-never`: ever/never/already/yet). `for`/`since` de duración está solo en
`present-perfect-simple-b1` y `present-perfect-continuous-b1`. Afecta a:
- **nº 4, ficha A**, criterio de éxito: «Dijiste la cifra exacta **y desde cuándo eres
  cliente**» + dato `2017 — nine years`. En A2 esto **no se puede decir**.
  → *Cambio:* el dato pasa a `I opened this line in 2017` [`past-simple-regular`] +
  `I've never paid extra data, not once` [`present-perfect-ever-never`]. El criterio se
  reescribe: «dijiste desde qué año tienes la línea y que nunca has pagado datos de más».
- **nº 2, ficha B**, dato `two painkillers a day since Sunday`.
  → *Cambio:* `two painkillers a day — the first one on Sunday night`.
- **nº 5, ficha A**, dato `roadworks on carrera 15 since 1 August`.
  → *Cambio:* `roadworks on carrera 15 — they started on 1 August`.
- **nº 6 y nº 5**, situación: «desde hace ocho meses», «hace dos años». No los pide ningún
  criterio ni ningún cierre: se quedan, pero conviene que no aparezcan en inglés en la tabla.

**H2 · `could` no existe en el registro de inglés A1 ni A2.** Comprobado con `grep`: la única
aparición es `couldn't` como pasado de `can` en dos ejemplos de `connectors-a2`. Afecta a
`Could I…?` (1B), `Could you confirm…, please?` (2A), `Could you write it down, please?` (2B).
→ *Cambio:* `Can I…?`, `Can you confirm…, please?`, `Can you write it for me, please?`, todos
sobre `can-ability` (A1). **Si el producto quiere `could` de cortesía en A2 —y hay argumento
para quererlo— la decisión es abrir un tema en el registro, no colar el exponente.** Eso no lo
decide el calibrador.
*Nota para quien escribió el encargo:* la ficha de este agente da por bueno `Could I…?` como
A2. Contra CEFR lo es; **contra este registro, hoy, no**. Manda el registro (§4 del blueprint).

**H3 · La regla que aplicó el redactor es falsa, y aplicarla al resto del set destruye lengua
A2 válida.** «Bajé `Something's changed` a `There's a problem` **por el present perfect**». El
registro A2 de inglés tiene **tres** temas de present perfect. El cambio en sí es bueno
(`there-is-there-are` es más simple y más claro), pero **la razón es incorrecta**, y pasado
como cepillo a los 120 exponentes borraría, entre otras cosas, la única salida A2 que tiene el
nº 4 para su propio criterio de éxito (H1). El cepillo correcto para inglés A2 es:
*present perfect **de duración con for/since**, condicional segundo, pasiva, discurso indirecto
extenso, `could`/`would` fuera de `would like`, preguntas incrustadas y phrasal verbs
separables.* Present perfect de experiencia **se queda**.

**H4 · La carta de complicación del nº 3 está escrita en pasiva de present perfect.**
`your Speaking test **has been moved** to Saturday 12`. Es la única pasiva del set y es
**input que el estudiante tiene que convertir en habla inmediatamente** —es su turno 5 y tiene
que dar la mala noticia. `passive-voice-b1`.
→ *Cambio:* la carta pasa a datos, sin verbo: `New time for your Speaking test: Saturday 12,
4:00 p.m. · Check-in: 3:30 p.m. · Same venue in Floridablanca.` Así el estudiante produce
`There's a problem. My Speaking test is at four now` [`there-is-there-are` + `verb-to-be`], que
es lo que su propio andamiaje ya le ofrece.

**H5 · El dato oculto del nº 2, ficha B, solo existe en español y la palabra inglesa está en la
ficha del otro rol.** «Se te hinchó el lado derecho de la cara» está en la situación, en
español; en su tabla de datos **no hay ninguna forma inglesa** para decirlo. En cambio la
ficha A tiene `swelling growing` como señal de alarma. Resultado: el rol que tiene que decirlo
no tiene la palabra y el que no tiene que decirla, sí. Rompe la puerta 3 al revés: no hay
español calcable, hay español **incalcable**, que es peor —el alumno se pasa al español.
→ *Cambio:* añadir a la tabla de B una fila `Cómo está hoy | the right side of my face is
swollen — bigger than yesterday`, y quitar `swelling` de la ficha de A o dejarlo solo en
`if the swelling gets bigger`.

**H6 · El objetivo de la ficha B del nº 1 reintroduce el acto que la fase 0 excluyó por ser
B1.** La ficha dice: «Salir de aquí con esa bicicleta comprada **por el menor precio
posible**». Eso es regateo abierto, y la propia fase 0 lo descartó por escrito: *«Regatear un
monto es `negociar`: B1. Lo que sí sobrevive es el nº 1, donde A **rechaza** la rebaja y
concede otra cosa»*.
→ *Cambio:* el objetivo de B pasa a un tope fijo, que además ya está en su restricción 1:
«Salir de aquí con la bicicleta **por no más de $360.000 hoy**, y con el transporte resuelto en
voz alta». Con tope fijo, B **rechaza un precio** y **propone otra manera** (los dos, A2) en vez
de regatear.

**H7 · En el nº 3 la ficha B lleva tres condiciones simultáneas: eso ya no es «condición
simple».** §4 autoriza en A2 «conceder poniendo **una** condición simple». B tiene que sostener,
a la vez: (a) que quede escrito hoy en el grupo que el cambio lo pidió el otro, (b) no trabajar
después de las 8 del sábado 12, y (c) que la pérdida de propina se compense «con algo más que
un turno». Tres variables cruzadas + reapertura del trato tras la carta = `negociar`.
→ *Cambio:* **cae la (c)**. La restricción de la propina sale de la ficha (y con ella el dato
`Sábado 19 · 60-person wedding · $110,000` deja de ser palanca y pasa a color). Quedan dos
variables —quién abre y hasta qué hora se queda—, que es justo lo que la carta necesita para
producir el acuerdo parcial. **Este cambio toca el motor de la fase 1**, no solo la ficha.

### Severidad B

**H8 · Tres preguntas incrustadas sin anclaje en A1, A2 ni B1.**
`Can you tell me when it started?` (4B) → `When did it start?` [`past-simple-questions`].
`Do you remember what day it was?` (4B) → `What day was it?` [`past-simple-be`].
`Let me explain what happened.` (5A) → `Can I explain?` [`can-ability` A1].
Las dos primeras ya existen en su forma directa en el nº 2 y el nº 5: el propio set trae la
versión buena.

**H9 · `would` hipotético sin anclaje.** `Would that work for you?` (1A) → `Does that work for
you?`, que es **literalmente la fila equivalente de la ficha B del mismo escenario**.
`Would that help?` (3A) → `Does that help?` [`present-simple-questions` A1]. (`I'd like to
help, but…` en 3B **se queda**: `would like` sí está anclado en `like-ing` A1.)

**H10 · `Could you write it down, please?` acumula dos problemas**: `could` (H2) y phrasal verb
separable con pronombre entre verbo y partícula, que es `phrasal-verbs-common-b1`.
→ *Cambio:* `Can you write it for me, please?`

**H11 · `Can you put that in writing?` (3B) es modismo de registro administrativo.** Además no
es lo que el cierre del escenario pide: el cierre habla del **mensaje al grupo del café**.
→ *Cambio:* `Can you write it in the group today?` — más simple, más A2 y más pegado a la tarea.

**H12 · Participios pasivos y nominalizaciones en los valores de datos.** Se leen y se acaban
diciendo:
- nº 2A `covered by the plan` → `the plan pays for it` · `walk-in emergency check` →
  `emergency check, no appointment` · `A&E` → `hospital emergency` (además `A&E` es británico y
  opaco para este público).
- nº 4B `case number given at the counter` → `we give you a case number at the counter` ·
  `free block on out-of-plan data` → `free block, no extra data`.
- nº 5B `verbal warning logged in the shop folder` → `a note in the shop folder` ·
  `personnel file` → `your file`.
- nº 3A `no free rescheduling` → `you can't change the date — no refund`.

**H13 · Español dentro de un valor de dato en inglés.** nº 3B: `third swap → lista de refuerzo:
no more fixed weekends`. La convención del propio archivo dice que los **valores** van en
inglés. → `back-up list`.

**H14 · El nº 4 declara `pedir-aclaracion` y no lo financia en la ficha que tiene que
aclarar.** A tiene `Sorry, what does that mean?`; B **no tiene ni un exponente para responder**
y sus términos técnicos van sin glosa. → *Cambios, tres:*
1. Añadir a la tabla de B una columna de glosa, en inglés y corta:
   `credit note` → *money which goes on your next bill, not cash*;
   `case number` → *a number for your complaint*;
   `extra data` → *data over your 8 GB*.
2. Añadir dos exponentes a B: `It means…` y `It's money which goes on your next bill.`
   [`relative-clauses-a2`] — y así el tema de relativo, que hoy no lo usa nadie en el set, entra
   por la puerta que le corresponde.
3. Unificar el término: hoy conviven `out-of-plan data` (ficha A) y `extra data` (ficha B) para
   la misma cosa. Que sea `extra data` en las dos.

**H15 · `The thing is…` está en 6 de las 12 fichas** (1A, 2B, 3A, 4A, 5A, 6B). No es un
problema de nivel —es un chunk cerrado, se queda— sino de reparto: la mitad del set arranca la
razón con la misma muleta. → Sustituir en dos fichas por `Because…` / `The problem is…`
[`connectors-a2`].

**H16 · Ninguna cifra del set tiene anclaje: no hay tema de números en el registro de inglés.**
No es culpa de las fichas, pero condiciona qué cifras se ponen. → Mientras el registro no tenga
un tema de números, mantener las cantidades a **tres cifras significativas redondas**. Las dos
que hoy se salen: `COP 100,900` (nº 4A, y encima es una suma que el alumno tiene que decir
entera) y `$1,150,000` (nº 3A). La primera puede decirse como `58,900 + 42,000` sin decir el
total; la segunda puede bajar a `over a million pesos`.

**H17 · Ortografía inconsistente entre fichas.** `Can you do me a favor?` (3A, americano) vs
`owes you a favour` (6A, británico). Igual con `A&E` (británico) en el nº 2. → Elegir una
variedad para el set entero. Para este público, americano.

**H18 · Las fichas 1-3 y las 4-6 no tienen la misma forma.** Las 4-6 traen la tabla de
metadatos por escenario y la línea «Te tocan unos N turnos» dentro de cada ficha; las 1-3 no
traen ni una cosa ni la otra. El estudiante del nº 1 no sabe cuántos turnos le tocan y el del
nº 4 sí. → Igualar (poner metadatos y turnos también en 1-3).

**H19 · `by` de plazo no está en el registro.** `I promise he'll be out by…` (6A);
`prepositions-time` (A1) enseña in/on/at. → `I promise he'll be out at eight.`

**H20 · Discurso indirecto obligado por los datos, en dos sitios.** nº 3B `Lo que dijo Wilson
delante de todos` y nº 5B carta `Lo que ya le contaron`. Una sola cláusula con `said`/`says` no
es «discurso indirecto **extenso**» y `past-simple-irregular` sostiene `said`. **Pasa**, pero
que la ficha lo deje en una cláusula: si el dato crece, el escenario sube de nivel solo.

### Severidad C

**H21 · Modismos por encima del nivel, sustituibles sin perder nada.**
`I know it's a lot to ask.` (3A) → `I know it's difficult.`
`If I do that, can we leave it like this?` (5A) → `If I do that, do I get a written warning?`
`That's my last price.` (1A) → se queda: es transparente y funciona.

**H22 · `already` + past simple** en nº 2A (`she already stayed late on Monday`). El registro
A2 enseña `already` con present perfect (`present-perfect-ever-never`). Es coloquial americano
correcto, pero contradice lo que el alumno acaba de estudiar. → `she stayed late on Monday`.

**H23 · `hoja de compromiso` no tiene nombre en inglés en la tabla del nº 5B.** El valor da su
contenido (`entry time + start date + review date + signature`) pero no cómo se llama, y don
Wilson tiene que nombrarla. → añadir `commitment sheet`.

**H24 · `the manager counts every empty chair against reception`** (2A) es idiomático y opaco.
Es motivación, no se dice en voz alta; pero si el alumno lo intenta, se estrella. → `the manager
is angry about empty appointments`.

**H25 · `Is it possible to…?`** (2B) no tiene tema que lo sostenga. Es una fórmula frecuente y
transparente; se queda como chunk, documentado como tal.

**H26 · `Puerta del Sol station is the furthest you can go`** (1A) mete superlativo irregular +
relativa reducida en la misma línea. `superlatives` cubre `the furthest`; la relativa reducida
no. → `the furthest station for me: Puerta del Sol, twenty minutes`.

**H27 · Cinco slugs de A2 no coinciden con el nombre de su archivo** (`connectors-a2`,
`past-continuous-a2`, `prepositions-movement-a2`, `present-continuous-future-a2`,
`relative-clauses-a2`, `used-to-a2`). Quien copie los `grammarReferences` mirando el árbol de
archivos va a escribir `connectors` y `relative-clauses`, y el enlace va a romper en silencio.
Los de §7 de este documento están tomados del campo `slug`, no del nombre de archivo.

**H28 · `grammarReferences` no tiene dónde poner el nivel, y la mitad de los anclajes buenos son
de A1.** El tipo del blueprint §7 es `{ slug, title, rationale }` y el resolvedor natural es
`getTopicBySlug(language, level, slug)` con el `level` del escenario. Con `level: 'a2'`,
`can-ability`, `telling-time`, `imperative`, `there-is-there-are`, `going-to`, `have-got`,
`wh-questions` y `prepositions-time` **no resuelven**: son A1. Anclar a un nivel inferior es
legítimo —el A2 arrastra el A1— pero el tipo no lo sabe expresar. → Para
`habla-integracion`: añadir `level: 'a1' | 'a2' | 'b1'` al tipo, o que el resolvedor caiga hacia
abajo. En §7 de este documento marco el nivel de cada referencia por si sirve de insumo.

---

## 7. Las tres verificaciones que pidió el encargo, respondidas de frente

**1. «Bajé `Something's changed` a `There's a problem` por el present perfect.»**
El cambio está bien; la razón, no. **El registro de inglés A2 tiene tres temas de present
perfect** (`present-perfect-basic`, `present-perfect-ever-never`,
`present-perfect-vs-past-simple`). Lo que sí es B1 es el present perfect **de duración con
for/since**, y ese sí está en el set, tres veces, una de ellas dentro de un criterio de éxito
que sin él no se puede cumplir (H1). Pasado el cepillo correcto a los 120: **0 present
perfects, 0 condicionales segundos, 0 pasivas, 0 discursos indirectos**. Lo que hay es otra
cosa: 4 modales sin anclaje, 3 preguntas incrustadas y 1 phrasal separable (H2, H8, H9, H10).

**2. «Lo más alto que hay es un primer condicional anclado en `first-conditional.ts`.»**
**Confirmado contra el registro real.** El archivo existe, su `slug` es `first-conditional`, su
`title` es *«El Primer Condicional en Inglés A2»*, y en su línea 31 autoriza expresamente
`can`, `must` y `have to` en la cláusula `if`, que es exactamente lo que hacen `If you…, I
can…`, `If you give me the date and the time, I can send the report today` y `If I do that,
can we…?`. **Corrección al enunciado:** el condicional es lo más alto **de los exponentes**,
pero no lo más alto **de las fichas**: la carta de complicación del nº 3 trae una pasiva en
present perfect (H4), que está por encima. El techo real del set está en una carta, no en un
andamiaje.

**3. «¿El vocabulario de factura telefónica empuja el nº 4 a B1?»**
**No, y la ruta mínima de §4.4 lo demuestra: la escribí entera en A2.** Los términos son datos
escritos en inglés en la tabla del rol que los dice, y decir un dato escrito no es producción de
nivel. La glosa sí lo es, y `relative-clauses-a2` la sostiene: *«It's money which goes on your
next bill»*. **Lo que sí falla es la ficha:** el acto `pedir-aclaracion` está declarado, la
pregunta está en la ficha de A, y **la respuesta no está en ninguna parte** —B no tiene
exponente para aclarar ni glosa para sus propios términos (H14). Sin ese arreglo, la asesora
improvisa una definición y ahí sí se va a B1, o al español. Con el arreglo, cabe.

---

## 8. `grammarReferences` — listos para pegar

Slugs tomados del campo `slug` de cada archivo, no del nombre de archivo (H27). Marco el nivel
en comentario porque el tipo actual no lo admite (H28).

```ts
// 1 · the-bike-in-the-parking-lot
grammarReferences: [
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion vive aquí: "If you take it today, I can do 400,000". Es la estructura más alta del escenario y el tema autoriza can/have to en la cláusula if.' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'El precio se rechaza comparando, no regateando: "that\'s more than I have", "it\'s cheaper than a new one".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'El tope del comprador se dice con cuantificadores: "I only have…", "that\'s a bit too much", "half now".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'El vendedor justifica por qué no lleva la bici a Floridablanca: "I have to work until five on Monday".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El pago partido se compromete en will: "I\'ll pay forty thousand on Friday the eleventh".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'El historial de la bicicleta se cuenta con past simple + ago: "I bought it sixteen months ago". Con ago, nunca con since.' }, // a2
  { slug: 'prepositions-movement-a2', title: 'Preposiciones de movimiento en Inglés A2: into, out of, past, through, along',
    rationale: 'El transporte es la segunda variable del trato: "take it to Puerta del Sol", "it goes through Cabecera".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene todas las peticiones del comprador ("Can I…?", "Can you keep it until…?") y sustituye a los Could I…? que el registro no ancla.' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El cierre exige día y hora exactos de la entrega: sin la hora no hay cierre.' }, // a1
],

// 2 · no-appointment-until-thursday
grammarReferences: [
  { slug: 'should-advice', title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Ancla el acto recomendar en las dos direcciones: "What should I do tonight?" y el consejo del mostrador.' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'La señal de alarma es un condicional: "If it gets worse, go to the hospital tonight".' }, // a2
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'Las dos preguntas abiertas que el criterio de éxito exige antes de proponer nada: "When did it start?".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'La obligación de llegada: "You have to arrive ten minutes early — forms and X-ray".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Dosis y dinero: "two painkillers a day", "every eight hours, not more", "I only have fifty thousand".' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'El paciente describe cómo está hoy comparando: "it\'s worse than yesterday", "the right side is bigger".' }, // a2
  { slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'El aviso que nunca llegó: "I\'ve never got a reminder". Experiencia, no duración: for/since sería B1.' }, // a2
  { slug: 'imperative', title: 'El imperativo en inglés A1',
    rationale: 'Las instrucciones de esta noche son imperativos: "Put something cold on it", "Don\'t chew on that side".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'La cita lleva hora de cita y hora de llegada, y las dos se dicen en voz alta en el cierre.' }, // a1
],

// 3 · swap-the-saturday-shift
grammarReferences: [
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'La condición bajo la que B acepta: "If you write it in the group today, I\'ll open on Saturday".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'La devolución con fecha y la parte pendiente: "I\'ll do your shift on Friday the eighteenth", "I\'ll call Wilson at six".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'La razón del favor es una obligación externa: "I have to be there at a quarter to eight — no late entry".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Pedir un favor y rechazarlo son el mismo movimiento con because y but: "I\'d like to help, but I did two swaps".' }, // a2
  { slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Los dos cambios ya hechos y la única cita admitida: "I did two swaps", "Wilson said no more fixed weekends". Una cláusula, no más.' }, // a2
  { slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Los planes cerrados con billete o inscripción pagada: "I\'m taking the IELTS on Saturday", "my bus is leaving at five".' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'B mide si el cambio es parejo: "that\'s not the same", "the nineteenth is worse for me".' }, // a2
  { slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'El dato oculto de B y el aviso de la carta salen igual: "There\'s a reservation for forty people", "There\'s a problem".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El mensaje del grupo lleva cinco datos y cuatro son horas: sin la hora no hay mensaje.' }, // a1
],

// 4 · a-charge-i-did-not-make
grammarReferences: [
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La queja entera se sostiene en el negativo de pasado: "I didn\'t use this data", "Why didn\'t I get a message?".' }, // a2
  { slug: 'past-simple-be', title: 'Past Simple de "to be" en Inglés A2',
    rationale: 'La pregunta incómoda de la asesora, sin acusar a nadie: "Was the phone with you all month?".' }, // a2
  { slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'El historial del cliente en A2: "I\'ve never paid extra data, not once". Es la salida al since de duración, que sería B1.' }, // a2
  { slug: 'relative-clauses-a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'Sin este tema el acto pedir-aclaracion no tiene respuesta: "It\'s money which goes on your next bill".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'Las dos condiciones cruzadas del mostrador: "If you give me the date and the time, I can send the report today" / "If you can do that today, I\'ll sign now".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'El acuerdo es parcial y se dice en cantidades: "part of it", "up to eight gigas", "the other seventeen thousand".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El compromiso de cada lado: "I\'ll sign now", "we\'ll answer on Monday the twenty-fourth".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'El dato técnico que la asesora necesita para radicar: "he watched videos all afternoon", "I opened this line in 2017".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'El tope de la asesora se dice negando y ofreciendo en la misma frase: "I can\'t do that, but I can…".' }, // a1
],

// 5 · late-again-on-monday
grammarReferences: [
  { slug: 'used-to-a2', title: 'Used to en Inglés A2: hábitos y estados del pasado',
    rationale: 'El corazón de la explicación de Julián y el mejor anclaje del set: "My bus used to arrive at ten to seven — now it arrives at a quarter past".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion del supervisor: "If you sign this today, I won\'t write a warning in your file".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'El supervisor no regaña, se ampara en una obligación: "I understand, but I have to write something".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La causa se fecha en pasado, no con since: "the roadworks started on the first of August".' }, // a2
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'Las dos preguntas abiertas que el criterio exige antes de decidir: "What happened?", "What time did you leave?".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El compromiso con hora y día de comienzo: "I\'ll start at seven fifteen from tomorrow".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Razón y contraste en la disculpa: "I\'m sorry, but the bus arrives late because of the roadworks".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Julián cierra una puerta sin dar el motivo: "I can\'t do Saturday mornings", y abre otra: "Can I do Saturday afternoon?".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El escenario entero son horas —7:00, 7:35, 6:40, 7:15— y el cierre exige decir la hora de entrada en voz alta.' }, // a1
],

// 6 · the-cousin-on-the-sofa
grammarReferences: [
  { slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Las tres noticias del escenario son planes cerrados con billete comprado: "He\'s coming on Thursday", "my mum is arriving on Thursday too".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'La condición de Laura, que es la que desbloquea el acuerdo: "If he leaves at eight, I\'m OK with it".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El compromiso con hora y la firma del contrato: "I promise he\'ll be out at eight", "I\'ll sign this week".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Lo que se negocia no es dinero, es un número de noches: "how many nights?", "six nights instead of ten".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Laura no cierra la puerta y pone su problema con el mismo but: "I\'m not saying no, but on Monday I have an interview".' }, // a2
  { slug: 'going-to', title: 'Going to en inglés A1',
    rationale: 'La mala noticia se da en futuro planeado, que es lo que la hace sonar a hecho consumado: "He\'s going to sleep on the sofa".' }, // a1
  { slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'El inventario de la casa y la apertura del segundo tema: "There\'s a mattress on the floor", "There\'s something else".' }, // a1
  { slug: 'prepositions-time', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Todo el reparto de la sala se dice con on/from/to/before: "on Thursday the twentieth", "from the twenty-fourth to the thirtieth", "before the first of September".' }, // a1
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Dani sostiene lo que no puede contar y Laura pide otra salida: "I can\'t tell you why, sorry", "Can we do it another way?".' }, // a1
],
```

---

## 9. Qué se devuelve y a quién

**A `habla-fichas-de-rol`** — todo lo que es texto de ficha: H1 (los tres datos con `since`),
H2, H5, H8, H9, H10, H11, H12, H13, H14, H15, H16, H17, H18, H19, H21, H22, H23, H24, H26. Son
sustituciones nombradas una a una arriba; ninguna obliga a repensar un escenario.

**A quien escribió la fase 1 (el motor)** — H4 (la carta del nº 3 se reescribe como datos),
H6 (el objetivo de B en el nº 1 pasa de «el menor precio posible» a un tope fijo) y H7 (cae la
tercera restricción de B en el nº 3). Los tres tocan el motor, no la redacción.

**A `habla-integracion`** — H27 (los seis slugs con sufijo `-a2` que no coinciden con el nombre
de archivo) y H28 (`grammarReferences` necesita `level`, o el resolvedor tiene que caer hacia
niveles inferiores; hoy la mitad de los anclajes buenos son A1 y no resolverían).

**A quien lleve el registro de gramática** — dos decisiones de producto que no son del
calibrador: si inglés A2 debe tener un tema de **`could` de cortesía** (H2) y un tema de
**números cardinales** (H16). Y de paso, el `three hundred` de la tabla de `telling-time.ts`.

**Lo que NO hay que tocar:** el reparto del set (§5 del blueprint) no se mueve con ninguno de
estos cambios. Ningún acto cambia de etiqueta, ningún `outcome` se mueve, ningún poder se
invierte. Los 28 hallazgos se arreglan dentro de la casilla que cada escenario ya ocupa.
