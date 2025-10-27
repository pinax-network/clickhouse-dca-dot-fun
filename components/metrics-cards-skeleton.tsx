import { Skeleton } from "./ui/skeleton";

export function MetricsCardsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4">
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}
