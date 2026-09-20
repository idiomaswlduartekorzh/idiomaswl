import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isVerifiedAdminUser } from '@/lib/config/admins';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  request: Request,
  context: { params: Promise<{ submissionId: string }> },
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isVerifiedAdminUser(user)) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 403 });
  }

  const { submissionId } = await context.params;
  if (!UUID_RE.test(submissionId)) {
    return NextResponse.json({ error: 'Audio no encontrado.' }, { status: 404 });
  }

  const admin = createAdminClient();
  const { data: submission, error: lookupError } = await admin
    .from('cycle_submissions')
    .select('audio_path')
    .eq('id', submissionId)
    .maybeSingle();

  if (lookupError) {
    console.error('[admin-cycle-audio] lookup error:', lookupError);
    return NextResponse.json({ error: 'Audio no disponible.' }, { status: 503 });
  }
  if (!submission?.audio_path || submission.audio_path.startsWith('textos/')) {
    return NextResponse.json({ error: 'Audio no encontrado.' }, { status: 404 });
  }

  const download = new URL(request.url).searchParams.get('download') === '1';
  const { data, error } = await admin.storage.from('cycle-audio').createSignedUrl(
    submission.audio_path,
    60,
    download ? { download: true } : undefined,
  );
  if (error || !data?.signedUrl) {
    console.error('[admin-cycle-audio] signed URL error:', error);
    return NextResponse.json({ error: 'Audio no disponible.' }, { status: 503 });
  }

  return NextResponse.redirect(data.signedUrl, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
