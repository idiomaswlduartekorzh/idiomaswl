'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'Home',      href: '/home' },
  { label: 'Nivel Radar', href: '/nivel-radar' },
  { label: 'Inglés',    href: '/clases-de-ingles' },
  { label: 'Coreano',   href: '/clases-de-coreano' },
  { label: 'Idiomas',   href: '/clases-de-idiomas' },
  { label: 'Exámenes',  href: '/examenes' },
  { label: 'Práctica',  href: '/practica' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Precios',   href: '/precios' },
];


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
            const active = href.startsWith('/examenes')
              ? pathname.startsWith('/examenes')
              : href === '/nivel-radar'
              ? pathname.startsWith('/nivel-radar')
              : href === '/practica'
              ? pathname.startsWith('/practica') || pathname.startsWith('/aprende-coreano')
              : href === '/clases-de-ingles'
              ? pathname.startsWith('/clases-de-ingles')
              : href === '/clases-de-coreano'
              ? pathname.startsWith('/clases-de-coreano')
              : href === '/clases-de-idiomas'
              ? pathname.startsWith('/clases-de-') && !pathname.startsWith('/clases-de-ingles') && !pathname.startsWith('/clases-de-coreano')
              : href === '/practica'
              ? pathname.startsWith('/practica')
              : href === '/blog'
              ? pathname.startsWith('/blog')
              : href === '/precios'
              ? pathname === '/precios'
              : pathname === '/home';

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
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="wl-site-nav__mobile-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
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
