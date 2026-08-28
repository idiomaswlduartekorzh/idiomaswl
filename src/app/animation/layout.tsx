import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'WeLearn Korean — Animation',
  robots: { index: false, follow: false },
};

export default function AnimationLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: '#000', minHeight: '100dvh', overflow: 'hidden' }}>
      {children}
    </div>
  );
}
