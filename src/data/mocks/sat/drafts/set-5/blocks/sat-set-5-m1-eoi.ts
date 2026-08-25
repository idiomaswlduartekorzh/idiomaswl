import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 5 M1 · q23–q27. Claves reservadas: C, A, D, B, B. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers at a campus library compared two kinds of directional signs with 40 first-time visitors in each condition.\n• One condition used word-only signs.\n• The other used signs with the same words plus icons.\n• Without asking staff for help, 18 visitors reached the assigned study room with word-only signs.\n• Without asking staff for help, 31 visitors reached it with word-and-icon signs.\n• The figures are original to this question.',
    text: 'The student wants to compare the wayfinding results for the two sign conditions. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['First-time visitors were assigned to locate a study room somewhere inside a library.', 'Icons are universally understood, so adding them to any sign will prevent every visitor from needing help.', 'Successful unaided navigation rose from 18 of 40 in the text-only condition to 31 of 40 when icons accompanied the words.', 'The library tested eighty visitors because its original word-only signs did not contain any visual information.'],
    answer: 2,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Sunflower stalk pith is an agricultural residue with a porous structure.\n• Researchers made sound-absorbing panels from the pith using starch or chitosan binders.\n• At low frequencies from 250 to 400 hertz, the panels’ measured absorption coefficients were six to nine times those of the industrial comparison panels.\n• Performance at one frequency range does not establish performance in every room or installation.',
    text: 'The student wants to emphasize a measured acoustic result while preserving the limits of the study. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Between 250 and 400 hertz, sunflower-pith boards absorbed sound six to nine times as strongly as industrial controls, but those measurements cannot predict every installation.', 'Because sunflower pith is porous, its measured absorption coefficients prove that the panels outperform every industrial comparison material at all frequencies in any room.', 'The researchers used two binders, proving that the choice between starch and chitosan has no effect on acoustic performance.', 'Sunflower stalks are agricultural residues, so leaving them in a field produces the same acoustic result as forming them into panels.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Chromolithography builds a color image through successive impressions from prepared lithographic stones.\n• An 1883 manual illustrated one chromolithograph made with 22 stones.\n• Japanese polychrome woodblock printing uses carved woodblocks.\n• Separate blocks or separately carved areas apply different colors in successive impressions.\n• Both processes require careful registration so each impression aligns on the same sheet.',
    text: 'The student wants to compare how the two processes construct a multicolor image without ranking their artistic quality. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The 1883 chromolithography manual describes a more artistic process because its example required twenty-two separate stones.', 'Japanese printers used carved woodblocks, whereas chromolithographers could complete every color in one impression from one stone.', 'Because both processes require registration, they use the same printing surface and produce images of equal artistic quality.', 'Each method layers registered color impressions, using lithographic stone in one case and carved wooden matrices in the other.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'Homing pigeons flying in stronger turbulence showed a small increase in average wingbeat amplitude. ______ their average wingbeat frequency decreased slightly, so mean flapping speed remained nearly unchanged.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'By contrast,', 'Therefore,', 'Similarly,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'In a fictional play, the direction “[She waits at the threshold]” appears once in each act. Repetition might seem to make the direction a stable sign of hesitation. ______ the character first waits to challenge a visitor, later to welcome one, and finally because she fears entering an empty room. The unchanged direction thus measures a transformation rather than a fixed response.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For instance,', 'Instead,', 'Likewise,', 'Consequently,'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Menciona la tarea y la población, pero omite la comparación numérica solicitada entre las dos condiciones.',
    B: 'Convierte un resultado local de 31 sobre 40 en una afirmación universal y absoluta que las notas no sostienen.',
    C: 'Correcta: compara directamente 31 con 18 y conserva la condición medida de llegar sin pedir ayuda.',
    D: 'Inventa una razón para el tamaño de la muestra y confunde word-only con ausencia total de información visual.',
  }, fuenteHecho: 'Condiciones y cifras originales; diseño informado por Su, “Let eyes tell”, estudio experimental de señalización y orientación en biblioteca: https://doi.org/10.1108/LHT-01-2020-0007' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: conserva el intervalo y la magnitud medidos, y declara que ese resultado no garantiza el desempeño en toda instalación.',
    B: 'Extrapola desde un intervalo de baja frecuencia a todos los sonidos, materiales y edificios.',
    C: 'Las notas nombran dos aglutinantes, pero no dicen que produzcan resultados idénticos.',
    D: 'La medición corresponde a paneles fabricados; un tallo sin procesar en el campo no es la misma condición.',
  }, fuenteHecho: 'Gomez-Campos et al., Journal of Cleaner Production, paneles acústicos de médula de girasol y desempeño a baja frecuencia: https://doi.org/10.1016/j.jclepro.2023.136620' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'El número de piedras describe complejidad técnica en un ejemplo, no demuestra mayor calidad artística.',
    B: 'Las notas dicen que la cromolitografía también emplea impresiones sucesivas y piedras preparadas, no una sola impresión.',
    C: 'Compartir la necesidad de registro no vuelve idénticas las superficies ni permite igualar la calidad de las obras.',
    D: 'Correcta: identifica el principio compartido de capas alineadas y contrasta con precisión piedra y madera.',
  }, fuenteHecho: 'Smithsonian Libraries, “The art of chromolithography”, y Southern Illinois University SCRC, proceso de xilografía japonesa: https://www.si.edu/object/art-chromolithography-popularly-explained-and-illustrated-forty-four-plates-showing-separate%3Asiris_sil_534823 ; https://scrcexhibits.omeka.net/exhibits/show/japanese-woodblock-prints/howarewoodblockprintsmade/howwoodblockprintsaremade' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'ciencia', razones: {
    A: 'For example introduciría un caso del aumento de amplitud, pero la frecuencia cambia en la dirección opuesta.',
    B: 'Correcta: By contrast señala el descenso de frecuencia frente al aumento de amplitud.',
    C: 'Therefore presenta el descenso como consecuencia necesaria del aumento, relación causal que el estudio no establece.',
    D: 'Similarly indicaría cambios paralelos en la misma dirección, aunque una medida sube y la otra baja.',
  }, fuenteHecho: 'Lempidakis et al., “Turbulence causes kinematic and behavioural adjustments in a flapping flier”: https://pmc.ncbi.nlm.nih.gov/articles/PMC10950466/' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'For instance presentaría las reacciones como ejemplo de una señal estable, pero muestran que su función cambia.',
    B: 'Correcta: Instead sustituye la interpretación esperada de estabilidad por el patrón contrario de significados variables.',
    C: 'Likewise exige paralelismo con la estabilidad anticipada, no una corrección de esa expectativa.',
    D: 'Consequently convertiría las respuestas distintas en consecuencia de esperar estabilidad, relación que el texto no sostiene.',
  }, fuenteHecho: 'Dramaturga, obra, acotación y escenas inventadas.' },
]
