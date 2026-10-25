import SkillNav from '@/components/practica/SkillNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<SkillNav lang="ingles" level="c2" skills={['gramatica']} levels={['a1', 'a2', 'b1', 'b2', 'c1', 'c2']} /></>
}
