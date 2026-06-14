'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface Phrase { id: number; hangul: string; romanization: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, hangul: '안녕하세요!', romanization: 'Annyeonghaseyo!', es: '¡Hola! (formal)', note: '"안녕하세요" es el saludo formal universal. 안녕 (annyeong) = paz/bienestar; 하세요 = forma honorífica de "hacer". Para amigos: "안녕!" (annyeong). Úsalo con desconocidos, mayores o en contextos profesionales.', category: 'Saludos' },
  { id: 2, hangul: '안녕히 가세요! / 안녕히 계세요!', romanization: 'Annyeonghi gaseyo! / Annyeonghi gyeseyo!', es: '¡Hasta luego! (formal — 2 formas)', note: 'El coreano tiene DOS formas de despedida: "안녕히 가세요" (el que SE VA dice al que SE QUEDA). "안녕히 계세요" (el que SE QUEDA dice al que SE VA). Esta distinción es única del coreano.', category: 'Despedidas' },
  { id: 3, hangul: '저는 ___ 이에요/예요.', romanization: 'Jeoneun ___ ieyo/yeyo.', es: 'Soy / Me llamo ___', note: '"저는" = yo (formal/deferente). La partícula 는 marca el tópico. Ejemplo: "저는 카를로스예요" (Soy Carlos). Si termina en consonante: 이에요; en vocal: 예요.', category: 'Presentación' },
  { id: 4, hangul: '만나서 반가워요!', romanization: 'Mannaseo bangawoyo!', es: '¡Mucho gusto! (encantado de conocerte)', note: '"만나서 반가워요" = "Es un placer conocerte". 만나서 = (habiendo) conocido; 반가워요 = es agradable/me alegra. Se usa siempre al conocer a alguien.', category: 'Presentación' },
  { id: 5, hangul: '감사합니다 / 고마워요', romanization: 'Gamsahamnida / Gomawoyo', es: 'Gracias (formal/informal)', note: '"감사합니다" (gamsahamnida) es muy formal, para contextos serios. "고마워요" (gomawoyo) es informal pero educado. "정말 감사합니다" = muchas gracias (정말 = realmente/de verdad).', category: 'Cortesía' },
  { id: 6, hangul: '괜찮아요.', romanization: 'Gwaenchanayo.', es: 'Está bien / De nada / No importa', note: '"괜찮아요" es muy versátil: respuesta a "gracias" (de nada), respuesta a "¿estás bien?" (estoy bien), y también "no importa". Una de las palabras más útiles del coreano.', category: 'Cortesía' },
  { id: 7, hangul: '모르겠어요. / 잘 모르겠어요.', romanization: 'Moreugesseoyo. / Jal moreugesseoyo.', es: 'No sé. / No estoy seguro/a.', note: '"모르겠어요" = literalmente "parece que no sé". 잘 (jal) = bien/correctamente. En coreano es más educado expresar incertidumbre con "parece que" (-겠-) en lugar de ser directo.', category: 'Ayuda' },
  { id: 8, hangul: '다시 말씀해 주세요.', romanization: 'Dasi malsseum-hae juseyo.', es: 'Por favor, repita.', note: '"다시" = otra vez/de nuevo. "말씀해 주세요" = hablar + por favor (forma honorífica). El 주세요 al final de cualquier verbo lo convierte en "por favor, haga ___". Muy útil.', category: 'Ayuda' },
  { id: 9, hangul: '이게 뭐예요?', romanization: 'Ige mwoyeyo?', es: '¿Qué es esto?', note: '"이게" = 이것이 (esto+partícula sujeto). "뭐예요?" = ¿qué es? Variantes: "이거" (igeo) = esto informal. Muy útil para aprender vocabulario señalando objetos.', category: 'Supervivencia' },
  { id: 10, hangul: '화장실이 어디예요?', romanization: 'Hwajangsil-i eodiyeyo?', es: '¿Dónde está el baño?', note: '"화장실" (hwajangsil) = baño (literalmente: cuarto de maquillaje). "어디예요?" = ¿dónde está?. 어디 (eodi) = dónde. Esta pregunta es esencial para cualquier viajero.', category: 'Supervivencia' },
  { id: 11, hangul: '얼마예요?', romanization: 'Eolmayeyo?', es: '¿Cuánto cuesta?', note: '"얼마" (eolma) = cuánto (precio). "예요?" = ¿es?. Juntos: "¿cuánto es?" La versión formal es "얼마입니까?" pero "얼마예요?" es perfecta para compras cotidianas.', category: 'Supervivencia' },
  { id: 12, hangul: '한국어를 조금 해요.', romanization: 'Hangugeo-reul jogeum haeyo.', es: 'Hablo un poco de coreano.', note: '"조금" (jogeum) = un poco. "한국어" = idioma coreano. "해요" = hago/hablo. Esta frase te ayudará a establecer expectativas. Puedes añadir: "아직 배우고 있어요" (todavía estoy aprendiendo).', category: 'Presentación' },
  { id: 13, hangul: '잘 지내요?', romanization: 'Jal jinaeyo?', es: '¿Estás bien? / ¿Cómo te va?', note: '"잘" (jal) = bien. "지내요" (jinaeyo) = pasarla/vivir. Literalmente "¿lo pasas bien?". Para personas que ya conoces. Respuesta: "네, 잘 지내요!" También: "덕분에 잘 지내요" (bien, gracias a usted).', category: 'Saludos' },
  { id: 14, hangul: '네, 잘 지내요. 감사해요!', romanization: 'Ne, jal jinaeyo. Gamsahaeyo!', es: '¡Sí, estoy bien. Gracias!', note: '"네" (ne) = sí. "잘 지내요" = estoy bien. "감사해요" es forma intermedia entre el muy formal 감사합니다 y el informal 고마워. Esta combinación es perfecta para el nivel A1 en cualquier situación educada.', category: 'Saludos' },
  { id: 15, hangul: '천천히 말씀해 주세요.', romanization: 'Cheoncheonhi malsseum-hae juseyo.', es: 'Por favor, hable despacio.', note: '"천천히" (cheoncheonhi) = despacio. "말씀해 주세요" = hablar + por favor (honorífico). Versión informal: "천천히 말해 줘". "조금 더 천천히" = un poco más despacio. Siempre útil con hablantes nativos.', category: 'Ayuda' },
  { id: 16, hangul: '배고파요. / 목말라요.', romanization: 'Baegopayo. / Mongmallayo.', es: 'Tengo hambre. / Tengo sed.', note: '"배고파요" = tengo hambre. 배 = barriga; 고프다 = estar vacío. "목말라요" = tengo sed. 목 = garganta; 마르다 = estar seco. Informal: "배고파!" / "목말라!" En restaurantes: "주문해도 될까요?" (¿puedo pedir?)', category: 'Supervivencia' },
  { id: 17, hangul: '죄송합니다. / 미안해요.', romanization: 'Joesonghamnida. / Mianhaeyo.', es: 'Lo siento. (formal / informal)', note: '"죄송합니다" es la disculpa más formal y sincera — úsala con mayores o jefes. "미안해요" es informal pero educado. "정말 죄송합니다" = lo siento mucho. Para pasar entre personas: "실례합니다" (sillyehamnida).', category: 'Cortesía' },
  { id: 18, hangul: '알겠어요. / 네, 알겠습니다.', romanization: 'Algesseoyo. / Ne, algesseumnida.', es: 'Entendido. / Sí, de acuerdo.', note: '"알겠어요" = entendido (informal-educado). "알겠습니다" = formal. De 알다 (saber). Esta forma confirma que recibiste y entendiste una instrucción — muy importante en el contexto de trabajo o estudio en Corea.', category: 'Cortesía' },
  { id: 19, hangul: '몇 시예요?', romanization: 'Myeot siyeyo?', es: '¿Qué hora es?', note: '"몇" (myeot) = cuántos. "시" (si) = hora. Respuesta: "두 시예요" (son las dos). Números nativos para horas: 한(1) 두(2) 세(3) 네(4) 다섯(5)... "시" para horas, "분" (bun) para minutos. "세 시 반이에요" = son las 3:30.', category: 'Supervivencia' },
  { id: 20, hangul: '___ 주세요.', romanization: '___ juseyo.', es: '___, por favor.', note: '"주세요" (juseyo) = deme/por favor (de 주다 = dar). Estructura ultra-útil: [objeto] + 주세요. Ejemplos: "물 주세요" (agua), "메뉴 주세요" (menú), "영수증 주세요" (el recibo). Funciona en cualquier establecimiento. La partícula 을/를 antes de 주세요 es opcional.', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Despedidas', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia'];

export default function HablaCoreanoA1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ 말하기 · Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />말하기 · Coreano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Frases esenciales</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.5rem' }}>
          12 frases en <strong style={{ color: 'var(--ink)' }}>한글 (Hangul) + Romanización</strong>. Cada tarjeta muestra primero el hangul, luego la pronunciación (romanización) y el significado.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length} practicadas</span>
        </div>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.8rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {shown.map(p => {
            const isPracticed = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border: `1.5px solid ${isPracticed ? `${COLOR}55` : 'var(--line-soft)'}`, borderRadius: 16, overflow: 'hidden', background: isPracticed ? `${COLOR}06` : 'var(--bg)' }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : p.id)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, textTransform: 'uppercase' }}>{p.category}</span>
                      {isPracticed && <span style={{ fontSize: '0.6rem', color: '#059669', fontWeight: 700 }}>✓ practicada</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.2rem', lineHeight: 1.4 }}>{p.hangul}</div>
                    <div style={{ fontSize: '0.84rem', color: COLOR, fontWeight: 600, marginBottom: '0.1rem', fontStyle: 'italic' }}>{p.romanization}</div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.25rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}05` }}>
                    <p style={{ margin: '0 0 0.85rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.7 }}>🗣️ {p.note}</p>
                    <button onClick={() => mark(p.id, !isPracticed)}
                      className={isPracticed ? 'btn btn-ghost btn-sm' : 'btn btn-sm'}
                      style={{ fontSize: '0.8rem', ...(isPracticed ? {} : { background: COLOR, borderColor: COLOR }) }}>
                      {isPracticed ? '↩ Desmarcar' : '✓ Marcar como practicada'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {pct === 100 && (
          <div style={{ marginTop: '1.75rem', padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>¡Excelente! 잘 했어요! Practicaste todas las frases.</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--muted)' }}>Ya puedes mantener una conversación básica en coreano.</p>
          </div>
        )}
      </div>
    </section>
  );
}
