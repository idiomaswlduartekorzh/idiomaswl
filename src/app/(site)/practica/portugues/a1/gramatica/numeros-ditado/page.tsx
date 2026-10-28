import type { Metadata } from 'next'
import PortugueseNumberDictation from '@/components/practica/PortugueseNumberDictation'

export const metadata: Metadata = {
  title: 'Ditado de números em português: 0 a 100.000 | Prática A1',
  description: 'Ouça um ditado de 20 números em português brasileiro, complete a ficha em algarismos ou por extenso e verifique todas as respostas no final.',
  alternates: { canonical: '/practica/portugues/a1/gramatica/numeros-ditado' },
}

export default function PortugueseNumberDictationPage() {
  return <PortugueseNumberDictation />
}

