'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "Secondo me, ...", phonetic: "[se-KON-do me]", es: "En mi opinión, ...", note: '"Secondo me" es la forma más común para dar opiniones. Formal: "A mio avviso" / "A mio parere". Informal: "Per me" / "Io penso che...". Seguir siempre con una frase completa.', category: "Opinioni" },
  { id: 2, phrase: "Sono d'accordo / Non sono d'accordo.", phonetic: "[SO-no dak-KOR-do]", es: "Estoy de acuerdo / No estoy de acuerdo.", note: 'Para estar parcialmente de acuerdo: "Sono parzialmente d\'accordo" o "Hai ragione, però...". Para desacuerdo suave: "Non sono del tutto d\'accordo perché..."', category: "Opinioni" },
  { id: 3, phrase: "Hai/Ha ragione.", phonetic: "[ai ra-JO-ne / a ra-JO-ne]", es: "Tienes/Tiene razón.", note: '"Hai ragione" (informal, tu) / "Ha ragione" (formal, lei). Útil para validar el punto de alguien antes de añadir tu perspectiva. Seguir con "però..." o "e inoltre..."', category: "Opinioni" },
  { id: 4, phrase: "Potrebbe ripetere, per favore?", phonetic: "[po-TRÈB-be ri-pe-TE-re per fa-VO-re]", es: "¿Podría repetir, por favor?", note: '"Potrebbe" es el condicional formal de "potere". Informal: "Puoi ripetere?" También: "Non ho capito bene" / "Può parlare più lentamente?" (¿Puede hablar más despacio?).', category: "Comprensione" },
  { id: 5, phrase: "Cosa significa ___?", phonetic: "[KO-za si-NÌ-fi-ka]", es: "¿Qué significa ___?", note: 'Estrategia de comunicación esencial. También: "Come si dice ___ in italiano?" / "Può fare un esempio?" (¿Puede dar un ejemplo?). Pedir aclaración muestra madurez comunicativa.', category: "Comprensione" },
  { id: 6, phrase: "Non ho capito bene. Può/Puoi spiegare?", phonetic: "[non o ka-PI-to BÈ-ne. pwo / pwoi spyè-GA-re]", es: "No entendí bien. ¿Puede/Puedes explicar?", note: '"Non ho capito" = no entendí (passato prossimo). Formal: "Può spiegare?" / Informal: "Puoi spiegare?" La honestidad sobre la comprensión es muy valorada en italiano.', category: "Comprensione" },
  { id: 7, phrase: "Quanto costa il biglietto per ___?", phonetic: "[KWAN-to KOS-ta il bi-LYÈt-to per]", es: "¿Cuánto cuesta el billete para ___?", note: '"Biglietto" = billete/tiquete para transporte. Para entradas de museos/espectáculos también se usa "biglietto". Alternativa: "Quanto viene?" (¿Cuánto sale?) es muy coloquial.', category: "Viaggi" },
  { id: 8, phrase: "Dov'è la fermata dell'autobus / la stazione?", phonetic: "[do-VÈ la fer-MA-ta del-lau-TO-bus / la sta-TSYÓ-ne]", es: "¿Dónde está la parada de autobús / la estación?", note: '"Dov\'è" = ¿dónde está? Contracción de "dove è". Para metro: "la fermata della metropolitana". Para tren: "la stazione". Para aeropuerto: "l\'aeroporto".', category: "Viaggi" },
  { id: 9, phrase: "Vorrei prenotare un tavolo / una camera.", phonetic: "[vor-RÈI pre-no-TA-re un TA-vo-lo / U-na KA-me-ra]", es: "Quisiera reservar una mesa / una habitación.", note: '"Vorrei" es el condicional de "volere" — muy educado. Más formal: "Desidererei prenotare". Para confirmar: "A che nome?" (¿A qué nombre?) o "Per quante persone?" (¿Para cuántas personas?).', category: "Viaggi" },
  { id: 10, phrase: "A che ora apre / chiude?", phonetic: "[a ke O-ra A-pre / KYÙ-de]", es: "¿A qué hora abre / cierra?", note: '"Apre" = abre (3ª persona singular de aprire). "Chiude" = cierra (3ª persona de chiudere). Para preguntar si está abierto: "È aperto/a?" Para horarios: "Qual è l\'orario?" ', category: "Viaggi" },
  { id: 11, phrase: "Lavoro come ___ da circa ___.", phonetic: "[la-VO-ro KO-me ___ da CHI-ka]", es: "Trabajo como ___ desde hace aproximadamente ___.", note: '"Da circa" = desde hace aproximadamente. "Da" + período de tiempo = duración. Ejemplo: "Lavoro come insegnante da circa tre anni." No usar "per" para duración con el presente.', category: "Lavoro" },
  { id: 12, phrase: "Le mie responsabilità includono ___.", phonetic: "[le MIE re-spon-sa-bi-li-TÀ in-KLU-do-no]", es: "Mis responsabilidades incluyen ___.", note: 'Lenguaje profesional formal. Alternativas: "Mi occupo di ___" (Me encargo de) / "Sono responsabile di ___" (Soy responsable de). Para entrevistas: "Il mio ruolo prevede..." (Mi rol implica...).', category: "Lavoro" },
  { id: 13, phrase: "Potrei parlare con il responsabile?", phonetic: "[po-TRÈI par-LA-re kon il re-spon-SA-bi-le]", es: "¿Podría hablar con el responsable?", note: '"Potrei" = condicional de "potere" (yo podría). Más formal: "Sarebbe possibile parlare con...?" También: "Vorrei parlare con il direttore" (Quisiera hablar con el director).', category: "Lavoro" },
  { id: 14, phrase: "È più grande/piccolo/bello di ___.", phonetic: "[è pyu GRAN-de/PIK-ko-lo/BÈL-lo di]", es: "Es más grande/pequeño/hermoso que ___.", note: 'Comparativo di maggioranza: più + aggettivo + di. Usa "di" cuando comparas dos sustantivos. Usa "che" cuando comparas dos adjetivos del mismo sujeto: "È più bello che intelligente."', category: "Descrizione" },
  { id: 15, phrase: "È la persona più ___ che conosca.", phonetic: "[è la per-SO-na pyu ___ ke ko-NOS-ka]", es: "Es la persona más ___ que conozco.", note: 'Superlativo relativo: il/la + più + aggettivo. "Che conosca" usa el congiuntivo (nivel avanzado, pero se escucha mucho). En lenguaje coloquial también: "È la persona più... che conosco" (indicativo).', category: "Descrizione" },
  { id: 16, phrase: "Come si chiama? / Come si descrive?", phonetic: "[KO-me si KYA-ma / KO-me si de-SKRÍ-ve]", es: "¿Cómo se llama? / ¿Cómo se describe?", note: '"Come si chiama?" = ¿Cómo se llama? (para personas, lugares, cosas). "Si chiama" = se llama (reflexivo impersonal). Para pedir descripción física: "Com\'è?" / Para personalidad: "Che tipo è?"', category: "Descrizione" },
  { id: 17, phrase: "Da bambino/a, ___ ogni giorno.", phonetic: "[da bam-BI-no/a ___ O-nyì JOR-no]", es: "De niño/a, ___ todos los días.", note: '"Da bambino/a" = de niño/a. Usar con imperfetto: "Da bambino, giocavo a calcio ogni giorno." Estructuras similares: "Quando ero giovane..." / "Da ragazzo/a..." / "Negli anni scorsi..."', category: "Sociale" },
  { id: 18, phrase: "Non ci vediamo da un sacco di tempo!", phonetic: "[non chi ve-DYA-mo da un SAK-ko di TÈM-po]", es: "¡No nos vemos desde hace muchísimo tiempo!", note: '"Un sacco di" = muchísimo (muy coloquial). Formal: "Non ci vediamo da molto tempo" / "È molto che non ci vediamo". Continuación natural: "Come stai? / Cosa fai di bello?"', category: "Sociale" },
  { id: 19, phrase: "Ti va di venire con noi?", phonetic: "[ti va di ve-NI-re kon noi]", es: "¿Te apetece / te gustaría venir con nosotros?", note: '"Andare + di" = apetecer (coloquial). Formal: "Vorresti venire con noi?" (¿Querrías venir con nosotros?). Respuestas: "Certo, volentieri!" / "Mi dispiace, non posso."', category: "Sociale" },
  { id: 20, phrase: "Ci vediamo domani! / A presto!", phonetic: "[chi ve-DYA-mo do-MA-ni / a PRÈS-to]", es: "¡Nos vemos mañana! / ¡Hasta pronto!", note: '"Ci vediamo" = nos vemos (riflessivo reciproco). Alternativas: "A domani!" / "A dopo!" / "Ci sentiamo!" (¡Hablamos!). Para despedidas más formales: "Arrivederci" / "Arrivederla".', category: "Sociale" },
];

const CATEGORIES = ['Todos', 'Opinioni', 'Comprensione', 'Viaggi', 'Lavoro', 'Descrizione', 'Sociale'];

export default function HablaItalianoA2() {
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
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Parlato · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Espressione orale A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frasi essenziali con pronuncia, contesto situazionale e varianti formale/informale. Pratica ad alta voce e segna quelle che padroneggi.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>
            {practiced.size}/{PHRASES.length} praticate
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
          🎯 <strong style={{ color: 'var(--ink)' }}>Come praticare:</strong> Leggi la pronuncia in silenzio → dilla ad alta voce 3 volte → se riesci bene, segna ✓. Altrimenti lascia senza segno e torna dopo.
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
                      {done ? '✓ Padroneggiata' : 'Ce l\'ho fatta ✓'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0.7rem 1.25rem 0.85rem 4.5rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}04` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota di pronuncia e uso</div>
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
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>Hai completato le 20 frasi!</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Ora usale in una conversazione reale — applicale nella prossima lezione con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
