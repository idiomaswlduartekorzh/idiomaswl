import { hasMaterialDownloadAccess } from '@/lib/xpress-commerce/access.server';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function GET() {
  const headers = {
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  };
  const user = await xpressUser();
  if (!user) return Response.json({ authenticated: false, allowed: false }, { status: 401, headers });
  try {
    const allowed = await hasMaterialDownloadAccess(user.id);
    return Response.json({ authenticated: true, allowed }, { status: allowed ? 200 : 403, headers });
  } catch {
    return Response.json({ error: 'material_access_unavailable' }, { status: 503, headers });
  }
}
