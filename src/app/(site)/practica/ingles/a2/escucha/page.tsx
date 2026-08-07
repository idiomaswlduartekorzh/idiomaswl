import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_A2_ALL } from '@/data/practica/ingles-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ingles',
  level: 'a2',
  languageLabel: 'Inglés',
  skillLabel: 'Listening',
  seriesTitle: 'Sam’s Corner',
  seriesTitleEs: 'La esquina de Sam',
  premise:
    'Maya alquila el local donde su abuelo tuvo una panadería y, sin dinero pero con veinte libros prestados de la biblioteca, monta un café de barrio; del día de la firma al día en que el sitio se sostiene solo',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaInglesA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_A2_ALL}
            level="A2"
            languageLabel="Inglés"
            skillLabel="Listening"
            speechLang="en-US"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
