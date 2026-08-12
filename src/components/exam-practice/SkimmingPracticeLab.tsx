'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, LockKeyhole, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  SKIMMING_LEGACY_STORAGE_KEY,
  SKIMMING_LEVELS,
  SKIMMING_STORAGE_KEY,
  getSkimmingErrorCode,
  getSkimmingFunctionOptionIds,
  getSkimmingParagraph,
  getSkimmingPassage,
  type SkimmingErrorCode,
} from '@/data/practica-exams/ielts-reading-skimming-progress';
import type {
  MatchingHeadingsParagraph,
  MatchingHeadingsTrainingPassage,
} from '@/data/practica-exams/ielts-reading-matching-headings-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number; attemptSeed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<SkimmingErrorCode, number>>;
  reviewQueue: string[];
  drafts: Record<string, AttemptDraft>;
};

const EMPTY_PROGRESS: StoredProgress = {
  version: 2,
  unlockedLevel: 0,
  activeLevelIndex: 0,
  levels: {},
  errorCounts: {},
  reviewQueue: [],
  drafts: {},
};

const ERROR_LABELS: Record<SkimmingErrorCode, string> = {
  'detail-before-purpose': 'read details before naming purpose',
  'topic-without-function': 'noticed topic but missed writer action',
  'direction-change-missed': 'missed a contrast or qualification',
  'scope-too-narrow': 'map label was too narrow',
  'scope-too-broad': 'map label was too broad',
};

function nonNegativeInteger(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : fallback;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function normalizeLevels(value: unknown): Record<string, LevelRecord> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const knownIds = new Set(SKIMMING_LEVELS.map((level) => level.id));
  return Object.fromEntries(Object.entries(value).flatMap(([levelId, raw]) => {
    if (!knownIds.has(levelId) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
    const record = raw as Partial<LevelRecord>;
    return [[levelId, {
      attempts: nonNegativeInteger(record.attempts),
      bestScore: Math.min(5, nonNegativeInteger(record.bestScore)),
      mastered: record.mastered === true,
    }]];
  }));
}

function normalizeDrafts(value: unknown): Record<string, AttemptDraft> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const knownIds = new Set(SKIMMING_LEVELS.map((level) => level.id));
  return Object.fromEntries(Object.entries(value).flatMap(([levelId, raw]) => {
    if (!knownIds.has(levelId) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
    const draft = raw as Partial<AttemptDraft>;
    const answers = draft.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers)
      ? Object.fromEntries(Object.entries(draft.answers).filter((row): row is [string, string] => typeof row[1] === 'string'))
      : {};
    return [[levelId, {
      answers,
      elapsed: nonNegativeInteger(draft.elapsed),
      attemptSeed: nonNegativeInteger(draft.attemptSeed),
    }]];
  }));
}

function readProgress(): StoredProgress {
  try {
    const current = window.localStorage.getItem(SKIMMING_STORAGE_KEY);
    const legacy = window.localStorage.getItem(SKIMMING_LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(current ?? legacy ?? 'null') as (Omit<Partial<StoredProgress>, 'version'> & { version?: number }) | null;
    if (!parsed || (parsed.version !== 1 && parsed.version !== 2)) return EMPTY_PROGRESS;
    const unlockedLevel = Math.min(SKIMMING_LEVELS.length - 1, nonNegativeInteger(parsed.unlockedLevel));
    const activeLevelIndex = Math.min(
      unlockedLevel,
      parsed.activeLevelIndex === undefined ? unlockedLevel : nonNegativeInteger(parsed.activeLevelIndex),
    );
    const rawErrorCounts = parsed.errorCounts && typeof parsed.errorCounts === 'object' && !Array.isArray(parsed.errorCounts)
      ? parsed.errorCounts
      : {};
    const errorCounts = Object.fromEntries(Object.entries(rawErrorCounts).filter(([code, count]) => (
      code in ERROR_LABELS && nonNegativeInteger(count) > 0
    )).map(([code, count]) => [code, nonNegativeInteger(count)])) as StoredProgress['errorCounts'];
    return {
      version: 2,
      unlockedLevel,
      activeLevelIndex,
      levels: normalizeLevels(parsed.levels),
      errorCounts,
      reviewQueue: Array.isArray(parsed.reviewQueue)
        ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string')
        : [],
      drafts: parsed.version === 2 ? normalizeDrafts(parsed.drafts) : {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: StoredProgress) {
  try {
    window.localStorage.setItem(SKIMMING_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The practice stays usable when private browsing or storage policy blocks persistence.
  }
}

function optionParagraph(passage: MatchingHeadingsTrainingPassage, optionId: string) {
  return passage.paragraphs.find((paragraph) => paragraph.id === optionId);
}

function wrongFeedback(
  passage: MatchingHeadingsTrainingPassage,
  paragraph: MatchingHeadingsParagraph,
  selectedId: string,
) {
  const selected = optionParagraph(passage, selectedId);
  if (!selected) return `Read the complete paragraph again and name what the writer is doing, not a detail you remember.`;
  return `“${selected.functionLabel}” describes a different writer action. Here, ${paragraph.evidence.charAt(0).toLowerCase()}${paragraph.evidence.slice(1)}`;
}

function FunctionOptions({
  passage,
  optionIds,
  selected,
  disabled,
  label,
  onSelect,
  compact = false,
}: {
  passage: MatchingHeadingsTrainingPassage;
  optionIds: string[];
  selected: string;
  disabled: boolean;
  label: string;
  onSelect: (optionId: string) => void;
  compact?: boolean;
}) {
  const groupId = `skimming-${useId().replace(/:/g, '')}`;
  return (
    <fieldset className={`${styles.headingOptions} ${compact ? styles.headingOptionsCompact : ''}`}>
      <legend className={styles.srOnly}>{label}</legend>
      {optionIds.map((optionId, optionIndex) => {
        const option = optionParagraph(passage, optionId);
        if (!option) return null;
        return (
          <label key={optionId} className={selected === optionId ? styles.headingOptionSelected : ''}>
            <input
              type="radio"
              name={groupId}
              value={optionId}
              checked={selected === optionId}
              disabled={disabled}
              onChange={() => onSelect(optionId)}
            />
            <span className={styles.headingOptionBody}>
              <span aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
              <strong>{option.functionLabel}</strong>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

export function SkimmingIndependentPractice({ passage }: { passage: MatchingHeadingsTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const answered = passage.paragraphs.filter((paragraph) => answers[paragraph.id]).length;
  const score = passage.paragraphs.filter((paragraph) => answers[paragraph.id] === paragraph.id).length;

  function reset() {
    if ((answered > 0 || submitted) && !confirmReset) {
      setConfirmReset(true);
      return;
    }
    setAnswers({});
    setSubmitted(false);
    setAttemptSeed((current) => current + 1);
    setConfirmReset(false);
  }

  return (
    <section className={styles.lab} aria-label="Independent skimming passage map" data-active-practice="true">
      <div className={styles.labTopline}>
        <div>
          <span className={styles.modeTag}>Full passage · feedback closed</span>
          <h3>{passage.title}</h3>
          <p>Read all five paragraphs, map every writer action, then submit the complete passage once.</p>
        </div>
        <span className={styles.counter} aria-live="polite">{answered}/5 mapped</span>
      </div>
      <div className={styles.independentGrid}>
        {passage.paragraphs.map((paragraph) => {
          const selected = answers[paragraph.id] ?? '';
          const correct = selected === paragraph.id;
          const options = getSkimmingFunctionOptionIds(passage, paragraph, attemptSeed, true);
          return (
            <article key={paragraph.id} className={styles.independentCard}>
              <p className={styles.panelLabel}>{paragraph.label}</p>
              <p>{paragraph.text}</p>
              <FunctionOptions
                passage={passage}
                optionIds={options}
                selected={selected}
                disabled={submitted}
                label={`Writer action for ${paragraph.label}`}
                onSelect={(optionId) => {
                  setAnswers((current) => ({ ...current, [paragraph.id]: optionId }));
                  setConfirmReset(false);
                }}
                compact
              />
              {submitted && (
                <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                  {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <div>
                    <strong>{correct ? `${paragraph.functionLabel}: proved` : `Best map label: ${paragraph.functionLabel}`}</strong>
                    <p>{correct ? paragraph.evidence : wrongFeedback(passage, paragraph, selected)}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className={styles.submitBar} aria-live="polite">
        <div>
          {submitted
            ? <><strong>{score}/5 correct</strong><span>{score >= 4 ? 'Independent transfer target reached.' : 'Review the map errors, then start a clean attempt.'}</span></>
            : <><strong>One complete submission</strong><span>Function labels may repeat in real passages; decide from meaning, not elimination.</span></>}
        </div>
        <div className={styles.actions}>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            <RotateCcw size={16} /> {confirmReset ? 'Press again to reset' : 'Reset set'}
          </button>
          {!submitted && <button type="button" className="btn btn-primary" disabled={answered !== 5} onClick={() => setSubmitted(true)}>Submit passage map</button>}
        </div>
      </div>
      <p className={styles.sourceNote}>
        <strong>Source boundary:</strong> {passage.sourceNote}{' '}
        <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the primary source <span className={styles.srOnly}>(opens in a new tab)</span></a>.
      </p>
    </section>
  );
}

type EngineQuestion = { passage: MatchingHeadingsTrainingPassage; paragraph: MatchingHeadingsParagraph };

function buildQuestions(levelIndex: number): EngineQuestion[] {
  const level = SKIMMING_LEVELS[levelIndex];
  const passages = level.passageIds.map(getSkimmingPassage).filter((item): item is MatchingHeadingsTrainingPassage => Boolean(item));
  if (!level.questionIds) return passages.flatMap((passage) => passage.paragraphs.map((paragraph) => ({ passage, paragraph })));
  return level.questionIds.map((questionId) => {
    const passage = passages.find((item) => item.paragraphs.some((paragraph) => paragraph.id === questionId));
    const paragraph = passage ? getSkimmingParagraph(passage, questionId) : undefined;
    return passage && paragraph ? { passage, paragraph } : null;
  }).filter((item): item is EngineQuestion => Boolean(item));
}

export function SkimmingProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmAllReset, setConfirmAllReset] = useState(false);

  useEffect(() => {
    const hydrationTask = window.setTimeout(() => {
      const stored = readProgress();
      const restoredIndex = Math.min(stored.activeLevelIndex, stored.unlockedLevel, SKIMMING_LEVELS.length - 1);
      const restoredLevel = SKIMMING_LEVELS[restoredIndex];
      const draft = stored.drafts[restoredLevel.id];
      setProgress(stored);
      setLevelIndex(restoredIndex);
      setAnswers(draft?.answers ?? {});
      setElapsed(draft?.elapsed ?? 0);
      setAttemptSeed(draft?.attemptSeed ?? stored.levels[restoredLevel.id]?.attempts ?? 0);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrationTask);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, levelIndex, submitted]);

  const level = SKIMMING_LEVELS[levelIndex];
  const questions = useMemo(() => buildQuestions(levelIndex), [levelIndex]);
  const fullPassage = !level.questionIds;
  const answered = questions.filter(({ paragraph }) => answers[paragraph.id]).length;
  const score = questions.filter(({ paragraph }) => answers[paragraph.id] === paragraph.id).length;
  const mastered = score >= level.masteryScore;
  const completed = SKIMMING_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .slice(0, 3) as Array<[SkimmingErrorCode, number]>;

  useEffect(() => {
    if (!hydrated || submitted) return;
    const persisted = readProgress();
    writeProgress({
      ...progress,
      activeLevelIndex: levelIndex,
      drafts: { ...persisted.drafts, [level.id]: { answers, elapsed, attemptSeed } },
    });
    // The draft follows the active attempt; saved scores are written on submission.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, attemptSeed, elapsed, hydrated, level.id, levelIndex, submitted]);

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    const persisted = readProgress();
    const drafts = submitted ? persisted.drafts : {
      ...persisted.drafts,
      [level.id]: { answers, elapsed, attemptSeed },
    };
    const target = SKIMMING_LEVELS[nextIndex];
    const draft = drafts[target.id];
    const nextProgress = { ...progress, activeLevelIndex: nextIndex, drafts };
    setProgress(nextProgress);
    writeProgress(nextProgress);
    setLevelIndex(nextIndex);
    setAnswers(draft?.answers ?? {});
    setElapsed(draft?.elapsed ?? 0);
    setAttemptSeed(draft?.attemptSeed ?? progress.levels[target.id]?.attempts ?? 0);
    setSubmitted(false);
    setConfirmAttemptReset(false);
    setConfirmAllReset(false);
  }

  function submitLevel() {
    if (answered !== questions.length) return;
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false };
    const wrong = questions.filter(({ paragraph }) => answers[paragraph.id] !== paragraph.id);
    const errorCounts = { ...progress.errorCounts };
    for (const { paragraph } of wrong) {
      const code = getSkimmingErrorCode(paragraph);
      errorCounts[code] = (errorCounts[code] ?? 0) + 1;
    }
    const drafts = { ...readProgress().drafts };
    delete drafts[level.id];
    const next: StoredProgress = {
      version: 2,
      unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(SKIMMING_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel,
      activeLevelIndex: levelIndex,
      levels: {
        ...progress.levels,
        [level.id]: {
          attempts: previous.attempts + 1,
          bestScore: Math.max(previous.bestScore, score),
          mastered: previous.mastered || mastered,
        },
      },
      errorCounts,
      reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ paragraph }) => paragraph.id)]))
        .filter((id) => !questions.some(({ paragraph }) => paragraph.id === id && answers[id] === id)),
      drafts,
    };
    setSubmitted(true);
    setProgress(next);
    writeProgress(next);
  }

  function resetAttempt() {
    if ((answered > 0 || elapsed > 0 || submitted) && !confirmAttemptReset) {
      setConfirmAttemptReset(true);
      return;
    }
    const drafts = { ...readProgress().drafts };
    delete drafts[level.id];
    const next = { ...progress, activeLevelIndex: levelIndex, drafts };
    setProgress(next);
    writeProgress(next);
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
    setAttemptSeed((current) => current + 1);
    setConfirmAttemptReset(false);
  }

  function resetAll() {
    if (!confirmAllReset) {
      setConfirmAllReset(true);
      return;
    }
    setProgress(EMPTY_PROGRESS);
    writeProgress(EMPTY_PROGRESS);
    setLevelIndex(0);
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
    setAttemptSeed(0);
    setConfirmAttemptReset(false);
    setConfirmAllReset(false);
  }

  return (
    <section className={styles.engine} aria-labelledby="skimming-engine-title" data-active-practice="true">
      <div className={styles.engineHeading}>
        <div>
          <span className={styles.modeTag}>WeLearn Progress Engine</span>
          <h2 id="skimming-engine-title">Build reliable passage maps across six levels</h2>
          <p>Two focused drills lead into four complete passages. Drafts, time, best scores and review targets stay on this device.</p>
        </div>
        <div className={styles.engineScore}><strong>{completed}/6</strong><span>levels mastered</span></div>
      </div>

      <div className={styles.dashboard}>
        <div><Target size={19} /><span><strong>{progress.reviewQueue.length}</strong> paragraphs in review</span></div>
        <div><Clock3 size={19} /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div>
        <div><CheckCircle2 size={19} /><span><strong>{hydrated ? 'Saved locally' : 'Loading'}</strong> draft and progress</span></div>
      </div>

      <nav className={styles.levelRail} aria-label="Skimming progress levels">
        {SKIMMING_LEVELS.map((item, index) => {
          const locked = index > progress.unlockedLevel;
          const record = progress.levels[item.id];
          return (
            <button
              key={item.id}
              type="button"
              disabled={locked}
              aria-current={index === levelIndex ? 'step' : undefined}
              className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''}
              onClick={() => switchLevel(index)}
            >
              <span>{locked ? <LockKeyhole size={14} /> : index + 1}</span>
              <b>{item.title}</b>
              <small>{record ? `Best ${record.bestScore}/${index < 2 ? 4 : 5}` : locked ? 'Locked' : 'Ready'}</small>
            </button>
          );
        })}
      </nav>

      <div className={styles.enginePanel}>
        <header className={styles.levelHeader}>
          <div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div>
          <div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div>
        </header>

        <div className={styles.engineQuestions}>
          {questions.map(({ passage, paragraph }, index) => {
            const selected = answers[paragraph.id] ?? '';
            const correct = selected === paragraph.id;
            const options = getSkimmingFunctionOptionIds(passage, paragraph, attemptSeed, fullPassage);
            return (
              <article className={styles.engineQuestion} key={paragraph.id}>
                <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title} · {paragraph.label}</small></div>
                <p>{paragraph.text}</p>
                <FunctionOptions
                  passage={passage}
                  optionIds={options}
                  selected={selected}
                  disabled={submitted}
                  label={`Writer action for ${passage.title}, ${paragraph.label}`}
                  onSelect={(optionId) => {
                    setAnswers((current) => ({ ...current, [paragraph.id]: optionId }));
                    setConfirmAttemptReset(false);
                  }}
                  compact
                />
                {submitted && (
                  <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                    {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <div><strong>{correct ? `${paragraph.functionLabel}: proved` : `Best map label: ${paragraph.functionLabel}`}</strong><p>{correct ? paragraph.evidence : wrongFeedback(passage, paragraph, selected)}</p></div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <footer className={styles.engineFooter} aria-live="polite">
          <div>
            {submitted
              ? <><strong>{score}/{questions.length} correct · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is a WeLearn micro-skill result, not an IELTS band or readiness score.' : `Review ${questions.length - score} map decision${questions.length - score === 1 ? '' : 's'}, then retry.`}</span></>
              : <><strong>{answered}/{questions.length} decisions complete</strong><span>Answers remain editable and saved locally until you submit the level.</span></>}
          </div>
          <div className={styles.actions}>
            <button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} /> {confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>
            {!submitted && <button type="button" className="btn btn-primary" disabled={answered !== questions.length} onClick={submitLevel}>Submit level</button>}
            {submitted && mastered && levelIndex < SKIMMING_LEVELS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Open next level</button>}
          </div>
        </footer>
      </div>

      <aside className={styles.reviewPanel} aria-label="Skimming review plan">
        <div><span className={styles.modeTag}>Review plan</span><h3>Practise the error, not the option position</h3><p>{topErrors.length ? 'Your most frequent map errors are listed below.' : 'Complete a level to build a personalised review queue.'}</p></div>
        <ul>{topErrors.length ? topErrors.map(([code, count]) => <li key={code}><strong>{count}</strong><span>{ERROR_LABELS[code]}</span></li>) : <li><strong>0</strong><span>No recorded errors yet</span></li>}</ul>
        <button type="button" className={styles.textButton} onClick={resetAll}><RotateCcw size={16} /> {confirmAllReset ? 'Press again to erase progress' : 'Reset all progress'}</button>
      </aside>

      {questions[0] && (
        <p className={styles.sourceNote}>
          <strong>Current source boundary:</strong> {questions[0].passage.sourceNote}{' '}
          <a href={questions[0].passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the primary source <span className={styles.srOnly}>(opens in a new tab)</span></a>.
        </p>
      )}
      <p className={styles.securityNote}>Guided Learn mode delivers explanations to this browser. It is not a secure Practice, Exam or proctored mode.</p>
    </section>
  );
}
