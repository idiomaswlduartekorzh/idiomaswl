import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Standard English Conventions · Set 3 M1 · q16–q22.
 *
 * Orden de claves reservado: D, B, C, A, D, B, A. El bloque alterna fronteras y forma
 * verbal sin agruparlas, con dificultad no decreciente 1, 1, 2, 2, 2, 3, 3.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'Before work began on a navigation canal, surveyors measured the depth of two possible channels through a lake. Their dry-season readings showed that the western channel would require repeated removal of silt, whereas the eastern channel remained deep enough for loaded boats. The findings altered the construction ______ abandoned the western route and scheduled dredging along the eastern one.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['plan, as a result, contractors', 'plan; because contractors', 'plan because, as a result, contractors', 'plan. As a result, contractors'],
    answer: 3,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'A seed bank periodically tests stored seeds rather than assuming that every sealed packet remains viable. Technicians remove a small sample, place the seeds under controlled conditions, and record the share that sprout. The proportion of dormant seeds in each sample ______ when storage conditions are poor, even if the total number of packets in the vault remains unchanged.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['increase', 'increases', 'have increased', 'are increasing'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'Composer Liora Chen wanted performers to change volume gradually rather than jump between fixed levels. Her solution, a line of symbols that grew from small hollow circles into large filled ______ allowed musicians to see the direction and pace of each change. The notation spread first among ensembles that performed Chen’s work.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['shapes', 'shapes;', 'shapes,', 'shapes—'],
    answer: 2,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'Months after a river flooded the town archive, an oral-history team interviewed residents about the rescue effort. The team brought a map to each interview and asked speakers to place events in sequence. By the time those interviews began, several residents ______ the photographs they had saved with the approximate hour and location of each rescue.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had already labeled', 'have already labeled', 'already label', 'will already label'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'As snow accumulates on an ice sheet, older layers are compressed beneath newer ones. Researchers can analyze the chemistry of a dated layer to investigate conditions at the time the snow fell. Each layer may preserve several environmental ______ dust carried by wind, salts from sea spray, and compounds associated with volcanic eruptions.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['signals,', 'signals;', 'signals', 'signals:'],
    answer: 3,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'A conservator received a ceramic bowl that had been reconstructed from twenty-three fragments. Previous adhesive covered parts of several broken edges, so the pieces could not simply be joined again in the same order. Examining each fragment under raking light, ______. The resulting map let the team distinguish original tool marks from scratches made during the earlier repair.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['faint marks along the edges became visible to the conservators', 'the conservators mapped faint marks along the edges', 'the storage tray held fragments with faint marks along the edges', 'there were faint marks that the conservators mapped along the edges'],
    answer: 1,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'In 1911, a municipal library opened two children’s reading rooms, one beside the main entrance and one on the upper floor. Annual reports compared circulation in the two spaces but referred to both simply as “the children’s room.” The room ______ its low shelves made picture books accessible without adult help. Staff later used that arrangement when furnishing new branches.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['that faced the courtyard attracted younger readers;', ', which faced the courtyard, attracted younger readers;', 'that faced the courtyard attracted younger readers,', ', which faced the courtyard, attracted younger readers,'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto entre dos oraciones independientes; un adverbio de transición no permite unirlas solo con coma.', razones: {
    A: 'As a result es un adverbio de transición, no una conjunción coordinante; las comas no evitan el empalme entre dos independientes.',
    B: 'El punto y coma exige una independiente a su derecha, pero because convierte esa parte en subordinada.',
    C: 'Because debería introducir directamente una subordinada; la coma posterior lo separa de la proposición que tendría que gobernar.',
    D: 'Correcta: el punto cierra la primera independiente y As a result introduce una segunda oración completa.',
  }, fuenteHecho: 'Canal, reconocimiento y decisión inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 1, tema: 'ciencia', regla: 'Concordancia del verbo con el núcleo singular proportion pese a los sustantivos plurales interpuestos.', razones: {
    A: 'Increase concuerda con seeds o samples, pero el núcleo del sujeto completo es el singular proportion.',
    B: 'Correcta: increases concuerda con The proportion y mantiene el presente general del pasaje.',
    C: 'Have increased usa auxiliar plural y además introduce un perfecto que el contexto general no pide.',
    D: 'Are increasing concuerda con un sujeto plural inexistente y convierte una relación general en acción en progreso.',
  }, fuenteHecho: 'Procedimiento de viabilidad de semillas descrito de forma general y original.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Cierre con coma de una aposición no esencial antes del verbo principal.', razones: {
    A: 'Sin signo, la aposición abierta después de solution no queda cerrada antes del verbo principal allowed.',
    B: 'El punto y coma no puede separar el sujeto completo Her solution de su verbo principal allowed.',
    C: 'Correcta: la coma cierra la explicación intercalada que describe la solución de Chen.',
    D: 'Un guion no empareja la coma que abrió la aposición y deja una delimitación asimétrica.',
  }, fuenteHecho: 'Compositora, sistema de notación y difusión inventados.' },
  { id: 'q19', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'historia', regla: 'Pasado perfecto para una acción ya completada antes de otro momento pasado explícito.', razones: {
    A: 'Correcta: el etiquetado ya había ocurrido cuando comenzaron las entrevistas, que también están situadas en el pasado.',
    B: 'El presente perfecto conecta con el presente y no con el punto de referencia pasado began.',
    C: 'El presente simple contradice By the time y los verbos pasados que ordenan los dos acontecimientos.',
    D: 'El futuro sitúa el etiquetado después de las entrevistas, no antes de su comienzo.',
  }, fuenteHecho: 'Pueblo, inundación, equipo y archivo inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Dos puntos después de una oración independiente para presentar una lista que especifica un sustantivo general.', razones: {
    A: 'La coma sola no marca adecuadamente que los tres sintagmas siguientes desarrollan la idea completa anterior.',
    B: 'El punto y coma requiere una oración independiente a la derecha, pero después aparece una lista nominal.',
    C: 'Sin signo, signals queda unido directamente a dust y produce una secuencia nominal sin relación gramatical clara.',
    D: 'Correcta: la oración anterior puede cerrarse en signals y los dos puntos introducen tres ejemplos de esas señales.',
  }, fuenteHecho: 'Descripción original basada en el uso general de polvo, sales y compuestos volcánicos como señales en núcleos de hielo.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'El sujeto de la oración principal debe ser quien realiza la acción del modificador inicial.', razones: {
    A: 'Hace que faint marks sean quienes examinan los fragmentos; volverse visibles no corrige el modificador colgante.',
    B: 'Correcta: the conservators es el sujeto capaz de examinar y también de elaborar el mapa descrito después.',
    C: 'Convierte the storage tray en agente de Examining, aunque una bandeja no puede inspeccionar fragmentos.',
    D: 'El sujeto formal there no realiza la acción de examinar, por lo que la mención posterior de conservators llega demasiado tarde.',
  }, fuenteHecho: 'Objeto, daño y tratamiento de conservación inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'historia', regla: 'Cláusula relativa esencial para identificar uno de dos cuartos y punto y coma entre independientes.', razones: {
    A: 'Correcta: that faced the courtyard identifica cuál de los dos cuartos y el punto y coma separa la oración posterior con sujeto propio.',
    B: 'Las comas vuelven no esencial la información que identifica uno de dos cuartos, aunque el punto y coma posterior sí separa las independientes.',
    C: 'La relativa esencial está bien, pero una coma sola no puede unir younger readers con la independiente its low shelves made.',
    D: 'Además de presentar como inciso la identificación necesaria, usa una coma para unir dos oraciones independientes.',
  }, fuenteHecho: 'Biblioteca, fecha, salas e informes inventados.' },
]
