import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'

export const metadata = speakingDilemmaHubMetadata('a1', 'aleman')

export default function Page() {
  return <SpeakingDilemmaHub level="a1" language="aleman" />
}
