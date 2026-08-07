import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_FRANCES_B1 } from '@/data/practica/frances-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'frances',
  level: 'b1',
  languageLabel: 'Francés',
  skillLabel: 'Compréhension orale',
  seriesTitle: 'La relève',
  seriesTitleEs: 'El relevo',
  premise:
    'La panadería cierra el 31 de diciembre: un grupo de París paga al contado, Hugo quiere el obrador y no tiene el dinero, y Léa calla una oferta de trabajo en Marsella',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaFrancesB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_FRANCES_B1}
            level="B1"
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
