// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
// import { FlatCompat } from '@eslint/eslintrc'

// const compat = new FlatCompat({
//   // import.meta.dirname is available after Node.js v20.11.0
//   baseDirectory: import.meta.dirname,
// })

// const eslintConfig = [
//   ...compat.config({
//     extends: ['next'],
//     rules: {
//       ignoreDuringBuilds: true,
//       'react/no-unescaped-entities': 'off',
//       '@next/next/no-page-custom-font': 'off',
//     },
//   }),
// ]

// export default eslintConfig


const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
 
export default nextConfig