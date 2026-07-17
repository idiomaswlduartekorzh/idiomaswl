'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import { IELTSBarChartVisual, IELTSLineGraphVisual, IELTSPieChartVisual, IELTSTableVisual } from '../Task1VisualLab';
import ComparisonPracticeEngine from './ComparisonPracticeEngine';

const VISUALS = [
  { id: 'line', label: 'Line graph', Chart: IELTSLineGraphVisual, examples: ['Start versus end', 'Rate of change', 'Crossover', 'Convergence and divergence', 'Stable ranking'] },
  { id: 'bar', label: 'Bar chart', Chart: IELTSBarChartVisual, examples: ['Highest versus lowest', 'A close group', 'Two time points', 'A clear outlier', 'Overall ranking'] },
  { id: 'pie', label: 'Pie chart', Chart: IELTSPieChartVisual, examples: ['Dominant share', 'Combined majority', 'Balanced distribution', 'Change in composition', 'Different country profiles'] },
  { id: 'table', label: 'Table', Chart: IELTSTableVisual, examples: ['Leading row', 'Leading column', 'Highest and lowest', 'Shared direction', 'A meaningful exception'] },
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
              {visual.examples.map((example, index) => <button key={example} type="button" onClick={() => setExampleIndex(index)} aria-pressed={exampleIndex === index} style={{ flex: '0 0 auto', minWidth: 150, padding: '0.62rem 0.7rem', borderRadius: 8, border: exampleIndex === index ? '2px solid #059669' : '1px solid var(--line-soft)', background: exampleIndex === index ? 'rgba(5,150,105,0.07)' : 'var(--bg)', color: exampleIndex === index ? '#047857' : 'var(--ink-2)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>{String(index + 1).padStart(2, '0')} · {example}</button>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', padding: '1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
              <div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Chart variant={exampleIndex} /></div>
              <div>
                <p style={{ margin: '0 0 0.35rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{visual.examples[exampleIndex]}</p>
                <h3 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{exampleIndex === 0 ? 'Compare the meaningful extremes.' : exampleIndex === 1 ? 'Compare the pattern, not every number.' : exampleIndex === 2 ? 'Compare change, position or composition.' : exampleIndex === 3 ? 'Use the contrast that the visual actually supports.' : 'Use the global relationship to organise the paragraph.'}</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>Ask what the reader needs to understand: ranking, movement, distance, composition or an exception. That decision determines the comparison sentence.</p>
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
