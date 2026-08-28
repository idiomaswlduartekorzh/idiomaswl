const HTML_ENTITIES = new Map([
  ['amp', '&'],
  ['apos', "'"],
  ['gt', '>'],
  ['lt', '<'],
  ['nbsp', ' '],
  ['quot', '"'],
]);

export function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith('#x')) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith('#')) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return HTML_ENTITIES.get(code.toLowerCase()) ?? entity;
  });
}

export function normalizeVisibleText(value) {
  return decodeHtml(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function attributeValue(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3] ?? '') : null;
}

export function robotsDirectives(html) {
  const directives = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const name = attributeValue(match[0], 'name');
    if (name?.toLowerCase() !== 'robots') continue;
    const content = attributeValue(match[0], 'content');
    if (content) directives.push(...content.toLowerCase().split(',').map((item) => item.trim()).filter(Boolean));
  }
  return [...new Set(directives)];
}

export function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const rel = attributeValue(match[0], 'rel')?.toLowerCase().split(/\s+/) ?? [];
    if (!rel.includes('canonical')) continue;
    return attributeValue(match[0], 'href');
  }
  return null;
}

function hasType(node, expected) {
  const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']];
  return types.includes(expected);
}

function jsonLdDocuments(html) {
  const documents = [];
  const scripts = html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of scripts) {
    try {
      documents.push(JSON.parse(decodeHtml(match[1])));
    } catch {
      // El auditor de producción reporta la falta de paridad; otros guardianes
      // validan la sintaxis del JSON-LD fuente durante el build.
    }
  }
  return documents;
}

function graphNodes(document) {
  if (Array.isArray(document)) return document.flatMap(graphNodes);
  if (!document || typeof document !== 'object') return [];
  return Array.isArray(document['@graph']) ? document['@graph'] : [document];
}

export function faqSchemaQuestions(html) {
  const questions = [];
  for (const document of jsonLdDocuments(html)) {
    for (const node of graphNodes(document)) {
      if (!hasType(node, 'FAQPage') || !Array.isArray(node.mainEntity)) continue;
      for (const entity of node.mainEntity) {
        if (!hasType(entity, 'Question') || typeof entity.name !== 'string') continue;
        const question = normalizeVisibleText(entity.name);
        if (question) questions.push(question);
      }
    }
  }
  return [...new Set(questions)];
}

function visibleSummaryQuestions(html) {
  const questions = [];
  for (const match of html.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi)) {
    const text = normalizeVisibleText(match[1]).replace(/\s*[+−]\s*$/, '');
    if (/[?¿]/.test(text)) questions.push(text);
  }
  return questions;
}

function visibleClassQuestions(html) {
  const questions = [];
  const pattern = /<([a-z][a-z0-9-]*)\b[^>]*class=["'][^"']*\bwlh-faq-q\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(pattern)) {
    const text = normalizeVisibleText(match[2]);
    if (text) questions.push(text);
  }
  return questions;
}

function visibleFaqSectionQuestions(html) {
  const questions = [];
  const sectionPattern = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;

  for (const match of html.matchAll(sectionPattern)) {
    const attributes = match[1];
    const content = match[2];
    const visibleContent = content
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
    const label = normalizeVisibleText(visibleContent);
    const hasFaqMarker = /faq/i.test(attributes)
      || /\b(?:frequently asked questions|preguntas frecuentes)\b/i.test(label);

    if (!hasFaqMarker) continue;

    for (const heading of visibleContent.matchAll(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
      const text = normalizeVisibleText(heading[2]);
      if (/[?¿]/.test(text)) questions.push(text);
    }
  }

  return questions;
}

export function visibleFaqQuestions(html) {
  return [...new Set([
    ...visibleSummaryQuestions(html),
    ...visibleClassQuestions(html),
    ...visibleFaqSectionQuestions(html),
  ])];
}

export function compareFaqParity(html) {
  const schema = faqSchemaQuestions(html);
  const visible = visibleFaqQuestions(html);
  const schemaSet = new Set(schema);
  const visibleSet = new Set(visible);

  return {
    schema,
    visible,
    missingVisible: schema.filter((question) => !visibleSet.has(question)),
    missingSchema: visible.filter((question) => !schemaSet.has(question)),
  };
}
