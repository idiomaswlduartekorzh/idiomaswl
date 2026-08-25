import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/** Expression of Ideas · Set 5 M2 estándar · q23–q27. Claves reservadas: A, B, D, C, A. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A study compared two versions of the same podcast transcript.\n• One version presented the transcript as uninterrupted paragraphs.\n• The other inserted descriptive headings before each topic.\n• Thirty participants used each version to locate a specified discussion within two minutes.\n• In the uninterrupted-paragraph condition, 16 participants completed the task.\n• In the descriptive-heading condition, 25 participants completed the task.\n• The conditions and figures are original to this question.',
    text: 'The student wants to compare task completion in the two transcript conditions. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Within two minutes, 25 of 30 participants using descriptive headings located the discussion, compared with 16 of 30 using uninterrupted paragraphs.', 'Because headings make every transcript accessible to every reader, all participants in the heading condition completed the task.', 'The study used the same podcast transcript in two versions, one of which contained paragraphs.', 'Nine participants preferred descriptive headings even though the notes report task completion rather than preferences.'],
    answer: 0,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers cleaned, ground, and calcined waste chicken eggshells to produce a calcium oxide (CaO) catalyst.\n• They used the catalyst to convert used cooking oil into biodiesel.\n• Under the study’s optimized reaction conditions, the biodiesel yield with the chicken-eggshell catalyst was 94%.\n• The result applies to the tested catalyst and reaction conditions.',
    text: 'The student wants to emphasize the catalyst’s source and the measured result without overgeneralizing. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Every calcium-based waste material will convert any oil into biodiesel at a yield of exactly 94%.', 'Under the optimized setup, a catalyst prepared by heating discarded chicken shells yielded 94% biodiesel from previously used oil.', 'The researchers cleaned and ground eggshells, so calcination and reaction conditions had no bearing on the biodiesel yield.', 'Used cooking oil contains chicken eggshells naturally and therefore requires no prepared catalyst during biodiesel production.'],
    answer: 1,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• In a Jacquard loom, the arrangement of holes in a sequence of cards controls which warp threads are lifted.\n• The controlled thread lifts help produce a woven pattern.\n• In a cylinder music box, pins arranged on a rotating cylinder pluck selected teeth of a tuned metal comb.\n• The selected teeth produce a melody in sequence.\n• The notes do not establish that either mechanism influenced the invention of the other.',
    text: 'The student wants to compare how the two mechanisms encode sequences without claiming a direct historical influence. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Because both machines use punched cards, a cylinder music box can control warp threads in a Jacquard loom.', 'The music box was invented by copying the Jacquard loom, which had already replaced every hand-operated weaving process.', 'Jacquard cards produce melodies with tuned teeth, whereas pinned cylinders create woven patterns by lifting threads.', 'Both mechanisms store ordered instructions in physical features, but card holes control a textile pattern while cylinder pins control a melody.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'In an experiment with Pacific oyster larvae, adult-shell extract produced a concentration-dependent increase in settlement, whereas the tested sugars without the extract did not promote settlement. ______ the researchers concluded that a cue in the shell extract, rather than sugar exposure alone, contributed to the response.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Meanwhile,', 'Nevertheless,', 'Therefore,', 'For example,'],
    answer: 2,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'Each section of a fictional story opens with nearly the same description of a room: a blue bowl on the table, a brass key by the window, and a map above the desk. ______ one object disappears from the description after each visit, until the narrator names only the empty table. The repeated frame therefore makes the material losses more visible.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['However,', 'For example,', 'Accordingly,', 'Similarly,'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: compara directamente 25 de 30 con 16 de 30 y conserva el límite temporal y las dos condiciones medidas.',
    B: 'Convierte un resultado de 25 participantes en una afirmación universal y además dice incorrectamente que completaron los treinta.',
    C: 'Describe una parte del diseño, pero no usa las cifras para comparar la finalización de la tarea.',
    D: 'La diferencia numérica fue de nueve finalizaciones; las notas no midieron preferencias.',
  }, fuenteHecho: 'Condiciones y cifras originales.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Generaliza a cualquier residuo, aceite y condición, aunque el estudio midió un catalizador y un proceso específicos.',
    B: 'Correcta: identifica el origen residual, la conversión a CaO, el aceite usado, el 94% y el límite de las condiciones optimizadas.',
    C: 'Las notas incluyen calcination y condiciones optimizadas; no permiten descartarlas como irrelevantes.',
    D: 'El catalizador se preparó a partir de cáscaras y se añadió al proceso; no estaba presente de forma natural en el aceite.',
  }, fuenteHecho: 'Tan et al., Applied Energy, catalizadores CaO derivados de cáscara y rendimiento con aceite usado: https://doi.org/10.1016/j.apenergy.2015.09.023' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'historia', razones: {
    A: 'La caja usa un cilindro con pines, no tarjetas, y su salida musical no controla los hilos del telar.',
    B: 'Las notas excluyen afirmar influencia directa y tampoco sostienen que el telar reemplazara todo tejido manual.',
    C: 'Invierte las salidas: las tarjetas controlan el tejido y el cilindro hace sonar el peine afinado.',
    D: 'Correcta: compara la codificación física y distingue tanto el soporte como la salida sin inventar una genealogía.',
  }, fuenteHecho: 'Science Museum Group, tarjetas Jacquard: https://collection.sciencemuseumgroup.org.uk/objects/co503962/jacquard-punched-cards-1890-1910-punched-cards; Museums Victoria, caja musical de cilindro: https://collections.museumsvictoria.com.au/items/404996' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Meanwhile marca simultaneidad, pero la segunda oración presenta una conclusión derivada del contraste experimental.',
    B: 'Nevertheless introduciría una concesión contra la evidencia, aunque la conclusión coincide con ella.',
    C: 'Correcta: Therefore señala que la conclusión limitada sobre el extracto se deriva de los resultados comparados.',
    D: 'For example anunciaría un caso de una idea previa, no la inferencia que sigue a los datos.',
  }, fuenteHecho: 'Vasquez et al., estudio experimental de extracto de concha y asentamiento de larvas de Crassostrea gigas: https://pmc.ncbi.nlm.nih.gov/articles/PMC8004857/' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Correcta: However contrapone la estabilidad verbal del comienzo con la desaparición progresiva de sus objetos.',
    B: 'For example presentaría la pérdida como caso de repetición estable, pero el texto subraya el contraste entre ambas.',
    C: 'Accordingly afirmaría que la desaparición es una consecuencia lógica de repetir la frase, relación no establecida.',
    D: 'Similarly exige semejanza entre la descripción inicial y lo que sigue, aunque el contenido cambia visita tras visita.',
  }, fuenteHecho: 'Historia, habitación, objetos y estructura inventados.' },
]
