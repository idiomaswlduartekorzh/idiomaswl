import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(repoRoot, 'config', 'production-baseline.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const failures = []

const absolute = (relativePath) => path.join(repoRoot, relativePath)
const exists = (relativePath) => fs.existsSync(absolute(relativePath))

function expectFile(relativePath) {
  if (!exists(relativePath)) failures.push(`Falta el archivo protegido: ${relativePath}`)
}

function expectMarkers(relativePath, markers) {
  if (!exists(relativePath)) return
  const source = fs.readFileSync(absolute(relativePath), 'utf8')
  for (const marker of markers) {
    if (!source.includes(marker)) failures.push(`${relativePath} perdió el marcador protegido: ${marker}`)
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

function countPattern(pattern) {
  const [directory, filePattern] = pattern.split(':')
  const files = walk(absolute(directory))
  if (filePattern === '**/*') return files.length
  if (filePattern === '**/*.ts') return files.filter((file) => file.endsWith('.ts')).length
  if (filePattern === '**/page.tsx') return files.filter((file) => file.endsWith(`${path.sep}page.tsx`)).length
  failures.push(`Patrón de baseline no soportado: ${pattern}`)
  return 0
}

function compareSet(current, previous, label) {
  for (const item of previous) {
    if (!current.includes(item)) failures.push(`${label} no puede retirar el valor protegido: ${item}`)
  }
}

function compareManifest(previous, gitRef) {
  compareSet(manifest.languages, previous.languages, 'languages')
  compareSet(manifest.levels, previous.levels, 'levels')
  compareSet(manifest.practiceModalities, previous.practiceModalities, 'practiceModalities')
  compareSet(manifest.protectedFiles, previous.protectedFiles, 'protectedFiles')
  compareSet(manifest.requiredNpmScripts, previous.requiredNpmScripts, 'requiredNpmScripts')
  compareSet(manifest.requiredPrebuildChecks, previous.requiredPrebuildChecks, 'requiredPrebuildChecks')

  const currentSmokePaths = manifest.smokeRoutes.map((route) => route.path)
  const previousSmokePaths = previous.smokeRoutes.map((route) => route.path)
  compareSet(currentSmokePaths, previousSmokePaths, 'smokeRoutes')
  const currentSmokeRoutes = new Map(manifest.smokeRoutes.map((route) => [route.path, route.marker]))
  for (const route of previous.smokeRoutes) {
    if (currentSmokeRoutes.get(route.path) !== route.marker) {
      failures.push(`smokeRoutes no puede cambiar el marcador de ${route.path}: ${route.marker}`)
    }
  }

  if (previous.smokeAssets) {
    const currentAssets = new Map((manifest.smokeAssets ?? []).map((asset) => [asset.path, asset]))
    compareSet([...currentAssets.keys()], previous.smokeAssets.map((asset) => asset.path), 'smokeAssets')
    for (const asset of previous.smokeAssets) {
      const current = currentAssets.get(asset.path)
      if (!current) continue
      if (current.contentType !== asset.contentType) {
        failures.push(`smokeAssets no puede cambiar contentType de ${asset.path}: ${asset.contentType}`)
      }
      if (current.minimumBytes < asset.minimumBytes) {
        failures.push(`smokeAssets no puede bajar minimumBytes de ${asset.path}: ${asset.minimumBytes} → ${current.minimumBytes}`)
      }
    }
  }

  for (const [pattern, previousMinimum] of Object.entries(previous.minimumFileCounts)) {
    const currentMinimum = manifest.minimumFileCounts[pattern]
    if (!Number.isInteger(currentMinimum) || currentMinimum < previousMinimum) {
      failures.push(`minimumFileCounts no puede bajar ${pattern}: ${previousMinimum} → ${currentMinimum ?? 'eliminado'}`)
    }
  }

  if (manifest.listening.episodesPerLanguageLevel < previous.listening.episodesPerLanguageLevel) {
    failures.push('listening.episodesPerLanguageLevel no puede bajar')
  }

  for (const [relativePath, markers] of Object.entries(previous.protectedMarkers)) {
    if (!manifest.protectedMarkers[relativePath]) {
      failures.push(`protectedMarkers no puede retirar el archivo: ${relativePath}`)
      continue
    }
    compareSet(manifest.protectedMarkers[relativePath], markers, `protectedMarkers[${relativePath}]`)
  }

  if (!failures.length) console.log(`✓ El manifiesto no reduce la línea base de ${gitRef}.`)
}

for (const language of manifest.languages) {
  expectFile(`src/app/(site)/practica/${language}/page.tsx`)
  for (const level of manifest.levels) {
    expectFile(`src/app/(site)/practica/${language}/${level}/page.tsx`)
    for (const modality of manifest.practiceModalities) {
      expectFile(`src/app/(site)/practica/${language}/${level}/${modality}/page.tsx`)
    }
    for (let episode = 1; episode <= manifest.listening.episodesPerLanguageLevel; episode += 1) {
      const relativePath = manifest.listening.fileTemplate
        .replace('{language}', language)
        .replace('{level}', level)
        .replace('{episode}', String(episode).padStart(2, '0'))
      expectFile(relativePath)
    }
  }
}

for (const language of manifest.classLandingLanguages ?? []) {
  expectFile(`src/app/(site)/clases-de-${language}/page.tsx`)
}

for (const relativePath of manifest.protectedFiles) expectFile(relativePath)
for (const [relativePath, markers] of Object.entries(manifest.protectedMarkers)) expectMarkers(relativePath, markers)

const smokeRoutePaths = manifest.smokeRoutes.map((route) => route.path)
if (new Set(smokeRoutePaths).size !== smokeRoutePaths.length) failures.push('smokeRoutes contiene rutas duplicadas')

for (const asset of manifest.smokeAssets ?? []) {
  const publicPath = `public${asset.path.split('?')[0]}`
  expectFile(publicPath)
  if (exists(publicPath)) {
    const bytes = fs.statSync(absolute(publicPath)).size
    if (bytes < asset.minimumBytes) {
      failures.push(`${publicPath} pesa ${bytes} bytes; el mínimo protegido es ${asset.minimumBytes}`)
    }
  }
}

for (const [pattern, minimum] of Object.entries(manifest.minimumFileCounts)) {
  const count = countPattern(pattern)
  if (count < minimum) failures.push(`${pattern} tiene ${count} archivos; el mínimo de producción es ${minimum}`)
}

const packageJson = JSON.parse(fs.readFileSync(absolute('package.json'), 'utf8'))
for (const script of manifest.requiredNpmScripts) {
  if (!packageJson.scripts?.[script]) failures.push(`package.json perdió el script protegido: ${script}`)
}
for (const script of manifest.requiredPrebuildChecks) {
  if (!packageJson.scripts?.prebuild?.includes(`npm run ${script}`)) {
    failures.push(`prebuild dejó de ejecutar el guardián protegido: ${script}`)
  }
}

const compareArg = process.argv.find((argument) => argument.startsWith('--compare-git-ref='))
if (compareArg) {
  const gitRef = compareArg.slice('--compare-git-ref='.length)
  try {
    const previousSource = execFileSync('git', ['show', `${gitRef}:config/production-baseline.json`], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    compareManifest(JSON.parse(previousSource), gitRef)
  } catch (error) {
    const stderr = error?.stderr?.toString() ?? ''
    if (stderr.includes('does not exist in') || stderr.includes('exists on disk, but not in')) {
      console.log(`ℹ ${gitRef} todavía no contiene una línea base; se valida solo el manifiesto actual.`)
    } else {
      failures.push(`No se pudo comparar la línea base con ${gitRef}: ${stderr || error.message}`)
    }
  }
}

if (failures.length) {
  console.error('La línea base de producción falló:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const matrixRoutes = manifest.languages.length * manifest.levels.length * manifest.practiceModalities.length
  const listeningFiles = manifest.languages.length * manifest.levels.length * manifest.listening.episodesPerLanguageLevel
  console.log(`Línea base íntegra: ${matrixRoutes} rutas base de Práctica, ${listeningFiles} audios de Escucha y ${(manifest.smokeAssets ?? []).length} activos de podcast protegidos.`)
}
