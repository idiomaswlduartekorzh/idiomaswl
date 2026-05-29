import type { MetadataRoute } from 'next';

const BASE = 'https://idiomaswl.com';

const PUBLISHED_DAYS = [1, 2, 3, 4, 6, 7];

const EXAM_SLUGS = ['ielts', 'toefl', 'icfes', 'goethe', 'cils-celi', 'delf-dalf', 'celpe-bras'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core pages ─────────────────────────────────────────────────────────────
    { url: BASE,                      lastModified: now, changeFrequency: 'monthly', priority: 1    },
    { url: `${BASE}/home`,            lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/metodo`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/leccion`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/practica`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/precios`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7  },

    // ── High-intent landing pages ──────────────────────────────────────────────
    { url: `${BASE}/clases-de-ingles`,     lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/clases-de-coreano`,    lastModified: now, changeFrequency: 'monthly', priority: 0.92 },
    { url: `${BASE}/preparacion-icfes`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/miembro-fundador`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },

    // ── Exams ──────────────────────────────────────────────────────────────────
    { url: `${BASE}/examenes`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9  },
    ...EXAM_SLUGS.map((slug) => ({
      url: `${BASE}/examenes/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),

    // ── Korean lesson steps ────────────────────────────────────────────────────
    ...PUBLISHED_DAYS.map((day) => ({
      url: `${BASE}/courses/korean/step/${day}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
