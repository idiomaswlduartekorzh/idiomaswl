import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { ASCOLTO_A1 } from '@/data/practica/italiano-a1-ascolto'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'italiano',
  level: 'a1',
  languageLabel: 'Italiano',
  skillLabel: 'Ascolto',
  seriesTitle: 'Il primo mese a Bologna',
  seriesTitleEs: 'El primer mes en Bolonia',
  premise:
    'Valeria llega a Bolonia a estudiar arquitectura y durante un mes va a todas partes andando: a la facultad, a la panadería de Bruno, a la sastrería de la señora Lucia; conoce el barrio a pie antes de conocerlo en bici',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaItalianoA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={ASCOLTO_A1}
            level="A1"
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
