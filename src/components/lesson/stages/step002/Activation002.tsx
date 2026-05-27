'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { KR_AUDIO_002, KR_IMG_002, KR_PODCAST_002, KR_VIDEO_002 } from '@/lib/storage';

// ─── Types ────────────────────────────────────────────────────────────────────
interface VocabItem {
  id: string; at: number; hangul: string; romanization: string;
  translation: string; color: string; img: string;
}
interface ConceptItem {
  id: string; at: number; icon: string; color: string; title: string;
  body: string;
  /** optional example pair */
  example?: { label: string; items: { kr: string; rom: string; note: string }[] };
  /** optional Hangul grid (vowels / consonants) */
  grid?: { kr: string; rom: string; note?: string }[];
  /** optional block decomposition demo */
  block?: { syllable: string; parts: { kr: string; role: string }[] };
}
interface Chip { word: string; idx: number; kr?: boolean; trap?: boolean; sub?: string; }
interface ExerciseItem {
  id: string; at: number; type: 'drag' | 'choice' | 'match'; title: string; question: string;
  source?: string; speak?: string; hint?: string;
  chips?: Chip[]; correctOrder?: number[];
  choices?: { label: string; correct: boolean; note?: string; kr?: boolean }[];
  pairs?: { kr: string; es: string }[];
  feedback: { ok: string; err: string };
}

// ─── Timeline Data ─────────────────────────────────────────────────────────────
// Vocab: words that appear tied to PODCAST timestamps
// Podcast = 6:46 · these timestamps match when each word is introduced in the audio
const VOCAB_TIMELINE: VocabItem[] = [
  { id: 'V1', at: 8,   hangul: '글자',  romanization: 'geulja',  translation: 'letras / caracteres', color: '#6c63ff', img: KR_IMG_002.letters },
  { id: 'V2', at: 65,  hangul: '오늘',  romanization: 'oneul',   translation: 'hoy',                 color: '#60a5fa', img: KR_IMG_002.today   }, // 1:05 — ㅗ en 오늘
  { id: 'V3', at: 97,  hangul: '어제',  romanization: 'eoje',    translation: 'ayer',                color: '#ff6b6b', img: KR_IMG_002.yesterday }, // 1:37 — ㅓ en 어제
  { id: 'V4', at: 120, hangul: '이제',  romanization: 'ije',     translation: 'ahora / a partir de ahora', color: '#34d399', img: KR_IMG_002.now }, // 2:00 — ㅡ en 이제
  { id: 'V5', at: 175, hangul: '뭐',    romanization: 'mwo',     translation: '¿qué?',               color: '#fb7185', img: KR_IMG_002.what    }, // 2:55 — ㅝ diptongo
  { id: 'V6', at: 330, hangul: '조금',  romanization: 'jogeum',  translation: 'un poco',             color: '#a78bfa', img: KR_IMG_002.little  }, // 5:30 — frase final
  { id: 'V7', at: 345, hangul: '보여요', romanization: 'boyeoyo', translation: 'se ve / puedo ver',  color: '#f59e0b', img: KR_IMG_002.see     }, // 5:45 — frase final
];

// Concepts: explanations that pop in at specific timestamps
const CONCEPT_TIMELINE: ConceptItem[] = [
  {
    id: 'C1', at: 15, icon: '👑', color: '#6c63ff',
    title: 'Rey Sejong inventó el Hangul (1446)',
    body: 'El Hangul fue diseñado científicamente. Cada símbolo imita la forma que hace la boca al pronunciarlo. No es aleatorio — es ingenioso.',
    example: { label: '세종대왕 · 1446', items: [{ kr: '한글', rom: 'Han-geul', note: 'Gran escritura' }] },
  },
  {
    id: 'C2', at: 65, icon: '🎵', color: '#34d399',
    title: 'Vocales iguales al español: ㅏ ㅣ ㅜ',
    body: 'Tres vocales suenan exactamente como en español. Ya sabes pronunciarlas.',
    grid: [
      { kr: 'ㅏ', rom: 'a', note: 'como "a" en "casa"' },
      { kr: 'ㅣ', rom: 'i', note: 'como "i" en "sí"' },
      { kr: 'ㅜ', rom: 'u', note: 'como "u" en "luna"' },
    ],
  },
  {
    id: 'C3', at: 80, icon: '🔀', color: '#ff6b6b',
    title: 'Dos letras E: ㅔ vs ㅐ',
    body: 'Técnicamente distintas, en la práctica los coreanos jóvenes las pronuncian igual. No te preocupes.',
    grid: [
      { kr: 'ㅔ', rom: 'e', note: 'como "e" en "mesa"' },
      { kr: 'ㅐ', rom: 'ae', note: 'suena igual que ㅔ hoy día' },
    ],
  },
  {
    id: 'C4', at: 97, icon: '⭕', color: '#f59e0b',
    title: 'Dos letras O: ㅗ vs ㅓ',
    body: 'ㅗ es la O cerrada (boca redonda). ㅓ es la O abierta — como si dijeras "oh" con la boca más relajada.',
    grid: [
      { kr: 'ㅗ', rom: 'o', note: 'O cerrada — "오늘" (hoy)' },
      { kr: 'ㅓ', rom: 'eo', note: 'O abierta — "어제" (ayer)' },
    ],
  },
  {
    id: 'C5', at: 120, icon: '😬', color: '#a78bfa',
    title: 'La vocal difícil: ㅡ',
    body: 'No existe en español. Aprieta los dientes, estira los labios hacia los lados, y di "uh" sin mover los labios. Sale ㅡ.',
    example: { label: 'Aparece en palabras clave', items: [
      { kr: '이제', rom: 'ije', note: 'ahora' },
      { kr: '으', rom: 'eu', note: 'partícula informal' },
    ]},
  },
  {
    id: 'C6', at: 158, icon: '🧱', color: '#60a5fa',
    title: 'Se lee en bloques silábicos',
    body: 'Las letras se agrupan en cuadrados. Cada cuadrado = una sílaba. No se leen en fila como el español.',
    block: {
      syllable: '학교',
      parts: [
        { kr: '학', role: 'sílaba 1: h + a + k' },
        { kr: '교', role: 'sílaba 2: g + yo' },
      ],
    },
  },
  {
    id: 'C7', at: 175, icon: '🔵', color: '#14b8a6',
    title: 'El círculo mudo: ㅇ',
    body: 'Al inicio de sílaba, ㅇ no suena — es solo un "placeholder" visual. Al final de sílaba, suena como "ng" (como en "dingo").',
    grid: [
      { kr: 'ㅇ + ㅏ', rom: '= "a"', note: 'al inicio no suena' },
      { kr: '방', rom: 'bang', note: 'al final suena "ng"' },
    ],
  },
  {
    id: 'C8', at: 255, icon: '💨', color: '#f97316',
    title: 'Consonantes aspiradas (raya extra = aire)',
    body: 'Una raya extra en la consonante = un soplo de aire extra. Pon la mano frente a la boca — debes sentir el aire.',
    grid: [
      { kr: 'ㅋ', rom: 'k (aspirada)', note: 'vs ㄱ (sin aire)' },
      { kr: 'ㅌ', rom: 't (aspirada)', note: 'vs ㄷ (sin aire)' },
      { kr: 'ㅍ', rom: 'p (aspirada)', note: 'vs ㅂ (sin aire)' },
      { kr: 'ㅊ', rom: 'ch (aspirada)', note: 'vs ㅈ (sin aire)' },
    ],
  },
  {
    id: 'C9', at: 275, icon: '💥', color: '#dc2626',
    title: 'Consonantes dobles (tensas y explosivas)',
    body: 'Se escriben dobles, se pronuncian apretando la garganta — como una explosión contenida. Sin aire, sin suavidad.',
    grid: [
      { kr: 'ㄲ', rom: 'kk', note: 'tensa' },
      { kr: 'ㄸ', rom: 'tt', note: 'tensa' },
      { kr: 'ㅃ', rom: 'pp', note: 'tensa' },
      { kr: 'ㅆ', rom: 'ss', note: 'tensa' },
      { kr: 'ㅉ', rom: 'jj', note: 'tensa' },
    ],
  },
  {
    id: 'C10', at: 330, icon: '🌀', color: '#7c3aed',
    title: 'Los tres "wi" que suenan parecido',
    body: 'Tres diptongos que se parecen mucho. ㅚ es el más raro — labios redondeados + vocal delantera. En la práctica, suenan casi igual.',
    grid: [
      { kr: 'ㅘ', rom: 'wa', note: 'como "wa" en "wafle"' },
      { kr: 'ㅙ', rom: 'wae', note: 'como "we" en "web"' },
      { kr: 'ㅚ', rom: 'oe', note: 'labios redondeados + "e"' },
    ],
  },
];

// Exercises
const EXERCISE_TIMELINE: ExerciseItem[] = [
  {
    id: 'E1', at: 50, type: 'choice', title: '¿Qué significa 글자?',
    question: 'Acabas de escuchar "글자". ¿Qué significa?',
    choices: [
      { label: 'Letras / caracteres', correct: true },
      { label: 'Ayer', correct: false },
      { label: 'Escuela', correct: false },
      { label: 'Ver', correct: false },
    ],
    feedback: { ok: '✅ ¡Exacto! 글자 = letras. Es la palabra que describes este sistema de escritura.', err: '❌ 글자 significa "letras" o "caracteres". Aparece a los 0:04 del video.' },
  },
  {
    id: 'E2', at: 130, type: 'choice', title: 'Identifica la vocal ㅡ',
    question: '¿Cuál de estas palabras contiene la vocal difícil ㅡ?',
    choices: [
      { label: '이제 (ije)', correct: true, kr: true, note: 'tiene ㅡ' },
      { label: '어제 (eoje)', correct: false, kr: true },
      { label: '오늘 (oneul)', correct: false, kr: true },
      { label: '보여요 (boyeoyo)', correct: false, kr: true },
    ],
    feedback: { ok: '✅ ¡Bien! 이제 contiene ㅡ en 제. Aprieta los dientes y di "eu" — sin mover los labios.', err: '❌ La vocal ㅡ está en 이제 (ije) — en 제 = j + ㅡ. Es la vocal que requiere apretar los dientes.' },
  },
  {
    id: 'E3', at: 195, type: 'match', title: 'Empareja bloque → significado',
    question: 'Selecciona el significado correcto de cada bloque silábico:',
    pairs: [
      { kr: '어제', es: 'ayer' },
      { kr: '이제', es: 'ahora' },
      { kr: '오늘', es: 'hoy' },
    ],
    feedback: { ok: '✅ ¡Perfecto! Ya lees bloques silábicos completos.', err: '❌ Intenta de nuevo — observa las diferencias entre ㅓ (eo), ㅣ (i) y ㅗ (o).' },
  },
  {
    id: 'E4', at: 305, type: 'choice', title: 'Consonante aspirada',
    question: '¿Cuál consonante tiene el soplo de aire extra (aspirada)?',
    choices: [
      { label: 'ㅋ', correct: true, kr: true, note: 'k aspirada' },
      { label: 'ㄱ', correct: false, kr: true, note: 'k simple' },
      { label: 'ㄲ', correct: false, kr: true, note: 'k tensa' },
      { label: 'ㅗ', correct: false, kr: true, note: 'vocal O' },
    ],
    feedback: { ok: '✅ ¡Correcto! ㅋ tiene la raya extra = aspirada. Pon la mano frente a la boca y siente el aire.', err: '❌ La aspirada es ㅋ — tiene una raya extra. ㄱ es la simple, ㄲ es la tensa (doble).' },
  },
  {
    id: 'E5', at: 355, type: 'drag', title: 'Ordena la frase final',
    question: 'La frase del video: ordena las partes en coreano.',
    source: '"Ahora las letras se ven un poco."',
    hint: 'Recuerda: verbo al final (del Día 1)',
    speak: '이제 글자가 조금 보여요',
    chips: [
      { word: '글자가', sub: 'letras (sujeto)', idx: 1, kr: true },
      { word: '이제', sub: 'ahora', idx: 0, kr: true },
      { word: '보여요', sub: 'se ven', idx: 3, kr: true },
      { word: '조금', sub: 'un poco', idx: 2, kr: true },
    ],
    correctOrder: [0, 1, 2, 3],
    feedback: {
      ok: '✅ ¡Perfecto! 이제 글자가 조금 보여요 — Ya unes Hangul + gramática del Día 1.',
      err: '❌ Orden: 이제 (ahora) → 글자가 (letras) → 조금 (un poco) → 보여요 (se ven). Verbo al final.',
    },
  },
];

const SEGMENT_MAP = [
  { label: 'Intro — 글자', at: 0,   icon: '🎯' },
  { label: 'Sejong · 1446', at: 15,  icon: '👑' },
  { label: 'Vocales fáciles', at: 65,  icon: '🎵' },
  { label: 'Dos E / Dos O', at: 80,  icon: '🔀' },
  { label: 'Vocal ㅡ', at: 120, icon: '😬' },
  { label: 'Bloques', at: 158, icon: '🧱' },
  { label: 'Círculo mudo', at: 175, icon: '🔵' },
  { label: 'Aspiradas', at: 255, icon: '💨' },
  { label: 'Dobles', at: 275, icon: '💥' },
  { label: 'Diptongos', at: 330, icon: '🌀' },
  { label: 'Cierre', at: 345, icon: '✅' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '00:00';
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}
function speak002(text: string, rate = 1) {
  const src = KR_AUDIO_002[text];
  if (src) { const a = new Audio(src); a.playbackRate = rate; a.play().catch(() => tts002(text, rate)); return; }
  tts002(text, rate);
}
function tts002(text: string, rate = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'ko-KR'; u.rate = rate;
  window.speechSynthesis.speak(u);
}
function segIdx(t: number) {
  let i = 0;
  for (let j = 0; j < SEGMENT_MAP.length; j++) { if (t >= SEGMENT_MAP[j].at) i = j; else break; }
  return i;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function VocabCard({ item, isNew }: { item: VocabItem; isNew: boolean }) {
  return (
    <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ height: 100, background: '#f1f3f5', position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 10, top: 4, fontSize: 44, fontWeight: 700, opacity: 0.07, color: item.color }}>{item.hangul}</span>
        <img src={item.img} alt={item.translation} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        {isNew && <span style={{ position: 'absolute', top: 7, right: 7, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100, color: '#fff', background: item.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>New</span>}
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: item.color }}>{item.hangul}</p>
        <p style={{ margin: '1px 0 0', fontFamily: 'var(--mono)', fontSize: 10, color: '#6c757d' }}>{item.romanization}</p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#1a1a2e' }}>{item.translation}</p>
        <button type="button" onClick={() => speak002(item.hangul)} style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, background: `${item.color}18`, border: `1px solid ${item.color}35`, borderRadius: 100, padding: '3px 8px', color: item.color, fontSize: 10, cursor: 'pointer' }}>
          <Volume2 size={11} /> Escuchar
        </button>
      </div>
    </article>
  );
}

function ConceptCard({ item }: { item: ConceptItem }) {
  return (
    <article style={{ background: '#fff', borderLeft: `3px solid ${item.color}`, border: '1px solid #e9ecef', borderRadius: '0 12px 12px 0', padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
        <span style={{ fontSize: 16 }}>{item.icon}</span>
        <h4 style={{ margin: 0, fontSize: 11, fontWeight: 600, color: item.color }}>{item.title}</h4>
      </div>
      <p style={{ margin: '0 0 8px', fontSize: 12, color: '#6c757d', lineHeight: 1.6 }}>{item.body}</p>

      {/* Example with special label */}
      {item.example && (
        <div style={{ background: `${item.color}10`, borderRadius: 8, padding: '8px 10px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, color: '#adb5bd', fontWeight: 600 }}>{item.example.label}</p>
          {item.example.items.map(ex => (
            <div key={ex.kr} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{ex.kr}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#6c757d' }}>{ex.rom}</span>
              <span style={{ fontSize: 10, color: '#adb5bd' }}>— {ex.note}</span>
            </div>
          ))}
        </div>
      )}

      {/* Vowel / consonant grid */}
      {item.grid && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(item.grid.length, 4)}, 1fr)`, gap: 6, marginTop: 6 }}>
          {item.grid.map(g => (
            <div key={g.kr} style={{ background: `${item.color}0d`, border: `1px solid ${item.color}25`, borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 20, fontWeight: 700, color: item.color }}>{g.kr}</span>
              <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, color: '#6c757d' }}>{g.rom}</span>
              {g.note && <span style={{ display: 'block', fontSize: 9, color: '#adb5bd', marginTop: 1 }}>{g.note}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Syllabic block demo */}
      {item.block && (
        <div style={{ marginTop: 8, background: `${item.color}0d`, border: `1px solid ${item.color}25`, borderRadius: 8, padding: '8px 12px' }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: item.color, display: 'block', marginBottom: 4 }}>{item.block.syllable}</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {item.block.parts.map(p => (
              <div key={p.kr} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: item.color }}>{p.kr}</span>
                <p style={{ margin: '2px 0 0', fontSize: 9, color: '#6c757d' }}>{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function MatchExercise({ item, onComplete, isCompleted }: { item: ExerciseItem; onComplete: (id: string) => void; isCompleted: boolean }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState('');
  const pairs = item.pairs ?? [];

  function pick(kr: string, es: string) {
    if (isCompleted) return;
    setSelected(p => ({ ...p, [kr]: es }));
    setFeedback('');
  }

  function validate() {
    const ok = pairs.every(p => selected[p.kr] === p.es);
    setFeedback(ok ? item.feedback.ok : item.feedback.err);
    if (ok) onComplete(item.id);
  }

  return (
    <>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: '#1a1a2e', lineHeight: 1.6 }}>{item.question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {pairs.map(p => (
          <div key={p.kr} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#6c63ff', textAlign: 'center' }}>{p.kr}</span>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              {pairs.map(opt => (
                <button
                  key={`${p.kr}-${opt.es}`}
                  type="button"
                  onClick={() => pick(p.kr, opt.es)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: isCompleted ? 'default' : 'pointer',
                    background: selected[p.kr] === opt.es
                      ? isCompleted ? 'rgba(45,155,78,0.12)' : 'rgba(108,99,255,0.12)'
                      : '#f8f9fa',
                    border: `1px solid ${selected[p.kr] === opt.es ? (isCompleted ? 'rgba(45,155,78,0.3)' : 'rgba(108,99,255,0.3)') : '#e9ecef'}`,
                    color: selected[p.kr] === opt.es ? (isCompleted ? '#2d9b4e' : '#6c63ff') : '#6c757d',
                    fontWeight: selected[p.kr] === opt.es ? 600 : 400,
                  }}
                >
                  {opt.es}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {feedback && (
        <div style={{ background: feedback === item.feedback.ok ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${feedback === item.feedback.ok ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: feedback === item.feedback.ok ? '#2d9b4e' : '#dc3545', lineHeight: 1.6, marginBottom: 10 }}>
          {feedback}
        </div>
      )}
      <button type="button" onClick={validate} disabled={Object.keys(selected).length < pairs.length || isCompleted} style={{ width: '100%', padding: 10, background: Object.keys(selected).length < pairs.length || isCompleted ? '#f1f3f5' : '#6c63ff', border: 'none', borderRadius: 10, color: Object.keys(selected).length < pairs.length || isCompleted ? '#adb5bd' : '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        Verificar
      </button>
      {isCompleted && <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 12, color: '#2d9b4e', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}><Check size={14} /> Completado</p>}
    </>
  );
}

function DragExercise({ item, onComplete, isCompleted }: { item: ExerciseItem; onComplete: (id: string) => void; isCompleted: boolean }) {
  const [placed, setPlaced] = useState<Chip[]>([]);
  const [bank, setBank] = useState<Chip[]>(item.chips ?? []);
  const [feedback, setFeedback] = useState('');
  useEffect(() => { setPlaced([]); setBank(item.chips ?? []); setFeedback(''); }, [item.id]);
  function add(c: Chip) { if (isCompleted || placed.length >= (item.correctOrder?.length ?? 0)) return; setBank(p => p.filter(x => x.idx !== c.idx)); setPlaced(p => [...p, c]); setFeedback(''); }
  function remove(c: Chip) { if (isCompleted) return; setPlaced(p => p.filter(x => x.idx !== c.idx)); setBank(p => [...p, c].sort((a, b) => a.idx - b.idx)); setFeedback(''); }
  function validate() {
    const order = placed.map(c => c.idx);
    const ok = order.length === item.correctOrder?.length && order.every((v, i) => v === item.correctOrder![i]);
    setFeedback(ok ? item.feedback.ok : item.feedback.err);
    if (ok) onComplete(item.id);
  }
  return (
    <>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#1a1a2e', lineHeight: 1.6 }}>{item.question}</p>
      {item.source && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6c63ff', marginBottom: 6 }}>{item.source}</span>}
      {item.hint && <p style={{ margin: '0 0 10px', fontSize: 11, color: '#adb5bd' }}>{item.hint}</p>}
      {item.speak && <button type="button" onClick={() => speak002(item.speak!)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '5px 12px', color: '#6c63ff', fontSize: 11, cursor: 'pointer', marginBottom: 12 }}><Volume2 size={13} /> Escuchar</button>}
      <div style={{ minHeight: 44, background: '#f8f9fa', border: '2px dashed #e9ecef', borderRadius: 10, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 8 }}>
        {placed.length === 0 ? <span style={{ fontSize: 11, color: '#adb5bd' }}>Toca las palabras en orden</span> : placed.map(c => (
          <button key={`p-${c.idx}`} type="button" onClick={() => remove(c)} style={{ padding: '5px 10px', background: isCompleted ? 'rgba(45,155,78,0.08)' : 'rgba(108,99,255,0.08)', border: `1px solid ${isCompleted ? 'rgba(45,155,78,0.3)' : 'rgba(108,99,255,0.25)'}`, borderRadius: 8, fontSize: c.kr ? 15 : 12, cursor: isCompleted ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: isCompleted ? '#2d9b4e' : '#1a1a2e' }}>
            {c.word}
            {c.sub && <span style={{ fontSize: 9, color: '#adb5bd', fontStyle: 'italic' }}>{c.sub}</span>}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {bank.map(c => (
          <button key={`b-${c.idx}`} type="button" onClick={() => add(c)} style={{ padding: '5px 10px', background: c.trap ? 'rgba(220,53,69,0.03)' : 'rgba(108,99,255,0.04)', border: `1px solid ${c.trap ? 'rgba(220,53,69,0.2)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 8, fontSize: c.kr ? 15 : 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: c.trap ? 'rgba(220,53,69,0.5)' : '#6c63ff' }}>
            {c.word}
            {c.sub && <span style={{ fontSize: 9, color: '#adb5bd', fontStyle: 'italic' }}>{c.sub}</span>}
          </button>
        ))}
      </div>
      {feedback && <div style={{ background: feedback === item.feedback.ok ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${feedback === item.feedback.ok ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '9px 11px', fontSize: 11, color: feedback === item.feedback.ok ? '#2d9b4e' : '#dc3545', lineHeight: 1.6, marginBottom: 8 }}>{feedback}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <button type="button" onClick={validate} disabled={placed.length !== (item.correctOrder?.length ?? 0) || isCompleted} style={{ padding: 9, background: placed.length !== (item.correctOrder?.length ?? 0) || isCompleted ? '#f1f3f5' : '#6c63ff', border: 'none', borderRadius: 10, color: placed.length !== (item.correctOrder?.length ?? 0) || isCompleted ? '#adb5bd' : '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Validar</button>
        <button type="button" onClick={() => { setPlaced([]); setBank(item.chips ?? []); setFeedback(''); }} style={{ padding: 9, background: '#fff', border: '1px solid #e9ecef', borderRadius: 10, color: '#6c757d', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Limpiar</button>
      </div>
      {isCompleted && <p style={{ margin: '6px 0 0', textAlign: 'center', fontSize: 11, color: '#2d9b4e', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}><Check size={13} /> Completado</p>}
    </>
  );
}

function ChoiceExercise({ item, onComplete, isCompleted }: { item: ExerciseItem; onComplete: (id: string) => void; isCompleted: boolean }) {
  const [picked, setPicked] = useState('');
  const [feedback, setFeedback] = useState('');
  function choose(label: string) {
    if (isCompleted || picked) return;
    setPicked(label);
    const ok = item.choices?.find(c => c.label === label)?.correct ?? false;
    setFeedback(ok ? item.feedback.ok : item.feedback.err);
    if (ok) onComplete(item.id);
  }
  return (
    <>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#1a1a2e', lineHeight: 1.6 }}>{item.question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
        {item.choices?.map(c => {
          const chosen = picked === c.label;
          const bg = !picked ? '#f8f9fa' : chosen ? (c.correct ? 'rgba(45,155,78,0.08)' : 'rgba(220,53,69,0.06)') : '#f8f9fa';
          const border = !picked ? '#e9ecef' : chosen ? (c.correct ? 'rgba(45,155,78,0.3)' : 'rgba(220,53,69,0.25)') : '#e9ecef';
          const color = !picked ? '#1a1a2e' : chosen ? (c.correct ? '#2d9b4e' : '#dc3545') : '#6c757d';
          return (
            <button key={c.label} type="button" onClick={() => choose(c.label)} style={{ padding: '9px 10px', background: bg, border: `1px solid ${border}`, borderRadius: 10, fontSize: c.kr ? 16 : 12, color, cursor: picked || isCompleted ? 'default' : 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {c.label}
              {c.note && <span style={{ fontSize: 9, color: '#adb5bd' }}>{c.note}</span>}
            </button>
          );
        })}
      </div>
      {feedback && <div style={{ background: feedback === item.feedback.ok ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${feedback === item.feedback.ok ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '9px 11px', fontSize: 11, color: feedback === item.feedback.ok ? '#2d9b4e' : '#dc3545', lineHeight: 1.6 }}>{feedback}</div>}
      {isCompleted && <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 11, color: '#2d9b4e', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}><Check size={13} /> Completado</p>}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Activation002({ onComplete }: { onComplete?: () => void }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [rate, setRate]               = useState(1);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [visibleVocab, setVisibleVocab]         = useState(new Set<string>());
  const [newVocab, setNewVocab]                 = useState(new Set<string>());
  const [visibleConcepts, setVisibleConcepts]   = useState(new Set<string>());
  const [visibleExercises, setVisibleExercises] = useState(new Set<string>());
  const [completedExercises, setCompletedExercises] = useState(new Set<string>());
  const [newAlert, setNewAlert]                 = useState(false);
  const [showVideo, setShowVideo]               = useState(false);

  const audioRef002 = useRef<HTMLAudioElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const triggered   = useRef(new Set<string>());
  const alertTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  function togglePlay002() {
    const a = audioRef002.current;
    if (!a) return;
    if (isPlaying) a.pause(); else a.play().catch(() => {});
  }
  function handleProgressClick002(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef002.current && duration > 0) audioRef002.current.currentTime = ratio * duration;
  }
  function setPlaybackRate002(r: number) {
    setRate(r);
    if (audioRef002.current) audioRef002.current.playbackRate = r;
  }

  // Timeline triggers
  useEffect(() => {
    const t = triggered.current;
    const flash = (id: string) => {
      setNewVocab(p => new Set([...p, id]));
      setVisibleVocab(p => new Set([...p, id]));
      ping();
      setTimeout(() => setNewVocab(p => { const n = new Set(p); n.delete(id); return n; }), 4000);
    };
    VOCAB_TIMELINE.forEach(v => { if (currentTime >= v.at && !t.has(v.id)) { t.add(v.id); flash(v.id); } });
    CONCEPT_TIMELINE.forEach(c => { if (currentTime >= c.at && !t.has(c.id)) { t.add(c.id); setVisibleConcepts(p => new Set([...p, c.id])); ping(); } });
    EXERCISE_TIMELINE.forEach(e => { if (currentTime >= e.at && !t.has(e.id)) { t.add(e.id); setVisibleExercises(p => new Set([...p, e.id])); ping(); } });
  }, [currentTime]);

  function ping() {
    setNewAlert(true);
    if (rightRef.current) rightRef.current.scrollTo({ top: rightRef.current.scrollHeight, behavior: 'smooth' });
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setNewAlert(false), 3000);
  }

  function unlockAll() {
    const t = triggered.current;
    VOCAB_TIMELINE.forEach(v => { t.add(v.id); setVisibleVocab(p => new Set([...p, v.id])); });
    CONCEPT_TIMELINE.forEach(c => { t.add(c.id); setVisibleConcepts(p => new Set([...p, c.id])); });
    EXERCISE_TIMELINE.forEach(e => { t.add(e.id); setVisibleExercises(p => new Set([...p, e.id])); });
    ping();
  }

  function markDone(id: string) { setCompletedExercises(p => new Set([...p, id])); }

  const activeSegIdx = segIdx(currentTime);
  const hasItems = visibleVocab.size + visibleConcepts.size + visibleExercises.size > 0;

  // Sorted items for right panel
  const allItems = [
    ...VOCAB_TIMELINE.map(v => ({ ...v, kind: 'vocab' as const, sortAt: v.at })),
    ...CONCEPT_TIMELINE.map(c => ({ ...c, kind: 'concept' as const, sortAt: c.at })),
    ...EXERCISE_TIMELINE.map(e => ({ ...e, kind: 'exercise' as const, sortAt: e.at })),
  ].sort((a, b) => a.sortAt - b.sortAt);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 'calc(100vh - 200px)', background: 'transparent' }}>
      {/* ── LEFT: audio player + video ─────────────────────────────────── */}
      <aside style={{ borderRight: '1px solid var(--line-soft)', padding: '1.5rem 1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header */}
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Día 2 · Hangul</p>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>El alfabeto coreano</h2>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>Escucha el podcast. El contenido aparece a medida que avanzas.</p>
        </div>

        {/* Podcast player — dark gradient (canonical) */}
        <audio
          ref={audioRef002}
          src={KR_PODCAST_002}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); if (onComplete) onComplete(); }}
        />
        <style>{`
          @keyframes eq0 { from { height: 6px; } to { height: 14px; } }
          @keyframes eq1 { from { height: 4px; } to { height: 11px; } }
          @keyframes eq2 { from { height: 8px; } to { height: 15px; } }
          @keyframes eq3 { from { height: 5px; } to { height: 10px; } }
          @keyframes eq4 { from { height: 7px; } to { height: 13px; } }
        `}</style>
        <div style={{
          background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
          borderRadius: 14, padding: '1rem 1rem 0.875rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2, background: '#6c63ff',
                    height: isPlaying ? `${6 + h * 8}px` : '3px',
                    animation: isPlaying ? `eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                    transition: 'height 0.15s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>PODCAST · STEP 002</span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>
          <div
            onClick={handleProgressClick002}
            style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 10, cursor: 'pointer', overflow: 'hidden' }}
          >
            <div style={{ height: '100%', width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%', background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 2, transition: 'width 0.5s linear' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={togglePlay002}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 14px rgba(108,99,255,0.4)' }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0.75, 1, 1.25, 1.5].map(r => (
                <button key={r} type="button" onClick={() => setPlaybackRate002(r)} style={{ padding: '3px 7px', borderRadius: 6, border: `1px solid ${rate === r ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`, background: rate === r ? 'rgba(108,99,255,0.3)' : 'transparent', color: rate === r ? '#a78bfa' : 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: rate === r ? 700 : 400, cursor: 'pointer' }}>{r}×</button>
              ))}
            </div>
          </div>
        </div>

        {/* Segment progress */}
        <div>
          <p style={{ margin: '0 0 8px', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Progreso del podcast</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {SEGMENT_MAP.map((seg, i) => (
              <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', borderRadius: 6, background: i === activeSegIdx ? 'rgba(108,99,255,0.07)' : 'transparent', transition: 'background 0.2s' }}>
                <span style={{ width: 16, textAlign: 'center', fontSize: 12 }}>{seg.icon}</span>
                <span style={{ flex: 1, fontSize: 11, color: i <= activeSegIdx ? '#1a1a2e' : '#adb5bd', fontWeight: i === activeSegIdx ? 600 : 400 }}>{seg.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#adb5bd' }}>{fmt(seg.at)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video preview button */}
        <div>
          <button
            type="button"
            onClick={() => setShowVideo(v => !v)}
            style={{ width: '100%', padding: '10px 14px', background: showVideo ? 'rgba(108,99,255,0.08)' : '#f8f9fa', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 10, fontSize: 12, fontWeight: 600, color: '#6c63ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            🎬 {showVideo ? 'Ocultar' : 'Ver'} video de David
          </button>
          {showVideo && (
            <div style={{ marginTop: 8, borderRadius: 10, overflow: 'hidden', border: '1px solid #e9ecef' }}>
              <video src={KR_VIDEO_002} controls playsInline style={{ width: '100%', display: 'block', maxHeight: 200, background: '#000' }} />
              <div style={{ padding: '8px 10px', background: '#f8f9fa' }}>
                <p style={{ margin: 0, fontSize: 10, color: '#6c757d' }}>
                  0:01 — 어제 (ayer) · 0:04 — 글자 (letras) · 0:18 — vocales flotantes · 0:24 — frase final
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Unlock all */}
        <button
          type="button"
          onClick={unlockAll}
          style={{ padding: '8px 12px', background: '#fff', border: '1px solid #e9ecef', borderRadius: 10, fontSize: 11, color: '#6c757d', cursor: 'pointer' }}
        >
          👁 Revelar todo sin escuchar
        </button>
      </aside>

      {/* ── RIGHT: timeline content ─────────────────────────────────────── */}
      <div
        ref={rightRef}
        style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 'calc(100vh - 200px)' }}
      >
        {/* New content alert */}
        {newAlert && (
          <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#6c63ff', display: 'flex', alignItems: 'center', gap: 6 }}>
            ✨ Nuevo contenido disponible — desplázate hacia abajo
          </div>
        )}

        {/* Empty state */}
        {!hasItems && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 12, padding: '3rem 1rem' }}>
            <span style={{ fontSize: 40 }}>🎧</span>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
              Toca <strong>Play</strong> y el contenido irá apareciendo<br />a medida que escuchas el podcast.
            </p>
          </div>
        )}

        {/* Sorted timeline items */}
        {allItems.map(item => {
          if (item.kind === 'vocab' && !visibleVocab.has(item.id)) return null;
          if (item.kind === 'concept' && !visibleConcepts.has(item.id)) return null;
          if (item.kind === 'exercise' && !visibleExercises.has(item.id)) return null;

          if (item.kind === 'vocab') {
            return (
              <div key={item.id}>
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {fmt(item.at)} · Nueva palabra
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                  <VocabCard item={item as VocabItem} isNew={newVocab.has(item.id)} />
                </div>
              </div>
            );
          }

          if (item.kind === 'concept') {
            return (
              <div key={item.id}>
                <p style={{ margin: '0 0 5px', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {fmt(item.at)} · Concepto
                </p>
                <ConceptCard item={item as ConceptItem} />
              </div>
            );
          }

          if (item.kind === 'exercise') {
            const ex = item as ExerciseItem;
            const done = completedExercises.has(ex.id);
            return (
              <div key={ex.id} style={{ background: '#fff', border: `1px solid ${done ? 'rgba(45,155,78,0.2)' : '#e9ecef'}`, borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: done ? '#2d9b4e' : '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', background: done ? 'rgba(45,155,78,0.08)' : '#f1f3f5', padding: '2px 8px', borderRadius: 100 }}>
                    {fmt(ex.at)} · {ex.title}
                  </span>
                </div>
                {ex.type === 'drag'   && <DragExercise   item={ex} onComplete={markDone} isCompleted={done} />}
                {ex.type === 'choice' && <ChoiceExercise item={ex} onComplete={markDone} isCompleted={done} />}
                {ex.type === 'match'  && <MatchExercise  item={ex} onComplete={markDone} isCompleted={done} />}
              </div>
            );
          }

          return null;
        })}

        {/* Completion CTA */}
        {completedExercises.size === EXERCISE_TIMELINE.length && EXERCISE_TIMELINE.length > 0 && (
          <div style={{ background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🎉</span>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#2d9b4e', fontSize: 15 }}>¡Activación completada!</p>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#6c757d' }}>Ya tienes las bases del Hangul. Sigue al siguiente paso.</p>
            {onComplete && (
              <button type="button" onClick={onComplete} style={{ padding: '10px 20px', background: '#2d9b4e', border: 'none', borderRadius: 100, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Siguiente etapa →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
