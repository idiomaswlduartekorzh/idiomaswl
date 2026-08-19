# Auditoría de equidad y sensibilidad — `sat-set-1-m1` (q01–q27)

- **Archivos auditados:**
  - `src/data/mocks/sat/blocks/sat-set-1-m1-cs.ts` (q01–q08)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-ii.ts` (q09–q15)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-sec.ts` (q16–q22)
  - `src/data/mocks/sat/blocks/sat-set-1-m1-eoi.ts` (q23–q27)
- **Auditor:** auditor de equidad (puerta 10 del blueprint)
- **Fecha:** 19 ago 2026
- **Alcance:** 27 ítems. Se leyeron `stimulus`, `text`, `options`, `answer` y `meta[].razones`
  de los 27, más los cuatro documentos de textos (`docs/sat-planes/sat-set-1-m1-textos-*.md`).
- **Método:** cuatro pasadas, una por lente. La primera y la tercera se apoyaron además en
  conteo mecánico sobre los 27 `stimulus` (unidades, moneda, sistema escolar, deporte,
  festividades, marcas, geografía de EE. UU., nombres propios, pronombres de género y
  sustantivos de oficio). El auditor **no ha tocado ningún `.ts`**.

**Veredicto: APTO.** Cero ítems bloqueantes. Dieciséis mejoras —quince accionables dentro
de este módulo, una que es instrucción para los M2 del set—, ninguna de las cuales impide
publicar. La puerta 10 —«cero ítems que exijan conocimiento cultural, regional o económico
no dado en el texto»— **se cumple**: ninguno de los 27 ítems deja de poder responderse con
su texto delante y nada más.

---

## 0. Lo primero, porque es lo que más pesa

Este módulo es, en el eje cultural, **el más limpio que se puede pedir**, y conviene que
quede escrito antes que las trece pegas, porque las trece son de retoque y esto es de
diseño:

| Bandera roja del manual | Ocurrencias en los 27 ítems |
|---|---|
| Sistema escolar de EE. UU. (*sophomore*, *prom*, *GPA*, *high school*, *campus*) | **0** |
| Deporte de instituto estadounidense | **0** |
| Festividad local (*Thanksgiving*, *Halloween*, 4 de julio) | **0** |
| Marcas comerciales | **0** (q17 nombra el verbo *tuitear* y describe la red social sin nombrarla: «a verb coined from the name of a social network») |
| Precios en dólares, o cualquier moneda, como señal de caro/barato | **0**. Los tres textos con economía dentro (q12, q19, q22) miden **en relativo**: «cost a garment worker several months of wages», «the cost of a machine fell by more than half», «sold within a year for six times its old price» |
| Política interna estadounidense | **0** |
| Geografía de EE. UU. | **0**. Los escenarios son Gran Bretaña, Europa (×2), la Amazonía, Siberia, la Antártida oriental, la costa del Pacífico norte (sin país), Argentina y la lexicografía del español |
| Medida imperial | **1** (q16, ver E-01). Todo lo demás es métrico: hectárea, metros, kilómetros, porcentaje |

Que un módulo SAT de 27 ítems no tenga **ni un solo escenario en Estados Unidos** y sí
tenga la Amazonía, Argentina y el español como objeto de estudio no es casualidad: los
cuatro documentos de textos declaran la puerta 10 ítem a ítem. Se nota, y es lo que hace
que este informe sea corto de bloqueantes.

---

## 1. Lente 1 · Conocimiento previo no dado

Recorrido de los 27 preguntando lo mismo: *¿se puede responder con el texto y nada más?*
**Sí en los 27.** Lo que sigue son seis puntos donde el texto pide una pieza de mundo que
no da; en cinco de los seis esa pieza **no es la que decide la respuesta**, y por eso son
mejoras y no bloqueantes.

### E-01 · q16 · lente 1 · la única medida imperial del módulo, y contradice al propio documento

**Frase:** «the price rose with **every mile** the letter had traveled».

El estudiante de Bucaramanga no tiene la milla. Aquí no le cuesta el ítem —q16 es de
puntuación (`boundaries`), y la milla vive en la primera oración, lejos del hueco— y
además el sentido se recupera dos oraciones después: «fixed one low price for **any
distance** within the country». Pero es una bandera del manual, y la agrava que
`docs/sat-planes/sat-set-1-m1-textos-sec.md` afirme en su §Equidad (línea 387) que en este
lote «no hay sistema escolar estadounidense, ni deporte escolar, ni festividad, **ni medida
imperial**», con el texto de q16 citado veinte líneas más arriba, milla incluida. O el
texto o el acta están mal.

**Arreglo:** cambiar «the price rose with every mile the letter had traveled» por «the
price rose with **the distance** the letter had traveled». No toca el hueco, no toca la
clave, no toca el recuento de caracteres de forma apreciable (−7), y el hecho histórico
sigue siendo el mismo. Actualizar de paso el §Equidad del documento de textos.

### E-02 · q22 · lente 1 · «county» como unidad administrativa, dos veces

**Frases:** «the mills of the upper valley could then sell flour **beyond the county
line**» y «to a crowd **the county paper** counted at four thousand».

*County* no tiene equivalente en la división territorial colombiana (municipio,
departamento), y *beyond the county line* es además un giro hecho: se entiende de golpe
en Ohio y se descifra en Santander. Ninguna de las dos ocurrencias decide nada —q22 examina
predicado compuesto— y el texto ya usa un término neutro y transparente para lo mismo:
«the upper valley», «the same valley floor».

**Arreglo:** «beyond the county line» → «**beyond the valley**»; «the county paper» → «**the
local paper**». Dos sustituciones, cero efecto sobre la regla examinada. (q19 ya resuelve
esto mismo bien: usa «the district», que se lee sin diccionario.)

### E-03 · q04 · lente 1 · «Render» pide una acepción de taller **y** activa un falso amigo del español

**Opciones:** `Declare · Concede · Render · Report`, clave **C — Render**, sobre «She would
not **state** what the eye could be trusted to supply».

Dos cosas se suman aquí, y la suma es la que preocupa:

1. *Render* en el sentido de «plasmar, representar en la estampa» es registro de historia
   del arte. El texto lo sostiene —«which of thirty marks to cut away», «the scene reads at
   once»—, así que el camino existe; pero es el único ítem del módulo cuya clave exige una
   acepción de dominio especializado y no una acepción general.
2. Para un hispanohablante, *render* llama a **rendir(se)**, y *rendirse* es exactamente el
   campo semántico del distractor **B — Concede**. El falso amigo no empuja hacia la clave:
   empuja a **descartarla** («render = rendirse, aquí no encaja») y a marcar B. Es
   funcionamiento diferencial del ítem contra el grupo lingüístico que va a presentarlo.

No es motivo para retirar el ítem —el SAT real usa *render* y el estudiante tiene que
aprenderlo—, pero sí para que no se le cobre dos veces.

**Arreglo (elige uno):**
- **Barato y sin tocar el ítem:** dejarlo, y escribir el falso amigo en la razón de C y en
  la de B —«*render* aquí no es *rendirse*: es *plasmar*»—, para que el repaso posterior lo
  convierta en aprendizaje en vez de en un punto perdido y sin explicar.
- **Si se quiere quitar riesgo:** sustituir C por **`Depict`**, que dice lo mismo sin falso
  amigo. Sube la facilidad del ítem, que está declarado dificultad 3, así que habría que
  endurecer un distractor a cambio. Recomendado solo si el calibrador de dificultad lo pide.

### E-04 · q07 · lente 1 · «upland parishes» obliga a leer *parish* como unidad territorial

**Frase (la última del texto, que es justo la que el ítem pregunta):** «it fits the market
towns their evidence comes from, and it says little about **the upland parishes**, where
schools arrived long before commerce did».

En Colombia *parroquia* es una unidad eclesiástica, no un pedazo de territorio con censo y
escuela. El ítem pide identificar la operación «concedo y acoto», y para verla hay que leer
«market towns» y «upland parishes» como **dos clases de sitio**. *Market towns* está
glosado por el propio párrafo («where merchants began keeping written accounts»); *upland
parishes* no lo está: la única aparición previa de la palabra es «**parish records**», que
tira del sentido eclesiástico, no del territorial.

**Arreglo:** en la última oración, «the upland parishes» → «**the upland villages**». El
texto ya ha instalado *village* dos veces («village schoolmasters», «The villages that
gained schools»), así que la sustitución conecta con vocabulario que el propio párrafo
enseñó y no cambia ni el hecho ni la lógica. «parish records» de la primera oración se
queda: ahí *parish* es adjetivo de un tipo de registro, que es su uso transparente.

### E-05 · q25 · lente 1 · «call number»

**Frase:** «A visitor copied **a call number** onto a slip of paper and handed it to a
clerk.»

Término de oficio bibliotecario y, además, el término estadounidense (en el Reino Unido,
*shelfmark*). Se descifra por lo que viene detrás —el empleado va al depósito y vuelve con
el libro—, y el ítem es de conector, así que no cuesta puntos. Lo anoto por completitud y
porque el arreglo es de una palabra.

**Arreglo:** «a call number» → «**a shelf number**», que se lee sin saber de bibliotecas.
Opcional.

### E-06 · q13 · lente 1 y 4 · «1,000 m»: la coma decimal colombiana cae justo en la fila que decide

**Frases:** la tabla del `stimulus` («`1,000 m · 30% · 29%`»), la clave A («climbed from 3%
at 20 m to **30% at 1,000 m**») y el distractor D («measured 3% at 20 m and **22% at 1,000
m**»).

En Colombia la coma es separador **decimal**: `1,000` se lee «uno coma cero cero cero». La
serie completa (20 / 100 / 400 / 1.000 m) hace que el orden se recupere solo, pero la fila
de los 1.000 m es **exactamente** donde se separan la clave y su distractor más cercano, y
la propia `razones.D` lo dice: «Solo la descarta quien baja la columna gris hasta la última
línea». Que el estudiante dude ahí por notación y no por lectura es el tipo de punto robado
que esta auditoría busca.

**Arreglo, y aquí hay que elegir con criterio:**
- El SAT real escribe `1,000`. Cambiar la convención **sería enseñar mal**.
- Por eso la recomendación es **no tocar la notación y quitar el número de en medio**:
  sustituir la cuarta distancia por **`800 m`** (y en las cuatro opciones, `1,000 m` → `800
  m`). La serie 20 / 100 / 400 / 800 conserva el salto de escala, no cruza el millar y no
  toca ni un porcentaje, así que el 2×2 de valores que tanto costó cuadrar en la sexta
  versión queda intacto.
- Si se prefiere mantener el millar por fidelidad al examen real —defendible—, entonces que
  el repaso posterior traiga la nota de notación. Lo que no vale es dejarlo sin decidir.

### Los otros veintiuno, revisados y limpios en esta lente

Los objetos que podían no ser cotidianos están glosados **en la misma oración que los
introduce**, que es la regla buena y aquí se cumple: la marisma y su cadena alimentaria
(q01), la tabla de mareas (q05, «She knew the distance, the hours of the tide»), el bosque
inundado (q06), el bosque de kelp y el erizo (q18), la aguja de red (q11), la venta a
plazos (q12, «agents sold on weekly payments and took the machine back when payments
stopped»), el liquen como bioindicador (q13), la estalagmita y el permafrost (q15, «ground
that stays frozen the year round»), el testigo de hielo (q21), la caja de pinturas (q20),
el ghazal (q23, con su glosa dentro: «couplets, **or pairs of lines**») y la pradera marina
(q24). Ninguno pide un dato de fuera.

Dos aciertos que merecen nombrarse: **q06** ocurre en la Amazonía y **q19** en Argentina —el
estudiante juega en casa—, y **q17** convierte la lexicografía del **español** en objeto de
un ítem de inglés, con el hispanohablante en ventaja y no en desventaja.

> Nota fuera de lente, para el auditor de originalidad: **Elmsford** (q03) es también el
> nombre de una localidad real del estado de Nueva York. El `meta` lo declara inventado y
> aquí no produce ninguna injusticia —nada en el ítem depende del sitio—, pero conviene que
> lo mire quien lleva la puerta 11.

---

## 2. Lente 2 · Contenido sensible

**Cero banderas bloqueantes.** No hay violencia, ni abuso, ni suicidio, ni enfermedad, ni
muerte —humana o animal— descrita, ni discriminación presentada sin marco. Ninguno de los
27 textos pone delante del estudiante algo que le cueste seguir leyendo con el cronómetro
en marcha.

### E-07 · q26 · lente 2 · hambruna y despoblamiento: se queda, pero que no haya un segundo

**Frases:** «The wheat harvest failed across the highland districts in 1846, and within a
single season the price of bread in the provincial capitals doubled» … «thousands of
families left the highlands for work in the coastal ports during the two years that
followed, and the census of 1850 found several hamlets standing empty».

Es el único texto del módulo que toca hambre y desplazamiento de población. Mi lectura es
que **se queda como está**: el tratamiento es agregado y estadístico, no hay una sola
persona sufriendo en escena, no hay muertos, no hay violencia, no se nombra país ni pueblo
real, y la salida se describe como económica («left … **for work** in the coastal ports»).
El SAT real publica textos así y el estudiante que va a presentarlo los va a encontrar.

Lo que sí pido es una decisión **de conjunto**, no de ítem: el desplazamiento forzado no es
historia lejana para un estudiante colombiano. Un texto así en 27 es contexto histórico;
tres repartidos entre M1 y los dos M2 del mismo set empiezan a ser un ambiente.

**Arreglo:** ninguno en q26. Anotar en `docs/sat-planes/` que el set 1 **ya gastó su cupo
de desplazamiento** y que `sat-set-1-m2-facil` y `sat-set-1-m2-dificil` no deben traer otro
texto de hambruna, éxodo rural o despoblamiento.

### Revisado y despejado, con el motivo

- **q10 (volcán).** Un texto sobre estilos eruptivos escrito para un país con volcanes
  activos podría rozar el Nevado del Ruiz. **No lo hace:** es puramente mecánico —sílice,
  viscosidad, burbujas—, no menciona daños, víctimas, pueblos ni evacuaciones, y no nombra
  ningún volcán. Correcto tal cual.
- **q06 (ictiocoria).** «they netted fish during the flood, **examined the stomachs** of
  more than four hundred». Implica sacrificio de animales, sin una palabra gráfica y en
  registro de método. Dentro de lo normal en un texto científico; no se toca.
- **q12 y q16 (pobreza).** «a machine still cost a garment worker several months of wages»;
  «Families who could not pay turned letters away at the door». Las dos van con marco
  histórico explícito y las dos son el eje del razonamiento del ítem, no color añadido. Es
  la manera correcta de traer desigualdad a un examen.
- **q20 (el aprendiz que sobra).** «the apprentice … was no longer needed». Cambio técnico
  contado sin dramatismo. Limpio.
- **q22 (el canal que arruina a sus inversores).** Sin víctimas, sin obreros muertos —que
  es donde este tipo de texto se suele torcer—. Limpio.
- **q19 (Argentina, 1883).** Comprobado a propósito: el texto **no** afirma que la tierra
  estuviera vacía antes del ferrocarril; dice lo contrario («the farms that filled those
  wagons were not new»), y «land that had been worth little» habla de precio, no de
  ocupación. No hay borrado de nadie.
- **q11 y q14 (los dos textos con carga emocional).** Vergüenza de un chico que no aprende
  el oficio; una mujer que vuelve y no la reconocen. Melancolía de cuento, no angustia.
  Limpios.

---

## 3. Lente 3 · Estereotipos y representación (mirando el conjunto)

### Los nombres, contados

Seis personas con nombre en 27 textos:

| Ítem | Nombre | Quién es | Origen del nombre |
|---|---|---|---|
| q02 | **Rosalía** | panadera, dueña del negocio | español/gallego |
| q04 | **Hanne Lindqvist** | grabadora (xilografía) | nórdico |
| q05 | **Amara** | caminante que planifica | igbo / italiano |
| q11 | **Teodoro** | tío, remendador de redes | español/italiano |
| q12 | **Ana Belmonte** | historiadora económica | español |
| q14 | **Nadia** | viajera que vuelve al pueblo | eslavo/árabe |

Más dos topónimos-institución: **Ferreira** (museo, q09, portugués) y **Elmsford** (q03,
inglés).

**Cero Johns y cero Marys.** Cinco tradiciones onomásticas distintas en seis nombres, y
ninguna anglosajona salvo el topónimo inventado. Esta es la prueba que el manual pide y la
pasa con holgura.

### Quién es qué

- **Los expertos con nombre son dos, y las dos son mujeres:** Ana Belmonte, historiadora
  cuya tesis sostiene el ítem entero (q12), y Hanne Lindqvist, artista cuyo criterio el
  texto defiende frente a sus críticos (q04). Ninguna es objeto: las dos son sujeto del
  argumento.
- **Ningún científico del módulo tiene género.** Biólogos, botánicos, investigadores,
  ecólogos, ingenieros, topógrafos, el equipo de sondeo, los buzos, los voluntarios, los
  editores, el director del museo, los dos restauradores, el conservador, el empleado de la
  biblioteca, el farero, el operador de cámara y el corresponsal aparecen los diecisiete sin
  un solo pronombre. El patrón «científico = él» **no puede formarse**, porque no hay
  material para formarlo.
- **Reparto de género en escena:** cinco textos con protagonista femenina (q02, q04, q05,
  q12, q14) y dos con protagonista masculino (q11, y el posadero de q14). Equilibrado, con
  el fiel del lado femenino.
- **Cuidado y alimento:** las dos figuras que dan de comer son mujeres —Rosalía y sus panes,
  la abuela y su infusión (q14)—. Es un eco del reparto clásico, pero queda contrapesado por
  la historiadora y la grabadora, y Rosalía es dueña de su negocio, no cuidadora de nadie.
  **No es un hallazgo; es una observación para que no se acumule en M2.**

### E-08 · q20 · lente 3 · el único masculino genérico del módulo

**Frase:** «the apprentice who had spent **his** mornings at the grinding slab was no longer
needed».

Es el único *he/his* que el módulo asigna a un oficio sin necesidad narrativa (en q11 y q14
los pronombres son de personajes concretos, y ahí están bien). El taller europeo de 1830
era masculino, sí, pero el texto no está afirmando eso: está usando el genérico por defecto.

**Arreglo:** «the apprentice**s** who had spent **their** mornings at the grinding slab
**were** no longer needed». Plural, más ajustado al taller real —había varios— y sin
genérico. El ítem examina dos puntos y una enumeración, tres oraciones más arriba: no se
roza.

### E-09 · conjunto · lente 3 · dos escenarios latinoamericanos, ningún experto latinoamericano

El módulo sitúa dos textos en América Latina (q06, Amazonía; q19, Argentina) y en los dos
la ciencia y la historia las hacen colectivos anónimos («Botanists working there»,
«Accounts of the Argentine wheat boom»). No es un defecto de este módulo —el anonimato es
justo lo que evita el estereotipo del §anterior—, pero sí una oportunidad que el set entero
puede dejar pasar: el estudiante nunca ve a alguien con su apellido firmando un hallazgo.

**Arreglo:** nada en M1. Anotar para `sat-set-1-m2-*` que, cuando toque nombrar a un
investigador —q12 demuestra que el módulo sabe hacerlo—, al menos uno lleve apellido
latinoamericano y esté en ciencias, no solo en humanidades.

---

## 4. Lente 4 · Accesibilidad del enunciado

**Lo estructural está bien:** cero enunciados con «todas las siguientes EXCEPTO», cero
dobles negaciones, cero condicionales encadenados en los 27. Los siete enunciados de SEC
(q16–q22) son literalmente idénticos entre sí, que es como debe ser. Los tres de
`transitions` (q25–q27) tienen diez palabras. La media del módulo es 17 palabras.

Lo que sigue son seis puntos donde el enunciado —o la opción— cobra sintaxis que el ítem no
quería medir.

### E-10 · q11 · lente 4 · 30 palabras y seis pronombres para dos personas

**Enunciado:** «The narrator keeps trying his uncle's craft when he is alone, but he never
lets his uncle see him attempt it. Which quotation from the text best illustrates that
claim?»

Es el enunciado más largo del módulo y encadena *his – he – he – his – him – it*. Los
referentes se recuperan, pero se recuperan **releyendo**, y el ítem quiere medir selección
de evidencia.

**Arreglo:** «**The narrator practices his uncle's craft in private but hides those
attempts from his uncle.** Which quotation from the text best illustrates that claim?»
19 palabras, dos pronombres, la misma afirmación con sus dos mitades intactas (que las
practique + que las esconda), que es lo que los cuatro distractores necesitan para seguir
funcionando como están.

### E-11 · q08 · lente 4 · 28 palabras con dos complementos apilados sobre el mismo núcleo

**Enunciado:** «Based on the texts, how would the author of Text 2 most likely respond to
**the explanation offered in Text 1 for the higher pitch of urban song**?»

*The explanation* lleva colgando un participio (*offered in Text 1*) y una preposicional
(*for the higher pitch…*), y el lector tiene que decidir que las dos dependen del mismo
sustantivo. Eso es análisis sintáctico, no comparación de textos.

**Arreglo:** «Based on the texts, how would the author of Text 2 most likely respond to
**Text 1's explanation of why urban songbirds sing at a higher pitch**?» 22 palabras, un
solo complemento, mismo referente exacto.

### E-12 · q09 · lente 4 · un phrasal verb partido, y un adjetivo con dos sentidos que apuntan al mismo sitio

**Enunciado:** «According to the text, what **sets** the museum's **busiest** room **apart
from** the rest of the museum?»

Dos cosas:

1. *set X apart from Y* es idiomático y aquí va partido por un sintagma de cuatro palabras.
   El estudiante que no lo tiene automatizado gasta tiempo en el enunciado.
2. *busiest* admite «la más concurrida» y «donde más se trabaja». En este texto la sala es
   **las dos cosas**, así que el segundo sentido apunta directamente a la clave («the room
   where the violins and guitars are mended») **sin necesidad de leer el pasaje**. Con el
   trabajo que ha costado la puerta 6 en este bloque, es un cabo que no conviene dejar
   suelto.

**Arreglo:** «According to the text, **what is unusual about the room that draws the most
visitors**?» Quita el phrasal, quita la ambigüedad de *busiest*, y sigue sin repetir el
«most visited room» del texto (que es lo que el diseño evitaba).

### E-13 · q10 · lente 4 · cuatro opciones negadas seguidas, y un término del enunciado que el texto usa una sola vez

**Enunciado:** «According to the text, why can a single **vent** erupt in both styles?»
**Opciones:** «The magma reaching it **is not equally** stiff each time…» · «…**does not
carry equal** silica each time…» · «…**does not give up** its gas at one rate…» · «The rock
above it **is not equally** sound each time…».

Las cuatro obligan a computar una negación para llegar a la idea afirmativa («varía»), y
una de ellas —«does not give up its gas at one rate»— es directamente opaca a primera
lectura. Además el enunciado abre con *vent*, palabra que el `stimulus` usa **una sola vez**
y en su última oración; el texto arranca con «The same volcano».

**Arreglo, en dos movimientos que no rompen el paralelismo R5:**
- Enunciado: «According to the text, why can **the same volcano** erupt in both styles?»
  (además de más claro, engancha con la primera oración del texto y no con la última, que es
  donde está la respuesta).
- Opciones, en positivo y con el mismo molde: «The magma reaching it **varies in
  stiffness**: heat and dissolved water leave one batch runnier than the one before» ·
  «**varies in silica**: one batch comes up rich in it and stiff, the next poor in it and
  runnier» · «**varies in how it releases gas**: gas gathers while the vent rests and then
  leaves all at once» · «The rock above it **varies in soundness**: every eruption cracks it
  further, and the next one meets a weaker lid». Mismo contenido, mismas longitudes, cero
  negaciones.

### E-14 · q13 · lente 4 · inversión negativa en el distractor D

**Frase:** «**at no distance did** flat orange cover fall below 28% or rise above 33%».

Negación antepuesta con inversión sujeto-auxiliar: es una construcción de nivel C1 y añade
dificultad sintáctica que el ítem —cuantitativo, `command-of-evidence`— no quiere medir. Es
además la única de las cuatro opciones con esa estructura, y las notas del archivo dicen que
la diferencia de sintaxis entre opciones es deliberada; se puede conservar esa diferencia
sin la inversión.

**Arreglo:** «…; flat orange cover **never fell below 28% or rose above 33% at any
distance**.» Dice exactamente lo mismo, mantiene D como la única que abre con dos lecturas
puntuales y cierra con una negación, y baja el coste sintáctico. (Comprobar después el
recuento de caracteres: el archivo lo tiene medido en 127.)

### E-15 · q15 · lente 4 · «that deep» como anáfora en dos de las cuatro opciones

**Frases:** A, «…and stayed frozen **that deep** for long spells in between»; B, «…and never
stayed frozen **that deep** in any of them».

*That deep* remite a «below the first meter», que está a doce palabras de distancia dentro
de la misma opción. C y D no usan anáfora: repiten «below the first meter of soil». El
resultado es que las dos opciones que exigen releer son precisamente A y **B, que es la
clave**.

**Arreglo:** en A y B, «that deep» → «**below that first meter**». Suma tres palabras a cada
una y las deja en el mismo régimen de lectura que C y D. Conviene remedir después las
longitudes (el archivo las tiene en 114/113/120/115).

### E-16 · q05 · lente 4 · el punto dentro de la cita corta el enunciado por la mitad

**Enunciado:** «Which choice best states the function of the sentence "She had even packed a
second pair of socks**.**" in the text?»

El punto antes de la comilla de cierre hace que el ojo dé la frase por terminada y encuentre
«in the text?» colgando. Es un tropiezo de medio segundo, pero es gratis quitarlo.

**Arreglo:** quitar el punto interior — «…the sentence "She had even packed a second pair of
socks" in the text?». (Es también lo que hace el SAT real al citar una oración dentro del
enunciado.)

### Revisado y despejado

- **q12**, «Which finding, **if true**, would most strongly support Belmonte's argument?»:
  el *if true* es la fórmula oficial de College Board, no un condicional encadenado. Se
  queda.
- **q13**, la tabla dentro del `stimulus`: comprobado en el renderizador. `stimulusStyle:
  'passage'` pinta en `.prac-passage-box__text`, que lleva `white-space: pre-wrap`
  (`src/app/globals.css:3053`), de modo que los saltos de línea de la tabla **sí** se
  conservan y las cinco filas se ven como cinco filas. Las columnas no quedan alineadas
  —fuente proporcional—, pero el separador `·` las mantiene legibles y ninguna fila es lo
  bastante larga para doblarse en móvil. No hay hallazgo aquí.
- **q15 y q23**, enunciados de 24 y 28 palabras: largos, pero de una sola lectura y con la
  estructura estándar del examen (`Based on the text, what can most reasonably be
  inferred…` / `The student wants to…`). Se quedan.
- **q23–q24**, notas en viñetas: se conservan en pantalla por el mismo `pre-wrap`. Bien.

---

## 5. Recuento

| | |
|---|---|
| **Ítems revisados** | **27** (q01–q27) |
| **Bloqueantes** | **0** |
| **Mejoras (banderas)** | **16** — E-01 a E-16. Quince se arreglan dentro de `sat-set-1-m1`; E-09 es una instrucción para los M2 del set |
| Banderas de lente 1 (conocimiento previo) | 6 — E-01 (q16), E-02 (q22), E-03 (q04), E-04 (q07), E-05 (q25), E-06 (q13) |
| Banderas de lente 2 (contenido sensible) | 1, no bloqueante — E-07 (q26) |
| Banderas de lente 3 (estereotipos y representación) | 2 — E-08 (q20), E-09 (conjunto del set) |
| Banderas de lente 4 (accesibilidad del enunciado) | 7 — E-10 (q11), E-11 (q08), E-12 (q09), E-13 (q10), E-14 (q13), E-15 (q15), E-16 (q05) |
| Ítems con al menos una bandera | **14 de 27** — q04, q05, q07, q08, q09, q10, q11, q13 (dos), q15, q16, q20, q22, q25, q26 |
| Ítems limpios en las cuatro lentes | 13 (q01, q02, q03, q06, q12, q14, q17, q18, q19, q21, q23, q24, q27) |
| Nombres propios de persona | 6 · 5 mujeres / 1 hombre · 5 tradiciones onomásticas · 0 anglosajones |
| Escenarios en EE. UU. | 0 de 27 |
| Medidas imperiales | 1 (q16, no decide ningún ítem) |
| Enunciados con «EXCEPT», doble negación o condicional encadenado | 0 de 27 |

*(De las quince banderas accionables dentro del módulo, trece se arreglan cambiando entre
una y veinte palabras. Las otras dos —E-03 y E-06— son decisiones de criterio y se explican
en §6.)*

---

## 6. Qué haría antes de publicar, por orden

1. **E-01 (q16, «every mile»)** — siete caracteres, y hoy el módulo se contradice con su
   propia acta de equidad. Es el único que yo consideraría obligatorio.
2. **E-08 (q20, «his mornings»)** — dos palabras, cero riesgo.
3. **E-02 (q22, «county»)** — dos sustituciones, cero riesgo.
4. **E-12 (q09) y E-13 (q10)** — son los dos enunciados que además pueden estar regalando
   respuesta sin el texto («busiest» = «donde se trabaja»; *vent* apuntando a la última
   oración). Quien los toque, que vuelva a pasar `scripts/sat-blind-test.mjs`: son los dos
   arreglos de esta lista que pueden mover la puerta 6, en el sentido bueno.
5. **E-10, E-11, E-14, E-15, E-16** — retoques de redacción; ninguno toca clave ni
   contenido. E-14 y E-15 obligan a remedir longitudes de opción (puerta 2) porque el
   archivo las tiene contadas al carácter.
6. **E-03 (q04, «Render»)** — decisión de producto, no de redacción: o se deja y se explica
   el falso amigo en la razón, o se cambia por `Depict` y se recalibra dificultad. Pasarlo
   al calibrador de dificultad antes de tocar nada.
7. **E-06 (q13, «1,000 m»)** — decisión de criterio: fidelidad al SAT real frente a ruido de
   notación en la fila que decide el ítem. Mi recomendación es `800 m`.
8. **E-07 y E-09** — no se tocan aquí; se anotan en los planes de `sat-set-1-m2-facil` y
   `sat-set-1-m2-dificil`.

---

## 7. Nota para el guardián

Este informe **no** ha escrito el acta `docs/sat-auditorias/sat-set-1-m1.json`: el encargo
era solo el informe, y el auditor no toca ni `.ts` ni `.json`. Quien integre debe rellenar
el bloque `auditorias.equidad` con `veredicto: "APTO"`, `banderas: 16` y una nota que
apunte a este archivo. Un acta que falta es un fallo, no una presunción de inocencia
(blueprint §4).
