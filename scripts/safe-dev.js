#!/usr/bin/env node

/**
 * 🔒 SAFE DEV — Ejecuta Next.js sin que el PC muera
 * Uso: node scripts/safe-dev.js
 * O agregá a package.json: "dev:safe": "node scripts/safe-dev.js"
 */

const { spawn, exec } = require('child_process')
const path = require('path')
const os = require('os')
const fs = require('fs')

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

  const nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    shell: true,
  })

  // Monitoreo de recursos
  const interval = setInterval(() => {
    const memUsage = process.memoryUsage()
    const memPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100

    if (memPercent > 80) {
      log('red', `\n⚠️  MEMORIA ALTA: ${memPercent.toFixed(1)}%`)
      log('yellow', '💡 Consejo: Abre menos tabs en el browser o recarga la página')
    }
  }, 10000)

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
