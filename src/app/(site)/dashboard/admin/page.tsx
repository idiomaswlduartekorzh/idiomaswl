import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import JoseDashboardServer from './JoseDashboardServer'
import ZhannaDashboardServer from './ZhannaDashboardServer'
import { JOSE_EMAILS, ZHANNA_EMAILS } from '@/lib/config/admins'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const email = user?.email?.trim().toLowerCase() ?? ''

  if (JOSE_EMAILS.includes(email as typeof JOSE_EMAILS[number])) {
    return <JoseDashboardServer />
  }

  if (ZHANNA_EMAILS.includes(email as typeof ZHANNA_EMAILS[number])) {
    return <ZhannaDashboardServer />
  }

  redirect('/dashboard')
}
