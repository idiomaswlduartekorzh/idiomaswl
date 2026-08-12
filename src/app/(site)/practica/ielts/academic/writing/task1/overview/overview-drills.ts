/**
 * Los quince ejercicios del motor de overview.
 *
 * Todos se cuelgan de un gráfico con `worked: false`: la lección no imprime su modelo, así
 * que la respuesta no está en la página antes de intentarla. Antes seis de los quince
 * practicaban sobre gráficos que la lección ya resolvía encima, dos de ellos con las mismas
 * palabras.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. La versión anterior daba UNA explicación para las cuatro:
 * quien fallaba leía por qué la buena era buena, nunca por qué la suya era mala.
 *
 * Los cuatro errores que se reparten, y que son los que cuestan puntos de verdad en Task 1:
 * dar una cifra exacta, describir un solo elemento en vez del conjunto, inventar una causa o
 * un juicio, y confundirse de tipo de gráfico o de marco temporal.
 */

import { overviewFor } from './overview-data'
import type { OverviewModel } from './overview-data'

export type Option = { text: string; why: string }

export type Drill = {
  source: OverviewModel & { prompt: string }
  question: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

export type Level = { title: string; skill: string; items: Drill[] }

export const LEVELS: Level[] = [
  {
    title: 'Level 1 · Detect the visual story',
    skill: 'Pick the feature that belongs in an overview.',
    items: [
      {
        source: overviewFor('line', 3),
        question: 'Which of these belongs in the overview?',
        correct: 0,
        options: [
          { text: 'Family visits rose while student and retiree visits fell.', why: 'Correct. It gives the direction of every group at once, which is what an overview is for.' },
          { text: 'Family visits reached 62 in the final year recorded.', why: 'A single exact figure. Figures are the evidence in Body 1, not the summary.' },
          { text: 'Students remained the busiest group of the three throughout.', why: 'True, but it describes one line. The overview needs the pattern across all three.' },
          { text: 'Libraries have clearly become more important for families than before.', why: 'The graph counts visits. Why families come, and whether it matters, is not on it.' },
        ],
      },
      {
        source: overviewFor('bar', 3),
        question: 'Which of these belongs in the overview?',
        correct: 0,
        options: [
          { text: 'Museum A drew the most visitors and Museum D the fewest.', why: 'Correct. Highest and lowest frame the whole chart in one sentence.' },
          { text: 'Museum A drew 2.4 million visitors during the year shown.', why: 'An exact figure. Save it for the paragraph where you compare the museums.' },
          { text: 'Visitor numbers at the four museums climbed across the decade.', why: 'The chart covers one year. There is no trend on it to report.' },
          { text: 'Museum A must have better exhibitions than the other three.', why: 'A cause invented to explain the bars. The chart counts people, not quality.' },
        ],
      },
      {
        source: overviewFor('pie', 3),
        question: 'Which of these belongs in the overview?',
        correct: 0,
        options: [
          { text: 'Visitors were spread fairly evenly across the four seasons.', why: 'Correct. When no slice dominates, that balance IS the story worth summarising.' },
          { text: 'Summer accounted for 28 per cent of the annual total.', why: 'One slice with its exact figure. It says nothing about the shape of the chart.' },
          { text: 'Summer was by far the most popular season for visiting the park.', why: '28 against 23 is not “by far”. Overstating a small gap is a precision error.' },
          { text: 'The park would attract more visitors with better winter facilities.', why: 'A recommendation. The chart reports shares; it does not advise anyone.' },
        ],
      },
      {
        source: overviewFor('table', 3),
        question: 'Which of these belongs in the overview?',
        correct: 0,
        options: [
          { text: 'Guides were rated best overall and transport worst.', why: 'Correct. It reads across the whole table instead of stopping at one cell.' },
          { text: 'Sixty-eight per cent of tourists rated the guides excellent.', why: 'One cell, quoted exactly. An overview never depends on a single number.' },
          { text: 'Satisfaction with every facility improved over the period.', why: 'The table covers one year. There is nothing to compare it against.' },
          { text: 'Transport should be the first thing the region invests in.', why: 'Advice, not description. Ratings do not tell you where money should go.' },
        ],
      },
      {
        source: overviewFor('process', 3),
        question: 'Which of these belongs in the overview?',
        correct: 0,
        options: [
          { text: 'The process runs in a straight line from raw clay to fired bricks.', why: 'Correct. Shape, starting material and outcome: everything an overview of a process needs.' },
          { text: 'The clay is dug out, then crushed, then moulded, then dried, then fired.', why: 'Every stage in order. That is the body paragraph; the overview stands above it.' },
          { text: 'Brick production has become considerably faster in recent years.', why: 'A diagram shows a sequence, never a change over time.' },
          { text: 'Firing is the stage that matters most in the whole sequence.', why: 'Ranking the stages is a judgement. Nothing on the diagram supports it.' },
        ],
      },
    ],
  },
  {
    title: 'Level 2 · Choose an aligned overview',
    skill: 'Check the visual type, the scope and the features you selected.',
    items: [
      {
        source: overviewFor('map', 3),
        question: 'Which overview matches these maps?',
        correct: 0,
        options: [
          { text: 'Overall, the park kept most of its green space but gained several leisure facilities.', why: 'Correct. It reports what stayed and what changed, which is the whole point of a map overview.' },
          { text: 'Overall, the park was completely rebuilt, with nothing left from the earlier layout.', why: '“Completely” is wrong: much of the green space survives. Overstating the change misreports the maps.' },
          { text: 'Overall, the number of people using the park rose after the new facilities opened.', why: 'Maps show places, not people. There is no visitor figure anywhere on them.' },
          { text: 'Overall, the pond in the north-east was replaced by a cafe serving the new playground.', why: 'One change, plus a link between two features that the maps do not draw. This is Body 1 detail.' },
        ],
      },
      {
        source: overviewFor('line', 4),
        question: 'Which overview matches this graph?',
        correct: 0,
        options: [
          { text: 'Overall, two regions increased and one declined, and the original leader ended up behind.', why: 'Correct. Directions plus the change in ranking: the two things this graph is actually about.' },
          { text: 'Overall, renewable energy grew in every one of the three regions shown.', why: 'One region falls. An overview that contradicts a line on the graph loses more than it gains.' },
          { text: 'Overall, Region A rose from 18 per cent to 52 per cent across the period.', why: 'Exact figures for a single region. That is the evidence, not the summary.' },
          { text: 'Overall, the three regions changed course because of new environmental policies.', why: 'The graph shows what happened, never why. Policy is not plotted on it.' },
        ],
      },
      {
        source: overviewFor('bar', 4),
        question: 'Which overview matches this chart?',
        correct: 0,
        options: [
          { text: 'Overall, agriculture consumed far more water than any other sector, and the smallest sectors used very little.', why: 'Correct. The dominant bar and the bottom of the range, with no figure quoted.' },
          { text: 'Overall, water use rose sharply in agriculture and fell in each of the other four sectors.', why: 'Rose and fell compared with what? The chart shows one year, so no sector moved anywhere.' },
          { text: 'Overall, agriculture used 46 billion litres, ahead of industry on 31 billion.', why: 'Two exact figures. They belong under the overview, not in it.' },
          { text: 'Overall, agriculture wastes a great deal of the water that other sectors need.', why: '“Wastes” and “need” are judgements. The chart records volumes and nothing else.' },
        ],
      },
      {
        source: overviewFor('pie', 4),
        question: 'Which overview matches these two charts?',
        correct: 0,
        options: [
          { text: 'Overall, the two countries relied on different leading sources, with gas ahead in one and coal in the other.', why: 'Correct. With two charts, the contrast between them is the story.' },
          { text: 'Overall, gas was the largest single source of electricity in both of the two countries shown here.', why: 'Only in Country A. In Country B coal leads, and the mistake is visible at a glance.' },
          { text: 'Overall, the share generated from coal rose from 24 per cent to 40 per cent.', why: 'This treats two countries as two years. Nothing here changed over time.' },
          { text: 'Overall, Country B should move away from coal towards renewable sources.', why: 'A recommendation. Task 1 describes what is shown and stops there.' },
        ],
      },
      {
        source: overviewFor('table', 4),
        question: 'Which overview matches this table?',
        correct: 0,
        options: [
          { text: 'Overall, recycling rose for all four materials, though paper stayed highest and plastic lowest.', why: 'Correct. One shared direction plus the two ends of the range, read across the whole table.' },
          { text: 'Overall, recycling rose for some materials and fell for others over the period.', why: 'Every row rises. Reporting a fall that is not there is the costliest kind of error.' },
          { text: 'Overall, plastic recycling climbed from 18 per cent in 2010 to 46 per cent in 2020.', why: 'One row with both its figures. Precise, but it is evidence rather than a summary.' },
          { text: 'Overall, households became far more responsible about their waste during the period.', why: 'The table records rates. Responsibility is a judgement it cannot support.' },
        ],
      },
    ],
  },
  {
    title: 'Level 3 · Edit like an examiner',
    skill: 'Choose the version that is precise, complete and cautious at the same time.',
    items: [
      {
        source: overviewFor('process', 4),
        question: 'All four sound reasonable. Which one would an examiner accept?',
        correct: 0,
        options: [
          { text: 'Overall, the honey bee life cycle is cyclical, running from egg to adult before the adults sustain the next generation.', why: 'Correct. It names the shape —cyclical— and closes the loop, which is what separates a cycle from a sequence.' },
          { text: 'Overall, the honey bee passes through four stages, beginning as an egg and ending as an adult bee.', why: 'Accurate but incomplete: it presents a cycle as if it stopped. The return to the start is the point.' },
          { text: 'Overall, the honey bee life cycle is cyclical and each stage lasts approximately the same length of time.', why: 'The diagram gives no durations at all, so the second half of the sentence is invented.' },
          { text: 'Overall, the honey bee life cycle is cyclical, which makes bees more resilient than other insects.', why: 'The comparison with other insects comes from nowhere. Nothing on the diagram supports it.' },
        ],
      },
      {
        source: overviewFor('map', 4),
        question: 'All four sound reasonable. Which one would an examiner accept?',
        correct: 0,
        options: [
          { text: 'Overall, the centre was modernised, with small-scale retail and open parking replaced by larger, covered facilities.', why: 'Correct. It groups four separate changes into one pattern, which is exactly what an overview does.' },
          { text: 'Overall, the small shops became a department store and the market became a food court.', why: 'Two changes listed one by one. Grouping them is what makes it an overview rather than a body sentence.' },
          { text: 'Overall, the centre was modernised, and the changes made it much more attractive to shoppers.', why: 'The first half is right; the second is an opinion the maps cannot show.' },
          { text: 'Overall, the centre was modernised, with the multi-storey car park built in the south-east corner.', why: 'A precise location belongs in the detail paragraph. In the overview it narrows the summary to one corner.' },
        ],
      },
      {
        source: overviewFor('bar', 3),
        question: 'All four sound reasonable. Which one would an examiner accept?',
        correct: 0,
        options: [
          { text: 'Overall, Museum A attracted considerably more visitors than the others, while Museum D received the fewest.', why: 'Correct. It reports the size of the gap without quoting it, and covers both ends of the chart.' },
          { text: 'Overall, Museum A attracted more visitors than the others, while Museum D received the fewest.', why: 'Not wrong, but “more” loses the scale: A has over three times D. Cautious is not the same as vague.' },
          { text: 'Overall, Museum A attracted three and a half times as many visitors as Museum D.', why: 'A calculated ratio is a precise claim, and 2.4 against 0.7 is closer to three and a half than the sentence can safely assert.' },
          { text: 'Overall, Museum A was the clear leader and the remaining three were all very similar to each other.', why: 'B, C and D run 1.8, 1.2 and 0.7 — a steady decline, not a group of similar values.' },
        ],
      },
      {
        source: overviewFor('pie', 3),
        question: 'All four sound reasonable. Which one would an examiner accept?',
        correct: 0,
        options: [
          { text: 'Overall, visitors were distributed relatively evenly across the four seasons, with summer only slightly ahead.', why: 'Correct. It names the balance and still records which season leads, without inflating a five-point gap.' },
          { text: 'Overall, visitors were distributed evenly across the four seasons of the year.', why: 'Almost right, but it drops summer’s small lead. An overview can be brief without being incomplete.' },
          { text: 'Overall, summer was the most popular season, followed by spring, autumn and winter in that order.', why: 'Ranking four nearly equal shares makes the differences sound meaningful. They are not.' },
          { text: 'Overall, the park attracted a steady flow of visitors throughout the year without any clear peak.', why: '“Throughout the year” suggests a timeline. This chart divides one total into four shares.' },
        ],
      },
      {
        source: overviewFor('table', 3),
        question: 'All four sound reasonable. Which one would an examiner accept?',
        correct: 0,
        options: [
          { text: 'Overall, guides received the strongest ratings and transport the weakest, with accommodation and food in between.', why: 'Correct. Both extremes plus where the rest sit: the whole table in one sentence.' },
          { text: 'Overall, guides received the strongest ratings and transport the weakest of the four facilities.', why: 'Correct as far as it goes, but it leaves half the table unaccounted for.' },
          { text: 'Overall, tourists were satisfied with the guides and dissatisfied with the transport they used.', why: 'Transport still scored 41 per cent excellent. “Dissatisfied” turns a weaker rating into a negative one.' },
          { text: 'Overall, guides scored 68 per cent excellent while transport managed only 41 per cent.', why: 'Two figures, and both belong in the paragraph that comes after the overview.' },
        ],
      },
    ],
  },
]
