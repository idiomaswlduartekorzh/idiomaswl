import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'The walls of a recording studio are often covered with soft, uneven panels. A bare wall reflects sound back into the room, causing an echo that microphones capture. The panels absorb much of that reflected sound instead. By reducing the echo, they help a microphone record a singer\'s voice clearly, without the same notes arriving a second time from the walls.',
    text: 'As used in the text, what does the word "capture" most nearly mean?',
    options: ['Seize', 'Record', 'Attract', 'Confine'],
    answer: 1,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'The rain stopped just before dawn, leaving every roof in the village bright and clean. Tomas stepped outside with the letter folded in his pocket. He had read it so often that the paper had softened along its creases, yet he still could not bring himself to answer. At the gate he paused, listening to water drip from the mango leaves. The quiet morning seemed to hold the question open for him.',
    text: 'As used in the text, what does the word "hold" most nearly mean?',
    options: ['Grasp physically', 'Organize formally', 'Contain securely', 'Keep unchanged'],
    answer: 3,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'A mayoral report from 1904 celebrated the new electric streetlights as a complete success. Historian Joel Aranda offers a more measured assessment. Shopkeepers near the central square stayed open later, he notes, but most outer neighborhoods received no lamps for another decade. The project changed evening life in one busy district while leaving the daily schedules of many residents untouched.',
    text: 'As used in the text, what does the word "measured" most nearly mean?',
    options: ['Carefully restrained', 'Precisely counted in full', 'Evenly spaced', 'Officially recorded'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'Every Saturday, Inez set up her fruit stand before the market opened. She arranged the oranges in careful pyramids and wrote each price in neat chalk. Her new assistant, Pao, copied the arrangement exactly. At noon a child knocked over one pyramid, and Pao froze. Inez laughed, handed him a basket, and began selling the fallen oranges at a discount. By closing time, Pao had stopped checking where every fruit belonged.',
    text: 'Which choice best describes the function of the child knocking over the oranges in the text as a whole?',
    options: ['It explains why the market closes earlier than Pao expected.', 'It shows that Inez values neat displays more than selling fruit.', 'It creates a disruption that helps Pao become less rigid.', 'It causes Inez to replace Pao with a more experienced assistant.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Desert ants can travel far from their nests while searching for food. On the outward trip, an ant follows a twisting path around stones and plants. Its return is strikingly different: it heads almost directly home. Researchers proposed that the ant continually combines the direction and distance of each short movement. Experiments in which ants were gently moved to a new location before release showed that they followed the direction their internal calculation predicted, not the direction of the actual nest.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It describes a behavior, offers an explanation for it, and presents evidence consistent with that explanation.', 'It compares two ant species, rejects a proposed difference, and identifies a shared behavior.', 'It presents an experiment, questions the way it was conducted, and recommends a different method.', 'It explains how ants find food, traces the complete route back to a nest, and describes every obstacle encountered along that route.'],
    answer: 0,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'The first public clocks in the city were mounted high on towers and announced the hour with bells. Because workers could hear them from streets and workshops, historians often describe the clocks as a shared civic service. Yet surviving council records show that each tower\'s bells followed a slightly different local time. Only after railway schedules demanded coordination did the council order all the clocks to agree. The early clocks made time public, but not yet uniform.',
    text: 'Which choice best describes the function of the information about the railway schedules?',
    options: ['It explains why workers stopped relying on all public bells and began carrying personal clocks to know the hour.', 'It gives an example of a public service that existed before tower clocks.', 'It shows that railway companies, rather than the council, owned the clocks.', 'It identifies the pressure that led the city to synchronize its public clocks.'],
    answer: 3,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nCommunity gardens should reserve every plot for food crops. In neighborhoods with few grocery stores, the land is too valuable to devote to flowers that cannot be eaten. Vegetables and herbs provide a direct benefit to local families.\n\nText 2\n\nFlowers can support a garden\'s food production. Bees and other pollinators visit flowering plants, then carry pollen among squash, bean, and tomato blossoms. A narrow flower border may therefore increase the harvest from the vegetable plots beside it.',
    text: 'How would the author of Text 2 most likely respond to the claim in Text 1 that flowers provide no direct benefit to food production?',
    options: ['By agreeing because pollinators visit flowers instead of vegetables', 'By disagreeing because flowers may improve pollination of nearby food crops', 'By agreeing because only vegetables and herbs can be harvested by families', 'By disagreeing because every garden plot should contain both flowers and vegetables'],
    answer: 1,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nA handwritten correction in the composer Amalia Voss\'s score changes a loud final chord to a quiet one. Because the ink matches the rest of the score, scholar Rina Cho argues that Voss made the change while composing and intended the quiet ending.\n\nText 2\n\nMatching ink does not establish when the correction was made: Voss used the same bottle for years. A letter written after the first performance praises the loud ending, and its description matches the original chord. The quiet version may reflect a later revision rather than the composer\'s first intention.',
    text: 'Which choice best describes a disagreement between the two texts?',
    options: ['Text 1 argues that Voss wrote the complete score herself, while Text 2 attributes both versions to a different composer working years later.', 'Text 1 treats the letter as reliable evidence, while Text 2 doubts that the performance occurred.', 'Text 1 dates the correction to the original composition, while Text 2 argues that it may have been made later.', 'Text 1 favors a loud ending for artistic reasons, while Text 2 favors a quiet ending.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Seize implica apoderarse físicamente de algo, pero el micrófono no retiene el sonido como objeto.',
    B: 'Correcta: el contexto explica que el micrófono registra la voz y también registraría el eco reflejado.',
    C: 'Attract supone atraer el sonido hacia el aparato; el pasaje habla de lo que queda guardado en la grabación.',
    D: 'Confine significa encerrar, mientras las ondas siguen moviéndose por el estudio.',
  }, fuenteHecho: 'Explicación acústica general con redacción original.' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'literatura', razones: {
    A: 'No hay una acción física de agarrar: el sujeto es la mañana silenciosa.',
    B: 'Organize se usa para celebrar una reunión o evento, pero aquí no existe actividad formal.',
    C: 'Contain sugiere encerrar algo dentro de límites; la pregunta sigue abierta, no guardada.',
    D: 'Correcta: la quietud mantiene sin resolver la pregunta que Tomas todavía no contesta.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'historia', razones: {
    A: 'Correcta: Aranda limita la celebración al centro y evita la conclusión absoluta del informe.',
    B: 'El historiador cita tiempos y lugares, pero measured describe el tono de su evaluación, no un conteo.',
    C: 'Evenly spaced es una acepción física que no puede describir una valoración histórica.',
    D: 'El informe municipal es oficial; la evaluación del historiador no se define por estar registrada.',
  }, fuenteHecho: 'Ciudad, informe e historiador inventados.' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'literatura', razones: {
    A: 'El mercado no cierra antes y el incidente no modifica su horario.',
    B: 'Inez responde vendiendo la fruta caída, lo que muestra flexibilidad y no apego al diseño.',
    C: 'Correcta: el accidente obliga a improvisar y al final Pao ya no necesita controlar cada posición.',
    D: 'Inez le entrega una cesta y trabaja con él; nunca lo reemplaza.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: la ruta directa es el comportamiento, la suma interna es la explicación y el traslado la pone a prueba.',
    B: 'Solo aparece una clase de hormiga y no hay comparación entre especies.',
    C: 'El experimento respalda la explicación; el texto no critica su diseño.',
    D: 'La búsqueda de alimento introduce el contexto, pero el foco es cómo regresan al nido.',
  }, fuenteHecho: 'Síntesis original de navegación por integración de trayectoria en hormigas.' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'historia', razones: {
    A: 'Los trabajadores podían seguir oyendo los relojes; el cambio fue que marcaron la misma hora.',
    B: 'Los horarios ferroviarios aparecen después y no son un servicio anterior a los relojes.',
    C: 'El consejo conserva autoridad sobre los relojes y ordena coordinarlos.',
    D: 'Correcta: la necesidad de un horario ferroviario común explica la orden de sincronización.',
  }, fuenteHecho: 'Ciudad y registros inventados con contexto histórico general.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 afirma que los polinizadores pasan de flores a cultivos, no que los abandonen.',
    B: 'Correcta: el segundo autor conecta las flores con una cosecha mayor mediante la polinización.',
    C: 'Repite que las flores no se comen, pero ignora su efecto sobre los alimentos.',
    D: 'Text 2 propone un borde estrecho, no exige mezclar ambos tipos en cada parcela.',
  }, fuenteHecho: 'Argumentos originales basados en ecología general de polinizadores.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'humanidades', razones: {
    A: 'Ambos textos aceptan que la partitura es de Voss; discuten la fecha de una corrección.',
    B: 'Text 2 usa la carta como evidencia y no niega la primera interpretación pública.',
    C: 'Correcta: Cho sitúa el cambio durante la composición y Text 2 lo considera una revisión posterior.',
    D: 'Los autores evalúan cronología e intención, no expresan preferencias artísticas propias.',
  }, fuenteHecho: 'Compositora, partitura, carta y especialistas inventados.' },
]
