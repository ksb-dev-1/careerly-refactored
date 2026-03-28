import { useQuery } from "@tanstack/react-query";

import { fetchBookmarks } from "@/lib/job-seeker/fetch-bookmarks";
import { queryKeys } from "@/lib/query-keys";
import { BookmarksApiResponse } from "@/types/api";

export function useFetchBookmarks(jobSeekerId: string) {
  return useQuery<BookmarksApiResponse, { status: number; message?: string }>({
    queryKey: queryKeys.bookmarks(jobSeekerId),
    queryFn: () => fetchBookmarks(jobSeekerId),
  });
}
