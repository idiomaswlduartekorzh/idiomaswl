import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Coreano A1 — Elige una habilidad',
  description: 'Coreano A1: Hangul, 이에요/예요, partículas (은/는 이/가 을/를), números y verbos -아/어요. Todo con romanización.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a1' },
};

const AUDIO_LISTO = audioReady('coreano');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: '읽기 (Ilgi)', eng: 'Lectura', desc: '5 textos A1 en Hangul con romanización y vocabulario interactivo. 안녕하세요! Familia, casa, comida.', count: '5 textos · 25 preguntas', href: '/practica/coreano/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: '문법 (Munbeop)', eng: 'Gramática', desc: 'Hangul, 이에요/예요, partículas (은/는 이/가 을/를 에/에서), presente, números, negación, pasado, -고 싶어요 y más. Con romanización.', count: '15 temas · 190+ ejercicios', href: '/practica/coreano/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: '쓰기 (Sseugi)', eng: 'Escritura', desc: '5 tareas guiadas: presentarse en coreano, familia, gustos. Acepta Hangul o romanización.', count: '5 prompts guiados', href: '/practica/coreano/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: '말하기 (Malhagi)', eng: 'Expresión oral', desc: '12 frases esenciales en coreano: Hangul + romanización + guía de pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/coreano/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: '어휘 (Eohwi)', eng: 'Vocabulario', desc: '6 sets temáticos: 가족, 색깔, 음식, 요일, 신체, 숫자. Hangul + romanización + español.', count: '6 sets · 60+ palabras', href: '/practica/coreano/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: '듣기 (Deutgi)', eng: 'Escucha', desc: `20 episodios narrativos A1: «노란 우산의 주인». Guion dialogado con romanización, vocabulario, preguntas y transcripción bilingüe.${AUDIO_LISTO ? '' : ' Audio en producción.'}`, count: AUDIO_LISTO ? '20 episodios · 100 preguntas' : '20 episodios · audio en producción', href: '/practica/coreano/a1/escucha' },
];

export default function CoreanoA1Page() {
  return (
    <>
      <CourseSchema
        name="Coreano A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Coreano nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/coreano/a1"
        educationalLevel="A1"
        teaches="Coreano, habilidades MCER"
        inLanguage="co"
      />
      <SkillHub
        langHref="/practica/coreano"
        langLabel="🇰🇷 Coreano"
        levelLabel="A1"
        eyebrow="Coreano A1 — 초급"
        title="Elige una habilidad"
        lead="Seis habilidades para un coreano sólido desde cero. Cada palabra en Hangul incluye su romanización (pronunciación en letras latinas)."
        accent="#534AB7"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>팁 (tip):</strong> Empieza por <strong>문법 · Gramática</strong> para aprender el Hangul primero. Luego usa <strong>읽기 · Lectura</strong> para leer textos reales. Las flashcards de <strong>어휘 · Vocabulario</strong> consolidan el aprendizaje.
          </>
        }
      />
      <PracticaWABanner
        idioma="coreano"
        color="#534AB7"
        msg="Hola, estoy practicando coreano en WeLearn y me gustaría agendar mi clase de diagnóstico gratis."
      />
    </>
  );
}
