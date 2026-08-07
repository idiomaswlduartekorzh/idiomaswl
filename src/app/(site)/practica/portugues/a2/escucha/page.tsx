import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { QuizSchema } from '@/components/practica/EducationSchema'
import { LISTENING_PORTUGUES_A2 } from '@/data/practica/portugues-a2-listening'
import { listeningCopy } from '@/data/practica/series/page-copy'

const copy = listeningCopy({
  language: 'portugues',
  level: 'a2',
  languageLabel: 'Portugués',
  skillLabel: 'Compreensão oral',
  seriesTitle: 'O muro que perdeu as cores',
  seriesTitleEs: 'El muro que perdió los colores',
  premise: 'Sofía descubre en una foto antigua que el patio del edificio tuvo un mural lleno de color, hoy tapado con pintura blanca',
})

export const metadata: Metadata = copy.metadata

export default function EscuchaPortuguesA2() {
  return (
    <>
      <QuizSchema {...copy.schema} />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={LISTENING_PORTUGUES_A2}
            level="A2"
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
