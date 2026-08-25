import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Standard English Conventions · Set 5 M1 · q16–q22.
 *
 * Orden de claves reservado: B, D, C, A, B, D, A. Los cuatro primeros ítems miden
 * fronteras; los tres últimos, forma, estructura y sentido.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'A county quilt survey photographed bedcovers and recorded their makers’ names when documentation was available. Several entries initially listed only the family that had owned a ______ later interviews identified the person who had sewn it.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['quilt, however,', 'quilt. However,', 'quilt however', 'quilt; however'],
    answer: 1,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Although volcanic ash particles can initiate ice formation in supercooled water ______ samples from different eruptions vary greatly in how efficiently they do so.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['droplets;', 'droplets', 'droplets:', 'droplets,'],
    answer: 3,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'A film archive compared several surviving copies while restoring the tinting of a silent movie. The best-preserved ______ a fragment bearing color instructions in its margin—helped the team determine which scenes had originally appeared blue.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['print,', 'print;', 'print—', 'print:'],
    answer: 2,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'During an excavation near a former ferry landing, archaeologists cataloged three kinds of fare ______ a paper ticket protected inside a case, a brass token, and an aluminum token punched with the route number.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['evidence:', 'evidence;', 'evidence,', 'evidence'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'Camera traps can photograph ground-dwelling mammals, while autonomous recorders can capture calls from birds and frogs. The combination of the two monitoring methods ______ researchers to detect a wider range of animals at the same site.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['allow', 'allows', 'have allowed', 'are allowing'],
    answer: 1,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'To construct a foldout artist’s book, Lena transformed one continuous sheet by cutting narrow windows into the paper, folding the remaining panels along scored lines, and ______ the final panel to a cloth hinge.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['she stitched', 'to stitch', 'the artist’s stitches joined', 'stitching'],
    answer: 3,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'A cable ship located a damaged section of submarine telegraph cable, raised it from the seafloor, and installed a splice. By the time the ship returned to port, the chief engineer ______ each resistance reading and marked the location where the repaired cable had been lowered.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had recorded', 'has recorded', 'was recording', 'would record'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto entre oraciones independientes y coma después de un adverbio de transición inicial.', razones: {
    A: 'However no es una conjunción coordinante; las comas no corrigen el empalme entre dos oraciones independientes.',
    B: 'Correcta: el punto cierra la oración sobre la familia y la coma delimita el adverbio que abre el contraste siguiente.',
    C: 'Sin signo después de quilt, una oración independiente queda unida directamente a otra por medio del adverbio.',
    D: 'El punto y coma puede separar las oraciones, pero falta la coma requerida después de However.',
  }, fuenteHecho: 'Encuesta, inventario y entrevistas inventados; contexto informado por prácticas de documentación de colecciones textiles.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Coma después de una cláusula subordinada concesiva que precede a la oración principal.', razones: {
    A: 'El punto y coma no puede separar la subordinada iniciada por Although de la oración principal que la completa.',
    B: 'Sin puntuación no queda marcada la frontera entre la subordinada inicial y la principal.',
    C: 'Los dos puntos requieren una oración completa a la izquierda, pero Although mantiene la primera parte subordinada.',
    D: 'Correcta: la coma cierra la cláusula concesiva antes del sujeto samples de la oración principal.',
  }, fuenteHecho: 'Umo et al., JGR Atmospheres, variación de la nucleación de hielo entre 15 muestras de ceniza volcánica: https://doi.org/10.1029/2020JD033356' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Guiones largos emparejados para delimitar una aposición no esencial dentro de una oración.', razones: {
    A: 'Una coma no empareja el guion que cierra el inciso y deja una delimitación asimétrica.',
    B: 'El punto y coma separaría el sujeto The best-preserved print de su verbo principal helped.',
    C: 'Correcta: el primer guion abre la explicación sobre el fragmento y el guion ya impreso la cierra.',
    D: 'Los dos puntos no emparejan el guion final y rompen la relación entre el sujeto y su verbo.',
  }, fuenteHecho: 'Escenario original informado por BFI National Archive, restauración de tintes y uso de instrucciones de color en copias supervivientes: https://www.bfi.org.uk/news/cinematheque-francaise-discovers-1916-sherlock-holmes-film' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'historia', regla: 'Dos puntos después de una oración independiente para introducir una lista anunciada por un término general.', razones: {
    A: 'Correcta: la oración puede terminar en evidence y los dos puntos presentan las tres clases de evidencia anunciadas.',
    B: 'El punto y coma requiere una oración independiente a la derecha, pero lo que sigue es una lista nominal.',
    C: 'Una coma no establece adecuadamente la relación entre la oración completa y la lista que la especifica.',
    D: 'Sin signo, evidence queda unido directamente al primer elemento y la lista carece de una frontera clara.',
  }, fuenteHecho: 'Ferry, excavación y objetos inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia con el núcleo singular combination, no con el plural del complemento.', razones: {
    A: 'Allow concordaría con methods, pero methods pertenece al complemento of the two monitoring methods y no es el núcleo del sujeto.',
    B: 'Correcta: allows concuerda con el singular combination y conserva el presente general del pasaje.',
    C: 'Have allowed usa un auxiliar plural que no concuerda con combination y añade un perfecto innecesario.',
    D: 'Are allowing usa un auxiliar plural y presenta como temporal una capacidad general.',
  }, fuenteHecho: 'Buxton et al., Global Ecology and Conservation, combinación de cámaras trampa y registradores acústicos: https://doi.org/10.1016/j.gecco.2018.e00493' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo entre tres gerundios que funcionan como objetos de la preposición by.', razones: {
    A: 'She stitched introduce sujeto y verbo finito donde la lista requiere una tercera acción nominal paralela.',
    B: 'El infinitivo to stitch rompe el patrón formado por cutting y folding.',
    C: 'La oración completa the artist’s stitches joined tampoco es paralela a los dos gerundios anteriores.',
    D: 'Correcta: stitching mantiene el paralelismo con cutting y folding bajo la preposición by.',
  }, fuenteHecho: 'Libro, artista y proceso de encuadernación inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción completada antes de otro acontecimiento pasado.', razones: {
    A: 'Correcta: had recorded sitúa el registro ya terminado antes del regreso a puerto, el punto de referencia pasado.',
    B: 'El presente perfecto conecta la acción con el presente y no con returned, que está en pasado.',
    C: 'El pasado progresivo presenta una acción en curso, pero By the time exige que el registro estuviera completo.',
    D: 'Would record coloca el registro como futuro visto desde el pasado y contradice que ya terminó antes del regreso.',
  }, fuenteHecho: 'Escenario original informado por PK Porthcurno Archive, informes de tendido y reparación de cables telegráficos: https://pkporthcurno.com/pk-stories/ses-digitisation-project/' },
]
