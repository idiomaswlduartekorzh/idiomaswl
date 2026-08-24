import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Standard English Conventions · Set 3 M2 exigente · q16–q22.
 *
 * Orden reservado: D, B, A, C, B, D, A. Las 28 alternativas mantienen el
 * mismo contenido léxico dentro de cada ítem; solo cambia la forma evaluada.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'Although winter storms sometimes delayed coaches on the northern ______ the 1847 postal ledger shows that the scheduled route itself remained unchanged through March. Notes in the ledger record late arrivals separately from revisions to the official schedule.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['section;', 'section', 'section:', 'section,'],
    answer: 3,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Researchers exposed three groups of seeds to different cycles of light and darkness. Germination in the two treatment groups differed only ______ however, the untreated group germinated much earlier than either treatment group did. The result led the researchers to repeat the control condition.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['slightly, however,', 'slightly; however,', 'slightly; however', 'slightly, however;'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The city arts council commissioned a performance based on interviews with former dockworkers. Mina Okafor ______ reconstructed recurring gestures from the interviews as a sequence for six dancers. Okafor also invited the interviewees to comment on an early rehearsal.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: [', a choreographer known for translating oral histories into movement,', 'a choreographer known for translating oral histories into movement,', '; a choreographer known for translating oral histories into movement;', ': a choreographer known for translating oral histories into movement,'],
    answer: 0,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'An archivist studying a merchant’s notebook created an index of the comments written along its page edges. She divided the comments into two broad ______ notes that identify the origin of a quotation and notes that challenge a calculation in the main text. This distinction allowed researchers to search the two functions separately.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['categories,', 'categories;', 'categories:', 'categories'],
    answer: 2,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'During a 2022 survey, technicians mapped currents beyond a harbor wall. Along the deepest part of the transect ______ a series of three current meters, each programmed to store a reading every ten minutes. The technicians recovered all three instruments after six weeks.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['were deployed', 'was deployed', 'have deployed', 'deploy'],
    answer: 1,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'Before a set of water-damaged letters could be digitized, conservators planned a three-stage treatment. The procedure required them to humidify each folded sheet, to flatten it under light pressure, and to ______ small edge tears with narrow strips of Japanese tissue. Each completed repair was photographed.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['the mending of', 'they mended', 'mending', 'mend'],
    answer: 3,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'Engineers tested a research buoy’s sensors in March, and a field team deployed the buoy in May. By the time analysts began processing the first complete data series in July, the engineers ______ the sensors against two reference instruments, and the field team had documented the buoy’s exact position.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had calibrated', 'have calibrated', 'will calibrate', 'are calibrating'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Coma después de una cláusula subordinada inicial.', razones: {
    A: 'Although abre una subordinada, por lo que el punto y coma no puede separarla como si fuera una oración independiente.',
    B: 'Sin puntuación, no queda marcada la frontera entre la subordinada inicial y la oración principal.',
    C: 'Los dos puntos exigen una relación de explicación o presentación después de una oración completa; aquí la primera unidad es subordinada.',
    D: 'Correcta: la coma cierra la cláusula inicial y permite que the 1847 postal ledger inicie la principal.',
  }, fuenteHecho: 'Ruta, archivo y fechas originales.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Punto y coma antes de un adverbio conjuntivo y coma después de este al enlazar dos oraciones independientes.', razones: {
    A: 'Una coma sola antes de however une dos oraciones independientes y produce un comma splice.',
    B: 'Correcta: el punto y coma separa las oraciones independientes y la coma cierra el adverbio conjuntivo.',
    C: 'Falta la coma que debe seguir a however cuando introduce la segunda oración.',
    D: 'La coma antes de however no basta para separar las oraciones, y el punto y coma queda mal ubicado después del adverbio.',
  }, fuenteHecho: 'Experimento y resultados originales.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Dos comas delimitan una aposición no esencial entre sujeto y verbo.', razones: {
    A: 'Correcta: ambas comas aíslan la descripción no esencial de Okafor sin separarla de su verbo reconstructed.',
    B: 'Falta la coma inicial de la aposición, aunque aparece una coma al final.',
    C: 'Los puntos y coma separarían el sujeto de su verbo y tratarían la aposición como oración independiente.',
    D: 'Los dos puntos después del nombre separarían el sujeto del verbo y no forman pareja con la coma final.',
  }, fuenteHecho: 'Consejo, coreógrafa y obra originales.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'historia', regla: 'Dos puntos después de una oración independiente para presentar dos categorías que desarrollan su objeto.', razones: {
    A: 'Una coma no introduce adecuadamente una enumeración que desarrolla una oración ya completa.',
    B: 'El punto y coma exigiría una oración independiente a la derecha, pero la serie de dos tipos no tiene verbo principal.',
    C: 'Correcta: la oración queda completa en categories y los dos puntos presentan los dos grupos anunciados.',
    D: 'Sin signo, el sustantivo categories queda unido directamente a la serie que lo especifica.',
  }, fuenteHecho: 'Comerciante, cuaderno e índice originales.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'ciencia', regla: 'Concordancia en una construcción invertida con el núcleo singular series después del verbo.', razones: {
    A: 'Were concuerda por proximidad con meters, pero el sujeto completo es el singular a series of three current meters.',
    B: 'Correcta: was concuerda con series y la voz pasiva encaja con el despliegue realizado por los técnicos en 2022.',
    C: 'Have exige sujeto plural y la voz activa haría que los instrumentos desplegaran otra cosa.',
    D: 'La forma base plural no concuerda con series ni expresa la acción pasada descrita.',
  }, fuenteHecho: 'Levantamiento, puerto e instrumentos originales.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo de tres infinitivos coordinados después de required them.', razones: {
    A: 'El sintagma nominal rompe la serie to humidify, to flatten y to mend.',
    B: 'Una cláusula con sujeto y verbo rompe la coordinación de infinitivos dependientes de required them.',
    C: 'El gerundio no es paralelo a los dos infinitivos anteriores.',
    D: 'Correcta: mend completa el tercer infinitivo coordinado bajo el to compartido.',
  }, fuenteHecho: 'Cartas y tratamiento de conservación originales.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'ciencia', regla: 'Pasado perfecto para una acción terminada antes de un punto de referencia pasado.', razones: {
    A: 'Correcta: la calibración de marzo ya había ocurrido cuando empezó el análisis de julio y queda paralela a had documented.',
    B: 'El presente perfecto no concuerda con el punto de referencia pasado began ni con la cronología fechada.',
    C: 'El futuro contradice que la calibración precediera al despliegue y al análisis.',
    D: 'El presente progresivo presenta la calibración como actual, pese a que terminó antes del análisis pasado.',
  }, fuenteHecho: 'Boya, fechas y secuencia de trabajo originales.' },
]
