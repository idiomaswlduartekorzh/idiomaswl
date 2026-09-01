import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import { validateListeningReleaseApproval } from './lib/ielts-listening-release-approval.mjs';
import {
  assertListeningReleaseMarkerStructure,
  extractListeningReleaseBlocks,
} from './lib/ielts-listening-release-scope.mjs';
import { inspectMp3Buffer } from './lib/inspect-mp3-metadata.mjs';

const IELTS_PRACTICE_ROOT = 'src/app/(site)/practica/ielts';
const IELTS_PART_GUIDE_PATTERN = /^src\/app\/\(site\)\/practica\/ielts\/listening\/part-[1-4]\/page\.tsx$/;
const IELTS_ORIGINAL_AUDIO_PATTERN = /^public\/audio\/ielts\/listening\/welearn-listening-part-[1-4]-\d{3,}\.mp3$/;
const IELTS_ORIGINAL_MAP_PATTERN = /^public\/images\/ielts\/listening\/welearn-listening-part-[1-4]-\d{3,}-map\.svg$/;
const IELTS_LISTENING_PRACTICE_ID_PATTERN = /welearn-listening-part-[1-4]-\d{3,}/;
const PUBLIC_TEXT_ASSET_PATTERN = /\.(?:css|csv|html?|js|json|jsx|md|mjs|svg|ts|tsx|txt|xml)$/i;
const IELTS_RELEASE_MARKER_PATTERN = /ielts-listening-release:([^:\s]+):(start|end)/g;
const IELTS_SITEMAP_PART_ROUTE_PATTERN = /\/practica\/ielts\/listening\/part-[1-4](?=[`'"])/g;

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolutePath) : [absolutePath];
  });
}

function repoRelative(root, absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join('/');
}

function fileSha256(absolutePath) {
  return createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
}

function sortedUnique(values) {
  return [...new Set(values.filter((value) => typeof value === 'string' && value.trim()))].sort();
}

function setParityFailures(actualValues, expectedValues, extraMessage, missingMessage) {
  const actual = new Set(actualValues);
  const expected = new Set(expectedValues);
  return [
    ...[...actual].filter((value) => !expected.has(value)).sort().map(extraMessage),
    ...[...expected].filter((value) => !actual.has(value)).sort().map(missingMessage),
  ];
}

function hasNonEmptySvgElement(svg, elementName) {
  const match = new RegExp(`<${elementName}\\b[^>]*>([\\s\\S]*?)<\\/${elementName}\\s*>`, 'i').exec(svg);
  return Boolean(match?.[1].replace(/<[^>]+>/g, '').trim());
}

function svgViewBoxValues(svgOpenTag) {
  const match = /\sviewBox\s*=\s*(['"])([^'"]+)\1/.exec(svgOpenTag);
  if (!match) return null;
  const values = match[2].trim().split(/[\s,]+/).map(Number);
  return values.length === 4 && values.every(Number.isFinite) && values[2] > 0 && values[3] > 0
    ? values
    : null;
}

function svgResourceReferences(svg) {
  const attributeValues = [...svg.matchAll(
    /\s(?:href|xlink:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
  )].map((match) => (match[1] ?? match[2] ?? match[3] ?? '').trim());
  const cssUrlValues = [...svg.matchAll(
    /url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi,
  )].map((match) => (match[1] ?? match[2] ?? match[3] ?? '').trim());
  return [...attributeValues, ...cssUrlValues];
}

function orderedStringArraysMatch(left, right) {
  return Array.isArray(left)
    && Array.isArray(right)
    && left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function parseStaticSource(source) {
  const sourceFile = ts.createSourceFile(
    'ielts-listening-practice-source.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const diagnostics = sourceFile.parseDiagnostics ?? [];
  if (diagnostics.length) {
    const message = ts.flattenDiagnosticMessageText(diagnostics[0].messageText, ' ');
    throw new Error(`Source contains TypeScript parse errors: ${message}`);
  }

  const declarations = [];
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === 'SOURCE') {
        declarations.push({ declaration, isConst });
      }
    }
  }
  if (declarations.length !== 1) {
    throw new Error('Source must contain exactly one top-level const SOURCE declaration.');
  }
  const [{ declaration, isConst }] = declarations;
  if (!isConst) throw new Error('SOURCE must be declared with const.');
  const declarationList = declaration.parent;
  const variableStatement = declarationList.parent;
  if (
    declarationList.declarations.length !== 1
    || !ts.isVariableStatement(variableStatement)
    || variableStatement.modifiers?.length
  ) {
    throw new Error('SOURCE must be the only declaration in one unexported top-level const statement.');
  }
  if (
    !declaration.type
    || !ts.isTypeReferenceNode(declaration.type)
    || !ts.isIdentifier(declaration.type.typeName)
    || declaration.type.typeName.text !== 'IeltsListeningPracticeSource'
    || declaration.type.typeArguments?.length
  ) {
    throw new Error('SOURCE must use the direct IeltsListeningPracticeSource type annotation.');
  }
  if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
    throw new Error('SOURCE initializer must be a direct object literal without assertions or expressions.');
  }
  return {
    sourceFile,
    declaration,
    sourceObject: declaration.initializer,
    sourceStatement: variableStatement,
  };
}

function directStaticProperties(objectNode, label) {
  if (!ts.isObjectLiteralExpression(objectNode)) {
    throw new Error(`${label} must be a direct object literal.`);
  }
  const properties = new Map();
  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      throw new Error(`${label} cannot contain spreads, shorthand properties, methods or accessors.`);
    }
    if (!ts.isIdentifier(property.name)) {
      throw new Error(`${label} cannot contain computed, quoted or numeric property names.`);
    }
    const propertyName = property.name.text;
    if (properties.has(propertyName)) {
      throw new Error(`${label} must contain exactly one ${propertyName} property.`);
    }
    properties.set(propertyName, property.initializer);
  }
  return properties;
}

function requiredStaticProperty(properties, propertyName, label) {
  const value = properties.get(propertyName);
  if (!value) throw new Error(`${label} must contain exactly one ${propertyName} property.`);
  return value;
}

function staticObjectNode(node, label) {
  if (!ts.isObjectLiteralExpression(node)) throw new Error(`${label} must be a direct object literal.`);
  return node;
}

function staticArrayNode(node, label) {
  if (!ts.isArrayLiteralExpression(node)) throw new Error(`${label} must be a direct array literal.`);
  return node;
}

function staticStringNode(node, label) {
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
    throw new Error(`${label} must be a static string literal.`);
  }
  return node.text;
}

function staticNumberNode(node, label) {
  if (!ts.isNumericLiteral(node)) throw new Error(`${label} must be a static number literal.`);
  return Number(node.text);
}

function staticStringArrayNode(node, label) {
  const array = staticArrayNode(node, label);
  return array.elements.map((element, index) => {
    if (ts.isSpreadElement(element) || ts.isOmittedExpression(element)) {
      throw new Error(`${label} cannot contain spreads or omitted values.`);
    }
    return staticStringNode(element, `${label}[${index}]`);
  });
}

function staticObjectArrayNode(node, label) {
  const array = staticArrayNode(node, label);
  return array.elements.map((element, index) => {
    if (ts.isSpreadElement(element) || ts.isOmittedExpression(element) || !ts.isObjectLiteralExpression(element)) {
      throw new Error(`${label}[${index}] must be a direct object literal without spreads.`);
    }
    return element;
  });
}

function assertDeepStaticSourceNode(node, label) {
  if (
    ts.isStringLiteral(node)
    || ts.isNoSubstitutionTemplateLiteral(node)
    || node.kind === ts.SyntaxKind.TrueKeyword
    || node.kind === ts.SyntaxKind.FalseKeyword
    || node.kind === ts.SyntaxKind.NullKeyword
  ) {
    return;
  }
  if (ts.isNumericLiteral(node)) {
    if (!Number.isFinite(Number(node.text))) throw new Error(`${label} must contain a finite numeric literal.`);
    return;
  }
  if (ts.isObjectLiteralExpression(node)) {
    for (const [propertyName, initializer] of directStaticProperties(node, label)) {
      assertDeepStaticSourceNode(initializer, `${label}.${propertyName}`);
    }
    return;
  }
  if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((element, index) => {
      if (ts.isSpreadElement(element) || ts.isOmittedExpression(element)) {
        throw new Error(`${label} cannot contain spreads or omitted values.`);
      }
      assertDeepStaticSourceNode(element, `${label}[${index}]`);
    });
    return;
  }
  throw new Error(
    `${label} must be deeply static: only object, array, string, number, boolean and null literals are allowed.`,
  );
}

function assertNoImportAttributes(declaration, label) {
  if (declaration.attributes || declaration.assertClause) {
    throw new Error(`${label} cannot use import attributes or assertions.`);
  }
}

function exactImportFrom(sourceFile, moduleName) {
  const matches = sourceFile.statements.filter((statement) =>
    ts.isImportDeclaration(statement)
    && ts.isStringLiteral(statement.moduleSpecifier)
    && statement.moduleSpecifier.text === moduleName);
  if (matches.length !== 1) throw new Error(`Source must contain exactly one import from ${moduleName}.`);
  return matches[0];
}

function auditCanonicalImports(sourceFile) {
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  if (imports.length !== 3) {
    throw new Error('Source must contain exactly the three canonical IELTS Listening imports.');
  }

  const serverOnlyImport = exactImportFrom(sourceFile, 'server-only');
  assertNoImportAttributes(serverOnlyImport, 'server-only import');
  if (serverOnlyImport.importClause) {
    throw new Error("server-only must be imported exactly once as a side effect: import 'server-only'.");
  }

  const expectedNamedImports = new Map([
    ['@/lib/examAudio', new Map([['resolveAudioUrl', false]])],
    ['@/lib/ielts/listening-practice-contract', new Map([
      ['ieltsListeningQuestionNumbers', false],
      ['ieltsListeningResponseSpecs', false],
      ['projectIeltsListeningPractice', false],
      ['scoreIeltsListeningPractice', false],
      ['IeltsListeningPracticeSource', true],
    ])],
  ]);

  const canonicalImports = new Set([serverOnlyImport]);
  for (const [moduleName, expectedSpecifiers] of expectedNamedImports) {
    const declaration = exactImportFrom(sourceFile, moduleName);
    canonicalImports.add(declaration);
    assertNoImportAttributes(declaration, `${moduleName} import`);
    const clause = declaration.importClause;
    if (
      !clause
      || clause.isTypeOnly
      || clause.name
      || !clause.namedBindings
      || !ts.isNamedImports(clause.namedBindings)
      || clause.namedBindings.elements.length !== expectedSpecifiers.size
    ) {
      throw new Error(`${moduleName} must use its exact canonical named imports.`);
    }
    const actualSpecifiers = new Map();
    for (const specifier of clause.namedBindings.elements) {
      if (specifier.propertyName || actualSpecifiers.has(specifier.name.text)) {
        throw new Error(`${moduleName} imports cannot use aliases or duplicate local bindings.`);
      }
      actualSpecifiers.set(specifier.name.text, specifier.isTypeOnly);
    }
    for (const [specifierName, isTypeOnly] of expectedSpecifiers) {
      if (actualSpecifiers.get(specifierName) !== isTypeOnly) {
        throw new Error(`${moduleName} must import ${isTypeOnly ? 'type ' : ''}${specifierName} exactly once.`);
      }
    }
  }
  return canonicalImports;
}

function exactSourceIdentifier(node, label, allowedSourceReferences) {
  if (!ts.isIdentifier(node) || node.text !== 'SOURCE') {
    throw new Error(`${label} must receive SOURCE directly.`);
  }
  allowedSourceReferences.add(node);
}

function exactSourceProperty(node, propertyPath, label, allowedSourceReferences) {
  let current = node;
  for (let index = propertyPath.length - 1; index >= 0; index -= 1) {
    if (
      !ts.isPropertyAccessExpression(current)
      || current.questionDotToken
      || current.name.text !== propertyPath[index]
    ) {
      throw new Error(`${label} must read SOURCE.${propertyPath.join('.')} directly.`);
    }
    current = current.expression;
  }
  exactSourceIdentifier(current, label, allowedSourceReferences);
}

function exactIdentifier(node, identifierName, label) {
  if (!ts.isIdentifier(node) || node.text !== identifierName) {
    throw new Error(`${label} must use ${identifierName} directly.`);
  }
}

function exactCallExpression(node, calleeName, argumentCount, label) {
  if (!ts.isCallExpression(node) || node.questionDotToken || node.typeArguments?.length) {
    throw new Error(`${label} must be a direct ${calleeName}(...) call.`);
  }
  exactIdentifier(node.expression, calleeName, label);
  if (node.arguments.length !== argumentCount) {
    throw new Error(`${label} must call ${calleeName} with exactly ${argumentCount} arguments.`);
  }
  return node;
}

function requiredExportedFunction(sourceFile, functionName, parameterCount) {
  const declarations = sourceFile.statements.filter((statement) =>
    ts.isFunctionDeclaration(statement) && statement.name?.text === functionName);
  if (declarations.length !== 1) {
    throw new Error(`Source must contain exactly one exported ${functionName} adapter.`);
  }
  const [declaration] = declarations;
  if (
    declaration.modifiers?.length !== 1
    || declaration.modifiers[0].kind !== ts.SyntaxKind.ExportKeyword
    || declaration.asteriskToken
    || declaration.typeParameters?.length
  ) {
    throw new Error(`${functionName} must be a direct, non-async exported function declaration.`);
  }
  if (!declaration.body) throw new Error(`${functionName} must have a concrete function body.`);
  if (declaration.parameters.length !== parameterCount) {
    throw new Error(`${functionName} must declare exactly ${parameterCount} parameters.`);
  }
  return declaration;
}

function singleReturnExpression(functionDeclaration, functionName) {
  const statements = functionDeclaration.body.statements;
  if (statements.length !== 1 || !ts.isReturnStatement(statements[0]) || !statements[0].expression) {
    throw new Error(`${functionName} must contain exactly one direct return statement.`);
  }
  return statements[0].expression;
}

function auditPracticeAdapter(sourceFile, part, allowedSourceReferences) {
  const functionName = `getIeltsListeningPart${part}Practice`;
  const declaration = requiredExportedFunction(sourceFile, functionName, 0);
  const statements = declaration.body.statements;
  if (statements.length !== 2 || !ts.isVariableStatement(statements[0]) || !ts.isReturnStatement(statements[1])) {
    throw new Error(`${functionName} must contain only the canonical audio resolution and projection.`);
  }
  const variableStatement = statements[0];
  if ((variableStatement.declarationList.flags & ts.NodeFlags.Const) === 0
    || variableStatement.declarationList.declarations.length !== 1) {
    throw new Error(`${functionName} must resolve audio in exactly one const declaration.`);
  }
  const [resolvedDeclaration] = variableStatement.declarationList.declarations;
  if (!ts.isIdentifier(resolvedDeclaration.name) || !resolvedDeclaration.initializer) {
    throw new Error(`${functionName} must use a direct identifier for its resolved audio URL.`);
  }
  const resolvedName = resolvedDeclaration.name.text;
  if (resolvedName !== 'resolved') {
    throw new Error(`${functionName} must store the canonical audio fallback in resolved.`);
  }
  const fallback = resolvedDeclaration.initializer;
  if (!ts.isBinaryExpression(fallback) || fallback.operatorToken.kind !== ts.SyntaxKind.QuestionQuestionToken) {
    throw new Error(`${functionName} must use the canonical resolveAudioUrl(...) ?? SOURCE.audio.localPath fallback.`);
  }
  const resolveCall = exactCallExpression(fallback.left, 'resolveAudioUrl', 1, functionName);
  exactSourceProperty(resolveCall.arguments[0], ['audio', 'localPath'], functionName, allowedSourceReferences);
  exactSourceProperty(fallback.right, ['audio', 'localPath'], functionName, allowedSourceReferences);

  if (!statements[1].expression) throw new Error(`${functionName} must return its projected practice.`);
  const projectionCall = exactCallExpression(
    statements[1].expression,
    'projectIeltsListeningPractice',
    2,
    functionName,
  );
  exactSourceIdentifier(projectionCall.arguments[0], functionName, allowedSourceReferences);
  exactIdentifier(projectionCall.arguments[1], resolvedName, functionName);
  return declaration;
}

function auditIdentityAdapter(sourceFile, part, allowedSourceReferences) {
  const functionName = `getIeltsListeningPart${part}Identity`;
  const declaration = requiredExportedFunction(sourceFile, functionName, 0);
  const returned = singleReturnExpression(declaration, functionName);
  if (
    !ts.isAsExpression(returned)
    || returned.type.getText(sourceFile) !== 'const'
    || !ts.isObjectLiteralExpression(returned.expression)
  ) {
    throw new Error(`${functionName} must return the canonical identity object as const.`);
  }
  const identityProperties = directStaticProperties(returned.expression, `${functionName} identity`);
  const identityFields = ['id', 'contentVersion', 'part', 'practiceNumber'];
  if (identityProperties.size !== identityFields.length) {
    throw new Error(`${functionName} must return exactly id, contentVersion, part and practiceNumber.`);
  }
  for (const field of identityFields) {
    exactSourceProperty(
      requiredStaticProperty(identityProperties, field, `${functionName} identity`),
      [field],
      functionName,
      allowedSourceReferences,
    );
  }
  return declaration;
}

function auditSingleSourceAdapter({
  sourceFile,
  functionName,
  calleeName,
  allowedSourceReferences,
}) {
  const declaration = requiredExportedFunction(sourceFile, functionName, 0);
  const call = exactCallExpression(singleReturnExpression(declaration, functionName), calleeName, 1, functionName);
  exactSourceIdentifier(call.arguments[0], functionName, allowedSourceReferences);
  return declaration;
}

function exactResponsesParameter(declaration, functionName) {
  const [parameter] = declaration.parameters;
  if (
    !ts.isIdentifier(parameter.name)
    || parameter.name.text !== 'responses'
    || parameter.dotDotDotToken
    || parameter.questionToken
    || parameter.initializer
    || parameter.modifiers?.length
  ) {
    throw new Error(`${functionName} must declare exactly one required responses parameter.`);
  }
  return parameter;
}

function auditScoreAdapter(sourceFile, part, allowedSourceReferences) {
  const functionName = `scoreIeltsListeningPart${part}Practice`;
  const declaration = requiredExportedFunction(sourceFile, functionName, 1);
  const parameter = exactResponsesParameter(declaration, functionName);
  const call = exactCallExpression(
    singleReturnExpression(declaration, functionName),
    'scoreIeltsListeningPractice',
    2,
    functionName,
  );
  exactSourceIdentifier(call.arguments[0], functionName, allowedSourceReferences);
  exactIdentifier(call.arguments[1], parameter.name.text, functionName);
  return declaration;
}

function auditRegistrationAdapter(sourceFile, part) {
  const functionName = `scoreIeltsListeningPart${part}Registration`;
  const declaration = requiredExportedFunction(sourceFile, functionName, 1);
  const parameter = exactResponsesParameter(declaration, functionName);
  const returned = singleReturnExpression(declaration, functionName);
  if (
    !ts.isAsExpression(returned)
    || returned.type.getText(sourceFile) !== 'const'
    || !ts.isObjectLiteralExpression(returned.expression)
  ) {
    throw new Error(`${functionName} must return the canonical registration object as const.`);
  }
  const registrationProperties = directStaticProperties(returned.expression, `${functionName} result`);
  if (registrationProperties.size !== 2) {
    throw new Error(`${functionName} must return exactly identity and result.`);
  }
  const identityCall = exactCallExpression(
    requiredStaticProperty(registrationProperties, 'identity', `${functionName} result`),
    `getIeltsListeningPart${part}Identity`,
    0,
    functionName,
  );
  const resultCall = exactCallExpression(
    requiredStaticProperty(registrationProperties, 'result', `${functionName} result`),
    `scoreIeltsListeningPart${part}Practice`,
    1,
    functionName,
  );
  if (identityCall.arguments.length !== 0) {
    throw new Error(`${functionName} identity adapter cannot receive arguments.`);
  }
  exactIdentifier(resultCall.arguments[0], parameter.name.text, functionName);
  return declaration;
}

function auditCanonicalModuleStatements({
  sourceFile,
  sourceStatement,
  canonicalImports,
  canonicalFunctions,
}) {
  const allowedStatements = new Set([
    ...canonicalImports,
    sourceStatement,
    ...canonicalFunctions,
  ]);
  if (
    allowedStatements.size !== 10
    || sourceFile.statements.length !== allowedStatements.size
    || sourceFile.statements.some((statement) => !allowedStatements.has(statement))
  ) {
    throw new Error(
      'Source module may contain only the three canonical imports, SOURCE and its six canonical exported adapters.',
    );
  }
}

function isNonReferenceIdentifier(node, sourceDeclaration) {
  if (node === sourceDeclaration.name) return true;
  const { parent } = node;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return true;
  return Boolean(
    'name' in parent
    && parent.name === node
    && !ts.isComputedPropertyName(parent.name)
    && !ts.isShorthandPropertyAssignment(parent),
  );
}

function auditCanonicalSourceReferences({ sourceFile, declaration, sourceObject, sourceStatement }) {
  const canonicalImports = auditCanonicalImports(sourceFile);
  assertDeepStaticSourceNode(sourceObject, 'SOURCE');
  const sourceProperties = directStaticProperties(sourceObject, 'SOURCE');
  const part = staticNumberNode(requiredStaticProperty(sourceProperties, 'part', 'SOURCE'), 'SOURCE.part');
  if (!Number.isInteger(part) || part < 1 || part > 4) {
    throw new Error('SOURCE.part must be a static integer from 1 to 4.');
  }

  const allowedSourceReferences = new Set();
  const practiceAdapter = auditPracticeAdapter(sourceFile, part, allowedSourceReferences);
  const identityAdapter = auditIdentityAdapter(sourceFile, part, allowedSourceReferences);
  const questionNumbersAdapter = auditSingleSourceAdapter({
    sourceFile,
    functionName: `getIeltsListeningPart${part}QuestionNumbers`,
    calleeName: 'ieltsListeningQuestionNumbers',
    allowedSourceReferences,
  });
  const responseSpecsAdapter = auditSingleSourceAdapter({
    sourceFile,
    functionName: `getIeltsListeningPart${part}ResponseSpecs`,
    calleeName: 'ieltsListeningResponseSpecs',
    allowedSourceReferences,
  });
  const scoreAdapter = auditScoreAdapter(sourceFile, part, allowedSourceReferences);
  const registrationAdapter = auditRegistrationAdapter(sourceFile, part);

  auditCanonicalModuleStatements({
    sourceFile,
    sourceStatement,
    canonicalImports,
    canonicalFunctions: [
      practiceAdapter,
      identityAdapter,
      questionNumbersAdapter,
      responseSpecsAdapter,
      scoreAdapter,
      registrationAdapter,
    ],
  });

  const unexpectedReferences = [];
  function visit(node) {
    if (
      ts.isIdentifier(node)
      && node.text === 'SOURCE'
      && !isNonReferenceIdentifier(node, declaration)
      && !allowedSourceReferences.has(node)
    ) {
      unexpectedReferences.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (unexpectedReferences.length) {
    const position = sourceFile.getLineAndCharacterOfPosition(unexpectedReferences[0].getStart(sourceFile));
    throw new Error(
      `SOURCE contains an unapproved reference outside its canonical adapters at ${position.line + 1}:${position.character + 1}.`,
    );
  }
}

function uniqueSourceObject(source) {
  const parsed = parseStaticSource(source);
  auditCanonicalSourceReferences(parsed);
  return parsed.sourceObject;
}

function staticSourceValue(node, label) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return staticNumberNode(node, label);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element, index) => {
      if (ts.isSpreadElement(element) || ts.isOmittedExpression(element)) {
        throw new Error(`${label} cannot contain spreads or omitted values.`);
      }
      return staticSourceValue(element, `${label}[${index}]`);
    });
  }
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(
      [...directStaticProperties(node, label)].map(([propertyName, initializer]) => [
        propertyName,
        staticSourceValue(initializer, `${label}.${propertyName}`),
      ]),
    );
  }
  throw new Error(`${label} is not a supported static value.`);
}

export function inspectIeltsListeningStaticSource(source) {
  return staticSourceValue(uniqueSourceObject(source), 'SOURCE');
}

function extractStaticSourceAudio(source) {
  const sourceProperties = directStaticProperties(uniqueSourceObject(source), 'SOURCE');
  const audio = staticObjectNode(requiredStaticProperty(sourceProperties, 'audio', 'SOURCE'), 'SOURCE.audio');
  const audioProperties = directStaticProperties(audio, 'SOURCE.audio');
  return {
    localPath: staticStringNode(
      requiredStaticProperty(audioProperties, 'localPath', 'SOURCE.audio'),
      'SOURCE.audio.localPath',
    ),
    durationSeconds: staticNumberNode(
      requiredStaticProperty(audioProperties, 'durationSeconds', 'SOURCE.audio'),
      'SOURCE.audio.durationSeconds',
    ),
    sha256: staticStringNode(
      requiredStaticProperty(audioProperties, 'sha256', 'SOURCE.audio'),
      'SOURCE.audio.sha256',
    ),
  };
}

function extractStaticSourceMaps(source) {
  const sourceProperties = directStaticProperties(uniqueSourceObject(source), 'SOURCE');
  const groups = staticObjectArrayNode(
    requiredStaticProperty(sourceProperties, 'groups', 'SOURCE'),
    'SOURCE.groups',
  );
  return groups.flatMap((group, index) => {
    const groupLabel = `SOURCE.groups[${index}]`;
    const groupProperties = directStaticProperties(group, groupLabel);
    const type = staticStringNode(requiredStaticProperty(groupProperties, 'type', groupLabel), `${groupLabel}.type`);
    if (type !== 'map-labelling') return [];
    const mapLabel = `${groupLabel}.map`;
    const map = staticObjectNode(requiredStaticProperty(groupProperties, 'map', groupLabel), mapLabel);
    const mapProperties = directStaticProperties(map, mapLabel);
    return [{
      groupIndex: index,
      url: staticStringNode(requiredStaticProperty(mapProperties, 'url', mapLabel), `${mapLabel}.url`),
      width: staticNumberNode(requiredStaticProperty(mapProperties, 'width', mapLabel), `${mapLabel}.width`),
      height: staticNumberNode(requiredStaticProperty(mapProperties, 'height', mapLabel), `${mapLabel}.height`),
      areaKeys: staticStringArrayNode(
        requiredStaticProperty(mapProperties, 'areaKeys', mapLabel),
        `${mapLabel}.areaKeys`,
      ),
    }];
  });
}

export function validateIeltsListeningMapAsset({
  root,
  practiceId,
  source,
  ownership,
  manifestMap,
  catalogMap,
}) {
  const failures = [];
  let sourceMaps;
  try {
    sourceMaps = extractStaticSourceMaps(source ?? '');
  } catch (error) {
    return [`Source groups are missing, ambiguous or not statically auditable for ${practiceId}: ${error instanceof Error ? error.message : String(error)}`];
  }
  const sourceUsesMap = sourceMaps.length > 0;
  if (!sourceUsesMap) {
    if (manifestMap !== undefined) {
      failures.push(`Manifest declares a map but source ${practiceId} has no map-labelling group.`);
    }
    if (catalogMap !== undefined) {
      failures.push(`Catalog declares a map but source ${practiceId} has no map-labelling group.`);
    }
    return failures;
  }

  const expectedPath = `public/images/ielts/listening/${practiceId}-map.svg`;
  const expectedUrl = `/images/ielts/listening/${practiceId}-map.svg`;
  if (ownership?.borrowedMap !== false) failures.push(`Map ownership must declare borrowedMap=false for ${practiceId}.`);
  if (typeof ownership?.author !== 'string' || !ownership.author.trim()) {
    failures.push(`Map ownership author is missing for ${practiceId}.`);
  }

  const expectedCatalogFields = ['areaKeys', 'height', 'path', 'url', 'width'];
  if (!catalogMap || typeof catalogMap !== 'object' || Array.isArray(catalogMap)) {
    failures.push(`Source ${practiceId} contains map-labelling but catalog map is missing.`);
  } else {
    const actualCatalogFields = Object.keys(catalogMap).sort();
    if (!orderedStringArraysMatch(actualCatalogFields, expectedCatalogFields)) {
      failures.push(`Catalog map must use the exact canonical fields url, path, width, height and areaKeys for ${practiceId}.`);
    }
    if (catalogMap.url !== expectedUrl) failures.push(`Catalog map URL must be ${expectedUrl}.`);
    if (catalogMap.path !== expectedPath) failures.push(`Catalog map path must be ${expectedPath}.`);
    if (!Number.isInteger(catalogMap.width) || catalogMap.width <= 0
      || !Number.isInteger(catalogMap.height) || catalogMap.height <= 0) {
      failures.push(`Catalog map dimensions must be positive integers for ${practiceId}.`);
    }
    if (
      !Array.isArray(catalogMap.areaKeys)
      || !catalogMap.areaKeys.length
      || catalogMap.areaKeys.some((key) => typeof key !== 'string' || !key.trim())
      || new Set(catalogMap.areaKeys).size !== catalogMap.areaKeys.length
    ) {
      failures.push(`Catalog map areaKeys must be a non-empty array of unique strings for ${practiceId}.`);
    }
  }

  if (!manifestMap || typeof manifestMap !== 'object' || Array.isArray(manifestMap)) {
    failures.push(`Source ${practiceId} contains map-labelling but manifest.map is missing.`);
    return failures;
  }
  if (manifestMap.path !== expectedPath) failures.push(`Map path must be ${expectedPath}.`);
  if (manifestMap.borrowedArtwork !== false) failures.push(`Map artwork must declare borrowedArtwork=false for ${practiceId}.`);
  if (typeof manifestMap.author !== 'string' || !manifestMap.author.trim()) {
    failures.push(`Map artwork author is missing for ${practiceId}.`);
  }
  if (!Number.isInteger(manifestMap.width) || manifestMap.width <= 0
    || !Number.isInteger(manifestMap.height) || manifestMap.height <= 0) {
    failures.push(`Manifest map dimensions must be positive integers for ${practiceId}.`);
  }
  if (!Number.isInteger(manifestMap.bytes) || manifestMap.bytes <= 0) {
    failures.push(`Map bytes must be a positive integer for ${practiceId}.`);
  }
  if (!/^[a-f0-9]{64}$/.test(manifestMap.sha256 ?? '')) {
    failures.push(`Map sha256 is invalid for ${practiceId}.`);
  }
  if (manifestMap.status !== 'approved-original-vector') {
    failures.push(`Map status must be approved-original-vector for ${practiceId}.`);
  }
  if (manifestMap.altReviewed !== true) failures.push(`Map alt text review is not approved for ${practiceId}.`);
  if (manifestMap.visualAmbiguityReview !== 'approved') {
    failures.push(`Map visual ambiguity review is not approved for ${practiceId}.`);
  }

  const areaKeys = Array.isArray(manifestMap.areaKeys) ? manifestMap.areaKeys : [];
  if (
    !areaKeys.length
    || areaKeys.some((key) => typeof key !== 'string' || !key.trim())
    || new Set(areaKeys).size !== areaKeys.length
  ) {
    failures.push(`Map areaKeys must be a non-empty array of unique strings for ${practiceId}.`);
  }

  for (const sourceMap of sourceMaps) {
    const sourceMapLabel = `group ${sourceMap.groupIndex + 1}`;
    if (sourceMap.url !== expectedUrl || sourceMap.url !== catalogMap?.url) {
      failures.push(`Source map URL does not match the canonical catalog map for ${practiceId} (${sourceMapLabel}).`);
    }
    if (sourceMap.width !== catalogMap?.width || sourceMap.height !== catalogMap?.height) {
      failures.push(`Source map dimensions do not match the canonical catalog map for ${practiceId} (${sourceMapLabel}).`);
    }
    if (!orderedStringArraysMatch(sourceMap.areaKeys, catalogMap?.areaKeys)) {
      failures.push(`Source map areaKeys do not match the canonical catalog map for ${practiceId} (${sourceMapLabel}).`);
    }
  }
  if (manifestMap.path !== catalogMap?.path) failures.push(`Manifest map path does not match the catalog map for ${practiceId}.`);
  if (manifestMap.width !== catalogMap?.width || manifestMap.height !== catalogMap?.height) {
    failures.push(`Manifest map dimensions do not match the catalog map for ${practiceId}.`);
  }
  if (!orderedStringArraysMatch(areaKeys, catalogMap?.areaKeys)) {
    failures.push(`Manifest map areaKeys do not match the catalog map for ${practiceId}.`);
  }

  const absolutePath = path.resolve(root, expectedPath);
  if (!absolutePath.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolutePath)) {
    failures.push(`Missing original map SVG for ${practiceId}: ${expectedPath}.`);
    return failures;
  }

  const buffer = fs.readFileSync(absolutePath);
  const sha256 = createHash('sha256').update(buffer).digest('hex');
  if (buffer.length !== manifestMap.bytes) {
    failures.push(`Map size drift for ${practiceId}: ${buffer.length} != ${manifestMap.bytes}.`);
  }
  if (sha256 !== manifestMap.sha256) {
    failures.push(`Map checksum drift for ${practiceId}: ${sha256} != ${manifestMap.sha256}.`);
  }

  const svg = buffer.toString('utf8');
  const svgOpenTag = svg.match(/<svg\b[^>]*>/i)?.[0] ?? '';
  const viewBox = svgViewBoxValues(svgOpenTag);
  if (!svgOpenTag) failures.push(`Map asset is not an SVG document for ${practiceId}.`);
  if (!viewBox) {
    failures.push(`Map SVG is missing a valid viewBox for ${practiceId}.`);
  } else if (viewBox[2] !== catalogMap?.width || viewBox[3] !== catalogMap?.height) {
    failures.push(`Map SVG viewBox dimensions do not match the catalog map for ${practiceId}.`);
  }
  if (!hasNonEmptySvgElement(svg, 'title')) failures.push(`Map SVG is missing a non-empty title for ${practiceId}.`);
  if (!hasNonEmptySvgElement(svg, 'desc')) failures.push(`Map SVG is missing a non-empty desc for ${practiceId}.`);
  if (/<script\b/i.test(svg)) failures.push(`Map SVG contains a forbidden script element for ${practiceId}.`);
  if (/<foreignObject\b/i.test(svg)) failures.push(`Map SVG contains a forbidden foreignObject for ${practiceId}.`);
  if (/\son[a-z][a-z0-9_-]*\s*=/i.test(svg)) failures.push(`Map SVG contains a forbidden event handler for ${practiceId}.`);
  if (/<!DOCTYPE\b|<!ENTITY\b|@import\b/i.test(svg)) {
    failures.push(`Map SVG contains a forbidden external-resource mechanism for ${practiceId}.`);
  }
  if (svgResourceReferences(svg).some((reference) => !reference.startsWith('#'))) {
    failures.push(`Map SVG contains a forbidden external resource for ${practiceId}.`);
  }

  const optionKeys = [...svg.matchAll(/\sdata-option-key\s*=\s*(['"])(.*?)\1/g)].map((match) => match[2]);
  if (
    optionKeys.length !== areaKeys.length
    || new Set(optionKeys).size !== optionKeys.length
    || optionKeys.some((key, index) => key !== areaKeys[index])
  ) {
    failures.push(`Map SVG data-option-key values must match manifest.map.areaKeys exactly once for ${practiceId}.`);
  }

  return failures;
}

export function validateIeltsListeningAudioMetadata({ practiceId, source, manifestAudio, buffer }) {
  const failures = [];
  if (!manifestAudio || typeof manifestAudio !== 'object' || Array.isArray(manifestAudio)) {
    return [`Audio manifest metadata is missing for ${practiceId}.`];
  }
  if (!Buffer.isBuffer(buffer)) return [`Audio bytes are missing for ${practiceId}.`];
  let sourceAudio;
  try {
    sourceAudio = extractStaticSourceAudio(source ?? '');
  } catch (error) {
    failures.push(`Source audio is missing, ambiguous or not statically auditable for ${practiceId}: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (!Number.isFinite(manifestAudio.durationSeconds) || manifestAudio.durationSeconds <= 0) {
    failures.push(`Audio duration must be positive for ${practiceId}.`);
  }
  if (!Number.isInteger(manifestAudio.channels) || manifestAudio.channels <= 0) {
    failures.push(`Audio channels must be a positive integer for ${practiceId}.`);
  }
  if (!Number.isInteger(manifestAudio.sampleRateHz) || manifestAudio.sampleRateHz <= 0) {
    failures.push(`Audio sample rate must be a positive integer for ${practiceId}.`);
  }
  if (!Number.isInteger(manifestAudio.bitRate) || manifestAudio.bitRate <= 0) {
    failures.push(`Audio bit rate must be a positive integer for ${practiceId}.`);
  }

  try {
    const metadata = inspectMp3Buffer(buffer);
    if (Math.abs(metadata.durationSeconds - manifestAudio.durationSeconds) > 0.000_001) {
      failures.push(`Audio duration drift for ${practiceId}: ${metadata.durationSeconds} != ${manifestAudio.durationSeconds}.`);
    }
    if (metadata.channels !== manifestAudio.channels) {
      failures.push(`Audio channel drift for ${practiceId}: ${metadata.channels} != ${manifestAudio.channels}.`);
    }
    if (metadata.sampleRateHz !== manifestAudio.sampleRateHz) {
      failures.push(`Audio sample-rate drift for ${practiceId}: ${metadata.sampleRateHz} != ${manifestAudio.sampleRateHz}.`);
    }
    if (Math.abs(metadata.bitrateBps - manifestAudio.bitRate) >= 100) {
      failures.push(`Audio bit-rate drift for ${practiceId}: ${metadata.bitrateBps} != ${manifestAudio.bitRate}.`);
    }
  } catch (error) {
    failures.push(`Audio MPEG metadata is invalid for ${practiceId}: ${error instanceof Error ? error.message : String(error)}.`);
  }

  const expectedSourceAudioPath = typeof manifestAudio.path === 'string'
    ? manifestAudio.path.replace(/^public/, '')
    : null;
  if (sourceAudio && sourceAudio.localPath !== expectedSourceAudioPath) {
    failures.push(`Source audio path does not match the manifest for ${practiceId}.`);
  }
  if (sourceAudio && sourceAudio.durationSeconds !== manifestAudio.durationSeconds) {
    failures.push(`Source audio duration does not match the manifest for ${practiceId}.`);
  }
  if (sourceAudio && sourceAudio.sha256 !== manifestAudio.sha256) {
    failures.push(`Source audio checksum does not match the manifest for ${practiceId}.`);
  }
  return failures;
}

export function collectIeltsListeningPublicationInventory(root, sitemapSource) {
  const ieltsRoot = path.join(root, IELTS_PRACTICE_ROOT);
  const ieltsSurfaceFiles = walkFiles(ieltsRoot)
    .filter((absolutePath) => /\.[cm]?[jt]sx?$/.test(absolutePath));
  const markerIds = [];
  const markerStructureFailures = [];

  for (const absolutePath of ieltsSurfaceFiles) {
    const relativePath = repoRelative(root, absolutePath);
    const contents = fs.readFileSync(absolutePath, 'utf8');
    if (!contents.includes('ielts-listening-release:')) continue;
    try {
      assertListeningReleaseMarkerStructure(contents);
    } catch (error) {
      markerStructureFailures.push(`${relativePath}: ${error.message}`);
    }
    markerIds.push(...[...contents.matchAll(IELTS_RELEASE_MARKER_PATTERN)].map((match) => match[1]));
  }

  const publicAudioRoot = path.join(root, 'public/audio/ielts/listening');
  const publicMapRoot = path.join(root, 'public/images/ielts/listening');
  const publicFiles = walkFiles(path.join(root, 'public'));
  const privateCandidateFilesBySize = new Map();
  for (const absolutePath of walkFiles(path.join(root, 'docs/ielts-superhub/candidates'))) {
    const size = fs.statSync(absolutePath).size;
    const candidates = privateCandidateFilesBySize.get(size) ?? [];
    candidates.push({
      sha256: fileSha256(absolutePath),
      relativePath: repoRelative(root, absolutePath),
    });
    privateCandidateFilesBySize.set(size, candidates);
  }
  const publicAudioPaths = sortedUnique(
    walkFiles(publicAudioRoot).map((absolutePath) => repoRelative(root, absolutePath)).filter((relativePath) =>
      IELTS_ORIGINAL_AUDIO_PATTERN.test(relativePath)),
  );
  const publicMapPaths = sortedUnique(
    walkFiles(publicMapRoot).map((absolutePath) => repoRelative(root, absolutePath)).filter((relativePath) =>
      IELTS_ORIGINAL_MAP_PATTERN.test(relativePath)),
  );
  const canonicalPublicArtifacts = new Set([...publicAudioPaths, ...publicMapPaths]);
  const unexpectedPublicPracticePaths = sortedUnique(publicFiles.flatMap((absolutePath) => {
    const relativePath = repoRelative(root, absolutePath);
    const sameSizeCandidates = privateCandidateFilesBySize.get(fs.statSync(absolutePath).size) ?? [];
    if (
      sameSizeCandidates.length
      && sameSizeCandidates.some((candidate) => candidate.sha256 === fileSha256(absolutePath))
    ) {
      return [relativePath];
    }
    if (canonicalPublicArtifacts.has(relativePath)) return [];
    if (IELTS_LISTENING_PRACTICE_ID_PATTERN.test(relativePath)) return [relativePath];
    if (
      PUBLIC_TEXT_ASSET_PATTERN.test(relativePath)
      && IELTS_LISTENING_PRACTICE_ID_PATTERN.test(fs.readFileSync(absolutePath, 'utf8'))
    ) {
      return [relativePath];
    }
    return [];
  }));
  return {
    physicalGuidePaths: sortedUnique(
      ieltsSurfaceFiles.map((absolutePath) => repoRelative(root, absolutePath)).filter((relativePath) =>
        IELTS_PART_GUIDE_PATTERN.test(relativePath)),
    ),
    publicAudioPaths,
    publicMapPaths,
    unexpectedPublicPracticePaths,
    sitemapGuideRoutes: sortedUnique([...sitemapSource.matchAll(IELTS_SITEMAP_PART_ROUTE_PATTERN)].map((match) => match[0])),
    releaseMarkerIds: sortedUnique(markerIds),
    markerStructureFailures,
  };
}

export function findIeltsListeningInversePublicationFailures({
  catalogPractices,
  catalogAudioPaths,
  catalogMapPaths,
  inventory,
}) {
  const practices = Array.isArray(catalogPractices) ? catalogPractices : [];
  const catalogIds = sortedUnique(practices.map((practice) => practice?.practiceId));
  const catalogGuidePaths = sortedUnique(practices.map((practice) => practice?.guidePath));
  const catalogGuideRoutes = sortedUnique(practices.map((practice) => practice?.guideRoute));
  const expectedAudioPaths = sortedUnique(catalogAudioPaths ?? []);
  const expectedMapPaths = sortedUnique(catalogMapPaths ?? []);

  return [
    ...(inventory.markerStructureFailures ?? []),
    ...(inventory.unexpectedPublicPracticePaths ?? [])
      .map((artifactPath) => `Unrecognized public IELTS Listening practice artifact: ${artifactPath}.`),
    ...setParityFailures(
      inventory.physicalGuidePaths ?? [],
      catalogGuidePaths,
      (guidePath) => `Physical IELTS Listening Part landing is not catalogued: ${guidePath}.`,
      (guidePath) => `Catalog guide has no physical IELTS Listening Part landing: ${guidePath}.`,
    ),
    ...setParityFailures(
      inventory.publicAudioPaths ?? [],
      expectedAudioPaths,
      (audioPath) => `Public original IELTS Listening MP3 is not catalogued: ${audioPath}.`,
      (audioPath) => `Catalog audio has no matching public original IELTS Listening MP3: ${audioPath}.`,
    ),
    ...setParityFailures(
      inventory.publicMapPaths ?? [],
      expectedMapPaths,
      (mapPath) => `Public original IELTS Listening map SVG is not catalogued: ${mapPath}.`,
      (mapPath) => `Catalog map has no matching public original IELTS Listening SVG: ${mapPath}.`,
    ),
    ...setParityFailures(
      inventory.sitemapGuideRoutes ?? [],
      catalogGuideRoutes,
      (guideRoute) => `IELTS Listening Part sitemap route is not catalogued: ${guideRoute}.`,
      (guideRoute) => `Catalog guide route is missing from the IELTS Listening Part sitemap: ${guideRoute}.`,
    ),
    ...(inventory.releaseMarkerIds ?? [])
      .filter((practiceId) => !catalogIds.includes(practiceId))
      .map((practiceId) => `IELTS Listening release marker references an uncatalogued practice: ${practiceId}.`),
  ];
}

const isDirectExecution = Boolean(process.argv[1])
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseMode = process.argv.includes('--release');
const failures = [];
const candidates = [];
const declaredAudioPaths = new Set();
const declaredMapPaths = new Set();
const declaredManifestPaths = new Set();
const declaredSourcePaths = new Set();

function resolveRepoPath(relativePath, label) {
  if (typeof relativePath !== 'string' || !relativePath.trim() || path.isAbsolute(relativePath)) {
    failures.push(`${label} must be a non-empty repository-relative path.`);
    return null;
  }
  const resolved = path.resolve(repoRoot, relativePath);
  if (!resolved.startsWith(`${repoRoot}${path.sep}`)) {
    failures.push(`${label} escapes the repository: ${relativePath}.`);
    return null;
  }
  return resolved;
}

function readRequiredText(relativePath, label) {
  const resolved = resolveRepoPath(relativePath, label);
  if (!resolved || !fs.existsSync(resolved)) {
    failures.push(`Missing ${label}: ${relativePath ?? 'undefined'}.`);
    return '';
  }
  return fs.readFileSync(resolved, 'utf8');
}

function readRequiredJson(relativePath, label) {
  const contents = readRequiredText(relativePath, label);
  if (!contents) return null;
  try {
    return JSON.parse(contents);
  } catch {
    failures.push(`Invalid JSON in ${label}: ${relativePath}.`);
    return null;
  }
}

const catalog = readRequiredJson('config/ielts-listening-practices.json', 'IELTS Listening public catalog');
const harnessConfig = readRequiredJson('config/ielts-superhub-harness.json', 'IELTS superhub harness config');
const registry = readRequiredText(
  'src/data/ielts/listening-practice-registry.server.ts',
  'IELTS Listening practice registry',
);

if (catalog?.schemaVersion !== 1 || !Array.isArray(catalog?.practices) || !catalog.practices.length) {
  failures.push('IELTS Listening public catalog must contain at least one schema v1 practice.');
}
if (!registry.startsWith("import 'server-only';")) failures.push('The practice registry lost its server-only boundary.');
if (/import\s*\(|ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock|toefl/i.test(registry)) {
  failures.push('The practice registry uses a dynamic or forbidden assessment source.');
}
if (
  !registry.includes('assertIeltsListeningRegistrationBundle')
  || !registry.includes('assertIeltsListeningRegistryCatalog')
  || !registry.includes('assertIeltsListeningScoringIdentity')
) {
  failures.push('The practice registry no longer reconciles adapters and the public release catalog.');
}

const registeredIds = [...registry.matchAll(/\['(welearn-listening-part-[1-4]-\d{3,})',\s*\{/g)]
  .map((match) => match[1]);
const catalogIds = Array.isArray(catalog?.practices)
  ? catalog.practices.map((practice) => practice?.practiceId).filter((id) => typeof id === 'string')
  : [];
const sitemap = readRequiredText('src/app/sitemap.ts', 'application sitemap');
if (
  new Set(registeredIds).size !== registeredIds.length
  || new Set(catalogIds).size !== catalogIds.length
  || registeredIds.length !== catalogIds.length
  || registeredIds.some((id) => !catalogIds.includes(id))
) {
  failures.push('The runtime registry and public release catalog are not one-to-one.');
}

for (const practice of Array.isArray(catalog?.practices) ? catalog.practices : []) {
  const practiceId = practice?.practiceId ?? 'unknown-practice';
  if (practice?.publication !== 'public') {
    failures.push(`Runtime catalog practice ${practiceId} must be public; drafts cannot enter the runtime registry.`);
  }
  if (![1, 2, 3, 4].includes(practice?.part) || !Number.isInteger(practice?.practiceNumber) || practice.practiceNumber <= 0) {
    failures.push(`Catalog identity is invalid for ${practiceId}.`);
  }
  const expectedId = `welearn-listening-part-${practice?.part}-${String(practice?.practiceNumber).padStart(3, '0')}`;
  if (practiceId !== expectedId) failures.push(`Catalog practice ID must be ${expectedId}.`);
  if (practice?.guideRoute !== `/practica/ielts/listening/part-${practice?.part}`) {
    failures.push(`Guide route is invalid for ${practiceId}.`);
  }
  const expectedGuidePath = `src/app/(site)/practica/ielts/listening/part-${practice?.part}/page.tsx`;
  if (practice?.guidePath !== expectedGuidePath) failures.push(`Guide path must be ${expectedGuidePath} for ${practiceId}.`);
  const expectedManifestPath = `docs/ielts-superhub/originality/${practiceId}.json`;
  if (practice?.manifestPath !== expectedManifestPath) failures.push(`Manifest path must be ${expectedManifestPath}.`);
  const expectedSessionRoute = `/practica/ielts/listening/sesion?practice=${practiceId}&part=${practice?.part}`;
  if (practice?.sessionRoute !== expectedSessionRoute) failures.push(`Session route is invalid for ${practiceId}.`);

  const manifest = readRequiredJson(practice?.manifestPath, `originality manifest for ${practiceId}`);
  const source = readRequiredText(practice?.sourcePath, `server source for ${practiceId}`);
  const guide = readRequiredText(practice?.guidePath, `guide page for ${practiceId}`);
  if (!manifest) continue;
  for (const [declaredPath, paths, label] of [
    [practice.manifestPath, declaredManifestPaths, 'manifest'],
    [practice.sourcePath, declaredSourcePaths, 'source'],
  ]) {
    if (paths.has(declaredPath)) failures.push(`Duplicate ${label} path in public catalog: ${declaredPath}.`);
    paths.add(declaredPath);
  }
  const sourceImport = typeof practice?.sourcePath === 'string' && practice.sourcePath.startsWith('src/')
    ? `@/${practice.sourcePath.slice(4).replace(/\.ts$/, '')}`
    : '';
  if (!sourceImport || !registry.includes(`from '${sourceImport}'`)) {
    failures.push(`Runtime registry does not statically import the catalog source for ${practiceId}.`);
  }
  if (manifest.practiceId !== practiceId || manifest.contentVersion !== practice?.contentVersion) {
    failures.push(`Catalog and manifest identity mismatch for ${practiceId}.`);
  }
  if (!source.startsWith("import 'server-only';")) failures.push(`The scoring source lost its server-only boundary for ${practiceId}.`);
  if (/ielts-set-\d+|data\/mocks\/index|getMock|loadIeltsMock|toefl/i.test(source)) {
    failures.push(`The source for ${practiceId} imports a forbidden assessment bank.`);
  }
  if (!source.includes(`id: '${practiceId}'`) || !source.includes(`contentVersion: '${manifest.contentVersion}'`)) {
    failures.push(`Source identity does not match the public catalog for ${practiceId}.`);
  }
  if (!source.includes(`part: ${practice.part}`) || !source.includes(`practiceNumber: ${practice.practiceNumber}`)) {
    failures.push(`Source part/practice number does not match the public catalog for ${practiceId}.`);
  }

  failures.push(...validateIeltsListeningMapAsset({
    root: repoRoot,
    practiceId,
    source,
    ownership: manifest.ownership,
    manifestMap: manifest.map,
    catalogMap: practice.map,
  }));
  if (typeof practice.map?.path === 'string') declaredMapPaths.add(practice.map.path);

  const expectedAudioPath = `public/audio/ielts/listening/${practiceId}.mp3`;
  if (manifest.audio?.path !== expectedAudioPath) failures.push(`Audio path must be ${expectedAudioPath}.`);
  if (declaredAudioPaths.has(manifest.audio?.path)) failures.push(`Duplicate audio path in public catalog: ${manifest.audio?.path}.`);
  declaredAudioPaths.add(manifest.audio?.path);
  const audioPath = resolveRepoPath(manifest.audio?.path, `audio path for ${practiceId}`);
  if (!audioPath || !fs.existsSync(audioPath)) {
    failures.push(`Missing original audio for ${practiceId}: ${manifest.audio?.path ?? 'undefined'}.`);
  } else {
    const buffer = fs.readFileSync(audioPath);
    const sha256 = createHash('sha256').update(buffer).digest('hex');
    if (buffer.length !== manifest.audio?.bytes) failures.push(`Audio size drift for ${practiceId}: ${buffer.length} != ${manifest.audio?.bytes}.`);
    if (sha256 !== manifest.audio?.sha256) failures.push(`Audio checksum drift for ${practiceId}: ${sha256} != ${manifest.audio?.sha256}.`);
    failures.push(...validateIeltsListeningAudioMetadata({ practiceId, source, manifestAudio: manifest.audio, buffer }));
  }

  const generator = readRequiredText(manifest.audio?.generator, `audio generator for ${practiceId}`);
  const renderer = readRequiredText(manifest.audio?.renderer, `audio renderer for ${practiceId}`);
  if (!generator || !renderer) failures.push(`Audio generation chain is incomplete for ${practiceId}.`);
  if (generator && /run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/.test(generator)) {
    failures.push(`The audio generator for ${practiceId} references restricted macOS system voices.`);
  }
  if (manifest.ownership?.borrowedQuestions || manifest.ownership?.borrowedTranscript || manifest.ownership?.borrowedAudio) {
    failures.push(`The originality manifest declares borrowed assessment material for ${practiceId}.`);
  }
  if (manifest.audio?.rightsReview?.status !== 'documented-open-licence') {
    failures.push(`The audio has no documented open-licence rights review for ${practiceId}.`);
  }
  if (manifest.audio?.voiceModel?.datasetLicense !== 'CC-BY-4.0' || !manifest.audio?.voiceModel?.modelCard) {
    failures.push(`The voice model is missing its CC BY 4.0 model-card evidence for ${practiceId}.`);
  }
  if (
    manifest.audio?.engine?.license !== 'GPL-3.0-or-later'
    || !/^[a-f0-9]{40}$/.test(manifest.audio?.voiceModel?.repositoryCommit ?? '')
    || !manifest.audio?.voiceModel?.modelCard?.includes(manifest.audio?.voiceModel?.repositoryCommit)
    || !/^[a-f0-9]{64}$/.test(manifest.audio?.voiceModel?.modelCardSha256 ?? '')
    || !Number.isInteger(manifest.audio?.voiceModel?.modelCardBytes)
    || manifest.audio.voiceModel.modelCardBytes <= 0
  ) {
    failures.push(`The Piper engine SPDX or commit-pinned model-card evidence is incomplete for ${practiceId}.`);
  }

  const attributionRelativePath = manifest.audio?.rightsReview?.attributionLocation;
  const attributionPage = readRequiredText(attributionRelativePath, `public attribution page for ${practiceId}`);
  if (attributionRelativePath !== practice?.guidePath) {
    failures.push(`Manifest attribution location and catalog guide differ for ${practiceId}.`);
  }
  if (
    !attributionPage.includes(manifest.audio?.voiceModel?.modelCard ?? '__missing_model_card__')
    || !attributionPage.includes(manifest.audio?.voiceModel?.licenseUrl ?? '__missing_license_url__')
  ) {
    failures.push(`The public guide is missing required voice-model attribution links for ${practiceId}.`);
  }
  if (!guide.includes(practiceId)) failures.push(`The public guide does not link its registered practice ${practiceId}.`);
  if (!sitemap.includes(practice.guideRoute)) failures.push(`The sitemap is missing the guide route for ${practiceId}.`);

  const publicFiles = Array.isArray(practice?.publicSurfacePaths)
    ? practice.publicSurfacePaths.map((relativePath) => {
      const contents = readRequiredText(relativePath, `public release surface for ${practiceId}`);
      const releaseBlocks = extractListeningReleaseBlocks(contents, practiceId);
      if (!releaseBlocks.length) {
        failures.push(`Public release surface ${relativePath} has no scoped marker for ${practiceId}.`);
      }
      return { path: relativePath, contents: releaseBlocks.join('\n') };
    })
    : [];
  if (!publicFiles.length) failures.push(`No public release surfaces are declared for ${practiceId}.`);
  if (!practice?.publicSurfacePaths?.includes(practice?.guidePath)) {
    failures.push(`Public release surfaces do not contain the guide for ${practiceId}.`);
  }
  failures.push(...validateListeningReleaseApproval({
    release: manifest.release,
    editorialState: harnessConfig?.editorialState?.[practice?.editorialStateKey],
    publicFiles,
    forbiddenApprovedLabels: practice?.forbiddenApprovedLabels,
    releaseMode,
  }).map((failure) => `${practiceId}: ${failure}`));

  candidates.push({
    practiceId,
    durationSeconds: manifest.audio?.durationSeconds,
    sha256: manifest.audio?.sha256 ?? '',
  });
}

const publicationInventory = collectIeltsListeningPublicationInventory(repoRoot, sitemap);
failures.push(...findIeltsListeningInversePublicationFailures({
  catalogPractices: catalog?.practices,
  catalogAudioPaths: [...declaredAudioPaths].filter((audioPath) => typeof audioPath === 'string'),
  catalogMapPaths: [...declaredMapPaths],
  inventory: publicationInventory,
}));

if (failures.length) {
  console.error(`IELTS Listening public registry ${releaseMode ? 'release' : 'candidate'} gate: BLOCK`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`IELTS Listening public registry ${releaseMode ? 'release' : 'candidate'} gate: PASS`);
  for (const candidate of candidates) {
    console.log(`- ${candidate.practiceId} · ${candidate.durationSeconds}s · ${candidate.sha256.slice(0, 12)}…`);
  }
}
}
