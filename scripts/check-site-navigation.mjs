import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
const failures = []

const siteNav = read('src/components/SiteNav.tsx')
const toolsPage = read('src/app/(site)/herramientas/page.tsx')
const podcastPage = read('src/app/(site)/podcasts/page.tsx')

const expect = (condition, message) => {
  if (!condition) failures.push(message)
}

expect(
  !siteNav.includes("href: '/podcasts'"),
  'Podcasts no debe aparecer como enlace independiente en la navegación principal.',
)
expect(
  siteNav.includes("{ label: 'Herramientas',   href: '/herramientas' }") &&
    siteNav.includes("{ label: 'Tools',      href: '/herramientas' }"),
  'La navegación principal debe conservar Herramientas/Tools en sus dos variantes.',
)
expect(
  toolsPage.includes("slug: 'podcasts-examenes'") && toolsPage.includes("href: '/podcasts'"),
  'La biblioteca de podcasts debe vivir como tarjeta dentro de Herramientas.',
)
expect(
  podcastPage.includes("alternates: { canonical: 'https://www.idiomaswl.com/podcasts' }"),
  'La ruta pública de podcasts debe conservar su canonical para no romper el SEO.',
)

if (failures.length) {
  console.error('El contrato de navegación falló:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('Navegación íntegra: Podcasts vive en Herramientas y conserva su ruta pública.')
}
