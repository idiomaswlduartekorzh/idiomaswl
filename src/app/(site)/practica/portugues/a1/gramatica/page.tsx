import type { Metadata } from 'next'
import Link from 'next/link'
import { practicaMetadata } from '@/lib/practica-metadata'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { TOPICS, GRAMMAR_COLOR } from '@/data/practica/portugues-a1-gramatica'
import XPStreak from '@/components/practica/XPStreak'

export const metadata: Metadata = practicaMetadata('portugues', 'a1', 'gramatica')

const COLOR = GRAMMAR_COLOR

export default function Page() {
  const totalQuestions = TOPICS.reduce((n, t) => n + t.questions.length, 0)
  return (
    <>
      <CourseSchema
        name="Gramática de Portugués A1 — 15 temas con explicación y ejercicios"
        description="Curso de gramática de portugués (brasileño) nivel A1: artículos, ser, estar, ter, verbos -ar/-er/-ir, contracciones (do/no/ao), posesivos, há/tem y más. Explicación, tablas, ejemplos y ejercicios."
        url="https://www.idiomaswl.com/practica/portugues/a1/gramatica"
        educationalLevel="A1"
        teaches="Gramática del portugués, nivel A1 (MCER)"
        inLanguage="pt"
      />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/portugues/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />Gramática · Portugués A1</p>
            <XPStreak showMotivation />
          </div>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática de Portugués A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
            {TOPICS.length} temas esenciales del nivel A1 (portugués brasileño). Cada tema tiene explicación clara, tablas, ejemplos
            traducidos, errores comunes de hispanohablantes (contraste español→portugués) y {totalQuestions}+ ejercicios con feedback inmediato.
          </p>

          {/* Lista de temas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '0.85rem' }}>
            {TOPICS.map(t => (
              <Link key={t.slug} href={`/practica/portugues/a1/gramatica/${t.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', height: '100%',
                  padding: '1rem 1.2rem', borderRadius: 14, boxSizing: 'border-box',
                  border: `1.5px solid ${COLOR}22`, background: `${COLOR}05`,
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {t.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.66rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>Tema {t.order}</div>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.3 }}>{t.shortTitle}</div>
                  </div>
                  <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700 }}>→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tip */}
          <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> sigue los temas en orden — están ordenados de lo más básico
            (artículos, ser, estar) a lo más completo (contracciones, há/tem, presente continuo). Cada uno te toma 5–10 minutos.
          </div>
        </div>
      </section>
    </>
  )
}
