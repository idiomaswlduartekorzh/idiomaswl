import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Expression of Ideas · Set 5 M2 exigente · q23–q27.
 *
 * Borrador editorial: el catálogo no lo sirve. Claves reservadas A, C, D, B, A.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'A student took the following notes about a catalog search test:\n\n- 48 participants completed the same search task with a basic catalog and with a version that added date, format, and creator facets.\n- With basic search, the median first results page contained 6 items participants marked irrelevant.\n- With facets, the median was 2 irrelevant items.\n- 29 participants completed the task within four minutes using basic search; 41 did so using facets.\n\nThe student wants to summarize the test results without making a claim about all users or catalogs.',
    text: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['In this test, facets reduced median irrelevant results from 6 to 2 and raised four-minute completions from 29 to 41.', 'All catalog users prefer date, format, and creator facets because those controls eliminate irrelevant results.', 'The basic catalog was inaccessible: only 29 of the 48 participants were able to complete any search task with it.', 'Date facets alone caused every participant to find the correct item faster than format or creator facets did.'],
    answer: 0,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'A student took the following notes about bacterial-cellulose films:\n\n- A study compared a control film containing no beeswax with a film containing beeswax equal to 40% of the dry bacterial-cellulose mass.\n- The water contact angle increased from 53° in the control to 124° in the 40% film, indicating greater surface hydrophobicity.\n- At 40% beeswax, elongation at break increased by about 38%.\n- Tensile strength decreased by about one-quarter.\n\nThe student wants to emphasize a trade-off observed at the highest beeswax concentration.',
    text: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The control film had a 53° water contact angle and contained no beeswax at all.', 'Adding beeswax improved every measured property of the bacterial-cellulose film without a disadvantage.', 'At 40% beeswax, hydrophobicity and elongation rose, but tensile strength fell about one-quarter.', 'Because bacterial cellulose is dry, a 124° contact angle proves that the film is suitable for every packaging use.'],
    answer: 2,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'A student took the following notes about two drawing aids:\n\n- A camera lucida uses a prism so that a user can see a subject and the drawing surface in the same field of view.\n- The user can then mark corresponding points and contours on the paper.\n- A pantograph has linked arms connecting a tracing point to a drawing point.\n- As the tracing point follows an existing figure, the drawing point reproduces it at the same or a different scale.\n\nThe student wants to compare how the two devices assist with transferring an outline.',
    text: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The camera lucida was created only after inventors had abandoned every mechanical drawing instrument.', 'A pantograph optically projects a subject onto paper, whereas a camera lucida copies it with linked wooden arms.', 'Both devices guarantee identical scale and accuracy regardless of the user’s setup, hand, or positioning.', 'Both aid copying: one aligns subject and paper optically; the other transfers motion through linked arms.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'A mussel cannot prevent the surrounding water from accelerating. ______ it can adjust its attachment investment: in one experiment, juvenile mussels previously exposed to higher water flow produced more byssal threads than mussels exposed to lower flow.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'However,', 'Similarly,', 'Therefore,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'In two drafts of a poem, Nera Sol kept every comma, colon, and period in the same place. ______ recordings of the two drafts sounded markedly different: five line endings had shifted, so pauses at those positions in the first version sometimes disappeared within the syntax of the second.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Nevertheless,', 'For example,', 'Likewise,', 'In other words,'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: compara las dos métricas observadas y limita explícitamente la conclusión a esta prueba.',
    B: 'Generaliza a todos los usuarios y afirma eliminación total, aunque la mediana con facetas fue 2 y no 0.',
    C: 'Veintinueve terminaron dentro de cuatro minutos; las notas no dicen que los demás fueran incapaces de terminar.',
    D: 'Las facetas se ofrecieron juntas y los datos no aíslan el efecto de la fecha ni reportan éxito de cada participante.',
  }, fuenteHecho: 'Prueba, participantes y datos originales sintéticos.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'ciencia', razones: {
    A: 'La frase usa un dato, pero omite el contraste entre las propiedades del film con 40% de cera.',
    B: 'La resistencia a la tracción disminuyó, por lo que no todas las propiedades mejoraron.',
    C: 'Correcta: combina la mayor hidrofobicidad y elongación con la caída de resistencia que constituye el trade-off.',
    D: 'El ángulo informa hidrofobicidad superficial bajo la prueba; no demuestra idoneidad universal de empaque.',
  }, fuenteHecho: 'Indriyati et al., “Enhanced Hydrophobicity and Elasticity of Bacterial Cellulose Films by Addition of Beeswax”: https://doi.org/10.1002/masy.201900174' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'historia', razones: {
    A: 'Las notas no establecen esa cronología ni afirman el abandono de otros instrumentos.',
    B: 'Invierte los mecanismos: la camera lucida es óptica y el pantógrafo usa brazos articulados.',
    C: 'Ambos dependen de operación y configuración; las notas no garantizan precisión idéntica.',
    D: 'Correcta: identifica la función compartida y contrasta con precisión el mecanismo de cada dispositivo.',
  }, fuenteHecho: 'Smithsonian National Museum of American History, Camera Lucida: https://americanhistory.si.edu/collections/object/nmah_1184286; Smithsonian, Pantographs: https://www.si.edu/spotlight/pantographs' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'ciencia', razones: {
    A: 'La segunda oración no ejemplifica la imposibilidad de controlar el agua; presenta una capacidad que la contrasta.',
    B: 'Correcta: however contrapone una condición externa incontrolable con una respuesta de inversión biológica.',
    C: 'Similarly requeriría dos respuestas paralelas, pero la primera oración describe una limitación.',
    D: 'La incapacidad de frenar el agua no implica por sí sola el resultado experimental como consecuencia necesaria.',
  }, fuenteHecho: 'Alfaro, Aquaculture, “Byssal attachment of juvenile mussels, Perna canaliculus, affected by water motion and air bubbles”: https://doi.org/10.1016/j.aquaculture.2005.11.059' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Correcta: nevertheless marca la concesión entre puntuación estable y una realización sonora que sí cambió.',
    B: 'La grabación no ejemplifica estabilidad; introduce el resultado contrastante de los nuevos cortes.',
    C: 'Likewise indicaría semejanza entre los sonidos, cuando el texto subraya que fueron diferentes.',
    D: 'La segunda oración no reformula la estabilidad de los signos: introduce el resultado contrastante de otros cortes.',
  }, fuenteHecho: 'Poeta, borradores y grabaciones ficticios; texto original.' },
]
