#!/bin/bash

# Testing script for the North Korean Unity project
# This script performs various tests to ensure code quality and best practices

set -e # Exit on error

echo "🧪 Running tests for North Korean Unity project"
echo "=============================================="

# Check project structure
echo "🔍 Checking project structure..."
directories=(
  "app"
  "components"
  "components/ui"
  "lib"
  "public"
  "types"
)

for dir in "${directories[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "❌ Missing directory: $dir"
  else
    echo "✅ Directory exists: $dir"
  fi
done

# Check Next.js configuration
echo "🔍 Checking Next.js configuration..."
if grep -q "reactCompiler" next.config.mjs; then
  echo "✅ React Compiler is configured"
else
  echo "❌ React Compiler is not configured"
fi

if grep -q "ppr" next.config.mjs; then
  echo "✅ Partial Prerendering (PPR) is configured"
else
  echo "❌ Partial Prerendering (PPR) is not configured"
fi

# Check TypeScript configuration
echo "🔍 Checking TypeScript configuration..."
if grep -q "\"strict\": true" tsconfig.json; then
  echo "✅ TypeScript strict mode is enabled"
else
  echo "❌ TypeScript strict mode is not enabled"
fi

# Check dependencies
echo "🔍 Checking for React 19 compatibility..."
REACT_VERSION=$(grep -o '"react": "[^"]*"' package.json)
if [[ $REACT_VERSION == *"19"* ]]; then
  echo "✅ Using React 19: $REACT_VERSION"
else
  echo "❌ Not using React 19: $REACT_VERSION"
fi

NEXT_VERSION=$(grep -o '"next": "[^"]*"' package.json)
if [[ $NEXT_VERSION == *"15"* ]]; then
  echo "✅ Using Next.js 15: $NEXT_VERSION"
else
  echo "❌ Not using Next.js 15: $NEXT_VERSION"
fi

# Check for React 19 features
echo "🔍 Checking for React 19 features usage..."
if grep -r "useActionState" --include="*.tsx" --include="*.ts" .; then
  echo "✅ Using useActionState"
else
  echo "❌ Not using useActionState"
fi

if grep -r "use(" --include="*.tsx" --include="*.ts" .; then
  echo "✅ Using 'use' hook for promises"
else
  echo "❌ Not using 'use' hook for promises"
fi

# Check for Server Actions
echo "🔍 Checking for Server Actions..."
if grep -r "'use server'" --include="*.ts" --include="*.tsx" .; then
  echo "✅ Using Server Actions"
else
  echo "❌ Not using Server Actions"
fi

# Check for PPR
echo "🔍 Checking for Partial Prerendering (PPR)..."
if grep -r "experimental_ppr" --include="*.tsx" .; then
  echo "✅ Using Partial Prerendering"
else
  echo "❌ Not using Partial Prerendering"
fi

# Check for proper image optimization
echo "🔍 Checking for next/image usage..."
RAW_IMG_COUNT=$(grep -r "<img" --include="*.tsx" . | wc -l)
NEXT_IMG_COUNT=$(grep -r "next/image" --include="*.tsx" . | wc -l)

echo "Raw <img> tags: $RAW_IMG_COUNT"
echo "next/image usage: $NEXT_IMG_COUNT"

if [ $RAW_IMG_COUNT -gt 0 ]; then
  echo "⚠️ Found raw <img> tags that should be replaced with next/image"
else
  echo "✅ No raw <img> tags found"
fi

# Check TypeScript typings
echo "🔍 Checking for proper TypeScript types..."
ANY_COUNT=$(grep -r ": any" --include="*.ts" --include="*.tsx" . | wc -l)
if [ $ANY_COUNT -gt 0 ]; then
  echo "⚠️ Found $ANY_COUNT instances of 'any' type, consider using more specific types"
else
  echo "✅ No 'any' types found"
fi

# Check internationalization
echo "🔍 Checking internationalization..."
if [ -d "locales" ] && [ "$(ls -A locales)" ]; then
  echo "✅ Internationalization files exist"
else
  echo "❌ Missing internationalization files"
fi

# Run TypeScript type checking
echo "🔍 Running TypeScript type checking..."
if pnpm run check &> /dev/null; then
  echo "✅ TypeScript type checking passed"
else
  echo "❌ TypeScript type checking failed"
fi

# Run ESLint
echo "🔍 Running ESLint..."
if pnpm run lint &> /dev/null; then
  echo "✅ ESLint passed"
else
  echo "❌ ESLint failed"
fi

echo "=============================================="
echo "🏁 Testing completed!"