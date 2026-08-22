# Fase 13 · Nivel A2 — escenario 8 `cancel-the-gym-i-am-leaving`

Recalibración sobre el archivo **tal como está en disco** el 22 ago 2026 (`ed220acf`), después de
la pasada de calcabilidad de `fase13-calcable-8.md`. Prosa viva medida aquí mismo con
`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`: **A 445 · B 447**, techo 450 → **aire
real: A 5 · B 3**. Las cifras que el propio archivo declara en su cuadro coinciden; la nota de la
pasada de fase 9 (449/450) queda ya marcada como caduca dentro del archivo.

**No se editó la ficha.** Todo lo de abajo es hallazgo + arreglo nombrado + coste en palabras.
Contabilidad usada: `prosa-canonica.mjs` cuenta **solo** las líneas que no empiezan por `|` dentro
de `## ROLE A` / `## ROLE B`. Por tanto **filas de datos, vocabulario y exponentes, la carta, el
cierre común, el debrief y `grammarReferences` cuestan cero palabras**. Solo la prosa paga.

---

## Veredicto

**CABE CON CAMBIOS.** El escenario es A2: los actos que exige están en el §4 del nivel, la ruta
mínima al cierre se escribe entera con lengua A2, y las 26 formas de las dos tablas de exponentes
se anclan a temas del registro. Lo que hay que tocar son **ocho puntos**, seis de ellos a coste
cero, y **uno de ellos es una restricción que se perdió en el recorte de la pasada de
calcabilidad**.

Nada de lo que sigue obliga a mover el motor (actos declarados, poder, quién arranca, desenlace,
minutos, turnos, datos, carta, cierre). Dos de los hallazgos —las adiciones a
`grammarReferences`— sí piden el visto bueno del dueño de fase 4/6, porque la cabecera del archivo
declara esos doce anclajes como pieza de motor.

---

## 1. La pregunta del recorte: ¿sigue eligiendo ella el momento?

**No del todo. La instrucción perdió la mitad que era restricción y se quedó con la mitad que es
advertencia.** Hoy el dato oculto 1 de Tatiana dice, entero:

> You already know the September 5 charge will bounce: your card expires first, and the new one
> arrives too late. **Say it too early and it sounds like a plan to stop paying.**

Lo que queda solo prohíbe **una** opción (decirlo pronto). No dice que el momento sea suyo, y sobre
todo **no dice que pueda no decirlo**. La nota de la pasada justifica el recorte con «lo dice ya la
frase anterior», y la frase anterior es la del rebote: no habla de tiempos. La frase que sí hablaba
de tiempos era justo la que salió.

Que esto es restricción y no redundancia lo prueba el propio archivo: la **pregunta 3 del debrief**
mide exactamente la opción que ya no está en pantalla — «¿Lo contó? ¿En qué turno? **¿Le sirvió de
algo callárselo?**». Se está midiendo una decisión que la ficha ya no le entrega.

**Arreglo (recomendado):** devolver las palabras al mismo sitio, pegadas a la advertencia con dos
puntos, que es el patrón que la ficha ya usa en `Not about money` y en `You don't offer it first:`.

| antes | ahora |
|---|---|
| `Say it too early and it sounds like a plan to stop paying.` | `You choose the moment: say it too early and it sounds like a plan to stop paying.` |

- **Coste: +4 palabras en A** (34 → 38 en esa viñeta). A pasa de **445 a 449**, dentro del techo.
- No reabre calcabilidad: `You choose the moment` habla *sobre* ella en segunda persona y no hace
  avanzar ningún turno.
- Variante barata si se quiere aire: `You choose when.` (+2). Pierde el matiz de «o no decirlo».

---

## 2. Cada forma, contra un tema del registro

Verificado uno a uno contra `src/data/grammar/ingles/**` con el `slug` exacto. Ningún exponente de
las dos tablas necesita una estructura fuera de A1/A2.

### ROLE A — Tatiana (12 formas en 8 filas)

| forma en pantalla | tema del registro | por qué ese |
|---|---|---|
| `I can only come at…, so can we…?` | `can-ability` (A1) · `connectors-a2` (A2) · `prepositions-time` (A1) | `Can we…?` es la interrogativa del tema; `so` de consecuencia está en su tabla; `at + hora` es la primera fila de preposiciones |
| `I know, but I still need…` | `connectors-a2` · `present-simple-affirmative` (A1) | `but` de contraste dentro de la misma oración; `I still need` es presente simple afirmativo |
| `I have to ask you again: can you…?` | `have-to-must` (A2) · `can-ability` (A1) | `have to + base` y `Can you…?`, las dos formas modelo de sus temas |
| `Is there another way?` | `there-is-there-are` (A1) | el tema imprime `Is there a café nearby?` |
| `What will happen if…?` | **`will-future` (A2)** · `first-conditional` (A2) | el if va con `first-conditional`; **la wh- con will solo está en `will-future`** («Pregunta Wh-: What will you do this weekend?»). Ver hallazgo N3 |
| `So I have to…?` | `have-to-must` (A2) | pregunta de eco, sin inversión: cae dentro de la afirmativa del tema |
| `So it's …, on the …?` | `verb-to-be` (A1) · `prepositions-time` (A1) | `it's` + `on the 5th` |
| `Let me copy…` | `imperative` (A1) | el tema trae `Please let me sit here.` en sus ejercicios |
| `I don't want to pay for…` | `present-simple-negative` (A1) | `don't + base` |
| `I know it's not your fault, but…` | `connectors-a2` · `verb-to-be` (A1) | `but` + `it's not` |
| `I can show you, but I can't…` | `can-ability` (A1) · `connectors-a2` | afirmativo y negativo de can en la misma oración |
| `I'm leaving on…` | `present-continuous-future-a2` (A2) · `prepositions-time` | el tema exige la expresión de tiempo, y el exponente la trae puesta (`on…`) |

### ROLE B — Mauricio (14 formas en 8 filas)

| forma en pantalla | tema del registro | por qué ese |
|---|---|---|
| `I don't need to know where — I need…` | `present-simple-negative` (A1) · `wh-questions` (A1) | `where` queda truncado y no obliga a orden de pregunta incrustada |
| `Any reason works, but I can't write…` | **`present-simple-affirmative` (A1)** · `connectors-a2` · `can-ability` | `works` es la tercera persona -s, que solo cubre ese tema |
| `Can you sign here, next to…?` | `can-ability` (A1) · **`prepositions-place` (A1)** | `next to` sale 44 veces en ese tema |
| `Has this person ever been a member…?` | `present-perfect-ever-never` (A2) | calco de `Has she ever lived abroad?` |
| `Let me check that. One moment…` | `imperative` (A1) | igual que `Let me copy…` |
| `Write this down, please: …` | `imperative` (A1) | imperativo con `please`, **pero rompe la lista negra de la caja**: ver hallazgo N5 |
| `There is another way, but…` | `there-is-there-are` (A1) · `connectors-a2` | afirmativa de there is + but |
| `You can also…, and it costs…` | `can-ability` · **`present-simple-affirmative`** | `it costs` es tercera persona -s |
| `I can't do that, but I can…` | `can-ability` · `connectors-a2` | el eje del escenario: no con puerta |
| `If you bring…, I can…` | `first-conditional` (A2) · `can-ability` (A1) | if + presente lo da el tema; el resultado con `can` en vez de `will` es variante que el tema **menciona solo para la cláusula if**. Aceptable, ver N3 |
| `I have to be careful, because…` | `have-to-must` · `connectors-a2` | obligación externa + causa |
| `I know, and I'm sorry about…` | `verb-to-be` (A1) · `connectors-a2` | `I'm sorry about` es bloque léxico A1 |
| `I need a paper that says…` | `relative-clauses-a2` (A2) | `that` con cosa, exactamente la tercera fila del tema |
| `That's not enough — it doesn't say…` | `present-simple-negative` (A1) · `demonstratives` (A1) | `doesn't + base` |

**Caja de herramientas:** las dos fichas apuntan a bloques que existen y que el nivel aguanta.
`What does "…" mean?` (bloque 3) → `present-simple-questions`; `Let me say that again.` (bloque 4)
→ `imperative`; `The person who can do that is…` (bloque 7) → `relative-clauses-a2`;
`It's personal.` (bloque 6), que es lo que le permite a Tatiana no decir a dónde va → léxico A1.
Ninguna de las dos fichas necesita una forma que la caja no tenga.

---

## 3. Anclajes que faltan en los doce — listo para pegar

Los doce `grammarReferences` del archivo **existen todos** en el registro y **sus títulos coinciden
letra por letra** con `title` en `src/data/grammar/ingles/**` (verificado con `slug:` + `title:`).
Nada que retirar. Lo que falta son tres anclajes que las filas nuevas del 21 y 22 de agosto
introdujeron sin cobertura, y **añadirlos cuesta cero palabras de prosa**:

```ts
  { level: 'a2', slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'Sostiene la mitad interrogativa de «What will happen if…?». first-conditional cubre la cláusula con if, pero no imprime ni una wh- con will; este tema sí: «Pregunta Wh-: What will you do this weekend?». Y sostiene el «will bounce» del dato oculto 1 de Tatiana, que es el secreto entero del escenario: sin will, ella no puede decir en voz alta lo único que sabe y él no.' },
  { level: 'a1', slug: 'present-simple-affirmative', title: 'Present simple afirmativo en inglés A1',
    rationale: 'Sostiene «Any reason works, but I can\'t write…» y «You can also…, and it costs…» de Mauricio, y el «I still need» de Tatiana. Es la tercera persona -s, que en este mostrador decide si la frase suena a regla de la casa o a error: el registro trae la negativa y la interrogativa, y la afirmativa faltaba.' },
  { level: 'a1', slug: 'prepositions-place', title: 'Prepositions of Place en Inglés A1',
    rationale: 'Sostiene «Can you sign here, next to…?» y el punto 3 del cierre, que obliga a decir dónde está Édison: «second floor». El tema enseña las dos cosas —next to, y on + piso de un edificio— y era el único dato del cierre sin tema detrás: prepositions-time cubre el calendario, no el edificio.' },
```

**Candidatos que dejo fuera a propósito, con la razón:**

- `telling-time` (A1) — cubre `six forty p.m.` y `nine to five`, pero el `rationale` de
  `prepositions-time` ya declara el calendario como anclaje de omisión y la hora se dice con las
  mismas reglas. Si el dueño de fase 6 prefiere separarlas, el tema existe y el título es
  `Decir la hora en inglés A1`.
- `past-simple-regular` / `past-simple-irregular` (A2) — **no hacen falta para cerrar**: la ruta
  mínima (abajo) llega al cierre entera en presente y futuro. Pero conviene saber que en cuanto
  Tatiana usa su argumento de Wilmer («he promised me…», «I signed in July») entra en pasado
  simple, que §11 autoriza para el A2 leído y que **ningún exponente de su tabla le da**. Es una
  opción del escenario, no un requisito; si algún día se le añade fila, hay que remedir con
  `fase11-scripts/actos-cuota.mjs`, porque sube el denominador.

---

## 4. Los actos, contra §4

La banda declarada es `pedir-favor` + `rechazar` + `proponer-alternativa`.

| acto | §4 | ¿se puede con la ficha + la caja? |
|---|---|---|
| pedir un favor | **A2, literal** | sí: `Is there another way?`, `can we…?`, caja 1 |
| dar una razón | **A2, literal** | sí: `because` (caja 5 y `connectors-a2`), `I don't want to pay for…` |
| disculparse | **A2, literal** | sí: caja 2 y `I know, and I'm sorry about…` |
| proponer alternativa | **A2, literal** | sí, y en la boca correcta: `There is another way, but…` · `You can also…, and it costs…` |
| conceder con condición simple | **A2, literal** | sí: `If you bring…, I can…` |
| rechazar | A1 lo permite de frente; A2 le quita la prohibición del rechazo indirecto | sí: `I can't do that, but I can…` + caja 7 |
| guardarse algo sin mentir | no está en §4, es léxico A1 | sí: caja 6, y la ficha de A apunta al bloque 6 |

**Ninguno de los actos que el cierre obliga a producir es de B2.** No hay negociación de términos,
ni concesión larga, ni ironía, ni discurso indirecto extenso.

**Aviso de conjunto, no de esta ficha:** la pasada del 22 de agosto metió aquí **tres filas de
`insistir`** para levantar la cuota del set (`fase12-cuota-registro.md`), y **`insistir` está en la
fila de B1 del §4**, no en la de A2. Miradas una a una, las tres filas imprimen formas A2
—`but` + presente, `have to` + `can`, `only… so can we…?`—, así que **la ficha no se sale de
nivel**: lo que hacen es «volver a pedir un favor dando una razón nueva», que son dos actos A2
encadenados. Pero la etiqueta con la que el script las clasifica nombra un acto que §4 reserva para
B1. Eso se resuelve en el mapa de `fase11-scripts/actos-cuota.mjs` y en §5, no aquí, y hay que
resolverlo antes de que la cuota de `insistir` se convierta en la razón por la que un set A2
produce actos B1. **Coste en esta ficha: cero.**

---

## 5. La ruta mínima (la prueba que decide)

Escrita con solo lengua A2, respetando las tres restricciones de cada rol y llegando a las tres
condiciones del cierre. Siete turnos por rol, dentro de los ocho declarados.

1. **T** — *Good evening. I'm here about my plan. I'm leaving on August 30, and I want to cancel today.*
2. **M** — *I'm sorry. You signed a 3-month minimum, to October 13. I can't do that, but I can open a case today.*
3. **T** — *So I have to pay two more months? Is there another way?*
4. **M** — *There is another way, but I need a paper that says your date out and your date back.*
5. **T** — *I can show you my email, but I can't leave it. It doesn't have a return date. I can only come at 12:00 on Thursday, so can we do it now?*
6. **M** — *Not today: no proof, and Édison is not here. I can open the case now. Can you sign here, next to your name? I need your ID and a reason. I don't need to know where — I need one line.*
7. **T** — *It's personal. Write it as work. My ID is… What will happen if the charge on the 5th doesn't work?*
8. **M** — *Write this down, please: A-250825, August 25. The cut-off is Thursday at 6 p.m. Édison is on the second floor, Wednesday to Friday, from 9 to 5. If nobody pays on the 5th, collections calls on the 12th. Only a transfer before the 12th.*
9. **T** — *So it's A-250825, on August 25.* (firma el log)

Todo lo que se dice ahí sale de una fila de exponentes, de la caja o de una casilla de datos.
**El escenario cabe.** Los dos puntos donde la pareja se caería al español —el nombre de las cosas
del oficio y la hora/fecha— están cubiertos por el bloque 4 de la caja (que la ficha de Mauricio sí
reclama) y por las glosas de números de las tablas.

---

## 6. Los datos duros, dichos en voz alta

| dato | ¿decible en A2? |
|---|---|
| `92,000` · `135,000` · `30,000` | sí, y con glosa puesta *(ninety-two thousand)*. Bien resuelto |
| `6:40 p.m.` · `12:00 to 1:00` · `9:00 a.m.–5:00 p.m.` | sí — `telling-time` A1 autoriza la lectura digital («three forty-five») |
| `July 13` · `August 30` · `September 3` | sí — `prepositions-time` A1 imprime `on June 15` |
| `the 5th` · `the 12th` · `Thursday the 27th` | sí de hecho, **pero el registro de inglés no tiene tema de ordinales** en A1 ni A2 (solo aparecen en un B1). Es un hueco del registro, no un defecto del escenario: los ordinales de fecha son léxico A1 por MCER. Lo dejo anotado para `habla-escenarios` |
| `A-250825` | sí, letra + cifras, y la reparación existe (caja 3: `Sorry — was that five or nine?`) |
| `1.098.622.417` | **decible solo dígito a dígito, y nada se lo dice.** Es además el único número del archivo con puntos de millar, entre cifras que usan coma (`92,000`). Ver N6 |

---

## 7. Inglés americano

Barrido de marcadores británicos sobre las dos fichas (ortografía, léxico y giros): **un solo
impacto**. El resto está limpio y bien resuelto —`front desk`, `round-trip ticket`,
`business days`, `in line`, `collections`, `authorized`, `second floor`, fechas en orden americano.

- `expiry: **August 31**` (datos de A) → **`expiration`**. En AmE la palabra del plástico es
  *expiration date*; *expiry* es la forma de fuera. Está en tabla: **coste cero**.
- Menor, mismo bloque: `in office hours` (A, restricción 2) suena británico junto a
  `business days`. → `during office hours`, **coste cero** (misma cuenta, 24 palabras).

---

## 8. Hallazgos, arreglo y coste

| n.º | dónde | qué pasa | arreglo | coste |
|---|---|---|---|---|
| **N1** | A · `Only you know` 1 | se perdió la restricción de que **ella elige el momento** (y la opción de callárselo, que el debrief mide) | `Say it too early and…` → `You choose the moment: say it too early and…` | **+4 en A** (445 → 449) |
| **N2** | B · `Only you know` 4 | la oración reescrita tiene **`the others` sin antecedente**: el único plural anterior es `three or four members`, así que un A2 lee «los otros socios trabajan contigo» y no computa. El referente que se quiere —los demás vendedores— no está en la pantalla de Mauricio. Además `promised three or four members a cancellation` es doble objeto y se malparsea como «prometió a tres o cuatro socios» → «prometió tres o cuatro socios» | `Wilmer promised a cancellation to three or four members, he is gone, and the other sellers still work with you.` (mantiene el `you` final que la vuelve no calcable) | **+2 en B** (19 → 21) · variante mínima solo `the others` → `the other sellers`: **+1** |
| **N3** | `grammarReferences` | tres formas sin tema que las sostenga: la wh- con will, la tercera persona -s y las preposiciones de lugar del cierre | añadir `will-future`, `present-simple-affirmative`, `prepositions-place` (bloque listo en §3) | **0** (fuera del contador) |
| **N4** | B · `You did it if` | **pasiva**: `and the log is signed`, prohibida en la caja y en la doctrina del set. De paso, `two ways she didn't bring in` es un phrasal colgado y opaco | `…two ways she did not know — and she signed the log.` | **0** (56 → 56) |
| **N5** | B · exponentes, `dictating a number` | `Write this down, please: …` es **phrasal separable con pronombre en medio**, que la caja prohíbe explícitamente | `Write down this number, please: …` — o documentar la excepción, porque con pronombre el inglés obliga a separar | **0** (tabla) |
| **N6** | A · datos, `Your ID number` | `1.098.622.417` no tiene indicación de cómo se dice, y la ficha sí glosa todas las cifras de dinero | glosar igual que el dinero: `**1.098.622.417** *(one oh nine eight…, digit by digit)*` | **0** (tabla) |
| **N7** | A · datos, `Your card` / A · restricción 2 | `expiry` y `in office hours` no son americanos | `expiration` · `during office hours` | **0** y **0** |
| **N8** | B · `You can't` 1 | `is not yours to give` es giro idiomático B2 de lectura; el A2 no lo desarma | `A cancellation inside the minimum term is not your decision.` (sigue sin ser decible: en su boca «your» apunta mal) | **−1 en B** (23 → 22) |

**Menores, anotados y no exigidos** (ninguno rompe nivel, ninguno cuesta prosa):

- **Carta de Édison:** `yours **may** be the wrong one`. `may` no está en el registro A1/A2 —los
  modales del nivel son `can`, `have to/must`, `should`, `will`—. La carta queda fuera del
  contador, así que reescribirlo con `maybe` es gratis.
- **Dos citas caducadas en los `rationale`.** `first-conditional` cita «Too early, and it sounds
  like…», cadena que ya no existe (hoy es `Say it too early and it sounds like…`), y `connectors-a2`
  cita «I can show you, but I can't leave it.», cuando la tabla imprime `I can show you, but I
  can't…`. El propio archivo declara que los `rationale` citan «la forma que el alumno ve en
  pantalla»: hoy dos no. Coste cero.
- **El mismo `rationale` de `first-conditional`** reclama como anclaje dos condicionales de tipo
  cero —`If you shout, he signs nothing.` y `If you never say it, she never knows.`—, y el tema
  del registro marca ese patrón como error («If you study, you pass ❌ en este contexto»). Las dos
  líneas son prosa que se lee, no exponentes que se digan; lo que hay que corregir es la frase del
  `rationale`, no las líneas. Coste cero.
- **`relative-clauses-a2`** afirma que el discurso indirecto «en A2 está prohibido», y §4 solo
  excluye el **extenso**; además la propia prosa de A lo usa corto y correcto («promised you out
  loud **that they cancel** for people who leave the country»). Suavizar la frase del `rationale`.
- **`case number` significa dos cosas** en la pantalla de Tatiana: el de su correo de la embajada
  (restricción 1) y el que se lleva del mostrador (cierre). No rompe nada, pero es el número que el
  cierre le obliga a repetir. Si alguna vez sobra una palabra en A: `your embassy file number`.

---

## 9. Presupuesto después de aplicar todo

| ficha | hoy | cambios | después | techo |
|---|---|---|---|---|
| ROLE A — Tatiana | 445 | N1 **+4** · N7 0 · N6 0 | **449** | 450 |
| ROLE B — Mauricio | 447 | N2 **+2** · N8 **−1** · N4 0 · N5 0 | **448** | 450 |

Cabe entero, con 1 palabra de aire en A y 2 en B. Si se prefiere no gastar nada en A, la variante
`You choose when.` (+2) deja A en 447.

**Comprobar después de tocar:** `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs` (los 16
roles a la vez) y, **solo si se añade o quita una fila de exponentes** —ninguno de estos ocho
arreglos la añade—, `node artifacts/habla-a2/fase11-scripts/actos-cuota.mjs`.

---

## 10. Lo que este informe NO toca

- El motor: actos declarados, poder `b>a`, arranque de A, desenlace `sin acuerdo`, 8 minutos,
  8 turnos por rol, las 20 filas de datos, la carta en `afterTurn: 3`, el cierre y el debrief.
  Todo eso está en banda de §4 y no se mueve.
- El orden alfabético y el recuento de las tablas de exponentes: 8 filas por rol contra 8 turnos
  declarados, en orden por función, y la fila que concede (`saying no with a door open`,
  `offering another way`) no queda ni primera ni última. Lo verificado por `fase13-calcable-8.md`
  sigue en pie después de estos arreglos: los tres que tocan prosa mantienen el sujeto en segunda
  persona o el `you` final.
- Las fichas no se reescriben aquí. Los ocho cambios vuelven a `habla-fichas-de-rol`.
