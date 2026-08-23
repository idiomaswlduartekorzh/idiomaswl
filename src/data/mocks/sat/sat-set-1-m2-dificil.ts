import type { MCQQuestion } from '../types'
import type { SatDomain, SatItemMeta, SatModule, SatTopic } from './module-types'

type DraftItem = {
  stimulus: string
  text: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  domain: SatDomain
  tipo: string
  dificultad: 1 | 2 | 3
  tema: SatTopic
  regla?: string
  razones: SatItemMeta['razones']
  fuenteHecho?: string
}

/**
 * Rama exigente del segundo módulo de Reading and Writing.
 *
 * Los estímulos y juegos de opciones son originales. La mezcla sigue el plan del módulo:
 * 3 ítems fáciles, 10 medios y 14 difíciles; 8 CS, 7 II, 7 SEC y 5 EOI. El archivo
 * mantiene cada ítem junto a sus metadatos para que una corrección editorial no pueda
 * dejar atrás la explicación que verá el estudiante.
 */
const draft: DraftItem[] = [
  {
    stimulus:
      'Ecologists studying alpine flowers expected warmer summers to lengthen the blooming season. Instead, plots warmed with transparent chambers produced flowers earlier but also lost their snow cover sooner, leaving young buds exposed to late frosts. Across six seasons, the warmed plots had fewer successful blooms than nearby untreated plots. The researchers therefore describe the benefit of earlier growth as ______: it appears only when the frost risk does not rise at the same time.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: ['unavoidable', 'cumulative', 'conditional', 'negligible'],
    answer: 2,
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A: 'Unavoidable would make the benefit certain, whereas the final clause explicitly limits the circumstances in which it appears.',
      B: 'Cumulative means increasing through successive additions, but the passage contrasts two simultaneous effects rather than describing accumulation.',
      C: 'Correct: conditional means dependent on another circumstance, exactly matching the qualification about frost risk remaining unchanged.',
      D: 'Negligible would mean too small to matter, yet the passage questions when the benefit occurs, not whether its size is trivial.',
    },
    fuenteHecho: 'Ecología alpina general; experimento, duración y redacción originales.',
  },
  {
    stimulus:
      'At the end of Mara Venn’s novel, the narrator watches a train leave the station without revealing whether Mara is aboard. Earlier chapters have supplied enough evidence for either possibility: her packed suitcase remains in the hall, but a porter remembers seeing her on the platform. The narrator does not resolve these clues. Instead, he describes the shrinking red light and turns to the empty bench, deliberately ______ the certainty that a conventional ending would provide.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: ['revising', 'anticipating', 'disputing', 'withholding'],
    answer: 3,
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A: 'Revising would require an earlier conclusion that the narrator changes, but the passage says no conclusion is ever supplied.',
      B: 'Anticipating means expecting something in advance, the opposite of refusing to give readers the promised resolution.',
      C: 'Disputing would challenge a stated certainty; here the certainty never appears, so there is nothing explicit to dispute.',
      D: 'Correct: withholding precisely describes having information or resolution available but deliberately choosing not to provide it.',
    },
    fuenteHecho: 'Ficción original; autora, novela y escena inventadas.',
  },
  {
    stimulus:
      'For decades, museum labels presented attribution as a settled matter: a vessel was Corinthian or Athenian, a portrait was by a named painter or a follower. New imaging techniques have made that confidence harder to sustain. Pigments can come from one region, clay from another, and underdrawings from several hands. Curators now treat many attributions as ______, retaining them as the best current explanation while displaying the evidence that could overturn them.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: ['representative', 'provisional', 'derivative', 'comprehensive'],
    answer: 1,
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A: 'Representative would mean typical of a larger group, but the issue is the certainty and revisability of each attribution.',
      B: 'Correct: provisional describes a conclusion accepted for now while remaining open to revision when new evidence appears.',
      C: 'Derivative would characterize an artwork as imitative, not an attribution as subject to being overturned by later evidence.',
      D: 'Comprehensive means complete in coverage, which conflicts with the curators openly displaying evidence that may change the account.',
    },
    fuenteHecho: 'Prácticas generales de conservación y atribución; ejemplos y redacción originales.',
  },
  {
    stimulus:
      'When the Harbor Street petition reached the city council in 1912, three members signed it but attached a memorandum objecting to its proposed tax. Later histories often count those signatures as unreserved support for the entire plan. The meeting minutes show otherwise: each signer endorsed the new public market only if construction could be funded without the tax. Their approval was therefore ______, not the blanket endorsement suggested by the signature count.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: ['qualified', 'belated', 'symbolic', 'unanimous'],
    answer: 0,
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A: 'Correct: qualified approval includes an explicit limitation, here the condition that the market be financed without the proposed tax.',
      B: 'Belated concerns lateness, but the passage contrasts conditional and unconditional support rather than early and late action.',
      C: 'Symbolic would imply the signatures lacked practical force, while the minutes show that they carried a precise funding condition.',
      D: 'Unanimous describes agreement across a group and cannot describe the limitations attached by the three individual signers.',
    },
    fuenteHecho: 'Historia municipal ficticia; ciudad, petición, fecha y actas inventadas.',
  },
  {
    stimulus:
      'Some desert mosses can lose nearly all measurable water and appear dead for years. When rain returns, the plants resume photosynthesis within hours. Researchers once attributed this recovery mainly to unusually durable cell walls. Recent work first summarizes that explanation, then reports that the mosses continually stockpile repair proteins while dry. It concludes by proposing that survival depends less on preventing damage than on repairing damage rapidly after rehydration.',
    text: 'Which choice best describes the overall structure of the text?',
    options: [
      'It presents a phenomenon, reviews an earlier explanation, introduces new evidence, and offers a revised account.',
      'It presents a phenomenon, compares two species, rejects both explanations, and recommends another experiment.',
      'It describes a method, reports a failed replication, identifies an error, and restores the original conclusion.',
      'It describes an environment, lists several adaptations, ranks their importance, and questions whether any are sufficient.',
    ],
    answer: 0,
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A: 'Correct: the text moves from desiccation survival to the cell-wall account, then repair-protein evidence, and finally a revised mechanism.',
      B: 'No second species is introduced, and the passage replaces one emphasis with another rather than rejecting two species-based explanations.',
      C: 'The passage contains neither a replication nor a methodological error; its new evidence changes the explanation of an observed phenomenon.',
      D: 'Although the desert is mentioned, the text focuses on one moss mechanism and does not rank a list of separate adaptations.',
    },
    fuenteHecho: 'Biología general de plantas tolerantes a la desecación; mecanismo y redacción sintetizados originalmente.',
  },
  {
    stimulus:
      'In the opening pages of The Borrowed Room, every object is described through Elena’s practical judgments: the chair is stable, the lamp wastes oil, the window latch will need replacing. Halfway through the chapter, a single sentence notes that the wallpaper has faded around the outline of a child’s drawing. Elena never comments on the mark, and the narration immediately returns to repairs. Only much later does the reader learn that Elena once lived in the room as a child.',
    text: 'Which choice best describes the function of the sentence about the faded wallpaper in the text as a whole?',
    options: [
      'It proves that Elena has already recognized the room despite pretending otherwise.',
      'It plants a detail whose significance becomes clear only after later information about Elena.',
      'It interrupts Elena’s practical survey to establish that the building has been recently renovated.',
      'It shifts the narration from Elena’s point of view to the former occupant’s point of view.',
    ],
    answer: 1,
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'literatura',
    razones: {
      A: 'The sentence supplies a clue for the reader but does not state that Elena recognizes it or that she is deliberately concealing recognition.',
      B: 'Correct: the outline initially appears incidental, then gains retrospective meaning when Elena’s childhood connection is disclosed.',
      C: 'Faded wallpaper suggests an older trace rather than recent renovation, and no building work is described in that sentence.',
      D: 'The narration remains with what Elena observes; it never enters the thoughts or perspective of a former occupant.',
    },
    fuenteHecho: 'Ficción original; novela, personaje y escena inventados.',
  },
  {
    stimulus:
      'A common history of public libraries treats falling book prices as their principal cause: once books became cheaper, towns could afford collections. Economist Lena Ortiz agrees that price mattered but notes that equally cheap books did not produce libraries in towns lacking elected councils. She then compares neighboring districts with similar incomes and book prices. Libraries appeared earlier where residents could vote on local taxes, suggesting that institutions for collective spending helped convert affordable books into public collections.',
    text: 'Which choice best states the main purpose of the text?',
    options: [
      'To argue that elected councils reduced book prices enough for towns to build public collections',
      'To show that towns with libraries were wealthier than neighboring towns without elected councils',
      'To defend the traditional claim that falling book prices fully explain the rise of public libraries',
      'To qualify a price-based explanation by identifying a political condition that helped affordable books become public libraries',
    ],
    answer: 3,
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A: 'The councils enable collective spending in the comparison; the text never claims that councils themselves lowered the price of books.',
      B: 'The districts are explicitly described as having similar incomes, so wealth is controlled rather than offered as the explanation.',
      C: 'Ortiz agrees that price mattered but shows it was insufficient on its own, which qualifies rather than fully defends the traditional account.',
      D: 'Correct: the comparison adds elected control over local taxation as the condition connecting cheap books to public collections.',
    },
    fuenteHecho: 'Historia económica ficticia; investigadora y comparación inventadas.',
  },
  {
    stimulus:
      'Text 1\n\nDigital archives widen access by allowing researchers anywhere to inspect high-resolution images of fragile manuscripts. Because many questions concern wording, handwriting, or page layout, the image can supply nearly everything the researcher needs without further handling of the original.\n\nText 2\n\nAn image records only what the camera was set to capture. A scraped passage may appear under angled light, a watermark only when a page is held against light, and the sequence of folded sheets only when the binding is examined. Digital images are valuable finding tools, but treating them as replacements can make physical evidence disappear from the questions scholars think to ask.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1 that an image can supply nearly everything many researchers need?',
    options: [
      'By agreeing because most manuscript research concerns wording rather than the material construction of books',
      'By disagreeing because photographing manuscripts necessarily damages the physical evidence that scholars need',
      'By qualifying it because digitization can answer some questions while concealing evidence available only from the physical object',
      'By qualifying it because archives usually restrict digital images to researchers who have already examined the original object',
    ],
    answer: 2,
    domain: 'CS',
    tipo: 'cross-text-connections',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A: 'Text 2 calls images valuable but stresses material questions that images can hide, so it would not accept the claim on subject-matter grounds.',
      B: 'Text 2 warns about replacement, not damage from photography; no claim says the act of digitizing destroys the manuscript.',
      C: 'Correct: Text 2 accepts digital usefulness while identifying watermarks, erased writing, and binding evidence that require the object itself.',
      D: 'No access policy appears in either text; the disagreement concerns what images preserve, not who is permitted to view them.',
    },
    fuenteHecho: 'Prácticas generales de archivos y codicología; textos y ejemplos redactados originalmente.',
  },
  {
    stimulus:
      'In a greenhouse experiment, botanists gave genetically similar bean plants the same amount of water. Half received the water in one weekly dose, while the others received seven smaller daily doses. After eight weeks, both groups had produced nearly the same total leaf mass, but the daily-watered plants had much shallower roots. The result shows that watering schedule can change where a plant invests its growth even when the amount of growth remains similar.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      'The timing of equal amounts of water can alter root development without substantially changing total leaf growth.',
      'Bean plants grow substantially more leaf mass when they receive water every day instead of once each week.',
      'Plants with shallow roots require less total water than genetically similar plants with deeper roots.',
      'Weekly watering produces genetically different bean plants after only eight weeks of growth.',
    ],
    answer: 0,
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A: 'Correct: it preserves both findings—similar leaf mass and different root depth—and links them to watering schedule rather than amount.',
      B: 'The passage says leaf mass was nearly the same, so daily watering did not produce the claimed increase.',
      C: 'Both groups received the same water amount; the experiment does not test how much water shallow-rooted plants require.',
      D: 'The plants began genetically similar, and watering changes growth allocation rather than their genetic identity.',
    },
    fuenteHecho: 'Experimento botánico ficticio diseñado para el ítem.',
  },
  {
    stimulus:
      'When Priya finds a cracked cup in the cupboard, she does not throw it away. She places it on the windowsill, where morning light catches the thin gold line her brother once painted over the crack. Months later, after she has sold nearly everything else before moving, the cup is the only object wrapped in her suitcase. The story never states why she keeps it, but the repeated attention to the repaired line connects the ordinary cup to a relationship she cannot pack in any other form.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      'Priya keeps the cup because its unusual gold repair has made it more valuable to collectors than all her other possessions.',
      'Priya delays moving because she is unwilling to discard any object associated with her former home.',
      'Priya mistakes a decorative gold line for a crack and later learns who painted it.',
      'The cup’s emotional connection to Priya’s brother explains why she preserves it while letting other belongings go.',
    ],
    answer: 3,
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A: 'No sale, buyer, or collector value is mentioned; the repeated emphasis is on the brother who painted the repair.',
      B: 'She does sell nearly everything and completes the move, so the cup does not represent a refusal to leave.',
      C: 'The narration identifies both the crack and the brother’s painted line from the beginning, leaving no later discovery.',
      D: 'Correct: the final sentence explicitly connects the retained object to the relationship represented by her brother’s repair.',
    },
    fuenteHecho: 'Ficción original; personaje, objeto y escena inventados.',
  },
  {
    stimulus:
      'A sociologist argues that benches divided by metal armrests reduce the amount of time strangers spend talking in public squares. She reasons that the dividers fix each person in a separate position, making it harder for small groups to turn toward one another. The city plans to replace several undivided benches with divided ones while leaving lighting, shade, and nearby foot traffic unchanged.',
    text: 'Which finding, if true, would most directly support the sociologist’s argument?',
    options: [
      'People rate the new divided benches as more visually modern than the undivided benches.',
      'After replacement, conversations among previously unacquainted bench users become shorter, while the number of people using the square stays similar.',
      'Divided benches require fewer repairs during the first year than wooden undivided benches did.',
      'Most visitors who walk through the square without sitting do not notice whether the benches have dividers.',
    ],
    answer: 1,
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A: 'Perceived visual style does not test the proposed effect on conversations between strangers using the benches.',
      B: 'Correct: it changes the predicted behavior after the bench change while holding overall use of the square approximately stable.',
      C: 'Maintenance cost may matter to the city but provides no evidence about the duration of social interaction.',
      D: 'The argument concerns people who sit and talk, so observations about nonsitting pedestrians do not test it.',
    },
    fuenteHecho: 'Estudio urbano hipotético creado para el ítem.',
  },
  {
    stimulus:
      'Historian Mei Rojas proposes that a nineteenth-century newspaper expanded mainly because railway delivery brought copies to distant towns sooner. Subscription records do rise after a rail station opens nearby. However, the publisher changed the paper’s price and political coverage during the same year, so timing alone cannot identify which change caused the growth.',
    text: 'Which finding, if true, would most directly weaken the historian’s proposal?',
    options: [
      'The newspaper printed several enthusiastic editorials supporting construction of the railway before the station opened.',
      'Some distant subscribers preserved complete yearly sets of the newspaper in private libraries.',
      'Subscriptions rose just as sharply in towns still reached only by coach after the price and political changes took effect.',
      'Railway companies frequently advertised their schedules in newspapers distributed near new stations.',
    ],
    answer: 2,
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A: 'Editorial support reveals a position but does not show whether rail delivery or the paper’s other changes caused subscription growth.',
      B: 'Preserved sets indicate readership but do not compare growth with and without railway delivery.',
      C: 'Correct: comparable growth where delivery did not change points toward the simultaneous price or coverage changes instead of the railway.',
      D: 'Railway advertising shows a commercial relationship but does not isolate the cause of the newspaper’s new subscriptions.',
    },
    fuenteHecho: 'Historia de prensa ficticia; historiadora, periódico y registros inventados.',
  },
  {
    stimulus:
      'A researcher tested whether adding leaf litter helps city soils retain water. Equal soil plots received 0, 2, 4, or 6 centimeters of litter. One day after identical watering, the average moisture readings were 18%, 24%, 31%, and 30%, respectively. The researcher concludes that adding litter improves short-term water retention, but that increasing the layer beyond 4 centimeters may provide little additional benefit.',
    text: 'Which choice most effectively uses data from the table described in the text to support the researcher’s conclusion?',
    options: [
      'Moisture rose by the same amount whenever another 2 centimeters of litter were added.',
      'The plot with no litter retained more moisture than every plot that received litter.',
      'Moisture increased from 18% with no litter to 31% with 4 centimeters, then remained about the same at 30% with 6 centimeters.',
      'The 6-centimeter plot contained exactly twice as much moisture as the plot with no litter.',
    ],
    answer: 2,
    domain: 'II',
    tipo: 'command-of-evidence-quantitative',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A: 'The increases are not equal: the sequence changes by six, seven, and then negative one percentage point.',
      B: 'The no-litter plot has the lowest value at 18%, so the option reverses the direction of every comparison.',
      C: 'Correct: these values show both the improvement through 4 centimeters and the lack of added gain at 6 centimeters.',
      D: 'Thirty percent is not exactly twice eighteen percent, and that comparison would not locate the plateau at 4 centimeters.',
    },
    fuenteHecho: 'Experimento y datos inventados para medir lectura cuantitativa.',
  },
  {
    stimulus:
      'Jonah copies every change from his grandmother’s handwritten recipe into a notebook, including crossed-out measurements and comments such as “less on rainy days.” When a publisher asks for a clean version, he removes none of these marks. He explains that a recipe is not only a set of instructions but also a record of repeated decisions. Jonah would therefore most likely view the crossed-out measurements as ______',
    text: 'Which choice most logically completes the text?',
    options: [
      'evidence of how the recipe developed through use rather than errors that should disappear from the final record.',
      'proof that his grandmother never prepared the dish successfully in rainy weather.',
      'instructions that every future cook should follow instead of the uncrossed measurements.',
      'decorative features added to make the published recipe resemble an old manuscript.',
    ],
    answer: 0,
    domain: 'II',
    tipo: 'inferences',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A: 'Correct: his statement treats revisions as a history of decisions, which makes crossed-out quantities evidence rather than disposable mistakes.',
      B: 'The rainy-day note modifies use but does not prove repeated failure or connect every crossed-out amount to weather.',
      C: 'A crossed-out amount is precisely the version not followed; preserving it as history does not restore it as instruction.',
      D: 'Jonah values informational traces of revision, and the passage gives no indication that he added marks for appearance.',
    },
    fuenteHecho: 'Ficción original; personajes y manuscrito inventados.',
  },
  {
    stimulus:
      'Researchers comparing translations of the same poem found that versions produced for stage performance used shorter clauses than versions printed for silent reading. The performed translations also rearranged images more often, usually placing the most concrete image at the end of a spoken line. Since audiences cannot pause or reread during a performance, the researchers suggest that the translators were ______',
    text: 'Which choice most logically completes the text?',
    options: [
      'trying to reproduce the original poem’s punctuation even when the target language required longer clauses.',
      'adapting syntax and image placement to make the poem easier to process in real time.',
      'removing concrete imagery because spoken poetry depends primarily on abstract language.',
      'assuming that stage audiences were already familiar with the printed translations.',
    ],
    answer: 1,
    domain: 'II',
    tipo: 'inferences',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A: 'The versions shorten clauses and rearrange images, evidence of adaptation rather than strict reproduction of original punctuation.',
      B: 'Correct: shorter units and salient end positions directly address the audience’s inability to stop and reread.',
      C: 'Concrete images are repositioned, not removed, and their placement at line endings suggests increased salience.',
      D: 'Nothing indicates prior familiarity; the explanation instead rests on the immediate processing demands of live performance.',
    },
    fuenteHecho: 'Estudio de traducción hipotético creado para el ítem.',
  },
  {
    stimulus:
      'In 1886, the town archive moved from a damp basement into two rooms above the courthouse. The move protected the records from floods ______ it also made them harder for residents to consult, since the courthouse closed before most factory shifts ended. A later petition for evening hours cited preservation as a success but access as an unfinished part of the reform.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['because', 'but', 'therefore,', 'although'],
    answer: 1,
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'historia',
    regla: 'Coordinación de dos oraciones independientes con relación de contraste mediante coma y conjunción coordinante.',
    razones: {
      A: 'Because would make the access problem a cause of flood protection, reversing the logical relation described in the following sentence.',
      B: 'Correct: the comma and coordinating conjunction join two complete clauses while expressing the contrast between preservation and access.',
      C: 'Therefore is a conjunctive adverb and cannot join two independent clauses with only the preceding comma.',
      D: 'Although subordinates what follows and leaves the sentence without a complete main clause after the subordinate construction.',
    },
    fuenteHecho: 'Historia municipal ficticia; archivo, fecha y petición inventados.',
  },
  {
    stimulus:
      'A group of marine biologists mapped patches of seagrass before and after a severe storm. Neither the depth of a patch nor its distance from shore ______ a reliable predictor of how much grass survived. The strongest predictor was the density of roots in the sediment, a feature that differed even among neighboring patches exposed to the same waves.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['were', 'have been', 'are', 'was'],
    answer: 3,
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'ciencia',
    regla: 'Concordancia con sujetos singulares unidos por neither...nor; el verbo concuerda aquí con el sujeto singular más cercano.',
    razones: {
      A: 'Were treats the paired singular subjects as plural even though neither...nor presents each alternative separately and both are singular.',
      B: 'Have been is both plural and present perfect, while the surrounding report is anchored in the completed mapping after the storm.',
      C: 'Are has the same number problem and also breaks the passage’s consistent past-time account of the completed study.',
      D: 'Correct: the closest subject, distance, is singular, and the past-tense singular verb matches both grammar and narrative time.',
    },
    fuenteHecho: 'Estudio ecológico hipotético creado para el ítem.',
  },
  {
    stimulus:
      'The first catalog described the collection as modest ______ forty-two maps, six navigational instruments, and a box of letters from sailors. Within a decade, donations had filled three rooms, but the original list remains useful because it shows what the founders considered essential at the start.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['modest, since it included', 'modest; including', 'modest: forty-two maps', 'modest and included'],
    answer: 2,
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 2,
    tema: 'humanidades',
    regla: 'Dos puntos después de una oración completa para introducir una lista que desarrolla la afirmación anterior.',
    razones: {
      A: 'Since creates a dependent explanation but leaves the supplied list without a grammatical object after included.',
      B: 'A semicolon requires complete clauses on both sides, but including introduces a fragment rather than an independent clause.',
      C: 'Correct: the clause before the colon is complete, and the three noun phrases after it specify what the modest collection contained.',
      D: 'And included creates a compound predicate, but the supplied text after the blank would then lack a grammatical object marker before the list.',
    },
    fuenteHecho: 'Catálogo marítimo ficticio; colección y cifras inventadas.',
  },
  {
    stimulus:
      'Unlike the murals in the public hall, which were repainted several times, the small ceiling panel in the archive remained untouched. Chemical analysis of pigments taken from the panel ______ that the artist mixed local clay with imported blue glass, a combination not documented in any surviving workshop manual from the period.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['indicates', 'have indicated', 'indicate', 'were indicating'],
    answer: 0,
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 3,
    tema: 'humanidades',
    regla: 'Concordancia del verbo con el núcleo singular analysis, no con el sustantivo plural pigments dentro de una frase preposicional.',
    razones: {
      A: 'Correct: analysis is the singular head of the subject; of pigments only modifies it and does not control verb number.',
      B: 'Have indicated incorrectly agrees with pigments, the nearer plural noun inside the prepositional phrase rather than the subject head.',
      C: 'Indicate repeats the same attraction error by matching pigments instead of the singular noun analysis.',
      D: 'Were indicating is plural and progressive, neither of which fits a completed analysis presented as current evidence.',
    },
    fuenteHecho: 'Conservación artística ficticia; obra y análisis inventados.',
  },
  {
    stimulus:
      'The notebooks contain hundreds of weather observations made from the same hilltop. Most entries list temperature, wind direction, and cloud cover ______ a handful describe the color of distant mountains at sunset. Those unusual descriptions later helped researchers identify days when smoke from major fires had crossed the region.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['cover, a handful', 'cover: a handful', 'cover; a handful', 'cover a handful'],
    answer: 2,
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 3,
    tema: 'historia',
    regla: 'Punto y coma entre dos oraciones independientes estrechamente relacionadas y sin conjunción coordinante.',
    razones: {
      A: 'A comma alone creates a comma splice because both sides contain their own subject and finite verb.',
      B: 'A colon would promise that the second clause explains or enumerates the first, but it contrasts ordinary entries with exceptional ones.',
      C: 'Correct: both clauses are independent, closely related, and joined without a coordinating conjunction, so a semicolon is appropriate.',
      D: 'No punctuation makes cloud cover appear to modify a handful and removes the boundary between two complete clauses.',
    },
    fuenteHecho: 'Archivo meteorológico ficticio; cuadernos y uso posterior inventados.',
  },
  {
    stimulus:
      'To estimate the age of an undated wooden bridge, researchers compared its tree rings with a regional chronology. Preserved beneath several later repairs, ______ a sequence of unusually narrow rings matching a drought recorded in trees elsewhere in the valley. The match allowed the team to place the original timbers within a three-year window.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: [
      'the researchers discovered in the original timbers',
      'a sequence in the original timbers revealed',
      'the regional chronology identified',
      'the original timbers contained',
    ],
    answer: 3,
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 3,
    tema: 'ciencia',
    regla: 'El sujeto posterior a un modificador inicial debe ser aquello que estaba preservado bajo las reparaciones.',
    razones: {
      A: 'This makes the researchers themselves preserved beneath repairs until they discover something, creating a dangling modifier.',
      B: 'The grammatical subject becomes a sequence, but the wording says that sequence was in the timbers rather than itself beneath repairs.',
      C: 'A chronology is a comparative record and was not physically built into the bridge or preserved under its repairs.',
      D: 'Correct: the original timbers are the physical objects preserved beneath later repairs and can therefore follow the opening modifier.',
    },
    fuenteHecho: 'Dendrocronología general; puente, sequía y ventana de datación inventados.',
  },
  {
    stimulus:
      'The committee reviewed two proposals for the abandoned station: one would preserve the waiting room as a museum, and the other would divide it into offices. The proposal ______ included a public entrance from the platform; the offices would have been reached only through a new side door. That difference became decisive when residents argued that the building should remain visibly connected to the railway.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: [
      'that preserved the waiting room as a museum',
      'which preserved the waiting room as a museum,',
      ', preserving the waiting room as a museum,',
      ', which preserved the waiting room as a museum',
    ],
    answer: 0,
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 3,
    tema: 'humanidades',
    regla: 'Cláusula relativa restrictiva sin comas cuando la información es necesaria para identificar uno de dos antecedentes posibles.',
    razones: {
      A: 'Correct: with two proposals still active, the relative clause is necessary to identify which proposal included the platform entrance.',
      B: 'Which plus the closing comma marks nonessential information, but without that information the phrase the proposal does not identify either option.',
      C: 'The opening comma detaches a participial phrase and fails to identify one proposal as the subject before the verb included.',
      D: 'The comma and which open a nonrestrictive clause that is never closed before the main verb, disrupting the sentence boundary.',
    },
    fuenteHecho: 'Caso de reutilización patrimonial ficticio.',
  },
  {
    stimulus:
      'A student is preparing a presentation about artist Alma Thomas and has taken these notes:\n• Thomas taught art in Washington, DC, for thirty-five years.\n• She began painting full time after retiring from teaching in 1960.\n• Her mature paintings use repeated blocks of vivid color.\n• In 1972, she became the first Black woman to have a solo exhibition at the Whitney Museum of American Art.\nThe student wants to emphasize the sequence between Thomas’s careers.',
    text: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Alma Thomas used repeated blocks of vivid color and had a solo exhibition at the Whitney Museum in 1972.',
      'After teaching art for thirty-five years, Alma Thomas retired in 1960 and began painting full time.',
      'The Whitney Museum presented Alma Thomas’s paintings twelve years after she retired from teaching.',
      'Alma Thomas was a Washington, DC, teacher and the first Black woman with a Whitney solo exhibition.',
    ],
    answer: 1,
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A: 'This combines style and exhibition history but does not connect the end of teaching to the beginning of full-time painting.',
      B: 'Correct: after explicitly marks the requested sequence and uses the notes about teaching, retirement, and the next career.',
      C: 'The sentence gives chronology but centers the museum event rather than the transition from teacher to full-time painter.',
      D: 'Both facts are relevant to her biography, yet and presents them as parallel labels rather than a sequence of careers.',
    },
    fuenteHecho: 'Datos biográficos generales sobre Alma Thomas; síntesis y redacción originales.',
  },
  {
    stimulus:
      'A student is writing about the restoration of a wetland and has taken these notes:\n• A drainage channel built in 1954 lowered the wetland’s water level.\n• In 2018, engineers blocked the channel at three points.\n• Average spring water depth rose from 12 centimeters in 2017 to 29 centimeters in 2020.\n• Nesting pairs of marsh birds increased from 18 to 41 over the same period.\nThe student wants to make a cautious claim supported by the notes.',
    text: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'After the channel was blocked, deeper spring water coincided with more nesting pairs, a pattern consistent with wetland recovery.',
      'Blocking the channel completely restored the wetland by 2020 and caused every marsh-bird population to more than double.',
      'The channel lowered the water level in 1954 because only eighteen pairs of marsh birds nested there in 2017.',
      'Water depth rose by seventeen centimeters, proving that the 1954 channel was the only cause of every later ecological change.',
    ],
    answer: 0,
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A: 'Correct: it reports the two observed trends and uses consistent with to avoid claiming causation beyond the notes.',
      B: 'Completely, caused, and every all exceed the evidence, which records selected measures rather than total restoration or all populations.',
      C: 'The sentence reverses chronology and invents a causal link between a 1954 action and a bird count measured decades later.',
      D: 'The numerical change is accurate, but proving a sole cause for every ecological change goes far beyond the observations.',
    },
    fuenteHecho: 'Proyecto, fechas y datos inventados para el ítem.',
  },
  {
    stimulus:
      'Many shorebirds time their migration so that they reach coastal feeding grounds when insects are abundant. A warmer spring can make the insects emerge earlier. ______ birds that continue to migrate according to day length may arrive after the peak supply of food has passed, even if their own departure date has not changed.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'For example,', 'Consequently,', 'Nevertheless,'],
    answer: 2,
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A: 'Similarly would compare parallel cases, but the final sentence states a result of the earlier insect emergence.',
      B: 'For example would illustrate a general claim, whereas the sentence completes a cause-and-effect chain already established.',
      C: 'Correct: consequently marks the late arrival relative to food as the result of insects emerging earlier while migration cues stay fixed.',
      D: 'Nevertheless signals a contradiction, but arriving after the food peak follows rather than opposes the preceding conditions.',
    },
    fuenteHecho: 'Ecología migratoria general; redacción original.',
  },
  {
    stimulus:
      'The first reviews of Niko Sato’s poems praised their apparent simplicity: short lines, familiar objects, and almost no figurative language. Later critics noticed that the order of those objects changes subtly whenever the speaker avoids naming a loss. ______ what initially looked like plain description came to be read as a highly controlled form of omission.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['In contrast,', 'Meanwhile,', 'For instance,', 'Thus,'],
    answer: 3,
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A: 'In contrast would oppose two claims, but the final interpretation grows from the later critics’ observation.',
      B: 'Meanwhile merely marks simultaneous events and does not express the interpretive consequence described.',
      C: 'For instance would introduce an example, yet the sentence summarizes what critics concluded from the pattern.',
      D: 'Correct: thus signals that the revised reading is a consequence of noticing the systematic changes in object order.',
    },
    fuenteHecho: 'Crítica literaria ficticia; poeta y obra inventados.',
  },
  {
    stimulus:
      'Early maps of the river mark a broad island near its mouth, while modern surveys show only a narrow sandbar. One explanation is that a dam built upstream reduced the sediment reaching the coast. ______ shipping records describe crews dredging the channel for almost fifty years before the dam existed, suggesting that direct removal had already begun reshaping the island.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Accordingly,', 'However,', 'Likewise,', 'Specifically,'],
    answer: 1,
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A: 'Accordingly would present the dredging evidence as a result of the dam explanation rather than evidence that complicates it.',
      B: 'Correct: however introduces earlier dredging records that challenge the dam as a sufficient explanation for the island’s decline.',
      C: 'Likewise would make dredging a parallel instance of reduced sediment, but the chronology gives it a competing causal role.',
      D: 'Specifically would elaborate the dam explanation, whereas the records shift attention to a process operating before the dam.',
    },
    fuenteHecho: 'Historia ambiental ficticia; río, mapas, presa y registros inventados.',
  },
]

const idAt = (index: number) => `q${String(index + 1).padStart(2, '0')}`

const items: MCQQuestion[] = draft.map((item, index) => ({
  id: idAt(index),
  type: 'mcq',
  part: 1,
  stimulus: item.stimulus,
  text: item.text,
  options: item.options,
  answer: item.answer,
}))

const meta: SatItemMeta[] = draft.map((item, index) => ({
  id: idAt(index),
  domain: item.domain,
  tipo: item.tipo,
  dificultad: item.dificultad,
  tema: item.tema,
  ...(item.regla ? { regla: item.regla } : {}),
  razones: item.razones,
  ...(item.fuenteHecho ? { fuenteHecho: item.fuenteHecho } : {}),
}))

export const satSet1M2Dificil: SatModule = {
  id: 'sat-set-1-m2-dificil',
  variant: 'M2-dificil',
  items,
  meta,
}
