'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

// ── Animation primitives ──────────────────────────────────────────────────────

const VP = { once: true, margin: '-56px' };
const EASE = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1.8, ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
    });
    return ctrl.stop;
  }, [inView, to, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01', name: 'Activación',
    desc: 'Conectamos lo nuevo con lo que ya sabes. El cerebro aprende cuando puede anclar conocimiento nuevo a estructuras existentes.',
    icon: '🔑',
  },
  {
    n: '02', name: 'Adquisición guiada',
    desc: 'Vocabulario presentado en contexto real, nunca en listas. Cada palabra aparece ligada a una situación, emoción o imagen.',
    icon: '📖',
  },
  {
    n: '03', name: 'Reconocimiento',
    desc: 'Ejercicios de identificación para que el cerebro consolide lo aprendido antes de pedir producción.',
    icon: '🔍',
  },
  {
    n: '04', name: 'Escucha sobrevivible',
    desc: 'Audio ligeramente por encima de tu nivel. Tu cerebro trabaja para comprender, y ese esfuerzo crea retención duradera.',
    icon: '🎧',
  },
  {
    n: '05', name: 'Contexto primero',
    desc: 'El idioma en situaciones auténticas antes de las reglas. El significado primero, la forma después.',
    icon: '🌍',
  },
  {
    n: '06', name: 'Descubre el patrón',
    desc: 'La gramática emerge naturalmente cuando la ves funcionar en contexto. No memorizamos reglas: las descubrimos.',
    icon: '🧩',
  },
  {
    n: '07', name: 'Micro explicación',
    desc: 'Solo la regla exacta que necesitas en este momento. Explicaciones cortas, precisas, sin sobrecarga cognitiva.',
    icon: '💡',
  },
  {
    n: '08', name: 'Producción guiada',
    desc: 'Tus primeras frases con andamiaje: empezamos con estructuras que te dan seguridad y vamos soltando el apoyo gradualmente.',
    icon: '✏️',
  },
  {
    n: '09', name: 'Interacción reactiva',
    desc: 'Simulaciones de conversación reales. El idioma se interioriza cuando tienes que usarlo para comunicarte.',
    icon: '💬',
  },
  {
    n: '10', name: 'Smart Review',
    desc: 'Repetición espaciada inteligente: lo que olvidarás pronto vuelve justo antes de que lo olvides. La memoria a largo plazo, al fin.',
    icon: '🧠',
  },
  {
    n: '11', name: 'Cierre y siguiente paso',
    desc: 'Cierras el día con claridad sobre qué aprendiste y qué sigue. El progreso acumulado se vuelve visible.',
    icon: '🎯',
  },
];

const TESTIMONIALS = [
  {
    name: 'Laura Martínez',
    city: 'Bogotá',
    cert: 'IELTS 7.5',
    quote: 'Después de años intentando aprender inglés con métodos tradicionales, en 3 meses con WeLearn aprobé el IELTS con 7.5. La forma en que Zhanna estructura cada clase hace que todo tenga sentido.',
    avatar: 'LM',
    color: '#c8202e',
  },
  {
    name: 'Santiago Gómez',
    city: 'Medellín',
    cert: 'TOEFL 105/120',
    quote: 'Pasé el TOEFL con 105 puntos. El método no te deja memorizar — te obliga a pensar en el idioma, y eso marca la diferencia en el examen real.',
    avatar: 'SG',
    color: '#14215c',
  },
  {
    name: 'Valentina Torres',
    city: 'Cali',
    cert: 'ICFES nivel B+',
    quote: 'Mi ICFES quedó en B+. Los simulacros de WeLearn son idénticos al examen real. Entré a la sala sintiéndome lista.',
    avatar: 'VT',
    color: '#2c6e49',
  },
  {
    name: 'Daniel Restrepo',
    city: 'Barranquilla',
    cert: 'Coreano A2',
    quote: 'Empecé el coreano desde cero. A los 6 meses ya podía presentarme y mantener conversaciones básicas. Nunca creí que lo conseguiría.',
    avatar: 'DR',
    color: '#7b2d8b',
  },
  {
    name: 'María José Acosta',
    city: 'Bucaramanga',
    cert: 'IELTS 6.5 + trabajo internacional',
    quote: 'Conseguí trabajo en una empresa multinacional gracias al certificado y, sobre todo, a la confianza que el método me dio para hablar sin miedo.',
    avatar: 'MA',
    color: '#c8202e',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function MetodoClient() {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--ink)',
        color: '#fff',
        padding: 'clamp(5rem, 12vw, 9rem) 1.5rem clamp(4rem, 8vw, 7rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative accent blobs */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(200,32,46,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 20%, rgba(200,32,46,0.12) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              fontSize: 12, color: 'var(--accent)', marginBottom: '1.1rem',
            }}
          >
            WeLearn · Metodología
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          >
            El idioma se aprende<br />
            <span style={{ color: 'var(--accent)' }}>así, no de otra forma</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 640,
              margin: '0 auto 2.4rem',
              lineHeight: 1.7,
            }}
          >
            11 etapas diarias diseñadas con evidencia científica sobre cómo el cerebro
            interioriza un idioma de verdad — sin memorización forzada, sin aburrimiento,
            sin volver a empezar desde cero.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              href="/registro"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.8rem 2rem', borderRadius: 12,
                background: 'var(--accent)', color: '#fff',
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Comenzar ahora →
            </Link>
            <Link
              href="/leccion"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.8rem 2rem', borderRadius: 12,
                border: '1.5px solid rgba(255,255,255,0.25)', background: 'transparent',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
              }}
            >
              Ver lecciones gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        borderBottom: '1px solid var(--line-soft)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem 3rem',
        }}>
          {[
            { to: 1000, suffix: '+', label: 'estudiantes activos', icon: '👥' },
            { to: 100,  suffix: '+', label: 'certificaciones internacionales aprobadas', icon: '🎓' },
            { to: 7,    suffix: '',  label: 'idiomas disponibles', icon: '🌐' },
            { to: 11,   suffix: '',  label: 'etapas del método', icon: '📐' },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.09}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: '0.3rem' }}>{s.icon}</div>
                <div style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                  fontWeight: 900,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.02em',
                }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div style={{
                  marginTop: '0.4rem',
                  fontSize: '0.88rem',
                  color: 'var(--muted)',
                  fontWeight: 600,
                  maxWidth: 160,
                  margin: '0.4rem auto 0',
                  lineHeight: 1.4,
                }}>
                  {s.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── ZHANNA SECTION ──────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-2)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'clamp(200px, 30%, 340px) 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
        }}>
          {/* Avatar + credential badge */}
          <FadeUp>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                style={{
                  width: 'clamp(140px, 22vw, 200px)',
                  height: 'clamp(140px, 22vw, 200px)',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ink) 0%, #2c3870 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  boxShadow: '0 16px 48px rgba(20,33,92,0.22)',
                  border: '4px solid var(--accent)',
                  cursor: 'default',
                }}
                aria-label="Zhanna Korzh"
              >
                👩‍🏫
              </motion.div>

              {/* PhD badge */}
              <div style={{
                background: 'var(--accent)',
                color: '#fff',
                padding: '0.4rem 1.1rem',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                PhD Filología
              </div>
            </div>
          </FadeUp>

          {/* Text */}
          <FadeUp delay={0.12}>
            <div>
              <p style={{
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                fontSize: 11, color: 'var(--accent)', marginBottom: '0.7rem',
              }}>
                Fundadora &amp; Directora pedagógica
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 900,
                color: 'var(--ink)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.1rem',
              }}>
                Zhanna Korzh
              </h2>
              <p style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
                color: 'var(--muted)',
                lineHeight: 1.8,
                marginBottom: '1.4rem',
                maxWidth: 520,
              }}>
                Doctora en Filología con especialización en adquisición de segundas lenguas.
                Zhanna diseñó el método WeLearn después de más de una década enseñando idiomas
                a nivel universitario y observando de cerca qué funciona — y qué no — en el
                aprendizaje real.
              </p>
              <p style={{
                fontSize: 'clamp(0.92rem, 1.6vw, 1rem)',
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: 520,
              }}>
                Su filosofía: el idioma no se memoriza, <strong style={{ color: 'var(--ink)' }}>se vive</strong>.
                Cada etapa del método está diseñada para que el cerebro encuentre el idioma
                como algo familiar, no como algo extraño que hay que forzar a recordar.
              </p>

              <div style={{
                marginTop: '1.8rem',
                display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
              }}>
                {['PhD Filología', 'Lingüística aplicada', '10+ años experiencia', 'Adquisición L2', 'Ex-docente universitaria'].map(tag => (
                  <span key={tag} style={{
                    background: 'var(--ink)', color: '#fff',
                    padding: '0.35rem 0.9rem', borderRadius: 100,
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 11 STEPS ────────────────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={{
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                fontSize: 11, color: 'var(--accent)', marginBottom: '0.6rem',
              }}>
                El método
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 900, color: 'var(--ink)',
                lineHeight: 1.12, letterSpacing: '-0.02em',
                marginBottom: '0.9rem',
              }}>
                11 etapas. Un idioma.<br />
                Cada día.
              </h2>
              <p style={{
                color: 'var(--muted)', fontSize: '1.02rem', maxWidth: 540,
                margin: '0 auto', lineHeight: 1.7,
              }}>
                El orden no es arbitrario. Cada etapa prepara el cerebro para la siguiente.
                Saltarse una rompe la cadena de adquisición.
              </p>
            </div>
          </FadeUp>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(20,33,92,0.12)' }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: EASE }}
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--line-soft)',
                  borderRadius: 16,
                  padding: '1.4rem 1.5rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* step number accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 4, height: '100%',
                  background: i < 3
                    ? 'var(--accent)'
                    : i < 7
                    ? 'var(--ink)'
                    : '#2c6e49',
                  borderRadius: '16px 0 0 16px',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    flexShrink: 0,
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: 'var(--bg-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      marginBottom: '0.3rem',
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 800, color: 'var(--muted)',
                        letterSpacing: '0.08em',
                      }}>
                        {step.n}
                      </span>
                      <h3 style={{
                        fontSize: '0.97rem', fontWeight: 800,
                        color: 'var(--ink)', margin: 0,
                      }}>
                        {step.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '0.84rem', color: 'var(--muted)',
                      lineHeight: 1.6, margin: 0,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--ink)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeUp>
            <p style={{
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              fontSize: 11, color: 'var(--accent)', marginBottom: '0.7rem',
              textAlign: 'center',
            }}>
              Por qué funciona
            </p>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.12, letterSpacing: '-0.02em',
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
              textAlign: 'center',
            }}>
              La mayoría de los métodos fallan.<br />El nuestro, no.
            </h2>
          </FadeUp>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                icon: '🧠',
                title: 'Basado en neurociencia',
                desc: 'Cada etapa activa mecanismos distintos de la memoria: semántica, episódica, procesal. No memorizas — procesas.',
              },
              {
                icon: '📈',
                title: 'Progresión calibrada',
                desc: 'El nivel de dificultad sube exactamente donde el cerebro está listo para recibirlo. Ni demasiado fácil, ni frustrante.',
              },
              {
                icon: '🔄',
                title: 'Repetición inteligente',
                desc: 'Smart Review usa repetición espaciada para que lo que aprendiste ayer no lo olvides mañana.',
              },
              {
                icon: '🗣️',
                title: 'Producción desde el día 1',
                desc: 'No esperas meses para hablar. Desde la etapa 8 ya estás produciendo el idioma, con apoyo real.',
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '1.6rem',
                }}>
                  <div style={{ fontSize: 28, marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: '#fff', marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-2)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={{
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                fontSize: 11, color: 'var(--accent)', marginBottom: '0.6rem',
              }}>
                Historias reales
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 900, color: 'var(--ink)',
                lineHeight: 1.12, letterSpacing: '-0.02em',
              }}>
                Más de 1.000 estudiantes<br />no pueden estar equivocados
              </h2>
            </div>
          </FadeUp>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(20,33,92,0.13)' }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.09, ease: EASE }}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  padding: '1.6rem',
                  border: '1px solid var(--line-soft)',
                  cursor: 'default',
                }}
              >
                {/* Stars */}
                <div style={{ color: '#f4b300', fontSize: 14, marginBottom: '0.9rem', letterSpacing: 2 }}>
                  ★★★★★
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                  marginBottom: '1.2rem',
                  fontStyle: 'italic',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: '#fff',
                    flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--ink)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 1 }}>
                      {t.city} · <span style={{ color: t.color, fontWeight: 700 }}>{t.cert}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS BAR ──────────────────────────────────────────────── */}
      <section style={{
        background: '#fff',
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
        padding: 'clamp(2rem, 4vw, 3rem) 1.5rem',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{
              fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--muted)', marginBottom: '1.5rem',
            }}>
              Exámenes para los que preparamos
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: '0.75rem', justifyContent: 'center',
            }}>
              {['IELTS Academic', 'TOEFL iBT', 'ICFES Inglés', 'DELF / DALF', 'Goethe-Zertifikat', 'CILS / CELI', 'CELPE-Bras'].map(cert => (
                <span key={cert} style={{
                  padding: '0.45rem 1.1rem',
                  border: '1.5px solid var(--line-soft)',
                  borderRadius: 100,
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}>
                  {cert}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--accent)',
        padding: 'clamp(4.5rem, 9vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}>
        <FadeUp>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.1, letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}>
              Tu certificación te está esperando
            </h2>
            <p style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.7, marginBottom: '2.2rem', maxWidth: 500, margin: '0 auto 2.2rem',
            }}>
              Empieza hoy. Los primeros días son completamente gratis.
              Sin tarjeta de crédito, sin compromisos.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}>
              <Link
                href="/registro"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.95rem 2.6rem', borderRadius: 14,
                  background: '#fff', color: 'var(--accent)',
                  fontWeight: 900, fontSize: 17, textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.2)',
                  letterSpacing: '-0.01em',
                }}
              >
                Comenzar gratis →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>

    </main>
  );
}
