'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { saveExamResult } from '@/lib/actions/saveExamResult';
import { saveLead } from '@/lib/actions/saveLead';
import type { Exam } from '@/data/exams';
import type { MockExam, MCQQuestion, MockSection } from '@/data/mocks/types';
import { hasGuidedMock } from '@/data/icfes/guided-registry';

// ── Notices grid (ICFES Parte 1) ─────────────────────────────────────────────
function NoticesGridSection({
  section,
  answers,
  onAnswerById,
  onGoPrev,
  onGoNext,
  isFirstSection,
  startNum,
}: {
  section: MockSection;
  answers: Record<string, number>;
  onAnswerById: (qId: string, idx: number) => void;
  onGoPrev: () => void;
  onGoNext: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
  startNum: number;
}) {
  const questions = section.questions as MCQQuestion[];
  const exAnsIdx = section.exampleAnswer
    ? section.exampleAnswer.charCodeAt(0) - 65
    : 0;

  return (
    <div className="ng">
      <p className="ng__instr">{section.instructions}</p>

      {/* ── Example row ── */}
      {section.exampleStimulus && (
        <div className="ng__ex">
          <span className="ng__ex-pill">Ejemplo:</span>
          <div className="ng__item ng__item--example">
            <span className="ng__item-n">0.</span>
            <div className="ng__notice-box">
              <pre className="ng__notice-text">{section.exampleStimulus}</pre>
            </div>
            <div className="ng__item-right">
              <p className="ng__item-q">{section.exampleText}</p>
              <div className="ng__resp-row">
                <span className="ng__resp-lbl">Respuesta:</span>
                <span className="ng__resp-zero">0.</span>
                {['A', 'B', 'C'].map((ltr, i) => (
                  <span key={i} className={`ng__circ${i === exAnsIdx ? ' ng__circ--on' : ''}`}>
                    {ltr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ng__rule" />

      {/* ── Questions ── */}
      <div className="ng__items">
        {questions.map((q, qi) => {
          const mcq = q as MCQQuestion;
          const sel = answers[mcq.id];
          return (
            <div key={mcq.id} className="ng__item">
              <span className="ng__item-n">{startNum + qi}.</span>
              <div className="ng__notice-box">
                <pre className="ng__notice-text">{mcq.stimulus}</pre>
              </div>
              <div className="ng__item-right">
                <p className="ng__item-q">{mcq.text}</p>
                <div className="ng__opts">
                  {mcq.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={`ng__opt${sel === oi ? ' ng__opt--sel' : ''}`}
                      onClick={() => onAnswerById(mcq.id, oi)}
                    >
                      <span className="ng__opt-ltr">{String.fromCharCode(65 + oi)}.</span>
                      <span className="ng__opt-txt">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="prac-question__footer">
        <button className="btn btn-ghost btn-sm" onClick={onGoPrev} disabled={isFirstSection}>
          ← Anterior
        </button>
        <button className="btn btn-sm" onClick={onGoNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Inline SVG person silhouettes ────────────────────────────────────────────
function PersonSVG({ gender }: { gender: 'f' | 'm' }) {
  const skin = '#c5c9d6';
  const hair = '#7c8096';
  const body = '#9da1b0';
  if (gender === 'f') {
    return (
      <svg viewBox="0 0 70 110" width="58" height="92" aria-hidden="true">
        {/* Long hair (back layer) */}
        <path d="M14 36 Q12 58 20 82 Q28 92 35 92 Q42 92 50 82 Q58 58 56 36 Q48 18 35 18 Q22 18 14 36Z" fill={hair} opacity="0.55"/>
        {/* Head */}
        <circle cx="35" cy="30" r="20" fill={skin}/>
        {/* Hair (front/top) */}
        <path d="M15 30 Q15 12 35 10 Q55 12 55 30 L55 40 Q47 50 35 48 Q23 50 15 40Z" fill={hair}/>
        {/* Neck */}
        <rect x="28" y="46" width="14" height="10" rx="3" fill={skin}/>
        {/* Body */}
        <path d="M4 110 Q4 78 20 70 Q27 66 35 66 Q43 66 50 70 Q66 78 66 110Z" fill={body}/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 70 110" width="58" height="92" aria-hidden="true">
      {/* Head */}
      <circle cx="35" cy="30" r="20" fill={skin}/>
      {/* Short hair */}
      <path d="M15 30 Q15 12 35 10 Q55 12 55 30 L55 34 Q49 42 35 40 Q21 42 15 34Z" fill={hair}/>
      {/* Neck */}
      <rect x="28" y="48" width="14" height="10" rx="3" fill={skin}/>
      {/* Body (broader shoulders) */}
      <path d="M0 110 Q0 74 18 66 Q26 62 35 62 Q44 62 52 66 Q70 74 70 110Z" fill={body}/>
    </svg>
  );
}

// ── Dialogs grid (ICFES Parte 3) ─────────────────────────────────────────────
function DialogsGridSection({
  section,
  answers,
  onAnswerById,
  onGoPrev,
  onGoNext,
  isFirstSection,
  startNum,
}: {
  section: MockSection;
  answers: Record<string, number>;
  onAnswerById: (qId: string, idx: number) => void;
  onGoPrev: () => void;
  onGoNext: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
  startNum: number;
}) {
  const questions = section.questions as MCQQuestion[];
  const exAnsIdx = section.exampleAnswer
    ? section.exampleAnswer.charCodeAt(0) - 65
    : 0;

  return (
    <div className="dg">
      <p className="dg__instr">{section.instructions}</p>

      {/* ── Example block ── */}
      {section.exampleStimulus && (
        <div className="dg__ex">
          <span className="dg__ex-pill">Ejemplo:</span>

          {/* Scene with two people */}
          <div className="dg__scene">
            {/* Left: female speaker */}
            <div className="dg__scene-person dg__scene-person--l">
              <PersonSVG gender="f" />
            </div>

            {/* Middle: speech bubble + response options */}
            <div className="dg__scene-mid">
              <div className="dg__scene-bubble">
                {section.exampleStimulus}
              </div>
              {section.exampleOptions && (
                <div className="dg__scene-exopts">
                  {section.exampleOptions.map((opt, i) => (
                    <div key={i} className="dg__scene-exopt">
                      <strong>{String.fromCharCode(65 + i)}.</strong>&nbsp;{opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: male listener */}
            <div className="dg__scene-person dg__scene-person--r">
              <PersonSVG gender="m" />
            </div>
          </div>

          {/* Respuesta */}
          <div className="dg__resp-row">
            <span className="dg__resp-lbl">Respuesta:</span>
            <span className="dg__resp-zero">0.</span>
            {['A', 'B', 'C'].map((ltr, i) => (
              <span key={i} className={`dg__circ${i === exAnsIdx ? ' dg__circ--on' : ''}`}>
                {ltr}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="dg__rule" />

      {/* ── Questions ── */}
      <div className="dg__items">
        {questions.map((q, qi) => {
          const mcq = q as MCQQuestion;
          const sel = answers[mcq.id];
          return (
            <div key={mcq.id} className="dg__item">
              <span className="dg__num">{startNum + qi}.</span>
              <p className="dg__stmt">{mcq.stimulus}</p>
              <div className="dg__opts">
                {mcq.options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`dg__opt${sel === oi ? ' dg__opt--sel' : ''}`}
                    onClick={() => onAnswerById(mcq.id, oi)}
                  >
                    <span className="dg__opt-ltr">{String.fromCharCode(65 + oi)}</span>
                    <span className="dg__opt-txt">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="prac-question__footer">
        <button className="btn btn-ghost btn-sm" onClick={onGoPrev} disabled={isFirstSection}>
          ← Anterior
        </button>
        <button className="btn btn-sm" onClick={onGoNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Vocabulary matching grid (ICFES Parte 2) ─────────────────────────────────
function MatchingGridSection({
  section,
  answers,
  onAnswerById,
  onGoPrev,
  onGoNext,
  isFirstSection,
  startNum = 6,
}: {
  section: MockSection;
  startNum?: number;
  answers: Record<string, number>;
  onAnswerById: (qId: string, idx: number) => void;
  onGoPrev: () => void;
  onGoNext: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
}) {
  const questions  = section.questions as MCQQuestion[];
  const wordsAG    = questions[0]?.options ?? [];          // 7 words → A–G
  // H word is optional — cuadernillos don't have an example/H entry
  const allWords   = section.exampleAnswer ? [...wordsAG, section.exampleAnswer] : wordsAG;

  // active row: the description the student last clicked
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="mg">
      {/* Category title */}
      <h2 className="mg__title">{section.topic}</h2>

      {/* ── Example block (optional — cuadernillos omit it) ── */}
      {section.exampleText && (
        <div className="mg__ex">
          <span className="mg__ex-pill">Ejemplo:</span>
          <p className="mg__ex-text"><strong>0.</strong>&nbsp;&nbsp;{section.exampleText}</p>
          <div className="mg__resp-box">
            <span className="mg__resp-lbl">Respuesta:</span>
            <span className="mg__resp-zero">0.</span>
            {allWords.map((_, i) => (
              <span
                key={i}
                className={`mg__circ${i === allWords.length - 1 ? ' mg__circ--on' : ''}`}
              >
                {String.fromCharCode(65 + i)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <p className="mg__hint">
        {activeId
          ? 'Ahora haz clic en la palabra correcta en la columna derecha →'
          : 'Haz clic en una descripción para activarla, luego selecciona la palabra correspondiente.'}
      </p>

      {/* ── Two-column table ── */}
      <div className="mg__table">

        {/* LEFT — descriptions */}
        <div className="mg__left">
          {questions.map((q, qi) => {
            const mcq   = q as MCQQuestion;
            const sel   = answers[mcq.id];
            const isAct = activeId === mcq.id;
            return (
              <div
                key={mcq.id}
                className={`mg__row${isAct ? ' mg__row--act' : ''}${sel !== undefined ? ' mg__row--done' : ''}`}
                onClick={() => setActiveId(isAct ? null : mcq.id)}
              >
                <span className="mg__row-n">{startNum + qi}.</span>
                <span className="mg__row-txt">{mcq.text}</span>
                <span className={`mg__ans${sel !== undefined ? ' mg__ans--set' : ''}`}>
                  {sel !== undefined ? String.fromCharCode(65 + sel) : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mg__vline" />

        {/* RIGHT — word bank A–H */}
        <div className="mg__right">
          {allWords.map((word, wi) => {
            const isH    = wi === allWords.length - 1;
            const isUsed = !isH && questions.some(q => answers[q.id] === wi);
            const canPick = !isH && activeId !== null;
            return (
              <div
                key={wi}
                className={`mg__word${isH ? ' mg__word--H' : ''}${isUsed ? ' mg__word--used' : ''}${canPick ? ' mg__word--pick' : ''}`}
                onClick={() => {
                  if (!canPick) return;
                  onAnswerById(activeId!, wi);
                  const next = questions.find(q => q.id !== activeId && answers[q.id] === undefined);
                  setActiveId(next?.id ?? null);
                }}
              >
                <strong className="mg__wltr">{String.fromCharCode(65 + wi)}.</strong>
                <span className="mg__wtxt">{word}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="prac-question__footer">
        <button className="btn btn-ghost btn-sm" onClick={onGoPrev} disabled={isFirstSection}>
          ← Anterior
        </button>
        <button className="btn btn-sm" onClick={onGoNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ── Cloze text (ICFES Parte 4) ───────────────────────────────────────────────

function renderClozePassage(text: string): React.ReactNode[] {
  const segs: React.ReactNode[] = [];
  const re = /\((\d+)\)\s*___/g;
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push(text.slice(last, m.index));
    segs.push(<mark key={m.index} className="cl__blank">({m[1]})</mark>);
    last = m.index + m[0].length;
  }
  if (last < text.length) segs.push(text.slice(last));
  return segs;
}

function ClozeSection({
  section, answers, onAnswerById, onGoPrev, onGoNext, isFirstSection, isLastSection, startNum,
}: {
  section: MockSection; answers: Record<string, number>;
  onAnswerById: (qId: string, idx: number) => void;
  onGoPrev: () => void; onGoNext: () => void;
  isFirstSection: boolean; isLastSection: boolean; startNum: number;
}) {
  const questions = section.questions as MCQQuestion[];
  return (
    <div className="cl">
      <p className="cl__instr">{section.instructions}</p>

      {section.passage && (
        <div className="cl__passage">
          <p className="cl__passage-text">{renderClozePassage(section.passage)}</p>
        </div>
      )}

      <div className="cl__rule" />

      <div className="cl__qs">
        {questions.map((q, qi) => {
          const sel = answers[q.id];
          return (
            <div key={q.id} className="cl__qrow">
              <span className="cl__qnum">{startNum + qi}.</span>
              <div className="cl__qopts">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`cl__qopt${sel === oi ? ' cl__qopt--sel' : ''}`}
                    onClick={() => onAnswerById(q.id, oi)}
                  >
                    <strong>{String.fromCharCode(65 + oi)}.</strong>&nbsp;{opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="prac-question__footer">
        <button className="btn btn-ghost btn-sm" onClick={onGoPrev} disabled={isFirstSection}>
          ← Anterior
        </button>
        <button className="btn btn-sm" onClick={onGoNext}>
          {isLastSection ? 'Finalizar examen' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}

// ── Reading section (ICFES Partes 5–7) ───────────────────────────────────────

function ReadingSection({
  section, answers, onAnswerById, onGoPrev, onGoNext, isFirstSection, isLastSection, startNum,
}: {
  section: MockSection; answers: Record<string, number>;
  onAnswerById: (qId: string, idx: number) => void;
  onGoPrev: () => void; onGoNext: () => void;
  isFirstSection: boolean; isLastSection: boolean; startNum: number;
}) {
  const questions = section.questions as MCQQuestion[];
  return (
    <div className="rd">
      <p className="rd__instr">{section.instructions}</p>

      <div className="rd__layout">
        {/* Left column: passage */}
        {section.passage && (
          <div className="rd__passage-col">
            {section.passageTitle && (
              <p className="rd__passage-title">{section.passageTitle}</p>
            )}
            <div className="rd__passage">
              <p className="rd__passage-text">{section.passage}</p>
            </div>
          </div>
        )}

        {/* Right column: questions */}
        <div className="rd__questions-col">
          {questions.map((q, qi) => {
            const sel = answers[q.id];
            return (
              <div key={q.id} className="rd__item">
                <div className="rd__item-hd">
                  <span className="rd__qnum">{startNum + qi}.</span>
                  <p className="rd__qtext">{q.text}</p>
                </div>
                <div className="rd__opts">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={`rd__opt${sel === oi ? ' rd__opt--sel' : ''}`}
                      onClick={() => onAnswerById(q.id, oi)}
                    >
                      <span className="rd__opt-ltr">{String.fromCharCode(65 + oi)}.</span>
                      <span className="rd__opt-txt">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="prac-question__footer">
        <button className="btn btn-ghost btn-sm" onClick={onGoPrev} disabled={isFirstSection}>
          ← Anterior
        </button>
        <button className="btn btn-sm" onClick={onGoNext}>
          {isLastSection ? 'Finalizar examen' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

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
  const weakestSection = results.sections.reduce((weakest, section) => {
    const sectionRate = section.total ? section.correct / section.total : 0;
    const weakestRate = weakest.total ? weakest.correct / weakest.total : 0;
    return sectionRate < weakestRate ? section : weakest;
  }, results.sections[0]);

  return (
    <div className="prac-results">
      <div className="prac-results__hero" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <p className="prac-results__label">{exam.slug === 'icfes' ? 'Porcentaje de aciertos' : 'Resultado final'}</p>
        <div className="prac-results__score">{results.score}</div>
        <p className="prac-results__score-sub">{exam.slug === 'icfes' ? '% de esta práctica' : 'sobre 100 puntos'}</p>
        <p className="prac-results__fraction">{results.totalCorrect} / {results.totalQuestions} correctas</p>
        {exam.slug === 'icfes' && (
          <p style={{ maxWidth: 560, margin: '0.8rem auto 0', lineHeight: 1.55, opacity: 0.82 }}>
            Esta práctica propia abreviada no reproduce la extensión estándar 2026-2 ni predice tu puntaje oficial ICFES.
          </p>
        )}
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
              {qs.map((q) => {
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

      {exam.slug === 'icfes' && weakestSection && (
        <div className="prac-results__actions" aria-label="Siguiente paso recomendado">
          <Link href={`/practica/icfes-saber-11/parte-${weakestSection.part}`} className="btn">
            Reforzar Parte {weakestSection.part} →
          </Link>
          <Link href="/practica/icfes-saber-11/examenes" className="btn btn-ghost">
            Practicar un cuadernillo divulgado
          </Link>
        </div>
      )}

      <div className="prac-results__actions">
        <button onClick={onRetry} className="btn btn-ghost">Intentar de nuevo</button>
        <Link href={`/examenes/${exam.slug}`} className="btn">Volver al examen</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'lead' | 'results';

// ── Lead gate (shown after exam, before results) ───────────────────────────────
function LeadGateView({
  exam,
  onSubmit,
}: {
  exam: Exam;
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
    <div className="prac-lead-gate" style={{ '--exam-color': exam.color } as React.CSSProperties}>
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

export default function PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const hasGuidedMode = exam.slug === 'icfes' && hasGuidedMock(mock.id);
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  // Holds computed score while user fills the lead gate
  const pendingResultRef = useRef<{ correct: number; total: number; score: number } | null>(null);

  const allQuestions = getAllQuestions(mock) as MCQQuestion[];
  const currentQuestion = allQuestions[currentIdx];
  const currentPart = currentQuestion?.part ?? 1;
  const currentSection = mock.sections.find(s => s.part === currentPart);

  const handleAnswer = useCallback((optIdx: number) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optIdx }));
  }, [currentQuestion]);

  // Used by MatchingGridSection to set answers for any question by id
  const handleAnswerById = useCallback((qId: string, idx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  }, []);

  const handleSubmit = useCallback(() => {
    // Compute score and go to lead gate — actual save happens after lead form
    const qs = allQuestions as MCQQuestion[];
    const correct = qs.filter(q => answers[q.id] === q.answer).length;
    const score = Math.round((correct / qs.length) * 100);
    pendingResultRef.current = { correct, total: qs.length, score };
    setPhase('lead');
  }, [allQuestions, answers]);

  // Jump to first question of the section after current
  const handleNextSection = useCallback(() => {
    const nextIdx = allQuestions.findIndex(q => q.part > currentPart);
    if (nextIdx !== -1) setCurrentIdx(nextIdx);
    else handleSubmit();
  }, [allQuestions, currentPart, handleSubmit]);

  // Jump to last question of the section before current
  const handlePrevSection = useCallback(() => {
    let last = -1;
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].part < currentPart) last = i;
    }
    if (last !== -1) setCurrentIdx(last);
  }, [allQuestions, currentPart]);

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

  const handleLeadSubmit = useCallback(async (lead: { name: string; email: string; whatsapp: string }) => {
    const qs = allQuestions as MCQQuestion[];
    const { correct, total, score } = pendingResultRef.current ?? { correct: 0, total: qs.length, score: 0 };
    // Save lead + exam result in parallel
    await Promise.allSettled([
      saveLead({
        name: lead.name,
        whatsapp: lead.whatsapp,
        email: lead.email,
        examSlug: exam.slug,
        examScore: `${score}/100 (${correct}/${total} correctas)`,
        source: 'icfes-practica',
      }),
      saveExamResult({
        examSlug: exam.slug,
        examName: exam.name,
        mockTitle: mock.title,
        totalScore: score,
        totalMax: 100,
        totalLabel: `${correct}/${total} correctas`,
        skills: mock.sections.map(sec => {
          const sqs = sec.questions.filter(q => q.type === 'mcq') as MCQQuestion[];
          const sc = sqs.filter(q => answers[q.id] === q.answer).length;
          return { skill: sec.title, score: sqs.length ? Math.round(sc / sqs.length * 100) : 0, max: 100, label: `${sc}/${sqs.length}` };
        }),
      }),
    ]);
    setPhase('results');
  }, [allQuestions, answers, exam, mock]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setFlagged(new Set());
    setCurrentIdx(0);
    setPhase('intro');
  }, []);

  if (phase === 'lead') {
    return (
      <div className="prac-shell">
        <LeadGateView exam={exam} onSubmit={handleLeadSubmit} />
      </div>
    );
  }

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

          <div style={{ display: 'flex', justifyContent: 'center', gap: '.7rem', flexWrap: 'wrap' }}>
            <button onClick={() => setPhase('exam')} className="btn" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>{exam.slug === 'icfes' ? 'Empezar modo examen →' : 'Empezar examen →'}</button>
            {hasGuidedMode && <Link href={`/examenes/icfes/practica/${mock.id}/guiado`} className="btn btn-ghost" style={{ fontSize: '1rem', padding: '0.9rem 1.5rem' }}>Aprender en modo guiado</Link>}
          </div>

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
          {(() => {
            const sectionStart = allQuestions.findIndex(q => q.part === currentPart) + 1;
            const isFirst = mock.sections[0].part === currentPart;
            const isLast = mock.sections[mock.sections.length - 1].part === currentPart;
            const sharedProps = {
              section: currentSection!,
              answers,
              onAnswerById: handleAnswerById,
              onGoPrev: handlePrevSection,
              onGoNext: handleNextSection,
              isFirstSection: isFirst,
              isLastSection: isLast,
              startNum: sectionStart,
            };
            if (currentSection?.sectionStyle === 'notices-grid') {
              return <NoticesGridSection {...sharedProps} />;
            }
            if (currentSection?.sectionStyle === 'dialogs-grid') {
              return <DialogsGridSection {...sharedProps} />;
            }
            if (currentSection?.sectionStyle === 'matching-grid') {
              return <MatchingGridSection {...sharedProps} />;
            }
            if (currentSection?.sectionStyle === 'cloze-text') {
              return <ClozeSection {...sharedProps} />;
            }
            if (currentSection?.sectionStyle === 'reading') {
              return <ReadingSection {...sharedProps} />;
            }
            return (
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
            );
          })()}
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
