'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import {
  PLATFORM_PRODUCT_IDS,
  REGISTRATION_PRODUCTS,
  STUDENT_PRODUCT_IDS,
  type RegistrationAccountType,
  type RegistrationOrderSummary,
  type RegistrationProductId,
} from '@/lib/registration/catalog';
import styles from './plans.module.css';

type WidgetCheckoutConfig = Readonly<{
  currency: 'COP';
  amountInCents: number;
  reference: string;
  publicKey: string;
  signature: Readonly<{ integrity: string }>;
  redirectUrl: string;
}>;

type CheckoutApiResponse = Readonly<{
  checkout?: WidgetCheckoutConfig | null;
  alreadyActive?: boolean;
  message?: string;
}>;

const STATUS_LABELS: Record<RegistrationOrderSummary['status'], string> = {
  PENDING: 'Pago pendiente',
  APPROVED: 'Pago aprobado',
  DECLINED: 'Pago rechazado',
  VOIDED: 'Pago anulado',
  ERROR: 'Pago con error',
};

function formatCopFromCents(amountInCents: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

function formatCop(amountCop: number): string {
  return formatCopFromCents(amountCop * 100);
}

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(value));
}

export default function RegistrationPlansClient({
  initialAccountType,
  initialProductId,
  orders,
  checkoutEnabled,
  returnedFromPayment,
}: {
  initialAccountType: RegistrationAccountType;
  initialProductId: RegistrationProductId | null;
  orders: RegistrationOrderSummary[];
  checkoutEnabled: boolean;
  returnedFromPayment: boolean;
}) {
  const [accountType, setAccountType] = useState(initialAccountType);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<RegistrationProductId | null>(null);
  const [message, setMessage] = useState(returnedFromPayment
    ? 'Regresaste de Wompi. El acceso aparecerá cuando recibamos el evento firmado.'
    : '');
  const productIds = accountType === 'platform' ? PLATFORM_PRODUCT_IDS : STUDENT_PRODUCT_IDS;

  async function openCheckout(productId: RegistrationProductId) {
    setMessage('');
    if (!checkoutEnabled) {
      setMessage('La lógica del piloto está lista, pero los cobros siguen apagados en este ambiente.');
      return;
    }
    if (!scriptReady || !window.WidgetCheckout) {
      setMessage('Wompi todavía está cargando. Intenta de nuevo en un momento.');
      return;
    }

    const product = REGISTRATION_PRODUCTS[productId];
    setLoadingProduct(productId);
    try {
      const response = await fetch('/api/wompi/registration/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ accountType: product.accountType, productId }),
      });
      const data = await response.json().catch(() => null) as CheckoutApiResponse | null;
      if (!response.ok || !data) throw new Error(data?.message ?? 'No pudimos preparar el pago.');
      if (data.alreadyActive) {
        setMessage('Este acceso ya está activo. No necesitas volver a pagar todavía.');
        return;
      }
      if (!data.checkout) throw new Error('Wompi no devolvió una sesión de pago.');

      const checkout = new window.WidgetCheckout(data.checkout);
      checkout.open((result) => {
        if (result.transaction?.id) {
          window.location.assign('/dashboard/planes?payment=return');
        }
      });
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'No pudimos abrir el pago.');
    } finally {
      setLoadingProduct(null);
    }
  }

  return (
    <main className={styles.page}>
      {checkoutEnabled && (
        <Script
          id="wompi-registration-widget"
          src="https://checkout.wompi.co/widget.js"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
          onError={() => setMessage('No pudimos cargar Wompi. Revisa tu conexión.')}
        />
      )}

      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Mi cuenta WeLearn</p>
          <h1>Elige cómo quieres avanzar</h1>
          <p>Tu cuenta ya existe. Aquí decides entre acceso autónomo o un curso acompañado.</p>
        </div>
        <Link href="/dashboard/student">Volver al panel</Link>
      </header>

      {!checkoutEnabled && (
        <div className={styles.pilot} role="status">
          <strong>Piloto protegido</strong>
          <span>Los precios y el flujo están listos, pero el interruptor de cobro permanece apagado.</span>
        </div>
      )}
      {message && <div className={styles.message} role="status">{message}</div>}

      <div className={styles.switcher} role="group" aria-label="Tipo de plan">
        <button type="button" className={accountType === 'platform' ? styles.switchActive : styles.switch} onClick={() => setAccountType('platform')} aria-pressed={accountType === 'platform'}>
          Autodidacta ilimitado
        </button>
        <button type="button" className={accountType === 'student' ? styles.switchActive : styles.switch} onClick={() => setAccountType('student')} aria-pressed={accountType === 'student'}>
          Clases con profesor
        </button>
      </div>

      <section className={styles.catalog} aria-labelledby="catalog-title">
        <div className={styles.sectionHeading}>
          <div>
            <span>{accountType === 'platform' ? 'Acceso por 30 días' : 'Cursos de 4 semanas'}</span>
            <h2 id="catalog-title">{accountType === 'platform' ? 'Plataforma completa' : 'Paquetes de inglés'}</h2>
          </div>
          <p>Precios en pesos colombianos</p>
        </div>

        <div className={styles.productGrid}>
          {productIds.map((productId) => {
            const product = REGISTRATION_PRODUCTS[productId];
            const isIntent = initialProductId === productId;
            return (
              <article className={isIntent ? styles.productIntent : styles.product} key={productId}>
                <div className={styles.productTop}>
                  <span>{product.eyebrow}</span>
                  {isIntent && <em>Tu selección</em>}
                  {product.provisional && <em>Provisional</em>}
                </div>
                <h3>{product.label}</h3>
                <p>{product.description}</p>
                <strong>{formatCop(product.amountCop)}</strong>
                <small>{product.billingLabel}</small>
                <button type="button" onClick={() => void openCheckout(productId)} disabled={loadingProduct !== null}>
                  {loadingProduct === productId
                    ? 'Preparando pago…'
                    : checkoutEnabled ? 'Continuar con Wompi' : 'Piloto listo · cobro apagado'}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.orders} aria-labelledby="orders-title">
        <div className={styles.sectionHeading}>
          <div><span>Historial privado</span><h2 id="orders-title">Tus solicitudes</h2></div>
          {returnedFromPayment && <button type="button" onClick={() => window.location.reload()}>Actualizar estado</button>}
        </div>
        {orders.length === 0 ? (
          <p className={styles.empty}>Aún no tienes pagos ni solicitudes. Crear la cuenta no genera ningún cobro.</p>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => (
              <article key={order.id}>
                <div><strong>{order.productLabel}</strong><span>{STATUS_LABELS[order.status]}</span></div>
                <div><strong>{formatCopFromCents(order.amountInCents)}</strong><span>Creada {formatDate(order.createdAt)}</span></div>
                <div><strong>{order.fulfillmentStatus === 'AWAITING_SCHEDULE' ? 'Horario pendiente' : order.fulfillmentStatus === 'ACTIVE' ? 'Acceso activo' : 'Sin activar'}</strong><span>{order.accessEndsAt ? `Hasta ${formatDate(order.accessEndsAt)}` : order.paidAt ? `Pagado ${formatDate(order.paidAt)}` : 'Esperando confirmación'}</span></div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
