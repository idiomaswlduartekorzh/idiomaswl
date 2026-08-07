import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_JAPONES_A1 } from '@/data/practica/japones-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'japones',
  level: 'a1',
  languageLabel: 'Japonés',
  skillLabel: '聞く',
  seriesTitle: '青い手帳のスタンプ',
  seriesTitleEs: 'Los sellos de la libreta azul',
  premise: 'Ana encuentra una libreta azul en una estación de Tokio y, entre sellos y una foto de un gato, busca a quien la perdió',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaJaponesA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_JAPONES_A1}
            level="A1"
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
