'use client';

import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getStreakInfo, getTotalXP, getTotalCompletedSkills } from '@/lib/progress';

// ─────────────────────────────────────────────────────────────────────────────
// Language catalogue
// ─────────────────────────────────────────────────────────────────────────────

interface LangEntry {
  slug: string;
  flag: string;
  name: string;
  tagline: string;
  color: string;
  available: boolean;
  href?: string;
  tools?: string;
}

const LANGUAGES: LangEntry[] = [
  { slug: 'english',    flag: '🇬🇧', name: 'Inglés',    tagline: 'Lectura A1, gramática interactiva, escritura y frases de supervivencia.',  color: '#0066cc', available: true,  href: '/practica/ingles',    tools: '4 habilidades A1' },
  { slug: 'german',     flag: '🇩🇪', name: 'Alemán',    tagline: 'Lesen, Grammatik, Schreiben y Sprechen — nivel A1.',                        color: '#dd0000', available: true,  href: '/practica/aleman',    tools: '4 habilidades A1' },
  { slug: 'french',     flag: '🇫🇷', name: 'Francés',   tagline: 'Lecture, grammaire, écriture y expression orale — nivel A1.',              color: '#003189', available: true,  href: '/practica/frances',   tools: '4 habilidades A1' },
  { slug: 'italian',    flag: '🇮🇹', name: 'Italiano',  tagline: 'Artículos, tiempos verbales y gramática interactiva — nivel A1.',         color: '#009246', available: true,  href: '/practica/italiano',  tools: '6 habilidades A1' },
  { slug: 'portuguese', flag: '🇧🇷', name: 'Portugués', tagline: 'Leitura, gramática, escrita y expressão oral — nivel A1.',                  color: '#009c3b', available: true,  href: '/practica/portugues', tools: '4 habilidades A1' },
  { slug: 'russian',    flag: '🇷🇺', name: 'Ruso',      tagline: 'Alfabeto cirílico, casos, pronunciación y gramática — nivel A1.',           color: '#cc0000', available: true,  href: '/practica/ruso',      tools: '6 habilidades A1' },
  { slug: 'korean',     flag: '🇰🇷', name: 'Coreano',   tagline: 'Hangul, batchim, partículas y pronunciación interactiva.',                  color: '#534AB7', available: true,  href: '/practica/coreano',   tools: '6 habilidades A1' },
  { slug: 'japanese',   flag: '🇯🇵', name: 'Japonés',   tagline: 'Hiragana, katakana, cópula は〜です y vocabulario — nivel A1.',              color: '#bc002d', available: true,  href: '/practica/japones',   tools: '6 habilidades A1' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticaClient() {
  const [globalStats, setGlobalStats] = useState<{ streak: number; xp: number; skills: number } | null>(null);

  useEffect(() => {
    const streak = getStreakInfo();
    const totalXp = getTotalXP();
    const skills = getTotalCompletedSkills();
    if (totalXp > 0 || skills > 0 || streak.count > 0) {
      setGlobalStats({ streak: streak.count, xp: totalXp, skills });
    }
  }, []);

  return (
      <section className="wl-section">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Herramientas gratuitas de práctica
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
              Elige una herramienta
            </h1>
            <Link href="/practica/mi-vocabulario" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.45rem 0.9rem', borderRadius: 20,
                border: '1.5px solid var(--line-soft)',
                background: 'var(--bg)',
                fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700,
                color: 'var(--ink)', transition: 'border-color 0.15s',
              }}>
                📖 Mi Vocabulario
              </div>
            </Link>
          </div>

          {/* Global progress stats */}
          {globalStats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.25rem 0 1.5rem', flexWrap: 'wrap' }}>
              {globalStats.streak > 0 && (
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: '#d97706' }}>
                  🔥 {globalStats.streak} {globalStats.streak === 1 ? 'día' : 'días'}
                </span>
              )}
              {globalStats.xp > 0 && (
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: '#2563eb' }}>
                  ⚡ {globalStats.xp} XP
                </span>
              )}
              {globalStats.skills > 0 && (
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: '#059669' }}>
                  ✓ {globalStats.skills} habilidad{globalStats.skills !== 1 ? 'es' : ''} completada{globalStats.skills !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}

          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: `${globalStats ? '0' : '0'} 0 2rem` }}>
            Desglose silábico, pronunciación interactiva y práctica de estrés para exámenes.
          </p>

          {/* Exam practice block */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
              Práctica de exámenes
            </p>

            {/* IELTS hub card */}
            <Link
              href="/practica/ielts"
              style={{
                display: 'flex', alignItems: 'stretch', textDecoration: 'none', color: 'inherit',
                background: 'linear-gradient(135deg, rgba(15,61,140,0.07) 0%, rgba(37,99,235,0.04) 100%)',
                border: '1.5px solid rgba(15,61,140,0.2)', borderRadius: 18, overflow: 'hidden',
                marginBottom: '0.75rem', transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(15,61,140,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,61,140,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,61,140,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #0f3d8c, #2563eb)', flexShrink: 0 }} />
              <div style={{ padding: '1.4rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.55rem' }}>
                  <span style={{ fontSize: '1.9rem' }}>🇬🇧</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>IELTS Academic</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#0f3d8c', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        DISPONIBLE
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      Reading · Writing Task 1 · Writing Task 2 — Band 6–8
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {['📖 Reading T/F/NG', '📊 Writing Task 1', '✍️ Writing Task 2', '🎯 Feedback inmediato'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(15,61,140,0.08)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#0f3d8c', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>

            {/* TOEFL hub card */}
            <Link
              href="/practica/toefl"
              style={{
                display: 'flex', alignItems: 'stretch', textDecoration: 'none', color: 'inherit',
                background: 'linear-gradient(135deg, rgba(26,79,204,0.06) 0%, rgba(59,130,246,0.03) 100%)',
                border: '1.5px solid rgba(26,79,204,0.18)', borderRadius: 18, overflow: 'hidden',
                marginBottom: '0.75rem', transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,79,204,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,79,204,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,79,204,0.18)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #1a4fcc, #3b82f6)', flexShrink: 0 }} />
              <div style={{ padding: '1.1rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.45rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>🇺🇸</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>TOEFL iBT — Reading</span>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, background: '#1a4fcc', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>NUEVO</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.1rem' }}>Multiple Choice · Pasaje académico sobre bioluminescencia</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['📖 6 preguntas', '🎯 Opción múltiple', '💡 Explicaciones detalladas', '⏱️ Nivel B2-C1'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(26,79,204,0.08)', color: '#1a4fcc', border: '1px solid rgba(26,79,204,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#1a4fcc', fontSize: '1.1rem', fontWeight: 700 }}>→</div>
            </Link>

            {/* English Comprehension card */}
            <Link
              href="/practica/the-grandmothers-ledger"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, rgba(5,150,105,0.07) 0%, rgba(16,185,129,0.04) 100%)',
                border: '1.5px solid rgba(5,150,105,0.2)',
                borderRadius: 18,
                overflow: 'hidden',
                marginBottom: '0.75rem',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(5,150,105,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(5,150,105,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(5,150,105,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #059669, #10b981)', flexShrink: 0 }} />
              <div style={{ padding: '1.4rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.55rem' }}>
                  <span style={{ fontSize: '1.9rem' }}>🎙️</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>The Grandmother&apos;s Ledger</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#059669', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        NUEVO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      English B1–B2 · Reading + Listening comprehension · Family dispute story
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {['🎙 2 voice notes', '📖 Reading + Listening', '🧠 19 questions', '📊 Feedback B1–B2'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#059669', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>

            {/* ICFES card */}
            <Link
              href="/practica/icfes-saber-11"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(83,74,183,0.05) 100%)',
                border: '1.5px solid rgba(220,38,38,0.2)',
                borderRadius: 18,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(220,38,38,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #dc2626, #534AB7)', flexShrink: 0 }} />
              <div style={{ padding: '1.5rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '2rem' }}>🇨🇴</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)' }}>ICFES Saber 11</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#dc2626', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        NUEVO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      Juego adaptativo · 4 niveles · Detecta tus puntos débiles
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  {['🧠 Adaptativo', '💾 Checkpoint', '📋 Avisos + Diálogos', '📖 Lectura + Gramática'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 6, background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="/practica/icfes-saber-11/examenes"
                  onClick={e => e.stopPropagation()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', fontFamily: 'var(--mono)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  📄 Simulacros con cuadernillos oficiales (2019, 2022, 2023) →
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#dc2626', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>
          </div>

          {/* Language tools */}
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
            Herramientas de idiomas
          </p>
          <div className="wl-exams-catalog">
            {LANGUAGES.map(lang => {
              const cardStyle = {
                '--exam-color': lang.color,
                textAlign: 'left' as const,
                cursor: lang.available ? 'pointer' : 'default',
                appearance: 'none' as const,
                WebkitAppearance: 'none' as const,
                margin: 0,
                padding: 0,
                font: 'inherit',
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column' as const,
              } as CSSProperties;

              const inner = (
                <>
                  <div className="wl-catalog-card__bar" />
                  <div className="wl-catalog-card__body">
                    <div className="wl-catalog-card__top">
                      <span className="wl-catalog-card__flag">{lang.flag}</span>
                      {!lang.available
                        ? <span className="wl-catalog-card__badge">Próximamente</span>
                        : <span className="wl-catalog-card__badge" style={{ background:'rgba(83,74,183,0.08)', color:'#534AB7', borderColor:'rgba(83,74,183,0.25)' }}>Disponible</span>
                      }
                    </div>
                    <h2 className="wl-catalog-card__name">{lang.name}</h2>
                    <p className="wl-catalog-card__tagline">{lang.tagline}</p>
                  </div>
                  <div className="wl-catalog-card__footer">
                    <span>{lang.available ? (lang.tools ?? '3 herramientas') : 'En desarrollo'}</span>
                    <span className="wl-catalog-card__cta">
                      {lang.available ? 'Practicar →' : 'Próximamente'}
                    </span>
                  </div>
                </>
              );

              if (lang.available && lang.href) {
                return (
                  <Link
                    key={lang.slug}
                    href={lang.href}
                    className={`wl-catalog-card`}
                    style={cardStyle}
                  >
                    {inner}
                  </Link>
                );
              }

              return (
                <button
                  key={lang.slug}
                  className={`wl-catalog-card${!lang.available ? ' wl-catalog-card--soon' : ''}`}
                  style={cardStyle}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
}
