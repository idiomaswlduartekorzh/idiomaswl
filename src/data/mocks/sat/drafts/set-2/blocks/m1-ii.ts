import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'A map may seem to be a neutral copy of a place, but every mapmaker selects. A transit map enlarges stations and straightens winding routes so riders can understand connections quickly; a hiking map preserves bends and elevation while omitting most bus stops. Neither map is inaccurate for failing to include everything. Each becomes useful by emphasizing the features needed for a particular task.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Transit maps are easier to read than hiking maps because their routes are straight.', 'Maps become inaccurate when they omit transportation or landscape details.', 'A useful map should preserve the exact shape and scale of every feature it represents.', 'Maps serve different purposes by selecting and emphasizing different information.'],
    answer: 3,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Biologists placed small shelters on a beach where young lizards crossed open sand between patches of grass. Some shelters were painted to match the sand; others were painted bright orange. Lizards paused beneath both kinds at similar rates during cool mornings. At midday, however, they used the sand-colored shelters almost twice as often as the orange ones. The researchers found no temperature difference between the two shelter types.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Young lizards prefer orange shelters when low morning temperatures make movement difficult.', 'The visibility of a shelter may affect whether lizards use it when crossing the beach at midday.', 'Sand-colored shelters remain cooler than orange shelters and therefore protect lizards from heat.', 'Young lizards cross open sand only when artificial shelters are available along the route.'],
    answer: 1,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'Mira had promised herself that she would sell the old bicycle before moving. Its tires were flat, its bell was missing, and carrying it down three flights of stairs would be difficult. On the last evening, she wiped dust from the green frame and found a pale scratch made when her brother first taught her to turn without falling. She carried two boxes to the truck, then returned upstairs. The bicycle was leaning beside the door when she locked the apartment.',
    text: 'Which quotation from the text best supports the claim that a memory changes Mira\'s decision about the bicycle?',
    options: ['“Mira had promised herself that she would sell the old bicycle before moving. Its tires were flat, its bell was missing, and carrying it down three flights of stairs would be difficult.”', '“Its tires were flat, its bell was missing, and carrying it down three flights of stairs would be difficult.”', '“she wiped dust from the green frame and found a pale scratch made when her brother first taught her to turn without falling”', '“She carried two boxes to the truck, then returned upstairs. The bicycle was leaning beside the door”'],
    answer: 2,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Historian Eli Navarro argues that a nineteenth-century port expanded because small coastal traders, not only overseas merchants, created steady demand for warehouse space. Customs records list the largest foreign ships but say little about vessels moving between nearby towns. Navarro therefore examined repair ledgers from local shipyards, reasoning that boats serving the coastal trade would need frequent maintenance even when their cargoes escaped customs records.',
    text: 'Which finding, if true, would most strongly support Navarro\'s argument?',
    options: ['Shipyard ledgers show that repairs to locally owned coastal boats increased during the same years that new warehouses opened.', 'Customs officers recorded several foreign ships carrying unusually valuable cargoes during the port\'s busiest year and the following season.', 'Warehouse owners charged overseas merchants lower rates for long contracts than they charged occasional customers.', 'Some coastal traders bought imported rope and sails from shops located near the shipyards after paying fees to overseas merchants.'],
    answer: 0,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'An ecologist tested whether a border of flowering plants would attract insects that prey on aphids in bean fields. Four fields received a flower border, and four otherwise similar fields did not. The ecologist counted aphids and predatory insects on fifty bean plants in each field.\n\nAverage insects per 50 bean plants\nFlower border: aphids 84; predators 31\nNo flower border: aphids 137; predators 12',
    text: 'Which choice most effectively uses data from the table to support the ecologist\'s expectation?',
    options: ['Fields without flower borders had 137 aphids and 12 predators, for a combined total of 149 insects.', 'Flower-bordered fields had 53 fewer aphids, although the table does not identify which predator species were present.', 'The difference in predator counts between treatments was 19, smaller than the difference of 53 in aphid counts.', 'Compared with fields without borders, flower-bordered fields had more predators and fewer aphids.'],
    answer: 3,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'Every afternoon, the clockmaker placed one finished clock in the front window. Passersby admired the polished cases, but his apprentice Sora watched the clockmaker\'s hands instead. On Monday he adjusted a spring and frowned. On Tuesday he replaced it and listened again. Wednesday\'s clock looked exactly like Monday\'s from the street, yet the clockmaker smiled before setting it in the window. When he left the bench, Sora picked up the discarded spring and examined its curve.',
    text: 'Which choice most logically completes the text?',
    options: ['Sora plans to polish the clock\'s case before the next customer arrives.', 'Sora understands that an invisible mechanical difference mattered to the clockmaker.', 'Sora believes the clockmaker should display both clocks in the window so visitors can compare their cases.', 'Sora has learned that passersby can hear small differences in a clock\'s spring.'],
    answer: 1,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'A research team studying urban bats recorded feeding calls above six parks. Three parks switched their pathway lights off at midnight, while three kept the lights on until dawn. Before midnight, call rates were similar across the parks. After midnight, feeding calls increased sharply only in the parks that became dark. In a separate insect survey, moth counts also rose after the lights went out, but mosquito counts did not change.',
    text: 'Which conclusion is best supported by the text?',
    options: ['The post-midnight rise in bat feeding activity in darkened parks may be related to increased moth availability.', 'Bats avoid all parks with pathway lighting because artificial light eliminates the insects they eat.', 'Mosquito abundance determines whether bats begin feeding before or after midnight.', 'Turning lights off causes moth populations to grow permanently in urban parks.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Es un detalle parcial y además convierte la simplificación de rutas en una superioridad general que el texto no afirma.',
    B: 'El pasaje sostiene lo contrario: omitir datos puede hacer un mapa más útil para una tarea específica.',
    C: 'Exige exactitud de forma y escala cuando los ejemplos muestran que una selección deliberada puede ser válida.',
    D: 'Correcta: sintetiza la tesis inicial sobre selección y los dos ejemplos de información priorizada según la tarea.',
  }, fuenteHecho: 'Explicación cartográfica original basada en principios generales de diseño de mapas.' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Durante las mañanas frescas los dos colores reciben uso similar; no hay preferencia por naranja.',
    B: 'Correcta: al mediodía cambia el uso por color sin cambiar la temperatura, por lo que la visibilidad es una explicación plausible.',
    C: 'El texto elimina esta explicación al indicar que no hubo diferencia térmica entre refugios.',
    D: 'Los datos comparan tipos de refugio y no prueban que los lagartos nunca crucen sin ellos.',
  }, fuenteHecho: 'Experimento, especie y resultados inventados.' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'Expresa la decisión inicial de vender, no la memoria que provoca su cambio posterior.',
    B: 'Enumera defectos prácticos y favorece vender la bicicleta, pero no aporta el recuerdo decisivo.',
    C: 'Correcta: une la marca visible con el recuerdo de su hermano justo antes de que la bicicleta aparezca preparada para mudarse.',
    D: 'Describe una dificultad logística que existía antes y después del recuerdo; no explica el cambio.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: vincula actividad costera creciente con la apertura de almacenes mediante la fuente alternativa que Navarro eligió.',
    B: 'Confirma actividad de grandes barcos extranjeros, la explicación que el historiador considera incompleta.',
    C: 'Describe precios de contratos, pero no muestra cuánta demanda generaban los comerciantes costeros.',
    D: 'Comprar suministros cerca del puerto prueba presencia de algunos comerciantes, no un aumento capaz de impulsar almacenes.',
  }, fuenteHecho: 'Puerto, historiador y registros inventados.' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Suma correctamente dos cifras del control, pero no compara tratamientos ni apoya el mecanismo esperado.',
    B: 'Menciona la reducción de áfidos, aunque omite el aumento de depredadores que completa la expectativa causal.',
    C: 'Compara diferencias verdaderas, pero su tamaño relativo no demuestra la relación prevista entre depredadores y áfidos.',
    D: 'Correcta: usa ambas series y muestra simultáneamente más depredadores y menos áfidos con el borde floral.',
  }, fuenteHecho: 'Diseño experimental y datos originales.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'La atención de Sora está en la pieza descartada, no en el acabado exterior que admiran los transeúntes.',
    B: 'Correcta: los relojes parecen iguales desde fuera, pero la sustitución de la pieza cambia la reacción del maestro y guía a Sora.',
    C: 'Solo un reloj terminado se coloca cada tarde y el texto no sugiere que Sora cuestione esa práctica.',
    D: 'Los transeúntes miran las cajas pulidas; quien escucha el mecanismo es el relojero.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: el apagado coincide tanto con más llamadas de alimentación como con más polillas, mientras los mosquitos no cambian.',
    B: 'Antes de medianoche hubo tasas similares incluso con luces, y el texto no dice que desaparezcan todos los insectos.',
    C: 'Los mosquitos no cambiaron, de modo que no explican el aumento observado en los parques oscuros.',
    D: 'El estudio registra un cambio nocturno de conteos y no un crecimiento permanente de la población.',
  }, fuenteHecho: 'Estudio, parques y resultados inventados a partir de ecología urbana general.' },
]
