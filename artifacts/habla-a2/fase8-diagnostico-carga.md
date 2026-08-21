# Fase 8 — Diagnóstico de la puerta 5 (carga en palabras)

**Qué se pregunta:** por qué seis de siete escenarios salen por encima de 79/21 en reparto de
palabras, y si eso es defecto del escenario o artefacto de la simulación.

**Material leído:** los siete `fase7-simulacion-*.md` (las 35 conversaciones, recontadas palabra
a palabra con un script propio), las siete `fase7-fichas-*.md`, `fase7-modelo-ficha-en.md`,
`fase7-veredicto.md` y §6.5 de `docs/habla-acompanado-blueprint.md`.

**Aquí no se arregla nada.** Se mide, se atribuye y se dice a quién le toca.

---

## 0 · La causa, en una frase

Las siete cifras que tumbaron la puerta 5 **no son siete escenarios: son seis veces la misma
pareja** —«el callado»— más una séptima que es «el atajista» del escenario 6; y en esa pareja el
80/20 no es un resultado, es el enunciado, porque el perfil callado está definido en las siete
simulaciones como *«responde con una a tres palabras»*.

---

## 1 · De dónde salen las siete cifras

| cifra del informe | archivo | **qué pareja es** |
|---|---|---|
| 83/17 | `fase7-simulacion-1.md:656` | **4 · EL CALLADO** |
| 86/14 | `fase7-simulacion-2.md:737` | **4 · EL CALLADO** |
| 13/87 | `fase7-simulacion-4.md:833` | **4 · EL CALLADO** |
| 21/79 | `fase7-simulacion-5.md:1068` | **4 · EL CALLADO** |
| 61/39 | `fase7-simulacion-6.md:917` | **5 · EL ATAJISTA** |
| 16/84 | `fase7-simulacion-7.md:572` | **4 · EL CALLADO** |
| 11/89 | `fase7-simulacion-8.md:534` | **4 · EL CALLADO** |

Seis de las siete son la columna 4 de la tabla de medidas. Ninguna es un promedio del escenario.
Y en el escenario 7 **es la única cifra de palabras que el informe midió**: `Palabras dichas`
aparece una sola vez en las 750 líneas del archivo, y es la de la pareja callada. La puerta 5 se
dictó sobre 7 celdas de 35, elegidas —sin decirlo— entre las que no podían pasar.

---

## 2 · La matriz completa: las 35 conversaciones, recontadas

Recuento propio sobre las transcripciones (palabras dichas, descontando marcas `[F]` `[D]` `[L]`,
acotaciones y anotaciones del simulador). Formato: *el que más habla / el que menos*.

| escenario | 1 · sól+sól | 2 · sól+flojo | 3 · flojo+flojo | **4 · callado** | 5 · atajista |
|---|---|---|---|---|---|
| 1 · the-bike | 50/50 | 64/36 | 54/46 | **90/10** | 57/43 |
| 2 · no-appointment | 56/44 | 70/30 | 55/45 | **82/18** | 60/40 |
| 4 · a-charge | 60/40 | 68/32 | 61/39 | **86/14** | 54/46 |
| 5 · late-again | 59/41 | 65/35 | 53/47 | **79/21** | 67/33 |
| 6 · the-cousin | 51/49 | 55/45 | 55/45 | **72/28** | 54/46 |
| 7 · two-more-people | 62/38 | 64/36 | 52/48 | **84/16** | 51/49 |
| 8 · cancel-the-gym | 62/38 | 53/47 | 54/46 | **88/12** | 56/44 |

Leído por columnas, y no por filas, el set dice otra cosa:

- **Perfiles iguales (columnas 1 y 3): 14 celdas, 14 pasan.** El peor caso es 62/38, y son dos
  (7 y 8, por dos puntos). Con dos flojos, **las siete filas están entre 52/48 y 61/39**.
- **Atajista: 7 de 7 pasan** salvo el 67/33 del escenario 5.
- **Sólido+flojo: 5 de 7 fallan**, siempre por el mismo lado: el flojo.
- **Callado: 0 de 7 pasan**, y ninguno se acerca.

El desequilibrio no se reparte por escenarios. **Se reparte por columnas, es decir, por perfil.**

---

## 3 · La pareja 4 no puede pasar la puerta 5. Es aritmética

Las siete simulaciones definen el perfil igual (`fase7-simulacion-1.md:42`, `-2:36`, `-4:38`,
`-5:76`, `-6:54`, `-7:47`, `-8:49`):

> El **callado** responde con **una a tres palabras** \[y no inicia nada].

Lo que produjo, medido: **31 · 48 · 67 · 103 · 101 · 57 · 46 palabras**. En turnos: **2,4 · 2,9 ·
4,5 · 4,5 · 7,2 · 3,0 · 3,8 palabras por turno.** El simulador cumplió su propia consigna.

Los informes lo escriben con sus propias manos:

- `fase7-simulacion-1.md:404` — «A **242** · B **48**. **83 % / 17 %.** El reparto por turnos
  miente en un factor de cinco».
- `fase7-simulacion-2.md:456` — «A **268** · B **44**. **86 % / 14 %** … factor de seis».
- `fase7-simulacion-8.md:534` — «Tatiana produce **46 palabras en doce turnos**».

**Para que el callado llegase al 40 % con turnos alternos, su pareja tendría que quedarse por
debajo de 4,5 palabras por turno** —es decir, ser también monosilábica—. Con las fichas actuales,
que piden transmitir 10-11 filas de datos y 9-10 exponentes por rol, ese techo es inalcanzable.
La puerta 5, aplicada a la pareja 4, **es una condición vacía: ninguna ficha del mundo la pasa**.

Y §6.5 del blueprint no dice sobre qué pareja se mide:

> «**Carga** — ningún rol por debajo del 40 % de la conversación, medido en **palabras**, no en
> turnos. … Se cuenta sobre la simulación, no sobre el previsto.» (`docs/habla-acompanado-blueprint.md:136`)

«Sobre la simulación» son cinco simulaciones por escenario, y una de las cinco estipula el
desequilibrio en su enunciado. **La regla está mal escrita, no el escenario.**

---

## 4 · ¿Quién es el que habla? El patrón, y no es el que parece

No es siempre A, ni siempre B, ni siempre el que arranca, ni siempre el del dato oculto. El
80 % lo hace, en las siete, **el jugador que NO lleva el handicap**. Y el handicap se reparte con
un sesgo de casting que no está declarado en ninguna parte:

| escenario | rol que **pide** (`[asks]`) | a quién puso el simulador de **callado** | a quién de **flojo** |
|---|---|---|---|
| 1 | B (comprador) | **B** ✔ | **B** ✔ |
| 2 | B (paciente) | **B** ✔ | **B** ✔ |
| 4 | A (cliente) | **A** ✔ | **A** ✔ |
| 5 | A (Liliana, `[receives][grants]`) | A ✘ | A ✘ |
| 6 | A (Dani) | **A** ✔ | **A** ✔ |
| 7 | B (Kevin) | **Kevin** ✔ | **Kevin** ✔ |
| 8 | A (Tatiana) | **A** ✔ | B ✘ |

**En 6 de 7 el mudo es el que pide. En 5 de 7 el flojo también.** El rol que pide es, por
construcción del molde, el motor de la conversación: es el que abre, el que propone, el que
insiste. El simulador le puso la mordaza al motor siete veces seguidas, y midió que el coche no
anda.

**Y hay dos contraejemplos, que funcionan como experimento natural:**

- **Escenario 5**, único donde el callado NO es el que pide: **21 %**, el mejor de la columna
  (el resto va de 10 a 18).
- **Escenario 8**, único donde el flojo NO es el que pide: **47/53**, el mejor de su columna
  (el resto va de 30 a 45).

Dos puntos, los dos en la misma dirección. Cuando el handicap cae del lado que concede, el
reparto sube entre 4 y 12 puntos. **El escenario no cambió; cambió el reparto de papeles del
simulador.**

---

## 5 · ¿Tiene el callado algo que obtener? Sí. Y no le sirve de nada

La respuesta corta es que **sí, en las siete**: ninguna ficha tiene un rol que solo conceda. El
campo `You want` del rol silenciado, literal:

| escenario | rol callado | `You want` |
|---|---|---|
| 1 | B | «The bike — or a day and a time to pick it up. And who moves it, said out loud. Your limit: 350,000 in cash» |
| 2 | B | «To see the dentist **today**. If not: a day that works with your job, plus something for tonight» |
| 4 | A | «The 42,000 off this bill — **and** the reason it happened, in words you can repeat at home» |
| 5 | A | «No **written warning in your file** — and, if you can, **the second set of keys**» |
| 6 | A | «A bed for Iván, ten nights, no fight, and a plan for your aunt tonight» |
| 7 | B | «Sebastián and Andrea on the trip … a name and ID for doña Nubia. And **Tuesday the 25th** for the 100,000» |
| 8 | A | «Plan canceled today · no charge on September 5 · out of here in twenty minutes» |

Los siete objetivos exigen obtener algo del otro. **El problema no es que no tengan objetivo: es
que el objetivo se les cumple igual sin abrir la boca**, porque el que sabe se lo resuelve. Eso sí
es defecto de diseño, y está documentado en tres sitios distintos:

- `fase7-simulacion-6.md:568` — «**los criterios de éxito de A los cumple el jugador que menos
  inglés produjo de los diez**».
- `fase7-simulacion-7.md:582` — «**dos de los nueve exponentes de Kevin los produce Valentina** …
  El escenario sigue en pie con un jugador y medio».
- `fase7-simulacion-8.md:552` — «**La ficha de la callada contiene la solución del escenario y no
  hay ningún turno que la obligue a mirarla**».

Y el cierre compartido lo permite en 4 de 7. Solo tres escenarios reparten quién dice qué:

| escenario | ¿el cierre dice **quién** dice cada punto? |
|---|---|
| 1 | **No** — «Say the whole deal out loud, both of you» |
| 2 | Medio — solo el punto 3 («one of you reads it, the other says it from memory») |
| 4 | Medio — solo el número final (mostrador dicta, cliente repite) |
| 5 | **Sí** — Liliana repite la línea WHAT CHANGES; los dos dicen «This cost you ___» |
| 6 | Medio — «Dani says the message … Cris confirms it» |
| 7 | **Sí** — «Kevin says point 2, Valentina says points 1 and 3» (pero 2 de 3 son de ella) |
| 8 | **Sí** — «Tatiana says it, in her own words» + repite el número |

Y aun donde está repartido, **nada lo hace cumplir**. El caso lo escribe el propio informe 8
(`fase7-simulacion-8.md:532`): «**0 de 3 según la letra del cierre**, que exige que los diga
Tatiana. Milena dice los tres; Tatiana dice “yes” a dos de ellos» — y el escenario se cerró.

---

## 6 · ¿Es la ficha? No. Los presupuestos de decibles son simétricos

Contado sobre las 16 fichas (script propio sobre las secciones del molde):

| escenario | exponentes A/B | filas de datos A/B | vocabulario A/B | `Only you know` A/B | palabras de la tabla de datos A/B |
|---|---|---|---|---|---|
| molde (3) | 9 / 6 | 9 / 11 | 10 / 10 | 3 / 3 | 78 / 93 |
| 1 | **10 / 10** | 11 / 11 | 10 / 10 | 4 / 3 | 140 / 114 |
| 2 | **9 / 9** | 11 / 11 | 10 / 10 | 3 / 2 | 178 / 117 |
| 4 | **9 / 9** | 10 / 11 | 10 / 10 | 0 / 2 | **171 / 235** |
| 5 | **9 / 9** | 11 / 11 | 10 / 10 | 2 / 3 | 130 / 130 |
| 6 | **10 / 10** | 11 / 11 | 9 / 10 | 3 / 6 | 111 / 136 |
| 7 | **9 / 9** | 11 / 11 | 9 / 10 | 3 / 3 | 97 / 95 |
| 8 | **9 / 9** | 11 / 11 | 10 / 10 | 5 / 5 | **111 / 165** |

**Lo que hay que decir en voz alta está repartido al 50 %**: mismos exponentes, mismas filas de
datos, mismo vocabulario, en 7 de 7. Si las dos fichas piden decir lo mismo y la conversación sale
86/14, el desequilibrio **no lo trae la ficha**.

Lo que sí trae la ficha es un sesgo mucho más pequeño, y se ve **exactamente donde debe verse**:
en las parejas de perfiles iguales. El rol con más prosa de datos habla más:

- **4** (235 vs 171 palabras de datos) → 60/40 y 61/39 a favor del mostrador.
- **8** (165 vs 111) → 62/38 y 54/46 a favor de la recepcionista.
- **2** (178 vs 117, al revés) → 56/44 y 55/45 a favor del mostrador, que aquí es A.
- **7** (97 vs 95, empatado) → 62/38 igualmente, y este **no** lo explica la ficha: lo explica que
  Valentina tenga tres llamadas y dos puntos del cierre.

Ese sesgo vale entre 5 y 12 puntos. **No vale 70.**

---

## 7 · Las siete cifras ni siquiera son la misma medida

Tres metodologías distintas conviven en los siete archivos, y el informe de guardián las suma como
si fueran una:

1. **Palabras dichas, en bruto** — escenarios 4, 5, 6, 8.
2. **«Palabras propias»**, descontando las líneas leídas de la ficha — escenarios 1 y 2. El
   79/21 de `fase7-simulacion-1.md:217` dice literalmente «**Por palabras propias**», y su propia
   fila de abajo aclara: «B: 118 en total. **41 son líneas leídas** (35 %)». En bruto, esa misma
   conversación es **64/36 — y pasa la puerta**.
3. **Una sola pareja medida** — escenario 7, donde `Palabras dichas` aparece una vez en todo el
   archivo.

El 72/28 del escenario 6 (columna 4) tampoco es comparable con el 90/10 del 1: allí «el callado se
juega **leyendo cinco líneas**» (`fase7-simulacion-6.md:565`), y el 48 % de sus palabras están
impresas. Es el menos desequilibrado de la columna **porque el simulador le dejó leer**, no porque
el escenario 6 lo proteja.

---

## 8 · El caso que pasa (61/39): no es lo que parece

**61/39 es la pareja del ATAJISTA del escenario 6**, no un escenario que pase.
`fase7-simulacion-6.md:638`: 204 / 132 palabras, **15 turnos sobre 24, 4:05 sobre 8 minutos
(−49 %), cierre 2 de 3 con el tercer punto vetado**, y el diagnóstico termina con «**Y sigue
ganando**». Además **39 < 40: por la letra de §6.5, tampoco pasa.**

Lo que de verdad enseña cómo se arregla el resto está en otra columna: **la pareja flojo+flojo,
que pasa en 7 de 7** (52/48 a 61/39, mediana 54/46), y la sólido+sólido, que pasa en 7 de 7. Lo
que tienen y las otras no es una sola cosa: **los dos jugadores tienen el mismo presupuesto de
producción**. El reparto de palabras del set no mide el escenario; mide la distancia entre los dos
perfiles que se sentaron. Lo dice el propio informe 5, y es la frase más útil de las siete
simulaciones (`fase7-simulacion-5.md:1149`):

> «**La asimetría de palabras no la produce el motor, la produce tener enfrente a alguien
> competente.**»

El escenario 6 es, aun así, el menos desequilibrado del set en las cinco columnas (51/49 · 55/45 ·
55/45 · 72/28 · 54/46), y sí tiene dos rasgos propios: **el `Only you know` más cargado del lado
que concede** (6 viñetas contra 3) y **un cierre con tres puntos donde el punto 3 obliga a nombrar
lo que quedó abierto**. Eso reparte la iniciativa. Pero no es lo que produce el 61/39.

---

## 9 · Veredicto y reparto

**El defecto es de la simulación y de la regla, no de los escenarios ni de las fichas.** En
concreto, y por orden de peso:

| # | Hallazgo | Evidencia | A quién le toca |
|---|---|---|---|
| 1 | **La puerta 5 se midió sobre la pareja donde el desequilibrio es la consigna.** 6 de las 7 cifras son la columna «callado», definida como «una a tres palabras» | §1, §3 | **guardián** — el veredicto de la puerta 5 se dictó sobre un dato mal elegido. **La medida se rehace sin rehacer las simulaciones: las 35 celdas ya están escritas** |
| 2 | **§6.5 no dice sobre qué pareja se mide, y aplicada a la pareja 4 es insatisfacible** por aritmética | `blueprint:136`, §3 | **`habla-blueprint`** — nombrar la pareja (o las dos de perfiles iguales) y darle al callado un criterio propio, que no es «40 % de palabras» sino «¿produjo las piezas que solo él tiene?» |
| 3 | **Sesgo de casting no declarado:** en 6 de 7 el mudo es el rol que pide; en 5 de 7, el flojo también. Los dos contraejemplos suben el reparto 4-12 puntos | §4 | **`habla-simulador-parejas`** — alternar el lado que lleva el handicap y **declararlo en la cabecera de cada simulación** |
| 4 | **Tres metodologías de conteo distintas** (bruto · «palabras propias» · una sola pareja) sumadas como una | §7 | **`habla-simulador-parejas`** — contador único, y decir si lo leído cuenta |
| 5 | **El objetivo del rol callado se cumple sin que hable:** el cierre compartido no reparte quién dice qué en 4 de 7, y donde lo reparte nada lo hace cumplir | §5 | **`habla-escenarios`** — es real, es pequeño y es el único punto de diseño de este informe. El punto 8 del veredicto («el rol callado tiene que producir») **es correcto por casualidad**: se dedujo del dato malo |
| 6 | **Sesgo residual de ficha, 5-12 puntos:** el rol con más prosa de datos habla más (4, 8, 2) | §6 | **`habla-fichas-de-rol`** — igualar prosa de datos en 4 (235 vs 171) y 8 (165 vs 111). No es bloqueante |
| 7 | **Sólido+flojo falla en 5 de 7** con el flojo por debajo del 40 % | §2 | **abierto** — decidir si un A2 flojo debe alcanzar el 40 % frente a un sólido, o si eso es otra puerta |

**Lo que NO hay que tocar:** ninguna ficha por causa de la puerta 5, y ningún escenario por causa
de las siete cifras del informe. Los presupuestos de decibles ya están al 50 % (§6) y las catorce
conversaciones de perfiles iguales pasan las catorce (§2).
