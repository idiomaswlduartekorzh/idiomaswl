import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Information and Ideas · Set 5 M1 · q09–q15.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves A, C, B, D, A, C, D
 * fueron reservadas antes de redactar.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'A weaving draft is a gridded notation that records relationships among a loom’s threads and controls. One part shows the order of warp threads; other parts indicate how those threads connect to shafts and which shafts rise for each pass of the weft. A weaver can therefore study the draft before setting up the loom, anticipate the repeated interlacing, and reproduce the structure with different colors or fibers.',
    text: 'Which choice best states the main idea of the text?',
    options: ['A weaving draft represents structural instructions that can guide the production of a woven pattern.', 'A weaving draft specifies the only colors and fibers that can be used to reproduce a historical textile.', 'Weavers use gridded notation mainly to record how long a finished textile took to produce.', 'Modern looms have made drafts unnecessary because shaft movements can no longer be controlled by weavers.'],
    answer: 0,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Archerfish hunt insects above the water by striking them with jets from below. High-speed recordings show that a fish changes how quickly it opens and closes its mouth as a shot develops. Those changes shape the jet so that its fastest water catches up with earlier water near the target. Because the timing varies with target distance, the forceful part of the jet can arrive where the prey is rather than at one fixed distance.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Archerfish rely on insects to move closer before releasing water at a single unchanging speed.', 'Archerfish compensate for target distance by swimming upward until their mouths are directly below the prey before producing a forceful jet.', 'Archerfish adjust the timing of mouth movements to shape an effective jet for a target’s distance.', 'Archerfish use high-speed vision only after a jet has missed in order to locate the fallen water.'],
    answer: 2,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'Nadia turned the old coat inside out beneath the workroom lamp. The left sleeve had been shortened years ago, but whoever made the change had not cut away the excess wool. Instead, the cloth was folded beneath the lining and held with broad stitches that could be removed without damaging the fabric. Nadia smiled and reached for her smallest scissors. “You expected this sleeve to be lengthened again,” she said to the absent tailor.',
    text: 'Which quotation from the text best supports the claim that the earlier tailor planned for a later alteration?',
    options: ['“Nadia turned the old coat inside out beneath the workroom lamp. The left sleeve had been shortened years ago”', '“held with broad stitches that could be removed without damaging the fabric”', '“Nadia smiled and reached for her smallest scissors.”', '“The left sleeve had been shortened years ago”'],
    answer: 1,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'A historian argues that a Baltimore and Ohio Railroad dining-car menu allowed passengers to assemble a meal from individually ordered dishes rather than requiring every passenger to buy the same fixed set of courses.',
    text: 'Which quotation from the menu most directly supports the historian’s argument?',
    options: ['“Dining Car and Commissary Department, Baltimore, Maryland”', '“Roast Turkey, Cranberry Jelly”', '“Assorted Bread, Dinner Rolls, with Butter”', '“A La Carte Menus,” followed by separate dishes, each with its own price'],
    answer: 3,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'Researchers grew wild-type plants and plants with a disrupted ABA-signaling gene under ambient and elevated carbon dioxide (CO₂). The table reports a stomatal-density index; each group’s ambient value is set to 100.\n\n| Plant group | Ambient CO₂ | Elevated CO₂ |\n|---|---:|---:|\n| Wild type | 100 | 72 |\n| Disrupted ABA signaling | 100 | 98 |',
    text: 'Which choice most effectively uses data from the table to support the conclusion that ABA signaling contributes to the stomatal-density response to elevated CO₂?',
    options: ['The wild-type index fell by 28 points under elevated CO₂, whereas the disrupted-signaling index fell by only 2 points.', 'Both groups began at 100, so the higher-CO₂ condition affected them equally.', 'Under elevated CO₂, the disrupted-signaling plants had an index 26 points lower than the wild-type plants did.', 'The wild-type index was higher under elevated CO₂ than under ambient CO₂, while the disrupted-signaling index stayed at 100.'],
    answer: 0,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'During the first rehearsal, Tomas delivered the final line and crossed immediately to the door. At the next rehearsal, he stopped after the line, looked toward the empty chair at center stage, and only then began to cross. The director did not ask him to remove the pause. Instead, she shifted the light so that the chair remained visible until Tomas reached the door.',
    text: 'Which choice most logically completes the text?',
    options: ['The director believed that Tomas had forgotten where the door was located and changed the lighting to guide him across the stage.', 'The empty chair was going to be removed before the next rehearsal began.', 'The director interpreted Tomas’s pause as meaningful and adjusted the staging around the chair to reinforce it.', 'Tomas had been instructed from the start to cross the stage at exactly the same speed.'],
    answer: 2,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers arranged groups of mallard ducks in rows and recorded their eye state and brain activity during sleep. Ducks at exposed ends of a row spent a larger share of sleep with one hemisphere awake than ducks flanked by neighbors did. The exposed ducks also tended to direct the eye connected to the awake hemisphere away from the group, and they responded rapidly when a threatening image appeared to that eye. These findings suggest that ______',
    text: 'Which choice most logically completes the text?',
    options: ['mallards at the center of a group remain fully awake whenever birds at the ends fall asleep.', 'closing both eyes allows exposed mallards to detect visual threats more quickly than keeping one eye open and directing it away from the group does.', 'unihemispheric sleep prevents mallards from changing their vigilance according to their position in a group.', 'mallards can increase one-sided vigilance during sleep when their position leaves them more exposed to possible threats.'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: el texto explica que la notación representa el montaje y la secuencia con los que se produce una estructura repetida.',
    B: 'La última oración permite cambiar colores o fibras; el borrador no impone una única selección material.',
    C: 'No se registran horas de trabajo ni duración de producción, sino relaciones entre hilos y controles del telar.',
    D: 'El pasaje presenta la notación como guía útil y afirma que los movimientos de los ejes sí pueden planificarse.',
  }, fuenteHecho: 'The Metropolitan Museum of Art, “Weaving Abstraction”, sobre draft notation y estructura tejida: https://resources.metmuseum.org/resources/metpublications/pdf/Weaving_Abstraction.pdf' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'El pez modifica la dinámica del chorro; no espera que la presa se acerque ni usa una velocidad invariable.',
    B: 'La adaptación descrita ocurre en la apertura y cierre de la boca, no en nadar hasta quedar junto al insecto.',
    C: 'Correcta: la coordinación temporal de la boca moldea el chorro para que su parte más fuerte llegue a distintas distancias.',
    D: 'Las grabaciones son una herramienta del equipo investigador; el pasaje no atribuye al pez una visión de alta velocidad posterior al fallo.',
  }, fuenteHecho: 'Vailati et al., Current Biology, “Archerfish Actively Control the Hydrodynamics of Their Jets”: https://doi.org/10.1016/j.cub.2014.07.059' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'La lámpara y la fecha aproximada sitúan el examen, pero no muestran que la intervención anterior fuera reversible por diseño.',
    B: 'Correcta: usar puntadas removibles sin dañar la tela es una decisión concreta que facilita alargar la manga después.',
    C: 'La sonrisa y las tijeras muestran la reacción actual de Nadia, no el plan de quien alteró antes el abrigo.',
    D: 'Saber que la manga fue acortada no basta para concluir que se anticipó una modificación futura.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'El nombre del departamento identifica al operador, pero no muestra cómo se podían pedir o combinar platos.',
    B: 'Un plato nombrado sin precio ni contexto no demuestra por sí solo que pudiera ordenarse de manera independiente.',
    C: 'La descripción de panes tampoco establece la modalidad de compra si se separa del encabezado y los precios.',
    D: 'Correcta: “A La Carte” y los precios individuales son evidencia directa de que cada plato podía pedirse por separado.',
  }, fuenteHecho: 'Culinary Institute of America Digital Collections, Baltimore and Ohio Dining Car Service, Royal Blue dinner menu: https://ciadigitalcollections.culinary.edu/digital/collection/p16940coll1/id/4712/' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: el contraste de una caída de 28 puntos frente a solo 2 muestra que la respuesta al CO₂ elevado se redujo al alterar la señalización.',
    B: 'Igualdad en la condición ambiente no implica respuestas iguales; los valores elevados divergen en 26 puntos.',
    C: 'La dirección está invertida: con CO₂ elevado, el índice alterado es 98 y el silvestre 72.',
    D: 'El silvestre baja de 100 a 72 y el alterado queda en 98, no exactamente en 100.',
  }, fuenteHecho: 'Tabla pedagógica original; relación cualitativa verificada en Chater et al., Current Biology, respuesta de densidad estomática al CO₂ y señalización ABA: https://pmc.ncbi.nlm.nih.gov/articles/PMC4612465/' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Tomas alcanza la puerta y el cambio de luz se centra en la silla; nada indica desorientación espacial.',
    B: 'La directora mantiene la silla visible durante el cruce, señal de que la integra en vez de retirarla.',
    C: 'Correcta: al conservar el silencio y reforzar visualmente la silla, la directora adopta la elección de Tomas como parte expresiva de la escena.',
    D: 'El texto contrasta un cruce inmediato con otro posterior a una pausa, no una instrucción de velocidad fija.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'El estudio compara estados de sueño según posición; no informa que las aves centrales permanezcan siempre despiertas.',
    B: 'La respuesta rápida ocurrió con el ojo conectado al hemisferio despierto, no con ambos ojos cerrados.',
    C: 'Las diferencias entre extremos y centro demuestran flexibilidad según el riesgo, no incapacidad de cambiar la vigilancia.',
    D: 'Correcta: más sueño unihemisférico, el ojo orientado hacia afuera y la respuesta a la amenaza apoyan vigilancia unilateral ajustada a la exposición.',
  }, fuenteHecho: 'Rattenborg, Lima y Amlaner, “Facultative control of avian unihemispheric sleep under the risk of predation”: https://doi.org/10.1016/S0166-4328(99)00070-4' },
]
