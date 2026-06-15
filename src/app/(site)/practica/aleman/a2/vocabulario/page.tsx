import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'

export const metadata: Metadata = practicaMetadata('aleman', 'a2', 'vocabulario')

export default function Page() {
  return <Content />
}
