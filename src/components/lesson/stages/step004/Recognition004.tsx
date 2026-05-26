'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface VocabEntry {
  id: string; hangul: string; romanization: string; translation: string;
  isNew: boolean; distractors_es: string[]; distractors_kr: string[];
}
interface Props { onComplete?: () => void }

const VOCAB: VocabEntry[] = [
  // ── Recicladas ──────────────────────────────────────────────────────────────
  { id:'R1', hangul:'어서 오세요', romanization:'eo-seo o-se-yo', translation:'Bienvenido/a', isNew:false,
    distractors_es:['Hasta luego','Gracias','¿Qué es esto?'], distractors_kr:['잘 가요','감사합니다','이거 뭐예요?'] },
  { id:'R2', hangul:'주세요', romanization:'ju-se-yo', translation:'Por favor deme / Deme', isNew:false,
    distractors_es:['Gracias','¿Dónde está?','Está delicioso'], distractors_kr:['감사합니다','어디예요?','맛있어요'] },
  { id:'R3', hangul:'감사합니다', romanization:'gam-sa-ham-ni-da', translation:'Gracias (formal)', isNew:false,
    distractors_es:['Hola','¿Qué es esto?','Está delicioso'], distractors_kr:['안녕하세요','뭐예요?','맛있어요'] },
  // ── Nuevas step004 ───────────────────────────────────────────────────────────
  { id:'N1', hangul:'이거 뭐예요?', romanization:'i-geo mweo-ye-yo?', translation:'¿Qué es esto?', isNew:true,
    distractors_es:['¿Cuánto es esto?','Esto es hodduk','¿Está delicioso?'], distractors_kr:['이거 얼마예요?','그거는 호떡이에요','맛있어요?'] },
  { id:'N2', hangul:'그거는 호떡이에요', romanization:'geu-geo-neun ho-tteok-i-e-yo', translation:'Eso es hodduk', isNew:true,
    distractors_es:['¿Qué es eso?','El hodduk está delicioso','Un hodduk, por favor'], distractors_kr:['그거는 뭐예요?','호떡 맛있어요','호떡 주세요'] },
  { id:'N3', hangul:'맛있어요', romanization:'ma-si-sseo-yo', translation:'¡Está delicioso!', isNew:true,
    distractors_es:['Está caliente','No tiene sabor','Un momento'], distractors_kr:['뜨거워요','맛없어요','잠깐만요'] },
  { id:'N4', hangul:'맛없어요', romanization:'ma-deop-sseo-yo', translation:'No está rico / no tiene sabor', isNew:true,
    distractors_es:['¡Está delicioso!','Está caliente','Enseguida'], distractors_kr:['맛있어요','뜨거워요','금방'] },
  { id:'N5', hangul:'하나', romanization:'ha-na', translation:'uno (número nativo)', isNew:true,
    distractors_es:['dos','uno (sino-coreano)','cinco'], distractors_kr:['둘','일','다섯'] },
  { id:'N6', hangul:'한 잔', romanization:'han jan', translation:'una taza / un vaso', isNew:true,
    distractors_es:['dos tazas','un objeto','una persona'], distractors_kr:['두 잔','한 개','한 명'] },
  { id:'N7', hangul:'한 개', romanization:'han gae', translation:'uno (objeto genérico)', isNew:true,
    distractors_es:['una taza','dos objetos','una persona'], distractors_kr:['한 잔','두 개','한 명'] },
  { id:'N8', hangul:'-도', romanization:'-do', translation:'también (partícula)', isNew:true,
    distractors_es:['solo / únicamente','¿también?','y además (conjunción)'], distractors_kr:['만','도요?','그리고'] },
  { id:'N9', hangul:'금방 준비해 드릴게요', romanization:'geum-bang jun-bi-hae deu-ril-ge-yo', translation:'Enseguida lo preparo', isNew:false,
    distractors_es:['Un momento, por favor','¿Le tomo el pedido?','Está listo'], distractors_kr:['잠시만 기다려 주세요','주문하시겠어요?','준비됐어요'] },
];

type Mode = 'kr→es' | 'es→kr';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Recognition004({ onComplete }: Props) {
  const [qIndex,  setQIndex]  = useState(0);
  const [mode,    setMode]    = useState<Mode>('kr→es');
  const [picked,  setPicked]  = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done,    setDone]    = useState(false);
  const [streak,  setStreak]  = useState(0);

  const sequence = useMemo(() => shuffle(VOCAB), []);
  const item = sequence[qIndex];

  const options = useMemo(() => {
    if (!item) return [];
    const wrongs = mode === 'kr→es' ? item.distractors_es : item.distractors_kr;
    const correct = mode === 'kr→es' ? item.translation : item.hangul;
    return shuffle([correct, ...wrongs.slice(0, 3)]);
  }, [item, mode]);

  const correctAnswer = mode === 'kr→es' ? item?.translation : item?.hangul;

  function handlePick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === correctAnswer) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      playAudio(item.hangul);
    } else {
      setStreak(0);
    }
  }

  function next() {
    const nextIdx = qIndex + 1;
    if (nextIdx >= sequence.length) { setDone(true); return; }
    setPicked(null);
    setQIndex(nextIdx);
    setMode(nextIdx % 3 === 0 ? 'es→kr' : 'kr→es');
  }

  if (done) return (
    <section style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 03 DE 11 · Reconocimiento</p>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{correct >= 9 ? '🏆' : correct >= 6 ? '⭐' : '📚'}</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{correct}/{sequence.length} correctas</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>{correct >= 9 ? '¡Excelente dominio del vocabulario!' : 'Sigue practicando — cada repaso cuenta.'}</p>
      <button onClick={() => onComplete?.()} style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
        Continuar →
      </button>
    </section>
  );

  if (!item) return null;

  return (
    <section style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 03 DE 11 · Reconocimiento</p>
        {streak >= 3 && <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>🔥 ×{streak}</span>}
      </div>

      <div style={{ height: 6, borderRadius: 3, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${(qIndex / sequence.length) * 100}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.3s' }} />
      </div>

      <div style={{ background: 'var(--bg-2,#f5f5f7)', borderRadius: 14, padding: '24px', marginBottom: 20, textAlign: 'center' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
          {mode === 'kr→es' ? '🇰🇷 → 🌎 ¿Qué significa?' : '🌎 → 🇰🇷 ¿Cómo se dice en coreano?'}
        </span>
        {!item.isNew && <span style={{ fontSize: 10, color: '#2d9b4e', fontWeight: 700 }}>♻️ Ya la conoces</span>}
        <p style={{ margin: '8px 0 0', fontSize: mode === 'kr→es' ? 36 : 20, fontWeight: 700, fontFamily: mode === 'kr→es' ? "'Noto Sans KR', sans-serif" : 'inherit' }}>
          {mode === 'kr→es' ? item.hangul : item.translation}
        </p>
        {mode === 'kr→es' && <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{item.romanization}</p>}
        <button onClick={() => playAudio(item.hangul)} style={{ marginTop: 10, background: 'none', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 14px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>🔊</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(opt => {
          const isCorrect = opt === correctAnswer;
          const isPicked  = picked === opt;
          const bg = !picked ? 'var(--bg)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg)';
          const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
          return (
            <button key={opt} onClick={() => handlePick(opt)}
              style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 14, cursor: picked ? 'default' : 'pointer', fontFamily: mode === 'es→kr' ? "'Noto Sans KR', sans-serif" : 'inherit', transition: 'all 0.2s' }}>
              {picked && isCorrect ? '✅ ' : picked && isPicked && !isCorrect ? '❌ ' : ''}{opt}
            </button>
          );
        })}
      </div>

      {picked && (
        <button onClick={next} style={{ marginTop: 16, width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {qIndex + 1 < sequence.length ? 'Siguiente →' : 'Ver resultado →'}
        </button>
      )}
    </section>
  );
}
