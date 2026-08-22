# Fase 10 · Verificación tras la pasada quirúrgica — escenario 6, `the-cousin-on-the-sofa`

**Verificado:** `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` tal como está en disco
hoy (22 ago 2026), contra `artifacts/habla-a2/fase9-calcable-6.md`. Se hicieron dos cosas y solo dos:
(1) comprobar hallazgo por hallazgo, y (2) volver a pasar el cepillo entero por las dos fichas, línea
de prosa a línea de prosa y fila a fila, buscando decibles **nuevas**.

**Fuera de alcance, igual que en fase 9:** las dos tablas `Say it here` y el bloque final en español.
La carta sí se audita.

**Prueba única:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Contador canónico corrido hoy** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):
ROLE A **444**, ROLE B **448**, techo 450. Cumple, y con más margen que antes de la pasada.

---

## Veredicto

**PASA · 0 líneas decibles sobre 147 unidades (0,0 %) · 0 defectos de forma.**

Las 9 decibles y los 2 defectos de forma del informe anterior están **arreglados los once**. El
cepillo completo sobre las dos fichas no encuentra ninguna decible nueva. Quedan **5 líneas a un
cambio de fallar** (ninguna cuenta): 4 son las mismas de fase 9 y 1 es nueva por reformulación.

**La pasada quirúrgica se respetó.** El diff contra `HEAD` tiene exactamente 19 cambios y los 19
están declarados en la tabla del propio archivo: 9 de calcabilidad, 8 de nivel, 1 de `rationale` por
consecuencia y 1 de cifras. **No hay una sola línea tocada fuera de la lista.** El motor, la carta,
el cierre, los 20 datos, el orden de las tablas, los exponentes y el debrief están byte a byte como
estaban. Nadie volvió a reescribir.

---

## 1 · Hallazgo por hallazgo

| # | hallazgo de fase 9 | estado |
|---|---|---|
| 1 | A · `You can't` 2 — `You can't send him to a hostel or to a paid room.` | **arreglado** |
| 2 | A · `Only you know` 2 (GRAVE) — `The answer comes on the 26th, and after that day…` | **arreglado** |
| 3 | A · `If you walk away` — `Iván arrives on Thursday anyway — the ticket is bought…` | **arreglado** |
| 4 | A · `Only you know` 1 — `So tonight you are giving news, not asking for a favor.` | **arreglado** |
| 5 | B · `You can't` 1 — `It is the living room or nothing.` | **arreglado** |
| 6 | B · `You can't` 2 — `The visit is never the problem, y…` | **arreglado** |
| 7-8 | B · `Only you know` 3 (GRAVE) — las dos razones del salón en oración | **arreglado** |
| 9 | Carta — `Your old plan is gone: …` | **arreglado** |
| F1 | B · `here` de `a mattress` — `you can offer it too` | **arreglado** |
| F2 | B · `here` de `a hostel` — `the obvious cheap idea. Ask, don't assume` | **arreglado** |

Las líneas nuevas, literales:

1. `Your family would never accept a hostel or a paid room: for them it is an insult, and tonight your aunt will hear about it.`
   Dicha a Cris no aterriza: Cris no tiene ni esa familia ni esa tía. El rechazo ya no viene hecho.
2. `You know why Iván is coming: the notary, on Friday the 21st, for his mom's papers. You also know the answer comes on the 26th, so for you the nights that can go back are the last ones, never the first.`
   **Esta era la grave.** `You also know…` es imposible en boca de Dani hacia Cris —Cris no sabe
   nada de eso— y `for you` remata el anclaje. El argumento del 26 sigue estando entero, pero ahora
   hay que construirlo. Bien resuelto además el cambio de `lands` por `comes`: `to land` no es A2.
3. `You still have Iván on a bus on Thursday — he already has the ticket — and no plan for that night.`
   La mala noticia deja de estar escrita en la forma en que se dice. `You still have` es del que se
   queda con el problema; dicho al otro, no dice nada.
4. `So you come into this kitchen with news, not with a favor to ask.`
   `come into this kitchen` solo lo puede sostener quien entra: Cris ya está sentado ahí. La
   acusación que prohibía el criterio de A ya no se puede leer.
5. `You need that table or you lose the call.` — aplicada literal.
6. `You never make the visit the problem, and if you say no, you are the bad guy at breakfast.`
   La concesión de Cris (`The visit is never the problem.`) ya no está escrita para leerse.
7-8. `You know two things about that window: a weak signal, and, from the bars downstairs, a truck unloading at nine in the morning.`
   Las dos oraciones fundidas en una nota anclada en `You know`. Dicha a Dani es falsa —Dani no lo
   sabe— y por eso no avanza. `unload` sigue disponible como jerga de B.
9. `This card takes your old plan away: fewer nights, and everyone out before the 29th.`
   `This card` no existe dentro de la ficción. Aplicada literal.

Forma: `already in the house — your second bed to offer` y `the obvious cheap idea — to ask about,
never to assume`. Las dos son ya sintagma nominal + infinitivo: ni pronombre + verbo conjugado, ni
dos oraciones en una celda.

---

## 2 · El cepillo entero, otra vez

**Unidades contadas: las mismas 147** (86 de prosa + 61 de tabla). La pasada no añadió ni quitó
ninguna: mismos 3 puntos de `You can't` por rol, mismas 3 viñetas de `Only you know`, mismas 10
filas de datos por rol, 9 y 10 de vocabulario, 3 de la carta.

| bloque | unidades | decibles antes | decibles ahora |
|---|---|---|---|
| A · cabecera, `Where you are`, `You want` | 3 | 0 | 0 |
| A · `You can't` | 6 | 1 | **0** |
| A · `Only you know` | 7 | 2 | **0** |
| A · `If you walk away` | 3 | 1 | **0** |
| A · toolkit + criterios | 2 | 0 | 0 |
| B · cabecera, `Where you are`, `You want` | 3 | 0 | 0 |
| B · `You can't` | 9 | 2 | **0** |
| B · `Only you know` | 7 | 2 | **0** |
| B · `If you walk away` | 3 | 0 | 0 |
| B · toolkit + criterios | 2 | 0 | 0 |
| carta (prosa) | 6 | 1 | **0** |
| datos A (10) + datos B (10) | 20 | 0 | 0 |
| vocabulario A `here` (9) + `what it is` (9) | 18 | 0 | 0 |
| vocabulario B `here` (10) + `what it is` (10) | 20 | 0 + 2 de forma | **0 + 0** |
| filas de la carta (3) | 3 | 0 | 0 |
| **total** | **147** | **9 + 2** | **0 + 0** |

Lo que se revisó y sale limpio, por si sirve de rastro: las cuatro líneas de cabecera son metalengua
de preparación (`Your screen only`, `About 9 turns each`); las dos de `Where you are` nombran al otro
en tercera persona (`Cris is at the living room table, working.`, `Dani just got off the phone…`); las
dos de `You want` se protegen por el nombre (`you want Dani to sign the lease…`, tras el cambio de
nivel N7 sigue protegida); `You have one more option, and you should not offer it yet.` es
instrucción; `Dani does not know three things yet.` y `Dani thinks you work in your room.` van por
nombre; las 20 filas de datos siguen siendo 20 notas sin un solo verbo conjugado; la fila nueva de la
carta (`| Why | she wants to be here on Monday |`) es nota en tercera persona sobre la mamá.

**Una mejora colateral que conviene apuntar:** el cambio de nivel N2 en `If you walk away` de B
(`the living room is taken` → `Dani has the living room`) **subió** la protección de calcabilidad de
una línea que fase 9 tenía en la lista de borde. Ahora la primera cláusula va por nombre y no
depende de la segunda.

---

## 3 · A un cambio de fallar (no cuentan)

1. **NUEVA · B · `You can't` 2** — `…and if you say no, you are the bad guy at breakfast.` La
   cláusula suelta es más fluida que la que sustituye (`a no costs you the bad guy at breakfast`) y,
   dicha por Cris a Dani, sería una presión coherente. **No cuenta** porque la unidad empieza por
   `You can't say no to the visit.`, que es indecible y arrastra la cláusula. Es la única línea de
   toda la pasada que quedó un grado más cerca del borde que antes.
2. **B · `You can't` 1** — `You need that table or you lose the call.` La justificación de fase 9
   («Dani no tiene ninguna llamada») **es falsa**: Dani tiene que llamar a la tía esta noche. Lo que
   la salva es otra cosa —la llamada de Dani no necesita mesa, así que la línea dicha a Dani no
   avanza—. La línea se queda; el razonamiento con el que se aprobó, no.
3. **A · `You can't` 1** — `Outside the family you give the same version: ten days of vacation.`
   Heredada. Los dos puntos la salvan.
4. **A · `If you walk away`** — `Tomorrow you have breakfast here, with the same person.` Heredada.
   `the same person` es metalengua.
5. **B · `You can't` 1** — `From outside it only sounds like an excuse.` Heredada. No contesta nada.

**Dos celdas de `here` de B con pronombre + verbo dentro de un relativo** (`the cue you have to
catch`, `the last one you bring out`): siguen igual, no las tocó nadie y fase 9 tampoco las contó.
No son predicado autónomo ni entregan dato, así que no entran como defecto de forma. Se anotan para
el molde, no para esta ficha.

---

## 4 · Que no se reescribió nada

Diff contra `HEAD`, cambios de contenido, uno a uno: A `You can't` 2 y 3 · A `Only you know` 1 y 2 ·
A `If you walk away` · A vocabulario `to owe someone a favor` · B `You want` · B `You can't` 1, 2 y 3
· B `Only you know` 3 · B `If you walk away` · B vocabulario `to owe someone a favor`, `a mattress`,
`a hostel` · carta, fila `Why` · carta, línea de cierre · `rationale` de `prepositions-time` · tabla
de cifras de prosa. **Quince ediciones de ficha, todas en la lista de las dos auditorías; ninguna
fuera.**

Intactos y verificados: los 20 datos, el orden alfabético de los dos `Say it here`, las 17 filas de
exponentes, la ventana de la carta (turno global 6), los tres puntos del cierre, el ritual del
mensaje a la tía, las cuatro preguntas del debrief, los diez `grammarReferences` (salvo el paréntesis
que la corrección 11 dejó falso) y las dos líneas de toolkit.

Lo único añadido al documento es la sección **«Pasada quirúrgica del 22 ago 2026»**, que vive después
de `## Lo que no se aplicó` y por tanto **no entra en la cuenta de prosa** de ninguno de los dos
roles. Las cifras declaradas coinciden con el script.

---

## 5 · Lo que sigue pendiente (no es de esta lente)

A1, A2 y A3 del informe de nivel —el exponente `If…, I'm OK with it.`, el `rationale` de `imperative`
y las dos referencias que faltan— no se tocaron, a propósito y declarado. Desde calcabilidad no hay
nada que objetar: ninguno de los tres afecta a lo decible.
