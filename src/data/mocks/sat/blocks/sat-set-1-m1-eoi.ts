import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Expression of Ideas del módulo `sat-set-1-m1` — ítems q23 a q27.
 *
 * Plan: docs/sat-planes/sat-set-1-m1.md (filas 23-27). Textos: docs/sat-planes/
 * sat-set-1-m1-textos-eoi.md, copiados literalmente, viñetas incluidas.
 *
 * Las claves son las del plan y no se negocian ítem a ítem: C, A, D, B, C.
 *
 * Dos formas distintas dentro del mismo bloque:
 *
 * - **transitions** (q25-q27): el hueco `______` precede siempre a una oración
 *   independiente completa, así que los cuatro conectores caben ahí sin romper la
 *   sintaxis. Lo que decide es el contenido; ninguna opción se poda por gramática
 *   (trampa 1 del plan).
 * - **rhetorical-synthesis** (q23-q24): el `stimulus` no es prosa, son las notas del
 *   estudiante, y el encabezado y las viñetas cuentan para la longitud. Las cuatro
 *   opciones comparten el molde de la clave (R5 del blueprint §4 bis): en q23 las cuatro
 *   son definiciones con la forma «[modificador antepuesto], the ghazal is a poetic
 *   form…»; en q24 las cuatro comparan con la forma «X, while Y». Tapando las notas no se
 *   poda ninguna.
 *
 * Corrección de agosto de 2026, tras la auditoría de forma. Queda **derogada** la regla
 * anterior de este bloque —«las cuatro opciones son verdaderas y solo fallan por
 * objetivo»—: con ella la clave era la única con forma de definición en q23 y la única que
 * comparaba en q24, así que se encontraba sin leer las notas. Ahora cada ítem lleva
 * distractores con el molde exacto de la clave y **falsos** por un dato comprobable de las
 * notas (q23 A por la nota 5 y B por la nota 4; q24 B, con las cifras de la nota 5
 * intercambiadas); los demás son ciertos y sirven a otro objetivo. Esto diverge de
 * `docs/sat-planes/sat-set-1-m1-textos-eoi.md`, que en «Trampa 1 del plan» pide que todas
 * las opciones sean verdaderas: manda R5.
 *
 * R4 (reparto del solape léxico): la clave de q23 repite vocabulario de las notas a
 * propósito —13 palabras de contenido, frente a 16, 12 y 11 de los distractores— para que
 * el bloque no premie la estrategia de contar coincidencias y quedarse con la opción que
 * menos tiene. En q24 la clave repite once palabras de las notas y los distractores nueve,
 * doce y diez: queda estrictamente entre el máximo y el mínimo, así que el ítem no cuenta
 * para ninguna de las dos caras de la puerta 3; antes contaba para la cara baja.
 *
 * Segunda corrección de agosto de 2026, tras medir la prueba a ciegas con panel
 * (`scripts/sat-blind-test.mjs`): ocho solucionadores que solo veían enunciados y opciones
 * eligieron la clave de q24 siete veces y la de q26 seis, contra un techo del 35 %. Los dos
 * juegos se rehicieron por R8 —primero las cuatro opciones como cuatro objetos
 * indistinguibles, después cuál de ellas sostiene el texto—:
 *
 * - **q24**: las cuatro comparan ahora la cobertura de los dos métodos con cifras, mismo
 *   molde y misma longitud. Se van las dos opciones que se podaban sin leer las notas —la
 *   que comparaba procedimientos sin dar resultados y la que cruzaba cobertura con horas de
 *   trabajo—, que reducían el ítem a un cara o cruz entre la clave y su espejo. Tres de las
 *   cuatro dan la victoria al trasplante, para que el saber previo (el método más laborioso
 *   rinde más) tampoco señale la clave.
 * - **q26**: el conector de consecuencia era el único de su familia, así que se acertaba
 *   eligiendo «el de causa» sin leer una palabra. Ahora «After all» ocupa también terreno
 *   causal —con la flecha invertida: presenta lo que sigue como razón de lo anterior— y el
 *   contraste lo lleva «However», que es la opción con más tirón para quien responde a
 *   ciegas.
 *
 * Tercera corrección de agosto de 2026 (R9), tras el segundo panel: q26 bajó a 3 de 8, pero
 * **q24 subió de 7 a 8 de 8**. Con las cuatro opciones ya iguales en forma, longitud y
 * alcance, lo que seguía delatando la clave era que las tres falsas llevaban la falsedad
 * puesta por fuera: una intercambiaba las cifras —y el saber previo sabe que trasplantar
 * haces adultos rinde más que sembrar—, otra metía un 12 % que no cuadraba con el 31 % de
 * las demás, y la tercera colgaba el «three years later» de la segunda mitad. La clave era
 * la única frase bien construida del juego, y eso se ve sin las notas.
 *
 * Ahora las cuatro dan 46 al trasplante y 31 a la siembra, a los tres años, en el mismo
 * molde de dos cláusulas coordinadas, con 12 caracteres entre la más corta y la más larga y
 * el mismo verbo repetido en las dos mitades. Lo único que las separa es **qué miden esos
 * porcentajes**: lecho marino cubierto (clave), pradera arrasada que se devolvió, parcelas
 * en las que el método prendió, densidad alcanzada frente a la pradera sana. Las cuatro
 * magnitudes son medidas de restauración que un ecólogo publicaría; cuál de ellas está en
 * las notas no se puede saber sin las notas, que es justamente lo que pide R9. Ninguna
 * opción se cae por su propio dibujo (R7) y ninguna es podable por saber previo: las cuatro
 * dan la victoria al trasplante.
 *
 * El enunciado también filtraba y se recortó. Decía «compare how successful the two
 * restoration methods were»: al nombrar el éxito, apuntaba al par de cifras de resultado y
 * dejaba fuera cualquier otra magnitud. Ahora dice solo «compare the two restoration
 * methods», que no anticipa en qué consiste la comparación buscada. La clave sigue siendo
 * única: las otras tres son falsas por las notas, no peores que la clave.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q23',
    type: 'mcq',
    part: 1,
    stimulus:
      'While researching a topic, a student has taken the following notes:\n\n• The ghazal is a poetic form that has been written for more than a thousand years, first in Arabic and Persian and later in Urdu.\n• A ghazal is built from couplets, or pairs of lines.\n• Each couplet is meant to stand on its own, and readers often quote one by itself.\n• In a ghazal, every couplet ends with the same repeated word or phrase.\n• Poets writing in English have adapted the form, some keeping the repeated ending and some dropping it.',
    text: 'The student wants to introduce the ghazal to an audience unfamiliar with the form. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'First written in Arabic and Persian and later in Urdu, the ghazal is a poetic form that poets writing in English have adapted without dropping its repeated ending.',
      'Built from couplets, or pairs of lines, each of which ends on a repeated word of its own, the ghazal is a poetic form more than a thousand years old.',
      'Written for more than a thousand years in Arabic, Persian, and Urdu, the ghazal is a poetic form built from couplets, or pairs of lines.',
      'Adapted by poets writing in English, the ghazal is a poetic form whose couplets readers often quote one at a time, away from the rest.',
    ],
    answer: 2,
  },
  {
    id: 'q24',
    type: 'mcq',
    part: 1,
    stimulus:
      'While researching a topic, a student has taken the following notes:\n\n• Seagrass meadows are beds of flowering plants that grow underwater and shelter young fish.\n• A storm destroyed most of the meadow in one shallow bay, and researchers tried two ways of restoring it.\n• Method 1: divers transplanted adult shoots taken from a healthy meadow nearby.\n• Method 2: volunteers scattered seeds gathered from flowering plants.\n• After three years, transplanted plots covered 46 percent of the seabed and seeded plots covered 31 percent.\n• Transplanting took about four times as many working hours per plot as seeding.',
    text: 'The student wants to compare the two restoration methods. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'After three years, the plots restored by transplanting covered 46 percent of the seabed, and the plots restored by seeding covered 31 percent.',
      'After three years, transplanting had restored 46 percent of the meadow that the storm destroyed, and seeding had restored 31 percent.',
      'After three years, the transplanted adult shoots had taken hold in 46 percent of the plots, and the scattered seeds had taken hold in 31 percent.',
      'After three years, the transplanted plots were 46 percent as dense as the healthy meadow, and the seeded plots were 31 percent as dense.',
    ],
    answer: 0,
  },
  {
    id: 'q25',
    type: 'mcq',
    part: 1,
    stimulus:
      'A century ago most public libraries in Europe kept their shelves closed to readers. A visitor copied a call number onto a slip of paper and handed it to a clerk. The clerk went into the back rooms and returned with the book. Nobody browsed. ______ readers in those same buildings now walk in among the shelves, pull down whatever catches their attention, and leave with books they had not come to find.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'For example,',
      'In addition,',
      'Consequently,',
      'By contrast,',
    ],
    answer: 3,
  },
  {
    id: 'q26',
    type: 'mcq',
    part: 1,
    stimulus:
      'The wheat harvest failed across the highland districts in 1846, and within a single season the price of bread in the provincial capitals doubled. Newspapers recorded the shortage in unusual detail: three of them printed weekly tables of grain prices, and a fourth sent a correspondent through the affected villages. ______ thousands of families left the highlands for work in the coastal ports during the two years that followed, and the census of 1850 found several hamlets standing empty.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'After all,',
      'As a result,',
      'For example,',
      'However,',
    ],
    answer: 1,
  },
  {
    id: 'q27',
    type: 'mcq',
    part: 1,
    stimulus:
      'Historians of the first decade of photography often describe the medium as pure recording: the camera took down whatever stood in front of it, and the operator chose nothing. The description is not baseless: exposures lasted several minutes, the apparatus was too heavy to move from room to room, and anyone who shifted position during that time ruined the picture. ______ the portraits that survive from those years are far from uniform. One operator lit a face from a single side and left the other half in shadow; another arranged a room so that the subject appeared to have been interrupted at work. The conditions narrowed the range of choices open to the photographer; they did not eliminate it.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'On the contrary,',
      'Accordingly,',
      'Nonetheless,',
      'Likewise,',
    ],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q23',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'Falsa por media nota. La quinta dice que unos poetas en inglés conservan el final repetido y otros lo suprimen; aquí la adaptación se cuenta «without dropping its repeated ending». Es lo que escribe quien lee «some keeping the repeated ending» y da la viñeta por terminada. Lleva el molde de definición de la clave y abre con la misma nota de origen, así que solo cae al releer la nota 5 entera.',
      B:
        'Falsa por un dato comprobable. La nota 4 dice que todos los pareados terminan con la MISMA palabra o frase repetida; aquí cada uno termina con una propia. Es el error de quien arrastra la nota 3 —cada pareado se sostiene solo— hasta la 4 y concluye que también el final va por libre en cada pareado. Es la opción más cercana a la clave: mismas dos notas, mismo molde con las mitades invertidas; sin comprobar la nota 4 no hay manera de separarlas.',
      C:
        'Correcta: responde a las dos preguntas de quien no conoce la forma —qué es y desde cuándo (nota 1) y de qué está hecha (nota 2)— y se trae el glosario de la propia nota, «couplets, or pairs of lines», para no dejar al lector nuevo con un término que no maneja. Es la única que dice de qué está construido un ghazal sin decir a la vez algo falso sobre ello.',
      D:
        'Cierta (notas 5 y 3) y escrita para otro objetivo. Sus dos afirmaciones —qué han hecho con la forma los poetas en inglés y cómo la citan los lectores— presuponen que ya se sabe qué es un ghazal: nombra los pareados sin decir que la forma esté construida con ellos y sin traducirlos. Quien la elige confunde presentar la forma con contar qué se hace hoy con ella.',
    },
    fuenteHecho:
      'Hecho libre de historia literaria: origen árabe del ghazal, desarrollo en persa y urdu, pareados autónomos con final repetido. Redacción original; sin fechas de adopción al inglés, que son discutidas.',
  },
  {
    id: 'q24',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A:
        'Correcta: las notas miden una sola cosa en los dos métodos, con la misma vara y en el mismo corte —cuánto lecho marino llegaron a cubrir las parcelas de cada uno a los tres años, 46 % y 31 % (nota 5)—, y eso es exactamente lo que esta opción afirma, sin añadirle nada. Las otras tres trasladan ese mismo par de cifras a una magnitud que ninguna viñeta registra.',
      B:
        'Falsa por el denominador. El 46 % y el 31 % son lo que cubrieron las parcelas de cada método (nota 5), no la parte de la pradera arrasada que cada método devolvió: las notas no dan ninguna cifra de la bahía entera, y la nota 2 dice que la tormenta se llevó «most of the meadow», no el 77 % que saldría de sumar estas dos. Es el camino de quien lee el resultado de unas parcelas como si fuera el balance de la bahía y convierte una cobertura en un porcentaje de recuperación.',
      C:
        'Falsa por la unidad de medida. La nota 5 da el porcentaje de lecho marino que quedó cubierto, no la proporción de parcelas en las que el método prendió: cubrir el 46 % del fondo no es haber prendido en 46 de cada 100 parcelas, y una misma cobertura media es compatible con cualquier reparto entre parcelas. Es el error de quien convierte una medida de superficie en la tasa de éxito por parcela con que suelen resumirse los ensayos, y de paso atribuye a los haces y a las semillas un resultado que se midió sobre el fondo.',
      D:
        'Falsa por el punto de comparación. Las notas enfrentan un método con el otro, no cada método con la pradera sana: esa pradera aparece solo como el sitio de donde los buzos sacaron los haces (nota 3), y ninguna viñeta mide densidad —lo medido es cuánto lecho quedó cubierto—. Es el camino de quien espera que un estudio de restauración lleve una pradera de referencia y da por hecho que las dos cifras están expresadas respecto a ella.',
    },
    fuenteHecho:
      'Hecho libre de restauración de praderas marinas: trasplante de haces adultos frente a siembra de semillas, con mayor prendimiento y mucho más trabajo por superficie en el trasplante. Bahía, tormenta, años y porcentajes inventados.',
  },
  {
    id: 'q25',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 1,
    tema: 'humanidades',
    razones: {
      A:
        'Lee la última oración como una ilustración del sistema descrito antes. No ilustra el depósito cerrado: describe la práctica opuesta, con el lector entre las estanterías.',
      B:
        'Suma la última oración al sistema cerrado como un rasgo más. «Nobody browsed» lo impide: lo que viene después sustituye esa práctica, no se añade a ella.',
      C:
        'Presenta el acceso libre como efecto del depósito cerrado. En ningún punto dice el texto que una práctica produjera la otra; solo que una vino después.',
      D:
        'Correcta: cuatro oraciones describen un sistema —papeleta, empleado, «Nobody browsed»— y la quinta describe el contrario en los mismos edificios. El adverbio «now» ya lleva el cambio de época, así que al conector solo le queda la oposición.',
    },
    fuenteHecho:
      'Hecho libre de historia de las bibliotecas: depósito cerrado con petición por papeleta hasta bien entrado el siglo XX. Sin biblioteca, ciudad ni fecha concretas.',
  },
  {
    id: 'q26',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Invierte la flecha causal: da la marcha de las familias como la razón de que los periódicos dedicaran tanto espacio a la carestía. La cronología lo impide —la salida ocupa los dos años siguientes y los caseríos vacíos aparecen en el censo de 1850, después de esa cobertura—, así que no puede explicarla. Es el camino de quien toma la oración de los periódicos por la afirmación central del párrafo y lee la última como su justificación.',
      B:
        'Correcta: la causa está dos oraciones más arriba —cosecha perdida y pan al doble en una sola temporada—, y la salida de miles de familias hacia los puertos y los caseríos vacíos del censo de 1850 son su consecuencia. La oración de los periódicos es un paréntesis sobre cómo quedó registrada la carestía, no un eslabón de la cadena.',
      C:
        'Toma la emigración por un ejemplo de la cobertura minuciosa que acaba de describirse. Los ejemplos de esa cobertura ya están dados en la misma oración —las tablas semanales de tres periódicos y el corresponsal del cuarto—, y marcharse a los puertos no es una manera de registrar una escasez.',
      D:
        'Marca la marcha como algo que ocurre en contra de lo esperado, pero el texto no levanta ninguna expectativa que contradecir: en ningún punto dice que la atención de la prensa aliviara la carestía ni que retuviera a nadie. Es el camino de quien lee la cobertura como un intento de remediar la crisis y necesita un «pese a ello» para lo que vino después.',
    },
    fuenteHecho:
      'Patrón histórico libre: cosecha fallida, encarecimiento del pan, emigración de montaña hacia los puertos y despoblamiento en el censo siguiente. Sin país, región ni periódicos reales; 1846 solo fecha una serie inventada.',
  },
  {
    id: 'q27',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Declara falso lo que la oración anterior acaba de conceder. El cierre del párrafo lo desmiente: las condiciones «narrowed the range of choices» y no la suprimieron, de modo que lo concedido sigue siendo verdadero al terminar.',
      B:
        'Convierte la variedad de los retratos en consecuencia de las exposiciones largas y del equipo pesado. El texto presenta esas condiciones como el límite dentro del cual se eligió, no como la causa de que unos retratos se parezcan tan poco a otros.',
      C:
        'Correcta: la oración anterior concede terreno con tres razones y el hueco abre la vuelta al argumento propio —pese a todo lo concedido, los retratos no se parecen entre sí—. La última oración confirma la dirección: estrecharon el margen de elección, no lo eliminaron.',
      D:
        'Alinea la oración con la lista anterior, como si los retratos desiguales fueran una prueba más de que la cámara registraba sin elegir. Dicen lo contrario: son la diferencia entre un operador y otro.',
    },
    fuenteHecho:
      'Hecho libre de historia de la fotografía: exposiciones de minutos, equipo pesado y retratos conservados con decisiones de luz y puesta en escena muy distintas. Discusión disciplinar real; ningún historiador, fotógrafo ni imagen citados.',
  },
]
