import { handleDiagnosticAttemptResume } from '@/server/diagnostic/resume.server';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  const { attemptId } = await context.params;
  return handleDiagnosticAttemptResume(attemptId);
}
