'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExamReport } from '@/components/ExamReport';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, WriteQuestion, SpeakQuestion, MultiSelectQuestion,
} from '@/data/mocks/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  return `${Math.floor(secs/60).toString().padStart(2,'0')}:${(secs%60).toString().padStart(2,'0')}`;
}
function countWords(t: string) { return t.trim().split(/\s+/).filter(Boolean).length; }
function norm(s: string) { return s.trim().toLowerCase().replace(/[.,!?;:'"]/g,''); }

const SKILL_ORDER = ['reading','listening','speaking','writing'];
const SKILL_LABEL: Record<string,string> = {
  reading:'Reading', listening:'Listening', speaking:'Speaking', writing:'Writing',
};

function getSkillSections(mock: MockExam, skill: string) {
  return mock.sections.filter(s => s.skill === skill);
}

// Approximate TOEFL scaled score 0-30 from raw percentage
function toScaled(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 30);
}

// ── Answer state ──────────────────────────────────────────────────────────────

type MCQMap   = Record<string, number>;
type MSMap    = Record<string, string[]>;
type WriteMap = Record<string, string>;
type SpeakMap = Record<string, string>;
type BandMap  = Record<string, number>;

interface AllAnswers { mcq: MCQMap; ms: MSMap; write: WriteMap; speak: SpeakMap; }

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
    </div>
  );
}

// ── MCQ renderer ──────────────────────────────────────────────────────────────

function MCQView({ q, index, value, onChange }: { q: MCQQuestion; index: number; value: number|undefined; onChange: (i:number)=>void }) {
  return (
    <div className="ielts-mcq">
      <div className="ielts-mcq__num">{index}.</div>
      <div className="ielts-mcq__body">
        <p className="ielts-mcq__text">{q.text}</p>
        <div className="prac-options">
          {q.options.map((opt, i) => (
            <button key={i}
              className={`prac-option${value===i?' prac-option--selected':''}`}
              onClick={() => onChange(i)}>
              <span className="prac-option__letter">{String.fromCharCode(65+i)}</span>
              <span className="prac-option__text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Multi-select renderer ─────────────────────────────────────────────────────

function MultiSelectView({ q, selected, onToggle }: {
  q: MultiSelectQuestion; selected: string[]; onToggle: (l:string)=>void;
}) {
  return (
    <div className="ielts-group">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Question {q.qRange[0]}</span>
        {q.text.split('\n').map((line,i) => <p key={i}>{line}</p>)}
        <p className="ielts-multiselect__count">Choose <strong>{q.selectCount}</strong> answers.</p>
      </div>
      <div className="ielts-multiselect__opts">
        {q.options.map(opt => {
          const sel = selected.includes(opt.letter);
          const maxed = !sel && selected.length >= q.selectCount;
          return (
            <button key={opt.letter}
              className={`ielts-multiselect__opt${sel?' ielts-multiselect__opt--sel':''}`}
              onClick={() => !maxed && onToggle(opt.letter)}
              disabled={maxed}>
              <span className="ielts-multiselect__letter">{opt.letter}</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Write renderer ────────────────────────────────────────────────────────────

function WriteView({ q, value, onChange }: { q: WriteQuestion; value: string; onChange: (v:string)=>void }) {
  const words = countWords(value);
  return (
    <div className="ielts-write">
      <div className="ielts-group__label">
        <span className="ielts-group__range">{q.stimulusLabel ?? `Task ${q.taskNumber}`}</span>
      </div>
      {q.imageUrl && (
        <div className="ielts-form__diagram">
          <Image src={q.imageUrl} alt={q.imageAlt ?? 'Task image'} width={700} height={400} style={{width:'100%',height:'auto'}} />
        </div>
      )}
      <div className="ielts-write__stimulus">{q.stimulus.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div>
      <p className="ielts-write__prompt">{q.text}</p>
      <textarea
        className="ielts-write__area"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your response here..."
        rows={12}
      />
      <div className="ielts-write__meta">
        <span className={words < q.minWords ? 'ielts-write__wc--low' : 'ielts-write__wc'}>
          {words} words {words < q.minWords ? `(min ${q.minWords})` : ''}
        </span>
      </div>
    </div>
  );
}

// ── Speak renderer ────────────────────────────────────────────────────────────

function SpeakView({ q, notes, onNotes }: { q: SpeakQuestion; notes: string; onNotes: (v:string)=>void }) {
  return (
    <div className="ielts-speak">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Speaking Task {q.partNumber}</span>
      </div>
      {q.text.split('\n\n').map((p,i) => <p key={i} className="ielts-speak__prompt">{p}</p>)}
      {q.cueCard && (
        <div className="ielts-speak__cue">
          {q.cueCard.split('\n').map((l,i)=><p key={i}>{l}</p>)}
        </div>
      )}
      <p className="ielts-write__prompt" style={{marginTop:'1rem'}}>Preparation notes (optional):</p>
      <textarea
        className="ielts-write__area"
        value={notes}
        onChange={e => onNotes(e.target.value)}
        placeholder="Jot down ideas before you respond..."
        rows={4}
      />
    </div>
  );
}

// ── Render question ───────────────────────────────────────────────────────────

function renderQuestion(
  q: Question,
  index: number,
  ans: AllAnswers,
  handlers: { onMCQ:(id:string,i:number)=>void; onMS:(id:string,l:string)=>void; onWrite:(id:string,v:string)=>void; onSpeak:(id:string,v:string)=>void },
) {
  switch (q.type) {
    case 'mcq':
    case 'dialog':
      return <MCQView key={q.id} q={q as MCQQuestion} index={index} value={ans.mcq[q.id]} onChange={i=>handlers.onMCQ(q.id,i)} />;
    case 'multiselect':
      return <MultiSelectView key={q.id} q={q as MultiSelectQuestion} selected={ans.ms[q.id]??[]} onToggle={l=>handlers.onMS(q.id,l)} />;
    case 'write':
      return <WriteView key={q.id} q={q as WriteQuestion} value={ans.write[q.id]??''} onChange={v=>handlers.onWrite(q.id,v)} />;
    case 'speak':
      return <SpeakView key={q.id} q={q as SpeakQuestion} notes={ans.speak[q.id]??''} onNotes={v=>handlers.onSpeak(q.id,v)} />;
    default:
      return null;
  }
}

// ── Section panel ─────────────────────────────────────────────────────────────

function SectionPanel({ section, ans, handlers }: {
  section: MockSection; ans: AllAnswers;
  handlers: Parameters<typeof renderQuestion>[3];
}) {
  const hasPassage = !!section.passage;
  let qCounter = 0;
  const questionsEl = (
    <div className="ielts-panel__questions">
      {section.questions.map(q => {
        const idx = (q.type === 'mcq' || q.type === 'dialog') ? ++qCounter : qCounter;
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

// ── Self-assess modal ─────────────────────────────────────────────────────────

function SelfAssessModal({ skill, questions, bands, onSave, onCancel }: {
  skill: string; questions: (WriteQuestion|SpeakQuestion)[];
  bands: BandMap; onSave: (b:BandMap)=>void; onCancel: ()=>void;
}) {
  const [local, setLocal] = useState<BandMap>(bands);
  const SCORES = [0,5,10,14,17,20,22,24,26,28,30];
  return (
    <div className="ielts-assess">
      <h2 className="ielts-assess__title">Self-Assess: {skill}</h2>
      <p className="ielts-assess__sub">TOEFL {skill} is scored 0–30. Rate your response for each task.</p>
      {questions.map(q => (
        <div key={q.id} className="ielts-assess__row">
          <p className="ielts-assess__label">{q.type==='write'?(q as WriteQuestion).stimulusLabel??`Task`:`Speaking Task ${(q as SpeakQuestion).partNumber}`}</p>
          <div className="ielts-assess__scores">
            {SCORES.map(s => (
              <button key={s}
                className={`ielts-assess__score${local[q.id]===s?' ielts-assess__score--sel':''}`}
                onClick={()=>setLocal(p=>({...p,[q.id]:s}))}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{display:'flex',gap:'0.75rem',marginTop:'1.5rem'}}>
        <button className="btn" onClick={()=>onSave(local)}>Save &amp; continue</button>
        <button className="btn btn-ghost" onClick={onCancel}>Back to exam</button>
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

function TOEFLResults({ mock, exam, ans, writeBands, speakBands, onRetry }: {
  mock: MockExam; exam: Exam; ans: AllAnswers;
  writeBands: BandMap; speakBands: BandMap; onRetry: ()=>void;
}) {
  // Reading score
  const readSecs = getSkillSections(mock,'reading');
  let rCorrect=0, rTotal=0;
  for (const sec of readSecs) {
    for (const q of sec.questions) {
      if (q.type==='mcq'||q.type==='dialog') {
        rTotal++; if (ans.mcq[q.id]===(q as MCQQuestion).answer) rCorrect++;
      } else if (q.type==='multiselect') {
        const ms=q as MultiSelectQuestion;
        const sel=ans.ms[ms.id]??[];
        const correct=sel.length===ms.answers.length && ms.answers.every(a=>sel.includes(a));
        rTotal++; if (correct) rCorrect++;
      }
    }
  }
  // Listening score
  const lisSecs = getSkillSections(mock,'listening');
  let lCorrect=0, lTotal=0;
  for (const sec of lisSecs) {
    for (const q of sec.questions) {
      if (q.type==='mcq'||q.type==='dialog') {
        lTotal++; if (ans.mcq[q.id]===(q as MCQQuestion).answer) lCorrect++;
      }
    }
  }

  const rScore = toScaled(rCorrect, rTotal);
  const lScore = toScaled(lCorrect, lTotal);
  const wQs = getSkillSections(mock,'writing').flatMap(s=>s.questions) as WriteQuestion[];
  const spQs = getSkillSections(mock,'speaking').flatMap(s=>s.questions) as SpeakQuestion[];
  const wScore = wQs.length ? Math.round(Object.values(writeBands).reduce((a,b)=>a+b,0)/wQs.length) : 0;
  const spScore = spQs.length ? Math.round(Object.values(speakBands).reduce((a,b)=>a+b,0)/spQs.length) : 0;
  const total = rScore + lScore + wScore + spScore;

  const sections = [
    { label:'Reading', score: rScore, raw: `${rCorrect}/${rTotal}` },
    { label:'Listening', score: lScore, raw: `${lCorrect}/${lTotal}` },
    { label:'Speaking', score: spScore, raw:'Self-assessed' },
    { label:'Writing', score: wScore, raw:'Self-assessed' },
  ];

  return (
    <ExamReport
      data={{
        examName: exam.name,
        examSlug: exam.slug,
        mockTitle: mock.title,
        totalScore: total,
        totalMax: 120,
        totalLabel: `Total Score ${total}/120`,
        accentColor: exam.color,
        date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }),
        skills: sections.map(s => ({
          skill: s.label,
          score: s.score,
          max: 30,
          label: `${s.score}/30`,
          raw: s.raw !== 'Self-assessed' ? s.raw : undefined,
        })),
      }}
      onRetry={onRetry}
      backHref="/examenes/toefl"
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro'|'exam'|'self-assess-speak'|'self-assess-write'|'results';

export default function TOEFLPracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [activeSkill, setActiveSkill] = useState('reading');
  const [ans, setAns] = useState<AllAnswers>({ mcq:{}, ms:{}, write:{}, speak:{} });
  const [writeBands, setWriteBands] = useState<BandMap>({});
  const [speakBands, setSpeakBands] = useState<BandMap>({});

  const skills = SKILL_ORDER.filter(sk => mock.sections.some(s=>s.skill===sk));

  const handlers = {
    onMCQ: useCallback((id:string,i:number)=>setAns(p=>({...p,mcq:{...p.mcq,[id]:i}})),[]),
    onMS:  useCallback((id:string,l:string)=>setAns(p=>{
      const cur=p.ms[id]??[];
      const next=cur.includes(l)?cur.filter(x=>x!==l):[...cur,l];
      return {...p,ms:{...p.ms,[id]:next}};
    }),[]),
    onWrite: useCallback((id:string,v:string)=>setAns(p=>({...p,write:{...p.write,[id]:v}})),[]),
    onSpeak: useCallback((id:string,v:string)=>setAns(p=>({...p,speak:{...p.speak,[id]:v}})),[]),
  };

  // Progress counting
  const progressMap = Object.fromEntries(skills.map(sk=>{
    const secs = getSkillSections(mock,sk);
    let done=0,total=0;
    for (const sec of secs) {
      for (const q of sec.questions) {
        if (q.type==='mcq'||q.type==='dialog') { total++; if (ans.mcq[q.id]!==undefined) done++; }
        else if (q.type==='multiselect') { total++; if ((ans.ms[q.id]??[]).length>0) done++; }
        else if (q.type==='write') { total++; if (countWords(ans.write[q.id]??'')>=10) done++; }
        else if (q.type==='speak') { total++; if ((ans.speak[q.id]??'').trim()) done++; }
      }
    }
    return [sk,{done,total}];
  }));

  const totalAnswered = Object.values(progressMap).reduce((a,b)=>a+b.done,0);
  const totalQs = Object.values(progressMap).reduce((a,b)=>a+b.total,0);
  const unanswered = totalQs - totalAnswered;

  const handleSubmit = useCallback(()=>{
    const wQs = getSkillSections(mock,'writing').flatMap(s=>s.questions);
    const spQs = getSkillSections(mock,'speaking').flatMap(s=>s.questions);
    if (spQs.length>0) setPhase('self-assess-speak');
    else if (wQs.length>0) setPhase('self-assess-write');
    else setPhase('results');
  },[mock]);

  const handleRetry = useCallback(()=>{
    setAns({mcq:{},ms:{},write:{},speak:{}});
    setWriteBands({}); setSpeakBands({});
    setActiveSkill('reading'); setPhase('intro');
  },[]);

  if (phase==='self-assess-speak') {
    const qs = getSkillSections(mock,'speaking').flatMap(s=>s.questions) as SpeakQuestion[];
    return (
      <div className="prac-shell">
        <SelfAssessModal skill="Speaking" questions={qs} bands={speakBands}
          onSave={b=>{ setSpeakBands(b); setPhase('self-assess-write'); }}
          onCancel={()=>setPhase('exam')} />
      </div>
    );
  }
  if (phase==='self-assess-write') {
    const qs = getSkillSections(mock,'writing').flatMap(s=>s.questions) as WriteQuestion[];
    return (
      <div className="prac-shell">
        <SelfAssessModal skill="Writing" questions={qs} bands={writeBands}
          onSave={b=>{ setWriteBands(b); setPhase('results'); }}
          onCancel={()=>setPhase('exam')} />
      </div>
    );
  }
  if (phase==='results') {
    return (
      <div className="prac-shell">
        <TOEFLResults mock={mock} exam={exam} ans={ans} writeBands={writeBands} speakBands={speakBands} onRetry={handleRetry} />
      </div>
    );
  }

  // Intro
  if (phase==='intro') {
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{'--exam-color':exam.color} as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name}</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{totalQs}</span>
              <span className="prac-intro__stat-lbl">Questions</span>
            </div>
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{mock.timeMinutes}</span>
              <span className="prac-intro__stat-lbl">Minutes</span>
            </div>
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">0–120</span>
              <span className="prac-intro__stat-lbl">Score range</span>
            </div>
          </div>
          <ul className="prac-intro__tips">
            <li>Reading &amp; Listening are auto-graded. Speaking &amp; Writing are self-assessed at the end.</li>
            <li>Reading: answer questions alongside each passage.</li>
            <li>Listening: transcripts provided to simulate audio.</li>
            <li>Speaking: read each task prompt and record your response externally, then add notes.</li>
          </ul>
          <button className="btn prac-intro__start" onClick={()=>setPhase('exam')}>Start exam</button>
          <Link href={`/examenes/toefl`} className="prac-intro__back">Back to TOEFL</Link>
        </div>
      </div>
    );
  }

  // Exam
  const activeSections = getSkillSections(mock, activeSkill);
  const listeningAudioUrl = mock.sections.find(s=>s.skill==='listening')?.audioUrl;

  return (
    <div className="prac-shell prac-shell--exam">
      <header className="prac-topbar">
        <div className="prac-topbar__left">
          <span className="prac-topbar__exam">{exam.flag} {mock.title}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">{totalAnswered}/{totalQs} answered</span>
          <Timer totalSecs={mock.timeMinutes*60} onExpire={handleSubmit} />
        </div>
      </header>

      <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} />

      <div className="ielts-exam-body">
        {activeSkill==='listening' && listeningAudioUrl && (
          <div className="ielts-audio-sticky">
            <div className="ielts-audio">
              <div className="ielts-audio__player">
                <div className="ielts-audio__icon">&#9654;</div>
                <div className="ielts-audio__info">
                  <span className="ielts-audio__label">TOEFL Listening</span>
                  <span className="ielts-audio__note">Use the transcripts below to simulate the audio experience.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeSections.map(sec => (
          <SectionPanel key={sec.part} section={sec} ans={ans} handlers={handlers} />
        ))}

        <div className="ielts-exam-footer">
          <div className="ielts-skill-nav__row">
            {skills.map((sk,i) => {
              if (sk!==activeSkill) return null;
              const prev=skills[i-1], next=skills[i+1];
              return (
                <span key={sk} style={{display:'flex',gap:'0.75rem'}}>
                  {prev && <button onClick={()=>setActiveSkill(prev)} className="btn btn-ghost btn-sm">&larr; {SKILL_LABEL[prev]}</button>}
                  {next
                    ? <button onClick={()=>setActiveSkill(next)} className="btn btn-sm">{SKILL_LABEL[next]} &rarr;</button>
                    : <button onClick={()=>{
                        if (unanswered>0&&!confirm(`${unanswered} question(s) unanswered. Finish?`)) return;
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
