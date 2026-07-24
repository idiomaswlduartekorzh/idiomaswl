'use client';

import Link from 'next/link';
import Task1ChartTypeGuide from './Task1ChartTypeGuide';

const RESPONSE_PLAN = [
  {
    n: '01',
    label: 'Introduction',
    range: '20-30 words',
    purpose: 'Paraphrase the task accurately. Do not report the main features yet.',
    skills: 'Paraphrasing · sentence control',
    href: '/practica/ielts/academic/writing/task1/introduccion',
  },
  {
    n: '02',
    label: 'Overview',
    range: '25-40 words',
    purpose: 'State the visual story: major trend, hierarchy, distribution, process or transformation.',
    skills: 'Visual analysis · feature selection',
    href: '/practica/ielts/academic/writing/task1/overview',
  },
  {
    n: '03',
    label: 'Body 1',
    range: '45-60 words',
    purpose: 'Develop the first meaningful group of evidence, not the first items you notice.',
    skills: 'Grouping · trends · comparisons',
    href: '/practica/ielts/academic/writing/task1/body-1',
  },
  {
    n: '04',
    label: 'Body 2',
    range: '45-60 words',
    purpose: 'Complete the evidence with a second group, contrast, later phase or remaining area.',
    skills: 'Contrast · completion · precision',
    href: '/practica/ielts/academic/writing/task1/body-2',
  },
];

const SKILLS = [
  {
    id: 'introduccion',
    n: 1,
    label: 'Paraphrasing for the introduction',
    icon: '🔁',
    desc: 'Paraphrase the prompt without copying. Change vocabulary, word class and sentence structure.',
    href: '/practica/ielts/academic/writing/task1/introduccion',
    tag: 'Paraphrasing',
  },
  {
    id: 'overview',
    n: 2,
    label: 'Writing the overview',
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
    desc: 'Location language (to the north of, adjacent to) and change language (was replaced by, was demolished).',
    href: '/practica/ielts/academic/writing/task1/mapas',
    tag: 'Maps',
  },
  {
    id: 'vocabulario',
    n: 7,
    label: 'Data vocabulary',
    icon: '📚',
    desc: 'Choose accurate verbs, nouns, adverbs and cohesive links for changes, proportions and comparisons.',
    href: '/practica/ielts/academic/writing/task1/vocabulario',
    tag: 'Verb · Adverb · Structure',
  },
  {
    id: 'tarea-completa',
    n: 8,
    label: 'Complete Task',
    icon: '⏱️',
    desc: 'Full practice: 20 minutes, a word counter, a structured review and original WeLearn model responses.',
    href: '/practica/ielts/academic/writing/task1/tarea-completa',
    tag: 'Full Task · 20 min',
  },
];

const PARAGRAPH_TOOLKIT = [
  {
    paragraph: 'Introduction',
    role: 'Reframe the task accurately without reporting findings.',
    tools: [
      { label: 'Paraphrasing', href: '/practica/ielts/academic/writing/task1/introduccion' },
      { label: 'Identify the visual', href: '/practica/ielts/academic/writing/task1/overview' },
    ],
  },
  {
    paragraph: 'Overview',
    role: 'State the main story before supporting it with detail.',
    tools: [
      { label: 'Overview decisions', href: '/practica/ielts/academic/writing/task1/overview' },
      { label: 'Relevant trends', href: '/practica/ielts/academic/writing/task1/tendencias' },
      { label: 'Process sequencing', href: '/practica/ielts/academic/writing/task1/procesos' },
      { label: 'Map transformation', href: '/practica/ielts/academic/writing/task1/mapas' },
    ],
  },
  {
    paragraph: 'Body 1',
    role: 'Develop the first evidence group with a clear relationship.',
    tools: [
      { label: 'Body 1 grouping', href: '/practica/ielts/academic/writing/task1/body-1' },
      { label: 'Trends', href: '/practica/ielts/academic/writing/task1/tendencias' },
      { label: 'Comparisons', href: '/practica/ielts/academic/writing/task1/comparaciones' },
      { label: 'Data vocabulary', href: '/practica/ielts/academic/writing/task1/vocabulario' },
    ],
  },
  {
    paragraph: 'Body 2',
    role: 'Complete the evidence plan with a second group, contrast, phase or area.',
    tools: [
      { label: 'Body 2 completion', href: '/practica/ielts/academic/writing/task1/body-2' },
      { label: 'Comparisons', href: '/practica/ielts/academic/writing/task1/comparaciones' },
      { label: 'Process sequencing', href: '/practica/ielts/academic/writing/task1/procesos' },
      { label: 'Map changes', href: '/practica/ielts/academic/writing/task1/mapas' },
    ],
  },
];

const TASK1_FAQS = [
  {
    question: 'What does IELTS Academic Writing Task 1 ask you to do?',
    answer: 'It asks you to describe visual information in at least 150 words. The input may be a graph, table, process, map or combination of visuals.',
  },
  {
    question: 'Are these skills separate official tasks?',
    answer: 'No. Introduction, Overview, Body 1 and Body 2 are parts of one WeLearn study response plan. Trends, comparisons, vocabulary, process language and map language are transferable micro-skills that support the official IELTS Academic Writing Task 1.',
  },
  {
    question: 'Does IELTS prescribe a fixed number of paragraphs or words per paragraph?',
    answer: 'No. IELTS requires at least 150 words for Academic Writing Task 1, but it does not prescribe paragraph names or paragraph word counts. WeLearn uses an Introduction, Overview, Body 1 and Body 2 plan to make practice more manageable.',
  },
];

export default function Task1HubPage() {
  return (
    <section className="wl-section" lang="en">
      <div className="wrap">
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Writing</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing / Task 1</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />IELTS Academic Writing Task 1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: 0, margin: '0 0 0.5rem', fontWeight: 700 }}>
            IELTS Academic Writing Task 1: response architecture and practice
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
            Describe visual information in at least 150 words. Task 1 is usually managed in about 20 minutes. Use the four-paragraph WeLearn study plan to turn analysis into a focused response.
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
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Official format</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                IELTS Academic Writing Task 1 asks you to describe visual information in at least 150 words. The input can be a chart, table, process diagram, map or mixed visual. IELTS does not prescribe paragraph names or a word count for each paragraph.
              </p>
            </article>
            <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>WeLearn response strategy</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 0 }}>
                Study four paragraphs: Introduction, Overview, Body 1 and Body 2. The word ranges below are guidance for practice, not official IELTS rules. Sub-skills help you build each paragraph; they are not separate tasks.
              </p>
            </article>
          </div>

          <section aria-labelledby="response-architecture" style={{ margin: '2.25rem 0' }}>
            <p className="eyebrow"><span className="ink-line" />Response architecture</p>
            <h2 id="response-architecture" style={{ margin: '0 0 0.45rem', fontSize: '1.45rem' }}>Build one coherent Task 1 response</h2>
            <p style={{ maxWidth: 780, margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65 }}>A third body paragraph is optional only for an unusually dense visual. It is not the standard structure and should never replace clear grouping.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
              {RESPONSE_PLAN.map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <article className="wl-card" style={{ height: '100%', padding: '1rem', borderTop: '4px solid #0f3d8c', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, color: '#0f3d8c' }}><span>{item.n}</span><span>{item.range}</span></div>
                    <h3 style={{ margin: 0, fontSize: '1.08rem', color: 'var(--ink)' }}>{item.label}</h3>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem' }}>{item.purpose}</p>
                    <p style={{ margin: 'auto 0 0', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800 }}>{item.skills} →</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <Task1ChartTypeGuide />

          <section aria-labelledby="paragraph-toolkit" style={{ marginTop: '2.25rem' }}>
            <p className="eyebrow"><span className="ink-line" />Paragraph toolkit</p>
            <h2 id="paragraph-toolkit" style={{ margin: '0 0 0.45rem', fontSize: '1.45rem' }}>Use a sub-skill to solve a paragraph decision</h2>
            <p style={{ maxWidth: 820, margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Paragraphs are the response structure. The linked lessons below are the reusable tools that help you make each paragraph work for charts, tables, processes and maps.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {PARAGRAPH_TOOLKIT.map((item) => (
                <article key={item.paragraph} className="wl-card" style={{ padding: '1rem', borderTop: '3px solid #0f3d8c' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.02rem' }}>{item.paragraph}</h3>
                  <p style={{ margin: '0 0 0.75rem', color: 'var(--ink-2)', fontSize: '0.86rem', lineHeight: 1.55 }}>{item.role}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {item.tools.map((tool) => (
                      <Link key={tool.href} href={tool.href} style={{ border: '1px solid rgba(15,61,140,0.2)', borderRadius: 999, color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800, padding: '0.24rem 0.5rem', textDecoration: 'none' }}>
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="transferable-skills" style={{ marginTop: '2.25rem' }}>
            <p className="eyebrow"><span className="ink-line" />Transferable sub-skills</p>
            <h2 id="transferable-skills" style={{ margin: '0 0 0.45rem', fontSize: '1.45rem' }}>The tools that make the paragraphs work</h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65 }}>Choose a skill after you know which paragraph and which visual decision you need to improve.</p>
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
          </section>

          <section aria-labelledby="task1-faqs" style={{ marginTop: '2.25rem' }}>
            <p className="eyebrow"><span className="ink-line" />Questions learners ask</p>
            <h2 id="task1-faqs" style={{ margin: '0 0 0.9rem', fontSize: '1.45rem' }}>IELTS Academic Writing Task 1 FAQ</h2>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {TASK1_FAQS.map((faq) => (
                <details key={faq.question} className="wl-card" style={{ padding: '0.9rem 1rem' }}>
                  <summary style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 800, lineHeight: 1.45 }}>{faq.question}</summary>
                  <p style={{ margin: '0.75rem 0 0', color: 'var(--ink-2)', lineHeight: 1.65 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
