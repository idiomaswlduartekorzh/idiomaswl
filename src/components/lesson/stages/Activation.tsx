'use client';

import { useEffect, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { Check, Pause, Play, Volume2, X } from 'lucide-react';
import { KR_AUDIO, KR_IMG, KR_PODCAST } from '@/lib/storage';

interface VocabItem {
  id: string; at: number; hangul: string; romanization: string;
  translation: string; color: string; img: string;
}
interface ConceptItem {
  id: string; at: number; icon: string; color: string; title: string;
  body: string; example: { es: string; kr: string };
}
interface Chip { word: string; idx: number; kr?: boolean; trap?: boolean; sub?: string; }
interface ExerciseItem {
  id: string; at: number; type: 'drag' | 'choice'; title: string; question: string;
  source?: string; speak?: string; hint?: string;
  chips?: Chip[]; correctOrder?: number[];
  choices?: { label: string; correct: boolean; note?: string; kr?: boolean }[];
  feedback: { ok: string; err: string };
}

const VOCAB_TIMELINE: VocabItem[] = [
  { id: 'V1', at: 122, hangul: '학교', romanization: 'hak-gyo', translation: 'escuela', color: 'var(--wl-on-panel-link, #6c63ff)', img: KR_IMG.school },
  { id: 'V2', at: 215, hangul: '저는', romanization: 'jeo-neun', translation: 'yo (formal)', color: 'var(--wl-on-panel-alert, #ff6b6b)', img: KR_IMG.iFormal },
  { id: 'V3', at: 217, hangul: '학교에', romanization: 'hak-gyo-e', translation: 'escuela → hacia', color: '#fbbf24', img: KR_IMG.going },
  { id: 'V4', at: 222, hangul: '가요', romanization: 'ga-yo', translation: 'voy / vas / va', color: '#34d399', img: KR_IMG.going },
  { id: 'V5', at: 245, hangul: '대학교', romanization: 'dae-hak-gyo', translation: 'universidad', color: '#60a5fa', img: KR_IMG.university },
  { id: 'V6', at: 255, hangul: '대학교에', romanization: 'dae-hak-gyo-e', translation: 'universidad → hacia', color: 'var(--wl-on-panel-link, #a78bfa)', img: KR_IMG.university },
];

const CONCEPT_TIMELINE: ConceptItem[] = [
  { id: 'C1', at: 60, icon: '📌', color: 'var(--wl-on-panel-link, #6c63ff)', title: 'El verbo siempre al final', body: 'En coreano el verbo cierra la oración. Siempre. Sin excepciones. No sabes qué está pasando hasta que llega la última palabra.', example: { es: 'Yo a la escuela voy.', kr: '저는 학교에 가요.' } },
  { id: 'C2', at: 111, icon: '✂️', color: 'var(--wl-on-panel-alert, #ff6b6b)', title: 'Los artículos desaparecen', body: 'En coreano no existe "la", "el", "una" ni "un". El sustantivo va solo. El contexto hace el trabajo.', example: { es: 'la escuela → escuela', kr: '학교' } },
  { id: 'C4', at: 152, icon: '🧠', color: '#fbbf24', title: 'Idioma de alto contexto', body: 'Si la situación ya indica de qué escuela se habla, agregar artículos es redundante. El coreano confía en que el oyente está prestando atención.', example: { es: '¿Cuál escuela? — El contexto lo sabe.', kr: '학교 (sin artículo)' } },
  { id: 'C3', at: 176, icon: '🔗', color: '#34d399', title: 'La partícula 에 — el rastreador GPS', body: 'En español la preposición "a" va ANTES. En coreano la partícula 에 va DESPUÉS, pegada al sustantivo. Es como un pequeño rastreador de dirección.', example: { es: 'a la escuela', kr: '학교에 (escuela-hacia)' } },
];

const EXERCISE_TIMELINE: ExerciseItem[] = [
  { id: 'E1', at: 44, type: 'drag', title: 'Reordenar — orden SOV', question: 'Arrastra las palabras para convertir esta oración al orden coreano (verbo al final):', source: '"Yo voy a la escuela."', chips: [{ word: 'Yo', idx: 0 }, { word: 'a la escuela', idx: 1 }, { word: 'voy', idx: 2 }], correctOrder: [0, 1, 2], feedback: { ok: '✅ ¡Exacto! "Yo · a la escuela · voy" — el verbo queda al final. Así funciona el coreano.', err: '❌ El orden correcto es: Yo → a la escuela → voy. El verbo siempre cierra.' } },
  { id: 'E2', at: 105, type: 'choice', title: 'Sin artículos', question: '¿Cuál versión se parece más a cómo el coreano diría "voy a la escuela"?', choices: [{ label: 'Voy a la escuela', correct: false }, { label: 'Voy a una escuela', correct: false }, { label: 'Voy a escuela', correct: true, note: 'sin artículo' }, { label: 'Voy escuela', correct: false, note: 'sin artículo ni preposición' }], feedback: { ok: '✅ ¡Correcto! Sin "la", sin "el". Solo "escuela". En coreano: 학교.', err: '❌ En coreano no hay artículos. La más cercana es "Voy a escuela".' } },
  { id: 'E3', at: 200, type: 'choice', title: 'La partícula 에', question: 'La partícula 에 significa "hacia / a" y va PEGADA después del sustantivo. ¿Cómo sería "escuela-hacia"?', choices: [{ label: '에 학교', note: '에 + escuela', correct: false, kr: true }, { label: '학교에', note: 'escuela + 에', correct: true, kr: true }, { label: '학교 에', note: 'con espacio', correct: false, kr: true }, { label: '가요에', note: 'verbo + 에', correct: false, kr: true }], feedback: { ok: '✅ ¡Perfecto! 학교에 — pegada, sin espacio, siempre después del sustantivo.', err: '❌ La partícula 에 va siempre DESPUÉS y PEGADA. La correcta es 학교에.' } },
  { id: 'E4', at: 228, type: 'drag', title: 'Escucha y ordena', question: 'Ordena las partes de la frase completa en coreano:', source: '저는 학교에 가요', speak: '학교에 가요', chips: [{ word: '학교에', sub: 'escuela-hacia', idx: 1, kr: true }, { word: '저는', sub: 'yo', idx: 0, kr: true }, { word: '가요', sub: 'voy', idx: 2, kr: true }], correctOrder: [0, 1, 2], feedback: { ok: '✅ ¡Increíble! 저는 학교에 가요 — Yo · escuela-hacia · voy. Ya lees coreano.', err: '❌ El orden es: 저는 (yo) → 학교에 (escuela-hacia) → 가요 (voy).' } },
  { id: 'E5', at: 265, type: 'drag', title: 'Construye la frase', question: 'Construye en coreano: "Tú vas a la universidad."', hint: '너는 = tú · 대학교에 = universidad-hacia · 가요 = vas', speak: '대학교에 가요', chips: [{ word: '가요', sub: 'vas', idx: 2, kr: true }, { word: '대학교에', sub: 'universidad-hacia', idx: 1, kr: true }, { word: '너는', sub: 'tú', idx: 0, kr: true }, { word: '에 대학교', sub: '⚠ trampa', idx: 99, kr: true, trap: true }], correctOrder: [0, 1, 2], feedback: { ok: '✅ ¡Lo lograste! 너는 대학교에 가요 — Tu cerebro ya piensa en coreano.', err: '❌ Recuerda: 너는 → 대학교에 → 가요. La partícula 에 siempre va después del sustantivo.' } },
];

const SEGMENT_MAP = [
  { label: 'Gancho inicial', at: 0, icon: '🎯' },
  { label: 'Verbo al final', at: 44, icon: '📌' },
  { label: 'Sin artículos', at: 105, icon: '✂️' },
  { label: 'Alto contexto', at: 152, icon: '🧠' },
  { label: 'Partícula 에', at: 176, icon: '🔗' },
  { label: 'Frase completa', at: 215, icon: '🇰🇷' },
  { label: 'Universidad', at: 245, icon: '🎓' },
  { label: 'Cierre', at: 265, icon: '✅' },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '00:00';
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function speak(text: string, rate = 1) {
  const src = KR_AUDIO[text as keyof typeof KR_AUDIO];
  if (src) { const a = new Audio(src); a.playbackRate = rate; a.play().catch(() => tts(text, rate)); return; }
  tts(text, rate);
}
function tts(text: string, rate = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'ko-KR'; u.rate = rate;
  window.speechSynthesis.speak(u);
}

function VocabCard({ item, isNew, onSpeak }: { item: VocabItem; isNew: boolean; onSpeak: (t: string) => void }) {
  return (
    <article style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ height: 110, background: 'var(--wl-panel-raised, #f1f3f5)', position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 12, top: 6, fontSize: 52, fontWeight: 700, opacity: 0.06, color: item.color, zIndex: 1 }}>{item.hangul}</span>
        <img src={item.img} alt={item.translation} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        {isNew && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 100, color: '#fff', background: item.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>New</span>}
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: item.color }}>{item.hangul}</p>
        <p style={{ margin: '2px 0 0', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{item.romanization}</p>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)' }}>{item.translation}</p>
        <button type="button" onClick={() => onSpeak(item.hangul)} style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: `${item.color}18`, border: `1px solid ${item.color}35`, borderRadius: 100, padding: '4px 10px', color: item.color, fontSize: 11, cursor: 'pointer' }}>
          <Volume2 size={12} /> Escuchar
        </button>
      </div>
    </article>
  );
}

function ConceptCard({ item }: { item: ConceptItem }) {
  return (
    <article style={{ background: 'var(--wl-panel-raised, #fff)', borderLeft: `3px solid ${item.color}`, border: '1px solid #e9ecef', borderRadius: '0 12px 12px 0', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        <h4 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: item.color }}>{item.title}</h4>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.65 }}>{item.body}</p>
      {item.example && (
        <div style={{ background: `${item.color}10`, borderRadius: 8, padding: '8px 10px' }}>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{item.example.es}</p>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: item.color }}>{item.example.kr}</p>
        </div>
      )}
    </article>
  );
}

function DragExercise({ item, onSpeak, onComplete, isCompleted }: { item: ExerciseItem; onSpeak: (t: string) => void; onComplete: (id: string) => void; isCompleted: boolean }) {
  const [placed, setPlaced] = useState<Chip[]>([]);
  const [bank, setBank] = useState<Chip[]>(item.chips ?? []);
  const [feedback, setFeedback] = useState('');

  useEffect(() => { setPlaced([]); setBank(item.chips ?? []); setFeedback(''); }, [item.id]);

  function add(chip: Chip) { if (isCompleted || placed.length >= (item.correctOrder?.length ?? 0)) return; setBank(p => p.filter(c => c.idx !== chip.idx)); setPlaced(p => [...p, chip]); setFeedback(''); }
  function remove(chip: Chip) { if (isCompleted) return; setPlaced(p => p.filter(c => c.idx !== chip.idx)); setBank(p => [...p, chip].sort((a, b) => a.idx - b.idx)); setFeedback(''); }
  function clear() { if (isCompleted) return; setPlaced([]); setBank(item.chips ?? []); setFeedback(''); }
  function validate() {
    const order = placed.map(c => c.idx);
    const ok = order.length === item.correctOrder?.length && order.every((v, i) => v === item.correctOrder![i]);
    setFeedback(ok ? item.feedback.ok : item.feedback.err);
    if (ok) onComplete(item.id);
  }

  return (
    <>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.6 }}>{item.question}</p>
      {item.source && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--wl-on-panel-link, #6c63ff)', marginBottom: 8 }}>{item.source}</span>}
      {item.hint && <p style={{ margin: '0 0 12px', fontSize: 11, color: '#adb5bd' }}>{item.hint}</p>}
      {item.speak && (
        <button type="button" onClick={() => onSpeak(item.speak!)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '6px 14px', color: 'var(--wl-on-panel-link, #6c63ff)', fontSize: 12, cursor: 'pointer', marginBottom: 14 }}>
          <Volume2 size={14} /> Escuchar frase
        </button>
      )}
      <div style={{ minHeight: 48, background: 'var(--wl-panel-raised, #f8f9fa)', border: '2px dashed #e9ecef', borderRadius: 10, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        {placed.length === 0 ? <span style={{ fontSize: 12, color: '#adb5bd' }}>Arrastra aquí las palabras en orden</span> : placed.map(chip => (
          <button key={`placed-${chip.idx}`} type="button" onClick={() => remove(chip)} style={{ padding: '6px 12px', background: isCompleted ? 'rgba(45,155,78,0.08)' : 'rgba(108,99,255,0.08)', border: `1px solid ${isCompleted ? 'rgba(45,155,78,0.3)' : 'rgba(108,99,255,0.25)'}`, borderRadius: 8, fontSize: 13, cursor: isCompleted ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: isCompleted ? '#2d9b4e' : '#1a1a2e' }}>
            {chip.word}{!isCompleted && <X size={12} />}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {bank.map(chip => (
          <button key={`bank-${chip.idx}`} type="button" onClick={() => add(chip)} style={{ padding: '6px 12px', background: chip.trap ? 'rgba(220,53,69,0.03)' : chip.kr ? 'rgba(108,99,255,0.04)' : '#fff', border: `1px solid ${chip.trap ? 'rgba(220,53,69,0.2)' : chip.kr ? 'rgba(108,99,255,0.2)' : '#e9ecef'}`, borderRadius: 8, fontSize: chip.kr ? 15 : 13, cursor: 'pointer', color: chip.trap ? 'rgba(220,53,69,0.5)' : chip.kr ? '#6c63ff' : '#1a1a2e' }}>
            {chip.word}
          </button>
        ))}
      </div>
      {feedback && <div style={{ background: feedback === item.feedback.ok ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${feedback === item.feedback.ok ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: feedback === item.feedback.ok ? '#2d9b4e' : '#dc3545', lineHeight: 1.6, marginBottom: 10 }}>{feedback}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button type="button" onClick={validate} disabled={placed.length !== (item.correctOrder?.length ?? 0) || isCompleted} style={{ padding: '10px', background: placed.length !== (item.correctOrder?.length ?? 0) || isCompleted ? '#f1f3f5' : '#6c63ff', border: 'none', borderRadius: 10, color: placed.length !== (item.correctOrder?.length ?? 0) || isCompleted ? '#adb5bd' : '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Validar orden</button>
        <button type="button" onClick={clear} style={{ padding: '10px', background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 10, color: 'var(--wl-on-panel-soft, #6c757d)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Limpiar</button>
      </div>
      {isCompleted && <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 12, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}><Check size={14} /> Completado</p>}
    </>
  );
}

function segmentIndex(t: number) {
  let i = 0;
  for (let j = 0; j < SEGMENT_MAP.length; j++) { if (t >= SEGMENT_MAP[j].at) i = j; else break; }
  return i;
}

export default function Activation({ onComplete }: { onComplete?: () => void }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rate, setRate] = useState(1);
  const [audioStatus, setAudioStatus] = useState<'checking' | 'ready' | 'missing' | 'error'>('checking');
  const [visibleVocab, setVisibleVocab] = useState(new Set<string>());
  const [newVocab, setNewVocab] = useState(new Set<string>());
  const [visibleConcepts, setVisibleConcepts] = useState(new Set<string>());
  const [visibleExercises, setVisibleExercises] = useState(new Set<string>());
  const [completedExercises, setCompletedExercises] = useState(new Set<string>());
  const [choiceAnswers, setChoiceAnswers] = useState<Record<string, string>>({});
  const [choiceFeedback, setChoiceFeedback] = useState<Record<string, string>>({});
  const [newContentAlert, setNewContentAlert] = useState(false);

  const waveRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(new Set<string>());
  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;
    const ctrl = new AbortController();
    fetch(KR_PODCAST, { method: 'HEAD', signal: ctrl.signal, cache: 'no-store' })
      .then(r => { if (mounted) setAudioStatus(r.ok ? 'ready' : 'missing'); })
      .catch(() => { if (mounted) setAudioStatus('missing'); });
    return () => { mounted = false; ctrl.abort(); };
  }, []);

  const { wavesurfer, isPlaying, isReady } = useWavesurfer({
    container: waveRef,
    url: audioStatus === 'ready' ? KR_PODCAST : undefined,
    height: 88,
    waveColor: '#d2d8ee',
    progressColor: '#14215c',
    cursorColor: '#14215c',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    normalize: true,
    interact: true,
  });

  useEffect(() => {
    if (!wavesurfer) return;
    const unsubs = [
      wavesurfer.on('ready', (d: number) => { setDuration(d); setCurrentTime(0); wavesurfer.setPlaybackRate(rate); }),
      wavesurfer.on('timeupdate', (t: number) => setCurrentTime(t)),
      wavesurfer.on('audioprocess', (t: number) => setCurrentTime(t)),
      wavesurfer.on('seeking', (t: number) => setCurrentTime(t)),
      wavesurfer.on('error', () => setAudioStatus('error')),
      wavesurfer.on('finish', () => { if (onComplete) onComplete(); }),
    ];
    return () => unsubs.forEach(u => u());
  }, [wavesurfer, rate, onComplete]);

  useEffect(() => { if (wavesurfer) wavesurfer.setPlaybackRate(rate); }, [wavesurfer, rate]);

  useEffect(() => {
    const triggered = triggeredRef.current;
    const flash = (id: string) => {
      setNewVocab(prev => new Set([...prev, id]));
      setVisibleVocab(prev => new Set([...prev, id]));
      showAlert();
      setTimeout(() => setNewVocab(prev => { const n = new Set(prev); n.delete(id); return n; }), 4000);
    };
    VOCAB_TIMELINE.forEach(v => { if (currentTime >= v.at && !triggered.has(v.id)) { triggered.add(v.id); flash(v.id); } });
    CONCEPT_TIMELINE.forEach(c => { if (currentTime >= c.at && !triggered.has(c.id)) { triggered.add(c.id); setVisibleConcepts(prev => new Set([...prev, c.id])); showAlert(); } });
    EXERCISE_TIMELINE.forEach(e => { if (currentTime >= e.at && !triggered.has(e.id)) { triggered.add(e.id); setVisibleExercises(prev => new Set([...prev, e.id])); showAlert(); } });
  }, [currentTime]);

  function showAlert() {
    setNewContentAlert(true);
    if (rightRef.current) rightRef.current.scrollTo({ top: rightRef.current.scrollHeight, behavior: 'smooth' });
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    alertTimeout.current = setTimeout(() => setNewContentAlert(false), 3000);
  }

  function unlockAll() {
    const triggered = triggeredRef.current;
    VOCAB_TIMELINE.forEach(v => { triggered.add(v.id); setVisibleVocab(p => new Set([...p, v.id])); });
    CONCEPT_TIMELINE.forEach(c => { triggered.add(c.id); setVisibleConcepts(p => new Set([...p, c.id])); });
    EXERCISE_TIMELINE.forEach(e => { triggered.add(e.id); setVisibleExercises(p => new Set([...p, e.id])); });
    showAlert();
  }

  function markDone(id: string) { setCompletedExercises(p => new Set([...p, id])); }

  function handleChoice(ex: ExerciseItem, label: string) {
    setChoiceAnswers(p => ({ ...p, [ex.id]: label }));
    const ok = ex.choices?.find(c => c.label === label)?.correct ?? false;
    setChoiceFeedback(p => ({ ...p, [ex.id]: ok ? ex.feedback.ok : ex.feedback.err }));
    if (ok) markDone(ex.id);
  }

  const activeSegIdx = segmentIndex(currentTime);
  const hasItems = visibleVocab.size + visibleConcepts.size + visibleExercises.size > 0;
  const isAudioPending = audioStatus !== 'ready';

  const allItems = [
    ...VOCAB_TIMELINE.map(v => ({ ...v, kind: 'vocab' as const, sortAt: v.at })),
    ...CONCEPT_TIMELINE.map(c => ({ ...c, kind: 'concept' as const, sortAt: c.at })),
    ...EXERCISE_TIMELINE.map(e => ({ ...e, kind: 'exercise' as const, sortAt: e.at })),
  ].sort((a, b) => a.sortAt - b.sortAt);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 'calc(100vh - 200px)', background: 'transparent' }}>
      {/* LEFT SIDEBAR */}
      <aside style={{ borderRight: '1px solid var(--line-soft)', padding: '1.5rem 1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Sección 1 de 11</p>
          <h2 style={{ margin: '0 0 6px', fontSize: 20, lineHeight: 1.2, color: 'var(--ink)' }}>¿Por qué el verbo va al final?</h2>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: 'var(--muted)' }}>Sofía y Carlos decodifican el secreto más importante del coreano. Escucha y completa los ejercicios cuando aparezcan.</p>
          <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--muted)' }}>Progreso: {completedExercises.size}/5 ejercicios</p>
        </div>

        {/* Player */}
        <article style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {['Sofía (S)', 'Carlos (C)'].map(n => <span key={n} style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: 'var(--muted)' }}>{n}</span>)}
          </div>

          {/* Waveform viz */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 20, marginBottom: 10 }}>
            {[0, 1, 2, 3, 4].map(i => {
              const amp = isPlaying ? Math.abs(Math.sin(currentTime * 3 + i)) : 0.2;
              return <span key={i} style={{ width: 4, borderRadius: 999, background: '#6c63ff', height: `${8 + amp * 12}px`, transition: 'height 120ms linear', display: 'block' }} />;
            })}
          </div>

          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--muted)' }}>Segmento: <strong style={{ color: 'var(--ink)' }}>{SEGMENT_MAP[activeSegIdx].label}</strong></p>

          {isAudioPending ? (
            <div style={{ marginBottom: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Audio en preparación</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>El reproductor se habilita cuando el audio esté disponible.</p>
            </div>
          ) : (
            <div ref={waveRef} style={{ marginBottom: 10 }} />
          )}

          <p style={{ margin: '0 0 10px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{fmt(currentTime)} / {fmt(duration)}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button type="button" onClick={() => { if (wavesurfer && isReady) wavesurfer.playPause(); }} style={{ width: 36, height: 36, borderRadius: '50%', background: '#6c63ff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 1 }} />}
            </button>
            <button type="button" onClick={() => setRate(r => r === 1 ? 1.5 : r === 1.5 ? 0.75 : 1)} style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: 'var(--muted)', cursor: 'pointer' }}>{rate}x</button>
          </div>
        </article>

        {/* Segment map */}
        <article style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mapa del episodio</h4>
          {SEGMENT_MAP.map((seg, i) => {
            const isCurr = activeSegIdx === i;
            const isPast = currentTime >= seg.at;
            return (
              <button key={seg.label} type="button" onClick={() => { if (wavesurfer && isReady) wavesurfer.setTime(seg.at); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 8, cursor: 'pointer', fontSize: 12, border: 'none', textAlign: 'left', background: isCurr ? 'rgba(108,99,255,0.08)' : 'transparent', color: isCurr || isPast ? 'var(--ink)' : 'var(--muted)' }}>
                <span>{seg.icon}</span>
                <span style={{ flex: 1 }}>{seg.label}</span>
                <span style={{ fontFamily: 'var(--mono)', color: '#adb5bd', fontSize: 10 }}>{fmt(seg.at)}</span>
              </button>
            );
          })}
        </article>
      </aside>

      {/* RIGHT PANEL */}
      <main ref={rightRef} style={{ overflowY: 'auto', padding: '1.5rem', paddingBottom: '4rem', position: 'relative' }}>
        {!hasItems ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 12, padding: 48, color: 'var(--muted)' }}>
            <p style={{ fontSize: 40, margin: 0 }}>🎧</p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>El vocabulario, conceptos y ejercicios aparecerán aquí mientras escuchas el podcast.</p>
            <button type="button" onClick={unlockAll} style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid var(--line-soft)', borderRadius: 8, padding: '8px 16px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer', marginTop: 8 }}>
              🛠 Vista previa — mostrar todo
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {allItems.map(item => {
              if (item.kind === 'vocab' && visibleVocab.has(item.id)) {
                return (
                  <div key={item.id} style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 3, height: 12, borderRadius: 2, background: (item as VocabItem).color }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: (item as VocabItem).color }}>Vocabulario</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#adb5bd' }}>{fmt(item.at)}</span>
                      <span style={{ flex: 1, height: 1, background: 'var(--wl-panel-raised, #e9ecef)' }} />
                    </div>
                    <VocabCard item={item as VocabItem} isNew={newVocab.has(item.id)} onSpeak={speak} />
                  </div>
                );
              }
              if (item.kind === 'concept' && visibleConcepts.has(item.id)) {
                return (
                  <div key={item.id} style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 3, height: 12, borderRadius: 2, background: (item as ConceptItem).color }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: (item as ConceptItem).color }}>Concepto</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#adb5bd' }}>{fmt(item.at)}</span>
                      <span style={{ flex: 1, height: 1, background: 'var(--wl-panel-raised, #e9ecef)' }} />
                    </div>
                    <ConceptCard item={item as ConceptItem} />
                  </div>
                );
              }
              if (item.kind === 'exercise' && visibleExercises.has(item.id)) {
                const ex = item as ExerciseItem;
                const isDone = completedExercises.has(ex.id);
                const feedbackText = choiceFeedback[ex.id] ?? '';
                const isCorrect = feedbackText === ex.feedback.ok;
                return (
                  <div key={ex.id} style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 3, height: 12, borderRadius: 2, background: isDone ? '#2d9b4e' : '#e6930a' }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: isDone ? '#2d9b4e' : '#e6930a' }}>Ejercicio</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#adb5bd' }}>{fmt(ex.at)}</span>
                      <span style={{ flex: 1, height: 1, background: 'var(--wl-panel-raised, #e9ecef)' }} />
                    </div>
                    <article style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderLeft: `3px solid ${isDone ? '#2d9b4e' : '#e6930a'}`, borderRadius: 12, padding: 16 }}>
                      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: isDone ? '#2d9b4e' : '#e6930a' }}>{ex.title}</p>
                        {isDone && <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>Completado</span>}
                      </header>
                      {ex.type === 'choice' ? (
                        <>
                          <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.6 }}>{ex.question}</p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                            {ex.choices?.map(c => {
                              const sel = choiceAnswers[ex.id] === c.label;
                              const showOk = sel && c.correct;
                              const showErr = sel && !c.correct;
                              return (
                                <button key={c.label} type="button" onClick={() => handleChoice(ex, c.label)} style={{ padding: '10px 12px', background: showOk ? 'rgba(45,155,78,0.06)' : showErr ? 'rgba(220,53,69,0.05)' : sel ? 'rgba(108,99,255,0.06)' : '#fff', border: `1px solid ${showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : '#e9ecef'}`, borderRadius: 10, fontSize: 13, textAlign: 'left', cursor: 'pointer', lineHeight: 1.5, color: showOk ? '#2d9b4e' : showErr ? '#dc3545' : '#1a1a2e' }}>
                                  <span style={c.kr ? { fontFamily: 'sans-serif', fontSize: 15 } : undefined}>{c.label}</span>
                                  {c.note && <span style={{ display: 'block', fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)', marginTop: 2 }}>{c.note}</span>}
                                </button>
                              );
                            })}
                          </div>
                          {feedbackText && <div style={{ background: isCorrect ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${isCorrect ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: isCorrect ? '#2d9b4e' : '#dc3545', lineHeight: 1.6 }}>{feedbackText}</div>}
                        </>
                      ) : (
                        <DragExercise item={ex} onSpeak={speak} onComplete={markDone} isCompleted={isDone} />
                      )}
                    </article>
                  </div>
                );
              }
              return null;
            })}

            {completedExercises.size === 5 && (
              <article style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.06), var(--wl-panel-raised, #fff))', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 16, padding: 32, textAlign: 'center', marginTop: 8 }}>
                <p style={{ fontSize: 36, margin: '0 0 12px' }}>🎯</p>
                <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>¡Ya piensas en coreano!</h3>
                <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.7 }}>Terminaste los 5 ejercicios de activación. Mantén el patrón SOV activo y sigue al siguiente bloque.</p>
                <span style={{ display: 'block', marginBottom: 4, fontSize: 22, color: 'var(--wl-on-panel-link, #6c63ff)' }}>저는 학교에 가요</span>
                <p style={{ margin: 0, fontSize: 11, color: '#adb5bd' }}>Yo a la escuela voy.</p>
                {onComplete && <button type="button" onClick={onComplete} style={{ marginTop: 24, width: '100%', padding: '10px', background: '#2d9b4e', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Continuar →</button>}
              </article>
            )}
          </div>
        )}

        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#6c63ff', color: '#fff', borderRadius: 100, padding: '8px 16px', fontSize: 12, fontWeight: 600, boxShadow: '0 4px 12px rgba(108,99,255,0.3)', opacity: newContentAlert ? 1 : 0, transform: newContentAlert ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease', pointerEvents: 'none' }}>
          ↓ Nuevo contenido
        </div>
      </main>
    </div>
  );
}
