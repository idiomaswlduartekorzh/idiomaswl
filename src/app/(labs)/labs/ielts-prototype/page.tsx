import { WRITING_ENGINE } from '@/lib/labs/config';
import { IELTSPrototypeClient } from './IELTSPrototypeClient';

export const metadata = {
  title: 'IELTS Writing Evaluator Prototype',
  robots: { index: false },
};

const ENGINE_LABEL = {
  gemini:    'Gemini Flash (free tier)',
  anthropic: 'Claude Opus',
} as const;

export default function IELTSPrototypePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Prototipo: Evaluador IELTS Writing</h1>
      <p className="text-sm text-white/50 mb-8">
        Vista previa de cómo se vería integrado en /examenes/ielts con Task 1 + Task 2.
        Motor: {ENGINE_LABEL[WRITING_ENGINE]}, con una petición por tarea.
      </p>

      <IELTSPrototypeClient />
    </div>
  );
}
