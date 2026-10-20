import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { hasMaterialDownloadAccess } from '@/lib/xpress-commerce/access.server';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

const CONTENT_TYPES: Readonly<Record<string, string>> = {
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.wav': 'audio/wav',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const PUBLIC_DOWNLOAD_ROOTS = new Set(['audio', 'assets', 'downloads', 'images']);
const PUBLIC_DOWNLOAD_EXTENSIONS = new Set(['.mp3', '.m4a', '.wav', '.png', '.jpg', '.jpeg', '.webp', '.svg']);

function accessResponse(request: Request, error: string, status: 401 | 403 | 503) {
  const headers = {
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  };
  const acceptsHtml = (request.headers.get('accept') ?? '').includes('text/html');
  if (!acceptsHtml || status === 503) return Response.json({ error }, { status, headers });
  const current = new URL(request.url);
  const destination = status === 401
    ? `/registro?next=${encodeURIComponent(`${current.pathname}${current.search}`)}&source=material`
    : '/suscripcion/examenes?reason=material-download';
  return new Response(null, {
    status: 303,
    headers: { ...headers, Location: new URL(destination, current.origin).toString() },
  });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const user = await xpressUser();
  if (!user) return accessResponse(request, 'authentication_required', 401);

  try {
    if (!await hasMaterialDownloadAccess(user.id)) {
      return accessResponse(request, 'paid_access_required', 403);
    }

    const segments = (await context.params).path;
    if (!segments?.length || segments.some((segment) => !segment || segment === '.' || segment === '..')) {
      return Response.json({ error: 'material_not_found' }, { status: 404 });
    }
    const servesPublicAsset = segments[0] === '_public';
    const materialSegments = servesPublicAsset ? segments.slice(1) : segments;
    if (servesPublicAsset && !PUBLIC_DOWNLOAD_ROOTS.has(materialSegments[0])) {
      return Response.json({ error: 'material_not_found' }, { status: 404 });
    }
    if (servesPublicAsset) {
      const extension = path.extname(materialSegments.at(-1) ?? '').toLowerCase();
      if (!PUBLIC_DOWNLOAD_EXTENSIONS.has(extension)) {
        return Response.json({ error: 'material_not_found' }, { status: 404 });
      }
      return Response.redirect(new URL(`/${materialSegments.map(encodeURIComponent).join('/')}`, request.url), 307);
    }

    const root = path.resolve(process.cwd(), 'private', 'site-materials');
    const absolutePath = path.resolve(root, ...materialSegments);
    if (!absolutePath.startsWith(`${root}${path.sep}`)) {
      return Response.json({ error: 'material_not_found' }, { status: 404 });
    }
    const extension = path.extname(absolutePath).toLowerCase();
    const contentType = CONTENT_TYPES[extension];
    if (!contentType || (extension !== '.pdf' && extension !== '.zip')) {
      return Response.json({ error: 'material_not_found' }, { status: 404 });
    }

    const file = await readFile(absolutePath);
    const fileName = path.basename(absolutePath).replace(/["\\]/gu, '');
    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(file.byteLength),
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return Response.json({ error: 'material_not_found' }, { status: 404 });
    }
    return accessResponse(request, 'material_unavailable', 503);
  }
}
