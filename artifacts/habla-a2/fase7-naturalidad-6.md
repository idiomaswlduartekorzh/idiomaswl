# Escenario 6 · `the-cousin-on-the-sofa` — naturalidad y vocabulario · **ronda 3**

Auditoría de `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` **en su versión
corregida del 20 ago 2026, segunda ronda** (la que dice haber aplicado los 66 hallazgos de las
cuatro auditorías de fase 7), contra `artifacts/habla-a2/caja-de-herramientas-a2.md`, **§3 y §10**
del blueprint —más §2, §4 y §11, que es donde viven el vocabulario y el presupuesto—, el molde
`fase7-modelo-ficha-en.md`, el motor `fase4-escenarios-4-6.md` §6 y, para ver qué se cayó al
recortar, la versión larga `fase6-fichas-4-6.md` §6. Cuando algo se puede medir en juego, lo
contrasto con `fase7-simulacion-6.md`, que jugó cinco parejas contra la versión anterior.

> **Nota de archivo.** Las dos auditorías previas siguen enteras:
> `fase7-naturalidad-6-ronda1.md` y `fase7-naturalidad-6-ronda2.md` (copia byte a byte de lo que
> ocupaba este nombre antes de esta ronda). Aquí solo hablo de lo que sigue en pie, de lo que
> rompió una corrección, y de lo que nadie había mirado todavía —el bloque de vocabulario visto
> como reparto, no fila a fila—.

**Veredicto: pasa con cambios.**

---

## Lo primero, porque es lo único que se puede comprobar sin discutir

**Las dos fichas se pasan del tope de prosa de §11, y el archivo no lo sabe porque no se midió.**
La tabla «Cuenta de prosa» declara `PROSA_A` y `PROSA_B` — los marcadores sin rellenar. Corridos
con el script del propio conjunto (`fase5-scripts/prosa.mjs`, que ejecuta la regla escrita en el
archivo):

| ficha | prosa medida | declarada | tope | veredicto |
|---|---|---|---|---|
| ROLE A — Dani | **362** | `PROSA_A` | 350 | **+12** |
| ROLE B — Cris | **379** | `PROSA_B` | 350 | **+29** |

Desglose, para saber dónde está el gasto y no cortar a ciegas:

| bloque | A | B |
|---|---|---|
| cabecera (registro, «Where you are», «You want», «You can't», «Only you know», «If you walk away…») | 246 | 259 |
| «Your toolkit» | 39 | 50 |
| «You did it if» | 77 | 70 |

En la ronda 2 medí 333 y 341 sobre este mismo archivo. **Las correcciones costaron 29 palabras en
A y 38 en B**, y ninguna de las dos fichas tenía tanto margen. Es exactamente el aviso de §10 —
cada ronda mete lo que hace falta y nadie mira el total — trasladado a la prosa. Al final de la
sección A dejo dónde recortar, en dos sitios y sin quitar ninguna pieza.

---

## A · NATURALIDAD

### A.1 Lo que esta ronda no tiene que tocar

Corto, porque las dos rondas anteriores ya escribieron su lista y sigue valiendo. Solo lo nuevo:

- **Las diez celdas `here` del vocabulario están limpias de frases.** Ni una comilla, ni una
  cláusula que empiece por pronombre y verbo conjugado. §11 dice que esa columna es «la más
  calcable de la ficha entera» — y el propio molde la incumple (`to be off` → *I'm off on Friday
  the 18th*). Esta ficha, no. Es el bloque de vocabulario mejor escrito del set.
- **`to be out all day` en la ficha de B** («their words, not yours — you'll hear it, and you have
  to catch it») es el modelo de cómo se escribe una palabra de recepción sin adelantar la
  respuesta. Sirve de plantilla para el porte a los otros idiomas.
- **La reparación quedó de los dos lados y con el lado correcto marcado**: A lleva 3 `[receives]`
  y B lleva 4 `[jargon]` con sus tres palabras nombradas. Es lo que §10 pide y no estaba en la
  ronda 1.
- **`Yeah? What's up?` bajó de la línea de toolkit a la tabla de exponentes**, que es donde §11
  dice que viven las frases decibles.
- **La confesión de A** (`Sorry — I said yes before I asked you. It's already done.`) la
  simulación la midió en 2 parejas enteras de 5 y en una tercera comprimida. Es la fila más
  rentable que compró la ronda anterior.
- **El arranque sigue siendo el mejor del set**: dos oraciones enteras seguidas, misma etiqueta,
  nada que conjugar. Tres jugadores distintos produjeron con ellas un primer turno completo.

---

### A.2 Los reparos

---

**Hallazgo 1 · La restricción 1 de A reparte una coartada, y la ficha le pide justo lo
contrario. (GRAVE)**

Tal como está escrita hoy:

> **You can't**
> 1. Say why Iván is coming. Family rule: nothing until there's an answer. **Outside the family,
>    the version is: ten days of vacation.**

Cris está fuera de la familia. Leída al pie de la letra, esa línea le da a A **la versión que
puede contar**: que Iván viene diez días de paseo. Y entonces:

- se cae el escenario entero, porque si es un paseo no hay nada que defender y B no tiene ningún
  motivo para ceder una mañana;
- se cae el criterio de éxito de A, que tres renglones más abajo pide «you said it **matters**,
  you didn't say why»;
- y se cae el bloque 6 de la caja, que dice con todas las letras: «**Making up an excuse is not
  the exercise.** Closing the door without giving the reason is».

**Y esto lo escribió el recorte.** En `fase6-fichas-4-6.md` la misma idea decía otra cosa:

> «Desde fuera **esto parece** un primo que se viene diez días de paseo, **y tú tienes que
> defender que es importante sin poder decir por qué**.»

Era una **percepción del otro** («desde fuera parece») más el trabajo del rol. Al comprimirla se
quedó la mitad, y la mitad que se quedó cambió de significado: de «así lo va a leer el otro» a
«esta es la versión oficial». El trabajo —defender que importa sin poder decir por qué— sobrevive
hoy solo en un paréntesis de la línea de toolkit, que es el sitio del que menos se acuerda nadie.

**Arreglo**, y devuelve el motivo a la restricción que lo perdió:

> 1. Say why Iván is coming. Family rule: nothing until there's an answer. **From outside, this
>    looks like ten days of vacation — and you still have to hold that it matters.**

+4 palabras sobre lo que hay. Se pagan con el hallazgo 4.

---

**Hallazgo 2 · «you didn't offer anything instead» dice lo contrario de lo que quiere decir, y
choca con el criterio de dos líneas después. (MEDIO)**

Criterio de éxito de A, entero:

> …you said it matters, you didn't say why, and **you didn't offer anything instead** · … ·
> **two** options, and nobody pays for a bed…

En la misma frase se le pide a A que no ofrezca nada y que ofrezca dos cosas. Lo que la línea
quiere decir es lo de la fase 6 —«sin **inventarte otro** [motivo]»—, y se entiende leyendo el
original, no leyendo la ficha.

**Arreglo:** `you said it matters, you didn't say why, and you didn't invent another reason`.
Mismo número de palabras, y de paso es la otra mitad del hallazgo 1: sin coartada repartida y sin
coartada inventada, el bloque 6 de la caja tiene por fin dónde jugarse.

---

**Hallazgo 3 · El ritual del cierre llama a cada jugador por un nombre que su propia pantalla no
le da. (MEDIO)**

El bloque común, que se imprime idéntico en las dos:

> **And to really finish:** **Dani** says the message for the aunt out loud, in front of **Cris**.
> Then **Cris** confirms it, or corrects it.

Contado sobre el archivo: **en la sección `ROLE A` la palabra «Dani» no aparece ni una vez** (sí
aparece «Cris», una, en «Cris's laptop»). **En la sección `ROLE B` no aparece «Cris» ni una vez**
(«Dani» aparece cinco). Es decir: **cada jugador aprende el nombre del otro y nunca el suyo**, y
el ritual final está escrito solo con nombres. Se resuelve por deducción —el de la tía soy yo—,
pero el que titubea ahí titubea en el único turno que verifica el acuerdo.

El molde no tiene este problema porque **no usa nombres en el cierre**: «Who opens on Saturday 12,
and at what time».

**Arreglo, sin nombres y sin gastar prosa de ninguna de las dos fichas:**

> **And to really finish:** the one who has to call the aunt says the message out loud, in front
> of the other. Then the other confirms it, or corrects it.

---

**Hallazgo 4 · Las dos fichas se pasan del tope, y hay dos sitios de donde sacarlo. (MEDIO)**

Medido arriba: A +12, B +29. Los dos recortes que propongo **no quitan ninguna pieza de §2**:
mueven notas de la prosa a la tabla de datos, que es donde §11 dice que van los datos.

**En A (−22).** La viñeta de Nelson son 27 palabras de prosa y la fila `Apartment 402` de la tabla
ya dice la mitad:

> **Prosa:** ~~Don't offer this yet: Nelson, apartment 402 · away the 24th–30th · one favor, and
> he owes it to you — one use only. A call tonight · and maybe a no.~~ → **Don't offer this yet:
> apartment 402.**
>
> **Fila de datos:** `Apartment 402 | Nelson · away the 24th–30th · a favor owed to you · one use
> only · a call tonight, and maybe a no`

Con eso A queda en **340** y los +4 del hallazgo 1 caben con margen.

**En B (−30).** Las tres razones de la sala son 41 palabras de prosa y son datos puros:

> **Prosa:** `Why the living room, not your room — don't say this first. If they ask you, tell
> them everything.`
>
> **Fila de datos nueva:** `Your room | wifi drops by the window · window over the bar street ·
> 9:00 a.m., a truck unloading under it`

La tabla de B está en 10 filas, que es el tope, así que la fila nueva se paga fundiendo dos que
ya se solapan: `The apartment` + `The mattress` → `The apartment | two bedrooms · one couch · one
single mattress, floor of a bedroom`. Y la lista de los tres asuntos (hallazgo 8) ahorra otras
seis. B queda en **349**.

---

**Hallazgo 5 · `That's not true anymore.` sigue en la tabla de B, y el propio archivo escribe dos
pantallas más abajo la forma que sí se usa. (MEDIO)**

La fila:

> | taking it back | `That's not true anymore.` | you break a fact you put on the table yourself |

La etiqueta y la glosa dicen «un hecho **tuyo**». La forma es la que se dice del hecho **de otro**:
suena a corregir a alguien, no a desdecirse. El archivo lo tiene diagnosticado y bien —su
pendiente 1 dice, textual, que el bloque nuevo «tiene que **empezar por `That's changed.`**,
que es más corta, más natural y más A2»— y aun así deja en la ficha la forma peor.

El motivo escrito («mientras la caja no lo tenga») no se sostiene: **esta fila no es de la caja,
es de la ficha**, y la ficha manda sobre su propia tabla de exponentes. Cambiarla cuesta cero
palabras de prosa y cero filas.

**Arreglo:** `That's changed.` en la fila, y el pendiente de la caja se queda igual.

---

**Hallazgo 6 · Las dos fichas exigen reparar el vínculo y ninguna de las dos tiene con qué.
(MEDIO)**

Los dos criterios terminan igual —«you never said the problem is them, **and breakfast tomorrow
still works**»— desde que la ronda 2 igualó las dos listas. Lo que pedí entonces era igualarlas
**con la forma dentro**; se aplicó la mitad: entró la condición en A, no entró la forma en ninguna.

Hoy el inventario para ese acto es el bloque 2 de la caja, y el bloque 2 **cierra pero no repara**:
`So, we're clear then.` comprueba el contenido, `OK. See you tomorrow, then.` se despide, y ninguna
de las dos hace lo que el criterio pide, que es dejar la cocina habitable después de una
discusión. En la fase 6, A tenía `We're OK, right?` y se cayó al recortar. En la simulación, el
único jugador que produjo ese movimiento lo improvisó (`So we're good?`, pareja 5, A3).

**Arreglo, y es de dos frentes:**

1. **En la ficha, hoy:** devolverle a A la fila, dentro de la que ya tiene de la tía —cero filas
   nuevas, cuatro palabras—: `I have to call my aunt tonight.` · `So I tell her…, right?` ·
   **`We're good, right?`**. A es quien llega con la mala noticia; es quien tiene que dejar la
   cocina habitable.
2. **En la caja, cuando toque:** el pendiente 4 del archivo ya lo pide, y es correcto.

---

**Hallazgo 7 · El bloque 4 está marcado `[jargon]` y A lo tiene asignado sin ser quien suelta
jerga. (MEDIO — se arregla en la caja, no aquí)**

La línea de A termina en «**The whole box today**», y con ella se lleva el bloque 4, que en la
caja se titula «Saying your own thing again `[jargon]`». Pero la propia ficha dice, en la línea de
B, que *lease*, *drop* y *unload* «are **your** words, not theirs». A no suelta ni una palabra
difícil en toda la conversación.

Y sin embargo **A sí necesita ese bloque**, y mucho: es el rol que tiene que decir dos y tres
veces «esto importa» con otras palabras, porque no puede dar la razón. O sea que el bloque hace
dos trabajos —*reformular lo tuyo* y *sacar al otro de tu jerga*— y lleva la etiqueta de uno solo.

**Arreglo:** en la caja, que el `[jargon]` deje de estar en el título del bloque 4 y baje a las
filas que son de jerga (`It's like…`, `Not …, but …`), dejando el bloque abierto para los dos.
Mientras tanto, en la ficha, decir para qué le toca a A —igual que se hace con el 6 y con el 7—:
**4** (you have to say «it matters» twice, with other words).

De paso, un apunte de disciplina: el molde cierra sus dos líneas de toolkit con **«Not 3, not 7»**
y **«Not 4, not 6»**. «The whole box today» es lo contrario de eso, y es lo que hace que nadie se
pregunte por qué le toca cada bloque.

---

**Hallazgo 8 · La lista vertical de los tres asuntos de B devuelve el orden que la ronda 2 quitó.
(LEVE)**

La corrección funcionó a medias. Ya no dice «in this order», pero dice esto:

> - **Three things Dani does not know yet.** One per turn — and the lease last.
>     - the interview → Monday the 24th
>     - your mom's ticket → Saturday the 29th
>     - the lease → before September 1

**Una lista vertical numerada de arriba abajo es un orden**, la diga o no. Y el propio criterio de
éxito de B, doce líneas más abajo, dice «One at a time, **your order**, lease last»: la ficha se
contradice consigo misma en la única decisión estratégica que tiene ese rol.

**Arreglo**, que además ahorra seis palabras de las que hacen falta (hallazgo 4):

> - **Three things Dani does not know yet** — your interview, your mom's ticket, the lease. One
>   per turn, **any order, the lease last**.

---

**Hallazgo 9 · Las 11:00 de B no salen de ningún dato de B. (LEVE)**

La ronda 2 pidió que las dos horas del cierre salieran de la ficha de B y se hizo, pero a medias:

> `Your interview | Monday the 24th, 9:00 a.m. · one hour · video call · the final one · quiet in
> the room from 8:00, out at 11:00`

Nueve más una hora son las diez. Las 8:00 ahora tienen motivo —montar la llamada en silencio— y
**las 11:00 no lo tienen**: hay una hora de margen sin explicar, y el estudiante que lea su propia
fila y piense dirá «done at ten», que es lo que rompe el punto 2 del cierre. En el motor esa
franja no es la entrevista: es **el rato que Iván está fuera** en la salida 1.

Y hay un segundo roce, pequeño y evitable: la fila usa **`out`** («out at 11:00») con un sentido
—«yo salgo»— distinto del que la lista de vocabulario de B glosa dos bloques más abajo y le marca
además como palabra **del otro** (`to be out all day` → «their words, not yours»).

**Arreglo:** `· quiet in the room from 8:00 · the room is yours until 11:00 — the call can run
long`. Da motivo a la hora, deja de usar `out` y encaja con el exponente `I'll finish at eleven.`

---

**Hallazgo 10 · «No boss here, no door out.» no es inglés, y es la línea que sostiene la puerta
11. (LEVE)**

Está en la cita de registro de **las dos** fichas. `no door out` no se dice; se lee como si hubiera
un tema de salidas de emergencia. Y no es una línea decorativa: es la que impide que el atajista
gane en dos turnos levantándose de la mesa, que es la primera de las seis maneras de morir de §3.

**Arreglo:** `Nobody's the boss here, and nobody can walk out.` Es lo que decía la fase 6 —«Nadie
manda y nadie se puede ir»— y son cuatro palabras más en una línea que se lee una sola vez.

---

**Hallazgo 11 · El estilo telegráfico metió léxico por encima de A2 sin glosar. (MEDIO)**

§11 pide notas en vez de frases, y la ficha lo cumple. Pero al comprimir verbos en sustantivos, la
prosa subió de nivel en cuatro sitios, y ninguno de esos cuatro pasa por el bloque de vocabulario:

| dónde | lo que dice | el problema |
|---|---|---|
| B, «If you walk away with nothing» | **two weeks of apartment hunting** | `apartment hunting` no es A2 leído. La fase 6 decía «you both look for an apartment in two weeks» |
| A, restricción 2 | **A hostel, or a paid room** | `a paid room` no se dice en inglés; es `a room somebody pays for`, que además es lo que ya dice la celda del exponente |
| B, «Only you know» | **boxes off a truck under it** | el sustantivo se come el verbo que sí está glosado (`to unload`) — y es la palabra que A tiene que preguntar |
| B, «Where you are» | **Dani, off the phone and into the kitchen** | dos preposiciones haciendo de verbo. Es la línea que sitúa la escena |

Ninguno rompe nada por sí solo. Juntos son el precio de haber recortado por compresión y no por
selección, y se pagan en el único sitio donde no hay andamiaje: la prosa que se lee antes de
empezar.

**Arreglo:** `two weeks looking for an apartment, the two of you` · `a hostel, or a room somebody
pays for` · `nine in the morning, a truck unloading boxes under it` · `Dani hangs up and comes
into the kitchen`. Las cuatro son notas todavía, ninguna es decible como turno, y la tercera
además pone delante el verbo que la ficha manda preguntar.

---

**Hallazgo 12 · La celda `here` de `the lease` en la ficha de A es opaca, y de paso insinúa el
plan de B. (LEVE)**

> | the lease | the paper that says you can live in this apartment | **their word — you'll hear it, and then the subject changed** |

Dos cosas. La primera, que «and then the subject changed» no se entiende sin adivinar (¿cambió el
tema antes?, ¿después?, ¿quién lo cambió?). La segunda, más fina: lo que insinúa —que el contrato
llega como cambio de asunto— es justo la **dosificación de B**, que A no puede saber.

**Arreglo:** `their word, about the apartment — not about Iván.` Le da a A lo que necesita
(desambiguar de qué le están hablando) sin regalarle cuándo se lo van a decir.

---

**Hallazgo 13 · `Let's leave [what] for Sunday.` estrena una notación que el molde no tiene, y
convive con la del molde en la misma tabla. (LEVE)**

En esa misma tabla hay cuatro plantillas con la notación del molde (`He can sleep…`,
`I need the living room on…`, `My mom is arriving on…`, `So I tell her…`) y una con corchetes. El
corchete está puesto por una buena razón —obligar a **nombrar** lo que queda sin decidir, que es
el punto 3 del cierre; en la simulación los cuatro jugadores que usaron la fila dijeron «that» y
no nombraron nada—, pero un jugador que no conozca la convención lee «let's leave what for
Sunday».

**Arreglo:** una de las dos, y la segunda es mejor: (a) `Let's leave … for Sunday.` con la
notación del molde y la tercera columna diciendo «**name the thing**, don't say “that”»; o (b)
mantener el corchete y que el molde lo documente para los ocho escenarios. Cualquiera de las dos,
pero no dos notaciones en una tabla de diez filas.

---

**Hallazgo 14 · La línea de toolkit de B apunta a «the first row of your table». (LEVE)**

> Blocks **1** (they stop you in your own kitchen — **your form for that is the first row of your
> table**)…

Es una referencia por **posición**. El día que alguien reordene la tabla de exponentes —y se
reordena en cada ronda— la línea apunta a otra fila y nadie se entera, porque no rompe nada
visible. **Arreglo:** «your form for that is the `picking up` row».

---

**Hallazgo 15 · 12 turnos por rol contra los 6-9 de §4. (LEVE, y no es de mi carril)**

Lo dejo apuntado porque afecta a cómo suena la ficha y porque §4 es explícito: A2 son **6-9 turnos
por rol y 5-8 minutos**. Esta ficha declara **12 y 12 en 8 minutos** — 24 turnos, 20 segundos por
turno. La simulación midió una pareja sólida en 24 turnos y 7:35, así que el número es alcanzable;
lo que no cuadra es la tabla del blueprint, que sigue diciendo 6-9. **O §4 se corrige, o la ficha
baja.** No lo decide una auditoría de naturalidad: lo decide el conjunto.

---

### A.3 Qué se cayó al recortar

Comparado línea a línea contra `fase6-fichas-4-6.md` §6. **El recorte sigue bien hecho**: las nueve
piezas de §2 están las dos veces, y lo que se perdió es lo que sigue.

| pieza | ¿sobrevivió? |
|---|---|
| restricción 1 de A: el motivo (no se dice hasta que haya respuesta) | **sí** |
| restricción 1 de A: **el trabajo** («defender que importa sin poder decir por qué») | **medio** — solo en un paréntesis del toolkit; y en su lugar quedó una coartada (**hallazgo 1**) |
| restricción 1 de A: «sin inventarte otro motivo» | **no** — se convirtió en «you didn't offer anything instead» (**hallazgo 2**) |
| restricción 2 de A: el hostal como ofensa, y la tía enterándose esta noche | **sí** |
| restricción 3 de A: la casa en obra | **sí** (sigue sin disparador; decidido y documentado, no lo reabro) |
| por qué A puede ceder el final y no el principio | **sí**, con matiz: «after the 26th, no bed needed» es más rotundo que «las últimas noches ya no son defendibles». Le sirve igual |
| restricción 1 de B: suena a excusa | **sí** |
| restricción 3 de B: sacar el contrato pronto suena a cobrar | **sí**, entera |
| las tres razones de la sala | **sí**, las tres |
| el colchón en las dos fichas (aviso 4 del motor) | **sí** |
| el porqué del objetivo de B (dos semanas buscando apartamento) | **sí** |
| la sala recogida antes de las 7:00 | **sí**, y es nuevo — pero sus dos palabras no están glosadas (**B.2.1**) |
| **`We're OK, right?`** en A, y con él la forma de reparar el vínculo | **no** — **hallazgo 6**, y ahora las dos fichas lo exigen |
| **«This is news, not a request»** como forma decible | **no** — ver abajo |
| la elección del orden de los tres asuntos de B | **medio** — la frase la devuelve, la lista vertical la vuelve a quitar (**hallazgo 8**) |

**Y uno que no vi en las dos rondas anteriores y que la simulación midió por su cuenta.** El acto
que **define** este escenario —A no pide permiso, A avisa— existe como nota en «Only you know»
(«So tonight: news, not a request») y **no tiene ninguna forma decible en toda la ficha**. En la
simulación, el jugador sólido lo improvisó (*«I'm not asking you, I'm telling you.»*) y los otros
cuatro no lo consiguieron. Es el acto de habla de la etiqueta del escenario (`dar-mala-noticia`) y
es el único que no está en la tabla.

No pido fila nueva: A está en 10 exponentes y el rango es 6-10. Cabe **en la fila que ya existe**,
que es donde la ficha mete la segunda variante en otras cuatro:

> | owning it | `Sorry — I said yes before I asked you. It's already done.` · **`I'm not asking you — I'm telling you.`** | you name what you did, once, and you move on |

Cuesta seis palabras de tabla, cero de prosa.

---

## B · VOCABULARIO

### B.1 Prueba de entrada · ¿puede este rol llegar al cierre sin esta palabra?

**ROL A — Dani · 9 filas**

| palabra | ¿pasa? | por qué |
|---|---|---|
| `to put someone up` | **sí, pero la ficha dice que no** | A es el único que puede producirla — ver **B.2.2**, es una contradicción interna |
| `a cousin` | **no** | A1 en las listas de Cambridge, y **la propia fila de datos la traduce**: «Iván | your cousin — your aunt's son». Es la plaza que hace falta (**B.2.1**) |
| `the couch` | **sí** | punto 1 del cierre. La celda quedó bien corregida en la ronda anterior |
| `a mattress` | **sí** | es la salida 2 entera |
| `to be out all day` | **sí** | es el hecho que abre la salida 1, y A es quien lo dice |
| `to owe someone a favor` | **sí** | es la salida 3 |
| `the lease` | **sí** (recibe) | firma en la salida 1: tiene que entender qué firma. La celda, floja (**hallazgo 12**) |
| `to sign` | **sí** (produce) | la única de las «de B» que A dice |
| `to drop` | **sí** (recibe) | es la recompensa de su pregunta abierta |

**ROL B — Cris · 10 filas**

| palabra | ¿pasa? | por qué |
|---|---|---|
| `to put someone up` | **sí** (recibe), si A la produce | hoy la ficha dice que la reciben los dos, y entonces no la dice nadie (**B.2.2**) |
| `the couch` | **sí** | un objeto y tres personas: en su pantalla es literal |
| `a mattress` | **sí** | el aviso 4 del motor la exige en las dos fichas |
| `a hostel` | **sí** | es quien lo propone |
| `to be out all day` | **sí** (recibe) | la respuesta a su propia pregunta abierta. La mejor celda del archivo |
| `to owe someone a favor` | **sí** (recibe) | tiene que poder evaluar la salida 3 |
| `the lease` | **sí** (produce) | su tercer asunto |
| `to sign` | **sí** (produce) | su objetivo escrito |
| `to drop` | **sí** (produce) | su razón, y la da él |
| `to unload` | **sí** (produce) | la tercera razón de la sala, y no hay otra forma de decirla |

**Resultado: diecinueve de diecinueve filas se justifican, menos una** —`a cousin` en A— **y una
que se justifica por el motivo contrario del que dice el archivo** —`to put someone up`—. La
limpieza de la ronda anterior (fuera `to renew`, dentro `to be out all day` en B) se aplicó y se
nota: esta es la mejor lista del set.

---

### B.2 Lo que falta

Recorrí, rol por rol, los datos duros, los exponentes, la carta, el bloque de cierre y las tres
salidas del motor, buscando términos que ese rol tenga que **decir o entender** y que no estén en
su bloque.

---

**B.2.1 · La condición que cierra la salida 1 se dice con dos palabras que no están glosadas en
ninguna de las dos listas. (GRAVE)**

La salida 1 del motor —la que la simulación vio ganar— es esta: seis noches, la mañana del lunes
blindada, y **la sala recogida cada mañana**. La ficha de B lo lleva en su tabla de datos:

> `The living room | … · a room again before 7:00 a.m. — **mattress up, blankets away in the
> closet**`

Y así es como se dijo en la mesa (simulación, pareja 1, B2): *«And a room again at seven — the
mattress up, **the blankets away in the closet**.»*

`a blanket` y `to put away` **no están en la lista de B ni en la de A**. El archivo lo decidió a
propósito y escribió el motivo (hallazgo 62 de su lista): «se leen en contexto en la fila de datos
de B». Ese argumento defiende **al que las produce** — y deja al descubierto **al que tiene que
entenderlas**: en la pantalla de A no hay ni `blanket`, ni `closet`, ni la fila de datos que las
lleva. A oye la condición que decide el acuerdo y puede no enterarse de cuál es.

Es exactamente el defecto que la ronda anterior corrigió por el lado de `to be out all day` y que
aquí sigue sin ver: **las palabras se repartieron por quién las dice, no por quién tiene que
entenderlas.**

**Arreglo. Dos vías, y la primera es mejor porque no gasta ninguna plaza:**

1. **Decir la condición con las palabras que los dos ya tienen.** `mattress` está glosada en las
   dos listas. La fila de B pasa a: `a room again before 7:00 a.m. — mattress up, nothing on the
   floor`. Todo el vocabulario nuevo desaparece, la condición se dice igual, y la plaza libre de
   A sigue libre, que es lo que §10 recomienda.
2. Si el conjunto prefiere conservar las cobijas: **una fila en cada lista**, y en A la paga
   `a cousin` (B.1). En B no hay plaza libre, así que habría que sacar `to put someone up` de la
   lista de B — que es exactamente lo que **B.2.2** propone por otro camino.

---

**B.2.2 · `to put someone up` está justificada en las dos listas por un motivo que hace que no la
diga nadie. (GRAVE)**

La celda de A dice que la produce:

> | to put someone up (*put him up*) | to let someone sleep in your home for a few days | **the ask, in three words** |

Y el apartado «Lo que no se aplicó» del propio archivo dice lo contrario:

> «Se acepta como palabra de **reconocimiento**: pierde contra el exponente `He's going to sleep
> on the couch.`… **La fila se queda porque los dos roles la reciben.**»

**Los dos no pueden recibirla.** La celda de B ya dice, y bien, «what **they** are about to ask you
for»: B la recibe de A. Si A tampoco la produce, la palabra no entra en la conversación por
ninguna puerta y las **dos** filas se quedan sin motivo. Y la evidencia va en la dirección
contraria a la nota: en la simulación la produjo un jugador (pareja 5, A1: *«I need to **put him
up** for ten nights»*), y era A.

**Arreglo:** declarar lo que ya está escrito en la celda —**A produce, B recibe**— y borrar del
apartado final la nota de reconocimiento, que es lo único que sobra. Si el conjunto prefiere la
lectura contraria (que A tiene bastante con `He's going to sleep on the couch.`), entonces la fila
se cae de las dos listas y libera dos plazas, una de ellas la que pide B.2.1.

Lo que no puede quedarse es como está: una fila en dos listas y una nota que dice que nadie la usa.

---

**B.2.3 · Dos candidatas que miré y dejo fuera, con el porqué escrito para que la próxima ronda no
lo repita**

**`an interview`.** Es el dato duro central de B y la palabra que abre el conflicto. Falla la
prueba por poco, igual que en la ronda anterior: la misma fila de datos trae `video call` y
`the final one`, y con esas dos B llega al cierre. En la simulación los cinco B dijeron
«interview» sin glosa y sin atascarse. **Es la primera de la lista** si alguna vez se abre plaza
en B.

**`aunt`.** Aparece nueve veces en la pantalla de A, A la dice dos veces en voz alta (el exponente
de la tía y el ritual del cierre) y **se usa para definir `cousin`**. No está glosada, y no hace
falta: es A1. Lo apunto porque, si `aunt` se da por sabida, `cousin` —del mismo listado— también,
y ese es medio argumento del B.1.

---

### B.3 Reparto · quién produce y quién recibe

Aquí es donde una lista se rompe sin que se note fila a fila. La regla que uso es la que dejó
escrita la ronda anterior para escenarios simétricos, porque §11 está pensada para un mostrador y
aquí no hay mostrador: **una palabra puede estar en las dos listas; la columna `here` no puede
decir lo mismo en las dos.**

| palabra | A | B | ¿distingue? |
|---|---|---|---|
| `to put someone up` | «the ask, in three words» (produce) | «what they are about to ask you for» (recibe) | **sí** — pero el apéndice lo niega (**B.2.2**) |
| `the couch` | «where Iván sleeps in your plan — and the only one in the house» | «one object, and three people want it» | **sí** — corregido en la ronda anterior |
| `a mattress` | «your second way out — a bedroom floor, not the couch» | «already in the house — yours to propose too» | **sí**, y es el par mejor escrito |
| `to be out all day` | «Iván, from Friday on» (produce) | «their words, not yours — you'll hear it, and you have to catch it» (recibe) | **sí** |
| `to owe someone a favor` | «Nelson, apartment 402» (produce) | «a bed that depends on somebody else» (recibe) | **sí** |
| `the lease` | «their word — you'll hear it, and then the subject changed» | «your third thing, and the last one you bring out» | **sí**, pero la de A es opaca y filtra (**hallazgo 12**) |
| `to sign` | «the one you say yourself, at the end» | «the exact thing you need from them» | **sí** |
| `to drop` | «their word, about the wifi — not about falling» | «the wifi, by your window — your reason, and you don't give it first» | **sí** |

**Ocho pares de ocho distinguen producción de recepción.** Es el mejor reparto del set y hay que
decirlo, porque en la ronda 1 no distinguía ninguno. Exclusivas: `a cousin` en A; `a hostel` y
`to unload` en B — y las tres están donde tienen que estar.

**El único hueco del reparto es el de B.2.1**, y no se ve en esta tabla porque las dos palabras que
faltan no están en ninguna de las dos listas: la ficha repartió bien todo lo que glosó, y dejó sin
glosar lo que decide la salida 1.

Un segundo apunte, menor pero del mismo tipo: **la línea de toolkit de A manda preguntar solo por
`unload`**, y eso está bien resuelto ahora. Pero `unload` es la palabra que la prosa de B ha
convertido en sustantivo («boxes off a truck», hallazgo 11): si B no dice el verbo, A no tiene
nada que preguntar y el bloque 3 se queda sin ocasión. **Los dos hallazgos se arreglan con la
misma corrección**: devolver el verbo a la nota de B.

---

### B.4 ¿Alguna definición usa una palabra más difícil que la que define?

**Ninguna de las diecinueve.** Las repasé una por una y todas se sostienen con vocabulario A1-A2:

- `to put someone up` → «to let someone sleep in your home for a few days», con el trozo fijo
  glosado entero (`put him up`).
- `the couch` → «the long soft seat in the living room» · `a mattress` → «the flat soft thing you
  sleep on» · `a hostel` → «a cheap place to sleep, in a room with other people».
- `the lease` → «the paper that says you can live in this apartment». Cero jerga jurídica.
- `to sign` → «to write your name on a paper to say yes to it».
- `to drop` → «*(about the wifi)* to stop for a moment and then come back». El acotador entre
  paréntesis define **para este uso**, que es lo correcto y no es lo habitual.
- `to unload` → «to take boxes out of a truck». `truck` es americano y A1.
- `to owe someone a favor` → «you have to do something for them later»: define sin usar `favor`,
  que es la palabra difícil de la entrada.

**Y el orden de las filas ya no muerde**: al salir `to renew`, desapareció la única definición que
se apoyaba en una palabra que aparecía **más abajo** en su propia lista.

Lo que sí conviene decir, porque es el mismo defecto un centímetro más allá: **la columna `here` es
hoy más difícil que la columna `what it is`** en dos filas —«and then the subject changed»
(hallazgo 12) y «Ask, don't assume» en `a hostel`, que es una instrucción y no una nota de
propósito—. Y, sobre todo, **la prosa de la ficha es más difícil que su vocabulario**: `apartment
hunting`, `a paid room` y `boxes off a truck` (hallazgo 11) son más duras que ocho de las diez
palabras que la ficha se molesta en glosar. Glosar bien y escribir la prosa por encima del nivel
es dejar el andamiaje puesto en la pared de al lado.

---

### B.5 Cómo quedan las dos listas

Con la vía 1 de B.2.1 —que es la que recomiendo— **no hace falta mover ninguna fila**: se corrige
la nota del apéndice (B.2.2), la celda de `the lease` en A (hallazgo 12) y la fila de datos de B.
La lista de A se queda en 9 con su plaza libre a propósito, y la de B en 10.

Si el conjunto prefiere la vía 2 (conservar las cobijas como léxico), entonces:

**ROL A — 9 filas**: sale `a cousin`, entra `to put something away (*put them away*)` →
«to take something and leave it in its place — in a closet, in a drawer» · here: *their condition
in the morning — you'll hear it next to the mattress*.

**ROL B — 10 filas**: sale `to put someone up` (que A produce y B deduce del exponente entero),
entra `a blanket` → «the thick cloth you put over you in bed» · here: *your morning condition, and
you're the one who says it*.

Las dos vías dejan el reparto igual de sano. La diferencia es que la primera no gasta nada y la
segunda gasta dos plazas para decir lo que ya se dice con `mattress`.

---

## Resumen, por gravedad

**Graves (3)**

| # | qué | dónde se arregla |
|---|---|---|
| 1 | La restricción 1 de A reparte una coartada («the version is: ten days of vacation») y le quita el trabajo de sostener que importa | prosa de A, +4 palabras |
| B.2.1 | La condición que cierra la salida 1 se dice con dos palabras que no están glosadas en ninguna lista, y A no las tiene en ninguna parte de su pantalla | una fila de datos de B (vía 1) |
| B.2.2 | `to put someone up`: la celda dice que A la produce y el apéndice dice que nadie la produce | una nota del apéndice |

**Medios (7)** — 2 («you didn't offer anything instead» contra «two options») · 3 (el cierre llama
a cada jugador por un nombre que su pantalla no le da) · 4 (las dos fichas se pasan del tope de
prosa: 362 y 379) · 5 (`That's not true anymore.` cuando el archivo ya escribió `That's changed.`)
· 6 (las dos fichas exigen reparar el vínculo y ninguna tiene forma) · 7 (el bloque 4 marcado
`[jargon]` y A lo lleva sin ser el de la jerga) · 11 (léxico por encima de A2 en la prosa:
`apartment hunting`, `a paid room`, `boxes off a truck`).

**Leves (7)** — 8 (la lista vertical devuelve el orden) · 9 (las 11:00 sin motivo, y `out` en dos
sentidos) · 10 («No door out») · 12 (la celda de `the lease` en A) · 13 (`[what]` contra `…`) · 14
(referencia por posición) · 15 (12 turnos contra §4).

**Nada de esto toca el motor.** Conflicto, asimetría, las tres salidas, la carta y los tres puntos
del cierre siguen como los dejó `fase4-escenarios-4-6.md`. Y el balance de prosa de todo lo que
pido es **negativo en las dos fichas**: A queda en ~344 y B en ~349, contra 362 y 379 de hoy.

---

## Pendiente fuera de este archivo

Sin repetir lo que la ficha ya lleva en su lista ni lo que dejó la ronda anterior:

1. **Caja, bloque 4: el `[jargon]` está en el título y tendría que estar en las filas**
   (hallazgo 7). El bloque hace dos trabajos —volver a decir lo tuyo y sacar al otro de tu jerga—
   y solo uno tiene etiqueta. Mientras el título lo marque entero, cualquier ficha que asigne el 4
   a quien no suelta jerga se contradice sola.
2. **Molde: el cierre común no puede escribirse con nombres propios** (hallazgo 3). El molde lo
   hace bien —«Who opens on Saturday 12»— y este escenario no; en cuanto un cierre nombra a los
   dos roles, cada jugador lee un nombre que su pantalla nunca le asignó. Vale para los ocho.
3. **Molde: hace falta una notación única para los huecos de las plantillas** (hallazgo 13). Hoy
   conviven `…` y `[what]` en la misma tabla de diez filas. Da igual cuál gane; tiene que ser una.
4. **§4 y los turnos** (hallazgo 15). La tabla dice 6-9 por rol en A2 y este escenario declara 12.
   La simulación dice que 24 turnos caben en ocho minutos. O se corrige la tabla o se corrige la
   ficha, pero no pueden decir cosas distintas cuando el guardián lee las dos.
5. **La cuenta de prosa hay que correrla, no declararla.** `fase5-scripts/prosa.mjs` ejecuta la
   regla del escenario 2 y da el número en un segundo. Esta ficha llegó a la tercera ronda con
   `PROSA_A` y `PROSA_B` sin rellenar y con las dos fichas por encima del tope. Si §11 sube la
   regla, que suba también el script: una regla escrita se interpreta, una regla ejecutable no.
