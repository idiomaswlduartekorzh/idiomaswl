'use client';

import { useMemo, useState } from 'react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { MAP_DRILLS } from './mapas-drills';

export default function MapPracticeEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1); const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null); const [checked, setChecked] = useState(false);
  const items = useMemo(() => MAP_DRILLS.filter((item) => item.level === level), [level]);
  const current = items[index % items.length];

  /**
   * `arrange` no barajaba: dejaba los distractores en su orden escrito e insertaba la correcta
   * en un `slot` a mano. `placeOption` baraja y reparte por bloques.
   */
  const displayed = useMemo(
    () => placeOption(current.options, current.correct, `task1-mapas-nivel-${level}`, index),
    [current, level, index],
  );
  const correcto = selected === displayed.correct;
  const ultimo = index === items.length - 1;
  function chooseLevel(value: 1 | 2 | 3) { setLevel(value); setIndex(0); setSelected(null); setChecked(false); }
  return <section aria-labelledby="map-progressive-engine" style={{ marginTop: '2.5rem' }}>
    <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p><h2 id="map-progressive-engine" style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise map writing by level</h2><p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>These maps are not the five you work through above, so no model sentence on this page gives the answer away. Identify a visible change first, then organise spatial evidence and build a cautious map overview.</p>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>{([1, 2, 3] as const).map((item) => <button key={item} type="button" className="btn btn-sm" aria-pressed={level === item} onClick={() => chooseLevel(item)} style={{ flex: '1 1 170px', textAlign: 'left', opacity: level === item ? 1 : 0.68 }}><strong>Level {item}</strong><br /><span style={{ fontSize: '0.72rem' }}>{item === 1 ? 'Location and change' : item === 2 ? 'Grouping and overview' : 'Precise map sentences'}</span></button>)}</div>
    <div className="wl-card" style={{ padding: '1.15rem', borderTop: '4px solid #0f3d8c' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', color: 'var(--wl-on-panel-link, #0f3d8c)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}><span>{current.title}</span><span>Exercise {index + 1} of {items.length}</span></div><p style={{ margin: 0, padding: '0.8rem 0.9rem', borderLeft: '3px solid #0f3d8c', background: 'rgba(15,61,140,0.05)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{current.prompt}&rdquo;</p><div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.9rem' }}>{displayed.options.map((option, optionIndex) => <button key={option.text} type="button" disabled={checked} onClick={() => !checked && setSelected(optionIndex)} aria-pressed={selected === optionIndex} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && optionIndex === displayed.correct ? '#059669' : checked && selected === optionIndex ? '#dc2626' : selected === optionIndex ? '#0f3d8c' : 'var(--line-soft)'}`, background: checked && optionIndex === displayed.correct ? 'rgba(5,150,105,0.08)' : selected === optionIndex ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + optionIndex)}. {option.text}</button>)}</div><div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}><button type="button" className="btn btn-sm" onClick={() => setChecked(true)} disabled={selected === null || checked}>{checked ? (correcto ? 'Correct' : 'See what happened') : 'Check answer'}</button>{!checked && selected === null && <span style={{ color: 'var(--muted)', fontSize: '0.82rem', alignSelf: 'center' }}>Choose an option first</span>}{checked && <button type="button" className="btn btn-sm" onClick={() => { setIndex((value) => (value + 1) % items.length); setSelected(null); setChecked(false); }}>{ultimo ? 'Start this level again →' : 'Next exercise →'}</button>}</div>{checked && <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: selected === displayed.correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)' }}><strong>{correcto ? 'Good work.' : 'Not this one.'}</strong><ul style={{ listStyle: 'none', margin: '0.55rem 0 0', padding: 0, display: 'grid', gap: '0.42rem' }}>{displayed.options.map((option, i) => { const good = i === displayed.correct; return <li key={option.text} style={{ padding: '0.52rem 0.68rem', borderRadius: 8, border: `1px solid ${good ? 'rgba(5,150,105,0.3)' : 'var(--line-soft)'}`, background: good ? 'rgba(5,150,105,0.06)' : 'var(--bg)' }}><span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontWeight: 800, color: good ? '#059669' : 'var(--muted)', textTransform: 'uppercase' }}>{String.fromCharCode(65 + i)}{good ? ' · correct' : ''}{i === selected && !good ? ' · you chose this' : ''}</span><p style={{ margin: '0.18rem 0 0', color: 'var(--ink-2)', lineHeight: 1.52, fontSize: '0.85rem' }}>{option.why}</p></li>; })}</ul></div>}</div>
  </section>;
}
