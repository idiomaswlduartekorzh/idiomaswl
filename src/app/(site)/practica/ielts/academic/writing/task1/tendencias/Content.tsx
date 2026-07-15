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
    { title: 'Dirección global', insight: 'La mayoría de las líneas sube o baja.', explanation: 'Empieza por mirar si las series comparten una dirección. Ese patrón suele formar la primera oración del overview.' },
    { title: 'Cambio de liderazgo', insight: 'Una línea adelanta a otra.', explanation: 'Compara el inicio y el final. Un cruce que cambia el ranking es más relevante que una cifra intermedia.' },
    { title: 'Convergencia', insight: 'La distancia entre dos series se reduce.', explanation: 'No basta decir que ambas suben: observa si terminan más cerca o más lejos entre sí.' },
    { title: 'Anomalía', insight: 'Hay un pico, caída o recuperación inesperada.', explanation: 'Una ruptura del patrón puede ser el rasgo más importante, siempre que sea visible y no una causa inventada.' },
    { title: 'Estabilidad relativa', insight: 'Una serie cambia poco mientras otras se mueven.', explanation: 'Una línea estable puede funcionar como contraste frente a un crecimiento o caída acelerados.' },
  ] },
  { id: 'bar', label: 'Bar chart', Chart: IELTSBarChartVisual, examples: [
    { title: 'Extremo superior', insight: 'Una categoría domina claramente.', explanation: 'En barras estáticas, la barra más alta puede organizar el overview si la diferencia es significativa.' },
    { title: 'Extremo inferior', insight: 'Una categoría queda muy por debajo.', explanation: 'El contraste entre la mayor y la menor categoría suele ser más útil que enumerar todas.' },
    { title: 'Jerarquía', insight: 'Las categorías forman un orden claro.', explanation: 'Resume la estructura: liderazgo, grupo intermedio y cola, sin convertirlo en una lista de cifras.' },
    { title: 'Agrupación', insight: 'Varias barras tienen niveles parecidos.', explanation: 'Agrupar categorías similares ayuda al lector a ver el patrón sin describir cada barra por separado.' },
    { title: 'Orden por categoría', insight: 'Las barras se organizan de mayor a menor.', explanation: 'Cuando el gráfico muestra un solo año, describe jerarquía y extremos; no inventes una tendencia temporal.' },
  ] },
  { id: 'pie', label: 'Pie chart', Chart: IELTSPieChartVisual, examples: [
    { title: 'Sector mayor', insight: 'Una fuente o categoría ocupa la porción principal.', explanation: 'El sector dominante suele ser el primer rasgo que el lector necesita conocer.' },
    { title: 'Sector menor', insight: 'Una porción representa una parte mínima.', explanation: 'Menciona el extremo inferior solo si contrasta claramente con los sectores principales.' },
    { title: 'Mayoría combinada', insight: 'Dos sectores concentran la mayor parte.', explanation: 'Agrupa sectores cuando juntos explican la historia mejor que sus cifras individuales.' },
    { title: 'Distribución equilibrada', insight: 'Las porciones son relativamente similares.', explanation: 'Si no hay un líder claro, el overview puede señalar que la distribución es bastante uniforme.' },
    { title: 'Cambio de composición', insight: 'Dos pasteles muestran que el reparto cambia.', explanation: 'Compara la composición inicial y final: qué gana participación y qué pierde, sin confundirlo con una causa.' },
  ] },
  { id: 'table', label: 'Table', Chart: IELTSTableVisual, examples: [
    { title: 'Patrón por filas', insight: 'Una variable aumenta o disminuye de forma consistente.', explanation: 'Busca una regularidad que atraviese varias filas, como una caída con la edad.' },
    { title: 'Patrón por columnas', insight: 'Un país, grupo o año domina varias columnas.', explanation: 'Una categoría que lidera repetidamente puede ser una tendencia transversal.' },
    { title: 'Extremos', insight: 'Hay valores máximos y mínimos claros.', explanation: 'Usa los extremos para orientar el overview y reserva los números para los detalles.' },
    { title: 'Cambio compartido', insight: 'La mayoría de las celdas se mueve en la misma dirección.', explanation: 'El patrón común es más importante que una excepción aislada.' },
    { title: 'Excepción', insight: 'Una categoría rompe el patrón general.', explanation: 'Una excepción merece atención cuando cambia la interpretación de toda la tabla.' },
  ] },
  { id: 'process', label: 'Process diagram', Chart: IELTSProcessDiagramVisual, examples: [
    { title: 'Secuencia', insight: 'El proceso sigue etapas en un orden.', explanation: 'Resume el flujo general antes de describir los pasos individuales.' },
    { title: 'Inicio y final', insight: 'El material termina transformado en otro producto.', explanation: 'Nombrar origen y resultado da al lector la estructura completa del proceso.' },
    { title: 'Fases agrupables', insight: 'Varias etapas forman bloques naturales.', explanation: 'Agrupa preparación, tratamiento y resultado para evitar una lista mecánica.' },
    { title: 'Proceso cíclico', insight: 'El final conecta con el inicio.', explanation: 'Si hay ciclo, el overview debe decirlo explícitamente porque cambia la organización de la respuesta.' },
    { title: 'Sin tendencia numérica', insight: 'El visual muestra acciones, no cantidades.', explanation: 'No uses rise, fall o increase si el diagrama solo representa fases.' },
  ] },
  { id: 'map', label: 'Map', Chart: IELTSMapDiagramVisual, examples: [
    { title: 'Urbanización', insight: 'El espacio se vuelve más desarrollado.', explanation: 'Resume el cambio de carácter del lugar, no cada edificio por separado.' },
    { title: 'Uso del suelo', insight: 'Una función reemplaza a otra.', explanation: 'Fábricas, parques, viviendas y servicios pueden agruparse como cambios de uso.' },
    { title: 'Infraestructura', insight: 'Aparecen o mejoran caminos y accesos.', explanation: 'La red de circulación puede ser una transformación global relevante.' },
    { title: 'Pérdidas y adiciones', insight: 'Algunos elementos desaparecen y otros aparecen.', explanation: 'La comparación antes-después debe priorizar cambios, no inventar razones.' },
    { title: 'Densidad', insight: 'El área final contiene más instalaciones.', explanation: 'Una mayor densidad puede funcionar como overview si se sostiene en todo el mapa.' },
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
      { text: 'All three regions experienced significant growth in internet usage over the period.', relevant: true, explanation: 'Correcto. Esta es la tendencia global más importante — un patrón compartido por todas las series. Debe ir en el overview.' },
      { text: 'North America had the highest internet penetration rate at every data point.', relevant: true, explanation: 'Correcto. Destaca una característica constante y dominante a lo largo de todo el período. Merece mención.' },
      { text: 'Latin America\'s rate rose from 5% in 2000 to 35% in 2010.', relevant: false, explanation: 'Demasiado específico para el overview. Los números exactos van en los párrafos del cuerpo, no como "tendencia clave".' },
      { text: 'By 2020, the gap between regions had narrowed significantly compared to 2000.', relevant: true, explanation: 'Correcto. La convergencia es una tendencia analíticamente importante que demuestra pensamiento de nivel Band 7+.' },
      { text: 'Africa saw a slight dip in internet usage around 2007.', relevant: false, explanation: 'Ningún dato indica una caída en África — los datos solo muestran crecimiento. Nunca describas tendencias que no están en el gráfico.' },
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
      { text: 'STEM graduates increased steadily and consistently throughout the entire period.', relevant: true, explanation: 'Correcto. La tendencia dominante de una de las series — clara, progresiva y bien definida.' },
      { text: 'Arts & Humanities graduates showed a consistent decline over the same period.', relevant: true, explanation: 'Correcto. La tendencia opuesta de la otra serie. El contraste entre ambas es el rasgo más llamativo del gráfico.' },
      { text: 'STEM graduates rose by exactly 120,000 between 2000 and 2020.', relevant: false, explanation: 'El número exacto va en el cuerpo del ensayo, no en el overview. El overview captura tendencias, no cálculos precisos.' },
      { text: 'In 2000, Arts & Humanities graduates outnumbered STEM graduates.', relevant: true, explanation: 'Correcto. Esta comparación de punto de partida da contexto a la divergencia — en 2000 Arts lideraba, en 2020 STEM dominaba.' },
      { text: 'STEM and Arts figures crossed at some point between 2005 and 2010.', relevant: false, explanation: 'Vago e impreciso. Si el cruce es relevante, calcula el año exacto o deja la observación fuera del overview.' },
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
      { text: 'All three countries saw a dramatic fall in tourist arrivals in 2020.', relevant: true, explanation: 'Correcto. El cambio más llamativo del gráfico — una caída repentina y severa que afectó a todos simultáneamente. Siempre menciona el cambio más dramático.' },
      { text: 'Country A showed the steepest growth between 2010 and 2018, eventually overtaking Country B.', relevant: true, explanation: 'Correcto. Captura el crecimiento más pronunciado Y el cambio de liderazgo — un desarrollo comparativo significativo.' },
      { text: 'Country C\'s arrivals rose from 5 million in 2010 to 8 million in 2012.', relevant: false, explanation: 'Un dato de punto específico que pertenece al cuerpo del ensayo. Demasiado estrecho y detallado para el overview.' },
      { text: 'Country B consistently attracted more visitors than Country A before 2016.', relevant: true, explanation: 'Correcto. Esta observación comparativa contextualiza el cambio de posición — B lideraba inicialmente antes de que A lo superara.' },
      { text: 'Tourism figures fluctuated throughout the period for all three countries.', relevant: false, explanation: 'Incorrecto — de 2010 a 2018 los tres muestran crecimiento sostenido, no fluctuación. Describir una tendencia incorrectamente es peor que omitirla.' },
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
      { text: 'Solar experienced the fastest growth and finished close to the leading source.', relevant: true, explanation: 'Correcto. El ritmo de cambio y la posición final cuentan la historia más importante.' },
      { text: 'Hydro remained relatively stable compared with the other sources.', relevant: true, explanation: 'Correcto. Una serie estable puede ser una tendencia relevante si contrasta con las demás.' },
      { text: 'Solar generated exactly 25 TWh in 2010.', relevant: false, explanation: 'Es una cifra aislada. Puede apoyar el cuerpo, pero no es la mejor tendencia para el overview.' },
      { text: 'Wind grew steadily but remained below hydro throughout the period.', relevant: true, explanation: 'Correcto. Combina dirección y posición relativa sin enumerar datos.' },
      { text: 'Renewable energy became popular because governments changed their policies.', relevant: false, explanation: 'El gráfico no demuestra una causa. No añadas explicaciones externas.' },
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
      { text: 'Car use declined overall, while cycling increased considerably.', relevant: true, explanation: 'Correcto. Es el contraste de dirección que organiza la historia completa.' },
      { text: 'Cycling overtook car use in 2025.', relevant: false, explanation: 'No ocurrió: cycling terminó por encima de bus, pero todavía por debajo de car.' },
      { text: 'Bus use changed relatively little over the period.', relevant: true, explanation: 'Correcto. La estabilidad relativa es útil para contrastar las otras series.' },
      { text: 'Car use was 82,000 in 2010.', relevant: false, explanation: 'Es un dato puntual, no una tendencia global.' },
      { text: 'The gap between car and cycling narrowed substantially by the end.', relevant: true, explanation: 'Correcto. La convergencia final muestra un cambio comparativo relevante.' },
    ],
    targetCount: 3,
  },
];

const TREND_DECISION_RULES = [
  {
    label: 'Patrón global',
    question: '¿La mayoría sube, baja, se mantiene estable o cambia de dirección?',
    example: 'All three categories increased, although at different speeds.',
  },
  {
    label: 'Cambio de liderazgo',
    question: '¿Una línea o categoría supera a otra?',
    example: 'Country A overtook Country B in the second half of the period.',
  },
  {
    label: 'Extremos',
    question: '¿Quién termina más alto, más bajo o con el cambio más fuerte?',
    example: 'The most dramatic growth was recorded in Latin America.',
  },
  {
    label: 'Anomalía relevante',
    question: '¿Hay una caída repentina, pico o recuperación que cambia la historia?',
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
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.12rem' }}>Antes de practicar: cómo leer una tendencia</h2>
      <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
        No empieces seleccionando al azar. Primero identifica qué puede contar como tendencia según el visual: una dirección o cruce en una línea, una jerarquía en barras, una distribución en pasteles, un patrón en tablas, una secuencia en procesos o un cambio espacial en mapas.
      </p>
      <div role="tablist" aria-label="Tipos visuales para estudiar tendencias" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem' }}>
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Tendencias</span>
          </div>

          {/* Header */}
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📈 Sub-habilidad 3 — Tendencias</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Identificar tendencias relevantes</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', lineHeight: 1.65, maxWidth: 600 }}>
            En IELTS Task 1 no describes cada dato del gráfico — identificas las <strong style={{ color: 'var(--ink)' }}>2–3 tendencias más importantes</strong>. Practica decidir qué vale la pena mencionar y qué no.
          </p>

          <Task1OfficialReviewBlock
            focus="Distinguir tendencia global, punto extremo, contraste y cambio relevante."
            officialFormat="IELTS Academic Writing Task 1 puede presentar líneas, barras, tablas, mapas o procesos. Identificar tendencias es una habilidad de análisis, no una categoría oficial aislada."
            welearnStrategy="Usamos mini gráficos para practicar qué incluir y qué omitir antes de escribir el párrafo completo."
            answerCheck="La mejor selección prioriza patrones sostenidos y comparaciones significativas; los números exactos se reservan para el cuerpo."
          />

          <Task1ChartTypeGuide />

          <VisualTrendLab />

          {/* Strategy note */}
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.18)', marginBottom: '1.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>
            💡 <strong style={{ color: 'var(--ink)' }}>Regla Band 7+:</strong> menciona el patrón general, el dato más extremo y la comparación más llamativa. Evita números específicos en el overview y no inventes tendencias que no están en el gráfico.
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.08rem' }}>Qué cuenta como tendencia relevante</h2>
            <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              Una tendencia relevante no es cualquier dato que aparece en el gráfico. Es una observación que ayuda al lector
              a entender la historia completa: dirección, contraste, cambio de posición o evento atípico.
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
          <div role="tablist" aria-label="Gráficas de tendencias" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem', marginBottom: '1.15rem' }}>
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
            Selecciona las <span style={{ color: '#0f3d8c' }}>{sc.targetCount} observaciones más importantes</span> para incluir en tu respuesta:
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
                            {isCorrect ? '✓ Relevante' : '✗ No es prioritaria'}
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
              Ver análisis →
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Score */}
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: correctCount === totalRelevant ? 'rgba(5,150,105,0.08)' : 'rgba(15,61,140,0.06)', border: `1.5px solid ${correctCount === totalRelevant ? 'rgba(5,150,105,0.3)' : 'rgba(15,61,140,0.2)'}` }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: correctCount === totalRelevant ? '#059669' : '#0f3d8c' }}>
                  {correctCount === totalRelevant
                    ? '¡Perfecto! Identificaste todas las tendencias clave.'
                    : `Identificaste ${correctCount} de ${totalRelevant} tendencias clave. Revisa el análisis de las que te faltaron.`}
                </p>
              </div>
              <button className="btn btn-sm" onClick={nextScenario} style={{ alignSelf: 'flex-start' }}>
                {scenarioIdx < SCENARIOS.length - 1 ? 'Siguiente gráfica →' : 'Volver al inicio →'}
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
    title: 'Nivel 1 · Clasifica la observación',
    items: [
      { scenario: 0, question: '¿Cuál es una tendencia global?', options: ['Latin America rose from 5% to 15%.', 'All three regions grew over the period.', 'North America reached 90% in 2020.', 'The graph has five data points.'], correct: 1, explanation: 'Una tendencia global afecta a la mayoría de las series y ayuda a resumir la historia completa.' },
      { scenario: 3, question: '¿Qué contraste merece atención?', options: ['Solar grew much faster than hydro.', 'Solar reached 25 TWh in 2010.', 'The y-axis ends at 120.', 'There are three sources.'], correct: 0, explanation: 'El contraste de ritmo entre una serie acelerada y una estable es más útil que una cifra aislada.' },
      { scenario: 4, question: '¿Qué observación describe convergencia?', options: ['Bus stayed near its original level.', 'Car and cycling moved closer together by the end.', 'Cycling stood at 12,000 in 2010.', 'The city used three transport modes.'], correct: 1, explanation: 'Convergencia significa que la distancia entre dos series se reduce.' },
    ],
  },
  {
    title: 'Nivel 2 · Selecciona los rasgos principales',
    items: [
      { scenario: 1, question: 'Elige la mejor pareja para un overview.', options: ['STEM rose steadily and Arts & Humanities declined.', 'STEM was 80,000 in 2000 and Arts was 70,000 in 2020.', 'The lines crossed near 2008 for an unknown reason.', 'There were two subject groups.'], correct: 0, explanation: 'La pareja resume las dos direcciones opuestas, que son el patrón central del gráfico.' },
      { scenario: 2, question: '¿Qué combinación explica mejor el cambio de liderazgo?', options: ['Country C began at 5 million.', 'Country B led initially, but Country A grew faster and overtook it.', 'All three countries had six observations.', 'Country A ended at 5 million in 2020.'], correct: 1, explanation: 'Un cambio de liderazgo combina posición inicial, ritmo y posición posterior.' },
      { scenario: 4, question: '¿Qué rasgos conviene priorizar?', options: ['Car declined, cycling rose and bus was relatively stable.', 'Car was 80,000 in 2005 and bus was 48,000 in 2010.', 'Cycling is better for the environment.', 'The lines use three colours.'], correct: 0, explanation: 'La opción reúne dirección y estabilidad, sin añadir opinión ni cifras innecesarias.' },
    ],
  },
  {
    title: 'Nivel 3 · Redacta la idea Band 7+',
    items: [
      { scenario: 2, question: '¿Qué oración sintetiza mejor el gráfico?', options: ['Overall, tourist arrivals increased in all three countries.', 'Overall, arrivals rose until 2018, with Country A overtaking Country B, before all three fell sharply in 2020.', 'Overall, Country C rose from 5 to 8 million.', 'Overall, tourism grew because of better flights.'], correct: 1, explanation: 'Incluye la tendencia inicial, el cambio de liderazgo y la anomalía final sin inventar causas.' },
      { scenario: 3, question: '¿Qué overview evita tanto la lista como la interpretación?', options: ['Overall, solar rose from 4 to 100 TWh.', 'Overall, hydro was stable, while solar and wind grew, with solar recording the fastest expansion.', 'Overall, renewable energy policy was successful.', 'Overall, wind was 28 TWh in 2005.'], correct: 1, explanation: 'Resume estabilidad, crecimiento y ritmo relativo: tres rasgos comparables y visibles.' },
      { scenario: 0, question: '¿Cuál es la versión más completa y prudente?', options: ['Overall, all regions grew, North America remained highest and the gap narrowed.', 'Overall, internet access increased because technology improved.', 'Overall, Latin America rose by 65 percentage points.', 'Overall, Africa was the weakest region.'], correct: 0, explanation: 'Combina patrón global, liderazgo y convergencia, sin causalidad ni lenguaje evaluativo.' },
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
      <p className="eyebrow"><span className="ink-line" />Motor progresivo WeLearn</p>
      <h2 id="task1-trends-practice" style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practica tendencias por niveles</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>Pasa de reconocer una tendencia a combinarla en un overview. Los ejercicios usan gráficos distintos y explican por qué una observación sí o no merece espacio.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>{TREND_PRACTICE_LEVELS.map((item, i) => <button key={item.title} type="button" className="btn btn-sm" aria-pressed={level === i} onClick={() => { setLevel(i); setIndex(0); reset(); }} style={{ flex: '1 1 180px', textAlign: 'left', whiteSpace: 'normal', opacity: level === i ? 1 : 0.68 }}><strong>{i + 1}. {item.title.split('·')[1]}</strong><br /><span style={{ fontSize: '0.72rem' }}>{scores[i]}/{item.items.length}</span></button>)}</div>
      <div className="wl-card" style={{ padding: '1.15rem', borderTop: '4px solid #0f3d8c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}><div><p style={{ margin: 0, color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{currentLevel.title}</p><p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>Ejercicio {index + 1} de {currentLevel.items.length} · {scenario.title.split(' — ')[0]}</p></div><span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.76rem' }}>{Math.round(((index + 1) / currentLevel.items.length) * 100)}%</span></div>
        <div style={{ padding: '0.7rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}><MiniLineChart scenario={scenario} /></div>
        <p style={{ margin: '0.85rem 0 0', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.55 }}>{current.question}</p>
        <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.8rem' }}>{current.options.map((option, i) => <button key={option} type="button" onClick={() => !checked && setSelected(i)} aria-pressed={selected === i} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && i === current.correct ? '#059669' : checked && selected === i ? '#dc2626' : selected === i ? '#0f3d8c' : 'var(--line-soft)'}`, background: checked && i === current.correct ? 'rgba(5,150,105,0.08)' : selected === i ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>{String.fromCharCode(65 + i)}. {option}</button>)}</div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}><button type="button" className="btn btn-sm" onClick={check} disabled={selected === null || checked}>{checked ? (correct ? 'Correcto' : 'Revisa la explicación') : 'Comprobar respuesta'}</button>{checked && <button type="button" className="btn btn-sm" onClick={next}>{index === currentLevel.items.length - 1 ? 'Siguiente nivel →' : 'Siguiente ejercicio →'}</button>}</div>
        {checked && <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${correct ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}><strong style={{ color: correct ? '#059669' : '#b45309' }}>{correct ? 'Bien visto.' : 'Todavía no.'}</strong><p style={{ margin: '0.25rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55 }}>{current.explanation}</p></div>}
      </div>
    </section>
  );
}
