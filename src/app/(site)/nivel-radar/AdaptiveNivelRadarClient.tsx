'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import s from './page.module.css';

const CONSENT_VERSION = 'diagnostic-pilot-2026-09-24';
const STORAGE_KEY = 'welearn:diagnostic:active-attempt';
const SKILL_LABELS: Record<string, string> = {
  reading: 'Lectura', listening: 'Escucha', writing: 'Escritura', grammar: 'Gramática', vocabulary: 'Vocabulario',
};

type SubmittedResponse =
  | { kind: 'single-choice'; optionId: string | null }
  | { kind: 'multiple-choice'; optionIds: string[] }
  | { kind: 'short-text'; value: string };

type PublicItem = {
  id: string;
  contentVersion: string;
  skill: string;
  subdomain: string;
  prompt: string;
  stimulus:
    | { kind: 'none' }
    | { kind: 'text'; stimulusId: string; title?: string; body: string }
    | { kind: 'audio'; mediaId: string; src: string; startMs: number; endMs: number; maxPlays: number };
  response:
    | { kind: 'single-choice'; optionIds: readonly string[] }
    | { kind: 'multiple-choice'; optionIds: readonly string[]; selectCount: number }
    | { kind: 'short-text'; maxWords: number };
  displayOptions?: readonly { id: string; text: string }[];
};

type Stage = { stageId: string; kind: 'locator' | 'precision' | 'confirmation' | 'writing'; itemIds: readonly string[] };
type ObjectiveDelivery = { attemptId: string; attemptVersion: number; expiresAt: string; stage: Stage; items: readonly PublicItem[] };
type WritingPrompt = {
  id: string; contentVersion: string; title: string; situation: string; instructions: readonly string[];
  minimumWords: number; maximumWords: number; recommendedMinutes: number;
};
type WritingDelivery = { attemptId: string; attemptVersion: number; expiresAt: string; stage: Stage; prompt: WritingPrompt };
type ResumePayload =
  | { kind: 'objective-stage'; delivery: ObjectiveDelivery }
  | { kind: 'writing-stage'; delivery: WritingDelivery }
  | { kind: 'processing'; attemptId: string; attemptVersion: number; status: 'scoring'; writingStatus: string | null }
  | { kind: 'result'; attemptId: string; attemptVersion: number; status: 'completed'; resultProfile: unknown }
  | { kind: 'closed'; attemptId: string; attemptVersion: number; status: 'expired' | 'abandoned' };

type DraftAnswer = { response: SubmittedResponse; responseMs: number | null; audioPlayCount: number | null };
type View = 'intro' | 'loading' | 'objective' | 'writing' | 'processing' | 'result' | 'error';

function responseFor(item: PublicItem, answer?: DraftAnswer): SubmittedResponse {
  if (answer) return answer.response;
  if (item.response.kind === 'single-choice') return { kind: 'single-choice', optionId: null };
  if (item.response.kind === 'multiple-choice') return { kind: 'multiple-choice', optionIds: [] };
  return { kind: 'short-text', value: '' };
}

function wordCount(value: string): number {
  const normalized = value.normalize('NFC').trim();
  return normalized ? normalized.split(/\s+/u).length : 0;
}

export default function AdaptiveNivelRadarClient() {
  const [view, setView] = useState<View>('intro');
  const [audioReady, setAudioReady] = useState(false);
  const [consented, setConsented] = useState(false);
  const [objective, setObjective] = useState<ObjectiveDelivery | null>(null);
  const [writing, setWriting] = useState<WritingDelivery | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [message, setMessage] = useState('');
  const [authRequired, setAuthRequired] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, DraftAnswer>>({});
  const [writingText, setWritingText] = useState('');
  const openedAt = useRef(Date.now());

  const activateDelivery = useCallback((delivery: ObjectiveDelivery | WritingDelivery) => {
    sessionStorage.setItem(STORAGE_KEY, delivery.attemptId);
    setMessage('');
    setAuthRequired(false);
    if ('items' in delivery) {
      setObjective(delivery); setWriting(null); setAnswers({}); setItemIndex(0); openedAt.current = Date.now(); setView('objective');
    } else {
      setWriting(delivery); setObjective(null); setWritingText(''); setView('writing');
    }
  }, []);

  const applyResume = useCallback((payload: ResumePayload) => {
    if (payload.kind === 'objective-stage' || payload.kind === 'writing-stage') return activateDelivery(payload.delivery);
    if (payload.kind === 'processing') { setView('processing'); return; }
    if (payload.kind === 'result') { sessionStorage.removeItem(STORAGE_KEY); setResult(payload.resultProfile); setView('result'); return; }
    sessionStorage.removeItem(STORAGE_KEY);
    setMessage(payload.status === 'expired' ? 'El intento expiró. Puedes comenzar uno nuevo.' : 'El intento fue cerrado.');
    setView('intro');
  }, [activateDelivery]);

  const resume = useCallback(async (attemptId: string, quiet = false) => {
    try {
      const response = await fetch(`/api/diagnostic/attempts/${encodeURIComponent(attemptId)}`, { cache: 'no-store' });
      const body = await response.json() as { ok?: boolean; resume?: ResumePayload; error?: string; code?: string };
      if (response.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY); setAuthRequired(true); setView('intro'); return;
      }
      if (!response.ok || !body.resume) {
        if (response.status === 404 || response.status === 410) sessionStorage.removeItem(STORAGE_KEY);
        if (!quiet) { setMessage(body.error ?? 'No pudimos recuperar el intento.'); setView('error'); }
        return;
      }
      applyResume(body.resume);
    } catch {
      if (!quiet) { setMessage('No pudimos conectar con el diagnóstico.'); setView('error'); }
    }
  }, [applyResume]);

  useEffect(() => {
    const attemptId = sessionStorage.getItem(STORAGE_KEY);
    if (attemptId) { setView('loading'); void resume(attemptId); }
  }, [resume]);

  useEffect(() => {
    if (view !== 'processing') return;
    const attemptId = sessionStorage.getItem(STORAGE_KEY);
    if (!attemptId) return;
    const timer = window.setInterval(() => void resume(attemptId, true), 8_000);
    return () => window.clearInterval(timer);
  }, [resume, view]);

  async function testAudio() {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) throw new Error('audio unavailable');
      const context = new AudioContextClass();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 523.25; gain.gain.value = 0.08;
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.22);
      await context.resume();
      window.setTimeout(() => void context.close(), 400);
      setAudioReady(true);
    } catch {
      setMessage('No pudimos reproducir el sonido de prueba. Revisa el volumen y los permisos del navegador.');
    }
  }

  async function start() {
    if (!audioReady || !consented) return;
    setView('loading'); setMessage(''); setAuthRequired(false);
    try {
      const response = await fetch('/api/diagnostic/attempts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'en', audioCheckPassed: true, consentVersion: CONSENT_VERSION }),
      });
      const body = await response.json() as { ok?: boolean; delivery?: ObjectiveDelivery; error?: string; code?: string };
      if (response.status === 401) { setAuthRequired(true); setMessage('Inicia sesión para guardar y reanudar tu diagnóstico.'); setView('intro'); return; }
      if (!response.ok || !body.delivery) { setMessage(body.error ?? 'No pudimos iniciar el diagnóstico.'); setView('error'); return; }
      activateDelivery(body.delivery);
    } catch {
      setMessage('No pudimos conectar con el diagnóstico.'); setView('error');
    }
  }

  const currentItem = objective?.items[itemIndex] ?? null;
  const currentAnswer = currentItem ? answers[currentItem.id] : undefined;
  const progress = objective ? Math.round(((itemIndex + 1) / objective.items.length) * 100) : 0;

  function updateResponse(response: SubmittedResponse) {
    if (!currentItem) return;
    setAnswers(previous => ({
      ...previous,
      [currentItem.id]: {
        response,
        responseMs: previous[currentItem.id]?.responseMs ?? null,
        audioPlayCount: previous[currentItem.id]?.audioPlayCount ?? (currentItem.stimulus.kind === 'audio' ? 0 : null),
      },
    }));
  }

  function finishTiming(item: PublicItem) {
    const elapsed = Math.min(3_600_000, Math.max(0, Date.now() - openedAt.current));
    setAnswers(previous => ({
      ...previous,
      [item.id]: {
        response: responseFor(item, previous[item.id]), responseMs: elapsed,
        audioPlayCount: previous[item.id]?.audioPlayCount ?? (item.stimulus.kind === 'audio' ? 0 : null),
      },
    }));
  }

  function moveItem(nextIndex: number) {
    if (!currentItem || !objective) return;
    finishTiming(currentItem);
    setItemIndex(Math.max(0, Math.min(objective.items.length - 1, nextIndex)));
    openedAt.current = Date.now();
  }

  async function submitObjective() {
    if (!objective || !currentItem) return;
    const elapsed = Math.min(3_600_000, Math.max(0, Date.now() - openedAt.current));
    const finalAnswers = {
      ...answers,
      [currentItem.id]: {
        response: responseFor(currentItem, answers[currentItem.id]), responseMs: elapsed,
        audioPlayCount: answers[currentItem.id]?.audioPlayCount ?? (currentItem.stimulus.kind === 'audio' ? 0 : null),
      },
    };
    setAnswers(finalAnswers); setView('loading');
    try {
      const response = await fetch(`/api/diagnostic/attempts/${objective.attemptId}/stages/${objective.stage.stageId}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptVersion: objective.attemptVersion,
          responses: objective.items.map(item => ({
            itemId: item.id, contentVersion: item.contentVersion,
            response: responseFor(item, finalAnswers[item.id]),
            responseMs: finalAnswers[item.id]?.responseMs ?? null,
            audioPlayCount: finalAnswers[item.id]?.audioPlayCount ?? (item.stimulus.kind === 'audio' ? 0 : null),
          })),
        }),
      });
      const body = await response.json() as { ok?: boolean; delivery?: ObjectiveDelivery | WritingDelivery; error?: string };
      if (response.status === 409) { await resume(objective.attemptId); return; }
      if (!response.ok || !body.delivery) { setMessage(body.error ?? 'No pudimos guardar esta etapa.'); setView('objective'); return; }
      activateDelivery(body.delivery);
    } catch {
      setMessage('No pudimos guardar esta etapa. Tus respuestas siguen en esta pantalla.'); setView('objective');
    }
  }

  async function submitWriting() {
    if (!writing) return;
    const count = wordCount(writingText);
    if (count < writing.prompt.minimumWords || count > writing.prompt.maximumWords) return;
    setView('loading');
    try {
      const response = await fetch(`/api/diagnostic/attempts/${writing.attemptId}/stages/${writing.stage.stageId}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptVersion: writing.attemptVersion, responseText: writingText }),
      });
      const body = await response.json() as { ok?: boolean; error?: string };
      if (response.status === 409) { await resume(writing.attemptId); return; }
      if (!response.ok) { setMessage(body.error ?? 'No pudimos guardar tu escritura.'); setView('writing'); return; }
      setView('processing');
    } catch {
      setMessage('No pudimos guardar tu escritura. El texto sigue disponible en esta sesión.'); setView('writing');
    }
  }

  if (view === 'loading') return <Status title="Guardando evidencia…" text="No cierres esta ventana." />;
  if (view === 'processing') return <Status title="Tu evidencia está completa" text="La escritura está pendiente de revisión. Publicaremos el perfil integral cuando la evaluación humana quede cerrada." />;
  if (view === 'result') return <ResultProfile profile={result} onRestart={() => { setResult(null); setView('intro'); }} />;
  if (view === 'error') return <Status title="No pudimos continuar" text={message} action={<button className={s.secondary} onClick={() => { const id = sessionStorage.getItem(STORAGE_KEY); if (id) { setView('loading'); void resume(id); } else setView('intro'); }}>Reintentar</button>} />;

  if (view === 'writing' && writing) {
    const count = wordCount(writingText);
    const valid = count >= writing.prompt.minimumWords && count <= writing.prompt.maximumWords;
    return <section className={s.hero}><div className={s.shell}>
      <div className={s.testHeader}><span>Etapa final · Escritura</span><span>{writing.prompt.recommendedMinutes} min sugeridos</span></div>
      <article className={s.question}>
        <p className={s.eyebrow}>{writing.prompt.title}</p>
        <h2>{writing.prompt.situation}</h2>
        <ul className={s.instructions}>{writing.prompt.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}</ul>
        <label className={s.writingLabel}>Tu respuesta
          <textarea className={s.writingArea} value={writingText} onChange={event => setWritingText(event.target.value)} rows={12} spellCheck lang="en" />
        </label>
        <div className={s.wordMeter}><span>{count} palabras</span><span>mín. {writing.prompt.minimumWords} · máx. {writing.prompt.maximumWords}</span></div>
        {message && <p className={s.inlineError}>{message}</p>}
        <button className={s.primary} disabled={!valid} onClick={() => void submitWriting()}>Enviar para evaluación <span>→</span></button>
      </article>
    </div></section>;
  }

  if (view === 'objective' && objective && currentItem) {
    const answer = responseFor(currentItem, currentAnswer);
    const plays = currentAnswer?.audioPlayCount ?? 0;
    const audioStimulus = currentItem.stimulus.kind === 'audio' ? currentItem.stimulus : null;
    const multipleChoice = currentItem.response.kind === 'multiple-choice' ? currentItem.response : null;
    return <section className={s.hero}><div className={s.shell}>
      <div className={s.testHeader}><span>{objective.stage.kind === 'confirmation' ? 'Confirmación adaptativa' : 'Diagnóstico adaptativo'}</span><span>{itemIndex + 1} / {objective.items.length}</span></div>
      <div className={s.progress} role="progressbar" aria-label="Progreso de la etapa" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><i style={{ width: `${progress}%` }} /></div>
      <div className={s.levelRow}><span>Etapa</span><b>{objective.stage.kind}</b><span>{SKILL_LABELS[currentItem.skill] ?? currentItem.skill}</span></div>
      <article className={s.question}>
        {currentItem.stimulus.kind === 'text' && <div className={s.stimulus}>{currentItem.stimulus.title && <strong>{currentItem.stimulus.title}</strong>}<p>{currentItem.stimulus.body}</p></div>}
        {audioStimulus && <div className={s.audioCard}>
          <div><strong>Escucha el fragmento</strong><small>{plays} de {audioStimulus.maxPlays} reproducciones iniciadas</small></div>
          <audio
            className={s.audioPlayer} controls controlsList="nodownload noplaybackrate" preload="metadata"
            src={audioStimulus.src}
            onLoadedMetadata={event => { event.currentTarget.currentTime = audioStimulus.startMs / 1000; }}
            onTimeUpdate={event => { if (event.currentTarget.currentTime * 1000 >= audioStimulus.endMs) event.currentTarget.pause(); }}
            onPlay={event => {
              if (plays >= audioStimulus.maxPlays) { event.currentTarget.pause(); return; }
              setAnswers(previous => ({ ...previous, [currentItem.id]: {
                response: responseFor(currentItem, previous[currentItem.id]),
                responseMs: previous[currentItem.id]?.responseMs ?? null,
                audioPlayCount: (previous[currentItem.id]?.audioPlayCount ?? 0) + 1,
              } }));
            }}
          />
        </div>}
        <h2>{currentItem.prompt}</h2>
        {(currentItem.response.kind === 'single-choice' || currentItem.response.kind === 'multiple-choice') && <div className={s.options}>
          {currentItem.displayOptions?.map((option, index) => {
            const selected = answer.kind === 'single-choice' ? answer.optionId === option.id
              : answer.kind === 'multiple-choice' && answer.optionIds.includes(option.id);
            return <button key={option.id} className={selected ? s.selected : ''} onClick={() => {
              if (currentItem.response.kind === 'single-choice') updateResponse({ kind: 'single-choice', optionId: option.id });
              else if (answer.kind === 'multiple-choice') {
                const optionIds = selected ? answer.optionIds.filter(id => id !== option.id) : [...answer.optionIds, option.id];
                if (multipleChoice && optionIds.length <= multipleChoice.selectCount) updateResponse({ kind: 'multiple-choice', optionIds });
              }
            }}><span>{String.fromCharCode(65 + index)}</span>{option.text}</button>;
          })}
          <button className={(answer.kind === 'single-choice' && answer.optionId === null) || (answer.kind === 'multiple-choice' && answer.optionIds.length === 0) ? s.selected : ''} onClick={() => updateResponse(currentItem.response.kind === 'single-choice' ? { kind: 'single-choice', optionId: null } : { kind: 'multiple-choice', optionIds: [] })}><span>—</span>No sé / omitir</button>
        </div>}
        {currentItem.response.kind === 'short-text' && answer.kind === 'short-text' && <textarea className={s.writingArea} rows={5} value={answer.value} onChange={event => updateResponse({ kind: 'short-text', value: event.target.value })} />}
        <div className={s.itemActions}>
          <button className={s.secondary} disabled={itemIndex === 0} onClick={() => moveItem(itemIndex - 1)}>Anterior</button>
          {itemIndex < objective.items.length - 1
            ? <button className={s.primary} onClick={() => moveItem(itemIndex + 1)}>Siguiente <span>→</span></button>
            : <button className={s.primary} onClick={() => void submitObjective()}>Enviar etapa <span>→</span></button>}
        </div>
      </article>
      {message && <p className={s.inlineError}>{message}</p>}
      <p className={s.note}>Puedes omitir una pregunta; la omisión se reporta como evidencia faltante, no como un acierto o error inventado.</p>
    </div></section>;
  }

  return <section className={s.hero}><div className={s.shell}>
    <p className={s.eyebrow}>Diagnóstico adaptativo · Inglés A1–C2</p>
    <h1>Tu perfil real,<br /><span>habilidad por habilidad.</span></h1>
    <p className={s.lead}>El examen usa etapas adaptativas para medir lectura, escucha, gramática y vocabulario; termina con una producción escrita revisada antes de publicar el resultado.</p>
    <div className={s.skillGrid}>{Object.entries(SKILL_LABELS).map(([key, label]) => <div className={s.skill} key={key}>{label}<small>{key === 'writing' ? 'rúbrica + revisión' : 'evidencia objetiva'}</small></div>)}</div>
    <div className={s.readinessBox}>
      <button className={audioReady ? s.audioChecked : s.secondary} onClick={() => void testAudio()}>{audioReady ? '✓ Sonido verificado' : 'Probar sonido'}</button>
      <label><input type="checkbox" checked={consented} onChange={event => setConsented(event.target.checked)} /> Acepto que mis respuestas se usen para estimar mi nivel y mejorar la calibración del diagnóstico.</label>
    </div>
    {message && <p className={s.inlineError}>{message}</p>}
    {authRequired ? <Link className={s.primary} href={`/login?next=${encodeURIComponent('/nivel-radar')}`}>Iniciar sesión y continuar <span>→</span></Link>
      : <button className={s.primary} disabled={!audioReady || !consented} onClick={() => void start()}>Iniciar diagnóstico <span>→</span></button>}
    <p className={s.note}>35–45 minutos · El resultado muestra incertidumbre · No es una certificación oficial</p>
  </div></section>;
}

function Status({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return <section className={s.hero}><div className={s.shell}><p className={s.eyebrow}>Nivel Radar WeLearn</p><h1>{title}</h1><p className={s.lead}>{text}</p>{action}</div></section>;
}

function ResultProfile({ profile, onRestart }: { profile: unknown; onRestart: () => void }) {
  const safe = profile && typeof profile === 'object' && !Array.isArray(profile) ? profile as Record<string, unknown> : {};
  const globalLevel = typeof safe.globalLevel === 'string' ? safe.globalLevel : null;
  const globalRange = Array.isArray(safe.globalRange) ? safe.globalRange.map(String) : [];
  const skills = Array.isArray(safe.skills) ? safe.skills.filter(item => item && typeof item === 'object').map(item => item as Record<string, unknown>) : [];
  return <section className={s.hero}><div className={s.shell}>
    <p className={s.eyebrow}>Perfil integral</p>
    <div className={s.resultLevel}>{globalLevel ?? '—'}</div>
    <h1>{globalLevel ? <>Nivel global <span>{globalLevel}</span></> : 'Evidencia insuficiente para un nivel global'}</h1>
    <p className={s.lead}>{globalRange.length === 2 ? `Rango plausible global: ${globalRange[0]}–${globalRange[1]}.` : 'El resultado conserva las habilidades por separado para no esconder evidencia faltante.'}</p>
    <div className={s.profileGrid}>{skills.map(skill => {
      const name = String(skill.skill ?? 'skill');
      const range = Array.isArray(skill.plausibleRange) ? skill.plausibleRange.map(String) : [];
      const confidence = typeof skill.confidence === 'number' ? `${Math.round(skill.confidence * 100)}%` : 'sin estimar';
      return <div key={name} className={s.profileCard}><span>{SKILL_LABELS[name] ?? name}</span><b>{String(skill.estimatedLevel ?? '—')}</b><small>{range.length === 2 ? `${range[0]}–${range[1]} · ` : ''}{confidence}</small></div>;
    })}</div>
    <p className={s.disclaimer}>Las estimaciones se muestran como provisionales hasta completar calibración con muestra real. Este resultado no sustituye un certificado oficial.</p>
    <div className={s.actions}><button className={s.secondary} onClick={onRestart}>Nuevo diagnóstico</button><Link className={s.primary} href="/dashboard/student">Ver mi panel <span>→</span></Link></div>
  </div></section>;
}
