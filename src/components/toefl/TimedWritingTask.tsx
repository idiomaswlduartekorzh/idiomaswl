'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ToeflConstructedWritingTask } from '@/data/toefl/writing-constructed-set-1';
import { reconcileTimedWritingState, remainingWritingSeconds } from '@/lib/toefl/writing-time-contract';
import PracticeSessionHeader from '@/components/exam-practice/PracticeSessionHeader';
import styles from './TimedWritingTask.module.css';

type Phase = 'ready' | 'active' | 'closed';
type CloseReason = 'submitted' | 'expired';
interface SavedAttempt { version:1; attemptId:string; phase:Phase; response:string; deadlineMs?:number; closeReason?:CloseReason; rubricChecks:Record<string,boolean>; lastFocusId?:string; }

function clientId() {
  return `attempt:${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
}
function words(text:string) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
function clock(seconds:number) { return `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; }

export default function TimedWritingTask({ task }: { task:ToeflConstructedWritingTask }) {
  const storageKey = `wl:toefl:writing:${task.id}:attempt:v1`;
  const [attemptId,setAttemptId] = useState('');
  const [phase,setPhase] = useState<Phase>('ready');
  const [response,setResponse] = useState('');
  const [deadlineMs,setDeadlineMs] = useState<number>();
  const [closeReason,setCloseReason] = useState<CloseReason>();
  const [rubricChecks,setRubricChecks] = useState<Record<string,boolean>>({});
  const [lastFocusId,setLastFocusId] = useState('');
  const [hydrated,setHydrated] = useState(false);
  const [remaining,setRemaining] = useState<number>(task.timeLimitSeconds);
  const expiredAnnouncement = useRef(false);
  const wordCount = useMemo(() => words(response),[response]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as SavedAttempt;
          if (saved.version === 1 && saved.attemptId) {
            setAttemptId(saved.attemptId); setResponse(saved.response ?? ''); setRubricChecks(saved.rubricChecks ?? {}); setLastFocusId(saved.lastFocusId ?? '');
            const reconciled = reconcileTimedWritingState(saved.phase, saved.deadlineMs, Date.now());
            setPhase(reconciled.phase); setCloseReason(reconciled.closeReason ?? saved.closeReason); setDeadlineMs(saved.deadlineMs);
            if(reconciled.remainingSeconds !== undefined) setRemaining(reconciled.remainingSeconds);
            else if(saved.deadlineMs) setRemaining(remainingWritingSeconds(saved.deadlineMs,Date.now()));
            if(saved.lastFocusId && saved.phase !== 'closed') window.requestAnimationFrame(() => document.getElementById(saved.lastFocusId!)?.focus());
          } else setAttemptId(clientId());
        } else setAttemptId(clientId());
      } catch { setAttemptId(clientId()); }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  },[storageKey]);

  useEffect(() => {
    if(!hydrated || !attemptId) return;
    try { window.localStorage.setItem(storageKey,JSON.stringify({version:1,attemptId,phase,response,deadlineMs,closeReason,rubricChecks,lastFocusId} satisfies SavedAttempt)); } catch { /* local practice remains available */ }
  },[attemptId,closeReason,deadlineMs,hydrated,lastFocusId,phase,response,rubricChecks,storageKey]);

  useEffect(() => {
    if(phase !== 'active' || !deadlineMs) return;
    const update = () => {
      const next = remainingWritingSeconds(deadlineMs,Date.now()); setRemaining(next);
      if(next === 0) { setPhase('closed'); setCloseReason('expired'); if(!expiredAnnouncement.current) expiredAnnouncement.current=true; }
    };
    update(); const interval = window.setInterval(update,250); return () => window.clearInterval(interval);
  },[deadlineMs,phase]);

  function start() { const nextDeadline=Date.now()+task.timeLimitSeconds*1000; setAttemptId(clientId()); setPhase('active'); setResponse(''); setRubricChecks({}); setCloseReason(undefined); setDeadlineMs(nextDeadline); setRemaining(task.timeLimitSeconds); window.requestAnimationFrame(() => document.getElementById(`${task.id}-response`)?.focus()); }
  function close(reason:CloseReason) { if(phase !== 'active') return; setPhase('closed'); setCloseReason(reason); setRemaining(deadlineMs?remainingWritingSeconds(deadlineMs,Date.now()):0); }
  function retry() { try{window.localStorage.removeItem(storageKey);}catch{} setAttemptId(clientId());setPhase('ready');setResponse('');setDeadlineMs(undefined);setCloseReason(undefined);setRubricChecks({});setLastFocusId('');setRemaining(task.timeLimitSeconds); }

  return <section className={styles.shell} aria-labelledby={`${task.id}-title`} data-object-id={task.id}>
    <PracticeSessionHeader
      section="writing"
      eyebrow={`${task.kind === 'email' ? 'Write an Email' : 'Academic Discussion'} · open practice`}
      title={task.title}
      description="Fixed WeLearn practice with the published time limit for this task family. Your response stays in this browser."
      titleId={`${task.id}-title`}
      metric={clock(remaining)}
      metricLabel={phase==='ready'?'time limit':phase==='closed'?'final time':'time left'}
      metricRole="timer"
    />
    <div className={styles.stimulus}>{task.stimulus.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}<p className={styles.prompt}>{task.prompt}</p></div>
    {phase==='ready' && <div className={styles.start}><p>The timer starts when you press the button. Submitting or reaching 00:00 closes the response; reloading does not reset the clock.</p><button type="button" className="btn" disabled={!hydrated} onClick={start}>Start {task.timeLimitSeconds/60}-minute task</button></div>}
    {phase!=='ready' && <div className={styles.editor}><label htmlFor={`${task.id}-response`}>Your response</label><textarea id={`${task.id}-response`} value={response} disabled={phase==='closed'} onChange={e=>setResponse(e.target.value)} onFocus={e=>setLastFocusId(e.currentTarget.id)} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" aria-describedby={`${task.id}-meta`} /><div id={`${task.id}-meta`} className={styles.meta}><span>{wordCount} words{task.recommendedMinimumWords?` · recommended minimum ${task.recommendedMinimumWords}`:' · no published minimum for Email'}</span><span>Spellcheck off</span></div></div>}
    {phase==='active' && <div className={styles.actions}><span>Your draft is restored if you reload.</span><button type="button" className="btn" onClick={()=>close('submitted')}>Submit response</button></div>}
    {phase==='closed' && <><div className={styles.status} role="status" aria-live="polite"><strong>{closeReason==='expired'?'Time is up.':'Response submitted.'}</strong> Your response is saved locally for self-review and does not produce an official TOEFL score.</div><div className={styles.rubric}><h3>Self-review checklist</h3><p>Check only the statements you can support after rereading your response.</p>{task.rubric.map(item=><label key={item.id} className={styles.criterion}><input type="checkbox" checked={Boolean(rubricChecks[item.id])} onChange={e=>setRubricChecks(current=>({...current,[item.id]:e.target.checked}))}/><span><strong>{item.label}</strong><span>{item.description}</span></span></label>)}</div><button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Start another attempt</button></>}
    <span className={styles.srOnly} aria-live="assertive">{phase==='closed'&&closeReason==='expired'?'Time expired. Response sealed.':''}</span>
  </section>;
}
