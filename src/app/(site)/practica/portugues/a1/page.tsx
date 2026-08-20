import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Portugués A1 — Elige una habilidad',
  description: 'Portugués A1: leitura, gramática (artigos, ser/estar, verbos -AR), escritura, expressão oral, vocabulário e escuta.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/a1' },
};

const AUDIO_LISTO = audioReady('portugues');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Leitura', desc: '5 textos A1: Carlos em São Paulo, a família, a casa, a comida e a escola. Cada palavra com tradução ao clique.', count: '5 textos · 25 perguntas', href: '/practica/portugues/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos, ser, estar, ter, verbos -ar/-er/-ir, você, negación, contracciones (do/no/ao), posesivos, há/tem y más. Con explicación, tablas y contraste español→portugués.', count: '15 temas · 200+ ejercicios', href: '/practica/portugues/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Escrita', desc: '5 tarefas guiadas: apresentar-se, descrever a família, a casa, as atividades e as preferências.', count: '5 prompts guiados', href: '/practica/portugues/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Expressão oral', desc: '15 frases de sobrevivência em português com pronúncia e notas para hispanohablantes.', count: '15 frases esenciales', href: '/practica/portugues/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulário', desc: '6 conjuntos temáticos: família, cores, comida, dias, corpo, números. Flashcards + 3 modos.', count: '6 sets · 60+ palabras', href: '/practica/portugues/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Compreensão auditiva', desc: `20 episódios narrativos A1: «O áudio no grupo errado». Roteiro dialogado, vocabulário, perguntas e transcrição bilíngue.${AUDIO_LISTO ? '' : ' Áudio em produção.'}`, count: AUDIO_LISTO ? '20 episódios · 100 perguntas' : '20 episódios · áudio em produção', href: '/practica/portugues/a1/escucha' },
];

export default function PortuguesA1Page() {
  return (
    <>
      <CourseSchema
        name="Portugués A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Portugués nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/portugues/a1"
        educationalLevel="A1"
        teaches="Portugués, habilidades MCER"
        inLanguage="po"
      />
      <SkillHub
        langHref="/practica/portugues"
        langLabel="🇧🇷 Portugués"
        levelLabel="A1"
        eyebrow="Portugués A1 — Iniciante"
        title="Elige una habilidad"
        lead="Seis habilidades para um português sólido do zero. Pratique-as na ordem que quiser."
        accent="#009c3b"
        skills={HABILIDADES}
      />
      <PracticaWABanner
        idioma="portugués"
        color="#009c3b"
        msg="Hola, estoy practicando portugués en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
