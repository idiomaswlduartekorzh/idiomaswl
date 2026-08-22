# Fase 10 · Verificación de la pasada quirúrgica — escenario 5, `late-again-on-monday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` tal como está en disco
hoy (22 ago 2026), contra `artifacts/habla-a2/fase9-calcable-5.md`. Se comprobó además con
`git diff HEAD` **qué líneas se tocaron de verdad**, no lo que la ficha declara de sí misma.

**Fuera de alcance (igual que en fase 9):** las dos tablas `Say it here` (82-92 y 166-176), el
bloque final en español (222-226) y todo lo que va de la línea 228 abajo. **Dentro:** prosa de las
dos fichas, `Facts`, vocabulario (`what it is` + `here`), la carta y el cierre compartido.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 135 unidades.** Ninguna es nueva: la única que queda es
el residuo de la falla 9, y el residuo es culpa de la reescritura que este informe prescribió, no
de quien la aplicó.

**La pasada quirúrgica se respetó.** El diff contra `HEAD` da **28 líneas modificadas en las dos
fichas, y las 28 están citadas** por `fase9-calcable-5.md` (16) o por `fase9-nivel-5.md` (12).
Cero reordenaciones, cero tablas reescritas enteras, cero datos nuevos, cero cambios de nombre o de
motor. El resto del diff es documentación de la propia pasada (presupuesto, punto 3, sección nueva
al final), que no va a pantalla.

**Denominador:** 135 unidades, tres menos que las 138 de fase 9. No se perdió ninguna pieza: B baja
de 39 a 38 oraciones de prosa (desaparece `Nobody pays those two nights.` dentro de la falla 3) y el
cierre compartido baja de 12 a 10 (los dos recortes B1 del informe de nivel). A sigue en 40.

---

## 1 · Hallazgo por hallazgo

| # | dónde | veredicto | línea nueva |
|---|---|---|---|
| 1 | B 114 | **arreglado** | `He gives you the WHAT CHANGES line and two mornings of training first.` — tercera persona; dicha a Camilo, `he` no es él |
| 2 | B 123 | **arreglado, con reserva** | `You never taught her the truck.` — ver nota abajo |
| 3 | B 124 | **arreglado** | `You can give the training on two Thursdays after closing, 6:30 to 8:30, in your own unpaid time. You don't want to offer it.` — la oración autónoma del precio ya no existe |
| 4-5 | B 112 | **arreglado** | `The store you open is still shut at 7:35. You are alone at the door when the truck comes at ten past seven, and you have opened alone three Mondays.` — los tres predicados son falsos en boca de Camilo |
| 6 | B 118 | **arreglado** | `You can't give the keys with nothing in writing, not with the other four watching.` — la cláusula autónoma pasa a sintagma, y de paso cae el `would` |
| 7 | B 141 | **arreglado** | `| The others | four people in the store · eyes on everything |` |
| 8 | carta 202 | **arreglado** | `- Nothing you give him now stays between the two of you. So he gives something back, and they see that too.` |
| 9 | A 30 | **a medias** | `You want to walk out with no warning about you on paper.` — ver §2 |
| 10 | A 41 | **arreglado** | `Your bonus goes with it, and the warehouse job and the keys go too.` — se aplicó modificada (sin la inversión `so do`, que el informe de nivel marcaba B1) y el `Your` sigue siendo lo que la protege |
| 11 | A 52 | **arreglado** | `| The 5:50 bus | at the store 6:45 · daycare, never before 6:40 |` |
| 12 | A 55 | **arreglado** | `| The warehouse job | nobody in that job from April · keys and delivery note, always together |` |
| F1 | A 63 | **arreglado** | `not this one, not today` — se va el imperativo |
| F2 | B 148 | **arreglado** | `checked against the boxes · two people, always` |
| F3 | B 151 | **arreglado** | `the middle paper · never in his file` — cae la reincidencia de pronombre + verbo conjugado |
| F4 | B 150 | **arreglado** | `the day you look at it again and see if it worked` — se va la pregunta directa |

**15 arreglados de 16 · 1 a medias · 0 sin tocar.**

**Nota sobre la 2.** `You never taught her the truck.` cumple la letra —cambia el sujeto— pero es el
arreglo más flojo de los quince: Camilo **sí puede sostener** el predicado (nunca le enseñó nada a
Alba). No la cuento decible porque no avanza turno: dicha a Camilo es un reproche por algo que nadie
esperaba de él, y lo que Amparo necesita comunicar —que Alba no es alternativa— no se transmite.
Queda anotada como riesgo, no como falla.

---

## 2 · La que queda: A 30

> `**You want** · You want to walk out with no warning about you on paper.`

Es la reescritura que este informe prescribió palabra por palabra, y **arregla la forma sin arreglar
el motivo**. El motivo de la falla 9 era la deixis, no la redacción: la segunda persona no protege
aquí porque **Amparo sostiene el predicado**. Sigue sosteniéndolo. En su propia ficha, línea 126:
`you get a warning of your own, with two Mondays to explain`. Camilo diciéndole a la cara «usted
quiere salir de aquí sin un papel sobre usted» acierta en el punto débil de B —que A no conoce— y
el turno avanza. `in your file` cambió a `about you on paper`: distinto sintagma, misma persona,
mismo blanco.

**Cambio propuesto (uno, y es el único de esta pasada):**

| línea | de | a |
|---|---|---|
| 30 | `You want to walk out with no warning about you on paper. You also want the second set of keys.` | `You want your August bonus safe from that paper, and you want the second set of keys.` |

Amparo no tiene bonificación en juego —la de agosto es de él, 80.000 pesos, automática (dato 54)— y
las llaves ella las **da**, no las pide: el predicado no se sostiene en su boca. Y el papel sigue
dentro, que es lo que el objetivo tenía que decir. **17 → 15 palabras**, así que A se despega del
techo (450) en vez de acercarse. **Volver a correr `prosa-canonica.mjs` después de aplicar.**

---

## 3 · Cepillo entero — lo que se pasó, línea a línea

Se releyeron las 135 unidades, no solo las tocadas. **Cero decibles nuevas.** Las reescrituras que
cambiaron persona gramatical no metieron ninguna por la puerta de atrás, que era el riesgo real:

- **B 112 y B 114**, las dos más largas de la pasada, quedan blindadas por `the store you open`,
  `you are alone at the door` y `he gives you`, los tres falsos dichos a Camilo.
- **A 33 y A 35**, tocadas por el informe de nivel, se quedaron en segunda y tercera persona
  protegidas (`You don't want the store to know about them.` · `This time she needs to hear…`). El
  rechazo razonado de `The store does not need to know.` —tercera persona, deixis cero— evitó
  exactamente la decible nueva que estas rondas venían reintroduciendo. Es el primer sitio del
  expediente donde alguien **rechaza** una corrección por calcabilidad y acierta.
- **Vocabulario, 19 celdas `here` + 19 `what it is`:** 0 decibles y **0 defectos de forma**. Era la
  columna con cuatro defectos en fase 9 y hoy no tiene ninguno.
- **`Facts`, 20 filas:** 0 decibles. Las tres que fallaban (52, 55, 141) son notas.
- **La carta, 8 unidades:** 0.
- **El cierre compartido, 10 unidades:** 0, y mejora por un efecto lateral del informe de nivel:
  al salir la relectura en voz alta se llevó `"Tell me again: who takes Matías, and what time do you
  get here?"`, que era una pregunta **de B** impresa también en la pantalla de A. El aviso de fase 9
  sobre esa línea queda sin objeto.

**Riesgos que siguen ahí, sin contar (los mismos de fase 9, ninguno citado y por tanto ninguno
tocado):** A 28 (`It is Monday, August 17, 7:35 a.m. The auto parts store is still shut.`), B 110
(`Without them, this is a complaint.`), B 126 (`a warning of your own`), A 78, A 99, carta 201. El
más llamativo es A 28, porque contiene casi literalmente la frase que a B se le hizo reescribir en
112; se sostiene el criterio de fase 9 —nadie anuncia la fecha ni describe lo que los dos están
viendo, y Camilo no abre la tienda— pero **si alguna vez cae otra pasada por esta ficha, empieza
por ahí**.

---

## 4 · Lo que la ficha declara de sí misma

Coherente, comprobado contra el diff. La sección nueva «Pasada quirúrgica del 22 ago 2026» lista
16 de 16 y las 16 están. El hallazgo 7 (línea 419) se actualizó con la nueva 52, que era el aviso
con el que cerraba fase 9. El párrafo de presupuesto se reescribió y declara A 450 · B 448, cifras
que **no se reverifican aquí** (no se corren scripts en esta pasada); si se aplica el cambio de la
línea 30, hay que volver a correrlo de todos modos.
