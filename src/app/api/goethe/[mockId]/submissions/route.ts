import { handleGoetheResultRequest, handleGoetheSubmissionRequest } from '@/lib/goethe/submission.server'

export const runtime = 'nodejs'

export async function POST(request: Request, context: { params: Promise<{ mockId: string }> }): Promise<Response> {
  const { mockId } = await context.params
  return handleGoetheSubmissionRequest(request, mockId)
}

export async function GET(request: Request, context: { params: Promise<{ mockId: string }> }): Promise<Response> {
  const { mockId } = await context.params
  return handleGoetheResultRequest(request, mockId)
}
