'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import s from './SpeakingPractice.module.css'

/**
 * La pantalla de expresión oral, una sola vez.
 *
 * Antes vivía copiada en los 24 `habla/Content.tsx` —831 estilos en línea entre todos—, así
 * que cualquier arreglo había que hacerlo veinticuatro veces y en la práctica se hacía en
 * una o dos. Ahora los archivos de idioma son solo datos y ajustes de copia.
 *
 * Los ocho idiomas no guardan la frase igual, y no se les ha obligado a hacerlo: el coreano
 * tiene hangul y romanización, el japonés kana y romaji, el ruso cirílico y transliteración,
 * y el B1 añade el contexto de uso. Cada archivo traduce su forma a `SpeakingPhrase` al
 * llamar aquí, y sus datos se quedan intactos. Los campos opcionales simplemente no se
 * pintan cuando faltan.
 *
 * Ver `docs/sistema-visual-practica.md`.
 */

export type SpeakingPhrase = {
  id: number
  /** La frase en el idioma que se estudia: hangul, kana, cirílico o alfabeto latino. */
  phrase: string
  /** Romanización o transliteración, para los idiomas que no se leen en latino. */
  script?: string
  /** Aproximación fonética entre corchetes. */
  phonetic?: string
  /** La traducción al español. */
  es: string
  /** Cuándo se usa. Lo traen sobre todo los niveles B1. */
  context?: string
  note: string
  category: string
  /** Variantes de registro. Hoy solo las trae alemán A2. */
  formal?: string
  informal?: string
}

export type SpeakingPracticeProps = {
  /** El hub del nivel, para el migajero: `/practica/ingles/a2`. */
  hubHref: string
  hubLabel: string
  /** Migajero adicional para modos que viven debajo de la página de habla. */
  sectionHref?: string
  sectionLabel?: string
  currentLabel?: string
  /** Antetítulo. Suele llevar el nombre de la destreza en el idioma meta. */
  eyebrow: string
  title: string
  /** Nodo y no texto: algunas páginas resaltan un fragmento («한글 + Romanización»). */
  lead: React.ReactNode
  phrases: SpeakingPhrase[]
  /** Las categorías del filtro, sin incluir «Todas»: esa la pone el componente. */
  categories: string[]
  /** Para pintar la categoría en otro idioma sin tocar los datos. */
  categoryLabel?: Record<string, string>
  /** El consejo de arriba. Es nodo y no texto porque varios idiomas resaltan palabras. */
  tip?: React.ReactNode
  noteHeading?: string
  todoLabel?: string
  doneLabel?: string
  /** El aviso de haberlas practicado todas. Diez de las 24 páginas no lo traen. */
  completionTitle?: string
  completionBody?: string
  /** El cajón de enlaces al cerrar. Hoy lo traen los B1, que enlazan a vocabulario y lectura. */
  footer?: React.ReactNode
}

const ALL = '__todas__'

export default function SpeakingPractice({
  hubHref,
  hubLabel,
  sectionHref,
  sectionLabel = 'Expresión oral',
  currentLabel = 'Expresión oral',
  eyebrow,
  title,
  lead,
  phrases,
  categories,
  categoryLabel,
  tip,
  noteHeading = 'Nota de pronunciación y uso',
  todoLabel = 'Lo logré',
  doneLabel = 'Dominada',
  completionTitle,
  completionBody,
  footer,
}: SpeakingPracticeProps) {
  const [filter, setFilter] = useState(ALL)
  const [practiced, setPracticed] = useState<ReadonlySet<number>>(new Set())
  const [expanded, setExpanded] = useState<number | null>(null)

  const shown = useMemo(
    () => (filter === ALL ? phrases : phrases.filter((p) => p.category === filter)),
    [filter, phrases],
  )

  const pct = phrases.length ? Math.round((practiced.size / phrases.length) * 100) : 0
  const complete = phrases.length > 0 && practiced.size === phrases.length

  function toggle(id: number) {
    setPracticed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.habla.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href={hubHref}>{hubLabel}</Link>
          <span aria-hidden="true">/</span>
          {sectionHref ? (
            <>
              <Link href={sectionHref}>{sectionLabel}</Link>
              <span aria-hidden="true">/</span>
            </>
          ) : null}
          <span aria-current="page">{currentLabel}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="wlp-hero-lead">{lead}</p>
        </header>

        <div className={s.progress}>
          <div
            className="wlp-meter"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Frases practicadas"
          >
            <span style={{ width: `${pct}%` }} />
          </div>
          <span className={`${s.progressLabel} ${complete ? s.progressLabelFull : ''}`}>
            {practiced.size}/{phrases.length} practicadas
          </span>
        </div>

        <div className="wlp-tabs" role="group" aria-label="Filtrar por categoría">
          <button type="button" aria-pressed={filter === ALL} onClick={() => setFilter(ALL)}>
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {categoryLabel?.[cat] ?? cat}
            </button>
          ))}
        </div>

        {tip ? <div className={s.tip}>{tip}</div> : null}

        <ul className={s.list}>
          {shown.map((p) => {
            const done = practiced.has(p.id)
            const open = expanded === p.id
            const noteId = `habla-nota-${p.id}`
            return (
              <li key={p.id} className={`${s.item} ${done ? s.itemDone : ''}`}>
                <div className={s.row}>
                  <span className={`${s.num} ${done ? s.numDone : ''}`} aria-hidden="true">
                    {p.id}
                  </span>

                  <div className={s.body}>
                    {/* Sin `lang`: declararlo mal es peor que no declararlo. Aquí no llega
                        el código del idioma, y poner `und` le dice al lector de pantalla
                        que se dé por vencido. Cuando el componente reciba el idioma como
                        dato, este es el sitio. */}
                    <div className={s.phrase}>{p.phrase}</div>
                    {p.script ? <div className={s.script}>{p.script}</div> : null}
                    {p.phonetic ? <div className={s.phonetic}>{p.phonetic}</div> : null}
                    <div className={s.es}>{p.es}</div>
                    {p.context ? <div className={s.context}>{p.context}</div> : null}
                  </div>

                  <div className={s.actions}>
                    <button
                      type="button"
                      className={s.noteToggle}
                      aria-expanded={open}
                      aria-controls={noteId}
                      onClick={() => setExpanded(open ? null : p.id)}
                    >
                      {open ? '▲ nota' : '▼ nota'}
                    </button>
                    <button
                      type="button"
                      className={`${s.markButton} ${done ? s.markButtonDone : ''}`}
                      aria-pressed={done}
                      onClick={() => toggle(p.id)}
                    >
                      {done ? `✓ ${doneLabel}` : `${todoLabel} ✓`}
                    </button>
                  </div>
                </div>

                {open ? (
                  <div className={s.note} id={noteId}>
                    <div className={s.noteHeading}>{noteHeading}</div>
                    <p>{p.note}</p>
                    <div className={s.tags}>
                      <span className={s.tag}>{categoryLabel?.[p.category] ?? p.category}</span>
                      {p.formal ? (
                        <span className={`${s.tag} ${s.tagRegister}`}>Formal: {p.formal}</span>
                      ) : null}
                      {p.informal ? (
                        <span className={`${s.tag} ${s.tagRegister}`}>Informal: {p.informal}</span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>

        {complete && completionTitle ? (
          <div className={s.done}>
            <h2>{completionTitle}</h2>
            {completionBody ? <p>{completionBody}</p> : null}
          </div>
        ) : null}

        {footer ? <div className={s.footer}>{footer}</div> : null}
      </div>
    </div>
  )
}
