import { getSetTokenProps, type SetTokenProps } from '@/lib/clickhouse';

export default async function Home() {
  let data: SetTokenProps[] = [];
  let error: string | null = null;

  try {
    data = await getSetTokenProps();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch data';
    console.error('Error fetching ClickHouse data:', err);
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            ClickHouse Data Viewer
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Displaying data from <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">set_token_props</code> table
          </p>
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : data.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <span>No data found in the table.</span>
          </div>
        ) : data.length > 0 && data[0] ? (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      {Object.values(row).map((value, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100"
                        >
                          {value !== null ? String(value) : 'null'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-sm text-zinc-600 dark:text-zinc-400">
              Total rows: {data.length}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <span>No data available to display.</span>
          </div>
        )}
      </main>
    </div>
  );
}
