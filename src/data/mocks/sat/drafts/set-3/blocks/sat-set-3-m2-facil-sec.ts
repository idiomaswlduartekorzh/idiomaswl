import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Standard English Conventions · Set 3 M2 estándar · q16–q22.
 *
 * Orden de claves reservado: C, B, A, D, C, B, A. Dificultad 1, 1, 1, 2, 2, 2, 3.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'A ferry timetable preserved in the Port Alder archive documents an early change intended to serve factory workers. In 1912, the first ferry departed the north pier at 7:15 ______ printed timetable for 1914 moved the departure to 6:45 a.m. The archive also holds letters from passengers debating the earlier start.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['a.m., the', 'a.m.; because the', 'a.m.; the', 'a.m. the'],
    answer: 2,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'A massive coral can preserve a history of its growth in bands of skeletal material with different densities. Although the coral adds material throughout the ______ changes in growth and calcification can produce a band of high-density skeleton each year. Researchers can use images of a coral core to measure the distance between successive bands.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['year', 'year,', 'year;', 'year, and'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'Dance can be documented in diagrams, verbal descriptions, video, and formal scores. Labanotation, a system that records movement with codified ______ can preserve details about a work’s sequence and staging. The Library of Congress holds scores in Labanotation as well as materials made with other notation systems.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['symbols,', 'symbols', 'symbols;', 'symbols:'],
    answer: 0,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'Public health organizations have long used posters to pair memorable images with advice about preventing disease. One early campaign displayed many designs but repeated the same short slogan ______ “Covered wells, safer streets.” Because the phrase appeared in several visual settings, viewers could encounter the same advice on walls, in clinics, and at public exhibitions.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['slogan,', 'slogan;', 'slogan', 'slogan:'],
    answer: 3,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'To track changing conditions in a coastal wetland, researchers placed pressure sensors in shallow wells and connected them to data loggers. A network of sensors positioned at several forest and marsh ______ water-level measurements at regular intervals. Separate instruments can be used to measure temperature and conductivity.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['sites record', 'sites were recording', 'sites records', 'sites are recorded'],
    answer: 2,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'A museum planned to exhibit a nineteenth-century textile whose natural colorants could fade after extended exposure to bright light. Dyed with these light-sensitive ______. The lower illumination reduced the textile’s cumulative light exposure while still allowing visitors to examine its woven pattern.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['the conservator set a low illumination level for the textile', 'colorants, the textile was displayed under low illumination', 'the low illumination protected the textile during its display', 'visitors examined the textile under the low illumination'],
    answer: 1,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'An archive began converting a paper card catalog into a searchable database in 2008. The cards contained cross-references, revised titles, and notes added during earlier reorganization projects. By the time data entry began, staff members ______ every card that a 1996 inventory had identified as a duplicate, so the scanning team received a finalized sequence.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had already separated', 'have already separated', 'will already separate', 'would already separate'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto y coma entre dos oraciones independientes estrechamente relacionadas.', razones: {
    A: 'Una coma sola no puede unir las dos oraciones independientes; produciría un comma splice.',
    B: 'Después del punto y coma debe haber una oración independiente, pero because vuelve subordinada la segunda parte.',
    C: 'Correcta: cada lado del punto y coma tiene sujeto y verbo propios, y ambos describen el cambio de horario.',
    D: 'Sin puntuación, el final de la primera oración queda fusionado con el sujeto de la segunda.',
  }, fuenteHecho: 'Puerto, archivo, horarios y cartas inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Coma después de una cláusula subordinada que precede a la oración principal.', razones: {
    A: 'La subordinada abierta por Although termina en year y necesita separarse de la principal que comienza con changes.',
    B: 'Correcta: la coma marca el límite entre la subordinada inicial y la oración principal.',
    C: 'Un punto y coma no puede ir después de una subordinada que no funciona como oración independiente.',
    D: 'Añadir and deja Although sin una principal correctamente conectada y coordina estructuras que no son equivalentes.',
  }, fuenteHecho: 'NOAA AOML, bandas anuales de alta densidad y medición del crecimiento coralino: https://www.aoml.noaa.gov/digital-coral-morphology/' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'humanidades', regla: 'Cierre con coma de una aposición no esencial antes del verbo principal.', razones: {
    A: 'Correcta: la coma cierra la explicación a system that records movement with codified symbols antes de can preserve.',
    B: 'Sin signo, la aposición abierta después de Labanotation no queda cerrada antes del verbo principal.',
    C: 'El punto y coma separaría el sujeto Labanotation de su verbo can preserve.',
    D: 'Los dos puntos también separarían el sujeto de su verbo y no cerrarían simétricamente el inciso abierto con coma.',
  }, fuenteHecho: 'Library of Congress, Dance Notation Collection: https://findingaids.loc.gov/repositories/15/resources/1039' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'historia', regla: 'Dos puntos después de una oración independiente para presentar una cita nominal que especifica un sustantivo general.', razones: {
    A: 'La coma no introduce adecuadamente la cita que especifica cuál era el eslogan.',
    B: 'El punto y coma requiere una oración independiente a su derecha, pero el eslogan nominal no tiene verbo.',
    C: 'Sin signo, slogan queda unido directamente a la cita sin una frontera convencional.',
    D: 'Correcta: la oración puede cerrarse en slogan y los dos puntos presentan el contenido exacto de ese eslogan.',
  }, fuenteHecho: 'National Library of Medicine, historia y funciones de los carteles sanitarios; campaña y lema del estímulo son originales: https://www.nlm.nih.gov/exhibition/iconographyofcontagion/index.html' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia del verbo con el núcleo singular network pese a los sustantivos plurales interpuestos.', razones: {
    A: 'Record concuerda con sensors o sites, pero el núcleo del sujeto completo es el singular network.',
    B: 'Were recording usa auxiliar plural y además cambia una descripción general por una acción pasada en progreso.',
    C: 'Correcta: records concuerda con A network y mantiene el presente general del pasaje.',
    D: 'Are recorded usa auxiliar plural y convierte el sujeto que produce mediciones en aquello que es medido.',
  }, fuenteHecho: 'USGS, red de registradores y mediciones de nivel de agua en humedales: https://www.usgs.gov/data/water-level-and-soil-pore-water-salinity-temperature-and-conductivity-data-tidally-influenced' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'humanidades', regla: 'El sujeto de la oración principal debe ser el objeto descrito por el modificador inicial.', razones: {
    A: 'Hace que the conservator sea quien está teñido con colorantes sensibles a la luz.',
    B: 'Correcta: the textile es el sujeto teñido y la oración principal explica cómo se exhibió.',
    C: 'Hace que the low illumination esté teñida, aunque esa iluminación es una condición de exhibición.',
    D: 'Hace que visitors sean quienes están teñidos y no el textil descrito en la oración anterior.',
  }, fuenteHecho: 'Smithsonian Museum Conservation Institute, sensibilidad a la luz de colorantes naturales: https://mci.si.edu/node/1225657' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción completada antes de otro momento pasado explícito.', razones: {
    A: 'Correcta: la separación ya se había completado cuando comenzó la entrada de datos; had identified marca un hito aún anterior.',
    B: 'El presente perfecto no concuerda con el punto de referencia pasado began.',
    C: 'El futuro contradice que la secuencia ya estuviera finalizada al comenzar el ingreso de datos.',
    D: 'Would separate presenta la separación como posterior o condicional, no ya terminada antes del comienzo.',
  }, fuenteHecho: 'National Archives, catálogos en formato de tarjetas y ayudas de búsqueda; archivo, fechas y flujo de digitalización hipotéticos: https://www.archives.gov/research/catalog/lcdrg/authority-lists/finding-aid-type' },
]
