import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_ALEMAN_A2 } from '@/data/practica/aleman-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'aleman',
  level: 'a2',
  languageLabel: 'Alemán',
  skillLabel: 'Hörverstehen',
  seriesTitle: 'Der Schlüssel zum Café',
  seriesTitleEs: 'La llave del café',
  premise:
    'Segundo año de Emma en Berlín: un mercadillo, una abuela que llegó a la ciudad en 1961 y un café del barrio en el que entra primero como clienta y acaba con un turno fijo',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaAlemanA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_ALEMAN_A2}
            level="A2"
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
