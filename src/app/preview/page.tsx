'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

// ─── Theme ────────────────────────────────────────────────────────────────────
type Theme = 'light' | 'dark';

function hexRgb(h: string): [number, number, number] {
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
}

// ─── Real Apple Liquid Glass ──────────────────────────────────────────────────
// Light: near-white translucent · Dark: near-black translucent
// Specular on top edge only, like physical glass catching light
function glass(t: Theme, extra: CSSProperties = {}): CSSProperties {
  const l = t === 'light';
  return {
    background:        l ? 'rgba(255,255,255,0.70)' : 'rgba(16,16,24,0.72)',
    backdropFilter:    'blur(52px) saturate(1.9)',
    WebkitBackdropFilter: 'blur(52px) saturate(1.9)',
    borderTop:    l ? '1px solid rgba(255,255,255,0.92)' : '1px solid rgba(255,255,255,0.14)',
    borderLeft:   l ? '1px solid rgba(255,255,255,0.72)' : '1px solid rgba(255,255,255,0.08)',
    borderRight:  l ? '1px solid rgba(255,255,255,0.55)' : '1px solid rgba(255,255,255,0.06)',
    borderBottom: l ? '1px solid rgba(0,0,0,0.06)'      : '1px solid rgba(0,0,0,0.45)',
    boxShadow:    l
      ? 'inset 0 1.5px 0 rgba(255,255,255,1), 0 2px 12px rgba(0,0,0,0.07), 0 10px 40px rgba(0,0,0,0.05)'
      : 'inset 0 1.5px 0 rgba(255,255,255,0.16), 0 2px 16px rgba(0,0,0,0.45), 0 12px 48px rgba(0,0,0,0.35)',
    borderRadius: 22,
    ...extra,
  };
}

function glassDeep(t: Theme, extra: CSSProperties = {}): CSSProperties {
  const l = t === 'light';
  return glass(t, {
    background: l ? 'rgba(255,255,255,0.85)' : 'rgba(22,22,32,0.80)',
    boxShadow:  l
      ? 'inset 0 2px 0 rgba(255,255,255,1), 0 4px 24px rgba(0,0,0,0.1), 0 20px 60px rgba(0,0,0,0.06)'
      : 'inset 0 2px 0 rgba(255,255,255,0.2), 0 4px 28px rgba(0,0,0,0.55), 0 24px 80px rgba(0,0,0,0.4)',
    borderRadius: 28,
    ...extra,
  });
}

function glassAccent(t: Theme, color: string, extra: CSSProperties = {}): CSSProperties {
  const l = t === 'light';
  const [r, g, b] = hexRgb(color);
  return {
    background:       l ? `rgba(${r},${g},${b},0.12)` : `rgba(${r},${g},${b},0.18)`,
    backdropFilter:   'blur(28px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
    borderTop:    l ? `1px solid rgba(${r},${g},${b},0.45)` : `1px solid rgba(${r},${g},${b},0.38)`,
    borderLeft:   l ? `1px solid rgba(${r},${g},${b},0.32)` : `1px solid rgba(${r},${g},${b},0.28)`,
    borderRight:  l ? `1px solid rgba(${r},${g},${b},0.22)` : `1px solid rgba(${r},${g},${b},0.18)`,
    borderBottom: l ? `1px solid rgba(${r},${g},${b},0.18)` : `1px solid rgba(${r},${g},${b},0.12)`,
    boxShadow:    l
      ? `inset 0 1.5px 0 rgba(${r},${g},${b},0.5), 0 2px 12px rgba(${r},${g},${b},0.12)`
      : `inset 0 1.5px 0 rgba(${r},${g},${b},0.3), 0 2px 16px rgba(${r},${g},${b},0.18)`,
    borderRadius: 16,
    ...extra,
  };
}

function ink(t: Theme, level: 1|2|3 = 1): string {
  const l = t === 'light';
  if (level === 1) return l ? 'rgba(0,0,0,0.88)' : 'rgba(255,255,255,0.92)';
  if (level === 2) return l ? 'rgba(0,0,0,0.54)' : 'rgba(255,255,255,0.52)';
  return                    l ? 'rgba(0,0,0,0.32)' : 'rgba(255,255,255,0.30)';
}

function pageBg(t: Theme): string {
  const l = t === 'light';
  return l
    ? `radial-gradient(ellipse 80% 55% at 8% 8%,   rgba(167,139,250,0.50) 0%, transparent 55%),
       radial-gradient(ellipse 65% 50% at 93% 92%, rgba(96,165,250,0.44)  0%, transparent 55%),
       radial-gradient(ellipse 50% 40% at 55% 38%, rgba(236,72,153,0.26)  0%, transparent 52%),
       #eeeef6`
    : `radial-gradient(ellipse 80% 55% at 8% 8%,   rgba(109,40,217,0.32)  0%, transparent 55%),
       radial-gradient(ellipse 65% 50% at 93% 92%, rgba(37,99,235,0.28)   0%, transparent 55%),
       radial-gradient(ellipse 50% 40% at 55% 38%, rgba(190,24,93,0.20)   0%, transparent 52%),
       #07070e`;
}

// ─── Exercise engine ──────────────────────────────────────────────────────────
interface Ex {
  id: string;
  tag: string; tagColor: string;
  ko?: string;
  prompt: string; sub?: string;
  options: string[];
  correct: string;
  explanation: string;
  audio?: string;
}

// ─── Explain card ─────────────────────────────────────────────────────────────
interface Row { ko: string; rom: string; es: string; badge: string; badgeColor: string; audio?: string }
interface ExplainCard {
  title: string; subtitle?: string;
  rows?: Row[];
  note?: string;
  table?: { headers: string[]; rows: string[][] };
}

// ─── Stage definitions ────────────────────────────────────────────────────────
interface Stage {
  num: number; emoji: string; name: string; sub: string; color: string;
  built?: boolean; builtDesc?: string;
  explains?: ExplainCard[];
  exercises?: Ex[];
}

const STAGES: Stage[] = [
  /* ── 1 — Activación ─────────────────────────────────── */
  {
    num:1, emoji:'🎙️', name:'Activación', sub:'Podcast + tarjetas progresivas', color:'#6c63ff',
    built:true, builtDesc:'Audio del podcast con tarjetas que aparecen según el tiempo de reproducción. Cada tarjeta tiene tipo (vocabulario / gramática / cultura / supervivencia), descomposición, tabla de niveles y tip. Auto-play de audio al aparecer.',
    exercises:[
      { id:'s1e1', tag:'activación', tagColor:'#6c63ff',
        ko:'어서 오세요', prompt:'¿Qué significa esta bienvenida?', sub:'La primera frase del café',
        options:['¡Bienvenido/a! (bienvenida de servicio)','¿Cómo está usted?','Por favor, pase','Hasta luego'],
        correct:'¡Bienvenido/a! (bienvenida de servicio)',
        explanation:'어서 오세요 = bienvenida automática en tiendas. No requiere respuesta — es un reflejo del servicio coreano.',
        audio:'어서 오세요' },
      { id:'s1e2', tag:'cultura', tagColor:'#f59e0b',
        prompt:'El coreano tiene 7 niveles de formalidad. En la vida diaria se usan principalmente:',
        options:['합쇼체 (formal) · 해요체 (educado) · 해체 (casual)','Solo un nivel universal','5 niveles según la ciudad','Depende del día de la semana'],
        correct:'합쇼체 (formal) · 해요체 (educado) · 해체 (casual)',
        explanation:'En el café viste los 3: 있습니다 (합쇼체, barista entregando) · 있어요/이에요 (해요체, conversación) · sin -요 entre amigos (해체).' },
    ],
  },

  /* ── 2 — Adquisición guiada ──────────────────────────── */
  {
    num:2, emoji:'🃏', name:'Adquisición guiada', sub:'14 tarjetas con audio real', color:'#8b5cf6',
    built:true, builtDesc:'Tarjetas navegables con imagen, hangul, romanización, traducción y botones de audio (velocidad normal y lenta). Indicador de "ya conoces esta" para vocabulario reciclado.',
    exercises:[
      { id:'s2e1', tag:'vocabulario', tagColor:'#8b5cf6',
        ko:'주세요', prompt:'¿Cuál es la función de 주세요?', sub:'La palabra más útil del café',
        options:['Convierte cualquier cosa en una petición educada','Significa "gracias"','Es un saludo formal','Pregunta por el precio'],
        correct:'Convierte cualquier cosa en una petición educada',
        explanation:'[producto] + 주세요 = "deme X, por favor". Patrón universal: señala algo + 주세요 → funciona en cualquier tienda de Corea.',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s2e2', tag:'vocabulario', tagColor:'#8b5cf6',
        ko:'금방', prompt:'¿Qué significa 금방?',
        options:['Enseguida / ahora mismo','Mañana','Lentamente','Por favor'],
        correct:'Enseguida / ahora mismo',
        explanation:'금방 apareció en "네, 금방 준비해 드릴게요" — la barista prometiendo el café rápidamente.',
        audio:'네, 금방 준비해 드릴게요' },
    ],
  },

  /* ── 3 — Reconocimiento ──────────────────────────────── */
  {
    num:3, emoji:'🎯', name:'Reconocimiento', sub:'Quiz de 4 niveles con audio', color:'#06b6d4',
    built:true, builtDesc:'Nivel 1: coreano→español. Nivel 2: español→coreano. Nivel 3: audio ciego→coreano. Nivel 4: coreano→romanización. Auto-play en L1 y L3. Badge "nuevo" en vocabulario de este step.',
    exercises:[
      { id:'s3e1', tag:'reconocimiento', tagColor:'#06b6d4',
        ko:'이름이 뭐예요?', prompt:'¿Qué pregunta la barista?',
        options:['¿Cuál es su nombre?','¿Qué tamaño quiere?','¿Qué va a pedir?','¿Dónde está el baño?'],
        correct:'¿Cuál es su nombre?',
        explanation:'이름 = nombre. 뭐예요 = ¿qué es? En el café piden el nombre para llamarte cuando el pedido está listo.',
        audio:'이름이 뭐예요' },
      { id:'s3e2', tag:'reconocimiento', tagColor:'#06b6d4',
        prompt:'Escucha y elige: ¿qué frase sonó?', sub:'Audio: 저는 하은이에요',
        options:['저는 하은이에요','저는 학생이에요','이름이 뭐예요','감사합니다'],
        correct:'저는 하은이에요',
        explanation:'저는 하은이에요 = Me llamo Haeun. 이에요 = verbo de identidad (nivel educado).',
        audio:'저는 하은이에요' },
    ],
  },

  /* ── 4 — Escucha sobrevivible ────────────────────────── */
  {
    num:4, emoji:'📹', name:'Escucha sobrevivible', sub:'Video real del café', color:'#f59e0b',
    built:true, builtDesc:'Video de la conversación en el café con etiqueta de escena en tiempo real. Tres preguntas de comprensión después de ver. Frases recapituladoras con audio.',
    exercises:[
      { id:'s4e1', tag:'comprensión', tagColor:'#f59e0b',
        prompt:'¿Qué pide la cliente en la cafetería?',
        options:['Un americano','Un té','Un cappuccino','Un café con leche'],
        correct:'Un americano',
        explanation:'아메리카노 한 잔 주세요 — la primera cosa que dijo Haeun al entrar al café.',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s4e2', tag:'comprensión', tagColor:'#f59e0b',
        prompt:'¿Por qué Haeun dice "글자가 조금 작아요"?',
        options:['No puede leer el menú con claridad','Quiere un tamaño pequeño','Le dice su nombre a la barista','Agradece el café'],
        correct:'No puede leer el menú con claridad',
        explanation:'글자가 조금 작아요 = las letras son un poco pequeñas. Forma indirecta coreana de decir "no puedo leer el menú" sin ser brusca.',
        audio:'글자가 조금 작아요' },
    ],
  },

  /* ── 5 — Contexto primero ────────────────────────────── */
  {
    num:5, emoji:'💬', name:'Contexto primero', sub:'Chat del café frase a frase', color:'#22c55e',
    built:true, builtDesc:'11 mensajes de WhatsApp animados que revelan la conversación secuencialmente. Barista a la izquierda, Haeun a la derecha. Audio automático al aparecer. Toca cada burbuja para ver formalidad, descomposición y tip.',
    exercises:[
      { id:'s5e1', tag:'contexto', tagColor:'#22c55e',
        ko:'네, 금방 준비해 드릴게요',
        prompt:'¿Por qué usa 드릴게요 y no 줄게요?',
        options:['드릴게요 es reverencial para clientes/superiores','줄게요 está mal escrito','Es lo mismo, solo varía la región','드릴게요 es más rápido de pronunciar'],
        correct:'드릴게요 es reverencial para clientes/superiores',
        explanation:'드리다 vs 주다: ambos = "dar", pero 드리다 es la versión reverencial. Lo usan empleados con clientes y hijos con padres. El trato hacia arriba en la jerarquía.',
        audio:'네, 금방 준비해 드릴게요' },
    ],
  },

  /* ── 6 — Descubre el patrón ──────────────────────────── */
  {
    num:6, emoji:'🔍', name:'Descubre el patrón', sub:'이다 — el verbo de identidad', color:'#6c63ff',
    explains:[
      {
        title:'이다 — "ser / identificar"',
        subtitle:'Ya lo viste en el café. Ahora lo entiendes.',
        rows:[
          { ko:'저는 하은이에요',  rom:'jeo-neun ha-eu-ni-e-yo',  es:'Me llamo Haeun',      badge:'해요체',  badgeColor:'#6c63ff', audio:'저는 하은이에요' },
          { ko:'이것은 커피예요', rom:'i-geo-seun keo-pi-ye-yo',  es:'Esto es café',        badge:'해요체',  badgeColor:'#6c63ff' },
          { ko:'저는 학생입니다', rom:'jeo-neun hak-saeng-im-ni-da', es:'Soy estudiante',  badge:'합쇼체', badgeColor:'#f59e0b' },
        ],
        note:'이다 clasifica e identifica. El sufijo cambia según la formalidad — la raíz 이 nunca cambia.',
        table:{
          headers:['Nivel','Sufijo (consonante)','Sufijo (vocal)','Contexto'],
          rows:[
            ['합쇼체','입니다','입니다','Entrevista, discurso, documentos'],
            ['해요체','이에요','예요','Café, extraños, internet ★'],
            ['casual','이야','야','Amigos íntimos, familia'],
          ],
        },
      },
    ],
    exercises:[
      { id:'s6e1', tag:'이다', tagColor:'#6c63ff',
        ko:'이것은 아메리카노___.',
        prompt:'아메리카노 termina en vocal (노) — ¿cuál usas?',
        options:['예요','이에요','있어요','주세요'],
        correct:'예요',
        explanation:'Vocal final → 예요. Consonante final → 이에요. 아메리카노 termina en 노 (vocal) → 예요. ¡Esta es la única regla que necesitas memorizar de 이다!',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s6e2', tag:'이다', tagColor:'#6c63ff',
        ko:'저는 학생___.',
        prompt:'학생 termina en consonante (ㅇ) — ¿cuál usas?',
        options:['이에요','예요','있어요','없어요'],
        correct:'이에요',
        explanation:'학생 termina en ㅇ (consonante) → 이에요. En coreano esta distinción es tan automática como "un" vs "una" en español.' },
      { id:'s6e3', tag:'이다 − formalidad', tagColor:'#6c63ff',
        prompt:'Estás en una entrevista de trabajo en Seúl. Te presentas: "Soy diseñador/a".',
        sub:'¿Qué nivel usas?',
        options:['저는 디자이너야 (casual)','저는 디자이너예요 (해요체)','저는 디자이너입니다 (합쇼체)'],
        correct:'저는 디자이너입니다 (합쇼체)',
        explanation:'Entrevista = contexto formal máximo → 입니다. Usar 이에요 no sería incorrecto, pero 입니다 muestra que entiendes los códigos sociales coreanos.' },
      { id:'s6e4', tag:'이다 − negativo', tagColor:'#e879f9',
        ko:'저는 바리스타가 아니에요.',
        prompt:'¿Cuál es el negativo de 이에요?',
        options:['아니에요','없어요','안 이에요','모르겠어요'],
        correct:'아니에요',
        explanation:'"No soy X" → 아니에요. ¡No confundas con 없어요 (no existe)! Son conceptualmente distintos: identidad vs existencia.' },
    ],
  },

  /* ── 7 — Micro explicación ───────────────────────────── */
  {
    num:7, emoji:'📖', name:'Micro explicación', sub:'있다/없다 — existencia, ubicación, posesión', color:'#f59e0b',
    explains:[
      {
        title:'있다/없다 — "existir · estar · tener"',
        subtitle:'Un solo verbo que en español necesita tres palabras.',
        rows:[
          { ko:'여기 있습니다',     rom:'yeo-gi it-seum-ni-da',     es:'Aquí tiene / Está aquí',      badge:'합쇼체', badgeColor:'#f59e0b', audio:'여기 있습니다' },
          { ko:'화장실이 있어요',   rom:'hwa-jang-sil-i i-sseo-yo',  es:'Hay baño / El baño está aquí', badge:'해요체', badgeColor:'#6c63ff' },
          { ko:'돈이 있어요',       rom:'don-i i-sseo-yo',           es:'Tengo dinero / Hay dinero',    badge:'해요체', badgeColor:'#6c63ff' },
          { ko:'설탕이 없어요',     rom:'seol-tang-i eop-seo-yo',    es:'No hay azúcar',                badge:'해요체', badgeColor:'#6c63ff' },
        ],
        note:'있다 cubre tres verbos del español: hay · estar · tener. 없다 es su negativo completo.',
        table:{
          headers:['','있다 (+)','없다 (−)'],
          rows:[
            ['합쇼체','있습니다','없습니다'],
            ['해요체','있어요','없어요'],
            ['casual','있어','없어'],
          ],
        },
      },
    ],
    exercises:[
      { id:'s7e1', tag:'있다', tagColor:'#f59e0b',
        ko:'화장실이 ___ ?',
        prompt:'"¿Hay baño?" / "¿Dónde está el baño?" — ¿qué verbo?',
        options:['있어요','이에요','없어요','아니에요'],
        correct:'있어요',
        explanation:'있어요 = existencia/ubicación. No es 이에요 (eso clasificaría el baño como algo). 있어요 dice que el baño EXISTE en algún lugar.' },
      { id:'s7e2', tag:'없다', tagColor:'#f59e0b',
        ko:'오늘 설탕이 ___ .',
        prompt:'"Hoy no hay azúcar"',
        options:['없어요','있어요','아니에요','이에요'],
        correct:'없어요',
        explanation:'없어요 = negativo de 있어요. El azúcar no existe/no hay. Nota: 아니에요 negaría la identidad ("no es azúcar"), no la existencia.' },
      { id:'s7e3', tag:'있다 = tener', tagColor:'#f59e0b',
        ko:'돈이 있어요',
        prompt:'Esta frase puede significar (elige todas las correctas en español):',
        options:['Tengo dinero','Hay dinero','El dinero está aquí','Es dinero'],
        correct:'Tengo dinero',
        explanation:'있다 es "hay / estar / tener" según el contexto. 돈이 있어요 puede ser "hay dinero" o "tengo dinero". La traducción depende del contexto — el coreano es más eficiente.' },
      { id:'s7e4', tag:'이다 vs 있다', tagColor:'#e879f9',
        prompt:'¿Cuándo usas 이에요 y cuándo 있어요?',
        sub:'La distinción más importante del bloque',
        options:[
          '이에요 = identidad ("esto ES café") · 있어요 = existencia ("el café ESTÁ aquí")',
          'Son intercambiables, solo cambia el registro',
          '이에요 = presente · 있어요 = pasado',
          '이에요 para cosas · 있어요 para personas',
        ],
        correct:'이에요 = identidad ("esto ES café") · 있어요 = existencia ("el café ESTÁ aquí")',
        explanation:'La clave: ¿estás CLASIFICANDO algo? → 이다. ¿Estás diciendo que algo EXISTE/ESTÁ/SE TIENE? → 있다. El español divide esto en ser+estar+tener — el coreano en 이다+있다.' },
    ],
  },

  /* ── 8 — Producción guiada ───────────────────────────── */
  {
    num:8, emoji:'✍️', name:'Producción guiada', sub:'Escoge · construye · contextualiza', color:'#22c55e',
    explains:[
      {
        title:'주세요 — el patrón de pedido universal',
        rows:[
          { ko:'아메리카노 주세요',     rom:'a-me-ri-ka-no ju-se-yo',       es:'Un americano, por favor',    badge:'해요체', badgeColor:'#6c63ff', audio:'아메리카노 한 잔 주세요' },
          { ko:'미디엄으로 주세요',     rom:'mi-di-eom-eu-ro ju-se-yo',     es:'En mediano, por favor',      badge:'해요체', badgeColor:'#6c63ff' },
          { ko:'영수증 주세요',         rom:'yeong-su-jeung ju-se-yo',       es:'El recibo, por favor',       badge:'해요체', badgeColor:'#6c63ff' },
        ],
        note:'[lo que quieres] + 주세요. Señala, nombra, pide. Funciona en tiendas, restaurantes, taxis, farmacias.',
      },
    ],
    exercises:[
      { id:'s8e1', tag:'주세요', tagColor:'#22c55e',
        prompt:'Quieres un americano grande. ¿Cómo lo pides?',
        options:['아메리카노 라지 주세요','라지 주세요 아메리카노','주세요 아메리카노 라지','아메리카노예요 라지'],
        correct:'아메리카노 라지 주세요',
        explanation:'SOV: objeto (lo que quieres) + 주세요 (verbo al final). Nunca empieces con 주세요.',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s8e2', tag:'formalidad', tagColor:'#22c55e',
        prompt:'Tu amigo coreano te ofrece café. Dices "no, gracias". ¿Qué usas?',
        sub:'Contexto: amigo cercano, chat de WhatsApp',
        options:['괜찮습니다, 감사합니다 (muy formal)','괜찮아요, 고마워요 (educado)','괜찮아, 고마워 (casual ✓ entre amigos)'],
        correct:'괜찮아, 고마워 (casual ✓ entre amigos)',
        explanation:'Con amigos íntimos → sin -요. Usar 합쇼체 con tu mejor amigo sonaría como un correo empresarial — extrañísimo.' },
      { id:'s8e3', tag:'construcción', tagColor:'#22c55e',
        ko:'저는 ___ 이에요/예요.',
        prompt:'Completa con tu profesión en coreano. ¿Cuál termina en VOCAL y necesita 예요?',
        options:['학생 (hak-saeng) — termina en ㅇ consonante','의사 (ui-sa) — termina en 사 vocal → 예요 ✓','선생님 (seon-saeng-nim) — termina en ㅁ consonante','디자이너 (di-ja-i-neo) — termina en 너 vocal → 예요 ✓'],
        correct:'의사 (ui-sa) — termina en 사 vocal → 예요 ✓',
        explanation:'의사 (médico/a) termina en vocal (사) → 의사예요. Recuerda: VOCAL → 예요, CONSONANTE → 이에요. Aplica a cualquier nombre o sustantivo.' },
      { id:'s8e4', tag:'contexto', tagColor:'#22c55e',
        prompt:'Llegas a Corea y no hablas coreano. Eres extranjero. ¿Cómo lo dices educadamente?',
        sub:'저는 ___ 이에요',
        options:['저는 외국인이에요','저는 외국인있어요','저는 외국인없어요','외국인 주세요'],
        correct:'저는 외국인이에요',
        explanation:'외국인 = extranjero. Termina en ㄴ (consonante) → 이에요. Frase útil para pedir ayuda o explicar que no entiendes coreano.',
        audio:'여기 있습니다' },
    ],
  },

  /* ── 9 — Interacción reactiva ────────────────────────── */
  {
    num:9, emoji:'🎭', name:'Interacción reactiva', sub:'Tú eres el cliente — conversación completa', color:'#e879f9',
    explains:[
      {
        title:'El mapa completo de la conversación',
        rows:[
          { ko:'어서 오세요 →',         rom:'barista',   es:'Bienvenida de la barista',         badge:'barista', badgeColor:'#f59e0b' },
          { ko:'안녕하세요 + pedir →',   rom:'cliente',  es:'Tú saludas y haces el pedido',       badge:'tú',      badgeColor:'#e879f9' },
          { ko:'사이즈 뭐로 드릴까요 →', rom:'barista',  es:'Te pregunta el tamaño',              badge:'barista', badgeColor:'#f59e0b' },
          { ko:'이름이 뭐예요 →',        rom:'barista',  es:'Te pide el nombre',                  badge:'barista', badgeColor:'#f59e0b' },
          { ko:'저는 ___ 이에요/예요 →', rom:'cliente',  es:'Das tu nombre',                      badge:'tú',      badgeColor:'#e879f9' },
          { ko:'여기 있습니다 →',        rom:'barista',  es:'Te entrega el café',                  badge:'barista', badgeColor:'#f59e0b' },
          { ko:'감사합니다 →',           rom:'cliente',  es:'Agradeces',                          badge:'tú',      badgeColor:'#e879f9' },
        ],
        note:'Antes del roleplay, memoriza estos 7 momentos. Son los turnos del juego.',
      },
    ],
    exercises:[
      { id:'s9e1', tag:'roleplay', tagColor:'#e879f9',
        ko:'어서 오세요!',
        prompt:'La barista te saluda al entrar. ¿Qué dices?',
        options:['안녕하세요 (해요체 ✓)','감사합니다 (no tiene sentido aquí)','여기 있습니다 (eso lo dice quien entrega)','어서 오세요 (eres cliente, no barista)'],
        correct:'안녕하세요 (해요체 ✓)',
        explanation:'Al entrar, saludas con 안녕하세요. No necesitas responder 어서 오세요 — no es una pregunta. Solo estás siendo cortés.',
        audio:'안녕하세요' },
      { id:'s9e2', tag:'roleplay', tagColor:'#e879f9',
        ko:'주문하시겠어요?',
        prompt:'La barista pregunta si vas a pedir. Quieres un americano mediano.',
        options:['아메리카노 미디엄 주세요 ✓','미디엄 이에요','아메리카노 있어요?','감사합니다'],
        correct:'아메리카노 미디엄 주세요 ✓',
        explanation:'[producto] + [tamaño] + 주세요 = pedido completo. SOV: objeto primero, verbo (주세요) al final.',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s9e3', tag:'roleplay', tagColor:'#e879f9',
        ko:'이름이 뭐예요?',
        prompt:'La barista pide tu nombre. Te llamas María.',
        options:['저는 마리아예요 ✓','마리아 있어요','마리아 주세요','마리아입니까'],
        correct:'저는 마리아예요 ✓',
        explanation:'마리아 termina en vocal (아) → 예요. Patrón: 저는 [nombre]이에요/예요. Sencillo y universal.',
        audio:'저는 하은이에요' },
      { id:'s9e4', tag:'roleplay', tagColor:'#e879f9',
        ko:'여기 있습니다',
        prompt:'La barista te entrega el café con estas palabras. ¿Qué respondes?',
        options:['감사합니다 ✓','어서 오세요 (es bienvenida)','주세요 (ya lo entregaron)','이름이 뭐예요 (eso lo pregunta la barista)'],
        correct:'감사합니다 ✓',
        explanation:'Al recibir algo → 감사합니다 (합쇼체, más formal y sincero) o 고마워요 (해요체). Con la barista siempre 감사합니다.',
        audio:'감사합니다' },
    ],
  },

  /* ── 10 — Smart Review ───────────────────────────────── */
  {
    num:10, emoji:'🔁', name:'Smart Review', sub:'Integración real: SOV + Hangul + 이다 + 있다', color:'#06b6d4',
    explains:[
      {
        title:'Integrar es más que recordar',
        subtitle:'Cada ejercicio activa DOS o más habilidades a la vez. Así funciona la mente cuando hablas un idioma real.',
        rows:[
          { ko:'저는 학교에 가요', rom:'Step001 → SOV', es:'El verbo SIEMPRE va al final — igual que 주세요 en el café', badge:'SOV+003', badgeColor:'#e879f9' },
          { ko:'주세요', rom:'Step002 → Hangul', es:'주(ju)-세(se)-요(yo) — leer hangul = contar sílabas = entender cuándo termina la frase', badge:'002+003', badgeColor:'#22c55e' },
          { ko:'저는 하은이에요', rom:'Step001+003', es:'저는 (SOV, sujeto) + 하은이에요 (이다 = identidad)', badge:'SOV+이다', badgeColor:'#6c63ff', audio:'저는 하은이에요' },
        ],
        note:'Integrar = usar lo que ya sabes como herramienta para entender algo nuevo. El SOV explica por qué 주세요 siempre es el último. El hangul te permite leer 이에요/예요 sin adivinar.',
      },
    ],
    exercises:[
      { id:'s10e1', tag:'SOV → café (001+003)', tagColor:'#e879f9',
        ko:'아메리카노 라지 주세요',
        prompt:'Esta frase usa el SOV del Step001. ¿Qué patrón lo confirma?',
        sub:'Pista: identifica dónde está el verbo',
        options:[
          '주세요 va al final = el verbo cierra la frase (SOV) — igual que 가요 en Step001',
          '아메리카노 va al final porque es lo más importante',
          'En peticiones el orden es libre',
          'SOV solo aplica en verbos de movimiento',
        ],
        correct:'주세요 va al final = el verbo cierra la frase (SOV) — igual que 가요 en Step001',
        explanation:'저는 학교에 가요 (Step001) y 아메리카노 라지 주세요 (Step003) comparten el mismo ADN: el verbo cierra. SOV no es solo gramática — es el ritmo del coreano. Ya lo tienes internalizado.',
        audio:'아메리카노 한 잔 주세요' },
      { id:'s10e2', tag:'Hangul → café (002+003)', tagColor:'#22c55e',
        ko:'감사합니다',
        prompt:'Usa lo que sabes de hangul (Step002): ¿cuántas sílabas tiene esta palabra? ¿Y en qué momento del café la usas?',
        options:[
          '5 sílabas (감-사-합-니-다) · al recibir el café de la barista',
          '3 sílabas · al saludar al entrar',
          '4 sílabas · al pedir el tamaño',
          '5 sílabas · al entrar al café',
        ],
        correct:'5 sílabas (감-사-합-니-다) · al recibir el café de la barista',
        explanation:'Cada bloque hangul = 1 sílaba. 감(gam)+사(sa)+합(hap)+니(ni)+다(da) = 5. La habilidad de leer hangul (Step002) te permite confirmar la pronunciación sin romanización. Momento de uso: siempre después de 여기 있습니다 de la barista.',
        audio:'감사합니다' },
      { id:'s10e3', tag:'이다 + Hangul (003+002)', tagColor:'#6c63ff',
        ko:'저는 의사예요',
        prompt:'Combinas DOS habilidades: leer el hangul Y elegir el sufijo correcto de 이다. ¿Por qué 예요 y no 이에요?',
        options:[
          '의사 termina en 사 (vocal ㅏ) → vocal final → 예요',
          '의사 termina en consonante → 이에요',
          'Es una excepción sin regla',
          '예요 se usa solo con profesiones',
        ],
        correct:'의사 termina en 사 (vocal ㅏ) → vocal final → 예요',
        explanation:'Aquí usas Step002 (leer hangul para detectar si el último carácter termina en vocal o consonante) Y Step003 (regla de 이다: vocal→예요, consonante→이에요). Eso es integración: una habilidad es la herramienta para aplicar la otra.' },
      { id:'s10e4', tag:'있다 + SOV (003+001)', tagColor:'#f59e0b',
        ko:'화장실이 어디 있어요?',
        prompt:'Esta pregunta integra 있다 (Step003) y SOV (Step001). ¿Cuál descripción es correcta?',
        options:[
          '있어요 al final (SOV: verbo cierra) · 있다 = ubicación/existencia, no identidad',
          '있어요 es el sujeto de la frase',
          'El orden es V→S→O, el coreano es flexible',
          '있어요 aquí significa "es un baño"',
        ],
        correct:'있어요 al final (SOV: verbo cierra) · 있다 = ubicación/existencia, no identidad',
        explanation:'화장실이(sujeto) + 어디(dónde/objeto) + 있어요(verbo) = SOV perfecto. 있어요 ≠ 이에요: no estás clasificando el baño, estás preguntando dónde EXISTE. Dos reglas en una sola frase.' },
      { id:'s10e5', tag:'Formalidad + 이다 (003+003)', tagColor:'#06b6d4',
        prompt:'Estás en el café. La barista pregunta tu nombre. Te llamas Carlos. Usa 이에요/예요 correctamente Y elige el nivel de formalidad adecuado.',
        sub:'Carlos = 카를로스 (termina en 스 = vocal ㅡ)',
        options:[
          '저는 카를로스예요 (해요체 ✓ — vocal final → 예요 ✓)',
          '저는 카를로스이에요 (해요체, pero consonante → error de regla)',
          '나는 카를로스야 (casual — demasiado informal con barista desconocida)',
          '저는 카를로스입니다 (합쇼체 — demasiado formal para pedir un café)',
        ],
        correct:'저는 카를로스예요 (해요체 ✓ — vocal final → 예요 ✓)',
        explanation:'Integras TRES cosas: 1) SOV — 저는 al inicio, 예요 al final; 2) Regla de 이다 — 스 termina en vocal (ㅡ) → 예요; 3) Formalidad — con la barista usas 해요체, ni demasiado formal ni casual. Así se habla coreano real.',
        audio:'저는 하은이에요' },
      { id:'s10e6', tag:'Lectura integrada (002+001+003)', tagColor:'#22c55e',
        ko:'저는 대학교에 가요',
        prompt:'Frase del Step001. Usando hangul (Step002), ¿cuántas sílabas tiene 대학교? ¿Y qué rol juega en el SOV?',
        options:[
          '대학교 = 3 sílabas (대-학-교) · es el OBJETO/lugar (O en SOV) — 저는(S) + 대학교에(O) + 가요(V)',
          '대학교 = 4 sílabas · es el sujeto',
          '대학교 = 2 sílabas · es el verbo',
          '대학교 = 3 sílabas · es el verbo',
        ],
        correct:'대학교 = 3 sílabas (대-학-교) · es el OBJETO/lugar (O en SOV) — 저는(S) + 대학교에(O) + 가요(V)',
        explanation:'대(dae)+학(hak)+교(gyo) = 3 bloques = 3 sílabas. En la estructura SOV ocupa la posición O (destino). Ves una palabra nueva en coreano → cuentas bloques hangul → identificas su función SOV → listo. Eso es fluidez.' },
    ],
  },

  /* ── 11 — Cierre ─────────────────────────────────────── */
  {
    num:11, emoji:'🎓', name:'Cierre y siguiente paso', sub:'Lo que ya puedes hacer', color:'#22c55e',
    explains:[
      {
        title:'Step 003 — Resumen de lo aprendido',
        rows:[
          { ko:'이에요 / 예요 / 입니다', rom:'이다',    es:'Ser · identificar · presentarse', badge:'이다',    badgeColor:'#6c63ff' },
          { ko:'있어요 / 없어요',         rom:'있다',   es:'Hay · estar · tener · no hay',   badge:'있다',    badgeColor:'#f59e0b' },
          { ko:'주세요',                  rom:'pedir', es:'Pedir cualquier cosa en Corea',    badge:'patrón', badgeColor:'#22c55e', audio:'아메리카노 한 잔 주세요' },
          { ko:'합쇼체 · 해요체 · casual', rom:'레벨', es:'3 registros — elegir el correcto', badge:'formalidad', badgeColor:'#e879f9' },
        ],
        note:'Ya puedes entrar a un café coreano, pedir, dar tu nombre, agradecer y navegar los 3 niveles de formalidad.',
      },
    ],
    exercises:[
      { id:'s11e1', tag:'cierre', tagColor:'#22c55e',
        prompt:'Entras a un café coreano. ¿Cuáles de estas frases puedes decir YA? (elige la más completa)',
        options:[
          '안녕하세요 · 아메리카노 주세요 · 저는 [nombre]이에요/예요 · 감사합니다',
          'Solo 안녕하세요',
          'Ninguna — necesitas más estudio antes de intentarlo',
          'Solo frases de despedida',
        ],
        correct:'안녕하세요 · 아메리카노 주세요 · 저는 [nombre]이에요/예요 · 감사합니다',
        explanation:'¡Todo eso ya lo sabes! Después del Step003 puedes completar la conversación básica del café de principio a fin.',
        audio:'감사합니다' },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PreviewPage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [stageIdx, setStageIdx] = useState(0);
  const [phase, setPhase] = useState<'explain' | 'exercise'>('explain');
  const [exIdx, setExIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, boolean>>({});
  const [totalRight, setTotalRight] = useState(0);
  const [totalDone,  setTotalDone]  = useState(0);

  const stage = STAGES[stageIdx];
  const l = theme === 'light';
  const [sr, sg, sb] = hexRgb(stage.color);

  const hasExplain   = !!(stage.explains?.length);
  const hasExercises = !!(stage.exercises?.length);
  const exercises    = stage.exercises ?? [];
  const ex           = exercises[exIdx];
  const checked      = selected !== null;
  const isCorrect    = checked && ex && selected === ex.correct;
  const isLastEx     = exIdx === exercises.length - 1;

  function goStage(i: number) {
    setStageIdx(i);
    setPhase(STAGES[i].explains?.length ? 'explain' : 'exercise');
    setExIdx(0);
    setSelected(null);
  }

  function goExercise() {
    setPhase('exercise');
    setExIdx(0);
    setSelected(null);
  }

  function pick(opt: string) {
    if (checked || !ex) return;
    setSelected(opt);
    const correct = opt === ex.correct;
    if (!(ex.id in scores)) {
      setScores(p => ({ ...p, [ex.id]: correct }));
      setTotalDone(d => d + 1);
      if (correct) setTotalRight(r => r + 1);
    }
    if (ex.audio) setTimeout(() => playAudio(ex.audio!), 280);
  }

  function next() {
    setSelected(null);
    if (isLastEx) {
      if (stageIdx < STAGES.length - 1) goStage(stageIdx + 1);
    } else {
      setExIdx(i => i + 1);
    }
  }

  const optState = (opt: string): 'idle' | 'correct' | 'wrong' | 'reveal' => {
    if (!checked) return 'idle';
    if (opt === ex?.correct) return selected === opt ? 'correct' : 'reveal';
    if (opt === selected) return 'wrong';
    return 'idle';
  };

  const optStyle = (state: ReturnType<typeof optState>): CSSProperties => {
    const base: CSSProperties = {
      display:'flex', alignItems:'flex-start', gap:10, width:'100%',
      padding:'13px 16px', borderRadius:14, textAlign:'left', cursor:'pointer',
      fontSize:13.5, fontWeight:500, lineHeight:1.5, outline:'none',
      transition:'all 0.2s ease',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
    };
    if (state === 'correct') return { ...base,
      background:`rgba(34,197,94,${l?0.12:0.15})`,
      border:'1px solid rgba(34,197,94,0.55)',
      boxShadow:'inset 0 1px 0 rgba(34,197,94,0.2)',
      color: l ? '#16a34a' : '#6effa0' };
    if (state === 'wrong') return { ...base,
      background:`rgba(239,68,68,${l?0.09:0.13})`,
      border:'1px solid rgba(239,68,68,0.5)',
      color: l ? '#dc2626' : '#ff8a8a' };
    if (state === 'reveal') return { ...base,
      background:`rgba(34,197,94,${l?0.06:0.09})`,
      border:'1px solid rgba(34,197,94,0.3)',
      color: l ? '#15803d' : '#4ade80' };
    return { ...base,
      background: l ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.06)',
      border:      l ? '1px solid rgba(255,255,255,0.75)' : '1px solid rgba(255,255,255,0.1)',
      boxShadow:   l ? 'inset 0 1px 0 rgba(255,255,255,0.9)' : 'inset 0 1px 0 rgba(255,255,255,0.08)',
      color: ink(theme, 1) };
  };

  const pct = totalDone > 0 ? Math.round(totalRight / totalDone * 100) : 0;

  return (
    <div style={{ ...({ background: pageBg(theme) } as CSSProperties), minHeight:'100vh', color:ink(theme), fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif' }}>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px) scale(0.98)} to{opacity:1;transform:none} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
        .opt-btn:hover:not(:disabled) { filter:brightness(1.08); transform:translateY(-1px); }
        .stage-pill:hover   { opacity:1 !important; }
        .next-btn:hover     { filter:brightness(1.08); transform:translateY(-1px); }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { height:3px; width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(128,128,128,0.3); border-radius:2px; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ ...glass(theme, { borderRadius:0, borderLeft:'none', borderRight:'none', borderTop:'none', padding:'14px 20px' }), position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:780, margin:'0 auto', display:'flex', alignItems:'center', gap:14, justifyContent:'space-between' }}>
          {/* Left: title */}
          <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
            <div style={{ ...glassAccent(theme, stage.color, { width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }) }}>
              {stage.emoji}
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ margin:0, fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:stage.color }}>
                STEP 003 · Etapa {String(stage.num).padStart(2,'0')} de 11
              </p>
              <p style={{ margin:0, fontSize:14, fontWeight:700, color:ink(theme), whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {stage.name} <span style={{ color:ink(theme,2), fontWeight:400, fontSize:12 }}>— {stage.sub}</span>
              </p>
            </div>
          </div>

          {/* Right: score + theme toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            {totalDone > 0 && (
              <div style={{ ...glass(theme, { borderRadius:100, padding:'6px 14px' }), display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:pct>=70?'#22c55e':'#f59e0b', boxShadow:`0 0 6px ${pct>=70?'rgba(34,197,94,0.6)':'rgba(245,158,11,0.6)'}` }} />
                <span style={{ fontSize:12, fontWeight:700, color:ink(theme) }}>{totalRight}/{totalDone}</span>
                <span style={{ fontSize:11, color:ink(theme,3) }}>{pct}%</span>
              </div>
            )}
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              style={{ ...glass(theme, { borderRadius:100, padding:'7px 14px', cursor:'pointer', display:'flex', alignItems:'center', gap:6, border:'none' }), border:'none' }}
            >
              <span style={{ fontSize:14 }}>{l ? '🌙' : '☀️'}</span>
              <span style={{ fontSize:11, fontWeight:600, color:ink(theme,2) }}>{l ? 'Oscuro' : 'Claro'}</span>
            </button>
          </div>
        </div>

        {/* Stage selector */}
        <div style={{ maxWidth:780, margin:'12px auto 0', overflowX:'auto', display:'flex', gap:6, paddingBottom:2 }}>
          {STAGES.map((s, i) => {
            const active = i === stageIdx;
            const done   = s.exercises?.every(e => e.id in scores) ?? false;
            const [tr,tg,tb] = hexRgb(s.color);
            return (
              <button key={i} type="button" className="stage-pill"
                onClick={() => goStage(i)}
                style={{
                  flexShrink:0, cursor:'pointer',
                  padding:'6px 13px', borderRadius:100,
                  fontSize:11, fontWeight:700,
                  background: active ? `rgba(${tr},${tg},${tb},${l?0.15:0.2})` : l?'rgba(255,255,255,0.45)':'rgba(255,255,255,0.06)',
                  border: active ? `1px solid rgba(${tr},${tg},${tb},${l?0.5:0.4})` : l?'1px solid rgba(255,255,255,0.7)':'1px solid rgba(255,255,255,0.09)',
                  color: active ? s.color : ink(theme, 3),
                  backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                  boxShadow: active ? `0 2px 10px rgba(${tr},${tg},${tb},0.18), inset 0 1px 0 rgba(${tr},${tg},${tb},${l?0.3:0.2})` : l?'inset 0 1px 0 rgba(255,255,255,0.8)':'inset 0 1px 0 rgba(255,255,255,0.07)',
                  opacity: active ? 1 : 0.7,
                  transition:'all 0.18s ease',
                  display:'flex', alignItems:'center', gap:5,
                }}>
                {done && <span style={{ fontSize:9 }}>✓</span>}
                <span>{s.emoji}</span>
                <span>{String(s.num).padStart(2,'0')}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth:680, margin:'0 auto', padding:'20px 16px 80px' }}>

        {/* ─ BUILT badge ─ */}
        {stage.built && (
          <div style={{ ...glassAccent(theme, '#22c55e', { borderRadius:12, padding:'10px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:10 }) }}>
            <span style={{ fontSize:16 }}>✓</span>
            <div>
              <p style={{ margin:0, fontSize:11, fontWeight:800, color:'#22c55e', textTransform:'uppercase', letterSpacing:'0.07em' }}>Componente construido</p>
              <p style={{ margin:0, fontSize:12, color:ink(theme,2), lineHeight:1.5 }}>{stage.builtDesc}</p>
            </div>
          </div>
        )}

        {/* ─ Phase toggle (explain / exercise) ─ */}
        {hasExplain && hasExercises && (
          <div style={{ display:'flex', gap:6, marginBottom:16 }}>
            {(['explain','exercise'] as const).map(p => {
              const active = phase === p;
              return (
                <button key={p} type="button" onClick={() => { setPhase(p); setExIdx(0); setSelected(null); }}
                  style={{
                    padding:'8px 18px', borderRadius:100, cursor:'pointer',
                    fontSize:12, fontWeight:700,
                    background: active ? `rgba(${sr},${sg},${sb},${l?0.15:0.2})` : l?'rgba(255,255,255,0.45)':'rgba(255,255,255,0.06)',
                    border: active ? `1px solid rgba(${sr},${sg},${sb},${l?0.45:0.38})` : l?'1px solid rgba(255,255,255,0.65)':'1px solid rgba(255,255,255,0.09)',
                    color: active ? stage.color : ink(theme,3),
                    backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                    boxShadow: active ? `inset 0 1px 0 rgba(${sr},${sg},${sb},${l?0.4:0.25})` : l?'inset 0 1px 0 rgba(255,255,255,0.8)':'inset 0 1px 0 rgba(255,255,255,0.07)',
                    transition:'all 0.18s ease',
                  }}>
                  {p === 'explain' ? '📖 Explicación' : `✍️ Ejercicios (${exercises.length})`}
                </button>
              );
            })}
          </div>
        )}

        {/* ─ EXPLANATION phase ─ */}
        {phase === 'explain' && stage.explains?.map((card, ci) => (
          <div key={ci} style={{ ...glassDeep(theme, { padding:'28px', marginBottom:16, animation:'fadeUp 0.4s ease' }) }}>
            <p style={{ margin:'0 0 4px', fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:stage.color }}>
              {stage.emoji} {stage.name}
            </p>
            <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800, color:ink(theme) }}>{card.title}</h2>
            {card.subtitle && <p style={{ margin:'0 0 20px', fontSize:13, color:ink(theme,2) }}>{card.subtitle}</p>}

            {/* Rows */}
            {card.rows && (
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                {card.rows.map((row, ri) => {
                  const [br,bg2,bb] = hexRgb(row.badgeColor);
                  return (
                    <div key={ri} style={{ ...glass(theme, { borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }) }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                          <p style={{ margin:0, fontSize:22, fontWeight:800, fontFamily:'"Noto Sans KR","Apple SD Gothic Neo",sans-serif', color:ink(theme), lineHeight:1.2 }}>
                            {row.ko}
                          </p>
                          <span style={{ flexShrink:0, fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:100,
                            background:`rgba(${br},${bg2},${bb},${l?0.12:0.18})`,
                            border:`1px solid rgba(${br},${bg2},${bb},${l?0.35:0.3})`,
                            color:row.badgeColor }}>
                            {row.badge}
                          </span>
                        </div>
                        <p style={{ margin:0, fontSize:11, color:ink(theme,3), fontFamily:'monospace', marginBottom:2 }}>{row.rom}</p>
                        <p style={{ margin:0, fontSize:13, color:ink(theme,2), fontWeight:500 }}>{row.es}</p>
                      </div>
                      {row.audio && (
                        <button type="button" onClick={() => playAudio(row.audio!)}
                          style={{ ...glassAccent(theme, stage.color, { width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, cursor:'pointer', flexShrink:0 }) }}>
                          🔊
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table */}
            {card.table && (
              <div style={{ marginBottom:16, overflow:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:'0 4px' }}>
                  <thead>
                    <tr>
                      {card.table.headers.map((h,i) => (
                        <th key={i} style={{ padding:'6px 12px', textAlign:'left', fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:ink(theme,3) }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci2) => (
                          <td key={ci2} style={{ ...glass(theme, { borderRadius: ci2===0?'12px 0 0 12px':ci2===row.length-1?'0 12px 12px 0':'0', padding:'10px 12px' }),
                            fontSize:ci2===0?13:13, fontWeight:ci2===0?700:500,
                            color:ci2===0?stage.color:ink(theme,2),
                            fontFamily:ci2===0||ri===0?'inherit':'inherit' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Note */}
            {card.note && (
              <div style={{ ...glassAccent(theme, stage.color, { borderRadius:12, padding:'12px 16px' }) }}>
                <p style={{ margin:0, fontSize:12.5, color:ink(theme), lineHeight:1.65 }}>💡 {card.note}</p>
              </div>
            )}

            {/* CTA to exercises */}
            {hasExercises && (
              <button type="button" className="next-btn" onClick={goExercise}
                style={{ ...glassAccent(theme, stage.color, { borderRadius:14, padding:'13px', width:'100%', marginTop:20, cursor:'pointer', fontSize:13, fontWeight:700, color:l?stage.color:`rgb(${Math.min(sr+80,255)},${Math.min(sg+80,255)},${Math.min(sb+80,255)})`, display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s ease' }) }}>
                Practicar ahora → ({exercises.length} ejercicios)
              </button>
            )}
          </div>
        ))}

        {/* ─ EXERCISE phase ─ */}
        {phase === 'exercise' && ex && (
          <div key={ex.id} style={{ ...glassDeep(theme, { padding:'28px', animation:'fadeUp 0.38s cubic-bezier(0.34,1.56,0.64,1)' }) }}>

            {/* Progress */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <div style={{ flex:1, height:3, borderRadius:2, background:l?'rgba(0,0,0,0.08)':'rgba(255,255,255,0.08)', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${((exIdx+1)/exercises.length)*100}%`, background:`linear-gradient(90deg,${stage.color},rgba(${sr},${sg},${sb},0.5))`, borderRadius:2, transition:'width 0.4s ease', boxShadow:`0 0 6px rgba(${sr},${sg},${sb},0.5)` }} />
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:ink(theme,3), minWidth:32, textAlign:'right' }}>{exIdx+1}/{exercises.length}</span>
            </div>

            {/* Tag */}
            <div style={{ display:'flex', gap:6, marginBottom:16 }}>
              {[{label:ex.tag, color:ex.tagColor}, {label:stage.name, color:stage.color}].map(({label, color:c},i) => {
                const [tr2,tg2,tb2] = hexRgb(c);
                return <span key={i} style={{ fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em',
                  background:`rgba(${tr2},${tg2},${tb2},${l?0.1:0.16})`,
                  border:`1px solid rgba(${tr2},${tg2},${tb2},${l?0.35:0.28})`,
                  color: c }}>{label}</span>;
              })}
            </div>

            {/* Korean display */}
            {ex.ko && (
              <div style={{ ...glassAccent(theme, stage.color, { borderRadius:16, padding:'18px 20px', marginBottom:18, textAlign:'center' }) }}>
                <p style={{ margin:0, fontSize:ex.ko.length>18?20:28, fontWeight:800, fontFamily:'"Noto Sans KR","Apple SD Gothic Neo",sans-serif', color:ink(theme), lineHeight:1.3 }}>
                  {ex.ko}
                </p>
                {ex.audio && (
                  <button type="button" onClick={() => playAudio(ex.audio!)}
                    style={{ marginTop:10, ...glassAccent(theme, stage.color, { borderRadius:100, padding:'5px 14px', cursor:'pointer', fontSize:11, color:stage.color }) }}>
                    🔊 Escuchar
                  </button>
                )}
              </div>
            )}

            {/* Prompt */}
            <p style={{ margin:'0 0 5px', fontSize:16, fontWeight:700, color:ink(theme), lineHeight:1.45 }}>{ex.prompt}</p>
            {ex.sub && <p style={{ margin:'0 0 18px', fontSize:12.5, color:ink(theme,2), lineHeight:1.5 }}>{ex.sub}</p>}
            {!ex.sub && <div style={{ height:18 }} />}

            {/* Options */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {ex.options.map(opt => {
                const state = optState(opt);
                return (
                  <button key={opt} type="button" className="opt-btn"
                    onClick={() => pick(opt)} disabled={checked}
                    style={optStyle(state)}>
                    <span style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800,
                      background: state==='correct'?'rgba(34,197,94,0.25)':state==='wrong'?'rgba(239,68,68,0.2)':state==='reveal'?'rgba(34,197,94,0.15)':l?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.07)',
                      border: state==='correct'?'1px solid rgba(34,197,94,0.5)':state==='wrong'?'1px solid rgba(239,68,68,0.4)':state==='reveal'?'1px solid rgba(34,197,94,0.3)':l?'1px solid rgba(0,0,0,0.1)':'1px solid rgba(255,255,255,0.12)',
                      color: state==='correct'?'#16a34a':state==='wrong'?'#dc2626':state==='reveal'?'#15803d':ink(theme,3),
                      marginTop:2 }}>
                      {state==='correct'?'✓':state==='wrong'?'✕':state==='reveal'?'✓':''}
                    </span>
                    <span style={{ flex:1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {checked && (
              <div style={{ marginTop:16, animation:'slideIn 0.3s ease',
                ...glassAccent(theme, isCorrect?'#22c55e':'#f59e0b', { borderRadius:14, padding:'14px 16px' }) }}>
                <p style={{ margin:'0 0 4px', fontSize:11, fontWeight:800, color:isCorrect?'#22c55e':'#f59e0b', letterSpacing:'0.06em', textTransform:'uppercase' }}>
                  {isCorrect ? '✓ Correcto' : `Respuesta: ${ex.correct}`}
                </p>
                <p style={{ margin:0, fontSize:12.5, color:ink(theme), lineHeight:1.65 }}>{ex.explanation}</p>
              </div>
            )}

            {/* Next */}
            {checked && (
              <button type="button" className="next-btn" onClick={next}
                style={{ marginTop:16, width:'100%', padding:'13px',
                  ...glassAccent(theme, stage.color, { borderRadius:14, cursor:'pointer', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.2s ease',
                    color:l?stage.color:`rgb(${Math.min(sr+80,255)},${Math.min(sg+80,255)},${Math.min(sb+80,255)})` }) }}>
                {isLastEx && stageIdx < STAGES.length-1
                  ? `Siguiente etapa: ${STAGES[stageIdx+1].emoji} ${STAGES[stageIdx+1].name} →`
                  : isLastEx ? '🎓 ¡Completaste el Step 003!' : 'Siguiente →'}
              </button>
            )}
          </div>
        )}

        {/* ─ Explain only (no exercises) ─ */}
        {phase === 'exercise' && !hasExercises && (
          <div style={{ ...glassDeep(theme, { padding:'28px', textAlign:'center', animation:'fadeUp 0.4s ease' }) }}>
            <p style={{ fontSize:40, margin:'0 0 12px' }}>🚧</p>
            <p style={{ margin:'0 0 6px', fontWeight:700, color:ink(theme) }}>Ejercicios en construcción</p>
            <p style={{ margin:0, fontSize:13, color:ink(theme,2) }}>Esta etapa ya está construida en la lección real.</p>
          </div>
        )}

        {/* ─ Stage map ─ */}
        <div style={{ marginTop:20, display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:6 }}>
          {STAGES.map((s,i) => {
            const active = i === stageIdx;
            const done = s.exercises?.every(e => e.id in scores) ?? false;
            const [tr,tg,tb] = hexRgb(s.color);
            return (
              <button key={i} type="button" onClick={() => goStage(i)}
                style={{ ...glass(theme, { borderRadius:12, padding:'10px 6px',
                  background: active ? `rgba(${tr},${tg},${tb},${l?0.12:0.16})` : l?'rgba(255,255,255,0.45)':'rgba(255,255,255,0.04)',
                  border: active ? `1px solid rgba(${tr},${tg},${tb},0.4)` : l?'1px solid rgba(255,255,255,0.65)':'1px solid rgba(255,255,255,0.07)',
                  cursor:'pointer', textAlign:'center', transition:'all 0.18s ease' }) }}>
                <p style={{ margin:'0 0 3px', fontSize:16 }}>{s.emoji}</p>
                <p style={{ margin:'0 0 3px', fontSize:9, fontWeight:800, color:active?s.color:ink(theme,3), textTransform:'uppercase', letterSpacing:'0.04em' }}>
                  {String(s.num).padStart(2,'0')}
                </p>
                {done && <p style={{ margin:0, fontSize:9, color:'#22c55e' }}>✓</p>}
                {s.built && !done && <p style={{ margin:0, fontSize:9, color:ink(theme,3) }}>●</p>}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
