'use client';

import { useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface CoreBlock {
  korean: string;
  role: string;
  label: string;
  translation: string;
  color: string;
}

interface ComplementPiece {
  id: string;
  label: string;
  name: string;
  color: string;
  example_kr: string;
  example_es: string;
  particle: string | null;
  note: string;
  available: boolean;
  variants?: Array<{ kr: string; es: string }>;
}

interface PracticeItem {
  id: string;
  sentence: string[];
  colors: string[];
  audio: string;
  question: string;
  correct: string;
  feedback: string;
}

const CORE_BLOCKS: CoreBlock[] = [
  { korean: '저는', role: 'ejecutor', label: '¿Quién?', translation: 'yo (formal)', color: '#6c63ff' },
  { korean: '학교에', role: 'complemento', label: '¿Dónde?', translation: 'a la escuela', color: '#e6930a' },
  { korean: '가요', role: 'verbo', label: '¿Qué pasa?', translation: 'voy — acción al final', color: '#2d9b4e' },
];

const COMPLEMENT_PIECES: ComplementPiece[] = [
  {
    id: 'tiempo',
    label: '¿Cuándo?',
    name: 'Tiempo',
    color: '#7c3aed',
    example_kr: '오늘',
    example_es: 'hoy',
    particle: null,
    note: 'Va primero dentro del complemento. Todavía no lo usamos en Step 001.',
    available: false,
  },
  {
    id: 'lugar',
    label: '¿Dónde?',
    name: 'Lugar',
    color: '#e6930a',
    example_kr: '학교에',
    example_es: 'a la escuela',
    particle: '에',
    note: 'La partícula 에 indica dirección. Se pega después del lugar.',
    available: true,
    variants: [
      { kr: '학교에', es: 'a la escuela' },
      { kr: '집에', es: 'a casa' },
      { kr: '대학교에', es: 'a la universidad' },
    ],
  },
  {
    id: 'objeto',
    label: '¿Qué?',
    name: 'Objeto',
    color: '#0891b2',
    example_kr: '책을',
    example_es: 'el libro',
    particle: '을/를',
    note: 'La partícula 을/를 marca el objeto directo. Lo verás en Steps siguientes.',
    available: false,
  },
  {
    id: 'manera',
    label: '¿Cómo?',
    name: 'Manera',
    color: '#dc2626',
    example_kr: '천천히',
    example_es: 'despacio',
    particle: null,
    note: 'Va justo antes del verbo. Lo verás en Steps siguientes.',
    available: false,
  },
];

const SPANISH_ORDER_TEXT = {
  lines: [
    { text: 'Yo en la mañana al colegio voy.', highlight: 'voy' },
    { text: 'Después a casa vuelvo.', highlight: 'vuelvo' },
    { text: 'Más tarde a la universidad voy.', highlight: 'voy' },
  ],
  note: 'La meta no es hablar español raro. La meta es entrenar tu cerebro para esperar la acción al final.',
};

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'P1',
    sentence: ['저는', '학교에', '가요'],
    colors: ['#6c63ff', '#e6930a', '#2d9b4e'],
    audio: '학교에 가요',
    question: '¿Cuál es el verbo?',
    correct: '가요',
    feedback: '가요 es la acción. Siempre al final.',
  },
  {
    id: 'P2',
    sentence: ['저는', '집에', '가요'],
    colors: ['#6c63ff', '#e6930a', '#2d9b4e'],
    audio: '집에 가요',
    question: '¿Cuál es el complemento (el lugar)?',
    correct: '집에',
    feedback: '집에 = a casa. El lugar con su partícula 에.',
  },
  {
    id: 'P3',
    sentence: ['저는', '대학교에', '가요'],
    colors: ['#6c63ff', '#e6930a', '#2d9b4e'],
    audio: '저는 대학교에 가요',
    question: '¿Cuál es el ejecutor?',
    correct: '저는',
    feedback: '저는 = yo (formal). Siempre va primero.',
  },
];

const PHASES = ['rule', 'structure', 'complement', 'particles', 'practice'];

function colorAlpha(hex: string, alphaHex = '20') {
  return `${hex}${alphaHex}`;
}

function HighlightLine({ text, highlight }: { text: string; highlight: string }) {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx < 0) return <span>{text}</span>;
  const before = text.slice(0, idx);
  const mid = text.slice(idx, idx + highlight.length);
  const after = text.slice(idx + highlight.length);
  return (
    <span>
      {before}
      <strong style={{ color: '#2d9b4e' }}>{mid}</strong>
      {after}
    </span>
  );
}

function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
    >
      {label}
    </button>
  );
}

interface Props {
  onComplete?: () => void;
}

export default function MicroExplanation({ onComplete }: Props) {
  const [phase, setPhase] = useState('rule');
  const [currentPractice, setCurrentPractice] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [checkedPractice, setCheckedPractice] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);

  const activePhaseIndex = phase === 'complete' ? PHASES.length : Math.max(0, PHASES.indexOf(phase));
  const practiceItem = PRACTICE_ITEMS[currentPractice] ?? null;
  const practiceCorrect = checkedPractice && selectedWord === practiceItem?.correct;

  function goToPhase(nextPhase: string) {
    setPhase(nextPhase);
  }

  function handleVerifyPractice() {
    if (!selectedWord || checkedPractice || !practiceItem) return;
    setCheckedPractice(true);
    if (selectedWord === practiceItem.correct) {
      setPracticeScore((prev) => prev + 1);
    }
  }

  function handleNextPractice() {
    if (!checkedPractice) return;
    if (currentPractice >= PRACTICE_ITEMS.length - 1) {
      setPhase('complete');
      onComplete?.();
      return;
    }
    setCurrentPractice((prev) => prev + 1);
    setSelectedWord('');
    setCheckedPractice(false);
  }

  function renderPhaseDots() {
    return (
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
        {PHASES.map((_, index) => {
          const done = phase === 'complete' || index < activePhaseIndex;
          const active = phase !== 'complete' && index === activePhaseIndex;
          return (
            <span
              key={index}
              style={{ width: 28, height: 4, borderRadius: 2, background: done ? '#2d9b4e' : active ? '#6c63ff' : '#e9ecef' }}
            />
          );
        })}
      </div>
    );
  }

  function renderRulePhase() {
    return (
      <div
        key="rule"
        style={{ animation: 'fadeIn 0.3s ease' }}
      >
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          SECCIÓN 7 DE 11
        </p>
        <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Micro explicación</h3>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6c757d', lineHeight: 1.7 }}>
          En coreano, la acción suele ir al final de la frase.
        </p>

        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <div>
            {CORE_BLOCKS.map((block) => (
              <span
                key={block.korean}
                style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 40, fontWeight: 700, color: block.color, marginRight: 12 }}
              >
                {block.korean}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8 }}>
            {CORE_BLOCKS.map((block) => (
              <p key={`${block.korean}-label`} style={{ margin: 0, fontSize: 10, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {block.role}
              </p>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => playAudio('학교에 가요', 1)}
            style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer' }}
          >
            🔊 Escuchar frase
          </button>
        </div>

        <article style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Español natural:</p>
            <p style={{ margin: 0, fontSize: 13, color: '#6c757d' }}>Yo voy a la escuela.</p>
          </div>
          <div style={{ marginBottom: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Orden coreano:</p>
            <p style={{ margin: 0, fontSize: 13, color: '#e6930a' }}>Yo a la escuela <strong style={{ color: '#2d9b4e' }}>voy</strong>.</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Coreano:</p>
            <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, color: '#6c63ff', fontWeight: 700 }}>저는 학교에 가요.</p>
          </div>
        </article>

        <article style={{ background: 'rgba(45,155,78,0.05)', border: '1px solid rgba(45,155,78,0.15)', borderRadius: 10, padding: 14, fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
          {SPANISH_ORDER_TEXT.lines.map((line) => (
            <p key={line.text} style={{ margin: '0 0 6px', color: '#1a1a2e' }}>
              <HighlightLine text={line.text} highlight={line.highlight} />
            </p>
          ))}
          <p style={{ margin: 0, color: '#6c757d', fontSize: 11, fontStyle: 'italic' }}>{SPANISH_ORDER_TEXT.note}</p>
        </article>

        <NextButton label="Ver la estructura →" onClick={() => goToPhase('structure')} />
      </div>
    );
  }

  function renderStructurePhase() {
    return (
      <div key="structure" style={{ animation: 'fadeIn 0.3s ease' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>La frase tiene 3 partes</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6c757d' }}>Cada parte tiene un trabajo.</p>

        <div style={{ marginBottom: 12 }}>
          {CORE_BLOCKS.map((block) => (
            <article
              key={block.korean}
              style={{
                background: '#fff',
                border: `2px solid ${colorAlpha(block.color, '25')}`,
                borderLeft: `4px solid ${block.color}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: colorAlpha(block.color, '15'), color: block.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 100, padding: '2px 8px' }}>
                  {block.label}
                </span>
                <p style={{ flex: 1, margin: 0, textAlign: 'center', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 700, color: block.color }}>
                  {block.korean}
                </p>
                <button
                  type="button"
                  onClick={() => playAudio(block.korean, 1)}
                  style={{ background: colorAlpha(block.color, '15'), border: `1px solid ${colorAlpha(block.color, '30')}`, borderRadius: '50%', width: 32, height: 32, fontSize: 14, cursor: 'pointer' }}
                >
                  🔊
                </button>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#6c757d', textAlign: 'center' }}>{block.translation}</p>
              <p style={{ margin: '8px 0 0', fontSize: 12, color: '#1a1a2e', lineHeight: 1.6 }}>
                {block.role === 'ejecutor' && 'El que realiza la acción. Siempre va primero.'}
                {block.role === 'complemento' && 'Todo lo que está entre el ejecutor y el verbo. Aquí van el lugar, el tiempo, el objeto...'}
                {block.role === 'verbo' && 'La acción. Siempre al final. Sin excepciones.'}
              </p>
            </article>
          ))}
        </div>

        <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 12, padding: 16, textAlign: 'center', marginBottom: 20 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>La frase completa</p>
          <div style={{ display: 'inline-flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CORE_BLOCKS.map((block) => (
              <button
                key={block.korean}
                type="button"
                onClick={() => playAudio(block.korean, 1)}
                style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 26, fontWeight: 700, color: block.color, padding: '4px 10px', borderRadius: 8, background: colorAlpha(block.color, '10'), border: 'none', cursor: 'pointer' }}
              >
                {block.korean}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 98, height: 8, borderBottom: '2px solid #e6930a', borderLeft: '2px solid #e6930a', borderRight: '2px solid #e6930a' }} />
            <p style={{ margin: '2px 0 0', fontSize: 10, color: '#e6930a' }}>complemento</p>
          </div>
        </article>

        <NextButton label="¿Qué puede ir en el complemento? →" onClick={() => goToPhase('complement')} />
      </div>
    );
  }

  function renderComplementPhase() {
    const availablePiece = COMPLEMENT_PIECES.find((piece) => piece.available);
    const unavailablePieces = COMPLEMENT_PIECES.filter((piece) => !piece.available);

    return (
      <div key="complement" style={{ animation: 'fadeIn 0.3s ease' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>Dentro del complemento</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6c757d' }}>
          El complemento puede tener varias piezas. Cada una tiene su posición.
        </p>

        <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 16, padding: 20, marginBottom: 20, overflow: 'hidden' }}>
          <p style={{ margin: '0 0 16px', fontSize: 10, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Orden dentro del complemento
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 14 }}>
            {COMPLEMENT_PIECES.map((piece, index) => (
              <span key={piece.id} style={{ display: 'contents' }}>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '12px 8px',
                    borderRadius: 10,
                    position: 'relative',
                    border: piece.available ? `2px solid ${piece.color}` : '2px dashed #e9ecef',
                    background: piece.available ? colorAlpha(piece.color, '10') : '#f8f9fa',
                    opacity: piece.available ? 1 : 0.6,
                  }}
                >
                  <p style={{ margin: '0 0 4px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: piece.available ? piece.color : '#adb5bd' }}>
                    {piece.label}
                  </p>
                  <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, fontWeight: 700, color: piece.available ? piece.color : '#adb5bd' }}>
                    {piece.example_kr}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, color: '#6c757d' }}>{piece.example_es}</p>
                  {!piece.available ? (
                    <span style={{ position: 'absolute', top: -8, right: -4, background: '#e9ecef', color: '#adb5bd', fontSize: 8, borderRadius: 100, padding: '1px 5px' }}>
                      próximo
                    </span>
                  ) : null}
                </div>
                {index < COMPLEMENT_PIECES.length - 1 ? (
                  <span style={{ margin: '0 6px', color: '#e9ecef', fontSize: 14, flexShrink: 0 }}>→</span>
                ) : null}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#e9ecef', fontSize: 16 }}>→→</span>
            <div style={{ background: 'rgba(45,155,78,0.1)', border: '2px solid #2d9b4e', borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 9, color: '#2d9b4e', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                VERBO · siempre al final
              </p>
              <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, fontWeight: 700, color: '#2d9b4e' }}>가요</p>
              <button
                type="button"
                onClick={() => playAudio('가요', 1)}
                style={{ marginTop: 6, border: 'none', background: 'transparent', fontSize: 13, color: '#2d9b4e', cursor: 'pointer' }}
              >
                🔊
              </button>
            </div>
          </div>
        </article>

        {availablePiece ? (
          <article style={{ background: '#fff', border: `1px solid ${colorAlpha(availablePiece.color, '40')}`, borderLeft: `3px solid ${availablePiece.color}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
            <h4 style={{ margin: '0 0 8px', color: availablePiece.color, fontSize: 14, fontWeight: 700 }}>El lugar · {availablePiece.label}</h4>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6c757d', lineHeight: 1.6 }}>{availablePiece.note}</p>

            <div style={{ background: colorAlpha(availablePiece.color, '06'), border: `1px solid ${colorAlpha(availablePiece.color, '15')}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: availablePiece.color }}>La partícula 에</p>
              <div>
                {availablePiece.variants?.map((variant) => {
                  const base = variant.kr.replace('에', '');
                  return (
                    <div key={variant.kr} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto auto auto', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: '#1a1a2e' }}>{base}</span>
                      <span style={{ color: '#adb5bd', fontSize: 12 }}>+</span>
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: availablePiece.color, fontWeight: 700 }}>에</span>
                      <span style={{ color: '#adb5bd', fontSize: 12 }}>=</span>
                      <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, color: availablePiece.color, fontWeight: 700 }}>{variant.kr}</span>
                      <span style={{ fontSize: 10, color: '#6c757d' }}>{variant.es}</span>
                      <button
                        type="button"
                        onClick={() => playAudio(variant.kr, 1)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: availablePiece.color }}
                      >
                        🔊
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <p style={{ margin: '0 0 8px', fontSize: 11, color: '#6c757d' }}>Puedes cambiar el lugar:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {availablePiece.variants?.map((variant) => (
                <div key={`${variant.kr}-pill`} style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => playAudio(variant.kr, 1)}
                    style={{ background: colorAlpha(availablePiece.color, '10'), border: `1px solid ${colorAlpha(availablePiece.color, '20')}`, borderRadius: 100, padding: '5px 12px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: availablePiece.color, cursor: 'pointer' }}
                  >
                    {variant.kr}
                  </button>
                  <p style={{ margin: '3px 0 0', fontSize: 10, color: '#6c757d' }}>{variant.es}</p>
                </div>
              ))}
            </div>
          </article>
        ) : null}

        {unavailablePieces.map((piece) => (
          <article key={piece.id} style={{ background: '#f8f9fa', border: '1px dashed #e9ecef', borderRadius: 12, padding: 12, marginBottom: 8, opacity: 0.7, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🔒</span>
            <p style={{ margin: 0, fontSize: 12, color: '#adb5bd', flex: 1 }}>{piece.name} — {piece.note}</p>
            <span style={{ fontSize: 9, color: '#adb5bd', background: '#e9ecef', borderRadius: 100, padding: '2px 8px' }}>Step próximo</span>
          </article>
        ))}

        <NextButton label="La partícula 에 en detalle →" onClick={() => goToPhase('particles')} />
      </div>
    );
  }

  function renderParticlesPhase() {
    const transforms = [
      { base: '학교', result: '학교에', audio: '학교에' },
      { base: '집', result: '집에', audio: '집에' },
      { base: '대학교', result: '대학교에', audio: '대학교에' },
    ];

    return (
      <div key="particles" style={{ animation: 'fadeIn 0.3s ease' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>La partícula 에</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6c757d' }}>
          No es una preposición. Es una posposición. Va después, pegada.
        </p>

        <article style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#e9ecef', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ background: '#fff', padding: 20, textAlign: 'center' }}>
            <p style={{ margin: '0 0 12px', fontSize: 9, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Español</p>
            <p style={{ margin: '0 0 4px', fontSize: 48, fontWeight: 700, color: '#6c757d' }}>a</p>
            <p style={{ margin: '0 0 4px', color: '#6c757d' }}>↓</p>
            <p style={{ margin: 0, fontSize: 14, color: '#6c757d' }}>la escuela</p>
            <p style={{ margin: '8px 0 0', fontSize: 10, color: '#dc3545' }}>preposición ANTES</p>
          </div>
          <div style={{ background: '#fff', padding: 20, textAlign: 'center' }}>
            <p style={{ margin: '0 0 12px', fontSize: 9, color: '#6c63ff', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Coreano</p>
            <p style={{ margin: '0 0 4px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 48, fontWeight: 700, color: '#e6930a' }}>에</p>
            <p style={{ margin: '0 0 4px', color: '#6c757d' }}>↓</p>
            <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: '#1a1a2e' }}>학교<span style={{ color: '#e6930a', fontWeight: 700, borderRadius: 4, padding: '0 3px' }}>에</span></p>
            <p style={{ margin: '8px 0 0', fontSize: 10, color: '#2d9b4e' }}>posposición DESPUÉS</p>
          </div>
        </article>

        <div style={{ marginBottom: 20 }}>
          {transforms.map((row) => (
            <div key={row.result} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, background: '#fff', border: '1px solid #e9ecef', borderRadius: 10, padding: 12 }}>
              <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, background: 'rgba(230,147,10,0.1)', borderRadius: 8, padding: '4px 8px' }}>{row.base}</span>
              <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, background: 'rgba(230,147,10,0.14)', borderRadius: 8, padding: '4px 8px' }}>에</span>
              <span style={{ color: '#adb5bd' }}>=</span>
              <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, fontWeight: 700, color: '#e6930a' }}>
                {row.base}<span style={{ borderRadius: 4, padding: '0 3px' }}>에</span>
              </span>
              <button
                type="button"
                onClick={() => playAudio(row.audio, 1)}
                style={{ marginLeft: 'auto', border: 'none', background: 'transparent', color: '#e6930a', cursor: 'pointer' }}
              >
                🔊
              </button>
            </div>
          ))}
        </div>

        <article style={{ background: 'rgba(230,147,10,0.06)', border: '1px solid rgba(230,147,10,0.2)', borderRadius: 12, padding: 16, marginBottom: 20, textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: 24 }}>💡</p>
          <p style={{ margin: 0, fontSize: 13, color: '#e6930a', lineHeight: 1.7 }}>
            Sin 에, el oyente no sabe si esa palabra es el destino o algo más. La partícula hace el trabajo que en español hace el orden.
          </p>
        </article>

        <NextButton label="Practicar →" onClick={() => goToPhase('practice')} />
      </div>
    );
  }

  function renderPracticePhase() {
    if (!practiceItem) return null;

    return (
      <div key="practice" style={{ animation: 'fadeIn 0.3s ease' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>Identifica las partes</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6c757d' }}>3 frases. Toca el bloque que se pide.</p>

        <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 12, padding: 16 }}>
          <button
            type="button"
            onClick={() => playAudio(practiceItem.audio, 1)}
            style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer', marginBottom: 14 }}
          >
            🔊 Escuchar la frase
          </button>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            {practiceItem.sentence.map((word, index) => {
              const color = practiceItem.colors[index] ?? '#6c757d';
              const isSelected = selectedWord === word;
              const isCorrectWord = checkedPractice && word === practiceItem.correct;
              const isWrongSelected = checkedPractice && isSelected && word !== practiceItem.correct;

              return (
                <button
                  key={`${practiceItem.id}-${word}-${index}`}
                  type="button"
                  onClick={() => { if (checkedPractice) return; setSelectedWord(word); }}
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    padding: '10px 18px',
                    borderRadius: 10,
                    cursor: checkedPractice ? 'default' : 'pointer',
                    border: `2px solid ${isCorrectWord ? '#2d9b4e' : isWrongSelected ? '#dc3545' : isSelected ? color : `${color}30`}`,
                    background: isCorrectWord ? 'rgba(45,155,78,0.18)' : isWrongSelected ? 'rgba(220,53,69,0.12)' : isSelected ? `${color}20` : `${color}08`,
                    color: isCorrectWord ? '#2d9b4e' : isWrongSelected ? '#dc3545' : color,
                    transition: 'all 0.15s',
                  }}
                  disabled={checkedPractice}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#1a1a2e', textAlign: 'center' }}>{practiceItem.question}</p>

          {!checkedPractice ? (
            <button
              type="button"
              onClick={handleVerifyPractice}
              disabled={!selectedWord}
              style={{ width: '100%', background: selectedWord ? '#6c63ff' : '#e9ecef', color: selectedWord ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: selectedWord ? 'pointer' : 'not-allowed' }}
            >
              Verificar
            </button>
          ) : (
            <>
              <div style={{ marginBottom: 12, padding: '10px 12px', borderRadius: 8, fontSize: 12, lineHeight: 1.6, background: practiceCorrect ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${practiceCorrect ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, color: practiceCorrect ? '#2d9b4e' : '#dc3545' }}>
                {practiceCorrect
                  ? `✅ ${practiceItem.feedback}`
                  : `❌ La respuesta correcta es ${practiceItem.correct}. ${practiceItem.feedback}`}
              </div>
              <NextButton
                label={currentPractice >= PRACTICE_ITEMS.length - 1 ? 'Ver resumen →' : 'Siguiente →'}
                onClick={handleNextPractice}
              />
            </>
          )}
        </article>
      </div>
    );
  }

  function renderCompletePhase() {
    return (
      <div key="complete" style={{ animation: 'fadeIn 0.3s ease' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700, color: '#1a1a2e', textAlign: 'center' }}>Lo que aprendiste</h3>

        <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {CORE_BLOCKS.map((block) => (
              <div key={`${block.korean}-summary`} style={{ width: '33%', textAlign: 'center', border: `1px solid ${colorAlpha(block.color, '30')}`, background: colorAlpha(block.color, '10'), borderRadius: 10, padding: '10px 8px' }}>
                <p style={{ margin: '0 0 4px', fontSize: 9, color: block.color, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>{block.role}</p>
                <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, fontWeight: 700, color: block.color }}>{block.korean}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', placeItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 88, height: 8, borderBottom: '2px solid #e6930a', borderLeft: '2px solid #e6930a', borderRight: '2px solid #e6930a' }} />
            <p style={{ margin: '2px 0 0', fontSize: 10, color: '#e6930a' }}>complemento</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', fontSize: 11, color: '#6c757d' }}>
            <span style={{ padding: '3px 8px', borderRadius: 100, background: '#f8f9fa' }}>tiempo</span>
            <span>→</span>
            <span style={{ padding: '3px 8px', borderRadius: 100, background: 'rgba(230,147,10,0.1)', color: '#e6930a' }}>lugar ✓</span>
            <span>→</span>
            <span style={{ padding: '3px 8px', borderRadius: 100, background: '#f8f9fa' }}>objeto</span>
            <span>→</span>
            <span style={{ padding: '3px 8px', borderRadius: 100, background: '#f8f9fa' }}>manera</span>
            <span>→</span>
            <span style={{ padding: '3px 8px', borderRadius: 100, background: 'rgba(45,155,78,0.1)', color: '#2d9b4e' }}>VERBO</span>
          </div>
        </article>

        <div style={{ marginBottom: 16 }}>
          {[
            '📌 El verbo (가요) siempre va al final.',
            '🔗 La partícula 에 marca el destino. Va pegada después del lugar.',
            '📐 Dentro del complemento: primero el tiempo, luego el lugar, luego el objeto, luego la manera.',
          ].map((rule) => (
            <article key={rule} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 10, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#1a1a2e' }}>
              {rule}
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {[
            { text: '저는 학교에 가요', audio: '학교에 가요' },
            { text: '저는 집에 가요', audio: '집에 가요' },
            { text: '저는 대학교에 가요', audio: '저는 대학교에 가요' },
          ].map((row) => (
            <button
              key={row.text}
              type="button"
              onClick={() => playAudio(row.audio, 1)}
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, display: 'inline-flex', gap: 8, alignItems: 'center', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: '#1a1a2e' }}
            >
              {row.text}
            </button>
          ))}
        </div>

        <p style={{ margin: '16px 0 0', fontSize: 11, color: '#6c63ff', textAlign: 'center' }}>Nombrar el patrón detectado con palabras simples.</p>
        <p style={{ margin: '10px 0 0', fontSize: 11, color: '#6c757d', textAlign: 'center' }}>Score de práctica: {practiceScore}/{PRACTICE_ITEMS.length}</p>
      </div>
    );
  }

  function renderPhaseContent() {
    if (phase === 'rule') return renderRulePhase();
    if (phase === 'structure') return renderStructurePhase();
    if (phase === 'complement') return renderComplementPhase();
    if (phase === 'particles') return renderParticlesPhase();
    if (phase === 'practice') return renderPracticePhase();
    return renderCompletePhase();
  }

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {renderPhaseDots()}
      {renderPhaseContent()}
    </section>
  );
}
