import Image from 'next/image';
import { task1Visual } from './task1-visual-bank';

export default function Task1ApprovedProcessVisual({ variant = 0 }: { variant?: number }) {
  const visual = task1Visual('process', variant);

  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      sizes="(max-width: 768px) 100vw, 1080px"
      loading="lazy"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
    />
  );
}
