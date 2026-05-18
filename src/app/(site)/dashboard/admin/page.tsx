import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import JoseDashboardServer from './JoseDashboardServer'
import ZhannaDashboard from './ZhannaDashboard'

const JOSE_EMAILS = ['josedavidduartesilva@gmail.com', 'david.duartes182@gmail.com']
const ZHANNA_EMAIL = 'zhanna.korzh@gmail.com'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const email = user?.email ?? ''

  if (JOSE_EMAILS.includes(email)) {
    return <JoseDashboardServer />
  }

  if (email === ZHANNA_EMAIL) {
    return <ZhannaDashboard />
  }

  redirect('/dashboard')
}
