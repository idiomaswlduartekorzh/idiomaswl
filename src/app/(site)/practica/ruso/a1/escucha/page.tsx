import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_RUSO_A1 } from '@/data/practica/ruso-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ruso',
  level: 'a1',
  languageLabel: 'Ruso',
  skillLabel: 'Аудирование',
  seriesTitle: 'Красный шарф в метро',
  seriesTitleEs: 'La bufanda roja en el metro',
  premise: 'Sofía encuentra en el metro de Moscú una bufanda roja con un broche en forma de luna y busca a su dueña por la ciudad',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaRusoA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_RUSO_A1}
            level="A1"
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
