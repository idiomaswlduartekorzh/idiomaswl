import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Standard English Conventions · Set 4 M2 estándar · q16–q22.
 * Claves reservadas: D, B, A, C, D, B, A.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'A museum catalog describes tools recovered from a nineteenth-century shipyard. The iron caulking mallets bear deep marks from repeated ______ consequently, the catalogers classified them as working tools rather than ceremonial objects.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['use, consequently', 'use; consequently', 'use consequently;', 'use. Consequently,'],
    answer: 3,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Researchers placed humidity sensors inside sealed containers of stored seeds. Because moisture can vary between the air near the lid and the air surrounding the ______ they installed one sensor at each location.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['seeds;', 'seeds,', 'seeds:', 'seeds'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'A textile curator identified the loom type represented in a set of workshop drawings. The warp-weighted ______ a loom that keeps vertical threads taut with suspended stones, appears in three drawings from the collection.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['loom,', 'loom;', 'loom', 'loom:'],
    answer: 0,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'The document bears an 1842 date. An inventory from a small printing shop names three styles of type that the owner kept in separate ______ roman, italic, and blackletter.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['cases;', 'cases', 'cases:', 'cases,'],
    answer: 2,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'A series of instrumented buoys measures the temperature of seawater at several depths. Although the individual buoys transmit their readings separately, the series ______ researchers a continuous view of conditions across the bay.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['provide', 'have provided', 'are providing', 'provides'],
    answer: 3,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'Before exhibiting a painted wall panel, conservators improved its stability by removing loose dust, securing flakes of pigment, and ______ small losses with a distinguishable watercolor mixture.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['to retouch', 'retouching', 'retouched', 'the retouching of'],
    answer: 1,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'A scholar compared two handwritten copies of a port register completed in 1812. By the time the later copyist began working, clerks ______ several entries from the original register into a temporary ledger, introducing errors that the copyist repeated.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had transferred', 'transfer', 'have transferred', 'will transfer'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto entre dos oraciones independientes y coma después de un adverbio de transición inicial.', razones: {
    A: 'Una coma seguida de consequently produce un empalme y además omite la coma posterior al adverbio.',
    B: 'El punto y coma separa las oraciones, pero falta la coma que debe seguir al adverbio de transición consequently.',
    C: 'Consequently queda unido a la primera oración y el punto y coma separa el adverbio de la cláusula que debería introducir.',
    D: 'Correcta: el punto cierra la observación sobre las marcas y la coma delimita el adverbio que presenta la consecuencia.',
  }, fuenteHecho: 'Astillero, objetos y clasificación inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Coma después de una cláusula subordinada adverbial que precede a la oración principal.', razones: {
    A: 'Un punto y coma no puede separar la cláusula dependiente iniciada por Because de la principal que la completa.',
    B: 'Correcta: la coma marca el final de la causa subordinada antes de la principal they installed.',
    C: 'Los dos puntos requieren una oración completa a la izquierda, pero la cláusula con Because depende de lo que sigue.',
    D: 'Sin puntuación no se delimita la subordinada inicial de la oración principal.',
  }, fuenteHecho: 'Contenedores, sensores y colocación inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'humanidades', regla: 'Comas emparejadas para delimitar una aposición no esencial dentro de una oración.', razones: {
    A: 'Correcta: la coma abre la explicación no esencial y la coma ya impresa después de stones la cierra.',
    B: 'El punto y coma separaría el sujeto The warp-weighted loom de su verbo appears.',
    C: 'Sin la coma inicial, el cierre después de stones queda sin pareja y la explicación no está delimitada.',
    D: 'Los dos puntos pueden introducir una explicación al final de una oración completa, no un inciso entre sujeto y verbo.',
  }, fuenteHecho: 'Curadora, dibujos y colección inventados; descripción general del telar incluida en el propio ítem.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'historia', regla: 'Dos puntos después de una oración independiente para introducir una lista anunciada por un término general.', razones: {
    A: 'Un punto y coma requiere una oración independiente después; roman, italic, and blackletter es una lista nominal.',
    B: 'Sin signo, el sustantivo cases se une directamente a los elementos que lo especifican.',
    C: 'Correcta: la oración puede concluir en cases y los dos puntos presentan los tres estilos contenidos en ellas.',
    D: 'Una sola coma no establece adecuadamente la relación de anuncio y especificación entre la oración y la lista.',
  }, fuenteHecho: 'Imprenta, inventario y contenido inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia del verbo con el núcleo singular series, no con el sustantivo plural del complemento.', razones: {
    A: 'Provide concuerda con buoys, pero el sujeto de la principal es el singular series.',
    B: 'Have provided usa un auxiliar plural y cambia innecesariamente el presente general por presente perfecto.',
    C: 'Are providing usa un auxiliar plural que no concuerda con series.',
    D: 'Correcta: provides concuerda con el núcleo singular series y conserva el tiempo presente del pasaje.',
  }, fuenteHecho: 'Serie de boyas, mediciones y bahía inventadas.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo entre tres gerundios que funcionan como objetos de la preposición by.', razones: {
    A: 'El infinitivo to retouch rompe la serie iniciada por removing y securing.',
    B: 'Correcta: retouching mantiene la misma forma que removing y securing bajo la preposición by.',
    C: 'Retouched es una forma finita o participio que no funciona en paralelo con los dos gerundios.',
    D: 'The retouching of es nominal, pero altera la estructura compacta y paralela de los otros dos miembros.',
  }, fuenteHecho: 'Panel, intervención y materiales inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción terminada antes de otro acontecimiento pasado.', razones: {
    A: 'Correcta: had transferred sitúa el traslado anterior al momento pasado en que el copista comenzó a trabajar.',
    B: 'El presente simple transfer no concuerda con el marco histórico ni sitúa la acción antes del comienzo de la copia.',
    C: 'El presente perfecto relaciona la acción con el presente, no con el punto de referencia histórico de 1812.',
    D: 'El futuro contradice la secuencia: las transferencias ya habían ocurrido cuando comenzó la copia.',
  }, fuenteHecho: 'Registros, copias, libro temporal y errores inventados.' },
]
