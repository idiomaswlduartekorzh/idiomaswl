import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/data/blog';

// runtime = 'nodejs' (default) — edge limit is 1 MB, blog data exceeds it
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_COLORS: Record<string, string> = {
  IELTS:   '#1a2ecc',
  TOEFL:   '#1a6e3c',
  ICFES:   '#0f7c3e',
  Coreano: '#c8202e',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Blog WeLearn';
  const category = post?.category ?? 'Blog';
  const accentColor = CATEGORY_COLORS[category] ?? '#c8202e';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d0d14',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: accentColor,
            opacity: 0.12,
            filter: 'blur(80px)',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: `${accentColor}22`,
            border: `1.5px solid ${accentColor}55`,
            color: accentColor,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 16px',
            borderRadius: 999,
            marginBottom: 32,
            width: 'fit-content',
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: post && post.title.length > 60 ? 44 : 52,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            maxWidth: 900,
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#c8202e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              D
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>José David Duarte Silva</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {post ? `${post.readTime} min de lectura` : ''}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#c8202e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              W
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
              idiomaswl.com/blog
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
