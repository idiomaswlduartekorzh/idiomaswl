import type { Metadata } from 'next';
import ListeningJourney from '@/components/practica/ListeningJourney';
import { QuizSchema } from '@/components/practica/EducationSchema';
import { ASCOLTO_A1 } from '@/data/practica/italiano-a1-ascolto';

export const metadata: Metadata = {
  title: 'Ascolto Italiano A1: 20 audios con ejercicios | Idiomas WeLearn',
  description: 'Practica comprensión auditiva de italiano A1 con 20 audios narrados: vocabulario previo, preguntas, transcripción bilingüe y repaso guiado.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/a1/escucha' },
};

export default function EscuchaItalianoA1() {
  return (
    <>
      <QuizSchema
        name="Ascolto en Italiano A1 — 20 audios con ejercicios"
        url="https://www.idiomaswl.com/practica/italiano/a1/escucha"
        description="Comprensión auditiva de italiano nivel A1 con 20 audios narrados, vocabulario interactivo, preguntas y transcripción bilingüe."
      />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <ListeningJourney
            exercises={ASCOLTO_A1}
            level="A1"
            audioBasePath="/audio/italiano/a1"
            backHref="/practica/italiano/a1"
            progressKey="wl-ascolto-it-a1-progress"
            languageLabel="Italiano"
            skillLabel="Ascolto"
            speechLang="it-IT"
            seriesTitle="Percorso A1"
            seriesDescription="20 audios narrados con vocabulario, preguntas y transcripción bilingüe."
          />
        </div>
      </section>
    </>
  );
}
