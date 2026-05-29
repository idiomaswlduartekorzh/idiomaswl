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

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categories = ['Todos', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  return (
    <main className={s.page}>
      <div className="wrap">
        {/* Header — server rendered */}
        <div className={s.header}>
          <p className="wlh-section-eyebrow" style={{ textAlign: 'center' }}>Blog</p>
          <h1 className={s.h1}>Aprende con los mejores recursos.</h1>
          <p className={s.subtitle}>
            Guías escritas por David Duarte y el equipo de WeLearn. Sin relleno: solo
            lo que funciona para preparar exámenes y aprender idiomas desde Colombia.
          </p>
        </div>

        {/* Interactive filter + grid — client rendered */}
        <BlogClient posts={posts} categories={categories} />
      </div>
    </main>
  );
}
