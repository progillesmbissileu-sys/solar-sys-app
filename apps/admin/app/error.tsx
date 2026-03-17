'use client';

import { Button } from '@/shared/ui';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
            Something went wrong!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We apologize for the inconvenience. Please try again or return to the home page.
          </p>
        </div>

        {isDev && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-900 dark:bg-red-950">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200">
              Error Details (Development Only):
            </p>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              <strong>Message:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
            {error.stack && (
              <pre className="mt-2 max-h-48 overflow-auto rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
                {error.stack}
              </pre>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
