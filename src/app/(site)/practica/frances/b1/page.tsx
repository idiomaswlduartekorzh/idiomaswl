import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'frances',
  'b1',
  '20 épisodes narratifs B1 : « La relève », saison 3. Dialogues transcrits, vocabulaire, questions et traduction en espagnol.',
);

export const metadata: Metadata = {
  title: 'Francés B1 — Elige una habilidad',
  description: 'Francés B1: subjonctif, conditionnel, pronoms relatifs y discours indirect, con lectura, escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/b1' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lecture', desc: '5 textos B1 (120-150 palabras): actualidad, cultura y ciencia. Subjonctif y conditionnel en contexto.', count: '5 textes · 30 questions', href: '/practica/frances/b1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammaire', desc: 'Subjonctif présent, Conditionnel, Pronoms relatifs, Plus-que-parfait y Discours indirect.', count: '5 thèmes · 50+ exercices', href: '/practica/frances/b1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Écriture', desc: "5 tareas B1: emails formales, essais d'opinion, descriptions.", count: '5 prompts guidés', href: '/practica/frances/b1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Habla', eng: 'Expression orale', desc: '20 phrases B1 pour débats, opinions et conversations formelles.', count: '20 phrases essentielles', href: '/practica/frances/b1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulaire', desc: '8 sets thématiques × 10 mots. Flashcard, QCM et écriture.', count: '8 sets · 80+ mots', href: '/practica/frances/b1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Compréhension orale', ...ESCUCHA, href: '/practica/frances/b1/escucha' },
];

export default function FrancesB1Page() {
  return (
    <>
      <CourseSchema
        name="Francés B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Francés nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con subjonctif, conditionnel y feedback inmediato."
        url="https://www.idiomaswl.com/practica/frances/b1"
        educationalLevel="B1"
        teaches="Francés, habilidades MCER"
        inLanguage="fr"
      />
      <SkillHub
        langHref="/practica/frances"
        langLabel="🇫🇷 Francés"
        levelLabel="B1"
        eyebrow="Francés B1 — Intermédiaire"
        title="Elige una habilidad"
        lead="Seis habilidades para el francés intermedio. Practica le subjonctif, le conditionnel y les pronoms relatifs."
        accent="#003189"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Conseil:</strong> Empieza con <strong>Gramática</strong> para dominar el subjonctif, luego practica con <strong>Lectura</strong> y <strong>Escritura</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="francés"
        color="#003189"
        msg="Hola, estoy practicando francés B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
