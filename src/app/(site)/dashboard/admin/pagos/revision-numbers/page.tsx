import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requireOwnerAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { bogotaDay } from '@/lib/admin-operations/agenda';
import { NUMBERS_REVIEW_REASONS, type NumbersReviewReason } from '@/lib/admin-operations/numbers-payment-review';
import { PAYMENTS_PATH } from '@/lib/admin-operations/recorded-payments';
import { money } from '@/lib/admin-payments/metrics';
import ConfirmPaymentForm from './ConfirmPaymentForm';
import styles from '../payments.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Revisión de pagos de Numbers · Administración',
  robots: { index: false, follow: false },
};

type ReviewRow = {
  id: string;
  reported_amount_in_cents: number | null;
  reported_paid_on: string | null;
  reason: NumbersReviewReason;
};

export default async function NumbersPaymentReviewPage() {
  try {
    await requireOwnerAdmin();
  } catch {
    redirect(PAYMENTS_PATH);
  }

  const db = createAdminClient();
  const queue = await db.from('admin_numbers_payment_review')
    .select('id,reported_amount_in_cents,reported_paid_on,reason').order('id').returns<ReviewRow[]>();
  const rows = queue.data ?? [];
  const recorded = rows.length ? await db.from('admin_recorded_payments')
    .select('id,voided_at').in('id', rows.map(row => row.id)).returns<{ id: string; voided_at: string | null }[]>()
    : { data: [], error: null };
  const existing = new Map((recorded.data ?? []).map(payment => [payment.id, payment.voided_at]));
  const pending = rows.filter(row => !existing.has(row.id));
  const pendingAmount = pending.reduce((sum, row) => sum + Number(row.reported_amount_in_cents ?? 0), 0);
  const today = bogotaDay();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link href={PAYMENTS_PATH} prefetch={false} className={styles.back}><ArrowLeft size={16} /> Pagos y finanzas</Link>
          <h1>Revisión de pagos de Numbers</h1>
          <p>Comprueba cada fila con su comprobante antes de incorporarla al historial.</p>
        </div>
      </header>
      {queue.error || recorded.error ? <p className={styles.warning} role="alert">No se pudo cargar la bandeja. Actualiza la página.</p> : (
        <section className={styles.panel} aria-label="Bandeja privada de revisión">
          <div className={styles.panelTitle}>
            <h2>{pending.length} {pending.length === 1 ? 'fila pendiente' : 'filas pendientes'}</h2>
            <small>{money(pendingAmount)} COP en valores legibles</small>
          </div>
          {rows.length ? <div className={`${styles.tableWrap} ${styles.reviewTable}`}>
            <table aria-label="Filas de Numbers para revisar">
              <thead><tr><th scope="col">Referencia de Numbers</th><th scope="col">Valor original</th><th scope="col">Motivo</th><th scope="col">Estado</th><th scope="col">Revisión</th></tr></thead>
              <tbody>{rows.map(row => {
                const imported = existing.has(row.id);
                const voided = Boolean(existing.get(row.id));
                const amount = row.reported_amount_in_cents === null ? null : Number(row.reported_amount_in_cents);
                return <tr key={row.id}>
                  <th scope="row"><code>{row.id}</code></th>
                  <td>{amount === null ? 'Sin valor legible' : money(amount)}</td>
                  <td>{NUMBERS_REVIEW_REASONS[row.reason]}
                    {row.reported_paid_on && <small>Fecha anotada en Numbers · {row.reported_paid_on}</small>}
                  </td>
                  <td><span className={`${styles.badge} ${voided ? styles.statusVOIDED : imported ? styles.statusAPPROVED : styles.statusPENDING}`}>
                    {voided ? 'Anulado' : imported ? 'Importado' : 'Pendiente'}
                  </span></td>
                  <td>{imported ? '—' : <ConfirmPaymentForm id={row.id} amount={amount} reason={row.reason} today={today} />}</td>
                </tr>;
              })}</tbody>
            </table>
          </div> : <p className={styles.empty}>Aún no hay filas para revisar.</p>}
        </section>
      )}
    </main>
  );
}
