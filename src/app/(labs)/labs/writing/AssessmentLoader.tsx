'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Leyendo tu texto…',
  'Analizando estructura…',
  'Revisando gramática…',
  'Evaluando vocabulario…',
  'Calculando banda…',
];

export function AssessmentLoader({ isVisible }: { isVisible: boolean }) {
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setMessageIdx((i) => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0a0e27] border border-white/20 rounded-xl p-8 max-w-sm">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" />
          </div>
          <div>
            <p className="text-white font-medium">{MESSAGES[messageIdx]}</p>
            <p className="text-white/40 text-sm mt-1">No cierre esta página</p>
          </div>
        </div>
      </div>
    </div>
  );
}
