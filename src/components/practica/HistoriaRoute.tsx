// ─── Ruta de una historia ─────────────────────────────────────────────────────
// Las 16 páginas /practica/<idioma>/historias/<slug> son idénticas salvo el
// idioma. Todo lo común vive aquí para que cada page.tsx sean seis líneas.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StoryEngine from './StoryEngine';
import type { HistoriaLang } from '@/data/practica/historias/types';
import { totalQuestions } from '@/data/practica/historias/types';
import { HISTORIA_LANGS, getHistoria, getHistorias } from '@/data/practica/historias';
import { fitDescription, fitTitle } from '@/lib/seo-snippet';

const BASE = 'https://www.idiomaswl.com';

const ISO: Record<HistoriaLang, string> = {
  ingles: 'en', aleman: 'de', frances: 'fr', italiano: 'it',
  portugues: 'pt', coreano: 'ko', japones: 'ja', ruso: 'ru',
};

export function historiaStaticParams(lang: HistoriaLang) {
  return getHistorias(lang).map(h => ({ slug: h.slug }));
}

// El sitio no tiene `template` de título a propósito (ver src/app/layout.tsx): el
// sufijo de marca se comía justo el final del título, que es donde vive lo que
// distingue una página de otra. Así que aquí tampoco se añade, y todo pasa por
// fitTitle/fitDescription para no salirse nunca de los 60/155 que Google recorta.
export function historiaMetadata(lang: HistoriaLang, slug: string): Metadata {
  const h = getHistoria(lang, slug);
  if (!h) return {};
  const url = `${BASE}/practica/${lang}/historias/${h.slug}`;
  const title = fitTitle(h.metaTitle);
  const description = fitDescription(h.metaDescription);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article' },
  };
}

export function HistoriaRoute({ lang, slug }: { lang: HistoriaLang; slug: string }) {
  const h = getHistoria(lang, slug);
  if (!h) notFound();

  const meta = HISTORIA_LANGS[lang];
  const url = `${BASE}/practica/${lang}/historias/${h.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: h.title,
        description: h.metaDescription,
        url,
        inLanguage: ISO[lang],
        educationalLevel: h.level,
        learningResourceType: 'Comprensión integrada (lectura + escucha)',
        teaches: `${meta.label}, comprensión lectora, comprensión auditiva, inferencia`,
        isAccessibleForFree: true,
        provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Práctica', item: `${BASE}/practica` },
          { '@type': 'ListItem', position: 2, name: meta.label, item: `${BASE}/practica/${lang}` },
          { '@type': 'ListItem', position: 3, name: 'Historias', item: `${BASE}/practica/${lang}/historias` },
          { '@type': 'ListItem', position: 4, name: h.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wl-section">
        <div className="wrap">
          <StoryEngine historia={h} hubHref={`/practica/${lang}/historias`} hubLabel="Historias" />
        </div>
      </section>
    </>
  );
}

/** Cabecera del hub: la usa el sitemap y las tarjetas de cada idioma. */
export function historiasHubMetadata(lang: HistoriaLang): Metadata {
  const meta = HISTORIA_LANGS[lang];
  const historias = getHistorias(lang);
  const url = `${BASE}/practica/${lang}/historias`;
  const preguntas = historias.reduce((n, h) => n + totalQuestions(h), 0);
  const idioma = meta.label.toLowerCase();
  const title = fitTitle(`Historias en ${idioma} — comprensión con dos versiones`);
  const description = fitDescription(
    `${historias.length} conflictos reales en ${idioma}, contados por las dos partes. ` +
    `Narrador, dos audios con transcripción y ${preguntas} preguntas de comprensión.`,
  );
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}
