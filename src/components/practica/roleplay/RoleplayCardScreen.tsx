'use client'

import { useState } from 'react'
import s from './roleplay.module.css'

/**
 * La carta de complicación, en su propia pantalla.
 *
 * No es maquetación: en las simulaciones, la carta impresa debajo del andamiaje **se leyó
 * sola** —es justo la zona que el estudiante flojo consulta cada dos turnos—, y en un
 * escenario verla antes hacía salir mejor la conversación. Un incentivo que premia mirar
 * antes enseña a mirar antes. §9 del blueprint.
 *
 * Por eso la ficha se desmonta al abrir la carta, y no se esconde con CSS: si sigue en el
 * documento, sigue estando a un `Ctrl+F` de distancia. Y por eso el turno global va escrito
 * encima, en el botón y en la propia carta.
 *
 * Que la carta se abra a mano y no sola es consecuencia de que no hay sincronía entre las
 * dos pantallas. Está dicho donde el estudiante lo lee, no solo en el informe.
 */
export default function RoleplayCardScreen({
  afterTurn,
  intro,
  card,
  children,
}: {
  afterTurn: number
  /** El «ábrela cuando…» de la ficha, ya renderizado en el servidor. */
  intro: React.ReactNode
  card: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  if (open) {
    return (
      <section className={s.cardScreen} aria-label="La carta">
        <p className={s.cardTurn}>Turno global {afterTurn}</p>
        {intro}
        <div className={s.cardBody}>{card}</div>
        <div className="wlp-actions" style={{ marginTop: '1.6rem' }}>
          <button
            type="button"
            className="wlp-btn wlp-btn--secondary"
            onClick={() => {
              setOpen(false)
              window.scrollTo({ top: 0 })
            }}
          >
            ← Volver a mi ficha
          </button>
        </div>
      </section>
    )
  }

  return (
    <>
      {children}

      <div className={s.cardBar}>
        <p className={s.cardBarText}>
          <strong>Tienes una carta.</strong> Se abre en el <strong>turno global {afterTurn}</strong> —el
          turno {afterTurn} de la conversación, no el tuyo— y ocupa esta pantalla entera. Ábrela cuando
          toque: mirarla antes no te da ventaja, te da trabajo.
        </p>
        <button
          type="button"
          className="wlp-btn"
          onClick={() => {
            setOpen(true)
            window.scrollTo({ top: 0 })
          }}
        >
          Abrir la carta →
        </button>
      </div>
    </>
  )
}
