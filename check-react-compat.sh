#!/bin/bash

# React 19 Compatibility Checker
# This script checks the codebase for React 19 compatibility issues

echo "🔍 Checking React 19 Compatibility..."
echo "===================================="

# Check for deprecated React APIs
echo "Checking for deprecated React APIs..."

DEPRECATED_APIS=(
  "useFormState"         # Replaced with useActionState
  "React.createClass"    # Long deprecated
  "React.render"         # Use createRoot instead
  "ReactDOM.render"      # Use createRoot instead
  "componentWillMount"   # Use componentDidMount instead
  "componentWillReceiveProps" # Use getDerivedStateFromProps instead
  "componentWillUpdate"  # Use getSnapshotBeforeUpdate instead
)

for API in "${DEPRECATED_APIS[@]}"; do
  COUNT=$(grep -r "$API" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | wc -l)
  
  if [ "$COUNT" -gt 0 ]; then
    echo "⚠️  Found $COUNT occurrences of deprecated API: $API"
    grep -r "$API" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | head -5
  else
    echo "✅ No usage of deprecated API: $API"
  fi
done

# Check for React 19 compatibility in package.json
echo -e "\nChecking package.json for React 19 compatibility..."

REACT_VERSION=$(grep -o '"react": "[^"]*"' package.json)
if [[ $REACT_VERSION == *"19"* ]]; then
  echo "✅ React version is set to 19: $REACT_VERSION"
else
  echo "⚠️  React version is not set to 19: $REACT_VERSION"
fi

REACT_DOM_VERSION=$(grep -o '"react-dom": "[^"]*"' package.json)
if [[ $REACT_DOM_VERSION == *"19"* ]]; then
  echo "✅ React DOM version is set to 19: $REACT_DOM_VERSION"
else
  echo "⚠️  React DOM version is not set to 19: $REACT_DOM_VERSION"
fi

# Check for React Compiler configuration
echo -e "\nChecking for React Compiler configuration..."
if grep -q "reactCompiler" next.config.mjs; then
  echo "✅ React Compiler is configured in next.config.mjs"
else
  echo "⚠️  React Compiler is not configured in next.config.mjs"
fi

# Check for React 19 features usage
echo -e "\nChecking for React 19 features usage..."

# Check for 'use' hook
USE_HOOK_COUNT=$(grep -r "use(" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | wc -l)
if [ "$USE_HOOK_COUNT" -gt 0 ]; then
  echo "✅ Using React 19 'use' hook: $USE_HOOK_COUNT occurrences"
else
  echo "ℹ️  Not using React 19 'use' hook yet"
fi

# Check for useFormStatus hook
FORM_STATUS_COUNT=$(grep -r "useFormStatus" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | wc -l)
if [ "$FORM_STATUS_COUNT" -gt 0 ]; then
  echo "✅ Using React 19 'useFormStatus' hook: $FORM_STATUS_COUNT occurrences"
else
  echo "ℹ️  Not using React 19 'useFormStatus' hook yet"
fi

# Check for 'use client' directives
USE_CLIENT_COUNT=$(grep -r "use client" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | wc -l)
echo "ℹ️  Found $USE_CLIENT_COUNT 'use client' directives"

# Check for experimental_ppr usage
PPR_COUNT=$(grep -r "experimental_ppr" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" . | grep -v "node_modules" | wc -l)
if [ "$PPR_COUNT" -gt 0 ]; then
  echo "✅ Using Partial Prerendering (PPR): $PPR_COUNT occurrences"
else
  echo "ℹ️  Not using Partial Prerendering (PPR) yet"
fi

echo -e "\n===================================="
echo "Compatibility check completed."
echo "See recommendations above for React 19 best practices."