'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl text-white">Something went wrong</h1>
      <p className="mt-3 text-mist">Please try again.</p>
      <button type="button" onClick={reset} className="btn btn-gold mt-6">Try again</button>
    </main>
  );
}
