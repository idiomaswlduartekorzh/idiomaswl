import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'

export const metadata = speakingDilemmaHubMetadata('b1', 'coreano')

export default function Page() {
  return <SpeakingDilemmaHub level="b1" language="coreano" />
}
