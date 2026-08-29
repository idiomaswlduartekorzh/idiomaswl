'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ListeningUi } from '@/data/practica/listening-ui'

/**
 * Reproductor de los ejercicios de escucha.
 *
 * Vive en su propio componente por una razón de rendimiento, no de orden: el tiempo del
 * audio cambia unas cuatro veces por segundo, y mientras ese estado estuvo en
 * ListeningJourney cada aviso repintaba también el catálogo de veinte episodios, las siete
 * fases y la transcripción entera. En un portátil modesto eso es lo que se siente como que
 * el reproductor «se congela»: la pestaña está ocupada repintando lo que no ha cambiado.
 *
 * Aquí dentro, el tic solo repinta la barra y el contador. Hacia fuera solo sale un aviso
 * cuando cambia la LÍNEA que se está oyendo —diez o doce veces por episodio, no ciento
 * cincuenta—, que es lo único que el resto de la página necesita saber.
 */

export type PlayerLine = { chars: number }

function formatTime(seconds: number) {
  const total = Math.max(0, Math.round(seconds))
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

export default function ListeningPlayer({
  src,
  fallbackDuration,
  lines,
  onFirstPlay,
  onLineChange,
  label,
  ui,
}: {
  src: string
  /** Duración declarada en la serie. Solo se usa hasta que el navegador lee la real. */
  fallbackDuration: number
  /** Longitud en caracteres de cada turno, para repartir el tiempo entre líneas. */
  lines: PlayerLine[]
  onFirstPlay: () => void
  onLineChange: (index: number) => void
  label: string
  ui: ListeningUi
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(fallbackDuration)
  const [rate, setRate] = useState(1)
  const [failed, setFailed] = useState(false)
  const lastLine = useRef(-1)

  /**
   * Reparto del tiempo entre líneas, proporcional a lo que ocupa cada turno.
   *
   * Antes se dividía la duración en tramos iguales, y con turnos de longitud muy distinta
   * —«¿Sí?» y una réplica de treinta palabras valían lo mismo— el resaltado iba por detrás
   * o por delante de la voz. Repartir por caracteres no es una alineación real, pero sigue
   * al hablante lo bastante para que la fase de escucha guiada sirva.
   */
  const cortes = useMemo(() => {
    const total = lines.reduce((sum, line) => sum + line.chars, 0)
    if (!total) return []
    const marcas: number[] = []
    let acumulado = 0
    for (const line of lines) {
      acumulado += line.chars
      marcas.push(acumulado / total)
    }
    return marcas
  }, [lines])

  const lineaEn = useCallback(
    (time: number) => {
      if (!cortes.length || !duration) return -1
      const proporcion = time / duration
      const index = cortes.findIndex((corte) => proporcion < corte)
      return index === -1 ? cortes.length - 1 : index
    },
    [cortes, duration],
  )

  // Al cambiar de ejercicio el audio vuelve al principio y el resaltado se apaga.
  useEffect(() => {
    setPlaying(false)
    setCurrent(0)
    setFailed(false)
    setDuration(fallbackDuration)
    lastLine.current = -1
  }, [src, fallbackDuration])

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate])

  function handleTime(time: number) {
    setCurrent(time)
    const linea = lineaEn(time)
    // El resto de la página solo se entera cuando cambia la línea, no en cada tic.
    if (linea !== lastLine.current) {
      lastLine.current = linea
      onLineChange(linea)
    }
  }

  function toggle() {
    const audio = audioRef.current
    if (!audio || failed) return
    if (audio.paused) {
      void audio.play().catch(() => setFailed(true))
    } else {
      audio.pause()
    }
  }

  function seek(fraction: number) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const time = Math.min(duration, Math.max(0, fraction * duration))
    audio.currentTime = time
    handleTime(time)
  }

  const progreso = duration ? Math.min(100, (current / duration) * 100) : 0

  if (failed) {
    return (
      <div className="listen-player listen-player--error" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>{ui.audioError}</p>
      </div>
    )
  }

  return (
    <div className="listen-player">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const real = event.currentTarget.duration
          if (Number.isFinite(real) && real > 0) setDuration(real)
          event.currentTarget.playbackRate = rate
        }}
        onPlay={() => { setPlaying(true); onFirstPlay() }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); lastLine.current = -1; onLineChange(-1) }}
        onError={() => setFailed(true)}
        onTimeUpdate={(event) => handleTime(event.currentTarget.currentTime)}
      />

      <button
        className="listen-play"
        type="button"
        onClick={toggle}
        aria-label={playing ? `${ui.pause} ${label}` : `${ui.play} ${label}`}
      >
        <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        {playing ? ui.pause : current > 0 ? ui.resume : ui.play}
      </button>

      <button
        className="listen-rewind"
        type="button"
        onClick={() => seek((current - 5) / (duration || 1))}
        aria-label={ui.rewind}
      >
        ↺ 5 s
      </button>

      {/*
        La barra es un slider de verdad y no un div de adorno: se puede arrastrar, se puede
        mover con las flechas y un lector de pantalla dice en qué segundo va. Antes solo se
        pintaba, así que para repetir una frase había que volver a empezar el audio entero.
      */}
      <input
        className="listen-timeline"
        type="range"
        min={0}
        max={1000}
        value={Math.round(progreso * 10)}
        onChange={(event) => seek(Number(event.currentTarget.value) / 1000)}
        style={{ ['--progreso' as string]: `${progreso}%` }}
        aria-label={ui.audioPosition}
        aria-valuetext={`${formatTime(current)} de ${formatTime(duration)}`}
      />

      <small className="listen-time">{formatTime(current)} / {formatTime(duration)}</small>

      {/*
        Media velocidad no, que deforma las vocales y enseña a oír algo que nadie dice.
        0,75 es el escalón que usan los exámenes cuando ralentizan sin distorsionar.
      */}
      <button
        className={`listen-rate${rate !== 1 ? ' is-on' : ''}`}
        type="button"
        onClick={() => setRate((value) => (value === 1 ? 0.75 : 1))}
        aria-pressed={rate !== 1}
        title={ui.speed}
      >
        {rate === 1 ? '1×' : '0,75×'}
      </button>
    </div>
  )
}
