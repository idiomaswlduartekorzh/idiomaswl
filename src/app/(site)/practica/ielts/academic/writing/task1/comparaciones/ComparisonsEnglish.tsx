'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import { IELTSBarChartVisual, IELTSLineGraphVisual, IELTSPieChartVisual, IELTSTableVisual } from '../Task1VisualLab';
import ComparisonPracticeEngine from './ComparisonPracticeEngine';

type GuidedExample = {
  title: string;
  variant: number;
  focus: string;
  model: string;
};

const VISUALS = [
  {
    id: 'line',
    label: 'Line graph',
    Chart: IELTSLineGraphVisual,
    examples: [
      { title: 'Start versus end', variant: 0, focus: 'Region A starts and finishes ahead, while all three regions rise.', model: 'Region A remained the leading region throughout, increasing from 30% to almost 90%, whereas Region C rose from only 6% to 57%.' },
      { title: 'Crossover', variant: 1, focus: 'Metro overtakes bus in the final period.', model: 'Although bus trips were initially the most common, metro use rose steadily and surpassed bus travel by 2025.' },
      { title: 'Opposing directions', variant: 2, focus: 'Cycling grows in the North and South but declines in Central.', model: 'Cycling levels increased markedly in the North and South districts, whereas the Central figure fell gradually over the period.' },
      { title: 'Narrowing gap', variant: 3, focus: 'Family visits rise while the gap with students becomes much smaller.', model: 'Family visits increased steadily, whereas visits by students declined slightly. As a result, the gap between the two groups narrowed considerably by 2022.' },
      { title: 'Reversed ranking', variant: 4, focus: 'Region A rises above Region B after starting below it.', model: 'Region A overtook Region B during the period, as the former increased consistently while the latter declined.' },
    ] satisfies GuidedExample[],
  },
  {
    id: 'bar',
    label: 'Bar chart',
    Chart: IELTSBarChartVisual,
    examples: [
      { title: 'Highest versus lowest', variant: 0, focus: 'Housing is the largest household expense and health is the smallest.', model: 'Housing accounted for the largest share of expenditure at 32%, while health made up the smallest proportion, at 13%.' },
      { title: 'Leading facility', variant: 1, focus: 'The library ranks first; clubs sit clearly last.', model: 'The library was the most popular facility, with 74 users, whereas clubs were selected by only 28 people.' },
      { title: 'Clear age pattern', variant: 2, focus: 'Screen time falls consistently across age groups.', model: 'Average screen time declined steadily with age, dropping from 5.8 hours among 18-24 year olds to 2.1 hours in the oldest group.' },
      { title: 'A clear outlier', variant: 3, focus: 'Museum A attracts far more visitors than Museum D.', model: 'Museum A received 2.4 million visitors, more than three times the figure for Museum D, at 0.7 million.' },
      { title: 'Dominant use', variant: 4, focus: 'Agriculture leads water use by a wide margin.', model: 'Agriculture used the most water, at 46 units, compared with just 9 units for the smallest category, Other.' },
    ] satisfies GuidedExample[],
  },
  {
    id: 'pie',
    label: 'Pie chart',
    Chart: IELTSPieChartVisual,
    examples: [
      { title: 'Largest and smallest share', variant: 0, focus: 'Solar is largest and Other is smallest.', model: 'Solar represented the largest share of energy production, at 34%, while other sources accounted for only 16%.' },
      { title: 'Change in composition', variant: 1, focus: 'Housing gains share while food loses share between two years.', model: 'Housing rose from 22% to 31%, whereas food declined from 31% to 24% over the same period.' },
      { title: 'Combined majority', variant: 2, focus: 'Flexibility and cost together make up most reasons for choosing online courses.', model: 'Flexibility and cost together accounted for 69% of responses, far exceeding the combined share of the two remaining reasons.' },
      { title: 'Near balance', variant: 3, focus: 'The seasonal distribution is close, with only a small gap between the extremes.', model: 'Visitor numbers were distributed fairly evenly across the seasons, with summer only slightly ahead of winter.' },
      { title: 'Different profiles', variant: 4, focus: 'Country A is led by gas whereas Country B is led by coal.', model: 'Gas was the largest source in Country A, while coal accounted for the greatest proportion of electricity generation in Country B.' },
    ] satisfies GuidedExample[],
  },
  {
    id: 'table',
    label: 'Table',
    Chart: IELTSTableVisual,
    examples: [
      { title: 'Leading country', variant: 0, focus: 'The USA records the highest use in every age group.', model: 'The USA had the highest daily social-media use across all age groups, whereas Australia consistently recorded the lowest figures.' },
      { title: 'Largest subject and fastest growth', variant: 1, focus: 'Business remains largest, but Science grows fastest.', model: 'Business attracted the most international students in every year, while Science showed the sharpest rise, more than doubling from 180 to 380 students.' },
      { title: 'Consistent transport ranking', variant: 2, focus: 'Car travel is shortest and bus travel is longest in each city.', model: 'Travelling by car took the least time in all four cities, whereas bus journeys were consistently the longest.' },
      { title: 'A meaningful exception', variant: 3, focus: 'Guides receive the strongest ratings while transport performs worst.', model: 'Guides achieved the highest satisfaction scores, in contrast to transport, which had both the weakest positive rating and the largest poor-rating share.' },
      { title: 'Shared upward direction', variant: 4, focus: 'All four materials are recycled more over time.', model: 'Recycling rates rose for every material, although paper remained the most recycled and plastic the least recycled throughout.' },
    ] satisfies GuidedExample[],
  },
];

export default function ComparisonsEnglish() {
  const [visualIndex, setVisualIndex] = useState(0);
  const [exampleIndex, setExampleIndex] = useState(0);
  const visual = VISUALS[visualIndex];
  const Chart = visual.Chart;

  return (
    <section className="wl-section" lang="en">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm">← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Comparisons</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Sub-skill 4 · Comparisons</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Compare visual data accurately</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            A strong IELTS Task 1 comparison names the categories, identifies the meaningful relationship and uses language that matches the size of the difference. Learn the decision first, then practise the sentence.
          </p>

          <Task1OfficialReviewBlock
            focus="Select and compare relevant evidence without turning your body paragraph into a data list."
            officialFormat="IELTS Academic Writing Task 1 asks you to select and compare visual information. Comparison is a response skill, not a separate official task."
            welearnStrategy="WeLearn isolates comparison decisions so you can practise contrast, approximation and grouping before writing complete paragraphs."
            answerCheck="A precise comparison names both categories, keeps the unit accurate and avoids unsupported claims."
            relatedLinks={[
              { href: '/practica/ielts/academic/writing/task1/overview', label: 'Write the overview' },
              { href: '/practica/ielts/academic/writing/task1/tendencias', label: 'Select relevant trends' },
              { href: '/practica/ielts/academic/writing/task1/body-1', label: 'Build Body 1' },
              { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Build Body 2' },
            ]}
          />

          <Task1ChartTypeGuide />

          <section aria-labelledby="comparison-lab-title" style={{ margin: '1.5rem 0 2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.45rem' }}><span className="ink-line" />Guided visual lab</p>
            <h2 id="comparison-lab-title" style={{ margin: '0 0 0.4rem', fontSize: '1.2rem' }}>What counts as a useful comparison?</h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6 }}>Choose a visual type, then inspect five different comparison patterns before entering the exercise engine.</p>
            <div role="tablist" aria-label="Visual types" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {VISUALS.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={visualIndex === index} onClick={() => { setVisualIndex(index); setExampleIndex(0); }} style={{ flex: '0 0 auto', minWidth: 130, padding: '0.7rem 0.75rem', borderRadius: 8, border: visualIndex === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: visualIndex === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: visualIndex === index ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}>{item.label}</button>)}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.75rem 0 0.5rem' }}>
              {visual.examples.map((example, index) => <button key={example.title} type="button" onClick={() => setExampleIndex(index)} aria-pressed={exampleIndex === index} style={{ flex: '0 0 auto', minWidth: 150, padding: '0.62rem 0.7rem', borderRadius: 8, border: exampleIndex === index ? '2px solid #059669' : '1px solid var(--line-soft)', background: exampleIndex === index ? 'rgba(5,150,105,0.07)' : 'var(--bg)', color: exampleIndex === index ? '#047857' : 'var(--ink-2)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>{String(index + 1).padStart(2, '0')} · {example.title}</button>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', padding: '1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
              <div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Chart variant={visual.examples[exampleIndex].variant} /></div>
              <div>
                <p style={{ margin: '0 0 0.35rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{visual.examples[exampleIndex].title.toUpperCase()}</p>
                <h3 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{visual.examples[exampleIndex].focus}</h3>
                <p style={{ margin: '0 0 0.8rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>The comparison must be visible in this graphic. Name both sides of the relationship, then choose the amount of detail that makes the contrast clear.</p>
                <div style={{ padding: '0.8rem', borderRadius: 8, border: '1px solid rgba(5,150,105,0.24)', background: 'rgba(5,150,105,0.06)' }}>
                  <p style={{ margin: '0 0 0.28rem', color: '#047857', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>MODEL COMPARISON</p>
                  <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.65 }}>{visual.examples[exampleIndex].model}</p>
                </div>
              </div>
            </div>
          </section>

          <ComparisonPracticeEngine />

          <section style={{ margin: '1rem 0 0', padding: '1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
            <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.08rem' }}>Write your own comparison</h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>After completing the guided levels, write one sentence using two categories, one comparison structure and one accurate approximation phrase.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
