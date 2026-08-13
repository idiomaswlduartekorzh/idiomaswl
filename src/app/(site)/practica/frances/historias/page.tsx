import type { Metadata } from 'next';
import HistoriasHub from '@/components/practica/HistoriasHub';
import { historiasHubMetadata } from '@/components/practica/HistoriaRoute';

const LANG = 'frances' as const;

export const metadata: Metadata = historiasHubMetadata(LANG);

export default function HistoriasPage() {
  return <HistoriasHub lang={LANG} />;
}
