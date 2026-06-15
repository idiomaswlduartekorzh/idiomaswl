'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "Hello! How are you?", phonetic: "[HEH-loh · haw ar yoo]", es: "¡Hola! ¿Cómo estás?", note: "Sonido de 'How' — no es 'jao', sino la 'h' suave inglesa: [haw].", category: "Saludos" },
  { id: 2, phrase: "My name is ___.", phonetic: "[mai neym iz ___]", es: "Me llamo ___.", note: `"Name" rima con "game". La 'a' de "name" es [ei] (diptongo), no 'a' española.`, category: "Presentación" },
  { id: 3, phrase: "I'm from Colombia.", phonetic: "[aim from koh-LOM-bia]", es: "Soy de Colombia.", note: `"I'm" = contracción de "I am". El apóstrofe no se omite en escritura formal.`, category: "Presentación" },
  { id: 4, phrase: "Nice to meet you.", phonetic: "[nais tuh meet yoo]", es: "Mucho gusto.", note: `"Meet" tiene doble vocal — la 'ee' se pronuncia como la 'i' larga española: [miit].`, category: "Presentación" },
  { id: 5, phrase: "Thank you very much.", phonetic: "[thænk yoo VER-ee mutch]", es: "Muchas gracias.", note: `"Thank" empieza con la 'th' interdental [θ]. Pon la lengua entre los dientes.`, category: "Cortesía" },
  { id: 6, phrase: "You're welcome.", phonetic: "[yor WEL-kum]", es: "De nada.", note: `Respuesta estándar a "Thank you". No digas "no problem" en registro formal.`, category: "Cortesía" },
  { id: 7, phrase: "I don't understand.", phonetic: "[ai dohnt un-der-STÆND]", es: "No entiendo.", note: `"Don't" = do + not contraído. La 't' final de "don't" a menudo suena muy suave.`, category: "Ayuda" },
  { id: 8, phrase: "Can you repeat that?", phonetic: "[kæn yoo rih-PEET thæt]", es: "¿Puede repetir eso?", note: `El 'a' de "can" es la vocal abierta [æ], como cuando el médico dice "ahhh".`, category: "Ayuda" },
  { id: 9, phrase: "Where is the bathroom?", phonetic: "[wer iz thuh BÆTH-room]", es: "¿Dónde está el baño?", note: `"Bathroom" = [BÆTH-room]. La 'th' es interdental sorda [θ], no 'd' ni 'z'.`, category: "Supervivencia" },
  { id: 10, phrase: "How much does it cost?", phonetic: "[haw mutch duz it kost]", es: "¿Cuánto cuesta?", note: `"Cost" tiene la vocal [ɒ], como en español "lo". No confundir con "coast" (costa).`, category: "Supervivencia" },
  { id: 11, phrase: "I need help, please.", phonetic: "[ai need help pleez]", es: "Necesito ayuda, por favor.", note: `"Please" — la 'ea' suena como 'i' larga: [i:]. Nota el tono amable al final.`, category: "Supervivencia" },
  { id: 12, phrase: "Excuse me.", phonetic: "[ik-SKYOOZ mee]", es: "Disculpe / Con permiso.", note: `Usa "Excuse me" para pedir paso o llamar la atención. "Sorry" es para disculpas.`, category: "Cortesía" },
  { id: 13, phrase: "I'm sorry.", phonetic: "[aim SOR-ee]", es: "Lo siento.", note: `"Sorry" tiene la 'o' de "for" [ɒ]. Úsalo para pedir disculpas, no para dar condolencias.`, category: "Cortesía" },
  { id: 14, phrase: "What time is it?", phonetic: "[wut taim iz it]", es: "¿Qué hora es?", note: `"Time" — la 'i' es larga [ai], rima con "mine". No digas "what time it is?" (es pregunta directa).`, category: "Supervivencia" },
  { id: 15, phrase: "See you later!", phonetic: "[see yoo LAY-ter]", es: "¡Hasta luego!", note: `"Later" — el 'a' es [ei]: [LAY-ter]. Se usa en contextos informales. "Goodbye" es más formal.`, category: "Despedidas" },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaInglesA1() {
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
          <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Speaking · Inglés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          15 frases esenciales con pronunciación detallada y notas para hispanohablantes. Practica en voz alta y marca las que dominas.
        </p>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>
            {practiced.size}/{PHRASES.length} practicadas
          </span>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.8rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        {/* How to practice */}
        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎯 <strong style={{ color: 'var(--ink)' }}>Cómo practicar:</strong> Lee la pronunciación en silencio → dilo en voz alta 3 veces → si lo lograste bien, marca ✓. Si aún no, deja sin marcar y vuelve después.
        </div>

        {/* Phrases */}
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
                  {/* Number */}
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic', marginBottom: '0.12rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>

                  {/* Actions */}
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
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota de pronunciación</div>
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
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>¡Completaste las 15 frases!</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Ahora úsalas en conversación real — aplícalas en tu próxima clase con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
