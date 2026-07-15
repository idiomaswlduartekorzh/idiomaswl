'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type Category = {
  label: string;
  campus: number;
  online: number;
};

type OverviewOption = {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
};

type GroupOption = {
  id: string;
  text: string;
  useful: boolean;
  explanation: string;
};

const CATEGORIES: Category[] = [
  { label: 'Business', campus: 74, online: 52 },
  { label: 'Engineering', campus: 68, online: 41 },
  { label: 'Design', campus: 46, online: 63 },
  { label: 'Health', campus: 58, online: 35 },
  { label: 'Languages', campus: 31, online: 70 },
];

const OVERVIEWS: OverviewOption[] = [
  {
    id: 'strong',
    text: 'Overall, campus students were more likely to choose Business, Engineering and Health, while online learners preferred Languages and Design, with Languages showing the highest online figure.',
    correct: true,
    explanation:
      'Correcto. Resume el contraste central entre los dos grupos y menciona la categoría dominante sin listar todas las cifras.',
  },
  {
    id: 'list',
    text: 'Overall, Business was 74% on campus and 52% online, Engineering was 68% and 41%, Design was 46% and 63%, Health was 58% and 35%, and Languages was 31% and 70%.',
    correct: false,
    explanation:
      'Esto no es un overview: es una lista de datos. El overview debe interpretar el patrón, no copiar cada barra.',
  },
  {
    id: 'wrong',
    text: 'Overall, online learners chose every subject more often than campus students, especially Business and Engineering.',
    correct: false,
    explanation:
      'Incorrecto. Online supera a campus solo en Design y Languages; Business y Engineering son más altos en campus.',
  },
];

const GROUPS: GroupOption[] = [
  {
    id: 'campus-high',
    text: 'Group Business and Engineering together because both are high on campus and lower online.',
    useful: true,
    explanation:
      'Fuerte. Agrupa categorías con el mismo comportamiento y permite un párrafo compacto con comparación directa.',
  },
  {
    id: 'online-high',
    text: 'Group Languages and Design together because both are higher online than on campus.',
    useful: true,
    explanation:
      'Fuerte. Este grupo contrasta claramente con Business/Engineering y ayuda a construir el segundo párrafo.',
  },
  {
    id: 'health',
    text: 'Mention Health as a supporting campus-preferred category, but not as the headline trend.',
    useful: true,
    explanation:
      'Útil. Health refuerza el patrón campus, aunque no es tan alto como Business o Engineering.',
  },
  {
    id: 'visual-order',
    text: 'Describe the bars in the exact left-to-right order shown in the chart.',
    useful: false,
    explanation:
      'Débil. El orden visual rara vez es la mejor estructura; en IELTS Task 1 conviene agrupar por patrón.',
  },
  {
    id: 'cause',
    text: 'Explain that online learners preferred Languages because language apps are popular.',
    useful: false,
    explanation:
      'No sirve. El gráfico no da causas; Task 1 describe datos, no inventa explicaciones externas.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'The bar chart compares the proportions of campus-based and online students who selected five subject areas in 2024.',
    note: 'Parafrasea el enunciado y deja clara la unidad: proporciones de estudiantes.',
  },
  {
    label: 'Overview',
    text: 'Overall, campus students showed stronger preferences for Business, Engineering and Health, whereas online learners were more likely to choose Languages and Design. The highest figure was for Business among campus students, while Languages was the leading online subject.',
    note: 'Presenta el contraste principal y los líderes de cada grupo sin saturar con números.',
  },
  {
    label: 'Cuerpo 1',
    text: 'Business was the most popular campus subject, at 74%, compared with 52% among online learners. A similar pattern can be seen in Engineering, where the campus figure stood at 68%, substantially above the online figure of 41%.',
    note: 'Agrupa dos categorías con el mismo patrón: campus alto y online más bajo.',
  },
  {
    label: 'Cuerpo 2',
    text: 'By contrast, online students were more likely to choose Languages and Design, at 70% and 63% respectively, while the corresponding campus figures were 31% and 46%. Health also favored campus learners, with 58% choosing it compared with only 35% online.',
    note: 'Cierra con el contraste inverso y añade Health como apoyo, no como idea principal.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task1', label: 'Task 1 hub' },
  { href: '/practica/ielts/academic/writing/task1/graficos-lineales', label: 'Gráficos lineales' },
  { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview' },
  { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Comparaciones' },
  { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Vocabulario' },
  { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Tarea completa' },
];

function BarChart() {
  const width = 680;
  const height = 330;
  const pad = { top: 24, right: 28, bottom: 58, left: 72 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const max = 80;
  const groupWidth = chartWidth / CATEGORIES.length;
  const barWidth = Math.min(28, groupWidth * 0.28);
  const y = (value: number) => pad.top + chartHeight - (value / max) * chartHeight;
  const ticks = [0, 20, 40, 60, 80];

  return (
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0 1.25rem' }}>
      <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Original practice chart
      </p>
      <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
        Subject choices by study mode in 2024
      </h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', fontSize: '0.86rem' }}>
        Figures show the percentage of students selecting each subject area.
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart comparing campus and online students by subject choice in 2024" style={{ width: '100%', display: 'block' }}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.left} y1={y(tick)} x2={width - pad.right} y2={y(tick)} stroke="var(--line-soft)" />
            <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">
              {tick}%
            </text>
          </g>
        ))}
        {CATEGORIES.map((category, index) => {
          const groupX = pad.left + index * groupWidth + groupWidth / 2;
          const campusHeight = chartHeight - (y(category.campus) - pad.top);
          const onlineHeight = chartHeight - (y(category.online) - pad.top);
          return (
            <g key={category.label}>
              <rect x={groupX - barWidth - 3} y={y(category.campus)} width={barWidth} height={campusHeight} rx="4" fill="#0f3d8c" />
              <rect x={groupX + 3} y={y(category.online)} width={barWidth} height={onlineHeight} rx="4" fill="#047857" />
              <text x={groupX} y={height - 27} textAnchor="middle" fontSize="11" fill="var(--muted)">
                {category.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
        {[
          ['#0f3d8c', 'Campus'],
          ['#047857', 'Online'],
        ].map(([color, label]) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
            <span style={{ width: 18, height: 10, borderRadius: 3, background: color }} />
            {label}
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

export default function GraficosDeBarrasContent({ faqs }: { faqs: Faq[] }) {
  const [overviewId, setOverviewId] = useState<string | null>(null);
  const [overviewRevealed, setOverviewRevealed] = useState(false);
  const [groupIds, setGroupIds] = useState<Set<string>>(new Set());
  const [groupsRevealed, setGroupsRevealed] = useState(false);

  const groupScore = useMemo(
    () => [...groupIds].filter((id) => GROUPS.find((group) => group.id === id)?.useful).length,
    [groupIds],
  );

  function toggleGroup(id: string) {
    if (groupsRevealed) return;
    setGroupIds((current) => {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Bar charts</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 1
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Gráficos de barras en IELTS Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Practica cómo transformar un bar chart en una respuesta organizada: leer categorías, detectar rankings, agrupar barras y comparar diferencias sin describir dato por dato.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para overview y agrupación, además de un modelo comentado de respuesta Task 1.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Writing Task 1 pide describir información visual. Un gráfico de barras entra dentro de esa familia de gráficos, pero no lo presentamos como una tarea oficial separada.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> practicamos bar charts por separado porque suelen premiar la comparación selectiva: líderes, mínimos, brechas grandes, patrones por grupo y excepciones.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para un bar chart
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Define las categorías', 'Identifica qué compara cada barra y cuál es la unidad: porcentaje, número, dinero o frecuencia.'],
                ['2', 'Encuentra rankings', 'Busca la barra más alta, la más baja y si un grupo domina en varias categorías.'],
                ['3', 'Agrupa por patrón', 'Une categorías similares o contrastantes; no sigas el orden visual si no ayuda.'],
                ['4', 'Selecciona brechas', 'Usa cifras donde la diferencia sea relevante, no para repetir cada valor.'],
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
              Ejercicio guiado: overview y agrupación de barras
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              The bar chart below compares the percentages of campus-based and online students who selected five subject areas in 2024.
            </p>

            <BarChart />

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

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: decide cómo agrupar los datos</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Selecciona las decisiones de estructura que producirían una respuesta más clara.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {GROUPS.map((group) => (
                <OptionCard
                  key={group.id}
                  selected={groupIds.has(group.id)}
                  revealed={groupsRevealed}
                  positive={group.useful}
                  text={group.text}
                  explanation={group.explanation}
                  onClick={() => toggleGroup(group.id)}
                />
              ))}
            </div>
            {!groupsRevealed ? (
              <button className="btn btn-sm" type="button" disabled={groupIds.size === 0} onClick={() => setGroupsRevealed(true)} style={{ opacity: groupIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Revisar agrupación
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {groupScore} de {GROUPS.filter((group) => group.useful).length} decisiones fuertes seleccionadas.
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
