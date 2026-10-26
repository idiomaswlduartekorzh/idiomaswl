import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { sendStudyReminders } from '@/lib/student-notifications.server';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorizedCronRequest(request.headers.get('authorization'), process.env.CRON_SECRET)) {
    return Response.json({ ok: false, code: 'unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const result = await sendStudyReminders();
    return Response.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ ok: false, code: 'reminders_failed' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
