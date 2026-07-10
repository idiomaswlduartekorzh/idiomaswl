import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const dynamic = 'force-static'
export const runtime = 'nodejs'

export async function GET() {
  const html = await readFile(
    join(process.cwd(), 'src/content/clase-claude/publico.html'),
    'utf8'
  )

  return new Response(html, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
