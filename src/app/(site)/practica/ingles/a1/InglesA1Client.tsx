'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProgressBar from '@/components/practica/ProgressBar'
import SkillCompletionBadge from '@/components/practica/SkillCompletionBadge'
import XPStreak from '@/components/practica/XPStreak'
import { getSkillProgress } from '@/lib/progress'
import { listeningCard } from '@/data/practica/series/page-copy'

const COLOR = '#0066cc'

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Reading',
    desc: '10 lecturas A1 con audio narrado, cada palabra clickeable, comprensión y evidencia.',
    count: '10 lecturas · con audio', href: '/practica/ingles/a1/lectura',
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammar',
    desc: 'Los 15 temas del A1: artículos, verbo to be, present simple, present continuous, can, there is/are, preposiciones y más. Cada tema con explicación, tablas, ejemplos y ejercicios.',
    count: '15 temas · 120+ ejercicios', href: '/practica/ingles/a1/gramatica',
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Writing',
    desc: '5 tareas guiadas con modelo del texto, banco de vocabulario y lista de verificación antes de enviar.',
    count: '5 prompts guiados', href: '/practica/ingles/a1/escritura',
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Speaking',
    desc: '15 frases de supervivencia con pronunciación detallada, notas fonéticas y guía para hispanohablantes.',
    count: '15 frases esenciales', href: '/practica/ingles/a1/habla',
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulary',
    desc: '6 sets temáticos (familia, colores, comida, días, cuerpo, números). Flashcards + 3 modos de práctica.',
    count: '6 sets · 60+ palabras', href: '/practica/ingles/a1/vocabulario',
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Listening',
    ...listeningCard('ingles', 'a1', '«The Corner Shop»: Maya, su abuelo y el local vacío de la esquina, en veinte diálogos con voz nativa.'),
    href: '/practica/ingles/a1/escucha',
  },
]

const COLORS: Record<string, string> = {
  lectura: '#0066cc', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
}

export default function InglesA1Client() {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const count = HABILIDADES.filter(h =>
      getSkillProgress('ingles', 'a1', h.id)?.completed,
    ).length
    setCompletedCount(count)
  }, [])

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Inglés A1 — Principiante</p>
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
            </div>
          </div>
          <XPStreak showMotivation />
        </div>

        {/* Level progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.75rem 0 2rem', flexWrap: 'wrap' }}>
          <ProgressBar completed={completedCount} total={HABILIDADES.length} color={COLOR} />
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            {completedCount === 0
              ? 'Ninguna habilidad completada todavía'
              : completedCount === HABILIDADES.length
              ? '¡Nivel A1 completado!'
              : `${completedCount} de ${HABILIDADES.length} habilidades completadas`}
          </span>
        </div>

        {/* Habilidad grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {HABILIDADES.map(h => {
            const c = COLORS[h.id] ?? COLOR
            return (
              <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{
                  padding: '1.4rem 1.5rem',
                  border: `1.5px solid ${c}33`,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${c}0a 0%, transparent 100%)`,
                  borderTop: `3px solid ${c}`,
                  height: '100%', boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  transition: 'box-shadow 0.18s, border-color 0.18s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{h.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{h.name}</div>
                      <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.eng}</div>
                    </div>
                    <SkillCompletionBadge lang="ingles" level="a1" skill={h.id} color={c} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{h.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.7rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.count}</span>
                    <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Tip */}
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Empieza por <strong style={{ color: COLOR }}>Lectura</strong> para activar vocabulario, luego refuerza con <strong style={{ color: '#7c3aed' }}>Gramática</strong>. Usa <strong style={{ color: '#e11d48' }}>Vocabulario</strong> para repasar las palabras del texto en flashcards.
        </div>
      </div>
    </section>
  )
}
