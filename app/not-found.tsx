// app/not-found.tsx - Next.js App Router 404 page

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react"; // Use a more fitting icon like AlertTriangle

export default function NotFound() {
  return (
    // This component will be rendered within the RootLayout
    <div className="min-h-[calc(100vh-200px)] w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            <span>404 - Page Not Found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Sorry, the page you are looking for does not exist or may have been moved.
          </p>
          <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Go back home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
