'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Scenario {
  subject: string;
  from: number;
  to: number;
  unit: string;
  yearFrom: number;
  yearTo: number;
  correctVerb: string;
  correctAdverb: string;
  correctSentence: string;
}

const SCENARIOS: Scenario[] = [
  { subject: 'The number of cars sold', from: 20000, to: 85000, unit: 'units', yearFrom: 2010, yearTo: 2020, correctVerb: 'rose', correctAdverb: 'dramatically', correctSentence: 'The number of cars sold rose dramatically from 20,000 units in 2010 to 85,000 units in 2020.' },
  { subject: 'The unemployment rate', from: 12, to: 4, unit: '%', yearFrom: 2015, yearTo: 2023, correctVerb: 'fell', correctAdverb: 'significantly', correctSentence: 'The unemployment rate fell significantly from 12% in 2015 to 4% in 2023.' },
  { subject: 'Average house prices', from: 180000, to: 185000, unit: '£', yearFrom: 2000, yearTo: 2005, correctVerb: 'remained stable', correctAdverb: '', correctSentence: 'Average house prices remained relatively stable between 2000 and 2005, hovering around £180,000–185,000.' },
  { subject: 'Tourist arrivals', from: 500000, to: 510000, unit: 'visitors', yearFrom: 2018, yearTo: 2019, correctVerb: 'increased', correctAdverb: 'slightly', correctSentence: 'Tourist arrivals increased slightly from 500,000 to 510,000 visitors between 2018 and 2019.' },
  { subject: 'CO2 emissions', from: 8, to: 15, unit: 'million tonnes', yearFrom: 1990, yearTo: 2000, correctVerb: 'grew', correctAdverb: 'steadily', correctSentence: 'CO2 emissions grew steadily from 8 to 15 million tonnes between 1990 and 2000.' },
];

const VERBS = ['rose','increased','grew','fell','decreased','declined','remained stable','fluctuated','peaked','recovered'];
const ADVERBS = ['sharply','dramatically','significantly','slightly','gradually','steadily','rapidly','moderately',''];

function dir(s: Scenario) {
  if (s.correctVerb === 'remained stable') return 'stable';
  return s.to > s.from ? 'up' : 'down';
}

const VERB_GROUPS = {
  up: ['rose','increased','grew','recovered'],
  down: ['fell','decreased','declined'],
  stable: ['remained stable','fluctuated'],
  any: VERBS,
};

export default function VocabularioDatosContent() {
  const [idx, setIdx] = useState(0);
  const [verb, setVerb] = useState('');
  const [adverb, setAdverb] = useState('');
  const [revealed, setRevealed] = useState(false);

  const sc = SCENARIOS[idx];
  const direction = dir(sc);
  const assembled = verb
    ? `${sc.subject} ${verb}${adverb ? ' ' + adverb : ''} from ${sc.unit === '£' ? '£' : ''}${sc.from.toLocaleString()}${sc.unit !== '£' ? ' ' + sc.unit : ''} in ${sc.yearFrom} to ${sc.unit === '£' ? '£' : ''}${sc.to.toLocaleString()}${sc.unit !== '£' ? ' ' + sc.unit : ''} in ${sc.yearTo}.`
    : '';

  const pct = Math.round(Math.abs((sc.to - sc.from) / sc.from) * 100);

  function next() {
    setIdx(i => (i + 1) % SCENARIOS.length);
    setVerb('');
    setAdverb('');
    setRevealed(false);
  }

  const availableVerbs = direction === 'up' ? VERB_GROUPS.up : direction === 'down' ? VERB_GROUPS.down : VERB_GROUPS.stable;

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Vocabulario de datos</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📚 Sub-habilidad 7 — Vocabulario de datos</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Vocabulario de datos</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            Elige el verbo y adverbio correctos para describir el cambio numérico. La oración se construye en tiempo real.
          </p>

          {/* Vocabulary reference */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Verbos ↑</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>rise · increase · grow · climb · surge · recover · peak</p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Verbos ↓</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>fall · decrease · decline · drop · plunge · dip</p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Adverbios</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>sharply · dramatically · significantly · gradually · steadily · slightly · moderately</p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Estructura</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>X [verb] [adverb] from A to B between [year] and [year]</p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((idx + 1) / SCENARIOS.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{SCENARIOS.length}</span>
          </div>

          {/* Data card */}
          <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.65rem' }}>Datos</p>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{sc.subject}</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{sc.yearFrom}</span>
                <p style={{ margin: '0.1rem 0 0', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)' }}>
                  {sc.unit === '£' ? '£' : ''}{sc.from.toLocaleString()} {sc.unit !== '£' ? sc.unit : ''}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>
                {direction === 'up' ? '→↗' : direction === 'down' ? '→↘' : '→'}
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: direction === 'up' ? '#059669' : direction === 'down' ? '#dc2626' : '#0f3d8c', fontWeight: 700, marginLeft: '0.3rem' }}>
                  {direction === 'stable' ? 'stable' : `${direction === 'up' ? '+' : '-'}${pct}%`}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{sc.yearTo}</span>
                <p style={{ margin: '0.1rem 0 0', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)' }}>
                  {sc.unit === '£' ? '£' : ''}{sc.to.toLocaleString()} {sc.unit !== '£' ? sc.unit : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Pickers */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', margin: '0 0 0.5rem' }}>1. Elige el verbo:</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {availableVerbs.map(v => (
                <button key={v} onClick={() => !revealed && setVerb(v)}
                  style={{ padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, border: verb === v ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)', background: verb === v ? 'rgba(15,61,140,0.1)' : 'var(--bg-2)', color: verb === v ? '#0f3d8c' : 'var(--ink)', cursor: revealed ? 'default' : 'pointer', fontFamily: 'var(--mono)' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {direction !== 'stable' && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', margin: '0 0 0.5rem' }}>2. Elige el adverbio:</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {ADVERBS.map((a, i) => (
                  <button key={i} onClick={() => !revealed && setAdverb(a)}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, border: adverb === a ? '2px solid #7c3aed' : '1.5px solid var(--line-soft)', background: adverb === a ? 'rgba(124,58,237,0.1)' : 'var(--bg-2)', color: adverb === a ? '#7c3aed' : 'var(--ink)', cursor: revealed ? 'default' : 'pointer', fontFamily: 'var(--mono)' }}>
                    {a === '' ? '(sin adverbio)' : a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live assembly */}
          {assembled && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1.5px solid rgba(15,61,140,0.2)', marginBottom: '1rem', fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>
              {assembled}
            </div>
          )}

          {(verb || direction === 'stable') && !revealed && (
            <button className="btn btn-sm" onClick={() => setRevealed(true)} style={{ marginBottom: '1rem' }}>Ver respuesta modelo →</button>
          )}

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Respuesta modelo</p>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)' }}>{sc.correctSentence}</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(5,150,105,0.1)', color: '#059669', fontFamily: 'var(--mono)', fontWeight: 700 }}>Verbo: {sc.correctVerb}</span>
                  {sc.correctAdverb && <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700 }}>Adverbio: {sc.correctAdverb}</span>}
                </div>
              </div>
              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {idx < SCENARIOS.length - 1 ? 'Siguiente escenario →' : 'Volver al inicio →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
