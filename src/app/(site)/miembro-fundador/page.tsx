import type { Metadata } from 'next';
import s from './page.module.css';

const WA = '573005004253';
const WA_FUNDADOR = encodeURIComponent('Hola, quiero asegurar mi cupo de Miembro Fundador de coreano en WeLearn. ¿Cuántos cupos quedan disponibles?');

export const metadata: Metadata = {
  title: 'Miembro Fundador Coreano — 50 Cupos · Precio Vitalicio | WeLearn',
  description:
    'Los primeros 50 estudiantes de coreano en WeLearn acceden a precio especial congelado para siempre. Sesión 1:1 con David, grupo exclusivo y acceso a todos los niveles. Cupos limitados.',
  keywords: [
    'miembro fundador coreano WeLearn',
    'curso coreano precio especial',
    'aprender coreano Colombia fundador',
    'coreano WeLearn precio vitalicio',
  ],
  openGraph: {
    title: 'Miembro Fundador Coreano — 50 Cupos · WeLearn',
    description: '50 cupos con precio vitalicio congelado. Únete a los primeros estudiantes de coreano en WeLearn.',
    url: 'https://idiomaswl.com/miembro-fundador',
    images: [{ url: '/images/welearn-logo.png', width: 1200, height: 630, alt: 'Miembro Fundador WeLearn Coreano' }],
  },
  alternates: { canonical: 'https://idiomaswl.com/miembro-fundador' },
};

const PERKS = [
  {
    icon: '🔒',
    title: 'Precio congelado para siempre',
    desc: 'El precio que pagas hoy se congela. Cuando el programa suba de precio (y subirá), tú sigues pagando el precio fundador. Para siempre.',
  },
  {
    icon: '⚡',
    title: 'Acceso prioritario',
    desc: 'Los nuevos niveles, contenidos y funcionalidades del programa de coreano llegan a los Miembros Fundadores primero, antes que a nadie.',
  },
  {
    icon: '👥',
    title: 'Grupo exclusivo de fundadores',
    desc: 'Canal privado de WhatsApp solo para los 50 fundadores. David comparte recursos, contexto cultural y responde preguntas directamente.',
  },
  {
    icon: '🎯',
    title: 'Sesión 1:1 de bienvenida con David',
    desc: 'Una sesión de 60 minutos con David para evaluar tu nivel, entender tus metas y diseñar tu ruta de aprendizaje personal.',
  },
  {
    icon: '🌐',
    title: 'Acceso completo al método WeLearn',
    desc: 'Los 17 pasos del método WeLearn aplicados al coreano. Videos, ejercicios, podcasts y simulacros en formato TOPIK.',
  },
  {
    icon: '🏆',
    title: 'Reconocimiento permanente',
    desc: 'Tu nombre aparece en los créditos del programa de coreano WeLearn como co-fundador de la comunidad.',
  },
];

const TIMELINE = [
  { fase: '01', title: 'Semanas 1–2', desc: 'Hangul completo + pronunciación base. Puedes leer coreano básico.' },
  { fase: '02', title: 'Semanas 3–6', desc: 'Vocabulario de alta frecuencia. Saludos, números, tiempo, lugares.' },
  { fase: '03', title: 'Semanas 7–12', desc: 'Gramática funcional. Partículas, conjugaciones básicas, honoríficos simples.' },
  { fase: '04', title: 'Mes 3–4',     desc: 'Conversación básica. Puedes presentarte, pedir cosas, describir tu rutina.' },
  { fase: '05', title: 'Mes 5–6',     desc: 'TOPIK I practice. Estás listo para tomar el examen nivel 1–2.' },
];

export default function MiembroFundadorPage() {
  return (
    <main className={s.page}>

      {/* ══════════════ HERO ══════════════ */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroBadgeRow}>
            <span className={s.heroTagRed}>🔥 Lanzamiento</span>
            <span className={s.heroTagGray}>50 cupos · Precio vitalicio</span>
          </div>
          <div className={s.heroKorean}>창립 회원</div>
          <h1 className={s.h1}>
            Miembro Fundador<br />
            <span className={s.accent}>de Coreano.</span>
          </h1>
          <p className={s.heroSub}>
            Somos los primeros en lanzar coreano en Colombia con este método.
            Los primeros <strong>50 estudiantes</strong> que se unan acceden a un precio
            especial que <strong>nunca cambia para ellos</strong> — sin importar cuánto
            suba el programa en el futuro.
          </p>
          <a
            href={`https://wa.me/${WA}?text=${WA_FUNDADOR}`}
            target="_blank" rel="noopener noreferrer"
            className={s.mainBtn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Quiero mi cupo de Miembro Fundador
          </a>
          <p className={s.heroNote}>Te escribimos por WhatsApp en menos de 24 horas con los detalles.</p>
        </div>
      </section>

      {/* ══════════════ PERKS ══════════════ */}
      <section className={s.section}>
        <div className={s.wrap}>
          <p className={s.sectionEyebrow}>¿Qué incluye?</p>
          <h2 className={s.h2}>Todo lo que recibes como Miembro Fundador</h2>
          <div className={s.perksGrid}>
            {PERKS.map(p => (
              <div key={p.title} className={s.perkCard}>
                <div className={s.perkIcon}>{p.icon}</div>
                <h3 className={s.perkTitle}>{p.title}</h3>
                <p className={s.perkDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TIMELINE ══════════════ */}
      <section className={s.sectionDark}>
        <div className={s.wrap}>
          <p className={s.sectionEyebrow}>Tu ruta de aprendizaje</p>
          <h2 className={s.h2}>De cero a TOPIK I en 6 meses</h2>
          <div className={s.timeline}>
            {TIMELINE.map((t, i) => (
              <div key={t.fase} className={s.timelineItem}>
                <div className={s.timelineDot}>
                  <span className={s.timelineN}>{t.fase}</span>
                  {i < TIMELINE.length - 1 && <div className={s.timelineLine} />}
                </div>
                <div className={s.timelineContent}>
                  <div className={s.timelineFase}>{t.title}</div>
                  <p className={s.timelineDesc}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ URGENCY ══════════════ */}
      <section className={s.urgencySection}>
        <div className={s.wrap}>
          <div className={s.urgencyBox}>
            <div className={s.urgencyHeader}>
              <div className={s.urgencySpots}>
                <span className={s.urgencySpotsNum}>50</span>
                <span className={s.urgencySpotsLabel}>cupos<br />totales</span>
              </div>
              <div className={s.urgencyText}>
                <h2 className={s.urgencyTitle}>Los cupos son limitados — y no regresan.</h2>
                <p className={s.urgencyDesc}>
                  Una vez vendidos los 50 cupos de Miembro Fundador, ese precio no vuelve.
                  El programa seguirá disponible, pero al precio regular. Esta es la única
                  oportunidad de acceder al precio vitalicio.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${WA}?text=${WA_FUNDADOR}`}
              target="_blank" rel="noopener noreferrer"
              className={s.mainBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Reservar mi cupo ahora
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY WELEARN ══════════════ */}
      <section className={s.section}>
        <div className={s.wrap}>
          <p className={s.sectionEyebrow}>¿Por qué WeLearn?</p>
          <h2 className={s.h2}>No es otro curso de coreano</h2>
          <div className={s.compareGrid}>
            <div className={s.compareCard + ' ' + s.compareBad}>
              <h3 className={s.compareTitle}>Los demás cursos</h3>
              <ul className={s.compareList}>
                <li>❌ Listas de vocabulario para memorizar</li>
                <li>❌ Gramática sin contexto</li>
                <li>❌ Sin tutor real</li>
                <li>❌ Progresión genérica, no personalizada</li>
                <li>❌ Sin preparación para TOPIK</li>
              </ul>
            </div>
            <div className={s.compareCard + ' ' + s.compareGood}>
              <h3 className={s.compareTitle}>WeLearn Coreano</h3>
              <ul className={s.compareList}>
                <li>✅ Vocabulario en contexto real desde el día 1</li>
                <li>✅ Gramática funcional — usas lo que aprendes</li>
                <li>✅ Tutor 1:1 asignado</li>
                <li>✅ Plan personalizado según tus metas</li>
                <li>✅ Preparación completa para TOPIK I y II</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
