'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSProcessDiagramVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

interface Observation {
  text: string;
  relevant: boolean;
  explanation: string;
}

interface DataSeries {
  label: string;
  color: string;
  values: number[];
}

interface Scenario {
  id: string;
  title: string;
  unit: string;
  years: number[];
  series: DataSeries[];
  yMax: number;
  context: string;
  observations: Observation[];
  targetCount: number;
}

type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';
type VisualLesson = { id: VisualType; label: string; Chart: ComponentType<{ variant?: number }>; examples: { title: string; insight: string; explanation: string }[] };

const VISUAL_LESSONS: VisualLesson[] = [
  { id: 'line', label: 'Line graph', Chart: IELTSLineGraphVisual, examples: [
    { title: 'Overall direction', insight: 'Most lines rise or fall.', explanation: 'Start by checking whether the series share a direction. This pattern often becomes the first sentence of the overview.' },
    { title: 'Change in leadership', insight: 'One line overtakes another.', explanation: 'Compare the beginning and the end. A crossing that changes the ranking matters more than an intermediate figure.' },
    { title: 'Convergence', insight: 'The distance between two series becomes smaller.', explanation: 'It is not enough to say that both rise: check whether they finish closer together or further apart.' },
    { title: 'Anomaly', insight: 'There is an unexpected peak, fall or recovery.', explanation: 'A break in the pattern may be the most important feature, provided it is visible and no cause is invented.' },
    { title: 'Relative stability', insight: 'One series changes little while others move.', explanation: 'A stable line can provide a useful contrast with accelerated growth or decline.' },
  ] },
  { id: 'bar', label: 'Bar chart', Chart: IELTSBarChartVisual, examples: [
    { title: 'Highest category', insight: 'One category clearly dominates.', explanation: 'In a static bar chart, the tallest bar can organise the overview when the difference is meaningful.' },
    { title: 'Lowest category', insight: 'One category is far below the others.', explanation: 'The contrast between the highest and lowest categories is often more useful than listing every bar.' },
    { title: 'Hierarchy', insight: 'The categories form a clear order.', explanation: 'Summarise the structure as a leader, a middle group and a lower group rather than listing figures.' },
    { title: 'Clustering', insight: 'Several bars have similar levels.', explanation: 'Grouping similar categories helps the reader see the pattern without describing each bar separately.' },
    { title: 'Category order', insight: 'The bars are arranged from highest to lowest.', explanation: 'When a chart shows one year, describe hierarchy and extremes; do not invent a time trend.' },
  ] },
  { id: 'pie', label: 'Pie chart', Chart: IELTSPieChartVisual, examples: [
    { title: 'Largest sector', insight: 'One source or category occupies the main share.', explanation: 'The dominant sector is often the first feature the reader needs to know.' },
    { title: 'Smallest sector', insight: 'One slice represents a minimal share.', explanation: 'Mention the lowest category only when it clearly contrasts with the main sectors.' },
    { title: 'Combined majority', insight: 'Two sectors account for most of the whole.', explanation: 'Group sectors when their combined share tells the story better than their individual figures.' },
    { title: 'Balanced distribution', insight: 'The slices are relatively similar.', explanation: 'If there is no clear leader, the overview can state that the distribution is fairly even.' },
    { title: 'Change in composition', insight: 'Two pies show that the allocation changes.', explanation: 'Compare the initial and final composition: identify what gains and loses share without inventing a cause.' },
  ] },
  { id: 'table', label: 'Table', Chart: IELTSTableVisual, examples: [
    { title: 'Row pattern', insight: 'A variable rises or falls consistently.', explanation: 'Look for a regularity across several rows, such as a decline with age.' },
    { title: 'Column pattern', insight: 'One country, group or year dominates several columns.', explanation: 'A category that leads repeatedly can be a meaningful cross-table pattern.' },
    { title: 'Extremes', insight: 'Clear maximum and minimum values stand out.', explanation: 'Use extremes to orient the overview and save exact figures for the detail paragraphs.' },
    { title: 'Shared change', insight: 'Most cells move in the same direction.', explanation: 'The common pattern matters more than an isolated exception.' },
    { title: 'Exception', insight: 'One category breaks the general pattern.', explanation: 'An exception deserves attention when it changes the interpretation of the table.' },
  ] },
  { id: 'process', label: 'Process diagram', Chart: IELTSProcessDiagramVisual, examples: [
    { title: 'Sequence', insight: 'The process follows stages in order.', explanation: 'Summarise the overall flow before describing individual steps.' },
    { title: 'Start and finish', insight: 'The material ends as a different product.', explanation: 'Naming the input and outcome gives the reader the complete process structure.' },
    { title: 'Groupable phases', insight: 'Several stages form natural blocks.', explanation: 'Group preparation, treatment and outcome to avoid a mechanical list.' },
    { title: 'Cyclical process', insight: 'The final stage connects to the beginning.', explanation: 'If the process is cyclical, say so explicitly because it changes the response structure.' },
    { title: 'No numerical trend', insight: 'The visual shows actions, not quantities.', explanation: 'Do not use rise, fall or increase when the diagram only represents stages.' },
  ] },
  { id: 'map', label: 'Map', Chart: IELTSMapDiagramVisual, examples: [
    { title: 'Urbanisation', insight: 'The area becomes more developed.', explanation: 'Summarise the change in the character of the place rather than naming every building.' },
    { title: 'Land use', insight: 'One function replaces another.', explanation: 'Factories, parks, housing and services can be grouped as changes in land use.' },
    { title: 'Infrastructure', insight: 'Routes or access points appear or improve.', explanation: 'The circulation network can be a meaningful overall transformation.' },
    { title: 'Losses and additions', insight: 'Some features disappear while others appear.', explanation: 'An before-and-after comparison should prioritise changes without inventing reasons.' },
    { title: 'Density', insight: 'The final area contains more facilities.', explanation: 'Greater density can work as an overview when it is supported across the map.' },
  ] },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'internet',
    title: 'Internet penetration rate (%) — three world regions, 2000–2020',
    unit: '%',
    years: [2000, 2005, 2010, 2015, 2020],
    yMax: 100,
    series: [
      { label: 'North America', color: '#0f3d8c', values: [45, 65, 75, 85, 90] },
      { label: 'Latin America', color: '#059669', values: [5, 15, 35, 55, 70] },
      { label: 'Africa', color: '#f59e0b', values: [2, 5, 10, 22, 40] },
    ],
    context: 'The line graph below shows the percentage of the population with internet access in three world regions between 2000 and 2020.',
    observations: [
      { text: 'All three regions experienced significant growth in internet usage over the period.', relevant: true, explanation: 'Correct. This is the most important overall trend: a pattern shared by all three series and suitable for the overview.' },
      { text: 'North America had the highest internet penetration rate at every data point.', relevant: true, explanation: 'Correct. It highlights a constant and dominant feature that deserves mention.' },
      { text: 'Latin America\'s rate rose from 5% in 2000 to 35% in 2010.', relevant: false, explanation: 'Too specific for an overview. Exact figures belong in the detail paragraphs, not as a key trend.' },
      { text: 'By 2020, the gap between regions had narrowed significantly compared to 2000.', relevant: true, explanation: 'Correct. Convergence is an analytically important trend because it changes the relationship between the series.' },
      { text: 'Africa saw a slight dip in internet usage around 2007.', relevant: false, explanation: 'The data show growth only. Never describe a trend that is not visible in the chart.' },
    ],
    targetCount: 3,
  },
  {
    id: 'graduates',
    title: 'University graduates (thousands) — STEM vs Arts & Humanities, 2000–2020',
    unit: 'thousands',
    years: [2000, 2005, 2010, 2015, 2020],
    yMax: 220,
    series: [
      { label: 'STEM', color: '#0f3d8c', values: [80, 90, 120, 160, 200] },
      { label: 'Arts & Humanities', color: '#dc2626', values: [100, 95, 90, 80, 70] },
    ],
    context: 'The graph below illustrates the number of university graduates (in thousands) in STEM subjects and Arts & Humanities between 2000 and 2020.',
    observations: [
      { text: 'STEM graduates increased steadily and consistently throughout the entire period.', relevant: true, explanation: 'Correct. This is a clear, progressive and well-defined dominant trend.' },
      { text: 'Arts & Humanities graduates showed a consistent decline over the same period.', relevant: true, explanation: 'Correct. The opposite direction creates the chart’s clearest contrast.' },
      { text: 'STEM graduates rose by exactly 120,000 between 2000 and 2020.', relevant: false, explanation: 'The exact calculation belongs in the detail paragraphs. An overview captures trends rather than precise arithmetic.' },
      { text: 'In 2000, Arts & Humanities graduates outnumbered STEM graduates.', relevant: true, explanation: 'Correct. This starting-point comparison gives context to the divergence: Arts led initially, while STEM dominated by 2020.' },
      { text: 'STEM and Arts figures crossed at some point between 2005 and 2010.', relevant: false, explanation: 'This is vague and imprecise. If the crossing matters, calculate the relevant point or leave it out of the overview.' },
    ],
    targetCount: 3,
  },
  {
    id: 'tourism',
    title: 'International tourist arrivals (millions) — 3 countries, 2010–2020',
    unit: 'millions',
    years: [2010, 2012, 2014, 2016, 2018, 2020],
    yMax: 45,
    series: [
      { label: 'Country A', color: '#0f3d8c', values: [10, 15, 22, 30, 38, 5] },
      { label: 'Country B', color: '#059669', values: [20, 22, 24, 26, 28, 4] },
      { label: 'Country C', color: '#7c3aed', values: [5, 8, 12, 18, 25, 3] },
    ],
    context: 'The line graph below shows the number of international tourist arrivals (in millions) to three countries between 2010 and 2020.',
    observations: [
      { text: 'All three countries saw a dramatic fall in tourist arrivals in 2020.', relevant: true, explanation: 'Correct. This is the chart’s most striking feature: a sudden and severe fall affecting all three countries.' },
      { text: 'Country A showed the steepest growth between 2010 and 2018, eventually overtaking Country B.', relevant: true, explanation: 'Correct. It captures both the sharpest growth and the meaningful change in leadership.' },
      { text: 'Country C\'s arrivals rose from 5 million in 2010 to 8 million in 2012.', relevant: false, explanation: 'This isolated point belongs in a detail paragraph and is too narrow for the overview.' },
      { text: 'Country B consistently attracted more visitors than Country A before 2016.', relevant: true, explanation: 'Correct. This comparison provides context for the change in position: B led initially before A overtook it.' },
      { text: 'Tourism figures fluctuated throughout the period for all three countries.', relevant: false, explanation: 'Incorrect: all three countries show sustained growth from 2010 to 2018, not fluctuation.' },
    ],
    targetCount: 3,
  },
  {
    id: 'energy',
    title: 'Renewable energy generation (terawatt-hours) — 3 sources, 2000–2020',
    unit: 'TWh',
    years: [2000, 2005, 2010, 2015, 2020],
    yMax: 120,
    series: [
      { label: 'Solar', color: '#f59e0b', values: [4, 12, 25, 55, 100] },
      { label: 'Wind', color: '#0f3d8c', values: [18, 28, 40, 62, 88] },
      { label: 'Hydro', color: '#059669', values: [70, 72, 75, 78, 80] },
    ],
    context: 'The line graph below shows renewable energy generation from three sources between 2000 and 2020.',
    observations: [
      { text: 'Solar experienced the fastest growth and finished close to the leading source.', relevant: true, explanation: 'Correct. The rate of change and final position tell the most important story.' },
      { text: 'Hydro remained relatively stable compared with the other sources.', relevant: true, explanation: 'Correct. A stable series can be relevant when it contrasts with the others.' },
      { text: 'Solar generated exactly 25 TWh in 2010.', relevant: false, explanation: 'This is an isolated figure. It may support a detail paragraph, but it is not the strongest overview trend.' },
      { text: 'Wind grew steadily but remained below hydro throughout the period.', relevant: true, explanation: 'Correct. It combines direction and relative position without listing figures.' },
      { text: 'Renewable energy became popular because governments changed their policies.', relevant: false, explanation: 'The chart does not demonstrate a cause. Do not add external explanations.' },
    ],
    targetCount: 3,
  },
  {
    id: 'commute',
    title: 'Daily commuting modes (thousands) — one city, 2005–2025',
    unit: 'thousands',
    years: [2005, 2010, 2015, 2020, 2025],
    yMax: 100,
    series: [
      { label: 'Car', color: '#dc2626', values: [80, 82, 78, 60, 48] },
      { label: 'Bus', color: '#0f3d8c', values: [45, 48, 50, 52, 55] },
      { label: 'Cycling', color: '#059669', values: [8, 12, 20, 35, 62] },
    ],
    context: 'The line graph below shows the number of people using three forms of transport for daily commuting between 2005 and 2025.',
    observations: [
      { text: 'Car use declined overall, while cycling increased considerably.', relevant: true, explanation: 'Correct. This contrast in direction organises the complete story.' },
      { text: 'Cycling overtook car use in 2025.', relevant: false, explanation: 'This did not happen: cycling finished above bus but remained below car.' },
      { text: 'Bus use changed relatively little over the period.', relevant: true, explanation: 'Correct. Relative stability provides a useful contrast with the other series.' },
      { text: 'Car use was 82,000 in 2010.', relevant: false, explanation: 'This is a single data point, not an overall trend.' },
      { text: 'The gap between car and cycling narrowed substantially by the end.', relevant: true, explanation: 'Correct. Final convergence shows a meaningful comparative change.' },
    ],
    targetCount: 3,
  },
];

const TREND_DECISION_RULES = [
  {
    label: 'Overall pattern',
    question: 'Do most categories rise, fall, remain stable or change direction?',
    example: 'All three categories increased, although at different speeds.',
  },
  {
    label: 'Change in leadership',
    question: 'Does one line or category overtake another?',
    example: 'Country A overtook Country B in the second half of the period.',
  },
  {
    label: 'Extremes',
    question: 'Which category finishes highest, lowest or with the strongest change?',
    example: 'The most dramatic growth was recorded in Latin America.',
  },
  {
    label: 'Relevant anomaly',
    question: 'Is there a sudden fall, peak or recovery that changes the story?',
    example: 'All countries experienced a sharp fall in 2020 before any recovery.',
  },
];

// ─── SVG mini line chart ──────────────────────────────────────────────────────

function MiniLineChart({ scenario }: { scenario: Scenario }) {
  const W = 500, H = 170;
  const PAD = { top: 12, right: 16, bottom: 28, left: 38 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const xStep = cW / (scenario.years.length - 1);
  const yScale = (v: number) => PAD.top + cH - (v / scenario.yMax) * cH;
  const xPos = (i: number) => PAD.left + i * xStep;

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 500, display: 'block' }} aria-label={scenario.title}>
      {/* Grid */}
      {yTicks.map((f, i) => (
        <line key={i}
          x1={PAD.left} y1={yScale(f * scenario.yMax)}
          x2={W - PAD.right} y2={yScale(f * scenario.yMax)}
          stroke="var(--line-soft)" strokeWidth={0.8}
        />
      ))}
      {/* Y labels */}
      {yTicks.map((f, i) => (
        <text key={i}
          x={PAD.left - 5} y={yScale(f * scenario.yMax) + 4}
          textAnchor="end" fontSize={8.5} fill="var(--muted)">
          {Math.round(f * scenario.yMax)}
        </text>
      ))}
      {/* X labels */}
      {scenario.years.map((yr, i) => (
        <text key={i}
          x={xPos(i)} y={H - 4}
          textAnchor="middle" fontSize={8.5} fill="var(--muted)">
          {yr}
        </text>
      ))}
      {/* Series */}
      {scenario.series.map(s => {
        const pts = s.values.map((v, i) => `${xPos(i)},${yScale(v)}`).join(' ');
        return (
          <g key={s.label}>
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {s.values.map((v, i) => (
              <circle key={i} cx={xPos(i)} cy={yScale(v)} r={3} fill={s.color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function VisualTrendLab() {
  const [type, setType] = useState<VisualType>('line');
  const [example, setExample] = useState(0);
  const lesson = VISUAL_LESSONS.find((item) => item.id === type) ?? VISUAL_LESSONS[0];
  const Chart = lesson.Chart;
  const current = lesson.examples[example];

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.12rem' }}>Before practising: how to read a trend</h2>
      <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
        Do not start by selecting randomly. First identify what can count as a trend for the visual: a direction or crossing in a line graph, a hierarchy in bars, a distribution in pies, a pattern in a table, a sequence in a process or a spatial change on a map.
      </p>
      <div role="tablist" aria-label="Visual types for trend practice" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem' }}>
        {VISUAL_LESSONS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={type === item.id} onClick={() => { setType(item.id); setExample(0); }} style={{ flex: '0 0 auto', minWidth: 130, padding: '0.7rem 0.75rem', borderRadius: 8, border: type === item.id ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: type === item.id ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: type === item.id ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}>{item.label}</button>)}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.8rem 0 0.45rem' }}>
        {lesson.examples.map((item, index) => <button key={item.title} type="button" onClick={() => setExample(index)} aria-pressed={example === index} style={{ flex: '0 0 auto', minWidth: 132, padding: '0.62rem 0.7rem', borderRadius: 8, border: example === index ? '2px solid #059669' : '1px solid var(--line-soft)', background: example === index ? 'rgba(5,150,105,0.07)' : 'var(--bg)', color: example === index ? '#047857' : 'var(--ink-2)', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>{String(index + 1).padStart(2, '0')} · {item.title}</button>)}
      </div>
      <article role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', marginTop: '0.75rem', padding: '1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
        <div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><Chart variant={example} /></div>
        <div><p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{current.title}</p><p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontWeight: 800 }}>{current.insight}</p><p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>{current.explanation}</p></div>
      </article>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TendenciasContent() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const sc = SCENARIOS[scenarioIdx];

  function toggleObs(i: number) {
    if (revealed) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  }

  function nextScenario() {
    setScenarioIdx(i => (i + 1) % SCENARIOS.length);
    setSelected(new Set());
    setRevealed(false);
  }

  const correctCount = [...selected].filter(i => sc.observations[i].relevant).length;
  const totalRelevant = sc.observations.filter(o => o.relevant).length;

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Trends</span>
          </div>

          {/* Header */}
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📈 Sub-skill 3 — Trends</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Identify relevant trends</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', lineHeight: 1.65, maxWidth: 600 }}>
            In IELTS Task 1, you do not describe every figure — you identify the <strong style={{ color: 'var(--ink)' }}>2–3 most important trends</strong>. Practise deciding what deserves space and what does not.
          </p>

          <Task1OfficialReviewBlock
            focus="Distinguish the overall trend, extremes, contrasts and meaningful change."
            officialFormat="IELTS Academic Writing Task 1 may present line graphs, bar charts, tables, maps or processes. Identifying trends is an analysis skill, not a separate official task type."
            welearnStrategy="We use mini visuals to practise what to include and omit before writing a complete overview paragraph."
            answerCheck="The best selection prioritises sustained patterns and meaningful comparisons; exact figures belong in the detail paragraphs."
          />

          <Task1ChartTypeGuide />

          <VisualTrendLab />

          {/* Strategy note */}
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.18)', marginBottom: '1.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>
            💡 <strong style={{ color: 'var(--ink)' }}>Overview rule:</strong> mention the overall pattern, the clearest extreme and the most meaningful comparison. Avoid specific figures in the overview and never invent a trend that is not shown.
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.08rem' }}>What counts as a relevant trend</h2>
            <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              A relevant trend is not just any figure shown in the visual. It is an observation that helps the reader
              understand the complete story: direction, contrast, a change in position or an unusual event.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {TREND_DECISION_RULES.map((rule) => (
                <article key={rule.label} style={{ padding: '0.9rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.92rem' }}>{rule.label}</h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>{rule.question}</p>
                  <p style={{ margin: 0, color: '#0f3d8c', lineHeight: 1.55, fontSize: '0.82rem', fontStyle: 'italic' }}>&ldquo;{rule.example}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>

          {/* Visual selector */}
          <div role="tablist" aria-label="Trend charts" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem', marginBottom: '1.15rem' }}>
            {SCENARIOS.map((scenario, index) => (
              <button key={scenario.id} type="button" role="tab" aria-selected={scenarioIdx === index} onClick={() => { setScenarioIdx(index); setSelected(new Set()); setRevealed(false); }} style={{ flex: '0 0 auto', minWidth: 150, padding: '0.72rem 0.8rem', borderRadius: 8, border: scenarioIdx === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: scenarioIdx === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: scenarioIdx === index ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, textAlign: 'left', cursor: 'pointer' }}>
                {String(index + 1).padStart(2, '0')} · {scenario.title.split(' — ')[0]}
              </button>
            ))}
          </div>

          {/* Chart card */}
          <div className="wl-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>
              IELTS Academic — Line graph
            </p>
            <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.55 }}>
              {sc.context}
            </p>
            <p style={{ margin: '0 0 0.65rem', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>
              {sc.title}
            </p>
            <MiniLineChart scenario={sc} />
            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {sc.series.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: 20, height: 3, background: s.color, borderRadius: 2 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Observations */}
          <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', margin: '0 0 0.75rem' }}>
            Select the <span style={{ color: '#0f3d8c' }}>{sc.targetCount} most important observations</span> to include in your response:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {sc.observations.map((obs, i) => {
              const isSelected = selected.has(i);
              const showResult = revealed;
              const isCorrect = obs.relevant;

              let bg = 'var(--bg-2)';
              let border = '1.5px solid var(--line-soft)';
              let labelColor = 'var(--ink)';

              if (showResult && isSelected && isCorrect) {
                bg = 'rgba(5,150,105,0.07)';
                border = '1.5px solid rgba(5,150,105,0.4)';
              } else if (showResult && isSelected && !isCorrect) {
                bg = 'rgba(220,38,38,0.06)';
                border = '1.5px solid rgba(220,38,38,0.4)';
              } else if (showResult && !isSelected && isCorrect) {
                bg = 'rgba(245,158,11,0.06)';
                border = '1.5px solid rgba(245,158,11,0.35)';
              } else if (isSelected) {
                bg = 'rgba(15,61,140,0.07)';
                border = '2px solid #0f3d8c';
                labelColor = '#0f3d8c';
              }

              return (
                <div key={i}
                  onClick={() => toggleObs(i)}
                  style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: bg, border, cursor: revealed ? 'default' : 'pointer', transition: 'border-color 0.15s, background 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                      border: isSelected ? 'none' : '2px solid var(--line-soft)',
                      background: isSelected ? '#0f3d8c' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isSelected && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 800 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: labelColor, lineHeight: 1.55 }}>{obs.text}</p>
                      {showResult && (
                        <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.06)', borderLeft: `3px solid ${isCorrect ? '#059669' : '#dc2626'}` }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {isCorrect ? '✓ Relevant' : '✗ Not a priority'}
                          </span>
                          <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{obs.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          {!revealed ? (
            <button
              className="btn btn-sm"
              onClick={() => setRevealed(true)}
              disabled={selected.size === 0}
              style={{ opacity: selected.size === 0 ? 0.5 : 1 }}>
              View analysis →
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Score */}
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: correctCount === totalRelevant ? 'rgba(5,150,105,0.08)' : 'rgba(15,61,140,0.06)', border: `1.5px solid ${correctCount === totalRelevant ? 'rgba(5,150,105,0.3)' : 'rgba(15,61,140,0.2)'}` }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: correctCount === totalRelevant ? '#059669' : '#0f3d8c' }}>
                  {correctCount === totalRelevant
                    ? 'Excellent. You identified all the key trends.'
                    : `You identified ${correctCount} of ${totalRelevant} key trends. Review the analysis for the ones you missed.`}
                </p>
              </div>
              <button className="btn btn-sm" onClick={nextScenario} style={{ alignSelf: 'flex-start' }}>
                {scenarioIdx < SCENARIOS.length - 1 ? 'Next chart →' : 'Back to the start →'}
              </button>
            </div>
          )}

          <TrendPracticeEngine />

        </div>
      </div>
    </section>
  );
}

type TrendPracticeItem = { scenario: number; question: string; options: string[]; correct: number; explanation: string };

const TREND_PRACTICE_LEVELS: { title: string; items: TrendPracticeItem[] }[] = [
  {
    title: 'Level 1 · Classify the observation',
    items: [
      { scenario: 0, question: 'Which is an overall trend?', options: ['Latin America rose from 5% to 15%.', 'All three regions grew over the period.', 'North America reached 90% in 2020.', 'The graph has five data points.'], correct: 1, explanation: 'An overall trend affects most series and helps summarise the complete story.' },
      { scenario: 3, question: 'Which contrast deserves attention?', options: ['Solar grew much faster than hydro.', 'Solar reached 25 TWh in 2010.', 'The y-axis ends at 120.', 'There are three sources.'], correct: 0, explanation: 'The rate contrast between an accelerating series and a stable one is more useful than an isolated figure.' },
      { scenario: 4, question: 'Which observation describes convergence?', options: ['Bus stayed near its original level.', 'Car and cycling moved closer together by the end.', 'Cycling stood at 12,000 in 2010.', 'The city used three transport modes.'], correct: 1, explanation: 'Convergence means that the distance between two series becomes smaller.' },
    ],
  },
  {
    title: 'Level 2 · Select the main features',
    items: [
      { scenario: 1, question: 'Choose the best pair for an overview.', options: ['STEM rose steadily and Arts & Humanities declined.', 'STEM was 80,000 in 2000 and Arts was 70,000 in 2020.', 'The lines crossed near 2008 for an unknown reason.', 'There were two subject groups.'], correct: 0, explanation: 'The pair summarises the two opposite directions, which are the chart’s central pattern.' },
      { scenario: 2, question: 'Which combination best explains the change in leadership?', options: ['Country C began at 5 million.', 'Country B led initially, but Country A grew faster and overtook it.', 'All three countries had six observations.', 'Country A ended at 5 million in 2020.'], correct: 1, explanation: 'A change in leadership combines the initial position, rate of change and later position.' },
      { scenario: 4, question: 'Which features should be prioritised?', options: ['Car declined, cycling rose and bus was relatively stable.', 'Car was 80,000 in 2005 and bus was 48,000 in 2010.', 'Cycling is better for the environment.', 'The lines use three colours.'], correct: 0, explanation: 'The option combines direction and stability without adding opinion or unnecessary figures.' },
    ],
  },
  {
    title: 'Level 3 · Draft the strongest overview idea',
    items: [
      { scenario: 2, question: 'Which sentence best summarises the chart?', options: ['Overall, tourist arrivals increased in all three countries.', 'Overall, arrivals rose until 2018, with Country A overtaking Country B, before all three fell sharply in 2020.', 'Overall, Country C rose from 5 to 8 million.', 'Overall, tourism grew because of better flights.'], correct: 1, explanation: 'It includes the initial trend, change in leadership and final anomaly without inventing causes.' },
      { scenario: 3, question: 'Which overview avoids both a list and interpretation?', options: ['Overall, solar rose from 4 to 100 TWh.', 'Overall, hydro was stable, while solar and wind grew, with solar recording the fastest expansion.', 'Overall, renewable energy policy was successful.', 'Overall, wind was 28 TWh in 2005.'], correct: 1, explanation: 'It summarises stability, growth and relative rate: three visible and comparable features.' },
      { scenario: 0, question: 'Which version is the most complete and cautious?', options: ['Overall, all regions grew, North America remained highest and the gap narrowed.', 'Overall, internet access increased because technology improved.', 'Overall, Latin America rose by 65 percentage points.', 'Overall, Africa was the weakest region.'], correct: 0, explanation: 'It combines the overall pattern, leadership and convergence without causality or evaluative language.' },
    ],
  },
];

function TrendPracticeEngine() {
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState([0, 0, 0]);
  const currentLevel = TREND_PRACTICE_LEVELS[level];
  const current = currentLevel.items[index];
  const scenario = SCENARIOS[current.scenario];
  const correct = selected === current.correct;

  function reset() { setSelected(null); setChecked(false); }
  function check() { if (selected !== null && !checked) { if (correct) setScores((old) => old.map((score, i) => i === level ? score + 1 : score)); setChecked(true); } }
  function next() { if (index < currentLevel.items.length - 1) { setIndex((old) => old + 1); reset(); } else { setLevel((old) => (old + 1) % TREND_PRACTICE_LEVELS.length); setIndex(0); reset(); } }

  return (
    <section aria-labelledby="task1-trends-practice" style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id="task1-trends-practice" style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise trends by level</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>Move from recognising a trend to combining it in an overview. The exercises use different charts and explain why an observation does or does not deserve space.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>{TREND_PRACTICE_LEVELS.map((item, i) => <button key={item.title} type="button" className="btn btn-sm" aria-pressed={level === i} onClick={() => { setLevel(i); setIndex(0); reset(); }} style={{ flex: '1 1 180px', textAlign: 'left', whiteSpace: 'normal', opacity: level === i ? 1 : 0.68 }}><strong>{i + 1}. {item.title.split('·')[1]}</strong><br /><span style={{ fontSize: '0.72rem' }}>{scores[i]}/{item.items.length}</span></button>)}</div>
      <div className="wl-card" style={{ padding: '1.15rem', borderTop: '4px solid #0f3d8c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}><div><p style={{ margin: 0, color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{currentLevel.title}</p><p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>Exercise {index + 1} of {currentLevel.items.length} · {scenario.title.split(' — ')[0]}</p></div><span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.76rem' }}>{Math.round(((index + 1) / currentLevel.items.length) * 100)}%</span></div>
        <div style={{ padding: '0.7rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}><MiniLineChart scenario={scenario} /></div>
        <p style={{ margin: '0.85rem 0 0', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.55 }}>{current.question}</p>
        <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.8rem' }}>{current.options.map((option, i) => <button key={option} type="button" onClick={() => !checked && setSelected(i)} aria-pressed={selected === i} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && i === current.correct ? '#059669' : checked && selected === i ? '#dc2626' : selected === i ? '#0f3d8c' : 'var(--line-soft)'}`, background: checked && i === current.correct ? 'rgba(5,150,105,0.08)' : selected === i ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + i)}. {option}</button>)}</div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}><button type="button" className="btn btn-sm" onClick={check} disabled={selected === null || checked}>{checked ? (correct ? 'Correct' : 'Review the explanation') : 'Check answer'}</button>{checked && <button type="button" className="btn btn-sm" onClick={next}>{index === currentLevel.items.length - 1 ? 'Next level →' : 'Next exercise →'}</button>}</div>
        {checked && <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${correct ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}><strong style={{ color: correct ? '#059669' : '#b45309' }}>{correct ? 'Good observation.' : 'Not quite yet.'}</strong><p style={{ margin: '0.25rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55 }}>{current.explanation}</p></div>}
      </div>
    </section>
  );
}
