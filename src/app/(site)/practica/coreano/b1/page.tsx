import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'coreano',
  'b1',
  '20 episodios narrativos B1: «별 카페의 마지막 여름», temporada 3. Guion dialogado en hangul con romanización, vocabulario, preguntas y transcripción bilingüe.',
);

export const metadata: Metadata = {
  title: 'Coreano B1 — Elige una habilidad',
  description: 'Coreano B1: -(으)면 (condicional), -아/어야 하다 (obligación), -(으)ㄹ 수 있다 (capacidad), -기 때문에 (razón), -는데 (contexto/contraste). 6 habilidades interactivas.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/b1' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: '읽기 (Ilgi)',
    desc: '5 textos B1 (120-150 palabras): noticias, cultura, sociedad. Condicionales y expresiones complejas en contexto.',
    count: '5 textos · 30 preguntas', href: '/practica/coreano/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: '문법 (Munbeop)',
    desc: '-(으)면, -아/어야 하다, -(으)ㄹ 수 있다, -기 때문에, -는데. 10 ejercicios por tema.',
    count: '5 temas · 50+ ejercicios', href: '/practica/coreano/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: '쓰기 (Sseugi)',
    desc: '5 tareas B1 con Hangul + romanización: cartas, opiniones, comparaciones.',
    count: '5 prompts guiados', href: '/practica/coreano/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: '말하기 (Malhagi)',
    desc: '20 frases B1 con Hangul, romaja y fonética para debates y situaciones formales.',
    count: '20 frases esenciales', href: '/practica/coreano/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: '어휘 (Eohwi)',
    desc: '8 sets temáticos × 10 palabras con romaja. Flashcard, MCQ y escritura.',
    count: '8 sets · 80+ palabras', href: '/practica/coreano/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: '듣기 (Deutgi)',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/coreano/b1/escucha', available: true,
  },
];

export default function CoreanoB1Page() {
  return (
    <>
      <CourseSchema
        name="Coreano B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Coreano nivel B1 (Intermedio): lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/coreano/b1"
        educationalLevel="B1"
        teaches="Coreano, habilidades MCER"
        inLanguage="ko"
      />
      <SkillHub
        langHref="/practica/coreano"
        langLabel="🇰🇷 Coreano"
        levelLabel="B1"
        eyebrow="한국어 B1 — Intermedio (Junggup)"
        title="Elige una habilidad"
        lead="Seis habilidades para el coreano intermedio. Practica condicionales, obligación, capacidad y expresiones de razón."
        accent="#534AB7"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>팁 (tip):</strong> Empieza con <strong>문법 · Gramática</strong> para dominar <strong>-(으)면</strong> (condicional), luego practica en <strong>읽기 · Lectura</strong> y <strong>말하기 · Habla</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="coreano"
        color="#534AB7"
        msg="Hola, estoy practicando coreano B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
