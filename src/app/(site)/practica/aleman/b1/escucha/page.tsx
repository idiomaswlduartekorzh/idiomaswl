import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_ALEMAN_B1 } from '@/data/practica/aleman-b1-listening'

export const metadata: Metadata = {
  title: 'Escucha Alemán B1: Emma in Berlin | Idiomas WeLearn',
  description: '12 episodios B1 en alemán con audio real, transcripción bilingüe y preguntas de comprensión. Un misterio en el café de Herr Becker.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/b1/escucha' },
}

export default function EscuchaAlemanB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 1180 }}>
        <ListeningJourney
          exercises={LISTENING_ALEMAN_B1}
          level="B1"
          audioBasePath="/audio/aleman/b1"
          backHref="/practica/aleman/b1"
          progressKey="wl-listening-aleman-b1-progress"
          seriesTitle="Emma in Berlin"
          seriesDescription="Temporada B1 · Una carta anónima llega al café de Herr Becker y destapa una vieja historia del barrio."
          speechLang="de-DE"
        />
      </div>
    </section>
  )
}
