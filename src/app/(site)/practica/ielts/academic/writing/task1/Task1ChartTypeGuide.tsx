'use client';

import Link from 'next/link';

const CHART_TYPES = [
  {
    name: 'Line graph',
    route: '/practica/ielts/academic/writing/task1/graficos-lineales',
    useFor: 'Change over time',
    overview: 'Look for the dominant trend, a crossover, a peak, a fall or convergence.',
    body: 'Group the period into stages: start, rapid change, stabilisation or endpoint.',
    language: 'rose steadily, peaked at, declined gradually, overtook, remained stable',
  },
  {
    name: 'Bar chart',
    route: '/practica/ielts/academic/writing/task1/graficos-de-barras',
    useFor: 'Comparisons between categories',
    overview: 'Look for the highest and lowest categories and the clearest contrast.',
    body: 'Group similar categories; do not describe bars one by one.',
    language: 'higher than, whereas, considerably lower, the largest proportion',
  },
  {
    name: 'Pie charts',
    route: '/practica/ielts/academic/writing/task1/pie-charts',
    useFor: 'Parts of a whole',
    overview: 'Look for the dominant segment and how the distribution changes across two charts.',
    body: 'Compare large and small shares; avoid listing every slice.',
    language: 'accounted for, made up, represented, the smallest share',
  },
  {
    name: 'Table',
    route: '/practica/ielts/academic/writing/task1/tablas',
    useFor: 'Dense data by row or column',
    overview: 'Look for extremes, row or column patterns and categories that belong together.',
    body: 'Turn the table into two logical groups before writing.',
    language: 'the figure for, respectively, by contrast, across all categories',
  },
  {
    name: 'Process diagram',
    route: '/practica/ielts/academic/writing/task1/procesos',
    useFor: 'Production stages or a cycle',
    overview: 'Identify the number of stages and whether the process is linear or cyclical.',
    body: 'Use the passive voice and time order; do not invent reasons.',
    language: 'is collected, is heated, after this, subsequently, finally',
  },
  {
    name: 'Map',
    route: '/practica/ielts/academic/writing/task1/mapas',
    useFor: 'Spatial change before and after',
    overview: 'Look for the overall development: urbanisation, replacement, expansion or reduction.',
    body: 'Organise by zones or by before-and-after changes.',
    language: 'was replaced by, was converted into, to the north of, adjacent to',
  },
  {
    name: 'Mixed chart',
    route: '/practica/ielts/academic/writing/task1/tarea-completa',
    useFor: 'Two connected visuals',
    overview: 'Find the relationship between the visuals instead of treating them as separate tasks.',
    body: 'Use one paragraph per visual or one paragraph per shared relationship, as appropriate.',
    language: 'while, in relation to, this corresponded with, a similar pattern',
  },
];

export default function Task1ChartTypeGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Task 1 visual types
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(15,61,140,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Identify the visual before practising each sub-skill.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            Your response structure changes with the input: a line graph calls for trends, a table calls for
            grouping, a process calls for sequence and a map calls for spatial change. This is the bridge between
            the official IELTS format and the WeLearn strategy.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {CHART_TYPES.map((type) => (
            <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem' }}>{type.name}</h3>
              <p style={{ margin: '0 0 0.55rem', color: '#0f3d8c', fontWeight: 800, fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>
                {type.useFor}
              </p>
              <p style={{ margin: '0 0 0.4rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
          <strong>Overview:</strong> {type.overview}
              </p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong>Body:</strong> {type.body}
              </p>
              <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>
                {type.language}
              </p>
              <Link href={type.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>
                Practise this visual →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
