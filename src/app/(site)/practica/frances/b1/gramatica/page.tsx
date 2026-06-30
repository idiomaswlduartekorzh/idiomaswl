import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
export const metadata: Metadata = practicaMetadata('frances', 'b1', 'gramatica')
export default function Page() { return <Content /> }
