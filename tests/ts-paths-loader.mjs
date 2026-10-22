import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXTENSIONS = ['.ts', '.tsx', '.js', '.mjs'];

async function firstExistingUrl(candidateUrl) {
  const candidatePath = fileURLToPath(candidateUrl);
  const candidates = EXTENSIONS.includes(path.extname(candidatePath))
    ? [candidatePath]
    : [candidatePath, ...EXTENSIONS.map((extension) => `${candidatePath}${extension}`)];

  for (const filePath of candidates) {
    try {
      await access(filePath);
      return pathToFileURL(filePath).href;
    } catch {
      // Keep trying the narrow set of source extensions used by this repository.
    }
  }

  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only') {
    return {
      url: 'data:text/javascript,export%20{}',
      shortCircuit: true,
    };
  }

  const rewritten = specifier.startsWith('@/')
    ? pathToFileURL(path.join(ROOT, 'src', specifier.slice(2))).href
    : specifier;

  try {
    return await nextResolve(rewritten, context);
  } catch (error) {
    if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error;

    let candidateUrl;
    try {
      const isBareSpecifier = !rewritten.startsWith('file:')
        && !rewritten.startsWith('.')
        && !rewritten.startsWith('/');
      candidateUrl = rewritten.startsWith('file:')
        ? rewritten
        : isBareSpecifier
          ? pathToFileURL(path.join(ROOT, 'node_modules', rewritten)).href
          : new URL(rewritten, context.parentURL).href;
    } catch {
      throw error;
    }

    const resolvedUrl = await firstExistingUrl(candidateUrl);
    if (!resolvedUrl) throw error;
    return nextResolve(resolvedUrl, context);
  }
}
