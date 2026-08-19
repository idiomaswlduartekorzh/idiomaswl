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
 * menos tiene. En q24 la clave y su espejo empatan; ninguna clave del bloque es la más
 * alta ni la más baja.
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
    text: 'The student wants to compare how successful the two restoration methods were. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Transplanted plots covered 46 percent of the seabed after three years, while seeded plots covered 31 percent.',
      'Seeded plots covered 46 percent of the seabed after three years, while transplanted plots covered 31 percent.',
      'Seeded plots covered 31 percent of the seabed after three years, while transplanting took about four times as many working hours per plot as seeding.',
      'Divers transplanted adult shoots taken from a healthy meadow nearby, while volunteers scattered seeds gathered from flowering plants.',
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
      'Moreover,',
      'As a result,',
      'For instance,',
      'Nevertheless,',
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
        'Correcta: mide a los dos métodos con la misma vara y en el mismo momento —cobertura del lecho marino a los tres años— y da a cada uno su cifra, el 46 % al trasplante y el 31 % a la siembra (nota 5). Es la única que compara lo que consiguió cada método.',
      B:
        'Falsa: intercambia las dos cifras de la nota 5. Es el molde de la clave palabra por palabra, de modo que por la forma no se descarta y hay que volver a la viñeta. El camino hasta aquí es real y doble: reconstruir de memoria qué número era de quién, o dar por supuesto que ganó la siembra porque la nota 6 la presenta como la barata.',
      C:
        'Cierta y con las varas cruzadas: mide la siembra por su resultado (31 %) y el trasplante por su coste (cuatro veces más horas por parcela, nota 6). Son dos cifras que no se pueden poner una frente a otra. Quien la elige compara el par correcto en la dimensión equivocada y sale de ahí tomando el método más barato por el más exitoso.',
      D:
        'Cierta y sin resultados: compara los dos procedimientos (notas 3 y 4) —quién hizo cada cosa y con qué material— y se detiene justo antes de la viñeta que trae las cifras. Responde a cómo se hizo, no a cómo salió. Es lo que escribe quien busca en las notas las dos que hablan de los métodos y no relee el objetivo.',
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
        'El error que el texto está construido para provocar: leída solo la oración anterior, «los periódicos lo documentaron con detalle» más «además, se marcharon miles de familias» encaja sin roce. La marcha no es un dato más de la cobertura, es el efecto de la carestía de dos oraciones antes.',
      B:
        'Correcta: la causa está dos oraciones más arriba —cosecha perdida y pan al doble en una sola temporada—, y la salida de miles de familias y los caseríos vacíos del censo de 1850 son su consecuencia.',
      C:
        'Toma la emigración por un ejemplo de la escasez que los periódicos registraron. Las ilustraciones de esa cobertura ya están dadas en la oración anterior: las tablas semanales y el corresponsal.',
      D:
        'Supone que la cobertura de la prensa debería haber frenado la marcha, y por eso la marca como algo que ocurre a pesar de ella. El texto no atribuye a los periódicos ninguna influencia sobre lo que hicieron las familias.',
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
