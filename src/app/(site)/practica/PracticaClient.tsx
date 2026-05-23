'use client';

import { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Korean Unicode Utilities
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
  char: string;
  cho: string;
  jung: string;
  jong: string;
  romanization: string;
  isHangul: boolean;
}

function decompose(char: string): SyllableData {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) {
    return { char, cho: '', jung: '', jong: '', romanization: char, isHangul: false };
  }
  const jongIdx = code % 28;
  const jungIdx = Math.floor(code / 28) % 21;
  const choIdx  = Math.floor(code / 28 / 21);
  const cho  = CHOSEONG[choIdx];
  const jung = JUNGSEONG[jungIdx];
  const jong = JONGSEONG[jongIdx];
  return {
    char, cho, jung, jong, isHangul: true,
    romanization: (CHO_ROM[cho] ?? '') + (JUNG_ROM[jung] ?? '') + (JONG_ROM[jong] ?? ''),
  };
}

function analyzeText(text: string): SyllableData[] {
  return text.split('').map(decompose);
}

function speak(text: string, slow = false) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = slow ? 0.5 : 0.8;
  window.speechSynthesis.speak(u);
}

// ─────────────────────────────────────────────────────────────────────────────
// XP System
// ─────────────────────────────────────────────────────────────────────────────

const XP_PER_LEVEL = 200;

// ─────────────────────────────────────────────────────────────────────────────
// Batchim Rules Data
// ─────────────────────────────────────────────────────────────────────────────

interface BatchimExample {
  written: string;
  spoken: string;
  romanWritten: string;
  romanSpoken: string;
  note: string;
}

interface BatchimRule {
  id: string;
  emoji: string;
  name: string;
  nameEs: string;
  color: string;
  bg: string;
  explanation: string;
  trigger: string;
  examples: BatchimExample[];
}

const BATCHIM_RULES: BatchimRule[] = [
  {
    id: 'yeonneum',
    emoji: '🔗',
    name: '연음',
    nameEs: 'Enlace silábico',
    color: '#6C63FF',
    bg: 'rgba(108,99,255,0.08)',
    explanation:
      'Cuando una sílaba termina en consonante (batchim) y la siguiente empieza con ㅇ (inicial muda), la consonante final "se mueve" para abrir la sílaba siguiente. No hay sonido extra — solo se redistribuyen los fonemas.',
    trigger: 'batchim + vocal siguiente (ㅇ inicial)',
    examples: [
      { written: '먹어요', spoken: '머거요', romanWritten: 'meok·eo·yo', romanSpoken: 'meo·geo·yo', note: 'ㄱ se convierte en inicial de 어' },
      { written: '있어요', spoken: '이써요', romanWritten: 'iss·eo·yo',  romanSpoken: 'i·sseo·yo',  note: 'ㅆ se mueve al inicio de 어' },
      { written: '읽어요', spoken: '일거요', romanWritten: 'ilg·eo·yo',  romanSpoken: 'il·geo·yo',  note: 'del cluster ㄺ solo ㄱ se enlaza' },
    ],
  },
  {
    id: 'neutralization',
    emoji: '⚖️',
    name: '평파열음화',
    nameEs: 'Neutralización',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    explanation:
      'En posición final de sílaba (cuando el batchim no va seguido de vocal), solo 7 consonantes pueden existir: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ. Las demás se "neutralizan" al representante más cercano. Por eso muchas palabras suenan iguales al final.',
    trigger: 'consonante en posición final de frase o ante otra consonante',
    examples: [
      { written: '부엌', spoken: '부억', romanWritten: 'bu·eok\'', romanSpoken: 'bu·eok', note: 'ㅋ → [ㄱ]' },
      { written: '낮',   spoken: '낟',   romanWritten: 'nat\'',    romanSpoken: 'nat',    note: 'ㅈ → [ㄷ]' },
      { written: '앞',   spoken: '압',   romanWritten: 'ap\'',     romanSpoken: 'ap',     note: 'ㅍ → [ㅂ]' },
    ],
  },
  {
    id: 'nasalization',
    emoji: '👃',
    name: '비음화',
    nameEs: 'Nasalización',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    explanation:
      'Cuando un batchim obstruyente ([ㄱ], [ㄷ], [ㅂ]) va seguido de una consonante nasal (ㄴ o ㅁ), adopta el punto de articulación nasal equivalente: [ㄱ]→ㅇ, [ㄷ]→ㄴ, [ㅂ]→ㅁ. El lugar de articulación se mantiene, solo cambia la "apertura nasal".',
    trigger: '[ㄱ/ㄷ/ㅂ] + ㄴ o ㅁ',
    examples: [
      { written: '국물',  spoken: '궁물',  romanWritten: 'guk·mul',  romanSpoken: 'gung·mul',  note: '[ㄱ] antes de ㅁ → ㅇ' },
      { written: '합니다', spoken: '함니다', romanWritten: 'hap·ni·da', romanSpoken: 'ham·ni·da', note: '[ㅂ] antes de ㄴ → ㅁ' },
      { written: '학년',  spoken: '항년',  romanWritten: 'hak·nyeon', romanSpoken: 'hang·nyeon', note: '[ㄱ] antes de ㄴ → ㅇ' },
    ],
  },
  {
    id: 'aspiration',
    emoji: '💨',
    name: '격음화',
    nameEs: 'Aspiración',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    explanation:
      'Cuando ㅎ está en contacto con una consonante obstruyente sorda, se fusionan en la consonante aspirada: ㄱ+ㅎ=ㅋ, ㄷ+ㅎ=ㅌ, ㅂ+ㅎ=ㅍ, ㅈ+ㅎ=ㅊ. Puede darse con ㅎ como batchim o como inicial.',
    trigger: 'ㅎ en contacto con ㄱ, ㄷ, ㅂ o ㅈ',
    examples: [
      { written: '좋다', spoken: '조타', romanWritten: 'joh·da', romanSpoken: 'jo·ta', note: 'ㅎ + ㄷ → ㅌ' },
      { written: '많다', spoken: '만타', romanWritten: 'man·da', romanSpoken: 'man·ta', note: 'ㄶ: ㅎ + ㄷ → ㅌ' },
      { written: '넣고', spoken: '너코', romanWritten: 'neo·h·go', romanSpoken: 'neo·ko', note: 'ㅎ + ㄱ → ㅋ' },
    ],
  },
  {
    id: 'lateralization',
    emoji: '🌊',
    name: '유음화',
    nameEs: 'Lateralización',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    explanation:
      'Cuando ㄴ y ㄹ se encuentran en contacto (en cualquier orden), ambos se convierten en ㄹ. Esto crea el sonido "l-l" que escuchas en palabras como 실라 (신라). Es una asimilación total.',
    trigger: 'ㄴ + ㄹ  o  ㄹ + ㄴ',
    examples: [
      { written: '난로', spoken: '날로', romanWritten: 'nan·ro', romanSpoken: 'nal·lo', note: 'ㄴ + ㄹ → ㄹ·ㄹ' },
      { written: '신라', spoken: '실라', romanWritten: 'sin·ra', romanSpoken: 'sil·la', note: 'ㄴ + ㄹ → ㄹ·ㄹ' },
      { written: '설날', spoken: '설랄', romanWritten: 'seol·nal', romanSpoken: 'seol·lal', note: 'ㄹ + ㄴ → ㄹ·ㄹ' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Starter texts
// ─────────────────────────────────────────────────────────────────────────────

const STARTER_TEXTS = [
  '안녕하세요',
  '감사합니다',
  '한국어 공부해요',
  '커피 주세요',
  '화장실 있어요',
];

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticaClient() {
  const [activeTab, setActiveTab] = useState<'reader' | 'batchim'>('reader');
  const [xp, setXp] = useState(0);

  const addXp = useCallback((amount: number) => {
    setXp(prev => prev + amount);
  }, []);

  const level      = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel  = xp % XP_PER_LEVEL;
  const xpPct      = (xpInLevel / XP_PER_LEVEL) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '4rem' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #534AB7 0%, #6C63FF 50%, #7C8FFF 100%)',
        color: '#fff',
        padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75 }}>
          Idiomas WeLearn — Herramientas gratuitas
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
          Práctica de Coreano ✨
        </h1>
        <p style={{ opacity: 0.85, marginTop: '0.6rem', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', maxWidth: 480, margin: '0.6rem auto 0' }}>
          Desglosa sílabas, aprende romanización y domina las reglas fonéticas del Hangul.
        </p>

        {/* XP Bar */}
        <div style={{
          maxWidth: 460, margin: '1.75rem auto 0',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 14, padding: '0.85rem 1.1rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>⭐ Nivel {level}</span>
            <span>{xpInLevel} / {XP_PER_LEVEL} XP</span>
          </div>
          <div style={{ height: 9, background: 'rgba(255,255,255,0.25)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${xpPct}%`,
              background: 'linear-gradient(90deg, #fff 0%, #d4d0ff 100%)',
              borderRadius: 6,
              transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', opacity: 0.75 }}>
            Escucha palabras y explora reglas para ganar XP
          </p>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.6rem',
        padding: '1.5rem 1rem 0',
        flexWrap: 'wrap',
      }}>
        {([
          { id: 'reader',  label: '📖 Lector de Hangul' },
          { id: 'batchim', label: '🎵 Reglas de Batchim' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              background: activeTab === tab.id ? '#6C63FF' : 'var(--card)',
              color:      activeTab === tab.id ? '#fff'    : 'var(--fg)',
              boxShadow:  activeTab === tab.id
                ? '0 4px 16px rgba(108,99,255,0.40)'
                : '0 1px 4px rgba(0,0,0,0.08)',
              transform: activeTab === tab.id ? 'translateY(-1px)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {activeTab === 'reader'
          ? <KoreanReader  addXp={addXp} />
          : <BatchimAnalyzer addXp={addXp} />
        }
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 1: Korean Reader
// ─────────────────────────────────────────────────────────────────────────────

function KoreanReader({ addXp }: { addXp: (n: number) => void }) {
  const [input,     setInput]     = useState('안녕하세요');
  const [syllables, setSyllables] = useState<SyllableData[]>(() => analyzeText('안녕하세요'));
  const [selected,  setSelected]  = useState<number | null>(null);

  function handleAnalyze() {
    const t = input.trim();
    if (!t) return;
    setSyllables(analyzeText(t));
    setSelected(null);
  }

  function handleSpeakFull(slow = false) {
    speak(input, slow);
    addXp(10);
  }

  function handleClickSyllable(idx: number, char: string) {
    setSelected(idx);
    speak(char);
    addXp(5);
  }

  function handleQuick(text: string) {
    setInput(text);
    setSyllables(analyzeText(text));
    setSelected(null);
  }

  const fullRoman = syllables.map(s => s.romanization).join('-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Input card */}
      <div style={card()}>
        <h2 style={cardTitle()}>📝 Escribe texto en coreano</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAnalyze(); }}
            placeholder="예: 안녕하세요"
            style={{
              flex: '1 1 180px',
              padding: '0.8rem 1rem',
              fontSize: '1.15rem',
              borderRadius: 10,
              border: '2px solid rgba(108,99,255,0.3)',
              background: 'var(--bg)',
              color: 'var(--fg)',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button onClick={handleAnalyze} style={btn('#6C63FF', { padding: '0.8rem 1.4rem', fontSize: '0.95rem' })}>
            Analizar →
          </button>
        </div>

        {/* Quick examples */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
          {STARTER_TEXTS.map(t => (
            <button
              key={t}
              onClick={() => handleQuick(t)}
              style={{
                padding: '0.3rem 0.8rem',
                background: 'rgba(108,99,255,0.1)',
                color: '#6C63FF',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                transition: 'background 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Syllable grid */}
      {syllables.length > 0 && (
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <h2 style={cardTitle()}>🔤 Desglose silábico</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleSpeakFull(false)} style={btn('#6C63FF')}>▶ Escuchar</button>
              <button onClick={() => handleSpeakFull(true)}  style={btn('#534AB7')}>🐢 Lento</button>
            </div>
          </div>

          {/* Full romanization */}
          <p style={{
            textAlign: 'center',
            fontSize: '1rem',
            color: '#6C63FF',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            margin: '0 0 1.25rem',
            opacity: 0.85,
          }}>
            [{fullRoman}]
          </p>

          {/* Syllable cards grid */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {syllables.map((s, idx) => (
              <button
                key={idx}
                onClick={() => s.isHangul && handleClickSyllable(idx, s.char)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.9rem',
                  borderRadius: 14,
                  border: selected === idx
                    ? '2px solid #6C63FF'
                    : '2px solid rgba(108,99,255,0.15)',
                  background: selected === idx
                    ? 'rgba(108,99,255,0.1)'
                    : s.isHangul ? 'var(--bg)' : 'transparent',
                  cursor: s.isHangul ? 'pointer' : 'default',
                  transition: 'all 0.15s',
                  minWidth: 70,
                  boxShadow: selected === idx ? '0 4px 14px rgba(108,99,255,0.25)' : 'none',
                  fontFamily: 'inherit',
                }}
              >
                {s.isHangul ? (
                  <>
                    <span style={{
                      fontSize: '1.9rem',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: selected === idx ? '#6C63FF' : 'var(--fg)',
                    }}>
                      {s.char}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.45rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <JamoPill label={s.cho}  color="#6C63FF" title="초성 — consonante inicial" />
                      <JamoPill label={s.jung} color="#3B82F6" title="중성 — vocal" />
                      {s.jong && <JamoPill label={s.jong} color="#F59E0B" title="종성 — batchim" />}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6C63FF', marginTop: '0.35rem', fontStyle: 'italic', opacity: 0.8 }}>
                      {s.romanization}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.1rem' }}>
                      🔊 tap
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: '1.4rem', color: 'var(--muted)', lineHeight: 2.2 }}>{s.char}</span>
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex', gap: '1.25rem', justifyContent: 'center',
            marginTop: '1.25rem', flexWrap: 'wrap',
            fontSize: '0.78rem', color: 'var(--muted)',
          }}>
            <span><Dot color="#6C63FF" /> 초성 (inicial)</span>
            <span><Dot color="#3B82F6" /> 중성 (vocal)</span>
            <span><Dot color="#F59E0B" /> 종성 · batchim (final)</span>
          </div>
        </div>
      )}

      {/* Detail panel for selected syllable */}
      {selected !== null && syllables[selected]?.isHangul && (
        <SyllableDetail syllable={syllables[selected]} />
      )}

      {/* Info tip */}
      <div style={{
        background: 'rgba(108,99,255,0.07)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 12,
        padding: '0.9rem 1.1rem',
        fontSize: '0.85rem',
        color: 'var(--muted)',
        lineHeight: 1.6,
      }}>
        💡 <strong>Tip:</strong> Haz clic en cada sílaba para escucharla individualmente (+5 XP).
        Usa <strong>Lento</strong> para ver los tones con más claridad. La romanización sigue el
        sistema de Romanización Revisada del Coreano (국어의 로마자 표기법) de forma simplificada.
      </div>
    </div>
  );
}

// ─── Syllable Detail ───────────────────────────────────────────────────────────

function SyllableDetail({ syllable }: { syllable: SyllableData }) {
  const parts = [
    {
      label: '초성 — Inicial',
      value: syllable.cho,
      color: '#6C63FF',
      rom: CHO_ROM[syllable.cho] !== '' ? CHO_ROM[syllable.cho] : '(silente)',
      desc: syllable.cho === 'ㅇ'
        ? 'ㅇ en posición inicial es muda — la sílaba comienza directo con la vocal.'
        : 'Consonante que abre la sílaba.',
    },
    {
      label: '중성 — Vocal',
      value: syllable.jung,
      color: '#3B82F6',
      rom: JUNG_ROM[syllable.jung] ?? '—',
      desc: 'El núcleo vocálico. Puede ser simple (ㅏ) o diptongo (ㅘ).',
    },
    ...(syllable.jong ? [{
      label: '종성 · Batchim',
      value: syllable.jong,
      color: '#F59E0B',
      rom: JONG_ROM[syllable.jong] ?? '—',
      desc: 'Consonante final. Regula muchas reglas fonéticas del coreano.',
    }] : []),
  ];

  return (
    <div style={card()}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700 }}>
        Detalle de{' '}
        <span style={{ color: '#6C63FF', fontSize: '1.5rem', fontWeight: 900 }}>{syllable.char}</span>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem', marginLeft: '0.5rem', fontStyle: 'italic' }}>
          [{syllable.romanization}]
        </span>
        {!syllable.jong && (
          <span style={{
            marginLeft: '0.75rem', fontSize: '0.75rem',
            background: 'rgba(108,99,255,0.1)', color: '#6C63FF',
            border: '1px solid rgba(108,99,255,0.25)', borderRadius: 6,
            padding: '0.15rem 0.55rem', fontStyle: 'normal', fontWeight: 600,
          }}>
            sin batchim
          </span>
        )}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
        {parts.map(p => (
          <div key={p.label} style={{
            background: `${p.color}11`,
            border: `1px solid ${p.color}33`,
            borderRadius: 12,
            padding: '0.85rem',
          }}>
            <div style={{ fontSize: '0.72rem', color: p.color, fontWeight: 800, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {p.label}
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: p.color, lineHeight: 1 }}>{p.value}</div>
            <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--muted)', marginTop: '0.3rem' }}>/{p.rom}/</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool 2: Batchim Analyzer
// ─────────────────────────────────────────────────────────────────────────────

function BatchimAnalyzer({ addXp }: { addXp: (n: number) => void }) {
  const [openRule, setOpenRule] = useState<string | null>('yeonneum');
  const [played,   setPlayed]   = useState<Set<string>>(new Set());

  function handleExample(ex: BatchimExample, ruleId: string) {
    speak(ex.written);
    const key = `${ruleId}-${ex.written}`;
    if (!played.has(key)) {
      setPlayed(prev => new Set(prev).add(key));
      addXp(15);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Intro card */}
      <div style={card()}>
        <h2 style={cardTitle()}>🎵 Reglas fonéticas del Batchim</h2>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          El batchim (종성, consonante final) no siempre suena como se escribe.
          Estas <strong>5 reglas</strong> explican prácticamente todos los cambios fonéticos del coreano.
          Haz clic en cada ejemplo para escuchar la pronunciación real <span style={{ color: '#10B981', fontWeight: 700 }}>(+15 XP)</span>.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.9rem' }}>
          {BATCHIM_RULES.map(r => (
            <button
              key={r.id}
              onClick={() => setOpenRule(openRule === r.id ? null : r.id)}
              style={{
                padding: '0.3rem 0.75rem',
                background: openRule === r.id ? r.color : 'transparent',
                color: openRule === r.id ? '#fff' : r.color,
                border: `1.5px solid ${r.color}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {r.emoji} {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rule cards */}
      {BATCHIM_RULES.map(rule => (
        <div key={rule.id} style={{
          background: 'var(--card)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          border: openRule === rule.id
            ? `2px solid ${rule.color}55`
            : '2px solid transparent',
          transition: 'border 0.2s',
        }}>

          {/* Header */}
          <button
            onClick={() => setOpenRule(openRule === rule.id ? null : rule.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.1rem 1.25rem',
              background: openRule === rule.id ? rule.bg : 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: '1.6rem' }}>{rule.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: rule.color }}>{rule.name}</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 600 }}>{rule.nameEs}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.15rem' }}>
                Activador: <em>{rule.trigger}</em>
              </div>
            </div>
            <span style={{
              color: 'var(--muted)', fontSize: '1rem',
              display: 'inline-block',
              transform: openRule === rule.id ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}>▼</span>
          </button>

          {/* Body */}
          {openRule === rule.id && (
            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--fg)' }}>
                {rule.explanation}
              </p>

              <div style={{ fontSize: '0.8rem', color: rule.color, fontWeight: 700, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ejemplos — haz clic para escuchar
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {rule.examples.map((ex, i) => {
                  const key = `${rule.id}-${ex.written}`;
                  const wasPlayed = played.has(key);
                  return (
                    <button
                      key={i}
                      onClick={() => handleExample(ex, rule.id)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr auto',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.9rem 1rem',
                        background: rule.bg,
                        border: `1px solid ${rule.color}22`,
                        borderRadius: 12,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        transition: 'box-shadow 0.15s',
                      }}
                    >
                      {/* Written */}
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '0.2rem', textTransform: 'uppercase' }}>Escrito</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>{ex.written}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--muted)', fontStyle: 'italic' }}>[{ex.romanWritten}]</div>
                      </div>

                      {/* Spoken */}
                      <div>
                        <div style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700, marginBottom: '0.2rem', textTransform: 'uppercase' }}>Pronunciado</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>{ex.spoken}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--muted)', fontStyle: 'italic' }}>[{ex.romanSpoken}]</div>
                      </div>

                      {/* CTA */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          background: wasPlayed ? '#10B981' : rule.color,
                          color: '#fff',
                          borderRadius: 10,
                          padding: '0.45rem 0.8rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          marginBottom: '0.35rem',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.2s',
                        }}>
                          {wasPlayed ? '✓ +15 XP' : '▶ +15 XP'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', maxWidth: 100, lineHeight: 1.3, textAlign: 'right' }}>
                          {ex.note}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Summary card */}
      <div style={{
        background: 'rgba(108,99,255,0.07)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 14,
        padding: '1.1rem 1.25rem',
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: 'var(--muted)',
      }}>
        <strong style={{ color: '#6C63FF', display: 'block', marginBottom: '0.4rem' }}>🧠 Resumen de las 7 consonantes representativas</strong>
        En posición final, el coreano solo usa estas 7: <strong style={{ color: 'var(--fg)' }}>ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ</strong>.
        Las demás consonantes se neutralizan hacia una de estas. Aprenderlas te ayudará a predecir la pronunciación de cualquier palabra.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared micro-components & helpers
// ─────────────────────────────────────────────────────────────────────────────

function JamoPill({ label, color, title }: { label: string; color: string; title: string }) {
  if (!label) return null;
  return (
    <span title={title} style={{
      background: `${color}22`,
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: 5,
      padding: '0 5px',
      fontWeight: 800,
      fontSize: '0.8rem',
      lineHeight: '1.5',
    }}>
      {label}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 8, height: 8,
      borderRadius: '50%',
      background: color,
      marginRight: 3,
      verticalAlign: 'middle',
    }} />
  );
}

function card(): CSSProperties {
  return {
    background: 'var(--card)',
    borderRadius: 16,
    padding: '1.5rem',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  };
}

function cardTitle(): CSSProperties {
  return { margin: '0 0 0.9rem', fontSize: '1.1rem', fontWeight: 800 };
}

function btn(bg: string, extra?: CSSProperties): CSSProperties {
  return {
    padding: '0.5rem 1.1rem',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 9,
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 700,
    fontFamily: 'inherit',
    ...extra,
  };
}
