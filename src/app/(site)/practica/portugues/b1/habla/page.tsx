import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'

export const metadata = speakingDilemmaHubMetadata('b1', 'portugues')

export default function Page() {
  return <SpeakingDilemmaHub level="b1" language="portugues" />
}
