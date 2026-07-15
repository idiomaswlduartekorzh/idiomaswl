'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type Series = {
  label: string;
  color: string;
  values: number[];
};

type OverviewOption = {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
};

type DetailOption = {
  id: string;
  text: string;
  useful: boolean;
  explanation: string;
};

const YEARS = [2010, 2012, 2014, 2016, 2018, 2020];

const SERIES: Series[] = [
  { label: 'Metro', color: '#0f3d8c', values: [25, 32, 40, 49, 58, 68] },
  { label: 'Bus', color: '#b45309', values: [42, 45, 48, 46, 40, 35] },
  { label: 'Tranvía', color: '#047857', values: [10, 12, 13, 16, 18, 20] },
];

const OVERVIEWS: OverviewOption[] = [
  {
    id: 'strong',
    text: 'Overall, metro use rose steadily and became the most popular mode, while bus travel declined after a mid-period peak and tram use increased only modestly.',
    correct: true,
    explanation:
      'Correcto. Resume la tendencia principal de cada línea y menciona el cambio de liderazgo sin llenar el overview de cifras.',
  },
  {
    id: 'numbers',
    text: 'Overall, metro journeys were 25 million in 2010, 32 million in 2012, 40 million in 2014, 49 million in 2016, 58 million in 2018 and 68 million in 2020.',
    correct: false,
    explanation:
      'No es un buen overview. Enumera datos exactos, pero no interpreta el patrón general del gráfico.',
  },
  {
    id: 'wrong',
    text: 'Overall, all three forms of transport fluctuated sharply, with buses remaining the most widely used option throughout the whole period.',
    correct: false,
    explanation:
      'Incorrecto. Metro no fluctúa, tranvía no fluctúa de forma marcada y el bus no sigue siendo líder al final.',
  },
];

const DETAILS: DetailOption[] = [
  {
    id: 'metro-end',
    text: 'Metro trips climbed from 25 million to 68 million, overtaking buses between 2014 and 2016.',
    useful: true,
    explanation:
      'Útil. Combina punto inicial/final y cambio comparativo, dos datos de alto valor para el cuerpo del ensayo.',
  },
  {
    id: 'bus-peak',
    text: 'Bus travel reached a high of 48 million in 2014 before falling to 35 million by 2020.',
    useful: true,
    explanation:
      'Útil. Explica el pico y la caída, que es el patrón distintivo de la línea de buses.',
  },
  {
    id: 'tram-small',
    text: 'Tram journeys rose gradually from 10 million to 20 million and remained the least used mode throughout.',
    useful: true,
    explanation:
      'Útil. Es una comparación constante y compacta; funciona bien como segunda parte del cuerpo.',
  },
  {
    id: 'minor-step',
    text: 'The bus figure was 45 million in 2012.',
    useful: false,
    explanation:
      'Débil. Es una cifra aislada; no explica tendencia, contraste ni cambio importante.',
  },
  {
    id: 'fake-cause',
    text: 'The rise in metro journeys was caused by cheaper ticket prices.',
    useful: false,
    explanation:
      'No sirve en IELTS Task 1. El gráfico no da causas, así que inventarlas baja la precisión.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'The line graph compares the number of monthly journeys made by metro, bus and tram in Metroville between 2010 and 2020, measured in millions.',
    note: 'Parafrasea la pregunta y conserva unidad, lugar, categorías y periodo.',
  },
  {
    label: 'Overview',
    text: 'Overall, metro use rose continuously and became the dominant form of public transport, whereas bus journeys declined after peaking in the middle of the period. Tram travel also increased, but it remained the least used option throughout.',
    note: 'Resume los patrones grandes sin cifras exactas: subida, caída, liderazgo y posición relativa.',
  },
  {
    label: 'Cuerpo 1',
    text: 'In 2010, buses were the most common mode, at 42 million trips, compared with 25 million by metro. Metro journeys then increased at every point shown, reaching 49 million in 2016 and overtaking buses, before ending the period at 68 million.',
    note: 'Agrupa las dos líneas más importantes porque ahí está el cambio de liderazgo.',
  },
  {
    label: 'Cuerpo 2',
    text: 'By contrast, bus use rose slightly to a peak of 48 million in 2014, then fell steadily to 35 million in 2020. Tram figures were much lower, although they doubled gradually from 10 million to 20 million over the same period.',
    note: 'Cierra con el pico del bus y la línea menor, usando solo números que apoyan el patrón.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task1', label: 'Task 1 hub' },
  { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview' },
  { href: '/practica/ielts/academic/writing/task1/tendencias', label: 'Tendencias' },
  { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Comparaciones' },
  { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Vocabulario' },
  { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Tarea completa' },
];

function LineGraph() {
  const width = 620;
  const height = 260;
  const pad = { top: 22, right: 26, bottom: 42, left: 46 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const max = 80;
  const x = (index: number) => pad.left + (index / (YEARS.length - 1)) * chartWidth;
  const y = (value: number) => pad.top + chartHeight - (value / max) * chartHeight;
  const ticks = [0, 20, 40, 60, 80];

  return (
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0 1.25rem' }}>
      <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Original practice graph
      </p>
      <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
        Average monthly public transport journeys in Metroville, 2010-2020
      </h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', fontSize: '0.86rem' }}>
        Figures are shown in millions of journeys.
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Line graph showing metro, bus and tram journeys in Metroville from 2010 to 2020" style={{ width: '100%', display: 'block' }}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.left} y1={y(tick)} x2={width - pad.right} y2={y(tick)} stroke="var(--line-soft)" />
            <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">
              {tick}
            </text>
          </g>
        ))}
        {YEARS.map((year, index) => (
          <text key={year} x={x(index)} y={height - 12} textAnchor="middle" fontSize="11" fill="var(--muted)">
            {year}
          </text>
        ))}
        {SERIES.map((series) => {
          const points = series.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
          return (
            <g key={series.label}>
              <polyline points={points} fill="none" stroke={series.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {series.values.map((value, index) => (
                <circle key={`${series.label}-${YEARS[index]}`} cx={x(index)} cy={y(value)} r="4" fill={series.color} />
              ))}
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
        {SERIES.map((series) => (
          <span key={series.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
            <span style={{ width: 22, height: 3, borderRadius: 3, background: series.color }} />
            {series.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function OptionCard({
  selected,
  revealed,
  positive,
  text,
  explanation,
  onClick,
}: {
  selected: boolean;
  revealed: boolean;
  positive: boolean;
  text: string;
  explanation: string;
  onClick: () => void;
}) {
  let border = selected ? '2px solid #0f3d8c' : '1px solid var(--line-soft)';
  let background = selected ? 'rgba(15,61,140,0.06)' : 'var(--bg-2)';

  if (revealed && selected && positive) {
    border = '2px solid rgba(4,120,87,0.55)';
    background = 'rgba(4,120,87,0.08)';
  } else if (revealed && selected && !positive) {
    border = '2px solid rgba(185,28,28,0.45)';
    background = 'rgba(185,28,28,0.06)';
  } else if (revealed && !selected && positive) {
    border = '1.5px solid rgba(180,83,9,0.45)';
    background = 'rgba(180,83,9,0.06)';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={revealed}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '0.9rem 1rem',
        borderRadius: 8,
        border,
        background,
        color: 'var(--ink)',
        cursor: revealed ? 'default' : 'pointer',
      }}
    >
      <span style={{ display: 'block', fontSize: '0.9rem', lineHeight: 1.55 }}>{text}</span>
      {revealed && (
        <span style={{ display: 'block', marginTop: '0.55rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
          <strong style={{ color: positive ? '#047857' : '#991b1b' }}>{positive ? 'Respuesta fuerte: ' : 'Cuidado: '}</strong>
          {explanation}
        </span>
      )}
    </button>
  );
}

export default function GraficosLinealesContent({ faqs }: { faqs: Faq[] }) {
  const [overviewId, setOverviewId] = useState<string | null>(null);
  const [overviewRevealed, setOverviewRevealed] = useState(false);
  const [detailIds, setDetailIds] = useState<Set<string>>(new Set());
  const [detailsRevealed, setDetailsRevealed] = useState(false);

  const detailScore = useMemo(
    () => [...detailIds].filter((id) => DETAILS.find((detail) => detail.id === id)?.useful).length,
    [detailIds],
  );

  function toggleDetail(id: string) {
    if (detailsRevealed) return;
    setDetailIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              Task 1
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Line graphs</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 1
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Gráficos lineales en IELTS Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a convertir un line graph en una respuesta clara: elegir el overview, agrupar datos, describir cambios de liderazgo y usar cifras sin perder el control del texto.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para las decisiones de overview y detalle, más un modelo comentado de Task 1.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Writing Task 1 pide describir información visual, por ejemplo gráficos, tablas, mapas, diagramas o procesos, en una respuesta de al menos 150 palabras.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> tratamos los gráficos lineales como una ruta de práctica porque exigen detectar tendencia general, cambios de ritmo, cruces entre líneas, máximos/mínimos y comparaciones de inicio-final.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para un line graph
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Leer unidad y periodo', 'No empieces a escribir hasta saber qué mide el eje Y y qué años aparecen.'],
                ['2', 'Elegir 2-3 patrones', 'Busca subida, caída, cruce, pico, mínimo, convergencia o divergencia.'],
                ['3', 'Agrupar líneas', 'No escribas año por año. Agrupa por comportamiento similar o por contraste.'],
                ['4', 'Usar números con función', 'Cada cifra debe probar una tendencia, no decorar el párrafo.'],
              ].map(([step, title, copy]) => (
                <article key={step} className="wl-card" style={{ padding: '0.95rem', borderRadius: 8 }}>
                  <span style={{ display: 'inline-flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'rgba(15,61,140,0.09)', color: '#0f3d8c', fontWeight: 800, fontFamily: 'var(--mono)', marginBottom: '0.55rem' }}>
                    {step}
                  </span>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem' }}>{title}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="practice-heading">
            <h2 id="practice-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '1.5rem 0 0.45rem' }}>
              Ejercicio guiado: detecta el overview y los detalles
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              The line graph below shows average monthly journeys made by three forms of public transport in Metroville between 2010 and 2020.
            </p>

            <LineGraph />

            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.05rem' }}>Paso 1: escoge el mejor overview</h3>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {OVERVIEWS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={overviewId === option.id}
                  revealed={overviewRevealed}
                  positive={option.correct}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => setOverviewId(option.id)}
                />
              ))}
            </div>
            {!overviewRevealed && (
              <button className="btn btn-sm" type="button" disabled={!overviewId} onClick={() => setOverviewRevealed(true)} style={{ opacity: overviewId ? 1 : 0.5, marginBottom: '1.25rem' }}>
                Revisar overview
              </button>
            )}

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona detalles útiles para los párrafos del cuerpo</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige los datos que ayudan a explicar patrones. Puedes seleccionar más de uno.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {DETAILS.map((detail) => (
                <OptionCard
                  key={detail.id}
                  selected={detailIds.has(detail.id)}
                  revealed={detailsRevealed}
                  positive={detail.useful}
                  text={detail.text}
                  explanation={detail.explanation}
                  onClick={() => toggleDetail(detail.id)}
                />
              ))}
            </div>
            {!detailsRevealed ? (
              <button className="btn btn-sm" type="button" disabled={detailIds.size === 0} onClick={() => setDetailsRevealed(true)} style={{ opacity: detailIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Revisar detalles
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {detailScore} de {DETAILS.filter((detail) => detail.useful).length} detalles fuertes seleccionados.
                </p>
              </div>
            )}
          </section>

          <section aria-labelledby="model-heading" style={{ marginTop: '1.5rem' }}>
            <h2 id="model-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.8rem' }}>
              Modelo de respuesta explicado
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {MODEL_ANSWER.map((part) => (
                <article key={part.label} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.95rem', color: '#0f3d8c' }}>{part.label}</h3>
                  <p style={{ margin: '0 0 0.6rem', color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.92rem' }}>{part.text}</p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.82rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Por qué funciona:</strong> {part.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="links-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Sigue practicando Task 1
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {INTERNAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Preguntas frecuentes
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.96rem' }}>{faq.question}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
