import { Suspense } from "react";

import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";

import { Metadata } from "next";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthorized } from "@/components/errors/unauthorized";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { UserRole } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/get-server-session";
import { fetchBookmarks } from "@/lib/job-seeker/fetch-bookmarks";

import { Bookmarks } from "./bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks - Careerly",
  description: "View and manage all your bookmarks.",
};

async function BookmarksContent({ jobSeekerId }: { jobSeekerId: string }) {
  "use cache";
  cacheLife("max");
  cacheTag(`bookmarks-${jobSeekerId}`);

  const response = await fetchBookmarks(jobSeekerId);

  if (!response.success) {
    return <ServerError />;
  }

  if (response.bookmarks.length === 0) {
    return <EmptyState />;
  }

  return <Bookmarks bookmarks={response.bookmarks} />;
}

async function AuthContent() {
  const session = await getServerSession();

  if (!session?.user.id) redirect("/sign-in");

  if (session.user.role !== UserRole.JOB_SEEKER) {
    return <Unauthorized />;
  }

  return <BookmarksContent jobSeekerId={session.user.id} />;
}

export default async function BookmarksPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Suspense fallback={<JobListSkeleton />}>
        <AuthContent />
      </Suspense>
    </div>
  );
}
