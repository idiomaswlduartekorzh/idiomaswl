'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "In my opinion, ___.", phonetic: "[in mai uh-PIN-yun]", es: "En mi opinión, ___.", note: '"In my opinion" es neutral. Formal: "In my view" / "I would argue that". Informal: "I think" / "If you ask me".', category: "Opiniones" },
  { id: 2, phrase: "I agree / I disagree.", phonetic: "[ai uh-GREE / ai dis-uh-GREE]", es: "Estoy de acuerdo / No estoy de acuerdo.", note: 'Formal: "I concur" / "I beg to differ". Suaviza el desacuerdo: "I see your point, but I disagree because..."', category: "Opiniones" },
  { id: 3, phrase: "That's a good point.", phonetic: "[thæts uh gud point]", es: "Es un buen punto / Tienes razón en eso.", note: 'Úsalo para reconocer el argumento de alguien antes de dar el tuyo. Continúa con "however" o "but I also think...".', category: "Opiniones" },
  { id: 4, phrase: "Could you say that again more slowly?", phonetic: "[kud yoo say thæt uh-GEN mor SLOH-lee]", es: "¿Podría repetir eso más despacio?", note: 'Siempre útil en conversaciones reales. Alternativa: "Sorry, I didn\'t catch that." Formal: "I beg your pardon?"', category: "Comprensión" },
  { id: 5, phrase: "What does ___ mean?", phonetic: "[wut duz ___ meen]", es: "¿Qué significa ___?", note: 'Pedir significado es una estrategia de comunicación. También: "How do you spell ___?" / "Can you give me an example?"', category: "Comprensión" },
  { id: 6, phrase: "I'm looking for ___.", phonetic: "[aim LUK-ing for ___]", es: "Estoy buscando ___.", note: 'Esencial para compras y orientación. "I\'m looking for the exit/a pharmacy/a hotel." La \'oo\' en "looking" es corta [ʊ], no la larga [uː] de "food".', category: "Viajes" },
  { id: 7, phrase: "How do I get to ___?", phonetic: "[haw doo ai get tuh ___]", es: "¿Cómo llego a ___?", note: '"Get to" = llegar a. No digas "How do I go to?" El \'to\' al final se reduce a [tuh].', category: "Viajes" },
  { id: 8, phrase: "Is it far from here?", phonetic: "[iz it far frum heer]", es: "¿Está lejos de aquí?", note: 'En respuesta: "It\'s about 10 minutes on foot" / "Take the number 5 bus". "Far" vs "far away" — ambas son comunes.', category: "Viajes" },
  { id: 9, phrase: "I'd like to make a reservation.", phonetic: "[aid lyk tuh mayk uh rez-er-VAY-shun]", es: "Me gustaría hacer una reserva.", note: '"I\'d like" es la forma educada. Nunca digas "I want a reservation" en contextos formales. Se usa en hoteles, restaurantes, clínicas.', category: "Viajes" },
  { id: 10, phrase: "What time does it open/close?", phonetic: "[wut taim duz it OH-pun/KLOHZ]", es: "¿A qué hora abre/cierra?", note: '"Open" y "close" son los verbos; "opened" y "closed" describen el estado. "It opens at 9" vs "It IS open".', category: "Viajes" },
  { id: 11, phrase: "I've been working here for ___.", phonetic: "[ayv bin WER-king heer for ___]", es: "Llevo ___ trabajando aquí.", note: '"I\'ve been working" = present perfect continuous. "For 3 years" / "Since 2020". Clave: "for" + período / "since" + fecha.', category: "Trabajo" },
  { id: 12, phrase: "My responsibilities include ___.", phonetic: "[mai ree-spon-suh-BIL-uh-teez in-KLOOD ___]", es: "Mis responsabilidades incluyen ___.", note: 'Lenguaje profesional formal. Alternativa: "I\'m in charge of ___" / "I deal with ___".', category: "Trabajo" },
  { id: 13, phrase: "Could I speak to the manager, please?", phonetic: "[kud ai speek tuh thuh MÆN-uh-jer pleez]", es: "¿Podría hablar con el gerente, por favor?", note: '"Could I" es más educado que "Can I". Úsalo cuando hay un problema o queja. Formal: "I would like to speak with..."', category: "Trabajo" },
  { id: 14, phrase: "I'm taller/shorter than ___.", phonetic: "[aim TAW-ler/SHOR-ter thæn ___]", es: "Soy más alto/bajo que ___.", note: 'Comparativos para descripciones físicas. También: "She has longer hair than me" / "He looks younger than his age."', category: "Descripción" },
  { id: 15, phrase: "She/He is the most ___ person I know.", phonetic: "[shee/hee iz thuh mohst ___ PER-sun ai noh]", es: "Ella/Él es la persona más ___ que conozco.", note: 'Estructura superlativa: the most + adjetivo. "The most generous/creative/hardworking person I know."', category: "Descripción" },
  { id: 16, phrase: "What does he/she look like?", phonetic: "[wut duz hee/shee luk lyk]", es: "¿Cómo es físicamente?", note: '"Look like" = apariencia física. "What is he like?" = personalidad. ¡Dos preguntas muy diferentes!', category: "Descripción" },
  { id: 17, phrase: "I used to ___.", phonetic: "[ai yoozd tuh ___]", es: "Antes yo ___ (pero ya no).", note: '"Used to" expresa hábitos del pasado que ya no existen. "I used to live in Medellín" / "I didn\'t use to exercise."', category: "Social" },
  { id: 18, phrase: "I haven't seen you in ages!", phonetic: "[ai HÆV-unt seen yoo in AY-jez]", es: "¡No te había visto en mucho tiempo!", note: '"Ages" = muy largo tiempo (informal). Formal: "I haven\'t seen you for a long time." Continúa con: "How have you been?"', category: "Social" },
  { id: 19, phrase: "Would you like to join us?", phonetic: "[wud yoo lyk tuh joyn us]", es: "¿Te gustaría unirte a nosotros?", note: 'Invitación educada. Informal: "Do you want to come with us?" / "Why don\'t you join us?"', category: "Social" },
  { id: 20, phrase: "I'll get the bill.", phonetic: "[ayl get thuh bil]", es: "Yo pago la cuenta.", note: '"Get the bill" = pedir la cuenta. "Split the bill" = dividir la cuenta. "It\'s on me" = yo invito.', category: "Social" },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Descripción', 'Trabajo', 'Viajes', 'Social', 'Comprensión'];

export default function HablaInglesA2() {
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
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Speaking · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frases esenciales con pronunciación, contexto situacional y variantes formal/informal. Practica en voz alta y marca las que dominas.
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
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
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
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota de pronunciación y uso</div>
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
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Ahora úsalas en conversación real — aplícalas en tu próxima clase con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
