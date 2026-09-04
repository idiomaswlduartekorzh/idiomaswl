// Preview-only loader: reuse installed TypeScript; never install build dependencies.
import ts from 'typescript';

export default function fixtureLoader(source) {
  if (this.resourcePath.endsWith('.module.css')) {
    const names = [...new Set([...source.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((match) => match[1]))];
    const classes = Object.fromEntries(names.map((name) => [name, `matchingPreview__${name}`]));
    const css = source.replace(/\.([a-zA-Z][\w-]*)/g, (_, name) => `.${classes[name]}`);
    return `const style=document.createElement('style');style.textContent=${JSON.stringify(css)};document.head.appendChild(style);module.exports=${JSON.stringify(classes)};`;
  }
  return ts.transpileModule(source, {
    fileName: this.resourcePath,
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
}
