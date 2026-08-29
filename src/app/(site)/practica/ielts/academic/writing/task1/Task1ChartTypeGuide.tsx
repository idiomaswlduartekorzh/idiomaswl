'use client';

import Link from 'next/link';
import Image from 'next/image';
import { task1Visual, type Task1VisualBankKind } from './task1-visual-bank';

type ChartType = {
  name: string;
  route: string;
  useFor: string;
  overview: string;
  body: string;
  language: string;
  previewKind: Task1VisualBankKind;
};

const CHART_TYPES: ChartType[] = [
  {
    name: 'Line graph',
    previewKind: 'line',
    route: '/practica/ielts/academic/writing/task1/graficos-lineales',
    useFor: 'Changes over time',
    overview: 'Look for the dominant trend, line crossing, peak, fall or convergence.',
    body: 'Group the timeline into meaningful periods: start, rapid change, stability or finish.',
    language: 'rose steadily, peaked at, declined gradually, overtook, remained stable',
  },
  {
    name: 'Bar chart',
    previewKind: 'bar',
    route: '/practica/ielts/academic/writing/task1/graficos-de-barras',
    useFor: 'Comparisons between categories',
    overview: 'Look for the highest or lowest category and the clearest contrast.',
    body: 'Group similar categories instead of describing every bar separately.',
    language: 'higher than, whereas, considerably lower, the largest proportion',
  },
  {
    name: 'Pie charts',
    previewKind: 'pie',
    route: '/practica/ielts/academic/writing/task1/pie-charts',
    useFor: 'Parts of a whole',
    overview: 'Look for the dominant segment and distribution changes when two charts are shown.',
    body: 'Compare large and small proportions without listing every slice.',
    language: 'accounted for, made up, represented, the smallest share',
  },
  {
    name: 'Table',
    previewKind: 'table',
    route: '/practica/ielts/academic/writing/task1/tablas',
    useFor: 'Dense row-and-column data',
    overview: 'Look for extremes, row or column patterns and categories that form groups.',
    body: 'Turn the table into two logical groups before writing.',
    language: 'the figure for, respectively, by contrast, across all categories',
  },
  {
    name: 'Process diagram',
    previewKind: 'process',
    route: '/practica/ielts/academic/writing/task1/procesos',
    useFor: 'Production stages or a cycle',
    overview: 'Mention the number of stages and whether the process is linear or cyclical.',
    body: 'Use the passive voice and chronological order; do not invent reasons.',
    language: 'is collected, is heated, after this, subsequently, finally',
  },
  {
    name: 'Map',
    previewKind: 'map',
    route: '/practica/ielts/academic/writing/task1/mapas',
    useFor: 'Spatial changes over time',
    overview: 'Look for overall development, replacements, expansion or reduction.',
    body: 'Organise the response by zones or by before-and-after changes.',
    language: 'was replaced by, was converted into, to the north of, adjacent to',
  },
  {
    name: 'Mixed chart',
    previewKind: 'mixed',
    route: '/practica/ielts/academic/writing/task1/tarea-completa',
    useFor: 'Two connected visuals',
    overview: 'Find the relationship between the visuals instead of treating them as separate tasks.',
    body: 'Use one paragraph per visual or group them around a shared relationship.',
    language: 'while, in relation to, this corresponded with, a similar pattern',
  },
];

export default function Task1ChartTypeGuide({ showVisualPreviews = false }: { showVisualPreviews?: boolean }) {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Task 1 visual types
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(15,61,140,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Identify the visual before practising a sub-skill.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            The response structure changes with the input: a line graph requires trend language, a table requires grouping,
            a process requires sequencing and a map requires spatial transformation. This guide connects the official IELTS
            format with the WeLearn teaching strategy.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {CHART_TYPES.map((type) => {
            const preview = task1Visual(type.previewKind);
            return (
              <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
                {showVisualPreviews && (
                  <div style={{ margin: '-0.35rem -0.35rem 0.8rem', border: '1px solid var(--line-soft)', borderRadius: 7, overflow: 'hidden', background: '#fff' }}>
                    <Image
                      src={preview.src}
                      alt=""
                      width={preview.width}
                      height={preview.height}
                      sizes="(max-width: 640px) 90vw, 300px"
                      loading="lazy"
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem' }}>{type.name}</h3>
                <p style={{ margin: '0 0 0.55rem', color: 'var(--wl-on-panel-link, #0f3d8c)', fontWeight: 800, fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>
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
                <Link href={type.route} style={{ color: 'var(--wl-on-panel-link, #0f3d8c)', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>
                  Practise this visual type →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
