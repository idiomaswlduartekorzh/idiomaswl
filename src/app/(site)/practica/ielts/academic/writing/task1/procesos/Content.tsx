'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import Task1ApprovedProcessVisual from '../Task1ApprovedProcessVisual';
import ProcessPracticeEngine from './ProcessPracticeEngine';

interface Step {
  n: number;
  active: string;
  passive: string;
  sequencer: string;
}

interface ProcessExercise {
  title: string;
  steps: Step[];
  /** El gráfico que se pinta. Viaja con el ejercicio: antes salía de su posición en la lista. */
  variant: number;
  modelParagraph: string;
}

const EXERCISES: ProcessExercise[] = [
  {
    title: 'How plastic bottles are recycled',
    variant: 0,
    steps: [
      { n: 1, active: 'Workers collect used bottles from public recycling bins', passive: 'Used bottles are collected from public recycling bins', sequencer: 'First,' },
      { n: 2, active: 'Workers separate plastic from other materials', passive: 'Plastic is separated from other materials', sequencer: 'Next,' },
      { n: 3, active: 'Workers wash the bottles before cutting them into flakes', passive: 'The bottles are washed before being cut into flakes', sequencer: 'After that,' },
      { n: 4, active: 'Machines heat the flakes and turn them into pellets', passive: 'The flakes are heated and turned into plastic pellets', sequencer: 'Then,' },
      { n: 5, active: 'Manufacturers mould the pellets into new products', passive: 'The pellets are moulded into new products', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, used bottles are collected from public recycling bins. Next, the plastic is separated from other materials at a recycling centre. After that, the bottles are washed before being cut into small flakes. The flakes are then heated and turned into plastic pellets. Finally, the pellets are moulded into new bottles, clothing or containers.',
  },
  {
    title: 'How coffee is prepared for sale',
    variant: 1,
    steps: [
      { n: 1, active: 'Farmers pick ripe coffee cherries from the plants', passive: 'Ripe coffee cherries are picked from the plants', sequencer: 'First,' },
      { n: 2, active: 'Workers spread the cherries out and dry them in the sun', passive: 'The cherries are spread out and dried in the sun', sequencer: 'Next,' },
      { n: 3, active: 'Workers remove the outer layers from the dried fruit', passive: 'The outer layers are removed from the dried fruit', sequencer: 'After that,' },
      { n: 4, active: 'Roasters heat the beans until they reach the desired colour', passive: 'The beans are heated until they reach the desired colour', sequencer: 'Then,' },
      { n: 5, active: 'Workers grind and pack the roasted beans for sale', passive: 'The roasted beans are ground and packed for sale', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, ripe coffee cherries are picked from the plants. Next, they are spread out and dried in the sun. After that, the outer layers are removed from the dried fruit. The beans are then heated until they reach the desired colour. Finally, the roasted beans are ground and packed for sale.',
  },
  {
    title: 'How bottled water is produced',
    variant: 2,
    steps: [
      { n: 1, active: 'A company takes water from an underground spring', passive: 'Water is taken from an underground spring', sequencer: 'First,' },
      { n: 2, active: 'Filters remove unwanted particles from the water', passive: 'Unwanted particles are removed from the water', sequencer: 'Next,' },
      { n: 3, active: 'The company treats the water to make it safe to drink', passive: 'The water is treated to make it safe to drink', sequencer: 'After that,' },
      { n: 4, active: 'Workers pour the clean water into plastic bottles', passive: 'Clean water is poured into plastic bottles', sequencer: 'Then,' },
      { n: 5, active: 'Workers label the bottles and send them to shops', passive: 'The bottles are labelled and sent to shops', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, water is taken from an underground spring. Next, unwanted particles are removed by a filtering system. After that, the water is treated to make it safe to drink. Clean water is then poured into plastic bottles. Finally, the bottles are labelled and sent to shops for distribution.',
  },
  {
    title: 'How bricks are manufactured',
    variant: 3,
    steps: [
      { n: 1, active: 'An excavator removes clay from the ground', passive: 'Clay is removed from the ground by an excavator', sequencer: 'First,' },
      { n: 2, active: 'A machine breaks the clay into smaller pieces', passive: 'The clay is broken into smaller pieces', sequencer: 'Next,' },
      { n: 3, active: 'A mould shapes the material into rectangular bricks', passive: 'The material is shaped into rectangular bricks', sequencer: 'After that,' },
      { n: 4, active: 'Workers leave the bricks in a drying chamber', passive: 'The bricks are left in a drying chamber', sequencer: 'Then,' },
      { n: 5, active: 'A kiln heats the bricks before delivery', passive: 'The bricks are heated in a kiln before delivery', sequencer: 'Finally,' },
    ],
    modelParagraph: 'First, clay is removed from the ground by an excavator. Next, it is broken into smaller pieces. After that, the material is shaped into rectangular bricks. The bricks are then left in a drying chamber. Finally, they are heated in a kiln before being delivered.',
  },
  {
    title: 'Honey bee life cycle',
    variant: 4,
    steps: [
      { n: 1, active: 'The queen lays eggs inside the cells of a hive', passive: 'Eggs are laid inside the cells of a hive', sequencer: 'First,' },
      { n: 2, active: 'The eggs hatch and become small larvae', passive: 'The eggs hatch and become small larvae', sequencer: 'Next,' },
      { n: 3, active: 'The bees seal the larvae inside cells to develop', passive: 'The larvae are sealed inside cells to develop', sequencer: 'After that,' },
      { n: 4, active: 'Fully grown bees emerge from the cells', passive: 'Fully grown bees emerge from the cells', sequencer: 'Then,' },
      { n: 5, active: 'Adult bees feed the young and maintain the hive', passive: 'The young are fed and the hive is maintained by adult bees', sequencer: 'Finally,' },
    ],
    modelParagraph: 'The cycle begins when eggs are laid inside the cells of a hive. Next, the eggs hatch and become small larvae, which are then sealed inside cells to develop. Fully grown bees subsequently emerge from the cells. Finally, adult bees feed the young and maintain the hive before the cycle begins again.',
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

  return (
    <section className="wl-section" lang="en">
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
            relatedLinks={[
              { href: '/practica/ielts/academic/writing/task1/overview', label: 'Write the overview' },
              { href: '/practica/ielts/academic/writing/task1/body-1', label: 'Build Body 1' },
              { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Build Body 2' },
              { href: '/practica/ielts/academic/writing/task1/mapas', label: 'Describe maps' },
            ]}
          />

          <Task1ChartTypeGuide />

          <div role="tablist" aria-label="Process examples" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', padding: '0 0 0.55rem', marginBottom: '0.85rem' }}>
            {EXERCISES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={exIdx === index}
                aria-controls="process-example-panel"
                onClick={() => { setExIdx(index); setAnswers({}); setRevealed(false); }}
                style={{ flex: '0 0 auto', minWidth: 170, padding: '0.65rem 0.75rem', borderRadius: 8, border: exIdx === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: exIdx === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: exIdx === index ? '#0f3d8c' : 'var(--ink-2)', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {String(index + 1).padStart(2, '0')} · {item.title}
              </button>
            ))}
          </div>

          <div id="process-example-panel" role="tabpanel" className="wl-card" style={{ padding: '1rem', marginBottom: '1.25rem', background: 'var(--bg-2)', overflowX: 'auto' }}>
            <p style={{ margin: '0 0 0.55rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>IELTS-style visual reference</p>
            <Task1ApprovedProcessVisual variant={ex.variant} />
          </div>

          {/* Grammar box */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Passive voice</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                Subject + <strong>is/are</strong> + past participle<br />
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
                          {SEQUENCERS.map(s => <option key={s} value={s}>{s} {step.passive.substring(0, 30)}…</option>)}
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

          <ProcessPracticeEngine />
        </div>
      </div>
    </section>
  );
}
