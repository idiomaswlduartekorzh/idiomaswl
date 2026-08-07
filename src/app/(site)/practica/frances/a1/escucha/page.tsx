import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_FRANCES_A1 } from '@/data/practica/frances-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'frances',
  level: 'a1',
  languageLabel: 'Francés',
  skillLabel: 'Compréhension orale',
  seriesTitle: 'Le carnet rouge',
  seriesTitleEs: 'El cuaderno rojo',
  premise: 'Léa llega a Lyon, encuentra un cuaderno rojo y una gata curiosa, y busca a su dueña por el barrio',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaFrancesA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_FRANCES_A1}
            level="A1"
            languageLabel="Francés"
            skillLabel="Compréhension orale"
            speechLang="fr-FR"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
