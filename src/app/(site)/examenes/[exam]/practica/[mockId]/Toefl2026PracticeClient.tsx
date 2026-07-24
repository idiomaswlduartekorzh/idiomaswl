'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ExamReport } from '@/components/ExamReport';
import { Timer, SkillTabs, AudioPlayer } from '@/components/exam-runner/primitives';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, WriteQuestion, SpeakQuestion,
  WordCompleteQuestion, SentenceBuildQuestion, RepeatQuestion,
} from '@/data/mocks/types';

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
  write: Record<string, string>;                      // qid -> essay
  speak: Record<string, string>;                      // qid -> notes
}
type BandMap = Record<string, number>;                // section-key -> self-band 1–6

const EMPTY: Answers = { mcq: {}, word: {}, build: {}, write: {}, speak: {} };

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

function WordCompleteView({ q, values, onChange }: {
  q: WordCompleteQuestion; values: Record<number, string>; onChange: (num: number, v: string) => void;
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
            return (
              <span key={i} className="t26-word__wrap">
                {blank?.prefix && <span className="t26-word__given">{blank.prefix}</span>}
                <input
                  type="text"
                  className="t26-word__input"
                  value={values[num] ?? ''}
                  onChange={e => onChange(num, e.target.value)}
                  placeholder={'_'.repeat(Math.max(2, blank ? blank.answer.length - (blank.prefix?.length ?? 0) - (blank.suffix?.length ?? 0) : 3))}
                  aria-label={`Blank ${num}`}
                  style={{ width: `${Math.max(4, blank ? blank.answer.length : 6)}ch` }}
                />
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
  return (
    <div className="ielts-write">
      <div className="ielts-group__label">
        <span className="ielts-group__range">{q.stimulusLabel ?? `Task ${q.taskNumber}`}</span>
      </div>
      <div className="ielts-write__stimulus">{q.stimulus.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>
      <p className="ielts-write__prompt">{q.text}</p>
      <textarea
        className="ielts-write__area"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Escribe tu respuesta aquí…"
        rows={10}
      />
      <div className="ielts-write__meta">
        <span className={words < q.minWords ? 'ielts-write__wc--low' : 'ielts-write__wc'}>
          {words} palabras {words < q.minWords ? `(recomendado ≥ ${q.minWords})` : ''}
        </span>
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
      return <WordCompleteView key={q.id} q={q} values={ans.word[q.id] ?? {}} onChange={(n, v) => h.onWord(q.id, n, v)} />;
    case 'sentencebuild':
      return <SentenceBuildView key={q.id} q={q} order={ans.build[q.id] ?? []} onChange={o => h.onBuild(q.id, o)} />;
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
        const idx = (q.type === 'mcq' || q.type === 'dialog') ? ++mcqCounter : mcqCounter;
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
          {body}
        </div>
      </div>
    );
  }
  return (
    <div className="ielts-section-panel">
      <p className="ielts-section-panel__title">{section.title}</p>
      <p className="ielts-section-panel__instructions">{section.instructions}</p>
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

// ── Results ──────────────────────────────────────────────────────────────────────

function computeReadingListening(mock: MockExam, skill: string, ans: Answers) {
  let correct = 0, total = 0;
  for (const sec of getSkillSections(mock, skill)) {
    for (const q of sec.questions) {
      if (q.type === 'mcq' || q.type === 'dialog') {
        total++; if (ans.mcq[q.id] === q.answer) correct++;
      } else if (q.type === 'wordcomplete') {
        for (const b of q.blanks) {
          total++;
          if (norm(ans.word[q.id]?.[b.num] ?? '') === norm(b.answer)) correct++;
        }
      }
    }
  }
  return { correct, total };
}

function Results({ mock, exam, ans, writeBands, speakBands, onRetry }: {
  mock: MockExam; exam: Exam; ans: Answers; writeBands: BandMap; speakBands: BandMap; onRetry: () => void;
}) {
  const r = computeReadingListening(mock, 'reading', ans);
  const l = computeReadingListening(mock, 'listening', ans);
  const rBand = pctToBand(r.correct, r.total);
  const lBand = pctToBand(l.correct, l.total);

  // Writing: Build a Sentence (machine) blended with self-assessed Email + Discussion.
  const buildQs = getSkillSections(mock, 'writing').flatMap(s => s.questions).filter(q => q.type === 'sentencebuild') as SentenceBuildQuestion[];
  let bCorrect = 0;
  for (const q of buildQs) {
    const order = ans.build[q.id] ?? [];
    const built = order.map(i => q.tiles[i]);
    if (built.length === q.answer.length && built.every((w, i) => norm(w) === norm(q.answer[i]))) bCorrect++;
  }
  const buildBand = buildQs.length ? pctToBand(bCorrect, buildQs.length) : 0;
  const writeSelfBands = Object.values(writeBands).filter(b => b > 0);
  const writeSelfAvg = writeSelfBands.length ? writeSelfBands.reduce((a, b) => a + b, 0) / writeSelfBands.length : 0;
  // Blueprint weighting: Build a Sentence is 10 machine items; Email + Discussion are the
  // constructed tasks. Blend machine band with self-assessed band evenly when both exist.
  const wBand = buildQs.length && writeSelfBands.length
    ? Math.round(((buildBand + writeSelfAvg) / 2) * 2) / 2
    : (writeSelfBands.length ? Math.round(writeSelfAvg * 2) / 2 : buildBand);

  const speakSelfBands = Object.values(speakBands).filter(b => b > 0);
  const spBand = speakSelfBands.length ? Math.round((speakSelfBands.reduce((a, b) => a + b, 0) / speakSelfBands.length) * 2) / 2 : 0;

  const skills = [
    ...(r.total ? [{ skill: 'Reading', score: rBand, max: 6, label: `Band ${rBand}`, raw: `${r.correct}/${r.total}` }] : []),
    ...(l.total ? [{ skill: 'Listening', score: lBand, max: 6, label: `Band ${lBand}`, raw: `${l.correct}/${l.total}` }] : []),
    ...(wBand ? [{ skill: 'Writing', score: wBand, max: 6, label: `Band ${wBand}` }] : []),
    ...(spBand ? [{ skill: 'Speaking', score: spBand, max: 6, label: `Band ${spBand}` }] : []),
  ];
  const total = overallBand([rBand, lBand, wBand, spBand]);
  // Transition 0–120 comparable score (approx): each band → /6*30 per section, summed.
  const comparable = Math.round(([rBand, lBand, wBand, spBand].filter(b => b > 0).reduce((a, b) => a + (b / 6) * 30, 0)));

  return (
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
  );
}

// ── Handlers type ────────────────────────────────────────────────────────────────

interface Handlers {
  onMCQ: (id: string, i: number) => void;
  onWord: (id: string, num: number, v: string) => void;
  onBuild: (id: string, order: number[]) => void;
  onWrite: (id: string, v: string) => void;
  onSpeak: (id: string, v: string) => void;
}

// ── Main component ────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'assess-write' | 'assess-speak' | 'results';

export default function Toefl2026PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const skills = SKILL_ORDER.filter(sk => mock.sections.some(s => s.skill === sk));
  const [activeSkill, setActiveSkill] = useState(skills[0] ?? 'reading');
  const [ans, setAns] = useState<Answers>(EMPTY);
  const [writeBands, setWriteBands] = useState<BandMap>({});
  const [speakBands, setSpeakBands] = useState<BandMap>({});

  const handlers: Handlers = {
    onMCQ: useCallback((id, i) => setAns(p => ({ ...p, mcq: { ...p.mcq, [id]: i } })), []),
    onWord: useCallback((id, num, v) => setAns(p => ({ ...p, word: { ...p.word, [id]: { ...(p.word[id] ?? {}), [num]: v } } })), []),
    onBuild: useCallback((id, order) => setAns(p => ({ ...p, build: { ...p.build, [id]: order } })), []),
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
        else if (q.type === 'sentencebuild') { total++; if ((ans.build[q.id] ?? []).length) done++; }
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

  const goSubmit = useCallback(() => {
    if (hasWriteAI) setPhase('assess-write');
    else if (hasSpeak) setPhase('assess-speak');
    else setPhase('results');
  }, [hasWriteAI, hasSpeak]);

  const handleRetry = useCallback(() => {
    setAns(EMPTY); setWriteBands({}); setSpeakBands({});
    setActiveSkill(skills[0] ?? 'reading'); setPhase('intro');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Self-assess phases ──
  if (phase === 'assess-write') {
    const rows = getSkillSections(mock, 'writing').flatMap(s => s.questions)
      .filter(q => q.type === 'write')
      .map(q => ({ key: q.id, label: (q as WriteQuestion).stimulusLabel ?? `Writing task` }));
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <SelfAssessModal title="Writing (Email + Academic Discussion)" rows={rows} bands={writeBands}
          onSave={b => { setWriteBands(b); setPhase(hasSpeak ? 'assess-speak' : 'results'); }}
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
        <Results mock={mock} exam={exam} ans={ans} writeBands={writeBands} speakBands={speakBands} onRetry={handleRetry} />
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
          <Timer totalSecs={mock.timeMinutes * 60} onExpire={goSubmit} />
        </div>
      </header>

      <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} labels={SKILL_LABEL} />

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
                    : <button onClick={() => {
                        if (unanswered > 0 && !confirm(`${unanswered} ítem(s) sin responder. ¿Finalizar?`)) return;
                        goSubmit();
                      }} className="btn">Finalizar examen</button>}
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
  .t26-word__wrap { display:inline-flex; align-items:center; margin:0 2px; }
  .t26-word__given { font-weight:600; }
  .t26-word__input { border:none; border-bottom:2px solid var(--exam-color,#0a56c4); background:transparent; font:inherit; text-align:center; padding:0 2px; outline:none; }
  .t26-build__answer { min-height:48px; border:1px dashed var(--line-soft,#cbd2da); border-radius:10px; padding:.6rem; display:flex; flex-wrap:wrap; gap:.4rem; align-items:center; margin:.5rem 0; }
  .t26-build__placeholder { color:var(--muted,#8a94a3); font-size:.9rem; }
  .t26-build__bank { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.5rem; }
  .t26-build__tile { font:inherit; padding:.4rem .8rem; border-radius:8px; border:1px solid var(--exam-color,#0a56c4); background:rgba(10,86,196,.06); color:var(--ink,#1a2230); cursor:pointer; }
  .t26-build__tile--used { opacity:.35; cursor:default; }
  .t26-build__tile--placed { background:var(--exam-color,#0a56c4); color:#fff; }
  .t26-build__hint { font-size:.85rem; color:var(--muted,#8a94a3); margin:.25rem 0 .5rem; }
  .t26-repeat__instruction { font-size:.9rem; margin:.6rem 0; }
  .t26-repeat__target { font-size:1.05rem; font-weight:600; margin-top:.5rem; padding:.6rem .9rem; background:rgba(10,86,196,.06); border-radius:8px; }
`;
