import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/preview/',
          '/animation/',
          '/labs/',
          '/(auth)/',
        ],
      },
    ],
    sitemap: 'https://www.idiomaswl.com/sitemap.xml',
  };
}
