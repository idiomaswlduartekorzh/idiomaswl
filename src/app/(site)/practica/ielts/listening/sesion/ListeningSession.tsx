'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, Headphones, RotateCcw, Send, ShieldCheck, X } from 'lucide-react';

import type {
  IeltsListeningPublicBlank,
  IeltsListeningPublicFormGroup,
  IeltsListeningPublicGroup,
  IeltsListeningPublicMapLabellingGroup,
  IeltsListeningPublicPractice,
  IeltsListeningPublicSingleChoiceGroup,
  IeltsListeningPublicTableGroup,
  IeltsListeningScoreResult,
} from '@/lib/ielts/listening-practice-contract';
import {
  ieltsListeningPublicQuestionNumbers,
  ieltsListeningPublicResponseSpecs,
  ieltsListeningStorageKey,
} from '@/lib/ielts/listening-public-contract';
import styles from './ListeningSession.module.css';

type Phase = 'active' | 'submitting' | 'review';
type OutcomeMap = Record<string, boolean>;

interface GroupResponseProps {
  responses: Record<string, string>;
  disabled: boolean;
  outcomes: OutcomeMap;
  onAnswer: (number: number, value: string) => void;
}

interface StoredAttempt {
  schemaVersion: 1;
  attemptId: string;
  contentVersion: string;
  phase: 'active';
  responses: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

function createAttemptId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function AnswerInput({
  blank,
  value,
  disabled,
  outcome,
  onChange,
}: {
  blank: IeltsListeningPublicBlank;
  value: string;
  disabled: boolean;
  outcome?: boolean;
  onChange: (value: string) => void;
}) {
  const inputId = `listening-answer-${blank.number}`;
  const stateClass = outcome === true ? styles.answerCorrect : outcome === false ? styles.answerIncorrect : '';
  return (
    <span className={`${styles.answerSlot} ${stateClass}`}>
      <label className={styles.srOnly} htmlFor={inputId}>Answer {blank.number}, maximum {blank.maxWords} word{blank.maxWords === 1 ? '' : 's'}</label>
      <span className={styles.answerNumber} aria-hidden="true">{blank.number}</span>
      <input
        id={inputId}
        name={`answer-${blank.number}`}
        value={value}
        disabled={disabled}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        aria-invalid={outcome === false ? true : undefined}
        onChange={(event) => onChange(event.target.value.slice(0, 80))}
      />
      {outcome === true && <Check size={15} aria-label="Correct" />}
      {outcome === false && <X size={15} aria-label="Incorrect" />}
    </span>
  );
}

function TemplateLine({
  line,
  blanks,
  responses,
  disabled,
  outcomes,
  onAnswer,
}: {
  line: string;
  blanks: ReadonlyMap<number, IeltsListeningPublicBlank>;
  responses: Record<string, string>;
  disabled: boolean;
  outcomes: OutcomeMap;
  onAnswer: (number: number, value: string) => void;
}) {
  const parts = line.split(/(\{\{\d+\}\})/g);
  return (
    <p>
      {parts.map((part, index) => {
        const match = part.match(/^\{\{(\d+)\}\}$/);
        if (!match) return <span key={`${part}-${index}`}>{part}</span>;
        const number = Number(match[1]);
        const blank = blanks.get(number);
        if (!blank) return null;
        return <AnswerInput key={number} blank={blank} value={responses[String(number)] ?? ''} disabled={disabled} outcome={outcomes[String(number)]} onChange={(value) => onAnswer(number, value)} />;
      })}
    </p>
  );
}

function FormGroup({ group, ...props }: {
  group: IeltsListeningPublicFormGroup;
} & GroupResponseProps) {
  const blanks = useMemo(() => new Map(group.blanks.map((blank) => [blank.number, blank])), [group.blanks]);
  return (
    <section className={styles.questionGroup} aria-labelledby={`${group.id}-title`}>
      <header><span>Questions {group.questionRange[0]}–{group.questionRange[1]}</span><p>{group.instruction}</p></header>
      <div className={styles.formSheet}>
        <h2 id={`${group.id}-title`}>{group.title}</h2>
        {group.example && <p className={styles.example}>{group.example}</p>}
        <div className={styles.template}>{group.template.split('\n').map((line, index) => <TemplateLine key={`${line}-${index}`} line={line} blanks={blanks} {...props} />)}</div>
      </div>
    </section>
  );
}

function TableGroup({ group, responses, disabled, outcomes, onAnswer }: {
  group: IeltsListeningPublicTableGroup;
} & GroupResponseProps) {
  return (
    <section className={styles.questionGroup} aria-labelledby={`${group.id}-title`}>
      <header><span>Questions {group.questionRange[0]}–{group.questionRange[1]}</span><p id={`${group.id}-title`}>{group.instruction}</p></header>
      <div className={styles.tableScroll}>
        <table>
          <thead><tr>{group.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>{group.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell.type === 'text' ? cell.text : <AnswerInput blank={cell} value={responses[String(cell.number)] ?? ''} disabled={disabled} outcome={outcomes[String(cell.number)]} onChange={(value) => onAnswer(cell.number, value)} />}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function SingleChoiceGroup({ group, responses, disabled, outcomes, onAnswer }: {
  group: IeltsListeningPublicSingleChoiceGroup;
} & GroupResponseProps) {
  return (
    <section className={styles.questionGroup} aria-labelledby={`${group.id}-title`}>
      <header><span>Questions {group.questionRange[0]}–{group.questionRange[1]}</span><p id={`${group.id}-title`}>{group.instruction}</p></header>
      <div className={styles.choiceList}>
        {group.questions.map((question) => {
          const outcome = outcomes[String(question.number)];
          const statusId = `${group.id}-${question.number}-status`;
          return (
            <fieldset
              className={`${styles.choiceQuestion} ${outcome === true ? styles.answerCorrect : outcome === false ? styles.answerIncorrect : ''}`}
              key={question.number}
              aria-describedby={outcome === undefined ? undefined : statusId}
              aria-invalid={outcome === false ? true : undefined}
            >
              <legend><span>{question.number}</span>{question.prompt}</legend>
              <div className={styles.choiceOptions}>
                {question.options.map((option) => (
                  <label key={option.key}>
                    <input
                      type="radio"
                      autoComplete="off"
                      name={`answer-${question.number}`}
                      value={option.key}
                      checked={responses[String(question.number)] === option.key}
                      disabled={disabled}
                      onChange={() => onAnswer(question.number, option.key)}
                    />
                    <strong>{option.key}</strong>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {outcome !== undefined && <span className={styles.answerStatus} id={statusId}>{outcome ? <Check size={15} aria-hidden="true" /> : <X size={15} aria-hidden="true" />}{outcome ? 'Correct' : 'Incorrect'}</span>}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}

function MapLabellingGroup({ group, responses, disabled, outcomes, onAnswer }: {
  group: IeltsListeningPublicMapLabellingGroup;
} & GroupResponseProps) {
  const descriptionId = `${group.id}-map-description`;
  return (
    <section className={styles.questionGroup} aria-labelledby={`${group.id}-title`}>
      <header><span>Questions {group.questionRange[0]}–{group.questionRange[1]}</span><p id={`${group.id}-title`}>{group.instruction}</p></header>
      <div className={styles.mapExercise}>
        <div>
          <figure className={styles.mapFigure} aria-describedby={descriptionId}>
            <Image src={group.map.url} width={group.map.width} height={group.map.height} alt={group.map.alt} sizes="(max-width: 760px) 100vw, 58vw" unoptimized />
            <figcaption>Use the lettered areas {group.map.areaKeys[0]}–{group.map.areaKeys.at(-1)} to label each place.</figcaption>
          </figure>
          <details className={styles.mapDescription} open>
            <summary>Text description of the floor plan</summary>
            <p id={descriptionId}>{group.map.longDescription}</p>
          </details>
        </div>
        <ol className={styles.mapQuestions} start={group.questionRange[0]}>
          {group.questions.map((question) => {
            const outcome = outcomes[String(question.number)];
            const selectId = `${group.id}-answer-${question.number}`;
            const statusId = `${selectId}-status`;
            return (
              <li className={outcome === true ? styles.answerCorrect : outcome === false ? styles.answerIncorrect : ''} key={question.number} value={question.number}>
                <label htmlFor={selectId}>{question.prompt}</label>
                <select
                  id={selectId}
                  autoComplete="off"
                  name={`answer-${question.number}`}
                  value={responses[String(question.number)] ?? ''}
                  disabled={disabled}
                  aria-describedby={outcome === undefined ? undefined : statusId}
                  aria-invalid={outcome === false ? true : undefined}
                  onChange={(event) => onAnswer(question.number, event.target.value)}
                >
                  <option value="">Choose a letter</option>
                  {group.options.map((option) => <option key={option.key} value={option.key}>{option.key} — {option.label}</option>)}
                </select>
                {outcome !== undefined && <span className={styles.answerStatus} id={statusId}>{outcome ? <Check size={15} aria-hidden="true" /> : <X size={15} aria-hidden="true" />}{outcome ? 'Correct' : 'Incorrect'}</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function assertNeverGroup(group: never): never {
  throw new Error(`Unsupported IELTS Listening public group: ${JSON.stringify(group)}`);
}

function QuestionGroup({ group, ...props }: { group: IeltsListeningPublicGroup } & GroupResponseProps) {
  switch (group.type) {
    case 'form': return <FormGroup group={group} {...props} />;
    case 'table': return <TableGroup group={group} {...props} />;
    case 'single-choice': return <SingleChoiceGroup group={group} {...props} />;
    case 'map-labelling': return <MapLabellingGroup group={group} {...props} />;
    default: return assertNeverGroup(group);
  }
}

export default function ListeningSession({ practice }: { practice: IeltsListeningPublicPractice }) {
  const numbers = useMemo(() => ieltsListeningPublicQuestionNumbers(practice), [practice]);
  const responseSpecs = useMemo(() => ieltsListeningPublicResponseSpecs(practice), [practice]);
  const practiceLabel = String(practice.practiceNumber).padStart(3, '0');
  const guideHref = `/practica/ielts/listening/part-${practice.part}`;
  const storageKey = ieltsListeningStorageKey(practice);
  const createdAt = useRef(new Date().toISOString());
  const [attemptId, setAttemptId] = useState(createAttemptId);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>('active');
  const [result, setResult] = useState<IeltsListeningScoreResult | null>(null);
  const [error, setError] = useState('');
  const [audioError, setAudioError] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const answered = numbers.filter((number) => responses[String(number)]?.trim()).length;
  const complete = answered === numbers.length;
  const outcomes = useMemo<OutcomeMap>(() => Object.fromEntries((result?.outcomes ?? []).map((outcome) => [String(outcome.number), outcome.correct])), [result]);

  useEffect(() => {
    let cancelled = false;
    let restoredResponses: Record<string, string> | null = null;
    let restoredAttemptId: string | null = null;
    let restoredCreatedAt: string | null = null;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<StoredAttempt>;
        if (stored.schemaVersion === 1 && stored.contentVersion === practice.contentVersion && stored.phase === 'active' && stored.responses && typeof stored.responses === 'object') {
          restoredResponses = Object.fromEntries(responseSpecs.map((spec) => {
            const storedValue = stored.responses?.[String(spec.number)];
            if (typeof storedValue !== 'string') return [String(spec.number), ''];
            if (spec.kind === 'choice' && !spec.allowedValues.some((value) => value === storedValue)) return [String(spec.number), ''];
            return [String(spec.number), storedValue.slice(0, 80)];
          }));
          if (typeof stored.attemptId === 'string') restoredAttemptId = stored.attemptId;
          if (typeof stored.createdAt === 'string') restoredCreatedAt = stored.createdAt;
        }
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    }
    queueMicrotask(() => {
      if (cancelled) return;
      if (restoredResponses) setResponses(restoredResponses);
      if (restoredAttemptId) setAttemptId(restoredAttemptId);
      if (restoredCreatedAt) createdAt.current = restoredCreatedAt;
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, [practice.contentVersion, responseSpecs, storageKey]);

  useEffect(() => {
    if (!hydrated || phase !== 'active') return;
    const stored: StoredAttempt = {
      schemaVersion: 1,
      attemptId,
      contentVersion: practice.contentVersion,
      phase: 'active',
      responses,
      createdAt: createdAt.current,
      updatedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(storageKey, JSON.stringify(stored));
  }, [attemptId, hydrated, phase, practice.contentVersion, responses, storageKey]);

  useEffect(() => {
    if (phase !== 'active' || answered === 0) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [answered, phase]);

  function answer(number: number, value: string) {
    if (phase !== 'active') return;
    setResponses((current) => ({ ...current, [String(number)]: value }));
    setError('');
  }

  async function submit() {
    if (phase !== 'active') return;
    if (!complete) {
      const firstIncomplete = numbers.find((number) => !responses[String(number)]?.trim());
      setError(`Complete every answer before submitting. ${firstIncomplete ? `Question ${firstIncomplete} is the first one still empty.` : ''}`.trim());
      if (firstIncomplete) requestAnimationFrame(() => document.querySelector<HTMLElement>(`[name="answer-${firstIncomplete}"]`)?.focus());
      return;
    }
    setPhase('submitting');
    setError('');
    try {
      const response = await fetch('/api/practica/ielts/listening/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ practiceId: practice.id, contentVersion: practice.contentVersion, responses }),
      });
      const payload: unknown = await response.json();
      if (!response.ok || !payload || typeof payload !== 'object' || !('correct' in payload) || !('outcomes' in payload)) throw new Error('score_failed');
      setResult(payload as IeltsListeningScoreResult);
      setPhase('review');
      sessionStorage.removeItem(storageKey);
    } catch {
      setError('We could not score this attempt. Your answers are still here; check the connection and submit again.');
      setPhase('active');
    }
  }

  function retry() {
    setAttemptId(createAttemptId());
    createdAt.current = new Date().toISOString();
    setResponses({});
    setResult(null);
    setError('');
    setAudioError(false);
    setPhase('active');
    sessionStorage.removeItem(storageKey);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <div className={styles.page} lang="en">
      <div className={styles.shell}>
        <nav className={styles.topNav} aria-label="Practice navigation"><Link href={guideHref}><ArrowLeft size={16} aria-hidden="true" /> Part {practice.part} guide</Link><span>Practice {practiceLabel} · {practice.contentVersion}</span></nav>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}><Headphones size={15} aria-hidden="true" /> Focused listening desk</p><h1>Listening Practice {practiceLabel} — Part {practice.part}</h1><p>{practice.scenario}</p></div>
          <div className={styles.progress} aria-label={`${answered} of ${practice.questionCount} answers complete`}><strong>{answered}/{practice.questionCount}</strong><span>answers recorded</span><div><i style={{ width: `${(answered / practice.questionCount) * 100}%` }} /></div></div>
        </header>

        <section className={styles.audioDesk} aria-labelledby="audio-heading">
          <div><span>Original WeLearn audio · replay enabled</span><h2 id="audio-heading">{practice.title}</h2><p>{practice.instructions}</p></div>
          <audio controls preload="metadata" onError={() => setAudioError(true)} aria-label={`Play ${practice.title}`}>
            <source src={practice.audio.url} type="audio/mpeg" />
            Your browser does not support this audio player.
          </audio>
          {audioError && <p className={styles.error} role="alert">The audio could not be loaded. Do not submit until playback works.</p>}
        </section>

        <div className={styles.questionStack}>
          {practice.groups.map((group) => <QuestionGroup key={group.id} group={group} responses={responses} disabled={phase !== 'active'} outcomes={outcomes} onAnswer={answer} />)}
        </div>

        {phase === 'review' && result && (
          <section className={styles.reviewPanel} aria-labelledby="review-heading">
            <header><p>Post-submit review</p><h2 id="review-heading">Repair the detail, not just the score</h2><span>The accepted responses and explanations appear only after a complete submission.</span></header>
            <div className={styles.reviewGrid}>
              {result.outcomes.map((outcome) => (
                <article className={outcome.correct ? styles.reviewCorrect : styles.reviewIncorrect} key={outcome.number}>
                  <div><span>Q{outcome.number}</span>{outcome.correct ? <Check size={17} aria-label="Correct" /> : <X size={17} aria-label="Incorrect" />}</div>
                  <strong>Model response: {outcome.expected}</strong>
                  <p>{outcome.explanation}</p>
                </article>
              ))}
            </div>
            <details className={styles.transcriptPanel}>
              <summary>Accessible transcript — available after submission</summary>
              <pre>{result.transcript}</pre>
            </details>
          </section>
        )}

        <footer className={styles.submitBar} aria-live="polite">
          <div>{phase === 'review' && result ? <><strong>{result.correct}/{result.total} correct</strong><span>{result.disclosure}</span></> : <><strong>{complete ? 'All answers recorded' : `${practice.questionCount - answered} answer${practice.questionCount - answered === 1 ? '' : 's'} remaining`}</strong><span>Complete all {practice.questionCount} fields before submitting this attempt.</span></>}</div>
          <div className={styles.submitActions}>{phase === 'review' ? <><Link href={guideHref}>Review the method</Link><button type="button" onClick={retry}><RotateCcw size={16} aria-hidden="true" /> New attempt</button></> : <button type="button" disabled={phase === 'submitting' || audioError} onClick={submit}><Send size={16} aria-hidden="true" /> {phase === 'submitting' ? 'Scoring…' : `Submit ${practice.questionCount} answers`}</button>}</div>
        </footer>
        {error && <p className={styles.error} role="alert">{error}</p>}

        <aside className={styles.securityNote}><ShieldCheck size={19} aria-hidden="true" /><p><strong>Assessment boundary:</strong> the browser receives the question layout and isolated audio, but no transcript or accepted-answer list before submission. This independent practice is not an official IELTS test or band prediction.</p></aside>
        <p className={styles.srOnly} aria-live="polite">{phase === 'review' && result ? `Attempt scored. ${result.correct} of ${result.total} correct.` : ''}</p>
      </div>
    </div>
  );
}
