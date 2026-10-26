import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Prática de Português A1-C2 — Escolha seu nível',
  description: 'Exercícios e cursos completos de gramática portuguesa de A1 a C2, com mapas visuais, prática progressiva e PDF.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Iniciante',
    desc: 'Primeiras palavras, presente do indicativo, vocabulário cotidiano e frases de sobrevivência.',
    href: '/practica/portugues/a1', available: true,
    count: '6 habilidades · 40+ exercícios',
  },
  { nivel: 'A2', name: 'Elementar', desc: 'Pretérito perfeito, imperfeito, pronomes oblíquos, ser vs estar e comparativos.', href: '/practica/portugues/a2', available: true, count: '6 habilidades · 50+ exercícios' },
  { nivel: 'B1', name: 'Intermediário', desc: 'Subjuntivo, futuro do pretérito, produção escrita, compreensão oral.', href: '/practica/portugues/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Intermediário avançado', desc: 'Tempos, modos, pronomes, formas reduzidas e organização textual com prática completa.', href: '/practica/portugues/b2', available: true, count: '30 aulas · 90 PDF' },
  { nivel: 'C1', name: 'Avançado', desc: 'Sintaxe complexa, modalidade, coesão, registro e escrita acadêmica.', href: '/practica/portugues/c1', available: true, count: '30 aulas · 90 PDF' },
  { nivel: 'C2', name: 'Domínio', desc: 'Perspectiva, escopo, ritmo, polifonia e revisão editorial em nível avançado.', href: '/practica/portugues/c2', available: true, count: '30 aulas · 90 PDF' },
];

export default function PortuguesPage() {
  return (
    <>
      <CourseSchema
        name="Prática de Português — Exercícios interativos do QECR"
        description="Percurso de português de A1 a C2 com gramática interativa, mapas visuais, exercícios progressivos e PDF."
        url="https://www.idiomaswl.com/practica/portugues"
        educationalLevel="A1, A2, B1, B2, C1, C2"
        teaches="Português, CELPE-Bras"
        inLanguage="pt"
      />
      <LanguageHub
        language="portugues"
        langLabel="🇧🇷 Português"
        eyebrow="🇧🇷 Português"
        title="Escolha o seu nível"
        lead="Exercícios organizados por nível do QECR. Comece no A1 e avance até o C2 com gramática guiada, mapas visuais, prática extensa e materiais para baixar."
        accent="#009c3b"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="portugues" />}
      />
    </>
  );
}
