import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); } catch { return new Response('No autorizado', { status: 403 }); }
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response('No encontrado', { status: 404 });
  const { data, error } = await createAdminClient().from('manual_course_enrollment_invites').select('signed_pdf_base64,signed_pdf_sha256').eq('id', id).maybeSingle();
  if (error || !data?.signed_pdf_base64 || !data.signed_pdf_sha256) return new Response('No encontrado', { status: 404 });
  const bytes = Buffer.from(data.signed_pdf_base64, 'base64');
  if (createHash('sha256').update(bytes).digest('hex') !== data.signed_pdf_sha256) return new Response('Documento inválido', { status: 500 });
  return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="reglamento-welearn-firmado.pdf"', 'Cache-Control': 'private, no-store' } });
}
