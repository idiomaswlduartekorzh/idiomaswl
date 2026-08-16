import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Japonés A1 — Elige una habilidad',
  description: 'Japonés A1: Hiragana, Katakana, ～は～です, あります/います, números y vocabulario esencial. Todo con romaji.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/a1' },
};

const AUDIO_LISTO = audioReady('japones');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: '読む (Yomu)', eng: 'Lectura', desc: '5 textos A1 en japonés con romaji y vocabulario interactivo. はじめまして！Familia, casa, comida.', count: '5 textos · 25 preguntas', href: '/practica/japones/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: '文法 (Bunpō)', eng: 'Gramática', desc: 'Hiragana y Katakana, ～は～です, partículas (は が を に で の), あります/います, verbos ～ます, números, adjetivos い・な, negación y pasado. Con romaji.', count: '15 temas · 180+ ejercicios', href: '/practica/japones/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: '書く (Kaku)', eng: 'Escritura', desc: '5 tareas guiadas: presentarse, describir objetos, la familia, el horario y los gustos.', count: '5 prompts guiados', href: '/practica/japones/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: '話す (Hanasu)', eng: 'Expresión oral', desc: '12 frases de supervivencia en japonés: script + romaji + guía de pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/japones/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: '語彙 (Goi)', eng: 'Vocabulario', desc: '6 sets temáticos: 家族, 色, 食べ物, 曜日, 体, 数字. Script japonés + romaji + español.', count: '6 sets · 60+ palabras', href: '/practica/japones/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: '聞く (Kiku)', eng: 'Escucha', desc: `20 episodios narrativos A1: «青い手帳のスタンプ». Guion dialogado con romaji, vocabulario, preguntas y transcripción bilingüe.${AUDIO_LISTO ? '' : ' Audio en producción.'}`, count: AUDIO_LISTO ? '20 episodios · 100 preguntas' : '20 episodios · audio en producción', href: '/practica/japones/a1/escucha' },
];

export default function JaponesA1Page() {
  return (
    <>
      <CourseSchema
        name="Japonés A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Japonés nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/japones/a1"
        educationalLevel="A1"
        teaches="Japonés, habilidades MCER"
        inLanguage="ja"
      />
      <SkillHub
        langHref="/practica/japones"
        langLabel="🇯🇵 Japonés"
        levelLabel="A1"
        eyebrow="Japonés A1 — 初心者"
        title="Elige una habilidad"
        lead="Seis habilidades para un japonés sólido desde cero. Cada texto japonés incluye romaji (pronunciación en letras latinas)."
        accent="#bc002d"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>ヒント (hinto — consejo):</strong> Empieza por <strong>文法 · Gramática</strong> para aprender ひらがな primero. Luego usa <strong>読む · Lectura</strong> para textos reales. El vocabulario sin ひらがな es aprendizaje a medias.
          </>
        }
      />
      <PracticaWABanner
        idioma="japonés"
        color="#bc002d"
        msg="Hola, estoy practicando japonés en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
