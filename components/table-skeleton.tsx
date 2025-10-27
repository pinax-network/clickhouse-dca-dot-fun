import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  const columns = 7;
  const rows = 5;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <Skeleton className="h-3 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}
