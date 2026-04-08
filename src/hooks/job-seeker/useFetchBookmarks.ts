import { useQuery } from "@tanstack/react-query";

import {
  BookmarksApiResponse,
  BookmarksApiSuccessResponse,
} from "@/app/api/job-seeker/bookmarks/route";
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

async function fetchBookmarks(): Promise<BookmarksApiSuccessResponse> {
  const res = await fetch(JOB_SEEKER_API_ROUTES.BOOKMARKS_API);
  const body: BookmarksApiResponse = await res.json();

  if (!body.success) {
    throw new ApiError(res.status, body.error);
  }

  return body;
}

export function useFetchBookmarks() {
  const { data: session } = useClientSession();

  return useQuery<BookmarksApiSuccessResponse, ApiError>({
    queryKey: queryKeys.bookmarks(session?.user?.id),
    queryFn: fetchBookmarks,
    enabled: !!session?.user?.id,
  });
}

// ): UseQueryResult<BookmarksApiSuccessResponse, ApiError>
