import type { ClockExample, ClockTime } from '@/data/grammar/types'
import styles from './GermanClockVisuals.module.css'

function point(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return { x: 100 + Math.cos(radians) * radius, y: 100 + Math.sin(radians) * radius }
}

function handDescription({ hour, minute }: ClockTime) {
  const currentHour = hour % 12 || 12
  const nextHour = currentHour % 12 + 1
  const shortHand = minute === 0
    ? `La aguja corta apunta al ${currentHour}`
    : `La aguja corta está entre el ${currentHour} y el ${nextHour}`
  const minuteMark = minute / 5
  const longHand = Number.isInteger(minuteMark)
    ? `la aguja larga apunta al ${minuteMark || 12}`
    : `la aguja larga está entre las marcas del ${Math.floor(minuteMark) || 12} y el ${Math.ceil(minuteMark)}`
  return `${shortHand}; ${longHand}.`
}

export function GermanClockFace({ clock, className = '' }: { clock: ClockTime; className?: string }) {
  const hourEnd = point(((clock.hour % 12) + clock.minute / 60) * 30, 48)
  const minuteEnd = point(clock.minute * 6, 68)

  return <svg
    className={`${styles.face} ${className}`.trim()}
    viewBox="0 0 200 200"
    role="img"
    aria-label={`Reloj analógico. ${handDescription(clock)}`}
  >
    <circle className={styles.rim} cx="100" cy="100" r="94" />
    <circle className={styles.dial} cx="100" cy="100" r="86" />
    {Array.from({ length: 60 }, (_, i) => {
      const start = point(i * 6, i % 5 === 0 ? 73 : 78)
      const end = point(i * 6, 83)
      return <line key={i} className={i % 5 === 0 ? styles.majorTick : styles.minorTick} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
    })}
    {Array.from({ length: 12 }, (_, i) => {
      const numeral = i + 1
      const position = point(numeral * 30, 60)
      return <text key={numeral} className={styles.numeral} x={position.x} y={position.y} textAnchor="middle" dominantBaseline="central">{numeral}</text>
    })}
    <line className={styles.hourHand} x1="100" y1="100" x2={hourEnd.x} y2={hourEnd.y} />
    <line className={styles.minuteHand} x1="100" y1="100" x2={minuteEnd.x} y2={minuteEnd.y} />
    <circle className={styles.pin} cx="100" cy="100" r="5" />
  </svg>
}

export function GermanClockGallery({ examples }: { examples: ClockExample[] }) {
  return <div className={styles.gallery} aria-label="Relojes de ejemplo">
    <p className={styles.legend}><span className={styles.hourKey} /> Aguja corta: hora <span className={styles.minuteKey} /> Aguja larga: minutos</p>
    <div className={styles.grid}>
      {examples.map((example) => <figure key={example.digital} className={styles.card}>
        <GermanClockFace clock={example} />
        <figcaption>
          <span className={styles.digital}>{example.digital}</span>
          <strong lang="de">{example.spoken}</strong>
          <span>{example.meaning}</span>
          <small>{example.note}</small>
        </figcaption>
      </figure>)}
    </div>
    <p className={styles.analogNote}>Un reloj de manecillas no distingue mañana y tarde. El contexto o una forma como <em>14 Uhr</em> aclara esa diferencia.</p>
  </div>
}
