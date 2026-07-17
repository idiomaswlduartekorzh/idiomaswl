'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSMapDiagramVisual,
  IELTSPieChartVisual,
  IELTSProcessDiagramVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

const PROMPT = 'The graph below shows the percentage of households in the UK with access to broadband internet between 2003 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.';

const MODEL_ANSWER = `The line graph illustrates the proportion of UK households with broadband internet access over a twenty-year period from 2003 to 2023.

Overall, there was a dramatic and sustained increase in broadband penetration throughout the period, rising from a very low base to near-universal coverage by 2023.

In 2003, only 4% of households had broadband access. This figure rose steeply over the following decade, reaching approximately 75% by 2013. The most rapid growth occurred between 2003 and 2008, when adoption increased by roughly 40 percentage points.

The rate of growth slowed somewhat in the second decade of the period. Nevertheless, broadband access continued to climb, reaching 93% in 2020 before peaking at 96% in 2023. This suggests that nearly all UK households with the capacity for internet access had adopted broadband by the end of the period.`;

const RUBRIC: { criterion: string; desc: string; bands: { band: string; descriptor: string }[] }[] = [
  {
    criterion: 'Task Achievement',
    desc: '¿Respondiste todo lo que pide la tarea? ¿Cubriste las tendencias principales?',
    bands: [
      { band: '7–9', descriptor: 'Covers all requirements; clearly presents and highlights key features; makes relevant comparisons; data is accurately represented.' },
      { band: '5–6', descriptor: 'Addresses the task; presents main features but may be mechanical or miss some key comparisons.' },
      { band: '3–4', descriptor: 'Attempts task but key features missing; data may be inaccurate or overview absent.' },
    ],
  },
  {
    criterion: 'Coherence & Cohesion',
    desc: '¿Fluye lógicamente tu texto? ¿Usas conectores correctamente?',
    bands: [
      { band: '7–9', descriptor: 'Logical sequencing; cohesive devices used flexibly; clear progression throughout.' },
      { band: '5–6', descriptor: 'Information is generally arranged coherently; some cohesive devices used but may be repetitive.' },
      { band: '3–4', descriptor: 'Some basic cohesion but ideas may be unclear or poorly linked.' },
    ],
  },
  {
    criterion: 'Lexical Resource',
    desc: '¿Variaste el vocabulario? ¿Usaste lenguaje de tendencias y comparación?',
    bands: [
      { band: '7–9', descriptor: 'Wide range; uses paraphrase effectively; rare errors in word choice; appropriate approximation language.' },
      { band: '5–6', descriptor: 'Adequate range; some attempts at less common vocabulary; noticeable errors but meaning is clear.' },
      { band: '3–4', descriptor: 'Limited range; repetition; errors may impede communication.' },
    ],
  },
  {
    criterion: 'Grammatical Range & Accuracy',
    desc: '¿Variaste las estructuras gramaticales? ¿Cuántos errores cometiste?',
    bands: [
      { band: '7–9', descriptor: 'Wide range of structures; majority of sentences error-free; minor errors only.' },
      { band: '5–6', descriptor: 'Mix of simple and complex sentences; some errors but rarely cause misunderstanding.' },
      { band: '3–4', descriptor: 'Mainly simple sentences; frequent errors; may obscure meaning.' },
    ],
  },
];

const LEGO_STEPS = [
  { part: '1. Introducción', action: 'Parafrasea el enunciado sin añadir datos.', check: '¿Cambié verbo, tema y estructura?' },
  { part: '2. Overview', action: 'Resume el patrón dominante sin cifras.', check: '¿Se entiende la historia del gráfico en 1-2 frases?' },
  { part: '3. Body 1', action: 'Agrupa los datos principales del primer patrón.', check: '¿Incluí cifras exactas solo donde aportan evidencia?' },
  { part: '4. Body 2', action: 'Añade contraste, cierre o segundo grupo.', check: '¿Comparé donde era relevante?' },
  { part: '5. Revisión', action: 'Comprueba precisión, palabras y gramática.', check: '¿Hay 150+ palabras y ningún dato inventado?' },
];

const FULL_TASK_BANK = [
  ['line', 'Urban cycling rates in three cities from 2000 to 2025', 'Overall, cycling increased in all three cities, with the sharpest growth in the city that began from the lowest base.'],
  ['line', 'Electric car ownership in Japan, Germany and Canada between 2010 and 2024', 'Overall, ownership rose substantially in all countries, although Germany finished with the highest figure.'],
  ['line', 'Average screen time among teenagers and adults from 2012 to 2024', 'Overall, both groups spent more time on screens, but teenagers remained consistently higher.'],
  ['line', 'Museum visitor numbers in two European capitals from 2005 to 2020', 'Overall, visitors rose before a sharp fall at the end of the period.'],
  ['line', 'Water consumption in agriculture, industry and homes between 1990 and 2020', 'Overall, agriculture used the most water throughout, while domestic use remained comparatively low.'],
  ['bar', 'Monthly household spending on five categories in 2023', 'Overall, housing and food accounted for the largest spending, while entertainment was the smallest category.'],
  ['bar', 'Preferred transport methods among commuters in six cities', 'Overall, public transport was dominant in most cities, whereas cycling remained the least common option.'],
  ['bar', 'Employment rates for men and women in four sectors', 'Overall, male employment was higher in technical sectors, while female employment led in education and health.'],
  ['bar', 'Average weekly study hours by university subject', 'Overall, medicine and engineering students studied the longest, while arts students recorded fewer hours.'],
  ['bar', 'Coffee consumption in five countries in 2024', 'Overall, the Nordic countries consumed the most coffee, with the lowest figure recorded in the final country.'],
  ['pie', 'Energy sources used by a country in 2000 and 2025', 'Overall, fossil fuels declined as renewables became a much larger part of the energy mix.'],
  ['pie', 'Reasons students chose online courses in 2024', 'Overall, flexibility was the leading reason, while cost and tutor access made up smaller shares.'],
  ['pie', 'Household waste composition before and after a recycling campaign', 'Overall, recyclable waste increased as general landfill waste decreased.'],
  ['pie', 'University budget allocation across six departments', 'Overall, teaching and research received the largest shares, while administration accounted for less.'],
  ['pie', 'Tourist spending categories in a coastal town', 'Overall, accommodation took the greatest share, whereas local transport represented the smallest proportion.'],
  ['table', 'Internet use by age group in four countries', 'Overall, younger adults had the highest usage in every country, while the oldest group lagged behind.'],
  ['table', 'Average salaries in five professions across three regions', 'Overall, technology roles paid the most, with regional differences visible across all jobs.'],
  ['table', 'Participation in sports by gender and age group', 'Overall, participation was highest among younger groups and declined with age.'],
  ['table', 'Public satisfaction with transport, health and education services', 'Overall, education received the strongest ratings, while transport was the weakest area.'],
  ['table', 'Exports of four products from three countries', 'Overall, electronics dominated exports in two countries, while food products led in the third.'],
  ['process', 'How glass bottles are recycled into new containers', 'Overall, the process is linear and involves collection, cleaning, melting and remoulding.'],
  ['process', 'The production of olive oil from harvested olives', 'Overall, olive oil production follows a sequence from harvesting and crushing to separation and bottling.'],
  ['process', 'How rainwater is collected and purified for household use', 'Overall, the system moves water through collection, filtration, storage and distribution.'],
  ['process', 'The life cycle of a butterfly', 'Overall, this is a cyclical natural process with four main stages from egg to adult butterfly.'],
  ['process', 'How bricks are manufactured for construction', 'Overall, brick production is a linear process involving clay preparation, shaping, drying, firing and delivery.'],
  ['map', 'A town centre in 1990 and 2025', 'Overall, the town became more commercial and residential, with open spaces replaced by buildings.'],
  ['map', 'A university campus before and after expansion', 'Overall, the campus expanded considerably, adding academic facilities and student accommodation.'],
  ['map', 'A coastal village before and after tourism development', 'Overall, the village shifted from a local settlement to a tourist-oriented area.'],
  ['map', 'An island before and after construction of visitor facilities', 'Overall, the island was developed with accommodation and transport links while some natural areas remained.'],
  ['map', 'A park in 2000 and after redevelopment', 'Overall, the park became more recreational, with new sports and family facilities.'],
  ['mixed', 'A line graph of gym membership and a pie chart of reasons for joining', 'Overall, membership increased steadily, and health was the main reason for joining.'],
  ['mixed', 'A bar chart of household income and a table of savings rates', 'Overall, higher-income households saved more, although spending patterns varied by category.'],
  ['mixed', 'A pie chart of energy sources and a line graph of emissions', 'Overall, renewable energy grew while emissions declined gradually.'],
  ['mixed', 'A table of student numbers and a bar chart of course completion', 'Overall, enrolment increased, but completion rates differed sharply by course.'],
  ['mixed', 'A map of a shopping area and a bar chart of visitor numbers', 'Overall, redevelopment coincided with higher visitor numbers.'],
  ['line', 'Average rainfall in two regions across twelve months', 'Overall, rainfall followed opposite seasonal patterns in the two regions.'],
  ['bar', 'Mobile phone ownership by income group', 'Overall, ownership rose with income, with the largest gap between the lowest and highest groups.'],
  ['table', 'Library borrowing by genre and age group', 'Overall, fiction was most popular among younger users, while history appealed more to older readers.'],
  ['process', 'How compost is produced from household food waste', 'Overall, compost production is a staged process from waste collection to decomposition and packaging.'],
  ['map', 'A railway station before and after modernization', 'Overall, the station became larger and more accessible, with additional platforms and retail space.'],
  ['line', 'Prices of three food products from 2010 to 2022', 'Overall, all prices increased, though one product rose much more sharply than the others.'],
  ['bar', 'Percentage of people working from home in six industries', 'Overall, remote work was most common in digital industries and least common in manual sectors.'],
  ['pie', 'Sources of municipal funding in two years', 'Overall, local taxes became less dominant as grants and service fees increased.'],
  ['table', 'Average commute times by transport method and city size', 'Overall, car and bus commutes were longer in larger cities, while cycling times were more stable.'],
  ['process', 'The stages involved in publishing a digital magazine', 'Overall, the process moves from content planning and editing to design, publication and promotion.'],
  ['map', 'A residential neighbourhood before and after a new metro line', 'Overall, transport access improved and commercial facilities expanded near the station.'],
  ['mixed', 'A line graph of online sales and a bar chart of product categories', 'Overall, online sales rose markedly, led mainly by electronics and clothing.'],
  ['line', 'Population growth in three age groups from 1980 to 2040', 'Overall, the elderly population increased fastest, while the youngest group declined.'],
  ['bar', 'Recycling rates for paper, plastic, glass and metal', 'Overall, paper and metal had the highest recycling rates, whereas plastic remained comparatively low.'],
  ['pie', 'Time allocation in a typical student week', 'Overall, study and sleep accounted for most of the week, while leisure took a smaller share.'],
].map(([type, prompt, overview], index) => ({
  id: `task1-bank-${index + 1}`,
  type,
  prompt: `The ${type === 'map' ? 'maps' : type === 'process' ? 'diagram' : type === 'mixed' ? 'charts' : type === 'pie' ? 'pie charts' : type === 'table' ? 'table' : type === 'bar' ? 'bar chart' : 'line graph'} below show(s) ${prompt}. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
  overview,
}));

type Phase = 'intro' | 'writing' | 'scoring' | 'done';

function TaskVisual({ type, variant }: { type: string; variant: number }) {
  if (type === 'bar') return <IELTSBarChartVisual variant={variant} />;
  if (type === 'pie') return <IELTSPieChartVisual variant={variant} />;
  if (type === 'table') return <IELTSTableVisual variant={variant} />;
  if (type === 'process') return <IELTSProcessDiagramVisual variant={variant} />;
  if (type === 'map') return <IELTSMapDiagramVisual variant={variant} />;
  if (type === 'mixed') return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}><IELTSLineGraphVisual variant={variant} /><IELTSPieChartVisual variant={variant} /></div>;
  return <IELTSLineGraphVisual variant={variant} />;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function TareaCompletaPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const [bankIdx, setBankIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bankItem = FULL_TASK_BANK[bankIdx];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setPhase('scoring');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timeLeft]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const allScored = RUBRIC.every(r => scores[r.criterion]);
  const avgBand = allScored
    ? (Object.values(scores).reduce((s, v) => s + (v === '7–9' ? 8 : v === '5–6' ? 5.5 : 3.5), 0) / 4).toFixed(1)
    : null;

  function startTimer() {
    setTimerActive(true);
    setPhase('writing');
  }

  function submitEarly() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setPhase('scoring');
  }

  const timerColor = timeLeft < 120 ? '#dc2626' : timeLeft < 300 ? '#d97706' : '#059669';

  if (phase === 'intro') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
              <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Tarea Completa</span>
            </div>

            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />⏱️ Sub-habilidad 7 — Tarea Completa</p>
            <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Práctica en condiciones reales</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
              20 minutos. 150+ palabras. Cuatro párrafos: Introducción → Overview → Body 1 → Body 2.
              Al terminar, usas la rúbrica pedagógica WeLearn para auto-evaluarte.
            </p>

            <Task1OfficialReviewBlock
              focus="Integrar introducción, overview, cuerpo con datos y revisión final bajo tiempo."
              officialFormat="IELTS Academic Writing Task 1 dura 20 minutos dentro del bloque de Writing y requiere al menos 150 palabras sobre información visual."
              welearnStrategy="Esta práctica simula el flujo completo, pero la autoevaluación es pedagógica y no reemplaza una banda oficial."
              answerCheck="La respuesta completa debe tener overview visible, datos seleccionados, comparaciones relevantes y control de tiempo."
            />

            <Task1ChartTypeGuide />

            <div style={{ padding: '1.1rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.25rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Visual evidence for this task</p>
              <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                Study the visual before writing. Your overview and detail paragraphs must describe the patterns shown here, without inventing causes or unsupported figures.
              </p>
              <div style={{ padding: '0.75rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)' }}>
                <TaskVisual type="line" variant={0} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.08rem' }}>Ensamble tipo Lego: une las subhabilidades</h2>
              <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
                Antes del cronómetro, practica el orden mental. Cada bloque existe por separado en las rutas anteriores;
                aquí los unes para producir una respuesta completa.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' }}>
                {LEGO_STEPS.map((step) => (
                  <article key={step.part} style={{ padding: '0.9rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
                    <h3 style={{ margin: '0 0 0.3rem', fontSize: '0.9rem' }}>{step.part}</h3>
                    <p style={{ margin: '0 0 0.35rem', color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{step.action}</p>
                    <p style={{ margin: 0, color: '#0f3d8c', lineHeight: 1.45, fontSize: '0.76rem', fontWeight: 700 }}>{step.check}</p>
                  </article>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Introducción', tip: 'Parafrasea el enunciado' },
                { label: 'Overview', tip: 'Tendencia principal, sin cifras' },
                { label: 'Body 1', tip: 'Detalle con datos y tendencias' },
                { label: 'Body 2', tip: 'Comparaciones o segundo grupo' },
              ].map((p, i) => (
                <div key={i} style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{p.label}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{p.tip}</p>
                </div>
              ))}
            </div>

            {/* The prompt */}
            <div className="wl-card" style={{ padding: '1.5rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem' }}>Task prompt</p>
              <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--ink)' }}>{PROMPT}</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.05rem' }}>Banco de 50 prompts para práctica completa</h2>
              <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                Este banco cierra el flujo de subhabilidades: elige un prompt, escribe una introducción, decide el overview
                y luego redacta bajo tiempo. La siguiente fase puede convertir cada prompt en gráfico dibujado.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <select
                  value={bankIdx}
                  onChange={(event) => setBankIdx(Number(event.target.value))}
                  style={{ flex: 1, padding: '0.6rem 0.75rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)' }}
                >
                  {FULL_TASK_BANK.map((item, index) => (
                    <option key={item.id} value={index}>
                      {index + 1}. {item.type.toUpperCase()} — {item.prompt.slice(0, 72)}...
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: '#0f3d8c', fontWeight: 800 }}>{bankIdx + 1}/50</span>
              </div>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.35rem', color: '#0f3d8c', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>{bankItem.type.toUpperCase()}</p>
                <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.9rem' }}>{bankItem.prompt}</p>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', marginBottom: '0.75rem' }}>
                <TaskVisual type={bankItem.type} variant={bankIdx} />
              </div>
              <div style={{ padding: '0.85rem 1rem', borderRadius: 8, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <p style={{ margin: '0 0 0.25rem', color: '#059669', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>Overview modelo</p>
                <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.86rem' }}>{bankItem.overview}</p>
              </div>
            </div>

            {/* Imaginary chart description */}
            <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '1.75rem', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: '#d97706' }}>Datos del gráfico:</strong> Línea ascendente.
              2003: 4% · 2005: 18% · 2008: 45% · 2010: 58% · 2013: 75% · 2016: 84% · 2020: 93% · 2023: 96%.
              El crecimiento fue más rápido entre 2003–2008. Se estabilizó a partir de 2016.
            </div>

            <button className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }} onClick={startTimer}>
              Empezar — 20 minutos ⏱️
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'writing') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Timer bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: 'var(--bg-2)', border: '1.5px solid var(--line-soft)', position: 'sticky', top: 8, zIndex: 10 }}>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.25rem', color: timerColor }}>
                ⏱️ {formatTime(timeLeft)}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: wordCount >= 150 ? '#059669' : '#d97706', fontWeight: 700 }}>
                  {wordCount} / 150+ palabras
                </span>
                <button className="btn btn-sm" onClick={submitEarly}>Entregar →</button>
              </div>
            </div>

            {/* Prompt reminder */}
            <div className="wl-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #0f3d8c', marginBottom: '0.75rem', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              {PROMPT}
            </div>

            {/* Data reminder */}
            <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
              Datos: 2003: 4% · 2005: 18% · 2008: 45% · 2010: 58% · 2013: 75% · 2016: 84% · 2020: 93% · 2023: 96%
            </div>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={'Empieza con tu introducción (paráfrasis del enunciado)...\n\nLuego el Overview.\n\nLuego los párrafos de detalle.'}
              rows={20}
              style={{ width: '100%', padding: '1rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.97rem', fontFamily: 'inherit', lineHeight: 1.75, resize: 'vertical', boxSizing: 'border-box' }}
              autoFocus
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
                {wordCount} palabras {wordCount < 150 ? `— faltan ${150 - wordCount}` : '— ✓ mínimo alcanzado'}
              </span>
              <button className="btn btn-sm" onClick={submitEarly}>Entregar ahora →</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'scoring') {
    return (
      <section className="wl-section">
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Auto-evaluación</p>
            <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Evalúa tu respuesta</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Lee cada criterio y elige el band que mejor describe tu texto. Sé honesto — es tu herramienta de mejora.
            </p>

            {/* Their text */}
            <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', maxHeight: 200, overflowY: 'auto' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Tu respuesta ({wordCount} palabras)</p>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{text || '(sin texto)'}</p>
            </div>

            {/* Rubric */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {RUBRIC.map(r => (
                <div key={r.criterion} className="wl-card" style={{ padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{r.criterion}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{r.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {r.bands.map(b => {
                      const selected = scores[r.criterion] === b.band;
                      return (
                        <button key={b.band} onClick={() => setScores(s => ({ ...s, [r.criterion]: b.band }))}
                          style={{ textAlign: 'left', padding: '0.65rem 0.85rem', borderRadius: 9, border: selected ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)', background: selected ? 'rgba(15,61,140,0.08)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: selected ? '#0f3d8c' : 'var(--muted)', fontSize: '0.8rem' }}>Band {b.band}</span>
                          <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{b.descriptor}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {allScored && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #0f3d8c', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.4rem' }}>Band estimado</p>
                <p style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--ink)', margin: '0 0 0.25rem', lineHeight: 1 }}>{avgBand}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 1rem' }}>
                  {Number(avgBand) >= 7 ? 'Excelente — nivel competitivo para universidades de élite.' : Number(avgBand) >= 5.5 ? 'Buen nivel. Enfócate en el criterio más bajo.' : 'Sigue practicando. Revisa las sub-habilidades 1–6.'}
                </p>
                <button className="btn btn-sm" onClick={() => setShowModel(v => !v)}>
                  {showModel ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo Band 7 →'}
                </button>
              </div>
            )}

            {showModel && (
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Respuesta modelo (Band 7+)</p>
                <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{MODEL_ANSWER}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setPhase('intro'); setText(''); setScores({}); setTimeLeft(20*60); setShowModel(false); }}>
                Intentar de nuevo
              </button>
              <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm">← Volver a Task 1</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
