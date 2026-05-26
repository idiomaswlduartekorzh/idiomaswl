import type { ReactNode } from 'react';

export const metadata = { title: 'WeLearn Korean — Animation' };

export default function AnimationLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: '#000', minHeight: '100dvh', overflow: 'hidden' }}>
      {children}
    </div>
  );
}
