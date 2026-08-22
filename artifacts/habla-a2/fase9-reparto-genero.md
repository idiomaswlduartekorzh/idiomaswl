# Fase 9 · Reparto de género y trabajo de cuidado — los OCHO escenarios de una vez

Auditoría de conjunto sobre los **16 roles jugables** del set de habla A2 en inglés. No es una
auditoría por escenario y no se puede hacer por escenario: cada ficha, leída sola, parece
equilibrada, y las dos correcciones anteriores se pasaron de frenada precisamente por eso.

**Contenido medido:** `fase7-modelo-ficha-en.md` (esc. 3, el molde), `fase7-fichas-1`, `-2`, `-5`,
`-6`, `-7`, `-8` y `fase8-fichas-4nuevo.md`. `fase7-fichas-4-a-charge-i-did-not-make.md` está
**retirado** y no cuenta.

**Herramienta:** `artifacts/habla-a2/fase9-scripts/reparto-genero.mjs`. La **estructura** —quién
manda en escena, quién decide desde fuera, quién gana, quién causa el problema, quién cuida de
alguien— es curada y no cambia porque cambie un nombre. El **género** se mide sobre el archivo:
nombre declarado en la banda del diseñador + léxico + recuento de pronombres por ficha. Se corre
así, y con `HABLA_DIR=<carpeta>` se puede correr sobre una copia:

```
node artifacts/habla-a2/fase9-scripts/reparto-genero.mjs
```

Los cambios se aplicaron con `fase9-scripts/aplicar-reparto.mjs` y `aplicar-reparto-8.mjs`, que
exigen que cada cadena aparezca **exactamente** el número de veces declarado y abortan sin escribir
si no. Ninguna sustitución fue a ciegas.

---

## 1 · La tabla de los 16 roles — ANTES

| esc | rol | nombre | género | manda en escena | decide desde fuera | gana | causa el problema | cuida de alguien |
|---|---|---|---|---|---|---|---|---|
| 1 | A · vende la bici | — sin nombre — | ? | **sí** | · | · | · | · |
| 1 | B · compra la bici | — sin nombre — | ? | · | · | · | · | · |
| 2 | A · mostrador de la clínica | — sin nombre — | ? | **sí** | · | · | · | **sí** |
| 2 | B · paciente con dolor | — sin nombre — | ? | · | · | · | · | · |
| 3 | A · pide cubrir el sábado | — sin nombre — | ? | · | · | · | **sí** | · |
| 3 | B · tiene el cierre | — sin nombre — | ? | · | · | · | · | · |
| 4 | A · la casa, el fuego, la olla | Fabián | H | **sí** | · | **sí** | · | **sí** |
| 4 | B · la moto sale a las 11:40 | Duván | H | · | · | · | **sí** | **sí** |
| 5 | A · auxiliar de bodega | Camilo | H | · | · | · | **sí** | **sí** |
| 5 | B · supervisora/or de la tienda | doña Amparo | M | **sí** | · | **sí** | · | · |
| 6 | A · llega el primo el jueves | Dani | N | · | · | · | **sí** | **sí** |
| 6 | B · el lunes en la sala | Cris | N | · | · | · | · | · |
| 7 | A · la reserva está a su nombre | Valentina | M | **sí** | · | **sí** | **sí** | · |
| 7 | B · dos cupos y plata ajena | Kevin | H | · | · | · | **sí** | · |
| 8 | A · se va del país y sigue pagando | Tatiana | M | · | · | · | · | · |
| 8 | B · mostrador del gimnasio | Milena | M | **sí** | · | **sí** | · | · |

| columna | hombres | mujeres | neutro/sin nombre | quiénes |
|---|---|---|---|---|
| MANDA EN ESCENA | 1 | 3 | 2 | — sin nombre —(?) · — sin nombre —(?) · Fabián(H) · doña Amparo(M) · Valentina(M) · Milena(M) |
| GANA | 1 | 3 | 0 | Fabián(H) · doña Amparo(M) · Valentina(M) · Milena(M) |
| CAUSA EL PROBLEMA | 3 | 1 | 2 | — sin nombre —(?) · Duván(H) · Camilo(H) · Dani(N) · Valentina(M) · Kevin(H) |
| CUIDA DE ALGUIEN | 3 | 0 | 2 | — sin nombre —(?) · Fabián(H) · Duván(H) · Camilo(H) · Dani(N) |

Roles jugables con nombre y con marca de género: 8 — 4 hombres / 4 mujeres
Roles neutros a propósito: Dani, Cris
Roles sin nombre (sin marca): 6

Parejas del mismo género (los dos jugables):
  esc 4: Fabián + Duván — los dos H
  esc 8: Tatiana + Milena — los dos M

| esc | fuera de escena | género | decide desde fuera | causa | cuida |
|---|---|---|---|---|---|
| 1 | the doorman | H | **sí** | · | · |
| 1 | brother-in-law (B) | H | · | **sí** | · |
| 2 | Dr. Restrepo | M | **sí** | · | **sí** |
| 3 | Nayibe | M | **sí** | · | · |
| 4 | Édgar — la moto (recurso) | H | · | · | · |
| 4 | Marcela — el carro que no vuelve (estorbo) | M | · | **sí** | · |
| 5 | el vecino/a del 3 | H | · | · | **sí** |
| 5 | Alba | M | · | · | · |
| 6 | Nelson | H | · | · | · |
| 7 | doña Nubia | M | **sí** | · | · |
| 7 | the building manager | H | **sí** | · | · |
| 8 | Édison | H | **sí** | · | · |
| 8 | Wilmer | H | · | **sí** | · |

| esc | ficha A: he/his/him · she/her | ficha B: he/his/him · she/her | el otro rol es |
|---|---|---|---|
| 1 | 0 · 0 | 0 · 0 | A→? / B→? |
| 2 | 0 · 3 | 0 · 0 | A→? / B→? |
| 3 | 0 · 1 | 0 · 0 | A→? / B→? |
| 4 | 10 · 0 | 15 · 1 | A→H / B→H |
| 5 | 6 · 11 | 25 · 1 | A→M / B→H |
| 6 | 15 · 3 | 2 · 1 | A→N / B→N |
| 7 | 16 · 0 | 0 · 9 | A→H / B→M |
| 8 | 2 · 7 | 3 · 36 | A→M / B→M |

### Lo que dice la tabla de antes

1. **Manda en escena: 1 hombre y 3 mujeres** de los cuatro escenarios con mando con nombre. Es el
   mismo 75 % que denunció la primera medición, con el signo cambiado. La segunda corrección cambió
   a Liliana por Camilo, que es **el subordinado**: el mando no se movió.
2. **Gana: 1 hombre y 3 mujeres.** Las mismas cuatro casillas.
3. **Causa el problema: 3 hombres** —Duván, Camilo, Kevin— y media mujer (Valentina hace la mitad
   del lío del escenario 7, y el propio debrief lo dice). Fuera de escena, quien causa es hombre en
   2 de 3: el cuñado y Wilmer, contra el carro de Marcela.
4. **Cuida: 3 hombres y ninguna mujer.** Fabián da de comer a doce, Duván lleva la comida a seis,
   Camilo hace el recorrido de la guardería y entrena a cuarenta niños, y el vecino del 3 recoge a
   sus dos hijos. **Ninguna de las cuatro mujeres con nombre cuida de nadie.**
5. **Dos parejas del mismo género**, y las dos dicen algo: los dos hombres están en el patio, con el
   fuego y la moto; las dos mujeres están en un mostrador. Cero parejas mixtas de esas dos.
6. **Fuera de escena de la nº 4:** el único hombre nombrado es el recurso (la moto de Édgar) y las
   dos mujeres nombradas son los dos estorbos (el carro de Marcela, la mamá que llega con cinco a la
   una sin traer nada). Estaba escrito como pendiente en la ficha y sin hacer.
7. **Lo que ya estaba bien y no se toca:** quien decide desde fuera está 3 y 3 (Dr. Restrepo, Nayibe
   y doña Nubia contra el portero, el administrador del edificio y Édison); los seis roles sin
   nombre no llevan marca de género en ninguna línea: en las fichas de los escenarios 1, 2 y 3 no
   hay un solo pronombre de tercera persona que sea el otro rol; y Dani y Cris son neutros a
   propósito, con cero concordancias sobre ellos en las dos fichas y en la carta.

---

## 2 · El reparto objetivo

No es 50/50 por decreto en cada columna: es que **ninguna columna quede concentrada** y que
**ningún papel —mandar, cuidar, fallar, ganar— sea de un solo género en el set**.

| columna | objetivo | por qué no es 50/50 exacto |
|---|---|---|
| manda en escena | 2 y 2 de los cuatro con nombre | los otros dos mandos del set —el mostrador de la clínica, quien vende la bici— no llevan nombre ni marca, y no hay que dárselo |
| gana | 2 y 2 | son las mismas cuatro casillas: quien manda, aquí, gana |
| causa el problema | ni un solo género en cero | tres causantes con nombre y dos géneros, con la mitad del lío del 7 en cada uno |
| cuida de alguien | ni un solo género en cero | el cuidado es lo que se corrigió mal dos veces: primero era todo de mujeres, después fue todo de hombres |
| decide desde fuera | 3 y 3 | ya estaba, no se toca |
| parejas del mismo género | cero, o una de cada | dos hombres en el patio y dos mujeres en el mostrador es un mensaje que ninguna ficha manda sola |
| roles con nombre | 4 y 4 | ya estaba, y hay que conservarlo mientras se mueve todo lo demás |

**Y una regla de coste**, que es la que evita la tercera pasada de frenada: se cambia primero el
**nombre** de un rol cuyo motor no dependa del género —barato, y en inglés casi no hay concordancia—
y solo después se toca **quién manda**, que obliga a rediseñar. Aquí no se rediseñó nada: el motor,
el poder, la carta, las salidas y el cierre de los ocho escenarios están intactos.

---

## 3 · La lista mínima de cambios

Cuatro cambios de nombre y las concordancias que arrastran. Nada más.

| # | ficha | línea / pieza | qué se cambia | qué columna mueve |
|---|---|---|---|---|
| 1 | `fase8-fichas-4nuevo.md` | banda del diseñador, `## ROLE B`, y las **10** terceras personas de la ficha de A (cabecera, restricciones 2 y 3, «lo que se pierde», 3 celdas de exponentes, lista de cierre, turno de la carta) | **`B = Duván` → `B = Astrid`**, y `he/his/him` → `she/her` | **CAUSA** 3-0 → 2-2 · **CUIDA** 3-0 → 2-1 · deshace la pareja de dos hombres |
| 2 | `fase7-fichas-8-…-gym…md` | nombre en las dos pantallas, carta, cierre y notas (34 apariciones) + los **4** `she` de la ficha de Tatiana que eran el mostrador + `what he doesn't` del punto 1 del cierre + 3 concordancias en español | **`B = Milena` → `B = Mauricio`** | **MANDA** 1-3 → 2-2 · **GANA** 1-3 → 2-2 · deshace la pareja de dos mujeres |
| 3 | `fase7-fichas-5-…-monday.md` | dato oculto 2 de A, fila `The neighbor in 3` de datos, glosa de `to pick up`, exponente `Then I pick up …` | **el vecino del 3 vuelve a ser vecina**, con sus dos niños (4 palabras) | **CUIDA** 2-1 → 2-2 contando fuera de escena; y el recorrido de la guardería deja de ser cosa de un solo género |
| 4 | `fase8-fichas-4nuevo.md` | datos de A, los dos relojes, dato oculto 1 de B, un exponente de B | **Édgar y Marcela se intercambian el vehículo**: la moto (recurso) es de ella, el carro que no vuelve (estorbo) es de él | fuera de escena de la nº 4: deja de ser «ellas estorban, él resuelve». Cierra un pendiente escrito en la propia ficha |

**Tres arreglos de coherencia que arrastran los cambios anteriores** (no mueven ninguna columna,
pero sin ellos el rol queda incoherente):

- `fase8-fichas-4nuevo.md`, dato oculto 1 de B: con el carro en manos de Édgar quedaban dos `he`
  seguidos con dueño distinto —«you haven't shown it to him» era Fabián—. Se reescribe:
  *«His eleven eleven message is on your phone, and you have not said a word about it.»* Es la única
  frase del set que cambia de forma, y cuesta **+1 palabra** de prosa: ROLE B pasa de 448 a **449**,
  dentro del techo de 450 de §11, medido con el contador canónico.
- `fase8-fichas-4nuevo.md`, dos de las cuatro reglas del cierre común llevaban género masculino
  genérico: *«Say his line for him… he says it again»* y *«Nobody nods his way through»*. Pasan a
  `the other one's line … they say it again` y `Nobody nods their way through`. Valen para las ocho
  parejas, y una de ellas juega con dos roles neutros.
- `fase7-fichas-8-…-gym…md`, tres concordancias en español que daban por hecho que **los dos** roles
  eran mujeres: «cuando **las dos** necesitan el mismo objeto, **cada una** lo lleva», «**ella** es
  la que tiene las dos vías», «es **ella** quien produce la palabra».

**Lo que se decidió NO cambiar, y por qué:**

- **El escenario 3 no se toca.** Es el molde del set y no hacía falta: sus dos roles no llevan marca
  de género y Nayibe, que decide desde fuera, es una de las tres mujeres que sostienen el 3-3 de esa
  columna.
- **Doña Amparo no se toca.** Girar el mando del escenario 5 en vez del 8 arreglaba las mismas dos
  columnas, pero dejaba a Camilo y a su jefe como una pareja de dos hombres y a Tatiana y Milena como
  una pareja de dos mujeres: cambiaba un sesgo de conjunto por otro.
- **Camilo no se toca.** Es la mitad buena de la corrección anterior: un padre haciendo el recorrido
  de la guardería a las 6:40 es exactamente lo que le faltaba al set.
- **Tatiana no se toca.** El desenlace `sin acuerdo` es del diseño, no del reparto.
- **La mamá de Fabián y las tres de la iglesia** siguen llegando a la una sin traer nada. Tocarlo es
  tocar la carta, que es motor.

---

## 4 · La tabla de los 16 roles — DESPUÉS

| esc | rol | nombre | género | manda en escena | decide desde fuera | gana | causa el problema | cuida de alguien |
|---|---|---|---|---|---|---|---|---|
| 1 | A · vende la bici | — sin nombre — | ? | **sí** | · | · | · | · |
| 1 | B · compra la bici | — sin nombre — | ? | · | · | · | · | · |
| 2 | A · mostrador de la clínica | — sin nombre — | ? | **sí** | · | · | · | **sí** |
| 2 | B · paciente con dolor | — sin nombre — | ? | · | · | · | · | · |
| 3 | A · pide cubrir el sábado | — sin nombre — | ? | · | · | · | **sí** | · |
| 3 | B · tiene el cierre | — sin nombre — | ? | · | · | · | · | · |
| 4 | A · la casa, el fuego, la olla | Fabián | H | **sí** | · | **sí** | · | **sí** |
| 4 | B · la moto sale a las 11:40 | Astrid | M | · | · | · | **sí** | **sí** |
| 5 | A · auxiliar de bodega | Camilo | H | · | · | · | **sí** | **sí** |
| 5 | B · supervisora/or de la tienda | doña Amparo | M | **sí** | · | **sí** | · | · |
| 6 | A · llega el primo el jueves | Dani | N | · | · | · | **sí** | **sí** |
| 6 | B · el lunes en la sala | Cris | N | · | · | · | · | · |
| 7 | A · la reserva está a su nombre | Valentina | M | **sí** | · | **sí** | **sí** | · |
| 7 | B · dos cupos y plata ajena | Kevin | H | · | · | · | **sí** | · |
| 8 | A · se va del país y sigue pagando | Tatiana | M | · | · | · | · | · |
| 8 | B · mostrador del gimnasio | Mauricio | H | **sí** | · | **sí** | · | · |

| columna | hombres | mujeres | neutro/sin nombre | quiénes |
|---|---|---|---|---|
| MANDA EN ESCENA | 2 | 2 | 2 | — sin nombre —(?) · — sin nombre —(?) · Fabián(H) · doña Amparo(M) · Valentina(M) · Mauricio(H) |
| GANA | 2 | 2 | 0 | Fabián(H) · doña Amparo(M) · Valentina(M) · Mauricio(H) |
| CAUSA EL PROBLEMA | 2 | 2 | 2 | — sin nombre —(?) · Astrid(M) · Camilo(H) · Dani(N) · Valentina(M) · Kevin(H) |
| CUIDA DE ALGUIEN | 2 | 1 | 2 | — sin nombre —(?) · Fabián(H) · Astrid(M) · Camilo(H) · Dani(N) |

Roles jugables con nombre y con marca de género: 8 — 4 hombres / 4 mujeres
Roles neutros a propósito: Dani, Cris
Roles sin nombre (sin marca): 6

Parejas del mismo género (los dos jugables):
  ninguna

| esc | fuera de escena | género | decide desde fuera | causa | cuida |
|---|---|---|---|---|---|
| 1 | the doorman | H | **sí** | · | · |
| 1 | brother-in-law (B) | H | · | **sí** | · |
| 2 | Dr. Restrepo | M | **sí** | · | **sí** |
| 3 | Nayibe | M | **sí** | · | · |
| 4 | Marcela — la moto (recurso) | M | · | · | · |
| 4 | Édgar — el carro que no vuelve (estorbo) | H | · | **sí** | · |
| 5 | el vecino/a del 3 | M | · | · | **sí** |
| 5 | Alba | M | · | · | · |
| 6 | Nelson | H | · | · | · |
| 7 | doña Nubia | M | **sí** | · | · |
| 7 | the building manager | H | **sí** | · | · |
| 8 | Édison | H | **sí** | · | · |
| 8 | Wilmer | H | · | **sí** | · |

| esc | ficha A: he/his/him · she/her | ficha B: he/his/him · she/her | el otro rol es |
|---|---|---|---|
| 1 | 0 · 0 | 0 · 0 | A→? / B→? |
| 2 | 0 · 3 | 0 · 0 | A→? / B→? |
| 3 | 0 · 1 | 0 · 0 | A→? / B→? |
| 4 | 0 · 10 | 15 · 0 | A→M / B→H |
| 5 | 0 · 17 | 25 · 1 | A→M / B→H |
| 6 | 15 · 3 | 2 · 1 | A→N / B→N |
| 7 | 16 · 0 | 0 · 9 | A→H / B→M |
| 8 | 7 · 2 | 3 · 36 | A→H / B→M |

### Antes y después, columna por columna

| columna | antes | después |
|---|---|---|
| MANDA EN ESCENA | 1 H / 3 M | **2 H / 2 M** |
| GANA | 1 H / 3 M | **2 H / 2 M** |
| CAUSA EL PROBLEMA | 3 H / 1 M | **2 H / 2 M** |
| CUIDA DE ALGUIEN (en escena) | 3 H / 0 M | **2 H / 1 M** |
| CUIDA DE ALGUIEN (con los de fuera) | 4 H / 1 M | **2 H / 3 M** |
| DECIDE DESDE FUERA | 3 H / 3 M | 3 H / 3 M (sin tocar) |
| roles con nombre | 4 H / 4 M | **4 H / 4 M** |
| parejas del mismo género | 2 (esc. 4 y esc. 8) | **ninguna** |
| roles neutros / sin marca | 2 neutros + 6 sin nombre | igual |

**La coherencia de pronombres, medida ficha por ficha.** En cada ficha la tercera persona es siempre
el otro rol, y ahí es donde un `she` olvidado deja el rol roto. Después de los cambios:
ficha A de la 4, **0** `he` y **10** `she`; ficha B de la 4, **15** `he` y **0** `she`; ficha A de la
5, **0** `he` y **17** `she`; ficha A de la 8, **7** `he` y **2** `she` —y esos dos son **Yurany**,
que no es el mostrador—; ficha B de la 8, **3** `he` (Wilmer y Édison) y **36** `she` (Tatiana), sin
tocar. Las tres fichas se releyeron enteras, de arriba abajo.

---

## 5 · El conjunto: qué se repite entre los ocho que ninguno enseña por separado

Lo que este set enseñaba, y ninguna ficha suya lo decía sola, es **una división del trabajo**: las
mujeres decidían y los hombres cargaban. Las cuatro mujeres con nombre mandaban, ganaban o
sostenían el reglamento —la supervisora, la de la reserva, la del mostrador— y ninguna de las cuatro
tenía a nadie a su cargo; los hombres con nombre llegaban tarde, debían plata, mandaban un mensaje
que no era verdad, y a la vez eran los únicos que cocinaban, llevaban comida y recogían niños. Eso
no es el sesgo clásico: es el sesgo clásico invertido dos veces, y llega al mismo sitio, porque el
alumno de Bucaramanga que juega los ocho escenarios seguidos sale con un mapa igual de rígido —solo
que del revés—. Se ve, además, en dos sitios que ninguna auditoría por ficha puede mirar: **las
únicas dos parejas del mismo género** ponían a los dos hombres en el patio, con el fuego, la moto y
la comida, y a las dos mujeres en un mostrador con un contrato de por medio; y **fuera de escena de
la nº 4**, las dos mujeres nombradas eran los dos estorbos y el único hombre nombrado era el único
recurso. Cuatro nombres lo arreglan sin tocar un solo motor, y el criterio para elegirlos fue el
coste: cambiar quién se llama cómo es barato y reversible; cambiar quién manda obliga a rediseñar el
escenario, y de eso ya se han hecho dos pasadas de más.

**Lo que queda anotado, y no se arregla con un nombre:**

1. **Tatiana es la única persona del set que sale con menos de lo que traía**, y ahora quien le dice
   que no es un hombre. El contrapeso existe —Kevin no consigue los dos cupos y quien se los niega es
   Valentina; Astrid saca concesiones de Fabián— pero es la casilla a vigilar si alguien vuelve a
   tocar el 7 o el 4.
2. **Los seis roles sin nombre.** Escenarios 1, 2 y 3: nadie lleva marca, y eso es una virtud del
   molde, no un descuido. Si alguien decide nombrarlos, la tabla de arriba se rompe entera y hay que
   volver a medirla antes de publicar.
3. **`fase8-escenario-4nuevo.md` y las cinco auditorías de fase 8 siguen diciendo *Duván*.** Lo mismo
   con las auditorías del 8 y *Milena*. Son registro de pasadas anteriores y no son la ficha, pero
   quien porte esto a `.ts` tiene que leer la ficha, no el diseño.
4. **Fuera de escena, quien causa un problema queda 3 hombres y 0 mujeres** —el cuñado sin camión,
   el carro de Édgar, Wilmer— justo por el cambio nº 4, que era el que había que hacer. No se
   compensa con un quinto cambio a propósito: convertir a la cuñada del escenario 1 en quien deja
   colgado a alguien es volver a poner a una mujer de estorbo, que es de lo que se venía. Y el
   recuento estricto engaña un poco: la mamá de Fabián con cinco personas a la una y Alba pidiendo
   las llaves son fricción femenina fuera de escena que esta tabla no cuenta como «causa».
5. **`the doorman`** (esc. 1) es la única palabra del set que trae el género pegado al oficio. Se
   deja: cambiarla obliga a una perífrasis peor de leer, y el rol no habla ni aparece.

---

## Archivos tocados

- `artifacts/habla-a2/fase8-fichas-4nuevo.md` — Duván → **Astrid**; Édgar ↔ Marcela; dato oculto 1
  de B; dos reglas del cierre sin género; prosa de ROLE B 448 → **449**; adenda al final.
- `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` — Milena → **Mauricio**; cuatro
  pronombres de la ficha de Tatiana; tres concordancias en español; adenda al final.
- `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` — el vecino del 3 → **la vecina del
  3**; adenda al final.
- **Sin tocar:** el molde (esc. 3) y las fichas 1, 2, 6 y 7.
