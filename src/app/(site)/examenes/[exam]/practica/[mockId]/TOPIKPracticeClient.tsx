'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Exam } from '@/data/exams';
import type { MockExam, MCQQuestion } from '@/data/mocks/types';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

// ── Constants ─────────────────────────────────────────────────────────────────

const WA_NUMBER = '573005004253';
const OPTION_LABELS = ['①', '②', '③', '④'];

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'quiz' | 'lead' | 'results';

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
  bar: number; // 0-100 for progress bar
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function getLevelInfo(correct: number, total: number): LevelInfo {
  const pct = correct / total;
  if (pct >= 0.7) {
    return {
      level: 'Nivel 2',
      levelKr: '2급 (이급)',
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.15)',
      border: 'rgba(37,99,235,0.4)',
      emoji: '🥈',
      desc: '¡Excelente resultado! Manejas vocabulario y gramática básica con fluidez. Puedes comunicarte en situaciones cotidianas en coreano.',
      topikEquiv: 'Equivalente a TOPIK I — Nivel 2 (140+ puntos sobre 200)',
      nextStep: 'Con clases especializadas puedes consolidar tu nivel y avanzar hacia el TOPIK II en 6-12 meses.',
      bar: Math.round(pct * 100),
    };
  }
  if (pct >= 0.4) {
    return {
      level: 'Nivel 1',
      levelKr: '1급 (일급)',
      color: '#059669',
      bg: 'rgba(5,150,105,0.15)',
      border: 'rgba(5,150,105,0.4)',
      emoji: '🥉',
      desc: 'Tienes los fundamentos del coreano. Reconoces vocabulario esencial y comprendes textos y avisos simples.',
      topikEquiv: 'Equivalente a TOPIK I — Nivel 1 (80–139 puntos sobre 200)',
      nextStep: 'Con práctica consistente puedes subir a Nivel 2 en 3-6 meses. Un método estructurado acelera el proceso.',
      bar: Math.round(pct * 100),
    };
  }
  return {
    level: 'Iniciante',
    levelKr: '기초 (기초)',
    color: '#c8202e',
    bg: 'rgba(200,32,46,0.15)',
    border: 'rgba(200,32,46,0.4)',
    emoji: '🌱',
    desc: 'Estás en la etapa inicial del aprendizaje del coreano. ¡Todos los hablantes avanzados empezaron aquí!',
    topikEquiv: 'Pre-TOPIK I — Nivel básico (Hangul + vocabulario elemental)',
    nextStep: 'Una base bien construida desde el principio te permite alcanzar Nivel 1 en 4-8 meses con el método adecuado.',
    bar: Math.max(Math.round(pct * 100), 8),
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function flattenQuestions(mock: MockExam): MCQQuestion[] {
  return mock.sections.flatMap(s => s.questions as MCQQuestion[]);
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  exam: Exam;
  mock: MockExam;
}

export default function TOPIKPracticeClient({ exam, mock }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>('quiz');

  const allQ = useMemo(() => flattenQuestions(mock), [mock]);
  const totalQ = allQ.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQ;

  // Score (always computed so lead modal can show it)
  const score = useMemo(
    () => allQ.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0),
    [allQ, answers],
  );

  const levelInfo = useMemo(() => getLevelInfo(score, totalQ), [score, totalQ]);

  const examScoreStr = `${score}/${totalQ} — TOPIK I ${levelInfo.level}`;

  // Section scores for results breakdown
  const sectionScores = useMemo(() => {
    return mock.sections.map(sec => {
      const qs = sec.questions as MCQQuestion[];
      const correct = qs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0);
      return { title: sec.title, correct, total: qs.length };
    });
  }, [mock.sections, answers]);

  function handleAnswer(qId: string, optIdx: number) {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  }

  function handleSeeResults() {
    try {
      if (localStorage.getItem('wl_lead_captured') === '1') {
        setPhase('results');
        return;
      }
    } catch {}
    setPhase('lead');
  }

  function handleLeadClose() {
    setPhase('results');
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const waMsg = encodeURIComponent(
    `Hola! Acabo de hacer el diagnóstico TOPIK I en WeLearn y obtuve ${score}/30 (${levelInfo.level}). ¿Cómo puedo mejorar mi coreano?`,
  );
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  // ── Render: quiz phase ────────────────────────────────────────────────────

  if (phase === 'quiz' || phase === 'lead') {
    return (
      <>
        <style>{`
          /* ── Layout ─────────────────────────────────────────────────────── */
          .topik-wrap {
            min-height: 100vh;
            background: #0a0c1a;
            color: #fff;
            font-family: 'Pretendard', 'Apple SD Gothic Neo', system-ui, sans-serif;
          }
          /* ── Top bar ────────────────────────────────────────────────────── */
          .topik-bar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(10,12,26,0.92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 0.75rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .topik-bar-back {
            color: rgba(255,255,255,0.5);
            font-size: 0.8rem;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            transition: color 0.15s;
          }
          .topik-bar-back:hover { color: #fff; }
          .topik-bar-title {
            flex: 1;
            font-size: 0.95rem;
            font-weight: 700;
            color: rgba(255,255,255,0.9);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .topik-bar-progress {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.45);
            white-space: nowrap;
          }
          /* ── Progress strip ─────────────────────────────────────────────── */
          .topik-progress-strip {
            height: 3px;
            background: rgba(255,255,255,0.07);
          }
          .topik-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #003478, #c8202e);
            transition: width 0.3s ease;
          }
          /* ── Content ────────────────────────────────────────────────────── */
          .topik-content {
            max-width: 740px;
            margin: 0 auto;
            padding: 2rem 1.25rem 8rem;
          }
          /* ── Hero intro ─────────────────────────────────────────────────── */
          .topik-intro {
            text-align: center;
            padding: 2.5rem 1rem 2rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .topik-intro-flag {
            font-size: 3rem;
            display: block;
            margin-bottom: 0.75rem;
          }
          .topik-intro-badge {
            display: inline-block;
            background: rgba(0,52,120,0.35);
            border: 1px solid rgba(0,52,120,0.6);
            color: #7eb3ff;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.3rem 0.9rem;
            border-radius: 99px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 1rem;
          }
          .topik-intro-title {
            font-size: clamp(1.5rem, 4vw, 2rem);
            font-weight: 800;
            line-height: 1.2;
            margin: 0 0 0.75rem;
            color: #fff;
          }
          .topik-intro-sub {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.55);
            max-width: 520px;
            margin: 0 auto;
            line-height: 1.6;
          }
          /* ── Section header ─────────────────────────────────────────────── */
          .topik-section {
            margin-bottom: 2.5rem;
          }
          .topik-section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .topik-section-num {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(0,52,120,0.3);
            border: 1px solid rgba(0,52,120,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 800;
            color: #7eb3ff;
            flex-shrink: 0;
          }
          .topik-section-info {}
          .topik-section-title {
            font-size: 1rem;
            font-weight: 700;
            color: #fff;
            margin: 0 0 0.15rem;
          }
          .topik-section-instr {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.45);
            line-height: 1.4;
          }
          /* ── Question card ──────────────────────────────────────────────── */
          .topik-q-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 14px;
            padding: 1.25rem;
            margin-bottom: 1rem;
            transition: border-color 0.2s;
          }
          .topik-q-card--answered {
            border-color: rgba(0,52,120,0.35);
          }
          .topik-q-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            background: rgba(0,52,120,0.35);
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 800;
            color: #7eb3ff;
            margin-bottom: 0.75rem;
          }
          /* ── Stimulus (notice/passage) ──────────────────────────────────── */
          .topik-stimulus {
            background: rgba(255,255,255,0.04);
            border-left: 3px solid rgba(0,52,120,0.6);
            border-radius: 0 8px 8px 0;
            padding: 0.75rem 1rem;
            margin-bottom: 0.875rem;
          }
          .topik-stimulus-label {
            font-size: 0.65rem;
            font-weight: 800;
            color: #7eb3ff;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.4rem;
          }
          .topik-stimulus-text {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.85);
            line-height: 1.65;
            white-space: pre-line;
          }
          /* ── Question text ──────────────────────────────────────────────── */
          .topik-q-text {
            font-size: 1rem;
            font-weight: 600;
            color: rgba(255,255,255,0.92);
            line-height: 1.55;
            margin-bottom: 0.875rem;
          }
          /* ── Options ────────────────────────────────────────────────────── */
          .topik-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .topik-option {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255,255,255,0.04);
            border: 1.5px solid rgba(255,255,255,0.09);
            border-radius: 10px;
            padding: 0.65rem 0.875rem;
            cursor: pointer;
            transition: all 0.15s;
            text-align: left;
            width: 100%;
            font-family: inherit;
            color: rgba(255,255,255,0.75);
            font-size: 0.88rem;
            line-height: 1.4;
          }
          .topik-option:hover {
            background: rgba(0,52,120,0.2);
            border-color: rgba(0,52,120,0.5);
            color: #fff;
          }
          .topik-option--selected {
            background: rgba(0,52,120,0.25);
            border-color: #003478;
            color: #fff;
          }
          .topik-option-label {
            flex-shrink: 0;
            font-size: 1rem;
            font-weight: 700;
            color: #7eb3ff;
            width: 20px;
            text-align: center;
          }
          .topik-option--selected .topik-option-label {
            color: #93c5fd;
          }
          /* ── Sticky submit bar ──────────────────────────────────────────── */
          .topik-sticky {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            padding: 1rem 1.25rem;
            background: linear-gradient(to top, rgba(10,12,26,0.98) 70%, transparent);
          }
          .topik-sticky-inner {
            max-width: 740px;
            margin: 0 auto;
          }
          .topik-sticky-counter {
            text-align: center;
            font-size: 0.78rem;
            color: rgba(255,255,255,0.4);
            margin-bottom: 0.5rem;
          }
          .topik-sticky-counter span {
            color: rgba(255,255,255,0.8);
            font-weight: 700;
          }
          .topik-submit-btn {
            width: 100%;
            padding: 0.9rem;
            background: linear-gradient(135deg, #003478, #c8202e);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 1rem;
            font-weight: 800;
            font-family: inherit;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.1s;
            letter-spacing: 0.01em;
          }
          .topik-submit-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }
          .topik-submit-btn:not(:disabled):hover { opacity: 0.9; }
          .topik-submit-btn:not(:disabled):active { transform: scale(0.99); }
          /* ── Responsive ─────────────────────────────────────────────────── */
          @media (max-width: 600px) {
            .topik-bar { padding: 0.6rem 1rem; }
            .topik-content { padding: 1.5rem 1rem 7rem; }
            .topik-q-text { font-size: 0.93rem; }
          }
        `}</style>

        <div className="topik-wrap">
          {/* Top bar */}
          <div className="topik-bar">
            <Link href="/examenes/topik" className="topik-bar-back">
              ← Exámenes
            </Link>
            <div className="topik-bar-title">
              🇰🇷 <span>TOPIK I — 읽기 Diagnóstico</span>
            </div>
            <div className="topik-bar-progress">
              {answeredCount}/{totalQ}
            </div>
          </div>

          {/* Progress strip */}
          <div className="topik-progress-strip">
            <div
              className="topik-progress-fill"
              style={{ width: `${(answeredCount / totalQ) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="topik-content">
            {/* Hero intro */}
            <div className="topik-intro">
              <span className="topik-intro-flag">🇰🇷</span>
              <div className="topik-intro-badge">TOPIK I · 읽기 · Diagnóstico gratuito</div>
              <h1 className="topik-intro-title">¿Cuál es tu nivel de coreano?</h1>
              <p className="topik-intro-sub">
                Responde 30 preguntas de lectura al estilo TOPIK I y descubre si estás en
                Nivel 1, Nivel 2 o en etapa inicial. Sin tiempo límite. Sin registro previo.
              </p>
            </div>

            {/* Sections with questions */}
            {mock.sections.map((section, sIdx) => {
              const sectionQs = section.questions as MCQQuestion[];
              const qOffset = mock.sections
                .slice(0, sIdx)
                .reduce((acc, s) => acc + s.questions.length, 0);

              // Deduplicate consecutive stimuli for display
              const renderedStimuli = new Set<string>();

              return (
                <div key={section.part} className="topik-section">
                  <div className="topik-section-header">
                    <div className="topik-section-num">P{section.part}</div>
                    <div className="topik-section-info">
                      <div className="topik-section-title">{section.title}</div>
                      <div className="topik-section-instr">{section.instructions}</div>
                    </div>
                  </div>

                  {sectionQs.map((q, qIdx) => {
                    const globalIdx = qOffset + qIdx;
                    const selected = answers[q.id];
                    const isAnswered = selected !== undefined;
                    const stimKey = q.stimulus ?? '';
                    const showStimulus = q.stimulus && !renderedStimuli.has(stimKey);
                    if (q.stimulus) renderedStimuli.add(stimKey);

                    return (
                      <div
                        key={q.id}
                        className={`topik-q-card${isAnswered ? ' topik-q-card--answered' : ''}`}
                      >
                        <div className="topik-q-num">{globalIdx + 1}</div>

                        {showStimulus && (
                          <div className="topik-stimulus">
                            {q.stimulusLabel && (
                              <div className="topik-stimulus-label">{q.stimulusLabel}</div>
                            )}
                            <div className="topik-stimulus-text">{q.stimulus}</div>
                          </div>
                        )}

                        <div className="topik-q-text">{q.text}</div>

                        <div className="topik-options">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              className={`topik-option${selected === oIdx ? ' topik-option--selected' : ''}`}
                              onClick={() => handleAnswer(q.id, oIdx)}
                            >
                              <span className="topik-option-label">{OPTION_LABELS[oIdx]}</span>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Sticky submit bar */}
          <div className="topik-sticky">
            <div className="topik-sticky-inner">
              {!allAnswered && (
                <div className="topik-sticky-counter">
                  <span>{answeredCount}</span> de <span>{totalQ}</span> preguntas respondidas
                </div>
              )}
              <button
                className="topik-submit-btn"
                disabled={!allAnswered}
                onClick={handleSeeResults}
              >
                {allAnswered
                  ? '🇰🇷 Ver mi nivel de coreano →'
                  : `Responde todas las preguntas (${totalQ - answeredCount} restantes)`}
              </button>
            </div>
          </div>
        </div>

        {/* Lead capture overlay */}
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

  // ── Render: results phase ───────────────────────────────────────────────────

  const pct = Math.round((score / totalQ) * 100);

  return (
    <>
      <style>{`
        .topik-results {
          min-height: 100vh;
          background: #0a0c1a;
          color: #fff;
          font-family: 'Pretendard', 'Apple SD Gothic Neo', system-ui, sans-serif;
        }
        /* Top bar */
        .topik-res-bar {
          background: rgba(10,12,26,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .topik-res-bar a {
          color: rgba(255,255,255,0.45);
          font-size: 0.8rem;
          text-decoration: none;
        }
        .topik-res-bar a:hover { color: #fff; }
        /* Content */
        .topik-res-content {
          max-width: 680px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
        }
        /* Header celebrate */
        .topik-res-hero {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .topik-res-emoji {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 0.75rem;
          animation: topik-pop 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes topik-pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .topik-res-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.4rem;
        }
        .topik-res-title {
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          font-weight: 900;
          margin: 0 0 0.25rem;
          color: #fff;
        }
        .topik-res-kr {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1rem;
        }
        /* Score bar */
        .topik-res-scorebar {
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          height: 12px;
          max-width: 400px;
          margin: 0.75rem auto 0.4rem;
          overflow: hidden;
        }
        .topik-res-scorefill {
          height: 100%;
          border-radius: 99px;
          transition: width 1s cubic-bezier(0.22,1,0.36,1);
        }
        .topik-res-scorelabel {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 2rem;
        }
        .topik-res-scorelabel strong {
          color: #fff;
          font-size: 1.1rem;
        }
        /* Level card */
        .topik-res-levelcard {
          border-radius: 18px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          animation: topik-fadein 0.5s ease 0.1s both;
        }
        @keyframes topik-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .topik-res-levelcard-title {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          opacity: 0.65;
        }
        .topik-res-levelcard-equiv {
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .topik-res-levelcard-desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.75);
          margin-bottom: 0.875rem;
        }
        .topik-res-levelcard-next {
          font-size: 0.82rem;
          line-height: 1.55;
          color: rgba(255,255,255,0.55);
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        /* Section breakdown */
        .topik-res-breakdown {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 2rem;
          animation: topik-fadein 0.5s ease 0.2s both;
        }
        .topik-res-breakdown-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 1rem;
        }
        .topik-res-breakdown-row {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-bottom: 0.875rem;
        }
        .topik-res-breakdown-row:last-child { margin-bottom: 0; }
        .topik-res-bk-label {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
          flex: 1;
          min-width: 0;
        }
        .topik-res-bk-bar-wrap {
          flex: 2;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          height: 6px;
          overflow: hidden;
        }
        .topik-res-bk-bar {
          height: 100%;
          background: linear-gradient(90deg, #003478, #7eb3ff);
          border-radius: 99px;
        }
        .topik-res-bk-score {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          white-space: nowrap;
          min-width: 44px;
          text-align: right;
        }
        /* CTAs */
        .topik-res-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: topik-fadein 0.5s ease 0.3s both;
        }
        .topik-res-cta-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #003478, #c8202e);
          color: #fff;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.97rem;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.1s;
        }
        .topik-res-cta-primary:hover { opacity: 0.9; }
        .topik-res-cta-primary:active { transform: scale(0.99); }
        .topik-res-cta-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.5rem;
          background: #25D366;
          color: #fff;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.93rem;
          text-decoration: none;
          transition: background 0.15s;
        }
        .topik-res-cta-wa:hover { background: #1da851; }
        .topik-res-cta-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
          text-decoration: none;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: color 0.15s, border-color 0.15s;
        }
        .topik-res-cta-secondary:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.15);
        }
        /* Retry */
        .topik-res-retry {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.25);
        }
        .topik-res-retry button {
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .topik-res-retry button:hover { color: rgba(255,255,255,0.6); }
        @media (max-width: 600px) {
          .topik-res-bar { padding: 0.6rem 1rem; }
          .topik-res-content { padding: 2rem 1rem 3rem; }
        }
      `}</style>

      <div className="topik-results">
        {/* Top bar */}
        <div className="topik-res-bar">
          <Link href="/examenes/topik">← Volver a TOPIK I</Link>
        </div>

        <div className="topik-res-content">
          {/* Hero */}
          <div className="topik-res-hero">
            <span className="topik-res-emoji">{levelInfo.emoji}</span>
            <div className="topik-res-label">Tu nivel estimado de coreano</div>
            <h1 className="topik-res-title" style={{ color: levelInfo.color }}>
              {levelInfo.level}
            </h1>
            <div className="topik-res-kr">{levelInfo.levelKr}</div>

            <div className="topik-res-scorebar">
              <div
                className="topik-res-scorefill"
                style={{
                  width: `${levelInfo.bar}%`,
                  background: `linear-gradient(90deg, ${levelInfo.color}99, ${levelInfo.color})`,
                }}
              />
            </div>
            <div className="topik-res-scorelabel">
              <strong>{score}</strong> de {totalQ} correctas · {pct}%
            </div>
          </div>

          {/* Level card */}
          <div
            className="topik-res-levelcard"
            style={{
              background: levelInfo.bg,
              border: `1px solid ${levelInfo.border}`,
            }}
          >
            <div className="topik-res-levelcard-title" style={{ color: levelInfo.color }}>
              Equivalencia TOPIK
            </div>
            <div className="topik-res-levelcard-equiv" style={{ color: levelInfo.color }}>
              {levelInfo.topikEquiv}
            </div>
            <div className="topik-res-levelcard-desc">{levelInfo.desc}</div>
            <div className="topik-res-levelcard-next">
              📌 {levelInfo.nextStep}
            </div>
          </div>

          {/* Section breakdown */}
          <div className="topik-res-breakdown">
            <div className="topik-res-breakdown-title">Detalle por sección</div>
            {sectionScores.map((sec, i) => {
              const secPct = sec.total > 0 ? sec.correct / sec.total : 0;
              const secLabel = [
                'Parte 1 — 빈칸 채우기',
                'Parte 2 — 안내문 이해',
                'Parte 3 — 지문 독해',
              ][i] ?? sec.title;
              return (
                <div key={i} className="topik-res-breakdown-row">
                  <div className="topik-res-bk-label">{secLabel}</div>
                  <div className="topik-res-bk-bar-wrap">
                    <div
                      className="topik-res-bk-bar"
                      style={{ width: `${Math.round(secPct * 100)}%` }}
                    />
                  </div>
                  <div className="topik-res-bk-score">
                    {sec.correct}/{sec.total}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="topik-res-ctas">
            <Link href="/clases-de-coreano" className="topik-res-cta-primary">
              🇰🇷 Empezar clases de coreano con WeLearn
            </Link>

            <a href={waHref} target="_blank" rel="noopener noreferrer" className="topik-res-cta-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Hablar con un profesor por WhatsApp
            </a>

            <Link href="/examenes/topik" className="topik-res-cta-secondary">
              Ver información del TOPIK I
            </Link>
          </div>

          <div className="topik-res-retry">
            ¿Quieres volver a intentarlo?{' '}
            <button onClick={() => {
              setAnswers({});
              setPhase('quiz');
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
