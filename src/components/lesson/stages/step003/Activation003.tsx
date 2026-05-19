'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_003, playAudio } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineItem {
  id: string;
  at: number; // seconds when card appears
  kr: string;
  rom?: string;
  title: string;
  body: string;
  color: string;
  audioKey?: string; // key for playAudio
}

interface Question {
  id: string;
  q: string;
  options: string[];
  correct: string;
}

// ─── Timeline ────────────────────────────────────────────────────────────────
// Cards appear ONLY when podcast reaches their timestamp

const TIMELINE: TimelineItem[] = [
  {
    id: 'T1', at: 9,
    kr: 'Radar social',
    title: 'El radar invisible de los coreanos',
    body: 'Antes de hablar, los coreanos calculan automáticamente la edad, el estatus y la relación con su interlocutor. Eso determina qué palabras van a usar.',
    color: '#6c63ff',
  },
  {
    id: 'T2', at: 52,
    kr: '어서 오세요',
    rom: 'eo-seo o-se-yo',
    title: 'Bienvenido/a — la primera palabra que escuchas',
    body: 'Cada vez que entras a un negocio en Corea escuchas esto. Es un saludo de bienvenida formal que dice: "Pasa, estás en buenas manos."',
    color: '#f59e0b',
    audioKey: '어서 오세요',
  },
  {
    id: 'T3', at: 64,
    kr: '안녕하세요',
    rom: 'an-nyeong-ha-se-yo',
    title: 'Hola — el saludo universal formal',
    body: 'Lo usas con desconocidos, personas mayores, en tiendas, restaurantes y oficinas. Es tu saludo de entrada al 95% de situaciones en Corea.',
    color: '#10b981',
    audioKey: '안녕하세요',
  },
  {
    id: 'T4', at: 75,
    kr: '7 niveles',
    title: 'El coreano tiene 7 niveles de formalidad',
    body: 'En la vida diaria moderna se usan principalmente 3: el formal (-ㅂ니다), el educado informal (-요) y el casual. Usar el nivel incorrecto es como ir en pijama a una reunión.',
    color: '#8b5cf6',
  },
  {
    id: 'T5', at: 104,
    kr: '아메리카노 한 잔 주세요',
    rom: 'a-me-ri-ka-no han jan ju-se-yo',
    title: 'Un americano, por favor',
    body: 'La estructura es: objeto + cantidad + 주세요. Literalmente: "Americano una taza deme." Con esta fórmula puedes pedir cualquier cosa en cualquier lugar.',
    color: '#3b82f6',
    audioKey: '아메리카노 한 잔 주세요',
  },
  {
    id: 'T6', at: 112,
    kr: '주세요',
    rom: 'ju-se-yo',
    title: 'La palabra mágica',
    body: 'Significa "por favor deme". Pégala al final de cualquier palabra y ya tienes un pedido cortés. 물 주세요 = agua por favor. 메뉴 주세요 = el menú por favor.',
    color: '#ec4899',
    audioKey: '주세요',
  },
  {
    id: 'T7', at: 125,
    kr: '네, 금방 준비해 드릴게요',
    rom: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',
    title: 'Sí, lo preparo enseguida',
    body: 'La respuesta formal de servicio. 네 = sí. 금방 = enseguida. El final -드릴게요 es la forma más cortés de decir "lo haré para usted".',
    color: '#14b8a6',
    audioKey: '네, 금방 준비해 드릴게요',
  },
  {
    id: 'T8', at: 135,
    kr: '사이즈 뭐로 드릴까요',
    rom: 'sa-i-jeu mwo-ro deu-ril-kka-yo',
    title: '¿Qué tamaño le pongo?',
    body: '사이즈 = size (préstamo del inglés). 뭐로 = con qué / de cuál. -드릴까요 = ¿le sirvo / le pongo? Fórmula de servicio ultra-cortés.',
    color: '#f97316',
    audioKey: '사이즈 뭐로 드릴까요',
  },
  {
    id: 'T9', at: 143,
    kr: '스몰 · 미디엄 · 라지',
    rom: 'seu-mol · mi-di-eom · la-ji',
    title: 'Small · Medium · Large en coreano',
    body: 'Los tamaños son préstamos del inglés. El coreano adopta palabras extranjeras cambiando su fonética. 스몰, 미디엄, 라지 suenan parecido pero con fonética coreana.',
    color: '#6366f1',
  },
  {
    id: 'T10', at: 157,
    kr: '글자가 조금 작아요',
    rom: 'geul-ja-ga jo-geum ja-ga-yo',
    title: 'Las letras son un poco pequeñas',
    body: '글자 = letras (ya la conoces del STEP 002). 조금 = un poco (también del STEP 002). 작아요 = es pequeño. El reciclaje de vocabulario ya está funcionando en tu cerebro.',
    color: '#84cc16',
    audioKey: '글자가 조금 작아요',
  },
  {
    id: 'T11', at: 168,
    kr: '이름이 뭐예요',
    rom: 'i-reu-mi mwo-ye-yo',
    title: '¿Cómo te llamas?',
    body: '이름 = nombre. 이 = partícula de sujeto. 뭐예요 = ¿qué es? Literalmente: "El nombre ¿qué es?" Esta es la estructura copula 이에요/예요 — vuelve en la gramática del paso 7.',
    color: '#f43f5e',
    audioKey: '이름이 뭐예요',
  },
  {
    id: 'T12', at: 184,
    kr: '여기 있습니다',
    rom: 'yeo-gi it-seum-ni-da',
    title: 'Aquí tiene — la entrega formal',
    body: '여기 = aquí. 있습니다 = hay / existe (forma formal de 있어요). La barista lo dice mientras te pasa el café con ambas manos. El lenguaje corporal completa el mensaje.',
    color: '#0ea5e9',
    audioKey: '여기 있습니다',
  },
  {
    id: 'T13', at: 190,
    kr: '감사합니다',
    rom: 'gam-sa-ham-ni-da',
    title: 'Gracias — siempre con una reverencia',
    body: 'La forma más formal de agradecer. Va acompañada de una reverencia de 15° mínimo. Recibir algo con dos manos y decir 감사합니다 es el estándar de cortesía en Corea.',
    color: '#a855f7',
    audioKey: '감사합니다',
  },
  {
    id: 'T14', at: 246,
    kr: '여기요',
    rom: 'yeo-gi-yo',
    title: 'Llama al mesero — ¡oiga!',
    body: 'Literalmente "aquí". Se usa para llamar la atención del personal. No es grosero — es la forma estándar. En muchos cafés hay un botón en la mesa con la misma función.',
    color: '#d97706',
  },
  {
    id: 'T15', at: 255,
    kr: '이거 얼마예요',
    rom: 'i-geo eol-ma-ye-yo',
    title: '¿Cuánto cuesta esto?',
    body: '이거 = esto. 얼마 = cuánto (dinero). 예요 = es. Frase de supervivencia esencial para cualquier tienda, mercado o restaurante en Corea.',
    color: '#06b6d4',
  },
  {
    id: 'T16', at: 262,
    kr: '화장실이 어디예요',
    rom: 'hwa-jang-shi-ri eo-di-ye-yo',
    title: '¿Dónde está el baño?',
    body: '화장실 = baño / tocador. 어디 = dónde (ya lo conoces del STEP 001). 예요 = es. Una de las frases más importantes para sobrevivir el primer día.',
    color: '#22c55e',
  },
  {
    id: 'T17', at: 283,
    kr: '저는 외국인이에요',
    rom: 'jeo-neun oe-gug-i-ni-e-yo',
    title: 'Soy extranjero/a — la frase salvavidas',
    body: '저는 = yo (formal). 외국인 = extranjero. 이에요 = soy / es. Al decirla, toda la tensión de la jerarquía desaparece. Los coreanos simplifican su lenguaje o cambian al inglés.',
    color: '#64748b',
  },
  {
    id: 'T18', at: 325,
    kr: '레이더 사회적',
    title: 'Cada sílaba lleva información social',
    body: 'El coreano no es solo un idioma — es un sistema social codificado en el lenguaje. Aprender a hablarlo es aprender a leer ese radar invisible que usan los coreanos a cada momento.',
    color: '#6c63ff',
  },
];

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Cuántos niveles de formalidad tiene el coreano?',
    options: ['3', '5', '7', '10'],
    correct: '7',
  },
  {
    id: 'Q2',
    q: '¿Qué significa 주세요?',
    options: ['gracias', 'hola', 'por favor / deme', '¿cómo?'],
    correct: 'por favor / deme',
  },
  {
    id: 'Q3',
    q: '¿Cómo se llama la cliente que pide el café?',
    options: ['Mia', 'Haeun', 'Sora', 'Jiyeon'],
    correct: 'Haeun',
  },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

interface Props {
  onComplete?: () => void;
}

export default function Activation003({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'listening' | 'questions' | 'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(330); // ~5:30
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete } = useSound();

  const audioRef = useRef<HTMLAudioElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Items revealed so far (at <= currentTime)
  const visibleItems = TIMELINE.filter(item => currentTime >= item.at);
  const latestItem = visibleItems[visibleItems.length - 1] ?? null;

  // Enable skip after 60s of listening
  useEffect(() => {
    if (phase !== 'listening') return;
    const timer = setTimeout(() => setCanSkip(true), 60_000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-scroll to bottom as new cards appear
  useEffect(() => {
    if (visibleItems.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visibleItems.length]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play().catch(() => {}); }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = ratio * duration;
    }
  }

  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  }

  function handleCheckAnswers() {
    const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);
    if (!allAnswered || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
    if (s === QUESTIONS.length) { playCorrect(); } else { playWrong(); }
  }

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ── Intro ───────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 01 DE 11 · Activacion
        </p>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
          Cortesia — Tu primer dia en Corea
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
          En Corea, la cortesia no es opcional — esta integrada en cada frase. Escucha este podcast desde una cafeteria en Seoul y activa tu radar social desde la primera silaba.
        </p>

        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>
            Como funciona
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Escucha el podcast — 5 minutos de inmersion en coreano real',
              'Las tarjetas aparecen solas mientras avanza el audio — explicando cada frase en el momento exacto',
              'Al terminar, 3 preguntas rapidas para verificar lo que absorbiste',
            ].map(text => (
              <li key={text} style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => { setPhase('listening'); setTimeout(() => { audioRef.current?.play().catch(() => {}); }, 100); }}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Escuchar el podcast →
        </button>
      </section>
    );
  }

  // ── Listening ───────────────────────────────────────────────────────────────
  if (phase === 'listening') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <audio
          ref={audioRef}
          src={KR_PODCAST_003}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setPhase('questions'); }}
        />

        {/* Player */}
        <div style={{ background: '#1a1a2e', borderRadius: 14, padding: '1.25rem', marginBottom: 20, position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6c63ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              PODCAST · STEP 003
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          {/* Progress */}
          <div
            onClick={handleProgressClick}
            style={{ height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: 12, cursor: 'pointer' }}
          >
            <div style={{ height: '100%', width: `${progress}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.4s linear' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              onClick={togglePlay}
              style={{ width: 40, height: 40, borderRadius: '50%', background: '#6c63ff', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>Cortesia en coreano</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                {visibleItems.length === 0
                  ? 'Las tarjetas aparecen al avanzar...'
                  : `${visibleItems.length} de ${TIMELINE.length} conceptos`}
              </p>
            </div>
            {canSkip && (
              <button
                type="button"
                onClick={() => setPhase('questions')}
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Saltar →
              </button>
            )}
          </div>
        </div>

        {/* Feed — only visible cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--muted)', fontSize: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--line-soft)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                ♪
              </div>
              Reproduce el audio — las tarjetas aparecen solas
            </div>
          )}

          {visibleItems.map((item, i) => {
            const isLatest = i === visibleItems.length - 1;
            return (
              <div
                key={item.id}
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${isLatest ? item.color : 'var(--line-soft)'}`,
                  background: isLatest ? `${item.color}08` : 'var(--bg)',
                  padding: '14px 16px',
                  opacity: isLatest ? 1 : 0.55,
                  transition: 'all 0.3s ease',
                  animation: isLatest ? 'slideIn 0.35s ease' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: isLatest ? item.color : 'var(--muted)', marginTop: 4, minWidth: 28, textAlign: 'right' }}>
                    {fmt(item.at)}
                  </span>
                  <div style={{ flex: 1 }}>
                    {/* Korean phrase */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <p style={{ margin: 0, fontSize: 20, fontWeight: 800, fontFamily: "'Noto Sans KR', sans-serif", color: isLatest ? item.color : 'var(--ink)', lineHeight: 1.2 }}>
                        {item.kr}
                      </p>
                      {item.audioKey && isLatest && (
                        <button
                          type="button"
                          onClick={() => playAudio(item.audioKey!)}
                          style={{ flexShrink: 0, padding: '3px 10px', borderRadius: 20, background: `${item.color}15`, border: `1px solid ${item.color}40`, color: item.color, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                        >
                          Escuchar
                        </button>
                      )}
                    </div>

                    {/* Romanization */}
                    {item.rom && (
                      <p style={{ margin: '0 0 6px', fontSize: 11, color: isLatest ? item.color : 'var(--muted)', fontFamily: 'var(--mono)', opacity: 0.8 }}>
                        {item.rom}
                      </p>
                    )}

                    {/* Title */}
                    <p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                      {item.title}
                    </p>

                    {/* Body — only visible on latest card */}
                    {isLatest && (
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} style={{ height: 1 }} />
        </div>

        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    );
  }

  // ── Questions ───────────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
          Comprension global
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Tres preguntas rapidas. Confia en lo que escuchaste.
        </p>

        {QUESTIONS.map(q => (
          <article
            key={q.id}
            style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}
          >
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
              {q.q}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map(opt => {
                const selected = answers[q.id] === opt;
                const isCorrect = opt === q.correct;
                const showCorrect = checked && isCorrect;
                const showWrong = checked && selected && !isCorrect;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    disabled={checked}
                    style={{
                      padding: '10px 12px',
                      background: showCorrect ? 'rgba(45,155,78,0.08)' : showWrong ? 'rgba(220,53,69,0.06)' : selected ? 'rgba(108,99,255,0.07)' : 'var(--bg)',
                      border: `1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--line-soft)'}`,
                      borderRadius: 9,
                      fontSize: 13,
                      textAlign: 'center',
                      cursor: checked ? 'default' : 'pointer',
                      color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--ink)',
                      fontWeight: selected ? 600 : 400,
                      transition: 'all 0.12s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </article>
        ))}

        {allAnswered && !checked && (
          <button
            type="button"
            onClick={handleCheckAnswers}
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}
          >
            Verificar respuestas
          </button>
        )}

        {checked && (
          <div style={{ marginTop: 16 }}>
            <div style={{
              background: score === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)',
              border: `1px solid ${score === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`,
              borderRadius: 12, padding: '16px', marginBottom: 16, textAlign: 'center',
            }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: score === 3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {score === 3 ? 'Perfecto. Tu radar social ya esta activo.' : score >= 2 ? 'Muy bien. Casi todo.' : 'Normal para la primera vez. El siguiente paso lo refuerza.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { playComplete(); setPhase('complete'); onComplete?.(); }}
              style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Continuar →
            </button>
          </div>
        )}
      </section>
    );
  }

  // ── Complete ─────────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', border: '2px solid #6c63ff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
        ✓
      </div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Activacion completada
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Ya tienes el radar social activo. Ahora vamos a las palabras clave del cafe.
      </p>
      <button
        type="button"
        onClick={onComplete}
        style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
      >
        Siguiente etapa →
      </button>
    </section>
  );
}
