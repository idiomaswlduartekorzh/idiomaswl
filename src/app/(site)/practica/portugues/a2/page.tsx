import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'portugues',
  'a2',
  "20 episódios narrativos A2: «O muro que perdeu as cores», temporada 2. Roteiro dialogado, vocabulário, perguntas e transcrição bilíngue.",
);

export const metadata: Metadata = {
  title: 'Portugués A2 — Elige una habilidad',
  description: 'Portugués A2: pretérito perfeito vs imperfeito, pronomes oblíquos, ser vs estar, comparativo, futuro e vocabulário temático.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/a2' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Leitura', desc: '5 textos A2 (80-120 palavras) sobre viagens, trabalho, opiniões. Vocabulário clicável, 6 perguntas por texto.', count: '5 textos · 30 perguntas', href: '/practica/portugues/a2/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Gramática', desc: 'Pretérito perfeito vs imperfeito, pronomes oblíquos, ser vs estar, comparativo e futuro. 10 exercícios por tema.', count: '5 temas · 50+ exercícios', href: '/practica/portugues/a2/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Escrita', desc: '5 tarefas de escrita A2 com gramática integrada, modelo e lista de verificação.', count: '5 redações guiadas', href: '/practica/portugues/a2/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Expressão oral', desc: '20 expressões A2 com contexto situacional, pronúncia e variantes formais/informais.', count: '20 expressões essenciais', href: '/practica/portugues/a2/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulário', desc: '8 temas × 10 palavras. 3 modos de prática: flashcard, QCM e escrita.', count: '8 temas · 80+ palavras', href: '/practica/portugues/a2/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Compreensão auditiva', ...ESCUCHA, href: '/practica/portugues/a2/escucha' },
];

export default function PortuguesA2Page() {
  return (
    <>
      <CourseSchema
        name="Portugués A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Portugués nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/portugues/a2"
        educationalLevel="A2"
        teaches="Portugués, habilidades MCER"
        inLanguage="po"
      />
      <SkillHub
        langHref="/practica/portugues"
        langLabel="🇧🇷 Portugués"
        levelLabel="A2"
        eyebrow="Portugués A2 — Elementar"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar o português elementar. Pratique-as na ordem que quiser."
        accent="#009c3b"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Dica de estudo:</strong> Comece pela <strong>Gramática</strong> para dominar o pretérito perfeito vs imperfeito, depois pratique com <strong>Leitura</strong> usando textos autênticos.
          </>
        }
      />
      <PracticaWABanner
        idioma="portugués"
        color="#009c3b"
        msg="Hola, estoy practicando portugués A2 en WeLearn y me gustaría agendar uma classe de diagnóstico gratis."
      />
    </>
  );
}
