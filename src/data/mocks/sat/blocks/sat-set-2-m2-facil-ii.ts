import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'When people read silently, their eyes do not move smoothly across a line. Instead, the eyes make short jumps and pause several times. During each pause, the reader recognizes a small group of words. Difficult or unfamiliar phrases usually produce longer pauses and sometimes cause the eyes to jump backward. Researchers can therefore use eye movements to study which parts of a text demand the most attention.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Skilled readers move their eyes smoothly because they recognize every phrase.', 'Backward eye movements prevent readers from understanding unfamiliar words.', 'Patterns of eye pauses and jumps can reveal how readers process a text.', 'Researchers study eye movement mainly to make printed lines shorter.'],
    answer: 2,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'At a coastal school, students placed identical metal plates in three locations: an open field, beneath a shade cloth, and under a dense tree. At noon the field plate was hottest. The plate under cloth was cooler, and the plate under the tree was coolest. Air temperature was nearly identical at all three sites. The students concluded that the tree reduced heating through more than shade alone, possibly because water evaporating from its leaves cooled the surrounding surface.',
    text: 'Which choice best states the main idea of the text?',
    options: ['A tree kept a test surface cooler than either open sun or artificial shade, suggesting an additional cooling effect.', 'Metal plates are unsuitable for comparing temperatures because they become hotter than the surrounding air.', 'Shade cloth cooled the air around a metal plate more effectively than a living tree did.', 'Evaporation from leaves is the only factor that can reduce the temperature of any outdoor surface during the middle of the day.'],
    answer: 0,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'The ferry was already sounding its horn when Malik reached the end of the pier. He could have shouted, but instead he set down his bag and watched the deckhands pull in the rope. The next ferry would not leave for four hours. Malik opened the envelope he had been carrying unopened since breakfast, read the first line, and sat on the bag. When the ferry became a white mark on the water, he was still reading.',
    text: 'Which quotation from the text best supports the claim that missing the ferry gives Malik time to face something he had been avoiding?',
    options: ['“The ferry was already sounding its horn when Malik reached the end of the pier.”', '“The next ferry would not leave for four hours.”', '“When the ferry became a white mark on the water, he was still reading.”', '“Malik opened the envelope he had been carrying unopened since breakfast”'],
    answer: 3,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Art historian Mei Santos argues that the small holes along the edges of several painted festival banners were not accidental damage. The holes are evenly spaced, appear in the same positions on different banners, and pass through layers of paint added at different times. Santos proposes that cords once ran through them so the banners could be attached to frames and carried through the streets.',
    text: 'Which finding, if true, would most strongly support Santos\'s proposal?',
    options: ['The banners use brighter pigments than paintings intended for indoor walls.', 'A surviving festival frame has cord ties spaced at the same intervals as the holes in the banners.', 'Some banners show detailed scenes of musicians and dancers participating in large street festivals beside temporary wooden frames.', 'The oldest layer of paint on each banner contains a different decorative pattern.'],
    answer: 1,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'Researchers compared how quickly two kinds of pavement cooled after sunset. They measured surface temperature at the same four sites for five evenings.\n\nAverage surface temperature\nAt sunset: standard pavement 32°C; pale pavement 30°C\nTwo hours later: standard pavement 27°C; pale pavement 23°C\nFour hours later: standard pavement 24°C; pale pavement 20°C',
    text: 'Which choice most effectively uses data from the table to support the claim that pale pavement cooled more quickly after sunset?',
    options: ['Standard pavement began at 32°C and remained warmer than pale pavement at every measurement.', 'After four hours, both pavement types had cooled, with temperatures of 24°C and 20°C.', 'Over four hours, pale pavement fell 10°C, while standard pavement fell 8°C.', 'Pale pavement was 2°C cooler at sunset and 4°C cooler two hours later.'],
    answer: 2,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'Nora expected the community orchestra to stop when its conductor retired. Instead, the musicians met without him the following week. The violinists selected music, the brass players arranged chairs, and the youngest percussionist found a hall that charged no rent on Tuesdays. Their first rehearsal wandered and restarted often, but nobody left early. By the third week, a different musician was leading each piece.',
    text: 'Which conclusion is best supported by the text?',
    options: ['The orchestra members are learning to share responsibilities that the conductor once handled.', 'The musicians prefer rehearsing on Tuesdays because the retired conductor is unavailable then.', 'The youngest musician will become the orchestra\'s permanent conductor after three weeks.', 'The orchestra chose easier music because it could no longer perform difficult pieces.'],
    answer: 0,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'A botanist grew one group of seedlings in still air and another in a room where fans produced short, gentle bursts each day. The fan-exposed plants developed shorter stems but thicker bases. When both groups were later placed outdoors, the still-air plants bent during the first windy afternoon, while most fan-exposed plants remained upright. Leaf number and total plant mass were similar in the two groups.',
    text: 'Which conclusion is best supported by the text?',
    options: ['Daily air movement increased the total amount of material produced by each seedling.', 'Short stems alone explain why every fan-exposed plant remained upright outdoors.', 'Still air caused seedlings to produce fewer leaves than air movement did.', 'Exposure to gentle air movement changed stem form in a way associated with greater resistance to wind.'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El texto dice que todos los ojos saltan y se detienen, no que los lectores hábiles se desplacen sin pausas.',
    B: 'Los saltos hacia atrás señalan dificultad, pero no se afirma que impidan comprender.',
    C: 'Correcta: las pausas y retrocesos permiten localizar qué fragmentos requieren mayor procesamiento.',
    D: 'La longitud de las líneas no es el objetivo de la investigación descrita.',
  }, fuenteHecho: 'Explicación original basada en conocimientos generales de seguimiento ocular.' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: resume el orden de temperaturas y la inferencia de que el árbol aporta algo además de sombra.',
    B: 'Las placas se usan precisamente como superficies idénticas para hacer válida la comparación.',
    C: 'El árbol produjo la placa más fría y la temperatura del aire fue casi igual en los tres lugares.',
    D: 'El texto presenta evaporación como posibilidad, no como única causa demostrada.',
  }, fuenteHecho: 'Escuela, mediciones y resultado inventados.' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 1, tema: 'literatura', razones: {
    A: 'Muestra que llega tarde, pero no identifica aquello que había evitado ni qué hace después.',
    B: 'Explica que dispone de tiempo, aunque no muestra que decida enfrentar el asunto pendiente.',
    C: 'Indica que continúa leyendo, pero no revela por sí sola que antes hubiera evitado la carta.',
    D: 'Correcta: unopened since breakfast prueba la evitación y opened muestra el cambio tras perder el ferry.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Los pigmentos vivos pueden relacionarse con festivales, pero no explican agujeros regulares ni cordones.',
    B: 'Correcta: la coincidencia física entre amarres y agujeros respalda directamente el montaje en bastidores.',
    C: 'Las escenas festivas apoyan el contexto general, no el mecanismo de transporte propuesto.',
    D: 'La variedad decorativa no aporta evidencia sobre la función de los agujeros.',
  }, fuenteHecho: 'Banderas, historiadora y hallazgo hipotético inventados.' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Compara niveles absolutos, pero no calcula cuánto se enfrió cada material desde su propio inicio.',
    B: 'Da las temperaturas finales sin relacionarlas con los valores iniciales necesarios para medir rapidez.',
    C: 'Correcta: compara las caídas desde el atardecer y muestra dos grados adicionales de enfriamiento en el material pálido.',
    D: 'Compara diferencias entre materiales en dos momentos, pero omite la caída completa de cada uno.',
  }, fuenteHecho: 'Sitios, temperaturas y experimento inventados.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Correcta: distintas secciones asumen música, logística y dirección, funciones antes concentradas en el conductor.',
    B: 'El martes se elige porque la sala es gratuita, no por la agenda del director retirado.',
    C: 'La dirección rota entre músicos y no se anuncia un puesto permanente.',
    D: 'No se describe la dificultad del repertorio ni una reducción de nivel.',
  }, fuenteHecho: 'Orquesta, integrantes y secuencia inventados.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'La masa total fue similar, por lo que el aire no aumentó la producción total de material.',
    B: 'Las bases también fueron más gruesas y el texto dice most, no every.',
    C: 'El número de hojas fue semejante en ambos grupos.',
    D: 'Correcta: el tratamiento se asocia con tallos bajos y gruesos que permanecen erguidos bajo viento real.',
  }, fuenteHecho: 'Tratamiento, plantas y resultados inventados a partir de respuestas mecánicas generales.' },
]
