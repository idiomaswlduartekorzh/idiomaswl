'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  Gauge,
  Play,
  RotateCcw,
  Target,
  Timer,
  XCircle,
  Zap,
} from 'lucide-react';
import {
  DIAGNOSTIC_QUESTIONS,
  ICFES_LEVELS,
  ICFES_SKILL_GUIDES,
  ICFES_SKILL_LABELS,
  ICFES_SMART_BANK_SUMMARY,
  ICFES_SMART_QUESTIONS,
  type IcfesSmartLevel,
  type IcfesSmartQuestion,
  type IcfesSmartSkill,
} from '@/data/icfes-smart-route';

const STORAGE_KEY = 'wl_icfes_smart_route_progress_v1';

type PracticeMode = 'diagnostic' | 'level' | 'bridge';
type RouteView = 'welcome' | 'question' | 'reinforcement' | 'diagnostic-result' | 'report';
type LevelStatus = 'Avanza' | 'Avanza con refuerzo' | 'Repetir/expandir nivel';
type PaceSignal = 'rush' | 'speed' | 'guided' | null;

interface Attempt {
  questionId: string;
  level: IcfesSmartLevel;
  skill: IcfesSmartSkill;
  subskill: string;
  mode: PracticeMode | 'reinforcement';
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
  elapsedSeconds: number;
  at: number;
}

interface SkillAccuracy {
  correct: number;
  total: number;
  pct: number;
}

interface LevelReport {
  id: string;
  level: IcfesSmartLevel;
  percentage: number;
  averageSeconds: number;
  answered: number;
  skillAccuracy: Partial<Record<IcfesSmartSkill, SkillAccuracy>>;
  strengths: IcfesSmartSkill[];
  weaknesses: IcfesSmartSkill[];
  recommendation: string;
  status: LevelStatus;
  accelerated: boolean;
  createdAt: number;
}

interface DiagnosticResult {
  assignedLevel: IcfesSmartLevel;
  percentage: number;
  averageSeconds: number;
  strengths: IcfesSmartSkill[];
  weaknesses: IcfesSmartSkill[];
}

interface ProgressState {
  diagnosticCompleted: boolean;
  assignedLevel: IcfesSmartLevel | null;
  currentLevel: IcfesSmartLevel;
  answeredQuestionIds: string[];
  attempts: Attempt[];
  errorBySkill: Partial<Record<IcfesSmartSkill, number>>;
  strengths: IcfesSmartSkill[];
  weaknesses: IcfesSmartSkill[];
  reports: LevelReport[];
  streak: number;
  updatedAt: number;
}

interface FeedbackState {
  correct: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  wrongExplanation?: string;
  elapsedSeconds: number;
  paceSignal: PaceSignal;
}

interface IcfesSmartRouteProps {
  onBack?: () => void;
}

const cardStyle: CSSProperties = {
  border: '1px solid var(--line-soft)',
  borderRadius: 18,
  background: 'var(--bg)',
  boxShadow: '0 16px 45px rgba(20,33,92,0.06)',
};

function clampLevel(value: number): IcfesSmartLevel {
  return Math.max(0, Math.min(5, Math.round(value))) as IcfesSmartLevel;
}

function createInitialProgress(): ProgressState {
  return {
    diagnosticCompleted: false,
    assignedLevel: null,
    currentLevel: 0,
    answeredQuestionIds: [],
    attempts: [],
    errorBySkill: {},
    strengths: [],
    weaknesses: [],
    reports: [],
    streak: 0,
    updatedAt: Date.now(),
  };
}

function normalizeProgress(value: unknown): ProgressState {
  if (!value || typeof value !== 'object') return createInitialProgress();
  const raw = value as Partial<ProgressState>;
  const initial = createInitialProgress();

  return {
    diagnosticCompleted: Boolean(raw.diagnosticCompleted),
    assignedLevel: typeof raw.assignedLevel === 'number' ? clampLevel(raw.assignedLevel) : null,
    currentLevel: typeof raw.currentLevel === 'number' ? clampLevel(raw.currentLevel) : 0,
    answeredQuestionIds: Array.isArray(raw.answeredQuestionIds) ? raw.answeredQuestionIds.filter((id): id is string => typeof id === 'string') : [],
    attempts: Array.isArray(raw.attempts) ? (raw.attempts as Attempt[]) : [],
    errorBySkill: raw.errorBySkill ?? {},
    strengths: Array.isArray(raw.strengths) ? (raw.strengths as IcfesSmartSkill[]) : [],
    weaknesses: Array.isArray(raw.weaknesses) ? (raw.weaknesses as IcfesSmartSkill[]) : [],
    reports: Array.isArray(raw.reports) ? (raw.reports as LevelReport[]) : [],
    streak: typeof raw.streak === 'number' ? raw.streak : initial.streak,
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : Date.now(),
  };
}

function getSkillAccuracy(attempts: Attempt[]): Partial<Record<IcfesSmartSkill, SkillAccuracy>> {
  const stats: Partial<Record<IcfesSmartSkill, { correct: number; total: number }>> = {};

  for (const attempt of attempts) {
    const current = stats[attempt.skill] ?? { correct: 0, total: 0 };
    stats[attempt.skill] = {
      correct: current.correct + (attempt.correct ? 1 : 0),
      total: current.total + 1,
    };
  }

  return Object.fromEntries(
    Object.entries(stats).map(([skill, value]) => [
      skill,
      {
        correct: value.correct,
        total: value.total,
        pct: value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0,
      },
    ])
  ) as Partial<Record<IcfesSmartSkill, SkillAccuracy>>;
}

function deriveSkillLists(attempts: Attempt[]) {
  const accuracy = getSkillAccuracy(attempts);
  const entries = Object.entries(accuracy) as [IcfesSmartSkill, SkillAccuracy][];
  const strengths = entries
    .filter(([, value]) => value.total >= 2 && value.pct >= 80)
    .sort((a, b) => b[1].pct - a[1].pct)
    .map(([skill]) => skill);
  const weaknesses = entries
    .filter(([, value]) => value.total >= 2 && value.pct < 70)
    .sort((a, b) => a[1].pct - b[1].pct)
    .map(([skill]) => skill);

  return { strengths, weaknesses, accuracy };
}

function getPreferredWeakSkills(progress: ProgressState, fallback: IcfesSmartSkill[] = []): IcfesSmartSkill[] {
  const byError = Object.entries(progress.errorBySkill)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .map(([skill]) => skill as IcfesSmartSkill);

  return Array.from(new Set([...fallback, ...progress.weaknesses, ...byError])).slice(0, 4);
}

function selectQuestionsForLevel(
  level: IcfesSmartLevel,
  progress: ProgressState,
  count: number,
  preferredSkills: IcfesSmartSkill[] = []
): IcfesSmartQuestion[] {
  const answered = new Set(progress.answeredQuestionIds);
  const pool = ICFES_SMART_QUESTIONS.filter((question) => question.level === level);
  const sorted = [...pool].sort((a, b) => {
    const aPreferred = preferredSkills.includes(a.skill) ? 0 : 1;
    const bPreferred = preferredSkills.includes(b.skill) ? 0 : 1;
    const aAnswered = answered.has(a.id) ? 1 : 0;
    const bAnswered = answered.has(b.id) ? 1 : 0;
    return aPreferred - bPreferred || aAnswered - bAnswered || a.difficulty - b.difficulty || a.id.localeCompare(b.id);
  });

  return sorted.slice(0, count);
}

function selectReinforcementQuestions(
  skill: IcfesSmartSkill,
  level: IcfesSmartLevel,
  progress: ProgressState,
  count: number,
  excludeIds: string[] = []
): IcfesSmartQuestion[] {
  const excluded = new Set([...progress.answeredQuestionIds, ...excludeIds]);
  const nearLevels = [level, clampLevel(level - 1), clampLevel(level + 1)];
  const sameSkill = ICFES_SMART_QUESTIONS.filter(
    (question) => nearLevels.includes(question.level) && question.skill === skill && !excluded.has(question.id)
  );
  const sameLevel = ICFES_SMART_QUESTIONS.filter(
    (question) => question.level === level && !excluded.has(question.id) && !sameSkill.some((item) => item.id === question.id)
  );

  return [...sameSkill, ...sameLevel].slice(0, count);
}

function buildLevelReport(level: IcfesSmartLevel, attempts: Attempt[]): LevelReport {
  const total = attempts.length || 1;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const percentage = Math.round((correct / total) * 100);
  const averageSeconds = Math.round(attempts.reduce((sum, attempt) => sum + attempt.elapsedSeconds, 0) / total);
  const { strengths, weaknesses, accuracy } = deriveSkillLists(attempts);
  const targetSeconds = ICFES_LEVELS[level].targetTimeSeconds;
  const accelerated = percentage >= 85 && averageSeconds <= targetSeconds;
  const status: LevelStatus = accelerated || percentage >= 85 ? 'Avanza' : percentage >= 70 ? 'Avanza con refuerzo' : 'Repetir/expandir nivel';
  const primaryWeakness = weaknesses[0];

  const recommendation =
    status === 'Avanza'
      ? accelerated
        ? 'Tu precisión y velocidad permiten ruta acelerada. Puedes saltar un bloque si mantienes control de lectura.'
        : 'Avanza al siguiente nivel y conserva la rutina de revisión de errores.'
      : status === 'Avanza con refuerzo'
        ? `Antes de avanzar, completa un refuerzo corto de ${primaryWeakness ? ICFES_SKILL_LABELS[primaryWeakness].toLowerCase() : 'la habilidad más débil'}.`
        : `Conviene expandir este nivel con práctica guiada de ${primaryWeakness ? ICFES_SKILL_LABELS[primaryWeakness].toLowerCase() : 'las habilidades débiles'} antes de continuar.`;

  return {
    id: `report-${level}-${Date.now()}`,
    level,
    percentage,
    averageSeconds,
    answered: attempts.length,
    skillAccuracy: accuracy,
    strengths,
    weaknesses,
    recommendation,
    status,
    accelerated,
    createdAt: Date.now(),
  };
}

function assignDiagnosticLevel(attempts: Attempt[]): DiagnosticResult {
  const total = attempts.length || 1;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const percentage = Math.round((correct / total) * 100);
  const averageSeconds = Math.round(attempts.reduce((sum, attempt) => sum + attempt.elapsedSeconds, 0) / total);
  const { strengths, weaknesses } = deriveSkillLists(attempts);
  const hardCorrect = attempts.filter((attempt) => attempt.correct && attempt.level >= 4).length;

  let assignedLevel: IcfesSmartLevel = 0;
  if (percentage >= 88 && averageSeconds <= 34 && hardCorrect >= 3) assignedLevel = 5;
  else if (percentage >= 78 && hardCorrect >= 2) assignedLevel = 4;
  else if (percentage >= 66) assignedLevel = 3;
  else if (percentage >= 52) assignedLevel = 2;
  else if (percentage >= 36) assignedLevel = 1;

  return {
    assignedLevel,
    percentage,
    averageSeconds,
    strengths,
    weaknesses,
  };
}

function paceSignal(question: IcfesSmartQuestion, correct: boolean, elapsedSeconds: number): PaceSignal {
  const tooFast = elapsedSeconds <= Math.max(5, Math.round(question.estimatedTimeSeconds * 0.32));
  const tooSlow = elapsedSeconds >= Math.round(question.estimatedTimeSeconds * 1.45);
  if (tooFast && !correct) return 'rush';
  if (tooSlow && correct) return 'speed';
  if (tooSlow && !correct) return 'guided';
  return null;
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

function StatPill({ icon, label, value, color = 'var(--ink)' }: { icon: ReactNode; label: string; value: string; color?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.5rem 0.75rem',
        borderRadius: 999,
        border: '1px solid var(--line-soft)',
        background: 'var(--bg-2)',
        fontSize: '0.76rem',
        fontFamily: 'var(--mono)',
        fontWeight: 700,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function SkillMeter({ skill, value, compact = false }: { skill: IcfesSmartSkill; value: SkillAccuracy; compact?: boolean }) {
  const color = value.pct >= 80 ? '#059669' : value.pct >= 70 ? '#f59e0b' : '#dc2626';
  return (
    <div style={{ minWidth: compact ? 0 : 180 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: 5 }}>
        <span style={{ fontSize: compact ? '0.72rem' : '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>
          {ICFES_SKILL_LABELS[skill]}
        </span>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, color }}>
          {value.pct}%
        </span>
      </div>
      <div style={{ height: 7, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden' }}>
        <div style={{ width: `${value.pct}%`, height: '100%', borderRadius: 999, background: color }} />
      </div>
    </div>
  );
}

function ProgressPanel({ progress, queueIndex, queueLength, mode }: {
  progress: ProgressState;
  queueIndex: number;
  queueLength: number;
  mode: PracticeMode;
}) {
  const accuracy = getSkillAccuracy(progress.attempts);
  const attemptedEntries = Object.entries(accuracy) as [IcfesSmartSkill, SkillAccuracy][];
  const currentLevel = ICFES_LEVELS[progress.currentLevel];
  const progressPct = queueLength > 0 ? Math.round((queueIndex / queueLength) * 100) : 0;

  return (
    <aside style={{ ...cardStyle, padding: '1rem', alignSelf: 'start' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '0.8rem' }}>
        <div>
          <p style={{ margin: '0 0 0.2rem', fontSize: '0.72rem', fontFamily: 'var(--mono)', color: currentLevel.color, fontWeight: 800, textTransform: 'uppercase' }}>
            {mode === 'diagnostic' ? 'Diagnóstico' : currentLevel.shortLabel}
          </p>
          <strong style={{ color: 'var(--ink)', fontSize: '0.98rem' }}>Progreso visual</strong>
        </div>
        <Target size={20} color={currentLevel.color} />
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '0.55rem' }}>
        <div style={{ width: `${progressPct}%`, height: '100%', background: currentLevel.color, borderRadius: 999 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.72rem', fontFamily: 'var(--mono)', marginBottom: '1rem' }}>
        <span>{Math.min(queueIndex + 1, queueLength)}/{queueLength || 1}</span>
        <span>{progressPct}%</span>
      </div>

      <div style={{ display: 'grid', gap: '0.65rem' }}>
        {attemptedEntries.slice(0, 5).map(([skill, value]) => (
          <SkillMeter key={skill} skill={skill} value={value} compact />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '1rem' }}>
        <div style={{ border: '1px solid rgba(5,150,105,0.18)', background: 'rgba(5,150,105,0.06)', borderRadius: 12, padding: '0.7rem' }}>
          <span style={{ display: 'block', fontSize: '0.68rem', color: '#059669', fontFamily: 'var(--mono)', fontWeight: 800 }}>Fuertes</span>
          <strong style={{ color: 'var(--ink)' }}>{progress.strengths.length}</strong>
        </div>
        <div style={{ border: '1px solid rgba(220,38,38,0.18)', background: 'rgba(220,38,38,0.06)', borderRadius: 12, padding: '0.7rem' }}>
          <span style={{ display: 'block', fontSize: '0.68rem', color: '#dc2626', fontFamily: 'var(--mono)', fontWeight: 800 }}>Débiles</span>
          <strong style={{ color: 'var(--ink)' }}>{progress.weaknesses.length}</strong>
        </div>
      </div>
    </aside>
  );
}

function FeedbackPanel({ feedback, question }: { feedback: FeedbackState; question: IcfesSmartQuestion }) {
  const color = feedback.correct ? '#059669' : '#dc2626';
  const PaceIcon = feedback.correct ? CheckCircle2 : XCircle;
  const paceMessage =
    feedback.paceSignal === 'rush'
      ? 'Respondiste muy rápido y fallaste: vuelve a leer la pista exacta antes de elegir.'
      : feedback.paceSignal === 'speed'
        ? 'Respondiste bien, pero lento: conviene practicar scanning para ganar velocidad.'
        : feedback.paceSignal === 'guided'
          ? 'La respuesta fue lenta e incorrecta: vuelve a una explicación guiada antes de seguir.'
          : null;

  return (
    <div
      style={{
        marginTop: '1rem',
        border: `1px solid ${color}33`,
        background: `${color}0d`,
        borderRadius: 14,
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <PaceIcon size={20} color={color} />
        <strong style={{ color }}>{feedback.correct ? 'Respuesta correcta' : 'Respuesta incorrecta'}</strong>
        <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '0.72rem', fontFamily: 'var(--mono)' }}>
          {feedback.elapsedSeconds}s · {ICFES_SKILL_LABELS[question.skill]}
        </span>
      </div>
      <p style={{ margin: '0 0 0.65rem', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.92rem' }}>
        {feedback.explanation}
      </p>
      {!feedback.correct && feedback.wrongExplanation && (
        <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
          Tu opción: <strong style={{ color: 'var(--ink)' }}>{feedback.selectedAnswer}</strong>. {feedback.wrongExplanation}
        </p>
      )}
      {!feedback.correct && (
        <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
          Correcta: <strong style={{ color: 'var(--ink)' }}>{feedback.correctAnswer}</strong>
        </p>
      )}
      {paceMessage && (
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start', color: '#92400e', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.24)', borderRadius: 10, padding: '0.65rem 0.75rem', fontSize: '0.82rem', lineHeight: 1.45 }}>
          <Gauge size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{paceMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function IcfesSmartRoute({ onBack }: IcfesSmartRouteProps) {
  const [progress, setProgress] = useState<ProgressState>(() => createInitialProgress());
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<RouteView>('welcome');
  const [mode, setMode] = useState<PracticeMode>('diagnostic');
  const [queue, setQueue] = useState<IcfesSmartQuestion[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [runAttempts, setRunAttempts] = useState<Attempt[]>([]);
  const [lastReport, setLastReport] = useState<LevelReport | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [reinforcementSkill, setReinforcementSkill] = useState<IcfesSmartSkill | null>(null);
  const [reinforcedSkills, setReinforcedSkills] = useState<IcfesSmartSkill[]>([]);
  const [reinforcementIds, setReinforcementIds] = useState<string[]>([]);
  const [pendingNextLevel, setPendingNextLevel] = useState<IcfesSmartLevel | null>(null);
  const questionStartedAt = useRef(0);

  const currentQuestion = queue[queueIndex] ?? null;
  const hasAnsweredCurrent = feedback !== null;

  useEffect(() => {
    let storedProgress = createInitialProgress();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) storedProgress = normalizeProgress(JSON.parse(raw));
    } catch {
      storedProgress = createInitialProgress();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(storedProgress);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  const resetQuestionState = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback(null);
    questionStartedAt.current = Date.now();
  }, []);

  const startDiagnostic = useCallback(() => {
    setMode('diagnostic');
    setQueue(DIAGNOSTIC_QUESTIONS.slice(0, 15));
    setQueueIndex(0);
    setRunAttempts([]);
    setReinforcedSkills([]);
    setReinforcementIds([]);
    setPendingNextLevel(null);
    resetQuestionState();
    setView('question');
  }, [resetQuestionState]);

  const startLevel = useCallback((level: IcfesSmartLevel, expanded = false, preferred: IcfesSmartSkill[] = []) => {
    const cfg = ICFES_LEVELS[level];
    const count = expanded ? cfg.baseQuestionCount + cfg.recoveryQuestionCount : cfg.baseQuestionCount;
    const preferredSkills = getPreferredWeakSkills(progress, preferred);
    setProgress((prev) => ({ ...prev, currentLevel: level, updatedAt: Date.now() }));
    setMode('level');
    setQueue(selectQuestionsForLevel(level, progress, count, preferredSkills));
    setQueueIndex(0);
    setRunAttempts([]);
    setReinforcedSkills([]);
    setReinforcementIds([]);
    setPendingNextLevel(null);
    resetQuestionState();
    setView('question');
  }, [progress, resetQuestionState]);

  const startBridgeReinforcement = useCallback((nextLevel: IcfesSmartLevel, skill: IcfesSmartSkill) => {
    const cfg = ICFES_LEVELS[progress.currentLevel];
    const bridgeQuestions = selectReinforcementQuestions(skill, progress.currentLevel, progress, Math.max(5, cfg.recoveryQuestionCount), queue.map((question) => question.id));
    setMode('bridge');
    setPendingNextLevel(nextLevel);
    setQueue(bridgeQuestions);
    setQueueIndex(0);
    setRunAttempts([]);
    setReinforcementIds(bridgeQuestions.map((question) => question.id));
    resetQuestionState();
    setView('question');
  }, [progress, queue, resetQuestionState]);

  const clearProgress = useCallback(() => {
    const fresh = createInitialProgress();
    setProgress(fresh);
    setLastReport(null);
    setDiagnosticResult(null);
    setQueue([]);
    setRunAttempts([]);
    setView('welcome');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const answerQuestion = useCallback((answer: string) => {
    if (!currentQuestion || feedback) return;

    const startedAt = questionStartedAt.current || Date.now();
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const correct = answer === currentQuestion.correctAnswer;
    const attemptMode: Attempt['mode'] = reinforcementIds.includes(currentQuestion.id) ? 'reinforcement' : mode;
    const attempt: Attempt = {
      questionId: currentQuestion.id,
      level: currentQuestion.level,
      skill: currentQuestion.skill,
      subskill: currentQuestion.subskill,
      mode: attemptMode,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      correct,
      elapsedSeconds,
      at: Date.now(),
    };

    setSelectedAnswer(answer);
    setFeedback({
      correct,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      wrongExplanation: currentQuestion.wrongAnswerExplanations?.[answer],
      elapsedSeconds,
      paceSignal: paceSignal(currentQuestion, correct, elapsedSeconds),
    });
    setRunAttempts((prev) => [...prev, attempt]);

    setProgress((prev) => {
      const attempts = [...prev.attempts, attempt];
      const errorBySkill = {
        ...prev.errorBySkill,
        [currentQuestion.skill]: (prev.errorBySkill[currentQuestion.skill] ?? 0) + (correct ? 0 : 1),
      };
      const { strengths, weaknesses } = deriveSkillLists(attempts);
      return {
        ...prev,
        answeredQuestionIds: Array.from(new Set([...prev.answeredQuestionIds, currentQuestion.id])),
        attempts,
        errorBySkill,
        strengths,
        weaknesses,
        streak: correct ? prev.streak + 1 : 0,
        updatedAt: Date.now(),
      };
    });
  }, [currentQuestion, feedback, mode, reinforcementIds]);

  const finishDiagnostic = useCallback((attempts: Attempt[]) => {
    const result = assignDiagnosticLevel(attempts);
    setDiagnosticResult(result);
    setProgress((prev) => ({
      ...prev,
      diagnosticCompleted: true,
      assignedLevel: result.assignedLevel,
      currentLevel: result.assignedLevel,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      updatedAt: Date.now(),
    }));
    setView('diagnostic-result');
  }, []);

  const finishLevel = useCallback((attempts: Attempt[]) => {
    const report = buildLevelReport(progress.currentLevel, attempts);
    setLastReport(report);
    setProgress((prev) => ({
      ...prev,
      reports: [...prev.reports, report].slice(-12),
      strengths: Array.from(new Set([...prev.strengths, ...report.strengths])),
      weaknesses: report.weaknesses,
      updatedAt: Date.now(),
    }));
    setView('report');
  }, [progress.currentLevel]);

  const goNext = useCallback(() => {
    if (!currentQuestion || !feedback) return;

    const latestAttempts = runAttempts;
    const skillErrorsThisRun = latestAttempts.filter(
      (attempt) => attempt.skill === currentQuestion.skill && !attempt.correct
    ).length;

    if (
      mode === 'level' &&
      skillErrorsThisRun >= 3 &&
      !reinforcedSkills.includes(currentQuestion.skill) &&
      !reinforcementIds.includes(currentQuestion.id)
    ) {
      setReinforcementSkill(currentQuestion.skill);
      setReinforcedSkills((prev) => [...prev, currentQuestion.skill]);
      setView('reinforcement');
      return;
    }

    if (queueIndex < queue.length - 1) {
      setQueueIndex((prev) => prev + 1);
      resetQuestionState();
      return;
    }

    if (mode === 'diagnostic') {
      finishDiagnostic(latestAttempts);
      return;
    }

    if (mode === 'bridge') {
      const next = pendingNextLevel ?? clampLevel(progress.currentLevel + 1);
      startLevel(next);
      return;
    }

    finishLevel(latestAttempts);
  }, [
    currentQuestion,
    feedback,
    finishDiagnostic,
    finishLevel,
    mode,
    pendingNextLevel,
    progress.currentLevel,
    queue.length,
    queueIndex,
    reinforcementIds,
    reinforcedSkills,
    resetQuestionState,
    runAttempts,
    startLevel,
  ]);

  const beginInsertedReinforcement = useCallback(() => {
    if (!reinforcementSkill) return;
    const extras = selectReinforcementQuestions(
      reinforcementSkill,
      progress.currentLevel,
      progress,
      ICFES_LEVELS[progress.currentLevel].recoveryQuestionCount,
      queue.map((question) => question.id)
    );
    const ids = extras.map((question) => question.id);
    setQueue((prev) => [...prev.slice(0, queueIndex + 1), ...extras, ...prev.slice(queueIndex + 1)]);
    setReinforcementIds((prev) => Array.from(new Set([...prev, ...ids])));
    setQueueIndex((prev) => prev + 1);
    setReinforcementSkill(null);
    resetQuestionState();
    setView('question');
  }, [progress, queue, queueIndex, reinforcementSkill, resetQuestionState]);

  const continueAfterReport = useCallback(() => {
    if (!lastReport) return;
    const weakest = lastReport.weaknesses[0] ?? progress.weaknesses[0] ?? 'connectors';

    if (lastReport.status === 'Repetir/expandir nivel') {
      startLevel(lastReport.level, true, lastReport.weaknesses);
      return;
    }

    const levelStep = lastReport.accelerated ? 2 : 1;
    const nextLevel = clampLevel(lastReport.level + levelStep);

    if (nextLevel === lastReport.level) {
      setView('welcome');
      return;
    }

    if (lastReport.status === 'Avanza con refuerzo') {
      startBridgeReinforcement(nextLevel, weakest);
      return;
    }

    startLevel(nextLevel);
  }, [lastReport, progress.weaknesses, startBridgeReinforcement, startLevel]);

  const questionMeta = useMemo(() => {
    if (!currentQuestion) return null;
    return {
      level: ICFES_LEVELS[currentQuestion.level],
      skillLabel: ICFES_SKILL_LABELS[currentQuestion.skill],
      guide: ICFES_SKILL_GUIDES[currentQuestion.skill],
      isReinforcement: reinforcementIds.includes(currentQuestion.id),
    };
  }, [currentQuestion, reinforcementIds]);

  if (!hydrated) {
    return (
      <section style={{ ...cardStyle, padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)', margin: 0 }}>Cargando ruta inteligente...</p>
      </section>
    );
  }

  if (view === 'welcome') {
    const lastSavedReport = progress.reports[progress.reports.length - 1];
    const current = ICFES_LEVELS[progress.currentLevel];

    return (
      <section style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ ...cardStyle, padding: '1.3rem 1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="button" onClick={onBack} className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={16} /> Volver
            </button>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <StatPill icon={<BookOpenCheck size={15} />} label="Banco" value={`${ICFES_SMART_BANK_SUMMARY.total} preguntas`} color="#0f3d8c" />
              <StatPill icon={<Target size={15} />} label="Niveles" value="6" color="#dc2626" />
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle, padding: 'clamp(1.35rem, 4vw, 2rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.2rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.45rem' }}>
              <span className="ink-line" />Ruta adaptativa ICFES
            </p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.55rem, 4vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
              Ruta ICFES Inteligente
            </h2>
            <p style={{ margin: '0 0 1.2rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 680 }}>
              Diagnostica tu nivel, entrena por habilidad, recibe refuerzo cuando repites errores y avanza con reportes claros de precisión, tiempo y estrategia.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              {!progress.diagnosticCompleted ? (
                <button type="button" className="btn btn-primary" onClick={startDiagnostic} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Play size={16} /> Hacer diagnóstico inicial
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={() => startLevel(progress.currentLevel)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Play size={16} /> Continuar {current.shortLabel}
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={clearProgress} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <RotateCcw size={16} /> Reiniciar ruta
              </button>
            </div>
          </div>

          <div style={{ border: `1px solid ${current.color}26`, background: `${current.color}0a`, borderRadius: 16, padding: '1rem' }}>
            <p style={{ margin: '0 0 0.25rem', color: current.color, fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {progress.diagnosticCompleted ? 'Nivel actual' : 'Pendiente'}
            </p>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--ink)', fontSize: '1.1rem' }}>
              {progress.diagnosticCompleted ? current.label : 'Diagnóstico inicial'}
            </h3>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              {progress.diagnosticCompleted ? current.description : '15 preguntas para ubicarte entre Base / Pre-A1 y B+ estratégico.'}
            </p>
            {lastSavedReport && (
              <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '0.75rem', color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.55 }}>
                Último reporte: <strong style={{ color: 'var(--ink)' }}>{lastSavedReport.percentage}%</strong> · {lastSavedReport.status} · {formatDate(lastSavedReport.createdAt)}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {Object.values(ICFES_LEVELS).map((level) => (
            <div key={level.level} style={{ ...cardStyle, padding: '1rem', borderTop: `3px solid ${level.color}` }}>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', color: level.color, fontFamily: 'var(--mono)', fontWeight: 800 }}>
                {level.shortLabel}
              </p>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.82rem' }}>
                {level.focus.slice(0, 3).join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (view === 'diagnostic-result' && diagnosticResult) {
    const assigned = ICFES_LEVELS[diagnosticResult.assignedLevel];

    return (
      <section style={{ ...cardStyle, padding: 'clamp(1.35rem, 4vw, 2rem)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.45rem' }}>
          <span className="ink-line" />Resultado del diagnóstico
        </p>
        <h2 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: 'clamp(1.45rem, 4vw, 2rem)' }}>
          Nivel recomendado: {assigned.shortLabel}
        </h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
          Precisión {diagnosticResult.percentage}% · tiempo promedio {diagnosticResult.averageSeconds}s. La ruta empezará en {assigned.label}.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem', marginBottom: '1.35rem' }}>
          <div style={{ border: '1px solid rgba(5,150,105,0.2)', background: 'rgba(5,150,105,0.06)', borderRadius: 14, padding: '1rem' }}>
            <strong style={{ color: '#059669' }}>Puntos fuertes</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              {diagnosticResult.strengths.length ? diagnosticResult.strengths.map((skill) => ICFES_SKILL_LABELS[skill]).join(', ') : 'Aún no hay fortalezas estables; se formarán con más respuestas.'}
            </p>
          </div>
          <div style={{ border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.06)', borderRadius: 14, padding: '1rem' }}>
            <strong style={{ color: '#dc2626' }}>Prioridad de refuerzo</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              {diagnosticResult.weaknesses.length ? diagnosticResult.weaknesses.map((skill) => ICFES_SKILL_LABELS[skill]).join(', ') : 'La primera sesión medirá con más detalle tus habilidades débiles.'}
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={() => startLevel(diagnosticResult.assignedLevel)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          <Play size={16} /> Empezar {assigned.shortLabel}
        </button>
      </section>
    );
  }

  if (view === 'reinforcement' && reinforcementSkill) {
    const guide = ICFES_SKILL_GUIDES[reinforcementSkill];

    return (
      <section style={{ ...cardStyle, padding: 'clamp(1.35rem, 4vw, 2rem)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.45rem' }}>
          <span className="ink-line" />Refuerzo adaptativo
        </p>
        <h2 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: 'clamp(1.35rem, 4vw, 1.9rem)' }}>
          Detectamos dificultad con {ICFES_SKILL_LABELS[reinforcementSkill].toLowerCase()}
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 1rem' }}>
          Antes de avanzar, vas a reforzar esta habilidad con explicación breve, ejemplo resuelto y una mini práctica de recuperación.
        </p>
        <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '1rem', background: 'var(--bg-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>Explicación breve</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>{guide.explanation}</p>
          </div>
          <div style={{ border: '1px solid rgba(15,61,140,0.16)', borderRadius: 14, padding: '1rem', background: 'rgba(15,61,140,0.05)' }}>
            <strong style={{ color: '#0f3d8c' }}>Ejemplo resuelto</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>{guide.example}</p>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={beginInsertedReinforcement} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          <Zap size={16} /> Iniciar refuerzo
        </button>
      </section>
    );
  }

  if (view === 'report' && lastReport) {
    const level = ICFES_LEVELS[lastReport.level];
    const entries = Object.entries(lastReport.skillAccuracy) as [IcfesSmartSkill, SkillAccuracy][];

    return (
      <section style={{ ...cardStyle, padding: 'clamp(1.35rem, 4vw, 2rem)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.45rem' }}>
          <span className="ink-line" />Reporte final por nivel
        </p>
        <h2 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: 'clamp(1.45rem, 4vw, 2rem)' }}>
          Resultado del {level.shortLabel}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.2rem' }}>
          <StatPill icon={<BarChart3 size={15} />} label="Precisión" value={`${lastReport.percentage}%`} color={level.color} />
          <StatPill icon={<Timer size={15} />} label="Promedio" value={`${lastReport.averageSeconds}s`} color={level.color} />
          <StatPill icon={<Target size={15} />} label="Estado" value={lastReport.status} color={level.color} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.9rem', marginBottom: '1.25rem' }}>
          <div style={{ border: '1px solid rgba(5,150,105,0.2)', background: 'rgba(5,150,105,0.06)', borderRadius: 14, padding: '1rem' }}>
            <strong style={{ color: '#059669' }}>Puntos fuertes</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              {lastReport.strengths.length ? lastReport.strengths.map((skill) => ICFES_SKILL_LABELS[skill]).join(', ') : 'Aún no hay fortalezas estables en este nivel.'}
            </p>
          </div>
          <div style={{ border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.06)', borderRadius: 14, padding: '1rem' }}>
            <strong style={{ color: '#dc2626' }}>Puntos débiles</strong>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              {lastReport.weaknesses.length ? lastReport.weaknesses.map((skill) => ICFES_SKILL_LABELS[skill]).join(', ') : 'No apareció una debilidad crítica.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {entries.map(([skill, value]) => <SkillMeter key={skill} skill={skill} value={value} />)}
        </div>

        <div style={{ border: `1px solid ${level.color}28`, background: `${level.color}0a`, borderRadius: 14, padding: '1rem', marginBottom: '1.25rem' }}>
          <strong style={{ color: level.color }}>Recomendación automática</strong>
          <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>{lastReport.recommendation}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={continueAfterReport} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            {lastReport.status === 'Repetir/expandir nivel' ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
            {lastReport.status === 'Repetir/expandir nivel' ? 'Expandir este nivel' : lastReport.status === 'Avanza con refuerzo' ? 'Refuerzo corto y avanzar' : 'Avanzar'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setView('welcome')}>
            Ver ruta
          </button>
        </div>
      </section>
    );
  }

  if (!currentQuestion || !questionMeta) return null;

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '1rem', alignItems: 'start' }}>
      <div style={{ ...cardStyle, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.15rem', borderBottom: '1px solid var(--line-soft)', display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setView('welcome')} className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={15} /> Ruta
          </button>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            <StatPill icon={<Target size={14} />} label="Habilidad" value={questionMeta.skillLabel} color={questionMeta.level.color} />
            <StatPill icon={<Timer size={14} />} label="Meta" value={`${currentQuestion.estimatedTimeSeconds}s`} color={questionMeta.level.color} />
            {questionMeta.isReinforcement && <StatPill icon={<Zap size={14} />} label="Modo" value="Refuerzo" color="#f59e0b" />}
          </div>
        </div>

        <div style={{ padding: 'clamp(1.15rem, 4vw, 1.7rem)' }}>
          <p style={{ margin: '0 0 0.35rem', color: questionMeta.level.color, fontFamily: 'var(--mono)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase' }}>
            {mode === 'diagnostic' ? 'Diagnóstico inicial' : questionMeta.level.label}
          </p>
          {currentQuestion.passage && (
            <div style={{ whiteSpace: 'pre-line', border: `1px solid ${questionMeta.level.color}24`, background: `${questionMeta.level.color}08`, borderRadius: 14, padding: '1rem', color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.93rem', marginBottom: '1rem' }}>
              {currentQuestion.passage}
            </div>
          )}

          <h2 style={{ margin: '0 0 1rem', color: 'var(--ink)', fontSize: 'clamp(1.15rem, 3vw, 1.45rem)', lineHeight: 1.3 }}>
            {currentQuestion.prompt}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.7rem' }}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = hasAnsweredCurrent && isCorrect;
              const showWrong = hasAnsweredCurrent && isSelected && !isCorrect;
              const borderColor = showCorrect ? '#059669' : showWrong ? '#dc2626' : isSelected ? questionMeta.level.color : 'var(--line-soft)';
              const bg = showCorrect ? 'rgba(5,150,105,0.08)' : showWrong ? 'rgba(220,38,38,0.08)' : isSelected ? `${questionMeta.level.color}0a` : 'var(--bg)';

              return (
                <button
                  key={option}
                  type="button"
                  disabled={hasAnsweredCurrent}
                  onClick={() => answerQuestion(option)}
                  style={{
                    border: `1.5px solid ${borderColor}`,
                    background: bg,
                    borderRadius: 12,
                    padding: '0.85rem 0.95rem',
                    textAlign: 'left',
                    color: 'var(--ink)',
                    font: 'inherit',
                    lineHeight: 1.45,
                    cursor: hasAnsweredCurrent ? 'default' : 'pointer',
                    minHeight: 72,
                  }}
                >
                  <span style={{ display: 'block', fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 800, marginBottom: 3 }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {feedback && <FeedbackPanel feedback={feedback} question={currentQuestion} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', marginTop: '1.1rem', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.45 }}>
              {questionMeta.guide.explanation}
            </p>
            <button type="button" className="btn btn-primary" disabled={!feedback} onClick={goNext} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: feedback ? 1 : 0.55 }}>
              Siguiente <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ProgressPanel progress={progress} queueIndex={queueIndex} queueLength={queue.length} mode={mode} />
    </section>
  );
}
