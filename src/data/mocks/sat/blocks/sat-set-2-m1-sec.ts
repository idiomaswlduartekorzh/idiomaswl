import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'In 1912, a cooperative of fruit growers built a packing house beside the railway. Before then, each farmer had sorted and boxed produce at home, and buyers complained that quality varied widely from crate to crate. The new building did more than provide shared ______ it established one grading system that every member had to follow. Within two seasons, merchants were paying the cooperative a premium for consistent shipments.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['equipment, however,', 'equipment,', 'equipment;', 'equipment although'],
    answer: 2,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'On the floor of a healthy forest, a thin network of fungal threads connects with tree roots. Sugars made by the leaves move into the fungus, while minerals gathered by the fungus move toward the tree. The exchange of materials between the roots and the fungal network ______ both partners to occupy soil in which either one alone would grow poorly.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['allow', 'have allowed', 'are allowing', 'allows'],
    answer: 3,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The sculptor Nia Benton works with discarded wire collected from construction sites. Her newest installation, a suspended spiral nearly six meters ______ casts a changing mesh of shadows as sunlight crosses the gallery. Because the wire is thin, the structure seems solid from the entrance but almost disappears when a visitor stands directly beneath it.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['wide', 'wide,', 'wide;', 'wide—'],
    answer: 1,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'In the spring of 1876, residents of Lakeborough began recording water levels on a post beside the town bridge. The measurements were simple, but the habit lasted. By the time engineers arrived to design a flood wall in 1908, local volunteers ______ the lake every morning for more than three decades, creating a record far longer than any government survey.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['had measured', 'have measured', 'measure', 'will measure'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'The first prototype of the portable water filter failed for an unexpected reason. Its membrane removed particles effectively, and its pump produced enough pressure. Yet the device required something the intended users could not easily ______ replacement cartridges stored at a constant low temperature. The engineers redesigned the membrane so the cartridges could remain stable in ordinary heat.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['provide,', 'provide;', 'provide:', 'provide'],
    answer: 2,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'Studying tiny marks pressed into several clay tablets, ______. The marks appeared at regular intervals beside lists of grain and oil, suggesting that they represented units of measure rather than names. By comparing tablets from three storehouses, the team found that the same mark always accompanied the same quantity, even when a different scribe had made it.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['a repeated pattern became visible to the archaeologists', 'the tablets revealed a repeated pattern to the archaeologists', 'there was a repeated pattern that the archaeologists noticed', 'the archaeologists noticed a repeated pattern'],
    answer: 3,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'The community radio station began with one transmitter built from spare parts. Its signal, which reached only the eastern half of the ______ was strong enough for farmers there to share weather reports and road conditions. When listeners in the western villages asked to join, volunteers installed a second antenna on a ridge, and the two signals together covered the entire valley.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['valley;', 'valley,', 'valley', 'valley—'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Punto y coma entre dos oraciones independientes estrechamente relacionadas.', razones: {
    A: 'Las comas alrededor de however no resuelven el empalme entre dos oraciones independientes.',
    B: 'Una coma sola no puede unir «did more» con «it established» sin una conjunción coordinante.',
    C: 'Correcta: el punto y coma separa dos oraciones independientes cuya segunda parte explica el alcance de la primera.',
    D: 'Although subordina lo que sigue y deja la relación lógica incompleta, pues no aparece una principal posterior.',
  }, fuenteHecho: 'Cooperativa, fechas y resultados inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 1, tema: 'ciencia', regla: 'Concordancia del verbo con el núcleo singular del sujeto pese a frases preposicionales interpuestas.', razones: {
    A: 'Allow concuerda erróneamente con materials o roots, no con el núcleo singular exchange.',
    B: 'Have allowed usa auxiliar plural y además introduce un tiempo perfecto no motivado por el contexto general.',
    C: 'Are allowing concuerda con un sujeto plural inexistente; fungal network está dentro de una frase preposicional.',
    D: 'Correcta: exchange es el núcleo singular de «The exchange of materials…» y exige allows.',
  }, fuenteHecho: 'Descripción original de una relación micorrícica general.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Cierre con coma de un modificador explicativo intercalado.', razones: {
    A: 'Sin coma, el inciso iniciado después de installation queda abierto antes del verbo principal casts.',
    B: 'Correcta: la coma cierra el modificador no esencial «a suspended spiral nearly six meters wide».',
    C: 'El punto y coma no puede separar el sujeto completo de su verbo principal casts.',
    D: 'Un guion no empareja correctamente la coma que abrió el inciso y crea una delimitación asimétrica.',
  }, fuenteHecho: 'Artista e instalación inventadas.' },
  { id: 'q19', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'historia', regla: 'Pasado perfecto para una acción continuada anterior a otro momento pasado explícito.', razones: {
    A: 'Correcta: la medición empezó antes de 1908 y ya llevaba décadas ocurriendo cuando llegaron los ingenieros.',
    B: 'El presente perfecto conecta con el presente, pero el punto de referencia de la oración es 1908.',
    C: 'El presente simple contradice los marcadores pasados «arrived» y «in 1908».',
    D: 'El futuro sitúa la medición después de la llegada cuando el texto dice que el registro ya existía.',
  }, fuenteHecho: 'Pueblo, fechas y registro inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Dos puntos después de una oración independiente para introducir una explicación o especificación.', razones: {
    A: 'La coma produce un empalme débil entre la afirmación completa y la especificación nominal que sigue.',
    B: 'El punto y coma pide una oración independiente a la derecha, pero «replacement cartridges…» es un sintagma nominal.',
    C: 'Correcta: la oración anterior es completa y los dos puntos introducen aquello que los usuarios no podían proporcionar.',
    D: 'Sin signo, provide recibe como objeto replacement cartridges y cambia el sentido: los usuarios proporcionarían cartuchos, no condiciones de frío.',
  }, fuenteHecho: 'Dispositivo, prueba y rediseño inventados.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'El sujeto de la oración principal debe ser quien realiza la acción del modificador inicial.', razones: {
    A: 'Hace que pattern sea quien estudia las marcas, un modificador colgante aunque la oración principal sea gramatical por sí sola.',
    B: 'Convierte tablets en quienes estudian las marcas; revelar un patrón no corrige el agente del modificador.',
    C: 'El sujeto formal there no puede realizar la acción de estudiar y deja el modificador sin referente lógico.',
    D: 'Correcta: archaeologists aparece como sujeto y es el agente capaz de estudiar las marcas de las tabletas.',
  }, fuenteHecho: 'Tabletas, equipo y hallazgos inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'historia', regla: 'Cierre de una cláusula relativa no esencial antes de continuar con el verbo principal.', razones: {
    A: 'El punto y coma separa el sujeto de su verbo principal y no cierra en paralelo el inciso abierto con coma.',
    B: 'Correcta: la coma cierra la cláusula no esencial «which reached only the eastern half of the valley».',
    C: 'Sin coma, la cláusula explicativa permanece abierta y el lector pierde la frontera antes de was.',
    D: 'El guion no corresponde con la coma de apertura y produce signos desemparejados alrededor del inciso.',
  }, fuenteHecho: 'Estación, geografía y desarrollo inventados.' },
]
