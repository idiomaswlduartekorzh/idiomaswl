import SkillNav from '@/components/practica/SkillNav'

/**
 * Envuelve todas las páginas de portugues B1 para que ninguna quede sin
 * enlaces salientes. Ver el comentario de SkillNav para el porqué.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SkillNav
        lang="portugues"
        level="b1"
        skills={['escritura', 'escucha', 'gramatica', 'habla', 'lectura', 'vocabulario']}
        levels={['a1', 'a2', 'b1']}
      />
    </>
  )
}
