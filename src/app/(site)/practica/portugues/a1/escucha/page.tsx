import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_PORTUGUES_A1 } from '@/data/practica/portugues-a1-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'portugues',
  level: 'a1',
  languageLabel: 'Portugués',
  skillLabel: 'Compreensão oral',
  seriesTitle: 'O áudio no grupo errado',
  seriesTitleEs: 'El audio en el grupo equivocado',
  premise: 'Sofía llega a São Paulo y un audio enviado al grupo equivocado destapa un pequeño misterio en su edificio',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaPortuguesA1() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_PORTUGUES_A1}
            level="A1"
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
