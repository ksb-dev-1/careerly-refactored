import { Suspense } from "react";

import { Metadata } from "next";

import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";

import { JobList } from "./jobs";

export const metadata: Metadata = {
  title: "Jobs - Careerly",
  description: "Easily browse job listings using filters and pagination.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen max-w-custom mx-auto w-full mt-32 mb-16 px-4">
      <Suspense fallback={<JobListSkeleton />}>
        <JobList />
      </Suspense>
    </div>
  );
}
