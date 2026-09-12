'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Review = { id: string; status: string; stage: string; requestedAt: string; dueAt: string; completedAt: string | null; attempts: number; assignedToMe: boolean; lastError: string | null };
type Assignment = { reviewId: string; leaseId: string; leaseExpiresAt?: string; payload: Record<string, unknown> };
type Queue = { environment: 'sandbox' | 'production'; deadNotifications: number; reviews: Review[]; reviewerReady: boolean; activeAssignment: Assignment | null };

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
  const [busy, setBusy] = useState(false);
  const completionKeys = useRef(new Map<string, string>());

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/icfes/teacher-reviews', { cache: 'no-store' });
    const body = await response.json();
    if (!response.ok) throw new Error('No pudimos cargar la bandeja.');
    setQueue(body as Queue);
    setAssignment(body.activeAssignment ?? null);
  }, []);

  // Initial fetch synchronizes this live operations view with the private queue.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load().catch((error) => setMessage(error.message)); }, [load]);
  const prompt = useMemo(() => assignment ? codexBrief(assignment) : '', [assignment]);

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

  async function claim(reviewId?: string) {
    setBusy(true); setMessage('');
    try {
      const data = await post(reviewId ? { action: 'claim', reviewId } : { action: 'claim-next' });
      setAssignment(data.assignment);
      setMessage('Revisión reservada por 15 minutos. Copia el encargo a Codex y valida la respuesta antes de enviarla.');
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No pudimos reservar la revisión.'); }
    finally { setBusy(false); }
  }

  async function renew() {
    if (!assignment) return;
    setBusy(true);
    try { await post({ action: 'renew', reviewId: assignment.reviewId, leaseId: assignment.leaseId }); setMessage('Reserva renovada por 15 minutos.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'No pudimos renovar la reserva.'); }
    finally { setBusy(false); }
  }

  async function complete() {
    if (!assignment) return;
    setBusy(true); setMessage('');
    try {
      const parsed = JSON.parse(resultJson) as unknown;
      let completionKey = completionKeys.current.get(assignment.reviewId);
      if (!completionKey) {
        completionKey = crypto.randomUUID();
        completionKeys.current.set(assignment.reviewId, completionKey);
      }
      await post({ action: 'complete', reviewId: assignment.reviewId, leaseId: assignment.leaseId, result: parsed }, completionKey);
      completionKeys.current.delete(assignment.reviewId);
      setAssignment(null); setResultJson(''); setMessage('Retroalimentación enviada. La notificación al estudiante quedó en la cola durable.');
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'El JSON no cumple el contrato.'); }
    finally { setBusy(false); }
  }

  return <main style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 20px 80px' }}>
    <Link href="/dashboard/admin">← Volver al panel</Link>
    <p style={{ letterSpacing: '.12em', marginTop: 28 }}>WELEARN / OPERACIÓN PRIVADA</p>
    <h1>Bandeja de revisiones ICFES</h1>
    {queue && <p><strong>Ambiente:</strong> {queue.environment}</p>}
    <p>Sin datos personales en el encargo a Codex. La entrega final siempre la confirma un administrador calibrado.</p>
    {queue && !queue.reviewerReady && <p role="alert" style={{ padding: 16, background: '#fff4dd' }}>La bandeja es visible, pero tu cuenta no puede reclamar ni entregar hasta tener una calibración vigente en la tabla de revisores.</p>}
    {queue && queue.deadNotifications > 0 && <p role="alert" style={{ padding: 16, background: '#ffe6e6' }}>{queue.deadNotifications} notificación(es) agotaron sus reintentos. Debes revisar correo, configuración y logs antes de continuar ventas.</p>}
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0' }}>
      <button type="button" disabled={busy || !queue?.reviewerReady || Boolean(assignment)} onClick={() => void claim()}>Tomar la más urgente</button>
      <button type="button" disabled={busy} onClick={() => void load().catch(() => setMessage('No pudimos actualizar la bandeja.'))}>Actualizar bandeja</button>
    </div>
    {message && <p role="status">{message}</p>}

    {assignment && <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 20, margin: '28px 0' }}>
      <h2>Encargo activo</h2>
      <p><code>{assignment.reviewId}</code></p>
      {assignment.leaseExpiresAt && <p>Reserva vigente hasta {new Date(assignment.leaseExpiresAt).toLocaleTimeString('es-CO', { timeZone: 'America/Bogota' })}.</p>}
      <label style={{ display: 'block' }}><strong>1. Encargo para Codex</strong>
        <textarea readOnly value={prompt} rows={18} style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'monospace' }} />
      </label>
      <button type="button" onClick={() => void navigator.clipboard.writeText(prompt).then(() => setMessage('Encargo copiado.')).catch(() => setMessage('No pudimos copiar; selecciona el texto manualmente.'))}>Copiar encargo para Codex</button>{' '}
      <button type="button" disabled={busy} onClick={() => void renew()}>Renovar 15 minutos</button>
      <label style={{ display: 'block', marginTop: 20 }}><strong>2. JSON revisado y aprobado por ti</strong>
        <textarea value={resultJson} onChange={(event) => setResultJson(event.target.value)} rows={16} placeholder="Pega aquí el JSON que verificaste." style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'monospace' }} />
      </label>
      <button type="button" disabled={busy || !resultJson.trim()} onClick={() => void complete()}>Aprobar, entregar y notificar</button>
    </section>}

    <section>
      <h2>Solicitudes</h2>
      <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th scope="col" align="left">Límite</th><th scope="col" align="left">Estado</th><th scope="col" align="left">Intentos</th><th scope="col" align="left">Referencia</th><th scope="col">Acción</th></tr></thead>
        <tbody>{queue?.reviews.map((review) => <tr key={review.id} style={{ borderTop: '1px solid #ddd' }}>
          <td>{new Date(review.dueAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</td>
          <td>{review.status}{review.assignedToMe ? ' · tuya' : ''}</td><td>{review.attempts}</td><td><code>{review.id.slice(0, 8)}…</code></td>
          <td>{['queued', 'failed', 'needs_qa'].includes(review.status) && <button type="button" disabled={busy || !queue.reviewerReady || Boolean(assignment)} onClick={() => void claim(review.id)}>Tomar</button>}</td>
        </tr>)}</tbody>
      </table></div>
      {queue && queue.reviews.length === 0 && <p>No hay solicitudes todavía.</p>}
    </section>
  </main>;
}
