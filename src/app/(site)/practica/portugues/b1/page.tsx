import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'portugues',
  'b1',
  '20 episódios narrativos B1: «Uma proposta para o muro», temporada 3. Roteiro dialogado, vocabulário, perguntas e transcrição bilíngue.',
);

export const metadata: Metadata = {
  title: 'Portugués B1 — Elige una habilidad',
  description: 'Portugués B1: o subjuntivo, o condicional, a voz passiva, pronomes relativos e discurso indireto. Exercícios interativos para o nível intermediário.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/b1' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Leitura', desc: '5 textos B1 (120-150 palavras): atualidade, cultura, ciência. Subjuntivo y Condicional em contexto.', count: '5 textos · 30 perguntas', href: '/practica/portugues/b1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Gramática', desc: 'Subjuntivo presente, Condicional, Voz passiva, Pronomes relativos y Discurso indireto.', count: '5 temas · 50+ exercícios', href: '/practica/portugues/b1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Escrita', desc: '5 tarefas B1: emails formais, textos de opinião, descrições comparativas.', count: '5 tarefas guiadas', href: '/practica/portugues/b1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Expressão oral', desc: '20 expressões B1 para debates, opiniões e conversas formais.', count: '20 expressões essenciais', href: '/practica/portugues/b1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulário', desc: '8 conjuntos temáticos × 10 palavras. Flashcard, MCQ e escrita.', count: '8 sets · 80+ palavras', href: '/practica/portugues/b1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Compreensão auditiva', ...ESCUCHA, href: '/practica/portugues/b1/escucha' },
];

export default function PortuguesB1Page() {
  return (
    <>
      <CourseSchema
        name="Portugués B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Portugués nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato para el nivel intermedio."
        url="https://www.idiomaswl.com/practica/portugues/b1"
        educationalLevel="B1"
        teaches="Portugués, habilidades MCER"
        inLanguage="po"
      />
      <SkillHub
        langHref="/practica/portugues"
        langLabel="🇧🇷 Portugués"
        levelLabel="B1"
        eyebrow="Português B1 — Intermediário"
        title="Elige una habilidad"
        lead="Seis habilidades para el portugués intermedio. Practica o subjuntivo, o condicional e a voz passiva."
        accent="#009c3b"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Dica de estudo:</strong> Comece pela <strong>Gramática</strong> para dominar o subjuntivo, depois pratique com <strong>Leitura</strong> e <strong>Escrita</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="portugués"
        color="#009c3b"
        msg="Hola, estoy practicando portugués B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
