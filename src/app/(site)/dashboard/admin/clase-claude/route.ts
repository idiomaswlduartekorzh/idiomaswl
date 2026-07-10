import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { NextResponse, type NextRequest } from 'next/server'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', '/dashboard/admin/clase-claude')
    return NextResponse.redirect(loginUrl)
  }

  if (!user.email || !ALL_ADMIN_EMAILS.includes(user.email)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const html = await readFile(
    join(process.cwd(), 'src/content/clase-claude/instructor.html'),
    'utf8'
  )

  return new Response(html, {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
