"use client";

import { useEffect, useState } from "react";

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
  isBookmarked = false, // ✅ prevent undefined
  className,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);

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

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!jobSeekerId) throw new Error("Authentication required");
      return ToggleBookmark(jobSeekerId, jobId);
    },

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async () => {
      if (!jobSeekerId) return;

      await queryClient.cancelQueries({
        queryKey: queryKeys.jobs(filters, jobSeekerId),
      });

      await queryClient.cancelQueries({
        queryKey: queryKeys.bookmarks(jobSeekerId),
      });

      const previousJobs = queryClient.getQueryData(
        queryKeys.jobs(filters, jobSeekerId),
      );

      const previousBookmarks = queryClient.getQueryData(
        queryKeys.bookmarks(jobSeekerId),
      );

      const previousBookmarked = bookmarked;

      // ✅ instant UI
      setBookmarked((prev) => !prev);

      // ✅ update jobs cache safely (handle paginated shape)
      queryClient.setQueryData(
        queryKeys.jobs(filters, jobSeekerId),
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            jobs: old.jobs?.map((job: any) =>
              job.id === jobId
                ? { ...job, isBookmarked: !job.isBookmarked }
                : job,
            ),
          };
        },
      );

      // ✅ update bookmarks cache WITHOUT inserting partial data
      queryClient.setQueryData(queryKeys.bookmarks(jobSeekerId), (old: any) => {
        if (!old) return old;

        const exists = old.bookmarks?.some((job: any) => job.id === jobId);

        if (exists) {
          return {
            ...old,
            bookmarks: old.bookmarks.filter((job: any) => job.id !== jobId),
          };
        }

        // ❗ DO NOT insert incomplete job → let refetch handle it
        return old;
      });

      return { previousJobs, previousBookmarks, previousBookmarked };
    },

    // 🔴 rollback on error
    onError: (error: ToggleBookmarkActionError, _, context) => {
      if (!jobSeekerId) return;

      if (context?.previousJobs) {
        queryClient.setQueryData(
          queryKeys.jobs(filters, jobSeekerId),
          context.previousJobs,
        );
      }

      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          queryKeys.bookmarks(jobSeekerId),
          context.previousBookmarks,
        );
      }

      if (context?.previousBookmarked !== undefined) {
        setBookmarked(context.previousBookmarked);
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

    // ✅ final sync
    onSettled: () => {
      if (!jobSeekerId) return;

      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs(filters, jobSeekerId),
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
      disabled={loading || !jobSeekerId} // ✅ prevent invalid clicks
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
