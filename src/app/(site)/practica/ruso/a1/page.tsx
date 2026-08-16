import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Ruso A1 — Elige una habilidad',
  description: 'Ruso A1: alfabeto cirílico, gramática (casos, conjugaciones), escritura, frases esenciales y vocabulario con transliteración.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso/a1' },
};

const AUDIO_LISTO = audioReady('ruso');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Чтение', eng: 'Lectura', desc: '5 textos A1 en cirílico con transliteración y vocabulario interactivo. Priviet! Знакомство, семья, дом, еда.', count: '5 textos · 25 preguntas', href: '/practica/ruso/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Грамматика', eng: 'Gramática', desc: 'Alfabeto cirílico, pronombres, género, posesivos, conjugaciones, casos (acusativo, preposicional, genitivo), números, pasado, futuro y negación. Con transliteración.', count: '15 temas · 180+ ejercicios', href: '/practica/ruso/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Письмо', eng: 'Escritura', desc: '5 tareas guiadas: presentarse, describir la familia, tu ciudad, actividades y gustos. En cirílico o transliteración.', count: '5 prompts guiados', href: '/practica/ruso/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Разговор', eng: 'Expresión oral', desc: '12 frases esenciales de supervivencia en ruso: cirílico + transliteración + pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/ruso/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Словарь', eng: 'Vocabulario', desc: '6 sets temáticos con cirílico + transliteración + español: семья, цвета, еда, дни, тело, числа.', count: '6 sets · 60+ palabras', href: '/practica/ruso/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Аудирование', eng: 'Escucha', desc: `20 episodios narrativos A1: «Красный шарф в метро». Guion dialogado con transliteración, vocabulario, preguntas y transcripción bilingüe.${AUDIO_LISTO ? '' : ' Audio en producción.'}`, count: AUDIO_LISTO ? '20 episodios · 100 preguntas' : '20 episodios · audio en producción', href: '/practica/ruso/a1/escucha' },
];

export default function RusoA1Page() {
  return (
    <>
      <CourseSchema
        name="Ruso A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Ruso nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/ruso/a1"
        educationalLevel="A1"
        teaches="Ruso, habilidades MCER"
        inLanguage="ru"
      />
      <SkillHub
        langHref="/practica/ruso"
        langLabel="🇷🇺 Ruso"
        levelLabel="A1"
        eyebrow="Ruso A1 — Начинающий"
        title="Elige una habilidad"
        lead="Seis habilidades para un ruso sólido desde cero. Cada palabra en cirílico incluye su transliteración latina."
        accent="#cc0000"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Совет (Soviet — consejo):</strong> Empieza por <strong>Грамматика · Gramática</strong> para aprender el alfabeto cirílico primero. Luego usa <strong>Чтение · Lectura</strong> para practicar textos reales.
          </>
        }
      />
      <PracticaWABanner
        idioma="ruso"
        color="#cc0000"
        msg="Hola, estoy practicando ruso en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
