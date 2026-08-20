# Auditoría lingüística — módulo `sat-set-1-m1` (q01–q27)

- **Archivos auditados:**
  - `src/data/mocks/sat/blocks/sat-set-1-m1-cs.ts` (q01–q08)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-ii.ts` (q09–q15)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-sec.ts` (q16–q22)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-eoi.ts` (q23–q27)
- **Auditor:** auditor lingüístico (`sat-language-auditor`)
- **Fecha:** 19 de agosto de 2026
- **Alcance:** los 27 ítems. Primera pasada completa del módulo por esta lente; el bloque
  SEC se revisa por segunda vez, sobre las versiones del 19 de agosto de q16, q20 y q22.
- **Método:** (1) lectura de los 27 `stimulus` y de las 108 opciones como prosa académica
  estadounidense; (2) para q16–q22, nombrar la regla, sustituir las cuatro opciones en el
  hueco y comprobar cuántas sobreviven; (3) verificación externa de los hechos
  comprobables (correo británico de 1840, RAE 2014, daguerrotipo, espeleotemas siberianos,
  tubo de color, acceso libre en bibliotecas, CMOS 6.23).
- **No se ha tocado ningún `.ts`.** Este informe solo señala.

---

## 1. Veredicto

**NO APTO — 1 bloqueante, 17 mejoras.**

El bloqueante es un hecho falso en el `stimulus` de q27, no un defecto de construcción: la
clave de los 27 ítems se sostiene y ninguna regla del bloque de convenciones está inventada
ni en terreno en disputa. El módulo está a una corrección de texto de pasar esta lente.

| Recuento | Nº |
|---|---|
| Ítems revisados | **27** |
| Ítems con **dos opciones publicables** | **0** |
| Ítems con **regla inventada o en disputa** | **0** |
| Ítems con **hecho falso** | **1** (q27) |
| Ítems con mejoras de prosa o de hecho matizable | 15 |
| Ítems limpios sin observación | 8 (q06, q07, q08, q10, q12, q17, q18, q19) |
| Calcos del español detectados | **0** |
| Mezclas de norma británica/estadounidense | **0** |

---

## 2. Lo que tumba (BLOQUEANTE)

### L-01 · q27 · dos hechos falsos sobre la primera década de la fotografía

> «The description is not baseless: **exposures lasted several minutes, the apparatus was
> too heavy to move from room to room**, and anyone who shifted position during that time
> ruined the picture.»

**Qué está mal.** Las dos afirmaciones se enuncian en la voz del texto como pruebas de que
la descripción «no carece de base», y las dos son falsas para el periodo que el propio
texto acota («the first decade of photography», es decir 1839-1849):

1. **Exposiciones de varios minutos.** Cierto en 1839 (de 3 a 15 minutos). Desde 1840-41,
   con las lentes rápidas y los aceleradores de bromo, el retrato bajó a **20-40 segundos**,
   y a mediados de la década a segundos. El primer estudio de retrato del mundo abrió en
   Nueva York en **marzo de 1840** justamente porque la exposición ya lo permitía. El texto
   se contradice a sí mismo: habla de «the portraits that survive from those years», y con
   varios minutos de exposición no hay retrato que sobreviva.
2. **Aparato intransportable.** El equipo de 1839 era pesado (≈50 kg el conjunto Giroux),
   pero se movió muchísimo: estudios en pisos altos de edificios comerciales desde 1840,
   daguerrotipistas ambulantes, campañas fotográficas por el Mediterráneo entre 1842 y 1844.
   Y el propio párrafo lo desmiente dos líneas más abajo: «another **arranged a room** so
   that the subject appeared to have been interrupted at work».

**Corrección propuesta** (no toca la clave, que sigue siendo `Nonetheless,`):

> «The description is not baseless: **exposures ran to minutes in the earliest years, the
> apparatus was heavy and slow to set up**, and anyone who shifted position during that
> time ruined the picture.»

Al cambiar el `stimulus`, R2 del blueprint obliga a devolver q27 entero a la cola de
auditoría, no solo la línea corregida.

---

## 3. Bloque Standard English Conventions (q16–q22) — la revisión ítem por ítem

Tres preguntas por ítem: ¿la `regla` declarada es una regla de verdad? ¿la cumple **una
sola** de las cuatro opciones? ¿está la regla en terreno en disputa?

| id | regla declarada | ¿regla real? | ¿clave única? | ¿terreno en disputa? | veredicto |
|---|---|---|---|---|---|
| q16 | subordinación: la segunda oración solo admite coma si un subordinante la vuelve dependiente | **Sí** — frontera de cláusulas | **Sí** (A y B dejan fragmento; C es empalme de comas) | No | **APTO** |
| q17 | concordancia sujeto-verbo con frase preposicional y relativa interpuestas | **Sí** | **Sí** (núcleo `list`, singular; `are`/`were` fallan número, `were`/`have been` además el tiempo) | No | **APTO** |
| q18 | par de signos del elemento no esencial | **Sí** — el inciso se cierra con el signo con que se abrió | **Sí** (la coma de `The sea otter,` está fuera del hueco y no se puede tocar) | No | **APTO** |
| q19 | pluscuamperfecto fijado por `By the time … arrived` + `for more than thirty years` | **Sí** | **Sí** (`grew` no admite el marcador de anterioridad; `are growing`/`have been growing` sitúan la acción en el presente) | No | **APTO** |
| q20 | dos puntos tras oración completa para introducir una enumeración | **Sí** | **Sí**, con la matización de §3.1 | No | **APTO con vigilancia** |
| q21 | modificador inicial no personal: el sujeto de la principal es aquello de lo que habla el modificador | **Sí** — modificador suelto | **Sí** (solo las burbujas están «trapped in the ice») | No | **APTO** |
| q22 | predicado compuesto: sin coma ni punto y coma delante de la conjunción | **Sí** | **Sí**, con la matización de §3.2 | No | **APTO con vigilancia** |

**Ninguna de las siete reglas está en terreno movedizo.** No hay *who/whom*, ni *singular
they*, ni preposición final, ni infinitivo partido, ni *that/which* (esta última salió del
ítem al rehacer q22, y bien salió: en la versión anterior del documento de textos era un
segundo eje de decisión dentro del mismo ítem).

**Norma estadounidense, comprobada en todo el módulo:** coma de Oxford en las cuatro series
que hay (`fish, crabs, and young seals` q18; `for color, an oil…, and a tree resin` q20;
`Arabic, Persian, and Urdu` q23; `crabs, worms, and snails` q01); cero grafías británicas
(`gray`, `meter`, `kilometers`, `toward` no aparece pero tampoco `towards`); punto dentro
de las comillas donde hay cita cerrada. No hay mezcla con el material de IELTS.

### 3.1 · q20 — la opción C se descarta por sentido, no por dibujo

`C — the same recipe,` produce: «…finds the same recipe, an earth or a mineral ground to
powder for color, an oil pressed from seeds to bind it, and a tree resin thinned into
varnish…». Por convención, una coma delante de una serie con `and` final se lee como
**serie de cuatro miembros**, y entonces «the same recipe» pasa a ser un ingrediente más,
que es absurdo. La lectura alternativa —aposición explicativa de tres miembros— es
justamente la que las guías de estilo estadounidenses resuelven con dos puntos o raya
precisamente porque la coma resulta ambigua. **La clave es única**, pero conviene tenerlo
anotado: la exclusión de C se apoya en el significado, y en un ítem de convenciones ese
apoyo es más blando que el estructural. Si alguien reclama, el argumento que hay que dar es
el de la serie de cuatro miembros, no el de la ambigüedad.

La cabecera del `.ts` ya prohíbe añadir una opción con raya. Correcto: tras oración
completa, la raya presenta la enumeración tan bien como los dos puntos y el ítem tendría
dos claves.

### 3.2 · q22 — la clave aguanta, pero el párrafo la maltrata

La regla examinada (predicado compuesto sin coma delante de la conjunción) es la norma:
*Chicago* 6.23 dice que la coma «no se usa normalmente» entre las dos partes de un
predicado compuesto, y su única excepción es **evitar una lectura errónea o marcar una
pausa**. Aquí la excepción no ampara a `D`, porque la coma no evita la lectura errónea:
**la provoca** —invita a leer «filled with water that winter» como participio y deja la
oración sin verbo principal—. Clave única, y defendible ante reclamación.

Dicho eso, la clave es una frase que un editor no publicaría tal cual, por dos motivos que
sí hay que arreglar (L-12): el camino de jardín de «The finished canal filled with water…»
y el demostrativo `that winter`, cuyo único antecedente disponible en el párrafo es **1825**
(«Digging began in 1825»), no el invierno de 1835-36 que el texto nunca menciona. El lector
tiene que reconstruir hacia atrás, desde «opened in the spring of 1836», un invierno que
nadie nombró.

### 3.3 · El módulo se contradice a sí mismo en la regla de q22

q22 puntúa como error la coma delante de `and` en un predicado compuesto. El módulo la usa
dos veces en su propia prosa:

- **q15, `stimulus`:** «deposition ran without interruption from about 402,000 to 381,000
  years ago**, and** then ceased for the hundred thousand years that followed» — sujeto
  único (`deposition`), dos verbos.
- **q14, opción A:** «He had known her from the moment she got off the bus**, and** said
  nothing of her family…» — sujeto único (`He`), dos verbos.

Ninguna de las dos invalida q22 (en q15 la coma cae bajo la excepción de pausa de CMOS
6.23; en q14 no). Pero es material del mismo examen enseñando lo contrario de lo que
califica, y es exactamente lo que citaría una reclamación. Ver L-09.

---

## 4. Hechos verificados

| id | Afirmación del texto | Veredicto | Nota |
|---|---|---|---|
| q01 | Marisma salobre de altísima productividad; el barro alimenta la cadena | ✅ | «thousands of these animals» por hectárea se queda muy corto (son millones de invertebrados), pero no es falso |
| q02 | — | n/a | Ficción |
| q03 | Filtros lentos de arena retiran la turbidez y se colmatan sin decantación previa | ✅ | Ingeniería sanitaria del XIX correcta |
| q04 | — | n/a | Ficción; vocabulario de xilografía correcto |
| q05 | — | n/a | Ficción |
| q06 | Ictiocoria en la llanura amazónica inundable | ✅ | Fenómeno documentado (peces frugívoros dispersan semillas de palmera) |
| q07 | Alfabetización medida por firmas en registros matrimoniales | ✅ | Método real de historia social |
| q08 | Canto urbano más agudo; efecto Lombard y correlación tono-volumen | ✅ | Debate científico real; «same set of muscles» es simplificación aceptable |
| q09 | Taller de restauración visible al público | ✅ | Práctica museística real |
| q10 | Sílice → viscosidad → estilo eruptivo; temperatura y agua disuelta cambian la viscosidad | ✅ | Volcanología correcta, incluida la dirección del efecto del agua |
| q11 | — | n/a | Ficción |
| q12 | Venta a plazos con reserva de dominio en la difusión de la máquina de coser | ✅ | Historia económica documentada |
| q13 | Líquenes sin raíz como bioindicadores; fruticoso sensible, costroso naranja tolerante | ✅ | Ecología correcta |
| q14 | — | n/a | Ficción |
| q15 | Espeleotemas siberianos como archivo de permafrost; 402-381 ka | ✅ | Coincide con MIS 11 y con el registro real (la cueva más septentrional no crece desde MIS 11) |
| q16 | Reforma postal de 1840: porte al remitente, tarifa única | ⚠️ | Ver L-13: el prepago no fue obligatorio hasta 1853-59 y la tarifa previa iba por tramos, no «por milla» |
| q17 | «Tuitear» aceptado en el diccionario académico en 2014 | ✅ | 23.ª edición, octubre de 2014 |
| q18 | Nutria marina como especie clave del bosque de kelp; más ligera que un humano adulto | ✅ | ~30 kg de media frente a ~62 kg de media humana |
| q19 | Trigo en el litoral argentino décadas antes del ferrocarril | ✅ | Colonias agrícolas desde 1856; el distrito es inventado |
| q20 | Pigmento molido + aceite + resina; tubo metálico tras 1840 | ⚠️ | Ver L-14: el color ya se vendía preparado en vejigas desde los años 1790 |
| q21 | Aire encerrado en burbujas; hasta 800.000 años en el plateau oriental | ⚠️ | Ver L-11: el aire de una burbuja es más joven que el hielo y promedia décadas, no «un día» |
| q22 | Canales justificados por el flete y desplazados por el ferrocarril | ✅ | Patrón histórico correcto; el canal es inventado |
| q23 | Ghazal: mil años, árabe → persa → urdu, pareados autónomos, final repetido | ✅ | El *radif* es lo habitual, no obligatorio; como nota de estudiante, admisible |
| q24 | Trasplante de haces frente a siembra en restauración de praderas marinas | ✅ | Práctica real; cifras inventadas y declaradas |
| q25 | Depósito cerrado en las bibliotecas públicas europeas «hace un siglo» | ❌ | Ver L-15: en los años 20 el acceso libre ya era mayoritario en las nuevas y se estaba generalizando |
| q26 | Cosecha fallida → pan caro → emigración → despoblamiento | ✅ | Patrón histórico libre, sin país real |
| q27 | Exposiciones de varios minutos; aparato intransportable | ❌ | **L-01, bloqueante** |

---

## 5. Mejoras, por ítem

Formato: `id · frase exacta · qué está mal · corrección`.

### L-02 · q04 · la clave no es una acepción del verbo examinado
«She would not **state** what the eye could be trusted to supply.» → clave `Render`.
`Render` (representar plásticamente) es lo que la frase significa en el pasaje, pero **no
figura como acepción de *state* en ningún diccionario**, mientras que `Declare` —que sí es
la glosa de manual— está entre las opciones. El pasaje excluye `Declare` solo porque el
complemento es contenido pictórico y en el texto nadie habla. Aguanta, pero es el ítem con
más superficie de reclamación del módulo. **Corrección barata:** dar al verbo un objeto
visiblemente pictórico —«She would not state a horizon the eye could be trusted to
supply»— y así `Declare` deja de tener lectura. Y para el blueprint: una clave de
*words-in-context* debe ser una acepción defendible del lema, no solo la paráfrasis
contextual; el plan pide justo lo contrario en la fila 4 y ahí nació el riesgo.

### L-03 · q04 · determinante ausente
«most of that time spent deciding **which of thirty marks** to cut away» → falta el
artículo: `which of the thirty marks`. Con el indefinido, la construcción no es inglés
corriente. (Menor, en la misma frase: «a fraction of the lines of the crowded harbor
scenes» encadena dos `of`; `a fraction of the lines in the crowded harbor scenes` lee
mejor.)

### L-04 · q03 · referencia pronominal ambigua
«Historians who read the engineers' report as an endorsement therefore miss its tone.
**Their** support was qualified, and the council knew it.» El antecedente plural más
cercano es `Historians`. Se resuelve por sentido, pero el ítem es de dificultad 2 y no hay
razón para pedirle eso al lector: `The engineers' support was qualified…`.

### L-05 · q02 · la clave añade lo que su propia razón le niega
Clave `Perched` para `stood`. La razón declarada dice «El verbo dice que ocupaba ese punto
en lo alto del cerro, **nada más**», y *perch* sí dice más: posición encaramada o
precaria. El ítem sobrevive por eliminación —`Towered`, `Ranked` y `Remained` caen— y la
prueba a ciegas lo respalda (0/8), así que **no lo devuelvo**. Lo que hay que corregir es la
razón, que argumenta contra la clave: reconocer que *perched* aporta la posición elevada
que el pasaje sí da («at the top of the hill», «the lanes below»).

### L-06 · q05 · opción A comprimida hasta la zeugma, y comillas del enunciado
Opción A: «It adds to Amara's preparations **one she packed rather than looked up**.» El
pronombre `one` tiene que ser a la vez algo que se empaca y algo que se consulta.
Corrección: `an item she packed rather than a fact she looked up`. En el enunciado, «the
sentence "She had even packed a second pair of socks." in the text?» mete un punto dentro
de la cita en medio de la oración: quitarlo.

### L-07 · q09 · léxico y pronombres en las opciones
- `stimulus`: «two **repairers** mend the museum's violins and guitars» — en un museo, el
  inglés natural es `restorers` o `conservators`.
- Opción A: «the violins and guitars are **played aloud**» — *aloud* no colocaciona con
  instrumentos (es de leer o hablar). `are played for visitors`.
- Opción D: «visitors watch the tools on the table **as it grows**» — el `it` queda a dos
  sustantivos de su antecedente (`a new instrument`). `as the instrument takes shape`.

### L-08 · q11 · enunciado y puntuación de las citas
- Enunciado: «The narrator keeps **trying his uncle's craft**…» — el inglés idiomático es
  `keeps trying his hand at his uncle's craft`.
- Las cuatro opciones son citas y solo `A` termina con punto dentro de las comillas; `B`,
  `C` y `D` no llevan puntuación final. Unificar: o las cuatro cierran como fragmento sin
  punto, o las cuatro como oración con el punto dentro (norma estadounidense).

### L-09 · q14 y q15 · el módulo usa la puntuación que q22 califica de error
- q14, opción A: «He had known her from the moment she got off the bus**, and** said
  nothing of her family to spare her explaining eleven years.»
- q15, `stimulus`: «deposition ran without interruption from about 402,000 to 381,000 years
  ago**, and** then ceased…»
Los dos son predicados compuestos con coma delante de `and`, que es exactamente el
distractor `D` de q22. Quitar las dos comas cuesta nada y cierra la vía de reclamación.
(De paso, en q14 A: `to spare her the explanation of eleven years` en vez de `to spare her
explaining eleven years`.)

### L-10 · q15 · la clave necesita «the year round»
Clave B: «It thawed below the first meter in every one of those millennia and **never
stayed frozen that deep** in any of them.» La regla del texto es «ground that stays frozen
**the year round** shuts the process off»; sin esa coletilla, la segunda mitad de la clave
es literalmente falsa (en invierno el suelo se hiela por debajo del metro todos los años).
Corrección: `and never stayed frozen at that depth the year round`.

### L-11 · q21 · el aire de las burbujas no es «de un día»
«each holding a little of **the air of that year**» / «those bubbles preserve the
atmosphere of **a day** that no one was there to record». El aire de una burbuja se cierra
decenas o cientos de años después que el hielo que la rodea y promedia varias décadas de
atmósfera. Como licencia literaria pasa; como afirmación de un texto de ciencia, no.
Corrección mínima: `the air of that time` y `the atmosphere of a world that no one was
there to record`.

### L-12 · q22 · camino de jardín y «that winter» sin antecedente
«Digging began in **1825**… The finished canal filled with water **that winter** and opened
in the spring of 1836…» El único invierno disponible en el párrafo es el de 1825, que es el
que el lector coloca primero y luego tiene que descartar. Y la clave se lee de entrada como
participio («The finished canal[,] filled with water…»), justo la ambigüedad que el ítem
mide. Corrección: `The finished canal filled with water in the winter of 1835 and opened in
the spring of 1836…` (las cuatro opciones cambian igual y siguen midiendo lo mismo).

### L-13 · q16 · dos matices de la reforma postal
- «In that year the post office **moved the charge to the sender**»: en 1840 el prepago
  quedó incentivado (1 penique prepagado frente a 2 al cobro), no impuesto; la obligación
  llegó entre 1853 y 1859. Precisión suficiente: `made prepayment by the sender the rule,
  charging double when it was not paid`.
- «the price rose **with every mile** the letter had traveled»: la tarifa previa iba por
  tramos de distancia y por número de hojas. `rose with the distance it had traveled`.

### L-14 · q20 · quién preparaba el color ya había cambiado antes de 1840
«What changed after 1840 was not the recipe but **who prepared it**. Once color could be
bought sealed in a metal tube, the apprentice who had spent his mornings at the grinding
slab was no longer needed.» Los colormen vendían color ya molido en vejigas desde los años
1790; lo que aportó el tubo de 1841 fue el sellado —el color dejó de secarse— y con él la
portabilidad. Corrección: mover la bisagra del párrafo de «quién lo preparaba» a «el color
pudo viajar sin secarse», que además enlaza mejor con el cierre («Painters carried their
work outdoors»). La enumeración de los tres materiales es correcta y no se toca.

### L-15 · q25 · «hace un siglo» es la fecha equivocada
«**A century ago** most public libraries in Europe kept their shelves closed to readers.»
En los años 20 el acceso libre ya se instalaba en toda biblioteca nueva y las antiguas
estaban pasándose a él (Clerkenwell abrió estanterías en 1894). La afirmación vale una
generación o dos antes. Corrección: `A hundred and fifty years ago` o `In the nineteenth
century`. El ítem no depende de la fecha: el contraste `Nobody browsed` / `now` funciona
igual.

### L-16 · q26 · «As a result,» se apoya en la oración equivocada
La causa está dos oraciones arriba (cosecha perdida, pan al doble) y en medio se cuela la
de los periódicos, que no causa nada. La clave es la única defendible de las cuatro, así
que el ítem se responde; pero un lector cuidadoso rechaza `As a result` precisamente por
lo que tiene delante. Corrección sin tocar opciones: subordinar la digresión —«Newspapers,
which recorded the shortage in unusual detail, printed weekly tables of grain prices and
sent correspondents through the affected villages.»— o moverla detrás del hueco.

### L-17 · documentación desalineada con lo publicado
`docs/sat-planes/sat-set-1-m1-textos-sec.md` sigue describiendo las versiones anteriores de
q16 (mecanismo `however` + punto y coma), q20 (tramo `the same three ingredients:`) y q22
(matriz de la relativa `which had taken eleven years to dig`), y el plan
`docs/sat-planes/sat-set-1-m1.md` mantiene en las filas 16 y 22 las reglas viejas. La
cabecera del `.ts` documenta el cambio, pero quien audite mañana leerá primero el plan.
Sincronizar los tres documentos. (Los `stimulus` sí coinciden literalmente: la divergencia
está solo en el tramo del hueco y en las opciones.)

### L-18 · q13 · dos retoques menores
«a team recorded **the share of stone wall covered** by two lichens» → `the share of the
stone-wall surface covered`. Y los rangos de las opciones usan guion (`29%-33%`) donde la
norma tipográfica estadounidense pide raya corta; si el motor no la admite, dejarlo escrito
como decisión y no como descuido.

---

## 6. Lo que se comprobó y está bien (para que no se vuelva a discutir)

- **Ninguna opción de ningún ítem se cae por gramática fuera de SEC**, que es donde el plan
  lo prohíbe. Las cuatro opciones de q01 (`Bolsters · Nourishes · Endorses · Withstands`) y
  las de q04 (`Declare · Concede · Render · Report`) comparten régimen: las cuatro producen
  frase gramatical al sustituir. R1 cumplida.
- **Paralelismo de las opciones**: q05, q06, q07, q08, q09, q10, q12, q13, q14, q15, q23 y
  q24 abren las cuatro con el mismo esqueleto. No hay ninguna opción que se pode por forma.
- **Coherencia de tiempos**: q07 y q20 alternan presente historiográfico y pasado narrativo
  correctamente; q11, q14 y q22 se mantienen en pasado; q10, q13 y q15 en presente
  científico con pasado para el estudio. Sin saltos.
- **Cero calcos del español**: no aparece `actually` por «en realidad», ni `assist to`, ni
  `realize` por «llevar a cabo», ni `in front of` por «opposite» (el único `in front of` es
  q27, «whatever stood in front of it», que es la colocación correcta con una cámara).
- **Enunciados**: los 27 usan la formulación oficial de College Board para su tipo
  («As used in the text…», «Which choice completes the text with the most logical
  transition?», «Which choice completes the text so that it conforms to the conventions of
  Standard English?», «Which finding, if true, would most strongly support…?»).
- **Terminología técnica**: xilografía (q04), filtración lenta (q03), viscosidad y sílice
  (q10), bioindicación liquénica (q13), espeleotemas (q15), kelp y especie clave (q18),
  materiales de pintura (q20), testigo de hielo (q21), praderas marinas (q24). Todo
  empleado con propiedad.

---

## 7. Qué hay que hacer para que esto quede APTO

1. **Corregir q27** (L-01) y devolverlo a la cola completo, por R2.
2. Aplicar L-09, L-10, L-12, L-13, L-14 y L-15 — son seis frases y cierran las vías de
   reclamación por hecho o por contradicción interna.
3. Decidir sobre L-02: o se retoca la última frase de q04, o se acepta por escrito que la
   clave es una extensión contextual y no una acepción, y se deja anotado en la razón de
   `A` para cuando llegue la reclamación.
4. El resto (L-03 a L-08, L-11, L-16 a L-18) es pulido de prosa y de documentación; no
   bloquea, pero es lo que separa un texto de examen de un texto publicable.
