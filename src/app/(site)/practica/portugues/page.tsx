import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Portugués — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de portugués por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Iniciante',
    desc: 'Primeiras palavras, presente do indicativo, vocabulário cotidiano e frases de sobrevivência.',
    href: '/practica/portugues/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Elementar', desc: 'Pretérito perfeito, imperfeito, pronomes oblíquos, ser vs estar e comparativos.', href: '/practica/portugues/a2', available: true, count: '6 habilidades · 50+ ejercicios' },
  { nivel: 'B1', name: 'Intermediário', desc: 'Subjuntivo, futuro do pretérito, produção escrita, compreensão oral.', href: '/practica/portugues/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Intermediário avançado', desc: 'Preparação CELPE-Bras, vocabulário acadêmico, colocações.', available: false },
  { nivel: 'C1', name: 'Avançado', desc: 'Estilo formal, nuances gramaticais, nível superior CELPE-Bras.', available: false },
];

export default function PortuguesPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Portugués — Ejercicios interactivos MCER"
        description="Ejercicios de portugués brasileño por nivel: A1 y A2 disponibles. Vocabulario, gramática y comprensión."
        url="https://www.idiomaswl.com/practica/portugues"
        educationalLevel="A1,A2"
        teaches="Portugués, CELPE-Bras"
        inLanguage="pt"
      />
      <LanguageHub
        langLabel="🇧🇷 Portugués"
        eyebrow="🇧🇷 Portugués"
        title="Elige tu nivel"
        lead="Exercícios organizados por nível MCER. Comece no A1 e avance no seu ritmo."
        accent="#009c3b"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="portugues" />}
      />
    </>
  );
}
