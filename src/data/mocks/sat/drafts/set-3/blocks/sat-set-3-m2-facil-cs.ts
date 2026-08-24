import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Craft and Structure · Set 3 M2 estándar · q01–q08. Claves: C, A, D, B, A, C, B, D. */
export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'A food container made from a biodegradable copolymer must remain strong while it is being stored and used. In an industrial composting system, however, heat, moisture, and microorganisms can alter bonds in the polymer chains. As those chains become shorter, the discarded container loses its structure and eventually breaks down into much smaller chemical components. The same process may occur far more slowly under different environmental conditions.',
    text: 'As used in the text, what does the phrase “breaks down” most nearly mean?',
    options: ['Malfunctions', 'Is examined', 'Decomposes', 'Is separated'],
    answer: 2,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'On the train home, Leena unfolded the timetable that had belonged to her grandfather. He had drawn a small star beside three stations and written a year next to each one. None of the notes explained what had happened there, but the careful pattern suggested that the places mattered to him. When Leena reached her stop, she copied the names of the marked stations into her notebook before folding the timetable again.',
    text: 'As used in the text, what does the word “marked” most nearly mean?',
    options: ['Identified', 'Damaged', 'Celebrated', 'Evaluated'],
    answer: 0,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'In a hand-press workshop, a compositor selected individual pieces of metal type from a case and arranged them into lines. After the required sheets had been printed, the type was not discarded. Each piece had to be returned to the compartment for its letter, size, and style so that it could be found for another page. A worker who failed to sort the type accurately left the next compositor searching through mixed characters.',
    text: 'As used in the text, what does the word “sort” most nearly mean?',
    options: ['Settle', 'Differentiate', 'Repair', 'Organize'],
    answer: 3,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'Before designing a mural for a neighborhood library, the artists recorded residents describing places they remembered. Rather than paint a single historical scene, the artists built the mural from details repeated across the interviews. Several residents recalled waiting beneath the old clock tower when its bell announced the evening bus. In the finished mural, a wide painted circle echoes the clock face, while short lines spreading from it suggest both sound and bus routes.',
    text: 'Which choice best describes the function of the final sentence in the text as a whole?',
    options: ['It argues that abstract shapes are easier to paint than recognizable buildings.', 'It illustrates how a recurring memory was transformed into visual features of the mural.', 'It explains why the artists removed the residents’ recorded voices from the library.', 'It shows that the bus system replaced the clock tower as the neighborhood’s main landmark.'],
    answer: 1,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'Lunar dust differs from most dust on Earth in two ways important to equipment. Because the Moon lacks the weathering produced by wind and liquid water, many grains remain sharp and angular, making them abrasive when they enter joints or seals. Solar radiation can also give exposed grains an electrical charge. That charge helps the dust cling to spacesuits and instruments, so simply brushing a surface may spread the abrasive particles instead of removing them.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It identifies two properties of lunar dust, explains how each arises, and connects both to problems for equipment.', 'It compares two dust-removal devices, reports a failure shared by both, and recommends a third device.', 'It describes how lunar dust changes during a mission and argues that weathering makes the grains sharper over time.', 'It presents an astronaut’s observation, questions whether it was accurate, and proposes a laboratory test.'],
    answer: 0,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'In 1956, a converted ship carried 58 truck bodies from New Jersey to Texas without unloading the goods inside them. Other companies soon tried related systems; a Matson vessel sailed from San Francisco to Honolulu in 1958 with 20 containers on deck. Yet early companies used boxes and fittings of different dimensions, limiting transfers between ships, trucks, and railcars. Internationally agreed dimensions and corner fittings later made it practical to move the same sealed box through several transport networks.',
    text: 'Which choice best describes the function of the two early voyages in the text as a whole?',
    options: ['They show that railroads, rather than ocean-going ships, introduced the first standardized containers into commercial use.', 'They establish that the two companies used identical equipment before international rules existed.', 'They illustrate early adoption of container transport before incompatible designs were standardized.', 'They explain why the companies stopped carrying sealed containers after their first voyages.'],
    answer: 2,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nWhen a cultural object remains abroad during a long ownership dispute, a detailed digital model can restore meaningful access immediately. Students can examine form and decoration, and community members can add names, narratives, and knowledge that a distant catalog omits. Because physical return may take years of negotiation, building this shared digital resource should be the first practical priority.\n\nText 2\n\nDigital models can widen access and preserve useful documentation, but access is not the same as custody. A community may need the physical object for ceremonies, teaching practices, or decisions about care that a screen cannot reproduce. Digitization can support a return process; it should not be treated as resolving the question that prompted the claim for return.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the proposal in Text 1?',
    options: ['By denying that digital models can preserve any information useful to the community', 'By accepting their immediate value while disputing that digital access is a sufficient response to a claim for physical return', 'By arguing that no digital model should be created until every ownership negotiation has ended', 'By agreeing that ceremonies and decisions about care can be transferred completely to a shared online resource'],
    answer: 1,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nRestoration teams can increase coral cover efficiently by fragmenting fast-growing branching colonies in nurseries and attaching the fragments to damaged reefs. Because each healthy colony yields many fragments, teams can produce large numbers of outplants and cover bare reef within a relatively short project period.\n\nText 2\n\nRapid coverage is only one restoration goal. Many fragments from a few parent colonies may be genetically similar, leaving the restored population with fewer responses to disease or heat. Slower-growing massive corals and sexually produced juveniles can add traits absent from the fastest nursery stock, so long-term planning should preserve multiple species and genotypes even when visible cover increases more slowly.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 favors sexually produced corals, whereas Text 2 argues that all corals should be propagated from fragments.', 'Text 1 measures success only after disease events, whereas Text 2 measures it only by the amount of bare reef covered.', 'Text 1 denies that branching corals grow quickly, whereas Text 2 treats their fast growth as the only useful trait.', 'Text 1 emphasizes rapid gains in coral cover, whereas Text 2 gives greater weight to genetic and species diversity over time.'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Malfunctions describe que un objeto deja de funcionar durante el uso; aquí el recipiente descartado pierde su estructura por cambios químicos.',
    B: 'Is examined convertiría el compostaje en una inspección, pero el texto describe una transformación material.',
    C: 'Correcta: breaks down significa que el polímero se descompone en componentes químicos menores.',
    D: 'Is separated puede describir dividir piezas intactas; el pasaje especifica ruptura de cadenas y pérdida de estructura.',
  }, fuenteHecho: 'NIST, biodegradabilidad y relación estructura-propiedad en copoliésteres: https://www.nist.gov/publications/structure-property-relationships-biodegradability-copolyesters' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'literatura', razones: {
    A: 'Correcta: las estrellas identifican tres estaciones como lugares a los que Leena debe prestar atención.',
    B: 'Las marcas de lápiz no dañan las estaciones ni impiden leer el horario.',
    C: 'Las notas sugieren importancia, pero no dicen que el abuelo celebrara algo en cada lugar.',
    D: 'Evaluated implicaría emitir un juicio o calificación; las estrellas solo señalan cuáles estaciones importan.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'historia', razones: {
    A: 'Settle puede significar resolver una disputa o dejar que algo repose; no describe devolver tipos a compartimentos.',
    B: 'Differentiate es reconocer diferencias, paso necesario pero insuficiente: el trabajador también coloca cada pieza en su lugar.',
    C: 'El texto no indica que las piezas estuvieran rotas ni que sort significara repararlas.',
    D: 'Correcta: sort es organizar las piezas por letra, tamaño y estilo en los compartimentos correspondientes.',
  }, fuenteHecho: 'Library of Congress, proceso de impresión y cajas de tipos móviles: https://blogs.loc.gov/bibliomania/2025/01/24/before-control-p-the-printing-process/' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'La oración explica significado y origen de las formas, no compara la dificultad técnica de pintar.',
    B: 'Correcta: muestra cómo el recuerdo repetido del reloj, la campana y el bus se convirtió en círculo y líneas.',
    C: 'Los artistas usaron las grabaciones como fuente; nada dice que eliminaran voces de una instalación.',
    D: 'Reloj y rutas se combinan visualmente, pero no se afirma que uno reemplazara al otro como hito.',
  }, fuenteHecho: 'Mural, biblioteca, entrevistas y detalles inventados.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: presenta geometría y carga, explica falta de erosión y radiación, y conecta abrasión y adhesión con equipos.',
    B: 'No se comparan dispositivos; el único método mencionado es cepillar y aparece como ejemplo del problema.',
    C: 'La ausencia de weathering conserva bordes agudos; el texto no dice que el polvo se vuelva más afilado durante una misión.',
    D: 'No hay una observación individual cuestionada ni un experimento propuesto; se explica un mecanismo conocido.',
  }, fuenteHecho: 'NASA, “Dust: An Out-of-This World Problem”: https://www.nasa.gov/humans-in-space/dust-an-out-of-this-world-problem/' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'historia', razones: {
    A: 'Ambos ejemplos son viajes marítimos y no atribuyen a ferrocarriles el inicio del sistema.',
    B: 'El pasaje afirma que las primeras empresas usaban dimensiones y herrajes distintos, no idénticos.',
    C: 'Correcta: los viajes muestran uso temprano y preparan el contraste con la incompatibilidad que la estandarización corrigió.',
    D: 'Las compañías aparecen como inicio de la adopción; no se dice que abandonaran contenedores después.',
  }, fuenteHecho: 'National Museum of American History, “Transforming the Waterfront”: https://americanhistory.si.edu/explore/exhibitions/america-on-the-move/online/transforming-waterfront' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 reconoce explícitamente que los modelos amplían acceso y preservan documentación.',
    B: 'Correcta: aceptaría el valor inmediato, pero insistiría en que acceso digital no equivale a custodia ni resuelve la restitución.',
    C: 'Text 2 dice que la digitalización puede apoyar el proceso, no que deba esperar hasta su final.',
    D: 'Ceremonias y decisiones de cuidado son precisamente ejemplos de lo que una pantalla no reproduce por completo.',
  }, fuenteHecho: 'UNESCO, museo virtual, acceso digital y retorno/restitución: https://www.unesco.org/en/culture-and-digital-technologies/virtual-museum?hub=66764' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Text 1 propone fragmentación asexual; Text 2 incorpora juveniles sexuales como una opción adicional.',
    B: 'Text 1 usa cobertura rápida; Text 2 añade resiliencia y diversidad, y ninguno restringe la medición como afirma la opción.',
    C: 'Ambos aceptan el crecimiento rápido de ramificados; Text 2 cuestiona que ese rasgo baste para escoger todo el stock.',
    D: 'Correcta: uno prioriza cobertura visible rápida y el otro diversidad genética y de especies para persistencia futura.',
  }, fuenteHecho: 'NOAA Fisheries, restauración de arrecifes y poblaciones genéticamente diversas: https://www.fisheries.noaa.gov/national/habitat-conservation/restoring-coral-reefs' },
]
