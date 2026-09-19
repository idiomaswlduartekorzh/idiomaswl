import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function StudentProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  redirect('/dashboard/student#progreso');
}
