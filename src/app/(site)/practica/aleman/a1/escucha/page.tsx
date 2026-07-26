import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_ALEMAN_A1 } from '@/data/practica/aleman-a1-listening'

export const metadata: Metadata = {
  title: 'Escucha Alemán A1: Emma in Berlin | Idiomas WeLearn',
  description: '20 monólogos A1 en alemán con audio real, vocabulario, transcripción bilingüe y preguntas de comprensión. Empieza la historia de Emma en Berlín.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/a1/escucha' },
}

export default function EscuchaAlemanA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 1180 }}>
        <ListeningJourney
          exercises={LISTENING_ALEMAN_A1}
          level="A1"
          audioBasePath="/audio/aleman/a1"
          backHref="/practica/aleman/a1"
          progressKey="wl-listening-aleman-a1-progress"
          seriesTitle="Emma in Berlin"
          seriesDescription="Temporada A1 · 20 episodios cortos: el primer día de Emma en Berlín, su casa, su barrio y su nueva rutina."
          speechLang="de-DE"
        />
      </div>
    </section>
  )
}
