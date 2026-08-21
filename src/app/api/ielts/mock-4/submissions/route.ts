import { handleIeltsSubmissionRequest } from '@/lib/ielts/submission.server';

export const runtime = 'nodejs';

/** Backward-compatible alias for receipts opened before the generic rollout. */
export async function POST(request: Request): Promise<Response> {
  return handleIeltsSubmissionRequest(request, 'set-4');
}
