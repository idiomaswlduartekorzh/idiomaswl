'use client';

import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSProcessDiagramVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type Chart = ComponentType<{ variant?: number }>;
type Item = { chart: Chart; variant: number; label: string; prompt: string; options: string[]; correct: number; explanation: string };

function rotateOptions(item: Item, seed: number) {
  const shift = [1, 3, 0, 2][seed % 4];
  const options = item.options.map((_, optionIndex) => item.options[(optionIndex + shift) % item.options.length]);
  return { options, correct: options.indexOf(item.options[item.correct]) };
}

const LEVELS: { title: string; skill: string; items: Item[] }[] = [
  {
    title: 'Level 1 · Detect the visual story',
    skill: 'Select the feature that can belong in an overview.',
    items: [
      { chart: IELTSLineGraphVisual, variant: 0, label: 'Line graph', prompt: 'Three regions gain internet access from 2000 to 2020.', options: ['Region A rose from 30% to 88%.', 'All three regions increased, with Region A remaining highest.', 'The graph proves internet access is beneficial.', 'The final value for Region C was 57%.'], correct: 1, explanation: 'The overview summarises the trend and general contrast; exact figures belong in the details.' },
      { chart: IELTSBarChartVisual, variant: 1, label: 'Bar chart', prompt: 'Household expenditure is shown by category in 2024.', options: ['Housing is the largest category and health the smallest.', 'Housing accounts for exactly 32%.', 'The figures changed between 2020 and 2024.', 'The chart explains why families spend more on housing.'], correct: 0, explanation: 'For a static bar chart, identify extremes or hierarchy without inventing causes or time.' },
      { chart: IELTSPieChartVisual, variant: 2, label: 'Pie chart', prompt: 'Energy production is divided among four sources in 2025.', options: ['Solar represents 34%.', 'Coal is less popular than hydro.', 'Two sources account for most production, while the others are smaller.', 'Renewable energy should replace fossil fuels.'], correct: 2, explanation: 'A pie-chart overview summarises the distribution and the main groupings.' },
      { chart: IELTSTableVisual, variant: 3, label: 'Table', prompt: 'Daily social media use is compared by age and country.', options: ['The 18-24 group in the USA recorded 92%.', 'The same age pattern appears in every country, with younger groups higher.', 'The table proves that social media is harmful.', 'Australia recorded 32% among older users.'], correct: 1, explanation: 'A cross-table observation is more useful than mentioning one isolated cell.' },
      { chart: IELTSProcessDiagramVisual, variant: 4, label: 'Process diagram', prompt: 'Honey bees move through several stages in their life cycle.', options: ['The adult stage lasts 21 days.', 'The process is a sequence from eggs to mature bees.', 'The diagram compares two years.', 'The final stage is more important than the first.'], correct: 1, explanation: 'Processes are summarised by sequence, start and outcome, not by time trends.' },
    ],
  },
  {
    title: 'Level 2 · Choose an aligned overview',
    skill: 'Check visual type, scope and feature selection.',
    items: [
      { chart: IELTSMapDiagramVisual, variant: 0, label: 'Map', prompt: 'A town centre changes between 1990 and 2020.', options: ['The maps show the factory in the north-east.', 'The town centre became more developed, with older land uses replaced by housing and services.', 'Residents increased from 1,200 to 2,400.', 'The map proves that the new school improved education.'], correct: 1, explanation: 'A map can summarise spatial transformation and land use, but not population, causes or evaluations.' },
      { chart: IELTSLineGraphVisual, variant: 1, label: 'Line graph', prompt: 'Public transport journeys are tracked from 2010 to 2025.', options: ['The graph illustrates a general rise in journeys, although the categories did not follow identical paths.', 'Bus use was 18 million in 2010.', 'The line graph compares five transport companies.', 'The increase happened because cities invested in transport.'], correct: 0, explanation: 'The correct option captures the global story without turning the overview into a list or adding causes.' },
      { chart: IELTSBarChartVisual, variant: 2, label: 'Bar chart', prompt: 'Water consumption is compared across five sectors in 2005.', options: ['Agriculture used 46 billion litres.', 'Water use was highest in agriculture and lowest in domestic activities.', 'Water consumption increased over the period.', 'Agriculture consumed more because farms expanded.'], correct: 1, explanation: 'Category hierarchy is the main pattern in a static bar chart.' },
      { chart: IELTSPieChartVisual, variant: 3, label: 'Pie charts', prompt: 'Electricity generation from four sources is compared in two countries.', options: ['Country A generated 36% from gas.', 'The two countries relied on different mixes, with one source dominant in each.', 'The charts show electricity generation rising annually.', 'Coal is environmentally damaging.'], correct: 1, explanation: 'Comparing the mixes responds to the visual without adding judgement, trends or unnecessary figures.' },
      { chart: IELTSTableVisual, variant: 4, label: 'Table', prompt: 'Five subjects are compared at a university in 2015 and 2025.', options: ['The table lists every subject and its exact enrolment.', 'Overall enrolment increased in most subjects, although the size of change varied.', 'The university expanded because demand increased.', 'Engineering had 2,400 students in 2025.'], correct: 1, explanation: 'Summarise the table through the global pattern and variation, not a cell-by-cell reading.' },
    ],
  },
  {
    title: 'Level 3 · Edit like an examiner',
    skill: 'Choose the most precise, complete and cautious version.',
    items: [
      { chart: IELTSProcessDiagramVisual, variant: 0, label: 'Process diagram', prompt: 'Plastic bottles are recycled into new products.', options: ['Overall, the diagram shows five exact steps: collection, sorting, washing, melting and manufacturing.', 'Overall, used bottles pass through a linear recycling process before becoming new products.', 'Overall, recycling increased from 2000 to 2020.', 'Overall, plastic products are better than disposable bottles.'], correct: 1, explanation: 'The best version summarises the structure and outcome; listing every stage belongs in the detail paragraphs.' },
      { chart: IELTSMapDiagramVisual, variant: 1, label: 'Map', prompt: 'A university campus is redeveloped between 1995 and 2025.', options: ['Overall, the campus became more developed, with academic and residential facilities added.', 'Overall, the library is north of the lecture hall.', 'Overall, the number of students doubled.', 'Overall, the redevelopment was successful.'], correct: 0, explanation: 'The overview describes verifiable spatial changes and avoids a precise location, figures and evaluations.' },
      { chart: IELTSLineGraphVisual, variant: 2, label: 'Line graph', prompt: 'Tourist arrivals in Spain and Portugal are shown from 2005 to 2022.', options: ['Overall, both countries had exactly 14 million visitors in 2022.', 'Overall, arrivals in both countries followed an upward pattern, despite fluctuations during the period.', 'Overall, tourism grew because flights became cheaper.', 'Overall, Spain received more tourists in every single year.'], correct: 1, explanation: 'The answer recognises a fluctuating trend and does not claim a ranking the visual may not support every year.' },
      { chart: IELTSBarChartVisual, variant: 3, label: 'Bar chart', prompt: 'Average temperatures are compared in three cities in 1990 and 2020.', options: ['Overall, temperatures changed differently across the cities, with the greatest increases in two locations.', 'Overall, City A was 18 degrees in 1990.', 'Overall, climate change caused every increase.', 'Overall, the line graph shows temperatures over time.'], correct: 0, explanation: 'The option selects the comparative pattern without copying figures or turning an observation into a cause.' },
      { chart: IELTSPieChartVisual, variant: 4, label: 'Pie charts', prompt: 'Household energy sources are compared before and after a policy change.', options: ['Overall, the energy mix shifted away from fossil fuels towards renewable sources.', 'Overall, gas fell from 42% to 28%.', 'Overall, the policy was successful.', 'Overall, the line graph records energy use each year.'], correct: 0, explanation: 'It summarises the visible change in composition without confusing a visual conclusion with a policy evaluation.' },
    ],
  },
];

export default function OverviewPracticeEngine() {
  const levels = useMemo(() => LEVELS, []);
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState([0, 0, 0]);
  const currentLevel = levels[level];
  const current = currentLevel.items[index];
  const Chart = current.chart;
  const displayed = useMemo(() => rotateOptions(current, level * 5 + index), [current, level, index]);
  const correct = selected === displayed.correct;

  function reset() { setSelected(null); setChecked(false); }
  function check() { if (selected !== null && !checked) { if (correct) setScores((old) => old.map((score, i) => i === level ? score + 1 : score)); setChecked(true); } }
  function next() { if (index < currentLevel.items.length - 1) { setIndex((old) => old + 1); reset(); } else { setLevel((old) => (old + 1) % levels.length); setIndex(0); reset(); } }

  return (
    <section aria-labelledby="task1-overview-practice" style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id="task1-overview-practice" style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise the overview by level</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>First detect the story, then check coverage and finally edit like an examiner. Every answer includes an explanation and correct options change position.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {levels.map((item, i) => <button key={item.title} type="button" className="btn btn-sm" aria-pressed={level === i} onClick={() => { setLevel(i); setIndex(0); reset(); }} style={{ flex: '1 1 180px', textAlign: 'left', whiteSpace: 'normal', opacity: level === i ? 1 : 0.68 }}><strong>{i + 1}. {item.title.split('·')[1]}</strong><br /><span style={{ fontSize: '0.72rem' }}>{scores[i]}/{item.items.length}</span></button>)}
      </div>
      <div className="wl-card" style={{ padding: '1.15rem', borderTop: '4px solid #0f3d8c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}><div><p style={{ margin: 0, color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{currentLevel.title}</p><p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>{currentLevel.skill} · Exercise {index + 1} of {currentLevel.items.length}</p></div><span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.76rem' }}>{Math.round(((index + 1) / currentLevel.items.length) * 100)}%</span></div>
        <div style={{ padding: '0.7rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}><Chart variant={current.variant} /></div>
        <p style={{ margin: '0.85rem 0 0', padding: '0.8rem 0.9rem', borderLeft: '3px solid #0f3d8c', background: 'rgba(15,61,140,0.05)', color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{current.prompt}&rdquo;</p>
        <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.9rem' }}>{displayed.options.map((option, i) => <button key={option} type="button" onClick={() => !checked && setSelected(i)} aria-pressed={selected === i} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && i === displayed.correct ? '#059669' : checked && selected === i ? '#dc2626' : selected === i ? '#0f3d8c' : 'var(--line-soft)'}`, background: checked && i === displayed.correct ? 'rgba(5,150,105,0.08)' : selected === i ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + i)}. {option}</button>)}</div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}><button type="button" className="btn btn-sm" onClick={check} disabled={selected === null || checked}>{checked ? (correct ? 'Correct' : 'Review the explanation') : 'Check answer'}</button>{checked && <button type="button" className="btn btn-sm" onClick={next}>{index === currentLevel.items.length - 1 ? 'Next level →' : 'Next exercise →'}</button>}</div>
        {checked && <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${correct ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}><strong style={{ color: correct ? '#059669' : '#b45309' }}>{correct ? 'Good observation.' : 'Not yet.'}</strong><p style={{ margin: '0.25rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55 }}>{current.explanation}</p></div>}
      </div>
    </section>
  );
}
