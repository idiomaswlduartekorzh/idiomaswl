import Link from 'next/link'
import s from './LanguageHub.module.css'

/**
 * El hub de idioma: la pantalla donde el estudiante elige nivel.
 *
 * Se escribe aquí una vez porque, si no, el camino de entrada cambia de aspecto dos veces:
 * `/practica` lleva a `/practica/<idioma>` y de ahí a `/practica/<idioma>/<nivel>`, y esos
 * dos últimos escalones estaban escritos por separado en cada archivo.
 *
 * Ver `docs/sistema-visual-practica.md`.
 */

export type HubLevel = {
  /** «A1», «B2»… Va en la chapa y encabeza el nombre. */
  nivel: string
  /** El nombre del nivel en el idioma que se estudia: «초급 · Principiante». */
  name: string
  desc: string
  href?: string
  /** Sin declarar se da por abierto; en `false` la fila se apaga y no enlaza. */
  available?: boolean
  count?: string
}

export type HubTool = {
  name: string
  desc: string
  href: string
  tag: string
}

export type LanguageHubProps = {
  /** La última migaja: «🇰🇷 Coreano». */
  langLabel: string
  eyebrow: string
  title: string
  lead: string
  levels: HubLevel[]
  accent: string
  /** Herramientas sueltas del idioma. Hoy solo coreano trae. */
  tools?: HubTool[]
  toolsEyebrow?: string
  /** Va sobre la lista de niveles. Es donde entra la tarjeta de Historias. */
  beforeLevels?: React.ReactNode
  /** Añadido bajo la descripción de cada nivel. Inglés lo usa para su barra de progreso. */
  levelExtra?: (nivel: HubLevel) => React.ReactNode
}

export default function LanguageHub({
  langLabel,
  eyebrow,
  title,
  lead,
  levels,
  accent,
  tools,
  toolsEyebrow = 'Herramientas adicionales',
  beforeLevels,
  levelExtra,
}: LanguageHubProps) {
  return (
    <div className="wlp-page" style={{ '--wlp-accent': accent } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{langLabel}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="wlp-hero-lead">{lead}</p>
        </header>

        {beforeLevels ? <div className={s.list}>{beforeLevels}</div> : null}

        <ul className={s.list}>
          {levels.map((n) => {
            const abierto = n.available !== false && Boolean(n.href)
            const fila = (
              <div className={s.row}>
                <span className={s.badge} aria-hidden="true">{n.nivel}</span>
                <div className={s.body}>
                  <div className={s.titleRow}>
                    <span className={s.name}>{n.nivel} — {n.name}</span>
                    <span className={`${s.tag} ${abierto ? '' : s.tagSoon}`}>
                      {abierto ? 'DISPONIBLE' : 'PRÓXIMAMENTE'}
                    </span>
                  </div>
                  <p className={s.desc}>{n.desc}</p>
                  {n.count && abierto ? <p className={s.count}>{n.count}</p> : null}
                  {levelExtra?.(n)}
                </div>
                {abierto ? <span className={s.arrow} aria-hidden="true">→</span> : null}
              </div>
            )
            return (
              <li key={n.nivel}>
                {abierto ? (
                  <Link href={n.href!} className="wlp-card wlp-card--path">{fila}</Link>
                ) : (
                  <div className={`wlp-card wlp-card--path ${s.soon}`}>{fila}</div>
                )}
              </li>
            )
          })}
        </ul>

        {tools?.length ? (
          <section className="wlp-section">
            <p className="wlp-eyebrow">{toolsEyebrow}</p>
            <ul className={s.tools}>
              {tools.map((h) => (
                <li key={h.href}>
                  <Link href={h.href} className={`wlp-card ${s.tool}`}>
                    <span className={s.toolName}>{h.name}</span>
                    <p className={s.desc}>{h.desc}</p>
                    <span className={s.toolTag}>{h.tag} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}
