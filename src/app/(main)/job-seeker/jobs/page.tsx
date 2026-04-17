import { Suspense } from "react";

import { Metadata } from "next";

import { JobsPageSkeleton } from "@/components/skeletons/jobs-page-skeleton";

import { JobList } from "./job-list";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen w-full mt-32 mb-16 px-4">
      <Suspense fallback={<JobsPageSkeleton />}>
        <JobList />
      </Suspense>
    </div>
  );
}
