'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <main className="container flex h-screen max-w-xl flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-4xl font-semibold">Something went wrong</h1>
      <p>{error.message}</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
