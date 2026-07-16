import { WritingLabClient } from './WritingLabClient';

export default function WritingLabPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Evaluador de IELTS Writing</h1>
      <p className="mt-2 text-sm text-white/50">
        Motor: Gemini Flash (free tier · 1.500/día) + rúbrica WeLearn.
        Costo por evaluación: $0.
      </p>
      <div className="mt-8">
        <WritingLabClient />
      </div>
    </div>
  );
}
