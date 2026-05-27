'use client';

import { useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface VocabEntry {
  id: string; hangul: string; romanization: string; translation: string;
  isNew: boolean; distractors_es: string[]; distractors_kr: string[];
}
interface Props { onComplete?: () => void }

const VOCAB: VocabEntry[] = [
  { id:'R1', hangul:'여기 있습니다', romanization:'yeo-gi it-seum-ni-da', translation:'Aquí tiene', isNew:false,
    distractors_es:['Gracias (formal)','Disculpe la molestia','Un momento'], distractors_kr:['감사합니다','실례합니다','잠시만요'] },
  { id:'R2', hangul:'감사합니다', romanization:'gam-sa-ham-ni-da', translation:'Gracias (formal)', isNew:false,
    distractors_es:['Aquí tiene','Disculpe','¿Cuánto es?'], distractors_kr:['여기 있습니다','실례합니다','얼마예요?'] },
  { id:'R3', hangul:'얼마예요?', romanization:'eol-ma-ye-yo?', translation:'¿Cuánto es?', isNew:false,
    distractors_es:['¿Qué es esto?','¿Hay un baño?','¿Cuántos?'], distractors_kr:['이거 뭐예요?','화장실 있어요?','몇 개예요?'] },
  { id:'N1', hangul:'맛있게 드세요', romanization:'ma-sit-ge deu-se-yo', translation:'¡Que lo disfrutes! (antes de comer)', isNew:true,
    distractors_es:['Gracias por la comida','Está delicioso','Disfruta tu bebida'], distractors_kr:['잘 먹었습니다','맛있어요','잘 마셨어요'] },
  { id:'N2', hangul:'잘 먹었습니다', romanization:'jal meo-geot-seum-ni-da', translation:'Gracias por la comida (después de comer)', isNew:true,
    distractors_es:['¡Que lo disfrutes!','Comí demasiado','El café estuvo rico'], distractors_kr:['맛있게 드세요','너무 먹었어요','커피 맛있었어요'] },
  { id:'N3', hangul:'잠시만요', romanization:'jam-si-man-yo', translation:'Un momento (formal)', isNew:true,
    distractors_es:['Enseguida','¿Puedo ayudarle?','Por favor'], distractors_kr:['금방','도와드릴까요?','주세요'] },
  { id:'N4', hangul:'칠천 원이에요', romanization:'chil-cheon wo-ni-e-yo', translation:'Son 7.000 wones', isNew:true,
    distractors_es:['Son 7 wones','Son 700 wones','Son 70.000 wones'], distractors_kr:['칠 원이에요','칠백 원이에요','칠만 원이에요'] },
  { id:'N5', hangul:'실례합니다', romanization:'sil-lye-ham-ni-da', translation:'Disculpe la molestia', isNew:true,
    distractors_es:['Gracias','Un momento','¿Puedo pasar?'], distractors_kr:['감사합니다','잠시만요','지나가도 돼요?'] },
  { id:'N6', hangul:'잘 모르겠어요', romanization:'jal mo-reu-get-sseo-yo', translation:'No estoy seguro / no lo sé bien', isNew:true,
    distractors_es:['No quiero','No puedo','No hay'], distractors_kr:['싫어요','못해요','없어요'] },
  { id:'N7', hangul:'화장실 있어요?', romanization:'hwa-jang-sil i-sseo-yo?', translation:'¿Hay un baño?', isNew:true,
    distractors_es:['¿Dónde está el baño?','¿Necesita ir al baño?','El baño está ocupado'], distractors_kr:['화장실이 어디예요?','화장실 필요해요?','화장실 바빠요'] },
  { id:'N8', hangul:'오른쪽', romanization:'o-reun-jjok', translation:'derecha (dirección)', isNew:true,
    distractors_es:['izquierda','adentro','enfrente'], distractors_kr:['왼쪽','안쪽','앞쪽'] },
  { id:'N9', hangul:'안쪽 오른쪽에 있어요', romanization:'an-jjok o-reun-jjo-ge i-sseo-yo', translation:'Está al fondo a la derecha', isNew:true,
    distractors_es:['Está a la izquierda','Al frente a la derecha','Afuera a la derecha'], distractors_kr:['왼쪽에 있어요','앞쪽 오른쪽에 있어요','밖에 오른쪽에 있어요'] },
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

export default function Recognition005({ onComplete }: Props) {
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
    const ans = mode === 'kr→es' ? item.translation : item.hangul;
    return shuffle([ans, ...wrongs.slice(0, 3)]);
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
      <div style={{ fontSize: 48, marginBottom: 8 }}>{correct >= 10 ? '🏆' : correct >= 7 ? '⭐' : '📚'}</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{correct}/{sequence.length} correctas</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>
        {correct >= 10 ? '¡Excelente dominio del vocabulario!' : 'Sigue practicando — cada repaso consolida la memoria.'}
      </p>
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
        {!item.isNew && <span style={{ fontSize: 10, color: '#2d9b4e', fontWeight: 700, display: 'block', marginBottom: 6 }}>♻️ Ya la conoces</span>}
        <p style={{ margin: '8px 0 0', fontSize: mode === 'kr→es' ? 30 : 18, fontWeight: 700, fontFamily: mode === 'kr→es' ? "'Noto Sans KR', sans-serif" : 'inherit', lineHeight: 1.3 }}>
          {mode === 'kr→es' ? item.hangul : item.translation}
        </p>
        {mode === 'kr→es' && <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{item.romanization}</p>}
        <button onClick={() => playAudio(item.hangul)} style={{ marginTop: 10, background: 'none', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 14px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>🔊</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(opt => {
          const isCorrect = opt === correctAnswer;
          const isPicked  = picked === opt;
          const bg     = !picked ? 'var(--bg)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg)';
          const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
          return (
            <button key={opt} onClick={() => handlePick(opt)}
              style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 13, cursor: picked ? 'default' : 'pointer', fontFamily: mode === 'es→kr' ? "'Noto Sans KR', sans-serif" : 'inherit', transition: 'all 0.2s' }}>
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
