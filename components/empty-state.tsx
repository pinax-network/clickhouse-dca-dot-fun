export function EmptyState() {
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
              className="mx-auto h-16 w-16 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            No Active Tokens
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            There are currently no active tokens in the DCA contract.
          </p>
        </div>
      </main>
    </div>
  );
}
