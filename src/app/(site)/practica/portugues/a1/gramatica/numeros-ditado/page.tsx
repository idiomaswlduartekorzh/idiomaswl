import type { Metadata } from 'next'
import PortugueseNumberDictation from '@/components/practica/PortugueseNumberDictation'

export const metadata: Metadata = {
  title: 'Ditado de números em português: 0 a 100.000 | Prática A1',
  description: 'Ouça números em português brasileiro, escreva-os em algarismos e avance por seis séries progressivas de 0 a 100.000.',
  alternates: { canonical: '/practica/portugues/a1/gramatica/numeros-ditado' },
}

export default function PortugueseNumberDictationPage() {
  return <PortugueseNumberDictation />
}

