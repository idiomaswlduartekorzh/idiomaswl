'use client';

import { useEffect, useState } from 'react';
import type { ToeflBuildSentenceItem } from '@/data/toefl/build-sentence-set-1';
import type { ToeflBuildSentenceScoreResult } from '@/lib/toefl/build-sentence-contract';
import BuildSentenceItem from './BuildSentenceItem';
import styles from './BuildSentenceSet1.module.css';

type Answers = Record<string, string[]>;

interface SavedAttempt {
  version: 1;
  attemptId: string;
  answers: Answers;
  result?: ToeflBuildSentenceScoreResult;
  lastFocusId?: string;
}

type BuildSentencePracticeSet = {
  id: string;
  objectId: string;
  items: readonly ToeflBuildSentenceItem[];
};

function createClientId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${value}`;
}

export default function BuildSentenceSet1Practice({ practice, setNumber }: { practice: BuildSentencePracticeSet; setNumber: number }) {
  const storageKey = `wl:toefl:build-sentence:set${setNumber}:attempt:v1`;
  const [attemptId, setAttemptId] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ToeflBuildSentenceScoreResult>();
  const [lastFocusId, setLastFocusId] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [technicalError, setTechnicalError] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as SavedAttempt;
          if (saved.version === 1 && saved.attemptId && saved.answers) {
            setAttemptId(saved.attemptId);
            setAnswers(saved.answers);
            setResult(saved.result);
            setLastFocusId(saved.lastFocusId ?? '');
            if (saved.lastFocusId && !saved.result) {
              window.requestAnimationFrame(() => document.getElementById(saved.lastFocusId!)?.focus());
            }
          } else setAttemptId(createClientId('attempt'));
        } else setAttemptId(createClientId('attempt'));
      } catch {
        setAttemptId(createClientId('attempt'));
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !attemptId) return;
    try {
      const saved: SavedAttempt = { version: 1, attemptId, answers, result, lastFocusId };
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      // Anonymous practice remains usable without local storage.
    }
  }, [answers, attemptId, hydrated, lastFocusId, result, storageKey]);

  async function submit() {
    if (submitting || !attemptId) return;
    setSubmitting(true);
    setTechnicalError(false);
    try {
      const response = await fetch('/api/practica/toefl/build-sentence/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          objectId: practice.objectId,
          attemptId,
          closeId: `close:${attemptId}:build-sentence-set${setNumber}`,
          responses: answers,
          presentedItemIds: practice.items.map((item) => item.id),
        }),
      });
      if (!response.ok) throw new Error('build_sentence_scoring_unavailable');
      setResult(await response.json() as ToeflBuildSentenceScoreResult);
    } catch {
      setTechnicalError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function retry() {
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
    setAttemptId(createClientId('attempt'));
    setAnswers({});
    setResult(undefined);
    setLastFocusId('');
    setTechnicalError(false);
  }

  const complete = practice.items.filter((item) => (answers[item.id] ?? []).length === item.blankCount).length;
  return (
    <section className={styles.shell} aria-labelledby="build-sentence-set1-title">
      <div className={styles.header}>
        <p className={styles.disclosure}>Set {setNumber} · {practice.items.length} exercises</p>
        <h2 id="build-sentence-set1-title">Build a Sentence</h2>
        <p>Arrange the fragments to form a complete, grammatical response. One fragment is not used.</p>
      </div>

      <div className={styles.items}>
        {practice.items.map((item, index) => (
          <BuildSentenceItem
            key={item.id}
            item={item}
            number={index + 1}
            order={answers[item.id] ?? []}
            onChange={(order) => {
              setAnswers((current) => ({ ...current, [item.id]: order }));
              setTechnicalError(false);
            }}
            onFocus={setLastFocusId}
            outcome={result?.outcomes.find((outcome) => outcome.itemId === item.id)}
          />
        ))}
      </div>

      {technicalError && (
        <div className={styles.technical} role="status" aria-live="polite">
          We could not score this exercise because of a technical error. Your answers are still saved. Please try again.
        </div>
      )}

      {result ? (
        <div className={styles.summary} role="status" aria-live="polite">
          <h3>Exercise result</h3>
          <p><strong>{result.correct} of {result.denominator}</strong> sentences correct.</p>
          <p>Each item is now marked as correct or incorrect below. Choose “Try again” to rebuild the sentences.</p>
          <p className={styles.disclosure}>This local result is not an official TOEFL score.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Try again</button>
        </div>
      ) : (
        <div className={styles.actions}>
          <p>Completed: {complete} of {practice.items.length}</p>
          <button type="button" className="btn" disabled={!hydrated || submitting} onClick={() => { void submit(); }}>
            {submitting ? 'Checking…' : 'Check my answers'}
          </button>
        </div>
      )}
    </section>
  );
}
