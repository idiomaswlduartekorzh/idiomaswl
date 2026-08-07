import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_PORTUGUES_B1 } from '@/data/practica/portugues-b1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'portugues',
  level: 'b1',
  languageLabel: 'Portugués',
  skillLabel: 'Compreensão oral',
  seriesTitle: 'Uma proposta para o muro',
  seriesTitleEs: 'Una propuesta para el muro',
  premise:
    'Una productora quiere rodar un anuncio de café frente al mural del patio y pagar por ello; el dinero arreglaría el tejado, pero nadie le ha preguntado nada a la autora del mural',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaPortuguesB1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_PORTUGUES_B1}
            level="B1"
            languageLabel="Portugués"
            skillLabel="Compreensão oral"
            speechLang="pt-BR"
            audioMode={copy.ready ? 'mp3' : 'navegador'}
            {...copy.journal}
          />
        </div>
      </section>
    </>
  )
}
