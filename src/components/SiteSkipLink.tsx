'use client';

import { usePathname } from 'next/navigation';
import { getAdvancedWritingLocale } from '@/lib/practica/writing-route';

export default function SiteSkipLink() {
  const pathname = usePathname();
  const writingLocale = getAdvancedWritingLocale(pathname);
  const writingLabels: Record<string, string> = {
    en: 'Skip to main content', fr: 'Aller au contenu principal', de: 'Zum Hauptinhalt springen',
    it: 'Vai al contenuto principale', pt: 'Ir para o conteúdo principal', ru: 'Перейти к основному содержимому',
    ja: 'メインコンテンツへ移動', ko: '본문으로 이동',
  };
  const label = writingLocale ? writingLabels[writingLocale] : pathname.startsWith('/practica/ielts')
    ? 'Skip to main content' : 'Saltar al contenido principal';

  return <a className="wl-skip-link" href="#main">{label}</a>;
}
