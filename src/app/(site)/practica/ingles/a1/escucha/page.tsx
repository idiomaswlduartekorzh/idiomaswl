import type { Metadata } from 'next'
import ListeningJourney from '@/components/practica/ListeningJourney'
import { LISTENING_A1_ALL } from '@/data/practica/ingles-a1-listening'

export const metadata: Metadata = {
  title: 'Escucha Inglés A1: 20 audios con ejercicios | Idiomas WeLearn',
  description: 'Practica comprensión auditiva A1 con 20 monólogos, vocabulario previo, preguntas, transcripción guiada y repaso.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a1/escucha' },
}

export default function EscuchaInglesA1() {
  return <section className="wl-section"><div className="wrap" style={{ maxWidth: 1180 }}><ListeningJourney exercises={LISTENING_A1_ALL} /></div></section>
}
