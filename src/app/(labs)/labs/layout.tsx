import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LABS_ENABLED } from '@/lib/labs/config';

/**
 * Labs — zona de validación aislada.
 *
 * Reglas de aislamiento (no romper):
 *  · noindex/nofollow — no debe tocar el SEO de idiomaswl.com.
 *  · Fuera de sitemap.ts y de SiteNav.tsx. No se enlaza desde el sitio.
 *  · Si LABS_ENABLED !== 'true', todo /labs devuelve 404.
 */
export const metadata: Metadata = {
  title:   'WeLearn Labs',
  robots:  { index: false, follow: false, nocache: true },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  if (!LABS_ENABLED) notFound();

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/labs" className="text-sm font-semibold tracking-tight">
            WeLearn <span className="text-white/40">Labs</span>
          </Link>
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
            Entorno de validación · no público
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
