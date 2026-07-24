'use client';

import { useMemo, useState } from 'react';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from './Task1VisualLab';
import Task1ApprovedMapVisual from './Task1ApprovedMapVisual';
import Task1ApprovedProcessVisual from './Task1ApprovedProcessVisual';

type Body = 1 | 2;
type Visual = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';

type Question = {
  level: 1 | 2 | 3;
  visual: Visual;
  visualVariant: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const BODY_1_QUESTIONS: Question[] = [
  {
    level: 1,
    visual: 'line',
    visualVariant: 0,
    prompt: 'Three regions increase across the period. Region A remains highest, while Regions B and C rise from lower bases. What is the clearest first Body 1 focus?',
    options: [
      'Group Region A with the general upward trend, then use one or two figures as evidence.',
      'List every point for every region from left to right.',
      'Explain why internet access increased.',
      'Repeat the overview without figures.',
    ],
    answer: 0,
    explanation: 'Body 1 begins the evidence section. It can establish the leading series and the shared direction, using selected figures rather than narrating every value.',
  },
  {
    level: 1,
    visual: 'bar',
    visualVariant: 0,
    prompt: 'One bar is clearly the highest and three others form a close middle group. Which opening groups the data instead of listing it?',
    options: [
      'The highest category should be described first, followed by the similar middle group.',
      'Each bar needs its own separate sentence in chart order.',
      'The smallest category must always be the first sentence.',
      'No grouping is possible in a bar chart.',
    ],
    answer: 0,
    explanation: 'A strong detail paragraph often starts with the clearest contrast or cluster. Similar bars belong together when that makes the data easier to read.',
  },
  {
    level: 2,
    visual: 'pie',
    visualVariant: 0,
    prompt: 'Solar and wind together account for 62%, while the remaining sources are smaller. Which Body 1 sentence is most useful?',
    options: [
      'Solar and wind dominated the energy mix, together accounting for just under two thirds of total production.',
      'Solar was blue and wind was green in the chart.',
      'The pie chart has several coloured segments.',
      'Energy production changed every year.',
    ],
    answer: 0,
    explanation: 'The sentence groups the dominant shares, reports a meaningful approximation and stays faithful to a one-time distribution.',
  },
  {
    level: 2,
    visual: 'table',
    visualVariant: 0,
    prompt: 'In every country, the youngest age group records the highest figure. Which grouping belongs in the first detail paragraph?',
    options: [
      'Compare the youngest group across countries first, because the repeated row pattern is the strongest evidence.',
      'Describe one cell from every row without a pattern.',
      'Start with a conclusion about social media being harmful.',
      'Avoid using figures in both detail paragraphs.',
    ],
    answer: 0,
    explanation: 'Tables reward pattern-based grouping. A repeated row or column pattern is usually more useful than a mechanical cell-by-cell description.',
  },
  {
    level: 3,
    visual: 'process',
    visualVariant: 0,
    prompt: 'A recycling diagram moves from collection and sorting to washing, melting and manufacturing. Which Body 1 paragraph is best organised?',
    options: [
      'Initially, used bottles are collected and sorted, after which they are washed before the material is prepared for melting.',
      'Overall, the process is linear and produces new items.',
      'The final products are better than used bottles.',
      'The diagram increased from 2000 to 2020.',
    ],
    answer: 0,
    explanation: 'For a process, Body 1 can cover the first coherent phase. It uses sequence markers and passive forms rather than repeating the overview.',
  },
  {
    level: 3,
    visual: 'map',
    visualVariant: 0,
    prompt: 'A town map shows changes in the northern half: a park becomes housing and a factory becomes a school. Which paragraph opening is accurate?',
    options: [
      'In the northern part of the town, the park was replaced by a housing estate, while the former factory site was converted into a school.',
      'The northern part became much better for residents.',
      'The town population increased because a school was built.',
      'The park moved north of the factory.',
    ],
    answer: 0,
    explanation: 'A map Body 1 can group visible changes by area. The sentence names location and transformation without inventing causes or evaluations.',
  },
];

const BODY_2_QUESTIONS: Question[] = [
  {
    level: 1,
    visual: 'line',
    visualVariant: 0,
    prompt: 'Body 1 explains the leading region and shared growth. What should Body 2 add?',
    options: [
      'A second meaningful group, such as the lower regions, a crossover or the narrowing gap.',
      'The same sentence from Body 1 with different adjectives.',
      'A new introduction.',
      'A reason that is not shown in the graph.',
    ],
    answer: 0,
    explanation: 'Body 2 completes the evidence plan. It should add a related contrast, second group or later development instead of repeating the first paragraph.',
  },
  {
    level: 1,
    visual: 'bar',
    visualVariant: 0,
    prompt: 'Body 1 describes the highest category and a middle cluster. What is the best Body 2 role?',
    options: [
      'Report the remaining lower category and connect it to the earlier hierarchy.',
      'Restart by defining a bar chart.',
      'Copy every Body 1 figure again.',
      'Add an unsupported prediction.',
    ],
    answer: 0,
    explanation: 'The second detail paragraph closes the data picture by covering the remaining meaningful evidence, not by restarting the task.',
  },
  {
    level: 2,
    visual: 'pie',
    visualVariant: 1,
    prompt: 'One pie chart shows 2000 and another shows 2020. Which sentence makes a precise Body 2 comparison?',
    options: [
      'Housing increased from 22% to 31%, whereas food fell from 31% to 24%.',
      'Housing increased 9 times.',
      'The two charts are identical.',
      'Oil disappeared after reaching 8%.',
    ],
    answer: 0,
    explanation: 'The comparison preserves both values and uses percentage points implicitly through the original percentages. It does not confuse a change in share with multiplication.',
  },
  {
    level: 2,
    visual: 'table',
    visualVariant: 0,
    prompt: 'Body 1 covers the age pattern across countries. Which Body 2 grouping adds new value?',
    options: [
      'Compare the country ranking or the most notable exception across the same table.',
      'Repeat every youngest-group figure.',
      'Write only “the table is clear”.',
      'Invent a cause for the ranking.',
    ],
    answer: 0,
    explanation: 'A second table paragraph can shift from the first repeated pattern to a country contrast or exception, creating a complete but non-repetitive organisation.',
  },
  {
    level: 3,
    visual: 'process',
    visualVariant: 0,
    prompt: 'Body 1 covers collection, sorting and washing. Which Body 2 sentence completes the process logically?',
    options: [
      'The cleaned material is then melted into pellets, which are subsequently moulded to manufacture new products.',
      'Initially, bottles are collected from recycling bins.',
      'Overall, there are several stages.',
      'The factory was north of the bins.',
    ],
    answer: 0,
    explanation: 'This completes the later phase using a clear sequence and passive voice. It does not repeat the opening phase or the overview.',
  },
  {
    level: 3,
    visual: 'map',
    visualVariant: 0,
    prompt: 'Body 1 groups northern redevelopment. Which Body 2 sentence completes the map response?',
    options: [
      'Meanwhile, the southern road was widened into a dual carriageway and the former car park gave way to a shopping centre.',
      'The north was described again in the same order.',
      'The shopping centre was the best development.',
      'The road became busier because more people moved in.',
    ],
    answer: 0,
    explanation: 'Body 2 moves to a second spatial group and uses meanwhile to signal a controlled shift. The other options either repeat or invent unsupported information.',
  },
];

const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
  process: Task1ApprovedProcessVisual,
  map: Task1ApprovedMapVisual,
} as const;

function rotate(question: Question, seed: number) {
  const shift = [2, 0, 3, 1][seed % 4];
  const options = question.options.map((_, index) => question.options[(index + shift) % question.options.length]);
  return { options, correct: options.indexOf(question.options[question.answer]) };
}

export default function Task1BodyPracticeEngine({ body }: { body: Body }) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const bank = body === 1 ? BODY_1_QUESTIONS : BODY_2_QUESTIONS;
  const questions = bank.filter((question) => question.level === level);
  const question = questions[index % questions.length];
  const rendered = useMemo(() => rotate(question, (body - 1) * 9 + (level - 1) * 3 + index), [body, index, level, question]);
  const VisualComponent = VISUALS[question.visual];

  function changeLevel(nextLevel: 1 | 2 | 3) {
    setLevel(nextLevel);
    setIndex(0);
    setSelected(null);
    setChecked(false);
  }

  function next() {
    setIndex((current) => (current + 1) % questions.length);
    setSelected(null);
    setChecked(false);
  }

  return (
    <section aria-labelledby={`task1-body-${body}-engine`} style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id={`task1-body-${body}-engine`} style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise Body {body} by level</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
        {body === 1
          ? 'Move from recognising a useful group to selecting evidence and writing the first detail paragraph.'
          : 'Move from identifying a missing second group to writing a connected contrast that completes the response.'}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {([1, 2, 3] as const).map((item) => (
          <button key={item} type="button" className="btn btn-sm" aria-pressed={level === item} onClick={() => changeLevel(item)} style={{ flex: '1 1 170px', textAlign: 'left', opacity: level === item ? 1 : 0.68 }}>
            <strong>Level {item}</strong><br />
            <span style={{ fontSize: '0.72rem' }}>{item === 1 ? 'Find the paragraph job' : item === 2 ? 'Group evidence' : 'Build the sentence'}</span>
          </button>
        ))}
      </div>
      <div className="wl-card" style={{ padding: '1.15rem', borderTop: '4px solid #0f3d8c' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', alignItems: 'start' }}>
          <div style={{ padding: '0.65rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}><VisualComponent variant={question.visualVariant} /></div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}><span>Level {level} · {question.visual}</span><span>Exercise {index + 1} of {questions.length}</span></div>
            <p style={{ margin: 0, padding: '0.8rem 0.9rem', borderLeft: '3px solid #0f3d8c', background: 'rgba(15,61,140,0.05)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{question.prompt}&rdquo;</p>
            <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.9rem' }}>
              {rendered.options.map((option, optionIndex) => <button key={option} type="button" onClick={() => !checked && setSelected(optionIndex)} aria-pressed={selected === optionIndex} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && optionIndex === rendered.correct ? '#059669' : checked && selected === optionIndex ? '#dc2626' : selected === optionIndex ? '#0f3d8c' : 'var(--line-soft)'}`, background: checked && optionIndex === rendered.correct ? 'rgba(5,150,105,0.08)' : selected === optionIndex ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + optionIndex)}. {option}</button>)}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-sm" onClick={() => setChecked(true)} disabled={selected === null || checked}>{checked ? (selected === rendered.correct ? 'Correct' : 'Review the explanation') : 'Check answer'}</button>
              {checked && <button type="button" className="btn btn-sm" onClick={next}>Next exercise →</button>}
            </div>
            {checked && <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: selected === rendered.correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)' }}><strong>{selected === rendered.correct ? 'Good choice.' : 'Review the evidence.'}</strong><p style={{ margin: '0.25rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55 }}>{question.explanation}</p></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
