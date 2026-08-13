import type { Metadata } from 'next';
import { connectorsActivity01 } from '@/data/activities/ielts-connectors';
import ConnectorsGame from './ConnectorsGame';

export const metadata: Metadata = {
  title: 'Conectores IELTS Writing Task 1 — Práctica Interactiva',
  description:
    'Practica los conectores del IELTS Writing Task 1: ordena oraciones y elige el conector correcto para subir en Coherence & Cohesion.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts-writing-conectores' },
};

export default function WritingConectoresPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>
          <span className="ink-line" />IELTS Writing Task 1
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 0.4rem' }}>
          Práctica de Conectores
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 600, margin: '0 0 2.5rem' }}>
          Ordena las oraciones de una respuesta Task 1 y elige los conectores correctos.
          Hay trampas mezcladas — igual que en el examen real.
        </p>
        <ConnectorsGame activity={connectorsActivity01} />
      </div>
    </section>
  );
}
