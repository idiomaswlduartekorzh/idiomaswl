import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
const failures = []

const siteNav = read('src/components/SiteNav.tsx')
const toolsPage = read('src/app/(site)/herramientas/page.tsx')
const podcastPage = read('src/app/(site)/podcasts/page.tsx')
const vocabularyPage = read('src/app/(site)/herramientas/vocabulario/page.tsx')
const englishVocabularyPage = read('src/app/(site)/herramientas/vocabulario/ingles/page.tsx')
const siteLayout = read('src/app/(site)/layout.tsx')
const englishPracticeLayout = read('src/app/(site)/en/practice/layout.tsx')
const advancedLevelHub = read('src/components/practica/AdvancedLevelSkillHub.tsx')
const advancedEnglishHub = read('src/components/grammar/AdvancedEnglishLevelHub.tsx')
const skillNav = read('src/components/practica/SkillNav.tsx')

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
  siteNav.includes("{ label: 'Kids',           href: '/kids' }") &&
    siteNav.includes("{ label: 'Kids',       href: '/kids' }"),
  'La navegación principal debe conservar la entrada Kids en sus dos variantes.',
)
expect(
  toolsPage.includes("slug: 'podcasts-examenes'") && toolsPage.includes("href: '/podcasts'"),
  'La biblioteca de podcasts debe vivir como tarjeta dentro de Herramientas.',
)
expect(
  toolsPage.includes("slug: 'vocabulario'") && toolsPage.includes("href: '/herramientas/vocabulario'"),
  'Vocabulario debe vivir como tarjeta dentro de Herramientas.',
)
expect(
  vocabularyPage.includes('VOCABULARY_LANGUAGES.map') &&
    englishVocabularyPage.includes('PHRASAL_VERBS_BASE_PATH'),
  'El recorrido Herramientas → Vocabulario → Inglés → Phrasal verbs debe conservarse.',
)
expect(
  podcastPage.includes("alternates: { canonical: 'https://www.idiomaswl.com/podcasts' }"),
  'La ruta pública de podcasts debe conservar su canonical para no romper el SEO.',
)

// Reading must live under the public site shell. A route outside (site) loses
// the main navigation, skip link and practice design tokens without a build error.
const readingRoute = 'en/practice/[language]/[level]/reading'
expect(
  ['page.tsx', '[slug]/page.tsx'].every((file) =>
    fs.existsSync(path.join(repoRoot, 'src/app/(site)', readingRoute, file))) &&
    !fs.existsSync(path.join(repoRoot, 'src/app/en')),
  'Los catálogos y las lecciones de Reading deben vivir bajo (site), no fuera del layout público.',
)
expect(
  siteLayout.includes('<SiteNav />') && siteLayout.includes('<SiteSkipLink />') &&
    siteLayout.includes('<main id="main"') &&
    englishPracticeLayout.includes("@/styles/practica-ui.css") &&
    siteNav.includes("pathname.startsWith('/en/practice/')"),
  'Reading en inglés debe conservar el menú principal, el enlace de salto y los tokens de Práctica.',
)

// All advanced level landing pages use the same skill-card system as A1.
const advancedLanguages = ['German', 'French', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean']
const advancedLanguagePaths = ['aleman', 'frances', 'italiano', 'portugues', 'ruso', 'japones', 'coreano']
for (const language of advancedLanguages) {
  expect(
    read(`src/components/practica/${language}AdvancedLevelHub.tsx`).includes('<AdvancedLevelSkillHub'),
    `${language} B2–C2 debe usar el hub visual compartido de Práctica.`,
  )
}
for (const language of advancedLanguagePaths) {
  for (const level of ['b2', 'c1', 'c2']) {
    const page = read(`src/app/(site)/practica/${language}/${level}/page.tsx`)
    expect(
      language === 'italiano' && level === 'b2'
        ? page.includes('<SkillHub')
        : page.includes(`advancedLevelMetadata('${language}', '${level}')`),
      `${language}/${level} debe usar las tarjetas y metadatos del hub de nivel compartido.`,
    )
  }
}
expect(
  advancedLevelHub.includes('<SkillHub') &&
    ['lectura', 'gramatica', 'escritura', 'habla'].every((skill) => advancedLevelHub.includes(`id: '${skill}'`)) &&
    advancedEnglishHub.includes('<SkillHub') && advancedEnglishHub.includes("id: 'lectura'") &&
    skillNav.includes('pathname === `/practica/${lang}/${level}`'),
  'Los hubs avanzados deben mostrar las cuatro destrezas publicadas sin duplicarlas al pie.',
)

if (failures.length) {
  console.error('El contrato de navegación falló:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('Navegación íntegra: shell de Reading, 21 hubs avanzados y rutas públicas verificados.')
}
