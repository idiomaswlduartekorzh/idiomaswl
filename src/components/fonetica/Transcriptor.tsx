'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import { simbolosPresentes } from '@/data/fonetica/simbolos-coreano'
import type { NotationSystem, Token, WordToken } from '@/lib/fonetica/tipos'

import styles from './transcriptor.module.css'

/**
 * La pantalla del transcriptor. **Una sola para todos los idiomas.**
 *
 * Lo que cambia por idioma va en `config`: qué sistemas de notación ofrece, el texto de
 * ejemplo, si tiene formas débiles. Lo que NO cambia —el cuadro de entrada, los tres
 * formatos de salida, el selector de variantes, la leyenda, el portapapeles, el audio— vive
 * aquí una vez.
 *
 * Es deliberado y viene de una cicatriz del repositorio: la pantalla de habla acabó copiada
 * 24 veces, con tres interfaces distintas que nadie había decidido, y hubo que dedicar una
 * fase entera a unificarlas. Un idioma nuevo aporta su motor, no su pantalla.
 */

export interface TranscriptorConfig {
  /** Se manda a la API para elegir el motor. */
  readonly lang: string
  readonly systems: NotationSystem[]
  readonly example: string
  readonly placeholder: string
  /** Idioma para la voz del navegador, por sistema. */
  readonly speechLang: string
  /** El idioma tiene formas débiles que se pueden encender. */
  readonly weakForms?: boolean
  /** Enseñar cómo se escribiría la pronunciación real: `학교` → `학꾜`. */
  readonly showSpoken?: boolean
  /** Enseñar la leyenda de símbolos del AFI coreano. */
  readonly showKoreanSymbols?: boolean
  readonly breadcrumb: string
  readonly title: string
  readonly lead: string
}

type Layout = 'sola' | 'lado' | 'lineas'

const MAX_CHARACTERS = 12_000

function formOf(token: WordToken, system: string, variant: number, weak: boolean): string {
  if (weak && token.weak?.[system]) return token.weak[system]
  const forms = token.forms[system] ?? []
  const chosen = forms[variant] ?? forms[0] ?? ''
  // El sonido de enlace lo pone el idioma: /r/ en inglés, /z/ /t/ /n/ en francés.
  const link = token.linking?.[system]?.[variant] ?? token.linking?.[system]?.[0] ?? null
  return link && token.followedByVowel ? `${chosen}${link}` : chosen
}

/** Variantes distintas para el sistema que se está viendo. Ver el comentario del inglés. */
function distinctVariants(token: WordToken, system: string): { label: string; index: number }[] {
  const seen = new Set<string>()
  const out: { label: string; index: number }[] = []
  ;(token.forms[system] ?? []).forEach((form, index) => {
    if (seen.has(form)) return
    seen.add(form)
    out.push({ label: form, index })
  })
  return out
}

export default function Transcriptor({
  config,
  children,
}: {
  config: TranscriptorConfig
  children?: ReactNode
}) {
  const [text, setText] = useState('')
  const [tokens, setTokens] = useState<Token[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copyNote, setCopyNote] = useState<string | null>(null)

  const [system, setSystem] = useState(config.systems[0].id)
  const [layout, setLayout] = useState<Layout>('sola')
  const [weakForms, setWeakForms] = useState(false)
  const [variants, setVariants] = useState<Record<number, number>>({})
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [canSpeak, setCanSpeak] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const lastRequest = useRef<{ text: string; tokens: Token[] } | null>(null)

  useEffect(() => {
    setCanSpeak(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const run = useCallback(async () => {
    const value = text.trim()
    if (!value || busy) return
    if (lastRequest.current?.text === value) { setTokens(lastRequest.current.tokens); return }

    setBusy(true)
    setError(null)
    try {
      const response = await fetch('/api/fonetica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, lang: config.lang }),
      })
      if (!response.ok) {
        const detail = response.headers.get('content-type')?.includes('json')
          ? ((await response.json()) as { error?: string }).error
          : null
        throw new Error(detail ?? 'No se pudo transcribir el texto.')
      }
      const data = (await response.json()) as { tokens: Token[] }
      lastRequest.current = { text: value, tokens: data.tokens }
      setTokens(data.tokens)
      setVariants({})
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo transcribir el texto.')
      setTokens(null)
    } finally {
      setBusy(false)
    }
  }, [text, busy, config.lang])

  const closeMenu = useCallback(() => {
    setOpenMenu(null)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (openMenu === null) return
    const onPointer = (event: MouseEvent) => {
      if (!outputRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu() }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onEscape)
    }
  }, [openMenu, closeMenu])

  const changeSystem = (next: string) => {
    setSystem(next)
    setVariants({})
    setOpenMenu(null)
  }

  const lines = useMemo(() => {
    if (!tokens) return []
    const out: { tokens: Token[]; indexes: number[] }[] = [{ tokens: [], indexes: [] }]
    tokens.forEach((token, index) => {
      if (token.kind === 'break') { out.push({ tokens: [], indexes: [] }); return }
      out[out.length - 1].tokens.push(token)
      out[out.length - 1].indexes.push(index)
    })
    return out
  }, [tokens])

  const words = useMemo(
    () => (tokens ?? []).filter((t): t is WordToken => t.kind === 'word'),
    [tokens],
  )

  const plainOutput = useMemo(() => {
    if (!tokens) return ''
    return tokens.map((token, index) => {
      if (token.kind === 'break') return '\n'
      if (token.kind === 'plain') return token.text
      if (token.status === 'unknown') return token.text
      return formOf(token, system, variants[index] ?? 0, weakForms)
    }).join('')
  }, [tokens, system, variants, weakForms])

  const stats = useMemo(() => {
    if (!tokens) return null
    return {
      words: words.length,
      unknown: words.filter((w) => w.status === 'unknown').length,
      derived: words.filter((w) => w.status === 'derived').length,
      choices: words.filter(
        (w) => distinctVariants(w, system).length > 1 && !(weakForms && w.weak),
      ).length,
    }
  }, [tokens, words, system, weakForms])

  /** Solo la leyenda que hace falta para este texto. */
  const symbols = useMemo(() => {
    if (!config.showKoreanSymbols || !tokens) return []
    const afi = words.map((w) => w.forms.afi?.[0] ?? '').join(' ')
    return simbolosPresentes(afi)
  }, [config.showKoreanSymbols, tokens, words])

  const activeSystem = config.systems.find((s) => s.id === system)

  const speak = () => {
    if (!canSpeak) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.trim())
    utterance.lang = config.speechLang
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainOutput)
      setCopyNote('Copiado')
    } catch {
      setCopyNote('El navegador no dejó copiar')
    }
    window.setTimeout(() => setCopyNote(null), 2000)
  }

  const renderWord = (token: WordToken, index: number) => {
    if (token.status === 'unknown') {
      return (
        <span key={index} className={styles.unknown}>
          {token.text}
          <span className={styles.srOnly}> (no se pudo transcribir)</span>
        </span>
      )
    }

    const options = distinctVariants(token, system)
    const current = variants[index] ?? 0
    const form = formOf(token, system, current, weakForms)
    const isWeak = weakForms && token.weak != null

    if (options.length < 2 || isWeak) {
      return (
        <span
          key={index}
          className={[
            styles.word,
            isWeak ? styles.weak : '',
            token.status === 'derived' ? styles.derived : '',
          ].filter(Boolean).join(' ')}
        >
          {form}
          {token.status === 'derived' && (
            <span className={styles.srOnly}> (deducida de una palabra conocida)</span>
          )}
        </span>
      )
    }

    const open = openMenu === index
    return (
      <span key={index} className={styles.choiceWrap}>
        <button
          type="button"
          className={`${styles.word} ${styles.choice}`}
          aria-expanded={open}
          aria-controls={`variantes-${index}`}
          aria-label={`${token.text}: ${options.length} pronunciaciones, pulsa para elegir`}
          onClick={(event) => { triggerRef.current = event.currentTarget; setOpenMenu(open ? null : index) }}
        >
          {form}
        </button>
        {open && (
          <span
            className={styles.menu}
            id={`variantes-${index}`}
            role="group"
            aria-label={`Pronunciaciones de ${token.text}`}
          >
            <span className={styles.menuTitle}>{token.text}</span>
            {options.map((option) => (
              <button
                key={option.index}
                type="button"
                aria-pressed={option.index === current}
                className={option.index === current ? styles.menuItemActive : styles.menuItem}
                onClick={() => {
                  setVariants((previous) => ({ ...previous, [index]: option.index }))
                  closeMenu()
                }}
              >
                {option.label}
              </button>
            ))}
          </span>
        )}
      </span>
    )
  }

  const renderTokens = (slice: { tokens: Token[]; indexes: number[] }) =>
    slice.tokens.map((token, position) => {
      const index = slice.indexes[position]
      if (token.kind === 'plain') return <span key={index}>{token.text}</span>
      if (token.kind === 'break') return null
      return renderWord(token, index)
    })

  const sourceOfLine = (slice: { tokens: Token[] }) =>
    slice.tokens.map((token) => (token.kind === 'break' ? '' : token.text)).join('')

  return (
    <div className="wlp-page" style={{ '--wlp-accent': SKILL_ACCENT.habla.var } as React.CSSProperties}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas">Herramientas</Link>
          <span aria-hidden="true">/</span>
          <Link href="/herramientas/transcripcion-fonetica">Transcripción fonética</Link>
          <span aria-hidden="true">/</span>
          <span>{config.breadcrumb}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Herramienta gratuita</p>
          <h1>{config.title}</h1>
          <p className="wlp-hero-lead">{config.lead}</p>
        </header>

        <section className="wlp-section" aria-label="Texto de entrada">
          <textarea
            className={styles.input}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault()
                void run()
              }
            }}
            placeholder={config.placeholder}
            rows={6}
            spellCheck={false}
            maxLength={MAX_CHARACTERS}
            aria-label="Texto que transcribir"
          />

          <div className={styles.actions}>
            <button type="button" className="wlp-btn" onClick={() => void run()} disabled={busy || !text.trim()}>
              {busy ? 'Transcribiendo…' : 'Transcribir'}
            </button>
            <button
              type="button"
              className="wlp-btn wlp-btn--secondary"
              onClick={() => { setText(config.example); setTokens(null); setError(null); setCopyNote(null) }}
            >
              Probar con un ejemplo
            </button>
            <span className={styles.hint}>
              {text.length > 0 && `${text.length.toLocaleString('es-CO')} / ${MAX_CHARACTERS.toLocaleString('es-CO')} · `}
              Ctrl + Enter
            </span>
          </div>

          {error && <p className="wlp-feedback wlp-feedback--alert" role="alert">{error}</p>}
        </section>

        {tokens && (
          <section className="wlp-section" aria-label="Resultado" aria-busy={busy}>
            <div className={styles.controls}>
              <fieldset className={styles.group}>
                <legend className={styles.legend}>
                  {config.systems.length > 2 ? 'Notación' : config.systems[0].hint === 'RP' ? 'Acento' : 'Cómo verlo'}
                </legend>
                <div className="wlp-tabs">
                  {config.systems.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={system === option.id}
                      onClick={() => changeSystem(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.group}>
                <legend className={styles.legend}>Cómo mostrarlo</legend>
                <div className="wlp-tabs">
                  {([['sola', 'Solo transcripción'], ['lado', 'Al lado del original'], ['lineas', 'Línea por línea']] as [Layout, string][]).map(([value, label]) => (
                    <button key={value} type="button" aria-pressed={layout === value} onClick={() => setLayout(value)}>
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {config.weakForms && (
                <label className={styles.toggle}>
                  <input type="checkbox" checked={weakForms} onChange={(e) => setWeakForms(e.target.checked)} />
                  <span>
                    Formas débiles
                    <small>Cómo suenan de verdad dentro de la frase: <i>can</i> pasa de /kæn/ a /kən/</small>
                  </span>
                </label>
              )}
            </div>

            {/* Coreano: la capa de en medio, que es donde se ve la regla. */}
            {config.showSpoken && words.some((w) => w.spoken && w.spoken !== w.text) && (
              <p className={styles.spokenRow}>
                {words.filter((w) => w.spoken).map((w, i) => (
                  <span key={i} className={styles.spokenPair}>
                    <b>{w.text}</b>
                    <span>se dice</span>
                    <b>{w.spoken}</b>
                  </span>
                ))}
              </p>
            )}

            <div className={styles.output} ref={outputRef}>
              {layout === 'sola' && (
                <p className={styles.ipa}>
                  {lines.map((line, index) => (
                    <span key={index}>
                      {renderTokens(line)}
                      {index < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}

              {(layout === 'lado' || layout === 'lineas') && (
                <div className={layout === 'lado' ? styles.sideBySide : styles.stacked}>
                  {lines.map((line, index) => (
                    <div key={index} className={layout === 'lado' ? styles.sideRow : styles.stackedRow}>
                      <p className={styles.original}>{sourceOfLine(line)}</p>
                      <p className={styles.ipa}>{renderTokens(line)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {activeSystem?.noEsPronunciacion && (
              <p className={styles.notPronunciation}>
                Ojo: la romanización dice cómo se <b>escribe</b> con nuestro alfabeto, no cómo
                se pronuncia. <b>학교</b> se romaniza <i>hakgyo</i> aunque suene <b>학꾜</b>.
                Para saber cómo suena, usa el alfabeto fonético.
              </p>
            )}

            <div className={styles.resultBar}>
              <div className="wlp-btn-row">
                <button type="button" className="wlp-btn wlp-btn--secondary" onClick={copy}>
                  {copyNote ?? 'Copiar transcripción'}
                </button>
                {canSpeak && (
                  <button type="button" className="wlp-btn wlp-btn--secondary" onClick={speak}>
                    Escuchar el texto
                  </button>
                )}
              </div>
              {stats && (
                <p className={styles.stats} role="status" aria-live="polite">
                  {stats.words} palabras transcritas
                  {stats.choices > 0 && <> · <b>{stats.choices}</b> con más de una pronunciación</>}
                  {stats.derived > 0 && <> · {stats.derived} deducidas</>}
                  {stats.unknown > 0 && <> · <b>{stats.unknown}</b> sin transcribir</>}
                </p>
              )}
            </div>

            {symbols.length > 0 && (
              <>
                <p className={styles.legend} style={{ marginTop: '1.5rem' }}>
                  Los sonidos de este texto
                </p>
                <p className={styles.symbolsIntro}>
                  Casi todos son símbolos del alfabeto fonético internacional de siempre. Los
                  de las consonantes tensas vienen del <b>AFI Extendido</b>, que es la parte
                  del estándar para sonidos que la tabla principal no cubre: son oficiales y se
                  usan en toda la bibliografía de coreano, pero no salen en los diccionarios,
                  así que es normal no haberlos visto antes.
                </p>
                <div className={styles.symbols}>
                  {symbols.map((entry) => (
                    <div key={entry.simbolo} className={styles.symbolCard}>
                      <div className={styles.symbolHead}>
                        <b>{entry.simbolo}</b>
                        <span>{entry.hangul}</span>
                      </div>
                      <p>{entry.comoSuena}</p>
                      {entry.errorTipico && (
                        <p className={styles.symbolError}>⚠ {entry.errorTipico}</p>
                      )}
                      {entry.tambienEscrito && (
                        <p className={styles.symbolAlso}>{entry.tambienEscrito}</p>
                      )}
                      {entry.fuente === 'extendido' && (
                        <p className={styles.symbolSource}>
                          Del AFI Extendido, no de la tabla principal — por eso no aparece en
                          los diccionarios corrientes.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {children}
      </div>
    </div>
  )
}
