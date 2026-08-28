import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LiveQuizClient from './LiveQuizClient'
import coreano1 from '@/data/live-sets/coreano-1'
import type { LiveSet } from '@/data/live-sets/types'

const SETS: Record<string, LiveSet> = {
  'coreano-1': coreano1,
}

export const metadata: Metadata = {
  title: 'Sesión de práctica en vivo',
  robots: { index: false, follow: false },
}

export async function generateStaticParams() {
  return Object.keys(SETS).map(id => ({ setId: id }))
}

export default async function LiveQuizPage({
  params,
}: {
  params: Promise<{ setId: string }>
}) {
  const { setId } = await params
  const set = SETS[setId]
  if (!set) notFound()
  return <LiveQuizClient set={set} />
}
