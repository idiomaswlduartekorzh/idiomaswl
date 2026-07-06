import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import s from './page.module.css';

const WA = '573005004253';
const WA_MSG = encodeURIComponent('Hola, te escribo desde TikTok/Instagram. Quiero información sobre los cursos de idiomas 🙏');

export const metadata: Metadata = {
  title: 'Idiomas WeLearn — Todos los links',
  description: 'Herramientas, exámenes y programas de Idiomas WeLearn en un solo lugar.',
  robots: { index: false, follow: true },
};

const LINKS = [
  { emoji: '📡', title: 'Nivel Radar', desc: 'Tu nivel real de inglés en 90 segundos', href: '/nivel-radar' },
  { emoji: '🇰🇷', title: 'Miembro Fundador Coreano', desc: '50 cupos · precio vitalicio', href: '/miembro-fundador' },
  { emoji: '📝', title: 'Simulacros gratis', desc: 'IELTS, TOEFL, ICFES, TOPIK y más', href: '/examenes' },
  { emoji: '🇬🇧', title: 'Clases de inglés', desc: 'Diagnóstico gratis con David', href: '/clases-de-ingles' },
  { emoji: '🇰🇷', title: 'Clases de coreano', desc: 'Método de 17 pasos', href: '/clases-de-coreano' },
  { emoji: '🌍', title: 'Todos los idiomas', desc: 'Francés, alemán, italiano, portugués', href: '/clases-de-idiomas' },
  { emoji: '💰', title: 'Precios', desc: 'Planes y paquetes de horas', href: '/precios' },
  { emoji: '📚', title: 'Blog WeLearn', desc: 'Guías reales, sin relleno', href: '/blog' },
];

export default function LinksPage() {
  return (
    <main className={s.page}>
      <div className={s.glow} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.logoWrap}>
          <Image src="/images/welearn-logo.png" alt="WeLearn" fill sizes="88px" priority style={{ objectFit: 'cover', objectPosition: 'center 42%' }} />
        </div>
        <p className={s.tagline}>Aprende un idioma, en serio.</p>
        <p className={s.handle}>idiomaswl.com</p>

        <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className={s.mainBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Escríbenos por WhatsApp
        </a>

        <div className={s.list}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={s.card}>
              <span className={s.cardEmoji}>{l.emoji}</span>
              <span className={s.cardText}>
                <span className={s.cardTitle}>{l.title}</span>
                <span className={s.cardDesc}>{l.desc}</span>
              </span>
              <span className={s.cardArrow}>→</span>
            </Link>
          ))}
        </div>

        <p className={s.copy}>© {new Date().getFullYear()} Idiomas WeLearn · Bucaramanga, Colombia</p>
      </div>
    </main>
  );
}
