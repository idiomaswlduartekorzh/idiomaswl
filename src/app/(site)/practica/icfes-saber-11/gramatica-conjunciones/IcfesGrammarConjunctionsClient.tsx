'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Target,
  Users,
  XCircle,
} from 'lucide-react';
import {
  ICFES_GRAMMAR_CONJUNCTION_QUESTIONS,
  ICFES_GRAMMAR_CONJUNCTION_SKILLS,
  ICFES_GRAMMAR_TEACHER_PLAYBOOK,
  type IcfesGrammarConjunctionQuestion,
  type IcfesGrammarConjunctionSkill,
} from '@/data/icfes-grammar-conjunctions';

type PracticeFilter = 'mixed' | 'grammar' | 'connectors' | 'cloze';
type SessionSize = 12 | 24 | 60 | 'all';

interface HistoryEntry {
  id: string;
  skill: IcfesGrammarConjunctionSkill;
  level: number;
  focus: string;
  ok: boolean;
  selected: string;
  correct: string;
  explanation: string;
  miniRule: string;
  teacherPrompt: string;
}

const ICFES_COLOR = '#dc2626';
const SMART_COLOR = '#0f3d8c';
const TEACHER_COLOR = '#047857';
const LETTERS = ['A', 'B', 'C', 'D'];

const FILTERS: { id: PracticeFilter; label: string; description: string }[] = [
  { id: 'mixed', label: 'Mixto', description: 'Gramática, conectores y cloze' },
  { id: 'grammar', label: 'Gramática base', description: 'Estructuras que suelen aparecer en uso del inglés' },
  { id: 'connectors', label: 'Conectores', description: 'Causa, contraste, resultado, condición y adición' },
  { id: 'cloze', label: 'Cloze guiado', description: 'Espacios dentro de mini textos tipo Saber 11' },
];

const GRAMMAR_CORE: IcfesGrammarConjunctionSkill[] = [
  'subjectVerbAgreement',
  'verbTense',
  'articlesDeterminers',
  'prepositions',
  'pronounsQuantifiers',
  'comparativesModals',
];

const SKILL_ORDER: IcfesGrammarConjunctionSkill[] = [
  ...GRAMMAR_CORE,
  'conjunctions',
  'clozeCohesion',
];

const LEVEL_ORDER = [1, 2, 3, 4, 5] as const;

function hashText(text: string) {
  return [...text].reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0);
}

function getQuestionById(id: string) {
  return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.find((question) => question.id === id);
}

function getFilteredQuestions(filter: PracticeFilter) {
  if (filter === 'grammar') {
    return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.filter((q) => GRAMMAR_CORE.includes(q.skill));
  }

  if (filter === 'connectors') {
    return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.filter((q) => q.skill === 'conjunctions');
  }

  if (filter === 'cloze') {
    return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.filter((q) => q.skill === 'clozeCohesion');
  }

  return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS;
}

function stableQuestionSort(questions: IcfesGrammarConjunctionQuestion[], seed: number, salt: string) {
  return [...questions].sort(
    (a, b) => hashText(`${a.id}:${seed}:${salt}`) - hashText(`${b.id}:${seed}:${salt}`)
  );
}

function buildBalancedOrder(source: IcfesGrammarConjunctionQuestion[], seed: number) {
  const buckets = new Map<string, IcfesGrammarConjunctionQuestion[]>();
  const activeSkills = SKILL_ORDER.filter((skill) => source.some((question) => question.skill === skill));

  activeSkills.forEach((skill) => {
    LEVEL_ORDER.forEach((level) => {
      const key = `${skill}:${level}`;
      buckets.set(
        key,
        stableQuestionSort(
          source.filter((question) => question.skill === skill && question.level === level),
          seed,
          key
        )
      );
    });
  });

  const ordered: IcfesGrammarConjunctionQuestion[] = [];
  let added = true;

  while (added) {
    added = false;
    LEVEL_ORDER.forEach((level) => {
      activeSkills.forEach((skill) => {
        const bucket = buckets.get(`${skill}:${level}`);
        const next = bucket?.shift();
        if (next) {
          ordered.push(next);
          added = true;
        }
      });
    });
  }

  return ordered;
}

function buildQueueIds(filter: PracticeFilter, size: SessionSize, seed: number, reviewIds: string[] | null) {
  const source = reviewIds
    ? ICFES_GRAMMAR_CONJUNCTION_QUESTIONS.filter((q) => reviewIds.includes(q.id))
    : getFilteredQuestions(filter);

  const ordered = reviewIds ? stableQuestionSort(source, seed, 'review') : buildBalancedOrder(source, seed);

  const selected = size === 'all' ? ordered : ordered.slice(0, Math.min(size, ordered.length));
  return selected.map((question) => question.id);
}

function arrangeOptions(question: IcfesGrammarConjunctionQuestion, seed: number) {
  const options = question.options.map((text, originalIndex) => ({ text, originalIndex }));
  const correct = options.find((option) => option.originalIndex === question.answer);
  if (!correct) return options;

  const distractors = options
    .filter((option) => option.originalIndex !== question.answer)
    .sort((a, b) => hashText(`${question.id}:${a.text}:${seed}`) - hashText(`${question.id}:${b.text}:${seed}`));

  const arranged = new Array(options.length);
  const desiredIndex = Math.abs(hashText(`${question.id}:${seed}:answer`)) % options.length;
  arranged[desiredIndex] = correct;

  let d = 0;
  for (let i = 0; i < arranged.length; i += 1) {
    if (!arranged[i]) {
      arranged[i] = distractors[d];
      d += 1;
    }
  }

  return arranged as { text: string; originalIndex: number }[];
}

function percent(correct: number, total: number) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

function pickReinforcement(question: IcfesGrammarConjunctionQuestion, queueIds: string[], history: HistoryEntry[], seed: number) {
  const completed = new Set(history.map((entry) => entry.id));
  return ICFES_GRAMMAR_CONJUNCTION_QUESTIONS
    .filter((candidate) =>
      candidate.skill === question.skill &&
      candidate.id !== question.id &&
      !queueIds.includes(candidate.id) &&
      !completed.has(candidate.id) &&
      candidate.level <= Math.min(5, question.level + 1)
    )
    .sort((a, b) => {
      const levelGap = Math.abs(a.level - question.level) - Math.abs(b.level - question.level);
      if (levelGap !== 0) return levelGap;
      return hashText(`${a.id}:${seed}:reinforce`) - hashText(`${b.id}:${seed}:reinforce`);
    })[0];
}

function QuestionContext({ question }: { question: IcfesGrammarConjunctionQuestion }) {
  if (question.before !== undefined && question.target && question.after !== undefined) {
    return (
      <p style={{ margin: 0 }}>
        {question.before}
        <mark
          style={{
            background: 'rgba(220,38,38,0.11)',
            color: ICFES_COLOR,
            borderRadius: 6,
            padding: '0.08rem 0.24rem',
            fontWeight: 900,
          }}
        >
          {question.target}
        </mark>
        {question.after}
      </p>
    );
  }

  return <p style={{ margin: 0 }}>{question.passage}</p>;
}

export default function IcfesGrammarConjunctionsClient() {
  const [filter, setFilter] = useState<PracticeFilter>('mixed');
  const [sessionSize, setSessionSize] = useState<SessionSize>(12);
  const [seed, setSeed] = useState(1);
  const [queueIds, setQueueIds] = useState(() => buildQueueIds('mixed', 12, 1, null));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [teacherMode, setTeacherMode] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [reviewIds, setReviewIds] = useState<string[] | null>(null);
  const [lastReinforcementId, setLastReinforcementId] = useState<string | null>(null);

  const queue = useMemo(
    () => queueIds.map(getQuestionById).filter(Boolean) as IcfesGrammarConjunctionQuestion[],
    [queueIds]
  );

  const question = queue[index];
  const arrangedOptions = useMemo(
    () => (question ? arrangeOptions(question, seed) : []),
    [question, seed]
  );

  const correctCount = history.filter((item) => item.ok).length;
  const currentAccuracy = percent(correctCount, history.length);
  const progress = queue.length ? Math.round((Math.min(index, queue.length) / queue.length) * 100) : 0;
  const selectedOption = selected === null ? null : arrangedOptions[selected];
  const selectedIsCorrect = Boolean(selectedOption && selectedOption.originalIndex === question?.answer);
  const wrongEntries = history.filter((item) => !item.ok);

  function resetSession(nextFilter = filter, nextSize = sessionSize, nextReviewIds: string[] | null = null) {
    const nextSeed = seed + 1;
    setFilter(nextFilter);
    setSessionSize(nextSize);
    setSeed(nextSeed);
    setQueueIds(buildQueueIds(nextFilter, nextSize, nextSeed, nextReviewIds));
    setReviewIds(nextReviewIds);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setShowHint(false);
    setHistory([]);
    setLastReinforcementId(null);
  }

  function chooseOption(optionIndex: number) {
    if (!question || locked) return;

    const option = arrangedOptions[optionIndex];
    const ok = option.originalIndex === question.answer;
    const entry: HistoryEntry = {
      id: question.id,
      skill: question.skill,
      level: question.level,
      focus: question.focus,
      ok,
      selected: option.text,
      correct: question.options[question.answer],
      explanation: question.explanation,
      miniRule: question.miniRule,
      teacherPrompt: question.teacherPrompt,
    };

    setSelected(optionIndex);
    setLocked(true);
    setShowHint(false);
    setHistory((items) => [...items, entry]);
    setLastReinforcementId(null);

    if (!ok && !reviewIds) {
      const reinforcement = pickReinforcement(question, queueIds, [...history, entry], seed);
      if (reinforcement) {
        setQueueIds((ids) => {
          const next = [...ids];
          next.splice(Math.min(index + 1, next.length), 0, reinforcement.id);
          return next;
        });
        setLastReinforcementId(reinforcement.id);
      }
    }
  }

  function nextQuestion() {
    setIndex((value) => value + 1);
    setSelected(null);
    setLocked(false);
    setShowHint(false);
    setLastReinforcementId(null);
  }

  function startErrorReview() {
    resetSession(filter, 'all', wrongEntries.map((entry) => entry.id));
  }

  const skillStats = Object.entries(ICFES_GRAMMAR_CONJUNCTION_SKILLS).map(([skill, label]) => {
    const entries = history.filter((item) => item.skill === skill);
    const correct = entries.filter((item) => item.ok).length;
    return { skill: skill as IcfesGrammarConjunctionSkill, label, total: entries.length, correct };
  });

  if (!question) {
    const weakest = skillStats
      .filter((item) => item.total > 0)
      .sort((a, b) => percent(a.correct, a.total) - percent(b.correct, b.total))[0];

    const teacherMoves = weakest ? ICFES_GRAMMAR_TEACHER_PLAYBOOK[weakest.skill] : [];

    return (
      <section className="wl-card" style={{ padding: '1.25rem', borderRadius: 18, borderTop: `4px solid ${ICFES_COLOR}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '1rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>
              Resultado de gramática
            </p>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.45rem, 4vw, 2rem)', letterSpacing: '-0.03em' }}>
              {correctCount}/{history.length} correctas
            </h2>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
              Precisión {currentAccuracy}%. Prioridad sugerida:{' '}
              <strong style={{ color: 'var(--ink)' }}>{weakest ? weakest.label.toLowerCase() : 'seguir practicando'}</strong>.
            </p>
          </div>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 14,
              border: '1px solid var(--line-soft)',
              background: 'var(--bg-2)',
              display: 'grid',
              placeItems: 'center',
              color: currentAccuracy >= 75 ? '#059669' : ICFES_COLOR,
              fontFamily: 'var(--mono)',
              fontWeight: 900,
              fontSize: '1.4rem',
            }}
          >
            {currentAccuracy}%
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.75rem', marginTop: '1.2rem' }}>
          {skillStats.filter((item) => item.total > 0).map((item) => (
            <div key={item.skill} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.85rem', background: 'var(--bg-2)' }}>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {item.label}
              </p>
              <strong style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
                {percent(item.correct, item.total)}%
              </strong>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.78rem' }}>
                {item.correct}/{item.total} correctas
              </p>
            </div>
          ))}
        </div>

        {teacherMode && teacherMoves.length > 0 && (
          <div style={{ marginTop: '1.2rem', border: '1px solid rgba(4,120,87,0.18)', borderRadius: 14, padding: '1rem', background: 'rgba(4,120,87,0.05)' }}>
            <p style={{ margin: '0 0 0.45rem', color: TEACHER_COLOR, fontFamily: 'var(--mono)', fontSize: '0.74rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <GraduationCap size={16} /> Plan docente sugerido
            </p>
            <h3 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '1rem' }}>
              Intervención de 8 minutos: {weakest?.label}
            </h3>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {teacherMoves.map((move, moveIndex) => (
                <p key={move} style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                  <strong style={{ color: TEACHER_COLOR }}>{moveIndex + 1}.</strong> {move}
                </p>
              ))}
            </div>
          </div>
        )}

        {wrongEntries.length > 0 && (
          <div style={{ marginTop: '1.2rem' }}>
            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem' }}>Errores para repasar</h3>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {wrongEntries.slice(0, 6).map((entry) => (
                <div key={entry.id} style={{ border: '1px solid rgba(220,38,38,0.18)', borderRadius: 12, padding: '0.85rem', background: 'rgba(220,38,38,0.04)' }}>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '0.88rem' }}>
                    {ICFES_GRAMMAR_CONJUNCTION_SKILLS[entry.skill]} · Nivel {entry.level} · {entry.focus}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    Elegiste <strong>{entry.selected}</strong>. Correcta: <strong>{entry.correct}</strong>. {entry.miniRule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button type="button" className="btn" onClick={() => resetSession()} style={{ background: ICFES_COLOR, borderColor: ICFES_COLOR }}>
            <RotateCcw size={16} /> Nueva sesión
          </button>
          {wrongEntries.length > 0 && (
            <button type="button" className="btn btn-ghost" onClick={startErrorReview}>
              <Target size={16} /> Repasar errores
            </button>
          )}
          <Link href="/practica/icfes-saber-11/sinonimos-inferencia" className="btn btn-ghost">
            Sinónimos e inferencia <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Link href="/practica/icfes-saber-11" className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} /> ICFES
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>
          <Brain size={15} /> {reviewIds ? 'Repaso de errores' : 'Sesión adaptativa'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 180px', gap: '1rem', alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>
            Ejercicio {Math.min(index + 1, queue.length)} de {queue.length}
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.35rem, 3vw, 1.8rem)', letterSpacing: '-0.03em', lineHeight: 1.12 }}>
            {question.question}
          </h2>
        </div>
        <div
          style={{
            border: '1px solid var(--line-soft)',
            borderRadius: 12,
            padding: '0.75rem',
            background: 'var(--bg-2)',
            fontFamily: 'var(--mono)',
            fontSize: '0.78rem',
            color: 'var(--muted)',
          }}
        >
          <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '1rem' }}>{currentAccuracy}%</strong>
          precisión actual
        </div>
      </div>

      <div style={{ height: 7, background: 'var(--line-soft)', borderRadius: 999, overflow: 'hidden', margin: '1rem 0 1.1rem' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: ICFES_COLOR, borderRadius: 999, transition: 'width 0.25s ease' }} />
      </div>

      {!reviewIds && (
        <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => resetSession(item.id, sessionSize)}
                title={item.description}
                style={{
                  border: item.id === filter ? `1px solid ${ICFES_COLOR}` : '1px solid var(--line-soft)',
                  background: item.id === filter ? 'rgba(220,38,38,0.08)' : 'var(--bg)',
                  color: item.id === filter ? ICFES_COLOR : 'var(--ink)',
                  borderRadius: 10,
                  padding: '0.5rem 0.72rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {([12, 24, 60, 'all'] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => resetSession(filter, size)}
                style={{
                  border: size === sessionSize ? `1px solid ${SMART_COLOR}` : '1px solid var(--line-soft)',
                  background: size === sessionSize ? 'rgba(15,61,140,0.08)' : 'var(--bg)',
                  color: size === sessionSize ? SMART_COLOR : 'var(--muted)',
                  borderRadius: 10,
                  padding: '0.42rem 0.62rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--mono)',
                  fontWeight: 800,
                }}
              >
                {size === 'all' ? 'Todas' : `${size} preguntas`}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setTeacherMode((value) => !value)}
              aria-pressed={teacherMode}
              style={{
                border: teacherMode ? `1px solid ${TEACHER_COLOR}` : '1px solid var(--line-soft)',
                background: teacherMode ? 'rgba(4,120,87,0.08)' : 'var(--bg)',
                color: teacherMode ? TEACHER_COLOR : 'var(--muted)',
                borderRadius: 10,
                padding: '0.42rem 0.62rem',
                fontSize: '0.72rem',
                fontFamily: 'var(--mono)',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.32rem',
              }}
            >
              <Users size={14} /> Modo docente
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          border: '1px solid var(--line-soft)',
          borderLeft: `4px solid ${ICFES_COLOR}`,
          borderRadius: 14,
          padding: '1.1rem',
          background: 'var(--bg-2)',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 900, color: ICFES_COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {ICFES_GRAMMAR_CONJUNCTION_SKILLS[question.skill]}
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Nivel {question.level} · {question.focus}
          </span>
        </div>
        <div style={{ color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.75 }}>
          <QuestionContext question={question} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.65rem' }}>
        {arrangedOptions.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = option.originalIndex === question.answer;
          const showCorrect = locked && isCorrect;
          const showWrong = locked && isSelected && !isCorrect;

          return (
            <button
              key={`${question.id}-${option.text}`}
              type="button"
              onClick={() => chooseOption(optionIndex)}
              disabled={locked}
              style={{
                textAlign: 'left',
                border: showCorrect
                  ? '1.5px solid #059669'
                  : showWrong
                    ? `1.5px solid ${ICFES_COLOR}`
                    : '1px solid var(--line-soft)',
                background: showCorrect
                  ? 'rgba(5,150,105,0.08)'
                  : showWrong
                    ? 'rgba(220,38,38,0.08)'
                    : 'var(--bg)',
                color: showCorrect ? '#047857' : showWrong ? ICFES_COLOR : 'var(--ink)',
                borderRadius: 12,
                padding: '0.85rem',
                display: 'grid',
                gridTemplateColumns: '34px 1fr',
                gap: '0.7rem',
                alignItems: 'start',
                minHeight: 72,
                cursor: locked ? 'default' : 'pointer',
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: showCorrect ? '#059669' : showWrong ? ICFES_COLOR : 'var(--bg-2)',
                  color: showCorrect || showWrong ? '#fff' : 'var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontWeight: 900,
                }}
              >
                {LETTERS[optionIndex]}
              </span>
              <span style={{ fontWeight: 800, lineHeight: 1.35 }}>{option.text}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowHint((value) => !value)}>
          <Lightbulb size={16} /> Pista
        </button>
        {locked && (
          <button type="button" className="btn btn-sm" onClick={nextQuestion} style={{ background: ICFES_COLOR, borderColor: ICFES_COLOR }}>
            {index + 1 >= queue.length ? 'Ver resultado' : 'Siguiente'} <ArrowRight size={16} />
          </button>
        )}
      </div>

      {(showHint || locked) && (
        <div
          style={{
            marginTop: '1rem',
            border: locked
              ? selectedIsCorrect
                ? '1px solid rgba(5,150,105,0.25)'
                : '1px solid rgba(220,38,38,0.22)'
              : '1px solid rgba(15,61,140,0.18)',
            borderRadius: 14,
            padding: '1rem',
            background: locked
              ? selectedIsCorrect
                ? 'rgba(5,150,105,0.06)'
                : 'rgba(220,38,38,0.05)'
              : 'rgba(15,61,140,0.05)',
          }}
        >
          {locked ? (
            <>
              <p style={{ margin: '0 0 0.35rem', fontWeight: 900, color: selectedIsCorrect ? '#047857' : ICFES_COLOR, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {selectedIsCorrect ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
                {selectedIsCorrect ? 'Correcto' : 'Revisa la estructura'}
              </p>
              <p style={{ margin: '0 0 0.45rem', color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                <strong>Respuesta:</strong> {question.options[question.answer]}. {question.explanation}
              </p>
              <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Regla breve:</strong> {question.miniRule}
              </p>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Estrategia ICFES:</strong> {question.strategy}
              </p>
              {lastReinforcementId && (
                <p style={{ margin: '0.55rem 0 0', color: SMART_COLOR, fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.76rem' }}>
                  Refuerzo adaptativo agregado para esta misma habilidad.
                </p>
              )}
            </>
          ) : (
            <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.9rem' }}>
              {question.hint}
            </p>
          )}
        </div>
      )}

      {teacherMode && (
        <div style={{ marginTop: '1rem', border: '1px solid rgba(4,120,87,0.18)', borderRadius: 14, padding: '1rem', background: 'rgba(4,120,87,0.05)' }}>
          <p style={{ margin: '0 0 0.35rem', color: TEACHER_COLOR, fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <GraduationCap size={15} /> Intervención docente
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.65rem' }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Pregunta guía:</strong> {question.teacherPrompt}
            </p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Mini drill:</strong> {question.followUpDrill}
            </p>
          </div>
        </div>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.74rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <BookOpenCheck size={14} /> {ICFES_GRAMMAR_CONJUNCTION_SKILLS[question.skill]}
        </span>
        <span>·</span>
        <span>{question.focus}</span>
      </div>
    </section>
  );
}
