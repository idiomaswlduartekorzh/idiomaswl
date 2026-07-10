import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { NextResponse, type NextRequest } from 'next/server'
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const filename = 'Paquete_Completo_Instructor_Casos_Claude.zip'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!user.email || !ALL_ADMIN_EMAILS.includes(user.email)) {
    return new Response('No autorizado', { status: 403 })
  }

  const archive = await readFile(
    join(process.cwd(), 'src/content/clase-claude', filename)
  )

  return new Response(new Uint8Array(archive), {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(archive.byteLength),
      'Content-Type': 'application/zip',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
