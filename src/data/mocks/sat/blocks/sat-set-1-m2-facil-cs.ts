import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Craft and Structure del módulo `sat-set-1-m2-facil` — ítems q01 a q08.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 1-8). Textos originales de WeLearn;
 * ni un pasaje ni una pregunta salen de material de College Board (blueprint §5).
 *
 * ⚠️ **Desde la novena versión el array NO va en orden de id.** El orden de pantalla es
 * `q02 · q01 · q03 · q04 · q07 · q06 · q05 · q08`, y cada id viaja con su contenido: el
 * ítem llamado `q05` es el séptimo que ve el estudiante. Está explicado abajo, con la
 * colisión que esto abre con el guardián.
 *
 * Las claves son las del plan y no se negocian ítem a ítem: cada id conserva la suya
 * —q01 B, q02 C, q03 D, q04 A, q05 B, q06 C, q07 A, q08 D— y en pantalla salen en el
 * orden C · B · D · A · A · C · B · D. El reparto de letras se defiende a nivel de
 * módulo: mover una sola aquí rompe la puerta 1 en el otro extremo del examen, donde ya
 * nadie la va a mirar.
 *
 * Los cuatro `words-in-context` llevan el enunciado del SAT digital —«Which choice
 * completes the text with the most logical and precise word or phrase?»— con el hueco
 * marcado en el texto. «As used in the text… most nearly mean?» es del SAT de papel y
 * aquí no aparece (plan, tabla de enunciados).
 *
 * ── Segunda versión, después de medir con panel ─────────────────────────────
 *
 * El panel de diez solucionadores sin los textos dejó el módulo en 44 % con el techo en
 * 35 %. De este bloque, **q05 y q06 los acertaron 9 de 10 sin leer**: los dos de
 * estructura y propósito. La causa es **R9/R12**: sin el texto gana la opción que suena
 * más completa o más «de examen», y esa era la clave en los dos.
 *
 * - **q05** ya compartía el arranque en las cuatro opciones; lo que las separaba era el
 *   cierre, y solo la clave tenía la forma matizada «lo que sí y lo que no». Se igualó la
 *   forma: las cuatro en «closes by saying X and Y», dentro de ocho caracteres.
 * - **q06** iba en cuatro moldes distintos («It excuses…», «It fixes…», «It gives…»,
 *   «It marks…»), y solo el de la clave nombraba un método. Se igualó también, a
 *   «It points to Sofía's <mitad de la frase> as the <papel> …», y se repartió dos y dos
 *   la mitad de la frase citada para que las novelas no señalaran solas a la clave.
 *
 * **q03** volvió del auditor de clave por gemelo de q01: los dos eran «X ______ Y: sigue
 * ahí / vuelve en su sitio, **pero**…» y los dos se contestaban con «conserva la forma,
 * pierde la sustancia», de modo que quien resolvía q01 contestaba q03 sin leer. Encima
 * `buries` repetía la metáfora de ocultar de la clave de q01, `masks`. Rehecho: toda la
 * evidencia va **antes** del hueco y la oración del hueco —«Whatever else such a version
 * gets right, it ______ the refrain»— no lleva ningún andamio que copiar; hay que volver
 * arriba. `buries` sale y entra `displaces`, que niega algo que el texto afirma dos
 * líneas más arriba (el estribillo vuelve en su sitio) y no comparte metáfora con q01.
 *
 * Correcciones menores de la misma ronda: q02 dejó de sostener `hurried` con el texto
 * («started the next before I had finished» → «asked the next as if I had finished») y
 * `well meant`, única opción de dos palabras, pasó a `considerate`; q03 define `couplet`
 * como `two-line couplet`; q04 explica la institución en vez de nombrarla y fecha la
 * devolución («returned the following Tuesday», que antes era `returned the next` y se
 * leía «al día siguiente»); q05 corrige un **dato falso** sobre el ciclo del flotador
 * (ver `fuenteHecho` de q05); q07 simplifica la sintaxis de la clave sin cambiar lo que
 * dice; y q08 iguala la coma de Oxford al resto del examen.
 *
 * Por **R2**, los siete ítems tocados vuelven enteros a la cola de auditoría y la prueba
 * a ciegas hay que repetirla sobre estas opciones.
 *
 * ── Tercera versión: q05 y q06, otra vez ───────────────────────────────────
 *
 * Igualar la forma no solo no arregló estos dos: los **empeoró**. El panel a ciegas pasó
 * de 9/10 a **10 de 10 en los dos**. Es el caso que motivó **R13** (blueprint §4 bis): en
 * estructura y función la fuga no es la forma, es el sentido.
 *
 * - **q05.** Con las cuatro opciones en el mismo molde, la clave era la **más general**:
 *   «qué cambia el registro nuevo y qué no» encaja en casi cualquier texto con esa forma,
 *   mientras que las otras tres nombraban contenidos concretos que podían estar o no. Lo
 *   genérico es la apuesta segura de quien no ha leído. Encima C decía casi lo mismo que
 *   B con otras palabras, y dos opciones que se solapan se cancelan entre ellas.
 * - **q06.** La misma fuga por el otro lado: de las cuatro funciones ofrecidas, la clave
 *   era la única que describía un texto **bien hecho**. Las otras tres —una excusa del
 *   narrador, una distancia de edades que no se usa, una duda que el personaje no tiene—
 *   eran funciones que ningún escritor competente le daría a esa frase. Los textos bien
 *   hechos son predecibles, así que se adivinan.
 *
 * Rehechos según R13: **las cuatro opciones al mismo grado de concreción, y cada
 * distractora es la descripción impecable de un texto ligeramente distinto**, no una
 * descripción torpe del texto que hay.
 *
 * - **q05** conserva el arranque común —el límite del barco y el ciclo del flotador, que
 *   el texto sostiene— y cambia los cuatro cierres. Los cuatro son ahora igual de
 *   concretos, los cuatro nombran dos miembros y tres de los cuatro son concesivos
 *   («granting», «admitting», «conceding»), para que la forma de concesión deje de marcar
 *   a la clave. Cada uno es un final creíble para un texto sobre este mismo tema:
 *   comparar cantidades de lecturas, conceder que la serie no es más larga, reconocer una
 *   laguna todavía abierta, pedir más años. Solo el pasaje dice cuál ocurre.
 * - **q06** deja de partir la frase en mitades: las cuatro opciones arrancan en «It pauses
 *   on Sofía's age and her reading to …», de modo que la pista de segundo orden —qué
 *   mitad se cita— desaparece del todo. Las cuatro funciones son de las que un buen
 *   escritor querría para un inciso así: presentar al personaje antes de que juzgue,
 *   apartarse por una vez de su punto de vista, explicar de dónde sale su interpretación
 *   y enfrentar dos edades. Tres se caen con el texto delante, y por un hecho comprobable
 *   cada una: el orden de las frases, un punto de vista que nunca estuvo dentro y un
 *   contraste que no vuelve a usarse.
 *
 * Longitudes medidas, no estimadas: q05 va de 221 a 229 caracteres (clave, 224) y q06 de
 * 128 a 133 (clave, 130). En ninguno de los dos la clave es la opción más larga.
 *
 * Las claves siguen siendo las del plan —q05 → B, q06 → C— y por **R2** los dos vuelven
 * enteros a la cola de auditoría: la prueba a ciegas hay que repetirla sobre estas
 * opciones, no sobre las anteriores.
 *
 * ── Cuarta versión: q08 (distractor muerto) y la familia q01/q03/q04 ───────
 *
 * La ciega del módulo bajó a 15,9 % y ninguno de los ocho filtra. Lo que quedaba no se ve
 * ítem a ítem.
 *
 * **q08 — dos distractores, un solo error.** (Las letras de este párrafo son las de
 * entonces; la quinta versión permutó el ítem y la opción del tercero nunca expuesto es
 * hoy la **A**.) B y D fallaban por el mismo camino: los dos
 * pedían **inventar** un dato que el texto 2 no da —B una limpieza posterior, D que el
 * modo de trabajar valiera solo para esos años—. Dos distractores con un error cuentan
 * como uno, y de D no se podía escribir «el estudiante que elige esta es el que…»: nadie
 * llega ahí leyendo mal, hay que traerlo de fuera. D se rehace **sobre un dato que el
 * texto 2 sí trae**, «exhibited two of the three»: el tercero, nunca expuesto, sería la
 * excepción. Ahora el fallo es una mala lectura, y encima tiene apoyo real, porque el
 * principio del texto 2 nombra tres actos —«prices, varnishes, and sells»— y al tercer
 * lienzo solo le consta el barniz. Para que siga siendo mala lectura y no segunda clave,
 * el texto 2 cierra alcanzando a los dos grupos por su nombre: «— not in the two that hung
 * on a wall, and not in the one that never did». **Esa cláusula es la que sostiene la
 * clave única: no se recorta.** B se queda como estaba y solo se reescribe su razón, que
 * ahora nombra a su estudiante —el que explica los contornos por pintura perdida después,
 * no por pintura que nunca se puso—, un error distinto del de D.
 *
 * **q01, q03 y q04 eran el mismo ítem tres veces.** Cambiaban de tema, de léxico y de
 * opciones, pero los tres se resolvían con el mismo algoritmo: una concesión que garantiza
 * que la forma sobrevive intacta —«unchanged in depth… on its own fixed cycle», «on time
 * and in the place the form requires», «leaves any trace at all»—, un hueco que pide el
 * verbo de pérdida cualitativa y un abanico con un intensificador y un positivo. Quien
 * aprende «tras una concesión del tipo *sigue ahí, pero*, elige el verbo de pérdida que no
 * toca la forma» contestaba tres de los cuatro de vocabulario sin leer el tema. Solo q02
 * se salía.
 *
 * Se rompe por **q04**, el más barato de mover. Texto nuevo —historia industrial— y otra
 * relación: la pregunta ya no es qué pierde un registro, sino **en qué orden ocurrieron
 * dos cosas**. No hay concesión, el hueco va en la primera oración y la clave no es un
 * verbo de pérdida. De paso desaparece una duplicación de tema que nadie había mirado: el
 * q04 viejo (un libro de préstamos que no dice lo que se le pide) hacía pareja con el q16
 * de SEC, cuyos libros del salinar «say less about the salt trade than about the men who
 * kept them». La clave sigue en **A**, la del plan.
 *
 * Con esto los cuatro `words-in-context` piden cuatro cosas distintas: q01, una señal que
 * se conserva entera y deja de distinguirse del fondo; q02, un adjetivo de manera deducido
 * de tres conductas; q03, qué se conserva y qué se pierde en una traducción; q04, la
 * dirección del tiempo entre dos edificios que se parecen.
 *
 * **Frases que no se pueden recortar.** Son las únicas que impiden una segunda clave y
 * parecen relleno de estilo. Quien acorte un texto por longitud, que empiece por otra:
 *
 * - q01 · «unchanged in depth» — sin ella, `reverses` y `amplifies` se defienden.
 * - q03 · «saying each time exactly what it said before» (cierra `generalizes` y
 *   `overloads`) y «one word closes every two-line couplet» (cierra `exhausts`: la
 *   repetición es de la forma y el persa la cumple igual). «on time and in the place the
 *   form requires» sostiene la premisa común de las cuatro opciones —todas son pérdidas
 *   que dejan intacto el retorno—. Actualizado en la sexta versión: hasta entonces esta
 *   línea cerraba `displaces`, opción que ya no existe.
 * - q04 · «The resemblance is exact; the order is not» (cierra `imitates`) y «nothing links
 *   it to them, no drawing, no letter, no recorded visit» (cierra `inspires`, que es el
 *   distractor fino: acepta la fecha y da el paso de más, de «fue antes» a «de ahí
 *   salieron»).
 * - q08 · **HISTÓRICO, no buscar en el código: este ítem se retiró en la novena versión.**
 *   La frase era «not in the two that hung on a wall, and not in the one that never did» y
 *   sin ella el ítem de los lienzos tenía dos claves. Las frases que no se pueden recortar
 *   del q08 actual —el del pozo— están en la novena versión, una por distractora.
 *
 * **Molde compartido en q05, q06 y q08 (aviso, no defecto).** Los tres llevan la misma
 * premisa en las cuatro opciones y solo la cola en disputa, y tres de ocho enseñan a leer
 * solo el final. Se deja, y por qué: en q05 y q06 el molde **es** el arreglo que cerró su
 * fuga (tercera versión), y en q08 la concesión compartida es lo que obliga a las cuatro
 * opciones a discutir el mismo objeto —los pasajes desnudos—; si cada una concede una cosa
 * distinta, el solucionador a ciegas vuelve a tener dónde agarrarse: elige la que suena
 * más «respondona», que es la fuga clásica de `cross-text-connections`. Cambiar la
 * redacción de la premisa sin cambiar su contenido es cosmético: la cola sigue siendo lo
 * único que decide. (Sigue vigente con el q08 de la novena versión: cambia el escenario,
 * no el molde — premisa compartida, «each band is …», y la cola en disputa.)
 *
 * **Dos arreglos de equidad, de la revisión hecha con un estudiante colombiano delante.**
 * Los dos están en la **entrada** del texto, que es donde un término opaco no cuesta un
 * matiz sino el pasaje entero:
 *
 * - **q06** · «across the landing» → «across the hall». `landing` (rellano) es de baja
 *   frecuencia y el escenario no se recupera hasta dos frases después, así que el
 *   estudiante empezaba a leer sin saber dónde estaba.
 * - **q07** · «gut strings» → «strings of gut instead of steel». Eran cuatro tecnicismos de
 *   música sin glosar en una sola cláusula; la tarea no depende de ninguno, pero son la
 *   puerta del texto. Se abre el primero y los otros tres se dejan estar: glosarlos todos
 *   convertiría la cláusula en un diccionario.
 *
 * Ninguno de los dos toca las opciones ni el reparto de longitudes —q06 sigue en 128-133
 * con la clave en 130, q07 en 79-83— y las palabras añadidas no aparecen en ninguna
 * opción, así que no se crea pista léxica. Longitud de texto: q06 89 «palabras de 6», q07
 * 101; las dos dentro de 25-150. (La cifra de q07 es de entonces: desde la décima versión
 * son 113,2, y sigue dentro de 25-150.)
 *
 * Por **R2**, q04 y q08 vuelven enteros a la cola de auditoría y la ciega se repite sobre
 * estas opciones. Claves del plan de entonces: B, C, C, A, B, C, A, A.
 *
 * ── Quinta versión: reparto de letras dentro del bloque ────────────────────
 *
 * El auditor de sesgo de conjunto midió el módulo entero (A7 B7 C7 D6, correcto) y luego
 * bloque a bloque: aquí, de ocho ítems, la clave **no estaba en la D en ninguno**. Quien
 * lo nota descuenta la última opción y sube del 25 % al 33 % sin leer nada. Es el defecto
 * que no se ve revisando ítem a ítem, solo contando.
 *
 * Cambio **puramente mecánico**: ni una palabra nueva en textos, enunciados ni opciones.
 * Se permutan las cuatro opciones de dos ítems y viajan con ellas sus cuatro razones.
 *
 * - **q03** · clave C → **D**. Permutación: `sharpens` y `flattens` intercambian sitio;
 *   `restores` y `displaces` se quedan. (Historia: la sexta versión cambió las cuatro
 *   opciones de q03; de este párrafo solo sigue vigente la clave, **D**.) Las cuatro eran
 *   de 8-9 caracteres, así que la posición no creaba pista de longitud, y ninguna de las
 *   cuatro aparecía en el pasaje.
 * - **q08** · clave A → **D**. Permutación: la clave y la opción del tercero nunca
 *   expuesto intercambian sitio; las de la limpieza posterior y las obras barnizadas se
 *   quedan. Las cuatro comparten premisa y solo discuten la cola: tres cuerdas de 109
 *   caracteres y una de 113, con la clave en 109 —ni la más larga ni sola en la más
 *   corta—. Solape léxico de la cola con los dos textos: 2/5 en la clave, entre 1/4 y 3/5
 *   en las otras tres; la clave sigue sin ser ningún extremo.
 *
 * Reparto del bloque después del cambio: **A×2 B×2 C×2 D×2**. Claves vigentes, y son las
 * únicas que valen de aquí en adelante: **B, C, D, A, B, C, A, D**.
 *
 * ── Sexta versión: el abanico de q03 (defecto de conjunto q01/q03) ─────────
 *
 * Romper la familia de tres por q04 (cuarta versión) dejó un **par**, y el par seguía
 * entero. q01 y q03 tenían las mismas cuatro ranuras y la clave en la misma:
 *
 *     ranura                                  q01         q03 (quinta versión)
 *     pérdida que no toca la forma → CLAVE    masks       flattens
 *     intensificador                          amplifies   sharpens
 *     positivo                                explains    restores
 *     niega la forma conservada               reverses    displaces
 *
 * En el mismo bloque y con dos ítems de por medio, quien resuelve q01 contesta q03 en diez
 * segundos sin volver al texto: un ítem regalado y setenta segundos de propina. Y q02
 * (`automatic`) paga la misma intuición en otro traje, así que **tres de los cuatro
 * `words-in-context` premiaban «la forma se conserva, la sustancia se pierde»**.
 *
 * El texto no se toca: está bien y su evidencia ya vive entera por encima del hueco
 * (tercera versión). Se rehace **el abanico**, con otro principio: **las cuatro opciones
 * son pérdidas y las cuatro dejan intacto el retorno** —cada pareado, puntual, en el lugar
 * que la forma pide—. La pregunta deja de ser «¿cuál de las cuatro es la pérdida que no
 * toca la forma?» —que se contesta descartando el positivo, el intensificador y el que
 * niega la forma, sin leer el tema— y pasa a ser «¿cuál de estas cuatro pérdidas nombra el
 * texto?», que solo se contesta comparando lo que hace la palabra persa («moves as the
 * poem goes») con lo que hace la inglesa («exactly what it said before»).
 *
 * Abanico nuevo: `generalizes` · `overloads` · `exhausts` · `flattens` (clave, **D**, la
 * del plan). Ninguna es positiva, ninguna intensifica y ninguna mueve el estribillo de
 * sitio: las tres ranuras que q01 enseña a descartar no existen aquí, de modo que el
 * algoritmo de q01 no elimina ni una opción. Cada distractora es un camino real y cae por
 * una cláusula distinta:
 *
 * - `generalizes` — quien supone que se busca una palabra ancha donde quepan las tres
 *   acepciones. La versión hace lo contrario: «settles on one», «exactly what it said
 *   before».
 * - `overloads` — quien supone justo lo inverso, que esa única palabra carga con las tres
 *   a la vez. Cae por la misma frase leída del otro lado: nunca dice más de lo que dijo.
 * - `exhausts` — quien oye el defecto en la repetición y no en el sentido. La repetición
 *   no la añade el inglés: es de la forma, y el persa la cumple igual —«one word closes
 *   every two-line couplet»—.
 *
 * Longitudes: 11, 9, 8 y 8 caracteres, con la clave en 8 y acompañada por `exhausts`; ni
 * la más larga ni sola en la más corta. Ninguna de las cuatro aparece en el pasaje. Dos
 * son transparentes para un hispanohablante (`generalizes`, `exhausts`) y dos no
 * (`overloads`, `flattens`), así que el parecido con el español tampoco señala a la clave.
 *
 * Lo que piden ahora los cuatro `words-in-context`: q01, una señal que se conserva entera
 * y deja de distinguirse del fondo; q02, un adjetivo de manera deducido de tres conductas;
 * q03, **cuál de cuatro pérdidas posibles es la que el texto nombra**; q04, la dirección
 * del tiempo entre dos edificios que se parecen.
 *
 * Por **R2**, q03 vuelve entero a la cola de auditoría y su ciega se repite sobre estas
 * cuatro opciones, no sobre las de la quinta versión. Clave sin cambios: **D**.
 *
 * ── q08 y el racimo de pintores: por qué NO se ha tocado ───────────────────
 *
 * **HISTÓRICO.** La novena versión retiró este ítem y el racimo se deshizo por sí solo.
 * Se conserva el razonamiento porque el criterio —mover un ítem de oficio cuesta rehacer
 * la cadena de cláusulas que sostiene su clave única— vale para el siguiente que se mueva.
 *
 * El auditor de conjunto midió un racimo real: q08 y q11 comparten `painter`, `canvases`,
 * `studio` y `unfinished`, el distractor B de q11 nombra literalmente el objeto de q08
 * («the unfinished canvases … into the studio»), y con q18 son tres ítems del módulo en un
 * museo. Se estudió mover q08 y se decidió **no moverlo**. Las razones, para que nadie lo
 * intente sin leerlas:
 *
 * 1. Mover q08 no es cambiar palabras: es cambiar de oficio, y con el oficio se rehacen
 *    los dos textos, las cuatro opciones, las cuatro razones y la ficha de hecho. La clave
 *    única de este ítem cuelga de una cadena de cuatro cláusulas que habría que
 *    reconstruir entera en el oficio nuevo: «exhibited two of the three», «He varnished
 *    all three himself», «a painter who prices, varnishes, and sells a canvas has declared
 *    it done» y «not in the two that hung on a wall, and not in the one that never did».
 *    Ese es el arreglo de la cuarta versión, y es lo que se pone en juego.
 * 2. La distractora B exige un oficio donde **algo pueda perderse después** —una limpieza
 *    que se lleva pintura—. Los oficios que lo permiten (pintura, tapiz, manuscrito) son
 *    los que devuelven el ítem al museo; los que no (ebanistería, relojería) dejan a B sin
 *    camino y el ítem recupera el distractor muerto que la cuarta versión cerró.
 * 3. Los dos oficios ajenos al museo que sí sostendrían las cuatro opciones chocan con
 *    vecinos de este mismo bloque: un astillero, con los barcos de q05; un taller de
 *    instrumentos, con la música de q07. Se cambiaría un racimo por otro.
 *
 * El cambio barato —`canvases` → `wood panels`, `studio` → `workshop`, `unfinished` →
 * `incomplete`— quita las palabras compartidas y la colisión literal, pero deja en pie lo
 * que de verdad emparenta los dos ítems: **obra de un pintor que una institución clasificó
 * mal**. Por medio arreglo no compensa pagar otra vuelta a la cola de auditoría (R2) sobre
 * el `cross-text-connections` más frágil del bloque. Recomendación: deshacer el racimo en
 * **q11**, que no vive en este archivo y cuyo oficio no sostiene ninguna cadena de clave
 * única.
 *
 * ── Séptima versión: la clave más corta de q01 ─────────────────────────────
 *
 * Medidas las cuatro opciones de cada ítem, q01 salía con la clave sola en el extremo
 * corto: `reverses` 8, **`masks` 5**, `explains` 8, `amplifies` 9. Es una pista fina —una
 * palabra suelta y tres caracteres— pero es de la misma familia que las que se han cerrado
 * toda esta ronda, y **el guardián no la ve**: su puerta 2 solo comprueba si la clave es la
 * opción **más larga**, nunca si es la más corta en solitario. Lo que no se mide, se
 * repite.
 *
 * Se cambia una sola palabra: `masks` → **`obscures`**. Es la que menos mueve el sentido de
 * las cuatro, porque es la que el propio ítem ya defendía: lo que le pasa al bache es que
 * deja de distinguirse del fondo —«it no longer stands out from everything else the star is
 * doing»—, y eso es exactamente oscurecer una señal, no alterarla. Ni el texto, ni el
 * enunciado, ni las otras tres opciones, ni la clave (**B**, la del plan) se tocan; solo se
 * reescribe la razón de la clave, que decía «está enmascarada».
 *
 * Comprobado después del cambio, contando letras: `reverses` 8, `obscures` 8, `explains` 8,
 * `amplifies` 9. Tres de las cuatro miden lo mismo y la clave es una de esas tres, así que
 * **no es la más larga ni la más corta en solitario**: ya no hay ningún extremo ocupado por
 * una sola opción salvo el largo, que es de una distractora. Ninguna de las cuatro
 * aparece en el pasaje —el texto dice «dimming», «wandering», «stands out», y ninguna de
 * esas raíces está en las opciones—, y las cuatro siguen siendo transparentes para un
 * hispanohablante, de modo que el parecido con el español no señala a ninguna. La metáfora
 * de tapar tampoco choca con nada: q03 dejó de tener opciones de ocultar en la sexta
 * versión.
 *
 * (En la tabla de la sexta versión, la ranura de la clave de q01 sigue escrita como `masks`
 * porque así se midió el defecto de conjunto. Hoy esa ranura la ocupa `obscures`, con el
 * mismo sentido.)
 *
 * Por **R2**, q01 vuelve a la cola de auditoría. La ciega de q01 puede reaprovecharse con
 * cautela: cambia una palabra por un sinónimo, no el camino de ninguna de las cuatro
 * opciones ni la razón por la que cada distractora falla.
 *
 * ── Octava versión: q08, la fuga que la permutación destapó ────────────────
 *
 * Medido otra vez a ciegas, **q08 lo aciertan 9 de 10 sin los textos**. Antes no filtraba,
 * y entre una medición y otra lo único que cambió fue la permutación de la quinta versión
 * —clave de A a D, sin una palabra nueva—. Conclusión: la fuga llevaba ahí desde el
 * principio y solo estaba tapada por la posición. Una permutación no arregla ni rompe un
 * ítem; lo que hace es cambiar de sitio lo que ya fallaba.
 *
 * **El diagnóstico, R13 en su forma más limpia.** El enunciado dice cómo respondería el
 * autor del texto 2 al relato del texto 1 sobre los tres lienzos. Quien no ha leído nada
 * deduce del enunciado que el texto 2 sostiene que los cuadros están terminados —es lo que
 * pide la palabra «respond» en un `cross-text-connections`— y busca esa tesis entre las
 * cuatro colas. Estaba escrita en una sola:
 *
 *     clave  · «Vasco let them go in that state on purpose.»      ← la tesis, en limpio
 *     resto  · «a later cleaning … stripped them»                 ← la tesis + un dato
 *              «only the third, never exhibited, is unfinished»   ← la tesis + un dato
 *              «the varnished works show the same sequence»       ← la tesis + un dato
 *
 * Tres colas traían equipaje —una limpieza posterior, un tercer lienzo nunca expuesto, una
 * secuencia visible en las obras barnizadas— y la clave no traía ninguno. **La asimetría
 * no es de longitud ni de sintaxis: es que solo una contesta a secas lo que el enunciado
 * pregunta**, y eso se ve con los dos textos tapados. Es la misma fuga de q05 y q06 en la
 * tercera versión, y se arregla igual: no igualando la forma, sino subiendo las otras tres
 * al mismo grado de respuesta.
 *
 * > Las cuatro tienen que ser respuestas igual de limpias a lo que pide el enunciado. Tres
 * > posturas defendibles que el texto 2 no defiende, y una que sí.
 *
 * **Lo que se cambia.** El escenario no se toca —está argumentado arriba por qué no se
 * mueve este ítem de oficio— y la clave se queda en **D**, con su cola intacta. Se rehace
 * el abanico: las cuatro colas son ahora cuatro relatos rivales de lo mismo, qué son esos
 * contornos desnudos, cada uno en una cláusula y sin apéndices:
 *
 * - **A** · «two of the three were finished and one was not» — reparte el grupo. Pierde el
 *   inciso «never exhibited», que era el equipaje: el camino sigue entero, porque la cuenta
 *   que lo alimenta —«exhibited two of the three»— está en el texto 2 y no en la opción.
 * - **B** · sin cambios. Ya era una cola de una cláusula y su camino —explicar lo desnudo
 *   por pintura perdida después— es distinto del de las otras tres.
 * - **C** · entra el estudio, sale la secuencia de las obras barnizadas. La vieja C hablaba
 *   de otros cuadros; la nueva habla de los tres, que es de lo que va el enunciado. Y su
 *   camino es de verdad tentador: se apoya en «Whatever we are looking at, it is not work
 *   interrupted», la frase del texto 2 que parece darle la razón.
 * - **D** · la clave, palabra por palabra como estaba.
 *
 * **La cláusula que mata a la nueva.** Con el texto 2 anterior, C se defendía a medias: un
 * estudio también puede estar «declarado hecho», así que la frase final lo cerraba solo si
 * uno acepta que un estudio es «a stage on the way to something else» —lo es, pero es un
 * paso de razonamiento y una clave única no se sostiene sobre un paso de razonamiento—. Se
 * añaden dos palabras al texto 2, y solo dos: «priced them» → **«priced them as pictures»**.
 * Ahora C muere por el uso antes que por la definición: quien vende un estudio no lo vende
 * por cuadro. Es la única modificación de los textos en esta versión.
 *
 * **Medido después del cambio, no estimado.** Longitudes 113 · 109 · 114 · 109, con la
 * clave en 109: **ni la más larga ni sola en la más corta** —empata con B en el extremo
 * corto y el largo lo ocupa una distractora—. Solape léxico de cada opción con los dos
 * textos: A 4, B 3, C 6, **clave 4**, así que la clave no es la que más repite ni la que
 * menos, y contar coincidencias lleva a C. El estímulo pasa de 829 a 841 caracteres, 140,2
 * palabras-SAT, dentro de 25-150. Las cuatro razones son distintas entre sí y cada
 * distractora nombra a su estudiante.
 *
 * Por **R2**, q08 vuelve entero a la cola de auditoría y su ciega se repite sobre estas
 * cuatro opciones. Clave sin cambios: **D**, la del plan.
 *
 * ── Novena versión: bajar el nivel por el texto, no por las opciones ───────
 *
 * **Lo que se midió y por qué obliga a cambiar de herramienta.** El calibrador pasó los
 * cinco ejes sobre el módulo entero y la rama «estándar» salió en **10,48 frente al 10,07
 * del módulo 1**: el módulo que se sirve a quien NO llega al corte era más duro que el que
 * acaba de fallar. Declarado 13 fáciles / 11 medios / 3 difíciles; medido 6 / 8 / 13.
 *
 * La causa está escrita en las ocho secciones de arriba. Ocho rondas cerrando fugas
 * —igualar longitudes, subir las distractoras al mismo grado de respuesta, meter cláusulas
 * que impiden la segunda clave— **suben la distancia entre las opciones, y esa distancia
 * es dificultad**. Nadie midió el precio. De aquí sale la regla de esta ronda:
 *
 * > **El margen para bajar el nivel está en T (complejidad del pasaje) y en L (cuántas
 * > partes del texto hay que cruzar). Las opciones y sus razones no se tocan:** ahí vive
 * > el trabajo contra la prueba a ciegas, y aflojarlas reabre las fugas que costaron
 * > siete vueltas de panel.
 *
 * **q03 — el pasaje del gazal.** Medía 13 con un 2 declarado, y venía detrás de un 7: el
 * salto más grande del módulo. No sale ni una palabra de las cuatro opciones ni de sus
 * razones; sale densidad del pasaje. Lo que se hizo, y lo que deliberadamente no:
 *
 * - La oración de 47 palabras se parte en dos. Era la que llevaba a la vez la renuncia del
 *   traductor, la repetición y el «exactamente lo mismo cada vez»; ahora son dos oraciones
 *   de 14 y 22, y la segunda arranca con sujeto explícito, «The English word», en vez de
 *   con un pronombre que había que amarrar cuatro cláusulas atrás. Eso es L, no T.
 * - La oración de 40 palabras que abría el ejemplo se parte igual, y el triple aposito con
 *   raya deja de repetir «at the end of»: «It is a door in one couplet, a decision in the
 *   next, a departure in the last».
 * - `meets the same knot` → `all meet the same problem`. La metáfora del nudo era la
 *   primera imagen del texto y no se cobra en ninguna opción.
 * - `such a version` → `the translation` en la oración del hueco: el referente deja de
 *   tener que reconstruirse. **No se le añade andamio**: la oración del hueco sigue sin
 *   ninguna pista que copiar, que es el arreglo de la tercera versión.
 * - **No se toca ninguna de las tres frases protegidas** («saying each time exactly what it
 *   said before», «one word closes every two-line couplet», «on time and in the place the
 *   form requires»), ni las dos que citan las razones («No single English word holds all
 *   three senses, so the translator settles on one», «moves as the poem goes», «much of the
 *   poem's motion»). Están todas, palabra por palabra.
 *
 * Medido: 616 → 571 caracteres, 102,7 → 95,2 palabras-SAT, y la oración más larga baja de
 * **47 a 22 palabras** (5 oraciones → 8). El abanico sigue siendo `generalizes` ·
 * `overloads` · `exhausts` · `flattens`, con la clave en **D**.
 *
 * **q05 — el pasaje de los flotadores.** Medía 14 con un 1 declarado. Aquí el aviso es al
 * revés que en q03: **las cuatro opciones comparten dos tercios y suman unos 900
 * caracteres, y eso es el arreglo que cerró su fuga en la tercera versión. No se toca.**
 * Se bajó solo el pasaje, y solo por sintaxis:
 *
 * - La oración de 42 palabras del ciclo del flotador —punto y coma, tres verbos
 *   coordinados y un gerundio— se parte en tres de 13, 9 y 21.
 * - La de 34 con que abre —`…from ships, which meant it was measured…`— se parte en dos.
 * - `on the tenth` → `on the tenth day`: el ordinal deja de flotar sin sustantivo.
 * - `Several thousand are now at sea, and they report…` se parte en dos oraciones.
 *
 * Medido: 689 → 688 caracteres (el pasaje casi no encoge, porque partir oraciones cuesta
 * palabras) y la oración más larga baja de **42 a 21** (6 oraciones → 10). Aquí la bajada
 * es toda de T por vía sintáctica; no hay más margen sin entrar en las opciones.
 *
 * **Dos reordenamientos, sin escribir una palabra.** El calibrador comprobó que ninguno
 * rompe el reparto de claves ni junta dos temas iguales:
 *
 * - **q01 ↔ q02.** El grupo de vocabulario iba 8 · 7 · 13 · 12, es decir, empezaba bajando.
 *   Pasa a 7 · 8 · 13 · 12.
 * - **q05, q06, q07 se invierten.** El grupo de estructura iba 14 · 13 · 12, **exactamente
 *   al revés de lo que exige el blueprint**. Pasa a 12 · 13 · 14.
 *
 * Se intercambian los objetos enteros en `items` y en `meta`, y **cada id viaja con su
 * contenido**: no se renumera nada, porque las ocho secciones de arriba, el informe de
 * ciegas y el plan hablan de «q05» o de «q08» para referirse a un contenido, no a una
 * posición. Orden de pantalla resultante: `q02 · q01 · q03 · q04 · q07 · q06 · q05 · q08`.
 *
 * ⚠️ **Colisión conocida con el guardián.** `scripts/check-sat-exam.mjs` exige que el id de
 * cada ítem coincida con su posición (`q${i+1}`), así que con este orden la puerta `ids`
 * falla, y `check:sat` está dentro de `prebuild`. Las dos salidas son incompatibles entre
 * sí y **la decisión no es de este archivo**: o la puerta pasa a comprobar «ids únicos y
 * presentes en `meta`» en vez de «id == posición», o se renumera el bloque y se deja aquí
 * la tabla de equivalencias. Lo que no vale es bajar el umbral ni silenciar la puerta.
 *
 * **q08 retirado y sustituido.** Tercera medición seguida filtrando **9 de 10 a ciegas**.
 * El arreglo de la octava versión —subir las otras tres al mismo grado de respuesta— no lo
 * movió, y el diagnóstico de por qué es el mismo de siempre: en el escenario de los tres
 * lienzos, la tesis que el enunciado pide («¿los cuadros están terminados?») solo tiene una
 * forma limpia de decirse, «los dejó así a propósito», y esa forma era la clave. Las otras
 * tres podían acercarse, pero ninguna podía **ser** esa frase sin volverse la clave. Tres
 * intentos es señal suficiente, y ya hay precedente: el `q10` original se retiró por lo
 * mismo. Se retira el ítem de Aurelio Vasco entero —textos, opciones y razones—.
 *
 * El sustituto es de la misma fila del plan (CS · `cross-text-connections` · humanidades ·
 * dificultad 3 · clave **D**) y cambia de oficio: un pozo de la Edad del Bronce con cuatro
 * bandas de cerámica rota, leído como depósito ritual en el texto 1 y como vertido de
 * desechos en el texto 2. Lo que hace distinto el abanico:
 *
 * - **Las cuatro opciones contestan la misma pregunta con la misma forma**: «each band
 *   is …». Ninguna es la única que dice qué son las bandas, que era la fuga anterior.
 * - **Las cuatro niegan la lectura ritual.** La heurística del solucionador a ciegas ante
 *   un `cross-text-connections` de arqueología —«el texto 2 dirá que es basura»— ya no
 *   señala a una sola opción: reparte entre C y D, y B y A también son explicaciones
 *   mundanas. No queda ninguna que sea «la respuesta de examen».
 * - **Cada distractora muere por una cláusula propia**, ninguna compartida: A por la forma
 *   del hoyo («wider at the top than any of the pots»), B por el estado de las aristas
 *   («rounded and worn … before burial»), C por el reparto de fechas («the lowest band
 *   would hold the oldest; instead every band holds the same two hundred years»).
 * - **La clave se sostiene sobre dos hechos, no sobre un paso de razonamiento**: los
 *   fragmentos de un mismo jarro en la banda más baja y en la más alta, y el mismo abanico
 *   de dos siglos dentro de cada banda.
 *
 * Medido, no estimado: opciones 157 · 156 · 156 · 157, con la clave en 157 —empata en el
 * extremo largo, así que no es «la más larga» a efectos de la puerta 2, y el corto lo
 * ocupan dos distractoras—. Solape léxico con los dos textos: A 10, B 8, C 8, **clave 9**;
 * ni el máximo ni el mínimo, y contar coincidencias lleva a A. Estímulo de 861 caracteres,
 * 143,5 palabras-SAT, dentro de 25-150.
 *
 * **Efecto secundario que conviene apuntar: se deshace el racimo de pintores.** La sección
 * «q08 y el racimo de pintores» de arriba queda **histórica**: el ítem que describe ya no
 * existe. Al salir el estudio de Vasco, `painter`, `canvases`, `studio` y `unfinished`
 * desaparecen de este bloque y con ellos la colisión literal con el distractor B de q11.
 * Además la arqueología no aparece en ningún otro ítem de los dos módulos (comprobado por
 * búsqueda sobre los ocho bloques), así que el tema nuevo no crea otro racimo.
 *
 * **Dificultades reetiquetadas.** Estaban declaradas a ojo y el calibrador las midió. Se
 * copia la medición, no la intención:
 *
 *     id    declarado antes   medido   ahora   por qué
 *     q02        1              7        1     sin cambios
 *     q01        1              8        2     medido por encima de su etiqueta
 *     q03        2             13        2     ver abajo
 *     q04        2             12        3
 *     q07        2             12        3
 *     q06        1             13        3
 *     q05        1             14        3     ver abajo
 *     q08        3              —        3     ítem nuevo; la fila del plan dice 3
 *
 * **Los dos juicios propios, dichos en voz alta.** El encargo pedía q03 → 3 y q05 → 3
 * sobre la medición *anterior* al recorte de sus pasajes:
 *
 * - **q03 se queda en 2.** El recorte se lleva por delante lo que lo hacía caro: el pasaje
 *   era casi todo el ítem, porque el abanico son cuatro palabras sueltas. Con la oración
 *   más larga a menos de la mitad y el referente del hueco explícito, lo estimo en torno a
 *   10-11, o sea banda media. Es una **estimación mía y hay que volver a medirla**: si el
 *   calibrador lo devuelve en 12 o más, se etiqueta 3 y la curva del grupo sigue válida
 *   (1 · 2 · 3 · 3 también es creciente).
 * - **q05 se queda en 3**, aunque su pasaje también bajó. Lo que pesa en ese ítem no es el
 *   texto: son cuatro opciones de 221-229 caracteres que comparten dos tercios y solo se
 *   distinguen por el cierre. Eso es intocable por la regla de esta ronda, así que el ítem
 *   sigue siendo difícil por más que el pasaje respire. Etiquetarlo 1 era la mentira.
 *
 * Curva declarada en el orden nuevo: **1 · 2 · 2 · 3 | 3 · 3 · 3 | 3**, creciente dentro
 * de cada grupo de tipo, que es lo que mira la puerta 9.
 *
 * **Lo que este bloque ya no puede arreglar solo.** Reetiquetar con honradez deja el módulo
 * declarando cinco difíciles solo en CS, cuando el plan pide tres en los 27. El desajuste
 * no se cierra con etiquetas: o se baja T en los otros tres bloques como se ha bajado aquí,
 * o el plan revisa sus cifras. Queda dicho para que no se resuelva bajando etiquetas.
 *
 * Por **R2** vuelven enteros a la cola de auditoría **q03, q05 y q08**, y la ciega se
 * repite sobre las opciones de q08, que son nuevas. Las de q03 y q05 no han cambiado ni un
 * carácter, así que su ciega anterior sigue valiendo.
 *
 * ── Décima versión: la otra mitad de T, en los pasajes densos ──────────────
 *
 * La novena ronda fue por el eje bueno —el calibrador midió que la complejidad del texto
 * bajó 0,19, que **la distancia entre opciones no se movió ni una décima** y que la ciega
 * se quedó en 19,8 % (techo 35, azar 25)—, pero recortó los pasajes que ya tenían las
 * oraciones cortas. Los densos seguían intactos. Aquí se acaba el trabajo, con la misma
 * regla: **no se toca ni una opción ni una razón; todo el margen sale de T.**
 *
 * Medido antes y después, con el mismo contador (oraciones separadas por punto, media de
 * palabras por oración, oración más larga):
 *
 *     id    caracteres   oraciones   media   más larga
 *     q07   606 → 679      4 → 8    25,8 → 14,8   44 → 24
 *     q01   570 → 573      4 → 7    27,2 → 15,7   36 → 36  (ver abajo)
 *     q02   480 → 479      4 → 8    23,8 → 11,9   33 → 18
 *
 * Partir oraciones cuesta palabras: q07 sube de 103 a 118 y de 101 a 113,2 «palabras de
 * 6», dentro de 25-150. q01 y q02 no se mueven de tamaño; solo de puntuación.
 *
 * **q07 — el concierto barroco, el ítem más caro del examen (14).** Todo el problema estaba
 * en la apertura: 44 palabras con los cuatro tecnicismos musicales seguidos detrás de dos
 * puntos. Se reparte en cuatro oraciones cortas —una por rasgo o dos— y la etiqueta
 * «authentic», que era el principio de la primera, pasa a cerrar la serie, **justo delante
 * de «What that word hides…»**: el referente de «that word» deja de estar a veintisiete
 * palabras dentro de la misma oración y queda pegado. Eso es L además de T. Se conservan
 * palabra por palabra las cuatro cosas que citan las razones: la primera línea con 1955 y
 * 1995 y sin un elogio a lo antiguo (razón C), «strings of gut instead of steel» (el
 * arreglo de equidad de la cuarta versión), «the treatises were written to correct players,
 * not to describe them» (razones A y D) y **las dos últimas oraciones enteras**, que son la
 * objeción y que la razón D nombra como tales. Ninguna palabra nueva —players, groups,
 * vibrato, tempos, recordings— aparece en la clave: la clave A dice «written rules»,
 * «practice» y «fix», y ninguna de las tres entra en el texto.
 *
 * **q01 — los tránsitos (media de 27,3, la más larga de las 36 del bloque).** Se parten las
 * tres primeras oraciones, que llevaban dos incisos con raya y una coordinación cada una.
 * **La oración del hueco no se parte, y es una decisión, no un olvido**: la razón de la
 * clave está escrita como «la oración del hueco lo dice por partes» y cita sus dos mitades
 * —«unchanged in depth… on its own fixed cycle» y «but it no longer stands out…»—. Partirla
 * dejaría esa razón describiendo algo que ya no existe, y las razones no se tocan. Por eso
 * la más larga sigue en 36: la media baja de 27,2 a 15,7 y la oración cara queda sola, con
 * seis oraciones cortas delante en vez de tres largas. Se conservan «dimming it by as much
 * or more» (razones A y D) y «on a schedule of their own» (razón C), que ahora cierra una
 * oración propia.
 *
 * **q02 — el único de lectura que podía llegar a banda fácil.** El bloque tenía **cero de
 * veinte** ítems en banda fácil y su suelo estaba en 8, que es lo que medía este. Se parten
 * las dos oraciones largas (26 y 33) y también el cierre, y el hueco se queda solo en una
 * oración de cinco palabras —«Her questions were ______ that evening.»—, con las tres
 * conductas justo detrás, que es como la razón de la clave las describe: «las tres cosas
 * que el texto pone **justo después del hueco**». Detalle deliberado y feo a la vista: la
 * sexta oración empieza por «And». Es la única forma de partir ahí sin cambiarle la
 * mayúscula a «twice she came back to a question I had already answered», que la razón de
 * la clave cita literal. Prosa de narrador en primera persona lo admite; alterar una cita
 * de una razón, no.
 *
 * **Reordenamiento del grupo de estructura: medido, y no hay nada que mover.** El grupo iba
 * `q07 (14) · q06 (12) · q05 (12)`, con el ítem más caro en cabeza. Rebajado q07, los tres
 * quedan en el mismo escalón del calibrador, así que el orden lo decide una medida más
 * fina. La que se usa aquí es la **carga total de lectura** —caracteres del pasaje más los
 * de las cuatro opciones, que es todo lo que el estudiante tiene que leer para contestar—:
 *
 *     id    pasaje   opción media   compartido   en disputa   carga total
 *     q07     679         82             3           79          1.007
 *     q06     535        130            44           86          1.056
 *     q05     688        225           126           99          1.588
 *
 * Sale **creciente en el orden que ya está en pantalla**, así que el array no se toca. El
 * cruce importa: por pasaje suelto q05 es el más ligero del bloque (media de 12,7), pero
 * sus cuatro opciones comparten 126 caracteres que hay que releer cuatro veces, y eso es lo
 * que lo mantiene en cola. Es el mismo diagnóstico de la novena versión —«lo que pesa en
 * ese ítem no es el texto»— medido en caracteres. Si el calibrador rompe el empate al
 * revés, el único cambio posible es intercambiar q06 y q05; q07 va primero con las dos
 * medidas.
 *
 * **Etiquetas.** q04 pasa de 3 a **2**, que es lo que mide. q02 se queda en **1**: la
 * corrección del calibrador era «→2, o →1 si al bajarlo lo dejas en 7», y ahí es donde se
 * ha dejado. Curva declarada en el orden de pantalla: **1 · 2 · 2 · 2 | 3 · 3 · 3 | 3**, no
 * decreciente dentro de cada grupo de tipo, que es lo que mira la puerta 9. El bloque baja
 * de cinco difíciles declarados a cuatro.
 *
 * **Lo que queda por bajar en este bloque, para quien siga.** La oración más larga que
 * sobrevive es la de **q06**, de 44 palabras —las tres pruebas de Sofía con dos puntos y
 * coma—, y ese ítem no entraba en esta ronda. Es el próximo candidato barato, y partirla no
 * roza ninguna razón: las tres pruebas se citan por separado en la razón de la clave. En
 * q04 quedan dos de 33 y 29, pero la segunda contiene «nothing links it to them, no
 * drawing, no letter, no recorded visit», que es frase protegida: se puede partir antes de
 * la raya, nunca dentro.
 *
 * Por **R2** vuelven a la cola de auditoría **q07, q01 y q02**. Sus opciones y sus razones
 * no han cambiado ni un carácter, así que **la ciega anterior de los tres sigue valiendo**:
 * lo que se ha movido es el pasaje, que en la prueba a ciegas está tapado.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q02',
    type: 'mcq',
    part: 1,
    stimulus:
      'When Mr. Ferreira came in from the yard, my grandmother did not ask him where he had been. She set a bowl in front of him and another in front of me. Then she asked me about the arithmetic I had been given at school. Her questions were ______ that evening. She asked one, heard half the answer, and asked the next as if I had finished. And twice she came back to a question I had already answered. All the while her eyes went to the window. The last light was going off the yard.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'hurried',
      'considerate',
      'automatic',
      'pointed',
    ],
    answer: 2,
  },
  {
    id: 'q01',
    type: 'mcq',
    part: 1,
    stimulus:
      "A planet crossing in front of its star blocks a sliver of the star's light. A telescope watching for years can catch the dip. The dip is small: for a planet the size of Earth, about one part in ten thousand. The star itself is not steady. Cooler patches on its surface turn into view and out again, dimming it by as much or more. They do this on a schedule of their own. That wandering ______ the transit: the dip is still there in the record, unchanged in depth and still arriving on its own fixed cycle, but it no longer stands out from everything else the star is doing.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'reverses',
      'obscures',
      'explains',
      'amplifies',
    ],
    answer: 1,
  },
  {
    id: 'q03',
    type: 'mcq',
    part: 1,
    stimulus:
      "Translators of the Persian ghazal all meet the same problem. The form turns on a refrain: one word closes every two-line couplet. In the Persian, that word moves as the poem goes. It is a door in one couplet, a decision in the next, a departure in the last. Much of the poem's motion comes from those turns. No single English word holds all three senses, so the translator settles on one. The English word comes back on time and in the place the form requires, saying each time exactly what it said before. Whatever else the translation gets right, it ______ the refrain.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'generalizes',
      'overloads',
      'exhausts',
      'flattens',
    ],
    answer: 3,
  },
  {
    id: 'q04',
    type: 'mcq',
    part: 1,
    stimulus:
      'The warehouse that Thomas Ward put up beside the Leeds canal in 1836 ______ the great spinning mills it is usually said to copy. Everything those mills are admired for is already in it: an iron frame carrying the floors, windows the width of the bay on every level, outer walls that hold up nothing at all. The resemblance is exact; the order is not. Ward\'s building was standing, and insured, eighteen years before the first of the mills was drawn — and nothing links it to them, no drawing, no letter, no recorded visit.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'anticipates',
      'imitates',
      'outlasts',
      'inspires',
    ],
    answer: 0,
  },
  {
    id: 'q07',
    type: 'mcq',
    part: 1,
    stimulus:
      'Recordings of a Baroque concerto made in 1955 and in 1995 hardly sound like the same piece. In the later ones the players use strings of gut instead of steel. They work in smaller groups and use little vibrato. Their tempos come from treatises written at the time. That is why the newer recordings are usually called more authentic. What that word hides is that the treatises were written to correct players, not to describe them. A manual that tells organists to keep strict time is evidence that organists were not keeping strict time. A performance built on such advice may be reproducing what one irritated writer wished he heard, and not what anyone in 1720 actually played.',
    text: 'Which choice best states the main purpose of the text?',
    options: [
      'To question what written rules can prove about the practice they were meant to fix.',
      'To document a shift in the way a body of music has been performed and recorded.',
      'To defend a performance tradition against the treatises now being used to judge it.',
      'To explain how performers recover practices for which no recordings survive at all.',
    ],
    answer: 0,
  },
  {
    id: 'q06',
    type: 'mcq',
    part: 1,
    stimulus:
      "The new tenant across the hall was a man of about fifty who wore the same gray coat every day that winter. Within a week Sofía had decided he was a widower. He carried his groceries up in a net bag and never brought more than a day's worth; he came home at the same hour; and once, through the door, she heard him say good night to a room she was fairly sure was empty. She was seventeen and had read a great many novels. When the man's wife arrived in March with two suitcases and a cold, Sofía was less embarrassed than disappointed.",
    text: 'Which choice best describes the function of the sentence "She was seventeen and had read a great many novels." in the text as a whole?',
    options: [
      "It pauses on Sofía's age and her reading to introduce her to the reader before the conclusion she draws about the tenant is reported.",
      "It pauses on Sofía's age and her reading to step outside her own account of that winter for the only moment the story allows it.",
      "It pauses on Sofía's age and her reading to explain where the story she has spent the winter building about the tenant comes from.",
      "It pauses on Sofía's age and her reading to set her against the tenant, the contrast on which the last sentence of the text turns.",
    ],
    answer: 2,
  },
  {
    id: 'q05',
    type: 'mcq',
    part: 1,
    stimulus:
      'For most of the twentieth century the temperature of the ocean below the surface was measured from ships. That meant it was measured where ships go, in the seasons when the weather lets them. Since 2000 most of the work has been done by drifting floats. A float sinks to about a kilometer and drifts there for nine days. On the tenth day it sinks to two kilometers. Then it rises to the surface, taking readings on the way up, and radios them to a satellite before sinking again. Several thousand are now at sea. They report from stretches of the Southern Ocean that no research vessel visits in winter. The record they have built is not longer than the old one. It is more evenly spread.',
    text: 'Which choice best describes the overall structure of the text?',
    options: [
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by comparing how many readings each of the two methods has produced and how deep each one reached.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by granting that the float record covers no more years than the old one and calling it better spread.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by admitting that both methods leave the same waters unmeasured and that winter is when the gap widens.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by conceding that the float record is still too short to show a trend and saying how much longer it needs.',
    ],
    answer: 1,
  },
  {
    id: 'q08',
    type: 'mcq',
    part: 1,
    stimulus:
      'Text 1\n\nPit 12 at Cwm Brys held the pieces of about forty pots, lying in four bands with pale clean soil between them. Not one pot was whole. This is not a rubbish hole. The vessels were smashed and set down in stages. The pale soil between the bands is the time that passed between one visit and the next. The pit records the closing of a settlement.\n\nText 2\n\nThe pit is a broad bowl, wider at the top than any of the pots: nothing had to be broken to go in. The broken edges are rounded and worn, the way pieces go when they are walked on for years before burial. Parts of one jar came out of the lowest band and the highest. Had the pots gone in as they broke, the lowest band would hold the oldest; instead every band holds the same two hundred years of styles. Someone emptied an old heap of household waste into a disused hole, and did it four times over.',
    text: "Based on the texts, how would the author of Text 2 most likely respond to Text 1's account of Pit 12?",
    options: [
      'By granting that the pit holds four bands of broken pottery but arguing that each band is a batch of pots smashed at the mouth so that they would go down it.',
      'By granting that the pit holds four bands of broken pottery but arguing that each band is a layer in which pots left whole were crushed by the weight above.',
      "By granting that the pit holds four bands of broken pottery but arguing that each band is a few years' worth of pots dropped in singly as they broke in use.",
      'By granting that the pit holds four bands of broken pottery but arguing that each band is one cartload out of a single long-standing pile of household waste.',
    ],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q02',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Es la lectura de quien oye impaciencia en la ristra de preguntas: una detrás de otra y ninguna respuesta escuchada entera. El texto no da ni un signo de prisa —es una cena, la abuela se queda, nadie tiene que irse a ninguna parte— y quien va con prisa no vuelve dos veces sobre una pregunta ya contestada: repetir alarga la conversación, no la acorta. La versión anterior de este ítem sí sostenía «hurried» con el texto («started the next before I had finished»); esa frase se cambió.',
      B:
        'Lee la escena por lo que la abuela hace con las manos —pone los dos platos, pregunta por la escuela— y traslada a las preguntas la atención que hay en el gesto. El texto separa las dos cosas: ser considerado con quien contesta es escuchar lo que contesta, y aquí las respuestas se oyen a medias, se dan por dadas y se vuelven a pedir mientras ella mira a la ventana.',
      C:
        'Correcta: las tres cosas que el texto pone justo después del hueco describen preguntas que salen sin nadie detrás —«heard half the answer», «asked the next as if I had finished» y «twice she came back to a question I had already answered»— y la última frase dice dónde está ella de verdad: «her eyes went to the window». La forma de preguntar sigue funcionando; la atención no.',
      D:
        'Cae quien recuerda la primera línea —«did not ask him where he had been»— y lee el interrogatorio a la nieta como el rodeo de quien va detrás de algo. Para ir detrás de algo hay que escuchar lo que contestan, y el texto dice que oye media respuesta y que repite una que ya le habían respondido: no hay blanco al que apuntar.',
    },
    fuenteHecho: 'Ficción original; ningún hecho real implicado.',
  },
  {
    id: 'q01',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'El estudiante que elige esta lee «dimming it by as much or more» y entiende que la variación de la estrella le da la vuelta al bache: si las manchas oscurecen tanto o más, la señal quedaría anulada o invertida. El texto lo desmiente dentro de la misma oración del hueco, donde el bache sigue «unchanged in depth». Lo que cambia no es el tránsito, es lo que hay alrededor.',
      B:
        'Correcta: la oración del hueco lo dice por partes. El bache «is still there in the record, unchanged in depth and still arriving on its own fixed cycle» —nada lo altera ni lo suprime— «but it no longer stands out from everything else the star is doing». Una señal que se conserva entera y deja de distinguirse del fondo queda oscurecida —tapada por lo que la estrella hace por su cuenta—, no alterada: el verbo describe lo que le pasa a la vista del bache, no al bache.',
      C:
        'Toma las manchas por una explicación alternativa del bache: si la estrella se apaga sola, el planeta sobra. El camino existe —las manchas imitan tránsitos de verdad—, pero el texto mantiene las dos cosas separadas y con relojes distintos: las manchas van «on a schedule of their own» y el tránsito sigue llegando «on its own fixed cycle». Ninguna da cuenta de la otra.',
      D:
        'Suma las dos caídas de brillo: si el planeta quita luz y las manchas también, el bache se haría más hondo. El texto cierra esa puerta con dos palabras, «unchanged in depth». Y hay una segunda razón: un bache amplificado se vería mejor, no peor, justo al revés de lo que dice el final de la oración.',
    },
    fuenteHecho:
      'Hecho libre de astronomía de exoplanetas: la actividad estelar como ruido en la fotometría de tránsitos, y la profundidad de ~1 parte en 10.000 para un planeta del tamaño de la Tierra. Estrella, ejemplo y redacción originales.',
  },
  {
    id: 'q03',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'El estudiante que elige esta llega con una idea razonable de cómo se traduce una palabra de varias acepciones: si ninguna inglesa sirve para las tres, se busca una lo bastante ancha para que quepan todas. El texto dice que el traductor hace lo contrario, y lo dice dos veces en la misma oración: «No single English word holds all three senses, so the translator settles on one» —se queda con una y renuncia a dos— y esa palabra vuelve «saying each time exactly what it said before», que es lo contrario de vaga. La versión estrecha el estribillo; generalizarlo es la dirección opuesta.',
      B:
        'Es la lectura de quien se queda con el nudo del principio —«No single English word holds all three senses»— y supone que el traductor obliga igualmente a su palabra a cargar con las tres a la vez: una puerta, una decisión y una partida metidas en un solo término que revienta por el peso. La misma oración lo desmiente: el traductor «settles on one», y lo que la palabra hace cada vez que vuelve es decir «exactly what it said before». Nunca dice más de lo que dijo la primera vez, así que no está sobrecargada: está fija.',
      C:
        'El estudiante que elige esta oye el defecto donde se oye casi siempre, en la repetición: la misma palabra al final de cada pareado, una vez y otra, acaba gastada. Pero la repetición no la añade el inglés. Es de la forma, y el persa la cumple igual —«one word closes every two-line couplet»— sin que allí el estribillo se agote, porque lo que vuelve cambia de sentido. Y el texto no habla en ningún momento de fuerza que se pierda al volver: dice que la palabra vuelve diciendo lo mismo, que es una afirmación sobre el sentido, no sobre el desgaste.',
      D:
        'Correcta: las dos piezas de la respuesta están arriba, no en la oración del hueco. Se conserva el retorno —cada pareado, puntual, en el lugar que la forma pide— y se pierde el movimiento: la palabra persa «moves as the poem goes» y de esos giros sale «much of the poem\'s motion», mientras que la inglesa vuelve «saying each time exactly what it said before». Un relieve que se repite sin variar queda aplanado: el dibujo sigue, el desnivel no. Las otras tres también son pérdidas y también dejan intacto el retorno; lo que las descarta no es que suenen peor, es que el texto nombra una sola pérdida y es esta.',
    },
    fuenteHecho:
      'Hecho real de métrica persa: el gazal cierra cada pareado con una palabra o sintagma fijo, y su polisemia es un problema conocido de traducción. La forma se explica dentro del texto —«two-line couplet», porque «couplet» no es cognado del español—; sentidos, ejemplo y redacción son originales.',
  },
  {
    id: 'q04',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: el texto trae las dos piezas que la palabra necesita y las trae en este orden. El parecido no se discute —«Everything those mills are admired for is already in it»— y la fecha lo coloca: el almacén estaba en pie, y asegurado, «eighteen years before the first of the mills was drawn». Hacer antes, y sin deberlo a nadie, lo que otros harán después es anticiparlo. Es además lo único que el pasaje sostiene: adelanta una fecha y no reclama descendencia.',
      B:
        'El estudiante que elige esta es el que se queda con la descripción heredada, que el propio texto le pone delante: del almacén se dice que «is usually said to copy» las hilanderías. Copiar exige que el modelo sea anterior, y el texto fecha lo contrario dos líneas más abajo, primero en seco —«The resemblance is exact; the order is not»— y luego con la cifra: dieciocho años antes de que la primera de ellas llegara siquiera al papel. Ha leído el parecido y no ha leído el reloj.',
      C:
        'El estudiante que elige esta lee «was standing, and insured» como una frase sobre lo que el edificio duró y no sobre cuándo empezó a existir. «Standing … before the first of the mills was drawn» fija un nacimiento, no una muerte: el texto no dice qué fue de ninguno de estos edificios ni si alguno sigue hoy en pie. Sobrevivir a las hilanderías es una afirmación que el pasaje no puede sostener en ninguna de sus cuatro frases.',
      D:
        'El camino más fino de los tres, y por eso el que decide el ítem: quien lo toma acepta la fecha —el almacén es anterior— y da un paso de más, de «fue antes» a «de ahí salieron». La última frase cierra esa puerta: «nothing links it to them, no drawing, no letter, no recorded visit». Anticipar no exige contacto; inspirar sí, y aquí no consta ninguno. Esa frase final es lo único que separa esta opción de la clave: si alguien la recorta por longitud, el ítem pasa a tener dos respuestas.',
    },
    fuenteHecho:
      'Ficción sobre un hecho libre de historia industrial: rasgos que luego se dieron por característicos de una generación de fábricas —armazón de hierro, ventanas de vano completo, muros exteriores que no cargan— aparecieron antes en edificios menores y utilitarios, y las pólizas de incendios son una de las pocas fuentes que los fechan. Thomas Ward, el almacén, la fecha de 1836 y los dieciocho años son inventados; no se nombra ninguna fábrica real ni se atribuye a nadie la primera vez.',
  },
  {
    id: 'q07',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Correcta: el texto tiene un solo movimiento y es este. Nombra la prueba en que se apoya la interpretación «auténtica» —los tratados de la época, que son reglas escritas— y muestra por qué esa prueba no puede demostrar lo que se le pide: «the treatises were written to correct players, not to describe them», y un manual que manda llevar el tempo estricto demuestra que no se llevaba. La última oración saca la consecuencia: lo reproducido puede ser el deseo de un autor irritado.',
      B:
        'Confunde el arranque con el asunto. Las grabaciones de 1955 y de 1995 aparecen en la primera línea para situar de dónde sale la palabra «authentic», y el texto no vuelve a ocuparse de cómo cambió la interpretación: se va a los tratados y se queda allí. Un texto que documentara ese cambio contaría qué pasó en medio, y aquí no hay nada en medio.',
      C:
        'Lee la crítica como una toma de partido por el bando contrario: si el autor desconfía de lo «auténtico», estará defendiendo las grabaciones antiguas frente a los tratados con que hoy se las juzga. En ninguna línea se elogia lo de 1955; la única frase que las menciona dice solo que no suenan igual que las de 1995. Poner en duda un criterio no es defender a quien ese criterio deja mal.',
      D:
        'Se queda con el procedimiento —cómo se reconstruye un sonido del que no hay grabaciones— y lo toma por el propósito. El texto describe ese procedimiento, pero solo lo justo para atacarlo: la oración que lo resume termina en «not to describe them», y las dos últimas frases son objeción, no exposición.',
    },
    fuenteHecho:
      'Debate real de la interpretación históricamente informada: los tratados del siglo XVIII son prescriptivos y por eso mal testigo de la práctica corriente. Grabaciones, fechas y el ejemplo del organista son inventados.',
  },
  {
    id: 'q06',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'literatura',
    razones: {
      A:
        'La función es de las que se usan a menudo y bien —presentar a quien va a juzgar antes de que juzgue—, pero pide una frase colocada en otro sitio. Aquí el juicio ya está dado cuatro líneas antes, en la segunda oración del texto: «Within a week Sofía had decided he was a widower». La frase examinada llega después de esa conclusión y después de las tres pruebas con que se sostiene, así que no presenta a nadie a tiempo de nada: llega cuando el lector ya sabe qué decidió Sofía y necesita saber por qué.',
      B:
        'Sería exacta en un relato contado desde dentro de Sofía, donde este inciso fuera la única vez que la voz se aparta y la mira desde fuera. Este no lo es en ninguna línea. La narración va por fuera desde el principio —«Sofía had decided», «a room she was fairly sure was empty»— y sigue por fuera después, hasta el juicio final sobre lo que sintió. Si el punto de vista nunca estuvo dentro, esta frase no puede ser la salida.',
      C:
        'Correcta: la frase llega justo después de la conclusión y de las tres pruebas con que Sofía la sostiene —la bolsa de red, la hora fija, las buenas noches a un cuarto que ella cree vacío— y dice de dónde salió el procedimiento. Tener diecisiete años y haber leído «a great many novels» es lo que convierte tres detalles sueltos en la historia de un viudo. Por eso lo que se rompe en marzo es un relato y no una cuenta: Sofía queda «less embarrassed than disappointed».',
      D:
        'Ese contraste se monta así en muchos textos: dos edades enfrentadas y un final que descansa en la distancia entre ellas. Para que fuera este, la diferencia tendría que volver a usarse, y no vuelve. Los cincuenta años y el abrigo gris del vecino no se cruzan con los diecisiete de Sofía en ninguna línea posterior, y la última frase no gira sobre la edad de nadie: gira sobre lo que le pasa a su historia cuando la mujer llega en marzo con dos maletas.',
    },
    fuenteHecho: 'Ficción original; ningún hecho real implicado.',
  },
  {
    id: 'q05',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A:
        'Es un cierre perfectamente posible —echar cuentas: tantas mediciones de un método, tantas del otro, y hasta dónde llegó cada uno— pero no es el de este texto. Aquí no hay una sola cifra de mediciones: «several thousand» cuenta flotadores en el mar, no lecturas tomadas. Y la única profundidad que aparece es la del flotador, un kilómetro y dos kilómetros; del barco no se dice cuánto medía hacia abajo, de modo que no hay dos profundidades que comparar. Las dos frases finales comparan otra cosa: cuántos años cubre cada registro y cómo se reparten.',
      B:
        'Correcta: el texto va en tres movimientos y el tercero está en las dos últimas frases. Primero por qué el barco solo medía en parte del mar y en parte del año —«where ships go, in the seasons when the weather lets them»—. Después un flotador entero, paso a paso: nueve días a un kilómetro, al décimo baja a dos, sube midiendo y transmite por satélite. Y cierra concediendo la comparación que pierde —«The record they have built is not longer than the old one»— para quedarse con la que gana: «It is more evenly spread».',
      C:
        'Es un cierre impecable para otro texto —el que termina reconociendo que la laguna sigue abierta para los dos métodos y que en invierno se ensancha— y este texto lo dice justo al revés. La frase que lo tienta está entera dos líneas antes: los flotadores «report from stretches of the Southern Ocean that no research vessel visits in winter», es decir, informan justo de donde el barco no iba. El invierno se nombra como el hueco que se cerró, no como uno compartido, y en el cierre no vuelve a aparecer ninguna agua sin medir.',
      D:
        'Un texto que cerrara diciendo que la serie es todavía corta y cuántos años le faltan estaría bien cerrado; este no cierra así. «The record they have built is not longer than the old one» no denuncia una carencia: concede algo para poder afirmar lo siguiente, «It is more evenly spread», que es la frase con la que el párrafo se queda. En todo el texto no hay un solo plazo, umbral ni tiempo verbal de futuro.',
    },
    fuenteHecho:
      'Hecho real y público: la red internacional de flotadores perfiladores funciona desde 2000 con ciclos de unos diez días —deriva a unos 1.000 m durante nueve días, descenso a 2.000 m y perfil tomado durante el ascenso—, transmite por satélite y son varios miles. La primera versión de este texto decía que el flotador «sinks to about two kilometers, drifts there for ten days» y que lo medido era «the deep ocean»: las dos cosas son falsas —la cobertura es la de los 2.000 m superiores— y un simulacro no puede enseñar un dato falso ni de paso. El programa no se nombra; la redacción es original.',
  },
  {
    id: 'q08',
    domain: 'CS',
    tipo: 'cross-text-connections',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'El estudiante que elige esta conserva del texto 1 lo que el texto 1 da por supuesto —que alguien rompió las vasijas a propósito— y solo le cambia el motivo: no una ceremonia, sino la boca del pozo. Es un camino corriente y bien fundado: si algo entra roto en un agujero, lo primero que se piensa es que no cabía entero. La primera línea del texto 2 lo cierra midiendo el agujero: «The pit is a broad bowl, wider at the top than any of the pots: nothing had to be broken to go in». No hubo cuello que salvar, así que la rotura no la explica la entrada.',
      B:
        'El estudiante que elige esta explica lo roto por lo que le pasó al pozo después de cerrarse: metros de tierra encima aplastan lo que haya debajo, y las vasijas habrían entrado enteras. Es el reflejo de quien piensa en el peso y no en el uso. Lo que lo deshace es el estado de las aristas: «The broken edges are rounded and worn, the way pieces go when they are walked on for years before burial». Una vasija reventada bajo tierra deja filos frescos y las piezas juntas; estas están gastadas de pisarlas, de modo que se rompieron al aire libre y mucho antes de entrar.',
      C:
        'El estudiante que elige esta ya ha visto que el texto 2 lee desechos donde el texto 1 lee ceremonia, y se queda con la versión lenta de esa lectura: se tira lo que se rompe, pieza a pieza, y el pozo se llena solo a lo largo de la vida del poblado. La opción existe porque esa es la manera normal en que se llena un hoyo de basura. El texto 2 la descarta con la única prueba que separa lo lento de lo repentino: «Had the pots gone in as they broke, the lowest band would hold the oldest; instead every band holds the same two hundred years of styles». Un relleno gradual ordena las fechas de abajo arriba, y aquí no están ordenadas.',
      D:
        'Correcta: el texto 2 no discute las cuatro bandas, discute qué son. Dos hechos las explican sin ceremonia de por medio. El primero, que la mezcla es anterior a la entrada: «Parts of one jar came out of the lowest band and the highest», cosa imposible si cada banda fuera una visita distinta. El segundo, que cada banda repite el mismo abanico de doscientos años de estilos, que es lo que contiene un montón viejo de desechos y no lo que deja una secuencia de actos separados en el tiempo. El cierre lo nombra: «Someone emptied an old heap of household waste into a disused hole, and did it four times over». Cuatro descargas, no cuatro visitas: las bandas cuentan las veces que se vació la carretilla.',
    },
    fuenteHecho:
      'Debate real de la arqueología prehistórica europea: los depósitos de cerámica rota leídos como acto ritual —la llamada «deposición estructurada»— frente a su lectura como vertido corriente de desechos, con el desgaste de las aristas, las uniones de fragmentos entre capas y el reparto de fechas dentro de cada capa como pruebas que se usan de un lado y de otro. El yacimiento de Cwm Brys, el pozo 12, las cuarenta vasijas y las cuatro bandas son inventados; no se sigue ningún caso concreto ni se cita ninguna excavación real.',
  },
]
