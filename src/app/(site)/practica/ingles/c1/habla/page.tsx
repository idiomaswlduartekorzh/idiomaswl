import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'

export const metadata = speakingDilemmaHubMetadata('c1')

export default function Page() {
  return <SpeakingDilemmaHub level="c1" />
}
