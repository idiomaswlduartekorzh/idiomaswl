import { hasDetailedExamResultsAccess } from '@/lib/exams/score-access.server';
import { scoreIeltsListeningRequest } from '@/lib/ielts/listening-score-request';

export async function POST(request: Request) {
  return scoreIeltsListeningRequest(request, await hasDetailedExamResultsAccess('ielts'));
}
