import { handleDiagnosticObjectiveStageSubmission } from '@/server/diagnostic/submit.server';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string; stageId: string }> },
): Promise<Response> {
  return handleDiagnosticObjectiveStageSubmission(request, await context.params);
}
