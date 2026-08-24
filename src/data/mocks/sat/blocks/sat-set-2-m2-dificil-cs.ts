import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'To test a low-cost water sensor, researchers added known amounts of salt to separate samples and compared the sensor\'s readings with laboratory measurements. Across the lowest concentrations, the two sets of values closely agreed. At higher concentrations, however, the sensor consistently reported slightly less salt than the laboratory found. The team concluded that the device was sound for detecting small changes but required adjustment before use in very salty water.',
    text: 'As used in the text, what does the word "sound" most nearly mean?',
    options: ['Audible', 'Thorough', 'Uninjured', 'Reliable'],
    answer: 3,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'For years, the portrait hung above the hotel desk without attracting comment. Then conservator Leila Moran cleaned a narrow strip along its lower edge, revealing a line of bright green beneath the brown surface. She resisted cleaning the whole canvas immediately. The strip was evidence, but it was also a warning: whatever solvent removed the discolored varnish might disturb the original paint below. Moran\'s approach remained deliberately conservative.',
    text: 'As used in the text, what does the word "conservative" most nearly mean?',
    options: ['Traditional in taste', 'Cautious in action', 'Limited in cost', 'Formal in style'],
    answer: 1,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'In her study of petitions sent to the provincial assembly between 1810 and 1840, historian Paloma Reyes does not treat every signature as proof that its writer composed or even read the document. Neighbors sometimes signed collectively after hearing a petition read aloud, and clerks occasionally copied names from earlier lists. Reyes nevertheless argues that the signatures trace political participation, provided they are read as records of public alignment rather than private authorship.',
    text: 'As used in the text, what does the word "trace" most nearly mean?',
    options: ['Imitate an earlier document closely', 'Follow secretly', 'Indicate the course of', 'Copy onto paper'],
    answer: 2,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'When Mara opened the violin case, the instrument smelled faintly of cedar and dust. Her father had left a note under the bow: “The bridge is loose. Do not tune it yet.” She carried the violin to the window anyway and turned each peg only enough to hear a weak, uncertain pitch. Then she stopped. She placed the note on the music stand, where advice usually sat after it had been accepted, and began searching for the repair shop\'s number.',
    text: 'Which choice best describes the function of Mara placing the note on the music stand?',
    options: ['It signals that she has decided to follow the warning after briefly testing it.', 'It shows that she intends to use the note as music while tuning the violin.', 'It explains why her father stored the instrument in a cedar case.', 'It reveals that the repair shop sent a detailed warning before she opened the case and examined the bridge.'],
    answer: 0,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Oceanographers once estimated the age of deep water mainly from how little oxygen it contained: water isolated from the surface generally loses oxygen as sinking organic matter decays. The estimate can mislead, however, because waters begin with different oxygen levels and decay proceeds at different rates. Researchers now combine oxygen with several dissolved compounds whose rates of change are better constrained. None supplies an exact clock, but together they narrow the possible history of a water mass.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It presents two competing measurements, demonstrates that both produce exact ages across every water mass, and recommends choosing the cheaper method.', 'It describes a disputed theory of decay, outlines competing explanations, and rejects all chemical evidence.', 'It traces oxygen from the surface to depth and explains why organic matter no longer decays there.', 'It introduces an older indicator, identifies sources of uncertainty, and describes a multi-indicator response.'],
    answer: 3,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Standard histories date the end of the River Guild to 1762, when its charter was revoked. Economist Sefu Dlamini argues that the date marks a legal change more clearly than an economic one. Account books show former members continuing to pool cargo space, guarantee one another\'s loans, and settle disputes through the same elected elders for almost twenty years. By separating the guild\'s name from its practices, Dlamini recasts dissolution as a gradual process rather than a single decree.',
    text: 'Which choice best describes the function of the account-book evidence in the text?',
    options: ['It confirms that the revoked charter continued to have legal force for twenty years.', 'It supports the distinction between the formal end of the guild and the persistence of its economic practices.', 'It identifies a detailed sequence of financial losses that caused provincial officials to revoke the guild\'s charter and seize its property.', 'It shows that elected elders replaced merchants as owners of all pooled cargo.'],
    answer: 1,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nReleasing captive-bred frogs into restored wetlands can quickly rebuild a population. Waiting for frogs to arrive on their own risks leaving suitable habitat empty while isolated wild populations continue to decline.\n\nText 2\n\nA release can raise frog numbers without restoring a self-sustaining population. If the wetland still lacks winter shelter or contains a disease carried by captive animals, repeated releases may hide those defects. Managers should first confirm that frogs can survive and reproduce there without continued additions.',
    text: 'How would the author of Text 2 most likely qualify the recommendation in Text 1?',
    options: ['Release should follow evidence that the restored habitat can support frogs without repeated intervention.', 'Release is unnecessary because wild frogs always occupy suitable wetlands immediately.', 'Captive frogs should be released only into isolated wetlands that have never contained wild populations or any possible source of disease.', 'Managers should restore winter shelter but need not consider disease or reproduction.'],
    answer: 0,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nThe anonymous poem “At the North Gate” likely predates poet Sima Ren. Its imagery appears in two songs copied in an older manuscript, suggesting that Sima borrowed a familiar sequence when compiling his collection.\n\nText 2\n\nThe older manuscript is itself a late copy and may contain additions made after Sima\'s lifetime. More tellingly, the two songs reproduce not only the imagery but an unusual error found in Sima\'s version. Shared error points from Sima\'s text toward the songs, not necessarily the reverse.',
    text: 'Which choice best describes how Text 2 responds to the evidence used in Text 1?',
    options: ['It accepts the manuscript\'s date but argues at length that Sima never included the poem or either related song in any collection he assembled.', 'It agrees that the songs are older but denies that their imagery resembles the poem.', 'It questions whether the manuscript preserves an earlier version and uses a shared error to suggest the opposite direction of borrowing.', 'It argues that similarities among the texts are too common to support any relationship.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Audible corresponde al sustantivo sound, no a una valoración del funcionamiento del sensor.', B: 'Thorough significa exhaustivo y no se afirma que el dispositivo mida todos los rangos.', C: 'Uninjured describe integridad física, no precisión de medición.', D: 'Correcta: la concordancia en bajas concentraciones demuestra que el sensor es fiable en ese uso.' }, fuenteHecho: 'Sensor, muestras y resultados inventados.' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'humanidades', razones: {
    A: 'El gusto artístico no decide el ritmo de limpieza.', B: 'Correcta: conserva una franja sin intervenir porque desconoce el efecto del solvente.', C: 'No se menciona presupuesto ni ahorro.', D: 'Formal describe apariencia o conducta ceremonial, no precaución técnica.' }, fuenteHecho: 'Retrato, conservadora y procedimiento inventados.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Imitar no describe lo que las firmas revelan sobre participación.', B: 'No hay seguimiento secreto de personas.', C: 'Correcta: las firmas permiten seguir o indicar la trayectoria de la alineación pública.', D: 'Los nombres pudieron copiarse, pero trace describe la interpretación de Reyes, no el acto del escribano.' }, fuenteHecho: 'Historiadora, asamblea, período y fuentes inventados.' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: prueba apenas las clavijas, se detiene y busca reparación, de modo que la nota pasa a guiar su acción.', B: 'El texto distingue consejo y música; no va a interpretar la nota.', C: 'El olor introduce la escena y no explica dónde coloca el papel.', D: 'La advertencia es del padre y no del taller.' }, fuenteHecho: 'Ficción original.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Ningún indicador es exacto ni se comparan costos.', B: 'No rechaza la química; propone combinar varios compuestos.', C: 'La descomposición es precisamente la causa de pérdida de oxígeno.', D: 'Correcta: pasa del oxígeno y sus incertidumbres a una estimación conjunta más estrecha.' }, fuenteHecho: 'Síntesis original de trazadores generales de masas de agua.' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'Las prácticas continúan, no la validez legal del estatuto.', B: 'Correcta: muestra cooperación, crédito y arbitraje después del final formal.', C: 'No aparecen pérdidas como causa de revocación.', D: 'Los ancianos arbitran; no pasan a ser dueños de la carga.' }, fuenteHecho: 'Gremio, economista, fecha y libros inventados.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: Text 2 condiciona la liberación a supervivencia y reproducción sin nuevas adiciones.', B: 'Text 1 señala que la llegada natural puede tardar.', C: 'No se impone que el humedal carezca de historia poblacional.', D: 'Text 2 menciona explícitamente enfermedad y reproducción.' }, fuenteHecho: 'Argumentos originales de manejo de anfibios.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'literatura', razones: {
    A: 'Text 2 cuestiona la antigüedad efectiva de la copia.', B: 'No acepta que los cantos sean anteriores.', C: 'Correcta: duda de la cronología y usa el error compartido para invertir la dependencia propuesta.', D: 'El error raro se presenta como evidencia específica de relación.' }, fuenteHecho: 'Poeta, poema, manuscritos y argumentos inventados.' },
]
