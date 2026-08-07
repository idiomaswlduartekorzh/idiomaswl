import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_ITALIANO_B1 } from '@/data/practica/italiano-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'italiano',
  level: 'b1',
  languageLabel: 'Italiano',
  skillLabel: 'Ascolto',
  seriesTitle: 'Le chiavi della sartoria',
  seriesTitleEs: 'Las llaves de la sastrería',
  premise:
    'Valeria vuelve a Bolonia con las llaves de la sastrería cerrada en el bolsillo y una idea, un taller de bicicletas, que una inmobiliaria y medio barrio le van a discutir',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaItalianoB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_ITALIANO_B1}
            level="B1"
            languageLabel="Italiano"
            skillLabel="Ascolto"
            speechLang="it-IT"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
