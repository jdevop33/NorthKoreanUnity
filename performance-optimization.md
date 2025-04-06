# Performance Optimization Guide for North Korean Unity

This guide outlines advanced performance optimization techniques specifically tailored for the North Korean Unity project with Next.js 15 and React 19.

## Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Time until largest content element is visible |
| FID (First Input Delay) | < 100ms | Time until first interaction is processed |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability measure |
| TTI (Time to Interactive) | < 3.5s | Time until page is fully interactive |
| TBT (Total Blocking Time) | < 200ms | Time main thread is blocked |

## Next.js 15 Optimizations

### 1. Partial Prerendering (PPR)

Partial Prerendering is a key Next.js 15 feature that combines static and dynamic rendering:

```tsx
// app/(routes)/architecture/page.tsx
import { Suspense } from 'react';
import { ArchitectureStatic } from '@/components/features/architecture/ArchitectureStatic';
import { ArchitectureDynamic } from '@/components/features/architecture/ArchitectureDynamic';

export const experimental_ppr = true;

export default function ArchitecturePage() {
  return (
    <main>
      {/* Static content - rendered at build time */}
      <ArchitectureStatic />
      
      {/* Dynamic content - streamed after initial HTML */}
      <Suspense fallback={<ArchitectureSkeleton />}>
        <ArchitectureDynamic />
      </Suspense>
    </main>
  );
}
```

### 2. React Compiler

Enable the React Compiler in `next.config.mjs`:

```js
experimental: {
  reactCompiler: true,
}
```

The React Compiler automatically optimizes React components by:
- Eliminating unnecessary re-renders
- Automatically applying memoization
- Reducing the need for `useMemo` and `useCallback`

### 3. Image Optimization

Always use `next/image` with proper sizing and modern formats:

```tsx
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/assets/pyongyang_cityscape.webp"
      alt="Pyongyang cityscape"
      width={1200}
      height={630}
      priority={true} // For LCP images
      quality={85}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="rounded-lg object-cover"
    />
  );
}
```

### 4. Font Optimization

Use `next/font` with proper subsetting:

```tsx
import { Inter, Nanum_Gothic } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
});

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-sans-kr',
});
```

### 5. Route Handlers Optimization

For API routes, use streaming responses:

```tsx
// app/api/data/route.ts
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      // Send initial data
      controller.enqueue(encoder.encode(JSON.stringify({
        initial: 'data'
      })));
      
      // Fetch more data and stream it
      const moreData = await fetchMoreData();
      controller.enqueue(encoder.encode(JSON.stringify(moreData)));
      
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked',
    },
  });
}
```

### 6. Server Components (RSC)

Maximize use of Server Components to reduce client-side JavaScript:

- Move data fetching to Server Components
- Keep client components focused on interactivity
- Use server/client component boundaries wisely

```tsx
// Server Component
export default async function CulturalPage() {
  // Data fetching happens on the server
  const data = await fetchCulturalData();
  
  return (
    <main>
      <ServerRenderedContent data={data} />
      <Suspense fallback={<Loading />}>
        <ClientInteractiveElement />
      </Suspense>
    </main>
  );
}
```

### 7. Metadata Optimization

Improve SEO and social sharing with optimized metadata:

```tsx
// app/(routes)/traditions/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Korean Traditions',
  description: 'Explore traditional Korean customs, ceremonies, and cultural practices.',
  openGraph: {
    images: [
      {
        url: '/assets/traditions-og.webp',
        width: 1200,
        height: 630,
        alt: 'Traditional Korean ceremonies',
      },
    ],
  },
};
```

## Advanced Tailwind CSS Optimizations

### 1. Content Visibility

Use CSS content-visibility to improve rendering performance:

```css
@utility optimization-hidden {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

### 2. Container Queries

Use container queries for more responsive components:

```jsx
<div className="@container">
  <div className="@md:grid-cols-2 @lg:grid-cols-3 grid gap-4">
    {/* Content */}
  </div>
</div>
```

### 3. Will-Change for Animations

Optimize animations with will-change:

```css
@utility optimize-animation {
  will-change: transform;
  backface-visibility: hidden;
}
```

## JavaScript Optimizations

### 1. Dynamic Imports

Use dynamic imports for non-critical components:

```tsx
const DynamicMap = dynamic(() => import('@/components/features/DynamicMap'), {
  loading: () => <MapPlaceholder />,
  ssr: false // For client-side-only components
});
```

### 2. Bundle Analysis

Monitor bundle sizes using @next/bundle-analyzer:

```js
// next.config.mjs with bundle analyzer
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer({
  // Next config here
});
```

### 3. Optimized Libraries

Use lightweight alternatives for heavy libraries:

- Replace Moment.js with date-fns
- Use lightweight chart libraries
- Consider micro-frontends for complex features

## Monitoring and Analysis

1. **Core Web Vitals**: Integrate with Vercel Analytics
2. **Real User Monitoring**: Implement with `web-vitals` library
3. **Performance Budgets**: Set size limits for JavaScript and CSS

## Implementation Checklist

- [ ] Enable Partial Prerendering for key routes
- [ ] Configure React Compiler in next.config.mjs
- [ ] Replace all img tags with next/image
- [ ] Optimize fonts with next/font
- [ ] Add proper image sizing and formats
- [ ] Move data fetching to Server Components
- [ ] Implement proper lazy loading
- [ ] Optimize metadata for all routes
- [ ] Set up bundle analysis
- [ ] Implement performance monitoring

By implementing these optimizations, the North Korean Unity project will deliver world-class performance that exceeds Core Web Vitals targets and provides an exceptional user experience.