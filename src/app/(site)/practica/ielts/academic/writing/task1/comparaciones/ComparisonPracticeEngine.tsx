'use client';

import { useMemo, useState } from 'react';
import { IELTSBarChartVisual, IELTSLineGraphVisual, IELTSPieChartVisual, IELTSTableVisual } from '../Task1VisualLab';

type Question = {
  level: 1 | 2 | 3;
  visual: 'line' | 'bar' | 'pie' | 'table';
  variant: number;
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  slot: 0 | 1 | 2 | 3;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    level: 1, visual: 'bar', variant: 0, title: 'Level 1 · Match the comparison',
    prompt: 'Which sentence accurately compares the two highest categories?',
    options: [
      'Housing accounted for more household expenditure than leisure, at 32% and 21% respectively.',
      'Leisure accounted for more household expenditure than housing, at 32% and 21% respectively.',
      'Housing represented exactly half of household expenditure.',
      'The chart shows how housing expenditure increased between 2010 and 2024.',
    ], answer: 0, slot: 2,
    explanation: 'The sentence names both categories, preserves their order and uses “respectively” correctly. It compares the two highest bars without inventing a time trend.',
  },
  {
    level: 1, visual: 'pie', variant: 2, title: 'Level 1 · Select the precise contrast',
    prompt: 'Flexibility accounts for 42% of online-course choices, while other reasons account for 13%. Which comparison is accurate?',
    options: [
      'Flexibility represented just over three times the share recorded for other reasons.',
      'The largest share was slightly higher than the smallest.',
      'The smallest share accounted for the majority.',
      'Both shares represented exactly the same proportion.',
    ], answer: 0, slot: 0,
    explanation: 'Forty-two is slightly more than three times thirteen, so this wording reflects the relationship without claiming an exact multiple.',
  },
  {
    level: 2, visual: 'line', variant: 0, title: 'Level 2 · Choose the overview claim',
    prompt: 'The three series all rise, but Region A remains highest throughout. Which overview is strongest?',
    options: [
      'Overall, all three regions experienced growth, while Region A remained the leading region.',
      'Overall, Region C fell sharply and became the leading region by 2020.',
      'Overall, the graph compares three regions without showing any clear pattern.',
      'Overall, Region A started at 31% in 2000 and ended at 88% in 2020.',
    ], answer: 0, slot: 3,
    explanation: 'An overview selects the dominant pattern and the stable ranking. Exact figures belong in the detail paragraphs, not in the overview.',
  },
  {
    level: 2, visual: 'bar', variant: 1, title: 'Level 2 · Group before writing',
    prompt: 'The library has the highest figure at 74%, followed by the gym at 61%; clubs are lowest at 28%. Which grouping supports a clear comparison?',
    options: [
      'The library and gym formed a higher group, whereas the remaining facilities were less frequently selected and clubs ranked last.',
      'Every facility was selected equally often, so no comparison was possible.',
      'The library doubled from 28% to 74% during the period.',
      'All facility preferences declined steadily over time.',
    ], answer: 0, slot: 1,
    explanation: 'Grouping the strongest facilities and then identifying the weakest result prevents a mechanical bar-by-bar list.',
  },
  {
    level: 3, visual: 'line', variant: 0, title: 'Level 3 · Build a precise sentence',
    prompt: 'Region A rises from 30% to 88%; Region C rises from 6% to 57%. Select the best comparison.',
    options: [
      'Although both regions grew substantially, Region A remained higher and finished about 31 percentage points above Region C.',
      'Region C was always higher than Region A, despite both regions growing substantially.',
      'Region A increased by 31 percentage points more than Region C at every time point.',
      'Both regions had the same final value, with Region A finishing at 88%.',
    ], answer: 0, slot: 1,
    explanation: 'The sentence identifies the shared trend, preserves the ranking and calculates the final gap correctly: 88 minus 57 equals 31 percentage points.',
  },
  {
    level: 3, visual: 'pie', variant: 1, title: 'Level 3 · Avoid a false comparison',
    prompt: 'Housing changes from 22% in 2000 to 31% in 2020. Which sentence is safest?',
    options: [
      'Housing increased its share by 9 percentage points, from 22% to 31%.',
      'Housing increased nine times, from 22% to 31%.',
      'Housing doubled its share, from 22% to 31%.',
      'Housing disappeared after accounting for 31% initially.',
    ], answer: 0, slot: 3,
    explanation: 'The change is nine percentage points, not nine times and not a doubling. Precision in units is part of accurate Task 1 comparison.',
  },
  {
    level: 1, visual: 'line', variant: 1, title: 'Level 1 · Read the ranking',
    prompt: 'In 2010, bus trips total 70 million and tram trips total 15 million. Which comparison is accurate?',
    options: [
      'Bus trips were substantially higher than tram trips, by 55 million.',
      'Tram trips were higher than bus trips by 55 million.',
      'Both modes recorded the same number of trips.',
      'Bus trips rose from 15 to 70 million in 2010.',
    ], answer: 0, slot: 1,
    explanation: 'The comparison preserves the ranking and the difference: 70 minus 15 equals 55 million. It does not invent a change within one year.',
  },
  {
    level: 1, visual: 'bar', variant: 2, title: 'Level 1 · Compare an extreme',
    prompt: 'Average screen time is 5.8 hours for 16–24-year-olds and 2.1 hours for people aged 55+. Which sentence is safest?',
    options: [
      'The youngest group spent considerably more time on screens than the oldest group.',
      'The oldest group spent the most time on screens.',
      'Both groups recorded almost identical figures.',
      'Screen time rose from 2.1 to 5.8 hours over the period.',
    ], answer: 0, slot: 3,
    explanation: 'This is a static age-group chart. Considerably more accurately expresses the large visible contrast without inventing a time trend.',
  },
  {
    level: 2, visual: 'pie', variant: 0, title: 'Level 2 · Group the main shares',
    prompt: 'Solar and wind account for 34% and 28% of energy production respectively. Which grouping is most useful?',
    options: [
      'Solar and wind together formed a clear majority, at 62%.',
      'Hydro and other sources together formed exactly 80%.',
      'All four sources contributed equal proportions.',
      'Solar became the largest source after increasing from 28%.',
    ], answer: 0, slot: 0,
    explanation: 'Combining the two largest sectors reveals the dominant pattern: 34% plus 28% equals 62%. The pie gives no time series.',
  },
  {
    level: 2, visual: 'line', variant: 2, title: 'Level 2 · Group contrasting directions',
    prompt: 'North rises from 12% to 55%, while Central falls from 45% to 36%. Which sentence groups the evidence best?',
    options: [
      'North increased markedly, whereas Central declined gradually over the period.',
      'North and Central followed the same upward trend.',
      'Central overtook North at every point in the period.',
      'The graph proves that cycling policies were effective.',
    ], answer: 0, slot: 2,
    explanation: 'The sentence captures the opposing directions and suitable degree language. It does not add a causal claim the graph cannot prove.',
  },
  {
    level: 3, visual: 'bar', variant: 3, title: 'Level 3 · Use a measured comparison',
    prompt: 'Museum A receives 2.4 million visitors and Museum D receives 0.7 million. Which comparison is most precise?',
    options: [
      'Museum A attracted about 1.7 million more visitors than Museum D.',
      'Museum D attracted more than Museum A.',
      'Museum A was twice as popular as Museum D.',
      'Museum D overtook Museum A during the year.',
    ], answer: 0, slot: 0,
    explanation: 'The difference is 1.7 million. About is appropriate because the data are displayed to one decimal place; twice would understate the gap.',
  },
  {
    level: 3, visual: 'pie', variant: 4, title: 'Level 3 · Compare two compositions',
    prompt: 'In Country A, gas is 36% and coal is 24%; in Country B, gas is 18% and coal is 40%. Which overview is strongest?',
    options: [
      'Overall, gas was the leading source in Country A, whereas coal dominated electricity generation in Country B.',
      'Overall, both countries relied on gas to exactly the same extent.',
      'Overall, coal became more popular between 2000 and 2020.',
      'Overall, Country B generated twice as much electricity as Country A.',
    ], answer: 0, slot: 2,
    explanation: 'The two pies support a contrast in dominant source. They do not provide a time trend or total output figures.',
  },
  {
    level: 1, visual: 'table', variant: 0, title: 'Level 1 · Read a table comparison',
    prompt: 'Among 18-24-year-olds, daily social-media use is 92% in the USA and 84% in Canada. Which sentence is accurate?',
    options: [
      'The USA recorded 8 percentage points more daily use than Canada among 18-24-year-olds.',
      'Canada recorded 8 percentage points more daily use than the USA among 18-24-year-olds.',
      'Both countries recorded identical levels of use among the youngest group.',
      'Use in the USA rose from 84% to 92% during the period.',
    ], answer: 0, slot: 1,
    explanation: 'The row compares two countries at one point in time. Ninety-two minus eighty-four equals eight percentage points, and the table does not show a time trend.',
  },
  {
    level: 2, visual: 'table', variant: 1, title: 'Level 2 · Group a repeated pattern',
    prompt: 'In every year shown, Business has the highest number of international students and Science has the lowest. Which grouping is strongest?',
    options: [
      'Business remained the leading subject throughout, whereas Science consistently recorded the smallest cohort.',
      'All subjects enrolled exactly the same number of students in every year.',
      'Science overtook Business in 2025.',
      'Business and Science were the only two subjects in the table.',
    ], answer: 0, slot: 3,
    explanation: 'A useful table comparison identifies a repeated ranking rather than listing every cell. The data show Business at the top and Science at the bottom in all three years.',
  },
  {
    level: 3, visual: 'table', variant: 4, title: 'Level 3 · Compare changes precisely',
    prompt: 'Paper recycling rises from 52% to 73%, while metal recycling rises from 44% to 67%. Which comparison is most precise?',
    options: [
      'Both materials increased, but metal recorded the slightly larger rise: 23 rather than 21 percentage points.',
      'Paper increased by 73 percentage points, whereas metal increased by 67 percentage points.',
      'Metal fell from 67% to 44%, while paper stayed unchanged.',
      'Both materials doubled by exactly the same amount.',
    ], answer: 0, slot: 2,
    explanation: 'Paper rises by 21 percentage points and metal by 23. The answer reports both the shared direction and the small difference in scale without overstating it.',
  },
];

const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
} as const;

function arrangeOptions(question: Question) {
  const correctOption = question.options[question.answer];
  const distractors = question.options.filter((_, index) => index !== question.answer);
  const options = [...distractors];
  options.splice(question.slot, 0, correctOption);
  return options;
}

export default function ComparisonPracticeEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const questions = QUESTIONS.filter((item) => item.level === level);
  const question = questions[index % questions.length];
  const Visual = VISUALS[question.visual];
  const options = useMemo(() => arrangeOptions(question), [question]);
  const correctOption = question.slot;
  const answered = selected !== null;

  function choose(optionIndex: number) {
    if (!answered) setSelected(optionIndex);
  }

  function next() {
    setIndex((current) => (current + 1) % questions.length);
    setSelected(null);
  }

  function chooseLevel(nextLevel: 1 | 2 | 3) {
    setLevel(nextLevel);
    setIndex(0);
    setSelected(null);
  }

  return (
    <section aria-labelledby="comparison-engine-title" style={{ margin: '1.5rem 0 2rem', padding: '1.25rem', borderRadius: 10, border: '1px solid rgba(15,61,140,0.2)', background: 'linear-gradient(135deg, rgba(15,61,140,0.06), rgba(5,150,105,0.04))' }}>
      <p className="eyebrow" style={{ marginBottom: '0.45rem' }}><span className="ink-line" />Guided comparison practice</p>
      <h2 id="comparison-engine-title" style={{ margin: '0 0 0.4rem', fontSize: '1.2rem' }}>From visual evidence to an IELTS sentence</h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>Progress from identifying a relationship to selecting an overview and writing a precise comparison. The correct option moves position between questions.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {([1, 2, 3] as const).map((item) => <button key={item} type="button" className="btn btn-sm" aria-pressed={level === item} onClick={() => chooseLevel(item)} style={{ flex: '1 1 170px', textAlign: 'left', opacity: level === item ? 1 : 0.68 }}><strong>Level {item}</strong><br /><span style={{ fontSize: '0.72rem' }}>{item === 1 ? 'Spot the relationship' : item === 2 ? 'Group and summarise' : 'Write precisely'}</span></button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <div style={{ padding: '0.6rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Visual variant={question.variant} /></div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800 }}><span>{question.title}</span><span>Exercise {index + 1}/{questions.length}</span></div>
          <p style={{ margin: '0 0 0.8rem', color: 'var(--ink)', fontWeight: 800, lineHeight: 1.5 }}>{question.prompt}</p>
          <div style={{ display: 'grid', gap: '0.5rem' }}>{options.map((option, optionIndex) => {
            const isCorrect = optionIndex === correctOption;
            const isSelected = optionIndex === selected;
            return <button key={option} type="button" onClick={() => choose(optionIndex)} aria-pressed={isSelected} style={{ padding: '0.75rem 0.8rem', textAlign: 'left', borderRadius: 8, border: `1px solid ${answered && isCorrect ? '#059669' : isSelected ? '#dc2626' : 'var(--line-soft)'}`, background: answered && isCorrect ? 'rgba(5,150,105,0.08)' : isSelected ? 'rgba(220,38,38,0.07)' : 'var(--bg)', color: 'var(--ink)', cursor: answered ? 'default' : 'pointer', lineHeight: 1.45, fontSize: '0.84rem' }}>{option}</button>;
          })}</div>
          {answered && <div role="status" style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: 8, background: selected === correctOption ? 'rgba(5,150,105,0.09)' : 'rgba(220,38,38,0.07)', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.83rem' }}><strong>{selected === correctOption ? 'Correct.' : 'Review this choice.'}</strong> {question.explanation}<div style={{ marginTop: '0.7rem' }}><button type="button" className="btn btn-sm" onClick={next}>Next exercise →</button></div></div>}
        </div>
      </div>
    </section>
  );
}
