'use client';

import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

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
}

const LANGUAGES: LangEntry[] = [
  { slug: 'english',    flag: '🇬🇧', name: 'Inglés',    tagline: 'Vocabulario, pronunciación y gramática desde cero.',         color: '#0066cc', available: false },
  { slug: 'german',     flag: '🇩🇪', name: 'Alemán',    tagline: 'Casos gramaticales, declinaciones y fonética alemana.',       color: '#dd0000', available: false },
  { slug: 'french',     flag: '🇫🇷', name: 'Francés',   tagline: 'Liaison, géneros y conjugaciones del francés moderno.',       color: '#003189', available: false },
  { slug: 'italian',    flag: '🇮🇹', name: 'Italiano',  tagline: 'Pronunciación, verbos y ritmo del italiano nativo.',          color: '#009246', available: false },
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
  const [selected, setSelected] = useState<string | null>(null);
  const [xp,       setXp]       = useState(0);
  const [activeTab, setActiveTab] = useState<'reader' | 'batchim'>('reader');

  const addXp = useCallback((n: number) => setXp(p => p + n), []);

  const lang     = LANGUAGES.find(l => l.slug === selected);
  const level    = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel = xp % XP_PER_LEVEL;
  const xpPct    = (xpInLevel / XP_PER_LEVEL) * 100;

  /* ── Language grid ──────────────────────────────────────────────────────── */
  if (!selected) {
    return (
      <section className="wl-section">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />Herramientas gratuitas de práctica
          </p>
          <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
            Elige un idioma
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 3rem' }}>
            Desglose silábico, pronunciación en tiempo real y reglas fonéticas interactivas para cada lengua.
          </p>

          <div className="wl-exams-catalog">
            {LANGUAGES.map(lang => (
              <button
                key={lang.slug}
                onClick={() => lang.available && setSelected(lang.slug)}
                className={`wl-catalog-card${!lang.available ? ' wl-catalog-card--soon' : ''}`}
                style={{
                  '--exam-color': lang.color,
                  textAlign: 'left',
                  cursor: lang.available ? 'pointer' : 'default',
                  border: 'none',
                } as CSSProperties}
              >
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
                  <span>{lang.available ? '2 herramientas' : 'En desarrollo'}</span>
                  <span className="wl-catalog-card__cta">
                    {lang.available ? 'Practicar →' : 'Próximamente'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Korean tools ───────────────────────────────────────────────────────── */
  return (
    <section className="wl-section">
      <div className="wrap">

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

        {/* Page title */}
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />{lang?.flag} Práctica de {lang?.name}
        </p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Herramientas interactivas
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 2rem' }}>
          Desglose silábico con pronunciación real y guía completa de reglas fonéticas del Hangul.
        </p>

        {/* XP bar — glass card */}
        <div className="wl-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem', maxWidth: 460 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem', fontSize:'0.82rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>
            <span>⭐ Nivel {level}</span>
            <span>{xpInLevel} / {XP_PER_LEVEL} XP</span>
          </div>
          <div style={{ height: 7, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${xpPct}%`,
              background: 'linear-gradient(90deg, #534AB7, #6C63FF)',
              borderRadius: 4, transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <p style={{ margin: '0.35rem 0 0', fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            Toca sílabas +5 · escucha palabras +10 · explora reglas +15
          </p>
        </div>

        {/* Tool tabs */}
        <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          {([
            { id:'reader',  label:'📖 Lector de Hangul' },
            { id:'batchim', label:'🎵 Reglas de Batchim' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.85rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool content */}
        {activeTab === 'reader'
          ? <KoreanReader  addXp={addXp} />
          : <BatchimAnalyzer addXp={addXp} />
        }
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 1 – Korean Reader
// ─────────────────────────────────────────────────────────────────────────────

function KoreanReader({ addXp }: { addXp: (n: number) => void }) {
  const [input,     setInput]     = useState('안녕하세요');
  const [syllables, setSyllables] = useState<SyllableData[]>(() => analyzeText('안녕하세요'));
  const [selected,  setSelected]  = useState<number | null>(null);

  function handleAnalyze() {
    const t = input.trim(); if (!t) return;
    setSyllables(analyzeText(t)); setSelected(null);
  }
  function handleSpeakFull(slow = false) { speak(input, slow); addXp(10); }
  function handleClickSyllable(idx: number, char: string) { setSelected(idx); speak(char); addXp(5); }
  function handleQuick(text: string) { setInput(text); setSyllables(analyzeText(text)); setSelected(null); }

  const fullRoman = syllables.map(s => s.romanization).join('-');

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', maxWidth: 840 }}>

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
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'0.75rem' }}>
          {STARTER_TEXTS.map(t => (
            <button key={t} onClick={() => handleQuick(t)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize:'0.78rem', padding:'0.25rem 0.65rem' }}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Syllable grid */}
      {syllables.length > 0 && (
        <div className="wl-card" style={{ padding:'1.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.75rem', marginBottom:'1rem' }}>
            <p className="eyebrow" style={{ margin:0 }}><span className="ink-line" />Desglose silábico</p>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button onClick={() => handleSpeakFull(false)} className="btn btn-ghost btn-sm" style={{ fontSize:'0.78rem' }}>▶ Escuchar</button>
              <button onClick={() => handleSpeakFull(true)}  className="btn btn-ghost btn-sm" style={{ fontSize:'0.78rem' }}>🐢 Lento</button>
            </div>
          </div>

          <p style={{ textAlign:'center', fontSize:'0.95rem', color:'var(--muted)', fontStyle:'italic', fontFamily:'var(--mono)', margin:'0 0 1.25rem', letterSpacing:'0.04em' }}>
            [{fullRoman}]
          </p>

          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
            {syllables.map((s, idx) => (
              <button
                key={idx}
                onClick={() => s.isHangul && handleClickSyllable(idx, s.char)}
                style={{
                  display:'flex', flexDirection:'column', alignItems:'center',
                  padding:'0.85rem 0.9rem', borderRadius:14,
                  border: selected === idx ? '2px solid #534AB7' : '1.5px solid var(--line-soft)',
                  background: selected === idx ? 'rgba(83,74,183,0.08)' : 'var(--bg)',
                  cursor: s.isHangul ? 'pointer' : 'default',
                  transition: 'all 0.15s', minWidth:68,
                  boxShadow: selected === idx ? '0 4px 14px rgba(83,74,183,0.18)' : 'none',
                  fontFamily:'inherit',
                }}
              >
                {s.isHangul ? (
                  <>
                    <span style={{ fontSize:'1.8rem', fontWeight:800, lineHeight:1.1, color: selected===idx ? '#534AB7' : 'var(--ink)' }}>
                      {s.char}
                    </span>
                    <div style={{ display:'flex', gap:3, marginTop:'0.4rem', flexWrap:'wrap', justifyContent:'center' }}>
                      <JamoPill label={s.cho}  color="#534AB7" title="초성 — consonante inicial" />
                      <JamoPill label={s.jung} color="#2563eb" title="중성 — vocal" />
                      {s.jong && <JamoPill label={s.jong} color="#d97706" title="종성 — batchim" />}
                    </div>
                    <span style={{ fontSize:'0.72rem', color:'var(--muted)', marginTop:'0.3rem', fontStyle:'italic', fontFamily:'var(--mono)' }}>
                      {s.romanization}
                    </span>
                    <span style={{ fontSize:'0.62rem', color:'var(--muted)', marginTop:'0.1rem', opacity:0.7 }}>🔊 tap</span>
                  </>
                ) : (
                  <span style={{ fontSize:'1.4rem', color:'var(--muted)', lineHeight:2.2 }}>{s.char}</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap:'1.25rem', justifyContent:'center', marginTop:'1.1rem', flexWrap:'wrap', fontSize:'0.78rem', color:'var(--muted)' }}>
            <span><Dot color="#534AB7" /> 초성 (inicial)</span>
            <span><Dot color="#2563eb" /> 중성 (vocal)</span>
            <span><Dot color="#d97706" /> 종성 · batchim (final)</span>
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

function SyllableDetail({ syllable }: { syllable: SyllableData }) {
  const parts = [
    { label:'초성 — Inicial', value: syllable.cho, color:'#534AB7',
      rom: CHO_ROM[syllable.cho] !== '' ? CHO_ROM[syllable.cho] : '(silente)',
      desc: syllable.cho === 'ㅇ' ? 'ㅇ en posición inicial es muda — la sílaba empieza directo con la vocal.' : 'Consonante que abre la sílaba.' },
    { label:'중성 — Vocal', value: syllable.jung, color:'#2563eb',
      rom: JUNG_ROM[syllable.jung] ?? '—', desc:'El núcleo vocálico. Puede ser simple (ㅏ) o diptongo (ㅘ).' },
    ...(syllable.jong ? [{ label:'종성 · Batchim', value: syllable.jong, color:'#d97706',
      rom: JONG_ROM[syllable.jong] ?? '—', desc:'Consonante final. Rige las reglas fonéticas del coreano.' }] : []),
  ];

  return (
    <div className="wl-card" style={{ padding:'1.5rem', maxWidth:840 }}>
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
            padding:'0.15rem 0.55rem', fontFamily:'var(--mono)' }}>sin batchim</span>
        )}
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))', gap:'0.75rem' }}>
        {parts.map(p => (
          <div key={p.label} style={{ background:`${p.color}0d`, border:`1px solid ${p.color}33`, borderRadius:12, padding:'0.85rem' }}>
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
// Tool 2 – Batchim Analyzer
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
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:840 }}>

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
          {/* Header button */}
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

          {/* Body */}
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

      {/* Summary */}
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
// Micro-components
// ─────────────────────────────────────────────────────────────────────────────

function JamoPill({ label, color, title }: { label: string; color: string; title: string }) {
  if (!label) return null;
  return (
    <span title={title} style={{ background:`${color}22`, color, border:`1px solid ${color}44`, borderRadius:5, padding:'0 5px', fontWeight:800, fontSize:'0.78rem', lineHeight:'1.5' }}>
      {label}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:color, marginRight:3, verticalAlign:'middle' }} />;
}
