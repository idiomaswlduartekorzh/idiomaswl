import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_JAPONES_B1 } from '@/data/practica/japones-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'japones',
  level: 'b1',
  languageLabel: 'Japonés',
  skillLabel: '聞く',
  seriesTitle: '二十二年目の広場',
  seriesTitleEs: 'La plaza del vigesimosegundo año',
  premise:
    'Ana hace prácticas en turismo del ayuntamiento y el pueblo se divide sobre dónde celebrar la fiesta del gato; el periódico publica su propuesta cambiada y Yuki Tanaka deja de hablarle',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaJaponesB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_JAPONES_B1}
            level="B1"
            languageLabel="Japonés"
            skillLabel="聞く (Kiku)"
            speechLang="ja-JP"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
