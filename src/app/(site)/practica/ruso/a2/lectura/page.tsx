import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'

export const metadata: Metadata = practicaMetadata('ruso', 'a2', 'lectura')

export default function Page() {
  return <Content />
}
