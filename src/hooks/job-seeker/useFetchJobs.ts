import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import {
  JobListApiResponse,
  JobListApiSuccessResponse,
} from "@/app/api/job-seeker/jobs/route";
import { queryKeys } from "@/lib/query-keys";
import { JOB_SEEKER_API_ROUTES } from "@/lib/routes";

import { useClientSession } from "../useClientSession";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function buildJobsUrl(filters?: Record<string, string | null>): string {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
  }
  return `${JOB_SEEKER_API_ROUTES.JOBS_API}?${searchParams.toString()}`;
}

export async function fetchJobs(
  filters?: Record<string, string | null>,
): Promise<JobListApiSuccessResponse> {
  const res = await fetch(buildJobsUrl(filters));
  const body: JobListApiResponse = await res.json();

  if (!body.success) {
    throw new ApiError(res.status, body.error);
  }
  return body;
}

export function useFetchJobs() {
  const { data: session } = useClientSession();
  const searchParams = useSearchParams();

  const filters = {
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "6",
    jobType: searchParams.get("jobType"),
    jobMode: searchParams.get("jobMode"),
    experience: searchParams.get("experience"),
    search: searchParams.get("search"),
  };

  return useQuery<JobListApiSuccessResponse, ApiError>({
    queryKey: queryKeys.jobs(filters, session?.user.id),
    queryFn: () => fetchJobs(filters),
    placeholderData: (prev) => prev,
  });
}
