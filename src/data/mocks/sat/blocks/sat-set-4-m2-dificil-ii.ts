import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/** Information and Ideas · Set 4 M2 exigente · q09–q15. Claves: C, A, D, B, C, D, A. */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'Audio description supplies spoken information about visual elements of a performance. Because descriptions usually fit into pauses in dialogue, a describer must select details rather than name everything visible. In one play, knowing that a character quietly places a key beneath a red cushion matters more to later action than knowing the colors of all the furniture. Effective description therefore identifies visual information needed to follow events and communicates where relevant people or objects are in relation to one another.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Audio description should list every visible color before describing any action or location.', 'A performance needs audio description only when none of its characters speak during a scene.', 'Audio description selects visual details and spatial relationships that help an audience follow events.', 'Describers can avoid selecting among details by speaking continuously over a performance’s dialogue.'],
    answer: 2,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Researchers collected soil shortly after a wildfire from adjacent pine stands with low or high canopy consumption and from an unburned stand. They then counted seedlings that emerged from each sample under common greenhouse conditions. Burned samples as a group produced more viable seedlings than unburned samples, but low-consumption plots produced more than high-consumption plots, and the species composition differed across severity levels. The results show that treating all burned soil as one category can conceal important variation in the surviving seed bank.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Fire severity can shape both seedling density and species composition in the soil seed bank after a burn.', 'Every high-severity fire eliminates all viable seeds while every low-severity fire increases all species equally.', 'Greenhouse conditions make comparisons among seed banks impossible unless seedlings remain in their original soil.', 'Canopy consumption determines the precise temperature reached by every seed at every soil depth.'],
    answer: 0,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'A historian claims that a merchant ship assembled its crew from several ports rather than recruiting all sailors near its home harbor. The historian examines a packet of pay receipts signed during a single voyage.',
    text: 'Which finding from the receipts, if true, would most directly support the historian’s claim?',
    options: ['The captain received a larger payment than any other person named in the packet, including all officers and sailors.', 'Several receipts record deductions for cloth issued to sailors during cold weather.', 'The receipts use two different abbreviations for the ship’s name on the same date.', 'Crew members identified themselves as residents of Cádiz, Bristol, and Göteborg when signing for wages.'],
    answer: 3,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'A conservator proposes that a torn parchment leaf was repaired before it was incorporated into its present binding. The leaf has a sewn patch over one edge and a line of binding holes through that same area.',
    text: 'Which finding, if true, would most directly support the conservator’s proposal?',
    options: ['The ink on the leaf contains a pigment also found on several unrelated pages in the volume.', 'The fasteners attaching the page to the book cut through the added reinforcement.', 'The thread used for the patch is a different color from the thread currently holding the volume together.', 'A later owner wrote a price on the inside of the volume’s wooden cover.'],
    answer: 1,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A researcher measured the activity of the same enzyme preparation at four temperatures. Activity was 12 units per milliliter (U/mL) at 10°C, 31 U/mL at 20°C, 47 U/mL at 30°C, and 19 U/mL at 40°C.',
    text: 'Which choice most effectively uses the data to complete the statement? In this experiment, enzyme activity ______',
    options: ['rose by 35 U/mL between 30°C and 40°C.', 'was identical at 10°C and 40°C despite the temperature difference.', 'peaked at 47 U/mL at 30°C and dropped 28 U/mL by 40°C.', 'increased at every step as temperature rose from 10°C to 40°C.'],
    answer: 2,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'In a printer’s proof of a fictional play, the scene in which Lio opens a sealed letter is numbered 6, but the number is crossed out and replaced with 4. A scene in which Mara announces Lio’s secret is changed from 4 to 6. Beside the corrections, the printer wrote, “Keep the audience from knowing until he does.”',
    text: 'Which choice most logically follows from the text?',
    options: ['The printer removed both scenes because neither one involved the sealed letter.', 'Mara’s announcement was moved later so that the audience would learn the secret before Lio.', 'The crossed-out numbers show that the play’s author rejected every single suggestion made by the printer.', 'The scenes were reordered so that Lio would open the letter before the audience learned its secret.'],
    answer: 3,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers attached unopened flowers of one species to a mechanical shaker. They held vibration frequency and duration constant but tested three amplitudes. After each trial, they weighed the pollen released. Flowers shaken at the lowest amplitude released an average of 6 milligrams, those at the middle amplitude released 14 milligrams, and those at the highest amplitude released 27 milligrams.',
    text: 'Which choice most logically follows from the text?',
    options: ['Within the tested range, greater vibration amplitude contributed to greater pollen release from these flowers.', 'Vibration frequency alone produced the differences in pollen released across the three amplitude treatments.', 'Flowers exposed to the lowest amplitude released more pollen than those in either other treatment.', 'Every flowering species will release exactly 27 milligrams of pollen at the highest tested amplitude.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El ejemplo prioriza la ubicación y función de la llave sobre un inventario completo de colores.', B: 'La descripción puede apoyar escenas con diálogo; los silencios determinan dónde cabe, no si se necesita.', C: 'Correcta: resume la selección de detalles visuales y relaciones espaciales relevantes para seguir los hechos.', D: 'Hablar sobre el diálogo impediría oírlo y no resuelve la necesidad de seleccionar información.',
  }, fuenteHecho: 'Ejemplo original informado por AccessibleEU sobre descripción hablada de acciones y otros aspectos visuales: https://accessible-eu-centre.ec.europa.eu/document/download/d9efa4a6-8131-455f-a47c-70f25d48fd9b_en?filename=05.Improving+accessibility+in+audiovisual+materials.pdf' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: integra la diferencia entre suelo quemado y no quemado con la variación de densidad y composición según severidad.', B: 'Convierte tendencias entre muestras en resultados absolutos para todos los incendios y todas las especies.', C: 'Las condiciones comunes permiten comparar el potencial de emergencia de las muestras.', D: 'El consumo de copa es un indicador de severidad; no fija la temperatura de cada semilla.',
  }, fuenteHecho: 'Maia et al., severidad de incendio, densidad viable y composición del banco de semillas: https://doi.org/10.1016/j.geoderma.2012.02.001' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'historia', razones: {
    A: 'La jerarquía salarial no identifica dónde se reclutó a los marineros.', B: 'Las deducciones por ropa informan condiciones de pago, no procedencia.', C: 'Variantes del nombre del barco no demuestran diversidad geográfica de la tripulación.', D: 'Correcta: residencias en tres puertos distintos son evidencia directa de procedencias diversas.',
  }, fuenteHecho: 'Barco, recibos, nombres de puertos y hallazgos hipotéticos originales.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'Un pigmento compartido no ordena cronológicamente reparación y encuadernación.', B: 'Correcta: si las perforaciones de sujeción atraviesan el material cosido, la reparación ya estaba presente cuando se encuadernó la hoja.', C: 'El color distinto del hilo no establece cuál acción ocurrió primero.', D: 'Una anotación en la cubierta es posterior a la fabricación de la cubierta, pero no fecha la reparación del folio.',
  }, fuenteHecho: 'Pergamino, reparación, encuadernación y observaciones hipotéticas originales.' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 3, tema: 'ciencia', razones: {
    A: 'De 30°C a 40°C la actividad baja 28 U/mL; no sube 35.', B: 'Los valores son 12 y 19 U/mL, no iguales.', C: 'Correcta: 47 U/mL es el máximo y 47 − 19 = 28 U/mL.', D: 'La actividad aumenta hasta 30°C y después disminuye a 40°C.',
  }, fuenteHecho: 'Experimento, temperaturas y datos originales.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Ambas escenas conservan un nuevo número; no fueron eliminadas.', B: 'Las correcciones hacen lo contrario: la apertura pasa a 4 y el anuncio pasa a 6.', C: 'Las marcas muestran una revisión aceptada en la prueba, no rechazo universal de sugerencias.', D: 'Correcta: la nota y la nueva numeración colocan el descubrimiento de Lio antes de que Mara revele el secreto al público.',
  }, fuenteHecho: 'Obra, escenas, numeración y nota inventadas.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: con frecuencia y duración constantes, el aumento 6 → 14 → 27 mg acompaña el aumento de amplitud.', B: 'La frecuencia se mantuvo constante y no explica diferencias entre tratamientos.', C: 'El grupo de menor amplitud liberó 6 mg, menos que 14 y 27 mg.', D: 'El resultado se limita a una especie y condiciones; no fija una cantidad universal.',
  }, fuenteHecho: 'Diseño y cifras originales, informados por estudios que relacionan amplitud floral y liberación de polen: https://pmc.ncbi.nlm.nih.gov/articles/PMC9355986/' },
]
