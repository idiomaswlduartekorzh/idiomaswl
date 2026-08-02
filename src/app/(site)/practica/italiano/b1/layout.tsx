import SkillNav from '@/components/practica/SkillNav'

/**
 * Envuelve todas las páginas de italiano B1 para que ninguna quede sin
 * enlaces salientes. Ver el comentario de SkillNav para el porqué.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SkillNav
        lang="italiano"
        level="b1"
        skills={['escritura', 'escucha', 'gramatica', 'habla', 'lectura', 'particelle', 'vocabulario']}
        levels={['a1', 'a2', 'b1', 'b2']}
      />
    </>
  )
}
