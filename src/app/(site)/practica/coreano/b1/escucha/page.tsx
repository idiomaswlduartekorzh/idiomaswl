import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_COREANO_B1 } from '@/data/practica/coreano-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'coreano',
  level: 'b1',
  languageLabel: 'Coreano',
  skillLabel: '듣기',
  seriesTitle: '별 카페의 마지막 여름',
  seriesTitleEs: 'El último verano del Café Estrella',
  premise:
    'El casero dobla el alquiler y el Café Estrella cierra en agosto; Jiho quiere salvarlo con un reportaje y Yuna no quiere que el buzón de cartas acabe siendo un escaparate',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaCoreanoB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_COREANO_B1}
            level="B1"
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
