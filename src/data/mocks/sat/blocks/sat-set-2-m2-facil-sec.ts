import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'The town museum received a box of letters from the family of a local nurse. Most described ordinary work at the ______ one letter recorded how residents organized food deliveries during the flood of 1923. The curator placed that letter beside photographs of the flooded streets, where it helps visitors connect the disaster with the community\'s response.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['clinic, although', 'clinic,', 'clinic because', 'clinic, but'],
    answer: 3,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'A row of tall windows along the eastern wall ______ morning light into the studio. By noon, when direct sunlight would make the room too warm, the wide roof blocks it. The arrangement lets artists work beside the windows for most of the day without moving their tables or switching on electric lamps.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['admit', 'admits', 'have admitted', 'are admitting'],
    answer: 1,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The island fox, once nearly absent from several of California\'s Channel ______ has recovered after a long conservation effort. Biologists raised foxes in protected enclosures, reduced threats from introduced animals, and released healthy adults. The population is now large enough that most monitoring occurs without handling the foxes.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['Islands', 'Islands;', 'Islands,', 'Islands—'],
    answer: 2,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'In 1998, volunteers planted a line of young trees along the canal path. At first, the thin trunks offered almost no shade. Since then, the trees ______ into a continuous canopy that covers much of the walkway, and summer cyclists often choose the canal route because it remains cooler than nearby streets.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['have grown', 'grew', 'had grown', 'will grow'],
    answer: 0,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'The engineer did not begin by replacing the entire mill wheel. She first examined where the old wooden paddles had worn away. Her inspection revealed a simple ______ sand carried by the stream struck the same outer edge on every turn. Rotating each new paddle halfway through the season doubled the time before replacement was needed.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['pattern,', 'pattern; because', 'pattern although', 'pattern:'],
    answer: 3,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'When the dancers first rehearsed the new piece, each dancer ______ the rhythm aloud. As the movement became familiar, they gradually lowered their voices. By the final rehearsal, the counting had disappeared, but the shared rhythm remained visible in the way every foot reached the floor at the same instant.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['counts', 'counted', 'has counted', 'counting'],
    answer: 1,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'Looking through the narrow opening in the shelter wall, ______. The birds landed in the reeds only a few meters away and behaved as if no observer were present. Because the shelter hid both movement and color, the team could count feeding visits without changing the activity it hoped to measure.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['the researchers watched the birds feed', 'the birds were watched while they fed by the researchers', 'the feeding birds came into the researchers\' view', 'there were researchers watching the birds feed'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Coma y conjunción coordinante para unir dos oraciones independientes en contraste.', razones: {
    A: 'Although vuelve dependiente la segunda parte y exige una oración principal posterior que no aparece.',
    B: 'La coma sola une dos oraciones completas y produce un comma splice.',
    C: 'Because presenta causa, pero la carta especial no explica que las demás traten el trabajo ordinario.',
    D: 'Correcta: coma más but une dos oraciones independientes y expresa el contraste entre la mayoría y la excepción.',
  }, fuenteHecho: 'Museo, cartas, enfermera y flood inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 1, tema: 'humanidades', regla: 'Concordancia entre el núcleo singular row y el verbo en presente.', razones: {
    A: 'Admit concuerda con windows, un sustantivo dentro de la frase preposicional, no con row.',
    B: 'Correcta: row es singular y la descripción general en presente exige admits.',
    C: 'Have admitted usa auxiliar plural y añade un aspecto perfecto que el contexto no pide.',
    D: 'Are admitting concuerda en plural y convierte una propiedad estable en acción temporal.',
  }, fuenteHecho: 'Estudio y disposición arquitectónica inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'ciencia', regla: 'Cierre con coma de una frase explicativa no esencial intercalada entre sujeto y verbo.', razones: {
    A: 'Sin coma, el inciso abierto después de fox no queda cerrado antes de has recovered.',
    B: 'El punto y coma separa el sujeto island fox de su verbo principal.',
    C: 'Correcta: la coma cierra el modificador explicativo «once nearly absent…».',
    D: 'El guion no empareja la coma de apertura y deja signos asimétricos.',
  }, fuenteHecho: 'Recuperación general del zorro isleño; redacción original sin cifras.' },
  { id: 'q19', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'historia', regla: 'Presente perfecto para un cambio iniciado en el pasado con resultado vigente.', razones: {
    A: 'Correcta: since then conecta la plantación de 1998 con el dosel que existe ahora.',
    B: 'El pasado simple cierra el crecimiento en un momento pasado y no enlaza con remains.',
    C: 'El pasado perfecto necesitaría otro punto pasado posterior como referencia.',
    D: 'El futuro contradice que el dosel ya cubre la ruta y la mantiene fresca.',
  }, fuenteHecho: 'Canal, fecha y plantación inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'ciencia', regla: 'Dos puntos tras una oración completa para introducir la explicación concreta de un patrón.', razones: {
    A: 'La coma sola no introduce correctamente la oración independiente explicativa.',
    B: 'El punto y coma queda seguido por una subordinada con because que no contiene una oración principal completa.',
    C: 'Although crea una concesión que no tiene oración principal que la complete.',
    D: 'Correcta: la cláusula anterior es completa y los dos puntos anuncian en qué consiste el patrón.',
  }, fuenteHecho: 'Molino, diagnóstico y solución inventados.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'humanidades', regla: 'Pasado simple coordinado con el marco pasado de la narración.', razones: {
    A: 'Counts cambia al presente dentro de una secuencia fijada por rehearsed y lowered.',
    B: 'Correcta: counted es pasado simple y mantiene el tiempo narrativo de todo el párrafo.',
    C: 'Has counted introduce presente perfecto y conecta con el presente, no con ese primer ensayo pasado.',
    D: 'Counting no funciona como verbo principal conjugado después del sujeto dancer.',
  }, fuenteHecho: 'Ensayo de danza inventado.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'ciencia', regla: 'El sujeto principal debe ser el agente lógico del modificador inicial.', razones: {
    A: 'Correcta: researchers son quienes pueden mirar por la abertura y observar a las aves.',
    B: 'Hace que birds sean quienes miran por la pared, aunque la pasiva sea gramatical de forma aislada.',
    C: 'Feeding birds queda como sujeto del modificador y no puede realizar la acción de mirar.',
    D: 'El sujeto formal there no puede mirar; researchers queda enterrado dentro de la construcción.',
  }, fuenteHecho: 'Refugio y observación inventados con método de campo general.' },
]
