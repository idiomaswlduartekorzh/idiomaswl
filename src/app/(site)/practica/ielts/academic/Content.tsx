'use client';

import Link from 'next/link';

const SKILLS = [
  {
    id: 'writing',
    label: 'Writing',
    icon: '✏️',
    desc: 'Task 1 (datos visuales) y Task 2 (ensayo argumentativo). 60 minutos totales.',
    href: '/practica/ielts/academic/writing',
    available: true,
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: '📖',
    desc: 'True/False/Not Given · Matching · Multiple Choice. 60 minutos, 40 preguntas.',
    href: '/practica/ielts/reading',
    available: true,
  },
  {
    id: 'listening',
    label: 'Listening',
    icon: '🎧',
    desc: 'Cuatro secciones con hablantes nativos. 30 minutos + 10 para transferir.',
    href: '#',
    available: false,
  },
  {
    id: 'speaking',
    label: 'Speaking',
    icon: '🗣️',
    desc: 'Entrevista cara a cara: Part 1 (introducción), Part 2 (monólogo), Part 3 (debate).',
    href: '#',
    available: false,
  },
];

export default function IELTSAcademicPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <Link href="/practica/ielts" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← IELTS</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🎓 IELTS Academic</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
            IELTS Academic
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 2rem', lineHeight: 1.6 }}>
            Modalidad requerida por universidades, programas de posgrado y visas de estudiante en UK, Australia y Canadá.
            Elige la habilidad que quieres practicar.
          </p>

          <div className="wl-exams-catalog">
            {SKILLS.map(sk => (
              sk.available
                ? (
                  <Link key={sk.id} href={sk.href}
                    className="wl-catalog-card"
                    style={{ '--exam-color': '#0f3d8c', textAlign: 'left', display: 'flex', flexDirection: 'column', textDecoration: 'none' } as React.CSSProperties}
                  >
                    <div className="wl-catalog-card__bar" />
                    <div className="wl-catalog-card__body">
                      <div className="wl-catalog-card__top">
                        <span style={{ fontSize: '1.8rem' }}>{sk.icon}</span>
                      </div>
                      <h2 className="wl-catalog-card__name">{sk.label}</h2>
                      <p className="wl-catalog-card__tagline">{sk.desc}</p>
                    </div>
                    <div className="wl-catalog-card__footer">
                      <span>IELTS Academic</span>
                      <span className="wl-catalog-card__cta">Practicar →</span>
                    </div>
                  </Link>
                )
                : (
                  <div key={sk.id}
                    className="wl-catalog-card wl-catalog-card--soon"
                    style={{ '--exam-color': '#0f3d8c', textAlign: 'left', display: 'flex', flexDirection: 'column' } as React.CSSProperties}
                  >
                    <div className="wl-catalog-card__bar" />
                    <div className="wl-catalog-card__body">
                      <div className="wl-catalog-card__top">
                        <span style={{ fontSize: '1.8rem' }}>{sk.icon}</span>
                        <span className="wl-catalog-card__badge">Próximamente</span>
                      </div>
                      <h2 className="wl-catalog-card__name">{sk.label}</h2>
                      <p className="wl-catalog-card__tagline">{sk.desc}</p>
                    </div>
                    <div className="wl-catalog-card__footer">
                      <span>IELTS Academic</span>
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
