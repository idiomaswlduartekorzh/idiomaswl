'use client'

import Link from 'next/link'

const WA_NUMBER = '573005004253'

interface WhatsAppButtonProps {
  msg: string
  label: string
  style?: React.CSSProperties
}

export function WhatsAppButton({ msg, label, style }: WhatsAppButtonProps) {
  const encodedMsg = encodeURIComponent(msg)
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodedMsg}`

  return (
    <Link
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        ...style,
      }}
    >
      {label}
    </Link>
  )
}
