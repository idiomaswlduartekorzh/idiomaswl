'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type Segment = {
  label: string;
  value: number;
  color: string;
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

const SEGMENTS: Segment[] = [
  { label: 'Rent', value: 36, color: '#0f3d8c' },
  { label: 'Food', value: 22, color: '#047857' },
  { label: 'Transport', value: 15, color: '#b45309' },
  { label: 'Leisure', value: 14, color: '#7c3aed' },
  { label: 'Savings', value: 8, color: '#be123c' },
  { label: 'Other', value: 5, color: '#475569' },
];

const OVERVIEWS: OverviewOption[] = [
  {
    id: 'strong',
    text: 'Overall, rent accounted for the largest share of spending, while savings and other expenses made up only small proportions. Food was the second biggest category, ahead of transport and leisure.',
    correct: true,
    explanation:
      'Correcto. Identifica el segmento dominante, los segmentos menores y el ranking general sin convertir el overview en una lista.',
  },
  {
    id: 'list',
    text: 'Overall, rent was 36%, food was 22%, transport was 15%, leisure was 14%, savings was 8% and other expenses were 5%.',
    correct: false,
    explanation:
      'Esto enumera todos los porcentajes, pero no interpreta la distribución. El overview debe decir qué destaca.',
  },
  {
    id: 'wrong',
    text: 'Overall, spending was distributed almost equally across all categories, with no category standing out clearly.',
    correct: false,
    explanation:
      'Incorrecto. Rent es claramente la categoría más grande y casi triplica algunas categorías menores.',
  },
];

const GROUPS: GroupOption[] = [
  {
    id: 'large',
    text: 'Describe rent and food together as the two largest categories, with rent clearly leading.',
    useful: true,
    explanation:
      'Fuerte. Estas dos categorías suman más de la mitad del gasto y merecen el primer párrafo de detalle.',
  },
  {
    id: 'middle',
    text: 'Compare transport and leisure because their shares are very similar.',
    useful: true,
    explanation:
      'Fuerte. La similitud 15% vs 14% permite una comparación compacta y natural.',
  },
  {
    id: 'small',
    text: 'Group savings and other as minor categories rather than giving them separate paragraphs.',
    useful: true,
    explanation:
      'Útil. Son los segmentos más pequeños y juntos explican una parte secundaria del gráfico.',
  },
  {
    id: 'clockwise',
    text: 'Describe the chart clockwise from the top, regardless of size or relationship.',
    useful: false,
    explanation:
      'Débil. En IELTS Task 1 la estructura debe seguir patrones, no la posición visual del gráfico.',
  },
  {
    id: 'opinion',
    text: 'Explain that rent is highest because apartments became expensive in the city.',
    useful: false,
    explanation:
      'No sirve. El pie chart no da causas; inventarlas rompe la precisión de Task 1.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'The pie chart shows how young professionals in Northbridge allocated their monthly household spending in 2025 across six categories.',
    note: 'Parafrasea el enunciado y conserva población, lugar, periodo y tema del gasto.',
  },
  {
    label: 'Overview',
    text: 'Overall, rent represented by far the largest share of expenditure, while savings and other costs accounted for the smallest proportions. Food was the second largest item, whereas transport and leisure were almost equal.',
    note: 'Resume tamaño relativo, extremos y una comparación importante sin listar todos los porcentajes.',
  },
  {
    label: 'Cuerpo 1',
    text: 'Rent took up 36% of monthly spending, making it the dominant category. Food was also substantial at 22%, meaning that these two essential expenses together accounted for well over half of the total budget.',
    note: 'Agrupa las categorías grandes y añade una lectura agregada útil.',
  },
  {
    label: 'Cuerpo 2',
    text: 'Transport and leisure were much smaller and very similar, at 15% and 14% respectively. The remaining categories were savings, at 8%, and other expenses, at just 5%, making them the least significant parts of the budget.',
    note: 'Compara categorías medianas y agrupa las menores para evitar una lista mecánica.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task1', label: 'Task 1 hub' },
  { href: '/practica/ielts/academic/writing/task1/graficos-lineales', label: 'Gráficos lineales' },
  { href: '/practica/ielts/academic/writing/task1/graficos-de-barras', label: 'Gráficos de barras' },
  { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview' },
  { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Comparaciones' },
  { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Vocabulario' },
  { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Tarea completa' },
];

function PieChart() {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  let offset = 25;

  return (
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0 1.25rem' }}>
      <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Original practice chart
      </p>
      <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
        Monthly spending by young professionals in Northbridge, 2025
      </h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', fontSize: '0.86rem' }}>
        Figures show the percentage of total household spending.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <svg viewBox="0 0 220 220" role="img" aria-label="Pie chart showing monthly spending categories among young professionals in Northbridge" style={{ width: 'min(100%, 270px)', flex: '1 1 190px', display: 'block' }}>
          <circle cx="110" cy="110" r={radius} fill="none" stroke="var(--line-soft)" strokeWidth="42" />
          {SEGMENTS.map((segment) => {
            const dash = (segment.value / 100) * circumference;
            const gap = circumference - dash;
            const currentOffset = offset;
            offset -= (segment.value / 100) * 100;
            return (
              <circle
                key={segment.label}
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="42"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={currentOffset}
                transform="rotate(-90 110 110)"
              />
            );
          })}
          <circle cx="110" cy="110" r="44" fill="var(--bg)" />
          <text x="110" y="104" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink)">
            100%
          </text>
          <text x="110" y="123" textAnchor="middle" fontSize="11" fill="var(--muted)">
            total spending
          </text>
        </svg>
        <div style={{ display: 'grid', gap: '0.45rem', flex: '1 1 220px', minWidth: 0 }}>
          {SEGMENTS.map((segment) => (
            <div key={segment.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', fontSize: '0.86rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--ink)' }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: segment.color }} />
                {segment.label}
              </span>
              <strong style={{ fontFamily: 'var(--mono)' }}>{segment.value}%</strong>
            </div>
          ))}
        </div>
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

export default function PieChartsContent({ faqs }: { faqs: Faq[] }) {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Pie charts</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 1
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Pie charts en IELTS Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a describir pie charts sin caer en listas de porcentajes: detecta proporciones dominantes, agrupa segmentos pequeños y compara categorías con intención.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para proporciones y agrupación, más un modelo comentado de Task 1.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Writing Task 1 pide describir información visual. Un pie chart entra dentro de esa familia, pero no lo tratamos como tarea oficial aislada.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> lo practicamos por separado porque exige resumir proporciones, combinar segmentos pequeños y evitar que el ensayo suene como una lista de porcentajes.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para un pie chart
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Lee el total', 'Confirma si los segmentos suman 100% y qué población o presupuesto representan.'],
                ['2', 'Ubica extremos', 'Identifica la porción más grande y la más pequeña antes de escribir.'],
                ['3', 'Agrupa segmentos', 'Une categorías pequeñas o similares para evitar una lista mecánica.'],
                ['4', 'Compara proporciones', 'Usa fracciones aproximadas: nearly half, over a third, about twice as much.'],
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
              Ejercicio guiado: overview y agrupación de porcentajes
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              The pie chart below shows how young professionals in Northbridge allocated their monthly household spending in 2025.
            </p>

            <PieChart />

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

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona las mejores decisiones de agrupación</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige qué decisiones ayudan a escribir una respuesta más analítica y menos repetitiva.
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
