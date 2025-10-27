export function ErrorState({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            DCA Active Tokens
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Displaying active tokens from the DCA contract
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Failed to Load Data
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We encountered an error while fetching the token data. Please try again later.
          </p>
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
              Error details
            </summary>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono text-zinc-700 dark:text-zinc-300 overflow-auto">
              {error.message}
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
