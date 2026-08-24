import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Information and Ideas · Set 3 M1 · q09–q15.
 *
 * Las claves A, C, B, D, A, C, B se reservaron en la matriz editorial antes de
 * redactar. Los datos de q13 son originales y se declaran como tales.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'On La Gomera, one of the Canary Islands, practitioners of Silbo Gomero reproduce spoken Spanish through whistles that travel effectively across the island’s deep ravines. The system does not preserve a separate whistle for every Spanish sound: two whistle types represent the five vowels, and four represent consonants. Differences in pitch and in whether a whistle is continuous or interrupted help listeners distinguish among them. Even with this compact set of signals, practiced whistlers can convey complete messages, and some local variations can indicate where a whistler is from.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Silbo Gomero recodes spoken Spanish with a small whistle inventory that still carries complex messages across La Gomera’s terrain.', 'Silbo Gomero preserves every Spanish vowel and consonant as a distinct whistle so that listeners never need contextual information.', 'Silbo Gomero is used mainly to identify a speaker’s home village and cannot convey ordinary messages across the island.', 'Silbo Gomero was designed for classroom instruction after spoken Spanish proved ineffective in the island’s schools.'],
    answer: 0,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'In acidic soil, phosphorus may be present in forms that chickpea roots cannot readily use. Researchers compared plants receiving soluble phosphorus, arbuscular mycorrhizal fungi (AMF), organic matter, phosphate rock, and combinations of those treatments. AMF colonize roots and extend fungal filaments into soil beyond the area reached by the roots alone. Yet neither AMF alone nor soluble phosphorus alone produced the strongest response. Plants receiving AMF together with organic matter and phosphate rock showed greater growth and acquisition of several mineral nutrients than plants receiving either single treatment. The result indicates that the fungi’s contribution can depend on the nutrient sources and soil conditions around them.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Soluble phosphorus by itself gave chickpeas the greatest access to minerals because roots absorbed it without fungal assistance.', 'AMF improved chickpea growth by lowering soil acidity, regardless of the nutrient source.', 'AMF’s benefit depended on treatment context; the combined treatment outperformed AMF or soluble phosphorus alone.', 'Organic matter made the fungi and both phosphorus sources unnecessary.'],
    answer: 2,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'After his mother died, Elian told the neighbors he would reopen her pottery workshop by spring. He drew a class schedule, repaired the door latch, and ordered new clay. Still, every Sunday he swept the entrance and then packed the tools away again. His friend Mara finally asked why he had left paper over the windows. “Once the light falls on her bench,” Elian said, “everyone will see that it is mine now.” He looked at the unopened box of clay and changed the date on his schedule to the following month.',
    text: 'Which quotation from the text best supports the claim that Elian delays reopening the workshop because doing so would make his mother’s absence feel final?',
    options: ['“Elian told the neighbors he would reopen her pottery workshop by spring”', '“Once the light falls on her bench, everyone will see that it is mine now.”', '“He drew a class schedule, repaired the door latch, and placed the order for new clay.”', '“every Sunday he swept the entrance and then packed the tools away again”'],
    answer: 1,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Some late-eighteenth- and early-nineteenth-century US postal maps did more than draw roads between post offices. Maps associated with postal clerk Abraham Bradley included charts listing stagecoach schedules along major post roads. Historian Renata Cole argues that this timing information made such maps useful to regional merchants: a route line showed where a letter could travel, but a schedule could help a merchant decide when an order had to be ready to leave on a particular mail coach.',
    text: 'Which finding, if true, would most strongly support Cole’s argument?',
    options: ['Surviving copies of one Bradley map use different colors to mark state boundaries that merchants already knew from other maps.', 'A later edition added several post offices but removed decorative elements that occupied space around the map’s title.', 'Travelers sometimes used the route lines to estimate road distance between towns, even when they ignored every time listed in the schedule chart.', 'After the chart circulated, account books set order cutoffs one hour before listed departures and labeled later orders “next mail.”'],
    answer: 3,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'Researchers planted three equally sized flower strips beside crop fields and recorded insects making contact with flowers during identical observation periods. The plant mixes differed in flowering-species richness. The counts below are invented for this question but follow the survey structure used in pollinator research.\n\nFlower strip · flowering species · bumble bees · hoverflies · other visitors\nBlue · 3 · 18 · 12 · 6\nGold · 5 · 27 · 14 · 9\nMixed · 7 · 24 · 25 · 13',
    text: 'Which choice most effectively uses data from the table to support the claim that greater flowering-species richness was associated with more total visits even though not every visitor group increased at every step?',
    options: ['Total visits rose from 36 in Blue to 50 in Gold and 62 in Mixed, while bumble-bee visits fell from 27 in Gold to 24 in Mixed.', 'Total visits increased by 14 from Blue to Gold and by 12 from Gold to Mixed, and each visitor group increased at both steps between the three strips.', 'Mixed received 62 total visits, which was greater than the combined total received by Blue and Gold.', 'Hoverfly visits rose by 13 from Blue to Mixed, exactly matching the increase in other visitors between those strips.'],
    answer: 0,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'While sorting their family’s letters, Celia placed every dated page in chronological order. An undated note remained on her desk even after she recognized the handwriting. Her sister Noor instead made folders labeled “journeys,” “harvests,” and “repairs.” When they found a 1962 letter describing an uncle’s arrival after a flood, Celia filed it between two letters from that summer. Noor copied its first line onto the folder holding letters about rebuilding, including one written decades later. By evening, each sister could answer questions that the other’s arrangement made difficult.',
    text: 'Which choice most logically completes the text?',
    options: ['Celia is less familiar with the family members than Noor is, since Celia cannot identify the writer of the undated note.', 'Noor believes the flood occurred decades later than Celia believes it did, since Noor groups letters from different years.', 'Celia’s system emphasizes sequence over subject, whereas Noor’s emphasizes connections among subjects across time.', 'Both sisters intend to replace the original letters with copies once they agree on a single filing system.'],
    answer: 2,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers video-recorded four adult Octopus insularis and distinguished two states with elevated arousal thresholds. During quiet sleep, the animals were generally pale and still, and episodes lasted a median of about 415 seconds. Active-sleep episodes lasted a median of about 41 seconds and included rapid changes in skin color and texture as well as eye and mantle movements. Active sleep followed quiet sleep in 82 percent of the observed transitions, and 60 percent of active-sleep recurrences were separated by 26 to 39 minutes.',
    text: 'Which conclusion is best supported by the text?',
    options: ['Because active sleep includes skin changes seen during waking, the octopuses must have been dreaming about events they had recently experienced.', 'The timing and usual sequence of active episodes suggest an organized sleep cycle rather than random waking movements.', 'Every quiet episode lasted exactly 415 seconds and ended in active sleep.', 'The four octopuses spent more total time in active sleep than in quiet sleep because active episodes recurred periodically.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: reúne la conversión del español, el inventario reducido de señales y su capacidad para comunicar mensajes a través del terreno.',
    B: 'El texto dice lo contrario: cinco vocales se representan con solo dos tipos de silbido y las consonantes con cuatro.',
    C: 'Las variaciones pueden indicar procedencia, pero el sistema también transmite mensajes completos; esa función no es la única.',
    D: 'La enseñanza ayuda a conservar el sistema, pero el pasaje no dice que se diseñara en la escuela ni que el habla fracasara.',
  }, fuenteHecho: 'UNESCO, “Whistled language of the island of La Gomera, the Silbo Gomero”: https://ich.unesco.org/en/RL/whistled-language-of-the-island-of-la-gomera-canary-islands-the-silbo-gomero-00172' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'El tratamiento soluble por sí solo no produjo la respuesta más fuerte; la combinación con hongos, materia orgánica y roca fosfórica lo superó.',
    B: 'El mecanismo descrito amplía el volumen de suelo explorado; no se afirma que los hongos reduzcan por sí solos la acidez.',
    C: 'Correcta: sintetiza el contraste experimental y la conclusión cauta de que el efecto depende de la combinación y del contexto del suelo.',
    D: 'La materia orgánica formó parte del tratamiento combinado; el texto no la presenta como sustituto de todos los demás insumos.',
  }, fuenteHecho: 'USDA Agricultural Research Service, estudio de AMF, materia orgánica y fuentes de fósforo en garbanzo: https://www.ars.usda.gov/research/publications/publication/?seqNo115=109644' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'Prueba que anunció una reapertura, pero no explica por qué posterga una intención que ya tenía.',
    B: 'Correcta: Elian vincula directamente la luz sobre el banco de su madre con que el taller pase a ser reconocido como suyo.',
    C: 'Muestra preparación práctica y por eso descarta falta de plan, pero no identifica el coste emocional de abrir.',
    D: 'Muestra repetición y aplazamiento, aunque no revela por sí sola qué pensamiento motiva esa conducta.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'El color de límites políticos no muestra que los horarios postales gobernaran una decisión comercial.',
    B: 'Describe una revisión cartográfica, pero no vincula la tabla de tiempos con la operación de un negocio.',
    C: 'Confirma que las líneas tenían otra utilidad para viajeros; no respalda la utilidad comercial específica de los horarios.',
    D: 'Correcta: une la circulación del horario con un cambio observable en el corte de pedidos y con la salida del siguiente correo.',
  }, fuenteHecho: 'National Postal Museum, “Bradley Postal Map”; el hallazgo comercial propuesto es hipotético: https://postalmuseum.si.edu/collections/object-spotlight/bradley-postal-map' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: 18+12+6=36, 27+14+9=50 y 24+25+13=62; a la vez, la caída de 27 a 24 demuestra que no todos los grupos suben en cada paso.',
    B: 'Los totales y sus diferencias son correctos, pero las visitas de abejorros bajan de Gold a Mixed.',
    C: 'Blue y Gold suman 86 visitas, no menos de las 62 registradas en Mixed.',
    D: 'Los sírfidos aumentan 13, pero los demás visitantes aumentan 7, de 6 a 13.',
  }, fuenteHecho: 'Diseño y datos originales; estructura de conteo basada en encuestas de flores y visitantes del USDA NRCS: https://www.nrcs.usda.gov/sites/default/files/2026-02/Assessing%20Plant%20and%20Pollinator%20Response%20to%20Practices%20Installed%20Through%20the%20New%20England%20Pollinator%20Partnership%20in%20Rhode%20Island%20and%20Connecticut%2C%202025.pdf' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Celia sí reconoce la letra; deja la nota fuera porque su sistema exige fecha, no por desconocer a la familia.',
    B: 'Agrupar por tema no cambia la fecha que Noor atribuye a la carta; conecta documentos de épocas distintas deliberadamente.',
    C: 'Correcta: Celia conserva el orden temporal y Noor reúne asuntos recurrentes, por lo que sus archivos responden preguntas distintas.',
    D: 'No planean destruir ni sustituir originales y el cierre subraya que mantienen sistemas diferentes, no que acuerden uno.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'La semejanza visual con la vigilia no permite identificar contenido mental ni demostrar sueños sobre experiencias recientes.',
    B: 'Correcta: la recurrencia dentro de una ventana y la transición frecuente desde sueño quieto apoyan una alternancia estructurada.',
    C: '415 segundos es una mediana, no una duración fija, y el 82 % deja transiciones con otra secuencia.',
    D: 'Los episodios activos son mucho más cortos; la periodicidad sola no demuestra que acumulen más tiempo total.',
  }, fuenteHecho: 'Medeiros et al., iScience (2021), “Cyclic alternation of quiet and active sleep states in the octopus”: https://doi.org/10.1016/j.isci.2021.102223' },
]
