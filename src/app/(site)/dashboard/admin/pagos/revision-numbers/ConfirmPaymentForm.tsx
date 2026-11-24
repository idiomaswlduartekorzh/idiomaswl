'use client';

import { useActionState } from 'react';
import { needsDistinctReceipt, type NumbersReviewReason } from '@/lib/admin-operations/numbers-payment-review';
import { confirmNumbersPayment } from './actions';
import styles from '../payments.module.css';

export default function ConfirmPaymentForm({ id, amount, reason, today }: {
  id: string;
  amount: number | null;
  reason: NumbersReviewReason;
  today: string;
}) {
  const [state, action, pending] = useActionState(confirmNumbersPayment, { error: null });
  const duplicate = needsDistinctReceipt(reason);

  return (
    <details className={styles.reviewForm}>
      <summary>Revisar comprobante</summary>
      <form action={action} className={styles.form}>
        <input type="hidden" name="id" value={id} />
        <label>Pagador confirmado<input name="customerName" maxLength={150} required /></label>
        <label>Valor confirmado en COP<input name="amountInCop" type="number" min="0.01" max="1000000000" step="0.01"
          defaultValue={amount === null ? '' : amount / 100} required /></label>
        <label>Fecha del comprobante<input name="paidOn" type="date" max={today} required /></label>
        <label>Concepto confirmado<input name="description" maxLength={300} required /></label>
        <label className={styles.fullField}>{duplicate ? 'Referencia del comprobante distinto' : 'Referencia del comprobante'}
          <input name="receipt" maxLength={120} required={duplicate} />
        </label>
        <div className={styles.formFooter}>
          <button className={styles.createButton} disabled={pending}>{pending ? 'Importando…' : 'Confirmar e importar'}</button>
        </div>
        {state.error && <p className={styles.errorMessage} role="status">{state.error}</p>}
      </form>
    </details>
  );
}
