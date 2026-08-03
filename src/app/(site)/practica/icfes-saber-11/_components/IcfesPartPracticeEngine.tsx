'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { IcfesPracticeQuestion } from '@/data/icfes/questions';
import type { IcfesPartConfig } from '@/data/icfes/parts';
import styles from '../icfes-learning.module.css';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

interface AttemptAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  elapsedSeconds: number;
  answeredAt: string;
}

interface LocalProgress {
  version: 1;
  part: number;
  updatedAt: string;
  attempts: AttemptAnswer[];
  completedSessions: number;
}

const STORAGE_PREFIX = 'wl:icfes:part-progress:v1';

function track(event: string, fields: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, exam: 'icfes-saber-11', ...fields });
}

function readProgress(part: number, scope = 'part'): LocalProgress {
  const empty: LocalProgress = { version: 1, part, updatedAt: new Date(0).toISOString(), attempts: [], completedSessions: 0 };
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}:${scope}:${part}`);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<LocalProgress>;
    if (parsed.version !== 1 || parsed.part !== part || !Array.isArray(parsed.attempts)) return empty;
    return { ...empty, ...parsed, attempts: parsed.attempts };
  } catch {
    return empty;
  }
}

function writeProgress(progress: LocalProgress, scope = 'part') {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}:${scope}:${progress.part}`, JSON.stringify(progress));
  } catch {
    // La práctica nunca depende de que localStorage esté disponible.
  }
}

function formatSeconds(seconds: number) {
  if (seconds < 60) return `${seconds} s`;
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
}

export default function IcfesPartPracticeEngine({
  part,
  questions,
  context = 'part-practice',
  progressScope = 'part',
}: {
  part: IcfesPartConfig;
  questions: IcfesPracticeQuestion[];
  context?: 'part-practice' | 'guided-simulator';
  progressScope?: string;
}) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [savedAttempts, setSavedAttempts] = useState(0);
  const questionStartedAt = useRef(Date.now());
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedAttempts(readProgress(part.part, progressScope).attempts.length);
  }, [part.part, progressScope]);

  useEffect(() => {
    if (confirmed) feedbackRef.current?.focus();
  }, [confirmed]);

  const question = questions[currentIndex];
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const totalSeconds = answers.reduce((sum, answer) => sum + answer.elapsedSeconds, 0);
  const accuracy = answers.length ? Math.round((correctCount / answers.length) * 100) : 0;
  const averageSeconds = answers.length ? Math.round(totalSeconds / answers.length) : 0;

  const recommendation = useMemo(() => {
    if (accuracy >= 80 && averageSeconds <= 35) return { label: `Continuar con la Parte ${Math.min(7, part.part + 1)}`, href: `/practica/icfes-saber-11/parte-${Math.min(7, part.part + 1)}` };
    if (part.part === 1) return { label: 'Reforzar vocabulario', href: '/practica/icfes-saber-11/vocabulario' };
    return { label: 'Repetir esta práctica', href: `/practica/icfes-saber-11/${part.slug}` };
  }, [accuracy, averageSeconds, part.part, part.slug]);

  if (!questions.length) {
    return (
      <div className={styles.practiceEmpty}>
        <span aria-hidden="true">◇</span>
        <h2>La práctica guiada de esta parte está en revisión editorial</h2>
        <p>La guía, estrategia y rutas relacionadas ya están disponibles. Publicaremos preguntas cuando tengan explicación, evidencia y distractores revisados.</p>
        <Link href="/practica/icfes-saber-11/examenes" className={styles.secondaryButton}>Practicar un cuadernillo</Link>
      </div>
    );
  }

  function start() {
    setStarted(true);
    questionStartedAt.current = Date.now();
    track(context === 'guided-simulator' ? 'icfes_guided_simulator_start' : 'icfes_practice_start', { part: part.part, question_count: questions.length, progress_scope: progressScope });
  }

  function confirm() {
    if (selectedIndex === null || confirmed) return;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - questionStartedAt.current) / 1000));
    const nextAnswer: AttemptAnswer = {
      questionId: question.id,
      selectedIndex,
      isCorrect: selectedIndex === question.answerIndex,
      elapsedSeconds,
      answeredAt: new Date().toISOString(),
    };
    setAnswers((current) => [...current, nextAnswer]);
    setConfirmed(true);

    const progress = readProgress(part.part, progressScope);
    const updated: LocalProgress = {
      ...progress,
      updatedAt: new Date().toISOString(),
      attempts: [...progress.attempts, nextAnswer].slice(-200),
    };
    writeProgress(updated, progressScope);
    setSavedAttempts(updated.attempts.length);
    track('icfes_question_answered', { part: part.part, question_id: question.id, correct: nextAnswer.isCorrect, elapsed_seconds: elapsedSeconds });
  }

  function next() {
    if (currentIndex === questions.length - 1) {
      const progress = readProgress(part.part, progressScope);
      writeProgress({ ...progress, updatedAt: new Date().toISOString(), completedSessions: progress.completedSessions + 1 }, progressScope);
      setFinished(true);
      track(context === 'guided-simulator' ? 'icfes_guided_simulator_complete' : 'icfes_practice_complete', { part: part.part, question_count: questions.length, correct_count: correctCount, accuracy, progress_scope: progressScope });
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedIndex(null);
    setConfirmed(false);
    questionStartedAt.current = Date.now();
  }

  function restart() {
    setStarted(true);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setConfirmed(false);
    setAnswers([]);
    setFinished(false);
    questionStartedAt.current = Date.now();
    track('icfes_practice_restart', { part: part.part });
  }

  if (!started) {
    return (
      <div className={styles.practiceIntro} style={{ '--part-color': part.color } as React.CSSProperties}>
        <div className={styles.practiceIntroIcon} aria-hidden="true">{part.icon}</div>
        <div>
          <p className={styles.kicker}>Práctica guiada · sin registro</p>
          <h2>Aprende con cada respuesta</h2>
          <p>Responde {questions.length} preguntas. Después de confirmar verás la evidencia, la razón correcta, el error de cada distractor y una microlección.</p>
          <div className={styles.practiceMeta}>
            <span>◷ {questions.reduce((sum, item) => sum + item.targetSeconds, 0) / 60 < 2 ? '2 min' : `${Math.ceil(questions.reduce((sum, item) => sum + item.targetSeconds, 0) / 60)} min`}</span>
            <span>✓ Feedback inmediato</span>
            <span>↻ Progreso local: {savedAttempts} respuestas</span>
          </div>
          <button type="button" className={styles.primaryButton} onClick={start}>Comenzar práctica</button>
        </div>
      </div>
    );
  }

  if (finished) {
    const belowTarget = answers.filter((answer) => answer.elapsedSeconds > (questions.find((item) => item.id === answer.questionId)?.targetSeconds ?? 30)).length;
    return (
      <div className={styles.resultCard} aria-live="polite">
        <p className={styles.kicker}>Sesión completada</p>
        <h2>{accuracy >= 80 ? 'Buen dominio de esta parte' : 'Ya sabemos qué reforzar'}</h2>
        <div className={styles.resultScore} style={{ '--score': `${accuracy}%`, '--part-color': part.color } as React.CSSProperties}>
          <strong>{accuracy}%</strong><span>precisión</span>
        </div>
        <div className={styles.resultGrid}>
          <div><strong>{correctCount}/{answers.length}</strong><span>correctas</span></div>
          <div><strong>{formatSeconds(totalSeconds)}</strong><span>tiempo total</span></div>
          <div><strong>{formatSeconds(averageSeconds)}</strong><span>promedio</span></div>
          <div><strong>{belowTarget}</strong><span>sobre el tiempo meta</span></div>
        </div>
        <div className={styles.resultAdvice}>
          <strong>Recomendación:</strong>{' '}
          {accuracy >= 80 ? 'Avanza y conserva esta parte en repaso periódico.' : 'Repite los errores y vuelve a intentarlo después de la microlección recomendada.'}
        </div>
        <div className={styles.actionRow}>
          <Link href={recommendation.href} className={styles.primaryButton}>{recommendation.label}</Link>
          <button type="button" className={styles.secondaryButton} onClick={restart}>Repetir sesión</button>
          <Link href="/practica/icfes-saber-11" className={styles.textLink}>Volver al hub</Link>
        </div>
      </div>
    );
  }

  const isCorrect = selectedIndex === question.answerIndex;

  return (
    <div className={styles.practiceShell} style={{ '--part-color': part.color, '--part-soft': part.softColor } as React.CSSProperties}>
      <div className={styles.progressHeader}>
        <div><span>Parte {part.part}</span><strong>Pregunta {currentIndex + 1} de {questions.length}</strong></div>
        <span>{Math.round((currentIndex / questions.length) * 100)}% completado</span>
      </div>
      <div className={styles.progressTrack} aria-label={`Progreso: pregunta ${currentIndex + 1} de ${questions.length}`}>
        <span style={{ width: `${(currentIndex / questions.length) * 100}%` }} />
      </div>

      <div className={styles.questionGrid}>
        <section className={styles.stimulusPanel} aria-label={question.stimulusLabel ?? 'Estímulo'}>
          <span>{question.stimulusLabel ?? 'Texto'}</span>
          {question.type === 'notice' ? <div className={styles.noticeCard}>{question.stimulus}</div> : <h3>{question.stimulus}</h3>}
          {question.wordBank && <div className={styles.wordBank}>{question.wordBank.map((word) => <span key={word}>{word}</span>)}</div>}
          <div className={styles.targetTime}>Tiempo objetivo: {question.targetSeconds} s</div>
        </section>

        <section className={styles.answerPanel}>
          <p className={styles.questionPrompt}>{question.prompt}</p>
          <div className={styles.optionList} role="radiogroup" aria-label="Opciones de respuesta">
            {question.options.map((option, index) => {
              const state = confirmed
                ? index === question.answerIndex ? 'correct' : index === selectedIndex ? 'incorrect' : 'idle'
                : index === selectedIndex ? 'selected' : 'idle';
              return (
                <button
                  type="button"
                  role="radio"
                  aria-checked={index === selectedIndex}
                  disabled={confirmed}
                  className={styles.optionButton}
                  data-state={state}
                  key={option.text}
                  onClick={() => setSelectedIndex(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{option.text}</strong>
                  {confirmed && index === question.answerIndex && <em>✓ Correcta</em>}
                  {confirmed && index === selectedIndex && index !== question.answerIndex && <em>× Tu respuesta</em>}
                </button>
              );
            })}
          </div>
          {!confirmed && <button type="button" className={styles.primaryButton} disabled={selectedIndex === null} onClick={confirm}>Confirmar respuesta</button>}
        </section>
      </div>

      {confirmed && selectedIndex !== null && (
        <div ref={feedbackRef} tabIndex={-1} className={styles.feedbackCard} data-correct={isCorrect} aria-live="polite">
          <div className={styles.feedbackTitle}>
            <span aria-hidden="true">{isCorrect ? '✓' : '!'}</span>
            <div><p>{isCorrect ? 'Respuesta correcta' : 'Vamos a corregirla'}</p><h3>{question.explanation}</h3></div>
          </div>
          <div className={styles.evidenceBox}>
            <span>Evidencia</span>
            <mark>“{question.evidence.quote}”</mark>
            <p>{question.evidence.reason}</p>
          </div>
          <div className={styles.feedbackColumns}>
            <div>
              <h4>Por qué las opciones funcionan o fallan</h4>
              <ul className={styles.distractorList}>
                {question.options.map((option, index) => (
                  <li key={option.text} data-answer={index === question.answerIndex}>
                    <strong>{String.fromCharCode(65 + index)}. {option.text}</strong>
                    <span>{option.rationale}</span>
                    {option.trap && <small>Trampa: {option.trap}</small>}
                  </li>
                ))}
              </ul>
            </div>
            <aside className={styles.miniLesson}>
              <span>Microlección</span>
              <h4>{question.microLesson.title}</h4>
              <p>{question.microLesson.body}</p>
              <strong>Estrategia transferible</strong>
              <p>{question.strategy}</p>
              <Link href={question.reinforcement.href}>{question.reinforcement.label} →</Link>
            </aside>
          </div>
          <button type="button" className={styles.primaryButton} onClick={next}>{currentIndex === questions.length - 1 ? 'Ver mi resultado' : 'Siguiente pregunta'}</button>
        </div>
      )}
    </div>
  );
}
