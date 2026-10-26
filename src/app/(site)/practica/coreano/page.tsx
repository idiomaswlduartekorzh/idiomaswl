import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import KoreanToolsClient from './KoreanToolsClient';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: '한국어 문법 A1-C2 — 수준별 학습 과정',
  description: '한글 기초부터 C2 담화 문법까지. 시각 지도, 단계별 연습, 주제별 PDF로 완성하는 한국어 문법 과정입니다.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano' },
};

const NIVELES = [
  {
    nivel: 'A1', name: '초급 · Principiante',
    desc: 'Hangul, 이에요/예요, partículas (은/는 이/가 을/를), números y verbos -아/어요.',
    href: '/practica/coreano/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: '초급+', desc: '과거형 (-았/었어요), verbos irregulares, expresiones de tiempo.', href: '/practica/coreano/a2', available: true, count: '20 temas de gramática' },
  { nivel: 'B1', name: '중급', desc: 'Conectores (-고, -지만, -아서), honoríficos y vocabulario TOPIK II.', href: '/practica/coreano/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: '중고급', desc: '회상, 추측, 양보, 인용, 높임과 담화 연결을 맥락 속에서 선택합니다.', href: '/practica/coreano/b2', available: true, count: '30개 강의 · PDF 90종' },
  { nivel: 'C1', name: '고급', desc: '시제 관점, 양태, 정보 구조, 문어체와 학술적 표현을 정교하게 다룹니다.', href: '/practica/coreano/c1', available: true, count: '30개 강의 · PDF 90종' },
  { nivel: 'C2', name: '숙달', desc: '범위, 다성성, 장르 전환과 편집 교정까지 원어민 수준으로 다듬습니다.', href: '/practica/coreano/c2', available: true, count: '30개 강의 · PDF 90종' },
];

const HERRAMIENTAS = [
  { name: '🔊 Lector Hangul', desc: 'Ciclo de lectura A1–B1 con descomposición de sílabas Hangul y romanización.', href: '/practica/coreano#herramientas', tag: 'En esta página' },
  { name: '🎤 Expresión Oral 1', desc: 'Introducción en coreano: 자기소개 (jagi sogae) con frases guiadas.', href: '/practica/korean-speaking-1', tag: 'Actividad' },
  { name: '📚 Vocabulario', desc: 'Palabras esenciales en coreano organizadas por tema con tarjetas de memoria.', href: '/practica/vocabulario-coreano', tag: 'Actividad' },
];

export default function CoreanoPage() {
  return (
    <>
      <CourseSchema
        name="한국어 문법 A1-C2 — 수준별 완성 과정"
        description="한글, 조사, 시제, 연결 표현, 고급 담화 문법을 A1부터 C2까지 학습하는 한국어 과정입니다."
        url="https://www.idiomaswl.com/practica/coreano"
        educationalLevel="A1,A2,B1,B2,C1,C2"
        teaches="한국어, 한글, TOPIK, 고급 문법"
        inLanguage="ko"
      />
      <LanguageHub
        language="coreano"
        langLabel="🇰🇷 한국어"
        eyebrow="🇰🇷 한국어 · A1-C2"
        title="학습 수준을 선택하세요"
        lead="한글의 원리부터 고급 담화와 문체 조절까지, 수준별 설명과 시각 지도, 충분한 연습으로 한국어 문법을 완성하세요."
        accent="#D6293E"
        levels={NIVELES}
        tools={HERRAMIENTAS}
        toolsEyebrow="Herramientas adicionales"
        beforeLevels={<HistoriasCard lang="coreano" />}
      />
      <KoreanToolsClient />
    </>
  );
}
