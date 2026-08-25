import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Information and Ideas · Set 5 M2 exigente · q09–q15.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves B, D, A, C, B, D, C
 * fueron reservadas antes de redactar.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'Keeping the original computer and files for a software-based artwork does not ensure that future viewers will experience the work as intended: hardware can fail, and different emulators may alter color, timing, or interactive behavior. Conservators therefore record the work in operation, interview its maker, and document significant behaviors. They can later compare an emulated version with those records and decide whether the new presentation preserves the work’s identity.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Keeping the original computer and its source files is sufficient to preserve every software-based artwork.', 'Behavior records and artist guidance can help museums evaluate an emulated software-based artwork.', 'Once an artist is interviewed, museums no longer need to retain software files or document later installations.', 'An emulator reproduces every visual and interactive detail without comparison to the original system.'],
    answer: 1,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'A hagfish releases a glandular exudate containing tightly coiled thread skeins and mucin vesicles. In seawater, vigorous mixing stretches material from the vesicles into long mucin strands. Those strands attach to the skeins and transmit hydrodynamic forces that pull the skeins open within a fraction of a second. The resulting network of threads and mucus entrains a large volume of water, rapidly producing defensive slime.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Mucin vesicles absorb seawater while the thread skeins remain tightly coiled inside the hagfish.', 'Hagfish slime is produced solely by long threads that are already extended before entering seawater.', 'Hydrodynamic mixing breaks each skein into short fibers that dissolve after trapping a small amount of water.', 'Mixing lets mucin strands pull compact skeins open, creating a water-trapping defensive network.'],
    answer: 3,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'Pianist Mara Venn examined two drafts of a difficult passage in composer Niko Aras’s étude. The earlier draft contained a nearly erased fingering above the notes; the later draft used a different sequence. Venn argues that Aras deliberately removed the first fingering after deciding that it encouraged a hesitation rather than losing the marks through ordinary handling.',
    text: 'Which quotation from Aras’s notes most directly supports Venn’s argument?',
    options: ['“Remove the first fingering; its hesitation belongs only to the draft.”', '“A faint gray arc remains above the measure where the paper was folded.”', '“Copy the revised page on the heavier paper stored beside the piano.”', '“The same melody returns two pages later, transposed into a different key.”'],
    answer: 0,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'During conservation of a 1594 navigation manual, workers found printed paper reused as a spine lining. A bibliographer argues that the waste preserves physical evidence of an otherwise unrecorded edition that existed before the manual was bound, although it cannot establish how many copies of that edition were made or read.',
    text: 'Which quotation from the conservation report most directly supports the bibliographer’s argument?',
    options: ['“The volume’s calf cover was repaired with a strip of linen during the nineteenth century.”', '“The fragment’s watermark also occurs in blank paper used for several purposes in the region.”', '“Both sides show pages 2 and 7 of The Harbor Almanack, 1591; no catalog records that edition.”', '“Dust was heaviest between the spine lining and the wooden board at the volume’s lower edge.”'],
    answer: 2,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'Researchers introduced the same number of liquid drops into microchannels with three different widths. The table shows the percentage of drops that reached a collector and, for those drops, the median transit time. A researcher concludes that the 160 μm channel delivered the greatest share of drops, although its delivered drops traveled more slowly than those in the 320 μm channel.\n\n| Channel width | Drops reaching collector | Median transit time |\n|---|---:|---:|\n| 80 μm | 72% | 12.6 s |\n| 160 μm | 94% | 7.8 s |\n| 320 μm | 81% | 5.9 s |',
    text: 'Which choice most effectively uses data from the table to support the researcher’s conclusion?',
    options: ['At 81%, the 320 μm channel delivered the largest share of drops and had the shortest median time.', 'At 94%, the 160 μm channel led in delivery; its 7.8-second median was slower than the 320 μm channel’s 5.9 seconds.', 'Because the 80 μm channel had a 12.6-second median, every increase in channel width necessarily made all drops move faster.', 'The 160 μm channel delivered 22 percentage points fewer drops than the 80 μm channel and had a longer median time.'],
    answer: 1,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'In the first draft of Laleh Or’s play, the sentence “The tide keeps its own calendar” appears in the margin beside Toma’s speech. Or crossed out the marginal sentence, drew an arrow to a caret within Toma’s speech, and renumbered all the lines that followed. In the next draft, the sentence appears at the caret with Toma’s name before it. These revisions suggest that ______',
    text: 'Which choice most logically completes the text?',
    options: ['Or intended to remove Toma from the scene after completing the first draft.', 'the sentence was a stage direction that actors were never expected to speak.', 'Or renumbered the lines because the next draft was shorter than the first one.', 'Or moved the marginal sentence into Toma’s spoken dialogue.'],
    answer: 3,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers trained two groups of bumblebees to distinguish rewarding from unrewarding artificial flowers. Both groups could use a subtle difference in flower hue, but only one group also received an electric-field pattern that consistently reinforced that visual distinction. The group with both cues required a mean of 24 visits to reach 80% correct choices; the hue-only group required 35. These results suggest that ______',
    text: 'Which choice most logically completes the text?',
    options: ['the bees could learn the flower difference only after the researchers removed the hue cue.', 'an electric pattern determines flower choice regardless of visual information or reward.', 'electrical information can supplement a visual cue and speed learned reward discrimination.', 'exposure to electric fields prevents bumblebees from remembering distinctions in flower hue.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El texto explica que conservar archivos y equipo no basta cuando el hardware falla o cambia la ejecución.',
    B: 'Correcta: documentación, entrevista y registro del comportamiento permiten evaluar si una emulación conserva la identidad de la obra.',
    C: 'La entrevista complementa los archivos y registros; no vuelve innecesarios los demás materiales de conservación.',
    D: 'El pasaje advierte que emuladores distintos pueden alterar detalles y que sus resultados deben compararse.',
  }, fuenteHecho: 'Smithsonian American Art Museum, documentación y evaluación de emulaciones de videojuegos: https://americanart.si.edu/blog/document-and-preserve-video-games' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Las madejas se despliegan rápidamente; no permanecen enrolladas mientras se forma el slime.',
    B: 'El exudado tiene dos componentes y las hebras se secretan como madejas compactas, no ya extendidas.',
    C: 'La mezcla transmite fuerzas que desenrollan hebras largas; no las rompe para disolverlas.',
    D: 'Correcta: resume la cadena mecanismo-resultado sin confundir madejas, mucina, mezcla y captura de agua.',
  }, fuenteHecho: 'Winegard y Fudge, Journal of Experimental Biology, “Deployment of hagfish slime thread skeins requires the transmission of mixing forces via mucin strands”: https://doi.org/10.1242/jeb.038075' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: la orden explícita de quitar la digitación y su motivo prueban una revisión deliberada.',
    B: 'El arco y el pliegue describen una marca física, pero no identifican quién borró la digitación ni por qué.',
    C: 'La instrucción sobre el papel concierne la copia material de la página, no la decisión técnica del pasaje.',
    D: 'La reaparición de la melodía no demuestra que el compositor rechazara la primera digitación.',
  }, fuenteHecho: 'Compositor, pianista, étude y notas ficticios; texto original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'Una reparación posterior del cuero no aporta evidencia de la impresión reutilizada en la encuadernación original.',
    B: 'Un watermark regional puede ayudar a estudiar el papel, pero no identifica por sí solo una edición impresa perdida.',
    C: 'Correcta: tipos, páginas, título y fecha documentan materialmente una edición que no aparece en los catálogos conservados.',
    D: 'La distribución del polvo informa sobre el estado del volumen, no sobre el contenido ni la existencia del impreso.',
  }, fuenteHecho: 'Escenario y título originales informados por National Library of Medicine, Bathtub Collection: https://www.nlm.nih.gov/hmd/collections/books/bathtub-collection/index.html' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Ochenta y uno por ciento no supera el 94% de la fila de 160 μm, aunque 5.9 segundos sí es el menor tiempo.',
    B: 'Correcta: usa los tres porcentajes para el máximo y compara exactamente los dos tiempos mencionados en la conclusión.',
    C: 'La tabla reporta medianas de gotas entregadas y tres condiciones; no permite una ley universal sobre cada gota o ancho.',
    D: 'La dirección y las cifras están invertidas: 160 μm entrega 22 puntos más y su mediana es menor que la de 80 μm.',
  }, fuenteHecho: 'Tabla pedagógica y resultados sintéticos originales; no representan un experimento publicado.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Toma conserva y amplía su parlamento en la segunda versión; no se elimina de la escena.',
    B: 'La versión posterior antepone el nombre del personaje, convención que identifica una réplica hablada.',
    C: 'Insertar una línea obliga a renumerar lo siguiente y no implica que el borrador completo se acorte.',
    D: 'Correcta: flecha, caret, renumeración y atribución posterior convergen en incorporar la frase al diálogo de Toma.',
  }, fuenteHecho: 'Dramaturga, personaje, obra y borradores ficticios; texto original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Ambos grupos conservaron la diferencia de hue; la comparación cambia la disponibilidad del patrón eléctrico.',
    B: 'El patrón refuerza una señal visual y una asociación con recompensa; el diseño no demuestra control exclusivo.',
    C: 'Correcta: alcanzar el mismo criterio en 24 frente a 35 visitas apoya una contribución eléctrica al aprendizaje multimodal.',
    D: 'El grupo con información eléctrica aprendió más rápido, no mostró una pérdida de memoria para el color.',
  }, fuenteHecho: 'Clarke et al., Science, “Detection and Learning of Floral Electric Fields by Bumblebees”: https://doi.org/10.1126/science.1230883' },
]
