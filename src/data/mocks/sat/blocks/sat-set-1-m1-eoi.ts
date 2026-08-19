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
 *   opciones son **verdaderas** respecto de las notas: ninguna falla por ser falsa,
 *   todas fallan por cumplir otro objetivo que el declarado en el enunciado.
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
      'In a ghazal, every couplet must close on the same word or phrase, and the poet repeats it without variation.',
      'Because each couplet in a ghazal is meant to stand on its own, readers often quote a single one away from the rest.',
      'Written for over a millennium in Arabic, Persian, and Urdu, the ghazal is a poem made up of two-line units.',
      'Poets writing in English have adapted the ghazal, some keeping its repeated ending and some dropping it.',
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
      'Transplanted plots covered 46 percent of the seabed after three years; seeded plots covered 31 percent.',
      'Seeding took roughly a quarter of the working hours per plot that transplanting required of the divers.',
      'Divers moved adult shoots from a healthy meadow nearby, while volunteers scattered seeds gathered from flowering plants.',
      'Of the two ways researchers tried in the bay, transplanting covered 46 percent of the seabed after three years.',
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
        'Cierta (nota 4) y escrita para un objetivo técnico: explica un recurso interno —el final repetido— a quien todavía no sabe de qué está hecho un ghazal. Da por sabido «couplet», que es justo lo que el lector nuevo no tiene.',
      B:
        'Cierta (nota 3) y de recepción: cuenta cómo se lee y se cita un ghazal, no qué es. Sirve a quien ya conoce la forma y quiere saber qué se hace con ella.',
      C:
        'Correcta: junta las dos únicas notas que responden a lo que se pregunta quien no conoce la forma —qué es y desde cuándo (nota 1) y de qué está hecha (nota 2)—, y traduce «couplets» a «two-line units» para no apoyarse en un término que el lector nuevo aún no maneja.',
      D:
        'Cierta (nota 5) y de objetivo histórico: cuenta qué le ha pasado a la forma últimamente. Es la opción que más repite el vocabulario de las notas y no presenta nada a nadie.',
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
        'Correcta: pone los dos resultados uno frente al otro —46 % del lecho marino contra 31 % a los tres años, nota 5—, que es la única manera de comparar lo que consiguió cada método.',
      B:
        'Compara los dos métodos, pero por horas de trabajo (nota 6): esa es la dimensión del esfuerzo, no la del éxito. Quien la elige toma el método más barato por el más eficaz.',
      C:
        'Describe los dos procedimientos (notas 3 y 4) y se detiene antes de cualquier resultado: cuenta cómo se hizo, no cómo salió.',
      D:
        'Cumple la mitad del encargo. Nombra los dos métodos, pero solo da la cifra de uno: es lo que escribe quien lee las viñetas y no el objetivo, y sin la segunda cifra no hay comparación.',
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
