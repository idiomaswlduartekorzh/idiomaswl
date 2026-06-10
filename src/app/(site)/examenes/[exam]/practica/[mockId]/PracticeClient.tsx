'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { Exam } from '@/data/exams';
import type { MockExam, MCQQuestion, MockSection } from '@/data/mocks/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getAllQuestions(mock: MockExam) {
  return mock.sections.flatMap(s => s.questions);
}

// ── Score calculator ──────────────────────────────────────────────────────────

function calcResults(mock: MockExam, answers: Record<string, number>) {
  const sections = mock.sections.map(sec => {
    const qs = sec.questions as MCQQuestion[];
    const correct = qs.filter(q => answers[q.id] === q.answer).length;
    return { part: sec.part, title: sec.title, total: qs.length, correct };
  });
  const totalCorrect = sections.reduce((a, s) => a + s.correct, 0);
  const totalQuestions = sections.reduce((a, s) => a + s.total, 0);
  const score = Math.round((totalCorrect / totalQuestions) * 100);
  return { sections, totalCorrect, totalQuestions, score };
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
        <div className="prac-timer__fill" style={{ width: `${pct * 100}%`, background: urgent ? '#c8202e' : 'var(--accent)' }} />
      </div>
    </div>
  );
}

function QuestionNav({
  questions,
  current,
  answers,
  flagged,
  onJump,
}: {
  questions: MCQQuestion[];
  current: number;
  answers: Record<string, number>;
  flagged: Set<string>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="prac-nav">
      <p className="prac-nav__title">Preguntas</p>
      <div className="prac-nav__grid">
        {questions.map((q, i) => {
          const answered = answers[q.id] !== undefined;
          const isFlagged = flagged.has(q.id);
          const isCurrent = i === current;
          return (
            <button
              key={q.id}
              onClick={() => onJump(i)}
              className={`prac-nav__btn${isCurrent ? ' prac-nav__btn--current' : ''}${answered ? ' prac-nav__btn--answered' : ''}${isFlagged ? ' prac-nav__btn--flagged' : ''}`}
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

function StimulusBox({ question }: { question: MCQQuestion }) {
  if (!question.stimulus) return null;
  const style = question.stimulusStyle;
  if (style === 'notice' || style === 'sign') {
    return (
      <div className="prac-notice-box">
        {question.stimulusLabel && <p className="prac-notice-box__label">{question.stimulusLabel}</p>}
        <pre className="prac-notice-box__text">{question.stimulus}</pre>
      </div>
    );
  }
  if (style === 'dialog-box') {
    return (
      <div className="prac-dialog-box">
        {question.stimulusLabel && <p className="prac-stimulus__label">{question.stimulusLabel}</p>}
        <pre className="prac-dialog-box__text">{question.stimulus}</pre>
      </div>
    );
  }
  return (
    <div className="prac-stimulus">
      {question.stimulusLabel && <p className="prac-stimulus__label">{question.stimulusLabel}</p>}
      <pre className="prac-stimulus__text">{question.stimulus}</pre>
    </div>
  );
}

function QuestionView({
  question,
  section,
  index,
  total,
  selectedAnswer,
  isFlagged,
  onAnswer,
  onFlag,
  onPrev,
  onNext,
  isLast,
  onSubmit,
}: {
  question: MCQQuestion;
  section?: MockSection;
  index: number;
  total: number;
  selectedAnswer: number | undefined;
  isFlagged: boolean;
  onAnswer: (i: number) => void;
  onFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="prac-question">
      <div className="prac-question__header">
        <span className="prac-question__num">Pregunta {index + 1} de {total}</span>
        <button onClick={onFlag} className={`prac-flag-btn${isFlagged ? ' prac-flag-btn--active' : ''}`}>
          {isFlagged ? '★ Marcada' : '☆ Marcar'}
        </button>
      </div>

      {section?.sectionNote && (
        <div className="prac-word-bank">
          <p className="prac-word-bank__label">Banco de palabras</p>
          <p className="prac-word-bank__words">{section.sectionNote}</p>
        </div>
      )}

      {section?.passage && (
        <div className="prac-passage-box">
          <p className="prac-passage-box__label">Lea el siguiente texto</p>
          <p className="prac-passage-box__text">{section.passage}</p>
        </div>
      )}

      <StimulusBox question={question} />

      <p className="prac-question__text">{question.text}</p>

      <div className="prac-options">
        {question.options.map((opt, i) => {
          const displayText = opt.replace(/^[A-G]\.\s+/, '');
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              className={`prac-option${selectedAnswer === i ? ' prac-option--selected' : ''}`}
            >
              <span className="prac-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="prac-option__text">{displayText}</span>
            </button>
          );
        })}
      </div>

      <div className="prac-question__footer">
        <button onClick={onPrev} className="btn btn-ghost btn-sm" disabled={index === 0}>
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

function SectionTabs({
  sections,
  currentPart,
  answers,
  questions,
  onJumpToPart,
}: {
  sections: MockExam['sections'];
  currentPart: number;
  answers: Record<string, number>;
  questions: MCQQuestion[];
  onJumpToPart: (part: number) => void;
}) {
  return (
    <div className="prac-section-tabs">
      {sections.map(sec => {
        const sectionQs = questions.filter(q => q.part === sec.part);
        const answered = sectionQs.filter(q => answers[q.id] !== undefined).length;
        return (
          <button
            key={sec.part}
            onClick={() => onJumpToPart(sec.part)}
            className={`prac-section-tab${currentPart === sec.part ? ' prac-section-tab--active' : ''}`}
          >
            <span>Parte {sec.part}</span>
            <span className="prac-section-tab__count">{answered}/{sectionQs.length}</span>
          </button>
        );
      })}
    </div>
  );
}

function ResultsView({
  mock,
  exam,
  answers,
  onRetry,
}: {
  mock: MockExam;
  exam: Exam;
  answers: Record<string, number>;
  onRetry: () => void;
}) {
  const results = calcResults(mock, answers);
  const allQuestions = getAllQuestions(mock) as MCQQuestion[];

  return (
    <div className="prac-results">
      <div className="prac-results__hero" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <p className="prac-results__label">Resultado final</p>
        <div className="prac-results__score">{results.score}</div>
        <p className="prac-results__score-sub">sobre 100 puntos</p>
        <p className="prac-results__fraction">{results.totalCorrect} / {results.totalQuestions} correctas</p>
      </div>

      <div className="prac-results__sections">
        {results.sections.map(sec => {
          const pct = Math.round((sec.correct / sec.total) * 100);
          return (
            <div key={sec.part} className="prac-results__sec">
              <div className="prac-results__sec-header">
                <span>Parte {sec.part}</span>
                <span style={{ color: exam.color, fontWeight: 700 }}>{sec.correct}/{sec.total}</span>
              </div>
              <div className="prac-results__bar">
                <div className="prac-results__bar-fill" style={{ width: `${pct}%`, background: exam.color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="prac-results__review">
        <h2 className="prac-results__review-title">Revisión de respuestas</h2>
        {mock.sections.map(sec => {
          const qs = sec.questions as MCQQuestion[];
          return (
            <div key={sec.part} className="prac-results__section-block">
              <h3 className="prac-results__section-name">{sec.title}</h3>
              {qs.map((q, i) => {
                const userAns = answers[q.id];
                const correct = userAns === q.answer;
                const qIdx = allQuestions.findIndex(a => a.id === q.id);
                return (
                  <div key={q.id} className={`prac-review-item${correct ? ' prac-review-item--correct' : ' prac-review-item--wrong'}`}>
                    <div className="prac-review-item__header">
                      <span className="prac-review-item__num">P{qIdx + 1}</span>
                      <span className={`prac-review-item__badge${correct ? ' prac-review-item__badge--ok' : ' prac-review-item__badge--err'}`}>
                        {correct ? '✓ Correcta' : '✗ Incorrecta'}
                      </span>
                    </div>
                    {q.stimulus && (
                      <pre className="prac-review-item__stimulus">{q.stimulus}</pre>
                    )}
                    <p className="prac-review-item__q">{q.text}</p>
                    <div className="prac-review-item__opts">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`prac-review-opt${oi === q.answer ? ' prac-review-opt--correct' : ''}${oi === userAns && !correct ? ' prac-review-opt--wrong' : ''}`}
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
          );
        })}
      </div>

      <div className="prac-results__actions">
        <button onClick={onRetry} className="btn btn-ghost">Intentar de nuevo</button>
        <Link href={`/examenes/${exam.slug}`} className="btn">Volver al examen</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'results';

export default function PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const allQuestions = getAllQuestions(mock) as MCQQuestion[];
  const currentQuestion = allQuestions[currentIdx];
  const currentPart = currentQuestion?.part ?? 1;
  const currentSection = mock.sections.find(s => s.part === currentPart);

  const handleAnswer = useCallback((optIdx: number) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optIdx }));
  }, [currentQuestion]);

  const handleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  }, [currentQuestion]);

  const handleJumpToPart = useCallback((part: number) => {
    const idx = allQuestions.findIndex(q => q.part === part);
    if (idx !== -1) setCurrentIdx(idx);
  }, [allQuestions]);

  const handleSubmit = useCallback(() => {
    setPhase('results');
  }, []);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setFlagged(new Set());
    setCurrentIdx(0);
    setPhase('intro');
  }, []);

  if (phase === 'results') {
    return (
      <div className="prac-shell">
        <ResultsView mock={mock} exam={exam} answers={answers} onRetry={handleRetry} />
      </div>
    );
  }

  if (phase === 'intro') {
    const totalQ = allQuestions.length;
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name}</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>

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
              <span className="prac-intro__stat-val">{mock.timeMinutes}</span>
              <span className="prac-intro__stat-lbl">Minutos</span>
            </div>
          </div>

          <div className="prac-intro__sections">
            {mock.sections.map(sec => (
              <div key={sec.part} className="prac-intro__section">
                <span className="prac-intro__section-part">Parte {sec.part}</span>
                <span className="prac-intro__section-title">{sec.title.split('—')[1]?.trim() ?? sec.title}</span>
                <span className="prac-intro__section-q">{sec.questions.length} preguntas</span>
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

          <button onClick={() => setPhase('exam')} className="btn" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>
            Empezar examen →
          </button>

          <Link href={`/examenes/${exam.slug}`} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem', display: 'block' }}>
            ← Volver a {exam.name}
          </Link>
        </div>
      </div>
    );
  }

  // Exam phase
  const answeredCount = Object.keys(answers).length;
  const unanswered = allQuestions.length - answeredCount;

  return (
    <div className="prac-shell prac-shell--exam">
      {/* Top bar */}
      <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href={`/examenes/${exam.slug}`} className="prac-topbar__back">← {exam.name}</Link>
          <span className="prac-topbar__title">{mock.title}</span>
        </div>
        <Timer totalSecs={mock.timeMinutes * 60} onExpire={handleSubmit} />
      </header>

      {/* Section tabs */}
      <SectionTabs
        sections={mock.sections}
        currentPart={currentPart}
        answers={answers}
        questions={allQuestions}
        onJumpToPart={handleJumpToPart}
      />

      {/* Main layout */}
      <div className="prac-body">
        <div className="prac-main">
          <QuestionView
            question={currentQuestion}
            section={currentSection}
            index={currentIdx}
            total={allQuestions.length}
            selectedAnswer={answers[currentQuestion?.id]}
            isFlagged={flagged.has(currentQuestion?.id)}
            onAnswer={handleAnswer}
            onFlag={handleFlag}
            onPrev={() => setCurrentIdx(i => Math.max(0, i - 1))}
            onNext={() => setCurrentIdx(i => Math.min(allQuestions.length - 1, i + 1))}
            isLast={currentIdx === allQuestions.length - 1}
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
            questions={allQuestions}
            current={currentIdx}
            answers={answers}
            flagged={flagged}
            onJump={setCurrentIdx}
          />

          <div className="prac-sidebar__submit">
            <div className="prac-progress-info">
              <span>{answeredCount}/{allQuestions.length} respondidas</span>
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
