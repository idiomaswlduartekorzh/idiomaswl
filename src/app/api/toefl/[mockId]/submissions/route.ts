import { handleToeflSubmissionRequest } from '@/lib/toefl/submission.server';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  context: { params: Promise<{ mockId: string }> },
): Promise<Response> {
  const { mockId } = await context.params;
  return handleToeflSubmissionRequest(request, mockId);
}
