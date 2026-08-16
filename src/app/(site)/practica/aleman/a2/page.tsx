import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Alemán A2 — Grundkenntnisse',
  description: 'Alemán A2: Perfekt, Dativ, Modalverben im Präteritum, trennbare Verben und Komparativ. 6 habilidades interactivas.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/a2' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lesen', eng: 'Lectura', desc: '5 Texte A2 (80-120 Wörter) über Reisen, Arbeit, Meinungen. Interaktives Vokabular, 6 Fragen pro Text.', count: '5 Texte · 30 Fragen', href: '/practica/aleman/a2/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatik', eng: 'Gramática', desc: 'Perfekt, Dativ, Modalverben im Präteritum, trennbare Verben, Komparativ. 10 Übungen pro Thema.', count: '5 Themen · 50+ Übungen', href: '/practica/aleman/a2/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Schreiben', eng: 'Escritura', desc: '5 Schreibaufgaben A2 mit integrierter Grammatik, Mustertext und Checkliste.', count: '5 geführte Texte', href: '/practica/aleman/a2/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Sprechen', eng: 'Expresión oral', desc: '20 Redemittel A2 mit situativem Kontext, Aussprache und formellen/informellen Varianten.', count: '20 wichtige Ausdrücke', href: '/practica/aleman/a2/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vokabular', eng: 'Vocabulario', desc: '8 Themenbereiche × 10 Wörter. 3 Übungsmodi: Karteikarten, MCQ, Schreiben.', count: '8 Themen · 80+ Wörter', href: '/practica/aleman/a2/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Hören', eng: 'Escucha', ...listeningCard('aleman', 'a2', '«Der Schlüssel zum Café»: Emmas zweites Jahr in Berlin, vom Flohmarkt bis zur ersten festen Schicht im Café.'), href: '/practica/aleman/a2/escucha' },
];

export default function AlemanA2Page() {
  return (
    <>
      <CourseSchema
        name="Alemán A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Alemán nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/aleman/a2"
        educationalLevel="A2"
        teaches="Alemán, habilidades MCER"
        inLanguage="al"
      />
      <SkillHub
        langHref="/practica/aleman"
        langLabel="🇩🇪 Alemán"
        levelLabel="A2"
        eyebrow="Alemán A2 — Grundkenntnisse"
        title="Elige una habilidad"
        lead="Sechs Fertigkeiten für solides Deutsch auf A2-Niveau. Übe sie in beliebiger Reihenfolge."
        accent="#dd0000"
        skills={HABILIDADES}
        tip={
          <>
            💡 Tipp: Beginne mit <strong>Grammatik</strong> um das Perfekt zu lernen, dann übe mit <strong>Lektüre</strong> mit echten deutschen Texten.
          </>
        }
      />
      <PracticaWABanner
        idioma="alemán"
        color="#dd0000"
        msg="Hola, estoy practicando alemán A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
