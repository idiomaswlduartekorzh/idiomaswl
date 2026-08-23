import type { RoleplayBlock } from '@/data/practica/habla-acompanado'
import s from './roleplay.module.css'

/**
 * El formato en línea de las fichas: `**negrita**`, `*cursiva*` y `` `código` ``.
 *
 * Las fichas vienen de ocho archivos de markdown escritos a mano y usan esas tres marcas
 * y nada más —no hay enlaces, ni imágenes, ni encabezados dentro de una celda—. Meter un
 * parser de markdown entero para tres marcas sería pagar un peso de cliente por nada, así
 * que se resuelven aquí, en el servidor, con una sola pasada.
 *
 * `code` es la que importa: es lo que envuelve las formas decibles de la tabla de
 * exponentes (`Can I ask you a …?`) y lo que las separa a la vista del texto que las
 * explica. Si se pierde, el estudiante deja de distinguir lo que se dice de lo que se lee.
 */
const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g

export function inline(text: string): React.ReactNode {
  const parts = text.split(INLINE)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className={s.code}>{part.slice(1, -1)}</code>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return <span key={i}>{part}</span>
  })
}

/**
 * Un bloque de ficha. Las tablas de dos columnas se pintan como pares etiqueta/valor
 * —que es lo que son: datos duros en nota— y las de tres, con su cabecera.
 */
export function Block({ block }: { block: RoleplayBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className={s.para}>{inline(block.text)}</p>
    case 'ul':
      return (
        <ul className={s.list}>
          {block.items.map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ul>
      )
    case 'ol':
      return (
        <ol className={s.listOrdered}>
          {block.items.map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ol>
      )
    case 'quote':
      return (
        <blockquote className={s.quote}>
          <Blocks blocks={block.blocks} />
        </blockquote>
      )
    case 'table':
      return (
        <div className={s.tableWrap}>
          <table className={s.table}>
            {block.head ? (
              <thead>
                <tr>{block.head.map((cell, i) => <th key={i}>{inline(cell)}</th>)}</tr>
              </thead>
            ) : null}
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 && !block.head ? s.tableLabel : undefined}>
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function Blocks({ blocks }: { blocks: RoleplayBlock[] }) {
  return <>{blocks.map((block, i) => <Block key={i} block={block} />)}</>
}
