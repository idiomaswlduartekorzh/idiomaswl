import type { Metadata } from 'next';
import Link from 'next/link';
import { EXAM_LIST } from '@/data/exams';

export const metadata: Metadata = {
  title: 'Simulacros de Certificación Internacional',
  description:
    'Simulacros completos de TOEFL iBT, IELTS, ICFES Saber 11, Goethe-Zertifikat, DELF/DALF, CILS/CELI y CELPE-Bras. Practica con preguntas reales, estrategia de examen y feedback con IA.',
  keywords: [
    'TOEFL iBT simulacro', 'IELTS práctica online', 'ICFES Saber 11 inglés',
    'Goethe examen alemán', 'DELF francés', 'certificación idiomas Colombia',
    'examen de inglés preparación',
  ],
  openGraph: {
    title: 'Simulacros de Certificación — Idiomas WeLearn',
    description: 'TOEFL, IELTS, ICFES y más. Simulacros completos con feedback de IA.',
    url: 'https://idiomaswl.com/examenes',
  },
  alternates: {
    canonical: 'https://idiomaswl.com/examenes',
  },
};

export default function ExamenesPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Certificaciones internacionales</p>
        <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
          Elige tu examen
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 3rem' }}>
          Simulacros oficiales, estrategia de examen y feedback con IA para cada certificación.
        </p>

        <div className="wl-exams-catalog">
          {EXAM_LIST.map(exam => (
            <Link
              key={exam.slug}
              href={`/examenes/${exam.slug}`}
              className={`wl-catalog-card${!exam.available ? ' wl-catalog-card--soon' : ''}`}
              style={{ '--exam-color': exam.color } as React.CSSProperties}
            >
              {/* Color bar */}
              <div className="wl-catalog-card__bar" />

              <div className="wl-catalog-card__body">
                <div className="wl-catalog-card__top">
                  <span className="wl-catalog-card__flag">{exam.flag}</span>
                  {!exam.available && (
                    <span className="wl-catalog-card__badge">Próximamente</span>
                  )}
                  {exam.available && exam.mocks.some(m => m.free) && (
                    <span className="wl-catalog-card__badge wl-catalog-card__badge--free">Gratis disponible</span>
                  )}
                </div>

                <h2 className="wl-catalog-card__name">{exam.name}</h2>
                <p className="wl-catalog-card__lang">{exam.language} · {exam.fullName.split('(')[0].trim()}</p>
                <p className="wl-catalog-card__tagline">{exam.tagline}</p>

                <div className="wl-catalog-card__stats">
                  <span>{exam.sections.length} secciones</span>
                  <span>·</span>
                  <span>{exam.totalTime}</span>
                  <span>·</span>
                  <span>{exam.scoreRange} {exam.scoreName}</span>
                </div>
              </div>

              <div className="wl-catalog-card__footer">
                <span>{exam.available ? `${exam.mocks.length} simulacro${exam.mocks.length !== 1 ? 's' : ''}` : 'En desarrollo'}</span>
                <span className="wl-catalog-card__cta">
                  {exam.available ? 'Ver →' : 'Notifícame →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
