import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_JAPONES_A2 } from '@/data/practica/japones-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'japones',
  level: 'a2',
  languageLabel: 'Japonés',
  skillLabel: '聞く',
  seriesTitle: '二十年目のスタンプ',
  seriesTitleEs: 'El sello del vigésimo año',
  premise: 'Ana vuelve a la estación donde encontró la libreta azul y descubre que un sello lleva veinte años esperando a alguien',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaJaponesA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_JAPONES_A2}
            level="A2"
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
