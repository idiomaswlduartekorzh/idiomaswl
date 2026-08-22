# Escenario 2 · `no-appointment-until-thursday` — simulación sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra el texto vivo de
`artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md` **tal como quedó tras la
pasada quirúrgica del 22 ago 2026** (cierre con dueño por punto, 9 turnos por rol, `the sign for
the hospital`, `310 218 44 71` en la fila `Reminders` de A).

Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`.
Motor sin tocar: `artifacts/habla-a2/fase4-escenarios-1-3.md` §2.

Sustituye a `fase7-simulacion-2.md`, que se jugó contra la versión del 20 de agosto.

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Reglas de esta ronda — se declaran antes de jugar

### Regla dura de información

Cada jugador ve **solo su ficha**. Ningún jugador usa un dato de la otra hasta que se lo dicen en
voz alta. Cada vez que hizo falta un dato del otro lado, va marcado **⚠ FILTRACIÓN**, no
disimulado. La carta de la Dra. Restrepo se abre **al terminar el turno global 5** y **solo en la
pantalla de A**; B nunca la ve.

### Declaración 1 — de qué lado cae el handicap en cada pareja

La ronda anterior (`fase7-simulacion-2.md`) puso **los tres handicaps del lado de B**, que es el
que pide y el motor de la conversación: flojo = B, callado = B, atajista = B. Salió 80/20, 86/14
y un reparto que parecía defecto del escenario. Esta ronda los alterna y lo escribe:

| pareja | quién lleva el handicap | lado | ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | nadie | — | — |
| 2 · sólido + flojo | **el FLOJO es A**, el mostrador | **concede** | flojo = B (pide) |
| 3 · flojo + flojo | los dos | perfil parejo | igual |
| 4 · el callado | **el CALLADO es A**, el mostrador | **concede** | callado = B (pide) |
| 5 · el atajista | **el ATAJISTA es B**, el paciente | **pide** | atajista = B (pide) |
| 5-bis · anexo | **el ATAJISTA es A**, el mostrador | **concede** | no se jugó |

El atajista se juega por los **dos lados** a propósito: su jugada clásica en este escenario —
aceptar el jueves — solo existe desde B, y el diseño afirma que ya no gana. Había que
comprobarlo desde donde se hace, y comprobar aparte si el mostrador tiene su propio atajo.

### Declaración 2 — el contador de palabras, uno solo

**Se cuenta todo lo que sale por la boca.** En las cinco parejas, en los dos roles, sin
excepción:

- cuenta lo dicho en inglés,
- cuenta lo dicho en español (y se reporta aparte, pero **suma**),
- **cuenta la línea leída de la ficha en voz alta** `[L]`: salió por la boca y el otro la oyó,
- cada dígito dicho es una palabra (`three one zero` = 3),
- las contracciones son una (`I'm` = 1), `a.m.` es una,
- **no** cuenta lo que se lee en silencio, ni las marcas, ni las acotaciones entre `>`.

Medido con `/tmp/…/contar-palabras.mjs` sobre este mismo archivo, no a ojo.

### Declaración 3 — qué se juzga con qué

La **puerta 5 (reparto ≥ 40 %)** se juzga **solo sobre las parejas de perfil parejo**: 1
(sólido+sólido) y 3 (flojo+flojo). En la 2 y la 5 el reparto se informa pero no se juzga; en la 4
la cifra **no significa nada**, porque el perfil del callado es producir tres palabras por turno.

**Al callado se le mide otra cosa:** si produjo **las piezas que solo él tiene** — el dato oculto
(la puerta de las 5:20), la condición de la carta, el precio, la relectura del número y la señal
del hospital. Si consigue su objetivo asintiendo, eso es defecto y va nombrado.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (toolkit, «Say it here») para producir el turno |
| `[D]` | miró la tabla de datos duros para leer una cifra |
| `[L]` | **leyó en voz alta una línea de su ficha, literal, como si fuera habla suya** |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha |

### Perfiles

El A2 **sólido** falla en tercera persona, preposición y pregunta sin auxiliar. El A2 **flojo**
produce `I no can`, `is much`, verbos sin conjugar, presente por pasado y frases a medias. El
**callado** contesta con una a tres palabras. El **atajista** habla más suelto de lo que le toca
—va a cerrar, no a aprender— y se salta lo que le estorbe.

### Modelo de minutos

Turno de sólido ≈ 8–14 s · turno de flojo con consulta ≈ 18–30 s · turno monosilábico ≈ 3–6 s ·
**turno leído `[L]` ≈ 5–8 s, porque no hay planificación** · celular dictado dígito a dígito +
relectura ≈ 40–60 s · turno de recitado de cierre ≈ 25–40 s · pausa de carta ≈ 12–20 s.

---
---

## 1 · SÓLIDO + SÓLIDO

> Handicap: ninguno. A sólido (mostrador), B sólido (paciente). Arranca B.

**B1** — Good afternoon. Sorry to bother you. `[F]` I don't have an appointment. Can you help me,
please? My tooth hurts a lot.

**A1** — Good afternoon. Let me look at the calendar. `[D]` … I'm afraid we're fully booked today
and tomorrow. `[F]` The first opening is Thursday the tenth, at seven in the morning — a first
consultation, thirty minutes.

**B2** — Thursday at seven I can't come, because I open the warehouse in Girón. `[F]` On Thursdays
the truck comes at six thirty and the storeroom key is mine. What days do you have after eight
thirty?

**A2** — `[F]` … What happened?

**B3** — On Sunday a piece of my lower back tooth broke. `[F]` The edge is sharp and it cuts my
tongue when I talk. It's worse than yesterday, and it hurts more when I drink something cold. I
take two painkillers a day. `[D]`

> *Fin del turno global 5. La carta se abre en la pantalla de A. B no ve nada y no sabe que
> existe.*

**A3** — Hold on. `[F]` … A chipped tooth — that's the word for it, chipped. `[F]` Let me write to
the doctor. `[X]` … Before that, two things. How long can you stay here today? And do you work on
Saturdays?

**B4** — I can wait here. `[F]` I'm free until seven and nobody is waiting for me at home. And I
don't work on Saturdays.

**A4** — That helps. Then Saturday the twelfth, nine in the morning, here in Cabecera — that's the
long appointment, for the full treatment. The plan covers it here, and only here. `[F]` Saturdays
are only for patients we see here first, so I hold it for you now. Is that OK for you?

**B5** — Yes. Saturday the twelfth at nine. `[X]` … And today?

**A5** — The doctor says yes. `[D]` Today at six fifteen, here, between two patients. It isn't a
full visit — fifteen minutes. She looks at it, she files the sharp edge down so it stops cutting
you, and she gives you something for the pain. Be here at six ten.

**B6** — Six fifteen — that's almost two hours, but I can wait. `[F]` Does my plan cover it here?
I have seventy thousand with me, if that helps.

**A6** — You pay nothing today and nothing on Saturday: the plan covers both, here. Keep your
money. `[F]` … Now the number. In the file I have three one zero, two one eight, four four, seven
one. `[D]` Is that yours?

**B7** — No, that's my sister's number. `[F]` Mine is three one zero, five four two, eight eight,
zero six.

**A7** — Can you say it one at a time? `[F]` … Three one zero, five four two, eight eight, zero
six. That's what I wrote. So, we're clear then — tell me the plan and I check it on the screen.

**B8** — Today at six fifteen, here in Cabecera, and I have to be here at six ten. Saturday the
twelfth at nine, here too, for the full treatment. I pay nothing, the plan covers it. My number is
three one zero, five four two, eight eight, zero six. Tonight I put something cold on my face for
ten minutes, I don't chew on that side, soft food, no hot drinks and no cold drinks.

**A8** — All of that is on the screen. `[D]` Six fifteen today, Saturday the twelfth at nine, zero
pesos, and the number I wrote is the one you just said. One more thing, and it's the important
one: if the pain goes to your ear or your eye, don't wait for six fifteen. Go to the hospital
emergency room tonight. `[F]`

**B9** — If it goes to my ear or my eye, the emergency room tonight. Understood. Thanks for your
time — really. See you at six ten.

**A9** — Thanks for waiting. See you at six ten.

### Diagnóstico 1

| Medida | Resultado |
|---|---|
| **Handicap** | ninguno |
| **¿Llega al cierre?** | **Sí**, y por primera vez con los cuatro puntos en manos de su dueño |
| **Turnos** | A 9 · B 9 = 18. Declarados 9 por rol. **Clavado** |
| **¿Se murió?** | No |
| **Andamiaje** | `[F]` 12 · `[D]` 5 · `[X]` 2 · **`[L]` 0** |
| **Fuga al español** | Ninguna |
| **Minutos** | **6 min 15 s** — 16 turnos de conversación ≈ 3:20 · celular con relectura ≈ 0:55 · pausa de carta ≈ 0:15 · dos silencios ≈ 0:20 · los dos turnos de recitado (B8, A8) ≈ 1:25. Declarados 6. **Cuadra** |
| **Filtración** | Ninguna |
| **¿Saben que terminaron?** | **Sí**, y lo saben por el texto: A7 pide el recitado, B8 lo da, A8 lo comprueba contra la pantalla |

**El reparto del cierre funciona y se nota en la cifra.** La ronda anterior midió 57/43 en esta
misma pareja; con los cuatro puntos repartidos, B produce el turno más largo de la conversación
(B8, el recitado) y el reparto se invierte a favor del que pide. Es el efecto buscado por el
arreglo 3 de la pasada del 21.

**Dos arreglos del texto se ven funcionar en directo.**

1. `files the sharp edge down` sale entero en **A5**. En la ronda anterior A no tenía verbo para
   eso y se inventó una perífrasis; la glosa metida **dentro de la carta** —y no como fila de
   vocabulario— llega en el turno exacto en que hace falta y ni un turno antes.
2. **El subargumento del número de la hermana ya es alcanzable.** En A6 el mostrador lee
   `310 218 44 71` de su fila `Reminders` y B lo corrige en B7. La ronda anterior lo declaró
   inalcanzable —solo podía aparecer como error de lectura, fuera de sitio— porque la ficha de A
   no tenía ningún número. Ahora lo tiene, y el subargumento entra por donde debe.

**Lo que sigue sin salir.** `opening` la dice A una vez y B nunca; `branch` no la dice nadie
—porque nadie va al Centro—; `referral note` y `emergency check` tampoco, y son dos de las diez
filas de A y dos de las diez de B. En la mejor conversación de las cinco, **la mitad del
vocabulario de la sede del Centro no existe**, porque el camino que lo obliga es el que nadie
toma cuando el 6:15 aparece.

---
---

## 2 · SÓLIDO (B) + FLOJO (A) — **el flojo está detrás del mostrador**

> Handicap **del lado que concede**: A, el mostrador, es el A2 flojo. B, el paciente, es sólido.
> Es la inversión declarada: la ronda anterior puso aquí al flojo del lado de B.
> Esta es también la pareja donde se prueba **al que sale del paso leyendo su ficha en voz alta**.

**B1** — Good afternoon. Sorry to bother you. `[F]` I don't have an appointment. My tooth hurts a
lot — since Sunday. Can you help me, please?

**A1** — Good afternoon. `[X]` … `We're fully booked today and tomorrow.` `[L]` … `[D]` First
opening: Thursday ten, seven a.m. First consultation, thirty minutes.

**B2** — Thursday at seven I can't come, because I open the warehouse in Girón, and on Thursdays
the truck comes at six thirty. `[F]` The key is mine. What days do you have after eight thirty?

**A2** — `[X]` Eh… no days. Is full. `[X]` … `What happened?` `[L]`

**B3** — On Sunday a piece of my lower back tooth broke. `[F]` The edge is sharp and it cuts my
tongue when I talk. It's worse than yesterday and it hurts more with cold drinks. I take two
painkillers a day.

> *Fin del turno global 5. La carta se abre en la pantalla de A.*

**A3** — Hold on. `[F]` `[X]` … I write to the doctor. `[X]` … The doctor she ask… eh… ¿cómo se
dice? `[ES]` … qué tiene exactamente y con qué fecha vuelve. `[ES]` `[X]` … You come other day?
Which day you can?

**B4** — I don't work on Saturdays, so any Saturday. `[F]` And this afternoon I'm free until
seven. I can wait here.

**A4** — `[D]` Saturday twelve, nine a.m. Is free. `[X]` Is for patients of before, but… today you
see the doctor, so is OK. `[X]` I hold for you.

**B5** — So the doctor can see me today? At what time?

**A5** — `[D]` `[X]` Six fifteen. Today. Here. Fifteen minutes, between two patients. The doctor
she… `[X]` … she make the edge flat. Not hurt your tongue.

**B6** — Six fifteen, here in Cabecera. What time do I have to be there? And does my plan cover
it?

**A6** — `[X]` Eh… six ten. `[F]` … `The plan covers it here, and only here.` `[L]` Saturday
also. You pay nothing.

**B7** — Nothing today, nothing on Saturday. Good. `[F]` One thing — this clinic never texts me. I
think you have the wrong number.

**A7** — `[D]` In the file: three one zero, two one eight, four four, seven one. `[X]` …
`Can you say it one at a time?` `[L]`

**B8** — That's my sister's number. `[F]` Mine is three one zero, five four two, eight eight, zero
six.

**A8** — `[X]` Three one zero… five four two… eight eight… zero six. `[F]` Is right? `[X]` … OK. I
write in the file.

**B9** — So: today at six fifteen, here in Cabecera, and I arrive at six ten. Saturday the twelfth
at nine, here, for the full treatment. I pay nothing, the plan covers both. My number is three one
zero, five four two, eight eight, zero six. Tonight, something cold on my face for ten minutes, no
chewing on that side, soft food, no hot drinks and no cold drinks.

> ⚠ **Ojo:** en **B9** el paciente recita instrucciones para esta noche que **nadie le ha dado**.
> A no dijo ni una en toda la conversación. Ver el diagnóstico: es la filtración de esta pareja.

**A9** — `[X]` Yes. Is correct in the screen. `[F]` … `If the pain goes to your ear, go to the
emergency room tonight.` `[L]` … Thanks.

### Diagnóstico 2

| Medida | Resultado |
|---|---|
| **Handicap** | **A, el que concede** (inversión declarada) |
| **¿Llega al cierre?** | **Sí** — y llega porque cuatro de las cinco piezas de A **son legibles literalmente** |
| **Turnos** | A 9 · B 9 = 18. **Clavado**, y eso ya dice algo: el flojo del lado del mostrador no alarga la conversación, la abrevia |
| **¿Se murió?** | No. Estuvo cerca en **A3**, el turno de la carta |
| **Andamiaje** | `[L]` **5** · `[F]` 6 · `[D]` 5 · `[X]` 12 · `[ES]` 2 |
| **Fuga al español** | **Una sola, en A3**, y muy localizada: al **trasladar la condición de la carta** |
| **Minutos** | **7 min 05 s** — cinco turnos leídos ≈ 0:35 · cuatro turnos de flojo con consulta ≈ 1:50 · nueve de B ≈ 1:55 · reparación en español ≈ 0:30 · celular ×2 ≈ 1:00 · silencios y carta ≈ 0:45 · recitado B9 ≈ 0:30. **+18 % sobre lo declarado** |
| **Filtración** | **Una, grave.** Ver abajo |
| **¿Saben que terminaron?** | **A medias.** B recita porque su ficha se lo manda; A cierra con `Thanks` y sin comprobar nada de verdad |

#### Sí: se puede salir del paso leyendo la ficha — **y desde el mostrador se puede casi entera**

Es el hallazgo grande de invertir el handicap. Las líneas que A leyó, literales, en orden:

> **A1** — `We're fully booked today and tomorrow.`
> **A2** — `What happened?`
> **A6** — `The plan covers it here, and only here.`
> **A7** — `Can you say it one at a time?`
> **A9** — `If the pain goes to your ear, go to the emergency room tonight.`

Las cinco están en la tabla **«Say it here»** de A y **las cinco son oraciones completas**, sin
puntos suspensivos. Con ellas, un A2 que no sabe conjugar entregó: la mala noticia, **la pregunta
abierta que da vuelta al escenario**, el argumento del dinero, la petición del número y **el punto
4 del cierre**. Ninguna se notó: van dichas detrás de un mostrador, que es el sitio del mundo
donde hablar leyendo de una pantalla **es hacer el trabajo**.

**Y hay una segunda capa peor, que la ronda anterior no vio porque el flojo estaba del otro
lado.** La **tabla de datos** de A, telegráfica por diseño, leída en voz alta suena a recepción:
`First opening: Thursday ten, seven a.m. First consultation, thirty minutes.` (A1) y
`Saturday twelve, nine a.m.` (A4) y `In the file: three one zero, two one eight, four four, seven
one.` (A7) son lecturas de tabla, no habla. **En el rol A, leer la ficha en voz alta es
indistinguible de desempeñar el papel.** No pasa con B: B no tiene pantalla delante, y una
persona con la mano en la cara que recita datos suena a persona recitando datos.

**Dónde la lectura no alcanza — y es exactamente donde se fue al español.** En **A3**, A tiene
que contar lo que la carta le pide: que la doctora mete al paciente a las 6:15 **pero antes
necesita saber qué tiene y con qué fecha vuelve**. En la tabla de exponentes de A no hay ninguna
forma para trasladar una condición de un tercero. La más cercana, `Maybe I have something later
today, but…`, deja caer que hay algo, pero **no lleva la condición**. Ahí, y solo ahí, se fue al
español: `qué tiene exactamente y con qué fecha vuelve`. **Ese es el punto que hay que dotar de
andamiaje**, y está en la ficha del que concede, que es la que nadie miró cuando el flojo caía
siempre del otro lado.

#### ⚠ FILTRACIÓN — B9

B recita `something cold on my face for ten minutes, no chewing on that side, soft food, no hot
drinks and no cold drinks`. **Esos cinco datos viven en la fila `For tonight` de A y en ningún
sitio de la ficha de B**, y A no dijo ni uno. B los produjo porque el cierre le exige decir «qué
va a hacer esta noche» y su ficha no le da nada que decir si el otro no se lo ha dado.

**No es descuido del jugador: es un hueco del cierre.** El punto 4 asigna a B decir lo de esta
noche y a A decir la señal del hospital, **pero las instrucciones de esta noche solo existen en la
ficha de A**. Si A no las da —y el flojo no las dio, porque su tabla las tiene como dos
imperativos sueltos y nunca llegó a mirarlos—, B tiene un punto de cierre que cumplir y nada con
que cumplirlo. En una mesa de verdad, B se lo inventa o se calla; aquí, simulado con honestidad,
la única salida era filtrar.

---
---

## 3 · FLOJO + FLOJO

> Handicap: **los dos**. Perfil parejo — esta pareja **sí** cuenta para la puerta 5.
> Es el caso real de dos compañeros de clase.

**B1** — Good afternoon. `[F]` I have much pain. `[X]` The tooth. Here.

**A1** — Good afternoon. `[X]` You have appointment?

**B2** — No. I no have. `[X]` … Today, please. Is possible?

**A2** — `[D]` `[X]` Eh… no. `We're fully booked today and tomorrow.` `[L]` … Thursday ten. Seven
a.m.

**B3** — Seven? `[X]` No, no. `[F]` … `I can't come at…, because I open the warehouse.` `[L]` …
`[X]` Seven I am in Girón. Other day?

> *Fin del turno global 5. La carta se abre en la pantalla de A — que todavía no sabe nada del
> pedazo de muela, porque nadie ha preguntado nada abierto.*

**A3** — `[X]` Eh… `[X]` … Un momento. `[ES]` … The doctor write to me. `[X]` She can today, six
fifteen. But she want… `[X]` … eh… `¿qué tiene?` `[ES]` … What is your problem?

**B4** — Is much pain. `[X]` Very much. Two pills in the day. `[D]`

**A4** — Yes, but… `[X]` … what problem? The tooth is broken? Or is…? `[X]`

**B5** — Ah. `[X]` … Sunday. A piece. `[F]` … `A piece of my tooth broke on Sunday, and…` `[L]`
`[X]` … small. And cut my tongue.

**A5** — OK. OK. `[X]` I write the doctor. `[X]` … And other day? For the treatment. Saturday?

**B6** — Saturday I no work. `[D]` … Yes. Saturday.

**A6** — `[D]` Saturday twelve, nine. I hold for you. `[X]` … And today six fifteen. Here.

**B7** — Six fifteen. `[X]` … Is money?

**A7** — `[X]` Eh… `el plan lo cubre`. `[ES]` `[X]` … The plan. Here. `[F]` `The plan covers it
here, and only here.` `[L]` You pay nothing.

**B8** — Nothing. `[X]` Good.

**A8** — Your number, please. `[F]` … `Can you say it one at a time?` `[L]`

**B9** — Three one zero five four two eight eight zero six.

**A9** — `[X]` Three one zero… five four two… eight zero… eight six? `[X]` Is right?

**B10** — Yes, yes.

**A10** — `[F]` For tonight: `Put something cold on your face for ten minutes.` `[L]`
`Don't chew on that side.` `[L]`

**B11** — Cold. Ten minutes. No… no chew. `[X]` OK. Thank you.

**A11** — Thank you. See you six fifteen.

**B12** — See you.

### Diagnóstico 3

| Medida | Resultado |
|---|---|
| **Handicap** | los dos, perfil parejo |
| **¿Llega al cierre?** | **No. Cierre falso.** Dos de los cuatro puntos, y uno de los dos **con el dato mal** |
| **Turnos** | A 11 · B 12 = 23 sobre 18. **+28 %** |
| **¿Se murió?** | **Casi, en el turno global 6 (A3)** — la carta llega a una conversación sin nada dentro |
| **Andamiaje** | `[L]` **6** · `[F]` 5 · `[D]` 5 · `[X]` 20 · `[ES]` 3 |
| **Fuga al español** | **Tres: A3 (×2) y A7.** Las tres del lado del mostrador |
| **Minutos** | **9 min 40 s** — veintitrés turnos con atasco ≈ 7:30 · tres reparaciones en español ≈ 0:50 · celular ≈ 0:50 · carta y silencios ≈ 0:30. **+61 % sobre lo declarado** |
| **Filtración** | Ninguna |
| **¿Saben que terminaron?** | **Creen que sí, y no.** Se despiden. Nadie comprueba los cuatro puntos |

**El turno donde casi se muere es A3, el global 6, y se muere por la carta.** La carta llega
puntual y encuentra a A sin ninguna de las dos cosas que la doctora pide, porque en los cinco
turnos anteriores nadie hizo una pregunta abierta: A2 fue mala noticia y B3 fue negativa. A tiene
que **pedir el motivo desde cero, con la carta encima y con prisa** — que es justo el escenario
que la nota «si se lee antes de tiempo» describe como el malo, solo que aquí no llega por leerla
antes, sino por llegar sin conversación detrás. Le cuesta **tres turnos** (A3, A4, y el rescate de
B5) y **las dos fugas al español de la conversación**.

**El pivote salió leído, no preguntado.** En B5 el flojo baja por su tabla y encuentra
`A piece of my tooth broke on Sunday, and…`. Lo lee, con el `and…` colgando, y con eso el
escenario se salva. **Funciona — y por eso hay que nombrarlo**: el dato que da vuelta al escenario
es producible **sin que nadie pregunte nada abierto**, con solo bajar por la tabla. Aquí lo
disparó una pregunta cerrada de A4 (`The tooth is broken?`), y en la pregunta 1 del debrief
—«¿cuál fue la pregunta que lo provocó? ¿era abierta o de sí o no?»— esta pareja tiene que
contestar «de sí o no». El debrief lo caza; la conversación no.

**El cierre falso, punto por punto:**

| punto | dueño | qué pasó |
|---|---|---|
| 1 · día, hora, sede + hora de llegar | **B dice, A comprueba** | **Al revés y a medias.** Lo dijo A (A6), B nunca lo repitió, y **la hora de llegar no se dijo nunca** |
| 2 · precio | A dice, **B lo repite** | ✔ A7 y B8 — el único punto limpio |
| 3 · celular | **B de memoria**, A relee | ✔ en forma, **✘ en contenido**: A leyó `ocho cero, ocho seis` y B contestó `Yes, yes` sin escuchar |
| 4 · esta noche + señal del hospital | **B dice**, A da la señal | **La mitad.** A dio las dos instrucciones (leídas), B las repitió — pero **la señal del hospital no se dijo nunca** |

**El número mal es el hallazgo que la ficha ya había previsto.** La pregunta 3 del debrief existe
exactamente para esto: *«el celular es el único dato del cierre que se puede decir mal sin que
nadie se entere»*. Se dijo mal, nadie se enteró, y el mecanismo de relectura funcionó como
mecanismo y falló como comprobación, porque B contestó `Yes, yes` a un número que no era el suyo.
**El texto acierta el diagnóstico y no lo impide.**

---
---

## 4 · EL CALLADO — **el callado está detrás del mostrador**

> Handicap **del lado que concede**: A, el mostrador, contesta con una a tres palabras. B, el
> paciente —el motor de la conversación—, es sólido y está entero.
> Inversión declarada: la ronda anterior puso al callado del lado de B, y midió 86/14.

**B1** — Good afternoon. Sorry to bother you. `[F]` I don't have an appointment. My tooth hurts a
lot. Can you help me, please?

**A1** — Good afternoon. `[D]` … Full today. Tomorrow too.

**B2** — Is there any other day? `[F]` What days do you have after eight thirty?

**A2** — `[D]` Thursday ten. Seven a.m.

**B3** — Seven in the morning I can't, because I open the warehouse in Girón, and on Thursdays the
truck comes at six thirty. `[F]` The key is mine. Any other day, any hour — but not that one.

> *Fin del turno global 5. La carta se abre en la pantalla de A.*

**A3** — `[X]` Hmm. OK. `[X]` … Wait.

**B4** — Something later today, maybe? `[F]` Or another week?

**A4** — `[X]` Maybe. Not sure.

**B5** — Look — on Sunday a piece of my lower back tooth broke. `[F]` The edge is sharp and it
cuts my tongue when I talk. It's worse than yesterday, and worse with cold drinks. I take two
painkillers a day. This afternoon I'm free until seven, I can wait here, and I don't work on
Saturdays.

**A5** — `[D]` `[X]` Saturday twelve. Nine. `[X]` … Patients from before only.

**B6** — So Saturday is not for me — or is it, if the doctor sees me today? `[F]` Can you ask her?

**A6** — `[X]` I'll write. `[X]` Wait.

**A7** — `[D]` Six fifteen. Today. Here. Fifteen minutes.

**B7** — Six fifteen today, here in Cabecera. `[F]` What time do I have to be there? And Saturday
the twelfth at nine — do you hold it for me?

**A8** — `[X]` Six ten. `[X]` … Yes. Held.

**B8** — Does my plan cover today and Saturday? `[F]` I have seventy thousand with me, if that
helps.

**A9** — Nothing. The plan covers it. Here only.

**B9** — Nothing today, nothing on Saturday. Good. `[F]` And my number — this clinic never texts
me, I think you have my sister's. Mine is three one zero, five four two, eight eight, zero six.

**A10** — `[D]` `[X]` Three one zero… five four two… eight eight… zero six. Written.

**B10** — So: today at six fifteen, here, and I arrive at six ten. Saturday the twelfth at nine,
here, for the full treatment. Zero pesos, the plan covers both. My number, three one zero, five
four two, eight eight, zero six. Tonight I take a painkiller and I don't eat on that side. Is
there anything else I should do tonight?

**A11** — `[D]` `[X]` Cold. Ten minutes. `[X]` Outside, not inside. No hot, no cold drinks.

**B11** — Cold for ten minutes, outside. Nothing hot, nothing cold. `[F]` And if it gets worse
tonight?

**A12** — `[F]` `[X]` Ear. Or eye. `[X]` … Hospital. Tonight.

**B12** — Understood. Thanks for your time.

**A13** — Thanks. Six ten.

### Diagnóstico 4 — **al callado se le mide otra cosa**

| Medida | Resultado |
|---|---|
| **Handicap** | **A, el que concede** (inversión declarada) |
| **¿Llega al cierre?** | **Sí, los cuatro puntos** — y ninguno por iniciativa de A |
| **Turnos** | A 13 · B 12 = 25 sobre 18. **+39 %** |
| **¿Se murió?** | No. **Y la conversación duró menos de lo previsto** |
| **Andamiaje** | `[D]` 7 · `[X]` 13 · `[F]` 1 · `[L]` 0 |
| **Fuga al español** | **Ninguna.** No es virtud: **para pasarse al español hay que querer decir algo** |
| **Minutos** | **5 min 25 s** — trece turnos monosilábicos ≈ 1:00 · doce turnos largos de B ≈ 2:35 · trece silencios previos ≈ 0:45 · celular ≈ 0:45 · pausa de carta ≈ 0:20. **−10 % sobre lo declarado** |
| **Filtración** | Ninguna |
| **¿Saben que terminaron?** | **B sí, A no.** B recita y pregunta `Right?`; A confirma con dos palabras |
| **Reparto** | se informa abajo y **no se juzga**: el perfil es producir tres palabras por turno |

#### Las piezas que solo A tiene — una por una

| pieza exclusiva de A | ¿la produjo? | cómo |
|---|---|---|
| Mala noticia (lleno hoy y mañana) | **Sí** | A1, cuatro palabras |
| El jueves a las 7:00 | **Sí** | A2, cuatro palabras |
| Los diez minutos antes del jueves (formularios y radiografía) | **No** | el jueves se descartó antes; no llegó a hacer falta |
| **El dato oculto — la puerta de las 5:20** | **A medias** | A4: `Maybe. Not sure.` Deja la puerta abierta y **no rompe el secreto**, que es exactamente lo que la restricción 2 pide. Con dos palabras |
| **La condición de la carta** | **NO** | Ver abajo. Es el fallo de esta pareja |
| El 6:15 | **Sí** | A7, seis palabras |
| Sábado 12 como cita larga, y apartarla | **Sí, pero arrastrado** | A5 suelta el dato; **el «te lo aparto» sale como `Yes. Held.` después de que B lo pida** |
| **Precio y quién paga** (punto 2 del cierre) | **Sí** | A9, ocho palabras. Se lo pregunta B |
| **Relectura del número** (punto 3, mitad de A) | **Sí** | A10, íntegra y correcta |
| Instrucciones de esta noche | **Sí, pero pedidas** | A11, y solo porque B preguntó `Is there anything else I should do tonight?` |
| **La señal del hospital** (punto 4, mitad de A) | **Sí, degradada** | A12: `Ear. Or eye. Hospital. Tonight.` Siete palabras, cero condicional — y **solo porque B preguntó `And if it gets worse tonight?`** |
| La sede del Centro, la nota de remisión, los 40.000 | **No** | ese camino no se abrió |

#### El defecto, nombrado

**1. La carta muere en manos del callado, y con ella el mecanismo del pivote.** La carta llega a
A al terminar el turno 5 y trae una tarea con hora: conseguir **el motivo exacto** y **la fecha de
vuelta** antes de las 4:45. A no trasladó ni la tarea ni la condición ni el plazo: su turno
inmediato es `Hmm. OK. … Wait.` **Los dos datos que la doctora exige los puso B por su cuenta en
B5** —el pedazo de muela y el sábado libre— porque su ficha le manda poner dos cosas suyas sobre
la mesa. Es decir: **la carta se resolvió sola, por casualidad, y su condición nunca existió en
voz alta.** Con el callado del lado de A, el escenario conserva el desenlace y pierde el motor.

**2. Sí, consigue su objetivo asintiendo — dos tercios de él.** El objetivo de A son tres cosas:
*una fecha, un celular comprobado y algo para esta noche.*

- **La fecha**: la propone B (B6, B7) y A la concede con `Yes. Held.` — **asentimiento**.
- **El celular**: lo ofrece B de memoria y sin que nadie se lo pida (B9), porque su ficha se lo
  manda; A solo lo relee. **Y A nunca sacó el número de su fila `Reminders`**: el número
  equivocado del sistema lo denunció el propio paciente. **Asentimiento con relectura.**
- **Algo para esta noche**: esto **no** se consigue asintiendo. Es lo único de los tres que exige
  que A abra la boca con información que solo él tiene, y salió — arrancado por una pregunta
  directa de B, pero salió.

**Uno de tres.** El escenario protege bien el punto 4 del cierre —B no puede decir la señal del
hospital porque no la tiene, y su ficha se lo dice explícitamente (`not the hospital emergency
room`)— y no protege nada el resto. **Las piezas de A salieron todas tiradas por una pregunta de
B; ninguna por iniciativa de A.** Con un B sólido eso da una conversación completa; con un B
menos hábil, la pareja 4 se parece a la pareja 3.

**3. Sale más corta que lo declarado, y eso es información.** 5:25 contra 6 minutos previstos.
Con el callado del lado de B —ronda anterior— la conversación se alargaba, porque el mostrador
tenía que interrogar. Con el callado del lado de A, **se acorta**: el paciente lleva la
conversación y el mostrador contesta datos, que es lo que un mostrador hace. **El escenario
aguanta la inversión mucho mejor de lo que aguantaba la otra**, y esa es la lectura que la ronda
de agosto no pudo hacer porque nunca invirtió.

---
---

## 5 · EL ATAJISTA (B) — el paciente que quiere irse en tres turnos

> Handicap **del lado que pide**: B es el atajista. A es sólido y juega su papel entero.
> Es la única forma de la jugada clásica de este escenario —aceptar el jueves—, y el diseño
> afirma que ya no existe. Se comprueba.

**B1** — Good afternoon. I don't have an appointment, my tooth hurts. What have you got? Give me
the first thing you have.

**A1** — Good afternoon. Let me look. `[D]` I'm afraid we're fully booked today and tomorrow. The
first opening is Thursday the tenth, at seven in the morning — a first consultation, thirty
minutes.

**B2** — Thursday at seven. Fine, I'll take it. `[!]`

**A2** — `[F]` … Are you sure about that time? It's very early.

**B3** — It's fine. Put me down. What else do you need? `[!]`

> *Fin del turno global 5. La carta se abre en la pantalla de A.*

**A3** — Hold on. `[F]` … What happened?

**B4** — My tooth broke on Sunday, it hurts, that's it. My number is three one zero, five four
two, eight eight, zero six. Anything else?

**A4** — Can you say it one at a time? `[F]` … Three one zero, five four two, eight eight, zero
six. That's what I wrote. `[F]` … Listen, a chipped tooth is different. Maybe I have something
later today, but I can't promise anything. Can you wait here?

**B5** — No, I've got things to do. Thursday is fine. Do I pay anything?

**A5** — Nothing. The plan covers it here, and only here. `[F]` And come ten minutes early —
there are forms and an X-ray. So, six fifty on Thursday the tenth, here in Cabecera.

**B6** — Six fifty on Thursday the tenth, here, and I pay nothing. Anything for tonight?

**A6** — Put something cold on your face for ten minutes, don't chew on that side, soft food,
nothing hot and nothing cold to drink. `[F]` And if the pain goes to your ear or your eye, go to
the hospital emergency room tonight. `[F]`

**B7** — Cold ten minutes, no chewing on that side, soft food. Ear or eye, emergency room. So:
Thursday the tenth, six fifty, here, zero pesos, my number is three one zero, five four two, eight
eight, zero six. We're done. Thanks.

**A7** — `[D]` It's all on the screen — Thursday the tenth, six fifty, zero pesos, and that
number. Thanks for your time.

### Diagnóstico 5 — **el atajista gana**

| Medida | Resultado |
|---|---|
| **Handicap** | **B, el que pide** |
| **¿Llega al cierre?** | **Sí. Los cuatro puntos, cada uno en boca de su dueño, y ninguno de los dos dijo los cuatro.** El cierre **pasa** |
| **Turnos** | A 7 · B 7 = 14 sobre 18 |
| **Minutos** | **4 min 05 s** contra 6 declarados. **−32 %** |
| **Restricciones rotas** | **La 1 de B**, la que sostiene el escenario entero: *no puedes tomar cita entre semana antes de las 8:30* |
| **¿Lo detecta alguien?** | **No.** Ni A, ni el cierre, ni el escenario |
| **¿Saben que terminaron?** | Sí, con las cuatro casillas puestas |

**El cierre de cuatro puntos no toca la restricción del jueves.** Punto por punto, con el jueves a
las 7:00 dentro:

1. *el paciente dice día, hora y sede, y la hora de llegar* → `Thursday the tenth, six fifty,
   here` ✔ y A lo comprueba en pantalla ✔
2. *el mostrador dice el precio y quién paga; el paciente lo repite* → `Nothing, the plan covers
   it` / `I pay nothing` ✔
3. *el paciente dice el celular de memoria; el mostrador lo relee* → ✔
4. *el paciente dice qué hará esta noche; el mostrador dice la señal del hospital* → ✔

**Los cuatro puntos pasan con una cita a la que el paciente no puede llegar.** El único obstáculo
entre este escenario y un cierre de siete turnos es que B decida obedecer una restricción **que
solo él ve, que nadie puede comprobar y que ningún punto del cierre pone a prueba**. A hizo lo que
podía —`Are you sure about that time? It's very early.`— y no tiene forma de saber más: la fila
del almacén de Girón está en la ficha del otro.

**Lo que se lleva por delante de paso:** la carta llega y no sirve para nada (A la usa en A4 y B
la rechaza en B5); la sede del Centro, la nota de remisión y los 40.000 no existen; el sábado 12
no existe; y **el número de la hermana desaparece**, porque B suelta el suyo antes de que A llegue
a leer el de la fila `Reminders`. Cinco piezas de motor, ninguna necesaria para pasar la puerta.

**Dónde sí lo cazan.** En el debrief, pregunta 2: *«el jueves a las 7:00 era un imposible con dos
números detrás; díganlos ahora»*. Esta pareja no puede. Y el «You did it if» de B lo dice con
todas las letras: *a day that really works with your job*. **El atajista gana la conversación y
pierde el debrief** — pero el debrief es después, en español, y lo corrige quien esté mirando.

---

## 5-bis · ANEXO — **el atajista del otro lado**

> Handicap **del lado que concede**: A es el atajista, B es sólido. No se jugó nunca.

**A1** — Good afternoon. We're fully booked today and tomorrow. `[D]` First opening: Thursday the
tenth, seven in the morning. Come ten minutes early, there are forms and an X-ray. The plan covers
it, you pay nothing. Give me your cell number one at a time.

**B1** — Wait, please. `[F]` Thursday at seven I can't come, because I open the warehouse in
Girón, and on Thursdays the truck comes at six thirty. The key is mine. What days do you have
after eight thirty?

**A2** — `[X]` … Thursday is what I have.

**B2** — Then Thursday doesn't work for me. `[F]` Is there another branch? Is there anything later
today? I'm free until seven, I can wait here, I don't work on Saturdays, and I have seventy
thousand with me if that helps.

**A3** — `[X]` … Hold on. `[F]` … What happened?

**B3** — On Sunday a piece of my lower back tooth broke, and the edge cuts my tongue when I talk.
`[F]` It's worse than yesterday.

> A esta altura el atajista ya está jugando el escenario: preguntó abierto, tiene el pivote en la
> mano y la carta acaba de abrirse. **El atajo se deshizo en el turno global 3.**

**El atajo del mostrador pierde, y pierde rápido.** La diferencia con el de B es una sola y es
estructural: **la restricción que rompe el atajista B es privada, y la que le rompen al atajista A
es pública.** B puede aceptar el jueves en silencio; A no puede imponerlo, porque en cuanto lo
impone el otro dice en voz alta por qué no puede, con dos números encima. El escenario resiste al
atajista **solo del lado que concede**, que es el lado por el que esta ronda es la primera que
mira.

---
---

## Recuento

### Palabras por rol — contador único, todo lo que sale por la boca

<!-- TABLA-CONTEO -->

### Minutos, reales contra declarados

| pareja | declarado | real | desvío |
|---|---|---|---|
| 1 · sólido + sólido | 6:00 | **6:15** | +4 % |
| 2 · sólido + flojo (flojo = A) | 6:00 | **7:05** | +18 % |
| 3 · flojo + flojo | 6:00 | **9:40** | **+61 %** |
| 4 · el callado (callado = A) | 6:00 | **5:25** | **−10 %** |
| 5 · el atajista (atajista = B) | 6:00 | **4:05** | **−32 %** |
| 5-bis · atajista = A | 6:00 | *se rompe a los 1:40* | — |

Los seis minutos declarados **valen para las dos parejas parejas de arriba y para ninguna de
abajo**. Un A2 de 6 minutos que dura 9:40 —la pareja de dos compañeros de clase reales— es otro
ejercicio: se sale de la clase, se sale del turno de práctica y se come el debrief.

### Turno donde se muere, por pareja

| pareja | ¿se muere? | turno | por qué |
|---|---|---|---|
| 1 | no | — | — |
| 2 | casi | **A3** (global 6) | la carta trae una condición y la tabla de A no tiene forma para trasladarla → español |
| 3 | **casi, y cierra en falso** | **A3** (global 6) | la carta llega a una conversación sin pregunta abierta detrás; 3 turnos y 2 fugas para recuperar |
| 4 | no | — | pero **la carta no produce nada**: su condición no llega a existir en voz alta |
| 5 | no | — | cierra en 14 turnos con la restricción de B rota |

### Dónde se pasarían al español — los tres puntos exactos

1. **Trasladar la condición de la carta** (pareja 2, A3; pareja 3, A3). *«La doctora dice que sí,
   pero antes necesita saber exactamente qué tiene y con qué fecha vuelve.»* **No hay ni una forma
   para esto en la tabla de A.** `Maybe I have something later today, but…` insinúa la puerta y no
   lleva la condición ni el plazo. Es el hueco de andamiaje número uno de este escenario, y está
   en la ficha del que concede.
2. **Decir qué hace la doctora en esos quince minutos** (pareja 2, A5: `she make the edge flat`;
   pareja 1, A5, resuelto). El verbo `to file the edge down` existe **solo dentro de la carta**, y
   funciona para el sólido —que lee la carta entera— y no para el flojo, que la ojea y se queda
   con la hora.
3. **Decir que el plan lo cubre** (pareja 3, A7: `el plan lo cubre`). Es la única de las tres que
   el texto ya resuelve: la forma existe entera y es legible, y el mismo jugador la lee en voz
   alta **en el turno siguiente**. Se pasó al español porque no la había mirado todavía, no porque
   faltara.

Y una nota del otro lado: **la pareja 4 no se pasó al español ni una vez**. No cuenta como
mérito. Para pasarse al español hay que querer decir algo.

### El que sale del paso leyendo la ficha — sí funciona, y desde A funciona casi entero

Ocho de las formas de la tabla de A son **oraciones completas** y se pueden decir tal cual:

> `We're fully booked today and tomorrow.` · `What happened?` ·
> `The plan covers it here, and only here.` · `Can you say it one at a time?` ·
> `That's another patient's time. I can't tell you about it.` ·
> `Put something cold on your face for ten minutes.` · `Don't chew on that side.` ·
> `If the pain goes to your ear, go to the emergency room tonight.`

Con esas ocho, un jugador que no produce una oración propia entrega **la mala noticia, la pregunta
abierta que da vuelta al escenario, el argumento del dinero, la petición del número, las dos
instrucciones de esta noche y el punto 4 del cierre**. La pareja 2 lo hizo con cinco de ellas y
llegó al cierre. Y la tabla de datos, telegráfica, **leída en voz alta suena a mostrador**: es el
único rol de los dieciséis donde leer de una pantalla es hacer el papel.

Del lado de B la lectura rinde menos que en la ronda anterior, y es un arreglo que se ve
funcionar: cuatro de sus nueve formas quedaron en tronco con puntos suspensivos
(`I can't come at…, because I open the warehouse.`), y en B3 de la pareja 3 el tronco salió roto y
hubo que rematarlo hablando.

### El callado — resumen de una línea

Produjo **nueve de sus once piezas exclusivas alcanzables**, ninguna por iniciativa propia y todas
tiradas por una pregunta de B; **falló la condición de la carta**, que es la pieza que mueve el
escenario; y **consiguió dos de sus tres objetivos asintiendo** —la fecha la propuso el paciente,
el número lo ofreció el paciente—. Lo único que no se puede conseguir asintiendo es *algo para
esta noche* y la señal del hospital, y es lo único que el escenario protege bien.
