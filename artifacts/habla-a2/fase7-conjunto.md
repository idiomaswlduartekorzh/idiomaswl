# Habla acompañada — inglés A2 · Auditoría de CONJUNTO del set en inglés

Los ocho escenarios en su **versión final**, mirados a la vez. Umbrales: `docs/habla-acompanado-blueprint.md`
§5 (los siete repartos), §11 (presupuesto de prosa y bloque de vocabulario), §4 (nivel), §10 (andamiaje).

**Fuentes medidas** — la ficha, no el motor, porque la ficha es lo que ve el estudiante:

| nº | archivo |
|---|---|
| 1 | `fase7-fichas-1-the-bike-in-the-parking-lot.md` |
| 2 | `fase7-fichas-2-no-appointment-until-thursday.md` |
| 3 | `fase7-modelo-ficha-en.md` *(el molde)* |
| 4 | `fase7-fichas-4-a-charge-i-did-not-make.md` |
| 5 | `fase7-fichas-5-late-again-on-monday.md` |
| 6 | `fase7-fichas-6-the-cousin-on-the-sofa.md` |
| 7 | `fase7-fichas-7-two-more-people-for-the-trip.md` |
| 8 | `fase7-fichas-8-cancel-the-gym-i-am-leaving.md` |

Motores de contraste: `fase4-escenarios-*.md`. Andamiaje común: `caja-de-herramientas-a2.md`.

**Medido con script.** Los cuatro están en `artifacts/habla-a2/fase7-scripts/` y se vuelven a correr
con `node <archivo>`. Todas las cifras de abajo son su salida literal.

| script | qué cuenta |
|---|---|
| `extraer.mjs` | parte las 16 fichas en prosa / datos / vocabulario / exponentes y deja el JSON |
| `actos2.mjs` | el reparto de actos **sobre turnos producidos**, una fila de exponentes = un turno |
| `vocab.mjs` | las 158 entradas de vocabulario: repeticiones, glosas, campos, genericidad |
| `voz.mjs` | plantilla compartida, estilo de nota, y solapamiento léxico entre fichas |

La prosa se mide con `fase5-scripts/prosa.mjs`, que ya existía y que este informe **no toca**:
cambiar el contador a mitad de auditoría es exactamente lo que produjo las seis contabilidades
distintas que se describen en §3.

---

## Veredicto

**Cinco de los siete repartos de §5 pasan. Dos fallan, y uno de los dos es el que esta semana
se venía a corregir.**

| # | Reparto | Umbral §5 | Medido | Veredicto |
|---|---|---|---|---|
| 1 | **Actos de habla**, por turnos producidos | ningún acto > 40 % | **87,5 %** (`pedir-aclaración` 7/8 y `pedir-favor` 7/8) · **9 de los 12 actos por encima del 40 %** | **FALLA** |
| 2 | **Poder** — manda el rol A | ≥ 3 de 8 | **3 de 8 · 37,5 %** (esc. 1, 2, 7) | **cumple, sin margen** |
| 3 | **Quién arranca** | 40–60 % cada rol | **A 50,0 %** (3,4,6,8) · **B 50,0 %** (1,2,5,7) | **cumple** |
| 4 | **Desenlace** | ≥1 sin-acuerdo y ≥1 parcial | acuerdo 3 (1,2,5) · parcial 3 (3,4,6) · aplazado 1 (7) · **sin-acuerdo 1 (8)** | **cumple, sin margen** |
| 5 | **Culpa del rol A** | ≤ 50 % | **50,0 %** (3,4,5,6) · 37,5 % si a la nº 4 se le cuenta solo la parte que causa de verdad | **cumple, en el límite exacto** |
| 6 | **Escenografía** — aula | ≤ 2 de 8 | **0 de 8 · 0,0 %** | **cumple** |
| 7 | **Género** | ni el poder ni la culpa concentrados | **75 %** de los mandos con nombre son mujeres (3 de 4) · **62,5 %** de los roles con nombre son mujeres · **2 de 8** escenarios con las dos protagonistas mujeres, **0 de 8** con los dos hombres | **FALLA — el espejo bajó, no desapareció** |

Y tres cosas que ninguna auditoría por escenario puede ver, porque solo existen en el conjunto:

- **El vocabulario del set está sano.** 85,4 % de las entradas son exclusivas de un escenario y la
  columna `here` está limpia (1 sospechosa de 158). El problema no es la repetición: es que **el
  52,5 % de las 158 palabras son de trámite o de dinero**, y hay un bloque genérico de ~20 %.
- **La prosa incumple el techo en 9 de las 16 fichas (56,3 %)**, y las ocho fichas lo declaran
  cumplido — con **seis reglas de conteo distintas**, dos de ellas todavía con el marcador de
  plantilla `PROSA_A` sin sustituir.
- **La voz es una sola.** Las siete fórmulas de encabezado y las cinco secciones son **idénticas en
  16 de 16**, y once de las dieciséis fichas no añaden **ni un solo bloque propio**. El parqueadero,
  el mostrador de la clínica, la cocina compartida y la recepción del gimnasio están escritos con la
  misma plantilla rellenada.

**No es publicable tal cual.** Los dos repartos que fallan y las nueve fichas fuera de presupuesto
tienen arreglo sin tocar el diseño de ningún escenario. Lo que sí exige una decisión de producto es
lo del final: **cuál de los ocho se cambia**, y por qué.

---

## 1 · Actos de habla — contando turnos, no etiquetas

Ésta es la corrección de la semana, y es la que destapa el problema.

**Unidad de cuenta.** Una fila de la tabla «Say it here» = **un turno que la pareja tiene que
producir** para llegar al cierre. Son **145 filas** en las 16 fichas. De ellas, **106 (73,1 %)** son
actos del catálogo de §7; las otras 39 son `dar-dato/razón` (31), `apertura` (6) y `cierre-ritual`
(2), que no están en el catálogo y se cuentan aparte.

Clasificación primaria a mano, una fila = un acto, en `actos2.mjs`. Se clasifica por lo que el turno
**hace** (`form` + la glosa «what it does here»), no por el nombre de la fila ni por el campo
`speechActs` del escenario.

| acto | escenarios | % escenarios | veredicto | turnos | % de los 145 |
|---|---|---|---|---|---|
| *`dar-dato/razón`* | 8/8 | *100,0 %* | *fuera de catálogo* | 31 | 21,4 % |
| `pedir-aclaracion` | 7/8 | **87,5 %** | **FALLA** | 24 | 16,6 % |
| `pedir-favor` | 7/8 | **87,5 %** | **FALLA** | 10 | 6,9 % |
| `proponer-alternativa` | 6/8 | **75,0 %** | **FALLA** | 14 | 9,7 % |
| `rechazar` | 6/8 | **75,0 %** | **FALLA** | 12 | 8,3 % |
| `poner-limite` | 6/8 | **75,0 %** | **FALLA** | 11 | 7,6 % |
| `disculparse` | 5/8 | **62,5 %** | **FALLA** | 6 | 4,1 % |
| `conceder-con-condicion` | 5/8 | **62,5 %** | **FALLA** | 5 | 3,4 % |
| `quejarse` | 4/8 | **50,0 %** | **FALLA** | 7 | 4,8 % |
| `negociar` | 4/8 | **50,0 %** | **FALLA** | 6 | 4,1 % |
| `dar-mala-noticia` | 3/8 | 37,5 % | ok | 6 | 4,1 % |
| `recomendar` | 1/8 | 12,5 % | ok | 4 | 2,8 % |
| `insistir` | 1/8 | 12,5 % | ok | 1 | 0,7 % |

**Contado por etiquetas, el mismo set da un máximo del 37,5 %** (`fase5-conjunto.md`, campo
`speechActs`). Contado por turnos, **87,5 %**. La diferencia no es un matiz: son 50 puntos, y
confirma exactamente lo que §5 avisaba.

### Pero el umbral, medido así, es inalcanzable — y hay que decirlo

Cada escenario produce entre **5 y 8 actos distintos** del catálogo (media **6,9**):

| esc. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| actos distintos | 8 | 6 | **5** | 8 | 7 | 7 | 8 | 6 |

Para que los doce actos queden por debajo del 40 % de los escenarios, la suma de presencias tiene
que ser ≤ 38,4, o sea **≤ 4,8 actos distintos por escenario**. Ninguno de los ocho baja de cinco, y
el más bajo es el molde. Un escenario A2 de 13 turnos-materia con cuatro actos y medio no es un
escenario: es un intercambio.

**Las dos lecturas posibles de §5, y lo que da cada una:**

| lectura | máximo | veredicto |
|---|---|---|
| «> 40 % de los **escenarios**» (literal) | `pedir-aclaración` **87,5 %** | **FALLA** — y falla cualquier set con esta densidad |
| «> 40 % de los **turnos producidos**» | `pedir-aclaración` **16,6 %** | **cumple con margen enorme** |

La frase de §5 dice las dos cosas a la vez —«en más del 40 % de los escenarios, contando turnos
producidos»— y las dos mitades se contradicen. **Esto es una decisión del guardián, no del
redactor**, y hay que tomarla antes de reescribir nada: con la primera lectura hay que rehacer siete
escenarios, con la segunda el set pasa y lo que se corrige es el documento.

**Lo que sí es un defecto real haga lo que haga el guardián**, y se ve en la columna de turnos:

- `insistir` = **1 turno de 145 (0,7 %)** y `recomendar` = **4 (2,8 %)**, los dos en un solo escenario.
  Son los dos actos que un A2 colombiano usa a diario y el set casi no los pide.
- `quejarse` está **6 veces en el rol A y 1 en el B**: quejarse es cosa del que pide, nunca del que
  atiende. En la vida el del mostrador también se queja.
- `recomendar` es **4 en A y 0 en B**, y los cuatro son de la nº 2. Fuera de la clínica, en el set
  nadie aconseja a nadie.

---

## 2 · Los otros cinco repartos

**Poder.** `a>b` en 1, 2 y 7 — leído sobre el marcador `[grants]` de la caja de herramientas, que
es donde la ficha lo declara por escrito. **3 de 8, justo en el umbral.** Y sigue en pie el aviso de
la ronda anterior, que la versión final **no ha resuelto**: la nº 1 son dos topes duros simétricos
(390.000 / 350.000) con un bloque «if you walk away with nothing» que cuesta lo mismo a los dos y sin
reloj que apriete a ninguno. Leída sin la etiqueta es `igual`. Si el guardián la reetiqueta, el
reparto cae a **2 de 8 · 25,0 %** y **falla**.

**Quién arranca.** A abre en 3, 4, 6, 8; B en 1, 2, 5, 7. **50 / 50 exacto.** El reparto más limpio
del set.

**Desenlace.** Un solo `sin-acuerdo` (nº 8) y un solo `aplazado` (nº 7). Cumple, pero **cualquier
cambio que toque la nº 8 rompe este reparto**: es el único escenario del set que termina en nada.
Cuidado con eso más abajo.

**Culpa.** El problema lo causa el rol A en 3 (el examen), 5 (los tres lunes tarde), 6 (el sí a la
tía antes de preguntar) y 4 (el sobrino con el teléfono, que la carta confirma). **4 de 8 = 50,0 %,
el techo exacto.** Si a la nº 4 se le cuenta solo lo que A causa de verdad —la carta dice que el
bloque grande, unos 30.000 de los 42.000, es de madrugada con el teléfono quieto, y eso no es del
sobrino— baja a 37,5 %. Se declaran las dos: **el margen es cero o es uno, según cómo se lea un
escenario**, y eso ya es motivo para no dejarlo a ojo.

**Escenografía.** Aula: **0 de 8**. Cumple de sobra. Pero el umbral solo mira el aula, y lo que se
repite es otra cosa:

| dónde | esc. | nº | % |
|---|---|---|---|
| **mostrador / escritorio con alguien detrás** | 2, 4, 5, 8 | **4** | **50,0 %** |
| calle / parqueadero / portería | 1, 7 | 2 | 25,0 % |
| trastienda de trabajo | 3 | 1 | 12,5 % |
| casa | 6 | 1 | 12,5 % |

Y dos uniformidades que ningún umbral mide: **5 de 8 transcurren un martes (62,5 %)** y **4 de 8 en
Cabecera (50,0 %)**.

---

## 3 · Género — el espejo bajó, y no desapareció

La ronda anterior acabó con 4 de 4 mandos mujeres y los 2 hombres nombrados siendo los culpables.
La versión final ha movido dos piezas: la nº 4 cambió a **Norbey** el mostrador (era Yolima) y la
nº 5 cambió a **Liliana** el rol A (era Julián).

**Roles en escena: 16. Con nombre propio: 9. De ellos, 2 son neutros a propósito** (Dani y Cris,
nº 6, y la ficha lo dice por escrito: ni un pronombre en toda la ficha).

| medida | mujeres | hombres | neutro |
|---|---|---|---|
| roles con nombre en escena | **5** (Liliana, doña Amparo, Valentina, Tatiana, Milena) — **62,5 %** | 2 (Norbey, Kevin) — 25,0 % | 2 (Dani, Cris) |
| **manda en escena**, con nombre | **3** (Amparo esc.5, Valentina esc.7, Milena esc.8) — **75,0 %** | 1 (Norbey esc.4) — 25,0 % | — |
| **gana** el escenario, con nombre | 2 (Valentina esc.7, Milena esc.8) | 1 (Norbey esc.4) | — |
| **causa el problema**, en escena | 1 (Liliana esc.5) | 1 (Kevin esc.7) | 1 (Dani esc.6) |
| **decide fuera de escena** | 6 (Restrepo, la administradora, Nayibe, la tía, la mamá, doña Nubia) — 60,0 % | 4 (el cuñado, Nelson, el administrador del conjunto, Édison) — 40,0 % | — |

**Lo que mejoró de verdad:** la culpa ya no es cosa de hombres. De los dos hombres nombrados en
escena, uno manda y gana (Norbey) y el otro causa y pierde (Kevin) — antes eran 2 de 2 culpables. Y
fuera de escena el 60/40 es un reparto razonable.

**Lo que sigue torcido:**

1. **3 de 4 mandos con nombre son mujeres (75 %).** Es menos que el 100 % anterior, pero sigue
   siendo un sesgo, y con n=4 cualquier lectura es frágil.
2. **Solo hay 2 hombres nombrados en escena de 9 roles con nombre.** Con n=2, la pregunta de si el
   reparto es justo ni siquiera se puede contestar: el set no tiene bastantes hombres en pantalla
   para que la respuesta signifique algo. Arreglar el sesgo quitando hombres del escenario no es
   arreglarlo.
3. **2 de 8 escenarios son dos mujeres frente a frente** (nº 5 Liliana / doña Amparo, nº 8 Tatiana /
   Milena) y **0 de 8 son dos hombres.** La nº 5 pasó de mixto a femenino en esta ronda; ese cambio
   es justo el que creó el desequilibrio.

**Recomendación de género, sin tocar el resto:** devolver la nº 5 a rol A masculino, o hacer
masculino el rol de mando de la nº 8. Cualquiera de los dos deja los mandos en 2/4 y deshace el par
femenino sobrante. **No hace falta tocar nada más.**

---

## 4 · El vocabulario del set — las 158 palabras juntas

Ninguna auditoría por escenario ve esto. Son **158 entradas** en 16 roles (8-10 por rol, como pide
§11), **116 formas distintas** una vez normalizadas.

### Lo que está bien, y hay que decirlo

**El set no repite vocabulario entre escenarios.** Solo **9 formas** aparecen en dos escenarios
distintos: `appointment` (2,8), `opening` (2,3), `to cover` (2,3), `warehouse` (2,5), `shift` (3,7),
`to owe someone a favor` (3,6), `refund` (3,4), `reservation` (3,7), `charge` (4,8). Son **23
entradas de 158 = 14,6 %**. **El 85,4 % de lo que se enseña en un escenario no se enseña en ningún
otro.** Por escenario:

| esc. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| entradas exclusivas | **100 %** | 65 % | 70 % | 90 % | 90 % | 89 % | 89 % | 90 % |

Los dos flojos son el 2 y el 3, y comparten tres palabras entre ellos (`opening`, `to cover` y una
tercera vía `warehouse`): la clínica y el café hablan de turnos y de coberturas con las mismas
palabras. No es grave y no hace falta tocarlo.

**La columna `here` está limpia.** §11 avisa de que es la más calcable de la ficha. De 158 celdas,
**1 es sospechosa (0,6 %)** — y está en el molde:

> `3A | refund → you don't get one, and that's your argument`

Empieza por pronombre y verbo conjugado, que es justo lo que §11 prohíbe. La ironía es que las siete
fichas escritas **contra** el molde no heredaron el defecto: lo arregló cada una por su cuenta.
**Se corrige en `fase7-modelo-ficha-en.md` y ya.**

### Lo que no está bien

**El set enseña, sobre todo, a hacer trámites.** Clasificadas por campo (una entrada puede caer en
dos):

| campo | entradas | % | escenarios |
|---|---|---|---|
| **trámite / papel / contrato** | 43 | **27,2 %** | 7/8 |
| **dinero / pago** | 40 | **25,3 %** | 7/8 |
| objeto y oficio de la escena | 32 | 20,3 % | 6/8 |
| tiempo y agenda | 29 | 18,4 % | 6/8 |
| persona y cargo | 18 | 11,4 % | 7/8 |

**Papel + dinero = 52,5 % del vocabulario del set, presentes en 7 de 8 escenarios.** Un estudiante
que haga los ocho sale sabiendo `written claim`, `commitment sheet`, `referral note`, `visit log`,
`credit note`, `minimum term`, `to file a change`, `incident form`, `store folder`, `delivery note`,
`the lease`, `a form`, `in writing`, `proof`… y **ni una sola palabra de comer, de salud que no sea
una muela, de transporte que no sea un camión, de tiempo atmosférico, de sentimientos, de estudios o
de ocio**. Los campos que un A2 necesita fuera del mostrador **no existen en el set**.

**Hay un bloque genérico, y es de ~20 %.** Entradas que valdrían tal cual en cualquiera de los ocho
—o en un noveno que no existe todavía—: `deal`, `in cash`, `to sign`, `a form`, `proof`, `ID`,
`in writing`, `business days`, `appointment`, `opening`, `to cover`, `a charge`, `a bill`,
`to owe someone`, `to pay someone back`, `to be short`, `a spot`, `to fit`, `to charge someone`.
**31 de 158 = 19,6 %.** La prueba de §11 —«¿puede este rol llegar al cierre sin esta palabra?»— las
deja pasar a casi todas porque en su escenario sí hacen falta; lo que no ve la prueba, y solo se ve
desde arriba, es que **una de cada cinco palabras del set es la misma palabra de trámite con otro
nombre**. Concentradas en 8A (5 de 10), 2A y 2B (4 de 10 cada uno) y 1A y 1B (3 de 10).

**Y las glosas se repiten mucho: 59 de 158 = 37,3 %** son literalmente idénticas a otra. Casi todas
son el mismo escenario visto por los dos roles —28 formas que están en la ficha de A y en la de B—,
y eso **está bien**: el mostrador y el cliente tienen que llamar igual a la misma cosa. Solo dos
cruzan escenario: `the hours you work in one day` (3A y 7B) y `you have to do something for them
later` (3A, 6A, 6B). Tres entradas de 158. No es un problema.

---

## 5 · La longitud — la prosa de las 16 fichas contra el techo de 350

Medido con `fase5-scripts/prosa.mjs`, que es el contador que el propio set adoptó: cuenta desde
`## ROLE X` hasta la siguiente `## `, **descuenta toda fila de tabla y todo encabezado**, y **cuenta**
la cita de registro. La prosa se mide **aparte de las tablas**, como pide §11.

| ficha | prosa | techo 350 | datos | vocab. | expon. |
|---|---|---|---|---|---|
| **1A** — selling the bike | **381** | **SE PASA (+31)** | 10 | 10 | **10** |
| **1B** — came for the bike | **380** | **SE PASA (+30)** | 10 | 10 | **10** |
| 2A — no appointment to give | 347 | ok | 10 | 10 | 9 |
| 2B — need to see the dentist | 348 | ok | 10 | 10 | 9 |
| 3A — need Saturday covered *(molde)* | **292** | ok | 8 | 10 | 9 |
| 3B — have the closing shift *(molde)* | 321 | ok | 10 | 10 | 6 |
| **4A** — a charge you didn't make | **375** | **SE PASA (+25)** | 9 | 10 | 9 |
| **4B** — behind the counter | **381** | **SE PASA (+31)** | 10 | 10 | 9 |
| 5A — Liliana | 341 | ok | 10 | 10 | 9 |
| **5B** — doña Amparo | **425** | **SE PASA (+75)** | 10 | 10 | 9 |
| **6A** — cousin arrives Thursday | **362** | **SE PASA (+12)** | 10 | 9 | **10** |
| **6B** — Monday morning is yours | **379** | **SE PASA (+29)** | 10 | 10 | **10** |
| 7A — Valentina | 319 | ok | 10 | 9 | 9 |
| 7B — Kevin | 314 | ok | 10 | 10 | 9 |
| **8A** — you're leaving | **383** | **SE PASA (+33)** | 10 | 10 | 9 |
| **8B** — the one line you can't cross | **403** | **SE PASA (+53)** | 10 | 10 | 9 |

**9 de 16 se pasan = 56,3 %.** Media del set: **359 palabras**, un 2,6 % por encima del techo. La
peor es **5B con 425 (+21 %)**. La mejor es el molde, **3A con 292**, la única que baja de 300; solo
cuatro fichas de dieciséis quedan por debajo de 330, y dos son las del molde.

**Las siete escritas contra el molde son todas más largas que él.** Media del molde: **306,5**
palabras por ficha. Las demás, en orden: 7 → 316,5 (**+3,3 %**) · 2 → 347,5 (+13,4 %) · 6 → 370,5
(+20,9 %) · 4 → 378 (+23,3 %) · 1 → 380,5 (+24,1 %) · 5 → 383 (+25,0 %) · 8 → 393 (**+28,2 %**).
El orden es casi el orden en que se escribieron: **cada ronda añadió y ninguna volvió a medir contra
el molde**.

Tablas: los datos están en el tope (10 filas) en 14 de 16. Vocabulario, dentro de 8-10 en 16 de 16.
**Exponentes: 4 fichas con 10 filas** (1A, 1B, 6A, 6B) contra el rango 6-9 de la tabla de §11 —
aunque §10 dice «6 a 10», así que **el blueprint se contradice consigo mismo** y la nº 6 lo hace
constar por escrito. Hay que cerrarlo en una de las dos cifras.

### Y el problema que hay detrás: cada ficha cuenta con una regla distinta

Las ocho declaran cumplir el presupuesto. Ninguna miente; **cada una cuenta de otra manera**:

| ficha | qué declara | qué regla usa | prosa.mjs |
|---|---|---|---|
| 1 | 338 / 337 | descuenta la cita de cabecera (43 pal./rol) «porque es plantilla» | 381 / 380 |
| 2 | 347 / 348 | cuenta la cita y el toolkit; descuenta tablas y `###` | 347 / 348 |
| 3 *(molde)* | 343 *(citado en §11)* | la del blueprint | 292 / 321 |
| 4 | 346 / 349 | la de la ficha 1 (descuenta la cita) | 375 / 381 |
| 5 | **`PROSA_A` / `PROSA_B`** | remite a `prosa.mjs` — **y deja el marcador sin sustituir** | 341 / **425** |
| 6 | **`PROSA_A` / `PROSA_B`** | la de la ficha 2 — **marcador sin sustituir** | 362 / 379 |
| 7 | 374 / 370 | cuenta toda línea que no empiece por `\|`, sin descartar tokens | 319 / 314 |
| 8 | 348 *(citado en la ficha 7)* | — | 383 / 403 |

**Seis contabilidades para un solo umbral.** La ficha 7 es la única que lo dice en voz alta: *«las
cifras declaradas en todo el set no salen de este método, sino de un contador más laxo… el 350 del
set es una unidad de cuenta interna, no palabras contadas de esta forma»*. Tenía razón, y la
consecuencia es que **el presupuesto de §11 hoy no significa nada**: cada redactor elige el contador
que le deja pasar.

Y **las fichas 5 y 6 tienen `PROSA_A` y `PROSA_B` literales en la tabla publicada**. Eso no es una
discrepancia de método: es una plantilla sin rellenar en un archivo que se da por final.

---

## 6 · La voz — se tradujeron 16 fichas en paralelo, y suenan a una sola mano

**La plantilla es total.** Las siete fórmulas de encabezado están en **16 de 16**:

| fórmula | fichas |
|---|---|
| `**Registro.** … **Quién arranca.** N turns · N minutes` | **16/16 · 100 %** |
| `Your screen only. Don't show it. Don't read from it.` | **16/16 · 100 %** |
| `**Where you are** ·` | **16/16 · 100 %** |
| `**You want** ·` | **16/16 · 100 %** |
| `**You can't**` + lista numerada | **16/16 · 100 %** |
| `**Only you know**` | **16/16 · 100 %** |
| `**If you walk away with nothing**` | **16/16 · 100 %** |
| las cinco secciones, en el mismo orden | **16/16 · 100 %** |

Eso, por sí solo, no es malo: es el molde haciendo su trabajo. Lo malo es lo que **no** hay encima.

**Once de las dieciséis fichas no añaden ni un bloque propio (68,8 %).** Solo cinco escriben algo
que la plantilla no traía:

| ficha | bloque propio |
|---|---|
| 5B | `**Before you speak** ·` — la única acotación escénica del set: pon las llaves y la hoja en la mesa **antes** de hablar |
| 7A | `**Your own rule** ·` — no decidas nada hasta saber quiénes son |
| 7B | `**And a reason you can repeat** ·` |
| 8A | `**Not about money**` · `**You can, but you don't have to**` |
| 2A | un punto del cierre adelantado en negrita |

Y la nº 5 es además la única cuyos encabezados llevan el **nombre y el oficio** del personaje
(`ROLE A — Liliana, warehouse assistant`); las otras siete titulan por la situación
(`You came for the bike`, `Monday morning is yours`).

**El estilo medido dice lo mismo.** Palabras por frase: media **10,0**, desviación **1,0**,
**CV 9 %** — plano. Donde sí hay variación es en cuánto se parece cada ficha a una nota:

| ficha | pal./frase | % fragmento sin verbo finito | `·` por 100 palabras |
|---|---|---|---|
| 3A *(molde)* | 9,4 | **32 %** | 3,8 |
| 5A | 10,0 | **32 %** | 3,2 |
| 3B *(molde)* | 10,0 | 34 % | 2,5 |
| 1B | 9,5 | 35 % | 2,4 |
| 1A | 10,6 | 36 % | 3,1 |
| 5B | 11,5 | 38 % | 3,5 |
| 4A | 8,9 | 43 % | 3,7 |
| 4B | 9,3 | 44 % | 4,5 |
| 7A | 9,4 | 44 % | **6,6** |
| 7B | 11,2 | 46 % | **6,7** |
| 2B | 11,6 | 47 % | 3,7 |
| 6A | 10,1 | 47 % | 3,9 |
| 2A | 11,6 | **50 %** | 5,8 |
| 8A | 8,5 | **51 %** | **6,0** |
| 8B | 9,4 | **56 %** | **5,0** |
| 6B | 9,7 | **59 %** | 2,9 |

Rango del 32 % al 59 %, **CV 19 %**; y la densidad de `·` va de 2,4 a 6,7, **CV 32 %**. Traducido:
**el molde es la ficha menos telegráfica del set**, y la 7 y la 8 son las que más se acercan a la
regla de §11 («notas, no frases»). Las escritas en paralelo derivaron cada una a su lado y ninguna
volvió al molde. **El molde no manda: manda quien escribió último.**

**El léxico sí distingue.** Jaccard medio entre fichas de escenarios distintos: **17,4 %**; entre los
dos roles del mismo escenario: **31,4 %**. Cada ficha tiene entre un 11 % y un 28 % de tipos que no
aparecen en ninguna otra. Es decir: **el vocabulario del parqueadero no es el de la clínica, pero la
sintaxis y la arquitectura sí.** Se distinguen por los sustantivos, no por el tono.

**Lo que falta, dicho en una línea:** un parqueadero a las 7:20 de un viernes con las maletas en la
mano no se escribe igual que un mostrador de clínica a las 4:20 de un martes, y hoy se escriben
igual. La cocina compartida (nº 6) y la recepción del gimnasio (nº 8) son las dos que más lo notan:
las dos tienen conflicto físico y prisa, y las dos abren con `**Where you are** · <día>, <hora>,
<lugar>.`

Un apunte más, del mismo tipo: **el campo «N turns» de la cabecera no significa lo mismo en las ocho
fichas.** La nº 3 dice «About 7 turns» y son 7 por rol (14 globales); la nº 5 dice «About 17 turns»,
que solo puede ser global; la nº 6 dice 12. **Es el mismo campo con dos unidades**, y el estudiante
no tiene forma de saber cuál le toca. Además, **la nº 5 declara 9 minutos y el techo de A2 en §4 es
8**: o baja, o se declara B1.

---

## 7 · Qué escenario habría que cambiar, y por cuál

No se arregla nada aquí. Se dice qué cambiar y por qué, con las cifras delante.

### El candidato: la nº 4, `a-charge-i-did-not-make`

Es **el escenario más redundante del set**, y no por malo — su carta es la mejor del conjunto—, sino
porque **todo lo que aporta ya lo aporta otro**:

| dimensión | la nº 4 | quién más lo trae |
|---|---|---|
| escenografía | mostrador con empleado detrás | **2** (clínica) y **8** (gimnasio) — serían 2 de 8 sin ella |
| poder | `b>a` | **5** y **8** |
| desenlace | `acuerdo-parcial` | **3** y **6** |
| campo de vocabulario | trámite + dinero | los 7 restantes, pero aquí en estado puro: `credit note`, `written claim`, `minimum term`, `a form`, `to file` |
| **ritual de cierre** | dictar un número y que el otro lo repita en voz alta | **2** (el celular dígito a dígito) y **8** (el número de caso) — **3 de 8 escenarios cierran igual, 37,5 %** |
| culpa | rol A (el sobrino) | 3, 5, 6 — y es la que empuja el reparto de culpa al **50,0 % exacto** |

Quitarla mueve **cinco repartos a la vez**, sin tocar ningún otro escenario: mostrador 50 % → 37,5 %,
culpa 50 % → 37,5 %, `b>a` 3 → 2, el cierre-dictado 3 → 2, y libera unas 20 entradas de vocabulario
de trámite (el campo bajaría del 27,2 % al ~21 %).

### Por qué no las otras tres del mostrador

- **La nº 8 no se puede tocar: es el único `sin-acuerdo` del set.** Sin ella el reparto de desenlace
  falla directamente.
- **La nº 2 es la única que trae `recomendar`** (4 de los 4 turnos del set) y la única en la que el
  que tiene el poder **aconseja** en vez de conceder. Es también salud, el único campo no-comercial
  que queda.
- **La nº 5 es la única con acotación escénica y con la mecánica de «escríbelo tú, con tus
  palabras»**, que es lo mejor que tiene el set en producción de lengua. Lo que hay que cambiarle es
  el género del rol A y los minutos, no el escenario.

### Por cuál cambiarla

Lo que al set le falta, medido: **un escenario sin papel, sin mostrador y sin empresa.** Los ocho
actuales tienen a alguien que rellena, firma o niega un documento. Y le faltan dos actos que hoy
están al 12,5 %: `insistir` (1 turno de 145) y `recomendar` (4, todos en la nº 2).

Perfil del sustituto, escrito como encargo:

- **Escenografía:** exterior o casa ajena. Ni mostrador ni oficina. Bajaría el mostrador a 2 de 8.
- **Sin documento.** Nada que firmar, ningún número que dictar. Rompe el cierre-dictado.
- **Poder `igual` o `a>b`**, para dejar `b>a` en 2 de 8 y dar aire al reparto de poder si el guardián
  reetiqueta la nº 1.
- **Culpa: ni de A ni de B** — la causa, fuera de los dos. Bajaría la culpa a 37,5 % con margen.
- **Actos que tiene que exigir por diseño:** `insistir` y `recomendar`, que es donde el set está
  vacío. Un rol que **sabe algo** y tiene que convencer al otro de que le haga caso, contra la
  resistencia del otro, sin autoridad para obligarle.
- **Vocabulario:** un campo que el set no toca — comida, cuerpo, transporte urbano, clima, o el
  material de un oficio manual. Ocho a diez palabras que no sean de papel ni de dinero.
- **Género:** rol de mando masculino, para dejar los mandos con nombre en 2/4.
- **Registro:** informal o semiformal entre conocidos, que es donde el set está más flojo — hoy son
  4 formales, 3 informales y 1 mixto.

Un ejemplo que cumple las siete a la vez, sin más valor que el de mostrar que se puede: **dos
vecinos en la escalera y una gotera que viene de arriba** — el de arriba sabe de dónde sale y no
quiere abrir la pared antes de una fecha; el de abajo tiene una fecha propia y ninguna autoridad
para obligarle. Sin papel, sin mostrador, la culpa es de una tubería, el que sabe tiene que
`recomendar` e `insistir`, y el vocabulario es de fontanería y de humedad. Es un ejemplo, no una
propuesta cerrada: eso lo decide David.

---

## 8 · Lo que hay que arreglar, por orden de coste

| # | qué | dónde | coste |
|---|---|---|---|
| 1 | Sustituir `PROSA_A` / `PROSA_B` por las cifras reales | fichas **5** y **6** | minutos |
| 2 | Reescribir la celda `here` de `refund` en el molde (§11: ni pronombre ni verbo conjugado) | `fase7-modelo-ficha-en.md` | minutos |
| 3 | Unificar la unidad de «N turns» en la cabecera (global o por rol) en las 16 | las 8 fichas | una pasada |
| 4 | Bajar la nº 5 de 9 a 8 minutos, o declararla B1 | ficha **5** | decisión |
| 5 | Cerrar el rango de exponentes: 6-9 (§11) o 6-10 (§10). Cuatro fichas están en 10 | blueprint | decisión |
| 6 | **Adoptar un solo contador de prosa** — `prosa.mjs` — y volver a recortar las 9 fichas que se pasan | blueprint §11 + 5 fichas | media jornada |
| 7 | **Decidir qué mide el reparto de actos:** presencia en escenarios o cuota de turnos | blueprint §5 | decisión de guardián |
| 8 | Género: rol A masculino en la nº 5, **o** mando masculino en la nº 8 | 1 ficha | una pasada |
| 9 | Reetiquetar la nº 1 como `igual` **o** escribirle una asimetría de verdad | ficha **1** + motor | decisión |
| 10 | Sustituir la nº 4 por un escenario sin papel, con `insistir` y `recomendar` | escenario nuevo, ciclo completo | el bloque entero |

Los nueve primeros no cambian ningún escenario. El décimo sí, y es el único que necesita que David
diga que sí.
