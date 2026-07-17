'use client';

import Link from 'next/link';
import Task1ChartTypeGuide from './Task1ChartTypeGuide';

const SKILLS = [
  {
    id: 'introduccion',
    n: 1,
    label: 'Introduction',
    icon: '🔁',
    desc: 'Paraphrase the prompt without copying. Change vocabulary, word class and sentence structure.',
    href: '/practica/ielts/academic/writing/task1/introduccion',
    tag: 'Paraphrasing',
  },
  {
    id: 'overview',
    n: 2,
    label: 'Overview',
    icon: '🔭',
    desc: 'The most important paragraph: two sentences, no figures and the main trend. This is where many points are lost.',
    href: '/practica/ielts/academic/writing/task1/overview',
    tag: 'Overall trend',
  },
  {
    id: 'tendencias',
    n: 3,
    label: 'Trends',
    icon: '📈',
    desc: 'Read authentic-style IELTS graphs and identify the two or three most relevant trends to mention. Learn to distinguish the essential from the secondary.',
    href: '/practica/ielts/academic/writing/task1/tendencias',
    tag: 'Line graphs · Bar charts',
  },
  {
    id: 'comparaciones',
    n: 4,
    label: 'Comparisons',
    icon: '⚖️',
    desc: 'Compare categories precisely with higher/lower, while and approximation language.',
    href: '/practica/ielts/academic/writing/task1/comparaciones',
    tag: 'Bar · Pie · Table',
  },
  {
    id: 'procesos',
    n: 5,
    label: 'Processes',
    icon: '⚙️',
    desc: 'Use the passive voice and sequencing language to describe process diagrams step by step.',
    href: '/practica/ielts/academic/writing/task1/procesos',
    tag: 'Process diagrams',
  },
  {
    id: 'mapas',
    n: 6,
    label: 'Maps',
    icon: '🗺️',
    desc: 'Lenguaje de ubicación (to the north of, adjacent to) y cambio (was replaced by, was demolished).',
    href: '/practica/ielts/academic/writing/task1/mapas',
    tag: 'Maps',
  },
  {
    id: 'vocabulario',
    n: 7,
    label: 'Data vocabulary',
    icon: '📚',
    desc: 'Choose the correct verb (rise/fall/peak) and adverb (sharply/gradually) to describe a numerical change. The sentence is assembled in real time.',
    href: '/practica/ielts/academic/writing/task1/vocabulario',
    tag: 'Verb · Adverb · Structure',
  },
  {
    id: 'tarea-completa',
    n: 8,
    label: 'Complete Task',
    icon: '⏱️',
    desc: 'Full practice: 20 minutes, word counter and Band 1–9 rubric-based self-review.',
    href: '/practica/ielts/academic/writing/task1/tarea-completa',
    tag: 'Full Task · 20 min',
  },
];

export default function Task1HubPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Writing</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing / Task 1</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />IELTS Academic Writing Task 1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: 0, margin: '0 0 0.5rem', fontWeight: 700 }}>
            Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
            Describe visual data in 150+ words in 20 minutes. Master the eight sub-skills that separate
            Band 5 from Band 7+.
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['Line graphs','Bar charts','Pie charts','Tables','Processes','Maps','Mixed'].map(t => (
              <span key={t} style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#fff' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Official format versus WeLearn strategy</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS Academic Writing Task 1 asks you to describe visual information in at least 150 words. WeLearn
                divides it into micro-skills for practising introductions, overviews, data selection, comparisons,
                processes, maps and vocabulary before writing a complete response.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Explained answer</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Each route practises one part of the response and explains what to check: whether the overview summarises
                the main pattern, whether comparisons are relevant and whether data language remains accurate.
              </p>
            </article>
          </div>

          <Task1ChartTypeGuide />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {SKILLS.map(sk => (
              <Link key={sk.id} href={sk.href}
                style={{ textDecoration: 'none' }}
              >
                <div className="wl-card" style={{ padding: '1.25rem', height: '100%', borderTop: '3px solid #0f3d8c', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{sk.icon}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Sub-skill {sk.n}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{sk.label}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6, flex: 1 }}>{sk.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.15)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{sk.tag}</span>
                    <span style={{ fontSize: '0.82rem', color: '#0f3d8c', fontWeight: 700 }}>Practise →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
