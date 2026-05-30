import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, getPostBySlug, getAllSlugs } from '@/data/blog';
import s from './page.module.css';

// ── Static params ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog WeLearn`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://idiomaswl.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: ['José David Duarte Silva'],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://idiomaswl.com/blog/${post.slug}`,
    },
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

const WA = '573005004253';
interface CtaConfig {
  title: string;
  desc: string;
  msg: string;
  pageLink?: string;
  pageLinkLabel?: string;
}

const CTA_BY_CATEGORY: Record<string, CtaConfig> = {
  IELTS: {
    title: '¿Listo para preparar el IELTS en serio?',
    desc: 'Agenda tu clase de diagnóstico gratis y empieza con un plan personalizado para alcanzar tu Band objetivo.',
    msg: 'Hola, leí el artículo de WeLearn sobre el IELTS y quiero agendar mi clase de diagnóstico gratis.',
    pageLink: '/clases-de-ingles',
    pageLinkLabel: 'Ver clases de inglés',
  },
  TOEFL: {
    title: '¿Listo para preparar el TOEFL iBT?',
    desc: 'Haz un simulacro gratuito de TOEFL o agenda una clase de diagnóstico para saber exactamente qué necesitas.',
    msg: 'Hola, leí el artículo de WeLearn sobre el TOEFL iBT y quiero saber más sobre la preparación.',
    pageLink: '/clases-de-ingles',
    pageLinkLabel: 'Ver clases de inglés',
  },
  ICFES: {
    title: '¿Quieres mejorar tu puntaje ICFES inglés?',
    desc: 'Haz un simulacro gratuito ahora mismo o agenda una sesión con tutor para un plan de preparación personalizado.',
    msg: 'Hola, leí el artículo de WeLearn sobre el ICFES y quiero saber más sobre la preparación para inglés.',
    pageLink: '/preparacion-icfes',
    pageLinkLabel: 'Ver preparación ICFES',
  },
  Coreano: {
    title: '¿Quieres empezar a aprender coreano?',
    desc: 'El método WeLearn de 17 pasos está diseñado específicamente para hispanohablantes. Empieza gratis hoy.',
    msg: 'Hola, leí el artículo de WeLearn sobre coreano y quiero saber más sobre las clases.',
    pageLink: '/clases-de-coreano',
    pageLinkLabel: 'Ver clases de coreano',
  },
  Alemán: {
    title: '¿Quieres prepararte para el Goethe?',
    desc: 'Te ayudamos a preparar el Goethe-Zertifikat desde Colombia. Plan personalizado según tu nivel y meta.',
    msg: 'Hola, leí el artículo de WeLearn sobre el Goethe-Zertifikat y quiero saber más sobre las clases de alemán.',
    pageLink: '/examenes/goethe',
    pageLinkLabel: 'Ver simulacros de Goethe',
  },
  Portugués: {
    title: '¿Quieres prepararte para el Celpe-Bras?',
    desc: 'Te ayudamos a preparar el Celpe-Bras con tutor especializado. Ideal para quienes quieren estudiar o trabajar en Brasil.',
    msg: 'Hola, leí el artículo de WeLearn sobre el Celpe-Bras y quiero saber más sobre las clases de portugués.',
    pageLink: '/examenes/celpe-bras',
    pageLinkLabel: 'Ver simulacros de Celpe-Bras',
  },
  Francés: {
    title: '¿Quieres prepararte para el DELF o DALF?',
    desc: 'Clases de francés con enfoque en exámenes oficiales. Preparamos DELF A1 hasta DALF C2 con docentes especializados.',
    msg: 'Hola, leí el artículo de WeLearn sobre el DELF y DALF y quiero saber más sobre las clases de francés.',
    pageLink: '/examenes/delf-dalf',
    pageLinkLabel: 'Ver simulacros de DELF',
  },
  Método: {
    title: '¿Listo para aprender un idioma con método?',
    desc: 'Conoce el método WeLearn de 17 pasos, diseñado para hispanohablantes que quieren hablar idiomas, no solo aprenderlos.',
    msg: 'Hola, leí el artículo de WeLearn sobre aprendizaje de idiomas y quiero saber más sobre el método.',
    pageLink: '/metodo',
    pageLinkLabel: 'Ver el método WeLearn',
  },
  Migración: {
    title: '¿Planeas migrar y necesitas certificar tu inglés?',
    desc: 'Preparación IELTS y TOEFL para migrar a Canadá, Australia o EE.UU. Con tutor experto y plan personalizado.',
    msg: 'Hola, leí el artículo de WeLearn sobre migración e inglés y quiero saber más sobre la preparación.',
    pageLink: '/clases-de-ingles',
    pageLinkLabel: 'Ver clases de inglés',
  },
  Inglés: {
    title: '¿Quieres mejorar tu inglés para objetivos reales?',
    desc: 'Clases personalizadas de inglés con tutor especializado. Desde conversación laboral hasta certificaciones internacionales.',
    msg: 'Hola, leí un artículo de WeLearn sobre inglés y quiero saber más sobre las clases disponibles.',
    pageLink: '/clases-de-ingles',
    pageLinkLabel: 'Ver clases de inglés',
  },
};

const DEFAULT_CTA: CtaConfig = {
  title: '¿Listo para aprender en serio?',
  desc: 'Agenda tu clase de diagnóstico gratis con un tutor de WeLearn y empieza con un plan personalizado.',
  msg: 'Hola, leí un artículo del blog de WeLearn y quiero saber más sobre las clases.',
  pageLink: '/clases-de-ingles',
  pageLinkLabel: 'Ver clases de inglés',
};

// ── Page ──────────────────────────────────────────────────────────────────
export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      // same category first, then by date
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 2);

  const cta = CTA_BY_CATEGORY[post.category] ?? DEFAULT_CTA;

  // JSON-LD: Article + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://idiomaswl.com/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        url: `https://idiomaswl.com/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.updatedDate ?? post.date,
        author: {
          '@type': 'Person',
          name: 'José David Duarte Silva',
          url: 'https://idiomaswl.com/home',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Idiomas WeLearn',
          url: 'https://idiomaswl.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://idiomaswl.com/images/welearn-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://idiomaswl.com/blog/${post.slug}`,
        },
        keywords: post.tags.join(', '),
        inLanguage: 'es-CO',
        articleSection: post.category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://idiomaswl.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://idiomaswl.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://idiomaswl.com/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <article className={s.article}>

          {/* Header */}
          <header className={s.header}>
            <nav className={s.breadcrumb} aria-label="Breadcrumb">
              <Link href="/home">Inicio</Link>
              <span>›</span>
              <Link href="/blog">Blog</Link>
              <span>›</span>
              <span>{post.category}</span>
            </nav>

            <span className={s.categoryBadge}>{post.category}</span>
            <h1 className={s.h1}>{post.title}</h1>

            <div className={s.meta}>
              <span className={s.metaAuthor}>
                <span className={s.authorAvatar}>D</span>
                José David Duarte Silva
              </span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime} min de lectura</span>
            </div>
          </header>

          {/* Body */}
          <div
            className={s.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Tags */}
          <div className={s.tags} aria-label="Etiquetas">
            {post.tags.map(tag => (
              <span key={tag} className={s.tag}>{tag}</span>
            ))}
          </div>

          {/* CTA */}
          <div className={s.cta}>
            <p className={s.ctaTitle}>{cta.title}</p>
            <p className={s.ctaDesc}>{cta.desc}</p>
            <div className={s.ctaActions}>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(cta.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={s.ctaBtn}
              >
                Hablar con un tutor →
              </a>
              {cta.pageLink && (
                <Link href={cta.pageLink} className={s.ctaBtnSecondary}>
                  {cta.pageLinkLabel ?? 'Ver más'} →
                </Link>
              )}
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className={s.related}>
              <p className={s.relatedTitle}>También te puede interesar</p>
              <div className={s.relatedGrid}>
                {related.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className={s.relatedCard}>
                    <p className={s.relatedCat}>{rp.category}</p>
                    <p className={s.relatedCardTitle}>{rp.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>
      </div>
    </main>
  );
}
