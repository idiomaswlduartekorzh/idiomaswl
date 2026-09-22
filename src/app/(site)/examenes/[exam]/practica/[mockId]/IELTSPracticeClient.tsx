'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IELTSSummaryReport } from '@/components/labs/IELTSSummaryReport';
import { IELTSWritingReportPanel } from '@/components/labs/IELTSWritingReportPanel';
import { IELTSSubmission } from '@/components/exam-runner/IELTSSubmission';
import PdfDownloadButton from '@/components/practica/PdfDownloadButton';
import { IELTSAnswerDiagram } from '@/components/exam-runner/IELTSAnswerDiagram';
import { getIeltsDiagramLayout } from '@/data/ielts/set1-diagram-layouts';
import { ieltsQuestionNumber } from '@/data/ielts/question-number';
import { displayIeltsSectionInstructions } from '@/data/ielts/listening-instruction-errata';
import { IELTS_CHOICE_PRESENTATION_VERSION } from '@/data/mocks/ielts-choice-presentation';
import {
  IELTSSpeakingRecorder,
  type IeltsSpeakingRecording,
} from '@/components/exam-runner/IELTSSpeakingRecorder';
import { useWritingAssessment } from '@/lib/labs/hooks/useWritingAssessment';
import { getIeltsReviewBlueprint, type IeltsSubmissionReceipt } from '@/lib/ielts/review-blueprint';
import { scoreIeltsObjectiveAnswers, scoreIeltsMultiSelect } from '@/lib/ielts/mock-scoring';
import type { IeltsReadingPracticeResult } from '@/lib/ielts/reading-practice-contract';
import { trackIeltsEvent } from '@/lib/analytics/ielts';
import {
  createIeltsPracticeDraft,
  emptyIeltsPracticeAnswers,
  ieltsPracticeDraftKey,
  parseIeltsPracticeDraft,
  type IeltsPracticeAnswers,
} from '@/lib/ielts/practice-state';
import {
  Timer, AudioPlayer, SkillTabs,
  countWords, isCorrect, blankKey,
} from '@/components/exam-runner/primitives';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, WriteQuestion, SpeakQuestion,
  FormGroupQuestion, TableGroupQuestion, TableCell,
  MultiSelectQuestion, MatchingGroupQuestion,
} from '@/data/mocks/types';
import ExamResultOffers from '@/components/exams/ExamResultOffers';
import type { ExamAccessOutcome } from '@/lib/exam-access-codes/client';

const SKILL_ORDER = ['listening','reading','writing','speaking'];
const FREE_WRITING_MOCKS = new Set(['set-1', 'set-2', 'set-3', 'set-4']);
const isFreeIeltsMock = (mockId: string) => FREE_WRITING_MOCKS.has(mockId);
const isReviewableIeltsMock = (mockId: string) => getIeltsReviewBlueprint(mockId) !== null;
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
type SpeakAudioMap = Record<string, IeltsSpeakingRecording>;

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
                name={`${groupId}_${num}`}
                aria-label={`Question ${num}`}
                autoComplete="off"
                className="ielts-form__input"
                value={fills[key] ?? ''}
                onChange={e => onChange(key, e.target.value)}
                placeholder="Answer…"
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
  const diagramLayout = getIeltsDiagramLayout(q.id, q.imageUrl);
  return (
    <div className="ielts-form">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {q.qRange[0]}–{q.qRange[1]}</span>
        {q.groupLabel.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
      {q.imageUrl && !diagramLayout && (
        <div className="ielts-form__diagram">
          <Image src={q.imageUrl} alt={q.imageAlt ?? 'Diagram'} width={700} height={400} style={{width:'100%',height:'auto'}} />
        </div>
      )}
      {q.title && <p className="ielts-form__title">{q.title}</p>}
      {q.example && <p className="ielts-form__example"><em>Example</em><br />{q.example}</p>}
      {diagramLayout ? (
        <IELTSAnswerDiagram question={q} layout={diagramLayout} fills={fills} onChange={onChange}
          textView={renderFormTemplate(q.template, q.blanks, fills, q.id, onChange)} />
      ) : renderFormTemplate(q.template, q.blanks, fills, q.id, onChange)}
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
                        name={`${q.id}_${c.num}`}
                        aria-label={`Question ${c.num}`}
                        autoComplete="off"
                        className="ielts-form__input"
                        value={fills[key] ?? ''}
                        onChange={e => onChange(key, e.target.value)}
                        placeholder="Answer…"
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
                name={`${q.id}_${item.num}`}
                aria-label={`Question ${item.num}: choose a matching letter`}
                value={val}
                onChange={e => onChange(key, e.target.value)}
              >
                <option value="">Choose…</option>
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
        name={`writing_task_${q.taskNumber}`}
        aria-label={`Writing Task ${q.taskNumber} response`}
        className="ielts-write__textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your response here…"
        rows={18}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
      />
      <div className={`ielts-write__wordcount${ok?' ielts-write__wordcount--ok':''}`}>
        {words} / {q.minWords} words {ok ? '✓' : ''}
      </div>
    </div>
  );
}

// ── Speak renderer ────────────────────────────────────────────────────────────

function SpeakView({
  q, notes, audio, onNotes, onAudio, onRecordingStateChange,
}: {
  q: SpeakQuestion;
  notes: string;
  audio?: IeltsSpeakingRecording;
  onNotes: (v: string) => void;
  onAudio: (recording: IeltsSpeakingRecording | undefined) => void;
  onRecordingStateChange: (recording: boolean) => void;
}) {
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

      <IELTSSpeakingRecorder
        questionId={q.id}
        recording={audio}
        maxSeconds={q.partNumber === 2 ? 120 : 300}
        onChange={onAudio}
        onRecordingStateChange={onRecordingStateChange}
      />

      <div className="ielts-speak__notes">
        <label className="ielts-speak__notes-label" htmlFor={`${q.id}-notes`}>Preparation notes (optional):</label>
        <textarea
          id={`${q.id}-notes`}
          name={`${q.id}_notes`}
          className="ielts-write__textarea"
          rows={4}
          value={notes}
          onChange={e=>onNotes(e.target.value)}
          placeholder="Jot down key ideas…"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

// ── Section panel ─────────────────────────────────────────────────────────────

type AllAnswers = IeltsPracticeAnswers;

function renderQuestion(
  q: Question,
  idx: number,
  ans: AllAnswers,
  recordings: SpeakAudioMap,
  handlers: {
    onFill: (k:string,v:string)=>void;
    onMCQ: (id:string,i:number)=>void;
    onMS: (id:string,letter:string)=>void;
    onMatch: (k:string,v:string)=>void;
    onWrite: (id:string,v:string)=>void;
    onSpeak: (id:string,v:string)=>void;
    onSpeakAudio: (id:string,recording:IeltsSpeakingRecording|undefined)=>void;
    onRecordingState: (id:string,recording:boolean)=>void;
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
      return <MCQView key={q.id} q={q as MCQQuestion} index={ieltsQuestionNumber(q.id)} selected={ans.mcq[q.id]} onChange={i=>handlers.onMCQ(q.id,i)} />;
    case 'write':
      return <WriteView key={q.id} q={q as WriteQuestion} value={ans.write[q.id]??''} onChange={v=>handlers.onWrite(q.id,v)} />;
    case 'speak':
      return (
        <SpeakView
          key={q.id}
          q={q as SpeakQuestion}
          notes={ans.speak[q.id]??''}
          audio={recordings[q.id]}
          onNotes={v=>handlers.onSpeak(q.id,v)}
          onAudio={recording=>handlers.onSpeakAudio(q.id,recording)}
          onRecordingStateChange={recording=>handlers.onRecordingState(q.id,recording)}
        />
      );
    default:
      return null;
  }
}

function SectionPanel({
  mockId, section, ans, recordings, handlers,
}: {
  mockId: string;
  section: MockSection;
  ans: AllAnswers;
  recordings: SpeakAudioMap;
  handlers: Parameters<typeof renderQuestion>[4];
}) {
  const hasPassage = !!section.passage;

  // Simple numbered counter for MCQ-like questions in this section
  let mcqCounter = 0;

  const questionsEl = (
    <div className="ielts-panel__questions">
      {section.questions.map(q => {
        let idx = 0;
        if (q.type === 'mcq' || q.type === 'dialog') { idx = mcqCounter; mcqCounter++; }
        return renderQuestion(q, idx, ans, recordings, handlers);
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
          <p className="ielts-split__instructions">{displayIeltsSectionInstructions(mockId, section)}</p>
          {questionsEl}
        </div>
      </div>
    );
  }

  return (
    <div className="ielts-section-panel">
      <p className="ielts-section-panel__title">{section.title}</p>
      <p className="ielts-section-panel__instructions">{displayIeltsSectionInstructions(mockId, section)}</p>
      {questionsEl}
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

// Band options kept for reference (no longer used in UI)
const _BAND_OPTIONS = [4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9] as const;
void _BAND_OPTIONS;

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
      total += q.selectCount;
      done += Math.min(new Set(ans.ms[q.id] ?? []).size, q.selectCount);
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


// ── IELTSResults — new admin-review flow ─────────────────────────────────────

function IELTSResults({ mock, exam, ans, receipt, studentName, access, onAccessUnlocked, onRetry }: {
  mock: MockExam; exam: Exam; ans: AllAnswers; receipt: IeltsSubmissionReceipt | null; studentName: string; access: ExamAccessOutcome; onAccessUnlocked: () => void; onRetry: ()=>void;
}) {
  const objectiveScore = scoreIeltsObjectiveAnswers(mock, ans);
  const lCorrect = objectiveScore.listening?.correct ?? 0;
  const rCorrect = objectiveScore.reading.correct;
  const lTotal = objectiveScore.listening?.total ?? 0;
  const rTotal = objectiveScore.reading.total;
  const hasListening = objectiveScore.listening !== null;
  const rBand = objectiveScore.reading.band;
  const lBand = objectiveScore.listening?.band ?? null;

  const writeQs = getSkillSections(mock,'writing').flatMap(s=>s.questions) as WriteQuestion[];
  const speakQs = getSkillSections(mock,'speaking').flatMap(s=>s.questions) as SpeakQuestion[];
  const task1 = writeQs.find(q=>q.taskNumber===1);
  const task2 = writeQs.find(q=>q.taskNumber===2);

  // Motor automático solo en los sets gratuitos (set-1..4); el resto sigue
  // con revisión manual. Se llama SIEMPRE (reglas de hooks) con essay=''
  // cuando no aplica — el hook no fetchea en ese caso.
  const writingEnabled = writeQs.length > 0 && isFreeIeltsMock(mock.id);
  const task1Essay = writingEnabled && access.unlocked && task1 ? (ans.write[task1.id] ?? '').trim() : '';
  const task2Essay = writingEnabled && access.unlocked && task2 ? (ans.write[task2.id] ?? '').trim() : '';
  const task1Assessment = useWritingAssessment('ielts', mock.id, 1, task1Essay, receipt);
  const task2Assessment = useWritingAssessment('ielts', mock.id, 2, task2Essay, receipt);

  // Peso oficial IELTS: Task 2 cuenta el doble que Task 1.
  const writingBand = (task1Assessment.state === 'success' && task2Assessment.state === 'success')
    ? Math.round(((task1Assessment.result!.overallBand + task2Assessment.result!.overallBand * 2) / 3) * 2) / 2
    : null;

  // Si uno de los dos motores (Gemini + respaldo Groq) falló, writingBand se
  // queda en null para siempre — sin esto el resumen muestra "…"
  // indistinguible de "todavía cargando", cuando en realidad no va a
  // resolver solo. 'unavailable' con essay presente cuenta como fallo real
  // (la petición se hizo y falló), no como "tarea sin responder".
  const taskFailed = (essay: string, state: typeof task1Assessment.state) =>
    !!essay && (state === 'saturated' || state === 'unavailable');
  const writingSaturated = writingEnabled && writingBand === null
    && (taskFailed(task1Essay, task1Assessment.state) || taskFailed(task2Essay, task2Assessment.state));

  const autoSkills = [
    ...(hasListening ? [{ skill:'Listening', score:lBand!, max:9, label:`Band ${lBand}`, raw:`${lCorrect}/${lTotal} correct` }] : []),
    { skill:'Reading', score:rBand, max:9, label:`Band ${rBand}`, raw:`${rCorrect}/${rTotal} correct` },
    ...(writingBand !== null ? [{ skill:'Writing', score:writingBand, max:9, label:`Band ${writingBand}` }] : []),
  ];

  // Para el resumen tipo TRF: Writing aparece como "…" mientras el motor
  // responde (no bloquea la vista), Speaking como "Pendiente" — no se
  // autoevalúa todavía, y mostrar un número inventado sería deshonesto.
  const summarySkills: { skill: string; score: number | null | 'pending' | 'saturated'; max: number }[] = [
    ...(hasListening ? [{ skill:'Listening', score:lBand as number, max:9 }] : []),
    { skill:'Reading', score:rBand, max:9 },
    ...(writingEnabled ? [{ skill:'Writing', score: writingSaturated ? 'saturated' as const : writingBand, max:9 }] : []),
    ...(speakQs.length > 0 ? [{ skill:'Speaking', score:'pending' as const, max:9 }] : []),
  ];

  const reportData = {
    examName: exam.name,
    examSlug: exam.slug,
    mockTitle: mock.title,
    // IELTS Overall only exists after L/R/W/S are all available.
    totalScore: null,
    totalMax: 9,
    totalLabel: hasListening
      ? `Listening Band ${lBand} · Reading Band ${rBand}`
      : `Reading Band ${rBand}`,
    accentColor: exam.color,
    date: new Date().toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' }),
    skills: autoSkills,
  };

  if (!access.unlocked) {
    return <ExamResultOffers
      examSlug="ielts"
      examName={exam.name}
      attemptRef={receipt?.submissionId ?? `ielts:${mock.id}`}
      score={`${lCorrect + rCorrect}/${lTotal + rTotal}`}
      initialCodeMessage={access.message}
      fullResult={null}
      onRetry={onRetry}
      onUnlocked={onAccessUnlocked}
    />;
  }

  return (
    <div className="prac-results">
      <IELTSSummaryReport
        mockTitle={mock.title}
        date={reportData.date}
        studentName={studentName}
        skills={summarySkills}
        overallBand={null}
      />

      {/* Writing & Speaking — pending review notice (sets sin motor propio, o Speaking siempre) */}
      {((writeQs.length > 0 && !isFreeIeltsMock(mock.id)) || speakQs.length > 0) && (
        <div className="ielts-pending-notice">
          <div className="ielts-pending-notice__icon">📝</div>
          <div>
            <p className="ielts-pending-notice__title">
              {writeQs.length > 0 && !isFreeIeltsMock(mock.id) ? 'Writing y Speaking' : 'Speaking'} — Pendiente de corrección
            </p>
            <p className="ielts-pending-notice__sub">
              Tus textos y audios han sido enviados al profesor. Recibirás tus bandas
              {writeQs.length > 0 && !isFreeIeltsMock(mock.id) ? ' de Writing y Speaking' : ' de Speaking'}
              {' '}en tu dashboard cuando estén corregidas.
            </p>
          </div>
        </div>
      )}

      {writingEnabled && (
        <>
          {task1Essay && (
            <IELTSWritingReportPanel
              examSlug="ielts"
              mockId={mock.id}
              taskNumber={1}
              taskLabel="Writing — Task 1"
              essay={task1Essay}
              fallbackNotice="Tu respuesta ha sido enviada al profesor. Recibirás tu banda de Writing Task 1 en tu dashboard cuando esté corregida."
              state={task1Assessment.state}
              result={task1Assessment.result}
            />
          )}
          {task2Essay && (
            <IELTSWritingReportPanel
              examSlug="ielts"
              mockId={mock.id}
              taskNumber={2}
              taskLabel="Writing — Task 2"
              essay={task2Essay}
              fallbackNotice="Tu respuesta ha sido enviada al profesor. Recibirás tu banda de Writing Task 2 en tu dashboard cuando esté corregida."
              state={task2Assessment.state}
              result={task2Assessment.result}
            />
          )}
        </>
      )}

      <div className="prac-results__review">
        <h2 className="prac-results__review-title">Answer Review</h2>
        {mock.sections.filter(s=>(s.skill==='listening'||s.skill==='reading')&&!s.comingSoon).map(sec=>(
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
                const marks=scoreIeltsMultiSelect(sel, ms.answers, ms.selectCount);
                const ok=marks===ms.selectCount;
                return (
                  <div key={ms.id} className={`prac-review-item${ok?' prac-review-item--correct':' prac-review-item--wrong'}`}>
                    <div className="prac-review-item__header">
                      <span className="prac-review-item__num">Q{ms.qRange[0]}–{ms.qRange[1]}</span>
                      <span className={`prac-review-item__badge${ok?' prac-review-item__badge--ok':' prac-review-item__badge--err'}`}>
                        {ok?'✓ Correct':marks>0?`Partial credit: ${marks}/${ms.selectCount}`:'✗ Incorrect'}
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
                      <span className="prac-review-item__num">Q{mq.id.match(/q(\d+)$/i)?.[1] ?? ''}</span>
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

type Phase = 'intro'|'exam'|'submit'|'results';
type FocusedSkill = 'reading' | 'writing' | 'speaking';

function IELTSFocusedResults({ mock, skill, ans, recordings, reading, onRetry, onReview }: {
  mock: MockExam;
  skill: FocusedSkill;
  ans: AllAnswers;
  recordings: SpeakAudioMap;
  reading: IeltsReadingPracticeResult | null;
  onRetry: () => void;
  onReview: () => void;
}) {
  const sections = getSkillSections(mock, skill).filter(section => !section.comingSoon);
  const writing = sections.flatMap(section => section.questions).filter((question): question is WriteQuestion => question.type === 'write');
  const speaking = sections.flatMap(section => section.questions).filter((question): question is SpeakQuestion => question.type === 'speak');

  return <div className="prac-shell prac-shell--intro exam-unified exam-unified__intro" data-exam="ielts"><section className="prac-intro">
    <p className="prac-intro__eyebrow">IELTS {SKILL_LABEL[skill]} · {mock.title}</p>
    <h1 className="prac-intro__title">Practice review</h1>
    {reading ? <>
      <p className="prac-intro__sub">{reading.correct}/{reading.denominator} correct · estimated Reading band {reading.band}. This is a WeLearn practice estimate, not an official IELTS result.</p>
      <div className="prac-intro__sections">{sections.map((section, index) => {
        const score = reading.passages.find(passage => passage.part === section.part);
        return <div key={section.part} className="prac-intro__section"><span className="prac-intro__section-part">Passage {index + 1}</span><span className="prac-intro__section-title">{section.title}</span><span className="prac-intro__section-q">{score?.correct ?? 0}/{score?.total ?? 0}</span></div>;
      })}</div>
    </> : null}
    {skill === 'writing' ? <>
      <p className="prac-intro__sub">Review your two drafts against their tasks. Word counts help you check completeness; they are not a Writing band.</p>
      <div className="prac-intro__sections">{writing.map(question => <div key={question.id} className="prac-intro__section"><span className="prac-intro__section-part">Task {question.taskNumber}</span><span className="prac-intro__section-title">{question.text}</span><span className="prac-intro__section-q">{countWords(ans.write[question.id] ?? '')} words · target {question.minWords}</span>{ans.write[question.id]?.trim() ? <details><summary>Read your draft</summary><p style={{ whiteSpace: 'pre-wrap' }}>{ans.write[question.id]}</p></details> : null}</div>)}</div>
    </> : null}
    {skill === 'speaking' ? <>
      <p className="prac-intro__sub">{speaking.filter(question => recordings[question.id]).length}/{speaking.length} prompts recorded. Return to your responses to replay the recordings while this page remains open. No automatic Speaking band is assigned.</p>
      <div className="prac-intro__sections">{speaking.map(question => <div key={question.id} className="prac-intro__section"><span className="prac-intro__section-part">Part {question.partNumber}</span><span className="prac-intro__section-title">{question.text}</span><span className="prac-intro__section-q">{recordings[question.id] ? 'Recorded' : 'Not recorded'}</span>{ans.speak[question.id]?.trim() ? <details><summary>Read preparation notes</summary><p style={{ whiteSpace: 'pre-wrap' }}>{ans.speak[question.id]}</p></details> : null}</div>)}</div>
    </> : null}
    <div className="prac-intro__tips"><p className="prac-intro__tips-title">Next step</p><p>You can return to your responses or start this skill again.{skill === 'speaking' ? ' Recordings stay only in this open session.' : ''}</p></div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}><button type="button" className="btn btn-ghost" onClick={onReview}>Review responses</button><button type="button" className="btn" onClick={onRetry}>Try again</button><Link className="btn btn-ghost" href={`/practica/ielts/${skill}/simulacros`}>Choose another set</Link></div>
  </section></div>;
}

export default function IELTSPracticeClient({ exam, mock, practiceSkill }: { exam: Exam; mock: MockExam; practiceSkill?: FocusedSkill }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [submissionReceipt, setSubmissionReceipt] = useState<IeltsSubmissionReceipt | null>(null);
  const [completedReviewMock, setCompletedReviewMock] = useState<MockExam | null>(null);
  const [readingResult, setReadingResult] = useState<IeltsReadingPracticeResult | null>(null);
  const [readingScoring, setReadingScoring] = useState(false);
  const [submittedStudentName, setSubmittedStudentName] = useState('');
  const [resultAccess, setResultAccess] = useState<ExamAccessOutcome>({ unlocked: false });
  const contentVersion = `${getIeltsReviewBlueprint(mock.id)?.contentVersion ?? 'unversioned'}+${IELTS_CHOICE_PRESENTATION_VERSION}`;
  const draftKey = ieltsPracticeDraftKey(mock.id, practiceSkill ? `${contentVersion}:${practiceSkill}` : contentVersion);

  const comingSoonSkills = new Set(
    mock.sections.filter(s=>s.comingSoon).map(s=>s.skill).filter(Boolean) as string[]
  );
  const firstActiveSkill = practiceSkill ?? SKILL_ORDER.find(sk=>
    mock.sections.some(s=>s.skill===sk && !s.comingSoon)
  ) ?? 'reading';

  const [activeSkill, setActiveSkill] = useState(firstActiveSkill);
  const [ans, setAns] = useState<AllAnswers>(emptyIeltsPracticeAnswers);
  const [recordings, setRecordings] = useState<SpeakAudioMap>({});
  const [recordingIds, setRecordingIds] = useState<Set<string>>(new Set());
  const [finishError, setFinishError] = useState('');
  const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [activePartIndex, setActivePartIndex] = useState(0);

  const skills = practiceSkill ? [practiceSkill] : SKILL_ORDER.filter(sk => mock.sections.some(s=>s.skill===sk));
  const downloadWorksheetFor = (skill?: string) => async () => {
    const { generateExamWorksheetPdf } = await import('@/lib/pdf/generateExamWorksheetPdf');
    await generateExamWorksheetPdf(mock, {
      sections: mock.sections.filter(section => !section.comingSoon && (!skill || section.skill === skill)),
      label: skill ? `${SKILL_LABEL[skill]} practice` : 'Full practice',
      sourcePath: `/examenes/ielts/practica/${mock.id}${skill ? `?mode=practice&skill=${skill}` : ''}`,
    });
  };
  const downloadPartWorksheet = (section: MockSection, label: string) => async () => {
    const { generateExamWorksheetPdf } = await import('@/lib/pdf/generateExamWorksheetPdf');
    await generateExamWorksheetPdf(mock, {
      sections: [section],
      label,
      sourcePath: `/examenes/ielts/practica/${mock.id}?mode=practice&skill=${section.skill ?? practiceSkill ?? 'reading'}`,
    });
  };

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
    onSpeakAudio:useCallback((id:string,recording:IeltsSpeakingRecording|undefined)=>setRecordings(previous=>{
      if (recording) return {...previous,[id]:recording};
      const next={...previous}; delete next[id]; return next;
    }),[]),
    onRecordingState:useCallback((id:string,recording:boolean)=>setRecordingIds(previous=>{
      const next=new Set(previous);
      if (recording) next.add(id); else next.delete(id);
      return next;
    }),[]),
  };

  const progressMap = Object.fromEntries(skills.map(sk=>{
    if (comingSoonSkills.has(sk)) return [sk,{done:0,total:0}];
    const sections=getSkillSections(mock,sk);
    if (sk==='speaking') {
      const speakingIds=sections.flatMap(section=>section.questions).filter(question=>question.type==='speak').map(question=>question.id);
      return [sk,{done:speakingIds.filter(id=>recordings[id]).length,total:speakingIds.length}];
    }
    let done=0,total=0;
    for (const s of sections) { const p=countGroupAnswers(s,ans); done+=p.done; total+=p.total; }
    return [sk,{done,total}];
  }));

  const handleSubmit = useCallback(async ()=>{
    if (recordingIds.size>0) {
      setFinishError('Detén la grabación activa antes de terminar el examen.');
      return;
    }
    setFinishError('');
    if (practiceSkill) {
      if (practiceSkill === 'reading') {
        if (readingScoring) return;
        setReadingScoring(true);
        try {
          const response = await fetch('/api/practica/ielts/reading/score', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              mockId: mock.id,
              contentVersion,
              answers: { fills: ans.fills, mcq: ans.mcq, ms: ans.ms, match: ans.match },
            }),
          });
          if (!response.ok) throw new Error(response.status === 429 ? 'Hay demasiadas revisiones desde esta conexión. Espera unos minutos e inténtalo otra vez.' : 'No pudimos puntuar Reading. Tus respuestas siguen guardadas; inténtalo otra vez.');
          const result = await response.json() as IeltsReadingPracticeResult;
          if (result.denominator !== 40 || !Array.isArray(result.passages)) throw new Error('La revisión llegó incompleta. Inténtalo otra vez.');
          setReadingResult(result);
        } catch (error) {
          setFinishError(error instanceof Error ? error.message : 'No pudimos puntuar Reading. Inténtalo otra vez.');
          setReadingScoring(false);
          return;
        }
        setReadingScoring(false);
      }
      setPhase('results');
      return;
    }
    trackIeltsEvent('ielts_mock_complete', { mock_id: mock.id });
    setPhase(isReviewableIeltsMock(mock.id)?'submit':'results');
  },[ans,contentVersion,mock.id,practiceSkill,readingScoring,recordingIds]);

  const handleRetry = useCallback(()=>{
    try { localStorage.removeItem(draftKey); } catch {}
    setAns(emptyIeltsPracticeAnswers());
    setRecordings({});
    setRecordingIds(new Set());
    setFinishError('');
    setSubmissionReceipt(null);
    setCompletedReviewMock(null);
    setReadingResult(null);
    setReadingScoring(false);
    setSubmittedStudentName('');
    setResultAccess({ unlocked: false });
    setDeadlineMs(null);
    setDraftRestored(false);
    setActivePartIndex(0);
    setActiveSkill(firstActiveSkill); setPhase('intro');
  },[draftKey,firstActiveSkill]);

  useEffect(()=>{
    try {
      const serialized = localStorage.getItem(draftKey);
      const draft = parseIeltsPracticeDraft(serialized, mock.id, contentVersion);
      if (draft) {
        setAns(draft.answers);
        if (!practiceSkill) setDeadlineMs(draft.expiresAt);
        if (SKILL_ORDER.includes(draft.activeSkill)
          && mock.sections.some(section=>section.skill===draft.activeSkill&&!section.comingSoon)) {
          setActiveSkill(practiceSkill ?? draft.activeSkill);
        }
        setDraftRestored(true);
      } else if (serialized) {
        localStorage.removeItem(draftKey);
      }
    } catch {}
    setDraftReady(true);
  },[contentVersion,draftKey,mock.id,practiceSkill]);

  useEffect(()=>{
    if (!draftReady || (phase!=='exam'&&phase!=='submit') || (!practiceSkill && deadlineMs===null)) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(createIeltsPracticeDraft({
        mockId: mock.id,
        contentVersion,
        activeSkill,
        expiresAt: deadlineMs ?? 0,
        answers: ans,
      })));
    } catch {}
  },[activeSkill,ans,contentVersion,deadlineMs,draftKey,draftReady,mock.id,phase,practiceSkill]);

  useEffect(()=>{
    if (phase!=='exam'&&phase!=='submit') return;
    const warnBeforeLeaving=(event:BeforeUnloadEvent)=>{ event.preventDefault(); event.returnValue=''; };
    window.addEventListener('beforeunload',warnBeforeLeaving);
    return ()=>window.removeEventListener('beforeunload',warnBeforeLeaving);
  },[phase]);

  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'auto'});
  },[phase]);

  useEffect(()=>{
    if (practiceSkill && phase === 'exam') window.scrollTo({top:0,left:0,behavior:'auto'});
  },[activePartIndex,phase,practiceSkill]);

  if (phase==='results') {
    if (practiceSkill) return <div className="exam-unified" data-exam="ielts"><IELTSFocusedResults mock={mock} skill={practiceSkill} ans={ans} recordings={recordings} reading={readingResult} onRetry={handleRetry} onReview={() => setPhase('exam')} /><div className="exam-pdf-options"><PdfDownloadButton generate={downloadWorksheetFor(practiceSkill)} label={`${SKILL_LABEL[practiceSkill]} PDF`} /></div></div>;
    return (
      <div className="prac-shell exam-unified" data-exam="ielts">
        <IELTSResults mock={completedReviewMock ?? mock} exam={exam} ans={ans} receipt={submissionReceipt} studentName={submittedStudentName} access={resultAccess} onAccessUnlocked={() => setResultAccess({ unlocked: true })} onRetry={handleRetry} />
        <div className="exam-pdf-options"><PdfDownloadButton generate={downloadWorksheetFor()} label="Full practice PDF" /></div>
      </div>
    );
  }

  if (phase==='submit') {
    const writingQuestions=getSkillSections(mock,'writing').flatMap(section=>section.questions) as WriteQuestion[];
    const task1=writingQuestions.find(question=>question.taskNumber===1);
    const task2=writingQuestions.find(question=>question.taskNumber===2);
    const speakingQuestions=getSkillSections(mock,'speaking').flatMap(section=>section.questions) as SpeakQuestion[];

    return (
      <div className="prac-shell exam-unified" data-exam="ielts">
        <IELTSSubmission
          mockId={mock.id}
          mockTitle={mock.title}
          objectiveAnswers={{ fills: ans.fills, mcq: ans.mcq, ms: ans.ms, match: ans.match }}
          writingTask1={task1?ans.write[task1.id]??'':''}
          writingTask2={task2?ans.write[task2.id]??'':''}
          speakingNotes={Object.fromEntries(speakingQuestions.map(question=>[question.id,ans.speak[question.id]??'']))}
          speakingPrompts={speakingQuestions.map(question=>({ questionId: question.id, partNumber: question.partNumber }))}
          recordings={recordings}
          onBack={()=>setPhase('exam')}
          onSuccess={(receipt, studentName, reviewMock, access)=>{
            try { localStorage.removeItem(draftKey); } catch {}
            trackIeltsEvent('ielts_lead_submit', { mock_id: mock.id });
            trackIeltsEvent('ielts_report_view', { mock_id: mock.id, report_state: 'objective_ready_human_review_pending' });
            trackIeltsEvent('ielts_human_review_pending', { mock_id: mock.id, pending_skills: isFreeIeltsMock(mock.id) ? 'speaking' : 'writing_speaking' });
            setDraftRestored(false);
            setSubmissionReceipt(receipt);
            setCompletedReviewMock(reviewMock);
            setSubmittedStudentName(studentName);
            setResultAccess(access);
            setPhase('results');
          }}
        />
      </div>
    );
  }

  // Intro
  if (phase==='intro') {
    const totalQ=mock.sections
      .filter(section=>!section.comingSoon && (!practiceSkill || section.skill===practiceSkill))
      .reduce((total,section)=>total+countGroupAnswers(section,ans).total,0);
    return (
      <div className="prac-shell prac-shell--intro exam-unified exam-unified__intro" data-exam="ielts">
        <div className="prac-intro">
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name}{practiceSkill ? ` · ${SKILL_LABEL[practiceSkill]} practice` : ''}</p>
          <h1 className="prac-intro__title">{practiceSkill ? `${SKILL_LABEL[practiceSkill]} · ${mock.title}` : mock.title}</h1>
          <p className="prac-intro__sub">{practiceSkill ? `Practise only ${SKILL_LABEL[practiceSkill]} using the audited material from this set. Move freely between parts; there is no timer.` : mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{practiceSkill ? (practiceSkill === 'writing' ? 2 : 3) : skills.filter(sk=>!comingSoonSkills.has(sk)).length}</span><span className="prac-intro__stat-lbl">{practiceSkill ? 'Parts' : 'Secciones activas'}</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{totalQ}</span><span className="prac-intro__stat-lbl">{practiceSkill ? 'Responses' : 'Respuestas'}</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{practiceSkill ? '∞' : mock.timeMinutes}</span><span className="prac-intro__stat-lbl">{practiceSkill ? 'No timer' : 'Minutos'}</span></div>
          </div>
          <div className="prac-intro__sections">
            {mock.sections.filter(sec=>!practiceSkill || sec.skill===practiceSkill).flatMap(sec =>
              practiceSkill === 'speaking'
                ? sec.questions.filter((question): question is SpeakQuestion => question.type === 'speak').map(question => ({ section: { ...sec, questions: [question] }, label: `Part ${question.partNumber}`, count: 1 }))
                : [{ section: sec, label: sec.title.split('—')[1]?.trim() ?? sec.title, count: sec.questions.length }]
            ).map(({ section: sec, label, count }) => (
              <div key={`${sec.part}:${label}`} className={`prac-intro__section${sec.comingSoon?' prac-intro__section--coming-soon':''}`}>
                <span className="prac-intro__section-part">{sec.skill?SKILL_LABEL[sec.skill]:''}</span>
                <span className="prac-intro__section-title">{sec.comingSoon ? '🔨 Próximamente' : label}</span>
                <span className="prac-intro__section-q">{sec.comingSoon ? '—' : practiceSkill ? `${count} ${count===1 ? 'task' : 'question groups'}` : `${count} grupos`}</span>
                {practiceSkill && !sec.comingSoon && <PdfDownloadButton generate={downloadPartWorksheet(sec, label)} label={`${label} PDF`} compact />}
              </div>
            ))}
          </div>
          <div className="exam-pdf-options" aria-label="Student worksheets">
            <PdfDownloadButton generate={downloadWorksheetFor(practiceSkill)} label={practiceSkill ? `${SKILL_LABEL[practiceSkill]} PDF` : 'Full practice PDF'} />
            {!practiceSkill && skills.filter(skill => !comingSoonSkills.has(skill)).map(skill => <PdfDownloadButton key={skill} generate={downloadWorksheetFor(skill)} label={`${SKILL_LABEL[skill]} PDF`} compact />)}
          </div>
          <div className="prac-intro__tips">
            <p className="prac-intro__tips-title">{practiceSkill ? 'Before you start' : 'Antes de empezar'}</p>
            {practiceSkill ? <ul>
              <li>Move freely between parts. There is no timer in this practice mode.</li>
              <li>{practiceSkill === 'reading' ? 'The passage stays beside its questions; your answers are saved in this browser.' : practiceSkill === 'writing' ? 'Your drafts are saved in this browser. The review checks word counts but does not assign a band.' : 'Record and replay each part. Recordings stay only in this open session and are not submitted.'}</li>
              {draftRestored && <li role="status">Your text responses were restored. Speaking recordings must be made again.</li>}
            </ul> : <ul>
              <li>Navega entre las secciones usando las pestañas superiores.</li>
              <li>Reading: los textos aparecen junto a las preguntas.</li>
              <li>Writing y Speaking: tus respuestas se envían al profesor para corrección.</li>
              {comingSoonSkills.has('listening') && <li>Listening está en construcción — próximamente con audio real.</li>}
              {draftRestored && <li role="status">Recuperamos tus respuestas y el tiempo restante. Las grabaciones de Speaking deben hacerse otra vez.</li>}
            </ul>}
          </div>
          <button onClick={()=>{
            if (!draftRestored) {
              setActiveSkill(firstActiveSkill);
              if (!practiceSkill) setDeadlineMs(Date.now()+mock.timeMinutes*60*1000);
            }
            if (!practiceSkill) trackIeltsEvent('ielts_mock_start', { mock_id: mock.id, resumed: draftRestored });
            setPhase('exam');
          }} className="btn" style={{fontSize:'1.1rem',padding:'0.9rem 2.5rem'}}>{practiceSkill ? (draftRestored ? 'Continue practice' : 'Start practice') : (draftRestored?'Continuar examen':'Empezar examen')}</button>
          <Link href={practiceSkill ? `/practica/ielts/${practiceSkill}/simulacros` : `/examenes/${exam.slug}`} style={{color:'var(--muted)',fontSize:'0.9rem',marginTop:'1rem',display:'block'}}>{practiceSkill ? 'Back to skill sets' : 'Volver a IELTS'}</Link>
        </div>
      </div>
    );
  }

  // Exam
  const sourceSkillSections = getSkillSections(mock, activeSkill).filter(s=>!s.comingSoon);
  const skillSections = practiceSkill === 'speaking'
    ? sourceSkillSections.flatMap(section => section.questions.filter((question): question is SpeakQuestion => question.type === 'speak').map(question => ({ ...section, title: `Speaking — Part ${question.partNumber}`, questions: [question] })))
    : sourceSkillSections;
  const activeSections = practiceSkill ? skillSections.slice(activePartIndex, activePartIndex + 1) : skillSections;
  const totalAnswered = Object.values(progressMap).reduce((a,p)=>a+p.done,0);
  const totalQs = Object.values(progressMap).reduce((a,p)=>a+p.total,0);
  const unanswered = totalQs - totalAnswered;

  return (
    <div className="prac-shell prac-shell--exam exam-unified" data-exam="ielts">
      <header className="prac-topbar">
        <div className="prac-topbar__left">
          <Link href={practiceSkill ? `/practica/ielts/${practiceSkill}/simulacros` : `/examenes/${exam.slug}`} className="prac-topbar__back">IELTS</Link>
          <span className="prac-topbar__title">{mock.title}{practiceSkill ? ` · ${SKILL_LABEL[practiceSkill]}` : ''}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">{totalAnswered}/{totalQs} answered</span>
          {!practiceSkill && <Timer totalSecs={mock.timeMinutes*60} deadlineMs={deadlineMs??undefined} onExpire={handleSubmit} />}
        </div>
      </header>

      {practiceSkill ? <nav aria-label={`${SKILL_LABEL[practiceSkill]} parts`} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', justifyContent: 'center' }}>{skillSections.map((section, index) => <button key={section.part} type="button" className={index===activePartIndex ? 'btn btn-sm' : 'btn btn-ghost btn-sm'} aria-current={index===activePartIndex ? 'step' : undefined} onClick={() => setActivePartIndex(index)}>{practiceSkill==='writing' ? `Task ${index+1}` : `Part ${index+1}`}</button>)}</nav> : <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} comingSoon={comingSoonSkills} labels={SKILL_LABEL} />}

      <div className="ielts-exam-body">
        <div className="exam-pdf-options"><PdfDownloadButton generate={downloadWorksheetFor(practiceSkill ?? activeSkill)} label={`${SKILL_LABEL[practiceSkill ?? activeSkill]} PDF`} compact />{practiceSkill && activeSections[0] && <PdfDownloadButton generate={downloadPartWorksheet(activeSections[0], practiceSkill === 'writing' ? `Task ${activePartIndex + 1}` : `Part ${activePartIndex + 1}`)} label={`${practiceSkill === 'writing' ? 'Task' : 'Part'} ${activePartIndex + 1} PDF`} compact />}</div>
        {activeSkill === 'listening' && (
          <div className="ielts-audio-sticky">
            <AudioPlayer src={mock.sections.find(s=>s.skill==='listening')?.audioUrl} label="IELTS Listening" />
          </div>
        )}
        {activeSections.map(sec=>(
          <SectionPanel key={sec.part} mockId={mock.id} section={sec} ans={ans} recordings={recordings} handlers={handlers} />
        ))}

        <div className="ielts-exam-footer">
          <p className="ielts-exam-footer__error" role="alert" aria-live="assertive">{finishError}</p>
          <div className="ielts-skill-nav__row">
            {practiceSkill ? <span style={{display:'flex',flexWrap:'wrap',gap:'0.75rem'}}><button type="button" className="btn btn-ghost btn-sm" disabled={activePartIndex===0} onClick={()=>setActivePartIndex(index=>index-1)}>← Previous part</button><button type="button" className="btn btn-sm" disabled={activePartIndex===skillSections.length-1} onClick={()=>setActivePartIndex(index=>index+1)}>Next part →</button><button type="button" className="btn" disabled={readingScoring} onClick={handleSubmit}>{readingScoring ? 'Scoring Reading…' : `Finish ${SKILL_LABEL[practiceSkill]} practice`}</button></span> : skills.filter(sk=>!comingSoonSkills.has(sk)).map((sk,i,arr)=>{
              if (sk!==activeSkill) return null;
              const prev=arr[i-1], next=arr[i+1];
              return (
                <span key={sk} style={{display:'flex',gap:'0.75rem'}}>
                  {prev && <button onClick={()=>setActiveSkill(prev)} className="btn btn-ghost btn-sm">&larr; {SKILL_LABEL[prev]}</button>}
                  {next
                    ? <button onClick={()=>setActiveSkill(next)} className="btn btn-sm">{SKILL_LABEL[next]} &rarr;</button>
                    : <button onClick={()=>{
                        if (unanswered>0&&!confirm(`${unanswered} pregunta(s) sin responder. ¿Terminar de todas formas?`)) return;
                        handleSubmit();
                      }} className="btn">Terminar examen</button>
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
