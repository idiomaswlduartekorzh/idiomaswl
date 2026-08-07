import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_B1_ALL } from '@/data/practica/ingles-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'ingles',
  level: 'b1',
  languageLabel: 'Inglés',
  skillLabel: 'Listening',
  seriesTitle: 'The Door Stays Open',
  seriesTitleEs: 'La puerta sigue abierta',
  premise:
    'Un viernes de lluvia aparece un sobre en la puerta del café: el edificio entero está en venta, y Maya tiene una semana para presentar una oferta que no puede pagar, con cuatrocientas firmas, un bote de monedas y una biblioteca de aliada',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaInglesB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_B1_ALL}
            level="B1"
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
