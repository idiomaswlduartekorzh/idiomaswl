import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 4 M2 estándar · q23–q27. Claves: C, A, D, B, C. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A library tested two directory signs at an unfamiliar branch.\n• Version T listed floor and room names as text.\n• Version I used the same text plus distinct icons and color bands.\n• Sixty participants were assigned to use one version while locating three rooms.\n• Wrong turns occurred on 18% of routes with T and 7% with I.\n• The test did not examine behavior during later visits.\n• The signs, sample, and results are original to this question.',
    text: 'The student wants to compare wayfinding errors with the two sign versions without extending the result beyond the test. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Because Version I included icons and colors, it eliminated wrong turns at unfamiliar libraries permanently.', 'Version T displayed floor and room names, whereas Version I added icons and color bands to the same text.', 'Version I had fewer wrong turns than T in the test (7% versus 18%); later visits were not studied.', 'Sixty participants visited a library branch and attempted to locate three rooms using directory signs.'],
    answer: 2,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers made biodegradable films from modified corn starch and chitosan.\n• They measured water-vapor permeability (WVP); lower WVP indicates a stronger barrier.\n• The 100% starch film had a WVP of 26.20 × 10⁻¹¹ g·m⁻¹·s⁻¹·Pa⁻¹.\n• A film containing 25% starch and 75% chitosan had a WVP of 0.55 × 10⁻¹¹ g·m⁻¹·s⁻¹·Pa⁻¹.\n• The study tested other properties, but they are not relevant to this comparison.',
    text: 'The student wants to compare the two films’ barriers to water vapor. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['At 0.55 rather than 26.20 in the stated units, the chitosan-rich mixture presented the stronger vapor barrier.', 'The starch-only film provided the stronger barrier because its WVP value was the larger of the two measurements.', 'Both films had equal water-vapor barriers even though the researchers reported different WVP values.', 'Adding chitosan made the film impermeable to every gas because its measured WVP reached exactly zero.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Autochrome became commercially available in 1907.\n• An Autochrome plate formed color additively with microscopic starch grains dyed red, green, and blue.\n• Kodachrome film first went on sale in 1935.\n• Kodachrome used three light-sensitive emulsion layers.\n• During processing, cyan, magenta, and yellow dyes formed a subtractive color image.\n• Both processes produced color transparencies.',
    text: 'The student wants to contrast how the earlier and later processes produced color. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Autochrome and Kodachrome were both color transparencies, and each became commercially available before 1910.', 'Kodachrome relied on dyed starch grains, whereas Autochrome formed cyan, magenta, and yellow dyes during processing.', 'Autochrome became available in 1907, and Kodachrome was sold in 1935 after three light-sensitive layers had been invented.', 'Earlier Autochrome used a dyed-starch color screen; later Kodachrome formed subtractive dyes within layered film.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'At two intertidal sites, researchers constructed oyster reefs between open water and a marsh edge. The shells and spaces within a reef interrupt the motion of incoming water. ______ sensors behind the restored reefs measured up to 40% less wave energy than sensors at control sites without reefs.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Nevertheless,', 'Consequently,', 'Previously,', 'Similarly,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'A novelist drafted a journey in the first person, allowing the narrator to explain every decision directly. During revision, she shifted several chapters to the third-person perspective of a minor character who misunderstood the narrator’s plans. The change risked making the narrator’s motives less explicit. ______ it allowed readers to detect a conflict between what the narrator intended and what the other character believed.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'Therefore,', 'Nevertheless,', 'For example,'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Convierte una reducción observada en eliminación total y permanente, algo que la prueba no midió.',
    B: 'Compara el diseño de las señales, pero omite los porcentajes de errores que exige el objetivo.',
    C: 'Correcta: presenta dirección y magnitud de la diferencia y conserva el límite sobre visitas posteriores.',
    D: 'Resume muestra y tarea sin identificar versiones ni comparar sus tasas de giros equivocados.',
  }, fuenteHecho: 'Biblioteca, señales, muestra y resultados originales.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Correcta: compara las dos cifras en las unidades ya declaradas y aplica la relación entre menor WVP y mayor barrera.',
    B: 'Invierte la interpretación: una permeabilidad mayor representa una barrera menor al vapor.',
    C: 'Las cifras difieren ampliamente y las notas explican cómo esa diferencia se relaciona con la barrera.',
    D: 'El estudio midió vapor de agua, no todos los gases, y el valor del film mezclado fue 0,55, no cero.',
  }, fuenteHecho: 'Velázquez-Contreras et al., valores de permeabilidad de películas de almidón modificado y quitosano: https://pmc.ncbi.nlm.nih.gov/articles/PMC8708082/' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'historia', razones: {
    A: 'Kodachrome salió en 1935, no antes de 1910, y la opción no contrasta los mecanismos de color.',
    B: 'Intercambia los procesos: Autochrome usó el mosaico de almidón y Kodachrome generó tintes durante el revelado.',
    C: 'Incluye fechas, pero no explica la diferencia entre formación aditiva y sustractiva solicitada.',
    D: 'Correcta: contrasta el filtro aditivo de granos teñidos con los tintes sustractivos del film multicapa posterior.',
  }, fuenteHecho: 'National Science and Media Museum, historia y funcionamiento de Autochrome y Kodachrome: https://www.scienceandmediamuseum.org.uk/objects-and-stories/history-colour-photography' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Nevertheless marcaría contraste, pero la medición concuerda con el mecanismo de interrupción descrito.',
    B: 'Correcta: Consequently presenta la menor energía medida como resultado coherente con la presencia del arrecife.',
    C: 'Previously establece anterioridad temporal; la oración informa un resultado del mismo estudio.',
    D: 'Similarly requiere un caso paralelo anterior, no una relación entre mecanismo y medición.',
  }, fuenteHecho: 'Kachmar et al., arrecifes restaurados y reducción de hasta 40 % de energía de oleaje frente a controles: https://repository.library.noaa.gov/view/noaa/74069' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Similarly anunciaría una consecuencia paralela, pero antes se presenta un riesgo y después una ventaja opuesta.',
    B: 'Therefore haría de la ventaja una consecuencia necesaria de perder claridad, relación que el texto no sostiene.',
    C: 'Correcta: Nevertheless introduce el beneficio conseguido a pesar del riesgo de volver menos explícitos los motivos.',
    D: 'For example debería introducir una instancia del riesgo anterior; la última oración presenta un contrapeso.',
  }, fuenteHecho: 'Novela, perspectivas, revisión y efectos narrativos originales.' },
]
