import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Craft and Structure · Set 4 M2 exigente · q01–q08. Claves: B, D, A, C, D, B, C, A. */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Plant roots can quickly use much of the available phosphorus in the soil immediately surrounding them. Some arbuscular mycorrhizal fungi form fine hyphae that extend beyond this depleted zone. The fungi take up phosphate through those hyphae and transfer part of it to the plant. In exchange, the plant supplies the fungi with carbon compounds. The partnership therefore allows the plant to acquire phosphorus from a larger volume of soil than its roots alone contact.',
    text: 'As used in the text, what does the word "acquire" most nearly mean?',
    options: ['Measure', 'Collect', 'Release', 'Deplete'],
    answer: 1,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'An oral historian asked Mara when the neighborhood market had moved, but Mara answered only that the change happened long ago. The historian then asked what Mara could hear from her bedroom before the move. That question elicited a precise memory: delivery carts rattled over the stones at four each morning. The sensory prompt produced a detail that the first request for a date had not.',
    text: 'As used in the text, what does the word "elicited" most nearly mean?',
    options: ['Set aside', 'Argued against', 'Made routine', 'Brought out'],
    answer: 3,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'In the 1850s, an electric master clock at the Royal Observatory sent regular impulses to connected dials and time-signal equipment. A technician adjusted the master clock’s pendulum to regulate the interval between impulses. If the interval drifted, every dependent display could show the error. The adjustment was thus concerned with the pace of the mechanism, not with changing the appearance of the public dials.',
    text: 'As used in the text, what does the word "regulate" most nearly mean?',
    options: ['Control its rate', 'Approve it legally', 'Identify its maker', 'Make it uniform'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'A sequence of unusually narrow pine rings suggested that a mountain valley experienced several dry years before written weather records began. Because tree growth can respond to influences besides precipitation, researchers examined a sediment core from a nearby lake. Layers corresponding to the same interval contained more windblown mineral dust and pollen from drought-tolerant plants than adjacent layers did. Agreement among the independent indicators strengthened the drought interpretation without making any one proxy conclusive by itself.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It presents a disagreement between two laboratories, identifies a mistake in the lake dates, and accepts only the tree-ring record.', 'It lists several modern drought effects, ranks them by severity, and recommends a policy for the mountain valley.', 'It introduces an interpretation from one proxy, tests it with different evidence, and explains how agreement affects confidence.', 'It describes how a lake formed, compares two tree species, and attributes narrow rings solely to mineral dust.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'A group of letters had long been cataloged as copies made in 1846 because that year appeared on each final page. Under magnification, a conservator found that the last digit on one page crossed paper fibers exposed by a crease documented during an 1851 repair. The digit must therefore have been written after the crease formed. The observation cannot identify who changed the date or establish the year when the change occurred, but it shows that this numeral was not part of the page before the repair.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It dismisses the physical observation because the writer of the altered numeral remains unknown.', 'It argues that every date in the group of letters must have been added during the 1851 repair.', 'It introduces a second repair that explains why the paper crease can no longer be examined.', 'It states the supported sequence while marking conclusions the observation cannot supply.'],
    answer: 3,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Editors of a community glossary asked speakers to translate local ecological terms into English. For many entries, the group agreed on a concise equivalent. For one term describing soil that becomes workable after the first rain, however, some speakers emphasized texture while others emphasized timing. The editors kept both translations and added examples of when each was used. That choice records a meaningful difference among speakers instead of presenting one rendering as universally interchangeable with the original term.',
    text: 'Which choice best describes the function of the fourth sentence in the text as a whole?',
    options: ['It proves that every ecological term requires at least two English translations.', 'It shows how the editors respond to the disagreement among the speakers.', 'It shows that the editors rejected examples in favor of a single technical definition.', 'It explains why speakers stopped using the local term after the glossary was published.'],
    answer: 1,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nA modern edition of a serialized novel should preserve the brief endings that originally closed each installment. Those pauses shaped how early readers anticipated the next release, even when the author later removed them for the bound volume. Printing only the revised continuous text erases evidence of that first reading rhythm.\n\nText 2\n\nThe author’s revised volume should remain the main reading text because it represents her final arrangement of the novel. An edition can still preserve each installment ending in notes and reproduce the serial pages online. Readers can study the publication rhythm without having later revisions interrupted by every former break.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the proposal in Text 1?',
    options: ['By arguing that installment endings should be omitted from the edition and from all supplementary materials', 'By agreeing that former breaks belong in the main text because the author’s later arrangement has no editorial value', 'By recording serial breaks outside the main text and presenting the revised volume continuously for readers', 'By claiming that early readers encountered the complete bound novel before any installment was released'],
    answer: 2,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nSatellite instruments measure light leaving the ocean at several wavelengths. In open water, algorithms can use those color patterns to estimate chlorophyll concentration and map broad changes in phytoplankton. The repeated coverage makes ocean-color data useful for observing conditions over large areas.\n\nText 2\n\nNear coasts, colored dissolved organic matter and suspended sediment also alter the light detected by a satellite. These components may vary independently of chlorophyll, so an algorithm calibrated for open water can misattribute their optical effects. Coastal estimates therefore require measurements and models that distinguish among multiple light-altering substances.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 uses ocean color as a broad chlorophyll proxy, whereas Text 2 names coastal substances that can distort such estimates.', 'Text 1 argues that satellites directly count individual phytoplankton cells, whereas Text 2 recommends counting only sediment particles.', 'Text 1 limits ocean-color observations to coastal water, whereas Text 2 claims that dissolved material occurs only in the open ocean.', 'Text 1 rejects wavelength measurements, whereas Text 2 treats a single wavelength as sufficient for every coastal estimate.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Measure sería cuantificar el fósforo; el texto describe incorporarlo mediante las hifas.', B: 'Correcta: acquire significa obtener o recoger fósforo de un volumen mayor de suelo.', C: 'Release invierte el movimiento: el hongo toma fosfato y transfiere una parte a la planta.', D: 'Deplete significa agotar; la zona inmediata ya está empobrecida antes de que actúen las hifas externas.',
  }, fuenteHecho: 'USDA ARS, hifas externas de micorriza y adquisición de fósforo: https://www.ars.usda.gov/ARSUserFiles/37108/PDF/2012/2012-Hortscience-47-5-660-671.pdf' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Set aside sería apartar o descartar el recuerdo, pero la nueva pregunta lo hace aparecer.', B: 'Argued against supondría una oposición que no existe entre la historiadora y Mara.', C: 'Made routine significaría volver habitual la memoria, no obtener un detalle específico.', D: 'Correcta: la pregunta sensorial hizo surgir una memoria precisa que la pregunta inicial no produjo.',
  }, fuenteHecho: 'Entrevista, mercado y recuerdo inventados.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: ajustar el péndulo controla el ritmo o intervalo del mecanismo.', B: 'El pasaje trata un ajuste técnico, no la aprobación jurídica del reloj.', C: 'La identidad del fabricante no cambia el intervalo entre impulsos.', D: 'Los diales dependientes pueden tener apariencias distintas; lo regulado es su señal temporal.',
  }, fuenteHecho: 'Royal Museums Greenwich, reloj maestro Shepherd e impulsos eléctricos a relojes dependientes: https://www.rmg.co.uk/royal-observatory/attractions/shepherd-gate-clock' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Los registros coinciden y el texto no identifica un error de datación ni descarta los sedimentos.', B: 'No enumera efectos modernos ni formula una recomendación política.', C: 'Correcta: parte de anillos, busca indicadores distintos y concluye que su acuerdo eleva la confianza sin volver infalible un proxy.', D: 'El polvo es una evidencia del intervalo y el texto reconoce múltiples influencias sobre el crecimiento.',
  }, fuenteHecho: 'Escenario y correspondencia inventados, informados por NOAA sobre anillos y sedimentos lacustres como proxies: https://www.ncei.noaa.gov/products/paleoclimatology' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'La falta de autor identificado limita una atribución, pero no invalida la secuencia física observada.', B: 'La evidencia corresponde a un numeral de una página y no permite generalizar a todas las fechas.', C: 'No se introduce otra reparación; la última oración interpreta el cruce entre tinta, fibras y pliegue.', D: 'Correcta: separa lo que no puede saberse de la conclusión apoyada, que el numeral se añadió después de formarse el pliegue.',
  }, fuenteHecho: 'Cartas, fechas, reparación y observación microscópica inventadas.' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'humanidades', razones: {
    A: 'El caso se limita a un término; muchos otros recibieron un equivalente conciso.', B: 'Correcta: conservar dos versiones con ejemplos responde directamente al desacuerdo entre textura y momento.', C: 'La oración afirma lo contrario: los editores añadieron ejemplos y retuvieron dos traducciones.', D: 'El pasaje no describe abandono del término ni conducta posterior a la publicación.',
  }, fuenteHecho: 'Glosario, término, hablantes y decisiones editoriales inventados.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'literatura', razones: {
    A: 'Text 2 propone conservar finales en notas y páginas reproducidas, no eliminarlos.', B: 'Text 2 atribuye valor a la revisión final y por eso la mantiene como lectura principal.', C: 'Correcta: preserva los cortes en materiales suplementarios y reserva el texto principal para la versión revisada.', D: 'Ambos textos distinguen entregas iniciales de un volumen posterior; ninguno invierte esa cronología.',
  }, fuenteHecho: 'Ambos argumentos editoriales son originales.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: Text 1 destaca el proxy de clorofila y Text 2 explica por qué CDOM y sedimentos complican su uso costero.', B: 'Text 1 habla de estimaciones amplias, no de conteos directos de células; Text 2 tampoco propone contar partículas.', C: 'Text 1 se refiere a mar abierto y Text 2 a costas, exactamente al revés de la opción.', D: 'Ambos dependen de mediciones espectrales; Text 2 pide modelos que separen varios componentes.',
  }, fuenteHecho: 'NASA Ocean Color, CDOM y sedimentos suspendidos como componentes ópticamente activos en aguas costeras: https://oceancolor.gsfc.nasa.gov/docs/technical/simbios99tm.pdf' },
]
