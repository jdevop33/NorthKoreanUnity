#!/usr/bin/env node

/**
 * Project Structure Evaluation Script
 * This script analyzes the project structure and provides recommendations
 * for modernizing according to React 19 and Next.js 15 best practices
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const projectRoot = process.cwd();

// Configuration issues to check
const checkList = {
  structure: {
    description: 'Evaluating project structure',
    issues: [],
    recommendations: []
  },
  dependencies: {
    description: 'Checking dependencies compatibility with React 19',
    issues: [],
    recommendations: []
  },
  codeStyle: {
    description: 'Analyzing code style and patterns',
    issues: [],
    recommendations: []
  },
  performance: {
    description: 'Looking for performance optimization opportunities',
    issues: [],
    recommendations: []
  }
};

// Project structure check
function checkProjectStructure() {
  console.log('🔍 Evaluating project structure...');
  
  // Check for proper Next.js 15 App Router structure
  const hasAppDirectory = fs.existsSync(path.join(projectRoot, 'app'));
  const hasPagesDirectory = fs.existsSync(path.join(projectRoot, 'pages'));
  
  if (hasAppDirectory && hasPagesDirectory) {
    checkList.structure.issues.push('Project has both App Router (app/) and Pages Router (pages/) directories');
    checkList.structure.recommendations.push('Migrate fully to App Router and remove pages/ directory');
  }
  
  // Check for proper lib directory organization
  const libDir = path.join(projectRoot, 'lib');
  if (fs.existsSync(libDir)) {
    const libFiles = fs.readdirSync(libDir);
    if (libFiles.length > 10) {
      checkList.structure.issues.push('lib/ directory has too many loose files');
      checkList.structure.recommendations.push('Organize lib/ into subdirectories by functionality (e.g., lib/api/, lib/utils/, lib/hooks/)');
    }
  }
  
  // Check for server components vs client components organization
  try {
    const useClientCount = countUseClientDirectives();
    if (useClientCount > 10) {
      checkList.structure.issues.push(`Found ${useClientCount} 'use client' directives - potentially overusing client components`);
      checkList.structure.recommendations.push('Create a clear separation between server and client components, minimize use client directives');
    }
  } catch (error) {
    console.error('Error counting use client directives:', error);
  }
}

// Dependencies check
function checkDependencies() {
  console.log('🔍 Checking package.json for React 19 compatibility...');
  
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    checkList.dependencies.issues.push('package.json not found');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  // Check React version
  const reactVersion = dependencies.react;
  const reactDomVersion = dependencies['react-dom'];
  
  if (!reactVersion || !reactVersion.includes('19')) {
    checkList.dependencies.issues.push(`React version (${reactVersion}) is not compatible with React 19`);
    checkList.dependencies.recommendations.push('Upgrade to React 19: npm install react@latest react-dom@latest');
  }
  
  // Check Next.js version
  const nextVersion = dependencies.next;
  if (!nextVersion || !nextVersion.includes('15')) {
    checkList.dependencies.issues.push(`Next.js version (${nextVersion}) is not compatible with Next.js 15`);
    checkList.dependencies.recommendations.push('Upgrade to Next.js 15: npm install next@latest');
  }
  
  // Check for potentially incompatible packages with React 19
  const potentialIssues = [];
  if (dependencies['react-day-picker'] && !dependencies['react-day-picker'].includes('9')) {
    potentialIssues.push('react-day-picker: upgrade to v9');
  }
  
  if (dependencies.recharts) {
    checkList.dependencies.issues.push('Using recharts with React 19 requires overriding react-is dependency');
    checkList.dependencies.recommendations.push('Add "overrides": { "react-is": "^19.0.0" } to package.json');
  }
  
  if (potentialIssues.length > 0) {
    checkList.dependencies.issues.push('Potential React 19 compatibility issues: ' + potentialIssues.join(', '));
  }
}

// Code style check
function checkCodeStyle() {
  console.log('🔍 Analyzing code style and patterns...');
  
  // Check for proper TypeScript usage
  const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    if (!tsconfig.compilerOptions.strict) {
      checkList.codeStyle.issues.push('TypeScript strict mode is not enabled');
      checkList.codeStyle.recommendations.push('Enable strict mode in tsconfig.json for better type safety');
    }
  }
  
  // Check for use of new React 19 features
  checkForReact19Features();
}

// Performance check
function checkPerformance() {
  console.log('🔍 Looking for performance optimization opportunities...');
  
  // Check for React Compiler usage
  const nextConfigPath = path.join(projectRoot, 'next.config.mjs');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (!nextConfigContent.includes('reactCompiler')) {
      checkList.performance.issues.push('React Compiler is not enabled');
      checkList.performance.recommendations.push('Enable React Compiler for automatic optimizations: add experimental.reactCompiler: true to next.config.mjs');
    }
  }
  
  // Check for proper image optimization
  checkForImageOptimization();
  
  // Check for PPR usage
  if (!checkForPPR()) {
    checkList.performance.issues.push('Partial Prerendering (PPR) is not enabled');
    checkList.performance.recommendations.push('Consider enabling Partial Prerendering for faster page loads: add experimental.ppr: true to next.config.mjs');
  }
}

// Helper to count 'use client' directives in components
function countUseClientDirectives() {
  return new Promise((resolve, reject) => {
    exec('grep -r "use client" --include="*.tsx" --include="*.jsx" .', { cwd: projectRoot }, (error, stdout) => {
      if (error && error.code !== 1) {
        reject(error);
        return;
      }
      
      const lines = stdout.split('\n').filter(Boolean);
      resolve(lines.length);
    });
  });
}

// Helper to check for React 19 features usage
function checkForReact19Features() {
  const checks = [
    {
      pattern: 'useActionState',
      recommendation: 'Consider using useActionState instead of useFormState for form actions'
    },
    {
      pattern: 'useFormStatus',
      recommendation: 'Consider using enhanced useFormStatus from React 19 for better form state management'
    },
    {
      pattern: 'use ',
      recommendation: 'The use hook is available in React 19 for unwrapping promises in components'
    }
  ];
  
  checks.forEach(({ pattern, recommendation }) => {
    exec(`grep -r "${pattern}" --include="*.tsx" --include="*.jsx" .`, { cwd: projectRoot }, (error, stdout) => {
      if (error && error.code !== 0 && error.code !== 1) {
        console.error(`Error checking for ${pattern}:`, error);
        return;
      }
      
      const found = stdout.split('\n').filter(Boolean).length > 0;
      if (!found) {
        checkList.codeStyle.recommendations.push(recommendation);
      }
    });
  });
}

// Helper to check for proper image optimization
function checkForImageOptimization() {
  exec('grep -r "<img" --include="*.tsx" --include="*.jsx" .', { cwd: projectRoot }, (error, stdout) => {
    if (error && error.code !== 0 && error.code !== 1) {
      console.error('Error checking for image tags:', error);
      return;
    }
    
    const rawImgTags = stdout.split('\n').filter(Boolean).length;
    if (rawImgTags > 0) {
      checkList.performance.issues.push(`Found ${rawImgTags} instances of <img> tags instead of next/image`);
      checkList.performance.recommendations.push('Replace <img> tags with next/image for automatic image optimization');
    }
  });
}

// Helper to check for PPR
function checkForPPR() {
  const nextConfigPath = path.join(projectRoot, 'next.config.mjs');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    return nextConfigContent.includes('ppr');
  }
  return false;
}

// Run all checks
async function runChecks() {
  await checkProjectStructure();
  await checkDependencies();
  await checkCodeStyle();
  await checkPerformance();
  
  // Output results
  console.log('\n🔍 Project Evaluation Results:');
  
  for (const category in checkList) {
    console.log(`\n${checkList[category].description}:`);
    
    if (checkList[category].issues.length === 0) {
      console.log('✅ No issues found');
    } else {
      console.log('⚠️ Issues:');
      checkList[category].issues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    }
    
    if (checkList[category].recommendations.length > 0) {
      console.log('💡 Recommendations:');
      checkList[category].recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    }
  }
}

// Run the evaluation
runChecks().catch(error => {
  console.error('Error running checks:', error);
});