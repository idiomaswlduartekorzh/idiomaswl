# Fase 10 · Verificación tras la pasada quirúrgica — escenario 7, `two-more-people-for-the-trip`

**Auditado:** `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md` tal como está en
disco hoy (22 ago 2026, sin commitear). **Contra:** `artifacts/habla-a2/fase9-calcable-7.md`
(NO PASA · 9 decibles + 2 defectos de forma).

**Alcance, igual que en fase 9:** fuera las dos tablas `Say it here` (88-97 y 163-172) y el bloque
`After — both screens, in Spanish` (216-218). Dentro: toda la prosa, las dos tablas `Facts`, las
tres tablas de vocabulario, la carta y la pantalla compartida.

**La pasada se respetó, y está medido.** `git diff -U0` sobre el fichero da **21 líneas de
contenido tocadas** —las 21 que la propia bitácora declara (39, 42, 43, 44, 47, 73, 80, 83, 97,
111, 113, 118, 122, 125, 146, 149, 151, 188, 200, 206, 253)— más el apéndice nuevo de bitácora
(líneas 331-388), que no va en pantalla. **Ninguna otra línea cambió ni un carácter.** No hubo
reescritura de prosa: no hay por dónde reintroducir el defecto en masa, y el conteo de abajo lo
confirma.

**Presupuesto:** `prosa-canonica.mjs` corrido hoy → ROLE A **446**, ROLE B **442**, techo 450.
Cumple, y baja respecto de los 448/443 de fase 9 pese a las nueve reparaciones: los recortes
compensatorios se pagaron.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 142 unidades** (0,7 %, contra 9/142 = 6,3 % en fase 9).
**Las 9 de fase 9 están arregladas, las 9. Los 2 defectos de forma, arreglados. Ninguna decible
nueva creada por el retoque.**

La única que cuento hoy —línea 39, la regla propia de Valentina— **no la creó esta pasada**: su
antecesora tenía la misma estructura y la ronda de fase 9 no la vio. La pasada la retocó por otro
motivo (nivel §7, negación antepuesta) y, de paso, la dejó un punto más pronunciable. Es un fallo
heredado y detectado hoy, no daño del retoque.

| sección | unidades | decibles fase 9 | decibles hoy |
|---|---|---|---|
| A · `Your own rule` | 1 | 0 | **1** |
| A · `You can't` | 8 | 2 | 0 |
| A · `Only you know` | 7 | 2 | 0 |
| B · `You want` | 2 | 1 | 0 |
| B · `And a reason you can repeat` | 3 | 1 | 0 |
| B · `You can't` | 6 | 1 | 0 |
| B · `Only you know` | 5 | 2 | 0 |
| Vocabulario, columna `here` (A 9 + B 10 + carta 2) | 21 | 0 (+2 de forma) | 0 (+0 de forma) |
| Tablas `Facts` (A 10 + B 10) | 20 | 0 | 0 |
| La carta (5 filas + 2 vocabulario + 9 prosa) | 16 | 0 | 0 |
| Pantalla compartida `how it ends` | 11 | 0 | 0 |
| resto de prosa (cabeceras, situación, objetivos, toolkits, criterios, «si te vas sin nada») | 42 | 0 | 0 |
| **total** | **142** | **9** | **1** |

(La prosa baja de 76 a 74 oraciones porque la línea 47 fusionó dos en una y la 122 otras dos; la
pantalla compartida sube de una oración larga a tres cortas. El total de unidades sale igual: 142.)

---

## 1 · Hallazgo por hallazgo — las 9 de fase 9

| # | dónde | estado | línea nueva |
|---|---|---|---|
| A-1 | 43 | **arreglado** | `Get anyone in without the list. Your reservation has six names and six ID numbers on it, and only doña Nubia can change your list.` |
| A-2 | 44 | **arreglado** | `Drop Hernán to free a spot. You gave him the sixth place for his car, and taking it back costs you his four seats.` |
| A-3 (GRAVE) | 47 | **arreglado** | `At 6:00 p.m. you watched Hernán leave his car at the mechanic's with a strange noise, and you are the one waiting for the mechanic's call at 7:00 a.m.` |
| A-4 | 47 | **arreglado** | misma línea: `The mechanic calls back at 7:00 a.m.` ya no existe como oración |
| B-1 (GRAVE de lectura) | 111 | **arreglado** | `You came down to get a spot for Sebastián and Andrea — both of them, or one.` |
| B-2 (GRAVE) | 113 | **arreglado** | `Your twenty minutes with Andrea start now.` |
| B-3 | 118 | **arreglado** | `Bring them yourself. You have never seen that gate list, and Valentina has.` |
| B-4 | 122 | **arreglado** | `You said yes to two people on Tuesday, when the group was still five, and you heard about the sixth from somebody else.` |
| B-5 | 122 | **arreglado** | misma línea: `The sixth came after that.` desaparece como oración autónoma |
| forma 1 | 146 | **arreglado** | `Sebastián's bed · one less bed to find` (sin pronombre + verbo) |
| forma 2 | 149 | **arreglado** | `their two cards tonight · the number, not just the name` (nota, no oración) |

**Ninguno queda a medias.** Comprobación una por una con la prueba de voltear el `you`:

- **43** — `Your reservation` / `your list`: para pronunciarla, Valentina tiene que decir *mi
  reserva* y *mi lista*. En boca de Kevin, la reserva no es suya. El sujeto ya no es la portería y
  el `no` vuelve a ser de ella, no de doña Nubia: el criterio de éxito de la línea 100 («el no fue
  tuyo») deja de estar contradicho por su propia restricción.
- **44** — `You gave him the sixth place`: en su boca es *yo se lo di*. Además el dato («cuatro
  asientos menos») ya no viaja como afirmación autónoma sobre un ausente, sino colgado de
  `costs you`.
- **47** — el dato oculto entra dentro de `you watched…` y de `you are the one waiting…`. Los dos
  predicados son falsos en boca de Kevin. Era el fallo que §11 llama fatal y hoy no se puede leer.
- **111** — `You came down to…`: Kevin tiene que convertir a *bajé*. Su primera frase ya no es su
  objetivo servido.
- **113** — `Your twenty minutes with Andrea`: al voltear a Valentina sale falso, y aquí sí, porque
  la línea 49 dice literalmente `You have never met Andrea`. Valentina no tiene veinte minutos con
  nadie. La avería exacta que fase 9 señaló —que las dos están en el mismo parqueadero— queda
  desactivada porque el sujeto ya no es la coincidencia física, es la relación.
- **118** — doble conversión: `You have never seen` es falso volteado, y `Valentina has` no se le
  dice a Valentina. Y se respeta lo que fase 9 pedía de fondo: el toolkit de Kevin (`3 [receives]…
  so ask`) ya no tiene tres líneas antes la respuesta pronunciable.
- **122** — `You said yes to two people` y `you heard about the sixth` son falsos los dos volteados.
  La queja y la defensa dejan de venir hechas.

**Sobre las tres propuestas que la pasada no aplicó tal cual** (`what you wrote there`,
`Whatever the guard asks for…`, `days later`): las tres desviaciones están justificadas y las tres
conservan la reparación. La de `days later` además evita contradecir la línea 48 (el sexto entró el
miércoles). No hay nada que reclamar ahí: mi reescritura era una propuesta, no la única salida.

---

## 2 · Cepillo entero — lo que hay AHORA

### La única decible

**Línea 39 · ROLE A · `Your own rule`**
> `**Your own rule** · Don't say yes before you have a name and a reason.`

Imperativo negativo en segunda persona. Volteado a Kevin **sigue siendo cierto y sigue siendo la
jugada de Valentina**: es exactamente el reproche que la ficha le da (Kevin le dijo que sí a dos
personas el martes sin nombre ni razón, línea 122). Se lee tal cual, es A2, y el turno avanza —
Kevin contesta con el nombre. La deixis no protege porque un imperativo no tiene sujeto que
voltear: quien lo escuche puede sostenerlo.

- **No es nueva de fondo.** La versión anterior, `Say yes to nothing before you have a name and a
  reason.`, tenía la misma estructura y fase 9 la dio por limpia: es un fallo que se me pasó, no
  uno que el retoque introdujera. Lo que sí hizo el retoque fue volverla *más* de boca: `Don't say
  yes…` es la forma en que esto se dice de verdad, y `Say yes to nothing…` no lo era.
- **Micro-arreglo, una línea, −2 palabras:** `**Your own rule** · No yes without a name and a
  reason.` Elipsis nominal: conserva la negación antepuesta que pedía nivel §7, no se puede
  pronunciar como turno, y el jugador entiende igual la regla. Coste de presupuesto: −2 en A
  (446 → 444).

### Dos vigilancias que NO cuento, y por qué

1. **Línea 113, tercera oración (material nuevo de esta pasada).**
   `And the reason has to be yours: "Valentina said no" is not enough: then Andrea asks why, and
   she calls Valentina.` La cita entrecomillada dentro de prosa es lo único verdaderamente nuevo
   del retoque que da que pensar, porque una cita es la forma más pronunciable que existe.
   **No cuenta** porque leída tal cual invierte el objetivo: `the reason has to be yours` dicho a
   Valentina significa *dámela tú*, que es lo contrario de lo que la ficha le manda a Kevin
   (la razón tiene que ser suya, para repetirla como propia delante de Andrea). Leerla verbatim no
   le avanza el turno, se lo cambia. **Nit de forma, opcional:** dos puntos dos veces en la misma
   oración; el segundo pide raya (`…is not enough — then Andrea asks why…`).
2. **Línea 42, cuarta oración (sin tocar).** `If the six pay again, you put in your part and nobody
   else's.` Volteada a Kevin sigue siendo cierta, pero no es la jugada de Valentina esta noche:
   ella quiere sus 100.000, no un segundo reparto, y la línea no entrega ningún dato oculto. Fase 9
   la dio por limpia y sigo con el mismo criterio; queda escrita aquí para que la tercera ronda no
   la descubra como si fuera nueva.

También revisado y **limpio** —lo digo porque están a un pelo—: `Tomorrow six people go and five
seats leave, and all five are his.` (51: la primera mitad no es cierta *ahora*, es la proyección
del fracaso, y filtra el carro de Hernán, que es dato oculto de ella; la segunda mitad tiene el
`his` roto), `The sixth place was yours.` (48: en su boca es *mía*), `On Tuesday each of them gave
you 100,000.` (121: *me dieron*), `Tonight 200,000 leave your pocket…` (125: *mi bolsillo*).

### Tablas: cero, otra vez, y ahora sin defectos de forma

- **20 filas de datos** (57-66, 131-140): nota pura, ni una conjugación de más. 0.
- **21 filas de vocabulario, columna `here`**: las dos que incumplían §11 están corregidas y **las
  21 son hoy nota de propósito**. Repasadas una a una: `none left in the house — the whole fight`,
  `no name on the list, no entry`, `where your power comes from`, `two of them — the reason you
  came down`, `Andrea's only way there`, `why nothing closes tonight`… Ninguna empieza por
  pronombre + verbo conjugado, ninguna lleva comillas. Columna `what it is`: las 21 empiezan por
  artículo o infinitivo, incluidas las dos redefiniciones de esta pasada (`the person who checks
  the names before people go in`, `a house that is yours for two nights, because you paid`).
- **La carta** (185-198): las cinco filas siguen nominales y la de precio mejoró
  (`on your reservation, not on his` — imposible de leer en boca de nadie que no sea Valentina). 0.
- **Pantalla compartida** (206-212): partir la instrucción larga en cuatro cortas no creó ninguna
  decible; son acotaciones en tercera persona sobre los dos jugadores. 0.

---

## 3 · Lectura del conjunto

De 9 a 1 con **21 líneas tocadas y ni una más**, con el presupuesto bajando en vez de subir. Esto
zanja lo que fase 9 dejó abierto: **el defecto no era del texto, era del método**. Cada vez que se
reescribía la prosa entera para «mejorarla» volvían a aparecer sujetos en tercera persona sobre
ausentes y datos ocultos convertidos en oración. Editando solo lo citado, el porcentaje de decibles
cae de 6,3 % a 0,7 % en una sola pasada, y no aparece ni un fallo nuevo en las 121 unidades que
nadie tocó.

**Para el guardián:** si la línea 39 se arregla con la elipsis nominal propuesta, este escenario
queda en **0 decibles sobre 142** y ya no debería volver a auditarse por calcabilidad, salvo que
alguien reescriba prosa. Si alguien la reescribe, esta cuenta caduca entera.
