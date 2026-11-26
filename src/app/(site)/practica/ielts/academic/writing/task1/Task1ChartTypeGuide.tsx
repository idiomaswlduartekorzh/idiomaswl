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
  question: string;
  reading: string;
  previewKind: Task1VisualBankKind;
  variant?: number;
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
    question: 'Did any of the three regions catch up?',
    reading: 'Follow the North line from 30% to 89%. Central and South rise too, but neither line crosses it. “Access rose in all three regions, with the North ahead throughout” tells your reader more than the five Northern figures on their own. On your next graph, check the lines between the endpoints before you write “throughout”.',
  },
  {
    name: 'Bar chart',
    previewKind: 'bar',
    route: '/practica/ielts/academic/writing/task1/graficos-de-barras',
    useFor: 'Comparisons between categories',
    overview: 'Look for the highest or lowest category and the clearest contrast.',
    body: 'Group similar categories instead of describing every bar separately.',
    language: 'higher than, whereas, considerably lower, the largest proportion',
    question: 'Can you say which country spent the most money?',
    reading: 'Finland has the tallest bar in both years. Look at the axis before you write “spent the most”. The bars measure shares of national budgets. Finland allocated the largest share to education, rising from 6.4% to 7.3%. To compare amounts of money, you would also need the size of each budget.',
  },
  {
    name: 'Pie charts',
    previewKind: 'pie',
    route: '/practica/ielts/academic/writing/task1/pie-charts',
    useFor: 'Parts of a whole',
    overview: 'Look for the dominant segment and distribution changes when two charts are shown.',
    body: 'Compare large and small proportions without listing every slice.',
    language: 'accounted for, made up, represented, the smallest share',
    question: 'What changed hands at the top?',
    reading: 'Gas had the largest slice in 2005 at 42%. By 2025 electricity led at 34%, while renewables had drawn level with gas at 29%. That change of leader belongs in the overview. Save the percentages for the sentence that demonstrates it. The size of a slice tells you a share of energy use, even when total consumption is unknown.',
  },
  {
    name: 'Table',
    previewKind: 'table',
    route: '/practica/ielts/academic/writing/task1/tablas',
    useFor: 'Dense row-and-column data',
    overview: 'Look for extremes, row or column patterns and categories that form groups.',
    body: 'Turn the table into two logical groups before writing.',
    language: 'the figure for, respectively, by contrast, across all categories',
    question: 'Did the highest total also grow the most?',
    reading: 'Japan had the most students in each column, climbing from 118,000 to 151,000. Canada went from 82,000 to 131,000. Comparing gains gives you 33,000 for Japan and 49,000 for Canada. Decide whether your sentence is about the total or the increase before you choose the word “largest”.',
  },
  {
    name: 'Process diagram',
    previewKind: 'process',
    route: '/practica/ielts/academic/writing/task1/procesos',
    useFor: 'Production stages or a cycle',
    overview: 'Find the input, the outcome and any arrow that takes you back to an earlier stage.',
    body: 'Group related stages. A passive verb works well when the object matters most. For natural changes, a verb such as “hatches” may be clearer.',
    language: 'is collected, is heated, after this, subsequently, finally',
    question: 'Where does the final arrow take you?',
    reading: 'The recycling sequence starts with discarded bottles and ends with several products, including a shirt. You might expect the new bottles to be recycled again, but the final panel has no arrow back to collection. Describe the five stages shown. If a different diagram closes the loop, name the stage it returns to.',
  },
  {
    name: 'Map',
    previewKind: 'map',
    route: '/practica/ielts/academic/writing/task1/mapas',
    useFor: 'Spatial changes over time',
    overview: 'Look for overall development, replacements, expansion or reduction.',
    body: 'Organise the response by zones or by before-and-after changes.',
    language: 'was replaced by, was converted into, to the north of, adjacent to',
    question: 'Did the factory move?',
    reading: 'Keep your eye on the same corner in both maps. The factory occupied the north-east site in 1990. A school stands there in 2020. “A school replaced the factory” says exactly what you can see. “The factory moved” would require a second location. Check each change against the same piece of ground.',
  },
  {
    name: 'Mixed chart',
    previewKind: 'mixed',
    variant: 1,
    route: '/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=internet-screen-time',
    useFor: 'Two connected visuals',
    overview: 'Find the relationship between the visuals instead of treating them as separate tasks.',
    body: 'Use one paragraph per visual or group them around a shared relationship.',
    language: 'while, in relation to, this corresponded with, a similar pattern',
    question: 'Do the two figures tell you what each person did?',
    reading: 'Cars account for 40% of journeys in the bars and 40% of preferences in the pie. The shares for bus and rail also match across the two panels. That gives you a useful overview of the group. Saying “everyone travelled the way they preferred” would need a link between each person and each trip. Check who or what each percentage counts.',
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
            What can you tell from this figure?
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            Choose a figure and read its title and labels. Try saying its main point to someone who cannot see it.
            {showVisualPreviews && ' Open the question under the figure to compare your first impression with a closer reading.'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
          {CHART_TYPES.map((type) => {
            const preview = task1Visual(type.previewKind, type.variant);
            return (
              <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
                {showVisualPreviews && (
                  <div style={{ margin: '-0.35rem -0.35rem 0.8rem', border: '1px solid var(--line-soft)', borderRadius: 7, overflow: 'hidden', background: '#fff' }}>
                    <Image
                      src={preview.src}
                      alt={preview.alt}
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
                {showVisualPreviews && (
                  <details style={{ margin: '0.75rem 0', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--ink)' }}>{type.question}</summary>
                    <p style={{ margin: '0.5rem 0', color: 'var(--ink-2)' }}>{type.reading}</p>
                  </details>
                )}
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
