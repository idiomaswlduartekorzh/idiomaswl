# Fase 12 · Los cambios de equidad, aplicados y releídos del disco

Aplica lo que `fase11-equidad.md` dejó redactado en los tres escenarios «PASA CON CAMBIOS» (2, 4 y
7) y resuelve el caso de `fase9-reparto-genero.md` §3, que declaraba aplicada una reescritura que no
estaba en la ficha.

**Cómo se verificó cada línea.** Ninguna sustitución fue a ciegas: se hicieron con asercion de
número exacto de apariciones (aborta sin escribir si no coincide), y después **se releyó el archivo
del disco** con `grep`/`sed` sobre las líneas tocadas. Las dos mediciones del set se corrieron antes
y después: `fase7-scripts/prosa-canonica.mjs` (techo de 450 palabras de prosa) y
`fase9-scripts/reparto-genero.mjs` (las columnas de reparto). El estado «antes» se reconstruyó
invirtiendo exactamente estas cinco sustituciones sobre una copia, no desde `HEAD` —el árbol tenía
trabajo sin commitear y medir contra `HEAD` habría mezclado cambios ajenos—.

---

## 0 · El caso serio: la reescritura declarada por `fase9` §3

**`fase11` tiene razón: la frase declarada NO está en la ficha.** Verificado sobre
`fase8-fichas-4nuevo.md`. La cadena *«His eleven eleven message is on your phone…»* aparece
**una sola vez en todo el archivo, en la línea 293**, que es la tabla de la bitácora del pie donde
se declara el cambio. En el cuerpo de ROLE B (líneas 116-119) no está.

Lo que sí hay en la ficha, dato oculto nº 1 de B:

> - You read Édgar's message at eleven eleven: no car back before four. You have not said a word about it.

**No se pegó la frase declarada, y este es el motivo.** Aplicarla literalmente habría hecho dos
daños: (a) borra el dato duro *«no car back before four»*, que es justamente el dato oculto —la
frase declarada no lo lleva—; y (b) abre la viñeta con un `His` sin dueño, cuando el único hombre al
que la ficha de Astrid trata de `he` en todas las demás líneas es Fabián, y ese mensaje es de
Édgar. Es decir: la frase declarada arregla un `him` creando otro, y de paso se lleva un dato.

El defecto real que `fase9` quería matar —dos terceras personas seguidas con dueño distinto— está en
la **segunda** viñeta, y es exactamente el que `fase11` §4b señala. Se arregla ahí, como pide
`fase11`, y la viñeta 1 se deja como está porque ya nombra a Édgar y no tiene pronombre ambiguo.

---

## 1 · Los cinco cambios, antes y después

### 1.1 · Escenario 2 · `fase7-fichas-2-no-appointment-until-thursday.md`, ROLE B

El único de los dieciséis bloques de pérdida que dejaba al jugador sin salida en el propio bloque.

**Antes**

> **If you walk away with nothing** · You go home with the pain, no date and nothing for tonight. And anywhere else you pay the whole treatment yourself: your plan works only here.

**Después**

> **If you walk away with nothing** · You go home with the pain and no date. Tonight you have your 70,000. Anywhere else you pay the whole treatment yourself: your plan works only here.

**Desviación declarada respecto de `fase11`, y por qué.** El texto que `fase11` redactó —*«…The
70,000 in your pocket is all you have for tonight, and anywhere else…»*— **se pasa del techo**: mide
**456** palabras de prosa en ROLE B, contra un techo de 450 medido con el contador canónico. Se
aplicó la misma corrección con la misma información —los 70.000 siguen en el bolsillo y siguen
sirviendo esta noche, y la sede del Centro se sigue sin destapar— en **449**. El dato ya estaba en
la tabla de la ficha (`| In my pocket | 70,000 pesos |`), así que el bloque no inventa nada.

Prosa ROLE B: **448 → 449**. ROLE A no se tocó (450).

### 1.2 · Escenario 4 · `fase8-fichas-4nuevo.md`, la carta de ROLE A

**Antes**

> | Coming at 1:00 | her, your aunt, three from the church |

**Después**

> | Coming at 1:00 | her, your uncle and aunt, and two from the church |

Siguen siendo cinco (`| At 1:00 | five more people |` no se toca), siguen sin traer nada, y el motor
de la carta —cinco personas más a la una, sin comida, ya en camino, y alguien en el portón— queda
intacto. `uncle` y `aunt` son A2 y no piden glosa; ninguna de las dos la tenía.

### 1.3 · Escenario 4 · `fase8-fichas-4nuevo.md`, dato oculto nº 2 de ROLE B

**Antes**

> - At ten you gave **him** a number for one o'clock. Today you know it is wrong.

**Después**

> - At ten you gave **Fabián** a number for one o'clock. Today you know it is wrong.

Una palabra por una palabra: la prosa de ROLE B no se mueve (**449 → 449**). El resto de la viñeta
—`He doesn't know`, `he thinks you stay`— ya no tiene competencia: el único nombre propio masculino
entre medias era Édgar, y ahora el referente está escrito.

### 1.4 · Escenario 7 · `fase7-fichas-7-two-more-people-for-the-trip.md`, ROLE B

Era el bloque más denso de las dieciséis fichas, y está en el rol que **abre** la conversación.

**Antes** (241 caracteres, cuatro oraciones, una hipótesis encadenada de dos pasos)

> **And a reason you can repeat** · Your twenty minutes with Andrea start now. If nobody goes, you tell her tonight, to her face. And the reason has to be yours: "Valentina said no" is not enough: then Andrea asks why, and she calls Valentina.

**Después** (140 caracteres)

> **And a reason you can repeat** · Andrea gets here in twenty minutes. If nobody goes, you tell her tonight, with your own reason — not with Valentina's.

Prosa ROLE B: **442 → 425**. Es el único rol del set que baja de verdad del techo, y era el que
tenía que bajar. Los tres datos que la ficha necesita siguen en su tabla: `| Andrea | at the parking
lot in 20 minutes · no ride there except yours |`.

### 1.5 · Escenario 7 · el vocabulario del que decide desde fuera

**Antes**

> | Who says yes | the building manager · no answer at night |
>
> | the building manager | the person who says yes or no about the building | why nothing closes tonight |

**Después**

> | Who says yes | the person in charge of the house · no answer at night |
>
> | the person in charge of the house | the one who says yes or no about the house | why nothing closes tonight |

La casa está en Mesa de los Santos: no hay *building*. De paso desaparece la definición circular
(`manager` … `about the building`). El motor no se mueve: lo único que el escenario necesita de esa
persona es que **no conteste de noche**, y la fila lo sigue diciendo.

**Observación que no se cambió, y hay que decirla.** La fila de debajo dice `her question to him
early tomorrow`, donde *her* es doña Nubia. En la banda del diseñador —que no va a pantalla— doña
Nubia es la **dueña de la casa**, así que «the person in charge of the house» y ella se rozan. En
pantalla no chocan: a doña Nubia solo se la nombra como quien cambia la lista del portón, nunca como
dueña, y el `him` sigue teniendo un solo destinatario posible. Se aplicó el texto de `fase11` tal
cual y se deja anotado por si la próxima pasada prefiere separarlos más.

---

## 2 · Las columnas de reparto: ninguna se movió

Corrido `fase9-scripts/reparto-genero.mjs` sobre el estado anterior (reconstruido) y sobre el
actual. **Las cuatro columnas dan idéntico:**

| columna | antes | después |
|---|---|---|
| MANDA EN ESCENA | 2 H / 2 M | 2 H / 2 M |
| GANA | 2 H / 2 M | 2 H / 2 M |
| CAUSA EL PROBLEMA | 2 H / 2 M | 2 H / 2 M |
| CUIDA DE ALGUIEN | 2 H / 1 M | 2 H / 1 M |
| DECIDE DESDE FUERA | 3 H / 3 M | 3 H / 3 M |
| parejas del mismo género | ninguna | ninguna |

Los dos cambios que podían moverlas y no lo hacen:

- **El tío de la carta (1.2)** entra fuera de escena, en un grupo sin nombre que ninguna columna
  cuenta —`fase9` solo mide a los personajes que la ficha declara en la banda del diseñador—. Lo que
  cambia es lo que `fase11` §4a pedía: el único colectivo del set puesto en ridículo deja de ser solo
  de mujeres.
- **`the person in charge of the house` (1.5)** conserva el género donde estaba: en inglés ninguna de
  las dos etiquetas lleva marca, y quien la lleva es el `him` de la fila siguiente, que no se tocó.
  Esa casilla sigue siendo el hombre que sostiene el 3-3 de DECIDE DESDE FUERA.

Recuentos de pronombres afectados, medidos: ficha B del 4, `he/his/him` **16 → 15** (el `him` que
pasó a *Fabián*); ficha B del 7, `she/her` **9 → 7** (se fueron `to her face` y `she calls
Valentina`). En las dos, la tercera persona sigue siendo siempre el otro rol.

---

## 3 · El techo de prosa, las dieciséis fichas

Antes: 16/16 dentro, media 446. Después: **16/16 dentro, media 445, peor 450.** Ninguna ficha se
pasó en ningún momento del proceso: el borrador de `fase11` para el escenario 2 sí lo hacía (456) y
por eso se adaptó, no se pegó.

| ficha | prosa A | prosa B (antes → después) |
|---|---|---|
| esc 2 | 450 | 448 → **449** |
| esc 4 | 445 | 449 → **449** |
| esc 7 | 449 | 442 → **425** |

Las otras cinco fichas no se abrieron.

---

## 4 · Lo que se corrigió del registro, no de las fichas

Dos sitios declaraban aplicada la reescritura de §3 que no está. Se les añadió una línea de
corrección apuntando aquí, para que la próxima pasada no vuelva a darla por hecha:

- `fase9-reparto-genero.md`, §3 y «Archivos tocados»
- `fase8-fichas-4nuevo.md`, tabla de la cuarta pasada (bitácora del pie, no va a pantalla)

---

## 5 · Lo que quedó sin hacer, y por qué

1. **La frase literal de `fase9` §3 no se pegó.** Motivo en §0: borra un dato duro y abre un `His`
   sin dueño. El defecto que perseguía queda cerrado por 1.3.
2. **`the building manager` sigue vivo en once artefactos de fases anteriores** —`fase4-fichas-7-8`,
   `fase6-fichas-7-8`, las simulaciones, las auditorías de nivel y naturalidad, y las dos filas de
   `fase9-reparto-genero.md`—. Son registro de pasadas anteriores, no la ficha, y `fase11` solo pedía
   la ficha. Quien porte esto a `.ts` tiene que leer la ficha.
3. **Los tres avisos de conjunto de `fase11`** —medir la pantalla completa y no solo la prosa; el
   jugador que nunca tiene margen; la familia que solo aparece cuando falla— no se tocan: ninguno era
   un cambio redactado, los tres piden un escenario nueve o un contador nuevo.
4. **El cruce mandar × causar** (`fase11`, punto 2 de «lo que las columnas no enseñan») sigue igual:
   corregirlo tocaba el motor del escenario 7, y el propio informe no lo pedía.
