'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type Row = {
  area: string;
  morning: number;
  afternoon: number;
  evening: number;
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

const ROWS: Row[] = [
  { area: 'Central Library', morning: 42, afternoon: 65, evening: 31 },
  { area: 'Sports Centre', morning: 18, afternoon: 46, evening: 58 },
  { area: 'Student Cafe', morning: 35, afternoon: 72, evening: 64 },
  { area: 'Computer Lab', morning: 51, afternoon: 49, evening: 27 },
  { area: 'Study Lounge', morning: 24, afternoon: 57, evening: 69 },
];

const OVERVIEWS: OverviewOption[] = [
  {
    id: 'strong',
    text: 'Overall, afternoon use was generally the highest across campus facilities, while evening activity was concentrated in social or recreational spaces. The Student Cafe recorded the highest single figure.',
    correct: true,
    explanation:
      'Correcto. Resume patrón por columna, contraste por tipo de lugar y el máximo sin listar toda la tabla.',
  },
  {
    id: 'list',
    text: 'Overall, the Central Library had 42, 65 and 31 users, the Sports Centre had 18, 46 and 58, and the Student Cafe had 35, 72 and 64.',
    correct: false,
    explanation:
      'No es un overview. Copia celdas individuales y deja por fuera el patrón general.',
  },
  {
    id: 'wrong',
    text: 'Overall, morning was the busiest period for every facility, especially the Sports Centre and Study Lounge.',
    correct: false,
    explanation:
      'Incorrecto. La mañana solo lidera en el Computer Lab; en la mayoría de filas dominan afternoon o evening.',
  },
];

const DETAILS: DetailOption[] = [
  {
    id: 'afternoon',
    text: 'Afternoon was the busiest period for the Central Library and Student Cafe, reaching 65 and 72 users respectively.',
    useful: true,
    explanation:
      'Útil. Agrupa dos filas con el mismo patrón y usa cifras que prueban la idea.',
  },
  {
    id: 'evening-social',
    text: 'Evening figures were highest in the Sports Centre and Study Lounge, at 58 and 69 users.',
    useful: true,
    explanation:
      'Fuerte. Muestra un patrón por tipo de espacio y evita describir filas aisladas.',
  },
  {
    id: 'computer-lab',
    text: 'The Computer Lab was unusual because morning use was slightly higher than afternoon use, at 51 compared with 49.',
    useful: true,
    explanation:
      'Útil. Esta excepción ayuda a demostrar selección crítica de datos.',
  },
  {
    id: 'random-cell',
    text: 'The Sports Centre had 46 users in the afternoon.',
    useful: false,
    explanation:
      'Débil si aparece sola. Es una celda aislada y no explica un patrón completo.',
  },
  {
    id: 'cause',
    text: 'The Student Cafe was busiest because students preferred cheaper lunch options.',
    useful: false,
    explanation:
      'No sirve. La tabla no da razones; en Task 1 no inventamos causas externas.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introducción',
    text: 'The table compares the average number of students using five campus facilities during the morning, afternoon and evening in 2025.',
    note: 'Parafrasea el enunciado y conserva qué se compara, unidades y periodo.',
  },
  {
    label: 'Overview',
    text: 'Overall, afternoon use was generally the highest, especially in the Student Cafe and Central Library. In contrast, evening activity was stronger in the Sports Centre and Study Lounge, while the Computer Lab was the only facility used most in the morning.',
    note: 'Resume patrones por columna y menciona la excepción principal.',
  },
  {
    label: 'Cuerpo 1',
    text: 'The Student Cafe recorded the highest single figure, with 72 students in the afternoon, followed by 64 in the evening. The Central Library showed a similar afternoon peak, rising from 42 users in the morning to 65 in the afternoon, before dropping to 31 in the evening.',
    note: 'Agrupa las filas con pico en la tarde y usa cifras seleccionadas.',
  },
  {
    label: 'Cuerpo 2',
    text: 'By contrast, the Sports Centre and Study Lounge were busier later in the day, reaching 58 and 69 evening users respectively. The Computer Lab followed a different pattern, with morning and afternoon figures almost equal at 51 and 49, then falling to 27 in the evening.',
    note: 'Cierra con patrones opuestos y una excepción clara.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task1', label: 'Task 1 hub' },
  { href: '/practica/ielts/academic/writing/task1/graficos-lineales', label: 'Gráficos lineales' },
  { href: '/practica/ielts/academic/writing/task1/graficos-de-barras', label: 'Gráficos de barras' },
  { href: '/practica/ielts/academic/writing/task1/pie-charts', label: 'Pie charts' },
  { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview' },
  { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Comparaciones' },
  { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Vocabulario' },
  { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Tarea completa' },
];

function PracticeTable() {
  return (
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0 1.25rem', overflowX: 'auto' }}>
      <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Original practice table
      </p>
      <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
        Average student use of campus facilities in 2025
      </h2>
      <p style={{ margin: '0 0 1rem', color: 'var(--muted)', fontSize: '0.86rem' }}>
        Figures show average number of students per time period.
      </p>
      <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead>
          <tr>
            {['Facility', 'Morning', 'Afternoon', 'Evening'].map((heading) => (
              <th key={heading} scope="col" style={{ textAlign: heading === 'Facility' ? 'left' : 'right', padding: '0.7rem 0.75rem', borderBottom: '1px solid var(--line-soft)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.area}>
              <th scope="row" style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)', color: 'var(--ink)', fontWeight: 700 }}>
                {row.area}
              </th>
              <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)', color: row.morning >= row.afternoon && row.morning >= row.evening ? '#0f3d8c' : 'var(--muted)', fontWeight: row.morning >= row.afternoon && row.morning >= row.evening ? 800 : 500 }}>
                {row.morning}
              </td>
              <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)', color: row.afternoon >= row.morning && row.afternoon >= row.evening ? '#047857' : 'var(--muted)', fontWeight: row.afternoon >= row.morning && row.afternoon >= row.evening ? 800 : 500 }}>
                {row.afternoon}
              </td>
              <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--line-soft)', color: row.evening >= row.morning && row.evening >= row.afternoon ? '#b45309' : 'var(--muted)', fontWeight: row.evening >= row.morning && row.evening >= row.afternoon ? 800 : 500 }}>
                {row.evening}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default function TablasContent({ faqs }: { faqs: Faq[] }) {
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
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Tables</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 1
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Tablas en IELTS Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Aprende a escribir sobre tablas sin copiar celda por celda: encuentra patrones por fila y columna, selecciona excepciones y convierte datos densos en una respuesta clara.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            La práctica incluye respuestas explicadas para agrupación y selección de cifras, además de un modelo comentado de respuesta Task 1.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Writing Task 1 puede pedir describir una tabla como información visual. La tabla es una forma posible, no una tarea oficial aislada.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> practicamos tablas por separado porque obligan a filtrar datos: overview primero, grupos de filas o columnas después, y solo cifras con función.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Flujo de trabajo para una tabla
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Lee filas y columnas', 'Define qué compara cada eje antes de mirar números sueltos.'],
                ['2', 'Busca máximos y mínimos', 'Marca la cifra más alta, la más baja y cualquier excepción visible.'],
                ['3', 'Agrupa patrones', 'Une filas o columnas con comportamiento parecido.'],
                ['4', 'Reduce la densidad', 'No menciones cada celda: elige cifras que prueben tus comparaciones.'],
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
              Ejercicio guiado: overview y selección de datos
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              The table below compares the average number of students using five campus facilities during three periods of the day in 2025.
            </p>

            <PracticeTable />

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

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Paso 2: selecciona datos útiles para el cuerpo</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Elige los datos que ayudan a explicar patrones, contrastes o excepciones.
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
                Revisar datos
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Resultado: {detailScore} de {DETAILS.filter((detail) => detail.useful).length} datos fuertes seleccionados.
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
