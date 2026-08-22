# Fase 13 · Calibrador de nivel — escenario 2 `no-appointment-until-thursday`

Auditado sobre `artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md` **tal como
está en disco** el 22 ago 2026 (después del recorte de prosa de la mañana y de la pasada de
calcabilidad de la tarde, commit `fea635ba`). Las cifras vivas salen del contador canónico, no de
lo que declara el archivo:

```
node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs
  fase7-fichas-2-no-appointment-until-thursday  446   448      (techo 450)
```

**Aire real: A 4 palabras · B 2 palabras.** Todos los arreglos de abajo caben dentro de ese aire,
y cada uno lleva su coste **medido** con la misma función del contador (no estimado).

**VEREDICTO: CABE CON CAMBIOS.**

La prueba que decide —escribir la ruta mínima al cierre con solo lengua A2— sale, y hoy sale en
**6 turnos por rol** sobre los 9 declarados. El escenario es A2 por acto y por ruta. Lo que falla
es lo de siempre en esta ficha y sigue sin aplicarse: **el andamiaje ejercita seis estructuras que
ninguna `grammarReference` sostiene**, y una de las que sí se cita ancla justo la forma que el
tema enseña al revés. Y de la pasada de hoy salen tres líneas nuevas que suben el nivel de
lectura: dos asíndeton en las restricciones de A, un presente con valor de futuro en su dato
oculto, y un `unless` en la glosa que se reescribió en la tabla de B.

---

## 0 · Bandas declaradas contra §4

| | Declarado en la ficha | Banda A2 de §4 | |
|---|---|---|---|
| Minutos | 6 | 5–8 | ✅ |
| Turnos por rol | 9 (cabecera A, cabecera B y línea de motor) | 6–9 | ✅ |
| Filas de exponentes | A 9 · B 9 | ≤ techo declarado (9) | ✅ |
| Filas de datos | A 10 · B 10 | ≤ 10 | ✅ |
| Vocabulario | A 10 · B 10 | 8–10 | ✅ |
| Prosa | A 446 · B 448 | ≤ 450 | ✅ |

Nada que corregir aquí. La unidad («por rol») es la misma en los tres sitios donde se declara.

## 1 · El acto de habla existe en A2

Declarados: `dar-mala-noticia` + `recomendar`.

- **`dar-mala-noticia`** se produce con el hecho delante y la alternativa detrás
  (`We're fully booked…` → `The first opening is…`). No pide concesión larga ni discurso
  indirecto: está en la fila A2 de §4.
- **`recomendar`** es `should` + imperativo (`You should go to our… branch`, `Put something cold
  on your face…`). A2, con tema propio en el registro.

Los actos que la ruta obliga a producir de paso están **todos** en la fila A2 de §4: proponer
alternativa (`Is there any other day?`), dar una razón (`because I open the warehouse`),
disculparse (caja, bloque 7), quejarse con educación (caja, bloque 5) y conceder con condición
simple (`I can hold it for you` mientras deciden). **Ninguno exige negociar, insistir ni rechazar
de forma indirecta**, que es lo que lo subiría a B1. El rechazo de B al jueves a las 7:00 es
**de frente y con el motivo pegado**, que es exactamente lo que A2 permite.

**Cobertura ficha + caja, acto por acto:** ✅ en los ocho que la ruta necesita. Con dos huecos que
**no son de esta ficha** y que el archivo ya declara como pendientes de la caja —los confirmo
abiertos, no los reabro—:

1. La caja no tiene saludo de tarde (bloque 1). A las 4:20 p.m. la ruta empieza con
   `Good afternoon`, y la ficha lo parchea a mano en su línea de toolkit. Funciona, pero el
   parche vive en la ficha.
2. El bloque 7 de la caja está marcado `[grants]` y la ficha se lo asigna a **B**, que es quien
   tiene que rechazar. Mientras la marca no cambie, B rechaza con formas de su propia tabla
   (`I can't come at…, because I open…`), que sí las tiene. El acto sale; la caja miente sobre
   quién lo usa.

## 2 · La ruta mínima — la prueba que decide

Escrita solo con lengua del nivel, arranca B, la carta se abre al terminar el turno global 5.
Cierra los cuatro puntos y cumple las dos condiciones de éxito duras («una pregunta abierta antes
de proponer nada», «dos cosas tuyas sobre la mesa antes de que nadie las pida»).
**6 turnos por rol, 12 globales** — dentro de los 9 declarados, con tres de sobra por lado.

1. **B** — Good afternoon. I don't have an appointment. My tooth hurts. Can you help me, please?
2. **A** — Good afternoon. What happened?
3. **B** — A piece of my tooth broke on Sunday, and it's worse than yesterday. It hurts more when I drink something cold. I can wait here, and I don't work on Saturdays.
4. **A** — I'm afraid we're fully booked today and tomorrow. The first opening is Thursday at seven in the morning. Come ten minutes early — there are forms and an X-ray.
5. **B** — I can't come at seven, because I open the warehouse. Is there any other day? What days do you have after eight thirty? *(fin del turno global 5 · A abre la carta)*
6. **A** — Today at six fifteen the dentist has fifteen minutes for you. And Saturday the twelfth at nine is free, in this branch. I can hold it for you.
7. **B** — Saturday at nine is good, and I can come back at six fifteen today. Does my plan cover it here? What time do I have to be there?
8. **A** — The plan covers it only here. You pay nothing. Come ten minutes early. I have this number: 310 218 44 71. Is it yours?
9. **B** — No, that's my sister's number. My number is 3-1-0-5-4-2-8-8-0-6. So: today at six fifteen, and Saturday the twelfth at nine, in this branch, ten minutes early. And I pay nothing.
10. **A** — Let me repeat it: 3-1-0-5-4-2-8-8-0-6. That's right. Put something cold on your face for ten minutes. Don't chew on that side. If the pain goes to your ear, go to the emergency room tonight.
11. **B** — Tonight I will put something cold on my face, and I will not chew on that side. Thanks for your time.
12. **A** — See you at six fifteen.

**Inventario de la ruta:** presente simple afirmativo, negativo e interrogativo · pasado simple
irregular **afirmativo** · `can` / `can't` de habilidad, permiso y petición · imperativo afirmativo
y negativo · primer condicional con imperativo · comparativos (`worse`, `hurts more`) · `have to`
en pregunta · `there is` / `any` · genitivo sajón · futuro con `will` · horas y numerales ·
cuantificadores. **Nada por encima de A2.** Cero present perfect, cero `could` de cortesía, cero
pasiva, cero pregunta incrustada, cero condicional hipotético.

La rama alternativa (nota de remisión → Centro → 40.000 de su bolsillo) también sale con la misma
lengua: añade `You should go to our Centro branch, on Calle 36 — before eight.` y
`At Centro you pay forty thousand yourself.` Sigue siendo A2.

**Y la ruta prueba el defecto de §3:** de las doce estructuras que acabo de listar, **seis no
tienen tema citado** en `grammarReferences`. El escenario cabe en A2; lo que no cabe es la lista
de anclajes que declara.

## 3 · Cada exponente, uno por uno → tema del registro

Comprobado contra `src/data/grammar/ingles/{a1,a2}/`, tema a tema, abriendo el contenido y no solo
el `slug`. `✅` = citado hoy en la ficha · `✗` = el tema existe en el registro pero **la ficha no
lo cita** · `∅` = **no existe tema en A1 ni en A2** que lo sostenga.

### ROLE A — 9 filas, 14 formas

| forma | tema del registro que la sostiene | |
|---|---|---|
| `What happened?` | **ninguno** — ver el hallazgo N-1 | ∅ |
| `Can you say it one at a time?` | `can-ability` (a1) — el tema trae `Can you help me?`, así que cubre petición, no solo habilidad | ✅ |
| `Let me repeat it: …` | `imperative` (a1) — `Please let me sit here` es la respuesta correcta de uno de sus ejercicios | ✅ |
| `If the pain goes to…, go to the emergency room tonight.` | `first-conditional` (a2) la prótasis + `imperative` (a1) la apódosis (el tema de condicional solo enseña `will` en la principal) | ✅ |
| `Come… minutes early — there are…` | `imperative` (a1) ✅ + `there-is-there-are` (a1) | ✗ |
| `That's another patient's time.` | `possessive-s` (a1) | ✗ |
| `I can't tell you about it.` | `can-ability` (a1) | ✅ |
| `Maybe I have something later today, but…` | `connectors-a2` (but) ✅ + `present-simple-affirmative` (a1) | ✗ |
| `We're fully booked…` | bloque léxico con fila propia de vocabulario; formalmente `verb-to-be` (a1) | ✗ (aceptado) |
| `The first opening is…` | `verb-to-be` (a1) | ✗ |
| `You should go to our… branch, on… — before…` | `should-advice` (a2) — el tema trae `You should call a doctor` | ✅ |
| `Put something cold on your face for… minutes.` | `imperative` (a1) ✅ + `quantifiers` (a2) ✅ | ✅ |
| `Don't chew on…` | `imperative` (a1), negativo | ✅ |
| `The plan covers it only…` | `present-simple-affirmative` (a1), tercera persona | ✗ |
| `At… you pay… yourself.` | **ninguno** — el reflexivo enfático no está en `object-pronouns` ni en ningún otro tema a1/a2 | ∅ |

### ROLE B — 9 filas, 13 formas

| forma | tema del registro que la sostiene | |
|---|---|---|
| `Is there any other day?` | `there-is-there-are` (a1) ✗ + `quantifiers` (a2, `any`) ✅ | ✗ |
| `What days do you have after…?` | `present-simple-questions` (a1) / `wh-questions` (a1) | ✗ |
| `What time do I have to be there?` | `have-to-must` (a2) — el tema trae `Do you have to work?` | ✅ |
| `Does my plan cover it…?` | `present-simple-questions` (a1) | ✗ |
| `It's worse than…` | `comparatives` (a2) — `worse` está en su lista de irregulares | ✅ |
| `It hurts more when…` | `comparatives` (a2) — el tema trae comparación adverbial (`He runs a lot faster than me`) | ✅ |
| `That's my sister's number.` | `possessive-s` (a1) | ✗ |
| `Mine is…` | **ninguno** — ver el hallazgo N-2 | ∅ |
| `I have… with me, if that helps.` | `present-simple-affirmative` (a1) ✗ + `first-conditional` (a2) reducido ✅ | ✗ |
| `I can wait here.` · `Can I come back at…?` | `can-ability` (a1) | ✅ |
| `I don't work on…` | `present-simple-negative` (a1) + `prepositions-time` (a1) | ✗ |
| `I don't have an appointment. Can you help me, please?` | `present-simple-negative` (a1) ✗ + `can-ability` (a1) ✅ | ✗ |
| `A piece of my tooth broke on…, and…` | `past-simple-irregular` (a2) — **no** `past-simple-questions`, que enseña la forma base | ✗ |
| `I can't come at…, because I open…` | `can-ability` (a1) ✅ + `connectors-a2` ✅ + `telling-time` (a1) ✅ | ✅ |
| *(cierre, punto 4)* `Tonight I will…` | `will-future` (a2) | ✗ |

### N-1 · GRAVE · `What happened?` está anclado a un tema que enseña lo contrario

La `rationale` de `past-simple-questions` dice, literalmente, que ese tema ancla
`What happened?` y la respuesta `A piece of my tooth broke on Sunday`. **Abierto el tema, no
ancla ninguna de las dos:**

- enseña `Did + sujeto + verbo base` y `Wh- + did + sujeto + verbo base` (`What did you do?`),
  y machaca la regla «¡no -ed, no irregular!» dentro de la pregunta;
- `wh-questions` (a1), el otro candidato, avisa expresamente contra «omitir el auxiliar»
  (`Where you live?` como error típico del hispanohablante).

`What happened?` es una pregunta **de sujeto**: sin auxiliar y con el verbo en pasado. Un
estudiante que aplique la regla del tema citado produce `*What did happen?`. Y no es una forma
cualquiera: es **el exponente del que depende el escenario entero** —la glosa lo dice: «sin él, el
dato que da vuelta al escenario nunca sale»— y es criterio de éxito de A.

Ningún tema de A1 ni de A2 del registro inglés cubre la pregunta de sujeto. **Arreglo, coste 0
(es tabla):** se conserva `What happened?` como **bloque léxico** —igual que se aceptó
`We're fully booked`— y se le añade en la misma celda una segunda forma que sí sale del tema
citado y sirve para lo mismo:

| función | forma |
|---|---|
| asking, not guessing | `What happened?` · `When did the pain start?` |

Con eso la fila queda anclada de verdad (`Wh- + did + sujeto + base`), sigue siendo abierta, sigue
sacando el dato pivote, y **no añade fila** (A se queda en 9). Y la `rationale` del tema deja de
afirmar algo que el tema no hace.

### N-2 · MEDIO · `Mine is…` no tiene tema, y el genitivo que va al lado tampoco

`mine` aparece tres veces en todo el registro inglés a1/a2, y **en ninguna se enseña**: en
`object-pronouns` (a1) es un **distractor** de una opción múltiple cuya respuesta correcta es
`me`; en `comparatives` (a2) y `present-perfect-basic` (a2) es una palabra suelta dentro de un
ejemplo de otra cosa. Un exponente cuyo único rastro en el registro es una opción marcada como
incorrecta no está anclado.

**Arreglo, coste 0 (es tabla):** `That's my sister's number. Mine is…` → `That's my sister's
number. My number is…`, que queda anclado en `possessive-adjectives` (a1) y en `possessive-s`
(a1) —el genitivo del principio, que también hay que citar—. Si el redactor prefiere conservar
`Mine` por naturalidad, entonces hay que declararlo bloque léxico por escrito, como
`We're fully booked`, y no dejarlo pasar en silencio.

*(El mismo `mine` sin tema aparece en la fila de datos `Thursdays | … storeroom key mine` de B.
Ahí es lectura, no producción, y además telegráfica: se lee como nota. No pido cambio.)*

### N-3 · MEDIO · `yourself` enfático

`At… you pay… yourself.` (exponente de A) y `you pay the whole treatment yourself` (prosa de B).
`object-pronouns` (a1) enseña `me / him / her / them`; los reflexivos no están en ningún tema a1
ni a2. Es leve de comprensión —el escenario funciona sin el reflexivo— y se cae solo:
`At… you pay… , not the plan.` (tabla, coste 0). Si se conserva, que sea con la misma etiqueta de
bloque léxico. **No bloquea el nivel.**

### N-4 · MEDIO · la referencia al present perfect se quedó sin superficie esta mañana

`present-perfect-ever-never` se citaba, y fase 9 lo defendió, porque en la línea 42 vivía
`a patient who missed twice **already**`. El recorte de esta mañana quitó ese `already`, y la
pasada de la tarde reescribió la frase entera. **Hoy no queda ni un present perfect en las dos
fichas** (barrido hecho: `already`, `since`, `have been`, `has been`, `ever` → cero en inglés
vivo; las apariciones que quedan están en las notas en español y en las tablas de cambios).

Su `rationale` cita además una frase que **no está en ninguna de las dos fichas**
(`The clinic never texts me`). Dos salidas, las dos válidas:

- **(a)** conservar el slug y reescribir la `rationale` para que sea **solo** lo que de verdad
  hace: marcar la frontera («el present perfect de duración con for/since sería B1 y este
  escenario no lo pide»), sin inventar una línea;
- **(b)** —la que recomiendo— sustituirlo por `adverbs-frequency` (a1), que sí sostiene lo que la
  ficha tiene: `You never ask Dr. Restrepo for favors`, `never a call`, `no text from this clinic,
  ever`, `The clinic never texts me` si alguien lo dice. El tema enseña `never` y su posición
  antes del verbo principal.

## 4 · `grammarReferences` — lista para pegar

Los 11 slugs de hoy existen y sus 11 títulos coinciden **carácter a carácter** con el `title` del
tema en disco (comprobado). Los cinco que faltan son los que fase 9 pidió el 22 de agosto por la
mañana y **que la ficha nunca aplicó**; añado el sexto (`present-simple-negative`) porque dos de
las nueve filas de B son negativos de presente y ninguno tenía tema.

Bloque completo, ya con las dos `rationale` corregidas (N-1 y N-4, opción **b**):

```ts
grammarReferences: [
  { slug: 'should-advice', title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Ancla el acto recomendar en las dos direcciones: "What should I do tonight?" desde el paciente y "You should go to our Centro branch" desde el mostrador.' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El cuarto punto del cierre es un condicional: "If the pain goes to your ear, go to the emergency room tonight".' }, // a2
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La pregunta abierta que saca el dato pivote se construye con did: "When did the pain start?". "What happened?" convive con ella como bloque léxico, porque la pregunta de sujeto sin auxiliar no la enseña ningún tema del nivel.' }, // a2
  { slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'El dato que da vuelta al escenario es un pasado irregular afirmativo, no una pregunta: "A piece of my tooth broke on Sunday", "I left work at three thirty".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'La hora de llegada del jueves se pregunta y se contesta con have to: "What time do I have to be there?", y el cierre exige decirla en voz alta.' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El cuarto punto del cierre obliga al paciente a decir qué hará esta noche, y el criterio de éxito lo pide con esas palabras: "Tonight I will put something cold on my face", "I will come back at six fifteen".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Dosis, dinero y tiempo se dicen en cantidades: "two painkillers a day", "ten minutes early", "I have seventy thousand". Y el any de "Is there any other day?".' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'El paciente describe cómo está comparando, que es como se describe un dolor: "it\'s worse than yesterday", "it hurts more when I drink something cold".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Los dos movimientos que sostienen el escenario son un because y un but, y los dos están en la tabla propia de cada rol: "I can\'t come at seven, because I open the warehouse", "Maybe I have something later today, but I can\'t promise".' }, // a2
  { slug: 'imperative', title: 'El imperativo en inglés A1',
    rationale: 'Todo lo que hay que hacer esta noche se dice en imperativo, y también la reparación del mostrador: "Put something cold on your face", "Don\'t chew on that side", "Let me repeat it".' }, // a1
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Es el verbo del escenario entero, en los dos lados del mostrador: "Can you say it one at a time?", "Can I come back at six?", "I can wait here", "I can\'t come at seven".' }, // a1
  { slug: 'present-simple-questions', title: 'Present simple interrogativo en inglés A1',
    rationale: 'Las dos preguntas sin las que el paciente se va sin saber lo que necesita son de presente con do/does: "Does my plan cover it here?", "What days do you have after eight thirty?".' }, // a1
  { slug: 'present-simple-negative', title: 'Present simple negativo en inglés A1',
    rationale: 'El paciente se presenta y pone su tiempo sobre la mesa en negativo: "I don\'t have an appointment", "I don\'t work on Saturdays".' }, // a1
  { slug: 'possessive-s', title: 'El genitivo sajón en inglés A1',
    rationale: 'Dos movimientos del escenario son genitivos: la reparación del contacto, "That\'s my sister\'s number", y la puerta que el mostrador cierra sin dar razones, "That\'s another patient\'s time".' }, // a1
  { slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'Con there empieza la negociación por los dos lados: "Is there any other day?" desde el paciente y "there are forms and an X-ray" desde el mostrador.' }, // a1
  { slug: 'adverbs-frequency', title: 'Adverbios de frecuencia en inglés A1',
    rationale: 'Lo que nunca pasa es la mitad de los datos ocultos y se dice en presente simple con never: "The clinic never texts me", "I never ask her for favors", "in writing only, never a call".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El escenario entero son horas —4:20, 4:45, 6:15, 7:00, 8:30— y el cierre exige la de la cita y la de llegada.' }, // a1
]
```

**Trampa del sufijo, comprobada en disco:** `connectors-a2` **lleva** sufijo y los otros ocho de
a2 **no** (`should-advice`, `first-conditional`, `past-simple-questions`, `past-simple-irregular`,
`have-to-must`, `will-future`, `quantifiers`, `comparatives`). Citar `connectors` a secas, o
`quantifiers-a2`, devuelve `null` en las dos direcciones.

## 5 · Prosa A2 leído — con lupa sobre las líneas de hoy

Las siete del recorte de la mañana y las tres reescritas por la tarde, una a una. Todo lo demás de
la prosa lo doy por A2 leído. **Coste medido con la función del contador canónico.**

| # | dónde | hoy | por qué se sale | arreglo | coste |
|---|---|---|---|---|---|
| **P-1** | A · `Where you are` | `That person has a hand on the face.` | `the face` sin poseedor no es inglés: se lee «la cara de alguien». La frase se reescribió hoy para quitar el absoluto nominal, y el arreglo dejó el artículo mal | `That person has a hand on their face.` | **0** |
| **P-2** | A · `You can't` 1 | `…before 5:00: you write to her, you never call.` | dos oraciones independientes pegadas con coma y con el contraste **implícito**. El A2 lo lee como secuencia («escribes… y nunca llamas»), no como oposición. Y `but` es el conector estrella del nivel, con tema citado | `…before 5:00: you write to her, but you never call.` | **+1** |
| **P-3** | A · `You can't` 2 | `…: not the name, not the reason.` | el recorte de la mañana quitó el `and` y dejó un paralelismo retórico por yuxtaposición. En A2 leído, una lista de dos se cierra con `and` | `…: not the name, and not the reason.` | **+1** |
| **P-4** | A · `Only you know` 1 | `At 5:20 today you see a patient who missed twice.` | presente simple con valor de **futuro programado**. No lo enseña ningún tema de A1 ni de A2 —el futuro de agenda del nivel es `present-continuous-future-a2`, «planes concretos»—, así que la lectura por defecto es la habitual, y choca con `today`. El lector A2 no sabe si es una costumbre o una cita | `At 5:20 today you are seeing a patient who missed twice.` · **No deshace la pasada de calcabilidad:** el criterio de H13-2 era «dicha a B, que no atiende pacientes, no significa nada», y eso se conserva igual | **+1** |
| **P-5** | A · `You can't` 3 | `You can't send anyone away without…` | phrasal separable con pronombre indefinido en medio — la construcción que la caja prohíbe en el bloque de estructuras. Aquí es lectura, pero el alumno la va a copiar | `You can't let anyone leave without…` | **0** |
| **P-6** | A · `You did it if` | `you said **who pays, how much, and when**` | cadena de tres interrogativas incrustadas. Fase 9 la señaló, se corrigió en el cierre común (`the price, and who pays it`) y **se olvidó aquí**: hoy los dos sitios que deben decir lo mismo dicen cosas distintas | `you said **the price, and who pays it**` — misma redacción que el punto 2 del cierre | **0** |
| **P-7** | B · toolkit | `**5**: hurting is not enough, say what **you** lose.` | gerundio en función de sujeto. `like-ing` (a1) cubre `-ing` **después de like**, no el gerundio sujeto | `**5**: pain is not enough, say what **you** lose.` | **0** |
| **P-8** | A · cabecera | `distance and calm, also for a no` | `a no` sustantivado. Fase 9 lo dejó como opcional por presupuesto; hoy hay aire | `distance and calm, also when you say no` | **+1** |

**Líneas de hoy que SÍ pasan**, para que nadie las reabra:

- B `Your work starts too early, and on Thursday you start even earlier.` — quitar `in Girón` no
  deja hueco: Girón está en la oración anterior y en la fila `Work`. ✅
- B `you are in a dental clinic in Cabecera, with no appointment and your hand on your face.` — el
  `with` + sintagma no es el absoluto nominal que se corrigió en A; se lee sin reconstruir nada. ✅
- B `…you feel the sharp edge when you talk.` — el referente se puentea con la oración anterior
  («broke a small piece»), que es un paso de inferencia corto y normal en A2. ✅
- A `**6** when they push about another patient.` — es una lista telegráfica de bloques, y `push`
  es la palabra que usa la propia caja en su bloque 6. ✅
- A `Three chairs were empty this week, and the clinic counts them against you, like every patient
  who leaves for the corner clinic.` — es la oración más larga de la ficha (22 palabras) y roza el
  techo de §11, pero la comparación es corta y `count against` calca del español. ✅ Observación,
  no cambio.

## 6 · Tablas y glosas — coste cero, porque el contador no las mide

Cinco defectos de nivel **de lectura** dentro de tablas. Ninguno cuesta una palabra del techo.

| # | dónde | hoy | por qué | arreglo |
|---|---|---|---|---|
| **T-1** | B · exponentes, glosa reescrita **hoy** | `the two things nobody tells you unless you ask` | `unless` no está en `connectors-a2` (because, so, although, however, but) ni en ningún tema a1/a2: es B1, y encima es un condicional negativo. La glosa vieja (`the two things you leave without if nobody asks`) usaba `if`, que sí está | `the two things nobody tells you if you don't ask` |
| **T-2** | B · exponentes, `comparing the pain` | `…which is how pain gets described` | pasiva con `get` — prohibida por la caja — dentro de la instrucción que enseña a comparar | `…the way people describe pain` |
| **T-3** | B · exponentes, fila renombrada **hoy** | etiqueta `saying what you need` / glosa `say what you are before they ask` | la etiqueta cambió y la glosa se quedó con la vieja: `say what you are` no dice nada y no concuerda con la etiqueta nueva | `say what you need before they ask` |
| **T-4** | B · exponentes, `what broke, and when` | `…it comes out if they ask something open` | la prosa se corrigió a `an open question` y la tabla se quedó en `something open`, metalengua sin glosar. Dos nombres para lo mismo en la misma ficha | `…it comes out if they ask an open question` |
| **T-5** | B · exponentes, `asking for another day` | `…if they hint at something later today` | `hint at` no es A2 y no está glosado en ninguna de las dos fichas | `…if they say something about later today` |

Leves de tabla que **no** pido cambiar, para que la próxima ronda no las reabra: `a day of yours`
(doble genitivo), `read it out` (phrasal partido en una glosa), `said as a time`, `the fact in
front, not the no`. Se leen, no se producen, y cada una cuesta más de lo que arregla.

## 7 · Los datos duros son decibles

Dichos en voz alta uno a uno. **Ninguno hay que cambiar.**

| dato | cómo se dice | tema |
|---|---|---|
| `Tuesday, September 8, 4:20 p.m.` | *four twenty* / *twenty past four* | `telling-time` (a1) ✅ |
| `Thursday 10, 7:00 a.m.` · `Saturday 12, 9:00 a.m.` · `6:15` · `4:45` · `8:30` · `6:30` · `8:00 p.m.` | horas en punto, y cuartos y medias que el tema cubre | `telling-time` (a1) ✅ |
| `40,000` · `70,000` pesos | *forty thousand* · *seventy thousand* | numerales A1 ✅ |
| `310 218 44 71` · `310 542 88 06` | dígito a dígito, que es como lo exige el cierre | ✅ — sigue siendo el mejor acierto de la ficha: obliga a producir números sin pedir leer una cifra de diez dígitos |
| `two a day` · `ten minutes early` · `fifteen minutes` · `30 minutes` · `forty minutes` | ✅ | `quantifiers` (a2) |
| `7:00 a.m.–3:30 p.m., Monday to Friday` | ✅ | a1 |
| `Calle 36` · `Cabecera` · `Girón` | en español, son topónimos de Bucaramanga | ✅ correcto, no se traducen |

## 8 · Inglés americano

Barrido completo de las dos fichas y de la carta: **cero grafías británicas**
(`colour`, `centre`, `realise`, `practise`, `programme`, `licence`, `whilst`… → ninguna).
Y el léxico es el americano en los cinco sitios donde las dos variedades se separan:
`cell number` (no *mobile*), `emergency room` (no *A&E*), `wait in line` (no *queue*),
`delivery truck` (no *lorry*), `front desk` (no *reception*), `favors`, `September 8` en orden
americano, `p.m.` con puntos. `fully booked` y `opening` para el hueco de agenda son de uso
corriente en AmE. ✅

Un solo roce, y es opcional: `storeroom key mine` (fila `Thursdays` de B). En un almacén, el
americano dice `stockroom`. Es tabla, coste 0, y `storeroom` también se entiende. Al criterio del
redactor.

## 9 · El presupuesto, medido

Aplicando los ocho arreglos de prosa (P-1…P-8) sobre una copia de la ficha y corriendo la misma
función del contador canónico:

| escenario | A | B |
|---|---|---|
| hoy en disco | 446 | 448 |
| con P-1…P-7 (los obligatorios) | **449** | **448** |
| con P-8 incluido (el opcional de `a no`) | **450** | **448** |

**Cabe todo**, pero P-8 deja a A al filo sin margen, que es la situación que esta ficha ya vivió
el 21 de agosto. Si el redactor quiere P-8, aquí está la compensación exacta, medida: en la línea
de toolkit de A, `at 4:20 p.m. it is **Good afternoon**` → `at 4:20 it is **Good afternoon**`
(**−1**, la hora ya lleva `p.m.` dos líneas más arriba y en la fila `Now`). Con ella: **A 449**.

Los arreglos de N-1, N-2, N-3, T-1…T-5 y el bloque `grammarReferences` **no cuestan ninguna
palabra del techo**: son tablas y bloque de código, que el contador no mide.

## 10 · Lo que NO hay que tocar

- La asimetría del vocabulario (A produce las palabras del mostrador, B las recibe).
- `referral note` sin definición en la ficha de B, con `emergency check` conservando la suya.
- `We're fully booked` como bloque léxico con fila propia de vocabulario. Y, por la misma regla,
  `What happened?` pasa a serlo: **acompañado**, no sustituido.
- El dictado dígito a dígito y el reparto del cierre en cuatro puntos con dueño.
- Los 6 minutos y los 9 turnos por rol, y las dos tablas de exponentes en orden alfabético por
  función —comprobado hoy: A `a, c, d, g, k, n, s, t, w` y B `a, c, c, f, p, p, s, w, w`, las dos
  correctas, y ninguna etiqueta nombra ya un momento—.
- El motor: el jueves a las 7:00 sigue siendo el mismo imposible con dos números detrás, la carta
  sigue entrando al terminar el turno global 5, el desenlace sigue siendo acuerdo. **Ninguno de
  los cambios de abajo lo toca.**

## 11 · Resumen de cambios, uno a uno

| # | qué | dónde | gravedad | coste |
|---|---|---|---|---|
| 1 | Añadir `will-future`, `past-simple-irregular`, `present-simple-questions`, `there-is-there-are`, `possessive-s` | bloque `ts` | **grave** — cinco estructuras de la ruta mínima sin tema; pedidas el 22 ago por la mañana y nunca aplicadas | 0 |
| 2 | `What happened?` + `When did the pain start?` en la misma celda, y `rationale` de `past-simple-questions` reescrita | exponentes A + bloque `ts` | **grave** — el tema citado enseña la regla contraria | 0 |
| 3 | Añadir `present-simple-negative` | bloque `ts` | medio | 0 |
| 4 | `present-perfect-ever-never` → `adverbs-frequency`, o `rationale` reescrita como nota de frontera | bloque `ts` | medio — hoy el slug no tiene superficie en la ficha | 0 |
| 5 | `Mine is…` → `My number is…` | exponentes B | medio | 0 |
| 6 | P-1 a P-7: siete líneas de prosa a A2 leído | fichas A y B | medio | **+3** (A 449, B 448) |
| 7 | T-1 a T-5: cinco glosas de tabla, `unless` la primera | exponentes B | medio | 0 |
| 8 | `yourself` → `not the plan`, o declararlo bloque léxico | exponente A | leve | 0 |
| 9 | P-8 (`a no`) con su compensación medida | cabecera + toolkit A | leve | +1 −1 |
| 10 | `storeroom` → `stockroom` | datos B | leve | 0 |

Devuelto a `habla-fichas-de-rol`. **Este informe no reescribe la ficha**: nombra el cambio, dice
cuánto cuesta y contra qué tema del registro se ancla.
