import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { examCan } from '@/lib/xpress-commerce/access';
import { parseXpressExamSlug, resolveExamAccessForUser } from '@/lib/xpress-commerce/access.server';
import { xpressUser } from '@/lib/xpress-commerce/payments.server';
import { getPrivateExamMaterial, type ExamMaterialKind } from '@/lib/exams/transcript-resource';

export const runtime = 'nodejs';

const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

function errorResponse(error: string, status: 401 | 403 | 404 | 503) {
  return Response.json({ error }, { status, headers: PRIVATE_HEADERS });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ exam: string; mockId: string; kind: string }> },
) {
  const { exam, mockId, kind } = await context.params;
  const examSlug = parseXpressExamSlug(exam);
  if (!examSlug || (kind !== 'transcript' && kind !== 'answer-key')) {
    return errorResponse('material_not_found', 404);
  }
  const material = getPrivateExamMaterial(examSlug, mockId, kind as ExamMaterialKind);
  if (!material) return errorResponse('material_not_found', 404);

  const user = await xpressUser();
  if (!user) return errorResponse('authentication_required', 401);
  try {
    const access = await resolveExamAccessForUser(user.id, examSlug);
    if (!examCan(access.level, 'download-materials')) {
      return errorResponse('paid_exam_access_required', 403);
    }
    const absolutePath = path.join(process.cwd(), 'private', 'exam-materials', material.relativePath);
    const file = await readFile(absolutePath);
    const disposition = new URL(request.url).searchParams.get('download') === '1' ? 'attachment' : 'inline';
    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(file.byteLength),
        'Content-Disposition': `${disposition}; filename="${material.fileName}"`,
        ...PRIVATE_HEADERS,
      },
    });
  } catch {
    return errorResponse('material_unavailable', 503);
  }
}
