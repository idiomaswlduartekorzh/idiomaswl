'use client';

import dynamic from 'next/dynamic';

// ── Day 1 stages ──────────────────────────────────────────────────────────────
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

// ── Day 3 stages ──────────────────────────────────────────────────────────────
const Activation003          = dynamic(() => import('./stages/step003/Activation003'),          { ssr: false });
const AcquisitionGuided003   = dynamic(() => import('./stages/step003/AcquisitionGuided003'),   { ssr: false });
const Recognition003         = dynamic(() => import('./stages/step003/Recognition003'),          { ssr: false });
const ListeningSurvivable003 = dynamic(() => import('./stages/step003/ListeningSurvivable003'), { ssr: false });
const ContextualInput003     = dynamic(() => import('./stages/step003/ContextualInput003'),     { ssr: false });

// ── Day 2 stages ──────────────────────────────────────────────────────────────
const Activation002          = dynamic(() => import('./stages/step002/Activation002'),          { ssr: false });
const AcquisitionGuided002   = dynamic(() => import('./stages/step002/AcquisitionGuided002'),   { ssr: false });
const Recognition002         = dynamic(() => import('./stages/step002/Recognition002'),          { ssr: false });
const ListeningSurvivable002 = dynamic(() => import('./stages/step002/ListeningSurvivable002'), { ssr: false });
const ContextualInput002     = dynamic(() => import('./stages/step002/ContextualInput002'),     { ssr: false });
const GuidedDiscovery002     = dynamic(() => import('./stages/step002/GuidedDiscovery002'),     { ssr: false });
const MicroExplanation002    = dynamic(() => import('./stages/step002/MicroExplanation002'),    { ssr: false });
const GuidedProduction002    = dynamic(() => import('./stages/step002/GuidedProduction002'),    { ssr: false });
const ReactiveInteraction002 = dynamic(() => import('./stages/step002/ReactiveInteraction002'), { ssr: false });
const SmartReview002         = dynamic(() => import('./stages/step002/SmartReview002'),         { ssr: false });
const Completion002          = dynamic(() => import('./stages/step002/Completion002'),          { ssr: false });

const COMPONENTS_DAY1 = [
  Activation, AcquisitionGuided, Recognition, ListeningSurvivable,
  ContextualInput, GuidedDiscovery, MicroExplanation, GuidedProduction,
  ReactiveInteraction, SmartReview, Completion,
];

const COMPONENTS_DAY2 = [
  Activation002, AcquisitionGuided002, Recognition002, ListeningSurvivable002,
  ContextualInput002, GuidedDiscovery002, MicroExplanation002, GuidedProduction002,
  ReactiveInteraction002, SmartReview002, Completion002,
];

const COMPONENTS_DAY3 = [
  Activation003, AcquisitionGuided003, Recognition003, ListeningSurvivable003,
  ContextualInput003,
  // stages 6-11 coming soon — fall back to placeholder
];

const STAGE_NAMES = [
  'Activación', 'Adquisición guiada', 'Reconocimiento', 'Escucha sobrevivible',
  'Contexto primero', 'Descubre el patrón', 'Micro explicación', 'Producción guiada',
  'Interacción reactiva', 'Smart Review', 'Cierre y siguiente paso',
];

interface StagePanelProps {
  stageIndex: number;
  dayNumber?: number;
  onComplete?: () => void;
}

export default function StagePanel({ stageIndex, dayNumber = 1, onComplete }: StagePanelProps) {
  const components = dayNumber === 3 ? COMPONENTS_DAY3 : dayNumber === 2 ? COMPONENTS_DAY2 : COMPONENTS_DAY1;
  const StageComponent = components[stageIndex];

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
