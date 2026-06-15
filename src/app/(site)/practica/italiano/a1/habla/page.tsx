import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'

export const metadata: Metadata = practicaMetadata('italiano', 'a1', 'habla')

export default function Page() {
  return <Content />
}
