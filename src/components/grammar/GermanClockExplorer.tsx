import { Fragment } from 'react'
import type { ClockExample } from '@/data/grammar/types'
import { GermanClockFace } from './GermanClockVisuals'
import styles from './GermanClockLesson.module.css'

export function GermanClockExplorer({ examples }: { examples: ClockExample[] }) {
  const initial = examples.find((clock) => clock.minute === 30) ?? examples[0]
  return (
    <fieldset className={styles.explorer}>
      <legend className={styles.srOnly}>Elige una hora para ver las agujas y su lectura</legend>
      <div className={styles.selector}>
        <p className={styles.chooseTitle}>Prueba otra hora</p>
        {examples.map((example) => {
          const id = `muestra-${example.hour}-${example.minute}`
          return (
            <Fragment key={example.digital}>
              <input id={id} className={styles.radio} type="radio" name="hora-de-ejemplo"
                defaultChecked={example === initial} aria-controls={`lectura-${id}`} />
              <label htmlFor={id}>{example.digital}</label>
              <div id={`lectura-${id}`} className={styles.demo} role="region" aria-label={`Lectura de las ${example.digital}`}>
                <div className={styles.dial}>
                  <GermanClockFace clock={example} />
                  <span>{example.digital}</span>
                </div>
                <div className={styles.reading}>
                  <h3 lang="de">Es ist {example.spoken}.</h3>
                  <p className={styles.translation}>{example.meaning.startsWith('las ') ? 'Son' : 'Es'} {example.meaning}.</p>
                  <dl className={styles.hands}>
                    <div><dt className={styles.shortHand}>Aguja corta · hora</dt><dd>{example.hourHint}</dd></div>
                    <div><dt className={styles.longHand}>Aguja larga · minutos</dt><dd>{example.minuteHint}</dd></div>
                  </dl>
                  <p className={styles.reason}>{example.note}</p>
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
    </fieldset>
  )
}
