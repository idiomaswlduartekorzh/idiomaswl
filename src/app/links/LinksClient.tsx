'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './links.module.css';

const WA = '573005004253';
const WA_MSG = 'Hola, vi el link de Instagram de WeLearn y quiero más información sobre las clases.';
const WA_HREF = `https://wa.me/${WA}?text=${encodeURIComponent(WA_MSG)}`;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function track(label: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'click_linktree_item', link_label: label });
}

type Item = {
  href: string;
  label: string;
  sub?: string;
  icon: string;
  variant: 'blue' | 'outline';
  badge?: string;
};

// Botones principales — el recorrido de mayor intención
const PRIMARY_ITEMS: Item[] = [
  { href: '/clases-de-coreano', label: 'Aprende coreano',        icon: '🇰🇷', variant: 'blue' },
  { href: '/examenes',          label: 'Prepárate para tu examen', sub: 'IELTS · TOEFL · ICFES', icon: '🎯', variant: 'blue' },
  { href: '/practica',          label: 'Aprende un idioma',       icon: '🌍', variant: 'blue' },
  { href: '/home#equipo',       label: 'Quiénes somos',          icon: '🤝', variant: 'blue' },
];

// Enlaces secundarios
const SECONDARY_ITEMS: Item[] = [
  { href: '/clases-de-ingles',  label: 'Clases de inglés',            icon: '🇬🇧', variant: 'outline' },
  { href: '/miembro-fundador',  label: 'Miembro Fundador — coreano',  icon: '⭐', variant: 'outline', badge: '50 cupos' },
  { href: '/precios',           label: 'Precios y planes',            icon: '💳', variant: 'outline' },
  { href: '/metodo',            label: 'El método WeLearn (17 pasos)', icon: '🧠', variant: 'outline' },
  { href: '/blog',              label: 'Blog — guías y consejos',     icon: '📰', variant: 'outline' },
  { href: '/login',             label: 'Iniciar sesión — panel del estudiante', icon: '🔑', variant: 'outline' },
];

const SOCIALS = [
  { href: 'https://www.instagram.com/idiomas_welearn/', label: 'Instagram', icon: 'ig' },
  { href: 'https://www.facebook.com/welearnc/',          label: 'Facebook',  icon: 'fb' },
  { href: WA_HREF,                                       label: 'WhatsApp',  icon: 'wa' },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'ig') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.17-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0-2.2C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.8.31-1.47.72-2.14 1.39A5.9 5.9 0 00.62 4.14c-.3.76-.5 1.64-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.39 2.14.67.67 1.34 1.08 2.14 1.39.76.3 1.64.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.8-.31 1.47-.72 2.14-1.39.67-.67 1.08-1.34 1.39-2.14.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.39-2.14A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/>
        <path d="M12 5.84A6.16 6.16 0 1012 18.16 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1112 8a4 4 0 010 8zM18.4 5.6a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
      </svg>
    );
  }
  if (icon === 'fb') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.78 8.44-4.94 8.44-9.94z"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function LinksClient() {
  return (
    <div className={styles.page}>
      {/* Decorative pill dashes — the WeLearn logo's signature corner motif */}
      <div className={`${styles.dashCluster} ${styles.dashTopLeft}`} aria-hidden="true">
        <span className={styles.dashBlue} />
        <span className={styles.dashBlue} />
        <span className={styles.dashBlue} />
      </div>
      <div className={`${styles.dashCluster} ${styles.dashTopRight}`} aria-hidden="true">
        <span className={styles.dashRed} />
        <span className={styles.dashRed} />
        <span className={styles.dashRed} />
      </div>
      <div className={`${styles.dashCluster} ${styles.dashBottomRight}`} aria-hidden="true">
        <span className={styles.dashRed} />
        <span className={styles.dashRed} />
        <span className={styles.dashRed} />
      </div>
      <div className={`${styles.dashCluster} ${styles.dashBottomLeft}`} aria-hidden="true">
        <span className={styles.dashBlue} />
        <span className={styles.dashBlue} />
      </div>

      <main className={styles.wrap}>
        <div className={styles.avatar}>
          <Image src="/images/welearn-logo.png" alt="Idiomas WeLearn" width={112} height={112} priority />
        </div>

        {/* Pill divider — blue/red dashes, same shapes as the logo's underline accents */}
        <div className={styles.pillDivider} aria-hidden="true">
          <span className={styles.dashBlueSm} />
          <span className={styles.dashRedSm} />
          <span className={styles.dashBlueSm} />
        </div>

        <h1 className={styles.name}>Idiomas WeLearn</h1>
        <p className={styles.tagline}>The power of communication</p>
        <p className={styles.sub}>Academia de idiomas · Bucaramanga, Colombia<br />Inglés · Coreano · Francés · Alemán · Italiano · Portugués</p>

        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('WhatsApp')}
          className={`${styles.pill} ${styles.pillWhatsapp}`}
        >
          <span className={styles.pillIcon}>💬</span>
          <span className={styles.pillLabel}>Estudia con nosotros</span>
        </a>

        <nav className={styles.list} aria-label="Links principales de WeLearn">
          {PRIMARY_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => track(item.label)}
              className={`${styles.pill} ${styles.pillBlue}`}
            >
              <span className={styles.pillIcon}>{item.icon}</span>
              <span className={styles.pillLabel}>
                {item.label}
                {item.sub && <span className={styles.pillSub}>{item.sub}</span>}
              </span>
            </Link>
          ))}
        </nav>

        <div className={styles.pillDivider} aria-hidden="true">
          <span className={styles.dashRedSm} />
          <span className={styles.dashBlueSm} />
          <span className={styles.dashRedSm} />
        </div>

        <nav className={styles.list} aria-label="Más enlaces de WeLearn">
          {SECONDARY_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => track(item.label)}
              className={`${styles.pill} ${styles.pillOutline}`}
            >
              <span className={styles.pillIcon}>{item.icon}</span>
              <span className={styles.pillLabel}>{item.label}</span>
              {item.badge && <span className={styles.pillBadge}>{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.socials}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(s.label)}
              className={styles.socialBtn}
              aria-label={s.label}
              title={s.label}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>

        <Link href="/home" className={styles.backLink}>idiomaswl.com</Link>
      </main>
    </div>
  );
}
