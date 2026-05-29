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
const CTA_BY_CATEGORY: Record<string, { title: string; desc: string; msg: string }> = {
  IELTS: {
    title: '¿Listo para preparar el IELTS en serio?',
    desc: 'Agenda tu clase de diagnóstico gratis y empieza con un plan personalizado para alcanzar tu Band objetivo.',
    msg: 'Hola, leí el artículo de WeLearn sobre el IELTS y quiero agendar mi clase de diagnóstico gratis.',
  },
  TOEFL: {
    title: '¿Listo para preparar el TOEFL iBT?',
    desc: 'Haz un simulacro gratuito de TOEFL o agenda una clase de diagnóstico para saber exactamente qué necesitas.',
    msg: 'Hola, leí el artículo de WeLearn sobre el TOEFL iBT y quiero saber más sobre la preparación.',
  },
  ICFES: {
    title: '¿Quieres mejorar tu puntaje ICFES inglés?',
    desc: 'Haz un simulacro gratuito ahora mismo o agenda una sesión con tutor para un plan de preparación personalizado.',
    msg: 'Hola, leí el artículo de WeLearn sobre el ICFES y quiero saber más sobre la preparación para inglés.',
  },
  Coreano: {
    title: '¿Quieres empezar a aprender coreano?',
    desc: 'El método WeLearn de 17 pasos está diseñado específicamente para hispanohablantes. Empieza gratis hoy.',
    msg: 'Hola, leí el artículo de WeLearn sobre coreano y quiero saber más sobre las clases.',
  },
};

const DEFAULT_CTA = {
  title: '¿Listo para aprender en serio?',
  desc: 'Agenda tu clase de diagnóstico gratis con un tutor de WeLearn y empieza con un plan personalizado.',
  msg: 'Hola, leí un artículo del blog de WeLearn y quiero saber más sobre las clases.',
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

  // JSON-LD Article structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
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
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent(cta.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={s.ctaBtn}
            >
              Hablar con un tutor →
            </a>
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
