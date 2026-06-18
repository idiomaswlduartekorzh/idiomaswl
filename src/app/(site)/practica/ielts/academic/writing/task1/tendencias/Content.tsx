'use client';

import { useState } from 'react';
import Link from 'next/link';

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
        <div style={{ maxWidth: 740, margin: '0 auto' }}>

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

          {/* Strategy note */}
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.18)', marginBottom: '1.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>
            💡 <strong style={{ color: 'var(--ink)' }}>Regla Band 7+:</strong> menciona el patrón general, el dato más extremo y la comparación más llamativa. Evita números específicos en el overview y no inventes tendencias que no están en el gráfico.
          </div>

          {/* Scenario progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((scenarioIdx + 1) / SCENARIOS.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              Gráfica {scenarioIdx + 1} / {SCENARIOS.length}
            </span>
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

        </div>
      </div>
    </section>
  );
}
