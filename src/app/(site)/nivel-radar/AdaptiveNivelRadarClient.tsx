'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearDiagnosticAttemptDrafts,
  readObjectiveDraft,
  writeObjectiveDraft,
  type DiagnosticDraftAnswer,
  type DiagnosticSubmittedResponse,
} from '@/lib/diagnostic-draft';
import audioCheck from '../../../../config/diagnostic/audio-check.json';
import {
  diagnosticConfidenceLabel,
  diagnosticLanguageUseIntegrationLabel,
  diagnosticProfileWarningLabel,
  diagnosticSkillStatusLabel,
} from '@/lib/diagnostic/result-language';
import s from './page.module.css';

const CONSENT_VERSION = 'diagnostic-pilot-2026-09-24';
const STORAGE_KEY = 'welearn:diagnostic:active-attempt';
const SKILL_LABELS: Record<string, string> = {
  reading: 'Lectura', listening: 'Escucha', 'written-discourse': 'Discurso escrito', grammar: 'Gramática', vocabulary: 'Vocabulario',
};
const WRITING_EXCLUSION_LABELS: Record<string, string> = {
  'partially-off-task': 'respuesta parcialmente fuera de tema',
  'off-task': 'respuesta fuera de tema',
  'prompt-copy': 'coincidencia material con la consigna',
  'suspected-external-text': 'autoría no verificable',
  'reviewer-excluded': 'muestra excluida por revisión',
};

type SubmittedResponse = DiagnosticSubmittedResponse;

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
    | { kind: 'ordering'; optionIds: readonly string[] }
    | { kind: 'short-text'; maxWords: number };
  displayOptions?: readonly { id: string; text: string }[];
};

type Stage = { stageId: string; kind: 'locator' | 'precision' | 'confirmation' | 'writing'; itemIds: readonly string[] };
type ObjectiveDelivery = { attemptId: string; attemptVersion: number; expiresAt: string; stage: Stage; items: readonly PublicItem[]; listeningAccommodation: boolean };
type ResumePayload =
  | { kind: 'objective-stage'; delivery: ObjectiveDelivery }
  | { kind: 'processing'; attemptId: string; attemptVersion: number; status: 'scoring'; writingStatus: string | null }
  | { kind: 'result'; attemptId: string; attemptVersion: number; status: 'completed'; resultProfile: unknown }
  | { kind: 'closed'; attemptId: string; attemptVersion: number; status: 'expired' | 'abandoned' };

type DraftAnswer = DiagnosticDraftAnswer;
type View = 'intro' | 'loading' | 'objective' | 'processing' | 'result' | 'error';

const REVIEW_ATTEMPT_ID = 'diagnostic-review-preview';
const REVIEW_EXPIRES_AT = '2099-12-31T23:59:59.000Z';
const REVIEW_OBJECTIVE_DELIVERY: ObjectiveDelivery = {
  attemptId: REVIEW_ATTEMPT_ID,
  attemptVersion: 1,
  expiresAt: REVIEW_EXPIRES_AT,
  stage: {
    stageId: 'review-locator',
    kind: 'locator',
    itemIds: ['review-reading', 'review-listening', 'review-grammar', 'review-vocabulary'],
  },
  items: [
    {
      id: 'review-reading', contentVersion: 'review-v1', skill: 'reading', subdomain: 'explicit-detail',
      prompt: 'When does the Saturday workshop begin?',
      stimulus: {
        kind: 'text', stimulusId: 'review-notice', title: 'Community workshop',
        body: 'The bicycle workshop opens at 9:30 on Saturday. Please arrive ten minutes early if you need to borrow tools.',
      },
      response: { kind: 'single-choice', optionIds: ['nine', 'nine-thirty', 'ten'] },
      displayOptions: [
        { id: 'nine', text: 'At 9:00.' },
        { id: 'nine-thirty', text: 'At 9:30.' },
        { id: 'ten', text: 'At 10:00.' },
      ],
    },
    {
      id: 'review-listening', contentVersion: 'review-v1', skill: 'listening', subdomain: 'gist',
      prompt: 'What place is the speaker mainly describing?',
      stimulus: {
        kind: 'audio', mediaId: 'review-audio', src: audioCheck.assetPath,
        startMs: 0, endMs: 3_600_000, maxPlays: 2,
      },
      response: { kind: 'single-choice', optionIds: ['cafe', 'station', 'library'] },
      displayOptions: [
        { id: 'cafe', text: 'A café.' },
        { id: 'station', text: 'A train station.' },
        { id: 'library', text: 'A library.' },
      ],
    },
    {
      id: 'review-grammar', contentVersion: 'review-v1', skill: 'grammar', subdomain: 'verb-form',
      prompt: 'Choose the sentence that is grammatically complete.',
      stimulus: { kind: 'none' },
      response: { kind: 'single-choice', optionIds: ['arrived', 'arrive', 'arriving'] },
      displayOptions: [
        { id: 'arrived', text: 'She arrived before the class started.' },
        { id: 'arrive', text: 'She arrive before the class started.' },
        { id: 'arriving', text: 'She arriving before the class started.' },
      ],
    },
    {
      id: 'review-vocabulary', contentVersion: 'review-v1', skill: 'vocabulary', subdomain: 'meaning-in-context',
      prompt: 'In this context, what does “borrow” mean?',
      stimulus: { kind: 'text', stimulusId: 'review-context', body: 'You may borrow a helmet for the workshop, but you must return it before leaving.' },
      response: { kind: 'single-choice', optionIds: ['use-return', 'buy', 'repair'] },
      displayOptions: [
        { id: 'use-return', text: 'Use something temporarily and return it.' },
        { id: 'buy', text: 'Pay to own something permanently.' },
        { id: 'repair', text: 'Fix something that is broken.' },
      ],
    },
  ],
  listeningAccommodation: false,
};
const REVIEW_DISCOURSE_DELIVERY: ObjectiveDelivery = {
  attemptId: REVIEW_ATTEMPT_ID,
  attemptVersion: 2,
  expiresAt: REVIEW_EXPIRES_AT,
  stage: { stageId: 'review-written-discourse', kind: 'precision', itemIds: ['review-discourse-connector', 'review-discourse-order', 'review-discourse-insert', 'review-discourse-edit'] },
  items: [
    {
      id: 'review-discourse-connector', contentVersion: 'review-v2', skill: 'written-discourse', subdomain: 'rhetorical-relations',
      prompt: 'Choose the phrase that best expresses the relationship between the two ideas.',
      stimulus: { kind: 'text', stimulusId: 'review-discourse-connector-text', title: 'A changed plan', body: 'The outdoor concert was cancelled. ___, the musicians performed inside the town hall.' },
      response: { kind: 'single-choice', optionIds: ['for-example', 'instead', 'meanwhile'] },
      displayOptions: [{ id: 'for-example', text: 'For example' }, { id: 'instead', text: 'Instead' }, { id: 'meanwhile', text: 'Meanwhile' }],
    },
    {
      id: 'review-discourse-order', contentVersion: 'review-v2', skill: 'written-discourse', subdomain: 'organisation-sequencing',
      prompt: 'Order the fragments to form a coherent paragraph.',
      stimulus: { kind: 'text', stimulusId: 'review-discourse-order-text', title: 'Community garden', body: 'The paragraph explains why a neighbourhood project succeeded.' },
      response: { kind: 'ordering', optionIds: ['order-c', 'order-a', 'order-d', 'order-b'] },
      displayOptions: [
        { id: 'order-c', text: 'As a result, more residents volunteered during the following month.' },
        { id: 'order-a', text: 'At first, only six people worked in the community garden.' },
        { id: 'order-d', text: 'The organisers therefore added a second weekly session.' },
        { id: 'order-b', text: 'After they shared photographs of the first harvest, interest grew quickly.' },
      ],
    },
    {
      id: 'review-discourse-insert', contentVersion: 'review-v2', skill: 'written-discourse', subdomain: 'cohesion-reference',
      prompt: 'Where should this sentence go? “This limitation matters when the figures are compared across years.”',
      stimulus: { kind: 'text', stimulusId: 'review-discourse-insert-text', title: 'Survey results', body: 'The survey reached twice as many people as last year. [1] However, most new respondents were under twenty-five. [2] The apparent increase may therefore reflect the sample rather than a change in opinion. [3]' },
      response: { kind: 'single-choice', optionIds: ['position-1', 'position-2', 'position-3'] },
      displayOptions: [{ id: 'position-1', text: 'Position 1' }, { id: 'position-2', text: 'Position 2' }, { id: 'position-3', text: 'Position 3' }],
    },
    {
      id: 'review-discourse-edit', contentVersion: 'review-v2', skill: 'written-discourse', subdomain: 'revision-coherence',
      prompt: 'The intended meaning is that Marta reviewed the budget. Choose the clearest revision.',
      stimulus: { kind: 'text', stimulusId: 'review-discourse-edit-text', title: 'An ambiguous reference', body: 'Marta discussed the proposal with Elena after she reviewed the budget.' },
      response: { kind: 'single-choice', optionIds: ['marta', 'elena', 'proposal'] },
      displayOptions: [
        { id: 'marta', text: 'After reviewing the budget, Marta discussed the proposal with Elena.' },
        { id: 'elena', text: 'After Elena reviewed the budget, Marta discussed the proposal with her.' },
        { id: 'proposal', text: 'Marta discussed the proposal with Elena before reviewing the budget.' },
      ],
    },
  ],
  listeningAccommodation: false,
};
const REVIEW_RESULT = {
  globalLevel: 'B1', globalRange: ['A2', 'B1'], overallStatus: 'provisional',
  skills: ['reading', 'listening', 'written-discourse', 'grammar', 'vocabulary'].map((skill, index) => ({
    skill, status: 'provisional', estimatedLevel: index === 1 ? 'A2' : 'B1',
    plausibleRange: index === 1 ? ['A1', 'B1'] : ['A2', 'B2'], confidence: index === 1 ? 0.54 : 0.76,
  })),
  recommendations: [{
    priority: 1, skill: 'listening', currentLevel: 'A2', targetLevel: 'B1',
    reason: 'La escucha conserva el rango más amplio en este resultado simulado.',
    practice: { href: '/practica/ingles/a2/escucha', label: 'Abrir práctica de escucha' },
  }],
  warnings: ['Vista de revisión: el perfil mostrado es simulado y no procede de una calificación.'],
};

function responseFor(item: PublicItem, answer?: DraftAnswer): SubmittedResponse {
  if (answer) return answer.response;
  if (item.response.kind === 'single-choice') return { kind: 'single-choice', optionId: null };
  if (item.response.kind === 'multiple-choice') return { kind: 'multiple-choice', optionIds: [] };
  if (item.response.kind === 'ordering') return { kind: 'ordering', optionIds: [] };
  return { kind: 'short-text', value: '' };
}

export default function AdaptiveNivelRadarClient({ reviewMode = false }: { reviewMode?: boolean }) {
  const [view, setView] = useState<View>('intro');
  const [audioReady, setAudioReady] = useState(false);
  const [audioSampleStarted, setAudioSampleStarted] = useState(false);
  const [listeningAccommodation, setListeningAccommodation] = useState(false);
  const [consented, setConsented] = useState(false);
  const [objective, setObjective] = useState<ObjectiveDelivery | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [message, setMessage] = useState('');
  const [deletingData, setDeletingData] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, DraftAnswer>>({});
  const openedAt = useRef(0);

  const activateDelivery = useCallback((delivery: ObjectiveDelivery) => {
    clearDiagnosticAttemptDrafts(sessionStorage, delivery.attemptId, delivery.stage.stageId);
    sessionStorage.setItem(STORAGE_KEY, delivery.attemptId);
    setMessage('');
    setAuthRequired(false);
    const draft = readObjectiveDraft(sessionStorage, delivery);
    const accommodatedAnswers = delivery.listeningAccommodation
      ? Object.fromEntries(delivery.items.filter(item => item.skill === 'listening').map(item => [item.id, {
        response: responseFor(item), responseMs: null, audioPlayCount: 0,
      }]))
      : {};
    setObjective(delivery); setAnswers({ ...(draft?.answers ?? {}), ...accommodatedAnswers }); setItemIndex(draft?.itemIndex ?? 0); openedAt.current = Date.now(); setView('objective');
  }, []);

  const applyResume = useCallback((payload: ResumePayload) => {
    if (payload.kind === 'objective-stage') return activateDelivery(payload.delivery);
    if (payload.kind === 'processing') { clearDiagnosticAttemptDrafts(sessionStorage, payload.attemptId); setView('processing'); return; }
    if (payload.kind === 'result') { clearDiagnosticAttemptDrafts(sessionStorage, payload.attemptId); sessionStorage.removeItem(STORAGE_KEY); setResult(payload.resultProfile); setView('result'); return; }
    clearDiagnosticAttemptDrafts(sessionStorage, payload.attemptId);
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
    if (reviewMode) return;
    const attemptId = sessionStorage.getItem(STORAGE_KEY);
    if (!attemptId) return;
    let active = true;
    queueMicrotask(() => {
      if (active) void resume(attemptId);
    });
    return () => { active = false; };
  }, [resume, reviewMode]);

  useEffect(() => {
    if (view !== 'processing') return;
    const attemptId = sessionStorage.getItem(STORAGE_KEY);
    if (!attemptId) return;
    const timer = window.setInterval(() => void resume(attemptId, true), 8_000);
    return () => window.clearInterval(timer);
  }, [resume, view]);

  useEffect(() => {
    if (view === 'objective' && objective) writeObjectiveDraft(sessionStorage, objective, answers, itemIndex);
  }, [answers, itemIndex, objective, view]);

  async function start() {
    if ((!audioReady && !listeningAccommodation) || !consented) return;
    if (reviewMode) {
      activateDelivery({ ...REVIEW_OBJECTIVE_DELIVERY, listeningAccommodation });
      return;
    }
    setView('loading'); setMessage(''); setAuthRequired(false);
    try {
      const response = await fetch('/api/diagnostic/attempts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'en', audioCheckPassed: audioReady,
          listeningAccommodation, consentVersion: CONSENT_VERSION,
        }),
      });
      const body = await response.json() as { ok?: boolean; delivery?: ObjectiveDelivery; error?: string; code?: string };
      if (response.status === 401) { setAuthRequired(true); setMessage('Inicia sesión para guardar y reanudar tu diagnóstico.'); setView('intro'); return; }
      if (!response.ok || !body.delivery) { setMessage(body.error ?? 'No pudimos iniciar el diagnóstico.'); setView('error'); return; }
      activateDelivery(body.delivery);
    } catch {
      setMessage('No pudimos conectar con el diagnóstico.'); setView('error');
    }
  }

  async function deleteDiagnosticData() {
    if (!window.confirm('¿Borrar definitivamente tus intentos, respuestas y resultados diagnósticos? Esta acción no se puede deshacer.')) return;
    setDeletingData(true); setMessage('');
    try {
      const response = await fetch('/api/diagnostic/attempts', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'DELETE_DIAGNOSTIC_DATA' }),
      });
      const body = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !body.ok) {
        setMessage(body.error ?? 'No pudimos borrar tus datos diagnósticos.');
        return;
      }
      sessionStorage.removeItem(STORAGE_KEY);
      setResult(null); setConsented(false); setAudioReady(false); setAudioSampleStarted(false); setListeningAccommodation(false);
      setMessage('Tus intentos, respuestas y resultados diagnósticos fueron borrados.');
      setView('intro');
    } catch {
      setMessage('No pudimos conectar con el servicio de borrado.');
    } finally {
      setDeletingData(false);
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

  function moveOrderingFragment(optionIds: readonly string[], from: number, direction: -1 | 1) {
    const to = from + direction;
    if (to < 0 || to >= optionIds.length) return;
    const reordered = [...optionIds];
    [reordered[from], reordered[to]] = [reordered[to], reordered[from]];
    updateResponse({ kind: 'ordering', optionIds: reordered });
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
    if (reviewMode) {
      if (objective.stage.stageId === REVIEW_OBJECTIVE_DELIVERY.stage.stageId) {
        activateDelivery(REVIEW_DISCOURSE_DELIVERY);
      } else {
        clearDiagnosticAttemptDrafts(sessionStorage, REVIEW_ATTEMPT_ID);
        sessionStorage.removeItem(STORAGE_KEY);
        setResult(REVIEW_RESULT);
        setMessage('Resultado simulado para revisar la presentación; no se guardó ni calificó ninguna respuesta.');
        setView('result');
      }
      return;
    }
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
      const body = await response.json() as { ok?: boolean; delivery?: ObjectiveDelivery; resultProfile?: unknown; error?: string };
      if (response.status === 409) { await resume(objective.attemptId); return; }
      if (!response.ok || (!body.delivery && !body.resultProfile)) { setMessage(body.error ?? 'No pudimos guardar esta etapa.'); setView('objective'); return; }
      clearDiagnosticAttemptDrafts(sessionStorage, objective.attemptId);
      if (body.delivery) activateDelivery(body.delivery);
      else {
        sessionStorage.removeItem(STORAGE_KEY);
        setResult(body.resultProfile);
        setMessage('Diagnóstico completado y calificado automáticamente.');
        setView('result');
      }
    } catch {
      setMessage('No pudimos guardar esta etapa. Tus respuestas siguen en esta pantalla.'); setView('objective');
    }
  }

  if (view === 'loading') return <Status title="Guardando evidencia…" text="No cierres esta ventana." />;
  if (view === 'processing') return <Status title="Calculando tu perfil" text="Estamos cerrando las cinco estimaciones objetivas. No se requiere revisión humana." />;
  if (view === 'result') return <ResultProfile profile={result} message={message} deletingData={deletingData} reviewMode={reviewMode} onDelete={() => void deleteDiagnosticData()} onRestart={() => { setResult(null); setMessage(''); setView('intro'); }} />;
  if (view === 'error') return <Status title="No pudimos continuar" text={message} action={<button className={s.secondary} onClick={() => { const id = sessionStorage.getItem(STORAGE_KEY); if (id) { setView('loading'); void resume(id); } else setView('intro'); }}>Reintentar</button>} />;

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
        {audioStimulus && objective.listeningAccommodation && <div className={s.audioCard}>
          <div><strong>Escucha omitida por accesibilidad</strong><small>Esta pregunta queda como evidencia faltante y no reduce las demás habilidades.</small></div>
        </div>}
        {audioStimulus && !objective.listeningAccommodation && <div className={s.audioCard}>
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
            return <button key={option.id} className={selected ? s.selected : ''} aria-pressed={selected} onClick={() => {
              if (currentItem.response.kind === 'single-choice') updateResponse({ kind: 'single-choice', optionId: option.id });
              else if (answer.kind === 'multiple-choice') {
                const optionIds = selected ? answer.optionIds.filter(id => id !== option.id) : [...answer.optionIds, option.id];
                if (multipleChoice && optionIds.length <= multipleChoice.selectCount) updateResponse({ kind: 'multiple-choice', optionIds });
              }
            }}><span>{String.fromCharCode(65 + index)}</span>{option.text}</button>;
          })}
          <button aria-pressed={(answer.kind === 'single-choice' && answer.optionId === null) || (answer.kind === 'multiple-choice' && answer.optionIds.length === 0)} className={(answer.kind === 'single-choice' && answer.optionId === null) || (answer.kind === 'multiple-choice' && answer.optionIds.length === 0) ? s.selected : ''} onClick={() => updateResponse(currentItem.response.kind === 'single-choice' ? { kind: 'single-choice', optionId: null } : { kind: 'multiple-choice', optionIds: [] })}><span>—</span>No sé / omitir</button>
        </div>}
        {currentItem.response.kind === 'ordering' && answer.kind === 'ordering' && <div className={s.ordering}>
          <p className={s.orderingHelp}>Organiza los fragmentos hasta formar el texto más coherente.</p>
          {(answer.optionIds.length ? answer.optionIds : currentItem.displayOptions?.map(option => option.id) ?? []).map((optionId, index, order) => {
            const option = currentItem.displayOptions?.find(candidate => candidate.id === optionId);
            if (!option) return null;
            return <div className={s.orderingRow} key={option.id}>
              <span className={s.orderingIndex}>{index + 1}</span>
              <span className={s.orderingText}>{option.text}</span>
              <span className={s.orderingActions}>
                <button type="button" aria-label={`Subir fragmento ${index + 1}`} disabled={index === 0} onClick={() => moveOrderingFragment(order, index, -1)}>↑</button>
                <button type="button" aria-label={`Bajar fragmento ${index + 1}`} disabled={index === order.length - 1} onClick={() => moveOrderingFragment(order, index, 1)}>↓</button>
              </span>
            </div>;
          })}
          <div className={s.orderingDecision}>
            {answer.optionIds.length === 0
              ? <button type="button" className={s.acceptOrdering} onClick={() => updateResponse({ kind: 'ordering', optionIds: currentItem.displayOptions?.map(option => option.id) ?? [] })}>Usar este orden</button>
              : <span aria-live="polite">Orden registrado</span>}
            <button type="button" className={s.omitOrdering} aria-pressed={answer.optionIds.length === 0} onClick={() => updateResponse({ kind: 'ordering', optionIds: [] })}>No sé / omitir</button>
          </div>
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
    <p className={s.eyebrow}>{reviewMode ? 'Preview de revisión · recorrido simulado' : 'Diagnóstico adaptativo · Inglés A1–C2'}</p>
    <h1>Tu perfil real,<br /><span>habilidad por habilidad.</span></h1>
    <p className={s.lead}>El examen usa etapas adaptativas para medir lectura, escucha, construcción del discurso escrito, gramática y vocabulario. Todo se califica automáticamente.</p>
    {reviewMode && <p className={s.inlineError}>Este modo sirve para revisar la experiencia completa. No guarda respuestas, no califica y el perfil final es una demostración.</p>}
    <div className={s.skillGrid}>{Object.entries(SKILL_LABELS).map(([key, label]) => <div className={s.skill} key={key}>{label}<small>{key === 'written-discourse' ? 'cohesión, orden y revisión' : 'evidencia objetiva'}</small></div>)}</div>
    <div className={s.readinessBox}>
      <div>
        <strong>Muestra de sonido no puntuada</strong>
        <p style={{ margin: '.35rem 0 .65rem', color: '#9facbf', fontSize: '.82rem' }}>Audio público reciclado sólo para verificar tu dispositivo; no aporta respuestas ni nivel.</p>
        <audio aria-label="Muestra de sonido no puntuada" controls controlsList="nodownload" preload="metadata" onPlay={() => {
          setAudioSampleStarted(true); setAudioReady(false); setListeningAccommodation(false); setMessage('');
        }} onError={() => {
          setAudioSampleStarted(false); setAudioReady(false);
          setMessage('No pudimos reproducir la muestra. Revisa la conexión, el volumen y los permisos del navegador.');
        }}>
          <source src={audioCheck.assetPath} type="audio/mpeg" />
          Tu navegador no puede reproducir esta muestra.
        </audio>
      </div>
      <label><input type="checkbox" disabled={!audioSampleStarted} checked={audioReady} onChange={event => setAudioReady(event.target.checked)} /> Confirmo que escuché la muestra con claridad.</label>
      <label><input type="checkbox" checked={listeningAccommodation} onChange={event => {
        setListeningAccommodation(event.target.checked);
        if (event.target.checked) setAudioReady(false);
      }} /> No puedo realizar la parte de escucha y necesito la vía accesible.</label>
      {listeningAccommodation && <p className={s.note}>Escucha quedará sin estimar, no se reproducirá audio y no se publicará una orientación global. Las demás dimensiones conservarán rutas independientes.</p>}
      <p className={s.note}>Guardamos respuestas y resultados en tu cuenta para reanudar el intento y calibrar el diagnóstico. No enviamos texto libre a revisores ni proveedores externos. Podrás borrar tus datos diagnósticos desde el resultado.</p>
      <label><input type="checkbox" checked={consented} onChange={event => setConsented(event.target.checked)} /> Acepto que mis respuestas se usen según lo descrito para estimar mi nivel y mejorar la calibración del diagnóstico.</label>
    </div>
    {message && <p className={s.inlineError}>{message}</p>}
    {authRequired ? <Link className={s.primary} href={`/login?next=${encodeURIComponent('/nivel-radar')}`}>Iniciar sesión y continuar <span>→</span></Link>
      : <button className={s.primary} disabled={(!audioReady && !listeningAccommodation) || !consented} onClick={() => void start()}>Iniciar diagnóstico <span>→</span></button>}
    <p className={s.note}>45–70 minutos · Una confirmación adaptativa puede ampliar la duración · El componente de discurso escrito usa tareas cerradas y no acredita producción libre · No es una certificación oficial</p>
  </div></section>;
}

function Status({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return <section className={s.hero} aria-live="polite"><div className={s.shell}><p className={s.eyebrow}>Nivel Radar WeLearn</p><h1>{title}</h1><p className={s.lead}>{text}</p>{action}</div></section>;
}

function ResultProfile({ profile, message, deletingData, reviewMode, onDelete, onRestart }: {
  profile: unknown;
  message: string;
  deletingData: boolean;
  reviewMode: boolean;
  onDelete: () => void;
  onRestart: () => void;
}) {
  const safe = profile && typeof profile === 'object' && !Array.isArray(profile) ? profile as Record<string, unknown> : {};
  const globalLevel = typeof safe.globalLevel === 'string' ? safe.globalLevel : null;
  const globalRange = Array.isArray(safe.globalRange) ? safe.globalRange.map(String) : [];
  const skills = Array.isArray(safe.skills) ? safe.skills.filter(item => item && typeof item === 'object').map(item => item as Record<string, unknown>) : [];
  const warnings = Array.isArray(safe.warnings) ? safe.warnings.map(diagnosticProfileWarningLabel) : [];
  const overallStatus = diagnosticSkillStatusLabel(safe.overallStatus);
  const validUntil = typeof safe.validUntil === 'string' && Number.isFinite(Date.parse(safe.validUntil))
    ? new Date(safe.validUntil) : null;
  const recommendations = Array.isArray(safe.recommendations)
    ? safe.recommendations.filter(item => item && typeof item === 'object').map(item => item as Record<string, unknown>)
    : [];
  return <section className={s.hero}><div className={s.shell}>
    <p className={s.eyebrow}>Perfil objetivo integral</p>
    <div className={s.resultLevel}>{globalLevel ?? '—'}</div>
    <h1>{globalLevel ? <>Nivel global <span>{globalLevel}</span></> : 'Evidencia insuficiente para un nivel global'}</h1>
    <p className={s.lead}>{globalRange.length === 2 ? `Rango plausible global: ${globalRange[0]}–${globalRange[1]}.` : 'El resultado conserva las habilidades por separado para no esconder evidencia faltante.'}</p>
    <p className={s.note}>Estado de medición: {overallStatus}.</p>
    <div className={s.profileGrid}>{skills.map(skill => {
      const name = String(skill.skill ?? 'skill');
      const range = Array.isArray(skill.plausibleRange) ? skill.plausibleRange.map(String) : [];
      const exclusionReasons = Array.isArray(skill.exclusionReasons)
        ? skill.exclusionReasons.map(String).map(reason => WRITING_EXCLUSION_LABELS[reason] ?? reason)
        : [];
      const confidence = diagnosticConfidenceLabel(skill.confidence);
      const status = diagnosticSkillStatusLabel(skill.status);
      const languageUseIntegration = diagnosticLanguageUseIntegrationLabel(skill.languageUseIntegration);
      return <div key={name} className={s.profileCard}><span>{SKILL_LABELS[name] ?? name}</span><b>{String(skill.estimatedLevel ?? '—')}</b><small>{status} · {range.length === 2 ? `${range[0]}–${range[1]} · ` : ''}{confidence}{exclusionReasons.length ? ` · ${exclusionReasons.join(' · ')}` : ''}{languageUseIntegration ? ` · ${languageUseIntegration}` : ''}</small></div>;
    })}</div>
    {recommendations.length > 0 && <><p className={s.eyebrow}>Ruta recomendada</p><div className={s.profileGrid}>{recommendations.slice(0, 3).map(recommendation => {
      const skill = String(recommendation.skill ?? 'skill');
      const practice = recommendation.practice && typeof recommendation.practice === 'object' ? recommendation.practice as Record<string, unknown> : {};
      const href = typeof practice.href === 'string' && practice.href.startsWith('/') ? practice.href : '/practica/ingles';
      return <div key={skill} className={s.profileCard}>
        <span>Prioridad {String(recommendation.priority ?? '—')} · {SKILL_LABELS[skill] ?? skill}</span>
        <b>{String(recommendation.currentLevel ?? '—')} → {String(recommendation.targetLevel ?? '—')}</b>
        <small>{String(recommendation.reason ?? '')}</small>
        <Link href={href}>{String(practice.label ?? 'Abrir práctica')} <span>→</span></Link>
      </div>;
    })}</div></>}
    {warnings.length > 0 && <p className={s.note}>Advertencias del perfil: {warnings.join(' · ')}</p>}
    <p className={s.note}>La confianza técnica resume cuánta precisión tiene esta estimación con la evidencia disponible; no es un porcentaje de dominio del idioma ni la probabilidad de que el nivel sea “correcto”.</p>
    {validUntil && <p className={s.note}>Vigente como orientación hasta {validUntil.toLocaleDateString('es-CO')}. Después conviene repetir el diagnóstico.</p>}
    <p className={s.disclaimer}>Las estimaciones se muestran como provisionales hasta completar calibración con muestra real. “Discurso escrito” mide organización y revisión mediante tareas cerradas; no demuestra producción escrita libre. Este resultado no sustituye un certificado oficial.</p>
    {message && <p className={s.inlineError} aria-live="polite">{message}</p>}
    <div className={s.actions}><IntegratedReportPdf globalLevel={globalLevel} globalRange={globalRange} skills={skills} recommendations={recommendations} warnings={warnings} validUntil={validUntil} /><button className={s.secondary} onClick={onRestart}>{reviewMode ? 'Repetir preview' : 'Nuevo diagnóstico'}</button>{!reviewMode && <Link className={s.primary} href="/dashboard/student">Ver mi panel <span>→</span></Link>}</div>
    {!reviewMode && <button className={s.secondary} disabled={deletingData} onClick={onDelete}>{deletingData ? 'Borrando datos…' : 'Borrar mis datos diagnósticos'}</button>}
  </div></section>;
}

function IntegratedReportPdf({ globalLevel, globalRange, skills, recommendations, warnings, validUntil }: {
  globalLevel: string | null;
  globalRange: string[];
  skills: Record<string, unknown>[];
  recommendations: Record<string, unknown>[];
  warnings: string[];
  validUntil: Date | null;
}) {
  const [creating, setCreating] = useState(false);
  async function download() {
    setCreating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      let y = 18;
      const line = (text: string, size = 10) => {
        doc.setFontSize(size);
        const rows = doc.splitTextToSize(text, 174) as string[];
        doc.text(rows, 18, y);
        y += rows.length * (size * 0.45) + 4;
      };
      line('Nivel Radar WeLearn — perfil objetivo integral', 17);
      line(`Nivel global: ${globalLevel ?? 'no estimado'}${globalRange.length === 2 ? ` · rango plausible ${globalRange[0]}–${globalRange[1]}` : ''}`, 12);
      if (validUntil) line(`Vigente como orientación hasta ${validUntil.toLocaleDateString('es-CO')}.`);
      line('Habilidades', 13);
      for (const skill of skills) {
        const name = String(skill.skill ?? 'skill');
        const range = Array.isArray(skill.plausibleRange) ? skill.plausibleRange.map(String) : [];
        const exclusionReasons = Array.isArray(skill.exclusionReasons)
          ? skill.exclusionReasons.map(String).map(reason => WRITING_EXCLUSION_LABELS[reason] ?? reason)
          : [];
        const confidence = diagnosticConfidenceLabel(skill.confidence);
        const status = diagnosticSkillStatusLabel(skill.status);
        const languageUseIntegration = diagnosticLanguageUseIntegrationLabel(skill.languageUseIntegration);
        line(`${SKILL_LABELS[name] ?? name}: ${String(skill.estimatedLevel ?? 'no estimado')}${range.length === 2 ? ` (${range[0]}–${range[1]})` : ''} · ${status} · ${confidence}${exclusionReasons.length ? ` · ${exclusionReasons.join(' · ')}` : ''}${languageUseIntegration ? ` · ${languageUseIntegration}` : ''}`);
      }
      if (recommendations.length) {
        line('Prioridades y próximos pasos', 13);
        for (const recommendation of recommendations.slice(0, 3)) {
          line(`${String(recommendation.priority ?? '—')}. ${SKILL_LABELS[String(recommendation.skill ?? '')] ?? String(recommendation.skill ?? '')}: ${String(recommendation.currentLevel ?? '—')} → ${String(recommendation.targetLevel ?? '—')}. ${String(recommendation.reason ?? '')}`);
        }
      }
      if (warnings.length) line(`Advertencias: ${warnings.join(' · ')}`);
      line('La confianza técnica expresa precisión de estimación; no es porcentaje de dominio ni probabilidad de acierto del nivel.', 9);
      line('Resultado provisional hasta completar calibración con muestra real. Discurso escrito usa tareas cerradas y no acredita producción libre. No es una certificación oficial.', 9);
      doc.save('nivel-radar-welearn.pdf');
    } finally {
      setCreating(false);
    }
  }
  return <button className={s.secondary} disabled={creating} onClick={() => void download()}>{creating ? 'Creando PDF…' : 'Descargar PDF'}</button>;
}
