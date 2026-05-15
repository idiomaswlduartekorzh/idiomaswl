'use client';

import dynamic from 'next/dynamic';

const Activation          = dynamic(() => import('./stages/Activation'),          { ssr: false });
const AcquisitionGuided   = dynamic(() => import('./stages/AcquisitionGuided'),   { ssr: false });
const Recognition         = dynamic(() => import('./stages/Recognition'),          { ssr: false });
const ListeningSurvivable = dynamic(() => import('./stages/ListeningSurvivable'),  { ssr: false });
const ContextualInput     = dynamic(() => import('./stages/ContextualInput'),      { ssr: false });
const GuidedDiscovery     = dynamic(() => import('./stages/GuidedDiscovery'),      { ssr: false });
const MicroExplanation    = dynamic(() => import('./stages/MicroExplanation'),     { ssr: false });
const GuidedProduction    = dynamic(() => import('./stages/GuidedProduction'),     { ssr: false });
const ReactiveInteraction = dynamic(() => import('./stages/ReactiveInteraction'),  { ssr: false });
const SmartReview         = dynamic(() => import('./stages/SmartReview'),          { ssr: false });
const Completion          = dynamic(() => import('./stages/Completion'),           { ssr: false });

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

interface StagePanelProps {
  stageIndex: number;
  onComplete?: () => void;
}

export default function StagePanel({ stageIndex, onComplete }: StagePanelProps) {
  const StageComponent = COMPONENTS[stageIndex];

  if (!StageComponent) {
    return (
      <article className="wl-korean-runtime-stage-panel wl-card">
        <p style={{ padding: '2rem', color: 'var(--muted)', textAlign: 'center' }}>
          Etapa no disponible.
        </p>
      </article>
    );
  }

  return (
    <article className="wl-korean-runtime-stage-panel">
      <header className="wl-korean-runtime-stage-panel__head wl-card">
        <p className="wl-korean-runtime-stage-panel__eyebrow">
          Etapa {String(stageIndex + 1).padStart(2, '0')} de 11
        </p>
        <h3>{STAGE_NAMES[stageIndex]}</h3>
      </header>
      <div className="wl-card" style={{ overflow: 'hidden' }}>
        <StageComponent onComplete={onComplete} />
      </div>
    </article>
  );
}
