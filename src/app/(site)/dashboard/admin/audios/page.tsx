import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import AudiosAdmin from './AudiosAdmin';

const ADMIN_EMAILS = [
  'josedavidduartesilva@gmail.com',
  'david.duartes182@gmail.com',
  'zhanna.korzh@gmail.com',
];

export default async function AudiosAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !ADMIN_EMAILS.includes(user.email)) {
    redirect('/dashboard');
  }

  const admin = createAdminClient();

  // Fetch first page of submissions
  const { data: submissions, count } = await admin
    .from('cycle_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(20);

  // Badge: count new in last 24h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: newCount } = await admin
    .from('cycle_submissions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', since);

  return (
    <AudiosAdmin
      initialSubmissions={submissions ?? []}
      total={count ?? 0}
      newCount={newCount ?? 0}
    />
  );
}
