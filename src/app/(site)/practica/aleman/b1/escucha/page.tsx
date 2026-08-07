import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_ALEMAN_B1 } from '@/data/practica/aleman-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'aleman',
  level: 'b1',
  languageLabel: 'Alemán',
  skillLabel: 'Hörverstehen',
  seriesTitle: 'Der Brief ohne Absender',
  seriesTitleEs: 'La carta sin remitente',
  premise:
    'Alguien desliza una carta sin remitente bajo la puerta del café donde trabaja Emma: un café ambulante que ya no existe, un centro juvenil cerrado y dos socios que llevan treinta años sin hablarse',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaAlemanB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_ALEMAN_B1}
            level="B1"
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
