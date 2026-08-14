'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TOEFL_READING_SET1,
  type ToeflReadingSet1Scope,
} from '@/data/toefl/reading-set-1';
import type { ToeflReadingScoreResult } from '@/lib/toefl/reading-contract';
import {
  ReadingMultiChoiceGroup,
  ReadingSingleChoiceGroup,
  type ReadingChoiceOutcome,
} from './ReadingChoiceGroup';
import styles from './ReadingSet1Practice.module.css';

type ReadingAnswers = Record<string, string | string[]>;

interface SavedAttempt {
  version: 1;
  attemptId: string;
  answers: ReadingAnswers;
  result?: ToeflReadingScoreResult;
  lastFocusId?: string;
}

function createClientId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${value}`;
}

function outcomeFor(result: ToeflReadingScoreResult | undefined, itemId: string) {
  const outcome = result?.outcomes.find((entry) => entry.itemId === itemId);
  if (!outcome || outcome.status === 'not_presented' || outcome.status === 'invalidated') return undefined;
  return outcome as ReadingChoiceOutcome;
}

export default function ReadingSet1Practice({ scope }: { scope: ToeflReadingSet1Scope }) {
  const blocks = useMemo(
    () => TOEFL_READING_SET1.blocks.filter((block) => block.scope === scope),
    [scope],
  );
  const items = useMemo(() => blocks.flatMap((block) => block.items), [blocks]);
  const storageKey = `wl:toefl:reading:set1:${scope}:attempt:v1`;
  const [attemptId, setAttemptId] = useState('');
  const [answers, setAnswers] = useState<ReadingAnswers>({});
  const [result, setResult] = useState<ToeflReadingScoreResult>();
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
          } else {
            setAttemptId(createClientId('attempt'));
          }
        } else {
          setAttemptId(createClientId('attempt'));
        }
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
      const saved: SavedAttempt = {
        version: 1,
        attemptId,
        answers,
        result,
        lastFocusId,
      };
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      // The anonymous practice still works when browser storage is unavailable.
    }
  }, [answers, attemptId, hydrated, lastFocusId, result, storageKey]);

  async function submit() {
    if (submitting || !attemptId) return;
    setSubmitting(true);
    setTechnicalError(false);
    try {
      const response = await fetch('/api/practica/toefl/reading/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          objectId: TOEFL_READING_SET1.objectId,
          attemptId,
          closeId: `close:${attemptId}:${scope}`,
          responses: answers,
          presentedItemIds: items.map((item) => item.id),
        }),
      });
      if (!response.ok) throw new Error('reading_scoring_unavailable');
      setResult(await response.json() as ToeflReadingScoreResult);
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

  const visibleOutcomes = result?.outcomes.filter((outcome) => items.some((item) => item.id === outcome.itemId)) ?? [];
  const officialIds = new Set(items.filter((item) => item.alignment === 'official-family-pilot').map((item) => item.id));
  const officialCorrect = visibleOutcomes.reduce(
    (sum, outcome) => sum + (officialIds.has(outcome.itemId) ? outcome.rawPoints ?? 0 : 0),
    0,
  );
  const officialDenominator = visibleOutcomes.filter(
    (outcome) => officialIds.has(outcome.itemId) && outcome.maxRawPoints === 1,
  ).length;
  const supplementary = visibleOutcomes.find((outcome) => !officialIds.has(outcome.itemId));

  return (
    <section className={styles.shell} aria-labelledby={`reading-set1-${scope}-title`}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Set 1 · Práctica interactiva</p>
        <h2 id={`reading-set1-${scope}-title`}>
          {scope === 'daily-life' ? 'Dos textos funcionales · 5 preguntas' : 'Pasaje académico · 5 preguntas'}
        </h2>
        <p>{TOEFL_READING_SET1.disclosure}</p>
        {scope === 'academic' && (
          <p className={styles.supplementaryNote}>
            Después de las 5 preguntas del piloto verás una selección múltiple complementaria de WeLearn. Su resultado se informa por separado.
          </p>
        )}
      </div>

      <div className={styles.blocks}>
        {blocks.map((block) => (
          <article key={block.id} className={styles.block}>
            <div className={styles.stimulus}>
              <p className={styles.genre}>{block.genre}</p>
              <h3>{block.title}</h3>
              <p className={styles.instructions}>{block.instructions}</p>
              <div className={styles.text}>{block.text}</div>
            </div>
            <div className={styles.questions}>
              {block.items.map((item, index) => item.type === 'single-select' ? (
                <ReadingSingleChoiceGroup
                  key={item.id}
                  itemId={item.id}
                  number={index + 1}
                  prompt={item.prompt}
                  options={item.options}
                  selectedOptionId={typeof answers[item.id] === 'string' ? answers[item.id] as string : undefined}
                  onSelect={(optionId) => {
                    setAnswers((current) => ({ ...current, [item.id]: optionId }));
                    setTechnicalError(false);
                  }}
                  onFocus={setLastFocusId}
                  outcome={outcomeFor(result, item.id)}
                />
              ) : (
                <ReadingMultiChoiceGroup
                  key={item.id}
                  itemId={item.id}
                  number={index + 1}
                  prompt={item.prompt}
                  options={item.options}
                  selectedOptionIds={Array.isArray(answers[item.id]) ? answers[item.id] as string[] : []}
                  selectCount={item.selectCount}
                  onChange={(optionIds) => {
                    setAnswers((current) => ({ ...current, [item.id]: optionIds }));
                    setTechnicalError(false);
                  }}
                  onFocus={setLastFocusId}
                  outcome={outcomeFor(result, item.id)}
                  supplementary
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {technicalError && (
        <div className={styles.technical} role="status" aria-live="polite">
          No pudimos corregir por un fallo técnico. Tus respuestas siguen guardadas y no se convirtieron en errores académicos. Intenta finalizar otra vez.
        </div>
      )}

      {result ? (
        <div className={styles.summary} role="status" aria-live="polite">
          <h3>Resultado de práctica</h3>
          <p><strong>{officialCorrect} de {officialDenominator}</strong> en las preguntas de la familia oficial practicada.</p>
          {supplementary && (
            <p>
              Complementaria WeLearn: <strong>{supplementary.rawPoints === 1 ? 'correcta' : 'incorrecta o incompleta'}</strong>.
            </p>
          )}
          <p className={styles.disclosure}>Resultado local de práctica; no equivale a una puntuación oficial de ETS.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Intentar de nuevo</button>
        </div>
      ) : (
        <div className={styles.actions}>
          <p>Respondidas: {items.filter((item) => {
            const value = answers[item.id];
            if (item.type === 'single-select') return typeof value === 'string' && Boolean(value);
            return Array.isArray(value) && value.length === item.selectCount;
          }).length} de {items.length}</p>
          <button type="button" className="btn" disabled={!hydrated || submitting} onClick={() => { void submit(); }}>
            {submitting ? 'Corrigiendo…' : 'Finalizar y corregir'}
          </button>
        </div>
      )}
    </section>
  );
}
