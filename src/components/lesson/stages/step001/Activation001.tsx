'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST, playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface Breakdown { kr: string; es: string }
interface Example   { kr: string; es: string; lit?: string }
interface TableData { headers: string[]; rows: string[][] }

interface TimelineItem {
  id: string; at: number;
  type: 'vocab' | 'pattern' | 'culture' | 'survival';
  kr: string; rom?: string; title: string; body: string; color: string;
  audioKey?: string;
  breakdown?: Breakdown[];
  examples?: Example[];
  table?: TableData;
  tip?: string;
  recycled?: string;
}

interface Chip { word: string; idx: number; kr?: boolean; trap?: boolean; sub?: string }
interface Choice { label: string; correct: boolean; note?: string; kr?: boolean }
interface ExerciseItem {
  id: string; at: number; type: 'drag' | 'choice';
  title: string; question: string;
  source?: string; speak?: string; hint?: string;
  chips?: Chip[]; correctOrder?: number[];
  choices?: Choice[];
  feedback: { ok: string; err: string };
}
interface Question { id: string; q: string; options: string[]; correct: string }

/* ─── Card type config ───────────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  vocab:    { label: 'VOCABULARIO',   icon: '🔤', accent: '#6c63ff' },
  pattern:  { label: 'GRAMÁTICA',     icon: '🧩', accent: '#8b5cf6' },
  culture:  { label: 'CULTURA',       icon: '🇰🇷', accent: '#f59e0b' },
  survival: { label: 'SUPERVIVENCIA', icon: '🆘', accent: '#22c55e' },
} as const;

/* ─── Timeline ───────────────────────────────────────────────────────────────── */
const TIMELINE: TimelineItem[] = [
  {
    id: 'T1', at: 44, type: 'pattern',
    kr: 'S · O · V',
    title: 'El verbo siempre al final',
    body: 'En coreano el verbo cierra la oración. Siempre. Sin excepciones. No sabes qué está pasando hasta que llega la última palabra. Es la diferencia más importante entre el español y el coreano.',
    color: 'var(--wl-on-panel-link, #6c63ff)',
    examples: [
      { kr: '저는 학교에 가요', es: 'Yo · escuela-hacia · voy', lit: 'Sujeto → Objeto → Verbo' },
      { kr: '나는 집에 가요', es: 'Yo · casa-hacia · voy', lit: 'El verbo siempre al final' },
    ],
    tip: 'Imagina que lees subtítulos del que falta la última palabra. El verbo es la revelación.',
  },
  {
    id: 'T2', at: 105, type: 'pattern',
    kr: '학교 · 집 · 대학교',
    title: 'Los artículos desaparecen',
    body: 'En coreano no existe "la", "el", "una" ni "un". El sustantivo va solo. El contexto hace el trabajo. No se pierde información — el hablante confía en que el oyente está prestando atención.',
    color: 'var(--wl-on-panel-alert, #ff6b6b)',
    examples: [
      { kr: '학교', es: 'la escuela / una escuela / escuela', lit: 'sin artículo — el contexto decide' },
      { kr: '집', es: 'la casa / mi casa / casa', lit: 'sin artículo ni posesivo' },
    ],
    tip: 'No intentes traducir el artículo — simplemente no está. El coreano lo omite siempre.',
  },
  {
    id: 'T3', at: 122, type: 'vocab',
    kr: '학교',
    rom: 'hak-gyo',
    title: 'Escuela',
    body: 'Una de las primeras palabras del coreano cotidiano. Aparece sola (sin artículo) o con la partícula 에 → 학교에. Se construye con hanja: 학(學) = aprendizaje + 교(校) = institución.',
    color: 'var(--wl-on-panel-link, #6c63ff)',
    audioKey: '학교',
    breakdown: [
      { kr: '학', es: 'aprendizaje / educación (hanja 學)' },
      { kr: '교', es: 'institución / enseñanza (hanja 校)' },
    ],
    examples: [
      { kr: '학교에 가요', es: 'Voy a la escuela', lit: '학교 + 에 (partícula de dirección)' },
      { kr: '학교에서 공부해요', es: 'Estudio en la escuela', lit: '에서 = en (lugar de acción)' },
    ],
  },
  {
    id: 'T4', at: 152, type: 'culture',
    kr: '고맥락 언어',
    title: 'Idioma de alto contexto',
    body: 'El coreano asume que el hablante está presente en la situación. Pronombres, artículos y a veces el sujeto completo se omiten porque el contexto los hace obvios. No es ambigüedad — es eficiencia comunicativa coreana.',
    color: '#f59e0b',
    examples: [
      { kr: '가요', es: '(Yo/tú/él) voy/vas/va', lit: 'el contexto determina quién' },
      { kr: '학교 가요?', es: '¿Vas a la escuela?', lit: 'sin pronombre, sin artículo — natural' },
    ],
    tip: 'No busques el "yo" explícito. En coreano la situación habla más que las palabras.',
  },
  {
    id: 'T5', at: 176, type: 'pattern',
    kr: '에',
    rom: 'e',
    title: 'La partícula 에 — el rastreador GPS',
    body: 'En español la preposición "a" va ANTES del sustantivo. En coreano la partícula 에 va DESPUÉS, pegada al sustantivo, como un rastreador que dice "este sustantivo tiene dirección". Sin 에 no hay movimiento.',
    color: '#34d399',
    audioKey: '에',
    breakdown: [
      { kr: '학교 + 에 = 학교에', es: 'escuela + hacia → hacia la escuela' },
      { kr: '집 + 에 = 집에', es: 'casa + hacia → hacia la casa' },
      { kr: '대학교 + 에 = 대학교에', es: 'universidad + hacia → hacia la universidad' },
    ],
    tip: 'Regla: [sustantivo] + 에 = "hacia [sustantivo]". La partícula va siempre PEGADA y DESPUÉS.',
  },
  {
    id: 'T6', at: 215, type: 'vocab',
    kr: '저는',
    rom: 'jeo-neun',
    title: 'Yo (forma formal)',
    body: '저는 es la forma respetuosa de "yo". Se usa con desconocidos, personas mayores y en situaciones formales. La partícula 는 marca el tema de la oración — "en cuanto a mí...". Para extranjeros es la forma segura.',
    color: 'var(--wl-on-panel-alert, #ff6b6b)',
    audioKey: '저는',
    breakdown: [
      { kr: '저', es: 'yo (humilde, formal)' },
      { kr: '는', es: 'partícula de tema (marca el sujeto/tema)' },
    ],
    examples: [
      { kr: '나는', es: 'yo (casual, solo entre amigos)', lit: '나 = yo informal' },
      { kr: '저는 학교에 가요', es: 'Yo voy a la escuela', lit: 'forma completa y formal' },
    ],
    tip: 'Para extranjeros: usa siempre 저는 (no 나는). Nunca ofende. La forma casual se reserva para amigos íntimos.',
  },
  {
    id: 'T7', at: 217, type: 'vocab',
    kr: '학교에',
    rom: 'hak-gyo-e',
    title: 'Hacia la escuela',
    body: '학교에 = 학교 (escuela) + 에 (partícula de dirección). Esta combinación aparece siempre junta cuando hay movimiento hacia la escuela. Con el tiempo el cerebro las procesa como una unidad.',
    color: '#fbbf24',
    audioKey: '학교에',
    breakdown: [
      { kr: '학교', es: 'escuela' },
      { kr: '에', es: 'partícula → hacia / en dirección a' },
    ],
    examples: [
      { kr: '저는 학교에 가요', es: 'Yo voy a la escuela' },
      { kr: '학교에 있어요', es: 'Estoy en la escuela', lit: '에 también indica ubicación estática' },
    ],
  },
  {
    id: 'T8', at: 222, type: 'vocab',
    kr: '가요',
    rom: 'ga-yo',
    title: 'Voy / Vas / Va (presente)',
    body: '가요 es el presente del verbo 가다 (ir). El sufijo -요 añade cortesía al nivel educado-diario. Sin 요: casual/íntimo. El mismo verbo sirve para yo, tú, él, nosotros — el contexto determina quién.',
    color: '#34d399',
    audioKey: '가요',
    breakdown: [
      { kr: '가', es: 'raíz del verbo 가다 = ir' },
      { kr: '요', es: 'sufijo de cortesía (nivel -요, uso diario)' },
    ],
    examples: [
      { kr: '학교에 가요', es: 'Voy a la escuela' },
      { kr: '집에 가요', es: 'Voy a casa' },
      { kr: '어디 가요?', es: '¿Adónde vas?', lit: '어디 = dónde' },
    ],
    tip: '-아/어요 es el sufijo más usado del coreano moderno. 가다 → 가요, 오다 → 와요, 자다 → 자요.',
  },
  {
    id: 'T9', at: 245, type: 'vocab',
    kr: '대학교',
    rom: 'dae-hak-gyo',
    title: 'Universidad',
    body: '대학교 = 대 (grande/superior) + 학교 (escuela). Literalmente "escuela grande". Ya conoces 학교 — agrégale 대 y tienes la universidad. Así funciona el coreano: construye palabras por capas de significado.',
    color: '#60a5fa',
    audioKey: '대학교',
    recycled: '학교',
    breakdown: [
      { kr: '대', es: 'grande / superior (hanja 大)' },
      { kr: '학교', es: 'escuela (ya la conoces ✓)' },
    ],
    examples: [
      { kr: '대학교에 가요', es: 'Voy a la universidad' },
      { kr: '대학교에서 공부해요', es: 'Estudio en la universidad' },
    ],
  },
  {
    id: 'T10', at: 255, type: 'vocab',
    kr: '대학교에',
    rom: 'dae-hak-gyo-e',
    title: 'Hacia la universidad',
    body: 'La misma fórmula que 학교에: [lugar] + 에 = "hacia [lugar]". Ya reconoces el patrón. Cuando el patrón es predecible, el idioma se vuelve automático. Tu cerebro está internalizando el sistema.',
    color: 'var(--wl-on-panel-link, #a78bfa)',
    audioKey: '대학교에',
    recycled: '학교에',
    examples: [
      { kr: '저는 대학교에 가요', es: 'Yo voy a la universidad', lit: 'la frase completa del episodio' },
      { kr: '대학교에 있어요', es: 'Estoy en la universidad' },
    ],
    tip: 'Ya tienes el patrón: [저는] + [lugar+에] + [가요]. Cambia el lugar y tienes frases nuevas sin estudiarlas.',
  },
  {
    id: 'T11', at: 265, type: 'survival',
    kr: '어디 가요?',
    rom: 'eo-di ga-yo?',
    title: '¿Adónde vas? — pregunta de contexto',
    body: 'Con solo dos palabras del vocabulario del día ya tienes una pregunta completa y natural. 어디 (dónde) + 가요 (vas). Sin verbo ser, sin artículo, sin pronombre. El coreano comprime la comunicación al máximo.',
    color: '#22c55e',
    audioKey: '어디 가요?',
    breakdown: [
      { kr: '어디', es: 'dónde / adónde' },
      { kr: '가요?', es: '¿vas/va? (entonación ascendente = pregunta)' },
    ],
    examples: [
      { kr: '어디 가요?', es: '¿Adónde vas?' },
      { kr: '학교에 가요', es: 'Voy a la escuela', lit: 'respuesta natural' },
      { kr: '집에 가요', es: 'Voy a casa', lit: 'otra respuesta posible' },
    ],
    tip: 'En coreano una pregunta = misma frase + entonación ascendente. La estructura no cambia.',
  },
];

/* ─── Exercises ──────────────────────────────────────────────────────────────── */
const EXERCISES: ExerciseItem[] = [
  {
    id: 'E1', at: 80, type: 'choice',
    title: 'Verbo al final',
    question: '¿Cuál es el orden correcto de la oración coreana "Yo voy a la escuela"?',
    choices: [
      { label: 'Yo · voy · a la escuela', correct: false },
      { label: 'Yo · a la escuela · voy', correct: true, note: 'S + O + V — verbo al final' },
      { label: 'A la escuela · yo · voy', correct: false },
      { label: 'Voy · yo · a la escuela', correct: false },
    ],
    feedback: {
      ok: '✅ ¡Exacto! "Yo · a la escuela · voy" — el verbo cierra. Así es el coreano: S · O · V.',
      err: '❌ En coreano el verbo siempre va al final: Yo → a la escuela → voy.',
    },
  },
  {
    id: 'E2', at: 135, type: 'choice',
    title: 'Sin artículos',
    question: '¿Cuál versión se parece más a cómo el coreano diría "voy a la escuela"?',
    choices: [
      { label: 'Voy a la escuela', correct: false },
      { label: 'Voy a una escuela', correct: false },
      { label: 'Voy a escuela', correct: true, note: 'sin artículo — como el coreano' },
      { label: 'Escuela voy', correct: false, note: 'orden incorrecto' },
    ],
    feedback: {
      ok: '✅ ¡Correcto! Sin "la", sin "el". Solo "escuela". En coreano: 학교.',
      err: '❌ En coreano no hay artículos. La más cercana es "Voy a escuela" — sin "la".',
    },
  },
  {
    id: 'E3', at: 200, type: 'choice',
    title: 'La partícula 에',
    question: '¿Cómo sería "escuela-hacia" en coreano?',
    choices: [
      { label: '에 학교', note: '에 delante — incorrecto', correct: false, kr: true },
      { label: '학교에', note: 'escuela + 에 — correcto', correct: true, kr: true },
      { label: '학교 에', note: 'con espacio — incorrecto', correct: false, kr: true },
      { label: '가요에', note: 'verbo + 에 — no tiene sentido', correct: false, kr: true },
    ],
    feedback: {
      ok: '✅ ¡Perfecto! 학교에 — pegada, sin espacio, siempre DESPUÉS del sustantivo.',
      err: '❌ La partícula 에 va siempre DESPUÉS y PEGADA al sustantivo. La correcta es 학교에.',
    },
  },
  {
    id: 'E4', at: 228, type: 'drag',
    title: 'Ordena la frase completa',
    question: 'Ordena las partes de la frase en coreano:',
    source: '"Yo voy a la escuela."',
    speak: '저는 학교에 가요',
    chips: [
      { word: '학교에', sub: 'escuela-hacia', idx: 1, kr: true },
      { word: '저는',  sub: 'yo',            idx: 0, kr: true },
      { word: '가요',  sub: 'voy',           idx: 2, kr: true },
    ],
    correctOrder: [0, 1, 2],
    feedback: {
      ok: '✅ ¡Increíble! 저는 학교에 가요 — Yo · escuela-hacia · voy. Ya lees coreano.',
      err: '❌ El orden es: 저는 (yo) → 학교에 (escuela-hacia) → 가요 (voy).',
    },
  },
  {
    id: 'E5', at: 258, type: 'drag',
    title: 'Construye: Universidad',
    question: 'Construye en coreano: "Tú vas a la universidad."',
    hint: '너는 = tú  ·  대학교에 = universidad-hacia  ·  가요 = vas',
    speak: '대학교에 가요',
    chips: [
      { word: '가요',    sub: 'vas',                 idx: 2, kr: true },
      { word: '대학교에', sub: 'universidad-hacia',  idx: 1, kr: true },
      { word: '너는',    sub: 'tú',                  idx: 0, kr: true },
      { word: '에 대학교', sub: '⚠ trampa',          idx: 99, kr: true, trap: true },
    ],
    correctOrder: [0, 1, 2],
    feedback: {
      ok: '✅ ¡Lo lograste! 너는 대학교에 가요 — Tu cerebro ya piensa en coreano.',
      err: '❌ Recuerda: 너는 → 대학교에 → 가요. La partícula 에 siempre va DESPUÉS del sustantivo.',
    },
  },
];

/* ─── Questions ──────────────────────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Cómo se dice "escuela" en coreano?',
    options: ['가요', '학교', '저는', '대학교'],
    correct: '학교',
  },
  {
    id: 'Q2',
    q: '¿Qué hace la partícula 에 en "학교에"?',
    options: ['indica que algo es grande', 'marca dirección hacia un lugar', 'es el pronombre yo', 'es el verbo ir'],
    correct: 'marca dirección hacia un lugar',
  },
  {
    id: 'Q3',
    q: '¿Cuál es la frase correcta para "Yo voy a la escuela"?',
    options: ['저는 가요 학교에', '가요 저는 학교에', '저는 학교에 가요', '학교에 가요 저는'],
    correct: '저는 학교에 가요',
  },
];

/* ─── Segments ───────────────────────────────────────────────────────────────── */
const SEGMENTS = [
  { label: 'Gancho inicial', at: 0 },
  { label: 'El verbo al final', at: 44 },
  { label: 'Sin artículos', at: 105 },
  { label: 'Vocabulario: 학교', at: 122 },
  { label: 'Alto contexto', at: 152 },
  { label: 'Partícula 에', at: 176 },
  { label: 'Frase completa', at: 215 },
  { label: 'Universidad: 대학교', at: 245 },
  { label: 'Cierre', at: 265 },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
function activeSegment(t: number): string {
  let seg = SEGMENTS[0];
  for (const s of SEGMENTS) { if (t >= s.at) seg = s; else break; }
  return seg.label;
}

/* ─── TimelineCard ───────────────────────────────────────────────────────────── */
function TimelineCard({
  item, isLatest, onAudio,
}: { item: TimelineItem; isLatest: boolean; onAudio: (key: string) => void }) {
  const cfg = TYPE_CONFIG[item.type];
  const rgb = hexToRgb(item.color);

  return (
    <div style={{
      borderRadius: 14,
      border: `2px solid ${isLatest ? item.color : 'var(--line-soft)'}`,
      background: isLatest ? `rgba(${rgb},0.06)` : 'var(--bg)',
      opacity: isLatest ? 1 : 0.45,
      transition: 'opacity 0.3s, border-color 0.3s',
      animation: isLatest ? 'act1CardIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      boxShadow: isLatest ? `0 4px 24px rgba(${rgb},0.14)` : 'none',
      overflow: 'hidden',
    }}>
      {/* Header strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        background: isLatest ? `rgba(${rgb},0.10)` : 'var(--bg-2)',
        borderBottom: `1px solid rgba(${rgb},0.15)`,
      }}>
        <span style={{ fontSize: 13 }}>{cfg.icon}</span>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: isLatest ? item.color : 'var(--muted)' }}>
          {cfg.label}
        </span>
        {item.recycled && isLatest && (
          <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: 'rgba(45,155,78,0.12)', border: '1px solid rgba(45,155,78,0.3)', color: 'var(--wl-on-panel-ok, #2d9b4e)', borderRadius: 100, padding: '2px 8px' }}>
            ♻ reciclado · {item.recycled}
          </span>
        )}
        <span style={{ marginLeft: item.recycled && isLatest ? 0 : 'auto', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>
          {fmt(item.at)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: isLatest ? '16px 16px 14px' : '12px 16px 12px' }}>
        <p style={{
          margin: '0 0 2px', fontSize: isLatest ? 26 : 18, fontWeight: 800,
          fontFamily: "'Noto Sans KR', sans-serif",
          color: isLatest ? item.color : 'var(--ink)', lineHeight: 1.2,
          transition: 'font-size 0.3s',
          textShadow: isLatest ? `0 0 40px rgba(${rgb},0.25)` : 'none',
        }}>
          {item.kr}
        </p>
        {item.rom && (
          <p style={{ margin: '0 0 6px', fontFamily: 'var(--mono)', fontSize: 10, color: isLatest ? item.color : 'var(--muted)', opacity: 0.7 }}>
            {item.rom}
          </p>
        )}
        <p style={{ margin: '0 0 8px', fontSize: isLatest ? 14 : 12, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
          {item.title}
        </p>

        {/* Rich content — only for latest card */}
        {isLatest && (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.body}
            </p>

            {item.breakdown && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Desglose</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.breakdown.map((part, i) => (
                    <div key={i} style={{ background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.2)`, borderRadius: 8, padding: '5px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1 }}>{part.kr}</span>
                      <span style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3, maxWidth: 120 }}>{part.es}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.table && (
              <div style={{ marginBottom: 12, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${item.table.headers.length}, 1fr)` }}>
                  {item.table.headers.map(h => (
                    <div key={h} style={{ padding: '7px 10px', background: item.color, color: '#fff', fontSize: 10, fontWeight: 700 }}>{h}</div>
                  ))}
                  {item.table.rows.map((row, ri) =>
                    row.map((cell, ci) => (
                      <div key={`${ri}-${ci}`} style={{ padding: '8px 10px', fontSize: 11, color: 'var(--ink)', background: ri % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)', borderTop: '1px solid var(--line-soft)', fontWeight: ci === 0 ? 600 : 400 }}>
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {item.examples && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>Ejemplos</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {item.examples.map((ex, i) => (
                    <div key={i} style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.15)`, borderRadius: 8, padding: '7px 10px' }}>
                      <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif" }}>{ex.kr}</span>
                      <span style={{ display: 'block', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>
                        {ex.es}
                        {ex.lit && <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 10 }}>{ex.lit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.tip && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 10px', background: `rgba(${rgb},0.06)`, borderRadius: 8, marginBottom: 10, borderLeft: `3px solid ${item.color}` }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--ink)', lineHeight: 1.6 }}>{item.tip}</p>
              </div>
            )}

            {item.audioKey && (
              <button
                type="button"
                onClick={() => onAudio(item.audioKey!)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: `rgba(${rgb},0.1)`, border: `1.5px solid rgba(${rgb},0.3)`, borderRadius: 100, color: item.color, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                🔊 Escuchar de nuevo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── DragExercise ───────────────────────────────────────────────────────────── */
function DragExercise({
  item, onComplete, isCompleted,
}: { item: ExerciseItem; onComplete: (id: string) => void; isCompleted: boolean }) {
  const [placed, setPlaced] = useState<Chip[]>([]);
  const [bank, setBank]     = useState<Chip[]>(item.chips ?? []);
  const [feedback, setFeedback] = useState('');

  useEffect(() => { setPlaced([]); setBank(item.chips ?? []); setFeedback(''); }, [item.id]);

  function add(chip: Chip) {
    if (isCompleted || placed.length >= (item.correctOrder?.length ?? 0)) return;
    setBank(p => p.filter(c => c.idx !== chip.idx));
    setPlaced(p => [...p, chip]);
    setFeedback('');
  }
  function remove(chip: Chip) {
    if (isCompleted) return;
    setPlaced(p => p.filter(c => c.idx !== chip.idx));
    setBank(p => [...p, chip].sort((a, b) => a.idx - b.idx));
    setFeedback('');
  }
  function clear() {
    if (isCompleted) return;
    setPlaced([]);
    setBank(item.chips ?? []);
    setFeedback('');
  }
  function validate() {
    const order = placed.map(c => c.idx);
    const ok = order.length === item.correctOrder?.length && order.every((v, i) => v === item.correctOrder![i]);
    setFeedback(ok ? item.feedback.ok : item.feedback.err);
    if (ok) onComplete(item.id);
  }

  const isOk = feedback === item.feedback.ok;
  const full  = placed.length === (item.correctOrder?.length ?? 0);

  return (
    <>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>{item.question}</p>
      {item.source && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--wl-on-panel-link, #6c63ff)', marginBottom: 8 }}>{item.source}</span>}
      {item.hint && <p style={{ margin: '0 0 12px', fontSize: 11, color: 'var(--muted)' }}>{item.hint}</p>}
      {item.speak && (
        <button type="button" onClick={() => playAudio(item.speak!)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '6px 14px', color: 'var(--wl-on-panel-link, #6c63ff)', fontSize: 12, cursor: 'pointer', marginBottom: 14 }}>
          🔊 Escuchar frase
        </button>
      )}
      {/* Drop zone */}
      <div style={{ minHeight: 48, background: 'var(--bg-2)', border: '2px dashed var(--line-soft)', borderRadius: 10, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        {placed.length === 0
          ? <span style={{ fontSize: 12, color: 'var(--muted)' }}>Toca las palabras en orden correcto</span>
          : placed.map(chip => (
            <button key={`p-${chip.idx}`} type="button" onClick={() => remove(chip)} style={{ padding: '6px 12px', background: isCompleted ? 'rgba(45,155,78,0.08)' : 'rgba(108,99,255,0.08)', border: `1px solid ${isCompleted ? 'rgba(45,155,78,0.3)' : 'rgba(108,99,255,0.25)'}`, borderRadius: 8, fontSize: chip.kr ? 15 : 13, fontFamily: chip.kr ? "'Noto Sans KR', sans-serif" : 'inherit', cursor: isCompleted ? 'default' : 'pointer', color: isCompleted ? '#2d9b4e' : '#6c63ff' }}>
              {chip.word}
              {chip.sub && <span style={{ display: 'block', fontSize: 9, color: isCompleted ? '#2d9b4e' : 'var(--muted)', marginTop: 1 }}>{chip.sub}</span>}
            </button>
          ))
        }
      </div>
      {/* Bank */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {bank.map(chip => (
          <button key={`b-${chip.idx}`} type="button" onClick={() => add(chip)} style={{ padding: '6px 12px', background: chip.trap ? 'rgba(220,53,69,0.04)' : chip.kr ? 'rgba(108,99,255,0.05)' : 'var(--bg)', border: `1px solid ${chip.trap ? 'rgba(220,53,69,0.2)' : chip.kr ? 'rgba(108,99,255,0.2)' : 'var(--line-soft)'}`, borderRadius: 8, fontSize: chip.kr ? 15 : 13, fontFamily: chip.kr ? "'Noto Sans KR', sans-serif" : 'inherit', cursor: 'pointer', color: chip.trap ? 'rgba(220,53,69,0.5)' : chip.kr ? '#6c63ff' : 'var(--ink)' }}>
            {chip.word}
            {chip.sub && <span style={{ display: 'block', fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>{chip.sub}</span>}
          </button>
        ))}
      </div>
      {feedback && (
        <div style={{ background: isOk ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${isOk ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: isOk ? '#2d9b4e' : '#dc3545', lineHeight: 1.6, marginBottom: 10 }}>
          {feedback}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button type="button" onClick={validate} disabled={!full || isCompleted} style={{ padding: '10px', background: !full || isCompleted ? 'var(--bg-2)' : '#6c63ff', border: 'none', borderRadius: 10, color: !full || isCompleted ? 'var(--muted)' : '#fff', fontSize: 13, fontWeight: 600, cursor: !full || isCompleted ? 'default' : 'pointer' }}>
          Validar orden
        </button>
        <button type="button" onClick={clear} style={{ padding: '10px', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 10, color: 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Limpiar
        </button>
      </div>
      {isCompleted && (
        <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 12, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 600 }}>✓ Completado</p>
      )}
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function Activation001({ onComplete }: Props) {
  const [phase, setPhase]           = useState<'intro' | 'listening' | 'questions' | 'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]     = useState(290);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [rate, setRate]             = useState(1);
  const [canSkip, setCanSkip]       = useState(false);
  const [newPulse, setNewPulse]     = useState(false);
  // Questions state
  const [qAnswers, setQAnswers]     = useState<Record<string, string>>({});
  const [qChecked, setQChecked]     = useState(false);
  const [qScore, setQScore]         = useState(0);
  // Exercise state (choices only; drag exercises manage their own state)
  const [exAnswers, setExAnswers]   = useState<Record<string, string>>({});
  const [exFeedback, setExFeedback] = useState<Record<string, string>>({});
  const [exCompleted, setExCompleted] = useState(new Set<string>());

  const audioRef      = useRef<HTMLAudioElement>(null);
  const bottomRef     = useRef<HTMLDivElement>(null);
  const autoPlayedRef = useRef(new Set<string>());
  const pulseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleTimeline  = TIMELINE.filter(t => currentTime >= t.at);
  const visibleExercises = EXERCISES.filter(e => currentTime >= e.at);

  // Build combined feed sorted by timestamp
  type FeedEntry =
    | { kind: 'card'; at: number; item: TimelineItem }
    | { kind: 'exercise'; at: number; item: ExerciseItem };

  const feed: FeedEntry[] = [
    ...visibleTimeline.map(t => ({ kind: 'card' as const, at: t.at, item: t })),
    ...visibleExercises.map(e => ({ kind: 'exercise' as const, at: e.at, item: e })),
  ].sort((a, b) => a.at - b.at);

  const latestCardId = [...visibleTimeline].pop()?.id;

  // Skip unlock after 60s
  useEffect(() => {
    if (phase !== 'listening') return;
    const t = setTimeout(() => setCanSkip(true), 60_000);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-play audio for new vocab cards
  useEffect(() => {
    if (phase !== 'listening') return;
    const latest = visibleTimeline[visibleTimeline.length - 1];
    if (!latest?.audioKey) return;
    if (autoPlayedRef.current.has(latest.id)) return;
    autoPlayedRef.current.add(latest.id);
    setNewPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setNewPulse(false), 2000);
    const t = setTimeout(() => playAudio(latest.audioKey!), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTimeline.length, phase]);

  // Auto-scroll to bottom when feed grows
  useEffect(() => {
    if (phase !== 'listening') return;
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed.length]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause(); else a.play().catch(() => {});
  }

  function changeRate(r: number) {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration > 0) audioRef.current.currentTime = ratio * duration;
  }

  function handleChoice(ex: ExerciseItem, label: string) {
    if (exCompleted.has(ex.id)) return;
    setExAnswers(p => ({ ...p, [ex.id]: label }));
    const ok = ex.choices?.find(c => c.label === label)?.correct ?? false;
    setExFeedback(p => ({ ...p, [ex.id]: ok ? ex.feedback.ok : ex.feedback.err }));
    if (ok) setExCompleted(p => new Set([...p, ex.id]));
  }

  function handleQAnswer(qId: string, opt: string) {
    if (qChecked) return;
    setQAnswers(p => ({ ...p, [qId]: opt }));
  }

  function handleCheckQuestions() {
    if (!QUESTIONS.every(q => qAnswers[q.id]) || qChecked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (qAnswers[q.id] === q.correct ? 1 : 0), 0);
    setQScore(s);
    setQChecked(true);
  }

  const progress      = duration > 0 ? (currentTime / duration) * 100 : 0;
  const allQAnswered  = QUESTIONS.every(q => qAnswers[q.id]);

  /* ── INTRO ─────────────────────────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          ETAPA 01 DE 11 · Activación
        </p>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
          저는 학교에 가요 — El secreto del coreano
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
          Sofía y Carlos descubren el patrón más importante del coreano: el verbo siempre al final. Escucha el podcast y activa tu radar antes de las tarjetas.
        </p>

        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--wl-on-panel-link, #6c63ff)' }}>Cómo funciona</p>
          <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Escucha el podcast — ~5 minutos de inmersión en coreano real',
              'Las tarjetas de vocabulario y gramática aparecen solas al ritmo del audio',
              'Cada tarjeta profundiza: desglose, ejemplos y tips culturales',
              'Los ejercicios te llegan en el momento exacto en que el concepto está fresco',
              'Al terminar, 3 preguntas rápidas para verificar lo que absorbiste',
            ].map((text, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={() => {
            setPhase('listening');
            setTimeout(() => { audioRef.current?.play().catch(() => {}); }, 100);
          }}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Escuchar el podcast →
        </button>
      </section>
    );
  }

  /* ── LISTENING ─────────────────────────────────────────────────────────────── */
  if (phase === 'listening') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <audio
          ref={audioRef}
          src={KR_PODCAST}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setPhase('questions'); }}
        />

        {/* Player */}
        <div style={{
          background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
          borderRadius: 16, padding: '1.25rem 1.25rem 1rem',
          marginBottom: 20, position: 'sticky', top: 0, zIndex: 10,
          boxShadow: newPulse
            ? '0 8px 40px rgba(108,99,255,0.5), 0 0 0 2px rgba(108,99,255,0.4)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Equalizer bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2, background: '#6c63ff',
                    height: isPlaying ? `${6 + h * 10}px` : '4px',
                    animation: isPlaying ? `act1Eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                    transition: 'height 0.15s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700, letterSpacing: '0.12em' }}>
                PODCAST · STEP 001
              </span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          {/* Segment label */}
          <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Segmento: </span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{activeSegment(currentTime)}</span>
          </p>

          {/* Progress bar (clickable) */}
          <div
            onClick={handleProgressClick}
            style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 12, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s linear' }} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button type="button" onClick={togglePlay} style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', border: 'none', color: '#fff', fontSize: 17, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(108,99,255,0.4)' }}>
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div style={{ display: 'flex', gap: 4 }}>
              {[0.75, 1, 1.25, 1.5].map(r => (
                <button key={r} type="button" onClick={() => changeRate(r)} style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${rate === r ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`, background: rate === r ? 'rgba(108,99,255,0.3)' : 'transparent', color: rate === r ? '#a78bfa' : 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: rate === r ? 700 : 400, cursor: 'pointer' }}>
                  {r}×
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--mono)' }}>
              {feed.length}/{TIMELINE.length + EXERCISES.length} tarjetas
            </span>

            {canSkip && (
              <button type="button" onClick={() => setPhase('questions')} style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                Saltar →
              </button>
            )}
          </div>
        </div>

        {/* Card + exercise feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {feed.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎧</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                Reproduce el audio — las tarjetas y ejercicios aparecen solos
              </p>
            </div>
          )}

          {feed.map(entry => {
            if (entry.kind === 'card') {
              return (
                <TimelineCard
                  key={entry.item.id}
                  item={entry.item}
                  isLatest={entry.item.id === latestCardId}
                  onAudio={playAudio}
                />
              );
            }
            // Exercise card
            const ex = entry.item;
            const isDone = exCompleted.has(ex.id);
            const feedback = exFeedback[ex.id] ?? '';
            const isOk = feedback === ex.feedback.ok;
            return (
              <article key={ex.id} style={{
                background: 'var(--bg)', border: `2px solid ${isDone ? '#2d9b4e' : '#e6930a'}`,
                borderRadius: 14, overflow: 'hidden',
                animation: 'act1CardIn 0.45s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                {/* Exercise header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: isDone ? 'rgba(45,155,78,0.08)' : 'rgba(230,147,10,0.08)', borderBottom: `1px solid ${isDone ? 'rgba(45,155,78,0.15)' : 'rgba(230,147,10,0.15)'}` }}>
                  <span style={{ fontSize: 13 }}>✏️</span>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: isDone ? '#2d9b4e' : '#e6930a' }}>
                    EJERCICIO
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', marginLeft: 4 }}>{ex.title}</span>
                  {isDone && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>✓ Completado</span>}
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', marginLeft: isDone ? 0 : 'auto' }}>{fmt(ex.at)}</span>
                </div>

                <div style={{ padding: '14px 16px' }}>
                  {ex.type === 'choice' ? (
                    <>
                      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>{ex.question}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                        {ex.choices?.map(c => {
                          const sel      = exAnswers[ex.id] === c.label;
                          const showOk   = sel && c.correct;
                          const showErr  = sel && !c.correct;
                          return (
                            <button key={c.label} type="button" onClick={() => handleChoice(ex, c.label)} style={{ padding: '10px 12px', background: showOk ? 'rgba(45,155,78,0.06)' : showErr ? 'rgba(220,53,69,0.05)' : sel ? 'rgba(108,99,255,0.06)' : 'var(--bg)', border: `1.5px solid ${showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : 'var(--line-soft)'}`, borderRadius: 10, fontSize: c.kr ? 15 : 13, fontFamily: c.kr ? "'Noto Sans KR', sans-serif" : 'inherit', textAlign: 'left', cursor: isDone ? 'default' : 'pointer', lineHeight: 1.5, color: showOk ? '#2d9b4e' : showErr ? '#dc3545' : 'var(--ink)' }}>
                              {c.label}
                              {c.note && <span style={{ display: 'block', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{c.note}</span>}
                            </button>
                          );
                        })}
                      </div>
                      {feedback && (
                        <div style={{ background: isOk ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${isOk ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: isOk ? '#2d9b4e' : '#dc3545', lineHeight: 1.6 }}>
                          {feedback}
                        </div>
                      )}
                    </>
                  ) : (
                    <DragExercise
                      item={ex}
                      onComplete={id => setExCompleted(p => new Set([...p, id]))}
                      isCompleted={isDone}
                    />
                  )}
                </div>
              </article>
            );
          })}

          <div ref={bottomRef} style={{ height: 1 }} />
        </div>

        {/* CSS animations */}
        <style>{`
          @keyframes act1CardIn {
            from { opacity: 0; transform: translateY(18px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes act1Eq0 { from { height: 6px; }  to { height: 14px; } }
          @keyframes act1Eq1 { from { height: 4px; }  to { height: 11px; } }
          @keyframes act1Eq2 { from { height: 8px; }  to { height: 15px; } }
          @keyframes act1Eq3 { from { height: 3px; }  to { height: 10px; } }
          @keyframes act1Eq4 { from { height: 6px; }  to { height: 13px; } }
        `}</style>
      </section>
    );
  }

  /* ── QUESTIONS ─────────────────────────────────────────────────────────────── */
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)' }}>
          Comprensión global
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Tres preguntas rápidas. Confía en lo que escuchaste y en las tarjetas.
        </p>

        {QUESTIONS.map(q => (
          <article key={q.id} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>{q.q}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map(opt => {
                const sel     = qAnswers[q.id] === opt;
                const showOk  = qChecked && opt === q.correct;
                const showErr = qChecked && sel && opt !== q.correct;
                return (
                  <button key={opt} type="button" onClick={() => handleQAnswer(q.id, opt)} disabled={qChecked} style={{ padding: '10px 12px', background: showOk ? 'rgba(45,155,78,0.08)' : showErr ? 'rgba(220,53,69,0.06)' : sel ? 'rgba(108,99,255,0.07)' : 'var(--bg)', border: `1.5px solid ${showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : 'var(--line-soft)'}`, borderRadius: 9, fontSize: 13, fontFamily: /[가-힣]/.test(opt) ? "'Noto Sans KR', sans-serif" : 'inherit', textAlign: 'center', cursor: qChecked ? 'default' : 'pointer', color: showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : 'var(--ink)', fontWeight: sel ? 600 : 400, transition: 'all 0.12s' }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </article>
        ))}

        {allQAnswered && !qChecked && (
          <button type="button" onClick={handleCheckQuestions} style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}>
            Verificar respuestas
          </button>
        )}

        {qChecked && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: qScore === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${qScore === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: qScore === 3 ? '#2d9b4e' : '#6c63ff' }}>{qScore}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {qScore === 3
                  ? '¡Perfecto! El patrón SOV ya está grabado en tu cabeza.'
                  : qScore >= 2
                  ? 'Muy bien. Casi todo. El siguiente bloque lo refuerza.'
                  : 'Normal para la primera vez. Las tarjetas siguen repasándolo.'}
              </p>
            </div>
            <button type="button" onClick={() => { setPhase('complete'); onComplete?.(); }} style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Continuar →
            </button>
          </div>
        )}
      </section>
    );
  }

  /* ── COMPLETE ──────────────────────────────────────────────────────────────── */
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', border: '2px solid #6c63ff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✓</div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>Activación completada</h3>
      <p style={{ margin: '0 0 10px', fontSize: 22, color: 'var(--wl-on-panel-link, #6c63ff)', fontFamily: "'Noto Sans KR', sans-serif" }}>저는 학교에 가요</p>
      <p style={{ margin: '0 0 28px', fontSize: 12, color: 'var(--muted)' }}>Yo · escuela-hacia · voy — el patrón SOV ya está activo.</p>
      <button type="button" onClick={onComplete} style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Siguiente etapa →
      </button>
    </section>
  );
}
