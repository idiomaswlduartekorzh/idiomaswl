# Escenario 6 · `the-cousin-on-the-sofa` — auditoría de NIVEL (versión en inglés)

Auditado: `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` (versión del 20 ago 2026,
la que ya trae aplicados los 64 hallazgos de la tanda anterior).
Contra: §2, §4 y §11 de `docs/habla-acompanado-blueprint.md`, el molde
`artifacts/habla-a2/fase7-modelo-ficha-en.md`, la caja `caja-de-herramientas-a2.md`, y
`src/data/grammar/ingles/{a1,a2,b1}` leyendo el campo `slug` de cada archivo.

Como la ficha está entera en inglés, se auditan **dos niveles distintos**: el inglés que el
estudiante tiene que **decir** (A2 hablado, con lista de prohibidas) y el que tiene que **leer**
(A2 leído, que aguanta un poco más). Y la pieza nueva: las **20 definiciones** de vocabulario,
comprobadas una a una.

**Veredicto: PASA CON CAMBIOS.** Cero estructuras prohibidas en la mitad hablada —verificado por
patrón, no a ojo—, las 20 definiciones definen hacia abajo las 20, y los 10
`grammarReferences` resuelven los 10 con el título exacto. Lo que falla se concentra en tres
sitios: **un exponente que dice el futuro en presente simple**, **la prosa de A escrita en
participios sueltos** y **la pantalla de cierre, que es la única que leen los dos**.

---

## 0. Lo que pasa limpio (y conviene no romper)

**Estructuras prohibidas: cero.** Buscadas por patrón sobre el archivo entero:

| prohibida | ocurrencias |
|---|---|
| present perfect de duración con `for` / `since` | **0** |
| `could` de cortesía | **0** |
| `would` / `would rather` / `would prefer` | **0** (ni una sola vez en todo el archivo) |
| modal + infinitivo perfecto | **0** en la ficha |
| condicional hipotético (2.º condicional) | **0** |
| pasiva plena | **2**, las dos en prosa de lectura (§2 M4 y §2 M6) |

El único `should have` del documento está en la línea 339, dentro de la sección en español de
pendientes, y ahí se cita **precisamente para decir que hay que bajarlo de nivel**. Correcto.

**Las 20 definiciones de vocabulario definen hacia abajo, las 20.** Esta es la pieza que en el
escenario 2 falló seis veces; aquí no falla ninguna. Tres son modélicas y no se tocan:

- `to drop | *(about the wifi)* to stop for a moment and then come back` — desambiguar la
  acepción entre paréntesis antes de definir es exactamente lo que hacía falta, y no lo hace
  ninguna otra ficha del conjunto.
- `a hostel | a cheap place to sleep, in a room with other people`.
- `to put someone up (put him up) | to let someone sleep in your home for a few days` — el trozo
  fijo se enseña entero y con el pronombre ya dentro, que es la excepción que el archivo pide
  escribir en la caja (pendiente 5). Bien resuelto por el lado de la ficha.

Ninguna definición se apoya en una palabra más difícil que la que define, ninguna usa `in case`,
`break off` ni phrasal opaco, y ninguna es una traducción disfrazada.

**La asimetría de vocabulario está bien construida.** `to be out all day` vive solo en la lista
de A, que es quien lo produce; B lo recibe y tiene el bloque 3 para preguntarlo. Eso es lo que
el escenario 2 no hacía. Ojo: por el otro lado la cosa se rompe (§2 M3).

**Los 10 `grammarReferences` existen los 10 y los 10 títulos coinciden carácter por carácter.**
El sufijo `-a2` está bien manejado en los dos sentidos. Detalle en §4.

**Presupuesto de §11: cumplido, y —esto es nuevo— reproducible.** Apliqué la regla de conteo que
la propia ficha declara y salen **exactamente 333 y 341**, los dos números declarados. Es la
primera ficha del conjunto cuya cuenta se puede auditar sin discutirla. Datos 10 filas por rol,
vocabulario 10, exponentes 10.

**Variedad americana: sostenida.** `couch`, `apartment`, `mom`, `vacation`, `p.m.`. Ni un
britanismo (`sofa`, `flat`, `mum`, `holiday`). Ver L4 para la única grieta.

**Columna `here` del vocabulario:** ninguna de las 20 celdas empieza por pronombre + verbo
conjugado y ninguna lleva comillas. La regla de §11 que más se rompe, aquí no se rompe.
(Lo calcable es de `fase7-calcable-6.md`; lo digo porque es lo que me tocaba comprobar de nivel.)

---

## 1. GRAVE — cuatro

### G1 · El futuro dicho en presente simple, y una de las tres veces es un exponente

> Línea 91 (exponente de A): `So I tell her: he arrives Thursday, and he sleeps…`

`he arrives Thursday` + `he sleeps` **no es futuro en A2**. El presente simple de horario
(«el bus llega a las 4:30») aguanta para el bus, pero no para una persona que va a dormir en un
sitio: `he sleeps on the couch` no significa el jueves, significa siempre. Un A2 hispanohablante
lo produce por calco directo del español («llega el jueves y duerme en el sofá») y el inglés que
sale no es el que la ficha quiere enseñar.

Peor: **ninguna de las 10 referencias gramaticales ancla esta estructura**. La misma prueba que
descartó `may` en el escenario 2 — cuando el andamiaje no puede apuntar a una forma, la forma
sobra. Y encima falta la preposición: `arrives Thursday`, sin `on`, contra el rationale de
`prepositions-time` de esta misma ficha, que dice que el reparto se dice con `on`/`at`.

Y no es un descuido aislado. El presente simple hace de futuro otras dos veces, las dos en
lectura:

| línea | como está | versión corta |
|---|---|---|
| 36 | `and your aunt hears about it tonight` | `and tonight your aunt is going to know` |
| 188 | `Your plan was: he leaves before the 29th.` | `Your plan was: he goes home before the 29th.` → mejor, `Your plan was this: Iván leaves on the 30th, after your mom goes home.` |

**Versión corta del exponente**, que además reusa la forma que A ya dice en su primer turno y
que sí está anclada (`present-continuous-future-a2`):

> `So I tell her: he's coming on Thursday, and he's sleeping…`

Esto importa más que un exponente cualquiera: el bloque de cierre **obliga** a Dani a decir el
mensaje de la tía en voz alta delante de Cris. Es el último acto del juego, y la única forma que
la ficha le da para hacerlo es esta fila.

### G2 · El bloque «Only you know» de A está escrito en participios sueltos, y es el que decide su estrategia

> Línea 40: `Sunday: yes already given to your aunt. Status tonight: news, not a request.`
> Línea 42: `Don't offer this yet: Nelson, 402 · away the 24th–30th · one favor owed to you, and only one use of it. Call tonight · answer not guaranteed.`

Tres participios de pasiva reducida (`yes already given`, `one favor owed to you`,
`answer not guaranteed`) y dos nominalizaciones abstractas (`Status`, `one use of it`) en dos
líneas. El molde autoriza la nota telegráfica —`ticket paid` está en el modelo y `ticket bought`
aquí es legítimo—, pero eso es una **etiqueta de dos palabras**, no una oración pasiva a la que
se le ha quitado el verbo.

El riesgo es concreto: `one favor owed to you` invierte la dirección del favor si se lee mal, y
si A cree que **le debe** un favor a Nelson en vez de al revés, la segunda salida del escenario
se cae. Es información que decide la partida, escrita en la sintaxis más difícil de la ficha.

**Versión corta:**

> - `Sunday: you already said yes to your aunt. So tonight you are not asking. You are telling.`
> - `Don't offer this yet: Nelson, apartment 402 · he is away the 24th–30th · he owes you one favor, and you can use it only once. Call him tonight · maybe he says no.`

### G3 · Los criterios de éxito de A son una fila de pasivas sin verbo

> Línea 95: `… · importance stated, reason refused, nothing offered instead · after a no you
> asked why instead of repeating yourself, and you left with a reason you didn't have · Iván's
> days, said out loud · …`

`importance stated, reason refused, nothing offered instead` son tres pasivas absolutas
encadenadas: sintaxis de titular de prensa, no de A2. `Iván's days, said out loud` es la cuarta.
Y `a reason you didn't have` es una relativa de objeto con el relativo elidido, que además dice
lo contrario de lo que quiere decir (la razón sí la tiene: al final).

Es la línea que el estudiante lee para saber **qué es ganar**. Si no la decodifica, juega sin
criterio.

**Versión corta:**

> `The whole news in your first turn — day, nights, the couch · you said it matters, you didn't
> say why, and you didn't offer anything instead · after a no you asked why, you didn't repeat
> yourself, and you learned a reason you did not know before · you said out loud what Iván does
> all day · **two** options, and nobody pays for a bed · you never said the problem is them.`

### G4 · La pantalla de cierre —la única que leen los dos— tiene la frase marco rota

| línea | como está | qué falla | versión corta |
|---|---|---|---|
| 196 | `You finish when the two of you have said out loud, and you agree on all three:` | **`said` se quedó sin objeto.** En el molde la frase es `say out loud, together, the message that goes to the café group` — al adaptarla se perdió el complemento, y de paso mezcla present perfect con presente | `You finish when you both say these three things out loud. Then check: do the two of you say the same thing?` |
| 200 | `What is still open, and when you talk about it` | ver M4 | `What you did not decide today, and when you talk about it` |
| 204 | `If Cris corrects one word, you did not agree on the same thing.` | condicional con presente en la prótasis y pasado en la apódosis: un A2 no reconstruye el sentido | `If Cris changes one word, then the two of you did not agree.` |
| 206-207 | `It is what makes this a partial agreement and not a conversation that just stops. Skip it and it did not end.` | cleft + relativa + coordinación negativa larga, y después un imperativo con `and` + pasado | `Without point 3, the conversation only stops. With it, you have half an agreement. If you skip it, the game did not finish.` |

Estas cuatro líneas se leen **despacio y al final**, comprobando punto por punto. Es donde menos
se puede tropezar, y son las que peor están del archivo después de G2.

---

## 2. MEDIO — seis

### M1 · `I'll be done at eleven.` se lee como una pasiva

> Línea 160 (exponente de B): `I need the living room on…` · `I'll be done at eleven.`

`be done` = *terminar* es coloquial americano y correcto, pero para un A2 hispanohablante es
`be` + participio, o sea *seré hecho*. Es además el **único `will` escrito del escenario**, el
que sostiene el rationale de `will-future` y el que cierra la franja de la mañana: si se lee mal,
B no cierra su hora.

**Versión corta:** `I'll finish at eleven.` El rationale de `will-future` sigue valiendo palabra
por palabra.

### M2 · `by` + hora, que la propia ficha declara que no usa

> Línea 125 (datos de B): `a room again by 7:00 a.m.`
> Línea 238 (rationale de `prepositions-time`): *«El reparto se dice con on/at… **Nunca con by**, que no está en el registro.»*

Lo comprobé: `by` aparece **cero veces** en `src/data/grammar/ingles/a1/prepositions-time.ts`.
El rationale tiene razón, y la ficha se contradice a sí misma en la fila de datos que sostiene la
condición que hace aceptable la salida 1. `by` + hora límite es además de los falsos amigos más
caros del inglés (*«junto a las siete»*).

**Versión corta:** `a room again at 7:00 a.m.` o `a room again before 7:00 a.m.` — `before` la
propia nota lo admite como léxico.

De paso, la misma palabra hace de preposición de lugar dos líneas más allá —`the wifi drops by
the window` (115), `the wifi, by your window` (146)— mientras el exponente que B tiene que decir
dice `next to the window` (164). Tres formulaciones para el mismo sitio. Que las tres digan
`next to the window`.

### M3 · El bloque 3 está muerto para A, y la culpa la tiene la tabla que va justo encima

> Línea 77 (toolkit de A): *«**3** `[receives]` — lease, renew, drop, unload are their words,
> not yours: **ask**»*

Pero la tabla de vocabulario de A, doce líneas antes, **ya define `the lease`, `to renew` y
`to drop`**. De las cuatro palabras que el toolkit le manda preguntar, tres ya las sabe antes de
empezar. El único hueco real es `unload`, y ese sí está bien.

Es el mismo defecto que el escenario 2 (M6), con la diferencia de que aquí la ficha lo dice en
voz alta: promete un ejercicio de reparación y lo resuelve ella misma en la pieza anterior.

**Ojo antes de arreglarlo:** §11 manda que entren en el vocabulario «las que le va a soltar el
otro», así que **quitar las filas sería empeorar**. La salida es la del escenario 2: dejarles a
`the lease`, `to renew` y `to drop` la columna `here` y vaciar la columna `what it is` con una
nota del tipo `they will say this — ask what it means`. Tres celdas. `to sign` se queda entera:
A tiene que decirlo, no solo entenderlo.

### M4 · `what is still open` nunca se glosa, y es el punto 3 del cierre

Aparece cinco veces —líneas 59 y 132 (datos de los dos roles, como
`the day for whatever is still open`), 92 y 165 (columna `here` de los dos exponentes), 200
(punto 3 del cierre obligatorio)— y **no está en ninguna de las dos tablas de vocabulario**.

`open` en el sentido de *pendiente* es una acepción figurada que un A2 no tiene; y `whatever` es
B1 de manual. Es exactamente la palabra de la que depende el punto que hace que este escenario
cierre en acuerdo parcial y no en conversación que se para.

**Esto no es del escenario 6, es del molde:** `what's still open` es la fórmula de
`fase7-modelo-ficha-en.md` y viaja a los ocho. Por eso no pido una fila de vocabulario aquí
—cuesta una de diez y hay que pagarla ocho veces—, pido **sacar la metáfora de la prosa**:

- datos (59, 132): `the day for the things you did not decide today`
- cierre (200): `What you did not decide today, and when you talk about it`
- columnas `here` (92, 165): `you park one thing on a day, instead of losing it` ya se entiende
  sin la metáfora; basta con cambiar el `function` de `what's still open` a `what's not decided`.

Queda anotado abajo como pendiente del conjunto.

### M5 · El toolkit de B le enseña al estudiante la máquina

> Línea 150: *«Blocks **1** (they stop you in your own kitchen, and **the box has no informal
> form for that**: `Yeah? What's up?`)»*

El estudiante lee que a la caja de herramientas le falta una fila. Eso es una nota de autor —está
correctamente registrada como pendiente 3 al final del archivo— pero está impresa en la pantalla
del jugador. Y `form` en el sentido de *fórmula* es metalengua, no A2.

**Versión corta:** Blocks **1** — but say it your way: `Yeah? What's up?` — **2**, … El pendiente 3
sigue donde está y nadie se entera desde la ficha.

En la misma línea: `only until they ask you straight`. `straight` = *directamente* es adverbio
idiomático. `directly` es cognado y cuesta lo mismo.

### M6 · Prosa de lectura que no cabe en A2 leído

Todas se leen, ninguna se dice. Ordenadas por línea. (No repito aquí lo ya itemizado en G2, G3 y
G4.)

| línea | como está | por qué no cabe | versión corta |
|---|---|---|---|
| 35 | `Outside the family, it's ten days of vacation.` | `it` no tiene antecedente: el lector busca a qué se refiere y no lo encuentra | `To other people, this is a ten-day vacation.` |
| 41 | `Give away the last nights, not the first ones.` | `give away` metafórico (*ceder*), y lo que se cede son noches | `Say yes to the last nights first. Keep the first ones.` |
| 77 | `saying no is yours too` | gerundio de sujeto + posesivo predicativo | `you can say no too` |
| 109 | `The interview in your room.` | única entrada de las cinco «You can't» de las dos fichas sin verbo: se lee como permiso, no como prohibición | `You can't do the interview in your room.` |
| 110 | `The visit itself: never the target. Cost of a no: the bad person at breakfast.` | `target` metafórico + `the bad person at breakfast` es un modismo que no existe ni en inglés ni en español | `The visit is never the problem. If you say no to it, tomorrow you are the bad one at breakfast.` |
| 111 | `it sounds like you're selling the visit` | *vender la visita* no significa nada para el lector | `it sounds like you are asking for something in exchange` |
| 113 | `In Dani's head: you work from your room.` | modismo | `Dani thinks you work in your room.` |
| 116 | `your window looks at a street full of bars` | `look at` no es lo que hace una ventana (`look onto`), y el lector lo lee como *mira a* | `from your window you see a street full of bars` |
| 117 | `the living room is taken` · `apartment hunting in two weeks, both of you` | **pasiva plena** · compuesto en gerundio | `Dani's cousin has the living room, and you lose the video call.` · `and then the two of you look for another apartment in two weeks` |
| 168 | `an **open question** about Iván's days, and a fact you didn't have · what you lose` | dos criterios sin verbo, y el segundo (`what you lose`) no dice qué hay que hacer con eso | `you asked an **open question** about Iván's days, and you learned something you did not know · you said what you lose` |
| 185 | `This card replaces a row in your Facts table.` | metalengua sobre la propia ficha (`row`, `Facts table`) | `This changes one line in your Facts.` |
| 189-190 | `And saying it, and then changing it, is the best moment of this game.` | dos gerundios coordinados de sujeto, con la cópula al final | `Say it first. Change it later. That is the best moment of the game.` |

La 189-190 es la peor de la tabla por dónde está: se lee **en mitad de la partida**, en el turno
8, con el otro jugador esperando.

---

## 3. LEVE — seis

**L1 · En la ficha de B, `to renew` se define con `to sign` una fila antes de que `to sign`
exista.** Líneas 143-145: `lease`, `renew`, `sign`. En la de A el orden es el bueno (71-73:
`lease`, `sign`, `renew`). Intercambiar dos filas en B.

**L2 · El rationale de `connectors-a2` cita una frase que no está en la ficha.** Línea 232:
*«I'm not saying no, but on Monday I have an interview»*. El exponente real (157) es
`I'm not saying no, but…`, con puntos suspensivos. El `but` sí está y la referencia es correcta;
lo que hay que arreglar es la cita, no la referencia. Mismo defecto que L1 del escenario 2.

**L3 · Exponentes: 10 por rol.** §11 (línea 301 del blueprint) dice `exponentes 6-9`; §2 (líneas
48, 126 y 233) dice `6 a 10`. La ficha usa 10 y **lo declara**, con el argumento correcto. No es
un fallo de la ficha, es el blueprint contradiciéndose. Queda abajo.

**L4 · Tres calcos menores, una vez cada uno** (solapan con `fase7-naturalidad-6.md`; los digo y
no insisto): `any more` en dos palabras donde el americano escribe `anymore` (162); `The whole
news` (95), que en inglés no se cuenta así —`the whole thing` o `all three parts`—; y `looks at`
de la M6.

**L5 · `hostel` pasa solo por ser cognado.** A tiene que **decir** la palabra
(`He's not going to a hostel — not in this family.`, línea 86) y su tabla de vocabulario no la
define — la fila se mudó a B, por decisión razonada del hallazgo 62. Funciona porque *hostel* ≈
*hostal*. Anotado para quien porte este escenario a coreano, japonés o ruso: ahí la fila vuelve.

**L6 · Dos estructuras habladas sin ancla, y sobra sitio para una.** `What's wrong with…?` (88) y
`Wait — when?` (89) son wh-questions, y ni `wh-questions` ni `present-simple-questions` están
referenciados. `I have to call my aunt tonight.` (91) es `have-to-must`, tampoco. Con 10
referencias ya se está en la parte alta y la ficha explica por qué no permutó nada; lo dejo
anotado por si alguna se cae: **`have-to-must` es la primera que debería entrar**, porque la
frase que la pide es el reloj del escenario entero.

---

## 4. `grammarReferences`, slug a slug

Contrastado leyendo el campo `slug` de cada archivo, no el nombre del archivo — y aquí importa,
porque dos no coinciden: `present-continuous-future-a2` vive en `a2/present-continuous-future.ts`
y `connectors-a2` en `a2/connectors.ts`. La ficha usa el slug, que es lo correcto.

| # | slug en la ficha | ¿existe? | dónde | nivel | título: ¿coincide? |
|---|---|---|---|---|---|
| 1 | `present-continuous-future-a2` | sí | `ingles/a2/present-continuous-future.ts` | A2 | exacto |
| 2 | `first-conditional` | sí | `ingles/a2/first-conditional.ts` | A2 | exacto |
| 3 | `will-future` | sí | `ingles/a2/will-future.ts` | A2 | exacto |
| 4 | `quantifiers` | sí | `ingles/a2/quantifiers.ts` | A2 | exacto |
| 5 | `connectors-a2` | sí | `ingles/a2/connectors.ts` | A2 | exacto |
| 6 | `going-to` | sí | `ingles/a1/going-to.ts` | A1 | exacto |
| 7 | `there-is-there-are` | sí | `ingles/a1/there-is-there-are.ts` | A1 | exacto |
| 8 | `prepositions-time` | sí | `ingles/a1/prepositions-time.ts` | A1 | exacto |
| 9 | `imperative` | sí | `ingles/a1/imperative.ts` | A1 | exacto |
| 10 | `can-ability` | sí | `ingles/a1/can-ability.ts` | A1 | exacto |

**10 de 10 resuelven. 10 de 10 títulos coinciden carácter por carácter.**

El sufijo, que es donde esto se rompe siempre: de los cinco temas de A2 referenciados, **dos
llevan `-a2`** (`present-continuous-future-a2`, `connectors-a2`) y lo llevan porque el registro lo
lleva; los otros tres (`first-conditional`, `will-future`, `quantifiers`) están bien **sin**
sufijo, que es como el registro los tiene. Nadie ha «normalizado» por simetría, que es el error
que devolvería `null` desde `getTopicBySlug`. Comprobado también al revés: en `ingles/a2` sí
llevan sufijo `past-continuous-a2`, `prepositions-movement-a2`, `relative-clauses-a2` y
`used-to-a2`; ninguno está referenciado aquí, así que no hay riesgo de cruce. Los cinco de A1 van
marcados `// a1` y los cinco de A2 `// a2`; la marca es correcta en los diez.

Dos notas sobre los rationales, que son de nivel y no de existencia:

- El de `prepositions-time` **declara una regla que la ficha incumple** (M2). Cuando se arregle
  la línea 125, el rationale pasa a ser verdad.
- El de `connectors-a2` cita una frase inexistente (L2).

Los otros ocho citan formas que están literalmente en las tablas de exponentes. El de
`will-future` es particularmente honesto: declara que el `will` de la firma no está escrito en
ninguna ficha y explica por qué aparece igual. Eso es lo que debería hacer un rationale.

---

## 5. Orden de arreglo

Si solo hay tiempo para una tanda, esta:

1. **G1** — el exponente del mensaje a la tía. Una fila, y es el último acto obligatorio del
   juego.
2. **G4** — las cuatro líneas del cierre común. Las leen los dos y las leen despacio.
3. **G2** — los dos bullets de «Only you know» de A. Es información que decide la partida escrita
   en la sintaxis más difícil del archivo.
4. **G3** — los criterios de éxito de A.
5. **M2** y **M3** — las dos son de una celda o tres, y las dos son contradicciones internas: la
   ficha se desmiente a sí misma. Baratas y visibles.
6. **M1**, **M5**, **M4**.
7. **M6** y los leves.

**Nada de esto obliga a tocar el motor.** La carta sigue matando el plan de B en el turno 8, las
dos salidas de A siguen viviendo en sus datos ocultos, el reparto sigue siendo 50/50 y la
asimetría sigue estando en las palabras. Lo que falla es cómo está escrito, no qué está escrito.

---

## 6. Pendiente fuera de este archivo

Dos cosas que salieron aquí y que no se arreglan desde la ficha del 6:

1. **`what's still open`, la fórmula del molde, no se puede leer en A2** (M4). Está en
   `fase7-modelo-ficha-en.md` y viaja a los ocho escenarios y al punto obligatorio del cierre.
   O se glosa una vez en la caja, o se sustituye por `what you did not decide today` en el molde
   y detrás en los ocho. Lo segundo es más barato y no gasta ninguna de las diez filas de
   vocabulario de nadie.
2. **§11 dice `exponentes 6-9` y §2 dice `6 a 10`** (L3). Es la tercera ficha que lo declara.
   Mientras el blueprint no elija un número, cada auditoría de nivel tiene que decidirlo por su
   cuenta, y eso es exactamente lo que un blueprint existe para evitar.

Y una que confirmo desde este lado: la **regla de conteo de prosa** que la ficha escribió arriba
funciona. La apliqué a ciegas y salieron los dos números declarados, 333 y 341. Merece subir a
§11 tal cual está.
