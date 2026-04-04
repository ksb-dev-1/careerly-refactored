"use client";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { ActiveFilters } from "@/components/job-seeker/active-filters";
import { Filter } from "@/components/job-seeker/filter";
import { JobCard } from "@/components/job-seeker/job-card";
import { SearchInput } from "@/components/job-seeker/search-input";
import { JobPagination } from "@/components/pagination";
import JobsPageSkeleton from "@/components/skeletons/jobs-page-skeleton";
import { useFetchJobs } from "@/hooks/job-seeker/useFetchJobs";
import { useExtractJobFilters } from "@/hooks/useExtractFilters";

export function JobList() {
  const { data, isLoading, error } = useFetchJobs();
  const { isFilterApplied } = useExtractJobFilters();

  if (isLoading) return <JobsPageSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  const jobs = data?.jobs;
  const totalPages = data?.totalPages;

  if (!jobs || jobs.length === 0) return <EmptyState />;

  return (
    <>
      {/* <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <h4 className="font-bold w-fit">All Jobs</h4>
        <div className="w-full sm:max-w-sm flex items-center gap-2">
          <SearchInput />
        </div>
      </div> */}

      {/* {isFilterApplied && (
        <div className="mb-6">
          <ActiveFilters />
        </div>
      )} */}

      <div className="max-w-6xl w-full mx-auto flex items-start gap-6">
        <Filter />
        <div className="w-full">
          <div className="w-full flex flex-col gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div>
            {totalPages && totalPages > 1 && (
              <JobPagination totalPages={totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
