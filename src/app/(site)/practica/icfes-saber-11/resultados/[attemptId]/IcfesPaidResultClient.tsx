'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { IcfesPremiumDetailDto, IcfesTeacherReviewStatusDto } from '@/lib/icfes/attempt-contract';
import { trackIcfesEvent } from '@/lib/analytics/icfes';
import { ICFES_DETAIL_OFFER_ID } from '@/lib/icfes/commerce-v1';

const TEACHER_REVIEW_POLL_MS = 15_000;
const TERMINAL_TEACHER_STATUSES = new Set(['completed', 'cancelled']);

function teacherStatusLabel(status: string): string {
  return ({
    queued: 'Solicitud recibida', in_review: 'En revisión', needs_qa: 'En control de calidad',
    failed: 'Reintentando la revisión', completed: 'Revisión entregada', cancelled: 'Revisión cancelada',
  } as Record<string, string>)[status] ?? 'Revisión en proceso';
}

function normalizeTeacherReview(value: unknown): IcfesTeacherReviewStatusDto | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  const nullableText = (item: unknown) => typeof item === 'string' ? item : item === null ? null : undefined;
  const status = nullableText(row.status);
  const requestedAt = nullableText(row.requestedAt);
  const dueAt = nullableText(row.dueAt);
  const completedAt = nullableText(row.completedAt);
  if (status === undefined || requestedAt === undefined || dueAt === undefined || completedAt === undefined) return null;
  return {
    canRequest: false, status, requestedAt, dueAt, completedAt,
    result: row.result && typeof row.result === 'object'
      ? row.result as IcfesTeacherReviewStatusDto['result'] : null,
  };
}

export default function IcfesPaidResultClient({ attemptId }: { attemptId: string }) {
  const [detail, setDetail] = useState<IcfesPremiumDetailDto | null>(null);
  const [error, setError] = useState('');
  const [teacherBusy, setTeacherBusy] = useState(false);
  const [teacherError, setTeacherError] = useState('');
  const [teacherStatusError, setTeacherStatusError] = useState('');

  const refreshTeacherReview = useCallback(async (signal?: AbortSignal): Promise<boolean> => {
    try {
      const response = await fetch(`/api/icfes/teacher-reviews?attemptId=${encodeURIComponent(attemptId)}`, {
        cache: 'no-store', signal,
      });
      const body = await response.json() as { code?: string; review?: unknown };
      if (!response.ok) throw new Error(body.code ?? 'teacher_review_unavailable');
      const review = normalizeTeacherReview(body.review ?? null);
      if (!review) {
        setTeacherStatusError('No encontramos una solicitud docente asociada a este intento.');
        return false;
      }
      setDetail((current) => current ? { ...current, teacherReview: review } : current);
      setTeacherStatusError('');
      return true;
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return false;
      setTeacherStatusError('No pudimos actualizar la revisión. Tu resultado y tu solicitud siguen guardados.');
      return false;
    }
  }, [attemptId]);

  const requestTeacherReview = async () => {
    if (!detail?.teacherReview?.canRequest || teacherBusy) return;
    setTeacherBusy(true); setTeacherError('');
    const storageKey = `wl_icfes_teacher_review_request:${attemptId}`;
    try {
      let idempotencyKey: string | null = null;
      try { idempotencyKey = window.localStorage.getItem(storageKey); } catch {}
      idempotencyKey ??= crypto.randomUUID();
      try { window.localStorage.setItem(storageKey, idempotencyKey); } catch {}
      const response = await fetch('/api/icfes/teacher-reviews', {
        method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': idempotencyKey },
        body: JSON.stringify({ attemptId }),
      });
      const body = await response.json();
      if (!response.ok) {
        if (body.code === 'credit_exhausted' && await refreshTeacherReview()) return;
        throw new Error(body.code === 'credit_exhausted'
          ? 'El crédito ya tiene una solicitud. Actualiza el estado para recuperarla.'
          : 'No pudimos solicitar la revisión docente.');
      }
      setDetail((current) => current ? { ...current, teacherReview: {
        canRequest: false, status: body.review.status, requestedAt: body.review.requestedAt,
        dueAt: body.review.dueAt, completedAt: null, result: null,
      } } : current);
    } catch (caught) {
      setTeacherError(caught instanceof Error ? caught.message : 'No pudimos solicitar la revisión docente.');
    } finally { setTeacherBusy(false); }
  };
  useEffect(() => {
    let active = true;
    fetch(`/api/icfes/attempts/${attemptId}/detail`, { cache: 'no-store' })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? 'No pudimos consultar el resultado.');
        return body as IcfesPremiumDetailDto;
      })
      .then((body) => {
        if (!active) return;
        setDetail(body);
        if (body.paymentStatus === 'APPROVED' && body.result && body.productCode === ICFES_DETAIL_OFFER_ID) {
          const eventKey = `wl_icfes_purchase_complete:${attemptId}`;
          let alreadyTracked = false;
          try { alreadyTracked = window.sessionStorage.getItem(eventKey) === '1'; } catch {}
          if (!alreadyTracked) {
            trackIcfesEvent('icfes_purchase_complete', {
              mock_id: body.result.examId,
              product_code: ICFES_DETAIL_OFFER_ID,
              amount_cop: body.amountInCents / 100,
            });
            try { window.sessionStorage.setItem(eventKey, '1'); } catch {}
          }
        }
      })
      .catch((caught) => active && setError(caught instanceof Error ? caught.message : 'No pudimos consultar el resultado.'));
    return () => { active = false; };
  }, [attemptId]);

  const teacherStatus = detail?.teacherReview?.status;
  useEffect(() => {
    if (!teacherStatus || TERMINAL_TEACHER_STATUSES.has(teacherStatus)) return;
    let inFlight = false;
    let controller: AbortController | null = null;
    const poll = async () => {
      if (inFlight || document.visibilityState !== 'visible') return;
      inFlight = true;
      controller = new AbortController();
      try { await refreshTeacherReview(controller.signal); }
      finally { inFlight = false; }
    };
    const timer = window.setInterval(() => { void poll(); }, TEACHER_REVIEW_POLL_MS);
    const onVisibility = () => { if (document.visibilityState === 'visible') void poll(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      controller?.abort();
    };
  }, [refreshTeacherReview, teacherStatus]);

  return <div className="prac-shell"><div className="prac-results">
    <p className="eyebrow"><span className="ink-line" />Pase ICFES</p>
    <h1>Detalle de tu intento</h1>
    {!detail && !error && <p role="status">Verificando el estado del pago…</p>}
    {error && <div className="icfes-product-card icfes-product-card--muted"><p role="alert">{error}</p></div>}
    {detail && detail.paymentStatus !== 'APPROVED' && <div className="icfes-product-card">
      <h2>Pago {detail.paymentStatus === 'PENDING' ? 'pendiente' : detail.paymentStatus.toLowerCase()}</h2>
      <p>El análisis solo se abre después de que Wompi confirme el pago. Recarga esta página cuando cambie el estado.</p>
      <button className="btn btn-ghost" onClick={() => window.location.reload()}>Consultar de nuevo</button>
    </div>}
    {detail?.paymentStatus === 'APPROVED' && detail.result && <>
      <div className="prac-results__hero"><p className="prac-results__label">Pago verificado · análisis pedagógico</p><div className="prac-results__score">{detail.result.percentage}</div><p className="prac-results__fraction">{detail.result.correct}/{detail.result.total} correctas</p></div>
      {detail.automaticFeedback && <section className="icfes-product-card" aria-labelledby="automatic-feedback-title" data-testid="icfes-automatic-feedback">
        <p className="icfes-product-card__eyebrow">FEEDBACK AUTOMÁTICO · DATOS DE ESTE INTENTO</p>
        <h2 id="automatic-feedback-title">{detail.automaticFeedback.headline}</h2>
        <p>{detail.automaticFeedback.summary}</p>
        {detail.automaticFeedback.strongestAreas.length > 0 && <>
          <h3>Fortalezas observadas</h3>
          <ul>{detail.automaticFeedback.strongestAreas.map((area) =>
            <li key={area.key}><strong>{area.label} · {area.percentage}%:</strong> {area.message}</li>)}</ul>
        </>}
        {detail.automaticFeedback.priorityAreas.length > 0 && <>
          <h3>Prioridades</h3>
          <ul>{detail.automaticFeedback.priorityAreas.map((area) =>
            <li key={area.key}><strong>{area.label} · {area.percentage}%:</strong> {area.message}</li>)}</ul>
        </>}
        <h3>Lectura por parte</h3>
        <ul>{detail.automaticFeedback.partFeedback.map((area) =>
          <li key={area.key}><strong>{area.label} · {area.correct}/{area.total}:</strong> {area.message}</li>)}</ul>
        <h3>Qué revisar en tus respuestas</h3>
        {detail.automaticFeedback.questionFeedback.length === 0
          ? <p>No se detectaron respuestas incorrectas en este intento.</p>
          : <ul>{detail.automaticFeedback.questionFeedback.map((item) => <li key={item.questionId}>
              <strong>Pregunta {item.number} · {item.skill}:</strong> {item.guidance}
            </li>)}</ul>}
      </section>}
      <div className="prac-results__review"><h2 className="prac-results__review-title">Pregunta por pregunta</h2>
        {(detail.questions ?? []).map((question) => <article key={question.id} className={`prac-review-item ${question.correct ? 'prac-review-item--correct' : 'prac-review-item--wrong'}`}>
          <div className="prac-review-item__header"><span className="prac-review-item__num">P{question.number} · Parte {question.part}</span><span className={`prac-review-item__badge ${question.correct ? 'prac-review-item__badge--ok' : 'prac-review-item__badge--err'}`}>{question.correct ? '✓ Correcta' : '✗ Por revisar'}</span></div>
          <p className="prac-review-item__q">{question.prompt}</p>
          <p><strong>Tu elección:</strong> {question.selectedOption ?? 'Sin respuesta'}</p>
          <p><strong>Respuesta correcta:</strong> {question.correctOption}</p>
          <p>{question.rationale}</p>
        </article>)}
      </div>
      {detail.teacherReview && (detail.teacherReview.canRequest || detail.teacherReview.status) && <section className="icfes-product-card" aria-labelledby="teacher-review-title">
        <h2 id="teacher-review-title">Revisión docente</h2>
        {detail.teacherReview.canRequest && <>
          <p>Tu plan incluye un crédito. Al solicitarlo, un docente revisará este intento con la rúbrica ICFES vigente.</p>
          <button className="btn" disabled={teacherBusy} onClick={requestTeacherReview}>
            {teacherBusy ? 'Solicitando…' : 'Solicitar mi revisión docente'}
          </button>
        </>}
        {detail.teacherReview.status && detail.teacherReview.status !== 'completed' &&
          <p role="status">{teacherStatusLabel(detail.teacherReview.status)}.{detail.teacherReview.dueAt
            ? ` Objetivo de entrega: ${new Date(detail.teacherReview.dueAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}.`
            : ''}</p>}
        {detail.teacherReview.status === 'completed' && detail.teacherReview.result && <div>
          <p>{detail.teacherReview.result.summary}</p>
          <h3>Fortalezas</h3><ul>{detail.teacherReview.result.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3>Prioridades</h3><ul>{detail.teacherReview.result.priorities.map((item) => <li key={item}>{item}</li>)}</ul>
          {detail.teacherReview.result.itemFeedback.length > 0 && <>
            <h3>Comentarios por pregunta</h3>
            <ul>{detail.teacherReview.result.itemFeedback.map((item) =>
              <li key={item.questionId}><strong>{item.questionId}:</strong> {item.feedback}</li>)}</ul>
          </>}
        </div>}
        {teacherError && <p role="alert">{teacherError}</p>}
        {teacherStatusError && <><p role="alert">{teacherStatusError}</p>
          <button className="btn btn-ghost" disabled={teacherBusy} onClick={() => void refreshTeacherReview()}>Actualizar estado</button></>}
      </section>}
      {detail.productCode === 'exam-teacher' && !detail.teacherReview && <section className="icfes-product-card icfes-product-card--muted" aria-labelledby="teacher-review-recovery-title">
        <h2 id="teacher-review-recovery-title">Revisión docente</h2>
        <p role="status">{teacherStatusError || 'Consultando el estado de tu revisión…'}</p>
        <button className="btn btn-ghost" onClick={() => void refreshTeacherReview()}>Consultar de nuevo</button>
      </section>}
    </>}
    <div className="prac-results__actions"><Link href="/examenes/icfes" className="btn">Volver a ICFES</Link></div>
  </div></div>;
}
