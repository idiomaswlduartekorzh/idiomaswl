'use client';

import Link from 'next/link';
import { SIMULACROS } from '@/data/mocks/icfes-simulacros';

const LEVEL_LABEL: Record<number, string> = {
  2019: 'A1 – B1',
  2022: 'A1 – B1',
  2023: 'A1 – B1',
};

const GRADE_COLOR: Record<number, string> = {
  9: '#059669',
  10: '#0369a1',
  11: '#0f3d8c',
};

export default function ExamenesClient() {
  return (
    <section className="wl-section">
      <div className="wrap">
        {/* Header */}
        <div style={{ maxWidth: 780, margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/icfes-saber-11" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              ← Práctica ICFES
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
              ICFES / Simulacros
            </span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Cuadernillos oficiales ICFES
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
            Simulacros Saber 11° — Inglés
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.97rem', margin: 0, maxWidth: 600, lineHeight: 1.65 }}>
            Preguntas de cuadernillos divulgados por el ICFES. Las muestras conservan su extensión publicada —que puede ser menor que las 55 preguntas de la aplicación estándar 2026-2— y tienen corrección automática.
          </p>
        </div>

        {/* Exam cards */}
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SIMULACROS.map(sim => {
            const gradeColor = GRADE_COLOR[sim.grade] ?? '#0f3d8c';
            return (
              <div key={sim.id} className="wl-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: gradeColor, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.2rem 0.55rem', borderRadius: 8, background: `${gradeColor}15`, border: `1px solid ${gradeColor}30` }}>
                      Grado {sim.grade}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)', padding: '0.2rem 0.55rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                      Oficial ICFES
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.35rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                    {sim.title}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                    {sim.totalQuestions} preguntas · {sim.timeMinutes} min · Nivel {LEVEL_LABEL[sim.year] ?? 'A1–B1'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {sim.id === 'icfes-2023-g11' && <Link href={`/practica/icfes-saber-11/examenes/${sim.id}/guiado`} className="btn btn-ghost" style={{ whiteSpace: 'nowrap' }}>Modo guiado</Link>}
                  <Link
                    href={`/practica/icfes-saber-11/examenes/${sim.id}`}
                    className="btn"
                    style={{ whiteSpace: 'nowrap', background: gradeColor, borderColor: gradeColor, color: '#fff' }}
                  >
                    Modo examen →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info section */}
        <div style={{ maxWidth: 780, margin: '2.5rem auto 0', padding: '1.25rem 1.5rem', borderRadius: 12, background: 'rgba(15,61,140,0.04)', border: '1px solid rgba(15,61,140,0.12)' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--ink)' }}>Dos formas de practicar:</strong> en modo examen navegas libremente y recibes corrección al final. El piloto guiado del cuadernillo 2023 muestra una pregunta a la vez y explica respuesta, evidencia y distractores. Cada tarjeta identifica con honestidad qué bloque tiene revisión editorial completa.
          </p>
        </div>
      </div>
    </section>
  );
}
