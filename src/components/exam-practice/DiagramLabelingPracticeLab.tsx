'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Clock3, FileCheck2, Lightbulb, LockKeyhole, MapPinned, RotateCcw, XCircle } from 'lucide-react';
import styles from './MatchingHeadingsPracticeLab.module.css';
import {
  DIAGRAM_LABELING_LEVELS,
  DIAGRAM_LABELING_PASSAGES,
  DIAGRAM_LABELING_STORAGE_KEY,
  countDiagramLabelingWords,
  isDiagramLabelingCorrect,
  type DiagramLabelingDecision,
  type DiagramLabelingErrorCode,
  type DiagramLabelingTrainingPassage,
} from '@/data/practica-exams/ielts-reading-diagram-labeling-progress';

type Answers = Record<string, string>;
type LevelRecord = { bestScore: number; attempts: number; mastered: boolean };
type Progress = {
  version: 1;
  unlockedLevel: number;
  levels: Record<string, LevelRecord>;
  errors: Partial<Record<DiagramLabelingErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, Answers>;
};

const EMPTY_PROGRESS: Progress = { version: 1, unlockedLevel: 0, levels: {}, errors: {}, reviewQueue: [], drafts: {} };
const ERROR_LABELS: Record<DiagramLabelingErrorCode, string> = {
  'visual-zone': 'Mapped the marker to the wrong visual zone',
  'wrong-part': 'Chose a neighbouring part instead of the labelled component',
  'direction-misread': 'Ignored position, layer or movement direction',
  'grammar-mismatch': 'The copied span does not rebuild the label naturally',
  'over-limit': 'The response exceeds the displayed word limit',
  'copied-context': 'Copied extra context instead of the smallest exact span',
};

const MARKER_COORDINATES = [
  { x: 18, y: 18, targetX: 42, targetY: 30 },
  { x: 82, y: 18, targetX: 58, targetY: 30 },
  { x: 14, y: 50, targetX: 38, targetY: 50 },
  { x: 86, y: 50, targetX: 62, targetY: 50 },
  { x: 18, y: 82, targetX: 42, targetY: 70 },
  { x: 82, y: 82, targetX: 58, targetY: 70 },
] as const;

type DiagramPoint = { x: number; y: number; targetX: number; targetY: number };

const DIAGRAM_COORDINATES: Record<string, readonly DiagramPoint[]> = {
  'dl-rain-garden': [
    { x: 10, y: 25, targetX: 31, targetY: 32 }, { x: 90, y: 25, targetX: 69, targetY: 36 },
    { x: 10, y: 48, targetX: 39, targetY: 48 }, { x: 90, y: 48, targetX: 61, targetY: 57 },
    { x: 10, y: 77, targetX: 43, targetY: 70 }, { x: 90, y: 77, targetX: 72, targetY: 68 },
  ],
  'dl-greenhouse-ventilation': [
    { x: 10, y: 71, targetX: 28, targetY: 66 }, { x: 90, y: 71, targetX: 73, targetY: 66 },
    { x: 10, y: 51, targetX: 39, targetY: 54 }, { x: 90, y: 22, targetX: 59, targetY: 24 },
    { x: 10, y: 25, targetX: 46, targetY: 31 }, { x: 90, y: 43, targetX: 69, targetY: 39 },
  ],
  'dl-hand-pump': [
    { x: 10, y: 18, targetX: 48, targetY: 18 }, { x: 90, y: 30, targetX: 54, targetY: 34 },
    { x: 10, y: 48, targetX: 46, targetY: 48 }, { x: 90, y: 78, targetX: 49, targetY: 79 },
    { x: 10, y: 64, targetX: 51, targetY: 58 }, { x: 90, y: 16, targetX: 65, targetY: 23 },
  ],
  'dl-cooling-buildings': [
    { x: 10, y: 37, targetX: 31, targetY: 42 }, { x: 90, y: 34, targetX: 69, targetY: 39 },
    { x: 10, y: 66, targetX: 44, targetY: 65 }, { x: 90, y: 67, targetX: 58, targetY: 65 },
    { x: 10, y: 20, targetX: 34, targetY: 28 }, { x: 90, y: 82, targetX: 76, targetY: 72 },
  ],
  'dl-rain-gardens': [
    { x: 10, y: 21, targetX: 30, targetY: 27 }, { x: 90, y: 21, targetX: 68, targetY: 25 },
    { x: 10, y: 52, targetX: 46, targetY: 49 }, { x: 90, y: 52, targetX: 58, targetY: 56 },
    { x: 10, y: 80, targetX: 35, targetY: 70 }, { x: 90, y: 80, targetX: 70, targetY: 69 },
  ],
  'dl-museum-inventory': [
    { x: 10, y: 26, targetX: 31, targetY: 30 }, { x: 90, y: 24, targetX: 70, targetY: 29 },
    { x: 10, y: 51, targetX: 41, targetY: 49 }, { x: 90, y: 51, targetX: 59, targetY: 49 },
    { x: 10, y: 78, targetX: 42, targetY: 70 }, { x: 90, y: 78, targetX: 65, targetY: 69 },
  ],
};

function DiagramArtwork({ passageId }: { passageId: string }) {
  if (passageId === 'dl-rain-garden') return <g aria-hidden="true">
    <path className={styles.diagramSoft} d="M20 31h60l-8 47H28z" />
    <path className={styles.diagramAccent} d="M27 42q23-12 46 0v8H27z" />
    <path className={styles.diagramBody} d="M30 52h40v9H30zm4 11h32v9H34z" />
    <path className={styles.diagramArrow} d="M14 31h16m-5-4 5 4-5 4M70 74h16m-5-4 5 4-5 4" />
    <path className={styles.diagramPlant} d="M39 40V27m0 7-6-5m6 3 6-6M56 39V24m0 7-6-5m6 2 6-6" />
  </g>;
  if (passageId === 'dl-greenhouse-ventilation') return <g aria-hidden="true">
    <path className={styles.diagramSoft} d="M23 73V38l27-20 27 20v35z" />
    <path className={styles.diagramBody} d="M30 73V43h40v30M50 18v55M23 38h54" />
    <path className={styles.diagramAccent} d="M23 59h10v12H23zm44 0h10v12H67zM44 20h12v9H44z" />
    <path className={styles.diagramArrow} d="M12 66h18m-5-4 5 4-5 4M70 66h18m-13-4-5 4 5 4M50 50V27m-4 6 4-6 4 6" />
    <path className={styles.diagramPlant} d="M40 68V53m0 6-6-5m6 2 6-6M59 68V52m0 6-6-5m6 2 6-6" />
  </g>;
  if (passageId === 'dl-hand-pump') return <g aria-hidden="true">
    <path className={styles.diagramSoft} d="M39 26h20v55H39z" />
    <path className={styles.diagramBody} d="M43 31h12v45H43zm6-13v16M47 18h28l8 7M55 42h18v9H55" />
    <circle className={styles.diagramAccent} cx="49" cy="47" r="5" />
    <path className={styles.diagramAccent} d="M42 70h14v8H42z" />
    <path className={styles.diagramArrow} d="M49 88V70m-4 6 4-6 4 6M72 45h15m-5-4 5 4-5 4" />
  </g>;
  if (passageId === 'dl-cooling-buildings') return <g aria-hidden="true">
    <path className={styles.diagramSoft} d="M25 29h48v46H25z" />
    <path className={styles.diagramBody} d="M25 49h48M38 29v46M59 29v46" />
    <path className={styles.diagramAccent} d="M22 37h8v14h-8zm48 0h8v14h-8zM41 58h15v13H41z" />
    <path className={styles.diagramArrow} d="M10 44h22m-6-5 6 5-6 5M68 44h22m-16-5-6 5 6 5M49 69v16m-4-6 4 6 4-6" />
    <path className={styles.diagramPlant} d="M82 75V56m0 7-8-7m8 4 7-8" />
  </g>;
  if (passageId === 'dl-rain-gardens') return <g aria-hidden="true">
    <rect className={styles.diagramSoft} x="19" y="18" width="27" height="22" rx="2" />
    <path className={styles.diagramBody} d="M22 22h21M22 29h21M22 36h21" />
    <path className={styles.diagramSoft} d="M55 18h26v20H55z" />
    <path className={styles.diagramAccent} d="M31 54q20-14 39 0l-5 22H35z" />
    <path className={styles.diagramArrow} d="M34 40l10 14m-1-7 1 7-7-2M68 38l-8 15m7-4-7 4-1-7" />
    <path className={styles.diagramPlant} d="M43 69V55m0 7-6-5m6 2 6-6M57 70V53m0 7-6-5m6 2 6-6" />
  </g>;
  return <g aria-hidden="true">
    <path className={styles.diagramSoft} d="M24 21h52v58H24z" />
    <path className={styles.diagramBody} d="M24 55h52M48 21v58" />
    <rect className={styles.diagramAccent} x="30" y="28" width="12" height="16" rx="2" />
    <circle className={styles.diagramAccent} cx="61" cy="35" r="8" />
    <path className={styles.diagramBody} d="M31 62h12v10H31zm24 0h15v10H55z" />
    <path className={styles.diagramArrow} d="M43 36h10m-5-4 5 4-5 4M49 67h6" />
  </g>;
}

function readProgress(): Progress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DIAGRAM_LABELING_STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (!parsed || parsed.version !== 1) return EMPTY_PROGRESS;
    return {
      version: 1,
      unlockedLevel: Math.max(0, Math.min(DIAGRAM_LABELING_LEVELS.length - 1, parsed.unlockedLevel ?? 0)),
      levels: parsed.levels ?? {},
      errors: parsed.errors ?? {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
      drafts: parsed.drafts ?? {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: Progress) {
  window.localStorage.setItem(DIAGRAM_LABELING_STORAGE_KEY, JSON.stringify(progress));
}

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function Passage({ passage }: { passage: DiagramLabelingTrainingPassage }) {
  return <article className={styles.passagePanel} lang="en">
    <span className={styles.panelLabel}>Reading passage</span>
    <h3>{passage.title}</h3>
    {passage.passage.split(/\n\s*\n/u).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
  </article>;
}

function DiagramMap({
  passage,
  activeId,
  onSelect,
}: {
  passage: DiagramLabelingTrainingPassage;
  activeId?: string;
  onSelect?: (decisionId: string) => void;
}) {
  const points = DIAGRAM_COORDINATES[passage.id] ?? MARKER_COORDINATES;
  return <section className={styles.headingBank} aria-label={`${passage.diagramTitle} visual map`}>
    <div className={styles.headingBankHeader}>
      <div><span className={styles.panelLabel}>{passage.diagramType} diagram</span><h3>{passage.diagramTitle}</h3></div>
      <span>{passage.instruction}</span>
    </div>
    <figure className={styles.diagramCanvas}>
      <svg className={styles.diagramVisual} viewBox="0 0 100 100" role="img" aria-label={`${passage.diagramTitle}: schematic with six labelled callout positions`}>
        <DiagramArtwork passageId={passage.id} />
        {passage.decisions.map((decision, index) => {
          const point = points[index];
          return <g key={decision.id}>
            <line className={styles.diagramLine} x1={point.x} y1={point.y} x2={point.targetX} y2={point.targetY} />
            <circle className={styles.diagramMarkerDot} cx={point.x} cy={point.y} r="7" />
            <text className={styles.diagramMarkerText} x={point.x} y={point.y + 0.5}>{decision.marker}</text>
          </g>;
        })}
      </svg>
      <figcaption>Use each marker’s position, linked zone and landmark to form a search target. The schematic is a reasoning map, not an answer key.</figcaption>
    </figure>
    <ol className={styles.diagramCallouts}>
      {passage.decisions.map((decision) => <li key={decision.id}>
        {onSelect ? <button type="button" aria-current={activeId === decision.id ? 'step' : undefined} onClick={() => onSelect(decision.id)}>
          <strong>{decision.marker}</strong><span>{decision.zone}</span><small>{decision.landmark}</small>
        </button> : <div aria-current={activeId === decision.id ? 'step' : undefined}>
          <strong>{decision.marker}</strong><span>{decision.zone}</span><small>{decision.landmark}</small>
        </div>}
      </li>)}
    </ol>
  </section>;
}

function AnswerField({ decision, value, disabled, onChange }: { decision: DiagramLabelingDecision; value: string; disabled?: boolean; onChange: (value: string) => void }) {
  const inputId = `diagram-answer-${decision.id}`;
  return <label className={styles.selectLabel} htmlFor={inputId}>
    <span>Label {decision.marker} · {decision.zone}</span>
    <span className={styles.completionCard}>
      <span>{decision.before}</span>
      <input id={inputId} name={decision.id} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} autoComplete="off" spellCheck={false} />
      <span>{decision.after}</span>
    </span>
    <small>{countDiagramLabelingWords(value)}/{decision.maxWords} words · use words from the passage</small>
  </label>;
}

function Feedback({ decision, value }: { decision: DiagramLabelingDecision; value: string }) {
  const correct = isDiagramLabelingCorrect(decision, value);
  return <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
    {correct ? <CheckCircle2 aria-hidden="true" /> : <XCircle aria-hidden="true" />}
    <div><strong>{correct ? 'Correct label.' : `Repair this label. Expected: ${decision.answer}.`}</strong><p>{decision.explanation}</p><blockquote>{decision.evidenceQuote}</blockquote>{!correct && <small>{decision.trap}</small>}</div>
  </div>;
}

function SourceBoundary({ passage }: { passage: DiagramLabelingTrainingPassage }) {
  return <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noreferrer">Review the candidate source.</a></p>;
}

export function DiagramLabelingGuidedPractice({ passage }: { passage: DiagramLabelingTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const active = passage.decisions[activeIndex];
  const value = answers[active.id] ?? '';
  const isChecked = Boolean(checked[active.id]);
  const correct = isChecked && isDiagramLabelingCorrect(active, value);

  function reset() { setAnswers({}); setChecked({}); setActiveIndex(0); setShowHint(false); }
  function selectDecision(id: string) { const next = passage.decisions.findIndex((item) => item.id === id); if (next >= 0) { setActiveIndex(next); setShowHint(false); } }

  return <section className={styles.lab} data-active-practice="true" aria-label="Guided Diagram Labeling practice">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Guided example · repair enabled</span><h3>Map the picture before searching</h3><p>Select a visible marker, name its zone, then locate the exact phrase that labels that component.</p></div><button type="button" className={styles.textButton} onClick={reset}><RotateCcw aria-hidden="true" />Reset example</button></div>
    <nav className={styles.levelRail} aria-label="Diagram markers">{passage.decisions.map((decision, index) => <button type="button" key={decision.id} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => selectDecision(decision.id)}><span>{decision.marker}</span><strong>{decision.zone}</strong><small>{checked[decision.id] ? isDiagramLabelingCorrect(decision, answers[decision.id] ?? '') ? 'correct' : 'repair' : index === activeIndex ? 'active' : 'open'}</small></button>)}</nav>
    <div className={styles.guidedLayout}><Passage passage={passage} /><div className={styles.decisionPanel}><DiagramMap passage={passage} activeId={active.id} onSelect={selectDecision} /><article className={styles.workedDecision}><div className={styles.questionMeta}><span>{active.marker}</span><small>{active.zone} · {active.landmark}</small></div><AnswerField decision={active} value={value} onChange={(next) => { setAnswers((current) => ({ ...current, [active.id]: next })); setChecked((current) => ({ ...current, [active.id]: false })); }} />
      <div className={styles.actions}><button type="button" className="btn btn-ghost" aria-expanded={showHint} onClick={() => setShowHint((current) => !current)}><Lightbulb aria-hidden="true" />{showHint ? 'Hide hint' : 'Show hint'}</button><button type="button" className="btn btn-primary" disabled={!value.trim()} onClick={() => setChecked((current) => ({ ...current, [active.id]: true }))}>Check label</button></div>
      {showHint && <p className={styles.methodPrompt}>{active.hint}</p>}{isChecked && <Feedback decision={active} value={value} />}{correct && activeIndex < passage.decisions.length - 1 && <button type="button" className="btn btn-primary" onClick={() => { setActiveIndex((index) => index + 1); setShowHint(false); }}>Open marker {passage.decisions[activeIndex + 1].marker}</button>}
    </article></div></div><SourceBoundary passage={passage} />
  </section>;
}

function CompleteDiagram({ passage, answers, submitted, onChange }: { passage: DiagramLabelingTrainingPassage; answers: Answers; submitted: boolean; onChange: (id: string, value: string) => void }) {
  return <div className={styles.independentLayout}><div><DiagramMap passage={passage} /><Passage passage={passage} /></div><div className={styles.independentGrid}>{passage.decisions.map((decision) => <article className={`${styles.independentCard} ${styles.flowAnswerCard}`} key={decision.id}><div className={styles.questionMeta}><span>{decision.marker}</span><small>{decision.zone} · {decision.landmark}</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => onChange(decision.id, value)} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div></div>;
}

export function DiagramLabelingIndependentPractice({ passage }: { passage: DiagramLabelingTrainingPassage }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('Feedback stays closed until every diagram label is complete.');
  const firstMissingRef = useRef<HTMLInputElement | null>(null);
  const score = passage.decisions.filter((decision) => isDiagramLabelingCorrect(decision, answers[decision.id] ?? '')).length;

  function submit() {
    const missing = passage.decisions.find((decision) => !answers[decision.id]?.trim());
    if (missing) {
      setMessage(`Complete label ${missing.marker} before submitting the full diagram.`);
      const element = document.getElementById(`diagram-answer-${missing.id}`) as HTMLInputElement | null;
      firstMissingRef.current = element;
      element?.focus();
      return;
    }
    setSubmitted(true);
  }

  return <section className={styles.lab} data-active-practice="true" aria-label="Independent Diagram Labeling practice">
    <div className={styles.labTopline}><div><span className={styles.modeTag}>Independent transfer · no hints</span><h3>{passage.diagramTitle}</h3><p>Complete the entire visual before any key or explanation opens.</p></div><span className={styles.counter}>{passage.decisions.length} labels</span></div>
    <CompleteDiagram passage={passage} answers={answers} submitted={submitted} onChange={(id, value) => { setAnswers((current) => ({ ...current, [id]: value })); setMessage('Feedback stays closed until every diagram label is complete.'); }} />
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.decisions.length} correct</strong><span>{score === passage.decisions.length ? 'The complete visual map is controlled.' : 'Repair only the labels that point to the wrong zone, part or span.'}</span></> : <><strong>One complete submission</strong><span>{message}</span></>}</div><div className={styles.actions}>{submitted && score < passage.decisions.length && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this diagram</button>}{!submitted && <button type="button" className="btn btn-primary" onClick={submit}>Submit full diagram</button>}</div></div>
    <SourceBoundary passage={passage} /><p className={styles.securityNote}>Independent feedback is delayed, but answer keys still reach this browser. This is guided Learn practice, not a secure Exam or proctored mode.</p>
  </section>;
}

export function DiagramLabelingProgressEngine() {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);
  const [submissionPrompt, setSubmissionPrompt] = useState('');
  const level = DIAGRAM_LABELING_LEVELS[levelIndex];
  const questions = useMemo(() => level.passageIds.flatMap((passageId) => {
    const passage = DIAGRAM_LABELING_PASSAGES.find((item) => item.id === passageId);
    if (!passage) return [];
    const decisions = level.decisionIds ? passage.decisions.filter((decision) => level.decisionIds!.includes(decision.id)) : passage.decisions;
    return decisions.map((decision) => ({ passage, decision }));
  }), [level]);
  const answered = questions.filter(({ decision }) => answers[decision.id]?.trim()).length;
  const score = questions.filter(({ decision }) => isDiagramLabelingCorrect(decision, answers[decision.id] ?? '')).length;
  const mastered = submitted && score >= level.masteryScore;
  const completed = Object.values(progress.levels).filter((record) => record.mastered).length;
  const topErrors = Object.entries(progress.errors).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0)).slice(0, 3) as Array<[DiagramLabelingErrorCode, number]>;

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      const saved = readProgress();
      setProgress(saved);
      setAnswers(saved.drafts[DIAGRAM_LABELING_LEVELS[0].id] ?? {});
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydration);
  }, []);
  useEffect(() => { if (!hydrated || submitted) return; const timer = window.setInterval(() => setElapsed((seconds) => seconds + 1), 1000); return () => window.clearInterval(timer); }, [hydrated, submitted, levelIndex]);

  function updateAnswer(decisionId: string, value: string) {
    const nextAnswers = { ...answers, [decisionId]: value };
    setAnswers(nextAnswers);
    setProgress((currentProgress) => {
      const nextProgress = { ...currentProgress, drafts: { ...currentProgress.drafts, [level.id]: nextAnswers } };
      writeProgress(nextProgress);
      return nextProgress;
    });
    setConfirmReset(false);
    setSubmissionPrompt('');
  }

  function switchLevel(nextIndex: number) { if (nextIndex > progress.unlockedLevel) return; setLevelIndex(nextIndex); setAnswers(progress.drafts[DIAGRAM_LABELING_LEVELS[nextIndex].id] ?? {}); setSubmitted(false); setElapsed(0); setConfirmReset(false); setSubmissionPrompt(''); }
  function submitLevel() {
    const missing = questions.find(({ decision }) => !answers[decision.id]?.trim());
    if (missing) { setSubmissionPrompt(`Complete marker ${missing.decision.marker} before submitting this level.`); document.getElementById(`diagram-answer-${missing.decision.id}`)?.focus(); return; }
    const wrong = questions.filter(({ decision }) => !isDiagramLabelingCorrect(decision, answers[decision.id] ?? ''));
    const errors = { ...progress.errors };
    wrong.forEach(({ decision }) => { errors[decision.errorCode] = (errors[decision.errorCode] ?? 0) + 1; });
    const previous = progress.levels[level.id];
    const isMastered = score >= level.masteryScore;
    const levels = { ...progress.levels, [level.id]: { bestScore: Math.max(previous?.bestScore ?? 0, score), attempts: (previous?.attempts ?? 0) + 1, mastered: Boolean(previous?.mastered || isMastered) } };
    const drafts = { ...progress.drafts, [level.id]: answers };
    const next = { ...progress, levels, errors, unlockedLevel: isMastered ? Math.max(progress.unlockedLevel, Math.min(DIAGRAM_LABELING_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel, reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ decision }) => decision.id)])), drafts };
    setSubmitted(true); setProgress(next); writeProgress(next);
  }
  function resetAttempt() { if ((answered || elapsed) && !confirmReset) { setConfirmReset(true); return; } const drafts = { ...readProgress().drafts }; delete drafts[level.id]; const next = { ...progress, drafts }; setProgress(next); writeProgress(next); setAnswers({}); setElapsed(0); setSubmitted(false); setConfirmReset(false); setSubmissionPrompt(''); }
  function resetAll() { if (!confirmAllReset) { setConfirmAllReset(true); return; } window.localStorage.removeItem(DIAGRAM_LABELING_STORAGE_KEY); setProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setElapsed(0); setSubmitted(false); setConfirmAllReset(false); setSubmissionPrompt(''); }

  if (!hydrated) return <section className={styles.lab} data-active-practice="true" aria-label="Diagram Labeling Progress Engine"><p>Loading saved Diagram Labeling progress…</p></section>;
  const distinctPassages = Array.from(new Map(questions.map(({ passage }) => [passage.id, passage])).values());
  return <section className={styles.lab} data-active-practice="true" aria-label="WeLearn Diagram Labeling Progress Engine">
    <div className={styles.engineHeader}><div><span className={styles.modeTag}>WeLearn Progress Engine · local progress</span><h3>Diagram Labeling control room</h3><p>Six levels move from visual coordinates to complete diagrams.</p></div><div className={styles.engineStats}><span><FileCheck2 aria-hidden="true" />{completed}/{DIAGRAM_LABELING_LEVELS.length} mastered</span><span><Clock3 aria-hidden="true" />{formatTime(elapsed)}</span><span><LockKeyhole aria-hidden="true" />Level {progress.unlockedLevel + 1} open</span></div></div>
    <nav className={styles.levelRail} aria-label="Diagram Labeling levels">{DIAGRAM_LABELING_LEVELS.map((item, index) => <button type="button" key={item.id} disabled={index > progress.unlockedLevel} aria-current={index === levelIndex ? 'step' : undefined} onClick={() => switchLevel(index)}><span>{index + 1}</span><strong>{item.title}</strong><small>{progress.levels[item.id]?.mastered ? 'mastered' : index > progress.unlockedLevel ? 'locked' : index === levelIndex ? 'active' : 'open'}</small></button>)}</nav>
    <div className={styles.labTopline}><div><span className={styles.modeTag}>{level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><span className={styles.counter} aria-live="polite">{answered}/{questions.length} complete</span></div>
    {level.decisionIds ? <div className={styles.flowDrillGrid}>{questions.map(({ passage, decision }) => <article className={styles.flowDrillCard} key={decision.id}><DiagramMap passage={passage} activeId={decision.id} /><Passage passage={passage} /><div className={styles.flowDrillAnswer}><div className={styles.questionMeta}><span>{decision.marker}</span><small>{decision.zone} · {decision.landmark}</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => updateAnswer(decision.id, value)} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</div></article>)}</div> : <div className={styles.independentLayout}><div>{distinctPassages.map((passage) => <div key={passage.id}><DiagramMap passage={passage} /><Passage passage={passage} /></div>)}</div><div className={styles.independentGrid}>{questions.map(({ decision }) => <article className={`${styles.independentCard} ${styles.flowAnswerCard}`} key={decision.id}><div className={styles.questionMeta}><span>{decision.marker}</span><small>{decision.zone} · {decision.landmark}</small></div><AnswerField decision={decision} value={answers[decision.id] ?? ''} disabled={submitted} onChange={(value) => updateAnswer(decision.id, value)} />{submitted && <Feedback decision={decision} value={answers[decision.id] ?? ''} />}</article>)}</div></div>}
    <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} · {mastered ? 'level mastered' : 'repair required'}</strong><span>{mastered ? 'The next level is now open.' : `Reach ${level.masteryScore}/${questions.length} to unlock the next level.`}</span></> : <><strong>Feedback stays closed</strong><span>{submissionPrompt || 'Complete every visible marker before submitting this level.'}</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw aria-hidden="true" />{confirmReset ? 'Press again to reset' : 'Reset attempt'}</button>{!submitted && <button type="button" className="btn btn-primary" onClick={submitLevel}>Submit level</button>}{submitted && !mastered && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this level</button>}{submitted && mastered && levelIndex < DIAGRAM_LABELING_LEVELS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}</div></div>
    <aside className={styles.errorPanel}><div><span className={styles.modeTag}>Error ledger</span><h4>What to repair next</h4><p>{topErrors.length ? 'Your most frequent Diagram Labeling errors appear below.' : 'Complete a level to build a personalised review queue.'}</p></div><ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul><button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw aria-hidden="true" />{confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button></aside>
    {distinctPassages.map((passage) => <SourceBoundary key={passage.id} passage={passage} />)}<p className={styles.securityNote}><MapPinned aria-hidden="true" /> Guided Learn mode delivers answer keys and explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p>
  </section>;
}
