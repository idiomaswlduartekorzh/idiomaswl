#!/usr/bin/env node

/**
 * 🔥 PANIC KILL — Mata TODO inmediatamente
 * Uso: npm run panic
 * O: node scripts/panic-kill.js
 *
 * ⚠️ USO EMERGENCIA SOLO si el PC está muriendo
 */

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

const execAsync = promisify(exec)

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
}

function log(color, msg) {
  console.log(`${COLORS[color]}${msg}${COLORS.reset}`)
}

async function panicKill() {
  log('red', '\n🔥 PANIC KILL — Matando TODOS los procesos Node\n')

  try {
    // 1. Matar Node/npm
    log('yellow', '1. Matando procesos Node...')
    if (process.platform === 'win32') {
      await execAsync('taskkill /F /IM node.exe 2>nul || true && taskkill /F /IM npm.exe 2>nul || true')
    } else {
      await execAsync('pkill -9 -f "node|npm|webpack|turbopack" 2>/dev/null || true')
    }
    log('green', '   ✓ Node muerto\n')

    // 2. Limpiar puertos
    log('yellow', '2. Limpiando puertos...')
    if (process.platform !== 'win32') {
      await execAsync('lsof -i :3000 :3001 :3002 :3010 :3011 2>/dev/null | grep LISTEN | awk "{print $2}" | xargs kill -9 2>/dev/null || true')
    }
    log('green', '   ✓ Puertos limpios\n')

    // 3. Borrar .next
    log('yellow', '3. Borrando .next...')
    const nextDir = path.join(__dirname, '..', '.next')
    if (fs.existsSync(nextDir)) {
      fs.rmSync(nextDir, { recursive: true, force: true })
      log('green', '   ✓ .next borrado\n')
    } else {
      log('green', '   ✓ No existe (ya limpio)\n')
    }

    // 4. Limpiar cache
    log('yellow', '4. Limpiando cache...')
    const cacheDir = path.join(__dirname, '..', '.turbo')
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true })
    }
    const webpackCache = path.join(__dirname, '..', 'node_modules', '.cache')
    if (fs.existsSync(webpackCache)) {
      fs.rmSync(webpackCache, { recursive: true, force: true })
    }
    log('green', '   ✓ Cache limpio\n')

    // 5. Status final
    log('green', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    log('green', '✓ PANIC KILL COMPLETADO')
    log('green', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    log('yellow', 'Próximos pasos:')
    log('green', '  1. Espera 5 segundos (que el sistema respire)')
    log('green', '  2. Abre nueva terminal')
    log('green', '  3. npm run dev:safe\n')

  } catch (err) {
    log('red', `❌ Error: ${err.message}\n`)
    process.exit(1)
  }
}

panicKill()
