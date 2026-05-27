'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

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
const GuidedDiscovery003     = dynamic(() => import('./stages/step003/GuidedDiscovery003'),     { ssr: false });
const MicroExplanation003    = dynamic(() => import('./stages/step003/MicroExplanation003'),    { ssr: false });
const GuidedProduction003    = dynamic(() => import('./stages/step003/GuidedProduction003'),    { ssr: false });
const ReactiveInteraction003 = dynamic(() => import('./stages/step003/ReactiveInteraction003'), { ssr: false });
const SmartReview003         = dynamic(() => import('./stages/step003/SmartReview003'),         { ssr: false });
const Completion003          = dynamic(() => import('./stages/step003/Completion003'),          { ssr: false });

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

// ── Day 6 stages (ex-Day 4) ───────────────────────────────────────────────────
const Activation006          = dynamic(() => import('./stages/step006/Activation006'),          { ssr: false });
const AcquisitionGuided006   = dynamic(() => import('./stages/step006/AcquisitionGuided006'),   { ssr: false });
const Recognition006         = dynamic(() => import('./stages/step006/Recognition006'),          { ssr: false });
const ListeningSurvivable006 = dynamic(() => import('./stages/step006/ListeningSurvivable006'), { ssr: false });
const ContextualInput006     = dynamic(() => import('./stages/step006/ContextualInput006'),     { ssr: false });
const GuidedDiscovery006     = dynamic(() => import('./stages/step006/GuidedDiscovery006'),     { ssr: false });
const MicroExplanation006    = dynamic(() => import('./stages/step006/MicroExplanation006'),    { ssr: false });
const GuidedProduction006    = dynamic(() => import('./stages/step006/GuidedProduction006'),    { ssr: false });
const ReactiveInteraction006 = dynamic(() => import('./stages/step006/ReactiveInteraction006'), { ssr: false });
const SmartReview006         = dynamic(() => import('./stages/step006/SmartReview006'),         { ssr: false });
const Completion006          = dynamic(() => import('./stages/step006/Completion006'),          { ssr: false });

// ── Day 5 stages ──────────────────────────────────────────────────────────────
const Activation005          = dynamic(() => import('./stages/step005/Activation005'),          { ssr: false });
const AcquisitionGuided005   = dynamic(() => import('./stages/step005/AcquisitionGuided005'),   { ssr: false });
const Recognition005         = dynamic(() => import('./stages/step005/Recognition005'),          { ssr: false });
const ListeningSurvivable005 = dynamic(() => import('./stages/step005/ListeningSurvivable005'), { ssr: false });
const ContextualInput005     = dynamic(() => import('./stages/step005/ContextualInput005'),     { ssr: false });
const GuidedDiscovery005     = dynamic(() => import('./stages/step005/GuidedDiscovery005'),     { ssr: false });
const MicroExplanation005    = dynamic(() => import('./stages/step005/MicroExplanation005'),    { ssr: false });
const GuidedProduction005    = dynamic(() => import('./stages/step005/GuidedProduction005'),    { ssr: false });
const ReactiveInteraction005 = dynamic(() => import('./stages/step005/ReactiveInteraction005'), { ssr: false });
const SmartReview005         = dynamic(() => import('./stages/step005/SmartReview005'),         { ssr: false });
const Completion005          = dynamic(() => import('./stages/step005/Completion005'),          { ssr: false });

// ── Day 4 stages ──────────────────────────────────────────────────────────────
const Activation004          = dynamic(() => import('./stages/step004/Activation004'),          { ssr: false });
const AcquisitionGuided004   = dynamic(() => import('./stages/step004/AcquisitionGuided004'),   { ssr: false });
const Recognition004         = dynamic(() => import('./stages/step004/Recognition004'),          { ssr: false });
const ListeningSurvivable004 = dynamic(() => import('./stages/step004/ListeningSurvivable004'), { ssr: false });
const ContextualInput004     = dynamic(() => import('./stages/step004/ContextualInput004'),     { ssr: false });
const GuidedDiscovery004     = dynamic(() => import('./stages/step004/GuidedDiscovery004'),     { ssr: false });
const MicroExplanation004    = dynamic(() => import('./stages/step004/MicroExplanation004'),    { ssr: false });
const GuidedProduction004    = dynamic(() => import('./stages/step004/GuidedProduction004'),    { ssr: false });
const ReactiveInteraction004 = dynamic(() => import('./stages/step004/ReactiveInteraction004'), { ssr: false });
const SmartReview004         = dynamic(() => import('./stages/step004/SmartReview004'),         { ssr: false });
const Completion004          = dynamic(() => import('./stages/step004/Completion004'),          { ssr: false });

// ── Day 7 stages (ex-Day 5) ───────────────────────────────────────────────────
const Activation007          = dynamic(() => import('./stages/step007/Activation007'),          { ssr: false });
const AcquisitionGuided007   = dynamic(() => import('./stages/step007/AcquisitionGuided007'),   { ssr: false });
const Recognition007         = dynamic(() => import('./stages/step007/Recognition007'),          { ssr: false });
const ListeningSurvivable007 = dynamic(() => import('./stages/step007/ListeningSurvivable007'), { ssr: false });
const ContextualInput007     = dynamic(() => import('./stages/step007/ContextualInput007'),     { ssr: false });
const GuidedDiscovery007     = dynamic(() => import('./stages/step007/GuidedDiscovery007'),     { ssr: false });
const MicroExplanation007    = dynamic(() => import('./stages/step007/MicroExplanation007'),    { ssr: false });
const GuidedProduction007    = dynamic(() => import('./stages/step007/GuidedProduction007'),    { ssr: false });
const ReactiveInteraction007 = dynamic(() => import('./stages/step007/ReactiveInteraction007'), { ssr: false });
const SmartReview007         = dynamic(() => import('./stages/step007/SmartReview007'),         { ssr: false });
const Completion007          = dynamic(() => import('./stages/step007/Completion007'),          { ssr: false });

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
  ContextualInput003, GuidedDiscovery003, MicroExplanation003, GuidedProduction003,
  ReactiveInteraction003, SmartReview003, Completion003,
];

const COMPONENTS_DAY4 = [
  Activation004, AcquisitionGuided004, Recognition004, ListeningSurvivable004,
  ContextualInput004, GuidedDiscovery004, MicroExplanation004, GuidedProduction004,
  ReactiveInteraction004, SmartReview004, Completion004,
];

const COMPONENTS_DAY5 = [
  Activation005, AcquisitionGuided005, Recognition005, ListeningSurvivable005,
  ContextualInput005, GuidedDiscovery005, MicroExplanation005, GuidedProduction005,
  ReactiveInteraction005, SmartReview005, Completion005,
];

const COMPONENTS_DAY6 = [
  Activation006, AcquisitionGuided006, Recognition006, ListeningSurvivable006,
  ContextualInput006, GuidedDiscovery006, MicroExplanation006, GuidedProduction006,
  ReactiveInteraction006, SmartReview006, Completion006,
];

const COMPONENTS_DAY7 = [
  Activation007, AcquisitionGuided007, Recognition007, ListeningSurvivable007,
  ContextualInput007, GuidedDiscovery007, MicroExplanation007, GuidedProduction007,
  ReactiveInteraction007, SmartReview007, Completion007,
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
  const components =
    dayNumber === 7 ? COMPONENTS_DAY7 :
    dayNumber === 6 ? COMPONENTS_DAY6 :
    dayNumber === 5 ? COMPONENTS_DAY5 :
    dayNumber === 4 ? COMPONENTS_DAY4 :
    dayNumber === 3 ? COMPONENTS_DAY3 :
    dayNumber === 2 ? COMPONENTS_DAY2 :
    COMPONENTS_DAY1;
  const StageComponent = components[stageIndex];

  const isUnpublishedDay = ![1, 2, 3, 4, 5, 6, 7].includes(dayNumber);

  if (!StageComponent || isUnpublishedDay) {
    return (
      <article className="wl-korean-runtime-stage-panel wl-card">
        <div style={{ padding: '3.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
          <span style={{ fontSize: 44 }}>🚧</span>
          <p style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)', margin: 0 }}>
            Día {dayNumber} — Próximamente
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0, maxWidth: 380, lineHeight: 1.65 }}>
            Este día está en producción. Publicamos nuevas lecciones de forma regular —
            vuelve en unos días para encontrarlo disponible.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.25rem' }}>
            <Link
              href="/practica"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.55rem 1.1rem', borderRadius: 10,
                background: 'var(--accent, #14215c)', color: '#fff',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}
            >
              Practicar lectura en coreano →
            </Link>
            <Link
              href="/leccion"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.55rem 1.1rem', borderRadius: 10,
                border: '1.5px solid var(--line-soft)', background: 'transparent',
                color: 'var(--muted)', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              Ver lecciones disponibles
            </Link>
          </div>
        </div>
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
