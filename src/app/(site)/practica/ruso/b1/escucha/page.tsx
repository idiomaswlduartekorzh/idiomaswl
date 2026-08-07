import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_RUSO_B1 } from '@/data/practica/ruso-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ruso',
  level: 'b1',
  languageLabel: 'Ruso',
  skillLabel: 'Аудирование',
  seriesTitle: 'Второй голос',
  seriesTitleEs: 'La segunda voz',
  premise:
    'Una compositora escribe desde Irkutsk diciendo que media obra «Luna» también es suya; Víctor Petróvich recuerda aquel invierno de otra manera y un podcast mal montado convierte la disputa en escándalo',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaRusoB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_RUSO_B1}
            level="B1"
            languageLabel="Ruso"
            skillLabel="Аудирование"
            speechLang="ru-RU"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
