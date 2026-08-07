import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_RUSO_A2 } from '@/data/practica/ruso-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ruso',
  level: 'a2',
  languageLabel: 'Ruso',
  skillLabel: 'Аудирование',
  seriesTitle: 'Тетрадь студии «Луна»',
  seriesTitleEs: 'El cuaderno del estudio «Luna»',
  premise: 'Sofía encuentra en el teatro un cuaderno del estudio «Luna» y sigue sus anotaciones por Moscú',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaRusoA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_RUSO_A2}
            level="A2"
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
