import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Craft and Structure · Set 3 M1 · q01–q08.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves B, D, A, C, B, A, D, C
 * fueron reservadas antes de redactar y dejan dos respuestas por letra en el bloque.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'At room temperature, an engineer bent a thin strip of shape-memory alloy into a tight hook and released it. The strip held the hooked form even after the force was removed. When the engineer warmed the metal above its transition temperature, however, it straightened into the form in which it had originally been trained. Cooling the strip did not undo that change. In this one-way effect, heat returned the alloy to a form that deformation had only temporarily hidden.',
    text: 'As used in the text, what does the word "held" most nearly mean?',
    options: ['Supported', 'Retained', 'Conducted', 'Hosted'],
    answer: 1,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'Mina had inherited her uncle’s field guide but had never opened it, assuming that a newer edition would be more useful. When she finally turned its pages, she found small pencil marks beside certain plants: a check by the mint he grew near the kitchen, a question beside a fern he never identified, and a date next to the first spring flower. Each mark was a trace of a choice he had made outdoors. The aging book did not merely name plants; it preserved the path of his attention.',
    text: 'As used in the text, what does the word "trace" most nearly mean?',
    options: ['An outline', 'A route', 'A quantity', 'A remnant'],
    answer: 3,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'In 1822, an optical telegraph line began operating between Portsmouth and the British Admiralty, a distance of about 108 kilometers. At each station, operators viewed the neighboring tower through a telescope and copied the positions of two movable arms. Clear weather allowed a coded message to cross the whole line in roughly fifteen minutes. Compared with sending a rider along the roads, the chain of visible signals compressed the time required for official news to reach London.',
    text: 'As used in the text, what does the word "compressed" most nearly mean?',
    options: ['Shortened', 'Encoded', 'Crowded', 'Summarized'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'A museum’s audio description can identify an object’s color, relative position, and historical setting without requiring a visitor to see it. A tactile replica offers different information: a visitor can examine the object’s contour, scale, and surface through touch. Some Smithsonian galleries pair recorded descriptions with raised drawings or replicas rather than treating either feature as complete by itself. Used together, the two channels reveal qualities of the same object that neither channel communicates as fully alone.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It argues that tactile replicas should reproduce every detail mentioned in an audio description.', 'It explains why a visitor should finish an audio description before touching a replica.', 'It explains how audio and touch can provide different but complementary information.', 'It suggests that audio descriptions work best when the original object may be handled.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Street trees cool urban spaces through two related mechanisms. Their canopies block sunlight before it reaches walls and pavement, directly reducing the heat those surfaces absorb. Their leaves also release water vapor; the evaporation uses heat from the surrounding air. A sensor aimed at pavement records the effect of shade more directly, while air-temperature sensors placed both beneath and beyond a canopy can better capture the combined effects. A study that measures only one location may therefore miss part of the cooling process.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It compares two cooling interventions, identifies a cost shared by both, and recommends the less expensive one.', 'It presents a shared outcome, distinguishes two mechanisms that produce it, and relates that distinction to measurement.', 'It traces a seasonal change in tree growth, questions the evidence for that change, and proposes a new experiment.', 'It reports an unexpected temperature result, rejects the instruments used to obtain it, and substitutes a visual estimate.'],
    answer: 1,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'The 1884 international conference that selected Greenwich as the prime meridian is sometimes credited with bringing standard time to daily life in the United States. Railroads had already acted, however. On November 18, 1883, they implemented a coordinated railway-time system, and many cities soon set public clocks by it. The conference helped establish an international reference, but it did not initiate the American practice. Congress did not give the national system statutory recognition until 1918, decades after rail schedules and local clocks had begun using it.',
    text: 'Which choice best describes the function of the information about Congress in the text as a whole?',
    options: ['It distinguishes the system’s later legal recognition from its earlier practical adoption.', 'It shows that most cities resisted railway time until Congress required its use.', 'It identifies Congress, rather than the railroads, as the designer of the coordinated system.', 'It explains why the international conference postponed choosing a prime meridian.'],
    answer: 0,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nWhen a civic hall has accumulated mismatched additions, restoration should recover the earliest complete design that can be documented. Removing a later stair tower or altered roofline can restore the proportions that made the original building intelligible. Keeping every alteration may preserve chronology, but it can leave visitors unable to perceive the work that first gave the building its significance.\n\nText 2\n\nA building’s later changes are evidence, not merely interference. International conservation principles allow removal only after the significance of each period has been assessed; they do not presume that the earliest design deserves priority. A careful restoration asks what history an addition carries before deciding whether visual unity is worth its loss.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the recommendation in Text 1?',
    options: ['By agreeing that the earliest design should control whenever plans for it survive', 'By agreeing only if every removed addition can later be reconstructed from records', 'By rejecting the removal of any alteration, regardless of its quality or significance', 'By questioning whether later additions should be removed before their historical value is assessed'],
    answer: 3,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nAfter wolves returned to Yellowstone, elk numbers and browsing patterns changed, and young willows grew taller in parts of the park’s northern range. This sequence supports a trophic-cascade explanation: wolves altered pressure from elk, allowing woody plants to recover.\n\nText 2\n\nWolves have contributed to changes in Yellowstone’s elk and vegetation, but the size of that contribution remains disputed. Precipitation, stream conditions, human hunting, and other predators also changed during the period when willow growth improved. Because these influences were not held constant, the vegetation trend cannot securely be assigned to wolves alone.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 questions whether willow growth improved, whereas Text 2 treats the improvement as established.', 'Text 1 focuses on changes in elk behavior, whereas Text 2 considers only changes in elk abundance.', 'Text 1 interprets the pattern mainly as a wolf-driven cascade, whereas Text 2 emphasizes limits on assigning it to one cause.', 'Text 1 presents the wolf return as a controlled experiment, whereas Text 2 presents a second controlled experiment.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Supported toma hold como sostener físicamente una carga, pero el texto dice que la tira conserva una forma aun después de retirar la fuerza.',
    B: 'Correcta: held significa que la tira retuvo la forma de gancho hasta que el calor la devolvió a la forma entrenada.',
    C: 'Conducted aplica una acepción ligada a transmitir calor o electricidad; la frase describe la forma que permanece, no energía que circula.',
    D: 'Hosted significa albergar una actividad o entidad; una pieza metálica no alberga el gancho, sino que mantiene esa geometría.',
  }, fuenteHecho: 'NASA, “Memory Metals are Shaping the Evolution of Aviation” y actividad sobre nitinol: https://www.nasa.gov/aeronautics/memory-metals-are-shaping-the-evolution-of-aviation/' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Outline es el contorno dibujado de una figura; las marcas no delinean a la persona ni a las plantas.',
    B: 'Route es el trayecto que alguien sigue. La última oración habla de un path metafórico, pero cada marca individual es evidencia que queda de una decisión.',
    C: 'Quantity es la acepción matemática de una cantidad mínima o trace amount; el contexto no mide cuánto lápiz o cuánta escritura hay.',
    D: 'Correcta: cada marca es un resto o señal sobreviviente de una elección del tío de Mina al usar el libro en el campo.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: la comparación con un mensajero a caballo muestra que la red acortó el tiempo de transmisión.',
    B: 'Encoded describe convertir el mensaje en señales, algo que también ocurría, pero la frase tiene por objeto el tiempo requerido, no el contenido.',
    C: 'Crowded significa apretar elementos dentro de un espacio; no se acumularon minutos ni estaciones en un intervalo físico.',
    D: 'Summarized sería reducir la extensión del mensaje. El texto sostiene que viajaba más rápido, no que se enviara una versión abreviada.',
  }, fuenteHecho: 'Science Museum Group, colección de la línea de semáforo Portsmouth–Admiralty: https://collection.sciencemuseumgroup.org.uk/documents/aa110108752' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'La oración no exige duplicación completa; afirma que cada canal revela cualidades distintas y por eso se complementan.',
    B: 'No establece una secuencia de uso. Audio y tacto se presentan como canales combinables, no como pasos obligatorios.',
    C: 'Correcta: sintetiza la comparación explicando que descripción y tacto aportan información diferente sobre el mismo objeto.',
    D: 'El texto habla de réplicas y dibujos elevados precisamente cuando el original no se toca; no condiciona la utilidad del audio al manejo del objeto.',
  }, fuenteHecho: 'Smithsonian, “Tactile Elements and Accessible Exhibition Features” y “Audio and Visual Description”: https://americanhistory.si.edu/visit/accessibility/tactile-elements-and-accessible-exhibition-features' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Sombra y evapotranspiración no se presentan como intervenciones rivales ni se comparan costes; son mecanismos simultáneos de los árboles.',
    B: 'Correcta: parte del enfriamiento, separa sombra y evaporación, y usa esa diferencia para explicar qué captan distintos sensores.',
    C: 'No hay estaciones ni crecimiento del árbol, y la evidencia no se cuestiona; se explica cómo medir dos mecanismos.',
    D: 'No aparece un resultado inesperado ni se rechazan sensores. El texto pide combinar ubicaciones de medición.',
  }, fuenteHecho: 'US EPA, “Benefits of Trees and Vegetation”: https://www.epa.gov/heatislands/benefits-trees-and-vegetation' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: 1918 marca el reconocimiento jurídico, mientras 1883 muestra que ferrocarriles y ciudades ya habían adoptado la práctica.',
    B: 'La mayoría de ciudades siguió el sistema ferroviario mucho antes de 1918; la frase no describe resistencia hasta una obligación federal.',
    C: 'El pasaje atribuye explícitamente la implementación de 1883 a los ferrocarriles, no al Congreso posterior.',
    D: 'La conferencia ocurrió en 1884 y sí eligió meridiano; la fecha de 1918 no explica una demora inexistente en esa decisión.',
  }, fuenteHecho: 'NIST, “A Walk Through Time — World Time Scales”: https://www.nist.gov/pml/time-and-frequency-division/popular-links/walk-through-time/walk-through-time-world-time-scales' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 niega que la documentación de la fase inicial baste para darle prioridad; exige valorar también las capas posteriores.',
    B: 'La posibilidad de reconstrucción futura no es el criterio de Text 2. Su pregunta es qué significado histórico se perdería ahora.',
    C: 'Text 2 no prohíbe toda remoción: dice que debe decidirse después de evaluar la importancia de cada periodo.',
    D: 'Correcta: respondería que la unidad visual no justifica retirar de antemano añadidos cuyo valor histórico aún no se ha evaluado.',
  }, fuenteHecho: 'ICOMOS, Carta de Venecia y textos doctrinales oficiales: https://www.icomos.org/charters-and-doctrinal-texts/' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Ambos textos aceptan que hubo mejora en el crecimiento de sauces; discrepan sobre cuánto explica el regreso del lobo.',
    B: 'Text 2 menciona cambios tanto en número como en influencia de los alces y añade otros factores; no se limita a abundancia.',
    C: 'Correcta: Text 1 usa la secuencia como apoyo principal de una cascada, mientras Text 2 advierte que varios cambios concurrentes impiden aislar una sola causa.',
    D: 'Ningún texto llama experimento controlado a la reintroducción; Text 2 subraya justamente que las demás variables no se controlaron.',
  }, fuenteHecho: 'National Park Service, Yellowstone “Cycles and Processes — Trophic Cascade”: https://www.nps.gov/yell/learn/nature/cyclesprocesses.htm' },
]
