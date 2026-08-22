# Fase 12 · La carga de los escenarios 4, 6 y 7 — diagnóstico y arreglo

Encargo: la puerta 5 (ningún rol por debajo del 40 % de las palabras, medido solo sobre parejas de
perfil parejo) falla en tres escenarios, y en el 4 la pareja floja además **muere en el turno 17**
sin producir ninguna pieza del cierre.

Medición de partida, de `fase11-veredicto.md` §1 y de las simulaciones vigentes:

| escenario | pareja que falla | reparto | quién es el lado corto |
|---|---|---|---|
| 3 · el molde | sólido + sólido | **64 / 36** | B (el que concede) |
| 4 · `the-pot-is-already-on` | flojo + flojo | **63,5 / 36,5** | B (Astrid) · **y muere en el turno 17** |
| 6 · `the-cousin-on-the-sofa` | flojo + flojo | **64 / 36** | B (Cris, el que concede) · muere en el 12 |
| 7 · `two-more-people-for-the-trip` | flojo + flojo | **35 / 65** | A (Valentina, la que concede) · muere en el 12 |

**Fecha:** 22 ago 2026. **Alcance:** los escenarios 4, 6 y 7. El 3 se diagnostica al final y **no se
toca** (no está en el encargo); queda escrito el arreglo exacto, por si se ordena.

---

## 0 · La pregunta previa: ¿por qué habla poco el rol callado?

El encargo obliga a decidir entre dos causas antes de proponer nada, porque llevan a arreglos
opuestos:

- **(a) Su objetivo se cumple asintiendo** → arreglo de escenario: darle algo que solo él pueda
  decir y que el otro necesite.
- **(b) Tiene cosas que decir y la ficha no le obliga a decirlas en voz alta** → arreglo de cierre:
  repartir quién dice qué.

**La prueba que separa una de otra ya estaba hecha y nadie la había leído así.** De los ocho
cierres del set, **cuatro reparten** (2, 4, 7 y, a medias, el 8) y **cuatro no** (1, 3, 5 y 6). Los
tres escenarios de este encargo caen a los dos lados de esa línea, así que **no fallan por la misma
raíz**, aunque el número que los delata sea el mismo:

| escenario | ¿el cierre reparte? | causa dominante | arreglo |
|---|---|---|---|
| **4** | **sí**, tres líneas cada uno desde la tercera pasada | **(a)** | escenario + la forma que faltaba |
| **6** | **no**, tres puntos que dicen los dos | **(b)**, con media (a) encima | cierre |
| **7** | **sí, pero por cuenta y no por coste** | **(a)**, del lado del que **no** calla | cierre + criterio de éxito |

El diagnóstico de cada uno, con su evidencia, va abajo. Y una cosa que conviene dejar dicha porque
gobierna los tres arreglos, y la escribió la propia simulación del 4 (§D3):

> **La única pieza del cierre que un callado no puede producir en telegrama es la que viene de la
> carta. Es una obligación, no un dato.** Un dato cabe en tres palabras; una obligación con precio
> dentro, no.

---

## 1 · Escenario 4 · `the-pot-is-already-on` — causa (a), y un agujero de andamiaje encima

### El diagnóstico

**Su cierre ya reparte.** Desde la tercera pasada dice *«Each of you says three things out loud.
Six in total. Nobody says the other person's three»*, y **funciona**: con el rol A amordazado, el
callado produjo A1 y A2 él solo (`fase11-simulacion-4` §D3). Así que el arreglo barato —el (b)— ya
estaba aplicado aquí, y no es lo que falla.

**Lo que falla es el objetivo de A, y falla por la causa (a).** Su restricción 3 le pide tres cosas
antes de abrir la nevera —cuántos, antes de qué hora, cómo vuelven— y **las tres son datos que él
recibe**. El callado se las llevó con **cinco palabras en tres turnos**: `How many?` · `Plates. At
one.` · `Then how do you all get back?`. La tercera pasada ya había intentado tapar esto (arreglo
nº 5, «que un `Wilmer` de doce palabras no baste») y **contra el callado no funcionó**, porque el
problema no era cuántos datos se piden: es que **pedir es barato y responder es caro**. Ese es
exactamente el mecanismo que hunde el reparto.

**Y encima hay un agujero de andamiaje que es el que mata a la pareja floja.** A **no tiene forma
para preguntar su propio objetivo**: su tabla trae `I have to know before …, because …` y `And how
do you all get back from …?`, pero **ninguna pregunta por el número**. En la pareja floja pregunta
en español en el turno 13, lo repite en el 15 y en el 17 se sale del papel a preguntarle al
profesor. Los dos turnos que gasta son suyos y no producen nada; los que B no llega a dar son los
que producirían sus líneas 2 y 3 del cierre, que son las largas. **De ahí sale el 36,5 %.**

El informe de nivel lo había pedido (cambio 2), la ficha declaró por escrito **dos veces** que no
lo tocaba por ser «andamiaje, no nivel», y las dos simulaciones siguientes lo cazaron. Es el caso
de libro de un pendiente que se pasa de mano hasta que mata algo.

### Lo aplicado — `artifacts/habla-a2/fase8-fichas-4nuevo.md`

| # | Dónde | Antes → después |
|---|---|---|
| 1 | A · exponentes, fila 89 | `asking how they get back` → **`asking how many, and how they get back`**, con la forma que faltaba: **`How many are coming back at …?`** · `And how do you all get back from …?`. Sigue habiendo 9 filas y el orden alfabético por función se mantiene |
| 2 | A · `The lunch happened if`, oración 1 (línea 98) | `She told you how many come back, before what hour, and who rides and who walks.` → **`You said what you lose tonight if that number comes late, and what Monday and Tuesday cost you.`** |
| 3 | cierre · `Only A can say` | las tres líneas de A llevan ahora **el precio dentro**: `…for how many, and what is lost tonight if that number comes late` · `…what stays, and what that costs on Monday and Tuesday` |
| 4 | cierre · reglas | de cuatro a **cinco**. *Yeah* y *that works* entran en la lista de asentimientos prohibidos —con `Yeah` se firmaba A3 en la simulación—. Regla nueva: **un número sin hora no es una línea, y nada sale de este patio gratis: di qué das y di qué recibes por ello** |
| 5 | cierre · encabezado | fuera *«and they're what make this one different from the other seven»*: desde hoy los escenarios 6 y 7 reparten igual |
| 6 | changelog | el bullet «Cambio 2 … **Sin tocar**» queda tachado y marcado como aplicado, para que el archivo no se contradiga |

**Prosa después: A 445 · B 449** (techo 450). La ficha de B **no se ha tocado**: su lado ya tenía
tres líneas caras, y el propio §D1 dice que este reparto «no se arregla dándole más a B».

### Los tres primeros turnos, jugados

A ahora abre con `Come here a second, before you …`, pregunta **en inglés y una sola vez**
(`How many are coming back at …?`), y B no puede contestar con un número suelto porque la respuesta
que su cierre le exige es **quién va en moto, quién camina y cuánto dura la caminata**. El callado
del lado A ya no cierra su A1 con siete palabras: tiene que decir además qué pierde esta noche si
el número llega tarde. Nadie puede asentir su parte.

---

## 2 · Escenario 6 · `the-cousin-on-the-sofa` — causa (b): el cierre no repartía

### El diagnóstico

**Este es el caso limpio del arreglo barato.** Su cierre decía *«You finish when you both say these
three things out loud»*: **los dos dicen los tres puntos**, así que el callado puede dejar que los
diga el otro y confirmar. Y eso es lo que pasó, medido: en la pareja floja el punto 2 salió de la
boca de B en cuatro palabras y A no lo repitió nunca; el punto 3 **no existió**; y `And one more
thing.` se dijo **vacío** —el marcador sin la cosa detrás— y ahí se murió el contrato.

**Y hay media causa (a) encima, que el mismo cierre resuelve.** *«B consigue la mitad de su
objetivo asintiendo, y esa mitad es la mañana del lunes»*: A le **regala** la franja de ocho a once
sin que B la haya pedido con hora, porque el criterio de éxito de A —*«dos opciones, y nadie paga
cama»— le empuja a poner alternativas sobre la mesa y la más barata de todas es regalar la mañana.
`Yeah. That works.` bastaba para ganarla.

**La otra mitad del objetivo de B —el contrato— sí aguanta**, y aguanta por la razón que gobierna
todo este informe: **el contrato solo existe en la ficha de B**. Si B no lo nombra, A no puede
firmarlo ni por deducción. Esa mitad no hay que arreglarla: hay que copiarla.

### Lo aplicado — `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md`

| # | Dónde | Antes → después |
|---|---|---|
| 1 | cierre | de **tres puntos que dicen los dos** a **tres líneas de Dani y tres de Cris, y ninguno dice las del otro**. Las tres de Cris son las tres que solo él tiene: **las dos horas** del lunes 24, **el contrato con su fecha**, y lo que queda sin decidir con su día. Las de Dani: dónde duerme Iván el jueves, la segunda cama y que nadie paga por ella, y el mensaje para la tía |
| 2 | cierre · reglas | las cuatro del molde del escenario 4, con dos añadidos: **nada de asentir** (*Yeah*, *sure*, *okay*, *fine*, *that works*) y **nada se regala** — quien da algo dice qué recibe por ello, en el mismo turno |
| 3 | B · exponentes, fila `one at a time` | `And one more thing.` → **`And one more thing: the lease, before…`** |
| 4 | B · exponentes, fila `putting yours down` | `I need the living room on…` → **`I need the living room on…, from… to…`** |

**Prosa después: A 444 · B 448, sin cambios.** Todo lo tocado vive fuera de las dos fichas (el
cierre es sección compartida) o dentro de una tabla, y ni el cierre ni las tablas cuentan para el
techo de §11. **No se tocó una sola línea de prosa de ninguno de los dos roles.**

### Los tres primeros turnos, jugados

Igual que antes en los dos primeros —A entra con la noticia cerrada, B pregunta `How many
nights?`—, y la diferencia aparece en el tercero: si A ofrece la mañana, **no está ganada**. La
franja del lunes es línea de Cris y hasta que Cris no diga *de qué hora a qué hora*, no hay punto.
El regalo deja de servir para comprar la paz, porque la regla nueva obliga a decir qué se recibe a
cambio, y lo que A necesita a cambio es la cama del jueves.

---

## 3 · Escenario 7 · `two-more-people-for-the-trip` — causa (a), del lado del que **no** calla

### El diagnóstico

**Aquí el cierre sí repartía, y repartía mal: por cuenta de puntos, no por coste.** Decía *«Kevin
says point 2. Valentina says points 1 and 3»*. Sobre el papel, dos contra uno a favor de ella.
Sobre la mesa: todo lo de ella es caro —seis cifras de seis dígitos, una lista de portería con
nombres y cédulas, una carta de cinco filas y **dos** de los tres puntos— y **todo lo de él es
barato**: dos nombres, una fecha y una resta. Con dos jugadores sólidos ese reparto la pone en el
57 %; con dos flojos la deja en el **35 %**. Veintidós puntos de diferencia entre un extremo y
otro, la mayor de las cinco parejas.

**Y el asentimiento está del otro lado.** *«Kevin consigue su fecha asintiendo ella»*: su objetivo
es doble —un cupo y el martes 25—; el cupo se lo gana trabajando, pero **la fecha la pide y ella
dice `OK`**. `You haven't paid me yet.` está impreso en la ficha de Valentina y **no se produce
nunca**: la deuda entera del escenario se resuelve sin que la acreedora la mencione una sola vez.

Hay un tercer defecto que es el mismo agujero visto desde otro lado: el cierre pedía dos cifras en
el mensaje —cuántas personas van, cuántos carros salen— **y no pedía que fueran verdad ni que
fueran las suyas**. En la pareja floja el mensaje salió con las dos falsas y nadie se enteró.

### Lo aplicado — `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`

| # | Dónde | Antes → después |
|---|---|---|
| 1 | cierre | de **1 punto / 2 puntos** a **tres líneas cada uno**, y las de Kevin dejan de ser baratas: nombre y cédula **con de quién los saca** · el día del pago **con lo que hace si ese día no está la plata** · qué le dice a Sebastián y qué a Andrea, **cada una con su hora** |
| 2 | cierre · regla nueva | **«un día no está cerrado hasta que el otro dice qué pasa si se corre. Los 100.000 necesitan dos bocas, no una.»** La fecha de Kevin deja de ganarse con un `OK` |
| 3 | cierre · regla nueva | **las dos cifras del mensaje tienen que ser las que los dos acaban de decir en voz alta.** Si no lo son, se dicen otra vez |
| 4 | cierre · reglas | entran la prohibición de asentir y la de decir la línea del otro |
| 5 | A · exponentes, fila `conditions` | `If I don't have it tonight, I'll …` → **`If I don't have it on …, I'll …`**, para que la misma forma sirva para el nombre de esta noche **y** para la plata del martes. El *rationale* de `first-conditional` se sincronizó |
| 6 | A · `You did it if` | `the 100,000 has a date` → **`…has a date with a price on it`** · `you left with a fact you didn't have at 7:20` → **`you each left…`**, porque el criterio se cumplía del revés: el que se llevaba hechos nuevos era él |

**Prosa después: A 449 · B 442** (techo 450). La ficha de B **no se tocó**. El gesto de cierre
—mandar el mensaje— **sigue asignado a Valentina**, que es el lado callado, y sigue costando dos
palabras: eso estaba bien puesto y no se movió.

### Los tres primeros turnos, jugados

Kevin abre con `I know it's last minute, but …` y sus dos personas. Valentina rechaza con el número
delante (`There are only six …`). Kevin pide el martes 25 — y **ahí está el cambio**: ya no le vale
que ella diga `OK`, porque el día no está cerrado hasta que ella diga qué pasa si se corre, y para
eso tiene la forma `If I don't have it on …, I'll …`. La conversación no puede avanzar sin que la
acreedora hable de su deuda.

---

## 4 · El escenario 3, el molde — diagnosticado y **NO tocado**

No está en el encargo y no se ha modificado ni un carácter de `fase7-modelo-ficha-en.md`. Queda
escrito qué le pasa, porque es la misma familia y porque **es el molde**: mientras su cierre no
reparta, los demás tenderán a volver a lo mismo.

- **Es de causa (b), como el 6.** Su cierre —*«You finish when the two of you say out loud,
  together, the message that goes to the café group today»*, cinco puntos— **no reparte**.
- **La causa está localizada en un turno, no en el motor** (`fase11-simulacion-3` §D7): el mensaje
  al grupo **dictado entero por A**, 70 palabras. Quitándolo, el reparto pasa de 64/36 a **60/40**.
- **El arreglo, exacto y barato:** repartir los cinco puntos, que ya se dejan repartir solos —
  **A**: quién abre el sábado 12 y a qué hora (1) y qué turno se devuelve y qué día exacto (3);
  **B**: cuánto se queda y quién entra después (2) —es su límite de las 8:00— y el nombre que va
  escrito en el mensaje (4), que es **su única condición**; **juntos**: lo que queda abierto (5).
  Más las reglas de no repetir la línea del otro y de no asentir.

---

## 5 · Lo que este encargo NO arregla, y se deja dicho para que nadie lo dé por cobrado

1. **El atajista del escenario 4 sigue ganando con dos datos falsos** (puerta 2, reserva del acta).
   La restricción 3 de A cuenta piezas de información, no verdad, y ninguna ficha le da con qué
   comprobarlas. La regla nueva del cierre le pone precio a lo que da, pero no le pone verificación
   a lo que recibe.
2. **La carta del escenario 4 sigue diciendo** *«her fourth turn ends — global turn 5»* cuando el
   cuarto turno de ella es el global 8. Está declarado desde la quinta pasada y no es carga.
3. **El andamiaje de las fugas al español** —reaccionar a una cifra de seis dígitos (esc 7),
   reconstruir el turno tras abrir la carta (esc 6 y 7) y el cierre (`«¿Y ya?»`, `«Ya, ¿ya está?»`)—
   es de `habla-fichas-de-rol` y de la caja, no de escenarios.
4. **La puerta 4** (formas cerradas en las tablas de exponentes: 9 en el esc 6, y el esc 7 sin
   `don't read it out loud`) sigue igual. No se ha añadido ni una forma cerrada nueva: las cuatro
   formas tocadas son troncos con `…`.
5. **Hay que volver a simular los tres.** Todo lo de aquí es texto movido, y las cifras de carga de
   `fase11-simulacion-4/-6/-7` **caducan con este archivo**. La puerta 5 no se puede firmar con las
   mediciones de esta mañana.

---

## 6 · Comprobación posterior, hecha sobre el disco

Releído del disco después de escribir, y medido con los scripts canónicos (no con estimaciones):

| Comprobación | Resultado |
|---|---|
| Los 10 cambios de contenido están en los tres archivos | **sí**, verificados uno a uno con `grep` y `awk` sobre el texto final |
| Prosa ≤ 450, contador canónico `fase7-scripts/prosa-canonica.mjs` | **16/16** · esc 4 **445/449** · esc 6 **444/448** · esc 7 **449/442** · peor del set 450 |
| Cero oraciones de prosa decibles (`prosa-decible.mjs`) | **0 de 567** empiezan por I/We/My/Our |
| Cero celdas `here` calcables (`here-calcable.mjs`) | **0 de 157** con comillas · **0 de 157** con pronombre + verbo · **0 de 165** filas de datos duros |
| Exponentes por rol dentro del 6–9 de §11 | **sí**: 4A 9 · 6B 9 · 7A 9, sin cambio de número de filas |
| Vocabulario por rol dentro del 8–10 | **sí**, sin tocar |
| Motor intacto (acto de habla, poder, quién arranca, desenlace, género) | **sí**, ni una línea de cabecera de los tres archivos ha cambiado |
