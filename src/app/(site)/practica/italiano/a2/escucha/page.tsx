import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_ITALIANO_A2 } from '@/data/practica/italiano-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'italiano',
  level: 'a2',
  languageLabel: 'Italiano',
  skillLabel: 'Ascolto',
  seriesTitle: 'La bicicletta gialla',
  seriesTitleEs: 'La bicicleta amarilla',
  premise: 'Valeria compra una bicicleta amarilla en un mercadillo de Bolonia y, bajo el sillín, encuentra una invitación sin fecha ni dirección',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaItalianoA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_ITALIANO_A2}
            level="A2"
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
