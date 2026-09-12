'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { IcfesPremiumDetailDto } from '@/lib/icfes/attempt-contract';
import { trackIcfesEvent } from '@/lib/analytics/icfes';
import { ICFES_DETAIL_OFFER_ID } from '@/lib/icfes/commerce-v1';

export default function IcfesPaidResultClient({ attemptId }: { attemptId: string }) {
  const [detail, setDetail] = useState<IcfesPremiumDetailDto | null>(null);
  const [error, setError] = useState('');
  const [teacherBusy, setTeacherBusy] = useState(false);
  const [teacherError, setTeacherError] = useState('');
  const requestTeacherReview = async () => {
    if (!detail?.teacherReview?.canRequest || teacherBusy) return;
    setTeacherBusy(true); setTeacherError('');
    const storageKey = `wl_icfes_teacher_review_request:${attemptId}`;
    const idempotencyKey = window.localStorage.getItem(storageKey) ?? crypto.randomUUID();
    window.localStorage.setItem(storageKey, idempotencyKey);
    try {
      const response = await fetch('/api/icfes/teacher-reviews', {
        method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': idempotencyKey },
        body: JSON.stringify({ attemptId }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.code === 'credit_exhausted'
        ? 'Este crédito docente ya fue utilizado.' : 'No pudimos solicitar la revisión docente.');
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
          if (!window.sessionStorage.getItem(eventKey)) {
            trackIcfesEvent('icfes_purchase_complete', {
              mock_id: body.result.examId,
              product_code: ICFES_DETAIL_OFFER_ID,
              amount_cop: body.amountInCents / 100,
            });
            window.sessionStorage.setItem(eventKey, '1');
          }
        }
      })
      .catch((caught) => active && setError(caught instanceof Error ? caught.message : 'No pudimos consultar el resultado.'));
    return () => { active = false; };
  }, [attemptId]);

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
          <p role="status">Solicitud recibida. Estado: {detail.teacherReview.status}.</p>}
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
      </section>}
    </>}
    <div className="prac-results__actions"><Link href="/examenes/icfes" className="btn">Volver a ICFES</Link></div>
  </div></div>;
}
