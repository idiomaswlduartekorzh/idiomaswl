import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Expression of Ideas del módulo `sat-set-1-m2-facil` — ítems q23 a q27.
 * ESTADO: APTO. Registrado por `sat-set-1-m2-facil.ts`; acta firmada el 23 ago 2026.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 23-27). Claves vigentes, que no se
 * negocian ítem a ítem: cada ítem conserva la suya —q23 **D**, q24 **A**, q26 **C**, q25
 * **D**, q27 **B**— (el plan asignaba B, A, B, C, A; ver «REPARTO DE LETRAS» al final de
 * este comentario). El orden de los cinco es **q24 · q23 · q26 · q25 · q27** —q25 y q26 se
 * intercambiaron enteros en la primera pasada de calibración y q23 y q24 en la quinta; ver
 * «CALIBRACIÓN» al final—, de modo que en pantalla las claves salen **A, D, C, D, B**, con
 * dificultades **2, 3, 2, 2, 2** —la de q26 volvió de 1 a 2 en la segunda pasada de
 * calibración, la de q27 bajó de 3 a 2 al reescribirlo entero y la de q24 bajó de 3 a 2 en
 * la quinta, ver el final— y temas historia, humanidades, literatura, ciencia, humanidades.
 * Todo el
 * contenido es original (§5 del blueprint); de College Board solo se reproducen los dos
 * enunciados canónicos.
 *
 * ## rhetorical-synthesis (q23-q24): tercera versión, y con la regla del revés
 *
 * Las dos primeras versiones se escribieron con esta regla: «las cuatro opciones son
 * verdaderas según las notas, y lo único que separa a la clave es que cumple el objetivo
 * declarado». Las dos las acertaron **10 de 10 solucionadores sin ver las notas**. La
 * segunda ya traía las cuatro opciones en un molde único —las cuatro empezando por
 * «Because», la misma sintaxis, siete caracteres entre la más larga y la más corta— y **no
 * movió la cifra ni un punto**. La fuga no era de forma.
 *
 * Era de sentido, y está descrita en **R13** (blueprint §4 bis). En síntesis retórica el
 * objetivo viene escrito en el enunciado: «explain why some listeners cannot understand a
 * whistled message». Si las otras tres opciones son verdaderas pero contestan a otra
 * pregunta —una hablaba de un grito, otra de una escuela, otra del origen de la práctica—,
 * esa ajenidad **se ve sin las notas**: basta el enunciado para descartarlas. Diseñar «las
 * cuatro verdaderas, una sola relevante» produce ítems que se contestan sin leer.
 *
 * El diseño está ahora invertido:
 *
 * > **Las cuatro opciones son relevantes al objetivo. Solo las notas deciden cuál está
 * > sostenida.** Tres causas plausibles de exactamente lo que el enunciado pide, que las
 * > notas contradicen, y una que las notas afirman.
 *
 * Es la parte cara del tipo de ítem: obliga a que el cuaderno contenga, además del apoyo de
 * la clave, **un hecho que mate a cada distractor**. Sin ese hecho el ítem tendría dos
 * claves, que es la avería que R13 provoca si se aplica a medias.
 *
 * - **q23** — las cuatro explican por qué un oyente no entiende un mensaje silbado. **C**:
 *   el silbo es un código de señales que hay que haber aprendido; la nota 1 dice que lleva
 *   las vocales y consonantes de las palabras y no es un código. **A**: la distancia lo
 *   desgasta; la nota 2 dice que una frase silbada se distingue a cinco kilómetros cruzando
 *   un valle o una cumbre. **B**: se adquiere de niño junto con la lengua hablada y ya no
 *   después; la nota 1 dice también que los adultos que se instalan allí siguen los mensajes
 *   silbados en una temporada. Solo **D** queda en pie, y la sostienen dos notas: la 3
 *   (muchas palabras dan el mismo silbo, y lo ambiguo se resuelve por lo que el trabajo del
 *   día hace probable) y la 4 (silbadores de toda la vida perdieron las frases sobre asuntos
 *   de los que nadie silba).
 * - **q24** — las cuatro explican por qué el concejo revocó el voto de 1848. **B**: la
 *   compañía amenazó con parar solo donde se llevara su hora; la nota 1 dice que no pedía
 *   nada a los relojes de los pueblos ni hacía depender de ellos ninguna parada. **C**:
 *   entró un concejo nuevo; la nota 2 dice que los once elegidos en 1847 siguieron sin
 *   elección hasta 1853, y la 3 que quien revoca es «el mismo concejo». **D**: el telégrafo
 *   trajo la hora de la capital; la nota 4 lo fecha en 1858, siete años tarde. Solo **A**
 *   queda en pie, con la nota 3: las peticiones de los viajeros que llegaron al andén con
 *   el tren ya salido están en las actas de la sesión que revocó el voto.
 *
 *   **El orden de las viñetas no es libre**: en los dos cuadernos los tres hechos que matan
 *   a los tres distractores van en las viñetas de arriba —q23: la 1 mata a C y a B, con dos
 *   hechos distintos, y la 2 mata a A; q24: la 1 mata a B, la 2 y la 3 matan a C y la 4 mata
 *   a D— y el apoyo de la clave está abajo (en q24, dentro de esa misma nota 3). El cuaderno se lee una vez y de
 *   arriba abajo, sin volver. Antes el hecho que mata a **B** en q23 estaba en la sexta y
 *   última viñeta, y quien no llegaba a ella se quedaba con dos candidatas en pie.
 *
 * Los tres distractores de cada ítem son ahora **falsos dentro del cuaderno**, no
 * verdaderos-pero-ajenos. Por eso las dos situaciones son inventadas y llevan nombre propio
 * —los valles Ferrin, el pueblo de Marnec—: una afirmación falsa sobre un lugar que no
 * existe no enseña ningún hecho falso del mundo, y las tres causas descartadas son cosas
 * que en la historia real ocurrieron en otros sitios (la compañía que aprieta, el concejo
 * que cambia, el telégrafo que reparte la hora).
 *
 * El molde único de la versión 2 se conserva —las ocho opciones empiezan por «Because» y
 * gastan dos elementos del cuaderno— porque no estorba: no bastaba, pero cierra la fuga
 * formal que R12 describe.
 *
 * ## transitions (q26 · q25 · q27, en ese orden): lo que ve el panel a ciegas son cuatro conectores
 *
 * El examen a ciegas de `scripts/sat-blind-test.mjs` imprime el enunciado y las opciones sin
 * el texto. En un ítem de transiciones eso deja al solucionador **cuatro conectores y nada
 * más**, así que lo único que puede explotar es con qué frecuencia cada conector es la
 * respuesta en un examen real. **q25 lo acertaron 6 de 10** con la clave en «As a result,»,
 * que es la apuesta por defecto de cualquiera que haya visto exámenes: no había nada roto
 * en el texto, la clave estaba en el conector más adivinable del juego.
 *
 * Ahora «As a result,» es distractor y la clave es «In fact,». Los cuatro conectores siguen
 * siendo de **cuatro relaciones distintas** (ejemplo, precisión, consecuencia,
 * simultaneidad; regla 2 del plan), ninguno es raro ni de registro llamativo, y cada uno
 * tiene su camino real dentro del texto. El hueco precede a una oración independiente
 * completa, así que los cuatro caben sin romper la sintaxis y ninguno se poda por gramática.
 *
 * ⚠️ **El pasaje que aquí se describía ya no existe.** Era el de las plantas del desierto
 * —fotosíntesis nocturna, CO₂ guardado hasta la mañana siguiente, semanas de sequía— y se
 * retiró entero en la cuarta pasada de calibración (última sección de esta cabecera). Lo
 * vigente de este párrafo es el juego de conectores, que no se ha tocado desde entonces;
 * caduca todo lo que decía sobre el texto: «carries the plant through a whole sunlit day»,
 * «some of these plants» y el reloj de día y noche están en el pasaje anterior, no en el
 * que hay.
 *
 * Efecto de conjunto que esto deja, y que se asume a conciencia: en los tres ítems de
 * transiciones del bloque **la clave nunca es el conector de consecuencia** —«As a result,»,
 * «Hence,» y «Thus,» son los tres distractores; el tercero era «Consequently,» hasta que q27
 * se reescribió entero, ver la cuarta pasada—. Con tres ítems no es un
 * patrón explotable, y la alternativa, poner de clave el conector que se adivina, es
 * exactamente lo que filtraba.
 *
 * ### q26: la misma fuga, un piso más abajo (R14)
 *
 * Con q25 arreglado, **q26 se quedó en 7 de 10 a ciegas** y el juego era «Accordingly,» ·
 * «Moreover,» · «Instead,» · «For instance,». Tres relaciones de flujo —consecuencia,
 * adición, ejemplo, las tres que llevan un párrafo expositivo hacia delante— y **una sola de
 * giro**. Un solucionador que no ve el texto no necesita saber nada del texto: un ítem de
 * transiciones suele examinar el giro, así que apuesta al único que gira. Es la fuga de
 * frecuencia de **R14**, y aquí la marca no es de estilo sino de relación: «Instead,» no
 * llamaba por rara, llamaba por ser la única sustitución entre tres conectores de flujo.
 *
 * R14 dice también cuál es el arreglo que no vale: mover la clave a un conector corriente
 * deja la arquitectura «tres contra uno» en pie y la apuesta cae sobre un distractor. Así
 * que se arregló **el juego**, no la clave, y el reparto de relaciones pasó de 3+1 a **2+2**:
 *
 * - «Hence,» — consecuencia (flujo). Camino real: quien encadena por causa dos hechos porque
 *   van seguidos, y a quien el tono formal del conector se lo pone fácil.
 * - «On the contrary,» — refutación (giro). Es ahora **la opción más vistosa del juego** y es
 *   falsa: desmiente algo afirmado, y el texto no afirma nada sobre el estado de la casa,
 *   solo dice para qué venía preparada Mara —que vino preparada es verdad y nadie lo niega—.
 * - «Instead,» — sustitución (giro). La clave del plan, que no se mueve.
 * - «What is more,» — adición (flujo). Camino real: el paralelismo de las dos listas.
 *
 * Con dos giros en el juego, «apuesta al que gira» baja de 100 % a 50 %; y como el giro
 * vistoso es el falso, «apuesta al llamativo» pasa a valer 0. Para que los dos giros no se
 * cancelen entre sí —regla 2 del plan, dos sinónimos regalan el ítem— se separan por una
 * regla enseñable, no por matiz: **«on the contrary» contradice lo dicho; «instead» sustituye
 * lo esperado.** Y el texto se reescribió para que la sustitución sea término a término y en
 * el mismo orden —puerta, estufa, mesa, primero como Mara las temía y luego como estaban—,
 * que es lo que licencia «instead» y lo que deja sin apoyo a cualquier lectura concesiva o
 * refutativa. También se comprobaron dos pistas de forma: la clave no es ni la opción más
 * larga (16 caracteres «On the contrary,») ni la más corta (6, «Hence,»), y en q25 sí era la
 * más corta, así que «elige el conector más corto» deja de valer 2 de 3 en el bloque.
 *
 * ### q27: la fuga que q26 dejó anunciada, y que llegó donde se dijo
 *
 * ⚠️ **Esta sección describe un ítem que ya no existe.** El pasaje de la traducción y el juego
 * «Even so,» · «To be sure,» · «For instance,» · «Consequently,» se retiraron enteros en la
 * cuarta pasada de calibración (última sección de esta cabecera). Lo vigente de aquí es el
 * razonamiento de R14 —cómo se equilibra un juego de cuatro conectores en sus dos ejes,
 * marcación y relación—, que es lo que se ha vuelto a aplicar al juego nuevo. Caduca todo lo
 * demás: texto, opciones, longitudes y comprobaciones.
 *
 * Al entregar q26 este comentario dejó escrito que «q27 tiene hoy la arquitectura que q26 acaba
 * de perder; si la próxima ciega deja algo por encima del umbral en transiciones, es ahí donde va
 * a estar». Estaba. El juego era «Likewise,» · «To be sure,» · «For instance,» · «Consequently,»:
 * tres conectores de lista de manual y **uno solo raro**, y el raro era la clave. Es la fuga de
 * frecuencia de **R14** en su forma más pura —el marcado es el que parece la respuesta de una
 * pregunta de examen— y venía con la de q26 encima: tres relaciones de flujo (adición, ejemplo,
 * consecuencia) y **un solo giro**, que también era la clave. Las dos apuestas que un solucionador
 * sin texto puede formular sobre cuatro conectores señalaban la misma opción.
 *
 * R14 dice cuál es el arreglo que no vale, y aquí valía doble: mover la clave a un conector
 * corriente y de flujo deja las dos arquitecturas «tres contra uno» en pie y solo cambia de dueño
 * la apuesta. Se arregló **el juego**, como en q26, y en los dos ejes a la vez:
 *
 * - «Even so,» — giro, conector de prosa y no de lista. Sustituye a «Likewise,».
 * - «To be sure,» — concesión previa al giro. La clave del plan, que no se mueve.
 * - «For instance,» — ejemplo, conector de lista.
 * - «Consequently,» — consecuencia, conector de lista.
 *
 * Los dos ejes quedan **alineados a propósito**: los dos conectores de prosa son los dos giros y
 * los dos de lista son los dos de flujo. Alineados y no cruzados, porque cruzarlos deja la clave
 * como la única casilla «rara y de giro» a la vez, y esa conjunción de dos heurísticas vuelve a
 * identificarla. Así, «elige el raro» reparte 50/50, «elige el que gira» reparte el mismo 50/50 y
 * las dos juntas no añaden nada.
 *
 * Para que los dos giros no se cancelen entre sí —regla 2 del plan— se separan por una regla
 * enseñable y no por matiz: **«to be sure» concede lo que se va a matizar después; «even so»
 * es ya el matiz, y se apoya en una oposición que tiene delante.** En este párrafo el giro existe
 * pero llega dos oraciones más tarde, con «The difficulty is that…», así que quien lo adelanta al
 * hueco elige «Even so,».
 *
 * **Lo que hubo que tocar del texto, y por qué no bastaba con las opciones.** La segunda oración
 * decía «The claim is easy to state and hard to test», y esa duda previa era una oposición
 * disponible: con ella delante, «Even so,» se podía defender como «pese a que no se puede
 * comprobar, …», y el ítem tenía dos claves. Se sustituyó por «and the practice of publishers
 * bears them out», que va en la misma dirección que el resto del párrafo. La concesión de «To be
 * sure,» no la licenciaba aquella duda sino el giro del final, que sigue en su sitio.
 *
 * Comprobaciones de forma sobre el juego nuevo: la clave (11 caracteres) no es ni la más larga
 * (13) ni la más corta (8), de modo que «elige el conector más corto» sigue valiendo 1 de 3 en el
 * bloque y no 2 de 3. Y se mantiene lo que ya decía este comentario: **la clave nunca es el
 * conector de consecuencia** en los tres ítems de transiciones —«As a result,», «Hence,» y
 * «Consequently,» son los tres distractores— (el tercero es hoy «Thus,»).
 *
 * Puertas medidas sobre el bloque después de rehacerlo, no heredadas de la versión anterior:
 *
 * - **7 longitud**: 122,7 · 115,8 · 83,5 · 124,7 · 113,3 palabras-SAT, en el orden en que
 *   van (q23 · q24 · q26 · q25 · q27). Las cinco dentro de 25-150. Vienen de 144,3 · 146,2
 *   · 83,5 · 124,7 · 125,7: los tres que bajaron lo hacen por la calibración de más abajo,
 *   y los dos que no se tocaron no se movieron ni un decimal.
 * - **2 longitud de la clave**: la clave no es la opción más larga en ninguno de los cinco.
 *   En q23 y q24 tampoco es la más corta (q23: 157 · 150 · 149 · 155 caracteres; q24: 165 ·
 *   168 · 163 · 167). Ninguna opción se tocó al calibrar, así que esta puerta se lee igual
 *   que antes.
 * - **3 solape léxico**: en q23 la clave repite 8 palabras del texto contra 9, 6 y 4 de los
 *   distractores, y en q24 repite 11 contra 11, 10 y 12: en los dos queda estrictamente por
 *   debajo del máximo y por encima del mínimo, así que no cuenta por ninguna de las dos
 *   caras de la puerta. En los tres de transiciones el solape es 0 en las cuatro opciones.
 *   Los recortes del cuaderno movieron dos cifras de q23 —B de 5 a 6, C de 5 a 4— y ninguna
 *   de q24; la clave sigue sin ser ni el máximo ni el mínimo, que es lo que mide la puerta.
 * - **12 variedad temática**: humanidades ×2, historia, ciencia y literatura, uno cada uno.
 *
 * Lo que este bloque **no** trae: q23, q24, q25, q26 y q27 son ítems nuevos por R2 —los cinco
 * cambiaron el texto y no solo las opciones—, así que vuelven enteros a la cola de auditoría y la prueba a
 * ciegas hay que repetirla sobre ellos. El módulo todavía no tiene acta en
 * `docs/sat-auditorias/`, de modo que no hay ninguna huella firmada que estos cambios dejen
 * caducada.
 *
 * ## REPARTO DE LETRAS POR BLOQUE (21 ago 2026) — permutación pura, sin contenido nuevo
 *
 * El auditor de sesgo de conjunto midió el módulo entero y lo encontró bien repartido
 * (A7 B7 C7 D6) y apilado dentro de cada bloque: aquí no había ni una D en cinco ítems, y
 * en el bloque de lectura ninguna en ocho. Un estudiante que cuente letras sube del 25 %
 * al 33 % sin leer, que es exactamente la avería que en otro producto dejó cinco series
 * publicadas con la clave en A el 100 % de las veces —invisible ítem a ítem, evidente
 * contando—. Se movieron de sitio tres claves de este bloque: **q23 B → D**, **q25 B → D**
 * y **q27 A → B**. Reparto resultante: **A ×1, B ×1, C ×1, D ×2**.
 *
 * Lo que se hizo en los tres es reordenar las cuatro opciones y arrastrar con cada una su
 * razón de distractor; ni una opción se reescribió, ni una razón cambió de opción. Cómo
 * quedó cada permutación y por qué esa y no otra:
 *
 * - **q23** — se intercambian B y D. La clave (155 caracteres) queda entre la más larga
 *   (157, A) y la más corta (149, C), y su solape con las notas sigue por debajo del máximo
 *   y por encima del mínimo: la permutación no toca ninguna de las dos puertas.
 * - **q25** — se intercambian B y D, así que el juego queda «For instance,» · «Meanwhile,» ·
 *   «As a result,» · «In fact,». La clave sigue siendo la opción más corta del ítem, y eso
 *   una permutación no lo arregla: es la longitud de la palabra, no su posición. Sigue
 *   valiendo lo que ya decía este comentario —«elige el conector más corto» acierta 1 de 3
 *   en el bloque, no 2 de 3—.
 * - **q27** — ciclo de tres: «Likewise,» pasa a A, la clave «To be sure,» a B y
 *   «Consequently,» a D. Se descartó el intercambio simple A↔B porque dejaba el conector de
 *   consecuencia en A en dos de los tres ítems de transiciones (con «Hence,» en q26). Así
 *   los tres consecutivos caen en posiciones distintas —q25 C, q26 A, q27 D— y las tres
 *   claves de transiciones también: **D, C, B**.
 *
 *   **Posterior a esta permutación**, y sin tocar ninguna letra: «Likewise,» dejó de ser una de
 *   las cuatro opciones —lo sustituye «Even so,» en la misma A— por la fuga de frecuencia que
 *   describe la sección «q27» de más arriba. Todo lo que este párrafo dice sobre posiciones sigue
 *   vigente; lo que caduca es la comprobación de longitud, que ahora se lee así: la clave (11
 *   caracteres) no es ni la más larga (13) ni la más corta (8).
 *
 * Aquel desajuste ya está cerrado: `docs/sat-planes/sat-set-1-m2-facil.md` decía B, A, B, C, A
 * y hoy dice **D, A, D, C, B**, que es lo que hay en este array. Se copió del código al plan y
 * no al revés, que es el orden que manda: el reparto de claves se defiende a nivel de módulo.
 * Lo que sigue en pie es la regla de siempre —si un ítem «pide» otra letra se mueve el ítem, no
 * el reparto—, y por eso la sustitución de «Likewise,» por «Even so,» en q27 no tocó ni una
 * letra: la clave siguió en B.
 *
 * ## CALIBRACIÓN (22 ago 2026) — el precio de siete rondas cerrando fugas
 *
 * El calibrador midió los dos módulos y encontró la avería de conjunto que ninguna ronda de
 * fugas podía ver: **la rama estándar del módulo 2 salía más difícil que el módulo 1** (10,48
 * contra 10,07), de modo que la adaptación castigaba a quien va peor. Este bloque era el peor
 * de los ocho escritos: **12,00 de media, +1,40 sobre su equivalente del módulo 1**, con q23 y
 * q24 empatados en el techo (**14** los dos) y colocados en los puestos 23 y 24 de 27, o sea
 * hacia el minuto 27 de 32.
 *
 * La causa es lo que se venía haciendo: **cerrar una fuga sube la distancia entre opciones, y
 * eso sube la dificultad**. Siete rondas de eso sin medir el precio dejan un bloque que
 * discrimina muy bien y agota. Así que la calibración se hizo **sin tocar ni una opción ni una
 * razón**: el margen estaba en la complejidad del texto y en la carga de lectura, no en la
 * lógica del ítem. En q23 en particular, que las cuatro opciones sean relevantes al objetivo y
 * que solo las notas decidan **es** el arreglo que lo bajó de 10/10 a ciegas, y se queda.
 *
 * Lo que bajó, y por qué baja la carga sin volver el ítem más adivinable:
 *
 * - **q23** — el cuaderno pasa de **seis viñetas a cinco** y de 144,3 a **122,7** palabras-SAT.
 *   Se fusionan las dos notas que sostienen la clave (la ambigüedad del silbo y cómo la
 *   resuelve el trabajo del día) en una sola, y se cae la lista de ejemplos —animal
 *   descarriado, cambio de pasto, alguien subiendo— que no desmentía ni sostenía nada. Y las
 *   tres notas que matan a los tres distractores suben a las viñetas **1, 2 y 3**: antes la
 *   que mata a B era la sexta. El estudiante lee el cuaderno una vez, de arriba abajo, y no
 *   vuelve.
 * - **q24** — de **seis viñetas a cinco** y de 146,2 a **115,8**. Se cae entera la nota de los
 *   relojes de estación con doble aguja, que era ambiente, y la fecha de 1855 en que los
 *   periódicos dejaron de imprimir la hora local, que no desmentía ninguna opción. De las seis
 *   fechas que había que cruzar quedan las que trabajan, y el cruce se acorta: 1847 y 1853
 *   viven ahora dentro de la misma viñeta que 1848, y la nota del telégrafo dice ella misma
 *   «seven years after the reversal» en lugar de dejar la resta al estudiante.
 * - **q27** — de 125,7 a **113,3**. El texto sobre traducción era el más denso de los tres de
 *   transiciones: se acortan la segunda y la tercera oración sin quitar ninguna de las tres
 *   piezas que el ítem necesita —«and the practice of publishers bears them out», que es lo que
 *   impide la segunda clave; la concesión del hueco en su forma fuerte; y «The difficulty is
 *   that…» dos oraciones después—. **El juego de conectores no se toca**: siguen dos de prosa y
 *   dos de lista, con los dos giros alineados con los dos de prosa.
 *
 * **Ninguna de las tres rebajas toca lo que hay que razonar.** Los tres distractores de q23 y
 * q24 siguen muriendo por el mismo hecho del cuaderno que los mataba antes —el mismo hecho, con
 * el mismo texto, en otra viñeta—, y las razones solo cambiaron el número de la nota que citan.
 * Lo que se quitó es trabajo de barrido: viñetas que no desmienten nada, ejemplos, una fecha
 * suelta y una resta. Un ítem no se vuelve adivinable porque el cuaderno sea más corto; se
 * vuelve adivinable si el enunciado o la forma de las opciones señalan la clave, y eso está
 * intacto porque las opciones están intactas.
 *
 * **El intercambio de q25 y q26.** El grupo de transiciones medía 11 · 8 · 13 en su orden
 * anterior, o sea que empezaba por encima de su segundo ítem. Intercambiados los dos objetos
 * enteros —sin renumerar ni cambiar ids— queda **8 · 11 · 13**, creciente, que es lo que pide el
 * plan dentro de cada tipo. La puerta 9 del guardián mide la curva **por grupo de tipo**, no por
 * dominio, así que el bloque puede ir 3 · 3 · 1 · 2 · 3 sin romperla: síntesis retórica va 3 · 3
 * y transiciones 1 · 2 · 3.
 *
 * **Las etiquetas de dificultad, y lo que aún no se puede afirmar.** Se reetiquetan según lo
 * medido: q23 → **3**, q24 → **3**, q25 → **2**, q26 → **1** (medía 8, el suelo del bloque, y
 * estaba en 2; con esto las tres transiciones quedan 1 · 2 · 3, que es exactamente su medida).
 * q27 sigue en 3.
 *
 * ⚠️ **q23 y q24 llevan la etiqueta de antes de la rebaja.** El 14 se midió sobre los
 * cuadernos de seis viñetas. A ojo, con 122,7 y 115,8 palabras-SAT y los distractores muriendo
 * en las tres primeras viñetas, los dos deberían caer a la banda de 12 y pasar a **2** — pero
 * eso hay que medirlo, no estimarlo, y quien escribe esto no tiene la fórmula del calibrador.
 * Se deja el 3, que es el número que hay firmado, y **se pide re-medición**.
 *
 * ✅ **Re-medido, y la estimación solo acertó a medias.** Es la razón por la que se pedía la
 * medida en vez de aplicarla: q23 mide **12** —banda difícil, etiqueta 3 correcta— y solo q24
 * bajó, a **11**, o sea banda media y etiqueta **2**. Corregido en la quinta pasada, última
 * sección de esta cabecera. La mezcla del módulo no volvió a 12 · 12 · 3: la medida final es
 * **8 fáciles · 12 medios · 7 difíciles**.
 *
 * Por R2 los tres ítems con texto nuevo —q23, q24, q27— vuelven a la cola de auditoría y la
 * prueba a ciegas hay que repetirla sobre ellos. q25 y q26 no cambiaron ni un carácter: solo
 * cambiaron de sitio.
 *
 * ## CALIBRACIÓN, segunda pasada (22 ago 2026) — los dos pasajes que la primera dejó intactos
 *
 * La primera pasada bajó por el eje correcto —bajó la complejidad del texto y **no movió la
 * distancia entre opciones**, y la ciega se quedó en 19,8 %—, pero dejó sin tocar los pasajes
 * más densos, y dos de ellos son de este bloque. La rama estándar del módulo 2 seguía saliendo
 * más difícil que el módulo 1 (10,52 contra 10,26), que es lo que hace que la adaptación
 * castigue precisamente a quien va peor.
 *
 * Se corta **por oraciones**, y no se toca ni un conector: ni los cuatro de cada juego ni los
 * del texto. Lo que baja es la carga de lectura por oración; qué relación pide el hueco, que
 * es lo que el ítem mide, queda intacto.
 *
 * - **q25 (las plantas del desierto)** era **el pasaje más denso de todo el módulo**: 34,5
 *   palabras por oración de media y una oración de 43. Se parten dos oraciones y ninguna es la
 *   del hueco: la del mecanismo diurno queda «…keep their pores shut through the heat. They
 *   open them after dark, when the air is cool and still.», y la del CO₂ nocturno queda
 *   «…behind closed pores. That carries the plant through a whole sunlit day…». Baja a **23,0
 *   de media y 33 la más larga**, con **exactamente las mismas 138 palabras** —«which» pasa a
 *   «That» y «and» a «They»—, así que la puerta 7 se lee igual que antes.
 *
 *   Las dos piezas que sostienen la clave única siguen donde estaban. «carries the plant
 *   through a whole sunlit day» sigue siendo **la oración inmediatamente anterior al hueco**,
 *   que es lo que mata a «As a result,»: la consecuencia ya está dicha antes del hueco. Y **la
 *   oración del hueco no se parte**, porque sus dos mitades —semanas sin nada que absorber y
 *   el mismo carbono trabajado una y otra vez— son lo que la razón de A cita para negar que
 *   sea un ejemplo de la anterior; separarlas dejaría esa razón describiendo una oración que
 *   ya no existe.
 * - **q26 (la casa vacía)** medía 24,8 de media y 31 la más larga. Se parten dos oraciones, y
 *   tampoco es ninguna la del hueco: el arranque queda «…empty for nine winters. The track up
 *   to it had gone back to grass.» y el anuncio de la lista queda «Mara had come prepared for
 *   the worst of it. She expected a door swollen shut in its frame, …». Baja a **16,7 de media
 *   y 28 la más larga**, con una palabra más que antes (100 contra 99).
 *
 *   El segundo corte es el que había que pensar dos veces. La enumeración de tres —puerta,
 *   estufa, mesa— tiene que seguir **entera y en la oración inmediatamente anterior al
 *   hueco**, porque la razón de C la empareja término a término con la del hueco y la de D se
 *   apoya en su ritmo: sigue entera, solo cambia de sujeto de anuncio. Y «She expected…» **no
 *   le da apoyo a «On the contrary,»**: lo que el texto afirma sigue siendo una expectativa de
 *   Mara y no el estado de la casa, que es exactamente el argumento con el que la razón de B
 *   tumba esa opción —una expectativa no se contradice, se sustituye—.
 *
 * **La etiqueta de q26 vuelve a 2.** La primera pasada la bajó a 1 con un 8 medido; la
 * re-medición da **9**, que es banda 2, y se escribe lo medido aunque el corte de arriba lo
 * vaya a bajar otra vez. Las tres transiciones quedan **2 · 2 · 3** en el orden en que van
 * (q26 · q25 · q27), no decrecientes, y como la puerta 9 mide la curva por grupo de tipo, el
 * bloque puede seguir yendo 3 · 3 · 2 · 2 · 3.
 *
 * q26 es además **uno de los tres candidatos a banda fácil** que señala el calibrador, y esa
 * es la cifra que abrió toda esta ronda: hoy hay **cero ítems de lectura en banda fácil de
 * veinte**. Si tras el corte cae a 7, la etiqueta honrada pasa a ser 1 — pero eso se mide, no
 * se estima, que es el mismo aviso que dejó la primera pasada sobre q23 y q24.
 *
 * Por R2, q25 y q26 cambiaron de texto y vuelven los dos a la cola de auditoría: la ciega hay
 * que repetirla sobre ellos. **Ninguna opción y ninguna razón se tocaron**, aquí ni en q25: la
 * dificultad se baja por la carga de lectura, nunca por la distancia entre opciones, que es
 * donde vive el trabajo de ocho rondas contra la prueba a ciegas.
 *
 * ## CALIBRACIÓN, tercera pasada (22 ago 2026) — cuatro notas, y una oración menos donde sobraba
 *
 * El calibrador midió otra vez y este bloque seguía siendo **el más desviado de los cuatro**:
 * 11,40 de media contra 9,60 del mismo dominio en el módulo 1, con los otros tres bloques a
 * cero o casi. Todo el desvío del módulo salía de aquí, y el señalamiento fue exacto: **no
 * está en las opciones**, está en que q23 y q24 llevan **cinco notas y cada distractora muere
 * por una nota distinta**, de modo que hay que cruzar cinco puntos del cuaderno; y en que q27
 * seguía en 23,6 palabras por oración. Se cambia el estímulo, con permiso explícito, y **no se
 * toca ni una opción ni una razón** —de las razones solo cambia el ordinal de la nota que
 * citan, que es contabilidad, no argumento—.
 *
 * - **q23 · de cinco viñetas a cuatro.** La nota de la escuela y los adultos —la que solo
 *   servía para matar a **B**— deja de ser viñeta y entra, con su texto intacto, en la viñeta
 *   de la definición, que es la que mata a **C**. Las dos dicen lo mismo: qué es el silbo y
 *   quién puede leerlo. Va como **segunda oración de la viñeta**, no encadenada con punto y
 *   coma: una sola oración de 46 palabras habría subido la media del cuaderno de 20,8 a 25,0 y
 *   el eje de complejidad se habría comido el punto que baja la localización. Queda 21,0 de
 *   media, 4 viñetas y 123,0 palabras-SAT (eran 122,7: el cuaderno no adelgaza, se reordena).
 * - **q24 · de cinco viñetas a cuatro.** Aquí no hizo falta mover ningún asesino: la primera
 *   nota —«Until the 1840s every town set its clocks by local noon»— **no mata a ningún
 *   distractor y no sostiene la clave**, es el contexto. Deja de ser viñeta y entra como
 *   primera oración de la del ferrocarril, con su texto intacto. **Se probó a borrarla y se
 *   deshizo**: sin ella desaparece del cuaderno la única aparición de «town» a secas —«town's»
 *   y «towns'» son otros tokens para el guardián—, la clave cae de 11 a 10 palabras repetidas
 *   del texto y queda empatada en el mínimo con C. La cara inversa de la puerta 3 estaba en
 *   **0 %** en todo el módulo y habría pasado a 3,7 % por ahorrar once palabras: no compensa.
 *   El cuaderno se queda en **115,5** palabras-SAT (eran 115,8: se van dos caracteres de viñeta)
 *   y en 20,2 de media por oración; lo único que cambia es que hay cuatro puntos que cruzar y
 *   no cinco.
 * - **q27 · se parte la segunda oración.** 33 palabras → 12 y 20. La media baja de **23,8 a
 *   19,7** y la longitud de 113,3 a 112,3. La oración del hueco (39 palabras) sigue entera,
 *   protegida por lo que citan las razones de A y de D.
 * - **q26 · el candidato barato a banda fácil.** Medía 9 con cero ítems de lectura en banda
 *   fácil de veinte, contra tres en el módulo 1. Se cae «The track up to it had gone back to
 *   grass» —la única oración que no cita ninguna razón— y el cierre pierde «in the doorway».
 *   De 101 a **88 palabras** y de 85,0 a **75,3 palabras-SAT**. El segundo recorte no es
 *   adorno: quitar solo la oración del camino **sube** la media por oración de 16,8 a 18,2 y
 *   cruza el umbral de 18; con los dos, queda en 17,6 y el texto se mantiene en el escalón más
 *   bajo del eje de complejidad. La lista de lo que Mara esperaba **ya estaba pegada al
 *   hueco** —es la oración inmediatamente anterior desde la segunda pasada—, así que de las
 *   dos vías que el calibrador ofrecía solo quedaba la del recorte.
 *
 * **Las dos condiciones de la entrega, y cómo se cumplen.** Primera: *cada distractor sigue
 * muriendo por su propia razón*. En q23 la viñeta 1 mata ahora a dos distractores, pero con
 * **dos hechos independientes** —«no es un código de señales fijas» tumba a C y no dice nada
 * de la edad a la que se aprende; «los adultos que se instalan siguen los mensajes en una
 * temporada» tumba a B y no dice nada de si el silbo es un código—. Ningún distractor cambió
 * de asesino: cambió de sitio el asesino de uno. En q24 no cambió ni eso. Segunda: *las cuatro
 * opciones siguen siendo relevantes al objetivo y solo las notas deciden*. Ninguna opción se
 * tocó, así que el arreglo de R13 —el que bajó estos dos de 10/10 a ciegas— está intacto.
 *
 * **Lo que esto sustituye de la lista de la puerta 7**: las cinco longitudes pasan a ser
 * **123,0 · 115,5 · 75,3 · 124,8 · 68,0** palabras-SAT en el orden en que van (q23 · q24 ·
 * q26 · q25 · q27). Las cinco siguen dentro de 25-150; q25 no se tocó en esta pasada.
 *
 * Las puertas mecánicas se corrieron antes y después (`node scripts/check-sat-exam.mjs
 * --module sat-set-1-m2-facil --verbose`) y el módulo imprime **exactamente los mismos
 * números**: claves A7 B7 C7 D6, clave más larga 3,7 %, más corta 7,4 %, solape alto 11,1 %,
 * solape bajo 0 %. Era lo esperado —ninguna opción cambió y de los dos cuadernos no se quitó
 * ni una palabra—, pero se comprueba, porque el intento de borrar la nota de contexto de q24
 * movió la cara inversa de la puerta 3 y eso no se ve leyendo el ítem. En aquella pasada el
 * único fallo restante era el acta; quedó firmada el 23 de agosto de 2026.
 *
 * **Lo que no se puede afirmar aquí.** Quien escribe esto no tiene la fórmula del calibrador,
 * así que las cifras de arriba son los motores del cambio, no la nueva dificultad. Lo esperado
 * es q23 y q24 de 13 a **12** por el eje de localización, q27 de 12 a **11** por el de
 * complejidad, y q26 de 9 a **8** si el recorte le baja la localización —si no se la baja, q26
 * se queda en 9 y lo único que habrá ganado es carga de lectura—. **Las etiquetas `dificultad`
 * del `meta` no se han tocado**: se cambian con la medida delante, no con la estimación.
 *
 * Por R2, q23, q24, q26 y q27 cambiaron de texto y vuelven los cuatro a la cola de auditoría:
 * la ciega hay que repetirla sobre ellos. q25 no cambió ni un carácter en esta pasada.
 *
 * ## CALIBRACIÓN, cuarta pasada (22 ago 2026) — el último texto denso, y la curva medida antes de tocarla
 *
 * El bloque quedó en **10,60** de media contra 9,40 del mismo dominio en el módulo 1, y sigue
 * siendo el único de los cuatro por encima de su equivalente. Igualarlo no se puede: `q23` y
 * `q24` son `rhetorical-synthesis`, que arranca en A=3 y E=2 por definición de la escala, de
 * modo que su suelo es 11 y hoy miden 12 cada uno. Aquí el objetivo es **acotar, no igualar**.
 *
 * El único punto barato que quedaba era `q25`, que medía **11** —el más alto de los tres de
 * transiciones— y por el mismo diagnóstico exacto que tenía `q27` antes de reescribirlo: era
 * el único texto denso que quedaba fuera de dos ítems, 138 palabras a 23,0 por oración para
 * elegir entre cuatro conectores. `q27` cayó de 12 a 9 cuando se reescribió entero con un
 * pasaje concreto y corto; a `q25` se le ha hecho lo mismo.
 *
 * **Lo que se conserva de `q25`, y es todo lo que el plan fija de un ítem**: tipo
 * (`transitions`), dominio (EOI), tema (ciencia), **clave D** y su posición, la cuarta del
 * bloque. La fila 26 del plan dice **D** y ahí sigue: mover esa letra a otra bajaría la D del
 * módulo de 6 a 5 y subiría otra a 8, y el reparto de claves se defiende a nivel de módulo,
 * no de ítem.
 *
 * **Lo que se conserva además, y el plan no obliga: las cuatro opciones.** «For instance,» ·
 * «Meanwhile,» · «As a result,» · «In fact,» siguen exactamente como estaban, con sus cuatro
 * relaciones distintas y ninguna marcada. El pasaje nuevo está escrito para que cada una
 * conserve su camino real: el cuantificador «some of these frogs» abre «For instance,», el
 * calendario «winter / By midwinter / In spring» abre «Meanwhile,», y el mecanismo del azúcar
 * abre «As a result,» —que muere, como antes, porque la consecuencia ya está dicha en la
 * oración inmediatamente anterior al hueco, hoy «costs the frog surprisingly little»—. Las
 * **razones sí son nuevas**, y no había alternativa: citaban literalmente un pasaje que ya no
 * existe. Es lo mismo que se hizo con `q27`, `q10` y `q15`.
 *
 * **El pasaje nuevo, medido**: 76 palabras (el encargo pedía 70-90), **67,8 palabras-SAT**,
 * seis oraciones de 12 a 13 palabras —media 12,7— y las dos que el conector une contiguas:
 * «A whole winter locked in ice costs the frog surprisingly little.» y la del hueco. Venía de
 * 124,8 palabras-SAT y 23,0 de media. **La lista de la puerta 7 pasa a ser 123,0 · 115,5 ·
 * 75,3 · 67,8 · 68,0** palabras-SAT en el orden en que van (q23 · q24 · q26 · q25 · q27); las
 * cinco siguen dentro de 25-150.
 *
 * **La medida, eje por eje, con la escala del calibrador delante**
 * (`docs/sat-auditorias/informes/sat-set-1-m1-dificultad.md` §1; bandas 5-7 fácil · 8-11 medio
 * · 12-15 difícil):
 *
 * | eje | antes | ahora | por qué |
 * |---|---|---|---|
 * | T · complejidad | 2 | **1** | media de 23,0 a 12,7 palabras por oración, léxico corriente y tema concreto (una rana bajo la hojarasca, no fotosíntesis nocturna) |
 * | L · localización | 3 | **2** | decidían la oración del hueco, la anterior, el mecanismo repartido en tres oraciones y el cuantificador; ahora decide el par contiguo, que es lo máximo que puede bajar un ítem de transiciones: el conector une dos oraciones y hay que leer las dos |
 * | D · distancia | 3 | 3 | ninguna opción se tocó |
 * | A · abstracción | 2 | 2 | relación discursiva, por tipo |
 * | E · enunciado | 1 | 1 | «…the most logical transition» es fórmula fija sin metalenguaje |
 * | **suma** | **11** | **9** | banda media, en su mitad baja |
 *
 * **La curva, medida antes de decidir (R16).** El encargo avisaba de que la curva de
 * transiciones iba 9 · 11 · 9 y de que el plan la pide creciente, y avisaba también de que no
 * se arreglara con los números del propio encargo. Medida después: **9 · 9 · 9** en el orden
 * en que van (q26 · q25 · q27). Es no decreciente, que es lo que comprueba la puerta 9 —que
 * compara con `<`, de modo que el empate pasa—. **Así que no se intercambia nada.** Si se
 * hubiera aplicado la regla antes de medir, dando por hecho que `q25` caería a 7 u 8, se
 * habría movido `q25` delante de `q26` para arreglar una curva que ya estaba bien.
 *
 * **Las etiquetas `dificultad` tampoco se mueven**: 9 es banda media y `q25` estaba en 2. Los
 * tres de transiciones siguen en 2 · 2 · 3 declarados, con `q27` etiquetado por encima de su
 * medida desde la tercera pasada.
 *
 * **Lo que gana el bloque**: 12 · 12 · 9 · 9 · 9 = 51, media **10,20** contra 10,60. El módulo
 * 1 en EOI está en 9,40, así que la brecha del bloque pasa de +1,20 a +0,80 sin tocar una sola
 * opción de los cinco ítems.
 *
 * Por R2 `q25` vuelve entero a la cola de auditoría. La prueba a ciegas **sí** hay que
 * repetirla sobre él aunque las opciones no hayan cambiado, porque lo que la ciega mide en un
 * ítem de transiciones es la frecuencia de los cuatro conectores y eso solo se lee sobre el
 * conjunto vigente; y hay que volver a comprobar la clave única contra el pasaje nuevo.
 *
 * ## QUINTA PASADA (22 ago 2026) — una etiqueta mal puesta que sostenía una puerta
 *
 * **Contabilidad, no contenido: no se ha tocado ni un texto, ni una opción, ni una razón.** No
 * hay un solo carácter nuevo dentro de los cinco ítems; lo único que cambia es el número de
 * `dificultad` de `q24` y el sitio en el que van `q23` y `q24` dentro de los dos arrays.
 *
 * **La medida.** El calibrador re-midió lo que la primera pasada dejó pedido a gritos y la
 * cuarta dio por bueno: `q23` mide **12** —banda difícil, su 3 es correcto— y `q24` mide
 * **11**, que es banda media y estaba declarado **3**. Se corrige a **2**. Es exactamente el
 * caso que la primera pasada previó a medias: se estimó que caerían los dos y cayó uno, que es
 * por lo que aquella entrega escribió «esto hay que medirlo, no estimarlo» y dejó el 3 puesto.
 *
 * **Por qué la corrección arrastra un reordenamiento, y no es opcional.** La puerta 9 mide la
 * curva **por grupo de tipo** y compara con `<`, así que dentro de `rhetorical-synthesis` la
 * secuencia declarada no puede decrecer. Con `q23` (3) delante de `q24` (2) quedaba **3 · 2** y
 * la puerta se ponía roja. Lo incómodo de mirar es lo otro: hasta hoy esa puerta pasaba
 * **porque la etiqueta estaba mal**, no porque el bloque estuviera ordenado. Un 3 de más tapaba
 * una curva invertida —el ítem caro delante del barato— durante cinco pasadas. Es el mismo
 * accidente que el módulo 1 arrastra, y la lección es que una etiqueta desactualizada no es
 * documentación floja: es una puerta desactivada sin que nadie lo decida.
 *
 * Así que **se intercambian `q23` y `q24` enteros**, objeto por objeto en `items` y en `meta`,
 * cada id con su contenido y sin renumerar —que es lo que licencia el comentario de la puerta
 * de ids: el id es un nombre, no una posición—. El orden de pantalla pasa de `q23 · q24 · q26 ·
 * q25 · q27` a **`q24 · q23 · q26 · q25 · q27`**.
 *
 * Lo que queda medido y declarado, en el orden en que van:
 *
 * | posición | id | medida | etiqueta | tipo | clave | tema |
 * |---|---|---|---|---|---|---|
 * | 23 | `q24` | 11 | **2** | rhetorical-synthesis | A | historia |
 * | 24 | `q23` | 12 | 3 | rhetorical-synthesis | D | humanidades |
 * | 25 | `q26` | 9 | 2 | transitions | C | literatura |
 * | 26 | `q25` | 9 | 2 | transitions | D | ciencia |
 * | 27 | `q27` | 9 | 2 | transitions | B | humanidades |
 *
 * Medidas **11 · 12 · 9 · 9 · 9**; etiquetas **2 · 3 · 2 · 2 · 2**. Los dos grupos de tipo van
 * no decrecientes —síntesis 2 · 3, transiciones 2 · 2 · 2— y el empate pasa porque la puerta
 * compara con `<`.
 *
 * **Lo que se gana además, y no es cosmético.** El bloque EOI es el último del cronómetro:
 * empieza hacia el minuto 27 de 32, con el estudiante cansado. Hasta hoy **abría con su ítem
 * más caro** (12) y bajaba desde ahí; ahora abre con 11 y el pico llega en la segunda. Es el
 * defecto que el módulo 1 tiene y que este no tenía por qué heredar.
 *
 * **Las tres comprobaciones de conjunto, hechas sobre el orden nuevo:**
 *
 * - **Costura de claves (puerta 1).** El bloque anterior termina en `q21` **D** y `q22` **B**;
 *   con el orden nuevo la tira es **D · B · A · D · C · D · B**. No hay ni dos letras iguales
 *   seguidas, mucho menos tres, ni dentro del bloque ni cruzando la costura. El reparto del
 *   módulo no se mueve: A7 B7 C7 D6, porque una permutación de posiciones no crea ni destruye
 *   ninguna letra.
 * - **Temas adyacentes.** `q22` es humanidades, y hasta hoy le seguía `q23`, que también lo es:
 *   **el orden viejo tenía dos temas iguales pegados en la costura** y el nuevo lo deshace. La
 *   tira queda humanidades · historia · humanidades · literatura · ciencia · humanidades, sin
 *   ninguna pareja adyacente repetida. La puerta 12 mide otra cosa —el techo del 40 % por
 *   tema— y no se mueve, porque los cinco temas son los mismos.
 * - **Puerta 9, los dos grupos en verde.** Descrito arriba: 2 · 3 y 2 · 2 · 2.
 *
 * **Lo que esto sustituye de la lista de la puerta 7**: las cinco longitudes son las mismas y
 * solo cambian de sitio las dos primeras, **115,5 · 123,0 · 75,3 · 67,8 · 68,0** palabras-SAT
 * en el orden en que van. Las cinco dentro de 25-150.
 *
 * **Dos frases de esta cabecera que ya no son ciertas, y se corrigen aquí en vez de reescribir
 * pasadas fechadas.** La cuarta pasada dice que el bloque «sigue siendo el único de los cuatro
 * por encima de su equivalente» y las tres primeras dicen que **la rama estándar sale más
 * difícil que el módulo 1**: eso era verdad cuando se escribió y hoy no lo es. El módulo mide
 * **9,33** contra **10,19** del módulo 1 y los cuatro bloques quedan por debajo de su homólogo;
 * el desvío de este bloque, que la cuarta pasada se comprometió a acotar en +0,80, queda en
 * **+0,67**. Y donde la cuarta pasada dice que las tres transiciones «siguen en 2 · 2 · 3
 * declarados», léase **2 · 2 · 2**: `q27` está en 2 desde que se reescribió entero.
 *
 * **Por R2 esto no devuelve nada a la cola de auditoría.** R2 manda ítem nuevo cuando cambia el
 * texto o cambian las opciones, y aquí no ha cambiado ninguna de las dos cosas en ninguno de los
 * cinco. Lo mismo valió para `q25` y `q26` cuando se intercambiaron en la primera pasada: solo
 * cambiaron de sitio.
 *
 * ## Recorte de opciones de q23 y q24 (23 ago 2026): la grasa estaba en la estructura repetida
 *
 * La simulación de estudiantes midió lo que no había medido nadie: **el módulo no cabe en sus 32
 * minutos**. 4.876 palabras para 32 minutos, y un B2 sólido necesita 43,6. q23 y q24 eran dos de
 * los cinco ítems más caros —271 y 285 palabras, 2,4 y 2,6 minutos— y van en los puestos 23 y 24
 * de 27, o sea donde ya no queda reloj. Los cuadernos ya se recortaron dos veces (seis viñetas →
 * cinco → cuatro), así que esta vez se toca **el juego de opciones**, que es donde queda grasa:
 * las cuatro opciones de cada ítem comparten estructura y arrastraban la misma cola.
 *
 * - **q24 · la cola compartida.** Tres de las cuatro terminaban en «the council gave up in 1851
 *   the local time it had voted to keep in 1848» (19 palabras) y la cuarta en una variante suya.
 *   El enunciado ya dice «reversed its 1848 vote», así que la cola no aportaba nada: queda «the
 *   council gave up local time in 1851» (8 palabras) e idéntica en las cuatro. 663 → 534
 *   caracteres.
 * - **q23 · las colas propias.** Cada opción arrastraba una coda que repetía su propia premisa:
 *   «a whistle worn thin on the way», «what is whistled», «without having learned the signal for
 *   it», «about matters that». Se cortan las cuatro. 611 → 537 caracteres.
 *
 * **Total del recorte: 203 caracteres, 42 palabras, 33,8 palabras-SAT** entre los dos ítems.
 * Ninguna nota, ninguna clave y ninguna razón de muerte se movió: A de q23 sigue cayendo por la
 * nota 2 (una frase silbada se distingue a cinco kilómetros), B por la nota 1 (los adultos que se
 * instalan allí siguen los mensajes en una temporada), C por la nota 1 (el silbo no es un código
 * de señales fijas); en q24, B por la nota 1, C por la nota 2 y D por la nota 4.
 *
 * ### Y en q24, un escape de medición: la clave repetía la última línea del cuaderno
 *
 * La nota 3 decía «petitions from travelers who had reached the platform after their train had
 * left» y la clave decía «travelers… reaching the platform to find their train already gone». Se
 * contestaba emparejando palabras, sin leer nada más. La clave dice ahora lo mismo con otras:
 * «dozens of people in the town kept missing departures at the station and said so in writing».
 * De la nota 3 solo sobrevive «dozens», que es un cuantificador y no lleva a ninguna parte: hay
 * que saber que una petición es decir algo por escrito y que llegar al andén con el tren fuera es
 * perder la salida. **La clave no se movió: sigue siendo A**, y la proposición es la misma —no se
 * añade ninguna causa que el cuaderno no tenga; en particular, la clave sigue sin afirmar que
 * fueran los relojes del pueblo los que hacían perder el tren, que es un eslabón que las notas no
 * escriben—.
 *
 * En C se cambió «new members» por «rivals» por la puerta 3, no por sentido: con la cola corta,
 * los solapes quedaban 8 · 9 · 8 · 9 y la clave empataba en el mínimo. Con «rivals» quedan 8 · 9
 * · 7 · 9. La razón de C no cambia —los once de 1847 siguieron sin elección hasta 1853—.
 *
 * **Puertas medidas sobre el juego nuevo, no estimadas:**
 *
 * - **2 longitud de la clave**: q24 → 139 · 139 · 122 · 134 (la clave empata con B en el máximo,
 *   así que no es la más larga en solitario y la puerta no la cuenta); q23 → 129 · 136 · 136 ·
 *   136 (la clave empata con B y C). Ninguna de las dos es la más corta.
 * - **3 solape léxico**: q24 → clave 8 contra 9, 7 y 9; q23 → clave 7 contra 8, 5 y 4. En los dos
 *   queda estrictamente entre el máximo y el mínimo, por las dos caras, y el fallo duro (clave −
 *   mejor distractor ≥ 3) está a −1 en ambos.
 * - **7 longitud del texto**: sin tocar. El recorte es de opciones, y la puerta 7 mide el
 *   `stimulus`.
 * - **12 variedad temática**: sin tocar.
 *
 * Esto **caduca dos cifras de la cuarta pasada**, más arriba en esta cabecera: donde dice «q23:
 * 157 · 150 · 149 · 155 caracteres; q24: 165 · 168 · 163 · 167» y «en q23 la clave repite 8
 * palabras del texto contra 9, 6 y 4… y en q24 repite 11 contra 11, 10 y 12», valen las cifras de
 * esta pasada. Y **por R2, q23 y q24 vuelven a la cola de auditoría**: cambiaron las opciones, y
 * la prueba a ciegas hay que repetirla sobre los dos.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q24',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• Until the 1840s every town set its clocks by local noon. The railway company printed one timetable for the whole line and kept the capital's time at every station; it asked nothing of the towns' clocks and made no stop depend on them.\n• In 1848 the council of Marnec voted to keep local time on the town's clocks; the eleven men elected in 1847 sat on with no new election until 1853.\n• In 1851 the same council reversed the vote; its minutes record dozens of petitions from travelers who had reached the platform after their train had left.\n• The telegraph reached the district in 1858, seven years after the reversal.",
    text: 'The student wants to explain why the council of Marnec reversed its 1848 vote. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Because dozens of people in the town kept missing departures at the station and said so in writing, the council gave up local time in 1851.',
      'Because the railway company had warned that its trains would stop only where its own time was kept, the council gave up local time in 1851.',
      'Because the men who carried the 1848 vote lost their seats to rivals at the polls, the council gave up local time in 1851.',
      "Because a telegraph line had begun to bring the capital's time into the district each morning, the council gave up local time in 1851.",
    ],
    answer: 0,
  },
  {
    id: 'q23',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• In the Ferrin valleys herders whistle the words of the language spoken there; the whistle carries their vowels and consonants, not a code of fixed signals. Children take whistling at school half an hour a week, and adults who settle there follow whistled messages within a season.\n• A whistled sentence is made out five kilometers off, across a valley or over a ridge; a shout fades in a few hundred meters.\n• Many words come out as the same whistle, and herders settle an unclear one by what the day's work makes likely.\n• In a test there, herders who had whistled all their lives missed sentences about matters nobody whistles about, though every word was ordinary.",
    text: 'The student wants to explain why some listeners cannot understand a whistled message. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Because a whistled sentence has to cross a whole valley or a ridge to arrive, a listener five kilometers off makes nothing of it.',
      'Because whistling is acquired in childhood with the spoken language, a listener who came to the valleys as an adult makes nothing of it.',
      'Because a whistled message keeps the melody of a sentence and not its words, a listener makes nothing of it without learning its signal.',
      "Because many words of the language sound alike once whistled, a listener makes nothing of a message the day's work does not make likely.",
    ],
    answer: 3,
  },
  {
    id: 'q26',
    type: 'mcq',
    part: 1,
    stimulus:
      'The house had stood empty for nine winters. Mara had come prepared for the worst of it. She expected a door swollen shut in its frame, a stove packed with nine years of cold ash, a table buried under fallen plaster. ______ the door swung when she pushed it, the stove still held a scoop of dry coal, and on the table stood a jar of pears sealed under wax. She waited a long while before she went in, listening to a house that somebody had been keeping.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'Hence,',
      'On the contrary,',
      'Instead,',
      'What is more,',
    ],
    answer: 2,
  },
  {
    id: 'q25',
    type: 'mcq',
    part: 1,
    stimulus:
      'A frog of the northern woods spends the winter under the leaf litter. By midwinter ice has formed between its cells and its heart has stopped. Sugar floods the cells and holds them whole while the frog is frozen. In spring the frog thaws, hops away, and feeds within a day. A whole winter locked in ice costs the frog surprisingly little. ______ some of these frogs freeze and thaw many times in a single winter.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'For instance,',
      'Meanwhile,',
      'As a result,',
      'In fact,',
    ],
    answer: 3,
  },
  {
    id: 'q27',
    type: 'mcq',
    part: 1,
    stimulus:
      'The art school in Verel keeps one room of plaster casts. Each cast is a copy of a Greek statue, poured in a mold in 1880. The school stopped teaching from casts in 1962 and has not gone back. A sign by the door tells every visitor that nothing inside is original. ______ the room is full on Monday mornings, when students come to draw the casts. What they want is a face that will hold still for three hours.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'Instead,',
      'Even so,',
      'For instance,',
      'Thus,',
    ],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q24',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: es la única causa que el cuaderno sitúa entre los dos votos. Las actas de la sesión de 1851 recogen decenas de peticiones de viajeros que llegaron al andén con el tren ya salido (nota 3): la presión existe, es anterior a la revocación y sale del propio pueblo. La opción dice eso mismo sin ninguna de esas palabras —gente del pueblo que pierde salidas en la estación y lo pone por escrito—, de modo que no se llega a ella emparejando: hay que saber que una petición es decir algo por escrito y que llegar al andén con el tren fuera es perder la salida. Las otras tres son motivos igual de razonables para que un concejo se desdiga, y las notas los desmienten uno a uno.',
      B:
        'Falsa por la nota 1: la compañía imprimía un solo horario con la hora de la capital, no pedía nada a los relojes de los pueblos y no hacía depender de ellos ninguna parada. Es el motivo que primero se le ocurre a cualquiera —el fuerte aprieta al débil— y por eso se lleva los votos de quien razona con el mundo en lugar de con el cuaderno. En las notas no hay ninguna amenaza de la compañía.',
      C:
        'Falsa por las notas 2 y 3: los once hombres elegidos en 1847 siguieron en el cargo sin elección nueva hasta 1853, y quien revoca en 1851 es «el mismo concejo»: no hubo urnas por medio, ni rivales que les quitaran el escaño. Es el camino de quien explica un cambio de voto por un cambio de votantes, que es como se deshacen la mayoría de los acuerdos municipales. Aquí no cambió nadie: cambiaron de opinión los mismos once.',
      D:
        'Falsa por la nota 4: el telégrafo llegó al distrito en 1858, siete años después de la revocación. Es el camino de quien sabe cómo acabó la historia de la hora única —señal horaria repartida por telégrafo— y la adelanta hasta la fecha que le hace falta. Con las notas delante, para descartarla basta mirar el año, y esa nota dice ella sola cuántos años sobran.',
    },
    fuenteHecho:
      'Patrón histórico libre: hora local por mediodía solar en cada población, horarios de ferrocarril impuestos desde una sola ciudad y señal horaria por telégrafo, que en la vida real llegó más tarde. Marnec, el distrito, las fechas y las cifras son inventados. **El nombre cambió el 23 ago 2026 y el porqué importa:** el pueblo se llamaba «Brantwood», que es la casa real de John Ruskin en Cumbria, hoy museo abierto al público. Era el único topónimo del módulo que corresponde a un lugar real ajeno a la ficción, y el ítem le atribuye a ese lugar un concejo, dos votaciones y un ferrocarril que no existieron: el módulo entero está construido sobre la regla contraria —los distractores son falsos **dentro del cuaderno**, sobre sitios que no existen, para que ninguno enseñe un hecho falso del mundo— y este nombre la rompía. «Marnec» se comprobó en buscador antes de fijarlo: no aparece como localidad, ni como casa, ni como accidente geográfico en ningún país, y no está a una letra de ninguno (se descartaron por eso «Halverton», a una letra de Halberton en Devon, y «Marlbeck», que es una mina real en County Durham). Quien lo vuelva a cambiar, que repita la búsqueda. El nombre no aparece en ninguna opción, solo en el cuaderno y en el enunciado, de modo que ni las longitudes ni el solape léxico se mueven; el registro es el mismo de los demás inventados del módulo (Aldrec, Valmar, Trestona, los valles Ferrin). Los tres distractores atribuyen a ese pueblo inventado motivos que en otros sitios sí se dieron —la presión de la compañía, el relevo del concejo, el telégrafo—, de modo que ninguno enseña un hecho falso. El 22 ago 2026 el cuaderno pasó de cinco viñetas a cuatro: la nota de contexto —«Until the 1840s every town set its clocks by local noon»—, que no mata a ningún distractor ni sostiene la clave, deja de ser viñeta y entra como primera oración de la del ferrocarril. Ni una palabra se quitó y ningún distractor cambió de asesino; primero se probó a borrarla y se deshizo, porque sin ella el cuaderno perdía la única aparición de «town» a secas (solo quedaban las formas con genitivo, que para el guardián son otros tokens) y la clave caía de 11 a 10 palabras repetidas del texto, empatada en el mínimo con C. La puerta 3 se mide por las dos caras y esa cara estaba en 0. **Actualización del 23 ago 2026**: con las opciones recortadas y la clave reescrita para que no repita la última viñeta, las cifras de esta nota ya no son las de hoy —la clave repite 8 palabras del texto contra 9, 7 y 9—, pero el motivo por el que se conservó aquella primera oración sigue en pie: «town» es una de las ocho, y sin ella la clave bajaría a 7 y empataría con C en el mínimo. El recorte está explicado en la cabecera.',
  },
  {
    id: 'q23',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Falsa por la nota 2: una frase silbada se distingue a cinco kilómetros, cruzando un valle o pasando una cumbre, y lo que se apaga en unos cientos de metros es el grito. Explica exactamente lo que pide el enunciado —por qué un oyente no saca nada de un mensaje silbado— pero apoyada en un hecho que el cuaderno niega. Es el camino de quien busca el obstáculo en la distancia, que es el único dato de las notas con forma de cifra, y confunde no oír con no entender.',
      B:
        'Falsa por la nota 1: el silbo se da en la escuela media hora a la semana, y los adultos que se instalan en los valles siguen los mensajes silbados en una temporada. Es el camino de quien traslada al silbo el período crítico de la adquisición de lenguas: suena a explicación experta, que es justo lo que la hace peligrosa, y el cuaderno la desmiente en la misma nota que habla de la escuela.',
      C:
        'Falsa por la nota 1: el silbo lleva las vocales y consonantes de las palabras y no es un código de señales fijas, de modo que no hay una señal aprendida para cada mensaje. Es la idea popular del silbo como morse de montaña, y por eso es la trampa del ítem: suena a explicación completa y no la sostiene ninguna nota. Quien la marca ha dado por supuesto justo lo que la primera nota corrige.',
      D:
        'Correcta: es la única de las cuatro causas que las notas afirman. Muchas palabras salen como el mismo silbo, así que el oyente completa lo que falta con lo que el trabajo del día hace probable: las dos cosas están en la nota 3. Por eso, en la prueba de la nota 4, silbadores de toda la vida perdieron las frases sobre asuntos de los que nadie silba, aunque cada palabra fuera corriente. Las otras tres explican lo mismo por causas que el cuaderno desmiente una a una.',
    },
    fuenteHecho:
      'Hecho libre de lingüística: el habla silbada reproduce las vocales y consonantes de una lengua hablada —no es un código de señales—, se distingue a varios kilómetros y depende del contexto, porque muchas palabras dan el mismo silbo y el oyente las resuelve por lo previsible del mensaje. Donde se enseña en la escuela lo hace como asignatura obligatoria de media hora semanal. Los valles Ferrin, la prueba de la nota 4 y las cifras son inventados: así los tres distractores afirman cosas falsas sobre un lugar que no existe y ninguno enseña un hecho falso del mundo. El 22 ago 2026 el cuaderno pasó de cinco viñetas a cuatro: la nota de la escuela y los adultos se metió, con su texto intacto, en la viñeta de la definición, porque las dos dicen lo mismo —qué es el silbo y quién puede leerlo—. No se quitó ningún hecho ni se tocó ninguna opción: C sigue muriendo porque el silbo no es un código de señales fijas y B porque los adultos que se instalan allí siguen los mensajes en una temporada, dos hechos distintos dentro de una misma viñeta.',
  },
  {
    id: 'q26',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Hace de lo que Mara encuentra la consecuencia de los nueve inviernos vacíos: la casa lleva tanto tiempo sola que —de ahí— la puerta gira y el carbón sigue seco. Una casa cuidada no se sigue del abandono; del abandono se seguiría justo lo que ella traía en la cabeza y no estaba. Es el camino de quien enlaza por causa dos hechos solo porque van seguidos en el párrafo, y el tono formal del conector se lo pone fácil.',
      B:
        'Es la trampa del ítem y la opción más vistosa de las cuatro: también marca un giro, de modo que quien busque «el conector que da la vuelta» tiene aquí dos donde elegir y no le sirve de nada. «On the contrary» desmiente algo que se acaba de afirmar, y pide que lo afirmado sea negativo: «la casa no estaba en ruinas; on the contrary, …». El texto no afirma nada sobre el estado de la casa; afirma que Mara vino preparada para lo peor, y eso la oración del hueco no lo desmiente, porque preparada vino. Lo que falla no es lo dicho, es lo esperado, y una expectativa no se contradice: se sustituye.',
      C:
        'Correcta: la oración anterior enumera para qué venía preparada Mara —una puerta hinchada en el marco, una estufa con nueve años de ceniza fría, una mesa sepultada bajo el yeso caído— y la del hueco pone, término a término y en el mismo orden, lo que había en su lugar: la puerta gira al empujarla, la estufa guarda una palada de carbón seco, sobre la mesa hay peras selladas bajo cera. «Instead» marca esa sustitución de lo esperado por lo encontrado, y el cierre lo confirma: alguien había estado cuidando la casa.',
      D:
        'Suma la segunda lista a la primera, y el paralelismo invita a ello: tres cosas —puerta, estufa, mesa— con el mismo ritmo y en el mismo orden que la anterior. Pero la segunda no se añade a la primera, la reemplaza objeto por objeto: no hay dos puertas ni dos estufas, hay una que Mara esperaba encontrar de un modo y encontró del contrario. Es el camino de quien sigue el ritmo del párrafo sin comprobar qué dice cada elemento y da por hecho que el inventario de la casa sigue creciendo.',
    },
    fuenteHecho:
      'Prosa narrativa original de registro literario, escrita para este ítem. Ni personaje, ni casa, ni obra de referencia: no hay fuente externa. El 22 ago 2026 el pasaje se partió por oraciones sin cambiar de contenido —el arranque y el anuncio de la lista pasan a dos oraciones cada uno—: baja de 24,8 a 16,7 palabras por oración de media y de 31 a 28 la más larga. La enumeración de tres sigue entera en la oración anterior al hueco, que es lo que emparejan las razones de C y de D, y ninguna opción se tocó. El 22 ago 2026 se cortó otra vez, y por el mismo eje: se cae «The track up to it had gone back to grass», la única oración del pasaje que no cita ninguna razón, y el cierre pierde «in the doorway». Baja de 101 a 88 palabras y de 85,0 a 75,3 palabras-SAT, con 17,6 de media por oración —por debajo de 18, que es lo que mantiene el texto en el escalón más bajo del eje de complejidad; borrar solo la oración del camino lo habría subido a 18,2, o sea que el segundo recorte no es adorno—. La enumeración de tres, la oración del hueco y el cierre que confirma la clave siguen donde estaban.',
  },
  {
    id: 'q25',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Lee la oración del hueco como un ejemplo de la anterior, y «some of these frogs» invita a ello. Pero un ejemplo tendría que ser un caso de lo que se acaba de afirmar —una rana pasando un invierno entero helada y saliendo indemne— y lo que la oración describe va más allá: no un deshielo al final, sino muchos dentro del mismo invierno. Es el camino de quien ve un cuantificador y oye «por ejemplo».',
      B:
        'Sigue el calendario del texto en vez de su argumento: hay invierno, hay «By midwinter» y hay primavera, y de ahí a leer el cierre como algo que ocurre a la vez hay un paso. Pero en el hueco no hay dos procesos simultáneos ni dos sujetos: son las mismas ranas y el mismo mecanismo, contados por veces en lugar de por un solo invierno.',
      C:
        'Encadena por consecuencia dos oraciones que dicen lo mismo con distinta intensidad. Aguantar muchas heladas no se sigue de aguantar una: es la misma capacidad enunciada en su límite. Y la consecuencia del mecanismo ya está dicha en la oración anterior —«costs the frog surprisingly little»—, así que ponerla otra vez en el hueco repite el eslabón. Es lo que elige quien encuentra un mecanismo descrito y da por hecho que el final del párrafo es su efecto; es, con diferencia, la apuesta segura del que no lee.',
      D:
        'Correcta: la oración del hueco dice lo mismo que la anterior, llevado al extremo. La anterior afirma que un invierno entero encerrada en hielo le cuesta sorprendentemente poco; la del hueco, que algunas lo repiten muchas veces dentro de ese mismo invierno y siguen saliendo indemnes. Mismo sujeto, mismo mecanismo, misma dirección y más fuerza: eso es lo que marca «In fact». El párrafo no cambia de relación al cerrar, sube la apuesta.',
    },
    fuenteHecho:
      'Hecho libre de fisiología animal: hay ranas de bosque templado que invernan bajo la hojarasca con el hielo formado entre las células y no dentro, con el corazón parado, con azúcar acumulada en las células como protección, y que se deshielan y se vuelven a helar varias veces en un mismo invierno. Sin especie, sin país y sin estudio concretos, como el resto del módulo. **Pasaje escrito de cero el 22 ago 2026 para la banda baja**, en sustitución del de las plantas del desierto, que era el texto más denso que quedaba fuera de dos ítems (138 palabras a 23,0 por oración): 76 palabras, 67,8 palabras-SAT, 12,7 palabras por oración de media y 13 la más larga. Las dos oraciones que el conector une son contiguas y dicen lo mismo con distinta fuerza —lo que un invierno helada le cuesta a la rana, y cuántas veces lo repite—, y los tres distractores conservan dentro del texto su camino real: el cuantificador «some of these frogs» para el de ejemplo, el calendario «winter / By midwinter / In spring» para el de simultaneidad y el mecanismo del azúcar para el de consecuencia. **Las cuatro opciones no se tocaron**: siguen siendo cuatro relaciones distintas y ninguna marcada.\n\n**Veracidad (23 ago 2026): «nothing at all» era un absoluto que la fisiología no sostiene.** Tolerar la congelación no es gratis —consume el glucógeno que produce el azúcar protector y tiene un límite de ciclos—, así que la oración anterior al hueco dice ahora «costs the frog surprisingly little». La relación que el conector marca no cambia: sigue siendo la misma afirmación llevada al extremo, y por eso «In fact» sigue siendo la única sostenible. Se tocaron con ella las dos razones que la citaban —C la cita literal y D la parafraseaba— porque citaban una frase que ya no está en el texto; ni una opción se movió.',
  },
  {
    id: 'q27',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'Sustituye lo esperado por lo ocurrido, y el texto ofrece dónde agarrarse: dos oraciones antes se dice que la escuela dejó de enseñar con vaciados en 1962 y no ha vuelto, así que el hueco parece anunciar lo que se hace en la sala en lugar de aquellas clases. Falla por dos sitios. «Instead» opera sobre la oración que tiene delante, y esa —el cartel, todo son copias— sigue siendo verdad después del hueco: no se sustituye nada. Y lo que hacen los estudiantes del lunes es exactamente lo que hacían aquellas clases, dibujar los vaciados: eso es continuidad, no reemplazo. Es el camino de quien busca la expectativa fallida más atrás en el párrafo y no comprueba qué frase toca el conector.',
      B:
        'Correcta: la oración anterior al hueco es la razón para esperar una sala vacía —un cartel avisa a cada visitante de que ahí dentro no hay nada original—, y la del hueco dice lo contrario, que los lunes está llena de gente dibujando esos mismos vaciados. Las dos siguen siendo verdad a la vez: los vaciados no dejan de ser copias porque vengan estudiantes. Eso es lo que marca «Even so», que concede el hecho y va contra lo que ese hecho hace esperar. El cierre lo confirma: lo que buscan es una cara que aguante quieta tres horas, de modo que ser copias no les estorba.',
      C:
        'Toma la oración del hueco por un caso de la anterior, y la forma invita: «every visitor» es un plural general y lo que sigue son datos concretos —los lunes por la mañana, estudiantes, dibujar—, que es la silueta de un ejemplo. Pero un ejemplo tiene que ser un caso de lo que se acaba de afirmar, y lo afirmado es qué dice el cartel. Una sala llena no ilustra que un cartel avise de nada; va contra lo que ese aviso hace esperar. Es el camino de quien ve concreción detrás de una frase general y oye «por ejemplo».',
      D:
        'Encadena por causa dos hechos solo porque van seguidos. Que un cartel avise de que nada es original no produce una sala llena: si algo hace esperar, es la sala vacía, y ese desajuste es justo lo que el conector correcto marca. Quien elige aquí ha leído las dos oraciones como eslabones de una cadena sin preguntarse en qué dirección va la flecha, y el tono breve y formal del conector se lo pone fácil.',
    },
    fuenteHecho:
      'Patrón libre de la enseñanza del arte: las academias reunieron en el siglo XIX colecciones de vaciados en yeso de estatuas antiguas, el dibujo del yeso salió de los planes de estudio a mediados del XX y muchas salas de vaciados sobrevivieron y volvieron a usarse para dibujar del natural. La escuela de Verel, las fechas de 1880 y 1962, el cartel y los lunes por la mañana son inventados: ni escuela, ni colección, ni estatua reales, y ninguna afirmación del pasaje enseña un hecho falso sobre un sitio que exista. Pasaje escrito de cero el 22 ago 2026 para la banda fácil: 80 palabras, 68,0 palabras-SAT, 13,3 palabras por oración de media y 15 la más larga, con las dos oraciones que el conector une contiguas —el cartel y la sala llena— y el cierre confirmando la concesión.\n\n**R14 revisado el 23 ago 2026: el juego se queda como está, y con el residuo escrito.** El auditor de lengua señaló que «Even so» es el único concesivo de las cuatro y que se puede llegar a él por descarte de categoría, sin leer el pasaje. Se miró qué elimina de verdad esa vía y qué costaría cerrarla, y sale a cuenta no cerrarla:\n\n1. **El descarte por categoría no llega hasta la clave.** «Instead» es también de la familia del contraste —sustituye lo esperado por lo ocurrido— y de hecho es la clave de q26, dos ítems antes en el orden de lectura. Quien solo sepa «aquí hace falta un conector de contraste» se queda con dos, no con una; y para bajar de dos a una tiene que distinguir concesión de sustitución, que es exactamente lo que el ítem mide. Ese atajo no rodea la competencia: es la competencia. El residuo, dicho sin adornos, es un 50 % para quien identifique la relación y no lea el pasaje.\n2. **Un segundo concesivo crea segunda clave.** «Nevertheless», «Nonetheless», «All the same» y «However» caben los cuatro en la frase y ninguno se puede defender como peor que «Even so». Es la puerta 4 y no se negocia.\n3. **El único contrastivo que no crea segunda clave es «On the contrary», y sale caro por dos sitios.** Uno: ya es distractor en q26, dentro del mismo grupo de tres transiciones, y ponerlo dos veces sin que pague nunca fabrica el patrón aprendible «la trampa vistosa jamás es la clave», que es R14 con otro dueño —el mismo defecto que la pasada del 23 ago 2026 acaba de quitarle a los signos del bloque SEC—. Dos: acerca las opciones entre sí y sube el eje de distancia, y este ítem está firmado en banda fácil a propósito, porque sostiene el arranque de la curva del bloque. El encargo de esa pasada era explícito: lo que se toque tiene que medir lo mismo o menos.\n\nLas cuatro opciones y las cuatro razones se quedan como estaban.',
  },
]
