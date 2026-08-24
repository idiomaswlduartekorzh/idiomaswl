import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Craft and Structure · Set 4 M2 estándar · q01–q08.
 * Claves reservadas: A, C, B, D, A, D, C, B.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Coral larvae drift through the water before choosing a surface on which to begin growing. In a restoration study, researchers placed conditioned tiles near a reef and later examined them under magnification. Several larvae had settled on the undersides of the tiles, where the young corals were less exposed to grazing fish and loose sediment. The team then tracked which settlers survived long enough to form multiple polyps.',
    text: 'As used in the text, what does the word "settled" most nearly mean?',
    options: ['Attached', 'Calmed', 'Concluded', 'Compensated'],
    answer: 0,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'Every evening, the reading room filled before Tomas arrived from his shift at the bakery. The librarian nevertheless kept the small table beside the atlas case reserved for him. She placed no sign on it and turned away curious visitors with a simple explanation: Tomas was copying the town’s oldest street map by hand, one square at a time. When he entered just before closing, his sharpened pencils were already waiting beside the lamp.',
    text: 'As used in the text, what does the word "reserved" most nearly mean?',
    options: ['Uncommunicative', 'Cautious', 'Set aside', 'Ceremonial'],
    answer: 2,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'A tide mill stored incoming seawater in a pond and released it through a wheel after the tide had fallen. In a reconstructed account book, the miller listed the grain ground during each release. A long spring tide yielded more flour than a short winter release, even when the same stones were used. The entries allowed a historian to compare the mill’s output across different tidal cycles without assuming that every day of operation was alike.',
    text: 'As used in the text, what does the word "yielded" most nearly mean?',
    options: ['Surrendered', 'Produced', 'Delayed', 'Allowed passage'],
    answer: 1,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'The eyes of some moths have arrays of structures smaller than visible wavelengths. Rather than creating a sharp optical boundary where much light is reflected, the structures make the transition between air and the eye more gradual. Engineers have replicated similar patterns on transparent polymers. Tests of the patterned materials show less reflection than tests of otherwise comparable smooth surfaces, suggesting uses in displays and optical sensors.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It identifies an optical problem in manufactured displays, rejects a biological explanation, and recommends brighter light sources.', 'It compares the eyesight of several moth species, ranks their sensitivity, and selects one species for conservation.', 'It describes a polymer defect, traces that defect to a manufacturing tool, and proposes removing the pattern.', 'It introduces a biological structure, explains how it affects light, and describes an engineered version with a related effect.'],
    answer: 3,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Some shipboard records survive in both a rough pencil log and a later fair copy in ink. The fair copy may preserve tables accurately while shortening descriptive observations from the rough version. An archive digitized both versions of several whaling logs after a comparison revealed such omissions. Keeping the pair allows researchers to identify which details were copied, condensed, or left out rather than treating the polished volume as a complete duplicate.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It explains the research value of preserving both versions after differences between them were found.', 'It argues that fair copies should replace rough logs because their tables contain fewer mistakes.', 'It identifies the type of ink that caused descriptive passages to disappear from the fair copies.', 'It suggests that researchers can reconstruct every omitted observation without consulting the rough logs.'],
    answer: 0,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'A community radio archive initially organized recordings only by program title and broadcast date. That system helped listeners find a known episode but not every appearance by a particular speaker. Archivists therefore added names, languages, and topics to the catalog record for each segment. A search for one storyteller could then retrieve an interview, a call-in contribution, and a festival recording filed under three different programs. The new description made connections across the collection visible without changing the recordings themselves.',
    text: 'Which choice best describes the function of the fourth sentence in the text as a whole?',
    options: ['It argues that all three recordings should have been broadcast under the same program title.', 'It explains why the archive removed dates from the original catalog records.', 'It shows that the storyteller recorded the same contribution three times for different audiences.', 'It exemplifies the cross-program link made discoverable by the added catalog fields.'],
    answer: 3,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nA new edition of a novelist’s draft should print her margin notes beside the passages they address. Readers can then see abandoned word choices and questions at the exact point where they influenced revision. Moving the notes to an appendix would separate evidence of composition from the sentences that prompted it.\n\nText 2\n\nMargin notes can illuminate revision, but placing every note beside the main text may interrupt a first reading of the novel. A clear edition can preserve the draft’s pages in facsimile and provide a linked appendix. Readers who want the compositional record can follow it, while others can encounter the narrative without constant editorial signals.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the proposal in Text 1?',
    options: ['By denying that margin notes provide any evidence about how a novelist revised', 'By agreeing that notes belong beside the text even if they make the narrative difficult to follow', 'By using a linked appendix to keep notes accessible without placing every one in the reading text', 'By recommending that the notes be discarded once a clean version of the novel is available'],
    answer: 2,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nAn acoustic detector recorded calls from the silver-haired bat at six forest sites where visual surveys had not found the species. Because each verified call establishes that a bat passed within detection range, the recordings expand the map of sites used by the species.\n\nText 2\n\nAcoustic records are valuable evidence of presence, but the number of recorded call sequences is not a direct count of bats. One individual may pass a detector repeatedly, and silent or distant bats may go unrecorded. Estimating abundance requires a survey design and model that address those possibilities.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 treats every call as an identification error, whereas Text 2 assumes every call belongs to a different species.', 'Text 1 uses calls to establish presence, whereas Text 2 warns that call totals do not directly measure abundance.', 'Text 1 relies on visual counts to estimate abundance, whereas Text 2 rejects acoustic monitoring at forest sites.', 'Text 1 claims that bats are silent at most sites, whereas Text 2 attributes all missing calls to equipment failure.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Correcta: las larvas se fijaron a la superficie y comenzaron allí su crecimiento como corales jóvenes.',
    B: 'Calmed describe una reducción de agitación o emoción; el pasaje se refiere a elegir y ocupar un sustrato.',
    C: 'Resolved significaría solucionar una disputa o tomar una decisión, pero no explica que los corales aparezcan sobre las baldosas.',
    D: 'Compensated significa indemnizar o equilibrar; no tiene relación con el ciclo de vida descrito.',
  }, fuenteHecho: 'NOAA, uso de baldosas para monitorear asentamiento y reclutamiento de coral: https://repository.library.noaa.gov/view/noaa/439/noaa_439_DS2.pdf' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'literatura', razones: {
    A: 'Uncommunicative puede describir a una persona reservada, pero aquí la mesa se mantiene disponible para alguien específico.',
    B: 'Cautious describe prudencia, pero la frase no caracteriza el comportamiento de Tomas ni de la bibliotecaria.',
    C: 'Correcta: la mesa fue apartada para Tomas y no se ofreció a los demás visitantes.',
    D: 'Ceremonial describe una función ritual o formal; no explica por qué otros lectores no podían usar la mesa.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'historia', razones: {
    A: 'Surrendered es ceder ante otra fuerza; la marea no recibe harina ni vence al molino.',
    B: 'Correcta: el ciclo largo produjo una cantidad mayor de harina.',
    C: 'Delayed indicaría que la molienda ocurrió más tarde, no que su resultado fue mayor.',
    D: 'Allowed passage podría describir la compuerta respecto del agua, pero el sujeto de yielded es la marea y el objeto es flour.',
  }, fuenteHecho: 'Cuenta y cifras implícitas originales, informadas por el funcionamiento general de molinos de marea.' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El texto acepta el modelo biológico y no propone aumentar el brillo de una fuente.',
    B: 'No compara especies ni trata conservación; pasa de una estructura natural a su réplica técnica.',
    C: 'El patrón es intencional y reduce reflejos; no se presenta como defecto que deba eliminarse.',
    D: 'Correcta: introduce la nanoestructura del ojo, explica la transición óptica y presenta polímeros que imitan su efecto antirreflectante.',
  }, fuenteHecho: 'Ko et al., Soft Matter, “Biomimetic microlens array with antireflective moth-eye surface”: https://doi.org/10.1039/C1SM05302G' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'historia', razones: {
    A: 'Correcta: la conclusión explica que conservar ambas versiones permite estudiar qué cambió durante la copia.',
    B: 'El archivo digitaliza también los borradores porque las copias limpias omiten contenido; no propone sustituirlos.',
    C: 'Las omisiones provienen del proceso de copia descrito, no de una reacción química de la tinta.',
    D: 'Precisamente se necesita el borrador para saber qué observaciones faltan en el volumen pulido.',
  }, fuenteHecho: 'Climate Research Unit, informe de digitalización: comparación de bitácoras preliminares y copias limpias con omisiones: https://a.storyblok.com/f/185167/x/e65753818a/cru-research-paper-17.pdf' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'humanidades', razones: {
    A: 'El ejemplo conecta programas distintos; no sostiene que deban cambiarse sus títulos históricos.',
    B: 'Las fechas se conservan y se amplían con nombres, lenguas y temas.',
    C: 'Se mencionan tres apariciones distintas del mismo narrador, no tres copias de una sola contribución.',
    D: 'Correcta: la búsqueda que une entrevista, llamada y festival muestra el tipo de relación que el nuevo índice descubre.',
  }, fuenteHecho: 'Archivo, programas, narrador y esquema descriptivo inventados.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'literatura', razones: {
    A: 'Text 2 acepta que las notas iluminan la revisión; discrepa sobre dónde presentarlas.',
    B: 'Text 2 rechaza colocar todas junto al texto porque pueden interrumpir una primera lectura.',
    C: 'Correcta: responde con facsímil y apéndice enlazado, preservando acceso sin insertar cada señal editorial en la narración.',
    D: 'Text 2 quiere conservar las notas y hacerlas consultables; no propone eliminarlas.',
  }, fuenteHecho: 'Ambos textos editoriales son originales.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Text 1 usa llamadas verificadas como evidencia de la especie; ninguno asigna cada llamada a una especie distinta.',
    B: 'Correcta: Text 1 delimita presencia y Text 2 explica por qué los conteos de llamadas no equivalen directamente a individuos.',
    C: 'Text 1 dice que los visuales no encontraron la especie y Text 2 defiende, con cautelas, el valor de los registros acústicos.',
    D: 'Ningún texto afirma silencio general ni atribuye todos los vacíos al aparato.',
  }, fuenteHecho: 'Loeb et al., US Forest Service, modelos de abundancia con monitoreo acústico y detección imperfecta: https://research.fs.usda.gov/treesearch/68049' },
]
