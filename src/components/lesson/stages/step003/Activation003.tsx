'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_003, playAudio } from '@/lib/storage';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Breakdown { kr: string; es: string }
interface Example   { kr: string; es: string; lit?: string }
interface TableData { headers: string[]; rows: string[][] }

interface TimelineItem {
  id: string; at: number;
  type: 'vocab' | 'pattern' | 'culture' | 'survival';
  kr: string; rom?: string; title: string; body: string; color: string;
  audioKey?: string;
  breakdown?: Breakdown[];
  examples?: Example[];
  table?: TableData;
  tip?: string;
  recycled?: string;
}
interface Question { id: string; q: string; options: string[]; correct: string }

// ─── Card type config ─────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  vocab:    { label: 'VOCABULARIO',    icon: '🔤', accent: '#6c63ff' },
  pattern:  { label: 'GRAMÁTICA',      icon: '🧩', accent: '#8b5cf6' },
  culture:  { label: 'CULTURA',        icon: '🇰🇷', accent: '#f59e0b' },
  survival: { label: 'SUPERVIVENCIA',  icon: '🆘', accent: '#22c55e' },
} as const;

// ─── Timeline (18 items) ──────────────────────────────────────────────────────
const TIMELINE: TimelineItem[] = [
  {
    id: 'T1', at: 9, type: 'culture',
    kr: '레이더 사회',
    title: 'El radar social invisible',
    body: 'Antes de pronunciar una sola sílaba, los coreanos procesan: ¿cuántos años tiene esta persona? ¿cuál es su estatus? ¿qué relación tenemos? El idioma cambia completamente según esa respuesta. No es intuición — es un sistema automático integrado en el lenguaje.',
    color: '#6c63ff',
    examples: [
      { kr: '안녕하세요', es: 'a un desconocido / persona mayor', lit: 'nivel formal-educado' },
      { kr: '안녕', es: 'a un amigo íntimo / niño', lit: 'nivel casual' },
    ],
    tip: 'Misma intención, palabras completamente distintas. El radar decide cuál usar.',
  },
  {
    id: 'T2', at: 52, type: 'vocab',
    kr: '어서 오세요',
    rom: 'eo-seo o-se-yo',
    title: 'Bienvenido/a — la primera frase del día',
    body: 'Entra a cualquier tienda, café, restaurante o banco en Corea y escucharás esto. No es un saludo personal — es protocolo estándar de servicio. El radar ya está calculando mientras te reciben.',
    color: '#f59e0b',
    audioKey: '어서 오세요',
    breakdown: [
      { kr: '어서', es: 'rápido / ven pronto (invitación)' },
      { kr: '오세요', es: 'por favor venga (honorífico)' },
    ],
    examples: [
      { kr: '어서 드세요', es: 'Por favor, coma/beba', lit: 'lit: venga a comer' },
      { kr: '어서 앉으세요', es: 'Por favor, siéntese', lit: 'lit: venga a sentarse' },
    ],
    tip: 'Respuesta correcta: leve reverencia de 15° + 안녕하세요. Nada más.',
  },
  {
    id: 'T3', at: 64, type: 'vocab',
    kr: '안녕하세요',
    rom: 'an-nyeong-ha-se-yo',
    title: 'Hola — el saludo que nunca falla',
    body: 'Funciona mañana, tarde y noche. Con desconocidos, en tiendas, con personas mayores. Para un extranjero es la armadura social más importante del idioma. Sin excepciones.',
    color: '#10b981',
    audioKey: '안녕하세요',
    breakdown: [
      { kr: '안녕', es: 'paz / bienestar' },
      { kr: '하세요', es: 'esté / sea (honorífico invitativo)' },
    ],
    examples: [
      { kr: '안녕!', es: '¡Hola! (casual, solo con amigos)' },
      { kr: '안녕히 가세요', es: 'Adiós al que se va', lit: 'lit: vaya en paz' },
      { kr: '안녕히 계세요', es: 'Adiós al que se queda', lit: 'lit: permanezca en paz' },
    ],
  },
  {
    id: 'T4', at: 75, type: 'pattern',
    kr: '7 단계',
    title: 'Los 7 niveles de formalidad del coreano',
    body: 'El coreano tiene 7 registros formales distintos. En la práctica moderna se usan principalmente 3. Usar el nivel incorrecto no es un error gramatical — es una señal social que el otro registra inmediatamente.',
    color: '#8b5cf6',
    table: {
      headers: ['Nivel', 'Sufijo', 'Cuándo usarlo'],
      rows: [
        ['합쇼체 (formal)', '-ㅂ니다 / -습니다', 'Noticias, discursos, jefes, presentaciones'],
        ['해요체 (educado)', '-요', 'Tiendas, cafés, desconocidos, uso diario ★'],
        ['해체 (casual)', '(sin sufijo)', 'Amigos íntimos, familia, niños pequeños'],
      ],
    },
    tip: 'Regla de oro para extranjeros: usa siempre -요. Nunca ofende, siempre es correcto.',
  },
  {
    id: 'T5', at: 104, type: 'vocab',
    kr: '아메리카노 한 잔 주세요',
    rom: 'a-me-ri-ka-no han jan ju-se-yo',
    title: 'Un americano, por favor',
    body: 'Este pedido tiene estructura de fórmula: [bebida] + [cantidad] + 주세요. Domina la fórmula y puedes pedir cualquier cosa en cualquier negocio de Corea. No necesitas más.',
    color: '#3b82f6',
    audioKey: '아메리카노 한 잔 주세요',
    breakdown: [
      { kr: '아메리카노', es: 'americano (préstamo del inglés)' },
      { kr: '한 잔', es: 'una taza / un vaso' },
      { kr: '주세요', es: 'por favor déme' },
    ],
    examples: [
      { kr: '물 한 잔 주세요', es: 'Un vaso de agua, por favor' },
      { kr: '아메리카노 두 잔 주세요', es: 'Dos americanos, por favor', lit: '두 = dos' },
      { kr: '라떼 한 잔 주세요', es: 'Un latte, por favor' },
    ],
  },
  {
    id: 'T6', at: 112, type: 'pattern',
    kr: '주세요',
    rom: 'ju-se-yo',
    title: 'La palabra más útil del viaje',
    body: '주세요 viene de 주다 (dar) + 세요 (imperativo honorífico). Pega cualquier sustantivo delante y tienes un pedido educado y correcto al 100%. Es la navaja suiza del coreano de supervivencia.',
    color: '#ec4899',
    audioKey: '주세요',
    examples: [
      { kr: '물 주세요', es: 'Agua, por favor' },
      { kr: '메뉴 주세요', es: 'El menú, por favor' },
      { kr: '영수증 주세요', es: 'El recibo, por favor' },
      { kr: '봉투 주세요', es: 'Una bolsa, por favor' },
    ],
    tip: 'Fórmula: [cualquier sustantivo] + 주세요 = petición educada garantizada.',
  },
  {
    id: 'T7', at: 125, type: 'vocab',
    kr: '네, 금방 준비해 드릴게요',
    rom: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',
    title: 'Sí, lo preparo enseguida',
    body: 'La respuesta estándar del personal de servicio. El sufijo -드릴게요 es la forma más respetuosa posible de "yo lo haré para usted". Eleva al cliente por encima de quien habla.',
    color: '#14b8a6',
    audioKey: '네, 금방 준비해 드릴게요',
    breakdown: [
      { kr: '네', es: 'sí' },
      { kr: '금방', es: 'enseguida / en un momento' },
      { kr: '준비해', es: 'preparo / preparar' },
      { kr: '드릴게요', es: 'le daré (forma ultra-cortés, honorífica)' },
    ],
    tip: '드릴게요 vs 줄게요 — ambas = "daré", pero 드릴게요 eleva al receptor. Así suena el servicio coreano premium.',
  },
  {
    id: 'T8', at: 135, type: 'vocab',
    kr: '사이즈 뭐로 드릴까요',
    rom: 'sa-i-jeu mwo-ro deu-ril-kka-yo',
    title: '¿Qué tamaño le pongo?',
    body: 'Estructura ultra-cortés de pregunta de servicio. -드릴까요 es la forma más formal de preguntar mientras se ofrece algo. Lo escucharás en todo tipo de comercios coreanos.',
    color: '#f97316',
    audioKey: '사이즈 뭐로 드릴까요',
    breakdown: [
      { kr: '사이즈', es: 'tamaño (del inglés "size")' },
      { kr: '뭐로', es: 'con qué / cuál' },
      { kr: '드릴까요', es: '¿le sirvo? / ¿le doy? (honorífico)' },
    ],
    tip: 'Patrón: [cosa] + 뭐로 드릴까요 = "¿De qué [cosa] le pongo?" → Aparece en menús, tiendas y farmacias.',
  },
  {
    id: 'T9', at: 143, type: 'culture',
    kr: '스몰 · 미디엄 · 라지',
    rom: 'seu-mol · mi-di-eom · la-ji',
    title: 'El inglés transformado por la fonética coreana',
    body: 'El coreano adopta miles de palabras extranjeras y las adapta a su sistema silábico. Esto se llama 외래어 (loanwords). No siempre suenan como el original — pero ya conoces cientos de palabras sin haberlas estudiado.',
    color: '#6366f1',
    examples: [
      { kr: '스몰', es: 'small → S', lit: 'seu-mol' },
      { kr: '미디엄', es: 'medium → M', lit: 'mi-di-eom' },
      { kr: '라지', es: 'large → L', lit: 'la-ji' },
      { kr: '아이스 아메리카노', es: 'iced americano', lit: 'a-i-seu a-me-ri-ka-no' },
    ],
    tip: 'Con 외래어 del inglés ya entiendes cientos de palabras coreanas sin estudiarlas.',
  },
  {
    id: 'T10', at: 157, type: 'vocab',
    kr: '글자가 조금 작아요',
    rom: 'geul-ja-ga jo-geum ja-ga-yo',
    title: 'Las letras son un poco pequeñas',
    body: 'Dos palabras de esta frase las conoces del STEP 002. Tu cerebro las reconoció antes de que terminara la frase. Eso no es memorización — es adquisición real funcionando.',
    color: '#84cc16',
    audioKey: '글자가 조금 작아요',
    recycled: 'STEP 002',
    breakdown: [
      { kr: '글자', es: 'letras / caracteres (del STEP 002 ✓)' },
      { kr: '가', es: 'partícula de sujeto (marca quién hace qué)' },
      { kr: '조금', es: 'un poco (del STEP 002 ✓)' },
      { kr: '작아요', es: 'es pequeño/a' },
    ],
    tip: 'El reciclaje funciona: 2 de 4 palabras ya las tenías. Así acelera la adquisición.',
  },
  {
    id: 'T11', at: 168, type: 'vocab',
    kr: '이름이 뭐예요',
    rom: 'i-reu-mi mwo-ye-yo',
    title: '¿Cómo te llamas?',
    body: 'Estructura copula: [sustantivo] + 이/가 + 뭐예요. Literalmente "El nombre, ¿qué es?". Esta estructura volverá en docenas de contextos del STEP 007 — ya la tienes lista.',
    color: '#f43f5e',
    audioKey: '이름이 뭐예요',
    breakdown: [
      { kr: '이름', es: 'nombre' },
      { kr: '이', es: 'partícula de sujeto (después de consonante)' },
      { kr: '뭐', es: '¿qué? (ya la conoces del STEP 002 ✓)' },
      { kr: '예요', es: '¿es? (copula interrogativa)' },
    ],
    examples: [
      { kr: '저는 [nombre]이에요', es: 'Me llamo [nombre]', lit: 'si el nombre termina en consonante: 이에요' },
      { kr: '저는 [nombre]예요', es: 'Me llamo [nombre]', lit: 'si termina en vocal: 예요' },
    ],
  },
  {
    id: 'T12', at: 184, type: 'vocab',
    kr: '여기 있습니다',
    rom: 'yeo-gi it-seum-ni-da',
    title: 'Aquí tiene — la entrega formal',
    body: '여기 있습니다 es el protocolo de entrega. El personal lo dice mientras pasa el objeto con ambas manos. El gesto de dos manos es tan importante como las palabras — completa el mensaje de respeto.',
    color: '#0ea5e9',
    audioKey: '여기 있습니다',
    breakdown: [
      { kr: '여기', es: 'aquí' },
      { kr: '있습니다', es: 'existe / hay (formal, -ㅂ니다)' },
    ],
    examples: [
      { kr: '여기 있어요', es: 'Aquí está (educado, versión casual)', lit: '-어요 = nivel -요' },
      { kr: '여기요!', es: '¡Oiga! / ¡Aquí! (llamar al personal)' },
    ],
  },
  {
    id: 'T13', at: 190, type: 'vocab',
    kr: '감사합니다',
    rom: 'gam-sa-ham-ni-da',
    title: 'Gracias — con reverencia de 15°',
    body: 'La forma más formal de agradecer. Siempre acompañada de una reverencia mínima. Recibir algo con dos manos + decir 감사합니다 + ligera reverencia = nivel máximo de cortesía coreana en un intercambio cotidiano.',
    color: '#a855f7',
    audioKey: '감사합니다',
    breakdown: [
      { kr: '감사', es: 'gratitud / agradecimiento' },
      { kr: '합니다', es: 'hago (formal, primera persona)' },
    ],
    examples: [
      { kr: '고마워요', es: 'Gracias (educado-casual, para conocidos)' },
      { kr: '고마워', es: 'Gracias (muy casual, solo amigos íntimos)' },
    ],
    tip: 'Regla de oro: recibe SIEMPRE con ambas manos en Corea. 감사합니다 + dos manos + leve reverencia = respeto completo.',
  },
  {
    id: 'T14', at: 246, type: 'survival',
    kr: '여기요 / 저기요',
    rom: 'yeo-gi-yo / jeo-gi-yo',
    title: 'Llama al mesero — no es grosero',
    body: 'En Corea, llamar al personal con 여기요 o 저기요 es perfectamente normal y correcto. No hay campanas en todos los lugares. Alza la mano, di claramente, y el personal responde.',
    color: '#d97706',
    examples: [
      { kr: '여기요!', es: '¡Oiga! / ¡Aquí! (personal cercano)' },
      { kr: '저기요!', es: '¡Oiga! / ¡Disculpe! (personal lejano)', lit: '저기 = allá' },
    ],
    tip: 'Cafés modernos tienen botón en la mesa. Si no hay botón — 여기요 sin vergüenza.',
  },
  {
    id: 'T15', at: 255, type: 'survival',
    kr: '이거 얼마예요',
    rom: 'i-geo eol-ma-ye-yo',
    title: '¿Cuánto cuesta esto?',
    body: 'Frase de supervivencia universal para mercados, tiendas y restaurantes. Señala el objeto con el dedo mientras la dices y no necesitas más contexto.',
    color: '#06b6d4',
    breakdown: [
      { kr: '이거', es: 'esto (cerca del hablante)' },
      { kr: '얼마', es: 'cuánto (dinero)' },
      { kr: '예요', es: '¿es? (copula)' },
    ],
    examples: [
      { kr: '저거 얼마예요?', es: '¿Cuánto cuesta eso? (lejos)', lit: '저거 = eso allá' },
      { kr: '다 얼마예요?', es: '¿Cuánto es todo junto?', lit: '다 = todo' },
    ],
  },
  {
    id: 'T16', at: 262, type: 'survival',
    kr: '화장실이 어디예요',
    rom: 'hwa-jang-shi-ri eo-di-ye-yo',
    title: '¿Dónde está el baño?',
    body: '화장실 significa literalmente "sala de maquillaje" (화장 = maquillaje, 실 = sala). Y 어디 ya la conoces del STEP 001. Una de las frases más importantes para sobrevivir el primer día en Corea.',
    color: '#22c55e',
    recycled: 'STEP 001 (어디)',
    breakdown: [
      { kr: '화장실', es: 'baño (lit: sala de maquillaje)', },
      { kr: '이', es: 'partícula de sujeto' },
      { kr: '어디', es: 'dónde (del STEP 001 ✓)' },
      { kr: '예요', es: '¿es? (copula)' },
    ],
    tip: 'Truco: 화장 (makeup) + 실 (sala) = donde te arreglas. ¡Nunca lo olvidarás!',
  },
  {
    id: 'T17', at: 283, type: 'survival',
    kr: '저는 외국인이에요',
    rom: 'jeo-neun oe-gug-i-ni-e-yo',
    title: 'Soy extranjero/a — la frase salvavidas',
    body: 'Al decirla, toda la tensión social desaparece. Los coreanos simplifican su lenguaje automáticamente, hablan más despacio, o cambian al inglés. Es el código universal que resetea el radar social a tu favor.',
    color: '#64748b',
    recycled: 'STEP 001 (저는)',
    breakdown: [
      { kr: '저는', es: 'yo (formal) — del STEP 001 ✓' },
      { kr: '외국인', es: 'extranjero/a (외국 = país extranjero + 인 = persona)' },
      { kr: '이에요', es: 'soy / es (copula, después de consonante)' },
    ],
    tip: 'Bonus: "한국어 잘 못해요" (no hablo bien coreano) funciona como escudo mágico adicional.',
  },
  {
    id: 'T18', at: 325, type: 'culture',
    kr: '사회적 언어',
    title: 'El idioma que lee la sociedad',
    body: 'El coreano no es solo vocabulario y gramática — es un sistema social codificado en sílabas. Cada sufijo lleva información sobre jerarquía. Cada partícula define la relación. Aprender coreano es aprender a leer ese radar invisible que los coreanos usan en cada conversación.',
    color: '#6c63ff',
    tip: 'Ya tienes la primera señal activa. El STEP 004 pondrá todo esto en movimiento.',
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── Card component ───────────────────────────────────────────────────────────
function TimelineCard({ item, isLatest, onAudio }: {
  item: TimelineItem; isLatest: boolean; onAudio: (key: string) => void;
}) {
  const cfg = TYPE_CONFIG[item.type];
  const rgb = hexToRgb(item.color);

  return (
    <div style={{
      borderRadius: 14,
      border: `2px solid ${isLatest ? item.color : 'var(--line-soft)'}`,
      background: isLatest ? `rgba(${rgb},0.06)` : 'var(--bg)',
      opacity: isLatest ? 1 : 0.45,
      transition: 'opacity 0.3s, border-color 0.3s',
      animation: isLatest ? 'cardIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      boxShadow: isLatest ? `0 4px 24px rgba(${rgb},0.14), 0 0 0 1px rgba(${rgb},0.08)` : 'none',
      overflow: 'hidden',
    }}>

      {/* Header strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        background: isLatest ? `rgba(${rgb},0.10)` : 'var(--bg-2)',
        borderBottom: `1px solid rgba(${rgb},0.15)`,
      }}>
        <span style={{ fontSize: 13 }}>{cfg.icon}</span>
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: isLatest ? item.color : 'var(--muted)',
        }}>
          {cfg.label}
        </span>
        {item.recycled && isLatest && (
          <span style={{
            marginLeft: 'auto', fontSize: 9, fontWeight: 700,
            background: 'rgba(45,155,78,0.12)', border: '1px solid rgba(45,155,78,0.3)',
            color: '#2d9b4e', borderRadius: 100, padding: '2px 8px',
          }}>
            ♻ reciclado · {item.recycled}
          </span>
        )}
        <span style={{
          marginLeft: item.recycled && isLatest ? 0 : 'auto',
          fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)',
        }}>
          {fmt(item.at)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: isLatest ? '16px 16px 14px' : '12px 16px 12px' }}>

        {/* Korean text */}
        <p style={{
          margin: '0 0 2px',
          fontSize: isLatest ? 26 : 18,
          fontWeight: 800,
          fontFamily: "'Noto Sans KR', sans-serif",
          color: isLatest ? item.color : 'var(--ink)',
          lineHeight: 1.2,
          transition: 'font-size 0.3s',
          textShadow: isLatest ? `0 0 40px rgba(${rgb},0.3)` : 'none',
        }}>
          {item.kr}
        </p>

        {/* Romanization */}
        {item.rom && (
          <p style={{ margin: '0 0 6px', fontFamily: 'var(--mono)', fontSize: 10, color: isLatest ? item.color : 'var(--muted)', opacity: 0.7 }}>
            {item.rom}
          </p>
        )}

        {/* Title */}
        <p style={{ margin: '0 0 8px', fontSize: isLatest ? 14 : 12, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
          {item.title}
        </p>

        {/* --- LATEST ONLY: rich content --- */}
        {isLatest && (
          <>
            {/* Body text */}
            <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.body}
            </p>

            {/* Word breakdown chips */}
            {item.breakdown && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                  Desglose
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.breakdown.map((part, i) => (
                    <div key={i} style={{
                      background: `rgba(${rgb},0.08)`,
                      border: `1px solid rgba(${rgb},0.2)`,
                      borderRadius: 8, padding: '5px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1 }}>
                        {part.kr}
                      </span>
                      <span style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3, maxWidth: 100 }}>
                        {part.es}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison table */}
            {item.table && (
              <div style={{ marginBottom: 12, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${item.table.headers.length}, 1fr)` }}>
                  {item.table.headers.map(h => (
                    <div key={h} style={{ padding: '7px 10px', background: item.color, color: '#fff', fontSize: 10, fontWeight: 700 }}>
                      {h}
                    </div>
                  ))}
                  {item.table.rows.map((row, ri) =>
                    row.map((cell, ci) => (
                      <div key={`${ri}-${ci}`} style={{
                        padding: '8px 10px', fontSize: 11, color: 'var(--ink)',
                        background: ri % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)',
                        borderTop: '1px solid var(--line-soft)',
                        fontWeight: ci === 0 ? 600 : 400,
                      }}>
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Examples */}
            {item.examples && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                  Ejemplos
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {item.examples.map((ex, i) => (
                    <div key={i} style={{
                      background: `rgba(${rgb},0.05)`,
                      border: `1px solid rgba(${rgb},0.15)`,
                      borderRadius: 8, padding: '7px 10px',
                      display: 'flex', flexDirection: 'column', gap: 1,
                    }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif" }}>
                        {ex.kr}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--ink)' }}>
                        {ex.es}
                        {ex.lit && <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 10 }}>{ex.lit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tip */}
            {item.tip && (
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                padding: '8px 10px',
                background: `rgba(${rgb},0.06)`,
                borderRadius: 8, marginBottom: 10,
                borderLeft: `3px solid ${item.color}`,
              }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--ink)', lineHeight: 1.6 }}>{item.tip}</p>
              </div>
            )}

            {/* Audio button */}
            {item.audioKey && (
              <button
                type="button"
                onClick={() => onAudio(item.audioKey!)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  background: `rgba(${rgb},0.1)`,
                  border: `1.5px solid rgba(${rgb},0.3)`,
                  borderRadius: 100, color: item.color,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                🔊 Escuchar de nuevo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Segment map ──────────────────────────────────────────────────────────────
const SEGMENTS = [
  { label: 'El radar social', at: 0 },
  { label: 'Bienvenida', at: 52 },
  { label: 'Formalidad', at: 75 },
  { label: 'Pedido', at: 104 },
  { label: '주세요', at: 112 },
  { label: 'Respuesta servicio', at: 125 },
  { label: 'Tamaño', at: 135 },
  { label: 'Loanwords', at: 143 },
  { label: 'Reciclaje', at: 157 },
  { label: 'Nombre', at: 168 },
  { label: 'Entrega', at: 184 },
  { label: 'Supervivencia', at: 246 },
  { label: 'Cierre', at: 325 },
];

function activeSegment(t: number) {
  let i = 0;
  for (let j = 0; j < SEGMENTS.length; j++) { if (t >= SEGMENTS[j].at) i = j; else break; }
  return SEGMENTS[i].label;
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props { onComplete?: () => void }

export default function Activation003({ onComplete }: Props) {
  const [phase, setPhase]           = useState<'intro' | 'listening' | 'questions' | 'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]     = useState(325);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [rate, setRate]             = useState(1);
  const [canSkip, setCanSkip]       = useState(false);
  const [answers, setAnswers]       = useState<Record<string, string>>({});
  const [checked, setChecked]       = useState(false);
  const [score, setScore]           = useState(0);
  const [newPulse, setNewPulse]     = useState(false);

  const audioRef      = useRef<HTMLAudioElement>(null);
  const bottomRef     = useRef<HTMLDivElement>(null);
  const autoPlayedRef = useRef(new Set<string>());
  const pulseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleItems = TIMELINE.filter(item => currentTime >= item.at);

  // Enable skip after 60s
  useEffect(() => {
    if (phase !== 'listening') return;
    const t = setTimeout(() => setCanSkip(true), 60_000);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-play audio when new vocab card appears
  useEffect(() => {
    if (phase !== 'listening') return;
    const latest = visibleItems[visibleItems.length - 1];
    if (!latest?.audioKey) return;
    if (autoPlayedRef.current.has(latest.id)) return;
    autoPlayedRef.current.add(latest.id);
    // Pulse the player
    setNewPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setNewPulse(false), 2000);
    // Auto-scroll + auto-play
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
    const t = setTimeout(() => playAudio(latest.audioKey!), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length, phase]);

  // Auto-scroll also for non-audio cards
  useEffect(() => {
    if (phase !== 'listening') return;
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause(); else a.play().catch(() => {});
  }

  function setPlaybackRate(r: number) {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration > 0) audioRef.current.currentTime = ratio * duration;
  }

  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  }

  function handleCheckAnswers() {
    if (!QUESTIONS.every(q => answers[q.id]) || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
  }

  const allAnswered = QUESTIONS.every(q => answers[q.id]);
  const progress    = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ── INTRO ───────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 01 DE 11 · Activación
        </p>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
          Cortesía — Tu primer día en Corea
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
          En Corea, la cortesía no es opcional — está integrada en cada frase. Escucha este podcast desde una cafetería en Seúl y activa tu radar social desde la primera sílaba.
        </p>
        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>
            Cómo funciona
          </p>
          <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Escucha el podcast — 5 minutos de inmersión en coreano real',
              'Las tarjetas aparecen solas a medida que avanza el audio y el audio se reproduce automáticamente',
              'Cada tarjeta profundiza más allá del podcast: desglose de palabras, ejemplos y tips culturales',
              'Al terminar, 3 preguntas para verificar lo que absorbiste',
            ].map(text => (
              <li key={text} style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</li>
            ))}
          </ol>
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

  // ── LISTENING ────────────────────────────────────────────────────────────────
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
          onRateChange={() => {}}
        />

        {/* ── Premium player ──────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
          borderRadius: 16, padding: '1.25rem 1.25rem 1rem',
          marginBottom: 20, position: 'sticky', top: 0, zIndex: 10,
          boxShadow: newPulse
            ? '0 8px 40px rgba(108,99,255,0.5), 0 0 0 2px rgba(108,99,255,0.4)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Equalizer bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2, background: '#6c63ff',
                    height: isPlaying ? `${6 + h * 10}px` : '4px',
                    animation: isPlaying ? `eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                    transition: 'height 0.15s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>
                PODCAST · STEP 003
              </span>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          {/* Segment name */}
          <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Segmento: </span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{activeSegment(currentTime)}</span>
          </p>

          {/* Progress bar (clickable) */}
          <div
            onClick={handleProgressClick}
            style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 12, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s linear' }} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={togglePlay}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                border: 'none', color: '#fff', fontSize: 16,
                cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(108,99,255,0.4)',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* Speed buttons */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[0.75, 1, 1.25, 1.5].map(r => (
                <button key={r} type="button" onClick={() => setPlaybackRate(r)} style={{
                  padding: '3px 8px', borderRadius: 6,
                  border: `1px solid ${rate === r ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`,
                  background: rate === r ? 'rgba(108,99,255,0.3)' : 'transparent',
                  color: rate === r ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                  fontSize: 10, fontWeight: rate === r ? 700 : 400, cursor: 'pointer',
                }}>
                  {r}×
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Card counter */}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--mono)' }}>
              {visibleItems.length}/{TIMELINE.length} tarjetas
            </span>

            {canSkip && (
              <button
                type="button"
                onClick={() => setPhase('questions')}
                style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
              >
                Saltar →
              </button>
            )}
          </div>
        </div>

        {/* ── Card feed ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎧</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                Reproduce el audio — las tarjetas aparecen y suenan solas
              </p>
            </div>
          )}

          {visibleItems.map((item, i) => (
            <TimelineCard
              key={item.id}
              item={item}
              isLatest={i === visibleItems.length - 1}
              onAudio={playAudio}
            />
          ))}
          <div ref={bottomRef} style={{ height: 1 }} />
        </div>

        {/* CSS animations */}
        <style>{`
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(18px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes eq0 { from { height: 6px; } to { height: 14px; } }
          @keyframes eq1 { from { height: 4px; } to { height: 11px; } }
          @keyframes eq2 { from { height: 8px; } to { height: 15px; } }
          @keyframes eq3 { from { height: 3px; } to { height: 10px; } }
          @keyframes eq4 { from { height: 6px; } to { height: 13px; } }
        `}</style>
      </section>
    );
  }

  // ── QUESTIONS ─────────────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
          Comprensión global
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Tres preguntas rápidas. Confía en lo que escuchaste.
        </p>

        {QUESTIONS.map(q => (
          <article key={q.id} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
              {q.q}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map(opt => {
                const sel       = answers[q.id] === opt;
                const isCorrect = opt === q.correct;
                const showOk    = checked && isCorrect;
                const showErr   = checked && sel && !isCorrect;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    disabled={checked}
                    style={{
                      padding: '10px 12px',
                      background: showOk ? 'rgba(45,155,78,0.08)' : showErr ? 'rgba(220,53,69,0.06)' : sel ? 'rgba(108,99,255,0.07)' : 'var(--bg)',
                      border: `1.5px solid ${showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : 'var(--line-soft)'}`,
                      borderRadius: 9, fontSize: 13, textAlign: 'center',
                      cursor: checked ? 'default' : 'pointer',
                      color: showOk ? '#2d9b4e' : showErr ? '#dc3545' : sel ? '#6c63ff' : 'var(--ink)',
                      fontWeight: sel ? 600 : 400, transition: 'all 0.12s',
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
            <div style={{ background: score === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${score === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: score === 3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {score === 3 ? 'Perfecto. Tu radar social ya está activo.' : score >= 2 ? 'Muy bien. Casi todo.' : 'Normal para la primera vez. El siguiente paso lo refuerza.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setPhase('complete'); onComplete?.(); }}
              style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Continuar →
            </button>
          </div>
        )}
      </section>
    );
  }

  // ── COMPLETE ──────────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', border: '2px solid #6c63ff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
        ✓
      </div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Activación completada
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Ya tienes el radar social activo. Ahora vamos a las palabras clave del café.
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
