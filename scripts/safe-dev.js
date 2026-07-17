#!/usr/bin/env node

/**
 * 🔒 SAFE DEV — Ejecuta Next.js sin que el PC muera
 * Uso: node scripts/safe-dev.js
 * O agregá a package.json: "dev:safe": "node scripts/safe-dev.js"
 */

const { spawn, exec, execSync } = require('child_process')
const path = require('path')
const os = require('os')
const fs = require('fs')

/**
 * os.freemem() en macOS solo cuenta páginas "free" puras — NO cuenta
 * "inactive" (caché reclamable al instante) ni "speculative". macOS usa RAM
 * libre para cachear archivos agresivamente, así que "free" real suele ser
 * un número artificialmente bajo (100-200 MB) incluso con >1 GB realmente
 * disponible. Esto hacía que el monitor matara Next casi apenas arrancaba.
 * `vm_stat` reporta lo mismo que ve Activity Monitor como "disponible".
 */
function getAvailableMemMB() {
  if (process.platform !== 'darwin') return os.freemem() / 1048576

  try {
    const out = execSync('vm_stat').toString()
    const pageSizeMatch = out.match(/page size of (\d+) bytes/)
    const pageSize = pageSizeMatch ? parseInt(pageSizeMatch[1], 10) : 4096

    const pagesOf = (label) => {
      const m = out.match(new RegExp(`${label}:\\s+(\\d+)\\.`))
      return m ? parseInt(m[1], 10) : 0
    }

    const free = pagesOf('Pages free')
    const inactive = pagesOf('Pages inactive')
    const speculative = pagesOf('Pages speculative')

    return ((free + inactive + speculative) * pageSize) / 1048576
  } catch {
    // Si vm_stat falla por lo que sea, no bloquear el monitoreo — usar el
    // valor crudo de Node como último recurso.
    return os.freemem() / 1048576
  }
}

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(color, ...args) {
  console.log(`${COLORS[color]}${args.join(' ')}${COLORS.reset}`)
}

async function getDirectorySize(dirPath) {
  try {
    const { exec } = require('child_process')
    const { promisify } = require('util')
    const execAsync = promisify(exec)

    const command = process.platform === 'win32'
      ? `powershell -Command "Get-Item -Path '${dirPath}' -Force | ForEach-Object { ([math]::Round((Get-ChildItem $_.FullName -Recurse -Force | Measure-Object -Property Length -Sum).Sum / 1GB, 2)) }"`
      : `du -sh ${dirPath} | cut -f1`

    const { stdout } = await execAsync(command)
    return stdout.trim()
  } catch {
    return 'unknown'
  }
}

function killNodeProcesses() {
  const command = process.platform === 'win32'
    ? 'taskkill /F /IM node.exe 2>nul || taskkill /F /IM npm.exe 2>nul || true'
    : 'pkill -9 -f "node|npm" 2>/dev/null || true'

  exec(command, (err) => {
    if (!err) {
      log('green', '✓ Procesos Node eliminados')
    }
  })
}

function cleanPorts() {
  const ports = [3000, 3001, 3002, 3010, 3011]
  const command = process.platform === 'win32'
    ? ports.map(p => `netstat -ano | find ":${p}" && taskkill /PID $(netstat -ano | find ":${p}" | awk '{print $NF}') /F 2>nul`).join(' || ')
    : `lsof -i :${ports.join(',')} 2>/dev/null | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true`

  exec(command, (err) => {
    if (!err) {
      log('green', '✓ Puertos limpios')
    }
  })
}

async function monitorAndRun() {
  log('green', '\n🔒 SAFE DEV MONITOR')
  log('blue', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  // 1. Limpiar
  log('yellow', '\n1. Limpiando procesos previos...')
  killNodeProcesses()
  await new Promise(r => setTimeout(r, 1500))

  // 2. Verificar .next
  log('yellow', '2. Verificando .next...')
  const nextDir = path.join(__dirname, '..', '.next')
  if (fs.existsSync(nextDir)) {
    const size = await getDirectorySize(nextDir)
    log('blue', `   Tamaño: ${size}`)
    if (size.includes('G')) {
      log('red', '   ⚠️  .next demasiado grande, limpiando...')
      fs.rmSync(nextDir, { recursive: true, force: true })
      log('green', '   ✓ Limpiado')
    }
  }

  // 3. Iniciar Next.js
  log('yellow', '\n3. Iniciando Next.js con monitoreo...')
  log('green', '   Puerto: http://localhost:3010')
  log('blue', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // Techo de heap para Next: en 8GB de RAM evita que se coma toda la memoria
  // y congele el macOS. Turbopack (default en Next 16) usa memoria nativa aparte,
  // pero este cap protege el lado JS del dev server.
  const nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=3072' },
  })

  // Monitoreo REAL: vigila la memoria LIBRE del sistema (no la de este script).
  // Si la RAM libre cae por debajo del umbral crítico, mata Next antes de que
  // el PC entre en swap masivo y se congele.
  const totalMemGB = os.totalmem() / 1073741824
  const WARN_FREE_MB = 900   // avisar
  const KILL_FREE_MB = 400   // matar para salvar el PC
  const interval = setInterval(() => {
    const freeMB = getAvailableMemMB()
    if (freeMB < KILL_FREE_MB) {
      log('red', `\n🔥 RAM LIBRE CRÍTICA: ${freeMB.toFixed(0)} MB — matando Next para salvar el PC`)
      nextProcess.kill('SIGKILL')
      clearInterval(interval)
      log('yellow', '💡 Reiniciá con: npm run dev:safe (y cerrá tabs/apps pesadas)')
      process.exit(1)
    } else if (freeMB < WARN_FREE_MB) {
      log('red', `\n⚠️  RAM LIBRE BAJA: ${freeMB.toFixed(0)} MB de ${totalMemGB.toFixed(0)} GB`)
      log('yellow', '💡 Cerrá tabs del browser o apps pesadas antes de que se congele')
    }
  }, 5000)

  nextProcess.on('exit', () => {
    clearInterval(interval)
    process.exit(0)
  })

  process.on('SIGINT', () => {
    log('yellow', '\n\n👋 Cerrando Next.js...')
    nextProcess.kill()
    clearInterval(interval)
    process.exit(0)
  })
}

// Ejecutar
monitorAndRun().catch(err => {
  log('red', '❌ Error:', err.message)
  process.exit(1)
})
