'use client';

import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getStreakInfo, getTotalXP, getTotalCompletedSkills } from '@/lib/progress';

// ─────────────────────────────────────────────────────────────────────────────
// Exam catalogue
// ─────────────────────────────────────────────────────────────────────────────

interface ExamEntry {
  slug: string; flag: string; name: string; tagline: string; color: string; href: string; tools: string;
}

const EXAMS: ExamEntry[] = [
  { slug: 'ielts',  flag: '🇬🇧', name: 'IELTS Academic', tagline: 'Reading T/F/NG · Writing Task 1 y Task 2 · Feedback inmediato — Band 6–8.',          color: 'var(--wl-on-panel-link, #0f3d8c)', href: '/practica/ielts',         tools: '3 tipos de ejercicio' },
  { slug: 'toefl',  flag: '🇺🇸', name: 'TOEFL iBT',      tagline: 'Lectura académica con opción múltiple y explicaciones detalladas — Nivel B2–C1.',    color: 'var(--wl-on-panel-link, #1a4fcc)', href: '/practica/toefl',         tools: '1 pasaje · 6 preguntas'  },
  { slug: 'icfes',  flag: '🇨🇴', name: 'ICFES Saber 11', tagline: 'Gramática, conectores, sinónimos, inferencia, ruta adaptativa y cuadernillos oficiales.',       color: 'var(--wl-on-panel-alert, #dc2626)', href: '/practica/icfes-saber-11', tools: 'Gramática + Simulacros' },
];

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
  { slug: 'english',    flag: '🇬🇧', name: 'Inglés',    tagline: 'Lectura A1, gramática interactiva, escritura y frases de supervivencia.',  color: 'var(--wl-on-panel-link, #0066cc)', available: true,  href: '/practica/ingles',    tools: '4 habilidades A1' },
  { slug: 'german',     flag: '🇩🇪', name: 'Alemán',    tagline: 'Lesen, Grammatik, Schreiben y Sprechen — nivel A1.',                        color: 'var(--wl-on-panel-alert, #dd0000)', available: true,  href: '/practica/aleman',    tools: '4 habilidades A1' },
  { slug: 'french',     flag: '🇫🇷', name: 'Francés',   tagline: 'Lecture, grammaire, écriture y expression orale — nivel A1.',              color: 'var(--wl-on-panel-link, #003189)', available: true,  href: '/practica/frances',   tools: '4 habilidades A1' },
  { slug: 'italian',    flag: '🇮🇹', name: 'Italiano',  tagline: 'Artículos, tiempos verbales y gramática interactiva — nivel A1.',         color: 'var(--wl-on-panel-ok, #009246)', available: true,  href: '/practica/italiano',  tools: '6 habilidades A1' },
  { slug: 'portuguese', flag: '🇧🇷', name: 'Portugués', tagline: 'Leitura, gramática, escrita y expressão oral — nivel A1.',                  color: 'var(--wl-on-panel-ok, #009c3b)', available: true,  href: '/practica/portugues', tools: '4 habilidades A1' },
  { slug: 'russian',    flag: '🇷🇺', name: 'Ruso',      tagline: 'Alfabeto cirílico, casos, pronunciación y gramática — nivel A1.',           color: 'var(--wl-on-panel-alert, #cc0000)', available: true,  href: '/practica/ruso',      tools: '6 habilidades A1' },
  { slug: 'korean',     flag: '🇰🇷', name: 'Coreano',   tagline: 'Hangul, batchim, partículas y pronunciación interactiva.',                  color: 'var(--wl-on-panel-link, #534AB7)', available: true,  href: '/practica/coreano',   tools: '6 habilidades A1' },
  { slug: 'japanese',   flag: '🇯🇵', name: 'Japonés',   tagline: 'Hiragana, katakana, cópula は〜です y vocabulario — nivel A1.',              color: 'var(--wl-on-panel-alert, #bc002d)', available: true,  href: '/practica/japones',   tools: '6 habilidades A1' },
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
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--wl-on-panel-warn, #d97706)' }}>
                  🔥 {globalStats.streak} {globalStats.streak === 1 ? 'día' : 'días'}
                </span>
              )}
              {globalStats.xp > 0 && (
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--wl-on-panel-link, #2563eb)' }}>
                  ⚡ {globalStats.xp} XP
                </span>
              )}
              {globalStats.skills > 0 && (
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--wl-on-panel-ok, #059669)' }}>
                  ✓ {globalStats.skills} habilidad{globalStats.skills !== 1 ? 'es' : ''} completada{globalStats.skills !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}

          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: `${globalStats ? '0' : '0'} 0 2rem` }}>
            Practica para tu examen o elige un idioma para desarrollar tus habilidades.
          </p>

          {/* Exam cards — same grid as language cards */}
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
            Práctica de exámenes
          </p>
          <div className="wl-exams-catalog" style={{ marginBottom: '2.5rem' }}>
            {EXAMS.map(ex => (
              <Link
                key={ex.slug}
                href={ex.href}
                className="wl-catalog-card"
                style={{ '--exam-color': ex.color, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' } as CSSProperties}
              >
                <div className="wl-catalog-card__bar" />
                <div className="wl-catalog-card__body">
                  <div className="wl-catalog-card__top">
                    <span className="wl-catalog-card__flag">{ex.flag}</span>
                    <span className="wl-catalog-card__badge" style={{ background: 'rgba(83,74,183,0.08)', color: 'var(--wl-on-panel-link, #534AB7)', borderColor: 'rgba(83,74,183,0.25)' }}>Disponible</span>
                  </div>
                  <h2 className="wl-catalog-card__name">{ex.name}</h2>
                  <p className="wl-catalog-card__tagline">{ex.tagline}</p>
                </div>
                <div className="wl-catalog-card__footer">
                  <span>{ex.tools}</span>
                  <span className="wl-catalog-card__cta">Practicar →</span>
                </div>
              </Link>
            ))}
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
                        : <span className="wl-catalog-card__badge" style={{ background:'rgba(83,74,183,0.08)', color:'var(--wl-on-panel-link, #534AB7)', borderColor:'rgba(83,74,183,0.25)' }}>Disponible</span>
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
