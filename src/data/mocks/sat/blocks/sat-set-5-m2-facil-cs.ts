import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Craft and Structure · Set 5 M2 estándar · q01–q08.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves B, D, A, C, B, A, D, C
 * fueron reservadas antes de redactar y dejan dos respuestas por letra en el bloque.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Mudskipper eggs develop in a chamber beneath a mudflat, where the surrounding water contains little oxygen. During low tide, the guarding fish carries mouthfuls of fresh air into the chamber. By repeating these trips as oxygen is used, the fish maintains an air supply around the eggs until they are ready to hatch.',
    text: 'As used in the text, what does the word "maintains" most nearly mean?',
    options: ['Measures precisely', 'Keeps available', 'Hides from view', 'Changes into another form'],
    answer: 1,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'When luthier Noa Vale repaired an old violin, she smoothed the new wooden patch but left the faint chisel marks elsewhere inside the instrument untouched. Those marks recorded how an earlier maker had worked. By preserving them, Vale kept evidence that a perfectly polished interior would have erased.',
    text: 'As used in the text, what does the word "preserving" most nearly mean?',
    options: ['Displaying prominently', 'Interpreting correctly', 'Copying onto a new surface', 'Keeping unchanged'],
    answer: 3,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'In ancient Mesopotamia, a carved cylinder seal could be rolled across wet clay attached to a jar, basket, or tablet. The resulting impressions identified an owner or responsible authority and could reveal whether a container had been opened. Because the clay hardened, many of these impressions survived even when the objects once secured by them did not.',
    text: 'As used in the text, what does the word "impressions" most nearly mean?',
    options: ['Marks made by pressure', 'Personal opinions', 'Strong emotional effects', 'Approximate calculations'],
    answer: 0,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'A comics artist can influence a reader’s sense of time without drawing a clock. In one sequence, the artist places the same borderless panel of an empty platform between three panels showing a traveler waiting for a train. Although nothing changes within the repeated image, each recurrence asks the reader to pause before moving forward. The apparently static platform therefore makes the wait feel prolonged.',
    text: 'Which choice best describes the function of the second sentence in the text as a whole?',
    options: ['It disputes the opening claim by introducing a sequence in which a clock is necessary.', 'It explains why the traveler leaves the platform before the train arrives.', 'It supplies a concrete example of the technique that the following sentences explain.', 'It establishes that readers always spend an equal amount of time on every comics panel.'],
    answer: 2,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Barn owl wings have a comb-like structure along the leading edge, one of several features associated with quiet flight. To isolate the comb’s contribution, researchers measured prepared wings in a wind tunnel both with and without the structure. At high angles of attack, the acoustic measurements indicated a small reduction in gliding noise when the comb was present. The result identifies a limited effect of one feature rather than explaining the owl’s quiet flight in full.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It presents two owl species and argues that only one of them can glide quietly.', 'It introduces a wing feature, describes a controlled comparison, and qualifies the result.', 'It reports a field observation and then attributes that observation to faulty acoustic equipment.', 'It lists several sources of aircraft noise and ranks them from least to most important.'],
    answer: 1,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Sanborn fire insurance maps recorded detailed information about buildings, including construction materials indicated by colors and symbols. A reader consulting a map’s key could distinguish, for example, a wood-frame structure from one built of brick. Today, researchers can compare maps from different years to trace when a block’s buildings were replaced or altered. A system created for assessing fire risk thus also supports the study of urban change.',
    text: 'Which choice best describes the function of the third sentence in the text as a whole?',
    options: ['It shows how the maps’ original coding supports later historical research.', 'It argues that the maps became less detailed as cities replaced wooden buildings.', 'It identifies a method insurers used to prevent construction materials from changing.', 'It suggests that researchers should ignore a map’s key when comparing different editions.'],
    answer: 0,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nWhen missing sections of an ancient vessel are filled during conservation, the new material should remain clearly distinguishable from the original ceramic. Visible contrast prevents a viewer from mistaking a modern reconstruction for surviving evidence, even if that contrast interrupts the vessel’s pattern.\n\nText 2\n\nA repair must be documented and detectable under close examination. Yet a sharply contrasting fill can dominate the intact portions when the vessel is viewed in a gallery. A conservator may instead match the pattern at normal viewing distance while using a subtly different texture and detailed records to identify the repair.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the position in Text 1?',
    options: ['By arguing that repaired vessels should never be displayed in galleries', 'By denying that viewers need any reliable method for distinguishing modern repairs from surviving original material', 'By agreeing that every fill should remain visually dominant from any viewing distance', 'By agreeing that repairs must be identifiable but questioning whether strong contrast is always best'],
    answer: 3,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nResearchers measuring airflow in closed mounds of the termite Odontotermes obesus found that outer passages warmed and cooled faster than a central passage. The resulting temperature differences drove circulating air one way by day and the reverse way at night. At the field site, wind did not account for the measured bulk flow.\n\nText 2\n\nOther termite species build open mounds whose channels connect with outside air at several heights. Studies of these systems indicate that wind can draw air from upper openings while replacement air enters through lower ones. The mound’s open architecture therefore permits an external breeze to contribute directly to ventilation.',
    text: 'Which choice best describes the relationship between the two texts?',
    options: ['Text 2 rejects the measurements in Text 1 because all termite mounds share the same internal structure.', 'Text 2 claims that temperature differences stop ventilation in the closed mounds described in Text 1.', 'Text 2 describes a mechanism for a different mound type that is compatible with Text 1’s result.', 'Text 2 restates Text 1’s claim that wind drives ventilation in every mound.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El pasaje no describe una medición precisa: describe la reposición repetida del aire mientras se consume oxígeno.',
    B: 'Correcta: los viajes del pez mantienen, es decir, conservan disponible, el aire que rodea los huevos.',
    C: 'La cámara está bajo el lodo, pero maintains se refiere a sostener el suministro, no a ocultarlo.',
    D: 'El pez lleva aire fresco a la cámara; no transforma el aire en otra sustancia.',
  }, fuenteHecho: 'Ishimatsu et al., Nature, “Mudskippers store air in their burrows”: https://doi.org/10.1038/34560' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'literatura', razones: {
    A: 'Las marcas están dentro del violín y no se dejan allí para volverlas prominentes ante el público.',
    B: 'Vale comprende el valor de las marcas, pero preserving nombra lo que hace con ellas, no la calidad de su interpretación.',
    C: 'La lutier no transfiere las marcas a otra superficie; decide no eliminarlas del instrumento.',
    D: 'Correcta: preservar las marcas es conservarlas en la condición en que se encuentran.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'historia', razones: {
    A: 'Correcta: las impresiones son las marcas físicas que el cilindro tallado deja al presionarse y rodarse sobre la arcilla.',
    B: 'Aunque impression puede significar opinión, aquí produce un objeto sobre arcilla y puede sobrevivir físicamente.',
    C: 'El texto trata de identificación y control de recipientes, no del efecto emocional del diseño.',
    D: 'Las marcas podían acompañar registros, pero la palabra no designa un cálculo aproximado.',
  }, fuenteHecho: 'The Metropolitan Museum of Art, uso de sellos cilíndricos e impresiones en arcilla: https://www.metmuseum.org/art/collection/search/326721' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'La secuencia confirma que una imagen repetida puede afectar el tiempo percibido sin dibujar un reloj.',
    B: 'El viajero sigue esperando; la oración no relata que abandone el lugar.',
    C: 'Correcta: la segunda oración concreta la técnica y las oraciones siguientes explican la pausa y la sensación de espera que produce.',
    D: 'El ejemplo muestra repetición deliberada, pero no establece una regla universal sobre el tiempo dedicado a cada panel.',
  }, fuenteHecho: 'Escenario y análisis originales.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Solo se menciona la lechuza común y no se compara la capacidad de dos especies.',
    B: 'Correcta: el texto presenta el peine, resume el ensayo con y sin él y limita la conclusión a una reducción pequeña bajo ciertas condiciones.',
    C: 'El túnel de viento y las mediciones acústicas son el método previsto, no una avería descubierta después.',
    D: 'El objeto es una característica del ala del búho; no se enumeran ni ordenan fuentes de ruido aeronáutico.',
  }, fuenteHecho: 'Geyer et al., “Silent owl flight: The effect of the leading edge comb”: https://doi.org/10.1177/1475472X17706131' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'historia', razones: {
    A: 'Correcta: comparar ediciones para rastrear reemplazos muestra un uso histórico actual de los datos codificados originalmente para seguros.',
    B: 'La oración no describe una pérdida de detalle ni establece una tendencia general en los materiales.',
    C: 'Los mapas registraban cambios; no impedían que propietarios o constructores los hicieran.',
    D: 'La segunda oración subraya la utilidad de la clave, de modo que la comparación no invita a ignorarla.',
  }, fuenteHecho: 'Library of Congress, guía para interpretar mapas Sanborn: https://guides.loc.gov/fire-insurance-maps/sanborn-interpreting' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 analiza explícitamente cómo debe verse un objeto en galería, por lo que no rechaza su exhibición.',
    B: 'Text 2 exige que la reparación pueda detectarse de cerca y que quede documentada.',
    C: 'La segunda voz sostiene precisamente que un contraste muy fuerte puede dominar indebidamente el material intacto.',
    D: 'Correcta: ambas voces protegen la identificación de lo nuevo, pero Text 2 propone textura y registros en vez de contraste fuerte en toda distancia.',
  }, fuenteHecho: 'Textos curatoriales originales informados por AIC, Code of Ethics and Guidelines for Practice: https://www.culturalheritage.org/about-conservation/code-of-ethics' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Text 2 comienza con otras especies y una arquitectura abierta; no supone que todos los termiteros sean estructuralmente iguales.',
    B: 'La segunda voz no afirma que las diferencias de temperatura detengan el flujo observado en montículos cerrados.',
    C: 'Correcta: el viento puede impulsar un sistema abierto aunque las oscilaciones térmicas expliquen el flujo medido en el sistema cerrado de Text 1.',
    D: 'Text 1 descarta el viento como explicación del flujo que midió, y ninguno de los textos universaliza un solo mecanismo.',
  }, fuenteHecho: 'King et al., PNAS, ventilación por oscilaciones térmicas en mounds cerrados: https://doi.org/10.1073/pnas.1423242112; Vesala et al., Ecological Entomology, comparación entre sistemas cerrados y abiertos: https://doi.org/10.1111/een.13267' },
]
