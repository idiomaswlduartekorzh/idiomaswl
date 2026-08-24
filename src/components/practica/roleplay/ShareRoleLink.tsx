'use client'

import { useState } from 'react'
import s from './roleplay.module.css'

export default function ShareRoleLink({ href, label }: { href: string; label: string }) {
  const [status, setStatus] = useState('')

  async function share() {
    const url = new URL(href, window.location.origin).toString()
    try {
      if (navigator.share) {
        await navigator.share({ title: label, text: 'Abre únicamente tu ficha para el juego de rol.', url })
        setStatus('Enlace compartido')
      } else {
        await navigator.clipboard.writeText(url)
        setStatus('Enlace copiado')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus('No se pudo compartir. Abre la ficha y copia la dirección del navegador.')
    }
  }

  return (
    <>
      <button className="wlp-btn wlp-btn--secondary" type="button" onClick={share}>{label}</button>
      <span aria-live="polite" className={s.shareStatus}>{status}</span>
    </>
  )
}
