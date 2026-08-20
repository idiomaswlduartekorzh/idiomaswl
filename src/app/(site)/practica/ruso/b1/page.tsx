import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'ruso',
  'b1',
  '20 episodios narrativos B1: «Второй голос», temporada 3. Guion dialogado en cirílico con transliteración, vocabulario, preguntas y transcripción bilingüe.',
);

export const metadata: Metadata = {
  title: 'Ruso B1 — Elige una habilidad',
  description: 'Ruso B1: aspectos verbales (совершенный/несовершенный), caso instrumental, genitivo plural, condicionales con бы y participios. 6 habilidades interactivas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/b1' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Чтение (Chteniye)',
    desc: '5 textos B1 (120-150 palabras): actualidad, cultura, ciencia. Aspectos verbales y casos en contexto.',
    count: '5 textos · 30 preguntas', href: '/practica/ruso/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Грамматика (Grammatika)',
    desc: 'Виды глагола (aspectos), Творительный падеж, Родительный мн.ч., Условные предложения y Причастия.',
    count: '5 temas · 50+ ejercicios', href: '/practica/ruso/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Письмо (Pismo)',
    desc: '5 tareas B1 con cirílico + transliteración: cartas, opiniones, comparaciones.',
    count: '5 prompts guiados', href: '/practica/ruso/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Разговор (Razgovor)',
    desc: '20 frases B1 con cirílico, transliteración y fonética para debates y situaciones formales.',
    count: '20 frases esenciales', href: '/practica/ruso/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Словарь (Slovar)',
    desc: '8 sets temáticos × 10 palabras con transliteración. Flashcard, MCQ y escritura.',
    count: '8 sets · 80+ palabras', href: '/practica/ruso/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Аудирование (Audirovaniye)',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/ruso/b1/escucha', available: true,
  },
];

export default function RusoB1Page() {
  return (
    <>
      <CourseSchema
        name="Ruso B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Ruso nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Aspectos verbales, caso instrumental y oraciones condicionales con feedback inmediato."
        url="https://idiomaswl.com/practica/ruso/b1"
        educationalLevel="B1"
        teaches="Ruso, habilidades MCER"
        inLanguage="ru"
      />
      <SkillHub
        langHref="/practica/ruso"
        langLabel="🇷🇺 Ruso"
        levelLabel="B1"
        eyebrow="Русский B1 — Промежуточный (Promezhutochny)"
        title="Elige una habilidad"
        lead="Seis habilidades para el ruso intermedio. Practica los aspectos verbales, el caso instrumental y las oraciones condicionales."
        accent="#cc0000"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Совет (Sovet — consejo):</strong> Empieza con <strong>Грамматика · Gramática</strong> para dominar los aspectos verbales (<strong>совершенный/несовершенный</strong>), luego practica en <strong>Чтение · Lectura</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="ruso"
        color="#cc0000"
        msg="Hola, estoy practicando ruso B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
