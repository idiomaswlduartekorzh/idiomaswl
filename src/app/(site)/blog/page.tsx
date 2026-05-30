import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import BlogClient from './BlogClient';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog de idiomas — Guías, estrategias y recursos | WeLearn',
  description:
    'Artículos prácticos sobre preparación IELTS, TOEFL, ICFES y aprendizaje de coreano escritos por David Duarte y el equipo pedagógico de WeLearn.',
  keywords: [
    'blog idiomas colombia', 'preparacion ielts colombia', 'aprender coreano colombia',
    'icfes ingles puntaje', 'toefl preparacion', 'topik coreano',
    'guia ielts band 7', 'metodo aprendizaje idiomas',
  ],
  openGraph: {
    title: 'Blog de idiomas — Idiomas WeLearn',
    description: 'Guías prácticas de preparación IELTS, ICFES y coreano para hispanohablantes.',
    url: 'https://idiomaswl.com/blog',
  },
  alternates: {
    canonical: 'https://idiomaswl.com/blog',
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://idiomaswl.com/blog' },
      ],
    },
    {
      '@type': 'Blog',
      '@id': 'https://idiomaswl.com/blog',
      url: 'https://idiomaswl.com/blog',
      name: 'Blog de Idiomas — Idiomas WeLearn',
      description: 'Guías prácticas de preparación IELTS, TOEFL, ICFES y aprendizaje de coreano escritas por David Duarte y el equipo pedagógico de WeLearn.',
      publisher: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://idiomaswl.com',
      },
      blogPost: BLOG_POSTS.map(p => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://idiomaswl.com/blog/${p.slug}`,
        datePublished: p.date,
        dateModified: p.updatedDate ?? p.date,
        author: { '@type': 'Person', name: 'José David Duarte Silva' },
        keywords: p.tags.join(', '),
      })),
    },
  ],
};

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categories = ['Todos', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  return (
    <main className={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="wrap">
        {/* Header — server rendered */}
        <div className={s.header}>
          <p className="wlh-section-eyebrow" style={{ textAlign: 'center' }}>Blog</p>
          <h1 className={s.h1}>Aprende con los mejores recursos.</h1>
          <p className={s.subtitle}>
            Guías escritas por David Duarte y el equipo de WeLearn. Sin relleno: solo
            lo que funciona para preparar exámenes y aprender idiomas desde Colombia.
          </p>
          <p style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '0.5rem' }}>
            {BLOG_POSTS.length} artículos gratuitos
          </p>
        </div>

        {/* Interactive filter + grid — client rendered */}
        <BlogClient posts={posts} categories={categories} />
      </div>
    </main>
  );
}
