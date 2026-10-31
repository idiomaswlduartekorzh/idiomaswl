import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const sourceRoot = path.resolve('src')
const failures = []

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(file)
    } else if (/\.[cm]?[jt]sx?$/.test(entry.name)) {
      check(file)
    }
  }
}

function hasModifier(node, kind) {
  return node.modifiers?.some((modifier) => modifier.kind === kind) ?? false
}

function isAsyncFunction(expression) {
  return (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression))
    && hasModifier(expression, ts.SyntaxKind.AsyncKeyword)
}

function check(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
  if (!source.statements.length || !ts.isExpressionStatement(source.statements[0])
    || !ts.isStringLiteral(source.statements[0].expression)
    || source.statements[0].expression.text !== 'use server') return

  for (const statement of source.statements.slice(1)) {
    if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) continue
    if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue

    const valid = ts.isFunctionDeclaration(statement)
      ? hasModifier(statement, ts.SyntaxKind.AsyncKeyword)
      : ts.isVariableStatement(statement)
        ? statement.declarationList.declarations.every((declaration) => declaration.initializer && isAsyncFunction(declaration.initializer))
        : ts.isExportDeclaration(statement)
          ? statement.isTypeOnly || (statement.exportClause && ts.isNamedExports(statement.exportClause)
            && statement.exportClause.elements.every((element) => element.isTypeOnly))
          : false

    if (!valid) failures.push(`${path.relative(process.cwd(), file)}:${source.getLineAndCharacterOfPosition(statement.getStart(source)).line + 1}`)
  }
}

walk(sourceRoot)
if (failures.length) {
  console.error('Un archivo use server exporta un valor que no es una función async:')
  for (const failure of failures) console.error(`  ${failure}`)
  process.exitCode = 1
} else {
  console.log('Exportaciones use server válidas.')
}
