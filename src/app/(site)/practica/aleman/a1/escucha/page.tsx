import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_ALEMAN_A1 } from '@/data/practica/aleman-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'aleman',
  level: 'a1',
  languageLabel: 'Alemán',
  skillLabel: 'Hörverstehen',
  seriesTitle: 'Ein Zimmer in Berlin',
  seriesTitleEs: 'Una habitación en Berlín',
  premise:
    'Emma llega a Berlín con catorce cajas y ni una palabra de alemán que le salga sola; en un año aprende a moverse en metro, a discutir la lista de la compra y a abrir un café a las ocho de la mañana',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaAlemanA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_ALEMAN_A1}
            level="A1"
            languageLabel="Alemán"
            skillLabel="Hörverstehen"
            speechLang="de-DE"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
