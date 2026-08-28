import Link from 'next/link'

/**
 * Cierra el circuito del clúster ICFES.
 *
 * Antes, /practica/icfes-saber-11 y sus subpáginas solo enlazaban hacia abajo
 * (a los simulacros). Nada devolvía al lector a la guía, al vocabulario ni a la
 * página de preparación, así que el tráfico entraba y moría ahí.
 *
 * Medido en Search Console (18-29 jul 2026): el clúster ICFES suma cerca de 1.000
 * impresiones, pero concentradas en los artículos del blog. La página comercial
 * /preparacion-icfes tenía 16 y /examenes/icfes estaba en posición 29 pese a que
 * el sitio tiene diez cuadernillos divulgados para practicar.
 */

const LINKS = [
  { href: '/practica/icfes-saber-11/examenes', label: 'Cuadernillos divulgados', note: 'Material publicado por el ICFES, separado por audiencia y con corrección al terminar.' },
  { href: '/practica/icfes-saber-11/vocabulario', label: 'Banco de vocabulario', note: 'Palabras académicas, conectores y verbos frecuentes para practicar dentro del sitio.' },
  { href: '/blog/icfes-vocabulario-ingles-palabras-mas-frecuentes', label: 'Vocabulario más frecuente', note: 'Las palabras que se repiten año tras año. Es por donde más rápido se sube.' },
  { href: '/blog/icfes-saber-11-niveles-ingles-guia-completa', label: 'Los cuatro niveles', note: 'Qué significa cada rango de puntaje, de Pre A1 a B1.' },
  { href: '/blog/icfes-ingles-plan-estudio-3-meses', label: 'Plan de tres meses', note: 'Qué hacer cada semana si tienes un trimestre por delante.' },
  { href: '/preparacion-icfes', label: 'Preparación con profesor', note: 'Cómo lo trabajamos en WeLearn, presencial en Bucaramanga u online.' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <section style={{ maxWidth: 1180, margin: '3rem auto 4rem', padding: '0 1.25rem' }}>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Todo para el inglés del ICFES
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.1rem', lineHeight: 1.6 }}>
            La prueba evalúa lectura y uso de la lengua, y B1 es el nivel máximo reportado:
            el examen no reporta B2 ni nada por encima.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.7rem' }}>
            {LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: 'block', padding: '0.9rem 1.05rem', borderRadius: 10,
                  border: '1px solid var(--line-soft)', background: 'var(--bg-2)',
                  textDecoration: 'none', borderLeft: '3px solid #14215c',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.93rem', color: 'var(--ink)', marginBottom: 2 }}>
                  {l.label}
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.45 }}>{l.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
