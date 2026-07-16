'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Target,
  XCircle,
} from 'lucide-react';
import {
  ICFES_SYNONYMS_INFERENCE_QUESTIONS,
  ICFES_SYNONYMS_INFERENCE_SKILLS,
  type IcfesSynonymsInferenceQuestion,
  type IcfesSynonymsInferenceSkill,
} from '@/data/icfes-synonyms-inference';

type PracticeFilter = 'mixed' | 'synonyms' | 'paraphrase' | 'inference';
type SessionSize = 12 | 24 | 'all';

interface HistoryEntry {
  id: string;
  skill: IcfesSynonymsInferenceSkill;
  level: number;
  ok: boolean;
  selected: string;
  correct: string;
  explanation: string;
}

const ICFES_COLOR = '#dc2626';
const SMART_COLOR = '#0f3d8c';
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const FILTERS: { id: PracticeFilter; label: string; description: string }[] = [
  { id: 'mixed', label: 'Mixto', description: 'Sinónimos, paráfrasis e inferencia' },
  { id: 'synonyms', label: 'Sinónimos', description: 'Palabra exacta dentro del contexto' },
  { id: 'paraphrase', label: 'Paráfrasis', description: 'Misma idea con otras palabras' },
  { id: 'inference', label: 'Inferencia', description: 'Conclusión apoyada por pistas' },
];

function hashText(text: string) {
  return [...text].reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0);
}

function getFilteredQuestions(filter: PracticeFilter) {
  if (filter === 'synonyms') {
    return ICFES_SYNONYMS_INFERENCE_QUESTIONS.filter((q) =>
      ['synonym', 'contextVocabulary'].includes(q.skill)
    );
  }

  if (filter === 'paraphrase') {
    return ICFES_SYNONYMS_INFERENCE_QUESTIONS.filter((q) => q.skill === 'literalParaphrase');
  }

  if (filter === 'inference') {
    return ICFES_SYNONYMS_INFERENCE_QUESTIONS.filter((q) => q.skill === 'inference');
  }

  return ICFES_SYNONYMS_INFERENCE_QUESTIONS;
}

function buildQueue(filter: PracticeFilter, size: SessionSize, seed: number, reviewIds: string[] | null) {
  const source = reviewIds
    ? ICFES_SYNONYMS_INFERENCE_QUESTIONS.filter((q) => reviewIds.includes(q.id))
    : getFilteredQuestions(filter);

  const ordered = [...source].sort((a, b) => {
    const levelGap = a.level - b.level;
    if (levelGap !== 0) return levelGap;
    return hashText(`${a.id}:${seed}`) - hashText(`${b.id}:${seed}`);
  });

  if (size === 'all') return ordered;
  return ordered.slice(0, Math.min(size, ordered.length));
}

function arrangeOptions(question: IcfesSynonymsInferenceQuestion, seed: number) {
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

function QuestionContext({ question }: { question: IcfesSynonymsInferenceQuestion }) {
  if (question.target) {
    return (
      <p style={{ margin: 0 }}>
        {question.before}
        <mark
          style={{
            background: 'rgba(220,38,38,0.11)',
            color: ICFES_COLOR,
            borderRadius: 6,
            padding: '0.08rem 0.24rem',
            fontWeight: 800,
          }}
        >
          {question.target}
        </mark>
        {question.after}
      </p>
    );
  }

  return <p style={{ margin: 0 }}>{question.context}</p>;
}

export default function IcfesSynonymsInferenceClient() {
  const [filter, setFilter] = useState<PracticeFilter>('mixed');
  const [sessionSize, setSessionSize] = useState<SessionSize>(12);
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [reviewIds, setReviewIds] = useState<string[] | null>(null);

  const queue = useMemo(
    () => buildQueue(filter, sessionSize, seed, reviewIds),
    [filter, sessionSize, seed, reviewIds]
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

  function resetSession(nextFilter = filter, nextSize = sessionSize) {
    setFilter(nextFilter);
    setSessionSize(nextSize);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setShowHint(false);
    setHistory([]);
    setReviewIds(null);
    setSeed((value) => value + 1);
  }

  function chooseOption(optionIndex: number) {
    if (!question || locked) return;

    const option = arrangedOptions[optionIndex];
    const ok = option.originalIndex === question.answer;
    setSelected(optionIndex);
    setLocked(true);
    setShowHint(false);
    setHistory((items) => [
      ...items,
      {
        id: question.id,
        skill: question.skill,
        level: question.level,
        ok,
        selected: option.text,
        correct: question.options[question.answer],
        explanation: question.explanation,
      },
    ]);
  }

  function nextQuestion() {
    setIndex((value) => value + 1);
    setSelected(null);
    setLocked(false);
    setShowHint(false);
  }

  function startErrorReview() {
    const ids = wrongEntries.map((entry) => entry.id);
    setReviewIds(ids);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setShowHint(false);
    setHistory([]);
    setSeed((value) => value + 1);
  }

  const skillStats = Object.entries(ICFES_SYNONYMS_INFERENCE_SKILLS).map(([skill, label]) => {
    const entries = history.filter((item) => item.skill === skill);
    const correct = entries.filter((item) => item.ok).length;
    return { skill: skill as IcfesSynonymsInferenceSkill, label, total: entries.length, correct };
  });

  if (!question) {
    const weakest = skillStats
      .filter((item) => item.total > 0)
      .sort((a, b) => percent(a.correct, a.total) - percent(b.correct, b.total))[0];

    return (
      <section className="wl-card" style={{ padding: '1.25rem', borderRadius: 18, borderTop: `4px solid ${ICFES_COLOR}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '1rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>
              Resultado de práctica
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

        {wrongEntries.length > 0 && (
          <div style={{ marginTop: '1.2rem' }}>
            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem' }}>Errores para repasar</h3>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {wrongEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} style={{ border: '1px solid rgba(220,38,38,0.18)', borderRadius: 12, padding: '0.85rem', background: 'rgba(220,38,38,0.04)' }}>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '0.88rem' }}>
                    {ICFES_SYNONYMS_INFERENCE_SKILLS[entry.skill]} · Nivel {entry.level}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    Elegiste <strong>{entry.selected}</strong>. Correcta: <strong>{entry.correct}</strong>. {entry.explanation}
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
          <Link href="/practica/icfes-saber-11/examenes" className="btn btn-ghost">
            Simulacros <ArrowRight size={16} />
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
          <Brain size={15} /> {reviewIds ? 'Repaso de errores' : 'Sesión adaptada'}
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
          precision actual
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
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {([12, 24, 'all'] as const).map((size) => (
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
            {ICFES_SYNONYMS_INFERENCE_SKILLS[question.skill]}
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Nivel {question.level} · {question.type}
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
              key={option.text}
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
                {selectedIsCorrect ? 'Correcto' : 'Revisa la pista'}
              </p>
              <p style={{ margin: '0 0 0.45rem', color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                <strong>Respuesta:</strong> {question.options[question.answer]}. {question.explanation}
              </p>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Estrategia:</strong> {question.strategy}
              </p>
            </>
          ) : (
            <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.9rem' }}>
              <strong>Pista:</strong> {question.hint}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
