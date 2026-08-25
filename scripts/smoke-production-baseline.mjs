import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'config', 'production-baseline.json'), 'utf8'))
const baseUrl = (process.env.PRODUCTION_URL ?? 'https://www.idiomaswl.com').replace(/\/$/u, '')
const failures = []

async function fetchWithRetry(url, attempts = 3) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'idiomaswl-production-smoke/1.0' },
        signal: AbortSignal.timeout(20_000),
      })
    } catch (error) {
      lastError = error
      if (attempt < attempts) console.warn(`↻ ${url}: reintento ${attempt + 1}/${attempts}`)
    }
  }
  throw lastError
}

for (const route of manifest.smokeRoutes) {
  const url = `${baseUrl}${route.path}`
  try {
    const response = await fetchWithRetry(url)
    const body = await response.text()
    if (!response.ok) failures.push(`${route.path}: HTTP ${response.status}`)
    else if (!body.toLocaleLowerCase('es').includes(route.marker.toLocaleLowerCase('es'))) {
      failures.push(`${route.path}: no contiene el marcador «${route.marker}»`)
    } else console.log(`✓ ${route.path}: HTTP ${response.status}`)
  } catch (error) {
    failures.push(`${route.path}: ${error.message}`)
  }
}

if (failures.length) {
  console.error(`Smoke fallido contra ${baseUrl}:`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Smoke de producción íntegro: ${manifest.smokeRoutes.length} rutas verificadas contra ${baseUrl}.`)
}
