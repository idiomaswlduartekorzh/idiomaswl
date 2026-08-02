import SkillNav from '@/components/practica/SkillNav'

/**
 * Envuelve todas las páginas de ingles B2 para que ninguna quede sin
 * enlaces salientes. Ver el comentario de SkillNav para el porqué.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SkillNav
        lang="ingles"
        level="b2"
        skills={['conectores', 'uso-del-idioma']}
        levels={['a1', 'a2', 'b1', 'b2']}
      />
    </>
  )
}
