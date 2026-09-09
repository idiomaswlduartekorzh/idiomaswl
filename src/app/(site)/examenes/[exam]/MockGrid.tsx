import Link from 'next/link';
import type { Exam } from '@/data/exams';
import { hasGuidedMock, hasGuidedWorkbook } from '@/data/icfes/guided-registry';

const INITIAL_VISIBLE_MOCKS = 8;

export default function MockGrid({ exam }: { exam: Exam }) {
  if (!exam.available) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: 48, marginBottom: '1rem' }}>🚧</p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Simulacros en desarrollo
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: 460, margin: '0 auto 2rem' }}>
            Estamos preparando simulacros oficiales para {exam.name}. Déjanos tu correo y te avisamos cuando estén listos.
          </p>
          <Link href="/" className="btn">Notifícame cuando estén listos</Link>
        </div>
      </section>
    );
  }

  const freeMocks = exam.mocks.filter(m => m.free);
  const paidMocks = exam.mocks.filter(m => !m.free);
  const isIcfes = exam.slug === 'icfes';
  const icfesUniqueResources = isIcfes ? exam.mocks.length + 1 : 0;
  const icfesModes = isIcfes
    ? icfesUniqueResources + exam.mocks.filter(mock => hasGuidedMock(mock.id) || hasGuidedWorkbook(mock.id)).length
    : 0;
  const groups = exam.slug === 'icfes'
    ? [
        {
          id: 'practice',
          title: 'Prácticas propias abreviadas · 23 recursos',
          description: '23 recorridos creados por WeLearn para entrenar las siete partes. Tienen 45 preguntas y no reproducen la extensión estándar 2026-2 de 55 preguntas.',
          mocks: exam.mocks.filter(mock => !mock.badge),
        },
        {
          id: 'attributed',
          title: 'Bancos históricos atribuidos a material ICFES · 10 recursos',
          description: 'Banco local pendiente de cotejo primario por ítem. Se ofrece gratis para práctica y no implica afiliación, aval ni reproducción oficial.',
          mocks: exam.mocks.filter(mock => Boolean(mock.badge)),
        },
      ]
    : [{ id: 'all', title: 'Simulacros disponibles', description: '', mocks: exam.mocks }];

  const renderCards = (mocks: typeof exam.mocks) => (
    <div className="wl-mock-grid">
      {mocks.map((mock) => {
        const absoluteIndex = exam.mocks.findIndex(item => item.id === mock.id);
        return (
          <article key={mock.id} className={`wl-mock-card${mock.free ? '' : ' wl-mock-card--locked'}`}>
            <div className="wl-mock-card__header">
              <span className="wl-mock-card__num">{String(absoluteIndex + 1).padStart(2, '0')}</span>
              <div className="wl-mock-card__badges">
                {mock.badge ? <span className="wl-exam-status-chip">{mock.badge}</span> : null}
                <span className={`wl-mock-card__tag ${mock.free ? 'wl-mock-card__tag--free' : 'wl-mock-card__tag--pro'}`}>
                  {mock.free ? 'Gratis' : 'Pro'}
                </span>
              </div>
            </div>
            <h3 className="wl-mock-card__title">{mock.title}</h3>
            <p className="wl-mock-card__sub">{mock.subtitle}</p>
            <div className="wl-mock-card__stats">
              <span>{mock.parts} {mock.parts === 1 ? 'parte' : 'partes'}</span><span aria-hidden="true">·</span><span>{mock.questions} preguntas</span>
            </div>
            {mock.free ? (
              <div className="wl-mock-card__actions">
                <Link
                  href={mock.href ?? `/examenes/${exam.slug}/practica/${mock.id}`}
                  className="wl-mock-card__cta btn btn-sm"
                  {...(isIcfes ? {
                    'data-icfes-cta': 'catalog_resource_open',
                    'data-icfes-mode': 'exam',
                    'data-icfes-resource-id': mock.id,
                    'data-icfes-resource-kind': mock.badge ? 'attributed' : 'own',
                    'data-icfes-surface': 'exam-hub-catalog',
                  } : {})}
                >Modo examen →</Link>
                {exam.slug === 'icfes' && hasGuidedMock(mock.id) ? (
                  <Link
                    href={`/examenes/icfes/practica/${mock.id}/guiado`}
                    className="btn btn-sm btn-ghost"
                    data-icfes-cta="catalog_resource_open"
                    data-icfes-mode="guided"
                    data-icfes-resource-id={mock.id}
                    data-icfes-resource-kind="own"
                    data-icfes-surface="exam-hub-catalog"
                  >Modo guiado</Link>
                ) : null}
              </div>
            ) : (
              <button type="button" className="wl-mock-card__cta btn btn-sm btn-ghost" disabled>🔒 Suscríbete para acceder</button>
            )}
          </article>
        );
      })}
    </div>
  );

  return (
    <section className="wl-section wl-exam-practice" id="practica" aria-labelledby="exam-practice-title">
      <div className="wrap wl-hub-panel">
        <header className="wl-exam-practice__heading wl-hub-heading">
          <div>
            <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Práctica</p>
            <h2 id="exam-practice-title">
              {isIcfes ? 'Elige tu simulacro de inglés ICFES' : 'Simulacros disponibles'}
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>
            {isIcfes
              ? `${icfesUniqueResources} recursos únicos · ${icfesModes} modos disponibles`
              : exam.slug === 'toefl'
              ? `${exam.mocks.length} simulacros · Reading, Listening, Writing y Speaking`
              : `${freeMocks.length} gratis · ${paidMocks.length} con suscripción`}
          </p>
        </header>

        {isIcfes ? (
          <div className="wl-mock-group">
            <div className="wl-mock-group__heading">
              <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Punto de partida recomendado</p>
              <h3>Simulacro guiado actual · 55 preguntas</h3>
              <p>Entrenamiento propio de WeLearn con las siete partes, evidencia, análisis de distractores y microlecciones. No es un cuadernillo oficial ni predice tu puntaje ICFES.</p>
              <div className="wl-mock-card__actions">
                <Link href="/practica/icfes-saber-11/simulacro-guiado" className="wl-mock-card__cta btn btn-sm" data-icfes-cta="featured_guided_55" data-icfes-mode="guided" data-icfes-resource-id="welearn-2026-2-55" data-icfes-resource-kind="own" data-icfes-surface="exam-hub-catalog">Empezar las 55 preguntas →</Link>
                <Link href="/practica/icfes-saber-11" className="btn btn-sm btn-ghost" data-icfes-cta="learn_seven_parts" data-icfes-surface="exam-hub-catalog">Aprender las 7 partes</Link>
              </div>
            </div>
          </div>
        ) : null}

        {isIcfes ? (
          <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
            Este catálogo contiene <strong style={{ color: 'var(--ink)' }}>34 recursos distintos</strong>: 23 prácticas propias, 10 bancos históricos atribuidos y el simulacro guiado de 55 preguntas. Algunas prácticas también se pueden abrir en modo examen y modo guiado; por eso existen 62 rutas o modos de uso, pero no 62 exámenes diferentes.
          </p>
        ) : null}

        {groups.map((group, groupIndex) => (
          <div key={group.id} className="wl-mock-group" data-later={groupIndex > 0 ? 'true' : 'false'}>
            {exam.slug === 'icfes' && (
              <div className="wl-mock-group__heading">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                {group.id === 'attributed' && (
                  <Link href="/practica/icfes-saber-11/examenes" data-icfes-cta="attributed_catalog" data-icfes-surface="exam-hub-catalog">
                    Ver el catálogo histórico por audiencia →
                  </Link>
                )}
              </div>
            )}
            {renderCards(group.mocks.slice(0, INITIAL_VISIBLE_MOCKS))}
            {group.mocks.length > INITIAL_VISIBLE_MOCKS ? (
              <details className="wl-mock-more">
                <summary>
                  {group.id === 'attributed'
                    ? `Ver los ${group.mocks.length - INITIAL_VISIBLE_MOCKS} bancos restantes`
                    : `Ver las ${group.mocks.length - INITIAL_VISIBLE_MOCKS} prácticas propias restantes`}
                </summary>
                {renderCards(group.mocks.slice(INITIAL_VISIBLE_MOCKS))}
              </details>
            ) : null}
          </div>
        ))}

        {/* Subscription CTA */}
        {paidMocks.length > 0 && (
          <div className="wl-sub-banner">
            <div>
              <h3 className="wl-sub-banner__title">Desbloquea los {paidMocks.length} simulacros restantes</h3>
              <p className="wl-sub-banner__sub">Acceso completo a todos los simulacros, retroalimentación personalizada y seguimiento de progreso.</p>
            </div>
            <a
              href="https://wa.me/573005004253?text=Hola%2C%20quiero%20acceso%20completo%20a%20los%20simulacros%20de%20WeLearn."
              target="_blank" rel="noopener noreferrer"
              className="btn"
            >Hablar con WeLearn <span className="arrow">→</span></a>
          </div>
        )}
      </div>
    </section>
  );
}
