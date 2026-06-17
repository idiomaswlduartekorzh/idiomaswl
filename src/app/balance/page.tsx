import type { Metadata } from 'next';
import { Suspense } from 'react';
import BalanceClient from './BalanceClient';

export const metadata: Metadata = {
  title: 'Balance de Gobierno | Colombia en Datos',
  description:
    'Herramienta simplificada de comparación presidencial: ¿qué mejoró y qué empeoró bajo cada gobierno? 12 indicadores clave en una sola vista.',
  openGraph: {
    title: 'Balance de Gobierno — Colombia en Datos',
    description:
      'Heatmap comparativo: 8 presidentes × 12 categorías. Tendencia de cada indicador clave durante cada mandato.',
  },
};

export default function BalancePage() {
  return (
    <Suspense>
      <BalanceClient />
    </Suspense>
  );
}
