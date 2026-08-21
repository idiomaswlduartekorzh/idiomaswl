# Escenario 2 · `no-appointment-until-thursday` — auditoría de NIVEL (versión en inglés)

Auditado: `artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`.
Contra: §4 y §11 de `docs/habla-acompanado-blueprint.md`, el molde
`artifacts/habla-a2/fase7-modelo-ficha-en.md`, la caja `caja-de-herramientas-a2.md`, y
`src/data/grammar/ingles/{a1,a2,b1}` para los slugs.

La ficha está entera en inglés, así que se auditan **dos niveles distintos**: el inglés que el
estudiante tiene que **decir** (A2 hablado, con lista de prohibidas) y el que tiene que **leer**
(A2 leído, que aguanta un poco más). Y una pieza nueva que antes no existía: las **20
definiciones** del bloque de vocabulario, que se comprueban una a una.

**Veredicto: PASA CON CAMBIOS.** La mitad hablada está limpia —lo verifiqué con grep, no a
ojo—. Los fallos se concentran en las dos piezas nuevas: la prosa que hay que leer y el bloque
de vocabulario.

---

## 0. Lo que pasa limpio (y conviene no romper)

**Estructuras prohibidas: cero.** Buscadas por patrón sobre el archivo entero, no leídas por
encima:

| prohibida | ocurrencias |
|---|---|
| present perfect de duración con `for` / `since` | **0** |
| `could` de cortesía | **0** |
| `would` / `would rather` / `would prefer` | **0** |
| modal + infinitivo perfecto (`must have been`…) | **0** |
| condicional hipotético (2.º condicional) | **0** |

El único present perfect del documento es `a patient who has missed twice` (línea 37) — de
experiencia, A2, y además está en la información oculta del rol A, que tiene prohibido decirla.

**Los exponentes hablados: 16 de 18 son A2 de manual.** Comparativos irregulares (`It's worse
than yesterday`), `can` / `can't` con razón detrás, presente simple, pregunta en pasado simple
en forma directa, `should`, primer condicional con imperativo en la principal. Nada que un A2 no
haya visto.

**Los 11 `grammarReferences` existen los 11, y los 11 títulos coinciden carácter por carácter**
con el registro. El sufijo `-a2` está bien manejado: `connectors-a2` lo lleva porque el registro
lo lleva; `should-advice`, `first-conditional`, `past-simple-questions`, `have-to-must`,
`quantifiers`, `comparatives` y `present-perfect-ever-never` correctamente **no** lo llevan. Los
tres de A1 (`imperative`, `can-ability`, `telling-time`) están en `ingles/a1` y van marcados
`// a1`. Detalle en §4.

**Presupuesto de §11: cumplido en las dos fichas.** Prosa 330 (A) y 337 (B) según mi cuenta —la
ficha se autodeclara 346 y 350; las dos cuentas caben bajo el tope de 350—. Datos 10 filas,
vocabulario 10 entradas, exponentes 9. Todo dentro.

**Variedad americana: sostenida.** `cell`, `front desk`, `emergency room`, `X-ray`. Ningún
britanismo.

---

## 1. GRAVE — cuatro cosas que rompen el nivel

### G1 · El título del rol B es una pasiva, y es lo primero que B va a decir

> Línea 95: `## ROLE B — You need to be seen today`
> Línea 102: `**You want** · To be seen **today**.`

La pasiva está en la lista de prohibidas, vive en `passive-voice-b1`, y aquí no está escondida
en una nota: está en el **título del rol** y en el **objetivo**, las dos líneas que el estudiante
lee antes que ninguna otra. El objetivo del rol es exactamente la frase que abre la
conversación —arranca B—, así que esta pasiva no se queda en la lectura: se dice.

**Versión corta:**

- Título → `ROLE B — You need to see the dentist today`
- Objetivo → `**You want** · To see the dentist **today**.`

Y de paso desaparece la tercera pasiva de la ficha (ver G3).

### G2 · `the book` es la palabra que sostiene el escenario y no está definida en ninguna parte

Aparece **11 veces** (líneas 29, 34, 48, 64, 69, 80, 81, 136…) y ninguna de las dos tablas de
vocabulario la recoge. Es la agenda de citas, no un libro — y para un lector hispanohablante
`book` significa *libro* y punto. Es el peor tipo de hueco: transparente en falso.

Peor en el rol B: la definición de `slot` es `one free time in the book`, y **B no ve la palabra
`book` en ningún otro sitio de su ficha**. Recibe una definición apoyada en un término que su
ficha no le da.

**Dos salidas, la segunda mejor:**

1. Añadir fila en las dos tablas: `the book | the list of all the appointments for the day | it
   is full today and tomorrow`. Pero eso mete a 11 el vocabulario de A, y el tope es 10.
2. **Cambiar `book` por `calendar` en las 11 líneas.** Es cognado (*calendario*), se entiende
   sin definirlo, y libera la fila. `to be fully booked` puede quedarse: su definición (`no free
   times left at all`) no depende de `book` y ya está bien.

### G3 · Tres relativas de pasiva reducida en la parte que hay que leer

Pasiva **más** elipsis del relativo: por encima de B1, y las tres están en zonas que el
estudiante sí lee entero (información oculta, qué pierdes, datos duros).

| línea | como está | versión corta |
|---|---|---|
| 39 | `Every empty chair counts against reception — a patient sent elsewhere too.` | `Every empty chair is bad for the front desk. A patient who goes to another clinic is bad too.` |
| 41 | `A fourth empty chair, a plan patient lost to the office on the corner. Both on your name.` | `A fourth empty chair. And a patient with the plan goes to the clinic on the corner. Both are your fault.` |
| 52 | `Saturdays: only patients seen here before` | `Saturdays: only for patients who came here before` |

En la 41 hay además `plan patient`, un compuesto opaco, y `Both on your name`, que ni siquiera
es inglés correcto (*on you* / *your fault*).

### G4 · El cierre —la única pantalla que leen los dos— está hecho de preguntas incrustadas

Líneas 186-193. Las preguntas incrustadas están en la lista de prohibidas, y este bloque tiene
cuatro, más una pasiva con `get`. Es además el texto que los dos jugadores leen **despacio y al
final**, comprobando punto por punto: es donde menos se puede tropezar.

| línea | como está | versión corta |
|---|---|---|
| 186 | `You finish when the two of you say the whole plan out loud and check that it matches, with these four things:` | `You finish when you both say the plan out loud. Then check: are the two plans the same? The plan has four parts:` |
| 188 | `Day, hour and branch of the appointment, and what time you have to be there.` | `Day, time and branch of the appointment. And the time you have to arrive.` |
| 189 | `How much gets paid, and when` | `Who pays, how much, and when` |
| 191 | `What happens with the pain until then, and when not to wait.` | `What to do about the pain until then. And when to go to the emergency room.` |
| 193 | `One of the four missing and it isn't finished.` | `If one of the four is missing, it is not finished.` |

La 193 es además una absoluta sin verbo — construcción de prensa, no de A2.

---

## 2. MEDIO — siete

### M1 · `may` de posibilidad (2 veces, una es exponente que A tiene que decir)

> Línea 81 (exponente A): `Something may open up later, but I can't promise anything.`
> Línea 37 (lectura): `You can say something may open up.`

`may` epistémico es B1 en el English Vocabulary Profile, no hay tema de A2 que lo cubra en
`src/data/grammar/ingles/a2`, y **la propia lista de `grammarReferences` lo delata**: los 11
refs anclan todo lo demás y a `may` no lo ancla ninguno. Cuando el andamiaje gramatical no puede
apuntar a una estructura, la estructura sobra.

**Versión corta:** `Maybe I have something later today, but I can't promise.` — `maybe` es A1,
mantiene la puerta entreabierta y no nombra a nadie, que es lo que la fila tenía que hacer.

### M2 · Prosa de lectura que no cabe en A2 leído

Todas se leen, ninguna se dice. Ordenadas por línea:

| línea | como está | por qué no cabe | versión corta |
|---|---|---|---|
| 24 | `The distance lives in I'm afraid…, Let me…, not in the pronoun.` | metáfora + metalengua sobre pronombres | `In English there is no formal *you*. The formal tone is in the words: I'm afraid…, Let me…` |
| 29 | `That person out with three things:` | sin verbo | `The person leaves with three things:` |
| 32 | `she's mid-consultation` | compuesto que no es A2 | `she is with a patient` |
| 38 | `The key here.` | fragmento | `This is the key.` |
| 74 | `nobody else in the set does this for a living` | `in the set` es meta (el estudiante no sabe qué es «el conjunto») + modismo | `You are the only one here who works at a counter.` |
| 97 | `Somebody else's counter, nobody you know. Distance even when it hurts` | sin verbo + abstracto | `This is not your place, and you don't know these people. Be polite, even when it hurts.` |
| 105 | `storeroom key yours, nobody else's` | telegráfico sin verbo | `you have the key` |
| 106 | `Come back another day for the same line.` | `line` opaco fuera de contexto | `You can't come back another day and wait again.` |
| 109 | `Out it comes if they ask something open.` | inversión + metalengua | `Say it if they ask an open question.` |
| 110 | `Hence no reminder, ever.` | **`hence` es C1** | `So the clinic never calls you.` |
| 112 | `anywhere else the treatment is out of pocket` | modismo + adverbial antepuesto | `In any other clinic you pay for everything.` |
| 145 | `the shortest in the set on purpose: not your ground, not your words` / `coming at you` / `hurting isn't enough` | meta + tres modismos + gerundio sujeto | `The shortest list on purpose: this is not your place and these are not your words.` / `they will say these words to you` / `pain is not enough` |
| 162 | `A date you can really make` | `to make a date` = poder ir, modismo | `A date you can really come to` |
| 162 | `what you pay, or that you don't` | elíptico | `how much you pay — or that you pay nothing` |

### M3 · Una contradicción que el lector A2 no puede resolver, y que A tiene que decir en voz alta

> Línea 55: `For tonight | something cold outside, 10 minutes · no chewing on that side · soft
> food, nothing hot, nothing cold`

`something cold` y `nothing cold` en la misma celda. La distinción real es *fuera de la boca* vs
*bebida*, pero `outside` no la hace: un A2 lee una contradicción y elige una de las dos al azar.
Y el punto 4 del cierre exige decir esto.

**Versión corta:** `put something cold on the face, 10 minutes · don't chew on that side · soft
food · no hot drinks, no cold drinks`

### M4 · El mismo acto tiene tres nombres, y uno de ellos se lee mal

| línea | | |
|---|---|---|
| 85 | exponente de A | `Can you say the number one by one?` |
| 127 | datos de B | `one number at a time` |
| 190 | cierre común | `one digit at a time` |
| 91 / 162 | criterios de éxito | `digit by digit` |

`the number one by one` se lee como *el número uno por uno*. Y `number` y `digit` van
alternándose para la misma cosa en un cierre que obliga a comprobar precisamente eso.

**Versión corta:** `digit` en los cuatro sitios. Exponente → `Can you say it digit by digit?`

### M5 · Seis definiciones que no son más sencillas que la palabra que definen

Comprobadas las 20, una a una. **Cinco son modélicas** y no se tocan: `walk-in`, `to be fully
booked`, `X-ray` (*a photo of the inside of a tooth*), `to squeeze someone in`, `no-show` (*a
patient who doesn't come and doesn't call*). Nueve más pasan sin nota. Estas seis fallan:

| palabra | definición actual | qué falla | versión corta |
|---|---|---|---|
| `waiting list` | `people who wait in case somebody doesn't come` | **`in case` es B1**. La palabra es más transparente que su definición: define hacia arriba | `a list. If a patient doesn't come, the clinic calls you` |
| `appointment` (A y B) | `a time the clinic keeps for one patient` | `keep` = *reservar* no es el sentido A1/A2 de `keep`; se lee «el clínica guarda un tiempo» | `a day and a time for one patient only` |
| `emergency check` (A y B) | `a short visit for pain, no appointment needed` | `no appointment needed` es pasiva reducida | `a short visit for pain. You don't need an appointment` |
| `referral note` (A) | `a paper that says what's wrong, for another clinic` | pregunta incrustada + sintagma colgando al final | `a paper for another clinic. It says what the problem is` |
| `to cover` (A y B) | `when the plan pays for the treatment` | define un verbo con una oración de `when`, y se apoya en `treatment`, sin definir | `the plan pays, so you pay nothing` |
| `chipped` (B) | `when a small piece breaks off` | `break off` es phrasal, más difícil que `break`. Y la celda `here` pone en negrita **sharp**, palabra que no se define en ningún sitio y que B tiene que decir (`sharp edge on my tongue`, línea 119) | `when a small piece of a tooth breaks`. Y o se define `sharp`, o se le quita la negrita y que lo cargue la fila de datos |

### M6 · El bloque 3 está muerto para B, y el 4 para A

El toolkit de A (línea 74) dice: *«referral note, emergency check, X-ray are yours, not
theirs»*. El de B (línea 145) dice: *«emergency check, referral note, first consultation coming
at you: ask»* — bloque 3 `[receives]`, el de pedir que te repitan.

Pero **la tabla de vocabulario de B ya define `emergency check`, `referral`, `to squeeze someone
in` y `to cover`**, con la misma glosa que la de A. B no tiene ninguna razón para preguntar qué
significan: ya lo sabe antes de empezar. El ejercicio de reparación que las dos líneas de toolkit
prometen está resuelto por la pieza que va justo encima.

De las 10 palabras por rol, **8 son compartidas** y la columna `what it is` es idéntica en 6.
La asimetría que la cabecera del archivo reivindica («comparten término y no comparten glosa»)
vive solo en la tercera columna. Eso está bien para el `here`, pero deja el reclamo de la
cabecera sin respaldo.

**Salida:** a `emergency check` y `referral note` en la ficha de **B**, dejarles la columna `here`
y vaciar la columna `what it is` con una nota del tipo `they will say this — ask what it means`.
Dos entradas, no las ocho. Con eso el bloque 3 vuelve a tener trabajo y el 4 de A también.

### M7 · `first consultation` se le anuncia a B y A no la tiene

Aparece **una sola vez en todo el documento**, en el toolkit de B (línea 145), como uno de los
términos que le van a caer encima. No está en los datos de A, ni en su vocabulario, ni en sus
exponentes, ni en su toolkit. B queda avisado de una palabra que A no va a decir nunca.

**Salida:** o se quita de la línea 145, o se mete donde encaja sola — la fila `The book` de A
(línea 48) ya describe exactamente eso: `first free slot: Thursday 10, 7:00 a.m. · 10 minutes
early — forms and an X-ray`. Bastaría con nombrarlo: `first consultation: Thursday 10, 7:00
a.m.`

---

## 3. LEVE — cinco

**L1 · `present-perfect-ever-never` se justifica con una frase que no está en el archivo.** El
rationale (línea 220) cita `I've never gotten a text from this clinic`; `gotten` no aparece en
ninguna otra línea. El único present perfect real es el de la línea 37, que es de A y A no puede
decirlo. La fila de datos que lo motiva (`no text from this clinic, ever`, línea 127) se dice en
A2 con presente simple: `I never get texts from this clinic`. O se añade el exponente a la tabla
de B, o se reescribe el rationale con lo que la ficha sí pide. El razonamiento sobre
duración-con-`for`/`since` que lleva dentro es correcto y merece quedarse.

**L2 · Dos exponentes sin ancla, dos anclas de A1 sin usar.** `What days do you have after eight
thirty?` es wh-question en presente simple (`wh-questions` o `present-simple-questions`, ambos en
`ingles/a1`, ninguno referenciado). `That's my sister's number. Mine is …` es genitivo sajón más
posesivo (`possessive-s`, A1, no referenciado). Con 11 refs ya se está en la parte alta; no pido
añadir, pido que si algo se recorta se recorte antes que estos.

**L3 · `I have … with me, if that helps.`** Subordinada condicional, pero funciona como bloque
léxico fijo y es el único de B. Pasa. Lo anoto para que nadie lo «arregle» quitándolo.

**L4 · `hour` donde el inglés pide `time`.** `Day, hour and branch` (líneas 91 y 188), `one road,
with its hour on it` (83), `close an hour with the reason` (153), `name an hour yourself` (156).
Es calco de *hora*. Cuenta como nivel y no solo como naturalidad porque `day, hour and branch`
se lee como una duración, no como una hora del reloj. (Solapa con `fase7-naturalidad-2.md`; lo
señalo una vez y no insisto.)

**L5 · Fuera de mi carril, una línea.** La carta va fechada a las 4:52 p.m.; la escena empieza a
las 4:20 y dura 6 minutos. La carta llega media hora después de que la conversación haya
terminado. No es un problema de nivel — es para quien audite coherencia.

**L6 · Regla del `here` en §11** (ninguna celda empieza por pronombre + verbo conjugado): rota en
5 celdas. Ya está itemizado como R11-R15 en `fase7-calcable-2.md`. No duplico.

---

## 4. `grammarReferences`, slug a slug

Contrastado contra `src/data/grammar/ingles/{a1,a2}` leyendo el campo `slug` de cada archivo, no
el nombre del archivo — y en un caso no coinciden: el tema vive en `a2/connectors.ts` pero su
slug es `connectors-a2`. La ficha usa el slug, que es lo correcto.

| # | slug en la ficha | ¿existe? | dónde | título: ¿coincide? |
|---|---|---|---|---|
| 1 | `should-advice` | sí | `ingles/a2/should-advice.ts` | exacto |
| 2 | `first-conditional` | sí | `ingles/a2/first-conditional.ts` | exacto |
| 3 | `past-simple-questions` | sí | `ingles/a2/past-simple-questions.ts` | exacto |
| 4 | `have-to-must` | sí | `ingles/a2/have-to-must.ts` | exacto |
| 5 | `quantifiers` | sí | `ingles/a2/quantifiers.ts` | exacto |
| 6 | `comparatives` | sí | `ingles/a2/comparatives.ts` | exacto |
| 7 | `connectors-a2` | sí | `ingles/a2/connectors.ts` | exacto |
| 8 | `present-perfect-ever-never` | sí | `ingles/a2/present-perfect-ever-never.ts` | exacto |
| 9 | `imperative` | sí | `ingles/a1/imperative.ts` | exacto |
| 10 | `can-ability` | sí | `ingles/a1/can-ability.ts` | exacto |
| 11 | `telling-time` | sí | `ingles/a1/telling-time.ts` | exacto |

**11 de 11 resuelven. 11 de 11 títulos coinciden carácter por carácter.**

Sobre el sufijo `-a2`, que es donde se rompe esto normalmente: de los ocho temas de A2
referenciados, **solo uno lo lleva** (`connectors-a2`), y lo lleva porque el registro lo lleva.
Los otros siete están bien **sin** sufijo. Nadie lo ha «normalizado» por simetría, que es el
error que devolvería `null` desde `getTopicBySlug`. Comprobado también al revés: en `ingles/a2`
sí llevan sufijo `past-continuous-a2`, `prepositions-movement-a2`, `present-continuous-future-a2`,
`relative-clauses-a2` y `used-to-a2` — ninguno está referenciado aquí, así que no hay riesgo de
cruce.

Los tres de A1 van marcados `// a1` en el comentario de línea, distintos de los ocho `// a2`. La
distinción está bien puesta.

---

## 5. Orden de arreglo

Si solo hay tiempo para una tanda, esta:

1. **G1** — quitar la pasiva del título y del objetivo de B. Una línea y media, y es la frase que
   abre la conversación.
2. **G2** — `book` → `calendar`, 11 sustituciones.
3. **G4** — reescribir el cierre común. Lo leen los dos y lo leen despacio.
4. **M5** — las seis definiciones. Es la pieza nueva; si falla, la pieza no sirve para lo que se
   metió.
5. **G3**, **M1**, **M3**, **M4**, **M6**, **M7**.
6. **M2** y los leves.

Nada de esto obliga a tocar el motor: el jueves a las 7:00 sigue siendo el imposible con dos
números detrás, las dos salidas siguen viviendo en los datos ocultos de A, y la carta sigue
asignando una tarea con hora. Lo que falla es cómo está escrito, no qué está escrito.
