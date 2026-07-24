import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_B1_ALL } from '@/data/practica/ingles-b1-listening'

export const metadata: Metadata = {
  title: 'Escucha Inglés B1: The Corner Project | Idiomas WeLearn',
  description: '20 episodios B1 que continúan la historia de The Corner Project: Maya y la comunidad luchan por salvar el café de una venta y de un rival. Vocabulario, comprensión y gramática B1 en contexto.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b1/escucha' },
  // Pendiente de aprobación lingüística/pedagógica y de grabación de audio: sin indexar por ahora.
  robots: { index: false, follow: false },
}

export default function EscuchaInglesB1() {
  return <section className="wl-section"><div className="wrap" style={{ maxWidth: 1180 }}><ListeningJourney exercises={LISTENING_B1_ALL} level="B1" audioBasePath="/audio/ingles/b1" backHref="/practica/ingles/b1" progressKey="wl-listening-b1-progress" seriesTitle="The Corner Project" seriesDescription="Temporada B1 · 20 episodios: Maya y la comunidad luchan por salvar The Corner Project de una venta y de un rival, mientras Maya aprende a manejar el negocio." /></div></section>
}
