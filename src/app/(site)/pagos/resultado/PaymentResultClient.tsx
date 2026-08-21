'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './PaymentResult.module.css';

type TransactionStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

type PaymentTransaction = Readonly<{
  id: string;
  status: TransactionStatus;
  reference: string;
  amountInCents: number;
  currency: 'COP';
  paymentMethodType: string | null;
  planLabel: string;
  languageLabel: string;
  billingLabel: string;
}>;

type TransactionResponse = Readonly<{
  transaction?: PaymentTransaction;
  environment?: 'sandbox' | 'production';
  message?: string;
}>;

type ViewState = Readonly<{
  loading: boolean;
  transaction: PaymentTransaction | null;
  environment: 'sandbox' | 'production' | null;
  error: string | null;
}>;

const STATUS_COPY: Record<TransactionStatus, { icon: string; title: string; body: string }> = {
  APPROVED: {
    icon: '✓',
    title: 'Pago aprobado',
    body: 'Wompi confirmó la transacción. Nuestro equipo continuará con la activación de tu plan.',
  },
  PENDING: {
    icon: '…',
    title: 'Pago en proceso',
    body: 'Wompi todavía está procesando el pago. Esta página lo comprobará automáticamente.',
  },
  DECLINED: {
    icon: '×',
    title: 'Pago rechazado',
    body: 'No se realizó el cobro. Puedes intentarlo nuevamente o elegir otro medio de pago.',
  },
  VOIDED: {
    icon: '↩',
    title: 'Pago anulado',
    body: 'La transacción fue anulada. Si ves un movimiento temporal, consulta los tiempos de tu banco.',
  },
  ERROR: {
    icon: '!',
    title: 'Wompi no completó el pago',
    body: 'No se confirmó el cobro. Puedes volver a intentarlo desde la página de precios.',
  },
};

function formatCOP(amountInCents: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

export default function PaymentResultClient({ transactionId }: { transactionId: string | null }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState<ViewState>({
    loading: Boolean(transactionId),
    transaction: null,
    environment: null,
    error: transactionId ? null : 'La URL no contiene un identificador de transacción.',
  });

  useEffect(() => {
    if (!transactionId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    async function checkTransaction() {
      try {
        const response = await fetch(
          `/api/wompi/transactions/${encodeURIComponent(transactionId as string)}`,
          { cache: 'no-store' },
        );
        const body = (await response.json()) as TransactionResponse;

        if (!response.ok || !body.transaction || !body.environment) {
          throw new Error(body.message || 'No pudimos comprobar el pago.');
        }

        if (cancelled) return;
        setState({
          loading: false,
          transaction: body.transaction,
          environment: body.environment,
          error: null,
        });

        attempts += 1;
        if (body.transaction.status === 'PENDING' && attempts < 24) {
          timer = setTimeout(() => void checkTransaction(), 5_000);
        }
      } catch (error) {
        if (cancelled) return;
        setState({
          loading: false,
          transaction: null,
          environment: null,
          error: error instanceof Error ? error.message : 'No pudimos comprobar el pago.',
        });
      }
    }

    void checkTransaction();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [transactionId, refreshKey]);

  const statusCopy = state.transaction ? STATUS_COPY[state.transaction.status] : null;

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-live="polite">
        <span className={styles.eyebrow}>Pago con Wompi</span>

        {state.loading && (
          <div className={styles.center} role="status">
            <span className={`${styles.statusIcon} ${styles.pending}`}>…</span>
            <h1>Comprobando tu pago</h1>
            <p>Estamos consultando el estado directamente con Wompi.</p>
          </div>
        )}

        {!state.loading && state.error && (
          <div className={styles.center} role="alert">
            <span className={`${styles.statusIcon} ${styles.error}`}>!</span>
            <h1>No pudimos verificarlo todavía</h1>
            <p>{state.error}</p>
            {transactionId && (
              <button className="btn" type="button" onClick={() => setRefreshKey((key) => key + 1)}>
                Comprobar de nuevo
              </button>
            )}
          </div>
        )}

        {!state.loading && state.transaction && statusCopy && (
          <>
            {state.environment === 'sandbox' && (
              <div className={styles.sandbox}>Sandbox · esta transacción no mueve dinero real</div>
            )}
            <div className={styles.center}>
              <span
                className={`${styles.statusIcon} ${styles[state.transaction.status.toLowerCase()]}`}
              >
                {statusCopy.icon}
              </span>
              <h1>{statusCopy.title}</h1>
              <p>{statusCopy.body}</p>
            </div>

            <dl className={styles.details}>
              <div><dt>Plan</dt><dd>{state.transaction.planLabel}</dd></div>
              <div><dt>Idioma</dt><dd>{state.transaction.languageLabel}</dd></div>
              <div><dt>Periodo</dt><dd>{state.transaction.billingLabel}</dd></div>
              <div><dt>Total</dt><dd>{formatCOP(state.transaction.amountInCents)}</dd></div>
              <div><dt>Referencia</dt><dd className={styles.reference}>{state.transaction.reference}</dd></div>
            </dl>

            {state.transaction.status === 'PENDING' && (
              <button className="btn" type="button" onClick={() => setRefreshKey((key) => key + 1)}>
                Comprobar ahora
              </button>
            )}
          </>
        )}

        <Link href="/precios" className={styles.backLink}>
          ← Volver a planes y precios
        </Link>
      </section>
    </main>
  );
}
