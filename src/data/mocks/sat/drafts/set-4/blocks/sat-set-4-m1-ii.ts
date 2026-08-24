import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Information and Ideas · Set 4 M1 · q09–q15.
 *
 * Las claves C, A, D, B, C, A, D se reservaron en la matriz editorial antes de
 * redactar. El hallazgo de q12 y los datos de q13 son originales y se declaran.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'Accessible pedestrian routes can use different tactile features to communicate different information. At a curb ramp or the unprotected edge of a rail platform, a grid of small, flat-topped domes warns a traveler that a hazard lies ahead. At a pedestrian signal, by contrast, a raised arrow on the push button points in the direction of the associated crosswalk. The two features can both be detected by touch, but their shapes and locations prevent them from functioning as interchangeable messages.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Tactile arrows have replaced warning domes because a single raised shape can identify every pedestrian hazard.', 'Warning domes and tactile arrows are placed together at every curb ramp so travelers can compare their shapes.', 'Pedestrian routes use distinct tactile features to convey a hazard warning and a direction of travel.', 'Warning domes are intended mainly to show the direction of a crosswalk, while arrows mark the edge of a platform.'],
    answer: 2,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'A squid swimming in midwater receives dim sunlight from above. To a predator looking upward from below, the squid’s unlit body would form a dark silhouette against that light. Some squid have light-producing organs on their undersides and regulate their glow to resemble the brightness of the water above them. This strategy, called counterillumination, does not make the animal transparent; it reduces the contrast that would otherwise reveal the animal’s outline.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Some squid use adjustable light from below their bodies to reduce the silhouette visible to predators beneath them.', 'Some squid become transparent in midwater by reflecting all sunlight that reaches the upper surface of their bodies.', 'Counterillumination allows squid to brighten the water above them so predators swimming at the surface cannot see downward.', 'Light-producing organs help squid locate prey by casting a beam into water where sunlight never reaches.'],
    answer: 0,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'When Aya emptied her grandmother’s apartment, she gave away the matching plates and bowls but wrapped one cracked teacup in newspaper. Her brother pointed out that the cupboard held newer cups without stains. Aya traced the thin gold line that covered the crack. Years earlier, her grandmother had repaired the cup instead of replacing it, explaining that careful mending could become part of an object’s design. Aya placed the cup beside her own box of brushes and adhesives.',
    text: 'Which quotation from the text best supports the claim that Aya values the teacup because its repair reflects an approach she hopes to continue?',
    options: ['“When Aya emptied her grandmother’s apartment, she gave away the matching plates and bowls”', '“the cupboard held newer cups without stains”', '“Aya traced the thin gold line that covered the crack”', '“Aya placed the cup beside her own box of brushes and adhesives”'],
    answer: 3,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Household account books can show changes in daily fuel use that official production totals do not. Because an account keeper may list each purchase by date and material, a sequence of entries can distinguish a sudden replacement from a period in which a family tried a new fuel while continuing to buy the old one. A historian examining one such book claims that the household experimented briefly with coal before relying on it for most recorded fuel purchases.',
    text: 'Which finding from the account book, if true, would most strongly support the historian’s claim?',
    options: ['The book lists repairs to a wood shed several years before its first entry for either wood or coal.', 'Two small coal purchases interrupt repeated wood purchases; the next year, coal is regular and wood appears once.', 'Coal and wood have different prices in the book, but several entries omit the quantity purchased.', 'The final page lists one coal merchant and two wood merchants in an alphabetical index of suppliers.'],
    answer: 1,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A research team collected surface snow from three nearby sites on the same afternoon. For each sample, the team estimated the concentration of pigmented snow-algae cells and measured the percentage of incoming visible light reflected by the snow. The values below are original to this question; they model the inverse relationship examined in snow-algae research.\n\nSample · algal cells per mL · visible-light reflectance\nClear · 0 · 84%\nRose · 18,000 · 72%\nCrimson · 43,000 · 55%',
    text: 'Which choice most effectively uses data from the table to support the claim that, among these samples, higher snow-algae concentration was associated with lower visible-light reflectance?',
    options: ['Rose contained 18,000 cells per mL and reflected 72% of visible light, so it had both the median concentration and the greatest reflectance.', 'Crimson contained 25,000 more cells per mL than Rose, and the two samples reflected the same percentage of visible light.', 'Cell concentration rose from 0 in Clear to 18,000 in Rose and 43,000 in Crimson as reflectance fell from 84% to 72% and 55%.', 'Reflectance fell by 12 percentage points from Clear to Rose and by 17 from Rose to Crimson, proving that each additional cell caused an equal decrease.'],
    answer: 2,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'León had not performed “Harbor Nocturne” since his teacher died, though the score remained open on his piano. Above the first measure, the teacher’s faded pencil marked a slow tempo. León had later written a quicker number in blue ink, the tempo they discovered together after hearing footsteps echo through a station. Before each concert, he moved the piece to the top of his program and then removed it. This time he copied both markings onto a new score and packed it with the music he planned to play.',
    text: 'Which conclusion is best supported by the text?',
    options: ['By carrying a copy with both tempos, León may be preparing to perform the piece while preserving its two stages.', 'León stopped performing the piece because he believes his teacher’s slow tempo is technically impossible.', 'León intends to play only the quicker tempo because he copies the blue marking and erases the pencil marking.', 'The footsteps at the station caused León’s teacher to reject the piece before either musician performed it.'],
    answer: 0,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Mexican tetras include a surface form and multiple cave populations that evolved separately. Under comparable laboratory conditions, fish from several cave populations sleep less than surface fish. In one experiment, disabling pressure-sensitive lateral-line organs increased sleep in fish from the Pachón cave population. The same intervention did not increase sleep in four other cave populations, although those populations also showed sleep loss. Thus, similar sleep patterns occur across the cave populations even though the tested sensory pathway does not have the same effect in all of them.',
    text: 'Which conclusion is best supported by the text?',
    options: ['All cave populations inherited sleep loss from a single cave ancestor that lacked lateral-line organs.', 'Disabling the lateral line causes every Mexican tetra to sleep less, regardless of its population.', 'Pachón fish sleep less only when laboratory conditions differ from those used for surface fish.', 'Similar sleep loss may arise through different mechanisms in independently evolved cave populations.'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El texto no dice que las flechas sustituyeran a las cúpulas; asigna a cada forma una información distinta.',
    B: 'Las características aparecen en lugares y dispositivos diferentes, no juntas obligatoriamente en cada rampa.',
    C: 'Correcta: sintetiza el contraste entre una superficie que advierte peligro y una flecha que comunica dirección.',
    D: 'Invierte las funciones descritas: las cúpulas advierten del borde y la flecha se alinea con el cruce.',
  }, fuenteHecho: 'U.S. Access Board, Public Right-of-Way Accessibility Guidelines, R305 y R307: https://www.access-board.gov/prowag/complete.html' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: reúne la ubicación de los órganos luminosos, el ajuste del brillo y la reducción de la silueta observada desde abajo.',
    B: 'El texto niega que el animal se vuelva transparente; la estrategia reduce contraste mediante luz producida.',
    C: 'La luz imita el fondo superior para un observador situado debajo; no ilumina el agua sobre el calamar.',
    D: 'El pasaje describe camuflaje ante depredadores, no un haz usado para encontrar presas.',
  }, fuenteHecho: 'Young y Mencher, Science (1980), “Bioluminescence in Mesopelagic Squid: Diel Color Change during Counterillumination”: https://doi.org/10.1126/science.208.4449.1286' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'Distingue la taza del resto de la vajilla, pero no muestra que Aya vaya a continuar la práctica de reparar.',
    B: 'Muestra que había alternativas intactas y refuerza que la elección fue deliberada, pero no conecta la taza con una acción futura.',
    C: 'Dirige la atención a la reparación, aunque observar la línea no basta para mostrar que Aya adopta el método.',
    D: 'Correcta: colocar la taza reparada junto a sus propios materiales de reparación vincula el ejemplo de su abuela con una práctica que Aya puede continuar.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'Una reparación anterior no establece el orden de las compras ni una transición entre combustibles.',
    B: 'Correcta: las compras pequeñas intercaladas muestran la prueba inicial y la secuencia posterior muestra el predominio del carbón.',
    C: 'Precios y cantidades ausentes pueden limitar otros análisis, pero no prueban una etapa de prueba seguida por dependencia.',
    D: 'El número de proveedores no indica con qué frecuencia se compró cada combustible ni cómo cambió esa frecuencia.',
  }, fuenteHecho: 'Escenario y hallazgo originales, informados por University of Nottingham, guía de libros contables domésticos: https://www.nottingham.ac.uk/manuscriptsandspecialcollections/researchguidance/accounting/household.aspx' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Rose sí tiene la concentración intermedia, pero Clear, con 84 %, presenta la reflectancia más alta.',
    B: 'La diferencia de concentración es correcta, pero Crimson refleja 55 % y Rose 72 %; no son iguales.',
    C: 'Correcta: cita las tres parejas de valores y muestra que la concentración aumenta en el mismo orden en que la reflectancia disminuye.',
    D: 'Las caídas de reflectancia están bien calculadas, pero no son iguales y tres muestras observacionales no prueban el efecto causal de cada célula.',
  }, fuenteHecho: 'Datos originales; relación cualitativa informada por New Phytologist, “Community-driven variations in snow algae color modulate snow albedo reduction”: https://doi.org/10.1111/nph.70775' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: copiar ambas marcas conserva las dos etapas y empacar la partitura cambia el patrón previo de retirarla antes de tocar.',
    B: 'No se atribuye el aplazamiento a una dificultad técnica ni se dice que el tempo lento sea imposible.',
    C: 'León copia ambas marcas; no borra la de su maestro ni declara que usará exclusivamente la propia.',
    D: 'El pasaje dice que ambos descubrieron juntos el tempo rápido; no que el maestro rechazara la obra.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Las poblaciones de cueva evolucionaron separadamente y el texto no dice que carezcan de línea lateral.',
    B: 'En Pachón la intervención aumentó el sueño y en cuatro poblaciones no lo cambió; nunca lo redujo en todas.',
    C: 'Las comparaciones se hicieron bajo condiciones semejantes, por lo que una diferencia experimental no explica el patrón de Pachón.',
    D: 'Correcta: la pérdida de sueño aparece repetidamente, pero el efecto particular de la línea lateral en Pachón no se generaliza a las otras poblaciones.',
  }, fuenteHecho: 'Jaggard et al., Journal of Experimental Biology (2017), “The lateral line confers evolutionarily derived sleep loss in the Mexican cavefish”: https://doi.org/10.1242/jeb.145128' },
]
