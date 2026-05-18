'use client';

import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';
import { playAudio } from '@/lib/storage';

// ── Types ───────────────────────────────────────────────────────────────────────

interface HangulLetter {
  char: string;
  ipa: string;
  spanishAnchor: string;
  example: string;
  exampleMeaning: string;
  note?: string;
  isHard?: boolean;
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
}

interface Props {
  onComplete?: () => void;
}

// ── Stroke & Mnemonic data ───────────────────────────────────────────────────────

const STROKE_DATA: Record<string, { strokes: string[]; mnemonic: string }> = {
  'ㅏ': { strokes: ['| trazo vertical', '— trazo derecho'], mnemonic: 'Un palo de pie con un brazo' },
  'ㅓ': { strokes: ['| trazo vertical', '— trazo izquierdo'], mnemonic: 'Brazo saliendo a la izquierda' },
  'ㅗ': { strokes: ['— trazo horizontal', '| trazo vertical arriba'], mnemonic: 'Cruz con palo arriba' },
  'ㅜ': { strokes: ['— trazo horizontal', '| trazo vertical abajo'], mnemonic: 'Cruz con palo abajo' },
  'ㅡ': { strokes: ['— trazo horizontal'], mnemonic: 'Solo una linea horizontal' },
  'ㅣ': { strokes: ['| trazo vertical'], mnemonic: 'Solo una linea vertical' },
  'ㄴ': { strokes: ['| trazo vertical abajo', '— trazo horizontal derecho'], mnemonic: 'La L espanola' },
  'ㅁ': { strokes: ['| izquierdo', '— arriba', '| derecho', '— abajo'], mnemonic: 'Un cuadrado' },
  'ㄹ': { strokes: ['— arriba', '角 angulo derecha', '— abajo', 'L esquina'], mnemonic: '4 trazos en zigzag' },
  'ㅇ': { strokes: ['○ circulo'], mnemonic: 'Un circulo completo' },
  'ㄱ': { strokes: ['— trazo horizontal', '| trazo vertical'], mnemonic: 'La L invertida' },
  'ㄷ': { strokes: ['— arriba', '| lateral', '— abajo'], mnemonic: 'La C cuadrada' },
  'ㅂ': { strokes: ['| izquierdo', '| derecho', '— arriba', '— abajo con salidas'], mnemonic: '4 trazos — dos palos y dos barras' },
  'ㅅ': { strokes: ['/ trazo izquierdo', '\\ trazo derecho'], mnemonic: 'Una V invertida / acento circunflejo' },
  'ㅈ': { strokes: ['— horizontal arriba', '/ izquierdo', '\\ derecho'], mnemonic: 'ㅅ con sombrero' },
  'ㅎ': { strokes: ['— sombrero', '○ circulo abajo'], mnemonic: 'ㅇ con un sombrero' },
  'ㅋ': { strokes: ['— trazo horizontal', '| vertical', '— trazo medio'], mnemonic: 'ㄱ con una raya extra' },
  'ㅌ': { strokes: ['— arriba', '— medio', '| vertical', '— abajo'], mnemonic: 'ㄷ con raya extra adentro' },
  'ㅍ': { strokes: ['— arriba', '| izquierdo', '| derecho', '— abajo'], mnemonic: 'Dos pilares con techo y suelo' },
  'ㅊ': { strokes: ["' punto arriba", '— horizontal', '/ izquierdo', '\\ derecho'], mnemonic: 'ㅈ con punto en la cima' },
  'ㄲ': { strokes: ['ㄱ doble'], mnemonic: 'Dos ㄱ juntas' },
  'ㄸ': { strokes: ['ㄷ doble'], mnemonic: 'Dos ㄷ juntas' },
  'ㅃ': { strokes: ['ㅂ doble'], mnemonic: 'Dos ㅂ juntas' },
  'ㅆ': { strokes: ['ㅅ doble'], mnemonic: 'Dos ㅅ juntas' },
  'ㅉ': { strokes: ['ㅈ doble'], mnemonic: 'Dos ㅈ juntas' },
};

// ── Families ────────────────────────────────────────────────────────────────────

const FAMILIES: LetterFamily[] = [
  {
    id: 'core-vowels',
    name: 'Vocales esenciales',
    subtitle: 'La base de todo bloque silabico',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    icon: 'A',
    teachingNote: 'Cada vocal se escribe con ㅇ (consonante muda) al inicio. Asi: ㅏ nunca va sola — siempre es 아. Esto permite escribir silabas reales desde el primer momento.',
    letters: [
      { char: 'ㅏ', ipa: '/a/', spanishAnchor: 'como la "a" de "papa"', example: '나', exampleMeaning: 'yo (informal)' },
      { char: 'ㅓ', ipa: '/ʌ/', spanishAnchor: '"o" abierta — boca relajada', example: '어', exampleMeaning: 'bloque eo' },
      { char: 'ㅗ', ipa: '/o/', spanishAnchor: 'como la "o" de "ojo" cerrada', example: '오', exampleMeaning: 'bloque o' },
      { char: 'ㅜ', ipa: '/u/', spanishAnchor: 'como la "u" de "luna"', example: '우', exampleMeaning: 'bloque u' },
      { char: 'ㅡ', ipa: '/ɯ/', spanishAnchor: 'No existe en espanol — la mas dificil', example: '으', exampleMeaning: 'vocal eu', isHard: true, note: 'Pon la boca como para decir "u" pero sin redondear los labios. Aparece en: 글자, 이제, 조금.' },
      { char: 'ㅣ', ipa: '/i/', spanishAnchor: 'como la "i" de "si"', example: '이', exampleMeaning: 'diente / este' },
    ],
  },
  {
    id: 'nasals',
    name: 'Nasales y sonorantes',
    subtitle: 'Las mas faciles — y ㄹ es tu ventaja',
    color: '#6c63ff',
    bg: 'rgba(108,99,255,0.08)',
    icon: 'N',
    teachingNote: '¡ㄹ es tu mayor ventaja! Suena exactamente como la "r" de "pero" o "cara". Los angloparlantes batallan semanas con esto. Para ti es natural.',
    letters: [
      { char: 'ㄴ', ipa: '/n/', spanishAnchor: 'identica a la "n" espanola', example: '나', exampleMeaning: 'yo (informal)' },
      { char: 'ㅁ', ipa: '/m/', spanishAnchor: 'identica a la "m" espanola', example: '뭐', exampleMeaning: '¿que?' },
      { char: 'ㄹ', ipa: '/ɾ/', spanishAnchor: '"r" de "pero", "cara", "mira"', example: '오늘', exampleMeaning: 'hoy', note: 'Entre vocales = tap como en "pero". Al final de silaba suena como "l" espanola.' },
      { char: 'ㅇ', ipa: '∅/ŋ', spanishAnchor: 'Mudo al inicio · "ng" al final', example: '아이', exampleMeaning: 'nino', note: 'Al inicio del bloque es completamente mudo. Al final suena como "ng" de "ring".' },
    ],
  },
  {
    id: 'plain-stops',
    name: 'Oclusivas simples',
    subtitle: 'Nivel 1 de cada familia tripartita',
    color: '#e6930a',
    bg: 'rgba(230,147,10,0.08)',
    icon: 'P',
    teachingNote: 'Cada una tiene dos hermanas: aspirada (+ aire) y tensa (seca, sin aire). Cuando aprendes ㄱ, ya sabes que existen ㅋ y ㄲ — tres por el precio de uno.',
    letters: [
      { char: 'ㄱ', ipa: '/k~g/', spanishAnchor: '"g" suave entre vocales', example: '가요', exampleMeaning: 'voy / vas / va', note: 'Familia: ㄱ (simple) → ㅋ (aspirada) → ㄲ (tensa)' },
      { char: 'ㄷ', ipa: '/t~d/', spanishAnchor: '"d" suave entre vocales', example: '대학교', exampleMeaning: 'universidad', note: 'Familia: ㄷ (simple) → ㅌ (aspirada) → ㄸ (tensa)' },
      { char: 'ㅂ', ipa: '/p~b/', spanishAnchor: '"b" suave entre vocales', example: '보여요', exampleMeaning: 'se ve', note: 'Familia: ㅂ (simple) → ㅍ (aspirada) → ㅃ (tensa)' },
    ],
  },
  {
    id: 'fricatives',
    name: 'Fricativas y africada',
    subtitle: 'Sonidos con anclas claras en espanol',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    icon: 'F',
    teachingNote: 'ㅅ antes de ㅣ suena como "sh". ㅎ es como la "j" espanola suavizada. ㅈ se parece a la "y" argentina.',
    letters: [
      { char: 'ㅅ', ipa: '/s/', spanishAnchor: '"s" espanola (antes de ㅣ → "sh")', example: '사', exampleMeaning: 'sa', note: 'Familia: ㅅ (simple) → ㅆ (tensa)' },
      { char: 'ㅈ', ipa: '/dʑ/', spanishAnchor: 'entre "y" argentina y "ch"', example: '조금', exampleMeaning: 'un poco', note: 'Familia: ㅈ (simple) → ㅊ (aspirada) → ㅉ (tensa)' },
      { char: 'ㅎ', ipa: '/h/', spanishAnchor: '"j" espanola suavizada', example: '학교', exampleMeaning: 'escuela' },
    ],
  },
  {
    id: 'aspirated',
    name: 'Consonantes aspiradas',
    subtitle: 'Con aire — el trazo extra',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    icon: 'H',
    teachingNote: 'Prueba: pon la mano frente a la boca. Di ㅍ. Debes sentir el chorro de aire — como al apagar una vela. Eso es la aspiracion.',
    letters: [
      { char: 'ㅋ', ipa: '/kʰ/', spanishAnchor: '"k" con aire', example: '커피', exampleMeaning: 'cafe', note: 'Hermana aspirada de ㄱ' },
      { char: 'ㅌ', ipa: '/tʰ/', spanishAnchor: '"t" con aire', example: '타다', exampleMeaning: 'montar', note: 'Hermana aspirada de ㄷ' },
      { char: 'ㅍ', ipa: '/pʰ/', spanishAnchor: '"p" con aire', example: '파', exampleMeaning: 'cebolleta', note: 'Hermana aspirada de ㅂ' },
      { char: 'ㅊ', ipa: '/tɕʰ/', spanishAnchor: '"ch" con aire', example: '차', exampleMeaning: 'te / coche', note: 'Hermana aspirada de ㅈ' },
    ],
  },
  {
    id: 'tense',
    name: 'Consonantes tensas',
    subtitle: 'Seco, explosivo, sin aire — el tercer nivel',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    icon: 'T',
    teachingNote: 'No tienen equivalente en espanol. Son el tercer nivel de cada familia. Sin nada de aire, con tension en la garganta. Se aprenden por contraste auditivo.',
    letters: [
      { char: 'ㄲ', ipa: '/k͈/', spanishAnchor: 'k tensa y seca', example: '꽃', exampleMeaning: 'flor', isHard: true },
      { char: 'ㄸ', ipa: '/t͈/', spanishAnchor: 't tensa y seca', example: '땅', exampleMeaning: 'tierra', isHard: true },
      { char: 'ㅃ', ipa: '/p͈/', spanishAnchor: 'p tensa y seca', example: '빨리', exampleMeaning: 'rapido', isHard: true },
      { char: 'ㅆ', ipa: '/s͈/', spanishAnchor: 's tensa', example: '있어요', exampleMeaning: 'hay / tengo', isHard: true },
      { char: 'ㅉ', ipa: '/t͈ɕ/', spanishAnchor: 'ch tensa', example: '짜다', exampleMeaning: 'salado', isHard: true },
    ],
  },
];

// ── Reading pool (Phase B) ───────────────────────────────────────────────────────

const READING_POOL = [
  { syllable: '가', rom: 'ga', options: ['ga', 'na', 'ba', 'da'] },
  { syllable: '나', rom: 'na', options: ['ma', 'na', 'ra', 'la'] },
  { syllable: '다', rom: 'da', options: ['da', 'ba', 'ga', 'ja'] },
  { syllable: '라', rom: 'ra', options: ['la', 'na', 'ra', 'ma'] },
  { syllable: '마', rom: 'ma', options: ['ba', 'ma', 'pa', 'na'] },
  { syllable: '바', rom: 'ba', options: ['ba', 'pa', 'da', 'ga'] },
  { syllable: '사', rom: 'sa', options: ['sa', 'ja', 'ha', 'za'] },
  { syllable: '자', rom: 'ja', options: ['sa', 'cha', 'ja', 'ha'] },
  { syllable: '하', rom: 'ha', options: ['ha', 'sa', 'ja', 'ka'] },
  { syllable: '가요', rom: 'ga-yo', options: ['ga-yo', 'na-yo', 'ba-yo', 'da-yo'] },
  { syllable: '나는', rom: 'na-neun', options: ['na-neun', 'ma-neun', 'ra-neun', 'la-neun'] },
  { syllable: '학교', rom: 'hak-gyo', options: ['hak-gyo', 'hag-kyo', 'hak-ko', 'hak-jo'] },
  { syllable: '오늘', rom: 'o-neul', options: ['o-neul', 'o-reul', 'o-meul', 'u-neul'] },
  { syllable: '어제', rom: 'eo-je', options: ['eo-je', 'o-je', 'eo-se', 'eo-ze'] },
  { syllable: '이제', rom: 'i-je', options: ['i-je', 'i-ge', 'i-ze', 'i-se'] },
  { syllable: '조금', rom: 'jo-geum', options: ['jo-geum', 'zo-geum', 'jo-keum', 'so-geum'] },
  { syllable: '보여요', rom: 'bo-yeo-yo', options: ['bo-yeo-yo', 'po-yeo-yo', 'bo-yo-yo', 'bo-yeo-go'] },
  { syllable: '글자', rom: 'geul-ja', options: ['geul-ja', 'geul-za', 'guel-ja', 'kuel-ja'] },
  { syllable: '저는', rom: 'jeo-neun', options: ['jeo-neun', 'zeo-neun', 'jeo-meun', 'jeo-reun'] },
  { syllable: '뭐', rom: 'mwo', options: ['mwo', 'mo', 'muo', 'mbo'] },
  { syllable: '고', rom: 'go', options: ['go', 'ko', 'no', 'bo'] },
  { syllable: '도', rom: 'do', options: ['do', 'to', 'bo', 'go'] },
  { syllable: '소', rom: 'so', options: ['so', 'zo', 'jo', 'ho'] },
  { syllable: '누', rom: 'nu', options: ['nu', 'mu', 'ru', 'du'] },
  { syllable: '그', rom: 'geu', options: ['geu', 'neu', 'beu', 'seu'] },
];

// ── Stroke quiz (Phase C) ────────────────────────────────────────────────────────

const STROKE_QUIZ = [
  { char: 'ㄱ', question: 'ㄱ se traza primero con...', options: ['trazo vertical', 'trazo horizontal', 'un circulo', 'dos trazos iguales'], correct: 1 },
  { char: 'ㅏ', question: 'ㅏ tiene cuantos trazos?', options: ['1', '2', '3', '4'], correct: 1 },
  { char: 'ㅇ', question: 'ㅇ se dibuja como...', options: ['una L', 'una linea', 'un circulo', 'una X'], correct: 2 },
  { char: 'ㄴ', question: 'ㄴ se parece a...', options: ['la L espanola', 'la C espanola', 'la U espanola', 'la V espanola'], correct: 0 },
  { char: 'ㅜ', question: 'ㅜ tiene el trazo vertical...', options: ['arriba', 'abajo', 'a la izquierda', 'a la derecha'], correct: 1 },
  { char: 'ㅗ', question: 'ㅗ tiene el trazo vertical...', options: ['abajo', 'arriba', 'a la izquierda', 'a la derecha'], correct: 1 },
  { char: 'ㅎ', question: 'ㅎ es ㅇ con...', options: ['un punto', 'un sombrero', 'una raya doble', 'dos circulos'], correct: 1 },
  { char: 'ㄹ', question: 'ㄹ tiene cuantos trazos?', options: ['2', '3', '4', '5'], correct: 2 },
  { char: 'ㅋ', question: 'ㅋ es ㄱ con...', options: ['un punto', 'una raya extra en medio', 'doble trazo', 'un circulo'], correct: 1 },
  { char: 'ㅁ', question: 'ㅁ tiene forma de...', options: ['circulo', 'triangulo', 'cuadrado', 'linea'], correct: 2 },
];

// ── Final test (Phase D) ─────────────────────────────────────────────────────────

const FINAL_TEST = [
  { korean: '학교', rom: 'hak-gyo', meaning: 'escuela',
    roOpts: ['hak-gyo', 'hag-jo', 'kak-gyo', 'hak-ko'],
    meOpts: ['escuela', 'casa', 'ayer', 'ir'] },
  { korean: '어제 집 가요', rom: 'eo-je jip ga-yo', meaning: 'ayer voy a casa',
    roOpts: ['eo-je jip ga-yo', 'o-je jip ga-yo', 'eo-je jib na-yo', 'eo-je jin ga-yo'],
    meOpts: ['ayer voy a casa', 'hoy voy a la escuela', 'ahora voy a casa', 'yo voy ayer'] },
  { korean: '나는 조금 보여요', rom: 'na-neun jo-geum bo-yeo-yo', meaning: 'yo veo un poco',
    roOpts: ['na-neun jo-geum bo-yeo-yo', 'na-nun jo-gum bo-yo-yo', 'na-neun zo-geum po-yeo-yo', 'na-neun jo-geum bo-yo-yo'],
    meOpts: ['yo veo un poco', 'yo entiendo un poco', 'yo como un poco', 'yo escucho un poco'] },
  { korean: '글자가 보여요', rom: 'geul-ja-ga bo-yeo-yo', meaning: 'se ven las letras',
    roOpts: ['geul-ja-ga bo-yeo-yo', 'geul-za-ga bo-yeo-yo', 'geul-ja-na bo-yeo-yo', 'kuel-ja-ga bo-yeo-yo'],
    meOpts: ['se ven las letras', 'se ven los numeros', 'entiendo las letras', 'las letras suenan'] },
  { korean: '이제 글자를 읽어요', rom: 'i-je geul-ja-reul il-geo-yo', meaning: 'ahora leo las letras',
    roOpts: ['i-je geul-ja-reul il-geo-yo', 'i-je geul-ja-reul ir-geo-yo', 'i-ze geul-ja-reul il-geo-yo', 'i-je guel-ja-reul il-geo-yo'],
    meOpts: ['ahora leo las letras', 'ahora escribo las letras', 'ahora veo las letras', 'ya entiendo las letras'] },
];

// ── Helper: shuffle array ────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── LetterCard ──────────────────────────────────────────────────────────────────

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
  const strokeInfo = STROKE_DATA[letter.char];

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
          <div style={{ fontSize: 72, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700, lineHeight: 1 }}>
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
            <span style={{ fontSize: 48, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700, lineHeight: 1 }}>
              {letter.char}
            </span>
            {letter.isHard && (
              <span style={{ fontSize: 10, background: 'rgba(220,38,38,0.1)', color: '#dc2626', borderRadius: 6, padding: '2px 6px', fontWeight: 700 }}>
                dificil
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 6 }}>{letter.spanishAnchor}</div>

          {/* Stroke order */}
          {strokeInfo && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Orden de trazos
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {strokeInfo.strokes.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: color, minWidth: 14 }}>{i + 1}.</span>
                    <span style={{ fontSize: 11, color: 'var(--ink)' }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, padding: '4px 8px', borderRadius: 6, background: `${color}15`, fontSize: 11, color, fontStyle: 'italic' }}>
                {strokeInfo.mnemonic}
              </div>
            </div>
          )}

          {/* Example word */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onTap(letter.example); }}
              style={{ fontSize: 18, fontFamily: "'Noto Sans KR', sans-serif", color, background: 'none', border: `1px solid ${color}40`, borderRadius: 6, padding: '2px 8px', cursor: 'pointer' }}
            >
              {letter.example}
            </button>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{letter.exampleMeaning}</span>
          </div>
          {letter.note && (
            <div style={{ fontSize: 11, color: 'var(--muted)', borderTop: '1px solid var(--line-soft)', paddingTop: 6, marginTop: 4, lineHeight: 1.4 }}>
              {letter.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Exercise A: Reconoce el sonido ──────────────────────────────────────────────

function ExerciseA({
  letters,
  color,
  onPass,
  korean,
}: {
  letters: HangulLetter[];
  color: string;
  onPass: () => void;
  korean: (t: string) => void;
}) {
  const pool = letters.length >= 4 ? letters : [...letters, ...letters].slice(0, 4);
  const [rounds, setRounds] = useState<Array<{ target: HangulLetter; opts: HangulLetter[] }>>(() => {
    return Array.from({ length: 3 }, () => {
      const shuffled = shuffle(pool);
      const target = shuffled[0];
      const opts = shuffle(shuffled.slice(0, 4));
      return { target, opts };
    });
  });
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);

  const current = rounds[round];

  function handlePlay() {
    korean(current.target.char);
  }

  function handleChoose(idx: number) {
    if (chosen !== null) return;
    setChosen(idx);
    if (current.opts[idx].char === current.target.char) {
      setCorrect(c => c + 1);
    }
    setTimeout(() => {
      if (round + 1 >= rounds.length) {
        onPass();
      } else {
        setRound(r => r + 1);
        setChosen(null);
      }
    }, 900);
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12 }}>
        Ejercicio A — Reconoce el sonido ({round + 1}/{rounds.length})
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 14 }}>
        Escucha y elige el caracter correcto:
      </p>
      <button
        type="button"
        onClick={handlePlay}
        style={{ padding: '10px 22px', borderRadius: 8, border: `1.5px solid ${color}`, background: `${color}15`, color, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 18 }}
      >
        Escuchar
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {current.opts.map((opt, i) => {
          const isTarget = opt.char === current.target.char;
          const selected = chosen === i;
          let bg = 'var(--bg)';
          let border = 'var(--line-soft)';
          let textColor = 'var(--ink)';
          if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
          if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
          if (chosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleChoose(i)}
              style={{ fontSize: 40, fontFamily: "'Noto Sans KR', sans-serif", color: textColor, background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: '14px', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s' }}
            >
              {opt.char}
            </button>
          );
        })}
      </div>
      {round >= 1 && <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>Aciertos: {correct}/{round}</div>}
    </div>
  );
}

// ── Exercise B: Lee el caracter ──────────────────────────────────────────────────

function ExerciseB({
  letters,
  color,
  onPass,
}: {
  letters: HangulLetter[];
  color: string;
  onPass: () => void;
}) {
  const [rounds] = useState<Array<{ target: HangulLetter; opts: string[] }>>(() => {
    const pool = letters.length >= 4 ? letters : [...letters, ...letters].slice(0, 4);
    return Array.from({ length: 3 }, () => {
      const shuffled = shuffle(pool);
      const target = shuffled[0];
      const wrongAnchors = shuffled.slice(1, 4).map(l => l.spanishAnchor);
      const opts = shuffle([target.spanishAnchor, ...wrongAnchors]);
      return { target, opts };
    });
  });
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);

  const current = rounds[round];

  function handleChoose(idx: number) {
    if (chosen !== null) return;
    setChosen(idx);
    if (current.opts[idx] === current.target.spanishAnchor) {
      setCorrect(c => c + 1);
    }
    setTimeout(() => {
      if (round + 1 >= rounds.length) {
        onPass();
      } else {
        setRound(r => r + 1);
        setChosen(null);
      }
    }, 900);
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12 }}>
        Ejercicio B — Lee el caracter ({round + 1}/{rounds.length})
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 12 }}>¿Como suena este caracter?</p>
      <div style={{ textAlign: 'center', fontSize: 80, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
        {current.target.char}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {current.opts.map((opt, i) => {
          const isTarget = opt === current.target.spanishAnchor;
          const selected = chosen === i;
          let bg = 'var(--bg)';
          let border = 'var(--line-soft)';
          let textColor = 'var(--ink)';
          if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
          if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
          if (chosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleChoose(i)}
              style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg, color: textColor, fontSize: 13, textAlign: 'left', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s' }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {round >= 1 && <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>Aciertos: {correct}/{round}</div>}
    </div>
  );
}

// ── Exercise C: Forma la silaba ──────────────────────────────────────────────────

const SYLLABLE_PAIRS: Array<{ consonant: string; vowel: string; result: string; distractors: string[] }> = [
  { consonant: 'ㄴ', vowel: 'ㅏ', result: '나', distractors: ['라', '마', '바'] },
  { consonant: 'ㅁ', vowel: 'ㅏ', result: '마', distractors: ['나', '바', '가'] },
  { consonant: 'ㄱ', vowel: 'ㅏ', result: '가', distractors: ['나', '다', '바'] },
  { consonant: 'ㅂ', vowel: 'ㅏ', result: '바', distractors: ['가', '마', '사'] },
  { consonant: 'ㅅ', vowel: 'ㅏ', result: '사', distractors: ['가', '자', '하'] },
  { consonant: 'ㅎ', vowel: 'ㅏ', result: '하', distractors: ['사', '가', '자'] },
  { consonant: 'ㄱ', vowel: 'ㅗ', result: '고', distractors: ['도', '보', '소'] },
  { consonant: 'ㄴ', vowel: 'ㅜ', result: '누', distractors: ['무', '루', '두'] },
];

function ExerciseC({
  familyId,
  color,
  onPass,
}: {
  familyId: string;
  color: string;
  onPass: () => void;
}) {
  // For the first vowel family, show block-form recognition instead
  const isVowelFamily = familyId === 'core-vowels';

  const [rounds] = useState<Array<{ consonant: string; vowel: string; result: string; opts: string[] }>>(() => {
    if (isVowelFamily) {
      // Show vowel blocks: show jamo → pick assembled form
      const vowelPairs = [
        { consonant: 'ㅇ', vowel: 'ㅏ', result: '아', distractors: ['오', '우', '이'] },
        { consonant: 'ㅇ', vowel: 'ㅗ', result: '오', distractors: ['아', '우', '으'] },
      ];
      return vowelPairs.map(p => ({
        consonant: p.consonant,
        vowel: p.vowel,
        result: p.result,
        opts: shuffle([p.result, ...p.distractors]),
      }));
    }
    const selected = shuffle(SYLLABLE_PAIRS).slice(0, 2);
    return selected.map(p => ({
      consonant: p.consonant,
      vowel: p.vowel,
      result: p.result,
      opts: shuffle([p.result, ...p.distractors.slice(0, 3)]),
    }));
  });

  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);

  const current = rounds[round];

  function handleChoose(idx: number) {
    if (chosen !== null) return;
    setChosen(idx);
    setTimeout(() => {
      if (round + 1 >= rounds.length) {
        onPass();
      } else {
        setRound(r => r + 1);
        setChosen(null);
      }
    }, 900);
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12 }}>
        Ejercicio C — Forma la silaba ({round + 1}/{rounds.length})
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 16 }}>
        {isVowelFamily
          ? 'ㅇ (mudo) + vocal forman un bloque. ¿Cual es el resultado?'
          : '¿Que silaba forman estas dos letras juntas?'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, justifyContent: 'center' }}>
        <span style={{ fontSize: 52, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700 }}>{current.consonant}</span>
        <span style={{ fontSize: 22, color: 'var(--muted)' }}>+</span>
        <span style={{ fontSize: 52, fontFamily: "'Noto Sans KR', sans-serif", color, fontWeight: 700 }}>{current.vowel}</span>
        <span style={{ fontSize: 22, color: 'var(--muted)' }}>=</span>
        <span style={{ fontSize: 52, color: 'var(--muted)' }}>?</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {current.opts.map((opt, i) => {
          const isTarget = opt === current.result;
          const selected = chosen === i;
          let bg = 'var(--bg)';
          let border = 'var(--line-soft)';
          let textColor = 'var(--ink)';
          if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
          if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
          if (chosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleChoose(i)}
              style={{ fontSize: 40, fontFamily: "'Noto Sans KR', sans-serif", color: textColor, background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: '14px', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s' }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Phase B: Reading drill ────────────────────────────────────────────────────────

function ReadingDrill({ onComplete, korean }: { onComplete: () => void; korean: (t: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-shuffle all items once on mount so correct answer isn't always index 0
  const [shuffledPool] = useState(() =>
    READING_POOL.map(item => ({
      ...item,
      options: shuffle([...item.options]),
    }))
  );

  const item = shuffledPool[idx];

  function handleChoose(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const isCorrect = item.options[i] === item.rom;
    if (isCorrect) {
      setScore(s => s + 1);
      korean(item.syllable);
    }
    timerRef.current = setTimeout(() => {
      if (idx + 1 >= READING_POOL.length) {
        setDone(true);
      } else {
        setIdx(j => j + 1);
        setChosen(null);
      }
    }, isCorrect ? 800 : 1200);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (done) {
    const pct = Math.round((score / READING_POOL.length) * 100);
    const passed = score >= 18;
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          LECTURA GUIADA — Resultado
        </p>
        <div style={{ fontSize: 56, fontFamily: "'Noto Sans KR', sans-serif", color: passed ? '#2d9b4e' : '#e6930a', marginBottom: 12 }}>
          {passed ? '읽기' : '다시'}
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: passed ? '#2d9b4e' : '#e6930a' }}>
          {score} / {READING_POOL.length} — {pct}%
        </h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
          {passed
            ? '¡Excelente! Puedes leer silabas coreanas basicas con fluidez.'
            : 'Buen intento — sigue practicando y volveras a intentarlo.'}
        </p>
        <button
          type="button"
          onClick={onComplete}
          style={{ background: passed ? '#2d9b4e' : '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Continuar →
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--line-soft)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((idx + 1) / READING_POOL.length) * 100}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{idx + 1} / {READING_POOL.length}</span>
      </div>

      <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        FASE B — Lectura guiada
      </p>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--ink)' }}>¿Como se romaniza esta silaba/palabra?</p>

      <div style={{ textAlign: 'center', fontSize: 80, fontFamily: "'Noto Sans KR', sans-serif", color: '#6c63ff', fontWeight: 700, lineHeight: 1, marginBottom: 28 }}>
        {item.syllable}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {item.options.map((opt, i) => {
          const isTarget = opt === item.rom;
          const selected = chosen === i;
          let bg = 'var(--bg)';
          let border = 'var(--line-soft)';
          let textColor = 'var(--ink)';
          if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
          if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
          if (chosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleChoose(i)}
              style={{ padding: '14px', borderRadius: 10, border: `2px solid ${border}`, background: bg, color: textColor, fontSize: 15, fontWeight: 600, cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'var(--mono)' }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18, fontSize: 12, color: 'var(--muted)' }}>Aciertos: {score}</div>
    </section>
  );
}

// ── Phase C: Stroke quiz ──────────────────────────────────────────────────────────

function StrokeQuiz({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Shuffle options on mount, remapping the correct index so answers aren't predictable
  const [shuffledQuiz] = useState(() =>
    STROKE_QUIZ.map(q => {
      const correctValue = q.options[q.correct];
      const opts = shuffle([...q.options]);
      return { ...q, options: opts, correct: opts.indexOf(correctValue) };
    })
  );

  const item = shuffledQuiz[idx];

  function handleChoose(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === item.correct) setScore(s => s + 1);
  }

  function handleNext() {
    if (idx + 1 >= STROKE_QUIZ.length) {
      setDone(true);
    } else {
      setIdx(j => j + 1);
      setChosen(null);
    }
  }

  if (done) {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          ESCRITURA GUIADA — Resultado
        </p>
        <div style={{ fontSize: 56, fontFamily: "'Noto Sans KR', sans-serif", color: '#6c63ff', marginBottom: 12 }}>쓰기</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{score} / {STROKE_QUIZ.length}</h3>
        <button
          type="button"
          onClick={onComplete}
          style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Continuar →
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--line-soft)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((idx + 1) / STROKE_QUIZ.length) * 100}%`, background: '#e6930a', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{idx + 1} / {STROKE_QUIZ.length}</span>
      </div>

      <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        FASE C — Escritura guiada
      </p>

      <div style={{ textAlign: 'center', fontSize: 88, fontFamily: "'Noto Sans KR', sans-serif", color: '#e6930a', fontWeight: 700, lineHeight: 1, marginBottom: 16 }}>
        {item.char}
      </div>

      <p style={{ fontSize: 15, color: 'var(--ink)', marginBottom: 20, textAlign: 'center', fontWeight: 600 }}>{item.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {item.options.map((opt, i) => {
          const isTarget = i === item.correct;
          const selected = chosen === i;
          let bg = 'var(--bg)';
          let border = 'var(--line-soft)';
          let textColor = 'var(--ink)';
          if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
          if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
          if (chosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleChoose(i)}
              style={{ padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg, color: textColor, fontSize: 14, textAlign: 'left', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.15s' }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <button
          type="button"
          onClick={handleNext}
          style={{ width: '100%', padding: '13px', background: '#e6930a', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {idx + 1 >= STROKE_QUIZ.length ? 'Ver resultado →' : 'Siguiente →'}
        </button>
      )}

      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)' }}>Aciertos: {score}</div>
    </section>
  );
}

// ── Phase D: Final test ───────────────────────────────────────────────────────────

function FinalTest({ onComplete, korean }: { onComplete: () => void; korean: (t: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<'rom' | 'meaning'>('rom');
  const [roChosen, setRoChosen] = useState<number | null>(null);
  const [meChosen, setMeChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = FINAL_TEST[idx];
  const roOpts = useState(() => FINAL_TEST.map(it => it.roOpts))[0];
  const meOpts = useState(() => FINAL_TEST.map(it => it.meOpts))[0];

  function handleRom(i: number) {
    if (roChosen !== null) return;
    setRoChosen(i);
    setTimeout(() => setStep('meaning'), 900);
  }

  function handleMeaning(i: number) {
    if (meChosen !== null) return;
    setMeChosen(i);
    const roCorrect = roChosen !== null && roOpts[idx][roChosen] === item.rom;
    const meCorrect = meOpts[idx][i] === item.meaning;
    if (roCorrect && meCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= FINAL_TEST.length) {
        setDone(true);
      } else {
        setIdx(j => j + 1);
        setStep('rom');
        setRoChosen(null);
        setMeChosen(null);
      }
    }, 900);
  }

  if (done) {
    const passed = score >= 4;
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          PRUEBA FINAL — Resultado
        </p>
        <div style={{ fontSize: 56, fontFamily: "'Noto Sans KR', sans-serif", color: passed ? '#2d9b4e' : '#e6930a', marginBottom: 12 }}>
          {passed ? '완료' : '다시'}
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: passed ? '#2d9b4e' : '#e6930a' }}>
          {score} / {FINAL_TEST.length}
        </h3>
        {passed ? (
          <p style={{ fontSize: 15, color: '#2d9b4e', marginBottom: 24, fontWeight: 600 }}>
            ¡Puedes leer Hangul basico!
          </p>
        ) : (
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
            Casi — repasa las familias y vuelve a intentarlo.
          </p>
        )}
        {passed ? (
          <button
            type="button"
            onClick={onComplete}
            style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Siguiente etapa →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { setIdx(0); setStep('rom'); setRoChosen(null); setMeChosen(null); setScore(0); setDone(false); }}
            style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Reintentar prueba final →
          </button>
        )}
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--line-soft)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((idx + 1) / FINAL_TEST.length) * 100}%`, background: '#7c3aed', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{idx + 1} / {FINAL_TEST.length}</span>
      </div>

      <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        FASE D — Prueba final
      </p>

      <div
        style={{ textAlign: 'center', fontSize: 52, fontFamily: "'Noto Sans KR', sans-serif", color: '#7c3aed', fontWeight: 700, lineHeight: 1, marginBottom: 8, cursor: 'pointer' }}
        onClick={() => korean(item.korean)}
      >
        {item.korean}
      </div>
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginBottom: 20 }}>Toca para escuchar</p>

      {step === 'rom' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--ink)', marginBottom: 14, fontWeight: 600 }}>1 de 2 — ¿Como se romaniza?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {roOpts[idx].map((opt, i) => {
              const isTarget = opt === item.rom;
              const selected = roChosen === i;
              let bg = 'var(--bg)'; let border = 'var(--line-soft)'; let textColor = 'var(--ink)';
              if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
              if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
              if (roChosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
              return (
                <button key={i} type="button" onClick={() => handleRom(i)}
                  style={{ padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg, color: textColor, fontSize: 13, textAlign: 'left', cursor: roChosen !== null ? 'default' : 'pointer', transition: 'all 0.15s', fontFamily: 'var(--mono)' }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}

      {step === 'meaning' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--ink)', marginBottom: 6, fontWeight: 600 }}>2 de 2 — ¿Que significa?</p>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--mono)' }}>{item.rom}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {meOpts[idx].map((opt, i) => {
              const isTarget = opt === item.meaning;
              const selected = meChosen === i;
              let bg = 'var(--bg)'; let border = 'var(--line-soft)'; let textColor = 'var(--ink)';
              if (selected && isTarget) { bg = 'rgba(45,155,78,0.12)'; border = '#2d9b4e'; textColor = '#2d9b4e'; }
              if (selected && !isTarget) { bg = 'rgba(220,38,38,0.08)'; border = '#dc2626'; textColor = '#dc2626'; }
              if (meChosen !== null && !selected && isTarget) { bg = 'rgba(45,155,78,0.08)'; border = '#2d9b4e'; }
              return (
                <button key={i} type="button" onClick={() => handleMeaning(i)}
                  style={{ padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg, color: textColor, fontSize: 13, textAlign: 'left', cursor: meChosen !== null ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div style={{ marginTop: 18, fontSize: 12, color: 'var(--muted)' }}>Aciertos: {score}</div>
    </section>
  );
}

// ── FamilyView: shows letters + 3 exercises ──────────────────────────────────────

type ExerciseStep = 'chars' | 'exA' | 'exB' | 'exC' | 'done';

function FamilyView({
  family,
  familyIndex,
  totalFamilies,
  streak,
  korean,
  onNext,
}: {
  family: LetterFamily;
  familyIndex: number;
  totalFamilies: number;
  streak: number;
  korean: (t: string) => void;
  onNext: () => void;
}) {
  const [step, setStep] = useState<ExerciseStep>('chars');

  function handleLetterTap(example: string) {
    korean(example);
  }

  return (
    <section style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
          Familia {familyIndex + 1} de {totalFamilies}
        </p>
        <StreakBar streak={streak} />
      </div>

      {/* Family header */}
      <div style={{ border: `1.5px solid ${family.color}35`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ background: family.bg, padding: '12px 18px', borderBottom: `1px solid ${family.color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: family.color }}>{family.icon}</span>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: family.color }}>{family.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{family.subtitle}</p>
          </div>
        </div>

        <div style={{ padding: '14px 18px' }}>
          {/* Characters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 14 }}>
            {family.letters.map(l => (
              <LetterCard key={l.char} letter={l} color={family.color} bg={family.bg} onTap={handleLetterTap} />
            ))}
          </div>

          {/* Teaching note */}
          <div style={{ background: `${family.color}10`, border: `1px solid ${family.color}25`, borderRadius: 8, padding: '9px 12px', marginBottom: step !== 'chars' ? 0 : 0 }}>
            <p style={{ margin: 0, fontSize: 12, color: family.color, fontWeight: 700, marginBottom: 3 }}>Nota pedagogica</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{family.teachingNote}</p>
          </div>
        </div>
      </div>

      {/* Exercise area */}
      {step === 'chars' && (
        <button
          type="button"
          onClick={() => setStep('exA')}
          style={{ width: '100%', padding: '13px', background: family.color, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Practicar esta familia →
        </button>
      )}

      {step === 'exA' && (
        <div style={{ border: `1.5px solid ${family.color}30`, borderRadius: 14, padding: '16px 18px', background: 'var(--bg)' }}>
          <ExerciseA letters={family.letters} color={family.color} onPass={() => setStep('exB')} korean={korean} />
        </div>
      )}

      {step === 'exB' && (
        <div style={{ border: `1.5px solid ${family.color}30`, borderRadius: 14, padding: '16px 18px', background: 'var(--bg)' }}>
          <ExerciseB letters={family.letters} color={family.color} onPass={() => setStep('exC')} />
        </div>
      )}

      {step === 'exC' && (
        <div style={{ border: `1.5px solid ${family.color}30`, borderRadius: 14, padding: '16px 18px', background: 'var(--bg)' }}>
          <ExerciseC familyId={family.id} color={family.color} onPass={() => setStep('done')} />
        </div>
      )}

      {step === 'done' && (
        <button
          type="button"
          onClick={onNext}
          style={{ width: '100%', padding: '13px', background: '#2d9b4e', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {familyIndex < totalFamilies - 1 ? 'Siguiente familia →' : 'Continuar — Lectura guiada →'}
        </button>
      )}
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'families' | 'reading' | 'strokes' | 'final' | 'complete';

export default function ContextualInput002({ onComplete }: Props) {
  const { complete } = useSound();
  // Use playAudio so real recordings are preferred over TTS when available
  const korean = playAudio;
  const [phase, setPhase] = useState<Phase>('intro');
  const [familyIdx, setFamilyIdx] = useState(0);
  const [streak, setStreak] = useState(0);

  function handleFamilyNext() {
    setStreak(s => s + 1);
    if (familyIdx + 1 < FAMILIES.length) {
      setFamilyIdx(i => i + 1);
    } else {
      setPhase('reading');
    }
  }

  function handleReadingComplete() {
    setPhase('strokes');
  }

  function handleStrokesComplete() {
    setPhase('final');
  }

  function handleFinalComplete() {
    complete();
    setPhase('complete');
  }

  // ── Intro ──────────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          ETAPA 5 DE 11 · Contexto primero
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          El Hangul completo — organizado como tu cerebro aprende
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          No vamos a seguir el orden del diccionario. Vamos por{' '}
          <strong>familias de sonido</strong> — de las mas faciles para hispanohablantes a las
          mas nuevas. Al final de esta etapa podras leer silabas coreanas basicas.
        </p>

        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {[
            { icon: '블', title: 'Fase A: 6 familias', body: 'Vocales, nasales, oclusivas, fricativas, aspiradas, tensas — con ejercicios en cada una.' },
            { icon: '읽', title: 'Fase B: Lectura guiada', body: '25 silabas — practica leer combinaciones reales con feedback inmediato.' },
            { icon: '쓰', title: 'Fase C: Escritura guiada', body: '10 preguntas sobre orden de trazos — consolida la memoria motora.' },
            { icon: '시', title: 'Fase D: Prueba final', body: '5 palabras reales — demuestra que puedes leer Hangul basico.' },
          ].map(c => (
            <div key={c.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-2)', borderRadius: 10, padding: '12px 14px' }}>
              <span style={{ fontSize: 22, fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
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
          style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
        >
          Explorar el Hangul →
        </button>
      </section>
    );
  }

  // ── Families ───────────────────────────────────────────────────────────────────
  if (phase === 'families') {
    return (
      <FamilyView
        family={FAMILIES[familyIdx]}
        familyIndex={familyIdx}
        totalFamilies={FAMILIES.length}
        streak={streak}
        korean={korean}
        onNext={handleFamilyNext}
      />
    );
  }

  // ── Reading drill ──────────────────────────────────────────────────────────────
  if (phase === 'reading') {
    return <ReadingDrill onComplete={handleReadingComplete} korean={korean} />;
  }

  // ── Stroke quiz ────────────────────────────────────────────────────────────────
  if (phase === 'strokes') {
    return <StrokeQuiz onComplete={handleStrokesComplete} />;
  }

  // ── Final test ─────────────────────────────────────────────────────────────────
  if (phase === 'final') {
    return <FinalTest onComplete={handleFinalComplete} korean={korean} />;
  }

  // ── Complete ───────────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 460, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 64, fontFamily: "'Noto Sans KR', sans-serif", color: '#2d9b4e', marginBottom: 16 }}>한글</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>¡Puedes leer Hangul basico!</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>
        Has completado las 6 familias, la lectura guiada, el repaso de trazos y la prueba final.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
        {FAMILIES.map(f => (
          <span key={f.id} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: `${f.color}15`, color: f.color, fontWeight: 600 }}>
            {f.icon} {f.name}
          </span>
        ))}
      </div>
      {streak > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <StreakBar streak={streak} />
        </div>
      )}
      <button
        type="button"
        onClick={() => onComplete?.()}
        style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
      >
        Siguiente etapa →
      </button>
    </section>
  );
}
