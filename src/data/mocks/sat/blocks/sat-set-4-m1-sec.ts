import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Standard English Conventions · Set 4 M1 · q16–q22.
 *
 * Orden de claves reservado: B, D, C, A, B, D, C. Los cuatro primeros ítems miden
 * fronteras; los tres últimos, forma, estructura y sentido.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'In 1896, a survey team recorded the location of a winter mail route after snow had hidden many of its usual markers. The team compared compass bearings with notes from drivers who had traveled the route before the ______ the revised map identified a safer crossing over the frozen river.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['survey, as a result,', 'survey. As a result,', 'survey as a result', 'survey; as a result'],
    answer: 1,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Researchers studying spiderwebs can direct a brief pulse of air toward one strand and record how the resulting vibration travels through the web. Although a strand may appear still between ______ sensitive instruments can detect motion too slight for a person to see.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['pulses;', 'pulses', 'pulses:', 'pulses,'],
    answer: 3,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'Early sound recordings on wax cylinders can become too fragile to play with a stylus. One preservation method uses an optical scanner to map the groove without touching the cylinder. The resulting ______ a physical trace of the recorded sound—can then guide software that reconstructs the audio.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['image,', 'image;', 'image—', 'image:'],
    answer: 2,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'An observatory digitized a collection of glass photographic plates so astronomers could compare historical images with current ones. Before scanning each plate, technicians recorded three identifying ______ the date of exposure, the telescope used, and the region of sky shown.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['details:', 'details,', 'details;', 'details'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'A constellation of small satellites can observe the same coastline at different times of day. Although the satellites follow separate orbits, the constellation ______ researchers to combine frequent observations into a single record of change.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['allow', 'allows', 'have allowed', 'are allowing'],
    answer: 1,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'To identify pigments in a sheet of marbled paper, a conservation scientist followed three noninvasive steps: photographing the colors under controlled light, comparing their spectral responses with reference materials, and ______. Together, the results narrowed the list of possible colorants.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['a map of where each response occurred was made', 'to map the location of each response', 'the location of each response was mapped', 'mapping the location of each response'],
    answer: 3,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'A conservator discovered a water-damaged navigation journal inside an unmarked chest. She stabilized the pages before a translator began work on them. By the time historians compared the translated entries with port ______ the translator had transcribed every legible passage and noted each gap in the text.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['records, the translator transcribes', 'records, the translator has transcribed', 'records, the translator had transcribed', 'records, the translator will transcribe'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto entre oraciones independientes y coma después de un adverbio de transición inicial.', razones: {
    A: 'As a result no es una conjunción coordinante; dos comas no corrigen el empalme entre oraciones independientes.',
    B: 'Correcta: el punto cierra la oración sobre los conductores y la coma delimita el adverbio que abre la consecuencia.',
    C: 'Sin signo después de survey, la primera oración queda unida directamente al adverbio y a otra independiente.',
    D: 'El punto y coma puede separar las independientes, pero falta la coma que debe seguir a As a result al comienzo de la segunda.',
  }, fuenteHecho: 'Equipo, ruta, testimonios y mapa inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Coma después de una cláusula subordinada adverbial que precede a la oración principal.', razones: {
    A: 'El punto y coma no debe separar una subordinada iniciada por Although de la independiente que la completa.',
    B: 'Sin puntuación, no queda marcada la frontera entre la subordinada inicial y la oración principal.',
    C: 'Los dos puntos requieren que lo anterior pueda funcionar como oración completa, pero Although deja la idea subordinada.',
    D: 'Correcta: la coma cierra la subordinada concesiva antes de la principal sensitive instruments can detect.',
  }, fuenteHecho: 'Experimento y descripción de vibraciones inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Guiones largos emparejados para delimitar una aposición explicativa dentro de una oración.', razones: {
    A: 'Una coma no empareja el guion que cierra el inciso y produce una delimitación asimétrica.',
    B: 'El punto y coma separaría el sujeto The resulting image de su verbo principal can guide.',
    C: 'Correcta: el primer guion abre la explicación a physical trace of the recorded sound y el guion ya impreso la cierra.',
    D: 'Los dos puntos no emparejan el guion final y además interrumpen la relación entre el sujeto image y el verbo can guide.',
  }, fuenteHecho: 'Cilindro, escaneo y reconstrucción descritos de forma general y original.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'historia', regla: 'Dos puntos después de una oración independiente para introducir una lista que especifica un término general.', razones: {
    A: 'Correcta: la oración puede terminar en details y los dos puntos presentan los tres detalles anunciados.',
    B: 'La coma no señala adecuadamente que tres sintagmas desarrollan la oración independiente anterior.',
    C: 'El punto y coma requiere otra oración independiente a su derecha, pero lo que sigue es una lista nominal.',
    D: 'Sin signo, details queda unido directamente a the date y la lista no tiene una frontera gramatical clara.',
  }, fuenteHecho: 'Observatorio, colección y procedimiento inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia con el núcleo singular constellation, no con el sustantivo plural del complemento.', razones: {
    A: 'Allow concordaría con satellites, pero ese sustantivo pertenece al complemento of small satellites y no es el núcleo del sujeto.',
    B: 'Correcta: allows concuerda con el singular constellation y conserva el presente general del pasaje.',
    C: 'Have allowed usa un auxiliar plural que no concuerda con constellation y añade un perfecto innecesario.',
    D: 'Are allowing usa auxiliar plural y presenta como acción temporal lo que el pasaje describe como capacidad general.',
  }, fuenteHecho: 'Constelación y observación costera descritas de forma general y original.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo entre tres formas en gerundio que funcionan como objetos de una lista.', razones: {
    A: 'Cambia de photographing y comparing a una oración pasiva completa, rompiendo la estructura paralela.',
    B: 'El infinitivo to map no es paralelo a los dos gerundios anteriores.',
    C: 'Introduce sujeto y verbo finito donde la lista requiere una tercera acción nominal en la misma forma.',
    D: 'Correcta: mapping mantiene el paralelismo con photographing y comparing.',
  }, fuenteHecho: 'Científica, hoja, análisis y resultados inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción completada antes de otro acontecimiento pasado.', razones: {
    A: 'El presente simple transcribes no sitúa la transcripción antes de la comparación histórica pasada.',
    B: 'El presente perfecto conecta una acción pasada con el presente, no con el punto de referencia pasado introduced by compared.',
    C: 'Correcta: had transcribed indica que la transcripción ya estaba completa cuando los historiadores comenzaron la comparación.',
    D: 'El futuro contradice By the time y colocaría la transcripción después de la comparación.',
  }, fuenteHecho: 'Conservadora, diario, traducción y análisis inventados.' },
]
