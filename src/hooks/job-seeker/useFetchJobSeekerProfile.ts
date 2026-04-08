import { useQuery } from "@tanstack/react-query";

import { JobSeekerProfileDetailsApiResponse } from "@/app/api/job-seeker/profile/route";
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

export async function fetchJobSeekerProfile() {
  const res = await fetch(JOB_SEEKER_API_ROUTES.PROFILE_API);
  const body: JobSeekerProfileDetailsApiResponse = await res.json();

  if (!body.success) {
    throw new ApiError(res.status, body.error);
  }

  return body;
}

export function useFetchJobSeekerProfile() {
  const { data: session } = useClientSession();

  return useQuery<JobSeekerProfileDetailsApiResponse, ApiError>({
    queryKey: queryKeys.profile(session?.user.id),
    queryFn: fetchJobSeekerProfile,
  });
}
