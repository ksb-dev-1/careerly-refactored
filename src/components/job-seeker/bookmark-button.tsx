"use client";

import { useSearchParams } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { toast } from "sonner";

import {
  ToggleBookmark,
  ToggleBookmarkActionError,
} from "@/actions/job-seeker/toggle-bookmark";
import { useClientSession } from "@/hooks/useClientSession";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";

import { Spinner } from "../spinner";
import { Button } from "../ui/button";

interface BookmarkButtonProps {
  jobId: string;
  isBookmarked?: boolean;
  className?: string;
}

export function BookmarkButton({
  jobId,
  isBookmarked = false,
  className,
}: BookmarkButtonProps) {
  const { data: session, isPending } = useClientSession();
  const jobSeekerId = session?.user.id;

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const filters = {
    page: searchParams.get("page") ?? "1",
    limit: searchParams.get("limit") ?? "8",
    jobType: searchParams.get("jobType"),
    jobMode: searchParams.get("jobMode"),
    experience: searchParams.get("experience"),
    search: searchParams.get("search"),
  };

  // ✅ SINGLE SOURCE OF TRUTH
  const bookmarked = isBookmarked;

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!jobSeekerId) throw new Error("Authentication required");
      return ToggleBookmark(jobSeekerId, jobId);
    },

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async () => {
      if (!jobSeekerId) return;

      await queryClient.cancelQueries({
        queryKey: ["jobs"],
      });

      await queryClient.cancelQueries({
        queryKey: queryKeys.bookmarks(jobSeekerId),
      });

      const previousJobs = queryClient.getQueriesData({
        queryKey: ["jobs"],
      });

      const previousBookmarks = queryClient.getQueryData(
        queryKeys.bookmarks(jobSeekerId),
      );

      // ✅ update ALL jobs caches (important fix)
      queryClient.setQueriesData({ queryKey: ["jobs"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          jobs: old.jobs?.map((job: any) =>
            job.id === jobId
              ? { ...job, isBookmarked: !job.isBookmarked }
              : job,
          ),
        };
      });

      // ✅ update bookmarks cache
      queryClient.setQueryData(queryKeys.bookmarks(jobSeekerId), (old: any) => {
        if (!old) return old;

        const exists = old.bookmarks?.some((job: any) => job.id === jobId);

        if (exists) {
          return {
            ...old,
            bookmarks: old.bookmarks.filter((job: any) => job.id !== jobId),
          };
        }

        return old;
      });

      return { previousJobs, previousBookmarks };
    },

    // 🔴 rollback
    onError: (error: ToggleBookmarkActionError, _, context) => {
      if (!jobSeekerId) return;

      // restore ALL jobs queries
      context?.previousJobs?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          queryKeys.bookmarks(jobSeekerId),
          context.previousBookmarks,
        );
      }

      toast.error(error.message);
    },

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    },

    // ✅ FINAL SYNC (CRITICAL FIX)
    onSettled: () => {
      if (!jobSeekerId) return;

      queryClient.invalidateQueries({
        queryKey: ["jobs"], // 🔥 invalidate ALL variations
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.bookmarks(jobSeekerId),
      });
    },
  });

  const loading = isPending;

  return (
    <Button
      type="button"
      size="icon"
      className={cn("bg-brand/10 text-brand hover:bg-brand/20", className)}
      aria-label={bookmarked ? "remove from bookmarks" : "add to bookmarks"}
      disabled={loading || !jobSeekerId}
      onClick={() => mutate()}
    >
      {loading ? (
        <Spinner color="text-brand" />
      ) : bookmarked ? (
        <FaBookmark />
      ) : (
        <FaRegBookmark />
      )}
    </Button>
  );
}
