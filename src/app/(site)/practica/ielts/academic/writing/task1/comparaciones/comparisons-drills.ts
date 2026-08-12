/**
 * Los quince ejercicios del motor de comparaciones.
 *
 * Practican sobre los ocho gráficos con `worked: false`: la lección no imprime su comparación
 * modelo. Antes usaban los mismos veinte que la lección resuelve, y tres respuestas solapaban
 * un modelo impreso arriba, una al 88 %.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Antes había una explicación para las cuatro.
 *
 * Los errores que se reparten son los que de verdad cuestan puntos al comparar: invertir los
 * dos términos, confundir puntos porcentuales con veces, comparar cosas que no se pueden
 * comparar, meter una causa, y describir en vez de comparar.
 */

import { comparisonFor } from './comparisons-data'
import type { ComparisonExample } from './comparisons-data'

export type Option = { text: string; why: string }

export type ComparisonDrill = {
  level: 1 | 2 | 3
  source: ComparisonExample & { prompt: string }
  title: string
  question: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

export const COMPARISON_DRILLS: ComparisonDrill[] = [
  // ── Level 1 · leer una comparación ─────────────────────────────────────────
  {
    level: 1, source: comparisonFor('bar', 3), title: 'Level 1 · Read the ranking',
    question: 'Museum A recorded 2.4 million visitors and Museum D 0.7 million. Which comparison is accurate?',
    correct: 0,
    options: [
      { text: 'Museum A attracted well over three times as many visitors as Museum D did that year.', why: 'Correct. 2.4 against 0.7 is between three and four times, and “well over three” stays inside what the figures support.' },
      { text: 'Museum D attracted well over three times as many visitors as Museum A did that year.', why: 'The two museums have been swapped. Inverting the terms of a comparison is the commonest error in Task 1.' },
      { text: 'Museum A attracted 1.7 million more visitors than Museum D over the course of the decade.', why: 'The difference is right, but the chart covers a single year: “over the decade” invents a period.' },
      { text: 'Museum A attracted more visitors than Museum D because its exhibitions were better known.', why: 'The comparison is fine until “because”. The chart counts people, not the reasons they came.' },
    ],
  },
  {
    level: 1, source: comparisonFor('pie', 3), title: 'Level 1 · Compare near-equal shares',
    question: 'Summer accounts for 28 per cent of park visitors and winter for 23 per cent. Which comparison is accurate?',
    correct: 0,
    options: [
      { text: 'Summer drew slightly more visitors than winter, with only five percentage points between them.', why: 'Correct. “Slightly” matches a five-point gap, and percentage points is the right unit for the difference.' },
      { text: 'Summer drew far more visitors than winter, which was clearly the least popular season of all.', why: '“Far more” overstates a five-point gap. Exaggerating a small difference is a precision error, not a style choice.' },
      { text: 'Summer drew five per cent more visitors than winter did across the year that the chart covers.', why: 'Five percentage points is not five per cent: 28 is about 22 per cent higher than 23. The two units are not interchangeable.' },
      { text: 'Summer was the most popular season because the weather is better for outdoor activities then.', why: 'The ranking is right; the weather is not on the chart. A cause turns a comparison into a guess.' },
    ],
  },
  {
    level: 1, source: comparisonFor('table', 3), title: 'Level 1 · Read a table comparison',
    question: 'Guides were rated excellent by 68 per cent of tourists and transport by 41 per cent. Which comparison is accurate?',
    correct: 0,
    options: [
      { text: 'Guides received a considerably higher excellent rating than transport, at 68 and 41 per cent respectively.', why: 'Correct. Both facilities named, both figures in the same order as the facilities, and “respectively” used properly.' },
      { text: 'Transport received a considerably higher excellent rating than guides, at 68 and 41 per cent respectively.', why: 'The facilities are the wrong way round, so the figures now describe the opposite of what the table says.' },
      { text: 'Guides received a considerably higher excellent rating than transport, at 41 and 68 per cent respectively.', why: 'The claim is right but “respectively” attaches the figures backwards. That one word makes the sentence false.' },
      { text: 'Guides were rated excellent by most tourists, whereas almost nobody was satisfied with the transport.', why: '41 per cent excellent plus 38 per cent good is not “almost nobody”. The table does not support that reading.' },
    ],
  },
  {
    level: 1, source: comparisonFor('line', 3), title: 'Level 1 · Compare directions',
    question: 'Family visits rise across the period while student visits fall slightly. Which comparison is accurate?',
    correct: 0,
    options: [
      { text: 'Family visits rose steadily over the period, whereas visits by students fell slightly across the same years.', why: 'Correct. Two directions in one sentence, each with the strength the graph actually shows.' },
      { text: 'Family visits rose steadily over the period, whereas visits by students collapsed across the same years.', why: '“Collapsed” is far too strong for a gentle decline. Task 1 rewards matching the verb to the slope.' },
      { text: 'Family visits and student visits both rose steadily over the period covered by the graph.', why: 'Only one of them rose. Reporting a direction the line does not have is a factual error.' },
      { text: 'Family visits rose steadily over the period, whereas visits by students fell as families took their places.', why: 'The two movements are real; the connection between them is invented. Nothing shows one caused the other.' },
    ],
  },
  {
    level: 1, source: comparisonFor('bar', 4), title: 'Level 1 · Compare an extreme',
    question: 'Agriculture used 46 billion litres of water and the smallest sector, Other, used 9 billion. Which comparison is accurate?',
    correct: 0,
    options: [
      { text: 'Agriculture consumed by far the most water, using roughly five times as much as the smallest sector.', why: 'Correct. It names the extreme, gives the scale of the gap, and “roughly” keeps the ratio honest.' },
      { text: 'Agriculture consumed by far the most water, using roughly five per cent more than the smallest sector.', why: 'Five times and five per cent are wildly different claims. The second one describes a chart that does not exist.' },
      { text: 'Agriculture consumed the most water and every other sector used a very similar amount to it.', why: 'Industry is on 31 and Other on 9. Calling the rest similar erases the range the chart is showing.' },
      { text: 'Agriculture consumed by far the most water, which suggests the country depends heavily on farming.', why: 'Water use is on the chart; economic dependence is not. The comparison was fine before the conclusion.' },
    ],
  },

  // ── Level 2 · agrupar antes de escribir ────────────────────────────────────
  {
    level: 2, source: comparisonFor('line', 4), title: 'Level 2 · Group contrasting directions',
    question: 'Two regions rise and one falls, and the original leader ends up behind. Which grouping works best?',
    correct: 0,
    options: [
      { text: 'Group the two rising regions together, then contrast them with the one that declined and lost its lead.', why: 'Correct. Same direction grouped, opposite direction contrasted: the graph in two moves instead of three.' },
      { text: 'Describe each of the three regions in turn, one sentence each, in the order of the graph key.', why: 'Three separate sentences is a list. Grouping is what turns three lines into one readable comparison.' },
      { text: 'Group all three regions together as having changed substantially over the twenty-year period.', why: 'It hides the fact that one fell. A group only works when its members really do share a direction.' },
      { text: 'Start from the region that declined, since a fall is more interesting than two ordinary rises.', why: 'The reversal matters, but opening on the minority line leaves the shared pattern unexplained.' },
    ],
  },
  {
    level: 2, source: comparisonFor('pie', 4), title: 'Level 2 · Compare two compositions',
    question: 'Gas leads in Country A with 36 per cent; coal leads in Country B with 40 per cent. Which grouping works best?',
    correct: 0,
    options: [
      { text: 'Put the two leading sources side by side, then note that the remaining sources are more evenly spread.', why: 'Correct. The contrast between the two leaders is the story, and the rest is one clause, not four.' },
      { text: 'List the four sources of Country A with their figures, then do the same for Country B in turn.', why: 'Eight figures in sequence. The reader ends up with the two charts back, and no comparison at all.' },
      { text: 'Say that the two countries produced their electricity in broadly the same way as each other.', why: 'Gas leads one and coal the other. Broadly the same is exactly what these two charts are not.' },
      { text: 'Compare only the renewables, since that is the source that matters most for the future.', why: 'Renewables are 18 and 26: the smallest slice in one chart. Choosing by importance rather than by size skips the story.' },
    ],
  },
  {
    level: 2, source: comparisonFor('table', 4), title: 'Level 2 · Group a repeated pattern',
    question: 'All four materials show rising recycling rates, with paper highest and plastic lowest. Which grouping works best?',
    correct: 0,
    options: [
      { text: 'State the shared rise first, then use paper and plastic to show the range that remains between them.', why: 'Correct. One sentence for what every row does, one for the two rows that mark the extremes.' },
      { text: 'Report the twelve figures in the table row by row so that no material is left unaccounted for.', why: 'Twelve figures is the table copied out. Selection is the skill being tested here.' },
      { text: 'Compare the 2010 column against the 2020 column and leave the middle year out entirely.', why: 'Not wrong, but it drops a third of the data without saying so, and the middle year confirms the trend.' },
      { text: 'Group paper with plastic because both are packaging materials used in similar quantities.', why: 'Paper is on 73 and plastic on 46. Grouping by category instead of by figure hides the widest gap in the table.' },
    ],
  },
  {
    level: 2, source: comparisonFor('bar', 3), title: 'Level 2 · Group before writing',
    question: 'Museum A leads clearly, then B, then C, and D trails well behind. Which grouping works best?',
    correct: 0,
    options: [
      { text: 'Set Museum A apart as the clear leader, then treat the other three as a group that declines steadily.', why: 'Correct. One outlier plus one ordered group: two ideas that cover four bars.' },
      { text: 'Split the four museums into two pairs and compare the first pair against the second pair.', why: 'The pairs are arbitrary. B belongs closer to A than to D, so the split hides the shape of the ranking.' },
      { text: 'Give the visitor figure for each of the four museums in the order they appear on the chart.', why: 'Four figures in chart order is a list. The order on screen is not an argument.' },
      { text: 'Say that all four museums attracted broadly similar numbers of visitors during the year.', why: '2.4 against 0.7 is more than three to one. Similar is the one thing these bars are not.' },
    ],
  },
  {
    level: 2, source: comparisonFor('line', 3), title: 'Level 2 · Group a narrowing gap',
    question: 'Family visits climb while student visits drift down, so the two lines end much closer. Which grouping works best?',
    correct: 0,
    options: [
      { text: 'Report the two opposite directions together, then close with the gap between them being much smaller.', why: 'Correct. The narrowing is a consequence of the two directions, so it belongs in the same group as them.' },
      { text: 'Report the two directions and leave the narrowing gap for a separate paragraph further down.', why: 'The gap is the point of putting these two lines together. Splitting them loses the reason for the grouping.' },
      { text: 'Give the opening and closing figure for each of the three groups shown on the graph.', why: 'Six figures with no relationship stated. The reader can see the numbers; they need the comparison.' },
      { text: 'Say that the two groups converged because families increasingly replaced students as library users.', why: 'The convergence is visible; the replacement is a story. Two lines meeting does not mean one became the other.' },
    ],
  },

  // ── Level 3 · precisión ────────────────────────────────────────────────────
  {
    level: 3, source: comparisonFor('table', 3), title: 'Level 3 · Avoid a false comparison',
    question: 'Accommodation scored 62 per cent excellent and transport 41 per cent. Which sentence is safe?',
    correct: 0,
    options: [
      { text: 'Accommodation was rated excellent by around half as many tourists again as transport was.', why: 'Correct. 62 against 41 is close to one and a half times, and “around” keeps the claim inside the data.' },
      { text: 'Accommodation was rated excellent by exactly one and a half times as many tourists as transport.', why: '62 divided by 41 is 1.51. “Exactly” claims a precision the rounding does not allow.' },
      { text: 'Accommodation was rated excellent by 21 per cent more tourists than transport was rated.', why: 'The gap is 21 percentage points, which is a 51 per cent increase. Mixing the two units misreports the size.' },
      { text: 'Accommodation was rated excellent twice as often as transport by the tourists who were surveyed.', why: 'Twice would need 82. This inflates a real difference into one the table does not show.' },
    ],
  },
  {
    level: 3, source: comparisonFor('pie', 3), title: 'Level 3 · Use a measured comparison',
    question: 'The four seasons run 28, 25, 24 and 23 per cent. Which sentence is most accurate?',
    correct: 0,
    options: [
      { text: 'Visitor numbers were spread almost evenly, with no season more than five points from any other.', why: 'Correct. It names the balance and bounds the difference, which is the honest way to report near-equal shares.' },
      { text: 'Summer was the most popular season, followed in order by spring, then autumn, then winter.', why: 'The ranking is right but meaningless: ordering four shares within five points suggests differences that are not there.' },
      { text: 'Visitor numbers were identical across the four seasons that the pie chart divides the year into.', why: 'They are close, not identical. Five points is small, but reporting it as zero is still wrong.' },
      { text: 'Summer attracted noticeably more visitors than the other three seasons shown on this chart.', why: '“Noticeably” does not fit a three-point lead over spring. The word promises more than the slice delivers.' },
    ],
  },
  {
    level: 3, source: comparisonFor('bar', 4), title: 'Level 3 · Build a precise sentence',
    question: 'Agriculture used 46 billion litres, industry 31 and homes 18. Which sentence is most precise?',
    correct: 0,
    options: [
      { text: 'Agriculture used about half as much again as industry, which in turn used well over what homes did.', why: 'Correct. Two comparisons chained, each one approximate, and neither claiming more than the bars show.' },
      { text: 'Agriculture used 15 billion litres more than industry, which used 13 billion more than homes did.', why: 'The arithmetic is right, but three figures and two subtractions leave the reader doing the comparison themselves.' },
      { text: 'Agriculture used three times as much water as industry and industry twice as much as homes did.', why: '46 is not three times 31. The first ratio is invented and the sentence collapses on it.' },
      { text: 'Agriculture, industry and homes used 46, 31 and 18 billion litres of water respectively that year.', why: 'Accurate, but it is a list with “respectively” attached. Nothing in it compares anything.' },
    ],
  },
  {
    level: 3, source: comparisonFor('line', 4), title: 'Level 3 · Compare changes precisely',
    question: 'Region A goes from 18 to 52 per cent while Region B falls from 42 to 25. Which sentence is most accurate?',
    correct: 0,
    options: [
      { text: 'Region A gained 34 percentage points while Region B lost 17, so the two ended in opposite positions.', why: 'Correct. Percentage points for both movements, and the consequence stated without extra arithmetic.' },
      { text: 'Region A gained 34 per cent while Region B lost 17 per cent over the period that the graph shows.', why: 'A rise from 18 to 52 is a gain of 34 points but of about 189 per cent. The unit changes the claim completely.' },
      { text: 'Region A almost tripled while Region B almost halved, ending at very similar levels to each other.', why: 'The ratios are close enough, but 52 and 25 are not similar levels: A ends at roughly double B.' },
      { text: 'Region A overtook Region B because it invested earlier in wind and solar generation than B did.', why: 'The overtaking is on the graph; the investment is not. The sentence was accurate until it explained itself.' },
    ],
  },
  {
    level: 3, source: comparisonFor('pie', 4), title: 'Level 3 · Compare two compositions precisely',
    question: 'Coal is 24 per cent in Country A and 40 per cent in Country B. Which sentence is most accurate?',
    correct: 0,
    options: [
      { text: 'Coal accounted for 16 percentage points more of the mix in Country B than it did in Country A.', why: 'Correct. Two shares from two different charts compared in the one unit that makes them comparable.' },
      { text: 'Coal accounted for 16 per cent more of the electricity mix in Country B than it did in Country A.', why: '16 points, but two thirds more in relative terms. The wrong unit understates the gap by a wide margin.' },
      { text: 'Country B produced considerably more electricity from coal than Country A managed to produce.', why: 'These are shares, not amounts. A country with a bigger share may still produce less in total.' },
      { text: 'Coal was the dominant source in both of the countries that the two pie charts compare here.', why: 'It leads in B only. In A, gas is ahead of coal by twelve points.' },
    ],
  },
]

export const COMPARISON_LEVELS = [1, 2, 3] as const
