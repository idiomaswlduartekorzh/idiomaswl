import { NextResponse } from 'next/server';
import { CYCLE_TEXTS } from '@/data/korean-cycle-texts';
import { createAdminClient } from '@/lib/supabase/admin';

const LESSON_IDS = new Set(CYCLE_TEXTS.map((text) => text.id));

export async function GET(
  _request: Request,
  context: { params: Promise<{ textId: string }> },
) {
  const { textId } = await context.params;
  const id = textId.endsWith('.mp3') ? textId.slice(0, -4) : '';
  if (!LESSON_IDS.has(id)) {
    return NextResponse.json({ error: 'Audio no encontrado.' }, { status: 404 });
  }

  const { data, error } = await createAdminClient()
    .storage.from('cycle-audio')
    .createSignedUrl(`textos/${id}.mp3`, 60);

  if (error || !data?.signedUrl) {
    console.error('[lesson-audio] signed URL error:', error);
    return NextResponse.json({ error: 'Audio no disponible.' }, { status: 503 });
  }

  return NextResponse.redirect(data.signedUrl, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
