import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import JoseDashboardServer from './JoseDashboardServer'
import ZhannaDashboardServer from './ZhannaDashboardServer'
import { isJoseAdminEmail, isZhannaAdminEmail } from '@/lib/config/admins'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isJoseAdminEmail(user?.email)) {
    return <JoseDashboardServer />
  }

  if (isZhannaAdminEmail(user?.email)) {
    return <ZhannaDashboardServer />
  }

  redirect('/dashboard')
}
