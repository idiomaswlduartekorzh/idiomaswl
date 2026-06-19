'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { saveLead } from '@/lib/actions/saveLead';
import { saveExamResult } from '@/lib/actions/saveExamResult';
import type { Simulacro, SimulacroQuestion } from '@/data/mocks/icfes-simulacros';

// ── Computed section structure ────────────────────────────────────────────────

interface Section {
  part: number;
  title: string;
  qIndices: number[];
}

function sectionLabel(type: SimulacroQuestion['type']): string {
  switch (type) {
    case 'vocab':   return 'Vocabulario — Emparejamiento';
    case 'notice':  return 'Avisos e instrucciones';
    case 'dialog':  return 'Conversaciones';
    case 'gap':     return 'Completar el texto';
    case 'reading': return 'Comprensión de lectura';
  }
}

function computeSections(exam: Simulacro): Section[] {
  const sections: Section[] = [];
  let currentKey = '';
  exam.questions.forEach((q, i) => {
    const key = (q.type === 'gap' || q.type === 'reading') ? `${q.type}-${q.passageId}` : q.type;
    if (key !== currentKey) {
      currentKey = key;
      sections.push({ part: sections.length + 1, title: sectionLabel(q.type), qIndices: [i] });
    } else {
      sections[sections.length - 1].qIndices.push(i);
    }
  });
  return sections;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderGapPassage(text: string, activeN: number): React.ReactNode[] {
  const segs: React.ReactNode[] = [];
  const re = /\[(\d+)\]/g;
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push(text.slice(last, m.index));
    const n = parseInt(m[1]);
    const isActive = n === activeN;
    segs.push(
      <mark
        key={m.index}
        className={isActive ? 'cl__blank cl__blank--active' : 'cl__blank'}
      >
        [{m[1]}]
      </mark>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) segs.push(text.slice(last));
  return segs;
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function Timer({ totalSecs, onExpire }: { totalSecs: number; onExpire: () => void }) {
  const [secs, setSecs] = useState(totalSecs);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(prev => {
        if (prev <= 1) { clearInterval(id); onExpireRef.current(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pct = secs / totalSecs;
  const urgent = secs < 300;

  return (
    <div className={`prac-timer${urgent ? ' prac-timer--urgent' : ''}`}>
      <span className="prac-timer__label">Tiempo</span>
      <span className="prac-timer__val">{formatTime(secs)}</span>
      <div className="prac-timer__bar">
        <div className="prac-timer__fill" style={{ width: `${pct * 100}%`, background: urgent ? '#c8202e' : '#0f3d8c' }} />
      </div>
    </div>
  );
}

// ── Question nav sidebar ──────────────────────────────────────────────────────

function QuestionNav({
  total,
  current,
  answers,
  flagged,
  onJump,
}: {
  total: number;
  current: number;
  answers: Record<number, number>;
  flagged: Set<number>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="prac-nav">
      <p className="prac-nav__title">Preguntas</p>
      <div className="prac-nav__grid">
        {Array.from({ length: total }, (_, i) => {
          const answered = answers[i] !== undefined;
          const isFlagged = flagged.has(i);
          const isCurrent = i === current;
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={[
                'prac-nav__btn',
                isCurrent ? 'prac-nav__btn--current' : '',
                answered ? 'prac-nav__btn--answered' : '',
                isFlagged ? 'prac-nav__btn--flagged' : '',
              ].filter(Boolean).join(' ')}
              title={`Pregunta ${i + 1}${isFlagged ? ' (marcada)' : ''}`}
            >
              {i + 1}
              {isFlagged && <span className="prac-nav__flag">!</span>}
            </button>
          );
        })}
      </div>
      <div className="prac-nav__legend">
        <span><span className="prac-nav__dot prac-nav__dot--answered" />Respondida</span>
        <span><span className="prac-nav__dot prac-nav__dot--flagged" />Marcada</span>
        <span><span className="prac-nav__dot prac-nav__dot--unanswered" />Sin responder</span>
      </div>
    </div>
  );
}

// ── Section tabs ──────────────────────────────────────────────────────────────

function SectionTabs({
  sections,
  currentIdx,
  answers,
  total,
  onJump,
}: {
  sections: Section[];
  currentIdx: number;
  answers: Record<number, number>;
  total: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="prac-section-tabs">
      {sections.map(sec => {
        const answered = sec.qIndices.filter(i => answers[i] !== undefined).length;
        const isCurrent = sec.qIndices.includes(currentIdx);
        return (
          <button
            key={sec.part}
            onClick={() => onJump(sec.qIndices[0])}
            className={`prac-section-tab${isCurrent ? ' prac-section-tab--active' : ''}`}
          >
            <span>Parte {sec.part}</span>
            <span className="prac-section-tab__count">{answered}/{sec.qIndices.length}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Question view ─────────────────────────────────────────────────────────────

function QuestionView({
  exam,
  qIdx,
  total,
  answers,
  flagged,
  onAnswer,
  onFlag,
  onPrev,
  onNext,
  isLast,
  onSubmit,
}: {
  exam: Simulacro;
  qIdx: number;
  total: number;
  answers: Record<number, number>;
  flagged: Set<number>;
  onAnswer: (i: number) => void;
  onFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  onSubmit: () => void;
}) {
  const q = exam.questions[qIdx];
  const passage = q.passageId ? exam.passages.find(p => p.id === q.passageId) : null;
  const selected = answers[qIdx];
  const isFlagged = flagged.has(qIdx);

  return (
    <div className="prac-question">
      <div className="prac-question__header">
        <span className="prac-question__num">Pregunta {qIdx + 1} de {total}</span>
        <button onClick={onFlag} className={`prac-flag-btn${isFlagged ? ' prac-flag-btn--active' : ''}`}>
          {isFlagged ? '★ Marcada' : '☆ Marcar'}
        </button>
      </div>

      {/* Vocab word bank */}
      {q.type === 'vocab' && q.vocabWords && (
        <div className="prac-word-bank">
          <p className="prac-word-bank__label">Banco de palabras</p>
          <p className="prac-word-bank__words">
            {q.vocabWords.map((w, i) => `${String.fromCharCode(65 + i)}. ${w}`).join('  ·  ')}
          </p>
        </div>
      )}

      {/* Passage — reading or gap fill */}
      {passage && q.type === 'reading' && (
        <div className="prac-passage-box">
          {passage.title && <p className="prac-passage-box__label">{passage.title}</p>}
          <p className="prac-passage-box__text">{passage.text}</p>
        </div>
      )}

      {passage && q.type === 'gap' && (
        <div className="prac-passage-box">
          {passage.title && <p className="prac-passage-box__label">{passage.title}</p>}
          <p className="prac-passage-box__text">{renderGapPassage(passage.text, q.n)}</p>
        </div>
      )}

      {/* Notice stimulus */}
      {q.type === 'notice' && passage && (
        <div className="prac-notice-box">
          {passage.title && <p className="prac-notice-box__label">{passage.title}</p>}
          <pre className="prac-notice-box__text">{passage.text}</pre>
        </div>
      )}

      {/* Dialog stimulus */}
      {q.type === 'dialog' && (
        <div className="prac-dialog-box">
          <pre className="prac-dialog-box__text">{q.stem}</pre>
        </div>
      )}

      {/* Question text (not for dialog — stem is the stimulus) */}
      {q.type !== 'dialog' && (
        <p className="prac-question__text">{q.stem}</p>
      )}
      {q.type === 'dialog' && (
        <p className="prac-question__text">¿Cuál es la mejor respuesta?</p>
      )}

      {/* Options */}
      <div className="prac-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className={`prac-option${selected === i ? ' prac-option--selected' : ''}`}
          >
            <span className="prac-option__letter">{String.fromCharCode(65 + i)}</span>
            <span className="prac-option__text">{opt}</span>
          </button>
        ))}
      </div>

      <div className="prac-question__footer">
        <button onClick={onPrev} className="btn btn-ghost btn-sm" disabled={qIdx === 0}>
          ← Anterior
        </button>
        {isLast ? (
          <button onClick={onSubmit} className="btn btn-sm">
            Finalizar examen
          </button>
        ) : (
          <button onClick={onNext} className="btn btn-sm">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Lead gate ─────────────────────────────────────────────────────────────────

function LeadGateView({
  onSubmit,
}: {
  onSubmit: (lead: { name: string; email: string; whatsapp: string }) => Promise<void>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Ingresa tu nombre'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Ingresa un correo válido'); return; }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 7) { setError('Ingresa un WhatsApp válido'); return; }
    setLoading(true);
    setError('');
    await onSubmit({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim() });
    setLoading(false);
  }

  return (
    <div className="prac-lead-gate" style={{ '--exam-color': '#0f3d8c' } as React.CSSProperties}>
      <div className="prac-lead-gate__card">
        <div className="prac-lead-gate__icon">🎯</div>
        <h2 className="prac-lead-gate__title">¡Tu simulacro está listo!</h2>
        <p className="prac-lead-gate__sub">
          Déjanos tus datos y te mostramos tu resultado, análisis por parte y respuestas correctas.
          También te enviaremos consejos personalizados para mejorar tu puntaje.
        </p>
        <form onSubmit={handleSubmit} className="prac-lead-gate__form">
          <div className="prac-lead-gate__field">
            <label className="prac-lead-gate__label">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej. Valentina García"
              className="prac-lead-gate__input"
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="prac-lead-gate__field">
            <label className="prac-lead-gate__label">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="prac-lead-gate__input"
              disabled={loading}
            />
          </div>
          <div className="prac-lead-gate__field">
            <label className="prac-lead-gate__label">WhatsApp</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="Ej. 3001234567"
              className="prac-lead-gate__input"
              disabled={loading}
            />
          </div>
          {error && <p className="prac-lead-gate__error">{error}</p>}
          <button type="submit" className="btn prac-lead-gate__btn" disabled={loading}>
            {loading ? 'Guardando…' : 'Ver mis resultados →'}
          </button>
        </form>
        <p className="prac-lead-gate__privacy">
          Tus datos son confidenciales. No los compartimos con terceros.
        </p>
      </div>
    </div>
  );
}

// ── Results view ──────────────────────────────────────────────────────────────

function ResultsView({
  exam,
  answers,
  sections,
  onRetry,
}: {
  exam: Simulacro;
  answers: Record<number, number>;
  sections: Section[];
  onRetry: () => void;
}) {
  const total = exam.questions.length;
  const correct = exam.questions.filter((q, i) => answers[i] === q.answer).length;
  const score = Math.round((correct / total) * 100);

  return (
    <div className="prac-results">
      <div className="prac-results__hero" style={{ '--exam-color': '#0f3d8c' } as React.CSSProperties}>
        <p className="prac-results__label">Resultado final</p>
        <div className="prac-results__score">{score}</div>
        <p className="prac-results__score-sub">sobre 100 puntos</p>
        <p className="prac-results__fraction">{correct} / {total} correctas</p>
      </div>

      <div className="prac-results__sections">
        {sections.map(sec => {
          const secCorrect = sec.qIndices.filter(i => answers[i] === exam.questions[i].answer).length;
          const pct = Math.round((secCorrect / sec.qIndices.length) * 100);
          return (
            <div key={sec.part} className="prac-results__sec">
              <div className="prac-results__sec-header">
                <span>Parte {sec.part} — {sec.title}</span>
                <span style={{ color: '#0f3d8c', fontWeight: 700 }}>{secCorrect}/{sec.qIndices.length}</span>
              </div>
              <div className="prac-results__bar">
                <div className="prac-results__bar-fill" style={{ width: `${pct}%`, background: '#0f3d8c' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="prac-results__review">
        <h2 className="prac-results__review-title">Revisión de respuestas</h2>
        {sections.map(sec => (
          <div key={sec.part} className="prac-results__section-block">
            <h3 className="prac-results__section-name">Parte {sec.part} — {sec.title}</h3>
            {sec.qIndices.map(qi => {
              const q = exam.questions[qi];
              const userAns = answers[qi];
              const isCorrect = userAns === q.answer;
              return (
                <div key={qi} className={`prac-review-item${isCorrect ? ' prac-review-item--correct' : ' prac-review-item--wrong'}`}>
                  <div className="prac-review-item__header">
                    <span className="prac-review-item__num">P{qi + 1}</span>
                    <span className={`prac-review-item__badge${isCorrect ? ' prac-review-item__badge--ok' : ' prac-review-item__badge--err'}`}>
                      {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                    </span>
                  </div>
                  <p className="prac-review-item__q">{q.stem}</p>
                  <div className="prac-review-item__opts">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={[
                          'prac-review-opt',
                          oi === q.answer ? 'prac-review-opt--correct' : '',
                          oi === userAns && !isCorrect ? 'prac-review-opt--wrong' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        <span className="prac-review-opt__letter">{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="prac-results__actions">
        <button onClick={onRetry} className="btn btn-ghost">Intentar de nuevo</button>
        <Link href="/examenes/icfes-saber-11" className="btn">Volver a ICFES</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'lead' | 'results';

export default function ExamClient({ exam }: { exam: Simulacro }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const pendingRef = useRef<{ correct: number; total: number } | null>(null);

  const total = exam.questions.length;
  const sections = useMemo(() => computeSections(exam), [exam]);

  const handleAnswer = useCallback((optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  }, [currentIdx]);

  const handleFlag = useCallback(() => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentIdx)) next.delete(currentIdx); else next.add(currentIdx);
      return next;
    });
  }, [currentIdx]);

  const handleSubmit = useCallback(() => {
    const correct = exam.questions.filter((q, i) => answers[i] === q.answer).length;
    pendingRef.current = { correct, total };
    setPhase('lead');
  }, [exam, answers, total]);

  const handleLeadSubmit = useCallback(async (lead: { name: string; email: string; whatsapp: string }) => {
    const { correct, total: t } = pendingRef.current ?? { correct: 0, total };
    const score = Math.round((correct / t) * 100);
    await Promise.allSettled([
      saveLead({
        name: lead.name,
        whatsapp: lead.whatsapp,
        email: lead.email,
        examSlug: 'icfes-saber-11',
        examScore: `${score}/100 (${correct}/${t} correctas)`,
        source: 'icfes-cuadernillo',
      }),
      saveExamResult({
        examSlug: 'icfes-saber-11',
        examName: 'ICFES Saber 11 — Inglés',
        mockTitle: exam.title,
        totalScore: score,
        totalMax: 100,
        totalLabel: `${correct}/${t} correctas`,
        skills: sections.map(sec => {
          const sc = sec.qIndices.filter(i => answers[i] === exam.questions[i].answer).length;
          return {
            skill: sec.title,
            score: Math.round(sc / sec.qIndices.length * 100),
            max: 100,
            label: `${sc}/${sec.qIndices.length}`,
          };
        }),
      }),
    ]);
    setPhase('results');
  }, [exam, answers, sections, total]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setFlagged(new Set());
    setCurrentIdx(0);
    setPhase('intro');
  }, []);

  const unanswered = total - Object.keys(answers).length;
  const answeredCount = Object.keys(answers).length;

  // ── Lead gate ──────────────────────────────────────────────────────────────
  if (phase === 'lead') {
    return (
      <div className="prac-shell">
        <LeadGateView onSubmit={handleLeadSubmit} />
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div className="prac-shell">
        <ResultsView exam={exam} answers={answers} sections={sections} onRetry={handleRetry} />
      </div>
    );
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{ '--exam-color': '#0f3d8c' } as React.CSSProperties}>
          <p className="prac-intro__eyebrow">🇨🇴 ICFES Saber 11 — Inglés</p>
          <h1 className="prac-intro__title">{exam.title}</h1>
          <p className="prac-intro__sub">{exam.source}</p>

          <div className="prac-intro__stats">
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{sections.length}</span>
              <span className="prac-intro__stat-lbl">Partes</span>
            </div>
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{total}</span>
              <span className="prac-intro__stat-lbl">Preguntas</span>
            </div>
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{exam.timeMinutes}</span>
              <span className="prac-intro__stat-lbl">Minutos</span>
            </div>
          </div>

          <div className="prac-intro__sections">
            {sections.map(sec => (
              <div key={sec.part} className="prac-intro__section">
                <span className="prac-intro__section-part">Parte {sec.part}</span>
                <span className="prac-intro__section-title">{sec.title}</span>
                <span className="prac-intro__section-q">{sec.qIndices.length} preguntas</span>
              </div>
            ))}
          </div>

          <div className="prac-intro__tips">
            <p className="prac-intro__tips-title">Antes de empezar</p>
            <ul>
              <li>Puedes navegar entre preguntas libremente usando el panel de navegación.</li>
              <li>Marca preguntas con el botón <strong>Marcar</strong> para revisarlas antes de finalizar.</li>
              <li>El tiempo empieza al hacer clic en <strong>Empezar</strong>.</li>
              <li>Puedes finalizar en cualquier momento y ver tus resultados.</li>
            </ul>
          </div>

          <button
            onClick={() => setPhase('exam')}
            className="btn"
            style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}
          >
            Empezar examen →
          </button>

          <Link
            href="/examenes/icfes-saber-11"
            style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem', display: 'block' }}
          >
            ← Volver a ICFES
          </Link>
        </div>
      </div>
    );
  }

  // ── Exam ───────────────────────────────────────────────────────────────────
  return (
    <div className="prac-shell prac-shell--exam">
      {/* Top bar */}
      <header className="prac-topbar" style={{ '--exam-color': '#0f3d8c' } as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href="/examenes/icfes-saber-11" className="prac-topbar__back">← ICFES</Link>
          <span className="prac-topbar__title">{exam.title}</span>
        </div>
        <Timer totalSecs={exam.timeMinutes * 60} onExpire={handleSubmit} />
      </header>

      {/* Section tabs */}
      <SectionTabs
        sections={sections}
        currentIdx={currentIdx}
        answers={answers}
        total={total}
        onJump={setCurrentIdx}
      />

      {/* Main layout */}
      <div className="prac-body">
        <div className="prac-main">
          <QuestionView
            exam={exam}
            qIdx={currentIdx}
            total={total}
            answers={answers}
            flagged={flagged}
            onAnswer={handleAnswer}
            onFlag={handleFlag}
            onPrev={() => setCurrentIdx(i => Math.max(0, i - 1))}
            onNext={() => setCurrentIdx(i => Math.min(total - 1, i + 1))}
            isLast={currentIdx === total - 1}
            onSubmit={() => {
              if (unanswered > 0) {
                if (!confirm(`Tienes ${unanswered} pregunta${unanswered !== 1 ? 's' : ''} sin responder. ¿Seguro que quieres finalizar?`)) return;
              }
              handleSubmit();
            }}
          />
        </div>

        <aside className="prac-sidebar">
          <QuestionNav
            total={total}
            current={currentIdx}
            answers={answers}
            flagged={flagged}
            onJump={setCurrentIdx}
          />
          <div className="prac-sidebar__submit">
            <div className="prac-progress-info">
              <span>{answeredCount}/{total} respondidas</span>
              {flagged.size > 0 && <span>{flagged.size} marcadas</span>}
            </div>
            <button
              onClick={() => {
                if (unanswered > 0) {
                  if (!confirm(`Tienes ${unanswered} pregunta${unanswered !== 1 ? 's' : ''} sin responder. ¿Seguro que quieres finalizar?`)) return;
                }
                handleSubmit();
              }}
              className="btn"
              style={{ width: '100%' }}
            >
              Finalizar examen
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
