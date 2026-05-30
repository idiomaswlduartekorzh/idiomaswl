'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { updateProfile } from '@/lib/actions/updateProfile'
import type { StudentPlan } from '@/lib/actions/assignPlan'

const PLAN_LABELS: Record<StudentPlan, string> = {
  autodidacta: 'Autodidacta',
  preparacion: 'Preparación',
  intensivo:   'Intensivo',
}
const PLAN_COLORS: Record<StudentPlan, string> = {
  autodidacta: '#6b7280',
  preparacion: '#1a2ecc',
  intensivo:   '#c8202e',
}

interface Props {
  name: string
  email: string
  plan: StudentPlan
  joinedAt: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default function PerfilClient({ name, email, plan, joinedAt }: Props) {
  const [editing, setEditing]   = useState(false)
  const [value, setValue]       = useState(name)
  const [saving, setSaving]     = useState(false)
  const [msg, setMsg]           = useState<{ ok: boolean; text: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSave() {
    if (!value.trim() || value.trim() === name) { setEditing(false); return }
    setSaving(true)
    setMsg(null)
    const fd = new FormData()
    fd.set('full_name', value.trim())
    const res = await updateProfile(fd)
    setSaving(false)
    if (res.ok) {
      setMsg({ ok: true, text: '¡Nombre actualizado correctamente!' })
      setEditing(false)
    } else {
      setMsg({ ok: false, text: res.error ?? 'Error al guardar.' })
    }
    setTimeout(() => setMsg(null), 4000)
  }

  function startEdit() {
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  const initial = (value[0] ?? 'E').toUpperCase()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-2)',
      fontFamily: 'system-ui, sans-serif',
      color: 'var(--ink)',
    }}>
      {/* Toast */}
      {msg && (
        <div style={{
          position: 'fixed', top: 16, right: 16, zIndex: 9999,
          background: msg.ok ? '#15803d' : '#dc2626',
          color: '#fff', padding: '10px 18px', borderRadius: 10,
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
          transition: 'opacity 0.2s',
        }}>
          {msg.text}
        </div>
      )}

      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64, maxWidth: 680 }}>

        {/* ── Back link ── */}
        <Link
          href="/dashboard/student"
          style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 24 }}
        >
          ← Volver al inicio
        </Link>

        {/* ── Header card ── */}
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--line-soft)',
          borderRadius: 20,
          padding: '28px 28px 24px',
          marginBottom: 20,
          boxShadow: '0 4px 20px rgba(20,33,92,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: PLAN_COLORS[plan],
              color: '#fff',
              fontWeight: 800, fontSize: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {initial}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                {value}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
                  padding: '3px 9px', borderRadius: 100,
                  background: PLAN_COLORS[plan] + '18',
                  color: PLAN_COLORS[plan],
                  border: `1px solid ${PLAN_COLORS[plan]}44`,
                }}>
                  {PLAN_LABELS[plan]}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Estudiante</span>
              </div>
            </div>
          </div>

          {/* ── Info rows ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Name field */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg-2)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>
                  Nombre completo
                </p>
                {editing ? (
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false) }}
                    maxLength={80}
                    style={{
                      fontSize: 14, fontWeight: 500, color: 'var(--ink)',
                      border: '1px solid rgba(26,46,204,0.35)', borderRadius: 7,
                      padding: '4px 8px', outline: 'none',
                      background: 'var(--bg)', width: '100%', maxWidth: 300,
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                    {value}
                  </p>
                )}
              </div>
              {editing ? (
                <div style={{ display: 'flex', gap: 8, marginLeft: 12, flexShrink: 0 }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      padding: '6px 14px', borderRadius: 8,
                      background: '#1a2ecc', color: '#fff',
                      border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? 'Guardando…' : 'Guardar'}
                  </button>
                  <button
                    onClick={() => { setEditing(false); setValue(name) }}
                    style={{
                      padding: '6px 12px', borderRadius: 8,
                      background: 'transparent', color: 'var(--muted)',
                      border: '1px solid var(--line-soft)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={startEdit}
                  style={{
                    padding: '6px 12px', borderRadius: 8, marginLeft: 12,
                    background: 'transparent', color: 'var(--muted)',
                    border: '1px solid var(--line-soft)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  Editar
                </button>
              )}
            </div>

            {/* Email (read-only) */}
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-2)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
            }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>
                Correo electrónico
              </p>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
                {email}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                Para cambiar tu email contáctanos por WhatsApp.
              </p>
            </div>

            {/* Plan */}
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-2)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>
                  Plan activo
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
                    padding: '3px 9px', borderRadius: 100,
                    background: PLAN_COLORS[plan] + '18',
                    color: PLAN_COLORS[plan],
                    border: `1px solid ${PLAN_COLORS[plan]}44`,
                  }}>
                    {PLAN_LABELS[plan]}
                  </span>
                </div>
              </div>
              {plan !== 'intensivo' && (
                <a
                  href="https://wa.me/573005004253?text=Hola%2C%20quiero%20conocer%20los%20planes%20de%20WeLearn%20y%20hacer%20un%20upgrade."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontSize: 12, fontWeight: 600, color: PLAN_COLORS.intensivo,
                    textDecoration: 'none', border: `1px solid ${PLAN_COLORS.intensivo}44`,
                    padding: '5px 12px', borderRadius: 8, background: `${PLAN_COLORS.intensivo}08`,
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  Subir de plan →
                </a>
              )}
            </div>

            {/* Joined date */}
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-2)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
            }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>
                Miembro desde
              </p>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
                {formatDate(joinedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Danger zone ── */}
        <div style={{
          background: 'var(--bg)',
          border: '1px solid rgba(220,38,38,0.2)',
          borderRadius: 16,
          padding: '20px 24px',
        }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#dc2626' }}>
            ¿Necesitas ayuda?
          </h2>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
            Si necesitas eliminar tu cuenta, cambiar tu correo o tienes algún problema técnico,
            escríbenos directamente por WhatsApp.
          </p>
          <a
            href="https://wa.me/573005004253?text=Hola%2C%20necesito%20ayuda%20con%20mi%20cuenta%20en%20WeLearn."
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', fontSize: 12, fontWeight: 600,
              color: '#fff', background: '#25D366',
              padding: '7px 14px', borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Abrir chat de soporte →
          </a>
        </div>

      </div>
    </div>
  )
}
