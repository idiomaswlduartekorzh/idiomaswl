'use client';

import Link from 'next/link';
import { GUIDED_WORKBOOK_EXCLUSIONS, GUIDED_WORKBOOK_IDS } from '@/data/icfes/guided-registry';
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

const COLLECTIONS = [
  {
    id: 'saber-11',
    title: 'Saber 11 · Grado 11',
    description: 'Empieza aquí si vas a presentar Saber 11. Estos cuadernillos corresponden al público y propósito de esta ruta.',
    items: SIMULACROS.filter(sim => sim.assessment === 'saber-11'),
  },
  {
    id: 'complementary',
    title: 'Práctica complementaria',
    description: 'Material de grados 9 y 10, más Saber TyT. Sirve para reforzar habilidades, pero no equivale a un cuadernillo Saber 11 de grado 11.',
    items: SIMULACROS.filter(sim => sim.assessment !== 'saber-11'),
  },
] as const;

export default function ExamenesClient() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 780, margin: '0 auto 1.5rem', padding: '1.25rem 1.5rem', borderRadius: 16, background: 'linear-gradient(135deg, #172554, #312e81)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div><strong style={{ display: 'block', fontSize: '1.05rem' }}>Nuevo: simulacro guiado de 55 preguntas</strong><span style={{ color: '#dbeafe', fontSize: '.84rem' }}>Las 7 partes con evidencia, distractores, microlecciones y repaso de errores.</span></div>
          <Link href="/practica/icfes-saber-11/simulacro-guiado" className="btn" style={{ background: '#fff', color: '#172554', whiteSpace: 'nowrap' }}>Empezar guiado →</Link>
        </div>
        {/* Header */}
        <div style={{ maxWidth: 780, margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/icfes-saber-11" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              ← Práctica ICFES
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
              ICFES / Cuadernillos
            </span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Material divulgado por el ICFES
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
            Cuadernillos de inglés para Saber 11
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.97rem', margin: 0, maxWidth: 600, lineHeight: 1.65 }}>
            Preguntas de cuadernillos divulgados por el ICFES. Las muestras conservan su extensión publicada —que puede ser menor que las 55 preguntas de la aplicación estándar 2026-2— y tienen corrección automática.
          </p>
        </div>

        {/* Exam cards */}
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {COLLECTIONS.map(collection => (
            <section key={collection.id} aria-labelledby={`${collection.id}-title`}>
              <div style={{ marginBottom: '1.1rem' }}>
                <h2 id={`${collection.id}-title`} style={{ fontSize: '1.3rem', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>{collection.title}</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{collection.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {collection.items.map(sim => {
                  const gradeColor = sim.grade ? GRADE_COLOR[sim.grade] ?? '#0f3d8c' : '#7c3aed';
                  const audienceLabel = sim.assessment === 'saber-tyt' ? 'Saber TyT' : `Grado ${sim.grade}`;
                  const hasGuidedMode = GUIDED_WORKBOOK_IDS.includes(sim.id as typeof GUIDED_WORKBOOK_IDS[number]);
                  const guidedExclusion = GUIDED_WORKBOOK_EXCLUSIONS[sim.id as keyof typeof GUIDED_WORKBOOK_EXCLUSIONS];
                  return (
                    <div key={sim.id} className="wl-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: gradeColor, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.2rem 0.55rem', borderRadius: 8, background: `${gradeColor}15`, border: `1px solid ${gradeColor}30` }}>
                      {audienceLabel}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)', padding: '0.2rem 0.55rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                      Oficial ICFES
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.35rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                    {sim.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                    {sim.totalQuestions} preguntas · práctica sugerida: {sim.timeMinutes} min · Nivel {LEVEL_LABEL[sim.year] ?? 'A1–B1'}
                  </p>
                  <p style={{ fontSize: '0.74rem', color: hasGuidedMode ? '#047857' : 'var(--muted)', margin: '0.4rem 0 0', fontWeight: 700 }}>
                    {hasGuidedMode ? `✓ ${sim.totalQuestions} explicaciones guiadas revisadas` : guidedExclusion ?? 'Clave y corrección final · guiado no aplicable a esta prueba'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {hasGuidedMode && <Link href={`/practica/icfes-saber-11/examenes/${sim.id}/guiado`} className="btn btn-ghost" style={{ whiteSpace: 'nowrap' }}>Modo guiado</Link>}
                  <Link
                    href={`/practica/icfes-saber-11/examenes/${sim.id}`}
                    className="btn"
                    style={{ whiteSpace: 'nowrap', background: gradeColor, borderColor: gradeColor, color: '#fff' }}
                  >
                    Resolver cuadernillo →
                  </Link>
                </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Info section */}
        <div style={{ maxWidth: 780, margin: '2.5rem auto 0', padding: '1.25rem 1.5rem', borderRadius: 12, background: 'rgba(15,61,140,0.04)', border: '1px solid rgba(15,61,140,0.12)' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--ink)' }}>Dos formas de practicar:</strong> en modo examen navegas libremente y recibes corrección al final. Los cuadernillos con sello verde tienen modo guiado completo, que explica respuesta, evidencia y distractores sin modificar el contenido divulgado. Si falta un estímulo en el banco digital, el guiado se desactiva en lugar de inferirlo desde la clave.
          </p>
        </div>
      </div>
    </section>
  );
}
