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
import { fetchJobs } from "@/lib/job-seeker/fetch-jobs";
import { Filter } from "@/types";

import { Jobs } from "./jobs";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function JobsContent({
  jobSeekerId,
  filters,
}: {
  jobSeekerId: string;
  filters: Filter;
}) {
  "use cache";
  cacheLife("max");
  cacheTag(`jobs-${jobSeekerId}`);

  const response = await fetchJobs(jobSeekerId, filters);

  if (!response.success) {
    return <ServerError />;
  }

  if (response.jobs.length === 0) {
    return <EmptyState />;
  }

  return <Jobs jobs={response.jobs} totalPages={response.totalPages} />;
}

async function AuthContent(props: PageProps) {
  const session = await getServerSession();

  if (!session?.user.id) redirect("/sign-in");

  if (session.user.role !== UserRole.JOB_SEEKER) {
    return <Unauthorized />;
  }

  const searchParams = await props.searchParams;

  const page = searchParams.page?.toString() ?? "1";

  const jobType =
    typeof searchParams.jobType === "string"
      ? searchParams.jobType.split(",")
      : [];

  const jobMode =
    typeof searchParams.jobMode === "string"
      ? searchParams.jobMode.split(",")
      : [];

  const experience = searchParams.experience?.toString() ?? "";

  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const filters = { page, jobType, jobMode, experience, search };

  return <JobsContent jobSeekerId={session.user.id} filters={filters} />;
}

export default async function JobsPage(props: PageProps) {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Suspense fallback={<JobListSkeleton />}>
        <AuthContent {...props} />
      </Suspense>
    </div>
  );
}
