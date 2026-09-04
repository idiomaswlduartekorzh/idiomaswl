import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import { assertIeltsSpeakingPart1PrivateBank } from '../src/lib/ielts/speaking-part1-private-contract.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'src/data/ielts/speaking-part1-welearn-001.server.ts');
const contractPath = path.join(root, 'src/lib/ielts/speaking-part1-private-contract.ts');
const manifestPath = path.join(
  root,
  'docs/ielts-superhub/originality/welearn-speaking-part-1-001.json',
);

const TOPIC_PACKS = [
  {
    id: 'seat-choices',
    label: 'Choosing seats',
    transition: "First, let's talk about choosing seats.",
    prompts: [
      'When seats are not assigned, how do you choose where to sit?',
      'In places you visit regularly, do you usually choose the same seat?',
      'What makes one seat more comfortable for you than another?',
      'Has the kind of seat you prefer changed over time?',
    ],
  },
  {
    id: 'indoor-light',
    label: 'Light where you live',
    transition: "Now let's talk about light where you live.",
    prompts: [
      'Which room where you live gets the best natural light?',
      'Do you prefer bright or soft light when you are relaxing?',
      'At what time of day do you usually switch on the lights?',
      'Have you changed the lighting in a room recently?',
    ],
  },
  {
    id: 'bags-and-pockets',
    label: 'Bags and pockets',
    transition: "Let's talk about the things you carry each day.",
    prompts: [
      'When you leave home, do you put most things in a bag or in your pockets?',
      'Which item do you check for before you go out?',
      'Is it easy for you to find things after you have packed them?',
      'Has the way you carry everyday items changed over time?',
    ],
  },
  {
    id: 'signs-and-labels',
    label: 'Signs and labels',
    transition: "Let's talk about signs and labels.",
    prompts: [
      'Which kinds of signs are easiest for you to notice?',
      'Do you usually read a label before you buy or use something?',
      'Is there a useful sign near a place you visit regularly?',
      'On a sign, do you understand pictures or words more quickly?',
    ],
  },
  {
    id: 'small-repairs',
    label: 'Small repairs',
    transition: "Let's talk about small repairs.",
    prompts: [
      'When something small breaks, do you try to fix it yourself?',
      'Which kinds of repairs do you prefer to leave to someone else?',
      'Has anyone shown you how to repair an everyday object?',
      'What simple repair would you like to learn?',
    ],
  },
  {
    id: 'short-waits',
    label: 'Short waits',
    transition: "Let's talk about short waits.",
    prompts: [
      'In which part of your day do you most often have to wait?',
      'What do you usually do when the wait will be short?',
      'Would you rather wait indoors or outdoors?',
      'Are you more patient about waiting now than in the past?',
    ],
  },
];

const TOP_LEVEL_KEYS = [
  'schemaVersion',
  'bankId',
  'contentVersion',
  'part',
  'locale',
  'title',
  'responseKind',
  'practiceDisclosure',
  'format',
  'boundaries',
  'topicPacks',
  'pilotRecipe',
].sort();

const FUTURE_CANONICAL_ROUTE = '/practica/ielts/speaking/part-1';
const FUTURE_HUB_ROUTE = '/practica/ielts/speaking';
const FORBIDDEN_ROUTES = [
  '/practica/ielts/speaking/part1',
  '/practica/ielts/speaking/task-1',
  '/practica/ielts/speaking/part-1/practice-1',
  '/practica/ielts/speaking/part-1/topics',
  '/practica/ielts/speaking/part-1/seat-choices',
  '/practica/ielts/speaking/part-1/indoor-light',
  '/practica/ielts/speaking/part-1/answers',
  '/practica/ielts/speaking/part-1/model-answers',
  '/practica/ielts/speaking/part-1/band-score',
  '/practica/ielts/speaking/part-1/ai-score',
];

const EXPECTED_OFFICIAL_SOURCES = [
  {
    kind: 'speaking-format',
    url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking',
    observedConstraint: 'Speaking Part 1 is a four-to-five-minute introduction and interview using familiar topics.',
  },
  {
    kind: 'band-descriptors-boundary',
    url: 'https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf',
    observedConstraint: 'The official descriptors are reference material only; this private text candidate performs no assessment and predicts no band.',
  },
];

const EXPECTED_OWNERSHIP = {
  author: 'Idiomas WeLearn',
  status: 'draft-original-independent-practice',
  borrowedQuestions: false,
  borrowedAnswers: false,
  borrowedAudio: false,
  trademarkDisclosure: 'IELTS is a protected trademark. This independent practice resource is not affiliated with or endorsed by its owners.',
};

const EXPECTED_RELEASE = {
  status: 'private-candidate',
  publicReleaseAllowed: false,
  blockers: [
    'Complete human editorial, fairness and originality review.',
    'Design and audit a public text-only renderer without response capture or assessment.',
    'Promote the source, canonical route, navigation and indexing controls atomically.',
    'Keep topic-pack, answer, band-score and AI-score routes blocked.',
  ],
  approvedBy: null,
  approvedAt: null,
};

// Private-stage freeze, not a general rewrite parser. Any routing change needs review.
const ROUTING_CONTROL_SHA256 = {
  'next.config.ts': '640097c5de4a6e66b7b6daa1e18bdf1884d6309b8ec58ff579d5df135593b38f',
  'src/proxy.ts': 'bb7e5197d373ed4fc73e12e83c8e5e35722c4017364adecba92c840d0c4c6d90',
  'vercel.json': 'e4943b7d584334d24e6648f75098599ecae0e0eef70358860a94d4e56e077e6d',
};

function unwrapExpression(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isSatisfiesExpression(current)
    || ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(node, label) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  throw new TypeError(`${label} has a non-static property name.`);
}

function staticValue(node, label = 'value') {
  const current = unwrapExpression(node);
  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) {
    return current.text;
  }
  if (ts.isNumericLiteral(current)) return Number(current.text);
  if (current.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (current.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (current.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(current) && current.operator === ts.SyntaxKind.MinusToken) {
    return -staticValue(current.operand, label);
  }
  if (ts.isArrayLiteralExpression(current)) {
    assert.equal(
      current.elements.some((element) => ts.isSpreadElement(element)),
      false,
      `${label} must not use array spreads`,
    );
    return current.elements.map((element, index) => staticValue(element, `${label}[${index}]`));
  }
  if (ts.isObjectLiteralExpression(current)) {
    const result = {};
    for (const property of current.properties) {
      assert.ok(ts.isPropertyAssignment(property), `${label} must only use property assignments`);
      const key = propertyName(property.name, label);
      assert.equal(Object.hasOwn(result, key), false, `${label}.${key} must be unique`);
      result[key] = staticValue(property.initializer, `${label}.${key}`);
    }
    return result;
  }
  throw new TypeError(`${label} must be composed only of static literals (found ${ts.SyntaxKind[current.kind]}).`);
}

function readPrivateText(filePath, projectRoot = root) {
  const relativePath = path.relative(projectRoot, filePath);
  assert.equal(relativePath.startsWith('..') || path.isAbsolute(relativePath), false);
  let current = projectRoot;
  for (const segment of relativePath.split(path.sep)) {
    current = path.join(current, segment);
    assert.equal(fs.lstatSync(current).isSymbolicLink(), false, 'private source and manifest must not use symlinks');
  }
  assert.equal(fs.lstatSync(filePath).isFile(), true);
  return fs.readFileSync(filePath, 'utf8');
}

function readStaticBank() {
  const sourceText = readPrivateText(sourcePath);
  const sourceFile = ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  assert.equal(sourceFile.parseDiagnostics.length, 0, 'candidate source must parse without errors');
  const declarations = sourceFile.statements.flatMap((statement) => {
    if (!ts.isVariableStatement(statement)) return [];
    return statement.declarationList.declarations.filter(
      (declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'BANK',
    );
  });
  assert.equal(declarations.length, 1, 'candidate must declare exactly one BANK');
  assert.ok(
    (declarations[0].parent.flags & ts.NodeFlags.Const) !== 0,
    'BANK must be a const declaration',
  );
  assert.ok(declarations[0].initializer, 'BANK must have an initializer');
  return { bank: staticValue(declarations[0].initializer, 'BANK'), sourceFile, sourceText };
}

function assertCanonicalSourceModuleShape(sourceFile) {
  assert.equal(sourceFile.statements.length, 5, 'candidate module must contain exactly five statements');
  const [serverOnlyImport, contractImport, bankStatement, assertionStatement, getterStatement] =
    sourceFile.statements;

  assert.ok(ts.isImportDeclaration(serverOnlyImport));
  assert.equal(serverOnlyImport.importClause, undefined);
  assert.equal(serverOnlyImport.moduleSpecifier.text, 'server-only');

  assert.ok(ts.isImportDeclaration(contractImport));
  assert.equal(contractImport.moduleSpecifier.text, '@/lib/ielts/speaking-part1-private-contract');
  assert.ok(contractImport.importClause);
  assert.equal(contractImport.importClause.name, undefined);
  assert.ok(ts.isNamedImports(contractImport.importClause.namedBindings));
  assert.deepEqual(
    contractImport.importClause.namedBindings.elements.map((element) => ({
      name: element.name.text,
      imported: element.propertyName?.text ?? element.name.text,
      typeOnly: element.isTypeOnly,
    })),
    [
      {
        name: 'assertIeltsSpeakingPart1PrivateBank',
        imported: 'assertIeltsSpeakingPart1PrivateBank',
        typeOnly: false,
      },
      {
        name: 'IeltsSpeakingPart1PrivateBank',
        imported: 'IeltsSpeakingPart1PrivateBank',
        typeOnly: true,
      },
    ],
  );

  assert.ok(ts.isVariableStatement(bankStatement));
  assert.equal(bankStatement.modifiers, undefined);
  assert.equal(bankStatement.declarationList.declarations.length, 1);
  assert.ok((bankStatement.declarationList.flags & ts.NodeFlags.Const) !== 0);
  assert.equal(bankStatement.declarationList.declarations[0].name.text, 'BANK');

  assert.ok(ts.isExpressionStatement(assertionStatement));
  assert.ok(ts.isCallExpression(assertionStatement.expression));
  assert.ok(ts.isIdentifier(assertionStatement.expression.expression));
  assert.equal(assertionStatement.expression.expression.text, 'assertIeltsSpeakingPart1PrivateBank');
  assert.equal(assertionStatement.expression.arguments.length, 1);
  assert.ok(ts.isIdentifier(assertionStatement.expression.arguments[0]));
  assert.equal(assertionStatement.expression.arguments[0].text, 'BANK');

  assert.ok(ts.isFunctionDeclaration(getterStatement));
  assert.equal(getterStatement.asteriskToken, undefined, 'getter must not be a generator');
  assert.equal(getterStatement.name?.text, 'getIeltsSpeakingPart1PrivateBank');
  assert.deepEqual(
    getterStatement.modifiers?.map((modifier) => modifier.kind),
    [ts.SyntaxKind.ExportKeyword],
  );
  assert.equal(getterStatement.parameters.length, 0);
  assert.equal(getterStatement.typeParameters, undefined);
  assert.ok(getterStatement.body);
  assert.equal(getterStatement.body.statements.length, 1);
  assert.ok(ts.isReturnStatement(getterStatement.body.statements[0]));
  assert.ok(ts.isIdentifier(getterStatement.body.statements[0].expression));
  assert.equal(getterStatement.body.statements[0].expression.text, 'BANK');
}

function normalizedWordCount(value) {
  return value.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)?.length ?? 0;
}

function clone(value) {
  return structuredClone(value);
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  assert.equal(fs.lstatSync(directory).isSymbolicLink(), false, 'audit tree must not use symlinks');
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    assert.equal(entry.isSymbolicLink(), false, 'audit tree must not use symlinks');
    return entry.isDirectory() ? walkFiles(absolutePath) : [absolutePath];
  });
}

function textEntries(directory) {
  return walkFiles(directory).flatMap((filePath) => {
    if (/\.(?:[cm]?[jt]sx?|css|csv|html?|json|mdx?|svg|txt|xml|webmanifest|ya?ml|vtt|srt)$/i.test(filePath)) {
      return [{ filePath, content: fs.readFileSync(filePath, 'utf8') }];
    }
    const fd = fs.openSync(filePath, 'r');
    const sample = Buffer.alloc(4096);
    let count;
    try {
      count = fs.readSync(fd, sample, 0, sample.length, 0);
    } finally {
      fs.closeSync(fd);
    }
    const prefix = sample.subarray(0, count);
    if (prefix.includes(0)) return [];
    try {
      new TextDecoder('utf-8', { fatal: true }).decode(prefix, { stream: true });
    } catch {
      return [];
    }
    return [{ filePath, content: fs.readFileSync(filePath, 'utf8') }];
  });
}

function decodedModuleSpecifiers(content, filePath) {
  if (!/\.(?:[cm]?[jt]sx?)$/i.test(filePath)) return [];
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    /x$/i.test(filePath) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const specifiers = [];
  const visit = (node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
      && node.moduleSpecifier
      && ts.isStringLiteralLike(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    } else if (
      ts.isImportEqualsDeclaration(node)
      && ts.isExternalModuleReference(node.moduleReference)
      && node.moduleReference.expression
      && ts.isStringLiteralLike(node.moduleReference.expression)
    ) {
      specifiers.push(node.moduleReference.expression.text);
    } else if (
      ts.isCallExpression(node)
      && (node.expression.kind === ts.SyntaxKind.ImportKeyword
        || (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
      && node.arguments.length >= 1
      && ts.isStringLiteralLike(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return specifiers;
}

function runtimeEntries(projectRoot) {
  return ['src', 'app', 'pages'].flatMap((directory) => textEntries(path.join(projectRoot, directory)));
}

function findPrivateLeaks(entries, allowedPaths = new Set()) {
  const markers = [
    'speaking-part1-welearn-001',
    'welearn-speaking-part-1-bank-001',
    'welearn-speaking-part-1-001',
    'Small Everyday Choices',
    ...TOPIC_PACKS.flatMap((pack) => pack.prompts),
  ];
  return entries.flatMap(({ filePath, content }) => {
    if (allowedPaths.has(path.resolve(filePath))) return [];
    const rawLeak = markers.some((marker) => content.includes(marker));
    const decodedImportLeak = decodedModuleSpecifiers(content, filePath)
      .some((specifier) => markers.some((marker) => specifier.includes(marker)));
    return rawLeak || decodedImportLeak ? [filePath] : [];
  });
}

function appRouteForEntry(relativeAppPath) {
  const normalizedPath = relativeAppPath.split(path.sep).join('/');
  const segments = normalizedPath.split('/');
  const fileName = segments.pop() ?? '';
  if (!/^(?:page|route)\.(?:[cm]?[jt]sx?|mdx)$/i.test(fileName)) return null;
  const urlSegments = [];
  for (const rawSegment of segments) {
    if (rawSegment.startsWith('@')) continue;
    if (/^\([^.]?.*\)$/.test(rawSegment)) continue;
    let segment = rawSegment;
    const rootInterceptor = /^\(\.\.\.\)(.+)$/.exec(segment);
    if (rootInterceptor) {
      urlSegments.length = 0;
      segment = rootInterceptor[1];
    } else {
      const parentInterceptor = /^((?:\(\.\.\))+)(.+)$/.exec(segment);
      if (parentInterceptor) {
        const levels = [...parentInterceptor[1].matchAll(/\(\.\.\)/g)].length;
        urlSegments.splice(Math.max(0, urlSegments.length - levels));
        segment = parentInterceptor[2];
      } else {
        const sameLevelInterceptor = /^\(\.\)(.+)$/.exec(segment);
        if (sameLevelInterceptor) segment = sameLevelInterceptor[1];
      }
    }
    urlSegments.push(segment);
  }
  return `/${urlSegments.join('/')}`;
}

function pagesRouteForEntry(relativePagesPath) {
  const normalizedPath = relativePagesPath.split(path.sep).join('/');
  if (!/\.(?:[jt]sx?)$/i.test(normalizedPath)) return null;
  const withoutExtension = normalizedPath.replace(/\.(?:[jt]sx?)$/i, '');
  const segments = withoutExtension.split('/');
  const fileName = segments.at(-1) ?? '';
  if (/^_(?:app|document|error)$/.test(fileName)) return null;
  if (fileName === 'index') segments.pop();
  return `/${segments.join('/')}`;
}

function routePatternTouchesTree(pattern, protectedRoot) {
  const patternSegments = pattern.split('/').filter(Boolean);
  const protectedSegments = protectedRoot.split('/').filter(Boolean);
  for (let index = 0; index < protectedSegments.length; index += 1) {
    const segment = patternSegments[index];
    if (segment === undefined) return false;
    if (/^\[\[?\.\.\./.test(segment)) return true;
    if (!/^\[[^\]]+\]$/.test(segment) && segment !== protectedSegments[index]) return false;
  }
  return true;
}

function routeEntries(projectRoot) {
  const appRoots = [path.join(projectRoot, 'src/app'), path.join(projectRoot, 'app')];
  const pagesRoots = [path.join(projectRoot, 'src/pages'), path.join(projectRoot, 'pages')];
  const appEntries = appRoots.flatMap((appRoot) => walkFiles(appRoot).flatMap((filePath) => {
    const relativePath = path.relative(appRoot, filePath);
    const route = appRouteForEntry(relativePath);
    return route === null ? [] : [{ filePath, route }];
  }));
  const pagesEntries = pagesRoots.flatMap((pagesRoot) =>
    walkFiles(pagesRoot).flatMap((filePath) => {
      const relativePath = path.relative(pagesRoot, filePath);
      const route = pagesRouteForEntry(relativePath);
      return route === null ? [] : [{ filePath, route }];
    }));
  return [...appEntries, ...pagesEntries];
}

function routeTopologyLeaks(projectRoot) {
  return routeEntries(projectRoot).filter(({ route }) =>
    routePatternTouchesTree(route, FUTURE_HUB_ROUTE)
    || [FUTURE_CANONICAL_ROUTE, ...FORBIDDEN_ROUTES]
      .some((protectedRoute) => routePatternTouchesTree(route, protectedRoute)));
}

function configurationEntries(projectRoot) {
  const rootEntries = fs.readdirSync(projectRoot, { withFileTypes: true }).flatMap((entry) => {
    if (!/^(?:next\.config\.|vercel\.json$|middleware\.|proxy\.)/i.test(entry.name)) return [];
    assert.equal(entry.isFile(), true, 'routing control must be a regular file');
    return [path.join(projectRoot, entry.name)];
  });
  const srcRoot = path.join(projectRoot, 'src');
  const srcEntries = fs.existsSync(srcRoot)
    ? fs.readdirSync(srcRoot).filter((name) => /^(?:middleware|proxy)\./i.test(name))
      .map((name) => path.join(srcRoot, name)) : [];
  return [...new Set([...rootEntries, ...srcEntries])]
    .map((filePath) => {
      assert.equal(fs.lstatSync(filePath).isFile(), true, 'routing control must be a regular file');
      return { filePath, content: fs.readFileSync(filePath, 'utf8') };
    });
}

function assertRoutingControlsUnchanged(entries, projectRoot) {
  assert.deepEqual(Object.fromEntries(entries.map(({ filePath, content }) => [
    path.relative(projectRoot, filePath).split(path.sep).join('/'),
    createHash('sha256').update(content).digest('hex'),
  ])), ROUTING_CONTROL_SHA256, 'private-stage routing controls changed; independent review required');
}

function routeConfigurationLeaks(entries) {
  const protectedRoutes = [FUTURE_HUB_ROUTE, FUTURE_CANONICAL_ROUTE, ...FORBIDDEN_ROUTES];
  return entries.flatMap(({ filePath, content }) =>
    protectedRoutes.some((route) => content.includes(route)) ? [filePath] : []);
}

test('the candidate is a server-only static literal checked by the fail-closed contract', () => {
  const { bank, sourceFile, sourceText } = readStaticBank();
  assert.doesNotThrow(() => assertIeltsSpeakingPart1PrivateBank(bank));
  assert.deepEqual(Object.keys(bank).sort(), TOP_LEVEL_KEYS);
  assertCanonicalSourceModuleShape(sourceFile);

  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  assert.equal(imports.length, 2);
  assert.equal(imports[0].moduleSpecifier.text, 'server-only');
  assert.equal(imports[1].moduleSpecifier.text, '@/lib/ielts/speaking-part1-private-contract');
  assert.doesNotMatch(
    sourceText,
    /(?:recorder|mediarecorder|submission|storage|delegated-review|fetch\s*\(|scoreIelts|bandPrediction)/i,
  );
  assert.doesNotMatch(sourceText, /(?:https?:\/\/|\/api\/|\/audio\/|\.mp3|\.wav)/i);
});

test('the bank seals six four-question packs and the exact eight-question pilot recipe', () => {
  const { bank } = readStaticBank();
  assert.equal(bank.topicPacks.length, 6);
  assert.deepEqual(
    bank.topicPacks.map(({ id, label, transition, questions }) => ({
      id,
      label,
      transition,
      prompts: questions.map((question) => question.prompt),
    })),
    TOPIC_PACKS,
  );

  assert.deepEqual(
    bank.topicPacks.map((pack) =>
      pack.questions.map(({ id, order }) => ({ id, order }))),
    TOPIC_PACKS.map((pack) =>
      pack.prompts.map((__, index) => ({
        id: `${pack.id}-q${index + 1}`,
        order: index + 1,
      }))),
  );

  const questions = bank.topicPacks.flatMap((pack) => pack.questions);
  assert.equal(questions.length, 24);
  assert.equal(new Set(questions.map((question) => question.id)).size, 24);
  assert.equal(new Set(questions.map((question) => question.prompt)).size, 24);
  assert.equal(questions.every((question) => normalizedWordCount(question.prompt) >= 7), true);
  assert.equal(questions.every((question) => normalizedWordCount(question.prompt) <= 18), true);
  assert.deepEqual(bank.pilotRecipe, {
    practiceId: 'welearn-speaking-part-1-001',
    practiceNumber: 1,
    topicPackIds: ['seat-choices', 'indoor-light'],
  });
  const pilotQuestions = bank.pilotRecipe.topicPackIds.flatMap((id) =>
    bank.topicPacks.find((pack) => pack.id === id).questions);
  assert.equal(pilotQuestions.length, 8);
});

test('literal privacy boundaries omit identity checks and deny every stateful or evaluative capability', () => {
  const { bank } = readStaticBank();
  assert.deepEqual(bank.format, {
    officialPartDurationSeconds: [240, 300],
    publicQuestionCountRule: 'not-fixed',
    practiceComposition: 'two-topic-packs',
  });
  assert.deepEqual(bank.boundaries, {
    artifactMode: 'private-text-only',
    identityCheck: 'omitted',
    personalDataCollection: 'none',
    responseCapture: 'none',
    persistence: 'none',
    networkTransfer: 'none',
    assessment: 'none',
    feedback: 'none',
    modelAnswers: 'none',
  });
  assert.equal(bank.responseKind, 'open-response');
  assert.equal(
    bank.practiceDisclosure,
    'Independent WeLearn text practice. It omits the identity check, records no response and does not produce an IELTS band score.',
  );
  assert.doesNotMatch(
    JSON.stringify(bank.topicPacks),
    /(?:full name|surname|e-?mail|phone number|home address|passport|date of birth|band score|model answer|sample answer|correct answer)/i,
  );
});

function assertManifest(manifest, bank) {
  assert.deepEqual(Object.keys(manifest).sort(), [
    'schemaVersion',
    'artifactId',
    'practiceId',
    'contentVersion',
    'createdAt',
    'artifactKind',
    'ownership',
    'officialSources',
    'scope',
    'originalitySearch',
    'boundaries',
    'seoPlan',
    'release',
  ].sort());
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.artifactId, bank.bankId);
  assert.equal(manifest.practiceId, bank.pilotRecipe.practiceId);
  assert.equal(manifest.contentVersion, bank.contentVersion);
  assert.equal(manifest.createdAt, '2026-09-01');
  assert.equal(manifest.artifactKind, 'private-text-only');
  assert.deepEqual(manifest.ownership, EXPECTED_OWNERSHIP);
  assert.deepEqual(manifest.officialSources, EXPECTED_OFFICIAL_SOURCES);
  assert.deepEqual(manifest.scope, {
    part: bank.part,
    locale: bank.locale,
    title: bank.title,
    topicPackCount: 6,
    questionsPerPack: 4,
    questionCount: 24,
    pilotTopicPackIds: bank.pilotRecipe.topicPackIds,
    pilotQuestionCount: 8,
    officialPartDurationSeconds: [240, 300],
  });
  assert.deepEqual(manifest.originalitySearch, {
    status: 'completed-research-agent-review',
    checkedAt: '2026-09-01',
    questionCount: 24,
    exactQuestionQueriesChecked: 24,
    exactQuestionMatchesFound: 0,
    result: 'No exact-match collision was observed for any of the 24 independently authored questions in the recorded research pass.',
    caveat: 'Search coverage is a collision signal, not a legal conclusion or a substitute for final human editorial and originality review.',
  });
  assert.deepEqual(manifest.boundaries, bank.boundaries);

  assert.deepEqual(manifest.seoPlan, {
    futureCanonicalPath: FUTURE_CANONICAL_ROUTE,
    futureHubPath: FUTURE_HUB_ROUTE,
    packPagesAllowed: false,
    sessionIndexingAllowed: false,
    forbiddenRoutes: FORBIDDEN_ROUTES,
  });
  assert.deepEqual(manifest.release, EXPECTED_RELEASE);
}

test('the originality manifest matches the source, remains private and blocks route fragmentation', () => {
  const { bank } = readStaticBank();
  assertManifest(JSON.parse(readPrivateText(manifestPath)), bank);
});

test('the candidate has no runtime, route, catalogue, sitemap or public footprint', () => {
  const allowed = new Set([path.resolve(sourcePath), path.resolve(contractPath)]);
  const srcEntries = runtimeEntries(root);
  const publicEntries = textEntries(path.join(root, 'public'));
  const srcLeaks = findPrivateLeaks(srcEntries, allowed);
  assert.deepEqual(srcLeaks, []);
  assert.deepEqual(routeConfigurationLeaks(srcEntries), []);
  const publicLeaks = findPrivateLeaks(publicEntries);
  assert.deepEqual(publicLeaks, []);
  assert.deepEqual(routeConfigurationLeaks(publicEntries), []);
  const configEntries = configurationEntries(root);
  assertRoutingControlsUnchanged(configEntries, root);
  assert.deepEqual(findPrivateLeaks(textEntries(path.join(root, 'config'))), []);
  assert.deepEqual(findPrivateLeaks(configEntries), []);
  assert.deepEqual(routeConfigurationLeaks(configEntries), []);
  assert.deepEqual(routeTopologyLeaks(root), []);

  const publicAssetLeaks = walkFiles(path.join(root, 'public')).filter((filePath) =>
    /welearn-speaking-part-1-(?:bank-)?001|speaking-part1-welearn-001/i.test(filePath));
  assert.deepEqual(publicAssetLeaks, []);
});

test('the contract fails closed for unknown fields, PII, assessment, answers and recipe drift', () => {
  const { bank } = readStaticBank();

  const unknownField = clone(bank);
  unknownField.experimental = true;
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(unknownField),
    /missing or unknown fields/i,
  );

  const pii = clone(bank);
  pii.topicPacks[0].questions[0].prompt = 'What is your full name and passport number?';
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(pii),
    /personal identifying data/i,
  );

  const band = clone(bank);
  band.topicPacks[0].questions[0].prompt = 'Which IELTS band score would you like to receive?';
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(band),
    /assessment or model-answer content/i,
  );

  const answer = clone(bank);
  answer.topicPacks[0].questions[0].prompt = 'Which model answer should a learner copy in this task?';
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(answer),
    /assessment or model-answer content/i,
  );

  const invalidRecipe = clone(bank);
  invalidRecipe.pilotRecipe.topicPackIds = ['seat-choices', 'bags-and-pockets'];
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(invalidRecipe),
    /pilotRecipe\.topicPackIds/i,
  );

  const invalidOrder = clone(bank);
  invalidOrder.topicPacks[0].questions[0].order = 2;
  assert.throws(
    () => assertIeltsSpeakingPart1PrivateBank(invalidOrder),
    /question 1\.order/i,
  );

  for (const invalidPrompt of [
    'Where exactly do you live when you are studying?',
    'What is the name of another person you contact?',
    'What is your employer name at the moment?',
  ]) {
    const sensitive = clone(bank);
    sensitive.topicPacks[0].questions[0].prompt = invalidPrompt;
    assert.throws(
      () => assertIeltsSpeakingPart1PrivateBank(sensitive),
      /personal identifying data/i,
    );
  }

  for (const invalidPrompt of [
    'Would you choose this seat?\nExplain your choice?',
    'Would you choose the seat shown in <strong>this room</strong>?',
    'Would you open https://example.com before choosing your seat?',
  ]) {
    const unsafeMarkup = clone(bank);
    unsafeMarkup.topicPacks[0].questions[0].prompt = invalidPrompt;
    assert.throws(
      () => assertIeltsSpeakingPart1PrivateBank(unsafeMarkup),
      /one line|HTML or URLs/i,
    );
  }
});

test('mutation sentinels decode static modules and detect routes and copied public candidates', (context) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-speaking-part1-isolation-'));
  context.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const importPath = path.join(fixtureRoot, 'src/import-decoy.ts');
  const exportPath = path.join(fixtureRoot, 'src/export-decoy.ts');
  const dynamicPath = path.join(fixtureRoot, 'src/dynamic-decoy.ts');
  const genericRoutePath = path.join(
    fixtureRoot,
    'src/app/practica/ielts/speaking/part-1/page.tsx',
  );
  const publicPath = path.join(fixtureRoot, 'public/speaking-candidate.txt');
  fs.mkdirSync(path.dirname(importPath), { recursive: true });
  fs.mkdirSync(path.dirname(genericRoutePath), { recursive: true });
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(
    importPath,
    String.raw`import candidate from '@/data/ielts/speaking-part1-welearn-00\u0031.server';`,
  );
  fs.writeFileSync(
    exportPath,
    String.raw`export { default } from '@/data/ielts/speaking-part1-welearn-00\u0031.server';`,
  );
  fs.writeFileSync(
    dynamicPath,
    String.raw`const candidate = import('@/data/ielts/speaking-part1-welearn-00\u0031.server');`,
  );
  fs.writeFileSync(genericRoutePath, 'export default function Page() { return null; }\n');
  fs.writeFileSync(publicPath, 'welearn-speaking-part-1-001\nSmall Everyday Choices\n');

  assert.deepEqual(
    findPrivateLeaks(textEntries(path.join(fixtureRoot, 'src'))).sort(),
    [dynamicPath, exportPath, importPath].sort(),
  );
  assert.deepEqual(routeTopologyLeaks(fixtureRoot), [
    { filePath: genericRoutePath, route: FUTURE_CANONICAL_ROUTE },
  ]);
  assert.deepEqual(findPrivateLeaks(textEntries(path.join(fixtureRoot, 'public'))), [publicPath]);
});

test('mutation sentinels reject escaped require, continued strings and import options', () => {
  const filePath = path.join(root, 'src/mutation.ts');
  for (const content of [
    String.raw`require('@/data/ielts/speaking-part1-welearn-00\u0031.server');`,
    String.raw`require('@/data/ielts/speaking-part1-welearn-00\
1.server');`,
    String.raw`import('@/data/ielts/speaking-part1-welearn-00\u0031.server', { with: {} });`,
    String.raw`import candidate = require('@/data/ielts/speaking-part1-welearn-00\u0031.server');`,
  ]) {
    assert.deepEqual(findPrivateLeaks([{ filePath, content }]), [filePath]);
  }
});

test('route intersection rejects dynamic descendants and interceptors without blocking unrelated trees', () => {
  for (const pattern of [
    '/practica/ielts/speaking/[part]/record',
    '/practica/[exam]/speaking/[part]/record',
    '/practica/ielts/[...skill]',
    '/practica/ielts/[[...skill]]',
    '/[...all]',
    FUTURE_HUB_ROUTE,
    FUTURE_CANONICAL_ROUTE,
  ]) assert.equal(routePatternTouchesTree(pattern, FUTURE_HUB_ROUTE), true, pattern);
  for (const pattern of [
    '/practica/ielts',
    '/practica/ielts/listening/[part]/record',
    '/practica/toefl/[...parts]',
    '/practica/ielts/speaking-guide',
  ]) assert.equal(routePatternTouchesTree(pattern, FUTURE_HUB_ROUTE), false, pattern);
  for (const filePath of [
    '(site)/practica/ielts/@modal/(.)speaking/[part]/record/page.tsx',
    '(site)/practica/ielts/listening/@modal/(..)speaking/[part]/record/page.tsx',
    '(site)/other/@modal/(...)practica/ielts/speaking/[part]/record/page.tsx',
  ]) assert.equal(routePatternTouchesTree(appRouteForEntry(filePath), FUTURE_HUB_ROUTE), true);
});

test('routing ledger rejects broad or escaped rewrites, removed controls and added controls', () => {
  const entries = configurationEntries(root);
  for (const mutation of [
    `\n// source: '/practica/ielts/:skill/:part'`,
    String.raw`\n// source: '/practica/ielts/spe\u0061king/part-1'`,
  ]) {
    const changed = entries.map((entry, index) => index === 0
      ? { ...entry, content: entry.content + mutation } : entry);
    assert.throws(() => assertRoutingControlsUnchanged(changed, root), /routing controls changed/);
  }
  assert.throws(() => assertRoutingControlsUnchanged(entries.slice(1), root), /routing controls changed/);
  assert.throws(() => assertRoutingControlsUnchanged([
    ...entries, { filePath: path.join(root, 'middleware.mjs'), content: 'export default () => null;' },
  ], root), /routing controls changed/);
});

test('source module shape rejects generator and async getters', () => {
  const { sourceText } = readStaticBank();
  for (const replacement of [
    'export function* getIeltsSpeakingPart1PrivateBank',
    'export async function getIeltsSpeakingPart1PrivateBank',
  ]) {
    const mutated = sourceText.replace('export function getIeltsSpeakingPart1PrivateBank', replacement);
    assert.notEqual(mutated, sourceText);
    const sourceFile = ts.createSourceFile(sourcePath, mutated, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    assert.throws(() => assertCanonicalSourceModuleShape(sourceFile));
  }
});

test('manifest mutation sentinels reject metadata drift and invented approval fields', () => {
  const { bank } = readStaticBank();
  const original = JSON.parse(readPrivateText(manifestPath));
  const mutations = [
    (manifest) => { manifest.createdAt = 'invalid'; },
    (manifest) => { manifest.scope.part = 4; },
    (manifest) => { manifest.scope.locale = 'es'; },
    (manifest) => { manifest.scope.title = 'Unrelated'; },
    (manifest) => { manifest.originalitySearch.status = 'unreviewed'; },
    (manifest) => { manifest.originalitySearch.questionCount = 999; },
    (manifest) => { manifest.originalitySearch.extraApproval = true; },
    (manifest) => { manifest.originalitySearch.checkedAt = '2027-01-01'; },
    (manifest) => { manifest.release.approvedBy = 'agent'; },
  ];
  for (const mutate of mutations) {
    const manifest = clone(original);
    mutate(manifest);
    assert.throws(() => assertManifest(manifest, bank));
  }
});

test('public text detection covers webmanifest, yaml and vtt and rejects symlink trees', (context) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-speaking-part1-text-'));
  context.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const publicRoot = path.join(fixtureRoot, 'public');
  fs.mkdirSync(publicRoot);
  const paths = ['site.webmanifest', 'notes.yaml', 'captions.vtt'].map((name) => path.join(publicRoot, name));
  for (const filePath of paths) fs.writeFileSync(filePath, TOPIC_PACKS[0].prompts[0]);
  for (const [name, prefix] of [['nul.html', Buffer.from([0])], ['invalid.html', Buffer.from([0xff])]]) {
    const filePath = path.join(publicRoot, name);
    fs.writeFileSync(filePath, Buffer.concat([prefix, Buffer.from(TOPIC_PACKS[0].prompts[0])]));
    paths.push(filePath);
  }
  assert.deepEqual(findPrivateLeaks(textEntries(publicRoot)).sort(), paths.sort());
  fs.symlinkSync(fixtureRoot, path.join(publicRoot, 'linked'));
  assert.throws(() => textEntries(publicRoot), /must not use symlinks/);
});

test('private source and manifest reads reject file and parent symlinks', (context) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-speaking-part1-private-paths-'));
  context.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const actual = path.join(fixtureRoot, 'actual');
  fs.mkdirSync(actual);
  fs.writeFileSync(path.join(actual, 'candidate.json'), '{}');
  fs.symlinkSync(path.join(actual, 'candidate.json'), path.join(fixtureRoot, 'linked.json'));
  fs.symlinkSync(actual, path.join(fixtureRoot, 'linked-parent'));
  assert.equal(readPrivateText(path.join(actual, 'candidate.json'), fixtureRoot), '{}');
  for (const relativePath of ['linked.json', 'linked-parent/candidate.json']) {
    assert.throws(() => readPrivateText(path.join(fixtureRoot, relativePath), fixtureRoot), /must not use symlinks/);
  }
});

test('private import detection covers root App and Pages APIs outside the Speaking URL tree', (context) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-speaking-part1-root-routes-'));
  context.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const paths = ['app/api/candidate/route.ts', 'pages/api/candidate.ts']
    .map((relativePath) => path.join(fixtureRoot, relativePath));
  for (const filePath of paths) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "import { getIeltsSpeakingPart1PrivateBank } from '@/data/ielts/speaking-part1-welearn-001.server';");
  }
  assert.deepEqual(routeTopologyLeaks(fixtureRoot), []);
  assert.deepEqual(findPrivateLeaks(runtimeEntries(fixtureRoot)).sort(), paths.sort());
});
