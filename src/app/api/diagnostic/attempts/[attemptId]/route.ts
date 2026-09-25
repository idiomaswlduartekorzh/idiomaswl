import { handleDiagnosticAttemptResume } from '@/server/diagnostic/resume.server';
import { observeDiagnosticRoute } from '@/server/diagnostic/observability';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts/[attemptId]', method: 'GET' },
    async () => {
      const { attemptId } = await context.params;
      return handleDiagnosticAttemptResume(attemptId);
    },
  );
}
