import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_COREANO_A1 } from '@/data/practica/coreano-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'coreano',
  level: 'a1',
  languageLabel: 'Coreano',
  skillLabel: '듣기',
  seriesTitle: '노란 우산의 주인',
  seriesTitleEs: 'El dueño del paraguas amarillo',
  premise: 'Sofía encuentra un paraguas amarillo en su academia de Seúl y sigue una calcomanía, una foto y un recibo hasta dar con su dueño',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaCoreanoA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_COREANO_A1}
            level="A1"
            languageLabel="Coreano"
            skillLabel="듣기 (Deutgi)"
            speechLang="ko-KR"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
