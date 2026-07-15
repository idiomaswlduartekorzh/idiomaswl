'use client';

import { useMemo, useState } from 'react';
import { IELTSBarChartVisual, IELTSLineGraphVisual, IELTSPieChartVisual } from '../Task1VisualLab';

type Question = {
  level: 1 | 2 | 3;
  visual: 'line' | 'bar' | 'pie';
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    level: 1, visual: 'bar', title: 'Level 1 · Match the comparison',
    prompt: 'Which sentence accurately compares the two highest categories?',
    options: [
      'Language apps were more popular than video courses, at 46% and 31% respectively.',
      'Video courses were more popular than language apps, at 46% and 31% respectively.',
      'Language apps accounted for exactly half of all preferences.',
      'The chart shows how language apps increased between 2010 and 2020.',
    ], answer: 0,
    explanation: 'The sentence names both categories, preserves their order and uses “respectively” correctly. It compares the visual instead of describing one bar in isolation.',
  },
  {
    level: 1, visual: 'pie', title: 'Level 1 · Select the precise contrast',
    prompt: 'The largest share is 42% and the smallest is 9%. Which comparison is accurate?',
    options: [
      'The largest share was nearly five times as high as the smallest.',
      'The largest share was slightly higher than the smallest.',
      'The smallest share accounted for the majority.',
      'Both shares represented exactly the same proportion.',
    ], answer: 0,
    explanation: 'Forty-two is close to five times nine, so “nearly five times as high” communicates the relationship without pretending that the values are identical.',
  },
  {
    level: 2, visual: 'line', title: 'Level 2 · Choose the overview claim',
    prompt: 'The three series all rise, but Region A remains highest throughout. Which overview is strongest?',
    options: [
      'Overall, all three regions experienced growth, while Region A remained the leading region.',
      'Overall, Region C fell sharply and became the leading region by 2020.',
      'Overall, the graph compares three regions without showing any clear pattern.',
      'Overall, Region A started at 31% in 2000 and ended at 88% in 2020.',
    ], answer: 0,
    explanation: 'An overview selects the dominant pattern and the stable ranking. Exact figures belong in the detail paragraphs, not in the overview.',
  },
  {
    level: 2, visual: 'bar', title: 'Level 2 · Group before writing',
    prompt: 'Four bars are 18, 20, 21 and 44 units. Which grouping supports a clear comparison?',
    options: [
      'Three categories formed a closely grouped lower cluster, whereas one category stood far higher.',
      'Every category was exactly the same, so no comparison was possible.',
      'The first category doubled every year from 18 to 44.',
      'The chart shows a continuous decline across the four categories.',
    ], answer: 0,
    explanation: 'Grouping similar values prevents a mechanical list and highlights the meaningful outlier.',
  },
  {
    level: 3, visual: 'line', title: 'Level 3 · Build a precise sentence',
    prompt: 'Region A rises from 31% to 88%; Region C rises from 6% to 57%. Select the best comparison.',
    options: [
      'Although both regions grew substantially, Region A remained higher and finished about 31 percentage points above Region C.',
      'Region C was always higher than Region A, despite both regions growing substantially.',
      'Region A increased by 31 percentage points more than Region C at every time point.',
      'Both regions had the same final value, with Region A finishing at 88%.',
    ], answer: 0,
    explanation: 'The sentence identifies the shared trend, preserves the ranking and calculates the final gap correctly: 88 minus 57 equals 31 percentage points.',
  },
  {
    level: 3, visual: 'pie', title: 'Level 3 · Avoid a false comparison',
    prompt: 'A category changes from 28% to 35% across two years. Which sentence is safest?',
    options: [
      'The category increased its share by 7 percentage points, from 28% to 35%.',
      'The category increased seven times, from 28% to 35%.',
      'The category doubled its share, from 28% to 35%.',
      'The category disappeared after accounting for 35% initially.',
    ], answer: 0,
    explanation: 'The change is seven percentage points, not seven times and not a doubling. Precision in units is part of accurate Task 1 comparison.',
  },
];

const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
} as const;

function rotateOptions(question: Question, index: number) {
  const shift = [1, 3, 0, 2][index % 4];
  return question.options.map((_, optionIndex) => question.options[(optionIndex + shift) % question.options.length]);
}

export default function ComparisonPracticeEngine() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const question = QUESTIONS[index];
  const Visual = VISUALS[question.visual];
  const options = useMemo(() => rotateOptions(question, index), [question, index]);
  const correctOption = options.indexOf(question.options[question.answer]);
  const answered = selected !== null;

  function choose(optionIndex: number) {
    if (!answered) setSelected(optionIndex);
  }

  function next() {
    setIndex((current) => (current + 1) % QUESTIONS.length);
    setSelected(null);
  }

  return (
    <section aria-labelledby="comparison-engine-title" style={{ margin: '1.5rem 0 2rem', padding: '1.25rem', borderRadius: 10, border: '1px solid rgba(15,61,140,0.2)', background: 'linear-gradient(135deg, rgba(15,61,140,0.06), rgba(5,150,105,0.04))' }}>
      <p className="eyebrow" style={{ marginBottom: '0.45rem' }}><span className="ink-line" />Guided comparison practice</p>
      <h2 id="comparison-engine-title" style={{ margin: '0 0 0.4rem', fontSize: '1.2rem' }}>From visual evidence to an IELTS sentence</h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>Progress from identifying a relationship to selecting an overview and writing a precise comparison. The correct option moves position between questions.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <div style={{ padding: '0.6rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Visual variant={index % 3} /></div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800 }}><span>{question.title}</span><span>{index + 1}/{QUESTIONS.length}</span></div>
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
