'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import Task1IntroductionPracticeEngine from './Task1IntroductionPracticeEngine';
import { CHART_OF, KINDS, KIND_LABEL, WORKED } from './introduction-data';
import WeLearnDownloadButton from '@/components/learning/WeLearnDownloadButton';

const C = '#0f3d8c';

// ─── SVG Charts ───────────────────────────────────────────────────────────────

/**
 * Los ejemplos trabajados, derivados de la fuente. Antes eran una lista escrita a mano cuyo
 * texto se emparejaba con el gráfico POR POSICIÓN —el índice del ejemplo hacía de variante—, y
 * tres de los treinta habían quedado desincronizados: se leía «Average temperature in three
 * cities» junto a un gráfico de visitas semanales a la biblioteca. Ahora el `variant` viaja
 * dentro del propio ejemplo y no hay dos listas que mantener a la par.
 */
const EXAMPLE_GROUPS = KINDS.map((kind) => ({
  id: kind,
  label: KIND_LABEL[kind],
  Chart: CHART_OF[kind],
  examples: WORKED.filter((item) => item.kind === kind),
}));


// ─── Synonym tables ───────────────────────────────────────────────────────────

const VERB_SYNS = [
  { original: 'shows', alts: ['illustrates', 'presents', 'compares', 'depicts', 'provides data on', 'displays'] },
  { original: 'show (plural)', alts: ['illustrate', 'present', 'compare', 'depict', 'outline'] },
];
const NOUN_SYNS = [
  { original: 'percentage', alts: ['proportion', 'share', 'rate'] },
  { original: 'number (of)', alts: ['figure', 'quantity', 'volume', 'total'] },
  { original: 'amount', alts: ['level', 'quantity', 'volume', 'sum'] },
  { original: 'people', alts: ['individuals', 'the population', 'residents'] },
  { original: 'countries', alts: ['nations', 'states'] },
  { original: 'types / kinds', alts: ['categories', 'forms', 'varieties'] },
];
const TIME_SYNS = [
  { original: 'between X and Y', alts: ['from X to Y', 'over the period X–Y', 'during the X to Y period'] },
  { original: 'in X years', alts: ['over a X-year period', 'across X years'] },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IntroduccionContent() {
  const [activeGroup, setActiveGroup] = useState('line');
  const [activeEx, setActiveEx] = useState('line-0');

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/academic/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
            <span>/</span>
            <Link href="/practica/ielts/academic/writing/task1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Task 1</Link>
            <span>/</span>
            <span style={{ color: C, fontWeight: 800 }}>Introduction</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📝 Sub-skill 1 of 7 — Introduction</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>
            Introduction and Paraphrasing
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 2rem', lineHeight: 1.65 }}>
            The introduction is the first thing the examiner reads. If you copy the prompt, your <em>Lexical Resource</em> score is affected immediately. Here you learn to paraphrase it with academic precision.
          </p>

          <WeLearnDownloadButton
            href="/downloads/ielts-writing-task-1-introduccion-paraphrasing-welearn.pdf"
              label="Download PDF guide"
          />

          <Task1OfficialReviewBlock
            focus="Paraphrase the prompt without adding trends, figures or interpretation."
            officialFormat="IELTS Academic Writing Task 1 asks you to describe visual information in at least 150 words. The introduction is not a separate official task; it is a strategic part of the response."
            welearnStrategy="We train the introduction as a micro-skill because it reduces literal copying and prepares the overview."
            answerCheck="A strong answer changes vocabulary and structure, preserves every detail from the prompt and does not invent conclusions."
          />

          <Task1ChartTypeGuide />

          {/* ── SECTION 1: THEORY ─────────────────────────────────────────── */}
          <div style={{ background: `${C}07`, border: `1.5px solid ${C}22`, borderRadius: 18, padding: '1.75rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 1rem' }}>What is the Introduction?</p>

            <p style={{ fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              The Task 1 introduction is a <strong>one- or two-sentence paragraph</strong> that paraphrases the question prompt. Its only purpose is to tell the examiner <em>what the visual shows</em>, without copying the prompt or mentioning trends and specific figures.
            </p>

            {/* Formula */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid var(--line-soft)' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Formula</p>
              <p style={{ fontSize: '0.97rem', color: C, fontWeight: 700, margin: 0, lineHeight: 1.65 }}>
                The [visual type] <span style={{ color: '#0369a1' }}>illustrates / presents / compares / depicts</span> [paraphrased topic] [time period or place, if shown].
              </p>
            </div>

            {/* Word count */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { label: '30–45 words', desc: 'recommended study range', icon: '📏', c: '#059669' },
                { label: '1–2 sentences', desc: 'no more', icon: '✍️', c: C },
                { label: 'No trends', desc: 'save them for the overview', icon: '🚫', c: '#dc2626' },
                { label: 'No figures', desc: 'or specific data', icon: '🔢', c: '#d97706' },
              ].map(item => (
                <div key={item.label} style={{ flex: '1 1 160px', padding: '0.8rem 1rem', borderRadius: 12, background: `${item.c}10`, border: `1px solid ${item.c}30` }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: item.c, marginBottom: '0.15rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Include / Exclude */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>✓ Incluir</p>
                <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {['Visual type (line graph, bar chart…)', 'Topic / subject (paraphrased)', 'Time period or place (if shown)', 'Unit of measurement, if essential'].map(t => (
                    <li key={t} style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>✗ Excluir</p>
                <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {['Copied prompt text', 'Trends or comparisons', 'Specific figures or percentages', 'Personal opinions or comments'].map(t => (
                    <li key={t} style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: PARAPHRASING TECHNIQUES ──────────────────────── */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Paraphrasing techniques</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { n: '01', title: 'Change the main verb', body: 'The verb "shows" is simple. Replace it with a more academic synonym. Avoid using "shows" when it already appears in the prompt.' },
              { n: '02', title: 'Change key nouns', body: 'Transform nouns with academic synonyms: percentage → proportion, number → figure, people → population/individuals.' },
              { n: '03', title: 'Change the sentence structure', body: 'Turn gerunds into relative clauses: "people using the internet" → "people who had internet access". You can also use nominalisation: "countries that produce" → "producing countries".' },
            ].map(t => (
              <div key={t.n} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, fontFamily: 'var(--mono)', color: C, background: `${C}15`, padding: '0.25rem 0.5rem', borderRadius: 6, flexShrink: 0, marginTop: '0.1rem' }}>{t.n}</div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.25rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Synonym tables */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {[
              { title: 'Verbs', rows: VERB_SYNS },
              { title: 'Nouns', rows: NOUN_SYNS },
              { title: 'Time expressions', rows: TIME_SYNS },
            ].map(tbl => (
              <div key={tbl.title} style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', overflowWrap: 'anywhere' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>{tbl.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tbl.rows.map(r => (
                    <div key={r.original} style={{ fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 700, color: '#dc2626', textDecoration: 'line-through', marginRight: '0.4rem' }}>{r.original}</span>
                      <span style={{ color: 'var(--muted)' }}>→ </span>
                      {r.alts.map((a, i) => (
                        <span key={a}>
                          <span style={{ color: '#059669', fontWeight: 600 }}>{a}</span>
                          {i < r.alts.length - 1 && <span style={{ color: 'var(--muted)', margin: '0 0.25rem' }}>·</span>}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 3: EXAMPLES WITH VISUALS ─────────────────────────── */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Examples with authentic-style visuals</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            Each visual type has three worked examples; the rest are waiting in the practice engine below. Study the prompt, identify the information that must be preserved and compare two valid ways to paraphrase it.
          </p>

          <div style={{ marginBottom: '2.5rem' }}>
            <div role="tablist" aria-label="Visual types" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.55rem', borderBottom: '1px solid var(--line-soft)', scrollbarWidth: 'thin' }}>
              {EXAMPLE_GROUPS.map((group) => (
                <button key={group.id} type="button" role="tab" aria-selected={activeGroup === group.id} onClick={() => { setActiveGroup(group.id); setActiveEx(`${group.id}-0`); }} style={{ flex: '0 0 auto', minWidth: 126, padding: '0.7rem 0.85rem', borderRadius: 10, border: `1px solid ${activeGroup === group.id ? C : 'var(--line-soft)'}`, background: activeGroup === group.id ? `${C}10` : 'var(--bg)', color: activeGroup === group.id ? C : 'var(--muted)', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, textTransform: 'uppercase' }}>{group.label}</span>
                  <span style={{ display: 'block', marginTop: '0.2rem', fontSize: '0.72rem' }}>3 worked examples</span>
                </button>
              ))}
            </div>

            {EXAMPLE_GROUPS.filter((group) => group.id === activeGroup).map((group) => (
              <div key={group.id} role="tabpanel" style={{ paddingTop: '1.25rem' }}>
                <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6 }}>You selected <strong style={{ color: C }}>{group.label}</strong>. Choose a reference to study its visual and paraphrase with enough space to read both clearly.</p>
                <div aria-label={`Guided references for ${group.label}`} style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', padding: '0.15rem 0.1rem 0.7rem', scrollbarWidth: 'thin' }}>
                  {group.examples.map((example, exampleIndex) => {
                    const exampleId = `${group.id}-${exampleIndex}`;
                    const isSelected = activeEx === exampleId;
                    return (
                      <button key={exampleId} type="button" aria-current={isSelected ? 'true' : undefined} onClick={() => setActiveEx(exampleId)} style={{ flex: '1 0 150px', maxWidth: 190, minHeight: 66, padding: '0.7rem 0.75rem', borderRadius: 10, border: `1px solid ${isSelected ? C : 'var(--line-soft)'}`, background: isSelected ? `${C}0b` : 'var(--bg)', cursor: 'pointer', textAlign: 'left', boxShadow: isSelected ? `inset 0 -3px 0 ${C}` : 'none' }}>
                        <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)' }}>EXAMPLE 0{exampleIndex + 1}</span>
                        <span style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35 }}>{example.prompt.replace(/^The [a-z ]+ below shows? /i, '').replace(/\.$/, '')}</span>
                      </button>
                    );
                  })}
                </div>
                {(() => {
                  const exampleIndex = Math.max(0, group.examples.findIndex((_, index) => `${group.id}-${index}` === activeEx));
                  const example = group.examples[exampleIndex];
                  const Chart = group.Chart;
                  return (
                    <article style={{ marginTop: '0.65rem', borderRadius: 14, border: '1px solid var(--line-soft)', background: 'var(--bg)', overflow: 'hidden' }}>
                      <div style={{ padding: '0.8rem 1rem', background: `${C}08`, borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <strong style={{ color: C, fontSize: '0.9rem' }}>Example {String(exampleIndex + 1).padStart(2, '0')} · {KIND_LABEL[example.kind]}</strong>
                        <span style={{ color: 'var(--muted)', fontSize: '0.72rem', fontFamily: 'var(--mono)' }}>Reference {exampleIndex + 1} of {group.examples.length}</span>
                      </div>
                      <div className="task1-intro-example-detail" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)', gap: '1rem', padding: '1rem', alignItems: 'start' }}>
                        <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '0.75rem', border: '1px solid var(--line-soft)', minWidth: 0 }}>
                          <p style={{ fontSize: '0.61rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.55rem' }}>IELTS reference visual</p>
                          <Chart variant={example.variant} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ padding: '0.8rem', borderRadius: 8, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: '0.65rem' }}>
                            <p style={{ fontSize: '0.61rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>The prompt · paraphrase this</p>
                            <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic', fontSize: '0.88rem' }}>{example.prompt}</p>
                          </div>
                          <div style={{ padding: '0.8rem', borderRadius: 8, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.22)', marginBottom: '0.6rem' }}>
                            <p style={{ fontSize: '0.61rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Model A · precise paraphrase</p>
                            <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{example.model}</p>
                          </div>
                          <div style={{ padding: '0.8rem', borderRadius: 8, background: `${C}06`, border: `1px solid ${C}22` }}>
                            <p style={{ fontSize: '0.61rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Model B · valid alternative</p>
                            <p style={{ margin: '0 0 0.5rem', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{example.alternative}</p>
                            <span style={{ fontSize: '0.68rem', color: C, fontFamily: 'var(--mono)', lineHeight: 1.45 }}>{example.swaps}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })()}
              </div>
            ))}
          </div>

          {/* ── SECTION 4: INTERACTIVE PRACTICE ─────────────────────────── */}
          <Task1IntroductionPracticeEngine />

          {/* Next skill */}
          <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <p style={{ margin: '0 0 0.15rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next sub-skill</p>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)', fontSize: '0.97rem' }}>🔭 Overview — the most important Task 1 paragraph</p>
            </div>
            <Link href="/practica/ielts/academic/writing/task1/overview" className="btn btn-sm">
              Go to Overview →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
