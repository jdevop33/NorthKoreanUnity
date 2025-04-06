# North Korean Unity Project Modernization Plan

## Current Issues

1. **Project Structure**:
   - The project started as a Vite app but has been migrated to Next.js without proper restructuring
   - Mix of old Vite patterns with Next.js App Router patterns
   - Unclear organization of server vs client components

2. **Dependencies**:
   - Using older React version instead of React 19
   - Not fully leveraging Next.js 15 features (React Compiler, PPR, etc.)
   - Some dependencies might need updates for React 19 compatibility

3. **Code Patterns**:
   - Potentially overusing `use client` directives
   - Not taking advantage of React 19 hooks like `useActionState`
   - Lack of clear typings for components

## Modernization Plan

### 1. Upgrade Core Dependencies

```bash
# Update to React 19 and Next.js 15
npm install next@latest react@latest react-dom@latest eslint-config-next@latest @types/react@latest @types/react-dom@latest
```

Add React 19 compatibility for Recharts in package.json:
```json
"overrides": {
  "react-is": "^19.0.0-rc"
}
```

### 2. Restructure Project 

```
📂 app/
  └─ (routes)/
     ├─ about/
     ├─ contact/
     └─ ...
  └─ api/
     └─ ...
  └─ layout.tsx
  └─ page.tsx
  └─ globals.css

📂 components/
  └─ ui/ (shadcn components)
  └─ features/ (business logic components)
  └─ layouts/
     └─ Header.tsx
     └─ Footer.tsx
  └─ sections/ (move from root)
     └─ ArchitectureSection.tsx
     └─ ContactSection.tsx
     └─ ...

📂 lib/
  └─ actions/ (server actions)
  └─ api/ (API client)
  └─ utils/ (utility functions)
  └─ hooks/ (custom hooks)
  └─ i18n/ (translations)

📂 types/ (shared TypeScript types)
```

### 3. Implement Next.js 15 Features

Add to next.config.mjs:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Compiler for automatic optimizations
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',  // Enable Partial Prerendering incrementally
    after: true,         // Enable next/after API for post-response tasks
  },
  // Use sane caching defaults
  serverExternalPackages: [
    'sharp', // Add any packages that shouldn't be bundled
  ]
};

export default nextConfig;
```

### 4. Update Server vs Client Component Usage

- Convert utility and UI components to RSC by default 
- Use 'use client' only when browser APIs are needed
- Add proper Suspense boundaries for streaming with PPR
- Use the React 19 `use` hook for data in client components

### 5. Add TypeScript Type Safety

- Add proper typings for all components
- Enable TypeScript strict mode in tsconfig.json
- Use Zod for form validation and API type safety

### 6. Image Optimization

- Ensure all images use next/image
- Define proper sizes for all images
- Use WebP format when possible

### 7. Add Better Error Handling

- Implement error boundaries using error.tsx files
- Add proper API error handling with typed responses

### 8. Implement State Management Best Practices

- Use server components for data fetching
- Use React 19's useActionState for forms
- Consider using TanStack Query for client-side fetch state management

## Priority Tasks

1. Update core dependencies to React 19 and Next.js 15
2. Reorganize project structure according to App Router best practices 
3. Add Next.js 15 features (React Compiler, PPR)
4. Convert components to RSC where possible
5. Add proper typings and validation
6. Optimize images and performance

## Long-term Tasks

1. Add comprehensive test coverage
2. Implement proper CI/CD pipeline
3. Add analytics and monitoring
4. Improve accessibility
5. Add comprehensive documentation