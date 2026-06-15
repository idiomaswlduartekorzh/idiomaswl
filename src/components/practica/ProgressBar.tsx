'use client'

interface Props {
  completed: number
  total: number
  color?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export default function ProgressBar({
  completed,
  total,
  color = '#0066cc',
  showLabel = true,
  size = 'sm',
}: Props) {
  if (total === 0) return null

  const segSize = size === 'sm' ? 10 : 13
  const segGap = 3

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: segGap }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: segSize,
              height: segSize,
              borderRadius: 3,
              background: i < completed ? color : 'var(--line-soft)',
              transition: 'background 0.3s',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--mono)',
            color: completed > 0 ? color : 'var(--muted)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {completed}/{total}
        </span>
      )}
    </div>
  )
}
