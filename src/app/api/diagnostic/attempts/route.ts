import { handleDiagnosticAttemptStart } from '@/server/diagnostic/start.server';
import { handleDiagnosticDataDeletion } from '@/server/diagnostic/privacy.server';
import { observeDiagnosticRoute } from '@/server/diagnostic/observability';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts', method: 'POST' },
    () => handleDiagnosticAttemptStart(request),
  );
}

export async function DELETE(request: Request): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts', method: 'DELETE' },
    () => handleDiagnosticDataDeletion(request),
  );
}
