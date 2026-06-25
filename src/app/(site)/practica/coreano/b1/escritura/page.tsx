import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
export const metadata: Metadata = practicaMetadata('coreano', 'b1', 'escritura')
export default function Page() { return <Content /> }
