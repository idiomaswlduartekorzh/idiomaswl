'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import type { Exam } from '@/data/exams';
import type { MockExam, MCQQuestion } from '@/data/mocks/types';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

// ── Constants ─────────────────────────────────────────────────────────────────

const WA_NUMBER = '573005004253';
const OPTION_LABELS = ['①', '②', '③', '④'];

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'lead' | 'results';

interface LevelInfo {
  level: string;
  levelKr: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
  desc: string;
  topikEquiv: string;
  nextStep: string;
  bar: number;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function getLevelInfo(correct: number, total: number): LevelInfo {
  const pct = correct / total;
  if (pct >= 0.7) {
    return {
      level: 'Nivel 2', levelKr: '2급 (이급)', color: '#2563eb',
      bg: 'rgba(37,99,235,0.1)', border: 'rgba(37,99,235,0.28)', emoji: '🥈',
      desc: '¡Excelente resultado! Manejas vocabulario y gramática básica con fluidez. Puedes comunicarte en situaciones cotidianas en coreano.',
      topikEquiv: 'Equivalente a TOPIK I — Nivel 2 (140+ puntos sobre 200)',
      nextStep: 'Con clases especializadas puedes consolidar tu nivel y avanzar hacia el TOPIK II en 6–12 meses.',
      bar: Math.round(pct * 100),
    };
  }
  if (pct >= 0.4) {
    return {
      level: 'Nivel 1', levelKr: '1급 (일급)', color: '#059669',
      bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.28)', emoji: '🥉',
      desc: 'Tienes los fundamentos del coreano. Reconoces vocabulario esencial y comprendes textos y avisos simples.',
      topikEquiv: 'Equivalente a TOPIK I — Nivel 1 (80–139 puntos sobre 200)',
      nextStep: 'Con práctica consistente puedes subir a Nivel 2 en 3–6 meses. Un método estructurado acelera el proceso.',
      bar: Math.round(pct * 100),
    };
  }
  return {
    level: 'Iniciante', levelKr: '기초', color: '#c8202e',
    bg: 'rgba(200,32,46,0.1)', border: 'rgba(200,32,46,0.28)', emoji: '🌱',
    desc: 'Estás en la etapa inicial del aprendizaje del coreano. ¡Todos los hablantes avanzados empezaron aquí!',
    topikEquiv: 'Pre-TOPIK I — Nivel básico (Hangul + vocabulario elemental)',
    nextStep: 'Una base bien construida desde el principio te permite alcanzar Nivel 1 en 4–8 meses con el método adecuado.',
    bar: Math.max(Math.round(pct * 100), 8),
  };
}

function flattenQuestions(mock: MockExam): MCQQuestion[] {
  return mock.sections.flatMap(s => s.questions as MCQQuestion[]);
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props { exam: Exam; mock: MockExam; }

export default function TOPIKPracticeClient({ exam, mock }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>('intro');
  const [activePart, setActivePart] = useState(0);

  const allQ = useMemo(() => flattenQuestions(mock), [mock]);
  const totalQ = allQ.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQ;

  const score = useMemo(
    () => allQ.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0),
    [allQ, answers],
  );
  const levelInfo = useMemo(() => getLevelInfo(score, totalQ), [score, totalQ]);
  const examScoreStr = `${score}/${totalQ} — TOPIK I ${levelInfo.level}`;

  const sectionScores = useMemo(() => mock.sections.map(sec => {
    const qs = sec.questions as MCQQuestion[];
    const correct = qs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0);
    const answered = qs.filter(q => answers[q.id] !== undefined).length;
    return { correct, total: qs.length, answered };
  }), [mock.sections, answers]);

  const handleAnswer = useCallback((qId: string, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  }, []);

  function handleSeeResults() {
    try { if (localStorage.getItem('wl_lead_captured') === '1') { setPhase('results'); return; } } catch {}
    setPhase('lead');
  }

  function handleLeadClose() { setPhase('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const waMsg = encodeURIComponent(`Hola! Acabo de hacer el diagnóstico TOPIK I en WeLearn y obtuve ${score}/30 (${levelInfo.level}). ¿Cómo puedo mejorar mi coreano?`);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  // ── Per-part instructions ─────────────────────────────────────────────────
  const PART_INSTRUCTIONS: Record<number, { icon: string; text: string }> = {
    1: { icon: '✏️', text: 'Lee cada oración y elige la palabra o expresión que mejor completa el espacio en blanco ( ).' },
    2: { icon: '📋', text: 'Lee el aviso o texto corto y responde la pregunta según la información que aparece.' },
    3: { icon: '📖', text: 'Lee el texto completo y elige la opción correcta según lo que dice el párrafo.' },
  };

  // ── TOPIK-specific minimal CSS (supplements prac-* from globals.css) ────────
  const topikCSS = `
    .topik-progress { height: 3px; background: rgba(255,255,255,0.1); }
    .topik-progress__fill { height: 100%; background: var(--exam-color, #003478); transition: width .3s; }
    .topik-topbar-count { font-size:.8rem; color:rgba(255,255,255,.55); }
    .topik-content { max-width: 740px; margin: 0 auto; padding: 1.5rem 1rem 6rem; }
    .topik-stimulus-shared { margin-bottom: 0; border-radius: 10px 10px 0 0; }
    .topik-stimulus-shared + .prac-question { border-top: none; border-radius: 0 0 10px 10px; margin-bottom: 1.5rem; }
    .topik-footer { border-top: 1px solid var(--line-soft); padding: 1.5rem 0 0; margin-top: 1rem; display: flex; flex-direction: column; gap: .75rem; }
    .topik-footer-nav { display: flex; gap: .75rem; }
    .topik-footer-nav > * { flex: 1; }
    .topik-footer-hint { font-size:.8rem; color:var(--muted); text-align:center; }
    /* ── Part instruction banner ── */
    .topik-instruction {
      display: flex; align-items: flex-start; gap: .65rem;
      background: rgba(0,52,120,0.06); border: 1px solid rgba(0,52,120,0.14);
      border-radius: 10px; padding: .75rem 1rem; margin-bottom: 1.5rem;
    }
    .topik-instruction__icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
    .topik-instruction__text { font-size: .88rem; color: var(--ink); line-height: 1.5; margin: 0; }
    /* ── Override option selected — make it clearly visible ── */
    .prac-option--selected {
      border-color: #003478 !important;
      background: rgba(0,52,120,0.10) !important;
      box-shadow: 0 0 0 2px rgba(0,52,120,0.18) !important;
    }
    .prac-option--selected .prac-option__letter {
      background: #003478 !important;
      color: #fff !important;
    }
    .prac-option--selected .prac-option__text {
      color: #003478 !important;
      font-weight: 600 !important;
    }
    .topik-results-content { max-width: 640px; margin: 0 auto; padding: 2.5rem 1rem 4rem; display: flex; flex-direction: column; gap: 1.25rem; }
    .topik-res-hero { text-align: center; padding-bottom: 1rem; border-bottom: 1px solid var(--line-soft); }
    .topik-res-emoji { font-size: 3.5rem; display: block; margin-bottom: .5rem; }
    .topik-res-eyebrow { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: .35rem; }
    .topik-res-title { font-size: clamp(1.8rem,5vw,2.6rem); font-weight: 900; margin: 0 0 .15rem; }
    .topik-res-kr { font-size: 1rem; color: var(--muted); margin-bottom: 1rem; }
    .topik-res-scorebar { background: var(--bg-2); border-radius: 99px; height: 10px; max-width: 360px; margin: 0 auto .4rem; overflow: hidden; }
    .topik-res-scorefill { height: 100%; border-radius: 99px; transition: width 1s cubic-bezier(.22,1,.36,1); }
    .topik-res-scoretext { font-size: .85rem; color: var(--muted); }
    .topik-res-scoretext strong { color: var(--ink); font-size: 1.1rem; }
    .topik-res-levelcard { border-radius: 14px; padding: 1.4rem; }
    .topik-res-levelcard-equiv { font-size: .85rem; font-weight: 700; margin-bottom: .6rem; }
    .topik-res-levelcard-desc { font-size: .9rem; color: var(--ink); line-height: 1.6; margin-bottom: .75rem; }
    .topik-res-levelcard-next { font-size: .82rem; color: var(--muted); line-height: 1.55; padding-top: .75rem; border-top: 1px solid var(--line-soft); }
    .topik-res-breakdown { background: var(--surface); border: 1px solid var(--line-soft); border-radius: 14px; padding: 1.25rem; }
    .topik-res-breakdown-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:var(--muted); margin-bottom:.875rem; }
    .topik-res-breakdown-row { display:flex; align-items:center; gap:.875rem; margin-bottom:.75rem; }
    .topik-res-breakdown-row:last-child { margin-bottom:0; }
    .topik-res-bk-label { font-size:.82rem; color:var(--muted); flex:1; min-width:0; }
    .topik-res-bk-bar-wrap { flex:2; background:var(--bg-2); border-radius:99px; height:6px; overflow:hidden; }
    .topik-res-bk-bar { height:100%; border-radius:99px; }
    .topik-res-bk-score { font-size:.8rem; font-weight:700; color:var(--ink); white-space:nowrap; min-width:40px; text-align:right; }
    .topik-res-ctas { display:flex; flex-direction:column; gap:.75rem; }
    .topik-res-cta-wa { display:flex; align-items:center; justify-content:center; gap:.5rem; padding:.85rem 1.5rem; background:#25D366; color:#fff; border-radius:10px; font-weight:700; font-size:.93rem; text-decoration:none; transition:background .15s; }
    .topik-res-cta-wa:hover { background:#1da851; }
    .topik-res-retry { text-align:center; margin-top:.5rem; }
    .topik-res-retry button { background:none; border:none; font:inherit; cursor:pointer; font-size:.82rem; color:var(--muted); text-decoration:underline; padding:0; }
    .topik-res-retry button:hover { color:var(--ink); }
    @media (max-width:600px) {
      .topik-footer-nav { flex-direction:column; }
      .topik-res-title { font-size:2rem; }
    }
  `;

  // ── Intro ───────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <>
        <style>{topikCSS}</style>
        <div className="prac-shell prac-shell--intro" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <div className="prac-intro">
            <p className="prac-intro__eyebrow">{exam.flag} {exam.name}</p>
            <h1 className="prac-intro__title">{mock.title}</h1>
            <p className="prac-intro__sub">{mock.subtitle ?? 'Descubre tu nivel de coreano con 30 preguntas al estilo oficial TOPIK I.'}</p>
            <div className="prac-intro__stats">
              <div className="prac-intro__stat">
                <span className="prac-intro__stat-val">{mock.sections.length}</span>
                <span className="prac-intro__stat-lbl">Partes</span>
              </div>
              <div className="prac-intro__stat">
                <span className="prac-intro__stat-val">{totalQ}</span>
                <span className="prac-intro__stat-lbl">Preguntas</span>
              </div>
              <div className="prac-intro__stat">
                <span className="prac-intro__stat-val">Libre</span>
                <span className="prac-intro__stat-lbl">Tiempo</span>
              </div>
            </div>
            <div className="prac-intro__sections">
              {mock.sections.map(sec => (
                <div key={sec.part} className="prac-intro__section">
                  <span className="prac-intro__section-part">Parte {sec.part}</span>
                  <span className="prac-intro__section-title">{sec.title}</span>
                  <span className="prac-intro__section-q">{sec.questions.length} preguntas</span>
                </div>
              ))}
            </div>
            <div className="prac-intro__tips">
              <p className="prac-intro__tips-title">Antes de empezar</p>
              <ul>
                <li>Navega entre las 3 partes usando las pestañas superiores.</li>
                <li>Lee los textos de apoyo antes de responder.</li>
                <li>Al finalizar verás tu nivel estimado (Iniciante / Nivel 1 / Nivel 2).</li>
                <li>Sin tiempo límite — tómate tu tiempo.</li>
              </ul>
            </div>
            <button
              onClick={() => { setActivePart(0); setPhase('quiz'); }}
              className="btn"
              style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}
            >
              Empezar diagnóstico TOPIK I 🇰🇷
            </button>
            <Link
              href="/examenes/topik"
              style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem', display: 'block' }}
            >
              Volver a TOPIK
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ── Quiz + lead ─────────────────────────────────────────────────────────────

  if (phase === 'quiz' || phase === 'lead') {
    const activeSection = mock.sections[activePart];
    const activeSectionQs = activeSection.questions as MCQQuestion[];
    const qOffset = mock.sections.slice(0, activePart).reduce((acc, s) => acc + s.questions.length, 0);
    const renderedStimuli = new Set<string>();

    return (
      <>
        <style>{topikCSS}</style>
        <div className="prac-shell" style={{ '--exam-color': exam.color } as React.CSSProperties}>

          {/* ── Topbar ── */}
          <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
            <div className="prac-topbar__left">
              <Link href="/examenes/topik" className="prac-topbar__back">← TOPIK I</Link>
              <span className="prac-topbar__title">🇰🇷 {mock.title}</span>
            </div>
            <span className="topik-topbar-count">{answeredCount}/{totalQ}</span>
          </header>

          {/* ── Progress strip ── */}
          <div className="topik-progress">
            <div className="topik-progress__fill" style={{ width: `${(answeredCount / totalQ) * 100}%` }} />
          </div>

          {/* ── Section tabs ── */}
          <div className="prac-section-tabs">
            {mock.sections.map((sec, idx) => {
              const sc = sectionScores[idx];
              // sec.title already contains "Parte X —" so we just show it directly
              return (
                <button
                  key={sec.part}
                  className={`prac-section-tab${activePart === idx ? ' prac-section-tab--active' : ''}`}
                  onClick={() => setActivePart(idx)}
                >
                  {sec.title}
                  <span className="prac-section-tab__count">{sc.answered}/{sc.total}</span>
                </button>
              );
            })}
          </div>

          {/* ── Questions ── */}
          <div className="topik-content">

            {/* Per-part instruction banner */}
            {PART_INSTRUCTIONS[activeSection.part] && (
              <div className="topik-instruction">
                <span className="topik-instruction__icon">{PART_INSTRUCTIONS[activeSection.part].icon}</span>
                <p className="topik-instruction__text">{PART_INSTRUCTIONS[activeSection.part].text}</p>
              </div>
            )}

            {activeSectionQs.map((q, qIdx) => {
              const globalIdx = qOffset + qIdx;
              const stimKey = q.stimulus ?? '';
              const showStimulus = q.stimulus && !renderedStimuli.has(stimKey);
              if (q.stimulus) renderedStimuli.add(stimKey);

              return (
                <div key={q.id}>
                  {showStimulus && (
                    <div className="prac-stimulus topik-stimulus-shared">
                      {q.stimulusLabel && <p className="prac-stimulus__label">{q.stimulusLabel}</p>}
                      <pre className="prac-stimulus__text">{q.stimulus}</pre>
                    </div>
                  )}

                  <div className="prac-question" style={{ marginBottom: '1rem' }}>
                    <div className="prac-question__header">
                      <span className="prac-question__num">Pregunta {globalIdx + 1}</span>
                    </div>
                    <p className="prac-question__text">{q.text}</p>
                    <div className="prac-options">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          className={`prac-option${answers[q.id] === oIdx ? ' prac-option--selected' : ''}`}
                          onClick={() => handleAnswer(q.id, oIdx)}
                        >
                          <span className="prac-option__letter">{OPTION_LABELS[oIdx]}</span>
                          <span className="prac-option__text">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Part navigation + submit ── */}
            <div className="topik-footer">
              <div className="topik-footer-nav">
                <button
                  className="btn btn-ghost"
                  onClick={() => { setActivePart(p => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={activePart === 0}
                >
                  ← Parte anterior
                </button>
                {activePart < mock.sections.length - 1 ? (
                  <button
                    className="btn"
                    style={{ background: exam.color, borderColor: exam.color }}
                    onClick={() => { setActivePart(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    Siguiente parte →
                  </button>
                ) : (
                  <button
                    className="btn"
                    style={allAnswered ? { background: exam.color, borderColor: exam.color } : {}}
                    disabled={!allAnswered}
                    onClick={handleSeeResults}
                  >
                    {allAnswered ? '🇰🇷 Ver mi nivel →' : `${totalQ - answeredCount} sin responder`}
                  </button>
                )}
              </div>
              {!allAnswered && (
                <p className="topik-footer-hint">
                  Responde todas las preguntas en las 3 partes para ver tus resultados.
                </p>
              )}
            </div>
          </div>
        </div>

        {phase === 'lead' && (
          <LeadCaptureModal
            examSlug="topik"
            examScore={examScoreStr}
            examName="TOPIK I (Coreano)"
            onClose={handleLeadClose}
          />
        )}
      </>
    );
  }

  // ── Results ─────────────────────────────────────────────────────────────────

  const pct = Math.round((score / totalQ) * 100);

  return (
    <>
      <style>{topikCSS}</style>
      <div className="prac-shell" style={{ '--exam-color': exam.color } as React.CSSProperties}>

        <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <div className="prac-topbar__left">
            <Link href="/examenes/topik" className="prac-topbar__back">← TOPIK I</Link>
            <span className="prac-topbar__title">🇰🇷 Resultados — {mock.title}</span>
          </div>
        </header>

        <div className="topik-results-content">

          {/* Hero */}
          <div className="topik-res-hero">
            <span className="topik-res-emoji">{levelInfo.emoji}</span>
            <div className="topik-res-eyebrow">Tu nivel estimado de coreano</div>
            <h1 className="topik-res-title" style={{ color: levelInfo.color }}>{levelInfo.level}</h1>
            <div className="topik-res-kr">{levelInfo.levelKr}</div>
            <div className="topik-res-scorebar">
              <div className="topik-res-scorefill" style={{ width: `${levelInfo.bar}%`, background: levelInfo.color }} />
            </div>
            <div className="topik-res-scoretext">
              <strong>{score}</strong> de {totalQ} correctas · {pct}%
            </div>
          </div>

          {/* Level card */}
          <div className="topik-res-levelcard" style={{ background: levelInfo.bg, border: `1px solid ${levelInfo.border}` }}>
            <div className="topik-res-levelcard-equiv" style={{ color: levelInfo.color }}>{levelInfo.topikEquiv}</div>
            <div className="topik-res-levelcard-desc">{levelInfo.desc}</div>
            <div className="topik-res-levelcard-next">📌 {levelInfo.nextStep}</div>
          </div>

          {/* Section breakdown */}
          <div className="topik-res-breakdown">
            <div className="topik-res-breakdown-title">Detalle por sección</div>
            {sectionScores.map((sec, i) => {
              const secPct = sec.total > 0 ? sec.correct / sec.total : 0;
              const labels = ['Parte 1 — 빈칸 채우기', 'Parte 2 — 안내문 이해', 'Parte 3 — 지문 독해'];
              return (
                <div key={i} className="topik-res-breakdown-row">
                  <div className="topik-res-bk-label">{labels[i] ?? `Parte ${i + 1}`}</div>
                  <div className="topik-res-bk-bar-wrap">
                    <div className="topik-res-bk-bar" style={{ width: `${Math.round(secPct * 100)}%`, background: levelInfo.color }} />
                  </div>
                  <div className="topik-res-bk-score">{sec.correct}/{sec.total}</div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="topik-res-ctas">
            <Link href="/clases-de-coreano" className="btn" style={{ textAlign: 'center', background: exam.color, borderColor: exam.color }}>
              🇰🇷 Empezar clases de coreano con WeLearn
            </Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="topik-res-cta-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Hablar con un profesor por WhatsApp
            </a>
            <Link href="/examenes/topik" className="btn btn-ghost" style={{ textAlign: 'center' }}>
              Ver información del TOPIK I
            </Link>
          </div>

          <div className="topik-res-retry">
            <button onClick={() => {
              setAnswers({}); setActivePart(0); setPhase('intro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Reiniciar diagnóstico
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
