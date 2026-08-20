'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Colocacion, FalsoAmigo, VocabBlock, VocabEntry, VocabLevel } from '@/data/practica/vocabulario/schema'
import { opcionesDe } from '@/data/practica/vocabulario/opciones'
import { audioDe, type CorteAudio } from '@/data/practica/vocabulario/audio'
import { resumen } from '@/data/practica/vocabulario/progreso'
import { useVocabProgress } from './useVocabProgress'
import { unidadesDe } from '@/data/practica/vocabulario/unidades'
import {
  ahuecar,
  corregirDictado,
  ejercicioCaja2,
  evaluarFrasePropia,
  evaluarHueco,
  evaluarProduccion,
  MIN_FRASES,
  MIN_PALABRAS_USADAS,
  progresoEscritura,
} from '@/data/practica/vocabulario/ejercicios'
import PdfDownloadButton from '@/components/practica/PdfDownloadButton'
import { canRenderPdf } from '@/lib/pdf/languages'

/**
 * Motor único de vocabulario para los ocho idiomas.
 *
 * Sustituye a los 24 `Content.tsx` que había, cada uno con su propio esquema y su propia
 * interfaz. Lo que este motor añade y aquellos no tenían es el método: la caja del repaso
 * espaciado no decide solo CUÁNDO vuelve una palabra, decide QUÉ se pregunta.
 *
 *   caja 1 · reconocer          → opción múltiple, lengua meta → español
 *   caja 2 · producir con ayuda → escribir la palabra con la inicial dada
 *   caja 3 · producir           → escribir la palabra sin ayuda
 *   caja 4 · usar en contexto   → rellenar el hueco en la frase real donde suena
 *   caja 5 · frase propia       → escribirla uno mismo. Solo aquí se da por dominada
 *
 * Por eso «dominada» deja de significar «volteó una tarjeta».
 *
 * El progreso se guarda en el navegador (`useVocabProgress`). Sin cuenta no viaja de un
 * dispositivo a otro y la caja 5 sigue llegando el mismo día; con cuenta se sincronizará
 * contra Supabase y el repaso se repartirá a lo largo de mes y medio, que es lo que promete
 * la metodología.
 */

const COLOR = 'var(--wlp-accent-vocabulario)'
/** El color al N % de opacidad; antes se pegaba la transparencia en hexadecimal. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`

type Props = {
  bloque: VocabBlock
  nivel: VocabLevel
  idiomaLabel: string
  nivelLabel: string
  /** BCP-47 de la lengua meta: la voz del dictado depende de él (en-US, de-DE, ko-KR…). */
  locale: string
}

const CAJAS = [
  { n: 1, nombre: 'Reconocer', pide: 'Elige el significado' },
  { n: 2, nombre: 'Producir con ayuda', pide: 'Escríbela — te doy la inicial' },
  { n: 3, nombre: 'Producir', pide: 'Escríbela sin ayuda' },
  { n: 4, nombre: 'Usar en contexto', pide: 'Rellena el hueco de la frase' },
  { n: 5, nombre: 'Frase propia', pide: 'Úsala en una frase tuya' },
] as const

// ─── Utilidades de navegador ──────────────────────────────────────────────────
//
// Todo lo que decide qué ve o qué acierta el estudiante vive en `ejercicios.ts` y `opciones.ts`,
// fuera del componente, para que la puerta de calidad pueda ejecutarlo. Aquí solo queda lo que
// depende del navegador y no se puede auditar en Node.

/**
 * Un solo reproductor para toda la página.
 *
 * Sin esto, pulsar «escuchar» dos veces seguidas deja dos audios sonando encima. Se reutiliza
 * el mismo elemento y se para lo anterior antes de empezar lo siguiente.
 */
let reproductor: HTMLAudioElement | null = null

/**
 * Suena el corte grabado, y si no lo hay, la voz del navegador.
 *
 * El orden importa y no es una preferencia estética. La auditoría de usuario encontró que en
 * un portátil colombiano configurado en español, `speechSynthesis` lee el inglés con fonética
 * española: no es un audio pobre, es un audio que enseña mal. Donde hay grabación, la
 * grabación manda; la voz del navegador se queda como red para los 23 niveles que aún no la
 * tienen.
 */
function reproducirCorte(corte: CorteAudio): boolean {
  if (typeof window === 'undefined') return false
  if (!reproductor) reproductor = new Audio()
  const a = reproductor
  a.pause()
  if (!a.src.endsWith(corte.src)) a.src = corte.src

  const parar = () => {
    if (a.currentTime >= corte.fin) {
      a.pause()
      a.removeEventListener('timeupdate', parar)
    }
  }

  const arrancar = () => {
    a.currentTime = corte.inicio
    a.addEventListener('timeupdate', parar)
    void a.play().catch(() => {})
  }

  if (a.readyState >= 1) arrancar()
  else a.addEventListener('loadedmetadata', arrancar, { once: true })
  return true
}

function decirConNavegador(texto: string, locale: string): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  const u = new SpeechSynthesisUtterance(texto)
  u.lang = locale
  u.rate = 0.82
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
  return true
}

/** Lo que se le ofrece al estudiante: la grabación si existe, si no la voz del navegador. */
function decir(entrada: VocabEntry, que: 'lemma' | 'ejemplo', locale: string): boolean {
  const corte = audioDe(entrada.id, que)
  if (corte) return reproducirCorte(corte)
  return decirConNavegador(que === 'lemma' ? entrada.lemma : entrada.ejemplo.target, locale)
}

/**
 * ¿Hay alguna manera de que suene? Grabado o sintetizado, da igual cuál.
 *
 * `vozNavegador` entra por parámetro y no se mira aquí a propósito. Mirar `window` durante el
 * render rompía la hidratación en los niveles sin grabar: el servidor pintaba la ficha sin
 * botón y el navegador con él, y React tiraba el árbol entero y lo rehacía en cliente. En A1
 * no se veía porque `audioDe` ya devolvía un corte y el botón salía en los dos lados; se
 * destapó al llegar A2, que todavía no tiene audio. Quien pregunta por la voz del navegador
 * tiene que hacerlo **después** de montar, con `useVozDelNavegador`.
 */
const sePuedeOir = (entrada: VocabEntry, que: 'lemma' | 'ejemplo', vozNavegador: boolean) =>
  Boolean(audioDe(entrada.id, que)) || vozNavegador

const hayVoz = () => typeof window !== 'undefined' && !!window.speechSynthesis

/** La voz del navegador, preguntada después de montar para que el servidor y el cliente coincidan. */
function useVozDelNavegador(): boolean {
  const [hay, setHay] = useState(false)
  useEffect(() => setHay(hayVoz()), [])
  return hay
}


// ─── Piezas de presentación ───────────────────────────────────────────────────

function Chunks({ colocaciones }: { colocaciones: Colocacion[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0', display: 'grid', gap: '0.3rem' }}>
      {colocaciones.map((col) => (
        <li key={col.chunk} style={{ fontSize: '0.86rem', lineHeight: 1.45 }}>
          <strong style={{ color: COLOR }}>{col.chunk}</strong>
          <span style={{ color: 'var(--muted)' }}> — {col.es}</span>
        </li>
      ))}
    </ul>
  )
}

function Fuente({ entrada }: { entrada: VocabEntry }) {
  const f = entrada.ejemplo.fuente
  const delMaterial = f.tipo !== 'redactado'
  const etiqueta =
    f.tipo === 'corpus' ? `🎧 ep${f.episodio}` : f.tipo === 'lectura' ? '📄 lectura' : '✎ redactado'
  const titulo =
    f.tipo === 'corpus'
      ? `Se oye en el episodio ${f.episodio} de ${f.serie}`
      : f.tipo === 'lectura'
        ? `Se lee en el ejercicio ${f.ejercicio}`
        : f.motivo
  return (
    <span
      title={titulo}
      style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontFamily: 'var(--mono)',
        padding: '0.12rem 0.42rem',
        borderRadius: 'var(--wlp-r)',
        border: '1px solid var(--line-soft)',
        color: delMaterial ? COLOR : 'var(--muted)',
        background: delMaterial ? `${COLORMix(5.1)}` : 'transparent',
        whiteSpace: 'nowrap',
      }}
    >
      {etiqueta}
    </span>
  )
}

/**
 * El aviso de falso amigo.
 *
 * Las tres partes van juntas porque la trampa tiene tres partes, y dar solo una deja al
 * estudiante a medio camino: qué le parece, qué significa de verdad, y cómo se dice entonces
 * lo que él quería decir. Sin la tercera, quien buscaba «atender» sigue sin saber qué escribir.
 *
 * Va después de las colocaciones y antes del ejemplo a propósito: primero lo que la palabra
 * hace, luego el aviso, y al final la frase donde se ve funcionando.
 */
function Trampa({ falso }: { falso: FalsoAmigo }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: '0.82rem',
        lineHeight: 1.5,
        padding: '0.5rem 0.65rem',
        borderRadius: 'var(--wlp-r)',
        border: '1px solid var(--line-soft)',
        borderLeft: `3px solid ${COLOR}`,
        background: `${COLORMix(3.9)}`,
      }}
    >
      <strong style={{ color: COLOR }}>Falso amigo.</strong>{' '}
      Parece «{falso.pareceEspanol}» y no lo es: significa <strong>{falso.significaEnRealidad}</strong>.
      {' '}Para decir «{falso.pareceEspanol}» se usa <em>{falso.seDiceAsi}</em>.
    </p>
  )
}

function Ficha({ entrada, locale }: { entrada: VocabEntry; locale: string }) {
  const vozNavegador = useVozDelNavegador()
  const x = entrada.extra
  return (
    <article
      style={{
        border: '1px solid var(--line-soft)',
        borderRadius: 'var(--wlp-r)',
        padding: '1rem 1.1rem',
        background: 'var(--bg)',
        display: 'grid',
        gap: '0.45rem',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0, fontSize: '1.22rem', letterSpacing: '-0.01em' }}>{entrada.lemma}</h3>
        {sePuedeOir(entrada, 'lemma', vozNavegador) && (
          <button
            onClick={() => decir(entrada, 'lemma', locale)}
            aria-label={`Escuchar «${entrada.lemma}»`}
            title={`Escuchar «${entrada.lemma}»`}
            style={{
              appearance: 'none', border: 'none', background: 'none', cursor: 'pointer',
              padding: 0, fontSize: '0.95rem', lineHeight: 1, color: COLOR,
            }}
          >
            🔊
          </button>
        )}
        {/*
          El acento tónico llevaba etiqueta ninguna. La auditoría de usuario lo dijo así:
          «mi primera lectura es que es otra forma de la palabra, o que la escribí mal».
          Va marcado, y en voz alta al lado, que es como se entiende de verdad.
        */}
        {'acento' in x && x.acento && x.acento !== entrada.lemma && (
          <span
            title="Dónde carga la voz al pronunciarla"
            style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', color: 'var(--muted)' }}
          >
            se dice {x.acento}
          </span>
        )}
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{entrada.pos}</span>
      </header>

      <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--ink)' }}>{entrada.es}</p>

      {'colocaciones' in x && <Chunks colocaciones={x.colocaciones} />}

      {'falsoAmigo' in x && x.falsoAmigo && <Trampa falso={x.falsoAmigo} />}

      <div
        style={{
          marginTop: '0.35rem',
          paddingTop: '0.55rem',
          borderTop: '1px solid var(--line-soft)',
          display: 'grid',
          gap: '0.25rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', flex: 1 }}>{entrada.ejemplo.target}</p>
          <Fuente entrada={entrada} />
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)' }}>{entrada.ejemplo.es}</p>
      </div>
    </article>
  )
}

// ─── Sesión de estudio ────────────────────────────────────────────────────────

function Sesion({
  entradas,
  locale,
  cajas,
  guardar,
  onSalir,
}: {
  entradas: VocabEntry[]
  locale: string
  /**
   * El progreso llega desde arriba, no se crea aquí.
   *
   * Vive en el padre porque la pantalla de unidades también lo necesita para decir por dónde
   * vas. Con una copia en cada sitio, salir de una sesión dejaría la lista de unidades
   * pintando lo de antes hasta recargar.
   */
  cajas: Record<string, number>
  guardar: (siguientes: Record<string, number>) => void
  onSalir: () => void
}) {
  const [respuesta, setRespuesta] = useState('')
  const [veredicto, setVeredicto] = useState<'acierto' | 'fallo' | null>(null)
  const [detalle, setDetalle] = useState<string[]>([])
  const [chunkUsado, setChunkUsado] = useState<string | undefined>(undefined)

  const pendientes = entradas.filter((e) => (cajas[e.id] ?? 1) <= 5)
  const actual = useMemo(
    () => pendientes.slice().sort((a, b) => (cajas[a.id] ?? 1) - (cajas[b.id] ?? 1))[0],
    [pendientes, cajas],
  )

  if (!actual) return <CierreDeUnidad entradas={entradas} locale={locale} onSalir={onSalir} />


  const caja = cajas[actual.id] ?? 1
  const hueco = caja === 4 ? ahuecar(actual.ejemplo.target, actual.lemma) : null
  // Si la palabra no se puede localizar en su frase, la caja 4 no tiene ejercicio: se
  // degrada a producción libre en vez de mostrar un hueco falso.
  const modo = caja === 4 && !hueco ? 3 : caja
  const caja2 = ejercicioCaja2(actual, entradas.filter((e) => e.id !== actual.id).map((e) => e.lemma))

  function calificar(ok: boolean, faltas: string[] = [], chunk?: string) {
    setVeredicto(ok ? 'acierto' : 'fallo')
    setDetalle(faltas)
    setChunkUsado(chunk)
  }

  /**
   * Un solo sitio donde se decide si la respuesta vale, y ninguna comparación suelta.
   *
   * Antes cada caja se calificaba con un `limpio(respuesta) === limpio(esperado)` escrito a
   * mano en su `onKeyDown` y otro en el botón. Eso significaba tres copias de la misma regla
   * dentro del JSX —justo donde el validador no llega— y por eso la caja 4 podía exigir
   * `orders` a quien había aprendido `order` sin que ninguna puerta lo notara.
   */
  function comprobar() {
    if (veredicto !== null || respuesta.trim().length === 0) return
    if (modo === 5) {
      const r = evaluarFrasePropia(respuesta, actual)
      calificar(r.ok, r.faltas, r.chunkUsado)
      return
    }
    if (modo === 4 && hueco) {
      const r = evaluarHueco(respuesta, hueco.forma, actual.lemma)
      calificar(r.ok, r.nota ? [r.nota] : [])
      return
    }
    const r = evaluarProduccion(respuesta, actual, entradas)
    // Al fallar la ortografía, se enseña la regla que el motor ya tenía calculada y se
    // guardaba para sí. Era la corrección más barata de toda la auditoría.
    const faltas = r.ok
      ? r.nota
        ? [r.nota]
        : []
      : modo === 2 && caja2.tipo === 'ortografia'
        ? [`Lo que fallaba en «${caja2.mal}» era la ${caja2.regla}.`]
        : []
    calificar(r.ok, faltas)
  }

  function siguiente() {
    guardar({
      ...cajas,
      [actual.id]: veredicto === 'acierto' ? (cajas[actual.id] ?? 1) + 1 : 1,
    })
    setRespuesta('')
    setVeredicto(null)
    setDetalle([])
    setChunkUsado(undefined)
  }

  /**
   * Lo que había que contestar — y no es lo mismo en cada caja. En la caja 1 la pregunta es
   * el significado, así que decir «Era father» cuando el estudiante buscaba «padre» responde
   * a otra pregunta y lo deja sin saber qué falló.
   */
  const esperado = modo === 1 ? actual.es : modo === 4 && hueco ? hueco.forma : actual.lemma

  const { opciones } = opcionesDe(actual, entradas)

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {/* Escalera: el estado de las diez de un vistazo */}
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
        {entradas.map((e, i) => {
          const c = cajas[e.id] ?? 1
          // Ninguna palabra se pinta mientras haya que producir una.
          //
          // La escalera imprimía `e.lemma` siempre, con la actual marcada en rojo. Es decir:
          // la caja 3 decía «escríbela sin ayuda» y tenía la respuesta arriba, subrayada.
          // Las dos cajas de producción no pedían nada, y el motor felicitaba igual. Lo
          // encontró la auditoría de usuario; ningún script podía verlo, porque el dato
          // estaba bien y lo que fallaba era la pantalla. Otra vez.
          //
          // Se tapan las diez, no solo la actual: el estudiante pasa por todas, así que
          // esconder únicamente la de turno solo retrasa la filtración un ejercicio.
          const tapada = modo >= 2
          return (
            <span
              key={e.id}
              title={tapada ? `caja ${Math.min(c, 5)}` : `${e.lemma} · caja ${Math.min(c, 5)}`}
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--mono)',
                padding: '0.16rem 0.4rem',
                borderRadius: 'var(--wlp-r)',
                border: `1px solid ${e.id === actual.id ? COLOR : 'var(--line-soft)'}`,
                background: c > 5 ? `${COLORMix(13.3)}` : 'transparent',
                color: c > 5 ? COLOR : 'var(--muted)',
              }}
            >
              {tapada ? `· ${i + 1} ·` : e.lemma} {c > 5 ? '✓' : c}
            </span>
          )
        })}
      </div>

      {/* Los data-* no pintan nada: son el asidero de la auditoría con Playwright, que
          recorre la escalera entera y necesita saber en qué caja está y con qué palabra
          sin adivinarlo del texto. */}
      <div
        data-testid="ejercicio"
        data-caja={modo}
        data-lemma={actual.lemma}
        data-variante={modo === 2 ? caja2.tipo : undefined}
        style={{ border: '1px solid var(--line-soft)', borderRadius: 'var(--wlp-r)', padding: '1.3rem', background: 'var(--bg)' }}
      >
        <p style={{ margin: '0 0 0.9rem', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: COLOR }}>
          CAJA {modo} · {CAJAS[modo - 1].nombre} —{' '}
          {modo === 2 && caja2.tipo === 'ortografia' ? 'Corrige cómo se escribe' : CAJAS[modo - 1].pide}
        </p>

        {/* Caja 1 · reconocer */}
        {modo === 1 && (
          <>
            <p style={{ fontSize: '1.5rem', margin: '0 0 1rem', fontWeight: 700 }}>{actual.lemma}</p>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {opciones.map((opcion) => (
                <button
                  key={opcion}
                  disabled={veredicto !== null}
                  onClick={() => calificar(opcion === actual.es)}
                  style={{
                    ...botonOpcion,
                    borderColor: veredicto && opcion === actual.es ? COLOR : 'var(--line-soft)',
                    background: veredicto && opcion === actual.es ? `${COLORMix(5.1)}` : 'var(--bg)',
                  }}
                >
                  {opcion}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Cajas 2 y 3 · producir */}
        {(modo === 2 || modo === 3) && (
          <>
            {modo === 2 && caja2.tipo === 'ortografia' ? (
              <>
                <p style={{ fontSize: '1.15rem', margin: '0 0 0.3rem' }}>
                  Esta palabra está mal escrita. Corrígela:
                </p>
                <p style={{ fontSize: '1.6rem', margin: '0 0 0.2rem', fontWeight: 700, color: 'var(--muted)', textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: COLOR }}>
                  {caja2.mal}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.86rem', margin: '0 0 0.8rem' }}>{actual.es}</p>
              </>
            ) : (
              <p style={{ fontSize: '1.15rem', margin: '0 0 0.3rem' }}>{actual.es}</p>
            )}
            {modo === 2 && caja2.tipo === 'inicial' && (
              <p style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.84rem', margin: '0 0 0.8rem' }}>
                empieza por «{actual.lemma.slice(0, 1)}» · {actual.lemma.length} letras
              </p>
            )}
            <input
              value={respuesta}
              disabled={veredicto !== null}
              onChange={(e) => setRespuesta(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') comprobar()
              }}
              placeholder="Escribe la palabra"
              style={campo}
            />
          </>
        )}

        {/* Caja 4 · usar en contexto */}
        {modo === 4 && hueco && (
          <>
            <p style={{ fontSize: '1.05rem', margin: '0 0 0.55rem', lineHeight: 1.6 }}>
              {hueco.antes}
              <span style={{ borderBottom: `2px solid ${COLOR}`, padding: '0 1.6rem' }} />
              {hueco.despues}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', margin: '0 0 0.8rem' }}>{actual.ejemplo.es}</p>
            <input
              value={respuesta}
              disabled={veredicto !== null}
              onChange={(e) => setRespuesta(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') comprobar()
              }}
              placeholder="La forma que falta"
              style={campo}
            />
          </>
        )}

        {/* Caja 5 · frase propia */}
        {modo === 5 && (
          <>
            <p style={{ margin: '0 0 0.3rem', fontSize: '1.05rem' }}>
              Escribe una frase tuya con <strong style={{ color: COLOR }}>{actual.lemma}</strong>.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', margin: '0 0 0.8rem' }}>
              Puedes arrancar con una de las combinaciones de la ficha —{' '}
              <em>{'colocaciones' in actual.extra ? actual.extra.colocaciones[0].chunk : actual.lemma}</em>
              {' '}— y añadirle algo tuyo. Copiarla tal cual no cuenta.
            </p>
            <textarea
              value={respuesta}
              disabled={veredicto !== null}
              onChange={(e) => setRespuesta(e.target.value)}
              rows={3}
              placeholder="Tu frase"
              style={{ ...campo, resize: 'vertical' }}
            />
          </>
        )}

        {/* Acción */}
        <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {veredicto === null && modo !== 1 && (
            <button
              onClick={() => comprobar()}
              disabled={respuesta.trim().length === 0}
              style={{ ...botonPrimario, opacity: respuesta.trim().length === 0 ? 0.45 : 1 }}
            >
              Comprobar
            </button>
          )}

          {veredicto && (
            <>
              <span style={{ fontWeight: 700, color: veredicto === 'acierto' ? COLOR : 'var(--muted)' }}>
                {/*
                  La caja 5 dice «Guardada», no «Dominada».
                  El motor comprueba que la frase esté en inglés, que use esa palabra y que
                  sea una frase. No comprueba —ni puede— que la gramática esté bien. Decir
                  «Dominada» ahí era prometer una corrección que no existe: la auditoría de
                  usuario entró «I like eat very much» y salió aprobado con honores.
                */}
                {veredicto === 'acierto'
                  ? modo === 5
                    ? '✓ Guardada'
                    : `✓ Sube a la caja ${modo + 1}`
                  : modo === 5
                    ? '✗ Todavía no'
                    : `✗ Era «${esperado}» — vuelve a la caja 1`}
              </span>
              <button onClick={siguiente} style={botonPrimario}>
                {veredicto === 'acierto' ? 'Siguiente' : 'Reintentar'}
              </button>
            </>
          )}

          <button onClick={onSalir} style={{ ...botonSecundario, marginLeft: 'auto' }}>Salir</button>
        </div>

        {/* Qué faltó, dicho en concreto. «Incorrecto» no enseña nada. */}
        {veredicto && (detalle.length > 0 || chunkUsado) && (
          <div style={{ marginTop: '0.7rem', fontSize: '0.86rem', display: 'grid', gap: '0.25rem' }}>
            {detalle.map((d) => (
              <p key={d} style={{ margin: 0, color: 'var(--muted)' }}>· {d}</p>
            ))}
            {chunkUsado && (
              <p style={{ margin: 0, color: COLOR }}>
                ✓ Usaste la combinación «{chunkUsado}». Eso es exactamente lo que se busca.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Cierre de unidad: dictado y escritura reforzada ──────────────────────────

/**
 * El día 6 de la semana tipo (metodología §4), construido.
 *
 * La escalera de cajas termina dentro de la ficha, y ahí el estudiante ha reconocido,
 * producido y usado la palabra en la frase de otro. Falta la parte que de verdad activa el
 * vocabulario: oírlo sin verlo, y escribir algo propio. Sin este cierre, la unidad enseña a
 * responder preguntas sobre palabras, no a usarlas.
 */
function Dictado({ frases, locale, onHecho }: { frases: VocabEntry[]; locale: string; onHecho: () => void }) {
  const [i, setI] = useState(0)
  const [texto, setTexto] = useState('')
  const [corregido, setCorregido] = useState(false)

  const actual = frases[i]
  const { esperadas, acertadas, falladas } = corregirDictado(actual.ejemplo.target, texto)
  const fallo = new Set(falladas)

  function avanzar() {
    if (i + 1 >= frases.length) return onHecho()
    setI(i + 1)
    setTexto('')
    setCorregido(false)
  }

  return (
    <div style={{ border: '1px solid var(--line-soft)', borderRadius: 'var(--wlp-r)', padding: '1.3rem', background: 'var(--bg)' }}>
      <p style={{ margin: '0 0 0.9rem', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: COLOR }}>
        DICTADO {i + 1} DE {frases.length} · Óyela y escríbela
      </p>
      <p style={{ margin: '0 0 0.9rem', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        Es el único ejercicio que va del sonido a la letra. Sirve para lo que ninguna tarjeta
        arregla: reconocer la palabra cuando alguien la dice.
      </p>

      <button onClick={() => decir(actual, 'ejemplo', locale)} style={{ ...botonSecundario, marginBottom: '0.8rem' }}>
        🔊 Escuchar
      </button>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={2}
        placeholder="Escribe lo que oyes"
        style={{ ...campo, resize: 'vertical' }}
      />

      {corregido && (
        <div style={{ marginTop: '0.8rem', display: 'grid', gap: '0.35rem' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
            {esperadas.map((p: string, k: number) => (
              <span
                key={`${p}-${k}`}
                style={{
                  color: fallo.has(p) ? 'var(--muted)' : COLOR,
                  textDecoration: fallo.has(p) ? 'underline' : 'none',
                  textDecorationStyle: 'dotted',
                  marginRight: '0.32rem',
                }}
              >
                {p}
              </span>
            ))}
          </p>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)' }}>
            {acertadas} de {esperadas.length} palabras. Las punteadas son las que se te escaparon.
          </p>
          <p style={{ margin: 0, fontSize: '0.84rem' }}>{actual.ejemplo.target}</p>
        </div>
      )}

      <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem' }}>
        {!corregido ? (
          <button onClick={() => setCorregido(true)} disabled={!texto.trim()} style={{ ...botonPrimario, opacity: texto.trim() ? 1 : 0.45 }}>
            Corregir
          </button>
        ) : (
          <button onClick={avanzar} style={botonPrimario}>
            {i + 1 >= frases.length ? 'A la escritura →' : 'Siguiente frase'}
          </button>
        )}
      </div>
    </div>
  )
}

function EscrituraReforzada({ entradas, onSalir }: { entradas: VocabEntry[]; onSalir: () => void }) {
  const [texto, setTexto] = useState('')

  const { usadas, frases, listo } = progresoEscritura(texto, entradas)

  return (
    <div style={{ border: '1px solid var(--line-soft)', borderRadius: 'var(--wlp-r)', padding: '1.3rem', background: 'var(--bg)' }}>
      <p style={{ margin: '0 0 0.5rem', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: COLOR }}>
        ESCRITURA · Cierre de la unidad
      </p>
      <p style={{ margin: '0 0 0.9rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
        Escribe <strong>{MIN_FRASES} frases sobre ti y tu gente</strong> usando al menos{' '}
        <strong>{MIN_PALABRAS_USADAS} palabras</strong> de esta unidad.
      </p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={7}
        placeholder="My name is… My father is a…"
        style={{ ...campo, resize: 'vertical' }}
      />

      {/* La lista se marca sola mientras escribe: el estudiante ve el progreso, no lo adivina */}
      <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
        {entradas.map((e) => {
          const hecha = usadas.includes(e)
          return (
            <span
              key={e.id}
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--mono)',
                padding: '0.16rem 0.42rem',
                borderRadius: 'var(--wlp-r)',
                border: `1px solid ${hecha ? COLOR : 'var(--line-soft)'}`,
                background: hecha ? `${COLORMix(7.8)}` : 'transparent',
                color: hecha ? COLOR : 'var(--muted)',
              }}
            >
              {hecha ? '✓ ' : ''}{e.lemma}
            </span>
          )
        })}
      </div>

      {/*
        Se cuenta lo que se puede contar, y no se promete lo que no.
        Antes decía «Esto es lo que un examinador llama riqueza lexical» ante cinco frases
        que el motor no había leído: la auditoría de usuario cerró la unidad con «I like
        food. I like eat. I like drink.» —el mismo error de gramática cinco veces— y se
        llevó la felicitación. Un elogio falso fosiliza el error; es peor que un suspenso.
      */}
      <p style={{ margin: '0.8rem 0 0', fontSize: '0.86rem', color: listo ? COLOR : 'var(--muted)' }}>
        {usadas.length}/{MIN_PALABRAS_USADAS} palabras · {frases}/{MIN_FRASES} frases
        {listo && ' — unidad cerrada.'}
      </p>
      {listo && (
        <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
          Contamos las palabras que usaste y cuántas frases escribiste. La gramática no la
          revisa nadie aquí todavía: guárdalas y llévalas a tu clase.
        </p>
      )}

      <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={onSalir} style={listo ? botonPrimario : botonSecundario}>
          {listo ? 'Terminar unidad' : 'Volver a las fichas'}
        </button>
      </div>
    </div>
  )
}

function CierreDeUnidad({ entradas, locale, onSalir }: { entradas: VocabEntry[]; locale: string; onSalir: () => void }) {
  const conAudio = hayVoz()
  const [paso, setPaso] = useState<'dictado' | 'escritura'>(conAudio ? 'dictado' : 'escritura')

  // Tres frases distintas, prefiriendo las que se oyen de verdad en las lecciones.
  const frases = useMemo(() => {
    const vistas = new Set<string>()
    const pool = [...entradas].sort(
      (a, b) => Number(b.ejemplo.fuente.tipo === 'corpus') - Number(a.ejemplo.fuente.tipo === 'corpus'),
    )
    return pool.filter((e) => !vistas.has(e.ejemplo.target) && vistas.add(e.ejemplo.target)).slice(0, 3)
  }, [entradas])

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div>
        <h3 style={{ margin: '0 0 0.3rem' }}>Las {entradas.length} llegaron a la caja 5</h3>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
          Hoy las has recorrido de una sentada. Cuando haya cuenta, volverán repartidas a lo
          largo de mes y medio, que es como se quedan. Ahora cierra la unidad: oírlas sin
          verlas y escribir algo tuyo es lo que las vuelve activas.
        </p>
      </div>

      {paso === 'dictado' && conAudio ? (
        <Dictado frases={frases} locale={locale} onHecho={() => setPaso('escritura')} />
      ) : (
        <EscrituraReforzada entradas={entradas} onSalir={onSalir} />
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function VocabularyJourney({ bloque, nivel, idiomaLabel, nivelLabel, locale }: Props) {
  const [unidadEnEstudio, setUnidadEnEstudio] = useState<number | null>(null)
  const { cajas, guardar, olvidar, listo } = useVocabProgress(nivel.lang, nivel.nivel, bloque.id, bloque.entradas)

  /**
   * El reparto sale de `unidadesDe`, no de un troceado escrito aquí.
   *
   * Aquí había una cuarta copia de «de diez en diez» —después de la del registro y la del
   * script de audio— y era la que de verdad pintaba la pantalla. Por eso arreglar el reparto
   * en `unidades.ts` no cambió nada visible: los bloques de 31 entradas seguían mostrando una
   * cuarta unidad con una sola palabra. Es el mismo patrón que el barajado dentro del JSX, la
   * cuarta vez que aparece en este motor.
   */
  const unidades = useMemo(() => unidadesDe(bloque), [bloque])

  const delCorpus = bloque.entradas.filter((e) => e.ejemplo.fuente.tipo === 'corpus').length

  if (unidadEnEstudio !== null) {
    return (
      <section style={{ display: 'grid', gap: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>
          Unidad {unidadEnEstudio + 1} · {unidades[unidadEnEstudio].length} palabras
        </h2>
        <Sesion
          entradas={unidades[unidadEnEstudio]}
          locale={locale}
          cajas={cajas}
          guardar={guardar}
          onSalir={() => setUnidadEnEstudio(null)}
        />
      </section>
    )
  }

  return (
    <section style={{ display: 'grid', gap: '1.6rem' }}>
      {/* Descarga: la lista completa del nivel, no solo la de este bloque */}
      {canRenderPdf(nivel.lang) && (
        <div className="topic-download no-print" style={{ margin: 0 }}>
          <PdfDownloadButton
            label={`Descargar el vocabulario de ${idiomaLabel} ${nivelLabel} en PDF`}
            generate={async () => {
              const { generateVocabularyPdf } = await import('@/lib/pdf/generateVocabularyPdf')
              await generateVocabularyPdf(nivel)
            }}
          />
          <span>Todas las palabras del nivel, por bloques, con su ejemplo y lo que hay que saber de cada una.</span>
        </div>
      )}

      {/* Cómo funciona: la escalera, explicada antes de empezar */}
      <div
        style={{
          border: '1px solid var(--line-soft)',
          borderRadius: 'var(--wlp-r)',
          padding: '1.1rem 1.2rem',
          background: 'var(--bg-2)',
        }}
      >
        <p style={{ margin: '0 0 0.7rem', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: COLOR }}>
          CÓMO SE ESTUDIA
        </p>
        <p style={{ margin: '0 0 0.8rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Cada palabra sube una escalera de cinco peldaños. No se repite la misma pregunta:
          <strong> la pregunta se endurece</strong> a medida que la palabra sube. Solo se da por
          dominada cuando la usas en una frase tuya.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.1rem', display: 'grid', gap: '0.28rem' }}>
          {CAJAS.map((c) => (
            <li key={c.n} style={{ fontSize: '0.86rem' }}>
              <strong>{c.nombre}</strong>
              <span style={{ color: 'var(--muted)' }}> — {c.pide}</span>
            </li>
          ))}
        </ol>
        <p style={{ margin: '0.8rem 0 0', fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          Y al final de cada unidad, el cierre: <strong style={{ color: 'var(--ink)' }}>un dictado</strong> —
          oír las frases sin verlas— y <strong style={{ color: 'var(--ink)' }}>cinco frases tuyas</strong> con
          las palabras de la unidad. Es la parte que convierte reconocer en hablar.
        </p>
      </div>

      {/* Unidades */}
      {unidades.map((unidad, i) => (
        <div key={i} style={{ display: 'grid', gap: '0.7rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.05rem' }}>Unidad {i + 1}</h2>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'var(--muted)' }}>
              {unidad.length} palabras · un día de estudio
            </span>
            {/*
              Lo que se guardó, dicho antes de entrar.
              `listo` evita prometer «retomas» en el primer render, cuando todavía no se ha
              leído el navegador: enseñar «0 dominadas» y corregirlo un instante después es
              peor que no decir nada.
            */}
            {listo && (() => {
              const r = resumen(cajas, unidad)
              if (!r.hayQueRetomar) return null
              return (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: COLOR }}>
                  {r.dominadas > 0 && `${r.dominadas} dominada${r.dominadas === 1 ? '' : 's'}`}
                  {r.dominadas > 0 && r.empezadas > 0 && ' · '}
                  {r.empezadas > 0 && `${r.empezadas} a medias`}
                </span>
              )
            })()}
            <button onClick={() => setUnidadEnEstudio(i)} style={{ ...botonPrimario, marginLeft: 'auto' }}>
              {listo && resumen(cajas, unidad).hayQueRetomar ? 'Retomar esta unidad →' : 'Estudiar esta unidad →'}
            </button>
          </div>
          <div style={{ display: 'grid', gap: '0.7rem', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))' }}>
            {unidad.map((entrada) => <Ficha key={entrada.id} entrada={entrada} locale={locale} />)}
          </div>
        </div>
      ))}

      {/* Procedencia — honestidad sobre de dónde sale el material */}
      <footer
        style={{
          borderTop: '1px solid var(--line-soft)',
          paddingTop: '0.9rem',
          fontSize: '0.82rem',
          color: 'var(--muted)',
          lineHeight: 1.6,
        }}
      >
        <p style={{ margin: '0 0 0.4rem' }}>
          <strong style={{ color: 'var(--ink)' }}>De dónde sale este vocabulario.</strong>{' '}
          Lista base: {nivel.listaBase.fuente}
          {nivel.listaBase.url && (
            <>
              {' '}(<a href={nivel.listaBase.url} rel="nofollow noopener" target="_blank" style={{ color: COLOR }}>fuente</a>)
            </>
          )}.
        </p>
        <p style={{ margin: 0 }}>
          {delCorpus} de las {bloque.entradas.length} frases de ejemplo están tomadas literalmente de
          las lecciones de escucha de {idiomaLabel} {nivelLabel}, no inventadas. Las marcadas con
          <span style={{ fontFamily: 'var(--mono)' }}> ✎ redactado </span>
          son palabras que el nivel necesita y que las lecciones todavía no dicen.
        </p>
        {/*
          Dónde se guarda y cómo se borra, dicho sin rodeos.
          Guardar en el navegador y no decirlo tiene dos maneras de salir mal: quien estudia
          en el locutorio cree que su progreso le sigue, y quien quiere repasar desde cero no
          encuentra cómo. Las dos se arreglan con este párrafo y un botón.
        */}
        {listo && resumen(cajas, bloque.entradas).hayQueRetomar && (
          <p style={{ margin: 0 }}>
            Tu avance se guarda <strong>en este navegador</strong>, así que sobrevive a cerrar la
            pestaña pero no te sigue a otro dispositivo. Cuando haya cuentas, sí.{' '}
            <button
              onClick={() => {
                if (confirm('Se borra tu avance de este bloque y todas las palabras vuelven a la caja 1. ¿Seguimos?')) olvidar()
              }}
              style={{
                appearance: 'none', border: 'none', background: 'none', padding: 0,
                font: 'inherit', color: COLOR, textDecoration: 'underline', cursor: 'pointer',
              }}
            >
              Empezar este bloque de cero
            </button>
            .
          </p>
        )}
      </footer>
    </section>
  )
}

// ─── Estilos compartidos ──────────────────────────────────────────────────────

const botonPrimario: React.CSSProperties = {
  border: `1px solid ${COLOR}`,
  background: COLOR,
  color: '#fff',
  borderRadius: 'var(--wlp-r)',
  padding: '0.5rem 0.95rem',
  fontSize: '0.86rem',
  fontWeight: 700,
  fontFamily: 'inherit',
  cursor: 'pointer',
}

const botonSecundario: React.CSSProperties = {
  border: '1px solid var(--line-soft)',
  background: 'var(--bg)',
  color: 'var(--ink)',
  borderRadius: 'var(--wlp-r)',
  padding: '0.5rem 0.95rem',
  fontSize: '0.86rem',
  fontFamily: 'inherit',
  cursor: 'pointer',
}

const botonOpcion: React.CSSProperties = {
  border: '1px solid var(--line-soft)',
  borderRadius: 'var(--wlp-r)',
  padding: '0.65rem 0.9rem',
  fontSize: '0.94rem',
  fontFamily: 'inherit',
  color: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
}

const campo: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--line-soft)',
  borderRadius: 'var(--wlp-r)',
  padding: '0.6rem 0.8rem',
  fontSize: '1rem',
  fontFamily: 'inherit',
  background: 'var(--bg)',
  color: 'inherit',
}
