/**
 * Los doce ejercicios de Body 1 y Body 2.
 *
 * POR QUÉ SE MOVIERON DE GRÁFICO
 *
 * Medido el 12 de agosto de 2026: el motor practicaba sobre **los seis mismos gráficos** que
 * la lección de arriba, y esa lección imprime un párrafo modelo para cada uno. Resultado:
 * **5 de las 12 respuestas solapaban un modelo impreso en la misma página**, una de ellas
 * palabra por palabra. Y el motor va dentro de la lección, así que el modelo estaba a un
 * palmo del ejercicio.
 *
 * Ahora la lección se queda con sus seis —line 0, bar 0, pie 1, table 0, process 0, map 0— y
 * el motor practica sobre otros seis: line 1, bar 1, pie 4, table 1, process 1, map 1. Mismo
 * tipo de gráfico, otro contenido, ninguna respuesta impresa arriba.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Antes había una sola explicación para las cuatro: quien
 * fallaba leía por qué la buena era buena, nunca por qué la suya era mala.
 */

import { promptFor } from './task1-visuals'
import type { VisualKind } from './task1-visuals'

export type Body = 1 | 2

export type Option = { text: string; why: string }

export type BodyDrill = {
  level: 1 | 2 | 3
  visual: VisualKind
  /** La variante. Ninguna coincide con las que la lección resuelve encima. */
  variant: number
  /** Lo que ya se ve en el gráfico, o lo que Body 1 dejó hecho. */
  situation: string
  question: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

/** El enunciado del gráfico, para no escribirlo dos veces. */
export const promptOf = (drill: BodyDrill) => promptFor(drill.visual, drill.variant)

export const BODY_1_DRILLS: BodyDrill[] = [
  {
    level: 1, visual: 'line', variant: 1,
    situation: 'Metro and tram journeys rise across the period while bus journeys fall, and metro ends highest.',
    question: 'What should Body 1 do first?',
    correct: 0,
    options: [
      { text: 'Take the two rising modes together and support them with a couple of figures.', why: 'Correct. Body 1 opens the evidence with the dominant pattern, and two lines moving the same way are one pattern.' },
      { text: 'List every value recorded for all three modes, year by year, so nothing is left out.', why: 'A complete list is not a paragraph. Task 1 rewards selection, and the reader loses the pattern.' },
      { text: 'Explain why passengers moved away from buses and towards the metro during those years.', why: 'The graph counts journeys. Any reason for the change is invented, and invented reasons cost marks.' },
      { text: 'Repeat the overview sentence about the three modes and leave the figures for Body 2.', why: 'Body 1 exists to add evidence. Restating the overview leaves the paragraph doing no work at all.' },
    ],
  },
  {
    level: 1, visual: 'bar', variant: 1,
    situation: 'The library is chosen by far the most, the gym follows, and clubs come last well behind the rest.',
    question: 'Which opening groups the chart instead of listing it?',
    correct: 0,
    options: [
      { text: 'Name the library as the clear leader and put the gym with it as the second popular choice.', why: 'Correct. It starts from the hierarchy the chart actually has, which is what makes it a group and not a list.' },
      { text: 'Go through the five facilities from left to right, giving the percentage for each one.', why: 'Left to right is the chart’s layout, not its meaning. The order on screen is not an argument.' },
      { text: 'Say that all five facilities were popular among the students surveyed that year.', why: '28 per cent against 74 is not “all popular”. Flattening the range removes the only story there is.' },
      { text: 'Point out that clubs were the least chosen of the five and stop there, saving the rest for Body 2.', why: 'Starting at the bottom leaves Body 1 with the weakest fact and Body 2 with everything else.' },
    ],
  },
  {
    level: 2, visual: 'pie', variant: 4,
    situation: 'In Country A gas leads with 36 per cent; in Country B coal leads with 40 per cent.',
    question: 'Which sentence gathers the evidence best for a first detail paragraph?',
    correct: 0,
    options: [
      { text: 'In Country A, gas supplied the largest share at 36 per cent, ahead of coal on 24 per cent.', why: 'Correct. One country, its leading source, and a figure that earns its place by supporting the claim.' },
      { text: 'In Country A, gas supplied 36 per cent, coal 24 per cent, nuclear 22 and renewables 18 per cent.', why: 'Four figures with no relationship between them. The reader gets the table back, not a paragraph.' },
      { text: 'Country A relied on gas while Country B relied on coal, and neither used much nuclear power.', why: 'It handles both charts at once, so Body 2 has nothing left. Split the countries between the paragraphs.' },
      { text: 'Country A had a healthier energy mix than Country B, with less dependence on fossil fuels.', why: '“Healthier” is a judgement, and gas is a fossil fuel too: Country A is not less dependent on them.' },
    ],
  },
  {
    level: 2, visual: 'table', variant: 1,
    situation: 'Business has the most students in all three years; Science starts lowest but more than doubles.',
    question: 'Which grouping belongs in the first detail paragraph?',
    correct: 0,
    options: [
      { text: 'Business as the largest subject throughout, with its figures at the start and end of the period.', why: 'Correct. A row that holds its position across every column is the clearest single pattern in the table.' },
      { text: 'Every cell in the table, read row by row, so that all twelve of the figures appear somewhere.', why: 'Twelve figures is the table copied out. The paragraph has to choose, and choosing is the skill.' },
      { text: 'The 2020 column on its own, comparing the four subjects in that middle year.', why: 'One column ignores the change over time, which is the reason the table has three of them.' },
      { text: 'Business and Science together, since one is the largest and the other grew the fastest.', why: 'Two different patterns forced into one sentence. Give Science its own paragraph, where the growth can be shown.' },
    ],
  },
  {
    level: 3, visual: 'process', variant: 1,
    situation: 'The first stages are harvesting the cherries, drying them in the sun and removing their outer layers.',
    question: 'Which paragraph is best organised?',
    correct: 0,
    options: [
      { text: 'Initially, ripe cherries are picked from the plants and spread out to dry in the sun. Their outer layers are then removed before roasting begins.', why: 'Correct. Three consecutive stages, in order, in the passive, with the fourth signposted but not yet described.' },
      { text: 'The cherries are picked. The cherries are dried. The outer layers are removed. The beans are then roasted and finally packed for sale.', why: 'Four sentences of identical shape. Accurate, but nothing links the stages and Body 1 has taken Body 2’s work.' },
      { text: 'Farmers pick the ripe cherries by hand and then their workers spread them out to dry in the sun.', why: 'The diagram shows the material, not who handles it. Inventing the people is why Task 1 favours the passive here.' },
      { text: 'Initially, the beans are roasted to the required colour, after which the cherries are dried in the sun.', why: 'The order is reversed. Roasting is the fourth stage, and a sequence reported backwards is simply wrong.' },
    ],
  },
  {
    level: 3, visual: 'map', variant: 1,
    situation: 'In the north of the campus the lecture hall became a library and the garden became student flats.',
    question: 'Which paragraph opening is accurate?',
    correct: 0,
    options: [
      { text: 'In the northern half of the campus, the lecture hall was replaced by a library, while the garden gave way to student flats.', why: 'Correct. It names the area, both changes and the direction of each, without adding anything the maps do not show.' },
      { text: 'The northern half of the campus became a far more pleasant place to study once the work was finished.', why: 'Pleasantness is not on a map. This is an opinion where the paragraph needs a description.' },
      { text: 'The number of students living on the campus rose sharply after the new flats had been completed.', why: 'Maps show buildings, not people. There is no student figure anywhere on them.' },
      { text: 'The garden in the north of the campus was relocated to the southern side, right next to the new sports centre.', why: 'Nothing was relocated: the garden was built over. Moving a feature that was replaced misreports the change.' },
    ],
  },
]

export const BODY_2_DRILLS: BodyDrill[] = [
  {
    level: 1, visual: 'line', variant: 1,
    situation: 'Body 1 has covered metro and tram, the two modes that rose.',
    question: 'What should Body 2 add?',
    correct: 0,
    options: [
      { text: 'The decline in bus journeys, and how it compares with the two modes already described.', why: 'Correct. The line moving the other way is the contrast that completes the graph.' },
      { text: 'The metro figures again, this time with every year given rather than just two.', why: 'Body 1 already covered the metro. More figures for the same line is repetition, not a second paragraph.' },
      { text: 'A prediction of which mode is likely to carry the most passengers after 2025.', why: 'The graph stops in 2025. Task 1 reports what is shown and never guesses beyond it.' },
      { text: 'The conclusion that the city’s investment in the metro network over those years has clearly paid off.', why: 'Investment is not plotted anywhere, and Task 1 has no conclusion to draw.' },
    ],
  },
  {
    level: 1, visual: 'bar', variant: 1,
    situation: 'Body 1 has covered the library and the gym, the two most popular facilities.',
    question: 'What is the best job for Body 2?',
    correct: 0,
    options: [
      { text: 'The lower end: the cafeteria, the labs and clubs, and how far behind the leaders they fall.', why: 'Correct. The rest of the chart, grouped, with the gap to Body 1 making the two paragraphs work together.' },
      { text: 'The library once more, explaining in detail why students chose it more than anything else.', why: 'Repeats Body 1 and adds a reason the chart cannot support. Two faults in one sentence.' },
      { text: 'Each of the five facilities in turn, so the paragraph gives a complete account of the chart.', why: 'Body 1 already handled two of them. Going back over all five undoes the grouping you just did.' },
      { text: 'A recommendation that the university should invest more in its clubs and laboratories.', why: 'Advice, not description. The chart records what students chose, not what anyone should do about it.' },
    ],
  },
  {
    level: 2, visual: 'pie', variant: 4,
    situation: 'Body 1 has described Country A, where gas leads.',
    question: 'Which sentence makes a precise Body 2 comparison?',
    correct: 0,
    options: [
      { text: 'Country B, by contrast, depended mainly on coal at 40 per cent, well above the 24 per cent recorded in Country A.', why: 'Correct. It moves to the second chart, names its leader and ties the figure back to Body 1.' },
      { text: 'Country B was different from Country A in the way it produced its electricity that year.', why: 'True but empty. It announces a contrast and then never says what the contrast is.' },
      { text: 'Country B produced 40 per cent more electricity from coal than Country A did that year.', why: '40 against 24 is not “40 per cent more”: percentage points and percentages are not the same thing.' },
      { text: 'Country B used renewables for 26 per cent of its electricity, compared with just 18 per cent in Country A.', why: 'Accurate, but it starts with a minor source. Body 2 opens on the leader, as Body 1 did.' },
    ],
  },
  {
    level: 2, visual: 'table', variant: 1,
    situation: 'Body 1 has covered Business, the largest subject in every year.',
    question: 'Which Body 2 grouping adds something new?',
    correct: 0,
    options: [
      { text: 'The rate of growth: Science more than doubled while Arts barely moved, despite starting closer together.', why: 'Correct. Body 1 handled size; Body 2 handles speed of change. A different dimension of the same table.' },
      { text: 'Business once more, adding the 2020 figure that Body 1 did not have enough room to include.', why: 'A missing figure is not a paragraph. Body 2 has to change the angle, not fill a gap.' },
      { text: 'All four subjects in 2025, listing the final figure recorded for each of them.', why: 'One column, four numbers, no relationship. It also ignores the two earlier years entirely.' },
      { text: 'The reason universities have seen so many more Science students arrive over the decade.', why: 'The table counts enrolments. Why they rose is nowhere in it.' },
    ],
  },
  {
    level: 3, visual: 'process', variant: 1,
    situation: 'Body 1 has covered harvesting, drying and removing the outer layers.',
    question: 'Which sentence completes the process logically?',
    correct: 0,
    options: [
      { text: 'The beans are then roasted until they reach the required colour, after which they are ground and packed for sale.', why: 'Correct. It picks up exactly where Body 1 stopped and carries the sequence to its end.' },
      { text: 'Next, the ripe cherries are picked from the plants and then left in the sun to dry out for several days.', why: 'This restarts the process. Body 1 already did these stages, so the response now describes them twice.' },
      { text: 'The beans are then roasted, which is the most important stage of the entire production process.', why: 'A diagram shows an order, not a ranking. Nothing on it makes roasting more important than drying.' },
      { text: 'The beans are then roasted for approximately twelve minutes before being ground and packed.', why: 'There is no timing anywhere on the diagram. A precise duration is invented precision.' },
    ],
  },
  {
    level: 3, visual: 'map', variant: 1,
    situation: 'Body 1 has covered the northern half: the library and the student flats.',
    question: 'Which sentence completes the map response?',
    correct: 0,
    options: [
      { text: 'Meanwhile, in the south, the car park made way for a cycle path and the sports field was built over by a sports centre.', why: 'Correct. It signals the move to the second area and reports both changes there.' },
      { text: 'Meanwhile, the lecture hall in the north was replaced by a library serving the whole campus.', why: 'Body 1 already reported this. Body 2 has to move somewhere the reader has not been.' },
      { text: 'The campus as a whole became far better equipped for the students who arrived after 2025.', why: 'An evaluation, and about a year the maps do not cover.' },
      { text: 'In the south, the existing cycle path was widened again and a second sports centre was added right beside the first one.', why: 'Neither happened: the car park became the cycle path and the field became the centre. There is only one of each.' },
    ],
  },
]

export const DRILLS: Record<Body, BodyDrill[]> = { 1: BODY_1_DRILLS, 2: BODY_2_DRILLS }
