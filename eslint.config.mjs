import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts", "referencias/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // scripts de Node em CommonJS (Playwright global)
  { files: ["scripts/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
];

export default config;
