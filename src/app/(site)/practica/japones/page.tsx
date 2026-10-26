import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: '日本語文法 A1-C2 — JLPTと高度運用の完全コース',
  description: 'ひらがなからC2の談話・文体・校閲まで。視覚マップ、段階別練習、テーマ別PDFと実践的な例文で学ぶ日本語文法コースです。基礎から高度な表現まで段階的に復習できます。',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'N5 · Principiante',
    desc: 'Hiragana, Katakana, ～は～です, あります/います, números y vocabulario cotidiano.',
    href: '/practica/japones/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'N4', desc: 'て形、～ている、adjectives い/な, verbos de movimiento, JLPT N4.', href: '/practica/japones/a2', available: true, count: '20 temas de gramática' },
  { nivel: 'B1', name: 'N3', desc: 'Forma ta/nai, kanji N3 (~350 chars), expresiones condicionales.', href: '/practica/japones/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'N2 · 自立運用', desc: '時制、モダリティ、条件、待遇表現、文章構成を文脈の中で選びます。', href: '/practica/japones/b2', available: true, count: '32レッスン · PDF 96種' },
  { nivel: 'C1', name: 'N1 · 高度運用', desc: '高度な文型、情報構造、証拠性、敬語、論証を精密に扱います。', href: '/practica/japones/c1', available: true, count: '36レッスン · PDF 108種' },
  { nivel: 'C2', name: '熟達 · 談話と文体', desc: '視点、含意、専門ジャンル、自然さ、校閲まで統合して磨きます。', href: '/practica/japones/c2', available: true, count: '37レッスン · PDF 111種' },
];

export default function JaponesPage() {
  return (
    <>
      <CourseSchema
        name="日本語文法 A1-C2 — JLPTと高度運用の完全コース"
        description="ひらがな、助詞、活用、N2・N1文法、C2の談話と文体をA1からC2まで学ぶ日本語コースです。"
        url="https://www.idiomaswl.com/practica/japones"
        educationalLevel="A1,A2,B1,B2,C1,C2,N5,N4,N3,N2,N1"
        teaches="日本語, JLPT, ひらがな, カタカナ, 高度文法, 談話"
        inLanguage="ja"
      />
      <LanguageHub
        language="japones"
        langLabel="🇯🇵 Japonés"
        eyebrow="🇯🇵 Japonés / 日本語"
        title="学習レベルを選んでください"
        lead="ひらがな・カタカナの基礎から、N2・N1の高度な文型、C2の談話・文体・校閲まで、説明と練習を積み重ねて日本語を完成させます。"
        accent="#bc002d"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="japones" />}
      />
    </>
  );
}
