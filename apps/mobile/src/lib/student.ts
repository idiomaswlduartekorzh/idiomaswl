import type { SupabaseClient } from '@supabase/supabase-js';

export type StudentProfile = {
  full_name: string | null;
  plan: string | null;
  language: string | null;
  level: string | null;
  target_exam: string | null;
};

export type StudentAssignment = {
  id: string;
  title: string;
  instructions: string;
  due_at: string | null;
  status: string;
  resource_url: string | null;
  submission_text: string | null;
  submission_url: string | null;
  submitted_at: string | null;
  teacher_feedback: string | null;
};

export type StudentResult = {
  id: string;
  exam_slug: string;
  mock_title: string | null;
  total_label: string | null;
  created_at: string;
};

export type StudentSnapshot = {
  profile: StudentProfile | null;
  completedSteps: number;
  activeDays: number;
  assignments: StudentAssignment[];
  results: StudentResult[];
};

export async function loadStudentSnapshot(db: SupabaseClient, userId: string): Promise<StudentSnapshot> {
  // All five queries use the signed-in student's JWT and existing RLS policies.
  const [profile, progress, activity, assignments, results] = await Promise.all([
    db.from('profiles').select('full_name,plan,language,level,target_exam').eq('id', userId).maybeSingle(),
    db.from('user_progress').select('id', { count: 'exact', head: true }).eq('user_id', userId),
    db.from('daily_activity').select('activity_date').eq('user_id', userId)
      .order('activity_date', { ascending: false }).limit(7),
    db.from('student_assignments').select('id,title,instructions,due_at,status,resource_url,submission_text,submission_url,submitted_at,teacher_feedback')
      .eq('student_id', userId).neq('status', 'canceled')
      .order('assigned_at', { ascending: false }).limit(10),
    db.from('exam_submissions').select('id,exam_slug,mock_title,total_label,created_at')
      .eq('user_id', userId).order('created_at', { ascending: false }).limit(3),
  ]);

  const failure = [profile, progress, activity, assignments, results].find((result) => result.error)?.error;
  if (failure) throw failure;

  return {
    profile: profile.data as StudentProfile | null,
    completedSteps: progress.count ?? 0,
    activeDays: activity.data?.length ?? 0,
    assignments: (assignments.data ?? []) as StudentAssignment[],
    results: (results.data ?? []) as StudentResult[],
  };
}
