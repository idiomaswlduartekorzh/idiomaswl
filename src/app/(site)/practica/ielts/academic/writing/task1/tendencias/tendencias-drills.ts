/**
 * Los nueve ejercicios del motor de tendencias.
 *
 * Practican sobre los cuatro gráficos de `PRACTICE_SCENARIOS`, que el ejercicio de selección
 * de arriba no disecciona. Antes usaban los cinco escenarios que ese ejercicio abre en canal,
 * y la respuesta de nivel 3 era literalmente la suma de las tres observaciones que acababan de
 * marcarse como correctas.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Antes había una explicación para las cuatro.
 */

import { practiceScenario } from './tendencias-scenarios'
import type { Scenario } from './tendencias-scenarios'

export type Option = { text: string; why: string }

export type TrendDrill = {
  scenario: Scenario
  question: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

export const TREND_LEVELS: { title: string; items: TrendDrill[] }[] = [
  {
    title: 'Level 1 · Classify the observation',
    items: [
      {
        scenario: practiceScenario('phones'),
        question: 'Which of these is an overall trend?',
        correct: 0,
        options: [
          { text: 'All three countries ended the period with more subscriptions than they started with.', why: 'Correct. A direction shared by every line is exactly what an overall trend means.' },
          { text: 'Country X reached 132 subscriptions per 100 people in the final year recorded here.', why: 'One country, one year, one figure. Precise, but it describes a point rather than a trend.' },
          { text: 'Country Z overtook Country X at some point during the twenty years the graph covers.', why: 'It never does: Z ends on 104 and X on 132. Reporting a crossing that is not there is a factual error.' },
          { text: 'The graph covers a period of exactly twenty years, from the year 2000 to the year 2020.', why: 'That is the axis, not the data. Describing the chart’s furniture fills space and says nothing.' },
        ],
      },
      {
        scenario: practiceScenario('housing'),
        question: 'Which observation describes the anomaly in this graph?',
        correct: 0,
        options: [
          { text: 'City B climbed until 2014, then fell sharply, and only began recovering after 2018.', why: 'Correct. A break in the pattern is the anomaly, and here it is the only line that changes direction twice.' },
          { text: 'City A rose in every single period that the graph records, without interruption.', why: 'True, and worth saying elsewhere — but a steady rise is the opposite of an anomaly.' },
          { text: 'City B stood at 132 in 2014, which was its highest point before the fall began.', why: 'The figure marks where the anomaly starts, but quoting it is detail work, not identification.' },
          { text: 'House prices in City B fell because interest rates rose sharply during those years.', why: 'The graph plots an index, not interest rates. The cause is imported from outside the chart.' },
        ],
      },
      {
        scenario: practiceScenario('news'),
        question: 'Which observation belongs in an overview?',
        correct: 0,
        options: [
          { text: 'Online news overtook printed papers at some point between 2010 and 2015.', why: 'Correct. A change in leadership reshapes the whole graph, so it belongs in the summary.' },
          { text: 'Printed papers stood at 22 million readers in 2015, halfway through the period.', why: 'A single figure from a single year. It supports the fall but does not summarise it.' },
          { text: 'Radio was the least popular of the three formats by the end of the period shown.', why: 'It was not: radio ends on 18 million and print on 11. Check the final values before ranking.' },
          { text: 'Online news grew quickly because smartphones became cheaper and more widespread.', why: 'The graph counts readers. Phones and prices are nowhere on it.' },
        ],
      },
    ],
  },
  {
    title: 'Level 2 · Select the main features',
    items: [
      {
        scenario: practiceScenario('languages'),
        question: 'Which pair of features is worth putting in the overview?',
        correct: 0,
        options: [
          { text: 'Spanish rose throughout while French declined, and Mandarin rose and then fell back.', why: 'Correct. Three lines, three directions, one sentence: the shape of the whole graph.' },
          { text: 'Spanish was on 12 in 2012 and Mandarin finished the period on 11 in the year 2024.', why: 'Two figures from two different lines and two different years, with no relationship between them.' },
          { text: 'Both Mandarin and French ended the period below the level that Spanish reached.', why: 'True, but it is only a final ranking: it loses Mandarin’s rise and fall, which is the graph’s most striking feature.' },
          { text: 'All three of the languages became more popular over the period that the graph covers.', why: 'Two of the three fell. An overview that contradicts the lines costs more than saying nothing.' },
        ],
      },
      {
        scenario: practiceScenario('phones'),
        question: 'Which features should be prioritised here?',
        correct: 0,
        options: [
          { text: 'Country X levelled off after 2010 while the other two kept climbing, so the gap narrowed.', why: 'Correct. It catches the change in pace, which is what makes this graph more than three rising lines.' },
          { text: 'Country X began on 58, Country Y on 22 and Country Z on 4 subscriptions per 100 people.', why: 'Three starting figures. They belong in the detail paragraph that explains where each country began.' },
          { text: 'All three countries increased over the period, and Country X stayed ahead of the others.', why: 'Accurate but incomplete: it misses that X stopped growing while the others closed in.' },
          { text: 'Country Z is likely to overtake Country X within the next ten years at this rate.', why: 'The graph stops in 2020. Task 1 describes what is drawn and never predicts beyond it.' },
        ],
      },
      {
        scenario: practiceScenario('news'),
        question: 'Which combination best explains the change in leadership?',
        correct: 0,
        options: [
          { text: 'Print led at the start, but online grew quickly and had passed it before 2015.', why: 'Correct. Starting position, rate of change and the moment of the crossing: all three are needed.' },
          { text: 'Online finished the period on 52 million readers and printed papers on 11 million.', why: 'The final figures alone. They show the outcome but not that the two lines ever crossed.' },
          { text: 'Radio remained stable while the other two formats moved in opposite directions.', why: 'True, and useful — but it is about the line that did not change leadership.' },
          { text: 'Printed papers declined because online news could be read free of charge.', why: 'Price is not on the graph. The moment a Task 1 answer explains why, it has left the data.' },
        ],
      },
    ],
  },
  {
    title: 'Level 3 · Draft the strongest overview',
    items: [
      {
        scenario: practiceScenario('housing'),
        question: 'Which sentence best summarises this graph?',
        correct: 0,
        options: [
          { text: 'Overall, City A rose steadily and City C barely moved, while City B fell sharply before recovering.', why: 'Correct. Three different behaviours in one sentence, and the anomaly is named without a figure.' },
          { text: 'Overall, house prices rose in all three of the cities that the graph shows over the period.', why: 'City C moved six points in fourteen years. Calling that a rise flattens the only thing it does.' },
          { text: 'Overall, City B recovered completely and finished as the strongest of the three markets.', why: 'B ends on 140 and A on 178. The recovery is real; being strongest is not.' },
          { text: 'Overall, City A rose from 100 to 178 while City C went from 100 to only 106 points.', why: 'Four figures and no mention of City B, which is the line that actually needs explaining.' },
        ],
      },
      {
        scenario: practiceScenario('languages'),
        question: 'Which overview avoids both a list and an interpretation?',
        correct: 0,
        options: [
          { text: 'Overall, Spanish grew throughout and French declined, while Mandarin rose sharply and then fell back.', why: 'Correct. Every line accounted for, no figures quoted, and no explanation of why any of it happened.' },
          { text: 'Overall, Spanish went from 12 to 29, Mandarin from 4 to 11 and French from 21 down to 12.', why: 'Six figures in one sentence. This is the detail paragraph arriving two paragraphs early.' },
          { text: 'Overall, interest in Mandarin faded once the initial enthusiasm for the language wore off.', why: 'The fall is visible; the enthusiasm is not. This explains a line instead of describing it.' },
          { text: 'Overall, Spanish became the most popular of the three languages because it is easier to learn.', why: 'A cause and a judgement in the same clause, and neither is anywhere on the graph.' },
        ],
      },
      {
        scenario: practiceScenario('news'),
        question: 'Which version is the most complete and cautious?',
        correct: 0,
        options: [
          { text: 'Overall, online rose sharply and overtook print, which fell throughout, while radio hardly changed.', why: 'Correct. All three lines, the crossing, and the stable one that stops the summary being a story about two.' },
          { text: 'Overall, online reading rose sharply and overtook printed papers, which fell across the period.', why: 'Right as far as it goes, but radio is a third of the graph and it is not mentioned at all.' },
          { text: 'Overall, people gave up printed newspapers and moved across to reading the news online.', why: 'Two lines moving in opposite directions does not prove the same readers switched. That is a story, not the data.' },
          { text: 'Overall, online rose from 8 to 52 million while printed papers fell from 42 down to 11 million.', why: 'Four figures. Accurate, but the overview is where you say what happened, not how much.' },
        ],
      },
    ],
  },
]
