# Fase 9 · ¿Se puede leer en voz alta? — escenario 2, `no-appointment-until-thursday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`, tal como está en
disco hoy (22 ago 2026), con la pasada del 21 y el reparto de género ya aplicados. Los informes de
fase 7 y 8 se leyeron solo para saber qué se dijo antes; nada se dio por bueno por venir de ahí.

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Fuera de alcance por diseño:** las dos tablas `Say it here` (son los exponentes) y el bloque final
en español. La carta de Dr. Restrepo se revisó igual —es tabla de tres filas— y sale limpia.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
ejecutado hoy): **ROLE A 449 · ROLE B 448**, tope 450. Cumple, con **1 y 2 palabras de margen**.
⚠️ El archivo declara otra cosa en dos sitios distintos: la tabla de la línea 250 dice `A 448 · B
447` y el punto 7 de la pasada del 21 dice `A 449 · B 447`. Ninguno de los dos coincide con el
contador único. Hay que corregir los dos números a 449/448.

---

## Veredicto

**PASA CON CAMBIOS · 3 líneas decibles sobre 90 unidades** (50 oraciones de prosa —25 por rol— +
40 filas de tabla: 10 de datos y 10 de vocabulario por rol; no cuentan las 18 filas de exponentes ni
las cabeceras de tabla). Se añade **1 fila más que incumple «tablas = notas»** sin ser decible: es la
gemela de la primera, en la ficha del otro rol.

Reparto: **2 en ROLE A, 1 en ROLE B**, y la grave está en el **bloque de vocabulario** — pero no en
la columna que §11 marca. La noticia de esta pasada es esa: **la columna `here` está limpia en las 20
celdas**, y la fuga salió por la columna de al lado, `what it is`, que nadie estaba mirando.

El patrón de las otras dos es el conocido: **oración en tercera persona sin deixis dentro de
`Only you know`**. Mientras la prosa dice *you / your*, el referente se rompe al pronunciarla y la
línea se protege sola; en cuanto una cláusula se queda sin ancla, se levanta entera.

---

## Las tres, literal, con reescritura

### 1 · GRAVE — ROLE A, vocabulario, fila `to cover`, columna `what it is`

> `| to cover | the plan pays, so you pay nothing | your best argument — here, and nowhere else |`

`the plan pays, so you pay nothing` es una **oración completa con dos verbos conjugados dentro de una
tabla**, donde §11 solo admite notas (`shift — the hours you work in one day`). Y es peor que un
formalismo: el `you` es genérico en la ficha, pero al pronunciarla **se convierte en el destinatario
correcto**. A se la dice a B palabra por palabra —«The plan pays, so you pay nothing»— y el turno
avanza: es exactamente la función `money` de su tabla de exponentes, el argumento que retiene al
paciente. La ficha le regala una segunda línea entera, fuera del sitio donde el estudiante sabe que
hay frases.

**Reescritura (misma definición en los dos roles, como el resto de la tabla compartida):**
`| to cover | when the plan pays and the patient pays nothing | … |`
Subordinada con `when`, igual que la fila `chipped` (`when a small piece of a tooth breaks`). No se
levanta como turno. **Coste de prosa: cero, es tabla.**

### 2 · MEDIA — ROLE B, vocabulario, fila `to cover`, columna `what it is`

> `| to cover | the plan pays, so you pay nothing | their word for your plan — ask where it works |`

Misma cadena, misma infracción de «tablas = notas». En boca de B se protege por accidente —su `you`
sería A—, por eso **no se cuenta como decible**, pero se corrige igual y con la misma frase: si las
dos fichas comparten definición, comparten el arreglo.

### 3 · MEDIA — ROLE A, `Only you know`, viñeta 1

> `You have a 5:20 today, and that patient has missed twice already.`

La primera mitad está anclada (`You have…`); la segunda se levanta sola como oración en tercera
persona: **«That patient has missed twice already.»** Es el dato oculto de A servido en forma de
línea, y es justo el que la restricción 2 le prohíbe decir y el criterio «nothing said about another
patient» castiga. El riesgo es real y barato de cerrar: el estudiante que quiere abrir esa puerta lee
la oración que tiene más cerca, y la que tiene más cerca es la prohibida.

**Reescritura:** `You have a 5:20 today, with a patient who missed twice already.`
(12 palabras contra 12 · **neutral**, que es lo que hay que ser con 1 de margen)

### 4 · MEDIA — ROLE B, `Only you know`, viñeta 1

> `You are not hiding it — the pain just matters more than the piece.`

`the pain just matters more than the piece` no tiene deixis y es pronunciable tal cual por un
paciente que explica por qué habló del dolor y no del diente. El turno avanza: da a A el motivo que
todavía no tiene.

**Reescritura:** `You are not hiding it — the pain worries you more than the piece.`
(8 palabras la cláusula contra 8 · **neutral**; el `you` la rompe si se pronuncia)

**Efecto sobre el techo: ninguno.** Las dos reescrituras de prosa son de coste cero y la del
vocabulario es tabla. ROLE A se queda en **449**, ROLE B en **448**. No hay que quitar ninguna pieza.

---

## La lupa sobre la columna `here` — limpia, las 20 celdas

Era el punto de riesgo declarado por §11 («la más calcable de la ficha entera»; en una ronda anterior
entregó el dato oculto ya hecho frase). **Hoy no cae ninguna, en ninguno de los dos roles.**

- Ninguna celda lleva nada entrecomillado ni en cursiva.
- Ninguna empieza por pronombre + verbo conjugado. Todas son sintagmas de propósito
  (`your only key to Centro`, `the reason for the ten minutes early`, `where the sharp edge cuts`) o
  instrucciones al jugador (`ask what it costs`, `find out which one`, `say it back with it`).
- Ninguna filtra el dato oculto convertido en frase. Las tres que pasan más cerca se quedan en
  función: A `opening` → `one only: Thursday, 7:00 a.m. · never promise a second one`;
  A `to be fully booked` → `your bad news, in three words`; B `chipped` → `your **back tooth**, in one
  word — the word they will give you`. Dicen **para qué sirve**, no **qué se dice**.
- La asimetría declarada se sostiene: las diez celdas `here` de B son receptivas (`their word for…`,
  `one of their words`, `ask…`), ninguna produce.

**Lo que sí hay que aprender de aquí:** la vigilancia estaba puesta en `here` y la única frase decible
del bloque salió por `what it is`. Nueve de las diez definiciones de cada rol son sintagmas de
diccionario (`a photo of the inside of a tooth`, `a big building where a company keeps the things it
sells`); la décima, `to cover`, es una oración. La próxima ficha se audita mirando **las dos
columnas**.

---

## Las tablas `Facts` — 20 de 20 filas son notas

Ninguna se levanta como turno: son listas con `·` sin verbo conjugado principal
(`full today and tomorrow · first opening: Thursday 10, 7:00 a.m.`, `warehouse in Girón · 7:00
a.m.–3:30 p.m., Monday to Friday · Saturdays off`). Las glosas incrustadas —`(= papers you fill in)`,
`(**to chew** = to break food with your teeth)`, `(= able to cut)`, `(**painkiller** = a pill for
pain)`— son definiciones entre paréntesis, no líneas.

**Observación de conjunto, no contada:** la tabla de A es impersonal (`something cold on the face`) y
la de B está en primera persona (`my lower back tooth`, `on my tongue when I talk`, `In my pocket`,
`My cell`). La primera persona en una tabla acerca la nota a la frase —`the edge sharp … on my tongue
when I talk` está a un `is` de ser decible, y `worse than yesterday` está a un `it's`—. Hoy aguanta
porque ninguna tiene verbo principal conjugado, pero es el margen más estrecho de la ficha y conviene
no gastarlo en la próxima corrección.

---

## Al filo, señaladas y no contadas

Oraciones sin deixis que **no** avanzan ningún turno: son metadatos del juego, narración de pantalla o
consecuencias. Pronunciarlas suena a leer la ficha, no a atender un mostrador.

| dónde | literal | por qué no cuenta |
|---|---|---|
| A · `Where you are` | `Somebody walks in with no appointment, a hand on the side of the face.` | narración de la escena sobre el propio interlocutor; dicha a B no es un turno |
| A · `Only you know` 3 | `Three chairs were empty this week…` | va cosida a `…and each one lands on you`; no se levanta sola |
| A · `Only you know` 2 | `That is your key.` | pronombre + cópula, el disparador que §11 nombra — pero es meta, y `your` lo ancla |
| A · toolkit | `at 4:20 p.m. it is **Good afternoon**` | es la sustitución declarada del bloque 1 de la caja (pendiente 1 del archivo): territorio de exponente |
| A · `Facts`, `For tonight` | `no chewing on that side` | nota en gerundio; el exponente `Don't chew on that side.` vive en su tabla |
| B · `You can't` 2 | `this is your only free afternoon` | pronombre + cópula, pero `your` lo rompe al pronunciarlo |
| B · toolkit | `the tooth is yours, nobody else can describe it` | instrucción de reparto de trabajo, no turno |
| B · vocab `branch`, `here` | `appointment and treatment can be in different ones` | dato, no forma; para preguntarlo hay que construir la pregunta |

---

## El resto de la prosa — por qué aguanta

Las 46 oraciones restantes están escritas sobre el jugador y el referente las rompe al pronunciarlas:
`You have no appointment to give` dicha a B significaría lo contrario de lo que pasa; `At closing the
administrator reads your calendar` haría de B el del calendario; `You left work in Girón at 3:30`
mandaría a A al almacén. Las instrucciones de pantalla (`Don't read from it.`), los códigos de la caja
(`**1** [grants], **2**, **3**…`) y los criterios de logro en pasado (`They said the day, time and
branch back to you`) no son turnos de conversación.

La pantalla común `Both screens — how it ends` está en tercera persona de instrucción —`The patient
says the day, the time and the branch`, `The front desk reads it back`— y no entrega ninguna forma:
es reparto de trabajo, no guion. La carta de Dr. Restrepo son tres filas de notas con una glosa
(`to **file the edge down** (= to make a sharp edge smooth)`); no hay frase decible en ella.

---

## Para quien aplique los cambios

1. Vocabulario `to cover`, **en las dos fichas** → `when the plan pays and the patient pays nothing`.
2. ROLE A, `Only you know` viñeta 1 → `You have a 5:20 today, with a patient who missed twice already.`
3. ROLE B, `Only you know` viñeta 1 → `You are not hiding it — the pain worries you more than the piece.`
4. Corregir las dos cifras de prosa declaradas (línea 250 y punto 7 de la pasada del 21) a
   **A 449 · B 448**, que es lo que da el contador canónico.

Los tres primeros son de coste cero en palabras. Después de aplicarlos hay que volver a correr
`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs` y comprobar que sigue en 449/448.
