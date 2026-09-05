'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Headphones, RotateCcw, ShieldCheck } from 'lucide-react';

import { AudioPlayer } from '@/components/exam-runner/primitives';
import type { MockSection, ToeflListeningSingleQuestion } from '@/data/mocks/types';
import type { ToeflListeningSectionPractice } from '@/data/toefl/sectional-listening-adapter';
import type { ToeflListeningScoreResult } from '@/lib/toefl/listening-contract';
import { CURRENT_LISTENING_ORDER, LEGACY_LISTENING_ORDER, listeningDisplayOptions, restoreListeningOrderVersion, type ListeningOrderVersion } from '@/data/toefl/listening-option-order';

import styles from './runner.module.css';

type Phase = 'intro' | 'practice' | 'scoring' | 'results';

type ListeningFrame = {
  id: string;
  label: string;
  title: string;
  instructions: string;
  audioUrl?: string;
  mediaId: string;
  questions: ToeflListeningSingleQuestion[];
};

const TASK_LABELS = {
  'choose-response': 'Choose a Response',
  conversation: 'Conversation',
  announcement: 'Announcement',
  'academic-talk': 'Academic Talk',
} as const;

function listeningQuestions(section: MockSection) {
  return section.questions.filter(
    (question): question is ToeflListeningSingleQuestion => question.type === 'toefl-listening-single',
  );
}

function buildFrames(practice: ToeflListeningSectionPractice): ListeningFrame[] {
  return practice.sections.flatMap((section) => {
    const questions = listeningQuestions(section);
    if (section.audioUrl && section.mediaId) {
      return [{
        id: `${section.mediaId}:frame`,
        label: TASK_LABELS[questions[0].task],
        title: section.title,
        instructions: section.instructions,
        audioUrl: section.audioUrl,
        mediaId: section.mediaId,
        questions,
      }];
    }

    return questions.map((question) => ({
      id: `${question.mediaId}:frame`,
      label: TASK_LABELS[question.task],
      title: section.title,
      instructions: section.instructions,
      audioUrl: question.audioUrl,
      mediaId: question.mediaId,
      questions: [question],
    }));
  });
}

function createAttemptId() {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `sectional-listening:${suffix}`;
}

function openPracticeInstructions(instructions: string) {
  return instructions
    .replace('Listen to each short exchange once.', 'Listen to each short exchange.')
    .replace(/\s*(?:Each|The) audio plays once\./g, '');
}

function taskBreakdown(
  practice: ToeflListeningSectionPractice,
  result: ToeflListeningScoreResult,
) {
  const taskById = new Map(
    practice.sections.flatMap((section) => listeningQuestions(section))
      .map((question) => [question.id, question.task]),
  );

  return Object.entries(TASK_LABELS).map(([task, label]) => {
    const outcomes = result.outcomes.filter((outcome) => taskById.get(outcome.itemId) === task);
    return {
      task,
      label,
      correct: outcomes.reduce((total, outcome) => total + (outcome.rawPoints ?? 0), 0),
      total: outcomes.filter((outcome) => outcome.maxRawPoints === 1).length,
    };
  });
}

export default function ToeflListeningSectionRunner({
  practice,
}: {
  practice: ToeflListeningSectionPractice;
}) {
  const setLabel = practice.sourceMockId.replace('set-', 'Set ');
  const frames = useMemo(() => buildFrames(practice), [practice]);
  const questions = useMemo(
    () => practice.sections.flatMap((section) => listeningQuestions(section)),
    [practice],
  );
  const storageKey = `wl:toefl:sectional:listening:${practice.sourceMockId}:v1`;
  const [phase, setPhase] = useState<Phase>('intro');
  const [listeningOrderVersion, setListeningOrderVersion] = useState<ListeningOrderVersion>(LEGACY_LISTENING_ORDER);
  const [frameIndex, setFrameIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedMediaIds, setStartedMediaIds] = useState<string[]>([]);
  const [completedMediaIds, setCompletedMediaIds] = useState<string[]>([]);
  const [attemptId, setAttemptId] = useState('');
  const [result, setResult] = useState<ToeflListeningScoreResult | null>(null);
  const [audioError, setAudioError] = useState(false);
  const [audioRetryNonce, setAudioRetryNonce] = useState(0);
  const [scoringError, setScoringError] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const activeFrame = frames[frameIndex];
  const answeredInFrame = activeFrame
    ? activeFrame.questions.filter((question) => answers[question.id]).length
    : 0;
  const missingResponses = activeFrame
    ? activeFrame.questions.length - answeredInFrame
    : 0;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          version?: number;
          frameIndex?: number;
          answers?: Record<string, string>;
          startedMediaIds?: string[];
          completedMediaIds?: string[];
          attemptId?: string;
          listeningOrderVersion?: unknown;
        };
        if (saved.version === 1 && saved.attemptId) {
          setListeningOrderVersion(restoreListeningOrderVersion(saved.listeningOrderVersion));
          const started = saved.startedMediaIds ?? [];
          setFrameIndex(Math.min(Math.max(saved.frameIndex ?? 0, 0), frames.length - 1));
          setAnswers(saved.answers ?? {});
          setStartedMediaIds(started);
          setCompletedMediaIds([...new Set([...(saved.completedMediaIds ?? []), ...started])]);
          setAttemptId(saved.attemptId);
          setPhase('practice');
        }
      }
    } catch {
      // Anonymous practice continues without local restoration.
    }
    setHydrated(true);
  }, [frames.length, storageKey]);

  useEffect(() => {
    if (!hydrated || phase !== 'practice' || !attemptId) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: 1,
        listeningOrderVersion,
        frameIndex,
        answers,
        startedMediaIds,
        completedMediaIds,
        attemptId,
      }));
    } catch {
      // Practice remains usable when storage is unavailable.
    }
  }, [answers, attemptId, completedMediaIds, frameIndex, hydrated, listeningOrderVersion, phase, startedMediaIds, storageKey]);

  const begin = useCallback(() => {
    if (!hydrated) return;
    setListeningOrderVersion(CURRENT_LISTENING_ORDER);
    setAttemptId(createAttemptId());
    setPhase('practice');
  }, [hydrated]);

  const scoreAttempt = useCallback(async () => {
    setPhase('scoring');
    setScoringError(false);
    try {
      const stableAttemptId = attemptId || createAttemptId();
      if (!attemptId) setAttemptId(stableAttemptId);
      const response = await fetch('/api/practica/toefl/listening/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          objectId: practice.objectId,
          attemptId: stableAttemptId,
          closeId: `close:${stableAttemptId}:${practice.id}`,
          responses: Object.fromEntries(questions.map((question) => [question.id, answers[question.id] ?? null])),
          presentedItemIds: questions.map((question) => question.id),
        }),
      });
      if (!response.ok) throw new Error('sectional_listening_scoring_unavailable');
      const score = await response.json() as ToeflListeningScoreResult;
      setResult(score);
      setPhase('results');
      try { window.localStorage.removeItem(storageKey); } catch { /* local-only cleanup */ }
    } catch {
      setScoringError(true);
      setPhase('practice');
    }
  }, [answers, attemptId, practice.id, practice.objectId, questions, storageKey]);

  const advance = useCallback(() => {
    if (!activeFrame) return;
    setAudioError(false);
    setAudioRetryNonce(0);
    if (frameIndex === frames.length - 1) {
      void scoreAttempt();
      return;
    }
    setFrameIndex((index) => index + 1);
  }, [activeFrame, frameIndex, frames.length, scoreAttempt]);

  const goToFrame = useCallback((nextIndex: number) => {
    setFrameIndex(Math.min(Math.max(nextIndex, 0), frames.length - 1));
    setAudioError(false);
    setAudioRetryNonce(0);
  }, [frames.length]);

  const reset = useCallback(() => {
    setPhase('intro');
    setFrameIndex(0);
    setAnswers({});
    setStartedMediaIds([]);
    setCompletedMediaIds([]);
    setAttemptId('');
    setResult(null);
    setAudioError(false);
    setAudioRetryNonce(0);
    setScoringError(false);
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
  }, [storageKey]);

  if (phase === 'intro') {
    return (
      <div className={styles.shell}>
        <section className={styles.intro} aria-labelledby="listening-runner-title">
          <p className={styles.kicker}>TOEFL Listening · {setLabel}</p>
          <h1 id="listening-runner-title">One focused Listening session.</h1>
          <p className={styles.lead}>
            This is open practice: replay any audio, move between blocks freely, and leave questions unanswered. Answers are scored with private server-side keys. No official TOEFL score is calculated.
          </p>
          <div className={styles.introGrid}>
            <article>
              <Headphones aria-hidden="true" />
              <strong>Four task families</strong>
              <span>Responses, conversations, announcements, and academic talks.</span>
            </article>
            <article>
              <ShieldCheck aria-hidden="true" />
              <strong>One source set</strong>
              <span>This exercise uses the same {setLabel} content as the full mock.</span>
            </article>
          </div>
          <p className={styles.disclosure}>Fixed WeLearn practice. It does not reproduce adaptive routing or official TOEFL scoring.</p>
          <div className={styles.actions}>
            <button type="button" onClick={begin} disabled={!hydrated}>Start practice <ArrowRight aria-hidden="true" /></button>
            <Link href="/practica/toefl/listening/simulacros">Back to the library</Link>
          </div>
        </section>
      </div>
    );
  }

  if (phase === 'results' && result) {
    const breakdown = taskBreakdown(practice, result);
    return (
      <div className={styles.shell}>
        <section className={styles.results} aria-labelledby="listening-result-title">
          <p className={styles.kicker}>Practice result</p>
          <CheckCircle2 className={styles.resultIcon} aria-hidden="true" />
          <h1 id="listening-result-title">You completed Listening {setLabel}.</h1>
          <p className={styles.rawScore}>{result.correct}/{result.denominator} correct</p>
          <p className={styles.disclosure}>This practice result is not an official TOEFL score or admission equivalency.</p>
          <div className={styles.breakdown}>
            {breakdown.map((entry) => (
              <article key={entry.task}>
                <span>{entry.label}</span>
                <strong>{entry.correct}/{entry.total}</strong>
              </article>
            ))}
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Repeat {setLabel}</button>
            <Link href="/practica/toefl/listening/simulacros">Choose another set</Link>
            <Link href="/examenes/toefl#practica">Open a full mock</Link>
          </div>
        </section>
      </div>
    );
  }

  if (!activeFrame) return null;

  return (
    <div className={styles.shell}>
      <header className={styles.runnerHeader}>
        <div>
          <p>Listening {setLabel}</p>
          <strong>{activeFrame.label}</strong>
        </div>
        <div className={styles.progressCopy} aria-live="polite">
          Step {frameIndex + 1} of {frames.length}
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <span style={{ width: `${((frameIndex + 1) / frames.length) * 100}%` }} />
        </div>
      </header>

      <nav className={styles.frameNav} aria-label="Listening blocks">
        {frames.map((frame, index) => (
          <button
            key={frame.id}
            type="button"
            aria-current={index === frameIndex ? 'step' : undefined}
            onClick={() => goToFrame(index)}
          >
            <span>{index + 1}</span>
            <small>{frame.label}</small>
          </button>
        ))}
      </nav>

      <section className={styles.runnerBody} aria-labelledby="active-listening-title">
        <div className={styles.frameHeading}>
          <p className={styles.kicker}>{activeFrame.label}</p>
          <h1 id="active-listening-title">{activeFrame.title.replace(/^Listening Módulo \d — /, '')}</h1>
          <p>{openPracticeInstructions(activeFrame.instructions)}</p>
        </div>

        <div className={styles.audioPanel}>
          <AudioPlayer
            key={`${activeFrame.id}:${audioRetryNonce}`}
            src={activeFrame.audioUrl}
            label="Practice audio · replay allowed"
            alreadyPlayed={completedMediaIds.includes(activeFrame.mediaId)}
            replayable
            onPlaybackStart={() => {
              setAudioError(false);
              setStartedMediaIds((ids) => ids.includes(activeFrame.mediaId) ? ids : [...ids, activeFrame.mediaId]);
            }}
            onEnded={() => setCompletedMediaIds((ids) =>
              ids.includes(activeFrame.mediaId) ? ids : [...ids, activeFrame.mediaId])}
            onPlaybackError={() => {
              setAudioError(true);
              setStartedMediaIds((ids) => ids.filter((id) => id !== activeFrame.mediaId));
            }}
          />
          {!activeFrame.audioUrl && (
            <p className={styles.error} role="alert">Audio is unavailable. You can still review the questions or continue to another block.</p>
          )}
          {audioError && (
            <p className={styles.error} role="alert">
              <AlertTriangle aria-hidden="true" />
              <span>We could not play the audio. Check your connection.</span>
              <button
                type="button"
                onClick={() => {
                  setAudioError(false);
                  setAudioRetryNonce((nonce) => nonce + 1);
                }}
              >
                Retry audio
              </button>
            </p>
          )}
          {!audioError && <p className={styles.audioHint}>Replay the audio as often as you need. Playback never locks the questions or navigation.</p>}
        </div>

        <div className={styles.questions}>
          {activeFrame.questions.map((question, questionIndex) => (
            <fieldset key={question.id}>
              <legend>
                <span>Question {questionIndex + 1}</span>
                {question.text}
              </legend>
              <div>
                {listeningDisplayOptions(question, listeningOrderVersion).map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => {
                        setAnswers((current) => ({ ...current, [question.id]: option.id }));
                        setScoringError(false);
                      }}
                    />
                    <span className={styles.optionLetter}>{option.label}</span>
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {scoringError && (
          <div className={styles.error} role="alert">
            <AlertTriangle aria-hidden="true" /> Scoring did not respond. Your answers are saved; please try again.
          </div>
        )}

        <footer className={styles.runnerFooter}>
          <p>{answeredInFrame} of {activeFrame.questions.length} answered · unanswered questions are allowed</p>
          <div className={styles.navActions}>
            <button type="button" onClick={() => goToFrame(frameIndex - 1)} disabled={frameIndex === 0 || phase === 'scoring'}>
              <ArrowLeft aria-hidden="true" /> Previous block
            </button>
            <button type="button" onClick={advance} disabled={phase === 'scoring'}>
              {phase === 'scoring'
                ? 'Checking…'
                : frameIndex === frames.length - 1
                  ? `Check answers${missingResponses > 0 ? ' (including blanks)' : ''}`
                  : 'Next block'}
              {phase !== 'scoring' && <ArrowRight aria-hidden="true" />}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
