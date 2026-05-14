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
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: 'var(--bg)',
        border: '1px solid var(--line-soft)',
        borderRadius: 16,
        padding: '20px 16px',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 24,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          margin: '0 0 14px',
        }}
      >
        Etapas del día
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 2 }}>
        {Array.from({ length: 11 }, (_, i) => {
          const num = i + 1;
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <li key={num}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '24px 1fr',
                  gap: 10,
                  alignItems: 'center',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? 'var(--ink)' : 'transparent',
                  color: isActive ? 'var(--accent-ink)' : isDone ? 'var(--ink)' : 'var(--muted)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {String(num).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 12, fontWeight: isActive ? 600 : 400, lineHeight: 1.3 }}>
                  {STAGE_LABELS[num]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
