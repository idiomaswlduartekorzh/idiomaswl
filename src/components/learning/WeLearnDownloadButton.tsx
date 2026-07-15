import { Download } from 'lucide-react'
import Link from 'next/link'

export default function WeLearnDownloadButton({
  href,
  label,
  description = 'Guia membretada con explicaciones, modelos y ejercicios.',
}: {
  href: string
  label: string
  description?: string
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        padding: '0.9rem 1rem', marginBottom: '1.75rem', border: '1px solid var(--line-soft)',
        borderRadius: 12, background: 'linear-gradient(100deg, rgba(15,61,140,0.06), rgba(229,57,53,0.05))',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>
          Recurso WeLearn
        </p>
        <p style={{ margin: '0.18rem 0 0', color: 'var(--ink-2)', fontSize: '0.86rem' }}>{description}</p>
      </div>
      <Link
        href={href}
        download
        className="no-print"
        aria-label={label}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.95rem',
          borderRadius: 9, background: '#10266b', color: '#fff', textDecoration: 'none',
          fontSize: '0.84rem', fontWeight: 800, whiteSpace: 'nowrap',
        }}
      >
        <Download size={16} aria-hidden="true" />
        {label}
      </Link>
    </div>
  )
}
