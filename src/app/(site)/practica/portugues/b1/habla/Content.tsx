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
  { id: 1, phrase: 'Na minha opinião, seria necessário que…', es: 'En mi opinión, sería necesario que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: 'Seguido de subjuntivo. Más formal que "eu acho que". Forma B1 essencial.' },
  { id: 2, phrase: 'Concordo completamente com o senhor / a senhora.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "com você" en contexto informal. "O senhor/a senhora" es el tratamiento formal.' },
  { id: 3, phrase: 'Não tenho certeza de que essa seja a melhor solução.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: 'Subjuntivo ("seja") depois de "ter certeza de que" en negativo.' },
  { id: 4, phrase: 'O senhor poderia me explicar o que quis dizer com isso?', es: '¿Podría explicarme qué quiso decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Condicional de cortesia. Fórmula muito usada em ambientes profissionais.' },
  { id: 5, phrase: 'Se eu entendi bem, o senhor está sugerindo que…', es: 'Si lo entendí bien, usted está sugiriendo que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Permite reformular e confirmar o que o interlocutor disse.' },
  { id: 6, phrase: 'Pergunto-me se não seria possível considerar uma outra abordagem.', es: 'Me pregunto si no sería posible considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Muy diplomático. Propone la idea sin imponerla.' },
  { id: 7, phrase: 'No que diz respeito à sua proposta, ela merece reflexão.', es: 'En cuanto a su propuesta, merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"No que diz respeito a" = en cuanto a. Construcción muy formal.' },
  { id: 8, phrase: 'Devo admitir que o senhor tem razão nesse ponto.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: 'Demuestra honestidad intelectual y apertura en el debate.' },
  { id: 9, phrase: 'Dito isso, também precisamos levar em conta que…', es: 'Dicho esto, también debemos tener en cuenta que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Dito isso" = dicho esto. Conector muito útil em debates formais.' },
  { id: 10, phrase: 'Se refletirmos bem, percebemos que…', es: 'Si reflexionamos bien, nos damos cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: 'Convida o interlocutor a raciocinar junto antes de concluir.' },
  { id: 11, phrase: 'Permita-me esclarecer o que disse.', es: 'Permítame aclarar lo que dije.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: 'Imperativo de cortesia com "me". "Esclarecer" = aclarar.' },
  { id: 12, phrase: 'Parece-me que a situação é mais complexa do que isso.', es: 'Me parece que la situación es más compleja que eso.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Parece-me" = me parece. Mais modesto que "eu acho". Coloca o verbo antes.' },
  { id: 13, phrase: 'O que o senhor acha da possibilidade de…?', es: '¿Qué piensa usted de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Fórmula aberta para propor ideias sem as impor.' },
  { id: 14, phrase: 'De modo geral, acho que é uma boa ideia.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"De modo geral" = em geral/no geral. Útil para resumir.' },
  { id: 15, phrase: 'Quero deixar claro que não foi exatamente isso que quis dizer.', es: 'Quiero dejar claro que no fue exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Deixar claro" = dejar claro. Expresión muy directa y frecuente.' },
  { id: 16, phrase: 'Para ser honesto/a, não tinha considerado esse aspecto.', es: 'Para ser honesto/a, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: 'Mostra abertura mental e honestidade no debate.' },
  { id: 17, phrase: 'Sem querer contradizer seu ponto de vista, acredito que…', es: 'Sin querer contradecir su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Fórmula muito diplomática. Ideal para debates acadêmicos.' },
  { id: 18, phrase: 'Talvez fosse preferível…', es: 'Quizás sería preferible…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Imperfeito do subjuntivo "fosse" para hipótese cortês. Forma B1.' },
  { id: 19, phrase: 'No fim das contas, o que importa é…', es: 'A fin de cuentas, lo que importa es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"No fim das contas" = a fin de cuentas/al final del día.' },
  { id: 20, phrase: 'Concordo com o senhor nesse ponto, mas acrescentaria que…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Acrescentar" = añadir/agregar. Condicional "acrescentaria" para ampliar.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaPortuguesB1() {
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Portugués B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣 Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Produção oral · Portugués B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          20 expresiones B1 para debates, reuniones y conversaciones formales en portugués brasileño. Practica cada una en voz alta.
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
          <Link href="/practica/portugues/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/portugues/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>.
        </div>
      </div>
    </section>
  );
}
