'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { Exam } from '@/data/exams';

function Counter({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

function SectionArc({ pct, color, size = 72 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

interface Props { exam: Exam }

export default function ExamInfoGraphic({ exam }: Props) {
  const totalMins = exam.sections.reduce((acc, s) => {
    const m = parseInt(String(s.time));
    return acc + (isNaN(m) ? 0 : m);
  }, 0);
  const [scoreMin = '0', scoreMaxPart = exam.scoreRange] = exam.scoreRange.split('–');
  const scoreMax = scoreMaxPart.trim().match(/^[\d.]+/)?.[0] ?? scoreMaxPart.trim();

  return (
    <div>
      {/* ── Hero dark header ── */}
      <div
        className="wl-exam-hero"
        style={{ '--exam-color': exam.color, '--exam-color-dark': exam.colorDark } as React.CSSProperties}
      >
        <div className="wrap">
          <motion.p
            className="wl-exam-hero__eyebrow"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            {exam.flag} {exam.language}
          </motion.p>
          <motion.h1
            className="wl-exam-hero__title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            {exam.slug === 'toefl' ? 'Simulacros TOEFL iBT 2026' : exam.name}
          </motion.h1>
          <motion.p
            className="wl-exam-hero__sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {exam.tagline}
          </motion.p>
          <motion.p
            className="wl-exam-hero__desc"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}
          >
            {exam.description}
          </motion.p>

          {exam.slug === 'toefl' ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
              style={{ margin: '1.25rem 0 0' }}
            >
              <a href="#simulacros" className="btn">Elegir uno de los 20 simulacros →</a>
            </motion.p>
          ) : null}

          {/* Key stat pills */}
          <motion.div
            className="wl-exam-hero__pills"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.35 }}
          >
            {[
              { label: 'Secciones', value: String(exam.sections.length) },
              { label: 'Preguntas', value: String(exam.totalQuestions) },
              { label: 'Duración', value: exam.totalTime },
              { label: 'Puntaje', value: exam.scoreRange },
            ].map(p => (
              <div key={p.label} className="wl-exam-hero__pill">
                <span className="wl-exam-hero__pill-val">{p.value}</span>
                <span className="wl-exam-hero__pill-lbl">{p.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Section breakdown ── */}
      <section className="wl-section" style={{ background: 'var(--ink-bg)', color: 'var(--wl-on-inverse, #fff)' }}>
        <div className="wrap">
          <motion.p
            className="eyebrow wl-exam-readable-accent"
            style={{ color: exam.color, marginBottom: '0.5rem' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="wl-exam-readable-accent-bg" style={{ display: 'inline-block', height: 1, width: 28, background: exam.color, verticalAlign: 'middle', marginRight: 12 }} />
            Estructura del examen
          </motion.p>
          <motion.h2
            style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 2.5rem', color: '#fff' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {exam.sections.length} secciones · {exam.totalTime} · {exam.scoreRange} {exam.scoreName}
          </motion.h2>

          <div className="wl-section-grid">
            {exam.sections.map((sec, i) => {
              const pct = totalMins > 0 ? parseInt(sec.time) / totalMins : 0.25;
              return (
                <motion.article
                  key={sec.name}
                  className="wl-section-card"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <div className="wl-section-card__top">
                    <div className="wl-section-card__arc">
                      <SectionArc pct={Math.max(pct, 0.15)} color={sec.color} size={64} />
                      <span className="wl-section-card__icon">{sec.icon}</span>
                    </div>
                    <div>
                      <h3 className="wl-section-card__name">{sec.name}</h3>
                      <div className="wl-section-card__meta">
                        <span>{sec.time}</span>
                        <span>·</span>
                        <span>{sec.questions} {exam.slug === 'toefl' ? 'ítems base' : typeof sec.questions === 'number' && sec.questions > 2 ? 'preguntas' : 'tareas'}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="wl-section-card__types">
                    {sec.types.map(t => (
                      <li key={t} style={{ borderLeftColor: sec.color }}>{t}</li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Score scale ── */}
      <section className="wl-section" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <motion.p
            className="eyebrow" style={{ marginBottom: '0.5rem' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="ink-line" />Escala de puntuación
          </motion.p>
          <motion.h2
            style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 2rem' }}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {exam.scoreName}: {exam.scoreRange}
          </motion.h2>

          {/* Score bar */}
          <div className="wl-score-bar-wrap">
            <div className="wl-score-bar">
              <motion.div
                className="wl-score-bar__fill"
                style={{ background: `linear-gradient(90deg, ${exam.colorDark}, ${exam.color})` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
            </div>
            <div className="wl-score-bar__labels">
              <span>{scoreMin.trim()}</span>
              {exam.passing && (
                <span className="wl-exam-readable-accent" style={{ color: exam.color, fontWeight: 600 }}>
                  {exam.slug === 'toefl' ? 'Requisito: ' : '✓ Aprobado: '}{exam.passing}
                </span>
              )}
              <span>{scoreMax}</span>
            </div>
          </div>

          {/* Levels */}
          {exam.levels && (
            <div className="wl-levels-row">
              {exam.levels.map((lv, i) => (
                <motion.div
                  key={lv}
                  className="wl-level-chip"
                  style={{ background: `${exam.color}${Math.round(20 + (i / (exam.levels!.length - 1)) * 80).toString(16).padStart(2, '0')}` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  {lv}
                </motion.div>
              ))}
            </div>
          )}

          {/* Recognized by */}
          <div className="wl-recognized">
            <p className="eyebrow" style={{ marginBottom: '1rem' }}><span className="ink-line" />Reconocido por</p>
            {exam.recognized.map(r => (
              <div key={r} className="wl-recognized__item">
                <span className="wl-exam-readable-accent" style={{ color: exam.color }}>✓</span> {r}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
