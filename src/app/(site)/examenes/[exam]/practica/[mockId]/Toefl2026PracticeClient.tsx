'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ExamReport } from '@/components/ExamReport';
import { Timer, SkillTabs, AudioPlayer } from '@/components/exam-runner/primitives';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, WriteQuestion, SpeakQuestion,
  WordCompleteQuestion, SentenceBuildQuestion, RepeatQuestion,
  ToeflBuildSentenceQuestion, ToeflReadingSingleQuestion, ToeflReadingMultiQuestion,
} from '@/data/mocks/types';
import type { CompleteWordsScoreResult } from '@/data/toefl/complete-the-words-set-1';
import type { ToeflReadingScoreResult } from '@/lib/toefl/reading-contract';
import type { ToeflBuildSentenceScoreResult } from '@/lib/toefl/build-sentence-contract';
import BuildSentenceItem from '@/components/toefl/BuildSentenceItem';
import { ReadingMultiChoiceGroup, ReadingSingleChoiceGroup } from '@/components/toefl/ReadingChoiceGroup';

// ── Blueprint: TOEFL iBT 2026 (adaptive, 1–6 scoring) ──────────────────────────
// Reference: docs/toefl-ibt-2026-official-format.md (verified against ETS 2026).

const SKILL_ORDER = ['reading', 'listening', 'writing', 'speaking'];
const SKILL_LABEL: Record<string, string> = {
  reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking',
};

function getSkillSections(mock: MockExam, skill: string) {
  return mock.sections.filter(s => s.skill === skill);
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
}

// Machine-scored raw % → estimated 1–6 band (nearest 0.5). ETS does not publish
// the exact raw→scale conversion; this is a transparent estimate for practice.
function pctToBand(correct: number, total: number): number {
  if (total === 0) return 0;
  const pct = correct / total;
  return Math.round((1 + pct * 5) * 2) / 2;
}

function overallBand(bands: number[]): number {
  const valid = bands.filter(b => b > 0);
  if (valid.length === 0) return 0;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 2) / 2;
}

// ── Answer state ────────────────────────────────────────────────────────────────

interface Answers {
  mcq: Record<string, number>;                        // qid -> option index
  word: Record<string, Record<number, string>>;       // qid -> blankNum -> value
  build: Record<string, number[]>;                    // qid -> tile order (indices)
  buildV2: Record<string, string[]>;                  // stable item id -> stable tile ids
  single: Record<string, string>;                     // stable item id -> stable option id
  multi: Record<string, string[]>;                    // stable item id -> stable option ids
  write: Record<string, string>;                      // qid -> essay
  speak: Record<string, string>;                      // qid -> notes
}
type BandMap = Record<string, number>;                // section-key -> self-band 1–6

const EMPTY: Answers = { mcq: {}, word: {}, build: {}, buildV2: {}, single: {}, multi: {}, write: {}, speak: {} };

// ── MCQ (Read in Daily Life / Academic Passage / all Listening) ─────────────────

function MCQView({ q, index, value, onChange }: {
  q: MCQQuestion; index: number; value: number | undefined; onChange: (i: number) => void;
}) {
  return (
    <div className="ielts-mcq">
      <div className="ielts-mcq__num">{index}.</div>
      <div className="ielts-mcq__body">
        {q.stimulusLabel && <p className="ielts-form__title">{q.stimulusLabel}</p>}
        {q.audioUrl && <AudioPlayer src={q.audioUrl} label={`Audio ${index}`} />}
        {q.stimulus && <pre className="t26-stimulus">{q.stimulus}</pre>}
        <p className="ielts-mcq__text">{q.text}</p>
        <div className="prac-options">
          {q.options.map((opt, i) => (
            <button key={i}
              className={`prac-option${value === i ? ' prac-option--selected' : ''}`}
              onClick={() => onChange(i)}>
              <span className="prac-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="prac-option__text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Complete the Words (Reading) ────────────────────────────────────────────────

function WordCompleteView({ q, values, onChange, onFocus }: {
  q: WordCompleteQuestion;
  values: Record<number, string>;
  onChange: (num: number, v: string) => void;
  onFocus: (inputId: string) => void;
}) {
  const byNum = Object.fromEntries(q.blanks.map(b => [b.num, b]));
  const parts = q.template.split(/(\{\{\d+\}\})/);
  return (
    <div className="ielts-form t26-word">
      {q.instructions && <p className="ielts-form__title">{q.instructions}</p>}
      <div className="ielts-form__body">
        {parts.map((part, i) => {
          const m = part.match(/^\{\{(\d+)\}\}$/);
          if (m) {
            const num = parseInt(m[1]);
            const blank = byNum[num];
            const missingLength = blank?.missingLength
              ?? Math.max(1, (blank?.answer?.length ?? 0) - (blank?.prefix?.length ?? 0) - (blank?.suffix?.length ?? 0));
            const inputId = `${q.id}-blank-${num}`;
            const invalidCharacters = !/^[a-z]*$/i.test(values[num] ?? '');
            return (
              <span key={i} className="t26-word__wrap" data-blank-id={blank?.id}>
                <span className="t26-word__num" aria-hidden="true">{num}</span>
                {blank?.prefix && <span className="t26-word__given">{blank.prefix}</span>}
                <label className="t26-sr-only" htmlFor={inputId}>
                  Passage {q.id}, blank {num} of {q.blanks.length}, prefix {blank?.prefix ?? 'none'}, enter {missingLength} missing letters
                </label>
                <input
                  id={inputId}
                  type="text"
                  className="t26-word__input"
                  value={values[num] ?? ''}
                  onChange={e => onChange(num, e.target.value)}
                  onFocus={() => onFocus(inputId)}
                  placeholder={'_'.repeat(missingLength)}
                  maxLength={missingLength}
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  pattern="[A-Za-z]*"
                  aria-invalid={invalidCharacters}
                  aria-describedby={`${inputId}-hint${invalidCharacters ? ` ${inputId}-error` : ''}`}
                  style={{ width: `${Math.max(2.4, missingLength + 0.8)}ch` }}
                />
                <span id={`${inputId}-hint`} className="t26-sr-only">Write exactly {missingLength} letters.</span>
                {invalidCharacters && <span id={`${inputId}-error`} className="t26-sr-only">Use letters A to Z only, without internal spaces, numbers, or punctuation.</span>}
                {blank?.suffix && <span className="t26-word__given">{blank.suffix}</span>}
              </span>
            );
          }
          return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
        })}
      </div>
    </div>
  );
}

// ── Build a Sentence (Writing) ──────────────────────────────────────────────────

function SentenceBuildView({ q, order, onChange }: {
  q: SentenceBuildQuestion; order: number[]; onChange: (order: number[]) => void;
}) {
  const used = new Set(order);
  const toggle = (idx: number) => {
    if (used.has(idx)) onChange(order.filter(i => i !== idx));
    else onChange([...order, idx]);
  };
  return (
    <div className="ielts-write t26-build">
      {q.prompt && <p className="ielts-write__prompt">{q.prompt}</p>}
      <p className="t26-build__hint">Toca las palabras en el orden correcto para formar una oración gramatical.</p>
      <div className="t26-build__answer">
        {order.length === 0
          ? <span className="t26-build__placeholder">Tu oración aparecerá aquí…</span>
          : order.map((idx, pos) => (
              <button key={pos} className="t26-build__tile t26-build__tile--placed" onClick={() => toggle(idx)}>
                {q.tiles[idx]}
              </button>
            ))}
      </div>
      <div className="t26-build__bank">
        {q.tiles.map((tile, idx) => (
          <button key={idx}
            className={`t26-build__tile${used.has(idx) ? ' t26-build__tile--used' : ''}`}
            disabled={used.has(idx)}
            onClick={() => toggle(idx)}>
            {tile}
          </button>
        ))}
      </div>
      {order.length > 0 && (
        <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => onChange([])}>
          Reiniciar oración
        </button>
      )}
    </div>
  );
}

// ── Write an Email / Academic Discussion (Writing) ──────────────────────────────

function WriteView({ q, value, onChange }: { q: WriteQuestion; value: string; onChange: (v: string) => void }) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const hasMinimum = q.minWords > 0;
  return (
    <div className="ielts-write">
      <div className="ielts-group__label">
        <span className="ielts-group__range">{q.stimulusLabel ?? `Task ${q.taskNumber}`}</span>
      </div>
      <div className="ielts-write__stimulus">{q.stimulus.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>
      <p className="ielts-write__prompt">{q.text}</p>
      {q.timeLimitSeconds && <p className="t26-section-note">Referencia de esta tarea: {q.timeLimitSeconds / 60} minutos. {q.evaluationDisclosure}</p>}
      <textarea
        className="ielts-write__area"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Escribe tu respuesta aquí…"
        rows={10}
        spellCheck={false}
        autoCorrect="off"
      />
      <div className="ielts-write__meta">
        <span className={hasMinimum && words < q.minWords ? 'ielts-write__wc--low' : 'ielts-write__wc'}>
          {words} palabras {hasMinimum && words < q.minWords ? `(mínimo recomendado ≥ ${q.minWords})` : (!hasMinimum ? '(sin mínimo oficial publicado)' : '')}
        </span>
        <span>Sin corrector ortográfico</span>
      </div>
    </div>
  );
}

// ── Listen and Repeat (Speaking) ────────────────────────────────────────────────

function RepeatView({ q }: { q: RepeatQuestion }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="ielts-speak t26-repeat">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Listen and Repeat — Item {q.itemNumber}</span>
      </div>
      <AudioPlayer src={q.audioUrl} label={`Sentence ${q.itemNumber}`} />
      <p className="t26-repeat__instruction">Escucha la oración y repítela en voz alta con la misma pronunciación, ritmo y entonación.</p>
      <button className="btn btn-ghost btn-sm" onClick={() => setRevealed(r => !r)}>
        {revealed ? 'Ocultar texto' : 'Ver texto de la oración'}
      </button>
      {revealed && <p className="t26-repeat__target">“{q.targetSentence}”</p>}
    </div>
  );
}

// ── Take an Interview (Speaking) ────────────────────────────────────────────────

function InterviewView({ q, notes, onNotes }: { q: SpeakQuestion; notes: string; onNotes: (v: string) => void }) {
  return (
    <div className="ielts-speak">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Take an Interview — Question {q.partNumber}</span>
      </div>
      {q.text.split('\n\n').map((p, i) => <p key={i} className="ielts-speak__prompt">{p}</p>)}
      <p className="ielts-write__prompt" style={{ marginTop: '1rem' }}>Notas de preparación (opcional):</p>
      <textarea
        className="ielts-write__area"
        value={notes}
        onChange={e => onNotes(e.target.value)}
        placeholder="Apunta ideas antes de responder en voz alta…"
        rows={4}
      />
    </div>
  );
}

// ── Section panel ────────────────────────────────────────────────────────────────

function renderQuestion(q: Question, index: number, ans: Answers, h: Handlers) {
  switch (q.type) {
    case 'mcq':
    case 'dialog':
      return <MCQView key={q.id} q={q} index={index} value={ans.mcq[q.id]} onChange={i => h.onMCQ(q.id, i)} />;
    case 'wordcomplete':
      return <WordCompleteView key={q.id} q={q} values={ans.word[q.id] ?? {}} onChange={(n, v) => h.onWord(q.id, n, v)} onFocus={h.onWordFocus} />;
    case 'toefl-reading-single':
      return <ReadingSingleChoiceGroup key={q.id} itemId={q.id} number={index} prompt={q.text} options={q.options} selectedOptionId={ans.single[q.id]} onSelect={(optionId) => h.onSingle(q.id, optionId)} onFocus={h.onReadingFocus} />;
    case 'toefl-reading-multi':
      return <ReadingMultiChoiceGroup key={q.id} itemId={q.id} number={index} prompt={q.text} options={q.options} selectedOptionIds={ans.multi[q.id] ?? []} selectCount={q.selectCount} onChange={(optionIds) => h.onMulti(q.id, optionIds)} onFocus={h.onReadingFocus} supplementary />;
    case 'multiselect':
      return <ReadingMultiChoiceGroup
        key={q.id}
        itemId={q.id}
        number={index}
        prompt={q.text}
        options={q.options.map((option) => ({ id: `${q.id}:option-${option.letter.toLowerCase()}`, label: option.letter, text: option.text }))}
        selectedOptionIds={ans.multi[q.id] ?? []}
        selectCount={q.selectCount}
        onChange={(optionIds) => h.onMulti(q.id, optionIds)}
        onFocus={h.onReadingFocus}
      />;
    case 'sentencebuild':
      return <SentenceBuildView key={q.id} q={q} order={ans.build[q.id] ?? []} onChange={o => h.onBuild(q.id, o)} />;
    case 'toefl-build-sentence':
      return <BuildSentenceItem
        key={q.id}
        item={q}
        number={index}
        order={ans.buildV2[q.id] ?? []}
        onChange={(order) => h.onBuildV2(q.id, order)}
        onFocus={h.onBuildFocus}
      />;
    case 'write':
      return <WriteView key={q.id} q={q} value={ans.write[q.id] ?? ''} onChange={v => h.onWrite(q.id, v)} />;
    case 'repeat':
      return <RepeatView key={q.id} q={q} />;
    case 'speak':
      return <InterviewView key={q.id} q={q} notes={ans.speak[q.id] ?? ''} onNotes={v => h.onSpeak(q.id, v)} />;
    default:
      return null;
  }
}

function SectionPanel({ section, ans, handlers }: { section: MockSection; ans: Answers; handlers: Handlers }) {
  let mcqCounter = 0;
  const body = (
    <div className="ielts-panel__questions">
      {section.questions.map(q => {
        const numbered = q.type === 'mcq' || q.type === 'dialog' || q.type === 'toefl-reading-single'
          || q.type === 'toefl-reading-multi' || q.type === 'multiselect' || q.type === 'toefl-build-sentence';
        const idx = numbered ? ++mcqCounter : mcqCounter;
        return renderQuestion(q, idx, ans, handlers);
      })}
    </div>
  );
  if (section.passage) {
    return (
      <div className="ielts-split">
        <div className="ielts-split__passage">
          <p className="ielts-split__passage-label">{section.passageTitle ?? 'Reading text'}</p>
          <div className="ielts-split__passage-text">
            {section.passage.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        <div className="ielts-split__right">
          <p className="ielts-split__section-title">{section.title}</p>
          <p className="ielts-split__instructions">{section.instructions}</p>
          {section.sectionNote && <p className="t26-section-note">{section.sectionNote}</p>}
          {body}
        </div>
      </div>
    );
  }
  return (
    <div className="ielts-section-panel">
      <p className="ielts-section-panel__title">{section.title}</p>
      <p className="ielts-section-panel__instructions">{section.instructions}</p>
      {section.sectionNote && <p className="t26-section-note">{section.sectionNote}</p>}
      {section.audioUrl && (
        <div className="ielts-audio-sticky">
          <AudioPlayer src={section.audioUrl} label="TOEFL Listening" />
        </div>
      )}
      {body}
    </div>
  );
}

// ── Self-assess modal (AI-scored tasks: Writing Email/Discussion, Speaking) ──────

function SelfAssessModal({ title, rows, bands, onSave, onCancel }: {
  title: string; rows: { key: string; label: string }[];
  bands: BandMap; onSave: (b: BandMap) => void; onCancel: () => void;
}) {
  const [local, setLocal] = useState<BandMap>(bands);
  const SCORES = [1, 2, 3, 4, 5, 6];
  return (
    <div className="ielts-assess">
      <h2 className="ielts-assess__title">Autoevaluación: {title}</h2>
      <p className="ielts-assess__sub">Estas tareas se puntúan con IA en el examen real (escala 1–6). Evalúa tu respuesta de forma honesta.</p>
      {rows.map(row => (
        <div key={row.key} className="ielts-assess__row">
          <p className="ielts-assess__label">{row.label}</p>
          <div className="ielts-assess__scores">
            {SCORES.map(s => (
              <button key={s}
                className={`ielts-assess__score${local[row.key] === s ? ' ielts-assess__score--sel' : ''}`}
                onClick={() => setLocal(p => ({ ...p, [row.key]: s }))}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button className="btn" onClick={() => onSave(local)}>Guardar y continuar</button>
        <button className="btn btn-ghost" onClick={onCancel}>Volver al examen</button>
      </div>
    </div>
  );
}

function WritingReviewModal({ rows, onContinue, onCancel }: {
  rows: { key: string; label: string }[];
  onContinue: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="ielts-assess">
      <h2 className="ielts-assess__title">Cierre de Writing</h2>
      <p className="ielts-assess__sub">
        Tus textos quedan guardados en este intento, pero no se convierten en una banda. ETS usa sus propios modelos y raters; WeLearn mostrará sólo feedback local claramente rotulado.
      </p>
      <ul>
        {rows.map((row) => <li key={row.key}>{row.label}: <strong>respuesta guardada · not_evaluated</strong></li>)}
      </ul>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button className="btn" onClick={onContinue}>Continuar sin inventar score</button>
        <button className="btn btn-ghost" onClick={onCancel}>Volver al examen</button>
      </div>
    </div>
  );
}

// ── Results ──────────────────────────────────────────────────────────────────────

type WordScoreMap = Record<string, CompleteWordsScoreResult>;

function computeReadingListening(
  mock: MockExam,
  skill: string,
  ans: Answers,
  wordScores: WordScoreMap,
  readingScore?: ToeflReadingScoreResult,
) {
  let correct = 0, total = 0;
  if (skill === 'reading' && readingScore) {
    correct += readingScore.correct;
    total += readingScore.denominator;
  }
  for (const sec of getSkillSections(mock, skill)) {
    for (const q of sec.questions) {
      if (q.type === 'mcq' || q.type === 'dialog') {
        total++; if (ans.mcq[q.id] === q.answer) correct++;
      } else if (q.type === 'wordcomplete') {
        const serverScore = wordScores[q.id];
        if (serverScore) {
          correct += serverScore.correct;
          total += serverScore.denominator;
          continue;
        }
        for (const b of q.blanks) {
          if (!b.answer) continue;
          total++;
          const missing = b.answer.slice(b.prefix?.length ?? 0, b.answer.length - (b.suffix?.length ?? 0));
          if (norm(ans.word[q.id]?.[b.num] ?? '') === norm(missing)) correct++;
        }
      } else if (q.type === 'toefl-reading-single' || q.type === 'toefl-reading-multi') {
        // Server-scored reading keys reconcile once through readingScore.
        continue;
      } else if (q.type === 'multiselect') {
        total++;
        const selectedLetters = (ans.multi[q.id] ?? []).map((id) => id.slice(id.lastIndexOf('-') + 1).toUpperCase());
        if (selectedLetters.length === q.selectCount
          && q.answers.length === selectedLetters.length
          && q.answers.every((letter) => selectedLetters.includes(letter))) correct++;
      }
    }
  }
  return { correct, total };
}

function Results({ mock, exam, ans, wordScores, readingScore, buildScore, speakBands, onRetry }: {
  mock: MockExam; exam: Exam; ans: Answers; wordScores: WordScoreMap; readingScore?: ToeflReadingScoreResult; buildScore?: ToeflBuildSentenceScoreResult; speakBands: BandMap; onRetry: () => void;
}) {
  const r = computeReadingListening(mock, 'reading', ans, wordScores, readingScore);
  const l = computeReadingListening(mock, 'listening', ans, wordScores);
  const rBand = pctToBand(r.correct, r.total);
  const lBand = pctToBand(l.correct, l.total);

  // Writing: Build a Sentence (machine) blended with self-assessed Email + Discussion.
  const buildQs = getSkillSections(mock, 'writing').flatMap(s => s.questions).filter(q => q.type === 'sentencebuild') as SentenceBuildQuestion[];
  let bCorrect = buildScore?.correct ?? 0;
  let bTotal = buildScore?.denominator ?? 0;
  for (const q of buildQs) {
    const order = ans.build[q.id] ?? [];
    const built = order.map(i => q.tiles[i]);
    if (built.length === q.answer.length && built.every((w, i) => norm(w) === norm(q.answer[i]))) bCorrect++;
    bTotal++;
  }
  const buildBand = bTotal ? pctToBand(bCorrect, bTotal) : 0;
  const constructedWriting = getSkillSections(mock, 'writing').flatMap(s => s.questions).filter(q => q.type === 'write');
  // Build raw points remain useful, but Email and Discussion are not locally scored.
  // A partial machine result must not masquerade as a complete Writing band.
  const wBand = constructedWriting.length ? 0 : buildBand;

  const speakSelfBands = Object.values(speakBands).filter(b => b > 0);
  const spBand = speakSelfBands.length ? Math.round((speakSelfBands.reduce((a, b) => a + b, 0) / speakSelfBands.length) * 2) / 2 : 0;

  const skills = [
    ...(r.total ? [{ skill: 'Reading', score: rBand, max: 6, label: `Band ${rBand}`, raw: `${r.correct}/${r.total}` }] : []),
    ...(l.total ? [{ skill: 'Listening', score: lBand, max: 6, label: `Band ${lBand}`, raw: `${l.correct}/${l.total}` }] : []),
    ...(wBand ? [{ skill: 'Writing', score: wBand, max: 6, label: `Band ${wBand}`, raw: bTotal ? `Build ${bCorrect}/${bTotal}` : undefined }] : []),
    ...(spBand ? [{ skill: 'Speaking', score: spBand, max: 6, label: `Band ${spBand}` }] : []),
  ];
  const total = overallBand([rBand, lBand, wBand, spBand]);
  // Transition 0–120 comparable score (approx): each band → /6*30 per section, summed.
  const comparable = Math.round(([rBand, lBand, wBand, spBand].filter(b => b > 0).reduce((a, b) => a + (b / 6) * 30, 0)));

  const officialReadingIds = new Set(getSkillSections(mock, 'reading')
    .flatMap((section) => section.questions)
    .filter((question) => (question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi')
      && question.alignment === 'official-family-pilot')
    .map((question) => question.id));
  const readingOfficialCorrect = readingScore?.outcomes.reduce(
    (sum, outcome) => sum + (officialReadingIds.has(outcome.itemId) ? outcome.rawPoints ?? 0 : 0), 0,
  ) ?? 0;
  const readingOfficialTotal = readingScore?.outcomes.filter(
    (outcome) => officialReadingIds.has(outcome.itemId) && outcome.maxRawPoints === 1,
  ).length ?? 0;
  const readingSupplementary = readingScore?.outcomes.find((outcome) => !officialReadingIds.has(outcome.itemId) && outcome.maxRawPoints === 1);

  return (
    <>
      {readingScore && (
        <section className="t26-reading-report" aria-labelledby="t26-reading-report-title">
          <h2 id="t26-reading-report-title">Detalle de Reading · {mock.title}</h2>
          <p>Familias oficiales practicadas: <strong>{readingOfficialCorrect}/{readingOfficialTotal}</strong>.</p>
          {readingSupplementary && <p>Complementaria WeLearn: <strong>{readingSupplementary.rawPoints === 1 ? 'correcta' : 'incorrecta o incompleta'}</strong>.</p>}
          <p>Corrección local fija; no equivale a una puntuación oficial de ETS.</p>
        </section>
      )}
      {buildScore && (
        <section className="t26-build-report" aria-labelledby="t26-build-report-title">
          <h2 id="t26-build-report-title">Detalle de Build a Sentence · {mock.title}</h2>
          <p>Órdenes correctos: <strong>{buildScore.correct}/{buildScore.denominator}</strong>.</p>
          <p>Corrección local fija; no equivale a una puntuación oficial de ETS.</p>
        </section>
      )}
      {constructedWriting.length > 0 && (
        <section className="t26-writing-report" aria-labelledby="t26-writing-report-title">
          <h2 id="t26-writing-report-title">Writing construido</h2>
          <p>Email y Academic Discussion: <strong>guardados · not_evaluated</strong>.</p>
          <p>No se calculó banda de Writing ni se incluyó esta sección en el total local.</p>
        </section>
      )}
      <ExamReport
      data={{
        examName: exam.name,
        examSlug: exam.slug,
        mockTitle: mock.title,
        totalScore: total,
        totalMax: 6,
        totalLabel: `Overall Band ${total} / 6 · ≈ ${comparable}/120`,
        accentColor: exam.color,
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        skills,
      }}
      onRetry={onRetry}
      backHref={`/examenes/${exam.slug}`}
      />
    </>
  );
}

// ── Handlers type ────────────────────────────────────────────────────────────────

interface Handlers {
  onMCQ: (id: string, i: number) => void;
  onWord: (id: string, num: number, v: string) => void;
  onWordFocus: (inputId: string) => void;
  onSingle: (id: string, optionId: string) => void;
  onMulti: (id: string, optionIds: string[]) => void;
  onReadingFocus: (inputId: string) => void;
  onBuild: (id: string, order: number[]) => void;
  onBuildV2: (id: string, order: string[]) => void;
  onBuildFocus: (controlId: string) => void;
  onWrite: (id: string, v: string) => void;
  onSpeak: (id: string, v: string) => void;
}

// ── Main component ────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'assess-write' | 'assess-speak' | 'results';

function createClientId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${value}`;
}

export default function Toefl2026PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const skills = SKILL_ORDER.filter(sk => mock.sections.some(s => s.skill === sk));
  const [activeSkill, setActiveSkill] = useState(skills[0] ?? 'reading');
  const [ans, setAns] = useState<Answers>(EMPTY);
  const [speakBands, setSpeakBands] = useState<BandMap>({});
  const [wordScores, setWordScores] = useState<WordScoreMap>({});
  const [readingScore, setReadingScore] = useState<ToeflReadingScoreResult>();
  const [buildScore, setBuildScore] = useState<ToeflBuildSentenceScoreResult>();
  const [attemptId, setAttemptId] = useState('');
  const [lastWordFocusId, setLastWordFocusId] = useState('');
  const [lastReadingFocusId, setLastReadingFocusId] = useState('');
  const [lastBuildFocusId, setLastBuildFocusId] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [scoringWords, setScoringWords] = useState(false);
  const [wordScoringError, setWordScoringError] = useState(false);
  const [readingScoringError, setReadingScoringError] = useState(false);
  const [buildScoringError, setBuildScoringError] = useState(false);
  const storageKey = `wl:toefl:mock:${mock.id}:attempt:v1`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as {
            version?: number;
            attemptId?: string;
            ans?: Answers;
            wordScores?: WordScoreMap;
            readingScore?: ToeflReadingScoreResult;
            buildScore?: ToeflBuildSentenceScoreResult;
            activeSkill?: string;
            lastWordFocusId?: string;
            lastReadingFocusId?: string;
            lastBuildFocusId?: string;
          };
          if ((saved.version === 1 || saved.version === 2) && saved.attemptId && saved.ans) {
            setAttemptId(saved.attemptId);
            setAns({
              ...EMPTY,
              ...saved.ans,
              single: saved.ans.single ?? {},
              multi: saved.ans.multi ?? {},
              buildV2: saved.ans.buildV2 ?? {},
            });
            setWordScores(saved.wordScores ?? {});
            setReadingScore(saved.readingScore);
            setBuildScore(saved.buildScore);
            if (saved.activeSkill && skills.includes(saved.activeSkill)) setActiveSkill(saved.activeSkill);
            setLastWordFocusId(saved.lastWordFocusId ?? '');
            setLastReadingFocusId(saved.lastReadingFocusId ?? '');
            setLastBuildFocusId(saved.lastBuildFocusId ?? '');
            setPhase('exam');
            const focusId = saved.lastBuildFocusId || saved.lastReadingFocusId || saved.lastWordFocusId;
            if (focusId) {
              window.requestAnimationFrame(() => document.getElementById(focusId)?.focus());
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
  // The attempt belongs to this fixed mock identity; changing mocks remounts the route.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !attemptId || phase === 'intro' || phase === 'results') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: 2,
        attemptId,
        ans,
        wordScores,
        readingScore,
        buildScore,
        activeSkill,
        lastWordFocusId,
        lastReadingFocusId,
        lastBuildFocusId,
      }));
    } catch {
      // Anonymous practice continues without local restoration.
    }
  }, [activeSkill, ans, attemptId, buildScore, hydrated, lastBuildFocusId, lastReadingFocusId, lastWordFocusId, phase, readingScore, storageKey, wordScores]);

  useEffect(() => {
    if (phase !== 'exam') return;
    const focusId = activeSkill === 'reading'
      ? lastReadingFocusId || lastWordFocusId
      : activeSkill === 'writing' ? lastBuildFocusId : '';
    if (focusId) window.requestAnimationFrame(() => document.getElementById(focusId)?.focus());
  }, [activeSkill, lastBuildFocusId, lastReadingFocusId, lastWordFocusId, phase]);

  const handlers: Handlers = {
    onMCQ: useCallback((id, i) => setAns(p => ({ ...p, mcq: { ...p.mcq, [id]: i } })), []),
    onWord: useCallback((id, num, v) => setAns(p => ({ ...p, word: { ...p.word, [id]: { ...(p.word[id] ?? {}), [num]: v } } })), []),
    onWordFocus: useCallback((inputId) => setLastWordFocusId(inputId), []),
    onSingle: useCallback((id, optionId) => setAns(p => ({ ...p, single: { ...p.single, [id]: optionId } })), []),
    onMulti: useCallback((id, optionIds) => setAns(p => ({ ...p, multi: { ...p.multi, [id]: optionIds } })), []),
    onReadingFocus: useCallback((inputId) => setLastReadingFocusId(inputId), []),
    onBuild: useCallback((id, order) => setAns(p => ({ ...p, build: { ...p.build, [id]: order } })), []),
    onBuildV2: useCallback((id, order) => setAns(p => ({ ...p, buildV2: { ...p.buildV2, [id]: order } })), []),
    onBuildFocus: useCallback((controlId) => setLastBuildFocusId(controlId), []),
    onWrite: useCallback((id, v) => setAns(p => ({ ...p, write: { ...p.write, [id]: v } })), []),
    onSpeak: useCallback((id, v) => setAns(p => ({ ...p, speak: { ...p.speak, [id]: v } })), []),
  };

  // Progress per skill (each machine item / constructed task counts as one).
  const progressMap = Object.fromEntries(skills.map(sk => {
    let done = 0, total = 0;
    for (const sec of getSkillSections(mock, sk)) {
      for (const q of sec.questions) {
        if (q.type === 'mcq' || q.type === 'dialog') { total++; if (ans.mcq[q.id] !== undefined) done++; }
        else if (q.type === 'wordcomplete') { for (const b of q.blanks) { total++; if ((ans.word[q.id]?.[b.num] ?? '').trim()) done++; } }
        else if (q.type === 'toefl-reading-single') { total++; if (ans.single[q.id]) done++; }
        else if (q.type === 'toefl-reading-multi' || q.type === 'multiselect') { total++; if ((ans.multi[q.id] ?? []).length === q.selectCount) done++; }
        else if (q.type === 'sentencebuild') { total++; if ((ans.build[q.id] ?? []).length) done++; }
        else if (q.type === 'toefl-build-sentence') { total++; if ((ans.buildV2[q.id] ?? []).length === q.blankCount) done++; }
        else if (q.type === 'write') { total++; if ((ans.write[q.id] ?? '').trim()) done++; }
        else if (q.type === 'speak') { total++; if ((ans.speak[q.id] ?? '').trim()) done++; }
        else if (q.type === 'repeat') { total++; done++; }
      }
    }
    return [sk, { done, total }];
  }));
  const totalAnswered = Object.values(progressMap).reduce((a, p) => a + p.done, 0);
  const totalQs = Object.values(progressMap).reduce((a, p) => a + p.total, 0);

  const hasWriteAI = getSkillSections(mock, 'writing').flatMap(s => s.questions).some(q => q.type === 'write');
  const hasSpeak = getSkillSections(mock, 'speaking').flatMap(s => s.questions).length > 0;

  const goSubmit = useCallback(async () => {
    if (scoringWords) return;
    setScoringWords(true);
    setWordScoringError(false);
    setReadingScoringError(false);
    setBuildScoringError(false);
    let failureSkill: 'reading' | 'writing' = 'reading';
    try {
      const stableAttemptId = attemptId || createClientId('attempt');
      if (!attemptId) setAttemptId(stableAttemptId);
      const serverQuestions = getSkillSections(mock, 'reading')
        .flatMap((section) => section.questions)
        .filter((question): question is WordCompleteQuestion & { objectId: string } =>
          question.type === 'wordcomplete'
          && question.serverScoring === 'toefl-complete-words'
          && typeof question.objectId === 'string');
      const nextScores = { ...wordScores };
      for (const question of serverQuestions) {
        if (nextScores[question.id]) continue;
        const responseByBlank = Object.fromEntries(question.blanks.map((blank) => [
          blank.id!,
          ans.word[question.id]?.[blank.num] ?? '',
        ]));
        const response = await fetch('/api/practica/toefl/complete-the-words/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: question.objectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${question.id}`,
            responses: responseByBlank,
            presentedBlankIds: question.blanks.map((blank) => blank.id),
          }),
        });
        if (!response.ok) {
          setWordScoringError(true);
          throw new Error('word_scoring_unavailable');
        }
        nextScores[question.id] = await response.json() as CompleteWordsScoreResult;
      }
      setWordScores(nextScores);

      const readingQuestions = getSkillSections(mock, 'reading')
        .flatMap((section) => section.questions)
        .filter((question): question is ToeflReadingSingleQuestion | ToeflReadingMultiQuestion =>
          (question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi')
          && question.serverScoring === 'toefl-reading');
      let nextReadingScore = readingScore;
      if (readingQuestions.length > 0 && !nextReadingScore) {
        const objectIds = new Set(readingQuestions.map((question) => question.objectId));
        if (objectIds.size !== 1) {
          setReadingScoringError(true);
          throw new Error('reading_object_identity_mismatch');
        }
        const [readingObjectId] = objectIds;
        const responses = Object.fromEntries(readingQuestions.map((question) => [
          question.id,
          question.type === 'toefl-reading-single' ? ans.single[question.id] ?? null : ans.multi[question.id] ?? [],
        ]));
        const response = await fetch('/api/practica/toefl/reading/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: readingObjectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${readingObjectId}`,
            responses,
            presentedItemIds: readingQuestions.map((question) => question.id),
          }),
        });
        if (!response.ok) {
          setReadingScoringError(true);
          throw new Error('reading_scoring_unavailable');
        }
        nextReadingScore = await response.json() as ToeflReadingScoreResult;
        setReadingScore(nextReadingScore);
      }

      const buildQuestions = getSkillSections(mock, 'writing')
        .flatMap((section) => section.questions)
        .filter((question): question is ToeflBuildSentenceQuestion =>
          question.type === 'toefl-build-sentence' && question.serverScoring === 'toefl-build-sentence');
      let nextBuildScore = buildScore;
      if (buildQuestions.length > 0 && !nextBuildScore) {
        failureSkill = 'writing';
        const objectIds = new Set(buildQuestions.map((question) => question.objectId));
        if (objectIds.size !== 1) {
          setBuildScoringError(true);
          throw new Error('build_sentence_object_identity_mismatch');
        }
        const [buildObjectId] = objectIds;
        const response = await fetch('/api/practica/toefl/build-sentence/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: buildObjectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${buildObjectId}`,
            responses: Object.fromEntries(buildQuestions.map((question) => [question.id, ans.buildV2[question.id] ?? []])),
            presentedItemIds: buildQuestions.map((question) => question.id),
          }),
        });
        if (!response.ok) {
          setBuildScoringError(true);
          throw new Error('build_sentence_scoring_unavailable');
        }
        nextBuildScore = await response.json() as ToeflBuildSentenceScoreResult;
        setBuildScore(nextBuildScore);
      }
      if (hasWriteAI) setPhase('assess-write');
      else if (hasSpeak) setPhase('assess-speak');
      else setPhase('results');
    } catch {
      if (failureSkill === 'writing') setBuildScoringError(true);
      setActiveSkill(failureSkill);
      setPhase('exam');
    } finally {
      setScoringWords(false);
    }
  }, [ans.buildV2, ans.multi, ans.single, ans.word, attemptId, buildScore, hasSpeak, hasWriteAI, mock, readingScore, scoringWords, wordScores]);

  const handleRetry = useCallback(() => {
    setAns(EMPTY); setSpeakBands({});
    setWordScores({}); setReadingScore(undefined); setBuildScore(undefined); setAttemptId(createClientId('attempt')); setLastWordFocusId(''); setLastReadingFocusId(''); setLastBuildFocusId('');
    setWordScoringError(false); setReadingScoringError(false); setBuildScoringError(false);
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
    setActiveSkill(skills[0] ?? 'reading'); setPhase('intro');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // ── Self-assess phases ──
  if (phase === 'assess-write') {
    const rows = getSkillSections(mock, 'writing').flatMap(s => s.questions)
      .filter(q => q.type === 'write')
      .map(q => ({ key: q.id, label: (q as WriteQuestion).stimulusLabel ?? `Writing task` }));
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <WritingReviewModal rows={rows}
          onContinue={() => { setPhase(hasSpeak ? 'assess-speak' : 'results'); }}
          onCancel={() => setPhase('exam')} />
      </div>
    );
  }
  if (phase === 'assess-speak') {
    const rows = getSkillSections(mock, 'speaking').flatMap(s => s.questions).map(q => {
      if (q.type === 'repeat') return { key: q.id, label: `Listen and Repeat — Item ${(q as RepeatQuestion).itemNumber}` };
      return { key: q.id, label: `Take an Interview — Q${(q as SpeakQuestion).partNumber}` };
    });
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <SelfAssessModal title="Speaking (Listen and Repeat + Interview)" rows={rows} bands={speakBands}
          onSave={b => { setSpeakBands(b); setPhase('results'); }}
          onCancel={() => setPhase('exam')} />
      </div>
    );
  }
  if (phase === 'results') {
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <Results mock={mock} exam={exam} ans={ans} wordScores={wordScores} readingScore={readingScore} buildScore={buildScore} speakBands={speakBands} onRetry={handleRetry} />
      </div>
    );
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="prac-shell prac-shell--intro"><style>{T26_CSS}</style>
        <div className="prac-intro" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name} · Formato 2026</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{totalQs}</span><span className="prac-intro__stat-lbl">Ítems</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{mock.timeMinutes}</span><span className="prac-intro__stat-lbl">Minutos</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">1–6</span><span className="prac-intro__stat-lbl">Escala</span></div>
          </div>
          <div className="prac-intro__tips">
            <p className="prac-intro__tips-title">Formato oficial vigente (act. enero 2026)</p>
            <ul>
              <li>Reading: Complete the Words, Read in Daily Life, Read an Academic Passage.</li>
              <li>Listening: Choose a Response, Conversation, Announcement, Academic Talk. El audio se reproduce una vez.</li>
              <li>Writing: Build a Sentence, Write an Email, Write for an Academic Discussion.</li>
              <li>Speaking: Listen and Repeat, Take an Interview.</li>
            </ul>
          </div>
          <button className="btn prac-intro__start" onClick={() => { setActiveSkill(skills[0] ?? 'reading'); setPhase('exam'); }}>Empezar examen</button>
          <Link href={`/examenes/${exam.slug}`} className="prac-intro__back">Volver a {exam.name}</Link>
        </div>
      </div>
    );
  }

  // ── Exam ──
  const activeSections = getSkillSections(mock, activeSkill);
  const unanswered = totalQs - totalAnswered;
  return (
    <div className="prac-shell prac-shell--exam" style={{ '--exam-color': exam.color } as React.CSSProperties}>
      <style>{T26_CSS}</style>
      <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href={`/examenes/${exam.slug}`} className="prac-topbar__back">{exam.name}</Link>
          <span className="prac-topbar__title">{mock.title}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">{totalAnswered}/{totalQs}</span>
          <Timer totalSecs={mock.timeMinutes * 60} onExpire={() => { void goSubmit(); }} />
        </div>
      </header>

      <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} labels={SKILL_LABEL} />

      {wordScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Complete the Words por un fallo técnico. Esas respuestas no se convirtieron en errores académicos y siguen guardadas localmente. Revisa el bloque y vuelve a finalizar.
        </div>
      )}
      {readingScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Read in Daily Life y Academic Passage por un fallo técnico. Tus selecciones siguen guardadas y ninguna se contó como error académico. Vuelve a finalizar para reintentar.
        </div>
      )}
      {buildScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Build a Sentence por un fallo técnico. Tus órdenes siguen guardados y ninguno se contó como error académico. Vuelve a finalizar para reintentar.
        </div>
      )}

      <div className="ielts-exam-body">
        {activeSections.map((sec, i) => (
          <SectionPanel key={`${sec.part}-${i}`} section={sec} ans={ans} handlers={handlers} />
        ))}
        <div className="ielts-exam-footer">
          <div className="ielts-skill-nav__row">
            {skills.map((sk, i) => {
              if (sk !== activeSkill) return null;
              const prev = skills[i - 1], next = skills[i + 1];
              return (
                <span key={sk} style={{ display: 'flex', gap: '0.75rem' }}>
                  {prev && <button onClick={() => setActiveSkill(prev)} className="btn btn-ghost btn-sm">← {SKILL_LABEL[prev]}</button>}
                  {next
                    ? <button onClick={() => setActiveSkill(next)} className="btn btn-sm">{SKILL_LABEL[next]} →</button>
                    : <button disabled={scoringWords} onClick={() => {
                        if (unanswered > 0 && !confirm(`${unanswered} ítem(s) sin responder. ¿Finalizar?`)) return;
                        void goSubmit();
                      }} className="btn">{scoringWords ? 'Cerrando bloque…' : 'Finalizar examen'}</button>}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal CSS for the 2026-only task types (supplements ielts-*/prac-* in globals.css).
const T26_CSS = `
  .t26-stimulus { white-space: pre-wrap; font-family: inherit; background: var(--surface,#f6f7f9); border:1px solid var(--line-soft,#e3e6ea); border-radius:8px; padding:.75rem 1rem; margin:.5rem 0; line-height:1.6; }
  .t26-word .ielts-form__body { line-height: 2.4; }
  .t26-word__wrap { display:inline-flex; align-items:baseline; margin:0 2px; white-space:nowrap; }
  .t26-word__num { align-self:flex-start; color:var(--muted,#687386); font:700 .58rem/1.4 var(--mono,monospace); margin-right:1px; }
  .t26-word__given { font-weight:600; }
  .t26-word__input { border:none; border-bottom:2px solid var(--exam-color,#0a56c4); border-radius:3px 3px 0 0; background:rgba(10,86,196,.06); color:var(--ink,#1a2230); font:inherit; text-align:left; padding:0 2px; }
  .t26-word__input:focus-visible { outline:3px solid #f59e0b; outline-offset:3px; }
  .t26-word__input[aria-invalid="true"] { border-bottom-color:#b42318; background:rgba(180,35,24,.08); }
  .t26-sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  .t26-technical { margin:.8rem auto 0; max-width:1100px; padding:.8rem 1rem; border-left:4px solid #b42318; background:rgba(180,35,24,.08); color:var(--ink,#1a2230); font-size:.88rem; line-height:1.55; }
  .t26-section-note { margin:.7rem 0; padding:.65rem .75rem; border-left:3px solid var(--exam-color,#0a56c4); background:rgba(10,86,196,.06); color:var(--ink,#1a2230); font-size:.86rem; line-height:1.55; }
  .t26-reading-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #047857; border-radius:12px; background:rgba(4,120,87,.07); color:var(--ink,#1a2230); }
  .t26-build-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #047857; border-radius:12px; background:rgba(4,120,87,.07); color:var(--ink,#1a2230); }
  .t26-writing-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #1a4fcc; border-radius:12px; background:rgba(26,79,204,.07); color:var(--ink,#1a2230); }
  .t26-reading-report h2, .t26-build-report h2, .t26-writing-report h2 { margin:0 0 .5rem; font-size:1.1rem; }
  .t26-reading-report p, .t26-build-report p, .t26-writing-report p { margin:.35rem 0; line-height:1.5; }
  .t26-build__answer { min-height:48px; border:1px dashed var(--line-soft,#cbd2da); border-radius:10px; padding:.6rem; display:flex; flex-wrap:wrap; gap:.4rem; align-items:center; margin:.5rem 0; }
  .t26-build__placeholder { color:var(--muted,#8a94a3); font-size:.9rem; }
  .t26-build__bank { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.5rem; }
  .t26-build__tile { font:inherit; padding:.4rem .8rem; border-radius:8px; border:1px solid var(--exam-color,#0a56c4); background:rgba(10,86,196,.06); color:var(--ink,#1a2230); cursor:pointer; }
  .t26-build__tile--used { opacity:.35; cursor:default; }
  .t26-build__tile--placed { background:var(--exam-color,#0a56c4); color:#fff; }
  .t26-build__hint { font-size:.85rem; color:var(--muted,#8a94a3); margin:.25rem 0 .5rem; }
  .t26-repeat__instruction { font-size:.9rem; margin:.6rem 0; }
  .t26-repeat__target { font-size:1.05rem; font-weight:600; margin-top:.5rem; padding:.6rem .9rem; background:rgba(10,86,196,.06); border-radius:8px; }
  @media (max-width:420px) { .t26-word .ielts-form__body { line-height:2.8; overflow-wrap:normal; } }
  @media (prefers-reduced-motion:reduce) { .t26-word *, .t26-technical { transition-duration:.01ms!important; animation-duration:.01ms!important; scroll-behavior:auto!important; } }
`;
