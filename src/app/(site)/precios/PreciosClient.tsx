'use client';

import { useState } from 'react';
import Link from 'next/link';

const WA = '573005004253';
function waLink(plan: string, langName: string) {
  const msg = plan === 'intensivo'
    ? `Hola, quiero reservar un cupo en el plan Intensivo de ${langName} en WeLearn.`
    : `Hola, quiero empezar con el plan ${plan} de ${langName} en WeLearn. ¿Cómo funciona?`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

const LANGUAGES = [
  { slug: 'ingles',    flag: '🇬🇧', name: 'Inglés',    exams: ['IELTS', 'TOEFL iBT', 'ICFES'],          landing: '/clases-de-ingles' },
  { slug: 'coreano',   flag: '🇰🇷', name: 'Coreano',   exams: ['TOPIK I', 'TOPIK II'],                   landing: '/clases-de-coreano' },
  { slug: 'frances',   flag: '🇫🇷', name: 'Francés',   exams: ['DELF A1–B2', 'DALF C1–C2'],              landing: '/clases-de-frances' },
  { slug: 'aleman',    flag: '🇩🇪', name: 'Alemán',    exams: ['Goethe A1', 'Goethe B1', 'Goethe C1'],   landing: '/clases-de-aleman' },
  { slug: 'italiano',  flag: '🇮🇹', name: 'Italiano',  exams: ['CILS', 'CELI'],                          landing: '/clases-de-italiano' },
  { slug: 'portugues', flag: '🇧🇷', name: 'Portugués', exams: ['CELPE-Bras'],                            landing: '/clases-de-portugues' },
];

function formatCOP(n: number) {
  return '$' + n.toLocaleString('es-CO');
}

type BlogArticle = { cat: string; color: string; title: string; slug: string };

const BLOG_BY_LANG: Record<string, BlogArticle[]> = {
  ingles: [
    { cat: 'Método',   color: '#c87941', title: '¿Cuánto cuesta aprender inglés en Colombia en 2026?', slug: 'cuanto-cuesta-aprender-ingles-colombia-2026' },
    { cat: 'Inglés',   color: '#1a4fcc', title: 'Clases de inglés online en Colombia: guía 2026', slug: 'clases-de-ingles-online-colombia' },
    { cat: 'Inglés',   color: '#1a4fcc', title: 'Niveles A1–C2: qué significa cada nivel y para qué sirve', slug: 'niveles-de-ingles-a1-a2-b1-b2-c1-c2' },
  ],
  coreano: [
    { cat: 'Coreano',  color: '#c8202e', title: '¿Cuánto cuesta aprender coreano en Colombia en 2026?', slug: 'cuanto-cuesta-aprender-coreano-colombia-2026' },
    { cat: 'Coreano',  color: '#c8202e', title: 'Clases de coreano online en Colombia: guía para elegir bien', slug: 'clases-de-coreano-online-colombia' },
    { cat: 'Coreano',  color: '#c8202e', title: 'TOPIK I: cómo prepararlo desde cero y pasar al primer intento', slug: 'topik-1-preparacion-guia-para-principiantes' },
  ],
  frances: [
    { cat: 'Francés',  color: '#1a2ecc', title: 'DELF y DALF: cuál nivel necesitas según tu objetivo', slug: 'delf-cual-nivel-necesitas-y-para-que-sirve' },
    { cat: 'Francés',  color: '#1a2ecc', title: 'TCF Canadá: francés para inmigrar a Quebec', slug: 'tcf-canada-frances-para-inmigrar-a-quebec' },
    { cat: 'Francés',  color: '#1a2ecc', title: 'Francés para estudiar medicina en Francia o Bélgica', slug: 'frances-para-estudiar-medicina-en-francia-belgica' },
  ],
  aleman: [
    { cat: 'Alemán',   color: '#1a2ecc', title: 'Alemán para enfermería en Alemania: B2 y Fachsprachprüfung', slug: 'aleman-para-enfermeria-en-alemania' },
    { cat: 'Alemán',   color: '#1a2ecc', title: 'Trabajar en Alemania: ¿qué nivel de alemán necesitas?', slug: 'trabajar-en-alemania-nivel-aleman-requerido' },
    { cat: 'Alemán',   color: '#1a2ecc', title: 'Goethe-Zertifikat: guía completa para colombianos', slug: 'goethe-zertifikat-guia-completa-colombia' },
  ],
  italiano: [
    { cat: 'Italiano', color: '#009246', title: 'Estudiar en Italia: costos, nivel de italiano y cómo aplicar', slug: 'italiano-para-estudiar-en-italia-costos-y-requisitos' },
    { cat: 'Italiano', color: '#009246', title: 'Ciudadanía italiana: el requisito de italiano B1 explicado', slug: 'ciudadania-italiana-italiano-b1-requisito' },
    { cat: 'Italiano', color: '#009246', title: 'CILS y CELI: la guía completa para certificar tu italiano', slug: 'cils-celi-certificacion-italiano-colombia' },
  ],
  portugues: [
    { cat: 'Portugués', color: '#166534', title: 'Portugués para negocios con Brasil: nivel y guía práctica', slug: 'portugues-para-negocios-con-brasil-nivel-recomendado' },
    { cat: 'Portugués', color: '#166534', title: '¿Cuánto cuesta aprender portugués en Colombia en 2026?', slug: 'cuanto-cuesta-aprender-portugues-colombia-2026' },
    { cat: 'Portugués', color: '#166534', title: 'Celpe-Bras: qué es, requisitos y cómo prepararse desde Colombia', slug: 'celpe-bras-que-es-como-prepararse' },
  ],
};

export default function PreciosClient() {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [sessions, setSessions] = useState<2 | 4>(2);
  const [annual, setAnnual] = useState(false);

  const multiply = annual ? 10 : 12;
  const priceFor = (monthly: number) =>
    annual
      ? Math.round((monthly * 10) / 12)
      : monthly;

  return (
    <main className="wlp-page">
      <div className="wrap">

        {/* ── Header ── */}
        <div className="wlp-header">
          <p className="wlh-section-eyebrow" style={{ textAlign: 'center' }}>Precios</p>
          <h1 className="wlp-h1">Un plan. Cualquier idioma.</h1>
          <p className="wlp-subtitle">
            Precios únicos para todos los idiomas y exámenes. Sin letra pequeña.
          </p>

          {/* Billing toggle */}
          <div className="wlp-billing-toggle">
            <button
              className={`wlp-billing-btn${!annual ? ' is-active' : ''}`}
              onClick={() => setAnnual(false)}
            >
              Mensual
            </button>
            <button
              className={`wlp-billing-btn${annual ? ' is-active' : ''}`}
              onClick={() => setAnnual(true)}
            >
              Anual
              <span className="wlp-billing-badge">2 meses gratis</span>
            </button>
          </div>
        </div>

        {/* ── Language tabs ── */}
        <div className="wlp-lang-tabs" role="tablist" aria-label="Idioma">
          {LANGUAGES.map(l => (
            <button
              key={l.slug}
              role="tab"
              aria-selected={lang.slug === l.slug}
              className={`wlp-lang-tab${lang.slug === l.slug ? ' is-active' : ''}`}
              onClick={() => setLang(l)}
            >
              <span className="wlp-lang-tab__flag">{l.flag}</span>
              <span className="wlp-lang-tab__name">{l.name}</span>
            </button>
          ))}
        </div>

        {/* ── Exam chips ── */}
        <div className="wlp-exam-chips">
          <span className="wlp-exam-chips__label">Exámenes incluidos:</span>
          {lang.exams.map(ex => (
            <span key={ex} className="wlp-exam-chip">{ex}</span>
          ))}
          {lang.landing && (
            <Link href={lang.landing} style={{ marginLeft: 4, fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Ver clases de {lang.name} →
            </Link>
          )}
        </div>

        {/* ── Plans grid ── */}
        <div className="wlp-plans-grid">

          {/* AUTODIDACTA */}
          <div className="wlp-plan-card">
            <div className="wlp-plan-card__top">
              <span className="wlp-plan-card__tier">Para empezar</span>
              <h2 className="wlp-plan-card__name">Autodidacta</h2>
              <div className="wlp-plan-card__price-row">
                <span className="wlp-plan-card__price">{formatCOP(priceFor(50000))}</span>
                <span className="wlp-plan-card__cadence">/ mes</span>
              </div>
              {annual && (
                <p className="wlp-plan-card__annual-note">
                  {formatCOP(50000 * 10)} facturado anualmente
                </p>
              )}
              <p className="wlp-plan-card__desc">
                Practica solo, a tu ritmo. Acceso completo al banco de simulacros de {lang.name}.
              </p>
            </div>
            <ul className="wlp-plan-card__features">
              <li className="is-included">Simulacros ilimitados de {lang.exams[0]}</li>
              <li className="is-included">Banco de +500 preguntas reales</li>
              <li className="is-included">Resultados automáticos por sección</li>
              <li className="is-included">Acceso a todos los simulacros del examen</li>
              <li className="is-excluded">Retroalimentación docente</li>
              <li className="is-excluded">Material educativo</li>
              <li className="is-excluded">Sesiones en vivo con tutor</li>
            </ul>
            <a href={waLink('Autodidacta', lang.name)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost wlp-plan-card__cta">
              Empezar ahora
            </a>
          </div>

          {/* PREPARACIÓN — featured */}
          <div className="wlp-plan-card wlp-plan-card--featured">
            <div className="wlp-plan-card__top">
              <span className="wlp-plan-card__tier wlp-plan-card__tier--accent">Más popular</span>
              <h2 className="wlp-plan-card__name">Preparación</h2>
              <div className="wlp-plan-card__price-row">
                <span className="wlp-plan-card__price">{formatCOP(priceFor(180000))}</span>
                <span className="wlp-plan-card__cadence">/ mes</span>
              </div>
              {annual && (
                <p className="wlp-plan-card__annual-note">
                  {formatCOP(180000 * 10)} facturado anualmente
                </p>
              )}
              <p className="wlp-plan-card__desc">
                Practica con corrección real. Sabe exactamente dónde mejorar en {lang.exams[0]}.
              </p>
            </div>
            <ul className="wlp-plan-card__features">
              <li className="is-included">Todo lo de Autodidacta</li>
              <li className="is-included">Feedback escrito por cada sección</li>
              <li className="is-included">Informe de errores personalizado</li>
              <li className="is-included">Material de preparación para {lang.exams[0]}</li>
              <li className="is-included">Chat con tutor (respuesta en 24 h)</li>
              <li className="is-excluded">Sesiones en vivo con tutor</li>
              <li className="is-excluded">Plan de estudio personalizado</li>
            </ul>
            <a href={waLink('Preparación', lang.name)} target="_blank" rel="noopener noreferrer" className="btn wlp-plan-card__cta">
              Empezar ahora
            </a>
          </div>

          {/* INTENSIVO */}
          <div className="wlp-plan-card">
            <div className="wlp-plan-card__top">
              <span className="wlp-plan-card__tier">Con acompañamiento</span>
              <h2 className="wlp-plan-card__name">Intensivo</h2>

              {/* Session toggle */}
              <div className="wlp-session-toggle">
                <button
                  className={`wlp-session-btn${sessions === 2 ? ' is-active' : ''}`}
                  onClick={() => setSessions(2)}
                >
                  2 sesiones / sem
                </button>
                <button
                  className={`wlp-session-btn${sessions === 4 ? ' is-active' : ''}`}
                  onClick={() => setSessions(4)}
                >
                  4 sesiones / sem
                </button>
              </div>

              <div className="wlp-plan-card__price-row">
                <span className="wlp-plan-card__price">
                  {formatCOP(priceFor(sessions === 2 ? 280000 : 480000))}
                </span>
                <span className="wlp-plan-card__cadence">/ mes</span>
              </div>
              {annual && (
                <p className="wlp-plan-card__annual-note">
                  {formatCOP((sessions === 2 ? 280000 : 480000) * 10)} facturado anualmente
                </p>
              )}
              <p className="wlp-plan-card__desc">
                Preparación guiada de principio a fin con tutor asignado para {lang.name}.
              </p>
            </div>
            <ul className="wlp-plan-card__features">
              <li className="is-included">Todo lo de Preparación</li>
              <li className="is-included">Material educativo exclusivo</li>
              <li className="is-included">{sessions === 2 ? '2' : '4'} sesiones semanales en vivo</li>
              <li className="is-included">Plan de estudio personalizado</li>
              <li className="is-included">Evaluación mensual de progreso</li>
              <li className="is-included">Tutor asignado para {lang.name}</li>
              <li className="is-included wlp-feature--limited">Cupos limitados · Inicio próxima semana</li>
            </ul>
            <a href={waLink('intensivo', lang.name)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost wlp-plan-card__cta">
              Reservar cupo
            </a>
          </div>

        </div>

        {/* ── Footer note ── */}
        <p className="wlp-footer-note">
          Todos los planes incluyen <strong>3 días de prueba gratis</strong> · Sin tarjeta de crédito · Cancela cuando quieras
        </p>

        {/* ── Comparison table ── */}
        <CompareTable lang={lang.name} exam={lang.exams[0]} sessions={sessions} annual={annual} />

        {/* ── Blog resources (dynamic by language) ── */}
        <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--line-soft)' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>Del blog WeLearn</p>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem' }}>Guías para tomar la mejor decisión</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.85rem' }}>
            {(BLOG_BY_LANG[lang.slug] ?? BLOG_BY_LANG.ingles).map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}>
                <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: a.color, background: a.color + '18', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>{a.cat}</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{a.title} →</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

function CompareTable({ lang, exam, sessions, annual }: { lang: string; exam: string; sessions: 2 | 4; annual: boolean }) {
  const [open, setOpen] = useState(false);
  const p = (n: number) => annual ? Math.round(n * 10 / 12) : n;

  const rows: { label: string; auto: string | boolean; prep: string | boolean; int: string | boolean }[] = [
    { label: 'Simulacros ilimitados',              auto: true,  prep: true,  int: true  },
    { label: 'Banco de preguntas reales',           auto: true,  prep: true,  int: true  },
    { label: 'Resultados automáticos',              auto: true,  prep: true,  int: true  },
    { label: 'Feedback escrito por sección',        auto: false, prep: true,  int: true  },
    { label: 'Informe de errores',                  auto: false, prep: true,  int: true  },
    { label: `Material de prep. ${exam}`,           auto: false, prep: true,  int: true  },
    { label: 'Chat con tutor (24 h)',               auto: false, prep: true,  int: true  },
    { label: 'Material educativo exclusivo',        auto: false, prep: false, int: true  },
    { label: `Sesiones en vivo (${sessions}/sem)`,  auto: false, prep: false, int: true  },
    { label: 'Plan de estudio personalizado',       auto: false, prep: false, int: true  },
    { label: 'Evaluación mensual de progreso',      auto: false, prep: false, int: true  },
    { label: 'Tutor asignado',                      auto: false, prep: false, int: true  },
  ];

  return (
    <div className="wlp-compare">
      <button className="wlp-compare__toggle" onClick={() => setOpen(o => !o)}>
        {open ? 'Ocultar' : 'Ver'} comparación completa {open ? '↑' : '↓'}
      </button>
      {open && (
        <div className="wlp-compare__table-wrap">
          <table className="wlp-compare__table">
            <thead>
              <tr>
                <th></th>
                <th>
                  <span className="wlp-compare__plan-name">Autodidacta</span>
                  <span className="wlp-compare__plan-price">{('$' + p(50000).toLocaleString('es-CO'))}/mes</span>
                </th>
                <th className="is-featured">
                  <span className="wlp-compare__plan-name">Preparación</span>
                  <span className="wlp-compare__plan-price">{('$' + p(180000).toLocaleString('es-CO'))}/mes</span>
                </th>
                <th>
                  <span className="wlp-compare__plan-name">Intensivo</span>
                  <span className="wlp-compare__plan-price">{('$' + p(sessions === 2 ? 280000 : 480000).toLocaleString('es-CO'))}/mes</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label}>
                  <td className="wlp-compare__feature">{row.label}</td>
                  <td className="wlp-compare__cell">{row.auto ? <Check /> : <Dash />}</td>
                  <td className="wlp-compare__cell is-featured">{row.prep ? <Check /> : <Dash />}</td>
                  <td className="wlp-compare__cell">{row.int ? <Check /> : <Dash />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Check() {
  return <span className="wlp-check" aria-label="Incluido">✓</span>;
}
function Dash() {
  return <span className="wlp-dash" aria-label="No incluido">—</span>;
}
