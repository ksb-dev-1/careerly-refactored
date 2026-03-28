import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { JOB_SEEKER_API_ROUTES } from "@/lib/routes";
import { JobListApiResponse } from "@/types/api";

import { useClientSession } from "./useClientSession";

const BASE_API = JOB_SEEKER_API_ROUTES.JOBS_API;

function buildJobsUrl(filters?: Record<string, string | null>): string {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
  }
  return `${BASE_API}?${searchParams.toString()}`;
}

export async function fetchJobs(filters?: Record<string, string | null>) {
  const res = await fetch(buildJobsUrl(filters));
  const body: JobListApiResponse = await res.json();

  if (!body.success) {
    throw { status: res.status, message: body.error };
  }
  return body;
}

export function useFetchJobs() {
  const { data: session } = useClientSession();
  const searchParams = useSearchParams();

  const filters = {
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "8",
    jobType: searchParams.get("jobType"),
    jobMode: searchParams.get("jobMode"),
    experience: searchParams.get("experience"),
    search: searchParams.get("search"),
  };

  return useQuery<JobListApiResponse, { status: number; message?: string }>({
    queryKey: queryKeys.jobs(filters, session?.user.id),
    queryFn: () => fetchJobs(filters),
    placeholderData: (prev) => prev,
  });
}
