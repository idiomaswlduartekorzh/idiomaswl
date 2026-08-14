'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  TOEFL_CTW_SET1_V3,
  type CompleteWordsScoreResult,
} from '@/data/toefl/complete-the-words-set-1';
import { validateMissingLetters } from '@/lib/toefl/complete-words-contract';
import styles from './complete-the-words.module.css';

const STORAGE_KEY = 'wl:toefl:ctw:t1-r-cw2-v3:v1';
const HISTORY_KEY = 'wl:toefl:ctw:t1-r-cw2-v3:history:v1';

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

function readAttempt(): LocalAttempt | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LocalAttempt>;
    if (parsed.version !== 1 || typeof parsed.attemptId !== 'string' || !parsed.values || typeof parsed.values !== 'object') return null;
    return parsed as LocalAttempt;
  } catch {
    return null;
  }
}

function writeAttempt(attempt: LocalAttempt) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
  } catch {
    // Anonymous practice remains usable when local storage is unavailable.
  }
}

function archiveAttempt(attempt: LocalAttempt) {
  if (!attempt.result) return;
  try {
    const current = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? '[]') as LocalAttempt[];
    if (current.some((item) => item.attemptId === attempt.attemptId)) return;
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify([...current.slice(-9), attempt]));
  } catch {
    // History is optional and local only.
  }
}

function outcomeLabel(outcome: CompleteWordsScoreResult['outcomes'][number]) {
  if (outcome.outcome === 'scored') return 'Correcta';
  if (outcome.outcome === 'mismatch') return 'No coincide';
  if (outcome.outcome === 'unanswered') return 'Sin responder';
  if (outcome.outcome === 'invalid_input') return 'Entrada no válida';
  if (outcome.outcome === 'technical_failure') return 'Fallo técnico, no puntuado';
  if (outcome.outcome === 'invalidated') return 'Ítem invalidado, no puntuado';
  return 'No presentado, fuera del denominador';
}

export default function CompleteTheWordsPractice() {
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
    const saved = readAttempt();
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
  }, []);

  useEffect(() => {
    if (!hydrated || !attemptId) return;
    writeAttempt({ version: 1, attemptId, closeId, values, lastFocusId, result });
  }, [attemptId, closeId, hydrated, lastFocusId, result, values]);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const blanksByNumber = useMemo(
    () => Object.fromEntries(TOEFL_CTW_SET1_V3.blanks.map((blank) => [blank.num, blank])),
    [],
  );
  const parts = useMemo(() => TOEFL_CTW_SET1_V3.template.split(/(\{\{\d+\}\})/), []);
  const filled = TOEFL_CTW_SET1_V3.blanks.filter((blank) => (values[blank.id] ?? '').trim()).length;

  function inputError(blankId: string, missingLength: number) {
    const value = values[blankId] ?? '';
    if (!value) return '';
    const validation = validateMissingLetters(value, missingLength);
    if (validation.valid || validation.reason === 'length') return '';
    return 'Usa únicamente letras de la A a la Z, sin espacios internos, números ni puntuación.';
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
          objectId: TOEFL_CTW_SET1_V3.objectId,
          attemptId,
          closeId: stableCloseId,
          responses: values,
          presentedBlankIds: TOEFL_CTW_SET1_V3.blanks.map((blank) => blank.id),
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
    archiveAttempt({ version: 1, attemptId, closeId, values, lastFocusId, result });
    const nextAttemptId = createId('attempt');
    setAttemptId(nextAttemptId);
    setCloseId(undefined);
    setValues({});
    setLastFocusId(undefined);
    setResult(undefined);
    setTechnicalError(false);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* local-only reset */ }
    window.requestAnimationFrame(() => document.getElementById(`${TOEFL_CTW_SET1_V3.id}-blank-1`)?.focus());
  }

  return (
    <section className={styles.practice} aria-labelledby="ctw-practice-title" data-object-id={TOEFL_CTW_SET1_V3.objectId}>
      <div className={styles.practiceHeader}>
        <div>
          <p className={styles.kicker}>Práctica A · interacción parcial WeLearn</p>
          <h2 id="ctw-practice-title">Completa las letras que faltan</h2>
        </div>
        <span className={styles.progress} aria-label={`${filled} de 10 respuestas iniciadas`}>{filled}/10</span>
      </div>

      <p className={styles.instructions}>{TOEFL_CTW_SET1_V3.instructions}</p>
      <p className={styles.disclosure}>
        Esta práctica fija reproduce la mecánica de letras faltantes, no la adaptación ni la puntuación oficial del TOEFL. Tu intento se conserva solo en este navegador; no se envía a una cuenta ni se guarda en el servidor.
      </p>

      <h3 className={styles.passageTitle}>{TOEFL_CTW_SET1_V3.title}</h3>
      <div className={styles.passage} lang="en">
        {parts.map((part, index) => {
          const marker = part.match(/^\{\{(\d+)\}\}$/);
          if (!marker) return <span key={index}>{part}</span>;
          const num = Number(marker[1]);
          const blank = blanksByNumber[num];
          const inputId = `${TOEFL_CTW_SET1_V3.id}-blank-${num}`;
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
            {submitting ? 'Comprobando…' : 'Cerrar bloque y comprobar'}
          </button>
          <span className={styles.actionHint}>{10 - filled} por completar; los vacíos contarán como sin responder.</span>
        </div>
      ) : (
        <div ref={resultRef} tabIndex={-1} className={styles.result} role="status" aria-live="polite">
          <p className={styles.resultLabel}>Resultado de esta práctica</p>
          <strong>{result.correct}/{result.denominator}</strong>
          <p>{result.disclosure}</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={startNewAttempt}>Empezar otro intento</button>
        </div>
      )}

      <div className={styles.live} role="status" aria-live="polite">
        {technicalError ? 'No pudimos corregir el bloque por un fallo técnico. Ninguna respuesta se contó como error académico; conserva tus respuestas e inténtalo de nuevo.' : ''}
      </div>
    </section>
  );
}
