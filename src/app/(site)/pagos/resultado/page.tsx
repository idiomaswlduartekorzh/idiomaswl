import type { Metadata } from 'next';

import PaymentResultClient from './PaymentResultClient';

export const metadata: Metadata = {
  title: 'Resultado del pago | Idiomas WeLearn',
  description: 'Consulta segura del estado de tu pago con Wompi.',
  robots: { index: false, follow: false },
};

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string | string[] }>;
}) {
  const query = await searchParams;
  const transactionId = typeof query.id === 'string' ? query.id : null;

  return <PaymentResultClient transactionId={transactionId} />;
}
