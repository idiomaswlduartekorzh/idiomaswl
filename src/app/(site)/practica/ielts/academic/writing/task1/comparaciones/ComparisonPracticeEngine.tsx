'use client';

import { useMemo, useState } from 'react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { COMPARISON_DRILLS } from './comparisons-drills';
import { IELTSBarChartVisual, IELTSLineGraphVisual, IELTSPieChartVisual, IELTSTableVisual } from '../Task1VisualLab';


const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
} as const;

export default function ComparisonPracticeEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const questions = useMemo(() => COMPARISON_DRILLS.filter((item) => item.level === level), [level]);
  const question = questions[index % questions.length];
  const Visual = VISUALS[question.source.kind];

  /**
   * `arrangeOptions` no barajaba: dejaba los distractores en el orden en que estaban escritos
   * e insertaba la correcta en un hueco a mano. Peor que una rotación —ahí al menos el bloque
   * se desplaza—, porque el distractor que invierte la comparación salía SIEMPRE en la misma
   * posición relativa. `placeOption` baraja y reparte por bloques.
   */
  const placed = useMemo(
    () => placeOption(question.options, question.correct, `task1-comparaciones-nivel-${level}`, index),
    [question, level, index],
  );
  const options = placed.options;
  const correctOption = placed.correct;
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
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>These eight visuals are not the ones worked through above, so no model comparison on this page gives the answer away. Progress from identifying a relationship to selecting an overview and writing a precise comparison. The correct option moves position between questions.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {([1, 2, 3] as const).map((item) => <button key={item} type="button" className="btn btn-sm" aria-pressed={level === item} onClick={() => chooseLevel(item)} style={{ flex: '1 1 170px', textAlign: 'left', opacity: level === item ? 1 : 0.68 }}><strong>Level {item}</strong><br /><span style={{ fontSize: '0.72rem' }}>{item === 1 ? 'Spot the relationship' : item === 2 ? 'Group and summarise' : 'Write precisely'}</span></button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <div style={{ padding: '0.6rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Visual variant={question.source.variant} /></div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800 }}><span>{question.title}</span><span>Exercise {index + 1}/{questions.length}</span></div>
          <p style={{ margin: '0 0 0.5rem', padding: '0.65rem 0.75rem', borderLeft: '3px solid #0f3d8c', background: 'rgba(15,61,140,0.05)', lineHeight: 1.5, fontStyle: 'italic', fontSize: '0.84rem' }}>&ldquo;{question.source.prompt}&rdquo;</p>
          <p style={{ margin: '0 0 0.8rem', color: 'var(--ink)', fontWeight: 800, lineHeight: 1.5 }}>{question.question}</p>
          <div style={{ display: 'grid', gap: '0.5rem' }}>{options.map((option, optionIndex) => {
            const isCorrect = optionIndex === correctOption;
            const isSelected = optionIndex === selected;
            return <button key={option.text} type="button" onClick={() => choose(optionIndex)} aria-pressed={isSelected} style={{ padding: '0.75rem 0.8rem', textAlign: 'left', borderRadius: 8, border: `1px solid ${answered && isCorrect ? '#059669' : isSelected ? '#dc2626' : 'var(--line-soft)'}`, background: answered && isCorrect ? 'rgba(5,150,105,0.08)' : isSelected ? 'rgba(220,38,38,0.07)' : 'var(--bg)', color: 'var(--ink)', cursor: answered ? 'default' : 'pointer', lineHeight: 1.45, fontSize: '0.84rem' }}>{String.fromCharCode(65 + optionIndex)}. {option.text}</button>;
          })}</div>
          {answered && <div role="status" style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: 8, background: selected === correctOption ? 'rgba(5,150,105,0.09)' : 'rgba(220,38,38,0.07)', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.83rem' }}><strong>{selected === correctOption ? 'Correct.' : 'Not this one.'}</strong><ul style={{ listStyle: 'none', margin: '0.55rem 0 0', padding: 0, display: 'grid', gap: '0.4rem' }}>{options.map((option, i) => { const good = i === correctOption; return <li key={option.text} style={{ padding: '0.5rem 0.65rem', borderRadius: 8, border: `1px solid ${good ? 'rgba(5,150,105,0.3)' : 'var(--line-soft)'}`, background: good ? 'rgba(5,150,105,0.06)' : 'var(--bg)' }}><span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 800, color: good ? '#059669' : 'var(--muted)', textTransform: 'uppercase' }}>{String.fromCharCode(65 + i)}{good ? ' · correct' : ''}{i === selected && !good ? ' · you chose this' : ''}</span><p style={{ margin: '0.18rem 0 0', lineHeight: 1.5, fontSize: '0.83rem' }}>{option.why}</p></li>; })}</ul><div style={{ marginTop: '0.7rem', padding: '0.6rem 0.75rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}><span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 800, color: 'var(--wl-on-panel-link, #0f3d8c)', textTransform: 'uppercase' }}>A model comparison for this visual</span><p style={{ margin: '0.2rem 0 0', lineHeight: 1.55, fontSize: '0.84rem', color: 'var(--ink)' }}>{question.source.model}</p></div><div style={{ marginTop: '0.7rem' }}><button type="button" className="btn btn-sm" onClick={next}>{index === questions.length - 1 ? 'Start this level again →' : 'Next exercise →'}</button></div></div>}
        </div>
      </div>
    </section>
  );
}
