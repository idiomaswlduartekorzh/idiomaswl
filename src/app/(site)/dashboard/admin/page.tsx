import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import JoseDashboardServer from './JoseDashboardServer'
import ZhannaDashboardServer from './ZhannaDashboardServer'
import { isVerifiedJoseAdminUser, isVerifiedZhannaAdminUser } from '@/lib/config/admins'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isVerifiedJoseAdminUser(user)) {
    return <JoseDashboardServer />
  }

  if (isVerifiedZhannaAdminUser(user)) {
    return <ZhannaDashboardServer />
  }

  redirect('/dashboard')
}
