import '@/styles/practica-ui.css'

/**
 * Carga el sistema visual compartido para la sección de herramientas.
 *
 * Mismo criterio que `/practica`: la hoja se importa desde el layout del tramo que la
 * necesita, no desde `globals.css`, para que home conserve su sistema visual antiguo.
 * Ver `docs/sistema-visual-practica.md`.
 *
 * El layout no envuelve nada ni añade marcado. Si algún día pinta, deja de ser un punto
 * de carga y pasa a ser una decisión de diseño que hay que discutir.
 */
export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
  return children
}
