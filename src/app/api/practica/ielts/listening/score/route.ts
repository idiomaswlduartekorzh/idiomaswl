import { getIeltsListeningScorer } from '@/data/ielts/listening-practice-registry.server';
import { createIeltsListeningScoreResponse } from '@/lib/ielts/listening-score-route-contract';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return createIeltsListeningScoreResponse(request, getIeltsListeningScorer);
}
