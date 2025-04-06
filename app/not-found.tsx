"use client"; 

import Link from 'next/link';
// import { AlertTriangle } from "lucide-react"; // Temporarily removed

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center p-4 text-center">
      {/* <AlertTriangle className="h-12 w-12 text-destructive mb-4" /> */}{/* Temporarily removed */}
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Sorry, the page you are looking for does not exist or may have been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
        Go back home
      </Link>
    </div>
  );
}
