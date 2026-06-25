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
  { id: 1, phrase: 'À mon avis, il faudrait que…', es: 'En mi opinión, habría que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: 'Seguido de subjuntivo. Más formal que "je pense que".' },
  { id: 2, phrase: 'Je suis tout à fait d\'accord avec vous.', es: 'Estoy totalmente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "toi" en lugar de "vous" en contexto informal.' },
  { id: 3, phrase: 'Je ne suis pas sûr(e) que ce soit la meilleure solution.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: 'Subjonctif después de "sûr(e) que" en negativo.' },
  { id: 4, phrase: 'Pourriez-vous m\'expliquer ce que vous voulez dire par là ?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Conditionnel de politesse. Muy útil en contextos profesionales.' },
  { id: 5, phrase: 'Si j\'ai bien compris, vous suggérez que…', es: 'Si lo he entendido bien, usted sugiere que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Permite confirmar y reformular lo que el otro dijo.' },
  { id: 6, phrase: 'Je me demande si on ne pourrait pas envisager une autre approche.', es: 'Me pregunto si no podríamos contemplar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Muy diplomático, evita imponer una opinión directamente.' },
  { id: 7, phrase: 'En ce qui concerne votre proposition, elle mérite réflexion.', es: 'En cuanto a su propuesta, merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"En ce qui concerne" = "en cuanto a". Estructura muy francesa.' },
  { id: 8, phrase: 'Je dois admettre que vous avez raison sur ce point.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: 'Demuestra honestidad intelectual en un debate.' },
  { id: 9, phrase: 'Cela dit, il faut également tenir compte de…', es: 'Dicho esto, también hay que tener en cuenta…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Cela dit" = "dicho esto". Conector muy útil en debates.' },
  { id: 10, phrase: 'Si on réfléchit bien, on se rend compte que…', es: 'Si lo pensamos bien, nos damos cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: 'Invita al interlocutor a reflexionar junto contigo.' },
  { id: 11, phrase: 'Permettez-moi de nuancer ce que j\'ai dit.', es: 'Permítame matizar lo que dije.', context: 'Corregir o ampliar una idea propia', category: 'Clarificación', note: '"Nuancer" = matizar. Palabra clave en debates franceses.' },
  { id: 12, phrase: 'Il me semble que la situation est plus complexe que ça.', es: 'Me parece que la situación es más compleja que eso.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Il me semble que" es más modesto que "je pense que".' },
  { id: 13, phrase: 'Que pensez-vous de la possibilité de… ?', es: '¿Qué piensa usted de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Fórmula diplomática para introducir ideas sin imponerlas.' },
  { id: 14, phrase: 'Dans l\'ensemble, je pense que c\'est une bonne idée.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"Dans l\'ensemble" = en general/en conjunto.' },
  { id: 15, phrase: 'Je tiens à préciser que ce n\'est pas exactement ce que j\'ai voulu dire.', es: 'Quiero aclarar que no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Je tiens à" = quiero/me importa. Expresión de énfasis.' },
  { id: 16, phrase: 'Pour être honnête, je n\'avais pas envisagé cet aspect.', es: 'Para ser honesto, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: 'Muestra apertura mental y honestidad.' },
  { id: 17, phrase: 'Sans vouloir contredire votre point de vue, je pense que…', es: 'Sin querer contradecir su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Muy diplomático. Ideal para situaciones formales.' },
  { id: 18, phrase: 'Il serait peut-être préférable de…', es: 'Quizás sería preferible…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Conditionnel + "peut-être" lo hace muy suave y no impositivo.' },
  { id: 19, phrase: 'En fin de compte, ce qui compte c\'est…', es: 'A fin de cuentas, lo que importa es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"En fin de compte" = a fin de cuentas, al final.' },
  { id: 20, phrase: 'Je vous rejoins sur ce point, mais j\'ajouterais que…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Je vous rejoins" = me uno a usted/le doy la razón.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaFrancesB1() {
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
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Francés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣 Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Expression orale · Francés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          20 expresiones B1 para debates, reuniones y conversaciones formales en francés. Practica cada una en voz alta.
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
          <Link href="/practica/frances/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/frances/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>.
        </div>
      </div>
    </section>
  );
}
