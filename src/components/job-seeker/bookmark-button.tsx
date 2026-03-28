"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { toast } from "sonner";

import {
  ToggleBookmark,
  ToggleBookmarkActionError,
} from "@/actions/job-seeker/toggle-bookmark";
import { useClientSession } from "@/hooks/useClientSession";
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
  isBookmarked,
  className,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { data: session, isPending } = useClientSession();
  const jobSeekerId = session?.user.id;
  const queryClient = useQueryClient();

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: async () => {
      if (!jobSeekerId) throw new Error("Authentication required");
      return ToggleBookmark(jobId);
    },

    // 🔥 Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previousJobs = queryClient.getQueryData(["jobs"]);
      const previousBookmarks = queryClient.getQueryData(["bookmarks"]);

      const previousBookmarked = bookmarked;

      // instant UI
      setBookmarked((prev) => !prev);

      // update jobs cache
      queryClient.setQueryData(["jobs"], (old: any) => {
        if (!old) return old;

        return old.map((job: any) =>
          job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job,
        );
      });

      // update bookmarks cache
      queryClient.setQueryData(["bookmarks"], (old: any) => {
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

      return { previousJobs, previousBookmarks, previousBookmarked };
    },

    // rollback if error
    onError: (error: ToggleBookmarkActionError, _, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(["jobs"], context.previousJobs);
      }

      if (context?.previousBookmarks) {
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
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

    // ensure final sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const loading = isPending;

  return (
    <Button
      type="button"
      size="icon"
      className={cn("bg-brand/10 text-brand hover:bg-brand/20", className)}
      aria-label={bookmarked ? "remove from bookmarks" : "add to bookmarks"}
      disabled={loading}
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
