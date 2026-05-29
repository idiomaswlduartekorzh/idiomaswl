'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog';
import s from './page.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

interface Props {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: Props) {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos'
    ? posts
    : posts.filter(p => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div className={s.categories} role="tablist" aria-label="Filtrar por categoría">
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`${s.catBtn} ${active === cat ? s.catBtnActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {filtered.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={s.card}>
            <div className={s.cardBody}>
              <span className={s.categoryBadge}>{post.category}</span>
              <h2 className={s.cardTitle}>{post.title}</h2>
              <p className={s.cardDesc}>{post.description}</p>
              <div className={s.cardMeta}>
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime} min de lectura</span>
                <span className={s.readMore}>Leer →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
