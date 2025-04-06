// app/not-found.tsx - ABSOLUTELY minimal static version

// NO 'use client'
// NO imports

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found (Static Test)</h1>
      <p>The requested page could not be found.</p>
      <a href="/">Go Home</a>
    </div>
  );
}
