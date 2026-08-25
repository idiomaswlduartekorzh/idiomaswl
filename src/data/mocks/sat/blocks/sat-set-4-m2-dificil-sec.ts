import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/** Standard English Conventions · Set 4 M2 exigente · q16–q22. Claves: D, B, A, C, B, A, D. */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'A lighthouse keeper recorded the arrival time of every supply boat in a bound log. Although fog obscured the outer marker near the ______ the keeper could identify an approaching boat by the pattern of its bell.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['coast;', 'coast', 'coast:', 'coast,'],
    answer: 3,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'In a filtration test, a porous membrane captured nearly all particles larger than two ______ however, dissolved ions passed through the membrane with the water.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['micrometers, however,', 'micrometers; however,', 'micrometers. However', 'micrometers: however,'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'A dance historian compared several systems for recording movement. The choreographer’s ______ a set of lines, arrows, and abbreviated body positions—allows a later performer to reconstruct the sequence without seeing the original production.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['notation—', 'notation,', 'notation;', 'notation:'],
    answer: 0,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'An archive holds drafts of a stage comedy in two distinct ______ pages copied neatly for rehearsal and pages covered with the playwright’s cuts, substitutions, and rearranged cues.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['states,', 'states;', 'states:', 'states'],
    answer: 2,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'A folklorist recorded six versions of the same river legend in neighboring towns. Among the versions in the collection ______ two that end with the traveler returning the borrowed lantern rather than keeping it.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['is', 'are', 'was', 'has been'],
    answer: 1,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'Before using an airborne-particle sensor, a technician followed three calibration steps: sealing the test chamber, setting a known airflow rate, and ______ a baseline reading while the chamber contained filtered air.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['recording', 'to record', 'a record of', 'recorded'],
    answer: 0,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'A diplomatic office prepared a dispatch and a duplicate for its files. By the time the courier sealed the original inside a leather case, a clerk ______ the duplicate into the office register and checked every line against the outgoing copy.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['copies', 'has copied', 'will copy', 'had copied'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Coma después de una cláusula subordinada concesiva que precede a la oración principal.', razones: {
    A: 'El punto y coma no puede separar la subordinada iniciada por Although de la principal que la completa.', B: 'Sin signo no se marca el final de la subordinada inicial.', C: 'Los dos puntos requieren una oración completa a la izquierda; Although deja la idea dependiente.', D: 'Correcta: la coma cierra la cláusula concesiva antes de la principal the keeper could identify.',
  }, fuenteHecho: 'Faro, registro, marcador y patrón de campana inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Punto y coma entre oraciones independientes y coma después de un adverbio conjuntivo.', razones: {
    A: 'La coma antes de however produce un empalme entre dos oraciones independientes.', B: 'Correcta: el punto y coma separa las independientes y la coma delimita however.', C: 'El punto sería válido, pero falta la coma después del adverbio inicial However.', D: 'Los dos puntos no expresan adecuadamente el contraste y however requiere una coma posterior, no resuelve esa relación por sí solo.',
  }, fuenteHecho: 'Membrana, prueba y resultados inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Guiones largos emparejados para delimitar una aposición explicativa entre sujeto y verbo.', razones: {
    A: 'Correcta: el guion abre la explicación y el guion ya impreso después de positions la cierra.', B: 'Una coma no empareja el guion de cierre y deja el inciso asimétrico.', C: 'El punto y coma separa el sujeto The choreographer’s notation del verbo allows.', D: 'Los dos puntos no emparejan el guion final y tampoco deben interrumpir sujeto y verbo de este modo.',
  }, fuenteHecho: 'Historiadora, notación y producción inventadas.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'literatura', regla: 'Dos puntos para introducir una lista nominal después de una oración independiente.', razones: {
    A: 'Una coma no delimita correctamente la lista que especifica los dos estados anunciados.', B: 'El punto y coma requeriría otra oración independiente, pero siguen dos sintagmas nominales.', C: 'Correcta: la oración puede terminar en states y los dos puntos presentan sus dos categorías.', D: 'Sin signo, states queda unido directamente a pages y la lista carece de frontera.',
  }, fuenteHecho: 'Archivo, comedia y borradores inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Concordancia en una construcción invertida con sujeto plural pospuesto.', razones: {
    A: 'Is concuerda por cercanía con collection, pero el sujeto pospuesto es two.', B: 'Correcta: are concuerda con el sujeto plural two [versions].', C: 'Was es singular y además cambia sin necesidad el presente descriptivo.', D: 'Has been usa auxiliar singular y no concuerda con el sujeto plural.',
  }, fuenteHecho: 'Folclorista, leyenda, pueblos y variantes inventados.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'ciencia', regla: 'Paralelismo entre tres gerundios que integran una serie de acciones.', razones: {
    A: 'Correcta: recording mantiene la forma de sealing y setting.', B: 'El infinitivo to record rompe la serie de gerundios.', C: 'El sintagma nominal a record of no conserva la forma verbal paralela.', D: 'Recorded es una forma finita o participio, no el tercer gerundio regido por steps.',
  }, fuenteHecho: 'Sensor, cámara, flujo y procedimiento inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción ya completada antes de otro acontecimiento pasado.', razones: {
    A: 'El presente simple no corresponde al marco pasado ni marca anterioridad.', B: 'El presente perfecto relaciona la copia con el presente, no con el sellado pasado.', C: 'El futuro coloca la copia después, contrario a By the time.', D: 'Correcta: had copied muestra que el registro estaba terminado cuando el mensajero selló el original.',
  }, fuenteHecho: 'Oficina, despacho, copia, mensajero y registro inventados.' },
]
