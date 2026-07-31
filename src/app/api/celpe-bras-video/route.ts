// Proxy de streaming para os vídeos oficiais do acervo CELPE-BRAS (UFRGS).
//
// O servidor da UFRGS bloqueia a reprodução via <audio>/<video> quando a página
// é embebida em outro domínio (proteção anti-hotlink por Referer) — confirmado:
// `curl` funciona, mas o elemento de mídia do navegador recebe MEDIA_ERR_SRC_NOT_SUPPORTED.
// Esta rota busca o arquivo no servidor (sem esse bloqueio) e o retransmite ao
// navegador em tempo real, sem guardar cópia permanente do material oficial.
//
// Only requests to the UFRGS acervo host + uploads path are allowed, to prevent
// this from becoming an open proxy (SSRF protection).

const ALLOWED_HOST = 'www.ufrgs.br';
const ALLOWED_PREFIX = '/acervocelpebras/wp-content/uploads/';

function isAllowed(url: URL): boolean {
  return url.protocol === 'https:' && url.hostname === ALLOWED_HOST && url.pathname.startsWith(ALLOWED_PREFIX);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get('src');
  if (!src) return new Response('Missing src', { status: 400 });

  let target: URL;
  try {
    target = new URL(src);
  } catch {
    return new Response('Invalid src', { status: 400 });
  }

  if (!isAllowed(target)) return new Response('Forbidden', { status: 403 });

  const range = request.headers.get('range');
  const upstream = await fetch(target.toString(), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; WeLearnPracticeProxy/1.0)',
      ...(range ? { Range: range } : {}),
    },
  });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response('Upstream error', { status: upstream.status });
  }

  const headers = new Headers();
  for (const h of ['content-type', 'content-length', 'content-range', 'accept-ranges']) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }
  if (!headers.has('accept-ranges')) headers.set('accept-ranges', 'bytes');
  headers.set('cache-control', 'public, max-age=86400, immutable');

  return new Response(upstream.body, { status: upstream.status, headers });
}
