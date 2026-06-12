'use client';

import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import KoreanCycle from './KoreanCycle';
import KoreanCompounds from './KoreanCompounds';

// ─────────────────────────────────────────────────────────────────────────────
// Language catalogue
// ─────────────────────────────────────────────────────────────────────────────

interface LangEntry {
  slug: string;
  flag: string;
  name: string;
  tagline: string;
  color: string;
  available: boolean;
  href?: string;
  tools?: string;
}

const LANGUAGES: LangEntry[] = [
  { slug: 'english',    flag: '🇬🇧', name: 'Inglés',    tagline: 'Vocabulario, pronunciación y gramática desde cero.',         color: '#0066cc', available: false },
  { slug: 'german',     flag: '🇩🇪', name: 'Alemán',    tagline: 'Casos gramaticales, declinaciones y fonética alemana.',       color: '#dd0000', available: false },
  { slug: 'french',     flag: '🇫🇷', name: 'Francés',   tagline: 'Liaison, géneros y conjugaciones del francés moderno.',       color: '#003189', available: false },
  { slug: 'italian',    flag: '🇮🇹', name: 'Italiano',  tagline: 'Artículos, tiempos verbales y gramática interactiva.',        color: '#009246', available: true, href: '/practica/italiano/grammatica', tools: '1 herramienta' },
  { slug: 'portuguese', flag: '🇧🇷', name: 'Portugués', tagline: 'Diferencias BR vs PT, nasales y verbos irregulares.',        color: '#009c3b', available: false },
  { slug: 'russian',    flag: '🇷🇺', name: 'Ruso',      tagline: 'Alfabeto cirílico, casos y pronunciación desde cero.',        color: '#cc0000', available: false },
  { slug: 'korean',     flag: '🇰🇷', name: 'Coreano',   tagline: 'Hangul, batchim, partículas y pronunciación interactiva.',   color: '#534AB7', available: true  },
  { slug: 'japanese',   flag: '🇯🇵', name: 'Japonés',   tagline: 'Hiragana, katakana, kanji básico y entonación.',             color: '#bc002d', available: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Korean Unicode utilities
// ─────────────────────────────────────────────────────────────────────────────

const CHOSEONG  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNGSEONG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONGSEONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CHO_ROM: Record<string, string> = {
  ㄱ:'g', ㄲ:'kk', ㄴ:'n', ㄷ:'d', ㄸ:'tt', ㄹ:'r', ㅁ:'m', ㅂ:'b', ㅃ:'pp',
  ㅅ:'s', ㅆ:'ss', ㅇ:'', ㅈ:'j', ㅉ:'jj', ㅊ:'ch', ㅋ:'k', ㅌ:'t', ㅍ:'p', ㅎ:'h',
};
const JUNG_ROM: Record<string, string> = {
  ㅏ:'a', ㅐ:'ae', ㅑ:'ya', ㅒ:'yae', ㅓ:'eo', ㅔ:'e', ㅕ:'yeo', ㅖ:'ye',
  ㅗ:'o', ㅘ:'wa', ㅙ:'wae', ㅚ:'oe', ㅛ:'yo', ㅜ:'u', ㅝ:'wo', ㅞ:'we',
  ㅟ:'wi', ㅠ:'yu', ㅡ:'eu', ㅢ:'ui', ㅣ:'i',
};
const JONG_ROM: Record<string, string> = {
  '':'', ㄱ:'k', ㄲ:'k', ㄳ:'k', ㄴ:'n', ㄵ:'n', ㄶ:'n', ㄷ:'t', ㄹ:'l',
  ㄺ:'k', ㄻ:'m', ㄼ:'l', ㄽ:'l', ㄾ:'t', ㄿ:'p', ㅀ:'l', ㅁ:'m', ㅂ:'p',
  ㅄ:'p', ㅅ:'t', ㅆ:'t', ㅇ:'ng', ㅈ:'t', ㅊ:'t', ㅋ:'k', ㅌ:'t', ㅍ:'p', ㅎ:'t',
};

interface SyllableData {
  char: string; cho: string; jung: string; jong: string;
  romanization: string; isHangul: boolean;
}

function decompose(char: string): SyllableData {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return { char, cho:'', jung:'', jong:'', romanization: char, isHangul: false };
  const jongIdx = code % 28;
  const jungIdx = Math.floor(code / 28) % 21;
  const choIdx  = Math.floor(code / 28 / 21);
  const cho = CHOSEONG[choIdx], jung = JUNGSEONG[jungIdx], jong = JONGSEONG[jongIdx];
  return { char, cho, jung, jong, isHangul: true,
    romanization: (CHO_ROM[cho] ?? '') + (JUNG_ROM[jung] ?? '') + (JONG_ROM[jong] ?? '') };
}

function analyzeText(text: string): SyllableData[] { return text.split('').map(decompose); }

function speak(text: string, slow = false) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR'; u.rate = slow ? 0.5 : 0.8;
  window.speechSynthesis.speak(u);
}

// ─────────────────────────────────────────────────────────────────────────────
// Color system — single source of truth
// ─────────────────────────────────────────────────────────────────────────────

const JAMO_COLORS = {
  cho:  { hex: '#534AB7', label: '초성',  labelEs: 'Consonante inicial', desc: 'La consonante que abre la sílaba. Si no hay consonante, se escribe ㅇ (silente).' },
  jung: { hex: '#2563eb', label: '중성',  labelEs: 'Vocal',              desc: 'El núcleo vocálico. Puede ser simple (ㅏ) o diptongo compuesto (ㅘ, ㅝ…).' },
  jong: { hex: '#d97706', label: '종성',  labelEs: 'Batchim (final)',     desc: 'Consonante final opcional. Si existe, define las reglas fonéticas de la sílaba.' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Batchim rules
// ─────────────────────────────────────────────────────────────────────────────

interface BatchimExample { written: string; spoken: string; romanWritten: string; romanSpoken: string; note: string; }
interface BatchimRule { id: string; emoji: string; name: string; nameEs: string; color: string; explanation: string; trigger: string; examples: BatchimExample[]; }

const BATCHIM_RULES: BatchimRule[] = [
  { id:'yeonneum', emoji:'🔗', name:'연음', nameEs:'Enlace silábico', color:'#534AB7',
    explanation:'Cuando una sílaba termina en consonante (batchim) y la siguiente empieza con ㅇ (inicial muda), la consonante final "se mueve" para abrir la sílaba siguiente. No hay sonido extra — solo se redistribuyen los fonemas.',
    trigger:'batchim + vocal siguiente (ㅇ inicial)',
    examples:[
      { written:'먹어요', spoken:'머거요', romanWritten:'meok·eo·yo', romanSpoken:'meo·geo·yo', note:'ㄱ pasa a ser inicio de 어' },
      { written:'있어요', spoken:'이써요', romanWritten:'iss·eo·yo',  romanSpoken:'i·sseo·yo',  note:'ㅆ se mueve al inicio de 어' },
      { written:'읽어요', spoken:'일거요', romanWritten:'ilg·eo·yo',  romanSpoken:'il·geo·yo',  note:'de ㄺ solo ㄱ se enlaza' },
    ] },
  { id:'neutralization', emoji:'⚖️', name:'평파열음화', nameEs:'Neutralización', color:'#d97706',
    explanation:'En posición final de sílaba, solo 7 consonantes pueden existir: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ. Las demás se "neutralizan" al representante más cercano. Por eso muchas palabras suenan iguales al final.',
    trigger:'consonante en posición final ante otra consonante o pausa',
    examples:[
      { written:'부엌', spoken:'부억', romanWritten:'bu·eok\'', romanSpoken:'bu·eok', note:'ㅋ → [ㄱ]' },
      { written:'낮',   spoken:'낟',   romanWritten:'nat\'',    romanSpoken:'nat',    note:'ㅈ → [ㄷ]' },
      { written:'앞',   spoken:'압',   romanWritten:'ap\'',     romanSpoken:'ap',     note:'ㅍ → [ㅂ]' },
    ] },
  { id:'nasalization', emoji:'👃', name:'비음화', nameEs:'Nasalización', color:'#059669',
    explanation:'Cuando un batchim obstruyente ([ㄱ], [ㄷ], [ㅂ]) va seguido de ㄴ o ㅁ, adopta la nasalidad equivalente: [ㄱ]→ㅇ, [ㄷ]→ㄴ, [ㅂ]→ㅁ.',
    trigger:'[ㄱ/ㄷ/ㅂ] + ㄴ o ㅁ',
    examples:[
      { written:'국물',  spoken:'궁물',  romanWritten:'guk·mul',  romanSpoken:'gung·mul',  note:'[ㄱ] antes de ㅁ → ㅇ' },
      { written:'합니다', spoken:'함니다', romanWritten:'hap·ni·da', romanSpoken:'ham·ni·da', note:'[ㅂ] antes de ㄴ → ㅁ' },
      { written:'학년',  spoken:'항년',  romanWritten:'hak·nyeon', romanSpoken:'hang·nyeon', note:'[ㄱ] antes de ㄴ → ㅇ' },
    ] },
  { id:'aspiration', emoji:'💨', name:'격음화', nameEs:'Aspiración', color:'#dc2626',
    explanation:'Cuando ㅎ se combina con una consonante obstruyente, se fusionan en la versión aspirada: ㄱ+ㅎ=ㅋ, ㄷ+ㅎ=ㅌ, ㅂ+ㅎ=ㅍ, ㅈ+ㅎ=ㅊ.',
    trigger:'ㅎ en contacto con ㄱ, ㄷ, ㅂ o ㅈ',
    examples:[
      { written:'좋다', spoken:'조타', romanWritten:'joh·da', romanSpoken:'jo·ta', note:'ㅎ + ㄷ → ㅌ' },
      { written:'많다', spoken:'만타', romanWritten:'man·da', romanSpoken:'man·ta', note:'ㄶ: ㅎ + ㄷ → ㅌ' },
      { written:'넣고', spoken:'너코', romanWritten:'neo·h·go', romanSpoken:'neo·ko', note:'ㅎ + ㄱ → ㅋ' },
    ] },
  { id:'lateralization', emoji:'🌊', name:'유음화', nameEs:'Lateralización', color:'#2563eb',
    explanation:'Cuando ㄴ y ㄹ se encuentran (en cualquier orden), ambos se convierten en ㄹ, creando el sonido "l-l".',
    trigger:'ㄴ + ㄹ  o  ㄹ + ㄴ',
    examples:[
      { written:'난로', spoken:'날로', romanWritten:'nan·ro', romanSpoken:'nal·lo', note:'ㄴ + ㄹ → ㄹ·ㄹ' },
      { written:'신라', spoken:'실라', romanWritten:'sin·ra', romanSpoken:'sil·la', note:'ㄴ + ㄹ → ㄹ·ㄹ' },
      { written:'설날', spoken:'설랄', romanWritten:'seol·nal', romanSpoken:'seol·lal', note:'ㄹ + ㄴ → ㄹ·ㄹ' },
    ] },
];

const STARTER_TEXTS = ['안녕하세요', '감사합니다', '한국어 공부해요', '커피 주세요', '화장실 있어요'];
const XP_PER_LEVEL  = 200;

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticaClient() {
  const [selected,  setSelected]  = useState<string | null>(null);
  const [xp,        setXp]        = useState(0);
  const [activeTab, setActiveTab] = useState<'reader' | 'batchim' | 'quiz' | 'jamo' | 'cycle' | 'compounds'>('reader');

  const addXp = useCallback((n: number) => setXp(p => p + n), []);

  const lang      = LANGUAGES.find(l => l.slug === selected);
  const level     = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel = xp % XP_PER_LEVEL;
  const xpPct     = (xpInLevel / XP_PER_LEVEL) * 100;

  /* ── Language grid ──────────────────────────────────────────────────────── */
  if (!selected) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Herramientas gratuitas de práctica
          </p>
          <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
            Elige una herramienta
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 2rem' }}>
            Desglose silábico, pronunciación interactiva y práctica de estrés para exámenes.
          </p>

          {/* Exam practice block */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
              Práctica de exámenes
            </p>

            {/* IELTS Writing Task 1 card */}
            <Link
              href="/practica/ielts-writing-conectores"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, rgba(15,61,140,0.07) 0%, rgba(37,99,235,0.04) 100%)',
                border: '1.5px solid rgba(15,61,140,0.2)',
                borderRadius: 18,
                overflow: 'hidden',
                marginBottom: '0.75rem',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(15,61,140,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,61,140,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,61,140,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #0f3d8c, #2563eb)', flexShrink: 0 }} />
              <div style={{ padding: '1.4rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.55rem' }}>
                  <span style={{ fontSize: '1.9rem' }}>🇬🇧</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>IELTS Writing Task 1</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#0f3d8c', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        NUEVO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      Coherence &amp; Cohesion · Ordena oraciones + identifica conectores trampa
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {['📝 7 oraciones reales', '🔗 13 conectores', '⚠️ Trampas ocultas', '📊 Feedback Band 6–7'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(15,61,140,0.08)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#0f3d8c', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>

            {/* English Comprehension card */}
            <Link
              href="/practica/the-grandmothers-ledger"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, rgba(5,150,105,0.07) 0%, rgba(16,185,129,0.04) 100%)',
                border: '1.5px solid rgba(5,150,105,0.2)',
                borderRadius: 18,
                overflow: 'hidden',
                marginBottom: '0.75rem',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(5,150,105,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(5,150,105,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(5,150,105,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #059669, #10b981)', flexShrink: 0 }} />
              <div style={{ padding: '1.4rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.55rem' }}>
                  <span style={{ fontSize: '1.9rem' }}>🎙️</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>The Grandmother&apos;s Ledger</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, background: '#059669', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        NUEVO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      English B1–B2 · Reading + Listening comprehension · Family dispute story
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  {['🎙 2 voice notes', '📖 Reading + Listening', '🧠 19 questions', '📊 Feedback B1–B2'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#059669', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>

            {/* ICFES card */}
            <Link
              href="/practica/icfes-saber-11"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(83,74,183,0.05) 100%)',
                border: '1.5px solid rgba(220,38,38,0.2)',
                borderRadius: 18,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(220,38,38,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.2)'; }}
            >
              <div style={{ width: 5, background: 'linear-gradient(180deg, #dc2626, #534AB7)', flexShrink: 0 }} />
              <div style={{ padding: '1.5rem 1.75rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '2rem' }}>🇨🇴</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)' }}>ICFES Saber 11</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#dc2626', color: '#fff', borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                        NUEVO
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                      Juego adaptativo · 4 niveles · Detecta tus puntos débiles
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {['🧠 Adaptativo', '💾 Checkpoint', '📋 Avisos + Diálogos', '📖 Lectura + Gramática'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 6, background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem', color: '#dc2626', fontSize: '1.2rem', fontWeight: 700 }}>
                →
              </div>
            </Link>
          </div>

          {/* Language tools */}
          <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--mono)', marginBottom: '0.85rem' }}>
            Herramientas de idiomas
          </p>
          <div className="wl-exams-catalog">
            {LANGUAGES.map(lang => {
              const cardStyle = {
                '--exam-color': lang.color,
                textAlign: 'left' as const,
                cursor: lang.available ? 'pointer' : 'default',
                appearance: 'none' as const,
                WebkitAppearance: 'none' as const,
                margin: 0,
                padding: 0,
                font: 'inherit',
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column' as const,
              } as CSSProperties;

              const inner = (
                <>
                  <div className="wl-catalog-card__bar" />
                  <div className="wl-catalog-card__body">
                    <div className="wl-catalog-card__top">
                      <span className="wl-catalog-card__flag">{lang.flag}</span>
                      {!lang.available
                        ? <span className="wl-catalog-card__badge">Próximamente</span>
                        : <span className="wl-catalog-card__badge" style={{ background:'rgba(83,74,183,0.08)', color:'#534AB7', borderColor:'rgba(83,74,183,0.25)' }}>Disponible</span>
                      }
                    </div>
                    <h2 className="wl-catalog-card__name">{lang.name}</h2>
                    <p className="wl-catalog-card__tagline">{lang.tagline}</p>
                  </div>
                  <div className="wl-catalog-card__footer">
                    <span>{lang.available ? (lang.tools ?? '3 herramientas') : 'En desarrollo'}</span>
                    <span className="wl-catalog-card__cta">
                      {lang.available ? 'Practicar →' : 'Próximamente'}
                    </span>
                  </div>
                </>
              );

              if (lang.available && lang.href) {
                return (
                  <Link
                    key={lang.slug}
                    href={lang.href}
                    className={`wl-catalog-card`}
                    style={cardStyle}
                  >
                    {inner}
                  </Link>
                );
              }

              return (
                <button
                  key={lang.slug}
                  onClick={() => lang.available && setSelected(lang.slug)}
                  className={`wl-catalog-card${!lang.available ? ' wl-catalog-card--soon' : ''}`}
                  style={cardStyle}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ── Korean tools ───────────────────────────────────────────────────────── */
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Back + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <button
              onClick={() => setSelected(null)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.82rem' }}
            >
              ← Volver
            </button>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
              Práctica / {lang?.name}
            </span>
          </div>

          {/* Page header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(83,74,183,0.08) 0%, rgba(37,99,235,0.05) 100%)',
            border: '1px solid rgba(83,74,183,0.15)',
            borderRadius: 20,
            padding: '1.75rem 2rem',
            marginBottom: '1.5rem',
          }}>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              <span className="ink-line" />{lang?.flag} Práctica de {lang?.name}
            </p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
              Herramientas interactivas
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              Desglose silábico con pronunciación real y guía completa de reglas fonéticas del Hangul.
            </p>

            {/* XP bar */}
            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--line-soft)',
              borderRadius: 12,
              padding: '0.75rem 1rem',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem', fontSize:'0.8rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>
                <span>⭐ Nivel {level}</span>
                <span>{xpInLevel} / {XP_PER_LEVEL} XP</span>
              </div>
              <div style={{ height: 6, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${xpPct}%`,
                  background: 'linear-gradient(90deg, #534AB7, #6C63FF)',
                  borderRadius: 4, transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </div>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                Toca sílabas +5 · escucha palabras +10 · explora reglas +15 · quiz correcto +20 · ciclo completo +50
              </p>
            </div>
          </div>

          {/* Speaking practice featured card */}
          <Link
            href="/practica/korean-speaking-1"
            style={{
              display: 'flex', alignItems: 'stretch', textDecoration: 'none', color: 'inherit',
              border: '1.5px solid rgba(83,74,183,0.25)',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: '1.25rem',
              background: 'linear-gradient(135deg, rgba(83,74,183,0.06) 0%, rgba(124,58,237,0.04) 100%)',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(83,74,183,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(83,74,183,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(83,74,183,0.25)'; }}
          >
            <div style={{ width: 5, background: 'linear-gradient(180deg, #534AB7, #7c3aed)', flexShrink: 0 }} />
            <div style={{ padding: '1.1rem 1.4rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🗣️</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>Coreano Introductorio 1</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 800, background: '#534AB7', color: '#fff', borderRadius: 4, padding: '0.1rem 0.45rem', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>NUEVO</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Mi primera presentación oral · 7 pasos guiados</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['🆘 Supervivencia', '📜 Modelo', '✏️ Personalizar', '🧩 Construir frases', '🎤 Presentación final'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(83,74,183,0.1)', color: '#534AB7', border: '1px solid rgba(83,74,183,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.25rem', color: '#534AB7', fontSize: '1.1rem', fontWeight: 700 }}>
              →
            </div>
          </Link>

          {/* Tool tabs */}
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {([
              { id:'cycle',     label:'🔄 Ciclo de aprendizaje', badge: null   },
              { id:'compounds', label:'🧩 Bloques de vocabulario',badge: 'NUEVO'},
              { id:'reader',    label:'📖 Lector de Hangul',     badge: null   },
              { id:'jamo',      label:'🔡 Tabla de Jamo',         badge: null   },
              { id:'batchim',   label:'🎵 Reglas de Batchim',     badge: null   },
              { id:'quiz',      label:'🧠 Quiz',                  badge: null   },
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ fontSize: '0.85rem', position:'relative' }}
              >
                {tab.label}
                {tab.badge && (
                  <span style={{
                    position:'absolute', top:'-6px', right:'-4px',
                    background:'#e11d48', color:'#fff',
                    fontSize:'0.5rem', fontWeight:900, fontFamily:'var(--mono)',
                    padding:'1px 4px', borderRadius:4, letterSpacing:'0.06em',
                    lineHeight:1.4,
                  }}>{tab.badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* Tool content */}
          {activeTab === 'cycle'     && <KoreanCycle      addXp={addXp} />}
          {activeTab === 'compounds' && <KoreanCompounds  addXp={addXp} />}
          {activeTab === 'reader'    && <KoreanReader     addXp={addXp} />}
          {activeTab === 'jamo'      && <JamoTable         addXp={addXp} />}
          {activeTab === 'batchim'   && <BatchimAnalyzer   addXp={addXp} />}
          {activeTab === 'quiz'      && <SyllableQuiz      addXp={addXp} />}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Legend — reutilizable
// ─────────────────────────────────────────────────────────────────────────────

function JamoColorLegend() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.6rem',
      marginBottom: '1.25rem',
    }}>
      {Object.entries(JAMO_COLORS).map(([key, c]) => (
        <div key={key} style={{
          background: `${c.hex}0d`,
          border: `1.5px solid ${c.hex}33`,
          borderRadius: 12,
          padding: '0.75rem 0.85rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
            <span style={{
              display: 'inline-block', width: 10, height: 10,
              borderRadius: '50%', background: c.hex, flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: c.hex, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {c.label}
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.2rem' }}>
            {c.labelEs}
          </div>
          <div style={{ fontSize: '0.73rem', color: 'var(--muted)', lineHeight: 1.45 }}>
            {c.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 1 – Korean Reader
// ─────────────────────────────────────────────────────────────────────────────

function KoreanReader({ addXp }: { addXp: (n: number) => void }) {
  const [input,     setInput]     = useState('안녕하세요');
  const [syllables, setSyllables] = useState<SyllableData[]>(() => analyzeText('안녕하세요'));
  const [selected,  setSelected]  = useState<number | null>(null);
  const [history,   setHistory]   = useState<string[]>(['안녕하세요']);

  function handleAnalyze() {
    const t = input.trim(); if (!t) return;
    const analyzed = analyzeText(t);
    setSyllables(analyzed);
    setSelected(null);
    setHistory(prev => {
      const next = [t, ...prev.filter(h => h !== t)].slice(0, 6);
      return next;
    });
  }
  function handleSpeakFull(slow = false) { speak(input, slow); addXp(10); }
  function handleClickSyllable(idx: number, char: string) { setSelected(idx); speak(char); addXp(5); }
  function handleQuick(text: string) {
    setInput(text);
    setSyllables(analyzeText(text));
    setSelected(null);
  }

  const fullRoman    = syllables.map(s => s.romanization).join('-');
  const hangulSylls  = syllables.filter(s => s.isHangul);
  const withBatchim  = hangulSylls.filter(s => s.jong).length;
  const withoutBatch = hangulSylls.length - withBatchim;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

      {/* Input */}
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ marginBottom:'0.75rem' }}>
          <span className="ink-line" />Escribe texto en coreano
        </p>
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAnalyze(); }}
            placeholder="예: 안녕하세요"
            style={{
              flex:'1 1 180px', padding:'0.75rem 1rem', fontSize:'1.1rem',
              borderRadius:10, border:'1.5px solid var(--line-soft)',
              background:'var(--bg)', color:'var(--ink)', fontFamily:'inherit', outline:'none',
            }}
          />
          <button onClick={handleAnalyze} className="btn btn-sm" style={{ fontSize:'0.9rem', padding:'0.75rem 1.25rem' }}>
            Analizar →
          </button>
        </div>

        {/* Quick examples */}
        <div style={{ marginTop:'0.85rem' }}>
          <span style={{ fontSize:'0.7rem', color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginRight:'0.5rem' }}>Ejemplos:</span>
          <div style={{ display:'inline-flex', gap:'0.4rem', flexWrap:'wrap', marginTop:'0.3rem' }}>
            {STARTER_TEXTS.map(t => (
              <button key={t} onClick={() => handleQuick(t)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize:'0.78rem', padding:'0.25rem 0.65rem' }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 1 && (
          <div style={{ marginTop:'0.75rem', paddingTop:'0.75rem', borderTop:'1px solid var(--line-soft)' }}>
            <span style={{ fontSize:'0.7rem', color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginRight:'0.5rem' }}>Historial:</span>
            <div style={{ display:'inline-flex', gap:'0.4rem', flexWrap:'wrap', marginTop:'0.3rem' }}>
              {history.slice(1).map(t => (
                <button key={t} onClick={() => handleQuick(t)}
                  style={{
                    fontSize:'0.8rem', padding:'0.2rem 0.6rem',
                    borderRadius:8, border:'1px solid rgba(83,74,183,0.25)',
                    background:'rgba(83,74,183,0.05)', color:'#534AB7',
                    cursor:'pointer', fontFamily:'inherit',
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Syllable grid */}
      {syllables.length > 0 && (
        <div className="wl-card" style={{ padding:'1.5rem' }}>

          {/* Header with stats */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'0.75rem', marginBottom:'1rem' }}>
            <div>
              <p className="eyebrow" style={{ margin:'0 0 0.4rem' }}><span className="ink-line" />Desglose silábico</p>
              <div style={{ display:'flex', gap:'0.75rem', fontSize:'0.75rem', fontFamily:'var(--mono)', color:'var(--muted)' }}>
                <span style={{ color:'#534AB7', fontWeight:700 }}>{hangulSylls.length} sílabas</span>
                {withBatchim > 0 && <span style={{ color:'#d97706' }}>· {withBatchim} con batchim</span>}
                {withoutBatch > 0 && <span style={{ color:'#2563eb' }}>· {withoutBatch} abiertas</span>}
              </div>
            </div>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button onClick={() => handleSpeakFull(false)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.78rem' }}>▶ Escuchar</button>
              <button onClick={() => handleSpeakFull(true)}  className="btn btn-ghost btn-sm" style={{ fontSize:'0.78rem' }}>🐢 Lento</button>
            </div>
          </div>

          {/* Color legend */}
          <JamoColorLegend />

          {/* Romanization */}
          <p style={{
            textAlign:'center', fontSize:'1rem', color:'var(--muted)',
            fontStyle:'italic', fontFamily:'var(--mono)', margin:'0 0 1.25rem',
            letterSpacing:'0.04em',
            background:'var(--bg-2, rgba(0,0,0,0.03))',
            borderRadius:8, padding:'0.5rem 1rem',
            border:'1px solid var(--line-soft)',
          }}>
            [{fullRoman}]
          </p>

          {/* Cards grid */}
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
            {syllables.map((s, idx) => (
              <SyllableCard
                key={idx}
                s={s}
                idx={idx}
                selected={selected}
                onSelect={handleClickSyllable}
              />
            ))}
          </div>
        </div>
      )}

      {/* Detail card */}
      {selected !== null && syllables[selected]?.isHangul && (
        <SyllableDetail syllable={syllables[selected]} />
      )}

      {/* Tip */}
      <div style={{
        padding:'0.85rem 1.1rem',
        borderRadius:12,
        background:'rgba(83,74,183,0.06)',
        border:'1px solid rgba(83,74,183,0.15)',
        fontSize:'0.83rem', color:'var(--muted)', lineHeight:1.6,
      }}>
        💡 <strong style={{ color:'var(--ink)' }}>Tip:</strong> Haz clic en cada sílaba para escucharla (+5 XP).
        Usa <strong style={{ color:'var(--ink)' }}>Lento</strong> para apreciar cada fonema con claridad.
        La romanización sigue el sistema revisado oficial del coreano (국어의 로마자 표기법).
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Syllable card — extracted for reuse in quiz
// ─────────────────────────────────────────────────────────────────────────────

function SyllableCard({
  s, idx, selected, onSelect, highlight,
}: {
  s: SyllableData;
  idx: number;
  selected: number | null;
  onSelect: (idx: number, char: string) => void;
  highlight?: 'cho' | 'jung' | 'jong';
}) {
  const isSelected = selected === idx;
  return (
    <button
      onClick={() => s.isHangul && onSelect(idx, s.char)}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        padding:'0.85rem 0.9rem', borderRadius:14,
        border: isSelected ? `2px solid #534AB7` : '1.5px solid var(--line-soft)',
        background: isSelected ? 'rgba(83,74,183,0.08)' : 'var(--bg)',
        cursor: s.isHangul ? 'pointer' : 'default',
        transition: 'all 0.15s', minWidth:72,
        boxShadow: isSelected ? '0 4px 20px rgba(83,74,183,0.2)' : 'none',
        fontFamily:'inherit',
        position: 'relative',
      }}
    >
      {s.isHangul ? (
        <>
          <span style={{ fontSize:'2rem', fontWeight:800, lineHeight:1.1, color: isSelected ? '#534AB7' : 'var(--ink)' }}>
            {s.char}
          </span>
          <div style={{ display:'flex', gap:3, marginTop:'0.4rem', flexWrap:'wrap', justifyContent:'center' }}>
            <JamoPill label={s.cho}  colorKey="cho"  highlight={highlight === 'cho'}  />
            <JamoPill label={s.jung} colorKey="jung" highlight={highlight === 'jung'} />
            {s.jong && <JamoPill label={s.jong} colorKey="jong" highlight={highlight === 'jong'} />}
          </div>
          <span style={{ fontSize:'0.72rem', color:'var(--muted)', marginTop:'0.3rem', fontStyle:'italic', fontFamily:'var(--mono)' }}>
            {s.romanization}
          </span>
          <span style={{ fontSize:'0.62rem', color:'var(--muted)', marginTop:'0.1rem', opacity:0.6 }}>🔊 tap</span>
        </>
      ) : (
        <span style={{ fontSize:'1.4rem', color:'var(--muted)', lineHeight:2.4 }}>{s.char}</span>
      )}
    </button>
  );
}

function SyllableDetail({ syllable }: { syllable: SyllableData }) {
  const parts = [
    { key:'cho',  label:'초성 — Inicial', value: syllable.cho,  color: JAMO_COLORS.cho.hex,
      rom: CHO_ROM[syllable.cho] !== '' ? CHO_ROM[syllable.cho] : '(silente)',
      desc: syllable.cho === 'ㅇ' ? 'ㅇ en posición inicial es muda — la sílaba empieza directo con la vocal.' : 'Consonante que abre la sílaba.' },
    { key:'jung', label:'중성 — Vocal', value: syllable.jung, color: JAMO_COLORS.jung.hex,
      rom: JUNG_ROM[syllable.jung] ?? '—', desc:'El núcleo vocálico. Puede ser simple (ㅏ) o diptongo (ㅘ).' },
    ...(syllable.jong ? [{ key:'jong', label:'종성 · Batchim', value: syllable.jong, color: JAMO_COLORS.jong.hex,
      rom: JONG_ROM[syllable.jong] ?? '—', desc:'Consonante final. Rige las reglas fonéticas del coreano.' }] : []),
  ];

  return (
    <div className="wl-card" style={{ padding:'1.5rem' }}>
      <p className="eyebrow" style={{ margin:'0 0 0.75rem' }}>
        <span className="ink-line" />
        Detalle de{' '}
        <span style={{ color:'#534AB7', fontSize:'1.5rem', fontWeight:900 }}>{syllable.char}</span>
        <span style={{ color:'var(--muted)', fontSize:'0.88rem', marginLeft:'0.5rem', fontFamily:'var(--mono)' }}>
          [{syllable.romanization}]
        </span>
        {!syllable.jong && (
          <span style={{ marginLeft:'0.75rem', fontSize:'0.72rem',
            background:'rgba(83,74,183,0.1)', color:'#534AB7',
            border:'1px solid rgba(83,74,183,0.25)', borderRadius:6,
            padding:'0.15rem 0.55rem', fontFamily:'var(--mono)' }}>sílaba abierta</span>
        )}
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))', gap:'0.75rem' }}>
        {parts.map(p => (
          <div key={p.key} style={{ background:`${p.color}0d`, border:`1.5px solid ${p.color}33`, borderRadius:12, padding:'0.85rem' }}>
            <div style={{ fontSize:'0.68rem', color:p.color, fontWeight:800, marginBottom:'0.3rem', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono)' }}>{p.label}</div>
            <div style={{ fontSize:'2.2rem', fontWeight:900, color:p.color, lineHeight:1 }}>{p.value}</div>
            <div style={{ fontSize:'0.78rem', fontStyle:'italic', color:'var(--muted)', marginTop:'0.3rem', fontFamily:'var(--mono)' }}>/{p.rom}/</div>
            <div style={{ fontSize:'0.77rem', color:'var(--muted)', marginTop:'0.25rem', lineHeight:1.45 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 2 – Jamo Table
// ─────────────────────────────────────────────────────────────────────────────

const CONSONANTS: { jamo: string; rom: string; ipa: string; type: string }[] = [
  { jamo:'ㄱ', rom:'g/k',  ipa:'k',   type:'plain' },
  { jamo:'ㄴ', rom:'n',    ipa:'n',   type:'nasal' },
  { jamo:'ㄷ', rom:'d/t',  ipa:'t',   type:'plain' },
  { jamo:'ㄹ', rom:'r/l',  ipa:'ɾ',   type:'liquid' },
  { jamo:'ㅁ', rom:'m',    ipa:'m',   type:'nasal' },
  { jamo:'ㅂ', rom:'b/p',  ipa:'p',   type:'plain' },
  { jamo:'ㅅ', rom:'s',    ipa:'s',   type:'plain' },
  { jamo:'ㅇ', rom:'ng/-', ipa:'ŋ/-', type:'nasal' },
  { jamo:'ㅈ', rom:'j',    ipa:'tɕ',  type:'plain' },
  { jamo:'ㅊ', rom:'ch',   ipa:'tɕʰ', type:'aspirated' },
  { jamo:'ㅋ', rom:'k',    ipa:'kʰ',  type:'aspirated' },
  { jamo:'ㅌ', rom:'t',    ipa:'tʰ',  type:'aspirated' },
  { jamo:'ㅍ', rom:'p',    ipa:'pʰ',  type:'aspirated' },
  { jamo:'ㅎ', rom:'h',    ipa:'h',   type:'aspirated' },
  { jamo:'ㄲ', rom:'kk',   ipa:'k͈',   type:'tense' },
  { jamo:'ㄸ', rom:'tt',   ipa:'t͈',   type:'tense' },
  { jamo:'ㅃ', rom:'pp',   ipa:'p͈',   type:'tense' },
  { jamo:'ㅆ', rom:'ss',   ipa:'s͈',   type:'tense' },
  { jamo:'ㅉ', rom:'jj',   ipa:'tɕ͈',  type:'tense' },
];

const VOWELS: { jamo: string; rom: string; ipa: string; type: string }[] = [
  { jamo:'ㅏ', rom:'a',   ipa:'a',   type:'basic' },
  { jamo:'ㅓ', rom:'eo',  ipa:'ʌ',   type:'basic' },
  { jamo:'ㅗ', rom:'o',   ipa:'o',   type:'basic' },
  { jamo:'ㅜ', rom:'u',   ipa:'u',   type:'basic' },
  { jamo:'ㅡ', rom:'eu',  ipa:'ɯ',   type:'basic' },
  { jamo:'ㅣ', rom:'i',   ipa:'i',   type:'basic' },
  { jamo:'ㅐ', rom:'ae',  ipa:'ɛ',   type:'basic' },
  { jamo:'ㅔ', rom:'e',   ipa:'e',   type:'basic' },
  { jamo:'ㅑ', rom:'ya',  ipa:'ja',  type:'y-compound' },
  { jamo:'ㅕ', rom:'yeo', ipa:'jʌ',  type:'y-compound' },
  { jamo:'ㅛ', rom:'yo',  ipa:'jo',  type:'y-compound' },
  { jamo:'ㅠ', rom:'yu',  ipa:'ju',  type:'y-compound' },
  { jamo:'ㅒ', rom:'yae', ipa:'jɛ',  type:'y-compound' },
  { jamo:'ㅖ', rom:'ye',  ipa:'je',  type:'y-compound' },
  { jamo:'ㅘ', rom:'wa',  ipa:'wa',  type:'w-compound' },
  { jamo:'ㅝ', rom:'wo',  ipa:'wʌ',  type:'w-compound' },
  { jamo:'ㅗ+ㅐ→ㅚ', rom:'oe', ipa:'we', type:'w-compound' },
  { jamo:'ㅜ+ㅔ→ㅞ', rom:'we', ipa:'we', type:'w-compound' },
  { jamo:'ㅙ', rom:'wae', ipa:'wɛ',  type:'w-compound' },
  { jamo:'ㅟ', rom:'wi',  ipa:'wi',  type:'w-compound' },
  { jamo:'ㅢ', rom:'ui',  ipa:'ɰi',  type:'special' },
];

const CONS_TYPES: Record<string, { label: string; color: string; desc: string }> = {
  plain:     { label:'Planas',    color:'#534AB7', desc:'Son sonoras entre vocales, sordas al final.' },
  nasal:     { label:'Nasales',   color:'#059669', desc:'Producidas con resonancia nasal.' },
  liquid:    { label:'Líquida',   color:'#2563eb', desc:'ㄹ suena como "r" inicial y "l" final.' },
  aspirated: { label:'Aspiradas', color:'#d97706', desc:'Se pronuncian con una ráfaga de aire.' },
  tense:     { label:'Tensas',    color:'#dc2626', desc:'Glotalizadas, pronunciación tensa y corta.' },
};

const VOW_TYPES: Record<string, { label: string; color: string }> = {
  basic:      { label:'Básicas',      color:'#534AB7' },
  'y-compound': { label:'Con Y-',     color:'#2563eb' },
  'w-compound': { label:'Con W-',     color:'#059669' },
  special:    { label:'Especial',     color:'#d97706' },
};

function JamoTable({ addXp }: { addXp: (n: number) => void }) {
  const [played, setPlayed] = useState<Set<string>>(new Set());
  const [view, setView]     = useState<'consonants' | 'vowels'>('consonants');

  function handlePlay(jamo: string) {
    speak(jamo);
    if (!played.has(jamo)) { setPlayed(p => new Set(p).add(jamo)); addXp(5); }
  }

  const consGroups = Object.entries(CONS_TYPES).map(([type, meta]) => ({
    ...meta, type,
    items: CONSONANTS.filter(c => c.type === type),
  }));

  const vowGroups = Object.entries(VOW_TYPES).map(([type, meta]) => ({
    ...meta, type,
    items: VOWELS.filter(v => v.type === type),
  }));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

      {/* Header */}
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ margin:'0 0 0.4rem' }}><span className="ink-line" />Tabla de Jamo — Alfabeto Hangul</p>
        <p style={{ margin:'0 0 1rem', fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.6 }}>
          El Hangul tiene <strong style={{ color:'var(--ink)' }}>14 consonantes base + 5 tensas</strong> y{' '}
          <strong style={{ color:'var(--ink)' }}>21 vocales</strong>. Haz clic en cualquier jamo para escuchar su pronunciación (+5 XP).
        </p>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <button
            onClick={() => setView('consonants')}
            className={view === 'consonants' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
            style={{ fontSize:'0.85rem' }}
          >자음 Consonantes</button>
          <button
            onClick={() => setView('vowels')}
            className={view === 'vowels' ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
            style={{ fontSize:'0.85rem' }}
          >모음 Vocales</button>
        </div>
      </div>

      {view === 'consonants' && consGroups.map(group => (
        <div key={group.type} className="wl-card" style={{ padding:'1.25rem', borderTop:`3px solid ${group.color}` }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:'0.6rem', marginBottom:'0.3rem' }}>
            <span style={{ fontSize:'0.75rem', fontWeight:800, color:group.color, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>
              {group.label}
            </span>
            <span style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{group.desc}</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', marginTop:'0.75rem' }}>
            {group.items.map(c => (
              <button
                key={c.jamo}
                onClick={() => handlePlay(c.jamo)}
                style={{
                  display:'flex', flexDirection:'column', alignItems:'center',
                  padding:'0.75rem 0.85rem', borderRadius:12, minWidth:72,
                  border:`1.5px solid ${played.has(c.jamo) ? group.color + '88' : 'var(--line-soft)'}`,
                  background: played.has(c.jamo) ? `${group.color}0d` : 'var(--bg)',
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s',
                }}
              >
                <span style={{ fontSize:'2rem', fontWeight:900, color:group.color, lineHeight:1.1 }}>{c.jamo}</span>
                <span style={{ fontSize:'0.72rem', fontFamily:'var(--mono)', color:'var(--muted)', marginTop:'0.25rem', fontStyle:'italic' }}>{c.rom}</span>
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--muted)', opacity:0.7 }}>/{c.ipa}/</span>
                <span style={{ fontSize:'0.58rem', color: played.has(c.jamo) ? group.color : 'var(--muted)', marginTop:'0.2rem', fontWeight:700 }}>
                  {played.has(c.jamo) ? '✓' : '🔊'}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {view === 'vowels' && vowGroups.map(group => (
        <div key={group.type} className="wl-card" style={{ padding:'1.25rem', borderTop:`3px solid ${group.color}` }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:'0.6rem', marginBottom:'0.75rem' }}>
            <span style={{ fontSize:'0.75rem', fontWeight:800, color:group.color, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>
              {group.label}
            </span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
            {group.items.map(v => (
              <button
                key={v.jamo}
                onClick={() => handlePlay(v.jamo.length <= 2 ? v.jamo : v.jamo.slice(-1))}
                style={{
                  display:'flex', flexDirection:'column', alignItems:'center',
                  padding:'0.75rem 0.85rem', borderRadius:12, minWidth:72,
                  border:`1.5px solid ${played.has(v.jamo) ? group.color + '88' : 'var(--line-soft)'}`,
                  background: played.has(v.jamo) ? `${group.color}0d` : 'var(--bg)',
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s',
                }}
              >
                <span style={{ fontSize:'2rem', fontWeight:900, color:group.color, lineHeight:1.1 }}>{v.jamo.length <= 2 ? v.jamo : v.jamo.slice(-1)}</span>
                <span style={{ fontSize:'0.72rem', fontFamily:'var(--mono)', color:'var(--muted)', marginTop:'0.25rem', fontStyle:'italic' }}>{v.rom}</span>
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--muted)', opacity:0.7 }}>/{v.ipa}/</span>
                <span style={{ fontSize:'0.58rem', color: played.has(v.jamo) ? group.color : 'var(--muted)', marginTop:'0.2rem', fontWeight:700 }}>
                  {played.has(v.jamo) ? '✓' : '🔊'}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:'rgba(83,74,183,0.06)', border:'1px solid rgba(83,74,183,0.15)', fontSize:'0.83rem', color:'var(--muted)', lineHeight:1.6 }}>
        💡 <strong style={{ color:'var(--ink)' }}>Dato:</strong> ㅇ es la única consonante con doble función — es <strong style={{ color:'var(--ink)' }}>muda</strong> en posición inicial (solo "abre" la sílaba para la vocal) y suena como <strong style={{ color:'var(--ink)' }}>[ng]</strong> en posición final.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 3 – Batchim Analyzer
// ─────────────────────────────────────────────────────────────────────────────

function BatchimAnalyzer({ addXp }: { addXp: (n: number) => void }) {
  const [openRule, setOpenRule] = useState<string | null>('yeonneum');
  const [played,   setPlayed]   = useState<Set<string>>(new Set());

  function handleExample(ex: BatchimExample, ruleId: string) {
    speak(ex.written);
    const key = `${ruleId}-${ex.written}`;
    if (!played.has(key)) { setPlayed(prev => new Set(prev).add(key)); addXp(15); }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

      {/* Intro */}
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ margin:'0 0 0.5rem' }}><span className="ink-line" />Reglas fonéticas del Batchim</p>
        <p style={{ margin:0, fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.65 }}>
          El batchim (종성, consonante final) no siempre suena como se escribe.
          Estas <strong style={{ color:'var(--ink)' }}>5 reglas</strong> explican el 95 % de los cambios fonéticos del coreano.
          Haz clic en cada ejemplo para escucharlo{' '}
          <span style={{ color:'#059669', fontWeight:700 }}>(+15 XP)</span>.
        </p>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'0.9rem' }}>
          {BATCHIM_RULES.map(r => (
            <button key={r.id} onClick={() => setOpenRule(openRule === r.id ? null : r.id)}
              className={openRule === r.id ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.78rem',
                ...(openRule === r.id ? { background: r.color, borderColor: r.color } : { color: r.color, borderColor: r.color }) }}
            >
              {r.emoji} {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rule cards */}
      {BATCHIM_RULES.map(rule => (
        <div key={rule.id} className="wl-card"
          style={{ overflow:'hidden', border: openRule === rule.id ? `1.5px solid ${rule.color}55` : undefined }}
        >
          <button
            onClick={() => setOpenRule(openRule === rule.id ? null : rule.id)}
            style={{
              width:'100%', display:'flex', alignItems:'center', gap:'0.75rem',
              padding:'1.1rem 1.25rem',
              background: openRule === rule.id ? `${rule.color}0d` : 'transparent',
              border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit',
              transition:'background 0.2s',
            }}
          >
            <span style={{ fontSize:'1.5rem' }}>{rule.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:'0.5rem', flexWrap:'wrap' }}>
                <span style={{ fontSize:'1.1rem', fontWeight:800, color:rule.color }}>{rule.name}</span>
                <span style={{ fontSize:'0.85rem', color:'var(--muted)', fontWeight:600 }}>{rule.nameEs}</span>
              </div>
              <div style={{ fontSize:'0.76rem', color:'var(--muted)', marginTop:'0.1rem', fontFamily:'var(--mono)' }}>
                {rule.trigger}
              </div>
            </div>
            <span style={{ color:'var(--muted)', display:'inline-block', transform: openRule === rule.id ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>▼</span>
          </button>

          {openRule === rule.id && (
            <div style={{ padding:'0 1.25rem 1.25rem' }}>
              <p style={{ margin:'0 0 1rem', fontSize:'0.9rem', lineHeight:1.7, color:'var(--ink-2)' }}>{rule.explanation}</p>
              <p style={{ margin:'0 0 0.5rem', fontSize:'0.72rem', color:rule.color, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--mono)' }}>
                Ejemplos — haz clic para escuchar
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.55rem' }}>
                {rule.examples.map((ex, i) => {
                  const key = `${rule.id}-${ex.written}`;
                  const done = played.has(key);
                  return (
                    <button key={i} onClick={() => handleExample(ex, rule.id)}
                      style={{
                        display:'grid', gridTemplateColumns:'1fr 1fr auto', alignItems:'center', gap:'0.75rem',
                        padding:'0.85rem 1rem', background:`${rule.color}0a`, border:`1px solid ${rule.color}22`,
                        borderRadius:12, cursor:'pointer', textAlign:'left', fontFamily:'inherit',
                      }}
                    >
                      <div>
                        <div style={{ fontSize:'0.67rem', color:'var(--muted)', fontWeight:700, marginBottom:'0.2rem', textTransform:'uppercase', fontFamily:'var(--mono)' }}>Escrito</div>
                        <div style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--ink)' }}>{ex.written}</div>
                        <div style={{ fontSize:'0.72rem', color:'var(--muted)', fontStyle:'italic', fontFamily:'var(--mono)' }}>[{ex.romanWritten}]</div>
                      </div>
                      <div>
                        <div style={{ fontSize:'0.67rem', color:'#059669', fontWeight:700, marginBottom:'0.2rem', textTransform:'uppercase', fontFamily:'var(--mono)' }}>Pronunciado</div>
                        <div style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--ink)' }}>{ex.spoken}</div>
                        <div style={{ fontSize:'0.72rem', color:'var(--muted)', fontStyle:'italic', fontFamily:'var(--mono)' }}>[{ex.romanSpoken}]</div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ background: done ? '#059669' : rule.color, color:'#fff', borderRadius:9, padding:'0.4rem 0.75rem', fontSize:'0.78rem', fontWeight:700, marginBottom:'0.3rem', whiteSpace:'nowrap', transition:'background 0.2s' }}>
                          {done ? '✓ +15 XP' : '▶ +15 XP'}
                        </div>
                        <div style={{ fontSize:'0.7rem', color:'var(--muted)', maxWidth:95, lineHeight:1.3, textAlign:'right' }}>{ex.note}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{ padding:'1rem 1.25rem', borderRadius:12, background:'rgba(83,74,183,0.06)', border:'1px solid rgba(83,74,183,0.15)', fontSize:'0.83rem', lineHeight:1.7, color:'var(--muted)' }}>
        <strong style={{ color:'#534AB7', display:'block', marginBottom:'0.3rem' }}>🧠 Las 7 consonantes representativas</strong>
        En posición final, el coreano solo usa:{' '}
        <strong style={{ color:'var(--ink)', fontFamily:'var(--mono)' }}>ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ</strong>.
        Las demás se neutralizan hacia una de estas. Aprenderlas te permite predecir la pronunciación de cualquier palabra.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 4 – Syllable Quiz
// ─────────────────────────────────────────────────────────────────────────────

const QUIZ_POOL = [
  '가','나','다','라','마','바','사','아','자','차','카','타','파','하',
  '강','남','달','람','밥','산','안','잠','찬','칸','탄','판','한',
  '기','니','디','리','미','비','시','이','지','치','키','티','피','히',
  '공','농','동','롱','몽','봉','송','옹','종','총','콩','통','풍','홍',
  '국','눈','들','른','문','불','술','울','줄','출','쿨','틀','풀','훌',
];

type QuizType = 'jamo' | 'romanization';

type QuizQuestion = {
  type: QuizType;
  syllable: SyllableData;
  // jamo mode
  target?: 'cho' | 'jung' | 'jong';
  options: string[];
  correct: string;
  // romanization mode — show audio clue
};

function buildQuestion(): QuizQuestion | null {
  const hangulPool = QUIZ_POOL.map(decompose).filter(s => s.isHangul);
  const syllable   = hangulPool[Math.floor(Math.random() * hangulPool.length)];
  const type: QuizType = Math.random() < 0.5 ? 'jamo' : 'romanization';

  if (type === 'romanization') {
    const correct = syllable.romanization;
    const distractors = hangulPool
      .filter(s => s.romanization !== correct)
      .map(s => s.romanization)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [...distractors, correct].sort(() => Math.random() - 0.5);
    return { type, syllable, options, correct };
  }

  // jamo mode
  const targets: Array<'cho' | 'jung' | 'jong'> = syllable.jong
    ? ['cho', 'jung', 'jong']
    : ['cho', 'jung'];
  const target = targets[Math.floor(Math.random() * targets.length)];
  const correct = syllable[target];
  if (!correct) return null;

  const pool =
    target === 'cho'  ? CHOSEONG :
    target === 'jung' ? JUNGSEONG :
    JONGSEONG.filter(j => j !== '');

  const distractors = pool.filter(j => j !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...distractors, correct].sort(() => Math.random() - 0.5);
  return { type, syllable, target, options, correct };
}

function SyllableQuiz({ addXp }: { addXp: (n: number) => void }) {
  const [question,  setQuestion]  = useState<QuizQuestion | null>(() => buildQuestion());
  const [answered,  setAnswered]  = useState<string | null>(null);
  const [score,     setScore]     = useState({ correct: 0, total: 0 });
  const [streak,    setStreak]    = useState(0);

  function handleAnswer(opt: string) {
    if (answered) return;
    setAnswered(opt);
    const isCorrect = opt === question?.correct;
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (isCorrect) { setStreak(s => s + 1); addXp(20); }
    else           { setStreak(0); }
  }

  function nextQuestion() {
    setQuestion(buildQuestion());
    setAnswered(null);
  }

  if (!question) return null;

  const isRomMode  = question.type === 'romanization';
  const targetInfo = question.target ? JAMO_COLORS[question.target] : null;
  const accuracy   = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

      {/* Stats bar */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem' }}>
        {[
          { label:'Correctas', value: score.correct, color:'#059669' },
          { label:'Precisión',  value: `${accuracy}%`, color:'#534AB7' },
          { label:'Racha',      value: `${streak} 🔥`, color:'#d97706' },
        ].map(stat => (
          <div key={stat.label} style={{
            background:'var(--bg)', border:'1px solid var(--line-soft)',
            borderRadius:12, padding:'0.75rem 1rem', textAlign:'center',
          }}>
            <div style={{ fontSize:'1.4rem', fontWeight:800, color:stat.color }}>{stat.value}</div>
            <div style={{ fontSize:'0.72rem', color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Question card */}
      <div className="wl-card" style={{ padding:'2rem', textAlign:'center' }}>

        {/* Question type badge */}
        <div style={{ display:'inline-block', marginBottom:'0.75rem', fontSize:'0.72rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, padding:'0.25rem 0.75rem', borderRadius:20, background: isRomMode ? 'rgba(37,99,235,0.1)' : 'rgba(83,74,183,0.1)', color: isRomMode ? '#2563eb' : '#534AB7', border:`1px solid ${isRomMode ? '#2563eb33' : '#534AB733'}` }}>
          {isRomMode ? '🔤 Romanización' : `🔍 Identificar ${targetInfo?.label}`}
        </div>

        <p style={{
          fontSize:'0.88rem', color:'var(--muted)', marginBottom:'0.75rem', lineHeight:1.5,
        }}>
          {isRomMode
            ? <>¿Cuál es la romanización de <strong style={{ color:'var(--ink)', fontSize:'1.1rem' }}>{question.syllable.char}</strong>?</>
            : <>¿Cuál es la <strong style={{ color: targetInfo?.hex }}>{targetInfo?.label}</strong> ({targetInfo?.labelEs.toLowerCase()}) de esta sílaba?</>
          }
        </p>

        {/* Big syllable */}
        <div style={{
          fontSize:'5rem', fontWeight:900, lineHeight:1, margin:'0.5rem 0 0.75rem',
          color:'var(--ink)', textShadow:'0 2px 12px rgba(83,74,183,0.15)',
        }}>
          {question.syllable.char}
        </div>

        {/* Jamo breakdown (hide romanization in rom-mode until answered) */}
        {!isRomMode && (
          <div style={{ display:'flex', gap:4, justifyContent:'center', marginBottom:'0.35rem' }}>
            <JamoPill label={question.syllable.cho}  colorKey="cho"  highlight={question.target === 'cho'}  />
            <JamoPill label={question.syllable.jung} colorKey="jung" highlight={question.target === 'jung'} />
            {question.syllable.jong && <JamoPill label={question.syllable.jong} colorKey="jong" highlight={question.target === 'jong'} />}
          </div>
        )}
        {isRomMode && !answered && (
          <div style={{ fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:'0.5rem', opacity:0.5 }}>
            [? ? ?]
          </div>
        )}
        {(answered || !isRomMode) && (
          <div style={{ fontSize:'0.8rem', color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:'1.25rem', fontStyle:'italic' }}>
            [{question.syllable.romanization}]
          </div>
        )}
        {isRomMode && !answered && <div style={{ marginBottom:'1.25rem' }} />}

        {/* Options */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
          {question.options.map(opt => {
            const isCorrect = opt === question.correct;
            const isChosen  = answered === opt;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
            if (answered) {
              if (isCorrect)      { bg = 'rgba(5,150,105,0.1)';  border = '1.5px solid #059669'; color = '#059669'; }
              else if (isChosen)  { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)}
                style={{
                  padding:'0.9rem', borderRadius:12, border, background:bg, color,
                  fontSize: isRomMode ? '1rem' : '1.6rem',
                  fontWeight:800, cursor: answered ? 'default' : 'pointer',
                  fontFamily: isRomMode ? 'var(--mono)' : 'inherit',
                  fontStyle: isRomMode ? 'italic' : 'normal',
                  transition:'all 0.18s',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem',
                }}
              >
                {isRomMode ? `[${opt}]` : opt}
                {answered && isCorrect && <span style={{ fontSize:'0.9rem' }}>✓</span>}
                {answered && isChosen && !isCorrect && <span style={{ fontSize:'0.9rem' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div style={{
            marginTop:'1rem', padding:'0.85rem 1rem', borderRadius:12,
            background: answered === question.correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.06)',
            border: `1px solid ${answered === question.correct ? '#05966933' : '#dc262633'}`,
            fontSize:'0.85rem', color:'var(--ink)', lineHeight:1.55,
          }}>
            {answered === question.correct
              ? isRomMode
                ? <>✅ <strong>¡Correcto!</strong> +20 XP — <strong style={{ color:'#534AB7' }}>{question.syllable.char}</strong> se romaniza como <strong style={{ color:'#2563eb', fontFamily:'var(--mono)' }}>[{question.correct}]</strong>.</>
                : <>✅ <strong>¡Correcto!</strong> +20 XP — La {targetInfo?.labelEs.toLowerCase()} de <strong style={{ color:'#534AB7' }}>{question.syllable.char}</strong> es <strong style={{ color:targetInfo?.hex }}>{question.correct}</strong>.</>
              : isRomMode
                ? <>❌ <strong>Casi.</strong> La romanización correcta era <strong style={{ color:'#2563eb', fontFamily:'var(--mono)' }}>[{question.correct}]</strong>.</>
                : <>❌ <strong>Casi.</strong> La respuesta era <strong style={{ color:targetInfo?.hex }}>{question.correct}</strong> — {targetInfo?.labelEs} de <strong style={{ color:'#534AB7' }}>{question.syllable.char}</strong>.</>
            }
          </div>
        )}
      </div>

      {/* Color reference while playing */}
      <JamoColorLegend />

      {/* Next button */}
      {answered && (
        <button onClick={nextQuestion} className="btn btn-sm" style={{ fontSize:'0.95rem', padding:'0.85rem', borderRadius:12 }}>
          Siguiente sílaba →
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Micro-components
// ─────────────────────────────────────────────────────────────────────────────

function JamoPill({
  label, colorKey, highlight,
}: {
  label: string;
  colorKey: 'cho' | 'jung' | 'jong';
  highlight?: boolean;
}) {
  if (!label) return null;
  const { hex } = JAMO_COLORS[colorKey];
  return (
    <span style={{
      background: highlight ? `${hex}33` : `${hex}18`,
      color: hex,
      border: `1px solid ${highlight ? `${hex}88` : `${hex}44`}`,
      borderRadius: 5,
      padding: '0 5px',
      fontWeight: 800,
      fontSize: '0.78rem',
      lineHeight: '1.5',
      transition: 'all 0.15s',
      boxShadow: highlight ? `0 0 0 2px ${hex}44` : 'none',
    }}>
      {label}
    </span>
  );
}
