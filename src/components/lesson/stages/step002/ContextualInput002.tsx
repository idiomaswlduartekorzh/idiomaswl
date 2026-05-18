'use client';

import { useState } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import MicroChallenge from '@/components/lesson/engine/MicroChallenge';
import StreakBar from '@/components/lesson/engine/StreakBar';
import AnimatedBlock from '@/components/lesson/engine/AnimatedBlock';

// ── Hangul Alphabet — organized by articulatory family (WeLearn method) ────────

interface HangulLetter {
  char: string;
  ipa: string;
  spanishAnchor: string;
  example: string;
  exampleMeaning: string;
  note?: string;
  isHard?: boolean;
}

interface FamilyChallenge {
  question: string;
  options: { label: string; sublabel?: string; isKorean?: boolean }[];
  correctIndex: number;
  explanation: string;
  accent: string;
}

interface LetterFamily {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  bg: string;
  icon: string;
  letters: HangulLetter[];
  teachingNote: string;
  challenge: FamilyChallenge;
}

const FAMILIES: LetterFamily[] = [
  {
    id: 'core-vowels',
    name: 'Vocales esenciales',
    subtitle: 'La base de todo bloque silábico',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    icon: 'A',
    teachingNote: 'Cada vocal se escribe con ㅇ (consonante muda) al inicio. Así: ㅏ nunca va sola — siempre es 아. Esto permite escribir sílabas reales desde el primer momento.',
    letters: [
      { char: 'ㅏ', ipa: '/a/', spanishAnchor: 'como la "a" de "papa"', example: '나', exampleMeaning: 'yo (informal) — ㄴ+ㅏ' },
      { char: 'ㅓ', ipa: '/ʌ/', spanishAnchor: '"o" abierta — boca relajada', example: '어', exampleMeaning: 'bloque ㅇ+ㅓ (eo)' },
      { char: 'ㅗ', ipa: '/o/', spanishAnchor: 'como la "o" de "ojo" — cerrada', example: '오', exampleMeaning: 'bloque ㅇ+ㅗ (o)' },
      { char: 'ㅜ', ipa: '/u/', spanishAnchor: 'como la "u" de "luna"', example: '우', exampleMeaning: 'bloque ㅇ+ㅜ (u)' },
      { char: 'ㅡ', ipa: '/ɯ/', spanishAnchor: 'No existe en español — la más difícil', example: '으', exampleMeaning: 'vocal ㅡ en bloque (eu)', isHard: true, note: 'Pon la boca como para decir "u" pero sin redondear los labios. Dientes ligeramente juntos. Aparece en: 글자 (geul-ja), 이제 (i-je), 조금 (jo-geum).' },
      { char: 'ㅣ', ipa: '/i/', spanishAnchor: 'como la "i" de "sí"', example: '이', exampleMeaning: 'diente / este (블록: ㅇ+ㅣ)' },
    ],
    challenge: {
      question: '¿Cuál de estas vocales NO tiene equivalente en español?',
      options: [
        { label: 'ㅏ', isKorean: true, sublabel: '/a/' },
        { label: 'ㅗ', isKorean: true, sublabel: '/o/' },
        { label: 'ㅡ', isKorean: true, sublabel: '/ɯ/' },
      ],
      correctIndex: 2,
      accent: '#059669',
      explanation: 'ㅡ /ɯ/ no existe en español. Boca abierta como para "u" pero sin redondear los labios.',
    },
  },
  {
    id: 'nasals',
    name: 'Nasales y sonorantes',
    subtitle: 'Las más fáciles — y ㄹ es tu ventaja',
    color: '#6c63ff',
    bg: 'rgba(108,99,255,0.08)',
    icon: 'N',
    teachingNote: '¡ㄹ es tu mayor ventaja! Suena exactamente como la "r" de "pero" o "cara" — no la "rr" de "perro". Los angloparlantes batallan semanas con esto. Para ti es natural.',
    letters: [
      { char: 'ㄴ', ipa: '/n/', spanishAnchor: 'idéntica a la "n" española', example: '나', exampleMeaning: 'yo (informal)' },
      { char: 'ㅁ', ipa: '/m/', spanishAnchor: 'idéntica a la "m" española', example: '뭐', exampleMeaning: '¿qué?' },
      { char: 'ㄹ', ipa: '/ɾ/', spanishAnchor: '"r" de "pero", "cara", "mira"', example: '오늘', exampleMeaning: 'hoy (ㄹ al final → /l/)', note: 'Entre vocales = tap /ɾ/ como en "pero". Al final de sílaba suena como "l" española.' },
      { char: 'ㅇ', ipa: '∅ / /ŋ/', spanishAnchor: 'Mudo al inicio · "ng" al final', example: '아이', exampleMeaning: 'niño', note: 'Al inicio del bloque es completamente mudo — solo un marcador visual. Al final suena como "ng" de "ring".' },
    ],
    challenge: {
      question: 'ㄹ entre vocales (p.ej. en 오늘) suena como la "r" de...',
      options: [
        { label: '"perro"', sublabel: 'vibrante múltiple /r/' },
        { label: '"libro"', sublabel: 'lateral /l/' },
        { label: '"pero"', sublabel: 'tap /ɾ/' },
      ],
      correctIndex: 2,
      accent: '#6c63ff',
      explanation: 'El tap /ɾ/ de "pero", "cara", "loro" — exactamente como ㄹ entre vocales. ¡Tu mayor ventaja como hispanohablante!',
    },
  },
  {
    id: 'plain-stops',
    name: 'Oclusivas simples',
    subtitle: 'Nivel 1 de cada familia tripartita',
    color: '#e6930a',
    bg: 'rgba(230,147,10,0.08)',
    icon: 'P',
    teachingNote: 'Cada una tiene dos hermanas: una aspirada (+ aire) y una tensa (seca, sin aire). Cuando aprendes ㄱ, ya sabes que existen ㅋ y ㄲ — tres por el precio de uno.',
    letters: [
      { char: 'ㄱ', ipa: '/k~g/', spanishAnchor: '"g" suave entre vocales', example: '가요', exampleMeaning: 'voy / vas / va', note: 'Familia: ㄱ (simple) → ㅋ (aspirada) → ㄲ (tensa)' },
      { char: 'ㄷ', ipa: '/t~d/', spanishAnchor: '"d" suave entre vocales', example: '대학교', exampleMeaning: 'universidad', note: 'Familia: ㄷ (simple) → ㅌ (aspirada) → ㄸ (tensa)' },
      { char: 'ㅂ', ipa: '/p~b/', spanishAnchor: '"b" suave entre vocales', example: '보여요', exampleMeaning: 'se ve', note: 'Familia: ㅂ (simple) → ㅍ (aspirada) → ㅃ (tensa)' },
    ],
    challenge: {
      question: '¿Cuántos niveles tiene cada familia de oclusivas?',
      options: [
        { label: '2 (simple + aspirada)' },
        { label: '3 (simple + aspirada + tensa)' },
        { label: '4 niveles' },
      ],
      correctIndex: 1,
      accent: '#e6930a',
      explanation: 'Cada oclusiva tiene hermana aspirada (+ aire) y tensa (seca). ㄱ → ㅋ → ㄲ.',
    },
  },
  {
    id: 'fricatives',
    name: 'Fricativas y africada',
    subtitle: 'Sonidos con anclas claras en español',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    icon: 'F',
    teachingNote: 'ㅅ antes de ㅣ o vocales "y" suena como "sh". ㅎ es como la "j" española suavizada. ㅈ se parece a la "y" argentina ("yo" → "sho").',
    letters: [
      { char: 'ㅅ', ipa: '/s/', spanishAnchor: '"s" española (antes de ㅣ → "sh")', example: '시간', exampleMeaning: 'tiempo', note: 'Familia: ㅅ (simple) → no hay aspirada → ㅆ (tensa)' },
      { char: 'ㅈ', ipa: '/dʑ/', spanishAnchor: 'entre "y" argentina y "ch"', example: '조금', exampleMeaning: 'un poco', note: 'Familia: ㅈ (simple) → ㅊ (aspirada) → ㅉ (tensa)' },
      { char: 'ㅎ', ipa: '/h/', spanishAnchor: '"j" española suavizada', example: '학교', exampleMeaning: 'escuela' },
    ],
    challenge: {
      question: 'ㅎ se parece a...',
      options: [
        { label: 'la "j" española', sublabel: 'velar fricativa' },
        { label: 'la "h" muda inglesa' },
        { label: 'la "f" española' },
      ],
      correctIndex: 0,
      accent: '#0891b2',
      explanation: 'ㅎ es una fricativa velar/glotal — como la "j" de "jota" pero más suave.',
    },
  },
  {
    id: 'aspirated',
    name: 'Consonantes aspiradas',
    subtitle: 'Con aire — la raya/trazo extra',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    icon: 'H',
    teachingNote: 'Prueba: pon la mano frente a la boca. Di ㅍ. Debes sentir el chorro de aire — como al apagar una vela. Eso es la aspiración. El español NO tiene este contraste fonémico.',
    letters: [
      { char: 'ㅋ', ipa: '/kʰ/', spanishAnchor: '"k" con aire', example: '커피', exampleMeaning: 'café', note: 'Hermana aspirada de ㄱ' },
      { char: 'ㅌ', ipa: '/tʰ/', spanishAnchor: '"t" con aire', example: '타다', exampleMeaning: 'montar', note: 'Hermana aspirada de ㄷ' },
      { char: 'ㅍ', ipa: '/pʰ/', spanishAnchor: '"p" con aire', example: '파', exampleMeaning: 'cebolleta', note: 'Hermana aspirada de ㅂ' },
      { char: 'ㅊ', ipa: '/tɕʰ/', spanishAnchor: '"ch" con aire', example: '차', exampleMeaning: 'té / coche', note: 'Hermana aspirada de ㅈ' },
    ],
    challenge: {
      question: 'Para pronunciar ㅍ correctamente debes...',
      options: [
        { label: 'Tensar la garganta, sin aire' },
        { label: 'Soplar aire al pronunciar', sublabel: 'como apagar una vela' },
        { label: 'Pronunciar igual que ㅂ' },
      ],
      correctIndex: 1,
      accent: '#dc2626',
      explanation: 'Las aspiradas requieren un chorro de aire audible. Pon la mano frente a la boca — debes sentirlo.',
    },
  },
  {
    id: 'tense',
    name: 'Consonantes tensas',
    subtitle: 'Seco, explosivo, sin aire — el tercer nivel',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    icon: 'T',
    teachingNote: 'No tienen equivalente en español. Son el tercer nivel de cada familia. La clave: sin nada de aire, con tensión en la garganta. Aprende a distinguirlas por contraste auditivo, no por descripción articulatoria.',
    letters: [
      { char: 'ㄲ', ipa: '/k͈/', spanishAnchor: 'Sin equivalente — k tensa y seca', example: '꽃', exampleMeaning: 'flor', isHard: true },
      { char: 'ㄸ', ipa: '/t͈/', spanishAnchor: 'Sin equivalente — t tensa y seca', example: '땅', exampleMeaning: 'tierra', isHard: true },
      { char: 'ㅃ', ipa: '/p͈/', spanishAnchor: 'Sin equivalente — p tensa y seca', example: '빨리', exampleMeaning: 'rápido', isHard: true },
      { char: 'ㅆ', ipa: '/s͈/', spanishAnchor: 'Sin equivalente — s tensa', example: '있어요', exampleMeaning: 'hay / tengo', isHard: true },
      { char: 'ㅉ', ipa: '/t͈ɕ/', spanishAnchor: 'Sin equivalente — ch tensa', example: '짜다', exampleMeaning: 'salado', isHard: true },
    ],
    challenge: {
      question: 'Las consonantes tensas (ㄲ ㄸ ㅃ)...',
      options: [
        { label: 'Tienen equivalente directo en español' },
        { label: 'Son iguales a las aspiradas' },
        { label: 'No tienen equivalente en español', sublabel: 'se aprenden por contraste auditivo' },
      ],
      correctIndex: 2,
      accent: '#7c3aed',
      explanation: 'Las tensas son el mayor reto para hispanohablantes — no existen en español. Se aprenden escuchando pares mínimos.',
    },
  },
];

// ── LetterCard ─────────────────────────────────────────────────────────────────

function LetterCard({
  letter,
  color,
  bg,
  onTap,
}: {
  letter: HangulLetter;
  color: string;
  bg: string;
  onTap: (example: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    setFlipped(f => !f);
    onTap(letter.example);
  }

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        borderRadius: 12,
        border: `1.5px solid ${flipped ? color : 'var(--line-soft)'}`,
        background: flipped ? bg : 'var(--bg)',
        padding: '14px 12px',
        transition: 'all 0.2s',
        minWidth: 100,
      }}
    >
      {!flipped ? (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 52,
              fontFamily: "'Noto Sans KR', sans-serif",
              color,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {letter.char}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--mono)' }}>
            {letter.ipa}
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, opacity: 0.6 }}>toca →</div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 36, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700 }}>
              {letter.char}
            </span>
            {letter.isHard && (
              <span
                style={{
                  fontSize: 10,
                  background: 'rgba(220,38,38,0.1)',
                  color: '#dc2626',
                  borderRadius: 6,
                  padding: '2px 6px',
                  fontWeight: 700,
                }}
              >
                difícil
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 4 }}>{letter.spanishAnchor}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onTap(letter.example);
              }}
              style={{
                fontSize: 18,
                fontFamily: "'Noto Sans KR', sans-serif",
                color,
                background: 'none',
                border: `1px solid ${color}40`,
                borderRadius: 6,
                padding: '2px 8px',
                cursor: 'pointer',
              }}
            >
              {letter.example}
            </button>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{letter.exampleMeaning}</span>
          </div>
          {letter.note && (
            <div
              style={{
                fontSize: 11,
                color: 'var(--muted)',
                borderTop: '1px solid var(--line-soft)',
                paddingTop: 6,
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {letter.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  onComplete?: () => void;
}

export default function ContextualInput002({ onComplete }: Props) {
  const { korean } = useSound();

  const [activeFamily, setActiveFamily] = useState(0);
  const [seenFamilies, setSeenFamilies] = useState<Set<number>>(new Set([0]));
  const [phase, setPhase] = useState<'intro' | 'families' | 'challenge' | 'blockDemo' | 'done'>('intro');

  // streak across all family challenges
  const [streak, setStreak] = useState(0);

  // blockDemo sub-steps: 0 = first AnimatedBlock running, 1 = second running, 2 = both done
  const [demoStep, setDemoStep] = useState<0 | 1 | 2>(0);

  const family = FAMILIES[activeFamily];

  function goToFamily(i: number) {
    setActiveFamily(i);
    setSeenFamilies(prev => {
      const s = new Set(prev);
      s.add(i);
      return s;
    });
  }

  function handleLetterTap(example: string) {
    korean(example);
  }

  function handleFamilyNext() {
    // Show the challenge for the current family before advancing
    setPhase('challenge');
  }

  function handleChallengePass() {
    setStreak(s => s + 1);
    if (activeFamily < FAMILIES.length - 1) {
      goToFamily(activeFamily + 1);
      setPhase('families');
    } else {
      setPhase('blockDemo');
      setDemoStep(0);
    }
  }

  // ── Intro ───────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '2rem 1rem' }}>
        <p
          style={{
            margin: '0 0 6px',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            fontWeight: 700,
          }}
        >
          ETAPA 5 DE 11 · Contexto primero
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          El Hangul completo — organizado como tu cerebro aprende
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          No vamos a seguir el orden del diccionario. Vamos por{' '}
          <strong>familias de sonido</strong> — de las más fáciles para hispanohablantes a las
          más nuevas. Toca cada letra para verla en acción.
        </p>

        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {[
            {
              icon: '블',
              title: 'Bloques, no línea',
              body: 'Las letras se agrupan en cuadrados silábicos. Cada cuadrado = una sílaba.',
            },
            {
              icon: '6',
              title: '6 familias articulatorias',
              body: 'Vocales → Nasales → Oclusivas → Fricativas → Aspiradas → Tensas.',
            },
            {
              icon: 'Es',
              title: 'Anclas en español',
              body: 'ㄴ=n, ㅁ=m, ㄹ=r-suave, ㅅ=s, ㅎ=j-suave. Ya tienes la mitad del alfabeto.',
            },
          ].map(c => (
            <div
              key={c.title}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                background: 'var(--bg-2)',
                borderRadius: 10,
                padding: '12px 14px',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPhase('families')}
          style={{
            background: '#6c63ff',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '14px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Explorar el Hangul →
        </button>
      </section>
    );
  }

  // ── Family Challenge ─────────────────────────────────────────────────────────
  if (phase === 'challenge') {
    const ch = family.challenge;
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <p
              style={{
                margin: '0 0 4px',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: family.color,
                fontWeight: 700,
              }}
            >
              {family.icon} {family.name} — Comprobación rápida
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
              Familia {activeFamily + 1} de {FAMILIES.length}
            </p>
          </div>
          <StreakBar streak={streak} />
        </div>

        <div
          style={{
            background: 'var(--bg)',
            border: `1.5px solid ${family.color}30`,
            borderRadius: 14,
            padding: '20px 18px',
          }}
        >
          <MicroChallenge
            question={ch.question}
            options={ch.options}
            correctIndex={ch.correctIndex}
            explanation={ch.explanation}
            accent={ch.accent}
            autoAdvanceMs={0}
            onPass={handleChallengePass}
          />
        </div>
      </section>
    );
  }

  // ── Block Demo ───────────────────────────────────────────────────────────────
  if (phase === 'blockDemo') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
            Cómo se construye un bloque silábico
          </h3>
          <StreakBar streak={streak} />
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 28, lineHeight: 1.5 }}>
          Las letras Hangul no van en línea — se ensamblan en un cuadrado. Consonante + vocal
          forman una sílaba. Si hay consonante final (받침), va debajo.
        </p>

        {/* Demo 1: 나 = ㄴ + ㅏ */}
        <div
          style={{
            background: 'var(--bg-2)',
            borderRadius: 14,
            padding: '22px 20px',
            marginBottom: 14,
          }}
        >
          <p
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            BLOQUE SIMPLE — ㄴ + ㅏ = 나 (yo, informal)
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <AnimatedBlock
              consonant="ㄴ"
              vowel="ㅏ"
              result="나"
              size="md"
              color="#6c63ff"
              autoPlay={demoStep === 0}
              showResult={demoStep > 0}
              onComplete={() => setDemoStep(1)}
            />
            {demoStep === 0 && (
              <p style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 200 }}>
                ㄴ entra desde arriba, ㅏ desde la derecha...
              </p>
            )}
          </div>
        </div>

        {/* Demo 2: 글 = ㄱ + ㅡ + ㄹ — shown after demo 1 completes */}
        {demoStep >= 1 && (
          <div
            style={{
              background: 'var(--bg-2)',
              borderRadius: 14,
              padding: '22px 20px',
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              BLOQUE CON 받침 — ㄱ + ㅡ + ㄹ = 글 (letras)
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <AnimatedBlock
                consonant="ㄱ"
                vowel="ㅡ"
                batchim="ㄹ"
                result="글"
                size="md"
                color="#e6930a"
                autoPlay={demoStep === 1}
                showResult={demoStep > 1}
                onComplete={() => setDemoStep(2)}
              />
              {demoStep === 1 && (
                <p style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 200 }}>
                  El ㄹ final (받침) va debajo del bloque.
                </p>
              )}
            </div>
            {demoStep >= 2 && (
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
                글자 = [글] + [자] → "letras / caracteres" — ¡ya conoces esta palabra del podcast!
              </p>
            )}
          </div>
        )}

        {demoStep >= 2 && (
          <button
            type="button"
            onClick={() => setPhase('done')}
            style={{
              background: '#2d9b4e',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '14px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Entendí los bloques — Continuar →
          </button>
        )}
      </section>
    );
  }

  // ── Done ─────────────────────────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <section style={{ maxWidth: 460, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 12, fontFamily: "'Noto Sans KR', sans-serif", color: '#6c63ff' }}>한</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Tienes el mapa completo del Hangul</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
          {FAMILIES.map(f => (
            <span
              key={f.id}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 100,
                background: `${f.color}15`,
                color: f.color,
                fontWeight: 600,
              }}
            >
              {f.icon} {f.name}
            </span>
          ))}
        </div>
        {streak >= 2 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <StreakBar streak={streak} />
          </div>
        )}
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
          Has visto las 6 familias y cómo se construyen bloques. En las siguientes etapas
          empezarás a usar todo esto en frases reales.
        </p>
        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{
            background: '#2d9b4e',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '14px 28px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Siguiente etapa →
        </button>
      </section>
    );
  }

  // ── Families phase ───────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top bar: progress + streak */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
          Familia {activeFamily + 1} de {FAMILIES.length} · {seenFamilies.size}/{FAMILIES.length} exploradas
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StreakBar streak={streak} />
          <div style={{ display: 'flex', gap: 5 }}>
            {FAMILIES.map((f, i) => (
              <div
                key={f.id}
                title={f.name}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: seenFamilies.has(i) ? f.color : 'var(--line-soft)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onClick={() => goToFamily(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Family selector tabs */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 18, flexWrap: 'wrap' }}>
        {FAMILIES.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => goToFamily(i)}
            style={{
              padding: '5px 11px',
              borderRadius: 8,
              border: `1.5px solid ${activeFamily === i ? f.color : 'var(--line-soft)'}`,
              background: activeFamily === i ? f.bg : 'var(--bg)',
              color: activeFamily === i ? f.color : 'var(--muted)',
              fontSize: 11,
              fontWeight: activeFamily === i ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {f.icon} {f.name} {seenFamilies.has(i) && activeFamily !== i ? '✓' : ''}
          </button>
        ))}
      </div>

      {/* Active family card */}
      <div
        style={{
          border: `1.5px solid ${family.color}35`,
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: family.bg,
            padding: '14px 18px',
            borderBottom: `1px solid ${family.color}20`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{family.icon}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: family.color }}>
                {family.name}
              </h3>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{family.subtitle}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 18px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
              gap: 8,
              marginBottom: 12,
            }}
          >
            {family.letters.map(l => (
              <LetterCard
                key={l.char}
                letter={l}
                color={family.color}
                bg={family.bg}
                onTap={handleLetterTap}
              />
            ))}
          </div>
          <div
            style={{
              background: `${family.color}10`,
              border: `1px solid ${family.color}25`,
              borderRadius: 8,
              padding: '9px 12px',
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: family.color, fontWeight: 700, marginBottom: 3 }}>
              Nota pedagógica
            </p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
              {family.teachingNote}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => goToFamily(Math.max(0, activeFamily - 1))}
          disabled={activeFamily === 0}
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 8,
            padding: '10px 16px',
            fontSize: 13,
            color: activeFamily === 0 ? 'var(--muted)' : 'var(--ink)',
            cursor: activeFamily === 0 ? 'not-allowed' : 'pointer',
            opacity: activeFamily === 0 ? 0.5 : 1,
          }}
        >
          ← Anterior
        </button>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={handleFamilyNext}
          style={{
            background: family.color,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {activeFamily < FAMILIES.length - 1 ? 'Siguiente familia →' : 'Ver cómo se forman los bloques →'}
        </button>
      </div>
    </section>
  );
}
