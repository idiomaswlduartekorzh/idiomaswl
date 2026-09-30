#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const imageRoot = path.join(repoRoot, 'public/herramientas/vocabulario/ingles/phrasal-verbs/assets/seo')
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })

try {
  for (const verb of ['turn', 'come', 'bring', 'give']) {
    const source = path.join(imageRoot, `phrasal-verbs-con-${verb}-welearn.svg`)
    const destination = path.join(imageRoot, `phrasal-verbs-con-${verb}-welearn-social.jpg`)
    const svg = fs.readFileSync(source, 'utf8')
    await page.setContent(`<style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#f4f1ea}svg{display:block;width:100vw;height:100vh}</style>${svg}`)
    await page.locator('svg text').first().waitFor({ state: 'visible' })
    await page.screenshot({ path: destination, type: 'jpeg', quality: 88 })
    if (fs.statSync(destination).size < 20_000) throw new Error(`La imagen social de ${verb} quedó vacía.`)
    console.log(path.relative(repoRoot, destination))
  }
} finally {
  await browser.close()
}
