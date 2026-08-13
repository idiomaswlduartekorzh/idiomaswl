'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Link2, LockKeyhole, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  MATCHING_FEATURES_LEGACY_STORAGE_KEY,
  MATCHING_FEATURES_LEVELS,
  MATCHING_FEATURES_STORAGE_KEY,
  getMatchingFeaturesDrillFeatureIds,
  getMatchingFeaturesPassage,
  type MatchingFeaturesErrorCode,
  type MatchingFeaturesTrainingPassage,
  type MatchingFeaturesTrainingQuestion,
} from '@/data/practica-exams/ielts-reading-matching-features-progress';
import styles from './MatchingHeadingsPracticeLab.module.css';

type AnswerMap = Record<string, string>;
type LevelRecord = { attempts: number; bestScore: number; mastered: boolean };
type AttemptDraft = { answers: AnswerMap; elapsed: number; attemptSeed: number };
type StoredProgress = {
  version: 2;
  unlockedLevel: number;
  activeLevelIndex: number;
  levels: Record<string, LevelRecord>;
  errorCounts: Partial<Record<MatchingFeaturesErrorCode, number>>;
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

const ERROR_LABELS: Record<MatchingFeaturesErrorCode, string> = {
  'nearby-name': 'nearby name without the relationship',
  'shared-topic': 'shared topic instead of exact attribution',
  'wrong-actor': 'action assigned to the wrong feature',
  'wrong-result': 'feature linked to the wrong result',
  'qualifier-loss': 'limitation or qualifier removed',
  'relationship-reversal': 'timing, cause or direction reversed',
};

function nonNegativeInteger(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.trunc(parsed)) : fallback;
}

function normalizeLevels(value: unknown): Record<string, LevelRecord> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const knownIds = new Set(MATCHING_FEATURES_LEVELS.map((level) => level.id));
  return Object.fromEntries(Object.entries(value).flatMap(([id, raw]) => {
    if (!knownIds.has(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
    const record = raw as Partial<LevelRecord>;
    return [[id, {
      attempts: nonNegativeInteger(record.attempts),
      bestScore: Math.min(7, nonNegativeInteger(record.bestScore)),
      mastered: record.mastered === true,
    }]];
  }));
}

function normalizeErrorCounts(value: unknown): StoredProgress['errorCounts'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const knownCodes = new Set(Object.keys(ERROR_LABELS));
  return Object.fromEntries(Object.entries(value).flatMap(([code, count]) => (
    knownCodes.has(code) && nonNegativeInteger(count) > 0 ? [[code, nonNegativeInteger(count)]] : []
  ))) as StoredProgress['errorCounts'];
}

function normalizeDrafts(value: unknown): Record<string, AttemptDraft> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const knownIds = new Set(MATCHING_FEATURES_LEVELS.map((level) => level.id));
  return Object.fromEntries(Object.entries(value).flatMap(([id, raw]) => {
    if (!knownIds.has(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) return [];
    const draft = raw as Partial<AttemptDraft>;
    const answers = draft.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers)
      ? Object.fromEntries(Object.entries(draft.answers).filter((entry): entry is [string, string] => typeof entry[1] === 'string'))
      : {};
    return [[id, { answers, elapsed: nonNegativeInteger(draft.elapsed), attemptSeed: nonNegativeInteger(draft.attemptSeed) }]];
  }));
}

function readProgress(): StoredProgress {
  try {
    const current = window.localStorage.getItem(MATCHING_FEATURES_STORAGE_KEY);
    const legacy = window.localStorage.getItem(MATCHING_FEATURES_LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(current ?? legacy ?? 'null') as (Omit<Partial<StoredProgress>, 'version'> & { version?: number }) | null;
    if (!parsed || (parsed.version !== 1 && parsed.version !== 2)) return EMPTY_PROGRESS;
    const maxLevel = MATCHING_FEATURES_LEVELS.length - 1;
    const unlockedLevel = Math.min(maxLevel, nonNegativeInteger(parsed.unlockedLevel));
    return {
      version: 2,
      unlockedLevel,
      activeLevelIndex: Math.min(unlockedLevel, nonNegativeInteger(parsed.activeLevelIndex)),
      levels: normalizeLevels(parsed.levels),
      errorCounts: normalizeErrorCounts(parsed.errorCounts),
      reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue.filter((item): item is string => typeof item === 'string') : [],
      drafts: parsed.version === 2 ? normalizeDrafts(parsed.drafts) : {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeProgress(progress: StoredProgress) {
  try {
    window.localStorage.setItem(MATCHING_FEATURES_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The lesson remains usable if storage is unavailable.
  }
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function getFeature(passage: MatchingFeaturesTrainingPassage, featureId: string) {
  return passage.features.find((feature) => feature.id === featureId);
}

function FeatureBank({ passage }: { passage: MatchingFeaturesTrainingPassage }) {
  return (
    <aside className={styles.headingBank} aria-label={`Feature bank for ${passage.title}`}>
      <div className={styles.headingBankHeader}><span>Feature bank</span><small>Options may repeat when the task permits it</small></div>
      <ol>
        {passage.features.map((feature) => (
          <li key={feature.id}><strong>{feature.id}</strong><span><b>{feature.label}</b><br />{feature.description}</span></li>
        ))}
      </ol>
    </aside>
  );
}

function ReadingPanel({ passage }: { passage: MatchingFeaturesTrainingPassage }) {
  return (
    <div className={styles.headingBank} aria-label={`Reading passage: ${passage.passageTitle}`}>
      <div className={styles.headingBankHeader}><span>{passage.passageTitle}</span><small>Trace who does what</small></div>
      <div style={{ padding: '1rem 1.1rem', whiteSpace: 'pre-line', lineHeight: 1.78, color: 'var(--ink-2)' }}>{passage.passage}</div>
    </div>
  );
}

function FeatureOptionButtons({
  passage,
  question,
  selected,
  disabled = false,
  optionIds,
  onSelect,
  compact = false,
}: {
  passage: MatchingFeaturesTrainingPassage;
  question: MatchingFeaturesTrainingQuestion;
  selected: string;
  disabled?: boolean;
  optionIds?: string[];
  onSelect: (featureId: string) => void;
  compact?: boolean;
}) {
  const groupId = `matching-features-${useId().replace(/:/g, '')}`;
  const features = (optionIds ?? passage.features.map((feature) => feature.id))
    .map((id) => getFeature(passage, id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return (
    <fieldset className={`${styles.headingOptions} ${compact ? styles.headingOptionsCompact : ''}`}>
      <legend className={styles.srOnly}>Feature associated with: {question.statement}</legend>
      {features.map((feature) => (
        <label key={feature.id} className={selected === feature.id ? styles.headingOptionSelected : ''}>
          <input type="radio" name={groupId} value={feature.id} checked={selected === feature.id} disabled={disabled} onChange={() => onSelect(feature.id)} />
          <span className={styles.headingOptionBody}><span>{feature.id}</span><strong>{feature.label}</strong></span>
        </label>
      ))}
    </fieldset>
  );
}

export function MatchingFeaturesGuidedPractice({ passage }: { passage: MatchingFeaturesTrainingPassage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const question = passage.questions[activeIndex];
  const isCorrect = selected === question.answer;
  const finished = completed.length === passage.questions.length;

  function reset() {
    if ((selected || completed.length) && !confirmRestart) { setConfirmRestart(true); return; }
    setActiveIndex(0); setSelected(''); setChecked(false); setCompleted([]); setConfirmRestart(false);
  }

  function continuePractice() {
    if (!isCorrect) { setSelected(''); setChecked(false); setConfirmRestart(false); return; }
    const next = completed.includes(question.id) ? completed : [...completed, question.id];
    setCompleted(next);
    if (activeIndex < passage.questions.length - 1) {
      setActiveIndex((current) => current + 1); setSelected(''); setChecked(false); setConfirmRestart(false);
    }
  }

  return (
    <section className={styles.lab} aria-label="Guided matching features practice" data-active-practice="true">
      <div className={styles.labTopline}>
        <div><span className={styles.modeTag}>Watch one · attribute seven</span><h3>{passage.passageTitle}</h3></div>
        <button type="button" className={styles.textButton} onClick={reset}><RotateCcw aria-hidden="true" size={16} /> {confirmRestart ? 'Press again to restart' : 'Restart'}</button>
      </div>
      <aside className={styles.workedDecision} aria-labelledby="matching-features-worked-decision">
        <div><span className={styles.modeTag}>Worked decision</span><h4 id="matching-features-worked-decision">Build an actor–action link</h4><p>Statement: “uses farming mainly to make academic subjects easier to observe”</p></div>
        <ol>
          <li><strong>Name the action</strong><span>The feature uses a garden as an educational tool.</span></li>
          <li><strong>Reject shared topics</strong><span>Every project grows food, so “farming” cannot decide the answer.</span></li>
          <li><strong>Confirm attribution</strong><span>The school network makes biology, climate and nutrition visible in lessons.</span></li>
        </ol>
      </aside>
      <div className={styles.mapRail} role="progressbar" aria-label="Guided attribution progress" aria-valuemin={0} aria-valuemax={passage.questions.length} aria-valuenow={completed.length}>
        {passage.questions.map((item, index) => {
          const done = completed.includes(item.id);
          return <span key={item.id} className={done ? styles.mapDone : index === activeIndex ? styles.mapActive : ''}><b>{index + 1}</b><small>{done ? 'proved' : index === activeIndex ? 'active' : 'next'}</small></span>;
        })}
      </div>
      {finished ? (
        <div className={styles.completionCard} role="status"><CheckCircle2 aria-hidden="true" size={28} /><div><h3>Attribution map complete</h3><p>You proved every feature link. Continue to the held-back independent passage.</p></div></div>
      ) : (
        <div className={styles.practiceSplit}>
          <div className={styles.passagePanel}><ReadingPanel passage={passage} /></div>
          <div className={styles.decisionPanel}>
            <FeatureBank passage={passage} />
            <p className={styles.panelLabel}>Statement {activeIndex + 1}</p>
            <div className={styles.quoteBlock}><p>{question.statement}</p></div>
            <div className={styles.methodPrompt}><strong>Decision rule</strong><span>Match actor + action + result.</span><span>A nearby name or shared topic is not enough.</span></div>
            <FeatureOptionButtons passage={passage} question={question} selected={selected} disabled={checked} onSelect={(id) => { setSelected(id); setConfirmRestart(false); }} />
            {checked && (
              <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
                {isCorrect ? <CheckCircle2 aria-hidden="true" size={20} /> : <XCircle aria-hidden="true" size={20} />}
                <div><strong>{isCorrect ? `${question.answer}. ${getFeature(passage, question.answer)?.label}: complete association` : 'Not yet — the relationship belongs to another feature.'}</strong><p>{isCorrect ? question.evidence : question.distractorFailure}</p></div>
              </div>
            )}
            <div className={styles.actions}><button type="button" className="btn btn-primary" disabled={!selected} onClick={() => checked ? continuePractice() : setChecked(true)}>{checked ? (isCorrect ? <>Add to attribution map <ArrowRight aria-hidden="true" size={16} /></> : 'Try this statement again') : 'Check association'}</button></div>
          </div>
        </div>
      )}
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>
    </section>
  );
}

export function MatchingFeaturesIndependentPractice({ passage }: { passage: MatchingFeaturesTrainingPassage }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = passage.questions.filter((question) => answers[question.id]).length;
  const score = passage.questions.filter((question) => answers[question.id] === question.answer).length;
  return (
    <section className={styles.lab} aria-label="Independent matching features practice" data-active-practice="true">
      <div className={styles.labTopline}><div><span className={styles.modeTag}>Now you do the full set</span><h3>{passage.passageTitle}</h3><p>Feedback remains closed until all {passage.questions.length} associations are submitted.</p></div><span className={styles.counter} aria-live="polite">{answered}/{passage.questions.length} linked</span></div>
      <div className={styles.practiceSplit}><div className={styles.passagePanel}><ReadingPanel passage={passage} /></div><div className={styles.decisionPanel}><FeatureBank passage={passage} /></div></div>
      <div className={styles.engineQuestions}>
        {passage.questions.map((question, index) => {
          const selected = answers[question.id] ?? '';
          const correct = selected === question.answer;
          return (
            <article className={styles.engineQuestion} key={question.id}>
              <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>Link one exact relationship</small></div>
              <p>{question.statement}</p>
              <div className={styles.engineChoiceControl}>
                <label className={styles.selectLabel} htmlFor={`independent-${question.id}`}>Feature for statement {index + 1}</label>
                <select id={`independent-${question.id}`} name={`independent-${question.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}>
                  <option value="">Choose a feature</option>
                  {passage.features.map((feature) => <option key={feature.id} value={feature.id}>{feature.id}. {feature.label}</option>)}
                </select>
              </div>
              {submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 aria-hidden="true" size={18} /> : <XCircle aria-hidden="true" size={18} />}<div><strong>{correct ? 'Correct' : `${question.answer}. ${getFeature(passage, question.answer)?.label}`}</strong><p>{correct ? question.evidence : question.distractorFailure}</p></div></div>}
            </article>
          );
        })}
      </div>
      <div className={styles.submitBar} aria-live="polite"><div>{submitted ? <><strong>{score}/{passage.questions.length} correct</strong><span>{score >= passage.questions.length - 1 ? 'Independent target reached.' : 'Review the failed associations, then retry.'}</span></> : <><strong>One full-set submission</strong><span>Features may be used more than once.</span></>}</div><button type="button" className="btn btn-primary" disabled={!submitted && answered !== passage.questions.length} onClick={() => { if (submitted) { setAnswers({}); setSubmitted(false); } else setSubmitted(true); }}>{submitted ? 'Try a clean set' : 'Submit all associations'}</button></div>
      <p className={styles.sourceNote}><strong>Source boundary:</strong> {passage.sourceNote} <a href={passage.sourceUrl} target="_blank" rel="noopener noreferrer">Review the candidate source <span className={styles.srOnly}>(opens in a new tab)</span></a>.</p>
    </section>
  );
}

type EngineQuestion = { passage: MatchingFeaturesTrainingPassage; question: MatchingFeaturesTrainingQuestion };

function buildLevelQuestions(levelIndex: number): EngineQuestion[] {
  const level = MATCHING_FEATURES_LEVELS[levelIndex];
  const passages = level.passageIds.map(getMatchingFeaturesPassage).filter((item): item is MatchingFeaturesTrainingPassage => Boolean(item));
  if (!level.questionIds) return passages.flatMap((passage) => passage.questions.map((question) => ({ passage, question })));
  return level.questionIds.map((questionId) => {
    const passage = passages.find((item) => item.questions.some((question) => question.id === questionId));
    const question = passage?.questions.find((item) => item.id === questionId);
    return passage && question ? { passage, question } : null;
  }).filter((item): item is EngineQuestion => Boolean(item));
}

export function MatchingFeaturesProgressEngine() {
  const [progress, setProgress] = useState<StoredProgress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [confirmAttemptReset, setConfirmAttemptReset] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => {
      const stored = readProgress();
      const restoredIndex = Math.min(stored.activeLevelIndex, stored.unlockedLevel, MATCHING_FEATURES_LEVELS.length - 1);
      const level = MATCHING_FEATURES_LEVELS[restoredIndex];
      const draft = stored.drafts[level.id];
      setProgress(stored); setLevelIndex(restoredIndex); setAnswers(draft?.answers ?? {}); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? stored.levels[level.id]?.attempts ?? 0); setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [hydrated, levelIndex, submitted]);

  const level = MATCHING_FEATURES_LEVELS[levelIndex];
  const questions = useMemo(() => buildLevelQuestions(levelIndex), [levelIndex]);
  const isFullPassage = !level.questionIds;
  const answered = questions.filter(({ question }) => answers[question.id]).length;
  const score = questions.filter(({ question }) => answers[question.id] === question.answer).length;
  const mastered = score >= level.masteryScore;
  const completedCount = MATCHING_FEATURES_LEVELS.filter((item) => progress.levels[item.id]?.mastered).length;
  const topErrors = Object.entries(progress.errorCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)).slice(0, 3) as Array<[MatchingFeaturesErrorCode, number]>;

  useEffect(() => {
    if (!hydrated || submitted) return;
    const drafts = { ...readProgress().drafts, [level.id]: { answers, elapsed, attemptSeed } };
    writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts });
    // Draft persistence tracks the active attempt rather than score updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, attemptSeed, elapsed, hydrated, level.id, levelIndex, submitted]);

  function switchLevel(nextIndex: number) {
    if (nextIndex > progress.unlockedLevel) return;
    const drafts = submitted ? readProgress().drafts : { ...readProgress().drafts, [level.id]: { answers, elapsed, attemptSeed } };
    const target = MATCHING_FEATURES_LEVELS[nextIndex];
    const draft = drafts[target.id];
    const next = { ...progress, activeLevelIndex: nextIndex, drafts };
    setProgress(next); writeProgress(next); setLevelIndex(nextIndex); setAnswers(draft?.answers ?? {}); setSubmitted(false); setElapsed(draft?.elapsed ?? 0); setAttemptSeed(draft?.attemptSeed ?? progress.levels[target.id]?.attempts ?? 0); setConfirmAttemptReset(false); setConfirmReset(false);
  }

  function submitLevel() {
    if (answered !== questions.length) return;
    setSubmitted(true);
    const previous = progress.levels[level.id] ?? { attempts: 0, bestScore: 0, mastered: false };
    const wrong = questions.filter(({ question }) => answers[question.id] !== question.answer);
    const errorCounts = { ...progress.errorCounts };
    for (const { question } of wrong) errorCounts[question.errorCode] = (errorCounts[question.errorCode] ?? 0) + 1;
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    const next: StoredProgress = {
      version: 2,
      unlockedLevel: mastered ? Math.max(progress.unlockedLevel, Math.min(MATCHING_FEATURES_LEVELS.length - 1, levelIndex + 1)) : progress.unlockedLevel,
      activeLevelIndex: levelIndex,
      levels: { ...progress.levels, [level.id]: { attempts: previous.attempts + 1, bestScore: Math.max(previous.bestScore, score), mastered: previous.mastered || mastered } },
      errorCounts,
      reviewQueue: Array.from(new Set([...progress.reviewQueue, ...wrong.map(({ question }) => question.id)])).filter((id) => !questions.some(({ question }) => question.id === id && answers[id] === question.answer)),
      drafts,
    };
    setProgress(next); writeProgress(next);
  }

  function resetAttempt() {
    if ((answered || elapsed || submitted) && !confirmAttemptReset) { setConfirmAttemptReset(true); return; }
    const drafts = { ...readProgress().drafts }; delete drafts[level.id];
    setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed((current) => current + 1); setConfirmAttemptReset(false); writeProgress({ ...progress, activeLevelIndex: levelIndex, drafts });
  }

  function resetAllProgress() {
    if (!confirmReset) { setConfirmReset(true); return; }
    setProgress(EMPTY_PROGRESS); writeProgress(EMPTY_PROGRESS); setLevelIndex(0); setAnswers({}); setSubmitted(false); setElapsed(0); setAttemptSeed(0); setConfirmAttemptReset(false); setConfirmReset(false);
  }

  return (
    <section className={styles.engine} aria-labelledby="matching-features-engine-title" data-active-practice="true">
      <div className={styles.engineHeading}><div><span className={styles.modeTag}>WeLearn Progress Engine</span><h2 id="matching-features-engine-title">Build attribution control across six levels</h2><p>Two relationship drills lead into four complete feature maps. Drafts, elapsed time, errors and unlocked levels stay on this device.</p></div><div className={styles.engineScore}><strong>{completedCount}/6</strong><span>levels mastered</span></div></div>
      <div className={styles.dashboard}><div><Target aria-hidden="true" size={19} /><span><strong>{progress.reviewQueue.length}</strong> links in review</span></div><div><Clock3 aria-hidden="true" size={19} /><span><strong>{formatTime(elapsed)}</strong> current attempt</span></div><div><CheckCircle2 aria-hidden="true" size={19} /><span><strong>{hydrated ? 'Saved locally' : 'Loading…'}</strong> attempt and progress</span></div></div>
      <nav className={styles.levelRail} aria-label="Matching Features progress levels">
        {MATCHING_FEATURES_LEVELS.map((item, index) => {
          const locked = index > progress.unlockedLevel;
          const record = progress.levels[item.id];
          const questionCount = buildLevelQuestions(index).length;
          return <button key={item.id} type="button" disabled={locked} aria-current={index === levelIndex ? 'step' : undefined} className={index === levelIndex ? styles.levelCurrent : record?.mastered ? styles.levelMastered : ''} onClick={() => switchLevel(index)}><span>{locked ? <LockKeyhole aria-hidden="true" size={14} /> : index + 1}</span><b>{item.title}</b><small>{record ? `Best ${record.bestScore}/${questionCount}` : locked ? 'Locked' : 'Ready'}</small></button>;
        })}
      </nav>
      <div className={styles.enginePanel}>
        <header className={styles.levelHeader}><div><span>Level {levelIndex + 1} of 6 · {level.focus}</span><h3>{level.title}</h3><p>{level.instruction}</p></div><div className={styles.levelTarget}><strong>{level.masteryScore}/{questions.length}</strong><span>to master</span></div></header>
        {isFullPassage && questions[0] && <div className={styles.practiceSplit}><div className={styles.passagePanel}><ReadingPanel passage={questions[0].passage} /></div><div className={styles.decisionPanel}><FeatureBank passage={questions[0].passage} /></div></div>}
        <div className={styles.engineQuestions}>
          {questions.map(({ passage, question }, index) => {
            const selected = answers[question.id] ?? '';
            const correct = selected === question.answer;
            const options = getMatchingFeaturesDrillFeatureIds(passage, question, attemptSeed);
            return (
              <article className={styles.engineQuestion} key={question.id}>
                <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{passage.title}</small></div>
                <p>{question.statement}</p>
                {!isFullPassage && <details className={styles.engineChoiceControl}><summary className={styles.textButton}>Open passage and feature bank</summary><ReadingPanel passage={passage} /><FeatureBank passage={passage} /></details>}
                {isFullPassage ? (
                  <div className={styles.engineChoiceControl}><label className={styles.selectLabel} htmlFor={`engine-${level.id}-${question.id}`}>Feature associated with this statement</label><select id={`engine-${level.id}-${question.id}`} name={`engine-${level.id}-${question.id}`} value={selected} disabled={submitted} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}><option value="">Choose a feature</option>{passage.features.map((feature) => <option key={feature.id} value={feature.id}>{feature.id}. {feature.label}</option>)}</select></div>
                ) : (
                  <FeatureOptionButtons passage={passage} question={question} selected={selected} disabled={submitted} optionIds={options} onSelect={(id) => { setAnswers((current) => ({ ...current, [question.id]: id })); setConfirmAttemptReset(false); }} compact />
                )}
                {submitted && <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">{correct ? <CheckCircle2 aria-hidden="true" size={18} /> : <XCircle aria-hidden="true" size={18} />}<div><strong>{correct ? `${question.answer}. ${getFeature(passage, question.answer)?.label}: proved` : `${question.answer}. ${getFeature(passage, question.answer)?.label}`}</strong><p>{correct ? question.evidence : question.distractorFailure}</p></div></div>}
              </article>
            );
          })}
        </div>
        <footer className={styles.engineFooter} aria-live="polite"><div>{submitted ? <><strong>{score}/{questions.length} correct · {mastered ? 'Skill level mastered' : 'Target not reached yet'}</strong><span>{mastered ? 'The next level is available. This is not an IELTS band or exam-readiness score.' : `Review ${questions.length - score} association${questions.length - score === 1 ? '' : 's'} and try a clean attempt.`}</span></> : <><strong>{answered}/{questions.length} associations complete</strong><span>Choices remain editable and saved locally until submission.</span></>}</div><div className={styles.actions}><button type="button" className="btn btn-ghost" onClick={resetAttempt}><RotateCcw aria-hidden="true" size={16} /> {confirmAttemptReset ? 'Press again to reset' : 'Reset attempt'}</button>{submitted && mastered && levelIndex < MATCHING_FEATURES_LEVELS.length - 1 ? <button type="button" className="btn btn-primary" onClick={() => switchLevel(levelIndex + 1)}>Next level <ArrowRight aria-hidden="true" size={16} /></button> : <button type="button" className="btn btn-primary" disabled={submitted || answered !== questions.length} onClick={submitLevel}>Submit level</button>}</div></footer>
      </div>
      <div className={styles.reviewPanel}><div><span className={styles.modeTag}>Error profile</span><h3>{topErrors.length ? 'Your most frequent attribution traps' : 'Your error profile starts after the first attempt'}</h3>{topErrors.length ? <ul>{topErrors.map(([code, count]) => <li key={code}><span>{ERROR_LABELS[code]}</span><strong>{count}</strong></li>)}</ul> : <p>The engine records why an association failed, so review has a specific target.</p>}</div><button type="button" className={styles.textButton} onClick={resetAllProgress}>{confirmReset ? 'Press again to erase all saved progress' : 'Reset saved progress'}</button></div>
      <p className={styles.securityNote}><Link2 aria-hidden="true" size={15} /> Training mode only: answer keys and explanations are delivered to the browser for feedback. This is not a secure Exam or proctored mode.</p>
    </section>
  );
}
