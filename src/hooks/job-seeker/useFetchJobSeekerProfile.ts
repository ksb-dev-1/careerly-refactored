import { useQuery } from "@tanstack/react-query";

import { JobSeekerProfileDetailsResponse } from "@/app/api/job-seeker/profile/route";
import { queryKeys } from "@/lib/query-keys";
import { JOB_SEEKER_API_ROUTES } from "@/lib/routes";

import { useClientSession } from "../useClientSession";

export async function fetchJobSeekerProfile() {
  const res = await fetch(JOB_SEEKER_API_ROUTES.PROFILE_API);
  const body: JobSeekerProfileDetailsResponse = await res.json();

  if (!body.success) {
    throw { status: res.status, message: body.error };
  }
  return body;
}

export function useFetchJobSeekerProfile() {
  const { data: session } = useClientSession();

  return useQuery<
    JobSeekerProfileDetailsResponse,
    { status: number; message?: string }
  >({
    queryKey: queryKeys.profile(session?.user.id),
    queryFn: fetchJobSeekerProfile,
  });
}
