'use client';

import Image from 'next/image';
import { IELTSProcessDiagramVisual } from './Task1VisualLab';

const PROCESS_VISUALS = [
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/01-process-bottle-recycling.png',
    alt: 'How plastic bottles are recycled. A five-stage original WeLearn process diagram showing collection, sorting, washing, melting and manufacturing.',
  },
];

export default function Task1ApprovedProcessVisual({ variant = 0 }: { variant?: number }) {
  const visual = PROCESS_VISUALS[variant];

  if (visual) {
    return (
      <Image
        src={visual.src}
        alt={visual.alt}
        width={2094}
        height={1074}
        sizes="(max-width: 768px) 100vw, 1080px"
        loading="eager"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
      />
    );
  }

  return <IELTSProcessDiagramVisual variant={variant} />;
}
