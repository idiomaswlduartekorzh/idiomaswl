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
        src: '/icons/welearn-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/welearn-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/welearn-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'languages'],
    screenshots: [],
  };
}
