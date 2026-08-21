#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routeMapPath = path.join(root, 'docs/ielts-toefl-route-map.md');
const keywordMapPath = path.join(root, 'docs/ielts-toefl-keyword-map.csv');
const baseUrl = process.env.TOEFL_AUDIT_BASE_URL ?? process.argv[2] ?? 'http://127.0.0.1:3000';
const canonicalBase = 'https://www.idiomaswl.com';
const titleMax = 60;
const descriptionMax = 155;

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && quoted && line[index + 1] === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      cells.push(cell);
      cell = '';
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells;
}

function extractMappedRoutes(routeMapText, keywordMapText) {
  const routeMapRoutes = new Set();
  for (const match of routeMapText.matchAll(/`(\/(?:examenes\/toefl|practica\/toefl)[^`]*)`/g)) {
    if (!match[1].includes('*')) routeMapRoutes.add(match[1]);
  }

  const keywordRoutes = new Set(
    keywordMapText
      .split(/\r?\n/)
      .slice(1)
      .filter(Boolean)
      .map(parseCsvLine)
      .filter((cells) => cells[0] === 'toefl' && cells[4] === 'live')
      .map((cells) => cells[3])
  );

  for (const route of keywordRoutes) {
    if (!routeMapRoutes.has(route)) fail(`${route} is live in the keyword map but missing from the route map.`);
  }

  for (const route of routeMapRoutes) {
    if (!keywordRoutes.has(route)) warn(`${route} is in the route map but has no dedicated keyword-map row.`);
  }

  return [...new Set([...routeMapRoutes, ...keywordRoutes])].sort((a, b) => a.localeCompare(b));
}

function extractTagAttribute(html, tagName, attributeName, attributeValue, targetAttribute) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  for (const tag of tags) {
    const identity = tag.match(new RegExp(`${attributeName}=["']([^"']+)["']`, 'i'))?.[1];
    if (identity?.toLowerCase() !== attributeValue.toLowerCase()) continue;
    return tag.match(new RegExp(`${targetAttribute}=["']([^"']+)["']`, 'i'))?.[1] ?? '';
  }
  return '';
}

function extractCanonical(html) {
  return extractTagAttribute(html, 'link', 'rel', 'canonical', 'href');
}

function extractDescription(html) {
  return extractTagAttribute(html, 'meta', 'name', 'description', 'content');
}

function countMatches(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'manual' });
  const text = await response.text();
  return { response, text };
}

function auditPositioning(route, normalizedText) {
  if (route === '/examenes/toefl') {
    if (!normalizedText.includes('20 simulacros')) fail(`${route} does not expose the 20-mock value proposition.`);
    if (!normalizedText.includes('no son pruebas oficiales') && !normalizedText.includes('no son oficiales')) {
      fail(`${route} does not visibly disclose that WeLearn mocks are not official.`);
    }
    if (!normalizedText.includes('no reproducen el motor adaptativo') && !normalizedText.includes('no son adaptativos')) {
      fail(`${route} does not visibly distinguish fixed WeLearn mocks from the official adaptive engine.`);
    }
  }

  if (route === '/practica/toefl/listening') {
    for (const task of ['listen and choose a response', 'listen to a conversation', 'listen to an announcement', 'listen to an academic talk']) {
      if (!normalizedText.includes(task)) fail(`${route} is missing current task language: ${task}.`);
    }
  }

  if (route === '/practica/toefl/speaking') {
    for (const task of ['listen and repeat', 'take an interview']) {
      if (!normalizedText.includes(task)) fail(`${route} is missing current task language: ${task}.`);
    }
  }
}

async function main() {
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const keywordMapText = fs.readFileSync(keywordMapPath, 'utf8');
  const routes = extractMappedRoutes(routeMapText, keywordMapText);

  if (routes.length === 0) fail('No live TOEFL routes were found in the route and keyword maps.');

  let sitemapText = '';
  try {
    const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
    if (sitemap.response.status !== 200) fail(`sitemap.xml returned HTTP ${sitemap.response.status}.`);
    sitemapText = sitemap.text;
  } catch (error) {
    fail(`Could not fetch sitemap.xml from ${baseUrl}: ${error.message}`);
  }

  const results = [];
  for (const route of routes) {
    let fetched;
    try {
      fetched = await fetchText(`${baseUrl}${route}`);
    } catch (error) {
      fail(`${route} failed to fetch: ${error.message}`);
      continue;
    }

    const { response, text: html } = fetched;
    const expectedCanonical = `${canonicalBase}${route}`;
    const canonical = extractCanonical(html);
    const title = stripHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
    const description = extractDescription(html);
    const h1Count = countMatches(html, /<h1(?:\s|>)/gi);
    const jsonLdCount = countMatches(html, /application\/ld\+json/gi);
    const robots = extractTagAttribute(html, 'meta', 'name', 'robots', 'content').toLowerCase();
    const normalizedText = stripHtml(html).toLowerCase();

    if (response.status !== 200) fail(`${route} returned HTTP ${response.status}.`);
    if (canonical !== expectedCanonical) {
      fail(`${route} canonical mismatch: expected ${expectedCanonical}, found ${canonical || '(missing)'}.`);
    }
    if (h1Count !== 1) fail(`${route} must render exactly one H1, found ${h1Count}.`);
    if (robots.includes('noindex')) fail(`${route} is a mapped public route but renders noindex.`);
    if (!sitemapText.includes(expectedCanonical)) fail(`${route} is live in the route map but missing from sitemap.xml.`);
    if (!title) fail(`${route} has no rendered title.`);
    if (title.length > titleMax) fail(`${route} title has ${title.length} characters (max ${titleMax}): ${title}`);
    if (!description) fail(`${route} has no rendered meta description.`);
    if (description.length > descriptionMax) {
      fail(`${route} description has ${description.length} characters (max ${descriptionMax}).`);
    }
    if (jsonLdCount === 0) warn(`${route} has no JSON-LD detected.`);

    auditPositioning(route, normalizedText);
    results.push({ route, title, description, jsonLdCount });
  }

  const mockRoute = '/examenes/toefl/practica/set-1';
  try {
    const { response, text } = await fetchText(`${baseUrl}${mockRoute}`);
    const robots = extractTagAttribute(text, 'meta', 'name', 'robots', 'content').toLowerCase();
    if (response.status !== 200) fail(`${mockRoute} returned HTTP ${response.status}.`);
    if (!robots.includes('noindex')) fail(`${mockRoute} must remain noindex to avoid 20 near-duplicate exam-session pages.`);
    if (sitemapText.includes(`${canonicalBase}${mockRoute}`)) fail(`${mockRoute} is noindex but appears in sitemap.xml.`);
  } catch (error) {
    fail(`${mockRoute} failed to fetch: ${error.message}`);
  }

  if (warnings.length > 0) {
    console.log('TOEFL route audit warnings:');
    for (const warning of warnings) console.log(`- ${warning}`);
  }

  if (errors.length > 0) {
    console.error('TOEFL route audit failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `TOEFL route audit passed: ${results.length} indexable routes and the private mock-session rule checked against ${baseUrl}. ` +
      `${warnings.length} warning(s).`
  );
}

main();
