import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_A1_ALL } from '@/data/practica/ingles-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ingles',
  level: 'a1',
  languageLabel: 'Inglés',
  skillLabel: 'Listening',
  seriesTitle: 'The Corner Shop',
  seriesTitleEs: 'El local de la esquina',
  premise:
    'Maya tiene veinte años, estudia y sirve mesas los sábados; su abuelo tuvo una panadería en esa misma calle y el local lleva dos años vacío, con la pintura tapando las baldosas de 1971',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaInglesA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_A1_ALL}
            level="A1"
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
