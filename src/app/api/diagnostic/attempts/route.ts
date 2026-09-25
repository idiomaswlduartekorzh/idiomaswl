import { handleDiagnosticAttemptStart } from '@/server/diagnostic/start.server';
import { handleDiagnosticDataDeletion } from '@/server/diagnostic/privacy.server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  return handleDiagnosticAttemptStart(request);
}

export async function DELETE(request: Request): Promise<Response> {
  return handleDiagnosticDataDeletion(request);
}
