// app/not-found.tsx - ABSOLUTELY minimal static version AGAIN

// NO 'use client'
// NO imports

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found (Static Test)</h1>
      <p>The requested page could not be found.</p>
      {/* Using basic a tag, expect lint error, but testing build */} 
      <a href="/">Go Home</a> 
    </div>
  );
}
