import { getActiveTokens, type TokenData, type QueryMetrics } from '@/lib/clickhouse';

export default async function Home() {
  let data: TokenData[] = [];
  let metrics: QueryMetrics | null = null;
  let error: string | null = null;

  try {
    const result = await getActiveTokens();
    data = result.data;
    metrics = result.metrics;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch data';
    console.error('Error fetching ClickHouse data:', err);
  }

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

        {metrics && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                SQL Compute Time
              </div>
              <div className="text-2xl font-bold text-black dark:text-zinc-50">
                {metrics.sqlComputeTimeMs}ms
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                HTTP Request Time
              </div>
              <div className="text-2xl font-bold text-black dark:text-zinc-50">
                {metrics.httpRequestTimeMs}ms
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4">
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Total Time
              </div>
              <div className="text-2xl font-bold text-black dark:text-zinc-50">
                {metrics.totalTimeMs}ms
              </div>
            </div>
          </div>
        )}

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : data.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <span>No active tokens found.</span>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Token Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Decimals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Feed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Stakable
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-zinc-900 dark:text-zinc-100">
                        {row.token}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row.token_symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {row.token_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        {row.token_decimals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-zinc-900 dark:text-zinc-100">
                        {row.feed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.is_stakable 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
                        }`}>
                          {row.is_stakable ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.is_active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {row.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-sm text-zinc-600 dark:text-zinc-400">
              Total active tokens: {data.length}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
