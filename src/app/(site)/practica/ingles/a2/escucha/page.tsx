import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_A2_ALL } from '@/data/practica/ingles-a2-listening'

export const metadata: Metadata = {
  title: 'Escucha Inglés A2: The Corner Project | Idiomas WeLearn',
  description: '20 monólogos A2 que siguen la historia de The Corner Project, con vocabulario, comprensión y práctica progresiva.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2/escucha' },
}

export default function EscuchaInglesA2() {
  return <section className="wl-section"><div className="wrap" style={{ maxWidth: 1180 }}><ListeningJourney exercises={LISTENING_A2_ALL} level="A2" audioBasePath="/audio/ingles/a2" backHref="/practica/ingles/a2" progressKey="wl-listening-a2-progress" seriesTitle="The Corner Project" seriesDescription="Temporada A2 · 20 actualizaciones de Maya mientras convierte un local vacío en un café comunitario." /></div></section>
}
