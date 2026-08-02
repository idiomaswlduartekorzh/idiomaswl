import SkillNav from '@/components/practica/SkillNav'

/**
 * Envuelve todas las páginas de coreano A2 para que ninguna quede sin
 * enlaces salientes. Ver el comentario de SkillNav para el porqué.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SkillNav
        lang="coreano"
        level="a2"
        skills={['escritura', 'escucha', 'gramatica', 'habla', 'leccion-integrada', 'lectura', 'vocabulario']}
        levels={['a1', 'a2', 'b1']}
      />
    </>
  )
}
