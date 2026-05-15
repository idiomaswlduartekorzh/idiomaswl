'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExamReport } from '@/components/ExamReport';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, FillQuestion, WriteQuestion, SpeakQuestion,
  FormGroupQuestion, TableGroupQuestion, TableCell,
  MultiSelectQuestion, MatchingGroupQuestion,
} from '@/data/mocks/types';

// ── Band tables ───────────────────────────────────────────────────────────────

const L_BAND: [number, number][] = [
  [39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],
  [23,6],[20,5.5],[16,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,1],
];
const R_BAND: [number, number][] = [
  [39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],
  [23,6],[19,5.5],[15,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,1],
];

function rawToBand(raw: number, table: [number, number][]): number {
  for (const [min, band] of table) if (raw >= min) return band;
  return 1;
}
function overallBand(bands: number[]): number {
  return Math.round((bands.reduce((a,b)=>a+b,0)/bands.length)*2)/2;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  return `${Math.floor(secs/60).toString().padStart(2,'0')}:${(secs%60).toString().padStart(2,'0')}`;
}
function countWords(t: string) { return t.trim().split(/\s+/).filter(Boolean).length; }
function norm(s: string) { return s.trim().toLowerCase().replace(/[.,!?;:'"]/g,''); }
function isCorrect(input: string, accepted: string[]) {
  return accepted.some(a => norm(a) === norm(input));
}

const SKILL_ORDER = ['listening','reading','writing','speaking'];
const SKILL_LABEL: Record<string,string> = {
  listening:'Listening', reading:'Reading', writing:'Writing', speaking:'Speaking',
};

function getSkillSections(mock: MockExam, skill: string) {
  return mock.sections.filter(s => s.skill === skill);
}

// ── Answer state types ────────────────────────────────────────────────────────

type FillMap   = Record<string, string>;    // blankKey -> value
type MCQMap    = Record<string, number>;    // questionId -> option index
type MSMap     = Record<string, string[]>;  // questionId -> selected letters[]
type MatchMap  = Record<string, string>;    // `${groupId}-${num}` -> letter
type WriteMap  = Record<string, string>;    // questionId -> text
type SpeakMap  = Record<string, string>;    // questionId -> notes
type BandMap   = Record<string, number>;    // questionId -> band

function blankKey(groupId: string, num: number) { return `${groupId}__${num}`; }

// ── Timer ─────────────────────────────────────────────────────────────────────

function Timer({ totalSecs, onExpire }: { totalSecs: number; onExpire: () => void }) {
  const [secs, setSecs] = useState(totalSecs);
  const ref = useRef(onExpire); ref.current = onExpire;
  useEffect(() => {
    const id = setInterval(() => setSecs(p => {
      if (p <= 1) { clearInterval(id); ref.current(); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const urgent = secs < 300;
  return (
    <div className={`prac-timer${urgent?' prac-timer--urgent':''}`}>
      <span className="prac-timer__label">Tiempo</span>
      <span className="prac-timer__val">{formatTime(secs)}</span>
      <div className="prac-timer__bar">
        <div className="prac-timer__fill" style={{width:`${(secs/totalSecs)*100}%`,background:urgent?'#c8202e':'var(--accent)'}}/>
      </div>
    </div>
  );
}

// ── Audio player ──────────────────────────────────────────────────────────────

function AudioPlayer({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function play() {
    if (!audioRef.current || started) return;
    audioRef.current.play();
    setStarted(true);
  }

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  if (!src) return null;

  return (
    <div className="ielts-audio">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setDone(true)}
      />
      <div className="ielts-audio__player">
        <button
          className={`ielts-audio__btn${started ? ' ielts-audio__btn--done' : ''}`}
          onClick={play}
          aria-label="Play"
          disabled={started}
        >
          {done ? '✓' : started ? '▶' : '▶'}
        </button>
        <div className="ielts-audio__info">
          <span className="ielts-audio__label">
            {done ? 'IELTS Listening — completed' : started ? 'IELTS Listening — playing…' : 'IELTS Listening — press play to begin'}
          </span>
          <div className="ielts-audio__progress-wrap">
            <div
              className="ielts-audio__progress-bar"
              style={{ '--pct': `${pct}%` } as React.CSSProperties}
            />
            <span className="ielts-audio__time">{formatTime(Math.floor(current))} / {formatTime(Math.floor(duration))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Form-group question renderer ──────────────────────────────────────────────

function renderFormTemplate(
  template: string,
  blanks: FormGroupQuestion['blanks'],
  fills: FillMap,
  groupId: string,
  onChange: (key: string, val: string) => void,
) {
  const blanksByNum = Object.fromEntries(blanks.map(b => [b.num, b]));

  // Split template into segments around {{n}} markers
  const parts = template.split(/(\{\{\d+\}\})/);

  return (
    <div className="ielts-form__body">
      {parts.map((part, i) => {
        const match = part.match(/^\{\{(\d+)\}\}$/);
        if (match) {
          const num = parseInt(match[1]);
          const blank = blanksByNum[num];
          const key = blankKey(groupId, num);
          return (
            <span key={i} className="ielts-form__blank-wrap">
              <span className="ielts-form__blank-num">{num}</span>
              <input
                type="text"
                className="ielts-form__input"
                value={fills[key] ?? ''}
                onChange={e => onChange(key, e.target.value)}
                placeholder="..."
                style={{ width: `${Math.max(6, (blank?.maxWords ?? 1) * 3.5)}ch` }}
              />
            </span>
          );
        }
        // Render newlines and bullet points as proper elements
        return (
          <span key={i}>
            {part.split('\n').map((line, li, arr) => (
              <span key={li}>
                {line.startsWith('•') ? (
                  <span className="ielts-form__bullet">{line}</span>
                ) : (
                  <span>{line}</span>
                )}
                {li < arr.length - 1 && <br />}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function FormGroupView({
  q, fills, onChange,
}: { q: FormGroupQuestion; fills: FillMap; onChange: (k: string, v: string) => void }) {
  return (
    <div className="ielts-form">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {q.qRange[0]}–{q.qRange[1]}</span>
        {q.groupLabel.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
      {q.imageUrl && (
        <div className="ielts-form__diagram">
          <Image src={q.imageUrl} alt={q.imageAlt ?? 'Diagram'} width={700} height={400} style={{width:'100%',height:'auto'}} />
        </div>
      )}
      {q.title && <p className="ielts-form__title">{q.title}</p>}
      {q.example && <p className="ielts-form__example"><em>Example</em><br />{q.example}</p>}
      {renderFormTemplate(q.template, q.blanks, fills, q.id, onChange)}
    </div>
  );
}

// ── Table-group question renderer ─────────────────────────────────────────────

function TableGroupView({
  q, fills, onChange,
}: { q: TableGroupQuestion; fills: FillMap; onChange: (k: string, v: string) => void }) {
  return (
    <div className="ielts-tableq">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {q.qRange[0]}–{q.qRange[1]}</span>
        {q.groupLabel.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
      <div className="ielts-tableq__scroll">
        <table className="ielts-tableq__table">
          <thead>
            <tr>{q.headers.map((h,i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {q.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  if (typeof cell === 'string') return <td key={ci}>{cell}</td>;
                  const c = cell as Exclude<TableCell, string>;
                  const key = blankKey(q.id, c.num);
                  return (
                    <td key={ci} className="ielts-tableq__cell--blank">
                      <span className="ielts-form__blank-num">{c.num}</span>
                      <input
                        type="text"
                        className="ielts-form__input"
                        value={fills[key] ?? ''}
                        onChange={e => onChange(key, e.target.value)}
                        placeholder="..."
                        style={{ width: `${Math.max(6, (c.maxWords ?? 1) * 3.5)}ch` }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Multi-select question renderer ────────────────────────────────────────────

function MultiSelectView({
  q, selected, onToggle,
}: { q: MultiSelectQuestion; selected: string[]; onToggle: (letter: string) => void }) {
  return (
    <div className="ielts-multiselect">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {q.qRange[0]}–{q.qRange[1]}</span>
        <p>{q.text}</p>
        <p className="ielts-multiselect__hint">Choose {q.selectCount === 2 ? 'TWO' : q.selectCount} letters, {q.options[0].letter}–{q.options[q.options.length-1].letter}.</p>
      </div>
      <div className="ielts-multiselect__opts">
        {q.options.map(opt => {
          const checked = selected.includes(opt.letter);
          const overlimit = !checked && selected.length >= q.selectCount;
          return (
            <label
              key={opt.letter}
              className={`ielts-multiselect__opt${checked?' ielts-multiselect__opt--checked':''}${overlimit?' ielts-multiselect__opt--disabled':''}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={overlimit}
                onChange={() => onToggle(opt.letter)}
              />
              <span className="ielts-multiselect__letter">{opt.letter}</span>
              <span className="ielts-multiselect__text">{opt.text}</span>
            </label>
          );
        })}
      </div>
      <p className="ielts-multiselect__count">Selected: {selected.length}/{q.selectCount}</p>
    </div>
  );
}

// ── MCQ renderer (includes TFNG / YES-NO-NG) ─────────────────────────────────

function MCQView({
  q, index, selected, onChange,
}: { q: MCQQuestion; index: number; selected: number|undefined; onChange: (i: number) => void }) {
  const isTFNG = q.options[0] === 'TRUE' || q.options[0] === 'YES';
  return (
    <div className={`ielts-mcq${isTFNG?' ielts-mcq--tfng':''}`}>
      <div className="ielts-mcq__num">{index}.</div>
      <div className="ielts-mcq__body">
        <p className="ielts-mcq__text">{q.text}</p>
        <div className={isTFNG ? 'ielts-tfng__opts' : 'prac-options'}>
          {q.options.map((opt, i) => (
            isTFNG ? (
              <label key={i} className={`ielts-tfng__opt${selected===i?' ielts-tfng__opt--selected':''}`}>
                <input type="radio" name={q.id} checked={selected===i} onChange={()=>onChange(i)} />
                {opt}
              </label>
            ) : (
              <button
                key={i}
                onClick={() => onChange(i)}
                className={`prac-option${selected===i?' prac-option--selected':''}`}
              >
                <span className="prac-option__letter">{String.fromCharCode(65+i)}</span>
                <span className="prac-option__text">{opt}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Matching renderer ─────────────────────────────────────────────────────────

function MatchingView({
  q, matchMap, onChange,
}: { q: MatchingGroupQuestion; matchMap: MatchMap; onChange: (key: string, val: string) => void }) {
  return (
    <div className="ielts-matching">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {q.qRange[0]}–{q.qRange[1]}</span>
        {q.groupLabel && q.groupLabel.split('\n').map((line,i) => <p key={i}>{line}</p>)}
      </div>
      <div className="ielts-matching__endings">
        {q.endings.map(e => (
          <div key={e.letter} className="ielts-matching__ending">
            <span className="ielts-matching__letter">{e.letter}</span>
            <span>{e.text}</span>
          </div>
        ))}
      </div>
      <div className="ielts-matching__items">
        {q.items.map(item => {
          const key = blankKey(q.id, item.num);
          const val = matchMap[key] ?? '';
          return (
            <div key={item.num} className="ielts-matching__row">
              <span className="ielts-form__blank-num">{item.num}</span>
              <p className="ielts-matching__stem">{item.stem}</p>
              <select
                className="ielts-matching__select"
                value={val}
                onChange={e => onChange(key, e.target.value)}
              >
                <option value="">-- choose --</option>
                {q.endings.map(e => (
                  <option key={e.letter} value={e.letter}>{e.letter}</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Write renderer ────────────────────────────────────────────────────────────

function WriteView({
  q, value, onChange,
}: { q: WriteQuestion; value: string; onChange: (v: string) => void }) {
  const words = countWords(value);
  const ok = words >= q.minWords;
  const hasImage = !!q.imageUrl;
  return (
    <div className="ielts-write">
      <div className="ielts-write__header">
        <span className="ielts-group__range">Writing Task {q.taskNumber}</span>
        <span className="ielts-write__min">Minimum {q.minWords} words</span>
      </div>

      {/* Task 1: show chart image + caption natively */}
      {hasImage && (
        <div className="ielts-write__chart-box">
          {q.stimulusLabel && (
            <p className="ielts-write__chart-caption">{q.stimulusLabel}</p>
          )}
          <Image
            src={q.imageUrl!}
            alt={q.imageAlt ?? 'Writing task chart'}
            width={720}
            height={420}
            className="ielts-write__chart-img"
            unoptimized
          />
        </div>
      )}

      {/* Task 2 or no image: show full stimulus text */}
      {!hasImage && q.stimulus && (
        <div className="ielts-write__stimulus">
          {q.stimulusLabel && <p className="ielts-write__stim-label">{q.stimulusLabel}</p>}
          {q.stimulus.split('\n\n').map((p,i) => <p key={i}>{p}</p>)}
        </div>
      )}

      <div className="ielts-write__instructions">
        {q.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>

      <textarea
        className="ielts-write__textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your response here..."
        rows={18}
      />
      <div className={`ielts-write__wordcount${ok?' ielts-write__wordcount--ok':''}`}>
        {words} / {q.minWords} words {ok ? '✓' : ''}
      </div>
    </div>
  );
}

// ── Speak renderer ────────────────────────────────────────────────────────────

function SpeakView({
  q, notes, onNotes,
}: { q: SpeakQuestion; notes: string; onNotes: (v: string) => void }) {
  const [recState, setRecState] = useState<'idle'|'recording'|'done'>('idle');
  return (
    <div className="ielts-speak">
      <div className="ielts-write__header">
        <span className="ielts-group__range">Speaking Part {q.partNumber}</span>
      </div>
      <p className="ielts-speak__prompt">{q.text}</p>
      {q.cueCard && (
        <div className="ielts-speak__cue">
          <p className="ielts-speak__cue-label">Cue Card</p>
          <pre className="ielts-speak__cue-text">{q.cueCard}</pre>
        </div>
      )}
      {q.followUp && q.followUp.length > 0 && (
        <div className="ielts-speak__followups">
          <p className="ielts-speak__followup-label">Discussion questions:</p>
          <ul>{q.followUp.map((f,i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}

      {/* Record button — UI placeholder, assessment coming soon */}
      <div className="ielts-speak__record-row">
        <button
          className={`ielts-speak__rec-btn ielts-speak__rec-btn--${recState}`}
          onClick={() => setRecState(s => s === 'idle' ? 'recording' : s === 'recording' ? 'done' : 'idle')}
        >
          {recState === 'idle' && <><span className="ielts-speak__rec-dot" />Record response</>}
          {recState === 'recording' && <><span className="ielts-speak__rec-dot ielts-speak__rec-dot--live" />Stop recording</>}
          {recState === 'done' && <><span className="ielts-speak__rec-dot ielts-speak__rec-dot--done" />Re-record</>}
        </button>
        {recState === 'done' && (
          <span className="ielts-speak__rec-status">Response recorded — examiner assessment coming soon</span>
        )}
        {recState === 'idle' && (
          <span className="ielts-speak__rec-hint">Audio assessment coming soon</span>
        )}
      </div>

      <div className="ielts-speak__notes">
        <p className="ielts-speak__notes-label">Preparation notes (optional):</p>
        <textarea className="ielts-write__textarea" rows={4} value={notes} onChange={e=>onNotes(e.target.value)} placeholder="Jot down key ideas..." />
      </div>
    </div>
  );
}

// ── Section panel ─────────────────────────────────────────────────────────────

type AllAnswers = {
  fills: FillMap; mcq: MCQMap; ms: MSMap; match: MatchMap;
  write: WriteMap; speak: SpeakMap;
};

function renderQuestion(
  q: Question,
  idx: number,
  ans: AllAnswers,
  handlers: {
    onFill: (k:string,v:string)=>void;
    onMCQ: (id:string,i:number)=>void;
    onMS: (id:string,letter:string)=>void;
    onMatch: (k:string,v:string)=>void;
    onWrite: (id:string,v:string)=>void;
    onSpeak: (id:string,v:string)=>void;
  },
) {
  switch (q.type) {
    case 'formgroup':
      return <FormGroupView key={q.id} q={q as FormGroupQuestion} fills={ans.fills} onChange={handlers.onFill} />;
    case 'tablegroup':
      return <TableGroupView key={q.id} q={q as TableGroupQuestion} fills={ans.fills} onChange={handlers.onFill} />;
    case 'multiselect':
      return <MultiSelectView key={q.id} q={q as MultiSelectQuestion} selected={ans.ms[q.id]??[]} onToggle={l=>handlers.onMS(q.id,l)} />;
    case 'matching':
      return <MatchingView key={q.id} q={q as MatchingGroupQuestion} matchMap={ans.match} onChange={handlers.onMatch} />;
    case 'mcq':
    case 'dialog':
      return <MCQView key={q.id} q={q as MCQQuestion} index={idx+1} selected={ans.mcq[q.id]} onChange={i=>handlers.onMCQ(q.id,i)} />;
    case 'write':
      return <WriteView key={q.id} q={q as WriteQuestion} value={ans.write[q.id]??''} onChange={v=>handlers.onWrite(q.id,v)} />;
    case 'speak':
      return <SpeakView key={q.id} q={q as SpeakQuestion} notes={ans.speak[q.id]??''} onNotes={v=>handlers.onSpeak(q.id,v)} />;
    default:
      return null;
  }
}

function SectionPanel({
  section, ans, handlers,
}: {
  section: MockSection;
  ans: AllAnswers;
  handlers: Parameters<typeof renderQuestion>[3];
}) {
  const hasPassage = !!section.passage;

  // Simple numbered counter for MCQ-like questions in this section
  let mcqCounter = 0;

  const questionsEl = (
    <div className="ielts-panel__questions">
      {section.questions.map(q => {
        let idx = 0;
        if (q.type === 'mcq' || q.type === 'dialog') { idx = mcqCounter; mcqCounter++; }
        return renderQuestion(q, idx, ans, handlers);
      })}
    </div>
  );

  if (hasPassage) {
    return (
      <div className="ielts-split">
        <div className="ielts-split__passage">
          <p className="ielts-split__passage-label">Reading Passage</p>
          <div className="ielts-split__passage-text">
            {section.passage!.split('\n\n').map((para,i)=><p key={i}>{para}</p>)}
          </div>
        </div>
        <div className="ielts-split__right">
          <p className="ielts-split__section-title">{section.title}</p>
          <p className="ielts-split__instructions">{section.instructions}</p>
          {questionsEl}
        </div>
      </div>
    );
  }

  return (
    <div className="ielts-section-panel">
      <p className="ielts-section-panel__title">{section.title}</p>
      <p className="ielts-section-panel__instructions">{section.instructions}</p>
      {/* transcript data preserved in section.transcript — hidden in exam UI */}
      {questionsEl}
    </div>
  );
}

// ── Skill tabs ────────────────────────────────────────────────────────────────

function SkillTabs({ skills, active, onSelect, progress }: {
  skills: string[]; active: string; onSelect: (s:string)=>void;
  progress: Record<string,{done:number;total:number}>;
}) {
  return (
    <div className="ielts-skill-tabs">
      {skills.map(skill => {
        const p = progress[skill];
        return (
          <button key={skill} onClick={()=>onSelect(skill)}
            className={`ielts-skill-tab${active===skill?' ielts-skill-tab--active':''}`}>
            <span>{SKILL_LABEL[skill]??skill}</span>
            {p && <span className="ielts-skill-tab__count">{p.done}/{p.total}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

const BAND_OPTIONS = [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9] as const;

function countGroupAnswers(section: MockSection, ans: AllAnswers): { done: number; total: number } {
  let done = 0, total = 0;
  for (const q of section.questions) {
    if (q.type === 'formgroup') {
      const fg = q as FormGroupQuestion;
      total += fg.blanks.length;
      done += fg.blanks.filter(b => (ans.fills[blankKey(fg.id,b.num)]??'').trim()).length;
    } else if (q.type === 'tablegroup') {
      const tg = q as TableGroupQuestion;
      const cells = tg.rows.flatMap(r=>r).filter(c=>typeof c!=='string') as Exclude<import('@/data/mocks/types').TableCell,string>[];
      total += cells.length;
      done += cells.filter(c=>(ans.fills[blankKey(tg.id,c.num)]??'').trim()).length;
    } else if (q.type === 'multiselect') {
      total += 1; // counts as one "question answered" when at least one selected
      if ((ans.ms[q.id]??[]).length>0) done++;
    } else if (q.type === 'matching') {
      const mg = q as MatchingGroupQuestion;
      total += mg.items.length;
      done += mg.items.filter(item=>(ans.match[blankKey(mg.id,item.num)]??'')).length;
    } else if (q.type === 'mcq' || q.type === 'dialog') {
      total++; if (ans.mcq[q.id]!==undefined) done++;
    } else if (q.type === 'write') {
      total++; if ((ans.write[q.id]??'').trim()) done++;
    } else if (q.type === 'speak') {
      total++; done++;
    }
  }
  return { done, total };
}

function scoreSection(section: MockSection, ans: AllAnswers): number {
  let correct = 0;
  for (const q of section.questions) {
    if (q.type === 'formgroup') {
      const fg = q as FormGroupQuestion;
      for (const b of fg.blanks) if (isCorrect(ans.fills[blankKey(fg.id,b.num)]??'',b.answers)) correct++;
    } else if (q.type === 'tablegroup') {
      const tg = q as TableGroupQuestion;
      for (const row of tg.rows) for (const cell of row) {
        if (typeof cell!=='string' && isCorrect(ans.fills[blankKey(tg.id,cell.num)]??'',cell.answers)) correct++;
      }
    } else if (q.type === 'multiselect') {
      const ms = q as MultiSelectQuestion;
      const sel = ans.ms[ms.id]??[];
      const correct_ms = ms.answers.every(a=>sel.includes(a)) && sel.every(s=>ms.answers.includes(s));
      if (correct_ms) correct += ms.selectCount;
    } else if (q.type === 'matching') {
      const mg = q as MatchingGroupQuestion;
      for (const item of mg.items) if ((ans.match[blankKey(mg.id,item.num)]??'')===item.answer) correct++;
    } else if (q.type === 'mcq' || q.type === 'dialog') {
      const mq = q as MCQQuestion;
      if (ans.mcq[mq.id]===mq.answer) correct++;
    }
  }
  return correct;
}

function SelfAssessModal({ skill, questions, bands, onSave, onCancel }: {
  skill: string;
  questions: (WriteQuestion|SpeakQuestion)[];
  bands: BandMap;
  onSave: (b:BandMap)=>void;
  onCancel: ()=>void;
}) {
  const [local, setLocal] = useState<BandMap>({...bands});
  return (
    <div className="ielts-modal-overlay">
      <div className="ielts-modal">
        <h2 className="ielts-modal__title">Self-assess your {skill}</h2>
        <p className="ielts-modal__sub">Choose a band score (4–9) for each task based on how well you performed.</p>
        {questions.map(q=>(
          <div key={q.id} className="ielts-modal__row">
            <p className="ielts-modal__q">{q.text.slice(0,100)}{q.text.length>100?'...':''}</p>
            <div className="ielts-modal__bands">
              {BAND_OPTIONS.map(b=>(
                <button key={b} onClick={()=>setLocal(p=>({...p,[q.id]:b}))}
                  className={`ielts-modal__band-btn${local[q.id]===b?' ielts-modal__band-btn--active':''}`}>{b}</button>
              ))}
            </div>
          </div>
        ))}
        <div className="ielts-modal__actions">
          <button onClick={onCancel} className="btn btn-ghost">Back</button>
          <button onClick={()=>onSave(local)} className="btn">Save & see results</button>
        </div>
      </div>
    </div>
  );
}

function BandResults({ mock, exam, ans, writeBands, speakBands, onRetry }: {
  mock: MockExam; exam: Exam; ans: AllAnswers;
  writeBands: BandMap; speakBands: BandMap; onRetry: ()=>void;
}) {
  const lSections = getSkillSections(mock,'listening');
  const rSections = getSkillSections(mock,'reading');
  const lCorrect = lSections.reduce((a,s)=>a+scoreSection(s,ans),0);
  const rCorrect = rSections.reduce((a,s)=>a+scoreSection(s,ans),0);

  // count totals for display
  let lTotal=0, rTotal=0;
  for (const s of lSections) lTotal += countGroupAnswers(s,ans).total;
  for (const s of rSections) rTotal += countGroupAnswers(s,ans).total;

  const lBand = rawToBand(lCorrect, L_BAND);
  const rBand = rawToBand(rCorrect, R_BAND);
  const wBand = Object.values(writeBands).length
    ? Object.values(writeBands).reduce((a,b)=>a+b,0)/Object.values(writeBands).length : 5.5;
  const sBand = Object.values(speakBands).length
    ? Object.values(speakBands).reduce((a,b)=>a+b,0)/Object.values(speakBands).length : 5.5;
  const overall = overallBand([lBand,rBand,wBand,sBand]);

  const skillCards = [
    { label:'Listening', band:lBand, detail:`${lCorrect}/${lTotal} correct` },
    { label:'Reading',   band:rBand, detail:`${rCorrect}/${rTotal} correct` },
    { label:'Writing',   band:wBand, detail:'Self-assessed' },
    { label:'Speaking',  band:sBand, detail:'Self-assessed' },
  ];

  const reportData = {
    examName: exam.name,
    examSlug: exam.slug,
    mockTitle: mock.title,
    totalScore: overall,
    totalMax: 9,
    totalLabel: `Overall Band ${overall}`,
    accentColor: exam.color,
    date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }),
    skills: skillCards.map(({ label, band, detail }) => ({
      skill: label,
      score: band,
      max: 9,
      label: `Band ${band}`,
      raw: detail !== 'Self-assessed' ? detail : undefined,
    })),
  };

  return (
    <div className="prac-results">
      <ExamReport
        data={reportData}
        onRetry={onRetry}
        backHref={`/examenes/ielts`}
      />

      <div className="prac-results__review">
        <h2 className="prac-results__review-title">Answer Review</h2>
        {mock.sections.filter(s=>s.skill==='listening'||s.skill==='reading').map(sec=>(
          <div key={sec.part} className="prac-results__section-block">
            <h3 className="prac-results__section-name">{sec.title}</h3>
            {sec.questions.map(q=>{
              if (q.type==='formgroup') {
                const fg=q as FormGroupQuestion;
                return (
                  <div key={fg.id} className="ielts-review__group">
                    <p className="ielts-review__group-label">Questions {fg.qRange[0]}–{fg.qRange[1]}</p>
                    {fg.blanks.map(b=>{
                      const k=blankKey(fg.id,b.num); const val=ans.fills[k]??'';
                      const ok=isCorrect(val,b.answers);
                      return (
                        <div key={b.num} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                          <div className="prac-review-item__header">
                            <span className="prac-review-item__num">Q{b.num}</span>
                            <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                              {ok?'✓ Correct':'✗ Incorrect'}
                            </span>
                          </div>
                          <p className="ielts-review__fill-ans">Your answer: <strong>{val||'(blank)'}</strong></p>
                          {!ok&&<p className="ielts-review__fill-correct">Accepted: {b.answers[0]}</p>}
                        </div>
                      );
                    })}
                  </div>
                );
              }
              if (q.type==='tablegroup') {
                const tg=q as TableGroupQuestion;
                const blanks=tg.rows.flatMap(r=>r).filter(c=>typeof c!=='string') as Exclude<import('@/data/mocks/types').TableCell,string>[];
                return (
                  <div key={tg.id} className="ielts-review__group">
                    <p className="ielts-review__group-label">Questions {tg.qRange[0]}–{tg.qRange[1]}</p>
                    {blanks.map(b=>{
                      const k=blankKey(tg.id,b.num); const val=ans.fills[k]??'';
                      const ok=isCorrect(val,b.answers);
                      return (
                        <div key={b.num} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                          <div className="prac-review-item__header">
                            <span className="prac-review-item__num">Q{b.num}</span>
                            <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                              {ok?'✓ Correct':'✗ Incorrect'}
                            </span>
                          </div>
                          <p className="ielts-review__fill-ans">Your answer: <strong>{val||'(blank)'}</strong></p>
                          {!ok&&<p className="ielts-review__fill-correct">Accepted: {b.answers[0]}</p>}
                        </div>
                      );
                    })}
                  </div>
                );
              }
              if (q.type==='multiselect') {
                const ms=q as MultiSelectQuestion;
                const sel=ans.ms[ms.id]??[];
                const ok=ms.answers.every(a=>sel.includes(a))&&sel.every(s=>ms.answers.includes(s));
                return (
                  <div key={ms.id} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                    <div className="prac-review-item__header">
                      <span className="prac-review-item__num">Q{ms.qRange[0]}–{ms.qRange[1]}</span>
                      <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                        {ok?'✓ Correct':'✗ Incorrect'}
                      </span>
                    </div>
                    <p className="ielts-review__fill-ans">Your answer: <strong>{sel.join(', ')||'(none)'}</strong></p>
                    {!ok&&<p className="ielts-review__fill-correct">Correct: {ms.answers.join(', ')}</p>}
                  </div>
                );
              }
              if (q.type==='matching') {
                const mg=q as MatchingGroupQuestion;
                return (
                  <div key={mg.id} className="ielts-review__group">
                    <p className="ielts-review__group-label">Questions {mg.qRange[0]}–{mg.qRange[1]}</p>
                    {mg.items.map(item=>{
                      const k=blankKey(mg.id,item.num); const val=ans.match[k]??'';
                      const ok=val===item.answer;
                      return (
                        <div key={item.num} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                          <div className="prac-review-item__header">
                            <span className="prac-review-item__num">Q{item.num}</span>
                            <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                              {ok?'✓ Correct':'✗ Incorrect'}
                            </span>
                          </div>
                          <p className="prac-review-item__q">{item.stem}</p>
                          <p className="ielts-review__fill-ans">Your answer: <strong>{val||'(none)'}</strong></p>
                          {!ok&&<p className="ielts-review__fill-correct">Correct: {item.answer}</p>}
                        </div>
                      );
                    })}
                  </div>
                );
              }
              if (q.type==='mcq'||q.type==='dialog') {
                const mq=q as MCQQuestion;
                const userAns=ans.mcq[mq.id];
                const ok=userAns===mq.answer;
                return (
                  <div key={mq.id} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                    <div className="prac-review-item__header">
                      <span className="prac-review-item__num">Q</span>
                      <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                        {ok?'✓ Correct':'✗ Incorrect'}
                      </span>
                    </div>
                    <p className="prac-review-item__q">{mq.text}</p>
                    <div className="prac-review-item__opts">
                      {mq.options.map((opt,oi)=>(
                        <div key={oi} className={`prac-review-opt${oi===mq.answer?' prac-review-opt--correct':''}${oi===userAns&&!ok?' prac-review-opt--wrong':''}`}>
                          <span className="prac-review-opt__letter">{String.fromCharCode(65+oi)}</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>

      <div className="prac-results__actions">
        <button onClick={onRetry} className="btn btn-ghost">Try again</button>
        <Link href={`/examenes/${exam.slug}`} className="btn">Back to IELTS</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro'|'exam'|'self-assess-write'|'self-assess-speak'|'results';

export default function IELTSPracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [activeSkill, setActiveSkill] = useState('listening');
  const [ans, setAns] = useState<AllAnswers>({
    fills:{}, mcq:{}, ms:{}, match:{}, write:{}, speak:{},
  });
  const [writeBands, setWriteBands] = useState<BandMap>({});
  const [speakBands, setSpeakBands] = useState<BandMap>({});

  const skills = SKILL_ORDER.filter(sk => mock.sections.some(s=>s.skill===sk));

  const handlers = {
    onFill: useCallback((k:string,v:string)=>setAns(p=>({...p,fills:{...p.fills,[k]:v}})),[]),
    onMCQ:  useCallback((id:string,i:number)=>setAns(p=>({...p,mcq:{...p.mcq,[id]:i}})),[]),
    onMS:   useCallback((id:string,letter:string)=>setAns(p=>{
      const cur=p.ms[id]??[];
      const next=cur.includes(letter)?cur.filter(l=>l!==letter):[...cur,letter];
      return {...p,ms:{...p.ms,[id]:next}};
    }),[]),
    onMatch:useCallback((k:string,v:string)=>setAns(p=>({...p,match:{...p.match,[k]:v}})),[]),
    onWrite:useCallback((id:string,v:string)=>setAns(p=>({...p,write:{...p.write,[id]:v}})),[]),
    onSpeak:useCallback((id:string,v:string)=>setAns(p=>({...p,speak:{...p.speak,[id]:v}})),[]),
  };

  const progressMap = Object.fromEntries(skills.map(sk=>{
    const sections=getSkillSections(mock,sk);
    let done=0,total=0;
    for (const s of sections) { const p=countGroupAnswers(s,ans); done+=p.done; total+=p.total; }
    return [sk,{done,total}];
  }));

  const handleSubmit = useCallback(()=>{
    const writeQs=getSkillSections(mock,'writing').flatMap(s=>s.questions) as WriteQuestion[];
    const speakQs=getSkillSections(mock,'speaking').flatMap(s=>s.questions) as SpeakQuestion[];
    if (writeQs.length>0) setPhase('self-assess-write');
    else if (speakQs.length>0) setPhase('self-assess-speak');
    else setPhase('results');
  },[mock]);

  const handleRetry = useCallback(()=>{
    setAns({fills:{},mcq:{},ms:{},match:{},write:{},speak:{}});
    setWriteBands({}); setSpeakBands({});
    setActiveSkill('listening'); setPhase('intro');
  },[]);

  if (phase==='self-assess-write') {
    const qs=getSkillSections(mock,'writing').flatMap(s=>s.questions) as WriteQuestion[];
    return (
      <div className="prac-shell">
        <SelfAssessModal skill="Writing" questions={qs} bands={writeBands}
          onSave={b=>{ setWriteBands(b);
            const spQs=getSkillSections(mock,'speaking').flatMap(s=>s.questions);
            if (spQs.length>0) setPhase('self-assess-speak'); else setPhase('results');
          }} onCancel={()=>setPhase('exam')} />
      </div>
    );
  }
  if (phase==='self-assess-speak') {
    const qs=getSkillSections(mock,'speaking').flatMap(s=>s.questions) as SpeakQuestion[];
    return (
      <div className="prac-shell">
        <SelfAssessModal skill="Speaking" questions={qs} bands={speakBands}
          onSave={b=>{ setSpeakBands(b); setPhase('results'); }}
          onCancel={()=>setPhase('exam')} />
      </div>
    );
  }
  if (phase==='results') {
    return (
      <div className="prac-shell">
        <BandResults mock={mock} exam={exam} ans={ans} writeBands={writeBands} speakBands={speakBands} onRetry={handleRetry} />
      </div>
    );
  }

  // Intro
  if (phase==='intro') {
    const totalQ=mock.sections.flatMap(s=>s.questions).length;
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{'--exam-color':exam.color} as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name}</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{skills.length}</span><span className="prac-intro__stat-lbl">Sections</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{mock.timeMinutes}</span><span className="prac-intro__stat-lbl">Minutes</span></div>
          </div>
          <div className="prac-intro__sections">
            {mock.sections.map(sec=>(
              <div key={sec.part} className="prac-intro__section">
                <span className="prac-intro__section-part">{sec.skill?SKILL_LABEL[sec.skill]:''}</span>
                <span className="prac-intro__section-title">{sec.title.split('—')[1]?.trim()??sec.title}</span>
                <span className="prac-intro__section-q">{sec.questions.length} groups</span>
              </div>
            ))}
          </div>
          <div className="prac-intro__tips">
            <p className="prac-intro__tips-title">Before you start</p>
            <ul>
              <li>Navigate between <strong>Listening</strong>, <strong>Reading</strong>, <strong>Writing</strong> and <strong>Speaking</strong> using the skill tabs above.</li>
              <li>Listening: a transcript is available to simulate the audio experience.</li>
              <li>Reading: passages appear side-by-side with questions.</li>
              <li>Writing &amp; Speaking: self-assess your band score at the end.</li>
            </ul>
          </div>
          <button onClick={()=>setPhase('exam')} className="btn" style={{fontSize:'1.1rem',padding:'0.9rem 2.5rem'}}>Start exam</button>
          <Link href={`/examenes/${exam.slug}`} style={{color:'var(--muted)',fontSize:'0.9rem',marginTop:'1rem',display:'block'}}>Back to IELTS</Link>
        </div>
      </div>
    );
  }

  // Exam
  const activeSections = getSkillSections(mock, activeSkill);
  const totalAnswered = Object.values(progressMap).reduce((a,p)=>a+p.done,0);
  const totalQs = Object.values(progressMap).reduce((a,p)=>a+p.total,0);
  const unanswered = totalQs - totalAnswered;

  return (
    <div className="prac-shell prac-shell--exam">
      <header className="prac-topbar" style={{'--exam-color':exam.color} as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href={`/examenes/${exam.slug}`} className="prac-topbar__back">IELTS</Link>
          <span className="prac-topbar__title">{mock.title}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">{totalAnswered}/{totalQs} answered</span>
          <Timer totalSecs={mock.timeMinutes*60} onExpire={handleSubmit} />
        </div>
      </header>

      <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} />

      <div className="ielts-exam-body">
        {activeSkill === 'listening' && (
          <div className="ielts-audio-sticky">
            <AudioPlayer src={mock.sections.find(s=>s.skill==='listening')?.audioUrl} />
          </div>
        )}
        {activeSections.map(sec=>(
          <SectionPanel key={sec.part} section={sec} ans={ans} handlers={handlers} />
        ))}

        <div className="ielts-exam-footer">
          <div className="ielts-skill-nav__row">
            {skills.map((sk,i)=>{
              if (sk!==activeSkill) return null;
              const prev=skills[i-1], next=skills[i+1];
              return (
                <span key={sk} style={{display:'flex',gap:'0.75rem'}}>
                  {prev && <button onClick={()=>setActiveSkill(prev)} className="btn btn-ghost btn-sm">&larr; {SKILL_LABEL[prev]}</button>}
                  {next
                    ? <button onClick={()=>setActiveSkill(next)} className="btn btn-sm">{SKILL_LABEL[next]} &rarr;</button>
                    : <button onClick={()=>{
                        if (unanswered>0&&!confirm(`${unanswered} question(s) unanswered. Finish anyway?`)) return;
                        handleSubmit();
                      }} className="btn">Finish exam</button>
                  }
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
