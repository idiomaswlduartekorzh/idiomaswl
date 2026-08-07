import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_FRANCES_A2 } from '@/data/practica/frances-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'frances',
  level: 'a2',
  languageLabel: 'Francés',
  skillLabel: 'Compréhension orale',
  seriesTitle: 'La moitié de la recette',
  seriesTitleEs: 'La mitad de la receta',
  premise: 'Un año después, Léa encuentra media receta antigua dentro del cuaderno rojo y el barrio entero busca la otra mitad',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaFrancesA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_FRANCES_A2}
            level="A2"
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
