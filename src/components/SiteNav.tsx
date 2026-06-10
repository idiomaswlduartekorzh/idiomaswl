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
  { label: 'Inglés',    href: '/clases-de-ingles' },
  { label: 'Coreano',   href: '/clases-de-coreano' },
  { label: 'Idiomas',   href: '/clases-de-idiomas' },
  { label: 'Exámenes',  href: '/examenes' },
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
              : href === '/clases-de-ingles'
              ? pathname.startsWith('/clases-de-ingles')
              : href === '/clases-de-coreano'
              ? pathname.startsWith('/clases-de-coreano')
              : href === '/clases-de-idiomas'
              ? pathname.startsWith('/clases-de-') && !pathname.startsWith('/clases-de-ingles') && !pathname.startsWith('/clases-de-coreano')
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
