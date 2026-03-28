"use client";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { JobCard } from "@/components/job-seeker/job-card";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { useFetchBookmarks } from "@/hooks/useFetchBookmarks";

export function Bookmarks() {
  const { data, isLoading, error } = useFetchBookmarks();
  if (isLoading) return <JobListSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  const bookmarks = data?.bookmarks;

  if (!bookmarks || bookmarks.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-6">
      {bookmarks.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
