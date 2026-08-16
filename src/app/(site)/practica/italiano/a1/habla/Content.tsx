'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase { id: number; phrase: string; phonetic: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Ciao! Come stai?', phonetic: '[CHAO · KO-me STAI]', es: '¡Hola! ¿Cómo estás?', note: '"Ciao" es informal. Para contextos formales usa "Buongiorno" (buenos días) o "Buonasera" (buenas tardes/noches).', category: 'Saludos' },
  { id: 2, phrase: 'Mi chiamo Marco.', phonetic: '[mi KYA-mo MAR-ko]', es: 'Me llamo Marco.', note: '"Mi chiamo" = me llamo (literalmente "me llaman"). Equivale al español "me llamo". NO digas "Io sono Marco" para presentarte formalmente.', category: 'Presentación' },
  { id: 3, phrase: 'Sono di Colombia.', phonetic: '[SO-no di ko-LOM-bja]', es: 'Soy de Colombia.', note: '"Sono di" + ciudad/país. La "i" de "di" es corta. Para ciudades usa "di": sono di Bogotá. Para países también: sono di Colombia.', category: 'Presentación' },
  { id: 4, phrase: 'Piacere di conoscerti!', phonetic: '[pja-CHE-re di ko-NO-sher-ti]', es: '¡Mucho gusto (en conocerte)!', note: '"Piacere" es la forma rápida informal. La versión completa es "Molto piacere di conoscerti". La "c" antes de "e/i" suena [ch] como en "chico".', category: 'Presentación' },
  { id: 5, phrase: 'Grazie mille!', phonetic: '[GRAT-tsje MIL-le]', es: '¡Muchas gracias!', note: '"Grazie" = gracias. "Mille" = mil. "Grazie mille" literalmente "gracias mil". La "z" italiana suena [ts] como en "pizza".', category: 'Cortesía' },
  { id: 6, phrase: 'Prego!', phonetic: '[PRE-go]', es: '¡De nada! / ¡Adelante! / ¿Cómo no?', note: '"Prego" es polivalente: respuesta a grazie (de nada), invitar a pasar (adelante), o "sí diga" en el teléfono. Contexto es clave.', category: 'Cortesía' },
  { id: 7, phrase: 'Non capisco.', phonetic: '[non ka-PIS-ko]', es: 'No entiendo.', note: '"Capisco" viene da "capire" (tipo -isc-). Pronuncia la "c" antes de "i" como [ch]: [ka-PIS-ko]. Para pedir más lentitud: "Può parlare più lentamente?"', category: 'Ayuda' },
  { id: 8, phrase: 'Può ripetere, per favore?', phonetic: '[pwò ri-PE-te-re per fa-VO-re]', es: '¿Puede repetir, por favor?', note: '"Può" = puede (usted formal). La "u" con acento es breve. "Per favore" = por favor. Alternativa informal: "Puoi ripetere?"', category: 'Ayuda' },
  { id: 9, phrase: 'Dov\'è il bagno?', phonetic: '[do-VE il BAN-yo]', es: '¿Dónde está el baño?', note: '"Dov\'è" = "dove è" contraído. La "gn" italiana suena [ny] como la "ñ" española: bagno = [BAN-nyo]. ¡Muy parecido al español "baño"!', category: 'Supervivencia' },
  { id: 10, phrase: 'Quanto costa?', phonetic: '[KWAN-to KOS-ta]', es: '¿Cuánto cuesta?', note: '"Quanto" = cuánto. "Costa" de "costare" = costar. Exactamente igual que en español en estructura y significado. Fácil de recordar.', category: 'Supervivencia' },
  { id: 11, phrase: 'Ho bisogno di aiuto.', phonetic: '[o bi-ZON-yo di a-YU-to]', es: 'Necesito ayuda.', note: '"Ho bisogno di" = tengo necesidad de = necesito. La "h" es muda. "Aiuto" = ayuda (cognado). Pronuncia: [o bi-ZON-yo di a-YU-to].', category: 'Supervivencia' },
  { id: 12, phrase: 'Arrivederci!', phonetic: '[ar-ri-ve-DER-chi]', es: '¡Hasta luego!', note: '"Arrivederci" = hasta volvernos a ver (a + rivedere + ci). Informal: "Ciao!" o "A presto!" (hasta pronto). La "c" antes de "i" suena [ch].', category: 'Despedidas' },
  { id: 13, phrase: 'Come si dice ___ in italiano?', phonetic: '[KO-me si DI-che ... in i-ta-LYA-no]', es: '¿Cómo se dice ___ en italiano?', note: '"Come si dice" = ¿cómo se dice? Sujeto impersonal "si". Ejemplo: "Come si dice \'gracias\' in italiano?" → "Grazie!" Indispensable para aprender vocabulario en contexto.', category: 'Ayuda' },
  { id: 14, phrase: 'Può parlare più lentamente?', phonetic: '[pwò par-LA-re pyu len-ta-MEN-te]', es: '¿Puede hablar más despacio?', note: '"Può" = puede (Lei formal). "Parlare" = hablar. "Più lentamente" = más lentamente. Alternativa informal: "Parla più piano?" (piano = despacio/suave). Muy útil con hablantes nativos rápidos.', category: 'Ayuda' },
  { id: 15, phrase: 'Sto bene, grazie!', phonetic: '[sto BE-ne GRAT-tsje]', es: '¡Estoy bien, gracias!', note: '"Sto bene" usa STARE, no essere. Regla: para estados temporales → stare. "Come stai?" → "Sto bene!" "Come sta?" (formal) → "Sto benissimo!" (muy bien) o "Non sto bene" (no estoy bien).', category: 'Saludos' },
  { id: 16, phrase: 'Ho fame / Ho sete.', phonetic: '[o FA-me] / [o SE-te]', es: 'Tengo hambre / Tengo sed.', note: '"Avere fame/sete" = tener hambre/sed. En italiano las sensaciones físicas usan AVERE (tener): ho fame, ho sete, ho sonno (sueño), ho freddo (frío), ho caldo (calor), ho paura (miedo).', category: 'Supervivencia' },
  { id: 17, phrase: 'Mi dispiace.', phonetic: '[mi dis-PYA-che]', es: 'Lo siento / Me arrepiento.', note: '"Mi dispiace" = literalmente "me duele/pesa". Scusa/Scusi = disculpa (para chocar, interrumpir). Mi dispiace = lo siento (para condolencias o errores graves). La "c" antes de "e" suena [ch].', category: 'Cortesía' },
  { id: 18, phrase: 'Va bene!', phonetic: '[va BE-ne]', es: '¡Está bien! / ¡De acuerdo!', note: '"Va bene" = lit. "va bien". Equivale a "OK", "de acuerdo", "está bien". "Va benissimo!" = perfectísimo. Pregunta: "Va bene così?" (¿Así está bien?) Respuesta: "Sì, va benissimo!"', category: 'Cortesía' },
  { id: 19, phrase: 'A che ora...?', phonetic: '[a ke O-ra]', es: '¿A qué hora...?', note: '"A che ora" = a qué hora. Ejemplo: "A che ora chiude il museo?" (¿A qué hora cierra el museo?). "A che ora ci vediamo?" (¿A qué hora nos vemos?). Para decir la hora: "Sono le tre" (Son las tres).', category: 'Supervivencia' },
  { id: 20, phrase: 'Vorrei un caffè, per favore.', phonetic: '[vor-REI un kaf-FE per fa-VO-re]', es: 'Quisiera un café, por favor.', note: '"Vorrei" = quisiera (condicional de volere). Es más educado que "voglio" (quiero). Úsalo en bares, restaurantes y tiendas. "Vorrei un cornetto e un cappuccino" (quisiera un croissant y un capuchino).', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaItalianoA1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Espressione orale · Italiano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Frasi di sopravvivenza</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frases esenciales con pronunciación detallada y notas para hispanohablantes. Practica en voz alta y marca las que dominas.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length} praticate</span>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, textTransform: 'uppercase' }}>{p.category}</span>
                      {isPracticed && <span style={{ fontSize: '0.6rem', color: 'var(--wl-on-panel-ok, #059669)', fontWeight: 700 }}>✓ practicata</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '0.15rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600, marginBottom: '0.15rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.25rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: 'rgba(217,119,6,0.04)' }}>
                    <p style={{ margin: '0 0 0.85rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.65 }}>🗣️ {p.note}</p>
                    <button onClick={() => mark(p.id, !isPracticed)}
                      className={isPracticed ? 'btn btn-ghost btn-sm' : 'btn btn-sm'}
                      style={{ fontSize: '0.8rem', ...(isPracticed ? {} : { background: COLOR, borderColor: COLOR }) }}>
                      {isPracticed ? '↩ Marcar como no practicada' : '✓ Marcar como practicada'}
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
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>Bravissimo/a! Hai praticato tutte le frasi.</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--muted)' }}>Ora sei pronto per una conversazione A1 in italiano.</p>
          </div>
        )}
      </div>
    </section>
  );
}
