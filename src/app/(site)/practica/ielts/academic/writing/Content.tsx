'use client';

import Link from 'next/link';

const TASKS = [
  {
    id: 'rubrica',
    label: 'Rúbrica',
    icon: '✓',
    time: 'Checklist · criterios · diagnóstico',
    desc: 'Autoevaluación pedagógica para Task 1 y Task 2: criterio, evidencia, organización, vocabulario y gramática.',
    href: '/practica/ielts/academic/writing/rubrica',
    available: true,
  },
  {
    id: 'task1',
    label: 'Task 1',
    icon: 'T1',
    time: '20 min · 150+ palabras',
    desc: 'Describe datos visuales: gráficas, tablas, diagramas de proceso, mapas. 7 sub-habilidades.',
    href: '/practica/ielts/academic/writing/task1',
    available: true,
  },
  {
    id: 'task2',
    label: 'Task 2',
    icon: 'T2',
    time: '40 min · 250+ palabras',
    desc: 'Ensayo argumentativo: opinión, discusión de dos posturas, problema-solución, ventajas-desventajas.',
    href: '/practica/ielts/academic/writing/task2',
    available: true,
  },
];

export default function IELTSWritingPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <Link href="/practica/ielts/academic" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Academic</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />✏️ IELTS Academic Writing</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: 0, margin: '0 0 0.5rem', fontWeight: 700 }}>
            Writing
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
            60 minutos en total. Task 1 vale un tercio de la nota de Writing; Task 2 vale dos tercios.
            Los 4 criterios de evaluación son: Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range &amp; Accuracy.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1rem', lineHeight: 1.6 }}>
            Cada ruta activa incluye práctica original, respuesta explicada o modelo comentado para estudiar antes de escribir el ensayo completo.
          </p>
          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 8, marginBottom: '1.25rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Writing tiene dos tareas: Task 1 describe información visual en al menos 150 palabras y Task 2 responde una pregunta de ensayo en al menos 250 palabras.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> organizamos la práctica por rutas de transferencia: rúbrica, visuales de Task 1, familias pedagógicas de Task 2, prompts originales y modelos comentados.
            </p>
          </section>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['Task Achievement','Coherence & Cohesion','Lexical Resource','Grammatical Range'].map(c => (
              <span key={c} style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{c}</span>
            ))}
          </div>

          <div className="wl-exams-catalog">
            {TASKS.map(tk => (
              tk.available
                ? (
                  <Link key={tk.id} href={tk.href}
                    className="wl-catalog-card"
                    style={{ '--exam-color': '#0f3d8c', textAlign: 'left', display: 'flex', flexDirection: 'column', textDecoration: 'none' } as React.CSSProperties}
                  >
                    <div className="wl-catalog-card__bar" />
                    <div className="wl-catalog-card__body">
                      <div className="wl-catalog-card__top">
                        <span style={{ fontSize: '1.35rem', fontFamily: 'var(--mono)', fontWeight: 900 }}>{tk.icon}</span>
                      </div>
                      <h2 className="wl-catalog-card__name">{tk.label}</h2>
                      <p style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: '#0f3d8c', fontWeight: 700, margin: '0 0 0.3rem' }}>{tk.time}</p>
                      <p className="wl-catalog-card__tagline">{tk.desc}</p>
                    </div>
                    <div className="wl-catalog-card__footer">
                      <span>Writing</span>
                      <span className="wl-catalog-card__cta">Practicar →</span>
                    </div>
                  </Link>
                )
                : (
                  <div key={tk.id}
                    className="wl-catalog-card wl-catalog-card--soon"
                    style={{ '--exam-color': '#0f3d8c', textAlign: 'left', display: 'flex', flexDirection: 'column' } as React.CSSProperties}
                  >
                    <div className="wl-catalog-card__bar" />
                    <div className="wl-catalog-card__body">
                      <div className="wl-catalog-card__top">
                        <span style={{ fontSize: '1.8rem' }}>{tk.icon}</span>
                        <span className="wl-catalog-card__badge">Próximamente</span>
                      </div>
                      <h2 className="wl-catalog-card__name">{tk.label}</h2>
                      <p style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', fontWeight: 700, margin: '0 0 0.3rem' }}>{tk.time}</p>
                      <p className="wl-catalog-card__tagline">{tk.desc}</p>
                    </div>
                    <div className="wl-catalog-card__footer">
                      <span>Writing</span>
                      <span className="wl-catalog-card__cta">Próximamente</span>
                    </div>
                  </div>
                )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
