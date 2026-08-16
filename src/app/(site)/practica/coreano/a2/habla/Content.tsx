'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; romaja: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: '저는 ~라고 생각해요.', romaja: 'Jeoneun ~rago saenggakhaeyo.', phonetic: '[jeo-neun ~ ra-go saeng-ga-kae-yo]', es: 'Creo que... / Pienso que...', note: '생각하다 (saenggakhada) = pensar/creer. La cita indirecta ~라고 transforma cualquier afirmación en opinión. Formal: 생각합니다 (saenggakamnida). Informal: ~라고 생각해 (saenggakae). Siempre aparece al final de la oración.', category: 'Opiniones' },
  { id: 2, phrase: '저는 ~보다 ~을/를 더 좋아해요.', romaja: 'Jeoneun ~ boda ~ eul/reul deo joahaeyo.', phonetic: '[jeo-neun ~ bo-da ~ eul/reul deo jo-a-ae-yo]', es: 'Prefiero... a... / Me gusta más... que...', note: '보다 (boda) = que (comparativo). 더 (deo) = más. 좋아하다 (joahada) = gustar/querer. Ejemplo: 커피보다 차를 더 좋아해요 (Prefiero el té al café). Para preguntar: ~보다 ~을 더 좋아해요?', category: 'Opiniones' },
  { id: 3, phrase: '~에 대해 어떻게 생각해요?', romaja: '~e daehae eotteoke saenggakhaeyo?', phonetic: '[~ e dae-hae eot-teo-ke saeng-ga-kae-yo]', es: '¿Qué piensas sobre...?', note: '~에 대해 = sobre / respecto a. 어떻게 = de qué manera/cómo. Alternativa directa: ~는 어때요? (¿Qué tal ~?). Para pedir opinión sobre una decisión: ~는 어떻게 생각하세요? (¿Qué opina de ~?)', category: 'Opiniones' },
  { id: 4, phrase: '다시 한 번 말씀해 주시겠어요?', romaja: 'Dasi han beon malsseum-hae jusigesseoyo?', phonetic: '[da-si han beon mal-sseum-hae ju-si-ge-sseo-yo]', es: '¿Podría repetir, por favor? (formal)', note: '말씀 es la forma honorífica de 말 (palabra/habla). 주시겠어요 = ¿podría hacer...? (honorífico). Versión informal: 다시 말해줄 수 있어? (dari malhaejul su isseo?). Con suavizador: 죄송한데요, 다시... (Disculpe, de nuevo...)', category: 'Comprensión' },
  { id: 5, phrase: '좀 더 천천히 말씀해 주시겠어요?', romaja: 'Jom deo cheoncheonhi malsseum-hae jusigesseoyo?', phonetic: '[jom deo cheon-cheon-hi mal-sseum-hae ju-si-ge-sseo-yo]', es: '¿Podría hablar más despacio?', note: '천천히 (cheoncheonhi) = despacio/lentamente. 좀 = un poco (suavizador). Esta frase es muy bien recibida — los coreanos aprecian el esfuerzo. Informal: 조금 천천히 말해줘 (jom cheoncheonhi malhaejwo).', category: 'Comprensión' },
  { id: 6, phrase: '~은/는 무슨 뜻이에요?', romaja: '~eun/neun museun ttus-ieyo?', phonetic: '[~ eun/neun mu-seun ttus-i-e-yo]', es: '¿Qué significa...?', note: '무슨 뜻 = qué significado. ~이에요 = es. La partícula 은/는 depende de si termina en consonante (은) o vocal (는). Alternativa: ~이 무슨 말이에요? (¿Qué quiere decir ~?). Esencial para conversaciones reales.', category: 'Comprensión' },
  { id: 7, phrase: '~까지 어떻게 가요?', romaja: '~kkaji eotteoke gayo?', phonetic: '[~ kka-ji eot-teo-ke ga-yo]', es: '¿Cómo se llega a...?', note: '까지 = hasta (partícula de destino). 어떻게 = cómo. 가다 = ir. Más específico: 지하철로 가요? (¿Se va en metro?). Para pedir dirección exacta: ~에 어떻게 가는지 알아요? (¿Sabe cómo ir a ~?)', category: 'Viajes' },
  { id: 8, phrase: '~표 한 장 주세요.', romaja: '~pyo han jang juseyo.', phonetic: '[~ pyo han jang ju-se-yo]', es: 'Un billete para..., por favor.', note: '표 (pyo) = billete/tiquete. 한 장 = una hoja/unidad (contador para objetos planos). 주세요 = deme/por favor. Para dos: 두 장. Alternativa: ~행 티켓 있어요? (¿Tienen tiquete a ~?). Se usa en taquillas de metro, bus y tren.', category: 'Viajes' },
  { id: 9, phrase: '방을 예약하고 싶어요.', romaja: 'Bang-eul yeyak-hago sipeoyo.', phonetic: '[bang-eul ye-yak-ha-go si-peo-yo]', es: 'Quisiera reservar una habitación.', note: '방 (bang) = habitación. 예약 (yeyak) = reserva. ~고 싶다 = querer hacer. Para especificar: 1박 2일로 예약하고 싶어요 (Quiero reservar por 1 noche y 2 días). 박 (bak) es el contador de noches de hotel.', category: 'Viajes' },
  { id: 10, phrase: '몇 시에 열어요 / 닫아요?', romaja: 'Myeot si-e yeoreoyo / dadayo?', phonetic: '[myeot si-e yeo-reo-yo / da-da-yo]', es: '¿A qué hora abre / cierra?', note: '열다 (yeolda) = abrir / 닫다 (datda) = cerrar. 몇 시에 = a qué hora. Para saber si está abierto ahora: 지금 열려 있어요? (jigeum yeollyeo isseoyo? = ¿Está abierto ahora?). Imprescindible para tiendas y restaurantes.', category: 'Viajes' },
  { id: 11, phrase: '저는 ~에서 ~로 일한 지 약 ~년이 됐어요.', romaja: 'Jeoneun ~eseo ~ro ilhan ji yak ~nyeoni dwaesseoyo.', phonetic: '[jeo-neun ~ e-seo ~ ro il-han ji yak ~ nyeo-ni dwae-sseo-yo]', es: 'Llevo aproximadamente ~ años trabajando como ~ en...', note: '~로 일하다 = trabajar como ~. ~ㄴ 지 ~이 됐다 = llevar ~ tiempo haciendo. 약 (yak) = aproximadamente. Versión corta: 약 ~년째 ~로 일하고 있어요 (Llevo ~ años como ~). Útil en presentaciones profesionales.', category: 'Trabajo' },
  { id: 12, phrase: '저는 ~을/를 할 수 있어요.', romaja: 'Jeoneun ~eul/reul hal su isseoyo.', phonetic: '[jeo-neun ~ eul/reul hal su i-sseo-yo]', es: 'Puedo... / Sé hacer...', note: '~ㄹ/을 수 있다 = poder hacer (habilidad). 없다 para negar: ~을 할 수 없어요 (no puedo). Para logros: ~을 할 줄 알아요 (sé cómo hacer ~). Esencial en entrevistas de trabajo y presentaciones.', category: 'Trabajo' },
  { id: 13, phrase: '제 담당은 ~이에요/예요.', romaja: 'Je damdang-eun ~ieyo/yeyo.', phonetic: '[je dam-dang-eun ~ i-e-yo/ye-yo]', es: 'Mi área de responsabilidad es...', note: '담당 (damdang) = área a cargo/responsabilidad. ~이에요 (después de consonante) / ~예요 (después de vocal). Formal: 저는 ~을 담당하고 있습니다 (soy responsable de ~). Para describir el trabajo: 주로 ~을 해요 (principalmente hago ~).', category: 'Trabajo' },
  { id: 14, phrase: '~보다 ~이/가 더 ~해요.', romaja: '~boda ~i/ga deo ~haeyo.', phonetic: '[~ bo-da ~ i/ga deo ~ hae-yo]', es: '... es más ... que ...', note: 'Estructura comparativa clave: A보다 B가 더 + adjetivo. Ejemplo: 서울보다 부산이 더 따뜻해요 (Busan es más cálido que Seúl). Para superlativo: ~중에서 가장 ~ (el/la más ~ entre). 가장 o 제일 = el más.', category: 'Descripción' },
  { id: 15, phrase: '~만큼 ~해요.', romaja: '~mankeum ~haeyo.', phonetic: '[~ man-keum ~ hae-yo]', es: '... es tan ... como ...', note: '만큼 = tan como (comparativo de igualdad). Ejemplo: 형만큼 키가 커요 (Soy tan alto como mi hermano mayor). Para casi igual: 비슷해요 (es similar). Para exactamente igual: 똑같아요 (es exactamente igual).', category: 'Descripción' },
  { id: 16, phrase: '~은/는 어떤 사람이에요?', romaja: '~eun/neun eotteon saram-ieyo?', phonetic: '[~ eun/neun eot-teon sa-ram-i-e-yo]', es: '¿Cómo es ~ ? (descripción de persona)', note: '어떤 = qué tipo de. Para descripción física: 어떻게 생겼어요? (eotteoke saenggyeosseoyo? = ¿Qué aspecto tiene?). Para personalidad: 성격이 어때요? (¿Cómo es su personalidad?). Responder con adjetivo + -(으)ㄴ 사람이에요.', category: 'Descripción' },
  { id: 17, phrase: '어릴 때는 자주 ~곤 했어요.', romaja: 'Eoril ttaeneun jaju ~gon haesseoyo.', phonetic: '[eo-ril ttae-neun ja-ju ~ gon hae-sseo-yo]', es: 'De niño/a, solía... frecuentemente.', note: '어릴 때 = cuando era niño/a. 자주 = frecuentemente. ~곤 했다 = solía hacer (hábito pasado). Alternativa: 어렸을 때 ~았/었어요 (When I was young, I did ~). 어릴 때는 매일 ~았어요 también es natural.', category: 'Social' },
  { id: 18, phrase: '정말 오랜만이에요!', romaja: 'Jeongmal oraenman-ieyo!', phonetic: '[jeong-mal o-raen-man-i-e-yo]', es: '¡Cuánto tiempo sin verte!', note: '오랜만 (oraenman) = después de mucho tiempo. 정말 = de verdad/realmente. La respuesta natural: 네, 정말요! 어떻게 지내셨어요? (¡Sí! ¿Cómo ha estado?). Informal: 오랜만이야! Más formal: 오래간만입니다.', category: 'Social' },
  { id: 19, phrase: '같이 가지 않을래요?', romaja: 'Gachi gaji anheullaeyo?', phonetic: '[ga-chi ga-ji an-heul-lae-yo]', es: '¿No quieres venir juntos?', note: '~지 않을래요? = ¿no quieres ~? (invitación negativa/más suave). 같이 (gachi) = juntos. Para invitación directa: ~같이 가요! (¡Vamos juntos!). Para proponer: ~할까요? (¿Hacemos ~?). La forma negativa suaviza la invitación.', category: 'Social' },
  { id: 20, phrase: '다음에 또 봐요!', romaja: 'Daeume tto bwayo!', phonetic: '[da-eu-me tto bwa-yo]', es: '¡Nos vemos la próxima vez!', note: '다음에 = la próxima vez. 또 = otra vez/de nuevo. 봐요 = vemos (보다, ver). Formal: 다음에 또 뵙겠습니다 (da-eum-e tto boepgesseumnida). Informal: 다음에 봐! Otras despedidas: 잘 가요! (¡Que te vaya bien!) / 안녕히 가세요! (formal, adiós).', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Comprensión', 'Viajes', 'Trabajo', 'Descripción', 'Social'];

export default function HablaCoreanoA2() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);

  function mark(id: number, val: boolean) {
    setPracticed(prev => {
      const next = new Set(prev);
      if (val) next.add(id); else next.delete(id);
      return next;
    });
  }

  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />말하기 (Malhagi) · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frases esenciales con Hangul, romanización y contexto. Practica en voz alta y marca las que domines.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>
            {practiced.size}/{PHRASES.length} practicadas
          </span>
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

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎯 <strong style={{ color: 'var(--ink)' }}>Cómo practicar:</strong> Lee la romanización en silencio → dila en voz alta 3 veces → si sale bien, marca ✓. Si no, déjala sin marcar y vuelve después.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => {
            const done = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{
                border: `1.5px solid ${done ? `${COLOR}44` : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: done ? `${COLOR}06` : 'var(--bg)',
                overflow: 'hidden',
              }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.08rem' }}>{p.romaja}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic', marginBottom: '0.12rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setExpanded(isExpanded ? null : p.id)}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 6, border: '1px solid var(--line-soft)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                      {isExpanded ? '▲ nota' : '▼ nota'}
                    </button>
                    <button onClick={() => mark(p.id, !done)}
                      style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', borderRadius: 8, border: `1.5px solid ${done ? COLOR : 'var(--line-soft)'}`, background: done ? COLOR : 'transparent', color: done ? '#fff' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                      {done ? '✓ Dominada' : 'Lo logré ✓'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0.7rem 1.25rem 0.85rem 4.5rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}04` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota de uso y pronunciación</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.note}</p>
                    <div style={{ marginTop: '0.4rem', display: 'inline-block', fontSize: '0.68rem', padding: '0.12rem 0.45rem', borderRadius: 5, background: `${COLOR}15`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{p.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size === PHRASES.length && (
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 16, background: `${COLOR}0a`, border: `2px solid ${COLOR}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>¡Completaste las 20 frases!</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Úsalas en una conversación real — aplícalas en tu próxima clase con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
