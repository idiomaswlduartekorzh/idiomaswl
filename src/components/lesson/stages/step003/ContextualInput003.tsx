'use client';

import { useState, useRef, useEffect } from 'react';
import { playAudio } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  speaker: 'barista' | 'customer';
  hangul: string;
  romanization: string;
  translation: string;
  audioKey: string;
  formality: string;
  formalityColor: '#6c63ff' | '#f59e0b' | '#22c55e';
  context: string;
  breakdown: { part: string; meaning: string }[];
  tip: string;
}

function fRgb(color: string) {
  if (color === '#f59e0b') return '245,158,11';
  if (color === '#22c55e') return '34,197,94';
  return '108,99,255';
}

// ─── Conversación completa del café ──────────────────────────────────────────
const CONVERSATION: ChatMessage[] = [
  {
    id: 'M1',
    speaker: 'barista',
    hangul: '어서 오세요',
    romanization: 'eo-seo o-se-yo',
    translation: '¡Bienvenido/a!',
    audioKey: '어서 오세요',
    formality: '해요체 — educado estándar',
    formalityColor: '#6c63ff',
    context:
      'Frase de bienvenida automática en tiendas y cafeterías coreanas. La barista la dice en el momento en que alguien entra — como un reflejo condicionado del servicio.',
    breakdown: [
      { part: '어서', meaning: 'rápido / adelante (imperativo suave)' },
      { part: '오세요', meaning: 'venga / entre — honorífico de 오다 (venir)' },
    ],
    tip: '💡 No requiere respuesta. Es una bienvenida de servicio, no una pregunta. El cliente puede ignorarla o simplemente asentir.',
  },
  {
    id: 'M2',
    speaker: 'customer',
    hangul: '안녕하세요',
    romanization: 'an-nyeong-ha-se-yo',
    translation: 'Hola (formal)',
    audioKey: '안녕하세요',
    formality: '해요체 — educado estándar',
    formalityColor: '#6c63ff',
    context:
      'Saludo formal universal con desconocidos. Haeun responde educadamente al entrar. Usar 안녕 (informal) aquí sonaría brusco e inapropiado.',
    breakdown: [
      { part: '안녕', meaning: 'bienestar / paz (sustantivo)' },
      { part: '하세요', meaning: 'estar / ser — honorífico de 하다' },
    ],
    tip: '💡 Regla de oro: con extraños → siempre 안녕하세요. Con amigos íntimos → 안녕 o 야. No mezcles.',
  },
  {
    id: 'M3',
    speaker: 'customer',
    hangul: '아메리카노 한 잔 주세요',
    romanization: 'a-me-ri-ka-no han jan ju-se-yo',
    translation: 'Un americano, por favor',
    audioKey: '아메리카노 한 잔 주세요',
    formality: '해요체 — pedido cortés',
    formalityColor: '#6c63ff',
    context:
      'Fórmula perfecta para pedir en cualquier cafetería o restaurante. El patrón [producto + cantidad + 주세요] funciona para casi cualquier cosa que quieras pedir.',
    breakdown: [
      { part: '아메리카노', meaning: 'americano — préstamo del inglés "americano"' },
      { part: '한 잔', meaning: 'una taza / un vaso (한 = uno, 잔 = clasificador de bebidas)' },
      { part: '주세요', meaning: 'deme / por favor — pedir algo educadamente' },
    ],
    tip: '💡 주세요 es tu mejor amigo. Señala cualquier cosa y di 주세요 — funcionará siempre.',
  },
  {
    id: 'M4',
    speaker: 'barista',
    hangul: '네, 금방 준비해 드릴게요',
    romanization: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',
    translation: 'Sí, lo preparo enseguida',
    audioKey: '네, 금방 준비해 드릴게요',
    formality: '해요체 reverencial — servicio formal',
    formalityColor: '#f59e0b',
    context:
      'Confirmación profesional del pedido. La barista usa 드릴게요 — una forma especialmente respetuosa que solo empleados usan con clientes o personas de mayor jerarquía.',
    breakdown: [
      { part: '네', meaning: 'sí' },
      { part: '금방', meaning: 'enseguida / ahora mismo' },
      { part: '준비해', meaning: 'preparar (forma base)' },
      { part: '드릴게요', meaning: 'le daré / haré — reverencial de 줄게요' },
    ],
    tip: '💡 드리다 vs 주다: ambos significan "dar", pero 드리다 es reverencial. Solo lo usan empleados con clientes o hijos con padres.',
  },
  {
    id: 'M5',
    speaker: 'barista',
    hangul: '사이즈 뭐로 드릴까요?',
    romanization: 'sa-i-jeu mwo-ro deu-ril-kka-yo?',
    translation: '¿De qué tamaño se lo sirvo?',
    audioKey: '사이즈 뭐로 드릴까요',
    formality: '해요체 reverencial — oferta/pregunta',
    formalityColor: '#f59e0b',
    context:
      'Pregunta estándar en todas las cafeterías coreanas. El tamaño afecta el precio — siempre te lo preguntarán. -ㄹ까요? es la estructura para ofrecer o proponer.',
    breakdown: [
      { part: '사이즈', meaning: 'tamaño — del inglés "size"' },
      { part: '뭐로', meaning: '¿de qué? / ¿cuál? (뭐 + partícula 로)' },
      { part: '드릴까요', meaning: '¿le sirvo? — reverencial + estructura de propuesta' },
    ],
    tip: '💡 Patrón -ㄹ까요?: 갈까요? (¿vamos?), 도와드릴까요? (¿le ayudo?). Muy útil para ofrecer cosas.',
  },
  {
    id: 'M6',
    speaker: 'barista',
    hangul: '스몰, 미디엄, 라지 있어요',
    romanization: 'seu-mol, mi-di-eom, la-ji it-seo-yo',
    translation: 'Hay pequeño, mediano y grande',
    audioKey: '스몰, 미디엄, 라지 있어요',
    formality: '해요체 — informativo casual',
    formalityColor: '#6c63ff',
    context:
      'La barista lista las opciones disponibles. Los tres tamaños son palabras del inglés adaptadas al sistema silábico coreano — fenómeno llamado 외래어 (palabras extranjeras).',
    breakdown: [
      { part: '스몰', meaning: '"small" → pequeño' },
      { part: '미디엄', meaning: '"medium" → mediano' },
      { part: '라지', meaning: '"large" → grande' },
      { part: '있어요', meaning: 'hay / tenemos / existe' },
    ],
    tip: '💡 El coreano moderno usa cientos de préstamos del inglés: 커피, 아이스, 버스, 핸드폰... Úsalos sin miedo.',
  },
  {
    id: 'M7',
    speaker: 'customer',
    hangul: '글자가 조금 작아요',
    romanization: 'geul-ja-ga jo-geum ja-ga-yo',
    translation: 'Las letras son un poco pequeñas',
    audioKey: '글자가 조금 작아요',
    formality: '해요체 — comentario indirecto',
    formalityColor: '#22c55e',
    context:
      'Haeun mira el menú y no puede leer bien. En vez de pedir ayuda directamente, hace un comentario indirecto. Esta comunicación oblicua es característica de la cultura coreana.',
    breakdown: [
      { part: '글자', meaning: 'letras / caracteres escritos' },
      { part: '가', meaning: 'partícula de sujeto (después de vocal)' },
      { part: '조금', meaning: 'un poco / algo' },
      { part: '작아요', meaning: 'es pequeño/a (adjetivo verbal)' },
    ],
    tip: '💡 Cultura indirecta: los coreanos evitan decir "no entiendo" o "no puedo leer" directamente. Es más cortés insinuarlo para no crear tensión.',
  },
  {
    id: 'M8',
    speaker: 'barista',
    hangul: '이름이 뭐예요?',
    romanization: 'i-reum-i mwo-ye-yo?',
    translation: '¿Cuál es su nombre?',
    audioKey: '이름이 뭐예요',
    formality: '해요체 — pregunta directa educada',
    formalityColor: '#6c63ff',
    context:
      'En Corea, los cafés piden el nombre para llamarte cuando el pedido está listo — práctica extendida desde los años 2010. Es la misma pregunta que harías en cualquier mostrador.',
    breakdown: [
      { part: '이름', meaning: 'nombre' },
      { part: '이', meaning: 'partícula de sujeto (después de consonante)' },
      { part: '뭐예요', meaning: '¿qué es? / ¿cuál es? (informal-educado)' },
    ],
    tip: '💡 Versión ultra-formal en hoteles o restaurantes de lujo: 성함이 어떻게 되세요? (¿cómo se llama usted?)',
  },
  {
    id: 'M9',
    speaker: 'customer',
    hangul: '저는 하은이에요',
    romanization: 'jeo-neun ha-eu-ni-e-yo',
    translation: 'Me llamo Haeun',
    audioKey: '저는 하은이에요',
    formality: '해요체 — presentación educada',
    formalityColor: '#6c63ff',
    context:
      'Forma estándar para decir el nombre con cortesía. 저는 (yo formal) en vez de 나는 (yo informal) — la elección del pronombre ya comunica respeto automáticamente.',
    breakdown: [
      { part: '저는', meaning: 'yo (formal) + partícula de tema 는' },
      { part: '하은이에요', meaning: 'soy Haeun — 이에요 es la cópula formal' },
    ],
    tip: '💡 Regla de 이에요 / 예요: si el nombre termina en consonante → 이에요 (하은이에요). Si termina en vocal → 예요 (미나예요, 지우예요).',
  },
  {
    id: 'M10',
    speaker: 'barista',
    hangul: '여기 있습니다',
    romanization: 'yeo-gi it-seum-ni-da',
    translation: 'Aquí tiene',
    audioKey: '여기 있습니다',
    formality: '합쇼체 — máximo formal',
    formalityColor: '#f59e0b',
    context:
      'Frase al entregar el pedido terminado. 있습니다 es el nivel más alto de formalidad (-ㅂ니다), el que usan empleados para mostrar el máximo respeto al entregar un producto.',
    breakdown: [
      { part: '여기', meaning: 'aquí' },
      { part: '있습니다', meaning: 'está / aquí lo tiene — sufijo -ㅂ니다 = máximo formal' },
    ],
    tip: '💡 있습니다 vs 있어요: misma idea, diferente registro. -ㅂ니다 aparece en noticias, discursos, presentaciones y servicio de atención al cliente.',
  },
  {
    id: 'M11',
    speaker: 'customer',
    hangul: '감사합니다',
    romanization: 'gam-sa-ham-ni-da',
    translation: 'Gracias',
    audioKey: '감사합니다',
    formality: '합쇼체 — agradecimiento formal',
    formalityColor: '#f59e0b',
    context:
      'El agradecimiento más formal del coreano. Haeun lo usa porque valora el servicio recibido y quiere expresarlo con sinceridad — el nivel de formalidad comunica eso.',
    breakdown: [
      { part: '감사', meaning: 'gratitud / apreciación (palabra hanja 感謝)' },
      { part: '합니다', meaning: 'hacer — forma máximo formal de 하다' },
    ],
    tip: '💡 감사합니다 vs 고마워요: el primero suena más cálido y formal con extraños. 고마워요 es para amigos. 고마워 es muy íntimo.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
interface Props { onComplete?: () => void }

export default function ContextualInput003({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'chat' | 'complete'>('intro');
  const [revealed, setRevealed] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { complete: playComplete } = useSound();
  const bottomRef = useRef<HTMLDivElement>(null);
  const autoPlayedRef = useRef(new Set<string>());

  const isAllRevealed = revealed >= CONVERSATION.length;

  // Auto-play audio + scroll when new message appears
  useEffect(() => {
    if (revealed === 0) return;
    const msg = CONVERSATION[revealed - 1];
    if (autoPlayedRef.current.has(msg.id)) return;
    autoPlayedRef.current.add(msg.id);
    const tAudio = setTimeout(() => playAudio(msg.audioKey), 380);
    const tScroll = setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
      120,
    );
    return () => { clearTimeout(tAudio); clearTimeout(tScroll); };
  }, [revealed]);

  function startChat() {
    setPhase('chat');
    setTimeout(() => setRevealed(1), 280);
  }

  function handleNext() {
    if (!isAllRevealed) setRevealed(r => r + 1);
  }

  function toggleExpand(id: string) {
    setExpanded(prev => (prev === id ? null : id));
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          ETAPA 05 DE 11
        </p>
        <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
          Contexto primero · El chat del café
        </h3>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
          Recorremos la conversación frase por frase. Descubre <em>por qué</em> cada persona dice lo que dice, qué nivel de formalidad usa y en qué contextos puedes aplicarlo.
        </p>

        {/* How it works */}
        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)' }}>
            Cómo funciona
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['💬', 'El mensaje aparece animado y suena automáticamente'],
              ['👆', 'Tócalo para ver el contexto, la descomposición y el tip'],
              ['🔊', 'Toca el altavoz para repetir el audio cuando quieras'],
              ['→', 'Avanza al siguiente mensaje a tu ritmo'],
            ].map(([icon, text]) => (
              <div key={String(text)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>{icon}</span>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Characters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '12px 14px' }}>
            <span style={{ fontSize: 24 }}>☕</span>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>Barista</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--ink)' }}>Lado izquierdo</p>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.22)', borderRadius: 12, padding: '12px 14px' }}>
            <span style={{ fontSize: 24 }}>👩</span>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--wl-on-panel-link, #6c63ff)' }}>Haeun</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--ink)' }}>Lado derecho</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={startChat}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Empezar la conversación →
        </button>
      </section>
    );
  }

  // ── Complete ───────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <section style={{ maxWidth: 540, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ fontSize: 44, margin: '0 0 16px' }}>☕</p>
        <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>
          Conversación completada
        </h3>
        <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
          Ya tienes el mapa completo de la conversación del café. Cada frase tiene un nivel de formalidad, una función social y un patrón que puedes reutilizar.
        </p>
        <button
          type="button"
          onClick={() => { playComplete(); onComplete?.(); }}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Siguiente etapa →
        </button>
      </section>
    );
  }

  // ── Chat ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 520 }}>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-52px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(52px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        .msg-left  { animation: slideInLeft  0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .msg-right { animation: slideInRight 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .expand-panel {
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1),
                      opacity    0.35s ease,
                      margin-top 0.35s ease;
        }
        .expand-panel.closed { max-height: 0; opacity: 0; margin-top: 0; }
        .expand-panel.open   { max-height: 640px; opacity: 1; margin-top: 8px; }
        .chat-bubble { transition: border-color 0.2s, background 0.2s; }
        .chat-bubble:active { transform: scale(0.98); }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(108,99,255,0.07)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>☕</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>카페 · Cafetería</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>Conversación real · frase a frase</p>
          </div>
        </div>
        <div style={{
          background: 'rgba(108,99,255,0.12)',
          border: '1px solid rgba(108,99,255,0.28)',
          borderRadius: 100,
          padding: '4px 13px',
          fontSize: 11,
          fontWeight: 800,
          color: 'var(--wl-on-panel-link, #6c63ff)',
          letterSpacing: '0.03em',
        }}>
          {revealed} / {CONVERSATION.length}
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {CONVERSATION.slice(0, revealed).map((msg, idx) => {
          const isBarista = msg.speaker === 'barista';
          const isNewest  = idx === revealed - 1;
          const isOpen    = expanded === msg.id;
          const rgb       = fRgb(msg.formalityColor);

          return (
            <div
              key={msg.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: isBarista ? 'flex-start' : 'flex-end' }}
            >
              {/* Speaker label */}
              <p style={{
                margin: '0 0 5px',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: isBarista ? 'var(--muted)' : '#6c63ff',
                paddingLeft:  isBarista ? 10 : 0,
                paddingRight: isBarista ? 0  : 10,
              }}>
                {isBarista ? '☕ Barista' : '👩 Haeun'}
              </p>

              {/* Bubble */}
              <div
                className={`chat-bubble ${isNewest ? (isBarista ? 'msg-left' : 'msg-right') : ''}`}
                style={{ maxWidth: '82%', width: 'fit-content' }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(msg.id)}
                  onKeyDown={e => e.key === 'Enter' && toggleExpand(msg.id)}
                  style={{
                    background: isBarista
                      ? (isOpen ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)')
                      : (isOpen ? 'rgba(108,99,255,0.22)' : 'rgba(108,99,255,0.13)'),
                    border: `1.5px solid ${isBarista
                      ? (isOpen ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)')
                      : (isOpen ? 'rgba(108,99,255,0.55)' : 'rgba(108,99,255,0.32)')}`,
                    borderRadius: isBarista ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                    padding: '13px 15px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {/* Korean */}
                  <p style={{
                    margin: '0 0 4px',
                    fontSize: 21,
                    fontWeight: 700,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                  }}>
                    {msg.hangul}
                  </p>
                  {/* Romanization */}
                  <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    {msg.romanization}
                  </p>
                  {/* Translation + controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: isBarista ? 'rgba(220,215,255,0.85)' : '#9d96ff' }}>
                      {msg.translation}
                    </p>
                    <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                      {/* Replay */}
                      <button
                        type="button"
                        aria-label="Reproducir audio"
                        onClick={e => { e.stopPropagation(); playAudio(msg.audioKey); }}
                        style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'rgba(108,99,255,0.15)',
                          border: '1px solid rgba(108,99,255,0.35)',
                          color: 'var(--wl-on-panel-link, #6c63ff)', fontSize: 12, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        🔊
                      </button>
                      {/* Expand chevron */}
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'var(--muted)', fontSize: 9,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'transform 0.35s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        userSelect: 'none',
                      }}>
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Expansion panel ── */}
                <div className={`expand-panel ${isOpen ? 'open' : 'closed'}`}>
                  <div style={{
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line-soft)',
                    borderRadius: 14,
                    padding: '15px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 13,
                  }}>
                    {/* Formality badge */}
                    <span style={{
                      alignSelf: 'flex-start',
                      background: `rgba(${rgb},0.1)`,
                      border: `1px solid rgba(${rgb},0.35)`,
                      borderRadius: 100,
                      padding: '4px 11px',
                      fontSize: 10,
                      fontWeight: 700,
                      color: msg.formalityColor,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {msg.formality}
                    </span>

                    {/* Context */}
                    <p style={{ margin: 0, fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.7 }}>
                      {msg.context}
                    </p>

                    {/* Breakdown */}
                    <div>
                      <p style={{ margin: '0 0 7px', fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                        Descomposición
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {msg.breakdown.map(b => (
                          <div key={b.part} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                            <span style={{
                              fontFamily: "'Noto Sans KR', sans-serif",
                              fontWeight: 700,
                              fontSize: 13.5,
                              color: 'var(--wl-on-panel-link, #6c63ff)',
                              minWidth: 90,
                              flexShrink: 0,
                            }}>
                              {b.part}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.45 }}>
                              {b.meaning}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tip */}
                    <div style={{
                      background: 'rgba(108,99,255,0.06)',
                      border: '1px solid rgba(108,99,255,0.16)',
                      borderRadius: 9,
                      padding: '9px 13px',
                    }}>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--ink)', lineHeight: 1.6 }}>
                        {msg.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator while more messages remain */}
        {!isAllRevealed && revealed > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 10 }}>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Siguiente frase lista</span>
            <span style={{ fontSize: 14, color: 'var(--wl-on-panel-link, #6c63ff)' }}>→</span>
          </div>
        )}

        <div ref={bottomRef} style={{ height: 4 }} />
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--line-soft)',
        background: 'var(--bg)',
        flexShrink: 0,
      }}>
        {!isAllRevealed ? (
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '100%', padding: '13px',
              background: '#6c63ff', border: 'none', borderRadius: 10,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Siguiente mensaje →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { playComplete(); setPhase('complete'); }}
            style={{
              width: '100%', padding: '13px',
              background: '#2d9b4e', border: 'none', borderRadius: 10,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            He entendido el contexto ✓
          </button>
        )}
      </div>
    </div>
  );
}
