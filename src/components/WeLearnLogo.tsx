'use client';

import { Pacifico } from 'next/font/google';

// Pacifico is visually close to the WeLearn brand script font
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Inline-SVG WeLearn logo mark (transparent background, dark-mode safe).
 * Uses Pacifico font loaded via next/font — works because inline SVG inherits
 * the document's CSS font stack, unlike <img src=".svg"> which is sandboxed.
 */
export function WeLearnLogo({ height = 38 }: { height?: number }) {
  // viewBox is 220×54: room for "WeLearn" in Pacifico at ~44px + swoosh
  const scale = height / 54;
  const width = Math.round(220 * scale);

  return (
    <span
      className={pacifico.className}
      style={{ display: 'inline-flex', lineHeight: 0, flexShrink: 0 }}
    >
      <svg
        viewBox="0 0 220 54"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="WeLearn"
        role="img"
      >
        {/* Script "WeLearn" — inherits Pacifico from the parent <span> */}
        <text
          x="2"
          y="40"
          fontSize="44"
          fill="#1a2ecc"
          style={{ fontFamily: 'inherit', fontStyle: 'italic' }}
        >
          WeLearn
        </text>

        {/* Red swoosh underline */}
        <path
          d="M2 48 Q110 60 218 44"
          stroke="#e8192c"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
