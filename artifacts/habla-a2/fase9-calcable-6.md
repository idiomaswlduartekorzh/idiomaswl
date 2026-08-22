# Fase 9 · ¿Se puede leer en voz alta? — escenario 6, `the-cousin-on-the-sofa`

**Auditado:** `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` **tal como está en disco
hoy** (22 ago 2026), con la cuarta ronda y el reparto de género ya aplicados. `fase7-calcable-6.md`,
`fase7-simulacion-6.md`, `fase7-nivel-6.md`, `fase8-veredicto.md` y `fase8-equidad-en.md` se leyeron
solo para saber qué se dijo antes. **Nada se dio por bueno por venir de ahí**, y dos de sus
conclusiones se revocan (§Revocaciones).

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases. Columna `here` → nota de propósito, sin comillas y sin pronombre +
  verbo conjugado.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
- Criterio de deixis (heredado de `fase9-calcable-1.md`): **el «you» protege solo cuando el que
  escucha no puede sostener el predicado.** Si el otro jugador también tiene interviú, plan, noches
  o señal, el «you» aterriza en él sin romperse y la línea es decible.

**Fuera de alcance por diseño:** las dos tablas `Say it here` y el bloque final en español. La
**carta** sí se audita: es pantalla de B y forma parte de su material.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy): ROLE A **449**, ROLE B **446**, tope 450. Cumple. Las reescrituras de abajo dejan
**A en 449** (aritmética neta cero) y **B en 447**: no hay que quitar ninguna pieza.

---

## Veredicto

**NO PASA · 9 líneas decibles sobre 147 unidades (6,1 %)**, más **2 defectos de forma** en la
columna `here` de B. Reparto: **ROLE A 4 · ROLE B 4 · carta de B 1**.

Unidades: 86 de prosa (40 por rol —cabecera, cinco bloques, toolkit y criterios— + 6 de la carta) y
61 de tabla (10 filas de datos por rol, 9 filas × 2 columnas en el vocabulario de A, 10 × 2 en el de
B, 3 filas de la carta).

| bloque | unidades | decibles |
|---|---|---|
| A · `Only you know` | 7 | **2** |
| A · `You can't` | 6 | 1 |
| A · `If you walk away with nothing` | 3 | 1 |
| B · `You can't` | 9 | 2 |
| B · `Only you know` | 7 | **2** |
| carta (prosa) | 6 | 1 |
| A · vocabulario `here` (9) | 9 | 0 |
| B · vocabulario `here` (10) | 10 | 0 decibles + **2 de forma** |
| datos A + datos B + resto (90) | 90 | 0 |

**Se cae por dos sitios, y los dos son entrega de dato oculto en frase pronunciable:** el número 2
(A entrega en oración el argumento del 26, que es lo único que le devuelve las últimas noches) y
los números 7-8 (B tiene sus **tres razones del salón** escritas como oraciones enteras, cuando su
propio criterio de éxito dice «the living-room reason only **when they asked**»). B puede leer su
`Only you know` en voz alta y cumplir el criterio sin producir nada.

Lo demás es de línea. **El motor no se toca**: ni la carta de turno 6, ni el desenlace, ni los tres
puntos del cierre, ni un solo dato.

---

## La columna `here` con lupa

**A: limpia, 9 de 9.** Ninguna celda tiene pronombre + verbo conjugado, ninguna entrega frase. El
patrón que funciona es el de `a mattress` → `your second way out — a bedroom floor, not the couch`:
dice para qué sirve sin decir con qué palabras se dice. **La entrega de dato oculto convertido en
frase que hubo en rondas anteriores no está.**

**B: dos defectos de forma, ninguno decible.**

1. `a mattress` → `already in the house — you can offer it too`. Contiene `you can offer it too`:
   pronombre + modal + verbo, que es literalmente lo que §11 manda reescribir.
   **Reescritura:** `already in the house — your second bed to offer`.
2. `a hostel` → `the obvious cheap idea. Ask, don't assume`. Dos oraciones y un punto dentro de una
   celda; la segunda es un imperativo entero.
   **Reescritura:** `the obvious cheap idea — to ask about, never to assume`.

Ninguna de las dos cabe en el recuento de decibles (dichas en voz alta no avanzan turno), pero las
dos incumplen la letra de §11 en la columna más calcable del formato.

---

## Las nueve, literal, con reescritura

### 1 · ROLE A · `You can't`, restricción 2

> `You can't send him to a hostel or to a paid room.`

Dicha a Cris **funciona entera**, y funciona justo cuando hace falta: el vocabulario de B marca
`a hostel` como «the obvious cheap idea», o sea que Cris va a proponerlo. En ese turno, Dani lee la
línea tal cual y es un rechazo perfecto, coherente y que avanza. El «you» aterriza en el otro
porque el otro sí puede mandar a alguien a un hostal.

**Reescritura (fusiona con la oración siguiente, −2 palabras):**
`Your family would never accept a hostel or a paid room: for them it is an insult, and tonight your aunt will hear about it.`

### 2 · GRAVE — ROLE A · `Only you know`, viñeta 2

> `The answer comes on the 26th, and after that day he does not need a bed here.`

Tercera persona pura, sin un solo anclaje. Es **el argumento que el escenario existe para producir**
—por qué las noches que se devuelven son las últimas— y está escrito como oración lista para
pronunciar. La fila de datos equivalente sí está bien hecha (`Friday the 21st | the notary, morning ·
his mom's papers · the answer: Wednesday the 26th`): la prosa la deshace.

**Reescritura (absorbe también la viñeta siguiente, −6 palabras):**
`You also know the answer lands on the 26th, so for you the nights that can go back are the last ones, never the first.`

### 3 · ROLE A · `If you walk away with nothing`

> `Iván arrives on Thursday anyway — the ticket is bought — and nobody agreed where he sleeps.`

`Iván arrives on Thursday — the ticket is bought` es **la mala noticia del escenario**, entera y en
voz alta. Los `grammarReferences` dicen que esa noticia debe salir como `He's coming on…`; la ficha
la regala hecha catorce líneas antes.

**Reescritura (+5):**
`You still have Iván on a bus on Thursday — the ticket is bought — and no agreement about where he sleeps.`

### 4 · ROLE A · `Only you know`, viñeta 1

> `So tonight you are giving news, not asking for a favor.`

Cris **también** da noticias esta noche (la entrevista, el pasaje de la mamá). El predicado lo
sostiene el que escucha, así que la línea dicha a Cris es una acusación coherente que avanza turno
— y es exactamente la que el criterio de A prohíbe: «you never said the problem is them».

**Reescritura (+3):** `So you come into this kitchen with news, not with a favor to ask.`

*(Aritmética de A: −2 −6 +5 +3 = **0**. A se queda en 449.)*

### 5 · ROLE B · `You can't`, restricción 1

> `It is the living room or nothing.`

Coherente, cortísima y de rendimiento máximo: dicha a Dani es la línea dura de Cris y cierra el
turno. No hay nada que la ancle.

**Reescritura (+2):** `You need that table or you lose the call.`
*(`you lose the call` es imposible en boca de Dani, que no tiene ninguna llamada.)*

### 6 · ROLE B · `You can't`, restricción 2

> `The visit is never the problem, and a no costs you the bad guy at breakfast.`

`The visit is never the problem.` es la concesión con la que Cris tiene que abrir todo su lado, y
está escrita para leerse. Tercera persona, sin deixis, y el criterio de B la pide literalmente
(«never a no to the visit»).

**Reescritura (+2):**
`You never make the visit the problem, and a no leaves you as the bad guy at breakfast.`

### 7 y 8 · GRAVE — ROLE B · `Only you know`, viñeta 3

> `The wifi is weak by the window.`
> `The street under it is full of bars, and at nine in the morning they unload a truck there.`

**Dos oraciones enteras, seguidas, y son las dos razones que el criterio de éxito de B condiciona a
que se las pregunten.** Se leen de corrido y el turno avanza. Que estén *descalcadas* del exponente
`The wifi drops next to the window.` no las protege: no ser la frase de la tabla no es lo mismo que
no ser decible.

**Reescritura (las dos en una, −3 palabras):**
`You know two things about that window: a weak signal, and, from the bars downstairs, a truck unloading at nine in the morning.`

*(Aritmética de B: +2 +2 −3 = **+1**. B queda en 447.)*

### 9 · Carta — pantalla de B

> `Your old plan is gone: fewer nights, and everyone out before the 29th.`

Después de abrir la carta, `Your old plan is gone.` dicho a Dani es coherente, duro y avanza: el
pasaje de la mamá también mata el plan de Dani. La carta no cuenta para la cuenta de prosa, pero es
la línea que el jugador tiene delante en el turno más caliente.

**Reescritura:** `This card takes your old plan away: fewer nights, and everyone out before the 29th.`
*(«This card» no se puede pronunciar dentro de la ficción.)*

---

## A un cambio de fallar (no cuentan, pero conviene saberlas)

1. **A · `You can't` 1** — `Outside the family you give the same version: ten days of vacation.` Los
   dos puntos la salvan; sin ellos es un encargo perfectamente decible a Cris.
2. **A · `If you walk away`** — `Tomorrow you have breakfast here, with the same person.` Aterriza
   en Cris y suena a recordatorio real; no avanza porque `the same person` es meta.
3. **B · `You can't` 1** — `From outside it only sounds like an excuse.` El arreglo de la ronda
   anterior (añadir `From outside it only`) **funcionó**: dicha a Dani es un comentario que no
   contesta nada y no avanza turno. Se queda, y de paso paga una palabra si hace falta presupuesto.
4. **B · `If you walk away`** — `On Monday the 24th the living room is taken and your video call is
   gone.` La segunda cláusula ancla la primera; sola, la primera sería decible.

---

## Revocaciones

1. **`fase7-calcable-6.md` cerró con «PASA CON CAMBIOS · 1 falla sobre 98 (1,0 %)»** y con la frase
   «esta ronda no encontró ni una falla nueva». Sobre el texto de hoy hay **9**, y **seis de las
   nueve son de secciones que la ronda 4 reescribió a oración completa** al aplicar la corrección de
   «la prosa vuelve a ser prosa». No es un retroceso del auditor: es que pasar los cinco bloques de
   telegrama a oración **fabricó decibles**, que es el riesgo que la propia corrección abría. La
   regla de proceso sigue siendo la correcta (calcabilidad la última), pero **no se volvió a correr
   después de la cuarta ronda**.
2. **Hallazgo 39, citado en «Lo que no se aplicó»** («los dos `by` locativos están bien y la
   diferencia con el exponente es deliberada»). El razonamiento es válido para el calco *del
   exponente* y no dice nada sobre calcabilidad: `The wifi is weak by the window.` es decible por sí
   sola. La decisión de no uniformar `by` / `next to` se mantiene; lo que se cae es usarla como
   prueba de que esa línea está a salvo.

---

## Lo que está bien y no hay que tocar

- **Las 20 filas de datos**: veinte notas, cero oraciones. Incluidas las dos que cargan con lo más
  peligroso del escenario (`Friday the 21st` en A, `Your interview` en B).
- **Los nueve `here` de A**, y ocho de los diez de B.
- **El anclaje por nombre**: `Cris is at the living room table, working.`, `Dani just got off the
  phone…`, `Dani thinks you work in your room.` Nombrar al otro en tercera persona es la protección
  más barata del formato y aquí está bien usada.
- **`You want` de B**: `…and Dani's signature on the lease before September 1` se protege sola por
  el nombre, justo donde el escenario 1 se cayó con `Your limit is…`.
