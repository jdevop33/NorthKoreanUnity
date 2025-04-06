# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Development: `npm run dev` (runs Next.js development server)
- Production build: `npm run build`
- Start production: `npm run start`
- Lint: `npm run lint` (runs ESLint)
- Type check: `npm run check` (runs TypeScript type checking)
- Database migration: `npm run db:push` (uses Drizzle ORM)

## Code Style Guidelines

- **Imports**: Use absolute imports with aliases (`@/components`, `@/lib`, etc.). Group imports by external/internal.
- **Components**: Use PascalCase for component files and function names.
- **Types**: Use TypeScript interfaces for props. Prefer explicit types over `any`.
- **Naming**: Use descriptive names for variables and functions. Use camelCase for variables and functions.
- **Formatting**: Follow Next.js/TypeScript recommendations. Use single quotes for strings.
- **Error Handling**: Use try/catch for async operations. Provide meaningful error messages.
- **CSS**: Use Tailwind CSS utility classes with the `cn` helper for conditional classes.
- **Translations**: Access through the i18n system using locale JSON files in `/locales`.