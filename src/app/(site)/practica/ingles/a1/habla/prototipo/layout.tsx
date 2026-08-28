import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speaking A1 classroom prototype | Idiomas WeLearn',
  description: 'Preliminary classroom prototype for a two-learner English A1 speaking practice.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
