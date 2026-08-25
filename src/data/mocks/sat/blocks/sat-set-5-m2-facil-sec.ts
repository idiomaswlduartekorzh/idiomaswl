import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Standard English Conventions · Set 5 M2 estándar · q16–q22.
 *
 * Orden de claves reservado: C, A, D, B, C, B, D. Los cuatro primeros ítems miden
 * fronteras; los tres últimos, forma, estructura y sentido.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'A canal lockkeeper’s toll book recorded each vessel’s name and the fee it ______ notes beside some entries also identified the cargo carried through the lock.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['paid, however,', 'paid however', 'paid. However,', 'paid; however'],
    answer: 2,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'After a flexible sensor detects changes in a biofilm growing across its ______ during a laboratory trial, a processor converts the measurements into a time series.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['surface,', 'surface;', 'surface:', 'surface'],
    answer: 0,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The theater’s oldest surviving shadow ______ a translucent leather figure cut in the shape of a bird—was stored flat to protect its delicate movable joints.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['puppet,', 'puppet;', 'puppet:', 'puppet—'],
    answer: 3,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'The excavated ship’s well-preserved cargo contained three kinds of ceramic ______ tall transport amphorae, shallow cooking dishes, and small glazed cups.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['vessels;', 'vessels:', 'vessels,', 'vessels'],
    answer: 1,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'A series of microelectrodes positioned at intervals along two plant roots ______ changes in electrical potential as the roots encounter different moisture levels.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['record', 'have recorded', 'records', 'are recording'],
    answer: 2,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'The archive team digitized a collection of paper silhouettes by photographing each cutout, recording the dimensions of its sheet, and ______ the new image file to the object’s accession record.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['linked', 'linking', 'to link', 'a link joined'],
    answer: 1,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'Before an excavated textile went on public display, the registrar ______ its fiber, weave structure, dimensions, and areas of loss in the collection database.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['catalogs', 'is cataloging', 'will catalog', 'had cataloged'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto entre oraciones independientes y coma después de un adverbio de transición inicial.', razones: {
    A: 'However no funciona como conjunción coordinante; dos comas no reparan el empalme de dos oraciones independientes.',
    B: 'Sin signo tras paid, la primera oración queda unida directamente a la segunda por un adverbio de transición.',
    C: 'Correcta: el punto cierra la oración sobre el pago y la coma delimita el However que abre la siguiente.',
    D: 'El punto y coma separaría las oraciones, pero hace falta una coma después del adverbio However.',
  }, fuenteHecho: 'Libro, lockkeeper y entradas inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Coma después de una cláusula subordinada temporal que precede a la oración principal.', razones: {
    A: 'Correcta: la coma cierra la subordinada iniciada por After antes del sujeto a processor.',
    B: 'El punto y coma no debe separar una subordinada de la oración principal que la completa.',
    C: 'Los dos puntos requieren una oración completa a la izquierda, pero la cláusula iniciada por After no lo es.',
    D: 'Sin puntuación no se marca la frontera entre la subordinada introductoria y la oración principal.',
  }, fuenteHecho: 'Sensor, biopelícula y procesamiento inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'humanidades', regla: 'Guiones largos emparejados para delimitar una aposición no esencial dentro de una oración.', razones: {
    A: 'La coma no empareja el guion largo que ya cierra la explicación y produce signos asimétricos.',
    B: 'El punto y coma separaría el sujeto shadow puppet del verbo principal was stored.',
    C: 'Los dos puntos no emparejan el guion final y rompen la continuidad entre sujeto y verbo.',
    D: 'Correcta: el primer guion abre la explicación sobre la figura y el segundo la cierra.',
  }, fuenteHecho: 'Teatro, figura y condiciones de almacenamiento inventados.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'historia', regla: 'Dos puntos después de una oración independiente para introducir una lista anunciada por un término general.', razones: {
    A: 'El punto y coma requeriría otra oración independiente, pero a la derecha solo hay una lista nominal.',
    B: 'Correcta: la oración puede terminar en vessels y los dos puntos presentan las tres clases anunciadas.',
    C: 'Una coma no establece correctamente la frontera entre la oración completa y la lista explicativa.',
    D: 'Sin signo, vessels queda unido directamente al primer elemento y la lista no tiene una introducción clara.',
  }, fuenteHecho: 'Naufragio y conjunto cerámico inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia con el núcleo singular series, no con el plural del complemento.', razones: {
    A: 'Record concordaría con microelectrodes, pero ese plural pertenece al complemento iniciado por of.',
    B: 'Have recorded usa un auxiliar plural que no concuerda con el núcleo singular A series.',
    C: 'Correcta: records concuerda con series y mantiene el presente general del pasaje.',
    D: 'Are recording usa un auxiliar plural y trata como núcleo a microelectrodes en vez de series.',
  }, fuenteHecho: 'Dispositivo y experimento inventados.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo entre tres gerundios que funcionan como objetos de la preposición by.', razones: {
    A: 'El pasado linked rompe la serie nominal construida por photographing y recording.',
    B: 'Correcta: linking conserva el paralelismo de los tres gerundios bajo la preposición by.',
    C: 'El infinitivo to link no es paralelo a los dos gerundios anteriores.',
    D: 'La frase nominal y el verbo finito implícito no completan de forma paralela la serie de acciones.',
  }, fuenteHecho: 'Archivo, colección y flujo de digitalización inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción completada antes de otro acontecimiento pasado.', razones: {
    A: 'El presente simple no sitúa el registro antes del momento pasado went on public display.',
    B: 'El presente progresivo describe una acción actual y contradice el marco temporal pasado.',
    C: 'El futuro coloca la catalogación después del presente, no antes de la exhibición pasada.',
    D: 'Correcta: had cataloged muestra que el registro ya se había completado antes de que el textil se exhibiera.',
  }, fuenteHecho: 'Textil, exposición y registro inventados.' },
]
