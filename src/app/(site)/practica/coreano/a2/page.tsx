import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'coreano',
  'a2',
  "20 episodios narrativos A2: «별 카페의 손편지», temporada 2. Guion dialogado en hangul con romanización, vocabulario, preguntas y transcripción bilingüe.",
);

export const metadata: Metadata = {
  title: 'Coreano A2 — Elige una habilidad',
  description: 'Coreano A2: 았/었어요 (pasado), -(으)려고 하다 (intención), -(으)ㄹ 것 같다 (conjetura), -지만 (contraste), -아/어서 (causa/secuencia). 6 habilidades interactivas.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a2' },
};

const HABILIDADES = [
  {
    id: "leccion-integrada", emoji: "🎯", name: "Lección Integrada", eng: "통합 수업 (Tonghab Sueop)",
    desc: "카페에 지갑을 두고 왔어요: 읽기, 듣기, 쓰기, 말하기. Una billetera desaparecida, pistas dispersas, tú resuelves el caso.",
    count: "60 minutos · 6 etapas", href: "/practica/coreano/a2/leccion-integrada", available: true,
  },
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: '읽기 (Ilgi)',
    desc: '5 textos A2 en Hangul (80-120 palabras) con romanización. Vocabulario interactivo, 6 preguntas por texto.',
    count: '5 textos · 30 preguntas', href: '/practica/coreano/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: '문법 (Munbeop)',
    desc: '았/었어요 (pasado), -(으)려고 하다 (intención), -(으)ㄹ 것 같다 (conjetura), -지만 (contraste) y -아/어서 (causa/secuencia).',
    count: '5 temas · 50+ ejercicios', href: '/practica/coreano/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: '쓰기 (Sseugi)',
    desc: '5 tareas A2 guiadas: emails, relatos, comparaciones. Acepta Hangul o romanización.',
    count: '5 prompts guiados', href: '/practica/coreano/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: '말하기 (Malhagi)',
    desc: '20 frases A2 con contexto situacional, Hangul + romanización + guía de pronunciación.',
    count: '20 frases esenciales', href: '/practica/coreano/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: '어휘 (Eohwi)',
    desc: '8 sets temáticos × 10 palabras. Hangul + romanización + español. 3 modos de práctica.',
    count: '8 sets · 80+ palabras', href: '/practica/coreano/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: '듣기 (Deutgi)',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/coreano/a2/escucha', available: true,
  },
];

export default function CoreanoA2Page() {
  return (
    <>
      <CourseSchema
        name="Coreano A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Coreano nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/coreano/a2"
        educationalLevel="A2"
        teaches="Coreano, habilidades MCER"
        inLanguage="ko"
      />
      <SkillHub
        langHref="/practica/coreano"
        langLabel="🇰🇷 Coreano"
        levelLabel="A2"
        eyebrow="Coreano A2 — 초급"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar el coreano elemental. Practica el pasado, intención, conjetura y estructuras de contraste."
        accent="#534AB7"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>팁 (tip):</strong> Empieza por <strong>문법 · Gramática</strong> para dominar el pasado 았/었어요, luego practica con <strong>읽기 · Lectura</strong> usando textos reales. El vocabulario de <strong>어휘</strong> consolidará todo.
          </>
        }
      />
      <PracticaWABanner
        idioma="coreano"
        color="#534AB7"
        msg="Hola, estoy practicando coreano A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
