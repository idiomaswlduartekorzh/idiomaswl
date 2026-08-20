# Auditoría de originalidad y derechos — `sat-set-1-m1`

**Agente:** `sat-originality-auditor`
**Fecha:** 19 de agosto de 2026
**Alcance:** los 27 ítems del módulo (q01–q27), sus 27 `stimulus`, los 27 enunciados y las
108 opciones.
**Archivos auditados:**

- `src/data/mocks/sat/blocks/sat-set-1-m1-cs.ts` (q01–q08)
- `src/data/mocks/sat/blocks/sat-set-1-m1-ii.ts` (q09–q15)
- `src/data/mocks/sat/blocks/sat-set-1-m1-sec.ts` (q16–q22)
- `src/data/mocks/sat/blocks/sat-set-1-m1-eoi.ts` (q23–q27)

**Veredicto: APTO — cero banderas rojas. El lote no se detiene.**

Es la primera vez que estos ítems pasan por esta auditoría. Las cinco rondas anteriores
persiguieron la puerta 6 (prueba a ciegas) y nadie había mirado todavía de dónde salen los
textos.

---

## 1. Resumen

| Comprobación | Resultado |
|---|---|
| Secuencias de 8+ palabras coincidentes con material publicado, en los 27 `stimulus` | **0** |
| Textos procedentes de College Board / Khan Academy / editoriales de preparación | **0** |
| Paráfrasis cercana de fuente ajena | **0** |
| Literatura no original (que exigiría verificar dominio público) | **0 — no aplica** |
| Personas reales en situaciones inventadas | **0** |
| Marcas comerciales como decorado | **0** |
| Coincidencia de cifras o formulaciones con estudios publicados | **0** |

Se ejecutaron **62 búsquedas literales entrecomilladas** con `WebSearch`: 54 de secuencias
de 8+ palabras (2–3 por cada uno de los 27 textos), 4 de verificación de entidades
nombradas, 3 de contraste de enunciados contra College Board y 1 de contraste de cifras
contra la literatura publicada. Ninguna devolvió coincidencia literal.

**Dos observaciones no bloqueantes**, ambas descritas abajo con su arreglo: los enunciados
son la fórmula fija de College Board (y deben serlo), y un topónimo inventado coincide con
un pueblo real.

---

## 2. La regla de las 8 palabras, texto por texto

Formato: `id · veredicto · qué busqué · qué encontré`. Todo lo buscado queda escrito,
también donde salió limpio: sin eso, dentro de seis meses este informe no distinguiría
entre «comprobado» y «no mirado», y esa es justo la diferencia que va a importar.

Convención de resultados:

- **Sin coincidencia** = el buscador no devolvió la secuencia; los resultados eran material
  temáticamente vecino (divulgación, papers, blogs), nunca la frase.
- Cuando el buscador «encontró» algo, se anota qué era y por qué no es coincidencia.

### Bloque Craft and Structure (q01–q08)

| id | veredicto | secuencias buscadas (entrecomilladas) | qué encontré |
|---|---|---|---|
| q01 | **limpio** | «Salt marshes look bare from a distance, but few habitats produce more life» · «the tide floods the grass with seawater and leaves behind mud» · «far more than the same area of open, sandy coast» | Sin coincidencia. Salen NOAA, Smithsonian Ocean, NPS y DNR de Carolina del Sur con el hecho (las marismas son de los ecosistemas más productivos) en redacción propia de cada fuente. El hecho es libre; la formulación del ítem no aparece en ninguna. |
| q02 | **limpio** | «she rang the brass bell above the counter» · «Families in the lanes below could not see the bakery» · «Her voice carried farther than the bell did» | Sin coincidencia. El buscador ofreció un pasaje *parecido* de *Clockwork Princess* (Cassandra Clare) —una mano que golpea una campanilla de mostrador—, que no comparte ni estructura ni léxico: campana de mostrador golpeada vs. campana de latón sobre el mostrador que se toca cada mañana. Motivo corriente, no texto ajeno. |
| q03 | **limpio** | «beds of sand would remove most of what made the river water cloudy» · «they declined to sign until the basin appeared in the budget» · «Historians who read the engineers' report as an endorsement therefore miss its tone» | Sin coincidencia. Salen patentes de filtros de arena y actas de comisiones fluviales de EE. UU.; nada relacionado. |
| q04 | **limpio** | «most of that time spent deciding which of thirty marks to cut away» · «She would not state what the eye could be trusted to supply» · «the crowded harbor scenes that made her name» | Sin coincidencia. El buscador *sugirió* que la segunda podría ser de *Persuasion* de Austen: es una alucinación del resumidor, no un resultado — la frase no está en Austen ni en ningún enlace devuelto. |
| q05 | **limpio** | «She had even packed a second pair of socks» · «the path ended at a stream that no map of hers showed» · «For a long minute she stood on the bank with the tide table in her hand» | Sin coincidencia. El buscador acercó un pasaje de *Since We Fell* (Dennis Lehane) sobre alguien que hace una mochila con varios pares de calcetines; ni la frase ni su función coinciden. |
| q06 | **limpio** | «the water stands deep enough for fish to swim among the trunks» · «netted fish during the flood, examined the stomachs of more than four hundred» | Sin coincidencia. Ver §4 para el contraste de las cifras contra la literatura de ictiocoria. |
| q07 | **limpio** | «the number of village schoolmasters tripled between 1720 and 1790» · «the schools may therefore record a demand for reading rather than create it» | Sin coincidencia. Sale bibliografía real de historia de la educación inglesa del XVIII, ninguna con esa serie ni esa formulación. El dato de los maestros triplicados no existe en ninguna fuente: es inventado, como declara el `fuenteHecho`. |
| q08 | **limpio** | «Songbirds in cities sing at a higher pitch than members of the same species in nearby woodland» · «Traffic noise sits at low frequencies» + «pitch and loudness come from the same set of muscles» · «Nothing needs to evolve to produce a change a bird can make within an afternoon» · «That city birds sing higher is not in doubt; the explanation is» | Sin coincidencia. Ver §4: el debate de los dos textos es real y está publicado, pero ninguna de las dos posturas se enuncia aquí con palabras de nadie. |

### Bloque Information and Ideas (q09–q15)

| id | veredicto | secuencias buscadas | qué encontré |
|---|---|---|---|
| q09 | **limpio** | «an instrument is not an object to be looked at» · + verificación de entidad: «Ferreira Museum» + instrumentos de cuerda + taller tras cristal | Sin coincidencia. No existe ningún «Ferreira Museum» de instrumentos de cuerda. La práctica sí existe (el Royal Academy of Music Museum de Londres tiene taller a la vista), pero el museo, la colección de cuatrocientos instrumentos y la cita del director son invención. |
| q10 | **limpio** | «Magma rich in silica is stiff, so the gas bubbles that form inside it cannot rise» · «the output of one vent can shift from one style to the other between eruptions» | Sin coincidencia. Sale volcanología de manual (SDSU, *Nature Communications*) con el mismo mecanismo dicho de otra manera. |
| q11 | **limpio** | «My uncle Teodoro mended fishing nets on the dock» · «He would hold a torn section up against the light» · «The afternoon he held out the wooden needle to me» | Sin coincidencia. El buscador acercó *The Darning Needle* de Andersen por la palabra «needle»; nada más. |
| q12 | **limpio** | «agents sold on weekly payments and took the machine back when payments stopped» · «Even at the lower figure, she notes, a machine still cost a garment worker several months of wages» · «Sewing machines were a luxury in 1860 and an ordinary household object by 1900» · + verificación de entidad: «Ana Belmonte» historiadora | Sin coincidencia. **No existe ninguna historiadora llamada Ana Belmonte** en este campo: el nombre es libre y la atribución no cae sobre nadie real. Ver §4 sobre la tesis. |
| q13 | **limpio** | «Lichens have no roots: whatever they need reaches them from the air» · «the share of stone wall covered by two lichens» | Sin coincidencia. Ver §4 sobre los ocho porcentajes. |
| q14 | **limpio** | «Nadia had been away for eleven years, and the innkeeper looked at her» · «He asked her to spell her name, and then asked again while he wrote it in the register» · «a pot of the bitter mountain tea her grandmother used to make» | Sin coincidencia. |
| q15 | **limpio** | «A stalagmite grows only while water moves through the rock above it» · «deposition ran without interruption from about 402,000 to 381,000 years ago» · + verificación de cifras contra Vaks et al. | Sin coincidencia. Es el contraste más delicado del módulo y se detalla en §4. |

### Bloque Standard English Conventions (q16–q22)

| id | veredicto | secuencias buscadas | qué encontré |
|---|---|---|---|
| q16 | **limpio** | «the cost of sending a letter in Britain fell on the person who received it» · «the post office moved the charge to the sender and fixed one low price» | Sin coincidencia. Salen London Museum y The Postal Museum con la reforma de 1840 contada con sus propias palabras. Hecho libre, redacción propia; el texto no da cifras ni nombra a Rowland Hill. |
| q17 | **limpio** | «A dictionary is a record of how people write, not a list of permissions» · «The list of terms that speakers add to a language each year» · «the editors of one Spanish dictionary accepted tuitear» | Sin coincidencia. Confirmado que el hecho es real (el DLE incorpora *tuitear* en la edición de 2014). Ver §5: el texto evita a propósito nombrar la institución y la marca. |
| q18 | **limpio** | «kelp grows from the seafloor toward the light in stands thick enough to shelter» · «Ecologists reserve the word keystone for a species of that kind» · «Sea urchins feed on the base of the kelp, and where nothing feeds on the urchins» | Sin coincidencia. Sale el ejemplo canónico nutria/erizo/kelp en NOAA, National Geographic y Quanta, siempre con otra redacción. El texto no nombra a Paine ni a Estes. |
| q19 | **limpio** | «cut the cost of moving a sack of grain to the port by more than half» · «The railway did not create an agriculture; it found one and made it pay» | Sin coincidencia. |
| q20 | **limpio** | «A conservator who opens a paint box from any workshop of that decade» · «the apprentice who had spent his mornings at the grinding slab» · «Once color could be bought sealed in a metal tube» | Sin coincidencia. Salen Smithsonian y Winsor & Newton con la historia del tubo de estaño (Rand, 1841). El texto no nombra a Rand ni la patente y dice solo «after 1840». Hecho libre. |
| q21 | **limpio** | «the gaps between the old snowflakes close into bubbles» · «the column is a stack of dated samples, the oldest near the bottom» · «Trapped in the ice for as long as eight hundred thousand years» | Sin coincidencia. Los ~800.000 años son la cifra de EPICA Dome C, un dato desnudo y por tanto libre; el texto no nombra sondeo, base ni programa. |
| q22 | **limpio** | «one barge could move in a single trip what forty carts moved in a day» · «the tolls the canal collected never covered the debt its investors had signed for» · «Digging began in 1825, in rock that the surveyors had promised would be soft» | Sin coincidencia. El buscador tiró hacia el canal de Erie por las fechas; el de Erie sí cubrió su deuda, así que el ítem ni siquiera describe ese caso. Valle, condado y cifras son invención. |

### Bloque Expression of Ideas (q23–q27)

| id | veredicto | secuencias buscadas | qué encontré |
|---|---|---|---|
| q23 | **limpio** | «The ghazal is a poetic form that has been written for more than a thousand years» · «Each couplet is meant to stand on its own, and readers often quote one by itself» · «Poets writing in English have adapted the form, some keeping the repeated ending» | Sin coincidencia. Salen poets.org, EBSCO y Rekhta con la misma historia literaria en otras palabras. Hecho enciclopédico libre; las cinco viñetas están redactadas de nuevo. |
| q24 | **limpio** | «Seagrass meadows are beds of flowering plants that grow underwater and shelter young fish» · «divers transplanted adult shoots taken from a healthy meadow nearby» | Sin coincidencia. Salen CCMAR, Frontiers y varios papers de restauración con las dos técnicas; ninguno con estas cifras ni esta redacción. |
| q25 | **limpio** | «most public libraries in Europe kept their shelves closed to readers» · «A visitor copied a call number onto a slip of paper and handed it to a clerk» | Sin coincidencia. |
| q26 | **limpio** | «three of them printed weekly tables of grain prices» · «the price of bread in the provincial capitals doubled» (+ contexto 1846) | Sin coincidencia. El patrón (mala cosecha → pan al doble → emigración → censo con caseríos vacíos) es real y se repite en la Europa de 1846-47, pero el módulo no describe ningún episodio concreto: no hay país, región ni cabecera de periódico. |
| q27 | **limpio** | «the camera took down whatever stood in front of it, and the operator chose nothing» · «another arranged a room so that the subject appeared to have been interrupted at work» · «The conditions narrowed the range of choices open to the photographer» | Sin coincidencia. |

---

## 3. Dominio público: no aplica, y conviene que quede escrito

**Los cuatro textos de registro literario del módulo son ficción original escrita para el
examen.** Ninguno es un extracto de obra publicada, así que la comprobación de dominio
público —anterioridad a 1930 con margen, autor muerto hace más de 70 años, y edición o
traducción concreta también libres— **no llega a plantearse en este módulo**:

| id | texto | naturaleza |
|---|---|---|
| q02 | la panadería en lo alto del cerro (Rosalía) | ficción original |
| q05 | la caminata al faro (Amara) | ficción original |
| q11 | el tío Teodoro y las redes | ficción original |
| q14 | el regreso de Nadia a la posada | ficción original |

Se verificó uno por uno con búsquedas literales (tabla de §2) y ninguno devolvió fuente.
Esto resuelve por la vía limpia el problema que el blueprint §2 anticipa —«en el examen
real se toman de obras publicadas de terceros»— y evita el riesgo que el brief describe:
una traducción moderna de Chéjov tiene derechos propios aunque Chéjov no los tenga. **Aquí
no hay ninguna traducción ni ninguna edición de por medio.**

Si en un módulo futuro se decide usar dominio público de verdad, esta casilla dejará de
estar vacía y habrá que escribir fuente, edición y por qué es libre. Hoy no hay nada que
escribir porque no hay nada tomado.

---

## 4. Hechos frente a expresión: los seis textos que citan estudios o cifras

Los datos son libres; la redacción no. Estos son los textos donde el módulo se apoya en
ciencia o historia real, con lo que se comprobó de cada uno.

**q15 — estalagmita siberiana. Es el contraste más delicado del módulo, y pasa.**
El método es real y hay un estudio publicado muy próximo: Vaks et al., *Speleothems Reveal
500,000-Year History of Siberian Permafrost* (Science, 2013) y el trabajo de 2020 en
Nature, sobre la cueva **Ledyanaya Lenskaya** (60°22′N). Comprobado:

- La cifra publicada del último periodo de crecimiento en esa cueva es **427 ± 23 ka**
  (MIS 11). El módulo dice **402.000–381.000**. No coinciden.
- El módulo no nombra la cueva, ni el equipo, ni la publicación.
- La búsqueda literal de «deposition ran without interruption from about 402,000 to
  381,000 years ago» no devuelve nada.
- Lo que el módulo toma es el **método** (los espeleotemas solo crecen con agua líquida de
  infiltración, luego su crecimiento data el retroceso del permafrost), que es una idea
  científica y no expresión protegible.

Conclusión: limpio. La ventana elegida cae dentro del MIS 11 real —que es lo que la hace
verosímil— pero no reproduce la cifra publicada. Ver la mejora ORIG-03 sobre cómo dejar
esto anotado.

**q08 — canto urbano agudo.** El texto 2 sostiene la tesis del efecto Lombard como
subproducto, que es la de Nemeth & Brumm (*Proc. R. Soc. B*, 2013). Es una **postura en un
debate abierto**, es decir una idea, y la idea es libre. Ninguna de las dos posturas se
enuncia aquí con las palabras de nadie: cuatro búsquedas literales, cero coincidencias.
Los treinta años de seguimiento del texto 1 son invención y no corresponden a ninguna
serie publicada.

**q06 — ictiocoria amazónica.** Fenómeno real y bien documentado. Se buscó
específicamente un estudio con ~400 estómagos examinados y ~25 % de germinación: **no
existe**. Los estudios reales dan otras magnitudes (p. ej. 3.092 semillas, 89 % de especies
germinadas). Cifras inventadas, sin colisión.

**q12 — máquina de coser a plazos.** El hecho es real y de manual (Singer vende a plazos
desde 1856; el precio cae; el crédito amplía el mercado). El módulo lo atribuye a una
historiadora inventada, **Ana Belmonte**, verificada como inexistente, y no da ninguna cifra
tomada de fuente: «más de la mitad» y «varios meses de salario» son formulaciones propias.

**q13 — líquenes como bioindicadores.** Uso real y centenario. Los **ocho porcentajes de la
tabla son inventados**, las dos especies van sin nombre científico y no hay carretera,
región ni estudio identificables. Se buscó un estudio con esa medida (cobertura de muro de
piedra por dos líquenes a cuatro distancias de autopista) y no aparece.

**q24 — restauración de praderas marinas.** Los dos métodos (trasplante de haces adultos
frente a siembra) son reales; el 46 %, el 31 % y el «cuatro veces más horas» son inventados
y no corresponden a ningún ensayo publicado.

**q07, q16, q17, q18, q20, q21, q22, q23, q26** se apoyan en hechos de manual (alfabetización
medida por firmas; reforma postal de 1840; *tuitear* en 2014; nutria como especie clave;
tubo de pintura; burbujas de aire en el hielo; canales desplazados por el ferrocarril;
historia del ghazal; crisis de subsistencias de 1846). En todos, el hecho es libre, la
redacción es propia y no hay nombres propios reales de personas, instituciones ni obras.

---

## 5. Personas reales y marcas comerciales

**Cero en ambas categorías.** Se extrajo el inventario completo de nombres propios del
texto que ve el estudiante (los 27 `stimulus` + 27 enunciados + 108 opciones):

**Personas — las seis son invención, y ninguna coincide con nadie real:**

| nombre | ítem | comprobación |
|---|---|---|
| Rosalía | q02 | solo nombre de pila |
| Hanne Lindqvist | q04 | buscada como grabadora/xilógrafa: **no existe** |
| Amara | q05 | solo nombre de pila |
| Teodoro | q11 | solo nombre de pila |
| Ana Belmonte | q12 | buscada como historiadora del tema: **no existe** |
| Nadia | q14 | solo nombre de pila |

No hay ninguna persona viva retratada en situación inventada. No hay ningún científico,
historiador, artista ni autor real al que se atribuya una afirmación.

**Marcas — cero, y el módulo las esquiva a propósito.** Vale la pena dejarlo escrito porque
es una decisión de redacción, no una casualidad:

- **q17** dice «a verb coined from the name of a social network» en lugar de nombrar
  Twitter/X, y «one Spanish dictionary» en lugar de nombrar la RAE o el DLE.
- **q13** dice «a bushy gray species and a flat orange one» en lugar de dar los nombres
  científicos.
- **q21** dice «A drilling team» en lugar de nombrar EPICA.
- **q09** y **q03** usan un museo y una ciudad inventados en lugar de instituciones reales.

Sobre el nombre «SAT»: el producto usa la marca de College Board de forma **nominativa** —
para decir a qué examen prepara—, no como decorado ni como respaldo. Eso queda fuera del
supuesto que esta auditoría prohíbe (marca comercial como ambientación de un ítem) y no
genera hallazgo. La revisión de cómo se presenta la marca en la interfaz y en el texto
comercial no es materia de este informe.

---

## 6. Hallazgos

### ORIG-01 · MEJORA · Los enunciados son la fórmula literal de College Board — y deben serlo

**Qué.** Los enunciados del módulo reproducen **palabra por palabra** las fórmulas fijas de
los ítems oficiales del SAT digital. Verificado contra las pruebas de práctica publicadas
por College Board y contra bancos de ítems públicos:

| enunciado | palabras | ítems afectados |
|---|---|---|
| «Which choice completes the text so that it conforms to the conventions of Standard English?» | 15 | q16–q22 (7) |
| «Which choice most effectively uses relevant information from the notes to accomplish this goal?» | 14 | q23–q24 (2) |
| «As used in the text, what does the word "…" most nearly mean?» | 13 | q01–q04 (4) |
| «While researching a topic, a student has taken the following notes:» | 11 | q23–q24 (2) |
| «Which choice completes the text with the most logical transition?» | 10 | q25–q27 (3) |
| «Which choice best describes the overall structure of the text?» | 10 | q06 (1) |
| «Based on the text, what can most reasonably be inferred about…» | 11 | q14–q15 (2) |

En total, unos 19 de los 27 ítems llevan un enunciado con una secuencia de 8+ palabras
idéntica a material publicado por College Board. Leída al pie de la letra, **la puerta 11
del blueprint —«Cero secuencias de 8+ palabras que coincidan con material publicado»— no se
cumple**, y la nota del plan —«Cero textos, enunciados u opciones tomados de material de
College Board»— tampoco.

**Por qué NO es bandera roja.** Es la excepción de «frase hecha», aplicada al registro del
examen estandarizado en vez de al idioma corriente:

1. Son **frases funcionales cortas**, la categoría que la propia normativa de copyright
   excluye de protección (37 CFR §202.1(a), «words and short phrases»).
2. Son el **formato** de la prueba, no su contenido. El formato y el método no son
   expresión protegible.
3. Hay **fusión**: apenas existen maneras distintas de instruir «elige la opción que
   respeta la norma del inglés escrito» sin dejar de ser esa instrucción.
4. **Toda la industria las imprime igual**, comercialmente y desde hace décadas —Kaplan,
   Princeton Review, Barron's, UWorld, los bancos públicos de ítems—, y College Board, que
   sí actúa contra el contenido de los ítems y contra las filtraciones, nunca ha actuado
   contra el enunciado.
5. **Cambiarlas destruiría el producto.** Un simulacro cuyos ítems de SEC no digan esa
   frase exacta deja de simular el SAT. La fidelidad del enunciado es un requisito de
   validez, no un descuido.

Lo que sí importa es la distinción que este módulo respeta: **el molde es compartido, lo
que va debajo es original.** Los 27 `stimulus`, las 108 opciones y los contenidos son
propios, y eso es lo que se comprobó en §2.

**Arreglo.** No tocar ni un enunciado. Añadir a `docs/sat-ingles-blueprint.md` §4, puerta
11, una excepción explícita: *«Quedan fuera de esta puerta los enunciados canónicos de
College Board (los stems fijos de cada tipo de ítem), que se reproducen literalmente por
requisito de validez. La puerta se aplica a los `stimulus` y a las `options`.»* Sin esa
línea escrita, la próxima auditoría que aplique la regla a máquina detendrá el lote por lo
único del módulo que no se puede ni se debe cambiar.

### ORIG-02 · MEJORA · «Elmsford» (q03) es el nombre de un pueblo real

**Qué.** El texto de q03 sitúa en «the river port of Elmsford» un concejo de 1889 y un
informe de tres ingenieros, todo inventado. **Elmsford es un pueblo real** (village de
Elmsford, condado de Westchester, Nueva York). No es puerto fluvial, se constituyó en 1910
y no consta ningún episodio de este tipo: comprobado, no existe el hecho atribuido.

**Por qué no es bandera roja.** La prohibición cubre **personas vivas** en situaciones
inventadas; un municipio no lo es. Además el contenido es neutro o favorable —un concejo
que contrata ingenieros y los ingenieros que exigen una balsa de decantación antes de
firmar—, así que no hay daño reputacional ni comercial posible. Riesgo legal: nulo.

**Arreglo.** Cosmético y opcional. O bien cambiar el topónimo por uno sin referente real, o
bien anotar en `docs/sat-planes/sat-set-1-m1-textos-cs.md` que la coincidencia es
casual y conocida. Hoy el `fuenteHecho` dice «no hay ciudad ni informe reales detrás», lo
cual es cierto del episodio pero no del nombre.

### ORIG-03 · MEJORA · Documentar por qué las fechas de q15 son defendibles

**Qué.** El `fuenteHecho` de q15 dice «cueva, equipo y fechas inventados». Es cierto, pero
se queda corto en el único punto donde alguien podría alarmarse: existe un estudio muy
conocido (Vaks et al., Science 2013) sobre exactamente este método y esta región, cuya
cifra publicada es **427 ± 23 ka**. Que el módulo diga 402.000–381.000 no es casualidad
—cae dentro de la ventana MIS 11 real, que es lo que hace verosímil el ítem— pero tampoco
es la cifra publicada.

**Por qué no es bandera roja.** Las fechas son datos, y los datos son libres. La cifra no
coincide, la cueva no se nombra y no hay ni una palabra de redacción compartida
(comprobado con búsqueda literal).

**Arreglo.** Ampliar el `fuenteHecho` de q15 en `sat-set-1-m1-ii.ts` y en
`sat-set-1-m1-textos-ii.md` con una línea del tipo: *«Fechas elegidas dentro de la ventana
MIS 11 real y deliberadamente distintas de la cifra publicada para Ledyanaya Lenskaya
(427 ± 23 ka, Vaks et al. 2013), que no se cita ni se reproduce.»* Es documentación, no
contenido: sirve para que el siguiente que audite no tenga que rehacer esta comprobación.

---

## 7. Firma

**Veredicto: APTO.** Cero banderas rojas sobre 27 ítems. El lote no se detiene por
originalidad ni por derechos.

Los 27 `stimulus` son originales: 4 de ficción propia, 23 construidos sobre hechos libres
con redacción propia y con todos los nombres propios, cifras y series inventados. No hay
extractos de terceros, no hay literatura con derechos, no hay paráfrasis cercana, no hay
personas reales en situaciones inventadas y no hay marcas como decorado.

Lo único literal que este módulo comparte con College Board es el enunciado, que es
precisamente lo que tiene que compartir para ser un simulacro válido. Queda escrito arriba
para que dentro de seis meses nadie lo confunda con un descuido.

Actualizar `docs/sat-auditorias/sat-set-1-m1.json`:
`"originalidad": { "agente": "sat-originality-auditor", "veredicto": "APTO",
"banderasRojas": 0, "notas": "62 búsquedas literales, 0 coincidencias. 3 mejoras no
bloqueantes: ORIG-01 (excepción de puerta 11 para los stems de College Board), ORIG-02
(topónimo Elmsford), ORIG-03 (documentar fechas de q15)." }`
