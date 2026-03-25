import { JobCardSkeleton } from "./job-card-skeleton";

export function JobListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
