import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** Only allow relative paths — prevents open-redirect to external sites. */
function safeRedirectPath(next: string | null): string {
  const fallback = '/dashboard';
  if (!next) return fallback;
  // Must start with '/' and must NOT start with '//' (protocol-relative URL)
  if (!next.startsWith('/') || next.startsWith('//')) return fallback;
  // Block any embedded protocol (http:, https:, javascript:, data:, …)
  if (/[a-zA-Z][a-zA-Z0-9+\-.]*:/.test(next)) return fallback;
  return next;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeRedirectPath(searchParams.get('next'));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      // Invalid or expired code — redirect to login without leaking details
      return NextResponse.redirect(`${origin}/login?error=auth`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
