import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Craft and Structure · Set 5 M1 · q01–q08.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves C, A, D, B, C, D, A, B
 * fueron reservadas antes de redactar y dejan dos respuestas por letra en el bloque.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Red blood cells absorb light, so their presence in circulating blood usually limits a vertebrate’s transparency. When northern glassfrogs sleep, however, most of these cells stop circulating and become concentrated in the liver. With fewer red blood cells moving through the rest of the body, the frogs transmit more visible light. After the frogs wake, the stored cells reenter circulation.',
    text: 'As used in the text, what does the word "concentrated" most nearly mean?',
    options: ['Made more intense', 'Examined closely', 'Gathered within a limited area', 'Replaced with another substance'],
    answer: 2,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'After a touring production closed, Mara removed the temporary silver braid she had sewn onto the captain’s coat. The coat now looked as it had before the tour, but Mara still used one line in her property ledger to register the alteration. She knew that a later designer might otherwise mistake a photograph of the silver trim for evidence of the coat’s original appearance.',
    text: 'As used in the text, what does the word "register" most nearly mean?',
    options: ['Record', 'Notice emotionally', 'Enroll officially', 'Align precisely'],
    answer: 0,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'Haudenosaunee people used patterned belts of shell beads in diplomatic relationships. A belt exchanged during an agreement did not reproduce every spoken statement. Instead, its arrangement of figures, lines, and colors embodied commitments that speakers explained and later recalled in council. The object therefore worked together with oral knowledge rather than replacing it with a complete written transcript.',
    text: 'As used in the text, what does the word "embodied" most nearly mean?',
    options: ['Concealed from outsiders', 'Made legally invalid', 'Reduced to a simpler claim', 'Represented in material form'],
    answer: 3,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'Protactile communication organizes interaction through touch rather than treating touch as a substitute for information normally seen. Both participants contribute to the tactile exchange. For example, while one person communicates a message, the other can tap or press the speaker’s arm to signal attention, agreement, surprise, or a question. This feedback allows a response to occur without waiting for the speaker to finish. Reciprocity is thus built into the channel of communication itself.',
    text: 'Which choice best describes the function of the third sentence in the text as a whole?',
    options: ['It identifies a situation in which tactile communication must be replaced by a visual signal.', 'It illustrates how a listener can provide feedback through the same tactile interaction.', 'It argues that every Protactile user assigns exactly the same meaning to each kind of touch.', 'It explains why a speaker must complete an entire message before a listener can respond.'],
    answer: 1,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Some elephant calls produce low-frequency vibrations that travel through the ground. To test whether wild elephants respond to such seismic information, researchers converted recorded vibrations into signals that could be played through the soil. The team presented vibrations associated with elephants as well as vibrations associated with human activity and then compared the animals’ behavior. The elephants responded differently to the two signal types, supporting the conclusion that they can discriminate between seismic cues.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It describes two competing theories of elephant hearing and dismisses both after reviewing earlier studies.', 'It lists several elephant calls and ranks them according to the distance at which people can hear them.', 'It introduces a possible sensory channel, describes a playback test, and reports evidence of discrimination.', 'It presents an unexpected field observation and argues that it resulted from a flaw in the recording equipment.'],
    answer: 2,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'In 1869, the Allegheny Observatory began sending astronomically determined time to railroad lines by telegraph. The service expanded as railroads and cities sought a shared reference for setting clocks. Observatory records from 1887 even preserve complaints from railroads that failed to receive a scheduled signal. Such complaints show that the signals had become part of routine coordination, not merely a demonstration of telegraph technology.',
    text: 'Which choice best describes the function of the third sentence in the text as a whole?',
    options: ['It suggests that railroad clocks were more accurate before the observatory began its service.', 'It introduces evidence that the observatory intentionally stopped transmitting signals in 1887.', 'It explains how railroad employees used astronomical instruments to calculate time themselves.', 'It provides archival evidence that railroads had come to depend on receiving the time signals.'],
    answer: 3,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nPeople who recognize an unidentified place or person in a digitized photograph can supply knowledge that a museum catalog lacks. Curators should add these identifications to the catalog promptly; delaying until every detail has formal documentation may leave useful community knowledge invisible.\n\nText 2\n\nCommunity identifications can give curators valuable leads, particularly when official records are sparse. Yet a plausible name should remain labeled as a suggestion until it is corroborated by another photograph, a dated record, or a source whose connection to the subject is known. A catalog should show both the contribution and its current level of certainty.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the recommendation in Text 1?',
    options: ['By agreeing that community knowledge is useful but arguing that uncorroborated identifications should be marked as provisional', 'By arguing that community members should identify objects but never people or places in museum photographs', 'By agreeing that every suggested identification should immediately replace the catalog’s existing description', 'By arguing that museums should reject contributions unless volunteers have professional archival training'],
    answer: 0,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nMicrofragmentation divides a coral colony into small pieces that are grown and later attached to a reef. In one comparison, such fragments showed more reliable early survival and growth than young corals produced from larvae. For projects seeking predictable establishment at a particular site, those early results favor the fragment-based method.\n\nText 2\n\nCorals raised from sexually produced larvae may vary more in their early performance than cloned fragments do. That variation, however, reflects genetic diversity that an asexual method cannot create. A restoration program concerned with the capacity of future coral populations to respond to change should therefore include larval propagation among its tools.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 claims that coral fragments create more genetic diversity, whereas Text 2 claims that larvae are genetically identical.', 'Text 1 emphasizes predictable early establishment, whereas Text 2 emphasizes a longer-term benefit of genetic diversity.', 'Text 1 examines coral restoration in the ocean, whereas Text 2 argues that corals can survive only in laboratories.', 'Text 1 recommends combining both propagation methods, whereas Text 2 rejects the use of fragments under all conditions.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Concentrated puede significar intensificado, pero el pasaje describe dónde se reúnen las células, no un aumento de su intensidad.',
    B: 'La acepción de prestar atención no encaja con una oración que contrasta circulación corporal y almacenamiento hepático.',
    C: 'Correcta: las células dejan de circular y se reúnen dentro de una zona limitada, el hígado.',
    D: 'Las células vuelven a la circulación cuando la rana despierta; el texto no dice que otra sustancia las reemplace.',
  }, fuenteHecho: 'Taboada et al., Science, “Glassfrogs conceal blood in their liver to maintain transparency”: https://doi.org/10.1126/science.abl6620' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: Mara anota o registra en el inventario una modificación física que ya no puede verse en el abrigo.',
    B: 'Register puede aludir a percibir algo, pero la línea del inventario es un registro deliberado, no una reacción emocional.',
    C: 'Nadie se inscribe en una organización o actividad; el objeto de register es una alteración del vestuario.',
    D: 'La acción no coloca piezas en una posición exacta: conserva información histórica sobre el objeto.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'El pasaje explica el papel público y diplomático del diseño; no afirma que su propósito fuera ocultar compromisos.',
    B: 'El cinturón acompaña el acuerdo y la memoria oral; embodied no significa que lo anule.',
    C: 'Que el objeto no transcriba cada palabra no implica que simplifique o reduzca el compromiso.',
    D: 'Correcta: el patrón de cuentas daba una forma material a compromisos explicados y recordados oralmente.',
  }, fuenteHecho: 'Smithsonian National Museum of the American Indian, guía Haudenosaunee y cinturones de wampum diplomáticos: https://americanindian.si.edu/sites/1/files/pdf/education/HaudenosauneeGuide.pdf' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El ejemplo permanece dentro del canal táctil; no introduce una señal visual ni una necesidad de reemplazo.',
    B: 'Correcta: la tercera oración concreta la reciprocidad al mostrar cómo quien escucha responde táctilmente mientras recibe el mensaje.',
    C: 'El ejemplo enumera posibles funciones, pero no afirma que cada toque tenga un significado universal e invariable.',
    D: 'La oración muestra precisamente que la retroalimentación puede ocurrir antes de que termine el turno de quien habla.',
  }, fuenteHecho: 'Edwards et al., “The Grammatical Incorporation of Demonstratives in an Emerging Tactile Language”: https://pmc.ncbi.nlm.nih.gov/articles/PMC7838441/' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'El pasaje presenta una hipótesis comprobable y un experimento, no dos teorías que después descarte.',
    B: 'Las vibraciones se reproducen por el suelo y no se ordenan llamadas según audibilidad humana.',
    C: 'Correcta: parte del canal sísmico posible, explica la comparación experimental y cierra con el hallazgo de discriminación.',
    D: 'No se informa una avería; el equipo de reproducción es parte planificada del método.',
  }, fuenteHecho: 'Mortimer et al., “Noise matters: elephants show risk-avoidance behaviour in response to human-generated seismic cues”: https://pmc.ncbi.nlm.nih.gov/articles/PMC8242925/' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'El reclamo por una señal ausente no compara la exactitud de relojes anteriores con los del servicio.',
    B: 'Las quejas se deben a una falla de recepción; no prueban que el observatorio cancelara deliberadamente el sistema.',
    C: 'La hora se determinaba en el observatorio y se transmitía por telégrafo; la oración no asigna el cálculo a empleados ferroviarios.',
    D: 'Correcta: que los ferrocarriles reclamaran una señal faltante es evidencia concreta de que ya dependían de recibirla.',
  }, fuenteHecho: 'University of Pittsburgh Library System, Guide to the Allegheny Observatory Records, 1850–1977, incluidos reclamos ferroviarios de 1887: https://digital.library.pitt.edu/islandora/object/pitt%3AUS-PPiU-uarg51/viewer' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Correcta: Text 2 reconoce el valor de las contribuciones, pero pide mostrar como provisional aquello que todavía no tiene corroboración.',
    B: 'Text 2 menciona nombres y no prohíbe identificar personas o lugares; su criterio es el grado de evidencia.',
    C: 'Text 2 rechazaría reemplazar de inmediato la descripción porque exige conservar visible el nivel de certeza.',
    D: 'La segunda voz valora el conocimiento comunitario y no condiciona su aporte a credenciales profesionales.',
  }, fuenteHecho: 'Textos curatoriales originales informados por el proyecto participativo Communities & Crowds del Science Museum Group: https://journal.sciencemuseum.ac.uk/article/communities-and-crowds/' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'La reproducción sexual, no la clonación por fragmentos, es la que aporta diversidad genética en estos textos.',
    B: 'Correcta: Text 1 prioriza supervivencia y crecimiento iniciales previsibles; Text 2 destaca diversidad relevante para respuestas futuras.',
    C: 'Ambos textos hablan de métodos aplicados a restauración de arrecifes y ninguno limita la supervivencia al laboratorio.',
    D: 'Text 1 favorece fragmentos para un objetivo específico, pero no prescribe la combinación; Text 2 incluye larvas sin prohibir fragmentos.',
  }, fuenteHecho: 'Jurriaans et al., Restoration Ecology, comparación primaria entre microfragmentos y corales de propagación sexual: https://doi.org/10.1111/rec.70358' },
]
