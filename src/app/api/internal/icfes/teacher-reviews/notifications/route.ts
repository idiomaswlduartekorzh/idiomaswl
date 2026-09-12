import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { recoverIcfesTeacherNotifications } from '@/lib/icfes/teacher-notifications.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorizedCronRequest(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return Response.json({ ok: false, code: 'unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const result = await recoverIcfesTeacherNotifications(50);
    return Response.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ ok: false, code: 'notification_recovery_failed' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
