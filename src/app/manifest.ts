import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Idiomas WeLearn',
    short_name: 'WeLearn',
    description: 'Aprende coreano, inglés, francés y más con once pasos diarios. Simulacros de TOEFL, IELTS e ICFES.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#14215c',
    orientation: 'portrait',
    lang: 'es',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/images/welearn-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/welearn-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['education', 'languages'],
    screenshots: [],
  };
}
