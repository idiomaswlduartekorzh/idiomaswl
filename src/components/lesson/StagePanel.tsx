'use client';

import dynamic from 'next/dynamic';

const Activation         = dynamic(() => import('./stages/Activation'),          { ssr: false });
const AcquisitionGuided  = dynamic(() => import('./stages/AcquisitionGuided'),   { ssr: false });
const Recognition        = dynamic(() => import('./stages/Recognition'),          { ssr: false });
const ListeningSurvivable= dynamic(() => import('./stages/ListeningSurvivable'), { ssr: false });
const ContextualInput    = dynamic(() => import('./stages/ContextualInput'),      { ssr: false });
const GuidedDiscovery    = dynamic(() => import('./stages/GuidedDiscovery'),      { ssr: false });
const MicroExplanation   = dynamic(() => import('./stages/MicroExplanation'),     { ssr: false });
const GuidedProduction   = dynamic(() => import('./stages/GuidedProduction'),     { ssr: false });
const ReactiveInteraction= dynamic(() => import('./stages/ReactiveInteraction'),  { ssr: false });
const SmartReview        = dynamic(() => import('./stages/SmartReview'),          { ssr: false });
const Completion         = dynamic(() => import('./stages/Completion'),           { ssr: false });

interface StagePanelProps {
  stageIndex: number;
  onComplete?: () => void;
}

const COMPONENTS = [
  Activation, AcquisitionGuided, Recognition, ListeningSurvivable,
  ContextualInput, GuidedDiscovery, MicroExplanation, GuidedProduction,
  ReactiveInteraction, SmartReview, Completion,
];

const STAGE_NAMES = [
  'Activación', 'Adquisición guiada', 'Reconocimiento', 'Escucha sobrevivible',
  'Contexto primero', 'Descubre el patrón', 'Micro explicación', 'Producción guiada',
  'Interacción reactiva', 'Smart Review', 'Cierre y siguiente paso',
];

export default function StagePanel({ stageIndex, onComplete }: StagePanelProps) {
  const StageComponent = COMPONENTS[stageIndex];

  if (!StageComponent) {
    return (
      <article style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--muted)' }}>
        <p>Etapa no disponible.</p>
      </article>
    );
  }

  return (
    <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, overflow: 'hidden' }}>
      <header style={{ padding: '16px 20px', borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Etapa {String(stageIndex + 1).padStart(2, '0')}
        </span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--line-soft)' }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{STAGE_NAMES[stageIndex]}</span>
      </header>
      <StageComponent onComplete={onComplete} />
    </article>
  );
}
