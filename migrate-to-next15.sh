#!/bin/bash

# Migration script to update project to React 19 and Next.js 15
# This script implements the changes outlined in modernize-project.md

echo "🚀 Starting migration to Next.js 15 and React 19..."

# Create backup of current state
echo "📦 Creating backup..."
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r app components hooks lib locales public shared tailwind.config.css next.config.mjs package.json tsconfig.json $BACKUP_DIR

# Update dependencies
echo "📥 Updating dependencies..."
npm install next@latest react@latest react-dom@latest eslint-config-next@latest @types/react@latest @types/react-dom@latest

# Update next.config.mjs
echo "🔧 Updating Next.js configuration..."
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Compiler for automatic optimizations
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',  // Enable Partial Prerendering incrementally
    after: true,         // Enable next/after API for post-response tasks
  },
  // Optimize external packages
  serverExternalPackages: [
    'sharp', // Add any packages that shouldn't be bundled
  ],
  images: {
    domains: ['via.placeholder.com'],
    formats: ['image/webp'],
  }
};

export default nextConfig;
EOF

# Restructure components directory
echo "🏗️ Restructuring components directory..."
mkdir -p components/features components/layouts components/sections

# Move section components to components/sections
for file in components/ArchitectureSection.tsx components/ContactSection.tsx components/CulturalHeritageSection.tsx components/CulturalPreservationSection.tsx components/IntroductionSection.tsx components/ModernAchievementsSection.tsx components/TraditionsSection.tsx components/UnificationSection.tsx; do
  if [ -f "$file" ]; then
    mv "$file" components/sections/
  fi
done

# Move layout components to components/layouts
for file in components/Header.tsx components/Footer.tsx components/NavigationBar.tsx; do
  if [ -f "$file" ]; then
    mv "$file" components/layouts/
  fi
done

# Restructure lib directory
echo "🏗️ Restructuring lib directory..."
mkdir -p lib/utils lib/hooks lib/api lib/actions lib/i18n

# Move utility files
if [ -f "lib/utils.ts" ]; then
  mv lib/utils.ts lib/utils/index.ts
fi

# Move hooks
mv hooks/* lib/hooks/ 2>/dev/null || mkdir -p lib/hooks

# Move i18n related files
if [ -f "lib/i18n.ts" ]; then
  mv lib/i18n.ts lib/i18n/index.ts
fi

# Create types directory
echo "🏗️ Creating types directory..."
mkdir -p types

# Create basic type files
cat > types/index.ts << 'EOF'
// Common types used throughout the application

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ActionResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface ServerActionState<T = unknown> {
  data?: T;
  error?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}
EOF

# Create a shell script to update imports
echo "📝 Creating script to update imports..."
cat > update-imports.sh << 'EOF'
#!/bin/bash

# Update imports for components/sections
find app -type f -name "*.tsx" -exec sed -i 's|@/components/ArchitectureSection|@/components/sections/ArchitectureSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/ContactSection|@/components/sections/ContactSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/CulturalHeritageSection|@/components/sections/CulturalHeritageSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/CulturalPreservationSection|@/components/sections/CulturalPreservationSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/IntroductionSection|@/components/sections/IntroductionSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/ModernAchievementsSection|@/components/sections/ModernAchievementsSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/TraditionsSection|@/components/sections/TraditionsSection|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/UnificationSection|@/components/sections/UnificationSection|g' {} \;

# Update imports for components/layouts
find app -type f -name "*.tsx" -exec sed -i 's|@/components/Header|@/components/layouts/Header|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/Footer|@/components/layouts/Footer|g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's|@/components/NavigationBar|@/components/layouts/NavigationBar|g' {} \;

# Update imports for utils
find app components -type f -name "*.tsx" -exec sed -i 's|@/lib/utils|@/lib/utils/index|g' {} \;

# Update imports for hooks
find app components -type f -name "*.tsx" -exec sed -i 's|@/hooks/|@/lib/hooks/|g' {} \;
EOF

chmod +x update-imports.sh

# Update tsconfig.json for new paths
echo "🔧 Updating TypeScript configuration..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./lib/hooks/*"],
      "@/utils/*": ["./lib/utils/*"],
      "@/types/*": ["./types/*"],
      "@/locales/*": ["./locales/*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mjs",
    "**/*.json",
    ".next/types/**/*.ts",
    "app/**/*",
    "components/**/*",
    "lib/**/*",
    "hooks/**/*",
    "types/**/*",
    "locales/**/*",
    "shared/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    ".next",
    "out",
    "client"
  ]
}
EOF

# Create PPR wrapper component example
echo "📝 Creating example PPR component..."
mkdir -p components/features
cat > components/features/PPRExample.tsx << 'EOF'
// Shows how to use Partial Prerendering (PPR) with Next.js 15
import { Suspense } from 'react'

// This component will be statically rendered
export function StaticContent() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Static Content</h2>
      <p>This part is statically rendered and will be instantly available.</p>
    </div>
  )
}

// This component will be dynamically rendered - requires 'use client'
'use client'
export function DynamicContent() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Dynamic Content</h2>
      <p>This part is dynamically rendered and will stream in after the static content.</p>
      <p className="text-sm text-gray-500 mt-2">Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}

// Loading fallback for dynamic content
function DynamicLoading() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}

// Main PPR component that combines static and dynamic parts
export function PPRExample() {
  return (
    <div className="my-8">
      <StaticContent />
      <Suspense fallback={<DynamicLoading />}>
        <DynamicContent />
      </Suspense>
    </div>
  )
}

// Add this to a page by setting:
// export const experimental_ppr = true
EOF

# Create example server action
echo "📝 Creating example server action..."
mkdir -p lib/actions
cat > lib/actions/contact-form.ts << 'EOF'
'use server'

import { z } from 'zod'
import { ActionResponse } from '@/types'

// Define input validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

// Define input and output types
type ContactFormInput = z.infer<typeof contactFormSchema>

// Server action for contact form submission
export async function submitContactForm(formData: ContactFormInput): Promise<ActionResponse<{ success: boolean }>> {
  try {
    // Validate input
    const result = contactFormSchema.safeParse(formData)
    
    if (!result.success) {
      // Return validation errors
      return {
        error: result.error.errors[0]?.message || 'Invalid form data',
      }
    }
    
    // Process form submission
    // This would typically send an email, store in database, etc.
    console.log('Received contact form submission:', result.data)
    
    // Simulate a slight delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return success response
    return {
      data: { success: true },
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      error: 'An unexpected error occurred. Please try again later.',
    }
  }
}
EOF

# Create example hook for using server actions with React 19
echo "📝 Creating example hooks for React 19 features..."
cat > lib/hooks/use-action-state.ts << 'EOF'
'use client'

import { useState, useTransition, useEffect } from 'react'
import { ActionResponse } from '@/types'

// Type for action functions that return an ActionResponse
type Action<TInput, TOutput> = (input: TInput) => Promise<ActionResponse<TOutput>>

// Hook for handling server actions with React 19 useActionState-like functionality
export function useActionState<TInput, TOutput>(
  action: Action<TInput, TOutput>
) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Function to execute the action
  const execute = async (input: TInput) => {
    setStatus('loading')
    startTransition(async () => {
      try {
        const result = await action(input)
        
        if (result.error) {
          setError(result.error)
          setStatus('error')
        } else {
          setData(result.data)
          setError(undefined)
          setStatus('success')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        setStatus('error')
      }
    })
  }

  // Reset state
  const reset = () => {
    setStatus('idle')
    setError(undefined)
    setData(undefined)
  }

  return {
    execute,
    reset,
    isPending,
    error,
    data,
    status,
  }
}
EOF

echo "✅ Migration script completed!"
echo "Next steps:"
echo "1. Run './update-imports.sh' to update import paths"
echo "2. Run 'npm install' to ensure all dependencies are properly installed"
echo "3. Run 'npm run dev' to test the updated project"
echo "4. See modernize-project.md for additional recommendations"