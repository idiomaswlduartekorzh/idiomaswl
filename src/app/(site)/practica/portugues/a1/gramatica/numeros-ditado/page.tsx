import type { Metadata } from 'next'
import PortugueseNumberDictation from '@/components/practica/PortugueseNumberDictation'

export const metadata: Metadata = {
  title: 'Números em português de 0 a 100.000: tabela, regras e ditado | A1',
  description: 'Aprenda os números em português com tabela de 0 a 99, regras para centenas e milhares, seis ditados de 20 números e materiais PDF para estudar.',
  alternates: { canonical: '/practica/portugues/a1/gramatica/numeros-ditado' },
}

export default function PortugueseNumberDictationPage() {
  return <PortugueseNumberDictation />
}

