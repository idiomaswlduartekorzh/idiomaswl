'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

function getSurface(pathname: string) {
  return pathname === '/' || pathname === '/home' ? 'home' : 'editorial';
}

export default function RouteThemeScope() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-wl-surface', getSurface(pathname));
  }, [pathname]);

  return null;
}
