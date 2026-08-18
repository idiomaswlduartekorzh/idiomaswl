'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { id: string; ja: string; romaji: string; es: string; }
interface VocabSet { id: string; name: string; nameJa: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'shigoto', name: 'Trabajo y carrera', nameJa: '仕事とキャリア (Shigoto to kyaria)', icon: '💼',
    words: [
      { id: 's1', ja: '交渉する', romaji: 'kōshō suru', es: 'negociar' },
      { id: 's2', ja: '締め切り', romaji: 'shimekiri', es: 'fecha límite / plazo' },
      { id: 's3', ja: '同僚', romaji: 'dōryō', es: 'colega / compañero de trabajo' },
      { id: 's4', ja: '昇進', romaji: 'shōshin', es: 'ascenso / promoción' },
      { id: 's5', ja: '辞職する', romaji: 'jishoku suru', es: 'renunciar / dimitir' },
      { id: 's6', ja: '契約', romaji: 'keiyaku', es: 'contrato' },
      { id: 's7', ja: '採用する', romaji: 'saiyō suru', es: 'contratar / reclutar' },
      { id: 's8', ja: '給料', romaji: 'kyūryō', es: 'salario / sueldo' },
      { id: 's9', ja: '実績', romaji: 'jisseki', es: 'logros / resultados' },
      { id: 's10', ja: '部署', romaji: 'busho', es: 'departamento / sección' },
    ],
  },
  {
    id: 'tech', name: 'Tecnología', nameJa: 'テクノロジー (Tekunorojī)', icon: '💻',
    words: [
      { id: 't1', ja: 'ソフトウェア', romaji: 'sofutowea', es: 'software' },
      { id: 't2', ja: 'データベース', romaji: 'dētabēsu', es: 'base de datos' },
      { id: 't3', ja: 'ダウンロードする', romaji: 'daunrōdo suru', es: 'descargar' },
      { id: 't4', ja: '暗号化する', romaji: 'angōka suru', es: 'encriptar / cifrar' },
      { id: 't5', ja: 'インターフェース', romaji: 'intāfēsu', es: 'interfaz' },
      { id: 't6', ja: 'マルウェア', romaji: 'maruuea', es: 'malware / software malicioso' },
      { id: 't7', ja: 'アルゴリズム', romaji: 'arugorizumu', es: 'algoritmo' },
      { id: 't8', ja: '帯域幅', romaji: 'taiiki-haba', es: 'ancho de banda' },
      { id: 't9', ja: '無線', romaji: 'musen', es: 'inalámbrico / sin cables' },
      { id: 't10', ja: 'ネットワーク', romaji: 'nettowāku', es: 'red (informática)' },
    ],
  },
  {
    id: 'kenko', name: 'Salud', nameJa: '健康 (Kenkō)', icon: '🏥',
    words: [
      { id: 'k1', ja: '診断', romaji: 'shindan', es: 'diagnóstico' },
      { id: 'k2', ja: '症状', romaji: 'shōjō', es: 'síntoma' },
      { id: 'k3', ja: '処方箋', romaji: 'shohōsen', es: 'receta médica' },
      { id: 'k4', ja: '手術', romaji: 'shujutsu', es: 'operación / cirugía' },
      { id: 'k5', ja: '慢性的な', romaji: 'mansei-teki na', es: 'crónico/a' },
      { id: 'k6', ja: 'アレルギーの', romaji: 'arerugī no', es: 'alérgico/a' },
      { id: 'k7', ja: '予防接種', romaji: 'yobō-sesshu', es: 'vacunación / inmunización' },
      { id: 'k8', ja: '療法', romaji: 'ryōhō', es: 'terapia / tratamiento' },
      { id: 'k9', ja: '免疫力', romaji: "men'eki-ryoku", es: 'inmunidad / defensas' },
      { id: 'k10', ja: '回復', romaji: 'kaifuku', es: 'recuperación' },
    ],
  },
  {
    id: 'kankyo', name: 'Medio ambiente', nameJa: '環境 (Kankyō)', icon: '🌿',
    words: [
      { id: 'ka1', ja: '汚染', romaji: 'osen', es: 'contaminación' },
      { id: 'ka2', ja: '再生可能な', romaji: 'saisei-kanō na', es: 'renovable' },
      { id: 'ka3', ja: '森林伐採', romaji: 'shinrin-bassai', es: 'deforestación' },
      { id: 'ka4', ja: '排出', romaji: 'haishutsu', es: 'emisión / descarga' },
      { id: 'ka5', ja: '生物多様性', romaji: 'seibutsu-tayōsei', es: 'biodiversidad' },
      { id: 'ka6', ja: '持続可能な', romaji: 'jizoku-kanō na', es: 'sostenible' },
      { id: 'ka7', ja: '生息地', romaji: 'seisokuchi', es: 'hábitat' },
      { id: 'ka8', ja: '干ばつ', romaji: 'kanbatsu', es: 'sequía' },
      { id: 'ka9', ja: '自然保護', romaji: 'shizen-hogo', es: 'conservación natural' },
      { id: 'ka10', ja: 'リサイクルする', romaji: 'risaikuru suru', es: 'reciclar' },
    ],
  },
  {
    id: 'ryoko', name: 'Viajes y cultura', nameJa: '旅行と文化 (Ryokō to bunka)', icon: '✈️',
    words: [
      { id: 'r1', ja: '旅程', romaji: 'ryotei', es: 'itinerario' },
      { id: 'r2', ja: '宿泊施設', romaji: 'shukuhaku-shisetsu', es: 'alojamiento' },
      { id: 'r3', ja: '通貨', romaji: 'tsūka', es: 'moneda / divisa' },
      { id: 'r4', ja: '文化遺産', romaji: 'bunka-isan', es: 'patrimonio cultural' },
      { id: 'r5', ja: '慣習', romaji: 'kanshū', es: 'costumbre / tradición' },
      { id: 'r6', ja: '国境', romaji: 'kokkyō', es: 'frontera' },
      { id: 'r7', ja: 'お土産', romaji: 'omiyage', es: 'recuerdo / souvenir' },
      { id: 'r8', ja: '探検', romaji: 'tanken', es: 'exploración / expedición' },
      { id: 'r9', ja: '観光客', romaji: 'kankō-kyaku', es: 'turista' },
      { id: 'r10', ja: '名所', romaji: 'meisho', es: 'lugar famoso / atracción' },
    ],
  },
  {
    id: 'shakai', name: 'Problemas sociales', nameJa: '社会問題 (Shakai-mondai)', icon: '🌍',
    words: [
      { id: 'sh1', ja: '貧困', romaji: 'hinkon', es: 'pobreza' },
      { id: 'sh2', ja: '不平等', romaji: 'fubyōdō', es: 'desigualdad' },
      { id: 'sh3', ja: '差別', romaji: 'sabetsu', es: 'discriminación' },
      { id: 'sh4', ja: '難民', romaji: 'nanmin', es: 'refugiado/a' },
      { id: 'sh5', ja: '慈善', romaji: 'jizen', es: 'caridad / beneficencia' },
      { id: 'sh6', ja: 'ボランティア', romaji: 'borantia', es: 'voluntario/a' },
      { id: 'sh7', ja: 'キャンペーン', romaji: 'kyanpēn', es: 'campaña' },
      { id: 'sh8', ja: '意識', romaji: 'ishiki', es: 'conciencia / concienciación' },
      { id: 'sh9', ja: '抗議', romaji: 'kōgi', es: 'protesta / manifestación' },
      { id: 'sh10', ja: 'コミュニティ', romaji: 'komyuniti', es: 'comunidad' },
    ],
  },
  {
    id: 'kyoiku', name: 'Educación', nameJa: '教育 (Kyōiku)', icon: '🎓',
    words: [
      { id: 'e1', ja: 'カリキュラム', romaji: 'karikyuramu', es: 'currículo / plan de estudios' },
      { id: 'e2', ja: '奨学金', romaji: 'shōgakukin', es: 'beca' },
      { id: 'e3', ja: '授業料', romaji: 'jugyōryō', es: 'matrícula / cuota académica' },
      { id: 'e4', ja: '論文', romaji: 'ronbun', es: 'tesis / ensayo académico' },
      { id: 'e5', ja: '研究', romaji: 'kenkyū', es: 'investigación' },
      { id: 'e6', ja: '卒業生', romaji: 'sotsugyōsei', es: 'graduado/a / egresado/a' },
      { id: 'e7', ja: '学術的な', romaji: 'gakujutsu-teki na', es: 'académico/a' },
      { id: 'e8', ja: '学科', romaji: 'gakka', es: 'asignatura / carrera / departamento' },
      { id: 'e9', ja: '講義', romaji: 'kōgi', es: 'conferencia / clase magistral' },
      { id: 'e10', ja: '学期', romaji: 'gakki', es: 'semestre / periodo académico' },
    ],
  },
  {
    id: 'kanjo', name: 'Emociones', nameJa: '感情 (Kanjō)', icon: '💭',
    words: [
      { id: 'em1', ja: '不安な', romaji: 'fuan na', es: 'ansioso/a / inquieto/a' },
      { id: 'em2', ja: '嫉妬深い', romaji: 'shitto-bukai', es: 'celoso/a / envidioso/a' },
      { id: 'em3', ja: '感謝している', romaji: 'kansha shite iru', es: 'agradecido/a' },
      { id: 'em4', ja: '挫折した', romaji: 'zasetsu shita', es: 'frustrado/a / derrotado/a' },
      { id: 'em5', ja: '自信のある', romaji: 'jishin no aru', es: 'seguro/a de sí mismo/a' },
      { id: 'em6', ja: '共感できる', romaji: 'kyōkan dekiru', es: 'empático/a' },
      { id: 'em7', ja: '忠実な', romaji: 'chūjitsu na', es: 'leal / fiel' },
      { id: 'em8', ja: '恨みを持つ', romaji: 'urami o motsu', es: 'resentido/a / rencoroso/a' },
      { id: 'em9', ja: '愛情深い', romaji: 'aijō-bukai', es: 'afectuoso/a / cariñoso/a' },
      { id: 'em10', ja: '楽観的な', romaji: 'rakkan-teki na', es: 'optimista' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'serif' }}>{w.ja}</div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.romaji}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver la traducción</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1.2rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.ja}</div>
            <div style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: COLOR, marginBottom: '0.25rem' }}>{w.romaji}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.id !== w.id)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'serif', marginBottom: '0.3rem' }}>{w.ja}</div>
        <div style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}`, display: 'inline-block' }}>{w.romaji}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
          {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
        </button>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.romaji.toLowerCase() || input.trim() === w.ja;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escribe el romaji (o kanji/kana) de la palabra:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="Romaji o japonés..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Correcto!' : `✗ La respuesta es: ${w.ja} (${w.romaji})`}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioJaponesB1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameJa}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Opción múltiple' : '✏️ Escribir'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabulario B1</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameJa}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} palabras · Elige un modo de práctica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Ve cada palabra con kanji y romaji. Marca las que ya conoces.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Opción múltiple', desc: 'Elige la traducción correcta de 4 opciones.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escribir el romaji', desc: 'Escribe el romaji (o kanji) a partir de la traducción al español.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Vocabulario ({set.words.length} palabras)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{w.ja}</div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.romaji}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 語彙</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />語彙 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temas B1 — 80 palabras con kanji/kana, romaji y español. Flashcards, opción múltiple y escritura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameJa}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} palabras</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Empezar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
