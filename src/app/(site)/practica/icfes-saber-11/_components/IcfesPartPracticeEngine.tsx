'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IcfesPracticeQuestion } from '@/data/icfes/questions';
import { ICFES_PARTS, type IcfesPartConfig } from '@/data/icfes/parts';
import { calculatePracticeResult } from '@/lib/icfes/scoring.mjs';
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
type PracticeContext = 'part-practice' | 'guided-simulator' | 'daily-question' | 'error-review';
let authenticatedSyncAvailable: boolean | null = null;

async function sendAuthenticatedProgress(body: Record<string, unknown>) {
  if (authenticatedSyncAvailable === false) return;
  try {
    const response = await fetch('/api/icfes/practice-progress', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    authenticatedSyncAvailable = response.status === 202 ? false : response.ok;
  } catch {
    // Offline and anonymous practice remain fully functional in localStorage.
  }
}

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

/**
 * Sesión a medias: por dónde ibas y qué llevabas contestado.
 *
 * `LocalProgress` guarda el historial de intentos —lo que alimenta el repaso de errores y
 * las estadísticas—, pero no la POSICIÓN. El índice de la pregunta vivía en un `useState(0)`
 * y nada lo restauraba, así que cerrar la pestaña y volver a entrar empezaba en la pregunta
 * uno aunque llevaras dieciocho hechas. Los intentos seguían ahí; lo que se perdía era el
 * sitio, que es justo lo que hace abandonar.
 *
 * Se guarda aparte del historial porque tiene otra vida: el historial se acumula, la sesión
 * se borra al terminar.
 */
const SESSION_PREFIX = 'wl:icfes:live-session:v1';

type LiveSession = { version: 1; part: number; index: number; answers: AttemptAnswer[]; updatedAt: string };

function readSession(part: number, scope: string, questionCount: number): LiveSession | null {
  try {
    const raw = window.localStorage.getItem(`${SESSION_PREFIX}:${scope}:${part}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LiveSession>;
    if (parsed.version !== 1 || parsed.part !== part || !Array.isArray(parsed.answers)) return null;
    // Si el banco cambió de tamaño, el índice guardado ya no señala la misma pregunta.
    if (typeof parsed.index !== 'number' || parsed.index <= 0 || parsed.index >= questionCount) return null;
    return { version: 1, part, index: parsed.index, answers: parsed.answers, updatedAt: parsed.updatedAt ?? '' };
  } catch {
    return null;
  }
}

function writeSession(session: LiveSession, scope: string) {
  try {
    window.localStorage.setItem(`${SESSION_PREFIX}:${scope}:${session.part}`, JSON.stringify(session));
  } catch { /* Sin almacenamiento, la práctica sigue: solo no se recuerda el sitio. */ }
}

function clearSession(part: number, scope: string) {
  try {
    window.localStorage.removeItem(`${SESSION_PREFIX}:${scope}:${part}`);
  } catch { /* Nada que limpiar. */ }
}

function formatSeconds(seconds: number) {
  if (seconds < 60) return `${seconds} s`;
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
}

function currentTimeMs() {
  return Date.now();
}

export default function IcfesPartPracticeEngine({
  part,
  questions,
  context = 'part-practice',
  progressScope = 'part',
  onComplete,
  resultAction,
}: {
  part: IcfesPartConfig;
  questions: IcfesPracticeQuestion[];
  context?: PracticeContext;
  progressScope?: string;
  onComplete?: (result: { accuracy: number; correctCount: number; questionCount: number }) => void;
  resultAction?: { label: string; onClick: () => void };
}) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [savedAttempts, setSavedAttempts] = useState(0);
  const [resumedFrom, setResumedFrom] = useState(0);
  const questionStartedAt = useRef(0);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<{ id: string; startedAt: string } | null>(null);

  const syncAttempts = useCallback((attemptsToSync: AttemptAnswer[], sessionId?: string) => {
    if (!attemptsToSync.length) return;
    const questionById = new Map(questions.map((item) => [item.id, item]));
    const payload = attemptsToSync.flatMap((attempt) => {
      const source = questionById.get(attempt.questionId);
      if (!source) return [];
      return [{
        clientAttemptId: `${progressScope}:${attempt.questionId}:${attempt.answeredAt}`,
        clientSessionId: sessionId,
        questionId: attempt.questionId,
        officialPart: source.officialPart,
        skill: source.skill,
        subskill: source.subskill,
        context,
        selectedIndex: attempt.selectedIndex,
        correctIndex: source.answerIndex,
        isCorrect: attempt.isCorrect,
        elapsedSeconds: attempt.elapsedSeconds,
        answeredAt: attempt.answeredAt,
      }];
    });
    if (payload.length) void sendAuthenticatedProgress({ attempts: payload });
  }, [context, progressScope, questions]);

  useEffect(() => {
    const progress = readProgress(part.part, progressScope);
    setSavedAttempts(progress.attempts.length);
    syncAttempts(progress.attempts);
  }, [part.part, progressScope, syncAttempts]);

  // Al confirmar, el foco baja a la justificación: es donde está lo que hay que leer.
  useEffect(() => {
    if (confirmed) feedbackRef.current?.focus();
  }, [confirmed]);

  /**
   * Al AVANZAR, en cambio, hay que volver arriba.
   *
   * Solo existía el foco de la justificación, que deja la página abajo. Al pulsar
   * «Siguiente pregunta» el contenido cambiaba pero el scroll se quedaba donde estaba, así
   * que la pregunta nueva aparecía empezada por la mitad y había que subir a mano en cada
   * una de las treinta.
   */
  useEffect(() => {
    if (!started || confirmed) return;
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentIndex, started, confirmed]);

  const question = questions[currentIndex];
  const activePart = ICFES_PARTS.find((item) => item.part === question?.officialPart) ?? part;
  const targetSecondsByQuestion = Object.fromEntries(questions.map((item) => [item.id, item.targetSeconds]));
  const { correctCount, totalSeconds, accuracy, averageSeconds, overTargetCount } = calculatePracticeResult(answers, targetSecondsByQuestion);

  const recommendation = useMemo(() => {
    if (context === 'guided-simulator') {
      const performance = ICFES_PARTS.map((candidate) => {
        const ids = new Set(questions.filter((item) => item.officialPart === candidate.part).map((item) => item.id));
        const attempts = answers.filter((answer) => ids.has(answer.questionId));
        return { candidate, accuracy: attempts.length ? attempts.filter((answer) => answer.isCorrect).length / attempts.length : 1 };
      }).filter((item) => questions.some((question) => question.officialPart === item.candidate.part));
      const weakest = performance.sort((a, b) => a.accuracy - b.accuracy)[0]?.candidate;
      return weakest
        ? { label: `Reforzar Parte ${weakest.part}`, href: `/practica/icfes-saber-11/${weakest.slug}` }
        : { label: 'Repasar mis errores', href: '/practica/icfes-saber-11/repaso-errores' };
    }
    if (accuracy >= 80 && averageSeconds <= 35) return { label: `Continuar con la Parte ${Math.min(7, part.part + 1)}`, href: `/practica/icfes-saber-11/parte-${Math.min(7, part.part + 1)}` };
    if (part.part === 1) return { label: 'Reforzar vocabulario', href: '/practica/icfes-saber-11/vocabulario' };
    return { label: 'Repetir esta práctica', href: `/practica/icfes-saber-11/${part.slug}` };
  }, [accuracy, answers, averageSeconds, context, part.part, part.slug, questions]);

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
    const startedAt = new Date().toISOString();
    const sessionId = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${progressScope}-${currentTimeMs()}`;
    sessionRef.current = { id: sessionId, startedAt };

    // Si quedó una sesión a medias, se retoma donde se dejó en lugar de volver a la uno.
    const pending = readSession(part.part, progressScope, questions.length);
    if (pending) {
      setCurrentIndex(pending.index);
      setAnswers(pending.answers);
      setResumedFrom(pending.index);
    }

    setStarted(true);
    questionStartedAt.current = currentTimeMs();
    void sendAuthenticatedProgress({
      session: {
        clientSessionId: sessionId,
        context,
        officialPart: part.part,
        progressScope,
        questionCount: questions.length,
        startedAt,
      },
    });
    track(context === 'guided-simulator' ? 'icfes_guided_simulator_start' : 'icfes_practice_start', { part: part.part, question_count: questions.length, progress_scope: progressScope });
  }

  function confirm() {
    if (selectedIndex === null || confirmed) return;
    const elapsedSeconds = Math.max(1, Math.round((currentTimeMs() - questionStartedAt.current) / 1000));
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
    syncAttempts([nextAnswer], sessionRef.current?.id);
    track('icfes_question_answered', { part: question.officialPart, question_id: question.id, correct: nextAnswer.isCorrect, elapsed_seconds: elapsedSeconds, progress_scope: progressScope });
  }

  function next() {
    if (currentIndex === questions.length - 1) {
      const progress = readProgress(part.part, progressScope);
      writeProgress({ ...progress, updatedAt: new Date().toISOString(), completedSessions: progress.completedSessions + 1 }, progressScope);
      // La sesión terminó: ya no hay sitio que recordar. Si no se borra, volver a entrar
      // aterrizaría en la última pregunta de una tanda ya cerrada.
      clearSession(part.part, progressScope);
      setFinished(true);
      if (sessionRef.current) {
        void sendAuthenticatedProgress({
          session: {
            clientSessionId: sessionRef.current.id,
            context,
            officialPart: part.part,
            progressScope,
            questionCount: questions.length,
            correctCount,
            elapsedSeconds: totalSeconds,
            startedAt: sessionRef.current.startedAt,
            completedAt: new Date().toISOString(),
          },
        });
      }
      track(context === 'guided-simulator' ? 'icfes_guided_simulator_complete' : 'icfes_practice_complete', { part: part.part, question_count: questions.length, correct_count: correctCount, accuracy, progress_scope: progressScope });
      onComplete?.({ accuracy, correctCount, questionCount: questions.length });
      return;
    }
    const nextIndex = currentIndex + 1;
    // El sitio se guarda AQUÍ, al avanzar, no al terminar: quien cierra la pestaña en la
    // pregunta dieciocho vuelve a la dieciocho.
    writeSession({ version: 1, part: part.part, index: nextIndex, answers, updatedAt: new Date().toISOString() }, progressScope);
    setCurrentIndex(nextIndex);
    setSelectedIndex(null);
    setConfirmed(false);
    questionStartedAt.current = currentTimeMs();
  }

  function restart() {
    clearSession(part.part, progressScope);
    setResumedFrom(0);
    start();
    setCurrentIndex(0);
    setSelectedIndex(null);
    setConfirmed(false);
    setAnswers([]);
    setFinished(false);
    questionStartedAt.current = currentTimeMs();
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
    return (
      <div className={styles.resultCard} aria-live="polite">
        <p className={styles.kicker}>Sesión completada</p>
        <h2>{accuracy >= 80 ? 'Buen dominio de este recorrido' : 'Ya sabemos qué reforzar'}</h2>
        <div className={styles.resultScore} style={{ '--score': `${accuracy}%`, '--part-color': part.color } as React.CSSProperties}>
          <strong>{accuracy}%</strong><span>precisión</span>
        </div>
        <div className={styles.resultGrid}>
          <div><strong>{correctCount}/{answers.length}</strong><span>correctas</span></div>
          <div><strong>{formatSeconds(totalSeconds)}</strong><span>tiempo total</span></div>
          <div><strong>{formatSeconds(averageSeconds)}</strong><span>promedio</span></div>
          <div><strong>{overTargetCount}</strong><span>sobre el tiempo meta</span></div>
        </div>
        <div className={styles.resultAdvice}>
          <strong>Recomendación:</strong>{' '}
          {accuracy >= 80 ? 'Conserva estas habilidades en repaso periódico.' : 'Empieza por tu parte más débil y después vuelve a medirla con preguntas equivalentes.'}
        </div>
        <div className={styles.actionRow}>
          {resultAction
            ? <button type="button" className={styles.primaryButton} onClick={resultAction.onClick}>{resultAction.label}</button>
            : <Link href={recommendation.href} className={styles.primaryButton}>{recommendation.label}</Link>}
          <button type="button" className={styles.secondaryButton} onClick={restart}>Repetir sesión</button>
          <Link href="/practica/icfes-saber-11" className={styles.textLink}>Volver al hub</Link>
        </div>
      </div>
    );
  }

  const isCorrect = selectedIndex === question.answerIndex;

  return (
    <div className={styles.practiceShell} style={{ '--part-color': activePart.color, '--part-soft': activePart.softColor } as React.CSSProperties}>
      <div className={styles.progressHeader} ref={questionRef}>
        <div><span>Parte {activePart.part} · {activePart.shortTitle}</span><strong>Pregunta {currentIndex + 1} de {questions.length}</strong></div>
        <span>{Math.round(((currentIndex + (confirmed ? 1 : 0)) / questions.length) * 100)}% completado</span>
      </div>
      {resumedFrom > 0 && currentIndex === resumedFrom && (
        <p className={styles.resumeNotice} role="status">
          Retomamos donde lo dejaste, en la pregunta {resumedFrom + 1}.{' '}
          <button type="button" onClick={restart}>Empezar de cero</button>
        </p>
      )}
      <div className={styles.progressTrack} aria-label={`Progreso: pregunta ${currentIndex + 1} de ${questions.length}`}>
        <span style={{ width: `${((currentIndex + (confirmed ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className={styles.questionGrid}>
        <section className={styles.stimulusPanel} data-type={question.type} aria-label={question.stimulusLabel ?? 'Estímulo'}>
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
