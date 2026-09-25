import { handleDiagnosticStageSubmission } from '@/server/diagnostic/submit.server';
import { observeDiagnosticRoute } from '@/server/diagnostic/observability';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string; stageId: string }> },
): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts/[attemptId]/stages/[stageId]', method: 'POST' },
    async () => handleDiagnosticStageSubmission(request, await context.params),
  );
}
