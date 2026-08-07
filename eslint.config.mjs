import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated deploy/build artifacts should never be linted as source.
    ".vercel/**",
    "dist/**",
    "coverage/**",
  ]),
  {
    // Los scripts de `scripts/` corren en Node al construir o auditar; no entran en ningún
    // bundle de navegador. `no-assign-module-variable` protege precisamente de lo contrario
    // —asignar `module` en código que sí se empaqueta—, así que aquí marca como error el
    // idioma correcto: `const module = { exports: {} }` es la forma de evaluar un TS
    // transpilado con `Function()`. Nueve scripts daban error por esto, y era ruido que
    // tapaba los errores de verdad.
    files: ["scripts/**/*.{js,mjs,cjs}"],
    rules: {
      "@next/next/no-assign-module-variable": "off",
    },
  },
  {
    rules: {
      // Next 16 / React 19 surfaces useful React Compiler checks, but this
      // codebase has legacy interactive lessons that need a gradual cleanup.
      // Keep these visible without blocking every lint run.
      "react-hooks/immutability": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/use-memo": "warn",
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
