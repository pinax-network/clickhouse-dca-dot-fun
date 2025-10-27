import { Skeleton } from "./ui/skeleton";
import { MetricsCardsSkeleton } from "./metrics-cards-skeleton";
import { TableSkeleton } from "./table-skeleton";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-80 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>

        <MetricsCardsSkeleton />
        <TableSkeleton />
      </main>
    </div>
  );
}
