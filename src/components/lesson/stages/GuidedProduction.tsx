'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio, KR_IMG } from '@/lib/storage';

interface Round1Item {
  id: string;
  prompt: string;
  pieces: string[];
  correctOrder: string[];
  audio: string;
  hint: string;
}

interface Round2Item {
  id: string;
  prompt: string;
  blank_position: string;
  options: string[];
  correct: string;
  explanation: string;
  audio: string;
  full_sentence: string;
}

interface Round3Item {
  id: string;
  img: string;
  spanish: string;
  register: string;
  register_note: string;
  correctSentence: string[];
  allPieces: string[];
  audio: string;
}

interface Round4Item {
  id: string;
  audio: string;
  correctSentence: string[];
  allPieces: string[];
  hint: string;
  full_text: string;
  translation: string;
}

type RoundItem = Round1Item | Round2Item | Round3Item | Round4Item;

interface RoundConfig {
  id: number;
  type: 'drag' | 'blank' | 'drag-register' | 'dictation';
  items: RoundItem[];
}

const ROUND1_ITEMS: Round1Item[] = [
  {
    id: 'R1-1',
    prompt: 'Forma la frase: Yo voy a la escuela. (formal)',
    pieces: ['가요', '학교에', '저는'],
    correctOrder: ['저는', '학교에', '가요'],
    audio: '학교에 가요',
    hint: 'Recuerda: ejecutor → lugar → verbo',
  },
];

const ROUND2_ITEMS: Round2Item[] = [
  {
    id: 'R2-1',
    prompt: '저는 대학교에 ____.',
    blank_position: 'end',
    options: ['가요', '어디', '집'],
    correct: '가요',
    explanation: 'Formal: yo voy a la universidad.',
    audio: '저는 대학교에 가요',
    full_sentence: '저는 대학교에 가요.',
  },
  {
    id: 'R2-2',
    prompt: '____ 집에 가요.',
    blank_position: 'start',
    options: ['대학교에', '저는', '어디'],
    correct: '저는',
    explanation: 'Completa con yo formal.',
    audio: '학교에 가요',
    full_sentence: '저는 집에 가요.',
  },
  {
    id: 'R2-3',
    prompt: '나는 ____ 가요.',
    blank_position: 'middle',
    options: ['가요', '어디', '집에'],
    correct: '집에',
    explanation: 'Casual: yo voy a casa.',
    audio: '집에 가요',
    full_sentence: '나는 집에 가요.',
  },
];

const ROUND3_ITEMS: Round3Item[] = [
  {
    id: 'R3-1',
    img: KR_IMG.school,
    spanish: 'Yo voy a la escuela.',
    register: 'formal',
    register_note: 'Usa 저는 — formal',
    correctSentence: ['저는', '학교에', '가요'],
    allPieces: ['저는', '나는', '학교에', '집에', '대학교에', '가요'],
    audio: '학교에 가요',
  },
  {
    id: 'R3-2',
    img: KR_IMG.home,
    spanish: 'Yo voy a casa.',
    register: 'casual',
    register_note: 'Usa 나는 — casual/informal',
    correctSentence: ['나는', '집에', '가요'],
    allPieces: ['저는', '나는', '학교에', '집에', '대학교에', '가요'],
    audio: '집에 가요',
  },
  {
    id: 'R3-3',
    img: KR_IMG.university,
    spanish: 'Yo voy a la universidad.',
    register: 'formal',
    register_note: 'Usa 저는 — formal',
    correctSentence: ['저는', '대학교에', '가요'],
    allPieces: ['저는', '나는', '학교에', '집에', '대학교에', '가요'],
    audio: '저는 대학교에 가요',
  },
];

const ROUND4_ITEMS: Round4Item[] = [
  {
    id: 'R4-1',
    audio: '학교에 가요',
    correctSentence: ['학교에', '가요'],
    allPieces: ['저는', '학교에', '집에', '대학교에', '가요', '나는'],
    hint: 'Solo escucha. Construye lo que oíste.',
    full_text: '학교에 가요.',
    translation: 'Va a la escuela. / Voy a la escuela.',
  },
  {
    id: 'R4-2',
    audio: '저는 대학교에 가요',
    correctSentence: ['저는', '대학교에', '가요'],
    allPieces: ['저는', '나는', '학교에', '집에', '대학교에', '가요'],
    hint: 'Esta tiene 3 partes.',
    full_text: '저는 대학교에 가요.',
    translation: 'Yo voy a la universidad. (formal)',
  },
  {
    id: 'R4-3',
    audio: '집에 가요',
    correctSentence: ['집에', '가요'],
    allPieces: ['저는', '나는', '학교에', '집에', '대학교에', '가요'],
    hint: 'Dos partes. Escucha bien el lugar.',
    full_text: '집에 가요.',
    translation: 'Va a casa. / Voy a casa.',
  },
];

const ROUNDS: RoundConfig[] = [
  { id: 1, type: 'drag', items: ROUND1_ITEMS },
  { id: 2, type: 'blank', items: ROUND2_ITEMS },
  { id: 3, type: 'drag-register', items: ROUND3_ITEMS },
  { id: 4, type: 'dictation', items: ROUND4_ITEMS },
];

const FINAL_RECAP = [
  { kr: '저는 학교에 가요.', es: 'Yo voy a la escuela.', audio: '학교에 가요' },
  { kr: '저는 집에 가요.', es: 'Yo voy a casa.', audio: '집에 가요' },
  { kr: '저는 대학교에 가요.', es: 'Yo voy a la universidad.', audio: '저는 대학교에 가요' },
  { kr: '학교에 가요.', es: 'Va/voy a la escuela.', audio: '학교에 가요' },
  { kr: '집에 가요.', es: 'Va/voy a casa.', audio: '집에 가요' },
  { kr: '대학교에 가요.', es: 'Va/voy a la universidad.', audio: '대학교에 가요' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRoleColor(word: string) {
  const ejecutor = ['저는', '나는'];
  const verbo = ['가요'];
  if (ejecutor.includes(word)) return '#6c63ff';
  if (verbo.includes(word)) return '#2d9b4e';
  return '#e6930a';
}

function isExactOrder(placed: string[], correct: string[]) {
  return placed.length === correct.length && placed.every((word, index) => word === correct[index]);
}

function roundMessage(total: number, score: number) {
  const wrong = total - score;
  if (wrong <= 0) return '¡Perfecto! Sigues al siguiente nivel.';
  if (wrong === 1) return '¡Casi! Un pequeño error. Ya lo tienes.';
  return 'Bien intentado. La práctica instala el patrón.';
}

interface Props {
  onComplete?: () => void;
}

export default function GuidedProduction({ onComplete }: Props) {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [roundScores, setRoundScores] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [showRoundSummary, setShowRoundSummary] = useState(false);
  const [isFinalComplete, setIsFinalComplete] = useState(false);

  const [bank, setBank] = useState<string[]>([]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [hasPlayed, setHasPlayed] = useState(false);

  const roundConfig = ROUNDS[currentRound - 1] ?? ROUNDS[0];
  const items = roundConfig.items;
  const item = items[currentItem] as RoundItem | undefined;

  const roundOptions = useMemo(() => {
    if (roundConfig.type !== 'blank' || !item) return [];
    return shuffle((item as Round2Item).options);
  }, [roundConfig.type, (item as Round2Item | undefined)?.id]);

  useEffect(() => {
    if (!item) return;
    setSelectedAnswer('');
    setIsChecked(false);
    setFeedback('');
    setIsCorrect(false);
    setHasPlayed(roundConfig.type !== 'dictation');

    if (roundConfig.type === 'drag') {
      setBank((item as Round1Item).pieces);
      setPlaced([]);
      return;
    }
    if (roundConfig.type === 'drag-register' || roundConfig.type === 'dictation') {
      setBank(shuffle((item as Round3Item | Round4Item).allPieces));
      setPlaced([]);
      return;
    }
    setBank([]);
    setPlaced([]);
  }, [currentRound, currentItem, (item as Round1Item | undefined)?.id, roundConfig.type]);

  const totalItems = items.length;
  const totalCorrect = Object.values(roundScores).reduce((acc, value) => acc + value, 0);
  const totalAttempts = ROUNDS.reduce((acc, round) => acc + round.items.length, 0);

  function resetRoundState(roundId: number) {
    setCurrentRound(roundId);
    setCurrentItem(0);
    setRoundScore(0);
    setShowRoundSummary(false);
    setIsChecked(false);
    setSelectedAnswer('');
    setFeedback('');
    setIsCorrect(false);
    setHasPlayed(false);
  }

  function handleAddFromBank(word: string) {
    if (isChecked) return;
    setBank((prev) => {
      const index = prev.findIndex((entry) => entry === word);
      if (index < 0) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    setPlaced((prev) => [...prev, word]);
  }

  function handleRemovePlaced(index: number) {
    if (isChecked) return;
    setPlaced((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const word = prev[index];
      setBank((bankPrev) => [...bankPrev, word]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }

  function finishRound() {
    setRoundScores((prev) => ({ ...prev, [currentRound]: roundScore }));
    setShowRoundSummary(true);
  }

  function handleVerifyRound1() {
    if (!item || isChecked) return;
    const r1 = item as Round1Item;
    if (placed.length !== r1.correctOrder.length) return;
    const ok = isExactOrder(placed, r1.correctOrder);
    setIsChecked(true);
    setIsCorrect(ok);
    if (ok) {
      setRoundScore((prev) => prev + 1);
      playAudio(r1.audio, 1);
      setFeedback('✅ 저는 학교에 가요. — Yo voy a la escuela.');
    } else {
      setFeedback('❌ El orden correcto es: 저는 → 학교에 → 가요');
    }
  }

  function handleVerifyRound2() {
    if (!item || isChecked || !selectedAnswer) return;
    const r2 = item as Round2Item;
    const ok = selectedAnswer === r2.correct;
    setIsChecked(true);
    setIsCorrect(ok);
    if (ok) {
      setRoundScore((prev) => prev + 1);
      playAudio(r2.audio, 1);
      setFeedback(`✅ ${r2.explanation}`);
    } else {
      setFeedback(`❌ La respuesta correcta es ${r2.correct}. ${r2.explanation}`);
    }
  }

  function round3SuccessMessage(itemId: string) {
    if (itemId === 'R3-1') return '✅ 저는 학교에 가요. — Usaste 저는 (formal). Correcto para esta situación.';
    if (itemId === 'R3-2') return '✅ 나는 집에 가요. — Usaste 나는 (casual). Perfecto para hablar con amigos.';
    return '✅ 저는 대학교에 가요. — Bien. Formal y completo.';
  }

  function handleVerifyRound3() {
    if (!item || isChecked) return;
    const r3 = item as Round3Item;
    if (placed.length !== r3.correctSentence.length) return;
    const ok = isExactOrder(placed, r3.correctSentence);
    setIsChecked(true);
    setIsCorrect(ok);
    if (ok) {
      setRoundScore((prev) => prev + 1);
      playAudio(r3.audio, 1);
      setFeedback(round3SuccessMessage(r3.id));
      return;
    }
    const expectedFirst = r3.correctSentence[0];
    const providedFirst = placed[0];
    const isRegisterMismatch = ['저는', '나는'].includes(providedFirst ?? '') && providedFirst !== expectedFirst;
    if (isRegisterMismatch) {
      setFeedback(`❌ En esta situación se usa ${expectedFirst} (${r3.register}), no ${providedFirst}.`);
    } else {
      setFeedback('❌ El orden debe ser: ejecutor → lugar → verbo.');
    }
  }

  function handleVerifyRound4() {
    if (!item || isChecked) return;
    const r4 = item as Round4Item;
    if (placed.length !== r4.correctSentence.length) return;
    const ok = isExactOrder(placed, r4.correctSentence);
    setIsChecked(true);
    setIsCorrect(ok);
    if (ok) {
      setRoundScore((prev) => prev + 1);
      playAudio(r4.audio, 1);
      setFeedback(`✅ ${r4.full_text} — ${r4.translation}`);
    } else {
      setFeedback(`❌ Respuesta correcta: ${r4.correctSentence.join(' ')}. ${r4.translation}`);
    }
  }

  function handleVerify() {
    if (roundConfig.type === 'drag') { handleVerifyRound1(); return; }
    if (roundConfig.type === 'blank') { handleVerifyRound2(); return; }
    if (roundConfig.type === 'drag-register') { handleVerifyRound3(); return; }
    handleVerifyRound4();
  }

  function handleNextItem() {
    if (!isChecked) return;
    if (currentItem < totalItems - 1) { setCurrentItem((prev) => prev + 1); return; }
    finishRound();
  }

  function canVerify() {
    if (!item) return false;
    if (roundConfig.type === 'blank') return Boolean(selectedAnswer);
    const needsAudioGate = roundConfig.type === 'dictation';
    const castItem = item as Round3Item | Round4Item | Round1Item;
    const expectedLength = ('correctSentence' in castItem ? castItem.correctSentence : (castItem as Round1Item).correctOrder)?.length ?? 0;
    return (needsAudioGate ? hasPlayed : true) && placed.length === expectedLength;
  }

  function renderRoundIndicator() {
    return (
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
        {[1, 2, 3, 4].map((round) => {
          const done = round < currentRound || (showRoundSummary && round === currentRound);
          const active = round === currentRound && !showRoundSummary;
          return (
            <span key={round} style={{ width: 48, height: 4, borderRadius: 2, background: done ? '#2d9b4e' : active ? '#6c63ff' : '#e9ecef' }} />
          );
        })}
      </div>
    );
  }

  function renderProgress() {
    const percent = totalItems > 0 ? ((currentItem + 1) / totalItems) * 100 : 0;
    return (
      <>
        <p style={{ margin: '0 0 4px', fontSize: 11, color: '#6c757d', textAlign: 'right' }}>{`${currentItem + 1} de ${totalItems}`}</p>
        <div style={{ height: 2, background: '#e9ecef', borderRadius: 1, marginBottom: 16 }}>
          <div style={{ width: `${percent}%`, height: '100%', background: '#6c63ff', borderRadius: 1, transition: 'width 0.2s' }} />
        </div>
      </>
    );
  }

  function renderDragArea(promptHint?: string) {
    return (
      <>
        {promptHint ? <p style={{ margin: '0 0 10px', fontSize: 11, color: '#6c757d', textAlign: 'center' }}>{promptHint}</p> : null}
        <div style={{ minHeight: 56, background: '#f8f9fa', border: '2px dashed #e9ecef', borderRadius: 10, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          {placed.length === 0 ? <span style={{ fontSize: 12, color: '#adb5bd' }}>← toca las palabras en orden</span> : null}
          {placed.map((word, index) => (
            <button
              key={`${word}-${index}`}
              type="button"
              onClick={() => handleRemovePlaced(index)}
              style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${getRoleColor(word)}44`, background: `${getRoleColor(word)}1a`, color: getRoleColor(word), fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, cursor: isChecked ? 'default' : 'pointer', transition: 'transform 0.1s' }}
              disabled={isChecked}
            >
              {word}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {bank.map((word, index) => (
            <button
              key={`${word}-bank-${index}`}
              type="button"
              onClick={() => handleAddFromBank(word)}
              style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${getRoleColor(word)}44`, background: '#fff', color: getRoleColor(word), fontFamily: "'Noto Sans KR', sans-serif", fontSize: 18, cursor: isChecked ? 'default' : 'pointer', transition: 'transform 0.1s' }}
              disabled={isChecked}
            >
              {word}
            </button>
          ))}
        </div>
      </>
    );
  }

  function renderRoundSummary() {
    const message = roundMessage(totalItems, roundScore);
    const lastRound = currentRound === 4;
    return (
      <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 16, padding: '2rem', textAlign: 'center', marginBottom: 16 }}>
        <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>{`Ronda ${currentRound} completada`}</h4>
        <p style={{ margin: '0 0 8px', fontSize: 48, fontWeight: 700, color: '#6c63ff' }}>{`${roundScore}/${totalItems}`}</p>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6c757d' }}>{message}</p>
        <button
          type="button"
          onClick={() => {
            if (lastRound) { setIsFinalComplete(true); setShowRoundSummary(false); onComplete?.(); return; }
            resetRoundState(currentRound + 1);
          }}
          style={{ width: '100%', padding: 12, border: 'none', borderRadius: 8, background: '#6c63ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          {lastRound ? 'Ver resumen final →' : 'Siguiente ronda →'}
        </button>
        <button
          type="button"
          onClick={() => resetRoundState(currentRound)}
          style={{ marginTop: 10, border: 'none', background: 'transparent', color: '#adb5bd', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}
        >
          Repetir ronda
        </button>
      </article>
    );
  }

  function renderRoundContent() {
    if (!item) return null;
    return (
      <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 14, padding: 16 }}>
        {roundConfig.type === 'drag' ? (
          <>
            <p style={{ margin: '0 0 10px', fontSize: 14, color: '#1a1a2e', fontWeight: 600 }}>{(item as Round1Item).prompt}</p>
            <button type="button" onClick={() => playAudio((item as Round1Item).audio, 1)} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer', marginBottom: 12 }}>
              🔊 Escuchar la frase
            </button>
            {renderDragArea((item as Round1Item).hint)}
          </>
        ) : null}

        {roundConfig.type === 'blank' ? (
          <>
            <p style={{ margin: '0 0 20px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 700, textAlign: 'center', color: '#1a1a2e' }}>
              {(item as Round2Item).prompt.split('____')[0]}
              <span style={{ display: 'inline-block', margin: '0 6px', padding: '4px 16px', borderRadius: 6, border: '2px dashed #e9ecef', background: '#f1f3f5', color: selectedAnswer ? getRoleColor(selectedAnswer) : '#adb5bd', minWidth: 92 }}>
                {selectedAnswer || '____'}
              </span>
              {(item as Round2Item).prompt.split('____')[1]}
            </p>
            <p style={{ margin: '0 0 14px', fontSize: 11, color: '#6c757d', textAlign: 'center' }}>{(item as Round2Item).explanation}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {roundOptions.map((option) => {
                const selected = selectedAnswer === option;
                const correctOption = isChecked && option === (item as Round2Item).correct;
                const wrongOption = isChecked && selected && option !== (item as Round2Item).correct;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { if (isChecked) return; setSelectedAnswer(option); }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: `1.5px solid ${correctOption ? '#2d9b4e' : wrongOption ? '#dc3545' : selected ? '#6c63ff' : '#e9ecef'}`,
                      background: correctOption ? 'rgba(45,155,78,0.06)' : wrongOption ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : '#fff',
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 18,
                      color: correctOption ? '#2d9b4e' : wrongOption ? '#dc3545' : '#1a1a2e',
                      textAlign: 'center',
                      cursor: isChecked ? 'default' : 'pointer',
                    }}
                    disabled={isChecked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {roundConfig.type === 'drag-register' ? (
          <>
            <img src={(item as Round3Item).img} alt={(item as Round3Item).spanish} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
            <p style={{ margin: '0 0 6px', fontSize: 9, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center' }}>Construye en coreano:</p>
            <p style={{ margin: '0 0 6px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#6c757d', textAlign: 'center' }}>{(item as Round3Item).spanish}</p>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <span style={{ background: (item as Round3Item).register === 'formal' ? 'rgba(108,99,255,0.08)' : 'rgba(230,147,10,0.08)', color: (item as Round3Item).register === 'formal' ? '#6c63ff' : '#e6930a', borderRadius: 100, padding: '3px 10px', fontSize: 11, display: 'inline-block' }}>{(item as Round3Item).register_note}</span>
            </div>
            <button type="button" onClick={() => playAudio((item as Round3Item).audio, 1)} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer', marginBottom: 12 }}>
              🔊 Escuchar la frase
            </button>
            {renderDragArea()}
          </>
        ) : null}

        {roundConfig.type === 'dictation' ? (
          <>
            <button
              type="button"
              onClick={() => { playAudio((item as Round4Item).audio, 1); setHasPlayed(true); }}
              style={{ width: '100%', background: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: 16, padding: '2rem', textAlign: 'center', marginBottom: 20, cursor: 'pointer' }}
            >
              <p style={{ margin: '0 0 8px', fontSize: 48 }}>🔊</p>
              <p style={{ margin: 0, fontSize: 13, color: '#6c757d' }}>Toca para escuchar</p>
            </button>

            {hasPlayed ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
                  <button type="button" onClick={() => playAudio((item as Round4Item).audio, 1)} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer' }}>🔁 Repetir</button>
                  <button type="button" onClick={() => playAudio((item as Round4Item).audio, 0.6)} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: '#6c757d', cursor: 'pointer' }}>🐢 Lento</button>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: 11, color: '#6c757d', textAlign: 'center' }}>{(item as Round4Item).hint}</p>
                {renderDragArea()}
              </div>
            ) : null}
          </>
        ) : null}

        {isChecked ? (
          <div style={{ marginBottom: 12, padding: '10px 12px', borderRadius: 8, fontSize: 12, lineHeight: 1.6, background: isCorrect ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${isCorrect ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, color: isCorrect ? '#2d9b4e' : '#dc3545' }}>
            {feedback}
          </div>
        ) : null}

        {!isChecked ? (
          <button
            type="button"
            onClick={handleVerify}
            disabled={!canVerify()}
            style={{ width: '100%', background: canVerify() ? '#6c63ff' : '#e9ecef', color: canVerify() ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: canVerify() ? 'pointer' : 'not-allowed' }}
          >
            Verificar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextItem}
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {currentItem >= totalItems - 1 ? 'Siguiente ronda →' : 'Siguiente →'}
          </button>
        )}
      </article>
    );
  }

  function renderFinalComplete() {
    return (
      <article style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 48 }}>🏆</p>
        <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>¡Producción completada!</h3>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6c757d', lineHeight: 1.7 }}>
          Construiste frases en coreano desde cero. Eso ya es hablar coreano.
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 16, color: '#6c63ff', fontWeight: 600 }}>{`${totalCorrect} de ${totalAttempts} correctas`}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', marginBottom: 20 }}>
          {FINAL_RECAP.map((row) => (
            <div key={`${row.kr}-${row.es}`} style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div>
                <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, color: '#1a1a2e' }}>{row.kr}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6c757d' }}>{row.es}</p>
              </div>
              <button type="button" onClick={() => playAudio(row.audio, 1)} style={{ border: 'none', background: 'transparent', color: '#6c63ff', fontSize: 14, cursor: 'pointer' }}>▶</button>
            </div>
          ))}
        </div>

        <p style={{ margin: '8px 0 0', fontSize: 11, color: '#6c63ff' }}>
          Pasar de reconocimiento a construcción controlada.
        </p>
      </article>
    );
  }

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
        SECCIÓN 8 DE 11
      </p>
      <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Producción guiada</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6c757d', lineHeight: 1.7 }}>
        Ahora vas a construir frases usando bloques de frase. No estás inventando desde cero: estás ensamblando piezas que ya viste.
      </p>

      {!isFinalComplete ? renderRoundIndicator() : null}

      {isFinalComplete ? (
        renderFinalComplete()
      ) : showRoundSummary ? (
        renderRoundSummary()
      ) : (
        <div key={`round-${currentRound}-item-${currentItem}`} style={{ animation: 'fadeIn 0.3s ease' }}>
          {renderProgress()}
          {renderRoundContent()}
        </div>
      )}
    </section>
  );
}
