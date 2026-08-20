import '@/styles/practica-ui.css'

/**
 * Carga el sistema visual compartido de práctica para toda la sección.
 *
 * Va aquí y no en `globals.css` por dos razones. La primera es la convención que ya sigue
 * `grammar.css`, que se importa desde el layout del tramo que lo necesita. La segunda es
 * que home conserva a propósito el sistema visual antiguo —lo dice `globals.css` en la
 * cabecera de los tokens—, y no tiene sentido enviarle una hoja que no va a usar.
 *
 * El layout no envuelve nada ni añade marcado: si algún día pinta, deja de ser un punto de
 * carga y pasa a ser una decisión de diseño que hay que discutir. Ver
 * `docs/sistema-visual-practica.md`.
 */
export default function PracticaLayout({ children }: { children: React.ReactNode }) {
  return children
}
