import { redirect } from 'next/navigation';
import { isAdminEmail } from '@/lib/config/admins';
import { createClient } from '@/lib/supabase/server';
import { loadStudentDashboard } from '@/lib/student-dashboard/data.server';
import StudentDashboardView from '@/components/student-dashboard/StudentDashboardView';

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  if (isAdminEmail(user.email)) redirect('/dashboard/admin');

  const { data: profile } = await supabase.from('profiles')
    .select('full_name,target_exam')
    .eq('id', user.id)
    .maybeSingle();
  const data = await loadStudentDashboard(user, profile);
  return <StudentDashboardView data={data} />;
}
