'use server';

import { createClient } from '@/lib/supabase/server';

export async function markStepComplete(
  courseSlug: string,
  stepId: string,
  lastStage?: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'No autenticado' };

  const { error } = await supabase
    .from('user_progress')
    .upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        step_id: stepId,
        last_stage: lastStage ?? null,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,course_slug,step_id' },
    );

  if (error) {
    console.error('[markStepComplete]', error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function getCompletedSteps(
  courseSlug: string,
): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('user_progress')
    .select('step_id')
    .eq('user_id', user.id)
    .eq('course_slug', courseSlug);

  return (data ?? []).map(r => r.step_id as string);
}
