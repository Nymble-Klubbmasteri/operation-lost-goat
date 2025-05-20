'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 dark:bg-blue-600 px-4 py-2 text-sm text-white dark:text-gray-100 transition-colors hover:bg-blue-400 dark:hover:bg-blue-500"
        onClick={
          // Attempt to recover by trying to re-render the events route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}