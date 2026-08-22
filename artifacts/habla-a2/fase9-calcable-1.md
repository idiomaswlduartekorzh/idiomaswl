# Fase 9 · ¿Se puede leer en voz alta? — escenario 1, `the-bike-in-the-parking-lot`

**Auditado:** `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md` tal como está en
disco hoy (22 ago 2026), con la tercera pasada y el reparto de género aplicados. Los informes de
fase 7 y 8 —y la versión anterior de este mismo archivo— se leyeron solo para saber qué se dijo
antes. Nada se dio por bueno por venir de ahí, y **una de sus conclusiones se revoca** (§Revocación).

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases. `here` → nota de propósito, sin comillas y sin pronombre + verbo.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Fuera de alcance por diseño:** las dos tablas `Say it here`, el bloque final en español y la
carta de WhatsApp (documento de un tercero: en boca de B, «I'm going to Barrancabermeja» es falso,
así que se protege sola).

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy): ROLE A **442**, ROLE B **429**, tope 450. Cumple. Las siete reescrituras dejan
A en **446** y B en **433**: no hay que quitar ninguna pieza.

---

## Veredicto

**NO PASA · 7 líneas decibles sobre 112 unidades** (72 oraciones de prosa —36 por rol— + 40 filas
de tabla en alcance: 10 de datos y 10 de vocabulario por rol). Más **1 defecto de forma** en la
columna `here` que no es decible pero incumple §11 al pie de la letra.

**Reparto: ROLE A 6, ROLE B 1.** Concentración por bloque:

| bloque | unidades | decibles |
|---|---|---|
| A · `Only you know` | 6 | **3** |
| A · `You want` | 2 | 1 |
| A · `You can't` | 6 | 1 |
| A · `Facts` (tabla) | 10 | 1 |
| A · vocabulario `here` (tabla) | 10 | 0 decibles + 1 de forma |
| B · `You want` | 2 | 1 |
| todo lo demás (66 unidades) | 66 | 0 |

Se cae por una sola, la **2**: entrega el dato oculto de A ya convertido en oferta pronunciable, en
el bloque `Only you know`. Es literalmente el fallo que §11 declara fatal («en un escenario llegó a
entregar el dato oculto ya convertido en frase lista para pronunciar»). La reparación es de línea,
no de diseño —el motor, los dos números y el cierre no se tocan—, pero mientras esa línea esté ahí
el escenario se puede resolver leyendo.

---

## Revocación del informe anterior de este mismo archivo

La versión previa cerró con **PASA CON CAMBIOS · 5 decibles** apoyándose en un principio que es
falso (su línea 140): que la segunda persona protege sola, porque «`Your lowest price is 390,000
with the new gears on` dicha a B significaría el precio **de B**».

Significa exactamente eso, y por eso **funciona**: de un vendedor a un comprador, *your lowest
price* se oye como «el precio más bajo que te puedo hacer», que es justo lo que A quiere decir.

**La deixis solo protege cuando el predicado no lo puede sostener el que escucha.** `The doorman
told you twice` está a salvo (a B no se lo dijo nadie). `Your lowest price is…`, `Your limit is…`,
`You have to get the bike out today` no lo están: precio, tope y plazo son cosas que en una
negociación tienen los dos, y el «you» aterriza en el otro sin romperse. Ese es el agujero por el
que se colaron las tres líneas que el informe anterior no vio (las 1, 2 y 7 de abajo).

---

## Las siete, literal, con reescritura

### 1 · ROLE A · `You want`

> `Your lowest price is 390,000 with the new gears on.`

Dicha a B: «lo más bajo que te puedo hacer con los platos nuevos son 390.000». Es el número de A y
el turno avanza.

**Reescritura:** `You will not sell it for less than 390,000 with the new gears on.`
(*you will not sell* no lo puede decir un comprador · 10 → 14 palabras)

### 2 · GRAVE — ROLE A · `Only you know`, viñeta 2

> `With the old gears back on, your lowest price is 330,000 and you lose nothing.`

**El dato oculto, ya redactado como oferta.** Dicha a B se oye entera y coherente: «con los platos
viejos puestos, tu precio son 330.000 y no pierdes nada». Los 40.000 que el escenario existe para
negociar se regalan en un turno. Y la viñeta que va justo debajo avisa —`Say that early and you
give the deal away`— de lo que la propia ficha acaba de poner por escrito en voz decible.

**Reescritura:** `You would sell it for 330,000 with the old gears back on, and lose nothing.`
(15 → 15 palabras; *you would sell it* es imposible en boca del comprador)

### 3 · GRAVE — ROLE A · `Only you know`, viñeta 3

> `The lock and the lights were never in the ad, and nobody has asked.`

Tercera persona pura, sin anclaje. A se la dice a B palabra por palabra y el turno avanza: es su
jugada de `to include` sin bajar el número.

**Reescritura:** `You never put the lock or the lights in the ad, and no buyer has asked.`
(14 → 16 palabras)

### 4 · ROLE A · `Only you know`, viñeta 4

> `Three buyers came before this one, and all three gave the same speech about the tire.`

Se levanta entera. La única fricción es `this one` delante de B, y hasta eso suena a vendedor
cansado.

**Reescritura:** `You heard the same speech about the tire from all three buyers before.`
(16 → 13 palabras: paga las de arriba)

### 5 · ROLE A · `You can't`, restricción 3

> `Take the gears off here. That needs the shop, before one.`

`That needs the shop, before one.` no tiene deixis: A la dice tal cual para explicar por qué los
platos no salen ahora. La versión de fase 7 estaba protegida (`You need the shop for that…`); el
recorte de prosa de la tercera pasada le quitó el `you` y con él la protección.

**Reescritura:** `You need the shop for that, before one.` (6 → 7 palabras)

### 6 · ROLE A · tabla `Facts`, fila «The old gear set»

> `| The old gear set | still works · the two small gears are difficult to use |`

`the two small gears are difficult to use` es oración completa, sujeto y verbo conjugado, dentro de
una tabla donde §11 solo admite notas. Y es **la línea que decide el trato**: el propio archivo la
cita como tal en el `rationale` de `connectors-a2` («they work, but the two small gears are
difficult to use»). La ficha se la entrega hecha.

**Reescritura:** `| The old gear set | still works · the two small gears, hard to use |`
(fila de tabla: no toca el presupuesto de prosa)

### 7 · ROLE B · `You want`

> `Your limit is 350,000 in cash, for the bike alone.`

Mismo mecanismo que la 1, en el otro lado: dicha a A se oye como «tu tope son 350.000 en efectivo,
solo por la bici», que es la posición de B y avanza el turno.

**Reescritura:** `You cannot pay more than 350,000 in cash, and only for the bike alone.`
(*you cannot pay* no lo sostiene el vendedor · 10 → 14 palabras)

### 8 · defecto de forma, no decible — ROLE A · vocabulario, `worn out`, columna `here`

> `| worn out | used so much it doesn't work well | the rear tire · they say it before you do |`

`they say it before you do` es pronombre + verbo conjugado en la columna `here`: la forma exacta que
§11 prohíbe ahí y la misma que la tercera pasada arregló en `the doorman`. No es decible (el «they»
apunta a quien escucha), pero quedó sin arreglar y es el patrón que reincide.

**Reescritura:** `the rear tire · su argumento, no el tuyo` → en inglés:
`the rear tire · their argument, not yours` (así queda igual que la celda gemela de ROLE B,
`the rear tire · your first argument, and early`).

**Efecto sobre el techo:** ROLE A 442 → **446/450**. ROLE B 429 → **433/450**.

---

## La lupa sobre la columna `here` — 19 celdas limpias de 20

Es el punto de riesgo declarado por §11 y hoy **no filtra ningún dato oculto**, en ninguno de los
dos roles. Ninguna celda lleva comillas ni cursiva. Lo que aguanta y por qué:

- Las tres que más cerca estaban de filtrar se quedan en **función**, no en contenido: `gear set` →
  `the new one, on the bike · your card`; `to include` → `the lock, the lights · instead of cutting
  the number`; `deal` (B) → `your way in when the price stops moving`. Dicen para qué sirve la
  palabra, no qué se dice con ella.
- `the doorman` ya es nota de propósito (`where your deadline comes from · a rule, not your idea`):
  el arreglo de la tercera pasada se verificó y está.
- La entrada `to fit` de A, por donde se escapaba el secreto, ya no existe.
- La única que cae es `worn out` de A (n.º 8), y no por filtrar sino por forma.

Las 20 definiciones de `what it is` tampoco son decibles: son sintagmas de diccionario
(`the paper the shop gives you with the price`), no turnos.

## Las dos tablas `Facts` — 19 de 20 filas son notas

Se sale solo la fila 6 de arriba. El resto son fragmentos sin verbo conjugado o listas con `·`
(`rear tire worn out · seat torn on one corner · scratch on the frame`). Dos que se miraron
despacio y aguantan: la glosa entre paréntesis de B (`or ride it home on that tire (**to ride** =
to go on the bike, with your legs)`) es definición, no línea; y `the road bike: 750,000, you have
360,000` lleva un `you` que en boca de A no le cuadra a nadie.

## Al filo, señaladas y no contadas

Ninguna avanza un turno si se pronuncia, pero todas viven del mismo mecanismo de la §Revocación.
Si en la próxima pasada sobra margen, ánclense.

| dónde | literal | por qué no cuenta hoy |
|---|---|---|
| A · `You want` | `You have to get the bike out today…` | la mitad decible («tienes que sacar la bici hoy» funciona de A a B), pero la coordinada `and you want all of the money today` rompe la línea entera |
| A · `You can't` 1 | `A smaller number needs a condition…` | la oración sigue con `and you say the condition out loud`: leída entera suena a instrucción, no a turno |
| B · `You can't` 2 | `Moving the bike counts.` | sin deixis, pero dicha sola no le dice nada al otro: «¿cuenta para qué?» |
| B · `You can't` 3 | `After that, nothing moves.` | regla de juego; en la mesa no significa nada |
| B · vocab `lock`, `here` | `45,000 you can ask for, and it costs them nothing` | pronombre + verbo, pero no al principio de la celda; el `them` apunta a quien escucha |

## Lo que aguanta bien, y conviene no romper al arreglar

Las 66 unidades restantes de prosa están escritas sobre el jugador **con predicados que el otro no
puede sostener**, que es la protección de verdad: `The doorman told you twice`, `You carry it up
four floors again`, `You looked for three weeks and you saw four bikes`, `Only one was your size`.
Las instrucciones de pantalla (`Don't read from it.`, `Look at the rear tire for half a minute
before you say hello.`) y los códigos de la caja (`Yours: 1 [grants], 2, 3 [receives]…`) no son
turnos. Los seis criterios de `You did it if` de cada rol van en pasado y son metadatos del juego.

La pantalla compartida `Both screens — how it ends` sí imprime frases decibles —`That works for
me.`, `OK — deal.`, `Let's do that, then.`— pero bajo la etiqueta `When you agree, say it:`: es la
misma excepción que `Say it here`, no un defecto.

## Para el guardián — regla que falta en §11

La prueba del redactor está bien pero es incompleta. Añádase:

> La segunda persona **no** protege por sí sola. Antes de dar una línea por segura, pregúntate si
> el que escucha podría ser el sujeto de ese predicado. Precios, topes, plazos y obligaciones los
> tienen los dos: ahí el `you` aterriza en el otro y la línea se dice tal cual. Protege el verbo,
> no el pronombre — `you will not sell it`, `you cannot pay`, `you carry it up four floors`.

El molde `fase7-modelo-ficha-en.md` (línea 66) sigue con la oración completa en `here` que ya
señaló el hallazgo 25: mientras esté, el patrón vuelve en la ficha siguiente.
