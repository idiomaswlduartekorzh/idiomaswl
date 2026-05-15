'use client';

const STAGE_LABELS: Record<number, string> = {
  1:  'Activación',
  2:  'Adquisición guiada',
  3:  'Reconocimiento',
  4:  'Escucha sobrevivible',
  5:  'Contexto primero',
  6:  'Descubre el patrón',
  7:  'Micro explicación',
  8:  'Producción guiada',
  9:  'Interacción reactiva',
  10: 'Smart Review',
  11: 'Cierre y siguiente paso',
};

interface StageRailProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function StageRail({ activeIndex, onSelect }: StageRailProps) {
  return (
    <aside className="wl-korean-runtime-rail wl-card">
      <h2>Etapas</h2>
      <ol>
        {Array.from({ length: 11 }, (_, i) => {
          const num = i + 1;
          const isActive = i === activeIndex;
          return (
            <li key={num}>
              <button
                type="button"
                className={`wl-korean-runtime-rail__item${isActive ? ' is-active' : ''}`}
                onClick={() => onSelect(i)}
              >
                <span>{String(num).padStart(2, '0')}</span>
                <strong>{STAGE_LABELS[num]}</strong>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
