import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Information and Ideas · Set 3 M2 exigente · q09–q15.
 *
 * Las claves C, A, D, B, C, D, A se fijaron en la matriz editorial antes de
 * redactar. La tabla de q13 es original y no representa resultados publicados.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'A tactile map does more than replace printed place names with braille. Raised lines can mark boundaries or routes, while contrasting textures can distinguish regions. A key explains what each texture and symbol represents, and the spacing among features helps a reader trace their relative locations. Designers often simplify crowded visual maps because details that are easy to separate by sight may be difficult to distinguish by touch.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Tactile maps should preserve every feature of a visual map but substitute raised lines for ink.', 'Braille labels are sufficient to communicate a map’s spatial information even when regions and routes are omitted.', 'Tactile maps coordinate simplified raised features to convey labels, regions, and spatial relationships.', 'Textures on tactile maps are intended mainly to imitate how each mapped place would feel in the physical world when visited.'],
    answer: 2,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'In an evolution experiment, researchers repeatedly supplied populations of one Bacillus subtilis lineage with DNA from another lineage. After about 200 generations, the evolved populations had incorporated donor DNA across roughly 12% of their core genomes and showed a repeatable fitness gain during stationary growth. Statistical analysis indicated that about 40% of the observed transfers were adaptive. The transferred regions differed among populations, suggesting that selection could favor more than one genomic route to improved performance.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Horizontal transfer rapidly changed core genomes, and selection favored distinct adaptive routes across the bacterial populations.', 'Every transferred region increased fitness, so the same donor genes became fixed in all of the bacterial populations.', 'The populations improved only because mutations arose in recipient DNA and remained entirely independent of transferred material throughout the experiment.', 'Differences among the evolved genomes show that selection played no meaningful role in the observed fitness gains.'],
    answer: 0,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'While preparing an old chamber work for performance, composer Nia Patel noticed that the copied cello part contained an unexplained two-beat rest. The surviving violin and piano parts continued through those beats, so Patel first penciled a cello note above the rest. At rehearsal, however, the absence left the violin phrase briefly exposed. Patel erased her added note and wrote “keep the opening” beside the rest before sending the corrected parts to the musicians.',
    text: 'Which quotation from the text best supports the claim that Patel came to regard the apparent omission as expressive rather than mistaken?',
    options: ['“the copied cello part contained an unexplained two-beat rest”', '“The surviving violin and piano parts continued through those beats, so Patel first penciled a cello note above the rest”', '“Patel first penciled a cello note above the rest”', '“Patel erased her added note and wrote ‘keep the opening’ beside the rest”'],
    answer: 3,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Marine archaeologists are testing a claim that an excavated wooden vessel was built in 1730. They compare growth-ring patterns from one hull timber with dated regional chronologies. The method can identify the calendar year of a preserved ring, but a timber may have lost its younger outer rings when it was shaped. The archaeologists therefore argue that their result could establish a date after which the tree was felled without identifying the vessel’s exact construction year.',
    text: 'Which finding, if true, would most strongly support the archaeologists’ argument?',
    options: ['The timber’s species also appears in numerous buildings erected at different points both before and after 1730 across the entire region.', 'Its rings match a regional chronology through 1742, but neither the bark edge nor all the younger outer wood survives.', 'A metal fitting recovered near the vessel resembles fittings illustrated in an undated catalog.', 'The hull contains tool marks that several kinds of eighteenth-century adzes could have produced at various dates during the century.'],
    answer: 1,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A researcher measured thermal conductivity for three insulation samples after conditioning them at two moisture levels. Lower conductivity indicates greater resistance to heat flow. All measurements in the table were created solely for this item.\n\nMaterial · dry conductivity · damp conductivity\nCork · 0.040 W/(m·K) · 0.052 W/(m·K)\nHemp · 0.050 W/(m·K) · 0.060 W/(m·K)\nWood fiber · 0.044 W/(m·K) · 0.055 W/(m·K)',
    text: 'Which choice most effectively uses data from the table to support the claim that damp conditioning produced the greatest proportional increase in conductivity for cork?',
    options: ['Cork’s conductivity rose by 0.012 W/(m·K), while hemp’s rose by 0.010 W/(m·K), so cork’s proportional increase was 20%.', 'Damp cork had a conductivity of 0.052 W/(m·K), which was lower than the dry conductivity of hemp.', 'Under damp conditioning, cork conductivity increased 30%, compared with 20% for hemp and 25% for wood fiber.', 'Wood fiber increased by 0.011 W/(m·K), only 0.001 W/(m·K) less than cork did.'],
    answer: 2,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'Before clearing his aunt’s studio, Leo made two inventories. On the first he listed the easel, brushes, jars, and folding stool. On the second he added the lamp and drop cloth, then checked every entry twice. Neither list mentioned the chipped red bowl beside the sink. When the movers arrived, Leo wrapped that bowl in his own scarf and placed it behind a stack of papers he had labeled “decide later.”',
    text: 'Which choice most logically completes the text?',
    options: ['Leo believes that the movers have already recorded the bowl on a separate inventory and expects them to add it later without consulting him.', 'Leo omits the bowl because he has not noticed it among the studio supplies he checked.', 'Leo plans to discard the bowl immediately but wants the movers to mistake it for paperwork.', 'Leo’s repeated omission and careful handling suggest that attachment makes the bowl difficult to classify or relinquish.'],
    answer: 3,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers tracked skin microbial communities of mountain yellow-legged frogs before infection with the fungus Batrachochytrium dendrobatidis, during infection, and three weeks after antifungal treatment cleared the fungus. Infection shifted community composition relative to uninfected controls. After clearance, the treated frogs’ communities still differed from their own pre-infection states and from the controls; several dominant bacterial groups had not returned to their earlier relative abundances.',
    text: 'Which conclusion is best supported by the text?',
    options: ['Within the study period, clearing the fungus did not restore the disturbed communities’ earlier composition.', 'The antifungal treatment directly killed every bacterial group that had been abundant before infection.', 'Because the fungus was cleared, the microbial communities must have recovered fully before the final samples were collected.', 'All changes in microbial composition were ordinary temporal variation because infected and control frogs remained indistinguishable at every stage.'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El texto explica que se simplifican detalles visuales; conservarlos todos haría más difícil distinguirlos al tacto.',
    B: 'Las etiquetas aportan nombres, pero líneas, texturas, separación y clave comunican relaciones que el braille solo no expresa.',
    C: 'Correcta: integra codificación táctil, etiquetas, relaciones espaciales y simplificación en una sola idea central.',
    D: 'Las texturas funcionan como símbolos definidos por una clave; no necesitan imitar la superficie física del lugar representado.',
  }, fuenteHecho: 'American Printing House for the Blind, U.S. Tactile Map Classroom Pack y guía de diseño táctil: https://www.aph.org/product/us-tactile-map-classroom-pack/ y https://sites.aph.org/files/research/illustrations/' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: resume la escala y rapidez del cambio, su componente adaptativo y la existencia de rutas genómicas distintas.',
    B: 'El análisis atribuyó ventaja a cerca del 40 % de las transferencias, no a todas, y las regiones variaron entre poblaciones.',
    C: 'El experimento estudia precisamente el efecto de ADN transferido; no atribuye la mejora solo a mutaciones aisladas del receptor.',
    D: 'La repetición de la ganancia de aptitud y la estimación de transferencias adaptativas constituyen evidencia de selección.',
  }, fuenteHecho: 'Power et al., PNAS (2021), “Adaptive evolution of hybrid bacteria by horizontal gene transfer”: https://pmc.ncbi.nlm.nih.gov/articles/PMC7958396/' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'El descanso inexplicado plantea una posible equivocación, pero todavía no muestra cómo Patel termina interpretándolo.',
    B: 'La continuidad de los otros instrumentos explica la duda inicial, no la decisión de conservar la ausencia por su efecto.',
    C: 'Añadir una nota evidencia que al principio Patel trató el silencio como un error que debía corregirse.',
    D: 'Correcta: borrar la nota y ordenar conservar la apertura demuestra la decisión final tras oír su efecto expresivo.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'La presencia amplia de la especie no fecha este árbol ni fija un límite para el uso de su madera.',
    B: 'Correcta: 1742 es el último año preservado, de modo que la tala fue posterior, pero la pérdida exterior impide saber cuánto después.',
    C: 'Un objeto cercano, parecido y sin fecha independiente no establece ni un límite dendrocronológico ni el año de construcción.',
    D: 'La compatibilidad con varias herramientas de un siglo entero no acota la tala ni distingue 1730 de fechas posteriores.',
  }, fuenteHecho: 'Alexandria Archaeology, “Tree-Ring Dating of the Alexandria Shipwreck and Wharf”; escenario y fecha hipotéticos: https://media.alexandriava.gov/docs-archives/historic/info/archaeology/sitereportworthingtonax229dendro.pdf' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 3, tema: 'ciencia', razones: {
    A: 'La diferencia absoluta de corcho es correcta, pero 0,012 dividido por 0,040 equivale a 30 %, no a 20 %.',
    B: 'Compara niveles de materiales distintos y no calcula cuánto cambió proporcionalmente cada uno con humedad.',
    C: 'Correcta: (0,052−0,040)/0,040=30 %, frente a 20 % para cáñamo y 25 % para fibra de madera.',
    D: 'Compara cambios absolutos; no demuestra el mayor cambio relativo respecto de cada valor seco inicial.',
  }, fuenteHecho: 'Diseño, materiales y datos originales; no representan resultados de un estudio real.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'No hay inventario de los transportistas; Leo revisa dos veces sus propias listas y oculta el cuenco entre decisiones pendientes.',
    B: 'Leo ve y manipula el cuenco, por lo que su omisión repetida no puede explicarse por falta de atención.',
    C: 'Envolverlo con una prenda propia y ubicarlo entre lo pendiente contradice una decisión inmediata de desecharlo.',
    D: 'Correcta: la omisión deliberada, la protección y la etiqueta “decide later” apoyan una dificultad afectiva para resolver su destino.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: tras eliminar la perturbación original persistieron diferencias composicionales durante la ventana observada.',
    B: 'El estudio observa abundancias y composición; no demuestra que el fármaco matara directamente a todas las bacterias previas.',
    C: 'La eliminación del hongo no coincidió con retorno a la línea base, por lo que recuperación completa contradice los resultados.',
    D: 'Las comunidades expuestas se separaron de controles y de sus estados iniciales; no permanecieron indistinguibles.',
  }, fuenteHecho: 'Jani y Briggs, The ISME Journal (2021), microbioma de anfibios tras perturbación por Bd: https://doi.org/10.1038/s41396-020-00875-w' },
]
