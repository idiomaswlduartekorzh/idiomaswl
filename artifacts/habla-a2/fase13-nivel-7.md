# Fase 13 · Calibrador de NIVEL — escenario 7 `two-more-people-for-the-trip`

Auditado: `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md` **tal como está en
disco hoy, 22 ago 2026** (commit `ed220acf`), después de las tres pasadas del día: carga, recorte
y calcabilidad. Nada se da por bueno por lo que declare el propio archivo.

**Cifra viva, medida ahora con `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`:
ROLE A 449 · ROLE B 438** (techo 450). La tabla de la pasada quirúrgica que declara 446/442 y la
de la pasada de carga que declara 449/442 son de su día; solo la de arriba vale.

> **VEREDICTO: CABE CON CAMBIOS.**
>
> Los actos siguen siendo A2 después de la pasada de carga —incluidas las tres líneas por cabeza
> con el precio dentro y la prohibición de asentir— y la ruta mínima del cierre nuevo se escribe
> entera con lengua del nivel. Lo que falla: **una instrucción del cierre pide una estructura que
> el A2 no tiene** (pasiva `what is not decided yet`), **una segunda pide una pregunta incrustada
> con preposición colgada** (`who he gets them from`), **cuatro anclajes siguen sin declararse**
> —dos de ellos ya prescritos en `fase9-nivel-7.md` §6 y no aplicados—, **cinco de las ocho
> frases que tocaron el recorte y la calcabilidad subieron de nivel al comprimirse**, y la ruta
> mínima pasó de 8 turnos a 9 de 9: el cierre nuevo se comió todo el margen de §4.
>
> **Nada de esto toca el motor.** Conflicto, asimetría, poder, carta, desenlace aplazado, nombres
> y género quedan intactos. El acto no se sustituye: se sustituyen once líneas y se declaran
> cuatro anclajes.

**El dato que cambia la economía de los arreglos.** El contador canónico solo mide lo que hay
bajo `## ROLE A` y `## ROLE B`, y **descarta toda línea que empieza por `|`**. Por lo tanto:
tablas de datos, vocabulario, exponentes, la carta entera y **el bloque de cierre compartido
cuestan cero palabras**. De los quince arreglos de este informe, **once son gratis** y solo
cuatro tocan el presupuesto de prosa.

---

## 1. Bandas de la cabecera (§4)

| | Ficha A | Ficha B | Banda del diseñador | §4 A2 | Veredicto |
|---|---|---|---|---|---|
| Minutos | 7 | 7 | 7 | 5–8 | ✅ |
| Turnos por rol | 9 | 9 | 9 | 6–9 | ✅ **al techo** |
| Exponentes | 9 | 9 | — | 6–9 (§11) | ✅ al techo |
| Filas de datos | 10 | 10 | — | ≤ 10 (§11) | ✅ al techo |
| Vocabulario | 9 | 10 | — | 8–10 (§11) | ✅ |
| Prosa | 449 | 438 | — | ≤ 450 (§11) | ✅ |

**Aviso que sí es nuevo.** `fase9-nivel-7.md` §4 escribió la ruta mínima en **8 turnos por rol** y
dejó uno de margen. Con el cierre de la pasada de carga —tres líneas por cabeza, más la línea
conjunta, más el envío— la ruta mínima de este informe (§4) consume **9 de 9**. Sigue dentro de
§4, pero **el margen es cero**: cualquier reparación de la caja (bloque 3, `Sorry, I didn't catch
that.`, que la ficha de Kevin tiene asignado, o bloque 4, que tiene Valentina) empuja fuera de
banda. Esto no es defecto de nivel; es la factura de la pasada de carga, y quien la cobra es la
simulación. Se nombra aquí para que el número de turnos no se «arregle» bajando el listón del
alumno: si en simulación se pasa, se corrige el número, no la lengua.

---

## 2. Los actos que el escenario exige existen en A2

Motor declarado: `quejarse` + `rechazar` · poder a>b · desenlace **aplazado**.

| Acto exigido | §4 A2 | Con qué se produce | ¿Cabe? |
|---|---|---|---|
| quejarse con educación | sí | `I'm not angry, but …` · `You haven't paid me yet.` · caja 5 | ✅ |
| rechazar de frente, con el número delante | sí (A1 ya) | `There are only six …` | ✅ |
| pedir un favor | sí | `Can I pay you on …?` · caja 1 | ✅ |
| disculparse | sí | `It's my fault, but …` · `I know it's last minute, but …` | ✅ |
| dar una razón | sí | caja 5 (`It's important for me because…`) | ✅ |
| proponer alternativa | sí | la carta (un cupo más, 150.000) y el plan B de las 7:00 | ✅ |
| conceder poniendo una condición simple | sí | `OK — but only if …` · `If you …, I'll …` | ✅ |
| **negociar / regatear** | **no, es B1** | cerrado por escrito en la restricción 1 de Valentina | ✅ evitado |

El punto que decidía el nivel en fase 9 sigue en pie y sigue siendo el correcto: el hueco de
50.000 **no obliga a regatear** porque la restricción 1 de Valentina lo cierra por escrito. Sin
esa línea el escenario sería B1.

### 2.1 Las tres líneas por cabeza, con el precio dentro — una por una

Comprobado contra la ficha **más** `caja-de-herramientas-a2.md`, que es lo único que el
estudiante tiene delante.

**Valentina**

| Línea del cierre | Producción A2 mínima | ¿Le da la ficha la forma? |
|---|---|---|
| camas, nombres y cédulas de la lista, y quién la cambia | `There are only six beds. The gate list has six names and six ID numbers, and only doña Nubia can change it.` | ✅ `There are only six …` + `can` + datos |
| lo que cuesta una persona más, y en qué reserva | `One more person costs 150,000 pesos, on my reservation, not on his.` | ✅ presente simple + cifra glosada en la carta + posesivo |
| **lo que no está decidido**, la llamada de las 7:00 y el plan B | `Doña Nubia doesn't answer at night. She calls me before 7:00 a.m. If she doesn't call, we go with six.` | ⚠️ **parcial — ver hallazgo N-1** |

La tercera es la única que se resiste, y no por falta de contenido: el contenido está en la
carta (`no answer at night`, `her call to you before 7:00 a.m.`) y la forma del plan B está
impresa (`If I don't have it on …, I'll …`, `first-conditional`). Lo que no tiene forma A2 es
**la propia instrucción**: `what is not decided yet` es pasiva, y la pasiva está prohibida en el
nivel por la propia caja. El estudiante que lee la instrucción y calca su forma produce
`*it is not decided*`; el que la esquiva tiene que inventar `nothing is sure`, que tampoco está
en ninguna de las dos pantallas. Se arregla reescribiendo la instrucción, no añadiendo lengua.

**Kevin**

| Línea del cierre | Producción A2 mínima | ¿Le da la ficha la forma? |
|---|---|---|
| nombre y cédula de esta noche, y **de quién los saca** | `I'll send you Sebastián's full name and his ID number tonight. He gives them to me after his shift.` | ✅ `will-future` + `possessive-s` + datos |
| el día exacto del pago, y **qué hace si ese día no está la plata** | `Can I pay you on Tuesday the 25th? If I don't have the money that day, I'll …` | ⚠️ **la forma sí, el dato no — hallazgo N-2** |
| qué le dice a cada uno, **y antes de qué hora** | `Tonight I'll call Sebastián after ten, and I'll talk to Andrea at eight.` | ✅ `will-future` + horas + `prepositions-time` |

La segunda es la que la pasada de carga encareció a propósito, y es la única de las seis que
pide **contenido que la ficha no tiene**: los diez datos duros de Kevin no traen ningún día de
cobro, ningún ahorro y ninguna tercera persona a quien pedirle. La lengua está (primer
condicional, impreso en su tabla); lo que el estudiante tiene que inventar es el hecho. Valentina
sí tiene su plan B servido por la carta. Es asimetría de datos dentro del cierre nuevo, no de
nivel — pero se paga en silencio, que es exactamente lo que la pasada de carga quería quitar.

### 2.2 La prohibición de asentir — cabe, pero choca con dos exponentes impresos

La regla dice: *«Nobody nods their way through. Yeah, sure, okay, fine and that works are none of
the six lines.»* Producir acuerdo **con contenido** sí es A2 y sí está servido: `OK — but only if
…` (A), `OK — I'll say it like this: …` (B), `So, we're clear then.` (caja 2), `Wait — we didn't
say that.` (A) para el «cambia una cosa». La regla es producible.

El defecto es de redacción: **los dos exponentes con los que se concede empiezan literalmente por
`OK`**, una de las cinco palabras prohibidas. Un juez que aplique la regla al pie de la letra
descalifica la línea que la ficha imprime para cumplirla. La regla quiere prohibir el asentimiento
**a secas**, y no lo dice.

---

## 3. Cada exponente, uno por uno → tema del registro

Verificado slug a slug contra `src/data/grammar/ingles/{a1,a2}/`. Ninguno de los 18 usa nada de la
lista negra: no hay `could` de cortesía, ni pasiva, ni pregunta incrustada, ni `would rather`, ni
present perfect de duración con `for/since`.

**ROLE A — Valentina**

| # | forma | tema que la sostiene | slug · nivel | ¿declarado? |
|---|---|---|---|---|
| 1 | `Who exactly is …?` | Preguntas con WH en inglés A1 | `wh-questions` · a1 | ✅ |
| 2 | `Why didn't you tell me …?` | Preguntas y Negativos en Past Simple A2 | `past-simple-questions` · a2 | ✅ |
| 3 | `Wait — we didn't say that.` | El imperativo A1 (`Wait`) + Past Simple negativo A2 + Demostrativos A1 (`that`) | `imperative` · `past-simple-questions` · **`demonstratives`** | ⚠️ falta el 3.º |
| 4 | `That's it — I'll send …` | Futuro con Will A2 + Verb to be A1 + Demostrativos A1 | `will-future` · **`verb-to-be`** · **`demonstratives`** | ⚠️ faltan 2 |
| 5 | `I'm not angry, but …` | Verb to be A1 (negativo, contracción) + Conectores A2 (`but`) | **`verb-to-be`** · `connectors-a2` | ⚠️ falta 1 |
| 6 | `OK — but only if …` | Conectores A2 (`but`) + Primer condicional A2 (cláusula if) + Cuantificadores A2 (`only`) | `connectors-a2` · `first-conditional` | ✅ |
| 7 | `If I don't have it on …, I'll …` | Primer condicional A2 + Preposiciones de tiempo A1 + Pronombres objeto A1 (`it`) | `first-conditional` · `prepositions-time` · **`object-pronouns`** | ⚠️ falta 1 |
| 8 | `There are only six …` | There is / There are A1 | `there-is-there-are` · a1 | ✅ |
| 9 | `You haven't paid me yet.` | Present Perfect con Ever, Never, Already y Yet | `present-perfect-ever-never` · a2 | ✅ |

**ROLE B — Kevin**

| # | forma | tema que la sostiene | slug · nivel | ¿declarado? |
|---|---|---|---|---|
| 1 | `What do I say to …?` | Preguntas con WH A1 (el tema trae `What + is/do/does?`) | `wh-questions` · a1 | ✅ |
| 2 | `When did that change?` | Preguntas y Negativos en Past Simple A2 + Demostrativos A1 | `past-simple-questions` · **`demonstratives`** | ⚠️ falta 1 |
| 3 | `We're good, right?` | Verb to be A1 (contracción `we're`) | **`verb-to-be`** · a1 | ❌ **sin declarar** |
| 4 | `I know it's last minute, but …` | Present simple afirmativo A1 + Verb to be A1 + Conectores A2 | **`verb-to-be`** · `connectors-a2` | ⚠️ falta 1 |
| 5 | `It's my fault, but …` | Verb to be A1 + Adjetivos posesivos A1 + Conectores A2 | **`verb-to-be`** · **`possessive-adjectives`** · `connectors-a2` | ⚠️ faltan 2 |
| 6 | `OK — I'll say it like this: …` | Futuro con Will A2 + Pronombres objeto A1 (`it`) + Demostrativos A1 (`this`) | `will-future` · **`object-pronouns`** · **`demonstratives`** | ⚠️ faltan 2 |
| 7 | `If you …, I'll …` | El Primer Condicional en Inglés A2 | `first-conditional` · a2 | ✅ |
| 8 | `Can I pay you on …?` | Can para habilidad A1 (el tema enseña permiso y petición) + Preposiciones de tiempo A1 | `can-ability` · `prepositions-time` | ✅ |
| 9 | `They paid me on …` | Past Simple Irregulares A2 + Preposiciones de tiempo A1 + Pronombres objeto A1 | `past-simple-irregular` · `prepositions-time` · **`object-pronouns`** | ⚠️ anclaje débil, ver abajo |

**Ningún exponente se cae.** Los 18 tienen tema de A1 o A2 que sostiene su forma principal. Dos
observaciones que no llegan a echar nada:

1. **`They paid me on …` tiene el anclaje más flojo de los 18.** `past-simple-irregular` lista
   diez verbos en su tabla (`go/went`, `come/came`, `have/had`, `see/saw`, `say/said`, `get/got`,
   `make/made`, `take/took`, `know/knew`, `buy/bought`) y **`pay/paid` no está entre ellos**:
   aparece una sola vez, en la nota de pronunciación de `said` («rima con bed, no con paid»), que
   presupone que el alumno ya lo conoce. El *rationale* de la ficha dice exactamente esto y por
   eso **no miente** — pero si se quiere anclaje duro, la forma equivalente con verbo listado es
   `They gave me the money on …` (`give/gave` sí está en la tabla). Coste: **0** (fila de tabla).
   Recomendación: **dejarlo**, con el *rationale* como está. Es honesto y `paid` ya vive en el
   vocabulario del propio rol (`to pay someone back`).
2. **`right?` en `We're good, right?` no tiene tema.** Las *question tags* son B1 y el registro no
   las trae en ningún nivel. Aquí `right?` funciona como coletilla léxica invariable, no como tag
   gramatical (no hay que concordar auxiliar ni polaridad), así que **se queda**: no obliga a
   ninguna estructura. Se nombra para que nadie lo «arregle» convirtiéndolo en `aren't we?`, que
   sí sería B1.

### 3.1 Etiquetas de las filas — dos cosas vistas de paso (no son mías)

No es mi puerta, pero se ven desde aquí y §11 las nombra literalmente:

- **`six beds, six names` (A, fila 8) lleva dentro las palabras literales del cierre.** §11:
  «una etiqueta que dice *cuándo* —o que lleva dentro las palabras literales del cierre— le
  devuelve el orden al estudiante». La primera línea del cierre de Valentina es «cuántas camas
  hay, cuántos nombres y cédulas lleva la lista». Sustituto que nombra función y no rompe el
  alfabético (cae entre `putting a price on a yes` y `saying what happens if`, ni primera ni
  última): **`refusing with a number`**. Coste 0.
- **La fila que concede se llama `putting a price on a yes`**, y §11 pide literalmente
  `granting it` («nunca `yes, with a condition` ni `your condition`»). Posición actual 6 de 9;
  con `granting it` quedaría 4 de 9, tampoco primera ni última. Coste 0.

Las dos son del auditor de tablas / calcabilidad. Se pasan, no se aplican.

---

## 4. La ruta mínima — el cierre nuevo, escrito entero, solo con lengua A2

Kevin abre. La carta se abre tras el turno global 3 y Valentina la juega en el turno global 4
(su segundo). **9 turnos por rol, que es el techo de §4.** Entre corchetes, las seis líneas del
cierre.

```
K1  Hi — can we talk for a second? I know it's last minute, but Sebastián and Andrea want to come.
V1  You haven't paid me yet. There are only six beds. Who exactly is Andrea?
K2  A friend from work. It's my fault, but they paid me on Tuesday — 100,000 each.
V2  Why didn't you tell me on Tuesday?  [carta]  Doña Nubia can put one more person. It's
    150,000 pesos for two nights, and it goes on my reservation.
K3  One person, not two? When did that change?
V3  Wait — we didn't say that. The sixth place is Hernán's. He puts his car and his gas.
K4  They're 50,000 short. If you say yes to one, I'll send the name and the ID number tonight.
V4  OK — but only if the 150,000 comes with the name. I put in my part, and nobody puts in more.
K5  What do I say to Sebastián?
V5  Doña Nubia doesn't answer at night. Nothing closes tonight.
K6  OK — I'll say it like this:  [1]  I'll send you Sebastián's full name and his ID number
    tonight. He gives them to me after his shift, at ten.
V6  [1]  There are only six beds. The gate list has six names and six ID numbers, and only
    doña Nubia can change it.
K7  [2]  Can I pay you on Tuesday the 25th? If I don't have it that day, I'll pay 50,000 on
    Tuesday and 50,000 on Friday.
V7  [2]  One more person costs 150,000 pesos, on my reservation, not on his.
K8  [3]  Tonight I'll call Sebastián after ten, and I'll talk to Andrea at eight.
V8  [3]  Doña Nubia calls me before 7:00 a.m. If she doesn't call, we go with six.
K9  My car leaves at 8:00 with five people. Hernán's car has four seats.
V9  Hernán's car is at the mechanic's — the mechanic calls at 7:00 a.m. So: six people, one car
    for sure. That's it — I'll send the message.
```

**La ruta cierra:** seis líneas, ninguna repetida, dos cifras dichas en voz alta antes del
mensaje (`six people`, `one car`), la fecha de Kevin con su consecuencia dentro (K7), la línea
conjunta de los carros (K9+V9) y el envío. **Y se escribe sin salir de A2.** Esta es la prueba
que decide, y la pasa.

**Tres cosas que la ruta enseña y que no se ven leyendo la ficha:**

1. **Consume los 9 turnos.** Cero margen (§1).
2. **V5 (`Nothing closes tonight.`) no está impresa en ninguna pantalla.** El estudiante la tiene
   que fabricar. Es A2 —presente simple + `nothing`— pero es exactamente el punto donde la
   simulación 7 registró la fuga al español. La carta sí da la materia prima (`no answer at
   night`), que es lo que la hace producible; la instrucción del cierre, en cambio, la pide en
   pasiva. Ver **N-1**.
3. **K7 obliga a inventar el viernes.** La lengua está; el dato no. Ver **N-2**.

---

## 5. Los datos duros son decibles

| Dato | ¿Cómo se dice? | Tema | Veredicto |
|---|---|---|---|
| 600.000 · 100.000 · 200.000 | glosados en la tabla del rol | — (no hay tema de numerales) | ✅ |
| 150.000 | glosado en la carta | — | ⚠️ **la glosa es británica**, ver N-8 |
| 50.000 | entra como fila de vocabulario (`to be 50,000 short`) | — | ✅ |
| 7:20 p. m. · 8:00 a. m. · 7:00 a. m. · 7:41 p. m. · 10:00 p. m. | `at 8 a.m.`, `at 3:30 p.m.` | `telling-time` a1 + `prepositions-time` a1 | ⚠️ **sin declarar** |
| July 30 · August 21 | `on + fecha: on June 15` | `prepositions-time` a1 | ✅ |
| **Tuesday the 25th** | ordinal hablado (`the twenty-fifth`) | **ningún tema** | ⚠️ ver N-7 |
| the sixth (place) | ordinal | **ningún tema** | ⚠️ mismo hueco |
| 1 hour 30 | `an hour and a half` | — | fila de tabla, no se toca |

**Hueco del registro, no de la ficha (para quien lleva `src/data/grammar`).** El inglés A1/A2 no
tiene **ningún tema de numerales, ordinales ni fechas**: comprobado, no existe `numbers`,
`ordinals` ni `dates` en `src/data/grammar/ingles/{a1,a2}/`. Por eso las fichas glosan a mano las
cifras de seis dígitos, que es el apaño correcto. Afecta a los ocho escenarios, no solo a este.
Aquí la consecuencia concreta es que **el único dato de este escenario que se dice en voz alta y
no lleva glosa es un ordinal**: `Tuesday the 25th`, que es justo la línea 2 del cierre de Kevin.

---

## 6. Anclajes — los 11 declarados, verificados; **4 que faltan**

Los once slugs existen, los once títulos son literales y los once están exportados en su
`index.ts`. Sin cambios respecto de `fase9-nivel-7.md` §6, reverificado hoy sobre el archivo:

| slug | nivel | archivo | título en el registro |
|---|---|---|---|
| `past-simple-questions` | a2 | `a2/past-simple-questions.ts` | Preguntas y Negativos en Past Simple A2 |
| `present-perfect-ever-never` | a2 | `a2/present-perfect-ever-never.ts` | Present Perfect con Ever, Never, Already y Yet |
| `past-simple-irregular` | a2 | `a2/past-simple-irregular.ts` | Past Simple Verbos Irregulares en Inglés A2 |
| `first-conditional` | a2 | `a2/first-conditional.ts` | El Primer Condicional en Inglés A2 |
| `will-future` | a2 | `a2/will-future.ts` | El Futuro con Will en Inglés A2 |
| `connectors-a2` | a2 | `a2/connectors.ts` | Conectores en Inglés A2: because, so, although, however, but |
| `there-is-there-are` | a1 | `a1/there-is-there-are.ts` | There is / There are en inglés A1 |
| `can-ability` | a1 | `a1/can-ability.ts` | Can para habilidad en inglés A1 |
| `wh-questions` | a1 | `a1/wh-questions.ts` | Preguntas con WH en inglés A1 |
| `prepositions-time` | a1 | `a1/prepositions-time.ts` | Preposiciones de tiempo en inglés A1 |
| `imperative` | a1 | `a1/imperative.ts` | El imperativo en inglés A1 |

Sufijos: el único con `-a2` es `connectors-a2` y va escrito así (el archivo se llama
`connectors.ts` pero el `slug` declarado dentro es `connectors-a2`; `slug: 'connectors'` no existe
en ningún nivel de inglés). De los cinco slugs de A1 citados no existe variante `-a2`.

Los *rationale* siguen diciendo la verdad: `past-simple-questions` trae `"Did she went?" ❌`;
`first-conditional` trae «en la cláusula if también se pueden usar can, must, have to»;
`can-ability` enseña permiso y petición; `there-is-there-are` trae `There are + number + noun`;
`quantifiers` trae `only three are missing` (que es lo que respalda el `only` de `There are only
six …`); `prepositions-time` trae `on + fecha` y `at 8 a.m.`.

### Los cuatro que faltan

**Dos ya estaban prescritos en `fase9-nivel-7.md` §6 y siguen sin aplicarse** (la pasada
quirúrgica los dejó fuera por escrito: «este encargo era quirúrgico … añadir entradas a
`grammarReferences` no es ninguna de las tres»). Es deuda, no hallazgo nuevo — pero añadir
entradas al bloque ` ```ts ` **cuesta cero palabras de prosa**, porque el contador descarta los
bloques de código. No hay razón de presupuesto para no aplicarlo.

| slug | nivel | qué sostiene | cuántos exponentes |
|---|---|---|---|
| `verb-to-be` | a1 | `We're good, right?` · `I'm not angry, but …` · `It's my fault, but …` · `I know it's last minute, but …` · `That's it — …` | **5 de 18** |
| `demonstratives` | a1 | `Wait — we didn't say that.` · `When did that change?` · `That's it — …` · `… like this` | **4 de 18** |
| `object-pronouns` | a1 | `You haven't paid me yet.` · `They paid me on …` · `Why didn't you tell me …?` · `I'll say it like this` · `If I don't have it on …` | **5 de 18** |
| `telling-time` | a1 | las cinco horas que se pronuncian en los dos roles y en la carta, y la tercera línea del cierre de Kevin («y antes de qué hora») | el cierre entero |

Opcional, y defendible dejarlo fuera: **`possessive-adjectives` (a1)**, que sostiene `It's my
fault, but …` y la segunda línea del cierre de Valentina (`on my reservation, not on his`). Si
se busca lista corta, `verb-to-be` ya cubre el `It's`.

---

## 7. Hallazgos, con arreglo y coste

Numerados N-1…N-11. **Coste = palabras de prosa según el contador canónico.** Margen hoy:
**A tiene 1, B tiene 12.** Once de los quince arreglos valen 0 porque viven en tablas, en la
carta o en el cierre compartido, que el contador no mide.

### Bloqueantes de nivel

**N-1 · El cierre pide una pasiva, y la pasiva no existe en A2.** (línea 210, cierre compartido)

- Hoy: `what is not decided yet, the 7:00 a.m. call, and the plan B if nobody answers before it`
- Entra: `the 7:00 a.m. call, and what she does if nobody answers before it`
- **Coste 0.** El cierre no cuenta para el techo.
- Por qué: la caja prohíbe la pasiva por escrito y no hay tema del registro que la sostenga en
  A2. Con la reescritura, la tercera línea de Valentina se produce entera con
  `will-future` + `first-conditional`, los dos ya anclados, y el contenido sigue saliendo de la
  carta (`no answer at night`). No se pierde ningún punto de la línea: lo que estaba abierto
  sigue siendo lo que ella dice que no se cierra hoy.

**N-2 · La segunda línea de Kevin pide un dato que su ficha no tiene.** (cierre + tabla de datos B)

- El cierre exige «el día exacto que paga **y qué hace si ese día no está la plata**». Los diez
  datos de Kevin no traen ningún día de cobro ni ningún respaldo. La forma está impresa
  (`If you …, I'll …`); el hecho hay que inventarlo, y en A2 inventar un hecho en L2 es donde se
  cambia al español.
- Arreglo, **coste 0** (fila de tabla, pero §11 topa datos en 10 y Kevin está en 10, así que hay
  que fundir dos): fundir `Your car | 5 seats · gas on you` y `The group | 6 people · 2 cars, one
  yours` en **`The group | 6 people · 2 cars · yours: 5 seats, gas on you`**, y con la fila que
  queda libre entrar **`Payday | Friday the 28th`**.
- Alternativa sin tocar datos: rebajar la exigencia del cierre a «qué hace si ese día no está la
  plata **— o a quién se lo pide**», que abre la puerta a `caja 7` (`The person who can do that
  is…`). Coste 0. Menos buena: sigue pidiendo un nombre que no está.

**N-3 · Pregunta incrustada con preposición colgada en la primera línea de Kevin.** (línea 212)

- Hoy: `the full name and the ID number he sends tonight, and who he gets them from`
- Entra: `the full name and the ID number he sends tonight, and who gives them to him`
- **Coste 0.**
- Por qué: `who … from` es pregunta incrustada **y** preposición colgada, dos cosas de la lista
  negra de la caja, en la instrucción que el estudiante lee justo antes de hablar. La versión
  nueva es una relativa `who` + ditransitivo con `to`, las dos anclables (`relative-clauses-a2`,
  `object-pronouns`).

**N-4 · La regla de no asentir descalifica los dos exponentes con los que se cumple.** (línea 223)

- Hoy: `*Yeah*, *sure*, *okay*, *fine* and *that works* are none of the six lines.`
- Entra: `*Yeah*, *sure*, *okay*, *fine* and *that works* are not lines by themselves.`
- **Coste 0** (y −1 palabra en un bloque que no cuenta).
- Por qué: `OK — but only if …` y `OK — I'll say it like this: …` son los dos exponentes que la
  ficha imprime **para** cumplir esta regla, y los dos empiezan por una de las cinco palabras
  prohibidas. La regla quiere prohibir el asentimiento a secas y no lo dice.
- De paso, misma línea: `Nobody nods their way through.` es un modismo muy por encima de A2
  leído. Sustituto: `Nobody agrees without saying something.` Coste 0.

### Prosa que subió de nivel al comprimirse (los seis recortes y las dos reescrituras)

Miradas con lupa, como pedía el encargo. **Dos de las ocho subieron de nivel; una tercera perdió
un dato; cinco están bien.**

**N-5 · `nobody else's`, dos veces, es el recorte que más caro salió.** (línea 42, ROLE A)

- Hoy: `You can pay his part, nobody else's.` … `you put in your part and nobody else's.`
- Entra: `You can pay only his part.` … `you put in only your part.`
- **Coste −3** (A: 449 → 446).
- Por qué: el recorte quitó el `not` de `not somebody else's` y dejó una **aposición contrastiva
  sin marca negativa** (el A2 la lee como suma, no como contraste) sobre un **genitivo de núcleo
  elidido con pronombre indefinido** (`nobody else's ∅`). `possessive-s` (a1) dice literalmente
  «Solo se usa con personas, animales y grupos» y siempre con el sustantivo detrás: ningún tema
  del registro sostiene esta forma. Y es **la restricción que hace A2 el escenario entero** (la
  que cierra el regateo): si se lee mal, el escenario se vuelve B1 en la mesa.

**N-6 · `And his 100,000 is missing.` — el posesivo con cifra.** (línea 51, ROLE A)

- Hoy: `And his 100,000 is missing.`
- Entra: `And his 100,000 pesos are missing.`
- **Coste +1** (pagado de sobra por N-5).
- Por qué: `his 100,000` usa **un numeral como núcleo nominal**, y no hay tema de numerales en el
  registro (§5). Con `pesos`, el numeral vuelve a ser modificador y el posesivo cae dentro de
  `possessive-adjectives` (a1). Segundo motivo: hablado, `his hundred thousand` es una elipsis
  nativa que el A2 no produce, y la ficha lo imprime como modelo. Tercero: `is missing` no está
  glosado en ninguna fila de vocabulario y para un hispanohablante `missing` invita a leer el
  progresivo de *to miss* («está echando de menos»); con el plural `are missing` la lectura
  adjetival queda cerrada.
- **La reescritura de calcabilidad acertó en lo suyo**: sin `you`, verdadera, y deja de duplicar
  el exponente `You haven't paid me yet.` Eso no se toca. Lo que se corrige es la cifra desnuda.
- Mismo defecto, mismo arreglo, en ROLE B línea 125: `Tonight 200,000 leave your pocket` →
  `Tonight 200,000 pesos leave your pocket`. **Coste +1** sobre los 12 de B.

**N-7 · `You have twenty minutes with Andrea.` contradice la tabla de datos.** (línea 113, ROLE B)

- Hoy: `You have twenty minutes with Andrea.` — la tabla dice `Andrea | at the parking lot in 20
  minutes`. «Tener veinte minutos **con** alguien» es tener su compañía durante veinte minutos;
  el dato es que llega en veinte.
- Entra: `You have twenty minutes before Andrea comes.` **Coste +1** (B).
- Nivel: la de hoy es A2 leído sin problema y la nueva también (`before` + presente,
  `come/came` está en la tabla de irregulares). El defecto es de coherencia con el dato, no de
  nivel — pero se resuelve en la misma línea y en el mismo presupuesto, así que va aquí.
- **No devuelve la línea a decible**: en boca de Kevin, `I have twenty minutes before Andrea
  comes` no hace avanzar ningún turno; su ficha manda decir ese dato solo si ella pregunta.

**N-8 · `and Valentina has.` — elipsis de auxiliar.** (línea 118, ROLE B)

- Hoy: `You have never seen that gate list, and Valentina has.`
- Entra: `You have never seen that gate list, and Valentina knows it.` **Coste +1** (B).
- Por qué: la elipsis de auxiliar (`… and she has ∅`, `so do I`) **no tiene tema en ningún nivel
  del registro** y es de las últimas cosas que aprende un hispanohablante: en español no existe
  («y Valentina sí»). La introdujo la pasada quirúrgica al partir en dos la propuesta B-3 de
  calcable. La mitad que hace el trabajo se conserva entera y sigue siendo falsa en boca de
  Valentina, o sea sigue sin ser calcable.

**Las cinco que están bien.** `or give you a date tonight` (−2, elipsis tras `has to`, legible);
`six names and six ID numbers` (−2, sin `on it`, legible); `and the mechanic will call you at
7:00 a.m.` (−4, **mejora**: sustituye una relativa por `will`, que ya es anclaje de la ficha);
`with his car and gas, and you never told Kevin` (−3, legible); el toolkit `**2**: tomorrow you
share a car` (−1, legible). Ninguna sube de nivel.

### Prosa que no es A2 leído y que el recorte no tocó

**N-9 · `you watched Hernán leave his car`** (línea 47, ROLE A) — verbo de percepción + infinitivo
sin `to`. Ningún tema del registro; en español es una subordinada con gerundio o con «que», y el
A2 lo reconstruye mal.
- Entra: `At 6:00 p.m. you saw Hernán's car at the mechanic's with a strange noise,` **Coste −2.**
- Conserva `you` como sujeto (que es lo que la calcabilidad protege), conserva las 6:00, el
  taller y el ruido, y `see/saw` está en la tabla de irregulares del propio tema anclado.
- Queda dentro `at the mechanic's` (genitivo de local, con núcleo elidido, fuera del alcance de
  `possessive-s`). Se acepta: la fila de vocabulario `the mechanic` lo sostiene léxicamente y es
  la forma normal en inglés americano.

**N-10 · `and taking it back costs you his four seats`** (línea 44, ROLE A) — gerundio como sujeto
(el registro solo trae `like + -ing`) **más** phrasal separable con pronombre en medio
(`take it back`), que la caja prohíbe por escrito.
- Entra: `and that costs you his four seats.` **Coste −2.**

**N-11 · `No yes without a name and a reason.`** (línea 39, ROLE A) — **regresión.**
`fase9-nivel-7.md` §7 ya echó `Say yes to nothing before…` por negación antepuesta y prescribió
el imperativo con `don't`; la bitácora de la pasada quirúrgica declara en su fila 39 haberlo
aplicado (`Don't say yes before…`), **y en disco no está**: hoy la línea es una nominal sin verbo,
que es la misma familia de telegrama que §11 prohíbe en la prosa.
- Entra: `Don't say yes without a name and a reason.` **Coste +1.**
- Anclado en `imperative` (a1), que trae el negativo con `don't` y **ya es anclaje declarado de
  esta ficha**.

### Menores, todos de coste 0 (viven en tablas o en el cierre)

| # | Dónde | Hoy | Entra | Por qué |
|---|---|---|---|---|
| m-1 | A, vocab `ID number` | `the number that says who you are` | `your personal number on your ID card` | pregunta incrustada (`who you are`), prohibida por la caja |
| m-2 | 5 filas de vocab y carta | `a bed you hang between two trees`, `the hours you work in one day`, `to not have all the money you need`, `a thin bed you put on the floor`, `one free place for one person` | insertar `that`: `a bed that you hang…`, `the hours that you work…` | relativa de contacto (sin `that`); `relative-clauses-a2` enseña who/which/that, no la omisión |
| m-3 | Carta, fila `Price` | `*(a hundred and fifty thousand)*` | `*(a hundred fifty thousand)*` | el `and` antes de la decena es convención británica; §11 manda variedad **americana** |
| m-4 | Cierre, línea 214 | `and before what hour` | `and by what time` | `before what hour` no es idiomático en ninguna variedad; calco de «antes de qué hora» |
| m-5 | Cierre, línea 208 | `how many names and ID numbers the gate list carries` | `how many names and ID numbers are on the gate list` | `carries` metafórico + orden invertido; la forma nueva es la que la propia ficha usa en los datos |
| m-6 | Cierre, línea 221 | `A day is not closed until the other one says what happens if it slips.` | `A day is not a date until the other one says what happens if he pays late.` | segunda pasiva del archivo + `slips` figurado; es **la regla que sostiene toda la pasada de carga** y hoy es la línea más difícil de leer del cierre |
| m-7 | Cierre, línea 206 | `Nobody says the other person's three.` | `Nobody says the other person's three lines.` | numeral como núcleo nominal, mismo defecto que N-6 |
| m-8 | A, exponente fila 2, columna `here` | `ask about a decision taken without you` | `ask about a decision he made without you` | participio reducido, el mismo que la pasada quirúrgica quitó de la carta |
| m-9 | A, línea 49 | `he was on last year's trip` | `he came last year` | genitivo de tiempo (`last year's`), fuera del alcance declarado de `possessive-s` (**−2 palabras**, no 0) |
| m-10 | A, línea 37 | `And his car leaves at 8:00 with yours.` | `And his car leaves at 8:00 with your car.` | pronombre posesivo `yours`: no hay tema de pronombres posesivos en el registro, solo de adjetivos (**+1**) |

**Fuera de esta ficha, para quien lleve la caja:** `caja-de-herramientas-a2.md`, bloque 1,
`the other way round` es británico. En americano, `the other way around`. No se toca desde aquí:
la caja la comparten los ocho escenarios.

---

## 8. Presupuesto — todo cabe, y sobra

| | Hoy | Δ de este informe | Después | Techo |
|---|---|---|---|---|
| ROLE A | **449** | N-5 −3 · N-6 +1 · N-9 −2 · N-10 −2 · N-11 +1 · m-9 −2 · m-10 +1 | **443** | 450 |
| ROLE B | **438** | N-6 +1 · N-7 +1 · N-8 +1 | **441** | 450 |

Los **once arreglos restantes cuestan cero** porque el contador canónico no mide filas de tabla
(`|`), ni bloques de código, ni las secciones que no van bajo `## ROLE A/B` —la carta y el
cierre compartido—. Se comprueba con `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`
después de aplicar, y la cifra que valga será la que imprima ese comando, no la que declare
ninguna tabla del archivo.

**Ninguno de los quince vuelve decible la línea que arregla:** los de prosa mantienen el sujeto
`you` o hablan de un ausente en tercera persona sobre un dato que solo tiene ese rol; los del
cierre son instrucciones en tercera persona sobre lo que hay que decir, no frases para decir.

---

## 9. `grammarReferences` — lista para pegar

Los once actuales **se quedan tal cual, con sus `rationale` de hoy**: verificados slug a slug,
título a título, y ninguno afirma algo que su tema no diga. Se añaden cuatro. Coste en prosa: **0**.

```ts
grammarReferences: [
  // — los once actuales, sin tocar: past-simple-questions, present-perfect-ever-never,
  //   past-simple-irregular, first-conditional, will-future, connectors-a2,
  //   there-is-there-are, can-ability, wh-questions, prepositions-time, imperative —
  { level: 'a1', slug: 'verb-to-be', title: 'Verb to be en inglés A1',
    rationale: 'Sostiene cinco de los dieciocho exponentes y hasta ahora ninguno lo declaraba: «We\'re good, right?», «I\'m not angry, but…», «It\'s my fault, but…», «I know it\'s last minute, but…» y «That\'s it — I\'ll send…». connectors-a2 solo cubría el but de tres de ellos y will-future solo la segunda mitad del quinto. El tema trae afirmativo, negativo e interrogativo y las contracciones I\'m / it\'s / we\'re, que es la forma que suena en un parqueadero entre amigos: sin contracción, la queja de Valentina se oye como acusación.' },
  { level: 'a1', slug: 'demonstratives', title: 'Demostrativos en inglés A1',
    rationale: 'Sostiene «Wait — we didn\'t say that.», «When did that change?», «That\'s it — I\'ll send…» y el «like this» de «OK — I\'ll say it like this:…». Los cuatro apuntan a algo que se acaba de decir en la mesa, que es el uso anafórico que el tema enseña, y son los cuatro momentos en que un jugador corrige o retoma la línea del otro — el gesto que el cierre exige y prohíbe asentir en su lugar.' },
  { level: 'a1', slug: 'object-pronouns', title: 'Pronombres objeto en inglés A1',
    rationale: 'Sostiene el me de «You haven\'t paid me yet.», «They paid me on…» y «Why didn\'t you tell me…?», y el it de «I\'ll say it like this» y «If I don\'t have it on…». Es el tema que separa I de me, y aquí toda la queja de Valentina se dice con me: sin él, el reclamo por la deuda no tiene forma. El tema avisa además del error de posponer el pronombre al phrasal, que la caja prohíbe.' },
  { level: 'a1', slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'Sostiene las horas que hay que pronunciar, no solo leer: la salida a las 8:00 a. m., el ahora de las 7:20 p. m., el turno de Sebastián hasta las 10:00 p. m., el plazo de doña Nubia antes de las 7:00 a. m. y la nota de voz de las 7:41 p. m. de la carta. La tercera línea del cierre de Kevin pide literalmente la hora a la que llama a cada uno. prepositions-time da el at/on/in pero no da cómo se lee un reloj, y sin eso el dato más repetido del escenario no se puede decir en voz alta.' },
]
```

**Opcional, si se quiere el anclaje completo del cierre de Valentina** («on my reservation, not on
his»):

```ts
  { level: 'a1', slug: 'possessive-adjectives', title: 'Adjetivos posesivos en inglés A1',
    rationale: 'Sostiene «It\'s my fault, but…» y la segunda línea del cierre de Valentina, donde lo que decide el punto no es la cifra sino de quién es la reserva: my, not his. El tema es el que separa el posesivo invariable del inglés del concordado del español (his car / her car), que es el error que se oye cuando un A2 habla de Hernán, de doña Nubia y de Andrea en el mismo turno.' },
```

---

## 10. Lo que este informe NO hace

No reescribe la ficha. Los quince arreglos van nombrados uno a uno, con línea, con texto de
entrada y con coste, y se devuelven a `habla-fichas-de-rol`. Dos observaciones de §3.1
(etiquetas de fila) son del auditor de tablas y se le pasan sin aplicar. El británico de
`caja-de-herramientas-a2.md` es del dueño de la caja: cambiarlo desde aquí le cambia la caja a
siete fichas que no estoy revisando.
