import type { Metadata } from 'next';
import LeccionIntegradaClient from './LeccionIntegradaClient';

export const metadata: Metadata = {
  title: '카페에 지갑을 두고 왔어요! | Coreano A2',
  description: 'Lección integrada A2: lectura, escucha, dictado y producción oral. Una billetera desaparecida y pistas dispersas; resuelves el caso en coreano.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a2/leccion-integrada' },
};

export default function LeccionIntegradaPage() {
  return (
    <section style={{ width: '100%', minHeight: '100vh', background: 'var(--wl-panel-raised, #f5f7fb)' }}>
      <LeccionIntegradaClient />
    </section>
  );
}
