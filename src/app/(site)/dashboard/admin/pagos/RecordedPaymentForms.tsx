'use client';

import { useActionState, useState } from 'react';
import { FileUp, Receipt } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/admin-operations/recorded-payments';
import { changeRecordedPayment } from './recorded-payment-actions';
import styles from './payments.module.css';

type State = Awaited<ReturnType<typeof changeRecordedPayment>>;
const INITIAL_STATE: State = { ok: false, message: '' };

function Message({ state }: { state: State }) {
  return state.message && <p className={state.ok ? styles.successMessage : styles.errorMessage} role="status">{state.message}</p>;
}

export function RecordedPaymentForms({ requestId, today }: { requestId: string; today: string }) {
  const initialDraft = {
    customerName: '', amountInCop: '', paidOn: today,
    method: PAYMENT_METHODS[0], description: '', reference: '',
  };
  const [draft, setDraft] = useState<Record<keyof typeof initialDraft, string>>(initialDraft);
  const [id, setId] = useState(requestId);
  const [manual, manualAction, savingManual] = useActionState(async (previous: State, form: FormData) => {
    const result = await changeRecordedPayment(previous, form);
    if (result.ok) {
      setId(crypto.randomUUID());
      setDraft(initialDraft);
    }
    return result;
  }, INITIAL_STATE);
  const [history, historyAction, savingHistory] = useActionState(changeRecordedPayment, INITIAL_STATE);
  const [selected, setSelected] = useState<File | null>(null);
  const [reviewed, setReviewed] = useState<File | null>(null);

  function update(field: keyof typeof draft, value: string) {
    setDraft(current => ({ ...current, [field]: value }));
  }

  return (
    <section className={styles.linkSection}>
      <article className={styles.panel}>
        <div className={styles.panelTitle}><h2>Registrar un pago recibido</h2><Receipt size={20} aria-hidden /></div>
        <form action={manualAction} className={styles.form}>
          <input type="hidden" name="mode" value="manual" />
          <input type="hidden" name="requestId" value={id} />
          <label>Nombre de quien pagó<input name="customerName" value={draft.customerName} onChange={event => update('customerName', event.target.value)} maxLength={150} required /></label>
          <label>Valor en COP<input type="number" name="amountInCop" value={draft.amountInCop} onChange={event => update('amountInCop', event.target.value)} min="0.01" max="1000000000" step="0.01" required /></label>
          <label>Fecha del pago<input type="date" name="paidOn" value={draft.paidOn} onChange={event => update('paidOn', event.target.value)} max={today} required /></label>
          <label>Método<select name="method" value={draft.method} onChange={event => update('method', event.target.value)} required>{PAYMENT_METHODS.map(method => <option key={method}>{method}</option>)}</select></label>
          <label>Concepto<input name="description" value={draft.description} onChange={event => update('description', event.target.value)} maxLength={300} placeholder="Paquete de clases de inglés" required /></label>
          <label>Referencia del comprobante<input name="reference" value={draft.reference} onChange={event => update('reference', event.target.value)} maxLength={120} /></label>
          <div className={styles.formFooter}><button className={styles.createButton} disabled={savingManual}>{savingManual ? 'Guardando…' : 'Guardar pago'}</button></div>
          <Message state={manual} />
        </form>
      </article>
      <article className={styles.panel}>
        <div className={styles.panelTitle}><h2>Importar historial de Numbers</h2><FileUp size={20} aria-hidden /></div>
        <div className={styles.form}>
          <label className={styles.fullField}>Archivo histórico preparado (.json)
            <input type="file" accept=".json,application/json" onChange={event => setSelected(event.target.files?.[0] ?? null)} disabled={savingHistory} />
          </label>
          <form className={styles.fullField} action={form => {
            if (!selected) return;
            const mode = form.get('mode');
            form.set('history', selected);
            setReviewed(mode === 'preview' ? selected : null);
            historyAction(form);
          }}>
            <div className={styles.headerActions}>
              <button name="mode" value="preview" className={styles.secondaryButton} disabled={!selected || savingHistory}>Revisar archivo</button>
              {history.preview && reviewed === selected && <button name="mode" value="import" className={styles.createButton} disabled={savingHistory}>Importar {history.preview.count} {history.preview.count === 1 ? 'registro' : 'registros'}</button>}
            </div>
          </form>
          {history.preview && reviewed === selected && (
            <p className={styles.fullField}>{history.preview.count} {history.preview.count === 1 ? 'movimiento' : 'movimientos'} de {history.preview.years.join(', ')}.{history.preview.withoutDay > 0 && ` Sin día registrado: ${history.preview.withoutDay}.`}</p>
          )}
          <Message state={history} />
        </div>
      </article>
    </section>
  );
}

export function VoidRecordedPayment({ id }: { id: string }) {
  const [state, action, pending] = useActionState(changeRecordedPayment, INITIAL_STATE);
  return (
    <details className={styles.voidPayment}>
      <summary>Anular registro</summary>
      <form action={action} className={styles.form}>
        <input type="hidden" name="mode" value="void" />
        <input type="hidden" name="id" value={id} />
        <label className={styles.fullField}>Motivo<input name="reason" minLength={3} maxLength={300} required /></label>
        <button className={styles.secondaryButton} disabled={pending}>Confirmar anulación</button>
        <Message state={state} />
      </form>
    </details>
  );
}
