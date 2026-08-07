import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_COREANO_A2 } from '@/data/practica/coreano-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'coreano',
  level: 'a2',
  languageLabel: 'Coreano',
  skillLabel: '듣기',
  seriesTitle: '별 카페의 손편지',
  seriesTitleEs: 'Las cartas del Café Estrella',
  premise: 'Dos meses después del paraguas amarillo, Sofía recibe una carta escrita a mano sin firma y sigue la pista de quien la dejó',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaCoreanoA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_COREANO_A2}
            level="A2"
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
