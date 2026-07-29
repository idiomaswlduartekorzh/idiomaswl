import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'

const languages = ['ingles', 'frances', 'portugues', 'italiano', 'aleman', 'ruso', 'japones', 'coreano']
const levels = ['a1', 'a2', 'b1']
const root = process.cwd()
const banks = {}

for (const language of languages) {
  for (const level of levels) {
    const relativeFile = path.join('src', 'app', '(site)', 'practica', language, level, 'escritura', 'Content.tsx')
    const file = path.join(root, relativeFile)
    const source = execFileSync('git', ['show', `origin/main:${relativeFile}`], { cwd: root, encoding: 'utf8' })
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    let initializer

    const visit = node => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'TASKS') initializer = node.initializer
      ts.forEachChild(node, visit)
    }
    visit(ast)
    if (!initializer) throw new Error(`No se encontró TASKS en ${file}`)

    const taskSource = ts.createPrinter().printNode(ts.EmitHint.Expression, initializer, ast)
    const tasks = vm.runInNewContext(`(${taskSource})`, {})
    banks[`${language}/${level}`] = tasks
  }
}

const output = path.join(root, 'src', 'data', 'practica', 'writing-legacy-banks.json')
fs.writeFileSync(output, `${JSON.stringify(banks, null, 2)}\n`)
console.log(`Extraídos ${Object.keys(banks).length} bancos y ${Object.values(banks).reduce((total, tasks) => total + tasks.length, 0)} tareas en ${path.relative(root, output)}`)
