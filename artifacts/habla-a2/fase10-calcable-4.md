# Fase 10 · Verificación de la pasada quirúrgica — escenario 4 nuevo, `the-pot-is-already-on`

**Auditado:** `artifacts/habla-a2/fase8-fichas-4nuevo.md` tal como está en disco hoy (22 ago 2026),
con la quinta pasada (quirúrgica) aplicada y **sin commitear**. Contrastado línea a línea contra
`artifacts/habla-a2/fase9-calcable-4.md` y contra `git diff` respecto de `f1c64228`.

**Fuera de alcance por diseño:** las dos tablas de exponentes (`Out loud, in this patio`, líneas
85-95; `Out loud, before the bike`, 168-178), el bloque `After — both screens, in Spanish`
(223-227) y el metadato del redactor a partir de la línea 231.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 156 unidades en alcance (0,6 %).**
Antes: 10 decibles + 2 defectos de forma sobre 153. **Los doce están cerrados.** La única que
queda **es nueva**, y no la trajo el informe de calcabilidad: la trajo el arreglo de nivel
de la línea 23.

**La pasada quirúrgica se respetó.** El `git diff` contra `f1c64228` toca **17 líneas de
contenido** más la fila del recuento y la sección nueva de bitácora. Ninguna tabla se rehizo
entera, ninguna sección se reordenó, ningún nombre ni hora se movió. No hubo reescritura.

**Techo de prosa, medido con la lógica del contador canónico** (`prosa-canonica.mjs`, replicada
en el scratchpad para no escribir en `artifacts/`): **ROLE A 444 · ROLE B 449**, tope 450.
Coincide con lo declarado en la línea 245.

---

## 1 · Hallazgo por hallazgo

| # | hallazgo de fase 9 | estado | línea nueva |
|---|---|---|---|
| A1 | `You want the river after lunch, not instead of it.` | **arreglado** | 25 · `You are cooking for one o'clock, not for a river trip.` — `you are cooking` es imposible en boca de Astrid |
| A2 | subordinada `It is raw cassava in twenty liters of hot water.` | **arreglado** | 28 · `…because you have raw cassava in twenty liters of hot water.` — la subordinada ya no se sostiene sola apuntando bien |
| A3 | `If it goes in before twelve, you feed twelve.` (`you` impersonal) | **arreglado** | 34 · `If you put it in before twelve, you feed twelve. If you don't, you lose it tonight.` — el sujeto pasa a ser quien manda en la olla |
| A4 | `…and you see these same people here next Sunday.` | **arreglado** | 37 · `…and next Sunday they are back in your patio.` — `your patio` apunta a un patio que Astrid no tiene |
| A5 | `That is what a wood fire costs.` | **arreglado** | 41 · `…because you cook on wood and not on gas.` |
| **B1** | **GRAVE** · `You know Édgar's car is not coming back.` | **arreglado** | 117 · `You read Édgar's message at eleven eleven: no car back before four.` — el dato oculto nº 1 queda como **nota tras dos puntos**, ya no como frase pronunciable. El motor del escenario vuelve a depender del turno 16 |
| **B2** | **GRAVE** · exponente con la elipsis rellenada | **arreglado** | 119 · `You hold two facts he doesn't: last food at seven, and nothing open there on a Sunday.` — `he` en boca de Astrid apunta a un tercero, y el resto es lista de notas. El tronco `They ate at seven, and nothing is open …` vuelve a estar sin rellenar |
| B3 | `\| 11:40 \| Marcela passes · one passenger \|` | **arreglado** | 129 · `\| 11:40 \| Marcela's bike by the gate · one passenger \|` |
| B4 | `\| At the river \| … they went at 10:00 … \|` | **arreglado, con enmienda aceptada** | 141 · `\| At the river \| six people · there from 10:00 · last food 7:00 \|` — se escribió `from` y no el `since` que yo proponía. **La enmienda es correcta:** `since` reabría el present perfect de duración que `fase9-nivel-4` da por cerrado. Quita el verbo conjugado igual |
| B5 | `You watched six of them leave for the river at ten in the heat.` | **arreglado, con enmienda aceptada** | 107 · `You came at nine to help him, and at eleven twenty you are still the only one.` — se cayó `who did` respecto de mi propuesta. **La enmienda es correcta:** con `who did` medido, B daba 451. Sin él, `him` sigue haciendo el cortafuegos y B queda en 449 |
| D1 | celda `here` de `a round`, cláusula con verbo conjugado | **arreglado** | 69 · `half of your way out — the second one` — sintagma nominal |
| D2 | carta, `somebody told her` | **arreglado** | 196 · `\| Where she heard it \| word from somebody · lunch here \|` |

**12 de 12 cerrados. Ninguno a medias, ninguno igual.** Las dos regresiones que señalaba fase 9
(§Regresiones nº 1 y nº 2) están cerradas en su forma actual.

**`Vigilar, sin marcar` de fase 9** — `why one o'clock needs a second person` (celda `here` de
*to keep an eye on something*, línea 75): **sigue igual**, como correspondía: no estaba citada
como hallazgo. Sigue siendo la siguiente si se vuelve a abrir esa columna.

---

## 2 · Cepillo entero, otra vez: lo que hay AHORA

Repasadas una por una las 32+ oraciones de prosa de A, sus 34 celdas/filas, las de B, las 10
unidades de la carta y las 13 de `Both screens`. **Una sola decible.**

### N1 · NUEVA · ROLE A, situación (línea 23)

> `**The patio, 11:20 a.m.** · Sunday, September 20, in Girón. You lit the fire at nine. The group agreed to this plan on Friday.`

`The group agreed to this plan on Friday.` es **oración completa en tercera persona**, sin ningún
pronombre que girar, y es exactamente la palanca de A: *esto lo acordamos todos el viernes*.
Fabián se la puede soltar a Astrid **sin tocar una palabra** y el turno avanza —es su presión
social, la misma que la lista de cierre le pide ejercer («you never blamed the group»: recordar
el acuerdo no es culpar al grupo)—.

**De dónde sale.** No estaba antes. Antes era `You lit the fire at nine, for a plan the whole
group agreed to on Friday.`: una **subordinada de relativo colgada de la oración protegida**, que
no se podía decir suelta. El arreglo de nivel §3 nº 3 la partió en dos oraciones para quitar la
relativa sin pronombre con preposición al final —y al partirla **le dio sujeto y verbo propios**.
Es daño colateral de una auditoría distinta, no un incumplimiento de la pasada quirúrgica.

**Reescritura:** `You lit the fire at nine, for Friday's plan: everybody here at one.`
(sin relativa y sin preposición al final —el arreglo de nivel se conserva—, el dato queda como
**nota tras dos puntos**, y concuerda con la fila `Friday's plan` de sus datos duros ·
14 → 12 palabras, **−2 → A queda en 442 / 450**)

### Las otras tres líneas nuevas de la pasada: limpias

- **118** (`Today you know it is wrong. He doesn't know.`) — la partición no crea decible: `He
  doesn't know` en boca de Astrid apunta a un tercero, y `you know it is wrong` es falso para
  Fabián.
- **207** (`Each of you says three things out loud. Six in total.`) — rúbrica del cierre, hablada
  al par, no turno de nadie.
- **98** (`You asked for help at one o'clock.`) — lista de comprobación en pasado; dicha a Astrid
  apunta mal y no avanza nada.

### Riesgos que quedan, sin marcar (no son decibles, se dejan escritos)

1. **117, segunda oración:** `You have not said a word about it.` Es oración completa, pero `it`
   no tiene referente para Fabián —que no sabe del carro—, así que dicha tal cual no avanza. Ya
   existía como cláusula coordinada antes de la pasada; ahora está suelta. Vigilar si se vuelve a
   tocar esa viñeta.
2. **201, cierre de la carta:** `You can't be that somebody.` Sayable, pero en boca de A juega
   contra su propio interés: no avanza.
3. **75:** la ya citada `why one o'clock needs a second person`.

---

## 3 · Que no se reescribió: la prueba

`git diff` contra `f1c64228` sobre el archivo: líneas de contenido tocadas **23, 25, 28, 34, 37,
41, 69, 98, 107, 117, 118, 119, 129, 141, 159, 196, 207**, más la 245 (recuento declarado
445 → 444, que es lo medido) y la sección de bitácora nueva al final. **Es exactamente la lista
que declara la propia pasada**, ni una línea más. Las 20 celdas `what it is` y 19 de las 20
`here` de cada rol, los dos relojes, los datos duros, las dos tablas de exponentes, la carta
salvo su fila `Where she heard it` y las cuatro reglas del cierre están **byte a byte** como
estaban. La pasada quirúrgica se respetó.

**Denominador:** los 153 de fase 9 más las tres oraciones que nacieron al partir 23, 118 y 207 =
**156**.

## El coste de cerrar

Una línea, dos palabras menos, ningún dato, ninguna hora, ningún nombre, ningún turno del mapa.
Cerrada la 23, el escenario queda en **0 decibles sobre 156**.
