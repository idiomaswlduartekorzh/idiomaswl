import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'ruso',
  'a2',
  "20 episodios narrativos A2: «Тетрадь студии «Луна»», temporada 2. Guion dialogado en cirílico con transliteración, vocabulario, preguntas y transcripción bilingüe.",
);

export const metadata: Metadata = {
  title: 'Ruso A2 — Elige una habilidad',
  description: 'Ruso A2: pasado, futuro, verbos de movimiento, casos dativo e instrumental y verbos reflexivos, en seis habilidades interactivas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/a2' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Чтение (Chteniye)', eng: 'Lectura',
    desc: '5 textos A2 en cirílico (80-120 palabras) con transliteración. Vocabulario interactivo, 6 вопросов por texto.',
    count: '5 textos · 30 вопросов', href: '/practica/ruso/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Грамматика (Grammatika)', eng: 'Gramática',
    desc: 'Прошедшее время, будущее время, глаголы движения (идти/ехать), дательный падеж y возвратные глаголы (-ся/-сь).',
    count: '5 тем · 50+ упражнений', href: '/practica/ruso/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Письмо (Pisʹmo)', eng: 'Escritura',
    desc: '5 tareas A2 guiadas: correos, relatos, descripciones. Acepta cirílico o transliteración.',
    count: '5 prompts guiados', href: '/practica/ruso/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Разговор (Razgovor)', eng: 'Expresión oral',
    desc: '20 frases A2 con contexto situacional: cirílico + transliteración + guía de pronunciación.',
    count: '20 frases esenciales', href: '/practica/ruso/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Словарь (Slovarʹ)', eng: 'Vocabulario',
    desc: '8 sets temáticos × 10 palabras. Cirílico + transliteración + español. 3 modos de práctica.',
    count: '8 sets · 80+ слов', href: '/practica/ruso/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Аудирование (Audirovaniye)', eng: 'Escucha',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/ruso/a2/escucha', available: true,
  },
];

export default function RusoA2Page() {
  return (
    <>
      <CourseSchema
        name="Ruso A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Ruso nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://idiomaswl.com/practica/ruso/a2"
        educationalLevel="A2"
        teaches="Ruso, habilidades MCER"
        inLanguage="ru"
      />
      <SkillHub
        langHref="/practica/ruso"
        langLabel="🇷🇺 Ruso"
        levelLabel="A2"
        eyebrow="Ruso A2 — Элементарный"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar el ruso elemental. Practica el pasado, el futuro, los verbos de movimiento y el caso dativo."
        accent="#cc0000"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Совет (Sovet — consejo):</strong> Empieza por <strong>Грамматика · Gramática</strong> para dominar el <strong>прошедшее время</strong> (pasado), luego practica con <strong>Чтение · Lectura</strong> usando textos reales.
          </>
        }
      />
      <PracticaWABanner
        idioma="ruso"
        color="#cc0000"
        msg="Hola, estoy practicando ruso A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
