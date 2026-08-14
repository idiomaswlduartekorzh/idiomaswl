'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TOEFL_WRITING_CONSTRUCTED_SET1, type ToeflConstructedWritingTask } from '@/data/toefl/writing-constructed-set-1';
import { reconcileTimedWritingState, remainingWritingSeconds } from '@/lib/toefl/writing-time-contract';
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

  return <section className={styles.shell} aria-labelledby={`${task.id}-title`} data-object-id={TOEFL_WRITING_CONSTRUCTED_SET1.objectId}>
    <div className={styles.header}><div><h2 id={`${task.id}-title`}>Piloto Set 1 · {task.title}</h2><p>{TOEFL_WRITING_CONSTRUCTED_SET1.disclosure}</p><p className={styles.disclosure}>La respuesta se guarda sólo en este navegador. No se envía a un servidor ni a un modelo de IA.</p></div><div className={styles.timer} role="timer" aria-live="off"><span>{phase==='ready'?'Límite':phase==='closed'?'Tiempo final':'Tiempo restante'}</span><strong>{clock(remaining)}</strong></div></div>
    <div className={styles.stimulus}>{task.stimulus.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}<p className={styles.prompt}>{task.prompt}</p></div>
    {phase==='ready' && <div className={styles.start}><p>El reloj empieza al activar el botón. Enviar o llegar a 00:00 sella la respuesta; recargar no reinicia el tiempo.</p><button type="button" className="btn" disabled={!hydrated} onClick={start}>Empezar tarea de {task.timeLimitSeconds/60} minutos</button></div>}
    {phase!=='ready' && <div className={styles.editor}><label htmlFor={`${task.id}-response`}>Tu respuesta</label><textarea id={`${task.id}-response`} value={response} disabled={phase==='closed'} onChange={e=>setResponse(e.target.value)} onFocus={e=>setLastFocusId(e.currentTarget.id)} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" aria-describedby={`${task.id}-meta`} /><div id={`${task.id}-meta`} className={styles.meta}><span>{wordCount} palabras{task.recommendedMinimumWords?` · mínimo recomendado ${task.recommendedMinimumWords}`:' · ETS no publica un mínimo para Email'}</span><span>Sin corrector ortográfico</span></div></div>}
    {phase==='active' && <div className={styles.actions}><span>Tu borrador se recupera al recargar.</span><button type="button" className="btn" onClick={()=>close('submitted')}>Enviar y sellar respuesta</button></div>}
    {phase==='closed' && <><div className={styles.status} role="status" aria-live="polite"><strong>{closeReason==='expired'?'Tiempo finalizado.':'Respuesta enviada.'}</strong> El texto quedó sellado con outcome local <code>not_evaluated</code>; no se convirtió en una banda ni score ETS.</div><div className={styles.rubric}><h3>Rúbrica de revisión WeLearn</h3><p>Marca únicamente lo que puedes defender al releer tu texto. Este checklist es feedback pedagógico, no calificación automática.</p>{task.rubric.map(item=><label key={item.id} className={styles.criterion}><input type="checkbox" checked={Boolean(rubricChecks[item.id])} onChange={e=>setRubricChecks(current=>({...current,[item.id]:e.target.checked}))}/><span><strong>{item.label}</strong><span>{item.description}</span></span></label>)}</div><button type="button" className="btn btn-ghost btn-sm" onClick={retry}>Empezar otro intento</button></>}
    <span className={styles.srOnly} aria-live="assertive">{phase==='closed'&&closeReason==='expired'?'Time expired. Response sealed.':''}</span>
  </section>;
}
