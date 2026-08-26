'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

// ⚠️ NUNCA borrar "Práctica" ni "Herramientas": se han perdido en force-pushes.
const NAV_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'Idiomas',        href: '/clases-de-idiomas' },
  { label: 'Exámenes',       href: '/examenes' },
  { label: 'Práctica',       href: '/practica' },
  { label: 'Herramientas',   href: '/herramientas' },
  { label: 'Quiénes somos',  href: '/quienes-somos' },
];

const IELTS_NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Languages',  href: '/clases-de-idiomas' },
  { label: 'Exams',      href: '/examenes' },
  { label: 'Practice',   href: '/practica' },
  { label: 'Tools',      href: '/herramientas' },
  { label: 'About us',   href: '/quienes-somos' },
];

// En escritorio, "Idiomas" es un enlace directo al superhub: un menú que se abre al
// pasar el cursor no existe en móvil y reparte el enlazado interno en vez de concentrarlo.
// Este listado alimenta únicamente el acordeón del menú móvil, donde sí es el patrón correcto.
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

const IELTS_IDIOMAS = [
  { label: 'English',    native: 'English',   href: '/clases-de-ingles' },
  { label: 'Italian',    native: 'Italiano',  href: '/clases-de-italiano' },
  { label: 'Portuguese', native: 'Português', href: '/clases-de-portugues' },
  { label: 'French',     native: 'Français',  href: '/clases-de-frances' },
  { label: 'Russian',    native: 'Русский',   href: '/clases-de-ruso' },
  { label: 'German',     native: 'Deutsch',   href: '/clases-de-aleman' },
  { label: 'Japanese',   native: '日本語',      href: '/clases-de-japones' },
  { label: 'Korean',     native: '한국어',       href: '/clases-de-coreano' },
];

/** Verdadero cuando la ruta actual es una landing de idioma o el hub. */
function isIdiomasPath(pathname: string) {
  return pathname.startsWith('/clases-de-');
}

function UserMenu({ user, onSignOut, english = false }: { user: User; onSignOut: () => void; english?: boolean }) {
  const [open, setOpen] = useState(false);
  const initial = (user.email ?? 'U')[0].toUpperCase();
  const menuId = 'wl-user-menu';

  return (
    <div className="wl-user-menu" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      <button
        className="wl-user-menu__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label={english ? 'User menu' : 'Menú de usuario'}
        aria-expanded={open}
        aria-controls={menuId}
      >
        <span className="wl-user-menu__avatar">{initial}</span>
        <span className="wl-user-menu__email">{user.email?.split('@')[0]}</span>
        <span className="wl-user-menu__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="wl-user-menu__dropdown" id={menuId}>
          <div className="wl-user-menu__info">
            <span className="wl-user-menu__name">{user.email}</span>
          </div>
          <Link href="/dashboard" className="wl-user-menu__item" onClick={() => setOpen(false)}>
            📊 {english ? 'My dashboard' : 'Mi panel'}
          </Link>
          <button className="wl-user-menu__item wl-user-menu__item--danger" onClick={onSignOut}>
            🚪 {english ? 'Sign out' : 'Cerrar sesión'}
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

function SocialLinks({ className, english = false }: { className?: string; english?: boolean }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WeLearn ${english ? 'on' : 'en'} ${label}`}
          className="wl-site-nav__social-link"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

function ThemeToggle({ english = false }: { english?: boolean }) {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={isDark
        ? (english ? 'Switch to light mode' : 'Cambiar a modo claro')
        : (english ? 'Switch to dark mode' : 'Cambiar a modo oscuro')}
      className="wl-theme-toggle"
      title={isDark ? (english ? 'Light mode' : 'Modo claro') : (english ? 'Dark mode' : 'Modo oscuro')}
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
  const isIelts = pathname.startsWith('/practica/ielts');
  const navLinks = isIelts ? IELTS_NAV_LINKS : NAV_LINKS;
  const languageLinks = isIelts ? IELTS_IDIOMAS : IDIOMAS;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => Boolean(createClient()));
  const mobileMenuId = 'wl-site-nav-mobile';

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="wl-site-nav">
      <div className="wl-site-nav__inner wrap">
        {/* Brand with logo */}
        <Link href="/" className="wl-site-nav__brand" aria-label={isIelts ? 'Idiomas WeLearn — home' : 'Idiomas WeLearn — inicio'}>
          <div className="wl-site-nav__logo-wrap">
            <Image
              src="/images/welearn-wordmark-transparent-v2.png"
              alt="Idiomas WeLearn"
              fill
              sizes="124px"
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="wl-site-nav__links" aria-label={isIelts ? 'Main navigation' : 'Navegación principal'}>
          {navLinks.map(({ label, href }) => {
            const active =
              href === '/' ? pathname === '/' || pathname === '/home'
              : href === '/practica' ? pathname.startsWith('/practica') || pathname.startsWith('/aprende-coreano')
              : href === '/clases-de-idiomas' ? isIdiomasPath(pathname)
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
          })}
        </nav>

        {/* CTA / User */}
        <div className="wl-site-nav__cta">
          <SocialLinks className="wl-site-nav__social" english={isIelts} />
          <ThemeToggle english={isIelts} />
          {loading ? (
            <span className="wl-site-nav__loading" />
          ) : user ? (
            <UserMenu user={user} onSignOut={handleSignOut} english={isIelts} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">{isIelts ? 'Sign in' : 'Iniciar sesión'}</Link>
              <Link href="/nivel-radar" className="btn btn-sm">{isIelts ? 'Level Radar' : 'Nivel Radar'} →</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="wl-site-nav__toggle"
          aria-label={menuOpen
            ? (isIelts ? 'Close menu' : 'Cerrar menú')
            : (isIelts ? 'Open menu' : 'Abrir menú')}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id={mobileMenuId} className="wl-site-nav__mobile" aria-label={isIelts ? 'Mobile navigation' : 'Navegación móvil'}>
          {navLinks.map(({ label, href }) => (
            <div key={href}>
              <Link href={href} className="wl-site-nav__mobile-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
              {href === '/clases-de-idiomas' && (
                <>
                  <div className="wl-site-nav__mobile-sub">
                    {languageLinks.map(idioma => (
                      <Link
                        key={idioma.href}
                        href={idioma.href}
                        className={`wl-site-nav__mobile-sublink${pathname.startsWith(idioma.href) ? ' is-active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {idioma.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <SocialLinks className="wl-site-nav__social wl-site-nav__social--mobile" english={isIelts} />
          <div style={{ display: 'flex', gap: 8, padding: '1rem 0 0' }}>
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-sm" onClick={() => setMenuOpen(false)}>{isIelts ? 'My dashboard' : 'Mi panel'}</Link>
                <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>{isIelts ? 'Sign out' : 'Salir'}</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>{isIelts ? 'Sign in' : 'Iniciar sesión'}</Link>
                <Link href="/nivel-radar" className="btn btn-sm" onClick={() => setMenuOpen(false)}>{isIelts ? 'Level Radar' : 'Nivel Radar'} →</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
