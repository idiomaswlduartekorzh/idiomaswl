'use client';

import { useEffect, useMemo, useState } from 'react';

import type { ToeflFixedReadingPassage } from '@/data/toefl/reading-module2-types';
import type { ToeflReadingScoreResult } from '@/lib/toefl/reading-contract';
import { ReadingSingleChoiceGroup, type ReadingChoiceOutcome } from './ReadingChoiceGroup';
import styles from './ReadingSet1Practice.module.css';

type SavedAttempt = {
  version: 1;
  attemptId: string;
  answers: Record<string, string>;
  result?: ToeflReadingScoreResult;
};

function createAttemptId() {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `attempt:${suffix}`;
}

function visibleOutcome(result: ToeflReadingScoreResult | undefined, itemId: string) {
  const outcome = result?.outcomes.find((entry) => entry.itemId === itemId);
  if (!outcome || outcome.status === 'not_presented' || outcome.status === 'invalidated') return undefined;
  return outcome as ReadingChoiceOutcome;
}

export default function ReadingPracticeSet({
  objectId,
  setNumber,
  task,
  passages,
}: {
  objectId: string;
  setNumber: number;
  task: 'Read in Daily Life' | 'Read an Academic Passage';
  passages: readonly ToeflFixedReadingPassage[];
}) {
  const items = useMemo(() => passages.flatMap((passage) => passage.items), [passages]);
  const storageKey = `wl:toefl:reading:${objectId}:${task}:v1`;
  const [attemptId, setAttemptId] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ToeflReadingScoreResult>();
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [technicalError, setTechnicalError] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as SavedAttempt;
          if (saved.version === 1 && saved.attemptId) {
            setAttemptId(saved.attemptId);
            setAnswers(saved.answers ?? {});
            setResult(saved.result);
          } else setAttemptId(createAttemptId());
        } else setAttemptId(createAttemptId());
      } catch { setAttemptId(createAttemptId()); }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !attemptId) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ version: 1, attemptId, answers, result } satisfies SavedAttempt));
    } catch { /* Practice remains available without browser storage. */ }
  }, [answers, attemptId, hydrated, result, storageKey]);

  async function submit() {
    if (!attemptId || submitting) return;
    setSubmitting(true);
    setTechnicalError(false);
    try {
      const response = await fetch('/api/practica/toefl/reading/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          objectId,
          attemptId,
          closeId: `close:${attemptId}:${task === 'Read in Daily Life' ? 'daily-life' : 'academic'}`,
          responses: answers,
          presentedItemIds: items.map((item) => item.id),
        }),
      });
      if (!response.ok) throw new Error('reading_scoring_unavailable');
      setResult(await response.json() as ToeflReadingScoreResult);
    } catch { setTechnicalError(true); }
    finally { setSubmitting(false); }
  }

  function retry() {
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
    setAttemptId(createAttemptId());
    setAnswers({});
    setResult(undefined);
    setTechnicalError(false);
  }

  const answered = items.filter((item) => Boolean(answers[item.id])).length;
  const scored = result?.outcomes.filter((outcome) => items.some((item) => item.id === outcome.itemId)) ?? [];
  const correct = scored.reduce((sum, outcome) => sum + (outcome.rawPoints ?? 0), 0);

  return (
    <section className={styles.shell} aria-labelledby="reading-practice-title">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Set {setNumber} · Interactive practice</p>
        <h2 id="reading-practice-title">{task}</h2>
        <p>Read each text and answer the questions. Your attempt stays in this browser.</p>
      </div>

      <div className={styles.blocks}>
        {passages.map((passage) => (
          <article key={passage.id} className={styles.block}>
            <div className={styles.stimulus}>
              <p className={styles.genre}>{task}</p>
              <h3>{passage.title}</h3>
              <p className={styles.instructions}>{passage.instructions}</p>
              <div className={styles.text}>{passage.text}</div>
            </div>
            <div className={styles.questions}>
              {passage.items.map((item, index) => (
                <ReadingSingleChoiceGroup
                  key={item.id}
                  itemId={item.id}
                  number={index + 1}
                  prompt={item.prompt}
                  options={item.options}
                  selectedOptionId={answers[item.id]}
                  onSelect={(optionId) => {
                    setAnswers((current) => ({ ...current, [item.id]: optionId }));
                    setTechnicalError(false);
                  }}
                  outcome={visibleOutcome(result, item.id)}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {technicalError ? (
        <div className={styles.technical} role="status">We could not score this exercise. Your answers are saved. Please try again.</div>
      ) : null}

      {result ? (
        <div className={styles.summary} role="status" aria-live="polite">
          <h3>Exercise result</h3>
          <p><strong>{correct} of {items.length}</strong> answers correct.</p>
          <p className={styles.disclosure}>This local result is not an official TOEFL score.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Try again</button>
        </div>
      ) : (
        <div className={styles.actions}>
          <p>Answered: {answered} of {items.length}</p>
          <button type="button" className="btn" disabled={!hydrated || submitting} onClick={() => { void submit(); }}>
            {submitting ? 'Checking…' : 'Submit answers'}
          </button>
        </div>
      )}
    </section>
  );
}
