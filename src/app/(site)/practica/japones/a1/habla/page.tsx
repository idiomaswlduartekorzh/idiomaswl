'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface Phrase { id: number; japanese: string; romaji: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, japanese: 'はじめまして。', romaji: 'Hajimemashite.', es: 'Mucho gusto. (al conocerse por primera vez)', note: '"はじめまして" se usa SOLO la primera vez que conoces a alguien. Literalmente "por primera vez". Siempre va seguido de tu nombre y "どうぞよろしく".', category: 'Presentación' },
  { id: 2, japanese: 'わたしは ___です。', romaji: 'Watashi wa ___ desu.', es: 'Soy / Me llamo ___', note: 'La estructura básica japonesa: [yo は] [nombre] [です]. Ejemplo: "わたしは マリアです" (Soy María). En conversación informal, "わたし" se puede omitir.', category: 'Presentación' },
  { id: 3, japanese: 'どうぞ よろしく おねがいします。', romaji: 'Douzo yoroshiku onegaishimasu.', es: 'Mucho gusto / encantado/a (pido su favor).', note: 'Frase de cierre de presentación. "よろしく" = favor/buena voluntad. Se usa también al pedir favores o al despedirse de un nuevo contacto. Más formal: どうぞよろしくおねがいします.', category: 'Presentación' },
  { id: 4, japanese: 'ありがとう ございます。', romaji: 'Arigatou gozaimasu.', es: 'Muchas gracias. (formal)', note: '"ありがとう" solo = gracias (informal). "ありがとう ございます" = muchas gracias (formal). "どうも ありがとう" = también formal. "どうも" solo = gracias (breve, muy informal).', category: 'Cortesía' },
  { id: 5, japanese: 'すみません。', romaji: 'Sumimasen.', es: 'Perdón / Disculpe / Oiga (para llamar atención)', note: '"すみません" es multifuncional: disculpa, para llamar a un mesero, para pedir paso, o como "gracias" informal. Es una de las palabras más útiles del japonés.', category: 'Cortesía' },
  { id: 6, japanese: 'いただきます。', romaji: 'Itadakimasu.', es: 'Buen provecho / Gracias por la comida (antes de comer)', note: 'Se dice ANTES de comer. Literalmente "humildemente recibo". Es costumbre cultural obligatoria, como hacer la señal de la cruz antes de comer. Al terminar: "ごちそうさまでした" (Gracias por la comida).', category: 'Cortesía' },
  { id: 7, japanese: 'わかりません。', romaji: 'Wakarimasen.', es: 'No entiendo. / No sé.', note: '"わかりません" (wakarimasen) = no entiendo. "わかります" (wakarimasu) = entiendo. Muy útil: "すみません、もう いちど おねがいします" = perdón, una vez más por favor.', category: 'Ayuda' },
  { id: 8, japanese: 'もう いちど おねがいします。', romaji: 'Mou ichido onegaishimasu.', es: 'Otra vez / una vez más, por favor.', note: '"もう" = otra/una más; "いちど" = una vez; "おねがいします" = por favor. También: "ゆっくり はなして ください" (hable despacio, por favor). はなして=hablando; ゆっくり=despacio.', category: 'Ayuda' },
  { id: 9, japanese: 'トイレは どこですか？', romaji: 'Toire wa doko desu ka?', es: '¿Dónde está el baño?', note: '"どこ" = dónde. "どこですか？" = ¿dónde está?. "トイレ" (toiretto→toire) = baño. Alternativa: "おてあらいは どこですか？" (お手洗い = baño, más formal).', category: 'Supervivencia' },
  { id: 10, japanese: 'これは いくらですか？', romaji: 'Kore wa ikura desu ka?', es: '¿Cuánto cuesta esto?', note: '"これ" = esto; "いくら" = cuánto (precio); "ですか" = ¿es?. En tiendas: apunta al artículo y di "これは いくらですか？" También: "もっと やすく なりますか？" = ¿puede bajar el precio?', category: 'Supervivencia' },
  { id: 11, japanese: 'えいごが わかりますか？', romaji: 'Eigo ga wakarimasu ka?', es: '¿Habla inglés?', note: '"えいご" = inglés; "わかりますか？" = ¿entiende?. Si necesitas: "すぺいんごで はなせますか？" = ¿puede hablar en español? Suele no funcionar en zonas rurales japonesas.', category: 'Ayuda' },
  { id: 12, japanese: 'さようなら。/ またね。', romaji: 'Sayounara. / Mata ne.', es: '¡Adiós! (formal) / ¡Hasta luego! (informal)', note: '"さようなら" es formal pero permanente — implica que no se verán pronto. "またね" (mata ne) o "またあした" (mata ashita = hasta mañana) son más comunes para despedidas cotidianas.', category: 'Despedidas' },
];

const CATEGORIES = ['Todos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaJaponesA1() {
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
          <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ 話す · Habla</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />話す · Japonés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Frases esenciales</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.5rem' }}>
          12 frases en <strong style={{ color: 'var(--ink)' }}>日本語 (japonés) + ローマ字 (romaji)</strong>. Primero aprende el sonido, luego el hiragana.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length} practicadas</span>
        </div>
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'} style={{ fontSize: '0.8rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {shown.map(p => {
            const isPracticed = practiced.has(p.id); const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border: `1.5px solid ${isPracticed ? `${COLOR}55` : 'var(--line-soft)'}`, borderRadius: 16, overflow: 'hidden', background: isPracticed ? `${COLOR}06` : 'var(--bg)' }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : p.id)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, textTransform: 'uppercase' }}>{p.category}</span>
                      {isPracticed && <span style={{ fontSize: '0.6rem', color: '#059669', fontWeight: 700 }}>✓ practicada</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.2rem', lineHeight: 1.4 }}>{p.japanese}</div>
                    <div style={{ fontSize: '0.84rem', color: COLOR, fontWeight: 600, marginBottom: '0.1rem', fontStyle: 'italic' }}>{p.romaji}</div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.25rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}05` }}>
                    <p style={{ margin: '0 0 0.85rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.7 }}>🗣️ {p.note}</p>
                    <button onClick={() => mark(p.id, !isPracticed)} className={isPracticed ? 'btn btn-ghost btn-sm' : 'btn btn-sm'} style={{ fontSize: '0.8rem', ...(isPracticed ? {} : { background: COLOR, borderColor: COLOR }) }}>
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
            <div style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>🎌</div>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>よくできました！ (Yoku dekimashita!) ¡Muy bien hecho!</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--muted)' }}>Ya puedes presentarte y comunicarte en situaciones básicas en japonés.</p>
          </div>
        )}
      </div>
    </section>
  );
}
