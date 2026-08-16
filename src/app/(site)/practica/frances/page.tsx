import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Francés — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de francés por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Débutant',
    desc: "Premiers mots, présent de l'indicatif, vocabulaire quotidien et phrases de survie.",
    href: '/practica/frances/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Élémentaire', desc: 'Passé composé, imparfait, pronoms COD/COI, comparatif/superlatif et futur.', href: '/practica/frances/a2', available: true, count: '6 habilidades · 50+ ejercicios' },
  { nivel: 'B1', name: 'Intermédiaire', desc: 'Subjonctif, futur simple, production écrite, compréhension orale.', href: '/practica/frances/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Intermédiaire avancé', desc: 'Conditionnel, préparation DELF B2, vocabulaire soutenu.', available: false },
  { nivel: 'C1', name: 'Avancé', desc: 'Style formel, préparation DALF C1, nuances grammaticales.', available: false },
];

export default function FrancesPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Francés — Ejercicios interactivos MCER"
        description="Ejercicios de francés por nivel MCER: A1 y A2 disponibles. Vocabulario, gramática, escritura, habla y escucha."
        url="https://www.idiomaswl.com/practica/frances"
        educationalLevel="A1,A2"
        teaches="Francés, DELF, DALF"
        inLanguage="fr"
      />
      <LanguageHub
        langLabel="🇫🇷 Francés"
        eyebrow="🇫🇷 Francés"
        title="Elige tu nivel"
        lead="Exercices organisés par niveau CECR. Commence par A1 et progresse à ton rythme."
        accent="#003189"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="frances" />}
      />
    </>
  );
}
