import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Information and Ideas · Set 5 M2 estándar · q09–q15.
 *
 * Borrador editorial: el catálogo no lo sirve. Las claves D, B, C, A, D, C, A
 * fueron reservadas antes de redactar.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'When a museum formally adds an object to its permanent collection, it assigns the object a unique accession number. That number appears both on or near the object and in records about its acquisition, condition, location, and use. Even if the object moves to another storage room or its descriptive title changes, the stable number allows staff to identify which records belong to it.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Museums replace accession numbers whenever objects are moved to new storage rooms.', 'An accession number describes an object so completely that other collection records are unnecessary.', 'Accession numbers are assigned mainly to indicate the order in which objects should appear in an exhibition.', 'A stable accession number identifies an object and links its collection records over time.'],
    answer: 3,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Manta rays feed on plankton while seawater flows through arrays of leaflike lobes derived from gill structures. Models of this apparatus show that particles can strike the front of a lobe and ricochet away from the pore behind it, remaining in the ray’s mouth as water exits. Because the particles need not lodge in the pores, the apparatus can separate particles smaller than those openings while resisting clogs.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Manta rays close their gill openings while feeding so that neither water nor plankton can leave the mouth.', 'The modified gill apparatus redirects particles away from pores, filtering without simple sieving.', 'Only particles larger than every opening in a manta ray’s filter can remain inside the animal’s mouth.', 'Manta rays use leaflike lobes to grind plankton after water and food have passed together through the gill pores.'],
    answer: 1,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'Inez found no nail heads on the cedar chest, but she noticed two slim pegs beneath its lowest rail. She tapped each peg from its narrow end. The pegs slid free, allowing the rail and then the damaged side panel to lift away without splitting either piece. Inside the joint, a penciled arrow pointed toward the narrow end of each peg. “So the next repairer would know where to begin,” Inez said.',
    text: 'Which quotation from the text best supports the claim that the chest’s maker intended the joint to be taken apart later?',
    options: ['“Inez found no nail heads on the cedar chest”', '“she noticed two slim pegs beneath its lowest rail”', '“a penciled arrow pointed toward the narrow end of each peg”', '“the damaged side panel [lifted] away without splitting either piece”'],
    answer: 2,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'For a classroom exercise, a postal historian created a facsimile of a 1910 Dead Letter Office routing label. The historian claims that the label documents a sequence of two unsuccessful attempts to forward one envelope rather than a single final rejection.',
    text: 'Which quotation from the facsimile label most directly supports the historian’s claim?',
    options: ['“Forwarded: 17 Harbor St., May 4—no such number; try 62 Pine Ave., May 11—unclaimed”', '“Dead Letter Office, United States Post Office Department, Washington, DC, routing section”', '“Return postage due: 2 cents; payment not received”', '“Paper routing label, printed in black ink and affixed over the envelope flap”'],
    answer: 0,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A student saturated circular cushions of one moss species, allowed excess water to drain, and exposed them to the same airflow for six hours. All cushions had the same surface area. The table shows the mean water remaining in each group.\n\n| Cushion depth | Water remaining after 6 hours |\n|---|---:|\n| 2 cm | 18 g |\n| 4 cm | 34 g |\n| 6 cm | 51 g |',
    text: 'Which choice most effectively uses data from the table to support the conclusion that, under the conditions tested, deeper moss cushions retained more water after six hours?',
    options: ['The 2 cm cushions retained 18 g of water, proving that shallow moss cushions cannot lose water.', 'The 4 cm cushions retained 34 g, exactly twice the amount retained by the 2 cm cushions.', 'The 6 cm cushions began the experiment with 51 g more water than the 2 cm cushions did.', 'The 6 cm cushions retained 51 g of water, compared with 18 g retained by the 2 cm cushions.'],
    answer: 3,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'Poet Liora Sen drafted a poem on twelve index cards, one line per card. She repeatedly rearranged the cards into groups of three, testing different paths through the images. Yet after each rearrangement, she moved every card ending with the word “still” to the third position in its group. Her notebooks do not explain the decision, but the repeated placement suggests that ______',
    text: 'Which choice most logically completes the text?',
    options: ['Sen considered the order of all twelve cards unimportant and selected each group’s third position at random.', 'the word “still” appeared only once in the complete twelve-line draft.', 'Sen preserved a recurring group endpoint while allowing the images to change order.', 'the final poem must have been printed on index cards rather than on a continuous page.'],
    answer: 2,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'In a planetarium, researchers measured how directly nocturnal dung beetles rolled under different projected skies. The beetles maintained similarly straight paths under a full starry sky and under a sky showing only the Milky Way’s broad band. Their paths became less directed when the projection showed only the eighteen brightest stars or no stars. These results suggest that ______',
    text: 'Which choice most logically completes the text?',
    options: ['the Milky Way’s broad band can provide an orientation cue even when individual star patterns are unavailable.', 'dung beetles require exactly eighteen bright stars in order to travel in straight paths.', 'a completely dark sky provides a more reliable direction than either a full starry sky or the Milky Way alone.', 'the beetles use differences in ground texture rather than information projected above them.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El texto señala que el número permanece estable aunque cambie la ubicación del objeto.',
    B: 'El número enlaza múltiples registros; no reemplaza la descripción, el estado, la procedencia ni otros datos.',
    C: 'No se usa para decidir una secuencia expositiva, sino para conservar la identidad documental del objeto.',
    D: 'Correcta: el número identifica de forma estable el objeto y permite reunir los registros que le pertenecen.',
  }, fuenteHecho: 'Smithsonian Museum Conservation Institute, RE-ORG workbook, definición de accession number: https://mci.si.edu/sites/default/files/en_i_workbook.pdf' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El agua sale por los poros mientras las partículas se separan; cerrar el paso impediría el mecanismo descrito.',
    B: 'Correcta: los lóbulos desvían por rebote partículas que podrían ser menores que el poro y así evitan depender de un tamiz simple.',
    C: 'El hallazgo destacado es precisamente que el aparato puede separar partículas menores que las aberturas.',
    D: 'Las partículas se mantienen lejos de los poros; el texto no describe que salgan con el agua para ser molidas después.',
  }, fuenteHecho: 'Divi et al., Science Advances, “Manta rays feed using ricochet separation, a novel nonclogging filtration mechanism”: https://doi.org/10.1126/sciadv.aat9533' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'La ausencia de clavos es compatible con muchas técnicas y no muestra por sí sola que otra persona deba desmontar la unión.',
    B: 'Los pegs permiten el desmontaje, pero su mera presencia no prueba con la misma fuerza que el creador anticipó una reparación.',
    C: 'Correcta: la flecha oculta señala a un futuro usuario por dónde liberar cada clavija, evidencia directa de una intención de reversibilidad.',
    D: 'Que Inez evitara romper las piezas muestra el resultado del método, pero la marca direccional prueba mejor la intención original.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'historia', razones: {
    A: 'Correcta: dos direcciones, dos fechas y dos resultados fallidos documentan la secuencia de intentos que afirma el historiador.',
    B: 'El encabezado identifica la institución, pero no registra ninguna acción de reenvío.',
    C: 'El franqueo pendiente es una condición financiera y no evidencia dos destinos sucesivos.',
    D: 'La descripción física de la etiqueta no informa qué recorrido se intentó para el sobre.',
  }, fuenteHecho: 'Facsímil y anotaciones originales informados por Smithsonian National Postal Museum, “Dead Letter Office”: https://postalmuseum.si.edu/exhibition/about-postal-operations-administration/dead-letter-office' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Registrar 18 g tras seis horas no demuestra ausencia de pérdida porque la tabla no muestra la cantidad inicial.',
    B: 'Treinta y cuatro no es exactamente el doble de dieciocho; el doble sería treinta y seis.',
    C: 'La tabla presenta agua restante al final, no cantidades iniciales, por lo que esa comparación no puede derivarse.',
    D: 'Correcta: con área, especie, tiempo y flujo controlados, el grupo de 6 cm conserva 51 g frente a 18 g en el de 2 cm.',
  }, fuenteHecho: 'Tabla pedagógica original informada por Rice, American Journal of Botany, estructura de dosel y balance hídrico de briófitas: https://doi.org/10.2307/3558400' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'La autora prueba órdenes distintos, pero repite deliberadamente una regla para la tercera posición; no elige al azar.',
    B: 'El texto habla de cada tarjeta que termina en still y de un cierre repetido, lo que presupone varias apariciones.',
    C: 'Correcta: las imágenes podían reordenarse, mientras still permanecía como final recurrente de cada grupo de tres.',
    D: 'El soporte se usa durante el borrador; nada obliga a conservarlo como formato de publicación.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: el desempeño con solo la banda y el peor resultado con estrellas brillantes aisladas apoyan el uso de una señal amplia.',
    B: 'La condición de dieciocho estrellas produjo recorridos menos dirigidos, no el requisito para recorridos rectos.',
    C: 'La ausencia de estrellas redujo la orientación y no superó las condiciones con cielo o banda visibles.',
    D: 'Al modificar solo la proyección celeste y obtener desempeños distintos, el experimento apoya una señal aérea, no el suelo.',
  }, fuenteHecho: 'Dacke et al., Current Biology, “Dung Beetles Use the Milky Way for Orientation”: https://doi.org/10.1016/j.cub.2012.12.034' },
]
