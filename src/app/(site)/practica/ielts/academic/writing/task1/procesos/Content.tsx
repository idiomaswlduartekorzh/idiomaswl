'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import { IELTSProcessDiagramVisual } from '../Task1VisualLab';

interface Step {
  n: number;
  active: string;
  passive: string;
  sequencer: string;
}

interface ProcessExercise {
  title: string;
  steps: Step[];
  modelParagraph: string;
}

const EXERCISES: ProcessExercise[] = [
  {
    title: 'Recycled paper production',
    steps: [
      { n: 1, active: 'Workers collect waste paper', passive: 'Waste paper is collected', sequencer: 'First,' },
      { n: 2, active: 'Machines sort the paper by type', passive: 'The paper is sorted by type', sequencer: 'Next,' },
      { n: 3, active: 'Workers add water and chemicals to create pulp', passive: 'Water and chemicals are added to create pulp', sequencer: 'After that,' },
      { n: 4, active: 'Machines clean and filter the pulp', passive: 'The pulp is cleaned and filtered', sequencer: 'Then,' },
      { n: 5, active: 'Rollers press and dry the pulp into sheets', passive: 'The pulp is pressed and dried into sheets', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, waste paper is collected and transported to a recycling facility. Next, the paper is sorted by type using machines. After that, water and chemicals are added to break down the paper into pulp. The pulp is then cleaned and filtered to remove impurities. Finally, the pulp is pressed and dried into thin sheets, which are rolled and prepared for distribution.',
  },
  {
    title: 'Water purification process',
    steps: [
      { n: 1, active: 'Engineers pump water from a river into a storage tank', passive: 'Water is pumped from a river into a storage tank', sequencer: 'First,' },
      { n: 2, active: 'Workers add chemicals to remove large particles', passive: 'Chemicals are added to remove large particles', sequencer: 'Then,' },
      { n: 3, active: 'Gravity causes particles to settle at the bottom', passive: 'Particles are allowed to settle at the bottom', sequencer: 'After this,' },
      { n: 4, active: 'Filters remove remaining impurities', passive: 'Remaining impurities are removed by filters', sequencer: 'Subsequently,' },
      { n: 5, active: 'Workers add chlorine to kill bacteria before distribution', passive: 'Chlorine is added to kill bacteria before distribution', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, water is pumped from a river into a large storage tank. Chemicals are then added to remove large particles, which are allowed to settle at the bottom of the tank. After this, the water passes through a series of filters where remaining impurities are removed. Finally, chlorine is added to eliminate any remaining bacteria before the purified water is distributed to homes and businesses.',
  },
];

const SEQUENCERS = ['First,', 'Then,', 'Next,', 'After that,', 'Subsequently,', 'Once', 'Before', 'Finally,', 'At this stage,'];

export default function ProcesosPage() {
  const [exIdx, setExIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[exIdx];

  function setAnswer(n: number, val: string) {
    if (!revealed) setAnswers(a => ({ ...a, [n]: val }));
  }

  function next() {
    setExIdx(i => (i + 1) % EXERCISES.length);
    setAnswers({});
    setRevealed(false);
  }

  const done = Object.keys(answers).length === ex.steps.length;

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Processes</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⚙️ Sub-skill 5 — Processes</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Process diagrams</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            Processes require the passive voice and sequencing language. Convert each active step into the passive and choose the correct sequencer.
          </p>

          <Task1OfficialReviewBlock
            focus="Describe stages in logical order with the passive voice and clear sequencing."
            officialFormat="IELTS Academic Writing Task 1 may ask you to describe a process as visual information. A process is a possible input, not a separate official section."
            welearnStrategy="We isolate processes because they require passive grammar, time order and no personal opinion."
            answerCheck="A strong response groups stages, uses precise sequencers and avoids inventing causes that the diagram does not show."
          />

          <Task1ChartTypeGuide />

          <div className="wl-card" style={{ padding: '1rem', marginBottom: '1.25rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.55rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>IELTS-style visual reference</p>
            <IELTSProcessDiagramVisual variant={exIdx} />
          </div>

          {/* Grammar box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Passive voice</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                Sujeto + <strong>is/are</strong> + participio pasado<br />
                &ldquo;The material <strong>is heated</strong>&rdquo;<br />
                &ldquo;Water <strong>is pumped</strong>&rdquo;
              </p>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Sequencers</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                First · Then · Next · After that · Subsequently · Once · Before · Finally
              </p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((exIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{exIdx + 1}/{EXERCISES.length}</span>
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.35rem' }}>Process</p>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{ex.title}</p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
            {ex.steps.map(step => {
              const ans = answers[step.n];
              const correct = revealed && ans === step.passive;
              const wrong = revealed && ans && ans !== step.passive;
              return (
                <div key={step.n} className="wl-card" style={{ padding: '1.1rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.9rem', color: '#0f3d8c', minWidth: 20 }}>{step.n}.</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Active: <em style={{ color: 'var(--ink-2)' }}>{step.active}</em>
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                          value={ans || ''}
                          onChange={e => setAnswer(step.n, e.target.value)}
                          disabled={revealed}
                          style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}
                        >
                          <option value="">— sequencer —</option>
                          {SEQUENCERS.map(s => <option key={s} value={step.passive}>{s} {step.passive.substring(0, 30)}…</option>)}
                        </select>
                      </div>
                      {revealed && (
                        <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(15,61,140,0.05)', fontSize: '0.85rem', color: '#0f3d8c', lineHeight: 1.6 }}>
                          <strong>{step.sequencer}</strong> {step.passive}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!revealed && (
            <button className="btn btn-sm" onClick={() => setRevealed(true)} style={{ marginBottom: '1rem' }}>
              Reveal answers →
            </button>
          )}

          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Complete model paragraph</p>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink)' }}>{ex.modelParagraph}</p>
              </div>
              <button className="btn btn-sm" onClick={next} style={{ alignSelf: 'flex-start' }}>
                {exIdx < EXERCISES.length - 1 ? 'Next process →' : 'Back to the beginning →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
