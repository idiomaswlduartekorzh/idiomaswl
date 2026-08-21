'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ExamSubmissionReceipt } from '@/lib/exam-review/submission-receipt';
import type { ToeflCheckoutResponse } from '@/lib/toefl/report-payment';
import styles from './ToeflReportCheckout.module.css';

function formatCop(amountInCents: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
    .format(amountInCents / 100);
}

export function ToeflReportCheckout({
  submissionId,
  mockTitle,
  receipt,
}: {
  submissionId: string;
  mockTitle: string;
  receipt?: ExamSubmissionReceipt;
}) {
  const [checkout, setCheckout] = useState<ToeflCheckoutResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function prepareCheckout() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/toefl/reports/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ submissionId, completionToken: receipt?.completionToken }),
      });
      const data = await response.json().catch(() => null) as (ToeflCheckoutResponse & { error?: string }) | null;
      if (!response.ok || !data?.ok) throw new Error(data?.error ?? 'No pudimos preparar el pago.');
      setCheckout(data);
      if (data.paymentStatus === 'APPROVED') window.location.assign(data.reportUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No pudimos preparar el pago.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-labelledby="toefl-report-checkout-title">
        <p className={styles.eyebrow}>{mockTitle} · entrega guardada</p>
        <h1 id="toefl-report-checkout-title" className={styles.title}>Tu examen terminó. El informe detallado es opcional.</h1>
        <p className={styles.lead}>El simulacro se hizo sin costo. Un único pago desbloquea la corrección privada que ya quedó vinculada a esta entrega.</p>
        <div className={styles.included} aria-label="Contenido del informe">
          <div><strong>Reading y Listening</strong><span>Aciertos brutos verificados en el servidor, sin fabricar una banda ETS.</span></div>
          <div><strong>Writing</strong><span>Dos reportes pedagógicos con criterios, errores y recomendaciones.</span></div>
          <div><strong>Speaking</strong><span>Escucha humana de las grabaciones y observaciones basadas en evidencia.</span></div>
        </div>

        {checkout && (
          <div className={styles.price}>
            <span>Pago único</span>
            <strong>{formatCop(checkout.amountInCents)}</strong>
            <span>Speaking se revisa dentro de un máximo de {checkout.speakingReviewSlaHours} horas.</span>
          </div>
        )}

        <div className={styles.actions}>
          {!checkout && <button type="button" className={styles.primary} onClick={prepareCheckout} disabled={loading}>{loading ? 'Preparando…' : 'Consultar precio y continuar'}</button>}
          {checkout?.checkoutUrl && <a className={styles.primary} href={checkout.checkoutUrl}>Pagar de forma segura con Wompi</a>}
          {checkout && <button type="button" className={styles.secondary} onClick={prepareCheckout} disabled={loading}>{loading ? 'Verificando…' : 'Ya pagué: verificar'}</button>}
          <Link className={styles.secondary} href="/examenes/toefl">Volver a los simulacros</Link>
        </div>
        {loading && <p className={styles.status} role="status">Consultando la referencia segura…</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <p className={styles.finePrint}>Wompi procesa el pago. El informe se habilita únicamente cuando nuestro servidor recibe y verifica el evento firmado de aprobación; la pantalla de regreso no basta.</p>
      </section>
    </main>
  );
}
