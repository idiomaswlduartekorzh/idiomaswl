'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Filter, Lightbulb, MailCheck, RotateCcw } from 'lucide-react';

import {
  EMAIL_CATEGORIES,
  EMAIL_PROMPT_BANK,
  EMAIL_TONES,
  type EmailPromptBankItem,
} from './prompts';

type Category = (typeof EMAIL_CATEGORIES)[number];
type Tone = (typeof EMAIL_TONES)[number];

const ACCENT = '#1a4fcc';
const ETS_WRITING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html';

const INTERNAL_LINKS = [
  { href: '/practica/toefl/writing', label: 'TOEFL Writing hub' },
  { href: '/practica/toefl/writing/write-an-email', label: 'Guía Write an Email' },
  { href: '/practica/toefl/writing/academic-discussion/banco-de-prompts', label: 'Academic Discussion prompts' },
  { href: '/practica/toefl/writing/model-answers', label: 'Model answers' },
  { href: '/practica/toefl/writing/rubrica', label: 'Rúbrica' },
  { href: '/practica/toefl/writing/grammar-for-writing', label: 'Grammar for writing' },
  { href: '/practica/toefl/writing/integrated-writing', label: 'Integrated Writing legacy' },
];

function EmailCard({ prompt, featured = false }: { prompt: EmailPromptBankItem; featured?: boolean }) {
  const [showModel, setShowModel] = useState(featured);

  return (
    <article className="wl-card" style={{ padding: '1rem', borderRadius: 16, borderTop: `4px solid ${featured ? ACCENT : 'var(--line-soft)'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'start', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <div>
          <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 0 }}>
            {prompt.category} · {prompt.tone} · {prompt.difficulty}
          </p>
          <h3 style={{ margin: 0, fontSize: featured ? '1.2rem' : '1.05rem', color: 'var(--ink)', letterSpacing: 0 }}>{prompt.topic}</h3>
        </div>
        <button
          type="button"
          className={showModel ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
          onClick={() => setShowModel((current) => !current)}
          style={{ fontSize: '0.78rem' }}
        >
          {showModel ? 'Ocultar modelo' : 'Ver modelo'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '0.7rem' }}>
        <section style={{ padding: '0.9rem', borderRadius: 14, background: `${ACCENT}0d`, border: `1px solid ${ACCENT}25` }}>
          <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Situación</p>
          <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6 }}>{prompt.situation}</p>
        </section>

        <section style={{ padding: '0.85rem', borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--line-soft)' }}>
          <p style={{ margin: '0 0 0.3rem', fontWeight: 900, color: 'var(--ink)' }}>Task</p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58 }}>{prompt.task}</p>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.7rem' }}>
          <section style={{ padding: '0.85rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <p style={{ margin: '0 0 0.3rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Destinatario</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.9rem' }}>{prompt.audience}</p>
          </section>
          <section style={{ padding: '0.85rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <p style={{ margin: '0 0 0.3rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Propósito</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.9rem' }}>{prompt.purpose}</p>
          </section>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '0.7rem' }}>
          <section style={{ padding: '0.85rem', borderRadius: 14, background: 'rgba(26,79,204,0.06)', border: '1px solid rgba(26,79,204,0.18)' }}>
            <p style={{ margin: '0 0 0.35rem', display: 'flex', gap: '0.4rem', alignItems: 'center', color: 'var(--ink)', fontWeight: 900 }}>
              <Lightbulb size={16} color={ACCENT} /> Estrategia WeLearn
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{prompt.strategy}</p>
          </section>
          <section style={{ padding: '0.85rem', borderRadius: 14, background: 'rgba(180,83,9,0.07)', border: '1px solid rgba(180,83,9,0.18)' }}>
            <p style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontWeight: 900 }}>Trampa común</p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{prompt.trap}</p>
          </section>
        </div>

        <section>
          <p style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontWeight: 900 }}>Checklist de email</p>
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            {prompt.checklist.map((item) => (
              <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '20px 1fr', gap: '0.45rem', color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.45 }}>
                <CheckCircle2 size={15} color={ACCENT} />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </section>

        <section>
          <p style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontWeight: 900 }}>Frases útiles</p>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {prompt.usefulLanguage.map((phrase) => (
              <span key={phrase} style={{ border: `1px solid ${ACCENT}25`, background: `${ACCENT}0d`, color: 'var(--ink)', borderRadius: 999, padding: '0.38rem 0.55rem', fontSize: '0.8rem', lineHeight: 1.35 }}>
                {phrase}
              </span>
            ))}
          </div>
        </section>

        {showModel && (
          <section style={{ padding: '0.95rem', borderRadius: 14, background: 'rgba(4,120,87,0.07)', border: '1px solid rgba(4,120,87,0.2)' }}>
            <p style={{ margin: '0 0 0.4rem', color: 'var(--wl-on-panel-ok, #047857)', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Modelo WeLearn original
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--ink-2)', lineHeight: 1.68, whiteSpace: 'pre-line' }}>{prompt.modelEmail}</p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.88rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Por qué funciona:</strong> {prompt.whyItWorks}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}

export default function EmailPromptBankClient() {
  const [category, setCategory] = useState<Category>('All');
  const [tone, setTone] = useState<Tone>('All');
  const [query, setQuery] = useState('');

  const filteredPrompts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return EMAIL_PROMPT_BANK.filter((prompt) => {
      const matchesCategory = category === 'All' || prompt.category === category;
      const matchesTone = tone === 'All' || prompt.tone === tone;
      const matchesQuery =
        normalized.length === 0 ||
        [prompt.topic, prompt.category, prompt.tone, prompt.situation, prompt.task, prompt.audience, prompt.purpose]
          .join(' ')
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesTone && matchesQuery;
    });
  }, [category, tone, query]);

  return (
    <main className="wl-section">
      <div className="wrap" style={{ maxWidth: 1080 }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
          <span>/</span>
          <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
          <span>/</span>
          <Link href="/practica/toefl/writing/write-an-email" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Write an Email</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Banco de prompts</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.4rem' }}>
          <section>
            <p className="eyebrow" style={{ margin: '0 0 0.55rem' }}>
              <span className="ink-line" />TOEFL Writing · Write an Email
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)' }}>
              TOEFL Write an Email: banco de prompts
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
              Practica emails TOEFL por situación, tono y destinatario. Cada prompt incluye propósito, estrategia WeLearn, trampa común, checklist, frases útiles y un modelo original explicado.
            </p>
          </section>

          <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
            {[
              { label: 'Prompts', value: EMAIL_PROMPT_BANK.length.toString(), sub: 'originales' },
              { label: 'Tonos', value: '3', sub: 'formal a friendly' },
              { label: 'Clave', value: 'acción', sub: 'propósito y cierre' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800 }}>{item.label}</span>
                <strong style={{ color: ACCENT, fontFamily: 'var(--mono)', fontSize: '1.05rem', textAlign: 'right' }}>
                  {item.value}
                  <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.66rem', fontWeight: 700 }}>{item.sub}</span>
                </strong>
              </div>
            ))}
          </aside>
        </div>

        <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
          <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS incluye Write an Email como tarea actual de TOEFL iBT Writing. La respuesta debe resolver una situación comunicativa con claridad, gramática precisa, vocabulario adecuado y tono apropiado para el destinatario.
          </p>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos cinco pasos: saludo adecuado, propósito inmediato, detalles suficientes, petición o propuesta concreta y cierre accionable.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
            Fuente oficial revisada: <a href={ETS_WRITING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Writing Section</a>. Integrated Writing se mantiene como legacy/síntesis complementaria, no como tarea principal actual.
          </p>
        </section>

        <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>
                <Filter size={14} /> Banco filtrable
              </p>
              <h2 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: 0 }}>Elige situación, tono y propósito</h2>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setCategory('All');
                setTone('All');
                setQuery('');
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <RotateCcw size={15} />
              Reiniciar filtros
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>Categoría</span>
              <select value={category} onChange={(event) => setCategory(event.target.value as Category)} style={{ width: '100%', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '0.65rem 0.75rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit' }}>
                {EMAIL_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>Tono</span>
              <select value={tone} onChange={(event) => setTone(event.target.value as Tone)} style={{ width: '100%', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '0.65rem 0.75rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit' }}>
                {EMAIL_TONES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>Buscar</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="professor, office, job..." style={{ width: '100%', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '0.65rem 0.75rem', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit', boxSizing: 'border-box' }} />
            </label>
          </div>
        </section>

        <section aria-labelledby="featured-heading" style={{ marginBottom: '1.2rem' }}>
          <h2 id="featured-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Prompt recomendado para empezar
          </h2>
          <EmailCard prompt={EMAIL_PROMPT_BANK[0]} featured />
        </section>

        <section aria-labelledby="bank-heading">
          <h2 id="bank-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Prompts de práctica ({filteredPrompts.length})
          </h2>
          <div style={{ display: 'grid', gap: '0.95rem' }}>
            {filteredPrompts.map((prompt) => (
              <EmailCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>

        <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
            <MailCheck size={20} color={ACCENT} />
            <div>
              <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.15rem' }}>Cómo usar este banco sin memorizar emails</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
                Escribe tu email antes de mirar el modelo. Luego revisa si respondiste todos los puntos de la situación, si el tono coincide con el destinatario y si el cierre deja una acción clara. Los modelos son ejemplos originales de práctica, no respuestas oficiales ni textos para copiar.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="links-heading" style={{ marginTop: '1.45rem' }}>
          <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Sigue practicando TOEFL Writing
          </h2>
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
            {INTERNAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
