import Image from 'next/image';
import { task1Visual } from './task1-visual-bank';

export default function Task1ApprovedMapVisual({ variant = 0 }: { variant?: number }) {
  const map = task1Visual('map', variant);

  return (
    <Image
      src={map.src}
      alt={map.alt}
      width={map.width}
      height={map.height}
      sizes="(max-width: 768px) 100vw, 1080px"
      loading="lazy"
      style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 6 }}
    />
  );
}
