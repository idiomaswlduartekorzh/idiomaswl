'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSavedWords, removeWord, type SavedWord } from '@/lib/progress'

const LANG_LABELS: Record<string, { label: string; flag: string }> = {
  ingles:    { label: 'Inglés',    flag: '🇬🇧' },
  aleman:    { label: 'Alemán',    flag: '🇩🇪' },
  frances:   { label: 'Francés',   flag: '🇫🇷' },
  italiano:  { label: 'Italiano',  flag: '🇮🇹' },
  portugues: { label: 'Portugués', flag: '🇧🇷' },
  ruso:      { label: 'Ruso',      flag: '🇷🇺' },
  coreano:   { label: 'Coreano',   flag: '🇰🇷' },
  japones:   { label: 'Japonés',   flag: '🇯🇵' },
}

export default function MiVocabularioClient() {
  const [words, setWords] = useState<SavedWord[]>([])
  const [flashcard, setFlashcard] = useState<{ word: SavedWord; flipped: boolean } | null>(null)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flashcardLang, setFlashcardLang] = useState<string | null>(null)

  useEffect(() => {
    setWords(getSavedWords())
  }, [])

  function handleDelete(word: string, lang: string) {
    removeWord(word, lang)
    setWords(getSavedWords())
  }

  const byLang = words.reduce<Record<string, SavedWord[]>>((acc, w) => {
    if (!acc[w.lang]) acc[w.lang] = []
    acc[w.lang].push(w)
    return acc
  }, {})

  const flashcardWords = flashcardLang ? (byLang[flashcardLang] ?? []) : words
  const current = flashcardWords[flashcardIndex]

  function startFlashcards(lang: string | null) {
    setFlashcardLang(lang)
    setFlashcardIndex(0)
    setFlashcard(current ? { word: flashcardWords[0], flipped: false } : null)
  }

  function nextCard() {
    const next = flashcardIndex + 1
    if (next >= flashcardWords.length) {
      setFlashcard(null)
      return
    }
    setFlashcardIndex(next)
    setFlashcard({ word: flashcardWords[next], flipped: false })
  }

  if (flashcard) {
    const fc = flashcard
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <button onClick={() => setFlashcard(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>
              Mi Vocabulario
            </button>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>Flashcards</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <p style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {flashcardIndex + 1} / {flashcardWords.length}
            </p>
            <button onClick={() => setFlashcard(null)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem' }}>
              ✕ Salir
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 4, marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((flashcardIndex + 1) / flashcardWords.length) * 100}%`, background: '#2563eb', transition: 'width 0.35s', borderRadius: 4 }} />
          </div>

          {/* Card */}
          <div
            onClick={() => setFlashcard({ ...fc, flipped: !fc.flipped })}
            style={{
              minHeight: 220,
              borderRadius: 20,
              border: '1.5px solid var(--line-soft)',
              background: fc.flipped
                ? 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 100%)'
                : 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '2rem',
              textAlign: 'center',
              transition: 'background 0.25s',
              marginBottom: '1rem',
              userSelect: 'none',
            }}
          >
            {!fc.flipped ? (
              <>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  {fc.word.word}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {LANG_LABELS[fc.word.lang]?.flag} {LANG_LABELS[fc.word.lang]?.label}
                </div>
                <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                  Toca para ver la traducción
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '0.72rem', color: '#2563eb', fontFamily: 'var(--mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Traducción
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>
                  {fc.word.translation}
                </div>
                {fc.word.context && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', maxWidth: 320 }}>
                    "{fc.word.context}"
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center' }}>
            <button className="btn btn-sm" onClick={nextCard} style={{ minWidth: 120 }}>
              {flashcardIndex + 1 < flashcardWords.length ? 'Siguiente →' : 'Terminar ✓'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>📖 Mi Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />Tu colección personal
        </p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Mi Vocabulario
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          Palabras guardadas durante tu práctica. Repásalas con flashcards para consolidarlas.
        </p>

        {words.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 2rem',
            border: '1.5px dashed var(--line-soft)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', margin: '0 0 0.5rem' }}>
              Aún no has guardado palabras
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: 360, margin: '0 auto 1.5rem' }}>
              Cuando veas 🔖 en un ejercicio, toca para guardar la palabra aquí.
            </p>
            <Link href="/practica" className="btn btn-sm">
              Ir a practicar →
            </Link>
          </div>
        ) : (
          <>
            {/* Flashcard CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.07) 0%, transparent 100%)',
              border: '1.5px solid rgba(37,99,235,0.2)',
              borderRadius: 14,
              marginBottom: '2rem',
            }}>
              <div>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>
                  {words.length} palabra{words.length !== 1 ? 's' : ''} guardada{words.length !== 1 ? 's' : ''}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '0.82rem', marginLeft: '0.5rem' }}>
                  · {Object.keys(byLang).length} idioma{Object.keys(byLang).length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setFlashcardLang(null)
                  setFlashcardIndex(0)
                  setFlashcard({ word: words[0], flipped: false })
                }}
                style={{ background: '#2563eb', borderColor: '#2563eb', fontSize: '0.85rem' }}
              >
                🃏 Repasar todo
              </button>
            </div>

            {/* Words by language */}
            {Object.entries(byLang).map(([lang, langWords]) => {
              const meta = LANG_LABELS[lang] ?? { label: lang, flag: '🌐' }
              return (
                <div key={lang} style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span>{meta.flag}</span>
                      <span>{meta.label}</span>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--muted)' }}>
                        ({langWords.length})
                      </span>
                    </h2>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setFlashcardLang(lang)
                        setFlashcardIndex(0)
                        setFlashcard({ word: langWords[0], flipped: false })
                      }}
                      style={{ fontSize: '0.75rem' }}
                    >
                      🃏 Repasar {meta.label}
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {langWords.map(w => (
                      <div
                        key={w.word + w.savedAt}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.75rem 1rem',
                          borderRadius: 12,
                          border: '1px solid var(--line-soft)',
                          background: 'var(--bg)',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)' }}>{w.word}</span>
                            <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>→</span>
                            <span style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>{w.translation}</span>
                          </div>
                          {w.context && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                              {w.context}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(w.word, w.lang)}
                          title="Eliminar palabra"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--muted)',
                            fontSize: '1rem',
                            lineHeight: 1,
                            padding: '0.25rem',
                            borderRadius: 6,
                            flexShrink: 0,
                            transition: 'color 0.15s',
                          }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#dc2626')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </section>
  )
}
