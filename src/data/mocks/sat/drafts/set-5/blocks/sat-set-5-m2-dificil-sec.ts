import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Standard English Conventions · Set 5 M2 exigente · q16–q22.
 *
 * Orden de claves reservado: C, B, D, A, C, A, D. Los cuatro primeros ítems miden
 * fronteras; los tres últimos, forma, estructura y sentido.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'Although the harbor bell book recorded the hour of every fog signal and the name of the keeper on ______ it did not explain why several entries were copied in a different hand.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['duty;', 'duty:', 'duty,', 'duty'],
    answer: 2,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Ice cores from the two sites contained similar amounts of volcanic ______ the particles occurred in different seasonal layers, so researchers did not treat the records as evidence of the same eruption.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['dust, however,', 'dust; however,', 'dust; however', 'dust however,'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The artist’s ______ which includes installation diagrams, correspondence, and copies of obsolete software—allows conservators to compare new presentations of the work with its documented behavior.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['archive,', 'archive;', 'archive:', 'archive—'],
    answer: 3,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'An inventory of the early diving bell names three accessories carried inside the ______ a weighted sounding line, a slate for written signals, and a sealed lamp.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['chamber:', 'chamber;', 'chamber,', 'chamber'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'Located just inside the membrane of the freshwater alga and visible only under specialized microscopy ______ several light-sensitive organelles that change position as illumination shifts.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['is', 'has been', 'are', 'was'],
    answer: 2,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'Conservators prepared the painted fans for storage by humidifying distorted paper, aligning detached bamboo ribs, and ______ each open fan on a fitted archival board.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['supporting', 'they supported', 'to support', 'supported'],
    answer: 0,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'Before cartographer Edda Vale published her coastal atlas in 1846, assistants ______ shoreline measurements in twelve survey notebooks and checked repeated observations against one another.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['record', 'will record', 'have recorded', 'had recorded'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Coma después de una cláusula subordinada concesiva que precede a la oración principal.', razones: {
    A: 'El punto y coma no debe separar la subordinada iniciada por Although de la oración principal que la completa.',
    B: 'Los dos puntos requieren una oración independiente a la izquierda, pero Although mantiene subordinada esa parte.',
    C: 'Correcta: la coma cierra la concesiva introductoria antes del sujeto it de la oración principal.',
    D: 'Sin puntuación no se marca la frontera entre la subordinada inicial y la principal.',
  }, fuenteHecho: 'Libro de campana, señales y copistas inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Punto y coma entre oraciones independientes y coma después de un adverbio conjuntivo.', razones: {
    A: 'However no es una conjunción coordinante; una coma antes del adverbio deja un comma splice.',
    B: 'Correcta: el punto y coma separa las dos oraciones y la coma cierra el adverbio conjuntivo however.',
    C: 'El punto y coma establece la primera frontera, pero falta la coma requerida después de however.',
    D: 'Sin signo antes de however, las dos oraciones independientes quedan unidas incorrectamente.',
  }, fuenteHecho: 'Sitios, núcleos y comparación construidos para evaluar puntuación; sin resultados atribuidos.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Guiones largos emparejados para delimitar un inciso no esencial entre sujeto y verbo.', razones: {
    A: 'Una coma no empareja el guion largo que cierra el inciso y deja signos asimétricos.',
    B: 'El punto y coma separaría el sujeto The artist’s archive de su verbo principal allows.',
    C: 'Los dos puntos no forman pareja con el guion final ni deben separar aquí sujeto y verbo.',
    D: 'Correcta: el primer guion abre la explicación sobre el contenido del archivo y el segundo la cierra.',
  }, fuenteHecho: 'Artista, obra y archivo inventados; prácticas de conservación descritas de forma general.' },
  { id: 'q19', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'historia', regla: 'Dos puntos después de una oración independiente para introducir una lista anunciada.', razones: {
    A: 'Correcta: la oración puede terminar en chamber y los dos puntos presentan los tres accesorios anunciados.',
    B: 'El punto y coma exigiría una oración independiente a la derecha, pero sigue una lista nominal.',
    C: 'La coma no establece de manera suficiente la frontera entre la oración y la lista explicativa.',
    D: 'Sin signo, chamber queda unido directamente al primer elemento y la lista pierde su frontera.',
  }, fuenteHecho: 'Campana, inventario y accesorios inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'ciencia', regla: 'Concordancia con un sujeto plural pospuesto en una construcción invertida.', razones: {
    A: 'Is concuerda con el singular membrane cercano, pero ese sustantivo pertenece a la frase introductoria.',
    B: 'Has been es singular y además no completa lógicamente la localización de varios orgánulos.',
    C: 'Correcta: are concuerda con el sujeto plural several light-sensitive organelles, ubicado después del verbo.',
    D: 'Was es singular y cambia innecesariamente al pasado una descripción expresada en presente general.',
  }, fuenteHecho: 'Alga y orgánulos hipotéticos construidos para la prueba de concordancia.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Paralelismo entre tres gerundios que funcionan como objetos de la preposición by.', razones: {
    A: 'Correcta: supporting mantiene el patrón de humidifying y aligning bajo la preposición by.',
    B: 'They supported introduce sujeto y verbo finito dentro de una serie que requiere una tercera acción nominal.',
    C: 'El infinitivo to support no es paralelo a los dos gerundios anteriores.',
    D: 'El pasado supported rompe tanto la forma paralela como la estructura regida por by.',
  }, fuenteHecho: 'Colección, tratamientos y montaje inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'historia', regla: 'Pasado perfecto para una acción completada antes de otro acontecimiento pasado.', razones: {
    A: 'El presente simple no sitúa el registro antes de published, que establece un punto pasado.',
    B: 'El futuro coloca la acción después del presente y contradice el marco temporal histórico.',
    C: 'El presente perfecto conecta la acción con el presente, no con la publicación pasada.',
    D: 'Correcta: had recorded muestra que el registro ya se había completado antes de la publicación de 1846.',
  }, fuenteHecho: 'Cartógrafa, atlas, fecha y cuadernos inventados.' },
]
