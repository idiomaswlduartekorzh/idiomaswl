#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routeMapPath = path.join(root, 'docs/ielts-toefl-route-map.md');
const baseUrl = process.env.IELTS_AUDIT_BASE_URL ?? process.argv[2] ?? 'http://127.0.0.1:3000';
const canonicalBase = 'https://www.idiomaswl.com';

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function extractIeltsRoutes(routeMapText) {
  const routePattern = /`(\/practica\/ielts[^`]*)`/g;
  const routes = new Set();
  for (const match of routeMapText.matchAll(routePattern)) {
    routes.add(match[1]);
  }
  return [...routes].sort((a, b) => a.localeCompare(b));
}

function extractCanonical(html) {
  const canonicalMatch =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ??
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  return canonicalMatch?.[1] ?? '';
}

function countMatches(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expectsOfficialVsWeLearn(route) {
  return (
    route.includes('/reading/tipos-de-preguntas/') ||
    route.includes('/reading/habilidades/') ||
    route.includes('/academic/writing/') ||
    route.includes('/general-training')
  );
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'manual' });
  const text = await response.text();
  return { response, text };
}

async function main() {
  const routeMapText = fs.readFileSync(routeMapPath, 'utf8');
  const routes = extractIeltsRoutes(routeMapText);
  if (routes.length === 0) {
    fail('No IELTS routes were found in docs/ielts-toefl-route-map.md.');
  }

  let sitemapText = '';
  try {
    sitemapText = (await fetchText(`${baseUrl}/sitemap.xml`)).text;
  } catch (error) {
    fail(`Could not fetch sitemap.xml from ${baseUrl}: ${error.message}`);
  }

  const results = [];
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    let response;
    let html;
    try {
      const fetched = await fetchText(url);
      response = fetched.response;
      html = fetched.text;
    } catch (error) {
      fail(`${route} failed to fetch: ${error.message}`);
      continue;
    }

    const canonical = extractCanonical(html);
    const expectedCanonical = `${canonicalBase}${route}`;
    const h1Count = countMatches(html, /<h1(?:\s|>)/gi);
    const jsonLdCount = countMatches(html, /application\/ld\+json/gi);
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
    const text = stripHtml(html);
    const normalizedText = text.toLowerCase();
    const inSitemap = sitemapText.includes(expectedCanonical);
    const hasOfficialVsWeLearn =
      text.includes('Formato oficial vs estrategia WeLearn') ||
      text.includes('Official format versus WeLearn strategy') ||
      (normalizedText.includes('official format') &&
        (normalizedText.includes('welearn strategy') || normalizedText.includes('welearn response strategy')));
    const hasExplainedAnswer =
      normalizedText.includes('respuesta explicada') ||
      normalizedText.includes('respuestas explicadas') ||
      normalizedText.includes('respuesta:') ||
      normalizedText.includes('respuesta correcta') ||
      normalizedText.includes('explicación') ||
      normalizedText.includes('explicacion') ||
      normalizedText.includes('explanation') ||
      normalizedText.includes('explained answer') ||
      normalizedText.includes('explained answers') ||
      normalizedText.includes('modelo explicado') ||
      normalizedText.includes('answers and explanations') ||
      normalizedText.includes('model response') ||
      normalizedText.includes('model answer');

    if (response.status !== 200) {
      fail(`${route} returned HTTP ${response.status}.`);
    }
    if (canonical !== expectedCanonical) {
      fail(`${route} canonical mismatch: expected ${expectedCanonical}, found ${canonical || '(missing)'}.`);
    }
    if (h1Count !== 1) {
      fail(`${route} must render exactly one H1, found ${h1Count}.`);
    }
    if (!inSitemap) {
      fail(`${route} is live in route map but missing from sitemap.xml.`);
    }
    if (
      !title ||
      title.includes('| Idiomas WeLearn') ||
      title.includes('Idiomas WeLearn · Idiomas WeLearn')
    ) {
      warn(`${route} title is missing or may duplicate the global brand template.`);
    }
    if (expectsOfficialVsWeLearn(route) && !hasOfficialVsWeLearn) {
      warn(`${route} does not expose an official-format versus WeLearn-strategy distinction in rendered text.`);
    }
    if (route.includes('/writing') || route.includes('/reading/tipos-de-preguntas') || route.includes('/general-training')) {
      if (!hasExplainedAnswer) {
        warn(`${route} may lack visible answer/explanation language.`);
      }
    }
    if (jsonLdCount === 0) {
      warn(`${route} has no JSON-LD detected.`);
    }

    results.push({
      route,
      status: response.status,
      canonical,
      h1Count,
      jsonLdCount,
      inSitemap,
      hasOfficialVsWeLearn,
      hasExplainedAnswer,
    });
  }

  if (warnings.length > 0) {
    console.log('IELTS route audit warnings:');
    for (const warning of warnings) console.log(`- ${warning}`);
  }

  if (errors.length > 0) {
    console.error('IELTS route audit failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `IELTS route audit passed: ${results.length} routes checked against ${baseUrl}. ` +
      `${warnings.length} warning(s).`
  );
}

main();
