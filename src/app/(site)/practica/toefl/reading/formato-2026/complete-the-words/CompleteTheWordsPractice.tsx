'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CompleteWordsScoreResult } from '@/data/toefl/complete-the-words-set-1';
import { validateMissingLetters } from '@/lib/toefl/complete-words-contract';
import PracticeSessionHeader from '@/components/exam-practice/PracticeSessionHeader';
import styles from './complete-the-words.module.css';

type CompleteWordsPracticeSet = {
  id: string;
  objectId: string;
  title: string;
  instructions: string;
  template: string;
  blanks: readonly { id: string; num: number; prefix: string; missingLength: number }[];
};

interface LocalAttempt {
  version: 1;
  attemptId: string;
  closeId?: string;
  values: Record<string, string>;
  lastFocusId?: string;
  result?: CompleteWordsScoreResult;
}

function createId(prefix: string) {
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${id}`;
}

function readAttempt(storageKey: string): LocalAttempt | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LocalAttempt>;
    if (parsed.version !== 1 || typeof parsed.attemptId !== 'string' || !parsed.values || typeof parsed.values !== 'object') return null;
    return parsed as LocalAttempt;
  } catch {
    return null;
  }
}

function writeAttempt(storageKey: string, attempt: LocalAttempt) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(attempt));
  } catch {
    // Anonymous practice remains usable when local storage is unavailable.
  }
}

function archiveAttempt(historyKey: string, attempt: LocalAttempt) {
  if (!attempt.result) return;
  try {
    const current = JSON.parse(window.localStorage.getItem(historyKey) ?? '[]') as LocalAttempt[];
    if (current.some((item) => item.attemptId === attempt.attemptId)) return;
    window.localStorage.setItem(historyKey, JSON.stringify([...current.slice(-9), attempt]));
  } catch {
    // History is optional and local only.
  }
}

function outcomeLabel(outcome: CompleteWordsScoreResult['outcomes'][number]) {
  if (outcome.outcome === 'scored') return 'Correct';
  if (outcome.outcome === 'mismatch') return 'Incorrect';
  if (outcome.outcome === 'unanswered') return 'Unanswered';
  if (outcome.outcome === 'invalid_input') return 'Invalid entry';
  if (outcome.outcome === 'technical_failure') return 'Technical failure, not scored';
  if (outcome.outcome === 'invalidated') return 'Invalidated item, not scored';
  return 'Not presented';
}

export default function CompleteTheWordsPractice({ practice, setNumber }: { practice: CompleteWordsPracticeSet; setNumber: number }) {
  const storageKey = `wl:toefl:ctw:${practice.id}:v1`;
  const historyKey = `wl:toefl:ctw:${practice.id}:history:v1`;
  const [attemptId, setAttemptId] = useState('');
  const [closeId, setCloseId] = useState<string>();
  const [values, setValues] = useState<Record<string, string>>({});
  const [lastFocusId, setLastFocusId] = useState<string>();
  const [result, setResult] = useState<CompleteWordsScoreResult>();
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [technicalError, setTechnicalError] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readAttempt(storageKey);
    const frame = window.requestAnimationFrame(() => {
      if (saved) {
        setAttemptId(saved.attemptId);
        setCloseId(saved.closeId);
        setValues(saved.values);
        setLastFocusId(saved.lastFocusId);
        setResult(saved.result);
        if (!saved.result && saved.lastFocusId) {
          window.requestAnimationFrame(() => document.getElementById(saved.lastFocusId!)?.focus());
        }
      } else {
        setAttemptId(createId('attempt'));
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !attemptId) return;
    writeAttempt(storageKey, { version: 1, attemptId, closeId, values, lastFocusId, result });
  }, [attemptId, closeId, hydrated, lastFocusId, result, storageKey, values]);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const blanksByNumber = useMemo(
    () => Object.fromEntries(practice.blanks.map((blank) => [blank.num, blank])),
    [practice.blanks],
  );
  const parts = useMemo(() => practice.template.split(/(\{\{\d+\}\})/), [practice.template]);
  const filled = practice.blanks.filter((blank) => (values[blank.id] ?? '').trim()).length;

  function inputError(blankId: string, missingLength: number) {
    const value = values[blankId] ?? '';
    if (!value) return '';
    const validation = validateMissingLetters(value, missingLength);
    if (validation.valid || validation.reason === 'length') return '';
    return 'Use only letters A–Z. Do not enter spaces, numbers, or punctuation.';
  }

  async function closeBlock() {
    if (submitting || result || !attemptId) return;
    setSubmitting(true);
    setTechnicalError(false);
    const stableCloseId = closeId ?? createId(`close:${attemptId}`);
    setCloseId(stableCloseId);
    try {
      const response = await fetch('/api/practica/toefl/complete-the-words/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          objectId: practice.objectId,
          attemptId,
          closeId: stableCloseId,
          responses: values,
          presentedBlankIds: practice.blanks.map((blank) => blank.id),
        }),
      });
      if (!response.ok) throw new Error('score_unavailable');
      const nextResult = await response.json() as CompleteWordsScoreResult;
      setResult(nextResult);
    } catch {
      setTechnicalError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function startNewAttempt() {
    archiveAttempt(historyKey, { version: 1, attemptId, closeId, values, lastFocusId, result });
    const nextAttemptId = createId('attempt');
    setAttemptId(nextAttemptId);
    setCloseId(undefined);
    setValues({});
    setLastFocusId(undefined);
    setResult(undefined);
    setTechnicalError(false);
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
    window.requestAnimationFrame(() => document.getElementById(`${practice.id}-blank-1`)?.focus());
  }

  return (
    <section className={styles.practice} aria-labelledby="ctw-practice-title" data-object-id={practice.objectId}>
      <PracticeSessionHeader
        section="reading"
        eyebrow={`Set ${setNumber} · Complete the Words`}
        title="Complete the missing letters"
        description={practice.instructions}
        titleId="ctw-practice-title"
        metric={`${filled}/${practice.blanks.length}`}
        metricLabel="answers completed"
        metricRole="status"
      />
      <p className={styles.disclosure}>
        This fixed WeLearn exercise practices the missing-letter interaction. It does not reproduce TOEFL adaptive routing or official scoring. Your attempt stays in this browser.
      </p>

      <h3 className={styles.passageTitle}>{practice.title}</h3>
      <div className={styles.passage} lang="en">
        {parts.map((part, index) => {
          const marker = part.match(/^\{\{(\d+)\}\}$/);
          if (!marker) return <span key={index}>{part}</span>;
          const num = Number(marker[1]);
          const blank = blanksByNumber[num];
          const inputId = `${practice.id}-blank-${num}`;
          const error = inputError(blank.id, blank.missingLength);
          const itemOutcome = result?.outcomes.find((item) => item.blankId === blank.id);
          return (
            <span key={blank.id} className={styles.blankWrap} data-blank-id={blank.id}>
              <span aria-hidden="true" className={styles.blankNumber}>{num}</span>
              <span className={styles.prefix}>{blank.prefix}</span>
              <label className={styles.srOnly} htmlFor={inputId}>
                Passage 1, blank {num} of 10, prefix {blank.prefix}, enter {blank.missingLength} missing letters
              </label>
              <input
                id={inputId}
                className={styles.input}
                style={{ '--missing-length': blank.missingLength } as React.CSSProperties}
                value={values[blank.id] ?? ''}
                onChange={(event) => {
                  setValues((current) => ({ ...current, [blank.id]: event.target.value }));
                  setTechnicalError(false);
                }}
                onFocus={() => setLastFocusId(inputId)}
                maxLength={blank.missingLength}
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                pattern="[A-Za-z]*"
                aria-invalid={Boolean(error || (itemOutcome && itemOutcome.outcome !== 'scored'))}
                aria-describedby={`${inputId}-hint${error ? ` ${inputId}-error` : ''}${itemOutcome ? ` ${inputId}-outcome` : ''}`}
                disabled={Boolean(result)}
              />
              <span id={`${inputId}-hint`} className={styles.srOnly}>Write exactly {blank.missingLength} letters.</span>
              {error && <span id={`${inputId}-error`} className={styles.srOnly}>{error}</span>}
              {itemOutcome && (
                <span id={`${inputId}-outcome`} className={itemOutcome.outcome === 'scored' ? styles.correct : styles.incorrect}>
                  {outcomeLabel(itemOutcome)}{itemOutcome.completedWord ? `: ${itemOutcome.completedWord}` : ''}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {!result ? (
        <div className={styles.actions}>
          <button type="button" className="btn" onClick={closeBlock} disabled={!hydrated || !attemptId || submitting}>
            {submitting ? 'Checking…' : 'Submit answers'}
          </button>
          <span className={styles.actionHint}>{practice.blanks.length - filled} remaining. Empty fields count as unanswered.</span>
        </div>
      ) : (
        <div ref={resultRef} tabIndex={-1} className={styles.result} role="status" aria-live="polite">
          <p className={styles.resultLabel}>Exercise result</p>
          <strong>{result.correct}/{result.denominator}</strong>
          <p>This result is for local practice and is not an official TOEFL score.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={startNewAttempt}>Try again</button>
        </div>
      )}

      <div className={styles.live} role="status" aria-live="polite">
        {technicalError ? 'We could not score this exercise because of a technical error. Your answers are still saved. Please try again.' : ''}
      </div>
    </section>
  );
}
