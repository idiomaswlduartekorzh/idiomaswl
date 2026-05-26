import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const audio     = form.get('audio') as File | null;
    const username  = form.get('username') as string | null;
    const email     = form.get('email') as string | null;
    const nivel     = form.get('nivel') as string | null;
    const textoId   = form.get('texto_id') as string | null;
    const quizLevel = form.get('quiz_level') as string | null;
    const respuestas = form.get('respuestas') as string | null;

    if (!audio || !username || !nivel || !textoId) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    const supabase  = createAdminClient();
    const timestamp = Date.now();
    const ext       = audio.name.split('.').pop() ?? 'webm';
    const path      = `${timestamp}_${username.replace(/[^a-zA-Z0-9]/g,'_')}_${nivel}_${textoId}.${ext}`;

    // Upload audio to Supabase Storage
    const arrayBuffer = await audio.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('cycle-audio')
      .upload(path, arrayBuffer, { contentType: audio.type, upsert: false });

    if (uploadError) {
      console.error('[submit-audio] storage error:', uploadError);
      return NextResponse.json({ error: 'Error al subir el audio.' }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('cycle-audio').getPublicUrl(path);

    // Save metadata to DB
    const { error: dbError } = await supabase.from('cycle_submissions').insert({
      username,
      email:     email || null,
      nivel,
      texto_id:  textoId,
      quiz_level: quizLevel,
      audio_url: publicUrl,
      audio_path: path,
      respuestas: respuestas ? JSON.parse(respuestas) : null,
    });

    if (dbError) {
      console.error('[submit-audio] db error:', dbError);
      // Audio was uploaded; still return success to user
    }

    return NextResponse.json({ success: true, message: 'Audio enviado correctamente.' });
  } catch (err) {
    console.error('[submit-audio] unexpected:', err);
    return NextResponse.json({ error: 'Error inesperado del servidor.' }, { status: 500 });
  }
}
