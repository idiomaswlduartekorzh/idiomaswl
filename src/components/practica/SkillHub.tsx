import Link from 'next/link'
import { SKILL_ACCENT, isSkillId } from '@/data/practica/skill-accents'
import s from './SkillHub.module.css'

/**
 * El hub de nivel: la pantalla donde el estudiante elige habilidad.
 *
 * Existía copiado en los 26 archivos `<idioma>/<nivel>/page.tsx`, con las mismas 70 líneas
 * de estilos en línea en cada uno. Ahora esos archivos solo declaran sus seis habilidades y
 * su copia.
 *
 * Aquí se cierra el contrato de color, que era el fallo más visible de la sección: la
 * tarjeta anunciaba un color y la página de destino usaba otro —gramática se anunciaba
 * morada en los 26 hubs y por dentro era roja, azul, verde o amarilla según el idioma—.
 * El color ya no se escribe aquí ni allí: sale de `skill-accents.ts`, que leen ambos lados.
 *
 * Y se aplica el tono serio que decidió David: sin emoji, sin degradados, esquinas de 6 px.
 * Donde estaba el emoji va ahora el nombre de la destreza en el idioma que se estudia
 * —READING, ASCOLTO, 말하기—, que además dice algo.
 *
 * Ver `docs/sistema-visual-practica.md`.
 */

export type HubSkill = {
  /** `lectura`, `gramatica`, `escritura`, `habla`, `vocabulario` o `escucha`. */
  id: string
  name: string
  /** El nombre en el idioma meta. Va en el antetítulo, donde antes estaba el emoji. */
  eng: string
  desc: string
  count: string
  href: string
  /** Sin declarar se da por construida; en `false` la tarjeta se apaga. */
  available?: boolean
}

export type SkillHubProps = {
  /** Migaja del idioma: `/practica/ingles` y «🇬🇧 Inglés». */
  langHref: string
  langLabel: string
  /** La chapa y la última migaja: «A2». */
  levelLabel: string
  eyebrow: string
  title: string
  lead: string
  skills: HubSkill[]
  /**
   * El color del idioma, para el cromo de la página. Las tarjetas no lo usan: cada una lleva
   * el acento de su habilidad. Es el último color de idioma escrito a mano que queda.
   */
  accent: string
  tip?: React.ReactNode
  /** Hueco a la derecha del encabezado. Hoy solo inglés A1 lo usa, para la racha. */
  headerAside?: React.ReactNode
  /** Hueco bajo el encabezado. Hoy solo inglés A1, para la barra de nivel. */
  beforeGrid?: React.ReactNode
  /** Distintivo por tarjeta. Hoy solo inglés A1, para marcar la habilidad terminada. */
  cardBadge?: (skill: HubSkill) => React.ReactNode
}

export default function SkillHub({
  langHref,
  langLabel,
  levelLabel,
  eyebrow,
  title,
  lead,
  skills,
  accent,
  tip,
  headerAside,
  beforeGrid,
  cardBadge,
}: SkillHubProps) {
  return (
    <div className="wlp-page" style={{ '--wlp-accent': accent } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href={langHref}>{langLabel}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{levelLabel}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <div className={s.head}>
            <div className={s.identity}>
              <span className={s.level} aria-hidden="true">{levelLabel}</span>
              <div>
                <p className="wlp-eyebrow">{eyebrow}</p>
                <h1>{title}</h1>
              </div>
            </div>
            {headerAside}
          </div>
          <p className="wlp-hero-lead">{lead}</p>
          {beforeGrid ? <div className={s.progress}>{beforeGrid}</div> : null}
        </header>

        <ul className={s.grid}>
          {skills.map((h) => {
            const disponible = h.available !== false
            // Cada tarjeta declara el acento de SU habilidad, que es el mismo que usará la
            // página a la que lleva. Si el id no es una habilidad conocida, hereda el del
            // idioma en vez de inventarse un color.
            const acento = isSkillId(h.id) ? SKILL_ACCENT[h.id].var : accent
            return (
              <li key={h.id}>
                <Link
                  href={h.href}
                  className={`wlp-card wlp-card--path ${s.card} ${disponible ? '' : s.soon}`}
                  style={{ '--wlp-accent': disponible ? acento : 'var(--wlp-line)' } as React.CSSProperties}
                  aria-disabled={disponible ? undefined : true}
                >
                  <div className={s.cardTop}>
                    <div>
                      <span className="wlp-eyebrow wlp-eyebrow--card">{h.eng}</span>
                      <div className={s.name}>{h.name}</div>
                    </div>
                    {cardBadge?.(h)}
                  </div>
                  <p className={s.desc}>{h.desc}</p>
                  <div className={s.cardFoot}>
                    <span className={s.count}>{h.count}</span>
                    <span className={s.arrow} aria-hidden="true">→</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {tip ? <div className={s.tip}>{tip}</div> : null}
      </div>
    </div>
  )
}
