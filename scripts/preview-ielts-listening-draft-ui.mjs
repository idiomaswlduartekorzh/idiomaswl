import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { webpack } = require('next/dist/compiled/webpack/webpack');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.argv.slice(2).some((argument) => argument !== '--build-only')) throw new Error('Unknown preview argument.');
fs.mkdirSync(path.join(root, 'tmp'), { recursive: true });
const output = fs.mkdtempSync(path.join(root, 'tmp/ielts-draft-ui-'));
const compiler = webpack({
  mode: 'production', target: 'web', devtool: false, cache: false, parallelism: 1,
  context: root,
  entry: path.join(root, 'tests/fixtures/ielts-matching-draft-preview.tsx'),
  output: { path: output, filename: 'fixture.js' },
  optimization: { minimize: false },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: { rules: [{ test: /\.(tsx?|module\.css)$/, exclude: /node_modules/, use: path.join(root, 'scripts/lib/ielts-draft-ui-fixture-loader.mjs') }] },
});
await new Promise((resolve, reject) => compiler.run((error, stats) => {
  compiler.close((closeError) => {
    if (error || closeError) return reject(error || closeError);
    if (stats.hasErrors()) return reject(new Error(stats.toString({ all: false, errors: true })));
    resolve();
  });
}));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private IELTS matching UI fixture</title><style>
body{margin:0;background:#f5f8fa;color:#102c46;font:16px/1.5 system-ui,sans-serif}main{max-width:850px;margin:auto;padding:24px 16px 60px}h1{font-size:32px;letter-spacing:-.035em}main>section{margin-top:24px}.fixture-tools{display:flex;align-items:center;flex-wrap:wrap;gap:12px}button{min-height:44px;padding:10px 16px;border:1px solid #102c46;background:#fff;color:#102c46;font:inherit;border-radius:4px;cursor:pointer}button:first-child{background:#102c46;color:#fff}button:focus-visible,input:focus-visible{outline:3px solid #137b82;outline-offset:3px}output{font-size:14px}[role=status]{min-height:24px}input[type=checkbox]{width:18px;height:18px;vertical-align:middle}
</style></head><body><div id="fixture-root"></div><script src="/fixture.js" defer></script></body></html>`;
fs.writeFileSync(path.join(output, 'index.html'), html);
console.log(`Fixture build: ${output}`);
if (!process.argv.includes('--build-only')) {
  const bundle = fs.readFileSync(path.join(output, 'fixture.js'));
  const server = http.createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405); response.end(); return; }
    const content = request.url === '/' ? html : request.url === '/fixture.js' ? bundle : null;
    if (content === null) { response.writeHead(404); response.end(); return; }
    response.setHeader('Content-Type', request.url === '/' ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8');
    response.end(request.method === 'HEAD' ? undefined : content);
  });
  server.listen(0, '127.0.0.1', () => console.log(`Private fixture: http://127.0.0.1:${server.address().port}`));
  const stop = () => server.close(() => process.exit(0));
  process.once('SIGINT', stop); process.once('SIGTERM', stop);
  setTimeout(stop, 30 * 60 * 1000).unref();
}
