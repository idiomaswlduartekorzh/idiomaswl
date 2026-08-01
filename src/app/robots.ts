import type { MetadataRoute } from 'next';

/** Rutas privadas o sin valor de indexación. Se aplican a todos los rastreadores. */
const DISALLOW = [
  '/dashboard/',
  '/api/',
  '/preview/',
  '/animation/',
  '/labs/',
  '/(auth)/',
];

/**
 * Rastreadores de motores de respuesta. El comodín ya los permitiría, pero se declaran
 * explícitamente para dejar registrada la intención: queremos que ChatGPT, Perplexity,
 * Claude y las respuestas con IA de Google puedan leer y citar el contenido.
 *
 * Ojo con Google-Extended: no afecta el ranking en la búsqueda normal, solo controla si el
 * contenido puede usarse para fundamentar respuestas de IA. Bloquearlo nos dejaría fuera.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map(userAgent => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://www.idiomaswl.com/sitemap.xml',
  };
}
