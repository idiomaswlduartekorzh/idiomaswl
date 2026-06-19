'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Exam } from '@/data/exams';

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

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Práctica</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
              Simulacros disponibles
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>
            {freeMocks.length} gratis · {paidMocks.length} con suscripción
          </p>
        </div>

        <div className="wl-mock-grid">
          {exam.mocks.map((mock, i) => (
            <motion.div
              key={mock.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-30px' }}
            >
              <div className={`wl-mock-card${mock.free ? '' : ' wl-mock-card--locked'}`}>
                <div className="wl-mock-card__header">
                  <span className="wl-mock-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                    {mock.badge && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 4, padding: '2px 6px' }}>
                        {mock.badge}
                      </span>
                    )}
                    {mock.free ? (
                      <span className="wl-mock-card__tag wl-mock-card__tag--free">Gratis</span>
                    ) : (
                      <span className="wl-mock-card__tag wl-mock-card__tag--pro">Pro</span>
                    )}
                  </div>
                </div>
                <h3 className="wl-mock-card__title">{mock.title}</h3>
                <p className="wl-mock-card__sub">{mock.subtitle}</p>
                <div className="wl-mock-card__stats">
                  <span>{mock.parts} {mock.parts === 1 ? 'parte' : 'partes'}</span>
                  <span>·</span>
                  <span>{mock.questions} preguntas</span>
                </div>
                {mock.free ? (
                  <Link
                    href={mock.href ?? `/examenes/${exam.slug}/practica/${mock.id}`}
                    className="wl-mock-card__cta btn btn-sm"
                  >
                    Empezar →
                  </Link>
                ) : (
                  <button type="button" className="wl-mock-card__cta btn btn-sm btn-ghost" disabled>
                    🔒 Suscríbete para acceder
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscription CTA */}
        {paidMocks.length > 0 && (
          <motion.div
            className="wl-sub-banner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="wl-sub-banner__title">Desbloquea los {paidMocks.length} simulacros restantes</h3>
              <p className="wl-sub-banner__sub">Acceso completo a todos los mocks, corrección con IA y seguimiento de progreso.</p>
            </div>
            <Link href="/precios" className="btn">Ver planes <span className="arrow">→</span></Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
