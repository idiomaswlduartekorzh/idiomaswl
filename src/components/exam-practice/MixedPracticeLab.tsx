'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  ScanSearch,
  XCircle,
} from 'lucide-react';
import {
  MIXED_PRACTICE_LEVELS,
  MIXED_PRACTICE_STORAGE_KEY,
  countMixedAnswerWords,
  getMixedPracticeTask,
  isMixedTaskCorrect,
  type MixedErrorCode,
  type MixedPracticePassage,
  type MixedPracticeTask,
} from '@/data/practica-exams/ielts-reading-mixed-progress';
import styles from './MixedPracticeLab.module.css';

type Answers = Record<string, string>;
type LevelResult = { bestScore: number; attempts: number; mastered: boolean };
type Progress = {
  version: 1;
  unlockedLevel: number;
  levels: Record<string, LevelResult>;
  errors: Partial<Record<MixedErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, Answers>;
};

const EMPTY_PROGRESS: Progress = {
  version: 1,
  unlockedLevel: 0,
  levels: {},
  errors: {},
  reviewQueue: [],
  drafts: {},
};

const ERROR_LABELS: Record<MixedErrorCode, string> = {
  'wrong-format': 'Wrong task contract',
  'wrong-scope': 'Scope or attribution',
  'wrong-location': 'Wrong evidence zone',
  'paraphrase-miss': 'Paraphrase missed',
  'word-limit': 'Word-limit control',
  'grammar-mismatch': 'Grammar or fit',
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(MIXED_PRACTICE_STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    if (parsed.version !== 1) return EMPTY_PROGRESS;
    return {
      version: 1,
      unlockedLevel: Number.isInteger(parsed.unlockedLevel) ? Math.max(0, Math.min(parsed.unlockedLevel!, MIXED_PRACTICE_LEVELS.length - 1)) : 0,
      levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
      errors: parsed.errors && typeof parsed.errors === 'object' ? parsed.errors : {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
      drafts: parsed.drafts && typeof parsed.drafts === 'object' ? parsed.drafts : {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: Progress) {
  try {
    window.localStorage.setItem(MIXED_PRACTICE_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Practice remains usable when storage is disabled or full.
  }
}

function PassagePanel({ passage, compact = false }: { passage: MixedPracticePassage; compact?: boolean }) {
  return (
    <article className={compact ? styles.passageCompact : styles.passagePanel}>
      <div className={styles.passageHeading}>
        <span>Reading passage</span>
        <h3>{passage.title}</h3>
      </div>
      <div className={styles.paragraphs} lang="en-GB">
        {passage.paragraphs.map((paragraph) => (
          <section key={paragraph.id} id={`${passage.id}-paragraph-${paragraph.id}`}>
            <span>Paragraph {paragraph.id}</span>
            <p>{paragraph.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

function SourceBoundary({ passage }: { passage: MixedPracticePassage }) {
  return (
    <footer className={styles.sourceBoundary}>
      <strong>Source boundary</strong>
      <p>{passage.sourceNote}</p>
      <a href={passage.sourceUrl} target="_blank" rel="noreferrer">
        Review the contextual source <ExternalLink aria-hidden="true" />
      </a>
    </footer>
  );
}

function TaskField({
  task,
  value,
  disabled = false,
  revealType = false,
  onChange,
}: {
  task: MixedPracticeTask;
  value: string;
  disabled?: boolean;
  revealType?: boolean;
  onChange: (value: string) => void;
}) {
  const fieldId = `mixed-answer-${task.id}`;
  return (
    <div className={styles.taskField} data-response-kind={task.responseKind}>
      <div className={styles.taskMeta}>
        <span>{revealType ? task.questionType : 'Identify the task from its instruction'}</span>
        <small>{task.instruction}</small>
      </div>
      <h4>{task.prompt}</h4>
      {task.responseKind === 'choice' ? (
        <fieldset className={styles.choiceGrid} disabled={disabled}>
          <legend className="sr-only">{task.prompt}</legend>
          {task.options?.map((option, index) => (
            <label key={option} className={value === option ? styles.choiceSelected : undefined}>
              <input
                type="radio"
                name={`mixed-${task.id}`}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <strong>{option}</strong>
            </label>
          ))}
        </fieldset>
      ) : (
        <label className={styles.textField} htmlFor={fieldId}>
          <span>Your answer{task.maxWords ? ` · maximum ${task.maxWords} ${task.maxWords === 1 ? 'word' : 'words'}` : ''}</span>
          <input
            id={fieldId}
            name={task.id}
            type="text"
            autoComplete="off"
            disabled={disabled}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-describedby={`${fieldId}-count`}
          />
          <small id={`${fieldId}-count`} className={task.maxWords && countMixedAnswerWords(value) > task.maxWords ? styles.overLimit : undefined}>
            {countMixedAnswerWords(value)} {countMixedAnswerWords(value) === 1 ? 'word' : 'words'}
          </small>
        </label>
      )}
    </div>
  );
}

function Feedback({ task, value }: { task: MixedPracticeTask; value: string }) {
  const correct = isMixedTaskCorrect(task, value);
  return (
    <section className={correct ? styles.feedbackCorrect : styles.feedbackWrong} aria-live="polite">
      <div className={styles.feedbackHeading}>
        {correct ? <CheckCircle2 aria-hidden="true" /> : <XCircle aria-hidden="true" />}
        <div>
          <span>{correct ? 'Correct decision' : 'Repair this decision'}</span>
          <strong>{correct ? task.questionType : `Best answer: ${task.answer}`}</strong>
        </div>
      </div>
      <dl className={styles.feedbackGrid}>
        <div><dt>Evidence</dt><dd>“{task.evidenceQuote}”</dd></div>
        <div><dt>Why it fits</dt><dd>{task.explanation}</dd></div>
        <div><dt>Trap check</dt><dd>{task.trap}</dd></div>
        <div><dt>Support skill</dt><dd>{task.supportSkill}</dd></div>
      </dl>
      <Link href={task.route} className={styles.focusedLink}>
        Open the focused {task.questionType} lesson <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}

export function MixedGuidedPractice({ passage }: { passage: MixedPracticePassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showCoach, setShowCoach] = useState(false);
  const active = passage.tasks[activeIndex];
  const value = answers[active.id] ?? '';
  const reviewed = Boolean(checked[active.id]);
  const correct = reviewed && isMixedTaskCorrect(active, value);

  function select(index: number) {
    setActiveIndex(index);
    setShowCoach(false);
  }

  function reset() {
    setActiveIndex(0);
    setAnswers({});
    setChecked({});
    setShowCoach(false);
  }

  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Guided Mixed Practice">
      <div className={styles.labTopline}>
        <div><span className={styles.modeTag}>Guided example · repair enabled</span><h3>Read the instruction before the topic</h3><p>Each question changes its contract. Name that contract, choose a method and then answer.</p></div>
        <button type="button" className={styles.textButton} onClick={reset}><RotateCcw aria-hidden="true" />Reset example</button>
      </div>
      <nav className={styles.levelRail} aria-label="Guided mixed questions">
        {passage.tasks.map((task, index) => (
          <button type="button" key={task.id} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => select(index)}>
            <span>{index + 1}</span><strong>{checked[task.id] ? task.questionType : `Decision ${index + 1}`}</strong>
            <small>{checked[task.id] ? isMixedTaskCorrect(task, answers[task.id] ?? '') ? 'correct' : 'repair' : index === activeIndex ? 'active' : 'open'}</small>
          </button>
        ))}
      </nav>
      <div className={styles.splitLayout}>
        <PassagePanel passage={passage} />
        <article className={styles.decisionPanel}>
          <div className={styles.panelHeading}><div><span>Question {activeIndex + 1} of {passage.tasks.length}</span><h3>Switch method deliberately</h3></div><strong>{reviewed ? active.questionType : 'Task hidden'}</strong></div>
          <TaskField
            task={active}
            value={value}
            revealType={reviewed}
            onChange={(next) => {
              setAnswers((current) => ({ ...current, [active.id]: next }));
              setChecked((current) => ({ ...current, [active.id]: false }));
            }}
          />
          <div className={styles.actions}>
            <button type="button" className="btn btn-ghost" aria-expanded={showCoach} onClick={() => setShowCoach((current) => !current)}><Lightbulb aria-hidden="true" />{showCoach ? 'Hide method prompt' : 'Show method prompt'}</button>
            <button type="button" className="btn btn-primary" disabled={!value.trim()} onClick={() => setChecked((current) => ({ ...current, [active.id]: true }))}>Check decision</button>
          </div>
          {showCoach && <p className={styles.coachPrompt}>What must the response contain: a label, a paragraph, a category, an option or exact words from the passage?</p>}
          {reviewed && <Feedback task={active} value={value} />}
          {correct && activeIndex < passage.tasks.length - 1 && <button type="button" className="btn btn-primary" onClick={() => select(activeIndex + 1)}>Open decision {activeIndex + 2}</button>}
        </article>
      </div>
      <SourceBoundary passage={passage} />
    </section>
  );
}

function FullSet({ passage, answers, submitted, onChange }: { passage: MixedPracticePassage; answers: Answers; submitted: boolean; onChange: (id: string, value: string) => void }) {
  return (
    <div className={styles.fullSet}>
      <PassagePanel passage={passage} />
      <div className={styles.taskStack}>
        {passage.tasks.map((task, index) => (
          <article className={styles.taskCard} key={task.id}>
            <span className={styles.questionNumber}>Question {index + 1}</span>
            <TaskField task={task} value={answers[task.id] ?? ''} disabled={submitted} revealType={submitted} onChange={(value) => onChange(task.id, value)} />
            {submitted && <Feedback task={task} value={answers[task.id] ?? ''} />}
          </article>
        ))}
      </div>
    </div>
  );
}

export function MixedIndependentPractice({ passage }: { passage: MixedPracticePassage }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('Feedback stays closed until all six decisions are complete.');
  const score = passage.tasks.filter((task) => isMixedTaskCorrect(task, answers[task.id] ?? '')).length;

  function submit() {
    const missing = passage.tasks.find((task) => !answers[task.id]?.trim());
    if (missing) {
      setMessage(`Complete question ${passage.tasks.indexOf(missing) + 1} before submitting the full set.`);
      const target = missing.responseKind === 'text'
        ? document.getElementById(`mixed-answer-${missing.id}`)
        : document.querySelector<HTMLInputElement>(`input[name="mixed-${missing.id}"]`);
      target?.focus();
      return;
    }
    setSubmitted(true);
  }

  return (
    <section className={styles.lab} data-active-practice="true" aria-label="Independent Mixed Practice">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Independent transfer · no hints</span><h3>{passage.title}</h3><p>Complete the full passage before any task label, key or explanation opens.</p></div><span className={styles.counter}>{passage.tasks.length} decisions</span></div>
      <FullSet passage={passage} answers={answers} submitted={submitted} onChange={(id, value) => { setAnswers((current) => ({ ...current, [id]: value })); setMessage('Feedback stays closed until all six decisions are complete.'); }} />
      <div className={styles.submitBar} aria-live="polite">
        <div>{submitted ? <><strong>{score}/{passage.tasks.length} correct</strong><span>{score === passage.tasks.length ? 'Every task contract and evidence decision held.' : 'Repair only the decisions that used the wrong contract, zone or span.'}</span></> : <><strong>One complete submission</strong><span>{message}</span></>}</div>
        <div className={styles.actions}>{submitted && score < passage.tasks.length && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this set</button>}{!submitted && <button type="button" className="btn btn-primary" onClick={submit}>Submit all decisions</button>}</div>
      </div>
      <SourceBoundary passage={passage} />
      <p className={styles.securityNote}><LockKeyhole aria-hidden="true" />Feedback is delayed, but answer keys still reach this browser. This is guided Learn practice, not a secure Practice, Exam or proctored mode.</p>
    </section>
  );
}

export function MixedProgressEngine() {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);
  const [submissionPrompt, setSubmissionPrompt] = useState('');
  const level = MIXED_PRACTICE_LEVELS[levelIndex];
  const questions = useMemo(() => level.taskIds.map((id) => getMixedPracticeTask(id)).filter((item): item is NonNullable<typeof item> => Boolean(item)), [level]);
  const answered = questions.filter(({ task }) => answers[task.id]?.trim()).length;
  const score = questions.filter(({ task }) => isMixedTaskCorrect(task, answers[task.id] ?? '')).length;
  const mastered = submitted && score >= level.masteryScore;

  useEffect(() => {
    const task = window.setTimeout(() => {
      const saved = readProgress();
      const savedLevel = Math.min(saved.unlockedLevel, MIXED_PRACTICE_LEVELS.length - 1);
      setProgress(saved);
      setLevelIndex(savedLevel);
      setAnswers(saved.drafts[MIXED_PRACTICE_LEVELS[savedLevel].id] ?? {});
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, submitted, levelIndex]);

  function openLevel(index: number) {
    setLevelIndex(index);
    setAnswers(progress.drafts[MIXED_PRACTICE_LEVELS[index].id] ?? {});
    setSubmitted(false);
    setElapsed(0);
    setSubmissionPrompt('');
  }

  function persistDraft(nextAnswers: Answers) {
    setAnswers(nextAnswers);
    setProgress((current) => {
      const next = { ...current, drafts: { ...current.drafts, [level.id]: nextAnswers } };
      writeProgress(next);
      return next;
    });
  }

  function submit() {
    if (answered < questions.length) {
      setSubmissionPrompt(`Complete ${questions.length - answered} more ${questions.length - answered === 1 ? 'decision' : 'decisions'} before submitting.`);
      const missing = questions.find(({ task }) => !answers[task.id]?.trim());
      if (missing) {
        const target = missing.task.responseKind === 'text'
          ? document.getElementById(`mixed-answer-${missing.task.id}`)
          : document.querySelector<HTMLInputElement>(`input[name="mixed-${missing.task.id}"]`);
        target?.focus();
      }
      return;
    }
    setSubmitted(true);
    setSubmissionPrompt('');
    setProgress((current) => {
      const previous = current.levels[level.id] ?? { bestScore: 0, attempts: 0, mastered: false };
      const failed = questions.filter(({ task }) => !isMixedTaskCorrect(task, answers[task.id] ?? ''));
      const errors = { ...current.errors };
      for (const { task } of failed) errors[task.errorCode] = (errors[task.errorCode] ?? 0) + 1;
      const nextUnlocked = score >= level.masteryScore
        ? Math.max(current.unlockedLevel, Math.min(levelIndex + 1, MIXED_PRACTICE_LEVELS.length - 1))
        : current.unlockedLevel;
      const next: Progress = {
        ...current,
        unlockedLevel: nextUnlocked,
        levels: { ...current.levels, [level.id]: { bestScore: Math.max(previous.bestScore, score), attempts: previous.attempts + 1, mastered: previous.mastered || score >= level.masteryScore } },
        errors,
        reviewQueue: [...new Set([...current.reviewQueue, ...failed.map(({ task }) => task.id)])],
        drafts: { ...current.drafts, [level.id]: answers },
      };
      writeProgress(next);
      return next;
    });
  }

  function clearCurrent() {
    setConfirmReset(false);
    persistDraft({});
    setSubmitted(false);
    setElapsed(0);
  }

  function clearAll() {
    setConfirmAllReset(false);
    setProgress(EMPTY_PROGRESS);
    setLevelIndex(0);
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
    writeProgress(EMPTY_PROGRESS);
  }

  if (!hydrated) return <section className={styles.engine} aria-label="Loading Mixed Practice Progress Engine"><p>Loading saved practice…</p></section>;

  const passages = [...new Map(questions.map(({ passage }) => [passage.id, passage])).values()];
  return (
    <section className={styles.engine} data-active-practice="true" aria-label="Mixed Practice Progress Engine">
      <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h3>Mixed Reading control room</h3><p>Six levels train deliberate switching without weakening any task contract.</p></div><div className={styles.engineScore}><span><Clock3 aria-hidden="true" />{formatTime(elapsed)}</span><strong>{answered}/{questions.length} answered</strong></div></div>
      <div className={styles.dashboard}><div><small>Unlocked</small><strong>{progress.unlockedLevel + 1}/{MIXED_PRACTICE_LEVELS.length}</strong></div><div><small>Best here</small><strong>{progress.levels[level.id]?.bestScore ?? 0}/{questions.length}</strong></div><div><small>Review queue</small><strong>{progress.reviewQueue.length}</strong></div><div><small>Saved locally</small><strong>{Object.keys(progress.drafts).length} levels</strong></div></div>
      <nav className={styles.levelRail} aria-label="Mixed Practice levels">
        {MIXED_PRACTICE_LEVELS.map((item, index) => {
          const locked = index > progress.unlockedLevel;
          return <button type="button" key={item.id} disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} onClick={() => openLevel(index)}><span>{locked ? <LockKeyhole aria-hidden="true" /> : index + 1}</span><strong>{item.title}</strong><small>{progress.levels[item.id]?.mastered ? 'mastered' : locked ? 'locked' : index === levelIndex ? 'active' : 'open'}</small></button>;
        })}
      </nav>
      <div className={styles.levelHeader}><div><span>Level {levelIndex + 1}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div><small>Mastery target</small><strong>{level.masteryScore}/{questions.length}</strong><span>{level.focus}</span></div></div>
      <div className={styles.enginePassages}>
        {passages.map((passage) => {
          const passageQuestions = questions.filter((item) => item.passage.id === passage.id);
          return (
            <article className={styles.enginePassage} key={passage.id}>
              <PassagePanel passage={passage} compact />
              <div className={styles.taskStack}>
                {passageQuestions.map(({ task }, index) => (
                  <article className={styles.taskCard} key={task.id}>
                    <span className={styles.questionNumber}>Decision {index + 1}</span>
                    <TaskField task={task} value={answers[task.id] ?? ''} disabled={submitted} revealType={submitted} onChange={(value) => persistDraft({ ...answers, [task.id]: value })} />
                    {submitted && <Feedback task={task} value={answers[task.id] ?? ''} />}
                  </article>
                ))}
              </div>
              <SourceBoundary passage={passage} />
            </article>
          );
        })}
      </div>
      <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct</strong><span>{mastered ? 'Level mastered. The next transfer level is now open.' : 'Repair the task contract, evidence zone or response span, then retry.'}</span></> : <><strong>Drafts save in this browser</strong><span>{submissionPrompt || 'Task labels, keys and explanations stay closed until one complete submission.'}</span></>}</div><div className={styles.actions}>{submitted && score < questions.length && <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>Repair this level</button>}{!submitted && <button type="button" className="btn btn-primary" onClick={submit}><FileCheck2 aria-hidden="true" />Submit level</button>}<button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(true)}><RotateCcw aria-hidden="true" />Reset level</button></div></div>
      <aside className={styles.errorLedger}><div><ScanSearch aria-hidden="true" /><div><span>Diagnostic ledger</span><h3>What is costing you marks?</h3></div></div><ul>{Object.entries(ERROR_LABELS).map(([code, label]) => <li key={code}><span>{label}</span><strong>{progress.errors[code as MixedErrorCode] ?? 0}</strong></li>)}</ul><button type="button" className={styles.textButton} onClick={() => setConfirmAllReset(true)}>Reset all Mixed Practice progress</button></aside>
      {(confirmReset || confirmAllReset) && <div className={styles.confirmBar} role="alertdialog" aria-label={confirmAllReset ? 'Confirm all progress reset' : 'Confirm level reset'}><p>{confirmAllReset ? 'Delete every saved Mixed Practice level, error count and draft on this browser?' : `Clear every draft decision in ${level.title}?`}</p><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={() => { setConfirmReset(false); setConfirmAllReset(false); }}>Cancel</button><button type="button" className="btn btn-primary" onClick={confirmAllReset ? clearAll : clearCurrent}>Confirm reset</button></div></div>}
      <p className={styles.securityNote}><LockKeyhole aria-hidden="true" />This engine stores progress locally and exposes answer data to the browser. It is a guided Learn system, not secure Practice, Exam or proctored delivery.</p>
    </section>
  );
}
