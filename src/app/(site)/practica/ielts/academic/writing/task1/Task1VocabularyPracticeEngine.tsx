'use client';

import { useMemo, useState } from 'react';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from './Task1VisualLab';

type VisualKind = 'line' | 'bar' | 'pie' | 'table';

type Question = {
  level: 1 | 2 | 3;
  visual: VisualKind;
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    level: 1, visual: 'line', title: 'Direction and scale',
    prompt: 'For Region C, which verb phrase best describes the overall movement?',
    options: ['declined gradually', 'rose steadily', 'remained unchanged', 'fluctuated sharply'], answer: 1,
    explanation: 'Region C rises from 6% to 57% without a fall. “Rose steadily” is precise; it does not exaggerate the pattern.',
  },
  {
    level: 1, visual: 'bar', title: 'Reporting a proportion',
    prompt: 'Which sentence reports the largest category accurately?',
    options: ['Housing accounted for just under one third of household expenditure.', 'Housing was three times smaller a category than food.', 'Housing increased to 32% over the period the chart covers.', 'Housing represented the smallest amount of spending recorded here.'], answer: 0,
    explanation: 'Housing is 32%, so “just under one third” is an accurate approximation. This bar chart compares categories at one point, not change over time.',
  },
  {
    level: 1, visual: 'pie', title: 'Shares and proportions',
    prompt: 'Which phrase is the best description of Solar in the pie chart?',
    options: ['Solar climbed to 34% by the end of the period.', 'Solar was followed by 34% in the order shown.', 'Solar made up the largest share, at 34%.', 'Solar changed by 34% across the years recorded.'], answer: 2,
    explanation: 'A single pie chart shows composition. “Made up the largest share” describes a proportion without inventing a change.',
  },
  {
    level: 1, visual: 'table', title: 'Comparing table entries',
    prompt: 'Which statement is supported by the table?',
    options: ['Australia has the highest social-media use in every age group.', 'The oldest group used social media more than the youngest group.', 'Canada overtook the USA among 18–24-year-olds.', 'The USA recorded the highest figures across all four age groups.'], answer: 3,
    explanation: 'Each USA figure is higher than the corresponding Canada and Australia figure. The table does not show a time trend.',
  },
  {
    level: 2, visual: 'line', title: 'Precision without overstatement',
    prompt: 'Choose the most accurate sentence about Region A between 2000 and 2020.',
    options: ['Region A doubled exactly from 30% to 88%.', 'Region A rose substantially, from 30% to 88%.', 'Region A became universal by 2020.', 'Region A rose by 88 percentage points.'], answer: 1,
    explanation: 'The increase is substantial, but 30% to 88% is not an exact doubling, is not universal, and equals 58 rather than 88 percentage points.',
  },
  {
    level: 2, visual: 'bar', title: 'Noun and preposition control',
    prompt: 'Complete the sentence: “There was a ___ in expenditure on leisure ___ housing.”',
    options: ['higher / than', 'largest / from', 'smaller / to', 'lower level / than'], answer: 3,
    explanation: '“A lower level … than” is grammatical and matches 21% for leisure compared with 32% for housing. The other options do not form a natural sentence.',
  },
  {
    level: 2, visual: 'pie', title: 'Comparative cohesion',
    prompt: 'Which sentence compares the two largest energy sources most naturally?',
    options: ['Solar was 34%, whereas wind accounted for 28%.', 'Solar was 34%, because wind accounted for 28%.', 'Solar rose 34%, while wind was 28%.', 'Solar and wind changed 34% and 28%.'], answer: 0,
    explanation: '“Whereas” creates a concise contrast between two simultaneous shares. The chart gives no evidence of cause or change.',
  },
  {
    level: 2, visual: 'table', title: 'Approximation',
    prompt: 'Which is the best approximation for 73%?',
    options: ['roughly one third', 'just over half', 'nearly three quarters', 'almost one tenth'], answer: 2,
    explanation: 'Three quarters is 75%, so 73% is nearly three quarters. Good approximation should stay close to the actual figure.',
  },
  {
    level: 3, visual: 'line', title: 'Choose a controlled comparison',
    prompt: 'Which sentence makes a useful comparison in the final year?',
    options: ['All three of the regions were identical by 2020.', 'Region B overtook Region A at some point before 2020.', 'Region A remained the highest, while Region C was still the lowest.', 'Region C recorded a higher figure than Region A did.'], answer: 2,
    explanation: 'The final values are 88%, 79% and 57%. The sentence identifies the meaningful extremes without listing every number.',
  },
  {
    level: 3, visual: 'bar', title: 'Avoid mechanical detail',
    prompt: 'Which detail sentence is most useful after an overview of household expenditure?',
    options: ['Housing, at 32%, was followed by leisure at 21%, while health was lowest at 13%.', 'Housing is 32, food is 18, transport is 16, leisure is 21 and health is 13.', 'The chart has five different categories.', 'Housing changed from 32% to 13%.'], answer: 0,
    explanation: 'It groups useful extremes and one supporting comparison. A bare list is mechanical, and the visual does not show change over time.',
  },
  {
    level: 3, visual: 'pie', title: 'Choose the grammatical structure',
    prompt: 'Which sentence uses the correct noun structure?',
    options: ['There was a accounted for 34% by Solar.', 'Solar had an account of 34%.', 'Solar accounted 34% of the total.', 'Solar accounted for 34% of energy production.'], answer: 3,
    explanation: 'The fixed pattern is “accounted for + percentage + of + total/category.” It is useful for pie charts and bar charts.',
  },
  {
    level: 3, visual: 'table', title: 'Link a sentence to the response plan',
    prompt: 'Where is this sentence most likely to belong: “In every country, the 18–24 group recorded the highest level of social-media use.”',
    options: ['The introduction, because it repeats the task.', 'A detail paragraph, because it reports a cross-table pattern.', 'The overview only, because it contains a figure.', 'The conclusion, because Task 1 needs a final opinion.'], answer: 1,
    explanation: 'This is a supported, cross-table comparison that works as evidence in a detail paragraph. Task 1 does not require an opinion conclusion.',
  },
];

const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
};

function orderOptions(question: Question, seed: number) {
  // Preserve the authored answer while rotating its displayed position by exercise.
  const shift = [0, 2, 1, 3][seed % 4];
  const options = question.options.map((_, index) => question.options[(index + shift) % question.options.length]);
  return {
    options,
    correct: options.indexOf(question.options[question.answer]),
  };
}

export default function Task1VocabularyPracticeEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const items = useMemo(() => QUESTIONS.filter((item) => item.level === level), [level]);
  const question = items[index] ?? items[0];
  const Visual = VISUALS[question.visual];
  const rendered = useMemo(() => orderOptions(question, (level - 1) * 4 + index), [index, level, question]);

  function choose(nextLevel: 1 | 2 | 3) {
    setLevel(nextLevel);
    setIndex(0);
    setSelected(null);
  }

  function next() {
    setIndex((current) => (current + 1) % items.length);
    setSelected(null);
  }

  return (
    <section aria-labelledby="vocabulary-engine-title" style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id="vocabulary-engine-title" style={{ margin: '0 0 0.45rem', fontSize: '1.2rem' }}>Practise vocabulary and cohesion by level</h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
        Move from recognising accurate language to choosing grammar, approximation and cohesion inside a Task 1 response.
      </p>
      <div role="tablist" aria-label="Vocabulary practice levels" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {([1, 2, 3] as const).map((item) => (
          <button key={item} type="button" role="tab" aria-selected={level === item} onClick={() => choose(item)} className="btn btn-sm" style={{ opacity: level === item ? 1 : 0.62 }}>
            Level {item}: {item === 1 ? 'recognise' : item === 2 ? 'control' : 'apply'}
          </button>
        ))}
      </div>
      <div style={{ padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: '1rem' }}>
        <Visual variant={index + level - 1} />
      </div>
      <p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
        {question.title} · {index + 1}/{items.length}
      </p>
      <h3 style={{ margin: '0 0 0.9rem', fontSize: '1rem', lineHeight: 1.5 }}>{question.prompt}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.55rem' }}>
        {rendered.options.map((option, optionIndex) => {
          const answered = selected !== null;
          const correct = optionIndex === rendered.correct;
          const chosen = selected === optionIndex;
          return (
            <button key={option} type="button" onClick={() => selected === null && setSelected(optionIndex)} style={{ textAlign: 'left', minHeight: 64, padding: '0.7rem 0.8rem', borderRadius: 8, border: answered && correct ? '2px solid #059669' : chosen ? '2px solid #dc2626' : '1px solid var(--line-soft)', background: answered && correct ? 'rgba(5,150,105,0.08)' : chosen ? 'rgba(220,38,38,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: answered ? 'default' : 'pointer', lineHeight: 1.45 }}>
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: '0.9rem', padding: '0.85rem', borderRadius: 8, background: selected === rendered.correct ? 'rgba(5,150,105,0.08)' : 'rgba(245,158,11,0.09)', border: `1px solid ${selected === rendered.correct ? 'rgba(5,150,105,0.28)' : 'rgba(245,158,11,0.3)'}` }}>
          <strong style={{ color: selected === rendered.correct ? '#047857' : '#b45309' }}>{selected === rendered.correct ? 'Correct.' : 'Review the evidence.'}</strong>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.87rem' }}>{question.explanation}</p>
          <button type="button" className="btn btn-sm" onClick={next} style={{ marginTop: '0.75rem' }}>Next item →</button>
        </div>
      )}
    </section>
  );
}
