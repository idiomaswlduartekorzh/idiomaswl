'use client';

import Script from 'next/script';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  WompiBillingPeriod,
  WompiLanguageSlug,
  WompiPlanId,
} from '@/lib/wompi/catalog';

type WidgetTransactionResult = Readonly<{
  transaction?: Readonly<{ id?: string }>;
}>;

type WidgetCheckoutConfig = Readonly<{
  currency: 'COP';
  amountInCents: number;
  reference: string;
  publicKey: string;
  signature: Readonly<{ integrity: string }>;
  redirectUrl: string;
}>;

type WidgetCheckoutInstance = Readonly<{
  open(callback: (result: WidgetTransactionResult) => void): void;
}>;

type WidgetCheckoutConstructor = new (config: WidgetCheckoutConfig) => WidgetCheckoutInstance;

declare global {
  interface Window {
    WidgetCheckout?: WidgetCheckoutConstructor;
  }
}

type ScriptState = Readonly<{
  ready: boolean;
  failed: boolean;
}>;

const WompiScriptContext = createContext<ScriptState>({ ready: false, failed: false });

export function WompiCheckoutProvider({ children }: { children: ReactNode }) {
  const [scriptState, setScriptState] = useState<ScriptState>({ ready: false, failed: false });

  return (
    <WompiScriptContext.Provider value={scriptState}>
      {children}
      <Script
        id="wompi-checkout-widget"
        src="https://checkout.wompi.co/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptState({ ready: true, failed: false })}
        onError={() => setScriptState({ ready: false, failed: true })}
      />
    </WompiScriptContext.Provider>
  );
}

type CheckoutApiResponse = Readonly<{
  checkout?: WidgetCheckoutConfig;
  message?: string;
}>;

export function WompiCheckoutButton({
  planId,
  language,
  billingPeriod,
  label,
  className,
}: Readonly<{
  planId: WompiPlanId;
  language: WompiLanguageSlug;
  billingPeriod: WompiBillingPeriod;
  label: string;
  className: string;
}>) {
  const scriptState = useContext(WompiScriptContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function openCheckout() {
    setMessage(null);

    if (scriptState.failed) {
      setMessage('No pudimos cargar Wompi. Revisa tu conexión e inténtalo de nuevo.');
      return;
    }

    if (!scriptState.ready || !window.WidgetCheckout) {
      setMessage('Wompi todavía está cargando. Intenta de nuevo en un momento.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wompi/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, language, billingPeriod }),
      });
      const body = (await response.json()) as CheckoutApiResponse;

      if (!response.ok || !body.checkout) {
        throw new Error(body.message || 'No pudimos preparar el pago.');
      }

      const checkout = new window.WidgetCheckout(body.checkout);
      checkout.open((result) => {
        const transactionId = result?.transaction?.id;
        if (transactionId) {
          window.location.assign(`/pagos/resultado?id=${encodeURIComponent(transactionId)}`);
        }
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos abrir el pago.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wlp-checkout-action">
      <button
        type="button"
        className={className}
        onClick={() => void openCheckout()}
        disabled={loading}
      >
        {loading ? 'Preparando pago…' : label}
      </button>
      {message && (
        <p className="wlp-checkout-action__message" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
