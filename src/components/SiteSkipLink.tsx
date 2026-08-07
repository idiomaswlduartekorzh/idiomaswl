'use client';

import { usePathname } from 'next/navigation';

export default function SiteSkipLink() {
  const pathname = usePathname();
  const label = pathname.startsWith('/practica/ielts')
    ? 'Skip to main content'
    : 'Saltar al contenido principal';

  return <a className="wl-skip-link" href="#main">{label}</a>;
}
