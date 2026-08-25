import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Craft and Structure · Set 5 M2 exigente · q01–q08.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves D, A, C, B, D, C, A, B
 * fueron reservadas antes de redactar y dejan dos respuestas por letra en el bloque.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Snowshoe hares molt from brown to white and back again on a seasonal schedule, but the dates of snow cover vary from year to year. Researchers compared each hare’s coat with the ground beneath it. A coat was considered mismatched when its color differed sharply from the background and matched when the two corresponded closely.',
    text: 'As used in the text, what does the word "matched" most nearly mean?',
    options: ['Was physically fastened to the ground beneath it', 'Defeated another animal in a direct competition', 'Was equal to the background in total number', 'Corresponded closely to the background in appearance'],
    answer: 3,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'After repairing the flood-damaged volume, Mina called it complete. She immediately qualified that description: two pages remained unreadable, and the new spine reproduced the book’s structure but not its faded decoration. Her added limits did not diminish the repair; they made the record of it precise.',
    text: 'As used in the text, what does the word "qualified" most nearly mean?',
    options: ['Made less absolute by adding specific conditions', 'Prepared through training for a specialized occupation', 'Earned the formal right to receive a stated benefit', 'Assigned the repaired book to an official category'],
    answer: 0,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'A split tally stick recorded a transaction with notches cut across a piece of wood before the wood was divided lengthwise. One party kept each irregular half. When the halves were later reunited, matching grain and matching notches corroborated the amount claimed in a written account. Neither half alone could be altered without creating a visible discrepancy.',
    text: 'As used in the text, what does the word "corroborated" most nearly mean?',
    options: ['Permanently concealed evidence in the written account', 'Converted the recorded amount into a form of money', 'Supported the account with independent confirming evidence', 'Made the written amount legally irrelevant to both parties'],
    answer: 2,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'A remora attaches underwater with a disc composed of movable lamellae bearing tiny spinules. Researchers built passive disc models whose number of lamellae could be changed, then tested the models on surfaces with different roughness. Models with more lamellae resisted greater shear forces, and the largest pull-off forces occurred on roughness similar to shark skin. The tests therefore connect a feature of disc morphology with performance under defined surface conditions.',
    text: 'Which choice best describes the function of the second sentence in the text as a whole?',
    options: ['It argues that researchers cannot study remora attachment accurately without using live sharks.', 'It describes the experimental manipulation and surface comparison used to test the disc feature.', 'It reports that every increase in surface roughness necessarily produces stronger attachment.', 'It explains how the remora disc evolved before the animals to which remoras now attach.'],
    answer: 1,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'An overstruck coin is made by stamping a new design onto an older coin instead of onto a blank piece of metal. Parts of the earlier image may remain visible beneath the later one. When those traces can be identified, they establish that the earlier issue preceded the overtype; by themselves, however, they do not reveal why the mint reused that particular coin.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It claims that visible coin designs were stamped at the same mint for one identifiable reason.', 'It explains why an earlier design becomes completely invisible whenever a coin is overstruck.', 'It presents a method for estimating an overstruck coin’s market value from its metal content.', 'It gives a chronological inference supported by the traces and a cause the traces cannot establish.'],
    answer: 3,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'A museum catalog should distinguish a documented attribution from a plausible one. For example, an entry might read “Workshop of Elian Voss?” when the carving technique resembles that workshop’s work but no signed record identifies the maker. The question mark preserves the useful hypothesis while signaling that later evidence could change it. In this way, uncertainty becomes part of the record rather than disappearing behind a confident label.',
    text: 'Which choice best describes the function of the example in the second sentence?',
    options: ['It proves that every workshop name in a museum catalog must be followed by a question mark.', 'It identifies the signed record that conclusively establishes Elian Voss as the object’s maker.', 'It illustrates how a catalog can retain a possible attribution while making its uncertainty visible.', 'It shows that stylistic resemblance offers no useful evidence for cataloging an unidentified object.'],
    answer: 2,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nWhen a home movie’s original soundtrack is missing, an archive should preserve the silence. Adding footsteps or family conversation creates evidence the film never recorded, and a label cannot prevent the invented sounds from shaping how viewers interpret the images.\n\nText 2\n\nA replacement track should never be presented as original. Yet dated cue sheets, synchronized footage from another camera, or interviews with participants can support a careful reconstruction. If that track is clearly labeled and viewers can also access the silent preservation copy, it may communicate documented context without altering the source file.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the position in Text 1?',
    options: ['By accepting a labeled, evidence-based reconstruction only if the silent preservation copy remains accessible', 'By arguing that every silent home movie once had a soundtrack and therefore requires reconstructed dialogue', 'By agreeing that labels cannot distinguish a reconstruction from an original recording under any circumstances', 'By arguing that archives should replace source files whenever interviews suggest plausible sounds'],
    answer: 0,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nSatellites can detect solar-induced chlorophyll fluorescence (SIF), the faint light plants emit after absorbing sunlight. Because SIF covaries with photosynthetic activity, broad SIF observations offer a functional proxy for comparing gross primary productivity across large regions that cannot be sampled continuously on the ground.\n\nText 2\n\nSIF is informative, but its relationship to carbon fixation is not fixed. Viewing geometry affects the signal received by a satellite, and absorbed energy can be divided among photosynthesis, heat dissipation, and fluorescence in changing proportions. Estimating productivity from SIF therefore requires calibration and attention to physiological and observational conditions.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 treats SIF as heat emitted by soil, whereas Text 2 treats it as light reflected only by clouds.', 'Text 1 emphasizes SIF as a regional proxy, whereas Text 2 emphasizes limits on converting SIF into productivity.', 'Text 1 says satellites count carbon molecules, whereas Text 2 says plants do not fix carbon during photosynthesis.', 'Text 1 limits SIF to laboratories, whereas Text 2 says viewing geometry is identical for every observation.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El texto compara color y fondo; no describe que el pelaje esté sujeto físicamente al suelo.',
    B: 'Match puede nombrar una competencia, pero aquí no hay oponentes ni victoria.',
    C: 'No se cuentan pelajes y fondos; se evalúa el grado de contraste visual entre ellos.',
    D: 'Correcta: matched indica que el color del pelaje correspondía estrechamente con la apariencia del fondo.',
  }, fuenteHecho: 'Mills et al., PNAS, “Camouflage mismatch in seasonal coat color due to decreased snow duration”: https://doi.org/10.1073/pnas.1222724110' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: Mina limita complete con dos condiciones concretas y vuelve más precisa la afirmación.',
    B: 'La especialización de Mina es contexto; qualified nombra lo que hizo con su descripción.',
    C: 'No obtiene un derecho o beneficio, sino que modifica el alcance de una afirmación.',
    D: 'Las páginas y el lomo no se asignan a una categoría formal en esa oración.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Las mitades se reúnen para hacer visible la correspondencia, no para ocultar la cifra.',
    B: 'El tally registra una cantidad, pero la acción descrita no lo transforma en moneda.',
    C: 'Correcta: grano y muescas coincidentes aportan evidencia independiente que confirma el importe escrito.',
    D: 'La comparación vuelve más sólido el reclamo; no lo hace irrelevante.',
  }, fuenteHecho: 'Computer History Museum, historia de los split tally sticks: https://www.computerhistory.org/storageengine/roman-philosopher-pliny-describes-tally-sticks/' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'La oración describe modelos pasivos precisamente para estudiar el mecanismo sin depender de animales vivos.',
    B: 'Correcta: especifica qué se varió en el modelo y sobre qué superficies se comparó su desempeño.',
    C: 'Los resultados aparecen en la tercera oración y no establecen una mejora monotónica con toda rugosidad.',
    D: 'No presenta una cronología evolutiva de huéspedes; describe el diseño del experimento.',
  }, fuenteHecho: 'Gamel et al., “Bioinspired remora adhesive disc offers insight into evolution”: https://doi.org/10.1088/1748-3190/ab3895' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'El texto distingue dos emisiones y no universaliza lugar ni motivo de acuñación.',
    B: 'La oración depende de que partes del diseño anterior sigan identificables.',
    C: 'No menciona valor comercial ni usa el contenido metálico como método de tasación.',
    D: 'Correcta: delimita la inferencia de orden que sí permiten las huellas y el motivo de reutilización que no permiten.',
  }, fuenteHecho: 'British Museum, ficha de una moneda romana sobreacuñada: https://www.britishmuseum.org/collection/object/C_R-12681' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'humanidades', razones: {
    A: 'La política se aplica a atribuciones plausibles no documentadas, no a todo taller mencionado.',
    B: 'El ejemplo afirma expresamente que no existe un registro firmado que cierre la atribución.',
    C: 'Correcta: el signo de interrogación conserva la hipótesis y comunica a la vez su condición provisional.',
    D: 'La semejanza técnica sostiene una posibilidad útil, aunque no una certeza.',
  }, fuenteHecho: 'Entrada, taller y objeto inventados; práctica catalográfica original.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Correcta: Text 2 comparte la prohibición de presentar invención como original, pero admite una reconstrucción separada, rotulada y respaldada.',
    B: 'Text 2 condiciona cualquier pista a evidencia concreta y no afirma que todas las películas tuvieran sonido.',
    C: 'La segunda voz sostiene que el rótulo, la copia silenciosa y la separación del archivo fuente sí pueden aclarar el estatus.',
    D: 'Text 2 exige conservar el source file y ofrecer la reconstrucción junto a la copia silenciosa.',
  }, fuenteHecho: 'Textos y escenario archivístico originales.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Ambos textos describen fluorescencia de plantas; ninguno la redefine como calor del suelo o reflexión de nubes.',
    B: 'Correcta: Text 1 destaca cobertura y utilidad comparativa, mientras Text 2 enumera factores que exigen calibrar la relación con productividad.',
    C: 'SIF es un proxy de actividad y el segundo texto presupone que la fotosíntesis sí fija carbono.',
    D: 'Text 1 habla de observaciones satelitales regionales y Text 2 afirma que la geometría varía.',
  }, fuenteHecho: 'Frankenberg et al., NASA, panorama de SIF como proxy funcional de GPP: https://ntrs.nasa.gov/citations/20180003040; Zhang et al., normalización angular y variación observacional: https://ntrs.nasa.gov/citations/20180003251' },
]
