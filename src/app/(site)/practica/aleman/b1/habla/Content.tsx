'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number;
  phrase: string;
  es: string;
  context: string;
  category: string;
  note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Meiner Meinung nach sollte man…', es: 'En mi opinión, uno debería…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: '"Meiner Meinung nach" va al inicio y cambia el orden de sujeto y verbo.' },
  { id: 2, phrase: 'Da stimme ich Ihnen vollkommen zu.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "dir" en lugar de "Ihnen" en contexto informal (du-Form).' },
  { id: 3, phrase: 'Ich bin mir nicht sicher, ob das die beste Lösung ist.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: '"Ob" introduce una cláusula subordinada (verbo al final).' },
  { id: 4, phrase: 'Könnten Sie mir erklären, was Sie damit meinen?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Konjunktiv II de "können". Muy cortés y frecuente en reuniones.' },
  { id: 5, phrase: 'Wenn ich Sie richtig verstanden habe, schlagen Sie vor, dass…', es: 'Si le he entendido bien, propone usted que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Estructura con "wenn" seguida de Konjunktiv II para reformular.' },
  { id: 6, phrase: 'Wäre es nicht sinnvoller, einen anderen Ansatz zu wählen?', es: '¿No sería más sensato elegir otro enfoque?', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Konjunktiv II de "sein" + Infinitiv con "zu". Forma muy diplomática.' },
  { id: 7, phrase: 'Was Ihren Vorschlag betrifft, halte ich ihn für bedenkenswert.', es: 'En cuanto a su propuesta, la considero digna de reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"Was … betrifft" = en cuanto a. Construcción topicalizadora formal.' },
  { id: 8, phrase: 'Ich muss zugeben, dass Sie in diesem Punkt Recht haben.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: '"Zugeben" = admitir, reconocer. Verbo separable: gibt…zu.' },
  { id: 9, phrase: 'Gleichwohl sollte man auch bedenken, dass…', es: 'Sin embargo, también habría que considerar que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Gleichwohl" = sin embargo/no obstante. Conector formal y elegante.' },
  { id: 10, phrase: 'Wenn man genau darüber nachdenkt, stellt man fest, dass…', es: 'Si uno reflexiona bien, se da cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: '"Man" = uno (impersonal). Muy alemán usar "man" en lugar de "ich".' },
  { id: 11, phrase: 'Erlauben Sie mir, das etwas zu präzisieren.', es: 'Permítame precisar un poco eso.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"Präzisieren" = precisar/matizar. Registro formal y profesional.' },
  { id: 12, phrase: 'Mir scheint, die Lage ist komplizierter als gedacht.', es: 'Me parece que la situación es más complicada de lo que se pensaba.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Mir scheint" = me parece. Más modesto y formal que "Ich denke".' },
  { id: 13, phrase: 'Was denken Sie über die Möglichkeit, dass…?', es: '¿Qué piensa usted sobre la posibilidad de que…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Cláusula con "dass" y verbo al final. Fórmula abierta y diplomática.' },
  { id: 14, phrase: 'Insgesamt finde ich, dass es sich um eine gute Idee handelt.', es: 'En general, creo que se trata de una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"Es handelt sich um" = se trata de. Expresión formal muy frecuente.' },
  { id: 15, phrase: 'Ich möchte betonen, dass das nicht genau meinte, was ich sagen wollte.', es: 'Quiero enfatizar que eso no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Betonen" = enfatizar/subrayar. Konjunktiv II "wollte" en cláusula relativa.' },
  { id: 16, phrase: 'Ehrlich gesagt hatte ich diesen Aspekt nicht berücksichtigt.', es: 'Sinceramente, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: '"Ehrlich gesagt" = sinceramente/honestamente. Frase hecha muy usada.' },
  { id: 17, phrase: 'Ohne Ihren Standpunkt in Frage stellen zu wollen, denke ich…', es: 'Sin querer cuestionar su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Infinitiv con "zu" + modalidad. Estructura muy formal y respetuosa.' },
  { id: 18, phrase: 'Es wäre vielleicht besser, wenn wir…', es: 'Quizás sería mejor si nosotros…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Konjunktiv II "wäre" + "wenn"-Satz. Forma suave de sugerir.' },
  { id: 19, phrase: 'Letzten Endes kommt es darauf an, dass…', es: 'A fin de cuentas, lo que importa es que…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"Letzten Endes" = a fin de cuentas, en definitiva.' },
  { id: 20, phrase: 'Ich stimme Ihnen in diesem Punkt zu, würde aber hinzufügen, dass…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: 'Konjunktiv II "würde" para la parte de ampliación. Muy elegante.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaAlemanB1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number) {
    setPracticed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Alemán B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣 Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Mündlicher Ausdruck · Alemán B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          20 expresiones B1 para debates, reuniones y conversaciones formales en alemán. Practica cada una en voz alta.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Progreso: {practiced.size}/{PHRASES.length} practicadas</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: COLOR, fontFamily: 'var(--mono)' }}>{pct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'var(--line-soft)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 99, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', borderRadius: 20, border: `1.5px solid ${filter === cat ? COLOR : 'var(--line-soft)'}`, background: filter === cat ? COLOR : 'transparent', color: filter === cat ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => (
            <div key={p.id} style={{ border: `1.5px solid ${practiced.has(p.id) ? COLOR : 'var(--line-soft)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <button onClick={() => mark(p.id)} style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${practiced.has(p.id) ? COLOR : 'var(--line-soft)'}`, background: practiced.has(p.id) ? COLOR : 'transparent', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {practiced.has(p.id) ? '✓' : ''}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{p.phrase}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{p.es}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>{p.context}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(217,119,6,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.category}</span>
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{ fontSize: '0.72rem', color: COLOR, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    {expanded === p.id ? '▲ menos' : '▼ nota'}
                  </button>
                </div>
              </div>
              {expanded === p.id && (
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: 'rgba(217,119,6,0.04)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  💡 {p.note}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Refuerza tu vocabulario en{' '}
          <Link href="/practica/aleman/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/aleman/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>.
        </div>
      </div>
    </section>
  );
}
