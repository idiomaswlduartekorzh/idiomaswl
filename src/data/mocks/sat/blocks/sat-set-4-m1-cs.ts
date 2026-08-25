import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Craft and Structure · Set 4 M1 · q01–q08.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves D, B, A, C, D, A, C, B
 * fueron reservadas antes de redactar y dejan dos respuestas por letra en el bloque.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'During a dry period, a lichen can lose most of its water and suspend much of its metabolic activity without dying. Researchers studying this tolerance measured almost no photosynthesis in a dried lichen crust. After they added water, however, photosynthesis resumed: within a short time, the lichen was once again converting light energy into chemical energy. This response allows lichens to remain inactive through conditions in which continuous growth would be impossible.',
    text: 'As used in the text, what does the word "resumed" most nearly mean?',
    options: ['Was measured', 'Became faster', 'Remained stable', 'Began again'],
    answer: 3,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'Inez brought the watchmaker a notebook found beneath a loose floorboard. Its diagrams showed a pocket watch unlike any in the shop, with a second spring fitted beside the first. But the final sheet—the one that might have explained the added mechanism—had been torn out. The watchmaker studied the remaining pages for an hour before admitting that the record was partial: precise enough to show what had been attempted, but not how the attempt had ended.',
    text: 'As used in the text, what does the word "partial" most nearly mean?',
    options: ['Biased', 'Incomplete', 'Favorable', 'Fractional'],
    answer: 1,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'A handwritten note on an old map may disappear from ordinary view because its ink has faded or because another material covers it. Preservation scientists can photograph the map under several wavelengths of light, from ultraviolet through infrared. Since inks and other materials respond differently across those wavelengths, the scientists can combine selected images to recover writing that a standard photograph does not show. The method can expose the note without removing a sample from the map.',
    text: 'As used in the text, what does the word "recover" most nearly mean?',
    options: ['Reveal', 'Repossess', 'Repeat', 'Repair'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'An archive received recorded interviews with speakers of a regional dialect. A first transcription captured the general content, but it replaced several local expressions with more familiar words. The archivists then invited community members who used the dialect to review the recordings and correct the text. Their revisions did more than improve spelling: they preserved distinctions in meaning that the first transcriber had missed. The archive kept both the audio and the revised transcript so future researchers could compare them.',
    text: 'Which choice best describes the function of the third sentence in the text as a whole?',
    options: ['It explains why the archive decided that written records were more reliable than audio recordings.', 'It identifies the reason the original speakers refused to approve the first transcription.', 'It introduces community review as the step that corrects a weakness in the first transcription.', 'It shows that the community members created a new dialect while reviewing the interviews.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Many fish sense nearby motion through a lateral line: receptors along the body respond to pressure changes in the surrounding water. Engineers have built artificial versions from arrays of small pressure sensors. A single sensor may register a change, but an array records how that change differs from one location to another. By comparing those readings, an underwater robot can infer the direction of a disturbance or the presence of a nearby object even when visibility is poor.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It lists several fish species, ranks their sensory abilities, and selects one species as a model for robots.', 'It presents a failure of underwater cameras, disputes the reported cause, and recommends repairing the cameras.', 'It describes a robotic sensor, contrasts its cost with that of a biological organ, and argues that the organ is more efficient.', 'It introduces a biological sensor, describes an engineered analogue, and explains the value of comparing distributed readings.'],
    answer: 3,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Botanical gardens once circulated printed lists of seeds available for exchange. A surviving list might seem to be only an inventory, yet several lists viewed together can reveal when a plant entered a garden’s collection and which institutions offered the same species. The names printed in the lists can also preserve older classifications that botanists later revised. Thus, documents created to move seeds among gardens now help researchers trace the movement of both plants and botanical knowledge.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It states the broader historical significance of records whose original purpose was practical exchange.', 'It argues that botanical gardens should return to printed lists because digital records omit plant names.', 'It explains why botanists stopped revising classifications after gardens began exchanging seeds.', 'It suggests that most plants moved between gardens before any exchange lists were produced.'],
    answer: 0,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nWhen an exhibition addresses a community that is absent from a museum’s collection, a curator should explain that absence directly. A label can identify which objects were never collected and how earlier acquisition policies produced the gap. Otherwise, visitors may mistake a limited collection for a complete historical record.\n\nText 2\n\nAn empty display case can make a collection’s silence visible in a way that a label alone cannot. If the case is presented without an explanatory frame, however, visitors may read it as unfinished installation rather than deliberate evidence. Material absence becomes meaningful only when the exhibition gives viewers enough context to interpret it.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the proposal in Text 1?',
    options: ['By arguing that a written label necessarily conceals the effects of earlier collecting policies', 'By insisting that museums fill collection gaps before mentioning the communities affected by them', 'By agreeing that context is needed while adding that a physical display can communicate absence', 'By agreeing that visitors will interpret an empty case correctly even when no explanation accompanies it'],
    answer: 2,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nA constructed wetland designed to receive agricultural drainage can improve water quality. As water moves slowly through the wetland, plants take up some nitrogen and microorganisms convert some nitrate into gases. Monitoring should therefore focus on the amount of nitrate entering and leaving the wetland.\n\nText 2\n\nNitrate removal is an important measure of a constructed wetland’s performance, but it is not the only one. Design choices also influence whether birds and amphibians can use the site. Evaluators should measure water quality while also tracking habitat conditions and the species that colonize the wetland.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 argues that plants perform all nitrate removal, whereas Text 2 attributes that removal entirely to animals.', 'Text 1 emphasizes a water-quality function, whereas Text 2 proposes evaluating that function together with habitat value.', 'Text 1 considers wetlands receiving agricultural drainage, whereas Text 2 claims that such wetlands cannot support wildlife.', 'Text 1 recommends monitoring a wetland over time, whereas Text 2 rejects monitoring in favor of predicting results from its design.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Was measured describe la acción de los investigadores, pero resumed indica un cambio en la actividad del liquen después de añadir agua.',
    B: 'El pasaje no compara velocidades de fotosíntesis; contrasta su ausencia durante la desecación con su retorno tras la hidratación.',
    C: 'Remained stable implicaría continuidad, mientras el texto dice que antes de añadir agua casi no había fotosíntesis.',
    D: 'Correcta: resumed significa que la fotosíntesis comenzó de nuevo después de haber quedado suspendida durante el periodo seco.',
  }, fuenteHecho: 'Wu et al., PLOS ONE, recuperación fotosintética de costras de líquenes tras rehidratación: https://doi.org/10.1371/journal.pone.0172537' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Partial puede significar sesgado en otros contextos, pero aquí la falta de la hoja final hace que el registro no esté completo.',
    B: 'Correcta: el cuaderno muestra qué se intentó, pero no cómo terminó; por eso el registro es incompleto.',
    C: 'Favorable corresponde a mostrar preferencia por algo. El relojero evalúa cuánto contenido sobrevive, no su actitud hacia el diseño.',
    D: 'Fractional alude a una fracción matemática o proporcional; el texto habla de información ausente, no de una cantidad numérica.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: combinar imágenes permite revelar escritura que existe en el objeto pero no aparece en una fotografía normal.',
    B: 'Repossess exige que alguien recobre la propiedad de algo; los científicos no adquieren el mapa ni la nota.',
    C: 'Repeat sería producir de nuevo el contenido. El método hace visible la escritura existente, sin volver a redactarla.',
    D: 'Repair implicaría restaurar físicamente la nota; el texto subraya una técnica de imagen que no extrae material del mapa.',
  }, fuenteHecho: 'Library of Congress, Integrated Digital Imaging Systems: Hyperspectral Imaging: https://www.loc.gov/preservation/scientists/projects/hyperspec_imaging.html' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El archivo conserva audio y transcripción para compararlos; no declara que el texto escrito sea superior al sonido.',
    B: 'No se menciona que los hablantes originales rechazaran o aprobaran la transcripción.',
    C: 'Correcta: la tercera oración presenta la revisión comunitaria que corrige la sustitución de expresiones locales descrita justo antes.',
    D: 'Los miembros reconocen y preservan expresiones ya usadas; no inventan una variedad lingüística durante la revisión.',
  }, fuenteHecho: 'Escenario original informado por Smithsonian Institution, Engaging Students with Primary Sources, sobre audio, transcripción y patrones dialectales en historias orales: https://americanhistory.si.edu/sites/default/files/PrimarySources.pdf' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'El texto no enumera especies ni jerarquiza peces; explica una capacidad sensorial común y su aplicación técnica.',
    B: 'La visibilidad baja es una condición en la que el sistema ayuda, no una avería de cámaras que se investigue o repare.',
    C: 'No aparecen costes ni una comparación de eficiencia entre órgano y dispositivo.',
    D: 'Correcta: pasa de la línea lateral biológica al arreglo artificial y termina explicando qué se infiere al comparar sensores distribuidos.',
  }, fuenteHecho: 'Yang et al., Sensors, “Underwater Robot Detection System Based on Fish’s Lateral Line”: https://doi.org/10.3390/s18092912' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: la conclusión convierte listas prácticas de intercambio en evidencia para estudiar circulación de plantas y conocimiento.',
    B: 'El pasaje analiza documentos históricos; no compara su exhaustividad con registros digitales ni recomienda revivir el formato.',
    C: 'Las clasificaciones fueron revisadas después, y las listas preservan sus versiones anteriores; no detuvieron esos cambios.',
    D: 'El texto no fecha la mayor parte de los intercambios ni afirma que las listas surgieran después de ellos.',
  }, fuenteHecho: 'Biodiversity Heritage Library, “What’s Up with Seed Catalogs in BHL?”: https://blog.biodiversitylibrary.org/2015/03/whats-up-with-seed-catalogs-in-bhl' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 no rechaza las etiquetas; dice que una ausencia material necesita un marco explicativo para ser interpretada.',
    B: 'Ningún texto exige adquirir objetos antes de reconocer una laguna; ambos tratan cómo hacerla comprensible.',
    C: 'Correcta: Text 2 comparte la necesidad de contexto de Text 1 y añade que un recurso material, como la vitrina vacía, puede hacer visible el silencio.',
    D: 'Text 2 afirma expresamente que sin explicación la vitrina puede parecer una instalación inacabada.',
  }, fuenteHecho: 'Textos curatoriales originales, informados por principios generales de transparencia sobre colecciones.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Text 1 menciona plantas y microorganismos; Text 2 no atribuye la remoción de nitrato a animales.',
    B: 'Correcta: Text 1 centra la evaluación en entradas y salidas de nitrato, mientras Text 2 conserva esa medida y añade hábitat y especies.',
    C: 'Text 2 sostiene que aves y anfibios sí pueden usar estos sitios; no niega compatibilidad con drenaje agrícola.',
    D: 'Ambos proponen mediciones. Text 2 amplía qué observar, en vez de sustituir el seguimiento por predicciones de diseño.',
  }, fuenteHecho: 'US EPA, Guiding Principles for Constructed Treatment Wetlands: https://www.epa.gov/wetlands/guiding-principles-constructed-treatment-wetlands-providing-water-quality-and-wildlife' },
]
