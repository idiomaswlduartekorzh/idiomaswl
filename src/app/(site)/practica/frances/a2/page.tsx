import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'frances',
  'a2',
  "20 épisodes narratifs A2 : « La moitié de la recette », saison 2. Dialogues transcrits, vocabulaire, questions et traduction en espagnol.",
);

export const metadata: Metadata = {
  title: 'Francés A2 — Elige una habilidad',
  description: 'Francés A2: lectura, gramática (passé composé, imparfait, pronoms COD/COI, comparatif/superlatif, futur), escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/a2' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lecture', desc: '5 textos A2 (80-120 mots) sur les voyages, le travail, les opinions. Vocabulaire cliquable, 6 questions par texte.', count: '5 textes · 30 questions', href: '/practica/frances/a2/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammaire', desc: 'Passé composé, imparfait, pronoms COD/COI, comparatif/superlatif, futur proche vs futur simple. 10 exercices par thème.', count: '5 thèmes · 50+ exercices', href: '/practica/frances/a2/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Écriture', desc: "5 tâches d'écriture A2 avec grammaire intégrée, modèle et liste de vérification.", count: '5 rédactions guidées', href: '/practica/frances/a2/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Habla', eng: 'Expression orale', desc: '20 expressions A2 avec contexte situationnel, prononciation et variantes formelles/informelles.', count: '20 expressions essentielles', href: '/practica/frances/a2/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulaire', desc: '8 thèmes × 10 mots. 3 modes de pratique : flashcards, QCM et écriture.', count: '8 thèmes · 80+ mots', href: '/practica/frances/a2/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Compréhension orale', ...ESCUCHA, href: '/practica/frances/a2/escucha' },
];

export default function FrancesA2Page() {
  return (
    <>
      <CourseSchema
        name="Francés A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Francés nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/frances/a2"
        educationalLevel="A2"
        teaches="Francés, habilidades MCER"
        inLanguage="fr"
      />
      <SkillHub
        langHref="/practica/frances"
        langLabel="🇫🇷 Francés"
        levelLabel="A2"
        eyebrow="Francés A2 — Élémentaire"
        title="Elige una habilidad"
        lead="Six compétences pour consolider ton français et aller au-delà des bases. Pratique à ton rythme."
        accent="#003189"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Conseil:</strong> Commence par <strong>Grammaire</strong> pour maîtriser le passé composé, puis pratique avec <strong>Lecture</strong> en utilisant des textes authentiques.
          </>
        }
      />
      <PracticaWABanner
        idioma="francés"
        color="#003189"
        msg="Hola, estoy practicando francés A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
