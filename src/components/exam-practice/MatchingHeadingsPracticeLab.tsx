'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  MATCHING_HEADINGS_LEVELS,
  MATCHING_HEADINGS_STORAGE_KEY,
  getMatchingHeadingsPassage,
  type MatchingHeadingsErrorCode,
  type MatchingHeadingsParagraph,
  type MatchingHeadingsTrainingPassage,
} from '@/data/practica-exams/ielts-reading-matching-headings-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type StoredProgress = {
  version: 1;
  unlockedLevel: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<MatchingHeadingsErrorCode, number>>;
  reviewQueue: string[];
};

const EMPTY_PROGRESS: StoredProgress = {
  version: 1,
  unlockedLevel: 0,
  levels: {},
  errorCounts: {},
  reviewQueue: [],
};

const ERROR_LABELS: Record<MatchingHeadingsErrorCode, string> = {
  'detail-not-main-idea': 'detail instead of main idea',
  'keyword-match': 'keyword match',
  'wrong-paragraph-function': 'wrong paragraph function',
  'too-broad': 'heading too broad',
  'unsupported-claim': 'unsupported claim',
};

function getHeading(passage: MatchingHeadingsTrainingPassage, id: string) {
  return passage.headings.find((heading) => heading.id === id);
}

function wrongAnswerFeedback(paragraph: MatchingHeadingsParagraph, selected: string) {
  return selected === paragraph.closestDistractorId
    ? paragraph.distractorFailure
    : `This option does not cover the paragraph's complete ${paragraph.functionLabel.toLowerCase()} job. Compare the opening, development and final sentence.`;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function readProgress(): StoredProgress {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MATCHING_HEADINGS_STORAGE_KEY) ?? 'null') as Partial<StoredProgress> | null;
    if (!parsed || parsed.version !== 1) return EMPTY_PROGRESS;
    return {
      version: 1,
      unlockedLevel: Math.min(7, Math.max(0, Number(parsed.unlockedLevel) || 0)),
      levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
      errorCounts: parsed.errorCounts && typeof parsed.errorCounts === 'object' ? parsed.errorCounts : {},
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: StoredProgress) {
  try {
    window.localStorage.setItem(MATCHING_HEADINGS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Practice remains usable when storage is unavailable.
  }
}

function PassageHeadings({ passage }: { passage: MatchingHeadingsTrainingPassage }) {
  return (
    <aside className={styles.headingBank} aria-label={`Heading bank for ${passage.title}`}>
      <div className={styles.headingBankHeader}>
        <span>Heading bank</span>
        <small>{passage.headings.length - passage.paragraphs.length} will not be used</small>
      </div>
      <ol>
        {passage.headings.map((heading) => (
          <li key={heading.id}><strong>{heading.id}</strong><span>{heading.text}</span></li>
        ))}
      </ol>
    </aside>
  );
}

function HeadingOptionButtons({
  headings,
  selected,
  disabled = false,
  disabledIds = new Set<string>(),
  label,
  onSelect,
  compact = false,
}: {
  headings: MatchingHeadingsTrainingPassage['headings'];
  selected: string;
  disabled?: boolean;
  disabledIds?: Set<string>;
  label: string;
  onSelect: (headingId: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`${styles.headingOptions} ${compact ? styles.headingOptionsCompact : ''}`} role="radiogroup" aria-label={label}>
      {headings.map((heading) => {
        const unavailable = disabledIds.has(heading.id) && selected !== heading.id;
        return (
          <button
            key={heading.id}
            type="button"
            role="radio"
            aria-checked={selected === heading.id}
            disabled={disabled || unavailable}
            className={selected === heading.id ? styles.headingOptionSelected : ''}
            onClick={() => onSelect(heading.id)}
          >
            <span>{heading.id}</span>
            <strong>{heading.text}</strong>
            {unavailable && <small>Used</small>}
          </button>
        );
      })}
    </div>
  );
}

export function MatchingHeadingsGuidedPractice({ passage }: { passage: MatchingHeadingsTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const paragraph = passage.paragraphs[activeIndex];
  const isCorrect = selected === paragraph.answerHeadingId;

  function reset() {
    setActiveIndex(0);
    setSelected('');
    setChecked(false);
    setCompleted([]);
  }

  function continuePractice() {
    if (!isCorrect) {
      setSelected('');
      setChecked(false);
      return;
    }
    const nextCompleted = completed.includes(paragraph.id) ? completed : [...completed, paragraph.id];
    setCompleted(nextCompleted);
    if (activeIndex < passage.paragraphs.length - 1) {
      setActiveIndex((current) => current + 1);
      setSelected('');
      setChecked(false);
    }
  }

  const finished = completed.length === passage.paragraphs.length;

  return (
    <section className={styles.lab} aria-label="Guided matching headings practice">
      <div className={styles.labTopline}>
        <div><span className={styles.modeTag}>Watch one · do five</span><h3>{passage.title}</h3></div>
        <button type="button" className={styles.textButton} onClick={reset}><RotateCcw size={16} /> Restart</button>
      </div>

      <div className={styles.mapRail} role="progressbar" aria-label="Guided paragraph map" aria-valuemin={0} aria-valuemax={passage.paragraphs.length} aria-valuenow={completed.length}>
        {passage.paragraphs.map((item, index) => {
          const done = completed.includes(item.id);
          return <span key={item.id} className={done ? styles.mapDone : index === activeIndex ? styles.mapActive : ''}><b>{String.fromCharCode(65 + index)}</b><small>{done ? 'proved' : index === activeIndex ? 'active' : 'next'}</small></span>;
        })}
      </div>

      {finished ? (
        <div className={styles.completionCard} role="status">
          <CheckCircle2 size={28} />
          <div><h3>Paragraph map complete</h3><p>You proved all five headings. Continue to the independent passage, where feedback stays closed until the whole set is submitted.</p></div>
        </div>
      ) : (
        <div className={styles.practiceSplit}>
          <div className={styles.passagePanel}>
            <p className={styles.panelLabel}>{paragraph.label} · {paragraph.functionLabel}</p>
            <p>{paragraph.text}</p>
            <div className={styles.methodPrompt}><strong>Your two-step decision</strong><span>1. Name the paragraph’s job.</span><span>2. Test whether one heading covers every sentence.</span></div>
          </div>
          <div className={styles.decisionPanel}>
            <div className={styles.clickableHeadingBank}>
              <div className={styles.headingBankHeader}>
                <span>Choose the best heading</span>
                <small>{passage.headings.length - passage.paragraphs.length} will not be used</small>
              </div>
              <HeadingOptionButtons
                headings={passage.headings}
                selected={selected}
                disabled={checked}
                label={`Best heading for ${paragraph.label}`}
                onSelect={setSelected}
              />
            </div>
            {checked && (
              <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                <div>
                  <strong>{isCorrect ? 'Correct — the whole paragraph is covered.' : 'Not yet — compare function and coverage.'}</strong>
                  <p>{isCorrect ? paragraph.evidence : wrongAnswerFeedback(paragraph, selected)}</p>
                </div>
              </div>
            )}
            <div className={styles.actions}>
              <button type="button" className="btn btn-primary" disabled={!selected} onClick={() => checked ? continuePractice() : setChecked(true)}>
                {checked ? (isCorrect ? <>Add to map <ArrowRight size={16} /></> : 'Try this paragraph again') : 'Check decision'}
              </button>
            </div>
          </div>
        </div>
      )}
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl}>Review the primary source</a>.</p>
    </section>
  );
}

export function MatchingHeadingsIndependentPractice({ passage }: { passage: MatchingHeadingsTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const score = passage.paragraphs.filter((paragraph) => answers[paragraph.id] === paragraph.answerHeadingId).length;
  const answered = passage.paragraphs.filter((paragraph) => answers[paragraph.id]).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className={styles.lab} aria-label="Independent matching headings practice">
      <div className={styles.labTopline}>
        <div><span className={styles.modeTag}>Now you do the full set</span><h3>{passage.title}</h3><p>Feedback remains closed until all five headings are submitted.</p></div>
        <span className={styles.counter} aria-live="polite">{answered}/5 mapped</span>
      </div>
      <PassageHeadings passage={passage} />
      <div className={styles.independentGrid}>
        {passage.paragraphs.map((paragraph) => {
          const selected = answers[paragraph.id] ?? '';
          const correct = selected === paragraph.answerHeadingId;
          const usedElsewhere = new Set(
            Object.entries(answers)
              .filter(([paragraphId]) => paragraphId !== paragraph.id)
              .map(([, headingId]) => headingId),
          );
          return (
            <article key={paragraph.id} className={styles.independentCard}>
              <p className={styles.panelLabel}>{paragraph.label}</p>
              <p>{paragraph.text}</p>
              <label className={styles.selectLabel} htmlFor={`independent-${paragraph.id}`}>Heading for {paragraph.label}</label>
              <select id={`independent-${paragraph.id}`} name={`independent-${paragraph.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [paragraph.id]: event.target.value }))}>
                <option value="">Choose a heading</option>
                {passage.headings.map((heading) => (
                  <option key={heading.id} value={heading.id} disabled={usedElsewhere.has(heading.id)}>
                    {heading.id}. {heading.text}
                  </option>
                ))}
              </select>
              {submitted && (
                <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                  {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <div><strong>{correct ? 'Correct' : `Best heading: ${paragraph.answerHeadingId}. ${getHeading(passage, paragraph.answerHeadingId)?.text}`}</strong><p>{correct ? paragraph.evidence : wrongAnswerFeedback(paragraph, selected)}</p></div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className={styles.submitBar} aria-live="polite">
        <div>{submitted ? <><strong>{score}/5 correct</strong><span>{score >= 4 ? 'Independent target reached.' : 'Review the failed heading reasons, then retry the set.'}</span></> : <><strong>One submission</strong><span>Use each heading once and leave two unused.</span></>}</div>
        <button type="button" className="btn btn-primary" disabled={!submitted && answered !== passage.paragraphs.length} onClick={() => submitted ? reset() : setSubmitted(true)}>{submitted ? 'Try a clean set' : 'Submit all headings'}</button>
      </div>
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl}>Review the primary source</a>.</p>
    </section>
  );
}

type EngineQuestion = { passage: MatchingHeadingsTrainingPassage; paragraph: MatchingHeadingsParagraph };

function buildLevelQuestions(levelIndex: number): EngineQuestion[] {
  const level = MATCHING_HEADINGS_LEVELS[levelIndex];
  const passages = level.passageIds.map(getMatchingHeadingsPassage).filter((item): item is MatchingHeadingsTrainingPassage => Boolean(item));
  if (!level.questionIds) return passages.flatMap((passage) => passage.paragraphs.map((paragraph) => ({ passage, paragraph })));
  return level.questionIds.map((questionId) => {
    const passage = passages.find((item) => item.paragraphs.some((paragraph) => paragraph.id === questionId));
    const paragraph = passage?.paragraphs.find((item) => item.id === questionId);
    return passage && paragraph ? { passage, paragraph } : null;
  }).filter((item): item is EngineQuestion => Boolean(item));
}

function mixedOptions(passage: MatchingHeadingsTrainingPassage, paragraph: MatchingHeadingsParagraph) {
  const wanted = [paragraph.answerHeadingId, paragraph.closestDistractorId];
  for (const heading of passage.headings) {
    if (!wanted.includes(heading.id)) wanted.push(heading.id);
    if (wanted.length === 4) break;
  }
  return wanted.map((id) => getHeading(passage, id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export function MatchingHeadingsProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const hydrationTask = window.setTimeout(() => {
      const stored = readProgress();
      setProgress(stored);
      setLevelIndex(Math.min(stored.unlockedLevel, 7));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrationTask);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, levelIndex, submitted]);

  const level = MATCHING_HEADINGS_LEVELS[levelIndex];
  const questions = useMemo(() => buildLevelQuestions(levelIndex), [levelIndex]);
  const isFullPassage = !level.questionIds;
  const answered = questions.filter(({ paragraph }) => answers[paragraph.id]).length;
  const score = questions.filter(({ paragraph }) => answers[paragraph.id] === paragraph.answerHeadingId).length;
  const mastered = score >= level.masteryScore;
  const completedCount = MATCHING_HEADINGS_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts)
    .sort(([, countA], [, countB]) => (countB ?? 0) - (countA ?? 0))
    .slice(0, 3) as Array<[MatchingHeadingsErrorCode, number]>;

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    setLevelIndex(nextIndex);
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
    setConfirmReset(false);
  }

  function submitLevel() {
    if (answered !== questions.length) return;
    setSubmitted(true);
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false };
    const wrong = questions.filter(({ paragraph }) => answers[paragraph.id] !== paragraph.answerHeadingId);
    const nextErrors = { ...progress.errorCounts };
    for (const { paragraph } of wrong) nextErrors[paragraph.errorCode] = (nextErrors[paragraph.errorCode] ?? 0) + 1;
    const next: StoredProgress = {
      version: 1,
      unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(7, levelIndex + 1)) : progress.unlockedLevel,
      levels: {
        ...progress.levels,
        [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered },
      },
      errorCounts: nextErrors,
      reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ paragraph }) => paragraph.id)])).filter((id) => !questions.some(({ paragraph }) => paragraph.id === id && answers[id] === paragraph.answerHeadingId)),
    };
    setProgress(next);
    writeProgress(next);
  }

  function resetAttempt() {
    setAnswers({});
    setSubmitted(false);
    setElapsed(0);
  }

  function resetAllProgress() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setProgress(EMPTY_PROGRESS);
    writeProgress(EMPTY_PROGRESS);
    switchLevel(0);
  }

  return (
    <section className={styles.engine} aria-labelledby="matching-headings-engine-title">
      <div className={styles.engineHeading}>
        <div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="matching-headings-engine-title">Build heading control across eight levels</h2><p>Recognition levels are followed by four complete passages. Your best scores, review queue and unlocked level stay on this device.</p></div>
        <div className={styles.engineScore}><strong>{completedCount}/8</strong><span>levels mastered</span></div>
      </div>

      <div className={styles.dashboard}>
        <div><Target size={19} /><span><strong>{progress.reviewQueue.length}</strong> paragraphs in review</span></div>
        <div><Clock3 size={19} /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div>
        <div><CheckCircle2 size={19} /><span><strong>{hydrated ? 'Saved' : 'Loading'}</strong> local progress</span></div>
      </div>

      <nav className={styles.levelRail} aria-label="Matching Headings progress levels">
        {MATCHING_HEADINGS_LEVELS.map((item, index) => {
          const locked = index > progress.unlockedLevel;
          const record = progress.levels[item.id];
          return (
            <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}>
              <span>{locked ? <LockKeyhole size={14} /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${index < 4 ? 4 : 5}` : locked ? 'Locked' : 'Ready'}</small>
            </button>
          );
        })}
      </nav>

      <div className={styles.enginePanel}>
        <header className={styles.levelHeader}>
          <div><span>Level {levelIndex + 1} of 8 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div>
          <div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div>
        </header>

        {isFullPassage && questions[0] && <PassageHeadings passage={questions[0].passage} />}

        <div className={styles.engineQuestions}>
          {questions.map(({ passage, paragraph }, index) => {
            const selected = answers[paragraph.id] ?? '';
            const correct = selected === paragraph.answerHeadingId;
            const options = isFullPassage ? passage.headings : mixedOptions(passage, paragraph);
            const usedElsewhere = new Set(Object.entries(answers).filter(([id]) => id !== paragraph.id).map(([, value]) => value));
            return (
              <article className={styles.engineQuestion} key={paragraph.id}>
                <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title} · {paragraph.label}</small></div>
                <p>{paragraph.text}</p>
                {isFullPassage ? (
                  <div className={styles.engineChoiceControl}>
                    <label className={styles.selectLabel} htmlFor={`engine-${level.id}-${paragraph.id}`}>Best heading</label>
                    <select id={`engine-${level.id}-${paragraph.id}`} name={`engine-${level.id}-${paragraph.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [paragraph.id]: event.target.value }))}>
                      <option value="">Choose a heading</option>
                      {options.map((heading) => <option key={heading.id} value={heading.id} disabled={usedElsewhere.has(heading.id)}>{heading.id}. {heading.text}</option>)}
                    </select>
                  </div>
                ) : (
                  <HeadingOptionButtons
                    headings={options}
                    selected={selected}
                    disabled={submitted}
                    label={`Best heading for ${passage.title}, ${paragraph.label}`}
                    onSelect={(headingId) => setAnswers((current) => ({ ...current, [paragraph.id]: headingId }))}
                    compact
                  />
                )}
                {submitted && (
                  <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                    {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <div><strong>{correct ? `${paragraph.functionLabel}: proved` : `Best heading: ${paragraph.answerHeadingId}. ${getHeading(passage, paragraph.answerHeadingId)?.text}`}</strong><p>{correct ? paragraph.evidence : wrongAnswerFeedback(paragraph, selected)}</p></div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <footer className={styles.engineFooter} aria-live="polite">
          <div>
            {submitted ? <><strong>{score}/{questions.length} correct · {mastered ? 'Level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is now available.' : `Review ${questions.length - score} decision${questions.length - score === 1 ? '' : 's'} and try a clean attempt.`}</span></> : <><strong>{answered}/{questions.length} decisions complete</strong><span>Answers stay editable until you submit the level.</span></>}
          </div>
          <div className={styles.actions}>
            <button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw size={16} /> Reset attempt</button>
            {submitted && mastered && levelIndex < 7 ? <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Next level <ArrowRight size={16} /></button> : <button type="button" className="btn btn-primary" disabled={submitted || answered !== questions.length} onClick={submitLevel}>Submit level</button>}
          </div>
        </footer>
      </div>

      <div className={styles.reviewPanel}>
        <div><span className={styles.modeTag}>Error profile</span><h3>{topErrors.length ? 'Your most frequent heading traps' : 'Your error profile starts after the first attempt'}</h3>
          {topErrors.length ? <ul>{topErrors.map(([code, count]) => <li key={code}><span>{ERROR_LABELS[code]}</span><strong>{count}</strong></li>)}</ul> : <p>The engine counts reasoning errors, not just wrong answers, so your review has a specific target.</p>}
        </div>
        <button type="button" className={styles.textButton} onClick={resetAllProgress}>{confirmReset ? 'Press again to erase all saved progress' : 'Reset saved progress'}</button>
      </div>
      <p className={styles.securityNote}>Training mode only: answer keys and explanations are delivered to the browser for feedback. This engine does not claim an IELTS band score and must not be used as a secure exam.</p>
    </section>
  );
}
