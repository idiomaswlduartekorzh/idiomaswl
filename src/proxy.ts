import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { isBotUserAgent, shouldTrackPresencePath } from '@/lib/presence';
import { recordBotPresence } from '@/lib/presence.server';

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;
  if (
    request.method === 'GET'
    && !pathname.startsWith('/dashboard')
    && shouldTrackPresencePath(pathname)
    && isBotUserAgent(request.headers.get('user-agent'))
  ) {
    event.waitUntil(recordBotPresence(request));
  }

  if (/^\/examenes\/icfes\/practica\/mock-(?:21|22|23)(?:\/|$)/.test(pathname)) {
    return new NextResponse('No encontrado', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }
  if (!pathname.startsWith('/dashboard')) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp3|wav|pdf|xml|txt)$).*)',
  ],
};
