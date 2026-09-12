'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Review = { id: string; status: string; stage: 'review' | 'qa'; requestedAt: string; dueAt: string; completedAt: string | null; attempts: number; assignedToMe: boolean; lastError: string | null; claimable: boolean };
type Assignment = { reviewId: string; leaseId: string; leaseExpiresAt: string; stage: 'review' | 'qa'; handoffRecorded: boolean; payload: Record<string, unknown> };
type DeadNotification = { id: string; reviewId: string; kind: string; attempts: number; lastError: string | null; nextAttemptAt: string };
type Queue = { environment: 'sandbox' | 'production'; deadNotifications: DeadNotification[] | null; reviews: Review[]; reviewerReady: boolean; activeAssignment: Assignment | null };

const RESULT_VERSION = 'icfes-teacher-review-result-2026-09-09-v1';
const RUBRIC_VERSION = 'icfes-teacher-rubric-2026-09-09-v1';

function codexBrief(assignment: Assignment): string {
  return `Revisa este intento ICFES como segundo par académico. Trabaja exclusivamente con el payload pseudonimizado y con el mock propio identificado por exam_id en este repositorio. Verifica cada clave antes de diagnosticar; no inventes datos ni puntaje oficial. Devuelve solamente JSON válido con version, rubricVersion, summary, strengths, priorities e itemFeedback[{questionId,feedback}]. Cada comentario debe estar respaldado por el intento.\n\nPAYLOAD:\n${JSON.stringify(assignment.payload, null, 2)}\n\nCONTRATO:\n${JSON.stringify({ version: RESULT_VERSION, rubricVersion: RUBRIC_VERSION, summary: 'Resumen pedagógico no oficial.', strengths: ['Fortaleza respaldada por evidencia.'], priorities: ['Tres acciones concretas y priorizadas.'], itemFeedback: [{ questionId: 'id-real-del-mock', feedback: 'Comentario basado en la respuesta real.' }] }, null, 2)}`;
}

export default function IcfesReviewInbox() {
  const [queue, setQueue] = useState<Queue | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [resultJson, setResultJson] = useState('');
  const [message, setMessage] = useState('');
  const [messageIsError, setMessageIsError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [codexModel, setCodexModel] = useState('Codex · sesión manual');
  const [humanAttested, setHumanAttested] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/icfes/teacher-reviews', { cache: 'no-store' });
    const body = await response.json();
    if (!response.ok) throw new Error('No pudimos cargar la bandeja.');
    setQueue(body as Queue);
    setAssignment(body.activeAssignment ?? null);
    if (!body.activeAssignment) {
      setResultJson('');
      setHumanAttested(false);
    }
  }, []);

  // Initial fetch synchronizes this live operations view with the private queue.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load().catch((error) => { setMessageIsError(true); setMessage(error.message); }); }, [load]);
  useEffect(() => {
    if (!assignment) return;
    const timer = window.setInterval(() => setNowMs(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [assignment]);
  const prompt = useMemo(() => assignment ? codexBrief(assignment) : '', [assignment]);
  const leaseRemainingMs = assignment ? Date.parse(assignment.leaseExpiresAt) - nowMs : 0;
  const leaseExpired = Boolean(assignment && (!Number.isFinite(leaseRemainingMs) || leaseRemainingMs <= 0));

  async function post(body: Record<string, unknown>, idempotencyKey?: string) {
    const response = await fetch('/api/admin/icfes/teacher-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}) },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.code === 'reviewer_not_ready'
      ? 'Tu usuario administrador todavía no está calibrado como revisor.'
      : 'La operación no se pudo completar. Actualiza la bandeja.');
    return data;
  }

  async function claim(review?: Review) {
    setBusy(true); setMessage(''); setMessageIsError(false);
    try {
      const data = await post(review
        ? { action: 'claim', reviewId: review.id, stage: review.stage }
        : { action: 'claim-next' });
      setAssignment(data.assignment);
      setResultJson(''); setHumanAttested(false);
      setMessage('Revisión reservada por 15 minutos. Copia el encargo a Codex y valida la respuesta antes de enviarla.');
      await load();
    } catch (error) { setMessageIsError(true); setMessage(error instanceof Error ? error.message : 'No pudimos reservar la revisión.'); }
    finally { setBusy(false); }
  }

  async function renew() {
    if (!assignment) return;
    setBusy(true); setMessageIsError(false);
    try {
      await post({ action: 'renew', reviewId: assignment.reviewId, leaseId: assignment.leaseId });
      await load();
      setMessage('Reserva renovada por 15 minutos desde ahora.');
    }
    catch (error) { setMessageIsError(true); setMessage(error instanceof Error ? error.message : 'No pudimos renovar la reserva.'); await load().catch(() => {}); }
    finally { setBusy(false); }
  }

  async function copyAndRecordHandoff() {
    if (!assignment || leaseExpired) return;
    setBusy(true); setMessage(''); setMessageIsError(false);
    try {
      await navigator.clipboard.writeText(prompt);
      await post({ action: 'handoff', reviewId: assignment.reviewId, leaseId: assignment.leaseId });
      setAssignment((current) => current ? { ...current, handoffRecorded: true } : current);
      setMessage('Encargo pseudónimo copiado y handoff registrado.');
    } catch {
      setMessageIsError(true);
      setMessage('No pudimos copiar y registrar el handoff. Selecciona el texto manualmente y vuelve a intentarlo.');
    } finally { setBusy(false); }
  }

  async function complete() {
    if (!assignment) return;
    setBusy(true); setMessage(''); setMessageIsError(false);
    try {
      const parsed = JSON.parse(resultJson) as unknown;
      await post({
        action: 'complete', reviewId: assignment.reviewId, leaseId: assignment.leaseId,
        result: parsed, codexModel, humanAttested,
      }, assignment.leaseId);
      setAssignment(null); setResultJson(''); setMessage('Retroalimentación enviada. La notificación al estudiante quedó en la cola durable.');
      await load();
    } catch (error) { setMessageIsError(true); setMessage(error instanceof Error ? error.message : 'El JSON no cumple el contrato.'); await load().catch(() => {}); }
    finally { setBusy(false); }
  }

  async function retryNotification(notificationId: string) {
    setBusy(true); setMessage(''); setMessageIsError(false);
    try {
      await post({ action: 'retry-notification', notificationId });
      await load();
      setMessage('Notificación reabierta y enviada al recuperador durable.');
    } catch (error) {
      setMessageIsError(true);
      setMessage(error instanceof Error ? error.message : 'No pudimos reabrir la notificación.');
    } finally { setBusy(false); }
  }

  return <main aria-busy={busy} style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 20px 80px' }}>
    <Link href="/dashboard/admin">← Volver al panel</Link>
    <p style={{ letterSpacing: '.12em', marginTop: 28 }}>WELEARN / OPERACIÓN PRIVADA</p>
    <h1>Bandeja de revisiones ICFES</h1>
    {queue && <p><strong>Ambiente:</strong> {queue.environment}</p>}
    <p>Sin datos personales en el encargo a Codex. La entrega final siempre la confirma un administrador calibrado.</p>
    {queue && !queue.reviewerReady && <p role="alert" style={{ padding: 16, background: '#fff4dd' }}>La bandeja es visible, pero tu cuenta no puede reclamar ni entregar hasta tener una calibración vigente en la tabla de revisores.</p>}
    {queue?.deadNotifications === null && <p role="alert">No pudimos comprobar la bandeja de notificaciones fallidas.</p>}
    {queue?.deadNotifications && queue.deadNotifications.length > 0 && <section aria-labelledby="dead-notifications-title" style={{ padding: 16, background: '#ffe6e6' }}>
      <h2 id="dead-notifications-title">Notificaciones que agotaron sus reintentos</h2>
      <p role="alert">Revisa la configuración del correo antes de reabrirlas.</p>
      <ul>{queue.deadNotifications.map((notification) => <li key={notification.id}>
        {notification.kind} · revisión <code>{notification.reviewId.slice(0, 8)}…</code>
        {notification.lastError ? ` · ${notification.lastError}` : ''}{' '}
        <button type="button" disabled={busy} onClick={() => void retryNotification(notification.id)}>Reintentar</button>
      </li>)}</ul>
    </section>}
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0' }}>
      <button type="button" disabled={busy || !queue?.reviewerReady || Boolean(assignment)} onClick={() => void claim()}>Tomar la más urgente</button>
      <button type="button" disabled={busy} onClick={() => void load().then(() => { setMessageIsError(false); setMessage('Bandeja actualizada.'); }).catch(() => { setMessageIsError(true); setMessage('No pudimos actualizar la bandeja.'); })}>Actualizar bandeja</button>
    </div>
    {message && <p role={messageIsError ? 'alert' : 'status'}>{message}</p>}

    {assignment && <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 20, margin: '28px 0' }}>
      <h2>Encargo activo</h2>
      <p><code>{assignment.reviewId}</code></p>
      <p>Etapa: <strong>{assignment.stage === 'qa' ? 'control de calidad' : 'revisión'}</strong>.</p>
      <p role={leaseExpired || leaseRemainingMs < 2 * 60_000 ? 'alert' : undefined}>
        {leaseExpired ? 'La reserva venció. Actualiza la bandeja para recuperarla.' : <>
          Reserva vigente hasta <time dateTime={assignment.leaseExpiresAt}>{new Date(assignment.leaseExpiresAt).toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' })}</time>
          {' '}({Math.max(1, Math.ceil(leaseRemainingMs / 60_000))} min restantes).
        </>}
      </p>
      <label style={{ display: 'block' }}><strong>1. Encargo para Codex</strong>
        <textarea readOnly value={prompt} rows={18} style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'monospace' }} />
      </label>
      <button type="button" disabled={busy || leaseExpired} onClick={() => void copyAndRecordHandoff()}>{assignment.handoffRecorded ? 'Volver a copiar encargo registrado' : 'Copiar y registrar handoff a Codex'}</button>{' '}
      <button type="button" disabled={busy || leaseExpired} onClick={() => void renew()}>Renovar 15 minutos</button>
      <label style={{ display: 'block', marginTop: 20 }}><strong>2. JSON revisado y aprobado por ti</strong>
        <textarea value={resultJson} onChange={(event) => setResultJson(event.target.value)} rows={16} placeholder="Pega aquí el JSON que verificaste." style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'monospace' }} />
      </label>
      <label style={{ display: 'block', marginTop: 16 }}><strong>Referencia del modelo o sesión Codex</strong>
        <input value={codexModel} maxLength={120} onChange={(event) => setCodexModel(event.target.value)} style={{ display: 'block', width: '100%', marginTop: 8 }} />
      </label>
      <label style={{ display: 'block', margin: '16px 0' }}>
        <input type="checkbox" checked={humanAttested} onChange={(event) => setHumanAttested(event.target.checked)} />{' '}
        Confirmo que revisé la evidencia, corregí cualquier error de la IA y apruebo personalmente esta entrega.
      </label>
      <p>La salida solo se atribuye como revisión humana después de esta aprobación de un revisor autorizado. Codex actúa como asistencia.</p>
      <button type="button" disabled={busy || leaseExpired || !assignment.handoffRecorded || !resultJson.trim() || !codexModel.trim() || !humanAttested} onClick={() => void complete()}>Aprobar humanamente, entregar y notificar</button>
    </section>}

    <section>
      <h2>Solicitudes</h2>
      <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th scope="col" align="left">Límite</th><th scope="col" align="left">Estado</th><th scope="col" align="left">Intentos</th><th scope="col" align="left">Referencia</th><th scope="col">Acción</th></tr></thead>
        <tbody>{queue?.reviews.map((review) => <tr key={review.id} style={{ borderTop: '1px solid #ddd' }}>
          <td>{new Date(review.dueAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</td>
          <td>{review.status}{review.assignedToMe ? ' · tuya' : ''}</td><td>{review.attempts}</td><td><code>{review.id.slice(0, 8)}…</code></td>
          <td>{review.claimable && <button type="button" disabled={busy || !queue.reviewerReady || Boolean(assignment)} onClick={() => void claim(review)}>Tomar</button>}</td>
        </tr>)}</tbody>
      </table></div>
      {queue && queue.reviews.length === 0 && <p>No hay solicitudes todavía.</p>}
    </section>
  </main>;
}
