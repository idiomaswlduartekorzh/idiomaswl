'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Exam } from '@/data/exams';
import { hasGuidedMock } from '@/data/icfes/guided-registry';

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
  const groups = exam.slug === 'icfes'
    ? [
        {
          id: 'practice',
          title: 'Prácticas propias abreviadas',
          description: '23 recorridos creados por WeLearn para entrenar las siete habilidades. Tienen 45 preguntas y no reproducen la extensión estándar 2026-2 de 55 preguntas.',
          mocks: exam.mocks.filter(mock => !mock.badge),
        },
        {
          id: 'published',
          title: 'Cuadernillos divulgados por el ICFES',
          description: 'Material publicado por el ICFES con su extensión y clave originales. El catálogo guiado distingue Saber 11 de los recursos complementarios.',
          mocks: exam.mocks.filter(mock => Boolean(mock.badge)),
        },
      ]
    : [{ id: 'all', title: 'Simulacros disponibles', description: '', mocks: exam.mocks }];

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Práctica</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
              {exam.slug === 'icfes' ? 'Elige qué tipo de práctica necesitas' : 'Simulacros disponibles'}
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>
            {freeMocks.length} gratis · {paidMocks.length} con suscripción
          </p>
        </div>

        {groups.map((group, groupIndex) => (
          <div key={group.id} style={{ marginTop: groupIndex === 0 ? 0 : '3.5rem' }}>
            {exam.slug === 'icfes' && (
              <div style={{ maxWidth: 760, marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>{group.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{group.description}</p>
                {group.id === 'published' && (
                  <Link href="/practica/icfes-saber-11/examenes" style={{ display: 'inline-block', marginTop: '0.65rem', color: exam.color, fontWeight: 700 }}>
                    Ver catálogo organizado y modo guiado →
                  </Link>
                )}
              </div>
            )}
            <div className="wl-mock-grid">
              {group.mocks.map((mock, i) => {
                const absoluteIndex = exam.mocks.findIndex(item => item.id === mock.id);
                return (
                  <motion.div
                    key={mock.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-30px' }}
                  >
                    <div className={`wl-mock-card${mock.free ? '' : ' wl-mock-card--locked'}`}>
                      <div className="wl-mock-card__header">
                        <span className="wl-mock-card__num">{String(absoluteIndex + 1).padStart(2, '0')}</span>
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
                        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                          <Link href={mock.href ?? `/examenes/${exam.slug}/practica/${mock.id}`} className="wl-mock-card__cta btn btn-sm">Modo examen →</Link>
                          {exam.slug === 'icfes' && hasGuidedMock(mock.id) && <Link href={`/examenes/icfes/practica/${mock.id}/guiado`} className="btn btn-sm btn-ghost">Modo guiado</Link>}
                        </div>
                      ) : (
                        <button type="button" className="wl-mock-card__cta btn btn-sm btn-ghost" disabled>
                          🔒 Suscríbete para acceder
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

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
            <a
              href="https://wa.me/573005004253?text=Hola%2C%20quiero%20acceso%20completo%20a%20los%20simulacros%20de%20WeLearn."
              target="_blank" rel="noopener noreferrer"
              className="btn"
            >Hablar con WeLearn <span className="arrow">→</span></a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
