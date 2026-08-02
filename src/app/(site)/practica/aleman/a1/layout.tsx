import SkillNav from '@/components/practica/SkillNav'

/**
 * Envuelve todas las páginas de aleman A1 para que ninguna quede sin
 * enlaces salientes. Ver el comentario de SkillNav para el porqué.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SkillNav
        lang="aleman"
        level="a1"
        skills={['escritura', 'escucha', 'gramatica', 'habla', 'lectura', 'vocabulario']}
        levels={['a1', 'a2', 'b1']}
      />
    </>
  )
}
