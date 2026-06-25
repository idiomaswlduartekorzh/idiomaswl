import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'

export const metadata: Metadata = practicaMetadata('aleman', 'b1', 'lectura')

export default function Page() {
  return <Content />
}
