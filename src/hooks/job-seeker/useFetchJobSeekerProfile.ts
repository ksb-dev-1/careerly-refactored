import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { JOB_SEEKER_API_ROUTES } from "@/lib/routes";

// import { BookmarksApiResponse } from "@/types/api";

import { useClientSession } from "../useClientSession";

export async function fetchJobSeekerProfile() {
  const res = await fetch(JOB_SEEKER_API_ROUTES.PROFILE_API);
  //   const body: BookmarksApiResponse = await res.json();
  const body = await res.json();

  if (!body.success) {
    throw { status: res.status, message: body.error };
  }
  return body;
}

export function useFetchJobSeekerProfile() {
  const { data: session } = useClientSession();

  return useQuery({
    queryKey: queryKeys.profile(session?.user.id),
    queryFn: fetchJobSeekerProfile,
  });

  //   return useQuery<BookmarksApiResponse, { status: number; message?: string }>({
  //     queryKey: queryKeys.bookmarks(session?.user.id),
  //     queryFn: fetchJobSeekerProfile,
  //   });
}
