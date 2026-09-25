import { handleDiagnosticAttemptStart } from '@/server/diagnostic/start.server';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  return handleDiagnosticAttemptStart(request);
}

