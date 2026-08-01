'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

// ⚠️ NUNCA borrar "Práctica": se ha perdido varias veces en force-pushes.
const NAV_LINKS = [
  { label: 'Home',           href: '/home' },
  { label: 'Exámenes',       href: '/examenes' },
  { label: 'Práctica',       href: '/practica' },
  { label: 'Quiénes somos',  href: '/quienes-somos' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Precios',        href: '/precios' },
];

// Los ocho idiomas viven dentro del desplegable "Idiomas", que se inserta
// después de "Home". Inglés, Coreano y Nivel Radar dejaron de ser ítems sueltos.
const IDIOMAS = [
  { label: 'Inglés',    native: 'English',  href: '/clases-de-ingles' },
  { label: 'Italiano',  native: 'Italiano', href: '/clases-de-italiano' },
  { label: 'Portugués', native: 'Português', href: '/clases-de-portugues' },
  { label: 'Francés',   native: 'Français', href: '/clases-de-frances' },
  { label: 'Ruso',      native: 'Русский',  href: '/clases-de-ruso' },
  { label: 'Alemán',    native: 'Deutsch',  href: '/clases-de-aleman' },
  { label: 'Japonés',   native: '日本語',    href: '/clases-de-japones' },
  { label: 'Coreano',   native: '한국어',    href: '/clases-de-coreano' },
];

/** Verdadero cuando la ruta actual es una landing de idioma o el hub. */
function isIdiomasPath(pathname: string) {
  return pathname.startsWith('/clases-de-');
}

function IdiomasDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = isIdiomasPath(pathname);

  // Cierra al navegar a otra ruta.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div
      className="wl-site-nav__dd"
      data-open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <button
        type="button"
        className={`wl-site-nav__dd-btn${active ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(o => !o)}
      >
        Idiomas
        <svg className="wl-site-nav__dd-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="wl-site-nav__dd-menu" role="menu">
          {IDIOMAS.map(({ label, native, href }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              className={`wl-site-nav__dd-item${pathname.startsWith(href) ? ' is-active' : ''}`}
            >
              {label}
              <span className="wl-site-nav__dd-native">{native}</span>
            </Link>
          ))}
          <Link href="/clases-de-idiomas" role="menuitem" className="wl-site-nav__dd-item wl-site-nav__dd-all">
            Ver todos los idiomas →
          </Link>
        </div>
      )}
    </div>
  );
}


function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const initial = (user.email ?? 'U')[0].toUpperCase();

  return (
    <div className="wl-user-menu" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      <button
        className="wl-user-menu__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Menú de usuario"
      >
        <span className="wl-user-menu__avatar">{initial}</span>
        <span className="wl-user-menu__email">{user.email?.split('@')[0]}</span>
        <span className="wl-user-menu__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="wl-user-menu__dropdown">
          <div className="wl-user-menu__info">
            <span className="wl-user-menu__name">{user.email}</span>
          </div>
          <Link href="/dashboard" className="wl-user-menu__item" onClick={() => setOpen(false)}>
            📊 Mi panel
          </Link>
          <button className="wl-user-menu__item wl-user-menu__item--danger" onClick={onSignOut}>
            🚪 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@idiomas.welearn',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.82a4.28 4.28 0 0 1-.28-1.55h-3.16v13.3a2.6 2.6 0 1 1-1.84-2.49v-3.28a5.86 5.86 0 1 0 5 5.79V9.3a7.4 7.4 0 0 0 4.32 1.38V7.53a4.29 4.29 0 0 1-4.04-1.71Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/idiomas_welearn/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WeLearn en ${label}`}
          className="wl-site-nav__social-link"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="wl-theme-toggle"
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="wl-theme-toggle__track">
        <span className="wl-theme-toggle__thumb" data-dark={isDark ? 'true' : 'false'}>
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/home');
    router.refresh();
  };

  return (
    <header className="wl-site-nav">
      <div className="wl-site-nav__inner wrap">
        {/* Brand with logo */}
        <Link href="/home" className="wl-site-nav__brand">
          <div className="wl-site-nav__logo-wrap">
            <Image
              src="/images/welearn-logo.png"
              alt="WeLearn"
              fill
              sizes="96px"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
            />
          </div>
          <span className="wl-site-nav__brand-name">Idiomas WeLearn</span>
        </Link>

        {/* Desktop links */}
        <nav className="wl-site-nav__links" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => {
            const active =
              href === '/home' ? pathname === '/home'
              : href === '/practica' ? pathname.startsWith('/practica') || pathname.startsWith('/aprende-coreano')
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`wl-site-nav__link${active ? ' is-active' : ''}`}
              >
                {label}
              </Link>
            );
          }).flatMap((el, i) =>
            // El desplegable de Idiomas va justo después de "Home".
            i === 0 ? [el, <IdiomasDropdown key="idiomas" pathname={pathname} />] : [el]
          )}
        </nav>

        {/* CTA / User */}
        <div className="wl-site-nav__cta">
          <SocialLinks className="wl-site-nav__social" />
          <ThemeToggle />
          {loading ? (
            <span className="wl-site-nav__loading" />
          ) : user ? (
            <UserMenu user={user} onSignOut={handleSignOut} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Iniciar sesión</Link>
              <Link href="/clases-de-ingles" className="btn btn-sm">Empezar →</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="wl-site-nav__toggle"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="wl-site-nav__mobile">
          {NAV_LINKS.map(({ label, href }, i) => (
            <div key={href}>
              <Link href={href} className="wl-site-nav__mobile-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
              {i === 0 && (
                <>
                  <span className="wl-site-nav__mobile-link" aria-hidden="true">Idiomas</span>
                  <div className="wl-site-nav__mobile-sub">
                    {IDIOMAS.map(idioma => (
                      <Link
                        key={idioma.href}
                        href={idioma.href}
                        className={`wl-site-nav__mobile-sublink${pathname.startsWith(idioma.href) ? ' is-active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {idioma.label}
                      </Link>
                    ))}
                    <Link href="/clases-de-idiomas" className="wl-site-nav__mobile-sublink" onClick={() => setMenuOpen(false)}>
                      Ver todos →
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
          <SocialLinks className="wl-site-nav__social wl-site-nav__social--mobile" />
          <div style={{ display: 'flex', gap: 8, padding: '1rem 0 0' }}>
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Mi panel</Link>
                <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>Salir</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                <Link href="/clases-de-ingles" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Empezar →</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
