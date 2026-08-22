# Escenario 5 · `late-again-on-monday` — calibrador de NIVEL (fase 9)

Auditado hoy, 22 ago 2026, sobre el texto que iría a producción:
`artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` (con el arreglo del quinto secreto,
Camilo en masculino y la vecina del 3 ya revertida). Contra §4, §7 y §11 de
`docs/habla-acompanado-blueprint.md`, `src/data/grammar/registry.ts` y
`src/data/grammar/ingles/{a1,a2}` slug a slug, y `fase7-scripts/prosa-canonica.mjs` para el
presupuesto. Los informes viejos (`fase7-nivel-5.md`) se usaron solo para saber qué se dijo
antes: ninguno de sus hallazgos se dio por vigente y G-2 ya no existe (la frase que lo motivaba
salió con el cambio de secreto).

## Veredicto: **CABE CON CAMBIOS**

La lengua es A2 en las dos mitades —lo hablado y lo leído— y los actos declarados son de la fila
A2. Lo que no cabe es **el tamaño**: la ficha declara 16-23 turnos por rol y 9-10 minutos, y eso
no pertenece a **ninguna fila de §4** (A2: 6-9 turnos / 5-8 min; B1: 8-12 / 6-9). Si no se
recorta la carga del cierre, el veredicto es NO CABE. El recorte está nombrado abajo y es de
cierre y criterios, nunca del motor.

---

## 1. Bandas declaradas — bloqueante

Declarado y **coherente en los tres sitios**, con la misma unidad (turnos **por rol**):
cabecera del documento (línea 9), ROLE A (línea 25) y ROLE B (línea 107): `16-23 turns each ·
9-10 minutes`. Ahí no hay nada que arreglar: el problema es el número.

**La ruta mínima sí se puede escribir con lengua A2** —abrir, disculpa + causa con horas,
qué pide, la contraoferta, el no al sábado, la tercera puerta, el renglón, el papel, la firma— y
cierra en **8 turnos por rol**. Pero solo si cada turno lleva 3-4 oraciones, que es justo lo que
un A2 no produce: la simulación de las cinco parejas midió mediana **19 por rol**. O sea, la
lengua es A2 y la **carga** es B1. Lo que empuja los turnos es el cierre, no el inglés.

**Recortes para que 6-9 turnos/rol y ≤8 min sean verdad** (cinco, y ninguno toca conflicto,
asimetría, carta ni desenlace):

1. **Sale la pregunta extra del punto 3 del cierre**: `"And who else pays for this?" — con un
   nombre`. Es *resumir el acuerdo* + *insistir*, fila B1, y cuesta 2-4 turnos.
2. **Sale el espejo doble de precio**: cada uno dice su precio una vez; se cae el turno de
   «el otro dice que sí o lo corrige».
3. **Sale el párrafo `And to really finish`**: la relectura en voz alta del renglón y
   `Tell me again: who takes Matías, and what time do you get here?` son *resumir el acuerdo*
   (B1) y cuestan 4 turnos. Se queda la firma, que no cuesta ninguno.
4. **Tres papeles → dos** (warning en su archivo · commitment sheet). El `store folder` solo
   existe para alargar la negociación del papel.
5. **`You did it if` de 7 a 5 por rol.** Cada criterio es un turno obligado. En A se quedan 1,
   2, 4 y 5 más el de coste; en B, 1, 2, 4 y 5.

Y en datos (§7) `minutes` y `turnsTarget` son **números, no bandas**: con lo anterior,
`minutes: 8`, `turnsTarget: 9`.

Presupuesto de prosa, corrido hoy con el contador canónico: **A 448 · B 439**, dentro de 450.
Coincide con la tabla de la ficha. Los recortes de arriba solo quitan prosa: dan aire, no lo quitan.

## 2. Lo que hay que DECIR — 18 exponentes, dos fuera

Cero ocurrencias en la tabla de exponentes de: present perfect de duración con `for`/`since`,
`could` de cortesía, pasiva, pregunta incrustada, modal + infinitivo perfecto, condicional
hipotético, `would rather` / `would prefer`. Buscado por patrón, no a ojo.

- **SALE** · B, fila `putting the two things on the desk`: `This line is for you to…`.
  `for` + objeto + infinitivo no es A2 y no tiene tema en el registro.
  **ENTRA**: `You fill out this line, not me.` (presente simple) o `Fill out this line, please.`
  (imperativo, ya citado en las referencias).
- **REVISAR** · B, fila `trying another way`: `What if we…?` es una fórmula sin ningún tema de
  A1/A2 que la sostenga. Si se conserva, se conserva **como chunk**, y conviene el par anclado
  `Maybe we can…` (can-ability, ya citado).
- **SIN ANCLAJE, pero dentro de nivel** · A, `I'd like that job.` El registro no tiene tema de
  `would like`: solo un párrafo dentro de `like-ing` (A1), cuyo título —«Like + -ing»— mandaría
  a la estudiante a otra cosa. Se queda como fórmula y **no se cita**.
- Limpio y anclado: `used to` con contraste, `past simple` regular con fecha, `have to` en las
  dos bocas, `can` de oferta y de permiso, `will` con día de comienzo, primer condicional con
  presente en la cláusula `if`, comparativo `better`, imperativo, presente simple de coste,
  `That helps, but I need…`. El par `can` → `will` mantiene **la misma hora** en las dos mitades
  (`five to seven`), que es lo que pedía el mecanismo.

## 3. Lo que hay que LEER — cinco líneas fuera de A2 leído

1. A · `If you walk away with nothing`: `…and so do the keys.` → inversión con `so` + auxiliar,
   B1. **Versión corta**: `…and the keys go too.`
2. A · `You can't` 1: `You don't want the store deciding what those hours are worth.` → gerundio
   con sujeto + pregunta incrustada + `be worth`. Y en la misma línea, `your Saturday mornings
   are taken` es pasiva. **Versión corta**: `You can't say why your Saturday mornings are busy.
   The store does not need to know. Say no to the day, and nothing else.`
3. A · `You can't` 3: `she needs to hear what changes, and how.` → elíptico, no se reconstruye en
   L2. **Versión corta**: `she needs to hear what will change, and how it will work.`
4. B · `You can't` 2: `the other four would see it.` → condicional hipotético, que la propia
   cabecera de la ficha declara fuera. **Versión corta**: `the other four will see it.`
5. B · `You did it if` 6: `If it cost you nothing, say why.` → se lee como segundo condicional.
   **Versión corta**: `If it costs you nothing, say why.`

Menores, del mismo tipo: B · `Only you know` dice `Nobody pays those two nights.` sin la
preposición que sí lleva el exponente (`Nobody pays me for those two nights.`); y el cierre
compartido dice `what happens next Monday at seven`, que además contradice la hora pactada
(`five to seven`, 6:55) → `what happens next Monday before seven`.

## 4. Vocabulario — 10 (A) y 9 (B), y solo dos celdas que tocar

Una entrada por fila ✔ · definición en una línea ✔ · las 19 definiciones son inglés más simple
que la palabra que definen ✔ (comprobadas una a una: `a set of keys`, `a written warning`,
`commitment sheet`, `daycare`, `delivery note`, `road work`, `to fill out`, `to pick up`,
`warehouse`, `your file`, `incident form`, `review date`, `store folder`, `training`). La
definición de `review date` ya no lleva pregunta incrustada: es pregunta directa, y eso sí es A2.

Lo único fuera de nivel está en la columna `here`, y es pasiva en las dos:

- A · `delivery note`: `signed by the person who opens the store` → **`the person who opens the
  store signs it`**.
- B · `delivery note`: `the boxes are checked with it · two people, always` → **`two people check
  the boxes with it · always`**.

## 5. Anclajes — los 10 existen, con el `level` correcto

Comprobado contra `getTopicBySlug('ingles', level, slug)`, slug a slug, y título carácter a
carácter:

| slug | level | existe | título coincide |
|---|---|---|---|
| `used-to-a2` | a2 | sí (`a2/used-to.ts`) · `used-to` → null | sí |
| `first-conditional` | a2 | sí | sí |
| `have-to-must` | a2 | sí | sí |
| `past-simple-regular` | a2 | sí | sí |
| `will-future` | a2 | sí | sí |
| `connectors-a2` | a2 | sí (`a2/connectors.ts`) · `connectors` → null | sí |
| `comparatives` | a2 | sí | sí |
| `imperative` | a1 | sí · no existe en a2 | sí |
| `can-ability` | a1 | sí · no existe en a2 | sí |
| `telling-time` | a1 | sí · no existe en a2 | sí |

**Un `rationale` dice algo que el tema no dice.** `first-conditional`: «*can* de permiso en el
resultado, **que es la forma que el tema enseña**». El tema enseña `will` en el resultado
(`formula`, `table`) y solo menciona `can/must/have to` **en la cláusula `if`**
(`guide.decisions[4]`); además marca con ❌ el resultado sin `will`. El `can` del resultado ya
está anclado en `can-ability`: hay que quitar esa media frase.

**Faltan dos temas que los exponentes sí ejercitan.** Al quitar `past-simple-questions` (bien
quitado: `What happened this morning?` es pregunta de sujeto) la formación de preguntas se quedó
sin ningún ancla, y el escenario abre con dos preguntas obligatorias por rol.

```ts
  { slug: 'wh-questions', level: 'a1', title: 'Preguntas con WH en inglés A1',
    rationale: 'Las dos aperturas obligatorias son preguntas WH y sin ellas no arranca nada: "What happened this morning?" de ella, "What are the keys for, doña Amparo?" y "Which paper is that, and who…?" de él. Es el único tema que ancla la formación de la pregunta abierta.' },
  { slug: 'prepositions-time', level: 'a1', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Cuatro exponentes son huecos de at/on/from y el cierre entero se dice con ellos: "The road work started on…", "I\'ll start at… from next Monday", "I have to leave Matías at the daycare at…", "Then I pick up her two boys on…". El tema enseña on + día y fecha, at + hora.' },
```

Opcional, si se quiere cubrir el `do` de la pregunta de coste (`And what does this cost…?`):
`{ slug: 'present-simple-questions', level: 'a1', title: 'Present simple interrogativo en inglés A1' }`.
La lista quedaría en 12 (13 con la opcional); las otras fichas del set van de 10 a 13.

## 6. Datos duros — todos decibles en A2

`6:55` = *five to seven*, `6:50` = *ten to seven*, `7:15` = *a quarter past seven*, `7:10` =
*ten past seven*, `6:40` = *twenty to seven*, `5:50` = *ten to six*, `7:35` = *twenty-five to
eight*: todas en la forma que `telling-time` enseña explícitamente (past/to y cuartos, líneas
27-28 y 55 del tema). `80,000 pesos`, `eight to twelve`, `6:30 to 8:30`, `twenty-five minutes
more`: dentro de nivel. Las fechas (`August 1`, `Monday, September 14`, `from next Monday`) se
dicen con `on`/`from`, que es justo el tema que falta citar. No hay que cambiar ningún dato.

## 7. El acto de habla

`disculparse` y `conceder-con-condicion` están los dos en la fila A2 de §4 ✔. Lo que la ficha
**produce de más** es la cadena contraoferta → precio → tercera puerta → resumen leído en voz
alta: eso es `negociar` y `resumir el acuerdo`, fila B1. Con los cinco recortes de §1 lo que
queda es una concesión condicionada simple con una alternativa, que sí es A2.

## 8. Devolución

Todo lo anterior va a `habla-fichas-de-rol`. Aquí no se ha reescrito ninguna ficha.
