"use client";

import { useState, useTransition } from "react";

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { toast } from "sonner";

import { ToggleBookmark } from "@/actions/job-seeker/toggle-bookmark";
import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";
import { Button } from "./ui/button";

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
  const [optimisticBookmarked, setOptimisticBookmarked] =
    useState(isBookmarked);

  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    // 🔥 optimistic update (instant UI)
    setOptimisticBookmarked((prev) => !prev);

    startTransition(async () => {
      const res = await ToggleBookmark(jobId);

      if (!res.success) {
        // ❌ rollback if failed
        setOptimisticBookmarked((prev) => !prev);
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      className={cn(
        "bg-brand/10 text-brand border border-brand/20 hover:bg-brand/20",
        className,
      )}
      aria-label={isBookmarked ? "remove from bookmarks" : "add to bookmarks"}
      disabled={isPending}
      onClick={handleToggle}
    >
      {isPending ? (
        <Spinner color="text-brand" />
      ) : isBookmarked ? (
        <FaBookmark />
      ) : (
        <FaRegBookmark />
      )}
    </Button>
  );
}
