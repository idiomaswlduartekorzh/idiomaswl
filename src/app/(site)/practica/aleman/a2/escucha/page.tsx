import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_ALEMAN_A2 } from '@/data/practica/aleman-a2-listening'

export const metadata: Metadata = {
  title: 'Escucha Alemán A2: Emma in Berlin | Idiomas WeLearn',
  description: '20 monólogos A2 en alemán con audio real, vocabulario, transcripción bilingüe y preguntas de comprensión. Sigue la historia de Emma en Berlín.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/a2/escucha' },
}

export default function EscuchaAlemanA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 1180 }}>
        <ListeningJourney
          exercises={LISTENING_ALEMAN_A2}
          level="A2"
          audioBasePath="/audio/aleman/a2"
          backHref="/practica/aleman/a2"
          progressKey="wl-listening-aleman-a2-progress"
          seriesTitle="Emma in Berlin"
          seriesDescription="Temporada A2 · 20 episodios de Emma mientras se adapta a la vida en Berlín, entre la escuela, el café y la visita de su abuela."
          speechLang="de-DE"
        />
      </div>
    </section>
  )
}
