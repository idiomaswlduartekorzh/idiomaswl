import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Craft and Structure · Set 3 M2 exigente · q01–q08. Claves: B, D, A, C, D, B, C, A. */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'An acoustic panel does not necessarily reduce every sound by the same amount. Its cavities and surface materials can interact strongly with waves in one range of frequencies but weakly with waves outside that range. In a test room, one panel attenuated the low hum produced by a ventilation fan while leaving higher-pitched speech comparatively clear. A second panel, built differently, had the opposite pattern.',
    text: 'As used in the text, what does the word “attenuated” most nearly mean?',
    options: ['Synchronized', 'Weakened', 'Measured', 'Redirected'],
    answer: 1,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'Before leaving the island, Nera had promised her brother that she would return before the first winter storm. Months later, she unfolded his latest letter and read that the harbor wall had been damaged. “Before the storm, then,” she said, but qualified the promise in the margin: she would come as soon as the ferry captain declared the crossing safe. She underlined the final word twice.',
    text: 'As used in the text, what does the word “qualified” most nearly mean?',
    options: ['Praised', 'Fulfilled', 'Explained', 'Limited'],
    answer: 3,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'A curator studying a cloth bag could see only scattered brown marks where an inscription had faded. The imaging team photographed the surface under several wavelengths and adjusted the virtual direction of illumination. Although an ordinary color image failed to register a complete word, another image separated the remaining ink from the weave well enough for the curator to decipher part of the inscription.',
    text: 'As used in the text, what does the word “register” most nearly mean?',
    options: ['Capture', 'Enroll', 'Recognize', 'Announce'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'A regional archive described recordings with standardized fields for date, format, and location. Community reviewers noted, however, that a single official place-name could conceal how speakers distinguished nearby fishing grounds. The archive therefore added a field for names used by contributors without deleting the standardized location. A search for “North Bank” now retrieves recordings cataloged under the official bay name as well as recordings whose speakers use North Bank in their descriptions.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It argues that the archive should replace every standardized location with whichever local name an individual contributor happens to prefer.', 'It introduces a recording whose date and format could not be entered in the archive’s existing fields.', 'It illustrates how the added field makes community terminology useful in searches for recordings while retaining standardized metadata.', 'It shows that contributors use North Bank and the official bay name to refer to entirely different regions.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Northern permafrost stores carbon from plants and animals that decomposed only slowly while the ground remained frozen. When thaw extends through more of the soil, microbes can remain active longer and convert some of that material into carbon dioxide or methane. Field measurements help researchers estimate when and where gases are released, while models test how additional atmospheric warming could promote further thaw. The amount and timing of future release remain uncertain because soil moisture, vegetation, and local freeze-thaw patterns vary widely.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It reports that one field measurement disproved earlier estimates of the total carbon stored in northern soils.', 'It compares two gases, argues that methane is harmless, and recommends measuring only carbon dioxide.', 'It presents thaw as a fully quantified process and then identifies the single variable responsible for all remaining uncertainty.', 'It identifies stored carbon, explains how thaw can create feedback, and closes with measurements, models, and uncertainties.'],
    answer: 3,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Conservators examining a heavily used legal manuscript found several generations of repair. Some thick paper mends had stiffened the edges of pages and caused new breaks, so those mends could not simply remain in place. Yet the team documented the old materials before removing unstable portions and used thin, reversible repairs where support was still needed. By distinguishing original sewing holes from later ones, the conservators could stabilize the volume without erasing evidence that it had been rebound more than once.',
    text: 'Which choice best describes the function of the reference to original and later sewing holes?',
    options: ['It proves that the manuscript’s legal text was written by several different scribes working at the same time.', 'It gives an example of physical evidence that conservators use to reconstruct the manuscript’s repair history and guide treatment.', 'It explains why reversible repair materials are always stronger than the original parchment or paper.', 'It establishes that every old mend was stable enough to remain untouched during conservation.'],
    answer: 1,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nA museum app can help visitors navigate a large collection by learning from the works they save. If someone repeatedly chooses geometric prints, the app can recommend related objects in distant galleries that the visitor might otherwise miss. Personalization turns an overwhelming catalog into a practical route and gives less familiar works a way to reach an interested audience.\n\nText 2\n\nPersonalized routes can be useful, but a visitor’s first few selections provide a narrow picture of what might engage that person. If every later recommendation resembles those selections, the route can reinforce an accidental starting preference. Curators should therefore place some deliberately dissimilar works into personalized routes, preserving opportunities for encounters that neither the visitor nor the algorithm predicted.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the approach described in Text 1?',
    options: ['By rejecting digital navigation because visitors should encounter works only in the order chosen by a curator', 'By agreeing that saved works reveal every interest a visitor could develop during a single museum visit', 'By accepting personalization as useful while arguing that curated departures can prevent early choices from narrowing the route', 'By claiming that unfamiliar works can reach an audience only when an app recommends objects nearly identical to those already saved'],
    answer: 2,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nCities can reduce heat around streets and buildings by expanding tree canopy. Leaves intercept sunlight, and water moving through trees supports evaporative cooling. Because shaded walls and roofs absorb less heat, well-placed trees can also reduce demand for air conditioning. These combined effects make canopy expansion a central heat-mitigation strategy.\n\nText 2\n\nCanopy targets should account for the conditions that keep trees alive. In drought-prone neighborhoods, paved soil and restricted rooting space can limit available water just when cooling is most needed. Cities may achieve more durable shade by pairing planting with permeable soil, selecting drought-tolerant species, and budgeting water for establishment rather than counting every planted tree as equivalent future canopy.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 emphasizes cooling from trees, whereas Text 2 emphasizes the water and site conditions required to sustain canopy under drought.', 'Text 1 attributes cooling only to irrigation, whereas Text 2 denies that trees require water during establishment.', 'Text 1 recommends drought-tolerant species instead of shade trees, whereas Text 2 opposes selecting species for local conditions.', 'Text 1 focuses on preventing stormwater runoff, whereas Text 2 argues that paved soil always provides sufficient rooting space.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El panel no hace que el zumbido y el habla adopten una frecuencia o ritmo común.',
    B: 'Correcta: el zumbido queda reducido mientras el habla más aguda permanece relativamente clara.',
    C: 'El ensayo mide el efecto, pero attenuated describe lo que el panel hizo al sonido, no la medición.',
    D: 'Un panel puede redirigir energía, pero el contraste del pasaje es cuánto reduce cada banda.',
  }, fuenteHecho: 'NIST, transmisión y absorción de sonido por paneles en distintas bandas: https://nvlpubs.nist.gov/nistpubs/ScientificPapers/nbsscientificpaper526vol21p37_A2b.pdf' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Nera no elogia su promesa; añade una condición que restringe cuándo puede cumplirla.',
    B: 'La promesa todavía se refiere a una acción futura y no ha sido cumplida.',
    C: 'La nota aporta una explicación práctica, pero la función de qualified es limitar el compromiso original.',
    D: 'Correcta: sustituye el plazo absoluto por uno condicionado a que el cruce sea declarado seguro.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: la imagen ordinaria no captó una palabra completa, aunque otra técnica sí distinguió el resto de la tinta.',
    B: 'Enroll significa inscribir oficialmente a una persona o cosa en una lista, no formar una imagen de tinta.',
    C: 'La cámara no reconoce conscientemente una palabra; registra información visual para que la interprete el curador.',
    D: 'La imagen no anuncia la inscripción a una audiencia; conserva una señal visual de ella.',
  }, fuenteHecho: 'Smithsonian, técnicas fotográficas para descifrar inscripciones desvanecidas: https://repository.si.edu/server/api/core/bitstreams/88e1f74f-7db8-44fa-be3c-205ef6641602/content' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'humanidades', razones: {
    A: 'El archivo conserva la ubicación estandarizada y añade terminología comunitaria; no reemplaza todos los nombres oficiales.',
    B: 'La oración final describe recuperación por búsqueda, no un problema con fecha o formato de una grabación.',
    C: 'Correcta: muestra el beneficio concreto del nuevo campo sin sacrificar la normalización previa.',
    D: 'North Bank aparece como nombre comunitario de un área dentro de la bahía catalogada, no como región totalmente distinta.',
  }, fuenteHecho: 'Archivo, comunidad, bahía y ejemplo de búsqueda inventados.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'ciencia', razones: {
    A: 'No hay una medición única que refute el tamaño del reservorio; se explican fuentes complementarias de evidencia.',
    B: 'El texto no llama inocuo al metano ni propone excluirlo de las mediciones.',
    C: 'La liberación futura se presenta como incierta y dependiente de varias condiciones locales.',
    D: 'Correcta: pasa de carbono almacenado a descomposición y calentamiento adicional, y luego a medición, modelado e incertidumbre.',
  }, fuenteHecho: 'NASA Earth Observatory, ciclo del carbono y liberación potencial desde permafrost: https://science.nasa.gov/earth/earth-observatory/the-carbon-cycle/' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'Los agujeros pertenecen a encuadernaciones y no identifican cuántos escribas produjeron el texto.',
    B: 'Correcta: distinguir generaciones de costura revela intervenciones anteriores y orienta una estabilización que conserva evidencia.',
    C: 'La reversibilidad permite retirar un tratamiento, pero el texto no afirma superioridad mecánica universal.',
    D: 'Algunos mends habían causado roturas nuevas y por eso no podían dejarse todos intactos.',
  }, fuenteHecho: 'Library of Congress, reparaciones, agujeros de costura e historia material de manuscritos: https://blogs.loc.gov/loc/2014/09/conservation-corner-a-persian-manuscript/' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 acepta que las rutas personalizadas pueden ser útiles y propone complementarlas, no abolir lo digital.',
    B: 'Text 2 sostiene que las primeras elecciones son una imagen estrecha, no un inventario completo de intereses.',
    C: 'Correcta: preserva utilidad de recomendaciones y añade obras disímiles para evitar un circuito de preferencia accidental.',
    D: 'La propuesta de Text 2 es introducir disimilitud; no exige identidad con lo ya guardado.',
  }, fuenteHecho: 'Aplicación, museo y ambos argumentos inventados.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: uno establece beneficios térmicos y el otro condiciona su persistencia a agua, suelo y selección de especies.',
    B: 'Text 1 menciona sombra y evapotranspiración, y Text 2 sí reconoce agua necesaria durante establecimiento.',
    C: 'Text 1 no prescribe especies; Text 2 recomienda escogerlas según sequía y sitio.',
    D: 'Text 1 trata calor y edificios; Text 2 dice que el pavimento puede limitar, no garantizar, espacio y agua.',
  }, fuenteHecho: 'US EPA, beneficios térmicos de árboles y vegetación, y consideraciones de agua urbana: https://www.epa.gov/heatislands/benefits-trees-and-vegetation' },
]
