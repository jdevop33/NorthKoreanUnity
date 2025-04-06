// eslint.config.js
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals"; // Import globals library

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Configuration for TypeScript/JSX files
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"], // Specify your tsconfig path
      },
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.node, // Add node globals (adjust if not needed for all tsx)
        React: "readonly", // Assume React is globally available
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      // Base Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Base React recommended rules
      ...reactPlugin.configs.recommended.rules,
      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,
      // Basic TypeScript recommended rules
      ...tsPlugin.configs["eslint-recommended"].rules,
      ...tsPlugin.configs.recommended.rules,
      
      // Project-specific overrides for TS/TSX
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "react/react-in-jsx-scope": "off", 
      "react/prop-types": "off", 
      "react/no-unknown-property": ["error", { ignore: ["cmdk-input-wrapper"] }], // Allow cmdk attribute
      "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error for 'any'
      "@typescript-eslint/no-empty-object-type": "warn", // Warn instead of error for empty interfaces/types
    },
  },
  // Configuration for JavaScript files (e.g., config files)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Or "commonjs" if applicable
      globals: {
        ...globals.node, // Add node globals
      },
    },
    rules: {
      // Add any specific rules for JS files if needed
      // Example: prevent console logs in JS config files
      // "no-console": "warn", 
    },
  },
  
  // Ignores configuration
  {
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "build/",
      "migrations/", // Ignoring drizzle migration folder if it exists
      "postcss.config.js", // Ignore config files if they cause issues
      "tailwind.config.css",
      "next.config.mjs",
      "eslint.config.js", // Ignore self
    ],
  },
];
