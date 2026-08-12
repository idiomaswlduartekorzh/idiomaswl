/**
 * Los doce ejercicios del motor de procesos.
 *
 * POR QUÉ CAMBIARON DE PROCESO
 *
 * Medido el 12 de agosto de 2026: **6 de las 12 respuestas estaban contenidas en un párrafo
 * modelo de la lección**, cuatro de ellas al 100 % de sus palabras. La lección enseña cinco
 * procesos —botellas, café, agua, ladrillos y abejas— y el motor preguntaba sobre esos mismos
 * cinco. El modelo está detrás de «Reveal answers →», así que no se ve de entrada; pero quien
 * hace la lección lo revela, y entonces las respuestas del motor están escritas más arriba.
 *
 * La corrección aquí sale barata porque **este motor no pinta ningún gráfico**: es texto. Así
 * que los doce ejercicios se han mudado a procesos que la lección no trabaja —papel, chocolate,
 * vidrio, lana, cemento, aceite, sal y gusano de seda— y la lección conserva sus cinco
 * ejercicios de escritura intactos, que es lo que de verdad hace escribir al estudiante.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Antes había una explicación para las cuatro.
 */

export type Option = { text: string; why: string }

export type ProcessDrill = {
  level: 1 | 2 | 3
  title: string
  prompt: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

export const PROCESS_DRILLS: ProcessDrill[] = [
  // ── Level 1 ────────────────────────────────────────────────────────────────
  {
    level: 1, title: 'Level 1 · Recognise process structure',
    prompt: 'A diagram shows five stages that turn waste paper into new sheets. Which overview is aligned?',
    correct: 0,
    options: [
      { text: 'The diagram sets out a linear sequence that converts discarded paper into usable new sheets.', why: 'Correct. Shape, starting material and outcome, with no stage narrated and nothing invented.' },
      { text: 'The quantity of paper sent for recycling rose steadily between the year 2000 and the year 2020.', why: 'A diagram shows stages, never a trend. There are no years and no quantities anywhere on it.' },
      { text: 'The diagram compares the recycling methods used by two different paper mills in the same region.', why: 'There is one process, not two. Turning a sequence into a comparison misreads the whole visual.' },
      { text: 'Recycling paper is far better for the environment than cutting down trees to make new paper.', why: 'A judgement, and about something the diagram does not show. Task 1 reports the stages and stops.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Choose the passive form',
    prompt: 'Machines press the warm pulp into thin sheets.',
    correct: 0,
    options: [
      { text: 'The warm pulp is pressed into thin sheets by a series of heavy rollers.', why: 'Correct. The material becomes the subject, which is what the passive is for in a process description.' },
      { text: 'The warm pulp pressed into thin sheets during this particular stage of the process.', why: 'The auxiliary is missing: “pressed” alone reads as an active past tense with no agent.' },
      { text: 'The warm pulp is pressing into thin sheets as it moves along the production line.', why: 'The continuous makes the pulp do the pressing. In a process the material receives the action.' },
      { text: 'The warm pulp were press into thin sheets before moving on to the next stage.', why: 'Two errors in three words: a plural verb for a singular noun, and no past participle.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Identify the starting material',
    prompt: 'In a chocolate diagram, pods are harvested, beans are fermented, dried, roasted and ground. What begins the process?',
    correct: 0,
    options: [
      { text: 'Cocoa pods harvested from the tree', why: 'Correct. The first material the diagram shows, before anything has been done to it.' },
      { text: 'Roasted beans ready for grinding', why: 'Roasting is the fourth stage. A later product cannot start the sequence that produced it.' },
      { text: 'Bars of chocolate wrapped for sale', why: 'That is the outcome. Confusing the end with the beginning reverses the whole description.' },
      { text: 'Fermented beans drying in the sun', why: 'The second and third stages. Close to the start, but the pods come before them.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Select a safe sequencer',
    prompt: 'Crushing happens before melting in a glass-recycling process. Which connector expresses that order?',
    correct: 0,
    options: [
      { text: 'After the glass has been crushed, the fragments are melted in a furnace.', why: 'Correct. “After” places the two stages in the order the diagram shows, and nothing else is claimed.' },
      { text: 'Despite the glass being crushed, the fragments are melted in a furnace.', why: '“Despite” claims the melting happens in spite of the crushing. The diagram shows no such tension.' },
      { text: 'Whereas the glass is crushed, the fragments are melted in a large furnace.', why: '“Whereas” contrasts two things happening at once, which is not what a sequence does.' },
      { text: 'Because the glass has been crushed, the fragments are melted in a furnace.', why: '“Because” invents a cause. The diagram shows what follows what, never why.' },
    ],
  },

  // ── Level 2 ────────────────────────────────────────────────────────────────
  {
    level: 2, title: 'Level 2 · Sequence accurately',
    prompt: 'The wool stages are: shearing, washing, combing and spinning. Which sentence keeps the order?',
    correct: 0,
    options: [
      { text: 'Once the fleece has been sheared, it is washed to remove grease and dirt.', why: 'Correct. The first two stages in the right order, joined without changing either of them.' },
      { text: 'After the yarn has been spun, the fleece is sheared from the animal.', why: 'Spinning is last and shearing is first: the sentence runs the process backwards.' },
      { text: 'The fleece is combed before it is washed at the start of the process.', why: 'Washing comes before combing. Swapping two adjacent stages is the easiest error to make and to spot.' },
      { text: 'The wool is spun into yarn while the fleece is still being sheared.', why: '“While” makes the first and last stages simultaneous, which no linear sequence allows.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Group stages',
    prompt: 'A cement process includes quarrying, crushing, heating, grinding and bagging. Which grouping is useful?',
    correct: 0,
    options: [
      { text: 'Treat extraction and preparation as one phase, then heating and finishing as a second one.', why: 'Correct. Two functional blocks instead of five steps: exactly what turns a list into a paragraph.' },
      { text: 'Give each of the five stages its own separate paragraph so that none is left out.', why: 'Five paragraphs for five stages is the diagram copied out. Grouping is the skill being tested.' },
      { text: 'Describe only the bagging stage, since that is where the finished product appears.', why: 'The outcome matters, but four stages would go unreported. A process needs its whole sequence.' },
      { text: 'Explain the process through the opinions of the workers who operate the machinery.', why: 'There are no people or opinions on the diagram. This is why process writing uses the passive.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Avoid an unsupported cause',
    prompt: 'A diagram shows olives being washed before they are crushed. Which sentence is appropriately cautious?',
    correct: 0,
    options: [
      { text: 'The olives are washed before they are crushed into a thick paste.', why: 'Correct. It reports the order the diagram shows and adds nothing to it.' },
      { text: 'The olives are washed because the producer follows strict hygiene regulations.', why: 'Regulations are not on the diagram. A motive is the commonest thing to invent here.' },
      { text: 'The olives are washed in order to make the finished oil taste much better.', why: 'A purpose, and a claim about flavour. The diagram shows neither of them.' },
      { text: 'The olives are washed after the bottled oil has already been sent to shops.', why: 'That reverses the sequence: washing is near the start and distribution at the end.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Build a linked sentence',
    prompt: 'Which sentence combines two salt-production stages without changing the sequence?',
    correct: 0,
    options: [
      { text: 'Once the seawater has evaporated, the salt crystals left behind are raked into heaps.', why: 'Correct. Evaporation then collection, joined by a connector that keeps the order explicit.' },
      { text: 'The salt crystals are raked into heaps before the seawater has finished evaporating.', why: 'There is nothing to rake until the water has gone. The sentence puts the effect before its cause.' },
      { text: 'The seawater evaporates while the packaged salt is being delivered to the shops.', why: '“While” joins the first stage to the last one, as if a process happened all at once.' },
      { text: 'The seawater is raked into heaps once the salt crystals have evaporated completely.', why: 'The two materials have swapped places: it is the water that evaporates and the salt that is raked.' },
    ],
  },

  // ── Level 3 ────────────────────────────────────────────────────────────────
  {
    level: 3, title: 'Level 3 · Produce a complete overview',
    prompt: 'A cement process starts with quarried limestone and ends with bagged cement ready for sale.',
    correct: 0,
    options: [
      { text: 'Overall, limestone is extracted, prepared, heated and ground before the cement is bagged for sale.', why: 'Correct. Input, the main transformations and the outcome, with no stage described in detail.' },
      { text: 'Overall, the kiln is the single most important piece of equipment in the entire process.', why: 'A diagram shows an order, not a ranking. Nothing on it makes one machine more important.' },
      { text: 'Overall, cement production became considerably more efficient over the period shown here.', why: 'There is no period and no efficiency measure. This describes a graph, not a diagram.' },
      { text: 'Overall, the process proves that cement is a cheaper building material than steel is.', why: 'Steel appears nowhere, and a sequence of stages proves nothing about cost.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Handle a cycle',
    prompt: 'A silkworm life cycle ends with moths laying eggs before the sequence begins again.',
    correct: 0,
    options: [
      { text: 'Overall, the sequence is cyclical, moving from egg to moth before returning to the egg stage.', why: 'Correct. It names the shape and closes the loop, which is what separates a cycle from a line.' },
      { text: 'Overall, the sequence reaches a final stage with the adult moth and then stops there.', why: 'The diagram returns to the start. Presenting a cycle as if it ended misses its defining feature.' },
      { text: 'Overall, each of the four stages of the cycle lasts roughly the same number of days.', why: 'No durations are shown at all, so the comparison between the stages is invented.' },
      { text: 'Overall, the cocoon stage is the one that matters most to silk producers worldwide.', why: 'Importance to producers is not on the diagram, and a cycle does not rank its own stages.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Select the best detail paragraph',
    prompt: 'A paper-recycling process has collection, sorting, pulping, cleaning and pressing. Which detail paragraph is best organised?',
    correct: 0,
    options: [
      { text: 'Initially, waste paper is gathered and sorted by grade. It is then broken down into pulp and cleaned before the fibres are pressed into new sheets.', why: 'Correct. Adjacent stages grouped, the order preserved, and the passive used throughout.' },
      { text: 'Paper is useful. Recycling paper is important for everyone. A great many people already recycle their paper at home each week.', why: 'Three general statements and not one stage of the process. It could describe any diagram at all.' },
      { text: 'The paper is cleaned at this stage. The whole process is quite interesting to follow. The new sheets that come out are very good.', why: 'One stage plus two opinions. Task 1 describes what happens; whether it is interesting is not the point.' },
      { text: 'First, the new sheets are pressed and stacked. Next, the waste paper is gathered from bins and taken away to be sorted at a depot.', why: 'The order is reversed: pressing is the last stage and collection the first.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Choose a precise final sentence',
    prompt: 'The final chocolate stage shows wrapped bars leaving on a delivery lorry. Which sentence is most accurate?',
    correct: 0,
    options: [
      { text: 'Finally, the bars are wrapped and loaded onto lorries for delivery to retailers.', why: 'Correct. Exactly the two actions the last stage shows, and nothing beyond them.' },
      { text: 'Finally, the company earns a substantial profit once the chocolate reaches the shops.', why: 'Profit is not a stage. The diagram stops at the lorry and so should the sentence.' },
      { text: 'Finally, customers buy the chocolate bars and recommend them to their friends and family.', why: 'Consumer behaviour comes after the diagram ends. Nothing shows anyone buying anything.' },
      { text: 'Finally, the delivery lorry is by far the largest machine used anywhere in the process.', why: 'A lorry is transport, not process machinery, and no size comparison is drawn on the diagram.' },
    ],
  },
]
